cd ..
.\MatterControl\Matterslice.exe -s EndCode="G28 X0  ; home X axis\nM112\n" -s StartCode="M112\n\n\nG28 ; home all axeS\n\nG201 P0 X105\nM400\n;printpage\nG201 P0 X119\nG201 P0 X105\nG201 P0 X119\nG201 P0 X105\nG201 P0 X119" -s CenterObjectInXy=False -s ExpandThinWalls=True -s FilamentDiameter=1.75 -s LayerThickness=0.2 -s GenerateSupport=True -s EnableRaft=true -s InfillPercent=%2 -o ".\storage\app\3dPrintFiles\%1.gcode" ".\storage\app\3dPrintFiles\%1.stl"

exit