inputs();

$(".lockson").change(function () {
    if ($(this).val() === "0") {
        $(this).siblings(".locksin").find("i").removeClass("shoticon-unlock").addClass("shoticon-lock");
    } else {
        $(this).siblings(".locksin").find("i").removeClass("shoticon-lock").addClass("shoticon-unlock");
    }
});

$(".choiceOneToOne").on('keyup focus', function (e) {
    var $this = $(this);
    var field = $this.parent().siblings(".divoptionsOneToOne").find(".optionsOneToOne");

    if (e.which === 13 && field.html() !== "") {
        field.find("div:eq(0)").trigger("click");
        field.removeClass("boxshadow").html("");
    } else {

        if (($this.val() === "" || $this.val() === "") && $this.parent().siblings(".addOneToOne").length) {
            var button = $this.parent().siblings(".addOneToOne");
            var funcao = button.attr("onclick").split(",");
            funcao = funcao[0] + ", 0, '" + button.siblings(".divoptionsOneToOne").attr("rel") + "')";
            button.html("+").attr("onclick", funcao);
            $this.parent().siblings("input[type=hidden]").val("");
        }

        $.post('../requests/back/Admin/searchInputOneToOne.php', {
            rel: $this.attr("rel"),
            s: $this.val(),
            e: $this.parent().siblings(".divoptionsOneToOne").attr("rel"),
            title: $this.attr("alt")
        }, function (g) {
            field.addClass("boxshadow").html(g);
        });
    }
}).focusout(function () {
    var $this = $(this);
    var field = $this.parent().siblings(".divoptionsOneToOne").find(".optionsOneToOne");
    setTimeout(function () {

        if ($this.parent().siblings(".addOneToOne").length) {
            var button = $this.parent().siblings(".addOneToOne");
            if ($this.parent().siblings("input[type=hidden]").val() === "" || $this.val() === "") {
                var funcao = button.attr("onclick").split(",");
                funcao = funcao[0] + ", 0, '" + button.siblings(".divoptionsOneToOne").attr("rel") + "')";
                button.html("+").attr("onclick", funcao);
            }
        }

        field.removeClass("boxshadow").html("");
    }, 200);
});

$(".marcador-input").keyup(function (e) {
    if (e.which === 13) {
        var marc = $(this).siblings(".div-marcador-search");
        marc.find("div").first().trigger("click");
        $(this).val("");
        marc.html("").removeClass("boxshadow");
    } else {
        changeTags($(this).attr("rel"), $(this).attr("alt"));
    }
});

function selectMonth(valor, id) {
    $(".month").removeClass("weekSelected");
    if ($("#" + id).val() == valor) {
        $("#" + id).val("");
    } else {
        $("#" + id).val(valor);
        $("#" + id + "-" + valor).addClass("weekSelected");
    }
}

function selectWeek(valor, id) {
    $(".weeks").removeClass("weekSelected");
    if ($("#" + id).val() == valor) {
        $("#" + id).val("");
    } else {
        $("#" + id).val(valor);
        $("#" + id + "-" + valor).addClass("weekSelected");
    }
}

function selectOnSwitch(id, tag_1, tag_2) {
    var value = $("#switch-" + id).is(":checked") ? 1 : 0;
    $("#" + id).val(value);

    if(value === 1) {
        $("div[rel='FK " + tag_1 + "']").addClass("ds-none");
        $("div[rel='FK " + tag_2 + "']").removeClass("ds-none");
    } else {
        $("div[rel='FK " + tag_1 + "']").removeClass("ds-none");
        $("div[rel='FK " + tag_2 + "']").addClass("ds-none");
    }
}

function selectOneToOne(banco, idRetorno, title, id) {
    if (!$("#" + idRetorno).hasClass("choiceOneToMany")) {
        if (title) {
            if (title.match(/{/i)) {
                title = jQuery.parseJSON(title)['title'];
            }

            $("#" + idRetorno).siblings("label").find(".choiceOneToOne").siblings("span").addClass("inputSelect");
            $("#" + idRetorno).val(id).siblings("label").find(".choiceOneToOne").val(title);
            $(".optionsOneToOne").removeClass("boxshadow").html("");
        } else {
            $("#" + idRetorno).val(id);
        }

        var button = $("#" + idRetorno).siblings(".addOneToOne");
        var funcao = button.attr("onclick").split(",");
        funcao = funcao[0] + ", " + id + ", '" + idRetorno + "')";
        button.html("<i class='shoticon shoticon-lapis shoticon-button'></i>").attr("onclick", funcao);

        closeWindow(banco + "_" + id, banco);

    } else {
        selectOneToMany(banco, idRetorno, title, id);
    }
}

function setEditingId(id, banco, column) {
    sessionStorage.setItem('editing-' + banco, id);
    sessionStorage.setItem('editing-column-' + banco, column);
}

function selectOneToMany(banco, id, dados, returnId) {
    dados = jQuery.parseJSON(dados);
    if (sessionStorage.getItem('editing-' + banco) > 0 && sessionStorage.getItem('editing-' + banco) != returnId) {
        $("#" + id).val("," + returnId + $("#" + id).val()).siblings(".choiceOneToManyDiv").find(".controlOneToMany-" + sessionStorage.getItem('editing-' + banco)).before(dados['list']);
        deleteOneToMany(banco, sessionStorage.getItem('editing-column-' + banco), id, sessionStorage.getItem('editing-' + banco));
    } else {

        if ($("#" + id).siblings(".choiceOneToManyDiv").find(".controlOneToMany-" + returnId).length) {
            $("#" + id).siblings(".choiceOneToManyDiv").find(".controlOneToMany-" + returnId).find(".oneToManyTitle").html(dados['title']);
        } else {
            $("#" + id).val("," + returnId + $("#" + id).val()).siblings(".choiceOneToManyDiv").append(dados['list']);
        }
    }

    closeWindow(banco + "_" + returnId, banco);
}

function deleteOneToMany(table, column, id, returnId) {
    $.post('../_app/formCrud/controller/deleteOneToMany.php', {table: table, column: column, id: returnId},
        function (g) {
            $("#" + id).val($("#" + id).val().replace("," + returnId, "")).siblings(".choiceOneToManyDiv").find(".controlOneToMany-" + returnId).remove();
        });
}

$("input[rel=title]").keyup(function () {
    var url = $(this).parent().parent().find("input[rel=url]");
    url.val(CheckName($(this).val()));
});

$(".star").mouseover(function () {

    $(this).html("&starf;").prevAll().html("&starf;");
    $(this).nextAll("li").html("&star;");

}).mouseout(function () {
    var h = parseInt($("#" + $(this).attr("rel")).val()) - 1;
    if (h && h > -1 && h < 10) {

        $(this).html("&star" + ($(this).index() > h ? "" : "f") + ";");
        $(this).siblings(".star").each(function () {
            $(this).html("&star" + ($(this).index() > h ? "" : "f") + ";");
        });

    } else {
        $(this).html("&star;");
        $(this).siblings(".star").html("&star;");
    }

}).click(function () {

    $("#" + $(this).attr("rel")).val(parseInt($(this).attr("alt")) + 1);
    $("#exibi-" + $(this).attr("rel")).html(parseInt($(this).attr("alt")) + 1);
    $(this).css("color", "goldenrod").prevAll().css("color", "goldenrod");
    $(this).nextAll().css("color", "#555");

});

function createMiniBox(banco) {
    var titlePost = banco.replace($("#pre").val(), "").replace("-mini", "").replace("-", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
    $("#workspace").append('<div id="mini-' + banco + '" class="boxcontent font-size09"><div class="container boxshadow-heavy box-sistema bg-white" style="height:' + sessionStorage.boxheight + 'px;" id="content-' + banco + '">'
        + "<header class='container headerFolder' style='width: 96%;'>"
        + "<h1 class='al-right font-size12 font-bold color-blackgray fl-right mg-medium'>" + titlePost + "</h1>"
        + "<div class='fl-left ps-fixed bg-white z-plus'>"
        + "<span class='smart buttonClose fl-left transition-fast font-size12 default' title='fechar' onclick=\"closeWindow('" + banco + "');\">x</span>"
        + "<span class='smart buttonMini fl-left transition-fast font-size12 default' title='minimiza' onclick=\"miniWindow('" + banco + "');\">-</span>"
        + "<span class='ds-none smart buttonMini fl-left transition-fast font-size12 default' title='voltar' id='comebackbtn' ><</span>"
        + "</div><div class='container pd-small'></div></header>"
        + "<section class='container ps-relative'><div class='container bg-white contentFolder' id='subcontent-" + banco + "'>"
        + loading + "</div></section></div></div>");

    setTimeout(function () {
        $(".boxcontent").last().addClass("box-sistema-mini-effect");
    }, 1);
}

function getTableCopy(banco, id, idRetorno) {
    sessionStorage.action = 'update';
    for (var i = parseInt(sessionStorage.getItem("NP_" + banco)); i > 0; i--) {
        sessionStorage.removeItem("Nav_" + banco + i);
    }
    sessionStorage.removeItem("NP_" + banco);
    sessionStorage.removeItem('editing-' + banco);
    sessionStorage.removeItem('editing-column-' + banco);

    createMiniBox(banco);

    setTimeout(function () {
        sessionStorage.setItem("NP_" + banco, (!sessionStorage.getItem("NP_" + banco) ? 1 : parseInt(sessionStorage.getItem("NP_" + banco)) + 1));
        sessionStorage.setItem("Nav_" + banco + sessionStorage.getItem("NP_" + banco), banco + (id === 0 || id ? "," + id + (idRetorno ? "," + idRetorno : "" ) : "" ));

        $("#mini-" + banco).find("#comebackbtn").addClass("ds-none");

        $.post('../_app/PageNavigation/controller/getPage.php', {
            banco: banco, id: id, retorno: idRetorno, bancoUso: $("#bancoUso").val()
        }, function (g) {
            $("#subcontent-" + banco).html(g);
        });
    }, 1);
}

function createTag(marcador, id) {
    var title = $("#" + marcador + "_field").val();
    $.post('../requests/marcador/create.php', {
        a: title,
        marcador: marcador,
        id: id
    }, function (g) {
        var novaTag = '<div onclick="choiceTags(' + g + ', \'' + marcador + '\', \'' + id + '\')" style="cursor:not-allowed" class="smart container pd-small selectedtag" rel="' + g + '" id="selectedtag-' + g + '"><span class="fl-left nomargin">' + title + '</span></div>';
        if (!$("#box" + marcador + "_select").length) {
            if (!$("#box" + marcador).length) {
                $("#" + marcador + "-sistema").append("<div class='container box" + marcador + " pd-small' id='box" + marcador + "'></div>");
            }
            $("#box" + marcador).append("<div class='container pd-small' id='box" + marcador + "_select'>" + novaTag + "</div>");
        } else {
            $("#box" + marcador + "_select").prepend(novaTag);
        }

        $("#" + id).val("," + g + $("#" + id).val());
        $("#" + marcador + "_field").val("");
        $("#div_" + marcador + "_field").html("");
    });
}

var tagchoice = 0;
function choiceTags(value, key, id) {
    if (tagchoice === 0) {
        tagchoice = 1;
        if (!$("#box" + key + "_select").length) {
            $("#box" + key).append("<div class='container pd-small' id='box" + key + "_select'></div>");
        }

        $.post('../requests/marcador/choice.php', {a: value, marcador: key}, function (g) {
            if (g != '0') {
                if (!$("#selected" + key + "-" + value).length) {

                    //add
                    $("#" + id).val("," + value + $("#" + id).val());
                    $("#box" + key + "_select").append('<div onclick="choiceTags(' + value + ', \'' + key + '\', \'' + id + '\')" style="cursor:not-allowed" class="default hover transition-easy smart container pd-small selected' + key + '" rel="' + value + '" id="selected' + key + '-' + value + '"><span class="fl-left nomargin">' + g + '</span></div>');

                } else {

                    //remove
                    $("#" + id).val($("#" + id).val().replace("," + value, ""));
                    $("#selected" + key + "-" + value).remove();
                    if ($("#box" + key + "_select").html() === "") {
                        $("#box" + key + "_select").remove();
                    }
                }

            } else {
                infor(key + " não encontrada");
            }

            tagchoice = 0;
        });
    }
}

var coverwidth = 0;
$("#cover-width").on('keyup change', function () {
    if (coverwidth === 0) {
        coverwidth = 1;
        $.post('../requests/back/post/updateDirectionImage.php', {width: $(this).val()}, function () {
            coverwidth = 0;
        });
    }
});

function vertImage(id, banco) {
    $("#imgdp").css("transform", ($("#imgdp").css("transform") === "none" ? "rotateX(180deg)" : "none"));
    $.post('../requests/back/post/updateDirectionImage.php', {vertical: 1, id: $("#" + id).val(), banco: banco});
}

function HoriImage(id, banco) {
    $("#imgclass").css("transform", ($("#imgclass").css("transform") === "none" ? "rotateY(180deg)" : "none"));
    $.post('../requests/back/post/updateDirectionImage.php', {horizontal: 1, id: $("#" + id).val(), banco: banco});
}

function TurnImage(id, banco) {
    $.post('../requests/back/post/updateDirectionImage.php', {
        turn: 1,
        id: $("#" + id).val(),
        banco: banco
    }, function (g) {
        if (g === "0") {
            $("#imgclasse").css("transform", ($("#imgclasse").css("transform") === "none" ? "rotate(-90deg)" : "none"));
        } else {
            $("#imgclasse").css("transform", ($("#imgclasse").css("transform") === "none" ? "rotate(90deg)" : "none"));
        }
    });
}

function sendGallery(folder, e, id) {
    lightBox("favfor-Gallery", "galeria", "<iframe class='container' style='height: 100%;position: absolute;' scrolling='no' frameborder='0' src='../ajaxUpload/index.php?f=" + folder + "&e=" + e + "&id=" + id + "'></iframe>");
}

function sendVideo(folder, e, id) {
    lightBox("sendvideo", "videos", "<iframe class='container' style='height: 100%;position: absolute;' scrolling='no' frameborder='0' src='../ajaxUpload/video.php?f=" + folder + "&e=" + e + "&id=" + id + "'></iframe>");
}

function openGallery(folder, e) {
    lightBox("favfor-Gallery", "galeria", loading);
    $.post("../ajaxUpload/gallery.php", {e: e, f: folder}, function (g) {
        lightBoxContent(g);
    });
}