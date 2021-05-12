// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"htmldiff.js":[function(require,module,exports) {
var define;
/**
 * htmldiff.js a diff algorithm that understands HTML, and produces HTML in the browser.
 *
 * @author https://github.com/tnwinc
 * @see https://github.com/tnwinc/htmldiff.js
 */
!function () {
  var e, n, t, r, i, f, _, a, o, s, u, h, l, c, _d, b, p;

  o = function o(e) {
    return ">" === e;
  }, s = function s(e) {
    return "<" === e;
  }, h = function h(e) {
    return /^\s+$/.test(e);
  }, u = function u(e) {
    return /^\s*<[^>]+>\s*$/.test(e);
  }, l = function l(e) {
    return !u(e);
  }, e = function () {
    return function (e, n, t) {
      this.start_in_before = e, this.start_in_after = n, this.length = t, this.end_in_before = this.start_in_before + this.length - 1, this.end_in_after = this.start_in_after + this.length - 1;
    };
  }(), a = function a(e) {
    var n, t, r, i, f, _;

    for (f = "char", t = "", _ = [], r = 0, i = e.length; r < i; r++) {
      switch (n = e[r], f) {
        case "tag":
          o(n) ? (t += ">", _.push(t), t = "", f = h(n) ? "whitespace" : "char") : t += n;
          break;

        case "char":
          s(n) ? (t && _.push(t), t = "<", f = "tag") : /\s/.test(n) ? (t && _.push(t), t = n, f = "whitespace") : /[\w\#@]+/i.test(n) ? t += n : (t && _.push(t), t = n);
          break;

        case "whitespace":
          s(n) ? (t && _.push(t), t = "<", f = "tag") : h(n) ? t += n : (t && _.push(t), t = n, f = "char");
          break;

        default:
          throw new Error("Unknown mode " + f);
      }
    }

    return t && _.push(t), _;
  }, f = function f(n, t, r, i, _f, _, a) {
    var o, s, u, h, l, c, d, b, p, g, w, v, k, m, y;

    for (s = i, o = _, u = 0, w = {}, c = h = m = i, y = _f; m <= y ? h < y : h > y; c = m <= y ? ++h : --h) {
      for (k = {}, d = 0, b = (p = r[n[c]]).length; d < b; d++) {
        if (!((l = p[d]) < _)) {
          if (l >= a) break;
          null == w[l - 1] && (w[l - 1] = 0), v = w[l - 1] + 1, k[l] = v, v > u && (s = c - v + 1, o = l - v + 1, u = v);
        }
      }

      w = k;
    }

    return 0 !== u && (g = new e(s, o, u)), g;
  }, _d = function d(e, n, t, r, i, _, a, o) {
    var s;
    return null != (s = f(e, 0, t, r, i, _, a)) && (r < s.start_in_before && _ < s.start_in_after && _d(e, n, t, r, s.start_in_before, _, s.start_in_after, o), o.push(s), s.end_in_before <= i && s.end_in_after <= a && _d(e, n, t, s.end_in_before + 1, i, s.end_in_after + 1, a, o)), o;
  }, r = function r(e) {
    var n, t, r, i, f, _;

    if (null == e.find_these) throw new Error("params must have find_these key");
    if (null == e.in_these) throw new Error("params must have in_these key");

    for (r = {}, n = 0, i = (f = e.find_these).length; n < i; n++) {
      for (r[_ = f[n]] = [], t = e.in_these.indexOf(_); -1 !== t;) {
        r[_].push(t), t = e.in_these.indexOf(_, t + 1);
      }
    }

    return r;
  }, _ = function _(e, n) {
    var t, i;
    return i = [], t = r({
      find_these: e,
      in_these: n
    }), _d(e, n, t, 0, e.length, 0, n.length, i);
  }, n = function n(_n, t) {
    var r, i, f, a, o, s, u, h, l, c, d, b, p, g, w, v;
    if (null == _n) throw new Error("before_tokens?");
    if (null == t) throw new Error("after_tokens?");

    for (w = g = 0, p = [], r = {
      "false,false": "replace",
      "true,false": "insert",
      "false,true": "delete",
      "true,true": "none"
    }, (d = _(_n, t)).push(new e(_n.length, t.length, 0)), a = f = 0, h = d.length; f < h; a = ++f) {
      "none" !== (i = r[[w === (c = d[a]).start_in_before, g === c.start_in_after].toString()]) && p.push({
        action: i,
        start_in_before: w,
        end_in_before: "insert" !== i ? c.start_in_before - 1 : void 0,
        start_in_after: g,
        end_in_after: "delete" !== i ? c.start_in_after - 1 : void 0
      }), 0 !== c.length && p.push({
        action: "equal",
        start_in_before: c.start_in_before,
        end_in_before: c.end_in_before,
        start_in_after: c.start_in_after,
        end_in_after: c.end_in_after
      }), w = c.end_in_before + 1, g = c.end_in_after + 1;
    }

    for (v = [], u = {
      action: "none"
    }, o = function o(e) {
      return "equal" === e.action && e.end_in_before - e.start_in_before == 0 && /^\s$/.test(_n.slice(e.start_in_before, +e.end_in_before + 1 || 9e9));
    }, s = 0, l = p.length; s < l; s++) {
      o(b = p[s]) && "replace" === u.action || "replace" === b.action && "replace" === u.action ? (u.end_in_before = b.end_in_before, u.end_in_after = b.end_in_after) : (v.push(b), u = b);
    }

    return v;
  }, t = function t(e, n, _t) {
    var r, i, f, _, a, o;

    for (_ = void 0, f = i = 0, a = (n = n.slice(e, +n.length + 1 || 9e9)).length; i < a && (o = n[f], !0 === (r = _t(o)) && (_ = f), !1 !== r); f = ++i) {
      ;
    }

    return null != _ ? n.slice(0, +_ + 1 || 9e9) : [];
  }, p = function p(e, n) {
    var r, i, f, _, a;

    for (_ = "", f = 0, r = n.length;;) {
      if (f >= r) break;
      if (i = t(f, n, l), f += i.length, 0 !== i.length && (_ += "<" + e + ">" + i.join("") + "</" + e + ">"), f >= r) break;
      f += (a = t(f, n, u)).length, _ += a.join("");
    }

    return _;
  }, (c = {
    equal: function equal(e, n, t) {
      return n.slice(e.start_in_before, +e.end_in_before + 1 || 9e9).join("");
    },
    insert: function insert(e, n, t) {
      var r;
      return r = t.slice(e.start_in_after, +e.end_in_after + 1 || 9e9), p("ins", r);
    },
    delete: function _delete(e, n, t) {
      var r;
      return r = n.slice(e.start_in_before, +e.end_in_before + 1 || 9e9), p("del", r);
    }
  }).replace = function (e, n, t) {
    return c.delete(e, n, t) + c.insert(e, n, t);
  }, b = function b(e, n, t) {
    var r, i, f, _;

    for (_ = "", r = 0, i = t.length; r < i; r++) {
      f = t[r], _ += c[f.action](f, e, n);
    }

    return _;
  }, (i = function i(e, t) {
    var r;
    return e === t ? e : (e = a(e), t = a(t), r = n(e, t), b(e, t, r));
  }).html_to_tokens = a, i.find_matching_blocks = _, _.find_match = f, _.create_index = r, i.calculate_operations = n, i.render_operations = b, "function" == typeof define ? define([], function () {
    return i;
  }) : "undefined" != typeof module && null !== module ? module.exports = i : "undefined" != typeof window && (window.htmldiff = i);
}();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54387" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","htmldiff.js"], null)
//# sourceMappingURL=/htmldiff.5de7801e.js.map