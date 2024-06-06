"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // ../node_modules/@babel/runtime/helpers/interopRequireDefault.js
  var require_interopRequireDefault = __commonJS({
    "../node_modules/@babel/runtime/helpers/interopRequireDefault.js"(exports, module) {
      function _interopRequireDefault2(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      module.exports = _interopRequireDefault2, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/arrayWithHoles.js
  var require_arrayWithHoles = __commonJS({
    "../node_modules/@babel/runtime/helpers/arrayWithHoles.js"(exports, module) {
      function _arrayWithHoles(arr) {
        if (Array.isArray(arr))
          return arr;
      }
      module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js
  var require_iterableToArrayLimit = __commonJS({
    "../node_modules/@babel/runtime/helpers/iterableToArrayLimit.js"(exports, module) {
      function _iterableToArrayLimit(r, l) {
        var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
        if (null != t) {
          var e, n, i, u, a = [], f = true, o = false;
          try {
            if (i = (t = t.call(r)).next, 0 === l) {
              if (Object(t) !== t)
                return;
              f = false;
            } else
              for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
                ;
          } catch (r2) {
            o = true, n = r2;
          } finally {
            try {
              if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
                return;
            } finally {
              if (o)
                throw n;
            }
          }
          return a;
        }
      }
      module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/arrayLikeToArray.js
  var require_arrayLikeToArray = __commonJS({
    "../node_modules/@babel/runtime/helpers/arrayLikeToArray.js"(exports, module) {
      function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length)
          len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++)
          arr2[i] = arr[i];
        return arr2;
      }
      module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js
  var require_unsupportedIterableToArray = __commonJS({
    "../node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js"(exports, module) {
      var arrayLikeToArray = require_arrayLikeToArray();
      function _unsupportedIterableToArray(o, minLen) {
        if (!o)
          return;
        if (typeof o === "string")
          return arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor)
          n = o.constructor.name;
        if (n === "Map" || n === "Set")
          return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
          return arrayLikeToArray(o, minLen);
      }
      module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/nonIterableRest.js
  var require_nonIterableRest = __commonJS({
    "../node_modules/@babel/runtime/helpers/nonIterableRest.js"(exports, module) {
      function _nonIterableRest() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/slicedToArray.js
  var require_slicedToArray = __commonJS({
    "../node_modules/@babel/runtime/helpers/slicedToArray.js"(exports, module) {
      var arrayWithHoles = require_arrayWithHoles();
      var iterableToArrayLimit = require_iterableToArrayLimit();
      var unsupportedIterableToArray = require_unsupportedIterableToArray();
      var nonIterableRest = require_nonIterableRest();
      function _slicedToArray(arr, i) {
        return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
      }
      module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js
  var require_arrayWithoutHoles = __commonJS({
    "../node_modules/@babel/runtime/helpers/arrayWithoutHoles.js"(exports, module) {
      var arrayLikeToArray = require_arrayLikeToArray();
      function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr))
          return arrayLikeToArray(arr);
      }
      module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/iterableToArray.js
  var require_iterableToArray = __commonJS({
    "../node_modules/@babel/runtime/helpers/iterableToArray.js"(exports, module) {
      function _iterableToArray(iter) {
        if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
          return Array.from(iter);
      }
      module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/nonIterableSpread.js
  var require_nonIterableSpread = __commonJS({
    "../node_modules/@babel/runtime/helpers/nonIterableSpread.js"(exports, module) {
      function _nonIterableSpread() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // ../node_modules/@babel/runtime/helpers/toConsumableArray.js
  var require_toConsumableArray = __commonJS({
    "../node_modules/@babel/runtime/helpers/toConsumableArray.js"(exports, module) {
      var arrayWithoutHoles = require_arrayWithoutHoles();
      var iterableToArray = require_iterableToArray();
      var unsupportedIterableToArray = require_unsupportedIterableToArray();
      var nonIterableSpread = require_nonIterableSpread();
      function _toConsumableArray(arr) {
        return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
      }
      module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }
  });

  // build/index.babel.js
  var _interopRequireDefault = require_interopRequireDefault();
  var _slicedToArray2 = _interopRequireDefault(require_slicedToArray());
  var _toConsumableArray2 = _interopRequireDefault(require_toConsumableArray());
  (function() {
    var __create = Object.create;
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __getProtoOf = Object.getPrototypeOf;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __esm = function __esm2(fn, res) {
      return function __init() {
        return fn && (res = (0, fn[__getOwnPropNames2(fn)[0]])(fn = 0)), res;
      };
    };
    var __commonJS2 = function __commonJS3(cb2, mod) {
      return function __require() {
        return mod || (0, cb2[__getOwnPropNames2(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
    };
    var __export = function __export2(target, all) {
      for (var name in all)
        __defProp(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps = function __copyProps2(to, from, except, desc) {
      if (from && typeof from === "object" || typeof from === "function") {
        var _loop = function _loop2(key2) {
          if (!__hasOwnProp.call(to, key2) && key2 !== except)
            __defProp(to, key2, { get: function get() {
              return from[key2];
            }, enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
        };
        for (var key of __getOwnPropNames2(from)) {
          _loop(key);
        }
      }
      return to;
    };
    var __toESM = function __toESM2(mod, isNodeMode, target) {
      return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod);
    };
    var __toCommonJS = function __toCommonJS2(mod) {
      return __copyProps(__defProp({}, "__esModule", { value: true }), mod);
    };
    var _VERSION, root, ArrayProto, ObjProto, SymbolProto, push, slice, toString, hasOwnProperty, supportsArrayBuffer, supportsDataView, nativeIsArray, nativeKeys, nativeCreate, nativeIsView, _isNaN, _isFinite, hasEnumBug, nonEnumerableProps, MAX_ARRAY_INDEX;
    var init_setup = __esm({ "node_modules/underscore/modules/_setup.js": function node_modulesUnderscoreModules_setupJs() {
      _VERSION = "1.13.6";
      root = typeof self == "object" && self.self === self && self || typeof global == "object" && global.global === global && global || Function("return this")() || {};
      ArrayProto = Array.prototype;
      ObjProto = Object.prototype;
      SymbolProto = typeof Symbol !== "undefined" ? Symbol.prototype : null;
      push = ArrayProto.push;
      slice = ArrayProto.slice;
      toString = ObjProto.toString;
      hasOwnProperty = ObjProto.hasOwnProperty;
      supportsArrayBuffer = typeof ArrayBuffer !== "undefined";
      supportsDataView = typeof DataView !== "undefined";
      nativeIsArray = Array.isArray;
      nativeKeys = Object.keys;
      nativeCreate = Object.create;
      nativeIsView = supportsArrayBuffer && ArrayBuffer.isView;
      _isNaN = isNaN;
      _isFinite = isFinite;
      hasEnumBug = !{ toString: null }.propertyIsEnumerable("toString");
      nonEnumerableProps = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
      MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    } });
    function _restArguments(func, startIndex) {
      startIndex = startIndex == null ? func.length - 1 : +startIndex;
      return function() {
        var length = Math.max(arguments.length - startIndex, 0), rest2 = Array(length), index = 0;
        for (; index < length; index++) {
          rest2[index] = arguments[index + startIndex];
        }
        switch (startIndex) {
          case 0:
            return func.call(this, rest2);
          case 1:
            return func.call(this, arguments[0], rest2);
          case 2:
            return func.call(this, arguments[0], arguments[1], rest2);
        }
        var args = Array(startIndex + 1);
        for (index = 0; index < startIndex; index++) {
          args[index] = arguments[index];
        }
        args[startIndex] = rest2;
        return func.apply(this, args);
      };
    }
    var init_restArguments = __esm({ "node_modules/underscore/modules/restArguments.js": function node_modulesUnderscoreModulesRestArgumentsJs() {
    } });
    function _isObject(obj) {
      var type = typeof obj;
      return type === "function" || type === "object" && !!obj;
    }
    var init_isObject = __esm({ "node_modules/underscore/modules/isObject.js": function node_modulesUnderscoreModulesIsObjectJs() {
    } });
    function _isNull(obj) {
      return obj === null;
    }
    var init_isNull = __esm({ "node_modules/underscore/modules/isNull.js": function node_modulesUnderscoreModulesIsNullJs() {
    } });
    function _isUndefined(obj) {
      return obj === void 0;
    }
    var init_isUndefined = __esm({ "node_modules/underscore/modules/isUndefined.js": function node_modulesUnderscoreModulesIsUndefinedJs() {
    } });
    function _isBoolean(obj) {
      return obj === true || obj === false || toString.call(obj) === "[object Boolean]";
    }
    var init_isBoolean = __esm({ "node_modules/underscore/modules/isBoolean.js": function node_modulesUnderscoreModulesIsBooleanJs() {
      init_setup();
    } });
    function _isElement(obj) {
      return !!(obj && obj.nodeType === 1);
    }
    var init_isElement = __esm({ "node_modules/underscore/modules/isElement.js": function node_modulesUnderscoreModulesIsElementJs() {
    } });
    function tagTester(name) {
      var tag = "[object " + name + "]";
      return function(obj) {
        return toString.call(obj) === tag;
      };
    }
    var init_tagTester = __esm({ "node_modules/underscore/modules/_tagTester.js": function node_modulesUnderscoreModules_tagTesterJs() {
      init_setup();
    } });
    var isString_default;
    var init_isString = __esm({ "node_modules/underscore/modules/isString.js": function node_modulesUnderscoreModulesIsStringJs() {
      init_tagTester();
      isString_default = tagTester("String");
    } });
    var isNumber_default;
    var init_isNumber = __esm({ "node_modules/underscore/modules/isNumber.js": function node_modulesUnderscoreModulesIsNumberJs() {
      init_tagTester();
      isNumber_default = tagTester("Number");
    } });
    var isDate_default;
    var init_isDate = __esm({ "node_modules/underscore/modules/isDate.js": function node_modulesUnderscoreModulesIsDateJs() {
      init_tagTester();
      isDate_default = tagTester("Date");
    } });
    var isRegExp_default;
    var init_isRegExp = __esm({ "node_modules/underscore/modules/isRegExp.js": function node_modulesUnderscoreModulesIsRegExpJs() {
      init_tagTester();
      isRegExp_default = tagTester("RegExp");
    } });
    var isError_default;
    var init_isError = __esm({ "node_modules/underscore/modules/isError.js": function node_modulesUnderscoreModulesIsErrorJs() {
      init_tagTester();
      isError_default = tagTester("Error");
    } });
    var isSymbol_default;
    var init_isSymbol = __esm({ "node_modules/underscore/modules/isSymbol.js": function node_modulesUnderscoreModulesIsSymbolJs() {
      init_tagTester();
      isSymbol_default = tagTester("Symbol");
    } });
    var isArrayBuffer_default;
    var init_isArrayBuffer = __esm({ "node_modules/underscore/modules/isArrayBuffer.js": function node_modulesUnderscoreModulesIsArrayBufferJs() {
      init_tagTester();
      isArrayBuffer_default = tagTester("ArrayBuffer");
    } });
    var isFunction, nodelist, isFunction_default;
    var init_isFunction = __esm({ "node_modules/underscore/modules/isFunction.js": function node_modulesUnderscoreModulesIsFunctionJs() {
      init_tagTester();
      init_setup();
      isFunction = tagTester("Function");
      nodelist = root.document && root.document.childNodes;
      if (typeof /./ != "function" && typeof Int8Array != "object" && typeof nodelist != "function") {
        isFunction = function isFunction2(obj) {
          return typeof obj == "function" || false;
        };
      }
      isFunction_default = isFunction;
    } });
    var hasObjectTag_default;
    var init_hasObjectTag = __esm({ "node_modules/underscore/modules/_hasObjectTag.js": function node_modulesUnderscoreModules_hasObjectTagJs() {
      init_tagTester();
      hasObjectTag_default = tagTester("Object");
    } });
    var hasStringTagBug, isIE11;
    var init_stringTagBug = __esm({ "node_modules/underscore/modules/_stringTagBug.js": function node_modulesUnderscoreModules_stringTagBugJs() {
      init_setup();
      init_hasObjectTag();
      hasStringTagBug = supportsDataView && hasObjectTag_default(new DataView(new ArrayBuffer(8)));
      isIE11 = typeof Map !== "undefined" && hasObjectTag_default(/* @__PURE__ */ new Map());
    } });
    function ie10IsDataView(obj) {
      return obj != null && isFunction_default(obj.getInt8) && isArrayBuffer_default(obj.buffer);
    }
    var isDataView, isDataView_default;
    var init_isDataView = __esm({ "node_modules/underscore/modules/isDataView.js": function node_modulesUnderscoreModulesIsDataViewJs() {
      init_tagTester();
      init_isFunction();
      init_isArrayBuffer();
      init_stringTagBug();
      isDataView = tagTester("DataView");
      isDataView_default = hasStringTagBug ? ie10IsDataView : isDataView;
    } });
    var isArray_default;
    var init_isArray = __esm({ "node_modules/underscore/modules/isArray.js": function node_modulesUnderscoreModulesIsArrayJs() {
      init_setup();
      init_tagTester();
      isArray_default = nativeIsArray || tagTester("Array");
    } });
    function has(obj, key) {
      return obj != null && hasOwnProperty.call(obj, key);
    }
    var init_has = __esm({ "node_modules/underscore/modules/_has.js": function node_modulesUnderscoreModules_hasJs() {
      init_setup();
    } });
    var isArguments, isArguments_default;
    var init_isArguments = __esm({ "node_modules/underscore/modules/isArguments.js": function node_modulesUnderscoreModulesIsArgumentsJs() {
      init_tagTester();
      init_has();
      isArguments = tagTester("Arguments");
      (function() {
        if (!isArguments(arguments)) {
          isArguments = function isArguments2(obj) {
            return has(obj, "callee");
          };
        }
      })();
      isArguments_default = isArguments;
    } });
    function isFinite2(obj) {
      return !isSymbol_default(obj) && _isFinite(obj) && !isNaN(parseFloat(obj));
    }
    var init_isFinite = __esm({ "node_modules/underscore/modules/isFinite.js": function node_modulesUnderscoreModulesIsFiniteJs() {
      init_setup();
      init_isSymbol();
    } });
    function isNaN2(obj) {
      return isNumber_default(obj) && _isNaN(obj);
    }
    var init_isNaN = __esm({ "node_modules/underscore/modules/isNaN.js": function node_modulesUnderscoreModulesIsNaNJs() {
      init_setup();
      init_isNumber();
    } });
    function _constant(value) {
      return function() {
        return value;
      };
    }
    var init_constant = __esm({ "node_modules/underscore/modules/constant.js": function node_modulesUnderscoreModulesConstantJs() {
    } });
    function createSizePropertyCheck(getSizeProperty) {
      return function(collection) {
        var sizeProperty = getSizeProperty(collection);
        return typeof sizeProperty == "number" && sizeProperty >= 0 && sizeProperty <= MAX_ARRAY_INDEX;
      };
    }
    var init_createSizePropertyCheck = __esm({ "node_modules/underscore/modules/_createSizePropertyCheck.js": function node_modulesUnderscoreModules_createSizePropertyCheckJs() {
      init_setup();
    } });
    function shallowProperty(key) {
      return function(obj) {
        return obj == null ? void 0 : obj[key];
      };
    }
    var init_shallowProperty = __esm({ "node_modules/underscore/modules/_shallowProperty.js": function node_modulesUnderscoreModules_shallowPropertyJs() {
    } });
    var getByteLength_default;
    var init_getByteLength = __esm({ "node_modules/underscore/modules/_getByteLength.js": function node_modulesUnderscoreModules_getByteLengthJs() {
      init_shallowProperty();
      getByteLength_default = shallowProperty("byteLength");
    } });
    var isBufferLike_default;
    var init_isBufferLike = __esm({ "node_modules/underscore/modules/_isBufferLike.js": function node_modulesUnderscoreModules_isBufferLikeJs() {
      init_createSizePropertyCheck();
      init_getByteLength();
      isBufferLike_default = createSizePropertyCheck(getByteLength_default);
    } });
    function isTypedArray(obj) {
      return nativeIsView ? nativeIsView(obj) && !isDataView_default(obj) : isBufferLike_default(obj) && typedArrayPattern.test(toString.call(obj));
    }
    var typedArrayPattern, isTypedArray_default;
    var init_isTypedArray = __esm({ "node_modules/underscore/modules/isTypedArray.js": function node_modulesUnderscoreModulesIsTypedArrayJs() {
      init_setup();
      init_isDataView();
      init_constant();
      init_isBufferLike();
      typedArrayPattern = /\[object ((I|Ui)nt(8|16|32)|Float(32|64)|Uint8Clamped|Big(I|Ui)nt64)Array\]/;
      isTypedArray_default = supportsArrayBuffer ? isTypedArray : _constant(false);
    } });
    var getLength_default;
    var init_getLength = __esm({ "node_modules/underscore/modules/_getLength.js": function node_modulesUnderscoreModules_getLengthJs() {
      init_shallowProperty();
      getLength_default = shallowProperty("length");
    } });
    function emulatedSet(keys2) {
      var hash = {};
      for (var l = keys2.length, i = 0; i < l; ++i)
        hash[keys2[i]] = true;
      return { contains: function contains(key) {
        return hash[key] === true;
      }, push: function push2(key) {
        hash[key] = true;
        return keys2.push(key);
      } };
    }
    function collectNonEnumProps(obj, keys2) {
      keys2 = emulatedSet(keys2);
      var nonEnumIdx = nonEnumerableProps.length;
      var constructor = obj.constructor;
      var proto = isFunction_default(constructor) && constructor.prototype || ObjProto;
      var prop = "constructor";
      if (has(obj, prop) && !keys2.contains(prop))
        keys2.push(prop);
      while (nonEnumIdx--) {
        prop = nonEnumerableProps[nonEnumIdx];
        if (prop in obj && obj[prop] !== proto[prop] && !keys2.contains(prop)) {
          keys2.push(prop);
        }
      }
    }
    var init_collectNonEnumProps = __esm({ "node_modules/underscore/modules/_collectNonEnumProps.js": function node_modulesUnderscoreModules_collectNonEnumPropsJs() {
      init_setup();
      init_isFunction();
      init_has();
    } });
    function _keys2(obj) {
      if (!_isObject(obj))
        return [];
      if (nativeKeys)
        return nativeKeys(obj);
      var keys2 = [];
      for (var key in obj)
        if (has(obj, key))
          keys2.push(key);
      if (hasEnumBug)
        collectNonEnumProps(obj, keys2);
      return keys2;
    }
    var init_keys = __esm({ "node_modules/underscore/modules/keys.js": function node_modulesUnderscoreModulesKeysJs() {
      init_isObject();
      init_setup();
      init_has();
      init_collectNonEnumProps();
    } });
    function _isEmpty(obj) {
      if (obj == null)
        return true;
      var length = getLength_default(obj);
      if (typeof length == "number" && (isArray_default(obj) || isString_default(obj) || isArguments_default(obj)))
        return length === 0;
      return getLength_default(_keys2(obj)) === 0;
    }
    var init_isEmpty = __esm({ "node_modules/underscore/modules/isEmpty.js": function node_modulesUnderscoreModulesIsEmptyJs() {
      init_getLength();
      init_isArray();
      init_isString();
      init_isArguments();
      init_keys();
    } });
    function _isMatch(object2, attrs) {
      var _keys = _keys2(attrs), length = _keys.length;
      if (object2 == null)
        return !length;
      var obj = Object(object2);
      for (var i = 0; i < length; i++) {
        var key = _keys[i];
        if (attrs[key] !== obj[key] || !(key in obj))
          return false;
      }
      return true;
    }
    var init_isMatch = __esm({ "node_modules/underscore/modules/isMatch.js": function node_modulesUnderscoreModulesIsMatchJs() {
      init_keys();
    } });
    function _(obj) {
      if (obj instanceof _)
        return obj;
      if (!(this instanceof _))
        return new _(obj);
      this._wrapped = obj;
    }
    var init_underscore = __esm({ "node_modules/underscore/modules/underscore.js": function node_modulesUnderscoreModulesUnderscoreJs() {
      init_setup();
      _.VERSION = _VERSION;
      _.prototype.value = function() {
        return this._wrapped;
      };
      _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
      _.prototype.toString = function() {
        return String(this._wrapped);
      };
    } });
    function toBufferView(bufferSource) {
      return new Uint8Array(bufferSource.buffer || bufferSource, bufferSource.byteOffset || 0, getByteLength_default(bufferSource));
    }
    var init_toBufferView = __esm({ "node_modules/underscore/modules/_toBufferView.js": function node_modulesUnderscoreModules_toBufferViewJs() {
      init_getByteLength();
    } });
    function eq(a, b, aStack, bStack) {
      if (a === b)
        return a !== 0 || 1 / a === 1 / b;
      if (a == null || b == null)
        return false;
      if (a !== a)
        return b !== b;
      var type = typeof a;
      if (type !== "function" && type !== "object" && typeof b != "object")
        return false;
      return deepEq(a, b, aStack, bStack);
    }
    function deepEq(a, b, aStack, bStack) {
      if (a instanceof _)
        a = a._wrapped;
      if (b instanceof _)
        b = b._wrapped;
      var className = toString.call(a);
      if (className !== toString.call(b))
        return false;
      if (hasStringTagBug && className == "[object Object]" && isDataView_default(a)) {
        if (!isDataView_default(b))
          return false;
        className = tagDataView;
      }
      switch (className) {
        case "[object RegExp]":
        case "[object String]":
          return "" + a === "" + b;
        case "[object Number]":
          if (+a !== +a)
            return +b !== +b;
          return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
          return +a === +b;
        case "[object Symbol]":
          return SymbolProto.valueOf.call(a) === SymbolProto.valueOf.call(b);
        case "[object ArrayBuffer]":
        case tagDataView:
          return deepEq(toBufferView(a), toBufferView(b), aStack, bStack);
      }
      var areArrays = className === "[object Array]";
      if (!areArrays && isTypedArray_default(a)) {
        var byteLength = getByteLength_default(a);
        if (byteLength !== getByteLength_default(b))
          return false;
        if (a.buffer === b.buffer && a.byteOffset === b.byteOffset)
          return true;
        areArrays = true;
      }
      if (!areArrays) {
        if (typeof a != "object" || typeof b != "object")
          return false;
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(isFunction_default(aCtor) && aCtor instanceof aCtor && isFunction_default(bCtor) && bCtor instanceof bCtor) && "constructor" in a && "constructor" in b) {
          return false;
        }
      }
      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;
      while (length--) {
        if (aStack[length] === a)
          return bStack[length] === b;
      }
      aStack.push(a);
      bStack.push(b);
      if (areArrays) {
        length = a.length;
        if (length !== b.length)
          return false;
        while (length--) {
          if (!eq(a[length], b[length], aStack, bStack))
            return false;
        }
      } else {
        var _keys = _keys2(a), key;
        length = _keys.length;
        if (_keys2(b).length !== length)
          return false;
        while (length--) {
          key = _keys[length];
          if (!(has(b, key) && eq(a[key], b[key], aStack, bStack)))
            return false;
        }
      }
      aStack.pop();
      bStack.pop();
      return true;
    }
    function _isEqual(a, b) {
      return eq(a, b);
    }
    var tagDataView;
    var init_isEqual = __esm({ "node_modules/underscore/modules/isEqual.js": function node_modulesUnderscoreModulesIsEqualJs() {
      init_underscore();
      init_setup();
      init_getByteLength();
      init_isTypedArray();
      init_isFunction();
      init_stringTagBug();
      init_isDataView();
      init_keys();
      init_has();
      init_toBufferView();
      tagDataView = "[object DataView]";
    } });
    function _allKeys(obj) {
      if (!_isObject(obj))
        return [];
      var keys2 = [];
      for (var key in obj)
        keys2.push(key);
      if (hasEnumBug)
        collectNonEnumProps(obj, keys2);
      return keys2;
    }
    var init_allKeys = __esm({ "node_modules/underscore/modules/allKeys.js": function node_modulesUnderscoreModulesAllKeysJs() {
      init_isObject();
      init_setup();
      init_collectNonEnumProps();
    } });
    function ie11fingerprint(methods) {
      var length = getLength_default(methods);
      return function(obj) {
        if (obj == null)
          return false;
        var keys2 = _allKeys(obj);
        if (getLength_default(keys2))
          return false;
        for (var i = 0; i < length; i++) {
          if (!isFunction_default(obj[methods[i]]))
            return false;
        }
        return methods !== weakMapMethods || !isFunction_default(obj[forEachName]);
      };
    }
    var forEachName, hasName, commonInit, mapTail, mapMethods, weakMapMethods, setMethods;
    var init_methodFingerprint = __esm({ "node_modules/underscore/modules/_methodFingerprint.js": function node_modulesUnderscoreModules_methodFingerprintJs() {
      init_getLength();
      init_isFunction();
      init_allKeys();
      forEachName = "forEach";
      hasName = "has";
      commonInit = ["clear", "delete"];
      mapTail = ["get", hasName, "set"];
      mapMethods = commonInit.concat(forEachName, mapTail);
      weakMapMethods = commonInit.concat(mapTail);
      setMethods = ["add"].concat(commonInit, forEachName, hasName);
    } });
    var isMap_default;
    var init_isMap = __esm({ "node_modules/underscore/modules/isMap.js": function node_modulesUnderscoreModulesIsMapJs() {
      init_tagTester();
      init_stringTagBug();
      init_methodFingerprint();
      isMap_default = isIE11 ? ie11fingerprint(mapMethods) : tagTester("Map");
    } });
    var isWeakMap_default;
    var init_isWeakMap = __esm({ "node_modules/underscore/modules/isWeakMap.js": function node_modulesUnderscoreModulesIsWeakMapJs() {
      init_tagTester();
      init_stringTagBug();
      init_methodFingerprint();
      isWeakMap_default = isIE11 ? ie11fingerprint(weakMapMethods) : tagTester("WeakMap");
    } });
    var isSet_default;
    var init_isSet = __esm({ "node_modules/underscore/modules/isSet.js": function node_modulesUnderscoreModulesIsSetJs() {
      init_tagTester();
      init_stringTagBug();
      init_methodFingerprint();
      isSet_default = isIE11 ? ie11fingerprint(setMethods) : tagTester("Set");
    } });
    var isWeakSet_default;
    var init_isWeakSet = __esm({ "node_modules/underscore/modules/isWeakSet.js": function node_modulesUnderscoreModulesIsWeakSetJs() {
      init_tagTester();
      isWeakSet_default = tagTester("WeakSet");
    } });
    function _values(obj) {
      var _keys = _keys2(obj);
      var length = _keys.length;
      var values2 = Array(length);
      for (var i = 0; i < length; i++) {
        values2[i] = obj[_keys[i]];
      }
      return values2;
    }
    var init_values = __esm({ "node_modules/underscore/modules/values.js": function node_modulesUnderscoreModulesValuesJs() {
      init_keys();
    } });
    function _pairs(obj) {
      var _keys = _keys2(obj);
      var length = _keys.length;
      var pairs2 = Array(length);
      for (var i = 0; i < length; i++) {
        pairs2[i] = [_keys[i], obj[_keys[i]]];
      }
      return pairs2;
    }
    var init_pairs = __esm({ "node_modules/underscore/modules/pairs.js": function node_modulesUnderscoreModulesPairsJs() {
      init_keys();
    } });
    function _invert(obj) {
      var result2 = {};
      var _keys = _keys2(obj);
      for (var i = 0, length = _keys.length; i < length; i++) {
        result2[obj[_keys[i]]] = _keys[i];
      }
      return result2;
    }
    var init_invert = __esm({ "node_modules/underscore/modules/invert.js": function node_modulesUnderscoreModulesInvertJs() {
      init_keys();
    } });
    function _functions(obj) {
      var names = [];
      for (var key in obj) {
        if (isFunction_default(obj[key]))
          names.push(key);
      }
      return names.sort();
    }
    var init_functions = __esm({ "node_modules/underscore/modules/functions.js": function node_modulesUnderscoreModulesFunctionsJs() {
      init_isFunction();
    } });
    function createAssigner(keysFunc, defaults) {
      return function(obj) {
        var length = arguments.length;
        if (defaults)
          obj = Object(obj);
        if (length < 2 || obj == null)
          return obj;
        for (var index = 1; index < length; index++) {
          var source = arguments[index], keys2 = keysFunc(source), l = keys2.length;
          for (var i = 0; i < l; i++) {
            var key = keys2[i];
            if (!defaults || obj[key] === void 0)
              obj[key] = source[key];
          }
        }
        return obj;
      };
    }
    var init_createAssigner = __esm({ "node_modules/underscore/modules/_createAssigner.js": function node_modulesUnderscoreModules_createAssignerJs() {
    } });
    var extend_default;
    var init_extend = __esm({ "node_modules/underscore/modules/extend.js": function node_modulesUnderscoreModulesExtendJs() {
      init_createAssigner();
      init_allKeys();
      extend_default = createAssigner(_allKeys);
    } });
    var extendOwn_default;
    var init_extendOwn = __esm({ "node_modules/underscore/modules/extendOwn.js": function node_modulesUnderscoreModulesExtendOwnJs() {
      init_createAssigner();
      init_keys();
      extendOwn_default = createAssigner(_keys2);
    } });
    var defaults_default;
    var init_defaults = __esm({ "node_modules/underscore/modules/defaults.js": function node_modulesUnderscoreModulesDefaultsJs() {
      init_createAssigner();
      init_allKeys();
      defaults_default = createAssigner(_allKeys, true);
    } });
    function ctor() {
      return function() {
      };
    }
    function baseCreate(prototype) {
      if (!_isObject(prototype))
        return {};
      if (nativeCreate)
        return nativeCreate(prototype);
      var Ctor = ctor();
      Ctor.prototype = prototype;
      var result2 = new Ctor();
      Ctor.prototype = null;
      return result2;
    }
    var init_baseCreate = __esm({ "node_modules/underscore/modules/_baseCreate.js": function node_modulesUnderscoreModules_baseCreateJs() {
      init_isObject();
      init_setup();
    } });
    function _create(prototype, props) {
      var result2 = baseCreate(prototype);
      if (props)
        extendOwn_default(result2, props);
      return result2;
    }
    var init_create = __esm({ "node_modules/underscore/modules/create.js": function node_modulesUnderscoreModulesCreateJs() {
      init_baseCreate();
      init_extendOwn();
    } });
    function _clone(obj) {
      if (!_isObject(obj))
        return obj;
      return isArray_default(obj) ? obj.slice() : extend_default({}, obj);
    }
    var init_clone = __esm({ "node_modules/underscore/modules/clone.js": function node_modulesUnderscoreModulesCloneJs() {
      init_isObject();
      init_isArray();
      init_extend();
    } });
    function _tap(obj, interceptor) {
      interceptor(obj);
      return obj;
    }
    var init_tap = __esm({ "node_modules/underscore/modules/tap.js": function node_modulesUnderscoreModulesTapJs() {
    } });
    function _toPath(path) {
      return isArray_default(path) ? path : [path];
    }
    var init_toPath = __esm({ "node_modules/underscore/modules/toPath.js": function node_modulesUnderscoreModulesToPathJs() {
      init_underscore();
      init_isArray();
      _.toPath = _toPath;
    } });
    function toPath2(path) {
      return _.toPath(path);
    }
    var init_toPath2 = __esm({ "node_modules/underscore/modules/_toPath.js": function node_modulesUnderscoreModules_toPathJs() {
      init_underscore();
      init_toPath();
    } });
    function deepGet(obj, path) {
      var length = path.length;
      for (var i = 0; i < length; i++) {
        if (obj == null)
          return void 0;
        obj = obj[path[i]];
      }
      return length ? obj : void 0;
    }
    var init_deepGet = __esm({ "node_modules/underscore/modules/_deepGet.js": function node_modulesUnderscoreModules_deepGetJs() {
    } });
    function _get(object2, path, defaultValue) {
      var value = deepGet(object2, toPath2(path));
      return _isUndefined(value) ? defaultValue : value;
    }
    var init_get = __esm({ "node_modules/underscore/modules/get.js": function node_modulesUnderscoreModulesGetJs() {
      init_toPath2();
      init_deepGet();
      init_isUndefined();
    } });
    function has2(obj, path) {
      path = toPath2(path);
      var length = path.length;
      for (var i = 0; i < length; i++) {
        var key = path[i];
        if (!has(obj, key))
          return false;
        obj = obj[key];
      }
      return !!length;
    }
    var init_has2 = __esm({ "node_modules/underscore/modules/has.js": function node_modulesUnderscoreModulesHasJs() {
      init_has();
      init_toPath2();
    } });
    function _identity(value) {
      return value;
    }
    var init_identity = __esm({ "node_modules/underscore/modules/identity.js": function node_modulesUnderscoreModulesIdentityJs() {
    } });
    function _matcher(attrs) {
      attrs = extendOwn_default({}, attrs);
      return function(obj) {
        return _isMatch(obj, attrs);
      };
    }
    var init_matcher = __esm({ "node_modules/underscore/modules/matcher.js": function node_modulesUnderscoreModulesMatcherJs() {
      init_extendOwn();
      init_isMatch();
    } });
    function _property(path) {
      path = toPath2(path);
      return function(obj) {
        return deepGet(obj, path);
      };
    }
    var init_property = __esm({ "node_modules/underscore/modules/property.js": function node_modulesUnderscoreModulesPropertyJs() {
      init_deepGet();
      init_toPath2();
    } });
    function optimizeCb(func, context, argCount) {
      if (context === void 0)
        return func;
      switch (argCount == null ? 3 : argCount) {
        case 1:
          return function(value) {
            return func.call(context, value);
          };
        case 3:
          return function(value, index, collection) {
            return func.call(context, value, index, collection);
          };
        case 4:
          return function(accumulator, value, index, collection) {
            return func.call(context, accumulator, value, index, collection);
          };
      }
      return function() {
        return func.apply(context, arguments);
      };
    }
    var init_optimizeCb = __esm({ "node_modules/underscore/modules/_optimizeCb.js": function node_modulesUnderscoreModules_optimizeCbJs() {
    } });
    function baseIteratee(value, context, argCount) {
      if (value == null)
        return _identity;
      if (isFunction_default(value))
        return optimizeCb(value, context, argCount);
      if (_isObject(value) && !isArray_default(value))
        return _matcher(value);
      return _property(value);
    }
    var init_baseIteratee = __esm({ "node_modules/underscore/modules/_baseIteratee.js": function node_modulesUnderscoreModules_baseIterateeJs() {
      init_identity();
      init_isFunction();
      init_isObject();
      init_isArray();
      init_matcher();
      init_property();
      init_optimizeCb();
    } });
    function _iteratee(value, context) {
      return baseIteratee(value, context, Infinity);
    }
    var init_iteratee = __esm({ "node_modules/underscore/modules/iteratee.js": function node_modulesUnderscoreModulesIterateeJs() {
      init_underscore();
      init_baseIteratee();
      _.iteratee = _iteratee;
    } });
    function cb(value, context, argCount) {
      if (_.iteratee !== _iteratee)
        return _.iteratee(value, context);
      return baseIteratee(value, context, argCount);
    }
    var init_cb = __esm({ "node_modules/underscore/modules/_cb.js": function node_modulesUnderscoreModules_cbJs() {
      init_underscore();
      init_baseIteratee();
      init_iteratee();
    } });
    function _mapObject(obj, iteratee2, context) {
      iteratee2 = cb(iteratee2, context);
      var _keys = _keys2(obj), length = _keys.length, results = {};
      for (var index = 0; index < length; index++) {
        var currentKey = _keys[index];
        results[currentKey] = iteratee2(obj[currentKey], currentKey, obj);
      }
      return results;
    }
    var init_mapObject = __esm({ "node_modules/underscore/modules/mapObject.js": function node_modulesUnderscoreModulesMapObjectJs() {
      init_cb();
      init_keys();
    } });
    function _noop() {
    }
    var init_noop = __esm({ "node_modules/underscore/modules/noop.js": function node_modulesUnderscoreModulesNoopJs() {
    } });
    function _propertyOf(obj) {
      if (obj == null)
        return _noop;
      return function(path) {
        return _get(obj, path);
      };
    }
    var init_propertyOf = __esm({ "node_modules/underscore/modules/propertyOf.js": function node_modulesUnderscoreModulesPropertyOfJs() {
      init_noop();
      init_get();
    } });
    function _times(n, iteratee2, context) {
      var accum = Array(Math.max(0, n));
      iteratee2 = optimizeCb(iteratee2, context, 1);
      for (var i = 0; i < n; i++)
        accum[i] = iteratee2(i);
      return accum;
    }
    var init_times = __esm({ "node_modules/underscore/modules/times.js": function node_modulesUnderscoreModulesTimesJs() {
      init_optimizeCb();
    } });
    function _random(min2, max2) {
      if (max2 == null) {
        max2 = min2;
        min2 = 0;
      }
      return min2 + Math.floor(Math.random() * (max2 - min2 + 1));
    }
    var init_random = __esm({ "node_modules/underscore/modules/random.js": function node_modulesUnderscoreModulesRandomJs() {
    } });
    var now_default;
    var init_now = __esm({ "node_modules/underscore/modules/now.js": function node_modulesUnderscoreModulesNowJs() {
      now_default = Date.now || function() {
        return (/* @__PURE__ */ new Date()).getTime();
      };
    } });
    function createEscaper(map2) {
      var escaper = function escaper2(match) {
        return map2[match];
      };
      var source = "(?:" + _keys2(map2).join("|") + ")";
      var testRegexp = RegExp(source);
      var replaceRegexp = RegExp(source, "g");
      return function(string) {
        string = string == null ? "" : "" + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
      };
    }
    var init_createEscaper = __esm({ "node_modules/underscore/modules/_createEscaper.js": function node_modulesUnderscoreModules_createEscaperJs() {
      init_keys();
    } });
    var escapeMap_default;
    var init_escapeMap = __esm({ "node_modules/underscore/modules/_escapeMap.js": function node_modulesUnderscoreModules_escapeMapJs() {
      escapeMap_default = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" };
    } });
    var escape_default;
    var init_escape = __esm({ "node_modules/underscore/modules/escape.js": function node_modulesUnderscoreModulesEscapeJs() {
      init_createEscaper();
      init_escapeMap();
      escape_default = createEscaper(escapeMap_default);
    } });
    var unescapeMap_default;
    var init_unescapeMap = __esm({ "node_modules/underscore/modules/_unescapeMap.js": function node_modulesUnderscoreModules_unescapeMapJs() {
      init_invert();
      init_escapeMap();
      unescapeMap_default = _invert(escapeMap_default);
    } });
    var unescape_default;
    var init_unescape = __esm({ "node_modules/underscore/modules/unescape.js": function node_modulesUnderscoreModulesUnescapeJs() {
      init_createEscaper();
      init_unescapeMap();
      unescape_default = createEscaper(unescapeMap_default);
    } });
    var templateSettings_default;
    var init_templateSettings = __esm({ "node_modules/underscore/modules/templateSettings.js": function node_modulesUnderscoreModulesTemplateSettingsJs() {
      init_underscore();
      templateSettings_default = _.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g };
    } });
    function escapeChar(match) {
      return "\\" + escapes[match];
    }
    function _template(text, settings, oldSettings) {
      if (!settings && oldSettings)
        settings = oldSettings;
      settings = defaults_default({}, settings, _.templateSettings);
      var matcher2 = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join("|") + "|$", "g");
      var index = 0;
      var source = "__p+='";
      text.replace(matcher2, function(match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escapeRegExp, escapeChar);
        index = offset + match.length;
        if (escape) {
          source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
        } else if (interpolate) {
          source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
        } else if (evaluate) {
          source += "';\n" + evaluate + "\n__p+='";
        }
        return match;
      });
      source += "';\n";
      var argument = settings.variable;
      if (argument) {
        if (!bareIdentifier.test(argument))
          throw new Error("variable is not a bare identifier: " + argument);
      } else {
        source = "with(obj||{}){\n" + source + "}\n";
        argument = "obj";
      }
      source = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + source + "return __p;\n";
      var render;
      try {
        render = new Function(argument, "_", source);
      } catch (e) {
        e.source = source;
        throw e;
      }
      var template2 = function template22(data) {
        return render.call(this, data, _);
      };
      template2.source = "function(" + argument + "){\n" + source + "}";
      return template2;
    }
    var noMatch, escapes, escapeRegExp, bareIdentifier;
    var init_template = __esm({ "node_modules/underscore/modules/template.js": function node_modulesUnderscoreModulesTemplateJs() {
      init_defaults();
      init_underscore();
      init_templateSettings();
      noMatch = /(.)^/;
      escapes = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" };
      escapeRegExp = /\\|'|\r|\n|\u2028|\u2029/g;
      bareIdentifier = /^\s*(\w|\$)+\s*$/;
    } });
    function _result(obj, path, fallback) {
      path = toPath2(path);
      var length = path.length;
      if (!length) {
        return isFunction_default(fallback) ? fallback.call(obj) : fallback;
      }
      for (var i = 0; i < length; i++) {
        var prop = obj == null ? void 0 : obj[path[i]];
        if (prop === void 0) {
          prop = fallback;
          i = length;
        }
        obj = isFunction_default(prop) ? prop.call(obj) : prop;
      }
      return obj;
    }
    var init_result = __esm({ "node_modules/underscore/modules/result.js": function node_modulesUnderscoreModulesResultJs() {
      init_isFunction();
      init_toPath2();
    } });
    function _uniqueId(prefix) {
      var id = ++idCounter + "";
      return prefix ? prefix + id : id;
    }
    var idCounter;
    var init_uniqueId = __esm({ "node_modules/underscore/modules/uniqueId.js": function node_modulesUnderscoreModulesUniqueIdJs() {
      idCounter = 0;
    } });
    function _chain(obj) {
      var instance = _(obj);
      instance._chain = true;
      return instance;
    }
    var init_chain = __esm({ "node_modules/underscore/modules/chain.js": function node_modulesUnderscoreModulesChainJs() {
      init_underscore();
    } });
    function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
      if (!(callingContext instanceof boundFunc))
        return sourceFunc.apply(context, args);
      var self2 = baseCreate(sourceFunc.prototype);
      var result2 = sourceFunc.apply(self2, args);
      if (_isObject(result2))
        return result2;
      return self2;
    }
    var init_executeBound = __esm({ "node_modules/underscore/modules/_executeBound.js": function node_modulesUnderscoreModules_executeBoundJs() {
      init_baseCreate();
      init_isObject();
    } });
    var partial, partial_default;
    var init_partial = __esm({ "node_modules/underscore/modules/partial.js": function node_modulesUnderscoreModulesPartialJs() {
      init_restArguments();
      init_executeBound();
      init_underscore();
      partial = _restArguments(function(func, boundArgs) {
        var placeholder = partial.placeholder;
        var bound = function bound2() {
          var position = 0, length = boundArgs.length;
          var args = Array(length);
          for (var i = 0; i < length; i++) {
            args[i] = boundArgs[i] === placeholder ? arguments[position++] : boundArgs[i];
          }
          while (position < arguments.length)
            args.push(arguments[position++]);
          return executeBound(func, bound2, this, this, args);
        };
        return bound;
      });
      partial.placeholder = _;
      partial_default = partial;
    } });
    var bind_default;
    var init_bind = __esm({ "node_modules/underscore/modules/bind.js": function node_modulesUnderscoreModulesBindJs() {
      init_restArguments();
      init_isFunction();
      init_executeBound();
      bind_default = _restArguments(function(func, context, args) {
        if (!isFunction_default(func))
          throw new TypeError("Bind must be called on a function");
        var bound = _restArguments(function(callArgs) {
          return executeBound(func, bound, context, this, args.concat(callArgs));
        });
        return bound;
      });
    } });
    var isArrayLike_default;
    var init_isArrayLike = __esm({ "node_modules/underscore/modules/_isArrayLike.js": function node_modulesUnderscoreModules_isArrayLikeJs() {
      init_createSizePropertyCheck();
      init_getLength();
      isArrayLike_default = createSizePropertyCheck(getLength_default);
    } });
    function flatten(input, depth, strict, output) {
      output = output || [];
      if (!depth && depth !== 0) {
        depth = Infinity;
      } else if (depth <= 0) {
        return output.concat(input);
      }
      var idx = output.length;
      for (var i = 0, length = getLength_default(input); i < length; i++) {
        var value = input[i];
        if (isArrayLike_default(value) && (isArray_default(value) || isArguments_default(value))) {
          if (depth > 1) {
            flatten(value, depth - 1, strict, output);
            idx = output.length;
          } else {
            var j = 0, len = value.length;
            while (j < len)
              output[idx++] = value[j++];
          }
        } else if (!strict) {
          output[idx++] = value;
        }
      }
      return output;
    }
    var init_flatten = __esm({ "node_modules/underscore/modules/_flatten.js": function node_modulesUnderscoreModules_flattenJs() {
      init_getLength();
      init_isArrayLike();
      init_isArray();
      init_isArguments();
    } });
    var bindAll_default;
    var init_bindAll = __esm({ "node_modules/underscore/modules/bindAll.js": function node_modulesUnderscoreModulesBindAllJs() {
      init_restArguments();
      init_flatten();
      init_bind();
      bindAll_default = _restArguments(function(obj, keys2) {
        keys2 = flatten(keys2, false, false);
        var index = keys2.length;
        if (index < 1)
          throw new Error("bindAll must be passed function names");
        while (index--) {
          var key = keys2[index];
          obj[key] = bind_default(obj[key], obj);
        }
        return obj;
      });
    } });
    function _memoize(func, hasher) {
      var memoize2 = function memoize22(key) {
        var cache = memoize22.cache;
        var address = "" + (hasher ? hasher.apply(this, arguments) : key);
        if (!has(cache, address))
          cache[address] = func.apply(this, arguments);
        return cache[address];
      };
      memoize2.cache = {};
      return memoize2;
    }
    var init_memoize = __esm({ "node_modules/underscore/modules/memoize.js": function node_modulesUnderscoreModulesMemoizeJs() {
      init_has();
    } });
    var delay_default;
    var init_delay = __esm({ "node_modules/underscore/modules/delay.js": function node_modulesUnderscoreModulesDelayJs() {
      init_restArguments();
      delay_default = _restArguments(function(func, wait, args) {
        return setTimeout(function() {
          return func.apply(null, args);
        }, wait);
      });
    } });
    var defer_default;
    var init_defer = __esm({ "node_modules/underscore/modules/defer.js": function node_modulesUnderscoreModulesDeferJs() {
      init_partial();
      init_delay();
      init_underscore();
      defer_default = partial_default(delay_default, _, 1);
    } });
    function _throttle(func, wait, options) {
      var timeout, context, args, result2;
      var previous = 0;
      if (!options)
        options = {};
      var later = function later2() {
        previous = options.leading === false ? 0 : now_default();
        timeout = null;
        result2 = func.apply(context, args);
        if (!timeout)
          context = args = null;
      };
      var throttled = function throttled2() {
        var _now = now_default();
        if (!previous && options.leading === false)
          previous = _now;
        var remaining = wait - (_now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = _now;
          result2 = func.apply(context, args);
          if (!timeout)
            context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result2;
      };
      throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
      };
      return throttled;
    }
    var init_throttle = __esm({ "node_modules/underscore/modules/throttle.js": function node_modulesUnderscoreModulesThrottleJs() {
      init_now();
    } });
    function _debounce(func, wait, immediate) {
      var timeout, previous, args, result2, context;
      var later = function later2() {
        var passed = now_default() - previous;
        if (wait > passed) {
          timeout = setTimeout(later2, wait - passed);
        } else {
          timeout = null;
          if (!immediate)
            result2 = func.apply(context, args);
          if (!timeout)
            args = context = null;
        }
      };
      var debounced = _restArguments(function(_args) {
        context = this;
        args = _args;
        previous = now_default();
        if (!timeout) {
          timeout = setTimeout(later, wait);
          if (immediate)
            result2 = func.apply(context, args);
        }
        return result2;
      });
      debounced.cancel = function() {
        clearTimeout(timeout);
        timeout = args = context = null;
      };
      return debounced;
    }
    var init_debounce = __esm({ "node_modules/underscore/modules/debounce.js": function node_modulesUnderscoreModulesDebounceJs() {
      init_restArguments();
      init_now();
    } });
    function _wrap(func, wrapper) {
      return partial_default(wrapper, func);
    }
    var init_wrap = __esm({ "node_modules/underscore/modules/wrap.js": function node_modulesUnderscoreModulesWrapJs() {
      init_partial();
    } });
    function _negate(predicate) {
      return function() {
        return !predicate.apply(this, arguments);
      };
    }
    var init_negate = __esm({ "node_modules/underscore/modules/negate.js": function node_modulesUnderscoreModulesNegateJs() {
    } });
    function _compose() {
      var args = arguments;
      var start = args.length - 1;
      return function() {
        var i = start;
        var result2 = args[start].apply(this, arguments);
        while (i--)
          result2 = args[i].call(this, result2);
        return result2;
      };
    }
    var init_compose = __esm({ "node_modules/underscore/modules/compose.js": function node_modulesUnderscoreModulesComposeJs() {
    } });
    function _after(times2, func) {
      return function() {
        if (--times2 < 1) {
          return func.apply(this, arguments);
        }
      };
    }
    var init_after = __esm({ "node_modules/underscore/modules/after.js": function node_modulesUnderscoreModulesAfterJs() {
    } });
    function _before(times2, func) {
      var memo;
      return function() {
        if (--times2 > 0) {
          memo = func.apply(this, arguments);
        }
        if (times2 <= 1)
          func = null;
        return memo;
      };
    }
    var init_before = __esm({ "node_modules/underscore/modules/before.js": function node_modulesUnderscoreModulesBeforeJs() {
    } });
    var once_default;
    var init_once = __esm({ "node_modules/underscore/modules/once.js": function node_modulesUnderscoreModulesOnceJs() {
      init_partial();
      init_before();
      once_default = partial_default(_before, 2);
    } });
    function _findKey(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = _keys2(obj), key;
      for (var i = 0, length = _keys.length; i < length; i++) {
        key = _keys[i];
        if (predicate(obj[key], key, obj))
          return key;
      }
    }
    var init_findKey = __esm({ "node_modules/underscore/modules/findKey.js": function node_modulesUnderscoreModulesFindKeyJs() {
      init_cb();
      init_keys();
    } });
    function createPredicateIndexFinder(dir) {
      return function(array, predicate, context) {
        predicate = cb(predicate, context);
        var length = getLength_default(array);
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
          if (predicate(array[index], index, array))
            return index;
        }
        return -1;
      };
    }
    var init_createPredicateIndexFinder = __esm({ "node_modules/underscore/modules/_createPredicateIndexFinder.js": function node_modulesUnderscoreModules_createPredicateIndexFinderJs() {
      init_cb();
      init_getLength();
    } });
    var findIndex_default;
    var init_findIndex = __esm({ "node_modules/underscore/modules/findIndex.js": function node_modulesUnderscoreModulesFindIndexJs() {
      init_createPredicateIndexFinder();
      findIndex_default = createPredicateIndexFinder(1);
    } });
    var findLastIndex_default;
    var init_findLastIndex = __esm({ "node_modules/underscore/modules/findLastIndex.js": function node_modulesUnderscoreModulesFindLastIndexJs() {
      init_createPredicateIndexFinder();
      findLastIndex_default = createPredicateIndexFinder(-1);
    } });
    function _sortedIndex(array, obj, iteratee2, context) {
      iteratee2 = cb(iteratee2, context, 1);
      var value = iteratee2(obj);
      var low = 0, high = getLength_default(array);
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee2(array[mid]) < value)
          low = mid + 1;
        else
          high = mid;
      }
      return low;
    }
    var init_sortedIndex = __esm({ "node_modules/underscore/modules/sortedIndex.js": function node_modulesUnderscoreModulesSortedIndexJs() {
      init_cb();
      init_getLength();
    } });
    function createIndexFinder(dir, predicateFind, sortedIndex2) {
      return function(array, item, idx) {
        var i = 0, length = getLength_default(array);
        if (typeof idx == "number") {
          if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
          } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
          }
        } else if (sortedIndex2 && idx && length) {
          idx = sortedIndex2(array, item);
          return array[idx] === item ? idx : -1;
        }
        if (item !== item) {
          idx = predicateFind(slice.call(array, i, length), isNaN2);
          return idx >= 0 ? idx + i : -1;
        }
        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
          if (array[idx] === item)
            return idx;
        }
        return -1;
      };
    }
    var init_createIndexFinder = __esm({ "node_modules/underscore/modules/_createIndexFinder.js": function node_modulesUnderscoreModules_createIndexFinderJs() {
      init_getLength();
      init_setup();
      init_isNaN();
    } });
    var indexOf_default;
    var init_indexOf = __esm({ "node_modules/underscore/modules/indexOf.js": function node_modulesUnderscoreModulesIndexOfJs() {
      init_sortedIndex();
      init_findIndex();
      init_createIndexFinder();
      indexOf_default = createIndexFinder(1, findIndex_default, _sortedIndex);
    } });
    var lastIndexOf_default;
    var init_lastIndexOf = __esm({ "node_modules/underscore/modules/lastIndexOf.js": function node_modulesUnderscoreModulesLastIndexOfJs() {
      init_findLastIndex();
      init_createIndexFinder();
      lastIndexOf_default = createIndexFinder(-1, findLastIndex_default);
    } });
    function _find(obj, predicate, context) {
      var keyFinder = isArrayLike_default(obj) ? findIndex_default : _findKey;
      var key = keyFinder(obj, predicate, context);
      if (key !== void 0 && key !== -1)
        return obj[key];
    }
    var init_find = __esm({ "node_modules/underscore/modules/find.js": function node_modulesUnderscoreModulesFindJs() {
      init_isArrayLike();
      init_findIndex();
      init_findKey();
    } });
    function _findWhere(obj, attrs) {
      return _find(obj, _matcher(attrs));
    }
    var init_findWhere = __esm({ "node_modules/underscore/modules/findWhere.js": function node_modulesUnderscoreModulesFindWhereJs() {
      init_find();
      init_matcher();
    } });
    function _each(obj, iteratee2, context) {
      iteratee2 = optimizeCb(iteratee2, context);
      var i, length;
      if (isArrayLike_default(obj)) {
        for (i = 0, length = obj.length; i < length; i++) {
          iteratee2(obj[i], i, obj);
        }
      } else {
        var _keys = _keys2(obj);
        for (i = 0, length = _keys.length; i < length; i++) {
          iteratee2(obj[_keys[i]], _keys[i], obj);
        }
      }
      return obj;
    }
    var init_each = __esm({ "node_modules/underscore/modules/each.js": function node_modulesUnderscoreModulesEachJs() {
      init_optimizeCb();
      init_isArrayLike();
      init_keys();
    } });
    function _map(obj, iteratee2, context) {
      iteratee2 = cb(iteratee2, context);
      var _keys = !isArrayLike_default(obj) && _keys2(obj), length = (_keys || obj).length, results = Array(length);
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        results[index] = iteratee2(obj[currentKey], currentKey, obj);
      }
      return results;
    }
    var init_map = __esm({ "node_modules/underscore/modules/map.js": function node_modulesUnderscoreModulesMapJs() {
      init_cb();
      init_isArrayLike();
      init_keys();
    } });
    function createReduce(dir) {
      var reducer = function reducer2(obj, iteratee2, memo, initial2) {
        var _keys = !isArrayLike_default(obj) && _keys2(obj), length = (_keys || obj).length, index = dir > 0 ? 0 : length - 1;
        if (!initial2) {
          memo = obj[_keys ? _keys[index] : index];
          index += dir;
        }
        for (; index >= 0 && index < length; index += dir) {
          var currentKey = _keys ? _keys[index] : index;
          memo = iteratee2(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
      };
      return function(obj, iteratee2, memo, context) {
        var initial2 = arguments.length >= 3;
        return reducer(obj, optimizeCb(iteratee2, context, 4), memo, initial2);
      };
    }
    var init_createReduce = __esm({ "node_modules/underscore/modules/_createReduce.js": function node_modulesUnderscoreModules_createReduceJs() {
      init_isArrayLike();
      init_keys();
      init_optimizeCb();
    } });
    var reduce_default;
    var init_reduce = __esm({ "node_modules/underscore/modules/reduce.js": function node_modulesUnderscoreModulesReduceJs() {
      init_createReduce();
      reduce_default = createReduce(1);
    } });
    var reduceRight_default;
    var init_reduceRight = __esm({ "node_modules/underscore/modules/reduceRight.js": function node_modulesUnderscoreModulesReduceRightJs() {
      init_createReduce();
      reduceRight_default = createReduce(-1);
    } });
    function _filter(obj, predicate, context) {
      var results = [];
      predicate = cb(predicate, context);
      _each(obj, function(value, index, list) {
        if (predicate(value, index, list))
          results.push(value);
      });
      return results;
    }
    var init_filter = __esm({ "node_modules/underscore/modules/filter.js": function node_modulesUnderscoreModulesFilterJs() {
      init_cb();
      init_each();
    } });
    function _reject(obj, predicate, context) {
      return _filter(obj, _negate(cb(predicate)), context);
    }
    var init_reject = __esm({ "node_modules/underscore/modules/reject.js": function node_modulesUnderscoreModulesRejectJs() {
      init_filter();
      init_negate();
      init_cb();
    } });
    function _every(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = !isArrayLike_default(obj) && _keys2(obj), length = (_keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        if (!predicate(obj[currentKey], currentKey, obj))
          return false;
      }
      return true;
    }
    var init_every = __esm({ "node_modules/underscore/modules/every.js": function node_modulesUnderscoreModulesEveryJs() {
      init_cb();
      init_isArrayLike();
      init_keys();
    } });
    function _some(obj, predicate, context) {
      predicate = cb(predicate, context);
      var _keys = !isArrayLike_default(obj) && _keys2(obj), length = (_keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = _keys ? _keys[index] : index;
        if (predicate(obj[currentKey], currentKey, obj))
          return true;
      }
      return false;
    }
    var init_some = __esm({ "node_modules/underscore/modules/some.js": function node_modulesUnderscoreModulesSomeJs() {
      init_cb();
      init_isArrayLike();
      init_keys();
    } });
    function _contains(obj, item, fromIndex, guard) {
      if (!isArrayLike_default(obj))
        obj = _values(obj);
      if (typeof fromIndex != "number" || guard)
        fromIndex = 0;
      return indexOf_default(obj, item, fromIndex) >= 0;
    }
    var init_contains = __esm({ "node_modules/underscore/modules/contains.js": function node_modulesUnderscoreModulesContainsJs() {
      init_isArrayLike();
      init_values();
      init_indexOf();
    } });
    var invoke_default;
    var init_invoke = __esm({ "node_modules/underscore/modules/invoke.js": function node_modulesUnderscoreModulesInvokeJs() {
      init_restArguments();
      init_isFunction();
      init_map();
      init_deepGet();
      init_toPath2();
      invoke_default = _restArguments(function(obj, path, args) {
        var contextPath, func;
        if (isFunction_default(path)) {
          func = path;
        } else {
          path = toPath2(path);
          contextPath = path.slice(0, -1);
          path = path[path.length - 1];
        }
        return _map(obj, function(context) {
          var method = func;
          if (!method) {
            if (contextPath && contextPath.length) {
              context = deepGet(context, contextPath);
            }
            if (context == null)
              return void 0;
            method = context[path];
          }
          return method == null ? method : method.apply(context, args);
        });
      });
    } });
    function _pluck(obj, key) {
      return _map(obj, _property(key));
    }
    var init_pluck = __esm({ "node_modules/underscore/modules/pluck.js": function node_modulesUnderscoreModulesPluckJs() {
      init_map();
      init_property();
    } });
    function _where(obj, attrs) {
      return _filter(obj, _matcher(attrs));
    }
    var init_where = __esm({ "node_modules/underscore/modules/where.js": function node_modulesUnderscoreModulesWhereJs() {
      init_filter();
      init_matcher();
    } });
    function _max(obj, iteratee2, context) {
      var result2 = -Infinity, lastComputed = -Infinity, value, computed;
      if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
        obj = isArrayLike_default(obj) ? obj : _values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value != null && value > result2) {
            result2 = value;
          }
        }
      } else {
        iteratee2 = cb(iteratee2, context);
        _each(obj, function(v, index, list) {
          computed = iteratee2(v, index, list);
          if (computed > lastComputed || computed === -Infinity && result2 === -Infinity) {
            result2 = v;
            lastComputed = computed;
          }
        });
      }
      return result2;
    }
    var init_max = __esm({ "node_modules/underscore/modules/max.js": function node_modulesUnderscoreModulesMaxJs() {
      init_isArrayLike();
      init_values();
      init_cb();
      init_each();
    } });
    function _min(obj, iteratee2, context) {
      var result2 = Infinity, lastComputed = Infinity, value, computed;
      if (iteratee2 == null || typeof iteratee2 == "number" && typeof obj[0] != "object" && obj != null) {
        obj = isArrayLike_default(obj) ? obj : _values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value != null && value < result2) {
            result2 = value;
          }
        }
      } else {
        iteratee2 = cb(iteratee2, context);
        _each(obj, function(v, index, list) {
          computed = iteratee2(v, index, list);
          if (computed < lastComputed || computed === Infinity && result2 === Infinity) {
            result2 = v;
            lastComputed = computed;
          }
        });
      }
      return result2;
    }
    var init_min = __esm({ "node_modules/underscore/modules/min.js": function node_modulesUnderscoreModulesMinJs() {
      init_isArrayLike();
      init_values();
      init_cb();
      init_each();
    } });
    function _toArray(obj) {
      if (!obj)
        return [];
      if (isArray_default(obj))
        return slice.call(obj);
      if (isString_default(obj)) {
        return obj.match(reStrSymbol);
      }
      if (isArrayLike_default(obj))
        return _map(obj, _identity);
      return _values(obj);
    }
    var reStrSymbol;
    var init_toArray = __esm({ "node_modules/underscore/modules/toArray.js": function node_modulesUnderscoreModulesToArrayJs() {
      init_isArray();
      init_setup();
      init_isString();
      init_isArrayLike();
      init_map();
      init_identity();
      init_values();
      reStrSymbol = /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g;
    } });
    function _sample(obj, n, guard) {
      if (n == null || guard) {
        if (!isArrayLike_default(obj))
          obj = _values(obj);
        return obj[_random(obj.length - 1)];
      }
      var sample2 = _toArray(obj);
      var length = getLength_default(sample2);
      n = Math.max(Math.min(n, length), 0);
      var last2 = length - 1;
      for (var index = 0; index < n; index++) {
        var rand = _random(index, last2);
        var temp = sample2[index];
        sample2[index] = sample2[rand];
        sample2[rand] = temp;
      }
      return sample2.slice(0, n);
    }
    var init_sample = __esm({ "node_modules/underscore/modules/sample.js": function node_modulesUnderscoreModulesSampleJs() {
      init_isArrayLike();
      init_values();
      init_getLength();
      init_random();
      init_toArray();
    } });
    function _shuffle(obj) {
      return _sample(obj, Infinity);
    }
    var init_shuffle = __esm({ "node_modules/underscore/modules/shuffle.js": function node_modulesUnderscoreModulesShuffleJs() {
      init_sample();
    } });
    function _sortBy(obj, iteratee2, context) {
      var index = 0;
      iteratee2 = cb(iteratee2, context);
      return _pluck(_map(obj, function(value, key, list) {
        return { value, index: index++, criteria: iteratee2(value, key, list) };
      }).sort(function(left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
          if (a > b || a === void 0)
            return 1;
          if (a < b || b === void 0)
            return -1;
        }
        return left.index - right.index;
      }), "value");
    }
    var init_sortBy = __esm({ "node_modules/underscore/modules/sortBy.js": function node_modulesUnderscoreModulesSortByJs() {
      init_cb();
      init_pluck();
      init_map();
    } });
    function group(behavior, partition) {
      return function(obj, iteratee2, context) {
        var result2 = partition ? [[], []] : {};
        iteratee2 = cb(iteratee2, context);
        _each(obj, function(value, index) {
          var key = iteratee2(value, index, obj);
          behavior(result2, value, key);
        });
        return result2;
      };
    }
    var init_group = __esm({ "node_modules/underscore/modules/_group.js": function node_modulesUnderscoreModules_groupJs() {
      init_cb();
      init_each();
    } });
    var groupBy_default;
    var init_groupBy = __esm({ "node_modules/underscore/modules/groupBy.js": function node_modulesUnderscoreModulesGroupByJs() {
      init_group();
      init_has();
      groupBy_default = group(function(result2, value, key) {
        if (has(result2, key))
          result2[key].push(value);
        else
          result2[key] = [value];
      });
    } });
    var indexBy_default;
    var init_indexBy = __esm({ "node_modules/underscore/modules/indexBy.js": function node_modulesUnderscoreModulesIndexByJs() {
      init_group();
      indexBy_default = group(function(result2, value, key) {
        result2[key] = value;
      });
    } });
    var countBy_default;
    var init_countBy = __esm({ "node_modules/underscore/modules/countBy.js": function node_modulesUnderscoreModulesCountByJs() {
      init_group();
      init_has();
      countBy_default = group(function(result2, value, key) {
        if (has(result2, key))
          result2[key]++;
        else
          result2[key] = 1;
      });
    } });
    var partition_default;
    var init_partition = __esm({ "node_modules/underscore/modules/partition.js": function node_modulesUnderscoreModulesPartitionJs() {
      init_group();
      partition_default = group(function(result2, value, pass) {
        result2[pass ? 0 : 1].push(value);
      }, true);
    } });
    function _size(obj) {
      if (obj == null)
        return 0;
      return isArrayLike_default(obj) ? obj.length : _keys2(obj).length;
    }
    var init_size = __esm({ "node_modules/underscore/modules/size.js": function node_modulesUnderscoreModulesSizeJs() {
      init_isArrayLike();
      init_keys();
    } });
    function keyInObj(value, key, obj) {
      return key in obj;
    }
    var init_keyInObj = __esm({ "node_modules/underscore/modules/_keyInObj.js": function node_modulesUnderscoreModules_keyInObjJs() {
    } });
    var pick_default;
    var init_pick = __esm({ "node_modules/underscore/modules/pick.js": function node_modulesUnderscoreModulesPickJs() {
      init_restArguments();
      init_isFunction();
      init_optimizeCb();
      init_allKeys();
      init_keyInObj();
      init_flatten();
      pick_default = _restArguments(function(obj, keys2) {
        var result2 = {}, iteratee2 = keys2[0];
        if (obj == null)
          return result2;
        if (isFunction_default(iteratee2)) {
          if (keys2.length > 1)
            iteratee2 = optimizeCb(iteratee2, keys2[1]);
          keys2 = _allKeys(obj);
        } else {
          iteratee2 = keyInObj;
          keys2 = flatten(keys2, false, false);
          obj = Object(obj);
        }
        for (var i = 0, length = keys2.length; i < length; i++) {
          var key = keys2[i];
          var value = obj[key];
          if (iteratee2(value, key, obj))
            result2[key] = value;
        }
        return result2;
      });
    } });
    var omit_default;
    var init_omit = __esm({ "node_modules/underscore/modules/omit.js": function node_modulesUnderscoreModulesOmitJs() {
      init_restArguments();
      init_isFunction();
      init_negate();
      init_map();
      init_flatten();
      init_contains();
      init_pick();
      omit_default = _restArguments(function(obj, keys2) {
        var iteratee2 = keys2[0], context;
        if (isFunction_default(iteratee2)) {
          iteratee2 = _negate(iteratee2);
          if (keys2.length > 1)
            context = keys2[1];
        } else {
          keys2 = _map(flatten(keys2, false, false), String);
          iteratee2 = function iteratee22(value, key) {
            return !_contains(keys2, key);
          };
        }
        return pick_default(obj, iteratee2, context);
      });
    } });
    function _initial(array, n, guard) {
      return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    }
    var init_initial = __esm({ "node_modules/underscore/modules/initial.js": function node_modulesUnderscoreModulesInitialJs() {
      init_setup();
    } });
    function _first(array, n, guard) {
      if (array == null || array.length < 1)
        return n == null || guard ? void 0 : [];
      if (n == null || guard)
        return array[0];
      return _initial(array, array.length - n);
    }
    var init_first = __esm({ "node_modules/underscore/modules/first.js": function node_modulesUnderscoreModulesFirstJs() {
      init_initial();
    } });
    function _rest(array, n, guard) {
      return slice.call(array, n == null || guard ? 1 : n);
    }
    var init_rest = __esm({ "node_modules/underscore/modules/rest.js": function node_modulesUnderscoreModulesRestJs() {
      init_setup();
    } });
    function _last(array, n, guard) {
      if (array == null || array.length < 1)
        return n == null || guard ? void 0 : [];
      if (n == null || guard)
        return array[array.length - 1];
      return _rest(array, Math.max(0, array.length - n));
    }
    var init_last = __esm({ "node_modules/underscore/modules/last.js": function node_modulesUnderscoreModulesLastJs() {
      init_rest();
    } });
    function _compact(array) {
      return _filter(array, Boolean);
    }
    var init_compact = __esm({ "node_modules/underscore/modules/compact.js": function node_modulesUnderscoreModulesCompactJs() {
      init_filter();
    } });
    function flatten2(array, depth) {
      return flatten(array, depth, false);
    }
    var init_flatten2 = __esm({ "node_modules/underscore/modules/flatten.js": function node_modulesUnderscoreModulesFlattenJs() {
      init_flatten();
    } });
    var difference_default;
    var init_difference = __esm({ "node_modules/underscore/modules/difference.js": function node_modulesUnderscoreModulesDifferenceJs() {
      init_restArguments();
      init_flatten();
      init_filter();
      init_contains();
      difference_default = _restArguments(function(array, rest2) {
        rest2 = flatten(rest2, true, true);
        return _filter(array, function(value) {
          return !_contains(rest2, value);
        });
      });
    } });
    var without_default;
    var init_without = __esm({ "node_modules/underscore/modules/without.js": function node_modulesUnderscoreModulesWithoutJs() {
      init_restArguments();
      init_difference();
      without_default = _restArguments(function(array, otherArrays) {
        return difference_default(array, otherArrays);
      });
    } });
    function _uniq(array, isSorted, iteratee2, context) {
      if (!_isBoolean(isSorted)) {
        context = iteratee2;
        iteratee2 = isSorted;
        isSorted = false;
      }
      if (iteratee2 != null)
        iteratee2 = cb(iteratee2, context);
      var result2 = [];
      var seen = [];
      for (var i = 0, length = getLength_default(array); i < length; i++) {
        var value = array[i], computed = iteratee2 ? iteratee2(value, i, array) : value;
        if (isSorted && !iteratee2) {
          if (!i || seen !== computed)
            result2.push(value);
          seen = computed;
        } else if (iteratee2) {
          if (!_contains(seen, computed)) {
            seen.push(computed);
            result2.push(value);
          }
        } else if (!_contains(result2, value)) {
          result2.push(value);
        }
      }
      return result2;
    }
    var init_uniq = __esm({ "node_modules/underscore/modules/uniq.js": function node_modulesUnderscoreModulesUniqJs() {
      init_isBoolean();
      init_cb();
      init_getLength();
      init_contains();
    } });
    var union_default;
    var init_union = __esm({ "node_modules/underscore/modules/union.js": function node_modulesUnderscoreModulesUnionJs() {
      init_restArguments();
      init_uniq();
      init_flatten();
      union_default = _restArguments(function(arrays) {
        return _uniq(flatten(arrays, true, true));
      });
    } });
    function _intersection(array) {
      var result2 = [];
      var argsLength = arguments.length;
      for (var i = 0, length = getLength_default(array); i < length; i++) {
        var item = array[i];
        if (_contains(result2, item))
          continue;
        var j;
        for (j = 1; j < argsLength; j++) {
          if (!_contains(arguments[j], item))
            break;
        }
        if (j === argsLength)
          result2.push(item);
      }
      return result2;
    }
    var init_intersection = __esm({ "node_modules/underscore/modules/intersection.js": function node_modulesUnderscoreModulesIntersectionJs() {
      init_getLength();
      init_contains();
    } });
    function _unzip(array) {
      var length = array && _max(array, getLength_default).length || 0;
      var result2 = Array(length);
      for (var index = 0; index < length; index++) {
        result2[index] = _pluck(array, index);
      }
      return result2;
    }
    var init_unzip = __esm({ "node_modules/underscore/modules/unzip.js": function node_modulesUnderscoreModulesUnzipJs() {
      init_max();
      init_getLength();
      init_pluck();
    } });
    var zip_default;
    var init_zip = __esm({ "node_modules/underscore/modules/zip.js": function node_modulesUnderscoreModulesZipJs() {
      init_restArguments();
      init_unzip();
      zip_default = _restArguments(_unzip);
    } });
    function _object(list, values2) {
      var result2 = {};
      for (var i = 0, length = getLength_default(list); i < length; i++) {
        if (values2) {
          result2[list[i]] = values2[i];
        } else {
          result2[list[i][0]] = list[i][1];
        }
      }
      return result2;
    }
    var init_object = __esm({ "node_modules/underscore/modules/object.js": function node_modulesUnderscoreModulesObjectJs() {
      init_getLength();
    } });
    function _range(start, stop, step) {
      if (stop == null) {
        stop = start || 0;
        start = 0;
      }
      if (!step) {
        step = stop < start ? -1 : 1;
      }
      var length = Math.max(Math.ceil((stop - start) / step), 0);
      var range2 = Array(length);
      for (var idx = 0; idx < length; idx++, start += step) {
        range2[idx] = start;
      }
      return range2;
    }
    var init_range = __esm({ "node_modules/underscore/modules/range.js": function node_modulesUnderscoreModulesRangeJs() {
    } });
    function _chunk(array, count) {
      if (count == null || count < 1)
        return [];
      var result2 = [];
      var i = 0, length = array.length;
      while (i < length) {
        result2.push(slice.call(array, i, i += count));
      }
      return result2;
    }
    var init_chunk = __esm({ "node_modules/underscore/modules/chunk.js": function node_modulesUnderscoreModulesChunkJs() {
      init_setup();
    } });
    function chainResult(instance, obj) {
      return instance._chain ? _(obj).chain() : obj;
    }
    var init_chainResult = __esm({ "node_modules/underscore/modules/_chainResult.js": function node_modulesUnderscoreModules_chainResultJs() {
      init_underscore();
    } });
    function _mixin(obj) {
      _each(_functions(obj), function(name) {
        var func = _[name] = obj[name];
        _.prototype[name] = function() {
          var args = [this._wrapped];
          push.apply(args, arguments);
          return chainResult(this, func.apply(_, args));
        };
      });
      return _;
    }
    var init_mixin = __esm({ "node_modules/underscore/modules/mixin.js": function node_modulesUnderscoreModulesMixinJs() {
      init_underscore();
      init_each();
      init_functions();
      init_setup();
      init_chainResult();
    } });
    var underscore_array_methods_default;
    var init_underscore_array_methods = __esm({ "node_modules/underscore/modules/underscore-array-methods.js": function node_modulesUnderscoreModulesUnderscoreArrayMethodsJs() {
      init_underscore();
      init_each();
      init_setup();
      init_chainResult();
      _each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          var obj = this._wrapped;
          if (obj != null) {
            method.apply(obj, arguments);
            if ((name === "shift" || name === "splice") && obj.length === 0) {
              delete obj[0];
            }
          }
          return chainResult(this, obj);
        };
      });
      _each(["concat", "join", "slice"], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
          var obj = this._wrapped;
          if (obj != null)
            obj = method.apply(obj, arguments);
          return chainResult(this, obj);
        };
      });
      underscore_array_methods_default = _;
    } });
    var modules_exports = {};
    __export(modules_exports, { VERSION: function VERSION() {
      return _VERSION;
    }, after: function after() {
      return _after;
    }, all: function all() {
      return _every;
    }, allKeys: function allKeys() {
      return _allKeys;
    }, any: function any() {
      return _some;
    }, assign: function assign() {
      return extendOwn_default;
    }, before: function before() {
      return _before;
    }, bind: function bind() {
      return bind_default;
    }, bindAll: function bindAll() {
      return bindAll_default;
    }, chain: function chain() {
      return _chain;
    }, chunk: function chunk() {
      return _chunk;
    }, clone: function clone() {
      return _clone;
    }, collect: function collect() {
      return _map;
    }, compact: function compact() {
      return _compact;
    }, compose: function compose() {
      return _compose;
    }, constant: function constant() {
      return _constant;
    }, contains: function contains() {
      return _contains;
    }, countBy: function countBy() {
      return countBy_default;
    }, create: function create() {
      return _create;
    }, debounce: function debounce() {
      return _debounce;
    }, default: function _default() {
      return underscore_array_methods_default;
    }, defaults: function defaults() {
      return defaults_default;
    }, defer: function defer() {
      return defer_default;
    }, delay: function delay() {
      return delay_default;
    }, detect: function detect() {
      return _find;
    }, difference: function difference() {
      return difference_default;
    }, drop: function drop() {
      return _rest;
    }, each: function each() {
      return _each;
    }, escape: function escape() {
      return escape_default;
    }, every: function every() {
      return _every;
    }, extend: function extend() {
      return extend_default;
    }, extendOwn: function extendOwn() {
      return extendOwn_default;
    }, filter: function filter() {
      return _filter;
    }, find: function find() {
      return _find;
    }, findIndex: function findIndex() {
      return findIndex_default;
    }, findKey: function findKey() {
      return _findKey;
    }, findLastIndex: function findLastIndex() {
      return findLastIndex_default;
    }, findWhere: function findWhere() {
      return _findWhere;
    }, first: function first() {
      return _first;
    }, flatten: function flatten3() {
      return flatten2;
    }, foldl: function foldl() {
      return reduce_default;
    }, foldr: function foldr() {
      return reduceRight_default;
    }, forEach: function forEach() {
      return _each;
    }, functions: function functions() {
      return _functions;
    }, get: function get() {
      return _get;
    }, groupBy: function groupBy() {
      return groupBy_default;
    }, has: function has3() {
      return has2;
    }, head: function head() {
      return _first;
    }, identity: function identity() {
      return _identity;
    }, include: function include() {
      return _contains;
    }, includes: function includes() {
      return _contains;
    }, indexBy: function indexBy() {
      return indexBy_default;
    }, indexOf: function indexOf() {
      return indexOf_default;
    }, initial: function initial() {
      return _initial;
    }, inject: function inject() {
      return reduce_default;
    }, intersection: function intersection() {
      return _intersection;
    }, invert: function invert() {
      return _invert;
    }, invoke: function invoke() {
      return invoke_default;
    }, isArguments: function isArguments2() {
      return isArguments_default;
    }, isArray: function isArray() {
      return isArray_default;
    }, isArrayBuffer: function isArrayBuffer() {
      return isArrayBuffer_default;
    }, isBoolean: function isBoolean() {
      return _isBoolean;
    }, isDataView: function isDataView2() {
      return isDataView_default;
    }, isDate: function isDate() {
      return isDate_default;
    }, isElement: function isElement() {
      return _isElement;
    }, isEmpty: function isEmpty() {
      return _isEmpty;
    }, isEqual: function isEqual() {
      return _isEqual;
    }, isError: function isError() {
      return isError_default;
    }, isFinite: function isFinite3() {
      return isFinite2;
    }, isFunction: function isFunction2() {
      return isFunction_default;
    }, isMap: function isMap() {
      return isMap_default;
    }, isMatch: function isMatch() {
      return _isMatch;
    }, isNaN: function isNaN3() {
      return isNaN2;
    }, isNull: function isNull() {
      return _isNull;
    }, isNumber: function isNumber() {
      return isNumber_default;
    }, isObject: function isObject() {
      return _isObject;
    }, isRegExp: function isRegExp() {
      return isRegExp_default;
    }, isSet: function isSet() {
      return isSet_default;
    }, isString: function isString() {
      return isString_default;
    }, isSymbol: function isSymbol() {
      return isSymbol_default;
    }, isTypedArray: function isTypedArray2() {
      return isTypedArray_default;
    }, isUndefined: function isUndefined() {
      return _isUndefined;
    }, isWeakMap: function isWeakMap() {
      return isWeakMap_default;
    }, isWeakSet: function isWeakSet() {
      return isWeakSet_default;
    }, iteratee: function iteratee() {
      return _iteratee;
    }, keys: function keys() {
      return _keys2;
    }, last: function last() {
      return _last;
    }, lastIndexOf: function lastIndexOf() {
      return lastIndexOf_default;
    }, map: function map() {
      return _map;
    }, mapObject: function mapObject() {
      return _mapObject;
    }, matcher: function matcher() {
      return _matcher;
    }, matches: function matches() {
      return _matcher;
    }, max: function max() {
      return _max;
    }, memoize: function memoize() {
      return _memoize;
    }, methods: function methods() {
      return _functions;
    }, min: function min() {
      return _min;
    }, mixin: function mixin() {
      return _mixin;
    }, negate: function negate() {
      return _negate;
    }, noop: function noop() {
      return _noop;
    }, now: function now() {
      return now_default;
    }, object: function object() {
      return _object;
    }, omit: function omit() {
      return omit_default;
    }, once: function once() {
      return once_default;
    }, pairs: function pairs() {
      return _pairs;
    }, partial: function partial2() {
      return partial_default;
    }, partition: function partition() {
      return partition_default;
    }, pick: function pick() {
      return pick_default;
    }, pluck: function pluck() {
      return _pluck;
    }, property: function property() {
      return _property;
    }, propertyOf: function propertyOf() {
      return _propertyOf;
    }, random: function random() {
      return _random;
    }, range: function range() {
      return _range;
    }, reduce: function reduce() {
      return reduce_default;
    }, reduceRight: function reduceRight() {
      return reduceRight_default;
    }, reject: function reject() {
      return _reject;
    }, rest: function rest() {
      return _rest;
    }, restArguments: function restArguments() {
      return _restArguments;
    }, result: function result() {
      return _result;
    }, sample: function sample() {
      return _sample;
    }, select: function select() {
      return _filter;
    }, shuffle: function shuffle() {
      return _shuffle;
    }, size: function size() {
      return _size;
    }, some: function some() {
      return _some;
    }, sortBy: function sortBy() {
      return _sortBy;
    }, sortedIndex: function sortedIndex() {
      return _sortedIndex;
    }, tail: function tail() {
      return _rest;
    }, take: function take() {
      return _first;
    }, tap: function tap() {
      return _tap;
    }, template: function template() {
      return _template;
    }, templateSettings: function templateSettings() {
      return templateSettings_default;
    }, throttle: function throttle() {
      return _throttle;
    }, times: function times() {
      return _times;
    }, toArray: function toArray() {
      return _toArray;
    }, toPath: function toPath() {
      return _toPath;
    }, transpose: function transpose() {
      return _unzip;
    }, unescape: function unescape() {
      return unescape_default;
    }, union: function union() {
      return union_default;
    }, uniq: function uniq() {
      return _uniq;
    }, unique: function unique() {
      return _uniq;
    }, uniqueId: function uniqueId() {
      return _uniqueId;
    }, unzip: function unzip() {
      return _unzip;
    }, values: function values() {
      return _values;
    }, where: function where() {
      return _where;
    }, without: function without() {
      return without_default;
    }, wrap: function wrap() {
      return _wrap;
    }, zip: function zip() {
      return zip_default;
    } });
    var init_modules = __esm({ "node_modules/underscore/modules/index.js": function node_modulesUnderscoreModulesIndexJs() {
      init_setup();
      init_restArguments();
      init_isObject();
      init_isNull();
      init_isUndefined();
      init_isBoolean();
      init_isElement();
      init_isString();
      init_isNumber();
      init_isDate();
      init_isRegExp();
      init_isError();
      init_isSymbol();
      init_isArrayBuffer();
      init_isDataView();
      init_isArray();
      init_isFunction();
      init_isArguments();
      init_isFinite();
      init_isNaN();
      init_isTypedArray();
      init_isEmpty();
      init_isMatch();
      init_isEqual();
      init_isMap();
      init_isWeakMap();
      init_isSet();
      init_isWeakSet();
      init_keys();
      init_allKeys();
      init_values();
      init_pairs();
      init_invert();
      init_functions();
      init_extend();
      init_extendOwn();
      init_defaults();
      init_create();
      init_clone();
      init_tap();
      init_get();
      init_has2();
      init_mapObject();
      init_identity();
      init_constant();
      init_noop();
      init_toPath();
      init_property();
      init_propertyOf();
      init_matcher();
      init_times();
      init_random();
      init_now();
      init_escape();
      init_unescape();
      init_templateSettings();
      init_template();
      init_result();
      init_uniqueId();
      init_chain();
      init_iteratee();
      init_partial();
      init_bind();
      init_bindAll();
      init_memoize();
      init_delay();
      init_defer();
      init_throttle();
      init_debounce();
      init_wrap();
      init_negate();
      init_compose();
      init_after();
      init_before();
      init_once();
      init_findKey();
      init_findIndex();
      init_findLastIndex();
      init_sortedIndex();
      init_indexOf();
      init_lastIndexOf();
      init_find();
      init_findWhere();
      init_each();
      init_map();
      init_reduce();
      init_reduceRight();
      init_filter();
      init_reject();
      init_every();
      init_some();
      init_contains();
      init_invoke();
      init_pluck();
      init_where();
      init_max();
      init_min();
      init_shuffle();
      init_sample();
      init_sortBy();
      init_groupBy();
      init_indexBy();
      init_countBy();
      init_partition();
      init_toArray();
      init_size();
      init_pick();
      init_omit();
      init_first();
      init_initial();
      init_last();
      init_rest();
      init_compact();
      init_flatten2();
      init_without();
      init_uniq();
      init_union();
      init_intersection();
      init_difference();
      init_unzip();
      init_zip();
      init_object();
      init_range();
      init_chunk();
      init_mixin();
      init_underscore_array_methods();
    } });
    var _2, index_default_default;
    var init_index_default = __esm({ "node_modules/underscore/modules/index-default.js": function node_modulesUnderscoreModulesIndexDefaultJs() {
      init_modules();
      init_modules();
      _2 = _mixin(modules_exports);
      _2._ = _2;
      index_default_default = _2;
    } });
    var index_all_exports = {};
    __export(index_all_exports, { VERSION: function VERSION() {
      return _VERSION;
    }, after: function after() {
      return _after;
    }, all: function all() {
      return _every;
    }, allKeys: function allKeys() {
      return _allKeys;
    }, any: function any() {
      return _some;
    }, assign: function assign() {
      return extendOwn_default;
    }, before: function before() {
      return _before;
    }, bind: function bind() {
      return bind_default;
    }, bindAll: function bindAll() {
      return bindAll_default;
    }, chain: function chain() {
      return _chain;
    }, chunk: function chunk() {
      return _chunk;
    }, clone: function clone() {
      return _clone;
    }, collect: function collect() {
      return _map;
    }, compact: function compact() {
      return _compact;
    }, compose: function compose() {
      return _compose;
    }, constant: function constant() {
      return _constant;
    }, contains: function contains() {
      return _contains;
    }, countBy: function countBy() {
      return countBy_default;
    }, create: function create() {
      return _create;
    }, debounce: function debounce() {
      return _debounce;
    }, default: function _default() {
      return index_default_default;
    }, defaults: function defaults() {
      return defaults_default;
    }, defer: function defer() {
      return defer_default;
    }, delay: function delay() {
      return delay_default;
    }, detect: function detect() {
      return _find;
    }, difference: function difference() {
      return difference_default;
    }, drop: function drop() {
      return _rest;
    }, each: function each() {
      return _each;
    }, escape: function escape() {
      return escape_default;
    }, every: function every() {
      return _every;
    }, extend: function extend() {
      return extend_default;
    }, extendOwn: function extendOwn() {
      return extendOwn_default;
    }, filter: function filter() {
      return _filter;
    }, find: function find() {
      return _find;
    }, findIndex: function findIndex() {
      return findIndex_default;
    }, findKey: function findKey() {
      return _findKey;
    }, findLastIndex: function findLastIndex() {
      return findLastIndex_default;
    }, findWhere: function findWhere() {
      return _findWhere;
    }, first: function first() {
      return _first;
    }, flatten: function flatten3() {
      return flatten2;
    }, foldl: function foldl() {
      return reduce_default;
    }, foldr: function foldr() {
      return reduceRight_default;
    }, forEach: function forEach() {
      return _each;
    }, functions: function functions() {
      return _functions;
    }, get: function get() {
      return _get;
    }, groupBy: function groupBy() {
      return groupBy_default;
    }, has: function has3() {
      return has2;
    }, head: function head() {
      return _first;
    }, identity: function identity() {
      return _identity;
    }, include: function include() {
      return _contains;
    }, includes: function includes() {
      return _contains;
    }, indexBy: function indexBy() {
      return indexBy_default;
    }, indexOf: function indexOf() {
      return indexOf_default;
    }, initial: function initial() {
      return _initial;
    }, inject: function inject() {
      return reduce_default;
    }, intersection: function intersection() {
      return _intersection;
    }, invert: function invert() {
      return _invert;
    }, invoke: function invoke() {
      return invoke_default;
    }, isArguments: function isArguments2() {
      return isArguments_default;
    }, isArray: function isArray() {
      return isArray_default;
    }, isArrayBuffer: function isArrayBuffer() {
      return isArrayBuffer_default;
    }, isBoolean: function isBoolean() {
      return _isBoolean;
    }, isDataView: function isDataView2() {
      return isDataView_default;
    }, isDate: function isDate() {
      return isDate_default;
    }, isElement: function isElement() {
      return _isElement;
    }, isEmpty: function isEmpty() {
      return _isEmpty;
    }, isEqual: function isEqual() {
      return _isEqual;
    }, isError: function isError() {
      return isError_default;
    }, isFinite: function isFinite3() {
      return isFinite2;
    }, isFunction: function isFunction2() {
      return isFunction_default;
    }, isMap: function isMap() {
      return isMap_default;
    }, isMatch: function isMatch() {
      return _isMatch;
    }, isNaN: function isNaN3() {
      return isNaN2;
    }, isNull: function isNull() {
      return _isNull;
    }, isNumber: function isNumber() {
      return isNumber_default;
    }, isObject: function isObject() {
      return _isObject;
    }, isRegExp: function isRegExp() {
      return isRegExp_default;
    }, isSet: function isSet() {
      return isSet_default;
    }, isString: function isString() {
      return isString_default;
    }, isSymbol: function isSymbol() {
      return isSymbol_default;
    }, isTypedArray: function isTypedArray2() {
      return isTypedArray_default;
    }, isUndefined: function isUndefined() {
      return _isUndefined;
    }, isWeakMap: function isWeakMap() {
      return isWeakMap_default;
    }, isWeakSet: function isWeakSet() {
      return isWeakSet_default;
    }, iteratee: function iteratee() {
      return _iteratee;
    }, keys: function keys() {
      return _keys2;
    }, last: function last() {
      return _last;
    }, lastIndexOf: function lastIndexOf() {
      return lastIndexOf_default;
    }, map: function map() {
      return _map;
    }, mapObject: function mapObject() {
      return _mapObject;
    }, matcher: function matcher() {
      return _matcher;
    }, matches: function matches() {
      return _matcher;
    }, max: function max() {
      return _max;
    }, memoize: function memoize() {
      return _memoize;
    }, methods: function methods() {
      return _functions;
    }, min: function min() {
      return _min;
    }, mixin: function mixin() {
      return _mixin;
    }, negate: function negate() {
      return _negate;
    }, noop: function noop() {
      return _noop;
    }, now: function now() {
      return now_default;
    }, object: function object() {
      return _object;
    }, omit: function omit() {
      return omit_default;
    }, once: function once() {
      return once_default;
    }, pairs: function pairs() {
      return _pairs;
    }, partial: function partial2() {
      return partial_default;
    }, partition: function partition() {
      return partition_default;
    }, pick: function pick() {
      return pick_default;
    }, pluck: function pluck() {
      return _pluck;
    }, property: function property() {
      return _property;
    }, propertyOf: function propertyOf() {
      return _propertyOf;
    }, random: function random() {
      return _random;
    }, range: function range() {
      return _range;
    }, reduce: function reduce() {
      return reduce_default;
    }, reduceRight: function reduceRight() {
      return reduceRight_default;
    }, reject: function reject() {
      return _reject;
    }, rest: function rest() {
      return _rest;
    }, restArguments: function restArguments() {
      return _restArguments;
    }, result: function result() {
      return _result;
    }, sample: function sample() {
      return _sample;
    }, select: function select() {
      return _filter;
    }, shuffle: function shuffle() {
      return _shuffle;
    }, size: function size() {
      return _size;
    }, some: function some() {
      return _some;
    }, sortBy: function sortBy() {
      return _sortBy;
    }, sortedIndex: function sortedIndex() {
      return _sortedIndex;
    }, tail: function tail() {
      return _rest;
    }, take: function take() {
      return _first;
    }, tap: function tap() {
      return _tap;
    }, template: function template() {
      return _template;
    }, templateSettings: function templateSettings() {
      return templateSettings_default;
    }, throttle: function throttle() {
      return _throttle;
    }, times: function times() {
      return _times;
    }, toArray: function toArray() {
      return _toArray;
    }, toPath: function toPath() {
      return _toPath;
    }, transpose: function transpose() {
      return _unzip;
    }, unescape: function unescape() {
      return unescape_default;
    }, union: function union() {
      return union_default;
    }, uniq: function uniq() {
      return _uniq;
    }, unique: function unique() {
      return _uniq;
    }, uniqueId: function uniqueId() {
      return _uniqueId;
    }, unzip: function unzip() {
      return _unzip;
    }, values: function values() {
      return _values;
    }, where: function where() {
      return _where;
    }, without: function without() {
      return without_default;
    }, wrap: function wrap() {
      return _wrap;
    }, zip: function zip() {
      return zip_default;
    } });
    var init_index_all = __esm({ "node_modules/underscore/modules/index-all.js": function node_modulesUnderscoreModulesIndexAllJs() {
      init_index_default();
      init_modules();
    } });
    var require_basePropertyOf = __commonJS2({ "node_modules/lodash/_basePropertyOf.js": function node_modulesLodash_basePropertyOfJs(exports, module) {
      function basePropertyOf(object2) {
        return function(key) {
          return object2 == null ? void 0 : object2[key];
        };
      }
      module.exports = basePropertyOf;
    } });
    var require_escapeHtmlChar = __commonJS2({ "node_modules/lodash/_escapeHtmlChar.js": function node_modulesLodash_escapeHtmlCharJs(exports, module) {
      var basePropertyOf = require_basePropertyOf();
      var htmlEscapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
      var escapeHtmlChar = basePropertyOf(htmlEscapes);
      module.exports = escapeHtmlChar;
    } });
    var require_freeGlobal = __commonJS2({ "node_modules/lodash/_freeGlobal.js": function node_modulesLodash_freeGlobalJs(exports, module) {
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    } });
    var require_root = __commonJS2({ "node_modules/lodash/_root.js": function node_modulesLodash_rootJs(exports, module) {
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root2 = freeGlobal || freeSelf || Function("return this")();
      module.exports = root2;
    } });
    var require_Symbol = __commonJS2({ "node_modules/lodash/_Symbol.js": function node_modulesLodash_SymbolJs(exports, module) {
      var root2 = require_root();
      var Symbol2 = root2.Symbol;
      module.exports = Symbol2;
    } });
    var require_arrayMap = __commonJS2({ "node_modules/lodash/_arrayMap.js": function node_modulesLodash_arrayMapJs(exports, module) {
      function arrayMap(array, iteratee2) {
        var index = -1, length = array == null ? 0 : array.length, result2 = Array(length);
        while (++index < length) {
          result2[index] = iteratee2(array[index], index, array);
        }
        return result2;
      }
      module.exports = arrayMap;
    } });
    var require_isArray = __commonJS2({ "node_modules/lodash/isArray.js": function node_modulesLodashIsArrayJs(exports, module) {
      var isArray = Array.isArray;
      module.exports = isArray;
    } });
    var require_getRawTag = __commonJS2({ "node_modules/lodash/_getRawTag.js": function node_modulesLodash_getRawTagJs(exports, module) {
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty2 = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result2 = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result2;
      }
      module.exports = getRawTag;
    } });
    var require_objectToString = __commonJS2({ "node_modules/lodash/_objectToString.js": function node_modulesLodash_objectToStringJs(exports, module) {
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    } });
    var require_baseGetTag = __commonJS2({ "node_modules/lodash/_baseGetTag.js": function node_modulesLodash_baseGetTagJs(exports, module) {
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    } });
    var require_isObjectLike = __commonJS2({ "node_modules/lodash/isObjectLike.js": function node_modulesLodashIsObjectLikeJs(exports, module) {
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module.exports = isObjectLike;
    } });
    var require_isSymbol = __commonJS2({ "node_modules/lodash/isSymbol.js": function node_modulesLodashIsSymbolJs(exports, module) {
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      module.exports = isSymbol;
    } });
    var require_baseToString = __commonJS2({ "node_modules/lodash/_baseToString.js": function node_modulesLodash_baseToStringJs(exports, module) {
      var Symbol2 = require_Symbol();
      var arrayMap = require_arrayMap();
      var isArray = require_isArray();
      var isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result2 = value + "";
        return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
      }
      module.exports = baseToString;
    } });
    var require_toString = __commonJS2({ "node_modules/lodash/toString.js": function node_modulesLodashToStringJs(exports, module) {
      var baseToString = require_baseToString();
      function toString2(value) {
        return value == null ? "" : baseToString(value);
      }
      module.exports = toString2;
    } });
    var require_escape = __commonJS2({ "node_modules/lodash/escape.js": function node_modulesLodashEscapeJs(exports, module) {
      var escapeHtmlChar = require_escapeHtmlChar();
      var toString2 = require_toString();
      var reUnescapedHtml = /[&<>"']/g;
      var reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
      function escape(string) {
        string = toString2(string);
        return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
      }
      module.exports = escape;
    } });
    var require_unescapeHtmlChar = __commonJS2({ "node_modules/lodash/_unescapeHtmlChar.js": function node_modulesLodash_unescapeHtmlCharJs(exports, module) {
      var basePropertyOf = require_basePropertyOf();
      var htmlUnescapes = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };
      var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
      module.exports = unescapeHtmlChar;
    } });
    var require_unescape = __commonJS2({ "node_modules/lodash/unescape.js": function node_modulesLodashUnescapeJs(exports, module) {
      var toString2 = require_toString();
      var unescapeHtmlChar = require_unescapeHtmlChar();
      var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g;
      var reHasEscapedHtml = RegExp(reEscapedHtml.source);
      function unescape(string) {
        string = toString2(string);
        return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
      }
      module.exports = unescape;
    } });
    var require_lib = __commonJS2({ "node_modules/awesome-phonenumber/lib/index.js": function node_modulesAwesomePhonenumberLibIndexJs(exports, module) {
      (function() {
        var aa = this || self;
        function h(a, b) {
          function c() {
          }
          c.prototype = b.prototype;
          a.Ba = b.prototype;
          a.prototype = new c();
          a.prototype.constructor = a;
          a.Ha = function(d, e, f) {
            for (var g = Array(arguments.length - 2), l = 2; l < arguments.length; l++)
              g[l - 2] = arguments[l];
            return b.prototype[e].apply(d, g);
          };
        }
        ;
        function ba(a) {
          var b = [];
          var c = 0;
          for (var d in a)
            b[c++] = a[d];
          return b;
        }
        ;
        function ca(a, b) {
          this.h = a;
          this.g = {};
          for (a = 0; a < b.length; a++) {
            var c = b[a];
            this.g[c.g] = c;
          }
        }
        function da(a) {
          a = ba(a.g);
          a.sort(function(b, c) {
            return b.g - c.g;
          });
          return a;
        }
        ;
        function ea(a, b) {
          this.g = a;
          this.m = !!b.ga;
          this.h = b.i;
          this.u = b.type;
          this.s = false;
          switch (this.h) {
            case fa:
            case ha:
            case ia:
            case ja:
            case ka:
            case la:
            case ma:
              this.s = true;
          }
          this.j = b.defaultValue;
        }
        var ma = 1, la = 2, fa = 3, ha = 4, ia = 6, ja = 16, ka = 18;
        function k() {
          this.h = {};
          this.j = this.o().g;
          this.g = this.m = null;
        }
        k.prototype.has = function(a) {
          return m(this, a.g);
        };
        k.prototype.get = function(a, b) {
          return n(this, a.g, b);
        };
        k.prototype.set = function(a, b) {
          p(this, a.g, b);
        };
        k.prototype.add = function(a, b) {
          na(this, a.g, b);
        };
        function oa(a, b) {
          for (var c = da(a.o()), d = 0; d < c.length; d++) {
            var e = c[d], f = e.g;
            if (m(b, f)) {
              a.g && delete a.g[e.g];
              var g = 11 == e.h || 10 == e.h;
              if (e.m) {
                e = r(b, f);
                for (var l = 0; l < e.length; l++)
                  na(a, f, g ? e[l].clone() : e[l]);
              } else
                e = t(b, f), g ? (g = t(a, f)) ? oa(g, e) : p(a, f, e.clone()) : p(a, f, e);
            }
          }
        }
        k.prototype.clone = function() {
          var a = new this.constructor();
          a != this && (a.h = {}, a.g && (a.g = {}), oa(a, this));
          return a;
        };
        function m(a, b) {
          return null != a.h[b];
        }
        function t(a, b) {
          var c = a.h[b];
          if (null == c)
            return null;
          if (a.m) {
            if (!(b in a.g)) {
              var d = a.m, e = a.j[b];
              if (null != c)
                if (e.m) {
                  for (var f = [], g = 0; g < c.length; g++)
                    f[g] = d.h(e, c[g]);
                  c = f;
                } else
                  c = d.h(e, c);
              return a.g[b] = c;
            }
            return a.g[b];
          }
          return c;
        }
        function n(a, b, c) {
          var d = t(a, b);
          return a.j[b].m ? d[c || 0] : d;
        }
        function u(a, b) {
          if (m(a, b))
            a = n(a, b);
          else
            a: {
              a = a.j[b];
              if (void 0 === a.j)
                if (b = a.u, b === Boolean)
                  a.j = false;
                else if (b === Number)
                  a.j = 0;
                else if (b === String)
                  a.j = a.s ? "0" : "";
                else {
                  a = new b();
                  break a;
                }
              a = a.j;
            }
          return a;
        }
        function r(a, b) {
          return t(a, b) || [];
        }
        function v(a, b) {
          return a.j[b].m ? m(a, b) ? a.h[b].length : 0 : m(a, b) ? 1 : 0;
        }
        function p(a, b, c) {
          a.h[b] = c;
          a.g && (a.g[b] = c);
        }
        function na(a, b, c) {
          a.h[b] || (a.h[b] = []);
          a.h[b].push(c);
          a.g && delete a.g[b];
        }
        function w(a, b) {
          var c = [], d;
          for (d in b)
            0 != d && c.push(new ea(d, b[d]));
          return new ca(a, c);
        }
        ;
        function x() {
        }
        x.prototype.g = function(a) {
          new a.h();
          throw Error("Unimplemented");
        };
        x.prototype.h = function(a, b) {
          if (11 == a.h || 10 == a.h)
            return b instanceof k ? b : this.g(a.u.prototype.o(), b);
          if (14 == a.h)
            return "string" === typeof b && pa.test(b) && (a = Number(b), 0 < a) ? a : b;
          if (!a.s)
            return b;
          a = a.u;
          if (a === String) {
            if ("number" === typeof b)
              return String(b);
          } else if (a === Number && "string" === typeof b && ("Infinity" === b || "-Infinity" === b || "NaN" === b || pa.test(b)))
            return Number(b);
          return b;
        };
        var pa = /^-?[0-9]+$/;
        function qa() {
        }
        h(qa, x);
        qa.prototype.g = function(a, b) {
          a = new a.h();
          a.m = this;
          a.h = b;
          a.g = {};
          return a;
        };
        function y() {
        }
        h(y, qa);
        y.prototype.h = function(a, b) {
          return 8 == a.h ? !!b : x.prototype.h.apply(this, arguments);
        };
        y.prototype.g = function(a, b) {
          return y.Ba.g.call(this, a, b);
        };
        function z(a, b) {
          null != a && this.g.apply(this, arguments);
        }
        z.prototype.h = "";
        z.prototype.set = function(a) {
          this.h = "" + a;
        };
        z.prototype.g = function(a, b, c) {
          this.h += String(a);
          if (null != b)
            for (var d = 1; d < arguments.length; d++)
              this.h += arguments[d];
          return this;
        };
        function A(a) {
          a.h = "";
        }
        z.prototype.toString = function() {
          return this.h;
        };
        function B() {
          k.call(this);
        }
        h(B, k);
        var ra = null;
        function C() {
          k.call(this);
        }
        h(C, k);
        var sa = null;
        function D() {
          k.call(this);
        }
        h(D, k);
        var ta = null;
        D.prototype.ia = function() {
          return n(this, 10);
        };
        B.prototype.o = function() {
          var a = ra;
          a || (ra = a = w(B, { 0: { name: "NumberFormat", na: "i18n.phonenumbers.NumberFormat" }, 1: { name: "pattern", required: true, i: 9, type: String }, 2: { name: "format", required: true, i: 9, type: String }, 3: { name: "leading_digits_pattern", ga: true, i: 9, type: String }, 4: { name: "national_prefix_formatting_rule", i: 9, type: String }, 6: { name: "national_prefix_optional_when_formatting", i: 8, defaultValue: false, type: Boolean }, 5: { name: "domestic_carrier_code_formatting_rule", i: 9, type: String } }));
          return a;
        };
        B.o = B.prototype.o;
        C.prototype.o = function() {
          var a = sa;
          a || (sa = a = w(C, { 0: { name: "PhoneNumberDesc", na: "i18n.phonenumbers.PhoneNumberDesc" }, 2: { name: "national_number_pattern", i: 9, type: String }, 9: { name: "possible_length", ga: true, i: 5, type: Number }, 10: { name: "possible_length_local_only", ga: true, i: 5, type: Number }, 6: { name: "example_number", i: 9, type: String } }));
          return a;
        };
        C.o = C.prototype.o;
        D.prototype.o = function() {
          var a = ta;
          a || (ta = a = w(D, { 0: { name: "PhoneMetadata", na: "i18n.phonenumbers.PhoneMetadata" }, 1: { name: "general_desc", i: 11, type: C }, 2: { name: "fixed_line", i: 11, type: C }, 3: { name: "mobile", i: 11, type: C }, 4: { name: "toll_free", i: 11, type: C }, 5: { name: "premium_rate", i: 11, type: C }, 6: { name: "shared_cost", i: 11, type: C }, 7: { name: "personal_number", i: 11, type: C }, 8: { name: "voip", i: 11, type: C }, 21: { name: "pager", i: 11, type: C }, 25: { name: "uan", i: 11, type: C }, 27: { name: "emergency", i: 11, type: C }, 28: { name: "voicemail", i: 11, type: C }, 29: { name: "short_code", i: 11, type: C }, 30: { name: "standard_rate", i: 11, type: C }, 31: { name: "carrier_specific", i: 11, type: C }, 33: { name: "sms_services", i: 11, type: C }, 24: { name: "no_international_dialling", i: 11, type: C }, 9: { name: "id", required: true, i: 9, type: String }, 10: { name: "country_code", i: 5, type: Number }, 11: { name: "international_prefix", i: 9, type: String }, 17: { name: "preferred_international_prefix", i: 9, type: String }, 12: { name: "national_prefix", i: 9, type: String }, 13: { name: "preferred_extn_prefix", i: 9, type: String }, 15: { name: "national_prefix_for_parsing", i: 9, type: String }, 16: { name: "national_prefix_transform_rule", i: 9, type: String }, 18: { name: "same_mobile_and_fixed_line_pattern", i: 8, defaultValue: false, type: Boolean }, 19: { name: "number_format", ga: true, i: 11, type: B }, 20: { name: "intl_number_format", ga: true, i: 11, type: B }, 22: { name: "main_country_for_code", i: 8, defaultValue: false, type: Boolean }, 23: { name: "leading_digits", i: 9, type: String } }));
          return a;
        };
        D.o = D.prototype.o;
        function E() {
          k.call(this);
        }
        h(E, k);
        var ua = null;
        E.prototype.ia = function() {
          return n(this, 1);
        };
        var va = { Ga: 0, Fa: 1, Ea: 5, Da: 10, Ca: 20 };
        E.prototype.o = function() {
          var a = ua;
          a || (ua = a = w(E, { 0: { name: "PhoneNumber", na: "i18n.phonenumbers.PhoneNumber" }, 1: { name: "country_code", required: true, i: 5, type: Number }, 2: { name: "national_number", required: true, i: 4, type: Number }, 3: { name: "extension", i: 9, type: String }, 4: { name: "italian_leading_zero", i: 8, type: Boolean }, 8: { name: "number_of_leading_zeros", i: 5, defaultValue: 1, type: Number }, 5: { name: "raw_input", i: 9, type: String }, 6: { name: "country_code_source", i: 14, defaultValue: 0, type: va }, 7: { name: "preferred_domestic_carrier_code", i: 9, type: String } }));
          return a;
        };
        E.ctor = E;
        E.ctor.o = E.prototype.o;
        var F = { 1: "US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "), 7: ["RU", "KZ"], 20: ["EG"], 27: ["ZA"], 30: ["GR"], 31: ["NL"], 32: ["BE"], 33: ["FR"], 34: ["ES"], 36: ["HU"], 39: ["IT", "VA"], 40: ["RO"], 41: ["CH"], 43: ["AT"], 44: ["GB", "GG", "IM", "JE"], 45: ["DK"], 46: ["SE"], 47: ["NO", "SJ"], 48: ["PL"], 49: ["DE"], 51: ["PE"], 52: ["MX"], 53: ["CU"], 54: ["AR"], 55: ["BR"], 56: ["CL"], 57: ["CO"], 58: ["VE"], 60: ["MY"], 61: ["AU", "CC", "CX"], 62: ["ID"], 63: ["PH"], 64: ["NZ"], 65: ["SG"], 66: ["TH"], 81: ["JP"], 82: ["KR"], 84: ["VN"], 86: ["CN"], 90: ["TR"], 91: ["IN"], 92: ["PK"], 93: ["AF"], 94: ["LK"], 95: ["MM"], 98: ["IR"], 211: ["SS"], 212: ["MA", "EH"], 213: ["DZ"], 216: ["TN"], 218: ["LY"], 220: ["GM"], 221: ["SN"], 222: ["MR"], 223: ["ML"], 224: ["GN"], 225: ["CI"], 226: ["BF"], 227: ["NE"], 228: ["TG"], 229: ["BJ"], 230: ["MU"], 231: ["LR"], 232: ["SL"], 233: ["GH"], 234: ["NG"], 235: ["TD"], 236: ["CF"], 237: ["CM"], 238: ["CV"], 239: ["ST"], 240: ["GQ"], 241: ["GA"], 242: ["CG"], 243: ["CD"], 244: ["AO"], 245: ["GW"], 246: ["IO"], 247: ["AC"], 248: ["SC"], 249: ["SD"], 250: ["RW"], 251: ["ET"], 252: ["SO"], 253: ["DJ"], 254: ["KE"], 255: ["TZ"], 256: ["UG"], 257: ["BI"], 258: ["MZ"], 260: ["ZM"], 261: ["MG"], 262: ["RE", "YT"], 263: ["ZW"], 264: ["NA"], 265: ["MW"], 266: ["LS"], 267: ["BW"], 268: ["SZ"], 269: ["KM"], 290: ["SH", "TA"], 291: ["ER"], 297: ["AW"], 298: ["FO"], 299: ["GL"], 350: ["GI"], 351: ["PT"], 352: ["LU"], 353: ["IE"], 354: ["IS"], 355: ["AL"], 356: ["MT"], 357: ["CY"], 358: ["FI", "AX"], 359: ["BG"], 370: ["LT"], 371: ["LV"], 372: ["EE"], 373: ["MD"], 374: ["AM"], 375: ["BY"], 376: ["AD"], 377: ["MC"], 378: ["SM"], 380: ["UA"], 381: ["RS"], 382: ["ME"], 383: ["XK"], 385: ["HR"], 386: ["SI"], 387: ["BA"], 389: ["MK"], 420: ["CZ"], 421: ["SK"], 423: ["LI"], 500: ["FK"], 501: ["BZ"], 502: ["GT"], 503: ["SV"], 504: ["HN"], 505: ["NI"], 506: ["CR"], 507: ["PA"], 508: ["PM"], 509: ["HT"], 590: ["GP", "BL", "MF"], 591: ["BO"], 592: ["GY"], 593: ["EC"], 594: ["GF"], 595: ["PY"], 596: ["MQ"], 597: ["SR"], 598: ["UY"], 599: ["CW", "BQ"], 670: ["TL"], 672: ["NF"], 673: ["BN"], 674: ["NR"], 675: ["PG"], 676: ["TO"], 677: ["SB"], 678: ["VU"], 679: ["FJ"], 680: ["PW"], 681: ["WF"], 682: ["CK"], 683: ["NU"], 685: ["WS"], 686: ["KI"], 687: ["NC"], 688: ["TV"], 689: ["PF"], 690: ["TK"], 691: ["FM"], 692: ["MH"], 800: ["001"], 808: ["001"], 850: ["KP"], 852: ["HK"], 853: ["MO"], 855: ["KH"], 856: ["LA"], 870: ["001"], 878: ["001"], 880: ["BD"], 881: ["001"], 882: ["001"], 883: ["001"], 886: ["TW"], 888: ["001"], 960: ["MV"], 961: ["LB"], 962: ["JO"], 963: ["SY"], 964: ["IQ"], 965: ["KW"], 966: ["SA"], 967: ["YE"], 968: ["OM"], 970: ["PS"], 971: ["AE"], 972: ["IL"], 973: ["BH"], 974: ["QA"], 975: ["BT"], 976: ["MN"], 977: ["NP"], 979: ["001"], 992: ["TJ"], 993: ["TM"], 994: ["AZ"], 995: ["GE"], 996: ["KG"], 998: ["UZ"] }, G = { AC: [, [, , "(?:[01589]\\d|[46])\\d{4}", , , , , , , [5, 6]], [, , "6[2-467]\\d{3}", , , , "62889", , , [5]], [, , "4\\d{4}", , , , "40123", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AC", 247, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:0[1-9]|[1589]\\d)\\d{4}", , , , "542011", , , [6]], , , [, , , , , , , , , [-1]]], AD: [, [, , "(?:1|6\\d)\\d{7}|[135-9]\\d{5}", , , , , , , [6, 8, 9]], [, , "[78]\\d{5}", , , , "712345", , , [6]], [, , "690\\d{6}|[356]\\d{5}", , , , "312345", , , [6, 9]], [, , "180[02]\\d{4}", , , , "18001234", , , [8]], [, , "[19]\\d{5}", , , , "912345", , , [6]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AD", 376, "00", , , , , , , , [[, "(\\d{3})(\\d{3})", "$1 $2", ["[135-9]"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["1"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"]]], , [, , , , , , , , , [-1]], , , [, , "1800\\d{4}", , , , , , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AE: [, [, , "(?:[4-7]\\d|9[0-689])\\d{7}|800\\d{2,9}|[2-4679]\\d{7}", , , , , , , [5, 6, 7, 8, 9, 10, 11, 12]], [, , "[2-4679][2-8]\\d{6}", , , , "22345678", , , [8], [7]], [, , "5[024-68]\\d{7}", , , , "501234567", , , [9]], [, , "400\\d{6}|800\\d{2,9}", , , , "800123456"], [, , "900[02]\\d{5}", , , , "900234567", , , [9]], [, , "700[05]\\d{5}", , , , "700012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AE", 971, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2,9})", "$1 $2", ["60|8"]], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[236]|[479][2-8]"], "0$1"], [, "(\\d{3})(\\d)(\\d{5})", "$1 $2 $3", ["[479]"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "600[25]\\d{5}", , , , "600212345", , , [9]], , , [, , , , , , , , , [-1]]], AF: [, [, , "[2-7]\\d{8}", , , , , , , [9], [7]], [, , "(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}", , , , "234567890", , , , [7]], [, , "7\\d{8}", , , , "701234567", , , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AF", 93, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[1-9]"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AG: [, [, , "(?:268|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}", , , , "2684601234", , , , [7]], [, , "268(?:464|7(?:1[3-9]|[28]\\d|3[0246]|64|7[0-689]))\\d{4}", , , , "2684641234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "26848[01]\\d{4}", , , , "2684801234", , , , [7]], "AG", 1, "011", "1", , , "([457]\\d{6})$|1", "268$1", , , , , [, , "26840[69]\\d{4}", , , , "2684061234", , , , [7]], , "268", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AI: [, [, , "(?:264|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "264(?:292|4(?:6[12]|9[78]))\\d{4}", , , , "2644612345", , , , [7]], [, , "264(?:235|4(?:69|76)|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}", , , , "2642351234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "AI", 1, "011", "1", , , "([2457]\\d{6})$|1", "264$1", , , , , [, , "264724\\d{4}", , , , "2647241234", , , , [7]], , "264", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AL: [, [, , "(?:700\\d\\d|900)\\d{3}|8\\d{5,7}|(?:[2-5]|6\\d)\\d{7}", , , , , , , [6, 7, 8, 9], [5]], [, , "4505[0-2]\\d{3}|(?:[2358][16-9]\\d[2-9]|4410)\\d{4}|(?:[2358][2-5][2-9]|4(?:[2-57-9][2-9]|6\\d))\\d{5}", , , , "22345678", , , [8], [5, 6, 7]], [, , "6(?:[78][2-9]|9\\d)\\d{6}", , , , "672123456", , , [9]], [, , "800\\d{4}", , , , "8001234", , , [7]], [, , "900[1-9]\\d\\d", , , , "900123", , , [6]], [, , "808[1-9]\\d\\d", , , , "808123", , , [6]], [, , "700[2-9]\\d{4}", , , , "70021234", , , [8]], [, , , , , , , , , [-1]], "AL", 355, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3,4})", "$1 $2", ["80|9"], "0$1"], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["4[2-6]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2358][2-5]|4"], "0$1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["[23578]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["6"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AM: [, [, , "(?:[1-489]\\d|55|60|77)\\d{6}", , , , , , , [8], [5, 6]], [, , "(?:(?:1[0-25]|47)\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2)\\d{5}", , , , "10123456", , , , [5, 6]], [, , "(?:33|4[1349]|55|77|88|9[13-9])\\d{6}", , , , "77123456"], [, , "800\\d{5}", , , , "80012345"], [, , "90[016]\\d{5}", , , , "90012345"], [, , "80[1-4]\\d{5}", , , , "80112345"], [, , , , , , , , , [-1]], [, , "60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|9[0-2])\\d{4}", , , , "60271234"], "AM", 374, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[89]0"], "0 $1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["2|3[12]"], "(0$1)"], [, "(\\d{2})(\\d{6})", "$1 $2", ["1|47"], "(0$1)"], [, "(\\d{2})(\\d{6})", "$1 $2", ["[3-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AO: [, [, , "[29]\\d{8}", , , , , , , [9]], [, , "2\\d(?:[0134][25-9]|[25-9]\\d)\\d{5}", , , , "222123456"], [, , "9[1-59]\\d{7}", , , , "923123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AO", 244, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[29]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AR: [, [, , "(?:11|[89]\\d\\d)\\d{8}|[2368]\\d{9}", , , , , , , [10, 11], [6, 7, 8]], [, , "3888[013-9]\\d{5}|3(?:7(?:1[15]|81)|8(?:21|4[16]|69|9[12]))[46]\\d{5}|(?:29(?:54|66)|3(?:7(?:55|77)|865))[2-8]\\d{5}|(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|473|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|(?:2(?:284|3(?:02|23)|657|920)|3(?:4(?:8[27]|92)|541|878))[2-7]\\d{5}|(?:2(?:(?:26|62)2|320|477|9(?:42|83))|3(?:329|4(?:[47]6|62|89)|564))[2-6]\\d{5}|(?:(?:11[1-8]|670)\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-8]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-8]|[235][4-6]|84)|5(?:1[2-9]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|[17][2-6]|3[4-6]|[58][3-6])))\\d{6}|2(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|475|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|(?:2(?:2(?:57|81)|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|71)|5(?:25|37|4[347]|71)|7(?:18|5[17])))[3-6]\\d{5}|(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[03-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[145]|4[13]|5[468]|7[2-5]|8[26])|8(?:2[5-7]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}", , , , "1123456789", , , [10], [6, 7, 8]], [, , "93(?:7(?:1[15]|81)[46]|8(?:(?:21|4[16]|69|9[12])[46]|88[013-9]))\\d{5}|9(?:29(?:54|66)|3(?:7(?:55|77)|865))[2-8]\\d{5}|9(?:2(?:2(?:2[59]|44|52)|3(?:26|44)|473|9(?:[07]2|2[26]|34|46))|3327)[45]\\d{5}|9(?:2(?:284|3(?:02|23)|657|920)|3(?:4(?:8[27]|92)|541|878))[2-7]\\d{5}|9(?:2(?:(?:26|62)2|320|477|9(?:42|83))|3(?:329|4(?:[47]6|62|89)|564))[2-6]\\d{5}|(?:675\\d|9(?:11[1-8]\\d|2(?:2(?:0[45]|1[2-6]|3[3-6])|3(?:[06]4|7[45])|494|6(?:04|1[2-8]|[36][45]|4[3-6])|80[45]|9(?:[17][4-6]|[48][45]|9[3-6]))|3(?:364|4(?:1[2-8]|[235][4-6]|84)|5(?:1[2-9]|[38][4-6])|6(?:2[45]|44)|7[069][45]|8(?:0[45]|[17][2-6]|3[4-6]|[58][3-6]))))\\d{6}|92(?:2(?:21|4[23]|6[145]|7[1-4]|8[356]|9[267])|3(?:16|3[13-8]|43|5[346-8]|9[3-5])|475|6(?:2[46]|4[78]|5[1568])|9(?:03|2[1457-9]|3[1356]|4[08]|[56][23]|82))4\\d{5}|9(?:2(?:2(?:57|81)|3(?:24|46|92)|9(?:01|23|64))|3(?:4(?:42|71)|5(?:25|37|4[347]|71)|7(?:18|5[17])))[3-6]\\d{5}|9(?:2(?:2(?:02|2[3467]|4[156]|5[45]|6[6-8]|91)|3(?:1[47]|25|[45][25]|96)|47[48]|625|932)|3(?:38[2578]|4(?:0[0-24-9]|3[78]|4[457]|58|6[03-9]|72|83|9[136-8])|5(?:2[124]|[368][23]|4[2689]|7[2-6])|7(?:16|2[15]|3[145]|4[13]|5[468]|7[2-5]|8[26])|8(?:2[5-7]|3[278]|4[3-5]|5[78]|6[1-378]|[78]7|94)))[4-6]\\d{5}", , , , "91123456789", , , , [6, 7, 8]], [, , "800\\d{7,8}", , , , "8001234567"], [, , "60[04579]\\d{7}", , , , "6001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AR", 54, "00", "0", , , "0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))15)?", "9$1", , , [[, "(\\d{3})", "$1", ["0|1(?:0[0-35-7]|1[02-5]|2[015]|3[47]|4[478])|911"]], [, "(\\d{2})(\\d{4})", "$1-$2", ["[1-9]"]], [, "(\\d{3})(\\d{4})", "$1-$2", ["[2-9]"]], [, "(\\d{4})(\\d{4})", "$1-$2", ["[1-8]"]], [, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", , 1], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1], [, "(\\d)(\\d{4})(\\d{2})(\\d{4})", "$2 15-$3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1"], [, "(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 15-$3-$4", ["91"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"], [, "(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 15-$3-$4", ["9"], "0$1"]], [[, "(\\d{4})(\\d{2})(\\d{4})", "$1 $2-$3", ["2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9])", "2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8]))|2(?:2[24-9]|3[1-59]|47)", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5[56][46]|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|58|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|54(?:4|5[13-7]|6[89])|86[3-6]))|2(?:2[24-9]|3[1-59]|47)|38(?:[58][78]|7[378])|3(?:454|85[56])[46]|3(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"], "0$1", , 1], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["1"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[68]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2-$3", ["[23]"], "0$1", , 1], [, "(\\d)(\\d{4})(\\d{2})(\\d{4})", "$1 $2 $3-$4", ["9(?:2[2-469]|3[3-578])", "9(?:2(?:2[024-9]|3[0-59]|47|6[245]|9[02-8])|3(?:3[28]|4[03-9]|5[2-46-8]|7[1-578]|8[2-9]))", "9(?:2(?:[23]02|6(?:[25]|4[6-8])|9(?:[02356]|4[02568]|72|8[23]))|3(?:3[28]|4(?:[04679]|3[5-8]|5[4-68]|8[2379])|5(?:[2467]|3[237]|8[2-5])|7[1-578]|8(?:[2469]|3[2578]|5[4-8]|7[36-8]|8[5-8])))|92(?:2[24-9]|3[1-59]|47)", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3[78]|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8[23])|7[1-578]|8(?:[2469]|3[278]|5(?:[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4[35][56]|58[45]|8(?:[38]5|54|76))[4-6]", "9(?:2(?:[23]02|6(?:[25]|4(?:64|[78]))|9(?:[02356]|4(?:[0268]|5[2-6])|72|8[23]))|3(?:3[28]|4(?:[04679]|3(?:5(?:4[0-25689]|[56])|[78])|5(?:4[46]|8)|8[2379])|5(?:[2467]|3[237]|8(?:[23]|4(?:[45]|60)|5(?:4[0-39]|5|64)))|7[1-578]|8(?:[2469]|3[278]|5(?:4(?:4|5[13-7]|6[89])|[56][46]|[78])|7[378]|8(?:6[3-6]|[78]))))|92(?:2[24-9]|3[1-59]|47)|93(?:4(?:36|5[56])|8(?:[38]5|76))[4-6]"]], [, "(\\d)(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3-$4", ["91"]], [, "(\\d{3})(\\d{3})(\\d{5})", "$1-$2-$3", ["8"], "0$1"], [, "(\\d)(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3-$4", ["9"]]], [, , , , , , , , , [-1]], , , [, , "810\\d{7}", , , , , , , [10]], [, , "810\\d{7}", , , , "8101234567", , , [10]], , , [, , , , , , , , , [-1]]], AS: [, [, , "(?:[58]\\d\\d|684|900)\\d{7}", , , , , , , [10], [7]], [, , "6846(?:22|33|44|55|77|88|9[19])\\d{4}", , , , "6846221234", , , , [7]], [, , "684(?:2(?:48|5[2468]|7[26])|7(?:3[13]|70|82))\\d{4}", , , , "6847331234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "AS", 1, "011", "1", , , "([267]\\d{6})$|1", "684$1", , , , , [, , , , , , , , , [-1]], , "684", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AT: [, [, , "1\\d{3,12}|2\\d{6,12}|43(?:(?:0\\d|5[02-9])\\d{3,9}|2\\d{4,5}|[3467]\\d{4}|8\\d{4,6}|9\\d{4,7})|5\\d{4,12}|8\\d{7,12}|9\\d{8,12}|(?:[367]\\d|4[0-24-9])\\d{4,11}", , , , , , , [4, 5, 6, 7, 8, 9, 10, 11, 12, 13], [3]], [, , "1(?:11\\d|[2-9]\\d{3,11})|(?:316|463|(?:51|66|73)2)\\d{3,10}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-578]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|7[1368]|8[2457])|5(?:2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[135-8]|5[468])|7(?:2[1-8]|35|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{4,10}", , , , "1234567890", , , , [3]], [, , "6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}", , , , "664123456", , , [7, 8, 9, 10, 11, 12, 13]], [, , "800\\d{6,10}", , , , "800123456", , , [9, 10, 11, 12, 13]], [, , "(?:8[69][2-68]|9(?:0[01]|3[019]))\\d{6,10}", , , , "900123456", , , [9, 10, 11, 12, 13]], [, , "8(?:10|2[018])\\d{6,10}|828\\d{5}", , , , "810123456", , , [8, 9, 10, 11, 12, 13]], [, , , , , , , , , [-1]], [, , "5(?:0[1-9]|17|[79]\\d)\\d{2,10}|7[28]0\\d{6,10}", , , , "780123456", , , [5, 6, 7, 8, 9, 10, 11, 12, 13]], "AT", 43, "00", "0", , , "0", , , , [[, "(\\d{4})", "$1", ["14"]], [, "(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], [, "(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], [, "(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], [, "(\\d{6})", "$1", ["[18]"]], [, "(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], [, "(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], [[, "(\\d)(\\d{3,12})", "$1 $2", ["1(?:11|[2-9])"], "0$1"], [, "(\\d{3})(\\d{2})", "$1 $2", ["517"], "0$1"], [, "(\\d{2})(\\d{3,5})", "$1 $2", ["5[079]"], "0$1"], [, "(\\d{3})(\\d{3,10})", "$1 $2", ["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:20|32|8)|[89]"], "0$1"], [, "(\\d{4})(\\d{3,9})", "$1 $2", ["[2-467]|5[2-6]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["5"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4,7})", "$1 $2 $3", ["5"], "0$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AU: [, [, , "1(?:[0-79]\\d{7}(?:\\d(?:\\d{2})?)?|8[0-24-9]\\d{7})|[2-478]\\d{8}|1\\d{4,7}", , , , , , , [5, 6, 7, 8, 9, 10, 12]], [, , "(?:(?:2(?:[0-26-9]\\d|3[0-8]|4[02-9]|5[0135-9])|3(?:[0-3589]\\d|4[0-578]|6[1-9]|7[0-35-9])|7(?:[013-57-9]\\d|2[0-8]))\\d{3}|8(?:51(?:0(?:0[03-9]|[12479]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-7])|1(?:[0235689]\\d|1[0-69]|4[0-589]|7[0-47-9])|2(?:0[0-79]|[18][13579]|2[14-9]|3[0-46-9]|[4-6]\\d|7[89]|9[0-4]))|(?:6[0-8]|[78]\\d)\\d{3}|9(?:[02-9]\\d{3}|1(?:(?:[0-58]\\d|6[0135-9])\\d|7(?:0[0-24-9]|[1-9]\\d)|9(?:[0-46-9]\\d|5[0-79])))))\\d{3}", , , , "212345678", , , [9], [8]], [, , "4(?:(?:79|94)[01]|83[0-389])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[0-26-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", , , , "412345678", , , [9]], [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "190[0-26]\\d{6}", , , , "1900123456", , , [10]], [, , "13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", , , , "1300123456", , , [6, 8, 10, 12]], [, , , , , , , , , [-1]], [, , "14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", , , , "147101234", , , [9]], "AU", 61, "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "0", , , "(183[12])|0", , "0011", , [[, "(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["13"]], [, "(\\d{3})(\\d{3})", "$1 $2", ["19"]], [, "(\\d{3})(\\d{4})", "$1 $2", ["180", "1802"]], [, "(\\d{4})(\\d{3,4})", "$1 $2", ["19"]], [, "(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)", "$CC ($1)"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]], [, "(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["130"]]], [[, "(\\d{2})(\\d{3,4})", "$1 $2", ["16"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["16"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["14|4"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[2378]"], "(0$1)", "$CC ($1)"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:30|[89])"]]], [, , "163\\d{2,6}", , , , "1631234", , , [5, 6, 7, 8, 9]], 1, , [, , "1(?:3(?:00\\d{5}|45[0-4])|802)\\d{3}|1[38]00\\d{6}|13\\d{4}", , , , , , , [6, 7, 8, 10, 12]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AW: [, [, , "(?:[25-79]\\d\\d|800)\\d{4}", , , , , , , [7]], [, , "5(?:2\\d|8[1-9])\\d{4}", , , , "5212345"], [, , "(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}", , , , "5601234"], [, , "800\\d{4}", , , , "8001234"], [, , "900\\d{4}", , , , "9001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:28\\d|501)\\d{4}", , , , "5011234"], "AW", 297, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[25-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], AX: [, [, , "2\\d{4,9}|35\\d{4,5}|(?:60\\d\\d|800)\\d{4,6}|7\\d{5,11}|(?:[14]\\d|3[0-46-9]|50)\\d{4,8}", , , , , , , [5, 6, 7, 8, 9, 10, 11, 12]], [, , "18[1-8]\\d{3,6}", , , , "181234567", , , [6, 7, 8, 9]], [, , "4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}", , , , "412345678", , , [6, 7, 8, 9, 10]], [, , "800\\d{4,6}", , , , "800123456", , , [7, 8, 9]], [, , "[67]00\\d{5,6}", , , , "600123456", , , [8, 9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AX", 358, "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "0", , , "0", , "00", , , , [, , , , , , , , , [-1]], , "18", [, , , , , , , , , [-1]], [, , "20\\d{4,8}|60[12]\\d{5,6}|7(?:099\\d{4,5}|5[03-9]\\d{3,7})|20[2-59]\\d\\d|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:10|29|3[09]|70[1-5]\\d)\\d{4,8}", , , , "10112345"], , , [, , , , , , , , , [-1]]], AZ: [, [, , "365\\d{6}|(?:[124579]\\d|60|88)\\d{7}", , , , , , , [9], [7]], [, , "(?:2[12]428|3655[02])\\d{4}|(?:2(?:22[0-79]|63[0-28])|3654)\\d{5}|(?:(?:1[28]|46)\\d|2(?:[014-6]2|[23]3))\\d{6}", , , , "123123456", , , , [7]], [, , "36554\\d{4}|(?:[16]0|4[04]|5[015]|7[07]|99)\\d{7}", , , , "401234567"], [, , "88\\d{7}", , , , "881234567"], [, , "900200\\d{3}", , , , "900200123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "AZ", 994, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[1-9]"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["90"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[28]|2|365|46", "1[28]|2|365[45]|46", "1[28]|2|365(?:4|5[02])|46"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-9]"], "0$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BA: [, [, , "6\\d{8}|(?:[35689]\\d|49|70)\\d{6}", , , , , , , [8, 9], [6]], [, , "(?:3(?:[05-79][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}", , , , "30212345", , , [8], [6]], [, , "6040\\d{5}|6(?:03|[1-356]|44|7\\d)\\d{6}", , , , "61123456"], [, , "8[08]\\d{6}", , , , "80123456", , , [8]], [, , "9[0246]\\d{6}", , , , "90123456", , , [8]], [, , "8[12]\\d{6}", , , , "82123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BA", 387, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})", "$1-$2", ["[2-9]"]], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[1-3]|[7-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2-$3", ["[3-5]|6[56]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["6"], "0$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "703[235]0\\d{3}|70(?:2[0-5]|3[0146]|[56]0)\\d{4}", , , , "70341234", , , [8]], , , [, , , , , , , , , [-1]]], BB: [, [, , "(?:246|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "246521[0369]\\d{3}|246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7[35]7|9(?:1[89]|63))\\d{4}", , , , "2464123456", , , , [7]], [, , "246(?:(?:2(?:[3568]\\d|4[0-57-9])|3(?:5[2-9]|6[0-6])|4(?:46|5\\d)|69[5-7]|8(?:[2-5]\\d|83))\\d|52(?:1[147]|20))\\d{3}", , , , "2462501234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "(?:246976|900[2-9]\\d\\d)\\d{4}", , , , "9002123456", , , , [7]], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "24631\\d{5}", , , , "2463101234", , , , [7]], "BB", 1, "011", "1", , , "([2-9]\\d{6})$|1", "246$1", , , , , [, , , , , , , , , [-1]], , "246", [, , , , , , , , , [-1]], [, , "246(?:292|367|4(?:1[7-9]|3[01]|4[47-9]|67)|7(?:1[2-9]|2\\d|3[016]|53))\\d{4}", , , , "2464301234", , , , [7]], , , [, , , , , , , , , [-1]]], BD: [, [, , "[1-469]\\d{9}|8[0-79]\\d{7,8}|[2-79]\\d{8}|[2-9]\\d{7}|[3-9]\\d{6}|[57-9]\\d{5}", , , , , , , [6, 7, 8, 9, 10]], [, , "(?:4(?:31\\d\\d|423)|5222)\\d{3}(?:\\d{2})?|8332[6-9]\\d\\d|(?:3(?:03[56]|224)|4(?:22[25]|653))\\d{3,4}|(?:3(?:42[47]|529|823)|4(?:027|525|65(?:28|8))|562|6257|7(?:1(?:5[3-5]|6[12]|7[156]|89)|22[589]56|32|42675|52(?:[25689](?:56|8)|[347]8)|71(?:6[1267]|75|89)|92374)|82(?:2[59]|32)56|9(?:03[23]56|23(?:256|373)|31|5(?:1|2[4589]56)))\\d{3}|(?:3(?:02[348]|22[35]|324|422)|4(?:22[67]|32[236-9]|6(?:2[46]|5[57])|953)|5526|6(?:024|6655)|81)\\d{4,5}|(?:2(?:7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|1[1-6]|2[0157-9]|3[1-69]|41|6[1-35]|7[1-5]|8[1-8]|9[0-6])|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0136-9]|7[0-7]|8[014-9]))|3(?:0(?:2[025-79]|3[2-4])|181|22[12]|32[2356]|824)|4(?:02[09]|22[348]|32[045]|523|6(?:27|54))|666(?:22|53)|7(?:22[57-9]|42[56]|82[35])8|8(?:0[124-9]|2(?:181|2[02-4679]8)|4[12]|[5-7]2)|9(?:[04]2|2(?:2|328)|81))\\d{4}|(?:2(?:222|[45]\\d)\\d|3(?:1(?:2[5-7]|[5-7])|425|822)|4(?:033|1\\d|[257]1|332|4(?:2[246]|5[25])|6(?:2[35]|56|62)|8(?:23|54)|92[2-5])|5(?:02[03489]|22[457]|32[35-79]|42[46]|6(?:[18]|53)|724|826)|6(?:023|2(?:2[2-5]|5[3-5]|8)|32[3478]|42[34]|52[47]|6(?:[18]|6(?:2[34]|5[24]))|[78]2[2-5]|92[2-6])|7(?:02|21\\d|[3-589]1|6[12]|72[24])|8(?:217|3[12]|[5-7]1)|9[24]1)\\d{5}|(?:(?:3[2-8]|5[2-57-9]|6[03-589])1|4[4689][18])\\d{5}|[59]1\\d{5}", , , , "27111234"], [, , "(?:1[13-9]\\d|644)\\d{7}|(?:3[78]|44|66)[02-9]\\d{7}", , , , "1812345678", , , [10]], [, , "80[03]\\d{7}", , , , "8001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "96(?:0[469]|1[0-47]|3[389]|43|6[69]|7[78])\\d{6}", , , , "9604123456", , , [10]], "BD", 880, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{4,6})", "$1-$2", ["31[5-8]|[459]1"], "0$1"], [, "(\\d{3})(\\d{3,7})", "$1-$2", ["3(?:[67]|8[013-9])|4(?:6[168]|7|[89][18])|5(?:6[128]|9)|6(?:[15]|28|4[14])|7[2-589]|8(?:0[014-9]|[12])|9[358]|(?:3[2-5]|4[235]|5[2-578]|6[0389]|76|8[3-7]|9[24])1|(?:44|66)[01346-9]"], "0$1"], [, "(\\d{4})(\\d{3,6})", "$1-$2", ["[13-9]|22"], "0$1"], [, "(\\d)(\\d{7,8})", "$1-$2", ["2"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BE: [, [, , "4\\d{8}|[1-9]\\d{7}", , , , , , , [8, 9]], [, , "80[2-8]\\d{5}|(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}", , , , "12345678", , , [8]], [, , "4[5-9]\\d{7}", , , , "470123456", , , [9]], [, , "800[1-9]\\d{4}", , , , "80012345", , , [8]], [, , "(?:70(?:2[0-57]|3[04-7]|44|6[4-69]|7[0579])|90\\d\\d)\\d{4}", , , , "90012345", , , [8]], [, , "7879\\d{4}", , , , "78791234", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BE", 32, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:80|9)0"], "0$1"], [, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[239]|4[23]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[15-8]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "78(?:0[57]|1[014-8]|2[25]|3[15-8]|48|[56]0|7[06-8]|9\\d)\\d{4}", , , , "78102345", , , [8]], , , [, , , , , , , , , [-1]]], BF: [, [, , "[025-7]\\d{7}", , , , , , , [8]], [, , "2(?:0(?:49|5[23]|6[5-7]|9[016-9])|4(?:4[569]|5[4-6]|6[5-7]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}", , , , "20491234"], [, , "(?:0[1-35-7]|5[0-8]|[67]\\d)\\d{6}", , , , "70123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BF", 226, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[025-7]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BG: [, [, , "00800\\d{7}|[2-7]\\d{6,7}|[89]\\d{6,8}|2\\d{5}", , , , , , , [6, 7, 8, 9, 12], [4, 5]], [, , "2\\d{5,7}|(?:43[1-6]|70[1-9])\\d{4,5}|(?:[36]\\d|4[124-7]|[57][1-9]|8[1-6]|9[1-7])\\d{5,6}", , , , "2123456", , , [6, 7, 8], [4, 5]], [, , "(?:43[07-9]|99[69]\\d)\\d{5}|(?:8[7-9]|98)\\d{7}", , , , "43012345", , , [8, 9]], [, , "(?:00800\\d\\d|800)\\d{5}", , , , "80012345", , , [8, 12]], [, , "90\\d{6}", , , , "90123456", , , [8]], [, , "700\\d{5}", , , , "70012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BG", 359, "00", "0", , , "0", , , , [[, "(\\d{6})", "$1", ["1"]], [, "(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], [[, "(\\d)(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["2"], "0$1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["43[1-6]|70[1-9]"], "0$1"], [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:70|8)0"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["43[1-7]|7"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[48]|9[08]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BH: [, [, , "[136-9]\\d{7}", , , , , , , [8]], [, , "(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9]|88)|9[69][69])|7(?:[07]\\d\\d|1(?:11|78)))\\d{4}", , , , "17001234"], [, , "(?:3(?:[0-79]\\d|8[0-57-9])\\d|6(?:3(?:00|33|6[16])|441|6(?:3[03-9]|[69]\\d|7[0-6])))\\d{4}", , , , "36001234"], [, , "8[02369]\\d{6}", , , , "80123456"], [, , "(?:87|9[0-8])\\d{6}", , , , "90123456"], [, , "84\\d{6}", , , , "84123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BH", 973, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[13679]|8[02-4679]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BI: [, [, , "(?:[267]\\d|31)\\d{6}", , , , , , , [8]], [, , "(?:22|31)\\d{6}", , , , "22201234"], [, , "(?:29|[67][125-9])\\d{6}", , , , "79561234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BI", 257, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2367]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BJ: [, [, , "[24-689]\\d{7}", , , , , , , [8]], [, , "2(?:02|1[037]|2[45]|3[68]|4\\d)\\d{5}", , , , "20211234"], [, , "(?:4[0-356]|[56]\\d|9[013-9])\\d{6}", , , , "90011234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "857[58]\\d{4}", , , , "85751234"], "BJ", 229, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-689]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "81\\d{6}", , , , "81123456"], , , [, , , , , , , , , [-1]]], BL: [, [, , "590\\d{6}|(?:69|80|9\\d)\\d{7}", , , , , , , [9]], [, , "590(?:2[7-9]|3[3-7]|5[12]|87)\\d{4}", , , , "590271234"], [, , "69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}", , , , "690001234"], [, , "80[0-5]\\d{6}", , , , "800012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:(?:395|76[018])\\d|475[0-5])\\d{4}", , , , "976012345"], "BL", 590, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BM: [, [, , "(?:441|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "441(?:[46]\\d\\d|5(?:4\\d|60|89))\\d{4}", , , , "4414123456", , , , [7]], [, , "441(?:[2378]\\d|5[0-39]|92)\\d{5}", , , , "4413701234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "BM", 1, "011", "1", , , "([2-9]\\d{6})$|1", "441$1", , , , , [, , , , , , , , , [-1]], , "441", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BN: [, [, , "[2-578]\\d{6}", , , , , , , [7]], [, , "22[0-7]\\d{4}|(?:2[013-9]|[34]\\d|5[0-25-9])\\d{5}", , , , "2345678"], [, , "(?:22[89]|[78]\\d\\d)\\d{4}", , , , "7123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5[34]\\d{5}", , , , "5345678"], "BN", 673, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-578]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BO: [, [, , "(?:[2-467]\\d\\d|8001)\\d{5}", , , , , , , [8, 9], [7]], [, , "(?:2(?:2\\d\\d|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d\\d|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:[27]\\d|3[2-4]|4[248]|5[24]|6[2-6]))|4(?:4\\d\\d|6(?:11|[24689]\\d|72)))\\d{4}", , , , "22123456", , , [8], [7]], [, , "[67]\\d{7}", , , , "71234567", , , [8]], [, , "8001[07]\\d{4}", , , , "800171234", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BO", 591, "00(?:1\\d)?", "0", , , "0(1\\d)?", , , , [[, "(\\d)(\\d{7})", "$1 $2", ["[23]|4[46]"], , "0$CC $1"], [, "(\\d{8})", "$1", ["[67]"], , "0$CC $1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["8"], , "0$CC $1"]], , [, , , , , , , , , [-1]], , , [, , "8001[07]\\d{4}", , , , , , , [9]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BQ: [, [, , "(?:[34]1|7\\d)\\d{5}", , , , , , , [7]], [, , "(?:318[023]|41(?:6[023]|70)|7(?:1[578]|2[05]|50)\\d)\\d{3}", , , , "7151234"], [, , "(?:31(?:8[14-8]|9[14578])|416[14-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}", , , , "3181234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BQ", 599, "00", , , , , , , , , , [, , , , , , , , , [-1]], , "[347]", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BR: [, [, , "(?:[1-46-9]\\d\\d|5(?:[0-46-9]\\d|5[0-46-9]))\\d{8}|[1-9]\\d{9}|[3589]\\d{8}|[34]\\d{7}", , , , , , , [8, 9, 10, 11]], [, , "(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}", , , , "1123456789", , , [10], [8]], [, , "(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])(?:7|9\\d)\\d{7}", , , , "11961234567", , , [10, 11], [8, 9]], [, , "800\\d{6,7}", , , , "800123456", , , [9, 10]], [, , "300\\d{6}|[59]00\\d{6,7}", , , , "300123456", , , [9, 10]], [, , "(?:30[03]\\d{3}|4(?:0(?:0\\d|20)|370))\\d{4}|300\\d{5}", , , , "40041234", , , [8, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BR", 55, "00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)", "0", , , "(?:0|90)(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?", "$2", , , [[, "(\\d{3,6})", "$1", ["1(?:1[25-8]|2[357-9]|3[02-68]|4[12568]|5|6[0-8]|8[015]|9[0-47-9])|321|610"]], [, "(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]], [, "(\\d{4})(\\d{4})", "$1-$2", ["[2-57]", "[2357]|4(?:[0-24-9]|3(?:[0-689]|7[1-9]))"]], [, "(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], [, "(\\d{5})(\\d{4})", "$1-$2", ["9"]], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)", "0 $CC ($1)"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)", "0 $CC ($1)"]], [[, "(\\d{4})(\\d{4})", "$1-$2", ["300|4(?:0[02]|37)", "4(?:02|37)0|[34]00"]], [, "(\\d{3})(\\d{2,3})(\\d{4})", "$1 $2 $3", ["(?:[358]|90)0"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2-$3", ["(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-57]"], "($1)", "0 $CC ($1)"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1 $2-$3", ["[16][1-9]|[2-57-9]"], "($1)", "0 $CC ($1)"]], [, , , , , , , , , [-1]], , , [, , "30(?:0\\d{5,7}|3\\d{7})|40(?:0\\d|20)\\d{4}|800\\d{6,7}", , , , , , , [8, 9, 10]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BS: [, [, , "(?:242|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-5]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}", , , , "2423456789", , , , [7]], [, , "242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}", , , , "2423591234", , , , [7]], [, , "242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456", , , , [7]], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "BS", 1, "011", "1", , , "([3-8]\\d{6})$|1", "242$1", , , , , [, , , , , , , , , [-1]], , "242", [, , , , , , , , , [-1]], [, , "242225\\d{4}", , , , "2422250123"], , , [, , , , , , , , , [-1]]], BT: [, [, , "[17]\\d{7}|[2-8]\\d{6}", , , , , , , [7, 8], [6]], [, , "(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}", , , , "2345678", , , [7], [6]], [, , "(?:1[67]|77)\\d{6}", , , , "17123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BT", 975, "00", , , , , , , , [[, "(\\d{3})(\\d{3})", "$1 $2", ["[2-7]"]], [, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]]], [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-68]|7[246]"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[67]|7"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BW: [, [, , "(?:0800|(?:[37]|800)\\d)\\d{6}|(?:[2-6]\\d|90)\\d{5}", , , , , , , [7, 8, 10]], [, , "(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[013]|81)|4(?:6[03]|7[1267]|9[0-5])|5(?:3[03489]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}", , , , "2401234", , , [7]], [, , "(?:321|7(?:[1-7]\\d|8[0-4]))\\d{5}", , , , "71123456", , , [8]], [, , "(?:0800|800\\d)\\d{6}", , , , "0800012345", , , [10]], [, , "90\\d{5}", , , , "9012345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "79(?:1(?:[01]\\d|2[0-7])|2[0-7]\\d)\\d{3}", , , , "79101234", , , [8]], "BW", 267, "00", , , , , , , , [[, "(\\d{2})(\\d{5})", "$1 $2", ["90"]], [, "(\\d{3})(\\d{4})", "$1 $2", ["[24-6]|3[15-9]"]], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37]"]], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["0"]], [, "(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BY: [, [, , "(?:[12]\\d|33|44|902)\\d{7}|8(?:0[0-79]\\d{5,7}|[1-7]\\d{9})|8(?:1[0-489]|[5-79]\\d)\\d{7}|8[1-79]\\d{6,7}|8[0-79]\\d{5}|8\\d{5}", , , , , , , [6, 7, 8, 9, 10, 11], [5]], [, , "(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d\\d)|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}", , , , "152450911", , , [9], [5, 6, 7]], [, , "(?:2(?:5[5-79]|9[1-9])|(?:33|44)\\d)\\d{6}", , , , "294911911", , , [9]], [, , "800\\d{3,7}|8(?:0[13]|20\\d)\\d{7}", , , , "8011234567"], [, , "(?:810|902)\\d{7}", , , , "9021234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "249\\d{6}", , , , "249123456", , , [9]], "BY", 375, "810", "8", , , "0|80?", , "8~10", , [[, "(\\d{3})(\\d{3})", "$1 $2", ["800"], "8 $1"], [, "(\\d{3})(\\d{2})(\\d{2,4})", "$1 $2 $3", ["800"], "8 $1"], [, "(\\d{4})(\\d{2})(\\d{3})", "$1 $2-$3", ["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])", "1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"], "8 0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["1(?:[56]|7[467])|2[1-3]"], "8 0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-4]"], "8 0$1"], [, "(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[89]"], "8 $1"]], , [, , , , , , , , , [-1]], , , [, , "800\\d{3,7}|(?:8(?:0[13]|10|20\\d)|902)\\d{7}"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], BZ: [, [, , "(?:0800\\d|[2-8])\\d{6}", , , , , , , [7, 11]], [, , "(?:2(?:[02]\\d|36|[68]0)|[3-58](?:[02]\\d|[68]0)|7(?:[02]\\d|32|[68]0))\\d{4}", , , , "2221234", , , [7]], [, , "6[0-35-7]\\d{5}", , , , "6221234", , , [7]], [, , "0800\\d{7}", , , , "08001234123", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "BZ", 501, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[2-8]"]], [, "(\\d)(\\d{3})(\\d{4})(\\d{3})", "$1-$2-$3-$4", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CA: [, [, , "(?:[2-8]\\d|90)\\d{8}|3\\d{6}", , , , , , , [7, 10]], [, , "(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}", , , , "5062345678", , , [10], [7]], [, , "(?:2(?:04|[23]6|[48]9|50|63)|3(?:06|43|54|6[578]|82)|4(?:03|1[68]|[26]8|3[178]|50|74)|5(?:06|1[49]|48|79|8[147])|6(?:04|[18]3|39|47|72)|7(?:0[59]|42|53|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}", , , , "5062345678", , , [10], [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456", , , [10]], [, , "900[2-9]\\d{6}", , , , "9002123456", , , [10]], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|(?:5(?:00|2[125-9]|33|44|66|77|88)|622)[2-9]\\d{6}", , , , "5002345678", , , [10]], [, , "600[2-9]\\d{6}", , , , "6002012345", , , [10]], "CA", 1, "011", "1", , , "1", , , 1, , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "310\\d{4}", , , , "3101234", , , [7]], , , [, , , , , , , , , [-1]]], CC: [, [, , "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", , , , , , , [6, 7, 8, 9, 10, 12]], [, , "8(?:51(?:0(?:02|31|60|89)|1(?:18|76)|223)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:[06]8|22)|4[29]8|62\\d|70[23]|959))\\d{3}", , , , "891621234", , , [9], [8]], [, , "4(?:(?:79|94)[01]|83[0-389])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[0-26-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", , , , "412345678", , , [9]], [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "190[0-26]\\d{6}", , , , "1900123456", , , [10]], [, , "13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", , , , "1300123456", , , [6, 8, 10, 12]], [, , , , , , , , , [-1]], [, , "14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", , , , "147101234", , , [9]], "CC", 61, "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "0", , , "([59]\\d{7})$|0", "8$1", "0011", , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CD: [, [, , "[189]\\d{8}|[1-68]\\d{6}", , , , , , , [7, 9]], [, , "12\\d{7}|[1-6]\\d{6}", , , , "1234567"], [, , "88\\d{5}|(?:8[0-59]|9[017-9])\\d{7}", , , , "991234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CD", 243, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], [, "(\\d{2})(\\d{5})", "$1 $2", ["[1-6]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CF: [, [, , "(?:[27]\\d{3}|8776)\\d{4}", , , , , , , [8]], [, , "2[12]\\d{6}", , , , "21612345"], [, , "7[024-7]\\d{6}", , , , "70012345"], [, , , , , , , , , [-1]], [, , "8776\\d{4}", , , , "87761234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CF", 236, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[278]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CG: [, [, , "222\\d{6}|(?:0\\d|80)\\d{7}", , , , , , , [9]], [, , "222[1-589]\\d{5}", , , , "222123456"], [, , "026(?:1[0-5]|6[6-9])\\d{4}|0(?:[14-6]\\d\\d|2(?:40|5[5-8]|6[07-9]))\\d{5}", , , , "061234567"], [, , , , , , , , , [-1]], [, , "80[0-2]\\d{6}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CG", 242, "00", , , , , , , , [[, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[02]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CH: [, [, , "8\\d{11}|[2-9]\\d{8}", , , , , , , [9, 12]], [, , "(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}", , , , "212345678", , , [9]], [, , "7[35-9]\\d{7}", , , , "781234567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "90[016]\\d{6}", , , , "900123456", , , [9]], [, , "84[0248]\\d{6}", , , , "840123456", , , [9]], [, , "878\\d{6}", , , , "878123456", , , [9]], [, , , , , , , , , [-1]], "CH", 41, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8[047]|90"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]|81"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["8"], "0$1"]], , [, , "74[0248]\\d{6}", , , , "740123456", , , [9]], , , [, , , , , , , , , [-1]], [, , "5[18]\\d{7}", , , , "581234567", , , [9]], , , [, , "860\\d{9}", , , , "860123456789", , , [12]]], CI: [, [, , "[02]\\d{9}", , , , , , , [10]], [, , "2(?:[15]\\d{3}|7(?:2(?:0[23]|1[2357]|2[245]|3[45]|4[3-5])|3(?:06|1[69]|[2-6]7)))\\d{5}", , , , "2123456789"], [, , "0[157]\\d{8}", , , , "0123456789"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CI", 225, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d)(\\d{5})", "$1 $2 $3 $4", ["2"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3 $4", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CK: [, [, , "[2-578]\\d{4}", , , , , , , [5]], [, , "(?:2\\d|3[13-7]|4[1-5])\\d{3}", , , , "21234"], [, , "[578]\\d{4}", , , , "71234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CK", 682, "00", , , , , , , , [[, "(\\d{2})(\\d{3})", "$1 $2", ["[2-578]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CL: [, [, , "12300\\d{6}|6\\d{9,10}|[2-9]\\d{8}", , , , , , , [9, 10, 11]], [, , "2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|3(?:2\\d\\d|3(?:[03467]\\d|1[0-35-9]|2[1-9]|5[0-24-9]|8[0-3])|600)|646[59])|80[1-9]\\d\\d|9(?:3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|7[1-9]\\d\\d|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2458])\\d{7}", , , , "221234567", , , [9]], [, , "2(?:1982[0-6]|3314[05-9])\\d{3}|(?:2(?:1(?:160|962)|3(?:2\\d\\d|3(?:[03467]\\d|1[0-35-9]|2[1-9]|5[0-24-9]|8[0-3])|600)|646[59])|80[1-9]\\d\\d|9(?:3(?:[0-57-9]\\d\\d|6(?:0[02-9]|[1-9]\\d))|6(?:[0-8]\\d\\d|9(?:[02-79]\\d|1[05-9]))|7[1-9]\\d\\d|9(?:[03-9]\\d\\d|1(?:[0235-9]\\d|4[0-24-9])|2(?:[0-79]\\d|8[0-46-9]))))\\d{4}|(?:22|3[2-5]|[47][1-35]|5[1-3578]|6[13-57]|8[1-9]|9[2458])\\d{7}", , , , "221234567", , , [9]], [, , "(?:123|8)00\\d{6}", , , , "800123456", , , [9, 11]], [, , , , , , , , , [-1]], [, , "600\\d{7,8}", , , , "6001234567", , , [10, 11]], [, , , , , , , , , [-1]], [, , "44\\d{7}", , , , "441234567", , , [9]], "CL", 56, "(?:0|1(?:1[0-69]|2[02-5]|5[13-58]|69|7[0167]|8[018]))0", , , , , , , 1, [[, "(\\d{4})", "$1", ["1(?:[03-589]|21)|[29]0|78"]], [, "(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]], [[, "(\\d{5})(\\d{4})", "$1 $2", ["219", "2196"], "($1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["44"]], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2[1-36]"], "($1)"], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["9[2-9]"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["3[2-5]|[47]|5[1-3578]|6[13-57]|8(?:0[1-9]|[1-9])"], "($1)"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["60|8"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["60"]]], [, , , , , , , , , [-1]], , , [, , "600\\d{7,8}", , , , , , , [10, 11]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CM: [, [, , "[26]\\d{8}|88\\d{6,7}", , , , , , , [8, 9]], [, , "2(?:22|33)\\d{6}", , , , "222123456", , , [9]], [, , "(?:24[23]|6[25-9]\\d)\\d{6}", , , , "671234567", , , [9]], [, , "88\\d{6,7}", , , , "88012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CM", 237, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["88"]], [, "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]|88"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CN: [, [, , "1[127]\\d{8,9}|2\\d{9}(?:\\d{2})?|[12]\\d{6,7}|86\\d{6}|(?:1[03-689]\\d|6)\\d{7,9}|(?:[3-579]\\d|8[0-57-9])\\d{6,9}", , , , , , , [7, 8, 9, 10, 11, 12], [5, 6]], [, , "(?:10(?:[02-79]\\d\\d|[18](?:0[1-9]|[1-9]\\d))|21(?:[18](?:0[1-9]|[1-9]\\d)|[2-79]\\d\\d))\\d{5}|(?:43[35]|754)\\d{7,8}|8(?:078\\d{7}|51\\d{7,8})|(?:10|(?:2|85)1|43[35]|754)(?:100\\d\\d|95\\d{3,4})|(?:2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[12])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[57]|6[09])|8(?:71|98))(?:[02-8]\\d{7}|1(?:0(?:0\\d\\d(?:\\d{3})?|[1-9]\\d{5})|[1-9]\\d{6})|9(?:[0-46-9]\\d{6}|5\\d{3}(?:\\d(?:\\d{2})?)?))|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[46-9]|5[2-9]|6[47-9]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-3689]|6[2368]|9[02-9])|8(?:1[236-8]|2[5-7]|3\\d|5[2-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[02-8]\\d{6}|1(?:0(?:0\\d\\d(?:\\d{2})?|[1-9]\\d{4})|[1-9]\\d{5})|9(?:[0-46-9]\\d{5}|5\\d{3,5}))", , , , "1012345678", , , [7, 8, 9, 10, 11], [5, 6]], [, , "1740[0-5]\\d{6}|1(?:[38]\\d|4[57]|[59][0-35-9]|6[25-7]|7[0-35-8])\\d{8}", , , , "13123456789", , , [11]], [, , "(?:(?:10|21)8|8)00\\d{7}", , , , "8001234567", , , [10, 12]], [, , "16[08]\\d{5}", , , , "16812345", , , [8]], [, , "10(?:10\\d{4}|96\\d{3,4})|400\\d{7}|950\\d{7,8}|(?:2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}", , , , "4001234567", , , [7, 8, 9, 10, 11], [5, 6]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CN", 86, "00|1(?:[12]\\d|79)\\d\\d00", "0", , , "(1(?:[12]\\d|79)\\d\\d)|0", , "00", , [[, "(\\d{5,6})", "$1", ["10|96"]], [, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]", "(?:10|2[0-57-9])(?:10|9[56])", "10(?:10|9[56])|2[0-57-9](?:100|9[56])"], "0$1", "$CC $1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["[1-9]", "1[1-9]|26|[3-9]|(?:10|2[0-57-9])(?:[0-8]|9[0-47-9])", "1(?:0(?:[0-8]|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[02-8]|1(?:0[1-9]|[1-9])|9[0-47-9])|6)|[3-9]"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["16[08]"]], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1", "$CC $1"], [, "(\\d{4})(\\d{4})", "$1 $2", ["[1-9]", "1(?:0(?:[02-8]|1[1-9]|9[0-47-9])|[1-9])|2(?:[0-57-9](?:[0-8]|9[0-47-9])|6)|[3-9]", "1(?:0(?:[02-8]|1[1-9]|9[0-47-9])|[1-9])|26|3(?:[0268]|4[0-8]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|8[1-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|5(?:0|[23][0-8])|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9])|(?:33|85[23]9)[0-46-9]|(?:2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[0-8]|9[0-47-9])", "1(?:0[02-8]|[1-9])|2(?:[0-57-9][0-8]|6)|3(?:[0268]|3[0-46-9]|4[0-8]|9[079])|4(?:[049]|2[02-68]|[35]0|6[0-356]|8[014-9])|5(?:0|2[0-24-689]|4[0-2457-9]|6[057-9]|90)|6(?:[0-24578]|3[06-9]|6[14-79]|9[03-9])|7(?:0[02-9]|2[0135-79]|3[23]|4[0-27-9]|6[1457]|8)|8(?:[046]|1[01459]|2[0-489]|5(?:0|[23](?:[02-8]|1[1-9]|9[0-46-9]))|8[0-2459]|9[09])|9(?:0[0457]|1[08]|[268]|4[024-9]|5[06-9])|(?:10|2[0-57-9])9[0-47-9]|(?:101|58|85[23]10)[1-9]|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:[02-8]|1(?:0[1-9]|[1-9])|9[0-47-9])"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"], , "$CC $1"], [, "(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", , 1]], [[, "(\\d{2})(\\d{5,6})", "$1 $2", ["(?:10|2[0-57-9])[19]", "(?:10|2[0-57-9])(?:10|9[56])", "10(?:10|9[56])|2[0-57-9](?:100|9[56])"], "0$1", "$CC $1"], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["3(?:[157]|35|49|9[1-68])|4(?:[17]|2[179]|6[47-9]|8[23])|5(?:[1357]|2[37]|4[36]|6[1-46]|80)|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])|(?:4[35]|59|85)[1-9]", "(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[1-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))[19]", "85[23](?:10|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:10|9[56])", "85[23](?:100|95)|(?:3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[47-9]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[36-8]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100|9[56])"], "0$1", "$CC $1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["(?:4|80)0"]], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|2(?:[02-57-9]|1[1-9])", "10|2(?:[02-57-9]|1[1-9])", "10[0-79]|2(?:[02-57-9]|1[1-79])|(?:10|21)8(?:0[1-9]|[1-9])"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["3(?:[3-59]|7[02-68])|4(?:[26-8]|3[3-9]|5[2-9])|5(?:3[03-9]|[468]|7[028]|9[2-46-9])|6|7(?:[0-247]|3[04-9]|5[0-4689]|6[2368])|8(?:[1-358]|9[1-7])|9(?:[013479]|5[1-5])|(?:[34]1|55|79|87)[02-9]"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{7,8})", "$1 $2", ["9"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["80"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[3-578]"], "0$1", "$CC $1", 1], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["1[3-9]"], , "$CC $1"], [, "(\\d{2})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["[12]"], "0$1", , 1]], [, , , , , , , , , [-1]], , , [, , "(?:(?:10|21)8|[48])00\\d{7}|950\\d{7,8}", , , , , , , [10, 11, 12]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CO: [, [, , "(?:60\\d\\d|9101)\\d{6}|(?:1\\d|3)\\d{9}", , , , , , , [10, 11], [7]], [, , "601055(?:[0-4]\\d|50)\\d\\d|6010(?:[0-4]\\d|5[0-4])\\d{4}|60[124-8][2-9]\\d{6}", , , , "6012345678", , , [10], [7]], [, , "3333(?:0(?:0\\d|1[0-5])|[4-9]\\d\\d)\\d{3}|(?:3(?:24[1-9]|3(?:00|3[0-24-9]))|9101)\\d{6}|3(?:0[0-5]|1\\d|2[0-3]|5[01]|70)\\d{7}", , , , "3211234567", , , [10]], [, , "1800\\d{7}", , , , "18001234567", , , [11]], [, , "19(?:0[01]|4[78])\\d{7}", , , , "19001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CO", 57, "00(?:4(?:[14]4|56)|[579])", "0", , , "0(4(?:[14]4|56)|[579])?", , , , [[, "(\\d{3})(\\d{7})", "$1 $2", ["6"], "($1)", "0$CC $1"], [, "(\\d{3})(\\d{7})", "$1 $2", ["3[0-357]|91"], , "0$CC $1"], [, "(\\d)(\\d{3})(\\d{7})", "$1-$2-$3", ["1"], "0$1"]], [[, "(\\d{3})(\\d{7})", "$1 $2", ["6"], "($1)", "0$CC $1"], [, "(\\d{3})(\\d{7})", "$1 $2", ["3[0-357]|91"], , "0$CC $1"], [, "(\\d)(\\d{3})(\\d{7})", "$1 $2 $3", ["1"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CR: [, [, , "(?:8\\d|90)\\d{8}|(?:[24-8]\\d{3}|3005)\\d{4}", , , , , , , [8, 10]], [, , "210[7-9]\\d{4}|2(?:[024-7]\\d|1[1-9])\\d{5}", , , , "22123456", , , [8]], [, , "(?:3005\\d|6500[01])\\d{3}|(?:5[07]|6[0-4]|7[0-3]|8[3-9])\\d{6}", , , , "83123456", , , [8]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "90[059]\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:210[0-6]|4\\d{3}|5100)\\d{4}", , , , "40001234", , , [8]], "CR", 506, "00", , , , "(19(?:0[0-2468]|1[09]|20|66|77|99))", , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[3-9]"], , "$CC $1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[89]"], , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CU: [, [, , "[27]\\d{6,7}|[34]\\d{5,7}|63\\d{6}|(?:5|8\\d\\d)\\d{7}", , , , , , , [6, 7, 8, 10], [4, 5]], [, , "(?:3[23]|4[89])\\d{4,6}|(?:31|4[36]|8(?:0[25]|78)\\d)\\d{6}|(?:2[1-4]|4[1257]|7\\d)\\d{5,6}", , , , "71234567", , , , [4, 5]], [, , "(?:5\\d|63)\\d{6}", , , , "51234567", , , [8]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , , , , , , , , [-1]], [, , "807\\d{7}", , , , "8071234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CU", 53, "119", "0", , , "0", , , , [[, "(\\d{2})(\\d{4,6})", "$1 $2", ["2[1-4]|[34]"], "(0$1)"], [, "(\\d)(\\d{6,7})", "$1 $2", ["7"], "(0$1)"], [, "(\\d)(\\d{7})", "$1 $2", ["[56]"], "0$1"], [, "(\\d{3})(\\d{7})", "$1 $2", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CV: [, [, , "(?:[2-59]\\d\\d|800)\\d{4}", , , , , , , [7]], [, , "2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}", , , , "2211234"], [, , "(?:36|5[1-389]|9\\d)\\d{5}", , , , "9911234"], [, , "800\\d{4}", , , , "8001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:3[3-5]|4[356])\\d{5}", , , , "3401234"], "CV", 238, "0", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2-589]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CW: [, [, , "(?:[34]1|60|(?:7|9\\d)\\d)\\d{5}", , , , , , , [7, 8]], [, , "9(?:4(?:3[0-5]|4[14]|6\\d)|50\\d|7(?:2[014]|3[02-9]|4[4-9]|6[357]|77|8[7-9])|8(?:3[39]|[46]\\d|7[01]|8[57-9]))\\d{4}", , , , "94351234"], [, , "953[01]\\d{4}|9(?:5[12467]|6[5-9])\\d{5}", , , , "95181234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "60[0-2]\\d{4}", , , , "6001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "CW", 599, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[3467]"]], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["9[4-8]"]]], , [, , "955\\d{5}", , , , "95581234", , , [8]], 1, "[69]", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CX: [, [, , "1(?:[0-79]\\d{8}(?:\\d{2})?|8[0-24-9]\\d{7})|[148]\\d{8}|1\\d{5,7}", , , , , , , [6, 7, 8, 9, 10, 12]], [, , "8(?:51(?:0(?:01|30|59|88)|1(?:17|46|75)|2(?:22|35))|91(?:00[6-9]|1(?:[28]1|49|78)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}", , , , "891641234", , , [9], [8]], [, , "4(?:(?:79|94)[01]|83[0-389])\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[0-26-9]|7[02-8]|8[0-24-9]|9[0-37-9])\\d{6}", , , , "412345678", , , [9]], [, , "180(?:0\\d{3}|2)\\d{3}", , , , "1800123456", , , [7, 10]], [, , "190[0-26]\\d{6}", , , , "1900123456", , , [10]], [, , "13(?:00\\d{6}(?:\\d{2})?|45[0-4]\\d{3})|13\\d{4}", , , , "1300123456", , , [6, 8, 10, 12]], [, , , , , , , , , [-1]], [, , "14(?:5(?:1[0458]|[23][458])|71\\d)\\d{4}", , , , "147101234", , , [9]], "CX", 61, "001[14-689]|14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011", "0", , , "([59]\\d{7})$|0", "8$1", "0011", , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], CY: [, [, , "(?:[279]\\d|[58]0)\\d{6}", , , , , , , [8]], [, , "2[2-6]\\d{6}", , , , "22345678"], [, , "9(?:10|[4-79]\\d)\\d{5}", , , , "96123456"], [, , "800\\d{5}", , , , "80001234"], [, , "90[09]\\d{5}", , , , "90012345"], [, , "80[1-9]\\d{5}", , , , "80112345"], [, , "700\\d{5}", , , , "70012345"], [, , , , , , , , , [-1]], "CY", 357, "00", , , , , , , , [[, "(\\d{2})(\\d{6})", "$1 $2", ["[257-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:50|77)\\d{6}", , , , "77123456"], , , [, , , , , , , , , [-1]]], CZ: [, [, , "(?:[2-578]\\d|60)\\d{7}|9\\d{8,11}", , , , , , , [9, 10, 11, 12]], [, , "(?:2\\d|3[1257-9]|4[16-9]|5[13-9])\\d{7}", , , , "212345678", , , [9]], [, , "(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}", , , , "601123456", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "9(?:0[05689]|76)\\d{6}", , , , "900123456", , , [9]], [, , "8[134]\\d{7}", , , , "811234567", , , [9]], [, , "70[01]\\d{6}", , , , "700123456", , , [9]], [, , "9[17]0\\d{6}", , , , "910123456", , , [9]], "CZ", 420, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]|9[015-7]"]], [, "(\\d{2})(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["96"]], [, "(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "9(?:5\\d|7[2-4])\\d{6}", , , , "972123456", , , [9]], , , [, , "9(?:3\\d{9}|6\\d{7,10})", , , , "93123456789"]], DE: [, [, , "[2579]\\d{5,14}|49(?:[34]0|69|8\\d)\\d\\d?|49(?:37|49|60|7[089]|9\\d)\\d{1,3}|49(?:2[024-9]|3[2-689]|7[1-7])\\d{1,8}|(?:1|[368]\\d|4[0-8])\\d{3,13}|49(?:[015]\\d|2[13]|31|[46][1-8])\\d{1,9}", , , , , , , [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [2, 3]], [, , "32\\d{9,11}|49[1-6]\\d{10}|322\\d{6}|49[0-7]\\d{3,9}|(?:[34]0|[68]9)\\d{3,13}|(?:2(?:0[1-689]|[1-3569]\\d|4[0-8]|7[1-7]|8[0-7])|3(?:[3569]\\d|4[0-79]|7[1-7]|8[1-8])|4(?:1[02-9]|[2-48]\\d|5[0-6]|6[0-8]|7[0-79])|5(?:0[2-8]|[124-6]\\d|[38][0-8]|[79][0-7])|6(?:0[02-9]|[1-358]\\d|[47][0-8]|6[1-9])|7(?:0[2-8]|1[1-9]|[27][0-7]|3\\d|[4-6][0-8]|8[0-5]|9[013-7])|8(?:0[2-9]|1[0-79]|2\\d|3[0-46-9]|4[0-6]|5[013-9]|6[1-8]|7[0-8]|8[0-24-6])|9(?:0[6-9]|[1-4]\\d|[589][0-7]|6[0-8]|7[0-467]))\\d{3,12}", , , , "30123456", , , [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [2, 3, 4]], [, , "15[0-25-9]\\d{8}|1(?:6[023]|7\\d)\\d{7,8}", , , , "15123456789", , , [10, 11]], [, , "800\\d{7,12}", , , , "8001234567890", , , [10, 11, 12, 13, 14, 15]], [, , "(?:137[7-9]|900(?:[135]|9\\d))\\d{6}", , , , "9001234567", , , [10, 11]], [, , "180\\d{5,11}|13(?:7[1-6]\\d\\d|8)\\d{4}", , , , "18012345", , , [7, 8, 9, 10, 11, 12, 13, 14]], [, , "700\\d{8}", , , , "70012345678", , , [11]], [, , , , , , , , , [-1]], "DE", 49, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3,13})", "$1 $2", ["3[02]|40|[68]9"], "0$1"], [, "(\\d{3})(\\d{3,12})", "$1 $2", ["2(?:0[1-389]|1[124]|2[18]|3[14])|3(?:[35-9][15]|4[015])|906|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1", "2(?:0[1-389]|12[0-8])|3(?:[35-9][15]|4[015])|906|2(?:[13][14]|2[18])|(?:2[4-9]|4[2-9]|[579][1-9]|[68][1-8])1"], "0$1"], [, "(\\d{4})(\\d{2,11})", "$1 $2", ["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]", "[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|4[13578]|9[1346])|5(?:0[14]|2[1-3589]|6[1-4]|7[13468]|8[13568])|6(?:2[1-489]|3[124-6]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|6|7[1467]|8[136])|9(?:0[12479]|2[1358]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|70[2-8]|8(?:0[2-9]|[1-8])|90[7-9]|[79][1-9]|3[68]4[1347]|3(?:47|60)[1356]|3(?:3[46]|46|5[49])[1246]|3[4579]3[1357]"], "0$1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["138"], "0$1"], [, "(\\d{5})(\\d{2,10})", "$1 $2", ["3"], "0$1"], [, "(\\d{3})(\\d{5,11})", "$1 $2", ["181"], "0$1"], [, "(\\d{3})(\\d)(\\d{4,10})", "$1 $2 $3", ["1(?:3|80)|9"], "0$1"], [, "(\\d{3})(\\d{7,8})", "$1 $2", ["1[67]"], "0$1"], [, "(\\d{3})(\\d{7,12})", "$1 $2", ["8"], "0$1"], [, "(\\d{5})(\\d{6})", "$1 $2", ["185", "1850", "18500"], "0$1"], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], [, "(\\d{4})(\\d{7})", "$1 $2", ["18[68]"], "0$1"], [, "(\\d{5})(\\d{6})", "$1 $2", ["15[0568]"], "0$1"], [, "(\\d{4})(\\d{7})", "$1 $2", ["15[1279]"], "0$1"], [, "(\\d{3})(\\d{8})", "$1 $2", ["18"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{7,8})", "$1 $2 $3", ["1(?:6[023]|7)"], "0$1"], [, "(\\d{4})(\\d{2})(\\d{7})", "$1 $2 $3", ["15[279]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{8})", "$1 $2 $3", ["15"], "0$1"]], , [, , "16(?:4\\d{1,10}|[89]\\d{1,11})", , , , "16412345", , , [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]], , , [, , , , , , , , , [-1]], [, , "18(?:1\\d{5,11}|[2-9]\\d{8})", , , , "18500123456", , , [8, 9, 10, 11, 12, 13, 14]], , , [, , "1(?:6(?:013|255|399)|7(?:(?:[015]1|[69]3)3|[2-4]55|[78]99))\\d{7,8}|15(?:(?:[03-68]00|113)\\d|2\\d55|7\\d99|9\\d33)\\d{7}", , , , "177991234567", , , [12, 13]]], DJ: [, [, , "(?:2\\d|77)\\d{6}", , , , , , , [8]], [, , "2(?:1[2-5]|7[45])\\d{5}", , , , "21360003"], [, , "77\\d{6}", , , , "77831001"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "DJ", 253, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[27]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], DK: [, [, , "[2-9]\\d{7}", , , , , , , [8]], [, , "(?:[2-7]\\d|8[126-9]|9[1-46-9])\\d{6}", , , , "32123456"], [, , "(?:[2-7]\\d|8[126-9]|9[1-46-9])\\d{6}", , , , "32123456"], [, , "80\\d{6}", , , , "80123456"], [, , "90\\d{6}", , , , "90123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "DK", 45, "00", , , , , , , 1, [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], DM: [, [, , "(?:[58]\\d\\d|767|900)\\d{7}", , , , , , , [10], [7]], [, , "767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4])\\d{4}", , , , "7674201234", , , , [7]], [, , "767(?:2(?:[2-4689]5|7[5-7])|31[5-7]|61[1-8]|70[1-6])\\d{4}", , , , "7672251234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "DM", 1, "011", "1", , , "([2-7]\\d{6})$|1", "767$1", , , , , [, , , , , , , , , [-1]], , "767", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], DO: [, [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "8(?:[04]9[2-9]\\d\\d|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d\\d|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9])))\\d{4}", , , , "8092345678", , , , [7]], [, , "8[024]9[2-9]\\d{6}", , , , "8092345678", , , , [7]], [, , "8(?:00(?:14|[2-9]\\d)|(?:33|44|55|66|77|88)[2-9]\\d)\\d{5}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "DO", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "8001|8[024]9", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], DZ: [, [, , "(?:[1-4]|[5-79]\\d|80)\\d{7}", , , , , , , [8, 9]], [, , "9619\\d{5}|(?:1\\d|2[013-79]|3[0-8]|4[013-689])\\d{6}", , , , "12345678"], [, , "(?:5(?:4[0-29]|5\\d|6[0-2])|6(?:[569]\\d|7[0-6])|7[7-9]\\d)\\d{6}", , , , "551234567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "80[3-689]1\\d{5}", , , , "808123456", , , [9]], [, , "80[12]1\\d{5}", , , , "801123456", , , [9]], [, , , , , , , , , [-1]], [, , "98[23]\\d{6}", , , , "983123456", , , [9]], "DZ", 213, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-4]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["9"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-8]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], EC: [, [, , "1\\d{9,10}|(?:[2-7]|9\\d)\\d{7}", , , , , , , [8, 9, 10, 11], [7]], [, , "[2-7][2-7]\\d{6}", , , , "22123456", , , [8], [7]], [, , "964[0-2]\\d{5}|9(?:39|[57][89]|6[0-36-9]|[89]\\d)\\d{6}", , , , "991234567", , , [9]], [, , "1800\\d{7}|1[78]00\\d{6}", , , , "18001234567", , , [10, 11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "[2-7]890\\d{4}", , , , "28901234", , , [8]], "EC", 593, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[2-7]"]], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2-$3", ["[2-7]"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], [[, "(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-7]"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], EE: [, [, , "8\\d{9}|[4578]\\d{7}|(?:[3-8]\\d|90)\\d{5}", , , , , , , [7, 8, 10]], [, , "(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}", , , , "3212345", , , [7]], [, , "(?:5\\d{5}|8(?:1(?:0(?:000|[3-9]\\d\\d)|(?:1(?:0[236]|1\\d)|(?:2[0-59]|[3-79]\\d)\\d)\\d)|2(?:0(?:000|(?:19|[2-7]\\d)\\d)|(?:(?:[124-6]\\d|3[5-9])\\d|7(?:[0-79]\\d|8[13-9])|8(?:[2-6]\\d|7[01]))\\d)|[349]\\d{4}))\\d\\d|5(?:(?:[02]\\d|5[0-478])\\d|1(?:[0-8]\\d|95)|6(?:4[0-4]|5[1-589]))\\d{3}", , , , "51234567", , , [7, 8]], [, , "800(?:(?:0\\d\\d|1)\\d|[2-9])\\d{3}", , , , "80012345"], [, , "(?:40\\d\\d|900)\\d{4}", , , , "9001234", , , [7, 8]], [, , , , , , , , , [-1]], [, , "70[0-2]\\d{5}", , , , "70012345", , , [8]], [, , , , , , , , , [-1]], "EE", 372, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]|88", "[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]|88"]], [, "(\\d{4})(\\d{3,4})", "$1 $2", ["[45]|8(?:00|[1-49])", "[45]|8(?:00[1-9]|[1-49])"]], [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["7"]], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]], , [, , , , , , , , , [-1]], , , [, , "800[2-9]\\d{3}", , , , , , , [7]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], EG: [, [, , "[189]\\d{8,9}|[24-6]\\d{8}|[135]\\d{7}", , , , , , , [8, 9, 10], [6, 7]], [, , "13[23]\\d{6}|(?:15|57)\\d{6,7}|(?:2[2-4]|3|4[05-8]|5[05]|6[24-689]|8[2468]|9[235-7])\\d{7}", , , , "234567890", , , [8, 9], [6, 7]], [, , "1[0-25]\\d{8}", , , , "1001234567", , , [10]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "EG", 20, "00", "0", , , "0", , , , [[, "(\\d)(\\d{7,8})", "$1 $2", ["[23]"], "0$1"], [, "(\\d{2})(\\d{6,7})", "$1 $2", ["1[35]|[4-6]|8[2468]|9[235-7]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], [, "(\\d{2})(\\d{8})", "$1 $2", ["1"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], EH: [, [, , "[5-8]\\d{8}", , , , , , , [9]], [, , "528[89]\\d{5}", , , , "528812345"], [, , "(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[017]\\d|2[0-2]|6[0-8]|8[0-3]))\\d{6}", , , , "650123456"], [, , "80\\d{7}", , , , "801234567"], [, , "89\\d{7}", , , , "891234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "592(?:4[0-2]|93)\\d{4}", , , , "592401234"], "EH", 212, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , "528[89]", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], ER: [, [, , "[178]\\d{6}", , , , , , , [7], [6]], [, , "(?:1(?:1[12568]|[24]0|55|6[146])|8\\d\\d)\\d{4}", , , , "8370362", , , , [6]], [, , "(?:17[1-3]|7\\d\\d)\\d{4}", , , , "7123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ER", 291, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[178]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], ES: [, [, , "[5-9]\\d{8}", , , , , , , [9]], [, , "96906(?:0[0-8]|1[1-9]|[2-9]\\d)\\d\\d|9(?:69(?:0[0-57-9]|[1-9]\\d)|73(?:[0-8]\\d|9[1-9]))\\d{4}|(?:8(?:[1356]\\d|[28][0-8]|[47][1-9])|9(?:[135]\\d|[268][0-8]|4[1-9]|7[124-9]))\\d{6}", , , , "810123456"], [, , "(?:590[16]00\\d|9(?:6906(?:09|10)|7390\\d\\d))\\d\\d|(?:6\\d|7[1-48])\\d{7}", , , , "612345678"], [, , "[89]00\\d{6}", , , , "800123456"], [, , "80[367]\\d{6}", , , , "803123456"], [, , "90[12]\\d{6}", , , , "901123456"], [, , "70\\d{7}", , , , "701234567"], [, , , , , , , , , [-1]], "ES", 34, "00", , , , , , , , [[, "(\\d{4})", "$1", ["905"]], [, "(\\d{6})", "$1", ["[79]9"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]], [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[89]00"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-9]"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "51\\d{7}", , , , "511234567"], , , [, , , , , , , , , [-1]]], ET: [, [, , "(?:11|[2-579]\\d)\\d{7}", , , , , , , [9], [7]], [, , "11667[01]\\d{3}|(?:11(?:1(?:1[124]|2[2-7]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:1[578]|2[69]|39|4[5-7]|5[0-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|(?:22|55)[0-6]|33[0134689]|44[04]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:119|22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:(?:11|22)[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}", , , , "111112345", , , , [7]], [, , "700[1-9]\\d{5}|(?:7(?:0[1-9]|1[0-8]|22|77|86|99)|9\\d\\d)\\d{6}", , , , "911234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ET", 251, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-579]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], FI: [, [, , "[1-35689]\\d{4}|7\\d{10,11}|(?:[124-7]\\d|3[0-46-9])\\d{8}|[1-9]\\d{5,8}", , , , , , , [5, 6, 7, 8, 9, 10, 11, 12]], [, , "(?:1[3-79][1-8]|[235689][1-8]\\d)\\d{2,6}", , , , "131234567", , , [5, 6, 7, 8, 9]], [, , "4946\\d{2,6}|(?:4[0-8]|50)\\d{4,8}", , , , "412345678", , , [6, 7, 8, 9, 10]], [, , "800\\d{4,6}", , , , "800123456", , , [7, 8, 9]], [, , "[67]00\\d{5,6}", , , , "600123456", , , [8, 9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FI", 358, "00|99(?:[01469]|5(?:[14]1|3[23]|5[59]|77|88|9[09]))", "0", , , "0", , "00", , [[, "(\\d{5})", "$1", ["75[12]"], "0$1"], [, "(\\d)(\\d{4,9})", "$1 $2", ["[2568][1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"], [, "(\\d{6})", "$1", ["11"]], [, "(\\d{3})(\\d{3,7})", "$1 $2", ["[12]00|[368]|70[07-9]"], "0$1"], [, "(\\d{2})(\\d{4,8})", "$1 $2", ["[1245]|7[135]"], "0$1"], [, "(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"]], [[, "(\\d)(\\d{4,9})", "$1 $2", ["[2568][1-8]|3(?:0[1-9]|[1-9])|9"], "0$1"], [, "(\\d{3})(\\d{3,7})", "$1 $2", ["[12]00|[368]|70[07-9]"], "0$1"], [, "(\\d{2})(\\d{4,8})", "$1 $2", ["[1245]|7[135]"], "0$1"], [, "(\\d{2})(\\d{6,10})", "$1 $2", ["7"], "0$1"]], [, , , , , , , , , [-1]], 1, "1[03-79]|[2-9]", [, , "20(?:2[023]|9[89])\\d{1,6}|(?:60[12]\\d|7099)\\d{4,5}|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:[1-3]00|7(?:0[1-5]\\d\\d|5[03-9]))\\d{3,7}"], [, , "20\\d{4,8}|60[12]\\d{5,6}|7(?:099\\d{4,5}|5[03-9]\\d{3,7})|20[2-59]\\d\\d|(?:606|7(?:0[78]|1|3\\d))\\d{7}|(?:10|29|3[09]|70[1-5]\\d)\\d{4,8}", , , , "10112345"], , , [, , , , , , , , , [-1]]], FJ: [, [, , "45\\d{5}|(?:0800\\d|[235-9])\\d{6}", , , , , , , [7, 11]], [, , "603\\d{4}|(?:3[0-5]|6[25-7]|8[58])\\d{5}", , , , "3212345", , , [7]], [, , "(?:[279]\\d|45|5[01568]|8[034679])\\d{5}", , , , "7012345", , , [7]], [, , "0800\\d{7}", , , , "08001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FJ", 679, "0(?:0|52)", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[235-9]|45"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], FK: [, [, , "[2-7]\\d{4}", , , , , , , [5]], [, , "[2-47]\\d{4}", , , , "31234"], [, , "[56]\\d{4}", , , , "51234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FK", 500, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], FM: [, [, , "(?:[39]\\d\\d|820)\\d{4}", , , , , , , [7]], [, , "31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-6]\\d)\\d)\\d{3}", , , , "3201234"], [, , "31(?:00[67]|208|309)\\d\\d|(?:3(?:[2357]0[1-9]|602|804|905)|(?:820|9[2-7]\\d)\\d)\\d{3}", , , , "3501234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "FM", 691, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[389]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], FO: [, [, , "[2-9]\\d{5}", , , , , , , [6]], [, , "(?:20|[34]\\d|8[19])\\d{4}", , , , "201234"], [, , "(?:[27][1-9]|5\\d|9[16])\\d{4}", , , , "211234"], [, , "80[257-9]\\d{3}", , , , "802123"], [, , "90(?:[13-5][15-7]|2[125-7]|9\\d)\\d\\d", , , , "901123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:6[0-36]|88)\\d{4}", , , , "601234"], "FO", 298, "00", , , , "(10(?:01|[12]0|88))", , , , [[, "(\\d{6})", "$1", ["[2-9]"], , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], FR: [, [, , "[1-9]\\d{8}", , , , , , , [9]], [, , "59[1-9]\\d{6}|(?:[1-3]\\d|4[1-9]|5[0-8])\\d{7}", , , , "123456789"], [, , "(?:6(?:[0-24-8]\\d|3[0-8]|9[589])|7[3-9]\\d)\\d{6}", , , , "612345678"], [, , "80[0-5]\\d{6}", , , , "801234567"], [, , "836(?:0[0-36-9]|[1-9]\\d)\\d{4}|8(?:1[2-9]|2[2-47-9]|3[0-57-9]|[569]\\d|8[0-35-9])\\d{6}", , , , "891123456"], [, , "8(?:1[01]|2[0156]|4[02]|84)\\d{6}", , , , "884012345"], [, , , , , , , , , [-1]], [, , "9\\d{8}", , , , "912345678"], "FR", 33, "00", "0", , , "0", , , , [[, "(\\d{4})", "$1", ["10"]], [, "(\\d{3})(\\d{3})", "$1 $2", ["1"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], [, "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0 $1"], [, "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[1-79]"], "0$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "80[6-9]\\d{6}", , , , "806123456"], , , [, , , , , , , , , [-1]]], GA: [, [, , "(?:[067]\\d|11)\\d{6}|[2-7]\\d{6}", , , , , , , [7, 8]], [, , "[01]1\\d{6}", , , , "01441234", , , [8]], [, , "(?:(?:0[2-7]|7[467])\\d|6(?:0[0-4]|10|[256]\\d))\\d{5}|[2-7]\\d{6}", , , , "06031234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GA", 241, "00", , , , "0(11\\d{6}|60\\d{6}|61\\d{6}|6[256]\\d{6}|7[467]\\d{6})", "$1", , , [[, "(\\d)(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-7]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["11|[67]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GB: [, [, , "[1-357-9]\\d{9}|[18]\\d{8}|8\\d{6}", , , , , , , [7, 9, 10], [4, 5, 6, 8]], [, , "(?:1(?:1(?:3(?:[0-58]\\d\\d|73[0235])|4(?:[0-5]\\d\\d|69[7-9]|70[0-79])|(?:(?:5[0-26-9]|[78][0-49])\\d|6(?:[0-4]\\d|50))\\d)|(?:2(?:(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)\\d|1(?:[0-7]\\d|8[0-2]))|(?:3(?:0\\d|1[0-8]|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[137]\\d|[28][02-57-9]|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|[16]\\d|2[024-9]|3[015689]|4[02-9]|5[03-9]|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|1\\d|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0-24578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|[18]\\d|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|9[2-57]))\\d)\\d)|2(?:0[013478]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{3})\\d{4}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[3-5])))|3(?:6(?:38[2-5]|47[23])|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[1-3]))|5(?:2(?:4(?:3[2-79]|6\\d)|76\\d)|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[5-7]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|9(?:55[0-4]|77[23]))|7(?:26(?:6[13-9]|7[0-7])|(?:442|688)\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|843[2-58])|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}", , , , "1212345678", , , [9, 10], [4, 5, 6, 7, 8]], [, , "7(?:457[0-57-9]|700[01]|911[028])\\d{5}|7(?:[1-3]\\d\\d|4(?:[0-46-9]\\d|5[0-689])|5(?:0[0-8]|[13-9]\\d|2[0-35-9])|7(?:0[1-9]|[1-7]\\d|8[02-9]|9[0-689])|8(?:[014-9]\\d|[23][0-8])|9(?:[024-9]\\d|1[02-9]|3[0-689]))\\d{6}", , , , "7400123456", , , [10]], [, , "80[08]\\d{7}|800\\d{6}|8001111", , , , "8001234567"], [, , "(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[2-49]))\\d{7}|845464\\d", , , , "9012345678", , , [7, 10]], [, , , , , , , , , [-1]], [, , "70\\d{8}", , , , "7012345678", , , [10]], [, , "56\\d{8}", , , , "5612345678", , , [10]], "GB", 44, "00", "0", " x", , "0", , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["800", "8001", "80011", "800111", "8001111"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["845", "8454", "84546", "845464"], "0$1"], [, "(\\d{3})(\\d{6})", "$1 $2", ["800"], "0$1"], [, "(\\d{5})(\\d{4,5})", "$1 $2", ["1(?:38|5[23]|69|76|94)", "1(?:(?:38|69)7|5(?:24|39)|768|946)", "1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"], "0$1"], [, "(\\d{4})(\\d{5,6})", "$1 $2", ["1(?:[2-69][02-9]|[78])"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[25]|7(?:0|6[02-9])", "[25]|7(?:0|6(?:[03-9]|2[356]))"], "0$1"], [, "(\\d{4})(\\d{6})", "$1 $2", ["7"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1389]"], "0$1"]], , [, , "76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", , , , "7640123456", , , [10]], 1, , [, , , , , , , , , [-1]], [, , "(?:3[0347]|55)\\d{8}", , , , "5512345678", , , [10]], , , [, , , , , , , , , [-1]]], GD: [, [, , "(?:473|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}", , , , "4732691234", , , , [7]], [, , "473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}", , , , "4734031234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "GD", 1, "011", "1", , , "([2-9]\\d{6})$|1", "473$1", , , , , [, , , , , , , , , [-1]], , "473", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GE: [, [, , "(?:[3-57]\\d\\d|800)\\d{6}", , , , , , , [9], [6, 7]], [, , "(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}", , , , "322123456", , , , [6, 7]], [, , "5(?:(?:(?:0555|1(?:[17]77|555))[5-9]|757(?:7[7-9]|8[01]))\\d|22252[0-4])\\d\\d|(?:5(?:00(?:0\\d|11|22|33|44|5[05]|77|88|99)|1(?:1(?:00|[124]\\d|3[01])|4\\d\\d)|(?:44|68)\\d\\d|5(?:[0157-9]\\d\\d|200)|7(?:[0147-9]\\d\\d|5(?:00|[57]5))|8(?:0(?:[01]\\d|2[0-4])|58[89]|8(?:55|88))|9(?:090|[1-35-9]\\d\\d))|790\\d\\d)\\d{4}|5(?:0(?:070|505)|1(?:0[01]0|1(?:07|33|51))|2(?:0[02]0|2[25]2)|3(?:0[03]0|3[35]3)|(?:40[04]|900)0|5222)[0-4]\\d{3}", , , , "555123456"], [, , "800\\d{6}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "70[67]\\d{6}", , , , "706123456"], "GE", 995, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["32"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[57]"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[348]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "70[67]\\d{6}"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GF: [, [, , "[56]94\\d{6}|(?:80|9\\d)\\d{7}", , , , , , , [9]], [, , "594(?:[02-49]\\d|1[0-4]|5[6-9]|6[0-3]|80)\\d{4}", , , , "594101234"], [, , "694(?:[0-249]\\d|3[0-8])\\d{4}", , , , "694201234"], [, , "80[0-5]\\d{6}", , , , "800012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:(?:396|76\\d)\\d|476[0-5])\\d{4}", , , , "976012345"], "GF", 594, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[56]|9[47]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[89]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GG: [, [, , "(?:1481|[357-9]\\d{3})\\d{6}|8\\d{6}(?:\\d{2})?", , , , , , , [7, 9, 10], [6]], [, , "1481[25-9]\\d{5}", , , , "1481256789", , , [10], [6]], [, , "7(?:(?:781|839)\\d|911[17])\\d{5}", , , , "7781123456", , , [10]], [, , "80[08]\\d{7}|800\\d{6}|8001111", , , , "8001234567"], [, , "(?:8(?:4[2-5]|7[0-3])|9(?:[01]\\d|8[0-3]))\\d{7}|845464\\d", , , , "9012345678", , , [7, 10]], [, , , , , , , , , [-1]], [, , "70\\d{8}", , , , "7012345678", , , [10]], [, , "56\\d{8}", , , , "5612345678", , , [10]], "GG", 44, "00", "0", , , "([25-9]\\d{5})$|0", "1481$1", , , , , [, , "76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", , , , "7640123456", , , [10]], , , [, , , , , , , , , [-1]], [, , "(?:3[0347]|55)\\d{8}", , , , "5512345678", , , [10]], , , [, , , , , , , , , [-1]]], GH: [, [, , "(?:[235]\\d{3}|800)\\d{5}", , , , , , , [8, 9], [7]], [, , "3082[0-5]\\d{4}|3(?:0(?:[237]\\d|8[01])|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}", , , , "302345678", , , [9], [7]], [, , "(?:2(?:[0346-9]\\d|5[67])|5(?:[03-7]\\d|9[1-9]))\\d{6}", , , , "231234567", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GH", 233, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[237]|8[0-2]"]], [, "(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]], [[, "(\\d{3})(\\d{5})", "$1 $2", ["8"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[235]"], "0$1"]], [, , , , , , , , , [-1]], , , [, , "800\\d{5}", , , , , , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GI: [, [, , "(?:[25]\\d|60)\\d{6}", , , , , , , [8]], [, , "2190[0-2]\\d{3}|2(?:0(?:[02]\\d|3[01])|16[24-9]|2[2-5]\\d)\\d{4}", , , , "20012345"], [, , "5251[0-4]\\d{3}|(?:5(?:[146-8]\\d\\d|250)|60(?:1[01]|6\\d))\\d{4}", , , , "57123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GI", 350, "00", , , , , , , , [[, "(\\d{3})(\\d{5})", "$1 $2", ["2"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GL: [, [, , "(?:19|[2-689]\\d|70)\\d{4}", , , , , , , [6]], [, , "(?:19|3[1-7]|[68][1-9]|70|9\\d)\\d{4}", , , , "321000"], [, , "[245]\\d{5}", , , , "221234"], [, , "80\\d{4}", , , , "801234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3[89]\\d{4}", , , , "381234"], "GL", 299, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["19|[2-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GM: [, [, , "[2-9]\\d{6}", , , , , , , [7]], [, , "(?:4(?:[23]\\d\\d|4(?:1[024679]|[6-9]\\d))|5(?:5(?:3\\d|4[0-7])|6[67]\\d|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}", , , , "5661234"], [, , "(?:[23679]\\d|5[0-489])\\d{5}", , , , "3012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GM", 220, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GN: [, [, , "722\\d{6}|(?:3|6\\d)\\d{7}", , , , , , , [8, 9]], [, , "3(?:0(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])|1\\d\\d)\\d{4}", , , , "30241234", , , [8]], [, , "6[0-356]\\d{7}", , , , "601123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "722\\d{6}", , , , "722123456", , , [9]], "GN", 224, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["3"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[67]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GP: [, [, , "590\\d{6}|(?:69|80|9\\d)\\d{7}", , , , , , , [9]], [, , "590(?:0[1-68]|[14][0-24-9]|2[0-68]|3[1-9]|5[3-579]|[68][0-689]|7[08]|9\\d)\\d{4}", , , , "590201234"], [, , "69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}", , , , "690001234"], [, , "80[0-5]\\d{6}", , , , "800012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:(?:395|76[018])\\d|475[0-5])\\d{4}", , , , "976012345"], "GP", 590, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GQ: [, [, , "222\\d{6}|(?:3\\d|55|[89]0)\\d{7}", , , , , , , [9]], [, , "33[0-24-9]\\d[46]\\d{4}|3(?:33|5\\d)\\d[7-9]\\d{4}", , , , "333091234"], [, , "(?:222|55\\d)\\d{6}", , , , "222123456"], [, , "80\\d[1-9]\\d{5}", , , , "800123456"], [, , "90\\d[1-9]\\d{5}", , , , "900123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GQ", 240, "00", , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235]"]], [, "(\\d{3})(\\d{6})", "$1 $2", ["[89]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GR: [, [, , "5005000\\d{3}|8\\d{9,11}|(?:[269]\\d|70)\\d{8}", , , , , , , [10, 11, 12]], [, , "2(?:1\\d\\d|2(?:2[1-46-9]|[36][1-8]|4[1-7]|5[1-4]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|[269][1-6]|3[1245]|4[1-7]|5[13-9]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}", , , , "2123456789", , , [10]], [, , "68[57-9]\\d{7}|(?:69|94)\\d{8}", , , , "6912345678", , , [10]], [, , "800\\d{7,9}", , , , "8001234567"], [, , "90[19]\\d{7}", , , , "9091234567", , , [10]], [, , "8(?:0[16]|12|[27]5|50)\\d{7}", , , , "8011234567", , , [10]], [, , "70\\d{8}", , , , "7012345678", , , [10]], [, , , , , , , , , [-1]], "GR", 30, "00", , , , , , , , [[, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["21|7"]], [, "(\\d{4})(\\d{6})", "$1 $2", ["2(?:2|3[2-57-9]|4[2-469]|5[2-59]|6[2-9]|7[2-69]|8[2-49])|5"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2689]"]], [, "(\\d{3})(\\d{3,4})(\\d{5})", "$1 $2 $3", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "5005000\\d{3}", , , , "5005000123", , , [10]], , , [, , , , , , , , , [-1]]], GT: [, [, , "(?:1\\d{3}|[2-7])\\d{7}", , , , , , , [8, 11]], [, , "[267][2-9]\\d{6}", , , , "22456789", , , [8]], [, , "[3-5]\\d{7}", , , , "51234567", , , [8]], [, , "18[01]\\d{8}", , , , "18001112222", , , [11]], [, , "19\\d{9}", , , , "19001112222", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GT", 502, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GU: [, [, , "(?:[58]\\d\\d|671|900)\\d{7}", , , , , , , [10], [7]], [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[02-46-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}", , , , "6713001234", , , , [7]], [, , "671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[02-46-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[0479]7|2[0167]|3[45]|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}", , , , "6713001234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "GU", 1, "011", "1", , , "([3-9]\\d{6})$|1", "671$1", , 1, , , [, , , , , , , , , [-1]], , "671", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GW: [, [, , "[49]\\d{8}|4\\d{6}", , , , , , , [7, 9]], [, , "443\\d{6}", , , , "443201234", , , [9]], [, , "9(?:5\\d|6[569]|77)\\d{6}", , , , "955012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "40\\d{5}", , , , "4012345", , , [7]], "GW", 245, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["40"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], GY: [, [, , "9008\\d{3}|(?:[2-467]\\d\\d|510|862)\\d{4}", , , , , , , [7]], [, , "(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}", , , , "2201234"], [, , "(?:510|6\\d\\d|7(?:0\\d|1[0-8]|25|49))\\d{4}", , , , "6091234"], [, , "(?:289|862)\\d{4}", , , , "2891234"], [, , "9008\\d{3}", , , , "9008123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "GY", 592, "001", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], HK: [, [, , "8[0-46-9]\\d{6,7}|9\\d{4,7}|(?:[2-7]|9\\d{3})\\d{7}", , , , , , , [5, 6, 7, 8, 9, 11]], [, , "(?:2(?:[13-9]\\d|2[013-9])\\d|3(?:(?:[1569][0-24-9]|4[0-246-9]|7[0-24-69])\\d|8(?:[45][0-8]|6[01]|9\\d))|58(?:0[1-9]|1[2-9]))\\d{4}", , , , "21234567", , , [8]], [, , "(?:4(?:44[5-9]|6(?:0[0-7]|1[0-6]|4[0-57-9]|6[0-4]|7[0-8]))|573[0-6]|6(?:26[013-8]|66[0-3])|70(?:7[1-5]|8[0-4])|848[015-9]|9(?:29[013-9]|59[0-4]))\\d{4}|(?:4(?:4[01]|6[2358])|5(?:[1-59][0-46-9]|6[0-4689]|7[0-246-9])|6(?:0[1-9]|[13-59]\\d|[268][0-57-9]|7[0-79])|84[09]|9(?:0[1-9]|1[02-9]|[2358][0-8]|[467]\\d))\\d{5}", , , , "51234567", , , [8]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "900(?:[0-24-9]\\d{7}|3\\d{1,4})", , , , "90012345678", , , [5, 6, 7, 8, 11]], [, , , , , , , , , [-1]], [, , "8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}", , , , "81123456", , , [8]], [, , , , , , , , , [-1]], "HK", 852, "00(?:30|5[09]|[126-9]?)", , , , , , "00", , [[, "(\\d{3})(\\d{2,5})", "$1 $2", ["900", "9003"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[2-7]|8[1-4]|9(?:0[1-9]|[1-8])"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["9"]]], , [, , "7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[0136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}", , , , "71123456", , , [8]], , , [, , , , , , , , , [-1]], [, , "30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}", , , , "30161234", , , [8]], , , [, , , , , , , , , [-1]]], HN: [, [, , "8\\d{10}|[237-9]\\d{7}", , , , , , , [8, 11]], [, , "2(?:2(?:0[0-59]|1[1-9]|[23]\\d|4[02-6]|5[57]|6[245]|7[0135689]|8[01346-9]|9[0-2])|4(?:0[578]|2[3-59]|3[13-9]|4[0-68]|5[1-3589])|5(?:0[2357-9]|1[1-356]|4[03-5]|5\\d|6[014-69]|7[04]|80)|6(?:[056]\\d|17|2[067]|3[047]|4[0-378]|[78][0-8]|9[01])|7(?:0[5-79]|6[46-9]|7[02-9]|8[034]|91)|8(?:79|8[0-357-9]|9[1-57-9]))\\d{4}", , , , "22123456", , , [8]], [, , "[37-9]\\d{7}", , , , "91234567", , , [8]], [, , "8002\\d{7}", , , , "80021234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "HN", 504, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["8"]]], [[, "(\\d{4})(\\d{4})", "$1-$2", ["[237-9]"]]], [, , , , , , , , , [-1]], , , [, , "8002\\d{7}", , , , , , , [11]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], HR: [, [, , "(?:[24-69]\\d|3[0-79])\\d{7}|80\\d{5,7}|[1-79]\\d{7}|6\\d{5,6}", , , , , , , [6, 7, 8, 9]], [, , "1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}", , , , "12345678", , , [8, 9], [6, 7]], [, , "9(?:(?:0[1-9]|[12589]\\d)\\d\\d|7(?:[0679]\\d\\d|5(?:[01]\\d|44|77|9[67])))\\d{4}|98\\d{6}", , , , "921234567", , , [8, 9]], [, , "80[01]\\d{4,6}", , , , "800123456", , , [7, 8, 9]], [, , "6[01459]\\d{6}|6[01]\\d{4,5}", , , , "611234", , , [6, 7, 8]], [, , , , , , , , , [-1]], [, , "7[45]\\d{6}", , , , "74123456", , , [8]], [, , , , , , , , , [-1]], "HR", 385, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["6[01]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["8"], "0$1"], [, "(\\d)(\\d{4})(\\d{3})", "$1 $2 $3", ["1"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[67]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-5]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "62\\d{6,7}|72\\d{6}", , , , "62123456", , , [8, 9]], , , [, , , , , , , , , [-1]]], HT: [, [, , "(?:[2-489]\\d|55)\\d{6}", , , , , , , [8]], [, , "2(?:2\\d|5[1-5]|81|9[149])\\d{5}", , , , "22453300"], [, , "(?:[34]\\d|55)\\d{6}", , , , "34101234"], [, , "8\\d{7}", , , , "80012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:[67][0-4]|8[0-3589]|9\\d)\\d{5}", , , , "98901234"], "HT", 509, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[2-589]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], HU: [, [, , "[235-7]\\d{8}|[1-9]\\d{7}", , , , , , , [8, 9], [6, 7]], [, , "(?:1\\d|[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|8[2-57-9]|9[2-69])\\d{6}", , , , "12345678", , , [8], [6, 7]], [, , "(?:[257]0|3[01])\\d{7}", , , , "201234567", , , [9]], [, , "(?:[48]0\\d|680[29])\\d{5}", , , , "80123456"], [, , "9[01]\\d{6}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "21\\d{7}", , , , "211234567", , , [9]], "HU", 36, "00", "06", , , "06", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "(06 $1)"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27][2-9]|3[2-7]|4[24-9]|5[2-79]|6|8[2-57-9]|9[2-69]"], "(06 $1)"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "06 $1"]], , [, , , , , , , , , [-1]], , , [, , "(?:[48]0\\d|680[29])\\d{5}"], [, , "38\\d{7}", , , , "381234567", , , [9]], , , [, , , , , , , , , [-1]]], ID: [, [, , "(?:(?:00[1-9]|8\\d)\\d{4}|[1-36])\\d{6}|00\\d{10}|[1-9]\\d{8,10}|[2-9]\\d{7}", , , , , , , [7, 8, 9, 10, 11, 12, 13], [5, 6]], [, , "2[124]\\d{7,8}|619\\d{8}|2(?:1(?:14|500)|2\\d{3})\\d{3}|61\\d{5,8}|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}", , , , "218350123", , , [7, 8, 9, 10, 11], [5, 6]], [, , "8[1-35-9]\\d{7,10}", , , , "812345678", , , [9, 10, 11, 12]], [, , "00[17]803\\d{7}|(?:177\\d|800)\\d{5,7}|001803\\d{6}", , , , "8001234567", , , [8, 9, 10, 11, 12, 13]], [, , "809\\d{7}", , , , "8091234567", , , [10]], [, , "804\\d{7}", , , , "8041234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ID", 62, "00[89]", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], [, "(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], [, "(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], [, "(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], [, "(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], [, "(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], [, "(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], [, "(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["001"]], [, "(\\d{2})(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["0"]]], [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["15"]], [, "(\\d{2})(\\d{5,9})", "$1 $2", ["2[124]|[36]1"], "(0$1)"], [, "(\\d{3})(\\d{5,7})", "$1 $2", ["800"], "0$1"], [, "(\\d{3})(\\d{5,8})", "$1 $2", ["[2-79]"], "(0$1)"], [, "(\\d{3})(\\d{3,4})(\\d{3})", "$1-$2-$3", ["8[1-35-9]"], "0$1"], [, "(\\d{3})(\\d{6,8})", "$1 $2", ["1"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["804"], "0$1"], [, "(\\d{3})(\\d)(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["80"], "0$1"], [, "(\\d{3})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["8"], "0$1"]], [, , , , , , , , , [-1]], , , [, , "001803\\d{6,7}|(?:007803\\d|8071)\\d{6}", , , , , , , [10, 12, 13]], [, , "(?:1500|8071\\d{3})\\d{3}", , , , "8071123456", , , [7, 10]], , , [, , , , , , , , , [-1]]], IE: [, [, , "(?:1\\d|[2569])\\d{6,8}|4\\d{6,9}|7\\d{8}|8\\d{8,9}", , , , , , , [7, 8, 9, 10], [5, 6]], [, , "(?:1\\d|21)\\d{6,7}|(?:2[24-9]|4(?:0[24]|5\\d|7)|5(?:0[45]|1\\d|8)|6(?:1\\d|[237-9])|9(?:1\\d|[35-9]))\\d{5}|(?:23|4(?:[1-469]|8\\d)|5[23679]|6[4-6]|7[14]|9[04])\\d{7}", , , , "2212345", , , , [5, 6]], [, , "8(?:22|[35-9]\\d)\\d{6}", , , , "850123456", , , [9]], [, , "1800\\d{6}", , , , "1800123456", , , [10]], [, , "15(?:1[2-8]|[2-8]0|9[089])\\d{6}", , , , "1520123456", , , [10]], [, , "18[59]0\\d{6}", , , , "1850123456", , , [10]], [, , "700\\d{6}", , , , "700123456", , , [9]], [, , "76\\d{7}", , , , "761234567", , , [9]], "IE", 353, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{5})", "$1 $2", ["2[24-9]|47|58|6[237-9]|9[35-9]"], "(0$1)"], [, "(\\d{3})(\\d{5})", "$1 $2", ["[45]0"], "(0$1)"], [, "(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2569]|4[1-69]|7[14]"], "(0$1)"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["70"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["81"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[78]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["4"], "(0$1)"], [, "(\\d{2})(\\d)(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "18[59]0\\d{6}", , , , , , , [10]], [, , "818\\d{6}", , , , "818123456", , , [9]], , , [, , "88210[1-9]\\d{4}|8(?:[35-79]5\\d\\d|8(?:[013-9]\\d\\d|2(?:[01][1-9]|[2-9]\\d)))\\d{5}", , , , "8551234567", , , [10]]], IL: [, [, , "1\\d{6}(?:\\d{3,5})?|[57]\\d{8}|[1-489]\\d{7}", , , , , , , [7, 8, 9, 10, 11, 12]], [, , "153\\d{8,9}|29[1-9]\\d{5}|(?:2[0-8]|[3489]\\d)\\d{6}", , , , "21234567", , , [8, 11, 12], [7]], [, , "55410\\d{4}|5(?:(?:[02][02-9]|[149][2-9]|[36]\\d|8[3-7])\\d|5(?:01|2[2-9]|3[0-3]|4[34]|5[0-25689]|6[6-8]|7[0-267]|8[7-9]|9[1-9]))\\d{5}", , , , "502345678", , , [9]], [, , "1(?:255|80[019]\\d{3})\\d{3}", , , , "1800123456", , , [7, 10]], [, , "1212\\d{4}|1(?:200|9(?:0[0-2]|19))\\d{6}", , , , "1919123456", , , [8, 10]], [, , "1700\\d{6}", , , , "1700123456", , , [10]], [, , , , , , , , , [-1]], [, , "7(?:38(?:0\\d|5[09]|88)|8(?:33|55|77|81)\\d)\\d{4}|7(?:18|2[23]|3[237]|47|6[258]|7\\d|82|9[2-9])\\d{6}", , , , "771234567", , , [9]], "IL", 972, "0(?:0|1[2-9])", "0", , , "0", , , , [[, "(\\d{4})(\\d{3})", "$1-$2", ["125"]], [, "(\\d{4})(\\d{2})(\\d{2})", "$1-$2-$3", ["121"]], [, "(\\d)(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-489]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1-$2-$3", ["12"]], [, "(\\d{4})(\\d{6})", "$1-$2", ["159"]], [, "(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3-$4", ["1[7-9]"]], [, "(\\d{3})(\\d{1,2})(\\d{3})(\\d{4})", "$1-$2 $3-$4", ["15"]]], , [, , , , , , , , , [-1]], , , [, , "1700\\d{6}", , , , , , , [10]], [, , "1599\\d{6}", , , , "1599123456", , , [10]], , , [, , "151\\d{8,9}", , , , "15112340000", , , [11, 12]]], IM: [, [, , "1624\\d{6}|(?:[3578]\\d|90)\\d{8}", , , , , , , [10], [6]], [, , "1624(?:230|[5-8]\\d\\d)\\d{3}", , , , "1624756789", , , , [6]], [, , "76245[06]\\d{4}|7(?:4576|[59]24\\d|624[0-4689])\\d{5}", , , , "7924123456"], [, , "808162\\d{4}", , , , "8081624567"], [, , "8(?:440[49]06|72299\\d)\\d{3}|(?:8(?:45|70)|90[0167])624\\d{4}", , , , "9016247890"], [, , , , , , , , , [-1]], [, , "70\\d{8}", , , , "7012345678"], [, , "56\\d{8}", , , , "5612345678"], "IM", 44, "00", "0", , , "([25-8]\\d{5})$|0", "1624$1", , , , , [, , , , , , , , , [-1]], , "74576|(?:16|7[56])24", [, , , , , , , , , [-1]], [, , "3440[49]06\\d{3}|(?:3(?:08162|3\\d{4}|45624|7(?:0624|2299))|55\\d{4})\\d{4}", , , , "5512345678"], , , [, , , , , , , , , [-1]]], IN: [, [, , "(?:000800|[2-9]\\d\\d)\\d{7}|1\\d{7,12}", , , , , , , [8, 9, 10, 11, 12, 13], [6, 7]], [, , "2717(?:[2-7]\\d|95)\\d{4}|(?:271[0-689]|782[0-6])[2-7]\\d{5}|(?:170[24]|2(?:(?:[02][2-79]|90)\\d|80[13468])|(?:3(?:23|80)|683|79[1-7])\\d|4(?:20[24]|72[2-8])|552[1-7])\\d{6}|(?:11|33|4[04]|80)[2-7]\\d{7}|(?:342|674|788)(?:[0189][2-7]|[2-7]\\d)\\d{5}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[13]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[014-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[3-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1245]|4[5-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])|7(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|8[013-7]|9[089])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d[2-7]\\d{5}", , , , "7410410123", , , [10], [6, 7, 8]], [, , "(?:61279|7(?:887[02-9]|9(?:313|79[07-9]))|8(?:079[04-9]|(?:84|91)7[02-8]))\\d{5}|(?:6(?:12|[2-47]1|5[17]|6[13]|80)[0189]|7(?:1(?:2[0189]|9[0-5])|2(?:[14][017-9]|8[0-59])|3(?:2[5-8]|[34][017-9]|9[016-9])|4(?:1[015-9]|[29][89]|39|8[389])|5(?:[15][017-9]|2[04-9]|9[7-9])|6(?:0[0-47]|1[0-257-9]|2[0-4]|3[19]|5[4589])|70[0289]|88[089]|97[02-8])|8(?:0(?:6[67]|7[02-8])|70[017-9]|84[01489]|91[0-289]))\\d{6}|(?:7(?:31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[0189]\\d|7[02-8])\\d{5}|(?:6(?:[09]\\d|1[04679]|2[03689]|3[05-9]|4[0489]|50|6[069]|7[07]|8[7-9])|7(?:0\\d|2[0235-79]|3[05-8]|40|5[0346-8]|6[6-9]|7[1-9]|8[0-79]|9[089])|8(?:0[01589]|1[0-57-9]|2[235-9]|3[03-57-9]|[45]\\d|6[02457-9]|7[1-69]|8[0-25-9]|9[02-9])|9\\d\\d)\\d{7}|(?:6(?:(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|8[124-6])\\d|7(?:[235689]\\d|4[0189]))|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-5])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]|881))[0189]\\d{5}", , , , "8123456789", , , [10]], [, , "000800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))", , , , "1800123456"], [, , "186[12]\\d{9}", , , , "1861123456789", , , [13]], [, , "1860\\d{7}", , , , "18603451234", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IN", 91, "00", "0", , , "0", , , , [[, "(\\d{7})", "$1", ["575"]], [, "(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], , , 1], [, "(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], , , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], , , 1], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", , 1], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", , 1], [, "(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", , 1], [, "(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], , , 1], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["0"]], [, "(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], , , 1]], [[, "(\\d{8})", "$1", ["5(?:0|2[23]|3[03]|[67]1|88)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|888)", "5(?:0|2(?:21|3)|3(?:0|3[23])|616|717|8888)"], , , 1], [, "(\\d{4})(\\d{4,5})", "$1 $2", ["180", "1800"], , , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["140"], , , 1], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["11|2[02]|33|4[04]|79[1-7]|80[2-46]", "11|2[02]|33|4[04]|79(?:[1-6]|7[19])|80(?:[2-4]|6[0-589])", "11|2[02]|33|4[04]|79(?:[124-6]|3(?:[02-9]|1[0-24-9])|7(?:1|9[1-6]))|80(?:[2-4]|6[0-589])"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1(?:2[0-249]|3[0-25]|4[145]|[68]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1)|6(?:12|[2-4]1|5[17]|6[13]|80)|7(?:12|3[134]|4[47]|61|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)|(?:43|59|75)[15]|(?:1[59]|29|67|72)[14]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|674|7(?:(?:2[14]|3[34]|5[15])[2-6]|61[346]|88[0-8])|8(?:70[2-6]|84[235-7]|91[3-7])|(?:1(?:29|60|8[06])|261|552|6(?:12|[2-47]1|5[17]|6[13]|80)|7(?:12|31|4[47])|8(?:16|2[014]|3[126]|6[136]|7[78]|83))[2-7]", "1(?:2[0-24]|3[0-25]|4[145]|[59][14]|6[1-9]|7[1257]|8[1-57-9])|2(?:1[257]|3[013]|4[01]|5[0137]|6[058]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|[578]1|9[15])|6(?:12(?:[2-6]|7[0-8])|74[2-7])|7(?:(?:2[14]|5[15])[2-6]|3171|61[346]|88(?:[2-7]|82))|8(?:70[2-6]|84(?:[2356]|7[19])|91(?:[3-6]|7[19]))|73[134][2-6]|(?:74[47]|8(?:16|2[014]|3[126]|6[136]|7[78]|83))(?:[2-6]|7[19])|(?:1(?:29|60|8[06])|261|552|6(?:[2-4]1|5[17]|6[13]|7(?:1|4[0189])|80)|7(?:12|88[01]))[2-7]"], "0$1", , 1], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2[2457-9]|3[2-5]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1[013-9]|28|3[129]|4[1-35689]|5[29]|6[02-5]|70)|807", "1(?:[2-479]|5[0235-9])|[2-5]|6(?:1[1358]|2(?:[2457]|84|95)|3(?:[2-4]|55)|4[235-7]|5[2-689]|6[24578]|7[235689]|8[1-6])|7(?:1(?:[013-8]|9[6-9])|28[6-8]|3(?:17|2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4|5[0-367])|70[13-7])|807[19]", "1(?:[2-479]|5(?:[0236-9]|5[013-9]))|[2-5]|6(?:2(?:84|95)|355|83)|73179|807(?:1|9[1-3])|(?:1552|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|5[2-689]|6[24578]|7[235689]|8[124-6])\\d|7(?:1(?:[013-8]\\d|9[6-9])|28[6-8]|3(?:2[0-49]|9[2-57])|4(?:1[2-4]|[29][0-7]|3[0-8]|[56]\\d|8[0-24-7])|5(?:2[1-3]|9[0-6])|6(?:0[5689]|2[5-9]|3[02-8]|4\\d|5[0-367])|70[13-7]))[2-7]"], "0$1", , 1], [, "(\\d{5})(\\d{5})", "$1 $2", ["[6-9]"], "0$1", , 1], [, "(\\d{4})(\\d{2,4})(\\d{4})", "$1 $2 $3", ["1(?:6|8[06])", "1(?:6|8[06]0)"], , , 1], [, "(\\d{4})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["18"], , , 1]], [, , , , , , , , , [-1]], , , [, , "1(?:600\\d{6}|800\\d{4,9})|(?:000800|18(?:03\\d\\d|6(?:0|[12]\\d\\d)))\\d{7}"], [, , "140\\d{7}", , , , "1409305260", , , [10]], , , [, , , , , , , , , [-1]]], IO: [, [, , "3\\d{6}", , , , , , , [7]], [, , "37\\d{5}", , , , "3709100"], [, , "38\\d{5}", , , , "3801234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IO", 246, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["3"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], IQ: [, [, , "(?:1|7\\d\\d)\\d{7}|[2-6]\\d{7,8}", , , , , , , [8, 9, 10], [6, 7]], [, , "1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}", , , , "12345678", , , [8, 9], [6, 7]], [, , "7[3-9]\\d{8}", , , , "7912345678", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IQ", 964, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-6]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], IR: [, [, , "[1-9]\\d{9}|(?:[1-8]\\d\\d|9)\\d{3,4}", , , , , , , [4, 5, 6, 7, 10], [8]], [, , "(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:[03-57]\\d{7}|[16]\\d{3}(?:\\d{4})?|[289]\\d{3}(?:\\d(?:\\d{3})?)?)|94(?:000[09]|2(?:121|[2689]0\\d)|30[0-2]\\d|4(?:111|40\\d))\\d{4}", , , , "2123456789", , , [6, 7, 10], [4, 5, 8]], [, , "9(?:(?:0(?:[0-35]\\d|4[4-6])|(?:[13]\\d|2[0-3])\\d)\\d|9(?:[0-46]\\d\\d|5[15]0|8(?:[12]\\d|88)|9(?:0[0-3]|[19]\\d|21|69|77|8[7-9])))\\d{5}", , , , "9123456789", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "IR", 98, "00", "0", , , "0", , , , [[, "(\\d{4,5})", "$1", ["96"], "0$1"], [, "(\\d{2})(\\d{4,5})", "$1 $2", ["(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])[12689]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["9"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["[1-8]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "9(?:4440\\d{5}|6(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19]))", , , , , , , [4, 5, 10]], [, , "96(?:0[12]|2[16-8]|3(?:08|[14]5|[23]|66)|4(?:0|80)|5[01]|6[89]|86|9[19])", , , , "9601", , , [4, 5]], , , [, , , , , , , , , [-1]]], IS: [, [, , "(?:38\\d|[4-9])\\d{6}", , , , , , , [7, 9]], [, , "(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-24589]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|872)\\d{4}", , , , "4101234", , , [7]], [, , "(?:38[589]\\d\\d|6(?:1[1-8]|2[0-6]|3[026-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-9]\\d)|8(?:2[0-59]|[3-69]\\d|8[238]))\\d{4}", , , , "6111234"], [, , "80[0-8]\\d{4}", , , , "8001234", , , [7]], [, , "90(?:0\\d|1[5-79]|2[015-79]|3[135-79]|4[125-7]|5[25-79]|7[1-37]|8[0-35-7])\\d{3}", , , , "9001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "49[0-24-79]\\d{4}", , , , "4921234", , , [7]], "IS", 354, "00|1(?:0(?:01|[12]0)|100)", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[4-9]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["3"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "809\\d{4}", , , , "8091234", , , [7]], , , [, , "(?:689|8(?:7[18]|80)|95[48])\\d{4}", , , , "6891234", , , [7]]], IT: [, [, , "0\\d{5,10}|1\\d{8,10}|3(?:[0-8]\\d{7,10}|9\\d{7,8})|(?:55|70)\\d{8}|8\\d{5}(?:\\d{2,4})?", , , , , , , [6, 7, 8, 9, 10, 11, 12]], [, , "0669[0-79]\\d{1,6}|0(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|2\\d\\d|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|6(?:[0-57-9]\\d|6[0-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2-46]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[3-578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7}", , , , "0212345678", , , [6, 7, 8, 9, 10, 11]], [, , "3[1-9]\\d{8}|3[2-9]\\d{7}", , , , "3123456789", , , [9, 10]], [, , "80(?:0\\d{3}|3)\\d{3}", , , , "800123456", , , [6, 9]], [, , "(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", , , , "899123456", , , [6, 8, 9, 10]], [, , "84(?:[08]\\d{3}|[17])\\d{3}", , , , "848123456", , , [6, 9]], [, , "1(?:78\\d|99)\\d{6}", , , , "1781234567", , , [9, 10]], [, , "55\\d{8}", , , , "5512345678", , , [10]], "IT", 39, "00", , , , , , , , [[, "(\\d{4,5})", "$1", ["1(?:0|9[246])", "1(?:0|9(?:2[2-9]|[46]))"]], [, "(\\d{6})", "$1", ["1(?:1|92)"]], [, "(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], [, "(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]], [, "(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["894"]], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]"]], [, "(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]], [, "(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], [, "(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]], [[, "(\\d{2})(\\d{4,6})", "$1 $2", ["0[26]"]], [, "(\\d{3})(\\d{3,6})", "$1 $2", ["0[13-57-9][0159]|8(?:03|4[17]|9[2-5])", "0[13-57-9][0159]|8(?:03|4[17]|9(?:2|3[04]|[45][0-4]))"]], [, "(\\d{4})(\\d{2,6})", "$1 $2", ["0(?:[13-579][2-46-8]|8[236-8])"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["894"]], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[26]|5"]], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["1(?:44|[679])|[378]"]], [, "(\\d{3})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0[13-57-9][0159]|14"]], [, "(\\d{2})(\\d{4})(\\d{5})", "$1 $2 $3", ["0[26]"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["0"]], [, "(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["3"]]], [, , , , , , , , , [-1]], 1, , [, , "848\\d{6}", , , , , , , [9]], [, , , , , , , , , [-1]], , , [, , "3[2-8]\\d{9,10}", , , , "33101234501", , , [11, 12]]], JE: [, [, , "1534\\d{6}|(?:[3578]\\d|90)\\d{8}", , , , , , , [10], [6]], [, , "1534[0-24-8]\\d{5}", , , , "1534456789", , , , [6]], [, , "7(?:(?:(?:50|82)9|937)\\d|7(?:00[378]|97[7-9]))\\d{5}", , , , "7797712345"], [, , "80(?:07(?:35|81)|8901)\\d{4}", , , , "8007354567"], [, , "(?:8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|90(?:066[59]|1810|71(?:07|55)))\\d{4}", , , , "9018105678"], [, , , , , , , , , [-1]], [, , "701511\\d{4}", , , , "7015115678"], [, , "56\\d{8}", , , , "5612345678"], "JE", 44, "00", "0", , , "([0-24-8]\\d{5})$|0", "1534$1", , , , , [, , "76(?:464|652)\\d{5}|76(?:0[0-28]|2[356]|34|4[01347]|5[49]|6[0-369]|77|8[14]|9[139])\\d{6}", , , , "7640123456"], , , [, , , , , , , , , [-1]], [, , "(?:3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))|55\\d{4})\\d{4}", , , , "5512345678"], , , [, , , , , , , , , [-1]]], JM: [, [, , "(?:[58]\\d\\d|658|900)\\d{7}", , , , , , , [10], [7]], [, , "8766060\\d{3}|(?:658(?:2(?:[0-8]\\d|9[0-46-9])|[3-9]\\d\\d)|876(?:52[35]|6(?:0[1-3579]|1[0235-9]|[23]\\d|40|5[06]|6[2-589]|7[0-25-9]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468])))\\d{4}", , , , "8765230123", , , , [7]], [, , "(?:658295|876(?:2(?:0[1-9]|[13-9]\\d|2[013-9])|[348]\\d\\d|5(?:0[1-9]|[1-9]\\d)|6(?:4[89]|6[67])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579])))\\d{4}", , , , "8762101234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "JM", 1, "011", "1", , , "1", , , , , , [, , , , , , , , , [-1]], , "658|876", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], JO: [, [, , "(?:(?:[2689]|7\\d)\\d|32|53)\\d{6}", , , , , , , [8, 9]], [, , "87(?:000|90[01])\\d{3}|(?:2(?:6(?:2[0-35-9]|3[0-578]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[5-7][023])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2(?:[05]0|22)|3(?:00|33)|4(?:0[0-25]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[178]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[0239]))|87(?:20|7[078]|99))\\d{4}", , , , "62001234", , , [8]], [, , "7(?:[78][0-25-9]|9\\d)\\d{6}", , , , "790123456", , , [9]], [, , "80\\d{6}", , , , "80012345", , , [8]], [, , "9\\d{7}", , , , "90012345", , , [8]], [, , "85\\d{6}", , , , "85012345", , , [8]], [, , "70\\d{7}", , , , "700123456", , , [9]], [, , , , , , , , , [-1]], "JO", 962, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2356]|87"], "(0$1)"], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[89]"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["70"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["7"], "0$1"]], , [, , "74(?:66|77)\\d{5}", , , , "746612345", , , [9]], , , [, , , , , , , , , [-1]], [, , "8(?:10|8\\d)\\d{5}", , , , "88101234", , , [8]], , , [, , , , , , , , , [-1]]], JP: [, [, , "00[1-9]\\d{6,14}|[257-9]\\d{9}|(?:00|[1-9]\\d\\d)\\d{6}", , , , , , , [8, 9, 10, 11, 12, 13, 14, 15, 16, 17]], [, , "(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|(?:2[2-9]|[36][1-9])\\d|4(?:[2-578]\\d|6[02-8]|9[2-59])|5(?:[2-589]\\d|6[1-9]|7[2-8])|7(?:[25-9]\\d|3[4-9]|4[02-9])|8(?:[2679]\\d|3[2-9]|4[5-9]|5[1-9]|8[03-9])|9(?:[2-58]\\d|[679][1-9]))\\d{6}", , , , "312345678", , , [9]], [, , "[7-9]0[1-9]\\d{7}", , , , "9012345678", , , [10]], [, , "00777(?:[01]|5\\d)\\d\\d|(?:00(?:7778|882[1245])|(?:120|800\\d)\\d\\d)\\d{4}|00(?:37|66|78)\\d{6,13}", , , , "120123456"], [, , "990\\d{6}", , , , "990123456", , , [9]], [, , , , , , , , , [-1]], [, , "60\\d{7}", , , , "601234567", , , [9]], [, , "50[1-9]\\d{7}", , , , "5012345678", , , [10]], "JP", 81, "010", "0", , , "(000[259]\\d{6})$|(?:(?:003768)0?)|0", "$1", , , [[, "(\\d{4})(\\d{4})", "$1-$2", ["007", "0077", "00777", "00777[01]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"], [, "(\\d{4})(\\d{2})(\\d{3,4})", "$1-$2-$3", ["007", "0077"]], [, "(\\d{4})(\\d{2})(\\d{4})", "$1-$2-$3", ["008"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[257-9]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3,4})", "$1-$2-$3", ["0"]], [, "(\\d{4})(\\d{4})(\\d{4,5})", "$1-$2-$3", ["0"]], [, "(\\d{4})(\\d{5})(\\d{5,6})", "$1-$2-$3", ["0"]], [, "(\\d{4})(\\d{6})(\\d{6,7})", "$1-$2-$3", ["0"]]], [[, "(\\d{3})(\\d{3})(\\d{3})", "$1-$2-$3", ["(?:12|57|99)0"], "0$1"], [, "(\\d{4})(\\d)(\\d{4})", "$1-$2-$3", ["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51)|9(?:80|9[16])", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[7-9]|96)|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]", "1(?:267|3(?:7[247]|9[278])|466|5(?:47|58|64)|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[7-9]|96[2457-9])|477|51[2-9])|9(?:802|9(?:1[23]|69))|1(?:45|58)[67]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1-$2-$3", ["[36]|4(?:2[09]|7[01])", "[36]|4(?:2(?:0|9[02-69])|7(?:0[019]|1))"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["1(?:1|5[45]|77|88|9[69])|2(?:2[1-37]|3[0-269]|4[59]|5|6[24]|7[1-358]|8[1369]|9[0-38])|4(?:[28][1-9]|3[0-57]|[45]|6[248]|7[2-579]|9[29])|5(?:2|3[0459]|4[0-369]|5[29]|8[02389]|9[0-389])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9[2-6])|8(?:2[124589]|3[26-9]|49|51|6|7[0-468]|8[68]|9[019])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9[1-489])", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2(?:[127]|3[014-9])|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9[19])|62|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|8[1-9]|9[29])|5(?:2|3(?:[045]|9[0-8])|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0-2469])|3(?:[29]|60)|49|51|6(?:[0-24]|36|5[0-3589]|7[23]|9[01459])|7[0-468]|8[68])|9(?:[23][1-9]|4[15]|5[138]|6[1-3]|7[156]|8[189]|9(?:[1289]|3[34]|4[0178]))|(?:264|837)[016-9]|2(?:57|93)[015-9]|(?:25[0468]|422|838)[01]|(?:47[59]|59[89]|8(?:6[68]|9))[019]", "1(?:1|5(?:4[018]|5[017])|77|88|9[69])|2(?:2[127]|3[0-269]|4[59]|5(?:[1-3]|5[0-69]|9(?:17|99))|6(?:2|4[016-9])|7(?:[1-35]|8[0189])|8(?:[16]|3[0134]|9[0-5])|9(?:[028]|17))|4(?:2(?:[13-79]|8[014-6])|3[0-57]|[45]|6[248]|7[2-47]|9[29])|5(?:2|3(?:[045]|9(?:[0-58]|6[4-9]|7[0-35689]))|4[0-369]|5[29]|8[02389]|9[0-3])|7(?:2[02-46-9]|34|[58]|6[0249]|7[57]|9(?:[23]|4[0-59]|5[01569]|6[0167]))|8(?:2(?:[1258]|4[0-39]|9[0169])|3(?:[29]|60|7(?:[017-9]|6[6-8]))|49|51|6(?:[0-24]|36[2-57-9]|5(?:[0-389]|5[23])|6(?:[01]|9[178])|7(?:2[2-468]|3[78])|9[0145])|7[0-468]|8[68])|9(?:4[15]|5[138]|7[156]|8[189]|9(?:[1289]|3(?:31|4[357])|4[0178]))|(?:8294|96)[1-3]|2(?:57|93)[015-9]|(?:223|8699)[014-9]|(?:25[0468]|422|838)[01]|(?:48|8292|9[23])[1-9]|(?:47[59]|59[89]|8(?:68|9))[019]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3", ["[14]|[289][2-9]|5[3-9]|7[2-4679]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["800"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[257-9]"], "0$1"]], [, , "20\\d{8}", , , , "2012345678", , , [10]], , , [, , "00(?:777(?:[01]|(?:5|8\\d)\\d)|882[1245]\\d\\d)\\d\\d|00(?:37|66|78)\\d{6,13}"], [, , "570\\d{6}", , , , "570123456", , , [9]], , , [, , , , , , , , , [-1]]], KE: [, [, , "(?:[17]\\d\\d|900)\\d{6}|(?:2|80)0\\d{6,7}|[4-6]\\d{6,8}", , , , , , , [7, 8, 9, 10]], [, , "(?:4[245]|5[1-79]|6[01457-9])\\d{5,7}|(?:4[136]|5[08]|62)\\d{7}|(?:[24]0|66)\\d{6,7}", , , , "202012345", , , [7, 8, 9]], [, , "(?:1(?:0[0-6]|1[0-5]|2[014]|30)|7\\d\\d)\\d{6}", , , , "712123456", , , [9]], [, , "800[2-8]\\d{5,6}", , , , "800223456", , , [9, 10]], [, , "900[02-9]\\d{5}", , , , "900223456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KE", 254, "000", "0", , , "0", , , , [[, "(\\d{2})(\\d{5,7})", "$1 $2", ["[24-6]"], "0$1"], [, "(\\d{3})(\\d{6})", "$1 $2", ["[17]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KG: [, [, , "8\\d{9}|[235-9]\\d{8}", , , , , , , [9, 10], [5, 6]], [, , "312(?:5[0-79]\\d|9(?:[0-689]\\d|7[0-24-9]))\\d{3}|(?:3(?:1(?:2[0-46-8]|3[1-9]|47|[56]\\d)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}", , , , "312123456", , , [9], [5, 6]], [, , "312(?:58\\d|973)\\d{3}|(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|600|7(?:[07]\\d|55)|88[08]|9(?:12|9[05-9]))\\d{6}", , , , "700123456", , , [9]], [, , "800\\d{6,7}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KG", 996, "00", "0", , , "0", , , , [[, "(\\d{4})(\\d{5})", "$1 $2", ["3(?:1[346]|[24-79])"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[235-79]|88"], "0$1"], [, "(\\d{3})(\\d{3})(\\d)(\\d{2,3})", "$1 $2 $3 $4", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KH: [, [, , "1\\d{9}|[1-9]\\d{7,8}", , , , , , , [8, 9, 10], [6, 7]], [, , "23(?:4(?:[2-4]|[56]\\d)|[568]\\d\\d)\\d{4}|23[236-9]\\d{5}|(?:2[4-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:(?:[237-9]|4[56]|5\\d)\\d{5}|6\\d{5,6})", , , , "23756789", , , [8, 9], [6, 7]], [, , "(?:(?:1[28]|3[18]|9[67])\\d|6[016-9]|7(?:[07-9]|[16]\\d)|8(?:[013-79]|8\\d))\\d{6}|(?:1\\d|9[0-57-9])\\d{6}|(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])48\\d{5}", , , , "91234567", , , [8, 9]], [, , "1800(?:1\\d|2[019])\\d{4}", , , , "1800123456", , , [10]], [, , "1900(?:1\\d|2[09])\\d{4}", , , , "1900123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KH", 855, "00[14-9]", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-9]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KI: [, [, , "(?:[37]\\d|6[0-79])\\d{6}|(?:[2-48]\\d|50)\\d{3}", , , , , , , [5, 8]], [, , "(?:[24]\\d|3[1-9]|50|65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d\\d|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500))|8[0-5])\\d{3}", , , , "31234"], [, , "(?:6200[01]|7(?:310[1-9]|5(?:02[03-9]|12[0-47-9]|22[0-7]|[34](?:0[1-9]|8[02-9])|50[1-9])))\\d{3}|(?:63\\d\\d|7(?:(?:[0146-9]\\d|2[0-689])\\d|3(?:[02-9]\\d|1[1-9])|5(?:[0-2][013-9]|[34][1-79]|5[1-9]|[6-9]\\d)))\\d{4}", , , , "72001234", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "30(?:0[01]\\d\\d|12(?:11|20))\\d\\d", , , , "30010000", , , [8]], "KI", 686, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KM: [, [, , "[3478]\\d{6}", , , , , , , [7], [4]], [, , "7[4-7]\\d{5}", , , , "7712345", , , , [4]], [, , "[34]\\d{6}", , , , "3212345"], [, , , , , , , , , [-1]], [, , "8\\d{6}", , , , "8001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KM", 269, "00", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[3478]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KN: [, [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "869(?:2(?:29|36)|302|4(?:6[015-9]|70)|56[5-7])\\d{4}", , , , "8692361234", , , , [7]], [, , "869(?:48[89]|55[6-8]|66\\d|76[02-7])\\d{4}", , , , "8697652917", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "KN", 1, "011", "1", , , "([2-7]\\d{6})$|1", "869$1", , , , , [, , , , , , , , , [-1]], , "869", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KP: [, [, , "85\\d{6}|(?:19\\d|[2-7])\\d{7}", , , , , , , [8, 10], [6, 7]], [, , "(?:(?:195|2)\\d|3[19]|4[159]|5[37]|6[17]|7[39]|85)\\d{6}", , , , "21234567", , , , [6, 7]], [, , "19[1-3]\\d{7}", , , , "1921234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KP", 850, "00|99", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"], "0$1"], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-7]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "238[02-9]\\d{4}|2(?:[0-24-9]\\d|3[0-79])\\d{5}", , , , , , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KR: [, [, , "00[1-9]\\d{8,11}|(?:[12]|5\\d{3})\\d{7}|[13-6]\\d{9}|(?:[1-6]\\d|80)\\d{7}|[3-6]\\d{4,5}|(?:00|7)0\\d{8}", , , , , , , [5, 6, 8, 9, 10, 11, 12, 13, 14], [3, 4, 7]], [, , "(?:2|3[1-3]|[46][1-4]|5[1-5])[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])1\\d{2,3}", , , , "22123456", , , [5, 6, 8, 9, 10], [3, 4, 7]], [, , "1(?:05(?:[0-8]\\d|9[0-6])|22[13]\\d)\\d{4,5}|1(?:0[0-46-9]|[16-9]\\d|2[013-9])\\d{6,7}", , , , "1020000000", , , [9, 10]], [, , "00(?:308\\d{6,7}|798\\d{7,9})|(?:00368|80)\\d{7}", , , , "801234567", , , [9, 11, 12, 13, 14]], [, , "60[2-9]\\d{6}", , , , "602345678", , , [9]], [, , , , , , , , , [-1]], [, , "50\\d{8,9}", , , , "5012345678", , , [10, 11]], [, , "70\\d{8}", , , , "7012345678", , , [10]], "KR", 82, "00(?:[125689]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))", "0", , , "0(8(?:[1-46-8]|5\\d\\d))?", , , , [[, "(\\d{5})", "$1", ["1[016-9]1", "1[016-9]11", "1[016-9]114"], "0$1"], [, "(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1", "0$CC-$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["1"]], [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60|8"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1", "0$CC-$1"], [, "(\\d{5})(\\d{3})(\\d{3})", "$1 $2 $3", ["003", "0030"]], [, "(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1", "0$CC-$1"], [, "(\\d{5})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["0"]], [, "(\\d{5})(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["0"]]], [[, "(\\d{2})(\\d{3,4})", "$1-$2", ["(?:3[1-3]|[46][1-4]|5[1-5])1"], "0$1", "0$CC-$1"], [, "(\\d{4})(\\d{4})", "$1-$2", ["1"]], [, "(\\d)(\\d{3,4})(\\d{4})", "$1-$2-$3", ["2"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1-$2-$3", ["60|8"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1-$2-$3", ["[1346]|5[1-5]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2-$3", ["[57]"], "0$1", "0$CC-$1"], [, "(\\d{2})(\\d{5})(\\d{4})", "$1-$2-$3", ["5"], "0$1", "0$CC-$1"]], [, , "15\\d{7,8}", , , , "1523456789", , , [9, 10]], , , [, , "00(?:3(?:08\\d{6,7}|68\\d{7})|798\\d{7,9})", , , , , , , [11, 12, 13, 14]], [, , "1(?:5(?:22|33|44|66|77|88|99)|6(?:[07]0|44|6[168]|88)|8(?:00|33|55|77|99))\\d{4}", , , , "15441234", , , [8]], , , [, , , , , , , , , [-1]]], KW: [, [, , "18\\d{5}|(?:[2569]\\d|41)\\d{6}", , , , , , , [7, 8]], [, , "2(?:[23]\\d\\d|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7]))\\d{4}", , , , "22345678", , , [8]], [, , "(?:41\\d\\d|5(?:(?:[05]\\d|1[0-7]|6[56])\\d|2(?:22|5[25])|7(?:55|77)|88[58])|6(?:(?:0[034679]|5[015-9]|6\\d)\\d|1(?:00|11|66)|222|3[36]3|444|7(?:0[013-9]|[67]\\d)|888|9(?:[069]\\d|3[039]))|9(?:(?:0[09]|[4679]\\d|8[057-9])\\d|1(?:1[01]|99)|2(?:00|2\\d)|3(?:00|3[03])|5(?:00|5\\d)))\\d{4}", , , , "50012345", , , [8]], [, , "18\\d{5}", , , , "1801234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "KW", 965, "00", , , , , , , , [[, "(\\d{4})(\\d{3,4})", "$1 $2", ["[169]|2(?:[235]|4[1-35-9])|52"]], [, "(\\d{3})(\\d{5})", "$1 $2", ["[245]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KY: [, [, , "(?:345|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "345(?:2(?:22|3[23]|44|66)|333|444|6(?:23|38|40)|7(?:30|4[35-79]|6[6-9]|77)|8(?:00|1[45]|[48]8)|9(?:14|4[035-9]))\\d{4}", , , , "3452221234", , , , [7]], [, , "345(?:32[1-9]|42[0-4]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|82[56]|9(?:1[679]|2[2-9]|3[06-9]|90))\\d{4}", , , , "3453231234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "(?:345976|900[2-9]\\d\\d)\\d{4}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "KY", 1, "011", "1", , , "([2-9]\\d{6})$|1", "345$1", , , , , [, , "345849\\d{4}", , , , "3458491234"], , "345", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], KZ: [, [, , "(?:33622|8\\d{8})\\d{5}|[78]\\d{9}", , , , , , , [10, 14], [5, 6, 7]], [, , "(?:33622|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9]|97)|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[2-4]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]|59))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[2-4]\\d|5[139])|4(?:2\\d|3[1-35-9]|59)|5(?:[23]\\d|4[0-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59))))\\d{5}", , , , "7123456789", , , [10], [5, 6, 7]], [, , "7(?:0[0-25-8]|47|6[0-4]|7[15-8]|85)\\d{7}", , , , "7710009998", , , [10]], [, , "8(?:00|108\\d{3})\\d{7}", , , , "8001234567"], [, , "809\\d{7}", , , , "8091234567", , , [10]], [, , , , , , , , , [-1]], [, , "808\\d{7}", , , , "8081234567", , , [10]], [, , "751\\d{7}", , , , "7511234567", , , [10]], "KZ", 7, "810", "8", , , "8", , "8~10", , , , [, , , , , , , , , [-1]], , "33|7", [, , "751\\d{7}", , , , , , , [10]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], LA: [, [, , "[23]\\d{9}|3\\d{8}|(?:[235-8]\\d|41)\\d{6}", , , , , , , [8, 9, 10], [6]], [, , "(?:2[13]|[35-7][14]|41|8[1468])\\d{6}", , , , "21212862", , , [8], [6]], [, , "(?:20(?:[2359]\\d|7[6-8]|88)|302\\d)\\d{6}", , , , "2023123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LA", 856, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2[13]|3[14]|[4-8]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["30[013-9]"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[23]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "30[013-9]\\d{6}", , , , "301234567", , , [9]], , , [, , , , , , , , , [-1]]], LB: [, [, , "[27-9]\\d{7}|[13-9]\\d{6}", , , , , , , [7, 8]], [, , "7(?:62|8[0-7]|9[04-9])\\d{4}|(?:[14-69]\\d|2(?:[14-69]\\d|[78][1-9])|7[2-57]|8[02-9])\\d{5}", , , , "1123456"], [, , "793(?:[01]\\d|2[0-4])\\d{3}|(?:(?:3|81)\\d|7(?:[01]\\d|6[013-9]|8[89]|9[12]))\\d{5}", , , , "71123456"], [, , , , , , , , , [-1]], [, , "9[01]\\d{6}", , , , "90123456", , , [8]], [, , "80\\d{6}", , , , "80123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LB", 961, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[27-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], LC: [, [, , "(?:[58]\\d\\d|758|900)\\d{7}", , , , , , , [10], [7]], [, , "758(?:234|4(?:30|5\\d|6[2-9]|8[0-2])|57[0-2]|(?:63|75)8)\\d{4}", , , , "7584305678", , , , [7]], [, , "758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[0-3])|812)\\d{4}", , , , "7582845678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "LC", 1, "011", "1", , , "([2-8]\\d{6})$|1", "758$1", , , , , [, , , , , , , , , [-1]], , "758", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], LI: [, [, , "[68]\\d{8}|(?:[2378]\\d|90)\\d{5}", , , , , , , [7, 9]], [, , "(?:2(?:01|1[27]|2[02]|3\\d|6[02-578]|96)|3(?:[24]0|33|7[0135-7]|8[048]|9[0269]))\\d{4}", , , , "2345678", , , [7]], [, , "(?:6(?:(?:4[5-9]|5[0-4])\\d|6(?:[0245]\\d|[17]0|3[7-9]))\\d|7(?:[37-9]\\d|42|56))\\d{4}", , , , "660234567"], [, , "8002[28]\\d\\d|80(?:05\\d|9)\\d{4}", , , , "8002222"], [, , "90(?:02[258]|1(?:23|3[14])|66[136])\\d\\d", , , , "9002222", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LI", 423, "00", "0", , , "(1001)|0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3", ["[2379]|8(?:0[09]|7)", "[2379]|8(?:0(?:02|9)|7)"], , "$CC $1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["69"], , "$CC $1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"], , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "870(?:28|87)\\d\\d", , , , "8702812", , , [7]], , , [, , "697(?:42|56|[78]\\d)\\d{4}", , , , "697861234", , , [9]]], LK: [, [, , "[1-9]\\d{8}", , , , , , , [9], [7]], [, , "(?:12[2-9]|602|8[12]\\d|9(?:1\\d|22|9[245]))\\d{6}|(?:11|2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7])[2-57]\\d{6}", , , , "112345678", , , , [7]], [, , "7(?:[0-25-8]\\d|4[0-4])\\d{6}", , , , "712345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LK", 94, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[1-689]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "1973\\d{5}", , , , "197312345"], , , [, , , , , , , , , [-1]]], LR: [, [, , "(?:[25]\\d|33|77|88)\\d{7}|(?:2\\d|[4-6])\\d{6}", , , , , , , [7, 8, 9]], [, , "2\\d{7}", , , , "21234567", , , [8]], [, , "(?:(?:(?:22|33)0|555|(?:77|88)\\d)\\d|4[67])\\d{5}|[56]\\d{6}", , , , "770123456", , , [7, 9]], [, , , , , , , , , [-1]], [, , "332(?:02|[34]\\d)\\d{4}", , , , "332021234", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LR", 231, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[4-6]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23578]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], LS: [, [, , "(?:[256]\\d\\d|800)\\d{5}", , , , , , , [8]], [, , "2\\d{7}", , , , "22123456"], [, , "[56]\\d{7}", , , , "50123456"], [, , "800[256]\\d{4}", , , , "80021234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LS", 266, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2568]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], LT: [, [, , "(?:[3469]\\d|52|[78]0)\\d{6}", , , , , , , [8]], [, , "(?:3[1478]|4[124-6]|52)\\d{6}", , , , "31234567"], [, , "6\\d{7}", , , , "61234567"], [, , "80[02]\\d{5}", , , , "80012345"], [, , "9(?:0[0239]|10)\\d{5}", , , , "90012345"], [, , "808\\d{5}", , , , "80812345"], [, , "70[05]\\d{5}", , , , "70012345"], [, , "[89]01\\d{5}", , , , "80123456"], "LT", 370, "00", "8", , , "[08]", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["52[0-7]"], "(8-$1)", , 1], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[7-9]"], "8 $1", , 1], [, "(\\d{2})(\\d{6})", "$1 $2", ["37|4(?:[15]|6[1-8])"], "(8-$1)", , 1], [, "(\\d{3})(\\d{5})", "$1 $2", ["[3-6]"], "(8-$1)", , 1]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "70[67]\\d{5}", , , , "70712345"], , , [, , , , , , , , , [-1]]], LU: [, [, , "35[013-9]\\d{4,8}|6\\d{8}|35\\d{2,4}|(?:[2457-9]\\d|3[0-46-9])\\d{2,9}", , , , , , , [4, 5, 6, 7, 8, 9, 10, 11]], [, , "(?:35[013-9]|80[2-9]|90[89])\\d{1,8}|(?:2[2-9]|3[0-46-9]|[457]\\d|8[13-9]|9[2-579])\\d{2,9}", , , , "27123456"], [, , "6(?:[269][18]|5[1568]|7[189]|81)\\d{6}", , , , "628123456", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "90[015]\\d{5}", , , , "90012345", , , [8]], [, , "801\\d{5}", , , , "80112345", , , [8]], [, , , , , , , , , [-1]], [, , "20(?:1\\d{5}|[2-689]\\d{1,7})", , , , "20201234", , , [4, 5, 6, 7, 8, 9, 10]], "LU", 352, "00", , , , "(15(?:0[06]|1[12]|[35]5|4[04]|6[26]|77|88|99)\\d)", , , , [[, "(\\d{2})(\\d{3})", "$1 $2", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["2(?:0[2-689]|[2-9])|[3-57]|8(?:0[2-9]|[13-9])|9(?:0[89]|[2-579])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["20[2-689]"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4", ["2(?:[0367]|4[3-8])"], , "$CC $1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["80[01]|90[015]"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["20"], , "$CC $1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})", "$1 $2 $3 $4 $5", ["2(?:[0367]|4[3-8])"], , "$CC $1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{1,5})", "$1 $2 $3 $4", ["[3-57]|8[13-9]|9(?:0[89]|[2-579])|(?:2|80)[2-9]"], , "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], LV: [, [, , "(?:[268]\\d|90)\\d{6}", , , , , , , [8]], [, , "6\\d{7}", , , , "63123456"], [, , "23(?:23[0-57-9]|33[0238])\\d{3}|2(?:[0-24-9]\\d\\d|3(?:0[07]|[14-9]\\d|2[024-9]|3[0-24-9]))\\d{4}", , , , "21234567"], [, , "80\\d{6}", , , , "80123456"], [, , "90\\d{6}", , , , "90123456"], [, , "81\\d{6}", , , , "81123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LV", 371, "00", , , , , , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[269]|8[01]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], LY: [, [, , "[2-9]\\d{8}", , , , , , , [9], [7]], [, , "(?:2(?:0[56]|[1-6]\\d|7[124579]|8[124])|3(?:1\\d|2[2356])|4(?:[17]\\d|2[1-357]|5[2-4]|8[124])|5(?:[1347]\\d|2[1-469]|5[13-5]|8[1-4])|6(?:[1-479]\\d|5[2-57]|8[1-5])|7(?:[13]\\d|2[13-79])|8(?:[124]\\d|5[124]|84))\\d{6}", , , , "212345678", , , , [7]], [, , "9[1-6]\\d{7}", , , , "912345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "LY", 218, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{7})", "$1-$2", ["[2-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MA: [, [, , "[5-8]\\d{8}", , , , , , , [9]], [, , "5293[01]\\d{4}|5(?:2(?:[0-25-7]\\d|3[1-578]|4[02-46-8]|8[0235-7]|9[0-289])|3(?:[0-47]\\d|5[02-9]|6[02-8]|8[0189]|9[3-9])|(?:4[067]|5[03])\\d)\\d{5}", , , , "520123456"], [, , "(?:6(?:[0-79]\\d|8[0-247-9])|7(?:[017]\\d|2[0-2]|6[0-8]|8[0-3]))\\d{6}", , , , "650123456"], [, , "80\\d{7}", , , , "801234567"], [, , "89\\d{7}", , , , "891234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "592(?:4[0-2]|93)\\d{4}", , , , "592401234"], "MA", 212, "00", "0", , , "0", , , , [[, "(\\d{5})(\\d{4})", "$1-$2", ["5(?:29|38)", "5(?:29[1289]|389)", "529(?:1[1-46-9]|2[013-8]|90)|5(?:298|389)[0-46-9]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5[45]"], "0$1"], [, "(\\d{4})(\\d{5})", "$1-$2", ["5(?:2[2-489]|3[5-9]|9)|892", "5(?:2(?:[2-49]|8[235-9])|3[5-9]|9)|892"], "0$1"], [, "(\\d{2})(\\d{7})", "$1-$2", ["8"], "0$1"], [, "(\\d{3})(\\d{6})", "$1-$2", ["[5-7]"], "0$1"]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MC: [, [, , "(?:[3489]|6\\d)\\d{7}", , , , , , , [8, 9]], [, , "(?:870|9[2-47-9]\\d)\\d{5}", , , , "99123456", , , [8]], [, , "4(?:[46]\\d|5[1-9])\\d{5}|(?:3|6\\d)\\d{7}", , , , "612345678"], [, , "(?:800|90\\d)\\d{5}", , , , "90123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MC", 377, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3", ["87"]], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]], [, "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]], [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["4"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[389]"]], [, "(\\d)(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["6"], "0$1"]], [, , , , , , , , , [-1]], , , [, , "8[07]0\\d{5}", , , , , , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MD: [, [, , "(?:[235-7]\\d|[89]0)\\d{6}", , , , , , , [8]], [, , "(?:(?:2[1-9]|3[1-79])\\d|5(?:33|5[257]))\\d{5}", , , , "22212345"], [, , "562\\d{5}|(?:6\\d|7[16-9])\\d{6}", , , , "62112345"], [, , "800\\d{5}", , , , "80012345"], [, , "90[056]\\d{5}", , , , "90012345"], [, , "808\\d{5}", , , , "80812345"], [, , , , , , , , , [-1]], [, , "3[08]\\d{6}", , , , "30123456"], "MD", 373, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["22|3"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["[25-7]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "803\\d{5}", , , , "80312345"], , , [, , , , , , , , , [-1]]], ME: [, [, , "(?:20|[3-79]\\d)\\d{6}|80\\d{6,7}", , , , , , , [8, 9], [6]], [, , "(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:0[2467]|1[24-7]|2[2-467]))\\d{5}", , , , "30234567", , , [8], [6]], [, , "6(?:[07-9]\\d|3[024]|6[0-25])\\d{5}", , , , "67622901", , , [8]], [, , "80(?:[0-2578]|9\\d)\\d{5}", , , , "80080002"], [, , "9(?:4[1568]|5[178])\\d{5}", , , , "94515151", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "78[1-49]\\d{5}", , , , "78108780", , , [8]], "ME", 382, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[2-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "77[1-9]\\d{5}", , , , "77273012", , , [8]], , , [, , , , , , , , , [-1]]], MF: [, [, , "590\\d{6}|(?:69|80|9\\d)\\d{7}", , , , , , , [9]], [, , "590(?:0[079]|[14]3|[27][79]|3[03-7]|5[0-268]|87)\\d{4}", , , , "590271234"], [, , "69(?:0\\d\\d|1(?:2[2-9]|3[0-5]))\\d{4}", , , , "690001234"], [, , "80[0-5]\\d{6}", , , , "800012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:(?:395|76[018])\\d|475[0-5])\\d{4}", , , , "976012345"], "MF", 590, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MG: [, [, , "[23]\\d{8}", , , , , , , [9], [7]], [, , "2072[29]\\d{4}|20(?:2\\d|4[47]|5[3467]|6[279]|7[35]|8[268]|9[245])\\d{5}", , , , "202123456", , , , [7]], [, , "3[2-47-9]\\d{7}", , , , "321234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "22\\d{7}", , , , "221234567"], "MG", 261, "00", "0", , , "([24-9]\\d{6})$|0", "20$1", , , [[, "(\\d{2})(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["[23]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MH: [, [, , "329\\d{4}|(?:[256]\\d|45)\\d{5}", , , , , , , [7]], [, , "(?:247|45[78]|528|625)\\d{4}", , , , "2471234"], [, , "(?:(?:23|54)5|329|45[356])\\d{4}", , , , "2351234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "635\\d{4}", , , , "6351234"], "MH", 692, "011", "1", , , "1", , , , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[2-6]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MK: [, [, , "[2-578]\\d{7}", , , , , , , [8], [6, 7]], [, , "(?:(?:2(?:62|77)0|3444)\\d|4[56]440)\\d{3}|(?:34|4[357])700\\d{3}|(?:2(?:[0-3]\\d|5[0-578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}", , , , "22012345", , , , [6, 7]], [, , "7(?:3555|(?:474|9[019]7)7)\\d{3}|7(?:[0-25-8]\\d\\d|3(?:[1-48]\\d|7[01578])|4(?:2\\d|60|7[01578])|9(?:[2-4]\\d|5[01]|7[015]))\\d{4}", , , , "72345678"], [, , "800\\d{5}", , , , "80012345"], [, , "5\\d{7}", , , , "50012345"], [, , "8(?:0[1-9]|[1-9]\\d)\\d{5}", , , , "80123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MK", 389, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2|34[47]|4(?:[37]7|5[47]|64)"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[347]"], "0$1"], [, "(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[58]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], ML: [, [, , "[24-9]\\d{7}", , , , , , , [8]], [, , "2(?:07[0-8]|12[67])\\d{4}|(?:2(?:02|1[4-689])|4(?:0[0-4]|4[1-39]))\\d{5}", , , , "20212345"], [, , "2(?:0(?:01|79)|17\\d)\\d{4}|(?:5[01]|[679]\\d|8[2-49])\\d{6}", , , , "65012345"], [, , "80\\d{6}", , , , "80012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ML", 223, "00", , , , , , , , [[, "(\\d{4})", "$1", ["67[057-9]|74[045]", "67(?:0[09]|[59]9|77|8[89])|74(?:0[02]|44|55)"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]], [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24-9]"]]], [, , , , , , , , , [-1]], , , [, , "80\\d{6}"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MM: [, [, , "1\\d{5,7}|95\\d{6}|(?:[4-7]|9[0-46-9])\\d{6,8}|(?:2|8\\d)\\d{5,8}", , , , , , , [6, 7, 8, 9, 10], [5]], [, , "(?:1(?:(?:2\\d|3[56]|[89][0-6])\\d|4(?:2[29]|62|7[0-2]|83)|6)|2(?:2(?:00|8[34])|4(?:0\\d|[26]2|7[0-2]|83)|51\\d\\d)|4(?:2(?:2\\d\\d|48[013])|3(?:20\\d|4(?:70|83)|56)|420\\d|5470)|6(?:0(?:[23]|88\\d)|(?:124|[56]2\\d)\\d|2472|3(?:20\\d|470)|4(?:2[04]\\d|472)|7(?:(?:3\\d|8[01459])\\d|4[67]0)))\\d{4}|5(?:2(?:2\\d{5,6}|47[02]\\d{4})|(?:3472|4(?:2(?:1|86)|470)|522\\d|6(?:20\\d|483)|7(?:20\\d|48[01])|8(?:20\\d|47[02])|9(?:20\\d|470))\\d{4})|7(?:(?:0470|4(?:25\\d|470)|5(?:202|470|96\\d))\\d{4}|1(?:20\\d{4,5}|4(?:70|83)\\d{4}))|8(?:1(?:2\\d{5,6}|4(?:10|7[01]\\d)\\d{3})|2(?:2\\d{5,6}|(?:320|490\\d)\\d{3})|(?:3(?:2\\d\\d|470)|4[24-7]|5(?:(?:2\\d|51)\\d|4(?:[1-35-9]\\d|4[0-57-9]))|6[23])\\d{4})|(?:1[2-6]\\d|4(?:2[24-8]|3[2-7]|[46][2-6]|5[3-5])|5(?:[27][2-8]|3[2-68]|4[24-8]|5[23]|6[2-4]|8[24-7]|9[2-7])|6(?:[19]20|42[03-6]|(?:52|7[45])\\d)|7(?:[04][24-8]|[15][2-7]|22|3[2-4])|8(?:1[2-689]|2[2-8]|[35]2\\d))\\d{4}|25\\d{5,6}|(?:2[2-9]|6(?:1[2356]|[24][2-6]|3[24-6]|5[2-4]|6[2-8]|7[235-7]|8[245]|9[24])|8(?:3[24]|5[245]))\\d{4}", , , , "1234567", , , [6, 7, 8, 9], [5]], [, , "(?:17[01]|9(?:2(?:[0-4]|[56]\\d\\d)|(?:3(?:[0-36]|4\\d)|(?:6\\d|8[89]|9[4-8])\\d|7(?:3|40|[5-9]\\d))\\d|4(?:(?:[0245]\\d|[1379])\\d|88)|5[0-6])\\d)\\d{4}|9[69]1\\d{6}|9(?:[68]\\d|9[089])\\d{5}", , , , "92123456", , , [7, 8, 9, 10]], [, , "80080(?:0[1-9]|2\\d)\\d{3}", , , , "8008001234", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "1333\\d{4}|[12]468\\d{4}", , , , "13331234", , , [8]], "MM", 95, "00", "0", , , "0", , , , [[, "(\\d)(\\d{2})(\\d{3})", "$1 $2 $3", ["16|2"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["[45]|6(?:0[23]|[1-689]|7[235-7])|7(?:[0-4]|5[2-7])|8[1-6]"], "0$1"], [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[4-7]|8[1-35]"], "0$1"], [, "(\\d)(\\d{3})(\\d{4,6})", "$1 $2 $3", ["9(?:2[0-4]|[35-9]|4[137-9])"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"], [, "(\\d)(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["92"], "0$1"], [, "(\\d)(\\d{5})(\\d{4})", "$1 $2 $3", ["9"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MN: [, [, , "[12]\\d{7,9}|[5-9]\\d{7}", , , , , , , [8, 9, 10], [4, 5, 6]], [, , "[12]2[1-3]\\d{5,6}|(?:(?:[12](?:1|27)|5[368])\\d\\d|7(?:0(?:[0-5]\\d|7[078]|80)|128))\\d{4}|[12](?:3[2-8]|4[2-68]|5[1-4689])\\d{6,7}", , , , "53123456", , , , [4, 5, 6]], [, , "(?:83[01]|92[039])\\d{5}|(?:5[05]|6[069]|8[015689]|9[013-9])\\d{6}", , , , "88123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "712[0-79]\\d{4}|7(?:1[013-9]|[25-9]\\d)\\d{5}", , , , "75123456", , , [8]], "MN", 976, "001", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["[12]1"], "0$1"], [, "(\\d{4})(\\d{4})", "$1 $2", ["[5-9]"]], [, "(\\d{3})(\\d{5,6})", "$1 $2", ["[12]2[1-3]"], "0$1"], [, "(\\d{4})(\\d{5,6})", "$1 $2", ["[12](?:27|3[2-8]|4[2-68]|5[1-4689])", "[12](?:27|3[2-8]|4[2-68]|5[1-4689])[0-3]"], "0$1"], [, "(\\d{5})(\\d{4,5})", "$1 $2", ["[12]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MO: [, [, , "0800\\d{3}|(?:28|[68]\\d)\\d{6}", , , , , , , [7, 8]], [, , "(?:28[2-9]|8(?:11|[2-57-9]\\d))\\d{5}", , , , "28212345", , , [8]], [, , "6800[0-79]\\d{3}|6(?:[235]\\d\\d|6(?:0[0-5]|[1-9]\\d)|8(?:0[1-9]|[14-8]\\d|2[5-9]|[39][0-4]))\\d{4}", , , , "66123456", , , [8]], [, , "0800\\d{3}", , , , "0800501", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MO", 853, "00", , , , , , , , [[, "(\\d{4})(\\d{3})", "$1 $2", ["0"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[268]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MP: [, [, , "[58]\\d{9}|(?:67|90)0\\d{7}", , , , , , , [10], [7]], [, , "670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}", , , , "6702345678", , , , [7]], [, , "670(?:2(?:3[3-7]|56|8[4-8])|32[1-38]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}", , , , "6702345678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "MP", 1, "011", "1", , , "([2-9]\\d{6})$|1", "670$1", , 1, , , [, , , , , , , , , [-1]], , "670", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MQ: [, [, , "596\\d{6}|(?:69|80|9\\d)\\d{7}", , , , , , , [9]], [, , "596(?:[03-7]\\d|10|2[7-9]|8[0-39]|9[04-9])\\d{4}", , , , "596301234"], [, , "69(?:6(?:[0-46-9]\\d|5[0-6])|727)\\d{4}", , , , "696201234"], [, , "80[0-5]\\d{6}", , , , "800012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:397[0-2]|477[0-5]|76(?:6\\d|7[0-367]))\\d{4}", , , , "976612345"], "MQ", 596, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[569]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MR: [, [, , "(?:[2-4]\\d\\d|800)\\d{5}", , , , , , , [8]], [, , "(?:25[08]|35\\d|45[1-7])\\d{5}", , , , "35123456"], [, , "[2-4][0-46-9]\\d{6}", , , , "22123456"], [, , "800\\d{5}", , , , "80012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MR", 222, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-48]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MS: [, [, , "(?:[58]\\d\\d|664|900)\\d{7}", , , , , , , [10], [7]], [, , "6644(?:1[0-3]|91)\\d{4}", , , , "6644912345", , , , [7]], [, , "664(?:3(?:49|9[1-6])|49[2-6])\\d{4}", , , , "6644923456", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "MS", 1, "011", "1", , , "([34]\\d{6})$|1", "664$1", , , , , [, , , , , , , , , [-1]], , "664", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MT: [, [, , "3550\\d{4}|(?:[2579]\\d\\d|800)\\d{5}", , , , , , , [8]], [, , "20(?:3[1-4]|6[059])\\d{4}|2(?:0[19]|[1-357]\\d|60)\\d{5}", , , , "21001234"], [, , "(?:7(?:210|[79]\\d\\d)|9(?:[29]\\d\\d|69[67]|8(?:1[1-3]|89|97)))\\d{4}", , , , "96961234"], [, , "800(?:02|[3467]\\d)\\d{3}", , , , "80071234"], [, , "5(?:0(?:0(?:37|43)|(?:6\\d|70|9[0168])\\d)|[12]\\d0[1-5])\\d{3}", , , , "50037123"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3550\\d{4}", , , , "35501234"], "MT", 356, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[2357-9]"]]], , [, , "7117\\d{4}", , , , "71171234"], , , [, , , , , , , , , [-1]], [, , "501\\d{5}", , , , "50112345"], , , [, , , , , , , , , [-1]]], MU: [, [, , "(?:[57]|8\\d\\d)\\d{7}|[2-468]\\d{6}", , , , , , , [7, 8, 10]], [, , "(?:2(?:[0346-8]\\d|1[0-7])|4(?:[013568]\\d|2[4-8])|54(?:[3-5]\\d|71)|6\\d\\d|8(?:14|3[129]))\\d{4}", , , , "54480123", , , [7, 8]], [, , "5(?:4(?:2[1-389]|7[1-9])|87[15-8])\\d{4}|(?:5(?:2[5-9]|4[3-689]|[57]\\d|8[0-689]|9[0-8])|7(?:0[0-2]|3[013]))\\d{5}", , , , "52512345", , , [8]], [, , "802\\d{7}|80[0-2]\\d{4}", , , , "8001234", , , [7, 10]], [, , "30\\d{5}", , , , "3012345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "3(?:20|9\\d)\\d{4}", , , , "3201234", , , [7]], "MU", 230, "0(?:0|[24-7]0|3[03])", , , , , , "020", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-46]|8[013]"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[57]"]], [, "(\\d{5})(\\d{5})", "$1 $2", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MV: [, [, , "(?:800|9[0-57-9]\\d)\\d{7}|[34679]\\d{6}", , , , , , , [7, 10]], [, , "(?:3(?:0[0-3]|3[0-59])|6(?:[58][024689]|6[024-68]|7[02468]))\\d{4}", , , , "6701234", , , [7]], [, , "(?:46[46]|[79]\\d\\d)\\d{4}", , , , "7712345", , , [7]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MV", 960, "0(?:0|19)", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[34679]"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "4(?:0[01]|50)\\d{4}", , , , "4001234", , , [7]], , , [, , , , , , , , , [-1]]], MW: [, [, , "(?:[1289]\\d|31|77)\\d{7}|1\\d{6}", , , , , , , [7, 9]], [, , "(?:1[2-9]|2[12]\\d\\d)\\d{5}", , , , "1234567"], [, , "111\\d{6}|(?:31|77|[89][89])\\d{7}", , , , "991234567", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MW", 265, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["1[2-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[137-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MX: [, [, , "1(?:(?:[27]2|44|87|99)[1-9]|65[0-689])\\d{7}|(?:1(?:[01]\\d|2[13-9]|[35][1-9]|4[0-35-9]|6[0-46-9]|7[013-9]|8[1-69]|9[1-8])|[2-9]\\d)\\d{8}", , , , , , , [10, 11], [7, 8]], [, , "657[12]\\d{6}|(?:2(?:0[01]|2\\d|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[25-7][1-9]|3[1-8]|4\\d|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2\\d|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[0-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|6[1-9]|7[12]|8[1-8]|9\\d))\\d{7}", , , , "2001234567", , , [10], [7, 8]], [, , "657[12]\\d{6}|(?:1(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-7][1-9]|3[1-8]|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[1-467][1-9]|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))|2(?:2\\d|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|3\\d|7[1-8]|9[1-5])|4(?:1[1-57-9]|[25-7][1-9]|3[1-8]|4\\d|8[1-35-9]|9[2-689])|5(?:[56]\\d|88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[1-57-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2\\d|5[13-9]|8[1-69]|9[17])|8(?:1\\d|2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[0-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|6[1-9]|7[12]|8[1-8]|9\\d))\\d{7}", , , , "12221234567", , , , [7, 8]], [, , "8(?:00|88)\\d{7}", , , , "8001234567", , , [10]], [, , "900\\d{7}", , , , "9001234567", , , [10]], [, , "300\\d{7}", , , , "3001234567", , , [10]], [, , "500\\d{7}", , , , "5001234567", , , [10]], [, , , , , , , , , [-1]], "MX", 52, "0[09]", "01", , , "0(?:[12]|4[45])|1", , "00", , [[, "(\\d{5})", "$1", ["53"]], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"], , , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], , , 1], [, "(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 $3 $4", ["1(?:33|5[56]|81)"], , , 1], [, "(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 $3 $4", ["1"], , , 1]], [[, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["33|5[56]|81"], , , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[2-9]"], , , 1], [, "(\\d)(\\d{2})(\\d{4})(\\d{4})", "$2 $3 $4", ["1(?:33|5[56]|81)"], , , 1], [, "(\\d)(\\d{3})(\\d{3})(\\d{4})", "$2 $3 $4", ["1"], , , 1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MY: [, [, , "1\\d{8,9}|(?:3\\d|[4-9])\\d{7}", , , , , , , [8, 9, 10], [6, 7]], [, , "(?:3(?:2[0-36-9]|3[0-368]|4[0-278]|5[0-24-8]|6[0-467]|7[1246-9]|8\\d|9[0-57])\\d|4(?:2[0-689]|[3-79]\\d|8[1-35689])|5(?:2[0-589]|[3468]\\d|5[0-489]|7[1-9]|9[23])|6(?:2[2-9]|3[1357-9]|[46]\\d|5[0-6]|7[0-35-9]|85|9[015-8])|7(?:[2579]\\d|3[03-68]|4[0-8]|6[5-9]|8[0-35-9])|8(?:[24][2-8]|3[2-5]|5[2-7]|6[2-589]|7[2-578]|[89][2-9])|9(?:0[57]|13|[25-7]\\d|[3489][0-8]))\\d{5}", , , , "323856789", , , [8, 9], [6, 7]], [, , "1(?:1888[689]|4400|8(?:47|8[27])[0-4])\\d{4}|1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])|1(?:[1-5]\\d\\d|6(?:0[5-9]|[1-9]\\d)|7(?:[0-4]\\d|5[0-7]))|(?:[269]\\d|[37][1-9]|4[235-9])\\d|5(?:31|9\\d\\d)|8(?:1[23]|[236]\\d|4[06]|5(?:46|[7-9])|7[016-9]|8[01]|9[0-8]))\\d{5}", , , , "123456789", , , [9, 10]], [, , "1[378]00\\d{6}", , , , "1300123456", , , [10]], [, , "1600\\d{6}", , , , "1600123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "15(?:4(?:6[0-4]\\d|8(?:0[125]|[17]\\d|21|3[01]|4[01589]|5[014]|6[02]))|6(?:32[0-6]|78\\d))\\d{4}", , , , "1546012345", , , [10]], "MY", 60, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1-$2 $3", ["[4-79]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1-$2 $3", ["1(?:[02469]|[378][1-9]|53)|8", "1(?:[02469]|[37][1-9]|53|8(?:[1-46-9]|5[7-9]))|8"], "0$1"], [, "(\\d)(\\d{4})(\\d{4})", "$1-$2 $3", ["3"], "0$1"], [, "(\\d)(\\d{3})(\\d{2})(\\d{4})", "$1-$2-$3-$4", ["1(?:[367]|80)"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2 $3", ["15"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4})", "$1-$2 $3", ["1"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], MZ: [, [, , "(?:2|8\\d)\\d{7}", , , , , , , [8, 9]], [, , "2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}", , , , "21123456", , , [8]], [, , "8[2-79]\\d{7}", , , , "821234567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "MZ", 258, "00", , , , , , , , [[, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2|8[2-79]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NA: [, [, , "[68]\\d{7,8}", , , , , , , [8, 9]], [, , "64426\\d{3}|6(?:1(?:2[2-7]|3[01378]|4[0-4])|254|32[0237]|4(?:27|41|5[25])|52[236-8]|626|7(?:2[2-4]|30))\\d{4,5}|6(?:1(?:(?:0\\d|2[0189]|3[24-69]|4[5-9])\\d|17|69|7[014])|2(?:17|5[0-36-8]|69|70)|3(?:17|2[14-689]|34|6[289]|7[01]|81)|4(?:17|2[0-2]|4[06]|5[0137]|69|7[01])|5(?:17|2[0459]|69|7[01])|6(?:17|25|38|42|69|7[01])|7(?:17|2[569]|3[13]|6[89]|7[01]))\\d{4}", , , , "61221234"], [, , "(?:60|8[1245])\\d{7}", , , , "811234567", , , [9]], [, , "80\\d{7}", , , , "800123456", , , [9]], [, , "8701\\d{5}", , , , "870123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "8(?:3\\d\\d|86)\\d{5}", , , , "88612345"], "NA", 264, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["88"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["6"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["87"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NC: [, [, , "(?:050|[2-57-9]\\d\\d)\\d{3}", , , , , , , [6]], [, , "(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}", , , , "201234"], [, , "(?:5[0-4]|[79]\\d|8[0-79])\\d{4}", , , , "751234"], [, , "050\\d{3}", , , , "050012"], [, , "36\\d{4}", , , , "366711"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NC", 687, "00", , , , , , , , [[, "(\\d{3})", "$1", ["5[6-8]"]], [, "(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]], [[, "(\\d{2})(\\d{2})(\\d{2})", "$1.$2.$3", ["[02-57-9]"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NE: [, [, , "[027-9]\\d{7}", , , , , , , [8]], [, , "2(?:0(?:20|3[1-8]|4[13-5]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}", , , , "20201234"], [, , "(?:23|7[047]|[89]\\d)\\d{6}", , , , "93123456"], [, , "08\\d{6}", , , , "08123456"], [, , "09\\d{6}", , , , "09123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NE", 227, "00", , , , , , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["08"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[089]|2[013]|7[047]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NF: [, [, , "[13]\\d{5}", , , , , , , [6], [5]], [, , "(?:1(?:06|17|28|39)|3[0-2]\\d)\\d{3}", , , , "106609", , , , [5]], [, , "(?:14|3[58])\\d{4}", , , , "381234", , , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NF", 672, "00", , , , "([0-258]\\d{4})$", "3$1", , , [[, "(\\d{2})(\\d{4})", "$1 $2", ["1[0-3]"]], [, "(\\d)(\\d{5})", "$1 $2", ["[13]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NG: [, [, , "(?:[124-7]|9\\d{3})\\d{6}|[1-9]\\d{7}|[78]\\d{9,13}", , , , , , , [7, 8, 10, 11, 12, 13, 14], [5, 6]], [, , "(?:(?:[1-356]\\d|4[02-8]|8[2-9])\\d|9(?:0[3-9]|[1-9]\\d))\\d{5}|7(?:0(?:[013-689]\\d|2[0-24-9])\\d{3,4}|[1-79]\\d{6})|(?:[12]\\d|4[147]|5[14579]|6[1578]|7[1-3578])\\d{5}", , , , "18040123", , , [7, 8], [5, 6]], [, , "(?:702[0-24-9]|819[01])\\d{6}|(?:70[13-689]|8(?:0[1-9]|1[0-8])|9(?:0[1-9]|1[1-356]))\\d{7}", , , , "8021234567", , , [10]], [, , "800\\d{7,11}", , , , "80017591759", , , [10, 11, 12, 13, 14]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NG", 234, "009", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["78"], "0$1"], [, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[12]|9(?:0[3-9]|[1-9])"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["[3-7]|8[2-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[7-9]"], "0$1"], [, "(\\d{3})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["[78]"], "0$1"], [, "(\\d{3})(\\d{5})(\\d{5,6})", "$1 $2 $3", ["[78]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "700\\d{7,11}", , , , "7001234567", , , [10, 11, 12, 13, 14]], , , [, , , , , , , , , [-1]]], NI: [, [, , "(?:1800|[25-8]\\d{3})\\d{4}", , , , , , , [8]], [, , "2\\d{7}", , , , "21234567"], [, , "(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|(?:7[5-8]|8\\d)\\d)\\d{5}", , , , "81234567"], [, , "1800\\d{4}", , , , "18001234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NI", 505, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[125-8]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NL: [, [, , "(?:[124-7]\\d\\d|3(?:[02-9]\\d|1[0-8]))\\d{6}|8\\d{6,9}|9\\d{6,10}|1\\d{4,5}", , , , , , , [5, 6, 7, 8, 9, 10, 11]], [, , "(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d\\d)\\d{6}", , , , "101234567", , , [9]], [, , "(?:6[1-58]|970\\d)\\d{7}", , , , "612345678", , , [9, 11]], [, , "800\\d{4,7}", , , , "8001234", , , [7, 8, 9, 10]], [, , "90[069]\\d{4,7}", , , , "9061234", , , [7, 8, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:85|91)\\d{7}", , , , "851234567", , , [9]], "NL", 31, "00", "0", , , "0", , , , [[, "(\\d{4})", "$1", ["1[238]|[34]"]], [, "(\\d{2})(\\d{3,4})", "$1 $2", ["14"]], [, "(\\d{6})", "$1", ["1"]], [, "(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], [, "(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]], [[, "(\\d{3})(\\d{4,7})", "$1 $2", ["[89]0"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["66"], "0$1"], [, "(\\d)(\\d{8})", "$1 $2", ["6"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-578]|91"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3", ["9"], "0$1"]], [, , "66\\d{7}", , , , "662345678", , , [9]], , , [, , "140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)\\d", , , , , , , [5, 6]], [, , "140(?:1[035]|2[0346]|3[03568]|4[0356]|5[0358]|8[458])|(?:140(?:1[16-8]|2[259]|3[124]|4[17-9]|5[124679]|7)|8[478]\\d{6})\\d", , , , "14020", , , [5, 6, 9]], , , [, , , , , , , , , [-1]]], NO: [, [, , "(?:0|[2-9]\\d{3})\\d{4}", , , , , , , [5, 8]], [, , "(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}", , , , "21234567", , , [8]], [, , "(?:4[015-8]|9\\d)\\d{6}", , , , "40612345", , , [8]], [, , "80[01]\\d{5}", , , , "80012345", , , [8]], [, , "82[09]\\d{5}", , , , "82012345", , , [8]], [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", , , , "81021234", , , [8]], [, , "880\\d{5}", , , , "88012345", , , [8]], [, , "85[0-5]\\d{5}", , , , "85012345", , , [8]], "NO", 47, "00", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{3})", "$1 $2 $3", ["8"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2-79]"]]], , [, , , , , , , , , [-1]], 1, "[02-689]|7[0-8]", [, , , , , , , , , [-1]], [, , "(?:0[2-9]|81(?:0(?:0[7-9]|1\\d)|5\\d\\d))\\d{3}", , , , "02000"], , , [, , "81[23]\\d{5}", , , , "81212345", , , [8]]], NP: [, [, , "(?:1\\d|9)\\d{9}|[1-9]\\d{7}", , , , , , , [8, 10, 11], [6, 7]], [, , "(?:1[0-6]\\d|99[02-6])\\d{5}|(?:2[13-79]|3[135-8]|4[146-9]|5[135-7]|6[13-9]|7[15-9]|8[1-46-9]|9[1-7])[2-6]\\d{5}", , , , "14567890", , , [8], [6, 7]], [, , "9(?:6[0-3]|7[024-6]|8[0-24-68])\\d{7}", , , , "9841234567", , , [10]], [, , "1(?:66001|800\\d\\d)\\d{5}", , , , "16600101234", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NP", 977, "00", "0", , , "0", , , , [[, "(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], [, "(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"], "0$1"], [, "(\\d{3})(\\d{7})", "$1-$2", ["9"]], [, "(\\d{4})(\\d{2})(\\d{5})", "$1-$2-$3", ["1"]]], [[, "(\\d)(\\d{7})", "$1-$2", ["1[2-6]"], "0$1"], [, "(\\d{2})(\\d{6})", "$1-$2", ["1[01]|[2-8]|9(?:[1-59]|[67][2-6])"], "0$1"], [, "(\\d{3})(\\d{7})", "$1-$2", ["9"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NR: [, [, , "(?:444|(?:55|8\\d)\\d|666)\\d{4}", , , , , , , [7]], [, , "444\\d{4}", , , , "4441234"], [, , "(?:55[3-9]|666|8\\d\\d)\\d{4}", , , , "5551234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NR", 674, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[4-68]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NU: [, [, , "(?:[47]|888\\d)\\d{3}", , , , , , , [4, 7]], [, , "[47]\\d{3}", , , , "7012", , , [4]], [, , "888[4-9]\\d{3}", , , , "8884012", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "NU", 683, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], NZ: [, [, , "[1289]\\d{9}|50\\d{5}(?:\\d{2,3})?|[27-9]\\d{7,8}|(?:[34]\\d|6[0-35-9])\\d{6}|8\\d{4,6}", , , , , , , [5, 6, 7, 8, 9, 10]], [, , "24099\\d{3}|(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}", , , , "32345678", , , [8], [7]], [, , "2(?:[0-27-9]\\d|6)\\d{6,7}|2(?:1\\d|75)\\d{5}", , , , "211234567", , , [8, 9, 10]], [, , "508\\d{6,7}|80\\d{6,8}", , , , "800123456", , , [8, 9, 10]], [, , "(?:1[13-57-9]\\d{5}|50(?:0[08]|30|66|77|88))\\d{3}|90\\d{6,8}", , , , "900123456", , , [7, 8, 9, 10]], [, , , , , , , , , [-1]], [, , "70\\d{7}", , , , "701234567", , , [9]], [, , , , , , , , , [-1]], "NZ", 64, "0(?:0|161)", "0", , , "0", , "00", , [[, "(\\d{2})(\\d{3,8})", "$1 $2", ["8[1-79]"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["50[036-8]|8|90", "50(?:[0367]|88)|8|90"], "0$1"], [, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["24|[346]|7[2-57-9]|9[2-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:10|74)|[589]"], "0$1"], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["1|2[028]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,5})", "$1 $2 $3", ["2(?:[169]|7[0-35-9])|7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "8(?:1[16-9]|22|3\\d|4[045]|5[459]|6[235-9]|7[0-3579]|90)\\d{2,7}", , , , "83012378"], , , [, , , , , , , , , [-1]]], OM: [, [, , "(?:1505|[279]\\d{3}|500)\\d{4}|800\\d{5,6}", , , , , , , [7, 8, 9]], [, , "2[1-6]\\d{6}", , , , "23123456", , , [8]], [, , "1505\\d{4}|(?:7(?:[1289]\\d|6[89]|7[0-5])|9(?:0[1-9]|[1-9]\\d))\\d{5}", , , , "92123456", , , [8]], [, , "8007\\d{4,5}|(?:500|800[05])\\d{4}", , , , "80071234"], [, , "900\\d{5}", , , , "90012345", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "OM", 968, "00", , , , , , , , [[, "(\\d{3})(\\d{4,6})", "$1 $2", ["[58]"]], [, "(\\d{2})(\\d{6})", "$1 $2", ["2"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[179]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PA: [, [, , "(?:00800|8\\d{3})\\d{6}|[68]\\d{7}|[1-57-9]\\d{6}", , , , , , , [7, 8, 10, 11]], [, , "(?:1(?:0\\d|1[479]|2[37]|3[0137]|4[17]|5[05]|6[58]|7[0167]|8[2358]|9[1389])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[02-9])|3(?:[089]\\d|1[0-7]|2[0-5]|33|4[0-79]|5[0-35]|6[068]|7[0-8])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[056]|7[0-24-9]|8[5-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}", , , , "2001234", , , [7]], [, , "(?:1[16]1|21[89]|6\\d{3}|8(?:1[01]|7[23]))\\d{4}", , , , "61234567", , , [7, 8]], [, , "800\\d{4,5}|(?:00800|800\\d)\\d{6}", , , , "8001234"], [, , "(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}", , , , "8601234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PA", 507, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1-$2", ["[1-57-9]"]], [, "(\\d{4})(\\d{4})", "$1-$2", ["[68]"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PE: [, [, , "(?:[14-8]|9\\d)\\d{7}", , , , , , , [8, 9], [6, 7]], [, , "(?:(?:4[34]|5[14])[0-8]\\d|7(?:173|3[0-8]\\d)|8(?:10[05689]|6(?:0[06-9]|1[6-9]|29)|7(?:0[569]|[56]0)))\\d{4}|(?:1[0-8]|4[12]|5[236]|6[1-7]|7[246]|8[2-4])\\d{6}", , , , "11234567", , , [8], [6, 7]], [, , "9\\d{8}", , , , "912345678", , , [9]], [, , "800\\d{5}", , , , "80012345", , , [8]], [, , "805\\d{5}", , , , "80512345", , , [8]], [, , "801\\d{5}", , , , "80112345", , , [8]], [, , "80[24]\\d{5}", , , , "80212345", , , [8]], [, , , , , , , , , [-1]], "PE", 51, "00|19(?:1[124]|77|90)00", "0", " Anexo ", , "0", , "00", , [[, "(\\d{3})(\\d{5})", "$1 $2", ["80"], "(0$1)"], [, "(\\d)(\\d{7})", "$1 $2", ["1"], "(0$1)"], [, "(\\d{2})(\\d{6})", "$1 $2", ["[4-8]"], "(0$1)"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PF: [, [, , "4\\d{5}(?:\\d{2})?|8\\d{7,8}", , , , , , , [6, 8, 9]], [, , "4(?:0[4-689]|9[4-68])\\d{5}", , , , "40412345", , , [8]], [, , "8[7-9]\\d{6}", , , , "87123456", , , [8]], [, , "80[0-5]\\d{6}", , , , "800012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "499\\d{5}", , , , "49901234", , , [8]], "PF", 689, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["44"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["4|8[7-9]"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]], , [, , , , , , , , , [-1]], , , [, , "44\\d{4}", , , , , , , [6]], [, , "44\\d{4}", , , , "440123", , , [6]], , , [, , , , , , , , , [-1]]], PG: [, [, , "(?:180|[78]\\d{3})\\d{4}|(?:[2-589]\\d|64)\\d{5}", , , , , , , [7, 8]], [, , "(?:(?:3[0-2]|4[257]|5[34]|9[78])\\d|64[1-9]|85[02-46-9])\\d{4}", , , , "3123456", , , [7]], [, , "(?:7\\d|8[128])\\d{6}", , , , "70123456", , , [8]], [, , "180\\d{4}", , , , "1801234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "2(?:0[0-57]|7[568])\\d{4}", , , , "2751234", , , [7]], "PG", 675, "00|140[1-3]", , , , , , "00", , [[, "(\\d{3})(\\d{4})", "$1 $2", ["18|[2-69]|85"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[78]"]]], , [, , "27[01]\\d{4}", , , , "2700123", , , [7]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PH: [, [, , "(?:[2-7]|9\\d)\\d{8}|2\\d{5}|(?:1800|8)\\d{7,9}", , , , , , , [6, 8, 9, 10, 11, 12, 13], [4, 5, 7]], [, , "(?:(?:2[3-8]|3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578])\\d{3}|88(?:22\\d\\d|42))\\d{4}|(?:2|8[2-8]\\d\\d)\\d{5}", , , , "232345678", , , [6, 8, 9, 10], [4, 5, 7]], [, , "(?:8(?:1[37]|9[5-8])|9(?:0[5-9]|1[0-24-9]|[235-7]\\d|4[2-9]|8[135-9]|9[1-9]))\\d{7}", , , , "9051234567", , , [10]], [, , "1800\\d{7,9}", , , , "180012345678", , , [11, 12, 13]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PH", 63, "00", "0", , , "0", , , , [[, "(\\d)(\\d{5})", "$1 $2", ["2"], "(0$1)"], [, "(\\d{4})(\\d{4,6})", "$1 $2", ["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|544|88[245]|(?:52|64|86)2", "3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"], "(0$1)"], [, "(\\d{5})(\\d{4})", "$1 $2", ["346|4(?:27|9[35])|883", "3469|4(?:279|9(?:30|56))|8834"], "(0$1)"], [, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["2"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|8[2-8]"], "(0$1)"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]], [, "(\\d{4})(\\d{1,2})(\\d{3})(\\d{4})", "$1 $2 $3 $4", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PK: [, [, , "122\\d{6}|[24-8]\\d{10,11}|9(?:[013-9]\\d{8,10}|2(?:[01]\\d\\d|2(?:[06-8]\\d|1[01]))\\d{7})|(?:[2-8]\\d{3}|92(?:[0-7]\\d|8[1-9]))\\d{6}|[24-9]\\d{8}|[89]\\d{7}", , , , , , , [8, 9, 10, 11, 12], [5, 6, 7]], [, , "(?:(?:21|42)[2-9]|58[126])\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6,7}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}", , , , "2123456789", , , [9, 10], [5, 6, 7, 8]], [, , "3(?:[0-24]\\d|3[0-79]|55|64)\\d{7}", , , , "3012345678", , , [10]], [, , "800\\d{5}(?:\\d{3})?", , , , "80012345", , , [8, 11]], [, , "900\\d{5}", , , , "90012345", , , [8]], [, , , , , , , , , [-1]], [, , "122\\d{6}", , , , "122044444", , , [9]], [, , , , , , , , , [-1]], "PK", 92, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{2,7})", "$1 $2 $3", ["[89]0"], "0$1"], [, "(\\d{4})(\\d{5})", "$1 $2", ["1"]], [, "(\\d{3})(\\d{6,7})", "$1 $2", ["2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8])", "9(?:2[3-8]|98)|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:22|3[27-9]|4[2-6]|6[3569]|9[25-7]))[2-9]"], "(0$1)"], [, "(\\d{2})(\\d{7,8})", "$1 $2", ["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"], "(0$1)"], [, "(\\d{5})(\\d{5})", "$1 $2", ["58"], "(0$1)"], [, "(\\d{3})(\\d{7})", "$1 $2", ["3"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91"], "(0$1)"], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[24-9]"], "(0$1)"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:0[468]|[1-8])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}", , , , "21111825888", , , [11, 12]], , , [, , , , , , , , , [-1]]], PL: [, [, , "(?:6|8\\d\\d)\\d{7}|[1-9]\\d{6}(?:\\d{2})?|[26]\\d{5}", , , , , , , [6, 7, 8, 9, 10]], [, , "47\\d{7}|(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:[02-9]\\d{6}|1(?:[0-8]\\d{5}|9\\d{3}(?:\\d{2})?))", , , , "123456789", , , [7, 9]], [, , "21(?:1(?:[145]\\d|3[1-5])|2\\d\\d)\\d{4}|(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}", , , , "512345678", , , [9]], [, , "800\\d{6,7}", , , , "800123456", , , [9, 10]], [, , "70[01346-8]\\d{6}", , , , "701234567", , , [9]], [, , "801\\d{6}", , , , "801234567", , , [9]], [, , , , , , , , , [-1]], [, , "39\\d{7}", , , , "391234567", , , [9]], "PL", 48, "00", , , , , , , , [[, "(\\d{5})", "$1", ["19"]], [, "(\\d{3})(\\d{3})", "$1 $2", ["11|20|64"]], [, "(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3", ["(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])1", "(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])19"]], [, "(\\d{3})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["64"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["21|39|45|5[0137]|6[0469]|7[02389]|8(?:0[14]|8)"]], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[2-8]|[2-7]|8[1-79]|9[145]"]], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["8"]]], , [, , "64\\d{4,7}", , , , "641234567", , , [6, 7, 8, 9]], , , [, , , , , , , , , [-1]], [, , "804\\d{6}", , , , "804123456", , , [9]], , , [, , , , , , , , , [-1]]], PM: [, [, , "[45]\\d{5}|(?:708|80\\d)\\d{6}", , , , , , , [6, 9]], [, , "(?:4[1-35-7]|5[01])\\d{4}", , , , "430123", , , [6]], [, , "(?:4[02-4]|5[056]|708[45][0-5])\\d{4}", , , , "551234"], [, , "80[0-5]\\d{6}", , , , "800012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PM", 508, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[45]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PR: [, [, , "(?:[589]\\d\\d|787)\\d{7}", , , , , , , [10], [7]], [, , "(?:787|939)[2-9]\\d{6}", , , , "7872345678", , , , [7]], [, , "(?:787|939)[2-9]\\d{6}", , , , "7872345678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "PR", 1, "011", "1", , , "1", , , 1, , , [, , , , , , , , , [-1]], , "787|939", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PS: [, [, , "[2489]2\\d{6}|(?:1\\d|5)\\d{8}", , , , , , , [8, 9, 10], [7]], [, , "(?:22[2-47-9]|42[45]|82[014-68]|92[3569])\\d{5}", , , , "22234567", , , [8], [7]], [, , "5[69]\\d{7}", , , , "599123456", , , [9]], [, , "1800\\d{6}", , , , "1800123456", , , [10]], [, , , , , , , , , [-1]], [, , "1700\\d{6}", , , , "1700123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PS", 970, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["[2489]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["5"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PT: [, [, , "1693\\d{5}|(?:[26-9]\\d|30)\\d{7}", , , , , , , [9]], [, , "2(?:[12]\\d|3[1-689]|4[1-59]|[57][1-9]|6[1-35689]|8[1-69]|9[1256])\\d{6}", , , , "212345678"], [, , "6(?:[06]92(?:30|9\\d)|[35]92(?:3[03]|9\\d))\\d{3}|(?:(?:16|6[0356])93|9(?:[1-36]\\d\\d|480))\\d{5}", , , , "912345678"], [, , "80[02]\\d{6}", , , , "800123456"], [, , "(?:6(?:0[178]|4[68])\\d|76(?:0[1-57]|1[2-47]|2[237]))\\d{5}", , , , "760123456"], [, , "80(?:8\\d|9[1579])\\d{5}", , , , "808123456"], [, , "884[0-4689]\\d{5}", , , , "884123456"], [, , "30\\d{7}", , , , "301234567"], "PT", 351, "00", , , , , , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["2[12]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["16|[236-9]"]]], , [, , "6222\\d{5}", , , , "622212345"], , , [, , , , , , , , , [-1]], [, , "70(?:38[01]|596|(?:7\\d|8[17])\\d)\\d{4}", , , , "707123456"], , , [, , "600\\d{6}|6[06]9233\\d{3}", , , , "600110000"]], PW: [, [, , "(?:[24-8]\\d\\d|345|900)\\d{4}", , , , , , , [7]], [, , "(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}", , , , "2771234"], [, , "(?:(?:46|83)[0-5]|6[2-4689]0)\\d{4}|(?:45|77|88)\\d{5}", , , , "6201234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "PW", 680, "01[12]", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], PY: [, [, , "59\\d{4,6}|9\\d{5,10}|(?:[2-46-8]\\d|5[0-8])\\d{4,7}", , , , , , , [6, 7, 8, 9, 10, 11], [5]], [, , "(?:[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36])\\d{5,7}|(?:2(?:2[4-68]|[4-68]\\d|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51|[67]\\d)|4(?:3[12]|5[13]|9[1-47])|5(?:[1-4]\\d|5[02-4])|6(?:3[1-3]|44|7[1-8])|7(?:4[0-4]|5\\d|6[1-578]|75|8[0-8])|858)\\d{5,6}", , , , "212345678", , , [7, 8, 9], [5, 6]], [, , "9(?:51|6[129]|[78][1-6]|9[1-5])\\d{6}", , , , "961456789", , , [9]], [, , "9800\\d{5,7}", , , , "98000123456", , , [9, 10, 11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "8700[0-4]\\d{4}", , , , "870012345", , , [9]], "PY", 595, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3,6})", "$1 $2", ["[2-9]0"], "0$1"], [, "(\\d{2})(\\d{5})", "$1 $2", ["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"], "(0$1)"], [, "(\\d{3})(\\d{4,5})", "$1 $2", ["2[279]|3[13-5]|4[359]|5|6(?:[34]|7[1-46-8])|7[46-8]|85"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2[14-68]|3[26-9]|4[1246-8]|6(?:1|75)|7[1-35]|8[1-36]"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["87"]], [, "(\\d{3})(\\d{6})", "$1 $2", ["9(?:[5-79]|8[1-6])"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-8]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["9"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "[2-9]0\\d{4,7}", , , , "201234567", , , [6, 7, 8, 9]], , , [, , , , , , , , , [-1]]], QA: [, [, , "800\\d{4}|(?:2|800)\\d{6}|(?:0080|[3-7])\\d{7}", , , , , , , [7, 8, 9, 11]], [, , "4(?:1111|2022)\\d{3}|4(?:[04]\\d\\d|14[0-6]|999)\\d{4}", , , , "44123456", , , [8]], [, , "[35-7]\\d{7}", , , , "33123456", , , [8]], [, , "800\\d{4}|(?:0080[01]|800)\\d{6}", , , , "8001234", , , [7, 9, 11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "QA", 974, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["2[16]|8"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[3-7]"]]], , [, , "2[16]\\d{5}", , , , "2123456", , , [7]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], RE: [, [, , "(?:26|[689]\\d)\\d{7}", , , , , , , [9]], [, , "26(?:2\\d\\d|3(?:0\\d|1[0-5]))\\d{4}", , , , "262161234"], [, , "69(?:2\\d\\d|3(?:[06][0-6]|1[013]|2[0-2]|3[0-39]|4\\d|5[0-5]|7[0-27]|8[0-8]|9[0-479]))\\d{4}", , , , "692123456"], [, , "80\\d{7}", , , , "801234567"], [, , "89[1-37-9]\\d{6}", , , , "891123456"], [, , "8(?:1[019]|2[0156]|84|90)\\d{6}", , , , "810123456"], [, , , , , , , , , [-1]], [, , "9(?:399[0-3]|479[0-5]|76(?:2[27]|3[0-37]))\\d{4}", , , , "939901234"], "RE", 262, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2689]"], "0$1"]], , [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], RO: [, [, , "(?:[2378]\\d|90)\\d{7}|[23]\\d{5}", , , , , , , [6, 9]], [, , "[23][13-6]\\d{7}|(?:2(?:19\\d|[3-6]\\d9)|31\\d\\d)\\d\\d", , , , "211234567"], [, , "7020\\d{5}|7(?:0[013-9]|1[0-3]|[2-7]\\d|8[03-8]|9[0-29])\\d{6}", , , , "712034567", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "90[0136]\\d{6}", , , , "900123456", , , [9]], [, , "801\\d{6}", , , , "801123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RO", 40, "00", "0", " int ", , "0", , , , [[, "(\\d{3})(\\d{3})", "$1 $2", ["2[3-6]", "2[3-6]\\d9"], "0$1"], [, "(\\d{2})(\\d{4})", "$1 $2", ["219|31"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[23]1"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[237-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:37\\d|80[578])\\d{6}", , , , "372123456", , , [9]], , , [, , , , , , , , , [-1]]], RS: [, [, , "38[02-9]\\d{6,9}|6\\d{7,9}|90\\d{4,8}|38\\d{5,6}|(?:7\\d\\d|800)\\d{3,9}|(?:[12]\\d|3[0-79])\\d{5,10}", , , , , , , [6, 7, 8, 9, 10, 11, 12], [4, 5]], [, , "(?:11[1-9]\\d|(?:2[389]|39)(?:0[2-9]|[2-9]\\d))\\d{3,8}|(?:1[02-9]|2[0-24-7]|3[0-8])[2-9]\\d{4,9}", , , , "10234567", , , [7, 8, 9, 10, 11, 12], [4, 5, 6]], [, , "6(?:[0-689]|7\\d)\\d{6,7}", , , , "601234567", , , [8, 9, 10]], [, , "800\\d{3,9}", , , , "80012345"], [, , "(?:78\\d|90[0169])\\d{3,7}", , , , "90012345", , , [6, 7, 8, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RS", 381, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3,9})", "$1 $2", ["(?:2[389]|39)0|[7-9]"], "0$1"], [, "(\\d{2})(\\d{5,10})", "$1 $2", ["[1-36]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "7[06]\\d{4,10}", , , , "700123456"], , , [, , , , , , , , , [-1]]], RU: [, [, , "8\\d{13}|[347-9]\\d{9}", , , , , , , [10, 14], [7]], [, , "(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}", , , , "3011234567", , , [10], [7]], [, , "9\\d{9}", , , , "9123456789", , , [10]], [, , "8(?:0[04]|108\\d{3})\\d{7}", , , , "8001234567"], [, , "80[39]\\d{7}", , , , "8091234567", , , [10]], [, , , , , , , , , [-1]], [, , "808\\d{7}", , , , "8081234567", , , [10]], [, , , , , , , , , [-1]], "RU", 7, "810", "8", , , "8", , "8~10", , [[, "(\\d{3})(\\d{2})(\\d{2})", "$1-$2-$3", ["[0-79]"]], [, "(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", , 1], [, "(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", , 1], [, "(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]], [[, "(\\d{4})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-8]|2[1-9])", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:1[23]|[2-9]2))", "7(?:1(?:[0-356]2|4[29]|7|8[27])|2(?:13[03-69]|62[013-9]))|72[1-57-9]2"], "8 ($1)", , 1], [, "(\\d{5})(\\d)(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["7(?:1[0-68]|2[1-9])", "7(?:1(?:[06][3-6]|[18]|2[35]|[3-5][3-5])|2(?:[13][3-5]|[24-689]|7[457]))", "7(?:1(?:0(?:[356]|4[023])|[18]|2(?:3[013-9]|5)|3[45]|43[013-79]|5(?:3[1-8]|4[1-7]|5)|6(?:3[0-35-9]|[4-6]))|2(?:1(?:3[178]|[45])|[24-689]|3[35]|7[457]))|7(?:14|23)4[0-8]|71(?:33|45)[1-79]"], "8 ($1)", , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "8 ($1)", , 1], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[349]|8(?:[02-7]|1[1-8])"], "8 ($1)", , 1], [, "(\\d{4})(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["8"], "8 ($1)"]], [, , , , , , , , , [-1]], 1, "3[04-689]|[489]", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], RW: [, [, , "(?:06|[27]\\d\\d|[89]00)\\d{6}", , , , , , , [8, 9]], [, , "(?:06|2[23568]\\d)\\d{6}", , , , "250123456"], [, , "7[237-9]\\d{7}", , , , "720123456", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "900\\d{6}", , , , "900123456", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "RW", 250, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["0"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["2"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[7-9]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SA: [, [, , "92\\d{7}|(?:[15]|8\\d)\\d{8}", , , , , , , [9, 10], [7]], [, , "1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}", , , , "112345678", , , [9], [7]], [, , "579[01]\\d{5}|5(?:[013-689]\\d|7[0-35-8])\\d{6}", , , , "512345678", , , [9]], [, , "800\\d{7}", , , , "8001234567", , , [10]], [, , "925\\d{6}", , , , "925012345", , , [9]], [, , "920\\d{6}", , , , "920012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SA", 966, "00", "0", , , "0", , , , [[, "(\\d{4})(\\d{5})", "$1 $2", ["9"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["5"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["81"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "811\\d{7}", , , , "8110123456", , , [10]], , , [, , , , , , , , , [-1]]], SB: [, [, , "(?:[1-6]|[7-9]\\d\\d)\\d{4}", , , , , , , [5, 7]], [, , "(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}", , , , "40123", , , [5]], [, , "48\\d{3}|(?:(?:7[1-9]|8[4-9])\\d|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8]))\\d{4}", , , , "7421234"], [, , "1[38]\\d{3}", , , , "18123", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5[12]\\d{3}", , , , "51123", , , [5]], "SB", 677, "0[01]", , , , , , , , [[, "(\\d{2})(\\d{5})", "$1 $2", ["7|8[4-9]|9(?:[1-8]|9[0-8])"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SC: [, [, , "800\\d{4}|(?:[249]\\d|64)\\d{5}", , , , , , , [7]], [, , "4[2-46]\\d{5}", , , , "4217123"], [, , "2[125-8]\\d{5}", , , , "2510123"], [, , "800[08]\\d{3}", , , , "8000000"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "971\\d{4}|(?:64|95)\\d{5}", , , , "6412345"], "SC", 248, "010|0[0-2]", , , , , , "00", , [[, "(\\d)(\\d{3})(\\d{3})", "$1 $2 $3", ["[246]|9[57]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SD: [, [, , "[19]\\d{8}", , , , , , , [9]], [, , "1(?:5\\d|8[35-7])\\d{6}", , , , "153123456"], [, , "(?:1[0-2]|9[0-3569])\\d{7}", , , , "911231234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SD", 249, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[19]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SE: [, [, , "(?:[26]\\d\\d|9)\\d{9}|[1-9]\\d{8}|[1-689]\\d{7}|[1-4689]\\d{6}|2\\d{5}", , , , , , , [6, 7, 8, 9, 10, 12]], [, , "(?:(?:[12][136]|3[356]|4[0246]|6[03]|8\\d)\\d|90[1-9])\\d{4,6}|(?:1(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)|2(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])|3(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])|4(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])|6(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])|9(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8]))\\d{5,6}", , , , "8123456", , , [7, 8, 9]], [, , "7[02369]\\d{7}", , , , "701234567", , , [9]], [, , "20\\d{4,7}", , , , "20123456", , , [6, 7, 8, 9]], [, , "649\\d{6}|99[1-59]\\d{4}(?:\\d{3})?|9(?:00|39|44)[1-8]\\d{3,6}", , , , "9001234567", , , [7, 8, 9, 10]], [, , "77[0-7]\\d{6}", , , , "771234567", , , [9]], [, , "75[1-8]\\d{6}", , , , "751234567", , , [9]], [, , , , , , , , , [-1]], "SE", 46, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["20"], "0$1"], [, "(\\d{3})(\\d{4})", "$1-$2", ["9(?:00|39|44|9)"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})", "$1-$2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"], "0$1"], [, "(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1"], [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1-$2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1"], [, "(\\d{3})(\\d{2,3})(\\d{3})", "$1-$2 $3", ["9(?:00|39|44)"], "0$1"], [, "(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["10|7"], "0$1"], [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1-$2 $3 $4", ["8"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1-$2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1-$2 $3 $4", ["9"], "0$1"], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1-$2 $3 $4 $5", ["[26]"], "0$1"]], [[, "(\\d{2})(\\d{2,3})(\\d{2})", "$1 $2 $3", ["20"]], [, "(\\d{3})(\\d{4})", "$1 $2", ["9(?:00|39|44|9)"]], [, "(\\d{2})(\\d{3})(\\d{2})", "$1 $2 $3", ["[12][136]|3[356]|4[0246]|6[03]|90[1-9]"]], [, "(\\d)(\\d{2,3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], [, "(\\d{3})(\\d{2,3})(\\d{2})", "$1 $2 $3", ["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[125689]|4[02-57]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"]], [, "(\\d{3})(\\d{2,3})(\\d{3})", "$1 $2 $3", ["9(?:00|39|44)"]], [, "(\\d{2})(\\d{2,3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["1[13689]|2[0136]|3[1356]|4[0246]|54|6[03]|90[1-9]"]], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["10|7"]], [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1 $2 $3 $4", ["8"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[13-5]|2(?:[247-9]|5[0138])|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[02-5]|4[0-3])"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{3})", "$1 $2 $3 $4", ["9"]], [, "(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4 $5", ["[26]"]]], [, , "74[02-9]\\d{6}", , , , "740123456", , , [9]], , , [, , , , , , , , , [-1]], [, , "10[1-8]\\d{6}", , , , "102345678", , , [9]], , , [, , "(?:25[245]|67[3-68])\\d{9}", , , , "254123456789", , , [12]]], SG: [, [, , "(?:(?:1\\d|8)\\d\\d|7000)\\d{7}|[3689]\\d{7}", , , , , , , [8, 10, 11]], [, , "662[0-24-9]\\d{4}|6(?:[0-578]\\d|6[013-57-9]|9[0-35-9])\\d{5}", , , , "61234567", , , [8]], [, , "8(?:08[01]|95[0-2])\\d{4}|(?:8(?:0[1-7]|[1-8]\\d|9[0-4])|9[0-8]\\d)\\d{5}", , , , "81234567", , , [8]], [, , "(?:18|8)00\\d{7}", , , , "18001234567", , , [10, 11]], [, , "1900\\d{7}", , , , "19001234567", , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:3[12]\\d|666)\\d{5}", , , , "31234567", , , [8]], "SG", 65, "0[0-3]\\d", , , , , , , , [[, "(\\d{4,5})", "$1", ["1[013-9]|77", "1(?:[013-8]|9(?:0[1-9]|[1-9]))|77"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-8]|[1-9])"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], [, "(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], [[, "(\\d{4})(\\d{4})", "$1 $2", ["[369]|8(?:0[1-8]|[1-9])"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"]], [, "(\\d{4})(\\d{4})(\\d{3})", "$1 $2 $3", ["7"]], [, "(\\d{4})(\\d{3})(\\d{4})", "$1 $2 $3", ["1"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "7000\\d{7}", , , , "70001234567", , , [11]], , , [, , , , , , , , , [-1]]], SH: [, [, , "(?:[256]\\d|8)\\d{3}", , , , , , , [4, 5]], [, , "2(?:[0-57-9]\\d|6[4-9])\\d\\d", , , , "22158"], [, , "[56]\\d{4}", , , , "51234", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "262\\d\\d", , , , "26212", , , [5]], "SH", 290, "00", , , , , , , , , , [, , , , , , , , , [-1]], 1, "[256]", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SI: [, [, , "[1-7]\\d{7}|8\\d{4,7}|90\\d{4,6}", , , , , , , [5, 6, 7, 8]], [, , "(?:[1-357][2-8]|4[24-8])\\d{6}", , , , "12345678", , , [8], [7]], [, , "65(?:[178]\\d|5[56]|6[01])\\d{4}|(?:[37][01]|4[0139]|51|6[489])\\d{6}", , , , "31234567", , , [8]], [, , "80\\d{4,6}", , , , "80123456", , , [6, 7, 8]], [, , "89[1-3]\\d{2,5}|90\\d{4,6}", , , , "90123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:59\\d\\d|8(?:1(?:[67]\\d|8[0-589])|2(?:0\\d|2[0-37-9]|8[0-2489])|3[389]\\d))\\d{4}", , , , "59012345", , , [8]], "SI", 386, "00|10(?:22|66|88|99)", "0", , , "0", , "00", , [[, "(\\d{2})(\\d{3,6})", "$1 $2", ["8[09]|9"], "0$1"], [, "(\\d{3})(\\d{5})", "$1 $2", ["59|8"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[37][01]|4[0139]|51|6"], "0$1"], [, "(\\d)(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[1-57]"], "(0$1)"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SJ: [, [, , "0\\d{4}|(?:[489]\\d|79)\\d{6}", , , , , , , [5, 8]], [, , "79\\d{6}", , , , "79123456", , , [8]], [, , "(?:4[015-8]|9\\d)\\d{6}", , , , "41234567", , , [8]], [, , "80[01]\\d{5}", , , , "80012345", , , [8]], [, , "82[09]\\d{5}", , , , "82012345", , , [8]], [, , "810(?:0[0-6]|[2-8]\\d)\\d{3}", , , , "81021234", , , [8]], [, , "880\\d{5}", , , , "88012345", , , [8]], [, , "85[0-5]\\d{5}", , , , "85012345", , , [8]], "SJ", 47, "00", , , , , , , , , , [, , , , , , , , , [-1]], , "79", [, , , , , , , , , [-1]], [, , "(?:0[2-9]|81(?:0(?:0[7-9]|1\\d)|5\\d\\d))\\d{3}", , , , "02000"], , , [, , "81[23]\\d{5}", , , , "81212345", , , [8]]], SK: [, [, , "[2-689]\\d{8}|[2-59]\\d{6}|[2-5]\\d{5}", , , , , , , [6, 7, 9]], [, , "(?:2(?:16|[2-9]\\d{3})|(?:(?:[3-5][1-8]\\d|819)\\d|601[1-5])\\d)\\d{4}|(?:2|[3-5][1-8])1[67]\\d{3}|[3-5][1-8]16\\d\\d", , , , "221234567"], [, , "909[1-9]\\d{5}|9(?:0[1-8]|1[0-24-9]|4[03-57-9]|5\\d)\\d{6}", , , , "912123456", , , [9]], [, , "800\\d{6}", , , , "800123456", , , [9]], [, , "9(?:00|[78]\\d)\\d{6}", , , , "900123456", , , [9]], [, , "8[5-9]\\d{7}", , , , "850123456", , , [9]], [, , , , , , , , , [-1]], [, , "6(?:02|5[0-4]|9[0-6])\\d{6}", , , , "690123456", , , [9]], "SK", 421, "00", "0", , , "0", , , , [[, "(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], [, "(\\d{4})(\\d{3})", "$1 $2", ["909", "9090"], "0$1"], [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]], [[, "(\\d)(\\d{2})(\\d{3,4})", "$1 $2 $3", ["21"], "0$1"], [, "(\\d{2})(\\d{2})(\\d{2,3})", "$1 $2 $3", ["[3-5][1-8]1", "[3-5][1-8]1[67]"], "0$1"], [, "(\\d)(\\d{3})(\\d{3})(\\d{2})", "$1/$2 $3 $4", ["2"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[689]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1/$2 $3 $4", ["[3-5]"], "0$1"]], [, , "9090\\d{3}", , , , "9090123", , , [7]], , , [, , "9090\\d{3}|(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}", , , , , , , [7, 9]], [, , "96\\d{7}", , , , "961234567", , , [9]], , , [, , , , , , , , , [-1]]], SL: [, [, , "(?:[237-9]\\d|66)\\d{6}", , , , , , , [8], [6]], [, , "22[2-4][2-9]\\d{4}", , , , "22221234", , , , [6]], [, , "(?:25|3[0-5]|66|7[2-9]|8[08]|9[09])\\d{6}", , , , "25123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SL", 232, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{6})", "$1 $2", ["[236-9]"], "(0$1)"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SM: [, [, , "(?:0549|[5-7]\\d)\\d{6}", , , , , , , [8, 10], [6]], [, , "0549(?:8[0157-9]|9\\d)\\d{4}", , , , "0549886377", , , [10], [6]], [, , "6[16]\\d{6}", , , , "66661212", , , [8]], [, , , , , , , , , [-1]], [, , "7[178]\\d{6}", , , , "71123456", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "5[158]\\d{6}", , , , "58001110", , , [8]], "SM", 378, "00", , , , "([89]\\d{5})$", "0549$1", , , [[, "(\\d{6})", "$1", ["[89]"]], [, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], [, "(\\d{4})(\\d{6})", "$1 $2", ["0"]]], [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[5-7]"]], [, "(\\d{4})(\\d{6})", "$1 $2", ["0"]]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SN: [, [, , "(?:[378]\\d|93)\\d{7}", , , , , , , [9]], [, , "3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}", , , , "301012345"], [, , "7(?:(?:[06-8]\\d|21|90)\\d|5(?:01|[19]0|25|[38]3|[4-7]\\d))\\d{5}", , , , "701234567"], [, , "800\\d{6}", , , , "800123456"], [, , "88[4689]\\d{6}", , , , "884123456"], [, , "81[02468]\\d{6}", , , , "810123456"], [, , , , , , , , , [-1]], [, , "(?:3(?:392|9[01]\\d)\\d|93(?:3[13]0|929))\\d{4}", , , , "933301234"], "SN", 221, "00", , , , , , , , [[, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[379]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SO: [, [, , "[346-9]\\d{8}|[12679]\\d{7}|[1-5]\\d{6}|[1348]\\d{5}", , , , , , , [6, 7, 8, 9]], [, , "(?:1\\d|2[0-79]|3[0-46-8]|4[0-7]|5[57-9])\\d{5}|(?:[134]\\d|8[125])\\d{4}", , , , "4012345", , , [6, 7]], [, , "(?:(?:15|(?:3[59]|4[89]|6\\d|7[79]|8[08])\\d|9(?:0\\d|[2-9]))\\d|2(?:4\\d|8))\\d{5}|(?:[67]\\d\\d|904)\\d{5}", , , , "71123456", , , [7, 8, 9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SO", 252, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{4})", "$1 $2", ["8[125]"]], [, "(\\d{6})", "$1", ["[134]"]], [, "(\\d)(\\d{6})", "$1 $2", ["[15]|2[0-79]|3[0-46-8]|4[0-7]"]], [, "(\\d)(\\d{7})", "$1 $2", ["(?:2|90)4|[67]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[348]|64|79|90"]], [, "(\\d{2})(\\d{5,7})", "$1 $2", ["1|28|6[0-35-9]|77|9[2-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SR: [, [, , "(?:[2-5]|68|[78]\\d)\\d{5}", , , , , , , [6, 7]], [, , "(?:2[1-3]|3[0-7]|(?:4|68)\\d|5[2-58])\\d{4}", , , , "211234"], [, , "(?:7[124-7]|8[124-9])\\d{5}", , , , "7412345", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "56\\d{4}", , , , "561234", , , [6]], "SR", 597, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1-$2-$3", ["56"]], [, "(\\d{3})(\\d{3})", "$1-$2", ["[2-5]"]], [, "(\\d{3})(\\d{4})", "$1-$2", ["[6-8]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SS: [, [, , "[19]\\d{8}", , , , , , , [9]], [, , "1[89]\\d{7}", , , , "181234567"], [, , "(?:12|9[1257-9])\\d{7}", , , , "977123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SS", 211, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[19]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], ST: [, [, , "(?:22|9\\d)\\d{5}", , , , , , , [7]], [, , "22\\d{5}", , , , "2221234"], [, , "900[5-9]\\d{3}|9(?:0[1-9]|[89]\\d)\\d{4}", , , , "9812345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "ST", 239, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[29]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SV: [, [, , "[267]\\d{7}|[89]00\\d{4}(?:\\d{4})?", , , , , , , [7, 8, 11]], [, , "2(?:79(?:0[0347-9]|[1-9]\\d)|89(?:0[024589]|[1-9]\\d))\\d{3}|2(?:[1-69]\\d|[78][0-8])\\d{5}", , , , "21234567", , , [8]], [, , "[67]\\d{7}", , , , "70123456", , , [8]], [, , "800\\d{4}(?:\\d{4})?", , , , "8001234", , , [7, 11]], [, , "900\\d{4}(?:\\d{4})?", , , , "9001234", , , [7, 11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SV", 503, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[89]"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["[267]"]], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["[89]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SX: [, [, , "7215\\d{6}|(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "7215(?:4[2-8]|8[239]|9[056])\\d{4}", , , , "7215425678", , , , [7]], [, , "7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}", , , , "7215205678", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002123456"], [, , "900[2-9]\\d{6}", , , , "9002123456"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "SX", 1, "011", "1", , , "(5\\d{6})$|1", "721$1", , , , , [, , , , , , , , , [-1]], , "721", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SY: [, [, , "[1-39]\\d{8}|[1-5]\\d{7}", , , , , , , [8, 9], [6, 7]], [, , "21\\d{6,7}|(?:1(?:[14]\\d|[2356])|2[235]|3(?:[13]\\d|4)|4[134]|5[1-3])\\d{6}", , , , "112345678", , , , [6, 7]], [, , "9[1-689]\\d{7}", , , , "944567890", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "SY", 963, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-5]"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1", , 1]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], SZ: [, [, , "0800\\d{4}|(?:[237]\\d|900)\\d{6}", , , , , , , [8, 9]], [, , "[23][2-5]\\d{6}", , , , "22171234", , , [8]], [, , "7[6-9]\\d{6}", , , , "76123456", , , [8]], [, , "0800\\d{4}", , , , "08001234", , , [8]], [, , "900\\d{6}", , , , "900012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "70\\d{6}", , , , "70012345", , , [8]], "SZ", 268, "00", , , , , , , , [[, "(\\d{4})(\\d{4})", "$1 $2", ["[0237]"]], [, "(\\d{5})(\\d{4})", "$1 $2", ["9"]]], , [, , , , , , , , , [-1]], , , [, , "0800\\d{4}", , , , , , , [8]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TA: [, [, , "8\\d{3}", , , , , , , [4]], [, , "8\\d{3}", , , , "8999"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TA", 290, "00", , , , , , , , , , [, , , , , , , , , [-1]], , "8", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TC: [, [, , "(?:[58]\\d\\d|649|900)\\d{7}", , , , , , , [10], [7]], [, , "649(?:266|712|9(?:4\\d|50))\\d{4}", , , , "6497121234", , , , [7]], [, , "649(?:2(?:3[129]|4[1-79])|3\\d\\d|4[34][1-3])\\d{4}", , , , "6492311234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "649(?:71[01]|966)\\d{4}", , , , "6497101234", , , , [7]], "TC", 1, "011", "1", , , "([2-479]\\d{6})$|1", "649$1", , , , , [, , , , , , , , , [-1]], , "649", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TD: [, [, , "(?:22|[69]\\d|77)\\d{6}", , , , , , , [8]], [, , "22(?:[37-9]0|5[0-5]|6[89])\\d{4}", , , , "22501234"], [, , "(?:6[0235689]|77|9\\d)\\d{6}", , , , "63012345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TD", 235, "00|16", , , , , , "00", , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[2679]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TG: [, [, , "[279]\\d{7}", , , , , , , [8]], [, , "2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}", , , , "22212345"], [, , "(?:7[019]|9[0-36-9])\\d{6}", , , , "90112345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TG", 228, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[279]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TH: [, [, , "(?:001800|[2-57]|[689]\\d)\\d{7}|1\\d{7,9}", , , , , , , [8, 9, 10, 13]], [, , "(?:1[0689]|2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}", , , , "21234567", , , [8]], [, , "671[0-8]\\d{5}|(?:14|6[1-6]|[89]\\d)\\d{7}", , , , "812345678", , , [9]], [, , "(?:001800\\d|1800)\\d{6}", , , , "1800123456", , , [10, 13]], [, , "1900\\d{6}", , , , "1900123456", , , [10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "6[08]\\d{7}", , , , "601234567", , , [9]], "TH", 66, "00[1-9]", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{4})", "$1 $2 $3", ["2"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[13-9]"], "0$1"], [, "(\\d{4})(\\d{3})(\\d{3})", "$1 $2 $3", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TJ: [, [, , "[0-57-9]\\d{8}", , , , , , , [9], [3, 5, 6, 7]], [, , "(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:4[046]|74|87))\\d{6}", , , , "372123456", , , , [3, 5, 6, 7]], [, , "(?:41[18]|81[1-9])\\d{6}|(?:0[0-57-9]|1[017]|2[02]|[34]0|5[05]|7[0178]|8[078]|9\\d)\\d{7}", , , , "917123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TJ", 992, "810", , , , , , "8~10", , [[, "(\\d{6})(\\d)(\\d{2})", "$1 $2 $3", ["331", "3317"]], [, "(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["44[04]|[34]7"]], [, "(\\d{4})(\\d)(\\d{4})", "$1 $2 $3", ["3[1-5]"]], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[0-57-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TK: [, [, , "[2-47]\\d{3,6}", , , , , , , [4, 5, 6, 7]], [, , "(?:2[2-4]|[34]\\d)\\d{2,5}", , , , "3101"], [, , "7[2-4]\\d{2,5}", , , , "7290"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TK", 690, "00", , , , , , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TL: [, [, , "7\\d{7}|(?:[2-47]\\d|[89]0)\\d{5}", , , , , , , [7, 8]], [, , "(?:2[1-5]|3[1-9]|4[1-4])\\d{5}", , , , "2112345", , , [7]], [, , "7[2-8]\\d{6}", , , , "77212345", , , [8]], [, , "80\\d{5}", , , , "8012345", , , [7]], [, , "90\\d{5}", , , , "9012345", , , [7]], [, , , , , , , , , [-1]], [, , "70\\d{5}", , , , "7012345", , , [7]], [, , , , , , , , , [-1]], "TL", 670, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[2-489]|70"]], [, "(\\d{4})(\\d{4})", "$1 $2", ["7"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TM: [, [, , "[1-6]\\d{7}", , , , , , , [8]], [, , "(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}", , , , "12345678"], [, , "6\\d{7}", , , , "66123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TM", 993, "810", "8", , , "8", , "8~10", , [[, "(\\d{2})(\\d{2})(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["12"], "(8 $1)"], [, "(\\d{3})(\\d)(\\d{2})(\\d{2})", "$1 $2-$3-$4", ["[1-5]"], "(8 $1)"], [, "(\\d{2})(\\d{6})", "$1 $2", ["6"], "8 $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TN: [, [, , "[2-57-9]\\d{7}", , , , , , , [8]], [, , "81200\\d{3}|(?:3[0-2]|7\\d)\\d{6}", , , , "30010123"], [, , "3(?:001|[12]40)\\d{4}|(?:(?:[259]\\d|4[0-8])\\d|3(?:1[1-35]|6[0-4]|91))\\d{5}", , , , "20123456"], [, , "8010\\d{4}", , , , "80101234"], [, , "88\\d{6}", , , , "88123456"], [, , "8[12]10\\d{4}", , , , "81101234"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TN", 216, "00", , , , , , , , [[, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-57-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TO: [, [, , "(?:0800|(?:[5-8]\\d\\d|999)\\d)\\d{3}|[2-8]\\d{4}", , , , , , , [5, 7]], [, , "(?:2\\d|3[0-8]|4[0-4]|50|6[09]|7[0-24-69]|8[05])\\d{3}", , , , "20123", , , [5]], [, , "(?:55[4-6]|6(?:[09]\\d|3[02]|8[15-9])|(?:7\\d|8[46-9])\\d|999)\\d{4}", , , , "7715123", , , [7]], [, , "0800\\d{3}", , , , "0800222", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "55[0-37-9]\\d{4}", , , , "5510123", , , [7]], "TO", 676, "00", , , , , , , , [[, "(\\d{2})(\\d{3})", "$1-$2", ["[2-4]|50|6[09]|7[0-24-69]|8[05]"]], [, "(\\d{4})(\\d{3})", "$1 $2", ["0"]], [, "(\\d{3})(\\d{4})", "$1 $2", ["[5-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TR: [, [, , "4\\d{6}|8\\d{11,12}|(?:[2-58]\\d\\d|900)\\d{7}", , , , , , , [7, 10, 12, 13]], [, , "(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}", , , , "2123456789", , , [10]], [, , "56161\\d{5}|5(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{7}", , , , "5012345678", , , [10]], [, , "8(?:00\\d{7}(?:\\d{2,3})?|11\\d{7})", , , , "8001234567", , , [10, 12, 13]], [, , "(?:8[89]8|900)\\d{7}", , , , "9001234567", , , [10]], [, , , , , , , , , [-1]], [, , "592(?:21[12]|461)\\d{4}", , , , "5922121234", , , [10]], [, , "850\\d{7}", , , , "8500123456", , , [10]], "TR", 90, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d)(\\d{3})", "$1 $2 $3", ["444"], , , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|616)", "5(?:[0-59]|6161)"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", , 1], [, "(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", , 1]], [[, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["512|8[01589]|90"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["5(?:[0-59]|61)", "5(?:[0-59]|616)", "5(?:[0-59]|6161)"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[24][1-8]|3[1-9]"], "(0$1)", , 1], [, "(\\d{3})(\\d{3})(\\d{6,7})", "$1 $2 $3", ["80"], "0$1", , 1]], [, , "512\\d{7}", , , , "5123456789", , , [10]], , , [, , "(?:444|811\\d{3})\\d{4}", , , , , , , [7, 10]], [, , "444\\d{4}", , , , "4441444", , , [7]], , , [, , , , , , , , , [-1]]], TT: [, [, , "(?:[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "868(?:2(?:01|1[5-9]|[23]\\d|4[0-2])|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}", , , , "8682211234", , , , [7]], [, , "868(?:(?:2[5-9]|3\\d)\\d|4(?:3[0-6]|[6-9]\\d)|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}", , , , "8682911234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "TT", 1, "011", "1", , , "([2-46-8]\\d{6})$|1", "868$1", , , , , [, , , , , , , , , [-1]], , "868", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "868619\\d{4}", , , , "8686191234", , , , [7]]], TV: [, [, , "(?:2|7\\d\\d|90)\\d{4}", , , , , , , [5, 6, 7]], [, , "2[02-9]\\d{3}", , , , "20123", , , [5]], [, , "(?:7[01]\\d|90)\\d{4}", , , , "901234", , , [6, 7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "TV", 688, "00", , , , , , , , [[, "(\\d{2})(\\d{3})", "$1 $2", ["2"]], [, "(\\d{2})(\\d{4})", "$1 $2", ["90"]], [, "(\\d{2})(\\d{5})", "$1 $2", ["7"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], TW: [, [, , "[2-689]\\d{8}|7\\d{9,10}|[2-8]\\d{7}|2\\d{6}", , , , , , , [7, 8, 9, 10, 11]], [, , "(?:2[2-8]\\d|370|55[01]|7[1-9])\\d{6}|4(?:(?:0(?:0[1-9]|[2-48]\\d)|1[023]\\d)\\d{4,5}|(?:[239]\\d\\d|4(?:0[56]|12|49))\\d{5})|6(?:[01]\\d{7}|4(?:0[56]|12|24|4[09])\\d{4,5})|8(?:(?:2(?:3\\d|4[0-269]|[578]0|66)|36[24-9]|90\\d\\d)\\d{4}|4(?:0[56]|12|24|4[09])\\d{4,5})|(?:2(?:2(?:0\\d\\d|4(?:0[68]|[249]0|3[0-467]|5[0-25-9]|6[0235689]))|(?:3(?:[09]\\d|1[0-4])|(?:4\\d|5[0-49]|6[0-29]|7[0-5])\\d)\\d)|(?:(?:3[2-9]|5[2-8]|6[0-35-79]|8[7-9])\\d\\d|4(?:2(?:[089]\\d|7[1-9])|(?:3[0-4]|[78]\\d|9[01])\\d))\\d)\\d{3}", , , , "221234567", , , [8, 9]], [, , "(?:40001[0-2]|9[0-8]\\d{4})\\d{3}", , , , "912345678", , , [9]], [, , "80[0-79]\\d{6}|800\\d{5}", , , , "800123456", , , [8, 9]], [, , "20(?:[013-9]\\d\\d|2)\\d{4}", , , , "203123456", , , [7, 9]], [, , , , , , , , , [-1]], [, , "99\\d{7}", , , , "990123456", , , [9]], [, , "7010(?:[0-2679]\\d|3[0-7]|8[0-5])\\d{5}|70\\d{8}", , , , "7012345678", , , [10, 11]], "TW", 886, "0(?:0[25-79]|19)", "0", "#", , "0", , , , [[, "(\\d{2})(\\d)(\\d{4})", "$1 $2 $3", ["202"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[258]0"], "0$1"], [, "(\\d)(\\d{3,4})(\\d{4})", "$1 $2 $3", ["[23568]|4(?:0[02-48]|[1-47-9])|7[1-9]", "[23568]|4(?:0[2-48]|[1-47-9])|(?:400|7)[1-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[49]"], "0$1"], [, "(\\d{2})(\\d{4})(\\d{4,5})", "$1 $2 $3", ["7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "50[0-46-9]\\d{6}", , , , "500123456", , , [9]], , , [, , , , , , , , , [-1]]], TZ: [, [, , "(?:[25-8]\\d|41|90)\\d{7}", , , , , , , [9]], [, , "2[2-8]\\d{7}", , , , "222345678"], [, , "77[2-9]\\d{6}|(?:6[125-9]|7[13-689])\\d{7}", , , , "621234567"], [, , "80[08]\\d{6}", , , , "800123456"], [, , "90\\d{7}", , , , "900123456"], [, , "8(?:40|6[01])\\d{6}", , , , "840123456"], [, , , , , , , , , [-1]], [, , "41\\d{7}", , , , "412345678"], "TZ", 255, "00[056]", "0", , , "0", , , , [[, "(\\d{3})(\\d{2})(\\d{4})", "$1 $2 $3", ["[89]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[24]"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["5"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[67]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , "(?:8(?:[04]0|6[01])|90\\d)\\d{6}"], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], UA: [, [, , "[89]\\d{9}|[3-9]\\d{8}", , , , , , , [9, 10], [5, 6, 7]], [, , "(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}", , , , "311234567", , , [9], [5, 6, 7]], [, , "(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}", , , , "501234567", , , [9]], [, , "800[1-8]\\d{5,6}", , , , "800123456"], [, , "900[239]\\d{5,6}", , , , "900212345"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "89[1-579]\\d{6}", , , , "891234567", , , [9]], "UA", 380, "00", "0", , , "0", , "0~0", , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["6[12][29]|(?:3[1-8]|4[136-8]|5[12457]|6[49])2|(?:56|65)[24]", "6[12][29]|(?:35|4[1378]|5[12457]|6[49])2|(?:56|65)[24]|(?:3[1-46-8]|46)2[013-9]"], "0$1"], [, "(\\d{4})(\\d{5})", "$1 $2", ["3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6[0135689]|7[4-6])|6(?:[12][3-7]|[459])", "3[1-8]|4(?:[1367]|[45][6-9]|8[4-6])|5(?:[1-5]|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][3-7]|[459])"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[3-7]|89|9[1-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[89]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], UG: [, [, , "800\\d{6}|(?:[29]0|[347]\\d)\\d{7}", , , , , , , [9], [5, 6, 7]], [, , "20(?:(?:240|30[67])\\d|6(?:00[0-2]|30[0-4]))\\d{3}|(?:20(?:[017]\\d|2[5-9]|32|5[0-4]|6[15-9])|[34]\\d{3})\\d{5}", , , , "312345678", , , , [5, 6, 7]], [, , "726[01]\\d{5}|7(?:[01578]\\d|20|36|4[0-4]|6[0-5]|9[89])\\d{6}", , , , "712345678"], [, , "800[1-3]\\d{5}", , , , "800123456"], [, , "90[1-3]\\d{6}", , , , "901123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "UG", 256, "00[057]", "0", , , "0", , , , [[, "(\\d{4})(\\d{5})", "$1 $2", ["202", "2024"], "0$1"], [, "(\\d{3})(\\d{6})", "$1 $2", ["[27-9]|4(?:6[45]|[7-9])"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["[34]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], US: [, [, , "[2-9]\\d{9}|3\\d{6}", , , , , , , [10], [7]], [, , "5056(?:[0-35-9]\\d|4[46])\\d{4}|(?:4722|505[2-57-9]|983[29])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[01356]|3[0-24679]|4[167]|5[0-2]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[068]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}", , , , "2015550123", , , , [7]], [, , "5056(?:[0-35-9]\\d|4[46])\\d{4}|(?:4722|505[2-57-9]|983[29])\\d{6}|(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[01356]|3[0-24679]|4[167]|5[0-2]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[023578]|58|6[349]|7[0589]|8[04])|5(?:0[1-47-9]|1[0235-8]|20|3[0149]|4[01]|5[179]|6[1-47]|7[0-5]|8[0256])|6(?:0[1-35-9]|1[024-9]|2[03689]|[34][016]|5[01679]|6[0-279]|78|8[0-29])|7(?:0[1-46-8]|1[2-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[0-59]|8[156])|8(?:0[1-68]|1[02-8]|2[068]|3[0-2589]|4[03578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[0146-8]|4[01357-9]|5[12469]|7[0-389]|8[04-69]))[2-9]\\d{6}", , , , "2015550123", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "US", 1, "011", "1", , , "1", , , 1, [[, "(\\d{3})(\\d{4})", "$1-$2", ["310"], , , 1], [, "(\\d{3})(\\d{4})", "$1-$2", ["[24-9]|3(?:[02-9]|1[1-9])"]], [, "(\\d{3})(\\d{3})(\\d{4})", "($1) $2-$3", ["[2-9]"], , , 1]], [[, "(\\d{3})(\\d{4})", "$1-$2", ["310"], , , 1], [, "(\\d{3})(\\d{3})(\\d{4})", "$1-$2-$3", ["[2-9]"]]], [, , , , , , , , , [-1]], 1, , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], UY: [, [, , "0004\\d{2,9}|4\\d{9}|[1249]\\d{7}|(?:[49]\\d|80)\\d{5}", , , , , , , [6, 7, 8, 9, 10, 11, 12, 13]], [, , "(?:1(?:770|9(?:20|87))|(?:2\\d|4[2-7])\\d\\d)\\d{4}", , , , "21231234", , , [8], [7]], [, , "9[1-9]\\d{6}", , , , "94231234", , , [8]], [, , "0004\\d{2,9}|(?:4\\d{5}|80[05])\\d{4}|405\\d{4}", , , , "8001234"], [, , "90[0-8]\\d{4}", , , , "9001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "UY", 598, "0(?:0|1[3-9]\\d)", "0", " int. ", , "0", , "00", , [[, "(\\d{3})(\\d{3,4})", "$1 $2", ["0"]], [, "(\\d{3})(\\d{4})", "$1 $2", ["405|8|90"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["9"], "0$1"], [, "(\\d{4})(\\d{4})", "$1 $2", ["[124]"]], [, "(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3", ["0"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["4"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{2,4})", "$1 $2 $3 $4", ["0"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], UZ: [, [, , "200\\d{6}|(?:33|[5-79]\\d|88)\\d{7}", , , , , , , [9]], [, , "(?:55\\d\\d|6(?:1(?:22|3[124]|4[1-4]|5[1-3578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d\\d|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[124-6]|9[135-8])|(?:1[12]|8\\d)\\d|2(?:22|3[13-57-9]|4[1-3579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}", , , , "669050123"], [, , "(?:(?:200[01]|(?:33|50|88|9[0-57-9])\\d\\d)\\d|6(?:1(?:2(?:2[01]|98)|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:(?:11|7\\d)\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4]))|5(?:19[01]|2(?:27|9[26])|(?:30|59|7\\d)\\d)|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|(?:3[79]|9[0-3])\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79]))|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|3[01]|5\\d|7[0-4])|(?:5[67]|7\\d)\\d|6(?:2[0-26]|8\\d)))|7(?:[07]\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|(?:33|9[4-6])\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078]))|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0-27]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[02569]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07]))))\\d{4}", , , , "912345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "UZ", 998, "810", "8", , , "8", , "8~10", , [[, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["[235-9]"], "8 $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], VA: [, [, , "0\\d{5,10}|3[0-8]\\d{7,10}|55\\d{8}|8\\d{5}(?:\\d{2,4})?|(?:1\\d|39)\\d{7,8}", , , , , , , [6, 7, 8, 9, 10, 11, 12]], [, , "06698\\d{1,6}", , , , "0669812345", , , [6, 7, 8, 9, 10, 11]], [, , "3[1-9]\\d{8}|3[2-9]\\d{7}", , , , "3123456789", , , [9, 10]], [, , "80(?:0\\d{3}|3)\\d{3}", , , , "800123456", , , [6, 9]], [, , "(?:0878\\d{3}|89(?:2\\d|3[04]|4(?:[0-4]|[5-9]\\d\\d)|5[0-4]))\\d\\d|(?:1(?:44|6[346])|89(?:38|5[5-9]|9))\\d{6}", , , , "899123456", , , [6, 8, 9, 10]], [, , "84(?:[08]\\d{3}|[17])\\d{3}", , , , "848123456", , , [6, 9]], [, , "1(?:78\\d|99)\\d{6}", , , , "1781234567", , , [9, 10]], [, , "55\\d{8}", , , , "5512345678", , , [10]], "VA", 39, "00", , , , , , , , , , [, , , , , , , , , [-1]], , "06698", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "3[2-8]\\d{9,10}", , , , "33101234501", , , [11, 12]]], VC: [, [, , "(?:[58]\\d\\d|784|900)\\d{7}", , , , , , , [10], [7]], [, , "784(?:266|3(?:6[6-9]|7\\d|8[0-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}", , , , "7842661234", , , , [7]], [, , "784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4])|720)\\d{4}", , , , "7844301234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , "78451[0-2]\\d{4}", , , , "7845101234", , , , [7]], "VC", 1, "011", "1", , , "([2-7]\\d{6})$|1", "784$1", , , , , [, , , , , , , , , [-1]], , "784", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], VE: [, [, , "[68]00\\d{7}|(?:[24]\\d|[59]0)\\d{8}", , , , , , , [10], [7]], [, , "(?:2(?:12|3[457-9]|[467]\\d|[58][1-9]|9[1-6])|[4-6]00)\\d{7}", , , , "2121234567", , , , [7]], [, , "4(?:1[24-8]|2[46])\\d{7}", , , , "4121234567"], [, , "800\\d{7}", , , , "8001234567"], [, , "90[01]\\d{7}", , , , "9001234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "VE", 58, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{7})", "$1-$2", ["[24-689]"], "0$1", "$CC $1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "501\\d{7}", , , , "5010123456", , , , [7]], , , [, , , , , , , , , [-1]]], VG: [, [, , "(?:284|[58]\\d\\d|900)\\d{7}", , , , , , , [10], [7]], [, , "284(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}", , , , "2842291234", , , , [7]], [, , "284(?:245|3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|9[69])|5(?:4[0-7]|68|9[69]))\\d{4}", , , , "2843001234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "VG", 1, "011", "1", , , "([2-578]\\d{6})$|1", "284$1", , , , , [, , , , , , , , , [-1]], , "284", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], VI: [, [, , "[58]\\d{9}|(?:34|90)0\\d{7}", , , , , , , [10], [7]], [, , "340(?:2(?:0[0-368]|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}", , , , "3406421234", , , , [7]], [, , "340(?:2(?:0[0-368]|2[06-8]|4[49]|77)|3(?:32|44)|4(?:2[23]|44|7[34]|89)|5(?:1[34]|55)|6(?:2[56]|4[23]|77|9[023])|7(?:1[2-57-9]|2[57]|7\\d)|884|998)\\d{4}", , , , "3406421234", , , , [7]], [, , "8(?:00|33|44|55|66|77|88)[2-9]\\d{6}", , , , "8002345678"], [, , "900[2-9]\\d{6}", , , , "9002345678"], [, , , , , , , , , [-1]], [, , "52(?:3(?:[2-46-9][02-9]\\d|5(?:[02-46-9]\\d|5[0-46-9]))|4(?:[2-478][02-9]\\d|5(?:[034]\\d|2[024-9]|5[0-46-9])|6(?:0[1-9]|[2-9]\\d)|9(?:[05-9]\\d|2[0-5]|49)))\\d{4}|52[34][2-9]1[02-9]\\d{4}|5(?:00|2[125-9]|33|44|66|77|88)[2-9]\\d{6}", , , , "5002345678"], [, , , , , , , , , [-1]], "VI", 1, "011", "1", , , "([2-9]\\d{6})$|1", "340$1", , 1, , , [, , , , , , , , , [-1]], , "340", [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], VN: [, [, , "[12]\\d{9}|[135-9]\\d{8}|[16]\\d{7}|[16-8]\\d{6}", , , , , , , [7, 8, 9, 10]], [, , "2(?:0[3-9]|1[0-689]|2[0-25-9]|[38][2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|9[0-4679])\\d{7}", , , , "2101234567", , , [10]], [, , "(?:5(?:2[238]|59)|89[6-9]|99[013-9])\\d{6}|(?:3\\d|5[689]|7[06-9]|8[1-8]|9[0-8])\\d{7}", , , , "912345678", , , [9]], [, , "1800\\d{4,6}|12(?:0[13]|28)\\d{4}", , , , "1800123456", , , [8, 9, 10]], [, , "1900\\d{4,6}", , , , "1900123456", , , [8, 9, 10]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "672\\d{6}", , , , "672012345", , , [9]], "VN", 84, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[17]99"], "0$1", , 1], [, "(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", , 1], [, "(\\d{3})(\\d{4,5})", "$1 $2", ["69"], "0$1", , 1], [, "(\\d{4})(\\d{4,6})", "$1 $2", ["1"], , , 1], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["6"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[357-9]"], "0$1", , 1], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", , 1], [, "(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", , 1]], [[, "(\\d{2})(\\d{5})", "$1 $2", ["80"], "0$1", , 1], [, "(\\d{4})(\\d{4,6})", "$1 $2", ["1"], , , 1], [, "(\\d{2})(\\d{3})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["6"], "0$1", , 1], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[357-9]"], "0$1", , 1], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["2[48]"], "0$1", , 1], [, "(\\d{3})(\\d{4})(\\d{3})", "$1 $2 $3", ["2"], "0$1", , 1]], [, , , , , , , , , [-1]], , , [, , "[17]99\\d{4}|69\\d{5,6}", , , , , , , [7, 8]], [, , "(?:[17]99|80\\d)\\d{4}|69\\d{5,6}", , , , "1992000", , , [7, 8]], , , [, , , , , , , , , [-1]]], VU: [, [, , "[57-9]\\d{6}|(?:[238]\\d|48)\\d{3}", , , , , , , [5, 7]], [, , "(?:38[0-8]|48[4-9])\\d\\d|(?:2[02-9]|3[4-7]|88)\\d{3}", , , , "22123", , , [5]], [, , "(?:[58]\\d|7[013-7])\\d{5}", , , , "5912345", , , [7]], [, , "81[18]\\d\\d", , , , "81123", , , [5]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:0[1-9]|1[01])\\d{4}", , , , "9010123", , , [7]], "VU", 678, "00", , , , , , , , [[, "(\\d{3})(\\d{4})", "$1 $2", ["[57-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "(?:3[03]|900\\d)\\d{3}", , , , "30123"], , , [, , , , , , , , , [-1]]], WF: [, [, , "(?:40|72)\\d{4}|8\\d{5}(?:\\d{3})?", , , , , , , [6, 9]], [, , "72\\d{4}", , , , "721234", , , [6]], [, , "(?:72|8[23])\\d{4}", , , , "821234", , , [6]], [, , "80[0-5]\\d{6}", , , , "800012345", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "WF", 681, "00", , , , , , , , [[, "(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3", ["[478]"]], [, "(\\d{3})(\\d{2})(\\d{2})(\\d{2})", "$1 $2 $3 $4", ["8"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "[48]0\\d{4}", , , , "401234", , , [6]]], WS: [, [, , "(?:[2-6]|8\\d{5})\\d{4}|[78]\\d{6}|[68]\\d{5}", , , , , , , [5, 6, 7, 10]], [, , "6[1-9]\\d{3}|(?:[2-5]|60)\\d{4}", , , , "22123", , , [5, 6]], [, , "(?:7[1-35-7]|8(?:[3-7]|9\\d{3}))\\d{5}", , , , "7212345", , , [7, 10]], [, , "800\\d{3}", , , , "800123", , , [6]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "WS", 685, "0", , , , , , , , [[, "(\\d{5})", "$1", ["[2-5]|6[1-9]"]], [, "(\\d{3})(\\d{3,7})", "$1 $2", ["[68]"]], [, "(\\d{2})(\\d{5})", "$1 $2", ["7"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], XK: [, [, , "[23]\\d{7,8}|(?:4\\d\\d|[89]00)\\d{5}", , , , , , , [8, 9]], [, , "(?:2[89]|39)0\\d{6}|[23][89]\\d{6}", , , , "28012345"], [, , "4[3-9]\\d{6}", , , , "43201234", , , [8]], [, , "800\\d{5}", , , , "80001234", , , [8]], [, , "900\\d{5}", , , , "90001234", , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "XK", 383, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{5})", "$1 $2", ["[89]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3})", "$1 $2 $3", ["[2-4]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[23]"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], YE: [, [, , "(?:1|7\\d)\\d{7}|[1-7]\\d{6}", , , , , , , [7, 8, 9], [6]], [, , "78[0-7]\\d{4}|17\\d{6}|(?:[12][2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-6])\\d{5}", , , , "1234567", , , [7, 8], [6]], [, , "7[01378]\\d{7}", , , , "712345678", , , [9]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "YE", 967, "00", "0", , , "0", , , , [[, "(\\d)(\\d{3})(\\d{3,4})", "$1 $2 $3", ["[1-6]|7(?:[24-6]|8[0-7])"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["7"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], YT: [, [, , "(?:80|9\\d)\\d{7}|(?:26|63)9\\d{6}", , , , , , , [9]], [, , "269(?:0[0-467]|5[0-4]|6\\d|[78]0)\\d{4}", , , , "269601234"], [, , "639(?:0[0-79]|1[019]|[267]\\d|3[09]|40|5[05-9]|9[04-79])\\d{4}", , , , "639012345"], [, , "80\\d{7}", , , , "801234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "9(?:(?:39|47)8[01]|769\\d)\\d{4}", , , , "939801234"], "YT", 262, "00", "0", , , "0", , , , , , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], ZA: [, [, , "[1-79]\\d{8}|8\\d{4,9}", , , , , , , [5, 6, 7, 8, 9, 10]], [, , "(?:2(?:0330|4302)|52087)0\\d{3}|(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}", , , , "101234567", , , [9]], [, , "(?:1(?:3492[0-25]|4495[0235]|549(?:20|5[01]))|4[34]492[01])\\d{3}|8[1-4]\\d{3,7}|(?:2[27]|47|54)4950\\d{3}|(?:1(?:049[2-4]|9[12]\\d\\d)|(?:6\\d|7[0-46-9])\\d{3}|8(?:5\\d{3}|7(?:08[67]|158|28[5-9]|310)))\\d{4}|(?:1[6-8]|28|3[2-69]|4[025689]|5[36-8])4920\\d{3}|(?:12|[2-5]1)492\\d{4}", , , , "711234567", , , [5, 6, 7, 8, 9]], [, , "80\\d{7}", , , , "801234567", , , [9]], [, , "(?:86[2-9]|9[0-2]\\d)\\d{6}", , , , "862345678", , , [9]], [, , "860\\d{6}", , , , "860123456", , , [9]], [, , , , , , , , , [-1]], [, , "87(?:08[0-589]|15[0-79]|28[0-4]|31[1-9])\\d{4}|87(?:[02][0-79]|1[0-46-9]|3[02-9]|[4-9]\\d)\\d{5}", , , , "871234567", , , [9]], "ZA", 27, "00", "0", , , "0", , , , [[, "(\\d{2})(\\d{3,4})", "$1 $2", ["8[1-4]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{2,3})", "$1 $2 $3", ["8[1-4]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["860"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["[1-9]"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["8"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "861\\d{6,7}", , , , "861123456", , , [9, 10]], , , [, , , , , , , , , [-1]]], ZM: [, [, , "800\\d{6}|(?:21|63|[79]\\d)\\d{7}", , , , , , , [9], [6]], [, , "21[1-8]\\d{6}", , , , "211234567", , , , [6]], [, , "(?:7[5-79]|9[5-8])\\d{7}", , , , "955123456"], [, , "800\\d{6}", , , , "800123456"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "63\\d{7}", , , , "630123456"], "ZM", 260, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3})", "$1 $2", ["[1-9]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"]], [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[28]"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["[79]"], "0$1"]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], ZW: [, [, , "2(?:[0-57-9]\\d{6,8}|6[0-24-9]\\d{6,7})|[38]\\d{9}|[35-8]\\d{8}|[3-6]\\d{7}|[1-689]\\d{6}|[1-3569]\\d{5}|[1356]\\d{4}", , , , , , , [5, 6, 7, 8, 9, 10], [3, 4]], [, , "(?:1(?:(?:3\\d|9)\\d|[4-8])|2(?:(?:(?:0(?:2[014]|5)|(?:2[0157]|31|84|9)\\d\\d|[56](?:[14]\\d\\d|20)|7(?:[089]|2[03]|[35]\\d\\d))\\d|4(?:2\\d\\d|8))\\d|1(?:2|[39]\\d{4}))|3(?:(?:123|(?:29\\d|92)\\d)\\d\\d|7(?:[19]|[56]\\d))|5(?:0|1[2-478]|26|[37]2|4(?:2\\d{3}|83)|5(?:25\\d\\d|[78])|[689]\\d)|6(?:(?:[16-8]21|28|52[013])\\d\\d|[39])|8(?:[1349]28|523)\\d\\d)\\d{3}|(?:4\\d\\d|9[2-9])\\d{4,5}|(?:(?:2(?:(?:(?:0|8[146])\\d|7[1-7])\\d|2(?:[278]\\d|92)|58(?:2\\d|3))|3(?:[26]|9\\d{3})|5(?:4\\d|5)\\d\\d)\\d|6(?:(?:(?:[0-246]|[78]\\d)\\d|37)\\d|5[2-8]))\\d\\d|(?:2(?:[569]\\d|8[2-57-9])|3(?:[013-59]\\d|8[37])|6[89]8)\\d{3}", , , , "1312345", , , , [3, 4]], [, , "7(?:[178]\\d|3[1-9])\\d{6}", , , , "712345678", , , [9]], [, , "80(?:[01]\\d|20|8[0-8])\\d{3}", , , , "8001234", , , [7]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "86(?:1[12]|22|30|44|55|77|8[368])\\d{6}", , , , "8686123456", , , [10]], "ZW", 263, "00", "0", , , "0", , , , [[, "(\\d{3})(\\d{3,5})", "$1 $2", ["2(?:0[45]|2[278]|[49]8)|3(?:[09]8|17)|6(?:[29]8|37|75)|[23][78]|(?:33|5[15]|6[68])[78]"], "0$1"], [, "(\\d)(\\d{3})(\\d{2,4})", "$1 $2 $3", ["[49]"], "0$1"], [, "(\\d{3})(\\d{4})", "$1 $2", ["80"], "0$1"], [, "(\\d{2})(\\d{7})", "$1 $2", ["24|8[13-59]|(?:2[05-79]|39|5[45]|6[15-8])2", "2(?:02[014]|4|[56]20|[79]2)|392|5(?:42|525)|6(?:[16-8]21|52[013])|8[13-59]"], "(0$1)"], [, "(\\d{2})(\\d{3})(\\d{4})", "$1 $2 $3", ["7"], "0$1"], [, "(\\d{3})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["2(?:1[39]|2[0157]|[378]|[56][14])|3(?:12|29)", "2(?:1[39]|2[0157]|[378]|[56][14])|3(?:123|29)"], "0$1"], [, "(\\d{4})(\\d{6})", "$1 $2", ["8"], "0$1"], [, "(\\d{2})(\\d{3,5})", "$1 $2", ["1|2(?:0[0-36-9]|12|29|[56])|3(?:1[0-689]|[24-6])|5(?:[0236-9]|1[2-4])|6(?:[013-59]|7[0-46-9])|(?:33|55|6[68])[0-69]|(?:29|3[09]|62)[0-79]"], "0$1"], [, "(\\d{2})(\\d{3})(\\d{3,4})", "$1 $2 $3", ["29[013-9]|39|54"], "0$1"], [, "(\\d{4})(\\d{3,5})", "$1 $2", ["(?:25|54)8", "258|5483"], "0$1"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], 800: [, [, , "(?:00|[1-9]\\d)\\d{6}", , , , , , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:00|[1-9]\\d)\\d{6}", , , , "12345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 800, , , , , , , , 1, [[, "(\\d{4})(\\d{4})", "$1 $2", ["\\d"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], 808: [, [, , "[1-9]\\d{7}", , , , , , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "[1-9]\\d{7}", , , , "12345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 808, , , , , , , , 1, [[, "(\\d{4})(\\d{4})", "$1 $2", ["[1-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], 870: [, [, , "7\\d{11}|[35-7]\\d{8}", , , , , , , [9, 12]], [, , , , , , , , , [-1]], [, , "(?:[356]|774[45])\\d{8}|7[6-8]\\d{7}", , , , "301234567"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 870, , , , , , , , , [[, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["[35-7]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], 878: [, [, , "10\\d{10}", , , , , , , [12]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "10\\d{10}", , , , "101234567890"], "001", 878, , , , , , , , 1, [[, "(\\d{2})(\\d{5})(\\d{5})", "$1 $2 $3", ["1"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], 881: [, [, , "[0-36-9]\\d{8}", , , , , , , [9]], [, , , , , , , , , [-1]], [, , "[0-36-9]\\d{8}", , , , "612345678"], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 881, , , , , , , , , [[, "(\\d)(\\d{3})(\\d{5})", "$1 $2 $3", ["[0-36-9]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], 882: [, [, , "[13]\\d{6}(?:\\d{2,5})?|[19]\\d{7}|(?:[25]\\d\\d|4)\\d{7}(?:\\d{2})?", , , , , , , [7, 8, 9, 10, 11, 12]], [, , , , , , , , , [-1]], [, , "342\\d{4}|(?:337|49)\\d{6}|(?:3(?:2|47|7\\d{3})|50\\d{3})\\d{7}", , , , "3421234", , , [7, 8, 9, 10, 12]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15-8]|9[0689])\\d{4}|6\\d{5,10})|(?:345\\d|9[89])\\d{6}|(?:10|2(?:3|85\\d)|3(?:[15]|[69]\\d\\d)|4[15-8]|51)\\d{8}", , , , "390123456789"], "001", 882, , , , , , , , , [[, "(\\d{2})(\\d{5})", "$1 $2", ["16|342"]], [, "(\\d{2})(\\d{6})", "$1 $2", ["49"]], [, "(\\d{2})(\\d{2})(\\d{4})", "$1 $2 $3", ["1[36]|9"]], [, "(\\d{2})(\\d{4})(\\d{3})", "$1 $2 $3", ["3[23]"]], [, "(\\d{2})(\\d{3,4})(\\d{4})", "$1 $2 $3", ["16"]], [, "(\\d{2})(\\d{4})(\\d{4})", "$1 $2 $3", ["10|23|3(?:[15]|4[57])|4|51"]], [, "(\\d{3})(\\d{4})(\\d{4})", "$1 $2 $3", ["34"]], [, "(\\d{2})(\\d{4,5})(\\d{5})", "$1 $2 $3", ["[1-35]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , "348[57]\\d{7}", , , , "34851234567", , , [11]]], 883: [, [, , "(?:[1-4]\\d|51)\\d{6,10}", , , , , , , [8, 9, 10, 11, 12]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "(?:2(?:00\\d\\d|10)|(?:370[1-9]|51\\d0)\\d)\\d{7}|51(?:00\\d{5}|[24-9]0\\d{4,7})|(?:1[013-79]|2[24-689]|3[02-689]|4[0-4])0\\d{5,9}", , , , "510012345"], "001", 883, , , , , , , , 1, [[, "(\\d{3})(\\d{3})(\\d{2,8})", "$1 $2 $3", ["[14]|2[24-689]|3[02-689]|51[24-9]"]], [, "(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3", ["510"]], [, "(\\d{3})(\\d{3})(\\d{4})", "$1 $2 $3", ["21"]], [, "(\\d{4})(\\d{4})(\\d{4})", "$1 $2 $3", ["51[13]"]], [, "(\\d{3})(\\d{3})(\\d{3})(\\d{3})", "$1 $2 $3 $4", ["[235]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]], 888: [, [, , "\\d{11}", , , , , , , [11]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 888, , , , , , , , 1, [[, "(\\d{3})(\\d{3})(\\d{5})", "$1 $2 $3"]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , "\\d{11}", , , , "12345678901"], , , [, , , , , , , , , [-1]]], 979: [, [, , "[1359]\\d{8}", , , , , , , [9], [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , "[1359]\\d{8}", , , , "123456789", , , , [8]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], "001", 979, , , , , , , , 1, [[, "(\\d)(\\d{4})(\\d{4})", "$1 $2 $3", ["[1359]"]]], , [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]], [, , , , , , , , , [-1]], , , [, , , , , , , , , [-1]]] };
        function H() {
          this.g = {};
        }
        H.g = void 0;
        H.h = function() {
          return H.g ? H.g : H.g = new H();
        };
        var wa = { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", "\uFF10": "0", "\uFF11": "1", "\uFF12": "2", "\uFF13": "3", "\uFF14": "4", "\uFF15": "5", "\uFF16": "6", "\uFF17": "7", "\uFF18": "8", "\uFF19": "9", "\u0660": "0", "\u0661": "1", "\u0662": "2", "\u0663": "3", "\u0664": "4", "\u0665": "5", "\u0666": "6", "\u0667": "7", "\u0668": "8", "\u0669": "9", "\u06F0": "0", "\u06F1": "1", "\u06F2": "2", "\u06F3": "3", "\u06F4": "4", "\u06F5": "5", "\u06F6": "6", "\u06F7": "7", "\u06F8": "8", "\u06F9": "9" }, xa = { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", "+": "+", "*": "*", "#": "#" }, ya = { 0: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", "\uFF10": "0", "\uFF11": "1", "\uFF12": "2", "\uFF13": "3", "\uFF14": "4", "\uFF15": "5", "\uFF16": "6", "\uFF17": "7", "\uFF18": "8", "\uFF19": "9", "\u0660": "0", "\u0661": "1", "\u0662": "2", "\u0663": "3", "\u0664": "4", "\u0665": "5", "\u0666": "6", "\u0667": "7", "\u0668": "8", "\u0669": "9", "\u06F0": "0", "\u06F1": "1", "\u06F2": "2", "\u06F3": "3", "\u06F4": "4", "\u06F5": "5", "\u06F6": "6", "\u06F7": "7", "\u06F8": "8", "\u06F9": "9", A: "2", B: "2", C: "2", D: "3", E: "3", F: "3", G: "4", H: "4", I: "4", J: "5", K: "5", L: "5", M: "6", N: "6", O: "6", P: "7", Q: "7", R: "7", S: "7", T: "8", U: "8", V: "8", W: "9", X: "9", Y: "9", Z: "9" }, za = /[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?/, Aa = RegExp("[+\uFF0B]+"), I = RegExp("^[+\uFF0B]+"), Ba = RegExp("([0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9])"), Ca = RegExp("[+\uFF0B0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]"), Da = /[\\\/] *x/, Ea = RegExp("[^0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9A-Za-z#]+$"), Fa = /(?:.*?[A-Za-z]){3}.*/, Ga = RegExp("^\\+([0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]|[\\-\\.\\(\\)]?)*[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]([0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]|[\\-\\.\\(\\)]?)*$"), Ha = RegExp("^([A-Za-z0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]+((\\-)*[A-Za-z0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9])*\\.)*[A-Za-z]+((\\-)*[A-Za-z0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9])*\\.?$");
        function J(a) {
          return "([0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]{1," + a + "})";
        }
        function Ia() {
          return ";ext=" + J("20") + "|[ \xA0\\t,]*(?:e?xt(?:ensi(?:o\u0301?|\xF3))?n?|\uFF45?\uFF58\uFF54\uFF4E?|\u0434\u043E\u0431|anexo)[:\\.\uFF0E]?[ \xA0\\t,-]*" + (J("20") + "#?|[ \xA0\\t,]*(?:[x\uFF58#\uFF03~\uFF5E]|int|\uFF49\uFF4E\uFF54)[:\\.\uFF0E]?[ \xA0\\t,-]*") + (J("9") + "#?|[- ]+") + (J("6") + "#|[ \xA0\\t]*(?:,{2}|;)[:\\.\uFF0E]?[ \xA0\\t,-]*") + (J("15") + "#?|[ \xA0\\t]*(?:,)+[:\\.\uFF0E]?[ \xA0\\t,-]*") + (J("9") + "#?");
        }
        var Ja = new RegExp("(?:" + Ia() + ")$", "i"), Ka = new RegExp("^[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]{2}$|^[+\uFF0B]*(?:[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E*]*[0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]){3,}[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E*A-Za-z0-9\uFF10-\uFF19\u0660-\u0669\u06F0-\u06F9]*(?:" + Ia() + ")?$", "i"), La = /(\$\d)/, Ma = /^\(?\$1\)?$/;
        function Na(a) {
          return 2 > a.length ? false : K(Ka, a);
        }
        function Oa(a) {
          return K(Fa, a) ? Pa(a, ya) : Pa(a, wa);
        }
        function Qa(a) {
          var b = Oa(a.toString());
          A(a);
          a.g(b);
        }
        function Ra() {
          return Object.keys(G).filter(function(a) {
            return isNaN(a);
          });
        }
        function Sa() {
          return Object.keys(G).filter(function(a) {
            return !isNaN(a);
          }).map(function(a) {
            return parseInt(a, 10);
          });
        }
        function Ta() {
          var a = Object.keys(F);
          return [].concat((0, _toConsumableArray2.default)(Sa()), (0, _toConsumableArray2.default)(a.map(function(b) {
            return parseInt(b, 10);
          })));
        }
        function Ua(a) {
          return null != a && (1 != v(a, 9) || -1 != r(a, 9)[0]);
        }
        function Pa(a, b) {
          for (var c = new z(), d, e = a.length, f = 0; f < e; ++f)
            d = a.charAt(f), d = b[d.toUpperCase()], null != d && c.g(d);
          return c.toString();
        }
        function Va(a) {
          return 0 == a.length || Ma.test(a);
        }
        function L(a) {
          return null != a && isNaN(a) && a.toUpperCase() in G;
        }
        function M(a, b, c) {
          if (0 == n(b, 2) && m(b, 5)) {
            var d = u(b, 5);
            if (0 < d.length)
              return d;
          }
          d = u(b, 1);
          var e = N(b);
          if (0 == c)
            return Wa(d, 0, e, "");
          if (!(d in F))
            return e;
          a = O(a, d, P(d));
          b = Xa(b, a, c);
          e = Ya(e, a, c);
          return Wa(d, c, e, b);
        }
        function O(a, b, c) {
          return "001" == c ? Q(a, "" + b) : Q(a, c);
        }
        function Za(a, b) {
          var c = S;
          if (!L(b))
            return M(c, a, 1);
          var d = u(a, 1), e = N(a);
          if (!(d in F))
            return e;
          if (1 == d) {
            if (null != b && F[1].includes(b.toUpperCase()))
              return d + " " + M(c, a, 2);
          } else if (d == T(c, b))
            return M(c, a, 2);
          var f = Q(c, b), g = u(f, 11);
          b = "";
          m(f, 17) ? b = u(f, 17) : K(za, g) && (b = g);
          c = O(c, d, P(d));
          e = Ya(e, c, 1);
          a = Xa(a, c, 1);
          return 0 < b.length ? b + " " + d + " " + e + a : Wa(d, 1, e, a);
        }
        function N(a) {
          if (!m(a, 2))
            return "";
          var b = "" + n(a, 2);
          return m(a, 4) && n(a, 4) && 0 < u(a, 8) ? Array(u(a, 8) + 1).join("0") + b : b;
        }
        function Wa(a, b, c, d) {
          switch (b) {
            case 0:
              return "+" + a + c + d;
            case 1:
              return "+" + a + " " + c + d;
            case 3:
              return "tel:+" + a + "-" + c + d;
            default:
              return c + d;
          }
        }
        function Ya(a, b, c) {
          a: {
            b = 0 == r(b, 20).length || 2 == c ? r(b, 19) : r(b, 20);
            for (var d, e = b.length, f = 0; f < e; ++f) {
              d = b[f];
              var g = v(d, 3);
              if (0 == g || 0 == a.search(n(d, 3, g - 1))) {
                if (g = new RegExp(n(d, 1)), K(g, a)) {
                  b = d;
                  break a;
                }
              }
            }
            b = null;
          }
          null == b ? c = a : (e = b, b = u(e, 2), d = new RegExp(n(e, 1)), u(e, 5), e = u(e, 4), a = 2 == c && null != e && 0 < e.length ? a.replace(d, b.replace(La, e)) : a.replace(d, b), 3 == c && (a = a.replace(RegExp("^[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]+"), ""), a = a.replace(RegExp("[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]+", "g"), "-")), c = a);
          return c;
        }
        function $a(a, b) {
          var c = S;
          if (!L(a))
            return null;
          b = ab(Q(c, a), b);
          try {
            if (m(b, 6)) {
              var d = n(b, 6);
              return bb(c, d, a);
            }
          } catch (e) {
          }
          return null;
        }
        function Xa(a, b, c) {
          return m(a, 3) && 0 != n(a, 3).length ? 3 == c ? ";ext=" + n(a, 3) : m(b, 13) ? n(b, 13) + u(a, 3) : " ext. " + u(a, 3) : "";
        }
        function ab(a, b) {
          switch (b) {
            case 4:
              return n(a, 5);
            case 3:
              return n(a, 4);
            case 1:
              return n(a, 3);
            case 0:
            case 2:
              return n(a, 2);
            case 5:
              return n(a, 6);
            case 6:
              return n(a, 8);
            case 7:
              return n(a, 7);
            case 8:
              return n(a, 21);
            case 9:
              return n(a, 25);
            case 10:
              return n(a, 28);
            default:
              return n(a, 1);
          }
        }
        function cb2(a, b) {
          return U(a, n(b, 1)) ? U(a, n(b, 5)) ? 4 : U(a, n(b, 4)) ? 3 : U(a, n(b, 6)) ? 5 : U(a, n(b, 8)) ? 6 : U(a, n(b, 7)) ? 7 : U(a, n(b, 21)) ? 8 : U(a, n(b, 25)) ? 9 : U(a, n(b, 28)) ? 10 : U(a, n(b, 2)) ? n(b, 18) || U(a, n(b, 3)) ? 2 : 0 : !n(b, 18) && U(a, n(b, 3)) ? 1 : -1 : -1;
        }
        function Q(a, b) {
          if (null == b)
            return null;
          b = b.toUpperCase();
          var c = a.g[b];
          if (null == c) {
            c = G[b];
            if (null == c)
              return null;
            c = new y().g(D.o(), c);
            a.g[b] = c;
          }
          return c;
        }
        function U(a, b) {
          var c = a.length;
          return 0 < v(b, 9) && -1 == r(b, 9).indexOf(c) ? false : K(u(b, 2), a);
        }
        function db(a) {
          var b = S, c = eb(b, a);
          var d = u(a, 1);
          var e = O(b, d, c);
          null == e || "001" != c && d != T(b, c) ? e = false : (a = N(a), e = -1 != cb2(a, e));
          return e;
        }
        function eb(a, b) {
          if (null == b)
            return null;
          var c = u(b, 1);
          c = F[c];
          if (null == c)
            a = null;
          else if (1 == c.length)
            a = c[0];
          else
            a: {
              b = N(b);
              for (var d, e = c.length, f = 0; f < e; f++) {
                d = c[f];
                var g = Q(a, d);
                if (m(g, 23)) {
                  if (0 == b.search(n(g, 23))) {
                    a = d;
                    break a;
                  }
                } else if (-1 != cb2(b, g)) {
                  a = d;
                  break a;
                }
              }
              a = null;
            }
          return a;
        }
        function P(a) {
          a = F[a];
          return null == a ? "ZZ" : a[0];
        }
        function T(a, b) {
          a = Q(a, b);
          if (null == a)
            throw Error("Invalid region code: " + b);
          return u(a, 10);
        }
        function fb(a) {
          a = gb(a);
          return 0 == a || 4 == a;
        }
        function hb(a, b, c, d) {
          var e = ab(c, d), f = 0 == v(e, 9) ? r(n(c, 1), 9) : r(e, 9);
          e = r(e, 10);
          if (2 == d)
            if (Ua(ab(c, 0)))
              a = ab(c, 1), Ua(a) && (f = f.concat(0 == v(a, 9) ? r(n(c, 1), 9) : r(a, 9)), f.sort(), 0 == e.length ? e = r(a, 10) : (e = e.concat(r(a, 10)), e.sort()));
            else
              return hb(a, b, c, 1);
          if (-1 == f[0])
            return 5;
          b = b.length;
          if (-1 < e.indexOf(b))
            return 4;
          c = f[0];
          return c == b ? 0 : c > b ? 2 : f[f.length - 1] < b ? 3 : -1 < f.indexOf(b, 1) ? 0 : 5;
        }
        function gb(a) {
          var b = S, c = N(a);
          a = u(a, 1);
          if (!(a in F))
            return 1;
          a = O(b, a, P(a));
          return hb(b, c, a, -1);
        }
        function ib(a, b) {
          a = a.toString();
          if (0 == a.length || "0" == a.charAt(0))
            return 0;
          for (var c, d = a.length, e = 1; 3 >= e && e <= d; ++e)
            if (c = parseInt(a.substring(0, e), 10), c in F)
              return b.g(a.substring(e)), c;
          return 0;
        }
        function jb(a, b, c, d, e) {
          if (0 == b.length)
            return 0;
          b = new z(b);
          var f;
          null != c && (f = n(c, 11));
          null == f && (f = "NonMatch");
          var g = b.toString();
          if (0 == g.length)
            f = 20;
          else if (I.test(g))
            g = g.replace(I, ""), A(b), b.g(Oa(g)), f = 1;
          else {
            g = new RegExp(f);
            Qa(b);
            f = b.toString();
            if (0 == f.search(g)) {
              g = f.match(g)[0].length;
              var l = f.substring(g).match(Ba);
              l && null != l[1] && 0 < l[1].length && "0" == Pa(l[1], wa) ? f = false : (A(b), b.g(f.substring(g)), f = true);
            } else
              f = false;
            f = f ? 5 : 20;
          }
          if (20 != f) {
            if (2 >= b.h.length)
              throw Error("Phone number too short after IDD");
            a = ib(b, d);
            if (0 != a)
              return p(e, 1, a), a;
            throw Error("Invalid country calling code");
          }
          if (null != c && (f = u(c, 10), g = "" + f, l = b.toString(), 0 == l.lastIndexOf(g, 0) && (g = new z(l.substring(g.length)), l = n(c, 1), l = new RegExp(u(l, 2)), kb(g, c, null), g = g.toString(), !K(l, b.toString()) && K(l, g) || 3 == hb(a, b.toString(), c, -1))))
            return d.g(g), p(e, 1, f), f;
          p(e, 1, 0);
          return 0;
        }
        function kb(a, b, c) {
          var d = a.toString(), e = d.length, f = n(b, 15);
          if (0 != e && null != f && 0 != f.length) {
            var g = new RegExp("^(?:" + f + ")");
            if (e = g.exec(d)) {
              f = new RegExp(u(n(b, 1), 2));
              var l = K(f, d), q = e.length - 1;
              b = n(b, 16);
              if (null == b || 0 == b.length || null == e[q] || 0 == e[q].length) {
                if (!l || K(f, d.substring(e[0].length)))
                  null != c && 0 < q && null != e[q] && c.g(e[1]), a.set(d.substring(e[0].length));
              } else if (d = d.replace(g, b), !l || K(f, d))
                null != c && 0 < q && c.g(e[1]), a.set(d);
            }
          }
        }
        function bb(a, b, c) {
          if (null == b)
            throw Error("The string supplied did not seem to be a phone number");
          if (250 < b.length)
            throw Error("The string supplied is too long to be a phone number");
          var d = new z();
          var e = b.indexOf(";phone-context=");
          if (-1 === e)
            e = null;
          else if (e += 15, e >= b.length)
            e = "";
          else {
            var f = b.indexOf(";", e);
            e = -1 !== f ? b.substring(e, f) : b.substring(e);
          }
          var g = e;
          null == g ? f = true : 0 === g.length ? f = false : (f = Ga.exec(g), g = Ha.exec(g), f = null !== f || null !== g);
          if (!f)
            throw Error("The string supplied did not seem to be a phone number");
          null != e ? ("+" === e.charAt(0) && d.g(e), e = b.indexOf("tel:"), d.g(b.substring(0 <= e ? e + 4 : 0, b.indexOf(";phone-context=")))) : (e = d.g, b = null != b ? b : "", f = b.search(Ca), 0 <= f ? (b = b.substring(f), b = b.replace(Ea, ""), f = b.search(Da), 0 <= f && (b = b.substring(0, f))) : b = "", e.call(d, b));
          b = d.toString();
          e = b.indexOf(";isub=");
          0 < e && (A(d), d.g(b.substring(0, e)));
          if (!Na(d.toString()))
            throw Error("The string supplied did not seem to be a phone number");
          b = d.toString();
          if (!(L(c) || null != b && 0 < b.length && I.test(b)))
            throw Error("Invalid country calling code");
          b = new E();
          a: {
            e = d.toString();
            f = e.search(Ja);
            if (0 <= f && Na(e.substring(0, f))) {
              g = e.match(Ja);
              for (var l = g.length, q = 1; q < l; ++q)
                if (null != g[q] && 0 < g[q].length) {
                  A(d);
                  d.g(e.substring(0, f));
                  e = g[q];
                  break a;
                }
            }
            e = "";
          }
          0 < e.length && p(b, 3, e);
          f = Q(a, c);
          e = new z();
          g = 0;
          l = d.toString();
          try {
            g = jb(a, l, f, e, b);
          } catch (R) {
            if ("Invalid country calling code" == R.message && I.test(l)) {
              if (l = l.replace(I, ""), g = jb(a, l, f, e, b), 0 == g)
                throw R;
            } else
              throw R;
          }
          0 != g ? (d = P(g), d != c && (f = O(a, g, d))) : (Qa(d), e.g(d.toString()), null != c && (g = u(f, 10), p(b, 1, g)));
          if (2 > e.h.length)
            throw Error("The string supplied is too short to be a phone number");
          null != f && (c = new z(e.toString()), kb(c, f, new z()), a = hb(a, c.toString(), f, -1), 2 != a && 4 != a && 5 != a && (e = c));
          a = e.toString();
          c = a.length;
          if (2 > c)
            throw Error("The string supplied is too short to be a phone number");
          if (17 < c)
            throw Error("The string supplied is too long to be a phone number");
          if (1 < a.length && "0" == a.charAt(0)) {
            p(b, 4, true);
            for (c = 1; c < a.length - 1 && "0" == a.charAt(c); )
              c++;
            1 != c && p(b, 8, c);
          }
          p(b, 2, parseInt(a, 10));
          return b;
        }
        H.prototype.ja = function(a) {
          var b = Q(this, eb(this, a));
          if (null == b)
            return true;
          a = N(a);
          return !U(a, n(b, 24));
        };
        function K(a, b) {
          return (a = "string" == typeof a ? b.match("^(?:" + a + ")$") : b.match(a)) && a[0].length == b.length ? true : false;
        }
        ;
        function lb(a) {
          this.ka = RegExp("\u2008");
          this.la = "";
          this.$ = new z();
          this.da = "";
          this.u = new z();
          this.ba = new z();
          this.v = true;
          this.ea = this.ca = this.oa = false;
          this.pa = H.h();
          this.aa = 0;
          this.h = new z();
          this.ha = false;
          this.s = "";
          this.g = new z();
          this.j = [];
          this.ma = a;
          this.wa = this.m = mb(this, this.ma);
        }
        var nb = new D();
        p(nb, 11, "NA");
        var ob = RegExp("^[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]*\\$1[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]*(\\$\\d[-x\u2010-\u2015\u2212\u30FC\uFF0D-\uFF0F \xA0\xAD\u200B\u2060\u3000()\uFF08\uFF09\uFF3B\uFF3D.\\[\\]/~\u2053\u223C\uFF5E]*)*$"), pb = /[- ]/;
        function mb(a, b) {
          b = L(b) ? T(a.pa, b) : 0;
          a = Q(a.pa, P(b));
          return null != a ? a : nb;
        }
        function qb(a) {
          for (var b = a.j.length, c = 0; c < b; ++c) {
            var d = a.j[c], e = u(d, 1);
            if (a.da == e)
              return false;
            var f = a;
            var g = d, l = u(g, 1);
            A(f.$);
            var q = f;
            g = u(g, 2);
            var R = "999999999999999".match(l)[0];
            R.length < q.g.h.length ? q = "" : (q = R.replace(new RegExp(l, "g"), g), q = q.replace(RegExp("9", "g"), "\u2008"));
            0 < q.length ? (f.$.g(q), f = true) : f = false;
            if (f)
              return a.da = e, a.ha = pb.test(n(d, 4)), a.aa = 0, true;
          }
          return a.v = false;
        }
        function rb(a, b) {
          for (var c = [], d = b.length - 3, e = a.j.length, f = 0; f < e; ++f) {
            var g = a.j[f];
            0 == v(g, 3) ? c.push(a.j[f]) : (g = n(g, 3, Math.min(d, v(g, 3) - 1)), 0 == b.search(g) && c.push(a.j[f]));
          }
          a.j = c;
        }
        function sb(a, b) {
          a.u.g(b);
          var c = b;
          Ba.test(c) || 1 == a.u.h.length && Aa.test(c) ? ("+" == b ? (c = b, a.ba.g(b)) : (c = wa[b], a.ba.g(c), a.g.g(c)), b = c) : (a.v = false, a.oa = true);
          if (!a.v) {
            if (!a.oa) {
              if (tb(a)) {
                if (ub(a))
                  return vb(a);
              } else if (0 < a.s.length && (b = a.g.toString(), A(a.g), a.g.g(a.s), a.g.g(b), b = a.h.toString(), c = b.lastIndexOf(a.s), A(a.h), a.h.g(b.substring(0, c))), a.s != wb(a))
                return a.h.g(" "), vb(a);
            }
            return a.u.toString();
          }
          switch (a.ba.h.length) {
            case 0:
            case 1:
            case 2:
              return a.u.toString();
            case 3:
              if (tb(a))
                a.ea = true;
              else
                return a.s = wb(a), xb(a);
            default:
              if (a.ea)
                return ub(a) && (a.ea = false), a.h.toString() + a.g.toString();
              if (0 < a.j.length) {
                b = yb(a, b);
                c = zb(a);
                if (0 < c.length)
                  return c;
                rb(a, a.g.toString());
                return qb(a) ? Ab(a) : a.v ? Bb(a, b) : a.u.toString();
              }
              return xb(a);
          }
        }
        function vb(a) {
          a.v = true;
          a.ea = false;
          a.j = [];
          a.aa = 0;
          A(a.$);
          a.da = "";
          return xb(a);
        }
        function zb(a) {
          for (var b = a.g.toString(), c = a.j.length, d = 0; d < c; ++d) {
            var e = a.j[d], f = u(e, 1);
            if (new RegExp("^(?:" + f + ")$").test(b) && (a.ha = pb.test(n(e, 4)), e = b.replace(new RegExp(f, "g"), n(e, 2)), e = Bb(a, e), Pa(e, xa) == a.ba))
              return e;
          }
          return "";
        }
        function Bb(a, b) {
          var c = a.h.h.length;
          return a.ha && 0 < c && " " != a.h.toString().charAt(c - 1) ? a.h + " " + b : a.h + b;
        }
        function xb(a) {
          var b = a.g.toString();
          if (3 <= b.length) {
            for (var c = a.ca && 0 == a.s.length && 0 < v(a.m, 20) ? r(a.m, 20) : r(a.m, 19), d = c.length, e = 0; e < d; ++e) {
              var f = c[e];
              0 < a.s.length && Va(u(f, 4)) && !n(f, 6) && !m(f, 5) || (0 != a.s.length || a.ca || Va(u(f, 4)) || n(f, 6)) && ob.test(u(f, 2)) && a.j.push(f);
            }
            rb(a, b);
            b = zb(a);
            return 0 < b.length ? b : qb(a) ? Ab(a) : a.u.toString();
          }
          return Bb(a, b);
        }
        function Ab(a) {
          var b = a.g.toString(), c = b.length;
          if (0 < c) {
            for (var d = "", e = 0; e < c; e++)
              d = yb(a, b.charAt(e));
            return a.v ? Bb(a, d) : a.u.toString();
          }
          return a.h.toString();
        }
        function wb(a) {
          var b = a.g.toString(), c = 0;
          if (1 != a.m.ia())
            var d = false;
          else
            d = a.g.toString(), d = "1" == d.charAt(0) && "0" != d.charAt(1) && "1" != d.charAt(1);
          d ? (c = 1, a.h.g("1").g(" "), a.ca = true) : m(a.m, 15) && (d = new RegExp("^(?:" + n(a.m, 15) + ")"), d = b.match(d), null != d && null != d[0] && 0 < d[0].length && (a.ca = true, c = d[0].length, a.h.g(b.substring(0, c))));
          A(a.g);
          a.g.g(b.substring(c));
          return b.substring(0, c);
        }
        function tb(a) {
          var b = a.ba.toString(), c = new RegExp("^(?:\\+|" + n(a.m, 11) + ")");
          c = b.match(c);
          return null != c && null != c[0] && 0 < c[0].length ? (a.ca = true, c = c[0].length, A(a.g), a.g.g(b.substring(c)), A(a.h), a.h.g(b.substring(0, c)), "+" != b.charAt(0) && a.h.g(" "), true) : false;
        }
        function ub(a) {
          if (0 == a.g.h.length)
            return false;
          var b = new z(), c = ib(a.g, b);
          if (0 == c)
            return false;
          A(a.g);
          a.g.g(b.toString());
          b = P(c);
          "001" == b ? a.m = Q(a.pa, "" + c) : b != a.ma && (a.m = mb(a, b));
          a.h.g("" + c).g(" ");
          a.s = "";
          return true;
        }
        function yb(a, b) {
          var c = a.$.toString();
          if (0 <= c.substring(a.aa).search(a.ka)) {
            var d = c.search(a.ka);
            b = c.replace(a.ka, b);
            A(a.$);
            a.$.g(b);
            a.aa = d;
            return b.substring(0, a.aa + 1);
          }
          1 == a.j.length && (a.v = false);
          a.da = "";
          return a.u.toString();
        }
        ;
        var S = H.h();
        function Cb(a) {
          var b = S, c = eb(b, a);
          b = O(b, u(a, 1), c);
          null == b ? a = -1 : (a = N(a), a = cb2(a, b));
          switch (a) {
            case 0:
              return "fixed-line";
            case 2:
              return "fixed-line-or-mobile";
            case 1:
              return "mobile";
            case 8:
              return "pager";
            case 7:
              return "personal-number";
            case 4:
              return "premium-rate";
            case 5:
              return "shared-cost";
            case 3:
              return "toll-free";
            case 9:
              return "uan";
            case 6:
              return "voip";
            default:
            case -1:
              return "unknown";
          }
        }
        function Db(a) {
          switch (a) {
            case "fixed-line":
              return 0;
            case "fixed-line-or-mobile":
              return 2;
            case "mobile":
              return 1;
            case "pager":
              return 8;
            case "personal-number":
              return 7;
            case "premium-rate":
              return 4;
            case "shared-cost":
              return 5;
            case "toll-free":
              return 3;
            case "uan":
              return 9;
            case "voip":
              return 6;
            default:
            case "unknown":
              return -1;
          }
        }
        function Eb(a) {
          try {
            switch (gb(a)) {
              case 0:
                return "is-possible";
              case 1:
                return "invalid-country-code";
              case 3:
                return "too-long";
              case 2:
                return "too-short";
            }
            if (fb(a))
              return "is-possible";
          } catch (b) {
          }
          return "unknown";
        }
        function Fb(a, b) {
          if ("+" !== a.charAt(0) && "00" !== a.slice(0, 2))
            return { parsed: c, fa: d };
          try {
            var c = bb(S, a, b);
          } catch (e) {
          }
          if (c) {
            var d = eb(S, c);
            if (null != d && "ZZ" !== d)
              return { parsed: c, fa: d };
          }
          for (b = 1; 4 > b; ++b) {
            d = void 0;
            if (a.length < b + 1)
              return { parsed: c, fa: d };
            d = P(a.substring(1, b + 1));
            if ("ZZ" !== d)
              return { fa: d };
          }
          return { parsed: c, fa: void 0 };
        }
        var Gb;
        a: {
          try {
            Gb = /* @__PURE__ */ new WeakMap();
            break a;
          } catch (a) {
          }
          Gb = void 0;
        }
        var Hb = Gb;
        function V(a, b) {
          var _Fb, _Fb$fa;
          if (!(this instanceof V))
            return new V(a, b);
          var c = null == b ? void 0 : b.regionCode;
          if ("string" === typeof a)
            var d = false;
          else
            try {
              db(a), d = true;
            } catch (f) {
              d = false;
            }
          var e;
          if (!d && "string" !== typeof a)
            throw Error("Invalid phone number, expected a string");
          if (!d && "object" !== typeof b && "undefined" !== typeof b)
            throw Error(`Invalid options, expected object, got ${typeof b}. This may be because of not yet upgraded code.`);
          if (!d && null != c && "string" !== typeof c)
            throw Error(`Invalid region code, expected a string, got ${typeof c} ${c}`);
          d || (a = a.trim(), c && "+" === a.charAt(0) && (c = null), c && "+" !== a.charAt(0) && "00" !== a.slice(0, 2) || (_Fb = Fb(a, c), _Fb$fa = _Fb.fa, c = _Fb$fa === void 0 ? null : _Fb$fa, e = _Fb.parsed, _Fb));
          this.g = { number: {}, regionCode: c, valid: false, possible: false };
          Hb && Hb.set(this.g, this);
          if (d)
            this.l = a;
          else {
            this.l = null;
            this.g.number.input = a;
            if (!c) {
              this.g.possibility = "invalid-country-code";
              return;
            }
            if (0 === Ib(c)) {
              this.g.possibility = "invalid-country-code";
              return;
            }
            try {
              this.l = e ? e : bb(S, a, c);
            } catch (f) {
              this.g.possibility = Eb(a);
              return;
            }
          }
          this.g.number.international = M(S, this.l, 1);
          this.g.number.national = M(S, this.l, 2);
          this.g.number.e164 = M(S, this.l, 0);
          this.g.number.rfc3966 = M(S, this.l, 3);
          this.g.number.significant = N(this.l);
          this.g.canBeInternationallyDialled = S.ja(this.l);
          this.g.valid = db(this.l);
          this.g.possible = fb(this.l);
          this.g.possibility = Eb(this.l);
          !this.g.valid && this.g.possible && (this.g.possibility = "invalid", this.g.possible = false);
          this.g.type = Cb(this.l);
          this.g.typeIsMobile = this.sa();
          this.g.typeIsFixedLine = this.ra();
          this.g.countryCode = L(c) ? T(S, c) : 0;
        }
        var W = ["PhoneNumber$$module$src$index"], X = aa;
        W[0] in X || "undefined" == typeof X.execScript || X.execScript("var " + W[0]);
        for (var Y; W.length && (Y = W.shift()); )
          W.length || void 0 === V ? X[Y] && X[Y] !== Object.prototype[Y] ? X = X[Y] : X = X[Y] = {} : X[Y] = V;
        function Ib(a) {
          return L(a) ? T(S, a) : 0;
        }
        V.getCountryCodeForRegionCode = Ib;
        V.getRegionCodeForCountryCode = function(a) {
          return P(a);
        };
        function Jb(a) {
          var b = {};
          return a.filter(function(c) {
            if (b.hasOwnProperty(c))
              return false;
            b[c] = 1;
            return true;
          });
        }
        V.getSupportedRegionCodes = function() {
          return Jb(Ra());
        };
        V.getSupportedCallingCodes = function() {
          return Jb(Ta());
        };
        V.getExample = function(a, b) {
          var c;
          b ? c = $a(a, Db(b)) : c = $a(a, 0);
          return new V(c, a).toJSON();
        };
        V.getAsYouType = function(a) {
          return new Z(a);
        };
        V.getNumberFrom = function(a, b) {
          try {
            a: {
              if (Hb) {
                var e = Hb.get(a);
                if (e) {
                  var c = e;
                  break a;
                }
              }
              var d;
              c = new V(null == a ? void 0 : null == (d = a.number) ? void 0 : d.e164, {});
            }
            return { valid: true, number: Za(c.l, b) };
          } catch (d2) {
            return { valid: false, error: d2 };
          }
        };
        V.prototype.toJSON = function() {
          return this.g;
        };
        V.prototype.toJSON = V.prototype.toJSON;
        V.prototype.ja = function() {
          return this.g.canBeInternationallyDialled;
        };
        V.prototype.canBeInternationallyDialled = V.prototype.ja;
        V.prototype.ya = function() {
          return this.g.valid;
        };
        V.prototype.isValid = V.prototype.ya;
        V.prototype.xa = function() {
          return this.g.possible;
        };
        V.prototype.isPossible = V.prototype.xa;
        V.prototype.getType = function() {
          return this.g.type;
        };
        V.prototype.getType = V.prototype.getType;
        V.prototype.sa = function() {
          return "mobile" === this.g.type || "fixed-line-or-mobile" === this.g.type;
        };
        V.prototype.isMobile = V.prototype.sa;
        V.prototype.ra = function() {
          return "fixed-line" === this.g.type || "fixed-line-or-mobile" === this.g.type;
        };
        V.prototype.isFixedLine = V.prototype.ra;
        V.prototype.ta = function(a) {
          return this.g.number[null == a ? "e164" : a];
        };
        V.prototype.getNumber = V.prototype.ta;
        V.prototype.va = function() {
          return this.g.regionCode;
        };
        V.prototype.getRegionCode = V.prototype.va;
        V.prototype.ia = function() {
          return Ib(this.g.regionCode);
        };
        V.prototype.getCountryCode = V.prototype.ia;
        function Z(a) {
          this.j = a;
          this.h = new lb(a);
          this.l = this.g = "";
        }
        Z.prototype.qa = function(a) {
          this.g += a;
          var b = this.h;
          b.la = sb(b, a);
          return this.l = b.la;
        };
        Z.prototype.addChar = Z.prototype.qa;
        Z.prototype.za = function() {
          return this.l;
        };
        Z.prototype.number = Z.prototype.za;
        Z.prototype.Aa = function() {
          return "" === this.g ? this.l : this.reset(this.g.slice(0, this.g.length - 1));
        };
        Z.prototype.removeChar = Z.prototype.Aa;
        Z.prototype.reset = function(a) {
          var b = this.h;
          b.la = "";
          A(b.u);
          A(b.ba);
          A(b.$);
          b.aa = 0;
          b.da = "";
          A(b.h);
          b.s = "";
          A(b.g);
          b.v = true;
          b.oa = false;
          b.ca = false;
          b.ea = false;
          b.j = [];
          b.ha = false;
          b.m != b.wa && (b.m = mb(b, b.ma));
          this.l = this.g = "";
          if (a) {
            b = 0;
            for (var c = a.length; b < c; ++b)
              this.qa(a.charAt(b));
          }
          return this.l;
        };
        Z.prototype.reset = Z.prototype.reset;
        Z.prototype.ua = function() {
          return new V(this.l, { regionCode: this.j }).toJSON();
        };
        Z.prototype.getPhoneNumber = Z.prototype.ua;
      }).call(typeof module !== "undefined" && typeof module.exports !== "undefined" && module.exports || typeof globalThis !== "undefined" && globalThis || typeof global !== "undefined" && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports);
    } });
    var require_awesome_phonenumber = __commonJS2({ "node_modules/awesome-phonenumber/index.js": function node_modulesAwesomePhonenumberIndexJs(exports, module) {
      var exportedName = "PhoneNumber$$module$src$index";
      module.exports = require_lib()[exportedName] || (typeof globalThis !== "undefined" && globalThis || typeof global !== "undefined" && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports)[exportedName];
      Object.defineProperty(module.exports, "__esModule", { value: true });
      module.exports.parsePhoneNumber = function() {
        try {
          var ret = module.exports.apply(module, arguments).toJSON();
          if (!ret.valid && !ret.possible) {
            ret.possible = false;
            if (!ret.possibility)
              ret.possibility = "invalid";
          }
          return ret;
        } catch (error) {
          return { valid: false, possible: false, possibility: "invalid", error };
        }
      };
      module.exports.getCountryCodeForRegionCode = module.exports.getCountryCodeForRegionCode;
      module.exports.getRegionCodeForCountryCode = module.exports.getRegionCodeForCountryCode;
      module.exports.getSupportedCallingCodes = module.exports.getSupportedCallingCodes;
      module.exports.getSupportedRegionCodes = module.exports.getSupportedRegionCodes;
      module.exports.getExample = module.exports.getExample;
      module.exports.getAsYouType = module.exports.getAsYouType;
      module.exports.getNumberFrom = module.exports.getNumberFrom;
    } });
    var require_named_references = __commonJS2({ "node_modules/html-entities/lib/named-references.js": function node_modulesHtmlEntitiesLibNamedReferencesJs(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.bodyRegExps = { xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g, html4: /&notin;|&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g, html5: /&centerdot;|&copysr;|&divideontimes;|&gtcc;|&gtcir;|&gtdot;|&gtlPar;|&gtquest;|&gtrapprox;|&gtrarr;|&gtrdot;|&gtreqless;|&gtreqqless;|&gtrless;|&gtrsim;|&ltcc;|&ltcir;|&ltdot;|&lthree;|&ltimes;|&ltlarr;|&ltquest;|&ltrPar;|&ltri;|&ltrie;|&ltrif;|&notin;|&notinE;|&notindot;|&notinva;|&notinvb;|&notinvc;|&notni;|&notniva;|&notnivb;|&notnivc;|&parallel;|&timesb;|&timesbar;|&timesd;|&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g };
      exports.namedReferences = { xml: { entities: { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&apos;": "'", "&amp;": "&" }, characters: { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;", "&": "&amp;" } }, html4: { entities: { "&apos;": "'", "&nbsp": "\xA0", "&nbsp;": "\xA0", "&iexcl": "\xA1", "&iexcl;": "\xA1", "&cent": "\xA2", "&cent;": "\xA2", "&pound": "\xA3", "&pound;": "\xA3", "&curren": "\xA4", "&curren;": "\xA4", "&yen": "\xA5", "&yen;": "\xA5", "&brvbar": "\xA6", "&brvbar;": "\xA6", "&sect": "\xA7", "&sect;": "\xA7", "&uml": "\xA8", "&uml;": "\xA8", "&copy": "\xA9", "&copy;": "\xA9", "&ordf": "\xAA", "&ordf;": "\xAA", "&laquo": "\xAB", "&laquo;": "\xAB", "&not": "\xAC", "&not;": "\xAC", "&shy": "\xAD", "&shy;": "\xAD", "&reg": "\xAE", "&reg;": "\xAE", "&macr": "\xAF", "&macr;": "\xAF", "&deg": "\xB0", "&deg;": "\xB0", "&plusmn": "\xB1", "&plusmn;": "\xB1", "&sup2": "\xB2", "&sup2;": "\xB2", "&sup3": "\xB3", "&sup3;": "\xB3", "&acute": "\xB4", "&acute;": "\xB4", "&micro": "\xB5", "&micro;": "\xB5", "&para": "\xB6", "&para;": "\xB6", "&middot": "\xB7", "&middot;": "\xB7", "&cedil": "\xB8", "&cedil;": "\xB8", "&sup1": "\xB9", "&sup1;": "\xB9", "&ordm": "\xBA", "&ordm;": "\xBA", "&raquo": "\xBB", "&raquo;": "\xBB", "&frac14": "\xBC", "&frac14;": "\xBC", "&frac12": "\xBD", "&frac12;": "\xBD", "&frac34": "\xBE", "&frac34;": "\xBE", "&iquest": "\xBF", "&iquest;": "\xBF", "&Agrave": "\xC0", "&Agrave;": "\xC0", "&Aacute": "\xC1", "&Aacute;": "\xC1", "&Acirc": "\xC2", "&Acirc;": "\xC2", "&Atilde": "\xC3", "&Atilde;": "\xC3", "&Auml": "\xC4", "&Auml;": "\xC4", "&Aring": "\xC5", "&Aring;": "\xC5", "&AElig": "\xC6", "&AElig;": "\xC6", "&Ccedil": "\xC7", "&Ccedil;": "\xC7", "&Egrave": "\xC8", "&Egrave;": "\xC8", "&Eacute": "\xC9", "&Eacute;": "\xC9", "&Ecirc": "\xCA", "&Ecirc;": "\xCA", "&Euml": "\xCB", "&Euml;": "\xCB", "&Igrave": "\xCC", "&Igrave;": "\xCC", "&Iacute": "\xCD", "&Iacute;": "\xCD", "&Icirc": "\xCE", "&Icirc;": "\xCE", "&Iuml": "\xCF", "&Iuml;": "\xCF", "&ETH": "\xD0", "&ETH;": "\xD0", "&Ntilde": "\xD1", "&Ntilde;": "\xD1", "&Ograve": "\xD2", "&Ograve;": "\xD2", "&Oacute": "\xD3", "&Oacute;": "\xD3", "&Ocirc": "\xD4", "&Ocirc;": "\xD4", "&Otilde": "\xD5", "&Otilde;": "\xD5", "&Ouml": "\xD6", "&Ouml;": "\xD6", "&times": "\xD7", "&times;": "\xD7", "&Oslash": "\xD8", "&Oslash;": "\xD8", "&Ugrave": "\xD9", "&Ugrave;": "\xD9", "&Uacute": "\xDA", "&Uacute;": "\xDA", "&Ucirc": "\xDB", "&Ucirc;": "\xDB", "&Uuml": "\xDC", "&Uuml;": "\xDC", "&Yacute": "\xDD", "&Yacute;": "\xDD", "&THORN": "\xDE", "&THORN;": "\xDE", "&szlig": "\xDF", "&szlig;": "\xDF", "&agrave": "\xE0", "&agrave;": "\xE0", "&aacute": "\xE1", "&aacute;": "\xE1", "&acirc": "\xE2", "&acirc;": "\xE2", "&atilde": "\xE3", "&atilde;": "\xE3", "&auml": "\xE4", "&auml;": "\xE4", "&aring": "\xE5", "&aring;": "\xE5", "&aelig": "\xE6", "&aelig;": "\xE6", "&ccedil": "\xE7", "&ccedil;": "\xE7", "&egrave": "\xE8", "&egrave;": "\xE8", "&eacute": "\xE9", "&eacute;": "\xE9", "&ecirc": "\xEA", "&ecirc;": "\xEA", "&euml": "\xEB", "&euml;": "\xEB", "&igrave": "\xEC", "&igrave;": "\xEC", "&iacute": "\xED", "&iacute;": "\xED", "&icirc": "\xEE", "&icirc;": "\xEE", "&iuml": "\xEF", "&iuml;": "\xEF", "&eth": "\xF0", "&eth;": "\xF0", "&ntilde": "\xF1", "&ntilde;": "\xF1", "&ograve": "\xF2", "&ograve;": "\xF2", "&oacute": "\xF3", "&oacute;": "\xF3", "&ocirc": "\xF4", "&ocirc;": "\xF4", "&otilde": "\xF5", "&otilde;": "\xF5", "&ouml": "\xF6", "&ouml;": "\xF6", "&divide": "\xF7", "&divide;": "\xF7", "&oslash": "\xF8", "&oslash;": "\xF8", "&ugrave": "\xF9", "&ugrave;": "\xF9", "&uacute": "\xFA", "&uacute;": "\xFA", "&ucirc": "\xFB", "&ucirc;": "\xFB", "&uuml": "\xFC", "&uuml;": "\xFC", "&yacute": "\xFD", "&yacute;": "\xFD", "&thorn": "\xFE", "&thorn;": "\xFE", "&yuml": "\xFF", "&yuml;": "\xFF", "&quot": '"', "&quot;": '"', "&amp": "&", "&amp;": "&", "&lt": "<", "&lt;": "<", "&gt": ">", "&gt;": ">", "&OElig;": "\u0152", "&oelig;": "\u0153", "&Scaron;": "\u0160", "&scaron;": "\u0161", "&Yuml;": "\u0178", "&circ;": "\u02C6", "&tilde;": "\u02DC", "&ensp;": "\u2002", "&emsp;": "\u2003", "&thinsp;": "\u2009", "&zwnj;": "\u200C", "&zwj;": "\u200D", "&lrm;": "\u200E", "&rlm;": "\u200F", "&ndash;": "\u2013", "&mdash;": "\u2014", "&lsquo;": "\u2018", "&rsquo;": "\u2019", "&sbquo;": "\u201A", "&ldquo;": "\u201C", "&rdquo;": "\u201D", "&bdquo;": "\u201E", "&dagger;": "\u2020", "&Dagger;": "\u2021", "&permil;": "\u2030", "&lsaquo;": "\u2039", "&rsaquo;": "\u203A", "&euro;": "\u20AC", "&fnof;": "\u0192", "&Alpha;": "\u0391", "&Beta;": "\u0392", "&Gamma;": "\u0393", "&Delta;": "\u0394", "&Epsilon;": "\u0395", "&Zeta;": "\u0396", "&Eta;": "\u0397", "&Theta;": "\u0398", "&Iota;": "\u0399", "&Kappa;": "\u039A", "&Lambda;": "\u039B", "&Mu;": "\u039C", "&Nu;": "\u039D", "&Xi;": "\u039E", "&Omicron;": "\u039F", "&Pi;": "\u03A0", "&Rho;": "\u03A1", "&Sigma;": "\u03A3", "&Tau;": "\u03A4", "&Upsilon;": "\u03A5", "&Phi;": "\u03A6", "&Chi;": "\u03A7", "&Psi;": "\u03A8", "&Omega;": "\u03A9", "&alpha;": "\u03B1", "&beta;": "\u03B2", "&gamma;": "\u03B3", "&delta;": "\u03B4", "&epsilon;": "\u03B5", "&zeta;": "\u03B6", "&eta;": "\u03B7", "&theta;": "\u03B8", "&iota;": "\u03B9", "&kappa;": "\u03BA", "&lambda;": "\u03BB", "&mu;": "\u03BC", "&nu;": "\u03BD", "&xi;": "\u03BE", "&omicron;": "\u03BF", "&pi;": "\u03C0", "&rho;": "\u03C1", "&sigmaf;": "\u03C2", "&sigma;": "\u03C3", "&tau;": "\u03C4", "&upsilon;": "\u03C5", "&phi;": "\u03C6", "&chi;": "\u03C7", "&psi;": "\u03C8", "&omega;": "\u03C9", "&thetasym;": "\u03D1", "&upsih;": "\u03D2", "&piv;": "\u03D6", "&bull;": "\u2022", "&hellip;": "\u2026", "&prime;": "\u2032", "&Prime;": "\u2033", "&oline;": "\u203E", "&frasl;": "\u2044", "&weierp;": "\u2118", "&image;": "\u2111", "&real;": "\u211C", "&trade;": "\u2122", "&alefsym;": "\u2135", "&larr;": "\u2190", "&uarr;": "\u2191", "&rarr;": "\u2192", "&darr;": "\u2193", "&harr;": "\u2194", "&crarr;": "\u21B5", "&lArr;": "\u21D0", "&uArr;": "\u21D1", "&rArr;": "\u21D2", "&dArr;": "\u21D3", "&hArr;": "\u21D4", "&forall;": "\u2200", "&part;": "\u2202", "&exist;": "\u2203", "&empty;": "\u2205", "&nabla;": "\u2207", "&isin;": "\u2208", "&notin;": "\u2209", "&ni;": "\u220B", "&prod;": "\u220F", "&sum;": "\u2211", "&minus;": "\u2212", "&lowast;": "\u2217", "&radic;": "\u221A", "&prop;": "\u221D", "&infin;": "\u221E", "&ang;": "\u2220", "&and;": "\u2227", "&or;": "\u2228", "&cap;": "\u2229", "&cup;": "\u222A", "&int;": "\u222B", "&there4;": "\u2234", "&sim;": "\u223C", "&cong;": "\u2245", "&asymp;": "\u2248", "&ne;": "\u2260", "&equiv;": "\u2261", "&le;": "\u2264", "&ge;": "\u2265", "&sub;": "\u2282", "&sup;": "\u2283", "&nsub;": "\u2284", "&sube;": "\u2286", "&supe;": "\u2287", "&oplus;": "\u2295", "&otimes;": "\u2297", "&perp;": "\u22A5", "&sdot;": "\u22C5", "&lceil;": "\u2308", "&rceil;": "\u2309", "&lfloor;": "\u230A", "&rfloor;": "\u230B", "&lang;": "\u2329", "&rang;": "\u232A", "&loz;": "\u25CA", "&spades;": "\u2660", "&clubs;": "\u2663", "&hearts;": "\u2665", "&diams;": "\u2666" }, characters: { "'": "&apos;", "\xA0": "&nbsp;", "\xA1": "&iexcl;", "\xA2": "&cent;", "\xA3": "&pound;", "\xA4": "&curren;", "\xA5": "&yen;", "\xA6": "&brvbar;", "\xA7": "&sect;", "\xA8": "&uml;", "\xA9": "&copy;", "\xAA": "&ordf;", "\xAB": "&laquo;", "\xAC": "&not;", "\xAD": "&shy;", "\xAE": "&reg;", "\xAF": "&macr;", "\xB0": "&deg;", "\xB1": "&plusmn;", "\xB2": "&sup2;", "\xB3": "&sup3;", "\xB4": "&acute;", "\xB5": "&micro;", "\xB6": "&para;", "\xB7": "&middot;", "\xB8": "&cedil;", "\xB9": "&sup1;", "\xBA": "&ordm;", "\xBB": "&raquo;", "\xBC": "&frac14;", "\xBD": "&frac12;", "\xBE": "&frac34;", "\xBF": "&iquest;", "\xC0": "&Agrave;", "\xC1": "&Aacute;", "\xC2": "&Acirc;", "\xC3": "&Atilde;", "\xC4": "&Auml;", "\xC5": "&Aring;", "\xC6": "&AElig;", "\xC7": "&Ccedil;", "\xC8": "&Egrave;", "\xC9": "&Eacute;", "\xCA": "&Ecirc;", "\xCB": "&Euml;", "\xCC": "&Igrave;", "\xCD": "&Iacute;", "\xCE": "&Icirc;", "\xCF": "&Iuml;", "\xD0": "&ETH;", "\xD1": "&Ntilde;", "\xD2": "&Ograve;", "\xD3": "&Oacute;", "\xD4": "&Ocirc;", "\xD5": "&Otilde;", "\xD6": "&Ouml;", "\xD7": "&times;", "\xD8": "&Oslash;", "\xD9": "&Ugrave;", "\xDA": "&Uacute;", "\xDB": "&Ucirc;", "\xDC": "&Uuml;", "\xDD": "&Yacute;", "\xDE": "&THORN;", "\xDF": "&szlig;", "\xE0": "&agrave;", "\xE1": "&aacute;", "\xE2": "&acirc;", "\xE3": "&atilde;", "\xE4": "&auml;", "\xE5": "&aring;", "\xE6": "&aelig;", "\xE7": "&ccedil;", "\xE8": "&egrave;", "\xE9": "&eacute;", "\xEA": "&ecirc;", "\xEB": "&euml;", "\xEC": "&igrave;", "\xED": "&iacute;", "\xEE": "&icirc;", "\xEF": "&iuml;", "\xF0": "&eth;", "\xF1": "&ntilde;", "\xF2": "&ograve;", "\xF3": "&oacute;", "\xF4": "&ocirc;", "\xF5": "&otilde;", "\xF6": "&ouml;", "\xF7": "&divide;", "\xF8": "&oslash;", "\xF9": "&ugrave;", "\xFA": "&uacute;", "\xFB": "&ucirc;", "\xFC": "&uuml;", "\xFD": "&yacute;", "\xFE": "&thorn;", "\xFF": "&yuml;", '"': "&quot;", "&": "&amp;", "<": "&lt;", ">": "&gt;", "\u0152": "&OElig;", "\u0153": "&oelig;", "\u0160": "&Scaron;", "\u0161": "&scaron;", "\u0178": "&Yuml;", "\u02C6": "&circ;", "\u02DC": "&tilde;", "\u2002": "&ensp;", "\u2003": "&emsp;", "\u2009": "&thinsp;", "\u200C": "&zwnj;", "\u200D": "&zwj;", "\u200E": "&lrm;", "\u200F": "&rlm;", "\u2013": "&ndash;", "\u2014": "&mdash;", "\u2018": "&lsquo;", "\u2019": "&rsquo;", "\u201A": "&sbquo;", "\u201C": "&ldquo;", "\u201D": "&rdquo;", "\u201E": "&bdquo;", "\u2020": "&dagger;", "\u2021": "&Dagger;", "\u2030": "&permil;", "\u2039": "&lsaquo;", "\u203A": "&rsaquo;", "\u20AC": "&euro;", "\u0192": "&fnof;", "\u0391": "&Alpha;", "\u0392": "&Beta;", "\u0393": "&Gamma;", "\u0394": "&Delta;", "\u0395": "&Epsilon;", "\u0396": "&Zeta;", "\u0397": "&Eta;", "\u0398": "&Theta;", "\u0399": "&Iota;", "\u039A": "&Kappa;", "\u039B": "&Lambda;", "\u039C": "&Mu;", "\u039D": "&Nu;", "\u039E": "&Xi;", "\u039F": "&Omicron;", "\u03A0": "&Pi;", "\u03A1": "&Rho;", "\u03A3": "&Sigma;", "\u03A4": "&Tau;", "\u03A5": "&Upsilon;", "\u03A6": "&Phi;", "\u03A7": "&Chi;", "\u03A8": "&Psi;", "\u03A9": "&Omega;", "\u03B1": "&alpha;", "\u03B2": "&beta;", "\u03B3": "&gamma;", "\u03B4": "&delta;", "\u03B5": "&epsilon;", "\u03B6": "&zeta;", "\u03B7": "&eta;", "\u03B8": "&theta;", "\u03B9": "&iota;", "\u03BA": "&kappa;", "\u03BB": "&lambda;", "\u03BC": "&mu;", "\u03BD": "&nu;", "\u03BE": "&xi;", "\u03BF": "&omicron;", "\u03C0": "&pi;", "\u03C1": "&rho;", "\u03C2": "&sigmaf;", "\u03C3": "&sigma;", "\u03C4": "&tau;", "\u03C5": "&upsilon;", "\u03C6": "&phi;", "\u03C7": "&chi;", "\u03C8": "&psi;", "\u03C9": "&omega;", "\u03D1": "&thetasym;", "\u03D2": "&upsih;", "\u03D6": "&piv;", "\u2022": "&bull;", "\u2026": "&hellip;", "\u2032": "&prime;", "\u2033": "&Prime;", "\u203E": "&oline;", "\u2044": "&frasl;", "\u2118": "&weierp;", "\u2111": "&image;", "\u211C": "&real;", "\u2122": "&trade;", "\u2135": "&alefsym;", "\u2190": "&larr;", "\u2191": "&uarr;", "\u2192": "&rarr;", "\u2193": "&darr;", "\u2194": "&harr;", "\u21B5": "&crarr;", "\u21D0": "&lArr;", "\u21D1": "&uArr;", "\u21D2": "&rArr;", "\u21D3": "&dArr;", "\u21D4": "&hArr;", "\u2200": "&forall;", "\u2202": "&part;", "\u2203": "&exist;", "\u2205": "&empty;", "\u2207": "&nabla;", "\u2208": "&isin;", "\u2209": "&notin;", "\u220B": "&ni;", "\u220F": "&prod;", "\u2211": "&sum;", "\u2212": "&minus;", "\u2217": "&lowast;", "\u221A": "&radic;", "\u221D": "&prop;", "\u221E": "&infin;", "\u2220": "&ang;", "\u2227": "&and;", "\u2228": "&or;", "\u2229": "&cap;", "\u222A": "&cup;", "\u222B": "&int;", "\u2234": "&there4;", "\u223C": "&sim;", "\u2245": "&cong;", "\u2248": "&asymp;", "\u2260": "&ne;", "\u2261": "&equiv;", "\u2264": "&le;", "\u2265": "&ge;", "\u2282": "&sub;", "\u2283": "&sup;", "\u2284": "&nsub;", "\u2286": "&sube;", "\u2287": "&supe;", "\u2295": "&oplus;", "\u2297": "&otimes;", "\u22A5": "&perp;", "\u22C5": "&sdot;", "\u2308": "&lceil;", "\u2309": "&rceil;", "\u230A": "&lfloor;", "\u230B": "&rfloor;", "\u2329": "&lang;", "\u232A": "&rang;", "\u25CA": "&loz;", "\u2660": "&spades;", "\u2663": "&clubs;", "\u2665": "&hearts;", "\u2666": "&diams;" } }, html5: { entities: { "&AElig": "\xC6", "&AElig;": "\xC6", "&AMP": "&", "&AMP;": "&", "&Aacute": "\xC1", "&Aacute;": "\xC1", "&Abreve;": "\u0102", "&Acirc": "\xC2", "&Acirc;": "\xC2", "&Acy;": "\u0410", "&Afr;": "\u{1D504}", "&Agrave": "\xC0", "&Agrave;": "\xC0", "&Alpha;": "\u0391", "&Amacr;": "\u0100", "&And;": "\u2A53", "&Aogon;": "\u0104", "&Aopf;": "\u{1D538}", "&ApplyFunction;": "\u2061", "&Aring": "\xC5", "&Aring;": "\xC5", "&Ascr;": "\u{1D49C}", "&Assign;": "\u2254", "&Atilde": "\xC3", "&Atilde;": "\xC3", "&Auml": "\xC4", "&Auml;": "\xC4", "&Backslash;": "\u2216", "&Barv;": "\u2AE7", "&Barwed;": "\u2306", "&Bcy;": "\u0411", "&Because;": "\u2235", "&Bernoullis;": "\u212C", "&Beta;": "\u0392", "&Bfr;": "\u{1D505}", "&Bopf;": "\u{1D539}", "&Breve;": "\u02D8", "&Bscr;": "\u212C", "&Bumpeq;": "\u224E", "&CHcy;": "\u0427", "&COPY": "\xA9", "&COPY;": "\xA9", "&Cacute;": "\u0106", "&Cap;": "\u22D2", "&CapitalDifferentialD;": "\u2145", "&Cayleys;": "\u212D", "&Ccaron;": "\u010C", "&Ccedil": "\xC7", "&Ccedil;": "\xC7", "&Ccirc;": "\u0108", "&Cconint;": "\u2230", "&Cdot;": "\u010A", "&Cedilla;": "\xB8", "&CenterDot;": "\xB7", "&Cfr;": "\u212D", "&Chi;": "\u03A7", "&CircleDot;": "\u2299", "&CircleMinus;": "\u2296", "&CirclePlus;": "\u2295", "&CircleTimes;": "\u2297", "&ClockwiseContourIntegral;": "\u2232", "&CloseCurlyDoubleQuote;": "\u201D", "&CloseCurlyQuote;": "\u2019", "&Colon;": "\u2237", "&Colone;": "\u2A74", "&Congruent;": "\u2261", "&Conint;": "\u222F", "&ContourIntegral;": "\u222E", "&Copf;": "\u2102", "&Coproduct;": "\u2210", "&CounterClockwiseContourIntegral;": "\u2233", "&Cross;": "\u2A2F", "&Cscr;": "\u{1D49E}", "&Cup;": "\u22D3", "&CupCap;": "\u224D", "&DD;": "\u2145", "&DDotrahd;": "\u2911", "&DJcy;": "\u0402", "&DScy;": "\u0405", "&DZcy;": "\u040F", "&Dagger;": "\u2021", "&Darr;": "\u21A1", "&Dashv;": "\u2AE4", "&Dcaron;": "\u010E", "&Dcy;": "\u0414", "&Del;": "\u2207", "&Delta;": "\u0394", "&Dfr;": "\u{1D507}", "&DiacriticalAcute;": "\xB4", "&DiacriticalDot;": "\u02D9", "&DiacriticalDoubleAcute;": "\u02DD", "&DiacriticalGrave;": "`", "&DiacriticalTilde;": "\u02DC", "&Diamond;": "\u22C4", "&DifferentialD;": "\u2146", "&Dopf;": "\u{1D53B}", "&Dot;": "\xA8", "&DotDot;": "\u20DC", "&DotEqual;": "\u2250", "&DoubleContourIntegral;": "\u222F", "&DoubleDot;": "\xA8", "&DoubleDownArrow;": "\u21D3", "&DoubleLeftArrow;": "\u21D0", "&DoubleLeftRightArrow;": "\u21D4", "&DoubleLeftTee;": "\u2AE4", "&DoubleLongLeftArrow;": "\u27F8", "&DoubleLongLeftRightArrow;": "\u27FA", "&DoubleLongRightArrow;": "\u27F9", "&DoubleRightArrow;": "\u21D2", "&DoubleRightTee;": "\u22A8", "&DoubleUpArrow;": "\u21D1", "&DoubleUpDownArrow;": "\u21D5", "&DoubleVerticalBar;": "\u2225", "&DownArrow;": "\u2193", "&DownArrowBar;": "\u2913", "&DownArrowUpArrow;": "\u21F5", "&DownBreve;": "\u0311", "&DownLeftRightVector;": "\u2950", "&DownLeftTeeVector;": "\u295E", "&DownLeftVector;": "\u21BD", "&DownLeftVectorBar;": "\u2956", "&DownRightTeeVector;": "\u295F", "&DownRightVector;": "\u21C1", "&DownRightVectorBar;": "\u2957", "&DownTee;": "\u22A4", "&DownTeeArrow;": "\u21A7", "&Downarrow;": "\u21D3", "&Dscr;": "\u{1D49F}", "&Dstrok;": "\u0110", "&ENG;": "\u014A", "&ETH": "\xD0", "&ETH;": "\xD0", "&Eacute": "\xC9", "&Eacute;": "\xC9", "&Ecaron;": "\u011A", "&Ecirc": "\xCA", "&Ecirc;": "\xCA", "&Ecy;": "\u042D", "&Edot;": "\u0116", "&Efr;": "\u{1D508}", "&Egrave": "\xC8", "&Egrave;": "\xC8", "&Element;": "\u2208", "&Emacr;": "\u0112", "&EmptySmallSquare;": "\u25FB", "&EmptyVerySmallSquare;": "\u25AB", "&Eogon;": "\u0118", "&Eopf;": "\u{1D53C}", "&Epsilon;": "\u0395", "&Equal;": "\u2A75", "&EqualTilde;": "\u2242", "&Equilibrium;": "\u21CC", "&Escr;": "\u2130", "&Esim;": "\u2A73", "&Eta;": "\u0397", "&Euml": "\xCB", "&Euml;": "\xCB", "&Exists;": "\u2203", "&ExponentialE;": "\u2147", "&Fcy;": "\u0424", "&Ffr;": "\u{1D509}", "&FilledSmallSquare;": "\u25FC", "&FilledVerySmallSquare;": "\u25AA", "&Fopf;": "\u{1D53D}", "&ForAll;": "\u2200", "&Fouriertrf;": "\u2131", "&Fscr;": "\u2131", "&GJcy;": "\u0403", "&GT": ">", "&GT;": ">", "&Gamma;": "\u0393", "&Gammad;": "\u03DC", "&Gbreve;": "\u011E", "&Gcedil;": "\u0122", "&Gcirc;": "\u011C", "&Gcy;": "\u0413", "&Gdot;": "\u0120", "&Gfr;": "\u{1D50A}", "&Gg;": "\u22D9", "&Gopf;": "\u{1D53E}", "&GreaterEqual;": "\u2265", "&GreaterEqualLess;": "\u22DB", "&GreaterFullEqual;": "\u2267", "&GreaterGreater;": "\u2AA2", "&GreaterLess;": "\u2277", "&GreaterSlantEqual;": "\u2A7E", "&GreaterTilde;": "\u2273", "&Gscr;": "\u{1D4A2}", "&Gt;": "\u226B", "&HARDcy;": "\u042A", "&Hacek;": "\u02C7", "&Hat;": "^", "&Hcirc;": "\u0124", "&Hfr;": "\u210C", "&HilbertSpace;": "\u210B", "&Hopf;": "\u210D", "&HorizontalLine;": "\u2500", "&Hscr;": "\u210B", "&Hstrok;": "\u0126", "&HumpDownHump;": "\u224E", "&HumpEqual;": "\u224F", "&IEcy;": "\u0415", "&IJlig;": "\u0132", "&IOcy;": "\u0401", "&Iacute": "\xCD", "&Iacute;": "\xCD", "&Icirc": "\xCE", "&Icirc;": "\xCE", "&Icy;": "\u0418", "&Idot;": "\u0130", "&Ifr;": "\u2111", "&Igrave": "\xCC", "&Igrave;": "\xCC", "&Im;": "\u2111", "&Imacr;": "\u012A", "&ImaginaryI;": "\u2148", "&Implies;": "\u21D2", "&Int;": "\u222C", "&Integral;": "\u222B", "&Intersection;": "\u22C2", "&InvisibleComma;": "\u2063", "&InvisibleTimes;": "\u2062", "&Iogon;": "\u012E", "&Iopf;": "\u{1D540}", "&Iota;": "\u0399", "&Iscr;": "\u2110", "&Itilde;": "\u0128", "&Iukcy;": "\u0406", "&Iuml": "\xCF", "&Iuml;": "\xCF", "&Jcirc;": "\u0134", "&Jcy;": "\u0419", "&Jfr;": "\u{1D50D}", "&Jopf;": "\u{1D541}", "&Jscr;": "\u{1D4A5}", "&Jsercy;": "\u0408", "&Jukcy;": "\u0404", "&KHcy;": "\u0425", "&KJcy;": "\u040C", "&Kappa;": "\u039A", "&Kcedil;": "\u0136", "&Kcy;": "\u041A", "&Kfr;": "\u{1D50E}", "&Kopf;": "\u{1D542}", "&Kscr;": "\u{1D4A6}", "&LJcy;": "\u0409", "&LT": "<", "&LT;": "<", "&Lacute;": "\u0139", "&Lambda;": "\u039B", "&Lang;": "\u27EA", "&Laplacetrf;": "\u2112", "&Larr;": "\u219E", "&Lcaron;": "\u013D", "&Lcedil;": "\u013B", "&Lcy;": "\u041B", "&LeftAngleBracket;": "\u27E8", "&LeftArrow;": "\u2190", "&LeftArrowBar;": "\u21E4", "&LeftArrowRightArrow;": "\u21C6", "&LeftCeiling;": "\u2308", "&LeftDoubleBracket;": "\u27E6", "&LeftDownTeeVector;": "\u2961", "&LeftDownVector;": "\u21C3", "&LeftDownVectorBar;": "\u2959", "&LeftFloor;": "\u230A", "&LeftRightArrow;": "\u2194", "&LeftRightVector;": "\u294E", "&LeftTee;": "\u22A3", "&LeftTeeArrow;": "\u21A4", "&LeftTeeVector;": "\u295A", "&LeftTriangle;": "\u22B2", "&LeftTriangleBar;": "\u29CF", "&LeftTriangleEqual;": "\u22B4", "&LeftUpDownVector;": "\u2951", "&LeftUpTeeVector;": "\u2960", "&LeftUpVector;": "\u21BF", "&LeftUpVectorBar;": "\u2958", "&LeftVector;": "\u21BC", "&LeftVectorBar;": "\u2952", "&Leftarrow;": "\u21D0", "&Leftrightarrow;": "\u21D4", "&LessEqualGreater;": "\u22DA", "&LessFullEqual;": "\u2266", "&LessGreater;": "\u2276", "&LessLess;": "\u2AA1", "&LessSlantEqual;": "\u2A7D", "&LessTilde;": "\u2272", "&Lfr;": "\u{1D50F}", "&Ll;": "\u22D8", "&Lleftarrow;": "\u21DA", "&Lmidot;": "\u013F", "&LongLeftArrow;": "\u27F5", "&LongLeftRightArrow;": "\u27F7", "&LongRightArrow;": "\u27F6", "&Longleftarrow;": "\u27F8", "&Longleftrightarrow;": "\u27FA", "&Longrightarrow;": "\u27F9", "&Lopf;": "\u{1D543}", "&LowerLeftArrow;": "\u2199", "&LowerRightArrow;": "\u2198", "&Lscr;": "\u2112", "&Lsh;": "\u21B0", "&Lstrok;": "\u0141", "&Lt;": "\u226A", "&Map;": "\u2905", "&Mcy;": "\u041C", "&MediumSpace;": "\u205F", "&Mellintrf;": "\u2133", "&Mfr;": "\u{1D510}", "&MinusPlus;": "\u2213", "&Mopf;": "\u{1D544}", "&Mscr;": "\u2133", "&Mu;": "\u039C", "&NJcy;": "\u040A", "&Nacute;": "\u0143", "&Ncaron;": "\u0147", "&Ncedil;": "\u0145", "&Ncy;": "\u041D", "&NegativeMediumSpace;": "\u200B", "&NegativeThickSpace;": "\u200B", "&NegativeThinSpace;": "\u200B", "&NegativeVeryThinSpace;": "\u200B", "&NestedGreaterGreater;": "\u226B", "&NestedLessLess;": "\u226A", "&NewLine;": "\n", "&Nfr;": "\u{1D511}", "&NoBreak;": "\u2060", "&NonBreakingSpace;": "\xA0", "&Nopf;": "\u2115", "&Not;": "\u2AEC", "&NotCongruent;": "\u2262", "&NotCupCap;": "\u226D", "&NotDoubleVerticalBar;": "\u2226", "&NotElement;": "\u2209", "&NotEqual;": "\u2260", "&NotEqualTilde;": "\u2242\u0338", "&NotExists;": "\u2204", "&NotGreater;": "\u226F", "&NotGreaterEqual;": "\u2271", "&NotGreaterFullEqual;": "\u2267\u0338", "&NotGreaterGreater;": "\u226B\u0338", "&NotGreaterLess;": "\u2279", "&NotGreaterSlantEqual;": "\u2A7E\u0338", "&NotGreaterTilde;": "\u2275", "&NotHumpDownHump;": "\u224E\u0338", "&NotHumpEqual;": "\u224F\u0338", "&NotLeftTriangle;": "\u22EA", "&NotLeftTriangleBar;": "\u29CF\u0338", "&NotLeftTriangleEqual;": "\u22EC", "&NotLess;": "\u226E", "&NotLessEqual;": "\u2270", "&NotLessGreater;": "\u2278", "&NotLessLess;": "\u226A\u0338", "&NotLessSlantEqual;": "\u2A7D\u0338", "&NotLessTilde;": "\u2274", "&NotNestedGreaterGreater;": "\u2AA2\u0338", "&NotNestedLessLess;": "\u2AA1\u0338", "&NotPrecedes;": "\u2280", "&NotPrecedesEqual;": "\u2AAF\u0338", "&NotPrecedesSlantEqual;": "\u22E0", "&NotReverseElement;": "\u220C", "&NotRightTriangle;": "\u22EB", "&NotRightTriangleBar;": "\u29D0\u0338", "&NotRightTriangleEqual;": "\u22ED", "&NotSquareSubset;": "\u228F\u0338", "&NotSquareSubsetEqual;": "\u22E2", "&NotSquareSuperset;": "\u2290\u0338", "&NotSquareSupersetEqual;": "\u22E3", "&NotSubset;": "\u2282\u20D2", "&NotSubsetEqual;": "\u2288", "&NotSucceeds;": "\u2281", "&NotSucceedsEqual;": "\u2AB0\u0338", "&NotSucceedsSlantEqual;": "\u22E1", "&NotSucceedsTilde;": "\u227F\u0338", "&NotSuperset;": "\u2283\u20D2", "&NotSupersetEqual;": "\u2289", "&NotTilde;": "\u2241", "&NotTildeEqual;": "\u2244", "&NotTildeFullEqual;": "\u2247", "&NotTildeTilde;": "\u2249", "&NotVerticalBar;": "\u2224", "&Nscr;": "\u{1D4A9}", "&Ntilde": "\xD1", "&Ntilde;": "\xD1", "&Nu;": "\u039D", "&OElig;": "\u0152", "&Oacute": "\xD3", "&Oacute;": "\xD3", "&Ocirc": "\xD4", "&Ocirc;": "\xD4", "&Ocy;": "\u041E", "&Odblac;": "\u0150", "&Ofr;": "\u{1D512}", "&Ograve": "\xD2", "&Ograve;": "\xD2", "&Omacr;": "\u014C", "&Omega;": "\u03A9", "&Omicron;": "\u039F", "&Oopf;": "\u{1D546}", "&OpenCurlyDoubleQuote;": "\u201C", "&OpenCurlyQuote;": "\u2018", "&Or;": "\u2A54", "&Oscr;": "\u{1D4AA}", "&Oslash": "\xD8", "&Oslash;": "\xD8", "&Otilde": "\xD5", "&Otilde;": "\xD5", "&Otimes;": "\u2A37", "&Ouml": "\xD6", "&Ouml;": "\xD6", "&OverBar;": "\u203E", "&OverBrace;": "\u23DE", "&OverBracket;": "\u23B4", "&OverParenthesis;": "\u23DC", "&PartialD;": "\u2202", "&Pcy;": "\u041F", "&Pfr;": "\u{1D513}", "&Phi;": "\u03A6", "&Pi;": "\u03A0", "&PlusMinus;": "\xB1", "&Poincareplane;": "\u210C", "&Popf;": "\u2119", "&Pr;": "\u2ABB", "&Precedes;": "\u227A", "&PrecedesEqual;": "\u2AAF", "&PrecedesSlantEqual;": "\u227C", "&PrecedesTilde;": "\u227E", "&Prime;": "\u2033", "&Product;": "\u220F", "&Proportion;": "\u2237", "&Proportional;": "\u221D", "&Pscr;": "\u{1D4AB}", "&Psi;": "\u03A8", "&QUOT": '"', "&QUOT;": '"', "&Qfr;": "\u{1D514}", "&Qopf;": "\u211A", "&Qscr;": "\u{1D4AC}", "&RBarr;": "\u2910", "&REG": "\xAE", "&REG;": "\xAE", "&Racute;": "\u0154", "&Rang;": "\u27EB", "&Rarr;": "\u21A0", "&Rarrtl;": "\u2916", "&Rcaron;": "\u0158", "&Rcedil;": "\u0156", "&Rcy;": "\u0420", "&Re;": "\u211C", "&ReverseElement;": "\u220B", "&ReverseEquilibrium;": "\u21CB", "&ReverseUpEquilibrium;": "\u296F", "&Rfr;": "\u211C", "&Rho;": "\u03A1", "&RightAngleBracket;": "\u27E9", "&RightArrow;": "\u2192", "&RightArrowBar;": "\u21E5", "&RightArrowLeftArrow;": "\u21C4", "&RightCeiling;": "\u2309", "&RightDoubleBracket;": "\u27E7", "&RightDownTeeVector;": "\u295D", "&RightDownVector;": "\u21C2", "&RightDownVectorBar;": "\u2955", "&RightFloor;": "\u230B", "&RightTee;": "\u22A2", "&RightTeeArrow;": "\u21A6", "&RightTeeVector;": "\u295B", "&RightTriangle;": "\u22B3", "&RightTriangleBar;": "\u29D0", "&RightTriangleEqual;": "\u22B5", "&RightUpDownVector;": "\u294F", "&RightUpTeeVector;": "\u295C", "&RightUpVector;": "\u21BE", "&RightUpVectorBar;": "\u2954", "&RightVector;": "\u21C0", "&RightVectorBar;": "\u2953", "&Rightarrow;": "\u21D2", "&Ropf;": "\u211D", "&RoundImplies;": "\u2970", "&Rrightarrow;": "\u21DB", "&Rscr;": "\u211B", "&Rsh;": "\u21B1", "&RuleDelayed;": "\u29F4", "&SHCHcy;": "\u0429", "&SHcy;": "\u0428", "&SOFTcy;": "\u042C", "&Sacute;": "\u015A", "&Sc;": "\u2ABC", "&Scaron;": "\u0160", "&Scedil;": "\u015E", "&Scirc;": "\u015C", "&Scy;": "\u0421", "&Sfr;": "\u{1D516}", "&ShortDownArrow;": "\u2193", "&ShortLeftArrow;": "\u2190", "&ShortRightArrow;": "\u2192", "&ShortUpArrow;": "\u2191", "&Sigma;": "\u03A3", "&SmallCircle;": "\u2218", "&Sopf;": "\u{1D54A}", "&Sqrt;": "\u221A", "&Square;": "\u25A1", "&SquareIntersection;": "\u2293", "&SquareSubset;": "\u228F", "&SquareSubsetEqual;": "\u2291", "&SquareSuperset;": "\u2290", "&SquareSupersetEqual;": "\u2292", "&SquareUnion;": "\u2294", "&Sscr;": "\u{1D4AE}", "&Star;": "\u22C6", "&Sub;": "\u22D0", "&Subset;": "\u22D0", "&SubsetEqual;": "\u2286", "&Succeeds;": "\u227B", "&SucceedsEqual;": "\u2AB0", "&SucceedsSlantEqual;": "\u227D", "&SucceedsTilde;": "\u227F", "&SuchThat;": "\u220B", "&Sum;": "\u2211", "&Sup;": "\u22D1", "&Superset;": "\u2283", "&SupersetEqual;": "\u2287", "&Supset;": "\u22D1", "&THORN": "\xDE", "&THORN;": "\xDE", "&TRADE;": "\u2122", "&TSHcy;": "\u040B", "&TScy;": "\u0426", "&Tab;": "	", "&Tau;": "\u03A4", "&Tcaron;": "\u0164", "&Tcedil;": "\u0162", "&Tcy;": "\u0422", "&Tfr;": "\u{1D517}", "&Therefore;": "\u2234", "&Theta;": "\u0398", "&ThickSpace;": "\u205F\u200A", "&ThinSpace;": "\u2009", "&Tilde;": "\u223C", "&TildeEqual;": "\u2243", "&TildeFullEqual;": "\u2245", "&TildeTilde;": "\u2248", "&Topf;": "\u{1D54B}", "&TripleDot;": "\u20DB", "&Tscr;": "\u{1D4AF}", "&Tstrok;": "\u0166", "&Uacute": "\xDA", "&Uacute;": "\xDA", "&Uarr;": "\u219F", "&Uarrocir;": "\u2949", "&Ubrcy;": "\u040E", "&Ubreve;": "\u016C", "&Ucirc": "\xDB", "&Ucirc;": "\xDB", "&Ucy;": "\u0423", "&Udblac;": "\u0170", "&Ufr;": "\u{1D518}", "&Ugrave": "\xD9", "&Ugrave;": "\xD9", "&Umacr;": "\u016A", "&UnderBar;": "_", "&UnderBrace;": "\u23DF", "&UnderBracket;": "\u23B5", "&UnderParenthesis;": "\u23DD", "&Union;": "\u22C3", "&UnionPlus;": "\u228E", "&Uogon;": "\u0172", "&Uopf;": "\u{1D54C}", "&UpArrow;": "\u2191", "&UpArrowBar;": "\u2912", "&UpArrowDownArrow;": "\u21C5", "&UpDownArrow;": "\u2195", "&UpEquilibrium;": "\u296E", "&UpTee;": "\u22A5", "&UpTeeArrow;": "\u21A5", "&Uparrow;": "\u21D1", "&Updownarrow;": "\u21D5", "&UpperLeftArrow;": "\u2196", "&UpperRightArrow;": "\u2197", "&Upsi;": "\u03D2", "&Upsilon;": "\u03A5", "&Uring;": "\u016E", "&Uscr;": "\u{1D4B0}", "&Utilde;": "\u0168", "&Uuml": "\xDC", "&Uuml;": "\xDC", "&VDash;": "\u22AB", "&Vbar;": "\u2AEB", "&Vcy;": "\u0412", "&Vdash;": "\u22A9", "&Vdashl;": "\u2AE6", "&Vee;": "\u22C1", "&Verbar;": "\u2016", "&Vert;": "\u2016", "&VerticalBar;": "\u2223", "&VerticalLine;": "|", "&VerticalSeparator;": "\u2758", "&VerticalTilde;": "\u2240", "&VeryThinSpace;": "\u200A", "&Vfr;": "\u{1D519}", "&Vopf;": "\u{1D54D}", "&Vscr;": "\u{1D4B1}", "&Vvdash;": "\u22AA", "&Wcirc;": "\u0174", "&Wedge;": "\u22C0", "&Wfr;": "\u{1D51A}", "&Wopf;": "\u{1D54E}", "&Wscr;": "\u{1D4B2}", "&Xfr;": "\u{1D51B}", "&Xi;": "\u039E", "&Xopf;": "\u{1D54F}", "&Xscr;": "\u{1D4B3}", "&YAcy;": "\u042F", "&YIcy;": "\u0407", "&YUcy;": "\u042E", "&Yacute": "\xDD", "&Yacute;": "\xDD", "&Ycirc;": "\u0176", "&Ycy;": "\u042B", "&Yfr;": "\u{1D51C}", "&Yopf;": "\u{1D550}", "&Yscr;": "\u{1D4B4}", "&Yuml;": "\u0178", "&ZHcy;": "\u0416", "&Zacute;": "\u0179", "&Zcaron;": "\u017D", "&Zcy;": "\u0417", "&Zdot;": "\u017B", "&ZeroWidthSpace;": "\u200B", "&Zeta;": "\u0396", "&Zfr;": "\u2128", "&Zopf;": "\u2124", "&Zscr;": "\u{1D4B5}", "&aacute": "\xE1", "&aacute;": "\xE1", "&abreve;": "\u0103", "&ac;": "\u223E", "&acE;": "\u223E\u0333", "&acd;": "\u223F", "&acirc": "\xE2", "&acirc;": "\xE2", "&acute": "\xB4", "&acute;": "\xB4", "&acy;": "\u0430", "&aelig": "\xE6", "&aelig;": "\xE6", "&af;": "\u2061", "&afr;": "\u{1D51E}", "&agrave": "\xE0", "&agrave;": "\xE0", "&alefsym;": "\u2135", "&aleph;": "\u2135", "&alpha;": "\u03B1", "&amacr;": "\u0101", "&amalg;": "\u2A3F", "&amp": "&", "&amp;": "&", "&and;": "\u2227", "&andand;": "\u2A55", "&andd;": "\u2A5C", "&andslope;": "\u2A58", "&andv;": "\u2A5A", "&ang;": "\u2220", "&ange;": "\u29A4", "&angle;": "\u2220", "&angmsd;": "\u2221", "&angmsdaa;": "\u29A8", "&angmsdab;": "\u29A9", "&angmsdac;": "\u29AA", "&angmsdad;": "\u29AB", "&angmsdae;": "\u29AC", "&angmsdaf;": "\u29AD", "&angmsdag;": "\u29AE", "&angmsdah;": "\u29AF", "&angrt;": "\u221F", "&angrtvb;": "\u22BE", "&angrtvbd;": "\u299D", "&angsph;": "\u2222", "&angst;": "\xC5", "&angzarr;": "\u237C", "&aogon;": "\u0105", "&aopf;": "\u{1D552}", "&ap;": "\u2248", "&apE;": "\u2A70", "&apacir;": "\u2A6F", "&ape;": "\u224A", "&apid;": "\u224B", "&apos;": "'", "&approx;": "\u2248", "&approxeq;": "\u224A", "&aring": "\xE5", "&aring;": "\xE5", "&ascr;": "\u{1D4B6}", "&ast;": "*", "&asymp;": "\u2248", "&asympeq;": "\u224D", "&atilde": "\xE3", "&atilde;": "\xE3", "&auml": "\xE4", "&auml;": "\xE4", "&awconint;": "\u2233", "&awint;": "\u2A11", "&bNot;": "\u2AED", "&backcong;": "\u224C", "&backepsilon;": "\u03F6", "&backprime;": "\u2035", "&backsim;": "\u223D", "&backsimeq;": "\u22CD", "&barvee;": "\u22BD", "&barwed;": "\u2305", "&barwedge;": "\u2305", "&bbrk;": "\u23B5", "&bbrktbrk;": "\u23B6", "&bcong;": "\u224C", "&bcy;": "\u0431", "&bdquo;": "\u201E", "&becaus;": "\u2235", "&because;": "\u2235", "&bemptyv;": "\u29B0", "&bepsi;": "\u03F6", "&bernou;": "\u212C", "&beta;": "\u03B2", "&beth;": "\u2136", "&between;": "\u226C", "&bfr;": "\u{1D51F}", "&bigcap;": "\u22C2", "&bigcirc;": "\u25EF", "&bigcup;": "\u22C3", "&bigodot;": "\u2A00", "&bigoplus;": "\u2A01", "&bigotimes;": "\u2A02", "&bigsqcup;": "\u2A06", "&bigstar;": "\u2605", "&bigtriangledown;": "\u25BD", "&bigtriangleup;": "\u25B3", "&biguplus;": "\u2A04", "&bigvee;": "\u22C1", "&bigwedge;": "\u22C0", "&bkarow;": "\u290D", "&blacklozenge;": "\u29EB", "&blacksquare;": "\u25AA", "&blacktriangle;": "\u25B4", "&blacktriangledown;": "\u25BE", "&blacktriangleleft;": "\u25C2", "&blacktriangleright;": "\u25B8", "&blank;": "\u2423", "&blk12;": "\u2592", "&blk14;": "\u2591", "&blk34;": "\u2593", "&block;": "\u2588", "&bne;": "=\u20E5", "&bnequiv;": "\u2261\u20E5", "&bnot;": "\u2310", "&bopf;": "\u{1D553}", "&bot;": "\u22A5", "&bottom;": "\u22A5", "&bowtie;": "\u22C8", "&boxDL;": "\u2557", "&boxDR;": "\u2554", "&boxDl;": "\u2556", "&boxDr;": "\u2553", "&boxH;": "\u2550", "&boxHD;": "\u2566", "&boxHU;": "\u2569", "&boxHd;": "\u2564", "&boxHu;": "\u2567", "&boxUL;": "\u255D", "&boxUR;": "\u255A", "&boxUl;": "\u255C", "&boxUr;": "\u2559", "&boxV;": "\u2551", "&boxVH;": "\u256C", "&boxVL;": "\u2563", "&boxVR;": "\u2560", "&boxVh;": "\u256B", "&boxVl;": "\u2562", "&boxVr;": "\u255F", "&boxbox;": "\u29C9", "&boxdL;": "\u2555", "&boxdR;": "\u2552", "&boxdl;": "\u2510", "&boxdr;": "\u250C", "&boxh;": "\u2500", "&boxhD;": "\u2565", "&boxhU;": "\u2568", "&boxhd;": "\u252C", "&boxhu;": "\u2534", "&boxminus;": "\u229F", "&boxplus;": "\u229E", "&boxtimes;": "\u22A0", "&boxuL;": "\u255B", "&boxuR;": "\u2558", "&boxul;": "\u2518", "&boxur;": "\u2514", "&boxv;": "\u2502", "&boxvH;": "\u256A", "&boxvL;": "\u2561", "&boxvR;": "\u255E", "&boxvh;": "\u253C", "&boxvl;": "\u2524", "&boxvr;": "\u251C", "&bprime;": "\u2035", "&breve;": "\u02D8", "&brvbar": "\xA6", "&brvbar;": "\xA6", "&bscr;": "\u{1D4B7}", "&bsemi;": "\u204F", "&bsim;": "\u223D", "&bsime;": "\u22CD", "&bsol;": "\\", "&bsolb;": "\u29C5", "&bsolhsub;": "\u27C8", "&bull;": "\u2022", "&bullet;": "\u2022", "&bump;": "\u224E", "&bumpE;": "\u2AAE", "&bumpe;": "\u224F", "&bumpeq;": "\u224F", "&cacute;": "\u0107", "&cap;": "\u2229", "&capand;": "\u2A44", "&capbrcup;": "\u2A49", "&capcap;": "\u2A4B", "&capcup;": "\u2A47", "&capdot;": "\u2A40", "&caps;": "\u2229\uFE00", "&caret;": "\u2041", "&caron;": "\u02C7", "&ccaps;": "\u2A4D", "&ccaron;": "\u010D", "&ccedil": "\xE7", "&ccedil;": "\xE7", "&ccirc;": "\u0109", "&ccups;": "\u2A4C", "&ccupssm;": "\u2A50", "&cdot;": "\u010B", "&cedil": "\xB8", "&cedil;": "\xB8", "&cemptyv;": "\u29B2", "&cent": "\xA2", "&cent;": "\xA2", "&centerdot;": "\xB7", "&cfr;": "\u{1D520}", "&chcy;": "\u0447", "&check;": "\u2713", "&checkmark;": "\u2713", "&chi;": "\u03C7", "&cir;": "\u25CB", "&cirE;": "\u29C3", "&circ;": "\u02C6", "&circeq;": "\u2257", "&circlearrowleft;": "\u21BA", "&circlearrowright;": "\u21BB", "&circledR;": "\xAE", "&circledS;": "\u24C8", "&circledast;": "\u229B", "&circledcirc;": "\u229A", "&circleddash;": "\u229D", "&cire;": "\u2257", "&cirfnint;": "\u2A10", "&cirmid;": "\u2AEF", "&cirscir;": "\u29C2", "&clubs;": "\u2663", "&clubsuit;": "\u2663", "&colon;": ":", "&colone;": "\u2254", "&coloneq;": "\u2254", "&comma;": ",", "&commat;": "@", "&comp;": "\u2201", "&compfn;": "\u2218", "&complement;": "\u2201", "&complexes;": "\u2102", "&cong;": "\u2245", "&congdot;": "\u2A6D", "&conint;": "\u222E", "&copf;": "\u{1D554}", "&coprod;": "\u2210", "&copy": "\xA9", "&copy;": "\xA9", "&copysr;": "\u2117", "&crarr;": "\u21B5", "&cross;": "\u2717", "&cscr;": "\u{1D4B8}", "&csub;": "\u2ACF", "&csube;": "\u2AD1", "&csup;": "\u2AD0", "&csupe;": "\u2AD2", "&ctdot;": "\u22EF", "&cudarrl;": "\u2938", "&cudarrr;": "\u2935", "&cuepr;": "\u22DE", "&cuesc;": "\u22DF", "&cularr;": "\u21B6", "&cularrp;": "\u293D", "&cup;": "\u222A", "&cupbrcap;": "\u2A48", "&cupcap;": "\u2A46", "&cupcup;": "\u2A4A", "&cupdot;": "\u228D", "&cupor;": "\u2A45", "&cups;": "\u222A\uFE00", "&curarr;": "\u21B7", "&curarrm;": "\u293C", "&curlyeqprec;": "\u22DE", "&curlyeqsucc;": "\u22DF", "&curlyvee;": "\u22CE", "&curlywedge;": "\u22CF", "&curren": "\xA4", "&curren;": "\xA4", "&curvearrowleft;": "\u21B6", "&curvearrowright;": "\u21B7", "&cuvee;": "\u22CE", "&cuwed;": "\u22CF", "&cwconint;": "\u2232", "&cwint;": "\u2231", "&cylcty;": "\u232D", "&dArr;": "\u21D3", "&dHar;": "\u2965", "&dagger;": "\u2020", "&daleth;": "\u2138", "&darr;": "\u2193", "&dash;": "\u2010", "&dashv;": "\u22A3", "&dbkarow;": "\u290F", "&dblac;": "\u02DD", "&dcaron;": "\u010F", "&dcy;": "\u0434", "&dd;": "\u2146", "&ddagger;": "\u2021", "&ddarr;": "\u21CA", "&ddotseq;": "\u2A77", "&deg": "\xB0", "&deg;": "\xB0", "&delta;": "\u03B4", "&demptyv;": "\u29B1", "&dfisht;": "\u297F", "&dfr;": "\u{1D521}", "&dharl;": "\u21C3", "&dharr;": "\u21C2", "&diam;": "\u22C4", "&diamond;": "\u22C4", "&diamondsuit;": "\u2666", "&diams;": "\u2666", "&die;": "\xA8", "&digamma;": "\u03DD", "&disin;": "\u22F2", "&div;": "\xF7", "&divide": "\xF7", "&divide;": "\xF7", "&divideontimes;": "\u22C7", "&divonx;": "\u22C7", "&djcy;": "\u0452", "&dlcorn;": "\u231E", "&dlcrop;": "\u230D", "&dollar;": "$", "&dopf;": "\u{1D555}", "&dot;": "\u02D9", "&doteq;": "\u2250", "&doteqdot;": "\u2251", "&dotminus;": "\u2238", "&dotplus;": "\u2214", "&dotsquare;": "\u22A1", "&doublebarwedge;": "\u2306", "&downarrow;": "\u2193", "&downdownarrows;": "\u21CA", "&downharpoonleft;": "\u21C3", "&downharpoonright;": "\u21C2", "&drbkarow;": "\u2910", "&drcorn;": "\u231F", "&drcrop;": "\u230C", "&dscr;": "\u{1D4B9}", "&dscy;": "\u0455", "&dsol;": "\u29F6", "&dstrok;": "\u0111", "&dtdot;": "\u22F1", "&dtri;": "\u25BF", "&dtrif;": "\u25BE", "&duarr;": "\u21F5", "&duhar;": "\u296F", "&dwangle;": "\u29A6", "&dzcy;": "\u045F", "&dzigrarr;": "\u27FF", "&eDDot;": "\u2A77", "&eDot;": "\u2251", "&eacute": "\xE9", "&eacute;": "\xE9", "&easter;": "\u2A6E", "&ecaron;": "\u011B", "&ecir;": "\u2256", "&ecirc": "\xEA", "&ecirc;": "\xEA", "&ecolon;": "\u2255", "&ecy;": "\u044D", "&edot;": "\u0117", "&ee;": "\u2147", "&efDot;": "\u2252", "&efr;": "\u{1D522}", "&eg;": "\u2A9A", "&egrave": "\xE8", "&egrave;": "\xE8", "&egs;": "\u2A96", "&egsdot;": "\u2A98", "&el;": "\u2A99", "&elinters;": "\u23E7", "&ell;": "\u2113", "&els;": "\u2A95", "&elsdot;": "\u2A97", "&emacr;": "\u0113", "&empty;": "\u2205", "&emptyset;": "\u2205", "&emptyv;": "\u2205", "&emsp13;": "\u2004", "&emsp14;": "\u2005", "&emsp;": "\u2003", "&eng;": "\u014B", "&ensp;": "\u2002", "&eogon;": "\u0119", "&eopf;": "\u{1D556}", "&epar;": "\u22D5", "&eparsl;": "\u29E3", "&eplus;": "\u2A71", "&epsi;": "\u03B5", "&epsilon;": "\u03B5", "&epsiv;": "\u03F5", "&eqcirc;": "\u2256", "&eqcolon;": "\u2255", "&eqsim;": "\u2242", "&eqslantgtr;": "\u2A96", "&eqslantless;": "\u2A95", "&equals;": "=", "&equest;": "\u225F", "&equiv;": "\u2261", "&equivDD;": "\u2A78", "&eqvparsl;": "\u29E5", "&erDot;": "\u2253", "&erarr;": "\u2971", "&escr;": "\u212F", "&esdot;": "\u2250", "&esim;": "\u2242", "&eta;": "\u03B7", "&eth": "\xF0", "&eth;": "\xF0", "&euml": "\xEB", "&euml;": "\xEB", "&euro;": "\u20AC", "&excl;": "!", "&exist;": "\u2203", "&expectation;": "\u2130", "&exponentiale;": "\u2147", "&fallingdotseq;": "\u2252", "&fcy;": "\u0444", "&female;": "\u2640", "&ffilig;": "\uFB03", "&fflig;": "\uFB00", "&ffllig;": "\uFB04", "&ffr;": "\u{1D523}", "&filig;": "\uFB01", "&fjlig;": "fj", "&flat;": "\u266D", "&fllig;": "\uFB02", "&fltns;": "\u25B1", "&fnof;": "\u0192", "&fopf;": "\u{1D557}", "&forall;": "\u2200", "&fork;": "\u22D4", "&forkv;": "\u2AD9", "&fpartint;": "\u2A0D", "&frac12": "\xBD", "&frac12;": "\xBD", "&frac13;": "\u2153", "&frac14": "\xBC", "&frac14;": "\xBC", "&frac15;": "\u2155", "&frac16;": "\u2159", "&frac18;": "\u215B", "&frac23;": "\u2154", "&frac25;": "\u2156", "&frac34": "\xBE", "&frac34;": "\xBE", "&frac35;": "\u2157", "&frac38;": "\u215C", "&frac45;": "\u2158", "&frac56;": "\u215A", "&frac58;": "\u215D", "&frac78;": "\u215E", "&frasl;": "\u2044", "&frown;": "\u2322", "&fscr;": "\u{1D4BB}", "&gE;": "\u2267", "&gEl;": "\u2A8C", "&gacute;": "\u01F5", "&gamma;": "\u03B3", "&gammad;": "\u03DD", "&gap;": "\u2A86", "&gbreve;": "\u011F", "&gcirc;": "\u011D", "&gcy;": "\u0433", "&gdot;": "\u0121", "&ge;": "\u2265", "&gel;": "\u22DB", "&geq;": "\u2265", "&geqq;": "\u2267", "&geqslant;": "\u2A7E", "&ges;": "\u2A7E", "&gescc;": "\u2AA9", "&gesdot;": "\u2A80", "&gesdoto;": "\u2A82", "&gesdotol;": "\u2A84", "&gesl;": "\u22DB\uFE00", "&gesles;": "\u2A94", "&gfr;": "\u{1D524}", "&gg;": "\u226B", "&ggg;": "\u22D9", "&gimel;": "\u2137", "&gjcy;": "\u0453", "&gl;": "\u2277", "&glE;": "\u2A92", "&gla;": "\u2AA5", "&glj;": "\u2AA4", "&gnE;": "\u2269", "&gnap;": "\u2A8A", "&gnapprox;": "\u2A8A", "&gne;": "\u2A88", "&gneq;": "\u2A88", "&gneqq;": "\u2269", "&gnsim;": "\u22E7", "&gopf;": "\u{1D558}", "&grave;": "`", "&gscr;": "\u210A", "&gsim;": "\u2273", "&gsime;": "\u2A8E", "&gsiml;": "\u2A90", "&gt": ">", "&gt;": ">", "&gtcc;": "\u2AA7", "&gtcir;": "\u2A7A", "&gtdot;": "\u22D7", "&gtlPar;": "\u2995", "&gtquest;": "\u2A7C", "&gtrapprox;": "\u2A86", "&gtrarr;": "\u2978", "&gtrdot;": "\u22D7", "&gtreqless;": "\u22DB", "&gtreqqless;": "\u2A8C", "&gtrless;": "\u2277", "&gtrsim;": "\u2273", "&gvertneqq;": "\u2269\uFE00", "&gvnE;": "\u2269\uFE00", "&hArr;": "\u21D4", "&hairsp;": "\u200A", "&half;": "\xBD", "&hamilt;": "\u210B", "&hardcy;": "\u044A", "&harr;": "\u2194", "&harrcir;": "\u2948", "&harrw;": "\u21AD", "&hbar;": "\u210F", "&hcirc;": "\u0125", "&hearts;": "\u2665", "&heartsuit;": "\u2665", "&hellip;": "\u2026", "&hercon;": "\u22B9", "&hfr;": "\u{1D525}", "&hksearow;": "\u2925", "&hkswarow;": "\u2926", "&hoarr;": "\u21FF", "&homtht;": "\u223B", "&hookleftarrow;": "\u21A9", "&hookrightarrow;": "\u21AA", "&hopf;": "\u{1D559}", "&horbar;": "\u2015", "&hscr;": "\u{1D4BD}", "&hslash;": "\u210F", "&hstrok;": "\u0127", "&hybull;": "\u2043", "&hyphen;": "\u2010", "&iacute": "\xED", "&iacute;": "\xED", "&ic;": "\u2063", "&icirc": "\xEE", "&icirc;": "\xEE", "&icy;": "\u0438", "&iecy;": "\u0435", "&iexcl": "\xA1", "&iexcl;": "\xA1", "&iff;": "\u21D4", "&ifr;": "\u{1D526}", "&igrave": "\xEC", "&igrave;": "\xEC", "&ii;": "\u2148", "&iiiint;": "\u2A0C", "&iiint;": "\u222D", "&iinfin;": "\u29DC", "&iiota;": "\u2129", "&ijlig;": "\u0133", "&imacr;": "\u012B", "&image;": "\u2111", "&imagline;": "\u2110", "&imagpart;": "\u2111", "&imath;": "\u0131", "&imof;": "\u22B7", "&imped;": "\u01B5", "&in;": "\u2208", "&incare;": "\u2105", "&infin;": "\u221E", "&infintie;": "\u29DD", "&inodot;": "\u0131", "&int;": "\u222B", "&intcal;": "\u22BA", "&integers;": "\u2124", "&intercal;": "\u22BA", "&intlarhk;": "\u2A17", "&intprod;": "\u2A3C", "&iocy;": "\u0451", "&iogon;": "\u012F", "&iopf;": "\u{1D55A}", "&iota;": "\u03B9", "&iprod;": "\u2A3C", "&iquest": "\xBF", "&iquest;": "\xBF", "&iscr;": "\u{1D4BE}", "&isin;": "\u2208", "&isinE;": "\u22F9", "&isindot;": "\u22F5", "&isins;": "\u22F4", "&isinsv;": "\u22F3", "&isinv;": "\u2208", "&it;": "\u2062", "&itilde;": "\u0129", "&iukcy;": "\u0456", "&iuml": "\xEF", "&iuml;": "\xEF", "&jcirc;": "\u0135", "&jcy;": "\u0439", "&jfr;": "\u{1D527}", "&jmath;": "\u0237", "&jopf;": "\u{1D55B}", "&jscr;": "\u{1D4BF}", "&jsercy;": "\u0458", "&jukcy;": "\u0454", "&kappa;": "\u03BA", "&kappav;": "\u03F0", "&kcedil;": "\u0137", "&kcy;": "\u043A", "&kfr;": "\u{1D528}", "&kgreen;": "\u0138", "&khcy;": "\u0445", "&kjcy;": "\u045C", "&kopf;": "\u{1D55C}", "&kscr;": "\u{1D4C0}", "&lAarr;": "\u21DA", "&lArr;": "\u21D0", "&lAtail;": "\u291B", "&lBarr;": "\u290E", "&lE;": "\u2266", "&lEg;": "\u2A8B", "&lHar;": "\u2962", "&lacute;": "\u013A", "&laemptyv;": "\u29B4", "&lagran;": "\u2112", "&lambda;": "\u03BB", "&lang;": "\u27E8", "&langd;": "\u2991", "&langle;": "\u27E8", "&lap;": "\u2A85", "&laquo": "\xAB", "&laquo;": "\xAB", "&larr;": "\u2190", "&larrb;": "\u21E4", "&larrbfs;": "\u291F", "&larrfs;": "\u291D", "&larrhk;": "\u21A9", "&larrlp;": "\u21AB", "&larrpl;": "\u2939", "&larrsim;": "\u2973", "&larrtl;": "\u21A2", "&lat;": "\u2AAB", "&latail;": "\u2919", "&late;": "\u2AAD", "&lates;": "\u2AAD\uFE00", "&lbarr;": "\u290C", "&lbbrk;": "\u2772", "&lbrace;": "{", "&lbrack;": "[", "&lbrke;": "\u298B", "&lbrksld;": "\u298F", "&lbrkslu;": "\u298D", "&lcaron;": "\u013E", "&lcedil;": "\u013C", "&lceil;": "\u2308", "&lcub;": "{", "&lcy;": "\u043B", "&ldca;": "\u2936", "&ldquo;": "\u201C", "&ldquor;": "\u201E", "&ldrdhar;": "\u2967", "&ldrushar;": "\u294B", "&ldsh;": "\u21B2", "&le;": "\u2264", "&leftarrow;": "\u2190", "&leftarrowtail;": "\u21A2", "&leftharpoondown;": "\u21BD", "&leftharpoonup;": "\u21BC", "&leftleftarrows;": "\u21C7", "&leftrightarrow;": "\u2194", "&leftrightarrows;": "\u21C6", "&leftrightharpoons;": "\u21CB", "&leftrightsquigarrow;": "\u21AD", "&leftthreetimes;": "\u22CB", "&leg;": "\u22DA", "&leq;": "\u2264", "&leqq;": "\u2266", "&leqslant;": "\u2A7D", "&les;": "\u2A7D", "&lescc;": "\u2AA8", "&lesdot;": "\u2A7F", "&lesdoto;": "\u2A81", "&lesdotor;": "\u2A83", "&lesg;": "\u22DA\uFE00", "&lesges;": "\u2A93", "&lessapprox;": "\u2A85", "&lessdot;": "\u22D6", "&lesseqgtr;": "\u22DA", "&lesseqqgtr;": "\u2A8B", "&lessgtr;": "\u2276", "&lesssim;": "\u2272", "&lfisht;": "\u297C", "&lfloor;": "\u230A", "&lfr;": "\u{1D529}", "&lg;": "\u2276", "&lgE;": "\u2A91", "&lhard;": "\u21BD", "&lharu;": "\u21BC", "&lharul;": "\u296A", "&lhblk;": "\u2584", "&ljcy;": "\u0459", "&ll;": "\u226A", "&llarr;": "\u21C7", "&llcorner;": "\u231E", "&llhard;": "\u296B", "&lltri;": "\u25FA", "&lmidot;": "\u0140", "&lmoust;": "\u23B0", "&lmoustache;": "\u23B0", "&lnE;": "\u2268", "&lnap;": "\u2A89", "&lnapprox;": "\u2A89", "&lne;": "\u2A87", "&lneq;": "\u2A87", "&lneqq;": "\u2268", "&lnsim;": "\u22E6", "&loang;": "\u27EC", "&loarr;": "\u21FD", "&lobrk;": "\u27E6", "&longleftarrow;": "\u27F5", "&longleftrightarrow;": "\u27F7", "&longmapsto;": "\u27FC", "&longrightarrow;": "\u27F6", "&looparrowleft;": "\u21AB", "&looparrowright;": "\u21AC", "&lopar;": "\u2985", "&lopf;": "\u{1D55D}", "&loplus;": "\u2A2D", "&lotimes;": "\u2A34", "&lowast;": "\u2217", "&lowbar;": "_", "&loz;": "\u25CA", "&lozenge;": "\u25CA", "&lozf;": "\u29EB", "&lpar;": "(", "&lparlt;": "\u2993", "&lrarr;": "\u21C6", "&lrcorner;": "\u231F", "&lrhar;": "\u21CB", "&lrhard;": "\u296D", "&lrm;": "\u200E", "&lrtri;": "\u22BF", "&lsaquo;": "\u2039", "&lscr;": "\u{1D4C1}", "&lsh;": "\u21B0", "&lsim;": "\u2272", "&lsime;": "\u2A8D", "&lsimg;": "\u2A8F", "&lsqb;": "[", "&lsquo;": "\u2018", "&lsquor;": "\u201A", "&lstrok;": "\u0142", "&lt": "<", "&lt;": "<", "&ltcc;": "\u2AA6", "&ltcir;": "\u2A79", "&ltdot;": "\u22D6", "&lthree;": "\u22CB", "&ltimes;": "\u22C9", "&ltlarr;": "\u2976", "&ltquest;": "\u2A7B", "&ltrPar;": "\u2996", "&ltri;": "\u25C3", "&ltrie;": "\u22B4", "&ltrif;": "\u25C2", "&lurdshar;": "\u294A", "&luruhar;": "\u2966", "&lvertneqq;": "\u2268\uFE00", "&lvnE;": "\u2268\uFE00", "&mDDot;": "\u223A", "&macr": "\xAF", "&macr;": "\xAF", "&male;": "\u2642", "&malt;": "\u2720", "&maltese;": "\u2720", "&map;": "\u21A6", "&mapsto;": "\u21A6", "&mapstodown;": "\u21A7", "&mapstoleft;": "\u21A4", "&mapstoup;": "\u21A5", "&marker;": "\u25AE", "&mcomma;": "\u2A29", "&mcy;": "\u043C", "&mdash;": "\u2014", "&measuredangle;": "\u2221", "&mfr;": "\u{1D52A}", "&mho;": "\u2127", "&micro": "\xB5", "&micro;": "\xB5", "&mid;": "\u2223", "&midast;": "*", "&midcir;": "\u2AF0", "&middot": "\xB7", "&middot;": "\xB7", "&minus;": "\u2212", "&minusb;": "\u229F", "&minusd;": "\u2238", "&minusdu;": "\u2A2A", "&mlcp;": "\u2ADB", "&mldr;": "\u2026", "&mnplus;": "\u2213", "&models;": "\u22A7", "&mopf;": "\u{1D55E}", "&mp;": "\u2213", "&mscr;": "\u{1D4C2}", "&mstpos;": "\u223E", "&mu;": "\u03BC", "&multimap;": "\u22B8", "&mumap;": "\u22B8", "&nGg;": "\u22D9\u0338", "&nGt;": "\u226B\u20D2", "&nGtv;": "\u226B\u0338", "&nLeftarrow;": "\u21CD", "&nLeftrightarrow;": "\u21CE", "&nLl;": "\u22D8\u0338", "&nLt;": "\u226A\u20D2", "&nLtv;": "\u226A\u0338", "&nRightarrow;": "\u21CF", "&nVDash;": "\u22AF", "&nVdash;": "\u22AE", "&nabla;": "\u2207", "&nacute;": "\u0144", "&nang;": "\u2220\u20D2", "&nap;": "\u2249", "&napE;": "\u2A70\u0338", "&napid;": "\u224B\u0338", "&napos;": "\u0149", "&napprox;": "\u2249", "&natur;": "\u266E", "&natural;": "\u266E", "&naturals;": "\u2115", "&nbsp": "\xA0", "&nbsp;": "\xA0", "&nbump;": "\u224E\u0338", "&nbumpe;": "\u224F\u0338", "&ncap;": "\u2A43", "&ncaron;": "\u0148", "&ncedil;": "\u0146", "&ncong;": "\u2247", "&ncongdot;": "\u2A6D\u0338", "&ncup;": "\u2A42", "&ncy;": "\u043D", "&ndash;": "\u2013", "&ne;": "\u2260", "&neArr;": "\u21D7", "&nearhk;": "\u2924", "&nearr;": "\u2197", "&nearrow;": "\u2197", "&nedot;": "\u2250\u0338", "&nequiv;": "\u2262", "&nesear;": "\u2928", "&nesim;": "\u2242\u0338", "&nexist;": "\u2204", "&nexists;": "\u2204", "&nfr;": "\u{1D52B}", "&ngE;": "\u2267\u0338", "&nge;": "\u2271", "&ngeq;": "\u2271", "&ngeqq;": "\u2267\u0338", "&ngeqslant;": "\u2A7E\u0338", "&nges;": "\u2A7E\u0338", "&ngsim;": "\u2275", "&ngt;": "\u226F", "&ngtr;": "\u226F", "&nhArr;": "\u21CE", "&nharr;": "\u21AE", "&nhpar;": "\u2AF2", "&ni;": "\u220B", "&nis;": "\u22FC", "&nisd;": "\u22FA", "&niv;": "\u220B", "&njcy;": "\u045A", "&nlArr;": "\u21CD", "&nlE;": "\u2266\u0338", "&nlarr;": "\u219A", "&nldr;": "\u2025", "&nle;": "\u2270", "&nleftarrow;": "\u219A", "&nleftrightarrow;": "\u21AE", "&nleq;": "\u2270", "&nleqq;": "\u2266\u0338", "&nleqslant;": "\u2A7D\u0338", "&nles;": "\u2A7D\u0338", "&nless;": "\u226E", "&nlsim;": "\u2274", "&nlt;": "\u226E", "&nltri;": "\u22EA", "&nltrie;": "\u22EC", "&nmid;": "\u2224", "&nopf;": "\u{1D55F}", "&not": "\xAC", "&not;": "\xAC", "&notin;": "\u2209", "&notinE;": "\u22F9\u0338", "&notindot;": "\u22F5\u0338", "&notinva;": "\u2209", "&notinvb;": "\u22F7", "&notinvc;": "\u22F6", "&notni;": "\u220C", "&notniva;": "\u220C", "&notnivb;": "\u22FE", "&notnivc;": "\u22FD", "&npar;": "\u2226", "&nparallel;": "\u2226", "&nparsl;": "\u2AFD\u20E5", "&npart;": "\u2202\u0338", "&npolint;": "\u2A14", "&npr;": "\u2280", "&nprcue;": "\u22E0", "&npre;": "\u2AAF\u0338", "&nprec;": "\u2280", "&npreceq;": "\u2AAF\u0338", "&nrArr;": "\u21CF", "&nrarr;": "\u219B", "&nrarrc;": "\u2933\u0338", "&nrarrw;": "\u219D\u0338", "&nrightarrow;": "\u219B", "&nrtri;": "\u22EB", "&nrtrie;": "\u22ED", "&nsc;": "\u2281", "&nsccue;": "\u22E1", "&nsce;": "\u2AB0\u0338", "&nscr;": "\u{1D4C3}", "&nshortmid;": "\u2224", "&nshortparallel;": "\u2226", "&nsim;": "\u2241", "&nsime;": "\u2244", "&nsimeq;": "\u2244", "&nsmid;": "\u2224", "&nspar;": "\u2226", "&nsqsube;": "\u22E2", "&nsqsupe;": "\u22E3", "&nsub;": "\u2284", "&nsubE;": "\u2AC5\u0338", "&nsube;": "\u2288", "&nsubset;": "\u2282\u20D2", "&nsubseteq;": "\u2288", "&nsubseteqq;": "\u2AC5\u0338", "&nsucc;": "\u2281", "&nsucceq;": "\u2AB0\u0338", "&nsup;": "\u2285", "&nsupE;": "\u2AC6\u0338", "&nsupe;": "\u2289", "&nsupset;": "\u2283\u20D2", "&nsupseteq;": "\u2289", "&nsupseteqq;": "\u2AC6\u0338", "&ntgl;": "\u2279", "&ntilde": "\xF1", "&ntilde;": "\xF1", "&ntlg;": "\u2278", "&ntriangleleft;": "\u22EA", "&ntrianglelefteq;": "\u22EC", "&ntriangleright;": "\u22EB", "&ntrianglerighteq;": "\u22ED", "&nu;": "\u03BD", "&num;": "#", "&numero;": "\u2116", "&numsp;": "\u2007", "&nvDash;": "\u22AD", "&nvHarr;": "\u2904", "&nvap;": "\u224D\u20D2", "&nvdash;": "\u22AC", "&nvge;": "\u2265\u20D2", "&nvgt;": ">\u20D2", "&nvinfin;": "\u29DE", "&nvlArr;": "\u2902", "&nvle;": "\u2264\u20D2", "&nvlt;": "<\u20D2", "&nvltrie;": "\u22B4\u20D2", "&nvrArr;": "\u2903", "&nvrtrie;": "\u22B5\u20D2", "&nvsim;": "\u223C\u20D2", "&nwArr;": "\u21D6", "&nwarhk;": "\u2923", "&nwarr;": "\u2196", "&nwarrow;": "\u2196", "&nwnear;": "\u2927", "&oS;": "\u24C8", "&oacute": "\xF3", "&oacute;": "\xF3", "&oast;": "\u229B", "&ocir;": "\u229A", "&ocirc": "\xF4", "&ocirc;": "\xF4", "&ocy;": "\u043E", "&odash;": "\u229D", "&odblac;": "\u0151", "&odiv;": "\u2A38", "&odot;": "\u2299", "&odsold;": "\u29BC", "&oelig;": "\u0153", "&ofcir;": "\u29BF", "&ofr;": "\u{1D52C}", "&ogon;": "\u02DB", "&ograve": "\xF2", "&ograve;": "\xF2", "&ogt;": "\u29C1", "&ohbar;": "\u29B5", "&ohm;": "\u03A9", "&oint;": "\u222E", "&olarr;": "\u21BA", "&olcir;": "\u29BE", "&olcross;": "\u29BB", "&oline;": "\u203E", "&olt;": "\u29C0", "&omacr;": "\u014D", "&omega;": "\u03C9", "&omicron;": "\u03BF", "&omid;": "\u29B6", "&ominus;": "\u2296", "&oopf;": "\u{1D560}", "&opar;": "\u29B7", "&operp;": "\u29B9", "&oplus;": "\u2295", "&or;": "\u2228", "&orarr;": "\u21BB", "&ord;": "\u2A5D", "&order;": "\u2134", "&orderof;": "\u2134", "&ordf": "\xAA", "&ordf;": "\xAA", "&ordm": "\xBA", "&ordm;": "\xBA", "&origof;": "\u22B6", "&oror;": "\u2A56", "&orslope;": "\u2A57", "&orv;": "\u2A5B", "&oscr;": "\u2134", "&oslash": "\xF8", "&oslash;": "\xF8", "&osol;": "\u2298", "&otilde": "\xF5", "&otilde;": "\xF5", "&otimes;": "\u2297", "&otimesas;": "\u2A36", "&ouml": "\xF6", "&ouml;": "\xF6", "&ovbar;": "\u233D", "&par;": "\u2225", "&para": "\xB6", "&para;": "\xB6", "&parallel;": "\u2225", "&parsim;": "\u2AF3", "&parsl;": "\u2AFD", "&part;": "\u2202", "&pcy;": "\u043F", "&percnt;": "%", "&period;": ".", "&permil;": "\u2030", "&perp;": "\u22A5", "&pertenk;": "\u2031", "&pfr;": "\u{1D52D}", "&phi;": "\u03C6", "&phiv;": "\u03D5", "&phmmat;": "\u2133", "&phone;": "\u260E", "&pi;": "\u03C0", "&pitchfork;": "\u22D4", "&piv;": "\u03D6", "&planck;": "\u210F", "&planckh;": "\u210E", "&plankv;": "\u210F", "&plus;": "+", "&plusacir;": "\u2A23", "&plusb;": "\u229E", "&pluscir;": "\u2A22", "&plusdo;": "\u2214", "&plusdu;": "\u2A25", "&pluse;": "\u2A72", "&plusmn": "\xB1", "&plusmn;": "\xB1", "&plussim;": "\u2A26", "&plustwo;": "\u2A27", "&pm;": "\xB1", "&pointint;": "\u2A15", "&popf;": "\u{1D561}", "&pound": "\xA3", "&pound;": "\xA3", "&pr;": "\u227A", "&prE;": "\u2AB3", "&prap;": "\u2AB7", "&prcue;": "\u227C", "&pre;": "\u2AAF", "&prec;": "\u227A", "&precapprox;": "\u2AB7", "&preccurlyeq;": "\u227C", "&preceq;": "\u2AAF", "&precnapprox;": "\u2AB9", "&precneqq;": "\u2AB5", "&precnsim;": "\u22E8", "&precsim;": "\u227E", "&prime;": "\u2032", "&primes;": "\u2119", "&prnE;": "\u2AB5", "&prnap;": "\u2AB9", "&prnsim;": "\u22E8", "&prod;": "\u220F", "&profalar;": "\u232E", "&profline;": "\u2312", "&profsurf;": "\u2313", "&prop;": "\u221D", "&propto;": "\u221D", "&prsim;": "\u227E", "&prurel;": "\u22B0", "&pscr;": "\u{1D4C5}", "&psi;": "\u03C8", "&puncsp;": "\u2008", "&qfr;": "\u{1D52E}", "&qint;": "\u2A0C", "&qopf;": "\u{1D562}", "&qprime;": "\u2057", "&qscr;": "\u{1D4C6}", "&quaternions;": "\u210D", "&quatint;": "\u2A16", "&quest;": "?", "&questeq;": "\u225F", "&quot": '"', "&quot;": '"', "&rAarr;": "\u21DB", "&rArr;": "\u21D2", "&rAtail;": "\u291C", "&rBarr;": "\u290F", "&rHar;": "\u2964", "&race;": "\u223D\u0331", "&racute;": "\u0155", "&radic;": "\u221A", "&raemptyv;": "\u29B3", "&rang;": "\u27E9", "&rangd;": "\u2992", "&range;": "\u29A5", "&rangle;": "\u27E9", "&raquo": "\xBB", "&raquo;": "\xBB", "&rarr;": "\u2192", "&rarrap;": "\u2975", "&rarrb;": "\u21E5", "&rarrbfs;": "\u2920", "&rarrc;": "\u2933", "&rarrfs;": "\u291E", "&rarrhk;": "\u21AA", "&rarrlp;": "\u21AC", "&rarrpl;": "\u2945", "&rarrsim;": "\u2974", "&rarrtl;": "\u21A3", "&rarrw;": "\u219D", "&ratail;": "\u291A", "&ratio;": "\u2236", "&rationals;": "\u211A", "&rbarr;": "\u290D", "&rbbrk;": "\u2773", "&rbrace;": "}", "&rbrack;": "]", "&rbrke;": "\u298C", "&rbrksld;": "\u298E", "&rbrkslu;": "\u2990", "&rcaron;": "\u0159", "&rcedil;": "\u0157", "&rceil;": "\u2309", "&rcub;": "}", "&rcy;": "\u0440", "&rdca;": "\u2937", "&rdldhar;": "\u2969", "&rdquo;": "\u201D", "&rdquor;": "\u201D", "&rdsh;": "\u21B3", "&real;": "\u211C", "&realine;": "\u211B", "&realpart;": "\u211C", "&reals;": "\u211D", "&rect;": "\u25AD", "&reg": "\xAE", "&reg;": "\xAE", "&rfisht;": "\u297D", "&rfloor;": "\u230B", "&rfr;": "\u{1D52F}", "&rhard;": "\u21C1", "&rharu;": "\u21C0", "&rharul;": "\u296C", "&rho;": "\u03C1", "&rhov;": "\u03F1", "&rightarrow;": "\u2192", "&rightarrowtail;": "\u21A3", "&rightharpoondown;": "\u21C1", "&rightharpoonup;": "\u21C0", "&rightleftarrows;": "\u21C4", "&rightleftharpoons;": "\u21CC", "&rightrightarrows;": "\u21C9", "&rightsquigarrow;": "\u219D", "&rightthreetimes;": "\u22CC", "&ring;": "\u02DA", "&risingdotseq;": "\u2253", "&rlarr;": "\u21C4", "&rlhar;": "\u21CC", "&rlm;": "\u200F", "&rmoust;": "\u23B1", "&rmoustache;": "\u23B1", "&rnmid;": "\u2AEE", "&roang;": "\u27ED", "&roarr;": "\u21FE", "&robrk;": "\u27E7", "&ropar;": "\u2986", "&ropf;": "\u{1D563}", "&roplus;": "\u2A2E", "&rotimes;": "\u2A35", "&rpar;": ")", "&rpargt;": "\u2994", "&rppolint;": "\u2A12", "&rrarr;": "\u21C9", "&rsaquo;": "\u203A", "&rscr;": "\u{1D4C7}", "&rsh;": "\u21B1", "&rsqb;": "]", "&rsquo;": "\u2019", "&rsquor;": "\u2019", "&rthree;": "\u22CC", "&rtimes;": "\u22CA", "&rtri;": "\u25B9", "&rtrie;": "\u22B5", "&rtrif;": "\u25B8", "&rtriltri;": "\u29CE", "&ruluhar;": "\u2968", "&rx;": "\u211E", "&sacute;": "\u015B", "&sbquo;": "\u201A", "&sc;": "\u227B", "&scE;": "\u2AB4", "&scap;": "\u2AB8", "&scaron;": "\u0161", "&sccue;": "\u227D", "&sce;": "\u2AB0", "&scedil;": "\u015F", "&scirc;": "\u015D", "&scnE;": "\u2AB6", "&scnap;": "\u2ABA", "&scnsim;": "\u22E9", "&scpolint;": "\u2A13", "&scsim;": "\u227F", "&scy;": "\u0441", "&sdot;": "\u22C5", "&sdotb;": "\u22A1", "&sdote;": "\u2A66", "&seArr;": "\u21D8", "&searhk;": "\u2925", "&searr;": "\u2198", "&searrow;": "\u2198", "&sect": "\xA7", "&sect;": "\xA7", "&semi;": ";", "&seswar;": "\u2929", "&setminus;": "\u2216", "&setmn;": "\u2216", "&sext;": "\u2736", "&sfr;": "\u{1D530}", "&sfrown;": "\u2322", "&sharp;": "\u266F", "&shchcy;": "\u0449", "&shcy;": "\u0448", "&shortmid;": "\u2223", "&shortparallel;": "\u2225", "&shy": "\xAD", "&shy;": "\xAD", "&sigma;": "\u03C3", "&sigmaf;": "\u03C2", "&sigmav;": "\u03C2", "&sim;": "\u223C", "&simdot;": "\u2A6A", "&sime;": "\u2243", "&simeq;": "\u2243", "&simg;": "\u2A9E", "&simgE;": "\u2AA0", "&siml;": "\u2A9D", "&simlE;": "\u2A9F", "&simne;": "\u2246", "&simplus;": "\u2A24", "&simrarr;": "\u2972", "&slarr;": "\u2190", "&smallsetminus;": "\u2216", "&smashp;": "\u2A33", "&smeparsl;": "\u29E4", "&smid;": "\u2223", "&smile;": "\u2323", "&smt;": "\u2AAA", "&smte;": "\u2AAC", "&smtes;": "\u2AAC\uFE00", "&softcy;": "\u044C", "&sol;": "/", "&solb;": "\u29C4", "&solbar;": "\u233F", "&sopf;": "\u{1D564}", "&spades;": "\u2660", "&spadesuit;": "\u2660", "&spar;": "\u2225", "&sqcap;": "\u2293", "&sqcaps;": "\u2293\uFE00", "&sqcup;": "\u2294", "&sqcups;": "\u2294\uFE00", "&sqsub;": "\u228F", "&sqsube;": "\u2291", "&sqsubset;": "\u228F", "&sqsubseteq;": "\u2291", "&sqsup;": "\u2290", "&sqsupe;": "\u2292", "&sqsupset;": "\u2290", "&sqsupseteq;": "\u2292", "&squ;": "\u25A1", "&square;": "\u25A1", "&squarf;": "\u25AA", "&squf;": "\u25AA", "&srarr;": "\u2192", "&sscr;": "\u{1D4C8}", "&ssetmn;": "\u2216", "&ssmile;": "\u2323", "&sstarf;": "\u22C6", "&star;": "\u2606", "&starf;": "\u2605", "&straightepsilon;": "\u03F5", "&straightphi;": "\u03D5", "&strns;": "\xAF", "&sub;": "\u2282", "&subE;": "\u2AC5", "&subdot;": "\u2ABD", "&sube;": "\u2286", "&subedot;": "\u2AC3", "&submult;": "\u2AC1", "&subnE;": "\u2ACB", "&subne;": "\u228A", "&subplus;": "\u2ABF", "&subrarr;": "\u2979", "&subset;": "\u2282", "&subseteq;": "\u2286", "&subseteqq;": "\u2AC5", "&subsetneq;": "\u228A", "&subsetneqq;": "\u2ACB", "&subsim;": "\u2AC7", "&subsub;": "\u2AD5", "&subsup;": "\u2AD3", "&succ;": "\u227B", "&succapprox;": "\u2AB8", "&succcurlyeq;": "\u227D", "&succeq;": "\u2AB0", "&succnapprox;": "\u2ABA", "&succneqq;": "\u2AB6", "&succnsim;": "\u22E9", "&succsim;": "\u227F", "&sum;": "\u2211", "&sung;": "\u266A", "&sup1": "\xB9", "&sup1;": "\xB9", "&sup2": "\xB2", "&sup2;": "\xB2", "&sup3": "\xB3", "&sup3;": "\xB3", "&sup;": "\u2283", "&supE;": "\u2AC6", "&supdot;": "\u2ABE", "&supdsub;": "\u2AD8", "&supe;": "\u2287", "&supedot;": "\u2AC4", "&suphsol;": "\u27C9", "&suphsub;": "\u2AD7", "&suplarr;": "\u297B", "&supmult;": "\u2AC2", "&supnE;": "\u2ACC", "&supne;": "\u228B", "&supplus;": "\u2AC0", "&supset;": "\u2283", "&supseteq;": "\u2287", "&supseteqq;": "\u2AC6", "&supsetneq;": "\u228B", "&supsetneqq;": "\u2ACC", "&supsim;": "\u2AC8", "&supsub;": "\u2AD4", "&supsup;": "\u2AD6", "&swArr;": "\u21D9", "&swarhk;": "\u2926", "&swarr;": "\u2199", "&swarrow;": "\u2199", "&swnwar;": "\u292A", "&szlig": "\xDF", "&szlig;": "\xDF", "&target;": "\u2316", "&tau;": "\u03C4", "&tbrk;": "\u23B4", "&tcaron;": "\u0165", "&tcedil;": "\u0163", "&tcy;": "\u0442", "&tdot;": "\u20DB", "&telrec;": "\u2315", "&tfr;": "\u{1D531}", "&there4;": "\u2234", "&therefore;": "\u2234", "&theta;": "\u03B8", "&thetasym;": "\u03D1", "&thetav;": "\u03D1", "&thickapprox;": "\u2248", "&thicksim;": "\u223C", "&thinsp;": "\u2009", "&thkap;": "\u2248", "&thksim;": "\u223C", "&thorn": "\xFE", "&thorn;": "\xFE", "&tilde;": "\u02DC", "&times": "\xD7", "&times;": "\xD7", "&timesb;": "\u22A0", "&timesbar;": "\u2A31", "&timesd;": "\u2A30", "&tint;": "\u222D", "&toea;": "\u2928", "&top;": "\u22A4", "&topbot;": "\u2336", "&topcir;": "\u2AF1", "&topf;": "\u{1D565}", "&topfork;": "\u2ADA", "&tosa;": "\u2929", "&tprime;": "\u2034", "&trade;": "\u2122", "&triangle;": "\u25B5", "&triangledown;": "\u25BF", "&triangleleft;": "\u25C3", "&trianglelefteq;": "\u22B4", "&triangleq;": "\u225C", "&triangleright;": "\u25B9", "&trianglerighteq;": "\u22B5", "&tridot;": "\u25EC", "&trie;": "\u225C", "&triminus;": "\u2A3A", "&triplus;": "\u2A39", "&trisb;": "\u29CD", "&tritime;": "\u2A3B", "&trpezium;": "\u23E2", "&tscr;": "\u{1D4C9}", "&tscy;": "\u0446", "&tshcy;": "\u045B", "&tstrok;": "\u0167", "&twixt;": "\u226C", "&twoheadleftarrow;": "\u219E", "&twoheadrightarrow;": "\u21A0", "&uArr;": "\u21D1", "&uHar;": "\u2963", "&uacute": "\xFA", "&uacute;": "\xFA", "&uarr;": "\u2191", "&ubrcy;": "\u045E", "&ubreve;": "\u016D", "&ucirc": "\xFB", "&ucirc;": "\xFB", "&ucy;": "\u0443", "&udarr;": "\u21C5", "&udblac;": "\u0171", "&udhar;": "\u296E", "&ufisht;": "\u297E", "&ufr;": "\u{1D532}", "&ugrave": "\xF9", "&ugrave;": "\xF9", "&uharl;": "\u21BF", "&uharr;": "\u21BE", "&uhblk;": "\u2580", "&ulcorn;": "\u231C", "&ulcorner;": "\u231C", "&ulcrop;": "\u230F", "&ultri;": "\u25F8", "&umacr;": "\u016B", "&uml": "\xA8", "&uml;": "\xA8", "&uogon;": "\u0173", "&uopf;": "\u{1D566}", "&uparrow;": "\u2191", "&updownarrow;": "\u2195", "&upharpoonleft;": "\u21BF", "&upharpoonright;": "\u21BE", "&uplus;": "\u228E", "&upsi;": "\u03C5", "&upsih;": "\u03D2", "&upsilon;": "\u03C5", "&upuparrows;": "\u21C8", "&urcorn;": "\u231D", "&urcorner;": "\u231D", "&urcrop;": "\u230E", "&uring;": "\u016F", "&urtri;": "\u25F9", "&uscr;": "\u{1D4CA}", "&utdot;": "\u22F0", "&utilde;": "\u0169", "&utri;": "\u25B5", "&utrif;": "\u25B4", "&uuarr;": "\u21C8", "&uuml": "\xFC", "&uuml;": "\xFC", "&uwangle;": "\u29A7", "&vArr;": "\u21D5", "&vBar;": "\u2AE8", "&vBarv;": "\u2AE9", "&vDash;": "\u22A8", "&vangrt;": "\u299C", "&varepsilon;": "\u03F5", "&varkappa;": "\u03F0", "&varnothing;": "\u2205", "&varphi;": "\u03D5", "&varpi;": "\u03D6", "&varpropto;": "\u221D", "&varr;": "\u2195", "&varrho;": "\u03F1", "&varsigma;": "\u03C2", "&varsubsetneq;": "\u228A\uFE00", "&varsubsetneqq;": "\u2ACB\uFE00", "&varsupsetneq;": "\u228B\uFE00", "&varsupsetneqq;": "\u2ACC\uFE00", "&vartheta;": "\u03D1", "&vartriangleleft;": "\u22B2", "&vartriangleright;": "\u22B3", "&vcy;": "\u0432", "&vdash;": "\u22A2", "&vee;": "\u2228", "&veebar;": "\u22BB", "&veeeq;": "\u225A", "&vellip;": "\u22EE", "&verbar;": "|", "&vert;": "|", "&vfr;": "\u{1D533}", "&vltri;": "\u22B2", "&vnsub;": "\u2282\u20D2", "&vnsup;": "\u2283\u20D2", "&vopf;": "\u{1D567}", "&vprop;": "\u221D", "&vrtri;": "\u22B3", "&vscr;": "\u{1D4CB}", "&vsubnE;": "\u2ACB\uFE00", "&vsubne;": "\u228A\uFE00", "&vsupnE;": "\u2ACC\uFE00", "&vsupne;": "\u228B\uFE00", "&vzigzag;": "\u299A", "&wcirc;": "\u0175", "&wedbar;": "\u2A5F", "&wedge;": "\u2227", "&wedgeq;": "\u2259", "&weierp;": "\u2118", "&wfr;": "\u{1D534}", "&wopf;": "\u{1D568}", "&wp;": "\u2118", "&wr;": "\u2240", "&wreath;": "\u2240", "&wscr;": "\u{1D4CC}", "&xcap;": "\u22C2", "&xcirc;": "\u25EF", "&xcup;": "\u22C3", "&xdtri;": "\u25BD", "&xfr;": "\u{1D535}", "&xhArr;": "\u27FA", "&xharr;": "\u27F7", "&xi;": "\u03BE", "&xlArr;": "\u27F8", "&xlarr;": "\u27F5", "&xmap;": "\u27FC", "&xnis;": "\u22FB", "&xodot;": "\u2A00", "&xopf;": "\u{1D569}", "&xoplus;": "\u2A01", "&xotime;": "\u2A02", "&xrArr;": "\u27F9", "&xrarr;": "\u27F6", "&xscr;": "\u{1D4CD}", "&xsqcup;": "\u2A06", "&xuplus;": "\u2A04", "&xutri;": "\u25B3", "&xvee;": "\u22C1", "&xwedge;": "\u22C0", "&yacute": "\xFD", "&yacute;": "\xFD", "&yacy;": "\u044F", "&ycirc;": "\u0177", "&ycy;": "\u044B", "&yen": "\xA5", "&yen;": "\xA5", "&yfr;": "\u{1D536}", "&yicy;": "\u0457", "&yopf;": "\u{1D56A}", "&yscr;": "\u{1D4CE}", "&yucy;": "\u044E", "&yuml": "\xFF", "&yuml;": "\xFF", "&zacute;": "\u017A", "&zcaron;": "\u017E", "&zcy;": "\u0437", "&zdot;": "\u017C", "&zeetrf;": "\u2128", "&zeta;": "\u03B6", "&zfr;": "\u{1D537}", "&zhcy;": "\u0436", "&zigrarr;": "\u21DD", "&zopf;": "\u{1D56B}", "&zscr;": "\u{1D4CF}", "&zwj;": "\u200D", "&zwnj;": "\u200C" }, characters: { "\xC6": "&AElig;", "&": "&amp;", "\xC1": "&Aacute;", "\u0102": "&Abreve;", "\xC2": "&Acirc;", "\u0410": "&Acy;", "\u{1D504}": "&Afr;", "\xC0": "&Agrave;", "\u0391": "&Alpha;", "\u0100": "&Amacr;", "\u2A53": "&And;", "\u0104": "&Aogon;", "\u{1D538}": "&Aopf;", "\u2061": "&af;", "\xC5": "&angst;", "\u{1D49C}": "&Ascr;", "\u2254": "&coloneq;", "\xC3": "&Atilde;", "\xC4": "&Auml;", "\u2216": "&ssetmn;", "\u2AE7": "&Barv;", "\u2306": "&doublebarwedge;", "\u0411": "&Bcy;", "\u2235": "&because;", "\u212C": "&bernou;", "\u0392": "&Beta;", "\u{1D505}": "&Bfr;", "\u{1D539}": "&Bopf;", "\u02D8": "&breve;", "\u224E": "&bump;", "\u0427": "&CHcy;", "\xA9": "&copy;", "\u0106": "&Cacute;", "\u22D2": "&Cap;", "\u2145": "&DD;", "\u212D": "&Cfr;", "\u010C": "&Ccaron;", "\xC7": "&Ccedil;", "\u0108": "&Ccirc;", "\u2230": "&Cconint;", "\u010A": "&Cdot;", "\xB8": "&cedil;", "\xB7": "&middot;", "\u03A7": "&Chi;", "\u2299": "&odot;", "\u2296": "&ominus;", "\u2295": "&oplus;", "\u2297": "&otimes;", "\u2232": "&cwconint;", "\u201D": "&rdquor;", "\u2019": "&rsquor;", "\u2237": "&Proportion;", "\u2A74": "&Colone;", "\u2261": "&equiv;", "\u222F": "&DoubleContourIntegral;", "\u222E": "&oint;", "\u2102": "&complexes;", "\u2210": "&coprod;", "\u2233": "&awconint;", "\u2A2F": "&Cross;", "\u{1D49E}": "&Cscr;", "\u22D3": "&Cup;", "\u224D": "&asympeq;", "\u2911": "&DDotrahd;", "\u0402": "&DJcy;", "\u0405": "&DScy;", "\u040F": "&DZcy;", "\u2021": "&ddagger;", "\u21A1": "&Darr;", "\u2AE4": "&DoubleLeftTee;", "\u010E": "&Dcaron;", "\u0414": "&Dcy;", "\u2207": "&nabla;", "\u0394": "&Delta;", "\u{1D507}": "&Dfr;", "\xB4": "&acute;", "\u02D9": "&dot;", "\u02DD": "&dblac;", "`": "&grave;", "\u02DC": "&tilde;", "\u22C4": "&diamond;", "\u2146": "&dd;", "\u{1D53B}": "&Dopf;", "\xA8": "&uml;", "\u20DC": "&DotDot;", "\u2250": "&esdot;", "\u21D3": "&dArr;", "\u21D0": "&lArr;", "\u21D4": "&iff;", "\u27F8": "&xlArr;", "\u27FA": "&xhArr;", "\u27F9": "&xrArr;", "\u21D2": "&rArr;", "\u22A8": "&vDash;", "\u21D1": "&uArr;", "\u21D5": "&vArr;", "\u2225": "&spar;", "\u2193": "&downarrow;", "\u2913": "&DownArrowBar;", "\u21F5": "&duarr;", "\u0311": "&DownBreve;", "\u2950": "&DownLeftRightVector;", "\u295E": "&DownLeftTeeVector;", "\u21BD": "&lhard;", "\u2956": "&DownLeftVectorBar;", "\u295F": "&DownRightTeeVector;", "\u21C1": "&rightharpoondown;", "\u2957": "&DownRightVectorBar;", "\u22A4": "&top;", "\u21A7": "&mapstodown;", "\u{1D49F}": "&Dscr;", "\u0110": "&Dstrok;", "\u014A": "&ENG;", "\xD0": "&ETH;", "\xC9": "&Eacute;", "\u011A": "&Ecaron;", "\xCA": "&Ecirc;", "\u042D": "&Ecy;", "\u0116": "&Edot;", "\u{1D508}": "&Efr;", "\xC8": "&Egrave;", "\u2208": "&isinv;", "\u0112": "&Emacr;", "\u25FB": "&EmptySmallSquare;", "\u25AB": "&EmptyVerySmallSquare;", "\u0118": "&Eogon;", "\u{1D53C}": "&Eopf;", "\u0395": "&Epsilon;", "\u2A75": "&Equal;", "\u2242": "&esim;", "\u21CC": "&rlhar;", "\u2130": "&expectation;", "\u2A73": "&Esim;", "\u0397": "&Eta;", "\xCB": "&Euml;", "\u2203": "&exist;", "\u2147": "&exponentiale;", "\u0424": "&Fcy;", "\u{1D509}": "&Ffr;", "\u25FC": "&FilledSmallSquare;", "\u25AA": "&squf;", "\u{1D53D}": "&Fopf;", "\u2200": "&forall;", "\u2131": "&Fscr;", "\u0403": "&GJcy;", ">": "&gt;", "\u0393": "&Gamma;", "\u03DC": "&Gammad;", "\u011E": "&Gbreve;", "\u0122": "&Gcedil;", "\u011C": "&Gcirc;", "\u0413": "&Gcy;", "\u0120": "&Gdot;", "\u{1D50A}": "&Gfr;", "\u22D9": "&ggg;", "\u{1D53E}": "&Gopf;", "\u2265": "&geq;", "\u22DB": "&gtreqless;", "\u2267": "&geqq;", "\u2AA2": "&GreaterGreater;", "\u2277": "&gtrless;", "\u2A7E": "&ges;", "\u2273": "&gtrsim;", "\u{1D4A2}": "&Gscr;", "\u226B": "&gg;", "\u042A": "&HARDcy;", "\u02C7": "&caron;", "^": "&Hat;", "\u0124": "&Hcirc;", "\u210C": "&Poincareplane;", "\u210B": "&hamilt;", "\u210D": "&quaternions;", "\u2500": "&boxh;", "\u0126": "&Hstrok;", "\u224F": "&bumpeq;", "\u0415": "&IEcy;", "\u0132": "&IJlig;", "\u0401": "&IOcy;", "\xCD": "&Iacute;", "\xCE": "&Icirc;", "\u0418": "&Icy;", "\u0130": "&Idot;", "\u2111": "&imagpart;", "\xCC": "&Igrave;", "\u012A": "&Imacr;", "\u2148": "&ii;", "\u222C": "&Int;", "\u222B": "&int;", "\u22C2": "&xcap;", "\u2063": "&ic;", "\u2062": "&it;", "\u012E": "&Iogon;", "\u{1D540}": "&Iopf;", "\u0399": "&Iota;", "\u2110": "&imagline;", "\u0128": "&Itilde;", "\u0406": "&Iukcy;", "\xCF": "&Iuml;", "\u0134": "&Jcirc;", "\u0419": "&Jcy;", "\u{1D50D}": "&Jfr;", "\u{1D541}": "&Jopf;", "\u{1D4A5}": "&Jscr;", "\u0408": "&Jsercy;", "\u0404": "&Jukcy;", "\u0425": "&KHcy;", "\u040C": "&KJcy;", "\u039A": "&Kappa;", "\u0136": "&Kcedil;", "\u041A": "&Kcy;", "\u{1D50E}": "&Kfr;", "\u{1D542}": "&Kopf;", "\u{1D4A6}": "&Kscr;", "\u0409": "&LJcy;", "<": "&lt;", "\u0139": "&Lacute;", "\u039B": "&Lambda;", "\u27EA": "&Lang;", "\u2112": "&lagran;", "\u219E": "&twoheadleftarrow;", "\u013D": "&Lcaron;", "\u013B": "&Lcedil;", "\u041B": "&Lcy;", "\u27E8": "&langle;", "\u2190": "&slarr;", "\u21E4": "&larrb;", "\u21C6": "&lrarr;", "\u2308": "&lceil;", "\u27E6": "&lobrk;", "\u2961": "&LeftDownTeeVector;", "\u21C3": "&downharpoonleft;", "\u2959": "&LeftDownVectorBar;", "\u230A": "&lfloor;", "\u2194": "&leftrightarrow;", "\u294E": "&LeftRightVector;", "\u22A3": "&dashv;", "\u21A4": "&mapstoleft;", "\u295A": "&LeftTeeVector;", "\u22B2": "&vltri;", "\u29CF": "&LeftTriangleBar;", "\u22B4": "&trianglelefteq;", "\u2951": "&LeftUpDownVector;", "\u2960": "&LeftUpTeeVector;", "\u21BF": "&upharpoonleft;", "\u2958": "&LeftUpVectorBar;", "\u21BC": "&lharu;", "\u2952": "&LeftVectorBar;", "\u22DA": "&lesseqgtr;", "\u2266": "&leqq;", "\u2276": "&lg;", "\u2AA1": "&LessLess;", "\u2A7D": "&les;", "\u2272": "&lsim;", "\u{1D50F}": "&Lfr;", "\u22D8": "&Ll;", "\u21DA": "&lAarr;", "\u013F": "&Lmidot;", "\u27F5": "&xlarr;", "\u27F7": "&xharr;", "\u27F6": "&xrarr;", "\u{1D543}": "&Lopf;", "\u2199": "&swarrow;", "\u2198": "&searrow;", "\u21B0": "&lsh;", "\u0141": "&Lstrok;", "\u226A": "&ll;", "\u2905": "&Map;", "\u041C": "&Mcy;", "\u205F": "&MediumSpace;", "\u2133": "&phmmat;", "\u{1D510}": "&Mfr;", "\u2213": "&mp;", "\u{1D544}": "&Mopf;", "\u039C": "&Mu;", "\u040A": "&NJcy;", "\u0143": "&Nacute;", "\u0147": "&Ncaron;", "\u0145": "&Ncedil;", "\u041D": "&Ncy;", "\u200B": "&ZeroWidthSpace;", "\n": "&NewLine;", "\u{1D511}": "&Nfr;", "\u2060": "&NoBreak;", "\xA0": "&nbsp;", "\u2115": "&naturals;", "\u2AEC": "&Not;", "\u2262": "&nequiv;", "\u226D": "&NotCupCap;", "\u2226": "&nspar;", "\u2209": "&notinva;", "\u2260": "&ne;", "\u2242\u0338": "&nesim;", "\u2204": "&nexists;", "\u226F": "&ngtr;", "\u2271": "&ngeq;", "\u2267\u0338": "&ngeqq;", "\u226B\u0338": "&nGtv;", "\u2279": "&ntgl;", "\u2A7E\u0338": "&nges;", "\u2275": "&ngsim;", "\u224E\u0338": "&nbump;", "\u224F\u0338": "&nbumpe;", "\u22EA": "&ntriangleleft;", "\u29CF\u0338": "&NotLeftTriangleBar;", "\u22EC": "&ntrianglelefteq;", "\u226E": "&nlt;", "\u2270": "&nleq;", "\u2278": "&ntlg;", "\u226A\u0338": "&nLtv;", "\u2A7D\u0338": "&nles;", "\u2274": "&nlsim;", "\u2AA2\u0338": "&NotNestedGreaterGreater;", "\u2AA1\u0338": "&NotNestedLessLess;", "\u2280": "&nprec;", "\u2AAF\u0338": "&npreceq;", "\u22E0": "&nprcue;", "\u220C": "&notniva;", "\u22EB": "&ntriangleright;", "\u29D0\u0338": "&NotRightTriangleBar;", "\u22ED": "&ntrianglerighteq;", "\u228F\u0338": "&NotSquareSubset;", "\u22E2": "&nsqsube;", "\u2290\u0338": "&NotSquareSuperset;", "\u22E3": "&nsqsupe;", "\u2282\u20D2": "&vnsub;", "\u2288": "&nsubseteq;", "\u2281": "&nsucc;", "\u2AB0\u0338": "&nsucceq;", "\u22E1": "&nsccue;", "\u227F\u0338": "&NotSucceedsTilde;", "\u2283\u20D2": "&vnsup;", "\u2289": "&nsupseteq;", "\u2241": "&nsim;", "\u2244": "&nsimeq;", "\u2247": "&ncong;", "\u2249": "&napprox;", "\u2224": "&nsmid;", "\u{1D4A9}": "&Nscr;", "\xD1": "&Ntilde;", "\u039D": "&Nu;", "\u0152": "&OElig;", "\xD3": "&Oacute;", "\xD4": "&Ocirc;", "\u041E": "&Ocy;", "\u0150": "&Odblac;", "\u{1D512}": "&Ofr;", "\xD2": "&Ograve;", "\u014C": "&Omacr;", "\u03A9": "&ohm;", "\u039F": "&Omicron;", "\u{1D546}": "&Oopf;", "\u201C": "&ldquo;", "\u2018": "&lsquo;", "\u2A54": "&Or;", "\u{1D4AA}": "&Oscr;", "\xD8": "&Oslash;", "\xD5": "&Otilde;", "\u2A37": "&Otimes;", "\xD6": "&Ouml;", "\u203E": "&oline;", "\u23DE": "&OverBrace;", "\u23B4": "&tbrk;", "\u23DC": "&OverParenthesis;", "\u2202": "&part;", "\u041F": "&Pcy;", "\u{1D513}": "&Pfr;", "\u03A6": "&Phi;", "\u03A0": "&Pi;", "\xB1": "&pm;", "\u2119": "&primes;", "\u2ABB": "&Pr;", "\u227A": "&prec;", "\u2AAF": "&preceq;", "\u227C": "&preccurlyeq;", "\u227E": "&prsim;", "\u2033": "&Prime;", "\u220F": "&prod;", "\u221D": "&vprop;", "\u{1D4AB}": "&Pscr;", "\u03A8": "&Psi;", '"': "&quot;", "\u{1D514}": "&Qfr;", "\u211A": "&rationals;", "\u{1D4AC}": "&Qscr;", "\u2910": "&drbkarow;", "\xAE": "&reg;", "\u0154": "&Racute;", "\u27EB": "&Rang;", "\u21A0": "&twoheadrightarrow;", "\u2916": "&Rarrtl;", "\u0158": "&Rcaron;", "\u0156": "&Rcedil;", "\u0420": "&Rcy;", "\u211C": "&realpart;", "\u220B": "&niv;", "\u21CB": "&lrhar;", "\u296F": "&duhar;", "\u03A1": "&Rho;", "\u27E9": "&rangle;", "\u2192": "&srarr;", "\u21E5": "&rarrb;", "\u21C4": "&rlarr;", "\u2309": "&rceil;", "\u27E7": "&robrk;", "\u295D": "&RightDownTeeVector;", "\u21C2": "&downharpoonright;", "\u2955": "&RightDownVectorBar;", "\u230B": "&rfloor;", "\u22A2": "&vdash;", "\u21A6": "&mapsto;", "\u295B": "&RightTeeVector;", "\u22B3": "&vrtri;", "\u29D0": "&RightTriangleBar;", "\u22B5": "&trianglerighteq;", "\u294F": "&RightUpDownVector;", "\u295C": "&RightUpTeeVector;", "\u21BE": "&upharpoonright;", "\u2954": "&RightUpVectorBar;", "\u21C0": "&rightharpoonup;", "\u2953": "&RightVectorBar;", "\u211D": "&reals;", "\u2970": "&RoundImplies;", "\u21DB": "&rAarr;", "\u211B": "&realine;", "\u21B1": "&rsh;", "\u29F4": "&RuleDelayed;", "\u0429": "&SHCHcy;", "\u0428": "&SHcy;", "\u042C": "&SOFTcy;", "\u015A": "&Sacute;", "\u2ABC": "&Sc;", "\u0160": "&Scaron;", "\u015E": "&Scedil;", "\u015C": "&Scirc;", "\u0421": "&Scy;", "\u{1D516}": "&Sfr;", "\u2191": "&uparrow;", "\u03A3": "&Sigma;", "\u2218": "&compfn;", "\u{1D54A}": "&Sopf;", "\u221A": "&radic;", "\u25A1": "&square;", "\u2293": "&sqcap;", "\u228F": "&sqsubset;", "\u2291": "&sqsubseteq;", "\u2290": "&sqsupset;", "\u2292": "&sqsupseteq;", "\u2294": "&sqcup;", "\u{1D4AE}": "&Sscr;", "\u22C6": "&sstarf;", "\u22D0": "&Subset;", "\u2286": "&subseteq;", "\u227B": "&succ;", "\u2AB0": "&succeq;", "\u227D": "&succcurlyeq;", "\u227F": "&succsim;", "\u2211": "&sum;", "\u22D1": "&Supset;", "\u2283": "&supset;", "\u2287": "&supseteq;", "\xDE": "&THORN;", "\u2122": "&trade;", "\u040B": "&TSHcy;", "\u0426": "&TScy;", "	": "&Tab;", "\u03A4": "&Tau;", "\u0164": "&Tcaron;", "\u0162": "&Tcedil;", "\u0422": "&Tcy;", "\u{1D517}": "&Tfr;", "\u2234": "&therefore;", "\u0398": "&Theta;", "\u205F\u200A": "&ThickSpace;", "\u2009": "&thinsp;", "\u223C": "&thksim;", "\u2243": "&simeq;", "\u2245": "&cong;", "\u2248": "&thkap;", "\u{1D54B}": "&Topf;", "\u20DB": "&tdot;", "\u{1D4AF}": "&Tscr;", "\u0166": "&Tstrok;", "\xDA": "&Uacute;", "\u219F": "&Uarr;", "\u2949": "&Uarrocir;", "\u040E": "&Ubrcy;", "\u016C": "&Ubreve;", "\xDB": "&Ucirc;", "\u0423": "&Ucy;", "\u0170": "&Udblac;", "\u{1D518}": "&Ufr;", "\xD9": "&Ugrave;", "\u016A": "&Umacr;", _: "&lowbar;", "\u23DF": "&UnderBrace;", "\u23B5": "&bbrk;", "\u23DD": "&UnderParenthesis;", "\u22C3": "&xcup;", "\u228E": "&uplus;", "\u0172": "&Uogon;", "\u{1D54C}": "&Uopf;", "\u2912": "&UpArrowBar;", "\u21C5": "&udarr;", "\u2195": "&varr;", "\u296E": "&udhar;", "\u22A5": "&perp;", "\u21A5": "&mapstoup;", "\u2196": "&nwarrow;", "\u2197": "&nearrow;", "\u03D2": "&upsih;", "\u03A5": "&Upsilon;", "\u016E": "&Uring;", "\u{1D4B0}": "&Uscr;", "\u0168": "&Utilde;", "\xDC": "&Uuml;", "\u22AB": "&VDash;", "\u2AEB": "&Vbar;", "\u0412": "&Vcy;", "\u22A9": "&Vdash;", "\u2AE6": "&Vdashl;", "\u22C1": "&xvee;", "\u2016": "&Vert;", "\u2223": "&smid;", "|": "&vert;", "\u2758": "&VerticalSeparator;", "\u2240": "&wreath;", "\u200A": "&hairsp;", "\u{1D519}": "&Vfr;", "\u{1D54D}": "&Vopf;", "\u{1D4B1}": "&Vscr;", "\u22AA": "&Vvdash;", "\u0174": "&Wcirc;", "\u22C0": "&xwedge;", "\u{1D51A}": "&Wfr;", "\u{1D54E}": "&Wopf;", "\u{1D4B2}": "&Wscr;", "\u{1D51B}": "&Xfr;", "\u039E": "&Xi;", "\u{1D54F}": "&Xopf;", "\u{1D4B3}": "&Xscr;", "\u042F": "&YAcy;", "\u0407": "&YIcy;", "\u042E": "&YUcy;", "\xDD": "&Yacute;", "\u0176": "&Ycirc;", "\u042B": "&Ycy;", "\u{1D51C}": "&Yfr;", "\u{1D550}": "&Yopf;", "\u{1D4B4}": "&Yscr;", "\u0178": "&Yuml;", "\u0416": "&ZHcy;", "\u0179": "&Zacute;", "\u017D": "&Zcaron;", "\u0417": "&Zcy;", "\u017B": "&Zdot;", "\u0396": "&Zeta;", "\u2128": "&zeetrf;", "\u2124": "&integers;", "\u{1D4B5}": "&Zscr;", "\xE1": "&aacute;", "\u0103": "&abreve;", "\u223E": "&mstpos;", "\u223E\u0333": "&acE;", "\u223F": "&acd;", "\xE2": "&acirc;", "\u0430": "&acy;", "\xE6": "&aelig;", "\u{1D51E}": "&afr;", "\xE0": "&agrave;", "\u2135": "&aleph;", "\u03B1": "&alpha;", "\u0101": "&amacr;", "\u2A3F": "&amalg;", "\u2227": "&wedge;", "\u2A55": "&andand;", "\u2A5C": "&andd;", "\u2A58": "&andslope;", "\u2A5A": "&andv;", "\u2220": "&angle;", "\u29A4": "&ange;", "\u2221": "&measuredangle;", "\u29A8": "&angmsdaa;", "\u29A9": "&angmsdab;", "\u29AA": "&angmsdac;", "\u29AB": "&angmsdad;", "\u29AC": "&angmsdae;", "\u29AD": "&angmsdaf;", "\u29AE": "&angmsdag;", "\u29AF": "&angmsdah;", "\u221F": "&angrt;", "\u22BE": "&angrtvb;", "\u299D": "&angrtvbd;", "\u2222": "&angsph;", "\u237C": "&angzarr;", "\u0105": "&aogon;", "\u{1D552}": "&aopf;", "\u2A70": "&apE;", "\u2A6F": "&apacir;", "\u224A": "&approxeq;", "\u224B": "&apid;", "'": "&apos;", "\xE5": "&aring;", "\u{1D4B6}": "&ascr;", "*": "&midast;", "\xE3": "&atilde;", "\xE4": "&auml;", "\u2A11": "&awint;", "\u2AED": "&bNot;", "\u224C": "&bcong;", "\u03F6": "&bepsi;", "\u2035": "&bprime;", "\u223D": "&bsim;", "\u22CD": "&bsime;", "\u22BD": "&barvee;", "\u2305": "&barwedge;", "\u23B6": "&bbrktbrk;", "\u0431": "&bcy;", "\u201E": "&ldquor;", "\u29B0": "&bemptyv;", "\u03B2": "&beta;", "\u2136": "&beth;", "\u226C": "&twixt;", "\u{1D51F}": "&bfr;", "\u25EF": "&xcirc;", "\u2A00": "&xodot;", "\u2A01": "&xoplus;", "\u2A02": "&xotime;", "\u2A06": "&xsqcup;", "\u2605": "&starf;", "\u25BD": "&xdtri;", "\u25B3": "&xutri;", "\u2A04": "&xuplus;", "\u290D": "&rbarr;", "\u29EB": "&lozf;", "\u25B4": "&utrif;", "\u25BE": "&dtrif;", "\u25C2": "&ltrif;", "\u25B8": "&rtrif;", "\u2423": "&blank;", "\u2592": "&blk12;", "\u2591": "&blk14;", "\u2593": "&blk34;", "\u2588": "&block;", "=\u20E5": "&bne;", "\u2261\u20E5": "&bnequiv;", "\u2310": "&bnot;", "\u{1D553}": "&bopf;", "\u22C8": "&bowtie;", "\u2557": "&boxDL;", "\u2554": "&boxDR;", "\u2556": "&boxDl;", "\u2553": "&boxDr;", "\u2550": "&boxH;", "\u2566": "&boxHD;", "\u2569": "&boxHU;", "\u2564": "&boxHd;", "\u2567": "&boxHu;", "\u255D": "&boxUL;", "\u255A": "&boxUR;", "\u255C": "&boxUl;", "\u2559": "&boxUr;", "\u2551": "&boxV;", "\u256C": "&boxVH;", "\u2563": "&boxVL;", "\u2560": "&boxVR;", "\u256B": "&boxVh;", "\u2562": "&boxVl;", "\u255F": "&boxVr;", "\u29C9": "&boxbox;", "\u2555": "&boxdL;", "\u2552": "&boxdR;", "\u2510": "&boxdl;", "\u250C": "&boxdr;", "\u2565": "&boxhD;", "\u2568": "&boxhU;", "\u252C": "&boxhd;", "\u2534": "&boxhu;", "\u229F": "&minusb;", "\u229E": "&plusb;", "\u22A0": "&timesb;", "\u255B": "&boxuL;", "\u2558": "&boxuR;", "\u2518": "&boxul;", "\u2514": "&boxur;", "\u2502": "&boxv;", "\u256A": "&boxvH;", "\u2561": "&boxvL;", "\u255E": "&boxvR;", "\u253C": "&boxvh;", "\u2524": "&boxvl;", "\u251C": "&boxvr;", "\xA6": "&brvbar;", "\u{1D4B7}": "&bscr;", "\u204F": "&bsemi;", "\\": "&bsol;", "\u29C5": "&bsolb;", "\u27C8": "&bsolhsub;", "\u2022": "&bullet;", "\u2AAE": "&bumpE;", "\u0107": "&cacute;", "\u2229": "&cap;", "\u2A44": "&capand;", "\u2A49": "&capbrcup;", "\u2A4B": "&capcap;", "\u2A47": "&capcup;", "\u2A40": "&capdot;", "\u2229\uFE00": "&caps;", "\u2041": "&caret;", "\u2A4D": "&ccaps;", "\u010D": "&ccaron;", "\xE7": "&ccedil;", "\u0109": "&ccirc;", "\u2A4C": "&ccups;", "\u2A50": "&ccupssm;", "\u010B": "&cdot;", "\u29B2": "&cemptyv;", "\xA2": "&cent;", "\u{1D520}": "&cfr;", "\u0447": "&chcy;", "\u2713": "&checkmark;", "\u03C7": "&chi;", "\u25CB": "&cir;", "\u29C3": "&cirE;", "\u02C6": "&circ;", "\u2257": "&cire;", "\u21BA": "&olarr;", "\u21BB": "&orarr;", "\u24C8": "&oS;", "\u229B": "&oast;", "\u229A": "&ocir;", "\u229D": "&odash;", "\u2A10": "&cirfnint;", "\u2AEF": "&cirmid;", "\u29C2": "&cirscir;", "\u2663": "&clubsuit;", ":": "&colon;", ",": "&comma;", "@": "&commat;", "\u2201": "&complement;", "\u2A6D": "&congdot;", "\u{1D554}": "&copf;", "\u2117": "&copysr;", "\u21B5": "&crarr;", "\u2717": "&cross;", "\u{1D4B8}": "&cscr;", "\u2ACF": "&csub;", "\u2AD1": "&csube;", "\u2AD0": "&csup;", "\u2AD2": "&csupe;", "\u22EF": "&ctdot;", "\u2938": "&cudarrl;", "\u2935": "&cudarrr;", "\u22DE": "&curlyeqprec;", "\u22DF": "&curlyeqsucc;", "\u21B6": "&curvearrowleft;", "\u293D": "&cularrp;", "\u222A": "&cup;", "\u2A48": "&cupbrcap;", "\u2A46": "&cupcap;", "\u2A4A": "&cupcup;", "\u228D": "&cupdot;", "\u2A45": "&cupor;", "\u222A\uFE00": "&cups;", "\u21B7": "&curvearrowright;", "\u293C": "&curarrm;", "\u22CE": "&cuvee;", "\u22CF": "&cuwed;", "\xA4": "&curren;", "\u2231": "&cwint;", "\u232D": "&cylcty;", "\u2965": "&dHar;", "\u2020": "&dagger;", "\u2138": "&daleth;", "\u2010": "&hyphen;", "\u290F": "&rBarr;", "\u010F": "&dcaron;", "\u0434": "&dcy;", "\u21CA": "&downdownarrows;", "\u2A77": "&eDDot;", "\xB0": "&deg;", "\u03B4": "&delta;", "\u29B1": "&demptyv;", "\u297F": "&dfisht;", "\u{1D521}": "&dfr;", "\u2666": "&diams;", "\u03DD": "&gammad;", "\u22F2": "&disin;", "\xF7": "&divide;", "\u22C7": "&divonx;", "\u0452": "&djcy;", "\u231E": "&llcorner;", "\u230D": "&dlcrop;", $: "&dollar;", "\u{1D555}": "&dopf;", "\u2251": "&eDot;", "\u2238": "&minusd;", "\u2214": "&plusdo;", "\u22A1": "&sdotb;", "\u231F": "&lrcorner;", "\u230C": "&drcrop;", "\u{1D4B9}": "&dscr;", "\u0455": "&dscy;", "\u29F6": "&dsol;", "\u0111": "&dstrok;", "\u22F1": "&dtdot;", "\u25BF": "&triangledown;", "\u29A6": "&dwangle;", "\u045F": "&dzcy;", "\u27FF": "&dzigrarr;", "\xE9": "&eacute;", "\u2A6E": "&easter;", "\u011B": "&ecaron;", "\u2256": "&eqcirc;", "\xEA": "&ecirc;", "\u2255": "&eqcolon;", "\u044D": "&ecy;", "\u0117": "&edot;", "\u2252": "&fallingdotseq;", "\u{1D522}": "&efr;", "\u2A9A": "&eg;", "\xE8": "&egrave;", "\u2A96": "&eqslantgtr;", "\u2A98": "&egsdot;", "\u2A99": "&el;", "\u23E7": "&elinters;", "\u2113": "&ell;", "\u2A95": "&eqslantless;", "\u2A97": "&elsdot;", "\u0113": "&emacr;", "\u2205": "&varnothing;", "\u2004": "&emsp13;", "\u2005": "&emsp14;", "\u2003": "&emsp;", "\u014B": "&eng;", "\u2002": "&ensp;", "\u0119": "&eogon;", "\u{1D556}": "&eopf;", "\u22D5": "&epar;", "\u29E3": "&eparsl;", "\u2A71": "&eplus;", "\u03B5": "&epsilon;", "\u03F5": "&varepsilon;", "=": "&equals;", "\u225F": "&questeq;", "\u2A78": "&equivDD;", "\u29E5": "&eqvparsl;", "\u2253": "&risingdotseq;", "\u2971": "&erarr;", "\u212F": "&escr;", "\u03B7": "&eta;", "\xF0": "&eth;", "\xEB": "&euml;", "\u20AC": "&euro;", "!": "&excl;", "\u0444": "&fcy;", "\u2640": "&female;", "\uFB03": "&ffilig;", "\uFB00": "&fflig;", "\uFB04": "&ffllig;", "\u{1D523}": "&ffr;", "\uFB01": "&filig;", fj: "&fjlig;", "\u266D": "&flat;", "\uFB02": "&fllig;", "\u25B1": "&fltns;", "\u0192": "&fnof;", "\u{1D557}": "&fopf;", "\u22D4": "&pitchfork;", "\u2AD9": "&forkv;", "\u2A0D": "&fpartint;", "\xBD": "&half;", "\u2153": "&frac13;", "\xBC": "&frac14;", "\u2155": "&frac15;", "\u2159": "&frac16;", "\u215B": "&frac18;", "\u2154": "&frac23;", "\u2156": "&frac25;", "\xBE": "&frac34;", "\u2157": "&frac35;", "\u215C": "&frac38;", "\u2158": "&frac45;", "\u215A": "&frac56;", "\u215D": "&frac58;", "\u215E": "&frac78;", "\u2044": "&frasl;", "\u2322": "&sfrown;", "\u{1D4BB}": "&fscr;", "\u2A8C": "&gtreqqless;", "\u01F5": "&gacute;", "\u03B3": "&gamma;", "\u2A86": "&gtrapprox;", "\u011F": "&gbreve;", "\u011D": "&gcirc;", "\u0433": "&gcy;", "\u0121": "&gdot;", "\u2AA9": "&gescc;", "\u2A80": "&gesdot;", "\u2A82": "&gesdoto;", "\u2A84": "&gesdotol;", "\u22DB\uFE00": "&gesl;", "\u2A94": "&gesles;", "\u{1D524}": "&gfr;", "\u2137": "&gimel;", "\u0453": "&gjcy;", "\u2A92": "&glE;", "\u2AA5": "&gla;", "\u2AA4": "&glj;", "\u2269": "&gneqq;", "\u2A8A": "&gnapprox;", "\u2A88": "&gneq;", "\u22E7": "&gnsim;", "\u{1D558}": "&gopf;", "\u210A": "&gscr;", "\u2A8E": "&gsime;", "\u2A90": "&gsiml;", "\u2AA7": "&gtcc;", "\u2A7A": "&gtcir;", "\u22D7": "&gtrdot;", "\u2995": "&gtlPar;", "\u2A7C": "&gtquest;", "\u2978": "&gtrarr;", "\u2269\uFE00": "&gvnE;", "\u044A": "&hardcy;", "\u2948": "&harrcir;", "\u21AD": "&leftrightsquigarrow;", "\u210F": "&plankv;", "\u0125": "&hcirc;", "\u2665": "&heartsuit;", "\u2026": "&mldr;", "\u22B9": "&hercon;", "\u{1D525}": "&hfr;", "\u2925": "&searhk;", "\u2926": "&swarhk;", "\u21FF": "&hoarr;", "\u223B": "&homtht;", "\u21A9": "&larrhk;", "\u21AA": "&rarrhk;", "\u{1D559}": "&hopf;", "\u2015": "&horbar;", "\u{1D4BD}": "&hscr;", "\u0127": "&hstrok;", "\u2043": "&hybull;", "\xED": "&iacute;", "\xEE": "&icirc;", "\u0438": "&icy;", "\u0435": "&iecy;", "\xA1": "&iexcl;", "\u{1D526}": "&ifr;", "\xEC": "&igrave;", "\u2A0C": "&qint;", "\u222D": "&tint;", "\u29DC": "&iinfin;", "\u2129": "&iiota;", "\u0133": "&ijlig;", "\u012B": "&imacr;", "\u0131": "&inodot;", "\u22B7": "&imof;", "\u01B5": "&imped;", "\u2105": "&incare;", "\u221E": "&infin;", "\u29DD": "&infintie;", "\u22BA": "&intercal;", "\u2A17": "&intlarhk;", "\u2A3C": "&iprod;", "\u0451": "&iocy;", "\u012F": "&iogon;", "\u{1D55A}": "&iopf;", "\u03B9": "&iota;", "\xBF": "&iquest;", "\u{1D4BE}": "&iscr;", "\u22F9": "&isinE;", "\u22F5": "&isindot;", "\u22F4": "&isins;", "\u22F3": "&isinsv;", "\u0129": "&itilde;", "\u0456": "&iukcy;", "\xEF": "&iuml;", "\u0135": "&jcirc;", "\u0439": "&jcy;", "\u{1D527}": "&jfr;", "\u0237": "&jmath;", "\u{1D55B}": "&jopf;", "\u{1D4BF}": "&jscr;", "\u0458": "&jsercy;", "\u0454": "&jukcy;", "\u03BA": "&kappa;", "\u03F0": "&varkappa;", "\u0137": "&kcedil;", "\u043A": "&kcy;", "\u{1D528}": "&kfr;", "\u0138": "&kgreen;", "\u0445": "&khcy;", "\u045C": "&kjcy;", "\u{1D55C}": "&kopf;", "\u{1D4C0}": "&kscr;", "\u291B": "&lAtail;", "\u290E": "&lBarr;", "\u2A8B": "&lesseqqgtr;", "\u2962": "&lHar;", "\u013A": "&lacute;", "\u29B4": "&laemptyv;", "\u03BB": "&lambda;", "\u2991": "&langd;", "\u2A85": "&lessapprox;", "\xAB": "&laquo;", "\u291F": "&larrbfs;", "\u291D": "&larrfs;", "\u21AB": "&looparrowleft;", "\u2939": "&larrpl;", "\u2973": "&larrsim;", "\u21A2": "&leftarrowtail;", "\u2AAB": "&lat;", "\u2919": "&latail;", "\u2AAD": "&late;", "\u2AAD\uFE00": "&lates;", "\u290C": "&lbarr;", "\u2772": "&lbbrk;", "{": "&lcub;", "[": "&lsqb;", "\u298B": "&lbrke;", "\u298F": "&lbrksld;", "\u298D": "&lbrkslu;", "\u013E": "&lcaron;", "\u013C": "&lcedil;", "\u043B": "&lcy;", "\u2936": "&ldca;", "\u2967": "&ldrdhar;", "\u294B": "&ldrushar;", "\u21B2": "&ldsh;", "\u2264": "&leq;", "\u21C7": "&llarr;", "\u22CB": "&lthree;", "\u2AA8": "&lescc;", "\u2A7F": "&lesdot;", "\u2A81": "&lesdoto;", "\u2A83": "&lesdotor;", "\u22DA\uFE00": "&lesg;", "\u2A93": "&lesges;", "\u22D6": "&ltdot;", "\u297C": "&lfisht;", "\u{1D529}": "&lfr;", "\u2A91": "&lgE;", "\u296A": "&lharul;", "\u2584": "&lhblk;", "\u0459": "&ljcy;", "\u296B": "&llhard;", "\u25FA": "&lltri;", "\u0140": "&lmidot;", "\u23B0": "&lmoustache;", "\u2268": "&lneqq;", "\u2A89": "&lnapprox;", "\u2A87": "&lneq;", "\u22E6": "&lnsim;", "\u27EC": "&loang;", "\u21FD": "&loarr;", "\u27FC": "&xmap;", "\u21AC": "&rarrlp;", "\u2985": "&lopar;", "\u{1D55D}": "&lopf;", "\u2A2D": "&loplus;", "\u2A34": "&lotimes;", "\u2217": "&lowast;", "\u25CA": "&lozenge;", "(": "&lpar;", "\u2993": "&lparlt;", "\u296D": "&lrhard;", "\u200E": "&lrm;", "\u22BF": "&lrtri;", "\u2039": "&lsaquo;", "\u{1D4C1}": "&lscr;", "\u2A8D": "&lsime;", "\u2A8F": "&lsimg;", "\u201A": "&sbquo;", "\u0142": "&lstrok;", "\u2AA6": "&ltcc;", "\u2A79": "&ltcir;", "\u22C9": "&ltimes;", "\u2976": "&ltlarr;", "\u2A7B": "&ltquest;", "\u2996": "&ltrPar;", "\u25C3": "&triangleleft;", "\u294A": "&lurdshar;", "\u2966": "&luruhar;", "\u2268\uFE00": "&lvnE;", "\u223A": "&mDDot;", "\xAF": "&strns;", "\u2642": "&male;", "\u2720": "&maltese;", "\u25AE": "&marker;", "\u2A29": "&mcomma;", "\u043C": "&mcy;", "\u2014": "&mdash;", "\u{1D52A}": "&mfr;", "\u2127": "&mho;", "\xB5": "&micro;", "\u2AF0": "&midcir;", "\u2212": "&minus;", "\u2A2A": "&minusdu;", "\u2ADB": "&mlcp;", "\u22A7": "&models;", "\u{1D55E}": "&mopf;", "\u{1D4C2}": "&mscr;", "\u03BC": "&mu;", "\u22B8": "&mumap;", "\u22D9\u0338": "&nGg;", "\u226B\u20D2": "&nGt;", "\u21CD": "&nlArr;", "\u21CE": "&nhArr;", "\u22D8\u0338": "&nLl;", "\u226A\u20D2": "&nLt;", "\u21CF": "&nrArr;", "\u22AF": "&nVDash;", "\u22AE": "&nVdash;", "\u0144": "&nacute;", "\u2220\u20D2": "&nang;", "\u2A70\u0338": "&napE;", "\u224B\u0338": "&napid;", "\u0149": "&napos;", "\u266E": "&natural;", "\u2A43": "&ncap;", "\u0148": "&ncaron;", "\u0146": "&ncedil;", "\u2A6D\u0338": "&ncongdot;", "\u2A42": "&ncup;", "\u043D": "&ncy;", "\u2013": "&ndash;", "\u21D7": "&neArr;", "\u2924": "&nearhk;", "\u2250\u0338": "&nedot;", "\u2928": "&toea;", "\u{1D52B}": "&nfr;", "\u21AE": "&nleftrightarrow;", "\u2AF2": "&nhpar;", "\u22FC": "&nis;", "\u22FA": "&nisd;", "\u045A": "&njcy;", "\u2266\u0338": "&nleqq;", "\u219A": "&nleftarrow;", "\u2025": "&nldr;", "\u{1D55F}": "&nopf;", "\xAC": "&not;", "\u22F9\u0338": "&notinE;", "\u22F5\u0338": "&notindot;", "\u22F7": "&notinvb;", "\u22F6": "&notinvc;", "\u22FE": "&notnivb;", "\u22FD": "&notnivc;", "\u2AFD\u20E5": "&nparsl;", "\u2202\u0338": "&npart;", "\u2A14": "&npolint;", "\u219B": "&nrightarrow;", "\u2933\u0338": "&nrarrc;", "\u219D\u0338": "&nrarrw;", "\u{1D4C3}": "&nscr;", "\u2284": "&nsub;", "\u2AC5\u0338": "&nsubseteqq;", "\u2285": "&nsup;", "\u2AC6\u0338": "&nsupseteqq;", "\xF1": "&ntilde;", "\u03BD": "&nu;", "#": "&num;", "\u2116": "&numero;", "\u2007": "&numsp;", "\u22AD": "&nvDash;", "\u2904": "&nvHarr;", "\u224D\u20D2": "&nvap;", "\u22AC": "&nvdash;", "\u2265\u20D2": "&nvge;", ">\u20D2": "&nvgt;", "\u29DE": "&nvinfin;", "\u2902": "&nvlArr;", "\u2264\u20D2": "&nvle;", "<\u20D2": "&nvlt;", "\u22B4\u20D2": "&nvltrie;", "\u2903": "&nvrArr;", "\u22B5\u20D2": "&nvrtrie;", "\u223C\u20D2": "&nvsim;", "\u21D6": "&nwArr;", "\u2923": "&nwarhk;", "\u2927": "&nwnear;", "\xF3": "&oacute;", "\xF4": "&ocirc;", "\u043E": "&ocy;", "\u0151": "&odblac;", "\u2A38": "&odiv;", "\u29BC": "&odsold;", "\u0153": "&oelig;", "\u29BF": "&ofcir;", "\u{1D52C}": "&ofr;", "\u02DB": "&ogon;", "\xF2": "&ograve;", "\u29C1": "&ogt;", "\u29B5": "&ohbar;", "\u29BE": "&olcir;", "\u29BB": "&olcross;", "\u29C0": "&olt;", "\u014D": "&omacr;", "\u03C9": "&omega;", "\u03BF": "&omicron;", "\u29B6": "&omid;", "\u{1D560}": "&oopf;", "\u29B7": "&opar;", "\u29B9": "&operp;", "\u2228": "&vee;", "\u2A5D": "&ord;", "\u2134": "&oscr;", "\xAA": "&ordf;", "\xBA": "&ordm;", "\u22B6": "&origof;", "\u2A56": "&oror;", "\u2A57": "&orslope;", "\u2A5B": "&orv;", "\xF8": "&oslash;", "\u2298": "&osol;", "\xF5": "&otilde;", "\u2A36": "&otimesas;", "\xF6": "&ouml;", "\u233D": "&ovbar;", "\xB6": "&para;", "\u2AF3": "&parsim;", "\u2AFD": "&parsl;", "\u043F": "&pcy;", "%": "&percnt;", ".": "&period;", "\u2030": "&permil;", "\u2031": "&pertenk;", "\u{1D52D}": "&pfr;", "\u03C6": "&phi;", "\u03D5": "&varphi;", "\u260E": "&phone;", "\u03C0": "&pi;", "\u03D6": "&varpi;", "\u210E": "&planckh;", "+": "&plus;", "\u2A23": "&plusacir;", "\u2A22": "&pluscir;", "\u2A25": "&plusdu;", "\u2A72": "&pluse;", "\u2A26": "&plussim;", "\u2A27": "&plustwo;", "\u2A15": "&pointint;", "\u{1D561}": "&popf;", "\xA3": "&pound;", "\u2AB3": "&prE;", "\u2AB7": "&precapprox;", "\u2AB9": "&prnap;", "\u2AB5": "&prnE;", "\u22E8": "&prnsim;", "\u2032": "&prime;", "\u232E": "&profalar;", "\u2312": "&profline;", "\u2313": "&profsurf;", "\u22B0": "&prurel;", "\u{1D4C5}": "&pscr;", "\u03C8": "&psi;", "\u2008": "&puncsp;", "\u{1D52E}": "&qfr;", "\u{1D562}": "&qopf;", "\u2057": "&qprime;", "\u{1D4C6}": "&qscr;", "\u2A16": "&quatint;", "?": "&quest;", "\u291C": "&rAtail;", "\u2964": "&rHar;", "\u223D\u0331": "&race;", "\u0155": "&racute;", "\u29B3": "&raemptyv;", "\u2992": "&rangd;", "\u29A5": "&range;", "\xBB": "&raquo;", "\u2975": "&rarrap;", "\u2920": "&rarrbfs;", "\u2933": "&rarrc;", "\u291E": "&rarrfs;", "\u2945": "&rarrpl;", "\u2974": "&rarrsim;", "\u21A3": "&rightarrowtail;", "\u219D": "&rightsquigarrow;", "\u291A": "&ratail;", "\u2236": "&ratio;", "\u2773": "&rbbrk;", "}": "&rcub;", "]": "&rsqb;", "\u298C": "&rbrke;", "\u298E": "&rbrksld;", "\u2990": "&rbrkslu;", "\u0159": "&rcaron;", "\u0157": "&rcedil;", "\u0440": "&rcy;", "\u2937": "&rdca;", "\u2969": "&rdldhar;", "\u21B3": "&rdsh;", "\u25AD": "&rect;", "\u297D": "&rfisht;", "\u{1D52F}": "&rfr;", "\u296C": "&rharul;", "\u03C1": "&rho;", "\u03F1": "&varrho;", "\u21C9": "&rrarr;", "\u22CC": "&rthree;", "\u02DA": "&ring;", "\u200F": "&rlm;", "\u23B1": "&rmoustache;", "\u2AEE": "&rnmid;", "\u27ED": "&roang;", "\u21FE": "&roarr;", "\u2986": "&ropar;", "\u{1D563}": "&ropf;", "\u2A2E": "&roplus;", "\u2A35": "&rotimes;", ")": "&rpar;", "\u2994": "&rpargt;", "\u2A12": "&rppolint;", "\u203A": "&rsaquo;", "\u{1D4C7}": "&rscr;", "\u22CA": "&rtimes;", "\u25B9": "&triangleright;", "\u29CE": "&rtriltri;", "\u2968": "&ruluhar;", "\u211E": "&rx;", "\u015B": "&sacute;", "\u2AB4": "&scE;", "\u2AB8": "&succapprox;", "\u0161": "&scaron;", "\u015F": "&scedil;", "\u015D": "&scirc;", "\u2AB6": "&succneqq;", "\u2ABA": "&succnapprox;", "\u22E9": "&succnsim;", "\u2A13": "&scpolint;", "\u0441": "&scy;", "\u22C5": "&sdot;", "\u2A66": "&sdote;", "\u21D8": "&seArr;", "\xA7": "&sect;", ";": "&semi;", "\u2929": "&tosa;", "\u2736": "&sext;", "\u{1D530}": "&sfr;", "\u266F": "&sharp;", "\u0449": "&shchcy;", "\u0448": "&shcy;", "\xAD": "&shy;", "\u03C3": "&sigma;", "\u03C2": "&varsigma;", "\u2A6A": "&simdot;", "\u2A9E": "&simg;", "\u2AA0": "&simgE;", "\u2A9D": "&siml;", "\u2A9F": "&simlE;", "\u2246": "&simne;", "\u2A24": "&simplus;", "\u2972": "&simrarr;", "\u2A33": "&smashp;", "\u29E4": "&smeparsl;", "\u2323": "&ssmile;", "\u2AAA": "&smt;", "\u2AAC": "&smte;", "\u2AAC\uFE00": "&smtes;", "\u044C": "&softcy;", "/": "&sol;", "\u29C4": "&solb;", "\u233F": "&solbar;", "\u{1D564}": "&sopf;", "\u2660": "&spadesuit;", "\u2293\uFE00": "&sqcaps;", "\u2294\uFE00": "&sqcups;", "\u{1D4C8}": "&sscr;", "\u2606": "&star;", "\u2282": "&subset;", "\u2AC5": "&subseteqq;", "\u2ABD": "&subdot;", "\u2AC3": "&subedot;", "\u2AC1": "&submult;", "\u2ACB": "&subsetneqq;", "\u228A": "&subsetneq;", "\u2ABF": "&subplus;", "\u2979": "&subrarr;", "\u2AC7": "&subsim;", "\u2AD5": "&subsub;", "\u2AD3": "&subsup;", "\u266A": "&sung;", "\xB9": "&sup1;", "\xB2": "&sup2;", "\xB3": "&sup3;", "\u2AC6": "&supseteqq;", "\u2ABE": "&supdot;", "\u2AD8": "&supdsub;", "\u2AC4": "&supedot;", "\u27C9": "&suphsol;", "\u2AD7": "&suphsub;", "\u297B": "&suplarr;", "\u2AC2": "&supmult;", "\u2ACC": "&supsetneqq;", "\u228B": "&supsetneq;", "\u2AC0": "&supplus;", "\u2AC8": "&supsim;", "\u2AD4": "&supsub;", "\u2AD6": "&supsup;", "\u21D9": "&swArr;", "\u292A": "&swnwar;", "\xDF": "&szlig;", "\u2316": "&target;", "\u03C4": "&tau;", "\u0165": "&tcaron;", "\u0163": "&tcedil;", "\u0442": "&tcy;", "\u2315": "&telrec;", "\u{1D531}": "&tfr;", "\u03B8": "&theta;", "\u03D1": "&vartheta;", "\xFE": "&thorn;", "\xD7": "&times;", "\u2A31": "&timesbar;", "\u2A30": "&timesd;", "\u2336": "&topbot;", "\u2AF1": "&topcir;", "\u{1D565}": "&topf;", "\u2ADA": "&topfork;", "\u2034": "&tprime;", "\u25B5": "&utri;", "\u225C": "&trie;", "\u25EC": "&tridot;", "\u2A3A": "&triminus;", "\u2A39": "&triplus;", "\u29CD": "&trisb;", "\u2A3B": "&tritime;", "\u23E2": "&trpezium;", "\u{1D4C9}": "&tscr;", "\u0446": "&tscy;", "\u045B": "&tshcy;", "\u0167": "&tstrok;", "\u2963": "&uHar;", "\xFA": "&uacute;", "\u045E": "&ubrcy;", "\u016D": "&ubreve;", "\xFB": "&ucirc;", "\u0443": "&ucy;", "\u0171": "&udblac;", "\u297E": "&ufisht;", "\u{1D532}": "&ufr;", "\xF9": "&ugrave;", "\u2580": "&uhblk;", "\u231C": "&ulcorner;", "\u230F": "&ulcrop;", "\u25F8": "&ultri;", "\u016B": "&umacr;", "\u0173": "&uogon;", "\u{1D566}": "&uopf;", "\u03C5": "&upsilon;", "\u21C8": "&uuarr;", "\u231D": "&urcorner;", "\u230E": "&urcrop;", "\u016F": "&uring;", "\u25F9": "&urtri;", "\u{1D4CA}": "&uscr;", "\u22F0": "&utdot;", "\u0169": "&utilde;", "\xFC": "&uuml;", "\u29A7": "&uwangle;", "\u2AE8": "&vBar;", "\u2AE9": "&vBarv;", "\u299C": "&vangrt;", "\u228A\uFE00": "&vsubne;", "\u2ACB\uFE00": "&vsubnE;", "\u228B\uFE00": "&vsupne;", "\u2ACC\uFE00": "&vsupnE;", "\u0432": "&vcy;", "\u22BB": "&veebar;", "\u225A": "&veeeq;", "\u22EE": "&vellip;", "\u{1D533}": "&vfr;", "\u{1D567}": "&vopf;", "\u{1D4CB}": "&vscr;", "\u299A": "&vzigzag;", "\u0175": "&wcirc;", "\u2A5F": "&wedbar;", "\u2259": "&wedgeq;", "\u2118": "&wp;", "\u{1D534}": "&wfr;", "\u{1D568}": "&wopf;", "\u{1D4CC}": "&wscr;", "\u{1D535}": "&xfr;", "\u03BE": "&xi;", "\u22FB": "&xnis;", "\u{1D569}": "&xopf;", "\u{1D4CD}": "&xscr;", "\xFD": "&yacute;", "\u044F": "&yacy;", "\u0177": "&ycirc;", "\u044B": "&ycy;", "\xA5": "&yen;", "\u{1D536}": "&yfr;", "\u0457": "&yicy;", "\u{1D56A}": "&yopf;", "\u{1D4CE}": "&yscr;", "\u044E": "&yucy;", "\xFF": "&yuml;", "\u017A": "&zacute;", "\u017E": "&zcaron;", "\u0437": "&zcy;", "\u017C": "&zdot;", "\u03B6": "&zeta;", "\u{1D537}": "&zfr;", "\u0436": "&zhcy;", "\u21DD": "&zigrarr;", "\u{1D56B}": "&zopf;", "\u{1D4CF}": "&zscr;", "\u200D": "&zwj;", "\u200C": "&zwnj;" } } };
    } });
    var require_numeric_unicode_map = __commonJS2({ "node_modules/html-entities/lib/numeric-unicode-map.js": function node_modulesHtmlEntitiesLibNumericUnicodeMapJs(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.numericUnicodeMap = { 0: 65533, 128: 8364, 130: 8218, 131: 402, 132: 8222, 133: 8230, 134: 8224, 135: 8225, 136: 710, 137: 8240, 138: 352, 139: 8249, 140: 338, 142: 381, 145: 8216, 146: 8217, 147: 8220, 148: 8221, 149: 8226, 150: 8211, 151: 8212, 152: 732, 153: 8482, 154: 353, 155: 8250, 156: 339, 158: 382, 159: 376 };
    } });
    var require_surrogate_pairs = __commonJS2({ "node_modules/html-entities/lib/surrogate-pairs.js": function node_modulesHtmlEntitiesLibSurrogatePairsJs(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fromCodePoint = String.fromCodePoint || function(astralCodePoint) {
        return String.fromCharCode(Math.floor((astralCodePoint - 65536) / 1024) + 55296, (astralCodePoint - 65536) % 1024 + 56320);
      };
      exports.getCodePoint = String.prototype.codePointAt ? function(input, position) {
        return input.codePointAt(position);
      } : function(input, position) {
        return (input.charCodeAt(position) - 55296) * 1024 + input.charCodeAt(position + 1) - 56320 + 65536;
      };
      exports.highSurrogateFrom = 55296;
      exports.highSurrogateTo = 56319;
    } });
    var require_lib2 = __commonJS2({ "node_modules/html-entities/lib/index.js": function node_modulesHtmlEntitiesLibIndexJs(exports) {
      "use strict";
      var __assign = exports && exports.__assign || function() {
        __assign = Object.assign || function(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
              if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
          }
          return t;
        };
        return __assign.apply(this, arguments);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var named_references_1 = require_named_references();
      var numeric_unicode_map_1 = require_numeric_unicode_map();
      var surrogate_pairs_1 = require_surrogate_pairs();
      var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), { all: named_references_1.namedReferences.html5 });
      function replaceUsingRegExp(macroText, macroRegExp, macroReplacer) {
        macroRegExp.lastIndex = 0;
        var replaceMatch = macroRegExp.exec(macroText);
        var replaceResult;
        if (replaceMatch) {
          replaceResult = "";
          var replaceLastIndex = 0;
          do {
            if (replaceLastIndex !== replaceMatch.index) {
              replaceResult += macroText.substring(replaceLastIndex, replaceMatch.index);
            }
            var replaceInput = replaceMatch[0];
            replaceResult += macroReplacer(replaceInput);
            replaceLastIndex = replaceMatch.index + replaceInput.length;
          } while (replaceMatch = macroRegExp.exec(macroText));
          if (replaceLastIndex !== macroText.length) {
            replaceResult += macroText.substring(replaceLastIndex);
          }
        } else {
          replaceResult = macroText;
        }
        return replaceResult;
      }
      var encodeRegExps = { specialChars: /[<>'"&]/g, nonAscii: /[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g, nonAsciiPrintable: /[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g, nonAsciiPrintableOnly: /[\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g, extensive: /[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/g };
      var defaultEncodeOptions = { mode: "specialChars", level: "all", numeric: "decimal" };
      function encode(text, _a) {
        var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? "specialChars" : _c, _d = _b.numeric, numeric = _d === void 0 ? "decimal" : _d, _e = _b.level, level = _e === void 0 ? "all" : _e;
        if (!text) {
          return "";
        }
        var encodeRegExp = encodeRegExps[mode];
        var references = allNamedReferences[level].characters;
        var isHex = numeric === "hexadecimal";
        return replaceUsingRegExp(text, encodeRegExp, function(input) {
          var result2 = references[input];
          if (!result2) {
            var code = input.length > 1 ? surrogate_pairs_1.getCodePoint(input, 0) : input.charCodeAt(0);
            result2 = (isHex ? "&#x" + code.toString(16) : "&#" + code) + ";";
          }
          return result2;
        });
      }
      exports.encode = encode;
      var defaultDecodeOptions = { scope: "body", level: "all" };
      var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
      var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
      var baseDecodeRegExps = { xml: { strict, attribute, body: named_references_1.bodyRegExps.xml }, html4: { strict, attribute, body: named_references_1.bodyRegExps.html4 }, html5: { strict, attribute, body: named_references_1.bodyRegExps.html5 } };
      var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), { all: baseDecodeRegExps.html5 });
      var fromCharCode = String.fromCharCode;
      var outOfBoundsChar = fromCharCode(65533);
      var defaultDecodeEntityOptions = { level: "all" };
      function getDecodedEntity(entity, references, isAttribute, isStrict) {
        var decodeResult = entity;
        var decodeEntityLastChar = entity[entity.length - 1];
        if (isAttribute && decodeEntityLastChar === "=") {
          decodeResult = entity;
        } else if (isStrict && decodeEntityLastChar !== ";") {
          decodeResult = entity;
        } else {
          var decodeResultByReference = references[entity];
          if (decodeResultByReference) {
            decodeResult = decodeResultByReference;
          } else if (entity[0] === "&" && entity[1] === "#") {
            var decodeSecondChar = entity[2];
            var decodeCode = decodeSecondChar == "x" || decodeSecondChar == "X" ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));
            decodeResult = decodeCode >= 1114111 ? outOfBoundsChar : decodeCode > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode] || decodeCode);
          }
        }
        return decodeResult;
      }
      function decodeEntity(entity, _a) {
        var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? "all" : _b;
        if (!entity) {
          return "";
        }
        return getDecodedEntity(entity, allNamedReferences[level].entities, false, false);
      }
      exports.decodeEntity = decodeEntity;
      function decode(text, _a) {
        var _b = _a === void 0 ? defaultDecodeOptions : _a, _c = _b.level, level = _c === void 0 ? "all" : _c, _d = _b.scope, scope = _d === void 0 ? level === "xml" ? "strict" : "body" : _d;
        if (!text) {
          return "";
        }
        var decodeRegExp = decodeRegExps[level][scope];
        var references = allNamedReferences[level].entities;
        var isAttribute = scope === "attribute";
        var isStrict = scope === "strict";
        return replaceUsingRegExp(text, decodeRegExp, function(entity) {
          return getDecodedEntity(entity, references, isAttribute, isStrict);
        });
      }
      exports.decode = decode;
    } });
    var require_CONST = __commonJS2({ "node_modules/expensify-common/dist/CONST.js": function node_modulesExpensifyCommonDistCONSTJs(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PUBLIC_DOMAINS = exports.UI = exports.CONST = exports.g_cloudFrontImg = exports.g_cloudFront = void 0;
      var EMAIL_BASE_REGEX = "(?=((?=[\\w'#%+-]+(?:\\.[\\w'#%+-]+)*@)[\\w\\.'#%+-]{1,64}@(?:(?=[a-z\\d]+(?:-+[a-z\\d]+)*\\.)(?:[a-z\\d-]{1,63}\\.)+[a-z]{2,63})(?= |_|\\b))(?<end>.*))\\S{3,254}(?=\\k<end>$)";
      var MOMENT_FORMAT_STRING = "YYYY-MM-DD";
      var g_cloudFront = "https://d2k5nsl2zxldvw.cloudfront.net";
      exports.g_cloudFront = g_cloudFront;
      var g_cloudFrontImg = `${g_cloudFront}/images/`;
      exports.g_cloudFrontImg = g_cloudFrontImg;
      var CONST = { CORPAY_DIRECT_REIMBURSEMENT_CURRENCIES: ["USD", "GBP", "EUR", "AUD", "CAD"], ACH_DEFAULT_MAX_AMOUNT_LIMIT: 2e6, MILEAGE_IRS_RATE: /* @__PURE__ */ new Date() > new Date(2019, 1, 1) ? 0.545 : 0.58, MAX_TRIAL_BONUS_DAYS: 42, COUNTRY: { US: "US", AU: "AU", UK: "UK", NZ: "NZ" }, CURRENCIES: { US: "USD", AU: "AUD", UK: "GBP", NZ: "NZD" }, STATES: { AK: { stateISO: "AK", stateName: "Alaska" }, AL: { stateISO: "AL", stateName: "Alabama" }, AR: { stateISO: "AR", stateName: "Arkansas" }, AZ: { stateISO: "AZ", stateName: "Arizona" }, CA: { stateISO: "CA", stateName: "California" }, CO: { stateISO: "CO", stateName: "Colorado" }, CT: { stateISO: "CT", stateName: "Connecticut" }, DE: { stateISO: "DE", stateName: "Delaware" }, FL: { stateISO: "FL", stateName: "Florida" }, GA: { stateISO: "GA", stateName: "Georgia" }, HI: { stateISO: "HI", stateName: "Hawaii" }, IA: { stateISO: "IA", stateName: "Iowa" }, ID: { stateISO: "ID", stateName: "Idaho" }, IL: { stateISO: "IL", stateName: "Illinois" }, IN: { stateISO: "IN", stateName: "Indiana" }, KS: { stateISO: "KS", stateName: "Kansas" }, KY: { stateISO: "KY", stateName: "Kentucky" }, LA: { stateISO: "LA", stateName: "Louisiana" }, MA: { stateISO: "MA", stateName: "Massachusetts" }, MD: { stateISO: "MD", stateName: "Maryland" }, ME: { stateISO: "ME", stateName: "Maine" }, MI: { stateISO: "MI", stateName: "Michigan" }, MN: { stateISO: "MN", stateName: "Minnesota" }, MO: { stateISO: "MO", stateName: "Missouri" }, MS: { stateISO: "MS", stateName: "Mississippi" }, MT: { stateISO: "MT", stateName: "Montana" }, NC: { stateISO: "NC", stateName: "North Carolina" }, ND: { stateISO: "ND", stateName: "North Dakota" }, NE: { stateISO: "NE", stateName: "Nebraska" }, NH: { stateISO: "NH", stateName: "New Hampshire" }, NJ: { stateISO: "NJ", stateName: "New Jersey" }, NM: { stateISO: "NM", stateName: "New Mexico" }, NV: { stateISO: "NV", stateName: "Nevada" }, NY: { stateISO: "NY", stateName: "New York" }, OH: { stateISO: "OH", stateName: "Ohio" }, OK: { stateISO: "OK", stateName: "Oklahoma" }, OR: { stateISO: "OR", stateName: "Oregon" }, PA: { stateISO: "PA", stateName: "Pennsylvania" }, PR: { stateISO: "PR", stateName: "Puerto Rico" }, RI: { stateISO: "RI", stateName: "Rhode Island" }, SC: { stateISO: "SC", stateName: "South Carolina" }, SD: { stateISO: "SD", stateName: "South Dakota" }, TN: { stateISO: "TN", stateName: "Tennessee" }, TX: { stateISO: "TX", stateName: "Texas" }, UT: { stateISO: "UT", stateName: "Utah" }, VA: { stateISO: "VA", stateName: "Virginia" }, VT: { stateISO: "VT", stateName: "Vermont" }, WA: { stateISO: "WA", stateName: "Washington" }, WI: { stateISO: "WI", stateName: "Wisconsin" }, WV: { stateISO: "WV", stateName: "West Virginia" }, WY: { stateISO: "WY", stateName: "Wyoming" }, DC: { stateISO: "DC", stateName: "District Of Columbia" } }, SPECIAL_CHARS_TO_REMOVE: "$*.+!(,=", REG_EXP: { DOMAIN: /^[\w-\.]*\.\w{2,}$/, EMAIL_PART: EMAIL_BASE_REGEX, GENERAL_PHONE_PART: /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/, PHONE_PART: "\\+[1-9]\\d{1,14}", FREE_NAME: /^[^\r\n\t]{1,256}$/, MASKED_CARD: /^\d{0,6}[X]+\d{4,7}$/, EMAIL: new RegExp(`^${EMAIL_BASE_REGEX}$`, "i"), EXTRACT_EMAIL: new RegExp(EMAIL_BASE_REGEX, "gi"), EMAIL_SEARCH: new RegExp(EMAIL_BASE_REGEX, "gi"), HYPERLINK: new RegExp("^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?))(?::\\d{2,5})?(?:[/?#]\\S*)?$", "i"), MARKDOWN_EMAIL: EMAIL_BASE_REGEX, EMOJIS: /(?:[\xA9\xAE\u200D\u203C\u2049\u20E3\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299\uFE0F]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDFF\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFF]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD]|\uDB40[\uDC20-\uDC7F])|[#\*0-9]\uFE0F?\u20E3/g, EMOJI_RULE: /(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])(\u200D(?:[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u2388\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2605\u2607-\u2612\u2614-\u2685\u2690-\u2705\u2708-\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763-\u2767\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC00-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDAD-\uDDE5\uDE01-\uDE0F\uDE1A\uDE2F\uDE32-\uDE3A\uDE3C-\uDE3F\uDE49-\uDFFA]|\uD83D[\uDC00-\uDD3D\uDD46-\uDE4F\uDE80-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDCFF\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDEFF]|\uD83F[\uDC00-\uDFFD])|(?:\uD83C[\uDFFB-\uDFFF])|(?:\uDB40[\uDC20-\uDC7F])|\uFE0F|\u20E3)*|(?:\uD83C[\uDDE6-\uDDFF]){2}|[#\*0-9]\uFE0F?\u20E3/g }, REPORT: { LIMIT_PRINT_PDF: 250, ACH_LIMIT: 2e6, ACH_DEFAULT_DAYS: 4, TITLE_FORMULA: "{report:title}", MAX_AGE_SAME_COMMENT: 300, SMARTREPORT_AGENT_EMAIL: "smartreports@expensify.com" }, URL: { FORUM_ROOT: "https://community.expensify.com/", RECEIPTS: { DEVELOPMENT: "https://www.expensify.com.dev/receipts/", STAGING: "https://staging.expensify.com/receipts/", PRODUCTION: "https://www.expensify.com/receipts/" }, CLOUDFRONT: "https://d2k5nsl2zxldvw.cloudfront.net", CLOUDFRONT_IMG: "https://d2k5nsl2zxldvw.cloudfront.net/images/", CLOUDFRONT_FILES: "https://d2k5nsl2zxldvw.cloudfront.net/files/", EXPENSIFY_SYNC_MANAGER: "quickbooksdesktop/Expensify_QuickBooksDesktop_Setup_2300802.exe", USEDOT_ROOT: "https://use.expensify.com/", ITUNES_SUBSCRIPTION: "https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions" }, DATE: { FORMAT_STRING: "yyyy-MM-dd", FORMAT_STRING_PRETTY: "MMM d, yyyy", MOMENT_FORMAT_STRING, MOMENT_DATE_TIME: "YYYY-MM-DD HH:mm", MOMENT_DATE_TIME_PRETTY: "MMM DD YYYY h:mma", MOMENT_DATE_TIME_TIMEZONE: "YYYY-MM-DDTHH:mm:ssZ", MOMENT_US_DATE: "MMM D, YYYY", MOMENT_US_DATE_LONG: "MMMM D, YYYY", MOMENT_US_MONTH_YEAR_LONG: "MMMM YYYY", TIMEZONE_OFFSET_MS: (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4, SHORT_MONTH_SHORT_DAY: "MMM d", LONG_YEAR_MONTH_DAY_24_TIME: "yyyy-MM-dd HH:mm:ss", SHORT_MONTH_DAY_LOCAL_TIME: "MMM D [at] LT", SHORT_MONTH_DAY_YEAR_LOCAL_TIME: "MMM D, YYYY [at] LT" }, FUNC_DIE_MESSAGE: "Aborting JavaScript execution", EMAIL_DELIVERY_FAILURE_VALIDITY: 1209600, BILL_PROCESSING_PARTNER_NAME: "expensify.cash", BILL_PROCESSING_EMAIL_DOMAIN: "expensify.cash", BANK_IMPORT: { BANK_STATUS_BROKEN: 2 }, BANK_ACCOUNT: { VERIFICATION_MAX_ATTEMPTS: 7 }, EXPENSIFY_EMAILS: ["concierge@expensify.com", "help@expensify.com", "receipts@expensify.com", "chronos@expensify.com", "qa@expensify.com", "contributors@expensify.com", "firstresponders@expensify.com", "qa+travisreceipts@expensify.com", "bills@expensify.com", "studentambassadors@expensify.com", "accounting@expensify.com", "payroll@expensify.com", "svfg@expensify.com", "integrationtestingcreds@expensify.com", "admin@expensify.com", "notifications@expensify.com"], INVALID_APPROVER_AND_SHAREE_EMAILS: ["concierge@expensify.com", "help@expensify.com", "receipts@expensify.com", "chronos@expensify.com", "qa@expensify.com", "contributors@expensify.com", "firstresponders@expensify.com", "qa+travisreceipts@expensify.com", "bills@expensify.com", "admin@expensify.com", "notifications@expensify.com"], SMART_SCAN: { COST: 20, FREE_NUMBER: 25 }, SMS: { DOMAIN: "expensify.sms", E164_REGEX: /^\+?[1-9]\d{1,14}$/ }, PASSWORD_COMPLEXITY_REGEX_STRING: "^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$", INTEGRATIONS: { DATA_MAPPING: { NONE: "NONE", TAG: "TAG", REPORT_FIELD: "REPORT_FIELD", DEFAULT: "DEFAULT" }, EXPORT_DATE: { LAST_EXPENSE: "LAST_EXPENSE", REPORT_EXPORTED: "REPORT_EXPORTED", REPORT_SUBMITTED: "REPORT_SUBMITTED" }, XERO_HQ_CONNECTION_NAME: "xerohq", EXPENSIFY_SYNC_MANAGER_VERSION: "23.0.802.0" }, INTEGRATION_TYPES: { ACCOUNTING: "accounting", HR: "hr" }, DIRECT_INTEGRATIONS: { zenefits: { value: "zenefits", text: "Zenefits", image: `${g_cloudFrontImg}icons/export-icons/zenefit.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/zenefit_gray.svg`, alert_image: `${g_cloudFrontImg}icons/export-icons/zenefit_alert.svg`, types: ["hr"], isCorporateOnly: false }, gusto: { value: "gusto", text: "Gusto", image: `${g_cloudFrontImg}icons/export-icons/gusto.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/gusto_gray.svg`, alert_image: `${g_cloudFrontImg}icons/export-icons/gusto_alert.svg`, types: ["hr"], isCorporateOnly: false }, quickbooksOnline: { value: "quickbooksOnline", text: "QuickBooks Online", image: `${g_cloudFrontImg}icons/export-icons/quickbooks.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/quickbooks_gray.svg`, alert_image: `${g_cloudFrontImg}icons/export-icons/quickbooks_alert.svg`, types: ["hr", "accounting"], isCorporateOnly: false }, xero: { value: "xero", text: "Xero", image: `${g_cloudFrontImg}icons/export-icons/xero.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/xero_gray.svg`, alert_image: `${g_cloudFrontImg}icons/export-icons/xero_alert.svg`, types: ["accounting"], isCorporateOnly: false }, netsuite: { value: "netsuite", text: "NetSuite", image: `${g_cloudFrontImg}icons/export-icons/netsuite.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/netsuite_gray.svg`, alert_image: `${g_cloudFrontImg}icons/export-icons/netsuite_alert.svg`, types: ["hr", "accounting"], isCorporateOnly: true }, quickbooksDesktop: { value: "qbd", text: "QuickBooks Desktop", image: `${g_cloudFrontImg}icons/export-icons/quickbooks.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/quickbooks_gray.svg`, alert_image: `${g_cloudFrontImg}icons/export-icons/quickbooks_alert.svg`, types: ["accounting"], isCorporateOnly: false }, intacct: { value: "intacct", text: "Sage Intacct", image: `${g_cloudFrontImg}icons/export-icons/sage.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/sage_gray.svg`, alert_image: `${g_cloudFrontImg}icons/export-icons/sage_alert.svg`, types: ["hr", "accounting"], isCorporateOnly: true }, financialforce: { value: "financialforce", text: "Certinia", image: `${g_cloudFrontImg}icons/export-icons/certinia.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/certinia_gray.svg`, alert_image: `${g_cloudFrontImg}icons/export-icons/certinia_alert.svg`, types: ["accounting"], isCorporateOnly: true } }, INDIRECT_INTEGRATIONS: { microsoft_dynamics: { value: "microsoft_dynamics", text: "Microsoft Dynamics", image: `${g_cloudFrontImg}icons/export-icons/microsoft_dynamics.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/microsoft_dynamics_gray.svg`, types: ["accounting"], isCorporateOnly: true }, oracle: { value: "oracle", text: "Oracle", image: `${g_cloudFrontImg}icons/export-icons/oracle.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/oracle_gray.svg`, types: ["hr", "accounting"], isCorporateOnly: true }, sage: { value: "sage", text: "Sage", image: `${g_cloudFrontImg}icons/export-icons/sage.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/sage_gray.svg`, types: ["accounting"], isCorporateOnly: true }, sap: { value: "sap", text: "SAP", image: `${g_cloudFrontImg}icons/export-icons/sap.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/sap_gray.svg`, types: ["accounting"], isCorporateOnly: true }, myob: { value: "myob", text: "MYOB", image: `${g_cloudFrontImg}icons/export-icons/myob.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/myob_gray.svg`, types: ["accounting"], isCorporateOnly: true }, workday: { value: "workday", text: "Workday", image: `${g_cloudFrontImg}icons/export-icons/workday.svg`, gray_image: `${g_cloudFrontImg}icons/export-icons/workday_gray.svg`, types: ["hr"], isCorporateOnly: true }, adp: { value: "adp", text: "ADP", image: `${g_cloudFrontImg}icons/export-icons/adp.svg`, types: ["hr"], isCorporateOnly: true }, generic_indirect_connection: { value: "generic_indirect_connection", text: "Other", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg`, types: ["hr", "accounting"] } }, DEFAULT_IS_TEMPLATES: { default: { value: "default_template", text: "Basic Export", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg` }, tag: { value: "tag_template", text: "Tag Export", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg` }, category: { value: "category_template", text: "Category Export", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg` }, detailed: { value: "detailed_export", text: "All Data - Expense Level Export", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg` }, report: { value: "report_level_export", text: "All Data - Report Level Export", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg` }, tax: { value: "multiple_tax_export", text: "Canadian Multiple Tax Export", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg` }, perdiem: { value: "per_diem_export", text: "Per Diem Export", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg` }, attendees: { value: "attendee_audit_export", text: "Attendee Audit Export", image: `${g_cloudFrontImg}icons/accounting-other--blue.svg` } }, NVP: { DISMISSED_VIOLATIONS: "dismissedViolations" }, FILESIZE: { BYTES_IN_MEGABYTE: 1e6, MAX: 1e7 }, PARTNER_NAMES: { IPHONE: "iphone", ANDROID: "android", CHAT: "chat-expensify-com" }, LOGIN_TYPES: { WEB: "login", MOBILE: "device" }, EXPENSIFY_CARD: { FEED_NAME: "Expensify Card", FRAUD_STATES: { NONE: 0, DOMAIN_CARDS_REIMBURSEMENTS_INVESTIGATION: 1, DOMAIN_CARDS_RAPID_INCREASE_INVESTIGATION: 2, DOMAIN_CARDS_RAPID_INCREASE_CLEARED: 3, DOMAIN_CARDS_RAPID_INCREASE_CONFIRMED: 4, INDIVIDUAL_CARD_RAPID_INCREASE_INVESTIGATION: 5, INDIVIDUAL_CARD_RAPID_INCREASE_CLEARED: 6, INDIVIDUAL_CARD_RAPID_INCREASE_CONFIRMED: 7, SUSPICIOUS_PAN_ENTRY: 8, SUSPICIOUS_PAN_ENTRY_CLEARED: 9, SUSPICIOUS_PAN_ENTRY_CONFIRMED: 10 } }, TRAVEL_BOOKING: { OPTIONS: { shortFlightFare: { economy: "Economy", premiumEconomy: "Premium Economy", business: "Business", first: "First" }, longFlightFare: { economy: "Economy", premiumEconomy: "Premium Economy", business: "Business", first: "First" }, hotelStar: { oneStar: "1", twoStars: "2", threeStars: "3", fourStars: "4", fiveStars: "5" } }, DEFAULT_OPTIONS: { shortFlightFare: "economy", longFlightFare: "economy", hotelStar: "fourStars" } }, EXPENSIFY_DOMAINS: ["expensify.com", "expensifail.com", "expensicorp.com"], SUBSCRIPTION_CHANGE_REASONS: { TOO_LIMITED: { id: "tooLimited", label: "Functionality needs improvement", prompt: "What software are you migrating to and what led to this decision?" }, TOO_EXPENSIVE: { id: "tooExpensive", label: "Too expensive", prompt: "What software are you migrating to and what led to this decision?" }, INADEQUATE_SUPPORT: { id: "inadequateSupport", label: "Inadequate customer support", prompt: "What software are you migrating to and what led to this decision?" }, BUSINESS_CLOSING: { id: "businessClosing", label: "Company closing, downsizing, or acquired", prompt: "What software are you migrating to and what led to this decision?" } } };
      exports.CONST = CONST;
      var UI = { ICON: { DELETE: "trashcan", CAR: "car", CASH: "cash", MANAGED_CARD: "corporate-card", CARD: "credit-card", CLOCK: "time", PER_DIEM: "per-diem", PENDING_CARD: "card-transaction-pending", CSV_UPLOAD: "csv-upload", PENDING_CREDIT_CARD: "credit-card-pending" }, spinnerDIV: '<div class="spinner"></div>', spinnerSmallDIV: '<div class="spinner spinner-small"></div>', spinnerLargeDIV: '<div class="spinner spinner-large"></div>', spinnerClass: "view_spinner", SPINNER: "spinner", imageURLPrefix: g_cloudFrontImg, ACTIVE: "active", ERROR: "error", HIDDEN: "hidden", INVISIBLE: "invisible", DEPRECIATED: "depreciated", DISABLED: "disabled", REQUIRED: "required", SELECT_DEFAULT: "###", SELECTED: "selected", QR_CODE: "js_qrCode", DIALOG_Z_INDEX: 4e3 };
      exports.UI = UI;
      var PUBLIC_DOMAINS = ["accountant.com", "afis.ch", "aol.com", "artlover.com", "asia.com", "att.net", "bellsouth.net", "bills.expensify.com", "btinternet.com", "cheerful.com", "chromeexpensify.com", "comcast.net", "consultant.com", "contractor.com", "cox.net", "cpa.com", "cryptohistoryprice.com", "dr.com", "email.com", "engineer.com", "europe.com", "evernote.user", "execs.com", "expensify.cash", "expensify.sms", "gmail.com", "gmail.con", "googlemail.com", "hey.com", "hotmail.co.uk", "hotmail.com", "hotmail.fr", "hotmail.it", "icloud.com", "iname.com", "jeeviess.com", "live.com", "mac.com", "mail.com", "mail.ru", "mailfence.com", "me.com", "msn.com", "musician.org", "myself.com", "outlook.com", "pm.me", "post.com", "privaterelay.appleid.com", "proton.me", "protonmail.ch", "protonmail.com", "qq.com", "rigl.ch", "sasktel.net", "sbcglobal.net", "spacehotline.com", "tafmail.com", "techie.com", "usa.com", "verizon.net", "vomoto.com", "wolfandcranebar.tech", "workmail.com", "writeme.com", "yahoo.ca", "yahoo.co.in", "yahoo.co.uk", "yahoo.com", "yahoo.com.br", "ymail.com"];
      exports.PUBLIC_DOMAINS = PUBLIC_DOMAINS;
    } });
    var require_tlds = __commonJS2({ "node_modules/expensify-common/dist/tlds.js": function node_modulesExpensifyCommonDistTldsJs(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var TLD_REGEX = "XN--VERMGENSBERATUNG-PWB|XN--VERMGENSBERATER-CTB|XN--CLCHC0EA0B2G2A9GCD|XN--W4R85EL8FHU5DNRA|TRAVELERSINSURANCE|NORTHWESTERNMUTUAL|XN--XKC2DL3A5EE0H|XN--MGBERP4A5D4AR|XN--MGBAI9AZGQP6J|XN--MGBAH1A3HJKRD|XN--BCK1B9A5DRE4C|XN--5SU34J936BGSG|XN--3OQ18VL8PN36A|XN--XKC2AL3HYE2A|XN--MGBCPQ6GPA1A|XN--MGBA7C0BBN0A|XN--FZYS8D69UVGM|XN--NQV7FS00EMA|XN--MGBC0A9AZCG|XN--MGBAAKC7DVF|XN--MGBA3A4F16A|XN--LGBBAT1AD8J|XN--KCRX77D1X4A|XN--I1B6B1A6A2E|SANDVIKCOROMANT|KERRYPROPERTIES|AMERICANEXPRESS|XN--RVC1E0AM3E|XN--MGBX4CD0AB|XN--MGBI4ECEXP|XN--MGBCA7DZDO|XN--MGBBH1A71E|XN--MGBAYH7GPA|XN--MGBAAM7A8H|XN--MGBA3A3EJT|XN--JLQ61U9W7B|XN--JLQ480N2RG|XN--H2BREG3EVE|XN--FIQ228C5HS|XN--B4W605FERD|XN--80AQECDR1A|XN--6QQ986B3XL|XN--54B7FTA0CC|WEATHERCHANNEL|KERRYLOGISTICS|COOKINGCHANNEL|CANCERRESEARCH|BANANAREPUBLIC|AMERICANFAMILY|AFAMILYCOMPANY|XN--YGBI2AMMX|XN--YFRO4I67O|XN--TIQ49XQYJ|XN--H2BRJ9C8C|XN--FZC2C9E2C|XN--FPCRJ9C3D|XN--ECKVDTC9D|XN--CCKWCXETD|WOLTERSKLUWER|TRAVELCHANNEL|SPREADBETTING|LIFEINSURANCE|INTERNATIONAL|XN--QCKA1PMC|XN--OGBPF8FL|XN--NGBE9E0A|XN--NGBC5AZD|XN--MK1BU44C|XN--MGBT3DHD|XN--MGBPL2FH|XN--MGBGU82A|XN--MGBAB2BD|XN--MGB9AWBF|XN--GCKR3F0F|XN--8Y0A063A|XN--80ASEHDB|XN--80ADXHKS|XN--4DBRK0CE|XN--45BR5CYL|XN--3E0B707E|VERSICHERUNG|SCHOLARSHIPS|LPLFINANCIAL|CONSTRUCTION|XN--ZFR164B|XN--XHQ521B|XN--W4RS40L|XN--VUQ861B|XN--T60B56A|XN--SES554G|XN--S9BRJ9C|XN--ROVU88B|XN--RHQV96G|XN--Q9JYB4C|XN--PGBS0DH|XN--OTU796D|XN--NYQY26A|XN--MIX891F|XN--MGBTX2B|XN--MGBBH1A|XN--KPRY57D|XN--KPRW13D|XN--JVR189M|XN--J6W193G|XN--IMR513N|XN--HXT814E|XN--H2BRJ9C|XN--GK3AT1E|XN--GECRJ9C|XN--G2XX48C|XN--FLW351E|XN--FJQ720A|XN--FCT429K|XN--EFVY88H|XN--D1ACJ3B|XN--CZR694B|XN--CCK2B3B|XN--9KRT00A|XN--80AO21A|XN--6FRZ82G|XN--55QW42G|XN--45BRJ9C|XN--42C2D9A|XN--3HCRJ9C|XN--3DS443G|XN--3BST00M|XN--2SCRJ9C|XN--1QQW23A|XN--1CK2E1B|XN--11B4C3D|WILLIAMHILL|REDUMBRELLA|PROGRESSIVE|PRODUCTIONS|PLAYSTATION|PHOTOGRAPHY|OLAYANGROUP|MOTORCYCLES|LAMBORGHINI|KERRYHOTELS|INVESTMENTS|FOODNETWORK|ENTERPRISES|ENGINEERING|CREDITUNION|CONTRACTORS|CALVINKLEIN|BRIDGESTONE|BLOCKBUSTER|BLACKFRIDAY|BARCLAYCARD|ACCOUNTANTS|XN--Y9A3AQ|XN--WGBL6A|XN--WGBH1C|XN--UNUP4Y|XN--Q7CE6A|XN--PSSY2U|XN--O3CW4H|XN--MXTQ1M|XN--KPUT3I|XN--IO0A7I|XN--FIQZ9S|XN--FIQS8S|XN--FIQ64B|XN--CZRU2D|XN--CZRS0T|XN--CG4BKI|XN--C2BR7G|XN--9ET52U|XN--9DBQ2A|XN--90A3AC|XN--80ASWG|XN--5TZM5G|XN--55QX5D|XN--4GBRIM|XN--45Q11C|XN--3PXU8K|XN--30RR7Y|VOLKSWAGEN|VLAANDEREN|UNIVERSITY|TECHNOLOGY|TATAMOTORS|SWIFTCOVER|SCHAEFFLER|RESTAURANT|REPUBLICAN|REALESTATE|PRUDENTIAL|PROTECTION|PROPERTIES|ONYOURSIDE|NEXTDIRECT|NATIONWIDE|MITSUBISHI|MANAGEMENT|INDUSTRIES|IMMOBILIEN|HEALTHCARE|FOUNDATION|EXTRASPACE|EUROVISION|CUISINELLA|CREDITCARD|CONSULTING|CAPITALONE|BOEHRINGER|BNPPARIBAS|BASKETBALL|ASSOCIATES|APARTMENTS|ACCOUNTANT|YODOBASHI|XN--VHQUV|XN--TCKWE|XN--QXA6A|XN--P1ACF|XN--NQV7F|XN--NGBRX|XN--L1ACC|XN--J1AMH|XN--J1AEF|XN--FHBEI|XN--E1A4C|XN--D1ALF|XN--C1AVG|XN--90AIS|VACATIONS|TRAVELERS|STOCKHOLM|STATEFARM|STATEBANK|SOLUTIONS|SHANGRILA|SCJOHNSON|RICHARDLI|PRAMERICA|PASSAGENS|PANASONIC|MICROSOFT|MELBOURNE|MARSHALLS|MARKETING|LIFESTYLE|LANDROVER|LANCASTER|KUOKGROUP|INSURANCE|INSTITUTE|HOMESENSE|HOMEGOODS|HOMEDEPOT|HISAMITSU|GOLDPOINT|FURNITURE|FUJIXEROX|FRONTDOOR|FRESENIUS|FIRESTONE|FINANCIAL|FAIRWINDS|EQUIPMENT|EDUCATION|DIRECTORY|COMMUNITY|CHRISTMAS|BLOOMBERG|BARCELONA|AQUARELLE|ANALYTICS|AMSTERDAM|ALLFINANZ|ALFAROMEO|ACCENTURE|YOKOHAMA|XN--QXAM|XN--P1AI|XN--NODE|XN--90AE|WOODSIDE|VERISIGN|VENTURES|VANGUARD|TRAINING|SUPPLIES|STCGROUP|SOFTWARE|SOFTBANK|SHOWTIME|SHOPPING|SERVICES|SECURITY|SAMSCLUB|SAARLAND|RELIANCE|REDSTONE|PROPERTY|PLUMBING|PICTURES|PHARMACY|PARTNERS|OBSERVER|MORTGAGE|MERCKMSD|MEMORIAL|MCKINSEY|MASERATI|MARRIOTT|LUNDBECK|LIGHTING|JPMORGAN|ISTANBUL|IPIRANGA|INFINITI|HOSPITAL|HOLDINGS|HELSINKI|HDFCBANK|GUARDIAN|GRAPHICS|GRAINGER|GOODYEAR|FRONTIER|FOOTBALL|FIRMDALE|FIDELITY|FEEDBACK|EXCHANGE|ETISALAT|ERICSSON|ENGINEER|DOWNLOAD|DISCOVER|DISCOUNT|DIAMONDS|DEMOCRAT|DELOITTE|DELIVERY|COMPUTER|COMMBANK|CLOTHING|CLINIQUE|CLEANING|CITYEATS|CIPRIANI|CATHOLIC|CATERING|CAPETOWN|BUSINESS|BUILDERS|BUDAPEST|BRUSSELS|BROADWAY|BRADESCO|BOUTIQUE|BASEBALL|BARGAINS|BAREFOOT|BARCLAYS|ATTORNEY|ALLSTATE|AIRFORCE|ABUDHABI|ZUERICH|YOUTUBE|YAMAXUN|XFINITY|WINNERS|WINDOWS|WHOSWHO|WEDDING|WEBSITE|WEATHER|WATCHES|WANGGOU|WALMART|TRADING|TOSHIBA|TIFFANY|TICKETS|THEATRE|THEATER|TEMASEK|SYSTEMS|SURGERY|SUPPORT|STORAGE|STAPLES|SINGLES|SHIKSHA|SCIENCE|SCHWARZ|SCHMIDT|SANDVIK|SAMSUNG|REXROTH|REVIEWS|RENTALS|RECIPES|REALTOR|POLITIE|PIONEER|PHILIPS|ORIGINS|ORGANIC|OLDNAVY|OKINAWA|NEUSTAR|NETWORK|NETFLIX|NETBANK|MONSTER|MARKETS|LINCOLN|LIMITED|LECLERC|LATROBE|LASALLE|LANXESS|LACAIXA|KOMATSU|KITCHEN|JUNIPER|JEWELRY|ISMAILI|HYUNDAI|HOTMAIL|HOTELES|HOSTING|HOLIDAY|HITACHI|HANGOUT|HAMBURG|GUITARS|GROCERY|GODADDY|GENTING|GALLERY|FUJITSU|FROGANS|FORSALE|FLOWERS|FLORIST|FLIGHTS|FITNESS|FISHING|FINANCE|FERRERO|FERRARI|FASHION|FARMERS|EXPRESS|EXPOSED|DOMAINS|DIGITAL|DENTIST|CRUISES|CRICKET|COURSES|COUPONS|COUNTRY|CORSICA|COOKING|CONTACT|COMPARE|COMPANY|COMCAST|COLOGNE|COLLEGE|CLUBMED|CITADEL|CHINTAI|CHARITY|CHANNEL|CAREERS|CARAVAN|CAPITAL|BUGATTI|BROTHER|BOOKING|BESTBUY|BENTLEY|BAUHAUS|BANAMEX|AVIANCA|AUSPOST|AUDIBLE|AUCTION|ATHLETA|ANDROID|ALIBABA|AGAKHAN|ACADEMY|ABOGADO|ZAPPOS|YANDEX|YACHTS|XIHUAN|WEBCAM|WALTER|VUELOS|VOYAGE|VOTING|VISION|VIRGIN|VILLAS|VIKING|VIAJES|UNICOM|TRAVEL|TOYOTA|TKMAXX|TJMAXX|TIENDA|TENNIS|TATTOO|TARGET|TAOBAO|TAIPEI|SYDNEY|SWATCH|SUZUKI|SUPPLY|STUDIO|STREAM|SOCIAL|SOCCER|SHOUJI|SELECT|SECURE|SEARCH|SCHULE|SCHOOL|SANOFI|SAKURA|SAFETY|RYUKYU|ROGERS|ROCHER|REVIEW|REPORT|REPAIR|REISEN|REALTY|RACING|QUEBEC|PICTET|PHYSIO|PHOTOS|PFIZER|OTSUKA|ORANGE|ORACLE|ONLINE|OLAYAN|OFFICE|NOWRUZ|NORTON|NISSAY|NISSAN|NATURA|NAGOYA|MUTUAL|MUSEUM|MOSCOW|MORMON|MONASH|MOBILE|MATTEL|MARKET|MAKEUP|MAISON|MADRID|LUXURY|LONDON|LOCKER|LIVING|LEFRAK|LAWYER|LATINO|LANCIA|KOSHER|KINDLE|KINDER|KAUFEN|JUEGOS|JOBURG|JAGUAR|INTUIT|INSURE|IMAMAT|HUGHES|HOTELS|HOCKEY|HIPHOP|HERMES|HEALTH|GRATIS|GOOGLE|GLOBAL|GIVING|GEORGE|GARDEN|GALLUP|FUTBOL|FLICKR|FAMILY|EXPERT|EVENTS|ESTATE|ENERGY|EMERCK|DURBAN|DUPONT|DUNLOP|DOCTOR|DIRECT|DESIGN|DENTAL|DEGREE|DEALER|DATSUN|DATING|CRUISE|CREDIT|COUPON|CONDOS|COMSEC|COFFEE|CLINIC|CLAIMS|CIRCLE|CHURCH|CHROME|CHANEL|CENTER|CASINO|CAREER|CAMERA|BROKER|BOSTON|BOSTIK|BHARTI|BERLIN|BEAUTY|BAYERN|AUTHOR|ARAMCO|ANQUAN|AMAZON|ALSTOM|ALSACE|ALIPAY|AIRTEL|AIRBUS|AGENCY|AFRICA|ABBVIE|ABBOTT|ABARTH|YAHOO|XEROX|WORLD|WORKS|WEIBO|WEBER|WATCH|WALES|VOLVO|VODKA|VIDEO|VEGAS|UBANK|TUSHU|TUNES|TRUST|TRADE|TOURS|TOTAL|TORAY|TOOLS|TOKYO|TODAY|TMALL|TIROL|TIRES|TATAR|SWISS|SUCKS|STYLE|STUDY|STORE|STADA|SPORT|SPACE|SOLAR|SMILE|SMART|SLING|SKYPE|SHOES|SHELL|SHARP|SEVEN|SENER|SALON|RUGBY|RODEO|ROCKS|RICOH|REISE|REHAB|RADIO|QUEST|PROMO|PRIME|PRESS|PRAXI|POKER|PLACE|PIZZA|PHOTO|PHONE|PARTY|PARTS|PARIS|OSAKA|OMEGA|NOWTV|NOKIA|NINJA|NIKON|NEXUS|MOVIE|MONEY|MIAMI|MEDIA|MANGO|MACYS|LOTTO|LOTTE|LOCUS|LOANS|LIXIL|LIPSY|LINDE|LILLY|LEXUS|LEGAL|LEASE|LAMER|KYOTO|KOELN|JETZT|IVECO|IRISH|IKANO|HYATT|HOUSE|HORSE|HONDA|HOMES|GUIDE|GUCCI|GROUP|GRIPE|GREEN|GMAIL|GLOBO|GLASS|GLADE|GIVES|GIFTS|GAMES|GALLO|FORUM|FOREX|FINAL|FEDEX|FAITH|EPSON|EMAIL|EDEKA|EARTH|DUBAI|DRIVE|DELTA|DEALS|DANCE|DABUR|CYMRU|CROWN|CODES|COACH|CLOUD|CLICK|CITIC|CISCO|CHEAP|CHASE|CARDS|CANON|BUILD|BOSCH|BOATS|BLACK|BINGO|BIBLE|BEATS|BAIDU|AZURE|AUTOS|AUDIO|ARCHI|APPLE|AMICA|AMFAM|AETNA|ADULT|ACTOR|ZONE|ZERO|ZARA|YOGA|XBOX|WORK|WINE|WIKI|WIEN|WEIR|WANG|VOTO|VOTE|VIVO|VIVA|VISA|VANA|TUBE|TOYS|TOWN|TIPS|TIAA|TEVA|TECH|TEAM|TAXI|TALK|SURF|STAR|SPOT|SONY|SONG|SOHU|SNCF|SKIN|SITE|SINA|SILK|SHOW|SHOP|SHIA|SHAW|SEXY|SEEK|SEAT|SCOT|SAXO|SAVE|SARL|SALE|SAFE|RUHR|RSVP|ROOM|RMIT|RICH|REST|RENT|REIT|READ|RAID|QPON|PROF|PROD|POST|PORN|POHL|PLUS|PLAY|PINK|PING|PICS|PCCW|PARS|PAGE|OPEN|OLLO|NIKE|NICO|NEXT|NEWS|NAVY|NAME|MOTO|MODA|MOBI|MINT|MINI|MENU|MEME|MEET|MAIF|LUXE|LTDA|LOVE|LOFT|LOAN|LIVE|LINK|LIMO|LIKE|LIFE|LIDL|LGBT|LEGO|LAND|KRED|KPMG|KIWI|KDDI|JPRS|JOBS|JEEP|JAVA|ITAU|INFO|IMMO|IMDB|IEEE|ICBC|HSBC|HOST|HGTV|HERE|HELP|HDFC|HAUS|HAIR|GURU|GUGE|GOOG|GOLF|GOLD|GMBH|GIFT|GGEE|GENT|GBIZ|GAME|FUND|FREE|FORD|FOOD|FLIR|FISH|FIRE|FILM|FIDO|FIAT|FAST|FARM|FANS|FAIL|FAGE|ERNI|DVAG|DUCK|DOCS|DISH|DIET|DESI|DELL|DEAL|DCLK|DATE|DATA|CYOU|COOP|COOL|CLUB|CITY|CITI|CHAT|CERN|CBRE|CASH|CASE|CASA|CARS|CARE|CAMP|CALL|CAFE|BUZZ|BOOK|BOND|BOFA|BLUE|BLOG|BING|BIKE|BEST|BEER|BBVA|BANK|BAND|BABY|AUTO|AUDI|ASIA|ASDA|ARTE|ARPA|ARMY|ARAB|AMEX|ALLY|AKDN|AERO|ADAC|ABLE|AARP|ZIP|YUN|YOU|XYZ|XXX|XIN|WTF|WTC|WOW|WME|WIN|WED|VIP|VIN|VIG|VET|UPS|UOL|UNO|UBS|TVS|TUI|TRV|TOP|TJX|THD|TEL|TDK|TCI|TAX|TAB|STC|SRL|SPA|SOY|SKY|SKI|SFR|SEX|SEW|SES|SCB|SCA|SBS|SBI|SAS|SAP|RWE|RUN|RIP|RIO|RIL|REN|RED|QVC|PWC|PUB|PRU|PRO|PNC|PIN|PID|PHD|PET|PAY|OVH|OTT|ORG|OOO|ONL|ONG|ONE|OFF|OBI|NYC|NTT|NRW|NRA|NOW|NHK|NGO|NFL|NEW|NET|NEC|NBA|NAB|MTR|MTN|MSD|MOV|MOM|MOI|MOE|MMA|MLS|MLB|MIT|MIL|MEN|MED|MBA|MAP|MAN|LTD|LPL|LOL|LLP|LLC|LDS|LAW|LAT|KRD|KPN|KIM|KIA|KFH|JOY|JOT|JNJ|JMP|JLL|JIO|JCB|ITV|IST|INT|INK|ING|INC|IFM|ICU|ICE|IBM|HOW|HOT|HKT|HIV|HBO|GOV|GOT|GOP|GOO|GMX|GMO|GLE|GEA|GDN|GAY|GAP|GAL|FYI|FUN|FTR|FRL|FOX|FOO|FLY|FIT|FAN|EUS|ESQ|EDU|ECO|EAT|DVR|DTV|DOT|DOG|DNP|DIY|DHL|DEV|DDS|DAY|DAD|CSC|CRS|CPA|COM|CFD|CFA|CEO|CBS|CBN|CBA|CAT|CAR|CAM|CAL|CAB|BZH|BUY|BOX|BOT|BOO|BOM|BMW|BMS|BIZ|BIO|BID|BET|BCN|BCG|BBT|BBC|BAR|AXA|AWS|ART|APP|AOL|ANZ|AIG|AFL|AEG|ADS|ACO|ABC|ABB|AAA|ZW|ZM|ZA|YT|YE|WS|WF|VU|VN|VI|VG|VE|VC|VA|UZ|UY|US|UK|UG|UA|TZ|TW|TV|TT|TR|TO|TN|TM|TL|TK|TJ|TH|TG|TF|TD|TC|SZ|SY|SX|SV|SU|ST|SS|SR|SO|SN|SM|SL|SK|SJ|SI|SH|SG|SE|SD|SC|SB|SA|RW|RU|RS|RO|RE|QA|PY|PW|PT|PS|PR|PN|PM|PL|PK|PH|PG|PF|PE|PA|OM|NZ|NU|NR|NP|NO|NL|NI|NG|NF|NE|NC|NA|MZ|MY|MX|MW|MV|MU|MT|MS|MR|MQ|MP|MO|MN|MM|ML|MK|MH|MG|ME|MD|MC|MA|LY|LV|LU|LT|LS|LR|LK|LI|LC|LB|LA|KZ|KY|KW|KR|KP|KN|KM|KI|KH|KG|KE|JP|JO|JM|JE|IT|IS|IR|IQ|IO|IN|IM|IL|IE|ID|HU|HT|HR|HN|HM|HK|GY|GW|GU|GT|GS|GR|GQ|GP|GN|GM|GL|GI|GH|GG|GF|GE|GD|GB|GA|FR|FO|FM|FK|FJ|FI|EU|ET|ES|ER|EG|EE|EC|DZ|DO|DM|DK|DJ|DE|CZ|CY|CX|CW|CV|CU|CR|CO|CN|CM|CL|CK|CI|CH|CG|CF|CD|CC|CA|BZ|BY|BW|BV|BT|BS|BR|BO|BN|BM|BJ|BI|BH|BG|BF|BE|BD|BB|BA|AZ|AX|AW|AU|AT|AS|AR|AQ|AO|AM|AL|AI|AG|AF|AE|AD|AC|SJC|RNO|LAX";
      exports.default = TLD_REGEX;
    } });
    var require_Url = __commonJS2({ "node_modules/expensify-common/dist/Url.js": function node_modulesExpensifyCommonDistUrlJs(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MARKDOWN_URL_REGEX = exports.LOOSE_URL_WEBSITE_REGEX = exports.LOOSE_URL_REGEX = exports.URL_PROTOCOL_REGEX = exports.URL_REGEX_WITH_REQUIRED_PROTOCOL = exports.URL_REGEX = exports.URL_FRAGMENT_REGEX = exports.URL_PARAM_REGEX = exports.URL_PATH_REGEX = exports.URL_WEBSITE_REGEX = void 0;
      var tlds_1 = __importDefault(require_tlds());
      var ALLOWED_PORTS = "([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])";
      var URL_PROTOCOL_REGEX = "((ht|f)tps?:\\/\\/)";
      exports.URL_PROTOCOL_REGEX = URL_PROTOCOL_REGEX;
      var URL_WEBSITE_REGEX = `${URL_PROTOCOL_REGEX}?((?:www\\.)?[a-z0-9](?=(?<label>[-a-z0-9]*[a-z0-9])?)\\k<label>\\.)+(?:${tlds_1.default})(?:\\:${ALLOWED_PORTS}|\\b|(?=_))(?!@(?:[a-z\\d-]+\\.)+[a-z]{2,})`;
      exports.URL_WEBSITE_REGEX = URL_WEBSITE_REGEX;
      var addEscapedChar = function addEscapedChar2(reg) {
        return `(?:${reg}|&(?:amp|#x27);)`;
      };
      var URL_PATH_REGEX = `(?:${addEscapedChar("[.,=(+$!*]")}?\\/${addEscapedChar("[-\\w$@.+!*:(),=%~]")}*${addEscapedChar("[-\\w~@:%)]")}|\\/)*`;
      exports.URL_PATH_REGEX = URL_PATH_REGEX;
      var URL_PARAM_REGEX = `(?:\\?${addEscapedChar("[-\\w$@.+!*()\\/,=%{}:;\\[\\]\\|_|~]")}*)?`;
      exports.URL_PARAM_REGEX = URL_PARAM_REGEX;
      var URL_FRAGMENT_REGEX = `(?:#${addEscapedChar("[-\\w$@.+!*()[\\],=%;\\/:~]")}*)?`;
      exports.URL_FRAGMENT_REGEX = URL_FRAGMENT_REGEX;
      var URL_REGEX = `((${URL_WEBSITE_REGEX})${URL_PATH_REGEX}(?:${URL_PARAM_REGEX}|${URL_FRAGMENT_REGEX})*)`;
      exports.URL_REGEX = URL_REGEX;
      var URL_REGEX_WITH_REQUIRED_PROTOCOL = URL_REGEX.replace(`${URL_PROTOCOL_REGEX}?`, URL_PROTOCOL_REGEX);
      exports.URL_REGEX_WITH_REQUIRED_PROTOCOL = URL_REGEX_WITH_REQUIRED_PROTOCOL;
      var LOOSE_URL_WEBSITE_REGEX = `${URL_PROTOCOL_REGEX}([a-z0-9](?:[-a-z0-9]*[a-z0-9])?\\.)*(?:[a-z0-9](?:[-a-z0-9]*[a-z0-9])?)(?:\\:${ALLOWED_PORTS}|\\b|(?=_))`;
      exports.LOOSE_URL_WEBSITE_REGEX = LOOSE_URL_WEBSITE_REGEX;
      var LOOSE_URL_REGEX = `((${LOOSE_URL_WEBSITE_REGEX})${URL_PATH_REGEX}(?:${URL_PARAM_REGEX}|${URL_FRAGMENT_REGEX})*)`;
      exports.LOOSE_URL_REGEX = LOOSE_URL_REGEX;
      var MARKDOWN_URL_REGEX = `(${LOOSE_URL_REGEX}|${URL_REGEX})`;
      exports.MARKDOWN_URL_REGEX = MARKDOWN_URL_REGEX;
    } });
    var require_str = __commonJS2({ "node_modules/expensify-common/dist/str.js": function node_modulesExpensifyCommonDistStrJs(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function get() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result2 = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result2, mod, k);
        }
        __setModuleDefault(result2, mod);
        return result2;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var escape_1 = __importDefault(require_escape());
      var unescape_1 = __importDefault(require_unescape());
      var awesome_phonenumber_1 = require_awesome_phonenumber();
      var HtmlEntities = __importStar(require_lib2());
      var Constants = __importStar(require_CONST());
      var UrlPatterns = __importStar(require_Url());
      var REMOVE_SMS_DOMAIN_PATTERN = /@expensify\.sms/gi;
      function resultFn(parameter) {
        if (typeof parameter === "function") {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          return parameter.apply(void 0, args);
        }
        return parameter;
      }
      var Str = { endsWith: function endsWith(str, suffix) {
        if (!str || !suffix) {
          return false;
        }
        return str.substr(-suffix.length) === suffix;
      }, fromUSDToNumber: function fromUSDToNumber(amountStr, allowFraction) {
        var amount = String(amountStr).replace(/[^\d.\-()]+/g, "");
        if (amount.match(/\(.*\)/)) {
          var modifiedAmount = amount.replace(/[()]/g, "");
          amount = `-${modifiedAmount}`;
        }
        amount = Number(amount) * 100;
        amount = Math.round(amount * 1e3) / 1e3;
        return allowFraction ? amount : Math.round(amount);
      }, truncateInMiddle: function truncateInMiddle(fullStr, maxLength) {
        if (fullStr.length <= maxLength) {
          return fullStr;
        }
        var separator = "...";
        var halfLengthToShow = (maxLength - separator.length) / 2;
        var beginning = fullStr.substr(0, Math.ceil(halfLengthToShow));
        var end = fullStr.substr(fullStr.length - Math.floor(halfLengthToShow));
        return beginning + separator + end;
      }, nl2br: function nl2br(str) {
        return str.replace(/\n/g, "<br />");
      }, htmlDecode: function htmlDecode(s) {
        if (typeof jQuery !== "undefined") {
          return jQuery("<textarea/>").html(s).text();
        }
        return HtmlEntities.decode(s);
      }, htmlEncode: function htmlEncode(s) {
        if (typeof jQuery !== "undefined") {
          return jQuery("<textarea/>").text(s).html();
        }
        return HtmlEntities.encode(s);
      }, safeEscape: function safeEscape(s) {
        return (0, escape_1.default)((0, unescape_1.default)(s));
      }, htmlEncodingInsensitiveEquals: function htmlEncodingInsensitiveEquals(first2, second) {
        return first2 === second || this.htmlDecode(first2) === second || this.htmlEncode(first2) === second;
      }, makeID: function makeID(str) {
        var modifiedString = String(str).replace(/[^A-Za-z0-9]/g, "_").toUpperCase();
        return `id_${modifiedString}`;
      }, extractID: function extractID(str) {
        var matches = str.match(/id[A-Z0-9_]+/);
        return matches && matches.length > 0 ? matches[0] : null;
      }, recapitalize: function recapitalize(val) {
        var str = String(val);
        if (str.length <= 0) {
          return str;
        }
        str = str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
        function recap_callback(t, a, b) {
          return a + b.toUpperCase();
        }
        return str.replace(/([^A-Za-z'.0-9])([a-z])/g, recap_callback);
      }, sanitizeToAlphaNumeric: function sanitizeToAlphaNumeric(input) {
        return String(input).replace(/[^\d\w]/g, "_");
      }, stripNonNumeric: function stripNonNumeric(input) {
        return String(input).replace(/[^\d]/g, "");
      }, stripNonASCIICharacters: function stripNonASCIICharacters(input) {
        return String(input).replace(/[\u0000-\u0019\u0080-\uffff]/g, "");
      }, shortenText: function shortenText(val, length) {
        var text = String(val).replace(/\s+/g, " ");
        var truncatedText = text.substr(0, length - 3);
        return text.length > length ? `${truncatedText}...` : text;
      }, getRawByteSize: function getRawByteSize(inputChar) {
        var onlyChar = String(inputChar);
        var c = onlyChar.charCodeAt(0);
        if (c < 1 << 7) {
          return 1;
        }
        if (c < 1 << 11) {
          return 2;
        }
        if (c < 1 << 16) {
          return 3;
        }
        if (c < 1 << 21) {
          return 4;
        }
        if (c < 1 << 26) {
          return 5;
        }
        if (c < 1 << 31) {
          return 6;
        }
        return Number.NaN;
      }, getByteLength: function getByteLength(input) {
        var _this = this;
        var stringInput = String(input);
        var byteLength = Array.from(stringInput).reduce(function(acc, char) {
          return acc + _this.getRawByteSize(char);
        }, 0);
        return byteLength;
      }, shortenByByte: function shortenByByte(input, maxSize) {
        var stringInput = String(input);
        var totalByteLength = 0;
        for (var i = 0; i < stringInput.length; i++) {
          var charByteSize = this.getRawByteSize(stringInput[i]);
          if (charByteSize + totalByteLength > maxSize) {
            return `${stringInput.substr(0, i - 3)}...`;
          }
          totalByteLength += charByteSize;
        }
        return stringInput;
      }, startsWith: function startsWith(haystack, needle) {
        return this.isString(haystack) && this.isString(needle) && haystack.substring(0, needle.length) === needle;
      }, stripHTML: function stripHTML(str) {
        if (!this.isString(str)) {
          return "";
        }
        return str.replace(/<[^>]*>?/gm, "");
      }, UCFirst: function UCFirst(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
      }, cutAfter: function cutAfter(str, substr) {
        var index = str.indexOf(substr);
        if (index !== -1) {
          return str.substring(0, index);
        }
        return str;
      }, cutBefore: function cutBefore(str, substr) {
        var index = str.indexOf(substr);
        if (index !== -1) {
          return str.substring(index + substr.length);
        }
        return str;
      }, isValidDomainName: function isValidDomainName(str) {
        return Boolean(String(str).match(Constants.CONST.REG_EXP.DOMAIN));
      }, isValidURL: function isValidURL(str) {
        return Boolean(String(str).match(Constants.CONST.REG_EXP.HYPERLINK));
      }, isValidEmail: function isValidEmail(str) {
        return Boolean(String(str).match(Constants.CONST.REG_EXP.EMAIL));
      }, isValidEmailMarkdown: function isValidEmailMarkdown(str) {
        return Boolean(String(str).match(`^${Constants.CONST.REG_EXP.MARKDOWN_EMAIL}$`));
      }, removeTrailingComma: function removeTrailingComma(str) {
        return str.trim().replace(/(,$)/g, "");
      }, areValidEmails: function areValidEmails(str) {
        var _this2 = this;
        var string = this.removeTrailingComma(str);
        if (string === "") {
          return true;
        }
        var emails = string.split(",");
        var result2 = emails.every(function(email) {
          return _this2.isValidEmail(email.trim());
        });
        return result2;
      }, extractEmail: function extractEmail(str) {
        return String(str).match(Constants.CONST.REG_EXP.EMAIL_SEARCH);
      }, extractEmailDomain: function extractEmailDomain(email) {
        return this.cutBefore(email, "@");
      }, extractCompanyNameFromEmailDomain: function extractCompanyNameFromEmailDomain(email) {
        var domain = this.extractEmailDomain(email);
        if (!domain) {
          return null;
        }
        var domainParts = domain.split(".");
        if (!domainParts.length) {
          return null;
        }
        return domainParts[0];
      }, extractEmailLocalPart: function extractEmailLocalPart(email) {
        return this.cutAfter(email, "@");
      }, sanitizePhoneNumber: function sanitizePhoneNumber(str) {
        var string = str.replace(/(?!^\+)\D/g, "");
        return string.length <= 15 && string.length >= 10 ? string : null;
      }, sanitizeEmail: function sanitizeEmail(str) {
        var string = str.toLowerCase().trim();
        return Constants.CONST.REG_EXP.EMAIL.test(string) ? string : null;
      }, escapeForRegExp: function escapeForRegExp(str) {
        return str.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&");
      }, escapeForExpenseRule: function escapeForExpenseRule(str) {
        return str.replace(/[-[\]/{}()*+?\\^$|]/g, "\\$&");
      }, addBackslashBeforeColonsForTagNamesComingFromQBD: function addBackslashBeforeColonsForTagNamesComingFromQBD(str) {
        return str.replace(/([^\\]):/g, "$1\\:");
      }, stripBackslashes: function stripBackslashes(str) {
        return str.replace(/\\/g, "");
      }, isOfLength: function isOfLength(str, minimumLength, maximumLength) {
        if (!this.isString(str)) {
          return false;
        }
        if (str.length < minimumLength) {
          return false;
        }
        if (!this.isUndefined(maximumLength) && str.length > maximumLength) {
          return false;
        }
        return true;
      }, occurences: function occurences(haystack, needle, allowOverlapping) {
        var count = 0;
        var pos = 0;
        var haystackStr = String(haystack);
        var needleStr = String(needle);
        if (needleStr.length <= 0) {
          return haystackStr.length + 1;
        }
        var step = allowOverlapping ? 1 : needleStr.length;
        while (pos >= 0) {
          pos = haystackStr.indexOf(needleStr, pos);
          if (pos >= 0) {
            count += 1;
            pos += step;
          }
        }
        return count;
      }, ucwords: function ucwords(str) {
        var capitalize = function capitalize2($1) {
          return $1.toUpperCase();
        };
        return String(str).replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, capitalize);
      }, contains: function contains(haystack, needle) {
        return haystack.indexOf(needle) !== -1;
      }, caseInsensitiveContains: function caseInsensitiveContains(haystack, needle) {
        return this.contains(haystack.toLowerCase(), needle.toLowerCase());
      }, caseInsensitiveCompare: function caseInsensitiveCompare(strA, strB) {
        var lowerCaseStrA = strA.toLocaleLowerCase();
        var lowerCaseStrB = strB.toLocaleLowerCase();
        return this.compare(lowerCaseStrA, lowerCaseStrB);
      }, caseInsensitiveEquals: function caseInsensitiveEquals(strA, strB) {
        return this.caseInsensitiveCompare(strA, strB) === 0;
      }, compare: function compare(strA, strB) {
        if (strA < strB) {
          return -1;
        }
        if (strA > strB) {
          return 1;
        }
        return 0;
      }, isFileExtensionSmartReportsValid: function isFileExtensionSmartReportsValid(filename) {
        var _a;
        var allowedExtensions = ["xls", "xlsx", "xlsm", "xltm"];
        var extension = (_a = filename.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        return !!extension && allowedExtensions.indexOf(extension) > -1;
      }, maskPAN: function maskPAN(num) {
        var accountNumber = String(num);
        var len = accountNumber.length;
        if (len < 6 || len > 20) {
          return this.maskFirstNCharacters(accountNumber, len, "X");
        }
        if (len < 14) {
          return this.maskFirstNCharacters(accountNumber, len - 4, "X");
        }
        var first2 = accountNumber.substr(0, 6);
        var last2 = accountNumber.substr(7);
        var masked = this.maskFirstNCharacters(last2, len - 11, "X");
        return `${first2}${masked}`;
      }, isString: function isString(obj) {
        return this.isTypeOf(obj, "String");
      }, isNumber: function isNumber(obj) {
        return this.isTypeOf(obj, "Number");
      }, isTypeOf: function isTypeOf(obj, type) {
        return Object.prototype.toString.call(obj) === `[object ${type}]`;
      }, isUndefined: function isUndefined(obj) {
        return obj === void 0;
      }, maskFirstNCharacters: function maskFirstNCharacters(str, num, mask) {
        if (!this.isString(str) || !this.isString(mask) || str.length === 0 || !this.isNumber(num)) {
          return str;
        }
        return str.substring(0, num).replace(/./g, mask) + str.substring(num);
      }, trim: function trim(str) {
        return $.trim(str);
      }, percentageStringToNumber: function percentageStringToNumber(percentageString) {
        return Number(this.cutAfter(percentageString, "%"));
      }, removeSpaces: function removeSpaces(input) {
        return String(input).replace(" ", "");
      }, pluralize: function pluralize(singular, plural, num) {
        if (!num || num > 1) {
          return plural;
        }
        return singular;
      }, isEncryptedCardNumber: function isEncryptedCardNumber(num) {
        if (/^[\da-fA-F]+$/.test(num)) {
          return num.length % 32 === 0;
        }
        if (/^[vV][\d]+:[\da-fA-F]+$/.test(num)) {
          return num.split(":")[1].length % 32 === 0;
        }
        return false;
      }, toBool: function toBool(value) {
        if (this.isString(value)) {
          return value.toLowerCase() === "true";
        }
        return Boolean(value);
      }, maskedEquals: function maskedEquals(strA, strB, mask) {
        var _a, _b;
        var firsts = (_a = strA.match(/.{1,1}/g)) !== null && _a !== void 0 ? _a : [];
        var seconds = (_b = strB.match(/.{1,1}/g)) !== null && _b !== void 0 ? _b : [];
        var defaultMask = mask || "X";
        if (firsts.length !== seconds.length) {
          return false;
        }
        for (var i = 0; i < firsts.length; i += 1) {
          if (firsts[i] !== seconds[i] && firsts[i] !== defaultMask && seconds[i] !== defaultMask) {
            return false;
          }
        }
        return true;
      }, boldify: function boldify(text, regexp) {
        return text.replace(regexp, "<strong>$1</strong>");
      }, isValidPhone: function isValidPhone(phone) {
        return Constants.CONST.SMS.E164_REGEX.test(phone);
      }, isValidPhoneNumber: function isValidPhoneNumber(phone) {
        return (0, awesome_phonenumber_1.parsePhoneNumber)(phone).possible;
      }, isValidE164Phone: function isValidE164Phone(phone) {
        return Constants.CONST.SMS.E164_REGEX.test(phone);
      }, isValidPhoneFormat: function isValidPhoneFormat(phone) {
        return Constants.CONST.REG_EXP.GENERAL_PHONE_PART.test(phone);
      }, isValidMention: function isValidMention(mention) {
        if (/[\s@]/g.test(mention.charAt(0))) {
          return true;
        }
        var firstChar = mention.charAt(0);
        var lastChar = mention.charAt(mention.length - 1);
        return /[*~_'"]/g.test(firstChar) && /[*~_'"]/g.test(lastChar) && firstChar === lastChar;
      }, removeSMSDomain: function removeSMSDomain(text) {
        return text.replace(REMOVE_SMS_DOMAIN_PATTERN, "");
      }, isSMSLogin: function isSMSLogin(text) {
        return this.isValidE164Phone(this.removeSMSDomain(text));
      }, matchAll: function matchAll(str, regex) {
        var matches = [];
        var collectMatches = function collectMatches2() {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          var match = Array.prototype.slice.call(args, 0, -2);
          match.input = args[args.length - 1];
          match.index = args[args.length - 2];
          matches.push(match);
        };
        str.replace(regex, collectMatches);
        return matches;
      }, guid: function guid() {
        var prefix = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
        function s4() {
          return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
        }
        return `${prefix}${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
      }, normalizeUrl: function normalizeUrl(url) {
        return typeof url === "string" && url.startsWith("/") ? url : `/${url}`;
      }, sanitizeURL: function sanitizeURL(url) {
        var regex = new RegExp(`^${UrlPatterns.URL_REGEX}$`, "i");
        var match = regex.exec(url);
        if (!match) {
          return url;
        }
        var website = match[3] ? match[2] : `https://${match[2]}`;
        return website.toLowerCase() + this.cutBefore(match[1], match[2]);
      }, result: resultFn, getExtension: function getExtension(url) {
        var _a, _b;
        return (_b = (_a = url.split(".").pop()) === null || _a === void 0 ? void 0 : _a.split("?")[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase();
      }, isPDF: function isPDF(url) {
        return this.getExtension(url) === "pdf";
      }, isImage: function isImage(url) {
        var extension = this.getExtension(url);
        if (!extension) {
          return false;
        }
        return ["jpeg", "jpg", "gif", "png", "bmp", "webp"].includes(extension);
      }, isVideo: function isVideo(url) {
        var extension = this.getExtension(url);
        if (!extension) {
          return false;
        }
        return ["mov", "mp4", "webm", "mkv"].includes(extension);
      }, isDomainEmail: function isDomainEmail(email) {
        return this.startsWith(email, "+@");
      }, replaceAll: function replaceAll(text, searchValue, replaceValue) {
        return String.prototype.replaceAll.call(text, searchValue, replaceValue);
      } };
      exports.default = Str;
    } });
    var require_ExpensiMark = __commonJS2({ "node_modules/expensify-common/dist/ExpensiMark.js": function node_modulesExpensifyCommonDistExpensiMarkJs(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function get() {
            return m[k];
          } };
        }
        Object.defineProperty(o, k2, desc);
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = exports && exports.__setModuleDefault || (Object.create ? function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
      } : function(o, v) {
        o["default"] = v;
      });
      var __importStar = exports && exports.__importStar || function(mod) {
        if (mod && mod.__esModule)
          return mod;
        var result2 = {};
        if (mod != null) {
          for (var k in mod)
            if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
              __createBinding(result2, mod, k);
        }
        __setModuleDefault(result2, mod);
        return result2;
      };
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var _3 = __importStar((init_index_all(), __toCommonJS(index_all_exports)));
      var str_1 = __importDefault(require_str());
      var Constants = __importStar(require_CONST());
      var UrlPatterns = __importStar(require_Url());
      var MARKDOWN_LINK_REGEX = new RegExp(`\\[([^\\][]*(?:\\[[^\\][]*][^\\][]*)*)]\\(${UrlPatterns.MARKDOWN_URL_REGEX}\\)(?![^<]*(<\\/pre>|<\\/code>))`, "gi");
      var MARKDOWN_IMAGE_REGEX = new RegExp(`\\!(?:\\[([^\\][]*(?:\\[[^\\][]*][^\\][]*)*)])?\\(${UrlPatterns.MARKDOWN_URL_REGEX}\\)(?![^<]*(<\\/pre>|<\\/code>))`, "gi");
      var SLACK_SPAN_NEW_LINE_TAG = '<span class="c-mrkdwn__br" data-stringify-type="paragraph-break" style="box-sizing: inherit; display: block; height: unset;"></span>';
      var ExpensiMark2 = { setLogger: function setLogger(logger) {
        ExpensiMark2.Log = logger;
      }, initializer: function initializer() {
        var _this3 = this;
        this.rules = [{ name: "emoji", regex: Constants.CONST.REG_EXP.EMOJI_RULE, replacement: function replacement(match) {
          return `<emoji>${match}</emoji>`;
        } }, { name: "codeFence", regex: /(&#x60;&#x60;&#x60;(?:\r\n|\n))((?:\s*?(?!(?:\r\n|\n)?&#x60;&#x60;&#x60;(?!&#x60;))[\S])+\s*?(?:\r\n|\n))(&#x60;&#x60;&#x60;)/g, replacement: function replacement(match, __, textWithinFences) {
          var group2 = textWithinFences.replace(/(?:(?![\n\r])\s)/g, "&#32;");
          return `<pre>${group2}</pre>`;
        }, rawInputReplacement: function rawInputReplacement(match, __, textWithinFences) {
          var group2 = textWithinFences.replace(/(?:(?![\n\r])\s)/g, "&#32;").replace(/<emoji>|<\/emoji>/g, "");
          return `<pre>${group2}</pre>`;
        } }, { name: "inlineCodeBlock", regex: /(\B|_|)&#x60;(.*?(?![&#x60;])\S.*?)&#x60;(\B|_|)(?!&#x60;|[^<]*<\/pre>)/gm, replacement: "$1<code>$2</code>$3" }, { name: "email", process: function process(textToProcess, replacement, shouldKeepRawInput) {
          var regex = new RegExp(`(?!\\[\\s*\\])\\[([^[\\]]*)]\\((mailto:)?${Constants.CONST.REG_EXP.MARKDOWN_EMAIL}\\)`, "gim");
          return _this3.modifyTextForEmailLinks(regex, textToProcess, replacement, shouldKeepRawInput);
        }, replacement: function replacement(match, g1, g2) {
          if (g1.match(Constants.CONST.REG_EXP.EMOJIS) || !g1.trim()) {
            return match;
          }
          var label = g1.trim();
          var href = `mailto:${g2}`;
          var formattedLabel = label === href ? g2 : label;
          return `<a href="${href}">${formattedLabel}</a>`;
        }, rawInputReplacement: function rawInputReplacement(match, g1, g2, g3) {
          if (g1.match(Constants.CONST.REG_EXP.EMOJIS) || !g1.trim()) {
            return match;
          }
          var dataRawHref = g2 ? g2 + g3 : g3;
          var href = `mailto:${g3}`;
          return `<a href="${href}" data-raw-href="${dataRawHref}" data-link-variant="labeled">${g1}</a>`;
        } }, { name: "heading1", process: function process(textToProcess, replacement) {
          var shouldKeepRawInput = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
          var regexp = shouldKeepRawInput ? /^# ( *(?! )(?:(?!<pre>|\n|\r\n).)+)/gm : /^# +(?! )((?:(?!<pre>|\n|\r\n).)+)/gm;
          return textToProcess.replace(regexp, replacement);
        }, replacement: "<h1>$1</h1>" }, { name: "image", regex: MARKDOWN_IMAGE_REGEX, replacement: function replacement(match, g1, g2) {
          return `<img src="${str_1.default.sanitizeURL(g2)}"${g1 ? ` alt="${_this3.escapeAttributeContent(g1)}"` : ""} />`;
        }, rawInputReplacement: function rawInputReplacement(match, g1, g2) {
          return `<img src="${str_1.default.sanitizeURL(g2)}"${g1 ? ` alt="${_this3.escapeAttributeContent(g1)}"` : ""} data-raw-href="${g2}" data-link-variant="${typeof g1 === "string" ? "labeled" : "auto"}" />`;
        } }, { name: "link", process: function process(textToProcess, replacement) {
          return _this3.modifyTextForUrlLinks(MARKDOWN_LINK_REGEX, textToProcess, replacement);
        }, replacement: function replacement(match, g1, g2) {
          if (g1.match(Constants.CONST.REG_EXP.EMOJIS) || !g1.trim()) {
            return match;
          }
          return `<a href="${str_1.default.sanitizeURL(g2)}" target="_blank" rel="noreferrer noopener">${g1.trim()}</a>`;
        }, rawInputReplacement: function rawInputReplacement(match, g1, g2) {
          if (g1.match(Constants.CONST.REG_EXP.EMOJIS) || !g1.trim()) {
            return match;
          }
          return `<a href="${str_1.default.sanitizeURL(g2)}" data-raw-href="${g2}" data-link-variant="labeled" target="_blank" rel="noreferrer noopener">${g1.trim()}</a>`;
        } }, { name: "hereMentions", regex: /([a-zA-Z0-9.!$%&+/=?^`{|}_-]?)(@here)([.!$%&+/=?^`{|}_-]?)(?=\b)(?!([\w'#%+-]*@(?:[a-z\d-]+\.)+[a-z]{2,}(?:\s|$|@here))|((?:(?!<a).)+)?<\/a>|[^<]*(<\/pre>|<\/code>))/gm, replacement: function replacement(match, g1, g2, g3) {
          if (!str_1.default.isValidMention(match)) {
            return match;
          }
          return `${g1}<mention-here>${g2}</mention-here>${g3}`;
        } }, { name: "reportMentions", regex: /(?<!(?:(?![\n \*_~\uD800-\uDFFF])[\s\S]|[\uD800-\uDBFF][\uDC00-\uDFFF]))(#(?:[\x2D0-9a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5F\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7BB\uA7BD\uA7BF\uA7C1\uA7C3\uA7C8\uA7CA\uA7D1\uA7D3\uA7D5\uA7D7\uA7D9\uA7F6\uA7FA\uAB30-\uAB5A\uAB60-\uAB68\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD81B[\uDE60-\uDE7F]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD837[\uDF00-\uDF09\uDF0B-\uDF1E\uDF25-\uDF2A]|\uD83A[\uDD22-\uDD43]){1,80})(?!(?:(?![<\uD800-\uDFFF])[\s\S]|[\uD800-\uDBFF][\uDC00-\uDFFF])*(?:<\/pre>|<\/code>))/gim, replacement: "<mention-report>$1</mention-report>" }, { name: "userMentions", regex: new RegExp(`(@here|[a-zA-Z0-9.!$%&+=?^\`{|}-]?)(@${Constants.CONST.REG_EXP.EMAIL_PART}|@${Constants.CONST.REG_EXP.PHONE_PART})(?!((?:(?!<a).)+)?<\\/a>|[^<]*(<\\/pre>|<\\/code>))`, "gim"), replacement: function replacement(match, g1, g2) {
          var phoneNumberRegex = new RegExp(`^${Constants.CONST.REG_EXP.PHONE_PART}$`);
          var mention = g2.slice(1);
          var mentionWithoutSMSDomain = str_1.default.removeSMSDomain(mention);
          if (!str_1.default.isValidMention(match) || phoneNumberRegex.test(mentionWithoutSMSDomain) && !str_1.default.isValidPhoneNumber(mentionWithoutSMSDomain)) {
            return match;
          }
          var phoneRegex = new RegExp(`^@${Constants.CONST.REG_EXP.PHONE_PART}$`);
          return `${g1}<mention-user>${g2}${phoneRegex.test(g2) ? `@${Constants.CONST.SMS.DOMAIN}` : ""}</mention-user>`;
        }, rawInputReplacement: function rawInputReplacement(match, g1, g2) {
          if (!str_1.default.isValidMention(match)) {
            return match;
          }
          return `${g1}<mention-user>${g2}</mention-user>`;
        } }, { name: "hereMentionAfterUserMentions", regex: /(<\/mention-user>)(@here)(?=\b)/gm, replacement: "$1<mention-here>$2</mention-here>" }, { name: "autolink", process: function process(textToProcess, replacement) {
          var regex = new RegExp(`(?![^<]*>|[^<>]*<\\/(?!h1>))([_*~]*?)${UrlPatterns.MARKDOWN_URL_REGEX}\\1(?!((?:(?!<a).)+)?<\\/a>|[^<]*(<\\/pre>|<\\/code>|.+\\/>))`, "gi");
          return _this3.modifyTextForUrlLinks(regex, textToProcess, replacement);
        }, replacement: function replacement(match, g1, g2) {
          var href = str_1.default.sanitizeURL(g2);
          return `${g1}<a href="${href}" target="_blank" rel="noreferrer noopener">${g2}</a>${g1}`;
        }, rawInputReplacement: function rawInputReplacement(_match, g1, g2) {
          var href = str_1.default.sanitizeURL(g2);
          return `${g1}<a href="${href}" data-raw-href="${g2}" data-link-variant="auto" target="_blank" rel="noreferrer noopener">${g2}</a>${g1}`;
        } }, { name: "quote", process: function process(textToProcess, replacement) {
          var shouldKeepRawInput = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
          var regex = /^(?:&gt;)+ +(?! )(?![^<]*(?:<\/pre>|<\/code>))([^\v\n\r]+)/gm;
          var replaceFunction = function replaceFunction2(g1) {
            return replacement(g1, shouldKeepRawInput);
          };
          if (shouldKeepRawInput) {
            var rawInputRegex = /^(?:&gt;)+ +(?! )(?![^<]*(?:<\/pre>|<\/code>))([^\v\n\r]*)/gm;
            return textToProcess.replace(rawInputRegex, replaceFunction);
          }
          return _this3.modifyTextForQuote(regex, textToProcess, replacement);
        }, replacement: function replacement(g1) {
          var shouldKeepRawInput = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
          var isStartingWithSpace = false;
          var handleMatch = function handleMatch2(match, g2) {
            if (shouldKeepRawInput) {
              isStartingWithSpace = !!g2;
              return "";
            }
            return match;
          };
          var textToReplace = g1.replace(/^&gt;( )?/gm, handleMatch);
          var filterRules = ["heading1"];
          if (_this3.currentQuoteDepth < _this3.maxQuoteDepth - 1 || isStartingWithSpace) {
            filterRules.push("quote");
            _this3.currentQuoteDepth++;
          }
          var replacedText = _this3.replace(textToReplace, { filterRules, shouldEscapeText: false, shouldKeepRawInput });
          _this3.currentQuoteDepth = 0;
          return `<blockquote>${isStartingWithSpace ? " " : ""}${replacedText}</blockquote>`;
        } }, { name: "italic", regex: /(<(pre|code|a|mention-user)[^>]*>(.*?)<\/\2>)|((\b_+|\b)_((?![\s_])[\s\S]*?[^\s_](?<!\s))_(?![^\W_])(?![^<]*>)(?![^<]*(<\/pre>|<\/code>|<\/a>|<\/mention-user>)))/g, replacement: function replacement(match, html, tag, content, text, extraLeadingUnderscores, textWithinUnderscores) {
          if (html) {
            return html;
          }
          if (textWithinUnderscores.includes("</pre>") || _this3.containsNonPairTag(textWithinUnderscores)) {
            return match;
          }
          if (String(textWithinUnderscores).match(`^${Constants.CONST.REG_EXP.MARKDOWN_EMAIL}`)) {
            return `<em>${extraLeadingUnderscores}${textWithinUnderscores}</em>`;
          }
          return `${extraLeadingUnderscores}<em>${textWithinUnderscores}</em>`;
        } }, { name: "autoEmail", regex: new RegExp(`([^\\w'#%+-]|^)${Constants.CONST.REG_EXP.MARKDOWN_EMAIL}(?!((?:(?!<a).)+)?<\\/a>|[^<>]*<\\/(?!em|h1|blockquote))`, "gim"), replacement: '$1<a href="mailto:$2">$2</a>', rawInputReplacement: '$1<a href="mailto:$2" data-raw-href="$2" data-link-variant="auto">$2</a>' }, { name: "bold", regex: /(?<!<[^>]*)\B\*(?![^<]*(?:<\/pre>|<\/code>|<\/a>))((?![\s*])[\s\S]*?[^\s*](?<!\s))\*\B(?![^<]*>)(?![^<]*(<\/pre>|<\/code>|<\/a>))/g, replacement: function replacement(match, g1) {
          return g1.includes("</pre>") || _this3.containsNonPairTag(g1) ? match : `<strong>${g1}</strong>`;
        } }, { name: "strikethrough", regex: /(?<!<[^>]*)\B~((?![\s~])[\s\S]*?[^\s~](?<!\s))~\B(?![^<]*>)(?![^<]*(<\/pre>|<\/code>|<\/a>))/g, replacement: function replacement(match, g1) {
          return g1.includes("</pre>") || _this3.containsNonPairTag(g1) ? match : `<del>${g1}</del>`;
        } }, { name: "newline", regex: /\r?\n/g, replacement: "<br />" }, { name: "replacepre", regex: /<\/pre>\s*<br\s*[/]?>/gi, replacement: "</pre>" }, { name: "replaceh1br", regex: /<\/h1><br\s*[/]?>/gi, replacement: "</h1>" }];
        this.htmlToMarkdownRules = [{ name: "replacepre", regex: /<\/pre>(.)/gi, replacement: "</pre><br />$1" }, { name: "exclude", regex: new RegExp([`<(script|style)(?:"[^"]*"|'[^']*'|[^'">])*>([\\s\\S]*?)<\\/\\1>`, "(?![^<]*(<\\/pre>|<\\/code>))(\n|\r\n)?"].join(""), "gim"), replacement: "" }, { name: "nested", regex: /<(pre)(?:"[^"]*"|'[^']*'|[^'">])*><(div|code)(?:"[^"]*"|'[^']*'|[^'">])*>([\s\S]*?)<\/\2><\/pre>/gi, replacement: "<pre>$3</pre>" }, { name: "newline", pre: function pre(inputString) {
          return inputString.replace("<br></br>", "<br/>").replace("<br><br/>", "<br/>").replace(/(<tr.*?<\/tr>)/g, "$1<br/>").replace("<br/></tbody>", "").replace(SLACK_SPAN_NEW_LINE_TAG + SLACK_SPAN_NEW_LINE_TAG, "<br/><br/><br/>").replace(SLACK_SPAN_NEW_LINE_TAG, "<br/><br/>");
        }, regex: /<br(?:"[^"]*"|'[^']*'|[^'"><])*>\n?/gi, replacement: "\n" }, { name: "heading1", regex: /[^\S\r\n]*<(h1)(?:"[^"]*"|'[^']*'|[^'">])*>(.*?)<\/\1>(?![^<]*(<\/pre>|<\/code>))/gi, replacement: "<h1># $2</h1>" }, { name: "listItem", regex: /\s*<(li)(?:"[^"]*"|'[^']*'|[^'">])*>(.*?)<\/\1>(?![^<]*(<\/pre>|<\/code>))\s*/gi, replacement: "<li>  $2</li>" }, { name: "italic", regex: /<(em|i)(?:"[^"]*"|'[^']*'|[^'">])*>([\s\S]*?)<\/\1>(?![^<]*(<\/pre>|<\/code>))/gi, replacement: "_$2_" }, { name: "bold", regex: /<(b|strong)(?:"[^"]*"|'[^']*'|[^'">])*>([\s\S]*?)<\/\1>(?![^<]*(<\/pre>|<\/code>))/gi, replacement: "*$2*" }, { name: "strikethrough", regex: /<(del|s)(?:"[^"]*"|'[^']*'|[^'">])*>([\s\S]*?)<\/\1>(?![^<]*(<\/pre>|<\/code>))/gi, replacement: "~$2~" }, { name: "quote", regex: /<(blockquote|q)(?:"[^"]*"|'[^']*'|[^'">])*>([\s\S]*?)<\/\1>(?![^<]*(<\/pre>|<\/code>))/gi, replacement: function replacement(match, g1, g2) {
          var resultString = g2.replace(/\n?(<h1># )/g, "$1").replace(/(<h1>|<\/h1>)+/g, "\n").trim().split("\n");
          function wrapWithBlockquote(line) {
            return `<blockquote>${line}</blockquote>`;
          }
          resultString = _3.map(resultString, wrapWithBlockquote);
          function processString(m) {
            function replaceBlockquotes(text) {
              var modifiedText = text;
              var depth;
              do {
                depth = (modifiedText.match(/<blockquote>/gi) || []).length;
                modifiedText = modifiedText.replace(/<blockquote>/gi, "");
                modifiedText = modifiedText.replace(/<\/blockquote>/gi, "");
              } while (/<blockquote>/i.test(modifiedText));
              return `${">".repeat(depth)} ${modifiedText}`;
            }
            return replaceBlockquotes(m);
          }
          resultString = _3.map(resultString, processString).join("\n");
          return `<blockquote>${resultString}</blockquote>`;
        } }, { name: "inlineCodeBlock", regex: /<(code)(?:"[^"]*"|'[^']*'|[^'">])*>(.*?)<\/\1>(?![^<]*(<\/pre>|<\/code>))/gi, replacement: "`$2`" }, { name: "codeFence", regex: /<(pre)(?:"[^"]*"|'[^']*'|[^'">])*>([\s\S]*?)(\n?)<\/\1>(?![^<]*(<\/pre>|<\/code>))/gi, replacement: function replacement(match, g1, g2) {
          return `\`\`\`
${g2}
\`\`\``;
        } }, { name: "anchor", regex: /<(a)[^><]*href\s*=\s*(['"])(.*?)\2(?:".*?"|'.*?'|[^'"><])*>([\s\S]*?)<\/\1>(?![^<]*(<\/pre>|<\/code>))/gi, replacement: function replacement(match, g1, g2, g3, g4) {
          var email = g3.startsWith("mailto:") ? g3.slice(7) : "";
          if (email === g4) {
            return email;
          }
          return `[${g4}](${email || g3})`;
        } }, { name: "image", regex: /<img[^><]*src\s*=\s*(['"])(.*?)\1(?:[^><]*alt\s*=\s*(['"])(.*?)\3)?[^><]*>*(?![^<][\s\S]*?(<\/pre>|<\/code>))/gi, replacement: function replacement(match, g1, g2, g3, g4) {
          if (g4) {
            return `![${g4}](${g2})`;
          }
          return `!(${g2})`;
        } }, { name: "reportMentions", regex: /<mention-report reportID="(\d+)" *\/>/gi, replacement: function replacement(match, g1, offset, string, extras) {
          var reportToNameMap = extras.reportIDToName;
          if (!reportToNameMap || !reportToNameMap[g1]) {
            ExpensiMark2.Log.alert("[ExpensiMark] Missing report name", { reportID: g1 });
            return "#Hidden";
          }
          return reportToNameMap[g1];
        } }, { name: "userMention", regex: /(?:<mention-user accountID="(\d+)" *\/>)|(?:<mention-user>(.*?)<\/mention-user>)/gi, replacement: function replacement(match, g1, g2, offset, string, extras) {
          if (g1) {
            var accountToNameMap = extras.accountIDToName;
            if (!accountToNameMap || !accountToNameMap[g1]) {
              ExpensiMark2.Log.alert("[ExpensiMark] Missing account name", { accountID: g1 });
              return "@Hidden";
            }
            return `@${extras.accountIDToName[g1]}`;
          }
          return str_1.default.removeSMSDomain(g2);
        } }];
        this.htmlToTextRules = [{ name: "breakline", regex: /<br[^>]*>/gi, replacement: "\n" }, { name: "blockquoteWrapHeadingOpen", regex: /<blockquote><h1>/gi, replacement: "<blockquote>" }, { name: "blockquoteWrapHeadingClose", regex: /<\/h1><\/blockquote>/gi, replacement: "</blockquote>" }, { name: "blockElementOpen", regex: /(.|\s)<(blockquote|h1|pre)>/gi, replacement: "$1\n" }, { name: "blockElementClose", regex: /<\/(blockquote|h1|pre)>(.|\s)/gm, replacement: "\n$2" }, { name: "removeStyle", regex: /<style>.*?<\/style>/gi, replacement: "" }, { name: "image", regex: /<img[^><]*src\s*=\s*(['"])(.*?)\1(?:[^><]*alt\s*=\s*(['"])(.*?)\3)?[^><]*>*(?![^<][\s\S]*?(<\/pre>|<\/code>))/gi, replacement: "[Attachment]" }, { name: "reportMentions", regex: /<mention-report reportID="(\d+)" *\/>/gi, replacement: function replacement(match, g1, offset, string, extras) {
          var reportToNameMap = extras.reportIDToName;
          if (!reportToNameMap || !reportToNameMap[g1]) {
            ExpensiMark2.Log.alert("[ExpensiMark] Missing report name", { reportID: g1 });
            return "#Hidden";
          }
          return reportToNameMap[g1];
        } }, { name: "userMention", regex: /<mention-user accountID="(\d+)" *\/>/gi, replacement: function replacement(match, g1, offset, string, extras) {
          var accountToNameMap = extras.accountIDToName;
          if (!accountToNameMap || !accountToNameMap[g1]) {
            ExpensiMark2.Log.alert("[ExpensiMark] Missing account name", { accountID: g1 });
            return "@Hidden";
          }
          return `@${extras.accountIDToName[g1]}`;
        } }, { name: "stripTag", regex: /(<([^>]+)>)/gi, replacement: "" }];
        this.whitespaceRulesToDisable = ["newline", "replacepre", "replacebr", "replaceh1br"];
        this.filterRules = function(rule) {
          return !_3.includes(_this3.whitespaceRulesToDisable, rule.name);
        };
        this.shouldKeepWhitespaceRules = _3.filter(this.rules, this.filterRules);
        this.maxQuoteDepth = 3;
        this.currentQuoteDepth = 0;
      }, getHtmlRuleset: function getHtmlRuleset(filterRules, disabledRules, shouldKeepRawInput) {
        var rules = this.rules;
        var hasRuleName = function hasRuleName2(rule) {
          return _3.contains(filterRules, rule.name);
        };
        var hasDisabledRuleName = function hasDisabledRuleName2(rule) {
          return !_3.contains(disabledRules, rule.name);
        };
        if (shouldKeepRawInput) {
          rules = this.shouldKeepWhitespaceRules;
        }
        if (!_3.isEmpty(filterRules)) {
          rules = _3.filter(this.rules, hasRuleName);
        }
        if (!_3.isEmpty(disabledRules)) {
          rules = _3.filter(rules, hasDisabledRuleName);
        }
        return rules;
      }, replace: function replace(text) {
        var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$filterRules = _ref.filterRules, filterRules = _ref$filterRules === void 0 ? [] : _ref$filterRules, _ref$shouldEscapeText = _ref.shouldEscapeText, shouldEscapeText = _ref$shouldEscapeText === void 0 ? true : _ref$shouldEscapeText, _ref$shouldKeepRawInp = _ref.shouldKeepRawInput, shouldKeepRawInput = _ref$shouldKeepRawInp === void 0 ? false : _ref$shouldKeepRawInp, _ref$disabledRules = _ref.disabledRules, disabledRules = _ref$disabledRules === void 0 ? [] : _ref$disabledRules;
        var replacedText = shouldEscapeText ? _3.escape(text) : text;
        var rules = this.getHtmlRuleset(filterRules, disabledRules, shouldKeepRawInput);
        var processRule = function processRule2(rule) {
          if (rule.pre) {
            replacedText = rule.pre(replacedText);
          }
          var replacementFunction = shouldKeepRawInput && rule.rawInputReplacement ? rule.rawInputReplacement : rule.replacement;
          if (rule.process) {
            replacedText = rule.process(replacedText, replacementFunction, shouldKeepRawInput);
          } else {
            replacedText = replacedText.replace(rule.regex, replacementFunction);
          }
          if (rule.post) {
            replacedText = rule.post(replacedText);
          }
        };
        try {
          rules.forEach(processRule);
        } catch (e) {
          console.warn("Error replacing text with html in ExpensiMark.replace", { error: e });
          return shouldEscapeText ? _3.escape(text) : text;
        }
        return replacedText;
      }, modifyTextForUrlLinks: function modifyTextForUrlLinks(regex, textToCheck, replacement) {
        var match = regex.exec(textToCheck);
        var replacedText = "";
        var startIndex = 0;
        while (match !== null) {
          var unmatchedOpenParentheses = 0;
          var url = match[2];
          for (var i = 0; i < url.length; i++) {
            if (url[i] === "(") {
              unmatchedOpenParentheses++;
            } else if (url[i] === ")") {
              if (unmatchedOpenParentheses <= 0) {
                var numberOfCharsToRemove = url.length - i;
                match[0] = match[0].substr(0, match[0].length - numberOfCharsToRemove);
                url = url.substr(0, url.length - numberOfCharsToRemove);
                break;
              }
              unmatchedOpenParentheses--;
            }
          }
          if (!url.includes("?") && !url.includes("#")) {
            var _numberOfCharsToRemove = 0;
            for (var _i = url.length - 1; _i >= 0; _i--) {
              if (Constants.CONST.SPECIAL_CHARS_TO_REMOVE.includes(url[_i])) {
                _numberOfCharsToRemove++;
              } else {
                break;
              }
            }
            if (_numberOfCharsToRemove) {
              match[0] = match[0].substring(0, match[0].length - _numberOfCharsToRemove);
              url = url.substring(0, url.length - _numberOfCharsToRemove);
            }
          }
          replacedText = replacedText.concat(textToCheck.substr(startIndex, match.index - startIndex));
          var isDoneMatching = false;
          var shouldApplyAutoLinkAgain = true;
          if (match.index !== 0 && textToCheck[match.index - 1] === "@") {
            var domainRegex = /^(([a-z-0-9]+\.)+[a-z]{2,})(\S*)/i;
            var domainMatch = domainRegex.exec(url);
            if (domainMatch !== null && domainMatch[3] !== "") {
              replacedText = replacedText.concat(domainMatch[1] + this.replace(domainMatch[3], { filterRules: ["autolink"] }));
              shouldApplyAutoLinkAgain = false;
            } else {
              isDoneMatching = true;
            }
          }
          if (isDoneMatching || match[1].includes("</pre>") || match[1].includes("</h1>")) {
            replacedText = replacedText.concat(textToCheck.substr(match.index, match[0].length));
          } else if (shouldApplyAutoLinkAgain) {
            var urlRegex = new RegExp(`^${UrlPatterns.LOOSE_URL_REGEX}$|^${UrlPatterns.URL_REGEX}$`, "i");
            var linkText = urlRegex.test(match[1]) ? match[1] : this.replace(match[1], { filterRules: ["bold", "strikethrough", "italic"], shouldEscapeText: false });
            replacedText = replacedText.concat(replacement(match[0], linkText, url));
          }
          startIndex = match.index + match[0].length;
          match = regex.exec(textToCheck);
        }
        if (startIndex < textToCheck.length) {
          replacedText = replacedText.concat(textToCheck.substr(startIndex));
        }
        return replacedText;
      }, modifyTextForEmailLinks: function modifyTextForEmailLinks(regex, textToCheck, replacement, shouldKeepRawInput) {
        var match = regex.exec(textToCheck);
        var replacedText = "";
        var startIndex = 0;
        while (match !== null) {
          replacedText = replacedText.concat(textToCheck.substr(startIndex, match.index - startIndex));
          var linkText = this.replace(match[1], { filterRules: ["bold", "strikethrough", "italic"], shouldEscapeText: false });
          var replacedMatch = shouldKeepRawInput ? replacement(match[0], linkText, match[2], match[3]) : replacement(match[0], linkText, match[3]);
          replacedText = replacedText.concat(replacedMatch);
          startIndex = match.index + match[0].length;
          match = regex.exec(textToCheck);
        }
        if (startIndex < textToCheck.length) {
          replacedText = replacedText.concat(textToCheck.substr(startIndex));
        }
        return replacedText;
      }, replaceBlockElementWithNewLine: function replaceBlockElementWithNewLine(htmlString) {
        var splitText = htmlString.split(/<div.*?>|<\/div>|<comment.*?>|\n<\/comment>|<\/comment>|<h1>|<\/h1>|<h2>|<\/h2>|<h3>|<\/h3>|<h4>|<\/h4>|<h5>|<\/h5>|<h6>|<\/h6>|<p>|<\/p>|<li>|<\/li>|<blockquote>|<\/blockquote>/);
        var stripHTML = function stripHTML2(text) {
          return str_1.default.stripHTML(text);
        };
        splitText = _3.map(splitText, stripHTML);
        var joinedText = "";
        while (splitText.length) {
          if (splitText[splitText.length - 1].trim().length > 0 || splitText[splitText.length - 1].match(/\n/)) {
            break;
          }
          splitText.pop();
        }
        var processText = function processText2(text, index) {
          if (text.trim().length === 0 && !text.match(/\n/)) {
            return;
          }
          if (text.match(/[\n|>][>]?[\s]?$/) || index === splitText.length - 1) {
            joinedText += text;
          } else {
            joinedText += `${text}
`;
          }
        };
        splitText.forEach(processText);
        return joinedText;
      }, htmlToMarkdown: function htmlToMarkdown(htmlString) {
        var extras = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var generatedMarkdown = htmlString;
        var body = /<(body)(?:"[^"]*"|'[^']*'|[^'"><])*>(?:\n|\r\n)?([\s\S]*?)(?:\n|\r\n)?<\/\1>(?![^<]*(<\/pre>|<\/code>))/im;
        var parseBodyTag = generatedMarkdown.match(body);
        if (parseBodyTag) {
          generatedMarkdown = parseBodyTag[2];
        }
        var processRule = function processRule2(rule) {
          if (rule.pre) {
            generatedMarkdown = rule.pre(generatedMarkdown);
          }
          var replacementFunction = typeof rule.replacement === "function" ? function() {
            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }
            return rule.replacement.apply(rule, args.concat([extras]));
          } : rule.replacement;
          generatedMarkdown = generatedMarkdown.replace(rule.regex, replacementFunction);
        };
        this.htmlToMarkdownRules.forEach(processRule);
        return str_1.default.htmlDecode(this.replaceBlockElementWithNewLine(generatedMarkdown));
      }, htmlToText: function htmlToText(htmlString) {
        var extras = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        var replacedText = htmlString;
        var processRule = function processRule2(rule) {
          var replacementFunction = typeof rule.replacement === "function" ? function() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
              args[_key4] = arguments[_key4];
            }
            return rule.replacement.apply(rule, args.concat([extras]));
          } : rule.replacement;
          replacedText = replacedText.replace(rule.regex, replacementFunction);
        };
        this.htmlToTextRules.forEach(processRule);
        replacedText = str_1.default.htmlDecode(replacedText);
        return replacedText;
      }, modifyTextForQuote: function modifyTextForQuote(regex, textToCheck, replacement) {
        var replacedText = "";
        var textToFormat = "";
        var match = textToCheck.match(regex);
        if (match !== null) {
          var insideCodefence = false;
          var textSplitted = textToCheck.split("\n");
          for (var i = 0; i < textSplitted.length; i++) {
            if (!insideCodefence) {
              insideCodefence = str_1.default.contains(textSplitted[i], "<pre>");
            }
            if (str_1.default.startsWith(textSplitted[i], "&gt;") && !insideCodefence) {
              textToFormat += `${textSplitted[i]}
`;
            } else {
              if (textToFormat !== "") {
                replacedText += this.formatTextForQuote(regex, textToFormat, replacement);
                textToFormat = "";
              }
              if (i === textSplitted.length - 1) {
                replacedText += `${textSplitted[i]}`;
              } else {
                replacedText += `${textSplitted[i]}
`;
              }
              if (insideCodefence) {
                insideCodefence = !str_1.default.contains(textSplitted[i], "</pre>");
              }
            }
          }
          if (textToFormat !== "") {
            replacedText += this.formatTextForQuote(regex, textToFormat, replacement);
          }
        } else {
          replacedText = textToCheck;
        }
        return replacedText;
      }, formatTextForQuote: function formatTextForQuote(regex, textToCheck, replacement) {
        if (textToCheck.match(regex)) {
          var formatRow = function formatRow2(row) {
            var quoteContent = row[4] === " " ? row.substr(5) : row.substr(4);
            if (quoteContent.trimStart().startsWith("&gt;")) {
              return quoteContent.trimStart();
            }
            return quoteContent;
          };
          var textToFormat = _3.map(textToCheck.split("\n"), formatRow).join("\n");
          textToFormat = textToFormat.replace(/^\n+|\n+$/g, "");
          return replacement(textToFormat);
        }
        return textToCheck;
      }, containsNonPairTag: function containsNonPairTag(textToCheck) {
        var tagRegExp = /<([a-z][a-z0-9-]*)\b[^>]*>|<\/([a-z][a-z0-9-]*)\s*>/gi;
        var tagStack = [];
        var match = tagRegExp.exec(textToCheck);
        while (match) {
          var openingTag = match[1];
          var closingTag = match[2];
          if (openingTag && openingTag !== "br") {
            tagStack.push(openingTag);
          } else if (closingTag) {
            var expectedTag = tagStack.pop();
            if (closingTag !== expectedTag) {
              return true;
            }
          }
          match = tagRegExp.exec(textToCheck);
        }
        return tagStack.length !== 0;
      }, extractLinksInMarkdownComment: function extractLinksInMarkdownComment(comment) {
        try {
          var htmlString = this.replace(comment, { filterRules: ["link"] });
          var regex = new RegExp(`<a href="${UrlPatterns.MARKDOWN_URL_REGEX}" target="_blank" rel="noreferrer noopener">`, "gi");
          var matches = (0, _toConsumableArray2.default)(htmlString.matchAll(regex));
          var sanitizeMatch = function sanitizeMatch2(match) {
            return str_1.default.sanitizeURL(match[1]);
          };
          var links = _3.map(matches, sanitizeMatch);
          return links;
        } catch (e) {
          console.warn("Error parsing url in ExpensiMark.extractLinksInMarkdownComment", { error: e });
          return void 0;
        }
      }, getRemovedMarkdownLinks: function getRemovedMarkdownLinks(oldComment, newComment) {
        var linksInOld = this.extractLinksInMarkdownComment(oldComment);
        var linksInNew = this.extractLinksInMarkdownComment(newComment);
        return linksInOld === void 0 || linksInNew === void 0 ? [] : _3.difference(linksInOld, linksInNew);
      }, escapeAttributeContent: function escapeAttributeContent(content) {
        var originalContent = this.htmlToMarkdown(content);
        if (content === originalContent) {
          return content;
        }
        originalContent = str_1.default.replaceAll(originalContent, "\n", "");
        return _3.escape(originalContent);
      } };
      ExpensiMark2.initializer();
      exports.default = ExpensiMark2;
    } });
    var import_ExpensiMark = __toESM(require_ExpensiMark());
    init_index_all();
    function parseMarkdownToHTML(markdown) {
      var parser = import_ExpensiMark.default;
      var html = parser.replace(markdown, { shouldKeepRawInput: true });
      return html;
    }
    function parseHTMLToTokens(html) {
      var tokens = [];
      var left = 0;
      while (true) {
        var open = html.indexOf("<", left);
        if (open === -1) {
          if (left < html.length) {
            tokens.push(["TEXT", html.substring(left)]);
          }
          break;
        }
        if (open !== left) {
          tokens.push(["TEXT", html.substring(left, open)]);
        }
        var close = html.indexOf(">", open);
        if (close === -1) {
          throw new Error('[react-native-live-markdown] Error in function parseHTMLToTokens: Invalid HTML: no matching ">"');
        }
        tokens.push(["HTML", html.substring(open, close + 1)]);
        left = close + 1;
      }
      return tokens;
    }
    function parseTokensToTree(tokens) {
      var stack = [{ tag: "<>", children: [] }];
      tokens.forEach(function(_ref2) {
        var _ref3 = (0, _slicedToArray2.default)(_ref2, 2), type = _ref3[0], payload = _ref3[1];
        if (type === "TEXT") {
          var text = index_default_default.unescape(payload);
          var top = stack[stack.length - 1];
          top.children.push(text);
        } else if (type === "HTML") {
          if (payload.startsWith("</")) {
            var child = stack.pop();
            var _top = stack[stack.length - 1];
            _top.children.push(child);
          } else if (payload.endsWith("/>")) {
            var _top2 = stack[stack.length - 1];
            _top2.children.push({ tag: payload, children: [] });
          } else {
            stack.push({ tag: payload, children: [] });
          }
        } else {
          throw new Error(`[react-native-live-markdown] Error in function parseTokensToTree: Unknown token type: ${type}. Expected 'TEXT' or 'HTML'. Please ensure tokens only contain these types.`);
        }
      });
      if (stack.length !== 1) {
        var unclosedTags = stack.length > 0 ? stack.slice(1).map(function(item) {
          return item.tag;
        }).join(", ") : "";
        throw new Error(`[react-native-live-markdown] Invalid HTML structure: the following tags are not properly closed: ${unclosedTags}. Ensure each opening tag has a corresponding closing tag.`);
      }
      return stack[0];
    }
    function parseTreeToTextAndRanges(tree) {
      var text = "";
      function processChildren(node) {
        if (typeof node === "string") {
          text += node;
        } else {
          node.children.forEach(dfs);
        }
      }
      function appendSyntax(syntax) {
        addChildrenWithStyle(syntax, "syntax");
      }
      function addChildrenWithStyle(node, type) {
        var start = text.length;
        processChildren(node);
        var end = text.length;
        ranges.push({ type, start, length: end - start });
      }
      var ranges = [];
      function dfs(node) {
        if (typeof node === "string") {
          text += node;
        } else {
          if (node.tag === "<>") {
            processChildren(node);
          } else if (node.tag === "<strong>") {
            appendSyntax("*");
            addChildrenWithStyle(node, "bold");
            appendSyntax("*");
          } else if (node.tag === "<em>") {
            appendSyntax("_");
            addChildrenWithStyle(node, "italic");
            appendSyntax("_");
          } else if (node.tag === "<del>") {
            appendSyntax("~");
            addChildrenWithStyle(node, "strikethrough");
            appendSyntax("~");
          } else if (node.tag === "<emoji>") {
            addChildrenWithStyle(node, "emoji");
          } else if (node.tag === "<code>") {
            appendSyntax("`");
            addChildrenWithStyle(node, "code");
            appendSyntax("`");
          } else if (node.tag === "<mention-here>") {
            addChildrenWithStyle(node, "mention-here");
          } else if (node.tag === "<mention-user>") {
            addChildrenWithStyle(node, "mention-user");
          } else if (node.tag === "<mention-report>") {
            addChildrenWithStyle(node, "mention-report");
          } else if (node.tag === "<blockquote>") {
            appendSyntax(">");
            addChildrenWithStyle(node, "blockquote");
            if (ranges.length > 0) {
              var curr = ranges[ranges.length - 1];
              curr.start -= 1;
              curr.length += 1;
            }
          } else if (node.tag === "<h1>") {
            appendSyntax("# ");
            addChildrenWithStyle(node, "h1");
          } else if (node.tag.startsWith("<pre")) {
            appendSyntax("```");
            var content = node.children.join("").replaceAll("&#32;", " ");
            addChildrenWithStyle(`
${content}`, "pre");
            appendSyntax("```");
          } else if (node.tag.startsWith('<a href="')) {
            var rawHref = node.tag.match(/href="([^"]*)"/)[1];
            var href = index_default_default.unescape(rawHref);
            var isLabeledLink = node.tag.match(/data-link-variant="([^"]*)"/)[1] === "labeled";
            var dataRawHref = node.tag.match(/data-raw-href="([^"]*)"/);
            var matchString = dataRawHref ? index_default_default.unescape(dataRawHref[1]) : href;
            if (!isLabeledLink && node.children.length === 1 && typeof node.children[0] === "string" && (node.children[0] === matchString || `mailto:${node.children[0]}` === href)) {
              addChildrenWithStyle(node.children[0], "link");
            } else {
              appendSyntax("[");
              processChildren(node);
              appendSyntax("](");
              addChildrenWithStyle(matchString, "link");
              appendSyntax(")");
            }
          } else if (node.tag.startsWith('<img src="')) {
            var src = node.tag.match(/src="([^"]*)"/)[1];
            var alt = node.tag.match(/alt="([^"]*)"/);
            var hasAlt = node.tag.match(/data-link-variant="([^"]*)"/)[1] === "labeled";
            var rawLink = node.tag.match(/data-raw-href="([^"]*)"/);
            var linkString = rawLink ? index_default_default.unescape(rawLink[1]) : src;
            appendSyntax("!");
            if (hasAlt) {
              appendSyntax("[");
              processChildren(index_default_default.unescape((alt == null ? void 0 : alt[1]) || ""));
              appendSyntax("]");
            }
            appendSyntax("(");
            addChildrenWithStyle(linkString, "link");
            appendSyntax(")");
          } else {
            throw new Error(`[react-native-live-markdown] Error in function parseTreeToTextAndRanges: Unknown tag '${node.tag}'. This tag is not supported in this function's logic.`);
          }
        }
      }
      dfs(tree);
      return [text, ranges];
    }
    function getTagPriority(tag) {
      switch (tag) {
        case "blockquote":
          return 2;
        case "h1":
          return 1;
        default:
          return 0;
      }
    }
    function sortRanges(ranges) {
      return ranges.sort(function(a, b) {
        return a.start - b.start || b.length - a.length || getTagPriority(b.type) - getTagPriority(a.type) || 0;
      });
    }
    function groupRanges(ranges) {
      var lastVisibleRangeIndex = {};
      return ranges.reduce(function(acc, range2) {
        var start = range2.start;
        var end = range2.start + range2.length;
        var rangeWithSameStyleIndex = lastVisibleRangeIndex[range2.type];
        var sameStyleRange = rangeWithSameStyleIndex !== void 0 ? acc[rangeWithSameStyleIndex] : void 0;
        if (sameStyleRange && sameStyleRange.start <= start && sameStyleRange.start + sameStyleRange.length >= end && range2.length > 1) {
          sameStyleRange.depth = (sameStyleRange.depth || 1) + 1;
        } else {
          lastVisibleRangeIndex[range2.type] = acc.length;
          acc.push(range2);
        }
        return acc;
      }, []);
    }
    function parseExpensiMarkToRanges(markdown) {
      try {
        var html = parseMarkdownToHTML(markdown);
        var tokens = parseHTMLToTokens(html);
        var tree = parseTokensToTree(tokens);
        var _parseTreeToTextAndRa = parseTreeToTextAndRanges(tree), _parseTreeToTextAndRa2 = (0, _slicedToArray2.default)(_parseTreeToTextAndRa, 2), text = _parseTreeToTextAndRa2[0], ranges = _parseTreeToTextAndRa2[1];
        if (text !== markdown) {
          throw new Error(`[react-native-live-markdown] Parsing error: the processed text does not match the original Markdown input. This may be caused by incorrect parsing functions or invalid input Markdown.
Processed input: '${JSON.stringify(text)}'
Original input: '${JSON.stringify(markdown)}'`);
        }
        var sortedRanges = sortRanges(ranges);
        var groupedRanges = groupRanges(sortedRanges);
        return groupedRanges;
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    globalThis.parseExpensiMarkToRanges = parseExpensiMarkToRanges;
  })();
})();
