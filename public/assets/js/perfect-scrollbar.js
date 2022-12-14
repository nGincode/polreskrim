/*!
 * perfect-scrollbar v1.4.0
 * (c) 2018 Hyunje Jun
 * @license MIT
 */
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define(e)
        : (t.PerfectScrollbar = e());
})(this, function () {
    "use strict";
    function t(t) {
        return getComputedStyle(t);
    }
    function e(t, e) {
        for (var i in e) {
            var r = e[i];
            "number" == typeof r && (r += "px"), (t.style[i] = r);
        }
        return t;
    }
    function i(t) {
        var e = document.createElement("div");
        return (e.className = t), e;
    }
    function r(t, e) {
        if (!v) throw new Error("No element matching method supported");
        return v.call(t, e);
    }
    function l(t) {
        t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t);
    }
    function n(t, e) {
        return Array.prototype.filter.call(t.children, function (t) {
            return r(t, e);
        });
    }
    function o(t, e) {
        var i = t.element.classList,
            r = m.state.scrolling(e);
        i.contains(r) ? clearTimeout(Y[e]) : i.add(r);
    }
    function s(t, e) {
        Y[e] = setTimeout(function () {
            return (
                t.isAlive && t.element.classList.remove(m.state.scrolling(e))
            );
        }, t.settings.scrollingThreshold);
    }
    function a(t, e) {
        o(t, e), s(t, e);
    }
    function c(t) {
        if ("function" == typeof window.CustomEvent) return new CustomEvent(t);
        var e = document.createEvent("CustomEvent");
        return e.initCustomEvent(t, !1, !1, void 0), e;
    }
    function h(t, e, i, r, l) {
        var n = i[0],
            o = i[1],
            s = i[2],
            h = i[3],
            u = i[4],
            d = i[5];
        void 0 === r && (r = !0), void 0 === l && (l = !1);
        var f = t.element;
        (t.reach[h] = null),
            f[s] < 1 && (t.reach[h] = "start"),
            f[s] > t[n] - t[o] - 1 && (t.reach[h] = "end"),
            e &&
                (f.dispatchEvent(c("ps-scroll-" + h)),
                e < 0
                    ? f.dispatchEvent(c("ps-scroll-" + u))
                    : e > 0 && f.dispatchEvent(c("ps-scroll-" + d)),
                r && a(t, h)),
            t.reach[h] &&
                (e || l) &&
                f.dispatchEvent(c("ps-" + h + "-reach-" + t.reach[h]));
    }
    function u(t) {
        return parseInt(t, 10) || 0;
    }
    function d(t) {
        return (
            r(t, "input,[contenteditable]") ||
            r(t, "select,[contenteditable]") ||
            r(t, "textarea,[contenteditable]") ||
            r(t, "button,[contenteditable]")
        );
    }
    function f(e) {
        var i = t(e);
        return (
            u(i.width) +
            u(i.paddingLeft) +
            u(i.paddingRight) +
            u(i.borderLeftWidth) +
            u(i.borderRightWidth)
        );
    }
    function p(t, e) {
        return (
            t.settings.minScrollbarLength &&
                (e = Math.max(e, t.settings.minScrollbarLength)),
            t.settings.maxScrollbarLength &&
                (e = Math.min(e, t.settings.maxScrollbarLength)),
            e
        );
    }
    function b(t, i) {
        var r = { width: i.railXWidth },
            l = Math.floor(t.scrollTop);
        i.isRtl
            ? (r.left =
                  i.negativeScrollAdjustment +
                  t.scrollLeft +
                  i.containerWidth -
                  i.contentWidth)
            : (r.left = t.scrollLeft),
            i.isScrollbarXUsingBottom
                ? (r.bottom = i.scrollbarXBottom - l)
                : (r.top = i.scrollbarXTop + l),
            e(i.scrollbarXRail, r);
        var n = { top: l, height: i.railYHeight };
        i.isScrollbarYUsingRight
            ? i.isRtl
                ? (n.right =
                      i.contentWidth -
                      (i.negativeScrollAdjustment + t.scrollLeft) -
                      i.scrollbarYRight -
                      i.scrollbarYOuterWidth)
                : (n.right = i.scrollbarYRight - t.scrollLeft)
            : i.isRtl
            ? (n.left =
                  i.negativeScrollAdjustment +
                  t.scrollLeft +
                  2 * i.containerWidth -
                  i.contentWidth -
                  i.scrollbarYLeft -
                  i.scrollbarYOuterWidth)
            : (n.left = i.scrollbarYLeft + t.scrollLeft),
            e(i.scrollbarYRail, n),
            e(i.scrollbarX, {
                left: i.scrollbarXLeft,
                width: i.scrollbarXWidth - i.railBorderXWidth,
            }),
            e(i.scrollbarY, {
                top: i.scrollbarYTop,
                height: i.scrollbarYHeight - i.railBorderYWidth,
            });
    }
    function g(t, e) {
        function i(e) {
            (b[d] = g + Y * (e[a] - v)),
                o(t, f),
                R(t),
                e.stopPropagation(),
                e.preventDefault();
        }
        function r() {
            s(t, f),
                t[p].classList.remove(m.state.clicking),
                t.event.unbind(t.ownerDocument, "mousemove", i);
        }
        var l = e[0],
            n = e[1],
            a = e[2],
            c = e[3],
            h = e[4],
            u = e[5],
            d = e[6],
            f = e[7],
            p = e[8],
            b = t.element,
            g = null,
            v = null,
            Y = null;
        t.event.bind(t[h], "mousedown", function (e) {
            (g = b[d]),
                (v = e[a]),
                (Y = (t[n] - t[l]) / (t[c] - t[u])),
                t.event.bind(t.ownerDocument, "mousemove", i),
                t.event.once(t.ownerDocument, "mouseup", r),
                t[p].classList.add(m.state.clicking),
                e.stopPropagation(),
                e.preventDefault();
        });
    }
    var v =
            "undefined" != typeof Element &&
            (Element.prototype.matches ||
                Element.prototype.webkitMatchesSelector ||
                Element.prototype.mozMatchesSelector ||
                Element.prototype.msMatchesSelector),
        m = {
            main: "ps",
            element: {
                thumb: function (t) {
                    return "ps__thumb-" + t;
                },
                rail: function (t) {
                    return "ps__rail-" + t;
                },
                consuming: "ps__child--consume",
            },
            state: {
                focus: "ps--focus",
                clicking: "ps--clicking",
                active: function (t) {
                    return "ps--active-" + t;
                },
                scrolling: function (t) {
                    return "ps--scrolling-" + t;
                },
            },
        },
        Y = { x: null, y: null },
        X = function (t) {
            (this.element = t), (this.handlers = {});
        },
        w = { isEmpty: { configurable: !0 } };
    (X.prototype.bind = function (t, e) {
        void 0 === this.handlers[t] && (this.handlers[t] = []),
            this.handlers[t].push(e),
            this.element.addEventListener(t, e, !1);
    }),
        (X.prototype.unbind = function (t, e) {
            var i = this;
            this.handlers[t] = this.handlers[t].filter(function (r) {
                return (
                    !(!e || r === e) ||
                    (i.element.removeEventListener(t, r, !1), !1)
                );
            });
        }),
        (X.prototype.unbindAll = function () {
            var t = this;
            for (var e in t.handlers) t.unbind(e);
        }),
        (w.isEmpty.get = function () {
            var t = this;
            return Object.keys(this.handlers).every(function (e) {
                return 0 === t.handlers[e].length;
            });
        }),
        Object.defineProperties(X.prototype, w);
    var y = function () {
        this.eventElements = [];
    };
    (y.prototype.eventElement = function (t) {
        var e = this.eventElements.filter(function (e) {
            return e.element === t;
        })[0];
        return e || ((e = new X(t)), this.eventElements.push(e)), e;
    }),
        (y.prototype.bind = function (t, e, i) {
            this.eventElement(t).bind(e, i);
        }),
        (y.prototype.unbind = function (t, e, i) {
            var r = this.eventElement(t);
            r.unbind(e, i),
                r.isEmpty &&
                    this.eventElements.splice(this.eventElements.indexOf(r), 1);
        }),
        (y.prototype.unbindAll = function () {
            this.eventElements.forEach(function (t) {
                return t.unbindAll();
            }),
                (this.eventElements = []);
        }),
        (y.prototype.once = function (t, e, i) {
            var r = this.eventElement(t),
                l = function (t) {
                    r.unbind(e, l), i(t);
                };
            r.bind(e, l);
        });
    var W = function (t, e, i, r, l) {
            void 0 === r && (r = !0), void 0 === l && (l = !1);
            var n;
            if ("top" === e)
                n = [
                    "contentHeight",
                    "containerHeight",
                    "scrollTop",
                    "y",
                    "up",
                    "down",
                ];
            else {
                if ("left" !== e)
                    throw new Error("A proper axis should be provided");
                n = [
                    "contentWidth",
                    "containerWidth",
                    "scrollLeft",
                    "x",
                    "left",
                    "right",
                ];
            }
            h(t, i, n, r, l);
        },
        L = {
            isWebKit:
                "undefined" != typeof document &&
                "WebkitAppearance" in document.documentElement.style,
            supportsTouch:
                "undefined" != typeof window &&
                ("ontouchstart" in window ||
                    (window.DocumentTouch &&
                        document instanceof window.DocumentTouch)),
            supportsIePointer:
                "undefined" != typeof navigator && navigator.msMaxTouchPoints,
            isChrome:
                "undefined" != typeof navigator &&
                /Chrome/i.test(navigator && navigator.userAgent),
        },
        R = function (t) {
            var e = t.element,
                i = Math.floor(e.scrollTop);
            (t.containerWidth = e.clientWidth),
                (t.containerHeight = e.clientHeight),
                (t.contentWidth = e.scrollWidth),
                (t.contentHeight = e.scrollHeight),
                e.contains(t.scrollbarXRail) ||
                    (n(e, m.element.rail("x")).forEach(function (t) {
                        return l(t);
                    }),
                    e.appendChild(t.scrollbarXRail)),
                e.contains(t.scrollbarYRail) ||
                    (n(e, m.element.rail("y")).forEach(function (t) {
                        return l(t);
                    }),
                    e.appendChild(t.scrollbarYRail)),
                !t.settings.suppressScrollX &&
                t.containerWidth + t.settings.scrollXMarginOffset <
                    t.contentWidth
                    ? ((t.scrollbarXActive = !0),
                      (t.railXWidth = t.containerWidth - t.railXMarginWidth),
                      (t.railXRatio = t.containerWidth / t.railXWidth),
                      (t.scrollbarXWidth = p(
                          t,
                          u((t.railXWidth * t.containerWidth) / t.contentWidth)
                      )),
                      (t.scrollbarXLeft = u(
                          ((t.negativeScrollAdjustment + e.scrollLeft) *
                              (t.railXWidth - t.scrollbarXWidth)) /
                              (t.contentWidth - t.containerWidth)
                      )))
                    : (t.scrollbarXActive = !1),
                !t.settings.suppressScrollY &&
                t.containerHeight + t.settings.scrollYMarginOffset <
                    t.contentHeight
                    ? ((t.scrollbarYActive = !0),
                      (t.railYHeight = t.containerHeight - t.railYMarginHeight),
                      (t.railYRatio = t.containerHeight / t.railYHeight),
                      (t.scrollbarYHeight = p(
                          t,
                          u(
                              (t.railYHeight * t.containerHeight) /
                                  t.contentHeight
                          )
                      )),
                      (t.scrollbarYTop = u(
                          (i * (t.railYHeight - t.scrollbarYHeight)) /
                              (t.contentHeight - t.containerHeight)
                      )))
                    : (t.scrollbarYActive = !1),
                t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth &&
                    (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
                t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight &&
                    (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
                b(e, t),
                t.scrollbarXActive
                    ? e.classList.add(m.state.active("x"))
                    : (e.classList.remove(m.state.active("x")),
                      (t.scrollbarXWidth = 0),
                      (t.scrollbarXLeft = 0),
                      (e.scrollLeft = 0)),
                t.scrollbarYActive
                    ? e.classList.add(m.state.active("y"))
                    : (e.classList.remove(m.state.active("y")),
                      (t.scrollbarYHeight = 0),
                      (t.scrollbarYTop = 0),
                      (e.scrollTop = 0));
        },
        T = {
            "click-rail": function (t) {
                t.event.bind(t.scrollbarY, "mousedown", function (t) {
                    return t.stopPropagation();
                }),
                    t.event.bind(t.scrollbarYRail, "mousedown", function (e) {
                        var i =
                            e.pageY -
                                window.pageYOffset -
                                t.scrollbarYRail.getBoundingClientRect().top >
                            t.scrollbarYTop
                                ? 1
                                : -1;
                        (t.element.scrollTop += i * t.containerHeight),
                            R(t),
                            e.stopPropagation();
                    }),
                    t.event.bind(t.scrollbarX, "mousedown", function (t) {
                        return t.stopPropagation();
                    }),
                    t.event.bind(t.scrollbarXRail, "mousedown", function (e) {
                        var i =
                            e.pageX -
                                window.pageXOffset -
                                t.scrollbarXRail.getBoundingClientRect().left >
                            t.scrollbarXLeft
                                ? 1
                                : -1;
                        (t.element.scrollLeft += i * t.containerWidth),
                            R(t),
                            e.stopPropagation();
                    });
            },
            "drag-thumb": function (t) {
                g(t, [
                    "containerWidth",
                    "contentWidth",
                    "pageX",
                    "railXWidth",
                    "scrollbarX",
                    "scrollbarXWidth",
                    "scrollLeft",
                    "x",
                    "scrollbarXRail",
                ]),
                    g(t, [
                        "containerHeight",
                        "contentHeight",
                        "pageY",
                        "railYHeight",
                        "scrollbarY",
                        "scrollbarYHeight",
                        "scrollTop",
                        "y",
                        "scrollbarYRail",
                    ]);
            },
            keyboard: function (t) {
                function e(e, r) {
                    var l = Math.floor(i.scrollTop);
                    if (0 === e) {
                        if (!t.scrollbarYActive) return !1;
                        if (
                            (0 === l && r > 0) ||
                            (l >= t.contentHeight - t.containerHeight && r < 0)
                        )
                            return !t.settings.wheelPropagation;
                    }
                    var n = i.scrollLeft;
                    if (0 === r) {
                        if (!t.scrollbarXActive) return !1;
                        if (
                            (0 === n && e < 0) ||
                            (n >= t.contentWidth - t.containerWidth && e > 0)
                        )
                            return !t.settings.wheelPropagation;
                    }
                    return !0;
                }
                var i = t.element,
                    l = function () {
                        return r(i, ":hover");
                    },
                    n = function () {
                        return (
                            r(t.scrollbarX, ":focus") ||
                            r(t.scrollbarY, ":focus")
                        );
                    };
                t.event.bind(t.ownerDocument, "keydown", function (r) {
                    if (
                        !(
                            (r.isDefaultPrevented && r.isDefaultPrevented()) ||
                            r.defaultPrevented
                        ) &&
                        (l() || n())
                    ) {
                        var o = document.activeElement
                            ? document.activeElement
                            : t.ownerDocument.activeElement;
                        if (o) {
                            if ("IFRAME" === o.tagName)
                                o = o.contentDocument.activeElement;
                            else
                                for (; o.shadowRoot; )
                                    o = o.shadowRoot.activeElement;
                            if (d(o)) return;
                        }
                        var s = 0,
                            a = 0;
                        switch (r.which) {
                            case 37:
                                s = r.metaKey
                                    ? -t.contentWidth
                                    : r.altKey
                                    ? -t.containerWidth
                                    : -30;
                                break;
                            case 38:
                                a = r.metaKey
                                    ? t.contentHeight
                                    : r.altKey
                                    ? t.containerHeight
                                    : 30;
                                break;
                            case 39:
                                s = r.metaKey
                                    ? t.contentWidth
                                    : r.altKey
                                    ? t.containerWidth
                                    : 30;
                                break;
                            case 40:
                                a = r.metaKey
                                    ? -t.contentHeight
                                    : r.altKey
                                    ? -t.containerHeight
                                    : -30;
                                break;
                            case 32:
                                a = r.shiftKey
                                    ? t.containerHeight
                                    : -t.containerHeight;
                                break;
                            case 33:
                                a = t.containerHeight;
                                break;
                            case 34:
                                a = -t.containerHeight;
                                break;
                            case 36:
                                a = t.contentHeight;
                                break;
                            case 35:
                                a = -t.contentHeight;
                                break;
                            default:
                                return;
                        }
                        (t.settings.suppressScrollX && 0 !== s) ||
                            (t.settings.suppressScrollY && 0 !== a) ||
                            ((i.scrollTop -= a),
                            (i.scrollLeft += s),
                            R(t),
                            e(s, a) && r.preventDefault());
                    }
                });
            },
            wheel: function (e) {
                function i(t, i) {
                    var r = Math.floor(o.scrollTop),
                        l = 0 === o.scrollTop,
                        n = r + o.offsetHeight === o.scrollHeight,
                        s = 0 === o.scrollLeft,
                        a = o.scrollLeft + o.offsetWidth === o.scrollWidth;
                    return (
                        !(Math.abs(i) > Math.abs(t) ? l || n : s || a) ||
                        !e.settings.wheelPropagation
                    );
                }
                function r(t) {
                    var e = t.deltaX,
                        i = -1 * t.deltaY;
                    return (
                        (void 0 !== e && void 0 !== i) ||
                            ((e = (-1 * t.wheelDeltaX) / 6),
                            (i = t.wheelDeltaY / 6)),
                        t.deltaMode &&
                            1 === t.deltaMode &&
                            ((e *= 10), (i *= 10)),
                        e !== e && i !== i && ((e = 0), (i = t.wheelDelta)),
                        t.shiftKey ? [-i, -e] : [e, i]
                    );
                }
                function l(e, i, r) {
                    if (!L.isWebKit && o.querySelector("select:focus"))
                        return !0;
                    if (!o.contains(e)) return !1;
                    for (var l = e; l && l !== o; ) {
                        if (l.classList.contains(m.element.consuming))
                            return !0;
                        var n = t(l);
                        if (
                            [n.overflow, n.overflowX, n.overflowY]
                                .join("")
                                .match(/(scroll|auto)/)
                        ) {
                            var s = l.scrollHeight - l.clientHeight;
                            if (
                                s > 0 &&
                                !(
                                    (0 === l.scrollTop && r > 0) ||
                                    (l.scrollTop === s && r < 0)
                                )
                            )
                                return !0;
                            var a = l.scrollWidth - l.clientWidth;
                            if (
                                a > 0 &&
                                !(
                                    (0 === l.scrollLeft && i < 0) ||
                                    (l.scrollLeft === a && i > 0)
                                )
                            )
                                return !0;
                        }
                        l = l.parentNode;
                    }
                    return !1;
                }
                function n(t) {
                    var n = r(t),
                        s = n[0],
                        a = n[1];
                    if (!l(t.target, s, a)) {
                        var c = !1;
                        e.settings.useBothWheelAxes
                            ? e.scrollbarYActive && !e.scrollbarXActive
                                ? (a
                                      ? (o.scrollTop -=
                                            a * e.settings.wheelSpeed)
                                      : (o.scrollTop +=
                                            s * e.settings.wheelSpeed),
                                  (c = !0))
                                : e.scrollbarXActive &&
                                  !e.scrollbarYActive &&
                                  (s
                                      ? (o.scrollLeft +=
                                            s * e.settings.wheelSpeed)
                                      : (o.scrollLeft -=
                                            a * e.settings.wheelSpeed),
                                  (c = !0))
                            : ((o.scrollTop -= a * e.settings.wheelSpeed),
                              (o.scrollLeft += s * e.settings.wheelSpeed)),
                            R(e),
                            (c = c || i(s, a)) &&
                                !t.ctrlKey &&
                                (t.stopPropagation(), t.preventDefault());
                    }
                }
                var o = e.element;
                void 0 !== window.onwheel
                    ? e.event.bind(o, "wheel", n)
                    : void 0 !== window.onmousewheel &&
                      e.event.bind(o, "mousewheel", n);
            },
            touch: function (e) {
                function i(t, i) {
                    var r = Math.floor(h.scrollTop),
                        l = h.scrollLeft,
                        n = Math.abs(t),
                        o = Math.abs(i);
                    if (o > n) {
                        if (
                            (i < 0 &&
                                r === e.contentHeight - e.containerHeight) ||
                            (i > 0 && 0 === r)
                        )
                            return 0 === window.scrollY && i > 0 && L.isChrome;
                    } else if (
                        n > o &&
                        ((t < 0 && l === e.contentWidth - e.containerWidth) ||
                            (t > 0 && 0 === l))
                    )
                        return !0;
                    return !0;
                }
                function r(t, i) {
                    (h.scrollTop -= i), (h.scrollLeft -= t), R(e);
                }
                function l(t) {
                    return t.targetTouches ? t.targetTouches[0] : t;
                }
                function n(t) {
                    return !(
                        (t.pointerType &&
                            "pen" === t.pointerType &&
                            0 === t.buttons) ||
                        ((!t.targetTouches || 1 !== t.targetTouches.length) &&
                            (!t.pointerType ||
                                "mouse" === t.pointerType ||
                                t.pointerType === t.MSPOINTER_TYPE_MOUSE))
                    );
                }
                function o(t) {
                    if (n(t)) {
                        var e = l(t);
                        (u.pageX = e.pageX),
                            (u.pageY = e.pageY),
                            (d = new Date().getTime()),
                            null !== p && clearInterval(p);
                    }
                }
                function s(e, i, r) {
                    if (!h.contains(e)) return !1;
                    for (var l = e; l && l !== h; ) {
                        if (l.classList.contains(m.element.consuming))
                            return !0;
                        var n = t(l);
                        if (
                            [n.overflow, n.overflowX, n.overflowY]
                                .join("")
                                .match(/(scroll|auto)/)
                        ) {
                            var o = l.scrollHeight - l.clientHeight;
                            if (
                                o > 0 &&
                                !(
                                    (0 === l.scrollTop && r > 0) ||
                                    (l.scrollTop === o && r < 0)
                                )
                            )
                                return !0;
                            var s = l.scrollLeft - l.clientWidth;
                            if (
                                s > 0 &&
                                !(
                                    (0 === l.scrollLeft && i < 0) ||
                                    (l.scrollLeft === s && i > 0)
                                )
                            )
                                return !0;
                        }
                        l = l.parentNode;
                    }
                    return !1;
                }
                function a(t) {
                    if (n(t)) {
                        var e = l(t),
                            o = { pageX: e.pageX, pageY: e.pageY },
                            a = o.pageX - u.pageX,
                            c = o.pageY - u.pageY;
                        if (s(t.target, a, c)) return;
                        r(a, c), (u = o);
                        var h = new Date().getTime(),
                            p = h - d;
                        p > 0 && ((f.x = a / p), (f.y = c / p), (d = h)),
                            i(a, c) && t.preventDefault();
                    }
                }
                function c() {
                    e.settings.swipeEasing &&
                        (clearInterval(p),
                        (p = setInterval(function () {
                            e.isInitialized
                                ? clearInterval(p)
                                : f.x || f.y
                                ? Math.abs(f.x) < 0.01 && Math.abs(f.y) < 0.01
                                    ? clearInterval(p)
                                    : (r(30 * f.x, 30 * f.y),
                                      (f.x *= 0.8),
                                      (f.y *= 0.8))
                                : clearInterval(p);
                        }, 10)));
                }
                if (L.supportsTouch || L.supportsIePointer) {
                    var h = e.element,
                        u = {},
                        d = 0,
                        f = {},
                        p = null;
                    L.supportsTouch
                        ? (e.event.bind(h, "touchstart", o),
                          e.event.bind(h, "touchmove", a),
                          e.event.bind(h, "touchend", c))
                        : L.supportsIePointer &&
                          (window.PointerEvent
                              ? (e.event.bind(h, "pointerdown", o),
                                e.event.bind(h, "pointermove", a),
                                e.event.bind(h, "pointerup", c))
                              : window.MSPointerEvent &&
                                (e.event.bind(h, "MSPointerDown", o),
                                e.event.bind(h, "MSPointerMove", a),
                                e.event.bind(h, "MSPointerUp", c)));
                }
            },
        },
        H = function (r, l) {
            var n = this;
            if (
                (void 0 === l && (l = {}),
                "string" == typeof r && (r = document.querySelector(r)),
                !r || !r.nodeName)
            )
                throw new Error(
                    "no element is specified to initialize PerfectScrollbar"
                );
            (this.element = r),
                r.classList.add(m.main),
                (this.settings = {
                    handlers: [
                        "click-rail",
                        "drag-thumb",
                        "keyboard",
                        "wheel",
                        "touch",
                    ],
                    maxScrollbarLength: null,
                    minScrollbarLength: null,
                    scrollingThreshold: 1e3,
                    scrollXMarginOffset: 0,
                    scrollYMarginOffset: 0,
                    suppressScrollX: !1,
                    suppressScrollY: !1,
                    swipeEasing: !0,
                    useBothWheelAxes: !1,
                    wheelPropagation: !0,
                    wheelSpeed: 1,
                });
            for (var o in l) n.settings[o] = l[o];
            (this.containerWidth = null),
                (this.containerHeight = null),
                (this.contentWidth = null),
                (this.contentHeight = null);
            var s = function () {
                    return r.classList.add(m.state.focus);
                },
                a = function () {
                    return r.classList.remove(m.state.focus);
                };
            (this.isRtl = "rtl" === t(r).direction),
                (this.isNegativeScroll = (function () {
                    var t = r.scrollLeft,
                        e = null;
                    return (
                        (r.scrollLeft = -1),
                        (e = r.scrollLeft < 0),
                        (r.scrollLeft = t),
                        e
                    );
                })()),
                (this.negativeScrollAdjustment = this.isNegativeScroll
                    ? r.scrollWidth - r.clientWidth
                    : 0),
                (this.event = new y()),
                (this.ownerDocument = r.ownerDocument || document),
                (this.scrollbarXRail = i(m.element.rail("x"))),
                r.appendChild(this.scrollbarXRail),
                (this.scrollbarX = i(m.element.thumb("x"))),
                this.scrollbarXRail.appendChild(this.scrollbarX),
                this.scrollbarX.setAttribute("tabindex", 0),
                this.event.bind(this.scrollbarX, "focus", s),
                this.event.bind(this.scrollbarX, "blur", a),
                (this.scrollbarXActive = null),
                (this.scrollbarXWidth = null),
                (this.scrollbarXLeft = null);
            var c = t(this.scrollbarXRail);
            (this.scrollbarXBottom = parseInt(c.bottom, 10)),
                isNaN(this.scrollbarXBottom)
                    ? ((this.isScrollbarXUsingBottom = !1),
                      (this.scrollbarXTop = u(c.top)))
                    : (this.isScrollbarXUsingBottom = !0),
                (this.railBorderXWidth =
                    u(c.borderLeftWidth) + u(c.borderRightWidth)),
                e(this.scrollbarXRail, { display: "block" }),
                (this.railXMarginWidth = u(c.marginLeft) + u(c.marginRight)),
                e(this.scrollbarXRail, { display: "" }),
                (this.railXWidth = null),
                (this.railXRatio = null),
                (this.scrollbarYRail = i(m.element.rail("y"))),
                r.appendChild(this.scrollbarYRail),
                (this.scrollbarY = i(m.element.thumb("y"))),
                this.scrollbarYRail.appendChild(this.scrollbarY),
                this.scrollbarY.setAttribute("tabindex", 0),
                this.event.bind(this.scrollbarY, "focus", s),
                this.event.bind(this.scrollbarY, "blur", a),
                (this.scrollbarYActive = null),
                (this.scrollbarYHeight = null),
                (this.scrollbarYTop = null);
            var h = t(this.scrollbarYRail);
            (this.scrollbarYRight = parseInt(h.right, 10)),
                isNaN(this.scrollbarYRight)
                    ? ((this.isScrollbarYUsingRight = !1),
                      (this.scrollbarYLeft = u(h.left)))
                    : (this.isScrollbarYUsingRight = !0),
                (this.scrollbarYOuterWidth = this.isRtl
                    ? f(this.scrollbarY)
                    : null),
                (this.railBorderYWidth =
                    u(h.borderTopWidth) + u(h.borderBottomWidth)),
                e(this.scrollbarYRail, { display: "block" }),
                (this.railYMarginHeight = u(h.marginTop) + u(h.marginBottom)),
                e(this.scrollbarYRail, { display: "" }),
                (this.railYHeight = null),
                (this.railYRatio = null),
                (this.reach = {
                    x:
                        r.scrollLeft <= 0
                            ? "start"
                            : r.scrollLeft >=
                              this.contentWidth - this.containerWidth
                            ? "end"
                            : null,
                    y:
                        r.scrollTop <= 0
                            ? "start"
                            : r.scrollTop >=
                              this.contentHeight - this.containerHeight
                            ? "end"
                            : null,
                }),
                (this.isAlive = !0),
                this.settings.handlers.forEach(function (t) {
                    return T[t](n);
                }),
                (this.lastScrollTop = Math.floor(r.scrollTop)),
                (this.lastScrollLeft = r.scrollLeft),
                this.event.bind(this.element, "scroll", function (t) {
                    return n.onScroll(t);
                }),
                R(this);
        };
    return (
        (H.prototype.update = function () {
            this.isAlive &&
                ((this.negativeScrollAdjustment = this.isNegativeScroll
                    ? this.element.scrollWidth - this.element.clientWidth
                    : 0),
                e(this.scrollbarXRail, { display: "block" }),
                e(this.scrollbarYRail, { display: "block" }),
                (this.railXMarginWidth =
                    u(t(this.scrollbarXRail).marginLeft) +
                    u(t(this.scrollbarXRail).marginRight)),
                (this.railYMarginHeight =
                    u(t(this.scrollbarYRail).marginTop) +
                    u(t(this.scrollbarYRail).marginBottom)),
                e(this.scrollbarXRail, { display: "none" }),
                e(this.scrollbarYRail, { display: "none" }),
                R(this),
                W(this, "top", 0, !1, !0),
                W(this, "left", 0, !1, !0),
                e(this.scrollbarXRail, { display: "" }),
                e(this.scrollbarYRail, { display: "" }));
        }),
        (H.prototype.onScroll = function (t) {
            this.isAlive &&
                (R(this),
                W(this, "top", this.element.scrollTop - this.lastScrollTop),
                W(this, "left", this.element.scrollLeft - this.lastScrollLeft),
                (this.lastScrollTop = Math.floor(this.element.scrollTop)),
                (this.lastScrollLeft = this.element.scrollLeft));
        }),
        (H.prototype.destroy = function () {
            this.isAlive &&
                (this.event.unbindAll(),
                l(this.scrollbarX),
                l(this.scrollbarY),
                l(this.scrollbarXRail),
                l(this.scrollbarYRail),
                this.removePsClasses(),
                (this.element = null),
                (this.scrollbarX = null),
                (this.scrollbarY = null),
                (this.scrollbarXRail = null),
                (this.scrollbarYRail = null),
                (this.isAlive = !1));
        }),
        (H.prototype.removePsClasses = function () {
            this.element.className = this.element.className
                .split(" ")
                .filter(function (t) {
                    return !t.match(/^ps([-_].+|)$/);
                })
                .join(" ");
        }),
        H
    );
});
!(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : (e.AOS = t());
})(this, function () {
    "use strict";
    var e =
            "undefined" != typeof window
                ? window
                : "undefined" != typeof global
                ? global
                : "undefined" != typeof self
                ? self
                : {},
        t = "Expected a function",
        n = NaN,
        o = "[object Symbol]",
        i = /^\s+|\s+$/g,
        a = /^[-+]0x[0-9a-f]+$/i,
        r = /^0b[01]+$/i,
        c = /^0o[0-7]+$/i,
        s = parseInt,
        u = "object" == typeof e && e && e.Object === Object && e,
        d = "object" == typeof self && self && self.Object === Object && self,
        l = u || d || Function("return this")(),
        f = Object.prototype.toString,
        m = Math.max,
        p = Math.min,
        b = function () {
            return l.Date.now();
        };
    function v(e, n, o) {
        var i,
            a,
            r,
            c,
            s,
            u,
            d = 0,
            l = !1,
            f = !1,
            v = !0;
        if ("function" != typeof e) throw new TypeError(t);
        function y(t) {
            var n = i,
                o = a;
            return (i = a = void 0), (d = t), (c = e.apply(o, n));
        }
        function h(e) {
            var t = e - u;
            return void 0 === u || t >= n || t < 0 || (f && e - d >= r);
        }
        function k() {
            var e = b();
            if (h(e)) return x(e);
            s = setTimeout(
                k,
                (function (e) {
                    var t = n - (e - u);
                    return f ? p(t, r - (e - d)) : t;
                })(e)
            );
        }
        function x(e) {
            return (s = void 0), v && i ? y(e) : ((i = a = void 0), c);
        }
        function O() {
            var e = b(),
                t = h(e);
            if (((i = arguments), (a = this), (u = e), t)) {
                if (void 0 === s)
                    return (function (e) {
                        return (d = e), (s = setTimeout(k, n)), l ? y(e) : c;
                    })(u);
                if (f) return (s = setTimeout(k, n)), y(u);
            }
            return void 0 === s && (s = setTimeout(k, n)), c;
        }
        return (
            (n = w(n) || 0),
            g(o) &&
                ((l = !!o.leading),
                (r = (f = "maxWait" in o) ? m(w(o.maxWait) || 0, n) : r),
                (v = "trailing" in o ? !!o.trailing : v)),
            (O.cancel = function () {
                void 0 !== s && clearTimeout(s),
                    (d = 0),
                    (i = u = a = s = void 0);
            }),
            (O.flush = function () {
                return void 0 === s ? c : x(b());
            }),
            O
        );
    }
    function g(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t);
    }
    function w(e) {
        if ("number" == typeof e) return e;
        if (
            (function (e) {
                return (
                    "symbol" == typeof e ||
                    ((function (e) {
                        return !!e && "object" == typeof e;
                    })(e) &&
                        f.call(e) == o)
                );
            })(e)
        )
            return n;
        if (g(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = g(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(i, "");
        var u = r.test(e);
        return u || c.test(e) ? s(e.slice(2), u ? 2 : 8) : a.test(e) ? n : +e;
    }
    var y = function (e, n, o) {
            var i = !0,
                a = !0;
            if ("function" != typeof e) throw new TypeError(t);
            return (
                g(o) &&
                    ((i = "leading" in o ? !!o.leading : i),
                    (a = "trailing" in o ? !!o.trailing : a)),
                v(e, n, { leading: i, maxWait: n, trailing: a })
            );
        },
        h = "Expected a function",
        k = NaN,
        x = "[object Symbol]",
        O = /^\s+|\s+$/g,
        j = /^[-+]0x[0-9a-f]+$/i,
        E = /^0b[01]+$/i,
        N = /^0o[0-7]+$/i,
        z = parseInt,
        C = "object" == typeof e && e && e.Object === Object && e,
        A = "object" == typeof self && self && self.Object === Object && self,
        q = C || A || Function("return this")(),
        L = Object.prototype.toString,
        T = Math.max,
        M = Math.min,
        S = function () {
            return q.Date.now();
        };
    function D(e) {
        var t = typeof e;
        return !!e && ("object" == t || "function" == t);
    }
    function H(e) {
        if ("number" == typeof e) return e;
        if (
            (function (e) {
                return (
                    "symbol" == typeof e ||
                    ((function (e) {
                        return !!e && "object" == typeof e;
                    })(e) &&
                        L.call(e) == x)
                );
            })(e)
        )
            return k;
        if (D(e)) {
            var t = "function" == typeof e.valueOf ? e.valueOf() : e;
            e = D(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = e.replace(O, "");
        var n = E.test(e);
        return n || N.test(e) ? z(e.slice(2), n ? 2 : 8) : j.test(e) ? k : +e;
    }
    var $ = function (e, t, n) {
            var o,
                i,
                a,
                r,
                c,
                s,
                u = 0,
                d = !1,
                l = !1,
                f = !0;
            if ("function" != typeof e) throw new TypeError(h);
            function m(t) {
                var n = o,
                    a = i;
                return (o = i = void 0), (u = t), (r = e.apply(a, n));
            }
            function p(e) {
                var n = e - s;
                return void 0 === s || n >= t || n < 0 || (l && e - u >= a);
            }
            function b() {
                var e = S();
                if (p(e)) return v(e);
                c = setTimeout(
                    b,
                    (function (e) {
                        var n = t - (e - s);
                        return l ? M(n, a - (e - u)) : n;
                    })(e)
                );
            }
            function v(e) {
                return (c = void 0), f && o ? m(e) : ((o = i = void 0), r);
            }
            function g() {
                var e = S(),
                    n = p(e);
                if (((o = arguments), (i = this), (s = e), n)) {
                    if (void 0 === c)
                        return (function (e) {
                            return (
                                (u = e), (c = setTimeout(b, t)), d ? m(e) : r
                            );
                        })(s);
                    if (l) return (c = setTimeout(b, t)), m(s);
                }
                return void 0 === c && (c = setTimeout(b, t)), r;
            }
            return (
                (t = H(t) || 0),
                D(n) &&
                    ((d = !!n.leading),
                    (a = (l = "maxWait" in n) ? T(H(n.maxWait) || 0, t) : a),
                    (f = "trailing" in n ? !!n.trailing : f)),
                (g.cancel = function () {
                    void 0 !== c && clearTimeout(c),
                        (u = 0),
                        (o = s = i = c = void 0);
                }),
                (g.flush = function () {
                    return void 0 === c ? r : v(S());
                }),
                g
            );
        },
        W = function () {};
    function P(e) {
        e &&
            e.forEach(function (e) {
                var t = Array.prototype.slice.call(e.addedNodes),
                    n = Array.prototype.slice.call(e.removedNodes);
                if (
                    (function e(t) {
                        var n = void 0,
                            o = void 0;
                        for (n = 0; n < t.length; n += 1) {
                            if ((o = t[n]).dataset && o.dataset.aos) return !0;
                            if (o.children && e(o.children)) return !0;
                        }
                        return !1;
                    })(t.concat(n))
                )
                    return W();
            });
    }
    function Y() {
        return (
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver
        );
    }
    var _ = {
            isSupported: function () {
                return !!Y();
            },
            ready: function (e, t) {
                var n = window.document,
                    o = new (Y())(P);
                (W = t),
                    o.observe(n.documentElement, {
                        childList: !0,
                        subtree: !0,
                        removedNodes: !0,
                    });
            },
        },
        B = function (e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
        },
        F = (function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var o = t[n];
                    (o.enumerable = o.enumerable || !1),
                        (o.configurable = !0),
                        "value" in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o);
                }
            }
            return function (t, n, o) {
                return n && e(t.prototype, n), o && e(t, o), t;
            };
        })(),
        I =
            Object.assign ||
            function (e) {
                for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var o in n)
                        Object.prototype.hasOwnProperty.call(n, o) &&
                            (e[o] = n[o]);
                }
                return e;
            },
        K =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
        G =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
        J =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,
        Q =
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
    function R() {
        return navigator.userAgent || navigator.vendor || window.opera || "";
    }
    var U = new ((function () {
            function e() {
                B(this, e);
            }
            return (
                F(e, [
                    {
                        key: "phone",
                        value: function () {
                            var e = R();
                            return !(!K.test(e) && !G.test(e.substr(0, 4)));
                        },
                    },
                    {
                        key: "mobile",
                        value: function () {
                            var e = R();
                            return !(!J.test(e) && !Q.test(e.substr(0, 4)));
                        },
                    },
                    {
                        key: "tablet",
                        value: function () {
                            return this.mobile() && !this.phone();
                        },
                    },
                    {
                        key: "ie11",
                        value: function () {
                            return (
                                "-ms-scroll-limit" in
                                    document.documentElement.style &&
                                "-ms-ime-align" in
                                    document.documentElement.style
                            );
                        },
                    },
                ]),
                e
            );
        })())(),
        V = function (e, t) {
            var n = void 0;
            return (
                U.ie11()
                    ? (n = document.createEvent("CustomEvent")).initCustomEvent(
                          e,
                          !0,
                          !0,
                          { detail: t }
                      )
                    : (n = new CustomEvent(e, { detail: t })),
                document.dispatchEvent(n)
            );
        },
        X = function (e) {
            return e.forEach(function (e, t) {
                return (function (e, t) {
                    var n = e.options,
                        o = e.position,
                        i = e.node,
                        a =
                            (e.data,
                            function () {
                                e.animated &&
                                    ((function (e, t) {
                                        t &&
                                            t.forEach(function (t) {
                                                return e.classList.remove(t);
                                            });
                                    })(i, n.animatedClassNames),
                                    V("aos:out", i),
                                    e.options.id &&
                                        V("aos:in:" + e.options.id, i),
                                    (e.animated = !1));
                            });
                    n.mirror && t >= o.out && !n.once
                        ? a()
                        : t >= o.in
                        ? e.animated ||
                          ((function (e, t) {
                              t &&
                                  t.forEach(function (t) {
                                      return e.classList.add(t);
                                  });
                          })(i, n.animatedClassNames),
                          V("aos:in", i),
                          e.options.id && V("aos:in:" + e.options.id, i),
                          (e.animated = !0))
                        : e.animated && !n.once && a();
                })(e, window.pageYOffset);
            });
        },
        Z = function (e) {
            for (
                var t = 0, n = 0;
                e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

            )
                (t += e.offsetLeft - ("BODY" != e.tagName ? e.scrollLeft : 0)),
                    (n +=
                        e.offsetTop - ("BODY" != e.tagName ? e.scrollTop : 0)),
                    (e = e.offsetParent);
            return { top: n, left: t };
        },
        ee = function (e, t, n) {
            var o = e.getAttribute("data-aos-" + t);
            if (void 0 !== o) {
                if ("true" === o) return !0;
                if ("false" === o) return !1;
            }
            return o || n;
        },
        te = function (e, t) {
            return (
                e.forEach(function (e, n) {
                    var o = ee(e.node, "mirror", t.mirror),
                        i = ee(e.node, "once", t.once),
                        a = ee(e.node, "id"),
                        r = t.useClassNames && e.node.getAttribute("data-aos"),
                        c = [t.animatedClassName]
                            .concat(r ? r.split(" ") : [])
                            .filter(function (e) {
                                return "string" == typeof e;
                            });
                    t.initClassName && e.node.classList.add(t.initClassName),
                        (e.position = {
                            in: (function (e, t, n) {
                                var o = window.innerHeight,
                                    i = ee(e, "anchor"),
                                    a = ee(e, "anchor-placement"),
                                    r = Number(ee(e, "offset", a ? 0 : t)),
                                    c = a || n,
                                    s = e;
                                i &&
                                    document.querySelectorAll(i) &&
                                    (s = document.querySelectorAll(i)[0]);
                                var u = Z(s).top - o;
                                switch (c) {
                                    case "top-bottom":
                                        break;
                                    case "center-bottom":
                                        u += s.offsetHeight / 2;
                                        break;
                                    case "bottom-bottom":
                                        u += s.offsetHeight;
                                        break;
                                    case "top-center":
                                        u += o / 2;
                                        break;
                                    case "center-center":
                                        u += o / 2 + s.offsetHeight / 2;
                                        break;
                                    case "bottom-center":
                                        u += o / 2 + s.offsetHeight;
                                        break;
                                    case "top-top":
                                        u += o;
                                        break;
                                    case "bottom-top":
                                        u += o + s.offsetHeight;
                                        break;
                                    case "center-top":
                                        u += o + s.offsetHeight / 2;
                                }
                                return u + r;
                            })(e.node, t.offset, t.anchorPlacement),
                            out:
                                o &&
                                (function (e, t) {
                                    window.innerHeight;
                                    var n = ee(e, "anchor"),
                                        o = ee(e, "offset", t),
                                        i = e;
                                    return (
                                        n &&
                                            document.querySelectorAll(n) &&
                                            (i =
                                                document.querySelectorAll(
                                                    n
                                                )[0]),
                                        Z(i).top + i.offsetHeight - o
                                    );
                                })(e.node, t.offset),
                        }),
                        (e.options = {
                            once: i,
                            mirror: o,
                            animatedClassNames: c,
                            id: a,
                        });
                }),
                e
            );
        },
        ne = function () {
            var e = document.querySelectorAll("[data-aos]");
            return Array.prototype.map.call(e, function (e) {
                return { node: e };
            });
        },
        oe = [],
        ie = !1,
        ae = {
            offset: 120,
            delay: 0,
            easing: "ease",
            duration: 400,
            disable: !1,
            once: !1,
            mirror: !1,
            anchorPlacement: "top-bottom",
            startEvent: "DOMContentLoaded",
            animatedClassName: "aos-animate",
            initClassName: "aos-init",
            useClassNames: !1,
            disableMutationObserver: !1,
            throttleDelay: 99,
            debounceDelay: 50,
        },
        re = function () {
            return document.all && !window.atob;
        },
        ce = function () {
            arguments.length > 0 &&
                void 0 !== arguments[0] &&
                arguments[0] &&
                (ie = !0),
                ie &&
                    ((oe = te(oe, ae)),
                    X(oe),
                    window.addEventListener(
                        "scroll",
                        y(function () {
                            X(oe, ae.once);
                        }, ae.throttleDelay)
                    ));
        },
        se = function () {
            if (((oe = ne()), de(ae.disable) || re())) return ue();
            ce();
        },
        ue = function () {
            oe.forEach(function (e, t) {
                e.node.removeAttribute("data-aos"),
                    e.node.removeAttribute("data-aos-easing"),
                    e.node.removeAttribute("data-aos-duration"),
                    e.node.removeAttribute("data-aos-delay"),
                    ae.initClassName &&
                        e.node.classList.remove(ae.initClassName),
                    ae.animatedClassName &&
                        e.node.classList.remove(ae.animatedClassName);
            });
        },
        de = function (e) {
            return (
                !0 === e ||
                ("mobile" === e && U.mobile()) ||
                ("phone" === e && U.phone()) ||
                ("tablet" === e && U.tablet()) ||
                ("function" == typeof e && !0 === e())
            );
        };
    return {
        init: function (e) {
            return (
                (ae = I(ae, e)),
                (oe = ne()),
                ae.disableMutationObserver ||
                    _.isSupported() ||
                    (console.info(
                        '\n      aos: MutationObserver is not supported on this browser,\n      code mutations observing has been disabled.\n      You may have to call "refreshHard()" by yourself.\n    '
                    ),
                    (ae.disableMutationObserver = !0)),
                ae.disableMutationObserver || _.ready("[data-aos]", se),
                de(ae.disable) || re()
                    ? ue()
                    : (document
                          .querySelector("body")
                          .setAttribute("data-aos-easing", ae.easing),
                      document
                          .querySelector("body")
                          .setAttribute("data-aos-duration", ae.duration),
                      document
                          .querySelector("body")
                          .setAttribute("data-aos-delay", ae.delay),
                      -1 === ["DOMContentLoaded", "load"].indexOf(ae.startEvent)
                          ? document.addEventListener(
                                ae.startEvent,
                                function () {
                                    ce(!0);
                                }
                            )
                          : window.addEventListener("load", function () {
                                ce(!0);
                            }),
                      "DOMContentLoaded" === ae.startEvent &&
                          ["complete", "interactive"].indexOf(
                              document.readyState
                          ) > -1 &&
                          ce(!0),
                      window.addEventListener(
                          "resize",
                          $(ce, ae.debounceDelay, !0)
                      ),
                      window.addEventListener(
                          "orientationchange",
                          $(ce, ae.debounceDelay, !0)
                      ),
                      oe)
            );
        },
        refresh: ce,
        refreshHard: se,
    };
});

/*!
 * metismenu https://github.com/onokumus/metismenu#readme
 * A jQuery menu plugin
 * @version 3.0.3
 * @author Osman Nuri Okumus <onokumus@gmail.com> (https://github.com/onokumus)
 * @license: MIT
 */
!(function (e, n) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = n(require("jquery")))
        : "function" == typeof define && define.amd
        ? define(["jquery"], n)
        : (e.metisMenu = n(e.jQuery));
})(this, function (o) {
    "use strict";
    function a(r) {
        for (var e = 1; e < arguments.length; e++) {
            var a = null != arguments[e] ? arguments[e] : {},
                n = Object.keys(a);
            "function" == typeof Object.getOwnPropertySymbols &&
                (n = n.concat(
                    Object.getOwnPropertySymbols(a).filter(function (e) {
                        return Object.getOwnPropertyDescriptor(a, e).enumerable;
                    })
                )),
                n.forEach(function (e) {
                    var n, t, i;
                    (n = r),
                        (i = a[(t = e)]),
                        t in n
                            ? Object.defineProperty(n, t, {
                                  value: i,
                                  enumerable: !0,
                                  configurable: !0,
                                  writable: !0,
                              })
                            : (n[t] = i);
                });
        }
        return r;
    }
    var s = (function (i) {
            var n = "transitionend",
                r = {
                    TRANSITION_END: "mmTransitionEnd",
                    triggerTransitionEnd: function (e) {
                        i(e).trigger(n);
                    },
                    supportsTransitionEnd: function () {
                        return Boolean(n);
                    },
                };
            function e(e) {
                var n = this,
                    t = !1;
                return (
                    i(this).one(r.TRANSITION_END, function () {
                        t = !0;
                    }),
                    setTimeout(function () {
                        t || r.triggerTransitionEnd(n);
                    }, e),
                    this
                );
            }
            return (
                (i.fn.mmEmulateTransitionEnd = e),
                (i.event.special[r.TRANSITION_END] = {
                    bindType: n,
                    delegateType: n,
                    handle: function (e) {
                        if (i(e.target).is(this))
                            return e.handleObj.handler.apply(this, arguments);
                    },
                }),
                r
            );
        })((o = o && o.hasOwnProperty("default") ? o.default : o)),
        e = "metisMenu",
        g = "metisMenu",
        n = "." + g,
        t = o.fn[e],
        l = {
            toggle: !0,
            preventDefault: !0,
            triggerElement: "a",
            parentTrigger: "li",
            subMenu: "ul",
        },
        u = {
            SHOW: "show" + n,
            SHOWN: "shown" + n,
            HIDE: "hide" + n,
            HIDDEN: "hidden" + n,
            CLICK_DATA_API: "click" + n + ".data-api",
        },
        i = "metismenu",
        f = "mm-active",
        h = "mm-show",
        d = "mm-collapse",
        c = "mm-collapsing",
        r = (function () {
            function r(e, n) {
                (this.element = e),
                    (this.config = a({}, l, n)),
                    (this.transitioning = null),
                    this.init();
            }
            var e = r.prototype;
            return (
                (e.init = function () {
                    var a = this,
                        s = this.config;
                    o(this.element).addClass(i),
                        o(this.element)
                            .find(s.parentTrigger + "." + f)
                            .children(s.triggerElement)
                            .attr("aria-expanded", "true"),
                        o(this.element)
                            .find(s.parentTrigger + "." + f)
                            .parents(s.parentTrigger)
                            .addClass(f),
                        o(this.element)
                            .find(s.parentTrigger + "." + f)
                            .parents(s.parentTrigger)
                            .children(s.triggerElement)
                            .attr("aria-expanded", "true"),
                        o(this.element)
                            .find(s.parentTrigger + "." + f)
                            .has(s.subMenu)
                            .children(s.subMenu)
                            .addClass(d + " " + h),
                        o(this.element)
                            .find(s.parentTrigger)
                            .not("." + f)
                            .has(s.subMenu)
                            .children(s.subMenu)
                            .addClass(d),
                        o(this.element)
                            .find(s.parentTrigger)
                            .has(s.subMenu)
                            .children(s.triggerElement)
                            .on(u.CLICK_DATA_API, function (e) {
                                var n = o(this),
                                    t = n.parent(s.parentTrigger),
                                    i = t
                                        .siblings(s.parentTrigger)
                                        .children(s.triggerElement),
                                    r = t.children(s.subMenu);
                                s.preventDefault && e.preventDefault(),
                                    "true" !== n.attr("aria-disabled") &&
                                        (t.hasClass(f)
                                            ? (n.attr("aria-expanded", "false"),
                                              a.hide(r))
                                            : (a.show(r),
                                              n.attr("aria-expanded", "true"),
                                              s.toggle &&
                                                  i.attr(
                                                      "aria-expanded",
                                                      "false"
                                                  )),
                                        s.onTransitionStart &&
                                            s.onTransitionStart(e));
                            });
                }),
                (e.show = function (e) {
                    var n = this;
                    if (!this.transitioning && !o(e).hasClass(c)) {
                        var t = o(e),
                            i = o.Event(u.SHOW);
                        if ((t.trigger(i), !i.isDefaultPrevented())) {
                            if (
                                (t
                                    .parent(this.config.parentTrigger)
                                    .addClass(f),
                                this.config.toggle)
                            ) {
                                var r = t
                                    .parent(this.config.parentTrigger)
                                    .siblings()
                                    .children(this.config.subMenu + "." + h);
                                this.hide(r);
                            }
                            t.removeClass(d).addClass(c).height(0),
                                this.setTransitioning(!0);
                            t.height(e[0].scrollHeight)
                                .one(s.TRANSITION_END, function () {
                                    n.config &&
                                        n.element &&
                                        (t
                                            .removeClass(c)
                                            .addClass(d + " " + h)
                                            .height(""),
                                        n.setTransitioning(!1),
                                        t.trigger(u.SHOWN));
                                })
                                .mmEmulateTransitionEnd(350);
                        }
                    }
                }),
                (e.hide = function (e) {
                    var n = this;
                    if (!this.transitioning && o(e).hasClass(h)) {
                        var t = o(e),
                            i = o.Event(u.HIDE);
                        if ((t.trigger(i), !i.isDefaultPrevented())) {
                            t.parent(this.config.parentTrigger).removeClass(f),
                                t.height(t.height())[0].offsetHeight,
                                t.addClass(c).removeClass(d).removeClass(h),
                                this.setTransitioning(!0);
                            var r = function () {
                                n.config &&
                                    n.element &&
                                    (n.transitioning &&
                                        n.config.onTransitionEnd &&
                                        n.config.onTransitionEnd(),
                                    n.setTransitioning(!1),
                                    t.trigger(u.HIDDEN),
                                    t.removeClass(c).addClass(d));
                            };
                            0 === t.height() || "none" === t.css("display")
                                ? r()
                                : t
                                      .height(0)
                                      .one(s.TRANSITION_END, r)
                                      .mmEmulateTransitionEnd(350);
                        }
                    }
                }),
                (e.setTransitioning = function (e) {
                    this.transitioning = e;
                }),
                (e.dispose = function () {
                    o.removeData(this.element, g),
                        o(this.element)
                            .find(this.config.parentTrigger)
                            .has(this.config.subMenu)
                            .children(this.config.triggerElement)
                            .off("click"),
                        (this.transitioning = null),
                        (this.config = null),
                        (this.element = null);
                }),
                (r.jQueryInterface = function (i) {
                    return this.each(function () {
                        var e = o(this),
                            n = e.data(g),
                            t = a(
                                {},
                                l,
                                e.data(),
                                "object" == typeof i && i ? i : {}
                            );
                        if (
                            (n || ((n = new r(this, t)), e.data(g, n)),
                            "string" == typeof i)
                        ) {
                            if (void 0 === n[i])
                                throw new Error('No method named "' + i + '"');
                            n[i]();
                        }
                    });
                }),
                r
            );
        })();
    return (
        (o.fn[e] = r.jQueryInterface),
        (o.fn[e].Constructor = r),
        (o.fn[e].noConflict = function () {
            return (o.fn[e] = t), r.jQueryInterface;
        }),
        r
    );
});
