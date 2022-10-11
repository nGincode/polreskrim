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
