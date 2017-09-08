import {Matrix3, BasisForPlane, ORIGIN} from '../../../math/l3space'
import * as math from '../../../math/math'
import Vector from '../../../math/vector'
import {enclose, iterateSegments} from '../../../brep/brep-builder'
import * as stitching from '../../../brep/stitching'
import {Loop} from '../../../brep/topo/loop'
import {incRefCounter} from '../../../brep/topo/topo-object'
import {Line} from '../../../brep/geom/impl/line'
import {CompositeCurve} from '../../../brep/geom/curve'
import {ReadSketchFromFace} from '../sketch/sketch-reader'
import {Segment} from '../sketch/sketch-model'
import {isCurveClass} from '../../cad-utils'
import {BooleanOperation, combineShells} from './boolean-operation'


export function Extrude(app, params) {
  return doOperation(app, params, false);
}

export function Cut(app, params) {
  return doOperation(app, params, true);
}

export function doOperation(app, params, cut) {
  const face = app.findFace(params.face);
  const solid = face.solid;

  const savedFace = localStorage.getItem(app.faceStorageKey(face.id));
  if (savedFace == null) return null;

  const sketch = ReadSketchFromFace(app, face);
  const details = getEncloseDetails(params, sketch.fetchContours(), face.surface(), !cut, false);
  const operand = combineShells(details.map(d => enclose(d.basePath, d.lidPath, d.baseSurface, d.lidSurface, wallJoiner)));
  return BooleanOperation(face, solid, operand, cut ? 'subtract' : 'union');
}

export function wallJoiner(wall, group) {
  if (group && group.constructor.name != 'Segment') {
    const wallFace = wall.faces[0];
    if (!group.stitchedSurface) {
      group.stitchedSurface = new stitching.StitchedSurface();
    }
    group.stitchedSurface.addFace(wallFace);
  }
}

export function getEncloseDetails(params, contours, sketchSurface, invert, forceApproximation) {
  let value = params.value;
  if (value < 0) {
    value = Math.abs(value);
    invert = !invert;
  }

  const baseSurface = invert ? sketchSurface.invert() : sketchSurface;

  let target;
  const targetDir = baseSurface.normal.negate();

  if (params.rotation != 0) {
    const basis = sketchSurface.basis();
    target = Matrix3.rotateMatrix(params.rotation * Math.PI / 180, basis[0], ORIGIN).apply(targetDir);
    if (params.angle != 0) {
      target = Matrix3.rotateMatrix(params.angle * Math.PI / 180, basis[2], ORIGIN)._apply(target);
    }
    target._multiply(value);
  } else {
    target = targetDir.multiply(value);
  }

  let details = [];
  for (let contour of contours) {
    if (invert) contour.reverse();
    const basePath = contour.transferOnSurface(sketchSurface, forceApproximation);
    if (invert) contour.reverse();

    const lidPath = new CompositeCurve();

    let lidPoints = basePath.points;
    var applyPrism = !math.equal(params.prism, 1);
    if (applyPrism) {
      const _3D = sketchSurface.get3DTransformation();
      const _2D = _3D.invert();
      lidPoints = math.polygonOffset(lidPoints.map(p => _2D.apply(p)) , params.prism).map(p => _3D._apply(p));
    }
    lidPoints = lidPoints.map(p => p.plus(target));
    for (let i = 0; i < basePath.points.length; ++i) {
      const curve = basePath.curves[i];
      const point = lidPoints[i];
      const group = basePath.groups[i];
      let lidCurve;
      if (curve.isLine) {
        //TODO: breaks test_TR_OUT_TR_INNER
        lidCurve = Line.fromSegment(point, lidPoints[(i + 1) % lidPoints.length]);
      } else {
        lidCurve = curve.translate(target);
        if (applyPrism) {
          lidCurve = lidCurve.offset(params.prism);
        }
      }
      lidPath.add(lidCurve, point, group);
    }

    const lidSurface = baseSurface.translate(target).invert();
    details.push({basePath, lidPath, baseSurface, lidSurface});
  }
  return details;
}