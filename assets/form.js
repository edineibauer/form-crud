if (typeof loadMaskPlugin !== 'function') {
    function loadMaskPlugin() {

        var $jscomp = {
            scope: {}, findInternal: function (a, l, d) {
                a instanceof String && (a = String(a));
                for (var p = a.length, h = 0; h < p; h++) {
                    var b = a[h];
                    if (l.call(d, b, h, a)) return {i: h, v: b}
                }
                return {i: -1, v: void 0}
            }
        };
        $jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, l, d) {
            if (d.get || d.set) throw new TypeError("ES3 does not support getters and setters.");
            a != Array.prototype && a != Object.prototype && (a[l] = d.value)
        };
        $jscomp.getGlobal = function (a) {
            return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
        };
        $jscomp.global = $jscomp.getGlobal(this);
        $jscomp.polyfill = function (a, l, d, p) {
            if (l) {
                d = $jscomp.global;
                a = a.split(".");
                for (p = 0; p < a.length - 1; p++) {
                    var h = a[p];
                    h in d || (d[h] = {});
                    d = d[h]
                }
                a = a[a.length - 1];
                p = d[a];
                l = l(p);
                l != p && null != l && $jscomp.defineProperty(d, a, {configurable: !0, writable: !0, value: l})
            }
        };
        $jscomp.polyfill("Array.prototype.find", function (a) {
            return a ? a : function (a, d) {
                return $jscomp.findInternal(this, a, d).v
            }
        }, "es6-impl", "es3");
        (function (a, l, d) {
            "function" === typeof define && define.amd ? define(["jquery"], a) : "object" === typeof exports ? module.exports = a(require("jquery")) : a(l || d)
        })(function (a) {
            var l = function (b, e, f) {
                var c = {
                    invalid: [], getCaret: function () {
                        try {
                            var a, r = 0, g = b.get(0), e = document.selection, f = g.selectionStart;
                            if (e && -1 === navigator.appVersion.indexOf("MSIE 10")) a = e.createRange(), a.moveStart("character", -c.val().length), r = a.text.length; else if (f || "0" === f) r = f;
                            return r
                        } catch (C) {
                        }
                    }, setCaret: function (a) {
                        try {
                            if (b.is(":focus")) {
                                var c,
                                    g = b.get(0);
                                g.setSelectionRange ? g.setSelectionRange(a, a) : (c = g.createTextRange(), c.collapse(!0), c.moveEnd("character", a), c.moveStart("character", a), c.select())
                            }
                        } catch (B) {
                        }
                    }, events: function () {
                        b.on("keydown.mask", function (a) {
                            b.data("mask-keycode", a.keyCode || a.which);
                            b.data("mask-previus-value", b.val());
                            b.data("mask-previus-caret-pos", c.getCaret());
                            c.maskDigitPosMapOld = c.maskDigitPosMap
                        }).on(a.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", c.behaviour).on("paste.mask drop.mask", function () {
                            setTimeout(function () {
                                    b.keydown().keyup()
                                },
                                100)
                        }).on("change.mask", function () {
                            b.data("changed", !0)
                        }).on("blur.mask", function () {
                            d === c.val() || b.data("changed") || b.trigger("change");
                            b.data("changed", !1)
                        }).on("blur.mask", function () {
                            d = c.val()
                        }).on("focus.mask", function (b) {
                            !0 === f.selectOnFocus && a(b.target).select()
                        }).on("focusout.mask", function () {
                            f.clearIfNotMatch && !h.test(c.val()) && c.val("")
                        })
                    }, getRegexMask: function () {
                        for (var a = [], b, c, f, n, d = 0; d < e.length; d++) (b = m.translation[e.charAt(d)]) ? (c = b.pattern.toString().replace(/.{1}$|^.{1}/g, ""), f = b.optional,
                            (b = b.recursive) ? (a.push(e.charAt(d)), n = {
                                digit: e.charAt(d),
                                pattern: c
                            }) : a.push(f || b ? c + "?" : c)) : a.push(e.charAt(d).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                        a = a.join("");
                        n && (a = a.replace(new RegExp("(" + n.digit + "(.*" + n.digit + ")?)"), "($1)?").replace(new RegExp(n.digit, "g"), n.pattern));
                        return new RegExp(a)
                    }, destroyEvents: function () {
                        b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))
                    }, val: function (a) {
                        var c = b.is("input") ? "val" : "text";
                        if (0 < arguments.length) {
                            if (b[c]() !== a) b[c](a);
                            c = b
                        } else c = b[c]();
                        return c
                    }, calculateCaretPosition: function () {
                        var a = b.data("mask-previus-value") || "", e = c.getMasked(), g = c.getCaret();
                        if (a !== e) {
                            var f = b.data("mask-previus-caret-pos") || 0, e = e.length, d = a.length, m = a = 0, h = 0,
                                l = 0,
                                k;
                            for (k = g; k < e && c.maskDigitPosMap[k]; k++) m++;
                            for (k = g - 1; 0 <= k && c.maskDigitPosMap[k]; k--) a++;
                            for (k = g - 1; 0 <= k; k--) c.maskDigitPosMap[k] && h++;
                            for (k = f - 1; 0 <= k; k--) c.maskDigitPosMapOld[k] && l++;
                            g > d ? g = 10 * e : f >= g && f !== d ? c.maskDigitPosMapOld[g] || (f = g, g = g - (l - h) - a, c.maskDigitPosMap[g] && (g = f)) : g > f &&
                                (g = g + (h - l) + m)
                        }
                        return g
                    }, behaviour: function (f) {
                        f = f || window.event;
                        c.invalid = [];
                        var e = b.data("mask-keycode");
                        if (-1 === a.inArray(e, m.byPassKeys)) {
                            var e = c.getMasked(), g = c.getCaret();
                            setTimeout(function () {
                                c.setCaret(c.calculateCaretPosition())
                            }, 10);
                            c.val(e);
                            c.setCaret(g);
                            return c.callbacks(f)
                        }
                    }, getMasked: function (a, b) {
                        var g = [], d = void 0 === b ? c.val() : b + "", n = 0, h = e.length, q = 0, l = d.length,
                            k = 1,
                            r = "push", p = -1, t = 0, y = [], v, z;
                        f.reverse ? (r = "unshift", k = -1, v = 0, n = h - 1, q = l - 1, z = function () {
                            return -1 < n && -1 < q
                        }) : (v = h - 1, z = function () {
                            return n <
                                h && q < l
                        });
                        for (var A; z();) {
                            var x = e.charAt(n), w = d.charAt(q), u = m.translation[x];
                            if (u) w.match(u.pattern) ? (g[r](w), u.recursive && (-1 === p ? p = n : n === v && n !== p && (n = p - k), v === p && (n -= k)), n += k) : w === A ? (t--, A = void 0) : u.optional ? (n += k, q -= k) : u.fallback ? (g[r](u.fallback), n += k, q -= k) : c.invalid.push({
                                p: q,
                                v: w,
                                e: u.pattern
                            }), q += k; else {
                                if (!a) g[r](x);
                                w === x ? (y.push(q), q += k) : (A = x, y.push(q + t), t++);
                                n += k
                            }
                        }
                        d = e.charAt(v);
                        h !== l + 1 || m.translation[d] || g.push(d);
                        g = g.join("");
                        c.mapMaskdigitPositions(g, y, l);
                        return g
                    }, mapMaskdigitPositions: function (a,
                                                        b, e) {
                        a = f.reverse ? a.length - e : 0;
                        c.maskDigitPosMap = {};
                        for (e = 0; e < b.length; e++) c.maskDigitPosMap[b[e] + a] = 1
                    }, callbacks: function (a) {
                        var h = c.val(), g = h !== d, m = [h, a, b, f], q = function (a, b, c) {
                            "function" === typeof f[a] && b && f[a].apply(this, c)
                        };
                        q("onChange", !0 === g, m);
                        q("onKeyPress", !0 === g, m);
                        q("onComplete", h.length === e.length, m);
                        q("onInvalid", 0 < c.invalid.length, [h, a, b, c.invalid, f])
                    }
                };
                b = a(b);
                var m = this, d = c.val(), h;
                e = "function" === typeof e ? e(c.val(), void 0, b, f) : e;
                m.mask = e;
                m.options = f;
                m.remove = function () {
                    var a = c.getCaret();
                    c.destroyEvents();
                    c.val(m.getCleanVal());
                    c.setCaret(a);
                    return b
                };
                m.getCleanVal = function () {
                    return c.getMasked(!0)
                };
                m.getMaskedVal = function (a) {
                    return c.getMasked(!1, a)
                };
                m.init = function (d) {
                    d = d || !1;
                    f = f || {};
                    m.clearIfNotMatch = a.jMaskGlobals.clearIfNotMatch;
                    m.byPassKeys = a.jMaskGlobals.byPassKeys;
                    m.translation = a.extend({}, a.jMaskGlobals.translation, f.translation);
                    m = a.extend(!0, {}, m, f);
                    h = c.getRegexMask();
                    if (d) c.events(), c.val(c.getMasked()); else {
                        f.placeholder && b.attr("placeholder", f.placeholder);
                        b.data("mask") &&
                        b.attr("autocomplete", "off");
                        d = 0;
                        for (var l = !0; d < e.length; d++) {
                            var g = m.translation[e.charAt(d)];
                            if (g && g.recursive) {
                                l = !1;
                                break
                            }
                        }
                        l && b.attr("maxlength", e.length);
                        c.destroyEvents();
                        c.events();
                        d = c.getCaret();
                        c.val(c.getMasked());
                        c.setCaret(d)
                    }
                };
                m.init(!b.is("input"))
            };
            a.maskWatchers = {};
            var d = function () {
                var b = a(this), e = {}, f = b.attr("data-mask");
                b.attr("data-mask-reverse") && (e.reverse = !0);
                b.attr("data-mask-clearifnotmatch") && (e.clearIfNotMatch = !0);
                "true" === b.attr("data-mask-selectonfocus") && (e.selectOnFocus =
                    !0);
                if (p(b, f, e)) return b.data("mask", new l(this, f, e))
            }, p = function (b, e, f) {
                f = f || {};
                var c = a(b).data("mask"), d = JSON.stringify;
                b = a(b).val() || a(b).text();
                try {
                    return "function" === typeof e && (e = e(b)), "object" !== typeof c || d(c.options) !== d(f) || c.mask !== e
                } catch (t) {
                }
            }, h = function (a) {
                var b = document.createElement("div"), d;
                a = "on" + a;
                d = a in b;
                d || (b.setAttribute(a, "return;"), d = "function" === typeof b[a]);
                return d
            };
            a.fn.mask = function (b, d) {
                d = d || {};
                var e = this.selector, c = a.jMaskGlobals, h = c.watchInterval, c = d.watchInputs || c.watchInputs,
                    t = function () {
                        if (p(this, b, d)) return a(this).data("mask", new l(this, b, d))
                    };
                a(this).each(t);
                e && "" !== e && c && (clearInterval(a.maskWatchers[e]), a.maskWatchers[e] = setInterval(function () {
                    a(document).find(e).each(t)
                }, h));
                return this
            };
            a.fn.masked = function (a) {
                return this.data("mask").getMaskedVal(a)
            };
            a.fn.unmask = function () {
                clearInterval(a.maskWatchers[this.selector]);
                delete a.maskWatchers[this.selector];
                return this.each(function () {
                    var b = a(this).data("mask");
                    b && b.remove().removeData("mask")
                })
            };
            a.fn.cleanVal = function () {
                return this.data("mask").getCleanVal()
            };
            a.applyDataMask = function (b) {
                b = b || a.jMaskGlobals.maskElements;
                (b instanceof a ? b : a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(d)
            };
            h = {
                maskElements: "input,td,span,div",
                dataMaskAttr: "*[data-mask]",
                dataMask: !0,
                watchInterval: 300,
                watchInputs: !0,
                useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) && h("input"),
                watchDataMask: !1,
                byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
                translation: {
                    0: {pattern: /\d/},
                    9: {pattern: /\d/, optional: !0},
                    "#": {pattern: /\d/, recursive: !0},
                    A: {pattern: /[a-zA-Z0-9]/},
                    S: {pattern: /[a-zA-Z]/}
                }
            };
            a.jMaskGlobals = a.jMaskGlobals || {};
            h = a.jMaskGlobals = a.extend(!0, {}, h, a.jMaskGlobals);
            h.dataMask && a.applyDataMask();
            setInterval(function () {
                a.jMaskGlobals.watchDataMask && a.applyDataMask()
            }, h.watchInterval)
        }, window.jQuery, window.Zepto);
    }

    loadMaskPlugin();
}

if (typeof loadMask !== 'function') {
    var SPMaskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        },
        spOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(SPMaskBehavior.apply({}, arguments), options);
            }
        };

    function loadMask() {
        $('.telefone').mask(SPMaskBehavior, spOptions);
        $(".rg").mask('9999999999', {reverse: true});
        $(".ie").mask('999.999.999.999', {reverse: true});
        $(".cpf").mask('999.999.999-99', {reverse: true});
        $(".cnpj").mask('99.999.999/9999-99', {reverse: true});
        $(".cep").mask('99999-999', {reverse: true});
        $(".valor").mask('#.##0,00', {reverse: true});
        $('.date_time').mask('00/00/0000 00:00:00');
    }
}

if (typeof openPanel !== 'function') {
    function openPanel($this) {
        var entity = $this.attr("data-entity");
        var $id = $this.siblings('input[type=hidden]');
        $("#list-" + entity).panel(themeWindow('Editar ' + entity, {
            lib: 'form-crud',
            file: 'children/form',
            entity: entity,
            id: $this.siblings("input[type=hidden]").val()
        }, function (idOntab) {
            formSubmit($("#" + idOntab).find(".ontab-content").find("form"), $id);
        }));
    }
}

if (typeof formGetData !== 'function') {
    function formGetData($this) {

        function checkBox($this, valor) {
            if ($this.hasClass("switchCheck")) {
                return $this.prop("checked") ? 1 : 0;
            } else {
                if (!valor)
                    valor = [];

                if ($this.prop("checked"))
                    valor.push(parseInt($this.val()));
                else
                    valor.removeItem($this.val());

                return valor;
            }
        }

        function setDados($this, valor) {
            if ($this.attr("type") === "checkbox") {
                return checkBox($this, valor);
            } else if ($this.attr("type") === "radio") {
                if ($this.prop("checked"))
                    return $this.val();
                else if (valor)
                    return valor;
            } else if ($this.is('.telefone, .rg, .ie, .cpf, .cnpj, .cep, .valor, .date_time') && $this.val() !== "") {
                return $this.cleanVal();
            } else {
                return $this.val();
            }
        }

        var dados = {};
        $this.find("input, textarea, select").each(function () {
            if (typeof ($(this).attr("data-model")) !== "undefined")
                dados[$(this).attr("data-model")] = setDados($(this), typeof(dados[$(this).attr("data-model")]) !== "undefined" ? dados[$(this).attr("data-model")] : null);
        });

        return dados;
    }
}

if (typeof formSubmit !== 'function') {
    var saveTime;

    function formSubmit($form, $idReturn) {

        function setError($form, erro, t) {
            t = t || "dados.";
            $.each(erro, function (c, mensagem) {
                if (typeof (mensagem) === "object") {
                    setError($form, mensagem, t + c + '.');
                } else {
                    var $input = $form.find("[data-model='" + (t + c) + "']");
                    if ($input.attr("data-format") === "radio") {
                        $input.siblings(".md-radio--fake").css("border-color", "red");
                        $input.parent().siblings(".radio-title").addClass("error-span");
                    } else if ($input.attr("data-format") === "list") {
                        $input.siblings(".listButton").addClass("error-btn").parent().siblings(".rest").find("input[type=text]").siblings('.error-message').remove();
                        $input.parent().siblings(".rest").append('<span class="error-span error-message">' + mensagem + '</span>');
                    } else {
                        $input.siblings('label').addClass("error-span");
                        $input.siblings('.error-message').remove();
                        $input.addClass("subErro").parent().append('<span class="error-span error-message">' + mensagem + '</span>');
                    }
                }
            });
        }

        function cleanError($form) {
            $form.find(".md-radio--fake").css("border-color", "initial");
            $form.find(".radio-title").removeClass("error-span");
            $form.find(".listButton").removeClass('error-btn');
            $form.find(".error-message").remove();
            $form.find("input,textarea,select").removeClass("subErro").siblings('label').removeClass("error-span").siblings('.error-message').remove();
        }

        function reloadForm(entity, id) {
            id = id || null;
            $("#form_" + entity).loading();
            post('form-crud', 'read/form', {entity: entity, id: id}, function (data) {
                if (data) {
                    var $form = $("#form_" + entity).closest(".form-control");
                    $form.replaceWith(data);
                    loadMask();
                    formAutoSubmit(".form-control");
                }
            });
        }

        function formSave($form) {
            var dados = formGetData($form);
            console.log(dados);
            post('form-crud', $form.attr("action"), {
                entity: $form.attr("data-entity"),
                dados: dados
            }, function (data) {
                console.log(data);
                cleanError($form);
                if (isNaN(data))
                    setError($form, data[$form.attr("data-entity")]);
                else if (dados['dados.id'] === "")
                    reloadForm($form.attr("data-entity"), data);

                if (!saveTime)
                    window.onbeforeunload = null;
            });
        }

        clearTimeout(saveTime);

        window.onbeforeunload = function () {
            clearTimeout(saveTime);
            formSave($form);
            return true;
        };

        if (typeof ($idReturn) !== "undefined") {
            var dados = formGetData($form);
            post('form-crud', $form.attr("action"), {
                entity: $form.attr("data-entity"),
                dados: dados
            }, function (data) {
                if (!isNaN(data) && data > 0 && $idReturn.val() !== data)
                    $idReturn.val(data).trigger("change");
                else if ($idReturn.val() === "" && $form.find("input[type=hidden][data-model='dados.id']").val() !== "")
                    $idReturn.val($form.find("input[type=hidden][data-model='dados.id']").val()).trigger("change");

                if ($idReturn.val() !== "" && typeof ($form.find("input[type=hidden][rel='title']").val()) === "string")
                    $idReturn.parent().siblings(".rest").find("input[type=text]").val($form.find("[data-model='" + $form.find("input[type=hidden][rel='title']").val() + "']").val());

                window.onbeforeunload = null;
            });

        } else {
            saveTime = setTimeout(function () {
                saveTime = null;
                formSave($form);
            }, 400);
        }
    }
}

if (typeof choseList !== 'function') {
    function choseList(id, nome) {

    }
}

if (typeof formAutoSubmit !== 'function') {
    function formAutoSubmit(element) {
        $(element).off("keyup change", "input, textarea, select").on("keyup change", "input, textarea, select", function (e) {
            if ([13, 37, 38, 39, 40].indexOf(e.which) < 0 && typeof($(this).attr("data-model")) === "string")
                formSubmit($(this).closest("form"));
            else if ($(this).val() === "" && $(this).hasClass("form-list"))
                $(this).parent().prev().find("input[type=hidden]").val("").trigger("change");

        }).off("click", ".listButton").on("click", ".listButton", function () {
            openPanel($(this));
        }).off("keypress keydown", "button").on("keypress keydown", "button", function (e) {
            e.preventDefault();
        }).off("submit", "form").on("submit", "form", function (e) {
            e.preventDefault();
        }).off("keyup", ".form-list").on("keyup", ".form-list", function (e) {
            var $this = $(this);
            if ([38, 40, 13].indexOf(e.which) > -1) {
                var $list = $("#list-complete-" + $this.attr("id"));
                if (e.which === 38) {
                    if ($list.find("li.active").prev().length)
                        $list.find("li.active").removeClass("active").prev().addClass("active");
                } else if (e.which === 40) {
                    if ($list.find("li.active").next().length)
                        $list.find("li.active").removeClass("active").next().addClass("active");
                } else if (e.which === 13) {
                    selectList($("#list-complete-" + $this.attr("id")));
                }
            } else if ([37, 39].indexOf(e.which) < 0) {
                if ($this.val() !== "")
                    readList($this.attr("data-entity"), $this.val(), $this.attr("id"));
                else
                    $("#list-complete-" + $this.attr("id")).html("");
            }
        }).off("dblclick", ".form-list").on("dblclick", ".form-list", function () {
            readList($(this).attr("data-entity"), $(this).val(), $(this).attr("id"));
        });
    }

    function readList(entity, search, id) {
        post('form-crud', 'read/list', {
            search: search,
            entity: entity
        }, function (data) {
            var $list = $("#list-complete-" + id);
            $list.html(data);

            $(".list-option").off("click").on("click", function () {
                $(".list-option").removeClass("active");
                $(this).addClass("active");
                selectList($list);
            });
        });
    }

    function selectList($list) {
        var $active = $list.find("li.active");
        $list.siblings("input[type=text]").val($active.text().trim());
        $list.parent().prev().find("input[type=hidden]").val(parseInt($active.attr("rel"))).trigger("change");
        $list.html("");
    }
}

$(function () {
    loadMask();
    formAutoSubmit(".form-control");
});