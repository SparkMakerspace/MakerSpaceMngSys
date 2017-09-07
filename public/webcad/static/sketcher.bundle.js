/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "1d19dcd8030284202861"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 1;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(127);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _jquery = __webpack_require__(3);
	
	var _jquery2 = _interopRequireDefault(_jquery);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.jQuery = window.$ = _jquery2.default;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.0
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-01-23T21:10Z
	 */
	
	(function( global, factory ) {
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper window is present,
			// execute the factory and get jQuery
			// For environments that do not inherently posses a window with a document
			// (such as Node.js), expose a jQuery-making factory as module.exports
			// This accentuates the need for the creation of a real window
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Can't do this because several apps including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	// Support: Firefox 18+
	//
	
	var arr = [];
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var trim = "".trim;
	
	var support = {};
	
	
	
	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,
	
		version = "2.1.0",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// Start with an empty selector
		selector: "",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return a 'clean' array
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return just the object
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor(null);
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}
	
		// extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		// See test/unit/core.js for details concerning isFunction.
		// Since version 1.3, DOM methods and functions like alert
		// aren't supported. They return false on IE (#2968).
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			return obj - parseFloat( obj ) >= 0;
		},
	
		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			// Support: Firefox <20
			// The try/catch suppresses exceptions thrown when attempting to access
			// the "constructor" property of certain host objects, ie. |window.location|
			// https://bugzilla.mozilla.org/show_bug.cgi?id=814622
			try {
				if ( obj.constructor &&
						!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
					return false;
				}
			} catch ( e ) {
				return false;
			}
	
			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},
	
		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android < 4.0, iOS < 6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;
	
			code = jQuery.trim( code );
	
			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );
	
			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );
	
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );
	
						if ( value === false ) {
							break;
						}
					}
				}
	
			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
	
						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );
	
						if ( value === false ) {
							break;
						}
					}
				}
			}
	
			return obj;
		},
	
		trim: function( text ) {
			return text == null ? "" : trim.call( text );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});
	
	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	function isArraylike( obj ) {
		var length = obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		if ( obj.nodeType === 1 && length ) {
			return true;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v1.10.16
	 * http://sizzlejs.com/
	 *
	 * Copyright 2013 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-01-13
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		compile,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + -(new Date()),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// General-purpose constants
		strundefined = typeof undefined,
		MAX_NEGATIVE = 1 << 31,
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf if we can't use a native one
		indexOf = arr.indexOf || function( elem ) {
			var i = 0,
				len = this.length;
			for ( ; i < len; i++ ) {
				if ( this[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	
		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),
	
		// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
			"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",
	
		// Prefer arguments quoted,
		//   then not containing pseudos/brackets,
		//   then attribute selectors/non-parenthetical expressions,
		//   then anything else
		// These preferences are here to reduce the number of selectors
		//   needing tokenize in the PSEUDO preFilter
		pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
		rescape = /'|\\/g,
	
		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		};
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;
	
		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
	
		context = context || document;
		results = results || [];
	
		if ( !selector || typeof selector !== "string" ) {
			return results;
		}
	
		if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
			return [];
		}
	
		if ( documentIsHTML && !seed ) {
	
			// Shortcuts
			if ( (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}
	
				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;
	
				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}
	
			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType === 9 && selector;
	
				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );
	
					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";
	
					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}
	
				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");
	
		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== strundefined && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare,
			doc = node ? node.ownerDocument || node : preferredDoc,
			parent = doc.defaultView;
	
		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Set our document
		document = doc;
		docElem = doc.documentElement;
	
		// Support tests
		documentIsHTML = !isXML( doc );
	
		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", function() {
					setDocument();
				}, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", function() {
					setDocument();
				});
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});
	
		// Check if getElementsByClassName can be trusted
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
			div.innerHTML = "<div class='a'></div><div class='a i'></div>";
	
			// Support: Safari<4
			// Catch class over-caching
			div.firstChild.className = "i";
			// Support: Opera<10
			// Catch gEBCN failure to find non-leading classes
			return div.getElementsByClassName("i").length === 2;
		});
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});
	
		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];
	
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== strundefined ) {
					return context.getElementsByTagName( tag );
				}
			} :
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				div.innerHTML = "<select t=''><option selected=''></option></select>";
	
				// Support: IE8, Opera 10-12
				// Nothing should be selected when empty strings follow ^= or $= or *=
				if ( div.querySelectorAll("[t^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
			});
	
			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return doc;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch(e) {}
		}
	
		return Sizzle( expr, document, null, [elem] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[5] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] && match[4] !== undefined ) {
					match[2] = match[4];
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];
	
							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}
	
										if ( node === elem ) {
											break;
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf.call( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},
	
			"disabled": function( elem ) {
				return elem.disabled === true;
			},
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	function tokenize( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	}
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf.call( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context !== document && context;
				}
	
				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !group ) {
				group = tokenize( selector );
			}
			i = group.length;
			while ( i-- ) {
				cached = matcherFromTokens( group[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
		}
		return cached;
	};
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function select( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			match = tokenize( selector );
	
		if ( !seed ) {
			// Try to minimize operations if there is only one group
			if ( match.length === 1 ) {
	
				// Take a shortcut and set the context if the root selector is an ID
				tokens = match[0] = match[0].slice( 0 );
				if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
						support.getById && context.nodeType === 9 && documentIsHTML &&
						Expr.relative[ tokens[1].type ] ) {
	
					context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
					if ( !context ) {
						return results;
					}
					selector = selector.slice( tokens.shift().value.length );
				}
	
				// Fetch a seed set for right-to-left matching
				i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
				while ( i-- ) {
					token = tokens[i];
	
					// Abort if we hit a combinator
					if ( Expr.relative[ (type = token.type) ] ) {
						break;
					}
					if ( (find = Expr.find[ type ]) ) {
						// Search, expanding context for leading sibling combinators
						if ( (seed = find(
							token.matches[0].replace( runescape, funescape ),
							rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
						)) ) {
	
							// If seed is empty or no tokens remain, we can return early
							tokens.splice( i, 1 );
							selector = seed.length && toSelector( tokens );
							if ( !selector ) {
								push.apply( results, seed );
								return results;
							}
	
							break;
						}
					}
				}
			}
		}
	
		// Compile and execute a filtering function
		// Provide `match` to avoid retokenization if we modified the selector above
		compile( selector, match )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	}
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome<14
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};
	
	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;
	
						// scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );
	
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;
	
			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},
	
		sibling: function( n, elem ) {
			var matched = [];
	
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}
	
			return matched;
		}
	});
	
	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :
	
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {
	
						matched.push( cur );
						break;
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},
	
		// Determine the position of an element within
		// the matched set of elements
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});
	
	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);
	
	
	
	// String to Object options format cache
	var optionsCache = {};
	
	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );
	
		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	jQuery.extend({
	
		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Keep pipe for back-compat
			promise.pipe = promise.then;
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];
	
				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;
	
					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}
	
				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,
	
				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},
	
				progressValues, progressContexts, resolveContexts;
	
			// add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}
	
			// if we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}
	
			return deferred.promise();
		}
	});
	
	
	// The deferred used on DOM ready
	var readyList;
	
	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );
	
		return this;
	};
	
	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
	
			// Trigger any bound ready events
			if ( jQuery.fn.trigger ) {
				jQuery( document ).trigger("ready").off("ready");
			}
		}
	});
	
	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}
	
	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {
	
			readyList = jQuery.Deferred();
	
			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// we once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );
	
			} else {
	
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};
	
	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};
	
	
	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	function Data() {
		// Support: Android < 4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});
	
		this.expando = jQuery.expando + Math.random();
	}
	
	Data.uid = 1;
	Data.accepts = jQuery.acceptData;
	
	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}
	
			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];
	
			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;
	
				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );
	
				// Support: Android < 4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}
	
			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}
	
			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];
	
			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];
	
			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {
	
				stored = this.get( owner, key );
	
				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}
	
			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];
	
			if ( key === undefined ) {
				this.cache[ unlock ] = {};
	
			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}
	
				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();
	
	var data_user = new Data();
	
	
	
	/*
		Implementation Summary
	
		1. Enforce API surface and semantic compatibility with 1.9.x branch
		2. Improve the module's maintainability by reducing the storage
			paths to a single mechanism.
		3. Use the same single mechanism to support "private" and "user" data.
		4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
		5. Avoid exposing implementation details on user objects (eg. expando properties)
		6. Provide a clear path for implementation upgrade to WeakMap in 2014
	*/
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}
	
				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});
	
	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );
	
					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
							name = attrs[ i ].name;
	
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}
	
			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );
	
					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );
	
					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});
	
	
	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// not intended for public consumption - generates a queueHooks object, or returns the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});
	
	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}
	
			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );
	
					// ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};
	
	var rcheckableType = (/^(?:checkbox|radio)$/i);
	
	
	
	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) );
	
		// #11217 - WebKit loses check when the name is after the checked attribute
		div.innerHTML = "<input type='radio' checked='checked' name='t'/>";
	
		// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
		// old WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		// Support: IE9-IE11+
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;
	
	
	
	support.focusinBubbles = "onfocusin" in window;
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );
	
			if ( !elemData || !(events = elemData.events) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );
	
			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or
					// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}
	
			return handlerQueue;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];
	
			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = new jQuery.Event( originalEvent );
	
			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}
	
			// Support: Safari 6.0+, Chrome < 28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},
	
		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};
	
	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					// Support: Android < 4.0
					src.defaultPrevented === undefined &&
					src.getPreventDefault && src.getPreventDefault() ?
				returnTrue :
				returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation();
		}
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});
	
	// Create "bubbling" focus and blur events
	// Support: Firefox, Chrome, Safari
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );
	
					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}
	
	jQuery.fn.extend({
	
		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;
	
			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}
	
			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}
	
			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},
	
		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});
	
	
	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	
		// We have to close these tags to support XHTML (#13200)
		wrapMap = {
	
			// Support: IE 9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
			_default: [ 0, "", "" ]
		};
	
	// Support: IE 9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
	
			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}
	
		return elem;
	}
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			data_user.set( dest, udataCur );
		}
	}
	
	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	// Support: IE >= 9
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Support: IE >= 9
			// Fix Cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;
	
			for ( ; i < l; i++ ) {
				elem = elems[ i ];
	
				if ( elem || elem === 0 ) {
	
					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit
						// jQuery.merge because push.apply(_, arraylike) throws
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );
	
					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );
	
						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];
	
						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}
	
						// Support: QtWebKit
						// jQuery.merge because push.apply(_, arraylike) throws
						jQuery.merge( nodes, tmp.childNodes );
	
						// Remember the top-level container
						tmp = fragment.firstChild;
	
						// Fixes #12346
						// Support: Webkit, IE
						tmp.textContent = "";
					}
				}
			}
	
			// Remove wrapper from fragment
			fragment.textContent = "";
	
			i = 0;
			while ( (elem = nodes[ i++ ]) ) {
	
				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}
	
				contains = jQuery.contains( elem.ownerDocument, elem );
	
				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );
	
				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}
	
				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}
	
			return fragment;
		},
	
		cleanData: function( elems ) {
			var data, elem, events, type, key, j,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];
	
					if ( key && (data = data_priv.cache[ key ]) ) {
						events = Object.keys( data.events || {} );
						if ( events.length ) {
							for ( j = 0; (type = events[j]) !== undefined; j++ ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});
	
	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},
	
		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},
	
		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},
	
		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},
	
		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},
	
		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;
	
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}
	
				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}
	
			return this;
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = value.replace( rxhtmlTag, "<$1></$2>" );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var arg = arguments[ 0 ];
	
			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;
	
				jQuery.cleanData( getAll( this ) );
	
				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});
	
			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},
	
		detach: function( selector ) {
			return this.remove( selector, true );
		},
	
		domManip: function( args, callback ) {
	
			// Flatten any nested arrays
			args = concat.apply( [], args );
	
			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );
	
			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}
	
			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;
	
				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}
	
				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;
	
					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;
	
						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );
	
							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}
	
						callback.call( this[ i ], node, i );
					}
	
					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;
	
						// Reenable scripts
						jQuery.map( scripts, restoreScript );
	
						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {
	
								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}
	
			return this;
		}
	});
	
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	});
	
	
	var iframe,
		elemdisplay = {};
	
	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
	
			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle ?
	
				// Use of this method is a temporary fix (more like optmization) until something better comes along,
				// since it was removed from specification and supported only in FF
				window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );
	
		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();
	
		return display;
	}
	
	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];
	
		if ( !display ) {
			display = actualDisplay( nodeName, doc );
	
			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {
	
				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );
	
				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;
	
				// Support: IE
				doc.write();
				doc.close();
	
				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}
	
			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}
	
		return display;
	}
	var rmargin = (/^margin/);
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		};
	
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
	
		// Support: IE9
		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}
	
		if ( computed ) {
	
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}
	
			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due to missing dependency),
					// remove it.
					// Since there are no other hooks for marginRight, remove the whole object.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
	
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}
	
	
	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			divReset = "padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;" +
				"-moz-box-sizing:content-box;box-sizing:content-box",
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;" +
			"margin-top:1px";
		container.appendChild( div );
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			// Support: Firefox, Android 2.3 (Prefixed box-sizing versions).
			div.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;" +
				"position:absolute;top:1%";
			docElem.appendChild( container );
	
			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";
	
			docElem.removeChild( container );
		}
	
		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			jQuery.extend(support, {
				pixelPosition: function() {
					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {
					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );
					marginDiv.style.cssText = div.style.cssText = divReset;
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );
	
					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );
	
					docElem.removeChild( container );
	
					// Clean up the div for other support tests.
					div.innerHTML = "";
	
					return ret;
				}
			});
		}
	})();
	
	
	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	var
		// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),
	
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: 0,
			fontWeight: 400
		},
	
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];
	
	// return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {
	
		// shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}
	
		// check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}
	
		return origName;
	}
	
	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
	
			val = 0;
	
		for ( ; i < 4; i += 2 ) {
			// both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// at this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// at this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// at this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}
	
			// we need the check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;
	
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}
	
				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
	
				if ( !values[ index ] ) {
					hidden = isHidden( elem );
	
					if ( display && display !== "none" || !hidden ) {
						data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css(elem, "display") );
					}
				}
			}
		}
	
		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}
	
		return elements;
	}
	
	jQuery.extend({
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			// normalize float css property
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );
	
			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// convert relative number strings (+= or -=) to relative numbers. #7345
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set. See: #7116
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}
	
				// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
				// but it would mean to define eight (for every problematic property) identical functions
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				}
	
			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );
	
			// gets hook for the prefixed version
			// followed by the unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			//convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Return, converting to number if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});
	
	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
					// certain elements can have dimension info if we invisibly show them
					// however, it must have a current display style that would benefit from this
					return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});
	
	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});
	
	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}
	
				// passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails
				// so, simple values such as "10px" are parsed to Float.
				// complex values such as "rotate(1rad)" are returned as is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// use step hook for back compat - use cssHook if its there - use .style if its
				// available and use plain properties where available
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back Compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;
	
				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];
	
					// Make sure we update the tween properties later on
					parts = parts || [];
	
					// Iteratively approximate from a nonzero starting point
					start = +target || 1;
	
					do {
						// If previous iteration zeroed out, double until we get *something*
						// Use a string for doubling factor so we don't accidentally see scale as unchanged below
						scale = scale || ".5";
	
						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );
	
					// Update scale, tolerating zero or NaN from tween.cur()
					// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}
	
				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}
	
				return tween;
			} ]
		};
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// if we include width, step value is 1 to do all cssExpand values,
		// if we don't include width, step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {
	
				// we're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );
	
		// handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always(function() {
				// doing this makes sure that the complete handler will be called
				// before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}
	
		// height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );
			// Get default display if display is currently "none"
			if ( display === "none" ) {
				display = defaultDisplay( elem.nodeName );
			}
			if ( display === "inline" &&
					jQuery.css( elem, "float" ) === "none" ) {
	
				style.display = "inline-block";
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	
		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}
	
		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}
	
			// store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;
	
				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
	
				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// not quite $.extend, this wont overwrite keys already present.
				// also - reusing 'index' from above because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ]);
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// if we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// resolve when we played the last frame
					// otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
		// normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {
	
			// show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()
	
				// animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// start the next in the queue if the last step wasn't forced
				// timers currently will call their complete callbacks, which will dequeue
				// but only if they were gotoEnd
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// enable finishing flag on private data
				data.finish = true;
	
				// empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// turn off finishing flag
				delete data.finish;
			});
		}
	});
	
	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});
	
	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};
	
	
	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: iOS 5.1, Android 4.x, Android 2.3
		// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
		support.checkOn = input.value !== "";
	
		// Must access the parent to make an option select properly
		// Support: IE9, IE10
		support.optSelected = opt.selected;
	
		// Make sure that the options inside disabled selects aren't marked as disabled
		// (WebKit marks them as disabled)
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Check if an input maintains its value after becoming a radio
		// Support: IE9, IE10
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();
	
	
	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});
	
	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;
	
			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}
	
			if ( value !== undefined ) {
	
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
	
				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;
	
				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}
	
			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;
	
			} else {
				ret = jQuery.find.attr( elem, name );
	
				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},
	
		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;
	
					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}
	
					elem.removeAttribute( name );
				}
			}
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						// Setting the type on a radio button after the value resets the value in IE6-9
						// Reset value to default in case type is set after value during creation
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i;
	
	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});
	
	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},
	
		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;
	
			// don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
	
			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );
	
			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});
	
	// Support: IE9+
	// Selectedness for an option in an optgroup can be inaccurate
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}
	
	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});
	
	
	
	
	var rclass = /[\t\r\n\f]/g;
	
	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}
	
			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];
	
				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);
	
					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];
	
				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);
	
					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}
	
			return this.each(function() {
				if ( type === "string" ) {
					// toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];
	
					while ( (className = classNames[ i++ ]) ) {
						// check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}
	
					// If the element has a class name or if we're passed "false",
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},
	
		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}
	
			return false;
		}
	});
	
	
	
	
	var rreturn = /\r/g;
	
	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
						// handle most common string cases
						ret.replace(rreturn, "") :
						// handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each(function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});
	
	jQuery.extend({
		valHooks: {
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
							optionSet = true;
						}
					}
	
					// force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});
	
	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				// Support: Webkit
				// "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});
	
	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});
	
	
	var nonce = jQuery.now();
	
	var rquery = (/\?/);
	
	
	
	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		// Document location
		ajaxLocParts,
		ajaxLocation,
	
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat("*");
	
	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try {
		ajaxLocation = location.href;
	} catch( e ) {
		// Use the href attribute of an A element
		// since IE will modify it given document.location
		ajaxLocation = document.createElement( "a" );
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}
	
	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );
	
					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend({
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			fireGlobals = s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?
	
						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :
	
						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// We extract error from statusText
					// then normalize statusText and status for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};
	
	
	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;
	
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}
	
			if ( this[ 0 ] ) {
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map(function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				}).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}
	
			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			});
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},
	
		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});
	
	
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
	
	
	
	
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};
	
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
	
		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};
	
	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};
	
	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	if ( window.ActiveXObject ) {
		jQuery( window ).on( "unload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport(function( options ) {
		var callback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;
	
					xhr.open( options.type, options.url, options.async, options.username, options.password );
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");
	
					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");
	
					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( options.hasContent && options.data || null );
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});
	
	
	
	
	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;
	
				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			});
	
			// Delegate to script
			return "script";
		}
	});
	
	
	
	
	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;
	
		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}
	
		parsed = jQuery.buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	// Keep a copy of the old load method
	var _load = jQuery.fn.load;
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}
	
		var selector, type, response,
			self = this,
			off = url.indexOf(" ");
	
		if ( off >= 0 ) {
			selector = url.slice( off );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,
	
				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}
	
		return this;
	};
	
	
	
	
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
	
	
	
	
	var docElem = window.document.documentElement;
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;
	
			// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}
	
			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;
	
			if ( !doc ) {
				return;
			}
	
			docElem = doc.documentElement;
	
			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}
	
			// If we don't have gBCR, just use 0,0 rather than error
			// BlackBerry 5, iOS 3 (original iPhone)
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// We assume that getBoundingClientRect is available when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;
	
				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || docElem;
			});
		}
	});
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});
	
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// if curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});
	
	
	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};
	
	jQuery.fn.andSelf = jQuery.fn.addBack;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	
	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in
	// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}
	
	
	
	
	return jQuery;
	
	}));


/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.add = add;
	exports.methodRef = methodRef;
	exports.Box = Box;
	exports.Panel = Panel;
	exports.Folder = Folder;
	exports.Button = Button;
	exports.CheckBox = CheckBox;
	exports.InlineRadio = InlineRadio;
	exports.propLayout = propLayout;
	exports.Text = Text;
	exports.Combo = Combo;
	exports.ButtonRow = ButtonRow;
	exports.List = List;
	exports.Tree = Tree;
	exports.Parameters = Parameters;
	exports.Bus = Bus;
	exports.config = config;
	function add(parent, child) {
	  parent.content.append(child.root);
	}
	
	function methodRef(_this, methodName, args) {
	  return function () {
	    _this[methodName].apply(_this, args);
	  };
	}
	
	function Box(parent) {
	  this.root = this.content = $('<div class="tc-box" />');
	  this.root.addClass('tc-box tc-scroll');
	  this.root.appendTo(parent ? parent : 'body');
	}
	
	Box.prototype.close = function () {
	  this.root.remove();
	};
	
	function Panel() {
	  this.root = this.content = $('<div />');
	  this.root.addClass('tc-panel tc-scroll');
	}
	
	Panel.prototype.close = function () {
	  this.root.remove();
	};
	
	function Folder(title) {
	  this.root = $('<div/>', { 'class': 'tc-folder' });
	  this.content = $('<div/>');
	  this.root.append($('<div/>', { text: title, 'class': 'tc-row tc-title' }));
	  this.root.append(this.content);
	}
	
	function Button(title) {
	  this.root = $('<div/>', { 'class': 'tc-row tc-ctrl tc-ctrl-btn', text: title });
	}
	
	function CheckBox(title, checked) {
	  this.root = $('<div/>', { 'class': 'tc-row tc-ctrl' });
	  this.root.append('<label><input type="checkbox">' + title + '</label>');
	  this.input = this.root.find("input");
	  this.input.prop('checked', !!checked);
	}
	
	function InlineRadio(choiceLabels, choiceValues, checkedIndex) {
	  var name = 'TCAD.toolkit.InlineRadio_' + InlineRadio.COUNTER++;
	  this.root = $('<div/>', { 'class': 'tc-row tc-ctrl tc-inline-radio' });
	  this.inputs = [];
	  for (var i = 0; i < choiceLabels.length; i++) {
	    var checked = checkedIndex === i ? "checked" : '';
	    var label = $('<label><input type="radio" name="' + name + '" value="' + choiceValues[i] + '"><span>' + choiceLabels[i] + '</span></label>');
	    this.inputs.push(label.find("input"));
	    this.root.append(label);
	  }
	  this.inputs[checkedIndex].prop('checked', true);
	}
	
	InlineRadio.prototype.getValue = function () {
	  for (var i = 0; i < this.inputs.length; i++) {
	    if (this.inputs[i].prop('checked')) {
	      return this.inputs[i].attr('value');
	    }
	  }
	  return null;
	};
	
	InlineRadio.COUNTER = 0;
	
	function propLayout(root, name, valueEl) {
	  root.append($('<span/>', { 'class': 'tc-prop-name', text: name })).append($('<div/>', { 'class': 'tc-prop-value' }).append(valueEl));
	}
	
	function NumberWidget(name, initValue, baseStep, round) {
	  this.root = $('<div/>', { 'class': 'tc-row tc-ctrl tc-ctrl-number' });
	  this.input = $("<input type='text' value='" + initValue + "' />");
	  this.slide = false;
	  baseStep = baseStep || 1;
	  round = round || 0;
	  this.min = null;
	  this.max = null;
	  this.accelerator = 100;
	  var scope = this;
	  var lastValue = null;
	  function trigger() {
	    if ($(this).val() !== lastValue) {
	      $(this).trigger('t-change');
	      lastValue = $(this).val();
	    }
	  }
	
	  this.input.on('input', function (e) {
	    var val = $(this).val();
	    //var floatRegex = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;
	    //if (!floatRegex.test(val)) {
	    //  $(this).val(val.replace(/[^0-9\.-]/g, ''));
	    //}
	    trigger.call(this);
	  });
	  this.input.get(0).addEventListener('mousewheel', function (e) {
	    var delta = 0;
	    if (e.wheelDelta) {
	      // WebKit / Opera / Explorer 9
	      delta = e.wheelDelta;
	    } else if (e.detail) {
	      // Firefox
	      delta = -e.detail;
	    }
	    var val = $(this).val();
	    if (!val) val = 0;
	    var step = baseStep * (e.shiftKey ? scope.accelerator : 1);
	    val = parseFloat(val) + (delta < 0 ? -step : step);
	    if (scope.min != null && val < scope.min) {
	      val = scope.min;
	    }
	    if (scope.max != null && val > scope.max) {
	      val = scope.max;
	    }
	    if (round !== 0) {
	      val = val.toFixed(round);
	    }
	    $(this).val(val);
	    e.preventDefault();
	    e.stopPropagation();
	    trigger.call(this);
	  }, false);
	  propLayout(this.root, name, this.input);
	}
	
	NumberWidget.prototype.val = function () {
	  return Number(this.input.val());
	};
	
	function Text(name, initValue) {
	  this.root = $('<div/>', { 'class': 'tc-row tc-ctrl' });
	  this.input = $("<input type='text' value='" + initValue + "' />");
	  propLayout(this.root, name, this.input);
	}
	
	function Combo(id, labelText) {
	  this.root = $('<div/>', { 'class': 'tc-row tc-ctrl tc-ctrl-combo' });
	  var label = $('<span/>', { 'class': 'tc-prop-name', text: labelText });
	  this.select = $('<select>', { id: id });
	  this.root.append(label).append($('<div/>', { 'class': 'tc-prop-value' }).append(this.select));
	}
	
	function ButtonRow(captions, actions) {
	
	  this.root = $('<div/>', { 'class': 'tc-row tc-ctrl tc-buttons-block' });
	
	  function withAction(btn, action) {
	    return btn.click(function () {
	      action.call();
	    });
	  }
	  for (var i = 0; i < captions.length; i++) {
	    var caption = captions[i];
	    var btn = $('<span/>', {
	      text: caption,
	      'class': 'tc-block-btn active-btn'
	    });
	    withAction(btn, actions[i]);
	    this.root.append(btn);
	  }
	}
	
	function List() {
	  this.root = $('<div/>', { 'class': 'tc-list' });
	}
	
	List.prototype.addRow = function (name) {
	  var row = $('<div/>', {
	    text: name, 'class': 'tc-row tc-pseudo-btn'
	  });
	  this.root.append(row);
	  return row;
	};
	
	List.setIconForRow = function (row, icon) {
	  row.css({
	    'background-image': 'url(' + icon + ')'
	  });
	};
	
	function Tree() {
	  this.root = $('<div/>', { 'class': 'tc-tree' });
	}
	
	Tree.prototype.set = function (data) {
	  this.root.empty();
	  this._fill(data, 0);
	};
	
	Tree.prototype._fill = function (data, level) {
	  var notLeaf = data.children !== undefined && data.children.length !== 0;
	  if (data.name !== undefined) {
	    this.root.append($('<div/>', {
	      text: data.name, 'class': 'tc-row' + (notLeaf ? ' tc-chevron-open' : ''),
	      css: { 'margin-left': level * (notLeaf ? 10 : 16) + 'px' }
	    }));
	  }
	  if (notLeaf) {
	    for (var i = 0; i < data.children.length; i++) {
	      var child = data.children[i];
	      this._fill(child, level + 1);
	    }
	  }
	};
	
	function Parameters() {
	  this.listeners = {};
	}
	
	Parameters.prototype.define = function (name, initValue) {
	  function fn(name) {
	    return '___' + name;
	  }
	  this[fn(name)] = initValue;
	  return Object.defineProperty(this, name, {
	    get: function get() {
	      return this[fn(name)];
	    },
	    set: function set(value) {
	      var oldValue = this[fn(name)];
	      this[fn(name)] = value;
	      this.notify(name, value, oldValue);
	    }
	  });
	};
	
	Parameters.prototype.subscribe = function (name, listenerId, callback, scope) {
	  var listenerList = this.listeners[name];
	  if (listenerList === undefined) {
	    listenerList = [];
	    this.listeners[name] = listenerList;
	  }
	  var callbackFunc = scope === undefined ? callback : function () {
	    callback.apply(scope, arguments);
	  };
	  listenerList.push([listenerId, callbackFunc]);
	  var params = this;
	  return function () {
	    callbackFunc(params[name], undefined, null);
	  }; // return init function
	};
	
	Parameters.prototype.notify = function (name, newValue, oldValue) {
	  var listenerList = this.listeners[name];
	  if (listenerList !== undefined) {
	    for (var i = 0; i < listenerList.length; i++) {
	      var listenerId = listenerList[i][0];
	      var callback = listenerList[i][1];
	      if (listenerId == null || this.__currentSender == null || listenerId != this.__currentSender) {
	        callback(newValue, oldValue, this.__currentSender);
	      }
	    }
	  }
	  this.__currentSender = null;
	};
	
	Parameters.prototype.set = function (name, value, sender) {
	  this.__currentSender = sender;
	  this[name] = value;
	};
	
	function Bus() {
	  this.listeners = {};
	}
	
	Bus.prototype.subscribe = function (event, callback, listenerId) {
	  var listenerList = this.listeners[event];
	  if (listenerList === undefined) {
	    listenerList = [];
	    this.listeners[event] = listenerList;
	  }
	  if (listenerId == undefined) listenerId = null;
	  listenerList.push([callback, listenerId]);
	  return callback;
	};
	
	Bus.prototype.unsubscribe = function (event, callback) {
	  var listenerList = this.listeners[event];
	  for (var i = 0; i < listenerList.length; i++) {
	    if (listenerList[i][0] === callback) {
	      listenerList.splice(i, 1);
	      return;
	    }
	  }
	};
	
	Bus.prototype.notify = function (event, data, sender) {
	  var listenerList = this.listeners[event];
	  if (listenerList !== undefined) {
	    for (var i = 0; i < listenerList.length; i++) {
	      var callback = listenerList[i][0];
	      var listenerId = listenerList[i][1];
	      if (sender == undefined || listenerId == null || listenerId != sender) {
	        callback(data);
	      }
	    }
	  }
	};
	
	Bus.Observable = function (initValue) {
	  this.value = initValue;
	};
	
	Bus.prototype.defineObservable = function (scope, name, initValue, eventName) {
	  if (eventName == undefined) eventName = name;
	  var observable = new Bus.Observable(initValue);
	  var bus = this;
	  return Object.defineProperty(scope, name, {
	    get: function get() {
	      return observable.value;
	    },
	    set: function set(value) {
	      observable.value = value;
	      bus.notify(eventName, value);
	    }
	  });
	};
	
	function config(obj, props) {
	  for (var key in props) {
	    obj[key] = props[key];
	  }
	  return obj;
	}
	
	exports.Number = NumberWidget;

/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _math = __webpack_require__(9);
	
	/** @constructor */
	function Vector(x, y, z) {
	  this.x = x || 0;
	  this.y = y || 0;
	  this.z = z || 0;
	}
	
	Vector.prototype.set = function (x, y, z) {
	  this.x = x || 0;
	  this.y = y || 0;
	  this.z = z || 0;
	  return this;
	};
	
	Vector.prototype.set3 = function (data) {
	  this.x = data[0];
	  this.y = data[1];
	  this.z = data[2];
	  return this;
	};
	
	Vector.prototype.setV = function (data) {
	  this.x = data.x;
	  this.y = data.y;
	  this.z = data.z;
	  return this;
	};
	
	Vector.prototype.multiply = function (scalar) {
	  return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
	};
	
	Vector.prototype._multiply = function (scalar) {
	  return this.set(this.x * scalar, this.y * scalar, this.z * scalar);
	};
	
	Vector.prototype.dot = function (vector) {
	  return this.x * vector.x + this.y * vector.y + this.z * vector.z;
	};
	
	Vector.prototype.copy = function () {
	  return new Vector(this.x, this.y, this.z);
	};
	
	Vector.prototype.length = function () {
	  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	};
	
	Vector.prototype.minus = function (vector) {
	  return new Vector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
	};
	
	Vector.prototype._minus = function (vector) {
	  this.x -= vector.x;
	  this.y -= vector.y;
	  this.z -= vector.z;
	  return this;
	};
	
	Vector.prototype._minusXYZ = function (x, y, z) {
	  this.x -= x;
	  this.y -= y;
	  this.z -= z;
	  return this;
	};
	
	Vector.prototype.plus = function (vector) {
	  return new Vector(this.x + vector.x, this.y + vector.y, this.z + vector.z);
	};
	
	Vector.prototype._plus = function (vector) {
	  this.x += vector.x;
	  this.y += vector.y;
	  this.z += vector.z;
	  return this;
	};
	
	Vector.prototype.normalize = function () {
	  var mag = this.length();
	  if (mag == 0.0) {
	    return new Vector(0.0, 0.0, 0.0);
	  }
	  return new Vector(this.x / mag, this.y / mag, this.z / mag);
	};
	
	Vector.prototype._normalize = function () {
	  var mag = this.length();
	  if (mag == 0.0) {
	    return this.set(0, 0, 0);
	  }
	  return this.set(this.x / mag, this.y / mag, this.z / mag);
	};
	
	Vector.prototype.cross = function (a) {
	  return new Vector(this.y * a.z - this.z * a.y, this.z * a.x - this.x * a.z, this.x * a.y - this.y * a.x);
	};
	
	Vector.prototype.negate = function () {
	  return this.multiply(-1);
	};
	
	Vector.prototype._negate = function () {
	  return this._multiply(-1);
	};
	
	Vector.prototype.equals = function (vector) {
	  return (0, _math.vectorsEqual)(this, vector);
	};
	
	Vector.prototype.three = function () {
	  return new THREE.Vector3(this.x, this.y, this.z);
	};
	
	Vector.prototype.csg = function () {
	  return new CSG.Vector3D(this.x, this.y, this.z);
	};
	
	exports.default = Vector;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sq = exports.TOLERANCE = undefined;
	exports.distanceAB = distanceAB;
	exports.distance = distance;
	exports.distanceAB3 = distanceAB3;
	exports.distance3 = distance3;
	exports.circleFromPoints = circleFromPoints;
	exports.norm2 = norm2;
	exports.areEqual = areEqual;
	exports.areVectorsEqual = areVectorsEqual;
	exports.vectorsEqual = vectorsEqual;
	exports.equal = equal;
	exports.strictEqual = strictEqual;
	exports._vec = _vec;
	exports._matrix = _matrix;
	exports.rotate = rotate;
	exports.rotateInPlace = rotateInPlace;
	exports.polygonOffset = polygonOffset;
	exports.isPointInsidePolygon = isPointInsidePolygon;
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _bbox = __webpack_require__(10);
	
	var _bbox2 = _interopRequireDefault(_bbox);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var TOLERANCE = exports.TOLERANCE = 1E-6;
	
	function distanceAB(a, b) {
	  return distance(a.x, a.y, b.x, b.y);
	}
	
	function distance(x1, y1, x2, y2) {
	  var dx = x1 - x2;
	  var dy = y1 - y2;
	  return Math.sqrt(dx * dx + dy * dy);
	}
	
	function distanceAB3(a, b) {
	  return distance3(a.x, a.y, a.z, b.x, b.y, b.z);
	}
	
	function distance3(x1, y1, z1, x2, y2, z2) {
	  var dx = x1 - x2;
	  var dy = y1 - y2;
	  var dz = z1 - z2;
	  return Math.sqrt(dx * dx + dy * dy + dz * dz);
	}
	
	function circleFromPoints(p1, p2, p3) {
	  var center = new _vector2.default();
	  var offset = p2.x * p2.x + p2.y * p2.y;
	  var bc = (p1.x * p1.x + p1.y * p1.y - offset) / 2.0;
	  var cd = (offset - p3.x * p3.x - p3.y * p3.y) / 2.0;
	  var det = (p1.x - p2.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p2.y);
	
	  if (Math.abs(det) < TOLERANCE) {
	    return null;
	  }
	
	  var idet = 1 / det;
	
	  center.x = (bc * (p2.y - p3.y) - cd * (p1.y - p2.y)) * idet;
	  center.y = (cd * (p1.x - p2.x) - bc * (p2.x - p3.x)) * idet;
	  return center;
	}
	
	function norm2(vec) {
	  var sq = 0;
	  for (var i = 0; i < vec.length; i++) {
	    sq += vec[i] * vec[i];
	  }
	  return Math.sqrt(sq);
	}
	
	function areEqual(v1, v2, tolerance) {
	  return Math.abs(v1 - v2) < tolerance;
	}
	
	function areVectorsEqual(v1, v2, tolerance) {
	  return areEqual(v1.x, v2.x, tolerance) && areEqual(v1.y, v2.y, tolerance) && areEqual(v1.z, v2.z, tolerance);
	}
	
	function vectorsEqual(v1, v2) {
	  return areVectorsEqual(v1, v2, TOLERANCE);
	}
	
	function equal(v1, v2) {
	  return areEqual(v1, v2, TOLERANCE);
	}
	
	function strictEqual(a, b) {
	  return a.x == b.x && a.y == b.y && a.z == b.z;
	}
	
	function _vec(size) {
	  var out = [];
	  out.length = size;
	  for (var i = 0; i < size; ++i) {
	    out[i] = 0;
	  }
	  return out;
	}
	
	function _matrix(m, n) {
	  var out = [];
	  out.length = m;
	  for (var i = 0; i < m; ++i) {
	    out[i] = _vec(n);
	  }
	  return out;
	}
	
	function rotate(px, py, angle) {
	  return rotateInPlace(px, py, angle, new _vector2.default());
	}
	
	function rotateInPlace(px, py, angle, out) {
	  out.x = px * Math.cos(angle) - py * Math.sin(angle);
	  out.y = px * Math.sin(angle) + py * Math.cos(angle);
	  return out;
	}
	
	function polygonOffset(polygon, scale) {
	  var origBBox = new _bbox2.default();
	  var scaledBBox = new _bbox2.default();
	  var result = [];
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = polygon[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var point = _step.value;
	
	      var scaledPoint = new _vector2.default(point.x, point.y)._multiply(scale);
	      result.push(scaledPoint);
	      origBBox.checkPoint(point);
	      scaledBBox.checkPoint(scaledPoint);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  var alignVector = scaledBBox.center()._minus(origBBox.center());
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;
	
	  try {
	    for (var _iterator2 = result[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var _point = _step2.value;
	
	      _point._minus(alignVector);
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }
	
	  return result;
	}
	
	function isPointInsidePolygon(inPt, inPolygon) {
	  var EPSILON = TOLERANCE;
	
	  var polyLen = inPolygon.length;
	
	  // inPt on polygon contour => immediate success    or
	  // toggling of inside/outside at every single! intersection point of an edge
	  //  with the horizontal line through inPt, left of inPt
	  //  not counting lowerY endpoints of edges and whole edges on that line
	  var inside = false;
	  for (var p = polyLen - 1, q = 0; q < polyLen; p = q++) {
	    var edgeLowPt = inPolygon[p];
	    var edgeHighPt = inPolygon[q];
	
	    var edgeDx = edgeHighPt.x - edgeLowPt.x;
	    var edgeDy = edgeHighPt.y - edgeLowPt.y;
	
	    if (Math.abs(edgeDy) > EPSILON) {
	      // not parallel
	      if (edgeDy < 0) {
	        edgeLowPt = inPolygon[q];edgeDx = -edgeDx;
	        edgeHighPt = inPolygon[p];edgeDy = -edgeDy;
	      }
	      if (inPt.y < edgeLowPt.y || inPt.y > edgeHighPt.y) continue;
	
	      if (inPt.y == edgeLowPt.y) {
	        if (inPt.x == edgeLowPt.x) return true; // inPt is on contour ?
	        // continue;				// no intersection or edgeLowPt => doesn't count !!!
	      } else {
	        var perpEdge = edgeDy * (inPt.x - edgeLowPt.x) - edgeDx * (inPt.y - edgeLowPt.y);
	        if (perpEdge == 0) return true; // inPt is on contour ?
	        if (perpEdge < 0) continue;
	        inside = !inside; // true intersection left of inPt
	      }
	    } else {
	      // parallel or colinear
	      if (inPt.y != edgeLowPt.y) continue; // parallel
	      // egde lies on the same horizontal line as inPt
	      if (edgeHighPt.x <= inPt.x && inPt.x <= edgeLowPt.x || edgeLowPt.x <= inPt.x && inPt.x <= edgeHighPt.x) return true; // inPt: Point on contour !
	      // continue;
	    }
	  }
	
	  return inside;
	}
	
	var sq = exports.sq = function sq(a) {
	  return a * a;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BBox = function () {
	  function BBox() {
	    _classCallCheck(this, BBox);
	
	    this.minX = Number.MAX_VALUE;
	    this.minY = Number.MAX_VALUE;
	    this.maxX = -Number.MAX_VALUE;
	    this.maxY = -Number.MAX_VALUE;
	  }
	
	  _createClass(BBox, [{
	    key: 'checkBounds',
	    value: function checkBounds(x, y) {
	      this.minX = Math.min(this.minX, x);
	      this.minY = Math.min(this.minY, y);
	      this.maxX = Math.max(this.maxX, x);
	      this.maxY = Math.max(this.maxY, y);
	    }
	  }, {
	    key: 'checkPoint',
	    value: function checkPoint(p) {
	      this.checkBounds(p.x, p.y);
	    }
	  }, {
	    key: 'center',
	    value: function center() {
	      return new _vector2.default(this.minX + (this.maxX - this.minX) / 2, this.minY + (this.maxY - this.minY) / 2, 0);
	    }
	  }, {
	    key: 'width',
	    value: function width() {
	      return this.maxX - this.minX;
	    }
	  }, {
	    key: 'height',
	    value: function height() {
	      return this.maxY - this.minY;
	    }
	  }, {
	    key: 'expand',
	    value: function expand(delta) {
	      this.minX -= delta;
	      this.minY -= delta;
	      this.maxX += delta;
	      this.maxY += delta;
	    }
	  }, {
	    key: 'toPolygon',
	    value: function toPolygon() {
	      return [new _vector2.default(this.minX, this.minY, 0), new _vector2.default(this.maxX, this.minY, 0), new _vector2.default(this.maxX, this.maxY, 0), new _vector2.default(this.minX, this.maxY, 0)];
	    }
	  }]);
	
	  return BBox;
	}();
	
	exports.default = BBox;

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.LUT = LUT;
	exports.compute = compute;
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function LUT(a, b, cp1, cp2, scale) {
	  scale = 1 / scale;
	  var lut = [a];
	  for (var t = 0; t < 1; t += 0.1 * scale) {
	    var p = compute(t, a, b, cp1, cp2);
	    lut.push(p);
	  }
	  lut.push(b);
	  return lut;
	}
	
	function compute(t, from, to, controlPoint1, controlPoint2) {
	  var mt = 1 - t;
	  var mt2 = mt * mt;
	  var t2 = t * t;
	
	  var a = mt2 * mt;
	  var b = mt2 * t * 3;
	  var c = mt * t2 * 3;
	  var d = t * t2;
	  var p0 = from;
	  var p3 = to;
	  var p1 = controlPoint1;
	  var p2 = controlPoint2;
	  return new _vector2.default(a * p0.x + b * p1.x + c * p2.x + d * p3.x, a * p0.y + b * p1.y + c * p2.y + d * p3.y, a * p0.z + b * p1.z + c * p2.z + d * p3.z);
	}

/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */
/***/ function(module, exports) {

	/*
	 * jwerty - Awesome handling of keyboard events
	 *
	 * jwerty is a JS lib which allows you to bind, fire and assert key combination
	 * strings against elements and events. It normalises the poor std api into
	 * something easy to use and clear.
	 *
	 * This code is licensed under the MIT
	 * For the full license see: http://keithamus.mit-license.org/
	 * For more information see: http://keithamus.github.com/jwerty
	 *
	 * @author Keith Cirkel ('keithamus') <jwerty@keithcirkel.co.uk>
	 * @license http://keithamus.mit-license.org/
	 * @copyright Copyright © 2011, Keith Cirkel
	 *
	 */
	(function (global, exports) {
	    
	    // Helper methods & vars:
	    var $d = global.document
	    ,   $ = (global.jQuery || global.Zepto || global.ender || $d)
	    ,   $$
	    ,   $b
	    ,   ke = 'keydown';
	    
	    function realTypeOf(v, s) {
	        return (v === null) ? s === 'null'
	        : (v === undefined) ? s === 'undefined'
	        : (v.is && v instanceof $) ? s === 'element'
	        : Object.prototype.toString.call(v).toLowerCase().indexOf(s) > 7;
	    }
	    
	    if ($ === $d) {
	        $$ = function (selector, context) {
	            return selector ? $.querySelector(selector, context || $) : $;
	        };
	        
	        $b = function (e, fn) { e.addEventListener(ke, fn, false); };
	        $f = function (e, jwertyEv) {
	            var ret = document.createEvent('Event')
	            ,   i;
	            
	            ret.initEvent(ke, true, true);
	            
	            for (i in jwertyEv) ret[i] = jwertyEv[i];
	            
	            return (e || $).dispatchEvent(ret);
	        }
	    } else {
	        $$ = function (selector, context, fn) { return $(selector || $d, context); };
	        $b = function (e, fn) { $(e).bind(ke + '.jwerty', fn); };
	        $f = function (e, ob) { $(e || $d).trigger($.Event(ke, ob)); };
	    }
	    
	    // Private
	    var _modProps = { 16: 'shiftKey', 17: 'ctrlKey', 18: 'altKey', 91: 'metaKey' };
	    
	    // Generate key mappings for common keys that are not printable.
	    var _keys = {
	        
	        // MOD aka toggleable keys
	        mods: {
	            // Shift key, ⇧
	            '⇧': 16, shift: 16,
	            // CTRL key, on Mac: ⌃
	            '⌃': 17, ctrl: 17,
	            // ALT key, on Mac: ⌥ (Alt)
	            '⌥': 18, alt: 18, option: 18,
	            // META, on Mac: ⌘ (CMD), on Windows (Win), on Linux (Super)
	            '⌘': 91, meta: 91, cmd: 91, 'super': 91, win: 91
	        },
	        
	        // Normal keys
	        keys: {
	            // Backspace key, on Mac: ⌫ (Backspace)
	            '⌫': 8, backspace: 8,
	            // Tab Key, on Mac: ⇥ (Tab), on Windows ⇥⇥
	            '⇥': 9, '⇆': 9, tab: 9,
	            // Return key, ↩
	            '↩': 13, 'return': 13, enter: 13, '⌅': 13,
	            // Pause/Break key
	            'pause': 19, 'pause-break': 19,
	            // Caps Lock key, ⇪
	            '⇪': 20, caps: 20, 'caps-lock': 20,
	            // Escape key, on Mac: ⎋, on Windows: Esc
	            '⎋': 27, escape: 27, esc: 27,
	            // Space key
	            space: 32,
	            // Page-Up key, or pgup, on Mac: ↖
	            '↖': 33, pgup: 33, 'page-up': 33,
	            // Page-Down key, or pgdown, on Mac: ↘
	            '↘': 34, pgdown: 34, 'page-down': 34,
	            // END key, on Mac: ⇟
	            '⇟': 35, end: 35,
	            // HOME key, on Mac: ⇞
	            '⇞': 36, home: 36,
	            // Insert key, or ins
	            ins: 45, insert: 45,
	            // Delete key, on Mac: ⌫ (Delete)
	            del: 46, 'delete': 46,
	            
	            // Left Arrow Key, or ←
	            '←': 37, left: 37, 'arrow-left': 37,
	            // Up Arrow Key, or ↑
	            '↑': 38, up: 38, 'arrow-up': 38,
	            // Right Arrow Key, or →
	            '→': 39, right: 39, 'arrow-right': 39,
	            // Up Arrow Key, or ↓
	            '↓': 40, down: 40, 'arrow-down': 40,
	            
	            // odities, printing characters that come out wrong:
	            // Num-Multiply, or *
	            '*': 106, star: 106, asterisk: 106, multiply: 106,
	            // Num-Plus or +
	            '+': 107, 'plus': 107,
	            // Num-Subtract, or -
	            '-': 109, subtract: 109,
	            // Semicolon
	            ';': 186, semicolon:186,
	            // = or equals
	            '=': 187, 'equals': 187,
	            // Comma, or ,
	            ',': 188, comma: 188,
	            //'-': 189, //???
	            // Period, or ., or full-stop
	            '.': 190, period: 190, 'full-stop': 190,
	            // Slash, or /, or forward-slash
	            '/': 191, slash: 191, 'forward-slash': 191,
	            // Tick, or `, or back-quote 
	            '`': 192, tick: 192, 'back-quote': 192,
	            // Open bracket, or [
	            '[': 219, 'open-bracket': 219,
	            // Back slash, or \
	            '\\': 220, 'back-slash': 220,
	            // Close backet, or ]
	            ']': 221, 'close-bracket': 221,
	            // Apostraphe, or Quote, or '
	            '\'': 222, quote: 222, apostraphe: 222
	        }
	        
	    };
	    
	    // To minimise code bloat, add all of the NUMPAD 0-9 keys in a loop
	    i = 95, n = 0;
	    while(++i < 106) {
	        _keys.keys['num-' + n] = i;
	        ++n;
	    }
	    
	    // To minimise code bloat, add all of the top row 0-9 keys in a loop
	    i = 47, n = 0;
	    while(++i < 58) {
	        _keys.keys[n] = i;
	        ++n;
	    }
	    
	    // To minimise code bloat, add all of the F1-F25 keys in a loop
	    i = 111, n = 1;
	    while(++i < 136) {
	        _keys.keys['f' + n] = i;
	        ++n;
	    }
	    
	    // To minimise code bloat, add all of the letters of the alphabet in a loop
	    var i = 64;
	    while(++i < 91) {
	        _keys.keys[String.fromCharCode(i).toLowerCase()] = i;
	    }
	    
	    function JwertyCode(jwertyCode) {
	        var i
	        ,   c
	        ,   n
	        ,   z
	        ,   keyCombo
	        ,   optionals
	        ,   jwertyCodeFragment
	        ,   rangeMatches
	        ,   rangeI;
	        
	        // In-case we get called with an instance of ourselves, just return that.
	        if (jwertyCode instanceof JwertyCode) return jwertyCode;
	        
	        // If jwertyCode isn't an array, cast it as a string and split into array.
	        if (!realTypeOf(jwertyCode, 'array')) {
	            jwertyCode = (String(jwertyCode)).replace(/\s/g, '').toLowerCase().
	                match(/(?:\+,|[^,])+/g);
	        }
	        
	        // Loop through each key sequence in jwertyCode
	        for (i = 0, c = jwertyCode.length; i < c; ++i) {
	            
	            // If the key combo at this part of the sequence isn't an array,
	            // cast as a string and split into an array.
	            if (!realTypeOf(jwertyCode[i], 'array')) {
	                jwertyCode[i] = String(jwertyCode[i])
	                    .match(/(?:\+\/|[^\/])+/g);
	            }
	            
	            // Parse the key optionals in this sequence
	            optionals = [], n = jwertyCode[i].length;
	            while (n--) {
	                
	                // Begin creating the object for this key combo
	                var jwertyCodeFragment = jwertyCode[i][n];
	                
	                keyCombo = {
	                    jwertyCombo: String(jwertyCodeFragment),
	                    shiftKey: false,
	                    ctrlKey: false,
	                    altKey: false,
	                    metaKey: false
	                }
	                
	                // If jwertyCodeFragment isn't an array then cast as a string
	                // and split it into one.
	                if (!realTypeOf(jwertyCodeFragment, 'array')) {
	                    jwertyCodeFragment = String(jwertyCodeFragment).toLowerCase()
	                        .match(/(?:(?:[^\+])+|\+\+|^\+$)/g);
	                }
	                
	                z = jwertyCodeFragment.length;
	                while (z--) {
	                    
	                    // Normalise matching errors
	                    if (jwertyCodeFragment[z] === '++') jwertyCodeFragment[z] = '+';
	                    
	                    // Inject either keyCode or ctrl/meta/shift/altKey into keyCombo
	                    if (jwertyCodeFragment[z] in _keys.mods) {
	                        keyCombo[_modProps[_keys.mods[jwertyCodeFragment[z]]]] = true;
	                    } else if(jwertyCodeFragment[z] in _keys.keys) {
	                        keyCombo.keyCode = _keys.keys[jwertyCodeFragment[z]];
	                    } else {
	                        rangeMatches = jwertyCodeFragment[z].match(/^\[([^-]+\-?[^-]*)-([^-]+\-?[^-]*)\]$/);
	                    }
	                }
	                if (realTypeOf(keyCombo.keyCode, 'undefined')) {
	                    // If we picked up a range match earlier...
	                    if (rangeMatches && (rangeMatches[1] in _keys.keys) && (rangeMatches[2] in _keys.keys)) {
	                        rangeMatches[2] = _keys.keys[rangeMatches[2]];
	                        rangeMatches[1] = _keys.keys[rangeMatches[1]];
	                        
	                        // Go from match 1 and capture all key-comobs up to match 2
	                        for (rangeI = rangeMatches[1]; rangeI < rangeMatches[2]; ++rangeI) {
	                            optionals.push({
	                                altKey: keyCombo.altKey,
	                                shiftKey: keyCombo.shiftKey,
	                                metaKey: keyCombo.metaKey,
	                                ctrlKey: keyCombo.ctrlKey,
	                                keyCode: rangeI,
	                                jwertyCombo: String(jwertyCodeFragment)
	                            });
	                            
	                        }
	                        keyCombo.keyCode = rangeI;
	                    // Inject either keyCode or ctrl/meta/shift/altKey into keyCombo
	                    } else {
	                        keyCombo.keyCode = 0;
	                    }
	                }
	                optionals.push(keyCombo);
	            
	            }
	            this[i] = optionals;
	        }
	        this.length = i;
	        return this;
	    }
	    
	    var jwerty = exports.jwerty = {        
	        /**
	         * jwerty.event
	         *
	         * `jwerty.event` will return a function, which expects the first
	         *  argument to be a key event. When the key event matches `jwertyCode`,
	         *  `callbackFunction` is fired. `jwerty.event` is used by `jwerty.key`
	         *  to bind the function it returns. `jwerty.event` is useful for
	         *  attaching to your own event listeners. It can be used as a decorator
	         *  method to encapsulate functionality that you only want to fire after
	         *  a specific key combo. If `callbackContext` is specified then it will
	         *  be supplied as `callbackFunction`'s context - in other words, the
	         *  keyword `this` will be set to `callbackContext` inside the
	         *  `callbackFunction` function.
	         *
	         *   @param {Mixed} jwertyCode can be an array, or string of key
	         *      combinations, which includes optinals and or sequences
	         *   @param {Function} callbackFucntion is a function (or boolean) which
	         *      is fired when jwertyCode is matched. Return false to
	         *      preventDefault()
	         *   @param {Object} callbackContext (Optional) The context to call
	         *      `callback` with (i.e this)
	         *      
	         */
	        event: function (jwertyCode, callbackFunction, callbackContext /*? this */) {
	            
	            // Construct a function out of callbackFunction, if it is a boolean.
	            if (realTypeOf(callbackFunction, 'boolean')) {
	                var bool = callbackFunction;
	                callbackFunction = function () { return bool; }
	            }
	            
	            jwertyCode = new JwertyCode(jwertyCode);
	            
	            // Initialise in-scope vars.
	            var i = 0
	            ,   c = jwertyCode.length - 1
	            ,   returnValue
	            ,   jwertyCodeIs;
	            
	            // This is the event listener function that gets returned...
	            return function (event) {
	                
	                // if jwertyCodeIs returns truthy (string)...
	                if ((jwertyCodeIs = jwerty.is(jwertyCode, event, i))) {
	                    // ... and this isn't the last key in the sequence,
	                    // incriment the key in sequence to check.
	                    if (i < c) {
	                        ++i;
	                        return;
	                    // ... and this is the last in the sequence (or the only
	                    // one in sequence), then fire the callback
	                    } else {
	                        returnValue = callbackFunction.call(
	                            callbackContext || this, event, jwertyCodeIs);
	                        
	                        // If the callback returned false, then we should run
	                        // preventDefault();
	                        if (returnValue === false) event.preventDefault();
	                        
	                        // Reset i for the next sequence to fire.
	                        i = 0;
	                        return;
	                    }
	                }
	                
	                // If the event didn't hit this time, we should reset i to 0,
	                // that is, unless this combo was the first in the sequence,
	                // in which case we should reset i to 1.
	                i = jwerty.is(jwertyCode, event) ? 1 : 0;
	            }
	        },
	        
	        /**
	         * jwerty.is
	         *
	         * `jwerty.is` will return a boolean value, based on if `event` matches
	         *  `jwertyCode`. `jwerty.is` is called by `jwerty.event` to check
	         *  whether or not to fire the callback. `event` can be a DOM event, or
	         *  a jQuery/Zepto/Ender manufactured event. The properties of
	         *  `jwertyCode` (speficially ctrlKey, altKey, metaKey, shiftKey and
	         *  keyCode) should match `jwertyCode`'s properties - if they do, then
	         *  `jwerty.is` will return `true`. If they don't, `jwerty.is` will
	         *  return `false`.
	         *
	         *   @param {Mixed} jwertyCode can be an array, or string of key
	         *      combinations, which includes optinals and or sequences
	         *   @param {KeyboardEvent} event is the KeyboardEvent to assert against
	         *   @param {Integer} i (Optional) checks the `i` key in jwertyCode
	         *      sequence
	         *      
	         */
	        is: function (jwertyCode, event, i /*? 0*/) {
	            jwertyCode = new JwertyCode(jwertyCode);
	            // Default `i` to 0
	            i = i || 0;
	            // We are only interesting in `i` of jwertyCode;
	            jwertyCode = jwertyCode[i];
	            // jQuery stores the *real* event in `originalEvent`, which we use
	            // because it does annoything stuff to `metaKey`
	            event = event.originalEvent || event;
	            
	            // We'll look at each optional in this jwertyCode sequence...
	            var key
	            ,   n = jwertyCode.length
	            ,   returnValue = false;
	            
	            // Loop through each fragment of jwertyCode
	            while (n--) {
	                returnValue = jwertyCode[n].jwertyCombo;
	                // For each property in the jwertyCode object, compare to `event`
	                for (var p in jwertyCode[n]) {
	                    // ...except for jwertyCode.jwertyCombo...
	                    if (p !== 'jwertyCombo' && event[p] != jwertyCode[n][p]) returnValue = false;
	                }
	                // If this jwertyCode optional wasn't falsey, then we can return early.
	                if (returnValue !== false) return returnValue;
	            }
	            return returnValue;
	        },
	        
	        /**
	         * jwerty.key
	         *
	         *  `jwerty.key` will attach an event listener and fire
	         *   `callbackFunction` when `jwertyCode` matches. The event listener is
	         *   attached to `document`, meaning it will listen for any key events
	         *   on the page (a global shortcut listener). If `callbackContext` is
	         *   specified then it will be supplied as `callbackFunction`'s context
	         *   - in other words, the keyword `this` will be set to
	         *   `callbackContext` inside the `callbackFunction` function.
	         *
	         *   @param {Mixed} jwertyCode can be an array, or string of key
	         *      combinations, which includes optinals and or sequences
	         *   @param {Function} callbackFunction is a function (or boolean) which
	         *      is fired when jwertyCode is matched. Return false to
	         *      preventDefault()
	         *   @param {Object} callbackContext (Optional) The context to call
	         *      `callback` with (i.e this)
	         *   @param {Mixed} selector can be a string, jQuery/Zepto/Ender object,
	         *      or an HTML*Element on which to bind the eventListener
	         *   @param {Mixed} selectorContext can be a string, jQuery/Zepto/Ender
	         *      object, or an HTML*Element on which to scope the selector
	         *  
	         */
	        key: function (jwertyCode, callbackFunction, callbackContext /*? this */, selector /*? document */, selectorContext /*? body */) {
	            // Because callbackContext is optional, we should check if the
	            // `callbackContext` is a string or element, and if it is, then the
	            // function was called without a context, and `callbackContext` is
	            // actually `selector`
	            var realSelector = realTypeOf(callbackContext, 'element') || realTypeOf(callbackContext, 'string') ? callbackContext : selector
	            // If `callbackContext` is undefined, or if we skipped it (and
	            // therefore it is `realSelector`), set context to `global`.
	            ,   realcallbackContext = realSelector === callbackContext ? global : callbackContext
	            // Finally if we did skip `callbackContext`, then shift
	            // `selectorContext` to the left (take it from `selector`)
	            ,    realSelectorContext = realSelector === callbackContext ? selector : selectorContext;
	            
	            // If `realSelector` is already a jQuery/Zepto/Ender/DOM element,
	            // then just use it neat, otherwise find it in DOM using $$()
	            $b(realTypeOf(realSelector, 'element') ?
	               realSelector : $$(realSelector, realSelectorContext)
	            , jwerty.event(jwertyCode, callbackFunction, realcallbackContext));
	        },
	        
	        /**
	         * jwerty.fire
	         *
	         * `jwerty.fire` will construct a keyup event to fire, based on
	         *  `jwertyCode`. The event will be fired against `selector`.
	         *  `selectorContext` is used to search for `selector` within
	         *  `selectorContext`, similar to jQuery's
	         *  `$('selector', 'context')`.
	         *
	         *   @param {Mixed} jwertyCode can be an array, or string of key
	         *      combinations, which includes optinals and or sequences
	         *   @param {Mixed} selector can be a string, jQuery/Zepto/Ender object,
	         *      or an HTML*Element on which to bind the eventListener
	         *   @param {Mixed} selectorContext can be a string, jQuery/Zepto/Ender
	         *      object, or an HTML*Element on which to scope the selector
	         *  
	         */
	        fire: function (jwertyCode, selector /*? document */, selectorContext /*? body */, i) {
	            jwertyCode = new JwertyCode(jwertyCode);
	            var realI = realTypeOf(selectorContext, 'number') ? selectorContext : i;
	            
	            // If `realSelector` is already a jQuery/Zepto/Ender/DOM element,
	            // then just use it neat, otherwise find it in DOM using $$()
	            $f(realTypeOf(selector, 'element') ?
	                selector : $$(selector, selectorContext)
	            , jwertyCode[realI || 0][0]);
	        },
	        
	        KEYS: _keys
	    };
	    
	}(this, (typeof module !== 'undefined' && module.exports ? module.exports : this)));

/***/ },
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Types = exports.BBox = exports.IO = undefined;
	
	var _idGenerator = __webpack_require__(84);
	
	var _viewer2d = __webpack_require__(85);
	
	var _styles = __webpack_require__(86);
	
	var _arc = __webpack_require__(117);
	
	var _point = __webpack_require__(102);
	
	var _segment = __webpack_require__(113);
	
	var _circle = __webpack_require__(109);
	
	var _ellipse = __webpack_require__(107);
	
	var _ellipticalArc = __webpack_require__(108);
	
	var _bezierCurve = __webpack_require__(118);
	
	var _dim = __webpack_require__(120);
	
	var _parametric = __webpack_require__(87);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Types = {
	  END_POINT: 'TCAD.TWO.EndPoint',
	  SEGMENT: 'TCAD.TWO.Segment',
	  ARC: 'TCAD.TWO.Arc',
	  CIRCLE: 'TCAD.TWO.Circle',
	  ELLIPSE: 'TCAD.TWO.Ellipse',
	  ELL_ARC: 'TCAD.TWO.EllipticalArc',
	  BEZIER: 'TCAD.TWO.BezierCurve',
	  DIM: 'TCAD.TWO.Dimension',
	  HDIM: 'TCAD.TWO.HDimension',
	  VDIM: 'TCAD.TWO.VDimension',
	  DDIM: 'TCAD.TWO.DiameterDimension'
	};
	
	IO.BOUNDARY_LAYER_NAME = "__bounds__";
	
	/** @constructor */
	function IO(viewer) {
	  this.viewer = viewer;
	}
	
	IO.prototype.loadSketch = function (sketchData) {
	  return this._loadSketch(JSON.parse(sketchData));
	};
	
	IO.prototype.serializeSketch = function () {
	  return JSON.stringify(this._serializeSketch());
	};
	
	IO.prototype._loadSketch = function (sketch) {
	
	  this.cleanUpData();
	
	  var index = {};
	
	  function endPoint(p) {
	    var id = p[0];
	    var ep = index[id];
	    if (ep !== undefined) {
	      return;
	    }
	    ep = new _point.EndPoint(p[1][1], p[2][1]);
	    index[p[1][0]] = ep._x;
	    index[p[2][0]] = ep._y;
	    index[id] = ep;
	    return ep;
	  }
	
	  var layerIdGen = 0;
	  function getLayer(viewer, name) {
	    if (name === undefined) {
	      name = "layer_" + layerIdGen++;
	    } else {
	      if (name === viewer.dimLayer.name) {
	        return viewer.dimLayer;
	      }
	      for (var i = 0; i < viewer.layers.length; ++i) {
	        if (name === viewer.layers[i].name) {
	          return viewer.layers[i];
	        }
	      }
	    }
	    var layer = new _viewer2d.Layer(name, _styles.Styles.DEFAULT);
	    viewer.layers.push(layer);
	    return layer;
	  }
	  var T = Types;
	  var maxEdge = 0;
	  var sketchLayers = sketch['layers'];
	  var boundary = sketch['boundary'];
	  var boundaryNeedsUpdate = !(boundary === undefined || boundary == null);
	  if (sketchLayers !== undefined) {
	    for (var l = 0; l < sketchLayers.length; ++l) {
	      var ioLayer = sketchLayers[l];
	      var layerName = ioLayer['name'];
	      var boundaryProcessing = layerName == IO.BOUNDARY_LAYER_NAME && boundaryNeedsUpdate;
	      var layer = getLayer(this.viewer, layerName);
	      if (!!ioLayer.style) layer.style = ioLayer.style;
	      layer.readOnly = !!ioLayer.readOnly;
	      var layerData = ioLayer['data'];
	      for (i = 0; i < layerData.length; ++i) {
	        var obj = layerData[i];
	        var skobj = null;
	        var _class = obj['_class'];
	        var aux = !!obj['aux'];
	
	        if (boundaryProcessing) {
	          if (_class === T.SEGMENT && boundary.lines.length == 0) continue;else if (_class === T.ARC && boundary.arcs.length == 0) continue;else if (_class === T.CIRCLE && boundary.circles.length == 0) continue;
	        }
	
	        if (_class === T.SEGMENT) {
	          var points = obj['points'];
	          var a = endPoint(points[0]);
	          var b = endPoint(points[1]);
	          skobj = new _segment.Segment(a, b);
	        } else if (_class === T.END_POINT) {
	          skobj = endPoint(obj['location']);
	        } else if (_class === T.ARC) {
	          var _points = obj['points'];
	          var _a = endPoint(_points[0]);
	          var _b = endPoint(_points[1]);
	          var c = endPoint(_points[2]);
	          skobj = new _arc.Arc(_a, _b, c);
	        } else if (_class === T.CIRCLE) {
	          var _c = endPoint(obj['c']);
	          skobj = new _circle.Circle(_c);
	          skobj.r.set(obj['r']);
	        } else if (_class === T.ELLIPSE) {
	          var ep1 = endPoint(obj['ep1']);
	          var ep2 = endPoint(obj['ep2']);
	          skobj = new _ellipse.Ellipse(ep1, ep2);
	          skobj.r.set(obj['r']);
	        } else if (_class === T.ELL_ARC) {
	          var _ep = endPoint(obj['ep1']);
	          var _ep2 = endPoint(obj['ep2']);
	          var _a2 = endPoint(obj['a']);
	          var _b2 = endPoint(obj['b']);
	          skobj = new _ellipticalArc.EllipticalArc(_ep, _ep2, _a2, _b2);
	          skobj.r.set(obj['r']);
	        } else if (_class === T.BEZIER) {
	          var _a3 = endPoint(obj['a']);
	          var _b3 = endPoint(obj['b']);
	          var cp1 = endPoint(obj['cp1']);
	          var cp2 = endPoint(obj['cp2']);
	          skobj = new _bezierCurve.BezierCurve(_a3, _b3, cp1, cp2);
	        } else if (_class === T.HDIM) {
	          skobj = new _dim.HDimension(obj['a'], obj['b']);
	          skobj.flip = obj['flip'];
	        } else if (_class === T.VDIM) {
	          skobj = new _dim.VDimension(obj['a'], obj['b']);
	          skobj.flip = obj['flip'];
	        } else if (_class === T.DIM) {
	          skobj = new _dim.Dimension(obj['a'], obj['b']);
	          skobj.flip = obj['flip'];
	        } else if (_class === T.DDIM) {
	          skobj = new _dim.DiameterDimension(obj['obj']);
	        }
	        if (skobj != null) {
	          if (!aux) skobj.stabilize(this.viewer);
	          if (aux) skobj.accept(function (o) {
	            o.aux = true;return true;
	          });
	          if (obj['edge'] !== undefined) {
	            skobj.edge = obj['edge'];
	            maxEdge = Math.max(maxEdge, skobj.edge);
	          }
	          layer.add(skobj);
	          index[obj['id']] = skobj;
	
	          //reindex non point children to recover constraints
	          var childrenIds = obj['children'];
	          if (childrenIds) {
	            var children = nonPointChildren(skobj);
	            for (var childIdx = 0; childIdx < childrenIds.length; childIdx++) {
	              index[childrenIds[childIdx]] = children[childIdx];
	            }
	          }
	        }
	        if (boundaryProcessing) {
	          if (_class === T.SEGMENT) this.synchLine(skobj, boundary.lines.shift());else if (_class === T.ARC) this.synchArc(skobj, boundary.arcs.shift());else if (_class === T.CIRCLE) this.synchCircle(skobj, boundary.circles.shift());
	        }
	      }
	    }
	  }
	
	  for (i = 0; i < this.viewer.dimLayer.objects.length; ++i) {
	    obj = this.viewer.dimLayer.objects[i];
	    if (obj._class === T.DIM || obj._class === T.HDIM || obj._class === T.VDIM) {
	      obj.a = index[obj.a];
	      obj.b = index[obj.b];
	    } else if (obj._class === T.DDIM) {
	      obj.obj = index[obj.obj];
	    }
	  }
	
	  if (boundaryNeedsUpdate) {
	    this.addNewBoundaryObjects(boundary, maxEdge);
	  }
	
	  var sketchConstraints = sketch['constraints'];
	  if (sketchConstraints !== undefined) {
	    for (var i = 0; i < sketchConstraints.length; ++i) {
	      try {
	        var _c2 = this.parseConstr(sketchConstraints[i], index);
	        this.viewer.parametricManager._add(_c2);
	      } catch (msg) {
	        console.info("Skipping. " + msg);
	      }
	    }
	    this.viewer.parametricManager.notify();
	  }
	  var constants = sketch['constants'];
	  if (constants !== undefined) {
	    this.viewer.params.constantDefinition = constants;
	  }
	};
	
	IO.prototype.synchLine = function (skobj, edgeObj) {
	  skobj.a.x = edgeObj.a.x;
	  skobj.a.y = edgeObj.a.y;
	  skobj.b.x = edgeObj.b.x;
	  skobj.b.y = edgeObj.b.y;
	};
	
	IO.prototype.synchArc = function (skobj, edgeObj) {
	  skobj.a.x = edgeObj.a.x;
	  skobj.a.y = edgeObj.a.y;
	  skobj.b.x = edgeObj.b.x;
	  skobj.b.y = edgeObj.b.y;
	  skobj.c.x = edgeObj.c.x;
	  skobj.c.y = edgeObj.c.y;
	};
	
	IO.prototype.synchCircle = function (skobj, edgeObj) {
	  skobj.c.x = edgeObj.c.x;
	  skobj.c.y = edgeObj.c.y;
	  skobj.r.set(edgeObj.r);
	};
	
	IO.prototype.addNewBoundaryObjects = function (boundary, maxEdge) {
	  var boundaryLayer = this.viewer.findLayerByName(IO.BOUNDARY_LAYER_NAME);
	
	  if (boundaryLayer === null) {
	    boundaryLayer = new _viewer2d.Layer(IO.BOUNDARY_LAYER_NAME, _styles.Styles.BOUNDS);
	    this.viewer.layers.splice(0, 0, boundaryLayer);
	  }
	
	  boundaryLayer.readOnly = true;
	  boundaryLayer.style = _styles.Styles.BOUNDS;
	
	  var i,
	      obj,
	      id = maxEdge + 1;
	  function __processAux(obj) {
	    obj.edge = id++;
	    obj.accept(function (o) {
	      o.aux = true;
	      return true;
	    });
	  }
	
	  for (i = 0; i < boundary.lines.length; ++i) {
	    var edge = boundary.lines[i];
	    var seg = this.viewer.addSegment(edge.a.x, edge.a.y, edge.b.x, edge.b.y, boundaryLayer);
	    __processAux(seg);
	  }
	  for (i = 0; i < boundary.arcs.length; ++i) {
	    var a = boundary.arcs[i];
	    var arc = new _arc.Arc(new _point.EndPoint(a.a.x, a.a.y), new _point.EndPoint(a.b.x, a.b.y), new _point.EndPoint(a.c.x, a.c.y));
	    boundaryLayer.objects.push(arc);
	    __processAux(arc);
	  }
	  for (i = 0; i < boundary.circles.length; ++i) {
	    obj = boundary.circles[i];
	    var circle = new _circle.Circle(new _point.EndPoint(obj.c.x, obj.c.y));
	    circle.r.set(obj.r);
	    boundaryLayer.objects.push(circle);
	    __processAux(circle);
	  }
	};
	
	IO.prototype.cleanUpData = function () {
	  for (var l = 0; l < this.viewer.layers.length; ++l) {
	    var layer = this.viewer.layers[l];
	    if (layer.objects.length != 0) {
	      layer.objects = [];
	    }
	  }
	  this.viewer.deselectAll();
	  _idGenerator.Generator.resetIDGenerator(0);
	  if (this.viewer.parametricManager.subSystems.length != 0) {
	    this.viewer.parametricManager.subSystems = [];
	    this.viewer.parametricManager.notify();
	  }
	};
	
	IO.prototype._serializeSketch = function () {
	  var sketch = {};
	  //sketch.boundary = boundary;
	  sketch['layers'] = [];
	  function point(p) {
	    return [p.id, [p._x.id, p.x], [p._y.id, p.y]];
	  }
	  var T = Types;
	  var toSave = [this.viewer.dimLayers, this.viewer.layers];
	  for (var t = 0; t < toSave.length; ++t) {
	    var layers = toSave[t];
	    for (var l = 0; l < layers.length; ++l) {
	      var layer = layers[l];
	      var toLayer = { 'name': layer.name, style: layer.style, readOnly: layer.readOnly, 'data': [] };
	      sketch['layers'].push(toLayer);
	      for (var i = 0; i < layer.objects.length; ++i) {
	        var obj = layer.objects[i];
	        var to = { 'id': obj.id, '_class': obj._class };
	        if (obj.aux) to.aux = obj.aux;
	        if (obj.edge !== undefined) to.edge = obj.edge;
	        toLayer['data'].push(to);
	        if (obj._class === T.SEGMENT) {
	          to['points'] = [point(obj.a), point(obj.b)];
	        } else if (obj._class === T.END_POINT) {
	          to['location'] = point(obj);
	        } else if (obj._class === T.ARC) {
	          to['points'] = [point(obj.a), point(obj.b), point(obj.c)];
	        } else if (obj._class === T.CIRCLE) {
	          to['c'] = point(obj.c);
	          to['r'] = obj.r.get();
	        } else if (obj._class === T.ELLIPSE) {
	          to['ep1'] = point(obj.ep1);
	          to['ep2'] = point(obj.ep2);
	          to['r'] = obj.r.get();
	        } else if (obj._class === T.ELL_ARC) {
	          to['ep1'] = point(obj.ep1);
	          to['ep2'] = point(obj.ep2);
	          to['a'] = point(obj.a);
	          to['b'] = point(obj.b);
	          to['r'] = obj.r.get();
	        } else if (obj._class === T.BEZIER) {
	          to['a'] = point(obj.a);
	          to['b'] = point(obj.b);
	          to['cp1'] = point(obj.cp1);
	          to['cp2'] = point(obj.cp2);
	        } else if (obj._class === T.DIM || obj._class === T.HDIM || obj._class === T.VDIM) {
	          to['a'] = obj.a.id;
	          to['b'] = obj.b.id;
	          to['flip'] = obj.flip;
	        } else if (obj._class === T.DDIM) {
	          to['obj'] = obj.obj.id;
	        }
	        var children = nonPointChildren(obj).map(function (c) {
	          return c.id;
	        });
	        if (children.length != 0) {
	          to['children'] = children;
	        }
	      }
	    }
	  }
	
	  var constrs = sketch['constraints'] = [];
	  var subSystems = this.viewer.parametricManager.subSystems;
	  for (var j = 0; j < subSystems.length; j++) {
	    var sub = subSystems[j];
	    for (i = 0; i < sub.constraints.length; ++i) {
	      if (!sub.constraints[i].aux) {
	        constrs.push(this.serializeConstr(sub.constraints[i]));
	      }
	    }
	  }
	
	  var constantDefinition = this.viewer.params.constantDefinition;
	  if (constantDefinition !== undefined && constantDefinition != null && !/^\s*$/.test(constantDefinition)) {
	    sketch['constants'] = constantDefinition;
	  }
	  return sketch;
	};
	
	function nonPointChildren(obj) {
	  var children = [];
	  obj.accept(function (o) {
	    if (o._class !== Types.END_POINT) {
	      children.push(o);
	    }
	    return true;
	  });
	  return children;
	}
	
	IO.prototype.parseConstr = function (c, index) {
	  var name = c[0];
	  var ps = c[1];
	  function find(id) {
	    var p = index[id];
	    if (!p) {
	      throw "Constraint " + name + " refers to nonexistent object.";
	    }
	    return p;
	  }
	  var constrCreate = _parametric.Constraints.Factory[name];
	  if (constrCreate === undefined) {
	    throw "Constraint " + name + " doesn't exist.";
	  }
	  return constrCreate(find, ps);
	};
	
	IO.prototype.serializeConstr = function (c) {
	  return c.serialize();
	};
	
	function _format(str, args) {
	  if (args.length == 0) return str;
	  var i = 0;
	  return str.replace(/\$/g, function () {
	    if (args === undefined || args[i] === undefined) throw "format arguments mismatch";
	    var val = args[i];
	    if (typeof val === 'number') val = val.toPrecision();
	    i++;
	    return val;
	  });
	}
	
	/** @constructor */
	function PrettyColors() {
	  var colors = ["#000000", "#00008B", "#006400", "#8B0000", "#FF8C00", "#E9967A"];
	  var colIdx = 0;
	  this.next = function () {
	    return colors[colIdx++ % colors.length];
	  };
	}
	
	/** @constructor */
	function TextBuilder() {
	  this.data = "";
	  this.fline = function (chunk, args) {
	    this.data += _format(chunk, args) + "\n";
	  };
	  this.line = function (chunk) {
	    this.data += chunk + "\n";
	  };
	  this.number = function (n) {
	    this.data += n.toPrecision();
	  };
	  this.numberln = function (n) {
	    this.number(n);
	    this.data += "\n";
	  };
	}
	
	/** @constructor */
	function BBox() {
	  var bbox = [Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE];
	
	  var T = Types;
	
	  this.checkLayers = function (layers) {
	    for (var l = 0; l < layers.length; ++l) {
	      for (var i = 0; i < layers[l].objects.length; ++i) {
	        this.check(layers[l].objects[i]);
	      }
	    }
	  };
	
	  this.check = function (obj) {
	    var _this = this;
	
	    if (obj._class === T.SEGMENT) {
	      this.checkBounds(obj.a.x, obj.a.y);
	      this.checkBounds(obj.b.x, obj.b.y);
	    } else if (obj._class === T.END_POINT) {
	      this.checkBounds(obj.x, obj.y);
	    } else if (obj._class === T.ARC) {
	      this.checkCircBounds(obj.c.x, obj.c.y, obj.r.get());
	    } else if (obj._class === T.CIRCLE) {
	      this.checkCircBounds(obj.c.x, obj.c.y, obj.r.get());
	    } else if (obj._class === T.ELLIPSE || obj._class === T.ELL_ARC) {
	      this.checkCircBounds(obj.centerX, obj.centerY, Math.max(obj.radiusX, obj.radiusY));
	    } else if (obj) {
	      obj.accept(function (o) {
	        if (o._class == T.END_POINT) {
	          _this.checkBounds(o.x, o.y);
	        }
	        return true;
	      });
	      //    } else if (obj._class === T.DIM || obj._class === T.HDIM || obj._class === T.VDIM) {
	    }
	  };
	
	  this.isValid = function () {
	    return bbox[0] != Number.MAX_VALUE;
	  };
	
	  this.checkBounds = function (x, y) {
	    bbox[0] = Math.min(bbox[0], x);
	    bbox[1] = Math.min(bbox[1], y);
	    bbox[2] = Math.max(bbox[2], x);
	    bbox[3] = Math.max(bbox[3], y);
	  };
	
	  this.checkCircBounds = function (x, y, r) {
	    this.checkBounds(x + r, y + r);
	    this.checkBounds(x - r, y + r);
	    this.checkBounds(x - r, y - r);
	    this.checkBounds(x - r, y + r);
	  };
	
	  this.inc = function (by) {
	    bbox[0] -= by;
	    bbox[1] -= by;
	    bbox[2] += by;
	    bbox[3] += by;
	  };
	
	  this.width = function () {
	    return bbox[2] - bbox[0];
	  };
	
	  this.height = function () {
	    return bbox[3] - bbox[1];
	  };
	
	  this.bbox = bbox;
	}
	
	IO.prototype.getWorkspaceToExport = function () {
	  return [this.viewer.layers];
	};
	
	IO.prototype.getLayersToExport = function () {
	  var ws = this.getWorkspaceToExport();
	  var toExport = [];
	  for (var t = 0; t < ws.length; ++t) {
	    var layers = ws[t];
	    for (var l = 0; l < layers.length; ++l) {
	      var layer = layers[l];
	      toExport.push(layer);
	    }
	  }
	  return toExport;
	};
	
	IO.prototype.svgExport = function () {
	
	  var T = Types;
	  var out = new TextBuilder();
	
	  var bbox = new BBox();
	
	  var a = new _vector2.default();
	  var b = new _vector2.default();
	
	  var prettyColors = new PrettyColors();
	  var toExport = this.getLayersToExport();
	  for (var l = 0; l < toExport.length; ++l) {
	    var layer = toExport[l];
	    var color = prettyColors.next();
	    out.fline('<g id="$" fill="$" stroke="$" stroke-width="$">', [layer.name, "none", color, '2']);
	    for (var i = 0; i < layer.objects.length; ++i) {
	      var obj = layer.objects[i];
	      if (obj._class !== T.END_POINT) bbox.check(obj);
	      if (obj._class === T.SEGMENT) {
	        out.fline('<line x1="$" y1="$" x2="$" y2="$" />', [obj.a.x, obj.a.y, obj.b.x, obj.b.y]);
	      } else if (obj._class === T.ARC) {
	        a.set(obj.a.x - obj.c.x, obj.a.y - obj.c.y, 0);
	        b.set(obj.b.x - obj.c.x, obj.b.y - obj.c.y, 0);
	        var dir = a.cross(b).z > 0 ? 0 : 1;
	        var r = obj.r.get();
	        out.fline('<path d="M $ $ A $ $ 0 $ $ $ $" />', [obj.a.x, obj.a.y, r, r, dir, 1, obj.b.x, obj.b.y]);
	      } else if (obj._class === T.CIRCLE) {
	        out.fline('<circle cx="$" cy="$" r="$" />', [obj.c.x, obj.c.y, obj.r.get()]);
	        //      } else if (obj._class === T.DIM || obj._class === T.HDIM || obj._class === T.VDIM) {
	      }
	    }
	    out.line('</g>');
	  }
	  bbox.inc(20);
	  return _format("<svg viewBox='$ $ $ $'>\n", bbox.bbox) + out.data + "</svg>";
	};
	
	IO.prototype.dxfExport = function () {
	  var T = Types;
	  var out = new TextBuilder();
	  var bbox = new BBox();
	  var toExport = this.getLayersToExport();
	  var i;
	  bbox.checkLayers(toExport);
	  out.line("999");
	  out.line("js.parametric.sketcher");
	  out.line("0");
	  out.line("SECTION");
	  out.line("2");
	  out.line("HEADER");
	  out.line("9");
	  out.line("$ACADVER");
	  out.line("1");
	  out.line("AC1006");
	  out.line("9");
	  out.line("$INSBASE");
	  out.line("10");
	  out.line("0");
	  out.line("20");
	  out.line("0");
	  out.line("30");
	  out.line("0");
	  out.line("9");
	  out.line("$EXTMIN");
	  out.line("10");
	  out.numberln(bbox.bbox[0]);
	  out.line("20");
	  out.numberln(bbox.bbox[1]);
	  out.line("9");
	  out.line("$EXTMAX");
	  out.line("10");
	  out.numberln(bbox.bbox[2]);
	  out.line("20");
	  out.numberln(bbox.bbox[3]);
	  out.line("0");
	  out.line("ENDSEC");
	
	  out.line("0");
	  out.line("SECTION");
	  out.line("2");
	  out.line("TABLES");
	
	  for (i = 0; i < toExport.length; i++) {
	    out.line("0");
	    out.line("LAYER");
	    out.line("2");
	    out.line("" + (i + 1));
	    out.line("70");
	    out.line("64");
	    out.line("62");
	    out.line("7");
	    out.line("6");
	    out.line("CONTINUOUS");
	  }
	  out.line("0");
	  out.line("ENDTAB");
	  out.line("0");
	  out.line("ENDSEC");
	  out.line("0");
	  out.line("SECTION");
	  out.line("2");
	  out.line("BLOCKS");
	  out.line("0");
	  out.line("ENDSEC");
	  out.line("0");
	  out.line("SECTION");
	  out.line("2");
	  out.line("ENTITIES");
	
	  for (var l = 0; l < toExport.length; l++) {
	    var lid = l + 1;
	    var layer = toExport[l];
	    for (i = 0; i < layer.objects.length; ++i) {
	      var obj = layer.objects[i];
	      if (obj._class === T.END_POINT) {
	        out.line("0");
	        out.line("POINT");
	        out.line("8");
	        out.line(lid);
	        out.line("10");
	        out.numberln(obj.x);
	        out.line("20");
	        out.numberln(obj.y);
	        out.line("30");
	        out.line("0");
	      } else if (obj._class === T.SEGMENT) {
	        out.line("0");
	        out.line("LINE");
	        out.line("8");
	        out.line(lid);
	        //out.line("62"); color
	        //out.line("4");
	        out.line("10");
	        out.numberln(obj.a.x);
	        out.line("20");
	        out.numberln(obj.a.y);
	        out.line("30");
	        out.line("0");
	        out.line("11");
	        out.numberln(obj.b.x);
	        out.line("21");
	        out.numberln(obj.b.y);
	        out.line("31");
	        out.line("0");
	      } else if (obj._class === T.ARC) {
	        out.line("0");
	        out.line("ARC");
	        out.line("8");
	        out.line(lid);
	        out.line("10");
	        out.numberln(obj.c.x);
	        out.line("20");
	        out.numberln(obj.c.y);
	        out.line("30");
	        out.line("0");
	        out.line("40");
	        out.numberln(obj.r.get());
	        out.line("50");
	        out.numberln(obj.getStartAngle() * (180 / Math.PI));
	        out.line("51");
	        out.numberln(obj.getEndAngle() * (180 / Math.PI));
	      } else if (obj._class === T.CIRCLE) {
	        out.line("0");
	        out.line("CIRCLE");
	        out.line("8");
	        out.line(lid);
	        out.line("10");
	        out.numberln(obj.c.x);
	        out.line("20");
	        out.numberln(obj.c.y);
	        out.line("30");
	        out.line("0");
	        out.line("40");
	        out.numberln(obj.r.get());
	        //      } else if (obj._class === T.DIM || obj._class === T.HDIM || obj._class === T.VDIM) {
	      }
	    }
	  }
	
	  out.line("0");
	  out.line("ENDSEC");
	  out.line("0");
	  out.line("EOF");
	  return out.data;
	};
	
	IO.exportTextData = function (data, fileName) {
	  var link = document.getElementById("downloader");
	  link.href = "data:application/octet-stream;charset=utf-8;base64," + btoa(data);
	  link.download = fileName;
	  link.click();
	  //console.log(app.viewer.io.svgExport());
	};
	
	exports.IO = IO;
	exports.BBox = BBox;
	exports.Types = Types;

/***/ },
/* 84 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var ID_COUNTER = 0;
	
	var Generator = exports.Generator = {
	  genID: function genID() {
	    return ID_COUNTER++;
	  },
	
	  resetIDGenerator: function resetIDGenerator(value) {
	    ID_COUNTER = value;
	  }
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Styles = exports.Layer = exports.Viewer = undefined;
	
	var _idGenerator = __webpack_require__(84);
	
	var _styles = __webpack_require__(86);
	
	var _toolkit = __webpack_require__(5);
	
	var _parametric = __webpack_require__(87);
	
	var _history = __webpack_require__(97);
	
	var _manager = __webpack_require__(99);
	
	var _pan = __webpack_require__(100);
	
	var _drag = __webpack_require__(111);
	
	var _segment = __webpack_require__(113);
	
	var _point = __webpack_require__(102);
	
	var _primitives = __webpack_require__(114);
	
	var _referencePoint = __webpack_require__(115);
	
	var _basisOrigin = __webpack_require__(116);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _drawUtils = __webpack_require__(105);
	
	var draw_utils = _interopRequireWildcard(_drawUtils);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @constructor */
	function Viewer(canvas, IO) {
	
	  // 1/1000'' aka 1 mil is a standard precision for the imperial system(for engeneering) 
	  // this precision also covers the metric system which is supposed to be ~0.01
	  // this field is used only for displaying purposes now, although in future it could be
	  // used to keep all internal data with such precision transforming the input from user
	  this.presicion = 3;
	  this.canvas = canvas;
	  this.params = new _toolkit.Parameters();
	  this.io = new IO(this);
	  var viewer = this;
	  this.retinaPxielRatio = window.devicePixelRatio > 1 ? window.devicePixelRatio : 1;
	  function updateCanvasSize() {
	    var canvasWidth = canvas.parentNode.offsetWidth;
	    var canvasHeight = canvas.parentNode.offsetHeight;
	
	    canvas.width = canvasWidth * viewer.retinaPxielRatio;
	    canvas.height = canvasHeight * viewer.retinaPxielRatio;
	
	    canvas.style.width = canvasWidth + "px";
	    canvas.style.height = canvasHeight + "px";
	  }
	
	  this.onWindowResize = function () {
	    updateCanvasSize();
	    viewer.refresh();
	  };
	  updateCanvasSize();
	  window.addEventListener('resize', this.onWindowResize, false);
	
	  Object.defineProperty(this, "activeLayer", {
	    get: viewer.getActiveLayer,
	    set: viewer.setActiveLayer
	  });
	
	  this.bus = new _toolkit.Bus();
	  this.ctx = this.canvas.getContext("2d");
	  this._activeLayer = null;
	  this.layers = [];
	  this.dimLayer = new Layer("_dim", _styles.Styles.DIM);
	  this.dimLayers = [this.dimLayer];
	  this.bus.defineObservable(this, 'dimScale', 1);
	  this.bus.subscribe('dimScale', function () {
	    viewer.refresh();
	  });
	
	  this._workspace = [this.layers, this.dimLayers];
	
	  this.referencePoint = new _referencePoint.ReferencePoint();
	  this._serviceWorkspace = [this._createServiceLayers()];
	
	  this.toolManager = new _manager.ToolManager(this, new _pan.PanTool(this));
	  this.parametricManager = new _parametric.ParametricManager(this);
	
	  this.translate = { x: 0.0, y: 0.0 };
	  this.scale = 1.0;
	
	  this.selected = [];
	  this.snapped = null;
	
	  this.historyManager = new _history.HistoryManager(this);
	  this.refresh();
	}
	
	Viewer.prototype.roundToPrecision = function (value) {
	  return value.toFixed(this.presicion);
	};
	
	Viewer.prototype.addSegment = function (x1, y1, x2, y2, layer) {
	  var a = new _point.EndPoint(x1, y1);
	  var b = new _point.EndPoint(x2, y2);
	  var line = new _segment.Segment(a, b);
	  layer.add(line);
	  return line;
	};
	
	Viewer.prototype.remove = function (obj) {
	  if (obj.layer != null) {
	    if (obj.layer.remove(obj)) {
	      this.parametricManager.removeConstraintsByObj(obj);
	    }
	  }
	};
	
	Viewer.prototype.add = function (obj, layer) {
	  layer.add(obj);
	};
	
	function isEndPoint(o) {
	  return o._class === 'TCAD.TWO.EndPoint';
	}
	
	Viewer.prototype.search = function (x, y, buffer, deep, onlyPoints, filter) {
	  var _this = this;
	
	  buffer *= 0.5;
	
	  var pickResult = [];
	  var aim = new _vector2.default(x, y);
	
	  var heroIdx = 0;
	  var unreachable = buffer * 2;
	  var heroLength = unreachable; // unreachable
	
	  function isFiltered(o) {
	    for (var i = 0; i < filter.length; ++i) {
	      if (filter[i] === o) return true;
	    }
	    return false;
	  }
	
	  for (var i = 0; i < this.layers.length; i++) {
	    var objs = this.layers[i].objects;
	    for (var j = 0; j < objs.length; j++) {
	      var l = unreachable + 1;
	      var before = pickResult.length;
	      objs[j].accept(function (o) {
	        if (!o.visible) return true;
	        if (onlyPoints && !isEndPoint(o)) {
	          return true;
	        }
	        l = o.normalDistance(aim, _this.scale);
	        if (l >= 0 && l <= buffer && !isFiltered(o)) {
	          pickResult.push(o);
	          return false;
	        }
	        return true;
	      });
	      var hit = before - pickResult.length != 0;
	      if (hit) {
	        if (!deep && pickResult.length != 0) return pickResult;
	        if (l >= 0 && l < heroLength) {
	          heroLength = l;
	          heroIdx = pickResult.length - 1;
	        }
	      }
	    }
	  }
	  if (pickResult.length > 0) {
	    var _f = pickResult[0];
	    pickResult[0] = pickResult[heroIdx];
	    pickResult[heroIdx] = _f;
	  }
	  return pickResult;
	};
	
	Viewer.prototype._createServiceLayers = function () {
	  var layer = new Layer("_service", _styles.Styles.SERVICE);
	  //  layer.objects.push(new CrossHair(0, 0, 20));
	  layer.objects.push(new _primitives.Point(0, 0, 2));
	  layer.objects.push(this.referencePoint);
	  layer.objects.push(new _basisOrigin.BasisOrigin(null, this));
	  return [layer];
	};
	
	Viewer.prototype.refresh = function () {
	  var viewer = this;
	  window.requestAnimationFrame(function () {
	    viewer.repaint();
	  });
	};
	
	Viewer.prototype.repaint = function () {
	
	  var ctx = this.ctx;
	  ctx.setTransform(1, 0, 0, 1, 0, 0);
	
	  ctx.fillStyle = "#808080";
	  ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	
	  //Order is important!
	  ctx.transform(1, 0, 0, -1, 0, this.canvas.height);
	  ctx.transform(1, 0, 0, 1, this.translate.x, this.translate.y);
	  ctx.transform(this.scale, 0, 0, this.scale, 0, 0);
	
	  this.__prevStyle = null;
	
	  this.__drawWorkspace(ctx, this._workspace, Viewer.__SKETCH_DRAW_PIPELINE);
	  this.__drawWorkspace(ctx, this._serviceWorkspace, Viewer.__SIMPLE_DRAW_PIPELINE);
	};
	
	Viewer.__SKETCH_DRAW_PIPELINE = [function (obj) {
	  return !isEndPoint(obj) && obj.marked === null;
	}, function (obj) {
	  return !isEndPoint(obj) && obj.marked !== null;
	}, function (obj) {
	  return isEndPoint(obj) && obj.marked === null;
	}, function (obj) {
	  return isEndPoint(obj) && obj.marked !== null;
	}];
	
	Viewer.__SIMPLE_DRAW_PIPELINE = [function (obj) {
	  return true;
	}];
	
	Viewer.prototype.__drawWorkspace = function (ctx, workspace, pipeline) {
	  var _this2 = this;
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    var _loop = function _loop() {
	      var drawPredicate = _step.value;
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = workspace[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var layers = _step2.value;
	          var _iteratorNormalCompletion3 = true;
	          var _didIteratorError3 = false;
	          var _iteratorError3 = undefined;
	
	          try {
	            var _loop2 = function _loop2() {
	              var layer = _step3.value;
	              var _iteratorNormalCompletion4 = true;
	              var _didIteratorError4 = false;
	              var _iteratorError4 = undefined;
	
	              try {
	                for (var _iterator4 = layer.objects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                  var obj = _step4.value;
	
	                  obj.accept(function (obj) {
	                    if (!obj.visible) return true;
	                    if (drawPredicate(obj)) {
	                      _this2.__draw(ctx, layer, obj);
	                    }
	                    return true;
	                  });
	                }
	              } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	              } finally {
	                try {
	                  if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                    _iterator4.return();
	                  }
	                } finally {
	                  if (_didIteratorError4) {
	                    throw _iteratorError4;
	                  }
	                }
	              }
	            };
	
	            for (var _iterator3 = layers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	              _loop2();
	            }
	          } catch (err) {
	            _didIteratorError3 = true;
	            _iteratorError3 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                _iterator3.return();
	              }
	            } finally {
	              if (_didIteratorError3) {
	                throw _iteratorError3;
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    };
	
	    for (var _iterator = pipeline[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      _loop();
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	};
	
	Viewer.prototype.__draw = function (ctx, layer, obj) {
	  var style = this.getStyleForObject(layer, obj);
	  if (style !== this.__prevStyle) {
	    this.setStyle(style, ctx);
	  }
	  this.__prevStyle = style;
	  obj.draw(ctx, this.scale / this.retinaPxielRatio, this);
	};
	
	Viewer.prototype.getStyleForObject = function (layer, obj) {
	  if (obj.style != null) {
	    return obj.style;
	  } else if (obj.role != null) {
	    var style = layer.stylesByRoles[obj.role];
	    if (style) {
	      return style;
	    }
	  }
	  return layer.style;
	};
	
	Viewer.prototype.setStyle = function (style, ctx) {
	  draw_utils.SetStyle(style, ctx, this.scale / this.retinaPxielRatio);
	};
	
	Viewer.prototype.snap = function (x, y, excl) {
	  this.cleanSnap();
	  var snapTo = this.search(x, y, 20 / this.scale, true, true, excl);
	  if (snapTo.length > 0) {
	    this.snapped = snapTo[0];
	    this.mark(this.snapped, _styles.Styles.SNAP);
	  }
	  return this.snapped;
	};
	
	Viewer.prototype.cleanSnap = function () {
	  if (this.snapped != null) {
	    this.deselect(this.snapped);
	    this.snapped = null;
	  }
	};
	
	Viewer.prototype.showBounds = function (x1, y1, x2, y2, offset) {
	  var dx = x2 - x1;
	  var dy = y2 - y1;
	  if (this.canvas.width > this.canvas.height) {
	    this.scale = this.canvas.height / dy;
	  } else {
	    this.scale = this.canvas.width / dx;
	  }
	  this.translate.x = -x1 * this.scale;
	  this.translate.y = -y1 * this.scale;
	};
	
	Viewer.prototype.screenToModel2 = function (x, y, out) {
	
	  out.x = x * this.retinaPxielRatio;
	  out.y = this.canvas.height - y * this.retinaPxielRatio;
	
	  out.x -= this.translate.x;
	  out.y -= this.translate.y;
	
	  out.x /= this.scale;
	  out.y /= this.scale;
	};
	
	Viewer.prototype.screenToModel = function (e) {
	  return this._screenToModel(e.offsetX, e.offsetY);
	};
	
	Viewer.prototype._screenToModel = function (x, y) {
	  var out = { x: 0, y: 0 };
	  this.screenToModel2(x, y, out);
	  return out;
	};
	
	Viewer.prototype.accept = function (visitor) {
	  var _iteratorNormalCompletion5 = true;
	  var _didIteratorError5 = false;
	  var _iteratorError5 = undefined;
	
	  try {
	    for (var _iterator5 = this.layers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	      var _layer = _step5.value;
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;
	
	      try {
	        for (var _iterator6 = _layer.objects[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var object = _step6.value;
	
	          if (!object.accept(visitor)) {
	            return false;
	          }
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError5 = true;
	    _iteratorError5 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion5 && _iterator5.return) {
	        _iterator5.return();
	      }
	    } finally {
	      if (_didIteratorError5) {
	        throw _iteratorError5;
	      }
	    }
	  }
	};
	
	Viewer.prototype.findLayerByName = function (name) {
	  for (var i = 0; i < this.layers.length; i++) {
	    if (this.layers[i].name == name) {
	      return this.layers[i];
	    }
	  }
	  return null;
	};
	
	Viewer.prototype.findById = function (id) {
	  var result = null;
	  this.accept(function (o) {
	    if (o.id === id) {
	      result = o;
	      return false;
	    }
	    return true;
	  });
	  return result;
	};
	
	Viewer.prototype.select = function (objs, exclusive) {
	  if (exclusive) this.deselectAll();
	  for (var i = 0; i < objs.length; i++) {
	    this.mark(objs[i]);
	  }
	};
	
	Viewer.prototype.pick = function (e) {
	  var m = this.screenToModel(e);
	  return this.search(m.x, m.y, 20 / this.scale, true, false, []);
	};
	
	Viewer.prototype.mark = function (obj, style) {
	  if (style === undefined) {
	    style = _styles.Styles.MARK;
	  }
	  obj.marked = style;
	
	  if (this.selected.indexOf(obj) == -1) {
	    this.selected.push(obj);
	  }
	};
	
	Viewer.prototype.getActiveLayer = function () {
	  var layer = this._activeLayer;
	  if (layer == null || layer.readOnly) {
	    layer = null;
	    for (var i = 0; i < this.layers.length; i++) {
	      var l = this.layers[i];
	      if (!l.readOnly) {
	        layer = l;
	        break;
	      }
	    }
	  }
	  if (layer == null) {
	    layer = new Layer("JustALayer", _styles.Styles.DEFAULT);
	    this.layers.push(layer);
	  }
	  return layer;
	};
	
	Viewer.prototype.setActiveLayer = function (layer) {
	  if (!layer.readOnly) {
	    this._activeLayer = layer;
	    this.bus.notify("activeLayer");
	  }
	};
	
	Viewer.prototype.deselect = function (obj) {
	  for (var i = 0; i < this.selected.length; i++) {
	    if (obj === this.selected[i]) {
	      this.selected.splice(i, 1)[0].marked = null;
	      break;
	    }
	  }
	};
	
	Viewer.prototype.deselectAll = function () {
	  for (var i = 0; i < this.selected.length; i++) {
	    this.selected[i].marked = null;
	  }
	  while (this.selected.length > 0) {
	    this.selected.pop();
	  }
	};
	
	Viewer.prototype.equalizeLinkedEndpoints = function () {
	  var visited = new Set();
	
	  function equalize(obj) {
	    if (visited.has(obj.id)) return;
	    visited.add(obj.id);
	    var _iteratorNormalCompletion7 = true;
	    var _didIteratorError7 = false;
	    var _iteratorError7 = undefined;
	
	    try {
	      for (var _iterator7 = obj.linked[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	        var link = _step7.value;
	
	        if (isEndPoint(link)) {
	          equalize(obj, link);
	          link.setFromPoint(obj);
	          equalize(link);
	        }
	      }
	    } catch (err) {
	      _didIteratorError7 = true;
	      _iteratorError7 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion7 && _iterator7.return) {
	          _iterator7.return();
	        }
	      } finally {
	        if (_didIteratorError7) {
	          throw _iteratorError7;
	        }
	      }
	    }
	  }
	  this.accept(function (obj) {
	    if (isEndPoint(obj)) {
	      equalize(obj);
	    }
	    return true;
	  });
	};
	
	/** @constructor */
	function Layer(name, style) {
	  this.name = name;
	  this.style = style;
	  this.stylesByRoles = {
	    'construction': _styles.Styles.CONSTRUCTION_OF_OBJECT
	  };
	  this.objects = [];
	  this.readOnly = false; // This is actually a mark for boundary layers coming from 3D
	}
	
	Layer.prototype.remove = function (object) {
	  var idx = this.objects.indexOf(object);
	  if (idx != -1) {
	    this.objects.splice(idx, 1);
	    return true;
	  }
	  return false;
	};
	
	Layer.prototype.add = function (object) {
	  if (object.layer !== undefined) {
	    if (object.layer != null) {
	      object.layer.remove(object);
	    }
	    if (object.layer !== this) {
	      this.objects.push(object);
	      object.layer = this;
	    }
	  } else {
	    this.objects.push(object);
	  }
	};
	
	Viewer.prototype.fullHeavyUIRefresh = function () {
	  this.refresh();
	  this.parametricManager.notify();
	};
	
	exports.Viewer = Viewer;
	exports.Layer = Layer;
	exports.Styles = _styles.Styles;

/***/ },
/* 86 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Styles = exports.Styles = {
	  DEFAULT: {
	    lineWidth: 2,
	    strokeStyle: "#ffffff",
	    fillStyle: "#000000"
	  },
	
	  SERVICE: {
	    lineWidth: 0.3,
	    strokeStyle: "#ff0000",
	    fillStyle: "#FF0000"
	  },
	
	  MARK: {
	    lineWidth: 2,
	    strokeStyle: "#ff0000",
	    fillStyle: "#FF0000"
	  },
	
	  SNAP: {
	    lineWidth: 2,
	    strokeStyle: "#00FF00",
	    fillStyle: "#00FF00"
	  },
	
	  DIM: {
	    lineWidth: 1,
	    strokeStyle: "#bcffc1",
	    fillStyle: "#00FF00"
	  },
	
	  BOUNDS: {
	    lineWidth: 2,
	    strokeStyle: "#fff5c3",
	    fillStyle: "#000000"
	  },
	
	  CONSTRUCTION: {
	    lineWidth: 1,
	    strokeStyle: "#aaaaaa",
	    fillStyle: "#000000"
	  },
	
	  CONSTRUCTION_OF_OBJECT: {
	    lineWidth: 1,
	    strokeStyle: "#888888",
	    fillStyle: "#000000"
	  }
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ParametricManager = exports.Constraints = undefined;
	
	var _utils = __webpack_require__(88);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _ref = __webpack_require__(89);
	
	var _solver = __webpack_require__(90);
	
	var _constraints = __webpack_require__(93);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _fetchers = __webpack_require__(96);
	
	var fetch = _interopRequireWildcard(_fetchers);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var Constraints = {};
	
	/** @constructor */
	function SubSystem() {
	  this.alg = 1;
	  this.error = 0;
	  this.reduce = false;
	  this.constraints = [];
	}
	
	/** @constructor */
	function ParametricManager(viewer) {
	  this.viewer = viewer;
	  this.subSystems = [];
	  this.listeners = [];
	  this.constantTable = {};
	
	  this.viewer.params.define("constantDefinition", null);
	  this.viewer.params.subscribe("constantDefinition", "parametricManager", this.rebuildConstantTable, this)();
	  this.constantResolver = this.createConstantResolver();
	}
	
	ParametricManager.prototype.createConstantResolver = function () {
	  var pm = this;
	  return function (value) {
	    var _value = pm.constantTable[value];
	    if (_value !== undefined) {
	      value = _value;
	    } else if (typeof value != 'number') {
	      console.error("unable to resolve constant " + value);
	    }
	    return value;
	  };
	};
	
	ParametricManager.prototype.notify = function (event) {
	  for (var i = 0; i < this.listeners.length; ++i) {
	    var l = this.listeners[i];
	    l(event);
	  }
	};
	
	ParametricManager.prototype.rebuildConstantTable = function (constantDefinition) {
	  this.constantTable = {};
	  if (constantDefinition == null) return;
	  var lines = constantDefinition.split('\n');
	  var prefix = "(function() { \n";
	  for (var i = 0; i < lines.length; i++) {
	    var line = lines[i];
	    var m = line.match(/^\s*([^\s]+)\s*=(.+)$/);
	    if (m != null && m.length == 3) {
	      var constant = m[1];
	      try {
	        var value = eval(prefix + "return " + m[2] + "; \n})()");
	        this.constantTable[constant] = value;
	        prefix += constant + " = " + value + ";\n";
	      } catch (e) {
	        console.log(e);
	      }
	    }
	  }
	  this.refresh();
	};
	
	ParametricManager.prototype.findComponents = function (constr) {
	  if (this.subSystems.length === 0) {
	    this.subSystems.push(new SubSystem());
	  }
	  return [0];
	};
	
	ParametricManager.prototype.tune = function (subSystem) {};
	
	ParametricManager.prototype._add = function (constr) {
	  var subSystemIds = this.findComponents(constr);
	  var subSystem;
	  switch (subSystemIds.length) {
	    case 0:
	      subSystem = new SubSystem();
	      this.subSystems.push(subSystem);
	      break;
	    case 1:
	      subSystem = this.subSystems[subSystemIds[0]];
	      break;
	    default:
	      subSystem = this.subSystems[subSystemIds[0]];
	      for (var i = 1; i < subSystemIds.length; i++) {
	        var toMerge = subSystemIds[i];
	        for (var j = 0; j < toMerge.constraints.length; j++) {
	          subSystem.push(toMerge.constraints[j]);
	        }
	      }
	      break;
	  }
	  subSystem.constraints.push(constr);
	  return subSystem;
	};
	
	ParametricManager.prototype.checkRedundancy = function (subSystem, constr) {
	  var solver = this.prepareForSubSystem([], subSystem.constraints);
	  if (solver.diagnose().conflict) {
	    alert("Most likely this " + constr.NAME + " constraint is CONFLICTING!");
	  }
	};
	
	ParametricManager.prototype.refresh = function () {
	  this.solve();
	  this.notify();
	  this.viewer.refresh();
	};
	
	ParametricManager.prototype.add = function (constr) {
	  this.viewer.historyManager.checkpoint();
	  var subSystem = this._add(constr);
	  this.checkRedundancy(subSystem, constr);
	  this.refresh();
	};
	
	ParametricManager.prototype.addAll = function (constrs) {
	  for (var i = 0; i < constrs.length; i++) {
	    var subSystem = this._add(constrs[i]);
	    this.checkRedundancy(subSystem, constrs[i]);
	  }
	  this.refresh();
	};
	
	ParametricManager.prototype.remove = function (constr) {
	  this.viewer.historyManager.checkpoint();
	  for (var j = 0; j < this.subSystems.length; j++) {
	    var sub = this.subSystems[j];
	    for (var i = 0; i < sub.constraints.length; ++i) {
	      var p = sub.constraints[i];
	      if (p === constr) {
	        sub.constraints.splice(i, 1);
	        if (p.NAME === 'coi') {
	          this.unlinkObjects(p.a, p.b);
	        }
	        break;
	      }
	    }
	  }
	  this.refresh();
	};
	
	ParametricManager.prototype.removeConstraintsByObj = function (obj) {
	  var ownedParams = [];
	  obj.collectParams(ownedParams);
	  this.removeConstraintsByParams(ownedParams);
	};
	
	ParametricManager.prototype.removeConstraintsByParams = function (ownedParams) {
	  for (var s = 0; s < this.subSystems.length; s++) {
	    var toRemove = [];
	    var sub = this.subSystems[s];
	    var i;
	    for (i = 0; i < sub.constraints.length; ++i) {
	      var sdataArr = sub.constraints[i].getSolveData(this.constantResolver);
	      MAIN: for (var j = 0; j < sdataArr.length; j++) {
	        var sdata = sdataArr[j];
	        var params = sdata[1];
	        for (var oi = 0; oi < ownedParams.length; ++oi) {
	          for (var k = 0; k < params.length; ++k) {
	            if (ownedParams[oi].id === params[k].id) {
	              toRemove.push(i);
	              break MAIN;
	            }
	          }
	        }
	      }
	    }
	    toRemove.sort();
	
	    for (i = toRemove.length - 1; i >= 0; --i) {
	      sub.constraints.splice(toRemove[i], 1);
	    }
	  }
	
	  this.notify();
	};
	
	ParametricManager.prototype.lock = function (objs) {
	  var p = fetch.points(objs);
	  for (var i = 0; i < p.length; ++i) {
	    this._add(new Constraints.Lock(p[i], { x: p[i].x, y: p[i].y }));
	  }
	  this.refresh();
	};
	
	ParametricManager.prototype.vertical = function (objs) {
	  this.addAll(fetch.lines(objs).map(function (line) {
	    return new Constraints.Vertical(line);
	  }));
	};
	
	ParametricManager.prototype.horizontal = function (objs) {
	  this.addAll(fetch.lines(objs).map(function (line) {
	    return new Constraints.Horizontal(line);
	  }));
	};
	
	ParametricManager.prototype.parallel = function (objs) {
	  var lines = fetch.lines(objs);
	  var constraints = [];
	  for (var i = 1; i < lines.length; i++) {
	    constraints.push(new Constraints.Parallel(lines[i - 1], lines[i]));
	  }
	  this.addAll(constraints);
	};
	
	ParametricManager.prototype.perpendicular = function (objs) {
	  var lines = fetch.twoLines(objs);
	  this.add(new Constraints.Perpendicular(lines[0], lines[1]));
	};
	
	ParametricManager.prototype.lockConvex = function (objs, warnCallback) {
	  var lines = fetch.twoLines(objs);
	  var l1 = lines[0];
	  var l2 = lines[1];
	  var pts = [l1.a, l1.b, l2.a, l2.b];
	  function isLinked(p1, p2) {
	    for (var i = 0; i < p1.linked.length; ++i) {
	      if (p1.linked[i].id === p2.id) {
	        return true;
	      }
	    }
	    return false;
	  }
	
	  function swap(arr, i1, i2) {
	    var _ = arr[i1];
	    arr[i1] = arr[i2];
	    arr[i2] = _;
	  }
	
	  if (isLinked(pts[0], pts[2])) {
	    swap(pts, 0, 1);
	  } else if (isLinked(pts[0], pts[3])) {
	    swap(pts, 0, 1);
	    swap(pts, 2, 3);
	  } else if (isLinked(pts[1], pts[3])) {
	    swap(pts, 2, 3);
	  } else if (isLinked(pts[1], pts[2])) {
	    //we are good
	  } else {
	    warnCallback("Lines must be connected");
	    return;
	  }
	
	  var c = pts[0];
	  var a = pts[1];
	  var t = pts[3];
	
	  // ||ac x at|| > 0 
	  var crossNorma = (c.x - a.x) * (t.y - a.y) - (c.y - a.y) * (t.x - a.x);
	
	  if (crossNorma < 0) {
	    var _ = c;
	    c = t;
	    t = _;
	  }
	
	  this.add(new Constraints.LockConvex(c, a, t));
	};
	
	ParametricManager.prototype.tangent = function (objs) {
	  var ellipses = fetch.generic(objs, ['TCAD.TWO.Ellipse', 'TCAD.TWO.EllipticalArc'], 0);
	  var lines = fetch.generic(objs, ['TCAD.TWO.Segment'], 1);
	  if (ellipses.length > 0) {
	    this.add(new Constraints.EllipseTangent(lines[0], ellipses[0]));
	  } else {
	    var arcs = fetch.generic(objs, ['TCAD.TWO.Arc', 'TCAD.TWO.Circle'], 1);
	    this.add(new Constraints.Tangent(arcs[0], lines[0]));
	  }
	};
	
	ParametricManager.prototype.rr = function (arcs) {
	  var prev = arcs[0];
	  for (var i = 1; i < arcs.length; ++i) {
	    this._add(new Constraints.RR(prev, arcs[i]));
	    prev = arcs[i];
	  }
	  this.refresh();
	};
	
	ParametricManager.prototype.ll = function (lines) {
	  var prev = lines[0];
	  for (var i = 1; i < lines.length; ++i) {
	    this._add(new Constraints.LL(prev, lines[i]));
	    prev = lines[i];
	  }
	  this.refresh();
	};
	
	ParametricManager.prototype.entityEquality = function (objs) {
	  var arcs = fetch.generic(objs, ['TCAD.TWO.Arc', 'TCAD.TWO.Circle'], 0);
	  var lines = fetch.generic(objs, ['TCAD.TWO.Segment'], 0);
	  if (arcs.length > 0) this.rr(arcs);
	  if (lines.length > 0) this.ll(lines);
	};
	
	ParametricManager.prototype.p2lDistance = function (objs, promptCallback) {
	  var pl = fetch.pointAndLine(objs);
	
	  var target = pl[0];
	  var segment = pl[1];
	
	  var ex = new _vector2.default(-(segment.b.y - segment.a.y), segment.b.x - segment.a.x).normalize();
	  var distance = Math.abs(ex.dot(new _vector2.default(segment.a.x - target.x, segment.a.y - target.y)));
	
	  var promptDistance = utils.askNumber(Constraints.P2LDistance.prototype.SettableFields.d, distance.toFixed(2), promptCallback, this.constantResolver);
	
	  if (promptDistance != null) {
	    this.add(new Constraints.P2LDistance(target, segment, promptDistance));
	  }
	};
	
	ParametricManager.prototype.pointInMiddle = function (objs) {
	  var pl = fetch.pointAndLine(objs);
	  this.add(new Constraints.PointInMiddle(pl[0], pl[1]));
	};
	
	ParametricManager.prototype.symmetry = function (objs) {
	  var pl = fetch.pointAndLine(objs);
	  this.add(new Constraints.Symmetry(pl[0], pl[1]));
	};
	
	ParametricManager.prototype.pointOnArc = function (objs) {
	  var points = fetch.generic(objs, ['TCAD.TWO.EndPoint'], 1);
	  var arcs = fetch.generic(objs, ['TCAD.TWO.Arc', 'TCAD.TWO.Circle', 'TCAD.TWO.Ellipse', 'TCAD.TWO.EllipticalArc'], 1);
	  var arc = arcs[0];
	  if (arc._class == 'TCAD.TWO.Ellipse' || arc._class == 'TCAD.TWO.EllipticalArc') {
	    this.add(new Constraints.PointOnEllipse(points[0], arc));
	  } else {
	    this.add(new Constraints.PointOnArc(points[0], arc));
	  }
	};
	
	ParametricManager.prototype.pointOnLine = function (objs) {
	  var pl = fetch.pointAndLine(objs);
	  var target = pl[0];
	  var segment = pl[1];
	  this.add(new Constraints.PointOnLine(target, segment));
	};
	
	ParametricManager.prototype.llAngle = function (objs, promptCallback) {
	  var lines = fetch.generic(objs, 'TCAD.TWO.Segment', 2);
	  var l1 = lines[0];
	  var l2 = lines[1];
	
	  var points = [l1.a, l1.b, l2.a, l2.b];
	
	  if (l1.b.x < l1.a.x) {
	    points[0] = l1.b;
	    points[1] = l1.a;
	  }
	
	  if (l2.b.x < l2.a.x) {
	    points[2] = l2.b;
	    points[3] = l2.a;
	  }
	
	  var dx1 = points[1].x - points[0].x;
	  var dy1 = points[1].y - points[0].y;
	  var dx2 = points[3].x - points[2].x;
	  var dy2 = points[3].y - points[2].y;
	
	  var angle = Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1);
	  angle *= 1 / Math.PI * 180;
	  angle = utils.askNumber(Constraints.Angle.prototype.SettableFields.angle, angle.toFixed(2), promptCallback, this.constantResolver);
	  if (angle === null) return;
	  this.add(new Constraints.Angle(points[0], points[1], points[2], points[3], angle));
	};
	
	ParametricManager.prototype.p2pDistance = function (objs, promptCallback) {
	  var p = fetch.twoPoints(objs);
	  var distance = new _vector2.default(p[1].x - p[0].x, p[1].y - p[0].y).length();
	  var promptDistance = utils.askNumber(Constraints.P2PDistance.prototype.SettableFields.d, distance.toFixed(2), promptCallback, this.constantResolver);
	
	  if (promptDistance != null) {
	    this.add(new Constraints.P2PDistance(p[0], p[1], promptDistance));
	  }
	};
	
	ParametricManager.prototype.radius = function (objs, promptCallback) {
	  var arcs = fetch.arkCirc(objs, 1);
	  var radius = arcs[0].r.get();
	  var promptDistance = utils.askNumber(Constraints.Radius.prototype.SettableFields.d, radius.toFixed(2), promptCallback, this.constantResolver);
	  if (promptDistance != null) {
	    for (var i = 0; i < arcs.length; ++i) {
	      this._add(new Constraints.Radius(arcs[i], promptDistance));
	    }
	    this.refresh();
	  }
	};
	
	ParametricManager.prototype.linkObjects = function (objs) {
	  var i;
	  var masterIdx = -1;
	  for (i = 0; i < objs.length; ++i) {
	    if (ParametricManager.isAux(objs[i])) {
	      if (masterIdx !== -1) {
	        throw "not allowed to have a coincident constraint between two or more auxiliary objects";
	      }
	      masterIdx = i;
	    }
	  }
	  if (masterIdx === -1) masterIdx = objs.length - 1;
	
	  for (i = 0; i < objs.length; ++i) {
	    if (i === masterIdx) continue;
	    objs[i].x = objs[masterIdx].x;
	    objs[i].y = objs[masterIdx].y;
	    var c = new Constraints.Coincident(objs[i], objs[masterIdx]);
	    this._add(c);
	  }
	  this.notify();
	};
	
	ParametricManager.prototype.unlinkObjects = function (a, b) {
	
	  function _unlink(a, b) {
	    for (var i = 0; i < a.linked.length; ++i) {
	      var obj = a.linked[i];
	      if (obj.id === b.id) {
	        a.linked.splice(i, 1);
	        break;
	      }
	    }
	  }
	  _unlink(a, b);
	  _unlink(b, a);
	};
	
	ParametricManager.prototype.findCoincidentConstraint = function (point1, point2) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = this.subSystems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var subSys = _step.value;
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = subSys.constraints[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var c = _step2.value;
	
	          if (c.NAME === 'coi' && (c.a.id === point1.id && c.b.id === point2.id || c.b.id === point1.id && c.a.id === point2.id)) {
	            return c;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  return null;
	};
	
	ParametricManager.prototype.coincident = function (objs) {
	  if (objs.length == 0) return;
	  this.linkObjects(objs);
	  this.solve();
	  this.viewer.refresh();
	};
	
	ParametricManager.prototype.getSolveData = function () {
	  var sdata = [];
	  for (var i = 0; i < this.subSystems.length; i++) {
	    this.__getSolveData(this.subSystems[i].constraints, sdata);
	  }
	  return sdata;
	};
	
	ParametricManager.prototype.__getSolveData = function (constraints, out) {
	  for (var i = 0; i < constraints.length; ++i) {
	    var constraint = constraints[i];
	    var data = constraint.getSolveData(this.constantResolver);
	    for (var j = 0; j < data.length; ++j) {
	      data[j].push(constraint.reducible !== undefined);
	      out.push(data[j]);
	    }
	  }
	  return out;
	};
	
	ParametricManager.prototype.solve = function () {
	  var solver = this.prepare([]);
	  solver.solve(false);
	  solver.sync();
	};
	
	ParametricManager.prototype.solveWithLock = function (lock) {
	  var solver = this.prepare(lock);
	  solver.solve(false);
	  solver.sync();
	};
	
	ParametricManager.prototype.prepare = function (locked, extraConstraints) {
	  return this._prepare(locked, this.subSystems, extraConstraints);
	};
	
	ParametricManager.prototype._prepare = function (locked, subSystems, extraConstraints) {
	  var solvers = [];
	  for (var i = 0; i < subSystems.length; i++) {
	    solvers.push(this.prepareForSubSystem(locked, subSystems[i].constraints, extraConstraints));
	  }
	  if (subSystems.length == 0 && locked.length != 0) {
	    solvers.push(this.prepareForSubSystem(locked, [], extraConstraints));
	  }
	  return {
	    solvers: solvers,
	
	    solve: function solve(rough) {
	      for (var i = 0; i < solvers.length; i++) {
	        var alg = i < subSystems.length ? subSystems[i].alg : 1;
	        var res = solvers[i].solve(rough, alg);
	        if (res.returnCode !== 1) {
	          alg = alg == 1 ? 2 : 1;
	          //if (solvers[i].solve(rough, alg).returnCode == 1) {
	          //subSystems[i].alg = alg;
	          //}
	        }
	      }
	    },
	
	    sync: function sync() {
	      for (var i = 0; i < solvers.length; i++) {
	        solvers[i].sync();
	      }
	    },
	
	    updateParameter: function updateParameter(p) {
	      for (var i = 0; i < solvers.length; i++) {
	        solvers[i].updateParameter(p);
	      }
	    },
	
	    updateLock: function updateLock(values) {
	      for (var i = 0; i < solvers.length; i++) {
	        solvers[i].updateLock(values);
	      }
	    }
	  };
	};
	
	ParametricManager.isAux = function (obj) {
	  while (!!obj) {
	    if (!!obj.aux) {
	      return true;
	    }
	    obj = obj.parent;
	  }
	  return false;
	};
	
	ParametricManager.fetchAuxParams = function (system, auxParams, auxDict) {
	  for (var i = 0; i < system.length; ++i) {
	    for (var p = 0; p < system[i][1].length; ++p) {
	      var parameter = system[i][1][p];
	      if (parameter.obj !== undefined) {
	        if (ParametricManager.isAux(parameter.obj)) {
	          if (auxDict[parameter.id] === undefined) {
	            auxDict[parameter.id] = parameter;
	            auxParams.push(parameter);
	          }
	        }
	      }
	    }
	  }
	};
	
	ParametricManager.__toId = function (v) {
	  return v.id;
	};
	
	ParametricManager.reduceSystem = function (system, readOnlyParams) {
	
	  var info = {
	    idToParam: {},
	    linkedParams: [],
	    reducedConstraints: {},
	    reducedParams: {}
	  };
	
	  var links = [];
	  function Link(a, b, constr) {
	    this.a = a;
	    this.b = b;
	    this.constr = constr;
	    this.invalid = false;
	    this.processed = false;
	  }
	
	  var c,
	      pi,
	      paramToConstraints = {};
	  for (i = 0; i < system.length; ++i) {
	    c = system[i];
	    if (c[3] !== true) {
	      for (pi = 0; pi < c[1].length; pi++) {
	        var param = c[1][pi];
	        var paramConstrs = paramToConstraints[param.id];
	        if (paramConstrs === undefined) {
	          paramConstrs = [];
	          paramToConstraints[param.id] = paramConstrs;
	        }
	        paramConstrs.push(i);
	      }
	    }
	  }
	
	  for (i = 0; i < system.length; ++i) {
	    c = system[i];
	    if (c[3] === true) {
	      //Reduce flag
	      var cp1 = c[1][0];
	      var cp2 = c[1][1];
	      links.push(new Link(cp1, cp2, i));
	    }
	  }
	  function intersect(array1, array2) {
	    if (!array1 || !array2) return false;
	    return array1.filter(function (n) {
	      return array2.indexOf(n) != -1;
	    }).length != 0;
	  }
	
	  function shared(param1, param2) {
	    if (param1 == param2) return false;
	    var assoc0 = paramToConstraints[param1];
	    var assoc1 = paramToConstraints[param2];
	    return intersect(assoc0, assoc1);
	  }
	
	  var linkTuples = [];
	
	  function mergeLinks(startIndex, into) {
	    var linkI = links[startIndex];
	    if (linkI.processed) return;
	    linkI.processed = true;
	    into.push(linkI);
	    for (var j = startIndex + 1; j < links.length; j++) {
	      var linkJ = links[j];
	      if (linkI.a.id == linkJ.a.id || linkI.a.id == linkJ.b.id || linkI.b.id == linkJ.a.id || linkI.b.id == linkJ.b.id) {
	        mergeLinks(j, into);
	      }
	    }
	  }
	  for (i = 0; i < links.length; i++) {
	    if (links[i].processed) continue;
	    var linkTuple = [];
	    linkTuples.push(linkTuple);
	    mergeLinks(i, linkTuple);
	  }
	
	  function resolveConflicts() {
	    for (var i = 0; i < linkTuples.length; i++) {
	      var tuple = linkTuples[i];
	
	      for (var j = 0; j < tuple.length; j++) {
	        var linkA = tuple[j];
	        if (linkA.invalid) continue;
	        if (shared(linkA.a.id, linkA.b.id)) {
	          linkA.invalid = true;
	          continue;
	        }
	        for (var k = j + 1; k < tuple.length; k++) {
	          var linkB = tuple[k];
	          if (shared(linkA.a.id, linkB.a.id) || shared(linkA.a.id, linkB.b.id) || shared(linkA.b.id, linkB.a.id) || shared(linkA.b.id, linkB.b.id)) {
	            linkB.invalid = true;
	          }
	        }
	      }
	    }
	  }
	  resolveConflicts();
	
	  function _merge(arr1, arr2) {
	    for (var i = 0; i < arr2.length; ++i) {
	      if (arr1.indexOf(arr2[i]) < 0) {
	        arr1.push(arr2[i]);
	      }
	    }
	  }
	
	  function linksToTuples(linkTuples) {
	    var tuples = [];
	    for (var i = 0; i < linkTuples.length; i++) {
	      var linkTuple = linkTuples[i];
	      var tuple = [];
	      tuples.push(tuple);
	      for (var j = 0; j < linkTuple.length; j++) {
	        var link = linkTuple[j];
	        if (!link.invalid) {
	          _merge(tuple, [link.a.id, link.b.id]);
	          info.reducedConstraints[link.constr] = true;
	          info.idToParam[link.a.id] = link.a;
	          info.idToParam[link.b.id] = link.b;
	        }
	      }
	    }
	    return tuples;
	  }
	  var tuples = linksToTuples(linkTuples);
	
	  for (var i = 0; i < tuples.length; ++i) {
	    var tuple = tuples[i];
	    info.linkedParams.push(tuple);
	    for (var mi = 0; mi < readOnlyParams.length; ++mi) {
	      var masterParam = readOnlyParams[mi];
	      var masterIdx = tuple.indexOf(masterParam.id);
	      if (masterIdx >= 0) {
	        var tmp = tuple[0];
	        tuple[0] = tuple[masterIdx];
	        tuple[masterIdx] = tmp;
	        break;
	      }
	    }
	  }
	
	  for (var ei = 0; ei < info.linkedParams.length; ++ei) {
	    var master = info.linkedParams[ei][0];
	    for (i = 1; i < info.linkedParams[ei].length; ++i) {
	      info.reducedParams[info.linkedParams[ei][i]] = master;
	    }
	  }
	  return info;
	};
	
	ParametricManager.prototype.prepareForSubSystem = function (locked, subSystemConstraints, extraConstraints) {
	
	  var constrs = [];
	  var solverParamsDict = {};
	  var system = [];
	  var auxParams = [];
	  var auxDict = {};
	
	  this.__getSolveData(subSystemConstraints, system);
	  if (!!extraConstraints) this.__getSolveData(extraConstraints, system);
	
	  ParametricManager.fetchAuxParams(system, auxParams, auxDict);
	  var readOnlyParams = auxParams.concat(locked);
	  var reduceInfo = ParametricManager.reduceSystem(system, readOnlyParams);
	
	  function getSolverParam(p) {
	    var master = reduceInfo.reducedParams[p.id];
	    if (master !== undefined) {
	      p = reduceInfo.idToParam[master];
	    }
	    var _p = solverParamsDict[p.id];
	    if (_p === undefined) {
	      if (p.__cachedParam__ === undefined) {
	        _p = new _solver.Param(p.id, p.get());
	        p.__cachedParam__ = _p;
	      } else {
	        _p = p.__cachedParam__;
	        _p.reset(p.get());
	      }
	
	      _p._backingParam = p;
	      solverParamsDict[p.id] = _p;
	    }
	    return _p;
	  }
	
	  (function pickupAuxiliaryInfoFromSlaves() {
	    for (var i = 0; i < reduceInfo.linkedParams.length; ++i) {
	      var linkedParams = reduceInfo.linkedParams[i];
	      var master = linkedParams[0];
	      if (auxDict[master] !== undefined) continue;
	      for (var j = 1; j < linkedParams.length; j++) {
	        var slave = linkedParams[j];
	        if (auxDict[slave] !== undefined) {
	          auxDict[master] = true;
	          break;
	        }
	      }
	    }
	  })();
	
	  var aux = [];
	  for (var i = 0; i < system.length; ++i) {
	
	    var sdata = system[i];
	    var params = [];
	
	    for (var p = 0; p < sdata[1].length; ++p) {
	      var param = sdata[1][p];
	      var solverParam = getSolverParam(param);
	      params.push(solverParam);
	      if (auxDict[param.id] !== undefined) {
	        aux.push(solverParam);
	      }
	    }
	    if (reduceInfo.reducedConstraints[i] === true) continue;
	
	    var _constr = (0, _constraints.createByConstraintName)(sdata[0], params, sdata[2]);
	    constrs.push(_constr);
	  }
	
	  var lockedSolverParams = [];
	  for (p = 0; p < locked.length; ++p) {
	    lockedSolverParams[p] = getSolverParam(locked[p]);
	  }
	
	  var solver = (0, _solver.prepare)(constrs, lockedSolverParams, aux);
	  function solve(rough, alg) {
	    return solver.solveSystem(rough, alg);
	  }
	
	  var viewer = this.viewer;
	  function sync() {
	    for (var paramId in solverParamsDict) {
	      var solverParam = solverParamsDict[paramId];
	      if (!!solverParam._backingParam.aux) continue;
	      solverParam._backingParam.set(solverParam.get());
	    }
	
	    //Make sure all coincident constraints are equal
	    for (var ei = 0; ei < reduceInfo.linkedParams.length; ++ei) {
	      var master = reduceInfo.idToParam[reduceInfo.linkedParams[ei][0]];
	      for (var i = 1; i < reduceInfo.linkedParams[ei].length; ++i) {
	        var slave = reduceInfo.idToParam[reduceInfo.linkedParams[ei][i]];
	        slave.set(master.get());
	      }
	    }
	    viewer.equalizeLinkedEndpoints();
	  }
	
	  function updateParameter(p) {
	    getSolverParam(p).set(p.get());
	  }
	
	  solver.solve = solve;
	  solver.sync = sync;
	  solver.updateParameter = updateParameter;
	  return solver;
	};
	
	Constraints.ParentsCollector = function () {
	  this.parents = [];
	  var parents = this.parents;
	  var index = {};
	  function add(obj) {
	    if (index[obj.id] === undefined) {
	      index[obj.id] = obj;
	      parents.push(obj);
	    }
	  }
	  this.check = function (obj) {
	    if (obj.parent !== null) {
	      add(obj.parent);
	    } else {
	      add(obj);
	    }
	  };
	};
	
	Constraints.Factory = {};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Coincident = function (a, b) {
	  this.a = a;
	  this.b = b;
	  a.linked.push(b);
	  b.linked.push(a);
	};
	
	Constraints.Coincident.prototype.NAME = 'coi';
	Constraints.Coincident.prototype.UI_NAME = 'Coincident';
	Constraints.Coincident.prototype.reducible = true;
	
	Constraints.Coincident.prototype.getSolveData = function () {
	  return [['equal', [this.a._x, this.b._x], []], ['equal', [this.a._y, this.b._y], []]];
	};
	
	Constraints.Coincident.prototype.serialize = function () {
	  return [this.NAME, [this.a.id, this.b.id]];
	};
	
	Constraints.Factory[Constraints.Coincident.prototype.NAME] = function (refs, data) {
	  return new Constraints.Coincident(refs(data[0]), refs(data[1]));
	};
	
	Constraints.Coincident.prototype.getObjects = function () {
	  return [this.a, this.b];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Lock = function (p, c) {
	  this.p = p;
	  this.c = c;
	};
	
	Constraints.Lock.prototype.NAME = 'lock';
	Constraints.Lock.prototype.UI_NAME = 'Lock';
	
	Constraints.Lock.prototype.getSolveData = function () {
	  return [['equalsTo', [this.p._x], [this.c.x]], ['equalsTo', [this.p._y], [this.c.y]]];
	};
	
	Constraints.Lock.prototype.serialize = function () {
	  return [this.NAME, [this.p.id, this.c]];
	};
	
	Constraints.Factory[Constraints.Lock.prototype.NAME] = function (refs, data) {
	  return new Constraints.Lock(refs(data[0]), data[1]);
	};
	
	Constraints.Lock.prototype.getObjects = function () {
	  return [this.p];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Parallel = function (l1, l2) {
	  this.l1 = l1;
	  this.l2 = l2;
	};
	
	Constraints.Parallel.prototype.NAME = 'parallel';
	Constraints.Parallel.prototype.UI_NAME = 'Parallel';
	
	Constraints.Parallel.prototype.getSolveData = function () {
	  var params = [];
	  this.l1.collectParams(params);
	  this.l2.collectParams(params);
	  return [[this.NAME, params, []]];
	};
	
	Constraints.Parallel.prototype.serialize = function () {
	  return [this.NAME, [this.l1.id, this.l2.id]];
	};
	
	Constraints.Factory[Constraints.Parallel.prototype.NAME] = function (refs, data) {
	  return new Constraints.Parallel(refs(data[0]), refs(data[1]));
	};
	
	Constraints.Parallel.prototype.getObjects = function () {
	  return [this.l1, this.l2];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Perpendicular = function (l1, l2) {
	  this.l1 = l1;
	  this.l2 = l2;
	};
	
	Constraints.Perpendicular.prototype.NAME = 'perpendicular';
	Constraints.Perpendicular.prototype.UI_NAME = 'Perpendicular';
	
	Constraints.Perpendicular.prototype.getSolveData = function () {
	  var params = [];
	  this.l1.collectParams(params);
	  this.l2.collectParams(params);
	  return [[this.NAME, params, []]];
	};
	
	Constraints.Perpendicular.prototype.serialize = function () {
	  return [this.NAME, [this.l1.id, this.l2.id]];
	};
	
	Constraints.Factory[Constraints.Perpendicular.prototype.NAME] = function (refs, data) {
	  return new Constraints.Perpendicular(refs(data[0]), refs(data[1]));
	};
	
	Constraints.Perpendicular.prototype.getObjects = function () {
	  return [this.l1, this.l2];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.P2LDistance = function (p, l, d) {
	  this.p = p;
	  this.l = l;
	  this.d = d;
	};
	
	Constraints.P2LDistance.prototype.NAME = 'P2LDistance';
	Constraints.P2LDistance.prototype.UI_NAME = 'Distance P & L';
	
	Constraints.P2LDistance.prototype.getSolveData = function (resolver) {
	  var params = [];
	  this.p.collectParams(params);
	  this.l.collectParams(params);
	  return [[this.NAME, params, [resolver(this.d)]]];
	};
	
	Constraints.P2LDistance.prototype.serialize = function () {
	  return [this.NAME, [this.p.id, this.l.id, this.d]];
	};
	
	Constraints.Factory[Constraints.P2LDistance.prototype.NAME] = function (refs, data) {
	  return new Constraints.P2LDistance(refs(data[0]), refs(data[1]), data[2]);
	};
	
	Constraints.P2LDistance.prototype.getObjects = function () {
	  return [this.p, this.l];
	};
	
	Constraints.P2LDistance.prototype.SettableFields = { 'd': "Enter the distance" };
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.MinLength = function (a, b, min) {
	  this.a = a;
	  this.b = b;
	  this.min = min;
	};
	
	Constraints.MinLength.prototype.aux = true;
	Constraints.MinLength.prototype.NAME = 'MinLength';
	Constraints.MinLength.prototype.UI_NAME = 'MinLength';
	
	Constraints.MinLength.prototype.getSolveData = function () {
	  var params = [];
	  this.a.collectParams(params);
	  this.b.collectParams(params);
	  return [[this.NAME, params, [this.min]]];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.P2LDistanceV = function (p, l, d) {
	  this.p = p;
	  this.l = l;
	  this.d = d;
	};
	
	Constraints.P2LDistanceV.prototype.aux = true;
	Constraints.P2LDistanceV.prototype.NAME = 'P2LDistanceV';
	Constraints.P2LDistanceV.prototype.UI_NAME = 'Distance P & L';
	
	Constraints.P2LDistanceV.prototype.getSolveData = function () {
	  var params = [];
	  this.p.collectParams(params);
	  this.l.collectParams(params);
	  params.push(this.d);
	  return [[this.NAME, params]];
	};
	
	// We don't serialize auxiliary constraints
	//
	//Constraints.P2LDistanceV.prototype.serialize = function() {
	//  return [this.NAME, [this.p.id, this.l.id, this.d.id]];
	//};
	//
	//Constraints.Factory[Constraints.P2LDistanceV.prototype.NAME] = function(refs, data) {
	//  return new Constraints.P2LDistanceV(refs(data[0]), refs(data[1]), refs(data[2]));
	//};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.P2PDistance = function (p1, p2, d) {
	  this.p1 = p1;
	  this.p2 = p2;
	  this.d = d;
	};
	
	Constraints.P2PDistance.prototype.NAME = 'P2PDistance';
	Constraints.P2PDistance.prototype.UI_NAME = 'Distance Points';
	
	Constraints.P2PDistance.prototype.getSolveData = function (resolver) {
	  var params = [];
	  this.p1.collectParams(params);
	  this.p2.collectParams(params);
	  return [[this.NAME, params, [resolver(this.d)]]];
	};
	
	Constraints.P2PDistance.prototype.serialize = function () {
	  return [this.NAME, [this.p1.id, this.p2.id, this.d]];
	};
	
	Constraints.Factory[Constraints.P2PDistance.prototype.NAME] = function (refs, data) {
	  return new Constraints.P2PDistance(refs(data[0]), refs(data[1]), data[2]);
	};
	
	Constraints.P2PDistance.prototype.getObjects = function () {
	  return [this.p1, this.p2];
	};
	
	Constraints.P2PDistance.prototype.SettableFields = { 'd': "Enter the distance" };
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.P2PDistanceV = function (p1, p2, d) {
	  this.p1 = p1;
	  this.p2 = p2;
	  this.d = d;
	};
	
	Constraints.P2PDistanceV.prototype.aux = true;
	Constraints.P2PDistanceV.prototype.NAME = 'P2PDistanceV';
	Constraints.P2PDistanceV.prototype.UI_NAME = 'Distance Points';
	
	Constraints.P2PDistanceV.prototype.getSolveData = function () {
	  var params = [];
	  this.p1.collectParams(params);
	  this.p2.collectParams(params);
	  params.push(this.d);
	  return [[this.NAME, params]];
	};
	
	// We don't serialize auxiliary constraints
	//
	//Constraints.P2PDistanceV.prototype.serialize = function() {
	//  return [this.NAME, [this.p1.id, this.p2.id, this.d.id]];
	//};
	//
	//Constraints.Factory[Constraints.P2PDistanceV.prototype.NAME] = function(refs, data) {
	//  return new Constraints.P2PDistanceV(refs(data[0]), refs(data[1]), refs(data[2]));
	//};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.GreaterThan = function (p, limit) {
	  this.p = p;
	  this.limit = limit;
	};
	
	Constraints.GreaterThan.prototype.aux = true;
	Constraints.GreaterThan.prototype.NAME = 'GreaterThan';
	Constraints.GreaterThan.prototype.UI_NAME = 'Greater Than';
	
	Constraints.GreaterThan.prototype.getSolveData = function () {
	  return [[this.NAME, [this.p], [this.limit]]];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Radius = function (arc, d) {
	  this.arc = arc;
	  this.d = d;
	};
	
	Constraints.Radius.prototype.NAME = 'Radius';
	Constraints.Radius.prototype.UI_NAME = 'Radius Value';
	
	Constraints.Radius.prototype.getSolveData = function (resolver) {
	  return [['equalsTo', [this.arc.r], [resolver(this.d)]]];
	};
	
	Constraints.Radius.prototype.serialize = function () {
	  return [this.NAME, [this.arc.id, this.d]];
	};
	
	Constraints.Factory[Constraints.Radius.prototype.NAME] = function (refs, data) {
	  return new Constraints.Radius(refs(data[0]), data[1]);
	};
	
	Constraints.Radius.prototype.getObjects = function () {
	  return [this.arc];
	};
	
	Constraints.Radius.prototype.SettableFields = { 'd': "Enter the radius value" };
	
	// ------------------------------------------------------------------------------------------------------------------ // 
	
	/** @constructor */
	Constraints.RR = function (arc1, arc2) {
	  this.arc1 = arc1;
	  this.arc2 = arc2;
	};
	
	Constraints.RR.prototype.NAME = 'RR';
	Constraints.RR.prototype.UI_NAME = 'Radius Equality';
	//Constraints.RR.prototype.reducible = true;
	
	
	Constraints.RR.prototype.getSolveData = function () {
	  return [['equal', [this.arc1.r, this.arc2.r], []]];
	};
	
	Constraints.RR.prototype.serialize = function () {
	  return [this.NAME, [this.arc1.id, this.arc2.id]];
	};
	
	Constraints.Factory[Constraints.RR.prototype.NAME] = function (refs, data) {
	  return new Constraints.RR(refs(data[0]), refs(data[1]));
	};
	
	Constraints.RR.prototype.getObjects = function () {
	  return [this.arc1, this.arc2];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ // 
	
	/** @constructor */
	Constraints.LL = function (line1, line2) {
	  this.line1 = line1;
	  this.line2 = line2;
	  this.length = new _ref.Ref(math.distanceAB(line1.a, line1.b));
	};
	
	Constraints.LL.prototype.NAME = 'LL';
	Constraints.LL.prototype.UI_NAME = 'Lines Equality';
	
	Constraints.LL.prototype.getSolveData = function () {
	  var params1 = [];
	  var params2 = [];
	  this.line1.collectParams(params1);
	  this.line2.collectParams(params2);
	  params1.push(this.length);
	  params2.push(this.length);
	  return [['P2PDistanceV', params1, []], ['P2PDistanceV', params2, []]];
	};
	
	Constraints.LL.prototype.serialize = function () {
	  return [this.NAME, [this.line1.id, this.line2.id]];
	};
	
	Constraints.Factory[Constraints.LL.prototype.NAME] = function (refs, data) {
	  return new Constraints.LL(refs(data[0]), refs(data[1]));
	};
	
	Constraints.LL.prototype.getObjects = function () {
	  return [this.line1, this.line2];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Vertical = function (line) {
	  this.line = line;
	};
	
	Constraints.Vertical.prototype.NAME = 'Vertical';
	Constraints.Vertical.prototype.UI_NAME = 'Vertical';
	//Constraints.Vertical.prototype.reducible = true;
	
	Constraints.Vertical.prototype.getSolveData = function () {
	  return [['equal', [this.line.a._x, this.line.b._x], []]];
	};
	
	Constraints.Vertical.prototype.serialize = function () {
	  return [this.NAME, [this.line.id]];
	};
	
	Constraints.Factory[Constraints.Vertical.prototype.NAME] = function (refs, data) {
	  return new Constraints.Vertical(refs(data[0]));
	};
	
	Constraints.Vertical.prototype.getObjects = function () {
	  return [this.line];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ // 
	
	/** @constructor */
	Constraints.Horizontal = function (line) {
	  this.line = line;
	};
	
	Constraints.Horizontal.prototype.NAME = 'Horizontal';
	Constraints.Horizontal.prototype.UI_NAME = 'Horizontal';
	//Constraints.Horizontal.prototype.reducible = true;
	
	Constraints.Horizontal.prototype.getSolveData = function () {
	  return [['equal', [this.line.a._y, this.line.b._y], []]];
	};
	
	Constraints.Horizontal.prototype.serialize = function () {
	  return [this.NAME, [this.line.id]];
	};
	
	Constraints.Factory[Constraints.Horizontal.prototype.NAME] = function (refs, data) {
	  return new Constraints.Horizontal(refs(data[0]));
	};
	
	Constraints.Horizontal.prototype.getObjects = function () {
	  return [this.line];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Tangent = function (arc, line) {
	  this.arc = arc;
	  this.line = line;
	};
	
	Constraints.Tangent.prototype.NAME = 'Tangent';
	Constraints.Tangent.prototype.UI_NAME = 'Tangent';
	
	Constraints.Tangent.prototype.getSolveData = function () {
	  var params = [];
	  this.arc.c.collectParams(params);
	  this.line.collectParams(params);
	  params.push(this.arc.r);
	  return [['P2LDistanceV', params, []]];
	};
	
	Constraints.Tangent.prototype.serialize = function () {
	  return [this.NAME, [this.arc.id, this.line.id]];
	};
	
	Constraints.Factory[Constraints.Tangent.prototype.NAME] = function (refs, data) {
	  return new Constraints.Tangent(refs(data[0]), refs(data[1]));
	};
	
	Constraints.Tangent.prototype.getObjects = function () {
	  return [this.arc, this.line];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.PointOnLine = function (point, line) {
	  this.point = point;
	  this.line = line;
	};
	
	Constraints.PointOnLine.prototype.NAME = 'PointOnLine';
	Constraints.PointOnLine.prototype.UI_NAME = 'Point On Line';
	
	Constraints.PointOnLine.prototype.getSolveData = function () {
	  var params = [];
	  this.point.collectParams(params);
	  this.line.collectParams(params);
	  return [['P2LDistance', params, [0]]];
	};
	
	Constraints.PointOnLine.prototype.serialize = function () {
	  return [this.NAME, [this.point.id, this.line.id]];
	};
	
	Constraints.Factory[Constraints.PointOnLine.prototype.NAME] = function (refs, data) {
	  return new Constraints.PointOnLine(refs(data[0]), refs(data[1]));
	};
	
	Constraints.PointOnLine.prototype.getObjects = function () {
	  return [this.point, this.line];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.PointOnArc = function (point, arc) {
	  this.point = point;
	  this.arc = arc;
	};
	
	Constraints.PointOnArc.prototype.NAME = 'PointOnArc';
	Constraints.PointOnArc.prototype.UI_NAME = 'Point On Arc';
	
	Constraints.PointOnArc.prototype.getSolveData = function () {
	  var params = [];
	  this.point.collectParams(params);
	  this.arc.c.collectParams(params);
	  params.push(this.arc.r);
	  return [['P2PDistanceV', params, []]];
	};
	
	Constraints.PointOnArc.prototype.serialize = function () {
	  return [this.NAME, [this.point.id, this.arc.id]];
	};
	
	Constraints.Factory[Constraints.PointOnArc.prototype.NAME] = function (refs, data) {
	  return new Constraints.PointOnArc(refs(data[0]), refs(data[1]));
	};
	
	Constraints.PointOnArc.prototype.getObjects = function () {
	  return [this.point, this.arc];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.PointOnEllipseInternal = function (point, ellipse) {
	  this.point = point;
	  this.ellipse = ellipse;
	};
	
	Constraints.PointOnEllipseInternal.prototype.NAME = 'PointOnEllipseI';
	Constraints.PointOnEllipseInternal.prototype.UI_NAME = 'Point On Ellipse';
	Constraints.PointOnEllipseInternal.prototype.aux = true;
	
	Constraints.PointOnEllipseInternal.prototype.getSolveData = function () {
	  var params = [];
	  this.point.collectParams(params);
	  this.ellipse.ep1.collectParams(params);
	  this.ellipse.ep2.collectParams(params);
	  params.push(this.ellipse.r);
	  return [['PointOnEllipse', params, []]];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.PointOnEllipse = function (point, ellipse) {
	  Constraints.PointOnEllipseInternal.call(this, point, ellipse);
	};
	
	Constraints.PointOnEllipse.prototype.NAME = 'PointOnEllipse';
	Constraints.PointOnEllipse.prototype.UI_NAME = 'Point On Ellipse';
	
	Constraints.PointOnEllipse.prototype.getSolveData = function () {
	  return Constraints.PointOnEllipseInternal.prototype.getSolveData.call(this);
	};
	
	Constraints.PointOnEllipse.prototype.serialize = function () {
	  return [this.NAME, [this.point.id, this.ellipse.id]];
	};
	
	Constraints.Factory[Constraints.PointOnEllipse.prototype.NAME] = function (refs, data) {
	  return new Constraints.PointOnEllipse(refs(data[0]), refs(data[1]));
	};
	
	Constraints.PointOnEllipse.prototype.getObjects = function () {
	  return [this.point, this.ellipse];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.EllipseTangent = function (line, ellipse) {
	  this.line = line;
	  this.ellipse = ellipse;
	};
	
	Constraints.EllipseTangent.prototype.NAME = 'EllipseTangent';
	Constraints.EllipseTangent.prototype.UI_NAME = 'Tangent Ellipse';
	
	Constraints.EllipseTangent.prototype.getSolveData = function () {
	  var params = [];
	  this.line.collectParams(params);
	  this.ellipse.ep1.collectParams(params);
	  this.ellipse.ep2.collectParams(params);
	  params.push(this.ellipse.r);
	  return [['EllipseTangent', params, []]];
	};
	
	Constraints.EllipseTangent.prototype.serialize = function () {
	  return [this.NAME, [this.line.id, this.ellipse.id]];
	};
	
	Constraints.Factory[Constraints.EllipseTangent.prototype.NAME] = function (refs, data) {
	  return new Constraints.EllipseTangent(refs(data[0]), refs(data[1]));
	};
	
	Constraints.EllipseTangent.prototype.getObjects = function () {
	  return [this.line, this.ellipse];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.PointInMiddle = function (point, line) {
	  this.point = point;
	  this.line = line;
	  this.length = new _ref.Ref(math.distanceAB(line.a, line.b) / 2);
	};
	
	Constraints.PointInMiddle.prototype.NAME = 'PointInMiddle';
	Constraints.PointInMiddle.prototype.UI_NAME = 'Point In the Middle';
	
	Constraints.PointInMiddle.prototype.getSolveData = function () {
	  var params1 = [];
	  var params2 = [];
	
	  this.line.a.collectParams(params1);
	  this.point.collectParams(params1);
	  params1.push(this.length);
	
	  this.line.b.collectParams(params2);
	  this.point.collectParams(params2);
	  params2.push(this.length);
	
	  return [['P2PDistanceV', params1, []], ['P2PDistanceV', params2, []]];
	};
	
	Constraints.PointInMiddle.prototype.serialize = function () {
	  return [this.NAME, [this.point.id, this.line.id]];
	};
	
	Constraints.Factory[Constraints.PointInMiddle.prototype.NAME] = function (refs, data) {
	  return new Constraints.PointInMiddle(refs(data[0]), refs(data[1]));
	};
	
	Constraints.PointInMiddle.prototype.getObjects = function () {
	  return [this.point, this.line];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Symmetry = function (point, line) {
	  this.point = point;
	  this.line = line;
	  this.length = new _ref.Ref(math.distanceAB(line.a, line.b) / 2);
	};
	
	Constraints.Symmetry.prototype.NAME = 'Symmetry';
	Constraints.Symmetry.prototype.UI_NAME = 'Symmetry';
	
	Constraints.Symmetry.prototype.getSolveData = function (resolver) {
	  var pointInMiddleData = Constraints.PointInMiddle.prototype.getSolveData.call(this, [resolver]);
	  var pointOnLineData = Constraints.PointOnLine.prototype.getSolveData.call(this, [resolver]);
	  return pointInMiddleData.concat(pointOnLineData);
	};
	
	Constraints.Symmetry.prototype.serialize = function () {
	  return [this.NAME, [this.point.id, this.line.id]];
	};
	
	Constraints.Factory[Constraints.Symmetry.prototype.NAME] = function (refs, data) {
	  return new Constraints.Symmetry(refs(data[0]), refs(data[1]));
	};
	
	Constraints.Symmetry.prototype.getObjects = function () {
	  return [this.point, this.line];
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.Angle = function (p1, p2, p3, p4, angle) {
	  this.p1 = p1;
	  this.p2 = p2;
	  this.p3 = p3;
	  this.p4 = p4;
	  this._angle = new _ref.Ref(0);
	  this.angle = angle;
	};
	
	Constraints.Angle.prototype.NAME = 'Angle';
	Constraints.Angle.prototype.UI_NAME = 'Lines Angle';
	
	Constraints.Angle.prototype.getSolveData = function (resolver) {
	  this._angle.set(resolver(this.angle) / 180 * Math.PI);
	  var params = [];
	  this.p1.collectParams(params);
	  this.p2.collectParams(params);
	  this.p3.collectParams(params);
	  this.p4.collectParams(params);
	  params.push(this._angle);
	  return [['angleConst', params, []]];
	};
	
	Constraints.Angle.prototype.serialize = function () {
	  return [this.NAME, [this.p1.id, this.p2.id, this.p3.id, this.p4.id, this.angle]];
	};
	
	Constraints.Factory[Constraints.Angle.prototype.NAME] = function (refs, data) {
	  return new Constraints.Angle(refs(data[0]), refs(data[1]), refs(data[2]), refs(data[3]), data[4]);
	};
	
	Constraints.Angle.prototype.getObjects = function () {
	  var collector = new Constraints.ParentsCollector();
	  collector.check(this.p1);
	  collector.check(this.p2);
	  collector.check(this.p3);
	  collector.check(this.p4);
	  return collector.parents;
	};
	
	Constraints.Angle.prototype.SettableFields = { 'angle': "Enter the angle value" };
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	/** @constructor */
	Constraints.LockConvex = function (c, a, t) {
	  this.c = c;
	  this.a = a;
	  this.t = t;
	};
	
	Constraints.LockConvex.prototype.NAME = 'LockConvex';
	Constraints.LockConvex.prototype.UI_NAME = 'Lock Convexity';
	
	Constraints.LockConvex.prototype.getSolveData = function () {
	  var params = [];
	  this.c.collectParams(params);
	  this.a.collectParams(params);
	  this.t.collectParams(params);
	  return [['LockConvex', params, []]];
	};
	
	Constraints.LockConvex.prototype.serialize = function () {
	  return [this.NAME, [this.c.id, this.a.id, this.t.id]];
	};
	
	Constraints.Factory[Constraints.LockConvex.prototype.NAME] = function (refs, data) {
	  return new Constraints.LockConvex(refs(data[0]), refs(data[1]), refs(data[2]));
	};
	
	Constraints.LockConvex.prototype.getObjects = function () {
	  var collector = new Constraints.ParentsCollector();
	  collector.check(this.c);
	  collector.check(this.a);
	  collector.check(this.t);
	  return collector.parents;
	};
	
	// ------------------------------------------------------------------------------------------------------------------ //
	
	exports.Constraints = Constraints;
	exports.ParametricManager = ParametricManager;

/***/ },
/* 88 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.askNumber = askNumber;
	exports.fillArray = fillArray;
	exports.constRef = constRef;
	exports.swap = swap;
	function askNumber(promptText, initValue, promptCallback, resolver) {
	  var promptValueStr = promptCallback(promptText, initValue);
	  if (promptValueStr != null) {
	    var promptValue = Number(promptValueStr);
	    if (promptValue == promptValue) {
	      // check for NaN
	      return promptValue;
	    } else {
	      if (!!resolver) {
	        promptValue = resolver(promptValueStr);
	        if (promptValue == promptValue) {
	          return promptValueStr;
	        }
	      }
	    }
	  }
	  return null;
	}
	
	var extend = exports.extend = function extend(func, parent) {
	  for (var prop in parent.prototype) {
	    if (parent.prototype.hasOwnProperty(prop)) func.prototype[prop] = parent.prototype[prop];
	  }
	};
	
	function fillArray(a, fromIndex, toIndex, val) {
	  for (var i = fromIndex; i < toIndex; i++) {
	    a[i] = val;
	  }
	}
	
	function constRef(value) {
	  return function () {
	    return value;
	  };
	}
	
	function swap(arr, i1, i2) {
	  var tmp = arr[i1];
	  arr[i1] = arr[i2];
	  arr[i2] = tmp;
	}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ref = Ref;
	
	var _idGenerator = __webpack_require__(84);
	
	function Ref(value) {
	  this.id = _idGenerator.Generator.genID();
	  this.value = value;
	}
	
	Ref.prototype.set = function (value) {
	  this.value = value;
	};
	
	Ref.prototype.get = function () {
	  return this.value;
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.prepare = exports.Param = undefined;
	
	var _utils = __webpack_require__(88);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _qr = __webpack_require__(91);
	
	var _qr2 = _interopRequireDefault(_qr);
	
	var _lm = __webpack_require__(92);
	
	var _lm2 = _interopRequireDefault(_lm);
	
	var _constraints = __webpack_require__(93);
	
	var _optim = __webpack_require__(94);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/** @constructor */
	function Param(id, value, readOnly) {
	  this.reset(value);
	}
	
	Param.prototype.reset = function (value) {
	  this.set(value);
	  this.j = -1;
	};
	
	Param.prototype.set = function (value) {
	  this.value = value;
	};
	
	Param.prototype.get = function () {
	  return this.value;
	};
	
	Param.prototype.nop = function () {};
	
	/** @constructor */
	function System(constraints) {
	  this.constraints = constraints;
	  this.params = [];
	  for (var ci = 0; ci < constraints.length; ++ci) {
	    var c = constraints[ci];
	    for (var pi = 0; pi < c.params.length; ++pi) {
	      var p = c.params[pi];
	      if (p.j == -1) {
	        p.j = this.params.length;
	        this.params.push(p);
	      }
	    }
	  }
	}
	
	System.prototype.makeJacobian = function () {
	  var jacobi = [];
	  var i;
	  var j;
	  for (i = 0; i < this.constraints.length; i++) {
	    jacobi[i] = [];
	    for (j = 0; j < this.params.length; j++) {
	      jacobi[i][j] = 0;
	    }
	  }
	  for (i = 0; i < this.constraints.length; i++) {
	    var c = this.constraints[i];
	
	    var cParams = c.params;
	    var grad = [];
	    utils.fillArray(grad, 0, cParams.length, 0);
	    c.gradient(grad);
	
	    for (var p = 0; p < cParams.length; p++) {
	      var param = cParams[p];
	      j = param.j;
	      jacobi[i][j] = grad[p];
	    }
	  }
	  return jacobi;
	};
	
	System.prototype.fillJacobian = function (jacobi) {
	  for (var i = 0; i < this.constraints.length; i++) {
	    var c = this.constraints[i];
	
	    var cParams = c.params;
	    var grad = [];
	    utils.fillArray(grad, 0, cParams.length, 0);
	    c.gradient(grad);
	
	    for (var p = 0; p < cParams.length; p++) {
	      var param = cParams[p];
	      var j = param.j;
	      jacobi[i][j] = grad[p];
	    }
	  }
	  return jacobi;
	};
	
	System.prototype.calcResidual = function (r) {
	
	  var i = 0;
	  var err = 0.;
	
	  for (i = 0; i < this.constraints.length; i++) {
	    var c = this.constraints[i];
	    r[i] = c.error();
	    err += r[i] * r[i];
	  }
	
	  err *= 0.5;
	  return err;
	};
	
	System.prototype.calcGrad_ = function (out) {
	  var i;
	  for (i = 0; i < out.length || i < this.params.length; ++i) {
	    out[i][0] = 0;
	  }
	
	  for (i = 0; i < this.constraints.length; i++) {
	    var c = this.constraints[i];
	
	    var cParams = c.params;
	    var grad = [];
	    utils.fillArray(grad, 0, cParams.length, 0);
	    c.gradient(grad);
	
	    for (var p = 0; p < cParams.length; p++) {
	      var param = cParams[p];
	      var j = param.j;
	      out[j][0] += this.constraints[i].error() * grad[p]; // (10.4)
	    }
	  }
	};
	
	System.prototype.calcGrad = function (out) {
	  var i;
	  for (i = 0; i < out.length || i < this.params.length; ++i) {
	    out[i] = 0;
	  }
	
	  for (i = 0; i < this.constraints.length; i++) {
	    var c = this.constraints[i];
	
	    var cParams = c.params;
	    var grad = [];
	    utils.fillArray(grad, 0, cParams.length, 0);
	    for (var p = 0; p < cParams.length; p++) {
	      var param = cParams[p];
	      var j = param.j;
	      out[j] += this.constraints[i].error() * grad[p]; // (10.4) 
	    }
	  }
	};
	
	System.prototype.fillParams = function (out) {
	  for (var p = 0; p < this.params.length; p++) {
	    out[p] = this.params[p].get();
	  }
	};
	
	System.prototype.getParams = function () {
	  var out = [];
	  this.fillParams(out);
	  return out;
	};
	
	System.prototype.setParams = function (point) {
	  for (var p = 0; p < this.params.length; p++) {
	    this.params[p].set(point[p]);
	  }
	};
	
	System.prototype.error = function () {
	  var error = 0;
	  for (var i = 0; i < this.constraints.length; i++) {
	    error += Math.abs(this.constraints[i].error());
	  }
	  return error;
	};
	
	System.prototype.errorSquare = function () {
	  var error = 0;
	  for (var i = 0; i < this.constraints.length; i++) {
	    var t = this.constraints[i].error();
	    error += t * t;
	  }
	  return error * 0.5;
	};
	
	System.prototype.getValues = function () {
	  var values = [];
	  for (var i = 0; i < this.constraints.length; i++) {
	    values[i] = this.constraints[i].error();
	  }
	  return values;
	};
	
	var wrapAux = function wrapAux(constrs, locked) {
	
	  var i,
	      lockedSet = {};
	  for (i = 0; i < locked.length; i++) {
	    lockedSet[locked[i].j] = true;
	  }
	
	  for (i = 0; i < constrs.length; i++) {
	    var c = constrs[i];
	    var mask = [];
	    var needWrap = false;
	    for (var j = 0; j < c.params.length; j++) {
	      var param = c.params[j];
	      mask[j] = lockedSet[param.j] === true;
	      needWrap = needWrap || mask[j];
	    }
	    if (needWrap) {
	      var wrapper = new _constraints.ConstantWrapper(c, mask);
	      constrs[i] = wrapper;
	    }
	  }
	};
	
	var lock2Equals2 = function lock2Equals2(constrs, locked) {
	  var _locked = [];
	  for (var i = 0; i < locked.length; ++i) {
	    _locked.push(new _constraints.EqualsTo([locked[i]], locked[i].get()));
	  }
	  return _locked;
	};
	
	var _diagnose = function _diagnose(sys) {
	  if (sys.constraints.length == 0 || sys.params.length == 0) {
	    return {
	      conflict: false,
	      dof: 0
	    };
	  }
	  var jacobian = sys.makeJacobian();
	  var qr = new _qr2.default(jacobian);
	  return {
	    conflict: sys.constraints.length > qr.rank,
	    dof: sys.params.length - qr.rank
	  };
	};
	
	var prepare = function prepare(constrs, locked, aux, alg) {
	
	  var simpleMode = true;
	  if (!simpleMode) {
	    var lockingConstrs = lock2Equals2(constrs, locked);
	    Array.prototype.push.apply(constrs, lockingConstrs);
	  }
	
	  var sys = new System(constrs);
	
	  wrapAux(constrs, aux);
	
	  var model = function model(point) {
	    sys.setParams(point);
	    return sys.getValues();
	  };
	
	  var jacobian = function jacobian(point) {
	    sys.setParams(point);
	    return sys.makeJacobian();
	  };
	  var nullResult = {
	    evalCount: 0,
	    error: 0,
	    returnCode: 1
	  };
	
	  function solve(rough, alg) {
	    //if (simpleMode) return nullResult;
	    if (constrs.length == 0) return nullResult;
	    if (sys.params.length == 0) return nullResult;
	    switch (alg) {
	      case 2:
	        return solve_lm(sys, model, jacobian, rough);
	      case 1:
	      default:
	        return (0, _optim.dog_leg)(sys, rough);
	    }
	  }
	  var systemSolver = {
	    diagnose: function diagnose() {
	      return _diagnose(sys);
	    },
	    error: function error() {
	      return sys.error();
	    },
	    solveSystem: solve,
	    system: sys,
	    updateLock: function updateLock(values) {
	      for (var i = 0; i < values.length; ++i) {
	        if (simpleMode) {
	          locked[i].set(values[i]);
	        } else {
	          lockingConstrs[i].value = values[i];
	        }
	      }
	    }
	  };
	  return systemSolver;
	};
	
	var solve_lm = function solve_lm(sys, model, jacobian, rough) {
	  var opt = new _lm2.default(sys.getParams(), math.vec(sys.constraints.length), model, jacobian);
	  opt.evalMaximalCount = 100 * sys.params.length;
	  var eps = rough ? 0.001 : 0.00000001;
	  opt.init0(eps, eps, eps);
	  var returnCode = 1;
	  try {
	    var res = opt.doOptimize();
	  } catch (e) {
	    returnCode = 2;
	  }
	  sys.setParams(res[0]);
	  return {
	    evalCount: opt.evalCount,
	    error: sys.error(),
	    returnCode: returnCode
	  };
	};
	
	exports.Param = Param;
	exports.prepare = prepare;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utils = __webpack_require__(88);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/** @constructor */
	function QR(matrix) {
	  var vec = math._vec;
	  this.matrix = matrix;
	  var nR = this.matrix.length;
	  var nC = nR == 0 ? 0 : this.matrix[0].length;
	
	  this.qrRankingThreshold = 1e-30; //??
	  this.solvedCols = Math.min(nR, nC);
	  this.diagR = vec(nC);
	  this.norm = vec(nC);
	  this.beta = vec(nC);
	  this.permutation = vec(nC);
	  this.rank = null;
	
	  var k;
	  var norm2;
	  var akk;
	  var j;
	  var i;
	
	  // initializations
	  for (k = 0; k < nC; ++k) {
	    this.permutation[k] = k;
	    norm2 = 0;
	    for (i = 0; i < nR; ++i) {
	      akk = matrix[i][k];
	      norm2 += akk * akk;
	    }
	    this.norm[k] = Math.sqrt(norm2);
	  }
	
	  // transform the matrix column after column
	  for (k = 0; k < nC; ++k) {
	
	    // select the column with the greatest norm on active components
	    var nextColumn = -1;
	    var ak2 = Number.NEGATIVE_INFINITY;
	    for (i = k; i < nC; ++i) {
	      norm2 = 0;
	      for (j = k; j < nR; ++j) {
	        var aki = matrix[j][this.permutation[i]];
	        norm2 += aki * aki;
	      }
	      if (!isFinite(norm2)) {
	        throw "UNABLE_TO_PERFORM_QR_DECOMPOSITION";
	      }
	      if (norm2 > ak2) {
	        nextColumn = i;
	        ak2 = norm2;
	      }
	    }
	    if (ak2 <= this.qrRankingThreshold) {
	      this.rank = k;
	      return;
	    }
	    var pk = this.permutation[nextColumn];
	    this.permutation[nextColumn] = this.permutation[k];
	    this.permutation[k] = pk;
	
	    // choose alpha such that Hk.u = alpha ek
	    akk = matrix[k][pk];
	    var alpha = akk > 0 ? -Math.sqrt(ak2) : Math.sqrt(ak2);
	    var betak = 1.0 / (ak2 - akk * alpha);
	    this.beta[pk] = betak;
	
	    // transform the current column
	    this.diagR[pk] = alpha;
	    matrix[k][pk] -= alpha;
	
	    // transform the remaining columns
	    for (var dk = nC - 1 - k; dk > 0; --dk) {
	      var gamma = 0;
	      for (j = k; j < nR; ++j) {
	        gamma += matrix[j][pk] * matrix[j][this.permutation[k + dk]];
	      }
	      gamma *= betak;
	      for (j = k; j < nR; ++j) {
	        matrix[j][this.permutation[k + dk]] -= gamma * matrix[j][pk];
	      }
	    }
	  }
	  this.rank = this.solvedCols;
	}
	
	QR.prototype.qTy = function (y) {
	  var nR = this.matrix.length;
	  var nC = this.matrix[0].length;
	
	  for (var k = 0; k < nC; ++k) {
	    var pk = this.permutation[k];
	    var gamma = 0;
	    for (var i = k; i < nR; ++i) {
	      gamma += this.matrix[i][pk] * y[i];
	    }
	    gamma *= this.beta[pk];
	    for (var i = k; i < nR; ++i) {
	      y[i] -= gamma * this.matrix[i][pk];
	    }
	  }
	};
	
	QR.prototype.solve = function (qy) {
	
	  var nR = this.matrix.length;
	  var nC = this.matrix[0].length;
	
	  var vec = math._vec;
	
	  var diag = vec(nC);
	  var lmDiag = vec(nC);
	  var work = vec(nC);
	  var out = vec(nC);
	
	  // copy R and Qty to preserve input and initialize s
	  //  in particular, save the diagonal elements of R in lmDir
	  for (var j = 0; j < this.solvedCols; ++j) {
	    var pj = this.permutation[j];
	    for (var i = j + 1; i < this.solvedCols; ++i) {
	      this.matrix[i][pj] = this.matrix[j][this.permutation[i]];
	    }
	    out[j] = this.diagR[pj];
	    work[j] = qy[j];
	  }
	
	  // eliminate the diagonal matrix d using a Givens rotation
	  for (var j = 0; j < this.solvedCols; ++j) {
	
	    // prepare the row of d to be eliminated, locating the
	    // diagonal element using p from the Q.R. factorization
	    var pj = this.permutation[j];
	    var dpj = diag[pj];
	    if (dpj != 0) {
	      (0, _utils.fillArray)(lmDiag, j + 1, lmDiag.length, 0);
	    }
	    lmDiag[j] = dpj;
	
	    //  the transformations to eliminate the row of d
	    // modify only a single element of Qty
	    // beyond the first n, which is initially zero.
	    var qtbpj = 0;
	    for (var k = j; k < this.solvedCols; ++k) {
	      var pk = this.permutation[k];
	
	      // determine a Givens rotation which eliminates the
	      // appropriate element in the current row of d
	      if (lmDiag[k] != 0) {
	
	        var sin;
	        var cos;
	        var rkk = this.matrix[k][pk];
	        if (Math.abs(rkk) < Math.abs(lmDiag[k])) {
	          var cotan = rkk / lmDiag[k];
	          sin = 1.0 / Math.sqrt(1.0 + cotan * cotan);
	          cos = sin * cotan;
	        } else {
	          var tan = lmDiag[k] / rkk;
	          cos = 1.0 / Math.sqrt(1.0 + tan * tan);
	          sin = cos * tan;
	        }
	
	        // compute the modified diagonal element of R and
	        // the modified element of (Qty,0)
	        this.matrix[k][pk] = cos * rkk + sin * lmDiag[k];
	        var temp = cos * work[k] + sin * qtbpj;
	        qtbpj = -sin * work[k] + cos * qtbpj;
	        work[k] = temp;
	
	        // accumulate the tranformation in the row of s
	        for (var i = k + 1; i < this.solvedCols; ++i) {
	          var rik = this.matrix[i][pk];
	          var temp2 = cos * rik + sin * lmDiag[i];
	          lmDiag[i] = -sin * rik + cos * lmDiag[i];
	          this.matrix[i][pk] = temp2;
	        }
	      }
	    }
	
	    // store the diagonal element of s and restore
	    // the corresponding diagonal element of R
	    lmDiag[j] = this.matrix[j][this.permutation[j]];
	    this.matrix[j][this.permutation[j]] = out[j];
	  }
	
	  // solve the triangular system for z, if the system is
	  // singular, then obtain a least squares solution
	  var nSing = this.solvedCols;
	  for (var j = 0; j < this.solvedCols; ++j) {
	    if (lmDiag[j] == 0 && nSing == this.solvedCols) {
	      nSing = j;
	    }
	    if (nSing < this.solvedCols) {
	      work[j] = 0;
	    }
	  }
	  if (nSing > 0) {
	    for (var j = nSing - 1; j >= 0; --j) {
	      var pj = this.permutation[j];
	      var sum = 0;
	      for (var i = j + 1; i < nSing; ++i) {
	        sum += this.matrix[i][pj] * work[i];
	      }
	      work[j] = (work[j] - sum) / lmDiag[j];
	    }
	  }
	
	  // permute the components of z back to components of lmDir
	  for (var j = 0; j < out.length; ++j) {
	    out[this.permutation[j]] = work[j];
	  }
	  return out;
	};
	
	exports.default = QR;

/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = LMOptimizer;
	/**
	 * This class solves a least-squares problem using the Levenberg-Marquardt algorithm.
	 *
	 * <p>This implementation <em>should</em> work even for over-determined systems
	 * (i.e. systems having more point than equations). Over-determined systems
	 * are solved by ignoring the point which have the smallest impact according
	 * to their jacobian column norm. Only the rank of the matrix and some loop bounds
	 * are changed to implement this.</p>
	 *
	 * <p>The resolution engine is a simple translation of the MINPACK <a
	 * href="http://www.netlib.org/minpack/lmder.f">lmder</a> routine with minor
	 * changes. The changes include the over-determined resolution, the use of
	 * inherited convergence checker and the Q.R. decomposition which has been
	 * rewritten following the algorithm described in the
	 * P. Lascaux and R. Theodor book <i>Analyse num&eacute;rique matricielle
	 * appliqu&eacute;e &agrave; l'art de l'ing&eacute;nieur</i>, Masson 1986.</p>
	 * <p>The authors of the original fortran version are:
	 * <ul>
	 * <li>Argonne National Laboratory. MINPACK project. March 1980</li>
	 * <li>Burton S. Garbow</li>
	 * <li>Kenneth E. Hillstrom</li>
	 * <li>Jorge J. More</li>
	 * </ul>
	 * The redistribution policy for MINPACK is available <a
	 * href="http://www.netlib.org/minpack/disclaimer">here</a>, for convenience, it
	 * is reproduced below.</p>
	 *
	 * <table border="0" width="80%" cellpadding="10" align="center" bgcolor="#E0E0E0">
	 * <tr><td>
	 *    Minpack Copyright Notice (1999) University of Chicago.
	 *    All rights reserved
	 * </td></tr>
	 * <tr><td>
	 * Redistribution and use in source and binary forms, with or without
	 * modification, are permitted provided that the following conditions
	 * are met:
	 * <ol>
	 *  <li>Redistributions of source code must retain the above copyright
	 *      notice, this list of conditions and the following disclaimer.</li>
	 * <li>Redistributions in binary form must reproduce the above
	 *     copyright notice, this list of conditions and the following
	 *     disclaimer in the documentation and/or other materials provided
	 *     with the distribution.</li>
	 * <li>The end-user documentation included with the redistribution, if any,
	 *     must include the following acknowledgment:
	 *     <code>This product includes software developed by the University of
	 *           Chicago, as Operator of Argonne National Laboratory.</code>
	 *     Alternately, this acknowledgment may appear in the software itself,
	 *     if and wherever such third-party acknowledgments normally appear.</li>
	 * <li><strong>WARRANTY DISCLAIMER. THE SOFTWARE IS SUPPLIED "AS IS"
	 *     WITHOUT WARRANTY OF ANY KIND. THE COPYRIGHT HOLDER, THE
	 *     UNITED STATES, THE UNITED STATES DEPARTMENT OF ENERGY, AND
	 *     THEIR EMPLOYEES: (1) DISCLAIM ANY WARRANTIES, EXPRESS OR
	 *     IMPLIED, INCLUDING BUT NOT LIMITED TO ANY IMPLIED WARRANTIES
	 *     OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE
	 *     OR NON-INFRINGEMENT, (2) DO NOT ASSUME ANY LEGAL LIABILITY
	 *     OR RESPONSIBILITY FOR THE ACCURACY, COMPLETENESS, OR
	 *     USEFULNESS OF THE SOFTWARE, (3) DO NOT REPRESENT THAT USE OF
	 *     THE SOFTWARE WOULD NOT INFRINGE PRIVATELY OWNED RIGHTS, (4)
	 *     DO NOT WARRANT THAT THE SOFTWARE WILL FUNCTION
	 *     UNINTERRUPTED, THAT IT IS ERROR-FREE OR THAT ANY ERRORS WILL
	 *     BE CORRECTED.</strong></li>
	 * <li><strong>LIMITATION OF LIABILITY. IN NO EVENT WILL THE COPYRIGHT
	 *     HOLDER, THE UNITED STATES, THE UNITED STATES DEPARTMENT OF
	 *     ENERGY, OR THEIR EMPLOYEES: BE LIABLE FOR ANY INDIRECT,
	 *     INCIDENTAL, CONSEQUENTIAL, SPECIAL OR PUNITIVE DAMAGES OF
	 *     ANY KIND OR NATURE, INCLUDING BUT NOT LIMITED TO LOSS OF
	 *     PROFITS OR LOSS OF DATA, FOR ANY REASON WHATSOEVER, WHETHER
	 *     SUCH LIABILITY IS ASSERTED ON THE BASIS OF CONTRACT, TORT
	 *     (INCLUDING NEGLIGENCE OR STRICT LIABILITY), OR OTHERWISE,
	 *     EVEN IF ANY OF SAID PARTIES HAS BEEN WARNED OF THE
	 *     POSSIBILITY OF SUCH LOSS OR DAMAGES.</strong></li>
	 * <ol></td></tr>
	 * </table>
	 *
	 * @version $Id: LevenbergMarquardtOptimizer.java 1416643 2012-12-03 19:37:14Z tn $
	 * @constructor
	 */
	function LMOptimizer(startPoint, target, model, jacobian) {
	
	    this.startPoint = startPoint;
	    this.target = target;
	    this.evalCount = 0;
	    this.evalMaximalCount = 100000;
	    this.model = model;
	    this.jacobian = jacobian;
	
	    this.identity = function (size) {
	        var out = [];
	        for (var row = 0; row < size; ++row) {
	            out.push([]);
	            for (var col = 0; col < size; ++col) {
	                out[row].push(row === col ? 1 : 0);
	            }
	        }
	        return out;
	    };
	
	    /** Square-root of the weight matrix. */
	    this.weightMatrixSqrt = this.identity(target.length); //TMath.identity(new TMath.Matrix(target.length, target.length)); //TODO:
	    this.weightMatrix = this.identity(target.length);
	    /** Cost value (square root of the sum of the residuals). */
	    this.cost = null;
	    /** Number of solved point. */
	    this.solvedCols = null;
	    /** Diagonal elements of the R matrix in the Q.R. decomposition. */
	    this.diagR = null;
	    /** Norms of the columns of the jacobian matrix. */
	    this.jacNorm = null;
	    /** Coefficients of the Householder transforms vectors. */
	    this.beta = null;
	    /** Columns permutation array. */
	    this.permutation = null;
	    /** Rank of the jacobian matrix. */
	    this.rank = null;
	    /** Levenberg-Marquardt parameter. */
	    this.lmPar = null;
	    /** Parameters evolution direction associated with lmPar. */
	    this.lmDir = null;
	    /** Positive input variable used in determining the initial step bound. */
	    this.initialStepBoundFactor = null;
	    /** Desired relative error in the sum of squares. */
	    this.costRelativeTolerance = null;
	    /**  Desired relative error in the approximate solution parameters. */
	    this.parRelativeTolerance = null;
	    /** Desired max cosine on the orthogonality between the function vector
	     * and the columns of the jacobian. */
	    this.orthoTolerance = null;
	    /** Threshold for QR ranking. */
	    this.qrRankingThreshold = null;
	    /** Weighted residuals. */
	    this.weightedResidual = null;
	    /** Weighted Jacobian. */
	    this.weightedJacobian = null;
	
	    this.checker = null;
	
	    function arr(size) {
	        var out = [];
	        out.length = size;
	        for (var i = 0; i < size; ++i) {
	            out[i] = 0;
	        }
	        return out;
	    }
	
	    function Arrays_fill(a, fromIndex, toIndex, val) {
	        for (var i = fromIndex; i < toIndex; i++) {
	            a[i] = val;
	        }
	    }
	
	    //    var SAFE_MIN = Number.MIN_VALUE; //FIXME!!!!
	    var SAFE_MIN = 1e-30; //FIXME!!!!
	
	    /**
	     * Build an optimizer for least squares problems with default values
	     * for all the tuning parameters (see the {@link
	     * #LevenbergMarquardtOptimizer(double,double,double,double,double)
	     * other contructor}.
	     * The default values for the algorithm settings are:
	     * <ul>
	     *  <li>Initial step bound factor: 100</li>
	     *  <li>Cost relative tolerance: 1e-10</li>
	     *  <li>Parameters relative tolerance: 1e-10</li>
	     *  <li>Orthogonality tolerance: 1e-10</li>
	     *  <li>QR ranking threshold: {@link Precision#SAFE_MIN}</li>
	     * </ul>
	     */
	    this.init = function () {
	        this.init1(100, 1e-10, 1e-10, 1e-10, SAFE_MIN);
	    };
	
	    /**
	     * Build an optimizer for least squares problems with default values
	     * for some of the tuning parameters (see the {@link
	     * #LevenbergMarquardtOptimizer(double,double,double,double,double)
	     * other contructor}.
	     * The default values for the algorithm settings are:
	     * <ul>
	     *  <li>Initial step bound factor}: 100</li>
	     *  <li>QR ranking threshold}: {@link Precision#SAFE_MIN}</li>
	     * </ul>
	     *
	     * @param costRelativeTolerance Desired relative error in the sum of
	     * squares.
	     * @param parRelativeTolerance Desired relative error in the approximate
	     * solution parameters.
	     * @param orthoTolerance Desired max cosine on the orthogonality between
	     * the function vector and the columns of the Jacobian.
	     */
	    this.init0 = function (costRelativeTolerance, parRelativeTolerance, orthoTolerance) {
	        this.init1(100, costRelativeTolerance, parRelativeTolerance, orthoTolerance, SAFE_MIN);
	    };
	
	    /**
	     * The arguments control the behaviour of the default convergence checking
	     * procedure.
	     * Additional criteria can defined through the setting of a {@link
	     * ConvergenceChecker}.
	     *
	     * @param initialStepBoundFactor Positive input variable used in
	     * determining the initial step bound. This bound is set to the
	     * product of initialStepBoundFactor and the euclidean norm of
	     * {@code diag * x} if non-zero, or else to {@code initialStepBoundFactor}
	     * itself. In most cases factor should lie in the interval
	     * {@code (0.1, 100.0)}. {@code 100} is a generally recommended value.
	     * @param costRelativeTolerance Desired relative error in the sum of
	     * squares.
	     * @param parRelativeTolerance Desired relative error in the approximate
	     * solution parameters.
	     * @param orthoTolerance Desired max cosine on the orthogonality between
	     * the function vector and the columns of the Jacobian.
	     * @param threshold Desired threshold for QR ranking. If the squared norm
	     * of a column vector is smaller or equal to this threshold during QR
	     * decomposition, it is considered to be a zero vector and hence the rank
	     * of the matrix is reduced.
	     */
	    this.init1 = function (initialStepBoundFactor, costRelativeTolerance, parRelativeTolerance, orthoTolerance, threshold) {
	        this.initialStepBoundFactor = initialStepBoundFactor;
	        this.costRelativeTolerance = costRelativeTolerance;
	        this.parRelativeTolerance = parRelativeTolerance;
	        this.orthoTolerance = orthoTolerance;
	        this.qrRankingThreshold = threshold;
	    };
	
	    /** {@inheritDoc} */
	
	    this.doOptimize = function () {
	        var nR = this.target.length; // Number of observed data.
	        var currentPoint = this.startPoint;
	        var nC = currentPoint.length; // Number of parameters.
	
	        // arrays shared with the other private methods
	        this.solvedCols = Math.min(nR, nC);
	        this.diagR = arr(nC);
	        this.jacNorm = arr(nC);
	        this.beta = arr(nC);
	        this.permutation = arr(nC);
	        this.lmDir = arr(nC);
	
	        // local point
	        var delta = 0;
	        var xNorm = 0;
	        var diag = arr(nC);
	        var oldX = arr(nC);
	        var oldRes = arr(nR);
	        var oldObj = arr(nR);
	        var qtf = arr(nR);
	        var work1 = arr(nC);
	        var work2 = arr(nC);
	        var work3 = arr(nC);
	
	        var weightMatrixSqrt = this.getWeightSquareRoot();
	
	        // Evaluate the function at the starting point and calculate its norm.
	        var currentObjective = this.computeObjectiveValue(currentPoint);
	        var currentResiduals = this.computeResiduals(currentObjective);
	        var current = [currentPoint, currentObjective];
	        var currentCost = this.computeCost(currentResiduals);
	
	        // Outer loop.
	        this.lmPar = 0;
	        var firstIteration = true;
	        var iter = 0;
	
	        while (true) {
	            ++iter;
	            var previous = current;
	
	            // QR decomposition of the jacobian matrix
	            this.qrDecomposition(this.computeWeightedJacobian(currentPoint));
	
	            this.weightedResidual = this.operate(weightMatrixSqrt, currentResiduals);
	            for (var i = 0; i < nR; i++) {
	                qtf[i] = this.weightedResidual[i];
	            }
	
	            // compute Qt.res
	            this.qTy(qtf);
	
	            // now we don't need Q anymore,
	            // so let jacobian contain the R matrix with its diagonal elements
	            for (var k = 0; k < this.solvedCols; ++k) {
	                var pk = this.permutation[k];
	                this.weightedJacobian[k][pk] = this.diagR[pk];
	            }
	
	            if (firstIteration) {
	                // scale the point according to the norms of the columns
	                // of the initial jacobian
	                xNorm = 0;
	                for (var k = 0; k < nC; ++k) {
	                    var dk = this.jacNorm[k];
	                    if (dk == 0) {
	                        dk = 1.0;
	                    }
	                    var xk = dk * currentPoint[k];
	                    xNorm += xk * xk;
	                    diag[k] = dk;
	                }
	                xNorm = Math.sqrt(xNorm);
	
	                // initialize the step bound delta
	                delta = xNorm == 0 ? this.initialStepBoundFactor : this.initialStepBoundFactor * xNorm;
	            }
	
	            // check orthogonality between function vector and jacobian columns
	            var maxCosine = 0;
	            if (currentCost != 0) {
	                for (var j = 0; j < this.solvedCols; ++j) {
	                    var pj = this.permutation[j];
	                    var s = this.jacNorm[pj];
	                    if (s != 0) {
	                        var sum = 0;
	                        for (var i = 0; i <= j; ++i) {
	                            sum += this.weightedJacobian[i][pj] * qtf[i];
	                        }
	                        maxCosine = Math.max(maxCosine, Math.abs(sum) / (s * currentCost));
	                    }
	                }
	            }
	            if (maxCosine <= this.orthoTolerance) {
	                // Convergence has been reached.
	                this.setCost(currentCost);
	                return current;
	            }
	
	            // rescale if necessary
	            for (var j = 0; j < nC; ++j) {
	                diag[j] = Math.max(diag[j], this.jacNorm[j]);
	            }
	
	            // Inner loop.
	            for (var ratio = 0; ratio < 1.0e-4;) {
	
	                // save the state
	                for (var j = 0; j < this.solvedCols; ++j) {
	                    var pj = this.permutation[j];
	                    oldX[pj] = currentPoint[pj];
	                }
	                var previousCost = currentCost;
	                var tmpVec = this.weightedResidual;
	                this.weightedResidual = oldRes;
	                oldRes = tmpVec;
	                tmpVec = currentObjective;
	                currentObjective = oldObj;
	                oldObj = tmpVec;
	
	                // determine the Levenberg-Marquardt parameter
	                this.determineLMParameter(qtf, delta, diag, work1, work2, work3);
	
	                // compute the new point and the norm of the evolution direction
	                var lmNorm = 0;
	                for (var j = 0; j < this.solvedCols; ++j) {
	                    var pj = this.permutation[j];
	                    this.lmDir[pj] = -this.lmDir[pj];
	                    currentPoint[pj] = oldX[pj] + this.lmDir[pj];
	                    var s = diag[pj] * this.lmDir[pj];
	                    lmNorm += s * s;
	                }
	                lmNorm = Math.sqrt(lmNorm);
	                // on the first iteration, adjust the initial step bound.
	                if (firstIteration) {
	                    delta = Math.min(delta, lmNorm);
	                }
	
	                // Evaluate the function at x + p and calculate its norm.
	                currentObjective = this.computeObjectiveValue(currentPoint);
	                currentResiduals = this.computeResiduals(currentObjective);
	                current = [currentPoint, currentObjective];
	                currentCost = this.computeCost(currentResiduals);
	
	                // compute the scaled actual reduction
	                var actRed = -1.0;
	                if (0.1 * currentCost < previousCost) {
	                    var r = currentCost / previousCost;
	                    actRed = 1.0 - r * r;
	                }
	
	                // compute the scaled predicted reduction
	                // and the scaled directional derivative
	                for (var j = 0; j < this.solvedCols; ++j) {
	                    var pj = this.permutation[j];
	                    var dirJ = this.lmDir[pj];
	                    work1[j] = 0;
	                    for (var i = 0; i <= j; ++i) {
	                        work1[i] += this.weightedJacobian[i][pj] * dirJ;
	                    }
	                }
	                var coeff1 = 0;
	                for (var j = 0; j < this.solvedCols; ++j) {
	                    coeff1 += work1[j] * work1[j];
	                }
	                var pc2 = previousCost * previousCost;
	                coeff1 = coeff1 / pc2;
	                var coeff2 = this.lmPar * lmNorm * lmNorm / pc2;
	                var preRed = coeff1 + 2 * coeff2;
	                var dirDer = -(coeff1 + coeff2);
	
	                // ratio of the actual to the predicted reduction
	                ratio = preRed == 0 ? 0 : actRed / preRed;
	
	                // update the step bound
	                if (ratio <= 0.25) {
	                    var tmp = actRed < 0 ? 0.5 * dirDer / (dirDer + 0.5 * actRed) : 0.5;
	                    if (0.1 * currentCost >= previousCost || tmp < 0.1) {
	                        tmp = 0.1;
	                    }
	                    delta = tmp * Math.min(delta, 10.0 * lmNorm);
	                    this.lmPar /= tmp;
	                } else if (this.lmPar == 0 || ratio >= 0.75) {
	                    delta = 2 * lmNorm;
	                    this.lmPar *= 0.5;
	                }
	
	                // test for successful iteration.
	                if (ratio >= 1.0e-4) {
	                    // successful iteration, update the norm
	                    firstIteration = false;
	                    xNorm = 0;
	                    for (var k = 0; k < nC; ++k) {
	                        var xK = diag[k] * currentPoint[k];
	                        xNorm += xK * xK;
	                    }
	                    xNorm = Math.sqrt(xNorm);
	
	                    // tests for convergence.
	                    if (this.checker != null) {
	                        // we use the vectorial convergence checker
	                        if (this.checker.call(iter, previous, current)) {
	                            this.setCost(currentCost);
	                            return current;
	                        }
	                    }
	                } else {
	                    // failed iteration, reset the previous values
	                    currentCost = previousCost;
	                    for (var j = 0; j < this.solvedCols; ++j) {
	                        var pj = this.permutation[j];
	                        currentPoint[pj] = oldX[pj];
	                    }
	                    tmpVec = this.weightedResidual;
	                    this.weightedResidual = oldRes;
	                    oldRes = tmpVec;
	                    tmpVec = currentObjective;
	                    currentObjective = oldObj;
	                    oldObj = tmpVec;
	                    // Reset "current" to previous values.
	                    current = [currentPoint, currentObjective];
	                }
	
	                // Default convergence criteria.
	                if (Math.abs(actRed) <= this.costRelativeTolerance && preRed <= this.costRelativeTolerance && ratio <= 2.0 || delta <= this.parRelativeTolerance * xNorm) {
	                    this.setCost(currentCost);
	                    return current;
	                }
	
	                // tests for termination and stringent tolerances
	                // (2.2204e-16 is the machine epsilon for IEEE754)
	                if (Math.abs(actRed) <= 2.2204e-16 && preRed <= 2.2204e-16 && ratio <= 2.0) {
	                    throw "TOO_SMALL_COST_RELATIVE_TOLERANCE: " + this.costRelativeTolerance;
	                } else if (delta <= 2.2204e-16 * xNorm) {
	                    throw "TOO_SMALL_PARAMETERS_RELATIVE_TOLERANCE: " + this.parRelativeTolerance;
	                } else if (maxCosine <= 2.2204e-16) {
	                    throw "TOO_SMALL_ORTHOGONALITY_TOLERANCE: " + this.orthoTolerance;
	                }
	            }
	        }
	    };
	
	    /**
	     * Determine the Levenberg-Marquardt parameter.
	     * <p>This implementation is a translation in Java of the MINPACK
	     * <a href="http://www.netlib.org/minpack/lmpar.f">lmpar</a>
	     * routine.</p>
	     * <p>This method sets the lmPar and lmDir attributes.</p>
	     * <p>The authors of the original fortran function are:</p>
	     * <ul>
	     *   <li>Argonne National Laboratory. MINPACK project. March 1980</li>
	     *   <li>Burton  S. Garbow</li>
	     *   <li>Kenneth E. Hillstrom</li>
	     *   <li>Jorge   J. More</li>
	     * </ul>
	     * <p>Luc Maisonobe did the Java translation.</p>
	     *
	     * @param qy array containing qTy
	     * @param delta upper bound on the euclidean norm of diagR * lmDir
	     * @param diag diagonal matrix
	     * @param work1 work array
	     * @param work2 work array
	     * @param work3 work array
	     */
	    this.determineLMParameter = function (qy, delta, diag, work1, work2, work3) {
	        var nC = this.weightedJacobian[0].length;
	
	        // compute and store in x the gauss-newton direction, if the
	        // jacobian is rank-deficient, obtain a least squares solution
	        for (var j = 0; j < this.rank; ++j) {
	            this.lmDir[this.permutation[j]] = qy[j];
	        }
	        for (var j = this.rank; j < nC; ++j) {
	            this.lmDir[this.permutation[j]] = 0;
	        }
	        for (var k = this.rank - 1; k >= 0; --k) {
	            var pk = this.permutation[k];
	            var ypk = this.lmDir[pk] / this.diagR[pk];
	            for (var i = 0; i < k; ++i) {
	                this.lmDir[this.permutation[i]] -= ypk * this.weightedJacobian[i][pk];
	            }
	            this.lmDir[pk] = ypk;
	        }
	
	        // evaluate the function at the origin, and test
	        // for acceptance of the Gauss-Newton direction
	        var dxNorm = 0;
	        for (var j = 0; j < this.solvedCols; ++j) {
	            var pj = this.permutation[j];
	            var s = diag[pj] * this.lmDir[pj];
	            work1[pj] = s;
	            dxNorm += s * s;
	        }
	        dxNorm = Math.sqrt(dxNorm);
	        var fp = dxNorm - delta;
	        if (fp <= 0.1 * delta) {
	            this.lmPar = 0;
	            return;
	        }
	
	        // if the jacobian is not rank deficient, the Newton step provides
	        // a lower bound, parl, for the zero of the function,
	        // otherwise set this bound to zero
	        var sum2;
	        var parl = 0;
	        if (this.rank == this.solvedCols) {
	            for (var j = 0; j < this.solvedCols; ++j) {
	                var pj = this.permutation[j];
	                work1[pj] *= diag[pj] / dxNorm;
	            }
	            sum2 = 0;
	            for (var j = 0; j < this.solvedCols; ++j) {
	                var pj = this.permutation[j];
	                var sum = 0;
	                for (var i = 0; i < j; ++i) {
	                    sum += this.weightedJacobian[i][pj] * work1[this.permutation[i]];
	                }
	                var s = (work1[pj] - sum) / this.diagR[pj];
	                work1[pj] = s;
	                sum2 += s * s;
	            }
	            parl = fp / (delta * sum2);
	        }
	
	        // calculate an upper bound, paru, for the zero of the function
	        sum2 = 0;
	        for (var j = 0; j < this.solvedCols; ++j) {
	            var pj = this.permutation[j];
	            var sum = 0;
	            for (var i = 0; i <= j; ++i) {
	                sum += this.weightedJacobian[i][pj] * qy[i];
	            }
	            sum /= diag[pj];
	            sum2 += sum * sum;
	        }
	        var gNorm = Math.sqrt(sum2);
	        var paru = gNorm / delta;
	        if (paru == 0) {
	            // 2.2251e-308 is the smallest positive real for IEE754
	            paru = 2.2251e-308 / Math.min(delta, 0.1);
	        }
	
	        // if the input par lies outside of the interval (parl,paru),
	        // set par to the closer endpoint
	        this.lmPar = Math.min(paru, Math.max(this.lmPar, parl));
	        if (this.lmPar == 0) {
	            this.lmPar = gNorm / dxNorm;
	        }
	
	        for (var countdown = 10; countdown >= 0; --countdown) {
	
	            // evaluate the function at the current value of lmPar
	            if (this.lmPar == 0) {
	                this.lmPar = Math.max(2.2251e-308, 0.001 * paru);
	            }
	            var sPar = Math.sqrt(this.lmPar);
	            for (var j = 0; j < this.solvedCols; ++j) {
	                var pj = this.permutation[j];
	                work1[pj] = sPar * diag[pj];
	            }
	            this.determineLMDirection(qy, work1, work2, work3);
	
	            dxNorm = 0;
	            for (var j = 0; j < this.solvedCols; ++j) {
	                var pj = this.permutation[j];
	                var s = diag[pj] * this.lmDir[pj];
	                work3[pj] = s;
	                dxNorm += s * s;
	            }
	            dxNorm = Math.sqrt(dxNorm);
	            var previousFP = fp;
	            fp = dxNorm - delta;
	
	            // if the function is small enough, accept the current value
	            // of lmPar, also test for the exceptional cases where parl is zero
	            if (Math.abs(fp) <= 0.1 * delta || parl == 0 && fp <= previousFP && previousFP < 0) {
	                return;
	            }
	
	            // compute the Newton correction
	            for (var j = 0; j < this.solvedCols; ++j) {
	                var pj = this.permutation[j];
	                work1[pj] = work3[pj] * diag[pj] / dxNorm;
	            }
	            for (var j = 0; j < this.solvedCols; ++j) {
	                var pj = this.permutation[j];
	                work1[pj] /= work2[j];
	                var tmp = work1[pj];
	                for (var i = j + 1; i < this.solvedCols; ++i) {
	                    work1[this.permutation[i]] -= this.weightedJacobian[i][pj] * tmp;
	                }
	            }
	            sum2 = 0;
	            for (var j = 0; j < this.solvedCols; ++j) {
	                var s = work1[this.permutation[j]];
	                sum2 += s * s;
	            }
	            var correction = fp / (delta * sum2);
	
	            // depending on the sign of the function, update parl or paru.
	            if (fp > 0) {
	                parl = Math.max(parl, this.lmPar);
	            } else if (fp < 0) {
	                paru = Math.min(paru, this.lmPar);
	            }
	
	            // compute an improved estimate for lmPar
	            this.lmPar = Math.max(parl, this.lmPar + correction);
	        }
	    };
	
	    /**
	     * Solve a*x = b and d*x = 0 in the least squares sense.
	     * <p>This implementation is a translation in Java of the MINPACK
	     * <a href="http://www.netlib.org/minpack/qrsolv.f">qrsolv</a>
	     * routine.</p>
	     * <p>This method sets the lmDir and lmDiag attributes.</p>
	     * <p>The authors of the original fortran function are:</p>
	     * <ul>
	     *   <li>Argonne National Laboratory. MINPACK project. March 1980</li>
	     *   <li>Burton  S. Garbow</li>
	     *   <li>Kenneth E. Hillstrom</li>
	     *   <li>Jorge   J. More</li>
	     * </ul>
	     * <p>Luc Maisonobe did the Java translation.</p>
	     *
	     * @param qy array containing qTy
	     * @param diag diagonal matrix
	     * @param lmDiag diagonal elements associated with lmDir
	     * @param work work array
	     */
	    this.determineLMDirection = function (qy, diag, lmDiag, work) {
	
	        // copy R and Qty to preserve input and initialize s
	        //  in particular, save the diagonal elements of R in lmDir
	        for (var j = 0; j < this.solvedCols; ++j) {
	            var pj = this.permutation[j];
	            for (var i = j + 1; i < this.solvedCols; ++i) {
	                this.weightedJacobian[i][pj] = this.weightedJacobian[j][this.permutation[i]];
	            }
	            this.lmDir[j] = this.diagR[pj];
	            work[j] = qy[j];
	        }
	
	        // eliminate the diagonal matrix d using a Givens rotation
	        for (var j = 0; j < this.solvedCols; ++j) {
	
	            // prepare the row of d to be eliminated, locating the
	            // diagonal element using p from the Q.R. factorization
	            var pj = this.permutation[j];
	            var dpj = diag[pj];
	            if (dpj != 0) {
	                Arrays_fill(lmDiag, j + 1, lmDiag.length, 0);
	            }
	            lmDiag[j] = dpj;
	
	            //  the transformations to eliminate the row of d
	            // modify only a single element of Qty
	            // beyond the first n, which is initially zero.
	            var qtbpj = 0;
	            for (var k = j; k < this.solvedCols; ++k) {
	                var pk = this.permutation[k];
	
	                // determine a Givens rotation which eliminates the
	                // appropriate element in the current row of d
	                if (lmDiag[k] != 0) {
	
	                    var sin;
	                    var cos;
	                    var rkk = this.weightedJacobian[k][pk];
	                    if (Math.abs(rkk) < Math.abs(lmDiag[k])) {
	                        var cotan = rkk / lmDiag[k];
	                        sin = 1.0 / Math.sqrt(1.0 + cotan * cotan);
	                        cos = sin * cotan;
	                    } else {
	                        var tan = lmDiag[k] / rkk;
	                        cos = 1.0 / Math.sqrt(1.0 + tan * tan);
	                        sin = cos * tan;
	                    }
	
	                    // compute the modified diagonal element of R and
	                    // the modified element of (Qty,0)
	                    this.weightedJacobian[k][pk] = cos * rkk + sin * lmDiag[k];
	                    var temp = cos * work[k] + sin * qtbpj;
	                    qtbpj = -sin * work[k] + cos * qtbpj;
	                    work[k] = temp;
	
	                    // accumulate the tranformation in the row of s
	                    for (var i = k + 1; i < this.solvedCols; ++i) {
	                        var rik = this.weightedJacobian[i][pk];
	                        var temp2 = cos * rik + sin * lmDiag[i];
	                        lmDiag[i] = -sin * rik + cos * lmDiag[i];
	                        this.weightedJacobian[i][pk] = temp2;
	                    }
	                }
	            }
	
	            // store the diagonal element of s and restore
	            // the corresponding diagonal element of R
	            lmDiag[j] = this.weightedJacobian[j][this.permutation[j]];
	            this.weightedJacobian[j][this.permutation[j]] = this.lmDir[j];
	        }
	
	        // solve the triangular system for z, if the system is
	        // singular, then obtain a least squares solution
	        var nSing = this.solvedCols;
	        for (var j = 0; j < this.solvedCols; ++j) {
	            if (lmDiag[j] == 0 && nSing == this.solvedCols) {
	                nSing = j;
	            }
	            if (nSing < this.solvedCols) {
	                work[j] = 0;
	            }
	        }
	        if (nSing > 0) {
	            for (var j = nSing - 1; j >= 0; --j) {
	                var pj = this.permutation[j];
	                var sum = 0;
	                for (var i = j + 1; i < nSing; ++i) {
	                    sum += this.weightedJacobian[i][pj] * work[i];
	                }
	                work[j] = (work[j] - sum) / lmDiag[j];
	            }
	        }
	
	        // permute the components of z back to components of lmDir
	        for (var j = 0; j < this.lmDir.length; ++j) {
	            this.lmDir[this.permutation[j]] = work[j];
	        }
	    };
	
	    /**
	     * Decompose a matrix A as A.P = Q.R using Householder transforms.
	     * <p>As suggested in the P. Lascaux and R. Theodor book
	     * <i>Analyse num&eacute;rique matricielle appliqu&eacute;e &agrave;
	     * l'art de l'ing&eacute;nieur</i> (Masson, 1986), instead of representing
	     * the Householder transforms with u<sub>k</sub> unit vectors such that:
	     * <pre>
	     * H<sub>k</sub> = I - 2u<sub>k</sub>.u<sub>k</sub><sup>t</sup>
	     * </pre>
	     * we use <sub>k</sub> non-unit vectors such that:
	     * <pre>
	     * H<sub>k</sub> = I - beta<sub>k</sub>v<sub>k</sub>.v<sub>k</sub><sup>t</sup>
	     * </pre>
	     * where v<sub>k</sub> = a<sub>k</sub> - alpha<sub>k</sub> e<sub>k</sub>.
	     * The beta<sub>k</sub> coefficients are provided upon exit as recomputing
	     * them from the v<sub>k</sub> vectors would be costly.</p>
	     * <p>This decomposition handles rank deficient cases since the tranformations
	     * are performed in non-increasing columns norms order thanks to columns
	     * pivoting. The diagonal elements of the R matrix are therefore also in
	     * non-increasing absolute values order.</p>
	     *
	     * @param jacobian Weighted Jacobian matrix at the current point.
	     * @exception ConvergenceException if the decomposition cannot be performed
	     */
	    this.qrDecomposition = function (jacobian) {
	        // Code in this class assumes that the weighted Jacobian is -(W^(1/2) J),
	        // hence the multiplication by -1.
	        this.weightedJacobian = this.scalarMultiply(jacobian, -1);
	
	        var nR = this.weightedJacobian.length;
	        var nC = this.weightedJacobian[0].length;
	
	        // initializations
	        for (var k = 0; k < nC; ++k) {
	            this.permutation[k] = k;
	            var norm2 = 0;
	            for (var i = 0; i < nR; ++i) {
	                var akk = this.weightedJacobian[i][k];
	                norm2 += akk * akk;
	            }
	            this.jacNorm[k] = Math.sqrt(norm2);
	        }
	
	        // transform the matrix column after column
	        for (var k = 0; k < nC; ++k) {
	
	            // select the column with the greatest norm on active components
	            var nextColumn = -1;
	            var ak2 = Number.NEGATIVE_INFINITY;
	            for (var i = k; i < nC; ++i) {
	                var norm2 = 0;
	                for (var j = k; j < nR; ++j) {
	                    var aki = this.weightedJacobian[j][this.permutation[i]];
	                    norm2 += aki * aki;
	                }
	                if (!isFinite(norm2)) {
	                    throw "UNABLE_TO_PERFORM_QR_DECOMPOSITION_ON_JACOBIAN";
	                }
	                if (norm2 > ak2) {
	                    nextColumn = i;
	                    ak2 = norm2;
	                }
	            }
	            if (ak2 <= this.qrRankingThreshold) {
	                this.rank = k;
	                return;
	            }
	            var pk = this.permutation[nextColumn];
	            this.permutation[nextColumn] = this.permutation[k];
	            this.permutation[k] = pk;
	
	            // choose alpha such that Hk.u = alpha ek
	            var akk = this.weightedJacobian[k][pk];
	            var alpha = akk > 0 ? -Math.sqrt(ak2) : Math.sqrt(ak2);
	            var betak = 1.0 / (ak2 - akk * alpha);
	            this.beta[pk] = betak;
	
	            // transform the current column
	            this.diagR[pk] = alpha;
	            this.weightedJacobian[k][pk] -= alpha;
	
	            // transform the remaining columns
	            for (var dk = nC - 1 - k; dk > 0; --dk) {
	                var gamma = 0;
	                for (var j = k; j < nR; ++j) {
	                    gamma += this.weightedJacobian[j][pk] * this.weightedJacobian[j][this.permutation[k + dk]];
	                }
	                gamma *= betak;
	                for (var j = k; j < nR; ++j) {
	                    this.weightedJacobian[j][this.permutation[k + dk]] -= gamma * this.weightedJacobian[j][pk];
	                }
	            }
	        }
	        this.rank = this.solvedCols;
	    };
	
	    /**
	     * Compute the product Qt.y for some Q.R. decomposition.
	     *
	     * @param y vector to multiply (will be overwritten with the result)
	     */
	    this.qTy = function (y) {
	        var nR = this.weightedJacobian.length;
	        var nC = this.weightedJacobian[0].length;
	
	        for (var k = 0; k < nC; ++k) {
	            var pk = this.permutation[k];
	            var gamma = 0;
	            for (var i = k; i < nR; ++i) {
	                gamma += this.weightedJacobian[i][pk] * y[i];
	            }
	            gamma *= this.beta[pk];
	            for (var i = k; i < nR; ++i) {
	                y[i] -= gamma * this.weightedJacobian[i][pk];
	            }
	        }
	    };
	
	    /**
	     * Computes the weighted Jacobian matrix.
	     *
	     * @param params Model parameters at which to compute the Jacobian.
	     * @return the weighted Jacobian: W<sup>1/2</sup> J.
	     * @throws DimensionMismatchException if the Jacobian dimension does not
	     * match problem dimension.
	     */
	    this.computeWeightedJacobian = function (params) {
	        //        return this.weightMatrixSqrt.multiply(this.jacobian(params));
	
	        //TODO: since weighted matrix is always identity return jacobian itself
	        return this.jacobian(params);
	    };
	
	    this.scalarMultiply = function (m, s) {
	        var rowCount = m.length;
	        var columnCount = m[0].length;
	        var out = [];
	        for (var row = 0; row < rowCount; ++row) {
	            out.push([]);
	            for (var col = 0; col < columnCount; ++col) {
	                out[row].push(m[row][col] * s);
	            }
	        }
	
	        return out;
	    };
	
	    this.operate = function (m, v) {
	        var nRows = m.length;
	        var nCols = m[0].length;
	        if (v.length != nCols) {
	            throw "DimensionMismatchException: " + v.length + "!=" + nCols;
	        }
	        var out = [];
	        for (var row = 0; row < nRows; row++) {
	            var dataRow = m[row];
	            var sum = 0;
	            for (var i = 0; i < nCols; i++) {
	                sum += dataRow[i] * v[i];
	            }
	            out[row] = sum;
	        }
	        return out;
	    };
	
	    /**
	     * Computes the cost.
	     *
	     * @param residuals Residuals.
	     * @return the cost.
	     * @see #computeResiduals(double[])
	     */
	    this.computeCost = function (residuals) {
	        return Math.sqrt(this.dotProduct(residuals, this.operate(this.getWeight(), residuals)));
	    };
	
	    this.dotProduct = function (v1, v2) {
	        var dot = 0;
	        for (var i = 0; i < v1.length; i++) {
	            dot += v1[i] * v2[i];
	        }
	        return dot;
	    };
	
	    /**
	     * Gets the root-mean-square (RMS) value.
	     *
	     * The RMS the root of the arithmetic mean of the square of all weighted
	     * residuals.
	     * This is related to the criterion that is minimized by the optimizer
	     * as follows: If <em>c</em> if the criterion, and <em>n</em> is the
	     * number of measurements, then the RMS is <em>sqrt (c/n)</em>.
	     *
	     * @return the RMS value.
	     */
	    this.getRMS = function () {
	        return Math.sqrt(this.getChiSquare() / this.target.length);
	    };
	
	    /**
	     * Get a Chi-Square-like value assuming the N residuals follow N
	     * distinct normal distributions centered on 0 and whose variances are
	     * the reciprocal of the weights.
	     * @return chi-square value
	     */
	    this.getChiSquare = function () {
	        return this.cost * this.cost;
	    };
	
	    /**
	     * Gets the square-root of the weight matrix.
	     *
	     * @return the square-root of the weight matrix.
	     */
	    this.getWeightSquareRoot = function () {
	        return this.weightMatrixSqrt; //.copy(); FIXME for now it's always identity
	    };
	
	    this.getWeight = function () {
	        return this.weightMatrix; //.copy(); FIXME for now it's always identity
	    };
	
	    /**
	     * Sets the cost.
	     *
	     * @param cost Cost value.
	     */
	    this.setCost = function (cost) {
	        this.cost = cost;
	    };
	
	    /**
	     * Computes the residuals.
	     * The residual is the difference between the observed (target)
	     * values and the model (objective function) value.
	     * There is one residual for each element of the vector-valued
	     * function.
	     *
	     * @param objectiveValue Value of the the objective function. This is
	     * the value returned from a call to
	     * {@link #computeObjectiveValue(double[]) computeObjectiveValue}
	     * (whose array argument contains the model parameters).
	     * @return the residuals.
	     * @throws DimensionMismatchException if {@code params} has a wrong
	     * length.
	     */
	    this.computeResiduals = function (objectiveValue) {
	        var target = this.target;
	        if (objectiveValue.length != target.length) {
	            throw "DimensionMismatchException: " + target.length + " != " + objectiveValue.length;
	        }
	
	        var residuals = arr(target.length);
	        for (var i = 0; i < target.length; i++) {
	            residuals[i] = target[i] - objectiveValue[i];
	        }
	
	        return residuals;
	    };
	
	    this.computeObjectiveValue = function (params) {
	        if (++this.evalCount > this.evalMaximalCount) {
	            throw "TOO MANY FUNCTION EVALUATION";
	        }
	        return this.model(params);
	    };
	}

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ConstantWrapper = exports.EqualsTo = exports.createByConstraintName = undefined;
	
	var _utils = __webpack_require__(88);
	
	/**
	 * This intermediate layer should be eliminated since constraint server isn't used anymore
	 */
	function createByConstraintName(name, params, values) {
	  switch (name) {
	    case "equal":
	      return new Equal(params);
	    case "equalsTo":
	      return new EqualsTo(params, values[0]);
	    case "MinLength":
	      return new MinLength(params, values[0]);
	    case "perpendicular":
	      return new Perpendicular(params);
	    case "parallel":
	      return new Parallel(params);
	    case "P2LDistance":
	      return new P2LDistance(params, values[0]);
	    case "P2LDistanceV":
	      return new P2LDistanceV(params);
	    case "P2PDistance":
	      return new P2PDistance(params, values[0]);
	    case "P2PDistanceV":
	      return new P2PDistanceV(params);
	    case "PointOnEllipse":
	      return new PointOnEllipse(params);
	    case "EllipseTangent":
	      return new EllipseTangent(params);
	    case "angle":
	      return new Angle(params);
	    case "angleConst":
	      var _ = true,
	          x = false;
	      // Exclude angle value from parameters
	      return new ConstantWrapper(new Angle(params), [x, x, x, x, x, x, x, x, _]);
	    case 'LockConvex':
	      return new LockConvex(params);
	    case 'GreaterThan':
	      return new GreaterThan(params, values[0]);
	
	  }
	}
	
	/** @constructor */
	function Equal(params) {
	
	  this.params = params;
	
	  this.error = function () {
	    return this.params[0].get() - this.params[1].get();
	  };
	
	  this.gradient = function (out) {
	    out[0] = 1;
	    out[1] = -1;
	  };
	}
	
	function MinLength(params, distance) {
	
	  this.params = params;
	  this.distance = distance;
	
	  var p1x = 0;
	  var p1y = 1;
	  var p2x = 2;
	  var p2y = 3;
	
	  this.error = function () {
	    var dx = params[p1x].get() - params[p2x].get();
	    var dy = params[p1y].get() - params[p2y].get();
	    var d = Math.sqrt(dx * dx + dy * dy);
	    return d < this.distance ? d - this.distance : 0;
	  };
	
	  this.gradient = function (out) {
	    var dx = params[p1x].get() - params[p2x].get();
	    var dy = params[p1y].get() - params[p2y].get();
	    var d = Math.sqrt(dx * dx + dy * dy);
	    if (d == 0) {
	      d = 0.000001;
	    }
	    if (d >= this.distance) {
	      out[p1x] = 0;
	      out[p1y] = 0;
	      out[p2x] = 0;
	      out[p2y] = 0;
	    }
	    out[p1x] = dx / d;
	    out[p1y] = dy / d;
	    out[p2x] = -dx / d;
	    out[p2y] = -dy / d;
	  };
	}
	
	function LockConvex(params) {
	  this.params = params;
	
	  var _pcx = 0;
	  var _pcy = 1;
	  var _pax = 2;
	  var _pay = 3;
	  var _ptx = 4;
	  var _pty = 5;
	
	  this.error = function () {
	    var cx = params[_pcx].get();
	    var cy = params[_pcy].get();
	    var ax = params[_pax].get();
	    var ay = params[_pay].get();
	    var tx = params[_ptx].get();
	    var ty = params[_pty].get();
	
	    var crossProductNorm = (cx - ax) * (ty - ay) - (cy - ay) * (tx - ax);
	
	    var violate = crossProductNorm < 0;
	    return violate ? crossProductNorm : 0;
	  };
	
	  this.gradient = function (out) {
	    var cx = params[_pcx].get();
	    var cy = params[_pcy].get();
	    var ax = params[_pax].get();
	    var ay = params[_pay].get();
	    var tx = params[_ptx].get();
	    var ty = params[_pty].get();
	
	    out[_pcx] = ty - ay;
	    out[_pcy] = ax - tx;
	    out[_pax] = cy - ty;
	    out[_pay] = tx - cx;
	    out[_ptx] = ay - cy;
	    out[_pty] = cx - ax;
	  };
	}
	
	/** @constructor */
	function ConstantWrapper(constr, mask) {
	
	  this.params = [];
	  this.grad = [];
	  var j;
	
	  for (j = 0; j < constr.params.length; j++) {
	    if (!mask[j]) {
	      this.params.push(constr.params[j]);
	    }
	    this.grad.push(0);
	  }
	
	  this.error = function () {
	    return constr.error();
	  };
	
	  this.gradient = function (out) {
	    (0, _utils.fillArray)(this.grad, 0, this.grad.length, 0);
	    constr.gradient(this.grad);
	    var jj = 0;
	    for (j = 0; j < mask.length; j++) {
	      if (!mask[j]) {
	        out[jj++] = this.grad[j];
	      }
	    }
	  };
	}
	
	/** @constructor */
	function Weighted(constr, weight) {
	
	  this.weight = weight;
	  this.params = constr.params;
	  this.constr = constr;
	
	  this.error = function () {
	    return constr.error() * this.weight;
	  };
	
	  this.gradient = function (out) {
	    constr.gradient(out);
	    for (var i = 0; i < out.length; i++) {
	      out[i] *= this.weight;
	    }
	  };
	}
	
	/** @constructor */
	function EqualsTo(params, value) {
	
	  this.params = params;
	  this.value = value;
	
	  this.error = function () {
	    return this.params[0].get() - this.value;
	  };
	
	  this.gradient = function (out) {
	    out[0] = 1;
	  };
	}
	
	/** @constructor */
	function P2LDistance(params, distance) {
	
	  this.params = params;
	  this.distance = distance;
	
	  var TX = 0;
	  var TY = 1;
	  var LP1X = 2;
	  var LP1Y = 3;
	  var LP2X = 4;
	  var LP2Y = 5;
	
	  this.error = function () {
	    var x0 = params[TX].get(),
	        x1 = params[LP1X].get(),
	        x2 = params[LP2X].get();
	    var y0 = params[TY].get(),
	        y1 = params[LP1Y].get(),
	        y2 = params[LP2Y].get();
	    var dx = x2 - x1;
	    var dy = y2 - y1;
	    var d = Math.sqrt(dx * dx + dy * dy);
	    if (d == 0) {
	      return 0;
	    }
	    var A = -x0 * dy + y0 * dx + x1 * y2 - x2 * y1;
	    return Math.abs(A) / d - this.distance;
	  };
	
	  this.gradient = function (out) {
	    var x0 = params[TX].get(),
	        x1 = params[LP1X].get(),
	        x2 = params[LP2X].get();
	    var y0 = params[TY].get(),
	        y1 = params[LP1Y].get(),
	        y2 = params[LP2Y].get();
	    var dx = x2 - x1;
	    var dy = y2 - y1;
	    var d2 = dx * dx + dy * dy;
	    var d = Math.sqrt(d2);
	    var d3 = d * d2;
	    //    var AA = -x0 * (y2 - y1) + y0 * (x2 - x1) + x1 * y2 - x2 * y1;
	    var A = -x0 * dy + y0 * dx + x1 * y2 - x2 * y1;
	    var AM = Math.abs(A);
	    var j = A < 0 ? -1 : 1;
	
	    out[TX] = j * (y1 - y2) / d;
	    out[TY] = j * (x2 - x1) / d;
	
	    out[LP1X] = j * (y2 - y0) / d + AM * dx / d3;
	    out[LP1Y] = j * (x0 - x2) / d + AM * dy / d3;
	    out[LP2X] = j * (y0 - y1) / d - AM * dx / d3;
	    out[LP2Y] = j * (x1 - x0) / d - AM * dy / d3;
	
	    _fixNaN(out);
	  };
	}
	
	/** @constructor */
	function P2LDistanceV(params) {
	
	  this.params = params; //.slice(0, params.length -1);
	
	  var TX = 0;
	  var TY = 1;
	  var LP1X = 2;
	  var LP1Y = 3;
	  var LP2X = 4;
	  var LP2Y = 5;
	  var D = 6;
	
	  this.error = function () {
	    var x0 = params[TX].get(),
	        x1 = params[LP1X].get(),
	        x2 = params[LP2X].get();
	    var y0 = params[TY].get(),
	        y1 = params[LP1Y].get(),
	        y2 = params[LP2Y].get();
	    var dist = this.params[D].get();
	    var dx = x2 - x1;
	    var dy = y2 - y1;
	    var d = Math.sqrt(dx * dx + dy * dy);
	    if (d == 0) {
	      return 0;
	    }
	    var A = -x0 * dy + y0 * dx + x1 * y2 - x2 * y1;
	    return Math.abs(A) / d - dist;
	  };
	
	  this.gradient = function (out) {
	    var x0 = params[TX].get(),
	        x1 = params[LP1X].get(),
	        x2 = params[LP2X].get();
	    var y0 = params[TY].get(),
	        y1 = params[LP1Y].get(),
	        y2 = params[LP2Y].get();
	    var dx = x2 - x1;
	    var dy = y2 - y1;
	    var d2 = dx * dx + dy * dy;
	    var d = Math.sqrt(d2);
	    var d3 = d * d2;
	    //    var AA = -x0 * (y2 - y1) + y0 * (x2 - x1) + x1 * y2 - x2 * y1;
	    var A = -x0 * dy + y0 * dx + x1 * y2 - x2 * y1;
	    var AM = Math.abs(A);
	    var j = A < 0 ? -1 : 1;
	
	    out[TX] = j * (y1 - y2) / d;
	    out[TY] = j * (x2 - x1) / d;
	
	    out[LP1X] = j * (y2 - y0) / d + AM * dx / d3;
	    out[LP1Y] = j * (x0 - x2) / d + AM * dy / d3;
	    out[LP2X] = j * (y0 - y1) / d - AM * dx / d3;
	    out[LP2Y] = j * (x1 - x0) / d - AM * dy / d3;
	    out[D] = -1;
	
	    _fixNaN(out);
	  };
	}
	/** @constructor */
	function P2PDistance(params, distance) {
	
	  this.params = params;
	  this.distance = distance;
	
	  var p1x = 0;
	  var p1y = 1;
	  var p2x = 2;
	  var p2y = 3;
	
	  this.error = function () {
	    var dx = params[p1x].get() - params[p2x].get();
	    var dy = params[p1y].get() - params[p2y].get();
	    var d = Math.sqrt(dx * dx + dy * dy);
	    return d - this.distance;
	  };
	
	  this.gradient = function (out) {
	    var dx = params[p1x].get() - params[p2x].get();
	    var dy = params[p1y].get() - params[p2y].get();
	    var d = Math.sqrt(dx * dx + dy * dy);
	    if (d == 0) {
	      if (this.distance == 0) return;
	      d = 0.000001;
	    }
	    out[p1x] = dx / d;
	    out[p1y] = dy / d;
	    out[p2x] = -dx / d;
	    out[p2y] = -dy / d;
	  };
	}
	
	/** @constructor */
	function P2PDistanceV(params) {
	
	  this.params = params;
	
	  var p1x = 0;
	  var p1y = 1;
	  var p2x = 2;
	  var p2y = 3;
	  var D = 4;
	
	  this.error = function () {
	    var dx = params[p1x].get() - params[p2x].get();
	    var dy = params[p1y].get() - params[p2y].get();
	    var d = Math.sqrt(dx * dx + dy * dy);
	    return d - params[D].get();
	  };
	
	  this.gradient = function (out) {
	    var dx = params[p1x].get() - params[p2x].get();
	    var dy = params[p1y].get() - params[p2y].get();
	    var d = Math.sqrt(dx * dx + dy * dy);
	    if (d == 0) {
	      if (params[D].get() == 0) return;
	      d = 0.000001;
	    }
	    out[p1x] = dx / d;
	    out[p1y] = dy / d;
	    out[p2x] = -dx / d;
	    out[p2y] = -dy / d;
	    out[D] = -1;
	  };
	}
	
	/** @constructor */
	function Parallel(params) {
	
	  this.params = params;
	
	  var l1p1x = 0;
	  var l1p1y = 1;
	  var l1p2x = 2;
	  var l1p2y = 3;
	  var l2p1x = 4;
	  var l2p1y = 5;
	  var l2p2x = 6;
	  var l2p2y = 7;
	
	  this.error = function () {
	    var dx1 = params[l1p1x].get() - params[l1p2x].get();
	    var dy1 = params[l1p1y].get() - params[l1p2y].get();
	    var dx2 = params[l2p1x].get() - params[l2p2x].get();
	    var dy2 = params[l2p1y].get() - params[l2p2y].get();
	    return dx1 * dy2 - dy1 * dx2;
	  };
	
	  this.gradient = function (out) {
	    out[l1p1x] = params[l2p1y].get() - params[l2p2y].get();
	    out[l1p2x] = -(params[l2p1y].get() - params[l2p2y].get());
	    out[l1p1y] = -(params[l2p1x].get() - params[l2p2x].get());
	    out[l1p2y] = params[l2p1x].get() - params[l2p2x].get();
	    out[l2p1x] = -(params[l1p1y].get() - params[l1p2y].get());
	    out[l2p2x] = params[l1p1y].get() - params[l1p2y].get();
	    out[l2p1y] = params[l1p1x].get() - params[l1p2x].get();
	    out[l2p2y] = -(params[l1p1x].get() - params[l1p2x].get());
	  };
	}
	
	/** @constructor */
	function Perpendicular(params) {
	
	  this.params = params;
	
	  var l1p1x = 0;
	  var l1p1y = 1;
	  var l1p2x = 2;
	  var l1p2y = 3;
	  var l2p1x = 4;
	  var l2p1y = 5;
	  var l2p2x = 6;
	  var l2p2y = 7;
	
	  this.error = function () {
	    var dx1 = params[l1p1x].get() - params[l1p2x].get();
	    var dy1 = params[l1p1y].get() - params[l1p2y].get();
	    var dx2 = params[l2p1x].get() - params[l2p2x].get();
	    var dy2 = params[l2p1y].get() - params[l2p2y].get();
	    //dot product shows how the lines off to be perpendicular
	    return dx1 * dx2 + dy1 * dy2;
	  };
	
	  this.gradient = function (out) {
	    out[l1p1x] = params[l2p1x].get() - params[l2p2x].get();
	    out[l1p2x] = -(params[l2p1x].get() - params[l2p2x].get());
	    out[l1p1y] = params[l2p1y].get() - params[l2p2y].get();
	    out[l1p2y] = -(params[l2p1y].get() - params[l2p2y].get());
	    out[l2p1x] = params[l1p1x].get() - params[l1p2x].get();
	    out[l2p2x] = -(params[l1p1x].get() - params[l1p2x].get());
	    out[l2p1y] = params[l1p1y].get() - params[l1p2y].get();
	    out[l2p2y] = -(params[l1p1y].get() - params[l1p2y].get());
	  };
	}
	
	/** @constructor */
	function Angle(params) {
	
	  this.params = params;
	
	  var l1p1x = 0;
	  var l1p1y = 1;
	  var l1p2x = 2;
	  var l1p2y = 3;
	  var l2p1x = 4;
	  var l2p1y = 5;
	  var l2p2x = 6;
	  var l2p2y = 7;
	  var angle = 8;
	  var scale = 1000; // we need scale to get same order of measure units(radians are to small)
	
	  function p(ref) {
	    return params[ref].get();
	  }
	
	  this.error = function () {
	    var dx1 = p(l1p2x) - p(l1p1x);
	    var dy1 = p(l1p2y) - p(l1p1y);
	    var dx2 = p(l2p2x) - p(l2p1x);
	    var dy2 = p(l2p2y) - p(l2p1y);
	    var a = Math.atan2(dy1, dx1) + p(angle);
	    var ca = Math.cos(a);
	    var sa = Math.sin(a);
	    var x2 = dx2 * ca + dy2 * sa;
	    var y2 = -dx2 * sa + dy2 * ca;
	    return Math.atan2(y2, x2) * scale;
	  };
	
	  this.gradient = function (out) {
	    var dx1 = p(l1p2x) - p(l1p1x);
	    var dy1 = p(l1p2y) - p(l1p1y);
	    var r2 = dx1 * dx1 + dy1 * dy1;
	    out[l1p1x] = -dy1 / r2;
	    out[l1p1y] = dx1 / r2;
	    out[l1p2x] = dy1 / r2;
	    out[l1p2y] = -dx1 / r2;
	    dx1 = p(l1p2x) - p(l1p1x);
	    dy1 = p(l1p2y) - p(l1p1y);
	    var dx2 = p(l2p2x) - p(l2p1x);
	    var dy2 = p(l2p2y) - p(l2p1y);
	    var a = Math.atan2(dy1, dx1) + p(angle);
	    var ca = Math.cos(a);
	    var sa = Math.sin(a);
	    var x2 = dx2 * ca + dy2 * sa;
	    var y2 = -dx2 * sa + dy2 * ca;
	    r2 = dx2 * dx2 + dy2 * dy2;
	    dx2 = -y2 / r2;
	    dy2 = x2 / r2;
	    out[l2p1x] = -ca * dx2 + sa * dy2;
	    out[l2p1y] = -sa * dx2 - ca * dy2;
	    out[l2p2x] = ca * dx2 - sa * dy2;
	    out[l2p2y] = sa * dx2 + ca * dy2;
	    out[angle] = -1;
	    rescale(out, scale);
	  };
	}
	
	/** @constructor */
	function PointOnEllipse(params) {
	
	  this.params = params;
	
	  var PX = 0;
	  var PY = 1;
	  var EP1X = 2;
	  var EP1Y = 3;
	  var EP2X = 4;
	  var EP2Y = 5;
	  var R = 6;
	
	  this.error = function () {
	    var px = params[PX].get();
	    var py = params[PY].get();
	    var ep1x = params[EP1X].get();
	    var ep1y = params[EP1Y].get();
	    var ep2x = params[EP2X].get();
	    var ep2y = params[EP2Y].get();
	    var radiusY = params[R].get();
	
	    var centerX = ep1x + (ep2x - ep1x) * 0.5;
	    var centerY = ep1y + (ep2y - ep1y) * 0.5;
	    var rotation = Math.atan2(ep2y - ep1y, ep2x - ep1x);
	
	    var x = px - centerX;
	    var y = py - centerY;
	
	    var polarAngle = Math.atan2(y, x) - rotation;
	    var polarRadius = Math.sqrt(x * x + y * y);
	    var radiusX = Math.sqrt(sq(ep1x - ep2x) + sq(ep1y - ep2y)) * 0.5;
	
	    var L = Math.sqrt(1 / (sq(Math.cos(polarAngle) / radiusX) + sq(Math.sin(polarAngle) / radiusY)));
	    return L - polarRadius;
	  };
	
	  this.gradient = NumericGradient;
	}
	
	/** @constructor */
	function EllipseTangent(params) {
	
	  this.params = params;
	
	  var P1X = 0;
	  var P1Y = 1;
	  var P2X = 2;
	  var P2Y = 3;
	  var EP1X = 4;
	  var EP1Y = 5;
	  var EP2X = 6;
	  var EP2Y = 7;
	  var R = 8;
	
	  this.error = function (gr) {
	    var p1x = params[P1X].get();
	    var p1y = params[P1Y].get();
	    var p2x = params[P2X].get();
	    var p2y = params[P2Y].get();
	
	    var ep1x = params[EP1X].get();
	    var ep1y = params[EP1Y].get();
	    var ep2x = params[EP2X].get();
	    var ep2y = params[EP2Y].get();
	
	    var radiusY = params[R].get();
	
	    var axisX = ep2x - ep1x;
	    var axisY = ep2y - ep1y;
	    var radiusX = Math.sqrt(sq(axisX) + sq(axisY)) * 0.5;
	    var scaleToCircleSpace = radiusY / radiusX;
	    var rotation = -Math.atan2(axisY, axisX);
	    function tr(x, y) {
	      var xx = x * Math.cos(rotation) - y * Math.sin(rotation);
	      var yy = x * Math.sin(rotation) + y * Math.cos(rotation);
	      xx *= scaleToCircleSpace;
	      return { x: xx, y: yy };
	    }
	
	    var axis = tr(axisX, axisY);
	    var p1 = tr(p1x, p1y);
	    var p2 = tr(p2x, p2y);
	    var ep1 = tr(ep1x, ep1y);
	
	    var centerX = ep1.x + axis.x * 0.5;
	    var centerY = ep1.y + axis.y * 0.5;
	
	    var normalX = -(p2.y - p1.y);
	    var normalY = p2.x - p1.x;
	
	    var normalD = Math.sqrt(sq(normalX) + sq(normalY));
	    normalX /= normalD;
	    normalY /= normalD;
	
	    //this length of normal of line to center 
	    var perpendicularLength = (centerX - p1.x) * normalX + (centerY - p1.y) * normalY;
	
	    if (perpendicularLength < 0) {
	      perpendicularLength *= -1;
	    } else {}
	
	    return radiusY - perpendicularLength; //*1000;
	  };
	
	  this.gradient = NumericGradient;
	}
	
	function GreaterThan(params, limit) {
	
	  this.params = params;
	
	  this.error = function () {
	    var value = this.params[0].get();
	    var error = value <= limit ? limit - value : 0;
	    console.log("GreaterThan: " + error + ", value: " + value);
	    return error;
	  };
	
	  this.gradient = function (out) {
	    out[0] = -1;
	  };
	}
	
	function NumericGradient(out) {
	  var _this = this;
	
	  var h = 1;
	  var approx = function approx(param) {
	    var fx = _this.error();
	    _this.params[param].set(_this.params[param].get() + h);
	    var fhx = _this.error();
	    _this.params[param].set(_this.params[param].get() - h);
	    return (fhx - fx) / h;
	  };
	
	  for (var i = 0; i < out.length; i++) {
	    out[i] = approx(i);
	  }
	}
	
	function _fixNaN(grad) {
	  for (var i = 0; i < grad.length; i++) {
	    if (isNaN(grad[i])) {
	      grad[i] = 0;
	    }
	  }
	}
	
	function rescale(grad, factor) {
	  for (var i = 0; i < grad.length; i++) {
	    grad[i] *= factor;
	  }
	}
	
	var sq = function sq(x) {
	  return x * x;
	};
	
	exports.createByConstraintName = createByConstraintName;
	exports.EqualsTo = EqualsTo;
	exports.ConstantWrapper = ConstantWrapper;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.optim = exports.dog_leg = undefined;
	
	var _numeric = __webpack_require__(95);
	
	var _numeric2 = _interopRequireDefault(_numeric);
	
	var _math = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//Added strong wolfe condition to numeric's uncmin
	var bfgs_ = function bfgs_(f, x0, tol, gradient, maxit, callback, options) {
	  var grad = _numeric2.default.gradient;
	  if (typeof options === "undefined") {
	    options = {};
	  }
	  if (typeof tol === "undefined") {
	    tol = 1e-8;
	  }
	  if (typeof gradient === "undefined") {
	    gradient = function gradient(x) {
	      return grad(f, x);
	    };
	  }
	  if (typeof maxit === "undefined") maxit = 1000;
	  x0 = _numeric2.default.clone(x0);
	  var n = x0.length;
	  var f0 = f(x0),
	      f1,
	      df0;
	  if (isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
	  var max = Math.max,
	      norm2 = _numeric2.default.norm2;
	  tol = max(tol, _numeric2.default.epsilon);
	  var step,
	      g0,
	      g1,
	      H1 = options.Hinv || _numeric2.default.identity(n);
	  var dot = _numeric2.default.dot,
	      inv = _numeric2.default.inv,
	      sub = _numeric2.default.sub,
	      add = _numeric2.default.add,
	      ten = _numeric2.default.tensor,
	      div = _numeric2.default.div,
	      mul = _numeric2.default.mul;
	  var all = _numeric2.default.all,
	      isfinite = _numeric2.default.isFinite,
	      neg = _numeric2.default.neg;
	  var it = 0,
	      i,
	      s,
	      x1,
	      y,
	      Hy,
	      Hs,
	      ys,
	      i0,
	      t,
	      nstep,
	      t1,
	      t2;
	  var msg = "";
	  g0 = gradient(x0);
	  while (it < maxit) {
	    if (typeof callback === "function") {
	      if (callback(it, x0, f0, g0, H1)) {
	        msg = "Callback returned true";break;
	      }
	    }
	    if (!all(isfinite(g0))) {
	      msg = "Gradient has Infinity or NaN";break;
	    }
	    step = neg(dot(H1, g0));
	    if (!all(isfinite(step))) {
	      msg = "Search direction has Infinity or NaN";break;
	    }
	    nstep = norm2(step);
	    if (nstep < tol) {
	      msg = "Newton step smaller than tol";break;
	    }
	    t = 1;
	    df0 = dot(g0, step);
	    // line search
	    x1 = x0;
	    var tL = 0;
	    var tR = 100;
	    while (it < maxit) {
	      if (t * nstep < tol) {
	        break;
	      }
	      s = mul(step, t);
	      x1 = add(x0, s);
	      f1 = f(x1);
	      //Nocadel, 3.7(a,b)
	      if (f1 - f0 >= 0.1 * t * df0 || isNaN(f1)) {
	        tR = t;
	        t = (tL + tR) * 0.5;
	        ++it;
	      } else {
	        var slope = dot(gradient(x1), step);
	        if (slope <= 0.9 * Math.abs(df0)) {
	          break;
	        } else if (slope >= 0.9 * df0) {
	          tR = t;
	          t = (tL + tR) * 0.5;
	        } else {
	          tL = t;
	          t = (tL + tR) * 0.5;
	        }
	      }
	    }
	    if (t * nstep < tol) {
	      msg = "Line search step size smaller than tol";break;
	    }
	    if (it === maxit) {
	      msg = "maxit reached during line search";break;
	    }
	    g1 = gradient(x1);
	    y = sub(g1, g0);
	    ys = dot(y, s);
	    Hy = dot(H1, y);
	
	    // BFGS update on H1
	    H1 = sub(add(H1, mul((ys + dot(y, Hy)) / (ys * ys), ten(s, s))), div(add(ten(Hy, s), ten(s, Hy)), ys));
	    x0 = x1;
	    f0 = f1;
	    g0 = g1;
	    ++it;
	  }
	  return { solution: x0, f: f0, gradient: g0, invHessian: H1, iterations: it, message: msg };
	};
	
	var bfgs = function bfgs(f, x0, tol, gradient, maxit, callback, options) {
	  var grad = _numeric2.default.gradient;
	  if (typeof options === "undefined") {
	    options = {};
	  }
	  if (typeof tol === "undefined") {
	    tol = 1e-8;
	  }
	  if (typeof gradient === "undefined") {
	    gradient = function gradient(x) {
	      return grad(f, x);
	    };
	  }
	  if (typeof maxit === "undefined") maxit = 1000;
	  x0 = _numeric2.default.clone(x0);
	  var n = x0.length;
	  var f0 = f(x0),
	      f1,
	      df0;
	  if (isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
	  var max = Math.max,
	      norm2 = _numeric2.default.norm2;
	  tol = max(tol, _numeric2.default.epsilon);
	  var step,
	      g0,
	      g1,
	      H1 = options.Hinv || _numeric2.default.identity(n);
	  var dot = _numeric2.default.dot,
	      inv = _numeric2.default.inv,
	      sub = _numeric2.default.sub,
	      add = _numeric2.default.add,
	      ten = _numeric2.default.tensor,
	      div = _numeric2.default.div,
	      mul = _numeric2.default.mul;
	  var all = _numeric2.default.all,
	      isfinite = _numeric2.default.isFinite,
	      neg = _numeric2.default.neg;
	  var it = 0,
	      i,
	      s,
	      x1,
	      y,
	      Hy,
	      Hs,
	      ys,
	      i0,
	      t,
	      nstep,
	      t1,
	      t2;
	  var msg = "";
	  g0 = gradient(x0);
	  while (it < maxit) {
	    if (typeof callback === "function") {
	      if (callback(it, x0, f0, g0, H1)) {
	        msg = "Callback returned true";break;
	      }
	    }
	    if (!all(isfinite(g0))) {
	      msg = "Gradient has Infinity or NaN";break;
	    }
	    step = neg(dot(H1, g0));
	    if (!all(isfinite(step))) {
	      msg = "Search direction has Infinity or NaN";break;
	    }
	    nstep = norm2(step);
	    if (nstep < tol) {
	      msg = "Newton step smaller than tol";break;
	    }
	
	    df0 = dot(g0, step);
	    // line search
	    t1 = 0.0;
	    f1 = f0;
	
	    t2 = 1.0;
	    s = mul(step, t2);
	    x1 = add(x0, s);
	    var f2 = f(x1);
	
	    var t3 = 2.0;
	    s = mul(step, t3);
	    x1 = add(x0, s);
	    var f3 = f(x1);
	    var tMax = 1e23;
	
	    while ((f2 > f1 || f2 > f3) && it < maxit) {
	      if (t * nstep < tol) {
	        break;
	      }
	      if (f2 > f1) {
	        //If f2 is greater than f1 then we shorten alpha2 and alpha3 closer to f1
	        //Effectively both are shortened by a factor of two.
	        t3 = t2;
	        f3 = f2;
	        t2 = t2 / 2;
	
	        s = mul(step, t2);
	        x1 = add(x0, s);
	        f2 = f(x1);
	      } else if (f2 > f3) {
	        if (t3 >= tMax) break;
	        //If f2 is greater than f3 then we increase alpha2 and alpha3 away from f1
	        //Effectively both are lengthened by a factor of two.
	        t2 = t3;
	        f2 = f3;
	        t3 = t3 * 2;
	
	        s = mul(step, t3);
	        x1 = add(x0, s);
	        f3 = f(x1);
	      }
	      it++;
	    }
	
	    //Get the alpha for the minimum f of the quadratic approximation
	    var ts = t2 + (t2 - t1) * (f1 - f3) / (3 * (f1 - 2 * f2 + f3));
	
	    //Guarantee that the new alphaStar is within the bracket
	    if (ts >= t3 || ts <= t1) ts = t2;
	
	    if (ts > tMax) ts = tMax;
	
	    if (ts != ts) ts = 0.;
	
	    //Take a final step to alphaStar
	    s = mul(step, ts);
	    x1 = add(x0, s);
	    f1 = f(x1);
	
	    if (t * nstep < tol) {
	      msg = "Line search step size smaller than tol";break;
	    }
	    if (it === maxit) {
	      msg = "maxit reached during line search";break;
	    }
	    g1 = gradient(x1);
	    y = sub(g1, g0);
	    ys = dot(y, s);
	    Hy = dot(H1, y);
	
	    // BFGS update on H1
	    H1 = sub(add(H1, mul((ys + dot(y, Hy)) / (ys * ys), ten(s, s))), div(add(ten(Hy, s), ten(s, Hy)), ys));
	    x0 = x1;
	    f0 = f1;
	    g0 = g1;
	    ++it;
	  }
	  return { solution: x0, f: f0, gradient: g0, invHessian: H1, iterations: it, message: msg };
	};
	
	var bfgs_updater = function bfgs_updater(gradient, x0) {
	  var n = x0.length;
	  var max = Math.max,
	      norm2 = _numeric2.default.norm2;
	  var g0,
	      g1,
	      H1 = _numeric2.default.identity(n);
	  var dot = _numeric2.default.dot,
	      inv = _numeric2.default.inv,
	      sub = _numeric2.default.sub,
	      add = _numeric2.default.add,
	      ten = _numeric2.default.tensor,
	      div = _numeric2.default.div,
	      mul = _numeric2.default.mul;
	  var all = _numeric2.default.all,
	      isfinite = _numeric2.default.isFinite,
	      neg = _numeric2.default.neg;
	  var y, Hy, Hs, ys;
	  var msg = "";
	  g0 = gradient(x0);
	
	  function step() {
	    return neg(dot(H1, g0));
	  }
	
	  function update(x, real_step) {
	    var s = real_step;
	
	    g1 = gradient(x);
	    y = sub(g1, g0);
	    ys = dot(y, s);
	    Hy = dot(H1, y);
	
	    // BFGS update on H1
	    H1 = sub(add(H1, mul((ys + dot(y, Hy)) / (ys * ys), ten(s, s))), div(add(ten(Hy, s), ten(s, Hy)), ys));
	    g0 = g1;
	  }
	  return { step: step, update: update };
	};
	
	var inv = function inv(A) {
	  A = _numeric2.default.clone(A);
	  var s = _numeric2.default.dim(A),
	      abs = Math.abs,
	      m = s[0],
	      n = s[1];
	  var Ai, Aj;
	  var I = _numeric2.default.identity(m),
	      Ii,
	      Ij;
	  var i, j, k, x;
	  for (j = 0; j < n; ++j) {
	    var i0 = -1;
	    var v0 = -1;
	    for (i = j; i !== m; ++i) {
	      k = abs(A[i][j]);if (k > v0) {
	        i0 = i;v0 = k;
	      }
	    }
	    Aj = A[i0];A[i0] = A[j];A[j] = Aj;
	    Ij = I[i0];I[i0] = I[j];I[j] = Ij;
	    x = Aj[j];
	    if (x === 0) {
	      console.log("CAN' INVERSE MATRIX");
	      x = 1e-32;
	    }
	    for (k = j; k !== n; ++k) {
	      Aj[k] /= x;
	    }for (k = n - 1; k !== -1; --k) {
	      Ij[k] /= x;
	    }for (i = m - 1; i !== -1; --i) {
	      if (i !== j) {
	        Ai = A[i];
	        Ii = I[i];
	        x = Ai[j];
	        for (k = j + 1; k !== n; ++k) {
	          Ai[k] -= Aj[k] * x;
	        }for (k = n - 1; k > 0; --k) {
	          Ii[k] -= Ij[k] * x;--k;Ii[k] -= Ij[k] * x;
	        }
	        if (k === 0) Ii[0] -= Ij[0] * x;
	      }
	    }
	  }
	  return I;
	};
	
	var _result = function _result(evalCount, error, returnCode) {
	  this.evalCount = evalCount;
	  this.error = error;
	  this.returnCode = returnCode;
	};
	
	var dog_leg = function dog_leg(subsys, rough) {
	  //rough = true
	  //var tolg = rough ? 1e-3 : 1e-4;
	  var tolg, tolf;
	  if (rough) {
	    tolg = 1e-3;
	    tolf = 1e-3;
	  } else {
	    tolg = 1e-6;
	    tolf = 1e-6;
	  }
	
	  var tolx = 1e-80;
	
	  var xsize = subsys.params.length;
	  var csize = subsys.constraints.length;
	
	  if (xsize == 0) {
	    return new _result(0, 0, 1);
	  }
	
	  var vec = _math._vec;
	  var mx = _math._matrix;
	
	  var n = _numeric2.default;
	
	  var x = vec(xsize);
	  var x_new = vec(xsize);
	
	  var fx = vec(csize);
	  var fx_new = vec(csize);
	
	  var J = mx(csize, xsize);
	  var J_new = mx(csize, xsize);
	  var gn_step = vec(xsize);
	  var dl_step = vec(xsize);
	
	  subsys.fillParams(x);
	  var err = subsys.calcResidual(fx);
	  subsys.fillJacobian(J);
	
	  function lsolve_slow(A, b) {
	    var At = n.transpose(A);
	    var res = n.dot(n.dot(At, inv(n.dot(A, At))), b);
	    return res;
	  }
	
	  function lsolve(A, b) {
	    if (csize < xsize) {
	      var At = n.transpose(A);
	      var sol = n.solve(n.dot(A, At), b, true);
	      return n.dot(At, sol);
	    } else {
	      return n.solve(A, b, false);
	    }
	  }
	
	  var g = n.dot(n.transpose(J), fx);
	  var g_inf = n.norminf(g);
	  var fx_inf = n.norminf(fx);
	
	  var iterLimit = 100;
	  var divergenceLimit = 1e6 * (err + 1e6);
	
	  var delta = 10;
	  var alpha = 0.;
	  var iter = 0,
	      returnCode = 0;
	  //var log = [];
	
	  var SUCCESS = 1,
	      ITER_LIMIT = 2,
	      SMALL_DELTA = 3,
	      SMALL_STEP = 4,
	      DIVERGENCE = 5,
	      INVALID_STATE = 6;
	
	  while (returnCode === 0) {
	    optim.DEBUG_HANDLER(iter, err);
	
	    if (fx_inf <= tolf) {
	      returnCode = SUCCESS;
	    } else if (g_inf <= tolg) {
	      returnCode = SUCCESS;
	    } else if (iter >= iterLimit) {
	      returnCode = ITER_LIMIT;
	    } else if (delta <= tolx * (tolx + n.norm2(x))) {
	      returnCode = SMALL_DELTA;
	    } else if (err > divergenceLimit) {
	      returnCode = DIVERGENCE;
	    } else if (isNaN(err)) {
	      returnCode = INVALID_STATE;
	    }
	
	    if (returnCode != 0) {
	      break;
	    }
	
	    // get the gauss-newton step
	    //gn_step = n.solve(J, n.mul(fx, -1));
	    gn_step = lsolve(J, n.mul(fx, -1));
	
	    //LU-Decomposition
	    //gn_step = lusolve(J, n.mul(fx, -1));
	
	    //Conjugate gradient method
	    //gn_step = cg(J, gn_step, n.mul(fx, -1), 1e-8, iterLimit);
	
	    //solve linear problem using svd formula to get the gauss-newton step
	    //gn_step = lls(J, n.mul(fx, -1));
	
	    var hitBoundary = false;
	
	    var gnorm = n.norm2(g);
	    var gnNorm = n.norm2(gn_step);
	    if (gnNorm < delta) {
	      dl_step = gn_step;
	    } else {
	      var Jt = n.transpose(J);
	      var B = n.dot(Jt, J);
	      var gBg = n.dot(g, n.dot(B, g));
	      alpha = n.norm2Squared(g) / gBg;
	      if (alpha * gnorm >= delta) {
	        dl_step = n.mul(g, -delta / gnorm);
	        hitBoundary = true;
	      } else {
	        var sd_step = n.mul(g, -alpha);
	        if (isNaN(gnNorm)) {
	          dl_step = sd_step;
	        } else {
	
	          var d = n.sub(gn_step, sd_step);
	
	          var a = n.dot(d, d);
	          var b = 2 * n.dot(sd_step, d);
	          var c = n.dot(sd_step, sd_step) - delta * delta;
	
	          var sqrt_discriminant = Math.sqrt(b * b - 4 * a * c);
	
	          var beta = (-b + sqrt_discriminant) / (2 * a);
	
	          dl_step = n.add(sd_step, n.mul(beta, d));
	          hitBoundary = true;
	        }
	      }
	    }
	
	    var dl_norm = n.norm2(dl_step);
	
	    //    if (dl_norm <= tolx) {
	    //      returnCode = SMALL_STEP;
	    //      break;
	    //    }
	
	    x_new = n.add(x, dl_step);
	    subsys.setParams(x_new);
	    var err_new = subsys.calcResidual(fx_new);
	    subsys.fillJacobian(J_new);
	
	    var fxNormSq = n.norm2Squared(fx);
	    var dF = fxNormSq - n.norm2Squared(fx_new);
	    var dL = fxNormSq - n.norm2Squared(n.add(fx, n.dot(J, dl_step)));
	
	    var acceptCandidate;
	
	    if (dF == 0 || dL == 0) {
	      acceptCandidate = true;
	    } else {
	      var rho = dF / dL;
	      if (rho < 0.25) {
	        // if the model is a poor predictor reduce the size of the trust region
	        delta = 0.25 * dl_norm;
	        //delta *= 0.5;
	      } else {
	        // only increase the size of the trust region if it is taking a step of maximum size
	        // otherwise just assume it's doing good enough job
	        if (rho > 0.75 && hitBoundary) {
	          //delta = Math.max(delta,3*dl_norm);
	          delta *= 2;
	        }
	      }
	      acceptCandidate = rho > 0; // could be 0 .. 0.25
	    }
	    //log.push([stepKind,err,  delta,rho]);
	
	    if (acceptCandidate) {
	      x = n.clone(x_new);
	      J = n.clone(J_new);
	      fx = n.clone(fx_new);
	      err = err_new;
	
	      g = n.dot(n.transpose(J), fx);
	
	      // get infinity norms
	      g_inf = n.norminf(g);
	      fx_inf = n.norminf(fx);
	    }
	
	    iter++;
	  }
	  //log.push(returnCode);
	  //window.___log(log);
	  return new _result(iter, err, returnCode);
	};
	
	var cg = function cg(A, x, b, tol, maxIt) {
	
	  var _ = _numeric2.default;
	
	  var tr = _.transpose;
	  var At = tr(A);
	  if (A.length != A[0].length) {
	    A = _.dot(At, A);
	    b = _.dot(At, b);
	  }
	
	  var r = _.sub(_.dot(A, x), b);
	  var p = _.mul(r, -1);
	  var rr = _.dotVV(r, r);
	
	  var a;
	  var _rr;
	  var beta;
	
	  for (var i = 0; i < maxIt; ++i) {
	    if (_.norm2(r) <= tol) break;
	    var Axp = _.dot(A, p);
	    a = rr / _.dotVV(Axp, p);
	    x = _.add(x, _.mul(p, a));
	    r = _.add(r, _.mul(Axp, a));
	    _rr = rr;
	    rr = _.dotVV(r, r);
	    beta = rr / _rr;
	    p = _.add(_.mul(r, -1), _.mul(p, beta));
	  }
	  //  console.log("liner problem solved in " + i);
	  return x;
	};
	
	var optim = { DEBUG_HANDLER: function DEBUG_HANDLER() {} }; //backward compatibility
	
	exports.dog_leg = dog_leg;
	exports.optim = optim;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	var numeric = ( false)?(function numeric() {}):(exports);
	if(typeof global !== "undefined") { global.numeric = numeric; }
	
	numeric.version = "1.2.6";
	
	// 1. Utility functions
	numeric.bench = function bench (f,interval) {
	    var t1,t2,n,i;
	    if(typeof interval === "undefined") { interval = 15; }
	    n = 0.5;
	    t1 = new Date();
	    while(1) {
	        n*=2;
	        for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
	        while(i>0) { f(); i--; }
	        t2 = new Date();
	        if(t2-t1 > interval) break;
	    }
	    for(i=n;i>3;i-=4) { f(); f(); f(); f(); }
	    while(i>0) { f(); i--; }
	    t2 = new Date();
	    return 1000*(3*n-1)/(t2-t1);
	}
	
	numeric._myIndexOf = (function _myIndexOf(w) {
	    var n = this.length,k;
	    for(k=0;k<n;++k) if(this[k]===w) return k;
	    return -1;
	});
	numeric.myIndexOf = (Array.prototype.indexOf)?Array.prototype.indexOf:numeric._myIndexOf;
	
	numeric.Function = Function;
	numeric.precision = 4;
	numeric.largeArray = 50;
	
	numeric.prettyPrint = function prettyPrint(x) {
	    function fmtnum(x) {
	        if(x === 0) { return '0'; }
	        if(isNaN(x)) { return 'NaN'; }
	        if(x<0) { return '-'+fmtnum(-x); }
	        if(isFinite(x)) {
	            var scale = Math.floor(Math.log(x) / Math.log(10));
	            var normalized = x / Math.pow(10,scale);
	            var basic = normalized.toPrecision(numeric.precision);
	            if(parseFloat(basic) === 10) { scale++; normalized = 1; basic = normalized.toPrecision(numeric.precision); }
	            return parseFloat(basic).toString()+'e'+scale.toString();
	        }
	        return 'Infinity';
	    }
	    var ret = [];
	    function foo(x) {
	        var k;
	        if(typeof x === "undefined") { ret.push(Array(numeric.precision+8).join(' ')); return false; }
	        if(typeof x === "string") { ret.push('"'+x+'"'); return false; }
	        if(typeof x === "boolean") { ret.push(x.toString()); return false; }
	        if(typeof x === "number") {
	            var a = fmtnum(x);
	            var b = x.toPrecision(numeric.precision);
	            var c = parseFloat(x.toString()).toString();
	            var d = [a,b,c,parseFloat(b).toString(),parseFloat(c).toString()];
	            for(k=1;k<d.length;k++) { if(d[k].length < a.length) a = d[k]; }
	            ret.push(Array(numeric.precision+8-a.length).join(' ')+a);
	            return false;
	        }
	        if(x === null) { ret.push("null"); return false; }
	        if(typeof x === "function") { 
	            ret.push(x.toString());
	            var flag = false;
	            for(k in x) { if(x.hasOwnProperty(k)) { 
	                if(flag) ret.push(',\n');
	                else ret.push('\n{');
	                flag = true; 
	                ret.push(k); 
	                ret.push(': \n'); 
	                foo(x[k]); 
	            } }
	            if(flag) ret.push('}\n');
	            return true;
	        }
	        if(x instanceof Array) {
	            if(x.length > numeric.largeArray) { ret.push('...Large Array...'); return true; }
	            var flag = false;
	            ret.push('[');
	            for(k=0;k<x.length;k++) { if(k>0) { ret.push(','); if(flag) ret.push('\n '); } flag = foo(x[k]); }
	            ret.push(']');
	            return true;
	        }
	        ret.push('{');
	        var flag = false;
	        for(k in x) { if(x.hasOwnProperty(k)) { if(flag) ret.push(',\n'); flag = true; ret.push(k); ret.push(': \n'); foo(x[k]); } }
	        ret.push('}');
	        return true;
	    }
	    foo(x);
	    return ret.join('');
	}
	
	numeric.parseDate = function parseDate(d) {
	    function foo(d) {
	        if(typeof d === 'string') { return Date.parse(d.replace(/-/g,'/')); }
	        if(!(d instanceof Array)) { throw new Error("parseDate: parameter must be arrays of strings"); }
	        var ret = [],k;
	        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
	        return ret;
	    }
	    return foo(d);
	}
	
	numeric.parseFloat = function parseFloat_(d) {
	    function foo(d) {
	        if(typeof d === 'string') { return parseFloat(d); }
	        if(!(d instanceof Array)) { throw new Error("parseFloat: parameter must be arrays of strings"); }
	        var ret = [],k;
	        for(k=0;k<d.length;k++) { ret[k] = foo(d[k]); }
	        return ret;
	    }
	    return foo(d);
	}
	
	numeric.parseCSV = function parseCSV(t) {
	    var foo = t.split('\n');
	    var j,k;
	    var ret = [];
	    var pat = /(([^'",]*)|('[^']*')|("[^"]*")),/g;
	    var patnum = /^\s*(([+-]?[0-9]+(\.[0-9]*)?(e[+-]?[0-9]+)?)|([+-]?[0-9]*(\.[0-9]+)?(e[+-]?[0-9]+)?))\s*$/;
	    var stripper = function(n) { return n.substr(0,n.length-1); }
	    var count = 0;
	    for(k=0;k<foo.length;k++) {
	      var bar = (foo[k]+",").match(pat),baz;
	      if(bar.length>0) {
	          ret[count] = [];
	          for(j=0;j<bar.length;j++) {
	              baz = stripper(bar[j]);
	              if(patnum.test(baz)) { ret[count][j] = parseFloat(baz); }
	              else ret[count][j] = baz;
	          }
	          count++;
	      }
	    }
	    return ret;
	}
	
	numeric.toCSV = function toCSV(A) {
	    var s = numeric.dim(A);
	    var i,j,m,n,row,ret;
	    m = s[0];
	    n = s[1];
	    ret = [];
	    for(i=0;i<m;i++) {
	        row = [];
	        for(j=0;j<m;j++) { row[j] = A[i][j].toString(); }
	        ret[i] = row.join(', ');
	    }
	    return ret.join('\n')+'\n';
	}
	
	numeric.getURL = function getURL(url) {
	    var client = new XMLHttpRequest();
	    client.open("GET",url,false);
	    client.send();
	    return client;
	}
	
	numeric.imageURL = function imageURL(img) {
	    function base64(A) {
	        var n = A.length, i,x,y,z,p,q,r,s;
	        var key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	        var ret = "";
	        for(i=0;i<n;i+=3) {
	            x = A[i];
	            y = A[i+1];
	            z = A[i+2];
	            p = x >> 2;
	            q = ((x & 3) << 4) + (y >> 4);
	            r = ((y & 15) << 2) + (z >> 6);
	            s = z & 63;
	            if(i+1>=n) { r = s = 64; }
	            else if(i+2>=n) { s = 64; }
	            ret += key.charAt(p) + key.charAt(q) + key.charAt(r) + key.charAt(s);
	            }
	        return ret;
	    }
	    function crc32Array (a,from,to) {
	        if(typeof from === "undefined") { from = 0; }
	        if(typeof to === "undefined") { to = a.length; }
	        var table = [0x00000000, 0x77073096, 0xEE0E612C, 0x990951BA, 0x076DC419, 0x706AF48F, 0xE963A535, 0x9E6495A3,
	                     0x0EDB8832, 0x79DCB8A4, 0xE0D5E91E, 0x97D2D988, 0x09B64C2B, 0x7EB17CBD, 0xE7B82D07, 0x90BF1D91, 
	                     0x1DB71064, 0x6AB020F2, 0xF3B97148, 0x84BE41DE, 0x1ADAD47D, 0x6DDDE4EB, 0xF4D4B551, 0x83D385C7,
	                     0x136C9856, 0x646BA8C0, 0xFD62F97A, 0x8A65C9EC, 0x14015C4F, 0x63066CD9, 0xFA0F3D63, 0x8D080DF5, 
	                     0x3B6E20C8, 0x4C69105E, 0xD56041E4, 0xA2677172, 0x3C03E4D1, 0x4B04D447, 0xD20D85FD, 0xA50AB56B, 
	                     0x35B5A8FA, 0x42B2986C, 0xDBBBC9D6, 0xACBCF940, 0x32D86CE3, 0x45DF5C75, 0xDCD60DCF, 0xABD13D59, 
	                     0x26D930AC, 0x51DE003A, 0xC8D75180, 0xBFD06116, 0x21B4F4B5, 0x56B3C423, 0xCFBA9599, 0xB8BDA50F,
	                     0x2802B89E, 0x5F058808, 0xC60CD9B2, 0xB10BE924, 0x2F6F7C87, 0x58684C11, 0xC1611DAB, 0xB6662D3D,
	                     0x76DC4190, 0x01DB7106, 0x98D220BC, 0xEFD5102A, 0x71B18589, 0x06B6B51F, 0x9FBFE4A5, 0xE8B8D433,
	                     0x7807C9A2, 0x0F00F934, 0x9609A88E, 0xE10E9818, 0x7F6A0DBB, 0x086D3D2D, 0x91646C97, 0xE6635C01, 
	                     0x6B6B51F4, 0x1C6C6162, 0x856530D8, 0xF262004E, 0x6C0695ED, 0x1B01A57B, 0x8208F4C1, 0xF50FC457, 
	                     0x65B0D9C6, 0x12B7E950, 0x8BBEB8EA, 0xFCB9887C, 0x62DD1DDF, 0x15DA2D49, 0x8CD37CF3, 0xFBD44C65, 
	                     0x4DB26158, 0x3AB551CE, 0xA3BC0074, 0xD4BB30E2, 0x4ADFA541, 0x3DD895D7, 0xA4D1C46D, 0xD3D6F4FB, 
	                     0x4369E96A, 0x346ED9FC, 0xAD678846, 0xDA60B8D0, 0x44042D73, 0x33031DE5, 0xAA0A4C5F, 0xDD0D7CC9, 
	                     0x5005713C, 0x270241AA, 0xBE0B1010, 0xC90C2086, 0x5768B525, 0x206F85B3, 0xB966D409, 0xCE61E49F, 
	                     0x5EDEF90E, 0x29D9C998, 0xB0D09822, 0xC7D7A8B4, 0x59B33D17, 0x2EB40D81, 0xB7BD5C3B, 0xC0BA6CAD, 
	                     0xEDB88320, 0x9ABFB3B6, 0x03B6E20C, 0x74B1D29A, 0xEAD54739, 0x9DD277AF, 0x04DB2615, 0x73DC1683, 
	                     0xE3630B12, 0x94643B84, 0x0D6D6A3E, 0x7A6A5AA8, 0xE40ECF0B, 0x9309FF9D, 0x0A00AE27, 0x7D079EB1, 
	                     0xF00F9344, 0x8708A3D2, 0x1E01F268, 0x6906C2FE, 0xF762575D, 0x806567CB, 0x196C3671, 0x6E6B06E7, 
	                     0xFED41B76, 0x89D32BE0, 0x10DA7A5A, 0x67DD4ACC, 0xF9B9DF6F, 0x8EBEEFF9, 0x17B7BE43, 0x60B08ED5, 
	                     0xD6D6A3E8, 0xA1D1937E, 0x38D8C2C4, 0x4FDFF252, 0xD1BB67F1, 0xA6BC5767, 0x3FB506DD, 0x48B2364B, 
	                     0xD80D2BDA, 0xAF0A1B4C, 0x36034AF6, 0x41047A60, 0xDF60EFC3, 0xA867DF55, 0x316E8EEF, 0x4669BE79, 
	                     0xCB61B38C, 0xBC66831A, 0x256FD2A0, 0x5268E236, 0xCC0C7795, 0xBB0B4703, 0x220216B9, 0x5505262F, 
	                     0xC5BA3BBE, 0xB2BD0B28, 0x2BB45A92, 0x5CB36A04, 0xC2D7FFA7, 0xB5D0CF31, 0x2CD99E8B, 0x5BDEAE1D, 
	                     0x9B64C2B0, 0xEC63F226, 0x756AA39C, 0x026D930A, 0x9C0906A9, 0xEB0E363F, 0x72076785, 0x05005713, 
	                     0x95BF4A82, 0xE2B87A14, 0x7BB12BAE, 0x0CB61B38, 0x92D28E9B, 0xE5D5BE0D, 0x7CDCEFB7, 0x0BDBDF21, 
	                     0x86D3D2D4, 0xF1D4E242, 0x68DDB3F8, 0x1FDA836E, 0x81BE16CD, 0xF6B9265B, 0x6FB077E1, 0x18B74777, 
	                     0x88085AE6, 0xFF0F6A70, 0x66063BCA, 0x11010B5C, 0x8F659EFF, 0xF862AE69, 0x616BFFD3, 0x166CCF45, 
	                     0xA00AE278, 0xD70DD2EE, 0x4E048354, 0x3903B3C2, 0xA7672661, 0xD06016F7, 0x4969474D, 0x3E6E77DB, 
	                     0xAED16A4A, 0xD9D65ADC, 0x40DF0B66, 0x37D83BF0, 0xA9BCAE53, 0xDEBB9EC5, 0x47B2CF7F, 0x30B5FFE9, 
	                     0xBDBDF21C, 0xCABAC28A, 0x53B39330, 0x24B4A3A6, 0xBAD03605, 0xCDD70693, 0x54DE5729, 0x23D967BF, 
	                     0xB3667A2E, 0xC4614AB8, 0x5D681B02, 0x2A6F2B94, 0xB40BBE37, 0xC30C8EA1, 0x5A05DF1B, 0x2D02EF8D];
	     
	        var crc = -1, y = 0, n = a.length,i;
	
	        for (i = from; i < to; i++) {
	            y = (crc ^ a[i]) & 0xFF;
	            crc = (crc >>> 8) ^ table[y];
	        }
	     
	        return crc ^ (-1);
	    }
	
	    var h = img[0].length, w = img[0][0].length, s1, s2, next,k,length,a,b,i,j,adler32,crc32;
	    var stream = [
	                  137, 80, 78, 71, 13, 10, 26, 10,                           //  0: PNG signature
	                  0,0,0,13,                                                  //  8: IHDR Chunk length
	                  73, 72, 68, 82,                                            // 12: "IHDR" 
	                  (w >> 24) & 255, (w >> 16) & 255, (w >> 8) & 255, w&255,   // 16: Width
	                  (h >> 24) & 255, (h >> 16) & 255, (h >> 8) & 255, h&255,   // 20: Height
	                  8,                                                         // 24: bit depth
	                  2,                                                         // 25: RGB
	                  0,                                                         // 26: deflate
	                  0,                                                         // 27: no filter
	                  0,                                                         // 28: no interlace
	                  -1,-2,-3,-4,                                               // 29: CRC
	                  -5,-6,-7,-8,                                               // 33: IDAT Chunk length
	                  73, 68, 65, 84,                                            // 37: "IDAT"
	                  // RFC 1950 header starts here
	                  8,                                                         // 41: RFC1950 CMF
	                  29                                                         // 42: RFC1950 FLG
	                  ];
	    crc32 = crc32Array(stream,12,29);
	    stream[29] = (crc32>>24)&255;
	    stream[30] = (crc32>>16)&255;
	    stream[31] = (crc32>>8)&255;
	    stream[32] = (crc32)&255;
	    s1 = 1;
	    s2 = 0;
	    for(i=0;i<h;i++) {
	        if(i<h-1) { stream.push(0); }
	        else { stream.push(1); }
	        a = (3*w+1+(i===0))&255; b = ((3*w+1+(i===0))>>8)&255;
	        stream.push(a); stream.push(b);
	        stream.push((~a)&255); stream.push((~b)&255);
	        if(i===0) stream.push(0);
	        for(j=0;j<w;j++) {
	            for(k=0;k<3;k++) {
	                a = img[k][i][j];
	                if(a>255) a = 255;
	                else if(a<0) a=0;
	                else a = Math.round(a);
	                s1 = (s1 + a )%65521;
	                s2 = (s2 + s1)%65521;
	                stream.push(a);
	            }
	        }
	        stream.push(0);
	    }
	    adler32 = (s2<<16)+s1;
	    stream.push((adler32>>24)&255);
	    stream.push((adler32>>16)&255);
	    stream.push((adler32>>8)&255);
	    stream.push((adler32)&255);
	    length = stream.length - 41;
	    stream[33] = (length>>24)&255;
	    stream[34] = (length>>16)&255;
	    stream[35] = (length>>8)&255;
	    stream[36] = (length)&255;
	    crc32 = crc32Array(stream,37);
	    stream.push((crc32>>24)&255);
	    stream.push((crc32>>16)&255);
	    stream.push((crc32>>8)&255);
	    stream.push((crc32)&255);
	    stream.push(0);
	    stream.push(0);
	    stream.push(0);
	    stream.push(0);
	//    a = stream.length;
	    stream.push(73);  // I
	    stream.push(69);  // E
	    stream.push(78);  // N
	    stream.push(68);  // D
	    stream.push(174); // CRC1
	    stream.push(66);  // CRC2
	    stream.push(96);  // CRC3
	    stream.push(130); // CRC4
	    return 'data:image/png;base64,'+base64(stream);
	}
	
	// 2. Linear algebra with Arrays.
	numeric._dim = function _dim(x) {
	    var ret = [];
	    while(typeof x === "object") { ret.push(x.length); x = x[0]; }
	    return ret;
	}
	
	numeric.dim = function dim(x) {
	    var y,z;
	    if(typeof x === "object") {
	        y = x[0];
	        if(typeof y === "object") {
	            z = y[0];
	            if(typeof z === "object") {
	                return numeric._dim(x);
	            }
	            return [x.length,y.length];
	        }
	        return [x.length];
	    }
	    return [];
	}
	
	numeric.mapreduce = function mapreduce(body,init) {
	    return Function('x','accum','_s','_k',
	            'if(typeof accum === "undefined") accum = '+init+';\n'+
	            'if(typeof x === "number") { var xi = x; '+body+'; return accum; }\n'+
	            'if(typeof _s === "undefined") _s = numeric.dim(x);\n'+
	            'if(typeof _k === "undefined") _k = 0;\n'+
	            'var _n = _s[_k];\n'+
	            'var i,xi;\n'+
	            'if(_k < _s.length-1) {\n'+
	            '    for(i=_n-1;i>=0;i--) {\n'+
	            '        accum = arguments.callee(x[i],accum,_s,_k+1);\n'+
	            '    }'+
	            '    return accum;\n'+
	            '}\n'+
	            'for(i=_n-1;i>=1;i-=2) { \n'+
	            '    xi = x[i];\n'+
	            '    '+body+';\n'+
	            '    xi = x[i-1];\n'+
	            '    '+body+';\n'+
	            '}\n'+
	            'if(i === 0) {\n'+
	            '    xi = x[i];\n'+
	            '    '+body+'\n'+
	            '}\n'+
	            'return accum;'
	            );
	}
	numeric.mapreduce2 = function mapreduce2(body,setup) {
	    return Function('x',
	            'var n = x.length;\n'+
	            'var i,xi;\n'+setup+';\n'+
	            'for(i=n-1;i!==-1;--i) { \n'+
	            '    xi = x[i];\n'+
	            '    '+body+';\n'+
	            '}\n'+
	            'return accum;'
	            );
	}
	
	
	numeric.same = function same(x,y) {
	    var i,n;
	    if(!(x instanceof Array) || !(y instanceof Array)) { return false; }
	    n = x.length;
	    if(n !== y.length) { return false; }
	    for(i=0;i<n;i++) {
	        if(x[i] === y[i]) { continue; }
	        if(typeof x[i] === "object") { if(!same(x[i],y[i])) return false; }
	        else { return false; }
	    }
	    return true;
	}
	
	numeric.rep = function rep(s,v,k) {
	    if(typeof k === "undefined") { k=0; }
	    var n = s[k], ret = Array(n), i;
	    if(k === s.length-1) {
	        for(i=n-2;i>=0;i-=2) { ret[i+1] = v; ret[i] = v; }
	        if(i===-1) { ret[0] = v; }
	        return ret;
	    }
	    for(i=n-1;i>=0;i--) { ret[i] = numeric.rep(s,v,k+1); }
	    return ret;
	}
	
	
	numeric.dotMMsmall = function dotMMsmall(x,y) {
	    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0;
	    p = x.length; q = y.length; r = y[0].length;
	    ret = Array(p);
	    for(i=p-1;i>=0;i--) {
	        foo = Array(r);
	        bar = x[i];
	        for(k=r-1;k>=0;k--) {
	            woo = bar[q-1]*y[q-1][k];
	            for(j=q-2;j>=1;j-=2) {
	                i0 = j-1;
	                woo += bar[j]*y[j][k] + bar[i0]*y[i0][k];
	            }
	            if(j===0) { woo += bar[0]*y[0][k]; }
	            foo[k] = woo;
	        }
	        ret[i] = foo;
	    }
	    return ret;
	}
	numeric._getCol = function _getCol(A,j,x) {
	    var n = A.length, i;
	    for(i=n-1;i>0;--i) {
	        x[i] = A[i][j];
	        --i;
	        x[i] = A[i][j];
	    }
	    if(i===0) x[0] = A[0][j];
	}
	numeric.dotMMbig = function dotMMbig(x,y){
	    var gc = numeric._getCol, p = y.length, v = Array(p);
	    var m = x.length, n = y[0].length, A = new Array(m), xj;
	    var VV = numeric.dotVV;
	    var i,j,k,z;
	    --p;
	    --m;
	    for(i=m;i!==-1;--i) A[i] = Array(n);
	    --n;
	    for(i=n;i!==-1;--i) {
	        gc(y,i,v);
	        for(j=m;j!==-1;--j) {
	            z=0;
	            xj = x[j];
	            A[j][i] = VV(xj,v);
	        }
	    }
	    return A;
	}
	
	numeric.dotMV = function dotMV(x,y) {
	    var p = x.length, q = y.length,i;
	    var ret = Array(p), dotVV = numeric.dotVV;
	    for(i=p-1;i>=0;i--) { ret[i] = dotVV(x[i],y); }
	    return ret;
	}
	
	numeric.dotVM = function dotVM(x,y) {
	    var i,j,k,p,q,r,ret,foo,bar,woo,i0,k0,p0,r0,s1,s2,s3,baz,accum;
	    p = x.length; q = y[0].length;
	    ret = Array(q);
	    for(k=q-1;k>=0;k--) {
	        woo = x[p-1]*y[p-1][k];
	        for(j=p-2;j>=1;j-=2) {
	            i0 = j-1;
	            woo += x[j]*y[j][k] + x[i0]*y[i0][k];
	        }
	        if(j===0) { woo += x[0]*y[0][k]; }
	        ret[k] = woo;
	    }
	    return ret;
	}
	
	numeric.dotVV = function dotVV(x,y) {
	    var i,n=x.length,i1,ret = x[n-1]*y[n-1];
	    for(i=n-2;i>=1;i-=2) {
	        i1 = i-1;
	        ret += x[i]*y[i] + x[i1]*y[i1];
	    }
	    if(i===0) { ret += x[0]*y[0]; }
	    return ret;
	}
	
	numeric.dot = function dot(x,y) {
	    var d = numeric.dim;
	    switch(d(x).length*1000+d(y).length) {
	    case 2002:
	        if(y.length < 10) return numeric.dotMMsmall(x,y);
	        else return numeric.dotMMbig(x,y);
	    case 2001: return numeric.dotMV(x,y);
	    case 1002: return numeric.dotVM(x,y);
	    case 1001: return numeric.dotVV(x,y);
	    case 1000: return numeric.mulVS(x,y);
	    case 1: return numeric.mulSV(x,y);
	    case 0: return x*y;
	    default: throw new Error('numeric.dot only works on vectors and matrices');
	    }
	}
	
	numeric.diag = function diag(d) {
	    var i,i1,j,n = d.length, A = Array(n), Ai;
	    for(i=n-1;i>=0;i--) {
	        Ai = Array(n);
	        i1 = i+2;
	        for(j=n-1;j>=i1;j-=2) {
	            Ai[j] = 0;
	            Ai[j-1] = 0;
	        }
	        if(j>i) { Ai[j] = 0; }
	        Ai[i] = d[i];
	        for(j=i-1;j>=1;j-=2) {
	            Ai[j] = 0;
	            Ai[j-1] = 0;
	        }
	        if(j===0) { Ai[0] = 0; }
	        A[i] = Ai;
	    }
	    return A;
	}
	numeric.getDiag = function(A) {
	    var n = Math.min(A.length,A[0].length),i,ret = Array(n);
	    for(i=n-1;i>=1;--i) {
	        ret[i] = A[i][i];
	        --i;
	        ret[i] = A[i][i];
	    }
	    if(i===0) {
	        ret[0] = A[0][0];
	    }
	    return ret;
	}
	
	numeric.identity = function identity(n) { return numeric.diag(numeric.rep([n],1)); }
	numeric.pointwise = function pointwise(params,body,setup) {
	    if(typeof setup === "undefined") { setup = ""; }
	    var fun = [];
	    var k;
	    var avec = /\[i\]$/,p,thevec = '';
	    var haveret = false;
	    for(k=0;k<params.length;k++) {
	        if(avec.test(params[k])) {
	            p = params[k].substring(0,params[k].length-3);
	            thevec = p;
	        } else { p = params[k]; }
	        if(p==='ret') haveret = true;
	        fun.push(p);
	    }
	    fun[params.length] = '_s';
	    fun[params.length+1] = '_k';
	    fun[params.length+2] = (
	            'if(typeof _s === "undefined") _s = numeric.dim('+thevec+');\n'+
	            'if(typeof _k === "undefined") _k = 0;\n'+
	            'var _n = _s[_k];\n'+
	            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
	            'if(_k < _s.length-1) {\n'+
	            '    for(i=_n-1;i>=0;i--) ret[i] = arguments.callee('+params.join(',')+',_s,_k+1);\n'+
	            '    return ret;\n'+
	            '}\n'+
	            setup+'\n'+
	            'for(i=_n-1;i!==-1;--i) {\n'+
	            '    '+body+'\n'+
	            '}\n'+
	            'return ret;'
	            );
	    return Function.apply(null,fun);
	}
	numeric.pointwise2 = function pointwise2(params,body,setup) {
	    if(typeof setup === "undefined") { setup = ""; }
	    var fun = [];
	    var k;
	    var avec = /\[i\]$/,p,thevec = '';
	    var haveret = false;
	    for(k=0;k<params.length;k++) {
	        if(avec.test(params[k])) {
	            p = params[k].substring(0,params[k].length-3);
	            thevec = p;
	        } else { p = params[k]; }
	        if(p==='ret') haveret = true;
	        fun.push(p);
	    }
	    fun[params.length] = (
	            'var _n = '+thevec+'.length;\n'+
	            'var i'+(haveret?'':', ret = Array(_n)')+';\n'+
	            setup+'\n'+
	            'for(i=_n-1;i!==-1;--i) {\n'+
	            body+'\n'+
	            '}\n'+
	            'return ret;'
	            );
	    return Function.apply(null,fun);
	}
	numeric._biforeach = (function _biforeach(x,y,s,k,f) {
	    if(k === s.length-1) { f(x,y); return; }
	    var i,n=s[k];
	    for(i=n-1;i>=0;i--) { _biforeach(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
	});
	numeric._biforeach2 = (function _biforeach2(x,y,s,k,f) {
	    if(k === s.length-1) { return f(x,y); }
	    var i,n=s[k],ret = Array(n);
	    for(i=n-1;i>=0;--i) { ret[i] = _biforeach2(typeof x==="object"?x[i]:x,typeof y==="object"?y[i]:y,s,k+1,f); }
	    return ret;
	});
	numeric._foreach = (function _foreach(x,s,k,f) {
	    if(k === s.length-1) { f(x); return; }
	    var i,n=s[k];
	    for(i=n-1;i>=0;i--) { _foreach(x[i],s,k+1,f); }
	});
	numeric._foreach2 = (function _foreach2(x,s,k,f) {
	    if(k === s.length-1) { return f(x); }
	    var i,n=s[k], ret = Array(n);
	    for(i=n-1;i>=0;i--) { ret[i] = _foreach2(x[i],s,k+1,f); }
	    return ret;
	});
	
	/*numeric.anyV = numeric.mapreduce('if(xi) return true;','false');
	numeric.allV = numeric.mapreduce('if(!xi) return false;','true');
	numeric.any = function(x) { if(typeof x.length === "undefined") return x; return numeric.anyV(x); }
	numeric.all = function(x) { if(typeof x.length === "undefined") return x; return numeric.allV(x); }*/
	
	numeric.ops2 = {
	        add: '+',
	        sub: '-',
	        mul: '*',
	        div: '/',
	        mod: '%',
	        and: '&&',
	        or:  '||',
	        eq:  '===',
	        neq: '!==',
	        lt:  '<',
	        gt:  '>',
	        leq: '<=',
	        geq: '>=',
	        band: '&',
	        bor: '|',
	        bxor: '^',
	        lshift: '<<',
	        rshift: '>>',
	        rrshift: '>>>'
	};
	numeric.opseq = {
	        addeq: '+=',
	        subeq: '-=',
	        muleq: '*=',
	        diveq: '/=',
	        modeq: '%=',
	        lshifteq: '<<=',
	        rshifteq: '>>=',
	        rrshifteq: '>>>=',
	        bandeq: '&=',
	        boreq: '|=',
	        bxoreq: '^='
	};
	numeric.mathfuns = ['abs','acos','asin','atan','ceil','cos',
	                    'exp','floor','log','round','sin','sqrt','tan',
	                    'isNaN','isFinite'];
	numeric.mathfuns2 = ['atan2','pow','max','min'];
	numeric.ops1 = {
	        neg: '-',
	        not: '!',
	        bnot: '~',
	        clone: ''
	};
	numeric.mapreducers = {
	        any: ['if(xi) return true;','var accum = false;'],
	        all: ['if(!xi) return false;','var accum = true;'],
	        sum: ['accum += xi;','var accum = 0;'],
	        prod: ['accum *= xi;','var accum = 1;'],
	        norm2Squared: ['accum += xi*xi;','var accum = 0;'],
	        norminf: ['accum = max(accum,abs(xi));','var accum = 0, max = Math.max, abs = Math.abs;'],
	        norm1: ['accum += abs(xi)','var accum = 0, abs = Math.abs;'],
	        sup: ['accum = max(accum,xi);','var accum = -Infinity, max = Math.max;'],
	        inf: ['accum = min(accum,xi);','var accum = Infinity, min = Math.min;']
	};
	
	(function () {
	    var i,o;
	    for(i=0;i<numeric.mathfuns2.length;++i) {
	        o = numeric.mathfuns2[i];
	        numeric.ops2[o] = o;
	    }
	    for(i in numeric.ops2) {
	        if(numeric.ops2.hasOwnProperty(i)) {
	            o = numeric.ops2[i];
	            var code, codeeq, setup = '';
	            if(numeric.myIndexOf.call(numeric.mathfuns2,i)!==-1) {
	                setup = 'var '+o+' = Math.'+o+';\n';
	                code = function(r,x,y) { return r+' = '+o+'('+x+','+y+')'; };
	                codeeq = function(x,y) { return x+' = '+o+'('+x+','+y+')'; };
	            } else {
	                code = function(r,x,y) { return r+' = '+x+' '+o+' '+y; };
	                if(numeric.opseq.hasOwnProperty(i+'eq')) {
	                    codeeq = function(x,y) { return x+' '+o+'= '+y; };
	                } else {
	                    codeeq = function(x,y) { return x+' = '+x+' '+o+' '+y; };                    
	                }
	            }
	            numeric[i+'VV'] = numeric.pointwise2(['x[i]','y[i]'],code('ret[i]','x[i]','y[i]'),setup);
	            numeric[i+'SV'] = numeric.pointwise2(['x','y[i]'],code('ret[i]','x','y[i]'),setup);
	            numeric[i+'VS'] = numeric.pointwise2(['x[i]','y'],code('ret[i]','x[i]','y'),setup);
	            numeric[i] = Function(
	                    'var n = arguments.length, i, x = arguments[0], y;\n'+
	                    'var VV = numeric.'+i+'VV, VS = numeric.'+i+'VS, SV = numeric.'+i+'SV;\n'+
	                    'var dim = numeric.dim;\n'+
	                    'for(i=1;i!==n;++i) { \n'+
	                    '  y = arguments[i];\n'+
	                    '  if(typeof x === "object") {\n'+
	                    '      if(typeof y === "object") x = numeric._biforeach2(x,y,dim(x),0,VV);\n'+
	                    '      else x = numeric._biforeach2(x,y,dim(x),0,VS);\n'+
	                    '  } else if(typeof y === "object") x = numeric._biforeach2(x,y,dim(y),0,SV);\n'+
	                    '  else '+codeeq('x','y')+'\n'+
	                    '}\nreturn x;\n');
	            numeric[o] = numeric[i];
	            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]','x[i]'], codeeq('ret[i]','x[i]'),setup);
	            numeric[i+'eqS'] = numeric.pointwise2(['ret[i]','x'], codeeq('ret[i]','x'),setup);
	            numeric[i+'eq'] = Function(
	                    'var n = arguments.length, i, x = arguments[0], y;\n'+
	                    'var V = numeric.'+i+'eqV, S = numeric.'+i+'eqS\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'for(i=1;i!==n;++i) { \n'+
	                    '  y = arguments[i];\n'+
	                    '  if(typeof y === "object") numeric._biforeach(x,y,s,0,V);\n'+
	                    '  else numeric._biforeach(x,y,s,0,S);\n'+
	                    '}\nreturn x;\n');
	        }
	    }
	    for(i=0;i<numeric.mathfuns2.length;++i) {
	        o = numeric.mathfuns2[i];
	        delete numeric.ops2[o];
	    }
	    for(i=0;i<numeric.mathfuns.length;++i) {
	        o = numeric.mathfuns[i];
	        numeric.ops1[o] = o;
	    }
	    for(i in numeric.ops1) {
	        if(numeric.ops1.hasOwnProperty(i)) {
	            setup = '';
	            o = numeric.ops1[i];
	            if(numeric.myIndexOf.call(numeric.mathfuns,i)!==-1) {
	                if(Math.hasOwnProperty(o)) setup = 'var '+o+' = Math.'+o+';\n';
	            }
	            numeric[i+'eqV'] = numeric.pointwise2(['ret[i]'],'ret[i] = '+o+'(ret[i]);',setup);
	            numeric[i+'eq'] = Function('x',
	                    'if(typeof x !== "object") return '+o+'x\n'+
	                    'var i;\n'+
	                    'var V = numeric.'+i+'eqV;\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'numeric._foreach(x,s,0,V);\n'+
	                    'return x;\n');
	            numeric[i+'V'] = numeric.pointwise2(['x[i]'],'ret[i] = '+o+'(x[i]);',setup);
	            numeric[i] = Function('x',
	                    'if(typeof x !== "object") return '+o+'(x)\n'+
	                    'var i;\n'+
	                    'var V = numeric.'+i+'V;\n'+
	                    'var s = numeric.dim(x);\n'+
	                    'return numeric._foreach2(x,s,0,V);\n');
	        }
	    }
	    for(i=0;i<numeric.mathfuns.length;++i) {
	        o = numeric.mathfuns[i];
	        delete numeric.ops1[o];
	    }
	    for(i in numeric.mapreducers) {
	        if(numeric.mapreducers.hasOwnProperty(i)) {
	            o = numeric.mapreducers[i];
	            numeric[i+'V'] = numeric.mapreduce2(o[0],o[1]);
	            numeric[i] = Function('x','s','k',
	                    o[1]+
	                    'if(typeof x !== "object") {'+
	                    '    xi = x;\n'+
	                    o[0]+';\n'+
	                    '    return accum;\n'+
	                    '}'+
	                    'if(typeof s === "undefined") s = numeric.dim(x);\n'+
	                    'if(typeof k === "undefined") k = 0;\n'+
	                    'if(k === s.length-1) return numeric.'+i+'V(x);\n'+
	                    'var xi;\n'+
	                    'var n = x.length, i;\n'+
	                    'for(i=n-1;i!==-1;--i) {\n'+
	                    '   xi = arguments.callee(x[i]);\n'+
	                    o[0]+';\n'+
	                    '}\n'+
	                    'return accum;\n');
	        }
	    }
	}());
	
	numeric.truncVV = numeric.pointwise(['x[i]','y[i]'],'ret[i] = round(x[i]/y[i])*y[i];','var round = Math.round;');
	numeric.truncVS = numeric.pointwise(['x[i]','y'],'ret[i] = round(x[i]/y)*y;','var round = Math.round;');
	numeric.truncSV = numeric.pointwise(['x','y[i]'],'ret[i] = round(x/y[i])*y[i];','var round = Math.round;');
	numeric.trunc = function trunc(x,y) {
	    if(typeof x === "object") {
	        if(typeof y === "object") return numeric.truncVV(x,y);
	        return numeric.truncVS(x,y);
	    }
	    if (typeof y === "object") return numeric.truncSV(x,y);
	    return Math.round(x/y)*y;
	}
	
	numeric.inv = function inv(x) {
	    var s = numeric.dim(x), abs = Math.abs, m = s[0], n = s[1];
	    var A = numeric.clone(x), Ai, Aj;
	    var I = numeric.identity(m), Ii, Ij;
	    var i,j,k,x;
	    for(j=0;j<n;++j) {
	        var i0 = -1;
	        var v0 = -1;
	        for(i=j;i!==m;++i) { k = abs(A[i][j]); if(k>v0) { i0 = i; v0 = k; } }
	        Aj = A[i0]; A[i0] = A[j]; A[j] = Aj;
	        Ij = I[i0]; I[i0] = I[j]; I[j] = Ij;
	        x = Aj[j];
	        for(k=j;k!==n;++k)    Aj[k] /= x; 
	        for(k=n-1;k!==-1;--k) Ij[k] /= x;
	        for(i=m-1;i!==-1;--i) {
	            if(i!==j) {
	                Ai = A[i];
	                Ii = I[i];
	                x = Ai[j];
	                for(k=j+1;k!==n;++k)  Ai[k] -= Aj[k]*x;
	                for(k=n-1;k>0;--k) { Ii[k] -= Ij[k]*x; --k; Ii[k] -= Ij[k]*x; }
	                if(k===0) Ii[0] -= Ij[0]*x;
	            }
	        }
	    }
	    return I;
	}
	
	numeric.det = function det(x) {
	    var s = numeric.dim(x);
	    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: det() only works on square matrices'); }
	    var n = s[0], ret = 1,i,j,k,A = numeric.clone(x),Aj,Ai,alpha,temp,k1,k2,k3;
	    for(j=0;j<n-1;j++) {
	        k=j;
	        for(i=j+1;i<n;i++) { if(Math.abs(A[i][j]) > Math.abs(A[k][j])) { k = i; } }
	        if(k !== j) {
	            temp = A[k]; A[k] = A[j]; A[j] = temp;
	            ret *= -1;
	        }
	        Aj = A[j];
	        for(i=j+1;i<n;i++) {
	            Ai = A[i];
	            alpha = Ai[j]/Aj[j];
	            for(k=j+1;k<n-1;k+=2) {
	                k1 = k+1;
	                Ai[k] -= Aj[k]*alpha;
	                Ai[k1] -= Aj[k1]*alpha;
	            }
	            if(k!==n) { Ai[k] -= Aj[k]*alpha; }
	        }
	        if(Aj[j] === 0) { return 0; }
	        ret *= Aj[j];
	    }
	    return ret*A[j][j];
	}
	
	numeric.transpose = function transpose(x) {
	    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
	    for(j=0;j<n;j++) ret[j] = Array(m);
	    for(i=m-1;i>=1;i-=2) {
	        A1 = x[i];
	        A0 = x[i-1];
	        for(j=n-1;j>=1;--j) {
	            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
	            --j;
	            Bj = ret[j]; Bj[i] = A1[j]; Bj[i-1] = A0[j];
	        }
	        if(j===0) {
	            Bj = ret[0]; Bj[i] = A1[0]; Bj[i-1] = A0[0];
	        }
	    }
	    if(i===0) {
	        A0 = x[0];
	        for(j=n-1;j>=1;--j) {
	            ret[j][0] = A0[j];
	            --j;
	            ret[j][0] = A0[j];
	        }
	        if(j===0) { ret[0][0] = A0[0]; }
	    }
	    return ret;
	}
	numeric.negtranspose = function negtranspose(x) {
	    var i,j,m = x.length,n = x[0].length, ret=Array(n),A0,A1,Bj;
	    for(j=0;j<n;j++) ret[j] = Array(m);
	    for(i=m-1;i>=1;i-=2) {
	        A1 = x[i];
	        A0 = x[i-1];
	        for(j=n-1;j>=1;--j) {
	            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
	            --j;
	            Bj = ret[j]; Bj[i] = -A1[j]; Bj[i-1] = -A0[j];
	        }
	        if(j===0) {
	            Bj = ret[0]; Bj[i] = -A1[0]; Bj[i-1] = -A0[0];
	        }
	    }
	    if(i===0) {
	        A0 = x[0];
	        for(j=n-1;j>=1;--j) {
	            ret[j][0] = -A0[j];
	            --j;
	            ret[j][0] = -A0[j];
	        }
	        if(j===0) { ret[0][0] = -A0[0]; }
	    }
	    return ret;
	}
	
	numeric._random = function _random(s,k) {
	    var i,n=s[k],ret=Array(n), rnd;
	    if(k === s.length-1) {
	        rnd = Math.random;
	        for(i=n-1;i>=1;i-=2) {
	            ret[i] = rnd();
	            ret[i-1] = rnd();
	        }
	        if(i===0) { ret[0] = rnd(); }
	        return ret;
	    }
	    for(i=n-1;i>=0;i--) ret[i] = _random(s,k+1);
	    return ret;
	}
	numeric.random = function random(s) { return numeric._random(s,0); }
	
	numeric.norm2 = function norm2(x) { return Math.sqrt(numeric.norm2Squared(x)); }
	
	numeric.linspace = function linspace(a,b,n) {
	    if(typeof n === "undefined") n = Math.max(Math.round(b-a)+1,1);
	    if(n<2) { return n===1?[a]:[]; }
	    var i,ret = Array(n);
	    n--;
	    for(i=n;i>=0;i--) { ret[i] = (i*b+(n-i)*a)/n; }
	    return ret;
	}
	
	numeric.getBlock = function getBlock(x,from,to) {
	    var s = numeric.dim(x);
	    function foo(x,k) {
	        var i,a = from[k], n = to[k]-a, ret = Array(n);
	        if(k === s.length-1) {
	            for(i=n;i>=0;i--) { ret[i] = x[i+a]; }
	            return ret;
	        }
	        for(i=n;i>=0;i--) { ret[i] = foo(x[i+a],k+1); }
	        return ret;
	    }
	    return foo(x,0);
	}
	
	numeric.setBlock = function setBlock(x,from,to,B) {
	    var s = numeric.dim(x);
	    function foo(x,y,k) {
	        var i,a = from[k], n = to[k]-a;
	        if(k === s.length-1) { for(i=n;i>=0;i--) { x[i+a] = y[i]; } }
	        for(i=n;i>=0;i--) { foo(x[i+a],y[i],k+1); }
	    }
	    foo(x,B,0);
	    return x;
	}
	
	numeric.getRange = function getRange(A,I,J) {
	    var m = I.length, n = J.length;
	    var i,j;
	    var B = Array(m), Bi, AI;
	    for(i=m-1;i!==-1;--i) {
	        B[i] = Array(n);
	        Bi = B[i];
	        AI = A[I[i]];
	        for(j=n-1;j!==-1;--j) Bi[j] = AI[J[j]];
	    }
	    return B;
	}
	
	numeric.blockMatrix = function blockMatrix(X) {
	    var s = numeric.dim(X);
	    if(s.length<4) return numeric.blockMatrix([X]);
	    var m=s[0],n=s[1],M,N,i,j,Xij;
	    M = 0; N = 0;
	    for(i=0;i<m;++i) M+=X[i][0].length;
	    for(j=0;j<n;++j) N+=X[0][j][0].length;
	    var Z = Array(M);
	    for(i=0;i<M;++i) Z[i] = Array(N);
	    var I=0,J,ZI,k,l,Xijk;
	    for(i=0;i<m;++i) {
	        J=N;
	        for(j=n-1;j!==-1;--j) {
	            Xij = X[i][j];
	            J -= Xij[0].length;
	            for(k=Xij.length-1;k!==-1;--k) {
	                Xijk = Xij[k];
	                ZI = Z[I+k];
	                for(l = Xijk.length-1;l!==-1;--l) ZI[J+l] = Xijk[l];
	            }
	        }
	        I += X[i][0].length;
	    }
	    return Z;
	}
	
	numeric.tensor = function tensor(x,y) {
	    if(typeof x === "number" || typeof y === "number") return numeric.mul(x,y);
	    var s1 = numeric.dim(x), s2 = numeric.dim(y);
	    if(s1.length !== 1 || s2.length !== 1) {
	        throw new Error('numeric: tensor product is only defined for vectors');
	    }
	    var m = s1[0], n = s2[0], A = Array(m), Ai, i,j,xi;
	    for(i=m-1;i>=0;i--) {
	        Ai = Array(n);
	        xi = x[i];
	        for(j=n-1;j>=3;--j) {
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	            --j;
	            Ai[j] = xi * y[j];
	        }
	        while(j>=0) { Ai[j] = xi * y[j]; --j; }
	        A[i] = Ai;
	    }
	    return A;
	}
	
	// 3. The Tensor type T
	numeric.T = function T(x,y) { this.x = x; this.y = y; }
	numeric.t = function t(x,y) { return new numeric.T(x,y); }
	
	numeric.Tbinop = function Tbinop(rr,rc,cr,cc,setup) {
	    var io = numeric.indexOf;
	    if(typeof setup !== "string") {
	        var k;
	        setup = '';
	        for(k in numeric) {
	            if(numeric.hasOwnProperty(k) && (rr.indexOf(k)>=0 || rc.indexOf(k)>=0 || cr.indexOf(k)>=0 || cc.indexOf(k)>=0) && k.length>1) {
	                setup += 'var '+k+' = numeric.'+k+';\n';
	            }
	        }
	    }
	    return Function(['y'],
	            'var x = this;\n'+
	            'if(!(y instanceof numeric.T)) { y = new numeric.T(y); }\n'+
	            setup+'\n'+
	            'if(x.y) {'+
	            '  if(y.y) {'+
	            '    return new numeric.T('+cc+');\n'+
	            '  }\n'+
	            '  return new numeric.T('+cr+');\n'+
	            '}\n'+
	            'if(y.y) {\n'+
	            '  return new numeric.T('+rc+');\n'+
	            '}\n'+
	            'return new numeric.T('+rr+');\n'
	    );
	}
	
	numeric.T.prototype.add = numeric.Tbinop(
	        'add(x.x,y.x)',
	        'add(x.x,y.x),y.y',
	        'add(x.x,y.x),x.y',
	        'add(x.x,y.x),add(x.y,y.y)');
	numeric.T.prototype.sub = numeric.Tbinop(
	        'sub(x.x,y.x)',
	        'sub(x.x,y.x),neg(y.y)',
	        'sub(x.x,y.x),x.y',
	        'sub(x.x,y.x),sub(x.y,y.y)');
	numeric.T.prototype.mul = numeric.Tbinop(
	        'mul(x.x,y.x)',
	        'mul(x.x,y.x),mul(x.x,y.y)',
	        'mul(x.x,y.x),mul(x.y,y.x)',
	        'sub(mul(x.x,y.x),mul(x.y,y.y)),add(mul(x.x,y.y),mul(x.y,y.x))');
	
	numeric.T.prototype.reciprocal = function reciprocal() {
	    var mul = numeric.mul, div = numeric.div;
	    if(this.y) {
	        var d = numeric.add(mul(this.x,this.x),mul(this.y,this.y));
	        return new numeric.T(div(this.x,d),div(numeric.neg(this.y),d));
	    }
	    return new T(div(1,this.x));
	}
	numeric.T.prototype.div = function div(y) {
	    if(!(y instanceof numeric.T)) y = new numeric.T(y);
	    if(y.y) { return this.mul(y.reciprocal()); }
	    var div = numeric.div;
	    if(this.y) { return new numeric.T(div(this.x,y.x),div(this.y,y.x)); }
	    return new numeric.T(div(this.x,y.x));
	}
	numeric.T.prototype.dot = numeric.Tbinop(
	        'dot(x.x,y.x)',
	        'dot(x.x,y.x),dot(x.x,y.y)',
	        'dot(x.x,y.x),dot(x.y,y.x)',
	        'sub(dot(x.x,y.x),dot(x.y,y.y)),add(dot(x.x,y.y),dot(x.y,y.x))'
	        );
	numeric.T.prototype.transpose = function transpose() {
	    var t = numeric.transpose, x = this.x, y = this.y;
	    if(y) { return new numeric.T(t(x),t(y)); }
	    return new numeric.T(t(x));
	}
	numeric.T.prototype.transjugate = function transjugate() {
	    var t = numeric.transpose, x = this.x, y = this.y;
	    if(y) { return new numeric.T(t(x),numeric.negtranspose(y)); }
	    return new numeric.T(t(x));
	}
	numeric.Tunop = function Tunop(r,c,s) {
	    if(typeof s !== "string") { s = ''; }
	    return Function(
	            'var x = this;\n'+
	            s+'\n'+
	            'if(x.y) {'+
	            '  '+c+';\n'+
	            '}\n'+
	            r+';\n'
	    );
	}
	
	numeric.T.prototype.exp = numeric.Tunop(
	        'return new numeric.T(ex)',
	        'return new numeric.T(mul(cos(x.y),ex),mul(sin(x.y),ex))',
	        'var ex = numeric.exp(x.x), cos = numeric.cos, sin = numeric.sin, mul = numeric.mul;');
	numeric.T.prototype.conj = numeric.Tunop(
	        'return new numeric.T(x.x);',
	        'return new numeric.T(x.x,numeric.neg(x.y));');
	numeric.T.prototype.neg = numeric.Tunop(
	        'return new numeric.T(neg(x.x));',
	        'return new numeric.T(neg(x.x),neg(x.y));',
	        'var neg = numeric.neg;');
	numeric.T.prototype.sin = numeric.Tunop(
	        'return new numeric.T(numeric.sin(x.x))',
	        'return x.exp().sub(x.neg().exp()).div(new numeric.T(0,2));');
	numeric.T.prototype.cos = numeric.Tunop(
	        'return new numeric.T(numeric.cos(x.x))',
	        'return x.exp().add(x.neg().exp()).div(2);');
	numeric.T.prototype.abs = numeric.Tunop(
	        'return new numeric.T(numeric.abs(x.x));',
	        'return new numeric.T(numeric.sqrt(numeric.add(mul(x.x,x.x),mul(x.y,x.y))));',
	        'var mul = numeric.mul;');
	numeric.T.prototype.log = numeric.Tunop(
	        'return new numeric.T(numeric.log(x.x));',
	        'var theta = new numeric.T(numeric.atan2(x.y,x.x)), r = x.abs();\n'+
	        'return new numeric.T(numeric.log(r.x),theta.x);');
	numeric.T.prototype.norm2 = numeric.Tunop(
	        'return numeric.norm2(x.x);',
	        'var f = numeric.norm2Squared;\n'+
	        'return Math.sqrt(f(x.x)+f(x.y));');
	numeric.T.prototype.inv = function inv() {
	    var A = this;
	    if(typeof A.y === "undefined") { return new numeric.T(numeric.inv(A.x)); }
	    var n = A.x.length, i, j, k;
	    var Rx = numeric.identity(n),Ry = numeric.rep([n,n],0);
	    var Ax = numeric.clone(A.x), Ay = numeric.clone(A.y);
	    var Aix, Aiy, Ajx, Ajy, Rix, Riy, Rjx, Rjy;
	    var i,j,k,d,d1,ax,ay,bx,by,temp;
	    for(i=0;i<n;i++) {
	        ax = Ax[i][i]; ay = Ay[i][i];
	        d = ax*ax+ay*ay;
	        k = i;
	        for(j=i+1;j<n;j++) {
	            ax = Ax[j][i]; ay = Ay[j][i];
	            d1 = ax*ax+ay*ay;
	            if(d1 > d) { k=j; d = d1; }
	        }
	        if(k!==i) {
	            temp = Ax[i]; Ax[i] = Ax[k]; Ax[k] = temp;
	            temp = Ay[i]; Ay[i] = Ay[k]; Ay[k] = temp;
	            temp = Rx[i]; Rx[i] = Rx[k]; Rx[k] = temp;
	            temp = Ry[i]; Ry[i] = Ry[k]; Ry[k] = temp;
	        }
	        Aix = Ax[i]; Aiy = Ay[i];
	        Rix = Rx[i]; Riy = Ry[i];
	        ax = Aix[i]; ay = Aiy[i];
	        for(j=i+1;j<n;j++) {
	            bx = Aix[j]; by = Aiy[j];
	            Aix[j] = (bx*ax+by*ay)/d;
	            Aiy[j] = (by*ax-bx*ay)/d;
	        }
	        for(j=0;j<n;j++) {
	            bx = Rix[j]; by = Riy[j];
	            Rix[j] = (bx*ax+by*ay)/d;
	            Riy[j] = (by*ax-bx*ay)/d;
	        }
	        for(j=i+1;j<n;j++) {
	            Ajx = Ax[j]; Ajy = Ay[j];
	            Rjx = Rx[j]; Rjy = Ry[j];
	            ax = Ajx[i]; ay = Ajy[i];
	            for(k=i+1;k<n;k++) {
	                bx = Aix[k]; by = Aiy[k];
	                Ajx[k] -= bx*ax-by*ay;
	                Ajy[k] -= by*ax+bx*ay;
	            }
	            for(k=0;k<n;k++) {
	                bx = Rix[k]; by = Riy[k];
	                Rjx[k] -= bx*ax-by*ay;
	                Rjy[k] -= by*ax+bx*ay;
	            }
	        }
	    }
	    for(i=n-1;i>0;i--) {
	        Rix = Rx[i]; Riy = Ry[i];
	        for(j=i-1;j>=0;j--) {
	            Rjx = Rx[j]; Rjy = Ry[j];
	            ax = Ax[j][i]; ay = Ay[j][i];
	            for(k=n-1;k>=0;k--) {
	                bx = Rix[k]; by = Riy[k];
	                Rjx[k] -= ax*bx - ay*by;
	                Rjy[k] -= ax*by + ay*bx;
	            }
	        }
	    }
	    return new numeric.T(Rx,Ry);
	}
	numeric.T.prototype.get = function get(i) {
	    var x = this.x, y = this.y, k = 0, ik, n = i.length;
	    if(y) {
	        while(k<n) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        return new numeric.T(x,y);
	    }
	    while(k<n) {
	        ik = i[k];
	        x = x[ik];
	        k++;
	    }
	    return new numeric.T(x);
	}
	numeric.T.prototype.set = function set(i,v) {
	    var x = this.x, y = this.y, k = 0, ik, n = i.length, vx = v.x, vy = v.y;
	    if(n===0) {
	        if(vy) { this.y = vy; }
	        else if(y) { this.y = undefined; }
	        this.x = x;
	        return this;
	    }
	    if(vy) {
	        if(y) { /* ok */ }
	        else {
	            y = numeric.rep(numeric.dim(x),0);
	            this.y = y;
	        }
	        while(k<n-1) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        ik = i[k];
	        x[ik] = vx;
	        y[ik] = vy;
	        return this;
	    }
	    if(y) {
	        while(k<n-1) {
	            ik = i[k];
	            x = x[ik];
	            y = y[ik];
	            k++;
	        }
	        ik = i[k];
	        x[ik] = vx;
	        if(vx instanceof Array) y[ik] = numeric.rep(numeric.dim(vx),0);
	        else y[ik] = 0;
	        return this;
	    }
	    while(k<n-1) {
	        ik = i[k];
	        x = x[ik];
	        k++;
	    }
	    ik = i[k];
	    x[ik] = vx;
	    return this;
	}
	numeric.T.prototype.getRows = function getRows(i0,i1) {
	    var n = i1-i0+1, j;
	    var rx = Array(n), ry, x = this.x, y = this.y;
	    for(j=i0;j<=i1;j++) { rx[j-i0] = x[j]; }
	    if(y) {
	        ry = Array(n);
	        for(j=i0;j<=i1;j++) { ry[j-i0] = y[j]; }
	        return new numeric.T(rx,ry);
	    }
	    return new numeric.T(rx);
	}
	numeric.T.prototype.setRows = function setRows(i0,i1,A) {
	    var j;
	    var rx = this.x, ry = this.y, x = A.x, y = A.y;
	    for(j=i0;j<=i1;j++) { rx[j] = x[j-i0]; }
	    if(y) {
	        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
	        for(j=i0;j<=i1;j++) { ry[j] = y[j-i0]; }
	    } else if(ry) {
	        for(j=i0;j<=i1;j++) { ry[j] = numeric.rep([x[j-i0].length],0); }
	    }
	    return this;
	}
	numeric.T.prototype.getRow = function getRow(k) {
	    var x = this.x, y = this.y;
	    if(y) { return new numeric.T(x[k],y[k]); }
	    return new numeric.T(x[k]);
	}
	numeric.T.prototype.setRow = function setRow(i,v) {
	    var rx = this.x, ry = this.y, x = v.x, y = v.y;
	    rx[i] = x;
	    if(y) {
	        if(!ry) { ry = numeric.rep(numeric.dim(rx),0); this.y = ry; }
	        ry[i] = y;
	    } else if(ry) {
	        ry = numeric.rep([x.length],0);
	    }
	    return this;
	}
	
	numeric.T.prototype.getBlock = function getBlock(from,to) {
	    var x = this.x, y = this.y, b = numeric.getBlock;
	    if(y) { return new numeric.T(b(x,from,to),b(y,from,to)); }
	    return new numeric.T(b(x,from,to));
	}
	numeric.T.prototype.setBlock = function setBlock(from,to,A) {
	    if(!(A instanceof numeric.T)) A = new numeric.T(A);
	    var x = this.x, y = this.y, b = numeric.setBlock, Ax = A.x, Ay = A.y;
	    if(Ay) {
	        if(!y) { this.y = numeric.rep(numeric.dim(this),0); y = this.y; }
	        b(x,from,to,Ax);
	        b(y,from,to,Ay);
	        return this;
	    }
	    b(x,from,to,Ax);
	    if(y) b(y,from,to,numeric.rep(numeric.dim(Ax),0));
	}
	numeric.T.rep = function rep(s,v) {
	    var T = numeric.T;
	    if(!(v instanceof T)) v = new T(v);
	    var x = v.x, y = v.y, r = numeric.rep;
	    if(y) return new T(r(s,x),r(s,y));
	    return new T(r(s,x));
	}
	numeric.T.diag = function diag(d) {
	    if(!(d instanceof numeric.T)) d = new numeric.T(d);
	    var x = d.x, y = d.y, diag = numeric.diag;
	    if(y) return new numeric.T(diag(x),diag(y));
	    return new numeric.T(diag(x));
	}
	numeric.T.eig = function eig() {
	    if(this.y) { throw new Error('eig: not implemented for complex matrices.'); }
	    return numeric.eig(this.x);
	}
	numeric.T.identity = function identity(n) { return new numeric.T(numeric.identity(n)); }
	numeric.T.prototype.getDiag = function getDiag() {
	    var n = numeric;
	    var x = this.x, y = this.y;
	    if(y) { return new n.T(n.getDiag(x),n.getDiag(y)); }
	    return new n.T(n.getDiag(x));
	}
	
	// 4. Eigenvalues of real matrices
	
	numeric.house = function house(x) {
	    var v = numeric.clone(x);
	    var s = x[0] >= 0 ? 1 : -1;
	    var alpha = s*numeric.norm2(x);
	    v[0] += alpha;
	    var foo = numeric.norm2(v);
	    if(foo === 0) { /* this should not happen */ throw new Error('eig: internal error'); }
	    return numeric.div(v,foo);
	}
	
	numeric.toUpperHessenberg = function toUpperHessenberg(me) {
	    var s = numeric.dim(me);
	    if(s.length !== 2 || s[0] !== s[1]) { throw new Error('numeric: toUpperHessenberg() only works on square matrices'); }
	    var m = s[0], i,j,k,x,v,A = numeric.clone(me),B,C,Ai,Ci,Q = numeric.identity(m),Qi;
	    for(j=0;j<m-2;j++) {
	        x = Array(m-j-1);
	        for(i=j+1;i<m;i++) { x[i-j-1] = A[i][j]; }
	        if(numeric.norm2(x)>0) {
	            v = numeric.house(x);
	            B = numeric.getBlock(A,[j+1,j],[m-1,m-1]);
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<m;i++) { Ai = A[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Ai[k] -= 2*Ci[k-j]; }
	            B = numeric.getBlock(A,[0,j+1],[m-1,m-1]);
	            C = numeric.tensor(numeric.dot(B,v),v);
	            for(i=0;i<m;i++) { Ai = A[i]; Ci = C[i]; for(k=j+1;k<m;k++) Ai[k] -= 2*Ci[k-j-1]; }
	            B = Array(m-j-1);
	            for(i=j+1;i<m;i++) B[i-j-1] = Q[i];
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<m;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        }
	    }
	    return {H:A, Q:Q};
	}
	
	numeric.epsilon = 2.220446049250313e-16;
	
	numeric.QRFrancis = function(H,maxiter) {
	    if(typeof maxiter === "undefined") { maxiter = 10000; }
	    H = numeric.clone(H);
	    var H0 = numeric.clone(H);
	    var s = numeric.dim(H),m=s[0],x,v,a,b,c,d,det,tr, Hloc, Q = numeric.identity(m), Qi, Hi, B, C, Ci,i,j,k,iter;
	    if(m<3) { return {Q:Q, B:[ [0,m-1] ]}; }
	    var epsilon = numeric.epsilon;
	    for(iter=0;iter<maxiter;iter++) {
	        for(j=0;j<m-1;j++) {
	            if(Math.abs(H[j+1][j]) < epsilon*(Math.abs(H[j][j])+Math.abs(H[j+1][j+1]))) {
	                var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[j,j]),maxiter);
	                var QH2 = numeric.QRFrancis(numeric.getBlock(H,[j+1,j+1],[m-1,m-1]),maxiter);
	                B = Array(j+1);
	                for(i=0;i<=j;i++) { B[i] = Q[i]; }
	                C = numeric.dot(QH1.Q,B);
	                for(i=0;i<=j;i++) { Q[i] = C[i]; }
	                B = Array(m-j-1);
	                for(i=j+1;i<m;i++) { B[i-j-1] = Q[i]; }
	                C = numeric.dot(QH2.Q,B);
	                for(i=j+1;i<m;i++) { Q[i] = C[i-j-1]; }
	                return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,j+1))};
	            }
	        }
	        a = H[m-2][m-2]; b = H[m-2][m-1];
	        c = H[m-1][m-2]; d = H[m-1][m-1];
	        tr = a+d;
	        det = (a*d-b*c);
	        Hloc = numeric.getBlock(H, [0,0], [2,2]);
	        if(tr*tr>=4*det) {
	            var s1,s2;
	            s1 = 0.5*(tr+Math.sqrt(tr*tr-4*det));
	            s2 = 0.5*(tr-Math.sqrt(tr*tr-4*det));
	            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
	                                           numeric.mul(Hloc,s1+s2)),
	                               numeric.diag(numeric.rep([3],s1*s2)));
	        } else {
	            Hloc = numeric.add(numeric.sub(numeric.dot(Hloc,Hloc),
	                                           numeric.mul(Hloc,tr)),
	                               numeric.diag(numeric.rep([3],det)));
	        }
	        x = [Hloc[0][0],Hloc[1][0],Hloc[2][0]];
	        v = numeric.house(x);
	        B = [H[0],H[1],H[2]];
	        C = numeric.tensor(v,numeric.dot(v,B));
	        for(i=0;i<3;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<m;k++) Hi[k] -= 2*Ci[k]; }
	        B = numeric.getBlock(H, [0,0],[m-1,2]);
	        C = numeric.tensor(numeric.dot(B,v),v);
	        for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=0;k<3;k++) Hi[k] -= 2*Ci[k]; }
	        B = [Q[0],Q[1],Q[2]];
	        C = numeric.tensor(v,numeric.dot(v,B));
	        for(i=0;i<3;i++) { Qi = Q[i]; Ci = C[i]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        var J;
	        for(j=0;j<m-2;j++) {
	            for(k=j;k<=j+1;k++) {
	                if(Math.abs(H[k+1][k]) < epsilon*(Math.abs(H[k][k])+Math.abs(H[k+1][k+1]))) {
	                    var QH1 = numeric.QRFrancis(numeric.getBlock(H,[0,0],[k,k]),maxiter);
	                    var QH2 = numeric.QRFrancis(numeric.getBlock(H,[k+1,k+1],[m-1,m-1]),maxiter);
	                    B = Array(k+1);
	                    for(i=0;i<=k;i++) { B[i] = Q[i]; }
	                    C = numeric.dot(QH1.Q,B);
	                    for(i=0;i<=k;i++) { Q[i] = C[i]; }
	                    B = Array(m-k-1);
	                    for(i=k+1;i<m;i++) { B[i-k-1] = Q[i]; }
	                    C = numeric.dot(QH2.Q,B);
	                    for(i=k+1;i<m;i++) { Q[i] = C[i-k-1]; }
	                    return {Q:Q,B:QH1.B.concat(numeric.add(QH2.B,k+1))};
	                }
	            }
	            J = Math.min(m-1,j+3);
	            x = Array(J-j);
	            for(i=j+1;i<=J;i++) { x[i-j-1] = H[i][j]; }
	            v = numeric.house(x);
	            B = numeric.getBlock(H, [j+1,j],[J,m-1]);
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<=J;i++) { Hi = H[i]; Ci = C[i-j-1]; for(k=j;k<m;k++) Hi[k] -= 2*Ci[k-j]; }
	            B = numeric.getBlock(H, [0,j+1],[m-1,J]);
	            C = numeric.tensor(numeric.dot(B,v),v);
	            for(i=0;i<m;i++) { Hi = H[i]; Ci = C[i]; for(k=j+1;k<=J;k++) Hi[k] -= 2*Ci[k-j-1]; }
	            B = Array(J-j);
	            for(i=j+1;i<=J;i++) B[i-j-1] = Q[i];
	            C = numeric.tensor(v,numeric.dot(v,B));
	            for(i=j+1;i<=J;i++) { Qi = Q[i]; Ci = C[i-j-1]; for(k=0;k<m;k++) Qi[k] -= 2*Ci[k]; }
	        }
	    }
	    throw new Error('numeric: eigenvalue iteration does not converge -- increase maxiter?');
	}
	
	numeric.eig = function eig(A,maxiter) {
	    var QH = numeric.toUpperHessenberg(A);
	    var QB = numeric.QRFrancis(QH.H,maxiter);
	    var T = numeric.T;
	    var n = A.length,i,k,flag = false,B = QB.B,H = numeric.dot(QB.Q,numeric.dot(QH.H,numeric.transpose(QB.Q)));
	    var Q = new T(numeric.dot(QB.Q,QH.Q)),Q0;
	    var m = B.length,j;
	    var a,b,c,d,p1,p2,disc,x,y,p,q,n1,n2;
	    var sqrt = Math.sqrt;
	    for(k=0;k<m;k++) {
	        i = B[k][0];
	        if(i === B[k][1]) {
	            // nothing
	        } else {
	            j = i+1;
	            a = H[i][i];
	            b = H[i][j];
	            c = H[j][i];
	            d = H[j][j];
	            if(b === 0 && c === 0) continue;
	            p1 = -a-d;
	            p2 = a*d-b*c;
	            disc = p1*p1-4*p2;
	            if(disc>=0) {
	                if(p1<0) x = -0.5*(p1-sqrt(disc));
	                else     x = -0.5*(p1+sqrt(disc));
	                n1 = (a-x)*(a-x)+b*b;
	                n2 = c*c+(d-x)*(d-x);
	                if(n1>n2) {
	                    n1 = sqrt(n1);
	                    p = (a-x)/n1;
	                    q = b/n1;
	                } else {
	                    n2 = sqrt(n2);
	                    p = c/n2;
	                    q = (d-x)/n2;
	                }
	                Q0 = new T([[q,-p],[p,q]]);
	                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
	            } else {
	                x = -0.5*p1;
	                y = 0.5*sqrt(-disc);
	                n1 = (a-x)*(a-x)+b*b;
	                n2 = c*c+(d-x)*(d-x);
	                if(n1>n2) {
	                    n1 = sqrt(n1+y*y);
	                    p = (a-x)/n1;
	                    q = b/n1;
	                    x = 0;
	                    y /= n1;
	                } else {
	                    n2 = sqrt(n2+y*y);
	                    p = c/n2;
	                    q = (d-x)/n2;
	                    x = y/n2;
	                    y = 0;
	                }
	                Q0 = new T([[q,-p],[p,q]],[[x,y],[y,-x]]);
	                Q.setRows(i,j,Q0.dot(Q.getRows(i,j)));
	            }
	        }
	    }
	    var R = Q.dot(A).dot(Q.transjugate()), n = A.length, E = numeric.T.identity(n);
	    for(j=0;j<n;j++) {
	        if(j>0) {
	            for(k=j-1;k>=0;k--) {
	                var Rk = R.get([k,k]), Rj = R.get([j,j]);
	                if(numeric.neq(Rk.x,Rj.x) || numeric.neq(Rk.y,Rj.y)) {
	                    x = R.getRow(k).getBlock([k],[j-1]);
	                    y = E.getRow(j).getBlock([k],[j-1]);
	                    E.set([j,k],(R.get([k,j]).neg().sub(x.dot(y))).div(Rk.sub(Rj)));
	                } else {
	                    E.setRow(j,E.getRow(k));
	                    continue;
	                }
	            }
	        }
	    }
	    for(j=0;j<n;j++) {
	        x = E.getRow(j);
	        E.setRow(j,x.div(x.norm2()));
	    }
	    E = E.transpose();
	    E = Q.transjugate().dot(E);
	    return { lambda:R.getDiag(), E:E };
	};
	
	// 5. Compressed Column Storage matrices
	numeric.ccsSparse = function ccsSparse(A) {
	    var m = A.length,n,foo, i,j, counts = [];
	    for(i=m-1;i!==-1;--i) {
	        foo = A[i];
	        for(j in foo) {
	            j = parseInt(j);
	            while(j>=counts.length) counts[counts.length] = 0;
	            if(foo[j]!==0) counts[j]++;
	        }
	    }
	    var n = counts.length;
	    var Ai = Array(n+1);
	    Ai[0] = 0;
	    for(i=0;i<n;++i) Ai[i+1] = Ai[i] + counts[i];
	    var Aj = Array(Ai[n]), Av = Array(Ai[n]);
	    for(i=m-1;i!==-1;--i) {
	        foo = A[i];
	        for(j in foo) {
	            if(foo[j]!==0) {
	                counts[j]--;
	                Aj[Ai[j]+counts[j]] = i;
	                Av[Ai[j]+counts[j]] = foo[j];
	            }
	        }
	    }
	    return [Ai,Aj,Av];
	}
	numeric.ccsFull = function ccsFull(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2], s = numeric.ccsDim(A), m = s[0], n = s[1], i,j,j0,j1,k;
	    var B = numeric.rep([m,n],0);
	    for(i=0;i<n;i++) {
	        j0 = Ai[i];
	        j1 = Ai[i+1];
	        for(j=j0;j<j1;++j) { B[Aj[j]][i] = Av[j]; }
	    }
	    return B;
	}
	numeric.ccsTSolve = function ccsTSolve(A,b,x,bj,xj) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, max = Math.max,n=0;
	    if(typeof bj === "undefined") x = numeric.rep([m],0);
	    if(typeof bj === "undefined") bj = numeric.linspace(0,x.length-1);
	    if(typeof xj === "undefined") xj = [];
	    function dfs(j) {
	        var k;
	        if(x[j] !== 0) return;
	        x[j] = 1;
	        for(k=Ai[j];k<Ai[j+1];++k) dfs(Aj[k]);
	        xj[n] = j;
	        ++n;
	    }
	    var i,j,j0,j1,k,l,l0,l1,a;
	    for(i=bj.length-1;i!==-1;--i) { dfs(bj[i]); }
	    xj.length = n;
	    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
	    for(i=bj.length-1;i!==-1;--i) { j = bj[i]; x[j] = b[j]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        j0 = Ai[j];
	        j1 = max(Ai[j+1],j0);
	        for(k=j0;k!==j1;++k) { if(Aj[k] === j) { x[j] /= Av[k]; break; } }
	        a = x[j];
	        for(k=j0;k!==j1;++k) {
	            l = Aj[k];
	            if(l !== j) x[l] -= a*Av[k];
	        }
	    }
	    return x;
	}
	numeric.ccsDFS = function ccsDFS(n) {
	    this.k = Array(n);
	    this.k1 = Array(n);
	    this.j = Array(n);
	}
	numeric.ccsDFS.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv) {
	    var m = 0,foo,n=xj.length;
	    var k = this.k, k1 = this.k1, j = this.j,km,k11;
	    if(x[J]!==0) return;
	    x[J] = 1;
	    j[0] = J;
	    k[0] = km = Ai[J];
	    k1[0] = k11 = Ai[J+1];
	    while(1) {
	        if(km >= k11) {
	            xj[n] = j[m];
	            if(m===0) return;
	            ++n;
	            --m;
	            km = k[m];
	            k11 = k1[m];
	        } else {
	            foo = Pinv[Aj[km]];
	            if(x[foo] === 0) {
	                x[foo] = 1;
	                k[m] = km;
	                ++m;
	                j[m] = foo;
	                km = Ai[foo];
	                k1[m] = k11 = Ai[foo+1];
	            } else ++km;
	        }
	    }
	}
	numeric.ccsLPSolve = function ccsLPSolve(A,B,x,xj,I,Pinv,dfs) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    
	    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
	    i0 = Bi[I];
	    i1 = Bi[I+1];
	    xj.length = 0;
	    for(i=i0;i<i1;++i) { dfs.dfs(Pinv[Bj[i]],Ai,Aj,x,xj,Pinv); }
	    for(i=xj.length-1;i!==-1;--i) { x[xj[i]] = 0; }
	    for(i=i0;i!==i1;++i) { j = Pinv[Bj[i]]; x[j] = Bv[i]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        j0 = Ai[j];
	        j1 = Ai[j+1];
	        for(k=j0;k<j1;++k) { if(Pinv[Aj[k]] === j) { x[j] /= Av[k]; break; } }
	        a = x[j];
	        for(k=j0;k<j1;++k) {
	            l = Pinv[Aj[k]];
	            if(l !== j) x[l] -= a*Av[k];
	        }
	    }
	    return x;
	}
	numeric.ccsLUP1 = function ccsLUP1(A,threshold) {
	    var m = A[0].length-1;
	    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
	    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
	    var x = numeric.rep([m],0), xj = numeric.rep([m],0);
	    var i,j,k,j0,j1,a,e,c,d,K;
	    var sol = numeric.ccsLPSolve, max = Math.max, abs = Math.abs;
	    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
	    var dfs = new numeric.ccsDFS(m);
	    if(typeof threshold === "undefined") { threshold = 1; }
	    for(i=0;i<m;++i) {
	        sol(L,A,x,xj,i,Pinv,dfs);
	        a = -1;
	        e = -1;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            if(k <= i) continue;
	            c = abs(x[k]);
	            if(c > a) { e = k; a = c; }
	        }
	        if(abs(x[i])<threshold*a) {
	            j = P[i];
	            a = P[e];
	            P[i] = a; Pinv[a] = i;
	            P[e] = j; Pinv[j] = e;
	            a = x[i]; x[i] = x[e]; x[e] = a;
	        }
	        a = Li[i];
	        e = Ui[i];
	        d = x[i];
	        Lj[a] = P[i];
	        Lv[a] = 1;
	        ++a;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            c = x[k];
	            xj[j] = 0;
	            x[k] = 0;
	            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
	            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
	        }
	        Li[i+1] = a;
	        Ui[i+1] = e;
	    }
	    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
	    return {L:L, U:U, P:P, Pinv:Pinv};
	}
	numeric.ccsDFS0 = function ccsDFS0(n) {
	    this.k = Array(n);
	    this.k1 = Array(n);
	    this.j = Array(n);
	}
	numeric.ccsDFS0.prototype.dfs = function dfs(J,Ai,Aj,x,xj,Pinv,P) {
	    var m = 0,foo,n=xj.length;
	    var k = this.k, k1 = this.k1, j = this.j,km,k11;
	    if(x[J]!==0) return;
	    x[J] = 1;
	    j[0] = J;
	    k[0] = km = Ai[Pinv[J]];
	    k1[0] = k11 = Ai[Pinv[J]+1];
	    while(1) {
	        if(isNaN(km)) throw new Error("Ow!");
	        if(km >= k11) {
	            xj[n] = Pinv[j[m]];
	            if(m===0) return;
	            ++n;
	            --m;
	            km = k[m];
	            k11 = k1[m];
	        } else {
	            foo = Aj[km];
	            if(x[foo] === 0) {
	                x[foo] = 1;
	                k[m] = km;
	                ++m;
	                j[m] = foo;
	                foo = Pinv[foo];
	                km = Ai[foo];
	                k1[m] = k11 = Ai[foo+1];
	            } else ++km;
	        }
	    }
	}
	numeric.ccsLPSolve0 = function ccsLPSolve0(A,B,y,xj,I,Pinv,P,dfs) {
	    var Ai = A[0], Aj = A[1], Av = A[2],m = Ai.length-1, n=0;
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    
	    var i,i0,i1,j,J,j0,j1,k,l,l0,l1,a;
	    i0 = Bi[I];
	    i1 = Bi[I+1];
	    xj.length = 0;
	    for(i=i0;i<i1;++i) { dfs.dfs(Bj[i],Ai,Aj,y,xj,Pinv,P); }
	    for(i=xj.length-1;i!==-1;--i) { j = xj[i]; y[P[j]] = 0; }
	    for(i=i0;i!==i1;++i) { j = Bj[i]; y[j] = Bv[i]; }
	    for(i=xj.length-1;i!==-1;--i) {
	        j = xj[i];
	        l = P[j];
	        j0 = Ai[j];
	        j1 = Ai[j+1];
	        for(k=j0;k<j1;++k) { if(Aj[k] === l) { y[l] /= Av[k]; break; } }
	        a = y[l];
	        for(k=j0;k<j1;++k) y[Aj[k]] -= a*Av[k];
	        y[l] = a;
	    }
	}
	numeric.ccsLUP0 = function ccsLUP0(A,threshold) {
	    var m = A[0].length-1;
	    var L = [numeric.rep([m+1],0),[],[]], U = [numeric.rep([m+1], 0),[],[]];
	    var Li = L[0], Lj = L[1], Lv = L[2], Ui = U[0], Uj = U[1], Uv = U[2];
	    var y = numeric.rep([m],0), xj = numeric.rep([m],0);
	    var i,j,k,j0,j1,a,e,c,d,K;
	    var sol = numeric.ccsLPSolve0, max = Math.max, abs = Math.abs;
	    var P = numeric.linspace(0,m-1),Pinv = numeric.linspace(0,m-1);
	    var dfs = new numeric.ccsDFS0(m);
	    if(typeof threshold === "undefined") { threshold = 1; }
	    for(i=0;i<m;++i) {
	        sol(L,A,y,xj,i,Pinv,P,dfs);
	        a = -1;
	        e = -1;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            if(k <= i) continue;
	            c = abs(y[P[k]]);
	            if(c > a) { e = k; a = c; }
	        }
	        if(abs(y[P[i]])<threshold*a) {
	            j = P[i];
	            a = P[e];
	            P[i] = a; Pinv[a] = i;
	            P[e] = j; Pinv[j] = e;
	        }
	        a = Li[i];
	        e = Ui[i];
	        d = y[P[i]];
	        Lj[a] = P[i];
	        Lv[a] = 1;
	        ++a;
	        for(j=xj.length-1;j!==-1;--j) {
	            k = xj[j];
	            c = y[P[k]];
	            xj[j] = 0;
	            y[P[k]] = 0;
	            if(k<=i) { Uj[e] = k; Uv[e] = c;   ++e; }
	            else     { Lj[a] = P[k]; Lv[a] = c/d; ++a; }
	        }
	        Li[i+1] = a;
	        Ui[i+1] = e;
	    }
	    for(j=Lj.length-1;j!==-1;--j) { Lj[j] = Pinv[Lj[j]]; }
	    return {L:L, U:U, P:P, Pinv:Pinv};
	}
	numeric.ccsLUP = numeric.ccsLUP0;
	
	numeric.ccsDim = function ccsDim(A) { return [numeric.sup(A[1])+1,A[0].length-1]; }
	numeric.ccsGetBlock = function ccsGetBlock(A,i,j) {
	    var s = numeric.ccsDim(A),m=s[0],n=s[1];
	    if(typeof i === "undefined") { i = numeric.linspace(0,m-1); }
	    else if(typeof i === "number") { i = [i]; }
	    if(typeof j === "undefined") { j = numeric.linspace(0,n-1); }
	    else if(typeof j === "number") { j = [j]; }
	    var p,p0,p1,P = i.length,q,Q = j.length,r,jq,ip;
	    var Bi = numeric.rep([n],0), Bj=[], Bv=[], B = [Bi,Bj,Bv];
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var x = numeric.rep([m],0),count=0,flags = numeric.rep([m],0);
	    for(q=0;q<Q;++q) {
	        jq = j[q];
	        var q0 = Ai[jq];
	        var q1 = Ai[jq+1];
	        for(p=q0;p<q1;++p) {
	            r = Aj[p];
	            flags[r] = 1;
	            x[r] = Av[p];
	        }
	        for(p=0;p<P;++p) {
	            ip = i[p];
	            if(flags[ip]) {
	                Bj[count] = p;
	                Bv[count] = x[i[p]];
	                ++count;
	            }
	        }
	        for(p=q0;p<q1;++p) {
	            r = Aj[p];
	            flags[r] = 0;
	        }
	        Bi[q+1] = count;
	    }
	    return B;
	}
	
	numeric.ccsDot = function ccsDot(A,B) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var Bi = B[0], Bj = B[1], Bv = B[2];
	    var sA = numeric.ccsDim(A), sB = numeric.ccsDim(B);
	    var m = sA[0], n = sA[1], o = sB[1];
	    var x = numeric.rep([m],0), flags = numeric.rep([m],0), xj = Array(m);
	    var Ci = numeric.rep([o],0), Cj = [], Cv = [], C = [Ci,Cj,Cv];
	    var i,j,k,j0,j1,i0,i1,l,p,a,b;
	    for(k=0;k!==o;++k) {
	        j0 = Bi[k];
	        j1 = Bi[k+1];
	        p = 0;
	        for(j=j0;j<j1;++j) {
	            a = Bj[j];
	            b = Bv[j];
	            i0 = Ai[a];
	            i1 = Ai[a+1];
	            for(i=i0;i<i1;++i) {
	                l = Aj[i];
	                if(flags[l]===0) {
	                    xj[p] = l;
	                    flags[l] = 1;
	                    p = p+1;
	                }
	                x[l] = x[l] + Av[i]*b;
	            }
	        }
	        j0 = Ci[k];
	        j1 = j0+p;
	        Ci[k+1] = j1;
	        for(j=p-1;j!==-1;--j) {
	            b = j0+j;
	            i = xj[j];
	            Cj[b] = i;
	            Cv[b] = x[i];
	            flags[i] = 0;
	            x[i] = 0;
	        }
	        Ci[k+1] = Ci[k]+p;
	    }
	    return C;
	}
	
	numeric.ccsLUPSolve = function ccsLUPSolve(LUP,B) {
	    var L = LUP.L, U = LUP.U, P = LUP.P;
	    var Bi = B[0];
	    var flag = false;
	    if(typeof Bi !== "object") { B = [[0,B.length],numeric.linspace(0,B.length-1),B]; Bi = B[0]; flag = true; }
	    var Bj = B[1], Bv = B[2];
	    var n = L[0].length-1, m = Bi.length-1;
	    var x = numeric.rep([n],0), xj = Array(n);
	    var b = numeric.rep([n],0), bj = Array(n);
	    var Xi = numeric.rep([m+1],0), Xj = [], Xv = [];
	    var sol = numeric.ccsTSolve;
	    var i,j,j0,j1,k,J,N=0;
	    for(i=0;i<m;++i) {
	        k = 0;
	        j0 = Bi[i];
	        j1 = Bi[i+1];
	        for(j=j0;j<j1;++j) { 
	            J = LUP.Pinv[Bj[j]];
	            bj[k] = J;
	            b[J] = Bv[j];
	            ++k;
	        }
	        bj.length = k;
	        sol(L,b,x,bj,xj);
	        for(j=bj.length-1;j!==-1;--j) b[bj[j]] = 0;
	        sol(U,x,b,xj,bj);
	        if(flag) return b;
	        for(j=xj.length-1;j!==-1;--j) x[xj[j]] = 0;
	        for(j=bj.length-1;j!==-1;--j) {
	            J = bj[j];
	            Xj[N] = J;
	            Xv[N] = b[J];
	            b[J] = 0;
	            ++N;
	        }
	        Xi[i+1] = N;
	    }
	    return [Xi,Xj,Xv];
	}
	
	numeric.ccsbinop = function ccsbinop(body,setup) {
	    if(typeof setup === "undefined") setup='';
	    return Function('X','Y',
	            'var Xi = X[0], Xj = X[1], Xv = X[2];\n'+
	            'var Yi = Y[0], Yj = Y[1], Yv = Y[2];\n'+
	            'var n = Xi.length-1,m = Math.max(numeric.sup(Xj),numeric.sup(Yj))+1;\n'+
	            'var Zi = numeric.rep([n+1],0), Zj = [], Zv = [];\n'+
	            'var x = numeric.rep([m],0),y = numeric.rep([m],0);\n'+
	            'var xk,yk,zk;\n'+
	            'var i,j,j0,j1,k,p=0;\n'+
	            setup+
	            'for(i=0;i<n;++i) {\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Xj[j];\n'+
	            '    x[k] = 1;\n'+
	            '    Zj[p] = k;\n'+
	            '    ++p;\n'+
	            '  }\n'+
	            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Yj[j];\n'+
	            '    y[k] = Yv[j];\n'+
	            '    if(x[k] === 0) {\n'+
	            '      Zj[p] = k;\n'+
	            '      ++p;\n'+
	            '    }\n'+
	            '  }\n'+
	            '  Zi[i+1] = p;\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) x[Xj[j]] = Xv[j];\n'+
	            '  j0 = Zi[i]; j1 = Zi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) {\n'+
	            '    k = Zj[j];\n'+
	            '    xk = x[k];\n'+
	            '    yk = y[k];\n'+
	            body+'\n'+
	            '    Zv[j] = zk;\n'+
	            '  }\n'+
	            '  j0 = Xi[i]; j1 = Xi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) x[Xj[j]] = 0;\n'+
	            '  j0 = Yi[i]; j1 = Yi[i+1];\n'+
	            '  for(j=j0;j!==j1;++j) y[Yj[j]] = 0;\n'+
	            '}\n'+
	            'return [Zi,Zj,Zv];'
	            );
	};
	
	(function() {
	    var k,A,B,C;
	    for(k in numeric.ops2) {
	        if(isFinite(eval('1'+numeric.ops2[k]+'0'))) A = '[Y[0],Y[1],numeric.'+k+'(X,Y[2])]';
	        else A = 'NaN';
	        if(isFinite(eval('0'+numeric.ops2[k]+'1'))) B = '[X[0],X[1],numeric.'+k+'(X[2],Y)]';
	        else B = 'NaN';
	        if(isFinite(eval('1'+numeric.ops2[k]+'0')) && isFinite(eval('0'+numeric.ops2[k]+'1'))) C = 'numeric.ccs'+k+'MM(X,Y)';
	        else C = 'NaN';
	        numeric['ccs'+k+'MM'] = numeric.ccsbinop('zk = xk '+numeric.ops2[k]+'yk;');
	        numeric['ccs'+k] = Function('X','Y',
	                'if(typeof X === "number") return '+A+';\n'+
	                'if(typeof Y === "number") return '+B+';\n'+
	                'return '+C+';\n'
	                );
	    }
	}());
	
	numeric.ccsScatter = function ccsScatter(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var n = numeric.sup(Aj)+1,m=Ai.length;
	    var Ri = numeric.rep([n],0),Rj=Array(m), Rv = Array(m);
	    var counts = numeric.rep([n],0),i;
	    for(i=0;i<m;++i) counts[Aj[i]]++;
	    for(i=0;i<n;++i) Ri[i+1] = Ri[i] + counts[i];
	    var ptr = Ri.slice(0),k,Aii;
	    for(i=0;i<m;++i) {
	        Aii = Aj[i];
	        k = ptr[Aii];
	        Rj[k] = Ai[i];
	        Rv[k] = Av[i];
	        ptr[Aii]=ptr[Aii]+1;
	    }
	    return [Ri,Rj,Rv];
	}
	
	numeric.ccsGather = function ccsGather(A) {
	    var Ai = A[0], Aj = A[1], Av = A[2];
	    var n = Ai.length-1,m = Aj.length;
	    var Ri = Array(m), Rj = Array(m), Rv = Array(m);
	    var i,j,j0,j1,p;
	    p=0;
	    for(i=0;i<n;++i) {
	        j0 = Ai[i];
	        j1 = Ai[i+1];
	        for(j=j0;j!==j1;++j) {
	            Rj[p] = i;
	            Ri[p] = Aj[j];
	            Rv[p] = Av[j];
	            ++p;
	        }
	    }
	    return [Ri,Rj,Rv];
	}
	
	// The following sparse linear algebra routines are deprecated.
	
	numeric.sdim = function dim(A,ret,k) {
	    if(typeof ret === "undefined") { ret = []; }
	    if(typeof A !== "object") return ret;
	    if(typeof k === "undefined") { k=0; }
	    if(!(k in ret)) { ret[k] = 0; }
	    if(A.length > ret[k]) ret[k] = A.length;
	    var i;
	    for(i in A) {
	        if(A.hasOwnProperty(i)) dim(A[i],ret,k+1);
	    }
	    return ret;
	};
	
	numeric.sclone = function clone(A,k,n) {
	    if(typeof k === "undefined") { k=0; }
	    if(typeof n === "undefined") { n = numeric.sdim(A).length; }
	    var i,ret = Array(A.length);
	    if(k === n-1) {
	        for(i in A) { if(A.hasOwnProperty(i)) ret[i] = A[i]; }
	        return ret;
	    }
	    for(i in A) {
	        if(A.hasOwnProperty(i)) ret[i] = clone(A[i],k+1,n);
	    }
	    return ret;
	}
	
	numeric.sdiag = function diag(d) {
	    var n = d.length,i,ret = Array(n),i1,i2,i3;
	    for(i=n-1;i>=1;i-=2) {
	        i1 = i-1;
	        ret[i] = []; ret[i][i] = d[i];
	        ret[i1] = []; ret[i1][i1] = d[i1];
	    }
	    if(i===0) { ret[0] = []; ret[0][0] = d[i]; }
	    return ret;
	}
	
	numeric.sidentity = function identity(n) { return numeric.sdiag(numeric.rep([n],1)); }
	
	numeric.stranspose = function transpose(A) {
	    var ret = [], n = A.length, i,j,Ai;
	    for(i in A) {
	        if(!(A.hasOwnProperty(i))) continue;
	        Ai = A[i];
	        for(j in Ai) {
	            if(!(Ai.hasOwnProperty(j))) continue;
	            if(typeof ret[j] !== "object") { ret[j] = []; }
	            ret[j][i] = Ai[j];
	        }
	    }
	    return ret;
	}
	
	numeric.sLUP = function LUP(A,tol) {
	    throw new Error("The function numeric.sLUP had a bug in it and has been removed. Please use the new numeric.ccsLUP function instead.");
	};
	
	numeric.sdotMM = function dotMM(A,B) {
	    var p = A.length, q = B.length, BT = numeric.stranspose(B), r = BT.length, Ai, BTk;
	    var i,j,k,accum;
	    var ret = Array(p),reti;
	    for(i=p-1;i>=0;i--) {
	        reti = [];
	        Ai = A[i];
	        for(k=r-1;k>=0;k--) {
	            accum = 0;
	            BTk = BT[k];
	            for(j in Ai) {
	                if(!(Ai.hasOwnProperty(j))) continue;
	                if(j in BTk) { accum += Ai[j]*BTk[j]; }
	            }
	            if(accum) reti[k] = accum;
	        }
	        ret[i] = reti;
	    }
	    return ret;
	}
	
	numeric.sdotMV = function dotMV(A,x) {
	    var p = A.length, Ai, i,j;
	    var ret = Array(p), accum;
	    for(i=p-1;i>=0;i--) {
	        Ai = A[i];
	        accum = 0;
	        for(j in Ai) {
	            if(!(Ai.hasOwnProperty(j))) continue;
	            if(x[j]) accum += Ai[j]*x[j];
	        }
	        if(accum) ret[i] = accum;
	    }
	    return ret;
	}
	
	numeric.sdotVM = function dotMV(x,A) {
	    var i,j,Ai,alpha;
	    var ret = [], accum;
	    for(i in x) {
	        if(!x.hasOwnProperty(i)) continue;
	        Ai = A[i];
	        alpha = x[i];
	        for(j in Ai) {
	            if(!Ai.hasOwnProperty(j)) continue;
	            if(!ret[j]) { ret[j] = 0; }
	            ret[j] += alpha*Ai[j];
	        }
	    }
	    return ret;
	}
	
	numeric.sdotVV = function dotVV(x,y) {
	    var i,ret=0;
	    for(i in x) { if(x[i] && y[i]) ret+= x[i]*y[i]; }
	    return ret;
	}
	
	numeric.sdot = function dot(A,B) {
	    var m = numeric.sdim(A).length, n = numeric.sdim(B).length;
	    var k = m*1000+n;
	    switch(k) {
	    case 0: return A*B;
	    case 1001: return numeric.sdotVV(A,B);
	    case 2001: return numeric.sdotMV(A,B);
	    case 1002: return numeric.sdotVM(A,B);
	    case 2002: return numeric.sdotMM(A,B);
	    default: throw new Error('numeric.sdot not implemented for tensors of order '+m+' and '+n);
	    }
	}
	
	numeric.sscatter = function scatter(V) {
	    var n = V[0].length, Vij, i, j, m = V.length, A = [], Aj;
	    for(i=n-1;i>=0;--i) {
	        if(!V[m-1][i]) continue;
	        Aj = A;
	        for(j=0;j<m-2;j++) {
	            Vij = V[j][i];
	            if(!Aj[Vij]) Aj[Vij] = [];
	            Aj = Aj[Vij];
	        }
	        Aj[V[j][i]] = V[j+1][i];
	    }
	    return A;
	}
	
	numeric.sgather = function gather(A,ret,k) {
	    if(typeof ret === "undefined") ret = [];
	    if(typeof k === "undefined") k = [];
	    var n,i,Ai;
	    n = k.length;
	    for(i in A) {
	        if(A.hasOwnProperty(i)) {
	            k[n] = parseInt(i);
	            Ai = A[i];
	            if(typeof Ai === "number") {
	                if(Ai) {
	                    if(ret.length === 0) {
	                        for(i=n+1;i>=0;--i) ret[i] = [];
	                    }
	                    for(i=n;i>=0;--i) ret[i].push(k[i]);
	                    ret[n+1].push(Ai);
	                }
	            } else gather(Ai,ret,k);
	        }
	    }
	    if(k.length>n) k.pop();
	    return ret;
	}
	
	// 6. Coordinate matrices
	numeric.cLU = function LU(A) {
	    var I = A[0], J = A[1], V = A[2];
	    var p = I.length, m=0, i,j,k,a,b,c;
	    for(i=0;i<p;i++) if(I[i]>m) m=I[i];
	    m++;
	    var L = Array(m), U = Array(m), left = numeric.rep([m],Infinity), right = numeric.rep([m],-Infinity);
	    var Ui, Uj,alpha;
	    for(k=0;k<p;k++) {
	        i = I[k];
	        j = J[k];
	        if(j<left[i]) left[i] = j;
	        if(j>right[i]) right[i] = j;
	    }
	    for(i=0;i<m-1;i++) { if(right[i] > right[i+1]) right[i+1] = right[i]; }
	    for(i=m-1;i>=1;i--) { if(left[i]<left[i-1]) left[i-1] = left[i]; }
	    var countL = 0, countU = 0;
	    for(i=0;i<m;i++) {
	        U[i] = numeric.rep([right[i]-left[i]+1],0);
	        L[i] = numeric.rep([i-left[i]],0);
	        countL += i-left[i]+1;
	        countU += right[i]-i+1;
	    }
	    for(k=0;k<p;k++) { i = I[k]; U[i][J[k]-left[i]] = V[k]; }
	    for(i=0;i<m-1;i++) {
	        a = i-left[i];
	        Ui = U[i];
	        for(j=i+1;left[j]<=i && j<m;j++) {
	            b = i-left[j];
	            c = right[i]-i;
	            Uj = U[j];
	            alpha = Uj[b]/Ui[a];
	            if(alpha) {
	                for(k=1;k<=c;k++) { Uj[k+b] -= alpha*Ui[k+a]; }
	                L[j][i-left[j]] = alpha;
	            }
	        }
	    }
	    var Ui = [], Uj = [], Uv = [], Li = [], Lj = [], Lv = [];
	    var p,q,foo;
	    p=0; q=0;
	    for(i=0;i<m;i++) {
	        a = left[i];
	        b = right[i];
	        foo = U[i];
	        for(j=i;j<=b;j++) {
	            if(foo[j-a]) {
	                Ui[p] = i;
	                Uj[p] = j;
	                Uv[p] = foo[j-a];
	                p++;
	            }
	        }
	        foo = L[i];
	        for(j=a;j<i;j++) {
	            if(foo[j-a]) {
	                Li[q] = i;
	                Lj[q] = j;
	                Lv[q] = foo[j-a];
	                q++;
	            }
	        }
	        Li[q] = i;
	        Lj[q] = i;
	        Lv[q] = 1;
	        q++;
	    }
	    return {U:[Ui,Uj,Uv], L:[Li,Lj,Lv]};
	};
	
	numeric.cLUsolve = function LUsolve(lu,b) {
	    var L = lu.L, U = lu.U, ret = numeric.clone(b);
	    var Li = L[0], Lj = L[1], Lv = L[2];
	    var Ui = U[0], Uj = U[1], Uv = U[2];
	    var p = Ui.length, q = Li.length;
	    var m = ret.length,i,j,k;
	    k = 0;
	    for(i=0;i<m;i++) {
	        while(Lj[k] < i) {
	            ret[i] -= Lv[k]*ret[Lj[k]];
	            k++;
	        }
	        k++;
	    }
	    k = p-1;
	    for(i=m-1;i>=0;i--) {
	        while(Uj[k] > i) {
	            ret[i] -= Uv[k]*ret[Uj[k]];
	            k--;
	        }
	        ret[i] /= Uv[k];
	        k--;
	    }
	    return ret;
	};
	
	numeric.cgrid = function grid(n,shape) {
	    if(typeof n === "number") n = [n,n];
	    var ret = numeric.rep(n,-1);
	    var i,j,count;
	    if(typeof shape !== "function") {
	        switch(shape) {
	        case 'L':
	            shape = function(i,j) { return (i>=n[0]/2 || j<n[1]/2); }
	            break;
	        default:
	            shape = function(i,j) { return true; };
	            break;
	        }
	    }
	    count=0;
	    for(i=1;i<n[0]-1;i++) for(j=1;j<n[1]-1;j++) 
	        if(shape(i,j)) {
	            ret[i][j] = count;
	            count++;
	        }
	    return ret;
	}
	
	numeric.cdelsq = function delsq(g) {
	    var dir = [[-1,0],[0,-1],[0,1],[1,0]];
	    var s = numeric.dim(g), m = s[0], n = s[1], i,j,k,p,q;
	    var Li = [], Lj = [], Lv = [];
	    for(i=1;i<m-1;i++) for(j=1;j<n-1;j++) {
	        if(g[i][j]<0) continue;
	        for(k=0;k<4;k++) {
	            p = i+dir[k][0];
	            q = j+dir[k][1];
	            if(g[p][q]<0) continue;
	            Li.push(g[i][j]);
	            Lj.push(g[p][q]);
	            Lv.push(-1);
	        }
	        Li.push(g[i][j]);
	        Lj.push(g[i][j]);
	        Lv.push(4);
	    }
	    return [Li,Lj,Lv];
	}
	
	numeric.cdotMV = function dotMV(A,x) {
	    var ret, Ai = A[0], Aj = A[1], Av = A[2],k,p=Ai.length,N;
	    N=0;
	    for(k=0;k<p;k++) { if(Ai[k]>N) N = Ai[k]; }
	    N++;
	    ret = numeric.rep([N],0);
	    for(k=0;k<p;k++) { ret[Ai[k]]+=Av[k]*x[Aj[k]]; }
	    return ret;
	}
	
	// 7. Splines
	
	numeric.Spline = function Spline(x,yl,yr,kl,kr) { this.x = x; this.yl = yl; this.yr = yr; this.kl = kl; this.kr = kr; }
	numeric.Spline.prototype._at = function _at(x1,p) {
	    var x = this.x;
	    var yl = this.yl;
	    var yr = this.yr;
	    var kl = this.kl;
	    var kr = this.kr;
	    var x1,a,b,t;
	    var add = numeric.add, sub = numeric.sub, mul = numeric.mul;
	    a = sub(mul(kl[p],x[p+1]-x[p]),sub(yr[p+1],yl[p]));
	    b = add(mul(kr[p+1],x[p]-x[p+1]),sub(yr[p+1],yl[p]));
	    t = (x1-x[p])/(x[p+1]-x[p]);
	    var s = t*(1-t);
	    return add(add(add(mul(1-t,yl[p]),mul(t,yr[p+1])),mul(a,s*(1-t))),mul(b,s*t));
	}
	numeric.Spline.prototype.at = function at(x0) {
	    if(typeof x0 === "number") {
	        var x = this.x;
	        var n = x.length;
	        var p,q,mid,floor = Math.floor,a,b,t;
	        p = 0;
	        q = n-1;
	        while(q-p>1) {
	            mid = floor((p+q)/2);
	            if(x[mid] <= x0) p = mid;
	            else q = mid;
	        }
	        return this._at(x0,p);
	    }
	    var n = x0.length, i, ret = Array(n);
	    for(i=n-1;i!==-1;--i) ret[i] = this.at(x0[i]);
	    return ret;
	}
	numeric.Spline.prototype.diff = function diff() {
	    var x = this.x;
	    var yl = this.yl;
	    var yr = this.yr;
	    var kl = this.kl;
	    var kr = this.kr;
	    var n = yl.length;
	    var i,dx,dy;
	    var zl = kl, zr = kr, pl = Array(n), pr = Array(n);
	    var add = numeric.add, mul = numeric.mul, div = numeric.div, sub = numeric.sub;
	    for(i=n-1;i!==-1;--i) {
	        dx = x[i+1]-x[i];
	        dy = sub(yr[i+1],yl[i]);
	        pl[i] = div(add(mul(dy, 6),mul(kl[i],-4*dx),mul(kr[i+1],-2*dx)),dx*dx);
	        pr[i+1] = div(add(mul(dy,-6),mul(kl[i], 2*dx),mul(kr[i+1], 4*dx)),dx*dx);
	    }
	    return new numeric.Spline(x,zl,zr,pl,pr);
	}
	numeric.Spline.prototype.roots = function roots() {
	    function sqr(x) { return x*x; }
	    function heval(y0,y1,k0,k1,x) {
	        var A = k0*2-(y1-y0);
	        var B = -k1*2+(y1-y0);
	        var t = (x+1)*0.5;
	        var s = t*(1-t);
	        return (1-t)*y0+t*y1+A*s*(1-t)+B*s*t;
	    }
	    var ret = [];
	    var x = this.x, yl = this.yl, yr = this.yr, kl = this.kl, kr = this.kr;
	    if(typeof yl[0] === "number") {
	        yl = [yl];
	        yr = [yr];
	        kl = [kl];
	        kr = [kr];
	    }
	    var m = yl.length,n=x.length-1,i,j,k,y,s,t;
	    var ai,bi,ci,di, ret = Array(m),ri,k0,k1,y0,y1,A,B,D,dx,cx,stops,z0,z1,zm,t0,t1,tm;
	    var sqrt = Math.sqrt;
	    for(i=0;i!==m;++i) {
	        ai = yl[i];
	        bi = yr[i];
	        ci = kl[i];
	        di = kr[i];
	        ri = [];
	        for(j=0;j!==n;j++) {
	            if(j>0 && bi[j]*ai[j]<0) ri.push(x[j]);
	            dx = (x[j+1]-x[j]);
	            cx = x[j];
	            y0 = ai[j];
	            y1 = bi[j+1];
	            k0 = ci[j]/dx;
	            k1 = di[j+1]/dx;
	            D = sqr(k0-k1+3*(y0-y1)) + 12*k1*y0;
	            A = k1+3*y0+2*k0-3*y1;
	            B = 3*(k1+k0+2*(y0-y1));
	            if(D<=0) {
	                z0 = A/B;
	                if(z0>x[j] && z0<x[j+1]) stops = [x[j],z0,x[j+1]];
	                else stops = [x[j],x[j+1]];
	            } else {
	                z0 = (A-sqrt(D))/B;
	                z1 = (A+sqrt(D))/B;
	                stops = [x[j]];
	                if(z0>x[j] && z0<x[j+1]) stops.push(z0);
	                if(z1>x[j] && z1<x[j+1]) stops.push(z1);
	                stops.push(x[j+1]);
	            }
	            t0 = stops[0];
	            z0 = this._at(t0,j);
	            for(k=0;k<stops.length-1;k++) {
	                t1 = stops[k+1];
	                z1 = this._at(t1,j);
	                if(z0 === 0) {
	                    ri.push(t0); 
	                    t0 = t1;
	                    z0 = z1;
	                    continue;
	                }
	                if(z1 === 0 || z0*z1>0) {
	                    t0 = t1;
	                    z0 = z1;
	                    continue;
	                }
	                var side = 0;
	                while(1) {
	                    tm = (z0*t1-z1*t0)/(z0-z1);
	                    if(tm <= t0 || tm >= t1) { break; }
	                    zm = this._at(tm,j);
	                    if(zm*z1>0) {
	                        t1 = tm;
	                        z1 = zm;
	                        if(side === -1) z0*=0.5;
	                        side = -1;
	                    } else if(zm*z0>0) {
	                        t0 = tm;
	                        z0 = zm;
	                        if(side === 1) z1*=0.5;
	                        side = 1;
	                    } else break;
	                }
	                ri.push(tm);
	                t0 = stops[k+1];
	                z0 = this._at(t0, j);
	            }
	            if(z1 === 0) ri.push(t1);
	        }
	        ret[i] = ri;
	    }
	    if(typeof this.yl[0] === "number") return ret[0];
	    return ret;
	}
	numeric.spline = function spline(x,y,k1,kn) {
	    var n = x.length, b = [], dx = [], dy = [];
	    var i;
	    var sub = numeric.sub,mul = numeric.mul,add = numeric.add;
	    for(i=n-2;i>=0;i--) { dx[i] = x[i+1]-x[i]; dy[i] = sub(y[i+1],y[i]); }
	    if(typeof k1 === "string" || typeof kn === "string") { 
	        k1 = kn = "periodic";
	    }
	    // Build sparse tridiagonal system
	    var T = [[],[],[]];
	    switch(typeof k1) {
	    case "undefined":
	        b[0] = mul(3/(dx[0]*dx[0]),dy[0]);
	        T[0].push(0,0);
	        T[1].push(0,1);
	        T[2].push(2/dx[0],1/dx[0]);
	        break;
	    case "string":
	        b[0] = add(mul(3/(dx[n-2]*dx[n-2]),dy[n-2]),mul(3/(dx[0]*dx[0]),dy[0]));
	        T[0].push(0,0,0);
	        T[1].push(n-2,0,1);
	        T[2].push(1/dx[n-2],2/dx[n-2]+2/dx[0],1/dx[0]);
	        break;
	    default:
	        b[0] = k1;
	        T[0].push(0);
	        T[1].push(0);
	        T[2].push(1);
	        break;
	    }
	    for(i=1;i<n-1;i++) {
	        b[i] = add(mul(3/(dx[i-1]*dx[i-1]),dy[i-1]),mul(3/(dx[i]*dx[i]),dy[i]));
	        T[0].push(i,i,i);
	        T[1].push(i-1,i,i+1);
	        T[2].push(1/dx[i-1],2/dx[i-1]+2/dx[i],1/dx[i]);
	    }
	    switch(typeof kn) {
	    case "undefined":
	        b[n-1] = mul(3/(dx[n-2]*dx[n-2]),dy[n-2]);
	        T[0].push(n-1,n-1);
	        T[1].push(n-2,n-1);
	        T[2].push(1/dx[n-2],2/dx[n-2]);
	        break;
	    case "string":
	        T[1][T[1].length-1] = 0;
	        break;
	    default:
	        b[n-1] = kn;
	        T[0].push(n-1);
	        T[1].push(n-1);
	        T[2].push(1);
	        break;
	    }
	    if(typeof b[0] !== "number") b = numeric.transpose(b);
	    else b = [b];
	    var k = Array(b.length);
	    if(typeof k1 === "string") {
	        for(i=k.length-1;i!==-1;--i) {
	            k[i] = numeric.ccsLUPSolve(numeric.ccsLUP(numeric.ccsScatter(T)),b[i]);
	            k[i][n-1] = k[i][0];
	        }
	    } else {
	        for(i=k.length-1;i!==-1;--i) {
	            k[i] = numeric.cLUsolve(numeric.cLU(T),b[i]);
	        }
	    }
	    if(typeof y[0] === "number") k = k[0];
	    else k = numeric.transpose(k);
	    return new numeric.Spline(x,y,y,k,k);
	}
	
	// 8. FFT
	numeric.fftpow2 = function fftpow2(x,y) {
	    var n = x.length;
	    if(n === 1) return;
	    var cos = Math.cos, sin = Math.sin, i,j;
	    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
	    j = n/2;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        xo[j] = x[i];
	        yo[j] = y[i];
	        --i;
	        xe[j] = x[i];
	        ye[j] = y[i];
	    }
	    fftpow2(xe,ye);
	    fftpow2(xo,yo);
	    j = n/2;
	    var t,k = (-6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        if(j === -1) j = n/2-1;
	        t = k*i;
	        ci = cos(t);
	        si = sin(t);
	        x[i] = xe[j] + ci*xo[j] - si*yo[j];
	        y[i] = ye[j] + ci*yo[j] + si*xo[j];
	    }
	}
	numeric._ifftpow2 = function _ifftpow2(x,y) {
	    var n = x.length;
	    if(n === 1) return;
	    var cos = Math.cos, sin = Math.sin, i,j;
	    var xe = Array(n/2), ye = Array(n/2), xo = Array(n/2), yo = Array(n/2);
	    j = n/2;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        xo[j] = x[i];
	        yo[j] = y[i];
	        --i;
	        xe[j] = x[i];
	        ye[j] = y[i];
	    }
	    _ifftpow2(xe,ye);
	    _ifftpow2(xo,yo);
	    j = n/2;
	    var t,k = (6.2831853071795864769252867665590057683943387987502116419/n),ci,si;
	    for(i=n-1;i!==-1;--i) {
	        --j;
	        if(j === -1) j = n/2-1;
	        t = k*i;
	        ci = cos(t);
	        si = sin(t);
	        x[i] = xe[j] + ci*xo[j] - si*yo[j];
	        y[i] = ye[j] + ci*yo[j] + si*xo[j];
	    }
	}
	numeric.ifftpow2 = function ifftpow2(x,y) {
	    numeric._ifftpow2(x,y);
	    numeric.diveq(x,x.length);
	    numeric.diveq(y,y.length);
	}
	numeric.convpow2 = function convpow2(ax,ay,bx,by) {
	    numeric.fftpow2(ax,ay);
	    numeric.fftpow2(bx,by);
	    var i,n = ax.length,axi,bxi,ayi,byi;
	    for(i=n-1;i!==-1;--i) {
	        axi = ax[i]; ayi = ay[i]; bxi = bx[i]; byi = by[i];
	        ax[i] = axi*bxi-ayi*byi;
	        ay[i] = axi*byi+ayi*bxi;
	    }
	    numeric.ifftpow2(ax,ay);
	}
	numeric.T.prototype.fft = function fft() {
	    var x = this.x, y = this.y;
	    var n = x.length, log = Math.log, log2 = log(2),
	        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
	    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
	    var k, c = (-3.141592653589793238462643383279502884197169399375105820/n),t;
	    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
	    for(k=0;k<n;k++) a[k] = x[k];
	    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
	    cx[0] = 1;
	    for(k=1;k<=m/2;k++) {
	        t = c*k*k;
	        cx[k] = cos(t);
	        cy[k] = sin(t);
	        cx[m-k] = cos(t);
	        cy[m-k] = sin(t)
	    }
	    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
	    X = X.mul(Y);
	    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
	    X = X.mul(Y);
	    X.x.length = n;
	    X.y.length = n;
	    return X;
	}
	numeric.T.prototype.ifft = function ifft() {
	    var x = this.x, y = this.y;
	    var n = x.length, log = Math.log, log2 = log(2),
	        p = Math.ceil(log(2*n-1)/log2), m = Math.pow(2,p);
	    var cx = numeric.rep([m],0), cy = numeric.rep([m],0), cos = Math.cos, sin = Math.sin;
	    var k, c = (3.141592653589793238462643383279502884197169399375105820/n),t;
	    var a = numeric.rep([m],0), b = numeric.rep([m],0),nhalf = Math.floor(n/2);
	    for(k=0;k<n;k++) a[k] = x[k];
	    if(typeof y !== "undefined") for(k=0;k<n;k++) b[k] = y[k];
	    cx[0] = 1;
	    for(k=1;k<=m/2;k++) {
	        t = c*k*k;
	        cx[k] = cos(t);
	        cy[k] = sin(t);
	        cx[m-k] = cos(t);
	        cy[m-k] = sin(t)
	    }
	    var X = new numeric.T(a,b), Y = new numeric.T(cx,cy);
	    X = X.mul(Y);
	    numeric.convpow2(X.x,X.y,numeric.clone(Y.x),numeric.neg(Y.y));
	    X = X.mul(Y);
	    X.x.length = n;
	    X.y.length = n;
	    return X.div(n);
	}
	
	//9. Unconstrained optimization
	numeric.gradient = function gradient(f,x) {
	    var n = x.length;
	    var f0 = f(x);
	    if(isNaN(f0)) throw new Error('gradient: f(x) is a NaN!');
	    var max = Math.max;
	    var i,x0 = numeric.clone(x),f1,f2, J = Array(n);
	    var div = numeric.div, sub = numeric.sub,errest,roundoff,max = Math.max,eps = 1e-3,abs = Math.abs, min = Math.min;
	    var t0,t1,t2,it=0,d1,d2,N;
	    for(i=0;i<n;i++) {
	        var h = max(1e-6*f0,1e-8);
	        while(1) {
	            ++it;
	            if(it>20) { throw new Error("Numerical gradient fails"); }
	            x0[i] = x[i]+h;
	            f1 = f(x0);
	            x0[i] = x[i]-h;
	            f2 = f(x0);
	            x0[i] = x[i];
	            if(isNaN(f1) || isNaN(f2)) { h/=16; continue; }
	            J[i] = (f1-f2)/(2*h);
	            t0 = x[i]-h;
	            t1 = x[i];
	            t2 = x[i]+h;
	            d1 = (f1-f0)/h;
	            d2 = (f0-f2)/h;
	            N = max(abs(J[i]),abs(f0),abs(f1),abs(f2),abs(t0),abs(t1),abs(t2),1e-8);
	            errest = min(max(abs(d1-J[i]),abs(d2-J[i]),abs(d1-d2))/N,h/N);
	            if(errest>eps) { h/=16; }
	            else break;
	            }
	    }
	    return J;
	}
	
	numeric.uncmin = function uncmin(f,x0,tol,gradient,maxit,callback,options) {
	    var grad = numeric.gradient;
	    if(typeof options === "undefined") { options = {}; }
	    if(typeof tol === "undefined") { tol = 1e-8; }
	    if(typeof gradient === "undefined") { gradient = function(x) { return grad(f,x); }; }
	    if(typeof maxit === "undefined") maxit = 1000;
	    x0 = numeric.clone(x0);
	    var n = x0.length;
	    var f0 = f(x0),f1,df0;
	    if(isNaN(f0)) throw new Error('uncmin: f(x0) is a NaN!');
	    var max = Math.max, norm2 = numeric.norm2;
	    tol = max(tol,numeric.epsilon);
	    var step,g0,g1,H1 = options.Hinv || numeric.identity(n);
	    var dot = numeric.dot, inv = numeric.inv, sub = numeric.sub, add = numeric.add, ten = numeric.tensor, div = numeric.div, mul = numeric.mul;
	    var all = numeric.all, isfinite = numeric.isFinite, neg = numeric.neg;
	    var it=0,i,s,x1,y,Hy,Hs,ys,i0,t,nstep,t1,t2;
	    var msg = "";
	    g0 = gradient(x0);
	    while(it<maxit) {
	        if(typeof callback === "function") { if(callback(it,x0,f0,g0,H1)) { msg = "Callback returned true"; break; } }
	        if(!all(isfinite(g0))) { msg = "Gradient has Infinity or NaN"; break; }
	        step = neg(dot(H1,g0));
	        if(!all(isfinite(step))) { msg = "Search direction has Infinity or NaN"; break; }
	        nstep = norm2(step);
	        if(nstep < tol) { msg="Newton step smaller than tol"; break; }
	        t = 1;
	        df0 = dot(g0,step);
	        // line search
	        x1 = x0;
	        while(it < maxit) {
	            if(t*nstep < tol) { break; }
	            s = mul(step,t);
	            x1 = add(x0,s);
	            f1 = f(x1);
	            if(f1-f0 >= 0.1*t*df0 || isNaN(f1)) {
	                t *= 0.5;
	                ++it;
	                continue;
	            }
	            break;
	        }
	        if(t*nstep < tol) { msg = "Line search step size smaller than tol"; break; }
	        if(it === maxit) { msg = "maxit reached during line search"; break; }
	        g1 = gradient(x1);
	        y = sub(g1,g0);
	        ys = dot(y,s);
	        Hy = dot(H1,y);
	        H1 = sub(add(H1,
	                mul(
	                        (ys+dot(y,Hy))/(ys*ys),
	                        ten(s,s)    )),
	                div(add(ten(Hy,s),ten(s,Hy)),ys));
	        x0 = x1;
	        f0 = f1;
	        g0 = g1;
	        ++it;
	    }
	    return {solution: x0, f: f0, gradient: g0, invHessian: H1, iterations:it, message: msg};
	}
	
	// 10. Ode solver (Dormand-Prince)
	numeric.Dopri = function Dopri(x,y,f,ymid,iterations,msg,events) {
	    this.x = x;
	    this.y = y;
	    this.f = f;
	    this.ymid = ymid;
	    this.iterations = iterations;
	    this.events = events;
	    this.message = msg;
	}
	numeric.Dopri.prototype._at = function _at(xi,j) {
	    function sqr(x) { return x*x; }
	    var sol = this;
	    var xs = sol.x;
	    var ys = sol.y;
	    var k1 = sol.f;
	    var ymid = sol.ymid;
	    var n = xs.length;
	    var x0,x1,xh,y0,y1,yh,xi;
	    var floor = Math.floor,h;
	    var c = 0.5;
	    var add = numeric.add, mul = numeric.mul,sub = numeric.sub, p,q,w;
	    x0 = xs[j];
	    x1 = xs[j+1];
	    y0 = ys[j];
	    y1 = ys[j+1];
	    h  = x1-x0;
	    xh = x0+c*h;
	    yh = ymid[j];
	    p = sub(k1[j  ],mul(y0,1/(x0-xh)+2/(x0-x1)));
	    q = sub(k1[j+1],mul(y1,1/(x1-xh)+2/(x1-x0)));
	    w = [sqr(xi - x1) * (xi - xh) / sqr(x0 - x1) / (x0 - xh),
	         sqr(xi - x0) * sqr(xi - x1) / sqr(x0 - xh) / sqr(x1 - xh),
	         sqr(xi - x0) * (xi - xh) / sqr(x1 - x0) / (x1 - xh),
	         (xi - x0) * sqr(xi - x1) * (xi - xh) / sqr(x0-x1) / (x0 - xh),
	         (xi - x1) * sqr(xi - x0) * (xi - xh) / sqr(x0-x1) / (x1 - xh)];
	    return add(add(add(add(mul(y0,w[0]),
	                           mul(yh,w[1])),
	                           mul(y1,w[2])),
	                           mul( p,w[3])),
	                           mul( q,w[4]));
	}
	numeric.Dopri.prototype.at = function at(x) {
	    var i,j,k,floor = Math.floor;
	    if(typeof x !== "number") {
	        var n = x.length, ret = Array(n);
	        for(i=n-1;i!==-1;--i) {
	            ret[i] = this.at(x[i]);
	        }
	        return ret;
	    }
	    var x0 = this.x;
	    i = 0; j = x0.length-1;
	    while(j-i>1) {
	        k = floor(0.5*(i+j));
	        if(x0[k] <= x) i = k;
	        else j = k;
	    }
	    return this._at(x,i);
	}
	
	numeric.dopri = function dopri(x0,x1,y0,f,tol,maxit,event) {
	    if(typeof tol === "undefined") { tol = 1e-6; }
	    if(typeof maxit === "undefined") { maxit = 1000; }
	    var xs = [x0], ys = [y0], k1 = [f(x0,y0)], k2,k3,k4,k5,k6,k7, ymid = [];
	    var A2 = 1/5;
	    var A3 = [3/40,9/40];
	    var A4 = [44/45,-56/15,32/9];
	    var A5 = [19372/6561,-25360/2187,64448/6561,-212/729];
	    var A6 = [9017/3168,-355/33,46732/5247,49/176,-5103/18656];
	    var b = [35/384,0,500/1113,125/192,-2187/6784,11/84];
	    var bm = [0.5*6025192743/30085553152,
	              0,
	              0.5*51252292925/65400821598,
	              0.5*-2691868925/45128329728,
	              0.5*187940372067/1594534317056,
	              0.5*-1776094331/19743644256,
	              0.5*11237099/235043384];
	    var c = [1/5,3/10,4/5,8/9,1,1];
	    var e = [-71/57600,0,71/16695,-71/1920,17253/339200,-22/525,1/40];
	    var i = 0,er,j;
	    var h = (x1-x0)/10;
	    var it = 0;
	    var add = numeric.add, mul = numeric.mul, y1,erinf;
	    var max = Math.max, min = Math.min, abs = Math.abs, norminf = numeric.norminf,pow = Math.pow;
	    var any = numeric.any, lt = numeric.lt, and = numeric.and, sub = numeric.sub;
	    var e0, e1, ev;
	    var ret = new numeric.Dopri(xs,ys,k1,ymid,-1,"");
	    if(typeof event === "function") e0 = event(x0,y0);
	    while(x0<x1 && it<maxit) {
	        ++it;
	        if(x0+h>x1) h = x1-x0;
	        k2 = f(x0+c[0]*h,                add(y0,mul(   A2*h,k1[i])));
	        k3 = f(x0+c[1]*h,            add(add(y0,mul(A3[0]*h,k1[i])),mul(A3[1]*h,k2)));
	        k4 = f(x0+c[2]*h,        add(add(add(y0,mul(A4[0]*h,k1[i])),mul(A4[1]*h,k2)),mul(A4[2]*h,k3)));
	        k5 = f(x0+c[3]*h,    add(add(add(add(y0,mul(A5[0]*h,k1[i])),mul(A5[1]*h,k2)),mul(A5[2]*h,k3)),mul(A5[3]*h,k4)));
	        k6 = f(x0+c[4]*h,add(add(add(add(add(y0,mul(A6[0]*h,k1[i])),mul(A6[1]*h,k2)),mul(A6[2]*h,k3)),mul(A6[3]*h,k4)),mul(A6[4]*h,k5)));
	        y1 = add(add(add(add(add(y0,mul(k1[i],h*b[0])),mul(k3,h*b[2])),mul(k4,h*b[3])),mul(k5,h*b[4])),mul(k6,h*b[5]));
	        k7 = f(x0+h,y1);
	        er = add(add(add(add(add(mul(k1[i],h*e[0]),mul(k3,h*e[2])),mul(k4,h*e[3])),mul(k5,h*e[4])),mul(k6,h*e[5])),mul(k7,h*e[6]));
	        if(typeof er === "number") erinf = abs(er);
	        else erinf = norminf(er);
	        if(erinf > tol) { // reject
	            h = 0.2*h*pow(tol/erinf,0.25);
	            if(x0+h === x0) {
	                ret.msg = "Step size became too small";
	                break;
	            }
	            continue;
	        }
	        ymid[i] = add(add(add(add(add(add(y0,
	                mul(k1[i],h*bm[0])),
	                mul(k3   ,h*bm[2])),
	                mul(k4   ,h*bm[3])),
	                mul(k5   ,h*bm[4])),
	                mul(k6   ,h*bm[5])),
	                mul(k7   ,h*bm[6]));
	        ++i;
	        xs[i] = x0+h;
	        ys[i] = y1;
	        k1[i] = k7;
	        if(typeof event === "function") {
	            var yi,xl = x0,xr = x0+0.5*h,xi;
	            e1 = event(xr,ymid[i-1]);
	            ev = and(lt(e0,0),lt(0,e1));
	            if(!any(ev)) { xl = xr; xr = x0+h; e0 = e1; e1 = event(xr,y1); ev = and(lt(e0,0),lt(0,e1)); }
	            if(any(ev)) {
	                var xc, yc, en,ei;
	                var side=0, sl = 1.0, sr = 1.0;
	                while(1) {
	                    if(typeof e0 === "number") xi = (sr*e1*xl-sl*e0*xr)/(sr*e1-sl*e0);
	                    else {
	                        xi = xr;
	                        for(j=e0.length-1;j!==-1;--j) {
	                            if(e0[j]<0 && e1[j]>0) xi = min(xi,(sr*e1[j]*xl-sl*e0[j]*xr)/(sr*e1[j]-sl*e0[j]));
	                        }
	                    }
	                    if(xi <= xl || xi >= xr) break;
	                    yi = ret._at(xi, i-1);
	                    ei = event(xi,yi);
	                    en = and(lt(e0,0),lt(0,ei));
	                    if(any(en)) {
	                        xr = xi;
	                        e1 = ei;
	                        ev = en;
	                        sr = 1.0;
	                        if(side === -1) sl *= 0.5;
	                        else sl = 1.0;
	                        side = -1;
	                    } else {
	                        xl = xi;
	                        e0 = ei;
	                        sl = 1.0;
	                        if(side === 1) sr *= 0.5;
	                        else sr = 1.0;
	                        side = 1;
	                    }
	                }
	                y1 = ret._at(0.5*(x0+xi),i-1);
	                ret.f[i] = f(xi,yi);
	                ret.x[i] = xi;
	                ret.y[i] = yi;
	                ret.ymid[i-1] = y1;
	                ret.events = ev;
	                ret.iterations = it;
	                return ret;
	            }
	        }
	        x0 += h;
	        y0 = y1;
	        e0 = e1;
	        h = min(0.8*h*pow(tol/erinf,0.25),4*h);
	    }
	    ret.iterations = it;
	    return ret;
	}
	
	// 11. Ax = b
	numeric.LU = function(A, fast) {
	  fast = fast || false;
	
	  var abs = Math.abs;
	  var i, j, k, absAjk, Akk, Ak, Pk, Ai;
	  var max;
	  var n = A.length, n1 = n-1;
	  var P = new Array(n);
	  if(!fast) A = numeric.clone(A);
	
	  for (k = 0; k < n; ++k) {
	    Pk = k;
	    Ak = A[k];
	    max = abs(Ak[k]);
	    for (j = k + 1; j < n; ++j) {
	      absAjk = abs(A[j][k]);
	      if (max < absAjk) {
	        max = absAjk;
	        Pk = j;
	      }
	    }
	    P[k] = Pk;
	
	    if (Pk != k) {
	      A[k] = A[Pk];
	      A[Pk] = Ak;
	      Ak = A[k];
	    }
	
	    Akk = Ak[k];
	
	    for (i = k + 1; i < n; ++i) {
	      A[i][k] /= Akk;
	    }
	
	    for (i = k + 1; i < n; ++i) {
	      Ai = A[i];
	      for (j = k + 1; j < n1; ++j) {
	        Ai[j] -= Ai[k] * Ak[j];
	        ++j;
	        Ai[j] -= Ai[k] * Ak[j];
	      }
	      if(j===n1) Ai[j] -= Ai[k] * Ak[j];
	    }
	  }
	
	  return {
	    LU: A,
	    P:  P
	  };
	}
	
	numeric.LUsolve = function LUsolve(LUP, b) {
	  var i, j;
	  var LU = LUP.LU;
	  var n   = LU.length;
	  var x = numeric.clone(b);
	  var P   = LUP.P;
	  var Pi, LUi, LUii, tmp;
	
	  for (i=n-1;i!==-1;--i) x[i] = b[i];
	  for (i = 0; i < n; ++i) {
	    Pi = P[i];
	    if (P[i] !== i) {
	      tmp = x[i];
	      x[i] = x[Pi];
	      x[Pi] = tmp;
	    }
	
	    LUi = LU[i];
	    for (j = 0; j < i; ++j) {
	      x[i] -= x[j] * LUi[j];
	    }
	  }
	
	  for (i = n - 1; i >= 0; --i) {
	    LUi = LU[i];
	    for (j = i + 1; j < n; ++j) {
	      x[i] -= x[j] * LUi[j];
	    }
	
	    x[i] /= LUi[i];
	  }
	
	  return x;
	}
	
	numeric.solve = function solve(A,b,fast) { return numeric.LUsolve(numeric.LU(A,fast), b); }
	
	// 12. Linear programming
	numeric.echelonize = function echelonize(A) {
	    var s = numeric.dim(A), m = s[0], n = s[1];
	    var I = numeric.identity(m);
	    var P = Array(m);
	    var i,j,k,l,Ai,Ii,Z,a;
	    var abs = Math.abs;
	    var diveq = numeric.diveq;
	    A = numeric.clone(A);
	    for(i=0;i<m;++i) {
	        k = 0;
	        Ai = A[i];
	        Ii = I[i];
	        for(j=1;j<n;++j) if(abs(Ai[k])<abs(Ai[j])) k=j;
	        P[i] = k;
	        diveq(Ii,Ai[k]);
	        diveq(Ai,Ai[k]);
	        for(j=0;j<m;++j) if(j!==i) {
	            Z = A[j]; a = Z[k];
	            for(l=n-1;l!==-1;--l) Z[l] -= Ai[l]*a;
	            Z = I[j];
	            for(l=m-1;l!==-1;--l) Z[l] -= Ii[l]*a;
	        }
	    }
	    return {I:I, A:A, P:P};
	}
	
	numeric.__solveLP = function __solveLP(c,A,b,tol,maxit,x,flag) {
	    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
	    var m = c.length, n = b.length,y;
	    var unbounded = false, cb,i0=0;
	    var alpha = 1.0;
	    var f0,df0,AT = numeric.transpose(A), svd = numeric.svd,transpose = numeric.transpose,leq = numeric.leq, sqrt = Math.sqrt, abs = Math.abs;
	    var muleq = numeric.muleq;
	    var norm = numeric.norminf, any = numeric.any,min = Math.min;
	    var all = numeric.all, gt = numeric.gt;
	    var p = Array(m), A0 = Array(n),e=numeric.rep([n],1), H;
	    var solve = numeric.solve, z = sub(b,dot(A,x)),count;
	    var dotcc = dot(c,c);
	    var g;
	    for(count=i0;count<maxit;++count) {
	        var i,j,d;
	        for(i=n-1;i!==-1;--i) A0[i] = div(A[i],z[i]);
	        var A1 = transpose(A0);
	        for(i=m-1;i!==-1;--i) p[i] = (/*x[i]+*/sum(A1[i]));
	        alpha = 0.25*abs(dotcc/dot(c,p));
	        var a1 = 100*sqrt(dotcc/dot(p,p));
	        if(!isFinite(alpha) || alpha>a1) alpha = a1;
	        g = add(c,mul(alpha,p));
	        H = dot(A1,A0);
	        for(i=m-1;i!==-1;--i) H[i][i] += 1;
	        d = solve(H,div(g,alpha),true);
	        var t0 = div(z,dot(A,d));
	        var t = 1.0;
	        for(i=n-1;i!==-1;--i) if(t0[i]<0) t = min(t,-0.999*t0[i]);
	        y = sub(x,mul(d,t));
	        z = sub(b,dot(A,y));
	        if(!all(gt(z,0))) return { solution: x, message: "", iterations: count };
	        x = y;
	        if(alpha<tol) return { solution: y, message: "", iterations: count };
	        if(flag) {
	            var s = dot(c,g), Ag = dot(A,g);
	            unbounded = true;
	            for(i=n-1;i!==-1;--i) if(s*Ag[i]<0) { unbounded = false; break; }
	        } else {
	            if(x[m-1]>=0) unbounded = false;
	            else unbounded = true;
	        }
	        if(unbounded) return { solution: y, message: "Unbounded", iterations: count };
	    }
	    return { solution: x, message: "maximum iteration count exceeded", iterations:count };
	}
	
	numeric._solveLP = function _solveLP(c,A,b,tol,maxit) {
	    var m = c.length, n = b.length,y;
	    var sum = numeric.sum, log = numeric.log, mul = numeric.mul, sub = numeric.sub, dot = numeric.dot, div = numeric.div, add = numeric.add;
	    var c0 = numeric.rep([m],0).concat([1]);
	    var J = numeric.rep([n,1],-1);
	    var A0 = numeric.blockMatrix([[A                   ,   J  ]]);
	    var b0 = b;
	    var y = numeric.rep([m],0).concat(Math.max(0,numeric.sup(numeric.neg(b)))+1);
	    var x0 = numeric.__solveLP(c0,A0,b0,tol,maxit,y,false);
	    var x = numeric.clone(x0.solution);
	    x.length = m;
	    var foo = numeric.inf(sub(b,dot(A,x)));
	    if(foo<0) { return { solution: NaN, message: "Infeasible", iterations: x0.iterations }; }
	    var ret = numeric.__solveLP(c, A, b, tol, maxit-x0.iterations, x, true);
	    ret.iterations += x0.iterations;
	    return ret;
	};
	
	numeric.solveLP = function solveLP(c,A,b,Aeq,beq,tol,maxit) {
	    if(typeof maxit === "undefined") maxit = 1000;
	    if(typeof tol === "undefined") tol = numeric.epsilon;
	    if(typeof Aeq === "undefined") return numeric._solveLP(c,A,b,tol,maxit);
	    var m = Aeq.length, n = Aeq[0].length, o = A.length;
	    var B = numeric.echelonize(Aeq);
	    var flags = numeric.rep([n],0);
	    var P = B.P;
	    var Q = [];
	    var i;
	    for(i=P.length-1;i!==-1;--i) flags[P[i]] = 1;
	    for(i=n-1;i!==-1;--i) if(flags[i]===0) Q.push(i);
	    var g = numeric.getRange;
	    var I = numeric.linspace(0,m-1), J = numeric.linspace(0,o-1);
	    var Aeq2 = g(Aeq,I,Q), A1 = g(A,J,P), A2 = g(A,J,Q), dot = numeric.dot, sub = numeric.sub;
	    var A3 = dot(A1,B.I);
	    var A4 = sub(A2,dot(A3,Aeq2)), b4 = sub(b,dot(A3,beq));
	    var c1 = Array(P.length), c2 = Array(Q.length);
	    for(i=P.length-1;i!==-1;--i) c1[i] = c[P[i]];
	    for(i=Q.length-1;i!==-1;--i) c2[i] = c[Q[i]];
	    var c4 = sub(c2,dot(c1,dot(B.I,Aeq2)));
	    var S = numeric._solveLP(c4,A4,b4,tol,maxit);
	    var x2 = S.solution;
	    if(x2!==x2) return S;
	    var x1 = dot(B.I,sub(beq,dot(Aeq2,x2)));
	    var x = Array(c.length);
	    for(i=P.length-1;i!==-1;--i) x[P[i]] = x1[i];
	    for(i=Q.length-1;i!==-1;--i) x[Q[i]] = x2[i];
	    return { solution: x, message:S.message, iterations: S.iterations };
	}
	
	numeric.MPStoLP = function MPStoLP(MPS) {
	    if(MPS instanceof String) { MPS.split('\n'); }
	    var state = 0;
	    var states = ['Initial state','NAME','ROWS','COLUMNS','RHS','BOUNDS','ENDATA'];
	    var n = MPS.length;
	    var i,j,z,N=0,rows = {}, sign = [], rl = 0, vars = {}, nv = 0;
	    var name;
	    var c = [], A = [], b = [];
	    function err(e) { throw new Error('MPStoLP: '+e+'\nLine '+i+': '+MPS[i]+'\nCurrent state: '+states[state]+'\n'); }
	    for(i=0;i<n;++i) {
	        z = MPS[i];
	        var w0 = z.match(/\S*/g);
	        var w = [];
	        for(j=0;j<w0.length;++j) if(w0[j]!=="") w.push(w0[j]);
	        if(w.length === 0) continue;
	        for(j=0;j<states.length;++j) if(z.substr(0,states[j].length) === states[j]) break;
	        if(j<states.length) {
	            state = j;
	            if(j===1) { name = w[1]; }
	            if(j===6) return { name:name, c:c, A:numeric.transpose(A), b:b, rows:rows, vars:vars };
	            continue;
	        }
	        switch(state) {
	        case 0: case 1: err('Unexpected line');
	        case 2: 
	            switch(w[0]) {
	            case 'N': if(N===0) N = w[1]; else err('Two or more N rows'); break;
	            case 'L': rows[w[1]] = rl; sign[rl] = 1; b[rl] = 0; ++rl; break;
	            case 'G': rows[w[1]] = rl; sign[rl] = -1;b[rl] = 0; ++rl; break;
	            case 'E': rows[w[1]] = rl; sign[rl] = 0;b[rl] = 0; ++rl; break;
	            default: err('Parse error '+numeric.prettyPrint(w));
	            }
	            break;
	        case 3:
	            if(!vars.hasOwnProperty(w[0])) { vars[w[0]] = nv; c[nv] = 0; A[nv] = numeric.rep([rl],0); ++nv; }
	            var p = vars[w[0]];
	            for(j=1;j<w.length;j+=2) {
	                if(w[j] === N) { c[p] = parseFloat(w[j+1]); continue; }
	                var q = rows[w[j]];
	                A[p][q] = (sign[q]<0?-1:1)*parseFloat(w[j+1]);
	            }
	            break;
	        case 4:
	            for(j=1;j<w.length;j+=2) b[rows[w[j]]] = (sign[rows[w[j]]]<0?-1:1)*parseFloat(w[j+1]);
	            break;
	        case 5: /*FIXME*/ break;
	        case 6: err('Internal error');
	        }
	    }
	    err('Reached end of file without ENDATA');
	}
	// seedrandom.js version 2.0.
	// Author: David Bau 4/2/2011
	//
	// Defines a method Math.seedrandom() that, when called, substitutes
	// an explicitly seeded RC4-based algorithm for Math.random().  Also
	// supports automatic seeding from local or network sources of entropy.
	//
	// Usage:
	//
	//   <script src=http://davidbau.com/encode/seedrandom-min.js></script>
	//
	//   Math.seedrandom('yipee'); Sets Math.random to a function that is
	//                             initialized using the given explicit seed.
	//
	//   Math.seedrandom();        Sets Math.random to a function that is
	//                             seeded using the current time, dom state,
	//                             and other accumulated local entropy.
	//                             The generated seed string is returned.
	//
	//   Math.seedrandom('yowza', true);
	//                             Seeds using the given explicit seed mixed
	//                             together with accumulated entropy.
	//
	//   <script src="http://bit.ly/srandom-512"></script>
	//                             Seeds using physical random bits downloaded
	//                             from random.org.
	//
	//   <script src="https://jsonlib.appspot.com/urandom?callback=Math.seedrandom">
	//   </script>                 Seeds using urandom bits from call.jsonlib.com,
	//                             which is faster than random.org.
	//
	// Examples:
	//
	//   Math.seedrandom("hello");            // Use "hello" as the seed.
	//   document.write(Math.random());       // Always 0.5463663768140734
	//   document.write(Math.random());       // Always 0.43973793770592234
	//   var rng1 = Math.random;              // Remember the current prng.
	//
	//   var autoseed = Math.seedrandom();    // New prng with an automatic seed.
	//   document.write(Math.random());       // Pretty much unpredictable.
	//
	//   Math.random = rng1;                  // Continue "hello" prng sequence.
	//   document.write(Math.random());       // Always 0.554769432473455
	//
	//   Math.seedrandom(autoseed);           // Restart at the previous seed.
	//   document.write(Math.random());       // Repeat the 'unpredictable' value.
	//
	// Notes:
	//
	// Each time seedrandom('arg') is called, entropy from the passed seed
	// is accumulated in a pool to help generate future seeds for the
	// zero-argument form of Math.seedrandom, so entropy can be injected over
	// time by calling seedrandom with explicit data repeatedly.
	//
	// On speed - This javascript implementation of Math.random() is about
	// 3-10x slower than the built-in Math.random() because it is not native
	// code, but this is typically fast enough anyway.  Seeding is more expensive,
	// especially if you use auto-seeding.  Some details (timings on Chrome 4):
	//
	// Our Math.random()            - avg less than 0.002 milliseconds per call
	// seedrandom('explicit')       - avg less than 0.5 milliseconds per call
	// seedrandom('explicit', true) - avg less than 2 milliseconds per call
	// seedrandom()                 - avg about 38 milliseconds per call
	//
	// LICENSE (BSD):
	//
	// Copyright 2010 David Bau, all rights reserved.
	//
	// Redistribution and use in source and binary forms, with or without
	// modification, are permitted provided that the following conditions are met:
	// 
	//   1. Redistributions of source code must retain the above copyright
	//      notice, this list of conditions and the following disclaimer.
	//
	//   2. Redistributions in binary form must reproduce the above copyright
	//      notice, this list of conditions and the following disclaimer in the
	//      documentation and/or other materials provided with the distribution.
	// 
	//   3. Neither the name of this module nor the names of its contributors may
	//      be used to endorse or promote products derived from this software
	//      without specific prior written permission.
	// 
	// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	//
	/**
	 * All code is in an anonymous closure to keep the global namespace clean.
	 *
	 * @param {number=} overflow 
	 * @param {number=} startdenom
	 */
	
	// Patched by Seb so that seedrandom.js does not pollute the Math object.
	// My tests suggest that doing Math.trouble = 1 makes Math lookups about 5%
	// slower.
	numeric.seedrandom = { pow:Math.pow, random:Math.random };
	
	(function (pool, math, width, chunks, significance, overflow, startdenom) {
	
	
	//
	// seedrandom()
	// This is the seedrandom function described above.
	//
	math['seedrandom'] = function seedrandom(seed, use_entropy) {
	  var key = [];
	  var arc4;
	
	  // Flatten the seed string or build one from local entropy if needed.
	  seed = mixkey(flatten(
	    use_entropy ? [seed, pool] :
	    arguments.length ? seed :
	    [new Date().getTime(), pool, window], 3), key);
	
	  // Use the seed to initialize an ARC4 generator.
	  arc4 = new ARC4(key);
	
	  // Mix the randomness into accumulated entropy.
	  mixkey(arc4.S, pool);
	
	  // Override Math.random
	
	  // This function returns a random double in [0, 1) that contains
	  // randomness in every bit of the mantissa of the IEEE 754 value.
	
	  math['random'] = function random() {  // Closure to return a random double:
	    var n = arc4.g(chunks);             // Start with a numerator n < 2 ^ 48
	    var d = startdenom;                 //   and denominator d = 2 ^ 48.
	    var x = 0;                          //   and no 'extra last byte'.
	    while (n < significance) {          // Fill up all significant digits by
	      n = (n + x) * width;              //   shifting numerator and
	      d *= width;                       //   denominator and generating a
	      x = arc4.g(1);                    //   new least-significant-byte.
	    }
	    while (n >= overflow) {             // To avoid rounding up, before adding
	      n /= 2;                           //   last byte, shift everything
	      d /= 2;                           //   right using integer math until
	      x >>>= 1;                         //   we have exactly the desired bits.
	    }
	    return (n + x) / d;                 // Form the number within [0, 1).
	  };
	
	  // Return the seed that was used
	  return seed;
	};
	
	//
	// ARC4
	//
	// An ARC4 implementation.  The constructor takes a key in the form of
	// an array of at most (width) integers that should be 0 <= x < (width).
	//
	// The g(count) method returns a pseudorandom integer that concatenates
	// the next (count) outputs from ARC4.  Its return value is a number x
	// that is in the range 0 <= x < (width ^ count).
	//
	/** @constructor */
	function ARC4(key) {
	  var t, u, me = this, keylen = key.length;
	  var i = 0, j = me.i = me.j = me.m = 0;
	  me.S = [];
	  me.c = [];
	
	  // The empty key [] is treated as [0].
	  if (!keylen) { key = [keylen++]; }
	
	  // Set up S using the standard key scheduling algorithm.
	  while (i < width) { me.S[i] = i++; }
	  for (i = 0; i < width; i++) {
	    t = me.S[i];
	    j = lowbits(j + t + key[i % keylen]);
	    u = me.S[j];
	    me.S[i] = u;
	    me.S[j] = t;
	  }
	
	  // The "g" method returns the next (count) outputs as one number.
	  me.g = function getnext(count) {
	    var s = me.S;
	    var i = lowbits(me.i + 1); var t = s[i];
	    var j = lowbits(me.j + t); var u = s[j];
	    s[i] = u;
	    s[j] = t;
	    var r = s[lowbits(t + u)];
	    while (--count) {
	      i = lowbits(i + 1); t = s[i];
	      j = lowbits(j + t); u = s[j];
	      s[i] = u;
	      s[j] = t;
	      r = r * width + s[lowbits(t + u)];
	    }
	    me.i = i;
	    me.j = j;
	    return r;
	  };
	  // For robust unpredictability discard an initial batch of values.
	  // See http://www.rsa.com/rsalabs/node.asp?id=2009
	  me.g(width);
	}
	
	//
	// flatten()
	// Converts an object tree to nested arrays of strings.
	//
	/** @param {Object=} result 
	  * @param {string=} prop
	  * @param {string=} typ */
	function flatten(obj, depth, result, prop, typ) {
	  result = [];
	  typ = typeof(obj);
	  if (depth && typ == 'object') {
	    for (prop in obj) {
	      if (prop.indexOf('S') < 5) {    // Avoid FF3 bug (local/sessionStorage)
	        try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
	      }
	    }
	  }
	  return (result.length ? result : obj + (typ != 'string' ? '\0' : ''));
	}
	
	//
	// mixkey()
	// Mixes a string seed into a key that is an array of integers, and
	// returns a shortened string seed that is equivalent to the result key.
	//
	/** @param {number=} smear 
	  * @param {number=} j */
	function mixkey(seed, key, smear, j) {
	  seed += '';                         // Ensure the seed is a string
	  smear = 0;
	  for (j = 0; j < seed.length; j++) {
	    key[lowbits(j)] =
	      lowbits((smear ^= key[lowbits(j)] * 19) + seed.charCodeAt(j));
	  }
	  seed = '';
	  for (j in key) { seed += String.fromCharCode(key[j]); }
	  return seed;
	}
	
	//
	// lowbits()
	// A quick "n mod width" for width a power of 2.
	//
	function lowbits(n) { return n & (width - 1); }
	
	//
	// The following constants are related to IEEE 754 limits.
	//
	startdenom = math.pow(width, chunks);
	significance = math.pow(2, significance);
	overflow = significance * 2;
	
	//
	// When seedrandom.js is loaded, we immediately mix a few bits
	// from the built-in RNG into the entropy pool.  Because we do
	// not want to intefere with determinstic PRNG state later,
	// seedrandom will not call math.random on its own again after
	// initialization.
	//
	mixkey(math.random(), pool);
	
	// End anonymous scope, and pass initial values.
	}(
	  [],   // pool: entropy pool starts empty
	  numeric.seedrandom, // math: package containing random, pow, and seedrandom
	  256,  // width: each RC4 output is 0 <= x < 256
	  6,    // chunks: at least six RC4 outputs for each double
	  52    // significance: there are 52 significant digits in a double
	  ));
	/* This file is a slightly modified version of quadprog.js from Alberto Santini.
	 * It has been slightly modified by Sébastien Loisel to make sure that it handles
	 * 0-based Arrays instead of 1-based Arrays.
	 * License is in resources/LICENSE.quadprog */
	(function(exports) {
	
	function base0to1(A) {
	    if(typeof A !== "object") { return A; }
	    var ret = [], i,n=A.length;
	    for(i=0;i<n;i++) ret[i+1] = base0to1(A[i]);
	    return ret;
	}
	function base1to0(A) {
	    if(typeof A !== "object") { return A; }
	    var ret = [], i,n=A.length;
	    for(i=1;i<n;i++) ret[i-1] = base1to0(A[i]);
	    return ret;
	}
	
	function dpori(a, lda, n) {
	    var i, j, k, kp1, t;
	
	    for (k = 1; k <= n; k = k + 1) {
	        a[k][k] = 1 / a[k][k];
	        t = -a[k][k];
	        //~ dscal(k - 1, t, a[1][k], 1);
	        for (i = 1; i < k; i = i + 1) {
	            a[i][k] = t * a[i][k];
	        }
	
	        kp1 = k + 1;
	        if (n < kp1) {
	            break;
	        }
	        for (j = kp1; j <= n; j = j + 1) {
	            t = a[k][j];
	            a[k][j] = 0;
	            //~ daxpy(k, t, a[1][k], 1, a[1][j], 1);
	            for (i = 1; i <= k; i = i + 1) {
	                a[i][j] = a[i][j] + (t * a[i][k]);
	            }
	        }
	    }
	
	}
	
	function dposl(a, lda, n, b) {
	    var i, k, kb, t;
	
	    for (k = 1; k <= n; k = k + 1) {
	        //~ t = ddot(k - 1, a[1][k], 1, b[1], 1);
	        t = 0;
	        for (i = 1; i < k; i = i + 1) {
	            t = t + (a[i][k] * b[i]);
	        }
	
	        b[k] = (b[k] - t) / a[k][k];
	    }
	
	    for (kb = 1; kb <= n; kb = kb + 1) {
	        k = n + 1 - kb;
	        b[k] = b[k] / a[k][k];
	        t = -b[k];
	        //~ daxpy(k - 1, t, a[1][k], 1, b[1], 1);
	        for (i = 1; i < k; i = i + 1) {
	            b[i] = b[i] + (t * a[i][k]);
	        }
	    }
	}
	
	function dpofa(a, lda, n, info) {
	    var i, j, jm1, k, t, s;
	
	    for (j = 1; j <= n; j = j + 1) {
	        info[1] = j;
	        s = 0;
	        jm1 = j - 1;
	        if (jm1 < 1) {
	            s = a[j][j] - s;
	            if (s <= 0) {
	                break;
	            }
	            a[j][j] = Math.sqrt(s);
	        } else {
	            for (k = 1; k <= jm1; k = k + 1) {
	                //~ t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
	                t = a[k][j];
	                for (i = 1; i < k; i = i + 1) {
	                    t = t - (a[i][j] * a[i][k]);
	                }
	                t = t / a[k][k];
	                a[k][j] = t;
	                s = s + t * t;
	            }
	            s = a[j][j] - s;
	            if (s <= 0) {
	                break;
	            }
	            a[j][j] = Math.sqrt(s);
	        }
	        info[1] = 0;
	    }
	}
	
	function qpgen2(dmat, dvec, fddmat, n, sol, crval, amat,
	    bvec, fdamat, q, meq, iact, nact, iter, work, ierr) {
	
	    var i, j, l, l1, info, it1, iwzv, iwrv, iwrm, iwsv, iwuv, nvl, r, iwnbv,
	        temp, sum, t1, tt, gc, gs, nu,
	        t1inf, t2min,
	        vsmall, tmpa, tmpb,
	        go;
	
	    r = Math.min(n, q);
	    l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;
	
	    vsmall = 1.0e-60;
	    do {
	        vsmall = vsmall + vsmall;
	        tmpa = 1 + 0.1 * vsmall;
	        tmpb = 1 + 0.2 * vsmall;
	    } while (tmpa <= 1 || tmpb <= 1);
	
	    for (i = 1; i <= n; i = i + 1) {
	        work[i] = dvec[i];
	    }
	    for (i = n + 1; i <= l; i = i + 1) {
	        work[i] = 0;
	    }
	    for (i = 1; i <= q; i = i + 1) {
	        iact[i] = 0;
	    }
	
	    info = [];
	
	    if (ierr[1] === 0) {
	        dpofa(dmat, fddmat, n, info);
	        if (info[1] !== 0) {
	            ierr[1] = 2;
	            return;
	        }
	        dposl(dmat, fddmat, n, dvec);
	        dpori(dmat, fddmat, n);
	    } else {
	        for (j = 1; j <= n; j = j + 1) {
	            sol[j] = 0;
	            for (i = 1; i <= j; i = i + 1) {
	                sol[j] = sol[j] + dmat[i][j] * dvec[i];
	            }
	        }
	        for (j = 1; j <= n; j = j + 1) {
	            dvec[j] = 0;
	            for (i = j; i <= n; i = i + 1) {
	                dvec[j] = dvec[j] + dmat[j][i] * sol[i];
	            }
	        }
	    }
	
	    crval[1] = 0;
	    for (j = 1; j <= n; j = j + 1) {
	        sol[j] = dvec[j];
	        crval[1] = crval[1] + work[j] * sol[j];
	        work[j] = 0;
	        for (i = j + 1; i <= n; i = i + 1) {
	            dmat[i][j] = 0;
	        }
	    }
	    crval[1] = -crval[1] / 2;
	    ierr[1] = 0;
	
	    iwzv = n;
	    iwrv = iwzv + n;
	    iwuv = iwrv + r;
	    iwrm = iwuv + r + 1;
	    iwsv = iwrm + (r * (r + 1)) / 2;
	    iwnbv = iwsv + q;
	
	    for (i = 1; i <= q; i = i + 1) {
	        sum = 0;
	        for (j = 1; j <= n; j = j + 1) {
	            sum = sum + amat[j][i] * amat[j][i];
	        }
	        work[iwnbv + i] = Math.sqrt(sum);
	    }
	    nact = 0;
	    iter[1] = 0;
	    iter[2] = 0;
	
	    function fn_goto_50() {
	        iter[1] = iter[1] + 1;
	
	        l = iwsv;
	        for (i = 1; i <= q; i = i + 1) {
	            l = l + 1;
	            sum = -bvec[i];
	            for (j = 1; j <= n; j = j + 1) {
	                sum = sum + amat[j][i] * sol[j];
	            }
	            if (Math.abs(sum) < vsmall) {
	                sum = 0;
	            }
	            if (i > meq) {
	                work[l] = sum;
	            } else {
	                work[l] = -Math.abs(sum);
	                if (sum > 0) {
	                    for (j = 1; j <= n; j = j + 1) {
	                        amat[j][i] = -amat[j][i];
	                    }
	                    bvec[i] = -bvec[i];
	                }
	            }
	        }
	
	        for (i = 1; i <= nact; i = i + 1) {
	            work[iwsv + iact[i]] = 0;
	        }
	
	        nvl = 0;
	        temp = 0;
	        for (i = 1; i <= q; i = i + 1) {
	            if (work[iwsv + i] < temp * work[iwnbv + i]) {
	                nvl = i;
	                temp = work[iwsv + i] / work[iwnbv + i];
	            }
	        }
	        if (nvl === 0) {
	            return 999;
	        }
	
	        return 0;
	    }
	
	    function fn_goto_55() {
	        for (i = 1; i <= n; i = i + 1) {
	            sum = 0;
	            for (j = 1; j <= n; j = j + 1) {
	                sum = sum + dmat[j][i] * amat[j][nvl];
	            }
	            work[i] = sum;
	        }
	
	        l1 = iwzv;
	        for (i = 1; i <= n; i = i + 1) {
	            work[l1 + i] = 0;
	        }
	        for (j = nact + 1; j <= n; j = j + 1) {
	            for (i = 1; i <= n; i = i + 1) {
	                work[l1 + i] = work[l1 + i] + dmat[i][j] * work[j];
	            }
	        }
	
	        t1inf = true;
	        for (i = nact; i >= 1; i = i - 1) {
	            sum = work[i];
	            l = iwrm + (i * (i + 3)) / 2;
	            l1 = l - i;
	            for (j = i + 1; j <= nact; j = j + 1) {
	                sum = sum - work[l] * work[iwrv + j];
	                l = l + j;
	            }
	            sum = sum / work[l1];
	            work[iwrv + i] = sum;
	            if (iact[i] < meq) {
	                // continue;
	                break;
	            }
	            if (sum < 0) {
	                // continue;
	                break;
	            }
	            t1inf = false;
	            it1 = i;
	        }
	
	        if (!t1inf) {
	            t1 = work[iwuv + it1] / work[iwrv + it1];
	            for (i = 1; i <= nact; i = i + 1) {
	                if (iact[i] < meq) {
	                    // continue;
	                    break;
	                }
	                if (work[iwrv + i] < 0) {
	                    // continue;
	                    break;
	                }
	                temp = work[iwuv + i] / work[iwrv + i];
	                if (temp < t1) {
	                    t1 = temp;
	                    it1 = i;
	                }
	            }
	        }
	
	        sum = 0;
	        for (i = iwzv + 1; i <= iwzv + n; i = i + 1) {
	            sum = sum + work[i] * work[i];
	        }
	        if (Math.abs(sum) <= vsmall) {
	            if (t1inf) {
	                ierr[1] = 1;
	                // GOTO 999
	                return 999;
	            } else {
	                for (i = 1; i <= nact; i = i + 1) {
	                    work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
	                }
	                work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;
	                // GOTO 700
	                return 700;
	            }
	        } else {
	            sum = 0;
	            for (i = 1; i <= n; i = i + 1) {
	                sum = sum + work[iwzv + i] * amat[i][nvl];
	            }
	            tt = -work[iwsv + nvl] / sum;
	            t2min = true;
	            if (!t1inf) {
	                if (t1 < tt) {
	                    tt = t1;
	                    t2min = false;
	                }
	            }
	
	            for (i = 1; i <= n; i = i + 1) {
	                sol[i] = sol[i] + tt * work[iwzv + i];
	                if (Math.abs(sol[i]) < vsmall) {
	                    sol[i] = 0;
	                }
	            }
	
	            crval[1] = crval[1] + tt * sum * (tt / 2 + work[iwuv + nact + 1]);
	            for (i = 1; i <= nact; i = i + 1) {
	                work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
	            }
	            work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;
	
	            if (t2min) {
	                nact = nact + 1;
	                iact[nact] = nvl;
	
	                l = iwrm + ((nact - 1) * nact) / 2 + 1;
	                for (i = 1; i <= nact - 1; i = i + 1) {
	                    work[l] = work[i];
	                    l = l + 1;
	                }
	
	                if (nact === n) {
	                    work[l] = work[n];
	                } else {
	                    for (i = n; i >= nact + 1; i = i - 1) {
	                        if (work[i] === 0) {
	                            // continue;
	                            break;
	                        }
	                        gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
	                        gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
	                        if (work[i - 1] >= 0) {
	                            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	                        } else {
	                            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	                        }
	                        gc = work[i - 1] / temp;
	                        gs = work[i] / temp;
	
	                        if (gc === 1) {
	                            // continue;
	                            break;
	                        }
	                        if (gc === 0) {
	                            work[i - 1] = gs * temp;
	                            for (j = 1; j <= n; j = j + 1) {
	                                temp = dmat[j][i - 1];
	                                dmat[j][i - 1] = dmat[j][i];
	                                dmat[j][i] = temp;
	                            }
	                        } else {
	                            work[i - 1] = temp;
	                            nu = gs / (1 + gc);
	                            for (j = 1; j <= n; j = j + 1) {
	                                temp = gc * dmat[j][i - 1] + gs * dmat[j][i];
	                                dmat[j][i] = nu * (dmat[j][i - 1] + temp) - dmat[j][i];
	                                dmat[j][i - 1] = temp;
	
	                            }
	                        }
	                    }
	                    work[l] = work[nact];
	                }
	            } else {
	                sum = -bvec[nvl];
	                for (j = 1; j <= n; j = j + 1) {
	                    sum = sum + sol[j] * amat[j][nvl];
	                }
	                if (nvl > meq) {
	                    work[iwsv + nvl] = sum;
	                } else {
	                    work[iwsv + nvl] = -Math.abs(sum);
	                    if (sum > 0) {
	                        for (j = 1; j <= n; j = j + 1) {
	                            amat[j][nvl] = -amat[j][nvl];
	                        }
	                        bvec[nvl] = -bvec[nvl];
	                    }
	                }
	                // GOTO 700
	                return 700;
	            }
	        }
	
	        return 0;
	    }
	
	    function fn_goto_797() {
	        l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
	        l1 = l + it1;
	        if (work[l1] === 0) {
	            // GOTO 798
	            return 798;
	        }
	        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
	        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
	        if (work[l1 - 1] >= 0) {
	            temp = Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	        } else {
	            temp = -Math.abs(gc * Math.sqrt(1 + gs * gs / (gc * gc)));
	        }
	        gc = work[l1 - 1] / temp;
	        gs = work[l1] / temp;
	
	        if (gc === 1) {
	            // GOTO 798
	            return 798;
	        }
	        if (gc === 0) {
	            for (i = it1 + 1; i <= nact; i = i + 1) {
	                temp = work[l1 - 1];
	                work[l1 - 1] = work[l1];
	                work[l1] = temp;
	                l1 = l1 + i;
	            }
	            for (i = 1; i <= n; i = i + 1) {
	                temp = dmat[i][it1];
	                dmat[i][it1] = dmat[i][it1 + 1];
	                dmat[i][it1 + 1] = temp;
	            }
	        } else {
	            nu = gs / (1 + gc);
	            for (i = it1 + 1; i <= nact; i = i + 1) {
	                temp = gc * work[l1 - 1] + gs * work[l1];
	                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
	                work[l1 - 1] = temp;
	                l1 = l1 + i;
	            }
	            for (i = 1; i <= n; i = i + 1) {
	                temp = gc * dmat[i][it1] + gs * dmat[i][it1 + 1];
	                dmat[i][it1 + 1] = nu * (dmat[i][it1] + temp) - dmat[i][it1 + 1];
	                dmat[i][it1] = temp;
	            }
	        }
	
	        return 0;
	    }
	
	    function fn_goto_798() {
	        l1 = l - it1;
	        for (i = 1; i <= it1; i = i + 1) {
	            work[l1] = work[l];
	            l = l + 1;
	            l1 = l1 + 1;
	        }
	
	        work[iwuv + it1] = work[iwuv + it1 + 1];
	        iact[it1] = iact[it1 + 1];
	        it1 = it1 + 1;
	        if (it1 < nact) {
	            // GOTO 797
	            return 797;
	        }
	
	        return 0;
	    }
	
	    function fn_goto_799() {
	        work[iwuv + nact] = work[iwuv + nact + 1];
	        work[iwuv + nact + 1] = 0;
	        iact[nact] = 0;
	        nact = nact - 1;
	        iter[2] = iter[2] + 1;
	
	        return 0;
	    }
	
	    go = 0;
	    while (true) {
	        go = fn_goto_50();
	        if (go === 999) {
	            return;
	        }
	        while (true) {
	            go = fn_goto_55();
	            if (go === 0) {
	                break;
	            }
	            if (go === 999) {
	                return;
	            }
	            if (go === 700) {
	                if (it1 === nact) {
	                    fn_goto_799();
	                } else {
	                    while (true) {
	                        fn_goto_797();
	                        go = fn_goto_798();
	                        if (go !== 797) {
	                            break;
	                        }
	                    }
	                    fn_goto_799();
	                }
	            }
	        }
	    }
	
	}
	
	function solveQP(Dmat, dvec, Amat, bvec, meq, factorized) {
	    Dmat = base0to1(Dmat);
	    dvec = base0to1(dvec);
	    Amat = base0to1(Amat);
	    var i, n, q,
	        nact, r,
	        crval = [], iact = [], sol = [], work = [], iter = [],
	        message;
	
	    meq = meq || 0;
	    factorized = factorized ? base0to1(factorized) : [undefined, 0];
	    bvec = bvec ? base0to1(bvec) : [];
	
	    // In Fortran the array index starts from 1
	    n = Dmat.length - 1;
	    q = Amat[1].length - 1;
	
	    if (!bvec) {
	        for (i = 1; i <= q; i = i + 1) {
	            bvec[i] = 0;
	        }
	    }
	    for (i = 1; i <= q; i = i + 1) {
	        iact[i] = 0;
	    }
	    nact = 0;
	    r = Math.min(n, q);
	    for (i = 1; i <= n; i = i + 1) {
	        sol[i] = 0;
	    }
	    crval[1] = 0;
	    for (i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i = i + 1) {
	        work[i] = 0;
	    }
	    for (i = 1; i <= 2; i = i + 1) {
	        iter[i] = 0;
	    }
	
	    qpgen2(Dmat, dvec, n, n, sol, crval, Amat,
	        bvec, n, q, meq, iact, nact, iter, work, factorized);
	
	    message = "";
	    if (factorized[1] === 1) {
	        message = "constraints are inconsistent, no solution!";
	    }
	    if (factorized[1] === 2) {
	        message = "matrix D in quadratic function is not positive definite!";
	    }
	
	    return {
	        solution: base1to0(sol),
	        value: base1to0(crval),
	        unconstrained_solution: base1to0(dvec),
	        iterations: base1to0(iter),
	        iact: base1to0(iact),
	        message: message
	    };
	}
	exports.solveQP = solveQP;
	}(numeric));
	/*
	Shanti Rao sent me this routine by private email. I had to modify it
	slightly to work on Arrays instead of using a Matrix object.
	It is apparently translated from http://stitchpanorama.sourceforge.net/Python/svd.py
	*/
	
	numeric.svd= function svd(A) {
	    var temp;
	//Compute the thin SVD from G. H. Golub and C. Reinsch, Numer. Math. 14, 403-420 (1970)
		var prec= numeric.epsilon; //Math.pow(2,-52) // assumes double prec
		var tolerance= 1.e-64/prec;
		var itmax= 50;
		var c=0;
		var i=0;
		var j=0;
		var k=0;
		var l=0;
		
		var u= numeric.clone(A);
		var m= u.length;
		
		var n= u[0].length;
		
		if (m < n) throw "Need more rows than columns"
		
		var e = new Array(n);
		var q = new Array(n);
		for (i=0; i<n; i++) e[i] = q[i] = 0.0;
		var v = numeric.rep([n,n],0);
	//	v.zero();
		
	 	function pythag(a,b)
	 	{
			a = Math.abs(a)
			b = Math.abs(b)
			if (a > b)
				return a*Math.sqrt(1.0+(b*b/a/a))
			else if (b == 0.0) 
				return a
			return b*Math.sqrt(1.0+(a*a/b/b))
		}
	
		//Householder's reduction to bidiagonal form
	
		var f= 0.0;
		var g= 0.0;
		var h= 0.0;
		var x= 0.0;
		var y= 0.0;
		var z= 0.0;
		var s= 0.0;
		
		for (i=0; i < n; i++)
		{	
			e[i]= g;
			s= 0.0;
			l= i+1;
			for (j=i; j < m; j++) 
				s += (u[j][i]*u[j][i]);
			if (s <= tolerance)
				g= 0.0;
			else
			{	
				f= u[i][i];
				g= Math.sqrt(s);
				if (f >= 0.0) g= -g;
				h= f*g-s
				u[i][i]=f-g;
				for (j=l; j < n; j++)
				{
					s= 0.0
					for (k=i; k < m; k++) 
						s += u[k][i]*u[k][j]
					f= s/h
					for (k=i; k < m; k++) 
						u[k][j]+=f*u[k][i]
				}
			}
			q[i]= g
			s= 0.0
			for (j=l; j < n; j++) 
				s= s + u[i][j]*u[i][j]
			if (s <= tolerance)
				g= 0.0
			else
			{	
				f= u[i][i+1]
				g= Math.sqrt(s)
				if (f >= 0.0) g= -g
				h= f*g - s
				u[i][i+1] = f-g;
				for (j=l; j < n; j++) e[j]= u[i][j]/h
				for (j=l; j < m; j++)
				{	
					s=0.0
					for (k=l; k < n; k++) 
						s += (u[j][k]*u[i][k])
					for (k=l; k < n; k++) 
						u[j][k]+=s*e[k]
				}	
			}
			y= Math.abs(q[i])+Math.abs(e[i])
			if (y>x) 
				x=y
		}
		
		// accumulation of right hand gtransformations
		for (i=n-1; i != -1; i+= -1)
		{	
			if (g != 0.0)
			{
			 	h= g*u[i][i+1]
				for (j=l; j < n; j++) 
					v[j][i]=u[i][j]/h
				for (j=l; j < n; j++)
				{	
					s=0.0
					for (k=l; k < n; k++) 
						s += u[i][k]*v[k][j]
					for (k=l; k < n; k++) 
						v[k][j]+=(s*v[k][i])
				}	
			}
			for (j=l; j < n; j++)
			{
				v[i][j] = 0;
				v[j][i] = 0;
			}
			v[i][i] = 1;
			g= e[i]
			l= i
		}
		
		// accumulation of left hand transformations
		for (i=n-1; i != -1; i+= -1)
		{	
			l= i+1
			g= q[i]
			for (j=l; j < n; j++) 
				u[i][j] = 0;
			if (g != 0.0)
			{
				h= u[i][i]*g
				for (j=l; j < n; j++)
				{
					s=0.0
					for (k=l; k < m; k++) s += u[k][i]*u[k][j];
					f= s/h
					for (k=i; k < m; k++) u[k][j]+=f*u[k][i];
				}
				for (j=i; j < m; j++) u[j][i] = u[j][i]/g;
			}
			else
				for (j=i; j < m; j++) u[j][i] = 0;
			u[i][i] += 1;
		}
		
		// diagonalization of the bidiagonal form
		prec= prec*x
		for (k=n-1; k != -1; k+= -1)
		{
			for (var iteration=0; iteration < itmax; iteration++)
			{	// test f splitting
				var test_convergence = false
				for (l=k; l != -1; l+= -1)
				{	
					if (Math.abs(e[l]) <= prec)
					{	test_convergence= true
						break 
					}
					if (Math.abs(q[l-1]) <= prec)
						break 
				}
				if (!test_convergence)
				{	// cancellation of e[l] if l>0
					c= 0.0
					s= 1.0
					var l1= l-1
					for (i =l; i<k+1; i++)
					{	
						f= s*e[i]
						e[i]= c*e[i]
						if (Math.abs(f) <= prec)
							break
						g= q[i]
						h= pythag(f,g)
						q[i]= h
						c= g/h
						s= -f/h
						for (j=0; j < m; j++)
						{	
							y= u[j][l1]
							z= u[j][i]
							u[j][l1] =  y*c+(z*s)
							u[j][i] = -y*s+(z*c)
						} 
					}	
				}
				// test f convergence
				z= q[k]
				if (l== k)
				{	//convergence
					if (z<0.0)
					{	//q[k] is made non-negative
						q[k]= -z
						for (j=0; j < n; j++)
							v[j][k] = -v[j][k]
					}
					break  //break out of iteration loop and move on to next k value
				}
				if (iteration >= itmax-1)
					throw 'Error: no convergence.'
				// shift from bottom 2x2 minor
				x= q[l]
				y= q[k-1]
				g= e[k-1]
				h= e[k]
				f= ((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y)
				g= pythag(f,1.0)
				if (f < 0.0)
					f= ((x-z)*(x+z)+h*(y/(f-g)-h))/x
				else
					f= ((x-z)*(x+z)+h*(y/(f+g)-h))/x
				// next QR transformation
				c= 1.0
				s= 1.0
				for (i=l+1; i< k+1; i++)
				{	
					g= e[i]
					y= q[i]
					h= s*g
					g= c*g
					z= pythag(f,h)
					e[i-1]= z
					c= f/z
					s= h/z
					f= x*c+g*s
					g= -x*s+g*c
					h= y*s
					y= y*c
					for (j=0; j < n; j++)
					{	
						x= v[j][i-1]
						z= v[j][i]
						v[j][i-1] = x*c+z*s
						v[j][i] = -x*s+z*c
					}
					z= pythag(f,h)
					q[i-1]= z
					c= f/z
					s= h/z
					f= c*g+s*y
					x= -s*g+c*y
					for (j=0; j < m; j++)
					{
						y= u[j][i-1]
						z= u[j][i]
						u[j][i-1] = y*c+z*s
						u[j][i] = -y*s+z*c
					}
				}
				e[l]= 0.0
				e[k]= f
				q[k]= x
			} 
		}
			
		//vt= transpose(v)
		//return (u,q,vt)
		for (i=0;i<q.length; i++) 
		  if (q[i] < prec) q[i] = 0
		  
		//sort eigenvalues	
		for (i=0; i< n; i++)
		{	 
		//writeln(q)
		 for (j=i-1; j >= 0; j--)
		 {
		  if (q[j] < q[i])
		  {
		//  writeln(i,'-',j)
		   c = q[j]
		   q[j] = q[i]
		   q[i] = c
		   for(k=0;k<u.length;k++) { temp = u[k][i]; u[k][i] = u[k][j]; u[k][j] = temp; }
		   for(k=0;k<v.length;k++) { temp = v[k][i]; v[k][i] = v[k][j]; v[k][j] = temp; }
	//	   u.swapCols(i,j)
	//	   v.swapCols(i,j)
		   i = j	   
		  }
		 }	
		}
		
		return {U:u,S:q,V:v}
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.twoPoints = twoPoints;
	exports.points = points;
	exports.arkCirc = arkCirc;
	exports.generic = generic;
	exports.pointAndLine = pointAndLine;
	exports.line = line;
	exports.lines = lines;
	exports.arcCircAndLine = arcCircAndLine;
	exports.twoLines = twoLines;
	exports.sketchObjects = sketchObjects;
	function twoPoints(objs) {
	  var points = [];
	  for (var i = 0; i < objs.length; ++i) {
	    if (objs[i]._class == 'TCAD.TWO.EndPoint') {
	      points.push(objs[i]);
	    } else if (objs[i]._class == 'TCAD.TWO.Segment') {
	      points.push(objs[i].a);
	      points.push(objs[i].b);
	    }
	  }
	  if (points.length < 2) {
	    throw "Illegal Argument. Constraint requires 2 points or 1 line.";
	  }
	  return points;
	}
	
	function points(objs) {
	  var points = [];
	  for (var i = 0; i < objs.length; ++i) {
	    objs[i].accept(function (o) {
	      if (o._class === 'TCAD.TWO.EndPoint') {
	        points.push(o);
	      }
	      return true;
	    });
	  }
	  if (points.length == 0) {
	    throw "Illegal Argument. Constraint requires at least 1 point/line/arc/circle.";
	  }
	  return points;
	}
	
	function arkCirc(objs, min) {
	  var arcs = [];
	  for (var i = 0; i < objs.length; ++i) {
	    if (objs[i]._class === 'TCAD.TWO.Arc' || objs[i]._class === 'TCAD.TWO.Circle') {
	      arcs.push(objs[i]);
	    }
	  }
	  if (arcs.length < min) {
	    throw "Illegal Argument. Constraint requires at least " + min + " arcs/circles.";
	  }
	  return arcs;
	}
	
	function generic(objs, types, min) {
	  var result = [];
	  for (var i = 0; i < objs.length; ++i) {
	    if (types.indexOf(objs[i]._class) > -1) {
	      result.push(objs[i]);
	    }
	  }
	  if (result.length < min) {
	    throw "Illegal Argument. Constraint requires at least " + min + " of " + types;
	  }
	  return result;
	}
	
	function pointAndLine(objs) {
	
	  var point = null;
	  var line = null;
	
	  for (var i = 0; i < objs.length; ++i) {
	    if (objs[i]._class == 'TCAD.TWO.EndPoint') {
	      point = objs[i];
	    } else if (objs[i]._class == 'TCAD.TWO.Segment') {
	      line = objs[i];
	    }
	  }
	  if (point == null || line == null) {
	    throw "Illegal Argument. Constraint requires point and line.";
	  }
	
	  return [point, line];
	}
	
	function line(objs) {
	  for (var i = 0; i < objs.length; ++i) {
	    if (objs[i]._class == 'TCAD.TWO.Segment') {
	      return objs[i];
	    }
	  }
	  throw "Illegal Argument. Constraint requires a line.";
	}
	
	function lines(objs) {
	  return objs.filter(function (o) {
	    return o._class == 'TCAD.TWO.Segment';
	  });
	}
	
	function arcCircAndLine(objs) {
	
	  var arc = null;
	  var line = null;
	
	  for (var i = 0; i < objs.length; ++i) {
	    if (objs[i]._class === 'TCAD.TWO.Arc' || objs[i]._class === 'TCAD.TWO.Circle') {
	      arc = objs[i];
	    } else if (objs[i]._class == 'TCAD.TWO.Segment') {
	      line = objs[i];
	    }
	  }
	  if (arc == null || line == null) {
	    throw "Illegal Argument. Constraint requires arc and line.";
	  }
	
	  return [arc, line];
	}
	
	function twoLines(objs) {
	  var lines = [];
	  for (var i = 0; i < objs.length; ++i) {
	    if (objs[i]._class == 'TCAD.TWO.Segment') {
	      lines.push(objs[i]);
	    }
	  }
	  if (lines.length < 2) {
	    throw "Illegal Argument. Constraint requires 2 lines.";
	  }
	  return lines;
	}
	
	function sketchObjects(objs, silent, matching) {
	  var fetched = [];
	  for (var i = 0; i < objs.length; ++i) {
	    for (var j = 0; j < matching.length; j++) {
	      if (objs[i]._class == matching[j]) {
	        fetched[j] = objs[i];
	        matching[j] = null;
	      }
	    }
	  }
	  if (fetched.length != matching.length) {
	    if (silent) {
	      return null;
	    } else {
	      throw "Illegal Argument. " + matching + " required";
	    }
	  }
	  return fetched;
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.HistoryManager = undefined;
	
	var _diffMatchPatch = __webpack_require__(98);
	
	var _diffMatchPatch2 = _interopRequireDefault(_diffMatchPatch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/** @constructor */
	function HistoryManager(viewer) {
	  this.viewer = viewer;
	  this.dmp = new _diffMatchPatch2.default();
	  this.init(this.viewer.io.serializeSketch());
	}
	
	HistoryManager.prototype.init = function (sketchData) {
	  this.lastCheckpoint = sketchData;
	  this.diffs = [];
	  this.historyPointer = -1;
	};
	
	HistoryManager.prototype.undo = function () {
	  var currentState = this.viewer.io.serializeSketch();
	  if (currentState == this.lastCheckpoint) {
	    if (this.historyPointer != -1) {
	      var diff = this.diffs[this.historyPointer];
	      this.lastCheckpoint = this.applyDiff(this.lastCheckpoint, diff);
	      this.viewer.io.loadSketch(this.lastCheckpoint);
	      this.viewer.fullHeavyUIRefresh();
	      this.historyPointer--;
	    }
	  } else {
	    var diffToCurr = this.getDiff(currentState, this.lastCheckpoint);
	    if (this.historyPointer != this.diffs.length - 1) {
	      this.diffs.splice(this.historyPointer + 1, this.diffs.length - this.historyPointer + 1);
	    }
	    this.diffs.push(diffToCurr);
	    this.viewer.io.loadSketch(this.lastCheckpoint);
	    this.viewer.fullHeavyUIRefresh();
	  }
	};
	
	HistoryManager.prototype.lightCheckpoint = function (weight) {
	  this._counter += weight;
	  if (this._counter >= 100) {
	    this.checkpoint();
	  }
	};
	
	HistoryManager.prototype.checkpoint = function () {
	  try {
	    this._checkpoint();
	  } catch (e) {
	    console.log(e);
	  }
	};
	
	HistoryManager.prototype._checkpoint = function () {
	  this._counter = 0;
	  var currentState = this.viewer.io.serializeSketch();
	  if (currentState == this.lastCheckpoint) {
	    return;
	  }
	  var diffToCurr = this.getDiff(currentState, this.lastCheckpoint);
	  if (this.historyPointer != this.diffs.length - 1) {
	    this.diffs.splice(this.historyPointer + 1, this.diffs.length - this.historyPointer + 1);
	  }
	  this.diffs.push(diffToCurr);
	  this.historyPointer = this.diffs.length - 1;
	  this.lastCheckpoint = currentState;
	};
	
	HistoryManager.prototype.redo = function () {
	  var currentState = this.viewer.io.serializeSketch();
	  if (currentState != this.lastCheckpoint) {
	    return;
	  }
	  if (this.historyPointer != this.diffs.length - 1 && this.diffs.length != 0) {
	    this.historyPointer++;
	    var diff = this.diffs[this.historyPointer];
	    this.lastCheckpoint = this.applyDiffInv(this.lastCheckpoint, diff);
	    this.viewer.io.loadSketch(this.lastCheckpoint);
	    this.viewer.fullHeavyUIRefresh();
	  }
	};
	
	HistoryManager.prototype.applyDiff = function (text1, diff) {
	  var dmp = this.dmp;
	  var results = dmp.patch_apply(diff, text1);
	  return results[0];
	};
	
	HistoryManager.prototype.applyDiffInv = function (text1, diff) {
	  this.reversePatch(diff);
	  var result = this.applyDiff(text1, diff);
	  this.reversePatch(diff);
	  return result;
	};
	
	HistoryManager.prototype.reversePatch = function (plist) {
	  for (var i = 0; i < plist.length; i++) {
	    var patch = plist[i];
	    for (var j = 0; j < patch.diffs.length; j++) {
	      var diff = patch.diffs[j];
	      diff[0] *= -1;
	    }
	  }
	};
	
	HistoryManager.prototype.getDiff = function (text1, text2) {
	  var dmp = this.dmp;
	  var diff = dmp.diff_main(text1, text2, true);
	
	  if (diff.length > 2) {
	    dmp.diff_cleanupSemantic(diff);
	  }
	
	  var patch_list = dmp.patch_make(text1, text2, diff);
	  //var patch_text = dmp.patch_toText(patch_list);
	  //console.log(patch_list);
	  return patch_list;
	};
	
	exports.HistoryManager = HistoryManager;

/***/ },
/* 98 */
/***/ function(module, exports) {

	'use strict'
	
	/**
	 * Diff Match and Patch
	 *
	 * Copyright 2006 Google Inc.
	 * http://code.google.com/p/google-diff-match-patch/
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 *   http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 */
	
	/**
	 * @fileoverview Computes the difference between two texts to create a patch.
	 * Applies the patch onto another text, allowing for errors.
	 * @author fraser@google.com (Neil Fraser)
	 */
	
	/**
	 * Class containing the diff, match and patch methods.
	 * @constructor
	 */
	function diff_match_patch() {
	
	  // Defaults.
	  // Redefine these in your program to override the defaults.
	
	  // Number of seconds to map a diff before giving up (0 for infinity).
	  this.Diff_Timeout = 1.0;
	  // Cost of an empty edit operation in terms of edit characters.
	  this.Diff_EditCost = 4;
	  // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
	  this.Match_Threshold = 0.5;
	  // How far to search for a match (0 = exact location, 1000+ = broad match).
	  // A match this many characters away from the expected location will add
	  // 1.0 to the score (0.0 is a perfect match).
	  this.Match_Distance = 1000;
	  // When deleting a large block of text (over ~64 characters), how close do
	  // the contents have to be to match the expected contents. (0.0 = perfection,
	  // 1.0 = very loose).  Note that Match_Threshold controls how closely the
	  // end points of a delete need to match.
	  this.Patch_DeleteThreshold = 0.5;
	  // Chunk size for context length.
	  this.Patch_Margin = 4;
	
	  // The number of bits in an int.
	  this.Match_MaxBits = 32;
	}
	
	
	//  DIFF FUNCTIONS
	
	
	/**
	 * The data structure representing a diff is an array of tuples:
	 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
	 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
	 */
	var DIFF_DELETE = -1;
	var DIFF_INSERT = 1;
	var DIFF_EQUAL = 0;
	
	/** @typedef {{0: number, 1: string}} */
	diff_match_patch.Diff;
	
	
	/**
	 * Find the differences between two texts.  Simplifies the problem by stripping
	 * any common prefix or suffix off the texts before diffing.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
	 *     then don't run a line-level diff first to identify the changed areas.
	 *     Defaults to true, which does a faster, slightly less optimal diff.
	 * @param {number} opt_deadline Optional time when the diff should be complete
	 *     by.  Used internally for recursive calls.  Users should set DiffTimeout
	 *     instead.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines,
	    opt_deadline) {
	  // Set a deadline by which time the diff must be complete.
	  if (typeof opt_deadline == 'undefined') {
	    if (this.Diff_Timeout <= 0) {
	      opt_deadline = Number.MAX_VALUE;
	    } else {
	      opt_deadline = (new Date).getTime() + this.Diff_Timeout * 1000;
	    }
	  }
	  var deadline = opt_deadline;
	
	  // Check for null inputs.
	  if (text1 == null || text2 == null) {
	    throw new Error('Null input. (diff_main)');
	  }
	
	  // Check for equality (speedup).
	  if (text1 == text2) {
	    if (text1) {
	      return [[DIFF_EQUAL, text1]];
	    }
	    return [];
	  }
	
	  if (typeof opt_checklines == 'undefined') {
	    opt_checklines = true;
	  }
	  var checklines = opt_checklines;
	
	  // Trim off common prefix (speedup).
	  var commonlength = this.diff_commonPrefix(text1, text2);
	  var commonprefix = text1.substring(0, commonlength);
	  text1 = text1.substring(commonlength);
	  text2 = text2.substring(commonlength);
	
	  // Trim off common suffix (speedup).
	  commonlength = this.diff_commonSuffix(text1, text2);
	  var commonsuffix = text1.substring(text1.length - commonlength);
	  text1 = text1.substring(0, text1.length - commonlength);
	  text2 = text2.substring(0, text2.length - commonlength);
	
	  // Compute the diff on the middle block.
	  var diffs = this.diff_compute_(text1, text2, checklines, deadline);
	
	  // Restore the prefix and suffix.
	  if (commonprefix) {
	    diffs.unshift([DIFF_EQUAL, commonprefix]);
	  }
	  if (commonsuffix) {
	    diffs.push([DIFF_EQUAL, commonsuffix]);
	  }
	  this.diff_cleanupMerge(diffs);
	  return diffs;
	};
	
	
	/**
	 * Find the differences between two texts.  Assumes that the texts do not
	 * have any common prefix or suffix.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {boolean} checklines Speedup flag.  If false, then don't run a
	 *     line-level diff first to identify the changed areas.
	 *     If true, then run a faster, slightly less optimal diff.
	 * @param {number} deadline Time when the diff should be complete by.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines,
	    deadline) {
	  var diffs;
	
	  if (!text1) {
	    // Just add some text (speedup).
	    return [[DIFF_INSERT, text2]];
	  }
	
	  if (!text2) {
	    // Just delete some text (speedup).
	    return [[DIFF_DELETE, text1]];
	  }
	
	  var longtext = text1.length > text2.length ? text1 : text2;
	  var shorttext = text1.length > text2.length ? text2 : text1;
	  var i = longtext.indexOf(shorttext);
	  if (i != -1) {
	    // Shorter text is inside the longer text (speedup).
	    diffs = [[DIFF_INSERT, longtext.substring(0, i)],
	             [DIFF_EQUAL, shorttext],
	             [DIFF_INSERT, longtext.substring(i + shorttext.length)]];
	    // Swap insertions for deletions if diff is reversed.
	    if (text1.length > text2.length) {
	      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
	    }
	    return diffs;
	  }
	
	  if (shorttext.length == 1) {
	    // Single character string.
	    // After the previous speedup, the character can't be an equality.
	    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
	  }
	
	  // Check to see if the problem can be split in two.
	  var hm = this.diff_halfMatch_(text1, text2);
	  if (hm) {
	    // A half-match was found, sort out the return data.
	    var text1_a = hm[0];
	    var text1_b = hm[1];
	    var text2_a = hm[2];
	    var text2_b = hm[3];
	    var mid_common = hm[4];
	    // Send both pairs off for separate processing.
	    var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
	    var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
	    // Merge the results.
	    return diffs_a.concat([[DIFF_EQUAL, mid_common]], diffs_b);
	  }
	
	  if (checklines && text1.length > 100 && text2.length > 100) {
	    return this.diff_lineMode_(text1, text2, deadline);
	  }
	
	  return this.diff_bisect_(text1, text2, deadline);
	};
	
	
	/**
	 * Do a quick line-level diff on both strings, then rediff the parts for
	 * greater accuracy.
	 * This speedup can produce non-minimal diffs.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} deadline Time when the diff should be complete by.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
	  // Scan the text on a line-by-line basis first.
	  var a = this.diff_linesToChars_(text1, text2);
	  text1 = a.chars1;
	  text2 = a.chars2;
	  var linearray = a.lineArray;
	
	  var diffs = this.diff_main(text1, text2, false, deadline);
	
	  // Convert the diff back to original text.
	  this.diff_charsToLines_(diffs, linearray);
	  // Eliminate freak matches (e.g. blank lines)
	  this.diff_cleanupSemantic(diffs);
	
	  // Rediff any replacement blocks, this time character-by-character.
	  // Add a dummy entry at the end.
	  diffs.push([DIFF_EQUAL, '']);
	  var pointer = 0;
	  var count_delete = 0;
	  var count_insert = 0;
	  var text_delete = '';
	  var text_insert = '';
	  while (pointer < diffs.length) {
	    switch (diffs[pointer][0]) {
	      case DIFF_INSERT:
	        count_insert++;
	        text_insert += diffs[pointer][1];
	        break;
	      case DIFF_DELETE:
	        count_delete++;
	        text_delete += diffs[pointer][1];
	        break;
	      case DIFF_EQUAL:
	        // Upon reaching an equality, check for prior redundancies.
	        if (count_delete >= 1 && count_insert >= 1) {
	          // Delete the offending records and add the merged ones.
	          diffs.splice(pointer - count_delete - count_insert,
	                       count_delete + count_insert);
	          pointer = pointer - count_delete - count_insert;
	          var a = this.diff_main(text_delete, text_insert, false, deadline);
	          for (var j = a.length - 1; j >= 0; j--) {
	            diffs.splice(pointer, 0, a[j]);
	          }
	          pointer = pointer + a.length;
	        }
	        count_insert = 0;
	        count_delete = 0;
	        text_delete = '';
	        text_insert = '';
	        break;
	    }
	    pointer++;
	  }
	  diffs.pop();  // Remove the dummy entry at the end.
	
	  return diffs;
	};
	
	
	/**
	 * Find the 'middle snake' of a diff, split the problem in two
	 * and return the recursively constructed diff.
	 * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} deadline Time at which to bail if not yet complete.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
	  // Cache the text lengths to prevent multiple calls.
	  var text1_length = text1.length;
	  var text2_length = text2.length;
	  var max_d = Math.ceil((text1_length + text2_length) / 2);
	  var v_offset = max_d;
	  var v_length = 2 * max_d;
	  var v1 = new Array(v_length);
	  var v2 = new Array(v_length);
	  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
	  // integers and undefined.
	  for (var x = 0; x < v_length; x++) {
	    v1[x] = -1;
	    v2[x] = -1;
	  }
	  v1[v_offset + 1] = 0;
	  v2[v_offset + 1] = 0;
	  var delta = text1_length - text2_length;
	  // If the total number of characters is odd, then the front path will collide
	  // with the reverse path.
	  var front = (delta % 2 != 0);
	  // Offsets for start and end of k loop.
	  // Prevents mapping of space beyond the grid.
	  var k1start = 0;
	  var k1end = 0;
	  var k2start = 0;
	  var k2end = 0;
	  for (var d = 0; d < max_d; d++) {
	    // Bail out if deadline is reached.
	    if ((new Date()).getTime() > deadline) {
	      break;
	    }
	
	    // Walk the front path one step.
	    for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
	      var k1_offset = v_offset + k1;
	      var x1;
	      if (k1 == -d || (k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1])) {
	        x1 = v1[k1_offset + 1];
	      } else {
	        x1 = v1[k1_offset - 1] + 1;
	      }
	      var y1 = x1 - k1;
	      while (x1 < text1_length && y1 < text2_length &&
	             text1.charAt(x1) == text2.charAt(y1)) {
	        x1++;
	        y1++;
	      }
	      v1[k1_offset] = x1;
	      if (x1 > text1_length) {
	        // Ran off the right of the graph.
	        k1end += 2;
	      } else if (y1 > text2_length) {
	        // Ran off the bottom of the graph.
	        k1start += 2;
	      } else if (front) {
	        var k2_offset = v_offset + delta - k1;
	        if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
	          // Mirror x2 onto top-left coordinate system.
	          var x2 = text1_length - v2[k2_offset];
	          if (x1 >= x2) {
	            // Overlap detected.
	            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
	          }
	        }
	      }
	    }
	
	    // Walk the reverse path one step.
	    for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
	      var k2_offset = v_offset + k2;
	      var x2;
	      if (k2 == -d || (k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1])) {
	        x2 = v2[k2_offset + 1];
	      } else {
	        x2 = v2[k2_offset - 1] + 1;
	      }
	      var y2 = x2 - k2;
	      while (x2 < text1_length && y2 < text2_length &&
	             text1.charAt(text1_length - x2 - 1) ==
	             text2.charAt(text2_length - y2 - 1)) {
	        x2++;
	        y2++;
	      }
	      v2[k2_offset] = x2;
	      if (x2 > text1_length) {
	        // Ran off the left of the graph.
	        k2end += 2;
	      } else if (y2 > text2_length) {
	        // Ran off the top of the graph.
	        k2start += 2;
	      } else if (!front) {
	        var k1_offset = v_offset + delta - k2;
	        if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
	          var x1 = v1[k1_offset];
	          var y1 = v_offset + x1 - k1_offset;
	          // Mirror x2 onto top-left coordinate system.
	          x2 = text1_length - x2;
	          if (x1 >= x2) {
	            // Overlap detected.
	            return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
	          }
	        }
	      }
	    }
	  }
	  // Diff took too long and hit the deadline or
	  // number of diffs equals number of characters, no commonality at all.
	  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
	};
	
	
	/**
	 * Given the location of the 'middle snake', split the diff in two parts
	 * and recurse.
	 * @param {string} text1 Old string to be diffed.
	 * @param {string} text2 New string to be diffed.
	 * @param {number} x Index of split point in text1.
	 * @param {number} y Index of split point in text2.
	 * @param {number} deadline Time at which to bail if not yet complete.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @private
	 */
	diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y,
	    deadline) {
	  var text1a = text1.substring(0, x);
	  var text2a = text2.substring(0, y);
	  var text1b = text1.substring(x);
	  var text2b = text2.substring(y);
	
	  // Compute both diffs serially.
	  var diffs = this.diff_main(text1a, text2a, false, deadline);
	  var diffsb = this.diff_main(text1b, text2b, false, deadline);
	
	  return diffs.concat(diffsb);
	};
	
	
	/**
	 * Split two texts into an array of strings.  Reduce the texts to a string of
	 * hashes where each Unicode character represents one line.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
	 *     An object containing the encoded text1, the encoded text2 and
	 *     the array of unique strings.
	 *     The zeroth element of the array of unique strings is intentionally blank.
	 * @private
	 */
	diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
	  var lineArray = [];  // e.g. lineArray[4] == 'Hello\n'
	  var lineHash = {};   // e.g. lineHash['Hello\n'] == 4
	
	  // '\x00' is a valid character, but various debuggers don't like it.
	  // So we'll insert a junk entry to avoid generating a null character.
	  lineArray[0] = '';
	
	  /**
	   * Split a text into an array of strings.  Reduce the texts to a string of
	   * hashes where each Unicode character represents one line.
	   * Modifies linearray and linehash through being a closure.
	   * @param {string} text String to encode.
	   * @return {string} Encoded string.
	   * @private
	   */
	  function diff_linesToCharsMunge_(text) {
	    var chars = '';
	    // Walk the text, pulling out a substring for each line.
	    // text.split('\n') would would temporarily double our memory footprint.
	    // Modifying text would create many large strings to garbage collect.
	    var lineStart = 0;
	    var lineEnd = -1;
	    // Keeping our own length variable is faster than looking it up.
	    var lineArrayLength = lineArray.length;
	    while (lineEnd < text.length - 1) {
	      lineEnd = text.indexOf('\n', lineStart);
	      if (lineEnd == -1) {
	        lineEnd = text.length - 1;
	      }
	      var line = text.substring(lineStart, lineEnd + 1);
	      lineStart = lineEnd + 1;
	
	      if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) :
	          (lineHash[line] !== undefined)) {
	        chars += String.fromCharCode(lineHash[line]);
	      } else {
	        chars += String.fromCharCode(lineArrayLength);
	        lineHash[line] = lineArrayLength;
	        lineArray[lineArrayLength++] = line;
	      }
	    }
	    return chars;
	  }
	
	  var chars1 = diff_linesToCharsMunge_(text1);
	  var chars2 = diff_linesToCharsMunge_(text2);
	  return {chars1: chars1, chars2: chars2, lineArray: lineArray};
	};
	
	
	/**
	 * Rehydrate the text in a diff from a string of line hashes to real lines of
	 * text.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @param {!Array.<string>} lineArray Array of unique strings.
	 * @private
	 */
	diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
	  for (var x = 0; x < diffs.length; x++) {
	    var chars = diffs[x][1];
	    var text = [];
	    for (var y = 0; y < chars.length; y++) {
	      text[y] = lineArray[chars.charCodeAt(y)];
	    }
	    diffs[x][1] = text.join('');
	  }
	};
	
	
	/**
	 * Determine the common prefix of two strings.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the start of each
	 *     string.
	 */
	diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
	  // Quick check for common null cases.
	  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
	    return 0;
	  }
	  // Binary search.
	  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
	  var pointermin = 0;
	  var pointermax = Math.min(text1.length, text2.length);
	  var pointermid = pointermax;
	  var pointerstart = 0;
	  while (pointermin < pointermid) {
	    if (text1.substring(pointerstart, pointermid) ==
	        text2.substring(pointerstart, pointermid)) {
	      pointermin = pointermid;
	      pointerstart = pointermin;
	    } else {
	      pointermax = pointermid;
	    }
	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
	  }
	  return pointermid;
	};
	
	
	/**
	 * Determine the common suffix of two strings.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the end of each string.
	 */
	diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
	  // Quick check for common null cases.
	  if (!text1 || !text2 ||
	      text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
	    return 0;
	  }
	  // Binary search.
	  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
	  var pointermin = 0;
	  var pointermax = Math.min(text1.length, text2.length);
	  var pointermid = pointermax;
	  var pointerend = 0;
	  while (pointermin < pointermid) {
	    if (text1.substring(text1.length - pointermid, text1.length - pointerend) ==
	        text2.substring(text2.length - pointermid, text2.length - pointerend)) {
	      pointermin = pointermid;
	      pointerend = pointermin;
	    } else {
	      pointermax = pointermid;
	    }
	    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
	  }
	  return pointermid;
	};
	
	
	/**
	 * Determine if the suffix of one string is the prefix of another.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {number} The number of characters common to the end of the first
	 *     string and the start of the second string.
	 * @private
	 */
	diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
	  // Cache the text lengths to prevent multiple calls.
	  var text1_length = text1.length;
	  var text2_length = text2.length;
	  // Eliminate the null case.
	  if (text1_length == 0 || text2_length == 0) {
	    return 0;
	  }
	  // Truncate the longer string.
	  if (text1_length > text2_length) {
	    text1 = text1.substring(text1_length - text2_length);
	  } else if (text1_length < text2_length) {
	    text2 = text2.substring(0, text1_length);
	  }
	  var text_length = Math.min(text1_length, text2_length);
	  // Quick check for the worst case.
	  if (text1 == text2) {
	    return text_length;
	  }
	
	  // Start by looking for a single character match
	  // and increase length until no match is found.
	  // Performance analysis: http://neil.fraser.name/news/2010/11/04/
	  var best = 0;
	  var length = 1;
	  while (true) {
	    var pattern = text1.substring(text_length - length);
	    var found = text2.indexOf(pattern);
	    if (found == -1) {
	      return best;
	    }
	    length += found;
	    if (found == 0 || text1.substring(text_length - length) ==
	        text2.substring(0, length)) {
	      best = length;
	      length++;
	    }
	  }
	};
	
	
	/**
	 * Do the two texts share a substring which is at least half the length of the
	 * longer text?
	 * This speedup can produce non-minimal diffs.
	 * @param {string} text1 First string.
	 * @param {string} text2 Second string.
	 * @return {Array.<string>} Five element Array, containing the prefix of
	 *     text1, the suffix of text1, the prefix of text2, the suffix of
	 *     text2 and the common middle.  Or null if there was no match.
	 * @private
	 */
	diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
	  if (this.Diff_Timeout <= 0) {
	    // Don't risk returning a non-optimal diff if we have unlimited time.
	    return null;
	  }
	  var longtext = text1.length > text2.length ? text1 : text2;
	  var shorttext = text1.length > text2.length ? text2 : text1;
	  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
	    return null;  // Pointless.
	  }
	  var dmp = this;  // 'this' becomes 'window' in a closure.
	
	  /**
	   * Does a substring of shorttext exist within longtext such that the substring
	   * is at least half the length of longtext?
	   * Closure, but does not reference any external variables.
	   * @param {string} longtext Longer string.
	   * @param {string} shorttext Shorter string.
	   * @param {number} i Start index of quarter length substring within longtext.
	   * @return {Array.<string>} Five element Array, containing the prefix of
	   *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
	   *     of shorttext and the common middle.  Or null if there was no match.
	   * @private
	   */
	  function diff_halfMatchI_(longtext, shorttext, i) {
	    // Start with a 1/4 length substring at position i as a seed.
	    var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
	    var j = -1;
	    var best_common = '';
	    var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
	    while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
	      var prefixLength = dmp.diff_commonPrefix(longtext.substring(i),
	                                               shorttext.substring(j));
	      var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i),
	                                               shorttext.substring(0, j));
	      if (best_common.length < suffixLength + prefixLength) {
	        best_common = shorttext.substring(j - suffixLength, j) +
	            shorttext.substring(j, j + prefixLength);
	        best_longtext_a = longtext.substring(0, i - suffixLength);
	        best_longtext_b = longtext.substring(i + prefixLength);
	        best_shorttext_a = shorttext.substring(0, j - suffixLength);
	        best_shorttext_b = shorttext.substring(j + prefixLength);
	      }
	    }
	    if (best_common.length * 2 >= longtext.length) {
	      return [best_longtext_a, best_longtext_b,
	              best_shorttext_a, best_shorttext_b, best_common];
	    } else {
	      return null;
	    }
	  }
	
	  // First check if the second quarter is the seed for a half-match.
	  var hm1 = diff_halfMatchI_(longtext, shorttext,
	                             Math.ceil(longtext.length / 4));
	  // Check again based on the third quarter.
	  var hm2 = diff_halfMatchI_(longtext, shorttext,
	                             Math.ceil(longtext.length / 2));
	  var hm;
	  if (!hm1 && !hm2) {
	    return null;
	  } else if (!hm2) {
	    hm = hm1;
	  } else if (!hm1) {
	    hm = hm2;
	  } else {
	    // Both matched.  Select the longest.
	    hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
	  }
	
	  // A half-match was found, sort out the return data.
	  var text1_a, text1_b, text2_a, text2_b;
	  if (text1.length > text2.length) {
	    text1_a = hm[0];
	    text1_b = hm[1];
	    text2_a = hm[2];
	    text2_b = hm[3];
	  } else {
	    text2_a = hm[0];
	    text2_b = hm[1];
	    text1_a = hm[2];
	    text1_b = hm[3];
	  }
	  var mid_common = hm[4];
	  return [text1_a, text1_b, text2_a, text2_b, mid_common];
	};
	
	
	/**
	 * Reduce the number of edits by eliminating semantically trivial equalities.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
	  var changes = false;
	  var equalities = [];  // Stack of indices where equalities are found.
	  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
	  /** @type {?string} */
	  var lastequality = null;
	  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
	  var pointer = 0;  // Index of current position.
	  // Number of characters that changed prior to the equality.
	  var length_insertions1 = 0;
	  var length_deletions1 = 0;
	  // Number of characters that changed after the equality.
	  var length_insertions2 = 0;
	  var length_deletions2 = 0;
	  while (pointer < diffs.length) {
	    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
	      equalities[equalitiesLength++] = pointer;
	      length_insertions1 = length_insertions2;
	      length_deletions1 = length_deletions2;
	      length_insertions2 = 0;
	      length_deletions2 = 0;
	      lastequality = diffs[pointer][1];
	    } else {  // An insertion or deletion.
	      if (diffs[pointer][0] == DIFF_INSERT) {
	        length_insertions2 += diffs[pointer][1].length;
	      } else {
	        length_deletions2 += diffs[pointer][1].length;
	      }
	      // Eliminate an equality that is smaller or equal to the edits on both
	      // sides of it.
	      if (lastequality && (lastequality.length <=
	          Math.max(length_insertions1, length_deletions1)) &&
	          (lastequality.length <= Math.max(length_insertions2,
	                                           length_deletions2))) {
	        // Duplicate record.
	        diffs.splice(equalities[equalitiesLength - 1], 0,
	                     [DIFF_DELETE, lastequality]);
	        // Change second copy to insert.
	        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
	        // Throw away the equality we just deleted.
	        equalitiesLength--;
	        // Throw away the previous equality (it needs to be reevaluated).
	        equalitiesLength--;
	        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
	        length_insertions1 = 0;  // Reset the counters.
	        length_deletions1 = 0;
	        length_insertions2 = 0;
	        length_deletions2 = 0;
	        lastequality = null;
	        changes = true;
	      }
	    }
	    pointer++;
	  }
	
	  // Normalize the diff.
	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	  this.diff_cleanupSemanticLossless(diffs);
	
	  // Find any overlaps between deletions and insertions.
	  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
	  //   -> <del>abc</del>xxx<ins>def</ins>
	  // e.g: <del>xxxabc</del><ins>defxxx</ins>
	  //   -> <ins>def</ins>xxx<del>abc</del>
	  // Only extract an overlap if it is as big as the edit ahead or behind it.
	  pointer = 1;
	  while (pointer < diffs.length) {
	    if (diffs[pointer - 1][0] == DIFF_DELETE &&
	        diffs[pointer][0] == DIFF_INSERT) {
	      var deletion = diffs[pointer - 1][1];
	      var insertion = diffs[pointer][1];
	      var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
	      var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
	      if (overlap_length1 >= overlap_length2) {
	        if (overlap_length1 >= deletion.length / 2 ||
	            overlap_length1 >= insertion.length / 2) {
	          // Overlap found.  Insert an equality and trim the surrounding edits.
	          diffs.splice(pointer, 0,
	              [DIFF_EQUAL, insertion.substring(0, overlap_length1)]);
	          diffs[pointer - 1][1] =
	              deletion.substring(0, deletion.length - overlap_length1);
	          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
	          pointer++;
	        }
	      } else {
	        if (overlap_length2 >= deletion.length / 2 ||
	            overlap_length2 >= insertion.length / 2) {
	          // Reverse overlap found.
	          // Insert an equality and swap and trim the surrounding edits.
	          diffs.splice(pointer, 0,
	              [DIFF_EQUAL, deletion.substring(0, overlap_length2)]);
	          diffs[pointer - 1][0] = DIFF_INSERT;
	          diffs[pointer - 1][1] =
	              insertion.substring(0, insertion.length - overlap_length2);
	          diffs[pointer + 1][0] = DIFF_DELETE;
	          diffs[pointer + 1][1] =
	              deletion.substring(overlap_length2);
	          pointer++;
	        }
	      }
	      pointer++;
	    }
	    pointer++;
	  }
	};
	
	
	/**
	 * Look for single edits surrounded on both sides by equalities
	 * which can be shifted sideways to align the edit to a word boundary.
	 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
	  /**
	   * Given two strings, compute a score representing whether the internal
	   * boundary falls on logical boundaries.
	   * Scores range from 6 (best) to 0 (worst).
	   * Closure, but does not reference any external variables.
	   * @param {string} one First string.
	   * @param {string} two Second string.
	   * @return {number} The score.
	   * @private
	   */
	  function diff_cleanupSemanticScore_(one, two) {
	    if (!one || !two) {
	      // Edges are the best.
	      return 6;
	    }
	
	    // Each port of this function behaves slightly differently due to
	    // subtle differences in each language's definition of things like
	    // 'whitespace'.  Since this function's purpose is largely cosmetic,
	    // the choice has been made to use each language's native features
	    // rather than force total conformity.
	    var char1 = one.charAt(one.length - 1);
	    var char2 = two.charAt(0);
	    var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
	    var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
	    var whitespace1 = nonAlphaNumeric1 &&
	        char1.match(diff_match_patch.whitespaceRegex_);
	    var whitespace2 = nonAlphaNumeric2 &&
	        char2.match(diff_match_patch.whitespaceRegex_);
	    var lineBreak1 = whitespace1 &&
	        char1.match(diff_match_patch.linebreakRegex_);
	    var lineBreak2 = whitespace2 &&
	        char2.match(diff_match_patch.linebreakRegex_);
	    var blankLine1 = lineBreak1 &&
	        one.match(diff_match_patch.blanklineEndRegex_);
	    var blankLine2 = lineBreak2 &&
	        two.match(diff_match_patch.blanklineStartRegex_);
	
	    if (blankLine1 || blankLine2) {
	      // Five points for blank lines.
	      return 5;
	    } else if (lineBreak1 || lineBreak2) {
	      // Four points for line breaks.
	      return 4;
	    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
	      // Three points for end of sentences.
	      return 3;
	    } else if (whitespace1 || whitespace2) {
	      // Two points for whitespace.
	      return 2;
	    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
	      // One point for non-alphanumeric.
	      return 1;
	    }
	    return 0;
	  }
	
	  var pointer = 1;
	  // Intentionally ignore the first and last element (don't need checking).
	  while (pointer < diffs.length - 1) {
	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
	        diffs[pointer + 1][0] == DIFF_EQUAL) {
	      // This is a single edit surrounded by equalities.
	      var equality1 = diffs[pointer - 1][1];
	      var edit = diffs[pointer][1];
	      var equality2 = diffs[pointer + 1][1];
	
	      // First, shift the edit as far left as possible.
	      var commonOffset = this.diff_commonSuffix(equality1, edit);
	      if (commonOffset) {
	        var commonString = edit.substring(edit.length - commonOffset);
	        equality1 = equality1.substring(0, equality1.length - commonOffset);
	        edit = commonString + edit.substring(0, edit.length - commonOffset);
	        equality2 = commonString + equality2;
	      }
	
	      // Second, step character by character right, looking for the best fit.
	      var bestEquality1 = equality1;
	      var bestEdit = edit;
	      var bestEquality2 = equality2;
	      var bestScore = diff_cleanupSemanticScore_(equality1, edit) +
	          diff_cleanupSemanticScore_(edit, equality2);
	      while (edit.charAt(0) === equality2.charAt(0)) {
	        equality1 += edit.charAt(0);
	        edit = edit.substring(1) + equality2.charAt(0);
	        equality2 = equality2.substring(1);
	        var score = diff_cleanupSemanticScore_(equality1, edit) +
	            diff_cleanupSemanticScore_(edit, equality2);
	        // The >= encourages trailing rather than leading whitespace on edits.
	        if (score >= bestScore) {
	          bestScore = score;
	          bestEquality1 = equality1;
	          bestEdit = edit;
	          bestEquality2 = equality2;
	        }
	      }
	
	      if (diffs[pointer - 1][1] != bestEquality1) {
	        // We have an improvement, save it back to the diff.
	        if (bestEquality1) {
	          diffs[pointer - 1][1] = bestEquality1;
	        } else {
	          diffs.splice(pointer - 1, 1);
	          pointer--;
	        }
	        diffs[pointer][1] = bestEdit;
	        if (bestEquality2) {
	          diffs[pointer + 1][1] = bestEquality2;
	        } else {
	          diffs.splice(pointer + 1, 1);
	          pointer--;
	        }
	      }
	    }
	    pointer++;
	  }
	};
	
	// Define some regex patterns for matching boundaries.
	diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
	diff_match_patch.whitespaceRegex_ = /\s/;
	diff_match_patch.linebreakRegex_ = /[\r\n]/;
	diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
	diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;
	
	/**
	 * Reduce the number of edits by eliminating operationally trivial equalities.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
	  var changes = false;
	  var equalities = [];  // Stack of indices where equalities are found.
	  var equalitiesLength = 0;  // Keeping our own length var is faster in JS.
	  /** @type {?string} */
	  var lastequality = null;
	  // Always equal to diffs[equalities[equalitiesLength - 1]][1]
	  var pointer = 0;  // Index of current position.
	  // Is there an insertion operation before the last equality.
	  var pre_ins = false;
	  // Is there a deletion operation before the last equality.
	  var pre_del = false;
	  // Is there an insertion operation after the last equality.
	  var post_ins = false;
	  // Is there a deletion operation after the last equality.
	  var post_del = false;
	  while (pointer < diffs.length) {
	    if (diffs[pointer][0] == DIFF_EQUAL) {  // Equality found.
	      if (diffs[pointer][1].length < this.Diff_EditCost &&
	          (post_ins || post_del)) {
	        // Candidate found.
	        equalities[equalitiesLength++] = pointer;
	        pre_ins = post_ins;
	        pre_del = post_del;
	        lastequality = diffs[pointer][1];
	      } else {
	        // Not a candidate, and can never become one.
	        equalitiesLength = 0;
	        lastequality = null;
	      }
	      post_ins = post_del = false;
	    } else {  // An insertion or deletion.
	      if (diffs[pointer][0] == DIFF_DELETE) {
	        post_del = true;
	      } else {
	        post_ins = true;
	      }
	      /*
	       * Five types to be split:
	       * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
	       * <ins>A</ins>X<ins>C</ins><del>D</del>
	       * <ins>A</ins><del>B</del>X<ins>C</ins>
	       * <ins>A</del>X<ins>C</ins><del>D</del>
	       * <ins>A</ins><del>B</del>X<del>C</del>
	       */
	      if (lastequality && ((pre_ins && pre_del && post_ins && post_del) ||
	                           ((lastequality.length < this.Diff_EditCost / 2) &&
	                            (pre_ins + pre_del + post_ins + post_del) == 3))) {
	        // Duplicate record.
	        diffs.splice(equalities[equalitiesLength - 1], 0,
	                     [DIFF_DELETE, lastequality]);
	        // Change second copy to insert.
	        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
	        equalitiesLength--;  // Throw away the equality we just deleted;
	        lastequality = null;
	        if (pre_ins && pre_del) {
	          // No changes made which could affect previous entry, keep going.
	          post_ins = post_del = true;
	          equalitiesLength = 0;
	        } else {
	          equalitiesLength--;  // Throw away the previous equality.
	          pointer = equalitiesLength > 0 ?
	              equalities[equalitiesLength - 1] : -1;
	          post_ins = post_del = false;
	        }
	        changes = true;
	      }
	    }
	    pointer++;
	  }
	
	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	};
	
	
	/**
	 * Reorder and merge like edit sections.  Merge equalities.
	 * Any edit section can move as long as it doesn't cross an equality.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 */
	diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
	  diffs.push([DIFF_EQUAL, '']);  // Add a dummy entry at the end.
	  var pointer = 0;
	  var count_delete = 0;
	  var count_insert = 0;
	  var text_delete = '';
	  var text_insert = '';
	  var commonlength;
	  while (pointer < diffs.length) {
	    switch (diffs[pointer][0]) {
	      case DIFF_INSERT:
	        count_insert++;
	        text_insert += diffs[pointer][1];
	        pointer++;
	        break;
	      case DIFF_DELETE:
	        count_delete++;
	        text_delete += diffs[pointer][1];
	        pointer++;
	        break;
	      case DIFF_EQUAL:
	        // Upon reaching an equality, check for prior redundancies.
	        if (count_delete + count_insert > 1) {
	          if (count_delete !== 0 && count_insert !== 0) {
	            // Factor out any common prefixies.
	            commonlength = this.diff_commonPrefix(text_insert, text_delete);
	            if (commonlength !== 0) {
	              if ((pointer - count_delete - count_insert) > 0 &&
	                  diffs[pointer - count_delete - count_insert - 1][0] ==
	                  DIFF_EQUAL) {
	                diffs[pointer - count_delete - count_insert - 1][1] +=
	                    text_insert.substring(0, commonlength);
	              } else {
	                diffs.splice(0, 0, [DIFF_EQUAL,
	                                    text_insert.substring(0, commonlength)]);
	                pointer++;
	              }
	              text_insert = text_insert.substring(commonlength);
	              text_delete = text_delete.substring(commonlength);
	            }
	            // Factor out any common suffixies.
	            commonlength = this.diff_commonSuffix(text_insert, text_delete);
	            if (commonlength !== 0) {
	              diffs[pointer][1] = text_insert.substring(text_insert.length -
	                  commonlength) + diffs[pointer][1];
	              text_insert = text_insert.substring(0, text_insert.length -
	                  commonlength);
	              text_delete = text_delete.substring(0, text_delete.length -
	                  commonlength);
	            }
	          }
	          // Delete the offending records and add the merged ones.
	          if (count_delete === 0) {
	            diffs.splice(pointer - count_insert,
	                count_delete + count_insert, [DIFF_INSERT, text_insert]);
	          } else if (count_insert === 0) {
	            diffs.splice(pointer - count_delete,
	                count_delete + count_insert, [DIFF_DELETE, text_delete]);
	          } else {
	            diffs.splice(pointer - count_delete - count_insert,
	                count_delete + count_insert, [DIFF_DELETE, text_delete],
	                [DIFF_INSERT, text_insert]);
	          }
	          pointer = pointer - count_delete - count_insert +
	                    (count_delete ? 1 : 0) + (count_insert ? 1 : 0) + 1;
	        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
	          // Merge this equality with the previous one.
	          diffs[pointer - 1][1] += diffs[pointer][1];
	          diffs.splice(pointer, 1);
	        } else {
	          pointer++;
	        }
	        count_insert = 0;
	        count_delete = 0;
	        text_delete = '';
	        text_insert = '';
	        break;
	    }
	  }
	  if (diffs[diffs.length - 1][1] === '') {
	    diffs.pop();  // Remove the dummy entry at the end.
	  }
	
	  // Second pass: look for single edits surrounded on both sides by equalities
	  // which can be shifted sideways to eliminate an equality.
	  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
	  var changes = false;
	  pointer = 1;
	  // Intentionally ignore the first and last element (don't need checking).
	  while (pointer < diffs.length - 1) {
	    if (diffs[pointer - 1][0] == DIFF_EQUAL &&
	        diffs[pointer + 1][0] == DIFF_EQUAL) {
	      // This is a single edit surrounded by equalities.
	      if (diffs[pointer][1].substring(diffs[pointer][1].length -
	          diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
	        // Shift the edit over the previous equality.
	        diffs[pointer][1] = diffs[pointer - 1][1] +
	            diffs[pointer][1].substring(0, diffs[pointer][1].length -
	                                        diffs[pointer - 1][1].length);
	        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
	        diffs.splice(pointer - 1, 1);
	        changes = true;
	      } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
	          diffs[pointer + 1][1]) {
	        // Shift the edit over the next equality.
	        diffs[pointer - 1][1] += diffs[pointer + 1][1];
	        diffs[pointer][1] =
	            diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
	            diffs[pointer + 1][1];
	        diffs.splice(pointer + 1, 1);
	        changes = true;
	      }
	    }
	    pointer++;
	  }
	  // If shifts were made, the diff needs reordering and another shift sweep.
	  if (changes) {
	    this.diff_cleanupMerge(diffs);
	  }
	};
	
	
	/**
	 * loc is a location in text1, compute and return the equivalent location in
	 * text2.
	 * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @param {number} loc Location within text1.
	 * @return {number} Location within text2.
	 */
	diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
	  var chars1 = 0;
	  var chars2 = 0;
	  var last_chars1 = 0;
	  var last_chars2 = 0;
	  var x;
	  for (x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_INSERT) {  // Equality or deletion.
	      chars1 += diffs[x][1].length;
	    }
	    if (diffs[x][0] !== DIFF_DELETE) {  // Equality or insertion.
	      chars2 += diffs[x][1].length;
	    }
	    if (chars1 > loc) {  // Overshot the location.
	      break;
	    }
	    last_chars1 = chars1;
	    last_chars2 = chars2;
	  }
	  // Was the location was deleted?
	  if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
	    return last_chars2;
	  }
	  // Add the remaining character length.
	  return last_chars2 + (loc - last_chars1);
	};
	
	
	/**
	 * Convert a diff array into a pretty HTML report.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} HTML representation.
	 */
	diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
	  var html = [];
	  var pattern_amp = /&/g;
	  var pattern_lt = /</g;
	  var pattern_gt = />/g;
	  var pattern_para = /\n/g;
	  for (var x = 0; x < diffs.length; x++) {
	    var op = diffs[x][0];    // Operation (insert, delete, equal)
	    var data = diffs[x][1];  // Text of change.
	    var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;')
	        .replace(pattern_gt, '&gt;').replace(pattern_para, '&para;<br>');
	    switch (op) {
	      case DIFF_INSERT:
	        html[x] = '<ins style="background:#e6ffe6;">' + text + '</ins>';
	        break;
	      case DIFF_DELETE:
	        html[x] = '<del style="background:#ffe6e6;">' + text + '</del>';
	        break;
	      case DIFF_EQUAL:
	        html[x] = '<span>' + text + '</span>';
	        break;
	    }
	  }
	  return html.join('');
	};
	
	
	/**
	 * Compute and return the source text (all equalities and deletions).
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Source text.
	 */
	diff_match_patch.prototype.diff_text1 = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_INSERT) {
	      text[x] = diffs[x][1];
	    }
	  }
	  return text.join('');
	};
	
	
	/**
	 * Compute and return the destination text (all equalities and insertions).
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Destination text.
	 */
	diff_match_patch.prototype.diff_text2 = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    if (diffs[x][0] !== DIFF_DELETE) {
	      text[x] = diffs[x][1];
	    }
	  }
	  return text.join('');
	};
	
	
	/**
	 * Compute the Levenshtein distance; the number of inserted, deleted or
	 * substituted characters.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {number} Number of changes.
	 */
	diff_match_patch.prototype.diff_levenshtein = function(diffs) {
	  var levenshtein = 0;
	  var insertions = 0;
	  var deletions = 0;
	  for (var x = 0; x < diffs.length; x++) {
	    var op = diffs[x][0];
	    var data = diffs[x][1];
	    switch (op) {
	      case DIFF_INSERT:
	        insertions += data.length;
	        break;
	      case DIFF_DELETE:
	        deletions += data.length;
	        break;
	      case DIFF_EQUAL:
	        // A deletion and an insertion is one substitution.
	        levenshtein += Math.max(insertions, deletions);
	        insertions = 0;
	        deletions = 0;
	        break;
	    }
	  }
	  levenshtein += Math.max(insertions, deletions);
	  return levenshtein;
	};
	
	
	/**
	 * Crush the diff into an encoded string which describes the operations
	 * required to transform text1 into text2.
	 * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
	 * Operations are tab-separated.  Inserted text is escaped using %xx notation.
	 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
	 * @return {string} Delta text.
	 */
	diff_match_patch.prototype.diff_toDelta = function(diffs) {
	  var text = [];
	  for (var x = 0; x < diffs.length; x++) {
	    switch (diffs[x][0]) {
	      case DIFF_INSERT:
	        text[x] = '+' + encodeURI(diffs[x][1]);
	        break;
	      case DIFF_DELETE:
	        text[x] = '-' + diffs[x][1].length;
	        break;
	      case DIFF_EQUAL:
	        text[x] = '=' + diffs[x][1].length;
	        break;
	    }
	  }
	  return text.join('\t').replace(/%20/g, ' ');
	};
	
	
	/**
	 * Given the original text1, and an encoded string which describes the
	 * operations required to transform text1 into text2, compute the full diff.
	 * @param {string} text1 Source string for the diff.
	 * @param {string} delta Delta text.
	 * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
	 * @throws {!Error} If invalid input.
	 */
	diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
	  var diffs = [];
	  var diffsLength = 0;  // Keeping our own length var is faster in JS.
	  var pointer = 0;  // Cursor in text1
	  var tokens = delta.split(/\t/g);
	  for (var x = 0; x < tokens.length; x++) {
	    // Each token begins with a one character parameter which specifies the
	    // operation of this token (delete, insert, equality).
	    var param = tokens[x].substring(1);
	    switch (tokens[x].charAt(0)) {
	      case '+':
	        try {
	          diffs[diffsLength++] = [DIFF_INSERT, decodeURI(param)];
	        } catch (ex) {
	          // Malformed URI sequence.
	          throw new Error('Illegal escape in diff_fromDelta: ' + param);
	        }
	        break;
	      case '-':
	        // Fall through.
	      case '=':
	        var n = parseInt(param, 10);
	        if (isNaN(n) || n < 0) {
	          throw new Error('Invalid number in diff_fromDelta: ' + param);
	        }
	        var text = text1.substring(pointer, pointer += n);
	        if (tokens[x].charAt(0) == '=') {
	          diffs[diffsLength++] = [DIFF_EQUAL, text];
	        } else {
	          diffs[diffsLength++] = [DIFF_DELETE, text];
	        }
	        break;
	      default:
	        // Blank tokens are ok (from a trailing \t).
	        // Anything else is an error.
	        if (tokens[x]) {
	          throw new Error('Invalid diff operation in diff_fromDelta: ' +
	                          tokens[x]);
	        }
	    }
	  }
	  if (pointer != text1.length) {
	    throw new Error('Delta length (' + pointer +
	        ') does not equal source text length (' + text1.length + ').');
	  }
	  return diffs;
	};
	
	
	//  MATCH FUNCTIONS
	
	
	/**
	 * Locate the best instance of 'pattern' in 'text' near 'loc'.
	 * @param {string} text The text to search.
	 * @param {string} pattern The pattern to search for.
	 * @param {number} loc The location to search around.
	 * @return {number} Best match index or -1.
	 */
	diff_match_patch.prototype.match_main = function(text, pattern, loc) {
	  // Check for null inputs.
	  if (text == null || pattern == null || loc == null) {
	    throw new Error('Null input. (match_main)');
	  }
	
	  loc = Math.max(0, Math.min(loc, text.length));
	  if (text == pattern) {
	    // Shortcut (potentially not guaranteed by the algorithm)
	    return 0;
	  } else if (!text.length) {
	    // Nothing to match.
	    return -1;
	  } else if (text.substring(loc, loc + pattern.length) == pattern) {
	    // Perfect match at the perfect spot!  (Includes case of null pattern)
	    return loc;
	  } else {
	    // Do a fuzzy compare.
	    return this.match_bitap_(text, pattern, loc);
	  }
	};
	
	
	/**
	 * Locate the best instance of 'pattern' in 'text' near 'loc' using the
	 * Bitap algorithm.
	 * @param {string} text The text to search.
	 * @param {string} pattern The pattern to search for.
	 * @param {number} loc The location to search around.
	 * @return {number} Best match index or -1.
	 * @private
	 */
	diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
	  if (pattern.length > this.Match_MaxBits) {
	    throw new Error('Pattern too long for this browser.');
	  }
	
	  // Initialise the alphabet.
	  var s = this.match_alphabet_(pattern);
	
	  var dmp = this;  // 'this' becomes 'window' in a closure.
	
	  /**
	   * Compute and return the score for a match with e errors and x location.
	   * Accesses loc and pattern through being a closure.
	   * @param {number} e Number of errors in match.
	   * @param {number} x Location of match.
	   * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
	   * @private
	   */
	  function match_bitapScore_(e, x) {
	    var accuracy = e / pattern.length;
	    var proximity = Math.abs(loc - x);
	    if (!dmp.Match_Distance) {
	      // Dodge divide by zero error.
	      return proximity ? 1.0 : accuracy;
	    }
	    return accuracy + (proximity / dmp.Match_Distance);
	  }
	
	  // Highest score beyond which we give up.
	  var score_threshold = this.Match_Threshold;
	  // Is there a nearby exact match? (speedup)
	  var best_loc = text.indexOf(pattern, loc);
	  if (best_loc != -1) {
	    score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
	    // What about in the other direction? (speedup)
	    best_loc = text.lastIndexOf(pattern, loc + pattern.length);
	    if (best_loc != -1) {
	      score_threshold =
	          Math.min(match_bitapScore_(0, best_loc), score_threshold);
	    }
	  }
	
	  // Initialise the bit arrays.
	  var matchmask = 1 << (pattern.length - 1);
	  best_loc = -1;
	
	  var bin_min, bin_mid;
	  var bin_max = pattern.length + text.length;
	  var last_rd;
	  for (var d = 0; d < pattern.length; d++) {
	    // Scan for the best match; each iteration allows for one more error.
	    // Run a binary search to determine how far from 'loc' we can stray at this
	    // error level.
	    bin_min = 0;
	    bin_mid = bin_max;
	    while (bin_min < bin_mid) {
	      if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
	        bin_min = bin_mid;
	      } else {
	        bin_max = bin_mid;
	      }
	      bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
	    }
	    // Use the result from this iteration as the maximum for the next.
	    bin_max = bin_mid;
	    var start = Math.max(1, loc - bin_mid + 1);
	    var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
	
	    var rd = Array(finish + 2);
	    rd[finish + 1] = (1 << d) - 1;
	    for (var j = finish; j >= start; j--) {
	      // The alphabet (s) is a sparse hash, so the following line generates
	      // warnings.
	      var charMatch = s[text.charAt(j - 1)];
	      if (d === 0) {  // First pass: exact match.
	        rd[j] = ((rd[j + 1] << 1) | 1) & charMatch;
	      } else {  // Subsequent passes: fuzzy match.
	        rd[j] = (((rd[j + 1] << 1) | 1) & charMatch) |
	                (((last_rd[j + 1] | last_rd[j]) << 1) | 1) |
	                last_rd[j + 1];
	      }
	      if (rd[j] & matchmask) {
	        var score = match_bitapScore_(d, j - 1);
	        // This match will almost certainly be better than any existing match.
	        // But check anyway.
	        if (score <= score_threshold) {
	          // Told you so.
	          score_threshold = score;
	          best_loc = j - 1;
	          if (best_loc > loc) {
	            // When passing loc, don't exceed our current distance from loc.
	            start = Math.max(1, 2 * loc - best_loc);
	          } else {
	            // Already passed loc, downhill from here on in.
	            break;
	          }
	        }
	      }
	    }
	    // No hope for a (better) match at greater error levels.
	    if (match_bitapScore_(d + 1, loc) > score_threshold) {
	      break;
	    }
	    last_rd = rd;
	  }
	  return best_loc;
	};
	
	
	/**
	 * Initialise the alphabet for the Bitap algorithm.
	 * @param {string} pattern The text to encode.
	 * @return {!Object} Hash of character locations.
	 * @private
	 */
	diff_match_patch.prototype.match_alphabet_ = function(pattern) {
	  var s = {};
	  for (var i = 0; i < pattern.length; i++) {
	    s[pattern.charAt(i)] = 0;
	  }
	  for (var i = 0; i < pattern.length; i++) {
	    s[pattern.charAt(i)] |= 1 << (pattern.length - i - 1);
	  }
	  return s;
	};
	
	
	//  PATCH FUNCTIONS
	
	
	/**
	 * Increase the context until it is unique,
	 * but don't let the pattern expand beyond Match_MaxBits.
	 * @param {!diff_match_patch.patch_obj} patch The patch to grow.
	 * @param {string} text Source text.
	 * @private
	 */
	diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
	  if (text.length == 0) {
	    return;
	  }
	  var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
	  var padding = 0;
	
	  // Look for the first and last matches of pattern in text.  If two different
	  // matches are found, increase the pattern length.
	  while (text.indexOf(pattern) != text.lastIndexOf(pattern) &&
	         pattern.length < this.Match_MaxBits - this.Patch_Margin -
	         this.Patch_Margin) {
	    padding += this.Patch_Margin;
	    pattern = text.substring(patch.start2 - padding,
	                             patch.start2 + patch.length1 + padding);
	  }
	  // Add one chunk for good luck.
	  padding += this.Patch_Margin;
	
	  // Add the prefix.
	  var prefix = text.substring(patch.start2 - padding, patch.start2);
	  if (prefix) {
	    patch.diffs.unshift([DIFF_EQUAL, prefix]);
	  }
	  // Add the suffix.
	  var suffix = text.substring(patch.start2 + patch.length1,
	                              patch.start2 + patch.length1 + padding);
	  if (suffix) {
	    patch.diffs.push([DIFF_EQUAL, suffix]);
	  }
	
	  // Roll back the start points.
	  patch.start1 -= prefix.length;
	  patch.start2 -= prefix.length;
	  // Extend the lengths.
	  patch.length1 += prefix.length + suffix.length;
	  patch.length2 += prefix.length + suffix.length;
	};
	
	
	/**
	 * Compute a list of patches to turn text1 into text2.
	 * Use diffs if provided, otherwise compute it ourselves.
	 * There are four ways to call this function, depending on what data is
	 * available to the caller:
	 * Method 1:
	 * a = text1, b = text2
	 * Method 2:
	 * a = diffs
	 * Method 3 (optimal):
	 * a = text1, b = diffs
	 * Method 4 (deprecated, use method 3):
	 * a = text1, b = text2, c = diffs
	 *
	 * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
	 * Array of diff tuples for text1 to text2 (method 2).
	 * @param {string|!Array.<!diff_match_patch.Diff>} opt_b text2 (methods 1,4) or
	 * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
	 * @param {string|!Array.<!diff_match_patch.Diff>} opt_c Array of diff tuples
	 * for text1 to text2 (method 4) or undefined (methods 1,2,3).
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
	  var text1, diffs;
	  if (typeof a == 'string' && typeof opt_b == 'string' &&
	      typeof opt_c == 'undefined') {
	    // Method 1: text1, text2
	    // Compute diffs from text1 and text2.
	    text1 = /** @type {string} */(a);
	    diffs = this.diff_main(text1, /** @type {string} */(opt_b), true);
	    if (diffs.length > 2) {
	      this.diff_cleanupSemantic(diffs);
	      this.diff_cleanupEfficiency(diffs);
	    }
	  } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' &&
	      typeof opt_c == 'undefined') {
	    // Method 2: diffs
	    // Compute text1 from diffs.
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(a);
	    text1 = this.diff_text1(diffs);
	  } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' &&
	      typeof opt_c == 'undefined') {
	    // Method 3: text1, diffs
	    text1 = /** @type {string} */(a);
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_b);
	  } else if (typeof a == 'string' && typeof opt_b == 'string' &&
	      opt_c && typeof opt_c == 'object') {
	    // Method 4: text1, text2, diffs
	    // text2 is not used.
	    text1 = /** @type {string} */(a);
	    diffs = /** @type {!Array.<!diff_match_patch.Diff>} */(opt_c);
	  } else {
	    throw new Error('Unknown call format to patch_make.');
	  }
	
	  if (diffs.length === 0) {
	    return [];  // Get rid of the null case.
	  }
	  var patches = [];
	  var patch = new diff_match_patch.patch_obj();
	  var patchDiffLength = 0;  // Keeping our own length var is faster in JS.
	  var char_count1 = 0;  // Number of characters into the text1 string.
	  var char_count2 = 0;  // Number of characters into the text2 string.
	  // Start with text1 (prepatch_text) and apply the diffs until we arrive at
	  // text2 (postpatch_text).  We recreate the patches one by one to determine
	  // context info.
	  var prepatch_text = text1;
	  var postpatch_text = text1;
	  for (var x = 0; x < diffs.length; x++) {
	    var diff_type = diffs[x][0];
	    var diff_text = diffs[x][1];
	
	    if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
	      // A new patch starts here.
	      patch.start1 = char_count1;
	      patch.start2 = char_count2;
	    }
	
	    switch (diff_type) {
	      case DIFF_INSERT:
	        patch.diffs[patchDiffLength++] = diffs[x];
	        patch.length2 += diff_text.length;
	        postpatch_text = postpatch_text.substring(0, char_count2) + diff_text +
	                         postpatch_text.substring(char_count2);
	        break;
	      case DIFF_DELETE:
	        patch.length1 += diff_text.length;
	        patch.diffs[patchDiffLength++] = diffs[x];
	        postpatch_text = postpatch_text.substring(0, char_count2) +
	                         postpatch_text.substring(char_count2 +
	                             diff_text.length);
	        break;
	      case DIFF_EQUAL:
	        if (diff_text.length <= 2 * this.Patch_Margin &&
	            patchDiffLength && diffs.length != x + 1) {
	          // Small equality inside a patch.
	          patch.diffs[patchDiffLength++] = diffs[x];
	          patch.length1 += diff_text.length;
	          patch.length2 += diff_text.length;
	        } else if (diff_text.length >= 2 * this.Patch_Margin) {
	          // Time for a new patch.
	          if (patchDiffLength) {
	            this.patch_addContext_(patch, prepatch_text);
	            patches.push(patch);
	            patch = new diff_match_patch.patch_obj();
	            patchDiffLength = 0;
	            // Unlike Unidiff, our patch lists have a rolling context.
	            // http://code.google.com/p/google-diff-match-patch/wiki/Unidiff
	            // Update prepatch text & pos to reflect the application of the
	            // just completed patch.
	            prepatch_text = postpatch_text;
	            char_count1 = char_count2;
	          }
	        }
	        break;
	    }
	
	    // Update the current character count.
	    if (diff_type !== DIFF_INSERT) {
	      char_count1 += diff_text.length;
	    }
	    if (diff_type !== DIFF_DELETE) {
	      char_count2 += diff_text.length;
	    }
	  }
	  // Pick up the leftover patch if not empty.
	  if (patchDiffLength) {
	    this.patch_addContext_(patch, prepatch_text);
	    patches.push(patch);
	  }
	
	  return patches;
	};
	
	
	/**
	 * Given an array of patches, return another array that is identical.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_deepCopy = function(patches) {
	  // Making deep copies is hard in JavaScript.
	  var patchesCopy = [];
	  for (var x = 0; x < patches.length; x++) {
	    var patch = patches[x];
	    var patchCopy = new diff_match_patch.patch_obj();
	    patchCopy.diffs = [];
	    for (var y = 0; y < patch.diffs.length; y++) {
	      patchCopy.diffs[y] = patch.diffs[y].slice();
	    }
	    patchCopy.start1 = patch.start1;
	    patchCopy.start2 = patch.start2;
	    patchCopy.length1 = patch.length1;
	    patchCopy.length2 = patch.length2;
	    patchesCopy[x] = patchCopy;
	  }
	  return patchesCopy;
	};
	
	
	/**
	 * Merge a set of patches onto the text.  Return a patched text, as well
	 * as a list of true/false values indicating which patches were applied.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @param {string} text Old text.
	 * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
	 *      new text and an array of boolean values.
	 */
	diff_match_patch.prototype.patch_apply = function(patches, text) {
	  if (patches.length == 0) {
	    return [text, []];
	  }
	
	  // Deep copy the patches so that no changes are made to originals.
	  patches = this.patch_deepCopy(patches);
	
	  var nullPadding = this.patch_addPadding(patches);
	  text = nullPadding + text + nullPadding;
	
	  this.patch_splitMax(patches);
	  // delta keeps track of the offset between the expected and actual location
	  // of the previous patch.  If there are patches expected at positions 10 and
	  // 20, but the first patch was found at 12, delta is 2 and the second patch
	  // has an effective expected position of 22.
	  var delta = 0;
	  var results = [];
	  for (var x = 0; x < patches.length; x++) {
	    var expected_loc = patches[x].start2 + delta;
	    var text1 = this.diff_text1(patches[x].diffs);
	    var start_loc;
	    var end_loc = -1;
	    if (text1.length > this.Match_MaxBits) {
	      // patch_splitMax will only provide an oversized pattern in the case of
	      // a monster delete.
	      start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits),
	                                  expected_loc);
	      if (start_loc != -1) {
	        end_loc = this.match_main(text,
	            text1.substring(text1.length - this.Match_MaxBits),
	            expected_loc + text1.length - this.Match_MaxBits);
	        if (end_loc == -1 || start_loc >= end_loc) {
	          // Can't find valid trailing context.  Drop this patch.
	          start_loc = -1;
	        }
	      }
	    } else {
	      start_loc = this.match_main(text, text1, expected_loc);
	    }
	    if (start_loc == -1) {
	      // No match found.  :(
	      results[x] = false;
	      // Subtract the delta for this failed patch from subsequent patches.
	      delta -= patches[x].length2 - patches[x].length1;
	    } else {
	      // Found a match.  :)
	      results[x] = true;
	      delta = start_loc - expected_loc;
	      var text2;
	      if (end_loc == -1) {
	        text2 = text.substring(start_loc, start_loc + text1.length);
	      } else {
	        text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
	      }
	      if (text1 == text2) {
	        // Perfect match, just shove the replacement text in.
	        text = text.substring(0, start_loc) +
	               this.diff_text2(patches[x].diffs) +
	               text.substring(start_loc + text1.length);
	      } else {
	        // Imperfect match.  Run a diff to get a framework of equivalent
	        // indices.
	        var diffs = this.diff_main(text1, text2, false);
	        if (text1.length > this.Match_MaxBits &&
	            this.diff_levenshtein(diffs) / text1.length >
	            this.Patch_DeleteThreshold) {
	          // The end points match, but the content is unacceptably bad.
	          results[x] = false;
	        } else {
	          this.diff_cleanupSemanticLossless(diffs);
	          var index1 = 0;
	          var index2;
	          for (var y = 0; y < patches[x].diffs.length; y++) {
	            var mod = patches[x].diffs[y];
	            if (mod[0] !== DIFF_EQUAL) {
	              index2 = this.diff_xIndex(diffs, index1);
	            }
	            if (mod[0] === DIFF_INSERT) {  // Insertion
	              text = text.substring(0, start_loc + index2) + mod[1] +
	                     text.substring(start_loc + index2);
	            } else if (mod[0] === DIFF_DELETE) {  // Deletion
	              text = text.substring(0, start_loc + index2) +
	                     text.substring(start_loc + this.diff_xIndex(diffs,
	                         index1 + mod[1].length));
	            }
	            if (mod[0] !== DIFF_DELETE) {
	              index1 += mod[1].length;
	            }
	          }
	        }
	      }
	    }
	  }
	  // Strip the padding off.
	  text = text.substring(nullPadding.length, text.length - nullPadding.length);
	  return [text, results];
	};
	
	
	/**
	 * Add some padding on text start and end so that edges can match something.
	 * Intended to be called only from within patch_apply.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {string} The padding string added to each side.
	 */
	diff_match_patch.prototype.patch_addPadding = function(patches) {
	  var paddingLength = this.Patch_Margin;
	  var nullPadding = '';
	  for (var x = 1; x <= paddingLength; x++) {
	    nullPadding += String.fromCharCode(x);
	  }
	
	  // Bump all the patches forward.
	  for (var x = 0; x < patches.length; x++) {
	    patches[x].start1 += paddingLength;
	    patches[x].start2 += paddingLength;
	  }
	
	  // Add some padding on start of first diff.
	  var patch = patches[0];
	  var diffs = patch.diffs;
	  if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
	    // Add nullPadding equality.
	    diffs.unshift([DIFF_EQUAL, nullPadding]);
	    patch.start1 -= paddingLength;  // Should be 0.
	    patch.start2 -= paddingLength;  // Should be 0.
	    patch.length1 += paddingLength;
	    patch.length2 += paddingLength;
	  } else if (paddingLength > diffs[0][1].length) {
	    // Grow first equality.
	    var extraLength = paddingLength - diffs[0][1].length;
	    diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
	    patch.start1 -= extraLength;
	    patch.start2 -= extraLength;
	    patch.length1 += extraLength;
	    patch.length2 += extraLength;
	  }
	
	  // Add some padding on end of last diff.
	  patch = patches[patches.length - 1];
	  diffs = patch.diffs;
	  if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
	    // Add nullPadding equality.
	    diffs.push([DIFF_EQUAL, nullPadding]);
	    patch.length1 += paddingLength;
	    patch.length2 += paddingLength;
	  } else if (paddingLength > diffs[diffs.length - 1][1].length) {
	    // Grow last equality.
	    var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
	    diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
	    patch.length1 += extraLength;
	    patch.length2 += extraLength;
	  }
	
	  return nullPadding;
	};
	
	
	/**
	 * Look through the patches and break up any which are longer than the maximum
	 * limit of the match algorithm.
	 * Intended to be called only from within patch_apply.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 */
	diff_match_patch.prototype.patch_splitMax = function(patches) {
	  var patch_size = this.Match_MaxBits;
	  for (var x = 0; x < patches.length; x++) {
	    if (patches[x].length1 <= patch_size) {
	      continue;
	    }
	    var bigpatch = patches[x];
	    // Remove the big old patch.
	    patches.splice(x--, 1);
	    var start1 = bigpatch.start1;
	    var start2 = bigpatch.start2;
	    var precontext = '';
	    while (bigpatch.diffs.length !== 0) {
	      // Create one of several smaller patches.
	      var patch = new diff_match_patch.patch_obj();
	      var empty = true;
	      patch.start1 = start1 - precontext.length;
	      patch.start2 = start2 - precontext.length;
	      if (precontext !== '') {
	        patch.length1 = patch.length2 = precontext.length;
	        patch.diffs.push([DIFF_EQUAL, precontext]);
	      }
	      while (bigpatch.diffs.length !== 0 &&
	             patch.length1 < patch_size - this.Patch_Margin) {
	        var diff_type = bigpatch.diffs[0][0];
	        var diff_text = bigpatch.diffs[0][1];
	        if (diff_type === DIFF_INSERT) {
	          // Insertions are harmless.
	          patch.length2 += diff_text.length;
	          start2 += diff_text.length;
	          patch.diffs.push(bigpatch.diffs.shift());
	          empty = false;
	        } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 &&
	                   patch.diffs[0][0] == DIFF_EQUAL &&
	                   diff_text.length > 2 * patch_size) {
	          // This is a large deletion.  Let it pass in one chunk.
	          patch.length1 += diff_text.length;
	          start1 += diff_text.length;
	          empty = false;
	          patch.diffs.push([diff_type, diff_text]);
	          bigpatch.diffs.shift();
	        } else {
	          // Deletion or equality.  Only take as much as we can stomach.
	          diff_text = diff_text.substring(0,
	              patch_size - patch.length1 - this.Patch_Margin);
	          patch.length1 += diff_text.length;
	          start1 += diff_text.length;
	          if (diff_type === DIFF_EQUAL) {
	            patch.length2 += diff_text.length;
	            start2 += diff_text.length;
	          } else {
	            empty = false;
	          }
	          patch.diffs.push([diff_type, diff_text]);
	          if (diff_text == bigpatch.diffs[0][1]) {
	            bigpatch.diffs.shift();
	          } else {
	            bigpatch.diffs[0][1] =
	                bigpatch.diffs[0][1].substring(diff_text.length);
	          }
	        }
	      }
	      // Compute the head context for the next patch.
	      precontext = this.diff_text2(patch.diffs);
	      precontext =
	          precontext.substring(precontext.length - this.Patch_Margin);
	      // Append the end context for this patch.
	      var postcontext = this.diff_text1(bigpatch.diffs)
	                            .substring(0, this.Patch_Margin);
	      if (postcontext !== '') {
	        patch.length1 += postcontext.length;
	        patch.length2 += postcontext.length;
	        if (patch.diffs.length !== 0 &&
	            patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
	          patch.diffs[patch.diffs.length - 1][1] += postcontext;
	        } else {
	          patch.diffs.push([DIFF_EQUAL, postcontext]);
	        }
	      }
	      if (!empty) {
	        patches.splice(++x, 0, patch);
	      }
	    }
	  }
	};
	
	
	/**
	 * Take a list of patches and return a textual representation.
	 * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
	 * @return {string} Text representation of patches.
	 */
	diff_match_patch.prototype.patch_toText = function(patches) {
	  var text = [];
	  for (var x = 0; x < patches.length; x++) {
	    text[x] = patches[x];
	  }
	  return text.join('');
	};
	
	
	/**
	 * Parse a textual representation of patches and return a list of Patch objects.
	 * @param {string} textline Text representation of patches.
	 * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
	 * @throws {!Error} If invalid input.
	 */
	diff_match_patch.prototype.patch_fromText = function(textline) {
	  var patches = [];
	  if (!textline) {
	    return patches;
	  }
	  var text = textline.split('\n');
	  var textPointer = 0;
	  var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
	  while (textPointer < text.length) {
	    var m = text[textPointer].match(patchHeader);
	    if (!m) {
	      throw new Error('Invalid patch string: ' + text[textPointer]);
	    }
	    var patch = new diff_match_patch.patch_obj();
	    patches.push(patch);
	    patch.start1 = parseInt(m[1], 10);
	    if (m[2] === '') {
	      patch.start1--;
	      patch.length1 = 1;
	    } else if (m[2] == '0') {
	      patch.length1 = 0;
	    } else {
	      patch.start1--;
	      patch.length1 = parseInt(m[2], 10);
	    }
	
	    patch.start2 = parseInt(m[3], 10);
	    if (m[4] === '') {
	      patch.start2--;
	      patch.length2 = 1;
	    } else if (m[4] == '0') {
	      patch.length2 = 0;
	    } else {
	      patch.start2--;
	      patch.length2 = parseInt(m[4], 10);
	    }
	    textPointer++;
	
	    while (textPointer < text.length) {
	      var sign = text[textPointer].charAt(0);
	      try {
	        var line = decodeURI(text[textPointer].substring(1));
	      } catch (ex) {
	        // Malformed URI sequence.
	        throw new Error('Illegal escape in patch_fromText: ' + line);
	      }
	      if (sign == '-') {
	        // Deletion.
	        patch.diffs.push([DIFF_DELETE, line]);
	      } else if (sign == '+') {
	        // Insertion.
	        patch.diffs.push([DIFF_INSERT, line]);
	      } else if (sign == ' ') {
	        // Minor equality.
	        patch.diffs.push([DIFF_EQUAL, line]);
	      } else if (sign == '@') {
	        // Start of next patch.
	        break;
	      } else if (sign === '') {
	        // Blank line?  Whatever.
	      } else {
	        // WTF?
	        throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
	      }
	      textPointer++;
	    }
	  }
	  return patches;
	};
	
	
	/**
	 * Class representing one patch operation.
	 * @constructor
	 */
	diff_match_patch.patch_obj = function() {
	  /** @type {!Array.<!diff_match_patch.Diff>} */
	  this.diffs = [];
	  /** @type {?number} */
	  this.start1 = null;
	  /** @type {?number} */
	  this.start2 = null;
	  /** @type {number} */
	  this.length1 = 0;
	  /** @type {number} */
	  this.length2 = 0;
	};
	
	
	/**
	 * Emmulate GNU diff's format.
	 * Header: @@ -382,8 +481,9 @@
	 * Indicies are printed as 1-based, not 0-based.
	 * @return {string} The GNU diff string.
	 */
	diff_match_patch.patch_obj.prototype.toString = function() {
	  var coords1, coords2;
	  if (this.length1 === 0) {
	    coords1 = this.start1 + ',0';
	  } else if (this.length1 == 1) {
	    coords1 = this.start1 + 1;
	  } else {
	    coords1 = (this.start1 + 1) + ',' + this.length1;
	  }
	  if (this.length2 === 0) {
	    coords2 = this.start2 + ',0';
	  } else if (this.length2 == 1) {
	    coords2 = this.start2 + 1;
	  } else {
	    coords2 = (this.start2 + 1) + ',' + this.length2;
	  }
	  var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
	  var op;
	  // Escape the body of the patch with %xx notation.
	  for (var x = 0; x < this.diffs.length; x++) {
	    switch (this.diffs[x][0]) {
	      case DIFF_INSERT:
	        op = '+';
	        break;
	      case DIFF_DELETE:
	        op = '-';
	        break;
	      case DIFF_EQUAL:
	        op = ' ';
	        break;
	    }
	    text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
	  }
	  return text.join('').replace(/%20/g, ' ');
	};
	
	
	// The following export code was added by @ForbesLindesay
	module.exports = diff_match_patch;
	module.exports['diff_match_patch'] = diff_match_patch;
	module.exports['DIFF_DELETE'] = DIFF_DELETE;
	module.exports['DIFF_INSERT'] = DIFF_INSERT;
	module.exports['DIFF_EQUAL'] = DIFF_EQUAL;


/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ToolManager = exports.ToolManager = function () {
	  function ToolManager(viewer, defaultTool) {
	    var _this = this;
	
	    _classCallCheck(this, ToolManager);
	
	    this.defaultTool = defaultTool;
	    this.tool = defaultTool;
	    this.viewer = viewer;
	    var canvas = viewer.canvas;
	    canvas.addEventListener('mousemove', function (e) {
	      e.preventDefault();
	      //e.stopPropagation(); // allow propagation for move in sake of dynamic layout 
	      _this.tool.mousemove(e);
	    }, false);
	    canvas.addEventListener('mousedown', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      _this.tool.mousedown(e);
	    }, false);
	    canvas.addEventListener('mouseup', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      _this.tool.mouseup(e);
	    }, false);
	    canvas.addEventListener('mousewheel', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      var tool = _this.tool;
	      if (tool.mousewheel === undefined) {
	        tool = _this.defaultTool;
	      }
	      if (tool.mousewheel !== undefined) {
	        tool.mousewheel(e);
	      }
	    }, false);
	    canvas.addEventListener('dblclick', function (e) {
	      e.preventDefault();
	      e.stopPropagation();
	      _this.tool.dblclick(e);
	    }, false);
	
	    window.addEventListener("keydown", function (e) {
	      _this.tool.keydown(e);
	      if (e.keyCode == 27) {
	        _this.releaseControl();
	      } else if (e.keyCode == 46 || e.keyCode == 8) {
	        var selection = viewer.selected.slice();
	        viewer.deselectAll();
	        for (var i = 0; i < selection.length; i++) {
	          viewer.remove(selection[i]);
	        }
	        viewer.refresh();
	      }
	    }, false);
	    window.addEventListener("keypress", function (e) {
	      _this.tool.keydown(e);
	    }, false);
	    window.addEventListener("keyup", function (e) {
	      _this.tool.keydown(e);
	    }, false);
	  }
	
	  _createClass(ToolManager, [{
	    key: 'takeControl',
	    value: function takeControl(tool) {
	      this.switchTool(tool);
	      this.tool.restart();
	    }
	  }, {
	    key: 'switchTool',
	    value: function switchTool(tool) {
	      this.tool = tool;
	      this.viewer.bus.notify("tool-change");
	    }
	  }, {
	    key: 'releaseControl',
	    value: function releaseControl() {
	      this.tool.cleanup();
	      this.takeControl(this.defaultTool);
	    }
	  }]);

	  return ToolManager;
	}();

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PanTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tool = __webpack_require__(101);
	
	var _editToolsMap = __webpack_require__(106);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PanTool = exports.PanTool = function (_Tool) {
	  _inherits(PanTool, _Tool);
	
	  function PanTool(viewer) {
	    _classCallCheck(this, PanTool);
	
	    var _this = _possibleConstructorReturn(this, (PanTool.__proto__ || Object.getPrototypeOf(PanTool)).call(this, 'pan', viewer));
	
	    _this.dragging = false;
	    _this.x = 0.0;
	    _this.y = 0.0;
	    return _this;
	  }
	
	  _createClass(PanTool, [{
	    key: 'mousemove',
	    value: function mousemove(e) {
	      if (!this.dragging) {
	        return;
	      }
	      var dx = e.pageX - this.x;
	      var dy = e.pageY - this.y;
	      dy *= -1;
	
	      this.viewer.translate.x += dx * this.viewer.retinaPxielRatio;
	      this.viewer.translate.y += dy * this.viewer.retinaPxielRatio;
	
	      this.x = e.pageX;
	      this.y = e.pageY;
	      this.deselectOnUp = false;
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'mousedown',
	    value: function mousedown(e) {
	      if (e.button == 0) {
	        var picked = this.viewer.pick(e);
	        var i;
	        if (picked.length > 0) {
	          var toSelect;
	          if (e.shiftKey) {
	            toSelect = picked[0];
	            var ids = this.viewer.selected.map(function (s) {
	              return s.id;
	            });
	            for (i = 0; i < picked.length; i++) {
	              if (ids.indexOf(picked[i].id) != -1) {
	                this.viewer.deselect(picked[i]);
	              } else {
	                toSelect = picked[i];
	              }
	            }
	            this.viewer.select([toSelect], false);
	            this.deselectOnUp = false;
	          } else {
	            toSelect = picked[0];
	            if (this.viewer.selected.length === 1) {
	              for (i = 0; i < picked.length - 1; i++) {
	                if (picked[i].id == this.viewer.selected[0].id) {
	                  toSelect = picked[i + 1];
	                  break;
	                }
	              }
	            }
	            this.viewer.select([toSelect], true);
	            if (!toSelect.isAuxOrLinkedTo()) {
	              var tool = (0, _editToolsMap.GetShapeEditTool)(this.viewer, toSelect, e.altKey);
	              tool.mousedown(e);
	              this.viewer.toolManager.switchTool(tool);
	            }
	          }
	          this.viewer.refresh();
	          return;
	        }
	      }
	
	      this.dragging = true;
	      this.deselectOnUp = true;
	      this.x = e.pageX;
	      this.y = e.pageY;
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      this.dragging = false;
	      if (this.deselectOnUp) {
	        this.viewer.deselectAll();
	        this.viewer.refresh();
	      }
	      this.deselectOnUp = false;
	    }
	  }, {
	    key: 'mousewheel',
	    value: function mousewheel(e) {
	
	      var delta = 0;
	
	      if (e.wheelDelta) {
	        // WebKit / Opera / Explorer 9
	        delta = e.wheelDelta;
	      } else if (e.detail) {
	        // Firefox
	        delta = -e.detail;
	      }
	
	      var before = this.viewer.screenToModel(e);
	
	      var step = 0.05;
	      delta = delta < 0 ? 1 - step : 1 + step;
	      this.viewer.scale *= delta;
	
	      var after = this.viewer.screenToModel(e);
	
	      var dx = after.x - before.x;
	      var dy = after.y - before.y;
	
	      this.viewer.translate.x += dx * this.viewer.scale;
	      this.viewer.translate.y += dy * this.viewer.scale;
	
	      this.viewer.refresh();
	    }
	  }]);

	  return PanTool;
	}(_tool.Tool);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _point = __webpack_require__(102);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Tool = exports.Tool = function () {
	  function Tool(name, viewer) {
	    _classCallCheck(this, Tool);
	
	    this.name = name;
	    this.viewer = viewer;
	  }
	
	  _createClass(Tool, [{
	    key: 'restart',
	    value: function restart() {}
	  }, {
	    key: 'cleanup',
	    value: function cleanup() {}
	  }, {
	    key: 'mousemove',
	    value: function mousemove(e) {}
	  }, {
	    key: 'mousedown',
	    value: function mousedown(e) {}
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {}
	  }, {
	    key: 'dblclick',
	    value: function dblclick(e) {}
	  }, {
	    key: 'keydown',
	    value: function keydown(e) {}
	  }, {
	    key: 'keypress',
	    value: function keypress(e) {}
	  }, {
	    key: 'keyup',
	    value: function keyup(e) {}
	  }, {
	    key: 'sendMessage',
	    value: function sendMessage(text) {
	      this.viewer.bus.notify('tool-message', text);
	    }
	  }, {
	    key: 'sendHint',
	    value: function sendHint(hint) {
	      this.viewer.bus.notify('tool-hint', hint);
	    }
	  }, {
	    key: 'sendSpecifyPointHint',
	    value: function sendSpecifyPointHint() {
	      this.sendHint('specify point');
	    }
	  }, {
	    key: 'pointPicked',
	    value: function pointPicked(x, y) {
	      this.sendMessage('picked: ' + this.viewer.roundToPrecision(x) + " : " + this.viewer.roundToPrecision(y));
	      this.viewer.referencePoint.x = x;
	      this.viewer.referencePoint.y = y;
	    }
	  }, {
	    key: 'snapIfNeed',
	    value: function snapIfNeed(p) {
	      if (this.viewer.snapped != null) {
	        var snapWith = this.viewer.snapped;
	        this.viewer.cleanSnap();
	        p.setFromPoint(snapWith);
	        this.viewer.parametricManager.linkObjects([p, snapWith]);
	        this.viewer.parametricManager.refresh();
	      }
	    }
	  }, {
	    key: 'endpoint',
	    value: function endpoint(e) {
	      var ep = new _point.EndPoint(0, 0);
	      if (this.viewer.snapped != null) {
	        this.snapIfNeed(ep);
	      } else {
	        ep.setFromPoint(this.viewer.screenToModel(e));
	      }
	      return ep;
	    }
	  }], [{
	    key: 'dumbMode',
	    value: function dumbMode(e) {
	      return e.ctrlKey || e.metaKey;
	    }
	  }]);
	
	  return Tool;
	}();
	
	Tool.ParseNumber = function (str) {
	  var val = void 0;
	  try {
	    val = eval(str);
	  } catch (e) {
	    return e.toString();
	  }
	  var valNumber = parseFloat(val);
	  if (isNaN(valNumber)) return "wrong input for number: " + str;
	  return valNumber;
	};
	
	Tool.ParseNumberWithRef = function (str, ref) {
	  var rel = str.startsWith('@');
	  if (rel) {
	    str = str.substring(1);
	  }
	  var val = Tool.ParseNumber(str);
	  if (typeof val === 'string') return val;
	  if (rel) {
	    val += ref;
	  }
	  return val;
	};
	
	var VECTOR_PATTERN = /^(@)?(.+)(,|<)(.+)$/;
	
	Tool.ParseVector = function (referencePoint, command) {
	  command = command.replace(/\s+/g, '');
	
	  var match = command.match(VECTOR_PATTERN);
	  if (match) {
	    var ref = match[1] !== undefined;
	    var x = Tool.ParseNumber(match[2]);
	    if (typeof x === 'string') return x;
	    var polar = match[3] == '<';
	    var y = Tool.ParseNumber(match[4]);
	    if (typeof y === 'string') return y;
	    if (polar) {
	      var angle = y / 180 * Math.PI;
	      var radius = x;
	      x = radius * Math.cos(angle);
	      y = radius * Math.sin(angle);
	    }
	    if (ref) {
	      x += referencePoint.x;
	      y += referencePoint.y;
	    }
	    return { x: x, y: y };
	  }
	
	  return "wrong input, point is expected: x,y | @x,y | r<polar | @r<polar ";
	};
	
	Tool.ParseNumberSequence = function (command, refs, length) {
	  command = command.replace(/\s+/g, '');
	  var parts = command.split(',');
	  var result = [];
	  for (var i = 0; i < parts.length; i++) {
	    var part = parts[i];
	    var val = refs && refs[i] ? Tool.ParseNumberWithRef(part, refs[i]) : Tool.ParseNumberWithRef(part);
	    result.push(val);
	  }
	  if (length !== undefined && result.length != length) {
	    return "wrong input, sequence of length " + length + " is expected: x1,x2...";
	  }
	  return result;
	};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Param = exports.EndPoint = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sketchObject = __webpack_require__(103);
	
	var _drawUtils = __webpack_require__(105);
	
	var _idGenerator = __webpack_require__(84);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EndPoint = exports.EndPoint = function (_SketchObject) {
	  _inherits(EndPoint, _SketchObject);
	
	  function EndPoint(x, y) {
	    _classCallCheck(this, EndPoint);
	
	    var _this = _possibleConstructorReturn(this, (EndPoint.__proto__ || Object.getPrototypeOf(EndPoint)).call(this));
	
	    _this.x = x;
	    _this.y = y;
	    _this.parent = null;
	    _this._x = new Param(_this, 'x');
	    _this._y = new Param(_this, 'y');
	    return _this;
	  }
	
	  _createClass(EndPoint, [{
	    key: 'collectParams',
	    value: function collectParams(params) {
	      params.push(this._x);
	      params.push(this._y);
	    }
	  }, {
	    key: 'normalDistance',
	    value: function normalDistance(aim) {
	      return aim.minus(new _vector2.default(this.x, this.y)).length();
	    }
	  }, {
	    key: 'getReferencePoint',
	    value: function getReferencePoint() {
	      return this;
	    }
	  }, {
	    key: 'translateImpl',
	    value: function translateImpl(dx, dy) {
	      this.x += dx;
	      this.y += dy;
	    }
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale) {
	      (0, _drawUtils.DrawPoint)(ctx, this.x, this.y, 3, scale);
	    }
	  }, {
	    key: 'setXY',
	    value: function setXY(x, y) {
	      this.x = x;
	      this.y = y;
	    }
	  }, {
	    key: 'setFromPoint',
	    value: function setFromPoint(p) {
	      this.setXY(p.x, p.y);
	    }
	  }, {
	    key: 'setFromArray',
	    value: function setFromArray(arr) {
	      this.setXY(arr[0], arr[1]);
	    }
	  }, {
	    key: 'toVector',
	    value: function toVector() {
	      return new _vector2.default(this.x, this.y);
	    }
	  }, {
	    key: 'copy',
	    value: function copy() {
	      return new EndPoint(this.x, this.y);
	    }
	  }]);
	
	  return EndPoint;
	}(_sketchObject.SketchObject);
	
	EndPoint.prototype._class = 'TCAD.TWO.EndPoint';
	
	var Param = exports.Param = function () {
	  function Param(obj, prop) {
	    _classCallCheck(this, Param);
	
	    this.id = _idGenerator.Generator.genID();
	    this.obj = obj;
	    this.prop = prop;
	  }
	
	  _createClass(Param, [{
	    key: 'set',
	    value: function set(value) {
	      this.obj[this.prop] = value;
	    }
	  }, {
	    key: 'get',
	    value: function get() {
	      return this.obj[this.prop];
	    }
	  }]);

	  return Param;
	}();

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SketchObject = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _idGenerator = __webpack_require__(84);
	
	var _shape = __webpack_require__(104);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SketchObject = exports.SketchObject = function (_Shape) {
	  _inherits(SketchObject, _Shape);
	
	  function SketchObject() {
	    _classCallCheck(this, SketchObject);
	
	    var _this = _possibleConstructorReturn(this, (SketchObject.__proto__ || Object.getPrototypeOf(SketchObject)).call(this));
	
	    _this.id = _idGenerator.Generator.genID();
	    _this.aux = false;
	    _this.marked = null;
	    _this.children = [];
	    _this.linked = [];
	    _this.layer = null;
	    return _this;
	  }
	
	  _createClass(SketchObject, [{
	    key: 'normalDistance',
	    value: function normalDistance(aim, scale) {
	      return -1;
	    }
	  }, {
	    key: 'addChild',
	    value: function addChild(child) {
	      this.children.push(child);
	      child.parent = this;
	    }
	  }, {
	    key: 'accept',
	    value: function accept(visitor) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var child = _step.value;
	
	          if (!child.accept(visitor)) {
	            return false;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      return visitor(this);
	    }
	  }, {
	    key: 'stabilize',
	    value: function stabilize(viewer) {}
	  }, {
	    key: 'recoverIfNecessary',
	    value: function recoverIfNecessary() {
	      return false;
	    }
	  }, {
	    key: 'isAuxOrLinkedTo',
	    value: function isAuxOrLinkedTo() {
	      if (!!this.aux) {
	        return true;
	      }
	      for (var i = 0; i < this.linked.length; ++i) {
	        if (!!this.linked[i].aux) {
	          return true;
	        }
	      }
	      return false;
	    }
	  }, {
	    key: '_translate',
	    value: function _translate(dx, dy, translated) {
	      translated[this.id] = 'x';
	      for (var i = 0; i < this.linked.length; ++i) {
	        if (translated[this.linked[i].id] != 'x') {
	          this.linked[i]._translate(dx, dy, translated);
	        }
	      }
	      this.translateImpl(dx, dy);
	    }
	  }, {
	    key: 'translate',
	    value: function translate(dx, dy) {
	      //  this.translateImpl(dx, dy);
	      if (this.isAuxOrLinkedTo()) {
	        return;
	      }
	      this._translate(dx, dy, {});
	    }
	  }, {
	    key: 'translateImpl',
	    value: function translateImpl(dx, dy) {
	      this.accept(function (obj) {
	        if (obj._class === 'TCAD.TWO.EndPoint') {
	          obj.translate(dx, dy);
	        }
	        return true;
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx, scale, viewer) {
	      if (!this.visible) return;
	      if (this.marked != null) {
	        ctx.save();
	        viewer.setStyle(this.marked, ctx);
	      }
	      this.drawImpl(ctx, scale, viewer);
	      if (this.marked != null) ctx.restore();
	    }
	  }]);

	  return SketchObject;
	}(_shape.Shape);

/***/ },
/* 104 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Shape = exports.Shape = function () {
	  function Shape() {
	    _classCallCheck(this, Shape);
	
	    this.visible = true;
	    this.style = null;
	    this.role = null;
	  }
	
	  _createClass(Shape, [{
	    key: "accept",
	    value: function accept(visitor) {
	      return visitor(this);
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx, scale) {}
	  }]);

	  return Shape;
	}();

/***/ },
/* 105 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DrawPoint = DrawPoint;
	exports.SetStyle = SetStyle;
	function DrawPoint(ctx, x, y, rad, scale) {
	  ctx.beginPath();
	  ctx.arc(x, y, rad / scale, 0, 2 * Math.PI, false);
	  ctx.fill();
	}
	
	function SetStyle(style, ctx, scale) {
	  ctx.lineWidth = style.lineWidth / scale;
	  ctx.strokeStyle = style.strokeStyle;
	  ctx.fillStyle = style.fillStyle;
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GetShapeEditTool = GetShapeEditTool;
	
	var _ellipse = __webpack_require__(107);
	
	var _ellipticalArc = __webpack_require__(108);
	
	var _circle = __webpack_require__(109);
	
	var _circle2 = __webpack_require__(110);
	
	var _drag = __webpack_require__(111);
	
	var _ellipse2 = __webpack_require__(112);
	
	function GetShapeEditTool(viewer, obj, alternative) {
	  if (obj instanceof _circle.Circle && !alternative) {
	    var tool = new _circle2.EditCircleTool(viewer);
	    tool.circle = obj;
	    return tool;
	  } else if (obj instanceof _ellipse.Ellipse && !alternative) {
	    // even for an ell-arc we should act as it would be an ellipse to 
	    // avoid stabilize constraints added and demoing B point on move
	    // so second arg must be FALSE!
	    var _tool = new _ellipse2.EllipseTool(viewer, false);
	    _tool.ellipse = obj;
	    _tool.state = _ellipse2.STATE_RADIUS;
	    return _tool;
	  } else {
	    return new _drag.DragTool(obj, viewer);
	  }
	}

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Ellipse = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ref = __webpack_require__(89);
	
	var _sketchObject = __webpack_require__(103);
	
	var _parametric = __webpack_require__(87);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Ellipse = exports.Ellipse = function (_SketchObject) {
	  _inherits(Ellipse, _SketchObject);
	
	  function Ellipse(ep1, ep2) {
	    _classCallCheck(this, Ellipse);
	
	    var _this = _possibleConstructorReturn(this, (Ellipse.__proto__ || Object.getPrototypeOf(Ellipse)).call(this));
	
	    _this.ep1 = ep1;
	    _this.ep2 = ep2;
	    _this.addChild(_this.ep1);
	    _this.addChild(_this.ep2);
	    _this.r = new _ref.Ref(0);
	    _this.r.set(_this.radiusX * 0.5);
	    _this.r.obj = _this;
	    return _this;
	  }
	
	  _createClass(Ellipse, [{
	    key: 'recoverIfNecessary',
	    value: function recoverIfNecessary() {
	      var recovered = false;
	      if (math.distanceAB(this.ep1, this.ep2) <= math.TOLERANCE) {
	        this.ep1.translate(-RECOVER_LENGTH, -RECOVER_LENGTH);
	        this.ep2.translate(RECOVER_LENGTH, RECOVER_LENGTH);
	        recovered = true;
	      }
	      if (this.radiusY <= 0.1) {
	        this.r.set(RECOVER_LENGTH);
	        recovered = true;
	      }
	      return recovered;
	    }
	  }, {
	    key: 'collectParams',
	    value: function collectParams(params) {
	      this.ep1.collectParams(params);
	      this.ep2.collectParams(params);
	      params.push(this.r);
	    }
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale) {
	      ctx.beginPath();
	      var radiusX = Math.max(this.radiusX, 1e-8);
	      var radiusY = Math.max(this.radiusY, 1e-8);
	      ctx.ellipse(this.centerX, this.centerY, radiusX, radiusY, this.rotation, 0, 2 * Math.PI);
	      ctx.stroke();
	    }
	  }, {
	    key: 'toEllipseCoordinateSystem',
	    value: function toEllipseCoordinateSystem(point) {
	      var x = point.x - this.centerX;
	      var y = point.y - this.centerY;
	      var angle = Math.atan2(y, x) - this.rotation;
	      var radius = math.distance(0, 0, x, y);
	      x = radius * Math.cos(angle);
	      y = radius * Math.sin(angle);
	      return { x: x, y: y, angle: angle, radius: radius };
	    }
	  }, {
	    key: 'radiusAtAngle',
	    value: function radiusAtAngle(angle) {
	      return Math.sqrt(1 / (sq(Math.cos(angle) / this.radiusX) + sq(Math.sin(angle) / this.radiusY)));
	    }
	  }, {
	    key: 'normalDistance',
	    value: function normalDistance(aim) {
	      var polarPoint = this.toEllipseCoordinateSystem(aim);
	      var L = this.radiusAtAngle(polarPoint.angle);
	      return Math.abs(polarPoint.radius - L);
	    }
	  }, {
	    key: 'rotation',
	    get: function get() {
	      return Math.atan2(this.ep2.y - this.ep1.y, this.ep2.x - this.ep1.x);
	    }
	  }, {
	    key: 'radiusX',
	    get: function get() {
	      return math.distance(this.ep1.x, this.ep1.y, this.ep2.x, this.ep2.y) * 0.5;
	    }
	  }, {
	    key: 'radiusY',
	    get: function get() {
	      return this.r.get();
	    }
	  }, {
	    key: 'centerX',
	    get: function get() {
	      return this.ep1.x + (this.ep2.x - this.ep1.x) * 0.5;
	    }
	  }, {
	    key: 'centerY',
	    get: function get() {
	      return this.ep1.y + (this.ep2.y - this.ep1.y) * 0.5;
	    }
	  }], [{
	    key: 'findMinorRadius',
	    value: function findMinorRadius(majorRadius, pntRadius, pntAngle) {
	      return Math.abs(Math.sin(pntAngle) / Math.sqrt(1 / sq(pntRadius) - sq(Math.cos(pntAngle) / majorRadius)));
	    }
	  }]);
	
	  return Ellipse;
	}(_sketchObject.SketchObject);
	
	Ellipse.prototype._class = 'TCAD.TWO.Ellipse';
	
	var sq = function sq(a) {
	  return a * a;
	};
	var RECOVER_LENGTH = 100;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EllipticalArc = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ellipse = __webpack_require__(107);
	
	var _parametric = __webpack_require__(87);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _utils = __webpack_require__(88);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EllipticalArc = exports.EllipticalArc = function (_Ellipse) {
	  _inherits(EllipticalArc, _Ellipse);
	
	  function EllipticalArc(ep1, ep2, a, b) {
	    _classCallCheck(this, EllipticalArc);
	
	    var _this = _possibleConstructorReturn(this, (EllipticalArc.__proto__ || Object.getPrototypeOf(EllipticalArc)).call(this, ep1, ep2));
	
	    _this.a = a;
	    _this.b = b;
	    _this.addChild(a);
	    _this.addChild(b);
	
	    //we'd like to have angles points have higher selection order 
	    (0, _utils.swap)(_this.children, 0, _this.children.length - 2);
	    (0, _utils.swap)(_this.children, 1, _this.children.length - 1);
	    return _this;
	  }
	
	  _createClass(EllipticalArc, [{
	    key: 'stabilize',
	    value: function stabilize(viewer) {
	      viewer.parametricManager._add(new _parametric.Constraints.PointOnEllipseInternal(this.b, this));
	      viewer.parametricManager._add(new _parametric.Constraints.PointOnEllipseInternal(this.a, this));
	    }
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale) {
	      ctx.beginPath();
	      var radiusX = Math.max(this.radiusX, 1e-8);
	      var radiusY = Math.max(this.radiusY, 1e-8);
	      var aAngle = this.drawAngle(this.a);
	      var bAngle = void 0;
	      if (math.areEqual(this.a.x, this.b.x, math.TOLERANCE) && math.areEqual(this.a.y, this.b.y, math.TOLERANCE)) {
	        bAngle = aAngle + 2 * Math.PI;
	      } else {
	        bAngle = this.drawAngle(this.b);
	      }
	      ctx.ellipse(this.centerX, this.centerY, radiusX, radiusY, this.rotation, aAngle, bAngle);
	      ctx.stroke();
	    }
	  }, {
	    key: 'drawAngle',
	    value: function drawAngle(point) {
	      var deformScale = this.radiusY / this.radiusX;
	      var x = point.x - this.centerX;
	      var y = point.y - this.centerY;
	      var rotation = -this.rotation;
	      var xx = x * Math.cos(rotation) - y * Math.sin(rotation);
	      var yy = x * Math.sin(rotation) + y * Math.cos(rotation);
	      xx *= deformScale;
	      return Math.atan2(yy, xx);
	    }
	  }]);
	
	  return EllipticalArc;
	}(_ellipse.Ellipse);
	
	EllipticalArc.prototype._class = 'TCAD.TWO.EllipticalArc';

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Circle = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(88);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _circle = __webpack_require__(110);
	
	var _point = __webpack_require__(102);
	
	var _ref = __webpack_require__(89);
	
	var _sketchObject = __webpack_require__(103);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Circle = exports.Circle = function (_SketchObject) {
	  _inherits(Circle, _SketchObject);
	
	  function Circle(c) {
	    _classCallCheck(this, Circle);
	
	    var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));
	
	    _this.c = c;
	    c.parent = _this;
	    _this.children.push(c);
	    _this.r = new _ref.Ref(0);
	    _this.r.obj = _this;
	    return _this;
	  }
	
	  _createClass(Circle, [{
	    key: 'collectParams',
	    value: function collectParams(params) {
	      this.c.collectParams(params);
	      params.push(this.r);
	    }
	  }, {
	    key: 'getReferencePoint',
	    value: function getReferencePoint() {
	      return this.c;
	    }
	  }, {
	    key: 'translateImpl',
	    value: function translateImpl(dx, dy) {
	      this.c.translate(dx, dy);
	    }
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale) {
	      ctx.beginPath();
	      ctx.arc(this.c.x, this.c.y, this.r.get(), 0, 2 * Math.PI);
	      ctx.stroke();
	    }
	  }, {
	    key: 'normalDistance',
	    value: function normalDistance(aim) {
	      return Math.abs(math.distance(aim.x, aim.y, this.c.x, this.c.y) - this.r.get());
	    }
	  }]);
	
	  return Circle;
	}(_sketchObject.SketchObject);
	
	Circle.prototype._class = 'TCAD.TWO.Circle';

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EditCircleTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tool = __webpack_require__(101);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _point = __webpack_require__(102);
	
	var _circle = __webpack_require__(109);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var EditCircleTool = exports.EditCircleTool = function (_Tool) {
	  _inherits(EditCircleTool, _Tool);
	
	  function EditCircleTool(viewer) {
	    _classCallCheck(this, EditCircleTool);
	
	    var _this = _possibleConstructorReturn(this, (EditCircleTool.__proto__ || Object.getPrototypeOf(EditCircleTool)).call(this, 'circle', viewer));
	
	    _this.circle = null;
	    return _this;
	  }
	
	  _createClass(EditCircleTool, [{
	    key: 'restart',
	    value: function restart() {
	      this.sendMessage('specify center');
	    }
	  }, {
	    key: 'cleanup',
	    value: function cleanup(e) {
	      this.viewer.cleanSnap();
	    }
	  }, {
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      if (this.circle != null) {
	        var r = math.distance(p.x, p.y, this.circle.c.x, this.circle.c.y);
	        this.circle.r.set(r);
	        if (!_tool.Tool.dumbMode(e)) {
	          this.solveRequest(true);
	        }
	      } else {
	        this.viewer.snap(p.x, p.y, []);
	      }
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'solveRequest',
	    value: function solveRequest(rough) {
	      this.solver = this.viewer.parametricManager.prepare([this.circle.r]);
	      this.solver.solve(rough, 1);
	      this.solver.sync();
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      if (this.circle == null) {
	        this.stepCreateCircle(this.viewer.screenToModel(e), true);
	      } else {
	        this.stepFinish();
	      }
	    }
	  }, {
	    key: 'stepCreateCircle',
	    value: function stepCreateCircle(center, tryToSnap) {
	      this.viewer.historyManager.checkpoint();
	      var needSnap = tryToSnap && this.viewer.snapped != null;
	      var p = needSnap ? this.viewer.snapped : center;
	      this.circle = new _circle.Circle(new _point.EndPoint(p.x, p.y));
	      if (needSnap) this.viewer.parametricManager.linkObjects([this.circle.c, p]);
	      this.pointPicked(this.circle.c.x, this.circle.c.y);
	      this.sendHint('specify radius');
	      this.viewer.activeLayer.add(this.circle);
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'stepFinish',
	    value: function stepFinish() {
	      this.solveRequest(false);
	      this.sendMessage("radius: " + this.viewer.roundToPrecision(this.circle.r.get()));
	      this.viewer.refresh();
	      this.viewer.toolManager.releaseControl();
	    }
	  }, {
	    key: 'processCommand',
	    value: function processCommand(command) {
	      if (this.circle == null) {
	        var result = _tool.Tool.ParseVector(this.viewer.referencePoint, command);
	        if (typeof result === 'string') return result;
	        this.stepCreateCircle(result, false);
	      } else {
	        var _result = _tool.Tool.ParseNumber(command);
	        if (typeof _result === 'string') return _result;
	        this.circle.r.set(_result);
	        this.stepFinish();
	      }
	    }
	  }]);

	  return EditCircleTool;
	}(_tool.Tool);

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DragTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tool = __webpack_require__(101);
	
	var _optim = __webpack_require__(94);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DragTool = exports.DragTool = function (_Tool) {
	  _inherits(DragTool, _Tool);
	
	  function DragTool(obj, viewer) {
	    _classCallCheck(this, DragTool);
	
	    var _this = _possibleConstructorReturn(this, (DragTool.__proto__ || Object.getPrototypeOf(DragTool)).call(this, 'drag', viewer));
	
	    _this.obj = obj;
	    _this._point = { x: 0, y: 0 };
	    _this.origin = { x: 0, y: 0 };
	    _this.solver = null;
	    return _this;
	  }
	
	  _createClass(DragTool, [{
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var x = this._point.x;
	      var y = this._point.y;
	      this.viewer.screenToModel2(e.offsetX, e.offsetY, this._point);
	      var dx = this._point.x - x;
	      var dy = this._point.y - y;
	      for (var i = 0; i < this.lockedShifts.length; i += 2) {
	        this.lockedValues[i] = this._point.x - this.lockedShifts[i];
	        this.lockedValues[i + 1] = this._point.y - this.lockedShifts[i + 1];
	      }
	      this.solver.updateLock(this.lockedValues);
	      if (!_tool.Tool.dumbMode(e)) {
	        this.solveRequest(true);
	      } else {
	        this.obj.translate(dx, dy);
	      }
	
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'mousedown',
	    value: function mousedown(e) {
	      this.origin.x = e.offsetX;
	      this.origin.y = e.offsetY;
	      this.viewer.screenToModel2(e.offsetX, e.offsetY, this._point);
	      this.prepareSolver([]);
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      this.solveRequest(false);
	      this.viewer.refresh();
	      this.viewer.toolManager.releaseControl();
	      var traveled = math.distance(this.origin.x, this.origin.y, e.offsetX, e.offsetY);
	      if (traveled >= 10) {
	        this.viewer.historyManager.lightCheckpoint(10);
	      }
	      //this.animateSolution();
	    }
	  }, {
	    key: 'mousewheel',
	    value: function mousewheel(e) {}
	  }, {
	    key: 'solveRequest',
	    value: function solveRequest(rough) {
	      this.solver.solve(rough, 1);
	      this.solver.sync();
	
	      var paramsToUpdate = [];
	      this.viewer.accept(function (obj) {
	        if (obj.aux !== true) {
	          if (obj.recoverIfNecessary()) {
	            obj.collectParams(paramsToUpdate);
	          }
	        }
	        return true;
	      });
	
	      if (paramsToUpdate.length != 0) {
	        for (var i = 0; i < paramsToUpdate.length; i++) {
	          this.solver.updateParameter(paramsToUpdate[i]);
	        }
	        this.solver.solve(rough, 1);
	        this.solver.sync();
	      }
	    }
	  }, {
	    key: 'getParamsToLock',
	    value: function getParamsToLock() {
	      var params = [];
	      this.obj.accept(function (obj) {
	        if (obj._class === 'TCAD.TWO.EndPoint' && !obj.isAuxOrLinkedTo()) {
	          params.push(obj._x);
	          params.push(obj._y);
	        }
	        return true;
	      });
	      return params;
	    }
	  }, {
	    key: 'prepareSolver',
	    value: function prepareSolver(extraConstraints) {
	      var locked = this.getParamsToLock();
	      this.lockedShifts = [];
	      this.lockedValues = [];
	      for (var i = 0; i < locked.length; i += 2) {
	        this.lockedShifts[i] = this._point.x - locked[i].get();
	        this.lockedShifts[i + 1] = this._point.y - locked[i + 1].get();
	      }
	      this.solver = this.viewer.parametricManager.prepare(locked, extraConstraints);
	      //this.enableRecording();
	    }
	  }, {
	    key: 'enableRecording',
	    value: function enableRecording() {
	      var solver = this.solver;
	      DragTool.snapshots = [];
	      _optim.optim.DEBUG_HANDLER = function () {
	        DragTool.snapshots.push([]);
	        for (var i = 0; i < solver.solvers.length; i++) {
	          var sys = solver.solvers[i].system;
	          DragTool.snapshots[i].push(sys.params.map(function (p) {
	            return p.get();
	          }));
	        }
	      };
	    }
	  }, {
	    key: 'animateSolution',
	    value: function animateSolution() {
	      if (DragTool.snapshots.length === 0) return;
	      var stepNum = 0;
	      var scope = this;
	      var then = Date.now();
	      var speed = 500;
	
	      function step() {
	        var now = Date.now();
	        var elapsed = now - then;
	
	        if (elapsed > speed) {
	          for (var i = 0; i < scope.solver.solvers.length; i++) {
	            var sys = scope.solver.solvers[i].system;
	            if (stepNum >= DragTool.snapshots[i].length) continue;
	            var values = DragTool.snapshots[i][stepNum];
	            for (var k = 0; k < values.length; k++) {
	              sys.params[k]._backingParam.set(values[k]);
	            }
	          }
	          stepNum++;
	
	          then = now;
	          scope.viewer.repaint();
	        }
	
	        if (DragTool.snapshots.length != 0 && stepNum < DragTool.snapshots[0].length) {
	          window.requestAnimationFrame(step);
	        }
	      }
	
	      window.requestAnimationFrame(step);
	    }
	  }]);
	
	  return DragTool;
	}(_tool.Tool);
	
	DragTool.snapshots = [];

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EllipseTool = exports.STATE_RADIUS = exports.STATE_POINT2 = exports.STATE_POINT1 = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tool = __webpack_require__(101);
	
	var _point = __webpack_require__(102);
	
	var _ellipse = __webpack_require__(107);
	
	var _ellipticalArc = __webpack_require__(108);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var STATE_POINT1 = exports.STATE_POINT1 = 0;
	var STATE_POINT2 = exports.STATE_POINT2 = 1;
	var STATE_RADIUS = exports.STATE_RADIUS = 2;
	
	var EllipseTool = exports.EllipseTool = function (_Tool) {
	  _inherits(EllipseTool, _Tool);
	
	  function EllipseTool(viewer, arc) {
	    _classCallCheck(this, EllipseTool);
	
	    var _this = _possibleConstructorReturn(this, (EllipseTool.__proto__ || Object.getPrototypeOf(EllipseTool)).call(this, arc ? 'ellipse' : 'elliptical arc', viewer));
	
	    _this.arc = arc;
	    _this.ellipse = null;
	    _this.state = STATE_POINT1;
	    return _this;
	  }
	
	  _createClass(EllipseTool, [{
	    key: 'restart',
	    value: function restart() {
	      this.ellipse = null;
	      this.state = STATE_POINT1;
	      this.sendHint('specify first major axis point');
	    }
	  }, {
	    key: 'cleanup',
	    value: function cleanup(e) {
	      this.viewer.cleanSnap();
	    }
	  }, {
	    key: 'point',
	    value: function point(e) {
	      return this.viewer.snapped ? this.viewer.snapped : this.viewer.screenToModel(e);
	    }
	  }, {
	    key: 'newEllipse',
	    value: function newEllipse(p) {
	      var ep = function ep() {
	        return new _point.EndPoint(p.x, p.y);
	      };
	      return this.arc ? new _ellipticalArc.EllipticalArc(ep(), ep(), ep(), ep()) : new _ellipse.Ellipse(ep(), ep());
	    }
	  }, {
	    key: 'demoBPoint',
	    value: function demoBPoint() {
	      var arc = this.ellipse;
	      var ang = Math.atan2(arc.a.y - arc.centerY, arc.a.x - arc.centerX) + (2 * Math.PI - 0.3);
	      ang %= 2 * Math.PI;
	      var r = arc.radiusAtAngle(ang - arc.rotation);
	      arc.b.x = arc.centerX + r * Math.cos(ang);
	      arc.b.y = arc.centerY + r * Math.sin(ang);
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      switch (this.state) {
	        case STATE_POINT1:
	          {
	            var p = this.point(e);
	            this.ellipse = this.newEllipse(p);
	            this.snapIfNeed(this.ellipse.ep1);
	            this.viewer.activeLayer.add(this.ellipse);
	            this.viewer.refresh();
	            this.state = STATE_POINT2;
	            this.sendHint('specify second major axis point');
	            break;
	          }
	        case STATE_POINT2:
	          {
	            var _p = this.point(e);
	            this.ellipse.ep2.setFromPoint(_p);
	            this.snapIfNeed(this.ellipse.ep2);
	            this.viewer.refresh();
	            this.state = STATE_RADIUS;
	            this.sendHint('specify minor axis radius');
	            break;
	          }
	        case STATE_RADIUS:
	          if (this.arc) {
	            this.ellipse.stabilize(this.viewer);
	          }
	          this.viewer.toolManager.releaseControl();
	      }
	    }
	  }, {
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      switch (this.state) {
	        case STATE_POINT1:
	          this.viewer.snap(p.x, p.y, []);
	          break;
	        case STATE_POINT2:
	          this.ellipse.ep2.setFromPoint(this.viewer.screenToModel(e));
	          this.ellipse.r.value = this.ellipse.radiusX * 0.5;
	          this.viewer.snap(p.x, p.y, this.ellipse.children);
	          if (this.arc) {
	            this.ellipse.a.setFromPoint(this.ellipse.ep2);
	            this.demoBPoint();
	          }
	          break;
	        case STATE_RADIUS:
	          var polarPoint = this.ellipse.toEllipseCoordinateSystem(p);
	          var minorRadius = _ellipse.Ellipse.findMinorRadius(this.ellipse.radiusX, polarPoint.radius, polarPoint.angle);
	          if (isNaN(minorRadius)) {
	            var projAxis = new _vector2.default(-(this.ellipse.ep2.y - this.ellipse.ep1.y), this.ellipse.ep2.x - this.ellipse.ep1.x);
	            projAxis._normalize();
	            var v = new _vector2.default(this.ellipse.ep2.x - p.x, this.ellipse.ep2.y - p.y);
	            minorRadius = Math.abs(projAxis.dot(v));
	          }
	          this.ellipse.r.set(minorRadius);
	          if (!_tool.Tool.dumbMode(e)) {
	            this.solveRequest(true);
	          }
	          if (this.arc) {
	            this.demoBPoint();
	          }
	          break;
	      }
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'solveRequest',
	    value: function solveRequest(rough) {
	      this.solver = this.viewer.parametricManager.prepare([this.ellipse.r]);
	      this.solver.solve(rough, 1);
	      this.solver.sync();
	    }
	  }]);

	  return EllipseTool;
	}(_tool.Tool);

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Segment = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sketchObject = __webpack_require__(103);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _parametric = __webpack_require__(87);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Segment = exports.Segment = function (_SketchObject) {
	  _inherits(Segment, _SketchObject);
	
	  function Segment(a, b) {
	    _classCallCheck(this, Segment);
	
	    var _this = _possibleConstructorReturn(this, (Segment.__proto__ || Object.getPrototypeOf(Segment)).call(this));
	
	    _this.a = a;
	    _this.b = b;
	    a.parent = _this;
	    b.parent = _this;
	    _this.children.push(a, b);
	    return _this;
	  }
	
	  _createClass(Segment, [{
	    key: 'recoverIfNecessary',
	    value: function recoverIfNecessary() {
	      if (math.distanceAB(this.a, this.b) > math.TOLERANCE) {
	        return false;
	      } else {
	        var recoverLength = 100;
	        this.a.translate(-recoverLength, -recoverLength);
	        this.b.translate(recoverLength, recoverLength);
	        return true;
	      }
	    }
	  }, {
	    key: 'collectParams',
	    value: function collectParams(params) {
	      this.a.collectParams(params);
	      this.b.collectParams(params);
	    }
	  }, {
	    key: 'normalDistance',
	    value: function normalDistance(aim) {
	      return Segment.calcNormalDistance(aim, this.a, this.b);
	    }
	  }, {
	    key: 'getReferencePoint',
	    value: function getReferencePoint() {
	      return this.a;
	    }
	  }, {
	    key: 'translateImpl',
	    value: function translateImpl(dx, dy) {
	      this.a.translate(dx, dy);
	      this.b.translate(dx, dy);
	    }
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale) {
	      ctx.beginPath();
	      ctx.moveTo(this.a.x, this.a.y);
	      ctx.lineTo(this.b.x, this.b.y);
	      //  ctx.save();
	      //  ctx.setTransform(1, 0, 0, 1, 0, 0);
	      ctx.stroke();
	      //  ctx.restore();
	    }
	  }], [{
	    key: 'calcNormalDistance',
	    value: function calcNormalDistance(aim, segmentA, segmentB) {
	      var ab = new _vector2.default(segmentB.x - segmentA.x, segmentB.y - segmentA.y);
	      var e = ab.normalize();
	      var a = new _vector2.default(aim.x - segmentA.x, aim.y - segmentA.y);
	      var b = e.multiply(a.dot(e));
	      var n = a.minus(b);
	
	      //Check if vector b lays on the vector ab
	      if (b.length() > ab.length()) {
	        return -1;
	      }
	
	      if (b.dot(ab) < 0) {
	        return -1;
	      }
	
	      return n.length();
	    }
	  }]);
	
	  return Segment;
	}(_sketchObject.SketchObject);
	
	Segment.prototype._class = 'TCAD.TWO.Segment';

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Point = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _drawUtils = __webpack_require__(105);
	
	var draw_utils = _interopRequireWildcard(_drawUtils);
	
	var _shape = __webpack_require__(104);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Point = exports.Point = function (_Shape) {
	  _inherits(Point, _Shape);
	
	  function Point(x, y, rad) {
	    _classCallCheck(this, Point);
	
	    var _this = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this));
	
	    _this.x = x;
	    _this.y = y;
	    _this.rad = rad;
	    _this.style = null;
	    return _this;
	  }
	
	  _createClass(Point, [{
	    key: 'draw',
	    value: function draw(ctx, scale) {
	      draw_utils.DrawPoint(ctx, this.x, this.y, this.rad, scale);
	    }
	  }]);

	  return Point;
	}(_shape.Shape);

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ReferencePoint = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shape = __webpack_require__(104);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ReferencePoint = exports.ReferencePoint = function (_Shape) {
	  _inherits(ReferencePoint, _Shape);
	
	  function ReferencePoint() {
	    _classCallCheck(this, ReferencePoint);
	
	    var _this = _possibleConstructorReturn(this, (ReferencePoint.__proto__ || Object.getPrototypeOf(ReferencePoint)).call(this));
	
	    _this.x = 0;
	    _this.y = 0;
	    return _this;
	  }
	
	  _createClass(ReferencePoint, [{
	    key: 'draw',
	    value: function draw(ctx, scale) {
	      if (!this.visible) return;
	      ctx.strokeStyle = 'salmon';
	      ctx.fillStyle = 'salmon';
	      ctx.lineWidth = 1 / scale;
	
	      ctx.beginPath();
	      ctx.arc(this.x, this.y, 1 / scale, 0, 2 * Math.PI, false);
	      ctx.fill();
	
	      ctx.beginPath();
	      ctx.arc(this.x, this.y, 7 / scale, 0, 2 * Math.PI, false);
	      ctx.stroke();
	    }
	  }]);

	  return ReferencePoint;
	}(_shape.Shape);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BasisOrigin = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _shape = __webpack_require__(104);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BasisOrigin = exports.BasisOrigin = function (_Shape) {
	  _inherits(BasisOrigin, _Shape);
	
	  function BasisOrigin(basis, viewer) {
	    _classCallCheck(this, BasisOrigin);
	
	    var _this = _possibleConstructorReturn(this, (BasisOrigin.__proto__ || Object.getPrototypeOf(BasisOrigin)).call(this));
	
	    _this.viewer = viewer;
	    _this.inverseX = false;
	    _this.inverseY = false;
	    _this.lineWidth = 100;
	    _this.xColor = '#FF0000';
	    _this.yColor = '#00FF00';
	    return _this;
	  }
	
	  _createClass(BasisOrigin, [{
	    key: 'draw',
	    value: function draw(ctx, scale) {
	      ctx.save();
	      if (this.inverseX) {
	        this.xScale = -1;
	        this.xShift = this.lineWidth + 10;
	      } else {
	        this.xScale = 1;
	        this.xShift = 10;
	      }
	      if (this.inverseY) {
	        this.yScale = -1;
	        this.yShift = this.viewer.canvas.height - this.lineWidth - 10;
	      } else {
	        this.yScale = 1;
	        this.yShift = this.viewer.canvas.height - 10;
	      }
	
	      ctx.setTransform(this.xScale, 0, 0, this.yScale, this.xShift, this.yShift);
	      ctx.beginPath();
	
	      ctx.lineWidth = 1;
	      ctx.strokeStyle = this.yColor;
	
	      var headA = 1;
	      var headB = 10;
	
	      ctx.moveTo(0.5, 0);
	      ctx.lineTo(0.5, -this.lineWidth);
	
	      ctx.moveTo(0, -this.lineWidth);
	      ctx.lineTo(headA, 0 - this.lineWidth + headB);
	
	      ctx.moveTo(0, -this.lineWidth);
	      ctx.lineTo(-headA, -this.lineWidth + headB);
	      ctx.closePath();
	      ctx.stroke();
	
	      ctx.beginPath();
	      ctx.strokeStyle = this.xColor;
	      ctx.moveTo(0, 0.5);
	      ctx.lineTo(this.lineWidth, 0.5);
	
	      ctx.moveTo(this.lineWidth, 0);
	      ctx.lineTo(this.lineWidth - headB, headA);
	
	      ctx.moveTo(this.lineWidth, 0);
	      ctx.lineTo(this.lineWidth - headB, -headA);
	      ctx.closePath();
	      ctx.stroke();
	
	      ctx.restore();
	    }
	  }]);

	  return BasisOrigin;
	}(_shape.Shape);

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Arc = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(88);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _ref = __webpack_require__(89);
	
	var _parametric = __webpack_require__(87);
	
	var _sketchObject = __webpack_require__(103);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Arc = exports.Arc = function (_SketchObject) {
	  _inherits(Arc, _SketchObject);
	
	  function Arc(a, b, c) {
	    _classCallCheck(this, Arc);
	
	    var _this = _possibleConstructorReturn(this, (Arc.__proto__ || Object.getPrototypeOf(Arc)).call(this));
	
	    _this.a = a;
	    _this.b = b;
	    _this.c = c;
	    a.parent = _this;
	    b.parent = _this;
	    c.parent = _this;
	    _this.children.push(a, b, c);
	    _this.r = new _ref.Ref(0);
	    _this.r.value = _this.distanceA();
	    _this.r.obj = _this;
	    return _this;
	  }
	
	  _createClass(Arc, [{
	    key: 'collectParams',
	    value: function collectParams(params) {
	      this.a.collectParams(params);
	      this.b.collectParams(params);
	      this.c.collectParams(params);
	      params.push(this.r);
	    }
	  }, {
	    key: 'getReferencePoint',
	    value: function getReferencePoint() {
	      return this.c;
	    }
	  }, {
	    key: 'translateImpl',
	    value: function translateImpl(dx, dy) {
	      this.a.translate(dx, dy);
	      this.b.translate(dx, dy);
	      this.c.translate(dx, dy);
	    }
	  }, {
	    key: 'radiusForDrawing',
	    value: function radiusForDrawing() {
	      return this.distanceA();
	    }
	  }, {
	    key: 'distanceA',
	    value: function distanceA() {
	      return math.distance(this.a.x, this.a.y, this.c.x, this.c.y);
	    }
	  }, {
	    key: 'distanceB',
	    value: function distanceB() {
	      return math.distance(this.b.x, this.b.y, this.c.x, this.c.y);
	    }
	  }, {
	    key: 'getStartAngle',
	    value: function getStartAngle() {
	      return Math.atan2(this.a.y - this.c.y, this.a.x - this.c.x);
	    }
	  }, {
	    key: 'getEndAngle',
	    value: function getEndAngle() {
	      return Math.atan2(this.b.y - this.c.y, this.b.x - this.c.x);
	    }
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale) {
	      ctx.beginPath();
	      var r = this.radiusForDrawing();
	      var startAngle = this.getStartAngle();
	      var endAngle;
	      if (math.areEqual(this.a.x, this.b.x, math.TOLERANCE) && math.areEqual(this.a.y, this.b.y, math.TOLERANCE)) {
	        endAngle = startAngle + 2 * Math.PI;
	      } else {
	        endAngle = this.getEndAngle();
	      }
	      ctx.arc(this.c.x, this.c.y, r, startAngle, endAngle);
	      var distanceB = this.distanceB();
	      if (Math.abs(r - distanceB) * scale > 1) {
	        var adj = r / distanceB;
	        ctx.save();
	        ctx.setLineDash([7 / scale]);
	        ctx.lineTo(this.b.x, this.b.y);
	        ctx.moveTo(this.b.x + (this.b.x - this.c.x) / adj, this.b.y + (this.b.y - this.c.y) / adj);
	        ctx.stroke();
	        ctx.restore();
	      } else {
	        ctx.stroke();
	      }
	    }
	  }, {
	    key: 'isPointInsideSector',
	    value: function isPointInsideSector(x, y) {
	      var ca = new _vector2.default(this.a.x - this.c.x, this.a.y - this.c.y);
	      var cb = new _vector2.default(this.b.x - this.c.x, this.b.y - this.c.y);
	      var ct = new _vector2.default(x - this.c.x, y - this.c.y);
	
	      ca._normalize();
	      cb._normalize();
	      ct._normalize();
	      var cosAB = ca.dot(cb);
	      var cosAT = ca.dot(ct);
	
	      var isInside = cosAT >= cosAB;
	      var abInverse = ca.cross(cb).z < 0;
	      var atInverse = ca.cross(ct).z < 0;
	
	      var result;
	      if (abInverse) {
	        result = !atInverse || !isInside;
	      } else {
	        result = !atInverse && isInside;
	      }
	      return result;
	    }
	  }, {
	    key: 'normalDistance',
	    value: function normalDistance(aim) {
	
	      var isInsideSector = this.isPointInsideSector(aim.x, aim.y);
	      if (isInsideSector) {
	        return Math.abs(math.distance(aim.x, aim.y, this.c.x, this.c.y) - this.radiusForDrawing());
	      } else {
	        return Math.min(math.distance(aim.x, aim.y, this.a.x, this.a.y), math.distance(aim.x, aim.y, this.b.x, this.b.y));
	      }
	    }
	  }, {
	    key: 'stabilize',
	    value: function stabilize(viewer) {
	      this.r.set(this.distanceA());
	      viewer.parametricManager._add(new _parametric.Constraints.P2PDistanceV(this.b, this.c, this.r));
	      viewer.parametricManager._add(new _parametric.Constraints.P2PDistanceV(this.a, this.c, this.r));
	    }
	  }]);
	
	  return Arc;
	}(_sketchObject.SketchObject);
	
	Arc.prototype._class = 'TCAD.TWO.Arc';

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BezierCurve = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ref = __webpack_require__(89);
	
	var _sketchObject = __webpack_require__(103);
	
	var _segment = __webpack_require__(113);
	
	var _bezierCubic = __webpack_require__(17);
	
	var _convexHull = __webpack_require__(119);
	
	var _drawUtils = __webpack_require__(105);
	
	var draw_utils = _interopRequireWildcard(_drawUtils);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BezierCurve = exports.BezierCurve = function (_SketchObject) {
	  _inherits(BezierCurve, _SketchObject);
	
	  function BezierCurve(a, b, cp1, cp2) {
	    _classCallCheck(this, BezierCurve);
	
	    var _this = _possibleConstructorReturn(this, (BezierCurve.__proto__ || Object.getPrototypeOf(BezierCurve)).call(this));
	
	    _this.a = a;
	    _this.b = b;
	    _this.cp1 = cp1;
	    _this.cp2 = cp2;
	
	    _this.addChild(new _segment.Segment(a, cp1));
	    _this.addChild(new _segment.Segment(b, cp2));
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = _this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var c = _step.value;
	
	        c.role = 'construction';
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	
	    return _this;
	  }
	
	  _createClass(BezierCurve, [{
	    key: 'collectParams',
	    value: function collectParams(params) {
	      this.a.collectParams(params);
	      this.b.collectParams(params);
	      this.cp1.collectParams(params);
	      this.cp2.collectParams(params);
	    }
	  }, {
	    key: 'normalDistance',
	    value: function normalDistance(aim, scale) {
	      this.hull = (0, _convexHull.ConvexHull2D)([this.a, this.b, this.cp1, this.cp2]);
	      this.hull = math.polygonOffset(this.hull, 1 + 0.3 / scale);
	      if (math.isPointInsidePolygon(aim, this.hull)) {
	        this.lut = (0, _bezierCubic.LUT)(this.a, this.b, this.cp1, this.cp2, scale);
	        return this.closestNormalDistance(aim, this.lut);
	      }
	      return -1;
	    }
	  }, {
	    key: 'closestNormalDistance',
	    value: function closestNormalDistance(aim, segments) {
	      var hero = -1;
	      for (var p = segments.length - 1, q = 0; q < segments.length; p = q++) {
	        var dist = Math.min(_segment.Segment.calcNormalDistance(aim, segments[p], segments[q]));
	        if (dist != -1) {
	          hero = hero == -1 ? dist : Math.min(dist, hero);
	        }
	      }
	      return hero;
	    }
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale, viewer) {
	      ctx.beginPath();
	      ctx.moveTo(this.a.x, this.a.y);
	      ctx.bezierCurveTo(this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.b.x, this.b.y);
	      ctx.stroke();
	
	      //debug lut and hull
	      //this.drawLUTAndHull();
	    }
	  }, {
	    key: 'drawLUTAndHull',
	    value: function drawLUTAndHull() {
	      if (this.lut) {
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	          for (var _iterator2 = this.lut[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var p = _step2.value;
	
	            draw_utils.DrawPoint(ctx, p.x, p.y, 3, scale);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	
	        ctx.moveTo(this.hull[0].x, this.hull[0].y);
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;
	
	        try {
	          for (var _iterator3 = this.hull[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var _p = _step3.value;
	
	            ctx.lineTo(_p.x, _p.y);
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	
	        ctx.stroke();
	      }
	    }
	  }]);
	
	  return BezierCurve;
	}(_sketchObject.SketchObject);
	
	BezierCurve.prototype._class = 'TCAD.TWO.BezierCurve';
	
	var RECOVER_LENGTH = 100;

/***/ },
/* 119 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ConvexHull2D = ConvexHull2D;
	function ConvexHull2D(points) {
	  points.sort(function (a, b) {
	    return a.x != b.x ? a.x - b.x : a.y - b.y;
	  });
	
	  var n = points.length;
	  var hull = [];
	
	  for (var i = 0; i < 2 * n; i++) {
	    var j = i < n ? i : 2 * n - 1 - i;
	    while (hull.length >= 2 && removeMiddle(hull[hull.length - 2], hull[hull.length - 1], points[j])) {
	      hull.pop();
	    }
	    hull.push(points[j]);
	  }
	  hull.pop();
	  return hull;
	}
	
	function removeMiddle(a, b, c) {
	  var cross = (a.x - b.x) * (c.y - b.y) - (a.y - b.y) * (c.x - b.x);
	  var dot = (a.x - b.x) * (c.x - b.x) + (a.y - b.y) * (c.y - b.y);
	  return cross < 0 || cross == 0 && dot <= 0;
	}

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.DiameterDimension = exports.VDimension = exports.HDimension = exports.Dimension = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(88);
	
	var utils = _interopRequireWildcard(_utils);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _sketchObject = __webpack_require__(103);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LinearDimension = function (_SketchObject) {
	  _inherits(LinearDimension, _SketchObject);
	
	  function LinearDimension(a, b) {
	    _classCallCheck(this, LinearDimension);
	
	    var _this = _possibleConstructorReturn(this, (LinearDimension.__proto__ || Object.getPrototypeOf(LinearDimension)).call(this));
	
	    _this.a = a;
	    _this.b = b;
	    _this.flip = false;
	    return _this;
	  }
	
	  _createClass(LinearDimension, [{
	    key: 'collectParams',
	    value: function collectParams(params) {}
	  }, {
	    key: 'getReferencePoint',
	    value: function getReferencePoint() {
	      return this.a;
	    }
	  }, {
	    key: 'translateImpl',
	    value: function translateImpl(dx, dy) {}
	  }, {
	    key: 'getA',
	    value: function getA() {
	      return this.a;
	    }
	  }, {
	    key: 'getB',
	    value: function getB() {
	      return this.b;
	    }
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale, viewer) {
	
	      var off = 30 * viewer.dimScale;
	      var textOff = getTextOff(viewer.dimScale);
	
	      var a, b, startA, startB;
	      if (this.flip) {
	        a = this.getB();
	        b = this.getA();
	        startA = this.b;
	        startB = this.a;
	      } else {
	        a = this.getA();
	        b = this.getB();
	        startA = this.a;
	        startB = this.b;
	      }
	
	      var d = math.distanceAB(a, b);
	
	      var _vx = -(b.y - a.y);
	      var _vy = b.x - a.x;
	
	      //normalize
	      var _vxn = _vx / d;
	      var _vyn = _vy / d;
	
	      _vx = _vxn * off;
	      _vy = _vyn * off;
	
	      ctx.beginPath();
	
	      var _ax = a.x + _vx;
	      var _ay = a.y + _vy;
	      var _bx = b.x + _vx;
	      var _by = b.y + _vy;
	
	      ctx.moveTo(_ax, _ay);
	      ctx.lineTo(_bx, _by);
	
	      function drawRef(start, x, y) {
	        var vec = new _vector2.default(x - start.x, y - start.y);
	        vec._normalize();
	        vec._multiply(7 * viewer.dimScale);
	
	        ctx.moveTo(start.x, start.y);
	        ctx.lineTo(x, y);
	        ctx.lineTo(x + vec.x, y + vec.y);
	      }
	
	      drawRef(startA, _ax, _ay);
	      drawRef(startB, _bx, _by);
	
	      ctx.closePath();
	      ctx.stroke();
	
	      function drawArrow(x, y) {
	        var s1 = 50;
	        var s2 = 20;
	        ctx.lineCap = 'round';
	        ctx.beginPath();
	        ctx.moveTo(x, y);
	        ctx.lineTo(x - s1, y - s2);
	        ctx.closePath();
	        ctx.stroke();
	      }
	
	      //  drawArrow(_ax, _ay);
	      //  drawArrow(_bx, _by);
	
	      ctx.font = 12 * viewer.dimScale + "px Arial";
	      var txt = d.toFixed(2);
	      var h = d / 2 - ctx.measureText(txt).width / 2;
	
	      if (h > 0) {
	        var tx = _ax + _vxn * textOff - -_vyn * h;
	        var ty = _ay + _vyn * textOff - _vxn * h;
	        ctx.save();
	        ctx.translate(tx, ty);
	        ctx.rotate(-Math.atan2(_vxn, _vyn));
	        ctx.scale(1, -1);
	        ctx.fillText(txt, 0, 0);
	        ctx.restore();
	      }
	    }
	  }, {
	    key: 'normalDistance',
	    value: function normalDistance(aim) {
	      return -1;
	    }
	  }]);
	
	  return LinearDimension;
	}(_sketchObject.SketchObject);
	
	var Dimension = exports.Dimension = function (_LinearDimension) {
	  _inherits(Dimension, _LinearDimension);
	
	  function Dimension(a, b) {
	    _classCallCheck(this, Dimension);
	
	    return _possibleConstructorReturn(this, (Dimension.__proto__ || Object.getPrototypeOf(Dimension)).call(this, a, b));
	  }
	
	  return Dimension;
	}(LinearDimension);
	
	Dimension.prototype._class = 'TCAD.TWO.Dimension';
	
	var HDimension = exports.HDimension = function (_LinearDimension2) {
	  _inherits(HDimension, _LinearDimension2);
	
	  function HDimension(a, b) {
	    _classCallCheck(this, HDimension);
	
	    return _possibleConstructorReturn(this, (HDimension.__proto__ || Object.getPrototypeOf(HDimension)).call(this, a, b));
	  }
	
	  _createClass(HDimension, [{
	    key: 'getA',
	    value: function getA() {
	      return this.a;
	    }
	  }, {
	    key: 'getB',
	    value: function getB() {
	      return { x: this.b.x, y: this.a.y };
	    }
	  }]);
	
	  return HDimension;
	}(LinearDimension);
	
	HDimension.prototype._class = 'TCAD.TWO.HDimension';
	
	var VDimension = exports.VDimension = function (_LinearDimension3) {
	  _inherits(VDimension, _LinearDimension3);
	
	  function VDimension(a, b) {
	    _classCallCheck(this, VDimension);
	
	    return _possibleConstructorReturn(this, (VDimension.__proto__ || Object.getPrototypeOf(VDimension)).call(this, a, b));
	  }
	
	  _createClass(VDimension, [{
	    key: 'getA',
	    value: function getA() {
	      return this.a;
	    }
	  }, {
	    key: 'getB',
	    value: function getB() {
	      return { x: this.a.x, y: this.b.y };
	    }
	  }]);
	
	  return VDimension;
	}(LinearDimension);
	
	VDimension.prototype._class = 'TCAD.TWO.VDimension';
	
	var DiameterDimension = exports.DiameterDimension = function (_SketchObject2) {
	  _inherits(DiameterDimension, _SketchObject2);
	
	  function DiameterDimension(obj) {
	    _classCallCheck(this, DiameterDimension);
	
	    var _this5 = _possibleConstructorReturn(this, (DiameterDimension.__proto__ || Object.getPrototypeOf(DiameterDimension)).call(this));
	
	    _this5.obj = obj;
	    _this5.angle = Math.PI / 4;
	    return _this5;
	  }
	
	  _createClass(DiameterDimension, [{
	    key: 'collectParams',
	    value: function collectParams(params) {}
	  }, {
	    key: 'getReferencePoint',
	    value: function getReferencePoint() {}
	  }, {
	    key: 'translateImpl',
	    value: function translateImpl(dx, dy) {}
	  }, {
	    key: 'drawImpl',
	    value: function drawImpl(ctx, scale, viewer) {
	      if (this.obj == null) return;
	      if (this.obj._class === 'TCAD.TWO.Circle') {
	        this.drawForCircle(ctx, scale, viewer);
	      } else if (this.obj._class === 'TCAD.TWO.Arc') {
	        this.drawForArc(ctx, scale, viewer);
	      }
	    }
	  }, {
	    key: 'drawForCircle',
	    value: function drawForCircle(ctx, scale, viewer) {
	      var c = new _vector2.default().setV(this.obj.c);
	      var r = this.obj.r.get();
	      var angled = new _vector2.default(r * Math.cos(this.angle), r * Math.sin(this.angle), 0);
	      var a = c.minus(angled);
	      var b = c.plus(angled);
	      var textOff = getTextOff(viewer.dimScale);
	
	      var d = 2 * r;
	
	      ctx.beginPath();
	      ctx.moveTo(a.x, a.y);
	      ctx.lineTo(b.x, b.y);
	      ctx.closePath();
	      ctx.stroke();
	
	      var fontSize = 12 * viewer.dimScale;
	      ctx.font = fontSize + "px Arial";
	      var txt = String.fromCharCode(216) + ' ' + d.toFixed(2);
	      var textWidth = ctx.measureText(txt).width;
	      var h = d / 2 - textWidth / 2;
	
	      var _vx = -(b.y - a.y);
	      var _vy = b.x - a.x;
	
	      //normalize
	      var _vxn = _vx / d;
	      var _vyn = _vy / d;
	
	      function drawText(tx, ty) {
	        ctx.save();
	        ctx.translate(tx, ty);
	        ctx.rotate(-Math.atan2(_vxn, _vyn));
	        ctx.scale(1, -1);
	        ctx.fillText(txt, 0, 0);
	        ctx.restore();
	      }
	
	      var tx, ty;
	      if (h - fontSize * .3 > 0) {
	        // take into account font size to not have circle overlap symbols
	        tx = a.x + _vxn * textOff - -_vyn * h;
	        ty = a.y + _vyn * textOff - _vxn * h;
	        drawText(tx, ty);
	      } else {
	        var off = 2 * viewer.dimScale;
	        angled._normalize();
	        var extraLine = angled.multiply(textWidth + off * 2);
	        ctx.beginPath();
	        ctx.moveTo(b.x, b.y);
	        ctx.lineTo(b.x + extraLine.x, b.y + extraLine.y);
	        ctx.closePath();
	        ctx.stroke();
	        angled._multiply(off);
	
	        tx = b.x + _vxn * textOff + angled.x;
	        ty = b.y + _vyn * textOff + angled.y;
	        drawText(tx, ty);
	      }
	    }
	  }, {
	    key: 'drawForArc',
	    value: function drawForArc(ctx, scale, viewer) {
	
	      var r = this.obj.distanceA();
	
	      var hxn = Math.cos(this.angle);
	      var hyn = Math.sin(this.angle);
	
	      var vxn = -hyn;
	      var vyn = hxn;
	
	      //fix angle if needed
	      if (!this.obj.isPointInsideSector(this.obj.c.x + hxn, this.obj.c.y + hyn)) {
	        var cosA = hxn * (this.obj.a.x - this.obj.c.x) + hyn * (this.obj.a.y - this.obj.c.y);
	        var cosB = hxn * (this.obj.b.x - this.obj.c.x) + hyn * (this.obj.b.y - this.obj.c.y);
	        if (cosA - hxn > cosB - hxn) {
	          this.angle = this.obj.getStartAngle();
	        } else {
	          this.angle = this.obj.getEndAngle();
	        }
	      }
	
	      var vertOff = getTextOff(viewer.dimScale);
	      var horOff = 5 * viewer.dimScale;
	
	      var fontSize = 12 * viewer.dimScale;
	      ctx.font = fontSize + "px Arial";
	      var txt = 'R ' + r.toFixed(2);
	      var textWidth = ctx.measureText(txt).width;
	
	      var startX = this.obj.c.x + hxn * r;
	      var startY = this.obj.c.y + hyn * r;
	      var lineLength = textWidth + horOff * 2;
	
	      ctx.beginPath();
	      ctx.moveTo(startX, startY);
	      ctx.lineTo(startX + hxn * lineLength, startY + hyn * lineLength);
	      ctx.closePath();
	      ctx.stroke();
	
	      var tx = startX + vxn * vertOff + hxn * horOff;
	      var ty = startY + vyn * vertOff + hyn * horOff;
	      ctx.save();
	      ctx.translate(tx, ty);
	      ctx.rotate(-Math.atan2(vxn, vyn));
	      ctx.scale(1, -1);
	      ctx.fillText(txt, 0, 0);
	      ctx.restore();
	    }
	  }, {
	    key: 'normalDistance',
	    value: function normalDistance(aim) {
	      return -1;
	    }
	  }]);
	
	  return DiameterDimension;
	}(_sketchObject.SketchObject);
	
	DiameterDimension.prototype._class = 'TCAD.TWO.DiameterDimension';
	
	function getTextOff(scale) {
	  return 3 * scale;
	}

/***/ },
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _sketcherApp = __webpack_require__(128);
	
	var _sketcherApp2 = _interopRequireDefault(_sketcherApp);
	
	var _styles = __webpack_require__(86);
	
	var _viewer2d = __webpack_require__(85);
	
	var _ui = __webpack_require__(129);
	
	var ui = _interopRequireWildcard(_ui);
	
	var _toolkit = __webpack_require__(5);
	
	var toolkit = _interopRequireWildcard(_toolkit);
	
	var _utils = __webpack_require__(88);
	
	var _parametric = __webpack_require__(87);
	
	__webpack_require__(2);
	
	__webpack_require__(141);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function initializeSketcherApplication() {
	  var app = new _sketcherApp2.default();
	  window._TCAD_APP = app;
	  var sketchId = app.getSketchId();
	  if (sketchId == _sketcherApp2.default.STORAGE_PREFIX + '__sample2D__') {
	    var sample = '{"layers":[{"name":"_dim","style":{"lineWidth":1,"strokeStyle":"#bcffc1","fillStyle":"#00FF00"},"data":[{"id":0,"_class":"TCAD.TWO.DiameterDimension","obj":90},{"id":1,"_class":"TCAD.TWO.DiameterDimension","obj":95},{"id":2,"_class":"TCAD.TWO.DiameterDimension","obj":42},{"id":3,"_class":"TCAD.TWO.Dimension","a":5,"b":8,"flip":false},{"id":4,"_class":"TCAD.TWO.DiameterDimension","obj":105}]},{"name":"sketch","style":{"lineWidth":2,"strokeStyle":"#ffffff","fillStyle":"#000000"},"data":[{"id":11,"_class":"TCAD.TWO.Segment","points":[[5,[6,110.1295615870824],[7,313.66509156975803]],[8,[9,419.44198895058975],[10,516.7065215258621]]]},{"id":18,"_class":"TCAD.TWO.Segment","points":[[12,[13,489.1218947877601],[14,477.98601743930897]],[15,[16,481.90945628911174],[17,182.9391540301952]]]},{"id":25,"_class":"TCAD.TWO.Segment","points":[[19,[20,427.6872468325118],[21,163.96220645927505]],[22,[23,349.9023145352797],[24,256.7344291384989]]]},{"id":32,"_class":"TCAD.TWO.Segment","points":[[26,[27,306.81261277555075],[28,273.1404656521002]],[29,[30,135.09050734792822],[31,247.98348666778958]]]},{"id":42,"_class":"TCAD.TWO.Arc","points":[[33,[34,489.1218947877601],[35,477.98601743930897]],[36,[37,419.44198895058975],[38,516.7065215258621]],[39,[40,444.1353623657045],[41,479.08688157090376]]]},{"id":53,"_class":"TCAD.TWO.Arc","points":[[44,[45,427.6872468325118],[46,163.96220645927505]],[47,[48,481.90945628911174],[49,182.9391540301952]],[50,[51,451.2148840882273],[52,183.68960424767275]]]},{"id":64,"_class":"TCAD.TWO.Arc","points":[[55,[56,349.9023145352797],[57,256.7344291384989]],[58,[59,306.81261277555075],[60,273.1404656521002]],[61,[62,313.6665992835383],[63,226.35256652594512]]]},{"id":75,"_class":"TCAD.TWO.Arc","points":[[66,[67,110.1295615870824],[68,313.66509156975803]],[69,[70,135.09050734792822],[71,247.98348666778958]],[72,[73,129.8749213918784],[74,283.58516027516237]]]},{"id":80,"_class":"TCAD.TWO.Circle","c":[77,[78,444.1353623657045],[79,479.08688157090376]],"r":17},{"id":85,"_class":"TCAD.TWO.Circle","c":[82,[83,451.2148840882273],[84,183.68960424767275]],"r":17},{"id":90,"_class":"TCAD.TWO.Circle","c":[87,[88,129.8749213918784],[89,283.58516027516237]],"r":17},{"id":95,"_class":"TCAD.TWO.Circle","c":[92,[93,364.7627927122075],[94,358.27520724354514]],"r":50},{"id":100,"_class":"TCAD.TWO.Circle","c":[97,[98,450.6425914465028],[99,356.1758703461729]],"r":13},{"id":105,"_class":"TCAD.TWO.Circle","c":[102,[103,281.1241663120215],[104,360.3197585470608]],"r":13}]},{"name":"_construction_","style":{"lineWidth":1,"strokeStyle":"#aaaaaa","fillStyle":"#000000"},"data":[{"id":113,"_class":"TCAD.TWO.Segment","points":[[107,[108,366.96497096679207],[109,448.36204633886825]],[110,[111,362.6842565514955],[112,273.2463262825022]]]},{"id":120,"_class":"TCAD.TWO.Segment","points":[[114,[115,254.60331148100178],[116,360.9680624545806]],[117,[118,474.9222739434132],[119,355.5823520325097]]]}]}],"constraints":[["Tangent",[42,18]],["Tangent",[42,11]],["coi",[33,12]],["coi",[36,8]],["Tangent",[53,25]],["Tangent",[53,18]],["coi",[44,19]],["coi",[47,15]],["Tangent",[64,25]],["Tangent",[64,32]],["coi",[55,22]],["coi",[58,26]],["Tangent",[75,11]],["Tangent",[75,32]],["coi",[66,5]],["coi",[69,29]],["coi",[77,39]],["coi",[82,50]],["coi",[87,72]],["RR",[80,85]],["RR",[85,90]],["parallel",[113,18]],["perpendicular",[120,113]],["Symmetry",[92,120]],["PointOnLine",[92,113]],["PointOnLine",[102,120]],["PointOnLine",[97,120]],["RR",[105,100]]]}';
	    localStorage.setItem(sketchId, sample);
	  }
	  app.loadFromLocalStorage();
	  app.fit();
	
	  function addLayer(name, style) {
	    if (app.viewer.findLayerByName(name) === null) {
	      app.viewer.layers.push(new _viewer2d.Layer(name, style));
	    }
	  }
	
	  addLayer("sketch", _styles.Styles.DEFAULT);
	  addLayer("_construction_", _styles.Styles.CONSTRUCTION);
	
	  var actionsWin = new ui.Window($('#actions'), app.winManager);
	
	  ui.bindOpening($('#showActions'), actionsWin);
	  var addAction = ui.createActionsWinBuilder(actionsWin);
	
	  for (var p = 0; p < app._actionsOrder.length; ++p) {
	    var act = app.actions[app._actionsOrder[p]];
	    addAction(act.desc, act.action);
	    $('.act-' + act.id).click(act.action).attr('title', act.desc);
	  }
	
	  function infoStr(c) {
	    if (c.SettableFields === undefined) return "";
	    var info = Object.keys(c.SettableFields).map(function (f) {
	      var val = c[f];
	      var num = Number(val);
	      if (isNaN(num)) {
	        num = Number(app.viewer.parametricManager.constantResolver(val));
	        return val + "(" + (isNaN(num) ? "?" : num.toFixed(2)) + ")";
	      }
	      return num.toFixed(2);
	    }).join(", ");
	    if (info.length != 0) {
	      info = " <span style='font-size: 8px;'>[" + info + "]</span>";
	    }
	    return info;
	  }
	
	  var pm = app.viewer.parametricManager;
	  var constrList = new ui.List('constrs', {
	    items: function items() {
	      var theItems = [];
	      for (var j = 0; j < pm.subSystems.length; j++) {
	        var sub = pm.subSystems[j];
	        for (var i = 0; i < sub.constraints.length; ++i) {
	          var constr = sub.constraints[i];
	          if (constr.aux !== true && app.constraintFilter[constr.NAME] != true) {
	            theItems.push({ name: constr.UI_NAME + infoStr(constr), constr: constr });
	          }
	        }
	      }
	      theItems.sort(function (a, b) {
	        if (a.constr.NAME == 'coi') {
	          return b.constr.NAME == 'coi' ? 0 : 1;
	        }
	        return a.constr.NAME.localeCompare(b.constr.NAME);
	      });
	      return theItems;
	    },
	
	    remove: function remove(item) {
	      pm.remove(item.constr);
	    },
	
	    mouseleave: function mouseleave(item) {
	      app.viewer.deselectAll();
	      app.viewer.refresh();
	    },
	
	    hover: function hover(item) {
	      app.viewer.select(item.constr.getObjects(), true);
	      app.viewer.refresh();
	    },
	
	    click: function click(item) {
	      var c = item.constr;
	      if (c.SettableFields === undefined) return;
	      for (var f in c.SettableFields) {
	        var value = c[f];
	        var intro = c.SettableFields[f];
	
	        value = (0, _utils.askNumber)(intro, typeof value == "number" ? value.toFixed(4) : value, prompt, pm.constantResolver);
	        if (value != null) {
	          c[f] = value;
	        }
	      }
	      app.viewer.parametricManager.refresh();
	    }
	  });
	  var constraintsView = app.dock.views['Constraints'];
	
	  function configureConstraintsFilter() {
	    var constraintsCaption = constraintsView.node.find('.tool-caption');
	    var constraintsFilterBtn = ui.faBtn("filter");
	    constraintsFilterBtn.css({ 'float': 'right', 'margin-right': '10px', cursor: 'pointer' });
	    constraintsCaption.append(constraintsFilterBtn);
	    var constraintsFilterWin = new ui.Window($('#constrFilter'), app.winManager);
	    ui.bindOpening(constraintsFilterBtn, constraintsFilterWin);
	    var content = constraintsFilterWin.root.find('.content');
	
	    var constrTypes = [],
	        constrType;
	    for (var cname in _parametric.Constraints) {
	      c = _parametric.Constraints[cname];
	      if (c.prototype !== undefined && c.prototype.UI_NAME !== undefined && !c.prototype.aux) {
	        constrTypes.push(c);
	      }
	    }
	    constrTypes.sort(function (a, b) {
	      if (a.prototype.NAME == 'coi') {
	        return b.prototype.NAME == 'coi' ? 0 : -1;
	      }
	      return a.prototype.UI_NAME.localeCompare(b.prototype.UI_NAME);
	    });
	    for (var i = 0; i < constrTypes.length; i++) {
	      var c = constrTypes[i];
	      if (c.prototype !== undefined && c.prototype.UI_NAME !== undefined && !c.prototype.aux) {
	        var checkbox = $('<input>', { type: 'checkbox', checked: 'checked', value: c.prototype.NAME });
	        content.append($('<label>', { css: { display: 'block', 'white-space': 'nowrap' } }).append(checkbox).append(c.prototype.UI_NAME));
	        checkbox.change(function () {
	          var checkbox = $(this);
	          app.constraintFilter[checkbox.val()] = checkbox.is(':checked') != true;
	          constrList.refresh();
	        });
	      }
	    }
	  }
	  configureConstraintsFilter();
	  constraintsView.node.append(constrList.ul);
	  app.viewer.parametricManager.listeners.push(function () {
	    constrList.refresh();
	  });
	  constrList.refresh();
	
	  var layerSelection = new toolkit.Combo('layerSelection', 'Layer');
	  app.dock.views['Properties'].node.append(layerSelection.root);
	
	  var updateLayersList = function updateLayersList() {
	    var options = '';
	    for (var i = 0; i < app.viewer.layers.length; i++) {
	      var layer = app.viewer.layers[i];
	      options += "<option value='" + layer.name + "'>" + layer.name + "</option>";
	    }
	    layerSelection.select.html(options).val(app.viewer.activeLayer.name);
	  };
	  updateLayersList();
	  app.viewer.bus.subscribe("activeLayer", function () {
	    updateLayersList();
	  });
	  layerSelection.select.mousedown(updateLayersList).change(function () {
	    var layer = app.viewer.findLayerByName(layerSelection.select.val());
	    if (layer != null) {
	      app.viewer.activeLayer = layer;
	    }
	  });
	
	  var dimScale = new toolkit.Number("Dim Scale", 1, 0.1, 1);
	  dimScale.min = 0.1;
	  app.dock.views['Properties'].node.append(dimScale.root);
	  dimScale.input.on('t-change', function () {
	    app.viewer.dimScale = $(this).val();
	  });
	  app.viewer.bus.subscribe('dimScale', function (value) {
	    dimScale.input.val(value);
	  });
	  var constantTextArea = $('<textarea />', { placeholder: 'for example: A = 50', css: {
	      width: '100%',
	      resize: 'vertical',
	      background: 'inherit',
	      border: 'none',
	      color: '#C4E1A4'
	    } });
	  app.viewer.params.subscribe('constantDefinition', 'constantTextArea', function (value) {
	    constantTextArea.val(value);
	  })();
	  constantTextArea.bind("change", function () {
	    app.viewer.params.set('constantDefinition', $(this).val(), 'constantTextArea');
	  });
	
	  app.dock.views['Dimensions'].node.append(constantTextArea);
	}
	
	$(function () {
	  return initializeSketcherApplication();
	});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _viewer2d = __webpack_require__(85);
	
	var _ui = __webpack_require__(129);
	
	var ui = _interopRequireWildcard(_ui);
	
	var _terminal = __webpack_require__(130);
	
	var _io = __webpack_require__(83);
	
	var _dim = __webpack_require__(131);
	
	var _point = __webpack_require__(132);
	
	var _segment = __webpack_require__(133);
	
	var _arc = __webpack_require__(134);
	
	var _circle = __webpack_require__(110);
	
	var _fillet = __webpack_require__(135);
	
	var _ellipse = __webpack_require__(112);
	
	var _bezierCurve = __webpack_require__(136);
	
	var _rectangle = __webpack_require__(137);
	
	var _origin = __webpack_require__(138);
	
	var _inputManager = __webpack_require__(139);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function App2D() {
	  var _this = this;
	
	  var app = this;
	
	  this.viewer = new _viewer2d.Viewer(document.getElementById('viewer'), _io.IO);
	  this.winManager = new ui.WinManager();
	  this.inputManager = new _inputManager.InputManager(this);
	
	  this.initSketchManager();
	  this._exportWin = new ui.Window($('#exportManager'), app.winManager);
	
	  $('#exportManager li').click(function () {
	    ui.closeWin(app._exportWin);
	  });
	
	  this.constraintFilter = {};
	  this.actions = {};
	  this.commands = {};
	
	  //For debug view
	  this._actionsOrder = [];
	
	  var dockEl = $('#dock');
	  var buttonGroup = $('#status .button-group');
	  this.dock = new ui.Dock(dockEl, buttonGroup, App2D.views);
	  this.dock.show('Constraints');
	
	  var consoleBtn = ui.dockBtn('Commands', 'list');
	  buttonGroup.append(consoleBtn);
	  this.commandsWin = new ui.Window($('#commands'), this.winManager);
	  this.commandsWin.tileUpRelative = $('#viewer');
	  consoleBtn.click(function (e) {
	    _this.actions['terminal'].action(e);
	  });
	  $(document).on('mousemove', '#viewer', function (e) {
	    var coord = _this.viewer.screenToModel(e);
	    $('.coordinates-info').text(_this.viewer.roundToPrecision(coord.x) + " : " + _this.viewer.roundToPrecision(coord.y));
	  });
	  this.terminalHandler = undefined;
	  this.terminal = new _terminal.Terminal(this.commandsWin, function (command) {
	    return _this.handleTerminalInput(command);
	  }, function () {
	    return _this.getAllCommandList();
	  });
	  this.bindToolsToTerminal();
	
	  this.winManager.registerResize(dockEl, ui.DIRECTIONS.EAST, function () {
	    $('body').trigger('layout');
	  });
	  $('body').on('layout', this.viewer.onWindowResize);
	
	  this.registerAction = function (id, desc, action, command) {
	    app.actions[id] = { id: id, desc: desc, action: action };
	    if (command) {
	      app.commands[command] = id;
	    }
	    app._actionsOrder.push(id);
	  };
	
	  function checkForTerminalVisibility() {
	    var terminalVisible = app.commandsWin.root.is(':visible');
	    if (terminalVisible) {
	      app.terminal.scrollToTheEnd();
	    }
	    app.viewer.referencePoint.visible = terminalVisible;
	  }
	  checkForTerminalVisibility();
	
	  this.registerAction('terminal', "Open/Close Terminal Window", function () {
	    app.commandsWin.toggle();
	    checkForTerminalVisibility();
	    app.viewer.refresh();
	  });
	
	  this.registerAction('open', "Open Sketch", function (e) {
	    app._sketchesList.refresh();
	    ui.openWin(app._sketchesWin, e);
	  });
	
	  this.registerAction('clone', "Clone Sketch", function () {
	    app.cloneSketch();
	  });
	
	  this.registerAction('export', "Export", function (e) {
	    ui.openWin(app._exportWin, e);
	  });
	
	  this.registerAction('exportSVG', "Export To SVG", function () {
	    _io.IO.exportTextData(app.viewer.io.svgExport(), app.getSketchId() + ".svg");
	  });
	
	  this.registerAction('exportDXF', "Export To DXF", function () {
	    _io.IO.exportTextData(app.viewer.io.dxfExport(), app.getSketchId() + ".dxf");
	  });
	
	  this.registerAction('undo', "Undo", function () {
	    app.viewer.historyManager.undo();
	  });
	
	  this.registerAction('redo', "Redo", function () {
	    app.viewer.historyManager.redo();
	  });
	
	  this.registerAction('checkpoint', "Checkpoint", function () {
	    app.viewer.historyManager.checkpoint();
	  });
	
	  this.registerAction('referencePoint', "Set Reference Point", function () {
	    app.viewer.toolManager.takeControl(new _origin.ReferencePointTool(app.viewer));
	  }, "origin");
	
	  this.registerAction('addPoint', "Add Point", function () {
	    app.viewer.toolManager.takeControl(new _point.AddPointTool(app.viewer));
	  }, "point");
	
	  this.registerAction('addSegment', "Add Segment", function () {
	    app.viewer.toolManager.takeControl(new _segment.AddSegmentTool(app.viewer, false));
	  }, 'line');
	
	  this.registerAction('addMultiSegment', "Add Multi Segment", function () {
	    app.viewer.toolManager.takeControl(new _segment.AddSegmentTool(app.viewer, true));
	  }, 'mline');
	
	  this.registerAction('addArc', "Add Arc", function () {
	    app.viewer.toolManager.takeControl(new _arc.AddArcTool(app.viewer));
	  }, 'arc');
	
	  this.registerAction('addCircle', "Add Circle", function () {
	    app.viewer.toolManager.takeControl(new _circle.EditCircleTool(app.viewer));
	  }, 'circle');
	
	  this.registerAction('addEllipse', "Add Ellipse", function () {
	    app.viewer.toolManager.takeControl(new _ellipse.EllipseTool(app.viewer, false));
	  });
	
	  this.registerAction('addEllipticalArc', "Add Elliptical Arc", function () {
	    app.viewer.toolManager.takeControl(new _ellipse.EllipseTool(app.viewer, true));
	  });
	
	  this.registerAction('addBezierCurve', "Add Bezier Curve", function () {
	    app.viewer.toolManager.takeControl(new _bezierCurve.BezierCurveTool(app.viewer));
	  });
	
	  this.registerAction('addRectangle', "Add Rectangle", function () {
	    app.viewer.toolManager.takeControl(new _rectangle.RectangleTool(app.viewer));
	  }, 'rect');
	
	  this.registerAction('pan', "Pan", function () {
	    app.viewer.toolManager.releaseControl();
	  });
	
	  this.registerAction('addFillet', "Add Fillet", function () {
	    app.viewer.toolManager.takeControl(new _fillet.FilletTool(app.viewer));
	  });
	
	  this.registerAction('addDim', "Add Dimension", function () {
	    app.viewer.toolManager.takeControl(new _dim.AddFreeDimTool(app.viewer, app.viewer.dimLayer));
	  });
	
	  this.registerAction('addHDim', "Add Horizontal Dimension", function () {
	    app.viewer.toolManager.takeControl(new _dim.AddHorizontalDimTool(app.viewer, app.viewer.dimLayer));
	  });
	
	  this.registerAction('addVDim', "Add Vertical Dimension", function () {
	    app.viewer.toolManager.takeControl(new _dim.AddVerticalDimTool(app.viewer, app.viewer.dimLayer));
	  });
	
	  this.registerAction('addCircleDim', "Add Circle Dimension", function () {
	    app.viewer.toolManager.takeControl(new _dim.AddCircleDimTool(app.viewer, app.viewer.dimLayer));
	  });
	
	  this.registerAction('save', "Save", function () {
	    var sketchData = app.viewer.io.serializeSketch();
	    var sketchId = app.getSketchId();
	    localStorage.setItem(app.getSketchId(), sketchData);
	    app.viewer.historyManager.checkpoint();
	  });
	
	  this.registerAction('coincident', "Coincident", function () {
	    app.viewer.parametricManager.coincident(app.viewer.selected);
	  });
	
	  this.registerAction('verticalConstraint', "Vertical Constraint", function () {
	    app.viewer.parametricManager.vertical(app.viewer.selected);
	  });
	
	  this.registerAction('horizontalConstraint', "Horizontal Constraint", function () {
	    app.viewer.parametricManager.horizontal(app.viewer.selected);
	  });
	
	  this.registerAction('parallelConstraint', "Parallel Constraint", function () {
	    app.viewer.parametricManager.parallel(app.viewer.selected);
	  });
	
	  this.registerAction('perpendicularConstraint', "Perpendicular Constraint", function () {
	    app.viewer.parametricManager.perpendicular(app.viewer.selected);
	  });
	
	  this.registerAction('P2LDistanceConstraint', "Distance Between Point and Line", function () {
	    app.viewer.parametricManager.p2lDistance(app.viewer.selected, prompt);
	  });
	
	  this.registerAction('P2PDistanceConstraint', "Distance Between two Points", function () {
	    app.viewer.parametricManager.p2pDistance(app.viewer.selected, prompt);
	  });
	
	  this.registerAction('RadiusConstraint', "Radius Constraint", function () {
	    app.viewer.parametricManager.radius(app.viewer.selected, prompt);
	  });
	
	  this.registerAction('EntityEqualityConstraint', "Radius Equals Constraint", function () {
	    app.viewer.parametricManager.entityEquality(app.viewer.selected);
	  });
	
	  this.registerAction('tangentConstraint', "Tangent Constraint", function () {
	    app.viewer.parametricManager.tangent(app.viewer.selected);
	  });
	
	  this.registerAction('lockConstraint', "Lock Constraint", function () {
	    app.viewer.parametricManager.lock(app.viewer.selected);
	  });
	
	  this.registerAction('pointOnLine', "Point On Line", function () {
	    app.viewer.parametricManager.pointOnLine(app.viewer.selected);
	  });
	
	  this.registerAction('pointOnArc', "Point On Arc / Ellipse", function () {
	    app.viewer.parametricManager.pointOnArc(app.viewer.selected);
	  });
	
	  this.registerAction('pointInMiddle', "Point In the Middle", function () {
	    app.viewer.parametricManager.pointInMiddle(app.viewer.selected);
	  });
	
	  this.registerAction('llAngle', "Angle Between 2 Lines", function () {
	    app.viewer.parametricManager.llAngle(app.viewer.selected, prompt);
	  });
	
	  this.registerAction('symmetry', "Symmetry", function () {
	    app.viewer.parametricManager.symmetry(app.viewer.selected, prompt);
	  });
	  this.registerAction('lockConvex', "Lock Convexity", function () {
	    app.viewer.parametricManager.lockConvex(app.viewer.selected, alert);
	  });
	
	  this.registerAction('analyzeConstraint', "Analyze Constraint", function () {
	    app.viewer.parametricManager.analyze(alert);
	  });
	
	  this.registerAction('solve', "Solve System", function () {
	    app.viewer.parametricManager.solve();
	    app.viewer.refresh();
	  });
	
	  this.registerAction('CLEAN UP', "Clean All Draw", function () {
	    app.cleanUpData();
	    app.viewer.refresh();
	  });
	
	  this.registerAction('fit', "Fit Sketch On Screen", function () {
	    app.fit();
	    app.viewer.refresh();
	  });
	}
	
	App2D.views = [{
	  name: 'Dimensions',
	  icon: 'arrows-v'
	}, {
	  name: 'Properties',
	  icon: 'sliders'
	}, {
	  name: 'Constraints',
	  icon: 'cogs'
	}];
	
	App2D.prototype.fit = function () {
	
	  var bbox = new _io.BBox();
	
	  for (var l = 0; l < this.viewer.layers.length; ++l) {
	    var layer = this.viewer.layers[l];
	    for (var i = 0; i < layer.objects.length; ++i) {
	      var obj = layer.objects[i];
	      bbox.check(obj);
	    }
	  }
	  if (!bbox.isValid()) {
	    return;
	  }
	  var bounds = bbox.bbox;
	  this.viewer.showBounds(bounds[0], bounds[1], bounds[2], bounds[3]);
	  bbox.inc(20 / this.viewer.scale);
	  this.viewer.showBounds(bounds[0], bounds[1], bounds[2], bounds[3]);
	};
	
	App2D.prototype.cloneSketch = function () {
	  var name = prompt("Name for sketch clone");
	  if (name != null) {
	    if (this.isSketchExists(name)) {
	      alert("Sorry, a sketch with the name '" + name + "' already exists. Won't override it.");
	      return;
	    }
	    localStorage.setItem(App2D.STORAGE_PREFIX + name, this.viewer.io.serializeSketch());
	    this.openSketch(name);
	  }
	};
	
	App2D.prototype.isSketchExists = function (name) {
	  return localStorage.getItem(App2D.STORAGE_PREFIX + name) != null;
	};
	
	App2D.prototype.openSketch = function (name) {
	  var uri = window.location.href.split("#")[0];
	  if (name !== "untitled") {
	    uri += "#" + name;
	  }
	  var win = window.open(uri, '_blank');
	  win.focus();
	};
	
	App2D.prototype.newSketch = function () {
	  var name = prompt("Name for sketch");
	  if (name != null) {
	    if (this.isSketchExists(name)) {
	      alert("Sorry, a sketch with the name '" + name + "' already exists. Won't override it.");
	      return;
	    }
	    this.openSketch(name);
	  }
	};
	
	App2D.prototype.initSketchManager = function (data, ext) {
	  this._sketchesWin = new ui.Window($('#sketchManager'), this.winManager);
	  var app = this;
	  var sketchesList = new ui.List('sketchList', {
	    items: function items() {
	      var theItems = [];
	      for (var name in localStorage) {
	        if (!localStorage.hasOwnProperty(name)) {
	          continue;
	        }
	        if (name.indexOf(App2D.STORAGE_PREFIX) === 0) {
	          name = name.substring(App2D.STORAGE_PREFIX.length);
	        }
	        theItems.push({ name: name });
	      }
	      return theItems;
	    },
	
	    remove: function remove(item) {
	      if (confirm("Selected sketch will be REMOVED! Are you sure?")) {
	        localStorage.removeItem(App2D.STORAGE_PREFIX + item.name);
	        sketchesList.refresh();
	      }
	    },
	
	    mouseleave: function mouseleave(item) {},
	    hover: function hover(item) {},
	
	    click: function click(item) {
	      app.openSketch(item.name);
	    }
	  });
	  $('#sketchManager').find('.content').append(sketchesList.ul);
	  sketchesList.refresh();
	  this._sketchesList = sketchesList;
	};
	
	App2D.prototype.loadFromLocalStorage = function () {
	  var sketchId = this.getSketchId();
	  var sketchData = localStorage.getItem(sketchId);
	  if (sketchData != null) {
	    this.viewer.historyManager.init(sketchData);
	    this.viewer.io.loadSketch(sketchData);
	  }
	  this.viewer.repaint();
	};
	
	App2D.prototype.getSketchId = function () {
	  var id = window.location.hash.substring(1);
	  if (!id) {
	    id = "untitled";
	  }
	  return App2D.STORAGE_PREFIX + id;
	};
	
	App2D.prototype.bindToolsToTerminal = function () {
	  var _this2 = this;
	
	  var toolCommandProcessor = function toolCommandProcessor(command) {
	    return _this2.viewer.toolManager.tool.processCommand(command);
	  };
	  this.viewer.bus.subscribe('tool-change', function () {
	    var tool = _this2.viewer.toolManager.tool;
	    _this2.terminalHandler = tool.processCommand ? toolCommandProcessor : undefined;
	    $('.tool-info').text('tool: ' + tool.name);
	    $('.tool-hint').text('');
	  })();
	  this.viewer.bus.subscribe('tool-message', function (message) {
	    _this2.terminal.print(message);
	  });
	  this.viewer.bus.subscribe('tool-hint', function (message) {
	    _this2.terminal.print(message);
	    $('.tool-hint').text(message);
	  });
	};
	
	App2D.STATIC_COMMANDS = {
	  "time": function time() {
	    return new Date();
	  },
	  "help": function help(app) {
	    return app.getAllCommandList().join(", ");
	  }
	};
	
	App2D.prototype.getAllCommandList = function () {
	  var commands = Object.keys(this.commands);
	  commands.push.apply(commands, Object.keys(App2D.STATIC_COMMANDS));
	  commands.sort();
	  return commands;
	};
	
	App2D.prototype.handleTerminalInput = function (commandStr) {
	  commandStr = commandStr.trim();
	  if (this.terminalHandler) {
	    return this.terminalHandler(commandStr);
	  } else {
	    var cmd = App2D.STATIC_COMMANDS[commandStr];
	    if (cmd) {
	      return cmd(this);
	    }
	    var actionId = this.commands[commandStr];
	    if (actionId) {
	      this.actions[actionId].action();
	    } else {
	      try {
	        return eval(commandStr);
	      } catch (e) {}
	    }
	  }
	};
	
	App2D.STORAGE_PREFIX = "TCAD.projects.";
	
	exports.default = App2D;

/***/ },
/* 129 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	/** @constructor */
	function Window(el, winManager) {
	  this.root = el;
	  this.neverOpened = !this.root.is(':visible');
	  this.tileUpRelative = $('body');
	  this.onShowCallback = null;
	  var root = this.root;
	  var caption = this.root.find('.tool-caption');
	  caption.each(function () {
	    var closeBtn = '<span class="btn rm" style="float: right;"><i class="fa fa-remove"></i></span>';
	    $(this).append(closeBtn);
	  });
	  this.root.find('.tool-caption .rm').click(function () {
	    root.hide();
	  });
	  var DIRS = DIRECTIONS;
	  winManager.registerResize(this.root, DIRS.NORTH | DIRS.SOUTH | DIRS.WEST | DIRS.EAST);
	  winManager.registerDrag(this.root, caption);
	}
	
	Window.prototype.toggle = function () {
	  var aboutToShow = !this.root.is(':visible');
	  if (aboutToShow) {
	    this.tileUpPolicy(this.neverOpened, this.tileUpRelative);
	  }
	  this.neverOpened = false;
	  this.root.toggle();
	  if (aboutToShow && this.onShowCallback != null) {
	    this.onShowCallback(this);
	  }
	};
	
	Window.prototype.tileUpPolicy = function (firstTime, relativeEl) {
	  var span = 20;
	  var relOff = relativeEl.offset();
	  var off = this.root.offset();
	  off = {
	    left: parseInt(this.root.css('left')),
	    top: parseInt(this.root.css('top'))
	  };
	
	  if (firstTime) {
	    off = {
	      left: relOff.left + relativeEl.width() - this.root.width() - span,
	      top: relOff.top + relativeEl.height() - this.root.height() - span
	    };
	    this.root.css({
	      left: off.left + 'px',
	      top: off.top + 'px'
	    });
	  }
	  var needToSet = false;
	  if (off.left < relOff.left || off.left >= relOff.left + relativeEl.width() - span) {
	    off.left = relOff.left + span;
	    needToSet = true;
	  }
	  if (off.top < relOff.top || off.top >= relOff.top + relativeEl.height() - span) {
	    off.top = relOff.top + span;
	    needToSet = true;
	  }
	  if (needToSet) {
	    this.root.css({
	      left: off.left + 'px',
	      top: off.top + 'px'
	    });
	  }
	  //var fixedWidth = null;
	  //var fixedHeight = null;
	  //
	  //if (off.left + this.root.width() > relOff.left + relativeEl.width()) {
	  //  fixedWidth = this.root.width() - span * 2; 
	  //}
	  //if (off.top + this.root.height() > relOff.top + relativeEl.height()) {
	  //  fixedHeight = this.root.width() - span * 2;
	  //}
	  //if (fixedWidth != null) {
	  //  console.log(fixedWidth)
	  //  this.root.css({ width : fixedWidth + 'px'});
	  //}
	  //if (fixedHeight != null) {
	  //  this.root.css({ height : fixedHeight + 'px'});
	  //}
	};
	
	function WinManager() {
	  this.moveHandler = null;
	  var wm = this;
	  $('body').mousemove(function (e) {
	    if (wm.moveHandler != null) {
	      wm.moveHandler(e);
	      e.preventDefault();
	    }
	  });
	  $('body').mouseup(function (e) {
	    wm.moveHandler = null;
	  });
	}
	
	WinManager.prototype.captureDrag = function (el, e) {
	  var origin = { x: e.pageX, y: e.pageY };
	  var originLocation = el.offset();
	  this.moveHandler = function (e) {
	    var dx = e.pageX - origin.x;
	    var dy = e.pageY - origin.y;
	    el.offset({ left: originLocation.left + dx, top: originLocation.top + dy });
	  };
	};
	
	WinManager.prototype.captureResize = function (el, dirMask, e, onResize) {
	
	  var origin = { x: e.pageX, y: e.pageY };
	  var originSize = { x: el.width(), y: el.height() };
	  var originLocation = el.offset();
	  var north = _maskTest(dirMask, DIRECTIONS.NORTH);
	  var south = _maskTest(dirMask, DIRECTIONS.SOUTH);
	  var west = _maskTest(dirMask, DIRECTIONS.WEST);
	  var east = _maskTest(dirMask, DIRECTIONS.EAST);
	
	  this.moveHandler = function (e) {
	    var dx = e.pageX - origin.x;
	    var dy = e.pageY - origin.y;
	    if (east) {
	      el.css('width', originSize.x + dx + 'px');
	    }
	    var top = originLocation.top;
	    var left = originLocation.left;
	    var setLoc = false;
	    if (west) {
	      el.css('width', originSize.x - dx + 'px');
	      left += dx;
	      setLoc = true;
	    }
	    if (south) {
	      el.css('height', originSize.y + dy + 'px');
	    }
	    if (north) {
	      el.css('height', originSize.y - dy + 'px');
	      top += dy;
	      setLoc = true;
	    }
	    if (setLoc) {
	      el.offset({ left: left, top: top });
	    }
	    if (onResize !== undefined) {
	      onResize();
	    }
	  };
	};
	
	var DIRECTIONS = {
	  NORTH: 0x0001,
	  SOUTH: 0x0010,
	  WEST: 0x0100,
	  EAST: 0x1000
	};
	
	WinManager.prototype.registerResize = function (el, dirMask, onResize) {
	  var wm = this;
	  var north = _maskTest(dirMask, DIRECTIONS.NORTH);
	  var south = _maskTest(dirMask, DIRECTIONS.SOUTH);
	  var west = _maskTest(dirMask, DIRECTIONS.WEST);
	  var east = _maskTest(dirMask, DIRECTIONS.EAST);
	
	  var borderTop = parseInt(el.css('borderTopWidth'), 10);
	  var borderLeft = parseInt(el.css('borderLeftWidth'), 10);
	
	  function onNorthEdge(e, el) {
	    var offset = el.offset();
	    return e.pageY < offset.top + borderTop;
	  }
	
	  function onSouthEdge(e, el) {
	    var offset = el.offset();
	    var height = el.height();
	    return e.pageY > offset.top + height + borderTop;
	  }
	
	  function onWestEdge(e, el) {
	    var offset = el.offset();
	    return e.pageX < offset.left + borderLeft;
	  }
	
	  function onEastEdge(e, el) {
	    var offset = el.offset();
	    var width = el.width();
	    return e.pageX > offset.left + width + borderLeft;
	  }
	
	  el.mousedown(function (e) {
	    var $this = $(this);
	    if (north && east && onNorthEdge(e, $this) && onEastEdge(e, $this)) {
	      wm.captureResize(el, DIRECTIONS.NORTH | DIRECTIONS.EAST, e, onResize);
	    } else if (north && west && onNorthEdge(e, $this) && onWestEdge(e, $this)) {
	      wm.captureResize(el, DIRECTIONS.NORTH | DIRECTIONS.WEST, e, onResize);
	    } else if (south && east && onSouthEdge(e, $this) && onEastEdge(e, $this)) {
	      wm.captureResize(el, DIRECTIONS.SOUTH | DIRECTIONS.EAST, e, onResize);
	    } else if (south && west && onSouthEdge(e, $this) && onWestEdge(e, $this)) {
	      wm.captureResize(el, DIRECTIONS.SOUTH | DIRECTIONS.WEST, e, onResize);
	    } else if (north && onNorthEdge(e, $this)) {
	      wm.captureResize(el, DIRECTIONS.NORTH, e, onResize);
	    } else if (south && onSouthEdge(e, $this)) {
	      wm.captureResize(el, DIRECTIONS.SOUTH, e, onResize);
	    } else if (west && onWestEdge(e, $this)) {
	      wm.captureResize(el, DIRECTIONS.WEST, e, onResize);
	    } else if (east && onEastEdge(e, $this)) {
	      wm.captureResize(el, DIRECTIONS.EAST, e, onResize);
	    }
	  });
	  el.mousemove(function (e) {
	
	    var $this = $(this);
	    if (north && east && onNorthEdge(e, $this) && onEastEdge(e, $this)) {
	      el.css('cursor', 'nesw-resize');
	    } else if (north && west && onNorthEdge(e, $this) && onWestEdge(e, $this)) {
	      el.css('cursor', 'nwse-resize');
	    } else if (south && east && onSouthEdge(e, $this) && onEastEdge(e, $this)) {
	      el.css('cursor', 'nwse-resize');
	    } else if (south && west && onSouthEdge(e, $this) && onWestEdge(e, $this)) {
	      el.css('cursor', 'nesw-resize');
	    } else if (south && onSouthEdge(e, $this)) {
	      el.css('cursor', 'ns-resize');
	    } else if (north && onNorthEdge(e, $this)) {
	      el.css('cursor', 'ns-resize');
	    } else if (east && onEastEdge(e, $this)) {
	      el.css('cursor', 'ew-resize');
	    } else if (west && onWestEdge(e, $this)) {
	      el.css('cursor', 'ew-resize');
	    } else {
	      el.css('cursor', 'inherited');
	    }
	  });
	};
	
	WinManager.prototype.registerDrag = function (el, dragger) {
	  var wm = this;
	  dragger.mousedown(function (e) {
	    wm.captureDrag(el, e);
	  });
	};
	
	function bindOpening(btn, win) {
	  btn.click(function (e) {
	    openWin(win, e);
	  });
	}
	
	function createActionsWinBuilder(win) {
	  var content = win.root.find('.content');
	  var template = content.html();
	  content.empty();
	  return function (name, action) {
	    content.append(template.replace("$value$", name));
	    content.find('div:last input').click(action);
	  };
	}
	
	function closeWin(win) {
	  win.root.hide();
	}
	
	function openWin(win, mouseEvent) {
	
	  var x = mouseEvent.pageX;
	  var y = mouseEvent.pageY;
	  var pageW = $(window).width();
	  var pageH = $(window).height();
	  var winW = win.root.width();
	  var winH = win.root.height();
	
	  var left = x < pageW / 2 ? x : x - winW;
	  var top = y < pageH / 2 ? y : y - winH;
	
	  win.root.show();
	  win.root.offset({ top: top, left: left });
	}
	
	/** @constructor */
	function List(id, model) {
	  this.ul = $('<ul>', { 'class': 'tlist', id: id });
	  this.model = model;
	  this.template = '<li>$name$<span class="btn rm" style="float: right;"><i class="fa fa-remove"></i></span></li>';
	}
	
	List.prototype.refresh = function () {
	  this.ul.empty();
	  var items = this.model.items();
	  var model = this.model;
	  function makeCallbacks(li, item, index) {
	    li.find('.rm').click(function (e) {
	      model.remove(item, index);
	      e.stopPropagation();
	      e.preventDefault();
	    });
	    li.hover(function () {
	      model.hover(item, index);
	    });
	    li.mouseleave(function () {
	      model.mouseleave(item, index);
	    });
	    li.click(function () {
	      model.click(item, index);
	    });
	  }
	
	  for (var i = 0; i < items.length; ++i) {
	    var item = items[i];
	    var li = $(this.template.replace('$name$', item.name));
	    this.ul.append(li);
	    makeCallbacks(li, item, i);
	  }
	};
	
	function dockBtn(name, icon) {
	  var btn = $('<span>', { 'class': 'dock-btn' });
	  btn.append(faBtn(icon));
	  btn.append($('<span>', { 'class': 'txt' }).text(name));
	  return btn;
	}
	
	function faBtn(iconName) {
	  return $('<i>', { 'class': 'fa fa-' + iconName });
	}
	
	function Dock(dockEl, switcherEl, viewDefinitions) {
	  this.views = {};
	  this.dockEl = dockEl;
	  function bindClick(dock, switchEl, viewName) {
	    switchEl.click(function (e) {
	      if (dock.isVisible(viewName)) {
	        dock.hide(viewName);
	      } else {
	        dock.show(viewName);
	      }
	    });
	  }
	  for (var i = 0; i < viewDefinitions.length; i++) {
	    var viewDef = viewDefinitions[i];
	    var view = {};
	    this.views[viewDef.name] = view;
	    view.node = $('<div>', { 'class': 'dock-node' });
	    var caption = $('<div>', { 'class': 'tool-caption' });
	    caption.append($('<span>', { 'class': 'txt' }).text(viewDef.name.toUpperCase()));
	    caption.append(faBtn(viewDef.icon));
	    view.node.append(caption);
	    view.node.hide();
	    this.dockEl.append(view.node);
	    view.switchBtn = dockBtn(viewDef.name, viewDef.icon);
	    bindClick(this, view.switchBtn, viewDef.name);
	    switcherEl.append(view.switchBtn);
	  }
	}
	
	Dock.prototype.show = function (viewName) {
	  var view = this.views[viewName];
	  if (view.switchBtn.hasClass('selected')) {
	    return;
	  }
	  if (!this.dockEl.is(":visible")) {
	    this.dockEl.show();
	    $('body').trigger('layout');
	  }
	  view.node.show();
	  view.switchBtn.addClass('selected');
	};
	
	Dock.prototype.hide = function (viewName) {
	  var view = this.views[viewName];
	  if (!view.switchBtn.hasClass('selected')) {
	    return;
	  }
	  view.node.hide();
	  view.switchBtn.removeClass('selected');
	  if (this.dockEl.find('.dock-node:visible').length == 0) {
	    this.dockEl.hide();
	    $('body').trigger('layout');
	  }
	};
	
	Dock.prototype.isVisible = function (viewName) {
	  return this.views[viewName].switchBtn.hasClass('selected');
	};
	
	function _maskTest(mask, value) {
	  return (mask & value) === value;
	}
	
	exports.WinManager = WinManager;
	exports.Window = Window;
	exports.List = List;
	exports.Dock = Dock;
	exports.dockBtn = dockBtn;
	exports.faBtn = faBtn;
	exports.openWin = openWin;
	exports.closeWin = closeWin;
	exports.bindOpening = bindOpening;
	exports.createActionsWinBuilder = createActionsWinBuilder;
	exports.DIRECTIONS = DIRECTIONS;

/***/ },
/* 130 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Terminal = Terminal;
	function Terminal(win, commandProcessor, variantsSupplier) {
	  var _this = this;
	
	  this.win = win;
	  this.out = win.root.find('.terminal-output');
	  var input = win.root.find('.terminal-input input');
	  this.input = input;
	
	  win.onShowCallback = function () {
	    input.focus();
	  };
	  this.makeAlwaysFocusable();
	
	  this.history = [];
	  this.historyPointer = 0;
	  var setHistory = function setHistory() {
	    if (_this.history.length == 0) return;
	    input.val(_this.history[_this.historyPointer]);
	  };
	
	  input.keydown(function (e) {
	    function consumeEvent() {
	      e.preventDefault();
	      e.stopPropagation();
	    }
	    if (e.keyCode == 9) {
	      (function () {
	        var text = input.val();
	        var variants = variantsSupplier().filter(function (v) {
	          return v.startsWith(text);
	        });
	        variants.sort();
	        if (variants.length == 0) {} else {
	          var shared = sharedStartOfSortedArray(variants);
	          if (shared.length != text.length) {
	            input.val(shared);
	          } else {
	            var autocompleteArea = _this.out.find('.autocomplete-area');
	            if (autocompleteArea.length == 0) {
	              autocompleteArea = $('<div>', { 'class': 'terminal-commandText autocomplete-area' });
	              _this.out.append(autocompleteArea);
	            }
	            var more = '';
	            var limit = 20;
	            if (variants.length > limit) {
	              more = '... and ' + (variants.length - limit) + ' more';
	              variants = variants.slice(0, limit);
	            }
	            autocompleteArea.text(variants.join(' ') + more);
	            _this.scrollToTheEnd();
	          }
	        }
	        consumeEvent();
	      })();
	    } else if (e.keyCode == 38) {
	      _this.historyPointer = Math.max(_this.historyPointer - 1, 0);
	      setHistory();
	      consumeEvent();
	    } else if (e.keyCode == 40) {
	      if (_this.historyPointer != _this.history.length) {
	        _this.historyPointer = Math.min(_this.historyPointer + 1, _this.history.length - 1);
	        setHistory();
	      }
	      consumeEvent();
	    }
	  });
	
	  input.keyup(function (e) {
	    if (e.keyCode == 13) {
	      var command = input.val();
	      _this.out.find('.autocomplete-area').remove();
	      input.val('');
	      _this.out.append($('<div>', { text: '> ' + command, 'class': 'terminal-commandText' }));
	      if (command != null && command.trim().length != 0) {
	        var result = commandProcessor(command);
	        _this.print(result);
	        if (_this.history.length == 0 || command != _this.history[_this.history.length - 1]) {
	          _this.history.push(command);
	        }
	        _this.historyPointer = _this.history.length;
	      }
	      _this.scrollToTheEnd();
	    }
	  });
	}
	
	Terminal.prototype.makeAlwaysFocusable = function () {
	  var _this2 = this;
	
	  var wasMove = false;
	  this.win.root.mousedown(function () {
	    wasMove = false;
	    return true;
	  });
	  this.win.root.mousemove(function () {
	    wasMove = true;
	    return true;
	  });
	  this.win.root.mouseup(function () {
	    if (!wasMove) _this2.input.focus();
	    return true;
	  });
	};
	
	Terminal.prototype.scrollToTheEnd = function () {
	  this.out.parent().scrollTop(this.out.height());
	};
	
	Terminal.prototype.print = function (text) {
	  this.out.append($('<div>', { text: text, 'class': 'terminal-commandResult' }));
	  this.scrollToTheEnd();
	};
	
	function sharedStartOfSortedArray(array) {
	  var a1 = array[0],
	      a2 = array[array.length - 1],
	      L = a1.length,
	      i = 0;
	  while (i < L && a1.charAt(i) === a2.charAt(i)) {
	    i++;
	  }return a1.substring(0, i);
	}

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AddCircleDimTool = exports.AddVerticalDimTool = exports.AddHorizontalDimTool = exports.AddFreeDimTool = exports.AddDimTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dim = __webpack_require__(120);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _point = __webpack_require__(102);
	
	var _tool = __webpack_require__(101);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AddDimTool = exports.AddDimTool = function (_Tool) {
	  _inherits(AddDimTool, _Tool);
	
	  function AddDimTool(name, viewer, layer, dimCreation) {
	    _classCallCheck(this, AddDimTool);
	
	    var _this = _possibleConstructorReturn(this, (AddDimTool.__proto__ || Object.getPrototypeOf(AddDimTool)).call(this, name, viewer));
	
	    _this.layer = layer;
	    _this.dim = null;
	    _this._v = new _vector2.default(0, 0, 0);
	    _this.dimCreation = dimCreation;
	    return _this;
	  }
	
	  _createClass(AddDimTool, [{
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      this.viewer.snap(p.x, p.y, []);
	      if (this.dim != null) {
	        this.dim.b.x = p.x;
	        this.dim.b.y = p.y;
	      }
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	
	      if (e.button > 0 && this.dim != null) {
	        this.dim.flip = !this.dim.flip;
	        this.viewer.refresh();
	        return;
	      }
	
	      if (this.viewer.snapped == null) {
	        return;
	      }
	
	      var p = this.viewer.snapped;
	      this.viewer.cleanSnap();
	
	      if (this.dim == null) {
	        this.viewer.historyManager.checkpoint();
	        this.dim = this.dimCreation(p, new _point.EndPoint(p.x, p.y));
	        this.layer.add(this.dim);
	        this.viewer.refresh();
	      } else {
	        this.dim.b = p;
	        this.viewer.toolManager.releaseControl();
	        this.viewer.refresh();
	      }
	    }
	  }]);
	
	  return AddDimTool;
	}(_tool.Tool);
	
	var AddFreeDimTool = exports.AddFreeDimTool = function (_AddDimTool) {
	  _inherits(AddFreeDimTool, _AddDimTool);
	
	  function AddFreeDimTool(viewer, layer) {
	    _classCallCheck(this, AddFreeDimTool);
	
	    return _possibleConstructorReturn(this, (AddFreeDimTool.__proto__ || Object.getPrototypeOf(AddFreeDimTool)).call(this, 'free dimension', viewer, layer, function (a, b) {
	      return new _dim.Dimension(a, b);
	    }));
	  }
	
	  return AddFreeDimTool;
	}(AddDimTool);
	
	var AddHorizontalDimTool = exports.AddHorizontalDimTool = function (_AddDimTool2) {
	  _inherits(AddHorizontalDimTool, _AddDimTool2);
	
	  function AddHorizontalDimTool(viewer, layer) {
	    _classCallCheck(this, AddHorizontalDimTool);
	
	    return _possibleConstructorReturn(this, (AddHorizontalDimTool.__proto__ || Object.getPrototypeOf(AddHorizontalDimTool)).call(this, 'horizontal dimension', viewer, layer, function (a, b) {
	      return new _dim.HDimension(a, b);
	    }));
	  }
	
	  return AddHorizontalDimTool;
	}(AddDimTool);
	
	var AddVerticalDimTool = exports.AddVerticalDimTool = function (_AddDimTool3) {
	  _inherits(AddVerticalDimTool, _AddDimTool3);
	
	  function AddVerticalDimTool(viewer, layer) {
	    _classCallCheck(this, AddVerticalDimTool);
	
	    return _possibleConstructorReturn(this, (AddVerticalDimTool.__proto__ || Object.getPrototypeOf(AddVerticalDimTool)).call(this, 'vertical dimension', viewer, layer, function (a, b) {
	      return new _dim.VDimension(a, b);
	    }));
	  }
	
	  return AddVerticalDimTool;
	}(AddDimTool);
	
	var AddCircleDimTool = exports.AddCircleDimTool = function (_Tool2) {
	  _inherits(AddCircleDimTool, _Tool2);
	
	  function AddCircleDimTool(viewer, layer) {
	    _classCallCheck(this, AddCircleDimTool);
	
	    var _this5 = _possibleConstructorReturn(this, (AddCircleDimTool.__proto__ || Object.getPrototypeOf(AddCircleDimTool)).call(this, 'arc/circle dimension', viewer));
	
	    _this5.layer = layer;
	    _this5.dim = new _dim.DiameterDimension(null);
	    _this5.viewer.add(_this5.dim, _this5.layer);
	    return _this5;
	  }
	
	  _createClass(AddCircleDimTool, [{
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      var objects = this.viewer.search(p.x, p.y, 20 / this.viewer.scale, true, false, []).filter(function (o) {
	        return o._class === 'TCAD.TWO.Circle' || o._class === 'TCAD.TWO.Arc';
	      });
	
	      if (objects.length != 0) {
	        this.dim.obj = objects[0];
	      } else {
	        this.dim.obj = null;
	      }
	      if (this.dim.obj != null) {
	        this.dim.angle = Math.atan2(p.y - this.dim.obj.c.y, p.x - this.dim.obj.c.x);
	      }
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      if (this.dim.obj !== null) {
	        this.viewer.historyManager.checkpoint();
	      } else {
	        this.viewer.remove(this.dim);
	      }
	      this.viewer.toolManager.releaseControl();
	    }
	  }]);

	  return AddCircleDimTool;
	}(_tool.Tool);

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AddPointTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _point = __webpack_require__(102);
	
	var _tool = __webpack_require__(101);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AddPointTool = exports.AddPointTool = function (_Tool) {
	  _inherits(AddPointTool, _Tool);
	
	  function AddPointTool(viewer) {
	    _classCallCheck(this, AddPointTool);
	
	    return _possibleConstructorReturn(this, (AddPointTool.__proto__ || Object.getPrototypeOf(AddPointTool)).call(this, 'point', viewer));
	  }
	
	  _createClass(AddPointTool, [{
	    key: 'restart',
	    value: function restart() {
	      this.sendSpecifyPointHint();
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      var input = this.viewer.screenToModel(e);
	      this.processPointInput(input);
	    }
	  }, {
	    key: 'processCommand',
	    value: function processCommand(command) {
	      var result = _tool.Tool.ParseVector(this.viewer.referencePoint, command);
	      if (typeof result === 'string') {
	        return result;
	      }
	      this.processPointInput(result);
	    }
	  }, {
	    key: 'processPointInput',
	    value: function processPointInput(input) {
	      this.viewer.historyManager.checkpoint();
	      var p = new _point.EndPoint(input.x, input.y);
	      var layer = this.viewer.activeLayer;
	      layer.add(p);
	      this.pointPicked(input.x, input.y);
	      this.viewer.refresh();
	      this.restart();
	    }
	  }]);

	  return AddPointTool;
	}(_tool.Tool);

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AddSegmentTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tool = __webpack_require__(101);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AddSegmentTool = exports.AddSegmentTool = function (_Tool) {
	  _inherits(AddSegmentTool, _Tool);
	
	  function AddSegmentTool(viewer, multi) {
	    _classCallCheck(this, AddSegmentTool);
	
	    var _this = _possibleConstructorReturn(this, (AddSegmentTool.__proto__ || Object.getPrototypeOf(AddSegmentTool)).call(this, multi ? "multi line" : "line", viewer));
	
	    _this.line = null;
	    _this.multi = multi;
	    return _this;
	  }
	
	  _createClass(AddSegmentTool, [{
	    key: "restart",
	    value: function restart() {
	      this.line = null;
	      this.sendHint('specify the first point');
	    }
	  }, {
	    key: "cleanup",
	    value: function cleanup() {
	      this.viewer.cleanSnap();
	      this.line = null;
	    }
	  }, {
	    key: "mousemove",
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      if (this.line != null) {
	        this.viewer.snap(p.x, p.y, [this.line.a, this.line.b]);
	        this.line.b.x = p.x;
	        this.line.b.y = p.y;
	        this.viewer.refresh();
	      } else {
	        this.viewer.snap(p.x, p.y, []);
	        this.viewer.refresh();
	      }
	    }
	  }, {
	    key: "mouseup",
	    value: function mouseup(e) {
	      if (this.line == null) {
	        var b = this.viewer.screenToModel(e);
	        var a = b;
	        var needSnap = false;
	        if (this.viewer.snapped != null) {
	          a = this.viewer.snapped;
	          this.viewer.cleanSnap();
	          needSnap = true;
	        }
	        this.line = this.viewer.addSegment(a.x, a.y, b.x, b.y, this.viewer.activeLayer);
	        if (needSnap) {
	          this.viewer.parametricManager.linkObjects([this.line.a, a]);
	        }
	        this.firstPointPicked();
	        this.viewer.refresh();
	      } else {
	        if (this.viewer.snapped != null) {
	          var p = this.viewer.snapped;
	          this.viewer.cleanSnap();
	          this.line.b.x = p.x;
	          this.line.b.y = p.y;
	          this.viewer.parametricManager.linkObjects([this.line.b, p]);
	        }
	        this.nextPointPicked();
	      }
	    }
	  }, {
	    key: "nextPointPicked",
	    value: function nextPointPicked() {
	      this.pointPicked(this.line.b.x, this.line.b.y);
	      if (this.multi) {
	        var b = this.line.b;
	        this.line = this.viewer.addSegment(b.x, b.y, b.x, b.y, this.viewer.activeLayer);
	        this.viewer.parametricManager.linkObjects([this.line.a, b]);
	      } else {
	        this.restart();
	      }
	      if (this.multi) {
	        this.sendHint('specify next point');
	      }
	      this.viewer.refresh();
	    }
	  }, {
	    key: "firstPointPicked",
	    value: function firstPointPicked() {
	      this.pointPicked(this.line.a.x, this.line.a.y);
	      this.sendHint('specify ' + (this.multi ? 'next' : 'end') + ' point');
	    }
	  }, {
	    key: "dblclick",
	    value: function dblclick(e) {
	      this.cancelSegment();
	    }
	  }, {
	    key: "keydown",
	    value: function keydown(e) {
	      if (e.keyCode == 27) {
	        this.cancelSegment();
	      }
	    }
	  }, {
	    key: "cancelSegment",
	    value: function cancelSegment() {
	      if (this.multi && this.line != null) {
	        this.viewer.remove(this.line);
	        this.viewer.refresh();
	        this.cleanup(null);
	      }
	    }
	  }, {
	    key: "processCommand",
	    value: function processCommand(command) {
	      var result = _tool.Tool.ParseVector(this.viewer.referencePoint, command);
	      if (typeof result === 'string') {
	        return result;
	      }
	      var p = result;
	      if (this.line == null) {
	        this.line = this.viewer.addSegment(p.x, p.y, p.x, p.y, this.viewer.activeLayer);
	        this.firstPointPicked();
	      } else {
	        this.line.b.x = p.x;
	        this.line.b.y = p.y;
	        this.nextPointPicked();
	      }
	      this.viewer.refresh();
	    }
	  }]);

	  return AddSegmentTool;
	}(_tool.Tool);

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AddArcTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _arc = __webpack_require__(117);
	
	var _point = __webpack_require__(102);
	
	var _tool = __webpack_require__(101);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AddArcTool = exports.AddArcTool = function (_Tool) {
	  _inherits(AddArcTool, _Tool);
	
	  function AddArcTool(viewer) {
	    _classCallCheck(this, AddArcTool);
	
	    var _this = _possibleConstructorReturn(this, (AddArcTool.__proto__ || Object.getPrototypeOf(AddArcTool)).call(this, 'arc', viewer));
	
	    _this.arc = null;
	    _this.point = null;
	    _this._v = new _vector2.default(0, 0, 0);
	    return _this;
	  }
	
	  _createClass(AddArcTool, [{
	    key: 'restart',
	    value: function restart() {
	      this.sendHint('specify center');
	    }
	  }, {
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      if (this.point != null) {
	        this.point.x = p.x;
	        this.point.y = p.y;
	
	        if (this.point.id === this.arc.b.id) {
	          //force placement second point on the arc
	          var r = this.radiusOfFirstPoint();
	          var v = this._v;
	          v.set(this.arc.b.x - this.arc.c.x, this.arc.b.y - this.arc.c.y, 0);
	          v._normalize()._multiply(r);
	          this.arc.b.x = v.x + this.arc.c.x;
	          this.arc.b.y = v.y + this.arc.c.y;
	        } else {
	          this.demoSecondPoint();
	        }
	
	        this.viewer.snap(p.x, p.y, [this.arc.a, this.arc.b, this.arc.c]);
	        this.viewer.refresh();
	      } else {
	        this.viewer.snap(p.x, p.y, []);
	        this.viewer.refresh();
	      }
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      if (this.arc == null) {
	        var center = this.viewer.screenToModel(e);
	        this.createArcStep(center);
	      } else if (this.point.id === this.arc.a.id) {
	        this.snapIfNeed(this.arc.a);
	        this.startingPointSetStep();
	      } else {
	        this.snapIfNeed(this.arc.b);
	        this.finishStep();
	      }
	    }
	  }, {
	    key: 'createArcStep',
	    value: function createArcStep(p) {
	      this.viewer.historyManager.checkpoint();
	      this.arc = new _arc.Arc(new _point.EndPoint(p.x, p.y), new _point.EndPoint(p.x, p.y), new _point.EndPoint(p.x, p.y));
	      this.point = this.arc.a;
	      this.viewer.activeLayer.add(this.arc);
	      this.snapIfNeed(this.arc.c);
	      this.pointPicked(p.x, p.y);
	      this.sendHint('specify arc starting point');
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'startingPointSetStep',
	    value: function startingPointSetStep() {
	      this.point = this.arc.b;
	      this.pointPicked(this.arc.a.x, this.arc.a.y);
	      this.sendHint('specify angle');
	    }
	  }, {
	    key: 'finishStep',
	    value: function finishStep() {
	      this.arc.stabilize(this.viewer);
	      this.pointPicked(this.arc.b.x, this.arc.b.y);
	      this.viewer.refresh();
	      this.viewer.toolManager.releaseControl();
	    }
	  }, {
	    key: 'demoSecondPoint',
	    value: function demoSecondPoint() {
	      var r = this.radiusOfFirstPoint();
	      var ang = Math.atan2(this.arc.a.y - this.arc.c.y, this.arc.a.x - this.arc.c.x) + (2 * Math.PI - 0.3);
	      ang %= 2 * Math.PI;
	      this.arc.b.x = this.arc.c.x + r * Math.cos(ang);
	      this.arc.b.y = this.arc.c.y + r * Math.sin(ang);
	    }
	  }, {
	    key: 'radiusOfFirstPoint',
	    value: function radiusOfFirstPoint() {
	      return math.distance(this.arc.a.x, this.arc.a.y, this.arc.c.x, this.arc.c.y);
	    }
	  }, {
	    key: 'processCommand',
	    value: function processCommand(command) {
	      if (this.arc == null) {
	        var result = _tool.Tool.ParseVector(this.viewer.referencePoint, command);
	        if (typeof result === 'string') return result;
	        this.viewer.cleanSnap();
	        this.createArcStep(result);
	      } else if (this.point.id === this.arc.a.id) {
	        var _result = _tool.Tool.ParseVector(this.viewer.referencePoint, command);
	        if (typeof _result === 'string') return _result;
	        this.arc.a.x = _result.x;
	        this.arc.a.y = _result.y;
	        this.startingPointSetStep();
	        this.demoSecondPoint();
	        this.viewer.refresh();
	      } else {
	        var startingAngle = Math.atan2(this.point.y - this.arc.c.y, this.point.x - this.arc.c.x);
	        var _result2 = _tool.Tool.ParseNumberWithRef(command, startingAngle); // treated as radius and angle
	        var r = this.radiusOfFirstPoint();
	        if (typeof _result2 === 'string') return _result2;
	        var angle = _result2 / 180 * Math.PI;
	        angle %= 2 * Math.PI;
	        this.arc.b.x = this.arc.c.x + r * Math.cos(angle);
	        this.arc.b.y = this.arc.c.y + r * Math.sin(angle);
	        this.finishStep();
	      }
	    }
	  }]);

	  return AddArcTool;
	}(_tool.Tool);

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FilletTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _styles = __webpack_require__(86);
	
	var _fetchers = __webpack_require__(96);
	
	var fetch = _interopRequireWildcard(_fetchers);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _point = __webpack_require__(102);
	
	var _arc = __webpack_require__(117);
	
	var _parametric = __webpack_require__(87);
	
	var _tool = __webpack_require__(101);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FilletTool = exports.FilletTool = function (_Tool) {
	  _inherits(FilletTool, _Tool);
	
	  function FilletTool(viewer) {
	    _classCallCheck(this, FilletTool);
	
	    var _this = _possibleConstructorReturn(this, (FilletTool.__proto__ || Object.getPrototypeOf(FilletTool)).call(this, 'fillet', viewer));
	
	    _this.viewer = viewer;
	    return _this;
	  }
	
	  _createClass(FilletTool, [{
	    key: 'restart',
	    value: function restart() {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.viewer.selected[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var master = _step.value;
	
	          if (master instanceof _point.EndPoint) {
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	              for (var _iterator2 = master.linked[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var slave = _step2.value;
	
	                if (slave instanceof _point.EndPoint) {
	                  if (this.breakLinkAndMakeFillet(master, slave)) {
	                    this.viewer.toolManager.releaseControl();
	                  }
	                }
	              }
	            } catch (err) {
	              _didIteratorError2 = true;
	              _iteratorError2 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                  _iterator2.return();
	                }
	              } finally {
	                if (_didIteratorError2) {
	                  throw _iteratorError2;
	                }
	              }
	            }
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'makeFillet',
	    value: function makeFillet(point1, point2) {
	      function shrink(point1) {
	        var a, b;
	        if (point1.id === point1.parent.a.id) {
	          a = point1.parent.b;
	          b = point1.parent.a;
	        } else {
	          a = point1.parent.a;
	          b = point1.parent.b;
	        }
	        var d = math.distanceAB(a, b);
	        var k = 4 / 5;
	        b.x = a.x + (b.x - a.x) * k;
	        b.y = a.y + (b.y - a.y) * k;
	        return new _vector2.default(a.x - b.x, a.y - b.y, 0);
	      }
	
	      var v1 = shrink(point1);
	      var v2 = shrink(point2);
	
	      if (v1.cross(v2).z > 0) {
	        var _ = point1;
	        point1 = point2;
	        point2 = _;
	      }
	
	      var vec = new _vector2.default();
	      vec.setV(point2);
	      vec._minus(point1);
	      vec._multiply(0.5);
	      vec._plus(point1);
	
	      var arc = new _arc.Arc(new _point.EndPoint(point1.x, point1.y), new _point.EndPoint(point2.x, point2.y), new _point.EndPoint(vec.x, vec.y));
	      point1.parent.layer.add(arc);
	      var pm = this.viewer.parametricManager;
	      arc.stabilize(this.viewer);
	      pm._add(new _parametric.Constraints.Tangent(arc, point1.parent));
	      pm._add(new _parametric.Constraints.Tangent(arc, point2.parent));
	      pm._add(new _parametric.Constraints.Coincident(arc.a, point1));
	      pm._add(new _parametric.Constraints.Coincident(arc.b, point2));
	
	      //function otherEnd(point) {
	      //  if (point.parent.a.id === point.id) {
	      //    return point.parent.b;
	      //  } else {
	      //    return point.parent.a;
	      //  }
	      //}
	      //
	      //pm._add(new Constraints.LockConvex(arc.c, arc.a, otherEnd(point1)));
	      //pm._add(new Constraints.LockConvex(otherEnd(point2), arc.b, arc.c));
	
	      var solver = pm.solveWithLock([]);
	      //  var solver = pm.solveWithLock([point1._x, point1._y, point2._x, point2._y]);
	      pm.notify();
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      var candi = this.getCandidate(e);
	      if (candi == null) return;
	      var point1 = candi[0];
	      var point2 = candi[1];
	      this.breakLinkAndMakeFillet(point1, point2);
	    }
	  }, {
	    key: 'breakLinkAndMakeFillet',
	    value: function breakLinkAndMakeFillet(point1, point2) {
	      var pm = this.viewer.parametricManager;
	      var coi = pm.findCoincidentConstraint(point1, point2);
	      if (coi != null) {
	        pm.remove(coi);
	        this.makeFillet(point1, point2);
	        this.viewer.deselectAll();
	        return true;
	      }
	      return false;
	    }
	  }, {
	    key: 'getCandidate',
	    value: function getCandidate(e) {
	      var picked = this.viewer.pick(e);
	      if (picked.length > 0) {
	        var res = fetch.sketchObjects(picked, true, ['TCAD.TWO.EndPoint']);
	        if (res == null) return null;
	        var point1 = res[0];
	        if (!FilletTool.isLine(point1.parent)) return;
	        var line2 = null;
	        for (var i = 0; i < point1.linked.length; i++) {
	          var point2 = point1.linked[i];
	          if (FilletTool.isLine(point2.parent)) {
	            return [point1, point2];
	          }
	        }
	      }
	      return null;
	    }
	  }, {
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var needRefresh = false;
	      if (this.viewer.selected.length != 0) {
	        this.viewer.deselectAll();
	        needRefresh = true;
	      }
	      var candi = this.getCandidate(e);
	      if (candi != null) {
	        this.viewer.mark(candi[0], _styles.Styles.SNAP);
	        needRefresh = true;
	      }
	      if (needRefresh) {
	        this.viewer.refresh();
	      }
	    }
	  }], [{
	    key: 'isLine',
	    value: function isLine(line) {
	      return line != null && line._class === 'TCAD.TWO.Segment';
	    }
	  }]);

	  return FilletTool;
	}(_tool.Tool);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BezierCurveTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tool = __webpack_require__(101);
	
	var _point = __webpack_require__(102);
	
	var _bezierCurve = __webpack_require__(118);
	
	var _parametric = __webpack_require__(87);
	
	var _vector = __webpack_require__(8);
	
	var _vector2 = _interopRequireDefault(_vector);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BezierCurveTool = exports.BezierCurveTool = function (_Tool) {
	  _inherits(BezierCurveTool, _Tool);
	
	  function BezierCurveTool(viewer) {
	    _classCallCheck(this, BezierCurveTool);
	
	    var _this = _possibleConstructorReturn(this, (BezierCurveTool.__proto__ || Object.getPrototypeOf(BezierCurveTool)).call(this, 'bezier curve', viewer));
	
	    _this.init();
	    _this._v = new _vector2.default();
	    return _this;
	  }
	
	  _createClass(BezierCurveTool, [{
	    key: 'init',
	    value: function init() {
	      this.curve = null;
	      this.otherCurveEndPoint = null;
	    }
	  }, {
	    key: 'restart',
	    value: function restart() {
	      this.init();
	      this.sendHint('specify first point');
	    }
	  }, {
	    key: 'cleanup',
	    value: function cleanup(e) {
	      this.viewer.cleanSnap();
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      if (this.curve == null) {
	        this.checkIfConnectedToOtherCurve();
	        var p = this.endpoint(e);
	        this.curve = new _bezierCurve.BezierCurve(p, p.copy(), p.copy(), p.copy());
	        this.viewer.activeLayer.add(this.curve);
	        this.viewer.refresh();
	      } else {
	        this.snapIfNeed(this.curve.b);
	        if (this.otherCurveEndPoint != null) {
	          this.viewer.parametricManager.add(new _parametric.Constraints.Parallel(this.otherCurveEndPoint.parent, this.curve.a.parent));
	        }
	        this.viewer.toolManager.releaseControl();
	        this.viewer.refresh();
	      }
	    }
	  }, {
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      if (this.curve != null) {
	        this.curve.b.setFromPoint(p);
	        var axis = this._v.set(this.curve.b.x - this.curve.a.x, this.curve.b.y - this.curve.a.y)._multiply(0.7);
	        //controlSegment = {x: -controlSegment.y, y: controlSegment.x};
	        var controlSegment = math.rotate(-axis.y, axis.x, -Math.PI * 0.25);
	        if (this.otherCurveEndPoint != null) {
	          var ctrlLength = axis.length();
	          this.curve.cp1.x = this.curve.a.x + this.snappedControl.x * ctrlLength;
	          this.curve.cp1.y = this.curve.a.y + this.snappedControl.y * ctrlLength;
	          if (this.snappedControl.x * controlSegment.x + this.snappedControl.y * controlSegment.y < 0) {
	            controlSegment.x *= -1;
	            controlSegment.y *= -1;
	          }
	        } else {
	          this.curve.cp1.x = this.curve.a.x + controlSegment.x;
	          this.curve.cp1.y = this.curve.a.y + controlSegment.y;
	        }
	        this.curve.cp2.x = this.curve.b.x - controlSegment.x;
	        this.curve.cp2.y = this.curve.b.y - controlSegment.y;
	        this.viewer.snap(p.x, p.y, [this.curve.a, this.curve.b, this.curve.cp1, this.curve.cp2]);
	      } else {
	        this.viewer.snap(p.x, p.y, []);
	      }
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'checkIfConnectedToOtherCurve',
	    value: function checkIfConnectedToOtherCurve() {
	      var snapped = this.viewer.snapped;
	      if (snapped != null && snapped.parent && snapped.parent.parent && snapped.parent.parent instanceof _bezierCurve.BezierCurve && snapped.parent.a === snapped) {
	        //only a of Segment is a curve endpoint(other end is a control point) 
	        var seg = snapped.parent;
	        this.otherCurveEndPoint = snapped;
	        this.snappedControl = new _vector2.default(seg.b.x - seg.a.x, seg.b.y - seg.a.y)._normalize()._multiply(-1);
	      }
	    }
	  }]);

	  return BezierCurveTool;
	}(_tool.Tool);

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RectangleTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tool = __webpack_require__(101);
	
	var _math = __webpack_require__(9);
	
	var math = _interopRequireWildcard(_math);
	
	var _point = __webpack_require__(102);
	
	var _segment = __webpack_require__(113);
	
	var _parametric = __webpack_require__(87);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RectangleTool = exports.RectangleTool = function (_Tool) {
	  _inherits(RectangleTool, _Tool);
	
	  function RectangleTool(viewer) {
	    _classCallCheck(this, RectangleTool);
	
	    var _this = _possibleConstructorReturn(this, (RectangleTool.__proto__ || Object.getPrototypeOf(RectangleTool)).call(this, 'rectangle', viewer));
	
	    _this.rectangle = null;
	    _this.firstPointSnap = null;
	    _this.snapExclude = [];
	    return _this;
	  }
	
	  _createClass(RectangleTool, [{
	    key: 'restart',
	    value: function restart() {
	      this.sendMessage('specify first point');
	    }
	  }, {
	    key: 'cleanup',
	    value: function cleanup(e) {
	      this.viewer.cleanSnap();
	    }
	  }, {
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      if (this.rectangle != null) {
	        this.alignSegments(p);
	        this.viewer.snap(p.x, p.y, this.snapExclude);
	      } else {
	        this.viewer.snap(p.x, p.y, []);
	      }
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'mouseup',
	    value: function mouseup(e) {
	      if (this.rectangle == null) {
	        var p = void 0;
	        if (this.viewer.snapped != null) {
	          this.firstPointSnap = this.viewer.snapped;
	          p = this.firstPointSnap;
	          this.viewer.cleanSnap();
	        } else {
	          p = this.viewer.screenToModel(e);
	        }
	        this.createRectangle(p);
	      } else {
	        var _p = this.viewer.snapped;
	        if (this.viewer.snapped != null) {
	          _p = this.viewer.snapped;
	        } else {
	          _p = this.viewer.screenToModel(e);
	        }
	        this.alignSegments(_p);
	
	        if (this.viewer.snapped != null) {
	          this.viewer.parametricManager.linkObjects([this.rectangle[2].a, this.viewer.snapped]);
	        }
	        if (this.firstPointSnap != null) {
	          this.viewer.parametricManager.linkObjects([this.rectangle[0].a, this.firstPointSnap]);
	        }
	
	        this.viewer.cleanSnap();
	        this.stepFinish(_p);
	      }
	    }
	  }, {
	    key: 'createRectangle',
	    value: function createRectangle(v) {
	      var p = new _point.EndPoint(v.x, v.y);
	      //from top, clockwise
	      this.rectangle = [new _segment.Segment(p, p.copy()), new _segment.Segment(p.copy(), p.copy()), new _segment.Segment(p.copy(), p.copy()), new _segment.Segment(p.copy(), p.copy())];
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.rectangle[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var s = _step.value;
	
	          this.viewer.activeLayer.add(s);
	          this.snapExclude.push(s.a, s.b);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      this.pointPicked(p.x, p.y);
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'alignSegments',
	    value: function alignSegments(p) {
	      this.rectangle[0].b.x = p.x;
	      this.rectangle[1].a.x = p.x;
	      this.rectangle[1].b.setFromPoint(p);
	      this.rectangle[2].a.setFromPoint(p);
	      this.rectangle[2].b.y = p.y;
	      this.rectangle[3].a.y = p.y;
	    }
	  }, {
	    key: 'stepFinish',
	    value: function stepFinish(p) {
	      this.pointPicked(p.x, p.y);
	      var pm = this.viewer.parametricManager;
	      pm.linkObjects([this.rectangle[3].b, this.rectangle[0].a]);
	      pm.linkObjects([this.rectangle[0].b, this.rectangle[1].a]);
	      pm.linkObjects([this.rectangle[1].b, this.rectangle[2].a]);
	      pm.linkObjects([this.rectangle[2].b, this.rectangle[3].a]);
	      var constraints = [new _parametric.Constraints.Horizontal(this.rectangle[0]), new _parametric.Constraints.Horizontal(this.rectangle[2]), new _parametric.Constraints.Vertical(this.rectangle[3]), new _parametric.Constraints.Vertical(this.rectangle[1])];
	      pm.addAll(constraints);
	      this.viewer.refresh();
	      this.viewer.toolManager.releaseControl();
	    }
	  }, {
	    key: 'processCommand',
	    value: function processCommand(command) {
	      var result = _tool.Tool.ParseVector(this.viewer.referencePoint, command);
	      if (typeof result === 'string') return result;
	      if (this.rectangle == null) {
	        this.createRectangle(result);
	      } else {
	        this.alignSegments(result);
	        this.stepFinish(result);
	      }
	    }
	  }]);

	  return RectangleTool;
	}(_tool.Tool);

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ReferencePointTool = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _tool = __webpack_require__(101);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ReferencePointTool = exports.ReferencePointTool = function (_Tool) {
	  _inherits(ReferencePointTool, _Tool);
	
	  function ReferencePointTool(viewer) {
	    _classCallCheck(this, ReferencePointTool);
	
	    return _possibleConstructorReturn(this, (ReferencePointTool.__proto__ || Object.getPrototypeOf(ReferencePointTool)).call(this, 'origin', viewer));
	  }
	
	  _createClass(ReferencePointTool, [{
	    key: 'restart',
	    value: function restart() {
	      this.sendSpecifyPointHint();
	    }
	  }, {
	    key: 'cleanup',
	    value: function cleanup(e) {
	      this.viewer.cleanSnap();
	    }
	  }, {
	    key: 'mousemove',
	    value: function mousemove(e) {
	      var p = this.viewer.screenToModel(e);
	      this.viewer.snap(p.x, p.y, []);
	      this.viewer.refresh();
	    }
	  }, {
	    key: 'mousedown',
	    value: function mousedown(e) {
	      var needSnap = this.viewer.snapped != null;
	      var p = needSnap ? this.viewer.snapped : this.viewer.screenToModel(e);
	      this.viewer.referencePoint.x = p.x;
	      this.viewer.referencePoint.y = p.y;
	      this.pointPicked(p.x, p.y);
	      this.viewer.refresh();
	      this.viewer.toolManager.releaseControl();
	    }
	  }, {
	    key: 'processCommand',
	    value: function processCommand(command) {
	      var referencePoint = this.viewer.referencePoint;
	      var result = _tool.Tool.ParseVector(referencePoint, command);
	      if (typeof result === 'string') {
	        return result;
	      }
	      referencePoint.x += result.x;
	      referencePoint.y += result.y;
	      this.viewer.refresh();
	      this.viewer.toolManager.releaseControl();
	    }
	  }]);

	  return ReferencePointTool;
	}(_tool.Tool);

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.InputManager = InputManager;
	
	var _default = __webpack_require__(140);
	
	var _jwerty = __webpack_require__(74);
	
	function InputManager(app) {
	  var _this = this;
	
	  this.app = app;
	  this.keymap = _default.keymap;
	  $(function () {
	    $(document).on('keydown', function (e) {
	      return _this.handleKeyPress(e);
	    });
	  });
	}
	
	InputManager.prototype.handleKeyPress = function (e) {
	  var _this2 = this;
	
	  switch (e.keyCode) {}
	
	  var _loop = function _loop(action) {
	    if (_jwerty.jwerty.is(_this2.keymap[action], e)) {
	      setTimeout(function () {
	        return _this2.app.actions[action].action(e);
	      }, 0);
	      e.stopPropagation();
	      e.preventDefault();
	      return 'break';
	    }
	  };
	
	  for (var action in this.keymap) {
	    var _ret = _loop(action);
	
	    if (_ret === 'break') break;
	  }
	};

/***/ },
/* 140 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var keymap = exports.keymap = {
	  'save': 'ctrl+S',
	  'open': 'ctrl+O',
	  'new': 'ctrl+N',
	  'terminal': '`',
	  'info': 'F1'
	};

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(142);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(126)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(142, function() {
				var newContent = __webpack_require__(142);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(125)();
	// imports
	
	
	// module
	exports.push([module.id, "body {\n  font-family: sans-serif;\n  font-size: 11px;\n  overflow: hidden;\n}\nhtml,\nbody {\n  background: gray;\n  height: 100%;\n  padding: 0;\n  margin: 0;\n}\n.helvetica {\n  font-family: 'Helvetica Neue Light', HelveticaNeue-Light, 'Helvetica Neue', Helvetica, sans-serif;\n}\n.mono {\n  font-family: Monaco, monospace;\n}\n.sans-serif {\n  font-family: sans-serif;\n}\n.logo {\n  color: #bbb;\n  font-size: 16px;\n  padding: 8px 0 0 10px;\n  cursor: alias;\n}\n.logo sup {\n  font-size: 9px;\n  font-style: italic;\n}\n.panel {\n  background: #444;\n  border: 0px solid black;\n}\n.b-top {\n  border-top-width: 1px;\n}\n.b-bot {\n  border-bottom-width: 1px;\n}\n.b-left {\n  border-left-width: 1px;\n}\n.b-right {\n  border-right-width: 5px;\n  border-color: #222222;\n}\n.btn:hover {\n  background-color: #808080;\n  border-color: #ccc;\n}\n.btn {\n  border: 1px solid #808080;\n  background: #606060 no-repeat center;\n  border-radius: 4px;\n  color: white;\n  vertical-align: top;\n}\n#dock {\n  color: #fff;\n}\n.dock-btn {\n  padding: 1px 5px 1px 5px;\n  border: 0 solid black;\n  background: #606060 no-repeat center;\n  border-radius: 4px;\n  cursor: pointer;\n  margin: 1px 4px 1px 4px;\n}\n.dock-btn:hover {\n  background-color: #808080;\n}\n.dock-btn .txt {\n  padding-left: 5px;\n}\n.selected {\n  background-color: #333;\n  color: #ccc;\n}\n.sbtn {\n  min-width: 20px;\n  height: 20px;\n  line-height: 1.1;\n  border-color: #999;\n  padding: 1px 3px;\n  font-size: 14px;\n}\n.rbtn {\n  width: 37px;\n  height: 37px;\n  margin: 2px 6px;\n  font-size: 22px;\n  line-height: 1.1;\n}\n.tbtn {\n  width: 31px;\n  height: 31px;\n  margin: 2px 2px;\n  font-size: 20px;\n  padding: 0;\n}\n.tlist {\n  list-style-type: none;\n  padding: 0px;\n  margin: 0;\n  color: #fff;\n  font-size: 13px;\n}\n.tlist li {\n  border-bottom: 1px solid #777;\n  padding: 2px 3px 2px  15px;\n  cursor: pointer;\n}\n.tlist li:hover {\n  background: #222;\n}\n.tool-caption {\n  font-weight: bold;\n  color: #fff;\n  padding: 2px 0 2px 3px;\n  background: #333;\n}\n.no-top-border {\n  border-top: 0;\n}\n.tool-caption .btn {\n  width: 14px;\n  height: 14px;\n  font-size: 10px;\n  line-height: 11px;\n  margin-top: -1px;\n}\n.tool-caption .fa {\n  font-size: 11px;\n}\n.tool-caption .txt {\n  padding-right: 3px;\n}\n.tlist .btn {\n  font-size: 11px;\n  border: 0;\n}\n.tlist .rm {\n  visibility: hidden;\n  padding: 0 5px 0 5px;\n}\n.tlist li:hover .rm {\n  visibility: visible;\n}\n.scroll {\n  overflow-y: auto;\n  overflow-x: hidden;\n}\n.scroll::-webkit-scrollbar {\n  width: 4px;\n}\n.scroll::-webkit-scrollbar-track {\n  background: white;\n}\n.scroll::-webkit-scrollbar-thumb {\n  background: steelblue;\n}\n.scroll::-webkit-scrollbar-thumb:hover {\n  background: royalblue;\n}\n.win {\n  position: absolute;\n  min-width: 100px;\n  min-height: 20px;\n  left: 100px;\n  top: 300px;\n  background: #666;\n  border: 5px solid #444444;\n  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);\n}\n.win .content {\n  font-family: sans-serif;\n  color: #fff;\n  padding: 7px;\n  height: calc(100% - 19px);\n}\n.win .tool-caption {\n  cursor: default;\n  height: 15px;\n}\n.win .tool-caption .rm {\n  border: 0;\n  border-radius: 0px;\n  color: white;\n  font-size: 16px;\n  height: 17px;\n  padding-left: 5px;\n}\n.sep {\n  margin-right: 13px;\n}\n.pseudo-btn:hover {\n  background-color: #808080;\n}\n.pseudo-btn {\n  background-color: #606060;\n  color: white;\n  width: 18px;\n  text-align: center;\n  cursor: pointer;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n.pseudo-btn a {\n  color: white;\n  text-decoration: none;\n}\n#layerSelection label {\n  color: #fff;\n}\n#layersList {\n  background-color: #ddd;\n  margin: 10px;\n}\n.tc-ctrl {\n  border-left: 0;\n}\n.tc-ctrl input[type=text],\n.tc-ctrl select {\n  color: #fff;\n}\n#commands {\n  font-family: Monaco, monospace;\n}\n#commands .content {\n  color: #C4E1A4;\n  font-size: 11px;\n}\n.terminal-output-area {\n  height: calc(100% - 30px);\n  display: flex;\n  flex-direction: column;\n}\n.terminal-output {\n  flex: 1;\n}\n.terminal-pusher {\n  height: 100%;\n}\n.terminal-input {\n  height: 30px;\n}\n.terminal-input input {\n  color: #C4E1A4;\n  background: inherit;\n  outline: none;\n  border: 0;\n  margin-top: 4px;\n  padding: 3px;\n  width: 100%;\n  box-sizing: border-box;\n  padding-left: 0;\n}\n.terminal-input input::-webkit-input-placeholder {\n  color: #777777;\n  font-style: italic;\n}\n.terminal-commandText {\n  color: #777777;\n}\n.autocomplete-area {\n  font-style: italic;\n}\ninput[type=checkbox],\ninput[type=radio] {\n  vertical-align: middle;\n}\n#status {\n  font-family: 'Helvetica Neue Light', HelveticaNeue-Light, 'Helvetica Neue', Helvetica, sans-serif;\n  color: #fff;\n  font-size: 11px;\n  padding-top: 4px;\n}\n#status .coordinates-info {\n  font-style: italic;\n  color: #fff;\n}\n.status-item {\n  padding-right: 5px;\n  padding-left: 5px;\n  float: right;\n  color: #bbb;\n}\n#viewer-container .tool-hint {\n  font-family: 'Helvetica Neue Light', HelveticaNeue-Light, 'Helvetica Neue', Helvetica, sans-serif;\n  color: #000;\n  font-size: 11px;\n  cursor: default;\n  pointer-events: none;\n}\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=sketcher.bundle.js.map