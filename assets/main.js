(function (e) {
    e.fn.jqte = function (t) {
        function l(e, t, n, r, i) {
            var s = f.length + 1;
            return f.push({name: e, cls: s, command: t, key: n, tag: r, emphasis: i})
        }

        var n = [{title: "Text Format"}, {title: "Font Size"}, {title: "Color"}, {
            title: "Bold",
            hotkey: "B"
        }, {title: "Italic", hotkey: "I"}, {title: "Underline", hotkey: "U"}, {
            title: "Ordered List",
            hotkey: "."
        }, {title: "Unordered List", hotkey: ","}, {title: "Subscript", hotkey: "down arrow"}, {
            title: "Superscript",
            hotkey: "up arrow"
        }, {title: "Outdent", hotkey: "left arrow"}, {
            title: "Indent",
            hotkey: "right arrow"
        }, {title: "Justify Left"}, {title: "Justify Center"}, {title: "Justify Right"}, {
            title: "Strike Through",
            hotkey: "K"
        }, {title: "Add Link", hotkey: "L"}, {title: "Remove Link"}, {
            title: "Cleaner Style",
            hotkey: "Delete"
        }, {title: "Horizontal Rule", hotkey: "H"}, {title: "Source"}];
        var r = [["p", "Normal"], ["h1", "Header 1"], ["h2", "Header 2"], ["h3", "Header 3"], ["h4", "Header 4"], ["h5", "Header 5"], ["h6", "Header 6"], ["pre", "Preformatted"]];
        var i = ["10", "12", "16", "18", "20", "24", "28"];
        var s = ["0,0,0", "68,68,68", "102,102,102", "153,153,153", "204,204,204", "238,238,238", "243,243,243", "255,255,255", null, "255,0,0", "255,153,0", "255,255,0", "0,255,0", "0,255,255", "0,0,255", "153,0,255", "255,0,255", null, "244,204,204", "252,229,205", "255,242,204", "217,234,211", "208,224,227", "207,226,243", "217,210,233", "234,209,220", "234,153,153", "249,203,156", "255,229,153", "182,215,168", "162,196,201", "159,197,232", "180,167,214", "213,166,189", "224,102,102", "246,178,107", "255,217,102", "147,196,125", "118,165,175", "111,168,220", "142,124,195", "194,123,160", "204,0,0", "230,145,56", "241,194,50", "106,168,79", "69,129,142", "61,133,198", "103,78,167", "166,77,121", "153,0,0", "180,95,6", "191,144,0", "56,118,29", "19,79,92", "11,83,148", "53,28,117", "116,27,71", "102,0,0", "120,63,4", "127,96,0", "39,78,19", "12,52,61", "7,55,99", "32,18,77", "76,17,48"];
        var o = ["Web Address", "E-mail Address", "Picture URL"];
        var u = e.extend({
            status: !0,
            css: "jqte",
            title: !0,
            titletext: n,
            button: "OK",
            format: !0,
            formats: r,
            fsize: !0,
            fsizes: i,
            funit: "px",
            color: !0,
            linktypes: o,
            b: !0,
            i: !0,
            u: !0,
            ol: !0,
            ul: !0,
            sub: !0,
            sup: !0,
            outdent: !0,
            indent: !0,
            left: !0,
            center: !0,
            right: !0,
            strike: !0,
            link: !0,
            unlink: !0,
            remove: !0,
            rule: !0,
            source: !0,
            placeholder: !1,
            br: !0,
            p: !0,
            change: "",
            focus: "",
            blur: ""
        }, t);
        e.fn.jqteVal = function (t) {
            e(this).closest("." + u.css).find("." + u.css + "_editor").html(t)
        };
        var a = navigator.userAgent.toLowerCase();
        if (/msie [1-7]./.test(a)) u.title = !1;
        var f = [];
        l("format", "formats", "", "", !1);
        l("fsize", "fSize", "", "", !1);
        l("color", "colors", "", "", !1);
        l("b", "Bold", "B", ["b", "strong"], !0);
        l("i", "Italic", "I", ["i", "em"], !0);
        l("u", "Underline", "U", ["u"], !0);
        l("ol", "insertorderedlist", "¾", ["ol"], !0);
        l("ul", "insertunorderedlist", "¼", ["ul"], !0);
        l("sub", "subscript", "(", ["sub"], !0);
        l("sup", "superscript", "&", ["sup"], !0);
        l("outdent", "outdent", "%", ["blockquote"], !1);
        l("indent", "indent", "'", ["blockquote"], !0);
        l("left", "justifyLeft", "", "", !1);
        l("center", "justifyCenter", "", "", !1);
        l("right", "justifyRight", "", "", !1);
        l("strike", "strikeThrough", "K", ["strike"], !0);
        l("link", "linkcreator", "L", ["a"], !0);
        l("unlink", "unlink", "", ["a"], !1);
        l("remove", "removeformat", ".", "", !1);
        l("rule", "inserthorizontalrule", "H", ["hr"], !1);
        l("source", "displaysource", "", "", !1);
        return this.each(function () {
            function B() {
                if (window.getSelection) return window.getSelection(); else if (document.selection && document.selection.createRange && document.selection.type != "None") return document.selection.createRange()
            }

            function j(e, t) {
                var n, r = B();
                if (window.getSelection) {
                    if (r.anchorNode && r.getRangeAt) n = r.getRangeAt(0);
                    if (n) {
                        r.removeAllRanges();
                        r.addRange(n)
                    }
                    if (!a.match(/msie/)) document.execCommand("StyleWithCSS", !1, !1);
                    document.execCommand(e, !1, t)
                } else if (document.selection && document.selection.createRange && document.selection.type != "None") {
                    n = document.selection.createRange();
                    n.execCommand(e, !1, t)
                }
                q(!1, !1)
            }

            function F(t, n, r) {
                if (v.not(":focus")) v.focus();
                if (window.getSelection) {
                    var i = B(), s, o, u;
                    if (i.anchorNode && i.getRangeAt) {
                        s = i.getRangeAt(0);
                        o = document.createElement(t);
                        e(o).attr(n, r);
                        u = s.extractContents();
                        o.appendChild(u);
                        s.insertNode(o);
                        i.removeAllRanges();
                        if (n == "style") q(e(o), r); else q(e(o), !1)
                    }
                } else if (document.selection && document.selection.createRange && document.selection.type != "None") {
                    var a = document.selection.createRange();
                    var f = a.htmlText;
                    var l = "<" + t + " " + n + '="' + r + '">' + f + "</" + t + ">";
                    document.selection.createRange().pasteHTML(l)
                }
            }

            function q(e, t) {
                var n = I();
                n = n ? n : e;
                if (n && t == !1) {
                    if (n.parent().is("[style]")) n.attr("style", n.parent().attr("style"));
                    if (n.is("[style]")) n.find("*").attr("style", n.attr("style"))
                } else if (e && t && e.is("[style]")) {
                    var r = t.split(";");
                    r = r[0].split(":");
                    if (e.is("[style*=" + r[0] + "]")) e.find("*").css(r[0], r[1]);
                    R(e)
                }
            }

            function R(t) {
                if (t) {
                    var t = t[0];
                    if (document.body.createTextRange) {
                        var n = document.body.createTextRange();
                        n.moveToElementText(t);
                        n.select()
                    } else if (window.getSelection) {
                        var r = window.getSelection();
                        var n = document.createRange();
                        if (t != "undefined" && t != null) {
                            n.selectNodeContents(t);
                            r.removeAllRanges();
                            r.addRange(n);
                            if (e(t).is(":empty")) {
                                e(t).append(" ");
                                R(e(t))
                            }
                        }
                    }
                }
            }

            function U() {
                if (!p.data("sourceOpened")) {
                    var t = I();
                    var n = "http://";
                    W(!0);
                    if (t) {
                        var r = t.prop("tagName").toLowerCase();
                        if (r == "a" && t.is("[href]")) {
                            n = t.attr("href");
                            t.attr(S, "")
                        } else F("a", S, "")
                    } else y.val(n).focus();
                    g.click(function (t) {
                        if (e(t.target).hasClass(u.css + "_linktypetext") || e(t.target).hasClass(u.css + "_linktypearrow")) X(!0)
                    });
                    w.find("a").click(function () {
                        var t = e(this).attr(u.css + "-linktype");
                        w.data("linktype", t);
                        E.find("." + u.css + "_linktypetext").html(w.find("a:eq(" + w.data("linktype") + ")").text());
                        V(n);
                        X()
                    });
                    V(n);
                    y.focus().val(n).bind("keypress keyup", function (e) {
                        if (e.keyCode == 13) {
                            z(h.find("[" + S + "]"));
                            return !1
                        }
                    });
                    b.click(function () {
                        z(h.find("[" + S + "]"))
                    })
                } else W(!1)
            }

            function z(t) {
                y.focus();
                R(t);
                t.removeAttr(S);
                if (w.data("linktype") != "2") j("createlink", y.val()); else {
                    j("insertImage", y.val());
                    v.find("img").each(function () {
                        var t = e(this).prev("a");
                        var n = e(this).next("a");
                        if (t.length > 0 && t.html() == "") t.remove(); else if (n.length > 0 && n.html() == "") n.remove()
                    })
                }
                W();
                v.trigger("change")
            }

            function W(e) {
                Q("[" + S + "]:not([href])");
                h.find("[" + S + "][href]").removeAttr(S);
                if (e) {
                    p.data("linkOpened", !0);
                    d.show()
                } else {
                    p.data("linkOpened", !1);
                    d.hide()
                }
                X()
            }

            function X(e) {
                if (e) w.show(); else w.hide()
            }

            function V(e) {
                var t = w.data("linktype");
                if (t == "1" && (y.val() == "http://" || y.is("[value^=http://]") || !y.is("[value^=mailto]"))) y.val("mailto:"); else if (t != "1" && !y.is("[value^=http://]")) y.val("http://"); else y.val(e)
            }

            function J(t) {
                if (!p.data("sourceOpened")) {
                    if (t == "fSize") styleField = P; else if (t == "colors") styleField = H;
                    K(styleField, !0);
                    styleField.find("a").unbind("click").click(function () {
                        var n = e(this).attr(u.css + "-styleval");
                        if (t == "fSize") {
                            styleType = "font-size";
                            n = n + u.funit
                        } else if (t == "colors") {
                            styleType = "color";
                            n = "rgb(" + n + ")"
                        }
                        var r = G(styleType);
                        F("span", "style", styleType + ":" + n + ";" + r);
                        K("", !1);
                        e("." + u.css + "_title").remove();
                        v.trigger("change")
                    })
                } else K(styleField, !1);
                W(!1)
            }

            function K(e, t) {
                var n = "", r = [{d: "fsizeOpened", f: P}, {d: "cpallOpened", f: H}];
                if (e != "") {
                    for (var i = 0; i < r.length; i++) {
                        if (e == r[i].f) n = r[i]
                    }
                }
                if (t) {
                    p.data(n.d, !0);
                    n.f.slideDown(100);
                    for (var i = 0; i < r.length; i++) {
                        if (n.d != r[i].d) {
                            p.data(r[i].d, !1);
                            r[i].f.slideUp(100)
                        }
                    }
                } else {
                    for (var i = 0; i < r.length; i++) {
                        p.data(r[i].d, !1);
                        r[i].f.slideUp(100)
                    }
                }
            }

            function Q(t) {
                h.find(t).each(function () {
                    e(this).before(e(this).html()).remove()
                })
            }

            function G(e) {
                var t = I();
                if (t && t.is("[style]") && t.css(e) != "") {
                    var n = t.css(e);
                    t.css(e, "");
                    var r = t.attr("style");
                    t.css(e, n);
                    return r
                } else return ""
            }

            function Y() {
                Z(!0);
                D.find("a").click(function () {
                    e("*", this).click(function (e) {
                        e.preventDefault();
                        return !1
                    });
                    et(e(this).text());
                    var t = e(this).attr(u.css + "-formatval");
                    j("formatBlock", "<" + t + ">");
                    Z(!1)
                })
            }

            function Z(e) {
                var t = e ? !0 : !1;
                t = e && D.data("status") ? !0 : !1;
                if (t || !e) D.data("status", !1).slideUp(200); else D.data("status", !0).slideDown(200)
            }

            function et(e) {
                var t = D.closest("." + u.css + "_tool").find("." + u.css + "_tool_label").find("." + u.css + "_tool_text");
                if (e.length > 10) e = e.substr(0, 7) + "...";
                t.html(e)
            }

            function tt(e) {
                var t, n, r;
                t = e.replace(/\n/gim, "").replace(/\r/gim, "").replace(/\t/gim, "").replace(/ /gim, " ");
                n = [/\<span(|\s+.*?)><span(|\s+.*?)>(.*?)<\/span><\/span>/gim, /<(\w*[^p])\s*[^\/>]*>\s*<\/\1>/gim, /\<div(|\s+.*?)>(.*?)\<\/div>/gim, /\<strong(|\s+.*?)>(.*?)\<\/strong>/gim, /\<em(|\s+.*?)>(.*?)\<\/em>/gim];
                r = ["<span$2>$3</span>", "", "<p$1>$2</p>", "<b$1>$2</b>", "<i$1>$2</i>"];
                for (A = 0; A < 5; A++) {
                    for (var i = 0; i < n.length; i++) {
                        t = t.replace(n[i], r[i])
                    }
                }
                if (!u.p) t = t.replace(/\<p(|\s+.*?)>(.*?)\<\/p>/ig, "<br/>$2");
                if (!u.br) {
                    n = [/\<br>(.*?)/ig, /\<br\/>(.*?)/ig];
                    r = ["<p>$1</p>", "<p>$1</p>"];
                    for (var i = 0; i < n.length; i++) {
                        t = t.replace(n[i], r[i])
                    }
                }
                if (!u.p && !u.br) t = t.replace(/\<p>(.*?)\<\/p>/ig, "<div>$1</div>");
                return t
            }

            function nt() {
                var e = v.text() == "" && v.html().length < 12 ? "" : v.html();
                l.val(tt(e))
            }

            function rt() {
                v.html(tt(l.val()))
            }

            function it(t) {
                var n = !1, r = I(), i;
                if (r) {
                    e.each(t, function (t, s) {
                        i = r.prop("tagName").toLowerCase();
                        if (i == s) n = !0; else {
                            r.parents().each(function () {
                                i = e(this).prop("tagName").toLowerCase();
                                if (i == s) n = !0
                            })
                        }
                    });
                    return n
                } else return !1
            }

            function st(t) {
                for (var n = 0; n < f.length; n++) {
                    if (u[f[n].name] && f[n].emphasis && f[n].tag != "") it(f[n].tag) ? p.find("." + u.css + "_tool_" + f[n].cls).addClass(m) : e("." + u.css + "_tool_" + f[n].cls).removeClass(m)
                }
                if (u.format && e.isArray(u.formats)) {
                    var r = !1;
                    for (var i = 0; i < u.formats.length; i++) {
                        var s = [];
                        s[0] = u.formats[i][0];
                        if (u.formats[i][0].length > 0 && it(s)) {
                            et(u.formats[i][1]);
                            r = !0;
                            break
                        }
                    }
                    if (!r) et(u.formats[0][1])
                }
                K("", !1);
                Z(!1)
            }

            if (!e(this).data("jqte") || e(this).data("jqte") == null || e(this).data("jqte") == "undefined") e(this).data("jqte", !0); else e(this).data("jqte", !1);
            if (!u.status || !e(this).data("jqte")) {
                if (e(this).closest("." + u.css).length > 0) {
                    var t = e(this).closest("." + u.css).find("." + u.css + "_editor").html();
                    var n = "";
                    e(e(this)[0].attributes).each(function () {
                        if (this.nodeName != "style") n = n + " " + this.nodeName + '="' + this.nodeValue + '"'
                    });
                    var r = e(this).is("[data-origin]") && e(this).attr("data-origin") != "" ? e(this).attr("data-origin") : "textarea";
                    var i = ">" + t;
                    if (r == "input" || r == "option") {
                        t = t.replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "<").replace(/>/g, ">");
                        i = 'value="' + t + '">'
                    }
                    var o = e(this).clone();
                    e(this).data("jqte", !1).closest("." + u.css).before(o).remove();
                    o.replaceWith("<" + r + n + i + "</" + r + ">")
                }
                return
            }
            var l = e(this);
            var r = e(this).prop("tagName").toLowerCase();
            e(this).attr("data-origin", r);
            var c = e(this).is("[value]") || r == "textarea" ? e(this).val() : e(this).html();
            c = c.replace(/&#34;/g, '"').replace(/&#39;/g, "'").replace(/</g, "<").replace(/>/g, ">").replace(/&/g, "&");
            e(this).after('<div class="' + u.css + '"></div>');
            var h = e(this).next("." + u.css);
            h.html('<div class="' + u.css + "_toolbar" + '" role="toolbar" unselectable></div><div class="' + u.css + '_linkform" style="display:none" role="dialog"></div><div class="' + u.css + "_editor" + '"></div>');
            var p = h.find("." + u.css + "_toolbar");
            var d = h.find("." + u.css + "_linkform");
            var v = h.find("." + u.css + "_editor");
            var m = u.css + "_tool_depressed";
            d.append('<div class="' + u.css + '_linktypeselect" unselectable></div><input class="' + u.css + '_linkinput" type="text/css" value=""><div class="' + u.css + '_linkbutton" unselectable>' + u.button + '</div> <div style="height:1px;float:none;clear:both"></div>');
            var g = d.find("." + u.css + "_linktypeselect");
            var y = d.find("." + u.css + "_linkinput");
            var b = d.find("." + u.css + "_linkbutton");
            g.append('<div class="' + u.css + '_linktypeview" unselectable></div><div class="' + u.css + '_linktypes" role="menu" unselectable></div>');
            var w = g.find("." + u.css + "_linktypes");
            var E = g.find("." + u.css + "_linktypeview");
            var S = u.css + "-setlink";
            v.after('<div class="' + u.css + "_source " + u.css + '_hiddenField"></div>');
            var x = h.find("." + u.css + "_source");
            l.appendTo(x);
            if (r != "textarea") {
                var n = "";
                e(l[0].attributes).each(function () {
                    if (this.nodeName != "type" && this.nodeName != "value") n = n + " " + this.nodeName + '="' + this.nodeValue + '"'
                });
                l.replaceWith("<textarea " + n + ">" + c + "</textarea>");
                l = x.find("textarea")
            }
            v.attr("contenteditable", "true").html(c);
            for (var T = 0; T < f.length; T++) {
                if (u[f[T].name]) {
                    var N = f[T].key.length > 0 ? u.titletext[T].hotkey != null && u.titletext[T].hotkey != "undefined" && u.titletext[T].hotkey != "" ? " (Ctrl+" + u.titletext[T].hotkey + ")" : "" : "";
                    var C = u.titletext[T].title != null && u.titletext[T].title != "undefined" && u.titletext[T].title != "" ? u.titletext[T].title + N : "";
                    p.append('<div class="' + u.css + "_tool " + u.css + "_tool_" + f[T].cls + '" role="button" data-tool="' + T + '" unselectable><a class="' + u.css + '_tool_icon" unselectable></a></div>');
                    p.find("." + u.css + "_tool[data-tool=" + T + "]").data({
                        tag: f[T].tag,
                        command: f[T].command,
                        emphasis: f[T].emphasis,
                        title: C
                    });
                    if (f[T].name == "format" && e.isArray(u.formats)) {
                        var k = u.formats[0][1].length > 0 && u.formats[0][1] != "undefined" ? u.formats[0][1] : "";
                        p.find("." + u.css + "_tool_" + f[T].cls).find("." + u.css + "_tool_icon").replaceWith('<a class="' + u.css + '_tool_label" unselectable><span class="' + u.css + '_tool_text" unselectable>' + k + '</span><span class="' + u.css + '_tool_icon" unselectable></span></a>');
                        p.find("." + u.css + "_tool_" + f[T].cls).append('<div class="' + u.css + '_formats" unselectable></div>');
                        for (var L = 0; L < u.formats.length; L++) {
                            p.find("." + u.css + "_formats").append("<a " + u.css + '-formatval="' + u.formats[L][0] + '" class="' + u.css + "_format" + " " + u.css + "_format_" + L + '" role="menuitem" unselectable>' + u.formats[L][1] + "</a>")
                        }
                        p.find("." + u.css + "_formats").data("status", !1)
                    } else if (f[T].name == "fsize" && e.isArray(u.fsizes)) {
                        p.find("." + u.css + "_tool_" + f[T].cls).append('<div class="' + u.css + '_fontsizes" unselectable></div>');
                        for (var L = 0; L < u.fsizes.length; L++) {
                            p.find("." + u.css + "_fontsizes").append("<a " + u.css + '-styleval="' + u.fsizes[L] + '" class="' + u.css + "_fontsize" + '" style="font-size:' + u.fsizes[L] + u.funit + '" role="menuitem" unselectable>Abcdefgh...</a>')
                        }
                    } else if (f[T].name == "color" && e.isArray(s)) {
                        p.find("." + u.css + "_tool_" + f[T].cls).append('<div class="' + u.css + '_cpalette" unselectable></div>');
                        for (var A = 0; A < s.length; A++) {
                            if (s[A] != null) p.find("." + u.css + "_cpalette").append("<a " + u.css + '-styleval="' + s[A] + '" class="' + u.css + "_color" + '" style="background-color: rgb(' + s[A] + ')" role="gridcell" unselectable></a>'); else p.find("." + u.css + "_cpalette").append('<div class="' + u.css + "_colorSeperator" + '"></div>')
                        }
                    }
                }
            }
            w.data("linktype", "0");
            for (var T = 0; T < 3; T++) {
                w.append("<a " + u.css + '-linktype="' + T + '" unselectable>' + u.linktypes[T] + "</a>");
                E.html('<div class="' + u.css + '_linktypearrow" unselectable></div><div class="' + u.css + '_linktypetext">' + w.find("a:eq(" + w.data("linktype") + ")").text() + "</div>")
            }
            var O = "";
            if (/msie/.test(a)) O = "-ms-"; else if (/chrome/.test(a) || /safari/.test(a) || /yandex/.test(a)) O = "-webkit-"; else if (/mozilla/.test(a)) O = "-moz-"; else if (/opera/.test(a)) O = "-o-"; else if (/konqueror/.test(a)) O = "-khtml-"; else O = "";
            if (u.placeholder && u.placeholder != "") {
                h.prepend('<div class="' + u.css + '_placeholder" unselectable><div class="' + u.css + '_placeholder_text">' + u.placeholder + "</div></div>");
                var M = h.find("." + u.css + "_placeholder");
                M.click(function () {
                    v.focus()
                })
            }
            h.find("[unselectable]").css(O + "user-select", "none").addClass("unselectable").attr("unselectable", "on").on("selectstart mousedown", !1);
            var _ = p.find("." + u.css + "_tool");
            var D = p.find("." + u.css + "_formats");
            var P = p.find("." + u.css + "_fontsizes");
            var H = p.find("." + u.css + "_cpalette");
            var I = function () {
                var t, n;
                if (window.getSelection) {
                    n = getSelection();
                    t = n.anchorNode
                }
                if (!t && document.selection && document.selection.createRange && document.selection.type != "None") {
                    n = document.selection;
                    var r = n.getRangeAt ? n.getRangeAt(0) : n.createRange();
                    t = r.commonAncestorContainer ? r.commonAncestorContainer : r.parentElement ? r.parentElement() : r.item(0)
                }
                if (t) {
                    return t.nodeName == "#text" ? e(t.parentNode) : e(t)
                } else return !1
            };
            _.unbind("click").click(function (t) {
                if (e(this).data("command") == "displaysource" && !p.data("sourceOpened")) {
                    p.find("." + u.css + "_tool").addClass(u.css + "_hiddenField");
                    e(this).removeClass(u.css + "_hiddenField");
                    p.data("sourceOpened", !0);
                    l.css("height", v.outerHeight());
                    x.removeClass(u.css + "_hiddenField");
                    v.addClass(u.css + "_hiddenField");
                    l.focus();
                    W(!1);
                    K("", !1);
                    Z();
                    if (u.placeholder && u.placeholder != "") M.hide()
                } else {
                    if (!p.data("sourceOpened")) {
                        if (e(this).data("command") == "linkcreator") {
                            if (!p.data("linkOpened")) U(); else {
                                W(!1);
                                Z(!1)
                            }
                        } else if (e(this).data("command") == "formats") {
                            if (e(this).data("command") == "formats" && !e(t.target).hasClass(u.css + "_format")) Y();
                            K("", !1);
                            if (v.not(":focus")) v.focus()
                        } else if (e(this).data("command") == "fSize" || e(this).data("command") == "colors") {
                            if (e(this).data("command") == "fSize" && !e(t.target).hasClass(u.css + "_fontsize") || e(this).data("command") == "colors" && !e(t.target).hasClass(u.css + "_color")) J(e(this).data("command"));
                            Z(!1);
                            if (v.not(":focus")) v.focus()
                        } else {
                            if (v.not(":focus")) v.focus();
                            j(e(this).data("command"), null);
                            K("", !1);
                            Z(!1);
                            X();
                            e(this).data("emphasis") == !0 && !e(this).hasClass(m) ? e(this).addClass(m) : e(this).removeClass(m);
                            x.addClass(u.css + "_hiddenField");
                            v.removeClass(u.css + "_hiddenField")
                        }
                    } else {
                        p.data("sourceOpened", !1);
                        p.find("." + u.css + "_tool").removeClass(u.css + "_hiddenField");
                        x.addClass(u.css + "_hiddenField");
                        v.removeClass(u.css + "_hiddenField")
                    }
                    if (u.placeholder && u.placeholder != "") v.html() != "" ? M.hide() : M.show()
                }
                v.trigger("change")
            }).hover(function (t) {
                if (u.title && e(this).data("title") != "" && (e(t.target).hasClass(u.css + "_tool") || e(t.target).hasClass(u.css + "_tool_icon"))) {
                    e("." + u.css + "_title").remove();
                    h.append('<div class="' + u.css + '_title"><div class="' + u.css + '_titleArrow"><div class="' + u.css + '_titleArrowIcon"></div></div><div class="' + u.css + '_titleText">' + e(this).data("title") + "</div></div>");
                    var n = e("." + u.css + "_title:first");
                    var r = n.find("." + u.css + "_titleArrowIcon");
                    var i = e(this).position();
                    var s = i.left + e(this).outerWidth() - n.outerWidth() / 2 - e(this).outerWidth() / 2;
                    var o = i.top + e(this).outerHeight() + 5;
                    n.delay(400).css({top: o, left: s}).fadeIn(200)
                }
            }, function () {
                e("." + u.css + "_title").remove()
            });
            var ot = null;
            v.bind("keypress keyup keydown drop cut copy paste DOMCharacterDataModified DOMSubtreeModified", function () {
                if (!p.data("sourceOpened")) e(this).trigger("change");
                X();
                if (e.isFunction(u.change)) u.change();
                if (u.placeholder && u.placeholder != "") e(this).text() != "" ? M.hide() : M.show()
            }).bind("change", function () {
                if (!p.data("sourceOpened")) {
                    clearTimeout(ot);
                    ot = setTimeout(nt, 10)
                }
            }).keydown(function (e) {
                if (e.ctrlKey) {
                    for (var t = 0; t < f.length; t++) {
                        if (u[f[t].name] && e.keyCode == f[t].key.charCodeAt(0)) {
                            if (f[t].command != "" && f[t].command != "linkcreator") j(f[t].command, null); else if (f[t].command == "linkcreator") U();
                            return !1
                        }
                    }
                }
            }).bind("mouseup keyup", st).focus(function () {
                if (e.isFunction(u.focus)) u.focus();
                h.addClass(u.css + "_focused");
                if (/opera/.test(a)) {
                    var t = document.createRange();
                    t.selectNodeContents(v[0]);
                    t.collapse(!1);
                    var n = window.getSelection();
                    n.removeAllRanges();
                    n.addRange(t)
                }
            }).focusout(function () {
                _.removeClass(m);
                K("", !1);
                Z(!1);
                X();
                if (e.isFunction(u.blur)) u.blur();
                h.removeClass(u.css + "_focused");
                if (e.isArray(u.formats)) et(u.formats[0][1])
            });
            l.bind("keydown keyup", function () {
                setTimeout(rt, 0);
                e(this).height(e(this)[0].scrollHeight);
                if (e(this).val() == "") e(this).height(0)
            }).focus(function () {
                h.addClass(u.css + "_focused")
            }).focusout(function () {
                h.removeClass(u.css + "_focused")
            })
        })
    }
})(jQuery);
"use strict";
var _createClass = function () {
    function t(a, l) {
        for (var d, s = 0; s < l.length; s++) d = l[s], d.enumerable = d.enumerable || !1, d.configurable = !0, "value" in d && (d.writable = !0), Object.defineProperty(a, d.key, d)
    }

    return function (a, l, s) {
        return l && t(a.prototype, l), s && t(a, s), a
    }
}();

function _possibleConstructorReturn(t, a) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return a && ("object" == typeof a || "function" == typeof a) ? a : t
}

function _inherits(t, a) {
    if ("function" != typeof a && null !== a) throw new TypeError("Super expression must either be null or a function, not " + typeof a);
    t.prototype = Object.create(a && a.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), a && (Object.setPrototypeOf ? Object.setPrototypeOf(t, a) : t.__proto__ = a)
}

function _classCallCheck(t, a) {
    if (!(t instanceof a)) throw new TypeError("Cannot call a class as a function")
}

var Emitter = function () {
    function t() {
        _classCallCheck(this, t)
    }

    return _createClass(t, [{
        key: "on", value: function (l, s) {
            return this._callbacks = this._callbacks || {}, this._callbacks[l] || (this._callbacks[l] = []), this._callbacks[l].push(s), this
        }
    }, {
        key: "emit", value: function (l) {
            this._callbacks = this._callbacks || {};
            var s = this._callbacks[l];
            if (s) {
                for (var d = arguments.length, u = Array(1 < d ? d - 1 : 0), p = 1; p < d; p++) u[p - 1] = arguments[p];
                for (var m = s, h = !0, g = 0, m = m; ;) {
                    var f;
                    if (g >= m.length) break;
                    f = m[g++];
                    var k = f;
                    k.apply(this, u)
                }
            }
            return this
        }
    }, {
        key: "off", value: function (l, s) {
            if (!this._callbacks || 0 === arguments.length) return this._callbacks = {}, this;
            var d = this._callbacks[l];
            if (!d) return this;
            if (1 === arguments.length) return delete this._callbacks[l], this;
            for (var p, u = 0; u < d.length; u++) if (p = d[u], p === s) {
                d.splice(u, 1);
                break
            }
            return this
        }
    }]), t
}(), Dropzone = function (t) {
    function a(l, s) {
        _classCallCheck(this, a);
        var u, p, d = _possibleConstructorReturn(this, (a.__proto__ || Object.getPrototypeOf(a)).call(this));
        if (d.element = l, d.version = a.version, d.defaultOptions.previewTemplate = d.defaultOptions.previewTemplate.replace(/\n*/g, ""), d.clickableElements = [], d.listeners = [], d.files = [], "string" == typeof d.element && (d.element = document.querySelector(d.element)), !d.element || null == d.element.nodeType) throw new Error("Invalid dropzone element.");
        if (d.element.dropzone) throw new Error("Dropzone already attached.");
        a.instances.push(d), d.element.dropzone = d;
        var m = null == (p = a.optionsForElement(d.element)) ? {} : p;
        if (d.options = a.extend({}, d.defaultOptions, m, null == s ? {} : s), d.options.forceFallback || !a.isBrowserSupported()) {
            var h;
            return h = d.options.fallback.call(d), _possibleConstructorReturn(d, h)
        }
        if (null == d.options.url && (d.options.url = d.element.getAttribute("action")), !d.options.url) throw new Error("No URL provided.");
        if (d.options.acceptedFiles && d.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
        if (d.options.uploadMultiple && d.options.chunking) throw new Error("You cannot set both: uploadMultiple and chunking.");
        return d.options.acceptedMimeTypes && (d.options.acceptedFiles = d.options.acceptedMimeTypes, delete d.options.acceptedMimeTypes), null != d.options.renameFilename && (d.options.renameFile = function (g) {
            return d.options.renameFilename.call(d, g.name, g)
        }), d.options.method = d.options.method.toUpperCase(), (u = d.getExistingFallback()) && u.parentNode && u.parentNode.removeChild(u), !1 !== d.options.previewsContainer && (d.options.previewsContainer ? d.previewsContainer = a.getElement(d.options.previewsContainer, "previewsContainer") : d.previewsContainer = d.element), d.options.clickable && (!0 === d.options.clickable ? d.clickableElements = [d.element] : d.clickableElements = a.getElements(d.options.clickable, "clickable")), d.init(), d
    }

    return _inherits(a, t), _createClass(a, null, [{
        key: "initClass", value: function () {
            this.prototype.Emitter = Emitter, this.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"], this.prototype.defaultOptions = {
                url: null,
                method: "post",
                withCredentials: !1,
                timeout: 3e4,
                parallelUploads: 2,
                uploadMultiple: !1,
                chunking: !1,
                forceChunking: !1,
                chunkSize: 2e6,
                parallelChunkUploads: !1,
                retryChunks: !1,
                retryChunksLimit: 3,
                maxFilesize: 256,
                paramName: "file",
                createImageThumbnails: !0,
                maxThumbnailFilesize: 10,
                thumbnailWidth: 120,
                thumbnailHeight: 120,
                thumbnailMethod: "crop",
                resizeWidth: null,
                resizeHeight: null,
                resizeMimeType: null,
                resizeQuality: 0.8,
                resizeMethod: "contain",
                filesizeBase: 1e3,
                maxFiles: null,
                headers: null,
                clickable: !0,
                ignoreHiddenFiles: !0,
                acceptedFiles: null,
                acceptedMimeTypes: null,
                autoProcessQueue: !0,
                autoQueue: !0,
                addRemoveLinks: !1,
                previewsContainer: null,
                hiddenInputContainer: ".form-file",
                capture: null,
                renameFilename: null,
                renameFile: null,
                forceFallback: !1,
                dictDefaultMessage: "Drop files here to upload",
                dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
                dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
                dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
                dictInvalidFileType: "You can't upload files of this type.",
                dictResponseError: "Server responded with {{statusCode}} code.",
                dictCancelUpload: "Cancel upload",
                dictUploadCanceled: "Upload canceled.",
                dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
                dictRemoveFile: "Remove file",
                dictRemoveFileConfirmation: null,
                dictMaxFilesExceeded: "You can not upload any more files.",
                dictFileSizeUnits: {tb: "TB", gb: "GB", mb: "MB", kb: "KB", b: "b"},
                init: function () {
                },
                params: function (d, u, p) {
                    if (p) return {
                        dzuuid: p.file.upload.uuid,
                        dzchunkindex: p.index,
                        dztotalfilesize: p.file.size,
                        dzchunksize: this.options.chunkSize,
                        dztotalchunkcount: p.file.upload.totalChunkCount,
                        dzchunkbyteoffset: p.index * this.options.chunkSize
                    }
                },
                accept: function (d, u) {
                    return u()
                },
                chunksUploaded: function (d, u) {
                    u()
                },
                fallback: function () {
                    var d;
                    this.element.className += " dz-browser-not-supported";
                    for (var u = this.element.getElementsByTagName("div"), p = !0, m = 0, u = u; ;) {
                        var h;
                        if (m >= u.length) break;
                        h = u[m++];
                        var g = h;
                        if (/(^| )dz-message($| )/.test(g.className)) {
                            d = g, g.className = "dz-message";
                            break
                        }
                    }
                    d || (d = a.createElement("<div class=\"dz-message\"><span></span></div>"), this.element.appendChild(d));
                    var f = d.getElementsByTagName("span")[0];
                    return f && (null == f.textContent ? null != f.innerText && (f.innerText = this.options.dictFallbackMessage) : f.textContent = this.options.dictFallbackMessage), this.element.appendChild(this.getFallbackForm())
                },
                resize: function (d, u, p, m) {
                    var h = {srcX: 0, srcY: 0, srcWidth: d.width, srcHeight: d.height}, g = d.width / d.height;
                    null == u && null == p ? (u = h.srcWidth, p = h.srcHeight) : null == u ? u = p * g : null == p && (p = u / g), u = Math.min(u, h.srcWidth), p = Math.min(p, h.srcHeight);
                    var f = u / p;
                    if (h.srcWidth > u || h.srcHeight > p) if ("crop" === m) g > f ? (h.srcHeight = d.height, h.srcWidth = h.srcHeight * f) : (h.srcWidth = d.width, h.srcHeight = h.srcWidth / f); else if ("contain" === m) g > f ? p = u / g : u = p * g; else throw new Error("Unknown resizeMethod '" + m + "'");
                    return h.srcX = (d.width - h.srcWidth) / 2, h.srcY = (d.height - h.srcHeight) / 2, h.trgWidth = u, h.trgHeight = p, h
                },
                transformFile: function (d, u) {
                    return (this.options.resizeWidth || this.options.resizeHeight) && d.type.match(/image.*/) ? this.resizeImage(d, this.options.resizeWidth, this.options.resizeHeight, this.options.resizeMethod, u) : u(d)
                },
                previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-image\"><img data-dz-thumbnail /></div>\n  <div class=\"dz-details\">\n    <div class=\"dz-size\"><span data-dz-size></span></div>\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n  </div>\n  <div class=\"dz-progress\"><span class=\"dz-upload\" data-dz-uploadprogress></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n  <div class=\"dz-success-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Check</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <path d=\"M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" stroke-opacity=\"0.198794158\" stroke=\"#747474\" fill-opacity=\"0.816519475\" fill=\"#FFFFFF\" sketch:type=\"MSShapeGroup\"></path>\n      </g>\n    </svg>\n  </div>\n  <div class=\"dz-error-mark\">\n    <svg width=\"54px\" height=\"54px\" viewBox=\"0 0 54 54\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:sketch=\"http://www.bohemiancoding.com/sketch/ns\">\n      <title>Error</title>\n      <defs></defs>\n      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\" sketch:type=\"MSPage\">\n        <g id=\"Check-+-Oval-2\" sketch:type=\"MSLayerGroup\" stroke=\"#747474\" stroke-opacity=\"0.198794158\" fill=\"#FFFFFF\" fill-opacity=\"0.816519475\">\n          <path d=\"M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z\" id=\"Oval-2\" sketch:type=\"MSShapeGroup\"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>",
                drop: function () {
                    return this.element.classList.remove("dz-drag-hover")
                },
                dragstart: function () {
                },
                dragend: function () {
                    return this.element.classList.remove("dz-drag-hover")
                },
                dragenter: function () {
                    return this.element.classList.add("dz-drag-hover")
                },
                dragover: function () {
                    return this.element.classList.add("dz-drag-hover")
                },
                dragleave: function () {
                    return this.element.classList.remove("dz-drag-hover")
                },
                paste: function () {
                },
                reset: function () {
                    return this.element.classList.remove("dz-started")
                },
                addedfile: function (d) {
                    var u = this;
                    if (this.element === this.previewsContainer && this.element.classList.add("dz-started"), this.previewsContainer) {
                        d.previewElement = a.createElement(this.options.previewTemplate.trim()), d.previewTemplate = d.previewElement, this.previewsContainer.appendChild(d.previewElement);
                        for (var p = d.previewElement.querySelectorAll("[data-dz-name]"), m = !0, h = 0, p = p; ;) {
                            var g;
                            if (h >= p.length) break;
                            g = p[h++];
                            var f = g;
                            f.textContent = d.name
                        }
                        for (var k = d.previewElement.querySelectorAll("[data-dz-size]"), y = !0, F = 0, k = k; ;) {
                            if (F >= k.length) break;
                            f = k[F++];
                            f.innerHTML = this.filesize(d.size)
                        }
                        this.options.addRemoveLinks && (d._removeLink = a.createElement("<a class=\"dz-remove\" href=\"javascript:undefined;\" data-dz-remove>" + this.options.dictRemoveFile + "</a>"), d.previewElement.appendChild(d._removeLink));
                        for (var b = function (L) {
                            return L.preventDefault(), L.stopPropagation(), d.status === a.UPLOADING ? a.confirm(u.options.dictCancelUploadConfirmation, function () {
                                return u.removeFile(d)
                            }) : u.options.dictRemoveFileConfirmation ? a.confirm(u.options.dictRemoveFileConfirmation, function () {
                                return u.removeFile(d)
                            }) : u.removeFile(d)
                        }, E = d.previewElement.querySelectorAll("[data-dz-remove]"), C = !0, z = 0, E = E; ;) {
                            var w;
                            if (z >= E.length) break;
                            w = E[z++];
                            var _ = w;
                            _.addEventListener("click", b)
                        }
                    }
                },
                removedfile: function (d) {
                    return null != d.previewElement && null != d.previewElement.parentNode && d.previewElement.parentNode.removeChild(d.previewElement), this._updateMaxFilesReachedClass()
                },
                thumbnail: function (d, u) {
                    if (d.previewElement) {
                        d.previewElement.classList.remove("dz-file-preview");
                        for (var p = d.previewElement.querySelectorAll("[data-dz-thumbnail]"), m = !0, h = 0, p = p; ;) {
                            var g;
                            if (h >= p.length) break;
                            g = p[h++];
                            var f = g;
                            f.alt = d.name, f.src = u
                        }
                        return setTimeout(function () {
                            return d.previewElement.classList.add("dz-image-preview")
                        }, 1)
                    }
                },
                error: function (d, u) {
                    if (d.previewElement) {
                        d.previewElement.classList.add("dz-error"), "String" != typeof u && u.error && (u = u.error);
                        for (var p = d.previewElement.querySelectorAll("[data-dz-errormessage]"), m = !0, h = 0, p = p; ;) {
                            var g;
                            if (h >= p.length) break;
                            g = p[h++];
                            var f = g;
                            f.textContent = u
                        }
                    }
                },
                errormultiple: function () {
                },
                processing: function (d) {
                    if (d.previewElement && (d.previewElement.classList.add("dz-processing"), d._removeLink)) return d._removeLink.textContent = this.options.dictCancelUpload
                },
                processingmultiple: function () {
                },
                uploadprogress: function (d, u) {
                    if (d.previewElement) for (var m = d.previewElement.querySelectorAll("[data-dz-uploadprogress]"), h = !0, g = 0, m = m; ;) {
                        var f;
                        if (g >= m.length) break;
                        f = m[g++];
                        var k = f;
                        "PROGRESS" === k.nodeName ? k.value = u : k.style.width = u + "%"
                    }
                },
                totaluploadprogress: function () {
                },
                sending: function () {
                },
                sendingmultiple: function () {
                },
                success: function (d) {
                    if (d.previewElement) return d.previewElement.classList.add("dz-success")
                },
                successmultiple: function () {
                },
                canceled: function (d) {
                    return this.emit("error", d, this.options.dictUploadCanceled)
                },
                canceledmultiple: function () {
                },
                complete: function (d) {
                    if (d._removeLink && (d._removeLink.textContent = this.options.dictRemoveFile), d.previewElement) return d.previewElement.classList.add("dz-complete")
                },
                completemultiple: function () {
                },
                maxfilesexceeded: function () {
                },
                maxfilesreached: function () {
                },
                queuecomplete: function () {
                },
                addedfiles: function () {
                }
            }, this.prototype._thumbnailQueue = [], this.prototype._processingThumbnail = !1
        }
    }, {
        key: "extend", value: function (s) {
            for (var d = arguments.length, u = Array(1 < d ? d - 1 : 0), p = 1; p < d; p++) u[p - 1] = arguments[p];
            for (var m = u, h = !0, g = 0, m = m; ;) {
                var f;
                if (g >= m.length) break;
                f = m[g++];
                var k = f;
                for (var y in k) {
                    var F = k[y];
                    s[y] = F
                }
            }
            return s
        }
    }]), _createClass(a, [{
        key: "getAcceptedFiles", value: function () {
            return this.files.filter(function (s) {
                return s.accepted
            }).map(function (s) {
                return s
            })
        }
    }, {
        key: "getRejectedFiles", value: function () {
            return this.files.filter(function (s) {
                return !s.accepted
            }).map(function (s) {
                return s
            })
        }
    }, {
        key: "getFilesWithStatus", value: function (s) {
            return this.files.filter(function (d) {
                return d.status === s
            }).map(function (d) {
                return d
            })
        }
    }, {
        key: "getQueuedFiles", value: function () {
            return this.getFilesWithStatus(a.QUEUED)
        }
    }, {
        key: "getUploadingFiles", value: function () {
            return this.getFilesWithStatus(a.UPLOADING)
        }
    }, {
        key: "getAddedFiles", value: function () {
            return this.getFilesWithStatus(a.ADDED)
        }
    }, {
        key: "getActiveFiles", value: function () {
            return this.files.filter(function (s) {
                return s.status === a.UPLOADING || s.status === a.QUEUED
            }).map(function (s) {
                return s
            })
        }
    }, {
        key: "init", value: function () {
            var s = this;
            if ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(a.createElement("<div class=\"dz-default dz-message\"><span>" + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length) {
                var d = function k() {
                    return s.hiddenFileInput && s.hiddenFileInput.parentNode.removeChild(s.hiddenFileInput), s.hiddenFileInput = document.createElement("input"), s.hiddenFileInput.setAttribute("type", "file"), (null === s.options.maxFiles || 1 < s.options.maxFiles) && s.hiddenFileInput.setAttribute("multiple", "multiple"), s.hiddenFileInput.className = "dz-hidden-input", null !== s.options.acceptedFiles && s.hiddenFileInput.setAttribute("accept", s.options.acceptedFiles), null !== s.options.capture && s.hiddenFileInput.setAttribute("capture", s.options.capture), s.hiddenFileInput.style.visibility = "hidden", s.hiddenFileInput.style.position = "absolute", s.hiddenFileInput.style.top = "0", s.hiddenFileInput.style.left = "0", s.hiddenFileInput.style.height = "0", s.hiddenFileInput.style.width = "0", document.querySelector(s.options.hiddenInputContainer).appendChild(s.hiddenFileInput), s.hiddenFileInput.addEventListener("change", function () {
                        var y = s.hiddenFileInput.files;
                        if (y.length) for (var F = y, b = !0, E = 0, F = F; ;) {
                            var C;
                            if (E >= F.length) break;
                            C = F[E++];
                            var z = C;
                            s.addFile(z)
                        }
                        return s.emit("addedfiles", y), k()
                    })
                };
                d()
            }
            this.URL = null === window.URL ? window.webkitURL : window.URL;
            for (var u = this.events, p = !0, m = 0, u = u; ;) {
                var h;
                if (m >= u.length) break;
                h = u[m++];
                var g = h;
                this.on(g, this.options[g])
            }
            this.on("uploadprogress", function () {
                return s.updateTotalUploadProgress()
            }), this.on("removedfile", function () {
                return s.updateTotalUploadProgress()
            }), this.on("canceled", function (k) {
                return s.emit("complete", k)
            }), this.on("complete", function () {
                if (0 === s.getAddedFiles().length && 0 === s.getUploadingFiles().length && 0 === s.getQueuedFiles().length) return setTimeout(function () {
                    return s.emit("queuecomplete")
                }, 0)
            });
            var f = function (y) {
                return y.stopPropagation(), y.preventDefault ? y.preventDefault() : y.returnValue = !1
            };
            return this.listeners = [{
                element: this.element, events: {
                    dragstart: function (y) {
                        return s.emit("dragstart", y)
                    }, dragenter: function (y) {
                        return f(y), s.emit("dragenter", y)
                    }, dragover: function (y) {
                        var F;
                        try {
                            F = y.dataTransfer.effectAllowed
                        } catch (b) {
                        }
                        return y.dataTransfer.dropEffect = "move" === F || "linkMove" === F ? "move" : "copy", f(y), s.emit("dragover", y)
                    }, dragleave: function (y) {
                        return s.emit("dragleave", y)
                    }, drop: function (y) {
                        return f(y), s.drop(y)
                    }, dragend: function (y) {
                        return s.emit("dragend", y)
                    }
                }
            }], this.clickableElements.forEach(function (k) {
                return s.listeners.push({
                    element: k, events: {
                        click: function (F) {
                            return (k !== s.element || F.target === s.element || a.elementInside(F.target, s.element.querySelector(".dz-message"))) && s.hiddenFileInput.click(), !0
                        }
                    }
                })
            }), this.enable(), this.options.init.call(this)
        }
    }, {
        key: "destroy", value: function () {
            return this.disable(), this.removeAllFiles(!0), (null == this.hiddenFileInput ? void 0 : this.hiddenFileInput.parentNode) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone, a.instances.splice(a.instances.indexOf(this), 1)
        }
    }, {
        key: "updateTotalUploadProgress", value: function () {
            var s, d = 0, u = 0, p = this.getActiveFiles();
            if (p.length) {
                for (var m = this.getActiveFiles(), h = !0, g = 0, m = m; ;) {
                    var f;
                    if (g >= m.length) break;
                    f = m[g++];
                    var k = f;
                    d += k.upload.bytesSent, u += k.upload.total
                }
                s = 100 * d / u
            } else s = 100;
            return this.emit("totaluploadprogress", s, u, d)
        }
    }, {
        key: "_getParamName", value: function (s) {
            return "function" == typeof this.options.paramName ? this.options.paramName(s) : "" + this.options.paramName + (this.options.uploadMultiple ? "[" + s + "]" : "")
        }
    }, {
        key: "_renameFile", value: function (s) {
            return "function" == typeof this.options.renameFile ? this.options.renameFile(s) : s.name
        }
    }, {
        key: "getFallbackForm", value: function () {
            var s, d;
            if (s = this.getExistingFallback()) return s;
            var u = "<div class=\"dz-fallback\">";
            this.options.dictFallbackText && (u += "<p>" + this.options.dictFallbackText + "</p>"), u += "<input type=\"file\" name=\"" + this._getParamName(0) + "\" " + (this.options.uploadMultiple ? "multiple=\"multiple\"" : void 0) + " /><input type=\"submit\" value=\"Upload!\"></div>";
            var p = a.createElement(u);
            return "FORM" === this.element.tagName ? (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)) : (d = a.createElement("<form action=\"" + this.options.url + "\" enctype=\"multipart/form-data\" method=\"" + this.options.method + "\"></form>"), d.appendChild(p)), null == d ? p : d
        }
    }, {
        key: "getExistingFallback", value: function () {
            for (var s = function (g) {
                for (var f = g, k = !0, y = 0, f = f; ;) {
                    var F;
                    if (y >= f.length) break;
                    F = f[y++];
                    var b = F;
                    if (/(^| )fallback($| )/.test(b.className)) return b
                }
            }, d = ["div", "form"], u = 0; u < d.length; u++) {
                var m, p = d[u];
                if (m = s(this.element.getElementsByTagName(p))) return m
            }
        }
    }, {
        key: "setupEventListeners", value: function () {
            return this.listeners.map(function (s) {
                return function () {
                    var d = [];
                    for (var u in s.events) {
                        var p = s.events[u];
                        d.push(s.element.addEventListener(u, p, !1))
                    }
                    return d
                }()
            })
        }
    }, {
        key: "removeEventListeners", value: function () {
            return this.listeners.map(function (s) {
                return function () {
                    var d = [];
                    for (var u in s.events) {
                        var p = s.events[u];
                        d.push(s.element.removeEventListener(u, p, !1))
                    }
                    return d
                }()
            })
        }
    }, {
        key: "disable", value: function () {
            var s = this;
            return this.clickableElements.forEach(function (d) {
                return d.classList.remove("dz-clickable")
            }), this.removeEventListeners(), this.disabled = !0, this.files.map(function (d) {
                return s.cancelUpload(d)
            })
        }
    }, {
        key: "enable", value: function () {
            return delete this.disabled, this.clickableElements.forEach(function (s) {
                return s.classList.add("dz-clickable")
            }), this.setupEventListeners()
        }
    }, {
        key: "filesize", value: function (s) {
            var d = 0, u = "b";
            if (0 < s) {
                for (var p = ["tb", "gb", "mb", "kb", "b"], m = 0; m < p.length; m++) {
                    var h = p[m], g = Math.pow(this.options.filesizeBase, 4 - m) / 10;
                    if (s >= g) {
                        d = s / Math.pow(this.options.filesizeBase, 4 - m), u = h;
                        break
                    }
                }
                d = Math.round(10 * d) / 10
            }
            return "<strong>" + d + "</strong> " + this.options.dictFileSizeUnits[u]
        }
    }, {
        key: "_updateMaxFilesReachedClass", value: function () {
            return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
        }
    }, {
        key: "drop", value: function (s) {
            if (s.dataTransfer) {
                this.emit("drop", s);
                var d = s.dataTransfer.files;
                if (this.emit("addedfiles", d), d.length) {
                    var u = s.dataTransfer.items;
                    u && u.length && null != u[0].webkitGetAsEntry ? this._addFilesFromItems(u) : this.handleFiles(d)
                }
            }
        }
    }, {
        key: "paste", value: function (s) {
            if (null != __guard__(null == s ? void 0 : s.clipboardData, function (u) {
                return u.items
            })) {
                this.emit("paste", s);
                var d = s.clipboardData.items;
                if (d.length) return this._addFilesFromItems(d)
            }
        }
    }, {
        key: "handleFiles", value: function (s) {
            for (var d = s, u = !0, p = 0, d = d; ;) {
                var m;
                if (p >= d.length) break;
                m = d[p++];
                var h = m;
                this.addFile(h)
            }
        }
    }, {
        key: "_addFilesFromItems", value: function (s) {
            var d = this;
            return function () {
                for (var u = [], p = s, m = !0, h = 0, p = p; ;) {
                    var g;
                    if (h >= p.length) break;
                    g = p[h++];
                    var k, f = g;
                    null != f.webkitGetAsEntry && (k = f.webkitGetAsEntry()) ? k.isFile ? u.push(d.addFile(f.getAsFile())) : k.isDirectory ? u.push(d._addFilesFromDirectory(k, k.name)) : u.push(void 0) : null == f.getAsFile ? u.push(void 0) : null == f.kind || "file" === f.kind ? u.push(d.addFile(f.getAsFile())) : u.push(void 0)
                }
                return u
            }()
        }
    }, {
        key: "_addFilesFromDirectory", value: function (s, d) {
            var u = this, p = s.createReader(), m = function (f) {
                return __guardMethod__(console, "log", function (k) {
                    return k.log(f)
                })
            };
            return function g() {
                return p.readEntries(function (f) {
                    if (0 < f.length) {
                        for (var k = f, y = !0, F = 0, k = k; ;) {
                            var b;
                            if (F >= k.length) break;
                            b = k[F++];
                            var E = b;
                            E.isFile ? E.file(function (C) {
                                if (!(u.options.ignoreHiddenFiles && "." === C.name.substring(0, 1))) return C.fullPath = d + "/" + C.name, u.addFile(C)
                            }) : E.isDirectory && u._addFilesFromDirectory(E, d + "/" + E.name)
                        }
                        g()
                    }
                    return null
                }, m)
            }()
        }
    }, {
        key: "accept", value: function (s, d) {
            return s.size > 1024 * (1024 * this.options.maxFilesize) ? d(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(s.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : a.isValidFile(s, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (d(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", s)) : this.options.accept.call(this, s, d) : d(this.options.dictInvalidFileType)
        }
    }, {
        key: "addFile", value: function (s) {
            var d = this;
            return s.upload = {
                uuid: a.uuidv4(),
                progress: 0,
                total: s.size,
                bytesSent: 0,
                filename: this._renameFile(s),
                chunked: this.options.chunking && (this.options.forceChunking || s.size > this.options.chunkSize),
                totalChunkCount: Math.ceil(s.size / this.options.chunkSize)
            }, this.files.push(s), s.status = a.ADDED, this.emit("addedfile", s), this._enqueueThumbnail(s), this.accept(s, function (u) {
                return u ? (s.accepted = !1, d._errorProcessing([s], u)) : (s.accepted = !0, d.options.autoQueue && d.enqueueFile(s)), d._updateMaxFilesReachedClass()
            })
        }
    }, {
        key: "enqueueFiles", value: function (s) {
            for (var d = s, u = !0, p = 0, d = d; ;) {
                var m;
                if (p >= d.length) break;
                m = d[p++];
                var h = m;
                this.enqueueFile(h)
            }
            return null
        }
    }, {
        key: "enqueueFile", value: function (s) {
            var d = this;
            if (s.status !== a.ADDED || !0 !== s.accepted) throw new Error("This file can't be queued because it has already been processed or was rejected."); else if (s.status = a.QUEUED, this.options.autoProcessQueue) return setTimeout(function () {
                return d.processQueue()
            }, 0)
        }
    }, {
        key: "_enqueueThumbnail", value: function (s) {
            var d = this;
            if (this.options.createImageThumbnails && s.type.match(/image.*/) && s.size <= 1024 * (1024 * this.options.maxThumbnailFilesize)) return this._thumbnailQueue.push(s), setTimeout(function () {
                return d._processThumbnailQueue()
            }, 0)
        }
    }, {
        key: "_processThumbnailQueue", value: function () {
            var s = this;
            if (!(this._processingThumbnail || 0 === this._thumbnailQueue.length)) {
                this._processingThumbnail = !0;
                var d = this._thumbnailQueue.shift();
                return this.createThumbnail(d, this.options.thumbnailWidth, this.options.thumbnailHeight, this.options.thumbnailMethod, !0, function (u) {
                    return s.emit("thumbnail", d, u), s._processingThumbnail = !1, s._processThumbnailQueue()
                })
            }
        }
    }, {
        key: "removeFile", value: function (s) {
            if (s.status === a.UPLOADING && this.cancelUpload(s), this.files = without(this.files, s), this.emit("removedfile", s), 0 === this.files.length) return this.emit("reset")
        }
    }, {
        key: "removeAllFiles", value: function (s) {
            null == s && (s = !1);
            for (var d = this.files.slice(), u = !0, p = 0, d = d; ;) {
                var m;
                if (p >= d.length) break;
                m = d[p++];
                var h = m;
                (h.status !== a.UPLOADING || s) && this.removeFile(h)
            }
            return null
        }
    }, {
        key: "resizeImage", value: function (s, d, u, p, m) {
            var h = this;
            return this.createThumbnail(s, d, u, p, !1, function (g, f) {
                if (null == f) return m(s);
                var k = h.options.resizeMimeType;
                null == k && (k = s.type);
                var y = f.toDataURL(k, h.options.resizeQuality);
                return ("image/jpeg" === k || "image/jpg" === k) && (y = ExifRestore.restore(s.dataURL, y)), m(a.dataURItoBlob(y))
            })
        }
    }, {
        key: "createThumbnail", value: function (s, d, u, p, m, h) {
            var g = this, f = new FileReader;
            return f.onload = function () {
                return s.dataURL = f.result, "image/svg+xml" === s.type ? void(null != h && h(f.result)) : g.createThumbnailFromUrl(s, d, u, p, m, h)
            }, f.readAsDataURL(s)
        }
    }, {
        key: "createThumbnailFromUrl", value: function (s, d, u, p, m, h, g) {
            var f = this, k = document.createElement("img");
            return g && (k.crossOrigin = g), k.onload = function () {
                var y = function (b) {
                    return b(1)
                };
                return "undefined" != typeof EXIF && null !== EXIF && m && (y = function (b) {
                    return EXIF.getData(k, function () {
                        return b(EXIF.getTag(this, "Orientation"))
                    })
                }), y(function (F) {
                    s.width = k.width, s.height = k.height;
                    var b = f.options.resize.call(f, s, d, u, p), E = document.createElement("canvas"),
                        C = E.getContext("2d");
                    E.width = b.trgWidth, E.height = b.trgHeight, 4 < F && (E.width = b.trgHeight, E.height = b.trgWidth), 2 === F ? (C.translate(E.width, 0), C.scale(-1, 1)) : 3 === F ? (C.translate(E.width, E.height), C.rotate(Math.PI)) : 4 === F ? (C.translate(0, E.height), C.scale(1, -1)) : 5 === F ? (C.rotate(0.5 * Math.PI), C.scale(1, -1)) : 6 === F ? (C.rotate(0.5 * Math.PI), C.translate(0, -E.height)) : 7 === F ? (C.rotate(0.5 * Math.PI), C.translate(E.width, -E.height), C.scale(-1, 1)) : 8 === F ? (C.rotate(-0.5 * Math.PI), C.translate(-E.width, 0)) : void 0, drawImageIOSFix(C, k, null == b.srcX ? 0 : b.srcX, null == b.srcY ? 0 : b.srcY, b.srcWidth, b.srcHeight, null == b.trgX ? 0 : b.trgX, null == b.trgY ? 0 : b.trgY, b.trgWidth, b.trgHeight);
                    var z = E.toDataURL("image/png");
                    if (null != h) return h(z, E)
                })
            }, null != h && (k.onerror = h), k.src = s.dataURL
        }
    }, {
        key: "processQueue", value: function () {
            var s = this.options.parallelUploads, d = this.getUploadingFiles().length, u = d;
            if (!(d >= s)) {
                var p = this.getQueuedFiles();
                if (0 < p.length) {
                    if (this.options.uploadMultiple) return this.processFiles(p.slice(0, s - d));
                    for (; u < s;) {
                        if (!p.length) return;
                        this.processFile(p.shift()), u++
                    }
                }
            }
        }
    }, {
        key: "processFile", value: function (s) {
            return this.processFiles([s])
        }
    }, {
        key: "processFiles", value: function (s) {
            for (var d = s, u = !0, p = 0, d = d; ;) {
                var m;
                if (p >= d.length) break;
                m = d[p++];
                var h = m;
                h.processing = !0, h.status = a.UPLOADING, this.emit("processing", h)
            }
            return this.options.uploadMultiple && this.emit("processingmultiple", s), this.uploadFiles(s)
        }
    }, {
        key: "_getFilesWithXhr", value: function (s) {
            var d;
            return d = this.files.filter(function (u) {
                return u.xhr === s
            }).map(function (u) {
                return u
            })
        }
    }, {
        key: "cancelUpload", value: function (s) {
            if (s.status === a.UPLOADING) {
                for (var d = this._getFilesWithXhr(s.xhr), u = d, p = !0, m = 0, u = u; ;) {
                    var h;
                    if (m >= u.length) break;
                    h = u[m++];
                    var g = h;
                    g.status = a.CANCELED
                }
                "undefined" != typeof s.xhr && s.xhr.abort();
                for (var f = d, k = !0, y = 0, f = f; ;) {
                    var F;
                    if (y >= f.length) break;
                    F = f[y++];
                    var b = F;
                    this.emit("canceled", b)
                }
                this.options.uploadMultiple && this.emit("canceledmultiple", d)
            } else (s.status === a.ADDED || s.status === a.QUEUED) && (s.status = a.CANCELED, this.emit("canceled", s), this.options.uploadMultiple && this.emit("canceledmultiple", [s]));
            return this.options.autoProcessQueue ? this.processQueue() : void 0
        }
    }, {
        key: "resolveOption", value: function (s) {
            if ("function" == typeof s) {
                for (var d = arguments.length, u = Array(1 < d ? d - 1 : 0), p = 1; p < d; p++) u[p - 1] = arguments[p];
                return s.apply(this, u)
            }
            return s
        }
    }, {
        key: "uploadFile", value: function (s) {
            return this.uploadFiles([s])
        }
    }, {
        key: "uploadFiles", value: function (s) {
            var d = this;
            this._transformFiles(s, function (u) {
                if (s[0].upload.chunked) {
                    var p = s[0], m = u[0], h = 0;
                    p.upload.chunks = [];
                    var g = function () {
                        for (var b = 0; void 0 !== p.upload.chunks[b];) b++;
                        if (!(b >= p.upload.totalChunkCount)) {
                            h++;
                            var E = b * d.options.chunkSize, C = Math.min(E + d.options.chunkSize, p.size), z = {
                                name: d._getParamName(0),
                                data: m.webkitSlice ? m.webkitSlice(E, C) : m.slice(E, C),
                                filename: p.upload.filename,
                                chunkIndex: b
                            };
                            p.upload.chunks[b] = {
                                file: p,
                                index: b,
                                dataBlock: z,
                                status: a.UPLOADING,
                                progress: 0,
                                retries: 0
                            }, d._uploadData(s, [z])
                        }
                    };
                    if (p.upload.finishedChunkUpload = function (F) {
                        var b = !0;
                        F.status = a.SUCCESS, F.dataBlock = null;
                        for (var E = 0; E < p.upload.totalChunkCount; E++) {
                            if (void 0 === p.upload.chunks[E]) return g();
                            p.upload.chunks[E].status !== a.SUCCESS && (b = !1)
                        }
                        b && d.options.chunksUploaded(p, function () {
                            d._finished(s, "", null)
                        })
                    }, d.options.parallelChunkUploads) for (var f = 0; f < p.upload.totalChunkCount; f++) g(); else g()
                } else {
                    for (var k = [], y = 0; y < s.length; y++) k[y] = {
                        name: d._getParamName(y),
                        data: u[y],
                        filename: s[y].upload.filename
                    };
                    d._uploadData(s, k)
                }
            })
        }
    }, {
        key: "_getChunk", value: function (s, d) {
            for (var u = 0; u < s.upload.totalChunkCount; u++) if (void 0 !== s.upload.chunks[u] && s.upload.chunks[u].xhr === d) return s.upload.chunks[u]
        }
    }, {
        key: "_uploadData", value: function (s, d) {
            for (var u = this, p = new XMLHttpRequest, m = s, h = !0, g = 0, m = m; ;) {
                var f;
                if (g >= m.length) break;
                f = m[g++];
                var k = f;
                k.xhr = p
            }
            s[0].upload.chunked && (s[0].upload.chunks[d[0].chunkIndex].xhr = p);
            var y = this.resolveOption(this.options.method, s), F = this.resolveOption(this.options.url, s);
            p.open(y, F, !0), p.timeout = this.resolveOption(this.options.timeout, s), p.withCredentials = !!this.options.withCredentials, p.onload = function (N) {
                u._finishedUploading(s, p, N)
            }, p.onerror = function () {
                u._handleUploadError(s, p)
            };
            var b = null == p.upload ? p : p.upload;
            b.onprogress = function (N) {
                return u._updateFilesUploadProgress(s, p, N)
            };
            var E = {Accept: "application/json", "Cache-Control": "no-cache", "X-Requested-With": "XMLHttpRequest"};
            for (var C in this.options.headers && a.extend(E, this.options.headers), E) {
                var z = E[C];
                z && p.setRequestHeader(C, z)
            }
            var w = new FormData;
            if (this.options.params) {
                var _ = this.options.params;
                for (var S in"function" == typeof _ && (_ = _.call(this, s, p, s[0].upload.chunked ? this._getChunk(s[0], p) : null)), _) {
                    var L = _[S];
                    w.append(S, L)
                }
            }
            for (var U = s, A = !0, T = 0, U = U; ;) {
                var D;
                if (T >= U.length) break;
                D = U[T++];
                var I = D;
                this.emit("sending", I, p, w)
            }
            this.options.uploadMultiple && this.emit("sendingmultiple", s, p, w), this._addFormElementData(w);
            for (var R, M = 0; M < d.length; M++) R = d[M], w.append(R.name, R.data, R.filename);
            this.submitRequest(p, w, s)
        }
    }, {
        key: "_transformFiles", value: function (s, d) {
            for (var u = this, p = [], m = 0, h = function (k) {
                u.options.transformFile.call(u, s[k], function (y) {
                    p[k] = y, ++m === s.length && d(p)
                })
            }, g = 0; g < s.length; g++) h(g)
        }
    }, {
        key: "_addFormElementData", value: function (s) {
            if ("FORM" === this.element.tagName) for (var d = this.element.querySelectorAll("input, textarea, select, button"), u = !0, p = 0, d = d; ;) {
                var m;
                if (p >= d.length) break;
                m = d[p++];
                var h = m, g = h.getAttribute("name"), f = h.getAttribute("type");
                if (f && (f = f.toLowerCase()), "undefined" != typeof g && null !== g) if ("SELECT" === h.tagName && h.hasAttribute("multiple")) for (var k = h.options, y = !0, F = 0, k = k; ;) {
                    var b;
                    if (F >= k.length) break;
                    b = k[F++];
                    var E = b;
                    E.selected && s.append(g, E.value)
                } else (!f || "checkbox" !== f && "radio" !== f || h.checked) && s.append(g, h.value)
            }
        }
    }, {
        key: "_updateFilesUploadProgress", value: function (s, d, u) {
            var p;
            if ("undefined" != typeof u) {
                if (p = 100 * u.loaded / u.total, s[0].upload.chunked) {
                    var m = s[0], h = this._getChunk(m, d);
                    h.progress = p, h.total = u.total, h.bytesSent = u.loaded;
                    m.upload.progress = 0, m.upload.total = 0, m.upload.bytesSent = 0;
                    for (var y = 0; y < m.upload.totalChunkCount; y++) void 0 !== m.upload.chunks[y] && void 0 !== m.upload.chunks[y].progress && (m.upload.progress += m.upload.chunks[y].progress, m.upload.total += m.upload.chunks[y].total, m.upload.bytesSent += m.upload.chunks[y].bytesSent);
                    m.upload.progress /= m.upload.totalChunkCount
                } else for (var F = s, b = !0, E = 0, F = F; ;) {
                    var C;
                    if (E >= F.length) break;
                    C = F[E++];
                    var z = C;
                    z.upload.progress = p, z.upload.total = u.total, z.upload.bytesSent = u.loaded
                }
                for (var w = s, _ = !0, S = 0, w = w; ;) {
                    var L;
                    if (S >= w.length) break;
                    L = w[S++];
                    var U = L;
                    this.emit("uploadprogress", U, U.upload.progress, U.upload.bytesSent)
                }
            } else {
                var A = !0;
                p = 100;
                for (var T = s, D = !0, I = 0, T = T; ;) {
                    var M;
                    if (I >= T.length) break;
                    M = T[I++];
                    var R = M;
                    (100 !== R.upload.progress || R.upload.bytesSent !== R.upload.total) && (A = !1), R.upload.progress = p, R.upload.bytesSent = R.upload.total
                }
                if (A) return;
                for (var N = s, P = !0, O = 0, N = N; ;) {
                    var q;
                    if (O >= N.length) break;
                    q = N[O++];
                    var Q = q;
                    this.emit("uploadprogress", Q, p, Q.upload.bytesSent)
                }
            }
        }
    }, {
        key: "_finishedUploading", value: function (s, d, u) {
            var p;
            if (s[0].status !== a.CANCELED && 4 === d.readyState) {
                if ("arraybuffer" !== d.responseType && "blob" !== d.responseType && (p = d.responseText, d.getResponseHeader("content-type") && ~d.getResponseHeader("content-type").indexOf("application/json"))) try {
                    p = JSON.parse(p)
                } catch (m) {
                    u = m, p = "Invalid JSON response from server."
                }
                this._updateFilesUploadProgress(s), 200 <= d.status && 300 > d.status ? s[0].upload.chunked ? s[0].upload.finishedChunkUpload(this._getChunk(s[0], d)) : this._finished(s, p, u) : this._handleUploadError(s, d, p)
            }
        }
    }, {
        key: "_handleUploadError", value: function (s, d, u) {
            if (s[0].status !== a.CANCELED) {
                if (s[0].upload.chunked && this.options.retryChunks) {
                    var p = this._getChunk(s[0], d);
                    if (p.retries++ < this.options.retryChunksLimit) return void this._uploadData(s, [p.dataBlock]);
                    console.warn("Retried this chunk too often. Giving up.")
                }
                for (var m = s, h = !0, g = 0, m = m; ;) {
                    var f;
                    if (g >= m.length) break;
                    f = m[g++];
                    this._errorProcessing(s, u || this.options.dictResponseError.replace("{{statusCode}}", d.status), d)
                }
            }
        }
    }, {
        key: "submitRequest", value: function (s, d) {
            s.send(d)
        }
    }, {
        key: "_finished", value: function (s, d, u) {
            for (var p = s, m = !0, h = 0, p = p; ;) {
                var g;
                if (h >= p.length) break;
                g = p[h++];
                var f = g;
                f.status = a.SUCCESS, this.emit("success", f, d, u), this.emit("complete", f)
            }
            if (this.options.uploadMultiple && (this.emit("successmultiple", s, d, u), this.emit("completemultiple", s)), this.options.autoProcessQueue) return this.processQueue()
        }
    }, {
        key: "_errorProcessing", value: function (s, d, u) {
            for (var p = s, m = !0, h = 0, p = p; ;) {
                var g;
                if (h >= p.length) break;
                g = p[h++];
                var f = g;
                f.status = a.ERROR, this.emit("error", f, d, u), this.emit("complete", f)
            }
            if (this.options.uploadMultiple && (this.emit("errormultiple", s, d, u), this.emit("completemultiple", s)), this.options.autoProcessQueue) return this.processQueue()
        }
    }], [{
        key: "uuidv4", value: function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (s) {
                var d = 0 | 16 * Math.random(), u = "x" === s ? d : 8 | 3 & d;
                return u.toString(16)
            })
        }
    }]), a
}(Emitter);
Dropzone.initClass(), Dropzone.version = "5.3.0", Dropzone.options = {}, Dropzone.optionsForElement = function (t) {
    return t.getAttribute("id") ? Dropzone.options[camelize(t.getAttribute("id"))] : void 0
}, Dropzone.instances = [], Dropzone.forElement = function (t) {
    if ("string" == typeof t && (t = document.querySelector(t)), null == (null == t ? void 0 : t.dropzone)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
    return t.dropzone
}, Dropzone.autoDiscover = !0, Dropzone.discover = function () {
    var t;
    if (document.querySelectorAll) t = document.querySelectorAll(".dropzone"); else {
        t = [];
        var a = function (s) {
            return function () {
                for (var d = [], u = s, p = !0, m = 0, u = u; ;) {
                    var h;
                    if (m >= u.length) break;
                    h = u[m++];
                    var g = h;
                    /(^| )dropzone($| )/.test(g.className) ? d.push(t.push(g)) : d.push(void 0)
                }
                return d
            }()
        };
        a(document.getElementsByTagName("div")), a(document.getElementsByTagName("form"))
    }
    return function () {
        for (var l = [], s = t, d = !0, u = 0, s = s; ;) {
            var p;
            if (u >= s.length) break;
            p = s[u++];
            var m = p;
            !1 === Dropzone.optionsForElement(m) ? l.push(void 0) : l.push(new Dropzone(m))
        }
        return l
    }()
}, Dropzone.blacklistedBrowsers = [/opera.*(Macintosh|Windows Phone).*version\/12/i], Dropzone.isBrowserSupported = function () {
    var t = !0;
    if (!(window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)) t = !1; else if (!("classList" in document.createElement("a"))) t = !1; else for (var a = Dropzone.blacklistedBrowsers, l = !0, s = 0, a = a; ;) {
        var d;
        if (s >= a.length) break;
        d = a[s++];
        var u = d;
        if (u.test(navigator.userAgent)) {
            t = !1;
            continue
        }
    }
    return t
}, Dropzone.dataURItoBlob = function (t) {
    for (var a = atob(t.split(",")[1]), l = t.split(",")[0].split(":")[1].split(";")[0], s = new ArrayBuffer(a.length), d = new Uint8Array(s), u = 0, p = a.length, m = 0 <= p; m ? u <= p : u >= p; m ? u++ : u--) d[u] = a.charCodeAt(u);
    return new Blob([s], {type: l})
};
var without = function (a, l) {
    return a.filter(function (s) {
        return s !== l
    }).map(function (s) {
        return s
    })
}, camelize = function (a) {
    return a.replace(/[\-_](\w)/g, function (l) {
        return l.charAt(1).toUpperCase()
    })
};
Dropzone.createElement = function (t) {
    var a = document.createElement("div");
    return a.innerHTML = t, a.childNodes[0]
}, Dropzone.elementInside = function (t, a) {
    if (t === a) return !0;
    for (; t = t.parentNode;) if (t === a) return !0;
    return !1
}, Dropzone.getElement = function (t, a) {
    var l;
    if ("string" == typeof t ? l = document.querySelector(t) : null != t.nodeType && (l = t), null == l) throw new Error("Invalid `" + a + "` option provided. Please provide a CSS selector or a plain HTML element.");
    return l
}, Dropzone.getElements = function (t, a) {
    var l, s;
    if (t instanceof Array) {
        s = [];
        try {
            for (var d = t, u = !0, p = 0, d = d; ;) {
                if (p >= d.length) break;
                l = d[p++];
                s.push(this.getElement(l, a))
            }
        } catch (f) {
            s = null
        }
    } else if ("string" == typeof t) {
        s = [];
        for (var m = document.querySelectorAll(t), h = !0, g = 0, m = m; ;) {
            if (g >= m.length) break;
            l = m[g++];
            s.push(l)
        }
    } else null != t.nodeType && (s = [t]);
    if (null == s || !s.length) throw new Error("Invalid `" + a + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
    return s
}, Dropzone.confirm = function (t, a, l) {
    if (window.confirm(t)) return a();
    return null == l ? void 0 : l()
}, Dropzone.isValidFile = function (t, a) {
    if (!a) return !0;
    a = a.split(",");
    for (var l = t.type, s = l.replace(/\/.*$/, ""), d = a, u = !0, p = 0, d = d; ;) {
        var m;
        if (p >= d.length) break;
        m = d[p++];
        var h = m;
        if (h = h.trim(), "." === h.charAt(0)) {
            if (-1 !== t.name.toLowerCase().indexOf(h.toLowerCase(), t.name.length - h.length)) return !0
        } else if (/\/\*$/.test(h)) {
            if (s === h.replace(/\/.*$/, "")) return !0
        } else if (l === h) return !0
    }
    return !1
}, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function (t) {
    return this.each(function () {
        return new Dropzone(this, t)
    })
}), "undefined" != typeof module && null !== module ? module.exports = Dropzone : window.Dropzone = Dropzone, Dropzone.ADDED = "added", Dropzone.QUEUED = "queued", Dropzone.ACCEPTED = Dropzone.QUEUED, Dropzone.UPLOADING = "uploading", Dropzone.PROCESSING = Dropzone.UPLOADING, Dropzone.CANCELED = "canceled", Dropzone.ERROR = "error", Dropzone.SUCCESS = "success";
var detectVerticalSquash = function (a) {
    var l = a.naturalWidth, s = a.naturalHeight, d = document.createElement("canvas");
    d.width = 1, d.height = s;
    var u = d.getContext("2d");
    u.drawImage(a, 0, 0);
    for (var k, p = u.getImageData(1, 0, 1, s), m = p.data, h = 0, g = s, f = s; f > h;) k = m[4 * (f - 1) + 3], 0 === k ? g = f : h = f, f = g + h >> 1;
    var y = f / s;
    return 0 == y ? 1 : y
}, drawImageIOSFix = function (a, l, s, d, u, p, m, h, g, f) {
    var k = detectVerticalSquash(l);
    return a.drawImage(l, s, d, u, p, m, h, g, f / k)
}, ExifRestore = function () {
    function t() {
        _classCallCheck(this, t)
    }

    return _createClass(t, null, [{
        key: "initClass", value: function () {
            this.KEY_STR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        }
    }, {
        key: "encode64", value: function (l) {
            for (var d, u, m, h, g, s = "", p = "", f = "", k = 0; d = l[k++], u = l[k++], p = l[k++], m = d >> 2, h = (3 & d) << 4 | u >> 4, g = (15 & u) << 2 | p >> 6, f = 63 & p, isNaN(u) ? g = f = 64 : isNaN(p) && (f = 64), s = s + this.KEY_STR.charAt(m) + this.KEY_STR.charAt(h) + this.KEY_STR.charAt(g) + this.KEY_STR.charAt(f), d = u = p = "", m = h = g = f = "", !!(k < l.length);) ;
            return s
        }
    }, {
        key: "restore", value: function (l, s) {
            if (!l.match("data:image/jpeg;base64,")) return s;
            var d = this.decode64(l.replace("data:image/jpeg;base64,", "")), u = this.slice2Segments(d),
                p = this.exifManipulation(s, u);
            return "data:image/jpeg;base64," + this.encode64(p)
        }
    }, {
        key: "exifManipulation", value: function (l, s) {
            var d = this.getExifArray(s), u = this.insertExif(l, d), p = new Uint8Array(u);
            return p
        }
    }, {
        key: "getExifArray", value: function (l) {
            for (var s, d = 0; d < l.length;) {
                if (s = l[d], 255 === s[0] & 225 === s[1]) return s;
                d++
            }
            return []
        }
    }, {
        key: "insertExif", value: function (l, s) {
            var d = l.replace("data:image/jpeg;base64,", ""), u = this.decode64(d), p = u.indexOf(255, 3),
                m = u.slice(0, p), h = u.slice(p), g = m;
            return g = g.concat(s), g = g.concat(h), g
        }
    }, {
        key: "slice2Segments", value: function (l) {
            for (var s = 0, d = []; ;) {
                var u;
                if (255 === l[s] & 218 === l[s + 1]) break;
                if (255 === l[s] & 216 === l[s + 1]) s += 2; else {
                    u = 256 * l[s + 2] + l[s + 3];
                    var p = s + u + 2, m = l.slice(s, p);
                    d.push(m), s = p
                }
                if (s > l.length) break
            }
            return d
        }
    }, {
        key: "decode64", value: function (l) {
            var d, u, m, h, g, p = "", f = "", k = 0, y = [], F = /[^A-Za-z0-9\+\/\=]/g;
            for (F.exec(l) && console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."), l = l.replace(/[^A-Za-z0-9\+\/\=]/g, ""); m = this.KEY_STR.indexOf(l.charAt(k++)), h = this.KEY_STR.indexOf(l.charAt(k++)), g = this.KEY_STR.indexOf(l.charAt(k++)), f = this.KEY_STR.indexOf(l.charAt(k++)), d = m << 2 | h >> 4, u = (15 & h) << 4 | g >> 2, p = (3 & g) << 6 | f, y.push(d), 64 !== g && y.push(u), 64 !== f && y.push(p), d = u = p = "", m = h = g = f = "", !!(k < l.length);) ;
            return y
        }
    }]), t
}();
ExifRestore.initClass();
var contentLoaded = function (a, l) {
    var s = !1, d = !0, u = a.document, p = u.documentElement,
        m = u.addEventListener ? "addEventListener" : "attachEvent",
        h = u.addEventListener ? "removeEventListener" : "detachEvent", g = u.addEventListener ? "" : "on",
        f = function y(F) {
            if (("readystatechange" !== F.type || "complete" === u.readyState) && (("load" === F.type ? a : u)[h](g + F.type, y, !1), !s && (s = !0))) return l.call(a, F.type || F)
        }, k = function y() {
            try {
                p.doScroll("left")
            } catch (F) {
                return void setTimeout(y, 50)
            }
            return f("poll")
        };
    if ("complete" !== u.readyState) {
        if (u.createEventObject && p.doScroll) {
            try {
                d = !a.frameElement
            } catch (y) {
            }
            d && k()
        }
        return u[m](g + "DOMContentLoaded", f, !1), u[m](g + "readystatechange", f, !1), a[m](g + "load", f, !1)
    }
};
Dropzone._autoDiscoverFunction = function () {
    if (Dropzone.autoDiscover) return Dropzone.discover()
}, contentLoaded(window, Dropzone._autoDiscoverFunction);

function __guard__(t, a) {
    return "undefined" != typeof t && null !== t ? a(t) : void 0
}

function __guardMethod__(t, a, l) {
    return "undefined" != typeof t && null !== t && "function" == typeof t[a] ? l(t, a) : void 0
}

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
                                var c, g = b.get(0);
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
                            }, 100)
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
                        for (var a = [], b, c, f, n, d = 0; d < e.length; d++) (b = m.translation[e.charAt(d)]) ? (c = b.pattern.toString().replace(/.{1}$|^.{1}/g, ""), f = b.optional, (b = b.recursive) ? (a.push(e.charAt(d)), n = {
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
                                l = 0, k;
                            for (k = g; k < e && c.maskDigitPosMap[k]; k++) m++;
                            for (k = g - 1; 0 <= k && c.maskDigitPosMap[k]; k--) a++;
                            for (k = g - 1; 0 <= k; k--) c.maskDigitPosMap[k] && h++;
                            for (k = f - 1; 0 <= k; k--) c.maskDigitPosMapOld[k] && l++;
                            g > d ? g = 10 * e : f >= g && f !== d ? c.maskDigitPosMapOld[g] || (f = g, g = g - (l - h) - a, c.maskDigitPosMap[g] && (g = f)) : g > f && (g = g + (h - l) + m)
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
                            k = 1, r = "push", p = -1, t = 0, y = [], v, z;
                        f.reverse ? (r = "unshift", k = -1, v = 0, n = h - 1, q = l - 1, z = function () {
                            return -1 < n && -1 < q
                        }) : (v = h - 1, z = function () {
                            return n < h && q < l
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
                    }, mapMaskdigitPositions: function (a, b, e) {
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
                        b.data("mask") && b.attr("autocomplete", "off");
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
                "true" === b.attr("data-mask-selectonfocus") && (e.selectOnFocus = !0);
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
        }, window.jQuery, window.Zepto)
    }

    loadMaskPlugin()
}
if (typeof loadMask !== 'function') {
    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009'
    }, spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options)
        }
    };

    function loadMask($element) {
        $element.find('.telefone').mask(SPMaskBehavior, spOptions);
        $element.find(".rg").mask('9999999999', {reverse: !0});
        $element.find(".ie").mask('999.999.999.999', {reverse: !0});
        $element.find(".cpf").mask('999.999.999-99', {reverse: !0});
        $element.find(".cnpj").mask('99.999.999/9999-99', {reverse: !0});
        $element.find(".cep").mask('99999-999', {reverse: !0});
        $element.find(".valor").mask('#.##0,00', {reverse: !0});
        $element.find('.date_time').mask('00/00/0000 00:00:00')
    }
}
if (typeof openPanel !== 'function') {
    var p = new RegExp(/s$/i);

    function openPanel(entity, $id, value, $this) {
        $this.panel(themeDashboard("<span class='left color-text-grey'>" + (p.test(entity) ? entity.substr(0, (entity.length - 1)) : entity) + "</span>", {
            lib: 'form-crud',
            file: 'api',
            entity: entity,
            id: value
        }, function (idOntab) {
            if (ISDEV)
                console.log("id ontab retorno: \n" + idOntab);
            formSubmit($("#" + idOntab).find(".ontab-content").find(".form-crud"), $id)
        }))
    }
}
if (typeof formGetData !== 'function') {
    function formGetData($form) {
        function checkBox($this, valor) {
            if ($this.hasClass("switchCheck")) {
                return $this.prop("checked") ? 1 : 0
            } else {
                if (!valor)
                    valor = [];
                if ($this.prop("checked"))
                    valor.push(parseInt($this.val())); else valor.removeItem($this.val());
                return valor
            }
        }

        function setDados($this, valor) {
            if ($this.attr("type") === "checkbox") {
                return checkBox($this, valor)
            } else if ($this.attr("type") === "html") {
                return $this.jqteVal()
            } else if ($this.attr("type") === "radio") {
                if ($this.prop("checked"))
                    return $this.val(); else if (valor)
                    return valor
            } else if ($this.is('.telefone, .rg, .ie, .cpf, .cnpj, .cep, .valor, .date_time') && $this.val() !== "") {
                return $this.cleanVal()
            } else {
                return $this.val()
            }
        }

        var dados = {};
        $form.find("input, textarea, select").each(function () {
            if (typeof($(this).attr("data-model")) !== "undefined")
                dados[$(this).attr("data-model")] = setDados($(this), typeof(dados[$(this).attr("data-model")]) !== "undefined" ? dados[$(this).attr("data-model")] : null)
        });
        return dados
    }
}
if (typeof formSubmit !== 'function') {
    var saveTime;
    var isSavingNew = !1;

    function setError($form, erro, novo, t) {
        isSavingNew = !1;
        t = t || "dados.";
        $.each(erro, function (c, mensagem) {
            if (typeof(mensagem) === "object") {
                setError($form, mensagem, novo, t + c + '.')
            } else {
                var color = novo ? "red" : "goldenrod";
                var $input = $form.find("[data-model='" + (t + c) + "']");
                if ($input.attr("data-format") === "radio") {
                    $input.siblings(".md-radio--fake").css("border-color", color);
                    $input.parent().siblings(".radio-title").addClass(color + "-span")
                } else if ($input.attr("data-format") === "list") {
                    $input.parent().parent().prev().addClass(color + "-span");
                    $input.siblings(".listButton").parent().siblings(".rest").find("input[type=text]").siblings('.error-message').remove();
                    $input.parent().siblings(".rest").append('<span class="' + color + '-span error-message">' + mensagem + '</span>')
                } else {
                    $input.siblings('label').addClass(color + "-span");
                    $input.siblings('.error-message').remove();
                    $input.addClass(color + "-subErro").parent().append('<span class="' + color + '-span error-message">' + mensagem + '</span>')
                }
            }
        })
    }

    function cleanError($form) {
        $form.find(".error-span, .red-span, .goldenrod-span, .red-subErro, .goldenrod-subErro").removeClass("red-subErro error-span red-span goldenrod-span goldenrod-subErro");
        $form.find(".error-message").remove();
        $form.find(".md-radio--fake").css("border-color", "initial");
        if ($form.find("#saveFormButton").length)
            $form.find("#saveFormButton").removeClass("disabled").prop("disabled", !1)
    }

    function statusPanel(status, $form) {
        var $header = $form.closest(".ontab").find(".ontab-header");
        $header.find(".ontab-title").css("background", "transparent");
        var $feed = $form.closest(".ontab").find(".ontab-feedback");
        if (status === "change") {
            $feed.text("...").css("color", "#bbb");
            $header.css("background-color", "#eee")
        } else if (status === "error") {
            $feed.text("Corrija os Erros").css("color", "rgba(255,0,0,0.2)");
            $header.css("background-color", "rgba(255,0,0,0.1)")
        } else {
            $feed.text("Salvo").css("color", "rgba(50,205,50,0.4)");
            $header.css("background-color", "rgba(50,205,50,0.2)")
        }
    }

    function reloadForm(entity, dados, id) {

        var $form = $("#form_" + entity).closest(".form-control");
        var $ontab = $form.closest(".ontab");
        var fields = $("#fields-" + entity).val();
        var callback = $("#callbackAction").val();

        if ((!$ontab.length && $form.find("#saveFormButton").length) || !id)
            id = null;

        if ($form.find("#saveFormButton").length) {
            var $btnSave = $("#form_" + entity).find("#saveFormButton");
            var btnClass = $btnSave.attr("class");
            var btnIcon = $btnSave.find("i").html();
            $btnSave.find("i").remove();
            var btnText = $btnSave.text()
        } else {
            var btnClass = "notHaveButton";
            var btnText = "Salvar";
            var btnIcon = ""
        }

        post('form-crud', 'children/form', {
            entity: entity,
            id: id,
            fields: fields,
            callback: callback,
            btnClass: btnClass,
            btnText: btnText,
            btnIcon: btnIcon
        }, function (data) {
            if (data) {

                if ($ontab.length) {
                    $ontab.loading();
                    statusPanel("salvo", $form);
                } else {
                    $form.loading();
                }

                if (id) {
                    var $input = $form.find(":focus");
                    var val = $input.val();
                    var id = $input.attr("id");
                    $form.after(data).remove();
                    if ($ontab.length)
                        $form = $ontab.find("#form_" + entity);
                    else
                        $form = $("body").find("#form_" + entity);

                    $form.find("input[id='" + id + "']").focus().val("").val(val);
                } else {
                    $form.after(data).remove();
                }

                isSavingNew = !1;
                loadForm("#form_" + entity);

                if (callback !== "")
                    window[callback](dados);
                else if (!$form.closest(".ontab").length || $form.find("#saveFormButton").length)
                    toast("Cadastro Salvo!", 3000);
            }
        })
    }

    function formSave($form, save) {
        var dados = formGetData($form);
        isSavingNew = (dados['dados.id'] === "");
        if (ISDEV)
            console.log(dados);
        if ($form.find("#saveFormButton").length)
            $form.find("#saveFormButton").addClass("disabled").prop("disabled", !0);
        post('form-crud', "save/form", {
            entity: $form.attr("data-entity"),
            dados: dados,
            save: typeof(save) !== "undefined" ? save : $form.find("#autoSave").val()
        }, function (data) {
            if (ISDEV)
                console.log(data);
            cleanError($form);
            if (data.error !== null) {
                setError($form, data.error[$form.attr("data-entity")], (dados['dados.id'] === ""));
                statusPanel((dados['dados.id'] === "" ? "error" : "salvo"), $form)
            } else {
                if (data.id !== null && data.id !== "" && data.id > 0) {
                    if (dados['dados.id'] === "") {
                        reloadForm($form.attr("data-entity"), dados, data.id)
                    } else {
                        if ($("#callbackAction").val() !== "")
                            window[$("#callbackAction").val()](dados);
                        statusPanel("salvo", $form);
                        $.each(data.data, function (c, e) {
                            var $input = $form.find("input[data-model='dados." + c + "']");
                            if (!$input.is(":focus") || $input.prop("disaabled") || $input.hasClass("disabled"))
                                $input.val(e)
                        })
                    }
                }
            }
            if (!saveTime)
                window.onbeforeunload = null
        }, ISDEV ? !0 : "undefined")
    }

    function formSaveReturn($form, $idReturn) {
        post('form-crud', "save/form", {entity: $form.attr("data-entity"), dados: formGetData($form)}, function (data) {
            if (data.error !== null) {
                if ($idReturn.val() === "" && $form.find("input[type=hidden][data-model='dados.id']").val() !== "")
                    $idReturn.val($form.find("input[type=hidden][data-model='dados.id']").val()).trigger("change")
            } else if (data.id !== null && data.id !== "" && data.id > 0) {
                if (["list_mult", "extend_mult", "selecao_mult"].indexOf($idReturn.attr("data-format")) > -1) {
                    var title = $form.find("[data-model='dados." + $form.find("input[type=hidden][rel='title']").val() + "']").val();
                    setListMultValue($idReturn, data.id, title)
                } else {
                    $idReturn.val(data.id).trigger("change");
                    if (["list", "selecao"].indexOf($idReturn.attr("data-format")) > -1) {
                        $idReturn.siblings(".listButton").removeClass("color-teal").addClass("color-white").find("i").html("edit");
                        if ($idReturn.parent().siblings(".multFieldsSelect").length) {
                            var $field = $idReturn.parent().next(".rest").find("input[type=text]");
                            requestPreDataToSelecaoUnique(data.id, $field.attr("data-entity"), $field.attr("id"))
                        }
                    }
                    if ($idReturn.val() !== "" && typeof($form.find("input[type=hidden][rel='title']").val()) === "string") {
                        var title = $form.find("[data-model='dados." + $form.find("input[type=hidden][rel='title']").val() + "']").val();
                        $idReturn.parent().siblings(".rest").find("input[type=text]").val(title)
                    }
                }
            }
            window.onbeforeunload = null
        }, ISDEV ? !0 : "undefined")
    }

    function formSubmit($form, $idReturn) {
        clearTimeout(saveTime);
        statusPanel('change', $form);
        window.onbeforeunload = function () {
            clearTimeout(saveTime);
            formSave($form);
            window.onbeforeunload = null;
            return !0
        };
        if (typeof($idReturn) !== "undefined") {
            formSaveReturn($form, $idReturn)
        } else {
            if (!isSavingNew) {
                saveTime = setTimeout(function () {
                    saveTime = null;
                    formSave($form)
                }, 400)
            }
        }
    }
}
if (typeof formAutoSubmit !== 'function') {
    function formAutoSubmit($element) {
        $element.off("click", "#saveFormButton").on("click", "#saveFormButton", function () {
            formSave($(this).closest(".form-crud"), !0)
        }).off("keyup change", ".jqte_editor").on("keyup change", ".jqte_editor", function (e) {
            if (e.which !== undefined && [13, 37, 38, 39, 40, 116].indexOf(e.which) < 0)
                formSubmit($(this).closest(".form-crud"))
        }).off("keyup", "input, textarea, select").on("keyup", "input, textarea, select", function (e) {
            if (e.which !== undefined && [13, 37, 38, 39, 40, 116].indexOf(e.which) < 0 && typeof($(this).attr("data-model")) === "string")
                formSubmit($(this).closest(".form-crud"))
        }).off("change", "input, textarea, select").on("change", "input, textarea, select", function () {
            if (typeof($(this).attr("data-model")) === "string")
                formSubmit($(this).closest(".form-crud"))
        }).off("click", ".listButton").on("click", ".listButton", function () {
            sessionStorage.setItem("new-panel-title", $(this).parent().next().find(".form-list").val());
            openPanel($(this).attr("data-entity"), $(this).siblings('input[type=hidden]'), $(this).siblings('input[type=hidden]').val(), $(this))
        }).off("keypress keydown", "button").on("keypress keydown", "button", function (e) {
            e.preventDefault()
        }).off("keyup", ".form-list").on("keyup", ".form-list", function (e) {
            var $this = $(this);
            if (e.which !== 17) {
                if ([38, 40, 13].indexOf(e.which) > -1) {
                    var $list = $this.siblings(".list-complete");
                    if (e.which === 38) {
                        if ($list.find("li.active").prev().length)
                            $list.find("li.active").removeClass("active").prev().addClass("active")
                    } else if (e.which === 40) {
                        if ($list.find("li.active").next().length)
                            $list.find("li.active").removeClass("active").next().addClass("active")
                    } else if (e.which === 13) {
                        if ($list.html().length) {
                            selectList($list)
                        } else {
                            var $btnBox = $this.parent().prev();
                            var inputHidde = $btnBox.find('input[type=hidden]');
                            sessionStorage.setItem("new-panel-title", $this.val());
                            openPanel($this.attr("data-entity"), inputHidde, inputHidde.val(), $btnBox.find('.listButton'))
                        }
                    }
                } else if ([37, 39].indexOf(e.which) < 0) {
                    var $list = $this.siblings(".list-complete");
                    $("#list-" + $this.attr("id")).removeClass("color-white").addClass("color-teal").find("i").html("add");
                    if ($list.attr("rel") !== "mult")
                        $this.parent().prev().find("input[type=hidden]").val("").trigger("change");
                    clearSelecaoUnique($this);
                    if ($this.val() !== "") {
                        readList($this, $this.attr("data-entity"), $this.attr("data-parent"), $this.val(), $this.attr("id"))
                    } else {
                        $this.siblings(".list-complete").html("")
                    }
                }
            }
        }).off("dblclick", ".form-list").on("dblclick", ".form-list", function () {
            if (!$(this).prop("disabled"))
                readList($(this), $(this).attr("data-entity"), $(this).attr("data-parent"), $(this).val(), $(this).attr("id"))
        }).off("focusout", ".form-list").on("focusout", ".form-list", function () {
            $this = $(this);
            setTimeout(function () {
                $(".list-complete").html("")
            }, 50)
        }).find(".editorHtml").jqte();
        if ($element.find(".dropzone").length) {
            $element.find(".dropzone").each(function () {
                var $this = $(this);
                var $file = $this.siblings("input[type=hidden]");
                var type = $file.attr("data-format");
                new Dropzone("#" + $this.attr("id"), {
                    acceptedFiles: $this.find("input[type=file]").attr("accept"),
                    uploadMultiple: type === "files",
                    maxFiles: type === "files" ? 20 : 1,
                    addRemoveLinks: !0,
                    maxFilesize: 500,
                    dictDefaultMessage: "Selecione ou Arraste Arquivos",
                    dictCancelUpload: "Cancelar",
                    dictRemoveFile: "Excluir",
                    dictInvalidFileType: "Tipo não Permitido",
                    dictFileTooBig: "Máximo de 500MB",
                    dictResponseError: "Erro ao Salvar",
                    dictMaxFilesExceeded: "Máximo de Uploads Atingido",
                    init: function () {
                        this.on("success", function (file, response) {
                            response = $.parseJSON(response);
                            var t = $file.val() !== "" ? $.parseJSON($file.val()) : [];
                            t = $.grep(t, function () {
                                return !0
                            });
                            $.each($.parseJSON(response.data), function (i, e) {
                                if (e.response === 1 && e.data.name === file.name && $.grep(t, function (n) {
                                    return n.name === file.name
                                }).length === 0)
                                    t.push(e.data); else if (typeof(e.data) === "string")
                                    toast(e.data, "warning")
                            });
                            $(response.id).val(JSON.stringify(t)).trigger("change")
                        }).on("removedfile", function (file) {
                            post('form-crud', 'delete/source', {
                                entity: $this.find("input[name=entity]").val(),
                                column: $this.find("input[name=column]").val(),
                                name: file.name,
                                files: $file.val()
                            }, function (data) {
                                $file.val(data).trigger("change")
                            })
                        });
                        if ($file.val() !== "") {
                            var myDropzone = this;
                            $.each($.parseJSON($file.val()), function (i, e) {
                                var mockFile = {
                                    name: e.name,
                                    size: e.size,
                                    type: e.type,
                                    status: Dropzone.ADDED,
                                    url: e.url,
                                    accepted: !0
                                };
                                myDropzone.emit("addedfile", mockFile);
                                if (e.type.match(/image.*/))
                                    myDropzone.emit("thumbnail", mockFile, HOME + e.url);
                                myDropzone.emit("complete", mockFile);
                                myDropzone.files.push(mockFile)
                            })
                        }
                    }
                })
            })
        }
    }

    function setJsonValue($id, value) {
        var dataRecovery = $.grep(($id.val() !== "" ? $.parseJSON($id.val()) : []), function () {
            return !0
        });
        if ($.inArray(value, dataRecovery) === -1)
            dataRecovery.push(value);
        $id.val(JSON.stringify(dataRecovery)).trigger("change")
    }

    function removeJsonValue($id, value) {
        var dataRecovery = $.grep(($id.val() !== "" ? $.parseJSON($id.val()) : []), function () {
            return !0
        });
        dataRecovery.removeItem(value);
        $id.val(JSON.stringify(dataRecovery)).trigger("change")
    }

    function removerListMult(id, value) {
        var $content = $(id).parent().siblings(".listmult-content");
        removeJsonValue($(id), value);
        $content.find(".listmult-card[rel=" + value + "]").remove()
    }

    function editListMult(entity, id, value) {
        openPanel(entity, $(id), value, $(id + "-btn"))
    }

    function readList($input, entity, parent, search, id) {
        var selecao = $input.hasClass("selecaoUnique") ? $input.closest(".multFieldsSelect").prev().prev().find("input[type=hidden]").val() : 0;
        post('form-crud', 'read/list', {
            search: search,
            entity: entity,
            parent: parent,
            column: id,
            selecao: selecao
        }, function (data) {
            var $list = $input.siblings(".list-complete");
            $list.html(data);
            if (data !== "") {
                if ($list.find("li.active").text().trim().toLowerCase() === $input.val().trim().toLowerCase())
                    selectList($list);
                $(".list-option").off("mousedown").on("mousedown", function () {
                    $(".list-option").removeClass("active");
                    $(this).addClass("active");
                    selectList($list)
                })
            }
        }, ISDEV ? !0 : "undefined")
    }

    function selectList($list) {
        var $active = $list.find("li.active");
        $list.html("");
        $list.siblings(".form-list").val("").focus();
        if ($list.attr("rel") === "mult") {
            $list.parent().prev().find("i").html("add");
            setListMultValue($list.parent().prev().find("input[type=hidden]"), parseInt($active.attr("rel")), $active.text().trim())
        } else {
            $list.parent().prev().find("i").html("edit");
            selectListOne($list, $active)
        }
        var lista = $list.siblings(".form-list")
    }

    function checkEntityMultValue($id) {
        $id.parent().parent().find(".selecaoUniqueCard").removeClass("hide").find(".titleRequired").addClass("hide").parent().next().find(".form-list").val("").removeClass("disabled").prop("disabled", !1).parent().prev().find("input[type=hidden]").val("").trigger("click")
    }

    function setListMultValue($id, value, title) {
        var isNew = !0;
        var isTitle = !1;
        var $content = $id.parent().siblings(".listmult-content");
        var $tpl = $id.parent().siblings(".tpl_list_mult");
        $.each($id.parent().siblings(".listmult-content").find(".listmult-card"), function () {
            if (parseInt($(this).attr("rel")) === value) {
                isNew = !1;
                if ($(this).find(".listmult-title").text().trim() !== title)
                    isTitle = $(this).find(".listmult-title")
            }
        });
        if (isNew) {
            $id.parent().siblings(".rest").find("input[type=text]").html("");
            copy($tpl, $content, [value, title], "append");
            setJsonValue($id, value)
        } else if (isTitle !== !1) {
            isTitle.text(title)
        }
    }

    function clearSelecaoUnique($list) {
        var entity = $list.attr("data-entity");
        var field = $list.attr("id");
        var $mult = $("#multFieldsSelect-" + entity + "-" + field);
        $mult.find(".titleRequired").removeClass("hide");
        $mult.children().addClass("disabled");
        $mult.find("input[type=text]").prop("disabled", 1)
    }

    function requestPreDataToSelecaoUnique(id, entity, field) {
        var $mult = $("#multFieldsSelect-" + entity + "-" + field);
        $mult.find(".titleRequired").addClass("hide");
        $mult.children().removeClass("disabled hide");
        $mult.find("input[type=text]").prop("disabled", !1);
        $mult.find(".selecaoUniqueCard").each(function () {
            $(this).find("input[type=hidden], input[type=text]").val("").removeClass("disabled")
        });
        post("form-crud", "read/selecaoUniquePreData", {id: id, entity: entity, field: field}, function (g) {
            if (g) {
                $.each(g, function (column, data) {
                    var $c = $mult.find("#" + column);
                    if ($c.length) {
                        $c.val(data.text);
                        $mult.find("input[id='dados." + column + "']").val(data.id)
                    }
                })
            }
        })
    }

    function selectListOne($list, $active) {
        var id = parseInt($active.attr("rel"));
        var $field = $list.siblings("input[type=text]");
        var $id = $list.parent().prev().find("input[type=hidden]");
        if (parseInt($id.val()) !== id) {
            $field.val($active.text().trim());
            $id.val(id).trigger("change");
            if ($list.parent().siblings(".multFieldsSelect").length)
                requestPreDataToSelecaoUnique(id, $field.attr("data-entity"), $field.attr("id"))
        }
    }
}

function loadForm(element) {
    var $element = $(element);
    loadMask($element);
    formAutoSubmit($element)
}

Dropzone.autoDiscover = !1;
loadForm('.form-crud')