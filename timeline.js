/*
Copyright (c) 2019 Daybrush
name: @scenejs/timeline
license: MIT
author: Daybrush
repository: git+https://github.com/daybrush/scenejs-timeline.git
version: 0.3.0
*/
!
	function (e, t) {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Timeline = t()
	}(this,
		function () {
			"use strict";
			var i = function (e, t) {
				return (i = Object.setPrototypeOf || {
					__proto__: []
				}
					instanceof Array &&
					function (e, t) {
						e.__proto__ = t
					} ||
					function (e, t) {
						for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
					})(e, t)
			};
			var s = function () {
				return (s = Object.assign ||
					function (e) {
						for (var t, n = 1,
							r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
						return e
					}).apply(this, arguments)
			},
				l = function () { },
				w = {},
				c = [],
				p = [];
			function u(e, t) {
				for (var n, r, i, o = p,
					a = arguments.length; 2 < a--;) c.push(arguments[a]);
				for (t && null != t.children && (c.length || c.push(t.children), delete t.children); c.length;) if ((r = c.pop()) && void 0 !== r.pop) for (a = r.length; a--;) c.push(r[a]);
				else "boolean" == typeof r && (r = null),
					(i = "function" != typeof e) && (null == r ? r = "" : "number" == typeof r ? r = String(r) : "string" != typeof r && (i = !1)),
					i && n ? o[o.length - 1] += r : o === p ? o = [r] : o.push(r),
					n = i;
				var s = new l;
				return s.nodeName = e,
					s.children = o,
					s.attributes = null == t ? void 0 : t,
					s.key = null == t ? void 0 : t.key,
					void 0 !== w.vnode && w.vnode(s),
					s
			}
			function _(e, t) {
				for (var n in t) e[n] = t[n];
				return e
			}
			function f(e, t) {
				e && ("function" == typeof e ? e(t) : e.current = t)
			}
			var t = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
				d = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
				n = [];
			function o(e) {
				!e._dirty && (e._dirty = !0) && 1 == n.push(e) && (w.debounceRendering || t)(r)
			}
			function r() {
				for (var e; e = n.pop();) e._dirty && M(e)
			}
			function C(e, t) {
				return e.normalizedNodeName === t || e.nodeName.toLowerCase() === t.toLowerCase()
			}
			function P(e) {
				var t = _({},
					e.attributes);
				t.children = e.children;
				var n = e.nodeName.defaultProps;
				if (void 0 !== n) for (var r in n) void 0 === t[r] && (t[r] = n[r]);
				return t
			}
			function T(e) {
				var t = e.parentNode;
				t && t.removeChild(e)
			}
			function h(e, t, n, r, i) {
				if ("key" !== (t = "className" === t ? "class" : t)) if ("ref" === t) f(n, null),
					f(r, e);
				else if ("class" !== t || i) if ("style" === t) {
					if (r && "string" != typeof r && "string" != typeof n || (e.style.cssText = r || ""), r && "object" == typeof r) {
						if ("string" != typeof n) for (var o in n) o in r || (e.style[o] = "");
						for (var o in r) e.style[o] = "number" == typeof r[o] && !1 === d.test(o) ? r[o] + "px" : r[o]
					}
				} else if ("dangerouslySetInnerHTML" === t) r && (e.innerHTML = r.__html || "");
				else if ("o" == t[0] && "n" == t[1]) {
					var a = t !== (t = t.replace(/Capture$/, ""));
					t = t.toLowerCase().substring(2),
						r ? n || e.addEventListener(t, m, a) : e.removeEventListener(t, m, a),
						(e._listeners || (e._listeners = {}))[t] = r
				} else if ("list" !== t && "type" !== t && !i && t in e) {
					try {
						e[t] = null == r ? "" : r
					} catch (e) { }
					null != r && !1 !== r || "spellcheck" == t || e.removeAttribute(t)
				} else {
					i = i && t !== (t = t.replace(/^xlink:?/, ""));
					null == r || !1 === r ? i ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof r && (i ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), r) : e.setAttribute(t, r))
				} else e.className = r || ""
			}
			function m(e) {
				return this._listeners[e.type](w.event && w.event(e) || e)
			}
			var D = [],
				N = 0,
				v = !1,
				y = !1;
			function E() {
				for (var e; e = D.shift();) w.afterMount && w.afterMount(e),
					e.componentDidMount && e.componentDidMount()
			}
			function S(e, t, n, r, i, o) {
				N++ || (v = null != i && void 0 !== i.ownerSVGElement, y = null != e && !("__preactattr_" in e));
				r = A(e, t, n, r, o);
				return i && r.parentNode !== i && i.appendChild(r),
					--N || (y = !1, o || E()),
					r
			}
			function A(e, t, n, r, i) {
				var o = e,
					a = v;
				if ("string" == typeof (t = null == t || "boolean" == typeof t ? "" : t) || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || i) ? e.nodeValue != t && (e.nodeValue = t) : (o = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(o, e), O(e, !0))),
					o.__preactattr_ = !0,
					o;
				i = t.nodeName;
				if ("function" == typeof i) return function (e, t, n, r) {
					var i = e && e._component,
						o = i,
						a = e,
						s = i && e._componentConstructor === t.nodeName,
						l = s,
						c = P(t);
					for (; i && !l && (i = i._parentComponent);) l = i.constructor === t.nodeName;
					i && l && (!r || i._component) ? (j(i, c, 3, n, r), e = i.base) : (o && !s && (K(o), e = a = null), i = I(t.nodeName, c, n), e && !i.nextBase && (i.nextBase = e, a = null), j(i, c, 1, n, r), e = i.base, a && e !== a && (a._component = null, O(a, !1)));
					return e
				}(e, t, n, r);
				if (v = "svg" === i || "foreignObject" !== i && v, i = String(i), (!e || !C(e, i)) && (s = i, (c = (c = v) ? document.createElementNS("http://www.w3.org/2000/svg", s) : document.createElement(s)).normalizedNodeName = s, o = c, e)) {
					for (; e.firstChild;) o.appendChild(e.firstChild);
					e.parentNode && e.parentNode.replaceChild(o, e),
						O(e, !0)
				}
				var s = o.firstChild,
					l = o.__preactattr_,
					c = t.children;
				if (null == l) for (var l = o.__preactattr_ = {},
					p = o.attributes,
					u = p.length; u--;) l[p[u].name] = p[u].value;
				return !y && c && 1 === c.length && "string" == typeof c[0] && null != s && void 0 !== s.splitText && null == s.nextSibling ? s.nodeValue != c[0] && (s.nodeValue = c[0]) : (c && c.length || null != s) &&
					function (e, t, n, r, i) {
						var o, a, s, l, c, p = e.childNodes,
							u = [],
							f = {},
							d = 0,
							h = 0,
							m = p.length,
							v = 0,
							y = t ? t.length : 0;
						if (0 !== m) for (var g = 0; g < m; g++) {
							var b = p[g],
								x = b.__preactattr_;
							null != (k = y && x ? b._component ? b._component.__key : x.key : null) ? (d++, f[k] = b) : (x || (void 0 !== b.splitText ? !i || b.nodeValue.trim() : i)) && (u[v++] = b)
						}
						if (0 !== y) for (var k, g = 0; g < y; g++) {
							if (l = t[g], (c = null) != (k = l.key)) d && void 0 !== f[k] && (c = f[k], f[k] = void 0, d--);
							else if (h < v) for (o = h; o < v; o++) if (void 0 !== u[o] &&
								function (e, t, n) {
									return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && C(e, t.nodeName) : n || e._componentConstructor === t.nodeName
								}(a = u[o], l, i)) {
								c = a,
									u[o] = void 0,
									o === v - 1 && v--,
									o === h && h++;
								break
							}
							c = A(c, l, n, r),
								s = p[g],
								c && c !== e && c !== s && (null == s ? e.appendChild(c) : c === s.nextSibling ? T(s) : e.insertBefore(c, s))
						}
						if (d) for (var g in f) void 0 !== f[g] && O(f[g], !1);
						for (; h <= v;) void 0 !== (c = u[v--]) && O(c, !1)
					}(o, c, n, r, y || null != l.dangerouslySetInnerHTML),
					function (e, t, n) {
						for (var r in n) t && null != t[r] || null == n[r] || h(e, r, n[r], n[r] = void 0, v);
						for (r in t) "children" === r || "innerHTML" === r || r in n && t[r] === ("value" === r || "checked" === r ? e : n)[r] || h(e, r, n[r], n[r] = t[r], v)
					}(o, t.attributes, l),
					v = a,
					o
			}
			function O(e, t) {
				var n = e._component;
				n ? K(n) : (null != e.__preactattr_ && f(e.__preactattr_.ref, null), !1 !== t && null != e.__preactattr_ || T(e), a(e))
			}
			function a(e) {
				for (e = e.lastChild; e;) {
					var t = e.previousSibling;
					O(e, !0),
						e = t
				}
			}
			var g = [];
			function I(e, t, n) {
				var r, i = g.length;
				for (e.prototype && e.prototype.render ? (r = new e(t, n), x.call(r, t, n)) : ((r = new x(t, n)).constructor = e, r.render = b); i--;) if (g[i].constructor === e) return r.nextBase = g[i].nextBase,
					g.splice(i, 1),
					r;
				return r
			}
			function b(e, t, n) {
				return this.constructor(e, n)
			}
			function j(e, t, n, r, i) {
				e._disable || (e._disable = !0, e.__ref = t.ref, e.__key = t.key, delete t.ref, delete t.key, void 0 === e.constructor.getDerivedStateFromProps && (!e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, r)), r && r !== e.context && (e.prevContext || (e.prevContext = e.context), e.context = r), e.prevProps || (e.prevProps = e.props), e.props = t, e._disable = !1, 0 !== n && (1 !== n && !1 === w.syncComponentUpdates && e.base ? o(e) : M(e, 1, i)), f(e.__ref, e))
			}
			function M(e, t, n, r) {
				if (!e._disable) {
					var i = e.props,
						o = e.state,
						a = e.context,
						s = e.prevProps || i,
						l = e.prevState || o,
						c = e.prevContext || a,
						p = e.base,
						u = e.nextBase,
						f = p || u,
						d = e._component,
						h = !1,
						m = c;
					if (e.constructor.getDerivedStateFromProps && (o = _(_({},
						o), e.constructor.getDerivedStateFromProps(i, o)), e.state = o), p && (e.props = s, e.state = l, e.context = c, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(i, o, a) ? h = !0 : e.componentWillUpdate && e.componentWillUpdate(i, o, a), e.props = i, e.state = o, e.context = a), e.prevProps = e.prevState = e.prevContext = e.nextBase = null, e._dirty = !1, !h) {
						i = e.render(i, o, a),
							e.getChildContext && (a = _(_({},
								a), e.getChildContext())),
							p && e.getSnapshotBeforeUpdate && (m = e.getSnapshotBeforeUpdate(s, l));
						var v, y, g, b, o = i && i.nodeName;
						if ("function" == typeof o ? (g = P(i), (b = d) && b.constructor === o && g.key == b.__key ? j(b, g, 1, a, !1) : (v = b, e._component = b = I(o, g, a), b.nextBase = b.nextBase || u, b._parentComponent = e, j(b, g, 0, a, !1), M(b, 1, n, !0)), y = b.base) : (g = f, (v = d) && (g = e._component = null), !f && 1 !== t || (g && (g._component = null), y = S(g, i, a, n || !p, f && f.parentNode, !0))), !f || y === f || b === d || (d = f.parentNode) && y !== d && (d.replaceChild(y, f), v || (f._component = null, O(f, !1))), v && K(v), (e.base = y) && !r) {
							for (var x = e,
								k = e; k = k._parentComponent;)(x = k).base = y;
							y._component = x,
								y._componentConstructor = x.constructor
						}
					}
					for (!p || n ? D.push(e) : h || (e.componentDidUpdate && e.componentDidUpdate(s, l, m), w.afterUpdate && w.afterUpdate(e)); e._renderCallbacks.length;) e._renderCallbacks.pop().call(e);
					N || r || E()
				}
			}
			function K(e) {
				w.beforeUnmount && w.beforeUnmount(e);
				var t = e.base;
				e._disable = !0,
					e.componentWillUnmount && e.componentWillUnmount(),
					e.base = null;
				var n = e._component;
				n ? K(n) : t && (null != t.__preactattr_ && f(t.__preactattr_.ref, null), T(e.nextBase = t), g.push(e), a(t)),
					f(e.__ref, null)
			}
			function x(e, t) {
				this._dirty = !0,
					this.context = t,
					this.props = e,
					this.state = this.state || {},
					this._renderCallbacks = []
			}
			_(x.prototype, {
				setState: function (e, t) {
					this.prevState || (this.prevState = this.state),
						this.state = _(_({},
							this.state), "function" == typeof e ? e(this.state, this.props) : e),
						t && this._renderCallbacks.push(t),
						o(this)
				},
				forceUpdate: function (e) {
					e && this._renderCallbacks.push(e),
						M(this, 2)
				},
				render: function () { }
			});
			var k = "object",
				z = "undefined",
				L = ['"', "'", '\\"', "\\'"];
			function U(e) {
				return typeof e === z
			}
			function X(e) {
				return e && typeof e === k
			}
			function W(e, t, n, r) {
				for (var i = n; i < r; ++i) {
					var o = t[i].trim();
					if (o === e) return i;
					var a = i;
					if ("(" === o ? a = W(")", t, i + 1, r) : -1 < L.indexOf(o) && (a = W(o, t, i + 1, r)), -1 === a) break;
					i = a
				}
				return - 1
			}
			function Y(e) {
				return function (e, t) {
					for (var n = new RegExp("(\\s*" + (t || ",") + "\\s*|\\(|\\)|\"|'|\\\\\"|\\\\'|\\s+)", "g"), r = e.split(n).filter(Boolean), i = r.length, o = [], a = [], s = 0; s < i; ++s) {
						var l = r[s].trim(),
							c = s;
						if ("(" === l) c = W(")", r, s + 1, i);
						else {
							if (")" === l) throw new Error("invalid format");
							if (- 1 < L.indexOf(l)) c = W(l, r, s + 1, i);
							else if (l === t) {
								a.length && (o.push(a.join("")), a = []);
								continue
							}
						} - 1 === c && (c = i - 1),
							a.push(r.slice(s, c + 1).join("")),
							s = c
					}
					return a.length && o.push(a.join("")),
						o
				}(e, ",")
			}
			function F(e, t, n) {
				void 0 === n && (n = -1);
				for (var r = e.length,
					i = 0; i < r; ++i) if (t(e[i], i, e)) return i;
				return n
			}
			function R(e, t, n, r) {
				e.addEventListener(t, n, r)
			}
			function B(e, t, n) {
				e.removeEventListener(t, n)
			}
			function H(e) {
				return void 0 === e
			}
			var e = function () {
				function e() {
					this.options = {},
						this._eventHandler = {}
				}
				var t = e.prototype;
				return t.trigger = function (e) {
					for (var t = this,
						n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
					if (!(0 < (a = this._eventHandler[e] || []).length)) return !0;
					var i = n[0] || {},
						o = n.slice(1),
						a = a.concat(),
						s = !1;
					i.eventType = e,
						i.stop = function () {
							s = !0
						},
						i.currentTarget = this;
					var l = [i];
					return 1 <= o.length && (l = l.concat(o)),
						a.forEach(function (e) {
							e.apply(t, l)
						}),
						!s
				},
					t.once = function (n, r) {
						var i, o = this;
						if ("object" == typeof n && H(r)) {
							var e, t = n;
							for (e in t) this.once(e, t[e]);
							return this
						}
						return "string" == typeof n && "function" == typeof r && this.on(n, i = function () {
							for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
							r.apply(o, e),
								o.off(n, i)
						}),
							this
					},
					t.hasOn = function (e) {
						return !!this._eventHandler[e]
					},
					t.on = function (e, t) {
						if ("object" == typeof e && H(t)) {
							var n, r = e;
							for (n in r) this.on(n, r[n]);
							return this
						}
						var i;
						return "string" == typeof e && "function" == typeof t && (H(i = this._eventHandler[e]) && (this._eventHandler[e] = [], i = this._eventHandler[e]), i.push(t)),
							this
					},
					t.off = function (e, t) {
						var n, r;
						if (H(e)) return this._eventHandler = {},
							this;
						if (H(t)) {
							if ("string" == typeof e) return delete this._eventHandler[e],
								this;
							var i, o = e;
							for (i in o) this.off(i, o[i]);
							return this
						}
						var a = this._eventHandler[e];
						if (a) {
							var s = 0;
							try {
								for (var l = function (e) {
									var t = "function" == typeof Symbol && Symbol.iterator,
										n = t && e[t],
										r = 0;
									if (n) return n.call(e);
									if (e && "number" == typeof e.length) return {
										next: function () {
											return {
												value: (e = e && r >= e.length ? void 0 : e) && e[r++],
												done: !e
											}
										}
									};
									throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
								}(a), c = l.next(); !c.done; c = l.next()) {
									if (c.value === t) {
										a.splice(s, 1);
										break
									}
									s++
								}
							} catch (e) {
								n = {
									error: e
								}
							} finally {
								try {
									c && !c.done && (r = l.
										return) && r.call(l)
								} finally {
									if (n) throw n.error
								}
							}
						}
						return this
					},
					e.VERSION = "2.2.2",
					e
			}(),
				V = function (e, t) {
					return (V = Object.setPrototypeOf || {
						__proto__: []
					}
						instanceof Array &&
						function (e, t) {
							e.__proto__ = t
						} ||
						function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(e, t)
				};
			var Z, q = (function (e, t) {
				function n(e) {
					if (!e || "object" != typeof e || (t = e.which || e.keyCode || e.charCode) && (e = t), "number" == typeof e) return s[e];
					var t = String(e),
						e = r[t.toLowerCase()];
					return e || ((e = i[t.toLowerCase()]) ? e : 1 === t.length ? t.charCodeAt(0) : void 0)
				}
				n.isEventKey = function (e, t) {
					if (e && "object" == typeof e) {
						var n = e.which || e.keyCode || e.charCode;
						if (null == n) return !1;
						if ("string" == typeof t) {
							e = r[t.toLowerCase()];
							if (e) return e === n;
							if (e = i[t.toLowerCase()]) return e === n
						} else if ("number" == typeof t) return t === n;
						return !1
					}
				};
				for (var r = (t = e.exports = n).code = t.codes = {
					backspace: 8,
					tab: 9,
					enter: 13,
					shift: 16,
					ctrl: 17,
					alt: 18,
					"pause/break": 19,
					"caps lock": 20,
					esc: 27,
					space: 32,
					"page up": 33,
					"page down": 34,
					end: 35,
					home: 36,
					left: 37,
					up: 38,
					right: 39,
					down: 40,
					insert: 45,
					delete: 46,
					command: 91,
					"left command": 91,
					"right command": 93,
					"numpad *": 106,
					"numpad +": 107,
					"numpad -": 109,
					"numpad .": 110,
					"numpad /": 111,
					"num lock": 144,
					"scroll lock": 145,
					"my computer": 182,
					"my calculator": 183,
					";": 186,
					"=": 187,
					",": 188,
					"-": 189,
					".": 190,
					"/": 191,
					"`": 192,
					"[": 219,
					"\\": 220,
					"]": 221,
					"'": 222
				},
					i = t.aliases = {
						windows: 91,
						"⇧": 16,
						"⌥": 18,
						"⌃": 17,
						"⌘": 91,
						ctl: 17,
						control: 17,
						option: 18,
						pause: 19,
						break: 19,
						caps: 20,
						return: 13,
						escape: 27,
						spc: 32,
						spacebar: 32,
						pgup: 33,
						pgdn: 34,
						ins: 45,
						del: 46,
						cmd: 91
					},
					o = 97; o < 123; o++) r[String.fromCharCode(o)] = o - 32;
				for (var o = 48; o < 58; o++) r[o - 48] = o;
				for (o = 1; o < 13; o++) r["f" + o] = o + 111;
				for (o = 0; o < 10; o++) r["numpad " + o] = o + 96;
				var a, s = t.names = t.title = {};
				for (o in r) s[r[o]] = o;
				for (a in i) r[a] = i[a]
			}(Z = {
				exports: {}
			},
				Z.exports), Z.exports),
				$ = (q.code, q.codes, q.aliases, q.names);
			q.title;
			function G(e) {
				return Array.isArray(e)
			}
			function J(e) {
				return "string" == typeof e
			}
			function Q(e, t, n, r) {
				e.addEventListener(t, n, r)
			}
			var ee, te = {
				"+": "plus",
				"left command": "meta",
				"right command": "meta"
			},
				ne = {
					shift: 1,
					ctrl: 2,
					alt: 3,
					meta: 4
				};
			function re(e) {
				var t, n = $[e] || "";
				for (t in te) n = n.replace(t, te[t]);
				return n.replace(/\s/g, "")
			}
			function ie(e) {
				e = e.slice();
				return e.sort(function (e, t) {
					return (ne[e] || 5) - (ne[t] || 5)
				}),
					e
			}
			var oe = function (n) {
				function e() {
					this.constructor = t
				}
				var t;
				function r(e) {
					void 0 === e && (e = window);
					var t = n.call(this) || this;
					return t.ctrlKey = !1,
						t.altKey = !1,
						t.shiftKey = !1,
						t.metaKey = !1,
						t.clear = function () {
							return t.ctrlKey = !1,
								t.altKey = !1,
								t.shiftKey = !1,
								t.metaKey = !1,
								t
						},
						t.keydownEvent = function (e) {
							t.triggerEvent("keydown", e)
						},
						t.keyupEvent = function (e) {
							t.triggerEvent("keyup", e)
						},
						Q(e, "blur", t.clear),
						Q(e, "keydown", t.keydownEvent),
						Q(e, "keyup", t.keyupEvent),
						t
				}
				V(t = r, i = n),
					t.prototype = null === i ? Object.create(i) : (e.prototype = i.prototype, new e);
				var i = r.prototype;
				return Object.defineProperty(r, "global", {
					get: function () {
						return ee = ee || new r
					},
					enumerable: !0,
					configurable: !0
				}),
					i.keydown = function (e, t) {
						return this.addEvent("keydown", e, t)
					},
					i.offKeydown = function (e, t) {
						return this.removeEvent("keydown", e, t)
					},
					i.offKeyup = function (e, t) {
						return this.removeEvent("keyup", e, t)
					},
					i.keyup = function (e, t) {
						return this.addEvent("keyup", e, t)
					},
					i.addEvent = function (e, t, n) {
						return G(t) ? this.on(e + "." + ie(t).join("."), n) : J(t) ? this.on(e + "." + t, n) : this.on(e, t),
							this
					},
					i.removeEvent = function (e, t, n) {
						return G(t) ? this.off(e + "." + ie(t).join("."), n) : J(t) ? this.off(e + "." + t, n) : this.off(e, t),
							this
					},
					i.triggerEvent = function (e, t) {
						this.ctrlKey = t.ctrlKey,
							this.shiftKey = t.shiftKey,
							this.altKey = t.altKey,
							this.metaKey = t.metaKey;
						var n = re(t.keyCode),
							r = {
								key: n,
								isToggle: "ctrl" === n || "shift" === n || "meta" === n || "alt" === n,
								inputEvent: t,
								keyCode: t.keyCode,
								ctrlKey: t.ctrlKey,
								altKey: t.altKey,
								shiftKey: t.shiftKey,
								metaKey: t.metaKey
							};
						this.trigger(e, r),
							this.trigger(e + "." + n, r);
						t = t,
							void 0 === (n = n) && (n = re(t.keyCode)),
							-1 === (t = [t.shiftKey && "shift", t.ctrlKey && "ctrl", t.altKey && "alt", t.metaKey && "meta"]).indexOf(n) && t.push(n),
							t = t.filter(Boolean);
						1 < t.length && this.trigger(e + "." + t.join("."), r)
					},
					r
			}(e);
			function ae() {
				return Date.now ? Date.now() : (new Date).getTime()
			}
			function se(e, t, n, r) {
				e.addEventListener(t, n, r)
			}
			function le(e, t, n) {
				e.removeEventListener(t, n)
			}
			var ce = function () {
				return (ce = Object.assign ||
					function (e) {
						for (var t, n = 1,
							r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
						return e
					}).apply(this, arguments)
			};
			function pe(e) {
				return 180 * (t = [e[0].clientX, e[0].clientY], n = [e[1].clientX, e[1].clientY], e = n[0] - t[0], t = n[1] - t[1], (0 <= (e = Math.atan2(t, e)) ? e : e + 2 * Math.PI) / Math.PI);
				var t, n
			}
			function ue(e, t, n, r) {
				var i = ge(e),
					e = ge(t),
					t = ge(r);
				return de(be(r[0], xe(i, t)), be(r[0], xe(e, t)), n[0])
			}
			function fe(e) {
				return e.touches ? ve(e.touches) : [ye(e)]
			}
			function de(e, t, n) {
				var r = e.clientX,
					e = e.clientY;
				return {
					clientX: r,
					clientY: e,
					deltaX: r - t.clientX,
					deltaY: e - t.clientY,
					distX: r - n.clientX,
					distY: e - n.clientY
				}
			}
			function he(e) {
				return Math.sqrt(Math.pow(e[0].clientX - e[1].clientX, 2) + Math.pow(e[0].clientY - e[1].clientY, 2))
			}
			function me(e, n, r) {
				return e.map(function (e, t) {
					return de(e, n[t], r[t])
				})
			}
			function ve(e) {
				for (var t = Math.min(e.length, 2), n = [], r = 0; r < t; ++r) n.push(ye(e[r]));
				return n
			}
			function ye(e) {
				return {
					clientX: e.clientX,
					clientY: e.clientY
				}
			}
			function ge(e) {
				return 1 === e.length ? e[0] : {
					clientX: (e[0].clientX + e[1].clientX) / 2,
					clientY: (e[0].clientY + e[1].clientY) / 2
				}
			}
			function be(e, t) {
				return {
					clientX: e.clientX + t.clientX,
					clientY: e.clientY + t.clientY
				}
			}
			function xe(e, t) {
				return {
					clientX: e.clientX - t.clientX,
					clientY: e.clientY - t.clientY
				}
			}
			var ke = ["textarea", "input"],
				we = function () {
					function e(e, t) {
						var d = this;
						void 0 === t && (t = {}),
							this.options = {},
							this.flag = !1,
							this.pinchFlag = !1,
							this.datas = {},
							this.isDrag = !1,
							this.isPinch = !1,
							this.isMouse = !1,
							this.isTouch = !1,
							this.prevClients = [],
							this.startClients = [],
							this.movement = 0,
							this.startPinchClients = [],
							this.startDistance = 0,
							this.customDist = [0, 0],
							this.targets = [],
							this.prevTime = 0,
							this.isDouble = !1,
							this.startRotate = 0,
							this.onDragStart = function (e, t) {
								if (void 0 === t && (t = !0), d.flag || !1 !== e.cancelable) {
									var n = d.options,
										r = n.container,
										i = n.pinchOutside,
										o = n.dragstart,
										a = n.preventRightClick,
										s = n.preventDefault,
										l = n.checkInput,
										c = d.isTouch;
									if (!d.flag) {
										var p = document.activeElement,
											u = e.target,
											f = u.tagName.toLowerCase(),
											n = -1 < ke.indexOf(f),
											f = u.isContentEditable;
										if (n || f) {
											if (l || p === u) return !1;
											if (p && f && p.isContentEditable && p.contains(u)) return !1
										} else (s || "touchstart" === e.type) && p && (u = p.tagName, (p.isContentEditable || -1 < ke.indexOf(u)) && p.blur())
									}
									p = 0;
									if (!d.flag && c && i && (p = setTimeout(function () {
										se(r, "touchstart", d.onDragStart, {
											passive: !1
										})
									})), d.flag && c && i && le(r, "touchstart", d.onDragStart), (i = e).touches && 2 <= i.touches.length) {
										if (clearTimeout(p), !d.flag && e.touches.length !== e.changedTouches.length) return;
										d.pinchFlag || d.onPinchStart(e)
									}
									if (!d.flag) {
										i = d.startClients[0] ? d.startClients : fe(e);
										d.customDist = [0, 0],
											d.flag = !0,
											d.isDrag = !1,
											d.startClients = i,
											d.prevClients = i,
											d.datas = {};
										i = de(i[d.movement = 0], d.prevClients[0], d.startClients[0]);
										if (a && (3 === e.which || 2 === e.button)) return clearTimeout(p),
											d.initDrag(),
											!1; !1 === (o && o(ce({
												type: "dragstart",
												datas: d.datas,
												inputEvent: e,
												isTrusted: t
											},
												i))) && (clearTimeout(p), d.initDrag()),
												d.isDouble = ae() - d.prevTime < 200,
												d.flag && s && e.preventDefault()
									}
								}
							},
							this.onDrag = function (e, t) {
								var n, r;
								d.flag && (r = fe(e), d.pinchFlag && d.onPinch(e, r), !(n = d.move([0, 0], e, r)) || !n.deltaX && !n.deltaY || (r = d.options.drag) && r(ce({},
									n, {
									isScroll: !!t,
									inputEvent: e
								})))
							},
							this.onDragEnd = function (e) {
								var t, n, r, i;
								d.flag && (t = (r = d.options).dragend, i = r.pinchOutside, n = r.container, d.isTouch && i && le(n, "touchstart", d.onDragStart), d.pinchFlag && d.onPinchEnd(e), d.flag = !1, r = d.prevClients, i = d.startClients, n = d.pinchFlag ? ue(r, r, i, d.startPinchClients) : de(r[0], r[0], i[0]), r = ae(), i = !d.isDrag && d.isDouble, d.prevTime = d.isDrag || i ? 0 : r, d.startClients = [], d.prevClients = [], t && t(ce({
									type: "dragend",
									datas: d.datas,
									isDouble: i,
									isDrag: d.isDrag,
									inputEvent: e
								},
									n)))
							};
						var n = [].concat(e);
						this.options = ce({
							checkInput: !1,
							container: 1 < n.length ? window : n[0],
							preventRightClick: !0,
							preventDefault: !0,
							pinchThreshold: 0,
							events: ["touch", "mouse"]
						},
							t);
						var r, e = this.options,
							t = e.container,
							e = e.events;
						this.isTouch = -1 < e.indexOf("touch"),
							this.isMouse = -1 < e.indexOf("mouse"),
							this.customDist = [0, 0],
							this.targets = n,
							this.isMouse && (n.forEach(function (e) {
								se(e, "mousedown", d.onDragStart)
							}), se(t, "mousemove", this.onDrag), se(t, "mouseup", this.onDragEnd), se(t, "contextmenu", this.onDragEnd)),
							this.isTouch && (r = {
								passive: !1
							},
								n.forEach(function (e) {
									se(e, "touchstart", d.onDragStart, r)
								}), se(t, "touchmove", this.onDrag, r), se(t, "touchend", this.onDragEnd, r), se(t, "touchcancel", this.onDragEnd, r))
					}
					var t = e.prototype;
					return t.isDragging = function () {
						return this.isDrag
					},
						t.isFlag = function () {
							return this.flag
						},
						t.isPinchFlag = function () {
							return this.pinchFlag
						},
						t.isPinching = function () {
							return this.isPinch
						},
						t.scrollBy = function (t, n, e, r) {
							void 0 === r && (r = !0),
								this.flag && (this.startClients.forEach(function (e) {
									e.clientX -= t,
										e.clientY -= n
								}), this.prevClients.forEach(function (e) {
									e.clientX -= t,
										e.clientY -= n
								}), r && this.onDrag(e, !0))
						},
						t.move = function (e, t, n) {
							var r = e[0],
								i = e[1];
							void 0 === n && (n = this.prevClients);
							var o = this.customDist,
								a = this.prevClients,
								e = this.startClients,
								e = this.pinchFlag ? ue(n, a, e, this.startPinchClients) : de(n[0], a[0], e[0]);
							o[0] += r,
								o[1] += i,
								e.deltaX += r,
								e.deltaY += i;
							r = e.deltaX,
								i = e.deltaY;
							return e.distX += o[0],
								e.distY += o[1],
								this.movement += Math.sqrt(r * r + i * i),
								this.prevClients = n,
								this.isDrag = !0,
								ce({
									type: "drag",
									datas: this.datas
								},
									e, {
									movement: this.movement,
									isDrag: this.isDrag,
									isPinch: this.isPinch,
									isScroll: !1,
									inputEvent: t
								})
						},
						t.onPinchStart = function (e) {
							var t = this.options,
								n = t.pinchstart,
								r = t.pinchThreshold;
							this.isDrag && this.movement > r || (t = ve(e.changedTouches), this.pinchFlag = !0, (r = this.startClients).push.apply(r, t), (r = this.prevClients).push.apply(r, t), this.startDistance = he(this.prevClients), this.startPinchClients = this.prevClients.slice(), n && (t = de(t = ge(r = this.prevClients), t, t), this.startRotate = pe(r), n(ce({
								type: "pinchstart",
								datas: this.datas,
								angle: this.startRotate,
								touches: me(r, r, r)
							},
								t, {
								inputEvent: e
							}))))
						},
						t.onPinch = function (e, t) {
							var n, r, i, o, a, s; !this.flag || !this.pinchFlag || t.length < 2 || (this.isPinch = !0, (n = this.options.pinch) && (r = this.prevClients, i = this.startClients, o = de(ge(t), ge(r), ge(i)), a = pe(t), s = he(t), n(ce({
								type: "pinch",
								datas: this.datas,
								movement: this.movement,
								angle: a,
								rotation: a - this.startRotate,
								touches: me(t, r, i),
								scale: s / this.startDistance,
								distance: s
							},
								o, {
								inputEvent: e
							}))))
						},
						t.onPinchEnd = function (e) {
							var t, n, r, i, o;
							this.flag && this.pinchFlag && (t = this.isPinch, this.isPinch = !1, this.pinchFlag = !1, (n = this.options.pinchend) && (r = this.prevClients, i = this.startClients, o = de(ge(r), ge(r), ge(i)), n(ce({
								type: "pinchend",
								datas: this.datas,
								isPinch: t,
								touches: me(r, r, i)
							},
								o, {
								inputEvent: e
							})), this.isPinch = !1, this.pinchFlag = !1))
						},
						t.triggerDragStart = function (e) {
							this.onDragStart(e, !1)
						},
						t.unset = function () {
							var t = this,
								e = this.targets,
								n = this.options.container;
							this.isMouse && (e.forEach(function (e) {
								le(e, "mousedown", t.onDragStart)
							}), le(n, "mousemove", this.onDrag), le(n, "mouseup", this.onDragEnd), le(n, "contextmenu", this.onDragEnd)),
								this.isTouch && (e.forEach(function (e) {
									le(e, "touchstart", t.onDragStart)
								}), le(n, "touchstart", this.onDragStart), le(n, "touchmove", this.onDrag), le(n, "touchend", this.onDragEnd), le(n, "touchcancel", this.onDragEnd))
						},
						t.initDrag = function () {
							this.startClients = [],
								this.prevClients = [],
								this.flag = !1
						},
						e
				}(),
				_e = function (e, t) {
					return (_e = Object.setPrototypeOf || {
						__proto__: []
					}
						instanceof Array &&
						function (e, t) {
							e.__proto__ = t
						} ||
						function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(e, t)
				};
			var Ce = function () {
				return (Ce = Object.assign ||
					function (e) {
						for (var t, n = 1,
							r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
						return e
					}).apply(this, arguments)
			},
				Pe = "a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan".split(" "),
				Te = "undefined" != typeof Symbol && Symbol.
					for && Symbol.
						for("react.element") || 60103,
				De = "undefined" != typeof Symbol && Symbol.
					for ? Symbol.
						for("__preactCompatWrapper") : "__preactCompatWrapper",
				Ne = {
					constructor: 1,
					render: 1,
					shouldComponentUpdate: 1,
					componentWillReceiveProps: 1,
					componentWillUpdate: 1,
					componentDidUpdate: 1,
					componentWillMount: 1,
					componentDidMount: 1,
					componentWillUnmount: 1,
					componentDidUnmount: 1
				},
				Ee = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/,
				Se = {},
				Ae = !1;
			try {
				Ae = "production" !== process.env.NODE_ENV
			} catch (e) { }
			var Oe = u("a", null).constructor;
			Oe.prototype.$$typeof = Te,
				Oe.prototype.preactCompatUpgraded = !1,
				Oe.prototype.preactCompatNormalized = !1,
				Object.defineProperty(Oe.prototype, "type", {
					get: function () {
						return this.nodeName
					},
					set: function (e) {
						this.nodeName = e
					},
					configurable: !0
				}),
				Object.defineProperty(Oe.prototype, "props", {
					get: function () {
						return this.attributes
					},
					set: function (e) {
						this.attributes = e
					},
					configurable: !0
				});
			var Ie = w.event;
			w.event = function (e) {
				return (e = Ie ? Ie(e) : e).persist = Object,
					e.nativeEvent = e
			};
			var je = w.vnode;
			w.vnode = function (e) {
				var t, n;
				e.preactCompatUpgraded || (e.preactCompatUpgraded = !0, t = e.nodeName, n = e.attributes = null == e.attributes ? {} : Be({},
					e.attributes), "function" == typeof t ? (!0 === t[De] || t.prototype && "isReactComponent" in t.prototype) && (e.children && "" === String(e.children) && (e.children = void 0), e.children && (n.children = e.children), e.preactCompatNormalized || Fe(e),
						function (e) {
							var t = e.nodeName,
								n = e.attributes;
							e.attributes = {},
								t.defaultProps && Be(e.attributes, t.defaultProps);
							n && Be(e.attributes, n)
						}(e)) : (e.children && "" === String(e.children) && (e.children = void 0), e.children && (n.children = e.children), n.defaultValue && (n.value || 0 === n.value || (n.value = n.defaultValue), delete n.defaultValue),
							function (e, t) {
								var n, r, i;
								if (t) {
									for (i in t) if (n = Ee.test(i)) break;
									if (n) for (i in r = e.attributes = {},
										t) t.hasOwnProperty(i) && (r[Ee.test(i) ? i.replace(/([A-Z0-9])/, "-$1").toLowerCase() : i] = t[i])
								}
							}(e, n))),
					je && je(e)
			};
			var Me, Ke = [];
			for (var ze, Le = {},
				Ue = Pe.length; Ue--;) Le[Pe[Ue]] = (ze = Pe[Ue], Ye.bind(null, ze));
			function Xe(e, t) {
				for (var n, r = t || 0; r < e.length; r++) {
					var i = e[r];
					Array.isArray(i) ? Xe(i) : !i || "object" != typeof i || (n = i) && (n instanceof Oe || n.$$typeof === Te) || !(i.props && i.type || i.attributes && i.nodeName || i.children) || (e[r] = Ye(i.type || i.nodeName, i.props || i.attributes, i.children))
				}
			}
			function We(e) {
				return function (e) {
					function t(e, t) {
						!
						function (e) {
							for (var t in e) {
								var n = e[t];
								"function" != typeof n || n.__bound || Ne.hasOwnProperty(t) || ((e[t] = n.bind(e)).__bound = !0)
							}
						}(this),
						et.call(this, e, t, Se),
						$e.call(this, e, t)
					} (e = Be({
						constructor: t
					},
						e)).mixins &&
						function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = qe(t[n].concat(e[n] || Ke), "getDefaultProps" === n || "getInitialState" === n || "getChildContext" === n))
						}(e,
							function (e) {
								for (var t = {},
									n = 0; n < e.length; n++) {
									var r, i = e[n];
									for (r in i) i.hasOwnProperty(r) && "function" == typeof i[r] && (t[r] || (t[r] = [])).push(i[r])
								}
								return t
							}(e.mixins));
					e.statics && Be(t, e.statics);
					e.propTypes && (t.propTypes = e.propTypes);
					e.defaultProps && (t.defaultProps = e.defaultProps);
					e.getDefaultProps && (t.defaultProps = e.getDefaultProps.call(t));
					return Ze.prototype = et.prototype,
						t.prototype = Be(new Ze, e),
						t.displayName = e.displayName || "Component",
						t
				}({
					displayName: e.displayName || e.name,
					render: function () {
						return e(this.props, this.context)
					}
				})
			}
			function Ye() {
				for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
				return Xe(e, 2),
					Fe(u.apply(void 0, e))
			}
			function Fe(e) {
				var t;
				e.preactCompatNormalized = !0,
					function (e) {
						e = e.attributes || (e.attributes = {});
						Re.enumerable = "className" in e,
							e.className && (e.class = e.className);
						Object.defineProperty(e, "className", Re)
					}(e),
					"function" != typeof (t = e.nodeName) || t.prototype && t.prototype.render || (e.nodeName = (i = e.nodeName, (o = i[De]) ? !0 === o ? i : o : (o = We(i), Object.defineProperty(o, De, {
						configurable: !0,
						value: !0
					}), o.displayName = i.displayName, o.propTypes = i.propTypes, o.defaultProps = i.defaultProps, Object.defineProperty(i, De, {
						configurable: !0,
						value: o
					}), o)));
				var n, r, i = e.attributes.ref,
					o = i && typeof i;
				return !Me || "string" !== o && "number" !== o || (e.attributes.ref = (n = i, (r = Me)._refProxies[n] || (r._refProxies[n] = function (e) {
					r && r.refs && null === (r.refs[n] = e) && (delete r._refProxies[n], r = null)
				}))),
					function (e) {
						var t = e.nodeName,
							e = e.attributes;
						if (e && "string" == typeof t) {
							var n, r = {};
							for (n in e) r[n.toLowerCase()] = n;
							r.ondoubleclick && (e.ondblclick = e[r.ondoubleclick], delete e[r.ondoubleclick]),
								r.onchange && ("textarea" === t || "input" === t.toLowerCase() && !/^fil|che|rad/i.test(e.type)) && (t = r.oninput || "oninput", e[t] || (e[t] = qe([e[t], e[r.onchange]]), delete e[r.onchange]))
						}
					}(e),
					e
			}
			var Re = {
				configurable: !0,
				get: function () {
					return this.class
				},
				set: function (e) {
					this.class = e
				}
			};
			function Be(e) {
				for (var t = arguments,
					n = 1,
					r = void 0; n < arguments.length; n++) if (r = t[n]) for (var i in r) r.hasOwnProperty(i) && (e[i] = r[i]);
				return e
			}
			function He(e, t) {
				for (var n in e) if (!(n in t)) return !0;
				for (var r in t) if (e[r] !== t[r]) return !0;
				return !1
			}
			function Ve(e) {
				return e && (e.base || 1 === e.nodeType && e) || null
			}
			function Ze() { }
			function qe(o, a) {
				return function () {
					for (var e, t = arguments,
						n = 0; n < o.length; n++) {
						var r = function (e, t, n) {
							if ("function" == typeof (t = "string" == typeof t ? e.constructor.prototype[t] : t)) return t.apply(e, n)
						}(this, o[n], t);
						if (a && null != r) for (var i in e = e || {},
							r) r.hasOwnProperty(i) && (e[i] = r[i]);
						else void 0 !== r && (e = r)
					}
					return e
				}
			}
			function $e(e, t) {
				Ge.call(this, e, t),
					this.componentWillReceiveProps = qe([Ge, this.componentWillReceiveProps || "componentWillReceiveProps"]),
					this.render = qe([Ge, Je, this.render || "render", Qe])
			}
			function Ge(e, t) {
				var n;
				e && ((n = e.children) && Array.isArray(n) && 1 === n.length && ("string" == typeof n[0] || "function" == typeof n[0] || n[0] instanceof Oe) && (e.children = n[0], e.children && "object" == typeof e.children && (e.children.length = 1, e.children[0] = e.children)), Ae && (e = "function" == typeof this ? this : this.constructor, this.propTypes || e.propTypes, this.displayName || e.name))
			}
			function Je(e) {
				Me = this
			}
			function Qe() {
				Me === this && (Me = null)
			}
			function et(e, t, n) {
				x.call(this, e, t),
					this.state = this.getInitialState ? this.getInitialState() : {},
					this.refs = {},
					this._refProxies = {},
					n !== Se && $e.call(this, e, t)
			}
			function tt(e, t) {
				et.call(this, e, t)
			}
			function nt(t, n) {
				return function (e) {
					e && (t[n] = e)
				}
			}
			function rt(t, n, r) {
				return function (e) {
					e && (t[n][r] = e)
				}
			}
			Be(et.prototype = new x, {
				constructor: et,
				isReactComponent: {},
				replaceState: function (e, t) {
					for (var n in this.setState(e, t), this.state) n in e || delete this.state[n]
				},
				getDOMNode: function () {
					return this.base
				},
				isMounted: function () {
					return !!this.base
				}
			}),
				Ze.prototype = et.prototype,
				(tt.prototype = new Ze).isPureReactComponent = !0,
				tt.prototype.shouldComponentUpdate = function (e, t) {
					return He(this.props, e) || He(this.state, t)
				};
			var it = {
				transform: {},
				filter: {},
				attribute: {},
				html: !0
			},
				q = ((at = {})["animation-timing-function"] = !0, at.contents = !0, at.html = !0, "playSpeed"),
				ot = (function () {
					for (var e = 0,
						t = 0,
						n = arguments.length; t < n; t++) e += arguments[t].length;
					for (var r = Array(e), i = 0, t = 0; t < n; t++) for (var o = arguments[t], a = 0, s = o.length; a < s; a++, i++) r[i] = o[a]
				}(["id", "iterationCount", "delay", "fillMode", "direction", q, "duration", q, "iterationTime", "playState"], ["easing", "easingName"]),
					function (e, t) {
						return (ot = Object.setPrototypeOf || {
							__proto__: []
						}
							instanceof Array &&
							function (e, t) {
								e.__proto__ = t
							} ||
							function (e, t) {
								for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
							})(e, t)
					});
			var at = function (e) {
				function t() {
					this.constructor = n
				}
				var n, r;
				function i() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ot(n = i, r = e),
					n.prototype = null === r ? Object.create(r) : (t.prototype = r.prototype, new t),
					i.prototype.shouldComponentUpdate = function (e, t) {
						return t !== this.state || !
							function (e, t, n, r) {
								if (void 0 !== (c = n ? n.call(r, e, t) : void 0)) return !!c;
								if (e === t) return !0;
								if ("object" != typeof e || !e || "object" != typeof t || !t) return !1;
								var i = Object.keys(e),
									o = Object.keys(t);
								if (i.length !== o.length) return !1;
								for (var a = Object.prototype.hasOwnProperty.bind(t), s = 0; s < i.length; s++) {
									var l = i[s];
									if (!a(l)) return !1;
									var c, p = e[l],
										u = t[l];
									if (!1 === (c = n ? n.call(r, p, u, l) : void 0) || void 0 === c && p !== u) return !1
								}
								return !0
							}(e, this.props)
					},
					i
			}(et),
				st = function (e, t) {
					return (st = Object.setPrototypeOf || {
						__proto__: []
					}
						instanceof Array &&
						function (e, t) {
							e.__proto__ = t
						} ||
						function (e, t) {
							for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
						})(e, t)
				};
			var lt = function () {
				return (lt = Object.assign ||
					function (e) {
						for (var t, n = 1,
							r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
						return e
					}).apply(this, arguments)
			};
			var ct = function (e) {
				for (var t = 5381,
					n = e.length; n;) t = 33 * t ^ e.charCodeAt(--n);
				return t >>> 0
			};
			var pt = function (e, t) {
				return (pt = Object.setPrototypeOf || {
					__proto__: []
				}
					instanceof Array &&
					function (e, t) {
						e.__proto__ = t
					} ||
					function (e, t) {
						for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
					})(e, t)
			};
			function ut(e, t) {
				function n() {
					this.constructor = e
				}
				pt(e, t),
					e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
			}
			var ft = function () {
				return (ft = Object.assign ||
					function (e) {
						for (var t, n = 1,
							r = arguments.length; n < r; n++) for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
						return e
					}).apply(this, arguments)
			};
			var dt = "scenejs-editor-",
				ht = '\n{\n    position: relative;\n    width: 100%;\n    font-size: 0;\n    background: #000;\n    display: flex;\n    flex-direction: column;\n}\n* {\n    font-family: sans-serif;\n    box-sizing: border-box;\n    color: #fff;\n}\n.header-area, .scroll-area {\n   width: 100%;\n   position: relative;\n  display: flex;\n  -webkit-align-items: flex-start;\n  align-items: flex-start;\n}\n.header-area {\n  position: relative;\n  z-index: 10;\n  top: 0;\n  height: 30px;\n  min-height: 30px;\n}\n.header-area .keyframes {\n  padding: 0px;\n}\n.header-area .properties-area,\n.header-area .keyframes-area,\n.header-area .values-area,\n.header-area .keyframes-scroll-area {\n    height: 100%;\n}\n.header-area .keyframes-scroll-area {\n    overflow: hidden;\n}\n.header-area .property, .header-area .value, .header-area .keyframes {\n  height: 100%;\n}\n.header-area .property {\n    line-height: 30px;\n}\n.value .add {\n    text-align: center;\n    color: #fff;\n    line-height: 30px;\n    font-weight: bold;\n    font-size: 20px;\n    cursor: pointer;\n}\n.header-area .keyframes-area::-webkit-scrollbar {\n    display: none;\n}\n.header-area .keyframe-cursor {\n    position: absolute;\n    border-top: 10px solid #4af;\n    border-left: 6px solid transparent;\n    border-right: 6px solid transparent;\n    width: 0;\n    height: 0;\n    bottom: 0;\n    top: auto;\n    background: none;\n    cursor: pointer;\n}\n.control-area .keyframes {\n    padding-left: 10px;\n}\n.play-control-area {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n}\n.play-control-area .control {\n    position: relative;\n    display: inline-block;\n    vertical-align: middle;\n    color: white;\n    margin: 0px 15px;\n    cursor: pointer;\n}\n.play {\n    border-left: 14px solid white;\n    border-top: 8px solid transparent;\n    border-bottom: 8px solid transparent;\n}\n.pause {\n    border-left: 4px solid #fff;\n    border-right: 4px solid #fff;\n    width: 14px;\n    height: 16px;\n}\n.prev {\n    border-right: 10px solid white;\n    border-top: 6px solid transparent;\n    border-bottom: 6px solid transparent;\n}\n.prev:before {\n    position: absolute;\n    content: "";\n    width: 3px;\n    height: 10px;\n    top: 0;\n    right: 100%;\n    transform: translate(0, -50%);\n    background: white;\n}\n.next {\n    border-left: 10px solid white;\n    border-top: 6px solid transparent;\n    border-bottom: 6px solid transparent;\n}\n.next:before {\n    position: absolute;\n    content: "";\n    width: 3px;\n    height: 10px;\n    top: 0;\n    transform: translate(0, -50%);\n    background: white;\n}\n.keytime {\n  position: relative;\n  display: inline-block;\n  height: 100%;\n  font-size: 13px;\n  font-weight: bold;\n  color: #777;\n}\n.keytime:last-child {\n  max-width: 0px;\n}\n.keytime span {\n  position: absolute;\n  line-height: 1;\n  bottom: 12px;\n  display: inline-block;\n  transform: translate(-50%);\n  color: #eee;\n}\n.keytime .graduation {\n  position: absolute;\n  bottom: 0;\n  width: 1px;\n  height: 10px;\n  background: #666;\n  transform: translate(-50%);\n}\n.keytime .graduation.half {\n  left: 50%;\n  height: 7px;\n}\n.keytime .graduation.quarter {\n  left: 25%;\n  height: 5px;\n}\n.keytime .graduation.quarter3 {\n  left: 75%;\n  height: 5px;\n}\n.scroll-area {\n  position: relative;\n  width: 100%;\n  height: calc(100% - 60px);\n  overflow: auto;\n}\n.properties-area, .keyframes-area, .values-area {\n  display: inline-block;\n  position: relative;\n  font-size: 16px;\n  overflow: auto;\n}\n\n.properties-area::-webkit-scrollbar, .keyframes-area::-webkit-scrollbar {\n    display: none;\n}\n.properties-area {\n  width: 30%;\n  max-width: 200px;\n  box-sizing: border-box;\n}\n.values-area {\n    width: 50px;\n    min-width: 50px;\n    display: inline-block;\n    border-right: 1px solid #666;\n    box-sizing: border-box;\n}\n.value input {\n    appearance: none;\n    -webkit-appearance: none;\n    outline: none;\n    position: relative;\n    display: block;\n    width: 100%;\n    height: 100%;\n    background: transparent;\n    color: #4af;\n    font-weight: bold;\n    background: none;\n    border: 0;\n    box-sizing: border-box;\n    text-align: center;\n}\n.value {\n\n}\n:host.alt .value input {\n    cursor: ew-resize;\n}\n.value[data-object="1"] input {\n    display: none;\n}\n.properties-scroll-area {\n  display: inline-block;\n  min-width: 100%;\n}\n.keyframes-area {\n  flex: 1;\n}\n.keyframes-scroll-area {\n  position: relative;\n  min-width: 300px;\n}\n.keyframes, .property, .value {\n  position: relative;\n  height: 30px;\n  line-height: 30px;\n  border-bottom: 1px solid #555;\n  box-sizing: border-box;\n  white-space: nowrap;\n  background: rgba(90, 90, 90, 0.7);\n  z-index: 1;\n}\n\n.property {\n  padding-left: 10px;\n  box-sizing: border-box;\n  font-size: 13px;\n  font-weight: bold;\n  color: #eee;\n}\n.property .remove {\n    position: absolute;\n    display: inline-block;\n    cursor: pointer;\n    width: 18px;\n    height: 18px;\n    top: 0;\n    bottom: 0;\n    right: 10px;\n    margin: auto;\n    border-radius: 50%;\n    border: 2px solid #fff;\n    vertical-align: middle;\n    display: none;\n    margin-left: 10px;\n    box-sizing: border-box;\n}\n.property .remove:before, .property .remove:after {\n    position: absolute;\n    content: "";\n    width: 8px;\n    height: 2px;\n    border-radius: 1px;\n    background: #fff;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin: auto;\n}\n.property .remove:before {\n    transform: rotate(45deg);\n}\n.property .remove:after {\n    transform: rotate(-45deg);\n}\n.property:hover .remove {\n    display: inline-block;\n}\n\n[data-item="1"], [data-item="1"] .add {\n    height: 30px;\n    line-height: 30px;\n}\n.time-area {\n    position: absolute;\n    top: 0;\n    left: 10px;\n    font-size: 13px;\n    color: #4af;\n    line-height: 30px;\n    font-weight: bold;\n    height: 100%;\n    line-height: 30px;\n    border: 0;\n    background: transparent;\n    outline: 0;\n}\n.time-area:after {\n    content: "s";\n}\n.property .arrow {\n    position: relative;\n    display: inline-block;\n    width: 20px;\n    height: 25px;\n    cursor: pointer;\n    vertical-align: middle;\n}\n.property .arrow:after {\n    content: "";\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n    margin: auto;\n    width: 0;\n    height: 0;\n    border-top: 6px solid #eee;\n    border-left: 4px solid transparent;\n    border-right: 4px solid transparent;\n}\n.property[data-fold="1"] .arrow:after {\n    border-top: 4px solid transparent;\n    border-bottom: 4px solid transparent;\n    border-right: 0;\n    border-left: 6px solid #eee;\n}\n.property[data-object="0"] .arrow {\n    display: none;\n}\n.property.fold, .keyframes.fold, .value.fold {\n    display: none;\n}\n.property.select, .value.select, .keyframes.select {\n    background: rgba(120, 120, 120, 0.7);\n}\n.keyframes {\n\n}\n.keyframe-delay {\n  position: absolute;\n  top: 3px;\n  bottom: 3px;\n  left: 0;\n  background: #4af;\n  opacity: 0.2;\n  z-index: 0;\n}\n.keyframe-group {\n    position: absolute;\n    top: 3px;\n    bottom: 3px;\n    left: 0;\n    background: #4af;\n    opacity: 0.6;\n    border: 1px solid rgba(0, 0, 0, 0.2);\n    border-left-color: rgba(255, 255, 255, 0.2);\n    border-top-color: rgba(255, 255, 255, 0.2);\n    z-index: 0;\n}\n.keyframe-line {\n  position: absolute;\n  height: 8px;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  background: #666;\n  z-index: 0;\n}\n.keyframe {\n  position: absolute;\n  font-size: 0px;\n  width: 12px;\n  height: 12px;\n  top: 0px;\n  bottom: 0px;\n  margin: auto;\n  background: #fff;\n  border: 2px solid #383838;\n  border-radius: 2px;\n  box-sizing: border-box;\n  transform: translate(-50%) rotate(45deg);\n  z-index: 1;\n  cursor: pointer;\n}\n.keyframe[data-no="1"] {\n    opacity: 0.2;\n}\n.select .keyframe {\n    border-color: #555;\n}\n.keyframe.select {\n    background: #4af;\n}\n.keyframes-container, .line-area {\n  position: relative;\n  width: calc(100% - 30px);\n  left: 15px;\n  height: 100%;\n}\n.line-area {\n  position: absolute;\n  top: 0;\n  z-index: 0;\n}\n.keyframe-cursor {\n  position: absolute;\n  top: 0;\n  z-index: 1;\n  background: #4af;\n  width: 1px;\n  height: 100%;\n  left: 15px;\n  transform: translate(-50%);\n}\n.scroll-area .keyframe-cursor {\n  pointer-events: none;\n}\n.division-line {\n  position: absolute;\n  background: #333;\n  width: 1px;\n  height: 100%;\n  transform: translate(-50%);\n}\n'.replace(/\.([^{,\s\d.]+)/g, "." + dt + "$1"),
				mt = "direction",
				vt = "iterationCount",
				yt = "delay",
				gt = "playSpeed",
				bt = "alternate",
				xt = "reverse",
				kt = "alternate-reverse",
				wt = "infinite";
			function _t(e, t, n) {
				var r = ("" + e).length,
					i = [];
				n && i.push(e);
				for (var o = r; o < t; ++o) i.push(0);
				return n || i.push(e),
					i.join("")
			}
			function Ct(t) {
				return X(t) ? Array.isArray(t) ? "[" + t.join(", ") + "]" : "{" +
					function (e) {
						var t, n = [];
						for (t in e) n.push(t);
						return n
					}(t).map(function (e) {
						return e + ": " + Ct(t[e])
					}).join(", ") + "}" : t
			}
			function Pt(e, t) {
				for (var n = e; n && n !== document.body;) {
					if (t(n)) return n;
					n = n.parentNode
				}
				return null
			}
			function Tt(e, t) {
				return t = "" + dt + t,
					(e = e).classList ? e.classList.contains(t) : !!e.className.match(new RegExp("(\\s|^)" + t + "(\\s|$)"))
			}
			function Dt(e) {
				return e && !!e.constructor.prototype.getItem
			}
			function Nt(e, n) {
				return F(e,
					function (e) {
						var t = e.getBoundingClientRect(),
							e = t.top,
							t = e + t.height;
						return e <= n && n < t
					})
			}
			function Et() {
				for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
				return function (t) {
					for (var e = [], n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
					return e.map(function (e) {
						return e.split(" ").map(function (e) {
							return e ? "" + t + e : ""
						}).join(" ")
					}).join(" ")
				}.apply(void 0, [dt].concat(e))
			}
			function St(n, r) {
				var e = F(r,
					function (e, t) {
						return n[r.slice(0, t + 1).join("///") + "///"]
					});
				return - 1 < e ? e === r.length - 1 ? 2 : 1 : 0
			}
			function At(e, t, n) {
				var r = t + "///",
					t = e.state.foldedInfo;
				t[r] = !t[r],
					n || e.setState({
						foldedInfo: ft({},
							t)
					})
			}
			var q = function (e) {
				function t() {
					return null !== e && e.apply(this, arguments) || this
				}
				return ut(t, e),
					t.prototype.getElement = function () {
						return this.element || (this.element = Ve(this))
					},
					t
			}(tt),
				Ot = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					ut(t, e);
					var n = t.prototype;
					return n.render = function () {
						return Ye("input", {
							className: Et("time-area")
						})
					},
						n.componentDidMount = function () {
							var r = this;
							new oe(this.getElement()).keydown(function (e) {
								e.isToggle || e.inputEvent.stopPropagation()
							}).keyup(function (e) {
								e.isToggle || e.inputEvent.stopPropagation()
							}).keyup("enter",
								function () {
									var e, t = r.getElement().value,
										n = /(\d+):(\d+):(\d+)/g.exec(t);
									n && (e = parseFloat(n[1]), t = parseFloat(n[2]), n = parseFloat("0." + n[3]), r.props.timeline.setTime(60 * e + t + n))
								})
						},
						t
				}(q),
				It = function (t) {
					function e() {
						var e = null !== t && t.apply(this, arguments) || this;
						return e.state = {
							isPlay: !1
						},
							e.play = function () {
								e.setState({
									isPlay: !0
								})
							},
							e.pause = function () {
								e.setState({
									isPlay: !1
								})
							},
							e.togglePlay = function () {
								e.props.timeline.togglePlay()
							},
							e.prev = function () {
								e.props.timeline.prev()
							},
							e.next = function () {
								e.props.timeline.next()
							},
							e.unselect = function () {
								e.props.timeline.select("", -1)
							},
							e
					}
					ut(e, t);
					var n = e.prototype;
					return n.render = function () {
						var e = this.props.timeline;
						return Ye("div", {
							className: Et("control-area header-area")
						},
							Ye("div", {
								className: Et("properties-area"),
								onClick: this.unselect
							},
								Ye("div", {
									className: Et("property")
								})), Ye("div", {
									className: Et("values-area")
								},
									Ye("div", {
										className: Et("value")
									})), Ye("div", {
										className: Et("keyframes-area")
									},
										Ye("div", {
											className: Et("keyframes")
										},
											Ye(Ot, {
												ref: nt(this, "timeArea"),
												timeline: e
											}), Ye("div", {
												className: Et("play-control-area")
											},
												Ye("div", {
													className: Et("control prev"),
													onClick: this.prev
												}), Ye("div", {
													className: Et("control " + (this.state.isPlay ? "pause" : "play")),
													onClick: this.togglePlay
												}), Ye("div", {
													className: Et("control next"),
													onClick: this.next
												})))))
					},
						n.componentDidMount = function () {
							this.initScene(this.props.scene)
						},
						n.componentDidUpdate = function (e) {
							e.scene !== this.props.scene && (this.initScene(this.props.scene), this.releaseScene(e.scene))
						},
						n.componentWillUnmount = function () {
							this.releaseScene(this.props.scene)
						},
						n.initScene = function (e) {
							e && e.on({
								play: this.play,
								paused: this.pause
							})
						},
						n.releaseScene = function (e) {
							e && (e.off("play", this.play), e.off("paused", this.pause))
						},
						e
				}(q),
				jt = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					return ut(t, e),
						t.prototype.render = function () {
							return Ye("div", {
								className: Et("keyframe-cursor")
							})
						},
						t
				}(q),
				Mt = function (e) {
					function t() {
						var r = null !== e && e.apply(this, arguments) || this;
						return r.onWheel = function (e) {
							var t = r.props.timeline,
								n = e.deltaY;
							t.setZoom(t.getZoom() + n / 5e3),
								e.deltaX || e.preventDefault()
						},
							r
					}
					ut(t, e);
					var n = t.prototype;
					return n.renderKeytimes = function () {
            console.log('----- renderKeytimes 绘制时间线', this.props.maxTime)
						for (var e = this.props.maxTime,
							t = [], n = 0; n <= e; ++n) t.push(Ye("div", {
								key: n,
								"data-time": n,
								className: Et("keytime"),
								style: {
									width: 100 / e + "%"
								}
							},
								Ye("span", null, n), Ye("div", {
									className: Et("graduation start")
								}), Ye("div", {
									className: Et("graduation quarter")
								}), Ye("div", {
									className: Et("graduation half")
								}), Ye("div", {
									className: Et("graduation quarter3")
								})));
						return t
					},
						n.render = function () {
							var e = this.props,
								t = e.maxTime,
								n = e.maxDuration,
								e = e.zoom;
							return Ye("div", {
								className: Et("keytimes-area keyframes-area")
							},
								Ye("div", {
									className: Et("keyframes-scroll-area"),
									ref: nt(this, "scrollAreaElement"),
									style: {
										minWidth: 50 * t + "px",
										width: Math.min(n ? t / n : 1, 2) * e * 100 + "%"
									}
								},
									Ye("div", {
										className: Et("keytimes keyframes")
									},
										Ye("div", {
											className: Et("keyframes-container")
										},
											this.renderKeytimes()), Ye(jt, {
												ref: nt(this, "cursor")
											}))))
						},
						n.componentDidMount = function () {
							var t = this;
							R(this.getElement(), "wheel", this.onWheel),
								this.dragger = new we(this.cursor.getElement(), {
									dragstart: function (e) {
										e.inputEvent.stopPropagation()
									},
									drag: function (e) {
										e = e.clientX;
										t.props.timeline.move(e)
									},
									container: window
								})
						},
						n.componentWillUnmount = function () {
							B(this.getElement(), "wheel", this.onWheel),
								this.dragger.unset()
						},
						t
				}(q),
				Kt = function (t) {
					function e() {
						var e = null !== t && t.apply(this, arguments) || this;
						return e.openDialog = function () {
							// e.props.timeline.openDialog()
						},
							e
					}
					return ut(e, t),
						e.prototype.render = function () {
							var e = this.props,
								t = e.timelineInfo,
								n = e.maxTime,
								r = e.maxDuration,
								i = e.zoom,
								e = e.timeline;
							return Ye("div", {
								className: Et("header-area")
							},
								Ye("div", {
									className: Et("properties-area")
								},
									Ye("div", {
										className: Et("property")
									},
										"Name")), Ye("div", {
											className: Et("values-area")
										},
											Ye("div", {
												className: Et("value")
											},
												Ye("div", {
													className: Et("add"),
													onClick: this.openDialog
												},
													"+"))), Ye(Mt, {
														ref: nt(this, "keytimesArea"),
														timeline: e,
														timelineInfo: t,
														maxDuration: r,
														maxTime: n,
														zoom: i
													}))
						},
						e
				}(q),
				zt = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					return ut(t, e),
						t.prototype.render = function () {
							var e = this.props,
								t = e.time,
								n = e.value,
								r = e.maxTime;
              console.log('keyframe--------')
							return Ye("div", {
								className: Et("keyframe" + (e.selected ? " select" : "")),
								"data-time": t,
								style: {
									left: t / r * 100 + "%"
								}
							},
								t, " ", n)
						},
						t
				}(q),
				Lt = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					return ut(t, e),
						t.prototype.render = function () {
							var e = this.props,
								t = e.time,
								n = e.nextTime,
								r = e.maxTime;
                console.log('----------- keyframe-group', )
							return Ye("div", {
								className: Et("keyframe-group" + (e.selected ? " select" : "")),
								"data-time": t,
								style: {
									left: t / r * 100 + "%",
									width: (n - t) / r * 100 + "%"
								}
							})
						},
						t
				}(tt),
				Ut = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					return ut(t, e),
						t.prototype.render = function () {
							var e = this.props,
								t = e.time,
								n = e.nextTime,
								e = e.maxTime;
							return Ye("div", {
								className: Et("keyframe-delay"),
								style: {
									left: t / e * 100 + "%",
									width: (n - t) / e * 100 + "%"
								}
							})
						},
						t
				}(tt),
				Xt = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					return ut(t, e),
						t.prototype.render = function () {
							var e = this.props,
								t = e.time,
								n = e.nextTime,
								e = e.maxTime;
							return Ye("div", {
								className: Et("keyframe-line"),
								style: {
									left: t / e * 100 + "%",
									width: (n - t) / e * 100 + "%"
								}
							})
						},
						t
				}(tt),
				Wt = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					ut(t, e);
					var n = t.prototype;
					return n.render = function () {
						var e = this.props,
							t = e.id,
							n = e.propertiesInfo,
							r = e.selected;
						return Ye("div", {
							className: Et("keyframes" + (1 === e.folded ? " fold" : "") + (r ? " select" : "")),
							"data-item": n.isItem ? "1" : "0",
							"data-id": t
						},
							Ye("div", {
								className: Et("keyframes-container")
							},
								this.renderList()))
					},
						n.renderList = function () {
							var e = this.props,
								t = e.propertiesInfo,
								s = e.maxTime,
								l = e.selected,
								c = e.selectedTime,
								n = t.item,
								p = t.frames,
								e = t.properties,
								u = Dt(n),
								f = n.getDuration(),
								d = [],
								t = [],
								h = [],
								m = [],
								r = p.length,
								v = e.length,
								y = 0;
                console.log('t.frames----', JSON.stringify(p), t.frames)
							if (2 <= r && !v) {
								for (var i = 0,
									o = 1; o < r; ++o) {
									var a = p[o][1];
									if (p[o - 1][1] !== a || 0 !== a && a !== f) break;
									i = o
								}
								n = F(p,
									function (e) {
										return !U(e[2])
									}),
									y = Math.min(r - 2, Math.max(i, n)),
									e = p[y],
									n = p[r - 1],
									e = e[0],
									n = n[0];
								t.push(Ye(Lt, {
									key: "group",
									selected: l && e <= c && c <= n,
									time: e,
									nextTime: n,
									maxTime: s
								}))
							}
							return p.forEach(function (e, t) {
								var n, r, i = e[0],
									o = e[1],
									a = e[2],
									e = Ct(a);
								p[t + 1] && (n = (r = p[t + 1])[0], r = r[1], (0 === o && 0 === r || o === f && r === f) && h.push(Ye(Ut, {
									key: "delay" + i + "," + n,
									id: "-1",
									time: i,
									nextTime: n,
									maxTime: s
								}))),
									0 === t && 0 === i && 0 === o && U(a) && !v || (p[t + 1] && (n = (r = p[t + 1])[0], r = Ct(o = r[2]), u || U(a) || U(o) || e === r || !v || m.push(Ye(Xt, {
										key: "line" + m.length,
										time: i,
										id: i + "," + n,
										nextTime: n,
										maxTime: s
									}))), u || t < y || d.push(Ye(zt, {
										key: "keyframe" + t,
										selected: l && i === c,
										time: i,
										value: e,
										maxTime: s
									})))
							}),console.log('d----------', d, u, t < y, p),
								t.concat(d, h, m)
						},
						t
				}(q),
				Yt = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					return ut(t, e),
						t.prototype.render = function () {
							for (var e = this.props.maxTime,
								t = [], n = 0; n <= e; ++n) t.push(Ye("div", {
									key: n,
									className: Et("division-line"),
									style: {
										left: 100 / e * n + "%"
									}
								}));
							return Ye("div", {
								className: Et("line-area")
							},
								t)
						},
						t
				}(tt),
				Ft = function (e) {
					function t() {
						var n = null !== e && e.apply(this, arguments) || this;
						return n.keyframesList = [],
							n.state = {
								foldedInfo: {}
							},
							n.onWheel = function (e) {
								var t;
								oe.global.altKey && (e.preventDefault(), t = e.deltaY, (e = n.props.timeline).setZoom(e.getZoom() + t / 5e3))
							},
							n
					}
					return ut(t, e),
						t.prototype.render = function () {
							var e, t = this.props,
								n = t.timelineInfo,
								r = t.maxTime,
								i = t.maxDuration,
								o = t.zoom,
								a = t.selectedProperty,
								s = t.selectedTime,
								l = this.state.foldedInfo,
								i = Math.min(i ? r / i : 1, 2),
								c = [];
							for (e in this.keyframesList = [], n) {
								var p = n[e],
									u = e === a,
									f = St(l, p.keys);
								c.push(Ye(Wt, {
									ref: rt(this, "keyframesList", c.length),
									selected: u,
									folded: f,
									selectedTime: s,
									key: e,
									id: e,
									propertiesInfo: p,
									maxTime: r
								}))
							}
							return Ye("div", {
								className: Et("keyframes-area"),
								onWheel: this.onWheel
							},
								Ye("div", {
									className: Et("keyframes-scroll-area"),
									ref: nt(this, "scrollAreaElement"),
									style: {
										minWidth: 50 * r + "px",
										width: i * o * 100 + "%"
									}
								},
									c.concat([Ye(jt, {
										key: "cursor",
										ref: nt(this, "cursor")
									}), Ye(Yt, {
										maxTime: r,
										key: "lines"
									})])))
						},
						t
				}(q),
				Rt = function (e) {
					function t() {
						var s = null !== e && e.apply(this, arguments) || this;
						return s.onClick = function (e) {
							var t = e.target;
							Tt(t, "arrow") ? s.onClickArrow() : Tt(t, "remove") ? s.onClickRemove() : (t = (e = s.props).timeline, e = e.id, t.select(e))
						},
							s.onClickArrow = function () {
								var e = s.props,
									t = e.id,
									n = e.timeline,
									r = e.scrollArea,
									e = e.index;
								n.select(t),
									r.fold(e)
							},
							s.onClickRemove = function () {
								var n, e = s.props,
									t = e.propertiesInfo,
									r = e.timeline,
									i = t.isItem,
									e = t.parentItem,
									o = t.item,
									a = t.properties;
								i ? (n = null, e.forEach(function (e, t) {
									e === o && (n = t)
								}), null != n && e.removeItem(n)) : o.times.forEach(function (e) {
									o.remove.apply(o, [e].concat(a))
								}),
									r.select("", -1, !0),
									r.update()
							},
							s
					}
					return ut(t, e),
						t.prototype.render = function () {
							var e = this.props,
								t = e.id,
								n = e.selected,
								r = e.folded,
								i = e.propertiesInfo,
								o = i.keys,
								a = i.isItem,
								e = i.isParent,
								i = o.length,
								o = o[i - 1];
							return Ye("div", {
								className: Et("property" + (1 === r ? " fold" : "") + (n ? " select" : "")),
								onClick: this.onClick,
								"data-id": t,
								"data-name": o,
								"data-object": e ? 1 : 0,
								"data-item": a ? 1 : 0,
								"data-fold": 2 === r ? 1 : 0,
								style: {
									paddingLeft: 10 + 20 * (i - 1) + "px"
								}
							},
								Ye("div", {
									className: Et("arrow")
								}), Ye("span", null, o), Ye("div", {
									className: Et("remove")
								}))
						},
						t
				}(q),
				Bt = function (t) {
					function e() {
						var e = null !== t && t.apply(this, arguments) || this;
						return e.properties = [],
							e.state = {
								foldedInfo: {}
							},
							e
					}
					return ut(e, t),
						e.prototype.render = function () {
							var e = this.props,
								t = e.timelineInfo,
								n = e.selectedProperty,
								r = e.timeline,
								i = e.scrollArea,
								o = this.state.foldedInfo,
								a = [];
							this.properties = [];
							var s, l = -1;
							for (s in t) {
								var c = t[s],
									p = n === s,
									u = St(o, c.keys); ++l,
										a.push(Ye(Rt, {
											ref: rt(this, "properties", l),
											timeline: r,
											scrollArea: i,
											selected: p,
											folded: u,
											key: s,
											id: s,
											index: l,
											propertiesInfo: c
										}))
							}
							return Ye("div", {
								className: Et("properties-area")
							},
								Ye("div", {
									className: Et("properties-scroll-area")
								},
									a))
						},
						e
				}(q),
				Ht = function (e) {
					function t() {
						var r = null !== e && e.apply(this, arguments) || this;
						return r.add = function () {
							var e = r.props,
								t = e.propertiesInfo,
								n = t.item,
								t = t.properties;
							e.timeline.openDialog(n, t)
						},
							r
					}
					ut(t, e);
					var n = t.prototype;
					return n.render = function () {
						var e = this.props,
							t = e.id,
							n = e.selected,
							r = e.folded,
							i = e.propertiesInfo,
							e = i.isItem,
							i = i.isParent;
						return Ye("div", {
							className: Et("value" + (1 === r ? " fold" : "") + (n ? " select" : "")),
							"data-id": t,
							"data-object": i ? 1 : 0,
							"data-item": e ? 1 : 0
						},
							this.renderValue())
					},
						n.renderValue = function () {
							return this.props.propertiesInfo.isParent ? Ye("div", {
								className: Et("add"),
								onClick: this.add
							},
								"+") : Ye("input", {
									ref: nt(this, "inputElement")
								})
						},
						t
				}(q),
				Vt = function (t) {
					function e() {
						var e = null !== t && t.apply(this, arguments) || this;
						return e.values = [],
							e.state = {
								foldedInfo: {}
							},
							e
					}
					ut(e, t);
					var n = e.prototype;
					return n.render = function () {
						var e, t = this.props,
							n = t.timelineInfo,
							r = t.selectedProperty,
							i = t.timeline,
							o = this.state.foldedInfo,
							a = [];
						for (e in this.values = [], n) {
							var s = n[e],
								l = r === e,
								c = St(o, s.keys);
							a.push(Ye(Ht, {
								ref: rt(this, "values", a.length),
								timeline: i,
								key: e,
								folded: c,
								selected: l,
								id: e,
								propertiesInfo: s
							}))
						}
						return Ye("div", {
							className: Et("values-area")
						},
							a)
					},
						n.componentDidMount = function () {
							var n, r, t = this,
								e = this.getElement();
							e.addEventListener("focusout",
								function (e) {
									t.props.timeline.setTime()
								}),
								this.dragger = new we(e, {
									container: window,
									dragstart: function (e) {
										if (n = e.inputEvent.target, r = n.value, !oe.global.altKey || !Pt(n,
											function (e) {
												return "INPUT" === e.nodeName
											})) return !1
									},
									drag: function (t) {
										var e = r.replace(/-?\d+/g,
											function (e) {
												return "" + (parseFloat(e) + Math.round(t.distX / 2))
											});
										n.value = e
									},
									dragend: function (e) {
										t.edit(n, n.value)
									}
								}),
								this.keycon = new oe(e).keydown(function (e) {
									e.isToggle || e.inputEvent.stopPropagation()
								}).keyup(function (e) {
									e.isToggle || e.inputEvent.stopPropagation()
								}).keyup("enter",
									function (e) {
										e = e.inputEvent.target;
										t.edit(e, e.value)
									}).keyup("esc",
										function (e) {
											e.inputEvent.target.blur()
										})
						},
						n.componentWillUnmount = function () {
							this.dragger.unset(),
								this.keycon.off()
						},
						n.edit = function (e, t) {
							var n = Pt(e,
								function (e) {
									return Tt(e, "value")
								}); !n || -1 !== (e = F(this.values,
									function (e) {
										return e.getElement() === n
									})) && this.props.timeline.editKeyframe(e, t)
						},
						e
				}(q),
				Zt = function (e) {
					function t() {
						return null !== e && e.apply(this, arguments) || this
					}
					ut(t, e);
					var n = t.prototype;
					return n.render = function () {
						var e = this.props,
							t = e.zoom,
							n = e.maxDuration,
							r = e.maxTime,
							i = e.timelineInfo,
							o = e.selectedProperty,
							a = e.selectedTime,
							e = e.timeline;
						return Ye("div", {
							className: Et("scroll-area")
						},
							Ye(Bt, {
								ref: nt(this, "propertiesArea"),
								timeline: e,
								scrollArea: this,
								timelineInfo: i,
								selectedProperty: o
							}), Ye(Vt, {
								ref: nt(this, "valuesArea"),
								timeline: e,
								timelineInfo: i,
								selectedProperty: o
							}), Ye(Ft, {
								ref: nt(this, "keyframesArea"),
								timeline: e,
								zoom: t,
								maxDuration: n,
								timelineInfo: i,
								maxTime: r,
								selectedProperty: o,
								selectedTime: a
							}))
					},
						n.componentDidMount = function () {
							this.foldAll()
						},
						n.foldAll = function () {
							var n = this;
							this.propertiesArea.properties.forEach(function (e, t) {
								e.props.propertiesInfo.isParent && n.fold(t)
							})
						},
						n.fold = function (e, t) {
							e = this.propertiesArea.properties[e].props.id;
							At(this.propertiesArea, e, t),
								At(this.valuesArea, e, t),
								At(this.keyframesArea, e, t)
						},
						t
				}(q),
				qt = 0,
				$t = -1,
				Gt = -1;
			function Jt(e, t, n, r, i) {
        // 双击
				var o = Date.now ? Date.now() : (new Date).getTime();
				// e || ($t === n && Gt === r && o - qt <= 10 && i(t, n, r), $t = n, Gt = r, qt = o)
			}
			var Qt = 1e6;
			function en(e) {
				return Math.round(e * Qt) / Qt
			}
			function tn(e, t, n) {
				var r = e[e.length - 1];
				r && r[0] === t && r[1] === n || e.push([en(t), en(n)])
			}
			function nn(e, t) {
				if (!e.length) return [];
				var v = e.map(function (e) {
					return [e, e]
				}),
					y = [];
				return 0 !== v[0][0] && t[t.length - 1][yt] && v.unshift([0, 0]),
					t.forEach(function (e) {
						for (var t = e[vt], n = e[yt], r = e[gt], i = e[mt], o = Math.ceil(t), a = v[v.length - 1][0], s = v.length, l = a * t, c = 0; c < o; ++c) for (var p = i === xt || i === bt && c % 2 || i === kt && !(c % 2), u = 0; u < s; ++u) {
							var f = v[p ? s - u - 1 : u],
								d = f[1],
								h = a * c + (p ? a - f[0] : f[0]),
								m = v[p ? s - u : u - 1];
							if (l < h) {
								0 !== u && (f = a * c + (p ? a - m[0] : m[0]), m = (m[1] * (m = h - l) + d * (f = l - f)) / (f + m), tn(y, (n + a * t) / r, m));
								break
							}
							if (h === l && y.length && y[y.length - 1][0] === l + n) break;
							tn(y, (n + h) / r, d)
						}
						n && y.unshift([0, y[0][1]]),
							v = y,
							y = []
					}),
					v
			}
			function rn(e, t) {
				var n = F(t,
					function (e) {
						return e[vt] === wt
					},
					t.length - 1) + 1;
				return nn(e, t.slice(0, n))
			}
			function on(e) {
				var c = {};
				return function t() {
					for (var n = [], e = 0; e < arguments.length; e++) n[e] = arguments[e];
					var r, i, o, a = n.length,
						s = n[a - 1],
						l = n.slice(1).map(function (e) {
							return e.getId()
						});
					Dt(s) ? (l.length && (r = l.join("///"), i = rn([0, s.getDuration()], n.slice(1).map(function (e) {
						return e.state
					}).reverse()), o = [], i.forEach(function (e) {
						var t = e[0],
							e = e[1];
						o.push([t, e, e])
					}), c[r] = {
						key: r,
						keys: l,
						isItem: !0,
						isParent: !0,
						parentItem: n[a - 2],
						item: s,
						names: [],
						properties: [],
						frames: o
					}), s.forEach(function (e) {
						t.apply(void 0, n.concat([e]))
					})) : function (p, e, u, f) {
						f.update();
						var t = f.times.slice(),
							n = f.getDuration();
						f.getFrame(0) || t.unshift(0),
							f.getFrame(n) || t.push(n);
						var d = rn(t, e.slice(1).map(function (e) {
							return e.state
						}).reverse()),
							h = e[e.length - 2]; !
								function e(t) {
									for (var r = [], n = 1; n < arguments.length; n++) r[n - 1] = arguments[n];
									var i = [],
										o = X(t),
										a = 0 === r.length;
									d.forEach(function (e) {
										var t = e[0],
											n = e[1],
											e = f.get.apply(f, [n].concat(r));
										U(e) && r.length || i.push([t, n, e])
									});
									var s = u.concat(r),
										l = s.join("///");
									if (l && (p[l] = {
										key: l,
										keys: s,
										parentItem: h,
										isParent: o,
										isItem: a,
										item: f,
										names: u,
										properties: r,
										frames: i
									}), o) for (var c in t) e.apply(void 0, [t[c]].concat(r, [c]))
								}(f.names)
					}(c, n, l, s)
				}(e),
					c
			}
			var an, sn, ln, cn, pn, un = (an = "div", cn = "rCS" + ct(sn = ht).toString(36), pn = 0,
				function (t) {
					function e() {
						this.constructor = n
					}
					var n, r;
					function i(e) {
						return t.call(this, e) || this
					}
					return st(n = i, r = t),
						n.prototype = null === r ? Object.create(r) : (e.prototype = r.prototype, new e),
						i.prototype.render = function () {
							var e = this.props,
								t = e.className,
								e = function (e, t) {
									var n = {};
									for (i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
									if (null != e && "function" == typeof Object.getOwnPropertySymbols) for (var r = 0,
										i = Object.getOwnPropertySymbols(e); r < i.length; r++) t.indexOf(i[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, i[r]) && (n[i[r]] = e[i[r]]);
									return n
								}(e, ["className"]);
							return Ye(an, lt({
								className: t + " " + cn
							},
								e))
						},
						i.prototype.componentDidMount = function () {
							var n, e, t;
							0 === pn && (n = cn, e = sn, (t = document.createElement("style")).setAttribute("type", "text/css"), t.innerHTML = e.replace(/([^}{]*){/gm,
								function (e, t) {
									return Y(t).map(function (e) {
										return - 1 < e.indexOf(":global") ? e.replace(/\:global/g, "") : -1 < e.indexOf(":host") ? "" + e.replace(/\:host/g, "." + n) : "." + n + " " + e
									}).join(", ") + "{"
								}), (document.head || document.body).appendChild(t), ln = t),
								++pn
						},
						i.prototype.componentWillUnmount = function () {
							0 === --pn && ln && ln.parentNode.removeChild(ln)
						},
						i.prototype.getElement = function () {
							return this.element || (this.element = Ve(this))
						},
						i
				}(et)),
				fn = function (t) {
					function e(e) {
						var a = t.call(this, e) || this;
						return a.values = {},
							a.state = {
								alt: !1,
								zoom: 1,
								maxDuration: 0,
								maxTime: 0,
								timelineInfo: {},
								selectedProperty: "",
								selectedTime: -1,
								selectedItem: null,
								init: !1,
								updateTime: !1
							},
							a.keyMap = {
								keydown: {
									alt: function () {
										a.setState({
											alt: !0
										})
									},
									space: function (e) {
										e.inputEvent.preventDefault()
									},
									left: function () {
										a.prev()
									},
									right: function () {
										a.context()
									}
								},
								keyup: {
									alt: function () {
										a.setState({
											alt: !1
										})
									},
									esc: function () {
										a.finish()
									},
									backspace: function () {
										a.removeKeyframe(a.state.selectedProperty)
									},
									space: function () {
										a.togglePlay()
									}
								}
							},
							a.update = function (e) {
								void 0 === e && (e = !1);
								var t, n, r, i, o = a.props.scene;
								o && (t = Math.ceil(o.getDuration()), n = Math.max(a.state.maxTime, t), i = a.state.maxTime, r = a.state.zoom, i = Math.max(1, r * (1 < i ? n / i : 1)), a.setState({
									timelineInfo: on(o),
									maxTime: n,
									maxDuration: t,
									updateTime: !0,
									init: e,
									zoom: i
								}))
							},
							a.prev = function () {
								var e = a.props.scene;
								e && a.setTime(e.getTime() - .05)
							},
							a.finish = function () {
								var e = a.props.scene;
								e && e.finish()
							},
							a.togglePlay = function () {
								var e = a.props.scene;
								e && ("running" === e.getPlayState() ? e.pause() : e.play())
							},
							a.getDistTime = function (e, t) {
								t = (t = void 0 === t ? a.scrollArea.keyframesArea.scrollAreaElement.getBoundingClientRect() : t).width - 30,
									t = Math.min(t, e) / t,
									t = a.state.maxTime * t;
								return Math.round(20 * t) / 20
							},
							a.getTime = function (e) {
								var t = a.scrollArea.keyframesArea.scrollAreaElement.getBoundingClientRect(),
									n = t.left + 15,
									n = Math.max(e - n, 0);
								return a.getDistTime(n, t)
							},
							a.animate = function (e) {
								var t = e.time,
									n = _t(Math.floor(t / 60), 2),
									r = _t(Math.floor(t % 60), 2),
									i = _t(Math.floor(t % 1 * 100), 3, !0);
								a.moveCursor(t),
									a.setInputs(function e(t, n) {
										for (var r in void 0 === n && (n = {}), t) {
											var i = t[r];
											if (X(i)) {
												var o, a = e((s = i) && s.constructor.prototype.toCSS ? i.get() : i);
												for (o in a) n[r + "///" + o] = a[o]
											} else n[r] = i
										}
										var s;
										return n
									}(e.frames || e.frame.get())),
									a.controlArea.timeArea.getElement().value = n + ":" + r + ":" + i
							},
							a.onBlur = function () {
								!0 === a.state.alt && a.setState({
									alt: !1
								})
							},
							a.state = ft({},
								a.state, a.initScene(a.props.scene, !1)),
							a
					}
					ut(e, t);
					var n = e.prototype;
					return n.render = function () {
						var e = this.props,
							t = e.scene,
							n = e.className,
							r = (e.keyboard, e.onSelect,
								function (e, t) {
									var n = {};
									for (i in e) Object.prototype.hasOwnProperty.call(e, i) && t.indexOf(i) < 0 && (n[i] = e[i]);
									if (null != e && "function" == typeof Object.getOwnPropertySymbols) for (var r = 0,
										i = Object.getOwnPropertySymbols(e); r < i.length; r++) t.indexOf(i[r]) < 0 && (n[i[r]] = e[i[r]]);
									return n
								}(e, ["scene", "className", "keyboard", "onSelect"])),
							i = this.state,
							o = i.zoom,
							a = i.alt,
							s = i.maxDuration,
							l = i.maxTime,
							c = i.timelineInfo,
							e = i.selectedProperty,
							i = i.selectedTime;
						return Ye(un, ft({
							className: Et("timeline" + (a ? " alt" : "")) + (n ? " " + n : "")
						},
							r), Ye(It, {
								ref: nt(this, "controlArea"),
								scene: t,
								timeline: this
							}), Ye(Kt, {
								ref: nt(this, "headerArea"),
								timeline: this,
								maxDuration: s,
								zoom: o,
								maxTime: l,
								timelineInfo: c
							}), Ye(Zt, {
								ref: nt(this, "scrollArea"),
								timeline: this,
								maxDuration: s,
								zoom: o,
								maxTime: l,
								selectedProperty: e,
								selectedTime: i,
								timelineInfo: c
							}))
					},
						n.componentDidMount = function () {
							this.initWheelZoom(),
								this.initScroll(),
								this.initDragKeyframes(),
								this.initKeyController()
						},
						n.componentDidUpdate = function (e) {
							var t = this.props.scene,
								n = this.state;
							n.init && (n.init = !1, this.scrollArea.foldAll()),
								e.scene !== t && (this.releaseScene(e.scene), this.setState(this.initScene(t, !0))),
								n.updateTime && (n.updateTime = !1, this.setTime())
						},
						n.componentWillUnmount = function () {
							this.draggers.forEach(function (e) {
								e.unset()
							}),
								this.pinchDragger.unset();
							var e = oe.global,
								t = this.keyMap,
								n = t.keydown,
								t = t.keyup;
							B(window, "blur", this.onBlur),
								e.offKeydown("alt", n.alt).offKeyup("alt", t.alt),
								this.props.keyboard && e.offKeydown("space", n.space).offKeydown("left", n.left).offKeydown("right", n.right).offKeyup("backspace", t.backspace).offKeyup("esc", t.esc).offKeyup("space", t.space)
						},
						n.next = function () {
							var e = this.props.scene;
							e && this.setTime(e.getTime() + .05)
						},
						n.selectItem = function (e) {
							var t, n = this.state,
								r = n.timelineInfo,
								i = n.selectedTime;
							for (t in r) {
								var o = r[t];
								if (o.item === e) {
									this.select(o.key, i);
									break
								}
							}
						},
						n.select = function (e, t, n) {
							void 0 === t && (t = -1);
							var r = document.activeElement;
							r && r.blur && r.blur();
							var i, o, a, s, l = this.props.scene;
							l && (l.pause(), o = (i = this.state).selectedProperty, a = i.selectedTime, s = i.selectedItem, r = i.timelineInfo[e], l = e ? r.item : this.props.scene, r = e ? r.names.join("///") : "", this.props.onSelect && this.props.onSelect({
								selectedItem: l,
								selectedName: r,
								selectedProperty: e,
								selectedTime: t,
								prevSelectedProperty: o,
								prevSelectedTime: a,
								prevSelectedItem: s
							}), n ? (i.selectedProperty = e, i.selectedTime = t, i.selectedItem = l) : this.setState({
								selectedProperty: e,
								selectedTime: t,
								selectedItem: l
							}))
						},
						n.editKeyframe = function (e, t) {
							var n = this.scrollArea.propertiesArea.properties[e].props.propertiesInfo;
							n.isParent || (e = n.item, n = n.properties, e.set.apply(e, [e.getIterationTime()].concat(n, [t])), this.update())
						},
						n.setTime = function (e) {
							var t, n = this.props.scene;
							n && (t = n.getDirection(), n.pause(), U(e) && (e = n.getTime()), "normal" === t || "alternate" === t ? n.setTime(e) : n.setTime(n.getDuration() - e))
						},
						n.setZoom = function (e) {
							this.setState({
								zoom: Math.max(e, 1)
							})
						},
						n.getZoom = function () {
							return this.state.zoom
						},
						n.getValues = function () {
							return this.values
						},
						n.openDialog = function (e, t) {
							void 0 === e && (e = this.props.scene),
								void 0 === t && (t = []),
								this.props.scene && (Dt(e) ? this.newItem(e) : this.newProperty(e, t))
						},
						n.move = function (e) {
							this.setTime(this.getTime(e))
						},
						n.newItem = function (e) {
							var t = prompt("Add Item");
							t && (e.newItem(t), this.update())
						},
						n.newProperty = function (e, t) {
							var n, r = prompt("Add Property");
							r && (n = it, r = (t = t.concat([r])).every(function (e) {
								return !!X(n[e]) && (n = n[e], !0)
							}), e.set.apply(e, [e.getIterationTime()].concat(t, [r ? {} : ""])), this.update())
						},
						n.moveCursor = function (e) {
							var t = this.state.maxTime,
								t = "calc(" + 100 * e / t + "% + " + (15 - 30 * e / t) + "px)";
							this.scrollArea.keyframesArea.cursor.getElement().style.left = t,
								this.headerArea.keytimesArea.cursor.getElement().style.left = t
						},
						n.setInputs = function (e) {
							this.values = e;
							var t, n = this.scrollArea.valuesArea.getElement();
							for (t in e) {
								var r = n.querySelector('[data-id="' + t + '"] input');
								r && (r.value = e[t])
							}
						},
						n.removeKeyframe = function (e) {
							var t = this.state.timelineInfo[e];
							e && t && !Dt(t.item) && (e = t.properties, (t = t.item).remove.apply(t, [t.getIterationTime()].concat(e)), this.update())
						},
						n.addKeyframe = function (e, t) {
							var n = this.scrollArea.keyframesArea.keyframesList[e].props.id;
							this.select(n, t);
							t = this.scrollArea.valuesArea.values[e].inputElement;
							t && this.editKeyframe(e, t.value)
						},
						n.initScene = function (e, t) {
							if (!e) return {
								timelineInfo: {},
								maxTime: 0,
								maxDuration: 0,
								zoom: 1,
								init: !1
							};
							e.finish(),
								e.on("animate", this.animate);
							var n = Math.ceil(e.getDuration());
							return {
								timelineInfo: on(e),
								maxTime: n,
								maxDuration: n,
								zoom: 1,
								init: t || !1
							}
						},
						n.releaseScene = function (e) {
							e && e.off("animate", this.animate)
						},
						n.initWheelZoom = function () {
							var n = this,
								e = this.scrollArea.keyframesArea.getElement();
							this.pinchDragger = new we(e, {
								pinchstart: function (e) {
									e.datas.zoom = n.state.zoom
								},
								pinch: function (e) {
									var t = e.scale,
										e = e.datas;
									console.log("SCALE", t),
										n.setZoom(e.zoom * t)
								}
							})
						},
						n.initScroll = function () {
							var t = !1,
								n = this.headerArea.keytimesArea.getElement(),
								r = this.scrollArea.keyframesArea.getElement();
							n.addEventListener("scroll",
								function () {
									t ? t = !1 : (t = !0, r.scrollLeft = n.scrollLeft)
								}),
								r.addEventListener("scroll",
									function (e) {
										t ? t = !1 : (t = !0, n.scrollLeft = r.scrollLeft)
									})
						},
						n.selectByKeyframe = function (e) {
							var t = e.parentElement.parentElement,
								e = parseFloat(e.getAttribute("data-time") || "0"),
								t = t.getAttribute("data-id") || "";
                console.log('---- selectByKeyframe 选择帧', t, e)
							this.setTime(e),
								this.select(t, e)
						},
						n.initDragKeyframes = function () {
							function l(e, t, n) {
								- 1 !== (n = Nt(u.scrollArea.keyframesArea.keyframesList.map(function (e) {
									return e.getElement()
								}), n)) && u.addKeyframe(n, u.getTime(t))
							}
							var c, p, u = this,
								e = this.headerArea.keytimesArea.scrollAreaElement,
								t = this.scrollArea.keyframesArea.scrollAreaElement,
								f = 0;
							this.draggers = [e, t].map(function (e) {
								return new we(e, {
									container: window,
									dragstart: function (e) {
										e.clientX;
										var t, n, r = e.inputEvent.target,
											e = Pt(r,
												function (e) {
													return Tt(e, "keyframe")
												});
										if (e) return u.selectByKeyframe(e),
											!1; (p = Pt(r,
												function (e) {
													return Tt(e, "keyframe-group")
												})) && (e = u.scrollArea.propertiesArea.properties, t = Pt(p,
													function (e) {
														return Tt(e, "keyframes")
													}).getAttribute("data-id"), n = (- 1 < (e = F(r = e, e = function (e) {
														return e.props.id === t
													})) ? r[e] : n).props.propertiesInfo, c = n.item, f = c.getDelay())
									},
									drag: function (e) {
                    // console.log(e, u.getDistTime(t));
										var t = e.distX,
											n = e.deltaX,
											r = e.deltaY,
											e = e.inputEvent;
										p && c ? (t = Math.max(f + u.getDistTime(t), 0), c.getDelay() !== t && (c.setDelay(t), u.update())) : (u.scrollArea.keyframesArea.getElement().scrollLeft -= n, u.scrollArea.getElement().scrollTop -= r, e.preventDefault())
									},
									dragend: function (e) {
										var t, n, r, i = e.isDrag,
											o = e.clientX,
											a = e.clientY,
											s = e.inputEvent;
										c = p = null,
											f = 0,
											i || (t = s, n = o, r = a, e = u.getTime(n), n = u.scrollArea.keyframesArea.keyframesList, r = Nt(n.map(function (e) {
												return e.getElement()
											}), r), u.setTime(e), console.log('--- dragend', e ),  -1 < r && u.select(n[r].props.id, e), t.preventDefault()),
											Jt(i, s, o, a, l)
									}
								})
							})
						},
						n.initKeyController = function () {
							R(window, "blur", this.onBlur);
							var e = oe.global,
								t = this.keyMap,
								n = t.keydown,
								t = t.keyup;
							e.keydown("alt", n.alt).keyup("alt", t.alt),
								this.props.keyboard && e.keydown("space", n.space).keydown("left", n.left).keydown("right", n.right).keyup("backspace", t.backspace).keyup("esc", t.esc).keyup("space", t.space)
						},
						e.defaultProps = {
							keyboard: !0,
							onSelect: function () { }
						},
						e
				}(at),
				dn = function (e) {
					function t() {
						this.constructor = n
					}
					var n;
					function r() {
						return null !== e && e.apply(this, arguments) || this
					}
					_e(n = r, i = e),
						n.prototype = null === i ? Object.create(i) : (t.prototype = i.prototype, new t);
					var i = r.prototype;
					return i.render = function () {
						var t = this;
						return u(fn, Ce({},
							this.props, {
							ref: function (e) {
								t.timeline = e
							}
						}))
					},
						i.update = function (e) {
							this.timeline.update(e)
						},
						i.prev = function () {
							this.timeline.prev()
						},
						i.next = function () {
							this.timeline.next()
						},
						i.finish = function () {
							this.timeline.finish()
						},
						i.togglePlay = function () {
							this.timeline.togglePlay()
						},
						r
				}(x);
			return function (a) {
				function e() {
					this.constructor = t
				}
				var t, n;
				function r(e, t, n) {
					void 0 === n && (n = {});
					var r = a.call(this) || this;
					r.onSelect = function (e) {
						r.trigger("select", e)
					};
					var i, o = document.createElement("div");
					return e = u(dn, s({
						ref: function (e) {
							e && (r.timelineArea = e)
						},
						keyboard: !0
					},
						n, {
						scene: e,
						onSelect: r.onSelect
					})),
						S(i, e, {},
							!1, o, !1),
						t.appendChild(o.children[0]),
						r
				}
				return i(t = r, n = a),
					t.prototype = null === n ? Object.create(n) : (e.prototype = n.prototype, new e),
					r.prototype.update = function (e) {
						this.timelineArea.update(e)
					},
					r
			}(e)
		});
//# sourceMappingURL=timeline.pkgd.min.js.map
