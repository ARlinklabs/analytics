;(() => {
  var t = {
      823: (t, e, r) => {
        'use strict'
        r.r(e), r.d(e, { default: () => n })
        const n = {}
      },
      526: (t, e) => {
        'use strict'
        ;(e.byteLength = function (t) {
          var e = o(t),
            r = e[0],
            n = e[1]
          return (3 * (r + n)) / 4 - n
        }),
          (e.toByteArray = function (t) {
            var e,
              r,
              s = o(t),
              i = s[0],
              c = s[1],
              u = new a(
                (function (t, e, r) {
                  return (3 * (e + r)) / 4 - r
                })(0, i, c)
              ),
              l = 0,
              h = c > 0 ? i - 4 : i
            for (r = 0; r < h; r += 4)
              (e =
                (n[t.charCodeAt(r)] << 18) |
                (n[t.charCodeAt(r + 1)] << 12) |
                (n[t.charCodeAt(r + 2)] << 6) |
                n[t.charCodeAt(r + 3)]),
                (u[l++] = (e >> 16) & 255),
                (u[l++] = (e >> 8) & 255),
                (u[l++] = 255 & e)
            2 === c &&
              ((e = (n[t.charCodeAt(r)] << 2) | (n[t.charCodeAt(r + 1)] >> 4)), (u[l++] = 255 & e))
            1 === c &&
              ((e =
                (n[t.charCodeAt(r)] << 10) |
                (n[t.charCodeAt(r + 1)] << 4) |
                (n[t.charCodeAt(r + 2)] >> 2)),
              (u[l++] = (e >> 8) & 255),
              (u[l++] = 255 & e))
            return u
          }),
          (e.fromByteArray = function (t) {
            for (var e, n = t.length, a = n % 3, s = [], i = 16383, o = 0, u = n - a; o < u; o += i)
              s.push(c(t, o, o + i > u ? u : o + i))
            1 === a
              ? ((e = t[n - 1]), s.push(r[e >> 2] + r[(e << 4) & 63] + '=='))
              : 2 === a &&
                ((e = (t[n - 2] << 8) + t[n - 1]),
                s.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + '='))
            return s.join('')
          })
        for (
          var r = [],
            n = [],
            a = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
            s = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
            i = 0;
          i < 64;
          ++i
        )
          (r[i] = s[i]), (n[s.charCodeAt(i)] = i)
        function o(t) {
          var e = t.length
          if (e % 4 > 0) throw new Error('Invalid string. Length must be a multiple of 4')
          var r = t.indexOf('=')
          return -1 === r && (r = e), [r, r === e ? 0 : 4 - (r % 4)]
        }
        function c(t, e, n) {
          for (var a, s, i = [], o = e; o < n; o += 3)
            (a = ((t[o] << 16) & 16711680) + ((t[o + 1] << 8) & 65280) + (255 & t[o + 2])),
              i.push(r[((s = a) >> 18) & 63] + r[(s >> 12) & 63] + r[(s >> 6) & 63] + r[63 & s])
          return i.join('')
        }
        ;(n['-'.charCodeAt(0)] = 62), (n['_'.charCodeAt(0)] = 63)
      },
      594: function (t, e, r) {
        var n
        !(function () {
          'use strict'
          var a,
            s = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
            i = Math.ceil,
            o = Math.floor,
            c = '[BigNumber Error] ',
            u = c + 'Number primitive has more than 15 significant digits: ',
            l = 1e14,
            h = 14,
            f = 9007199254740991,
            d = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
            g = 1e7,
            p = 1e9
          function w(t) {
            var e = 0 | t
            return t > 0 || t === e ? e : e - 1
          }
          function y(t) {
            for (var e, r, n = 1, a = t.length, s = t[0] + ''; n < a; ) {
              for (e = t[n++] + '', r = h - e.length; r--; e = '0' + e);
              s += e
            }
            for (a = s.length; 48 === s.charCodeAt(--a); );
            return s.slice(0, a + 1 || 1)
          }
          function m(t, e) {
            var r,
              n,
              a = t.c,
              s = e.c,
              i = t.s,
              o = e.s,
              c = t.e,
              u = e.e
            if (!i || !o) return null
            if (((r = a && !a[0]), (n = s && !s[0]), r || n)) return r ? (n ? 0 : -o) : i
            if (i != o) return i
            if (((r = i < 0), (n = c == u), !a || !s)) return n ? 0 : !a ^ r ? 1 : -1
            if (!n) return (c > u) ^ r ? 1 : -1
            for (o = (c = a.length) < (u = s.length) ? c : u, i = 0; i < o; i++)
              if (a[i] != s[i]) return (a[i] > s[i]) ^ r ? 1 : -1
            return c == u ? 0 : (c > u) ^ r ? 1 : -1
          }
          function b(t, e, r, n) {
            if (t < e || t > r || t !== o(t))
              throw Error(
                c +
                  (n || 'Argument') +
                  ('number' == typeof t
                    ? t < e || t > r
                      ? ' out of range: '
                      : ' not an integer: '
                    : ' not a primitive number: ') +
                  String(t)
              )
          }
          function v(t) {
            var e = t.c.length - 1
            return w(t.e / h) == e && t.c[e] % 2 != 0
          }
          function T(t, e) {
            return (t.length > 1 ? t.charAt(0) + '.' + t.slice(1) : t) + (e < 0 ? 'e' : 'e+') + e
          }
          function E(t, e, r) {
            var n, a
            if (e < 0) {
              for (a = r + '.'; ++e; a += r);
              t = a + t
            } else if (++e > (n = t.length)) {
              for (a = r, e -= n; --e; a += r);
              t += a
            } else e < n && (t = t.slice(0, e) + '.' + t.slice(e))
            return t
          }
          ;(a = (function t(e) {
            var r,
              n,
              a,
              A,
              _,
              S,
              k,
              B,
              O,
              N,
              x = (F.prototype = {
                constructor: F,
                toString: null,
                valueOf: null
              }),
              U = new F(1),
              C = 20,
              R = 4,
              P = -7,
              I = 21,
              D = -1e7,
              $ = 1e7,
              j = !1,
              L = 1,
              M = 0,
              K = {
                prefix: '',
                groupSize: 3,
                secondaryGroupSize: 0,
                groupSeparator: ',',
                decimalSeparator: '.',
                fractionGroupSize: 0,
                fractionGroupSeparator: ' ',
                suffix: ''
              },
              H = '0123456789abcdefghijklmnopqrstuvwxyz',
              q = !0
            function F(t, e) {
              var r,
                i,
                c,
                l,
                d,
                g,
                p,
                w,
                y = this
              if (!(y instanceof F)) return new F(t, e)
              if (null == e) {
                if (t && !0 === t._isBigNumber)
                  return (
                    (y.s = t.s),
                    void (!t.c || t.e > $
                      ? (y.c = y.e = null)
                      : t.e < D
                        ? (y.c = [(y.e = 0)])
                        : ((y.e = t.e), (y.c = t.c.slice())))
                  )
                if ((g = 'number' == typeof t) && 0 * t == 0) {
                  if (((y.s = 1 / t < 0 ? ((t = -t), -1) : 1), t === ~~t)) {
                    for (l = 0, d = t; d >= 10; d /= 10, l++);
                    return void (l > $ ? (y.c = y.e = null) : ((y.e = l), (y.c = [t])))
                  }
                  w = String(t)
                } else {
                  if (!s.test((w = String(t)))) return a(y, w, g)
                  y.s = 45 == w.charCodeAt(0) ? ((w = w.slice(1)), -1) : 1
                }
                ;(l = w.indexOf('.')) > -1 && (w = w.replace('.', '')),
                  (d = w.search(/e/i)) > 0
                    ? (l < 0 && (l = d), (l += +w.slice(d + 1)), (w = w.substring(0, d)))
                    : l < 0 && (l = w.length)
              } else {
                if ((b(e, 2, H.length, 'Base'), 10 == e && q))
                  return W((y = new F(t)), C + y.e + 1, R)
                if (((w = String(t)), (g = 'number' == typeof t))) {
                  if (0 * t != 0) return a(y, w, g, e)
                  if (
                    ((y.s = 1 / t < 0 ? ((w = w.slice(1)), -1) : 1),
                    F.DEBUG && w.replace(/^0\.0*|\./, '').length > 15)
                  )
                    throw Error(u + t)
                } else y.s = 45 === w.charCodeAt(0) ? ((w = w.slice(1)), -1) : 1
                for (r = H.slice(0, e), l = d = 0, p = w.length; d < p; d++)
                  if (r.indexOf((i = w.charAt(d))) < 0) {
                    if ('.' == i) {
                      if (d > l) {
                        l = p
                        continue
                      }
                    } else if (
                      !c &&
                      ((w == w.toUpperCase() && (w = w.toLowerCase())) ||
                        (w == w.toLowerCase() && (w = w.toUpperCase())))
                    ) {
                      ;(c = !0), (d = -1), (l = 0)
                      continue
                    }
                    return a(y, String(t), g, e)
                  }
                ;(g = !1),
                  (l = (w = n(w, e, 10, y.s)).indexOf('.')) > -1
                    ? (w = w.replace('.', ''))
                    : (l = w.length)
              }
              for (d = 0; 48 === w.charCodeAt(d); d++);
              for (p = w.length; 48 === w.charCodeAt(--p); );
              if ((w = w.slice(d, ++p))) {
                if (((p -= d), g && F.DEBUG && p > 15 && (t > f || t !== o(t))))
                  throw Error(u + y.s * t)
                if ((l = l - d - 1) > $) y.c = y.e = null
                else if (l < D) y.c = [(y.e = 0)]
                else {
                  if (((y.e = l), (y.c = []), (d = (l + 1) % h), l < 0 && (d += h), d < p)) {
                    for (d && y.c.push(+w.slice(0, d)), p -= h; d < p; )
                      y.c.push(+w.slice(d, (d += h)))
                    d = h - (w = w.slice(d)).length
                  } else d -= p
                  for (; d--; w += '0');
                  y.c.push(+w)
                }
              } else y.c = [(y.e = 0)]
            }
            function z(t, e, r, n) {
              var a, s, i, o, c
              if ((null == r ? (r = R) : b(r, 0, 8), !t.c)) return t.toString()
              if (((a = t.c[0]), (i = t.e), null == e))
                (c = y(t.c)),
                  (c = 1 == n || (2 == n && (i <= P || i >= I)) ? T(c, i) : E(c, i, '0'))
              else if (
                ((s = (t = W(new F(t), e, r)).e),
                (o = (c = y(t.c)).length),
                1 == n || (2 == n && (e <= s || s <= P)))
              ) {
                for (; o < e; c += '0', o++);
                c = T(c, s)
              } else if (((e -= i), (c = E(c, s, '0')), s + 1 > o)) {
                if (--e > 0) for (c += '.'; e--; c += '0');
              } else if ((e += s - o) > 0) for (s + 1 == o && (c += '.'); e--; c += '0');
              return t.s < 0 && a ? '-' + c : c
            }
            function G(t, e) {
              for (var r, n, a = 1, s = new F(t[0]); a < t.length; a++)
                (!(n = new F(t[a])).s || (r = m(s, n)) === e || (0 === r && s.s === e)) && (s = n)
              return s
            }
            function J(t, e, r) {
              for (var n = 1, a = e.length; !e[--a]; e.pop());
              for (a = e[0]; a >= 10; a /= 10, n++);
              return (
                (r = n + r * h - 1) > $
                  ? (t.c = t.e = null)
                  : r < D
                    ? (t.c = [(t.e = 0)])
                    : ((t.e = r), (t.c = e)),
                t
              )
            }
            function W(t, e, r, n) {
              var a,
                s,
                c,
                u,
                f,
                g,
                p,
                w = t.c,
                y = d
              if (w) {
                t: {
                  for (a = 1, u = w[0]; u >= 10; u /= 10, a++);
                  if ((s = e - a) < 0)
                    (s += h), (c = e), (f = w[(g = 0)]), (p = o((f / y[a - c - 1]) % 10))
                  else if ((g = i((s + 1) / h)) >= w.length) {
                    if (!n) break t
                    for (; w.length <= g; w.push(0));
                    ;(f = p = 0), (a = 1), (c = (s %= h) - h + 1)
                  } else {
                    for (f = u = w[g], a = 1; u >= 10; u /= 10, a++);
                    p = (c = (s %= h) - h + a) < 0 ? 0 : o((f / y[a - c - 1]) % 10)
                  }
                  if (
                    ((n = n || e < 0 || null != w[g + 1] || (c < 0 ? f : f % y[a - c - 1])),
                    (n =
                      r < 4
                        ? (p || n) && (0 == r || r == (t.s < 0 ? 3 : 2))
                        : p > 5 ||
                          (5 == p &&
                            (4 == r ||
                              n ||
                              (6 == r &&
                                (s > 0 ? (c > 0 ? f / y[a - c] : 0) : w[g - 1]) % 10 & 1) ||
                              r == (t.s < 0 ? 8 : 7)))),
                    e < 1 || !w[0])
                  )
                    return (
                      (w.length = 0),
                      n
                        ? ((e -= t.e + 1), (w[0] = y[(h - (e % h)) % h]), (t.e = -e || 0))
                        : (w[0] = t.e = 0),
                      t
                    )
                  if (
                    (0 == s
                      ? ((w.length = g), (u = 1), g--)
                      : ((w.length = g + 1),
                        (u = y[h - s]),
                        (w[g] = c > 0 ? o((f / y[a - c]) % y[c]) * u : 0)),
                    n)
                  )
                    for (;;) {
                      if (0 == g) {
                        for (s = 1, c = w[0]; c >= 10; c /= 10, s++);
                        for (c = w[0] += u, u = 1; c >= 10; c /= 10, u++);
                        s != u && (t.e++, w[0] == l && (w[0] = 1))
                        break
                      }
                      if (((w[g] += u), w[g] != l)) break
                      ;(w[g--] = 0), (u = 1)
                    }
                  for (s = w.length; 0 === w[--s]; w.pop());
                }
                t.e > $ ? (t.c = t.e = null) : t.e < D && (t.c = [(t.e = 0)])
              }
              return t
            }
            function V(t) {
              var e,
                r = t.e
              return null === r
                ? t.toString()
                : ((e = y(t.c)),
                  (e = r <= P || r >= I ? T(e, r) : E(e, r, '0')),
                  t.s < 0 ? '-' + e : e)
            }
            return (
              (F.clone = t),
              (F.ROUND_UP = 0),
              (F.ROUND_DOWN = 1),
              (F.ROUND_CEIL = 2),
              (F.ROUND_FLOOR = 3),
              (F.ROUND_HALF_UP = 4),
              (F.ROUND_HALF_DOWN = 5),
              (F.ROUND_HALF_EVEN = 6),
              (F.ROUND_HALF_CEIL = 7),
              (F.ROUND_HALF_FLOOR = 8),
              (F.EUCLID = 9),
              (F.config = F.set =
                function (t) {
                  var e, r
                  if (null != t) {
                    if ('object' != typeof t) throw Error(c + 'Object expected: ' + t)
                    if (
                      (t.hasOwnProperty((e = 'DECIMAL_PLACES')) &&
                        (b((r = t[e]), 0, p, e), (C = r)),
                      t.hasOwnProperty((e = 'ROUNDING_MODE')) && (b((r = t[e]), 0, 8, e), (R = r)),
                      t.hasOwnProperty((e = 'EXPONENTIAL_AT')) &&
                        ((r = t[e]) && r.pop
                          ? (b(r[0], -p, 0, e), b(r[1], 0, p, e), (P = r[0]), (I = r[1]))
                          : (b(r, -p, p, e), (P = -(I = r < 0 ? -r : r)))),
                      t.hasOwnProperty((e = 'RANGE')))
                    )
                      if ((r = t[e]) && r.pop)
                        b(r[0], -p, -1, e), b(r[1], 1, p, e), (D = r[0]), ($ = r[1])
                      else {
                        if ((b(r, -p, p, e), !r)) throw Error(c + e + ' cannot be zero: ' + r)
                        D = -($ = r < 0 ? -r : r)
                      }
                    if (t.hasOwnProperty((e = 'CRYPTO'))) {
                      if ((r = t[e]) !== !!r) throw Error(c + e + ' not true or false: ' + r)
                      if (r) {
                        if (
                          'undefined' == typeof crypto ||
                          !crypto ||
                          (!crypto.getRandomValues && !crypto.randomBytes)
                        )
                          throw ((j = !r), Error(c + 'crypto unavailable'))
                        j = r
                      } else j = r
                    }
                    if (
                      (t.hasOwnProperty((e = 'MODULO_MODE')) && (b((r = t[e]), 0, 9, e), (L = r)),
                      t.hasOwnProperty((e = 'POW_PRECISION')) && (b((r = t[e]), 0, p, e), (M = r)),
                      t.hasOwnProperty((e = 'FORMAT')))
                    ) {
                      if ('object' != typeof (r = t[e])) throw Error(c + e + ' not an object: ' + r)
                      K = r
                    }
                    if (t.hasOwnProperty((e = 'ALPHABET'))) {
                      if ('string' != typeof (r = t[e]) || /^.?$|[+\-.\s]|(.).*\1/.test(r))
                        throw Error(c + e + ' invalid: ' + r)
                      ;(q = '0123456789' == r.slice(0, 10)), (H = r)
                    }
                  }
                  return {
                    DECIMAL_PLACES: C,
                    ROUNDING_MODE: R,
                    EXPONENTIAL_AT: [P, I],
                    RANGE: [D, $],
                    CRYPTO: j,
                    MODULO_MODE: L,
                    POW_PRECISION: M,
                    FORMAT: K,
                    ALPHABET: H
                  }
                }),
              (F.isBigNumber = function (t) {
                if (!t || !0 !== t._isBigNumber) return !1
                if (!F.DEBUG) return !0
                var e,
                  r,
                  n = t.c,
                  a = t.e,
                  s = t.s
                t: if ('[object Array]' == {}.toString.call(n)) {
                  if ((1 === s || -1 === s) && a >= -p && a <= p && a === o(a)) {
                    if (0 === n[0]) {
                      if (0 === a && 1 === n.length) return !0
                      break t
                    }
                    if (((e = (a + 1) % h) < 1 && (e += h), String(n[0]).length == e)) {
                      for (e = 0; e < n.length; e++)
                        if ((r = n[e]) < 0 || r >= l || r !== o(r)) break t
                      if (0 !== r) return !0
                    }
                  }
                } else if (null === n && null === a && (null === s || 1 === s || -1 === s))
                  return !0
                throw Error(c + 'Invalid BigNumber: ' + t)
              }),
              (F.maximum = F.max =
                function () {
                  return G(arguments, -1)
                }),
              (F.minimum = F.min =
                function () {
                  return G(arguments, 1)
                }),
              (F.random =
                ((A = 9007199254740992),
                (_ =
                  (Math.random() * A) & 2097151
                    ? function () {
                        return o(Math.random() * A)
                      }
                    : function () {
                        return (
                          8388608 * ((1073741824 * Math.random()) | 0) +
                          ((8388608 * Math.random()) | 0)
                        )
                      }),
                function (t) {
                  var e,
                    r,
                    n,
                    a,
                    s,
                    u = 0,
                    l = [],
                    f = new F(U)
                  if ((null == t ? (t = C) : b(t, 0, p), (a = i(t / h)), j))
                    if (crypto.getRandomValues) {
                      for (e = crypto.getRandomValues(new Uint32Array((a *= 2))); u < a; )
                        (s = 131072 * e[u] + (e[u + 1] >>> 11)) >= 9e15
                          ? ((r = crypto.getRandomValues(new Uint32Array(2))),
                            (e[u] = r[0]),
                            (e[u + 1] = r[1]))
                          : (l.push(s % 1e14), (u += 2))
                      u = a / 2
                    } else {
                      if (!crypto.randomBytes) throw ((j = !1), Error(c + 'crypto unavailable'))
                      for (e = crypto.randomBytes((a *= 7)); u < a; )
                        (s =
                          281474976710656 * (31 & e[u]) +
                          1099511627776 * e[u + 1] +
                          4294967296 * e[u + 2] +
                          16777216 * e[u + 3] +
                          (e[u + 4] << 16) +
                          (e[u + 5] << 8) +
                          e[u + 6]) >= 9e15
                          ? crypto.randomBytes(7).copy(e, u)
                          : (l.push(s % 1e14), (u += 7))
                      u = a / 7
                    }
                  if (!j) for (; u < a; ) (s = _()) < 9e15 && (l[u++] = s % 1e14)
                  for (
                    a = l[--u], t %= h, a && t && ((s = d[h - t]), (l[u] = o(a / s) * s));
                    0 === l[u];
                    l.pop(), u--
                  );
                  if (u < 0) l = [(n = 0)]
                  else {
                    for (n = -1; 0 === l[0]; l.splice(0, 1), n -= h);
                    for (u = 1, s = l[0]; s >= 10; s /= 10, u++);
                    u < h && (n -= h - u)
                  }
                  return (f.e = n), (f.c = l), f
                })),
              (F.sum = function () {
                for (var t = 1, e = arguments, r = new F(e[0]); t < e.length; ) r = r.plus(e[t++])
                return r
              }),
              (n = (function () {
                var t = '0123456789'
                function e(t, e, r, n) {
                  for (var a, s, i = [0], o = 0, c = t.length; o < c; ) {
                    for (s = i.length; s--; i[s] *= e);
                    for (i[0] += n.indexOf(t.charAt(o++)), a = 0; a < i.length; a++)
                      i[a] > r - 1 &&
                        (null == i[a + 1] && (i[a + 1] = 0),
                        (i[a + 1] += (i[a] / r) | 0),
                        (i[a] %= r))
                  }
                  return i.reverse()
                }
                return function (n, a, s, i, o) {
                  var c,
                    u,
                    l,
                    h,
                    f,
                    d,
                    g,
                    p,
                    w = n.indexOf('.'),
                    m = C,
                    b = R
                  for (
                    w >= 0 &&
                      ((h = M),
                      (M = 0),
                      (n = n.replace('.', '')),
                      (d = (p = new F(a)).pow(n.length - w)),
                      (M = h),
                      (p.c = e(E(y(d.c), d.e, '0'), 10, s, t)),
                      (p.e = p.c.length)),
                      l = h = (g = e(n, a, s, o ? ((c = H), t) : ((c = t), H))).length;
                    0 == g[--h];
                    g.pop()
                  );
                  if (!g[0]) return c.charAt(0)
                  if (
                    (w < 0
                      ? --l
                      : ((d.c = g),
                        (d.e = l),
                        (d.s = i),
                        (g = (d = r(d, p, m, b, s)).c),
                        (f = d.r),
                        (l = d.e)),
                    (w = g[(u = l + m + 1)]),
                    (h = s / 2),
                    (f = f || u < 0 || null != g[u + 1]),
                    (f =
                      b < 4
                        ? (null != w || f) && (0 == b || b == (d.s < 0 ? 3 : 2))
                        : w > h ||
                          (w == h &&
                            (4 == b || f || (6 == b && 1 & g[u - 1]) || b == (d.s < 0 ? 8 : 7)))),
                    u < 1 || !g[0])
                  )
                    n = f ? E(c.charAt(1), -m, c.charAt(0)) : c.charAt(0)
                  else {
                    if (((g.length = u), f))
                      for (--s; ++g[--u] > s; ) (g[u] = 0), u || (++l, (g = [1].concat(g)))
                    for (h = g.length; !g[--h]; );
                    for (w = 0, n = ''; w <= h; n += c.charAt(g[w++]));
                    n = E(n, l, c.charAt(0))
                  }
                  return n
                }
              })()),
              (r = (function () {
                function t(t, e, r) {
                  var n,
                    a,
                    s,
                    i,
                    o = 0,
                    c = t.length,
                    u = e % g,
                    l = (e / g) | 0
                  for (t = t.slice(); c--; )
                    (o =
                      (((a =
                        u * (s = t[c] % g) + ((n = l * s + (i = (t[c] / g) | 0) * u) % g) * g + o) /
                        r) |
                        0) +
                      ((n / g) | 0) +
                      l * i),
                      (t[c] = a % r)
                  return o && (t = [o].concat(t)), t
                }
                function e(t, e, r, n) {
                  var a, s
                  if (r != n) s = r > n ? 1 : -1
                  else
                    for (a = s = 0; a < r; a++)
                      if (t[a] != e[a]) {
                        s = t[a] > e[a] ? 1 : -1
                        break
                      }
                  return s
                }
                function r(t, e, r, n) {
                  for (var a = 0; r--; )
                    (t[r] -= a), (a = t[r] < e[r] ? 1 : 0), (t[r] = a * n + t[r] - e[r])
                  for (; !t[0] && t.length > 1; t.splice(0, 1));
                }
                return function (n, a, s, i, c) {
                  var u,
                    f,
                    d,
                    g,
                    p,
                    y,
                    m,
                    b,
                    v,
                    T,
                    E,
                    A,
                    _,
                    S,
                    k,
                    B,
                    O,
                    N = n.s == a.s ? 1 : -1,
                    x = n.c,
                    U = a.c
                  if (!(x && x[0] && U && U[0]))
                    return new F(
                      n.s && a.s && (x ? !U || x[0] != U[0] : U)
                        ? (x && 0 == x[0]) || !U
                          ? 0 * N
                          : N / 0
                        : NaN
                    )
                  for (
                    v = (b = new F(N)).c = [],
                      N = s + (f = n.e - a.e) + 1,
                      c || ((c = l), (f = w(n.e / h) - w(a.e / h)), (N = (N / h) | 0)),
                      d = 0;
                    U[d] == (x[d] || 0);
                    d++
                  );
                  if ((U[d] > (x[d] || 0) && f--, N < 0)) v.push(1), (g = !0)
                  else {
                    for (
                      S = x.length,
                        B = U.length,
                        d = 0,
                        N += 2,
                        (p = o(c / (U[0] + 1))) > 1 &&
                          ((U = t(U, p, c)), (x = t(x, p, c)), (B = U.length), (S = x.length)),
                        _ = B,
                        E = (T = x.slice(0, B)).length;
                      E < B;
                      T[E++] = 0
                    );
                    ;(O = U.slice()), (O = [0].concat(O)), (k = U[0]), U[1] >= c / 2 && k++
                    do {
                      if (((p = 0), (u = e(U, T, B, E)) < 0)) {
                        if (((A = T[0]), B != E && (A = A * c + (T[1] || 0)), (p = o(A / k)) > 1))
                          for (
                            p >= c && (p = c - 1), m = (y = t(U, p, c)).length, E = T.length;
                            1 == e(y, T, m, E);

                          )
                            p--, r(y, B < m ? O : U, m, c), (m = y.length), (u = 1)
                        else 0 == p && (u = p = 1), (m = (y = U.slice()).length)
                        if ((m < E && (y = [0].concat(y)), r(T, y, E, c), (E = T.length), -1 == u))
                          for (; e(U, T, B, E) < 1; ) p++, r(T, B < E ? O : U, E, c), (E = T.length)
                      } else 0 === u && (p++, (T = [0]))
                      ;(v[d++] = p), T[0] ? (T[E++] = x[_] || 0) : ((T = [x[_]]), (E = 1))
                    } while ((_++ < S || null != T[0]) && N--)
                    ;(g = null != T[0]), v[0] || v.splice(0, 1)
                  }
                  if (c == l) {
                    for (d = 1, N = v[0]; N >= 10; N /= 10, d++);
                    W(b, s + (b.e = d + f * h - 1) + 1, i, g)
                  } else (b.e = f), (b.r = +g)
                  return b
                }
              })()),
              (S = /^(-?)0([xbo])(?=\w[\w.]*$)/i),
              (k = /^([^.]+)\.$/),
              (B = /^\.([^.]+)$/),
              (O = /^-?(Infinity|NaN)$/),
              (N = /^\s*\+(?=[\w.])|^\s+|\s+$/g),
              (a = function (t, e, r, n) {
                var a,
                  s = r ? e : e.replace(N, '')
                if (O.test(s)) t.s = isNaN(s) ? null : s < 0 ? -1 : 1
                else {
                  if (
                    !r &&
                    ((s = s.replace(S, function (t, e, r) {
                      return (
                        (a = 'x' == (r = r.toLowerCase()) ? 16 : 'b' == r ? 2 : 8),
                        n && n != a ? t : e
                      )
                    })),
                    n && ((a = n), (s = s.replace(k, '$1').replace(B, '0.$1'))),
                    e != s)
                  )
                    return new F(s, a)
                  if (F.DEBUG) throw Error(c + 'Not a' + (n ? ' base ' + n : '') + ' number: ' + e)
                  t.s = null
                }
                t.c = t.e = null
              }),
              (x.absoluteValue = x.abs =
                function () {
                  var t = new F(this)
                  return t.s < 0 && (t.s = 1), t
                }),
              (x.comparedTo = function (t, e) {
                return m(this, new F(t, e))
              }),
              (x.decimalPlaces = x.dp =
                function (t, e) {
                  var r,
                    n,
                    a,
                    s = this
                  if (null != t)
                    return b(t, 0, p), null == e ? (e = R) : b(e, 0, 8), W(new F(s), t + s.e + 1, e)
                  if (!(r = s.c)) return null
                  if (((n = ((a = r.length - 1) - w(this.e / h)) * h), (a = r[a])))
                    for (; a % 10 == 0; a /= 10, n--);
                  return n < 0 && (n = 0), n
                }),
              (x.dividedBy = x.div =
                function (t, e) {
                  return r(this, new F(t, e), C, R)
                }),
              (x.dividedToIntegerBy = x.idiv =
                function (t, e) {
                  return r(this, new F(t, e), 0, 1)
                }),
              (x.exponentiatedBy = x.pow =
                function (t, e) {
                  var r,
                    n,
                    a,
                    s,
                    u,
                    l,
                    f,
                    d,
                    g = this
                  if ((t = new F(t)).c && !t.isInteger())
                    throw Error(c + 'Exponent not an integer: ' + V(t))
                  if (
                    (null != e && (e = new F(e)),
                    (u = t.e > 14),
                    !g.c || !g.c[0] || (1 == g.c[0] && !g.e && 1 == g.c.length) || !t.c || !t.c[0])
                  )
                    return (
                      (d = new F(Math.pow(+V(g), u ? t.s * (2 - v(t)) : +V(t)))), e ? d.mod(e) : d
                    )
                  if (((l = t.s < 0), e)) {
                    if (e.c ? !e.c[0] : !e.s) return new F(NaN)
                    ;(n = !l && g.isInteger() && e.isInteger()) && (g = g.mod(e))
                  } else {
                    if (
                      t.e > 9 &&
                      (g.e > 0 ||
                        g.e < -1 ||
                        (0 == g.e
                          ? g.c[0] > 1 || (u && g.c[1] >= 24e7)
                          : g.c[0] < 8e13 || (u && g.c[0] <= 9999975e7)))
                    )
                      return (
                        (s = g.s < 0 && v(t) ? -0 : 0),
                        g.e > -1 && (s = 1 / s),
                        new F(l ? 1 / s : s)
                      )
                    M && (s = i(M / h + 2))
                  }
                  for (
                    u
                      ? ((r = new F(0.5)), l && (t.s = 1), (f = v(t)))
                      : (f = (a = Math.abs(+V(t))) % 2),
                      d = new F(U);
                    ;

                  ) {
                    if (f) {
                      if (!(d = d.times(g)).c) break
                      s ? d.c.length > s && (d.c.length = s) : n && (d = d.mod(e))
                    }
                    if (a) {
                      if (0 === (a = o(a / 2))) break
                      f = a % 2
                    } else if ((W((t = t.times(r)), t.e + 1, 1), t.e > 14)) f = v(t)
                    else {
                      if (0 === (a = +V(t))) break
                      f = a % 2
                    }
                    ;(g = g.times(g)),
                      s ? g.c && g.c.length > s && (g.c.length = s) : n && (g = g.mod(e))
                  }
                  return n ? d : (l && (d = U.div(d)), e ? d.mod(e) : s ? W(d, M, R, undefined) : d)
                }),
              (x.integerValue = function (t) {
                var e = new F(this)
                return null == t ? (t = R) : b(t, 0, 8), W(e, e.e + 1, t)
              }),
              (x.isEqualTo = x.eq =
                function (t, e) {
                  return 0 === m(this, new F(t, e))
                }),
              (x.isFinite = function () {
                return !!this.c
              }),
              (x.isGreaterThan = x.gt =
                function (t, e) {
                  return m(this, new F(t, e)) > 0
                }),
              (x.isGreaterThanOrEqualTo = x.gte =
                function (t, e) {
                  return 1 === (e = m(this, new F(t, e))) || 0 === e
                }),
              (x.isInteger = function () {
                return !!this.c && w(this.e / h) > this.c.length - 2
              }),
              (x.isLessThan = x.lt =
                function (t, e) {
                  return m(this, new F(t, e)) < 0
                }),
              (x.isLessThanOrEqualTo = x.lte =
                function (t, e) {
                  return -1 === (e = m(this, new F(t, e))) || 0 === e
                }),
              (x.isNaN = function () {
                return !this.s
              }),
              (x.isNegative = function () {
                return this.s < 0
              }),
              (x.isPositive = function () {
                return this.s > 0
              }),
              (x.isZero = function () {
                return !!this.c && 0 == this.c[0]
              }),
              (x.minus = function (t, e) {
                var r,
                  n,
                  a,
                  s,
                  i = this,
                  o = i.s
                if (((e = (t = new F(t, e)).s), !o || !e)) return new F(NaN)
                if (o != e) return (t.s = -e), i.plus(t)
                var c = i.e / h,
                  u = t.e / h,
                  f = i.c,
                  d = t.c
                if (!c || !u) {
                  if (!f || !d) return f ? ((t.s = -e), t) : new F(d ? i : NaN)
                  if (!f[0] || !d[0])
                    return d[0] ? ((t.s = -e), t) : new F(f[0] ? i : 3 == R ? -0 : 0)
                }
                if (((c = w(c)), (u = w(u)), (f = f.slice()), (o = c - u))) {
                  for (
                    (s = o < 0) ? ((o = -o), (a = f)) : ((u = c), (a = d)), a.reverse(), e = o;
                    e--;
                    a.push(0)
                  );
                  a.reverse()
                } else
                  for (n = (s = (o = f.length) < (e = d.length)) ? o : e, o = e = 0; e < n; e++)
                    if (f[e] != d[e]) {
                      s = f[e] < d[e]
                      break
                    }
                if (
                  (s && ((a = f), (f = d), (d = a), (t.s = -t.s)),
                  (e = (n = d.length) - (r = f.length)) > 0)
                )
                  for (; e--; f[r++] = 0);
                for (e = l - 1; n > o; ) {
                  if (f[--n] < d[n]) {
                    for (r = n; r && !f[--r]; f[r] = e);
                    --f[r], (f[n] += l)
                  }
                  f[n] -= d[n]
                }
                for (; 0 == f[0]; f.splice(0, 1), --u);
                return f[0] ? J(t, f, u) : ((t.s = 3 == R ? -1 : 1), (t.c = [(t.e = 0)]), t)
              }),
              (x.modulo = x.mod =
                function (t, e) {
                  var n,
                    a,
                    s = this
                  return (
                    (t = new F(t, e)),
                    !s.c || !t.s || (t.c && !t.c[0])
                      ? new F(NaN)
                      : !t.c || (s.c && !s.c[0])
                        ? new F(s)
                        : (9 == L
                            ? ((a = t.s), (t.s = 1), (n = r(s, t, 0, 3)), (t.s = a), (n.s *= a))
                            : (n = r(s, t, 0, L)),
                          (t = s.minus(n.times(t))).c[0] || 1 != L || (t.s = s.s),
                          t)
                  )
                }),
              (x.multipliedBy = x.times =
                function (t, e) {
                  var r,
                    n,
                    a,
                    s,
                    i,
                    o,
                    c,
                    u,
                    f,
                    d,
                    p,
                    y,
                    m,
                    b,
                    v,
                    T = this,
                    E = T.c,
                    A = (t = new F(t, e)).c
                  if (!(E && A && E[0] && A[0]))
                    return (
                      !T.s || !t.s || (E && !E[0] && !A) || (A && !A[0] && !E)
                        ? (t.c = t.e = t.s = null)
                        : ((t.s *= T.s), E && A ? ((t.c = [0]), (t.e = 0)) : (t.c = t.e = null)),
                      t
                    )
                  for (
                    n = w(T.e / h) + w(t.e / h),
                      t.s *= T.s,
                      (c = E.length) < (d = A.length) &&
                        ((m = E), (E = A), (A = m), (a = c), (c = d), (d = a)),
                      a = c + d,
                      m = [];
                    a--;
                    m.push(0)
                  );
                  for (b = l, v = g, a = d; --a >= 0; ) {
                    for (r = 0, p = A[a] % v, y = (A[a] / v) | 0, s = a + (i = c); s > a; )
                      (r =
                        (((u =
                          p * (u = E[--i] % v) +
                          ((o = y * u + (f = (E[i] / v) | 0) * p) % v) * v +
                          m[s] +
                          r) /
                          b) |
                          0) +
                        ((o / v) | 0) +
                        y * f),
                        (m[s--] = u % b)
                    m[s] = r
                  }
                  return r ? ++n : m.splice(0, 1), J(t, m, n)
                }),
              (x.negated = function () {
                var t = new F(this)
                return (t.s = -t.s || null), t
              }),
              (x.plus = function (t, e) {
                var r,
                  n = this,
                  a = n.s
                if (((e = (t = new F(t, e)).s), !a || !e)) return new F(NaN)
                if (a != e) return (t.s = -e), n.minus(t)
                var s = n.e / h,
                  i = t.e / h,
                  o = n.c,
                  c = t.c
                if (!s || !i) {
                  if (!o || !c) return new F(a / 0)
                  if (!o[0] || !c[0]) return c[0] ? t : new F(o[0] ? n : 0 * a)
                }
                if (((s = w(s)), (i = w(i)), (o = o.slice()), (a = s - i))) {
                  for (
                    a > 0 ? ((i = s), (r = c)) : ((a = -a), (r = o)), r.reverse();
                    a--;
                    r.push(0)
                  );
                  r.reverse()
                }
                for (
                  (a = o.length) - (e = c.length) < 0 && ((r = c), (c = o), (o = r), (e = a)),
                    a = 0;
                  e;

                )
                  (a = ((o[--e] = o[e] + c[e] + a) / l) | 0), (o[e] = l === o[e] ? 0 : o[e] % l)
                return a && ((o = [a].concat(o)), ++i), J(t, o, i)
              }),
              (x.precision = x.sd =
                function (t, e) {
                  var r,
                    n,
                    a,
                    s = this
                  if (null != t && t !== !!t)
                    return b(t, 1, p), null == e ? (e = R) : b(e, 0, 8), W(new F(s), t, e)
                  if (!(r = s.c)) return null
                  if (((n = (a = r.length - 1) * h + 1), (a = r[a]))) {
                    for (; a % 10 == 0; a /= 10, n--);
                    for (a = r[0]; a >= 10; a /= 10, n++);
                  }
                  return t && s.e + 1 > n && (n = s.e + 1), n
                }),
              (x.shiftedBy = function (t) {
                return b(t, -9007199254740991, f), this.times('1e' + t)
              }),
              (x.squareRoot = x.sqrt =
                function () {
                  var t,
                    e,
                    n,
                    a,
                    s,
                    i = this,
                    o = i.c,
                    c = i.s,
                    u = i.e,
                    l = C + 4,
                    h = new F('0.5')
                  if (1 !== c || !o || !o[0])
                    return new F(!c || (c < 0 && (!o || o[0])) ? NaN : o ? i : 1 / 0)
                  if (
                    (0 == (c = Math.sqrt(+V(i))) || c == 1 / 0
                      ? (((e = y(o)).length + u) % 2 == 0 && (e += '0'),
                        (c = Math.sqrt(+e)),
                        (u = w((u + 1) / 2) - (u < 0 || u % 2)),
                        (n = new F(
                          (e =
                            c == 1 / 0
                              ? '5e' + u
                              : (e = c.toExponential()).slice(0, e.indexOf('e') + 1) + u)
                        )))
                      : (n = new F(c + '')),
                    n.c[0])
                  )
                    for ((c = (u = n.e) + l) < 3 && (c = 0); ; )
                      if (
                        ((s = n),
                        (n = h.times(s.plus(r(i, s, l, 1)))),
                        y(s.c).slice(0, c) === (e = y(n.c)).slice(0, c))
                      ) {
                        if (
                          (n.e < u && --c,
                          '9999' != (e = e.slice(c - 3, c + 1)) && (a || '4999' != e))
                        ) {
                          ;(+e && (+e.slice(1) || '5' != e.charAt(0))) ||
                            (W(n, n.e + C + 2, 1), (t = !n.times(n).eq(i)))
                          break
                        }
                        if (!a && (W(s, s.e + C + 2, 0), s.times(s).eq(i))) {
                          n = s
                          break
                        }
                        ;(l += 4), (c += 4), (a = 1)
                      }
                  return W(n, n.e + C + 1, R, t)
                }),
              (x.toExponential = function (t, e) {
                return null != t && (b(t, 0, p), t++), z(this, t, e, 1)
              }),
              (x.toFixed = function (t, e) {
                return null != t && (b(t, 0, p), (t = t + this.e + 1)), z(this, t, e)
              }),
              (x.toFormat = function (t, e, r) {
                var n,
                  a = this
                if (null == r)
                  null != t && e && 'object' == typeof e
                    ? ((r = e), (e = null))
                    : t && 'object' == typeof t
                      ? ((r = t), (t = e = null))
                      : (r = K)
                else if ('object' != typeof r) throw Error(c + 'Argument not an object: ' + r)
                if (((n = a.toFixed(t, e)), a.c)) {
                  var s,
                    i = n.split('.'),
                    o = +r.groupSize,
                    u = +r.secondaryGroupSize,
                    l = r.groupSeparator || '',
                    h = i[0],
                    f = i[1],
                    d = a.s < 0,
                    g = d ? h.slice(1) : h,
                    p = g.length
                  if ((u && ((s = o), (o = u), (u = s), (p -= s)), o > 0 && p > 0)) {
                    for (s = p % o || o, h = g.substr(0, s); s < p; s += o) h += l + g.substr(s, o)
                    u > 0 && (h += l + g.slice(s)), d && (h = '-' + h)
                  }
                  n = f
                    ? h +
                      (r.decimalSeparator || '') +
                      ((u = +r.fractionGroupSize)
                        ? f.replace(
                            new RegExp('\\d{' + u + '}\\B', 'g'),
                            '$&' + (r.fractionGroupSeparator || '')
                          )
                        : f)
                    : h
                }
                return (r.prefix || '') + n + (r.suffix || '')
              }),
              (x.toFraction = function (t) {
                var e,
                  n,
                  a,
                  s,
                  i,
                  o,
                  u,
                  l,
                  f,
                  g,
                  p,
                  w,
                  m = this,
                  b = m.c
                if (null != t && ((!(u = new F(t)).isInteger() && (u.c || 1 !== u.s)) || u.lt(U)))
                  throw Error(
                    c + 'Argument ' + (u.isInteger() ? 'out of range: ' : 'not an integer: ') + V(u)
                  )
                if (!b) return new F(m)
                for (
                  e = new F(U),
                    f = n = new F(U),
                    a = l = new F(U),
                    w = y(b),
                    i = e.e = w.length - m.e - 1,
                    e.c[0] = d[(o = i % h) < 0 ? h + o : o],
                    t = !t || u.comparedTo(e) > 0 ? (i > 0 ? e : f) : u,
                    o = $,
                    $ = 1 / 0,
                    u = new F(w),
                    l.c[0] = 0;
                  (g = r(u, e, 0, 1)), 1 != (s = n.plus(g.times(a))).comparedTo(t);

                )
                  (n = a),
                    (a = s),
                    (f = l.plus(g.times((s = f)))),
                    (l = s),
                    (e = u.minus(g.times((s = e)))),
                    (u = s)
                return (
                  (s = r(t.minus(n), a, 0, 1)),
                  (l = l.plus(s.times(f))),
                  (n = n.plus(s.times(a))),
                  (l.s = f.s = m.s),
                  (p =
                    r(f, a, (i *= 2), R)
                      .minus(m)
                      .abs()
                      .comparedTo(r(l, n, i, R).minus(m).abs()) < 1
                      ? [f, a]
                      : [l, n]),
                  ($ = o),
                  p
                )
              }),
              (x.toNumber = function () {
                return +V(this)
              }),
              (x.toPrecision = function (t, e) {
                return null != t && b(t, 1, p), z(this, t, e, 2)
              }),
              (x.toString = function (t) {
                var e,
                  r = this,
                  a = r.s,
                  s = r.e
                return (
                  null === s
                    ? a
                      ? ((e = 'Infinity'), a < 0 && (e = '-' + e))
                      : (e = 'NaN')
                    : (null == t
                        ? (e = s <= P || s >= I ? T(y(r.c), s) : E(y(r.c), s, '0'))
                        : 10 === t && q
                          ? (e = E(y((r = W(new F(r), C + s + 1, R)).c), r.e, '0'))
                          : (b(t, 2, H.length, 'Base'), (e = n(E(y(r.c), s, '0'), 10, t, a, !0))),
                      a < 0 && r.c[0] && (e = '-' + e)),
                  e
                )
              }),
              (x.valueOf = x.toJSON =
                function () {
                  return V(this)
                }),
              (x._isBigNumber = !0),
              null != e && F.set(e),
              F
            )
          })()),
            (a.default = a.BigNumber = a),
            void 0 ===
              (n = function () {
                return a
              }.call(e, r, e, t)) || (t.exports = n)
        })()
      },
      685: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        const n = r(594)
        e.default = class {
          BigNum
          constructor() {
            this.BigNum = (t, e) => new (n.BigNumber.clone({ DECIMAL_PLACES: e }))(t)
          }
          winstonToAr(t, { formatted: e = !1, decimals: r = 12, trim: n = !0 } = {}) {
            let a = this.stringToBigNum(t, r).shiftedBy(-12)
            return e ? a.toFormat(r) : a.toFixed(r)
          }
          arToWinston(t, { formatted: e = !1 } = {}) {
            let r = this.stringToBigNum(t).shiftedBy(12)
            return e ? r.toFormat() : r.toFixed(0)
          }
          compare(t, e) {
            let r = this.stringToBigNum(t),
              n = this.stringToBigNum(e)
            return r.comparedTo(n)
          }
          isEqual(t, e) {
            return 0 === this.compare(t, e)
          }
          isLessThan(t, e) {
            let r = this.stringToBigNum(t),
              n = this.stringToBigNum(e)
            return r.isLessThan(n)
          }
          isGreaterThan(t, e) {
            let r = this.stringToBigNum(t),
              n = this.stringToBigNum(e)
            return r.isGreaterThan(n)
          }
          add(t, e) {
            let r = this.stringToBigNum(t)
            this.stringToBigNum(e)
            return r.plus(e).toFixed(0)
          }
          sub(t, e) {
            let r = this.stringToBigNum(t)
            this.stringToBigNum(e)
            return r.minus(e).toFixed(0)
          }
          stringToBigNum(t, e = 12) {
            return this.BigNum(t, e)
          }
        }
      },
      752: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        const n = r(542)
        r(823)
        class a {
          api
          network
          static HASH_ENDPOINT = 'block/hash/'
          static HEIGHT_ENDPOINT = 'block/height/'
          constructor(t, e) {
            ;(this.api = t), (this.network = e)
          }
          async get(t) {
            const e = await this.api.get(`${a.HASH_ENDPOINT}${t}`)
            if (200 === e.status) return e.data
            throw 404 === e.status
              ? new n.default('BLOCK_NOT_FOUND')
              : new Error(`Error while loading block data: ${e}`)
          }
          async getByHeight(t) {
            const e = await this.api.get(`${a.HEIGHT_ENDPOINT}${t}`)
            if (200 === e.status) return e.data
            throw 404 === e.status
              ? new n.default('BLOCK_NOT_FOUND')
              : new Error(`Error while loading block data: ${e}`)
          }
          async getCurrent() {
            const { current: t } = await this.network.getInfo()
            return await this.get(t)
          }
        }
        e.default = a
      },
      520: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        const n = r(542),
          a = r(229)
        e.default = class {
          api
          constructor(t) {
            this.api = t
          }
          async getTransactionOffset(t) {
            const e = await this.api.get(`tx/${t}/offset`)
            if (200 === e.status) return e.data
            throw new Error(`Unable to get transaction offset: ${(0, n.getError)(e)}`)
          }
          async getChunk(t) {
            const e = await this.api.get(`chunk/${t}`)
            if (200 === e.status) return e.data
            throw new Error(`Unable to get chunk: ${(0, n.getError)(e)}`)
          }
          async getChunkData(t) {
            const e = await this.getChunk(t)
            return a.b64UrlToBuffer(e.chunk)
          }
          firstChunkOffset(t) {
            return parseInt(t.offset) - parseInt(t.size) + 1
          }
          async downloadChunkedData(t) {
            const e = await this.getTransactionOffset(t),
              r = parseInt(e.size),
              n = parseInt(e.offset) - r + 1,
              a = new Uint8Array(r)
            let s = 0
            for (; s < r; ) {
              let t
              this.api.config.logging && console.log(`[chunk] ${s}/${r}`)
              try {
                t = await this.getChunkData(n + s)
              } catch (t) {
                console.error(`[chunk] Failed to fetch chunk at offset ${n + s}`),
                  console.error(
                    "[chunk] This could indicate that the chunk wasn't uploaded or hasn't yet seeded properly to a particular gateway/node"
                  )
              }
              if (!t) throw new Error(`Couldn't complete data download at ${s}/${r}`)
              a.set(t, s), (s += t.length)
            }
            return a
          }
        }
      },
      43: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        const n = r(685),
          a = r(32),
          s = r(502),
          i = r(566),
          o = r(223),
          c = r(446),
          u = r(204),
          l = r(229),
          h = r(431),
          f = r(520),
          d = r(752)
        class g {
          api
          wallets
          transactions
          network
          blocks
          ar
          silo
          chunks
          static init
          static crypto = new s.default()
          static utils = l
          constructor(t) {
            ;(this.api = new a.default(t)),
              (this.wallets = new c.default(this.api, g.crypto)),
              (this.chunks = new f.default(this.api)),
              (this.transactions = new o.default(this.api, g.crypto, this.chunks)),
              (this.silo = new h.default(this.api, this.crypto, this.transactions)),
              (this.network = new i.default(this.api)),
              (this.blocks = new d.default(this.api, this.network)),
              (this.ar = new n.default())
          }
          get crypto() {
            return g.crypto
          }
          get utils() {
            return g.utils
          }
          getConfig() {
            return { api: this.api.getConfig(), crypto: null }
          }
          async createTransaction(t, e) {
            const r = {}
            if ((Object.assign(r, t), !(t.data || (t.target && t.quantity))))
              throw new Error(
                "A new Arweave transaction must have a 'data' value, or 'target' and 'quantity' values."
              )
            if (
              (null == t.owner && e && 'use_wallet' !== e && (r.owner = e.n),
              null == t.last_tx && (r.last_tx = await this.transactions.getTransactionAnchor()),
              'string' == typeof t.data && (t.data = l.stringToBuffer(t.data)),
              t.data instanceof ArrayBuffer && (t.data = new Uint8Array(t.data)),
              t.data && !(t.data instanceof Uint8Array))
            )
              throw new Error('Expected data to be a string, Uint8Array or ArrayBuffer')
            if (null == t.reward) {
              const e = t.data ? t.data.byteLength : 0
              r.reward = await this.transactions.getPrice(e, r.target)
            }
            ;(r.data_root = ''),
              (r.data_size = t.data ? t.data.byteLength.toString() : '0'),
              (r.data = t.data || new Uint8Array(0))
            const n = new u.default(r)
            return await n.getSignatureData(), n
          }
          async createSiloTransaction(t, e, r) {
            const n = {}
            if ((Object.assign(n, t), !t.data))
              throw new Error("Silo transactions must have a 'data' value")
            if (!r) throw new Error('No Silo URI specified.')
            if (t.target || t.quantity)
              throw new Error(
                "Silo transactions can only be used for storing data, sending AR to other wallets isn't supported."
              )
            if (null == t.owner) {
              if (!e || !e.n)
                throw new Error(
                  "A new Arweave transaction must either have an 'owner' attribute, or you must provide the jwk parameter."
                )
              n.owner = e.n
            }
            null == t.last_tx && (n.last_tx = await this.transactions.getTransactionAnchor())
            const a = await this.silo.parseUri(r)
            if ('string' == typeof t.data) {
              const e = await this.crypto.encrypt(l.stringToBuffer(t.data), a.getEncryptionKey())
              ;(n.reward = await this.transactions.getPrice(e.byteLength)),
                (n.data = l.bufferTob64Url(e))
            }
            if (t.data instanceof Uint8Array) {
              const e = await this.crypto.encrypt(t.data, a.getEncryptionKey())
              ;(n.reward = await this.transactions.getPrice(e.byteLength)),
                (n.data = l.bufferTob64Url(e))
            }
            const s = new u.default(n)
            return s.addTag('Silo-Name', a.getAccessKey()), s.addTag('Silo-Version', '0.1.0'), s
          }
          arql(t) {
            return this.api.post('/arql', t).then((t) => t.data || [])
          }
        }
        e.default = g
      },
      968: function (t, e, r) {
        'use strict'
        var n =
            (this && this.__createBinding) ||
            (Object.create
              ? function (t, e, r, n) {
                  void 0 === n && (n = r)
                  var a = Object.getOwnPropertyDescriptor(e, r)
                  ;(a && !('get' in a ? !e.__esModule : a.writable || a.configurable)) ||
                    (a = {
                      enumerable: !0,
                      get: function () {
                        return e[r]
                      }
                    }),
                    Object.defineProperty(t, n, a)
                }
              : function (t, e, r, n) {
                  void 0 === n && (n = r), (t[n] = e[r])
                }),
          a =
            (this && this.__exportStar) ||
            function (t, e) {
              for (var r in t)
                'default' === r || Object.prototype.hasOwnProperty.call(e, r) || n(e, t, r)
            }
        Object.defineProperty(e, '__esModule', { value: !0 })
        const s = r(43),
          i = r(70)
        ;(s.default.init = function (t = {}) {
          const e = { host: 'arweave.net', port: 443, protocol: 'https' }
          if ('object' != typeof location || !location.protocol || !location.hostname)
            return new s.default({ ...t, ...e })
          const r = location.protocol.replace(':', ''),
            n = location.hostname,
            a = location.port ? parseInt(location.port) : 'https' == r ? 443 : 80,
            o = (0, i.getDefaultConfig)(r, n),
            c = t.protocol || o.protocol,
            u = t.host || o.host,
            l = t.port || o.port || a
          return new s.default({ ...t, host: u, protocol: c, port: l })
        }),
          'object' == typeof globalThis
            ? (globalThis.Arweave = s.default)
            : 'object' == typeof self && (self.Arweave = s.default),
          a(r(43), e),
          (e.default = s.default)
      },
      32: (t, e) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        e.default = class {
          METHOD_GET = 'GET'
          METHOD_POST = 'POST'
          config
          constructor(t) {
            this.applyConfig(t)
          }
          applyConfig(t) {
            this.config = this.mergeDefaults(t)
          }
          getConfig() {
            return this.config
          }
          mergeDefaults(t) {
            const e = t.protocol || 'http',
              r = t.port || ('https' === e ? 443 : 80)
            return {
              host: t.host || '127.0.0.1',
              protocol: e,
              port: r,
              timeout: t.timeout || 2e4,
              logging: t.logging || !1,
              logger: t.logger || console.log,
              network: t.network
            }
          }
          async get(t, e) {
            return await this.request(t, { ...e, method: this.METHOD_GET })
          }
          async post(t, e, r) {
            const n = new Headers(r?.headers || {})
            return (
              n.get('content-type')?.includes('application/json') ||
                n.append('content-type', 'application/json'),
              n.append('accept', 'application/json, text/plain, */*'),
              await this.request(t, {
                ...r,
                method: this.METHOD_POST,
                body: 'string' != typeof e ? JSON.stringify(e) : e,
                headers: n
              })
            )
          }
          async request(t, e) {
            const n = new Headers(e?.headers || {}),
              a = `${this.config.protocol}://${this.config.host}:${this.config.port}`,
              s = e?.responseType
            delete e?.responseType,
              t.startsWith('/') && (t = t.slice(1)),
              this.config.network && n.append('x-network', this.config.network),
              this.config.logging && this.config.logger(`Requesting: ${a}/${t}`)
            let i = await fetch(`${a}/${t}`, { ...(e || {}), headers: n })
            this.config.logging && this.config.logger(`Response:   ${i.url} - ${i.status}`)
            const o = i.headers.get('content-type'),
              c = o?.match(/charset=([^()<>@,;:\"/[\]?.=\s]*)/i)?.[1],
              u = i,
              l = async () => {
                if (c)
                  try {
                    u.data = new TextDecoder(c).decode(await i.arrayBuffer())
                  } catch (t) {
                    u.data = await i.text()
                  }
                else u.data = await i.text()
              }
            if ('arraybuffer' === s) u.data = await i.arrayBuffer()
            else if ('text' === s) await l()
            else if ('webstream' === s) u.data = r(i.body)
            else
              try {
                let t = await i.clone().json()
                'object' != typeof t ? await l() : (u.data = await i.json()), (t = null)
              } catch {
                await l()
              }
            return u
          }
        }
        const r = (t) => {
            const e = t
            return void 0 === e[Symbol.asyncIterator] && (e[Symbol.asyncIterator] = n(t)), e
          },
          n = function (t) {
            return async function* () {
              const e = t.getReader()
              try {
                for (;;) {
                  const { done: t, value: r } = await e.read()
                  if (t) return
                  yield r
                }
              } finally {
                e.releaseLock()
              }
            }
          }
      },
      502: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        const n = r(229)
        e.default = class {
          keyLength = 4096
          publicExponent = 65537
          hashAlgorithm = 'sha256'
          driver
          constructor() {
            if (!this.detectWebCrypto()) throw new Error('SubtleCrypto not available!')
            this.driver = crypto.subtle
          }
          async generateJWK() {
            let t = await this.driver.generateKey(
                {
                  name: 'RSA-PSS',
                  modulusLength: 4096,
                  publicExponent: new Uint8Array([1, 0, 1]),
                  hash: { name: 'SHA-256' }
                },
                !0,
                ['sign']
              ),
              e = await this.driver.exportKey('jwk', t.privateKey)
            return {
              kty: e.kty,
              e: e.e,
              n: e.n,
              d: e.d,
              p: e.p,
              q: e.q,
              dp: e.dp,
              dq: e.dq,
              qi: e.qi
            }
          }
          async sign(t, e, { saltLength: r } = {}) {
            let n = await this.driver.sign(
              { name: 'RSA-PSS', saltLength: 32 },
              await this.jwkToCryptoKey(t),
              e
            )
            return new Uint8Array(n)
          }
          async hash(t, e = 'SHA-256') {
            let r = await this.driver.digest(e, t)
            return new Uint8Array(r)
          }
          async verify(t, e, r) {
            const n = { kty: 'RSA', e: 'AQAB', n: t },
              a = await this.jwkToPublicCryptoKey(n),
              s = await this.driver.digest('SHA-256', e),
              i = await this.driver.verify({ name: 'RSA-PSS', saltLength: 0 }, a, r, e),
              o = await this.driver.verify({ name: 'RSA-PSS', saltLength: 32 }, a, r, e),
              c = Math.ceil((a.algorithm.modulusLength - 1) / 8) - s.byteLength - 2,
              u = await this.driver.verify({ name: 'RSA-PSS', saltLength: c }, a, r, e),
              l = i || o || u
            if (!l) {
              const t = {
                algorithm: a.algorithm.name,
                modulusLength: a.algorithm.modulusLength,
                keyUsages: a.usages,
                saltLengthsAttempted: `0, 32, ${c}`
              }
              console.warn(
                'Transaction Verification Failed! \n',
                `Details: ${JSON.stringify(t, null, 2)} \n`,
                'N.B. ArweaveJS is only guaranteed to verify txs created using ArweaveJS.'
              )
            }
            return l
          }
          async jwkToCryptoKey(t) {
            return this.driver.importKey(
              'jwk',
              t,
              { name: 'RSA-PSS', hash: { name: 'SHA-256' } },
              !1,
              ['sign']
            )
          }
          async jwkToPublicCryptoKey(t) {
            return this.driver.importKey(
              'jwk',
              t,
              { name: 'RSA-PSS', hash: { name: 'SHA-256' } },
              !1,
              ['verify']
            )
          }
          detectWebCrypto() {
            if ('undefined' == typeof crypto) return !1
            const t = crypto?.subtle
            if (void 0 === t) return !1
            return ['generateKey', 'importKey', 'exportKey', 'digest', 'sign'].every(
              (e) => 'function' == typeof t[e]
            )
          }
          async encrypt(t, e, r) {
            const a = await this.driver.importKey(
                'raw',
                'string' == typeof e ? n.stringToBuffer(e) : e,
                { name: 'PBKDF2', length: 32 },
                !1,
                ['deriveKey']
              ),
              s = await this.driver.deriveKey(
                {
                  name: 'PBKDF2',
                  salt: r ? n.stringToBuffer(r) : n.stringToBuffer('salt'),
                  iterations: 1e5,
                  hash: 'SHA-256'
                },
                a,
                { name: 'AES-CBC', length: 256 },
                !1,
                ['encrypt', 'decrypt']
              ),
              i = new Uint8Array(16)
            crypto.getRandomValues(i)
            const o = await this.driver.encrypt({ name: 'AES-CBC', iv: i }, s, t)
            return n.concatBuffers([i, o])
          }
          async decrypt(t, e, r) {
            const a = await this.driver.importKey(
                'raw',
                'string' == typeof e ? n.stringToBuffer(e) : e,
                { name: 'PBKDF2', length: 32 },
                !1,
                ['deriveKey']
              ),
              s = await this.driver.deriveKey(
                {
                  name: 'PBKDF2',
                  salt: r ? n.stringToBuffer(r) : n.stringToBuffer('salt'),
                  iterations: 1e5,
                  hash: 'SHA-256'
                },
                a,
                { name: 'AES-CBC', length: 256 },
                !1,
                ['encrypt', 'decrypt']
              ),
              i = t.slice(0, 16),
              o = await this.driver.decrypt({ name: 'AES-CBC', iv: i }, s, t.slice(16))
            return n.concatBuffers([o])
          }
        }
      },
      360: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.default = a)
        const n = r(43)
        async function a(t) {
          if (Array.isArray(t)) {
            const e = n.default.utils.concatBuffers([
              n.default.utils.stringToBuffer('list'),
              n.default.utils.stringToBuffer(t.length.toString())
            ])
            return await s(t, await n.default.crypto.hash(e, 'SHA-384'))
          }
          const e = n.default.utils.concatBuffers([
              n.default.utils.stringToBuffer('blob'),
              n.default.utils.stringToBuffer(t.byteLength.toString())
            ]),
            r = n.default.utils.concatBuffers([
              await n.default.crypto.hash(e, 'SHA-384'),
              await n.default.crypto.hash(t, 'SHA-384')
            ])
          return await n.default.crypto.hash(r, 'SHA-384')
        }
        async function s(t, e) {
          if (t.length < 1) return e
          const r = n.default.utils.concatBuffers([e, await a(t[0])]),
            i = await n.default.crypto.hash(r, 'SHA-384')
          return await s(t.slice(1), i)
        }
      },
      542: (t, e) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.getError = function (t) {
            let e = t.data
            if ('string' == typeof t.data)
              try {
                e = JSON.parse(t.data)
              } catch (t) {}
            if (t.data instanceof ArrayBuffer || t.data instanceof Uint8Array)
              try {
                e = JSON.parse(e.toString())
              } catch (t) {}
            return e ? e.error || e : t.statusText || 'unknown'
          })
        class r extends Error {
          type
          response
          constructor(t, e = {}) {
            e.message ? super(e.message) : super(), (this.type = t), (this.response = e.response)
          }
          getType() {
            return this.type
          }
        }
        e.default = r
      },
      280: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.arrayCompare = e.MIN_CHUNK_SIZE = e.MAX_CHUNK_SIZE = void 0),
          (e.chunkData = o),
          (e.generateLeaves = c),
          (e.computeRootHash = async function (t) {
            return (await u(t)).id
          }),
          (e.generateTree = u),
          (e.generateTransactionChunks = async function (t) {
            const e = await o(t),
              r = await c(e),
              n = await l(r),
              a = await h(n),
              s = e.slice(-1)[0]
            s.maxByteRange - s.minByteRange == 0 &&
              (e.splice(e.length - 1, 1), a.splice(a.length - 1, 1))
            return { data_root: n.id, chunks: e, proofs: a }
          }),
          (e.buildLayers = l),
          (e.generateProofs = h),
          (e.arrayFlatten = d),
          (e.intToBuffer = w),
          (e.bufferToInt = y),
          (e.validatePath = async function t(r, n, a, o, c) {
            if (o <= 0) return !1
            if (n >= o) return t(r, 0, o - 1, o, c)
            if (n < 0) return t(r, 0, 0, o, c)
            if (c.length == i + s) {
              const t = c.slice(0, i),
                n = c.slice(t.length, t.length + s),
                u = await p([await p(t), await p(n)])
              return (
                !!(0, e.arrayCompare)(r, u) && {
                  offset: o - 1,
                  leftBound: a,
                  rightBound: o,
                  chunkSize: o - a
                }
              )
            }
            const u = c.slice(0, i),
              l = c.slice(u.length, u.length + i),
              h = c.slice(u.length + l.length, u.length + l.length + s),
              f = y(h),
              d = c.slice(u.length + l.length + h.length),
              g = await p([await p(u), await p(l), await p(h)])
            if ((0, e.arrayCompare)(r, g))
              return n < f
                ? await t(u, n, a, Math.min(o, f), d)
                : await t(l, n, Math.max(a, f), o, d)
            return !1
          }),
          (e.debug = async function t(e, r = '') {
            if (e.byteLength < 1) return r
            const n = e.slice(0, i),
              a = e.slice(n.length, n.length + i),
              o = e.slice(n.length + a.length, n.length + a.length + s),
              c = y(o),
              u = e.slice(n.length + a.length + o.length),
              l = await p([await p(n), await p(a), await p(o)]),
              h = `${r}\n${JSON.stringify(Buffer.from(n))},${JSON.stringify(
                Buffer.from(a)
              )},${c} => ${JSON.stringify(l)}`
            return t(u, h)
          })
        const n = r(43),
          a = r(229)
        ;(e.MAX_CHUNK_SIZE = 262144), (e.MIN_CHUNK_SIZE = 32768)
        const s = 32,
          i = 32
        async function o(t) {
          let r = [],
            a = t,
            s = 0
          for (; a.byteLength >= e.MAX_CHUNK_SIZE; ) {
            let t = e.MAX_CHUNK_SIZE,
              i = a.byteLength - e.MAX_CHUNK_SIZE
            i > 0 && i < e.MIN_CHUNK_SIZE && (t = Math.ceil(a.byteLength / 2))
            const o = a.slice(0, t),
              c = await n.default.crypto.hash(o)
            ;(s += o.byteLength),
              r.push({
                dataHash: c,
                minByteRange: s - o.byteLength,
                maxByteRange: s
              }),
              (a = a.slice(t))
          }
          return (
            r.push({
              dataHash: await n.default.crypto.hash(a),
              minByteRange: s,
              maxByteRange: s + a.byteLength
            }),
            r
          )
        }
        async function c(t) {
          return Promise.all(
            t.map(async ({ dataHash: t, minByteRange: e, maxByteRange: r }) => ({
              type: 'leaf',
              id: await p(await Promise.all([p(t), p(w(r))])),
              dataHash: t,
              minByteRange: e,
              maxByteRange: r
            }))
          )
        }
        async function u(t) {
          return await l(await c(await o(t)))
        }
        async function l(t, e = 0) {
          if (t.length < 2) {
            return t[0]
          }
          const r = []
          for (let e = 0; e < t.length; e += 2) r.push(await g(t[e], t[e + 1]))
          return l(r, e + 1)
        }
        function h(t) {
          const e = f(t)
          return Array.isArray(e) ? d(e) : [e]
        }
        function f(t, e = new Uint8Array(), r = 0) {
          if ('leaf' == t.type)
            return {
              offset: t.maxByteRange - 1,
              proof: (0, a.concatBuffers)([e, t.dataHash, w(t.maxByteRange)])
            }
          if ('branch' == t.type) {
            const n = (0, a.concatBuffers)([e, t.leftChild.id, t.rightChild.id, w(t.byteRange)])
            return [f(t.leftChild, n, r + 1), f(t.rightChild, n, r + 1)]
          }
          throw new Error('Unexpected node type')
        }
        function d(t) {
          const e = []
          return (
            t.forEach((t) => {
              Array.isArray(t) ? e.push(...d(t)) : e.push(t)
            }),
            e
          )
        }
        async function g(t, e) {
          if (!e) return t
          return {
            type: 'branch',
            id: await p([await p(t.id), await p(e.id), await p(w(t.maxByteRange))]),
            byteRange: t.maxByteRange,
            maxByteRange: e.maxByteRange,
            leftChild: t,
            rightChild: e
          }
        }
        async function p(t) {
          return (
            Array.isArray(t) && (t = n.default.utils.concatBuffers(t)),
            new Uint8Array(await n.default.crypto.hash(t))
          )
        }
        function w(t) {
          const e = new Uint8Array(s)
          for (var r = e.length - 1; r >= 0; r--) {
            var n = t % 256
            ;(e[r] = n), (t = (t - n) / 256)
          }
          return e
        }
        function y(t) {
          let e = 0
          for (var r = 0; r < t.length; r++) (e *= 256), (e += t[r])
          return e
        }
        e.arrayCompare = (t, e) => t.every((t, r) => e[r] === t)
      },
      135: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.TransactionUploader = void 0)
        const n = r(204),
          a = r(229),
          s = r(542),
          i = r(280),
          o = [
            'invalid_json',
            'chunk_too_big',
            'data_path_too_big',
            'offset_too_big',
            'data_size_too_big',
            'chunk_proof_ratio_not_attractive',
            'invalid_proof'
          ]
        class c {
          api
          chunkIndex = 0
          txPosted = !1
          transaction
          lastRequestTimeEnd = 0
          totalErrors = 0
          data
          lastResponseStatus = 0
          lastResponseError = ''
          get isComplete() {
            return this.txPosted && this.chunkIndex === this.transaction.chunks.chunks.length
          }
          get totalChunks() {
            return this.transaction.chunks.chunks.length
          }
          get uploadedChunks() {
            return this.chunkIndex
          }
          get pctComplete() {
            return Math.trunc((this.uploadedChunks / this.totalChunks) * 100)
          }
          constructor(t, e) {
            if (((this.api = t), !e.id)) throw new Error('Transaction is not signed')
            if (!e.chunks) throw new Error('Transaction chunks not prepared')
            ;(this.data = e.data),
              (this.transaction = new n.default(Object.assign({}, e, { data: new Uint8Array(0) })))
          }
          async uploadChunk(t) {
            if (this.isComplete) throw new Error('Upload is already complete')
            if (
              ('' !== this.lastResponseError ? this.totalErrors++ : (this.totalErrors = 0),
              100 === this.totalErrors)
            )
              throw new Error(
                `Unable to complete upload: ${this.lastResponseStatus}: ${this.lastResponseError}`
              )
            let e =
              '' === this.lastResponseError
                ? 0
                : Math.max(this.lastRequestTimeEnd + 4e4 - Date.now(), 4e4)
            if (
              (e > 0 &&
                ((e -= e * Math.random() * 0.3), await new Promise((t) => setTimeout(t, e))),
              (this.lastResponseError = ''),
              !this.txPosted)
            )
              return void (await this.postTransaction())
            t && (this.chunkIndex = t)
            const r = this.transaction.getChunk(t || this.chunkIndex, this.data)
            if (
              !(await (0, i.validatePath)(
                this.transaction.chunks.data_root,
                parseInt(r.offset),
                0,
                parseInt(r.data_size),
                a.b64UrlToBuffer(r.data_path)
              ))
            )
              throw new Error(`Unable to validate chunk ${this.chunkIndex}`)
            const n = await this.api
              .post('chunk', this.transaction.getChunk(this.chunkIndex, this.data))
              .catch((t) => (console.error(t.message), { status: -1, data: { error: t.message } }))
            if (
              ((this.lastRequestTimeEnd = Date.now()),
              (this.lastResponseStatus = n.status),
              200 == this.lastResponseStatus)
            )
              this.chunkIndex++
            else if (
              ((this.lastResponseError = (0, s.getError)(n)), o.includes(this.lastResponseError))
            )
              throw new Error(
                `Fatal error uploading chunk ${this.chunkIndex}: ${this.lastResponseError}`
              )
          }
          static async fromSerialized(t, e, r) {
            if (!e || 'number' != typeof e.chunkIndex || 'object' != typeof e.transaction)
              throw new Error('Serialized object does not match expected format.')
            var a = new n.default(e.transaction)
            a.chunks || (await a.prepareChunks(r))
            const s = new c(t, a)
            if (
              ((s.chunkIndex = e.chunkIndex),
              (s.lastRequestTimeEnd = e.lastRequestTimeEnd),
              (s.lastResponseError = e.lastResponseError),
              (s.lastResponseStatus = e.lastResponseStatus),
              (s.txPosted = e.txPosted),
              (s.data = r),
              s.transaction.data_root !== e.transaction.data_root)
            )
              throw new Error("Data mismatch: Uploader doesn't match provided data.")
            return s
          }
          static async fromTransactionId(t, e) {
            const r = await t.get(`tx/${e}`)
            if (200 !== r.status) throw new Error(`Tx ${e} not found: ${r.status}`)
            const n = r.data
            n.data = new Uint8Array(0)
            return {
              txPosted: !0,
              chunkIndex: 0,
              lastResponseError: '',
              lastRequestTimeEnd: 0,
              lastResponseStatus: 0,
              transaction: n
            }
          }
          toJSON() {
            return {
              chunkIndex: this.chunkIndex,
              transaction: this.transaction,
              lastRequestTimeEnd: this.lastRequestTimeEnd,
              lastResponseStatus: this.lastResponseStatus,
              lastResponseError: this.lastResponseError,
              txPosted: this.txPosted
            }
          }
          async postTransaction() {
            if (this.totalChunks <= 1) {
              this.transaction.data = this.data
              const t = await this.api
                .post('tx', this.transaction)
                .catch((t) => (console.error(t), { status: -1, data: { error: t.message } }))
              if (
                ((this.lastRequestTimeEnd = Date.now()),
                (this.lastResponseStatus = t.status),
                (this.transaction.data = new Uint8Array(0)),
                t.status >= 200 && t.status < 300)
              )
                return (this.txPosted = !0), void (this.chunkIndex = 1)
              throw (
                ((this.lastResponseError = (0, s.getError)(t)),
                new Error(`Unable to upload transaction: ${t.status}, ${this.lastResponseError}`))
              )
            }
            const t = await this.api.post('tx', this.transaction)
            if (
              ((this.lastRequestTimeEnd = Date.now()),
              (this.lastResponseStatus = t.status),
              !(t.status >= 200 && t.status < 300))
            )
              throw (
                ((this.lastResponseError = (0, s.getError)(t)),
                new Error(`Unable to upload transaction: ${t.status}, ${this.lastResponseError}`))
              )
            this.txPosted = !0
          }
        }
        e.TransactionUploader = c
      },
      204: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.Tag = void 0)
        const n = r(229),
          a = r(360),
          s = r(280)
        class i {
          get(t, e) {
            if (!Object.getOwnPropertyNames(this).includes(t))
              throw new Error(`Field "${t}" is not a property of the Arweave Transaction class.`)
            if (this[t] instanceof Uint8Array)
              return e && e.decode && e.string
                ? n.bufferToString(this[t])
                : e && e.decode && !e.string
                  ? this[t]
                  : n.bufferTob64Url(this[t])
            if (this[t] instanceof Array) {
              if (void 0 !== e?.decode || void 0 !== e?.string)
                throw (
                  ('tags' === t && console.warn('Did you mean to use \'transaction["tags"]\' ?'),
                  new Error('Cannot decode or stringify an array.'))
                )
              return this[t]
            }
            return e && 1 == e.decode
              ? e && e.string
                ? n.b64UrlToString(this[t])
                : n.b64UrlToBuffer(this[t])
              : this[t]
          }
        }
        class o extends i {
          name
          value
          constructor(t, e, r = !1) {
            super(), (this.name = t), (this.value = e)
          }
        }
        e.Tag = o
        e.default = class extends i {
          format = 2
          id = ''
          last_tx = ''
          owner = ''
          tags = []
          target = ''
          quantity = '0'
          data_size = '0'
          data = new Uint8Array()
          data_root = ''
          reward = '0'
          signature = ''
          chunks
          constructor(t = {}) {
            super(),
              Object.assign(this, t),
              'string' == typeof this.data && (this.data = n.b64UrlToBuffer(this.data)),
              t.tags && (this.tags = t.tags.map((t) => new o(t.name, t.value)))
          }
          addTag(t, e) {
            this.tags.push(new o(n.stringToB64Url(t), n.stringToB64Url(e)))
          }
          toJSON() {
            return {
              format: this.format,
              id: this.id,
              last_tx: this.last_tx,
              owner: this.owner,
              tags: this.tags,
              target: this.target,
              quantity: this.quantity,
              data: n.bufferTob64Url(this.data),
              data_size: this.data_size,
              data_root: this.data_root,
              data_tree: this.data_tree,
              reward: this.reward,
              signature: this.signature
            }
          }
          setOwner(t) {
            this.owner = t
          }
          setSignature({ id: t, owner: e, reward: r, tags: n, signature: a }) {
            ;(this.id = t),
              (this.owner = e),
              r && (this.reward = r),
              n && (this.tags = n),
              (this.signature = a)
          }
          async prepareChunks(t) {
            !this.chunks &&
              t.byteLength > 0 &&
              ((this.chunks = await (0, s.generateTransactionChunks)(t)),
              (this.data_root = n.bufferTob64Url(this.chunks.data_root))),
              this.chunks ||
                0 !== t.byteLength ||
                ((this.chunks = {
                  chunks: [],
                  data_root: new Uint8Array(),
                  proofs: []
                }),
                (this.data_root = ''))
          }
          getChunk(t, e) {
            if (!this.chunks) throw new Error('Chunks have not been prepared')
            const r = this.chunks.proofs[t],
              a = this.chunks.chunks[t]
            return {
              data_root: this.data_root,
              data_size: this.data_size,
              data_path: n.bufferTob64Url(r.proof),
              offset: r.offset.toString(),
              chunk: n.bufferTob64Url(e.slice(a.minByteRange, a.maxByteRange))
            }
          }
          async getSignatureData() {
            switch (this.format) {
              case 1:
                let t = this.tags.reduce(
                  (t, e) =>
                    n.concatBuffers([
                      t,
                      e.get('name', { decode: !0, string: !1 }),
                      e.get('value', { decode: !0, string: !1 })
                    ]),
                  new Uint8Array()
                )
                return n.concatBuffers([
                  this.get('owner', { decode: !0, string: !1 }),
                  this.get('target', { decode: !0, string: !1 }),
                  this.get('data', { decode: !0, string: !1 }),
                  n.stringToBuffer(this.quantity),
                  n.stringToBuffer(this.reward),
                  this.get('last_tx', { decode: !0, string: !1 }),
                  t
                ])
              case 2:
                this.data_root || (await this.prepareChunks(this.data))
                const e = this.tags.map((t) => [
                  t.get('name', { decode: !0, string: !1 }),
                  t.get('value', { decode: !0, string: !1 })
                ])
                return await (0, a.default)([
                  n.stringToBuffer(this.format.toString()),
                  this.get('owner', { decode: !0, string: !1 }),
                  this.get('target', { decode: !0, string: !1 }),
                  n.stringToBuffer(this.quantity),
                  n.stringToBuffer(this.reward),
                  this.get('last_tx', { decode: !0, string: !1 }),
                  e,
                  n.stringToBuffer(this.data_size),
                  this.get('data_root', { decode: !0, string: !1 })
                ])
              default:
                throw new Error(`Unexpected transaction format: ${this.format}`)
            }
          }
        }
      },
      229: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 }),
          (e.concatBuffers = function (t) {
            let e = 0
            for (let r = 0; r < t.length; r++) e += t[r].byteLength
            let r = new Uint8Array(e),
              n = 0
            r.set(new Uint8Array(t[0]), n), (n += t[0].byteLength)
            for (let e = 1; e < t.length; e++)
              r.set(new Uint8Array(t[e]), n), (n += t[e].byteLength)
            return r
          }),
          (e.b64UrlToString = function (t) {
            return a(i(t))
          }),
          (e.bufferToString = a),
          (e.stringToBuffer = s),
          (e.stringToB64Url = function (t) {
            return c(s(t))
          }),
          (e.b64UrlToBuffer = i),
          (e.bufferTob64 = o),
          (e.bufferTob64Url = c),
          (e.b64UrlEncode = u),
          (e.b64UrlDecode = l)
        const n = r(526)
        function a(t) {
          return new TextDecoder('utf-8', { fatal: !0 }).decode(t)
        }
        function s(t) {
          return new TextEncoder().encode(t)
        }
        function i(t) {
          return new Uint8Array(n.toByteArray(l(t)))
        }
        function o(t) {
          return n.fromByteArray(new Uint8Array(t))
        }
        function c(t) {
          return u(o(t))
        }
        function u(t) {
          try {
            return t.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '')
          } catch (t) {
            throw new Error('Failed to encode string', { cause: t })
          }
        }
        function l(t) {
          try {
            let e
            return (
              (e =
                (t = t.replace(/\-/g, '+').replace(/\_/g, '/')).length % 4 == 0
                  ? 0
                  : 4 - (t.length % 4)),
              t.concat('='.repeat(e))
            )
          } catch (t) {
            throw new Error('Failed to decode string', { cause: t })
          }
        }
      },
      70: (t, e) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.getDefaultConfig = void 0)
        e.getDefaultConfig = (t, e) => {
          if (
            ((t, e) => {
              const r = /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/,
                n = e.split('.'),
                a = n[n.length - 1],
                s = ['localhost', '[::1]']
              return s.includes(e) || 'file' == t || s.includes(a) || !!e.match(r) || !!a.match(r)
            })(t, e)
          )
            return { protocol: 'https', host: 'arweave.net', port: 443 }
          if (
            !((t) => {
              const e = '[' === t.charAt(0)
              return (
                !!t.match(
                  /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/
                ) || e
              )
            })(e)
          ) {
            let r = e.split('.')
            if (r.length >= 3) {
              r.shift()
              return { protocol: t, host: r.join('.') }
            }
          }
          return { protocol: t, host: e }
        }
      },
      566: (t, e) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        e.default = class {
          api
          constructor(t) {
            this.api = t
          }
          getInfo() {
            return this.api.get('info').then((t) => t.data)
          }
          getPeers() {
            return this.api.get('peers').then((t) => t.data)
          }
        }
      },
      431: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 }), (e.SiloResource = void 0)
        const n = r(229)
        e.default = class {
          api
          crypto
          transactions
          constructor(t, e, r) {
            ;(this.api = t), (this.crypto = e), (this.transactions = r)
          }
          async get(t) {
            if (!t) throw new Error('No Silo URI specified')
            const e = await this.parseUri(t),
              r = await this.transactions.search('Silo-Name', e.getAccessKey())
            if (0 == r.length) throw new Error(`No data could be found for the Silo URI: ${t}`)
            const n = await this.transactions.get(r[0])
            if (!n) throw new Error(`No data could be found for the Silo URI: ${t}`)
            const a = n.get('data', { decode: !0, string: !1 })
            return this.crypto.decrypt(a, e.getEncryptionKey())
          }
          async readTransactionData(t, e) {
            if (!e) throw new Error('No Silo URI specified')
            const r = await this.parseUri(e),
              n = t.get('data', { decode: !0, string: !1 })
            return this.crypto.decrypt(n, r.getEncryptionKey())
          }
          async parseUri(t) {
            const e = t.match(/^([a-z0-9-_]+)\.([0-9]+)/i)
            if (!e)
              throw new Error(
                "Invalid Silo name, must be a name in the format of [a-z0-9]+.[0-9]+, e.g. 'bubble.7'"
              )
            const r = e[1],
              s = Math.pow(2, parseInt(e[2])),
              i = await this.hash(n.stringToBuffer(r), s),
              o = n.bufferTob64(i.slice(0, 15)),
              c = await this.hash(i.slice(16, 31), 1)
            return new a(t, o, c)
          }
          async hash(t, e) {
            let r = await this.crypto.hash(t)
            for (let t = 0; t < e - 1; t++) r = await this.crypto.hash(r)
            return r
          }
        }
        class a {
          uri
          accessKey
          encryptionKey
          constructor(t, e, r) {
            ;(this.uri = t), (this.accessKey = e), (this.encryptionKey = r)
          }
          getUri() {
            return this.uri
          }
          getAccessKey() {
            return this.accessKey
          }
          getEncryptionKey() {
            return this.encryptionKey
          }
        }
        e.SiloResource = a
      },
      223: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        const n = r(542),
          a = r(204),
          s = r(229),
          i = r(135)
        r(823)
        e.default = class {
          api
          crypto
          chunks
          constructor(t, e, r) {
            ;(this.api = t), (this.crypto = e), (this.chunks = r)
          }
          async getTransactionAnchor() {
            const t = await this.api.get('tx_anchor')
            if (!t.data.match(/^[a-z0-9_-]{43,}/i) || !t.ok)
              throw new Error(
                `Could not getTransactionAnchor. Received: ${t.data}. Status: ${t.status}, ${t.statusText}`
              )
            return t.data
          }
          async getPrice(t, e) {
            let r = e ? `price/${t}/${e}` : `price/${t}`
            const n = await this.api.get(r)
            if (!/^\d+$/.test(n.data) || !n.ok)
              throw new Error(
                `Could not getPrice. Received: ${n.data}. Status: ${n.status}, ${n.statusText}`
              )
            return n.data
          }
          async get(t) {
            const e = await this.api.get(`tx/${t}`)
            if (200 == e.status) {
              const r = parseInt(e.data.data_size)
              if (e.data.format >= 2 && r > 0 && r <= 12582912) {
                const r = await this.getData(t)
                return new a.default({ ...e.data, data: r })
              }
              return new a.default({ ...e.data, format: e.data.format || 1 })
            }
            if (404 == e.status) throw new n.default('TX_NOT_FOUND')
            if (410 == e.status) throw new n.default('TX_FAILED')
            throw new n.default('TX_INVALID')
          }
          fromRaw(t) {
            return new a.default(t)
          }
          async search(t, e) {
            return this.api
              .post('arql', { op: 'equals', expr1: t, expr2: e })
              .then((t) => (t.data ? t.data : []))
          }
          getStatus(t) {
            return this.api
              .get(`tx/${t}/status`)
              .then((t) =>
                200 == t.status
                  ? { status: 200, confirmed: t.data }
                  : { status: t.status, confirmed: null }
              )
          }
          async getData(t, e) {
            let r
            try {
              r = await this.chunks.downloadChunkedData(t)
            } catch (e) {
              console.error(`Error while trying to download chunked data for ${t}`),
                console.error(e)
            }
            if (!r) {
              console.warn(`Falling back to gateway cache for ${t}`)
              try {
                const {
                  data: e,
                  ok: n,
                  status: a,
                  statusText: s
                } = await this.api.get(`/${t}`, { responseType: 'arraybuffer' })
                if (!n)
                  throw new Error('Bad http status code', {
                    cause: { status: a, statusText: s }
                  })
                r = e
              } catch (e) {
                console.error(
                  `Error while trying to download contiguous data from gateway cache for ${t}`
                ),
                  console.error(e)
              }
            }
            if (!r) throw new Error(`${t} data was not found!`)
            return e && e.decode && !e.string
              ? r
              : e && e.decode && e.string
                ? s.bufferToString(r)
                : s.bufferTob64Url(r)
          }
          async sign(t, e, r) {
            const n =
                'object' == typeof e &&
                ((t) => {
                  let e = !0
                  return (
                    ['n', 'e', 'd', 'p', 'q', 'dp', 'dq', 'qi'].map((r) => !(r in t) && (e = !1)), e
                  )
                })(e),
              a = 'object' == typeof arweaveWallet
            if (!n && !a)
              throw new Error('No valid JWK or external wallet found to sign transaction.')
            if (n) {
              t.setOwner(e.n)
              let n = await t.getSignatureData(),
                a = await this.crypto.sign(e, n, r),
                i = await this.crypto.hash(a)
              t.setSignature({
                id: s.bufferTob64Url(i),
                owner: e.n,
                signature: s.bufferTob64Url(a)
              })
            } else {
              if (!a) throw new Error('An error occurred while signing. Check wallet is valid')
              {
                try {
                  ;(await arweaveWallet.getPermissions()).includes('SIGN_TRANSACTION') ||
                    (await arweaveWallet.connect(['SIGN_TRANSACTION']))
                } catch {}
                const e = await arweaveWallet.sign(t, r)
                t.setSignature({
                  id: e.id,
                  owner: e.owner,
                  reward: e.reward,
                  tags: e.tags,
                  signature: e.signature
                })
              }
            }
          }
          async verify(t) {
            const e = await t.getSignatureData(),
              r = t.get('signature', { decode: !0, string: !1 }),
              n = s.bufferTob64Url(await this.crypto.hash(r))
            if (t.id !== n)
              throw new Error(
                "Invalid transaction signature or ID! The transaction ID doesn't match the expected SHA-256 hash of the signature."
              )
            return this.crypto.verify(t.owner, e, r)
          }
          async post(t) {
            if (
              ('string' == typeof t
                ? (t = new a.default(JSON.parse(t)))
                : 'function' == typeof t.readInt32BE
                  ? (t = new a.default(JSON.parse(t.toString())))
                  : 'object' != typeof t || t instanceof a.default || (t = new a.default(t)),
              !(t instanceof a.default))
            )
              throw new Error('Must be Transaction object')
            t.chunks || (await t.prepareChunks(t.data))
            const e = await this.getUploader(t, t.data)
            try {
              for (; !e.isComplete; ) await e.uploadChunk()
            } catch (t) {
              if (e.lastResponseStatus > 0)
                return {
                  status: e.lastResponseStatus,
                  statusText: e.lastResponseError,
                  data: { error: e.lastResponseError }
                }
              throw t
            }
            return { status: 200, statusText: 'OK', data: {} }
          }
          async getUploader(t, e) {
            let r
            if ((e instanceof ArrayBuffer && (e = new Uint8Array(e)), t instanceof a.default)) {
              if ((e || (e = t.data), !(e instanceof Uint8Array)))
                throw new Error('Data format is invalid')
              t.chunks || (await t.prepareChunks(e)),
                (r = new i.TransactionUploader(this.api, t)),
                (r.data && 0 !== r.data.length) || (r.data = e)
            } else {
              if (
                ('string' == typeof t &&
                  (t = await i.TransactionUploader.fromTransactionId(this.api, t)),
                !(e && e instanceof Uint8Array))
              )
                throw new Error('Must provide data when resuming upload')
              r = await i.TransactionUploader.fromSerialized(this.api, t, e)
            }
            return r
          }
          async *upload(t, e) {
            const r = await this.getUploader(t, e)
            for (; !r.isComplete; ) await r.uploadChunk(), yield r
            return r
          }
        }
      },
      446: (t, e, r) => {
        'use strict'
        Object.defineProperty(e, '__esModule', { value: !0 })
        const n = r(229)
        r(823)
        e.default = class {
          api
          crypto
          constructor(t, e) {
            ;(this.api = t), (this.crypto = e)
          }
          getBalance(t) {
            return this.api.get(`wallet/${t}/balance`).then((t) => t.data)
          }
          getLastTransactionID(t) {
            return this.api.get(`wallet/${t}/last_tx`).then((t) => t.data)
          }
          generate() {
            return this.crypto.generateJWK()
          }
          async jwkToAddress(t) {
            return t && 'use_wallet' !== t ? this.getAddress(t) : this.getAddress()
          }
          async getAddress(t) {
            if (t && 'use_wallet' !== t) return this.ownerToAddress(t.n)
            try {
              await arweaveWallet.connect(['ACCESS_ADDRESS'])
            } catch {}
            return arweaveWallet.getActiveAddress()
          }
          async ownerToAddress(t) {
            return n.bufferTob64Url(await this.crypto.hash(n.b64UrlToBuffer(t)))
          }
        }
      }
    },
    e = {}
  function r(n) {
    var a = e[n]
    if (void 0 !== a) return a.exports
    var s = (e[n] = { exports: {} })
    return t[n].call(s.exports, s, s.exports, r), s.exports
  }
  ;(r.d = (t, e) => {
    for (var n in e)
      r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, { enumerable: !0, get: e[n] })
  }),
    (r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e)),
    (r.r = (t) => {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(t, '__esModule', { value: !0 })
    })
  r(968)
})()
