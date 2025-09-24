(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e) {
      if (t.type !== `childList`) continue;
      for (let e of t.addedNodes)
        e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
    }
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
        ? (t.credentials = `omit`)
        : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var e = globalThis,
  t =
    e.ShadowRoot &&
    (e.ShadyCSS === void 0 || e.ShadyCSS.nativeShadow) &&
    `adoptedStyleSheets` in Document.prototype &&
    `replace` in CSSStyleSheet.prototype,
  n = Symbol(),
  r = new WeakMap(),
  i = class {
    constructor(e, t, r) {
      if (((this._$cssResult$ = !0), r !== n))
        throw Error(
          "CSSResult is not constructable. Use `unsafeCSS` or `css` instead."
        );
      (this.cssText = e), (this.t = t);
    }
    get styleSheet() {
      let e = this.o,
        n = this.t;
      if (t && e === void 0) {
        let t = n !== void 0 && n.length === 1;
        t && (e = r.get(n)),
          e === void 0 &&
            ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText),
            t && r.set(n, e));
      }
      return e;
    }
    toString() {
      return this.cssText;
    }
  },
  a = (e) => new i(typeof e == `string` ? e : e + ``, void 0, n),
  o = (e, ...t) => {
    let r =
      e.length === 1
        ? e[0]
        : t.reduce(
            (t, n, r) =>
              t +
              ((e) => {
                if (!0 === e._$cssResult$) return e.cssText;
                if (typeof e == `number`) return e;
                throw Error(
                  `Value passed to 'css' function must be a 'css' function result: ` +
                    e +
                    `. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`
                );
              })(n) +
              e[r + 1],
            e[0]
          );
    return new i(r, e, n);
  },
  s = (n, r) => {
    if (t)
      n.adoptedStyleSheets = r.map((e) =>
        e instanceof CSSStyleSheet ? e : e.styleSheet
      );
    else
      for (let t of r) {
        let r = document.createElement(`style`),
          i = e.litNonce;
        i !== void 0 && r.setAttribute(`nonce`, i),
          (r.textContent = t.cssText),
          n.appendChild(r);
      }
  },
  c = t
    ? (e) => e
    : (e) =>
        e instanceof CSSStyleSheet
          ? ((e) => {
              let t = ``;
              for (let n of e.cssRules) t += n.cssText;
              return a(t);
            })(e)
          : e,
  {
    is: l,
    defineProperty: u,
    getOwnPropertyDescriptor: d,
    getOwnPropertyNames: ee,
    getOwnPropertySymbols: te,
    getPrototypeOf: f,
  } = Object,
  p = globalThis,
  m = p.trustedTypes,
  ne = m ? m.emptyScript : ``,
  re = p.reactiveElementPolyfillSupport,
  h = (e, t) => e,
  g = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          e = e ? ne : null;
          break;
        case Object:
        case Array:
          e = e == null ? e : JSON.stringify(e);
      }
      return e;
    },
    fromAttribute(e, t) {
      let n = e;
      switch (t) {
        case Boolean:
          n = e !== null;
          break;
        case Number:
          n = e === null ? null : Number(e);
          break;
        case Object:
        case Array:
          try {
            n = JSON.parse(e);
          } catch {
            n = null;
          }
      }
      return n;
    },
  },
  _ = (e, t) => !l(e, t),
  v = {
    attribute: !0,
    type: String,
    converter: g,
    reflect: !1,
    useDefault: !1,
    hasChanged: _,
  };
(Symbol.metadata ??= Symbol(`metadata`)),
  (p.litPropertyMetadata ??= new WeakMap());
var y = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = v) {
    if (
      (t.state && (t.attribute = !1),
      this._$Ei(),
      this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0),
      this.elementProperties.set(e, t),
      !t.noAccessor)
    ) {
      let n = Symbol(),
        r = this.getPropertyDescriptor(e, n, t);
      r !== void 0 && u(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    let { get: r, set: i } = d(this.prototype, e) ?? {
      get() {
        return this[t];
      },
      set(e) {
        this[t] = e;
      },
    };
    return {
      get: r,
      set(t) {
        let a = r?.call(this);
        i?.call(this, t), this.requestUpdate(e, a, n);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? v;
  }
  static _$Ei() {
    if (this.hasOwnProperty(h(`elementProperties`))) return;
    let e = f(this);
    e.finalize(),
      e.l !== void 0 && (this.l = [...e.l]),
      (this.elementProperties = new Map(e.elementProperties));
  }
  static finalize() {
    if (this.hasOwnProperty(h(`finalized`))) return;
    if (
      ((this.finalized = !0), this._$Ei(), this.hasOwnProperty(h(`properties`)))
    ) {
      let e = this.properties,
        t = [...ee(e), ...te(e)];
      for (let n of t) this.createProperty(n, e[n]);
    }
    let e = this[Symbol.metadata];
    if (e !== null) {
      let t = litPropertyMetadata.get(e);
      if (t !== void 0) for (let [e, n] of t) this.elementProperties.set(e, n);
    }
    this._$Eh = new Map();
    for (let [e, t] of this.elementProperties) {
      let n = this._$Eu(e, t);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    let t = [];
    if (Array.isArray(e)) {
      let n = new Set(e.flat(1 / 0).reverse());
      for (let e of n) t.unshift(c(e));
    } else e !== void 0 && t.push(c(e));
    return t;
  }
  static _$Eu(e, t) {
    let n = t.attribute;
    return !1 === n
      ? void 0
      : typeof n == `string`
      ? n
      : typeof e == `string`
      ? e.toLowerCase()
      : void 0;
  }
  constructor() {
    super(),
      (this._$Ep = void 0),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Em = null),
      this._$Ev();
  }
  _$Ev() {
    (this._$ES = new Promise((e) => (this.enableUpdating = e))),
      (this._$AL = new Map()),
      this._$E_(),
      this.requestUpdate(),
      this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= new Set()).add(e),
      this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    let e = new Map(),
      t = this.constructor.elementProperties;
    for (let n of t.keys())
      this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    let e =
      this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return s(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    (this.renderRoot ??= this.createRenderRoot()),
      this.enableUpdating(!0),
      this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {}
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$ET(e, t) {
    let n = this.constructor.elementProperties.get(e),
      r = this.constructor._$Eu(e, n);
    if (r !== void 0 && !0 === n.reflect) {
      let i = (
        n.converter?.toAttribute === void 0 ? g : n.converter
      ).toAttribute(t, n.type);
      (this._$Em = e),
        i == null ? this.removeAttribute(r) : this.setAttribute(r, i),
        (this._$Em = null);
    }
  }
  _$AK(e, t) {
    let n = this.constructor,
      r = n._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      let e = n.getPropertyOptions(r),
        i =
          typeof e.converter == `function`
            ? { fromAttribute: e.converter }
            : e.converter?.fromAttribute === void 0
            ? g
            : e.converter;
      this._$Em = r;
      let a = i.fromAttribute(t, e.type);
      (this[r] = a ?? this._$Ej?.get(r) ?? a), (this._$Em = null);
    }
  }
  requestUpdate(e, t, n) {
    if (e !== void 0) {
      let r = this.constructor,
        i = this[e];
      if (
        ((n ??= r.getPropertyOptions(e)),
        !(
          (n.hasChanged ?? _)(i, t) ||
          (n.useDefault &&
            n.reflect &&
            i === this._$Ej?.get(e) &&
            !this.hasAttribute(r._$Eu(e, n)))
        ))
      )
        return;
      this.C(e, t, n);
    }
    !1 === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: r, wrapped: i }, a) {
    (n &&
      !(this._$Ej ??= new Map()).has(e) &&
      (this._$Ej.set(e, a ?? t ?? this[e]), !0 !== i || a !== void 0)) ||
      (this._$AL.has(e) ||
        (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)),
      !0 === r && this._$Em !== e && (this._$Eq ??= new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    let e = this.scheduleUpdate();
    return e != null && (await e), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (((this.renderRoot ??= this.createRenderRoot()), this._$Ep)) {
        for (let [e, t] of this._$Ep) this[e] = t;
        this._$Ep = void 0;
      }
      let e = this.constructor.elementProperties;
      if (e.size > 0)
        for (let [t, n] of e) {
          let { wrapped: e } = n,
            r = this[t];
          !0 !== e ||
            this._$AL.has(t) ||
            r === void 0 ||
            this.C(t, void 0, n, r);
        }
    }
    let e = !1,
      t = this._$AL;
    try {
      (e = this.shouldUpdate(t)),
        e
          ? (this.willUpdate(t),
            this._$EO?.forEach((e) => e.hostUpdate?.()),
            this.update(t))
          : this._$EM();
    } catch (t) {
      throw ((e = !1), this._$EM(), t);
    }
    e && this._$AE(t);
  }
  willUpdate(e) {}
  _$AE(e) {
    this._$EO?.forEach((e) => e.hostUpdated?.()),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(e)),
      this.updated(e);
  }
  _$EM() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    (this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e]))),
      this._$EM();
  }
  updated(e) {}
  firstUpdated(e) {}
};
(y.elementStyles = []),
  (y.shadowRootOptions = { mode: `open` }),
  (y[h(`elementProperties`)] = new Map()),
  (y[h(`finalized`)] = new Map()),
  re?.({ ReactiveElement: y }),
  (p.reactiveElementVersions ??= []).push(`2.1.1`);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var b = globalThis,
  x = b.trustedTypes,
  S = x ? x.createPolicy(`lit-html`, { createHTML: (e) => e }) : void 0,
  C = `$lit$`,
  w = `lit$${Math.random().toFixed(9).slice(2)}$`,
  T = `?` + w,
  ie = `<${T}>`,
  E = document,
  D = () => E.createComment(``),
  O = (e) => e === null || (typeof e != `object` && typeof e != `function`),
  k = Array.isArray,
  A = (e) => k(e) || typeof e?.[Symbol.iterator] == `function`,
  j = `[ 	
\f\r]`,
  M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  N = /-->/g,
  P = />/g,
  F = RegExp(
    `>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,
    `g`
  ),
  I = /'/g,
  L = /"/g,
  R = /^(?:script|style|textarea|title)$/i,
  ae =
    (e) =>
    (t, ...n) => ({ _$litType$: e, strings: t, values: n }),
  oe = ae(1),
  z = Symbol.for(`lit-noChange`),
  B = Symbol.for(`lit-nothing`),
  V = new WeakMap(),
  H = E.createTreeWalker(E, 129);
function U(e, t) {
  if (!k(e) || !e.hasOwnProperty(`raw`))
    throw Error(`invalid template strings array`);
  return S === void 0 ? t : S.createHTML(t);
}
var W = (e, t) => {
    let n = e.length - 1,
      r = [],
      i,
      a = t === 2 ? `<svg>` : t === 3 ? `<math>` : ``,
      o = M;
    for (let t = 0; t < n; t++) {
      let n = e[t],
        s,
        c,
        l = -1,
        u = 0;
      for (; u < n.length && ((o.lastIndex = u), (c = o.exec(n)), c !== null); )
        (u = o.lastIndex),
          o === M
            ? c[1] === `!--`
              ? (o = N)
              : c[1] === void 0
              ? c[2] === void 0
                ? c[3] !== void 0 && (o = F)
                : (R.test(c[2]) && (i = RegExp(`</` + c[2], `g`)), (o = F))
              : (o = P)
            : o === F
            ? c[0] === `>`
              ? ((o = i ?? M), (l = -1))
              : c[1] === void 0
              ? (l = -2)
              : ((l = o.lastIndex - c[2].length),
                (s = c[1]),
                (o = c[3] === void 0 ? F : c[3] === `"` ? L : I))
            : o === L || o === I
            ? (o = F)
            : o === N || o === P
            ? (o = M)
            : ((o = F), (i = void 0));
      let d = o === F && e[t + 1].startsWith(`/>`) ? ` ` : ``;
      a +=
        o === M
          ? n + ie
          : l >= 0
          ? (r.push(s), n.slice(0, l) + C + n.slice(l) + w + d)
          : n + w + (l === -2 ? t : d);
    }
    return [
      U(
        e,
        a + (e[n] || `<?>`) + (t === 2 ? `</svg>` : t === 3 ? `</math>` : ``)
      ),
      r,
    ];
  },
  G = class e {
    constructor({ strings: t, _$litType$: n }, r) {
      let i;
      this.parts = [];
      let a = 0,
        o = 0,
        s = t.length - 1,
        c = this.parts,
        [l, u] = W(t, n);
      if (
        ((this.el = e.createElement(l, r)),
        (H.currentNode = this.el.content),
        n === 2 || n === 3)
      ) {
        let e = this.el.content.firstChild;
        e.replaceWith(...e.childNodes);
      }
      for (; (i = H.nextNode()) !== null && c.length < s; ) {
        if (i.nodeType === 1) {
          if (i.hasAttributes())
            for (let e of i.getAttributeNames())
              if (e.endsWith(C)) {
                let t = u[o++],
                  n = i.getAttribute(e).split(w),
                  r = /([.?@])?(.*)/.exec(t);
                c.push({
                  type: 1,
                  index: a,
                  name: r[2],
                  strings: n,
                  ctor:
                    r[1] === `.`
                      ? se
                      : r[1] === `?`
                      ? ce
                      : r[1] === `@`
                      ? le
                      : Y,
                }),
                  i.removeAttribute(e);
              } else
                e.startsWith(w) &&
                  (c.push({ type: 6, index: a }), i.removeAttribute(e));
          if (R.test(i.tagName)) {
            let e = i.textContent.split(w),
              t = e.length - 1;
            if (t > 0) {
              i.textContent = x ? x.emptyScript : ``;
              for (let n = 0; n < t; n++)
                i.append(e[n], D()),
                  H.nextNode(),
                  c.push({ type: 2, index: ++a });
              i.append(e[t], D());
            }
          }
        } else if (i.nodeType === 8)
          if (i.data === T) c.push({ type: 2, index: a });
          else {
            let e = -1;
            for (; (e = i.data.indexOf(w, e + 1)) !== -1; )
              c.push({ type: 7, index: a }), (e += w.length - 1);
          }
        a++;
      }
    }
    static createElement(e, t) {
      let n = E.createElement(`template`);
      return (n.innerHTML = e), n;
    }
  };
function K(e, t, n = e, r) {
  if (t === z) return t;
  let i = r === void 0 ? n._$Cl : n._$Co?.[r],
    a = O(t) ? void 0 : t._$litDirective$;
  return (
    i?.constructor !== a &&
      (i?._$AO?.(!1),
      a === void 0 ? (i = void 0) : ((i = new a(e)), i._$AT(e, n, r)),
      r === void 0 ? (n._$Cl = i) : ((n._$Co ??= [])[r] = i)),
    i !== void 0 && (t = K(e, i._$AS(e, t.values), i, r)),
    t
  );
}
var q = class {
    constructor(e, t) {
      (this._$AV = []), (this._$AN = void 0), (this._$AD = e), (this._$AM = t);
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    u(e) {
      let {
          el: { content: t },
          parts: n,
        } = this._$AD,
        r = (e?.creationScope ?? E).importNode(t, !0);
      H.currentNode = r;
      let i = H.nextNode(),
        a = 0,
        o = 0,
        s = n[0];
      for (; s !== void 0; ) {
        if (a === s.index) {
          let t;
          s.type === 2
            ? (t = new J(i, i.nextSibling, this, e))
            : s.type === 1
            ? (t = new s.ctor(i, s.name, s.strings, this, e))
            : s.type === 6 && (t = new ue(i, this, e)),
            this._$AV.push(t),
            (s = n[++o]);
        }
        a !== s?.index && ((i = H.nextNode()), a++);
      }
      return (H.currentNode = E), r;
    }
    p(e) {
      let t = 0;
      for (let n of this._$AV)
        n !== void 0 &&
          (n.strings === void 0
            ? n._$AI(e[t])
            : (n._$AI(e, n, t), (t += n.strings.length - 2))),
          t++;
    }
  },
  J = class e {
    get _$AU() {
      return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(e, t, n, r) {
      (this.type = 2),
        (this._$AH = B),
        (this._$AN = void 0),
        (this._$AA = e),
        (this._$AB = t),
        (this._$AM = n),
        (this.options = r),
        (this._$Cv = r?.isConnected ?? !0);
    }
    get parentNode() {
      let e = this._$AA.parentNode,
        t = this._$AM;
      return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(e, t = this) {
      (e = K(this, e, t)),
        O(e)
          ? e === B || e == null || e === ``
            ? (this._$AH !== B && this._$AR(), (this._$AH = B))
            : e !== this._$AH && e !== z && this._(e)
          : e._$litType$ === void 0
          ? e.nodeType === void 0
            ? A(e)
              ? this.k(e)
              : this._(e)
            : this.T(e)
          : this.$(e);
    }
    O(e) {
      return this._$AA.parentNode.insertBefore(e, this._$AB);
    }
    T(e) {
      this._$AH !== e && (this._$AR(), (this._$AH = this.O(e)));
    }
    _(e) {
      this._$AH !== B && O(this._$AH)
        ? (this._$AA.nextSibling.data = e)
        : this.T(E.createTextNode(e)),
        (this._$AH = e);
    }
    $(e) {
      let { values: t, _$litType$: n } = e,
        r =
          typeof n == `number`
            ? this._$AC(e)
            : (n.el === void 0 &&
                (n.el = G.createElement(U(n.h, n.h[0]), this.options)),
              n);
      if (this._$AH?._$AD === r) this._$AH.p(t);
      else {
        let e = new q(r, this),
          n = e.u(this.options);
        e.p(t), this.T(n), (this._$AH = e);
      }
    }
    _$AC(e) {
      let t = V.get(e.strings);
      return t === void 0 && V.set(e.strings, (t = new G(e))), t;
    }
    k(t) {
      k(this._$AH) || ((this._$AH = []), this._$AR());
      let n = this._$AH,
        r,
        i = 0;
      for (let a of t)
        i === n.length
          ? n.push((r = new e(this.O(D()), this.O(D()), this, this.options)))
          : (r = n[i]),
          r._$AI(a),
          i++;
      i < n.length && (this._$AR(r && r._$AB.nextSibling, i), (n.length = i));
    }
    _$AR(e = this._$AA.nextSibling, t) {
      for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
        let t = e.nextSibling;
        e.remove(), (e = t);
      }
    }
    setConnected(e) {
      this._$AM === void 0 && ((this._$Cv = e), this._$AP?.(e));
    }
  },
  Y = class {
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    constructor(e, t, n, r, i) {
      (this.type = 1),
        (this._$AH = B),
        (this._$AN = void 0),
        (this.element = e),
        (this.name = t),
        (this._$AM = r),
        (this.options = i),
        n.length > 2 || n[0] !== `` || n[1] !== ``
          ? ((this._$AH = Array(n.length - 1).fill(new String())),
            (this.strings = n))
          : (this._$AH = B);
    }
    _$AI(e, t = this, n, r) {
      let i = this.strings,
        a = !1;
      if (i === void 0)
        (e = K(this, e, t, 0)),
          (a = !O(e) || (e !== this._$AH && e !== z)),
          a && (this._$AH = e);
      else {
        let r = e,
          o,
          s;
        for (e = i[0], o = 0; o < i.length - 1; o++)
          (s = K(this, r[n + o], t, o)),
            s === z && (s = this._$AH[o]),
            (a ||= !O(s) || s !== this._$AH[o]),
            s === B ? (e = B) : e !== B && (e += (s ?? ``) + i[o + 1]),
            (this._$AH[o] = s);
      }
      a && !r && this.j(e);
    }
    j(e) {
      e === B
        ? this.element.removeAttribute(this.name)
        : this.element.setAttribute(this.name, e ?? ``);
    }
  },
  se = class extends Y {
    constructor() {
      super(...arguments), (this.type = 3);
    }
    j(e) {
      this.element[this.name] = e === B ? void 0 : e;
    }
  },
  ce = class extends Y {
    constructor() {
      super(...arguments), (this.type = 4);
    }
    j(e) {
      this.element.toggleAttribute(this.name, !!e && e !== B);
    }
  },
  le = class extends Y {
    constructor(e, t, n, r, i) {
      super(e, t, n, r, i), (this.type = 5);
    }
    _$AI(e, t = this) {
      if ((e = K(this, e, t, 0) ?? B) === z) return;
      let n = this._$AH,
        r =
          (e === B && n !== B) ||
          e.capture !== n.capture ||
          e.once !== n.once ||
          e.passive !== n.passive,
        i = e !== B && (n === B || r);
      r && this.element.removeEventListener(this.name, this, n),
        i && this.element.addEventListener(this.name, this, e),
        (this._$AH = e);
    }
    handleEvent(e) {
      typeof this._$AH == `function`
        ? this._$AH.call(this.options?.host ?? this.element, e)
        : this._$AH.handleEvent(e);
    }
  },
  ue = class {
    constructor(e, t, n) {
      (this.element = e),
        (this.type = 6),
        (this._$AN = void 0),
        (this._$AM = t),
        (this.options = n);
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(e) {
      K(this, e);
    }
  },
  de = b.litHtmlPolyfillSupport;
de?.(G, J), (b.litHtmlVersions ??= []).push(`3.3.1`);
var fe = (e, t, n) => {
    let r = n?.renderBefore ?? t,
      i = r._$litPart$;
    if (i === void 0) {
      let e = n?.renderBefore ?? null;
      r._$litPart$ = i = new J(t.insertBefore(D(), e), e, void 0, n ?? {});
    }
    return i._$AI(e), i;
  },
  X = globalThis,
  Z = class extends y {
    constructor() {
      super(...arguments),
        (this.renderOptions = { host: this }),
        (this._$Do = void 0);
    }
    createRenderRoot() {
      let e = super.createRenderRoot();
      return (this.renderOptions.renderBefore ??= e.firstChild), e;
    }
    update(e) {
      let t = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
        super.update(e),
        (this._$Do = fe(t, this.renderRoot, this.renderOptions));
    }
    connectedCallback() {
      super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
      super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
      return z;
    }
  };
(Z._$litElement$ = !0),
  (Z.finalized = !0),
  X.litElementHydrateSupport?.({ LitElement: Z });
var pe = X.litElementPolyfillSupport;
pe?.({ LitElement: Z }), (X.litElementVersions ??= []).push(`4.2.1`);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var me = (e) => (t, n) => {
    n === void 0
      ? customElements.define(e, t)
      : n.addInitializer(() => {
          customElements.define(e, t);
        });
  },
  he = {
    attribute: !0,
    type: String,
    converter: g,
    reflect: !1,
    hasChanged: _,
  },
  ge = (e = he, t, n) => {
    let { kind: r, metadata: i } = n,
      a = globalThis.litPropertyMetadata.get(i);
    if (
      (a === void 0 && globalThis.litPropertyMetadata.set(i, (a = new Map())),
      r === `setter` && ((e = Object.create(e)).wrapped = !0),
      a.set(n.name, e),
      r === `accessor`)
    ) {
      let { name: r } = n;
      return {
        set(n) {
          let i = t.get.call(this);
          t.set.call(this, n), this.requestUpdate(r, i, e);
        },
        init(t) {
          return t !== void 0 && this.C(r, void 0, e, t), t;
        },
      };
    }
    if (r === `setter`) {
      let { name: r } = n;
      return function (n) {
        let i = this[r];
        t.call(this, n), this.requestUpdate(r, i, e);
      };
    }
    throw Error(`Unsupported decorator location: ` + r);
  };
function _e(e) {
  return (t, n) =>
    typeof n == `object`
      ? ge(e, t, n)
      : ((e, t, n) => {
          let r = t.hasOwnProperty(n);
          return (
            t.constructor.createProperty(n, e),
            r ? Object.getOwnPropertyDescriptor(t, n) : void 0
          );
        })(e, t, n);
}
function Q(e, t, n, r) {
  var i = arguments.length,
    a =
      i < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r,
    o;
  if (typeof Reflect == `object` && typeof Reflect.decorate == `function`)
    a = Reflect.decorate(e, t, n, r);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (o = e[s]) && (a = (i < 3 ? o(a) : i > 3 ? o(t, n, a) : o(t, n)) || a);
  return i > 3 && a && Object.defineProperty(t, n, a), a;
}
var $ = class extends Z {
  constructor(...e) {
    super(...e), (this.appearance = `primary`);
  }
  static {
    this.styles = o`
    :host {
      display: inline-block;
      padding: 0.25em 0.4em;
      font-weight: 700;
      text-align: center;
      border-radius: 0.25rem;
      color: #fff;
      background-color: #0d6efd;
    }
    slot {
      color: #fff;
    }
    :host([appearance="secondary"]) {
      background-color: #6c757d;
    }
  `;
  }
  render() {
    return oe`<slot></slot> `;
  }
};
Q([_e({ type: String })], $.prototype, `appearance`, void 0),
  ($ = Q([me(`my-badge`)], $));
