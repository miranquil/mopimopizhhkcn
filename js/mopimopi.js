var lastCombatHPS = null;
var inputNumber = null;
var custom = new Array();
var healerCustom = new Array();
var scrollValue = 0;
var preScrollVal = 0;
var pre2ScrollVal = 0;
var encounterArray = new Array();
var encounterCount = 1;
var saveLogFlag = !1;
var tableFlag = 0;
var viewSettingsFlag = !1;
var customFlag = !0;
var initACTElement = [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
var initHealerElement = [0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
var OnlyUsers = 0;
var objTime;
var mpLang = [];
var dataAbbList = null;
var palette = {
    tank1: '7B9AA2',
    tank2: 'A91A16',
    tank3: '682531',
    heal1: 'BDBDBD',
    heal2: '32307B',
    heal3: 'B1561C',
    shield: '0F9D58',
    overheal: 'FF3F80',
    dps1: 'B38915',
    dps2: '3752D8',
    dps3: 'EE2E48',
    dps4: '674598',
    dps5: '32670B',
    dps6: 'ADC551',
    dps7: '148AA9',
    dps8: 'E45A0F',
    dps9: 'AC2997',
    life1: '353535',
    life2: '353535',
    ava: '000000',
    chocobo: '757575',
    LB: 'FFBB00',
    me: 'FFFFFF',
    other: 'FFFFFF',
    YOU: 'FF5722',
    header: '000000',
    background: '000000',
    headerText: 'BDBDBD',
    accentColor: 'FF5722',
    topbarBackgroundColor: '212121',
    bigTextColor: 'FFFFFF',
    smallTextColor: 'BDBDBD',
    borderColor: '000000',
    lineColor: '000000'
};
var settings = {
    lang:'cn',
    nameType: 'AType',
    hideName: 0,
    pets: 1,
    comma: 1,
    number: 1,
    HPS: 1,
    ranking: 0,
    dot: 0,
    maxAbb: 1,
    raidMode: 1,
    meBold: 0,
    otherBold: 0,
    border: 0,
    edge: 0,
    youColor: 0,
    petAction: 1,
    line: 1,
    gradation: 0,
    animation: 1,
    go: 100,
    bo: 75,
    to: 100,
    ho: 100,
    lo: 100,
    autoHide: 1,
    arrow: 1,
    tooltip: 1,
    toast: 1,
    myID: 1,
    align: 1,
}
var inputSettings = {
    timeFont: 'Montserrat',
    krFont: 'Segoe UI',
    cnFont: '更纱黑体',
    hkFont: '更纱黑体',
    jpFont: 'Meiryo',
    enFont: 'Roboto',
    deFont: 'Segoe UI',
    indexFont: 'Roboto Condensed',
    narrowCell1: 40,
    narrowCell2: 55,
    wideCell1: 70,
    wideCell2: 100,
    topbarHeight: 50,
    btnFontSize: 10,
    autoHideTime: 3,
}
var alias = {
    "The Forbidden Chakra": "Forb.Chakra",
    "Spineshatter Dive": "Spine.Dive",
    "Midare Setsugekka": "Midare",
    "Hissatsu: Guren": "Guren",
    "Enchanted Redoublement": "E.Redoubl",
    "Enchanted Riposte": "E.Riposte",
    "Enchanted Zwerchhau": "E.Zwerch",
    "Refulgent Arrow": "Ref.Arrow",
    "미아즈마 버스트": "버스트",
    "王冠之领主": "领主卡",
    "王冠之贵妇": "贵妇卡",
    "阴阳斗气斩": "斗气斩",
    "斗魂旋风脚": "旋风脚",
    "强甲破点突": "破点突",
    "通灵之术·大虾蟆": "大虾蟆",
    "风魔手里剑": "手里剑",
    "必杀剑·红莲": "红莲剑",
    "纷乱雪月花": "雪月花",
    "侧风诱导箭": "侧风箭",
    "超档车式炮塔": "超档车塔",
    "超档象式炮塔": "超档象塔",
}
var height = parseFloat(localStorage.getItem('topbarHeight') / 10);
var accentColor = '#' + localStorage.getItem('accentColor');
for (var i in inputSettings) {
    if (!localStorage.getItem(i))
        localStorage.setItem(i, inputSettings[i]);
    $("[name=" + i + "]").val(localStorage.getItem(i))
}
for (var i in palette) {
    if (!localStorage.getItem(i)) {
        localStorage.setItem(i, palette[i]);
        $('body').find('[name="' + i + '"]').val(palette[i]);
        $('body').find('#' + i).css('background', '#' + palette[i])
    } else {
        $('body').find('[name="' + i + '"]').val(localStorage.getItem(i));
        $('body').find('#' + i).css('background', '#' + localStorage.getItem(i))
    }
}
for (var i in settings) {
    if (!localStorage.getItem(i)) {
        localStorage.setItem(i, settings[i]);
        if (settings[i] == 0 || settings[i] == 1)
            initCheck(i); else if (isNaN(settings[i]))
            radioButtonCotrol(settings[i])
    } else {
        if (localStorage.getItem(i) == 0 || localStorage.getItem(i) == 1)
            initCheck(i); else if (isNaN(localStorage.getItem(i)))
            radioButtonCotrol(localStorage.getItem(i))
    }
}
if (!localStorage.getItem('number')) {
    inputNumber = 2
} else {
    if (localStorage.getItem('number') == 1) inputNumber = 2; else inputNumber = 0
}
for (var i = 1; i < initACTElement.length; i++) {
    var name = 'c-dps' + i;
    if (!localStorage.getItem(name)) {
        if (initACTElement[i] == 1)
            localStorage.setItem(name, 1); else localStorage.setItem(name, 0)
    }
    custom[i] = localStorage.getItem(name);
    if (custom[i] == 1) {
        $('[name="' + name + '"]' + ' input').prop('checked', !0);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', accentColor)
    } else {
        $('[name="' + name + '"]' + ' input').prop('checked', !1);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star_border');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', 'rgba(255,255,255,0.38)')
    }
}
for (var i = 1; i < initHealerElement.length; i++) {
    var name = 'c-hps' + i;
    if (!localStorage.getItem(name)) {
        if (initHealerElement[i] == 1)
            localStorage.setItem(name, 1); else localStorage.setItem(name, 0)
    }
    healerCustom[i] = localStorage.getItem(name);
    if (healerCustom[i] == 1) {
        $('[name="' + name + '"]' + ' input').prop('checked', !0);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', accentColor)
    } else {
        $('[name="' + name + '"]' + ' input').prop('checked', !1);
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').text('star_border');
        $('[name="' + name + '"]' + ' div.iconText i.material-icons').css('color', 'rgba(255,255,255,0.38)')
    }
}
var now_go = parseFloat(localStorage.getItem('go') / 100);
var now_bo = parseFloat(localStorage.getItem('bo') / 100);
var now_to = parseFloat(localStorage.getItem('to') / 100);
var now_ho = parseFloat(localStorage.getItem('ho') / 100);
var now_lo = parseFloat(localStorage.getItem('lo') / 100);
$('#range_go>input').val(localStorage.getItem('go'));
$('#r_go').text(parseInt(localStorage.getItem('go')) + '%');
$('#range_bo>input').val(localStorage.getItem('bo'));
$('#r_bo').text(parseInt(localStorage.getItem('bo')) + '%');
$('#range_ho>input').val(localStorage.getItem('ho'));
$('#r_ho').text(parseInt(localStorage.getItem('ho')) + '%');
$('#range_to>input').val(localStorage.getItem('to'));
$('#r_to').text(parseInt(localStorage.getItem('to')) + '%');
$('#range_lo>input').val(localStorage.getItem('lo'));
$('#r_lo').text(parseInt(localStorage.getItem('lo')) + '%');
$('#range_go').on('input', function () {
    localStorage.setItem('go', parseInt($('#range_go .value').text()));
    now_go = parseFloat(localStorage.getItem('go') / 100);
    $('#r_go').text(parseInt($('#range_go .value').text()) + '%');
    onSettingsUpdate('go')
});
$('#range_bo').on('input', function () {
    localStorage.setItem('bo', parseInt($('#range_bo .value').text()));
    now_bo = parseFloat(localStorage.getItem('bo') / 100);
    $('#r_bo').text(parseInt($('#range_bo .value').text()) + '%');
    onSettingsUpdate('bo')
});
$('#range_to').on('input', function () {
    localStorage.setItem('to', parseInt($('#range_to .value').text()));
    now_to = parseFloat(localStorage.getItem('to') / 100);
    $('#r_to').text(parseInt($('#range_to .value').text()) + '%');
    onSettingsUpdate('to')
});
$('#range_ho').on('input', function () {
    localStorage.setItem('ho', parseInt($('#range_ho .value').text()));
    now_ho = parseFloat(localStorage.getItem('ho') / 100);
    $('#r_ho').text(parseInt($('#range_ho .value').text()) + '%');
    onSettingsUpdate('ho')
});
$('#range_lo').on('input', function () {
    localStorage.setItem('lo', parseInt($('#range_lo .value').text()));
    now_lo = parseFloat(localStorage.getItem('lo') / 100);
    $('#r_lo').text(parseInt($('#range_lo .value').text()) + '%');
    onSettingsUpdate('lo')
});
(function () {
    var isTouch = !1;
    var simulated_flag = 'handler_simulated';
    var touch_click_array = {};
    const clickMoveThreshold = 20;

    function mouseHandler(event) {
        if (isTouch) {
            if (!event.hasOwnProperty(simulated_flag)) {
                var fixed = new jQuery.Event(event);
                fixed.preventDefault();
                fixed.stopPropagation()
            }
        } else {
        }
    }

    function mouseFromTouch(type, touch) {
        var event = document.createEvent("MouseEvent");
        event.initMouseEvent(type, !0, !0, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, !1, !1, !1, !1, 0, null);
        event[simulated_flag] = !0;
        touch.target.dispatchEvent(event)
    };

    function touchHandler(event) {
        var touches = event.changedTouches, first = touches[0], type = ""
        if (!event.hasOwnProperty(simulated_flag)) {
            isTouch = !0;
            switch (event.type) {
                case "touchstart":
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        touch_click_array[touch.identifier] = {x: touch.screenX, y: touch.screenY}
                    }
                    mouseFromTouch("mousedown", first);
                    break;
                case "touchmove":
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        var id = touch.identifier;
                        var data = touch_click_array[id];
                        if (data !== undefined) {
                            if (Math.abs(data.x - touch.screenX) + Math.abs(data.y - touch.screenY) > clickMoveThreshold) {
                                delete touch_click_array[id]
                            }
                        }
                    }
                    mouseFromTouch("mousemove", first);
                    break;
                case "touchcancel":
                    break;
                case "touchend":
                    mouseFromTouch("mouseup", first);
                    for (var i = 0; i < touches.length; i++) {
                        var touch = touches[i];
                        if (touch_click_array.hasOwnProperty(touch.identifier)) {
                            mouseFromTouch("click", touch);
                            delete touch_click_array[touch.identifier]
                        }
                    }
                    break
            }
        }
    }

    document.addEventListener("mousedown", mouseHandler, !0);
    document.addEventListener("mousemove", mouseHandler, !0);
    document.addEventListener("mouseup", mouseHandler, !0);
    document.addEventListener("click", mouseHandler, !0);
    document.addEventListener("touchstart", touchHandler, !0);
    document.addEventListener("touchmove", touchHandler, !0);
    document.addEventListener("touchcancel", touchHandler, !0);
    document.addEventListener("touchend", touchHandler, !0)
})();
history.pushState(null, null, location.href);
window.onpopstate = function (event) {
    history.go(1)
}
$(document).ready(function () {
    if (lastCombat == null)
        $('body').find('[name="notice"]').fadeIn(500); else $('body').find('[name="notice"]').fadeOut(0);
    arrowHidden(localStorage.getItem("arrow"));
    if (localStorage.getItem("tooltip") == 0)
        $('.tooltipped').tooltip('remove');
    jscolor.installByClassName("jscolor");
    Materialize.updateTextFields();
    getOrder();
    getAbb();
    onCreateHeader("dpsTableHeader", custom);
    onCreateHeader("hpsTableHeader", healerCustom);
    update();
    onUpdateCSS();
    dataShare();
    $(document).scrollTop(0);
    setFontSize(parseInt(localStorage.getItem('btnFontSize')))
});
$('.scrollbtn').on('click', function () {
    var input = $('.scrollbtn').find('input').prop('checked');
    var container = $('#lock').addClass('off');
    if (input == 0) {
        $('#lock').get(0).addEventListener('touchstart', lock_touch);
        $('.scrollbtn').find('input').prop('checked', !0);
        $('.scrollbtn').find('i').text('lock_outline');
        $('.scrollbtn').find('i').css('color', accentColor);
        if (container.hasClass('off')) {
            var bw = $('body').width();
            var sw = $('#scrollbar').width();
            var wh = $(window).height();
            var dh = $(document).height();
            container.toggleClass('on off');
            $('body').css('overflow', 'hidden').width(bw - sw)
        }
    } else {
        $('#lock').get(0).removeEventListener('touchstart', lock_touch);
        $('.scrollbtn').find('input').prop('checked', !1);
        $('.scrollbtn').find('i').text('lock_open');
        $('.scrollbtn').find('i').css('color', 'rgba(255,255,255,1)');
        if (container.hasClass('on')) {
            container.toggleClass('on off');
            $('body').css('overflow', '').css('width', '')
        }
    }
});
$('.scrollbtnOff').on('click', function () {
    var container = $('#lock').addClass('off');
    $('#lock').get(0).removeEventListener('touchstart', lock_touch);
    $('.scrollbtn').find('input').prop('checked', !1);
    $('.scrollbtn').find('i').text('lock_open');
    $('.scrollbtn').find('i').css('color', 'rgba(255,255,255,1)');
    if (container.hasClass('on')) {
        container.toggleClass('on off');
        $('body').css('overflow', '').css('width', '')
    }
});

function lock_touch(e) {
    e.preventDefault()
}

$(document).on('click', function () {
    if ($('[name=main]').hasClass("hidden") == !1 && localStorage.getItem("autoHide") == 1 && OnlyUsers != 0)
        autoHidden("ON")
});
$(document).scroll(function () {
    scrollValue = $(document).scrollTop();
    var a = oHexColor(localStorage.getItem('header'));
    if (scrollValue != 0) {
        $('[name=main]').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + 1 + ')');
        $('#mainTopBar').css('background', topbarBackgroundColor)
    } else {
        $('[name=main]').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + now_ho + ')');
        var b = oHexColor(topbarBackgroundColor);
        $('#mainTopBar').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + now_to + ')')
    }
});
$("input").on("click", function () {
    $(this).select()
});
$("input#apply").on("click", function () {
    document.body.scrollTop = document.body.scrollHeight
});
$("[name=font] input").keydown(function () {
    if (event.keyCode == 13 || event.keyCode == 27) {
        if ($(this).val() != "") {
            $(this).blur();
            settingsFont()
        } else $(this).focus()
    }
});
$(".plus").click(function (e) {
    e.preventDefault();
    var field = "input[name=" + $(this).attr("field") + "]";
    var currentVal = parseInt($(field).val());
    if (!isNaN(currentVal) && currentVal < 999) {
        var id = $(field).attr('name');
        if (id == "topbarHeight")
            $(field).val(currentVal + 2); else if (id == "btnFontSize") {
            var val = calFontSize(currentVal, 'plus');
            $(field).val(val)
        } else $(field).val(currentVal + 1);
        localStorage.setItem(id, parseInt($(field).val()));
        if (id == 'btnFontSize')
            setFontSize(val); else if (id == "topbarHeight")
            adjustTopbarHeight(); else {
            adjustCellWidth();
            $('#previewH td').css('background', 'rgba(0,0,0,1)');
            $('#previewH td').css('color', '#bdbdbd');
            $('#previewH .' + id).css('background', '#fff');
            $('#previewH .' + id).css('color', '#000')
        }
    }
});
$(".minus").click(function (e) {
    e.preventDefault();
    var field = "input[name=" + $(this).attr("field") + "]";
    var currentVal = parseInt($(field).val());
    if (!isNaN(currentVal) && currentVal > 1) {
        var id = $(field).attr('name');
        if (id == "topbarHeight")
            $(field).val(currentVal - 2); else if (id == "btnFontSize") {
            var val = calFontSize(currentVal, 'minus');
            $(field).val(val)
        } else $(field).val(currentVal - 1);
        localStorage.setItem(id, parseInt($(field).val()));
        if (id == 'btnFontSize')
            setFontSize(val); else if (id == "topbarHeight")
            adjustTopbarHeight(); else {
            adjustCellWidth();
            $('#previewH td').css('background', 'rgba(0,0,0,1)');
            $('#previewH td').css('color', '#bdbdbd');
            $('#previewH .' + id).css('background', '#fff');
            $('#previewH .' + id).css('color', '#000')
        }
    }
});

function dataBackUp() {
    var data = new Object();
    var dt = new Date();
    for (var i in inputSettings) {
        data[i] = localStorage.getItem(i)
    }
    for (var i in palette) {
        data[i] = localStorage.getItem(i)
    }
    for (var i in settings) {
        data[i] = localStorage.getItem(i)
    }
    for (var i = 1; i < initACTElement.length; i++) {
        data['c-dps' + i] = localStorage.getItem('c-dps' + i)
    }
    for (var i = 1; i < initHealerElement.length; i++) {
        data['c-hps' + i] = localStorage.getItem('c-hps' + i)
    }
    data.dpsOrder = localStorage.getItem('dpsOrder');
    data.hpsOrder = localStorage.getItem('hpsOrder');
    data.abbList = localStorage.getItem('abbList');
    localStorage.setItem("backup", JSON.stringify(data));
    localStorage.setItem("dt", dt);
    $('#backupDate').text(' = ' + localStorage.getItem("dt"))
}

function dataRestore() {
    if (!localStorage.getItem("backup")) {
        alert(mpLang.m254)
    }
    else {
        if (confirm(mpLang.m255) == !0) {
            var data = JSON.parse(localStorage.getItem("backup"));
            for (var i in data)
                localStorage.setItem(i, data[i]);
            location.reload()
        }
    }
}

function dataShare() {
    var data = new Object();
    var set = ['meBold', 'otherBold', 'border', 'edge', 'youColor', 'petAction', 'line', 'gradation', 'animation', 'go', 'bo', 'to', 'ho', 'lo', 'narrowCell1', 'narrowCell2', 'wideCell1', 'wideCell2', 'topbarHeight', 'btnFontSize', 'timeFont', 'krFont', 'cnFont', 'hkFont', 'jpFont', 'enFont', 'indexFont'];
    for (var i in palette) {
        data[i] = localStorage.getItem(i)
    }
    for (var i = 0; i < set.length; i++) {
        data[set[i]] = localStorage.getItem(set[i])
    }
    $("[name=share]").val(JSON.stringify(data))
}

$("input#apply").keydown(function () {
    if (event.keyCode == 13) {
        var response = !1;
        try {
            response = jQuery.parseJSON($('[name=apply]').val())
        } catch (error) {
            if (localStorage.getItem("lang") == "kr")
                alert("지정한 값이 올바른 형식이 아닙니다.");
            else if (localStorage.getItem("lang") == "cn")
                alert("指定值类型无效。");
            else if (localStorage.getItem("lang") == "hk")
                alert("無效的指定值類型。");
            else alert("The value specified is not a valid type.")
        }
        if (response && typeof response == 'object') {
            for (var i in response)
                localStorage.setItem(i, response[i]);
            location.reload()
        }
    }
});

function getAbb() {
    if (!localStorage.getItem("abbList"))
        localStorage.setItem("abbList", JSON.stringify(alias)); else dataAbbList = JSON.parse(localStorage.getItem("abbList"))
}

function addAbbData() {
    var action = $('#actionName').val();
    var abb = $('#abbName').val();
    var data = JSON.parse(localStorage.getItem("abbList"));
    if (action != '' && abb != '') {
        data[action] = abb;
        var div = '<div class="element"><table><tr>' + '<td class="realVal">' + action + '</td>' + '<td class="arrow"><i class="material-icons rdColor">keyboard_arrow_right</i></td>' + '<td class="abbVal">' + abb + '</td>' + '<td class="remove" onclick="delAbbData(this)"><i class="material-icons">remove_circle_outline</i></td>' + '</tr></table></div>';
        $('#dataAbbWrap').append(div);
        $('.rdColor').css('color', accentColor);
        $('#abbName').val('');
        $('#actionName').val('')
    }
    localStorage.setItem("abbList", JSON.stringify(data))
}

function delAbbData(obj) {
    var data = JSON.parse(localStorage.getItem("abbList"));
    var row = $(obj).parents('.element');
    var val = $(obj).siblings('.realVal').text();
    row.remove();
    delete data[val];
    localStorage.setItem("abbList", JSON.stringify(data))
}

function createAbbDataDiv() {
    var html = "";
    var data = JSON.parse(localStorage.getItem("abbList"));
    for (var i in data) {
        var div = '<div class="element"><table><tr>' + '<td class="realVal">' + i + '</td>' + '<td class="arrow"><i class="material-icons rdColor">keyboard_arrow_right</i></td>' + '<td class="abbVal">' + data[i] + '</td>' + '<td class="remove" onclick="delAbbData(this)"><i class="material-icons">remove_circle_outline</i></td>' + '</tr></table></div>';
        html += div
    }
    $('#dataAbbWrap').html(html);
    $('.rdColor').css('color', accentColor)
}

function getOrder() {
    var data = new Object();
    for (var i = 1; i < initACTElement.length; i++) {
        var name = 'c-dps' + i;
        if (localStorage.getItem('c-dps' + i) == 1) {
            data[name] = $('[name=' + name + '] .PrimaryText').text()
        }
    }
    if (!localStorage.getItem("dpsOrder"))
        localStorage.setItem("dpsOrder", JSON.stringify(data));
    var data = new Object();
    for (var i = 1; i < initHealerElement.length; i++) {
        var name = 'c-hps' + i;
        if (localStorage.getItem('c-hps' + i) == 1) {
            data[name] = $('[name=' + name + '] .PrimaryText').text()
        }
    }
    if (!localStorage.getItem("hpsOrder"))
        localStorage.setItem("hpsOrder", JSON.stringify(data))
}

function starIcon(name) {
    var val = $('[name="' + name + '"]' + ' input').prop('checked');
    var flag = name.substr(2, 3);
    var data = JSON.parse(localStorage.getItem(flag + "Order"));
    if (val == !0) {
        $('[name="' + name + '"]' + ' input').prop('checked', !1);
        $('[name="' + name + '"]' + ' div.iconText i').text('star_border');
        $('[name="' + name + '"]' + ' div.iconText i').css('color', 'rgba(255,255,255,0.38)');
        localStorage.setItem(name, 0);
        delete data[name];
        customFlag = !0
    } else {
        $('[name="' + name + '"]' + ' input').prop('checked', !0);
        $('[name="' + name + '"]' + ' div.iconText i').text('star');
        $('[name="' + name + '"]' + ' div.iconText i').css('color', accentColor);
        localStorage.setItem(name, 1);
        data[name] = $('[name=' + name + '] .PrimaryText').text();
        customFlag = !0
    }
    localStorage.setItem(flag + "Order", JSON.stringify(data))
}

function createOrderDiv(flag) {
    var html = "";
    var data = JSON.parse(localStorage.getItem(flag + "Order"));
    var order = 1;
    for (var i in data) {
        var div = '<div class="element" data-order="' + order + '">' + '<table><tr>' + '<td class="indexName" name="' + i + '">' + data[i] + '</td>' + '<td class="Ubtn rdColor" onclick="Ubtn(this)"><i class="material-icons">keyboard_arrow_up</i></td>' + '<td class="Dbtn rdColor" onclick="Dbtn(this)"><i class="material-icons">keyboard_arrow_down</i></td>' + '</tr></table>' + '</div>'
        html += div;
        order++
    }
    $('#' + flag + 'OrderWrap').html(html);
    $('.rdColor').css('color', accentColor)
}

function Ubtn(obj) {
    var srcDiv = $(obj).parents(".element");
    var flag = $(obj).prev().attr("name").substr(2, 3);
    var tgtDiv = srcDiv.prev();
    if (tgtDiv[0]) {
        tgtDiv.before(srcDiv)
    }
    var order = getBtnOrder(".element", $("#" + flag + "OrderWrap")[0]);
    sortOrder(order, flag)
}

function Dbtn(obj) {
    var srcDiv = $(obj).parents(".element");
    var flag = $(obj).prev().prev().attr("name").substr(2, 3);
    var tgtDiv = srcDiv.next();
    if (tgtDiv[0]) {
        tgtDiv.after(srcDiv)
    }
    var order = getBtnOrder(".element", $("#" + flag + "OrderWrap")[0]);
    sortOrder(order, flag)
}

function getBtnOrder(selector, container) {
    var order = [];
    $(selector, container).each(function () {
        order.push($(this).attr('data-order'))
    });
    return order
}

$("#dpsOrderWrap").sortable({
    axis: "y", containment: "parent", update: function (event, ui) {
        var order = $(this).sortable('toArray', {attribute: 'data-order'});
        sortOrder(order, 'dps')
    }
});
$("#hpsOrderWrap").sortable({
    axis: "y", containment: "parent", update: function (event, ui) {
        var order = $(this).sortable('toArray', {attribute: 'data-order'});
        sortOrder(order, 'hps')
    }
});

function sortOrder(order, flag) {
    var data = new Object();
    for (var i in order) {
        var index = $('#' + flag + 'OrderWrap').find("[data-order='" + order[i] + "']").find('.indexName').text();
        var name = $('#' + flag + 'OrderWrap').find("[data-order='" + order[i] + "']").find('.indexName').attr('name');
        data[name] = index
    }
    localStorage.setItem(flag + "Order", JSON.stringify(data));
    customFlag = !0
}

function autoHidden(flag) {
    if (localStorage.getItem("autoHide") == 0 || OnlyUsers == 0)
        return; else {
        if (flag == "OFF") {
            objTime = setTimeout(function () {
                if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1) {
                    $('body').find('[name=raid]').addClass('hidden')
                }
                else {
                    $('body').find('#graphTableBody, #graphTableHeader').addClass('hidden')
                }
                if ($('body').find('[name=main]').hasClass("hidden") == !1 && localStorage.getItem("autoHide") == 1) {
                    if (localStorage.getItem("toast") == 1) {
                        if (localStorage.getItem('lang') == "kr")
                            var $toastContent = $('<div class="row col s12 white-text center">< 자동 숨기기 ><br>데이터 테이블을 다시 보고 싶다면 오버레이를 클릭하세요!</div>');
                        else if (localStorage.getItem("lang") == "cn")
                            var $toastContent = $('<div class="row col s12 white-text center">｛自动隐藏｝<br>想再次查看数据图表？只需点击悬浮窗口！</div>');
                        else if (localStorage.getItem("lang") == "hk")
                            var $toastContent = $('<div class="row col s12 white-text center">｛自動隱藏｝<br>希望再次查看數據表？僅需點擊美化窗口！</div>');
                        else if (localStorage.getItem('lang') == "en")
                            var $toastContent = $('<div class="row col s12 white-text center">< Auto-hide ><br>Do you want to view data table again? Just Click on the Overlay!</div>'); else var $toastContent = $('<div class="row col s12 white-text center">< Auto-hide ><br>Do you want to view data table again? Just Click on the Overlay!</div>');
                        Materialize.toast($toastContent, 3000)
                    }
                }
            }, parseInt(localStorage.getItem('autoHideTime')) * 60000)
        }
        else {
            if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1) {
                $('body').find('[name=raid]').removeClass('hidden')
            }
            else {
                $('body').find('#graphTableBody, #graphTableHeader').removeClass('hidden')
            }
            clearTimeout(objTime);
            if (lastCombat.title != 'Encounter')
                autoHidden("OFF")
        }
    }
}

function arrowHidden(flag) {
    if (flag == 0) {
        if ($('[name=main]').hasClass("hidden") == !0)
            $('#zone').css('backgroundColor', '#303030'); else $('#zone').css('background', 'transparent')
    } else {
        if ($('[name=main]').hasClass("hidden") == !0) {
            $('#zone').css('background', 'transparent');
            $('#zone').css('backgroundColor', '#303030')
        } else {
            $('#zone').css('background-image', 'url(./images/handle.svg)');
            $('#zone').css('background-size', '1.25rem 1.25rem');
            $('#zone').css('background-position', 'bottom right');
            $('#zone').css('background-repeat', 'no-repeat');
            $('#zone').css('backgroundColor', 'transparent')
        }
    }
}

function calFontSize(val, btn) {
    switch (val) {
        case 8:
            if (btn == 'plus') return 10; else return 8;
        case 10:
            if (btn == 'plus') return 12; else return 8;
        case 12:
            if (btn == 'plus') return 14; else return 10;
        case 14:
            if (btn == 'plus') return 16; else return 12;
        case 16:
            if (btn == 'plus') return 20; else return 14;
        case 20:
            if (btn == 'plus') return 24; else return 16;
        case 24:
            if (btn == 'plus') return 28; else return 20;
        case 28:
            if (btn == 'plus') return 32; else return 24;
        case 32:
            if (btn == 'plus') return 32; else return 28
    }
}

function setFontSize(val) {
    switch (val) {
        case 8:
            $('html').css('font-size', '55%');
            break;
        case 10:
            $('html').css('font-size', '62.5%');
            break;
        case 12:
            $('html').css('font-size', '75%');
            break;
        case 14:
            $('html').css('font-size', '87.5%');
            break;
        case 16:
            $('html').css('font-size', '100%');
            break;
        case 20:
            $('html').css('font-size', '125%');
            break;
        case 24:
            $('html').css('font-size', '150%');
            break;
        case 28:
            $('html').css('font-size', '175%');
            break;
        case 32:
            $('html').css('font-size', '200%');
            break
    }
}

function jscolorUpdate(jscolor) {
    var id = jscolor.styleElement.id;
    var newColor = jscolor.toHEXString().split('#')[1];
    localStorage.setItem(id, newColor)
}

function toggleFullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen()
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen()
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen()
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
        }
    }
}

function fullscreenCheck() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
        $('#fullscreen input').prop('checked', !1);
        $('#fullscreen i').css('color', 'rgba(255,255,255,0.5)');
        localStorage.setItem('fullscreen', 0)
    }
    if (lastCombat == null) {
        $('#dropdown1 li#history a').removeClass('white-text');
        $('#dropdown1 li#history a').css('color', 'rgba(255,255,255,.5)');
        $('#dropdown1 li#history a').css('cursor', 'not-allowed');
        startFlag = 1;
        return
    } else {
        if (lastCombat.title == 'Encounter') {
            startFlag = 0;
            $('#dropdown1 li#history a').removeClass('white-text');
            $('#dropdown1 li#history a').css('color', 'rgba(255,255,255,.5)');
            $('#dropdown1 li#history a').css('cursor', 'not-allowed')
        } else {
            startFlag = 1;
            $('#dropdown1 li#history a').addClass('white-text');
            $('#dropdown1 li#history a').css('cursor', 'pointer')
        }
    }
}

function closeHistory() {
    $('#history input').prop('checked', !1);
    $('#history i').css('color', 'rgba(255,255,255,0.38)');
    $('ul[name=main]').removeClass('hidden');
    $('ul[name=history]').addClass('hidden');
    localStorage.setItem('history', 0);
    $('#historyTableHeader, #historyTableBody').addClass('hidden');
    if (tableFlag == 2 || tableFlag == 0) {
        $('#graphTableBody, #graphTableHeader').removeClass('hidden')
    } else {
        $('[name=raid]').removeClass('hidden')
    }
    adjustTopbarHeight()
}

function adjustTopbarHeight() {
    height = parseFloat(localStorage.getItem('topbarHeight') / 10);
    $('.toolbtn').css('height', (height - 0.2) + 'rem');
    if (localStorage.getItem('border') == 1)
        $('.toolbtn').css('height', (height - 0.4) + 'rem');
    $('nav, nav i, .navbar_text').css('height', height + 'rem');
    $('nav, nav i, .navbar_text').css('line-height', height + 'rem');
    $('nav ul.dropdown-content div, nav ul.dropdown-content div i').css('height', 5 + 'rem');
    $('nav ul.dropdown-content div, nav ul.dropdown-content div i').css('line-height', 5 + 'rem');
    $('#previewTopbar').css('height', height + 'rem');
    if ($('[name=main]').hasClass('hidden') == !0 || tableFlag == 1) {
        $('.navbar-fixed').css('height', height + 'rem')
    } else {
        if (lastCombat == null)
            $('.navbar-fixed').css('height', height + 'rem')
        else $('.navbar-fixed').css('height', (height + 1.5) + 'rem')
    }
    $('.dropdown-content li>a>i').css('line-height', 'inherit');
    $('.dropdown-content li>a>i').css('height', 'inherit')
}

function adjustCellWidth() {
    $('body').find('.narrowCell1').css('width', parseFloat(localStorage.getItem('narrowCell1') / 10) + 'rem');
    $('body').find('.narrowCell2').css('width', parseFloat(localStorage.getItem('narrowCell2') / 10) + 'rem');
    $('body').find('.wideCell1').css('width', parseFloat(localStorage.getItem('wideCell1') / 10) + 'rem');
    $('body').find('.wideCell2').css('width', parseFloat(localStorage.getItem('wideCell2') / 10) + 'rem')
}

function initViewPage(id) {
    $('#mainTopBar').css('background', '#303030');
    $('nav').addClass('z-depth-1');
    $('#zone').css('backgroundColor', '#303030');
    preScrollVal = scrollValue;
    $(document).scrollTop(0);
    $('body').find('[name="' + id + '"]').removeClass('hidden')
}

function viewPage(obj) {
    switch (obj.id) {
        case 'settings':
            $(document).scrollTop(0);
            viewSettingsFlag = !0;
            $('nav').css('background', '#303030');
            $('nav').removeClass('z-depth-0');
            $('nav').addClass('z-depth-1');
            $('.navbar-fixed').css('height', height + 'rem');
            $('#mainTopBar').css('background', '#303030');
            $('body').find('[name="notice"]').fadeOut(0);
            $('body').find('[name="main"]').addClass('hidden');
            $('body').find('[name="raid"]').addClass('hidden');
            $('body').find('[name="settingsPage"]').removeClass('hidden');
            arrowHidden(localStorage.getItem("arrow"));
            break;
        case 'dataOrder':
            initViewPage(obj.id);
            createOrderDiv('dps');
            createOrderDiv('hps');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'backup':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'generalACT':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'healerACT':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'dataProgressing':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'dataTable':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'graphColor':
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('#zone').css('backgroundColor', '#303030');
            pre2ScrollVal = scrollValue;
            $(document).scrollTop(0);
            $('body').find('[name="graphColor"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            $('body').find('[name="graph"]').addClass('hidden');
            break;
        case 'font':
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('#zone').css('backgroundColor', '#303030');
            pre2ScrollVal = scrollValue;
            $(document).scrollTop(0);
            $('body').find('[name="font"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            $('body').find('[name="fontSettings"]').addClass('hidden');
            break;
        case 'dataAbb':
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('#zone').css('backgroundColor', '#303030');
            pre2ScrollVal = scrollValue;
            $(document).scrollTop(0);
            createAbbDataDiv();
            $('body').find('[name="dataAbb"]').removeClass('hidden');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            $('body').find('[name="dataProgressing"]').addClass('hidden');
            break;
        case 'cellWidth':
            initViewPage(obj.id);
            previewValue();
            $('#previewH').find('td').css('background', 'rgba(0,0,0,1)');
            $('#previewH').find('td').css('color', 'rgba(255,255,255,0.7)');
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'design':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'developer':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'graph':
            initViewPage(obj.id);
            previewValue();
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'fontSettings':
            initViewPage(obj.id);
            $('body').find('[name="settingsPage"]').addClass('hidden');
            break;
        case 'backGraph':
            $('body').find('[name="graphColor"]').addClass('hidden');
            $('body').find('[name="graph"]').removeClass('hidden');
            $(document).scrollTop(parseInt(pre2ScrollVal));
            onSettingsUpdate('previewColor');
            break;
        case 'backfont':
            settingsFont();
            $('body').find('[name="font"]').addClass('hidden');
            $('body').find('[name="fontSettings"]').removeClass('hidden');
            $(document).scrollTop(parseInt(pre2ScrollVal));
            break;
        case 'backdataAbb':
            settingsFont();
            $('body').find('[name="dataAbb"]').addClass('hidden');
            $('body').find('[name="dataProgressing"]').removeClass('hidden');
            $(document).scrollTop(parseInt(pre2ScrollVal));
            dataAbbList = JSON.parse(localStorage.getItem("abbList"));
            break;
        case 'backSettings':
            $('#mainTopBar').css('background', '#303030');
            $('nav').addClass('z-depth-1');
            $('#zone').css('background', 'transparent');
            $('body').find('[name="dataOrder"]').addClass('hidden');
            $('body').find('[name="backup"]').addClass('hidden');
            $('body').find('[name="dataTable"]').addClass('hidden');
            $('body').find('[name="dataProgressing"]').addClass('hidden');
            $('body').find('[name="developer"]').addClass('hidden');
            $('body').find('[name="cellWidth"]').addClass('hidden');
            $('body').find('[name="graph"]').addClass('hidden');
            $('body').find('[name="fontSettings"]').addClass('hidden');
            $('body').find('[name="design"]').addClass('hidden');
            $('body').find('[name="healerACT"]').addClass('hidden');
            $('body').find('[name="generalACT"]').addClass('hidden');
            $('body').find('[name="settingsPage"]').removeClass('hidden');
            $('.navbar-fixed').css('height', height + 'rem');
            $(document).scrollTop(parseInt(preScrollVal));
            dataShare();
            break;
        case 'back':
            $('body').find('[name="main"]').removeClass('hidden');
            $('body').find('[name="raid"]').removeClass('hidden');
            if (lastCombat == null) {
                $('body').find('[name="notice"]').fadeIn(500);
                arrowHidden(0)
            } else arrowHidden(localStorage.getItem("arrow"));
            $('body').find('[name="settingsPage"]').addClass('hidden');
            closeHistory();
            viewSettingsFlag = !1;
            update();
            $('nav').removeClass('z-depth-1');
            $('nav').addClass('z-depth-0');
            $('nav').css('background', 'transparent');
            $(document).scrollTop(0);
            autoHidden("ON");
            clearTimeout(objTime);
            onSettingsUpdate('topbarBackgroundColor');
            break
    }
}

function buttonCotrol(obj) {
    var check = null;
    switch (obj.id) {
        case 'tooltip':
        case 'line':
        case 'gradation':
        case 'petAction':
        case 'ranking':
        case 'youColor':
        case 'maxAbb':
            changeCheckIcon(obj);
            initCheck(obj.id);
            break;
        case 'dot':
            check = changeCheckIcon(obj);
            if (check == 1) {
                $('[name=m85]').html('<font class="rdColor">ON </font>1.234<font class="rdColor">　OFF </font>1234')
            } else {
                $('[name=m85]').html('<font class="rdColor">ON </font>1,234<font class="rdColor">　OFF </font>1234')
            }
            $('.rdColor').css('color', accentColor);
            break;
        case 'toast':
        case 'align':
        case 'myID':
        case 'raidMode':
        case 'border':
        case 'edge':
        case 'meBold':
        case 'otherBold':
        case 'comma':
            changeCheckIcon(obj);
            break;
        case 'arrow':
            check = changeCheckIcon(obj);
            arrowHidden(localStorage.getItem("arrow"));
            break;
        case 'autoHide':
            changeCheckIcon(obj);
            initCheck(obj.id);
            break;
        case 'capture':
            $('#capture i').removeClass('flash animated').addClass('flash animated').one('animationend', function () {
                $(this).removeClass('flash animated')
            });
            if (localStorage.getItem("tooltip") == 1)
                $('.tooltipped').tooltip('remove');
            $('body').find('.dropdown-button').dropdown('close');
            setTimeout(function () {
                webs.overlayAPI("Capture")
            }, 2000);
            if (localStorage.getItem("toast") == 1) {
                setTimeout(function () {
                    if (localStorage.getItem('lang') == "cn")
                        var $toastContent = $('<div class="row col s12 white-text center">< 图像路径 ><br>ACT目录\\ScreenShot</div>');
                    else if (localStorage.getItem('lang') == "hk")
                        var $toastContent = $('<div class="row col s12 white-text center">< 圖像路徑 ><br>ACT目録\\ScreenShot</div>');
                    else
                        var $toastContent = $('<div class="row col s12 white-text center">< Image Path ><br>Advanced Combat Tracker or ACTv3\\ScreenShot</div>');
                    Materialize.toast($toastContent, 3000)
                }, 3000)
            }
            if (localStorage.getItem("tooltip") == 1)
                $('.tooltipped').tooltip({delay: 25});
            break;
        case 'endEncounter':
            $('#endEncounter i').removeClass('flash animated').addClass('flash animated').one('animationend', function () {
                $(this).removeClass('flash animated')
            });
            webs.overlayAPI("RequestEnd");
            break;
        case 'init':
            if (confirm(mpLang.m163) == !0) {
                localStorage.clear();
                location.reload()
            }
            break;
        case 'reload':
            location.reload();
            $(document).scrollTop(0);
            break;
        case 'history':
            if (lastCombat != null) {
                if (lastCombat.title != "Encounter") {
                    check = toggleIcon(obj);
                    if (check) {
                        if (tableFlag == 2 || tableFlag == 0) {
                            $('#graphTableHeader,#graphTableBody').addClass('hidden')
                        } else $('[name=raid]').addClass('hidden');
                        $('ul[name=main]').addClass('hidden');
                        $('body').find('[name="notice"]').fadeOut(0);
                        $('ul[name=history]').removeClass('hidden');
                        $('#historyTableHeader, #historyTableBody').removeClass('hidden')
                    }
                    $('.navbar-fixed').css('height', (height + 1.5) + 'rem')
                }
            }
            break;
        case 'hideName':
            toggleIcon(obj);
            $(document).scrollTop(0);
            update();
            break;
        case 'HPS':
            $(document).scrollTop(0);
            check = toggleIcon(obj);
            if (check == !0) {
                update();
                $('#hpsTable,#hpsRaidTable').fadeIn(150)
            } else $('#hpsTable,#hpsRaidTable').fadeOut(150);
            break;
        case 'fullscreen':
            toggleIcon(obj);
            toggleFullScreen();
            break;
        case 'pets':
            initCheck(obj.id);
            check = changeCheckIcon(obj);
            if (check == !0) {
                $('body').find('.ava').remove();
                $('#Merge').removeClass('hidden');
                $('#NoMerge').addClass('hidden')
            } else {
                $('#Merge').addClass('hidden');
                $('#NoMerge').removeClass('hidden')
            }
            break;
        case 'number':
            check = changeCheckIcon(obj);
            if (check == !0)
                inputNumber = 2; else inputNumber = 0;
            break;
        case 'animation':
            check = changeCheckIcon(obj);
            $('#previewBar1,#previewBar2,#previewBar3,#previewBar4,#previewBar5,#previewBar6').css('width', '0%');
            if (check == !0) {
                $('#previewBar1,#previewBar4').animate({width: '100%'});
                $('#previewBar2').animate({width: '50%'});
                $('#previewBar3').animate({width: '25%'});
                $('#previewBar5').animate({width: '66%'});
                $('#previewBar6').animate({width: '33%'})
            } else {
                $('#previewBar1,#previewBar4').css('width', '100%');
                $('#previewBar2').css('width', '50%');
                $('#previewBar3').css('width', '25%');
                $('#previewBar5').css('width', '66%');
                $('#previewBar6').css('width', '33%')
            }
            break
    }
}

function toggleIcon(obj) {
    var val = $('#' + obj.id + ' input').prop('checked');
    if (val == !0) {
        $('#' + obj.id + ' input').prop('checked', !1);
        $('#' + obj.id + ' i').css('color', 'rgba(255,255,255,0.38)');
        localStorage.setItem(obj.id, 0);
        return !1
    } else {
        $('#' + obj.id + ' input').prop('checked', !0);
        $('#' + obj.id + ' i').css('color', accentColor);
        localStorage.setItem(obj.id, 1);
        return !0
    }
}

function changeCheckIcon(obj) {
    var val = $('input#' + obj.id).prop('checked');
    if (val == !0) {
        $('input#' + obj.id).prop('checked', !1);
        localStorage.setItem(obj.id, 0);
        return !1
    } else {
        $('input#' + obj.id).prop('checked', !0);
        localStorage.setItem(obj.id, 1);
        return !0
    }
}

var unit = '';

function getID(id) {
    unit = id
}

function radioButtonCotrol(id) {
    var name = $('#' + id).find('input').attr('name');
    var t = name.split('_')[1];
    switch (name) {
        case 'radio_nameType':
            $('#lb-' + localStorage.getItem('nameType')).prop('checked', !1);
            if (id == 'AType') {
                $('#r_nameType').html(mpLang.m208)
                $('#r_nameType').attr('name', 'm208')
            } else if (id == 'BType') {
                $('#r_nameType').html(mpLang.m209)
                $('#r_nameType').attr('name', 'm209')
            } else if (id == 'CType') {
                $('#r_nameType').html(mpLang.m210)
                $('#r_nameType').attr('name', 'm210')
            } else {
                $('#r_nameType').html(mpLang.m211)
                $('#r_nameType').attr('name', 'm211')
            }
            localStorage.setItem(t, id);
            $('#lb-' + id).prop('checked', !0);
            break;
        case 'radio_lang':
            $('#lb-' + localStorage.getItem('lang')).prop('checked', !1);
            if (id == 'kr') {
                localStorage.setItem('lang', 'kr');
                mpLang = mpKR;
                $('html').attr('lang', 'kr');
                settingsFont();
                $('#r_Lang').text('한국어');
                $('#capture a').attr('data-tooltip', '캡처 (Only PC)');
                $('#endEncounter a').attr('data-tooltip', '전투 집계 종료');
                $('#more a').attr('data-tooltip', '더보기');
                $('body').find('.scrollbtn a').attr('data-tooltip', '스크롤');
                $('body').find('[lang=kr]').removeClass('hidden');
                $('body').find('[lang=en]').addClass('hidden');
                $('body').find('[lang=cn]').addClass('hidden');
                $('body').find('[lang=hk]').addClass('hidden');
            } else if (id == 'cn') {
                localStorage.setItem('lang', 'cn');
                mpLang = mpCN;
                $('html').attr('lang', 'cn');
                settingsFont();
                $('#r_Lang').text('简体中文');
                $('#capture a').attr('data-tooltip', '截图 (仅限PC)');
                $('#endEncounter a').attr('data-tooltip', '结束战斗记录');
                $('#more a').attr('data-tooltip', '更多');
                $('body').find('.scrollbtn a').attr('data-tooltip', '滚动');
                $('body').find('[lang=cn]').removeClass('hidden');
                $('body').find('[lang=kr]').addClass('hidden');
                $('body').find('[lang=en]').addClass('hidden');
                $('body').find('[lang=hk]').addClass('hidden');
            } else if (id == 'hk') {
                localStorage.setItem('lang', 'hk');
                mpLang = mpCT;
                $('html').attr('lang', 'hk');
                settingsFont();
                $('#r_Lang').text('正體中文');
                $('#capture a').attr('data-tooltip', '截圖 (PC專用)');
                $('#endEncounter a').attr('data-tooltip', '結束戰鬥統計');
                $('#more a').attr('data-tooltip', '更多');
                $('body').find('.scrollbtn a').attr('data-tooltip', '滾動');
                $('body').find('[lang=hk]').removeClass('hidden');
                $('body').find('[lang=kr]').addClass('hidden');
                $('body').find('[lang=en]').addClass('hidden');
                $('body').find('[lang=cn]').addClass('hidden');
            }else if (id == 'jp') {
                localStorage.setItem('lang', 'jp');
                $('html').attr('lang', 'jp');
                settingsFont();
                $('#capture a').attr('data-tooltip', 'キャプチャー (PCのみ可能)');
                $('#endEncounter a').attr('data-tooltip', 'エンカウント終了');
                $('#more a').attr('data-tooltip', 'もっと見る');
                $('body').find('.scrollbtn a').attr('data-tooltip', 'スクロール');
                mpLang = mpJP;
                $('#r_Lang').text('日本語');
                $('body').find('[lang=en]').removeClass('hidden');
                $('body').find('[lang=kr]').addClass('hidden');
                $('body').find('[lang=cn]').addClass('hidden');
                $('body').find('[lang=hk]').addClass('hidden');
            } else if (id == 'de') {
                localStorage.setItem('lang', 'de');
                $('html').attr('lang', 'de');
                settingsFont();
                $('#capture a').attr('data-tooltip', 'Bildschirmfoto (Nur auf dem PC)');
                $('#endEncounter a').attr('data-tooltip', 'Stoppe den Kampf');
                $('#more a').attr('data-tooltip', 'Mehr');
                $('body').find('.scrollbtn a').attr('data-tooltip', 'Scrollen');
                mpLang = mpDE;
                $('#r_Lang').text('Deutsch');
                $('body').find('[lang=en]').removeClass('hidden');
                $('body').find('[lang=kr]').addClass('hidden')
                $('body').find('[lang=cn]').addClass('hidden')
                $('body').find('[lang=hk]').addClass('hidden')
            } else {
                localStorage.setItem('lang', 'en');
                $('html').attr('lang', 'en');
                settingsFont();
                $('#capture a').attr('data-tooltip', 'Capture (Only PC)');
                $('#endEncounter a').attr('data-tooltip', 'End Encounter');
                $('#more a').attr('data-tooltip', 'More');
                $('body').find('.scrollbtn a').attr('data-tooltip', 'Scroll');
                mpLang = mpEN;
                $('#r_Lang').text('English')
                $('body').find('[lang=en]').removeClass('hidden');
                $('body').find('[lang=kr]').addClass('hidden');
                $('body').find('[lang=cn]').addClass('hidden');
                $('body').find('[lang=hk]').addClass('hidden');
            }
            for (var i in mpLang)
                $('[name="' + i + '"]').html(mpLang[i]);
            if (localStorage.getItem('ranking') == 1)
                $('body').find('[name=m215]').text(mpLang.m37); else $('body').find('[name=m215]').text(mpLang.m214);
            $('.rdColor').css('color', accentColor);
            $('#lb-' + id).prop('checked', !0);
            initCheck('HPS');
            initCheck('hideName');
            initCheck('fullscreen');
            if (localStorage.getItem("tooltip") == 1)
                $('.tooltipped').tooltip({delay: 25}); else $('.tooltipped').tooltip('remove');
            if (!localStorage.getItem("dt"))
                $('#backupDate').text(' = No Data, Please click to backup.'); else $('#backupDate').text(' = ' + localStorage.getItem("dt"));
            $('[name=m151]').text($('#verDate').text());
            break
    }
}

function settingsFont() {
    var change_timeFont = $("[name=timeFont]").val();
    var change_indexFont = $("[name=indexFont]").val();
    var change_krFont = $("[name=krFont]").val();
    var change_enFont = $("[name=enFont]").val();
    var change_cnFont = $("[name=cnFont]").val();
    var change_hkFont = $("[name=hkFont]").val();
    var change_jpFont = $("[name=jpFont]").val();
    var change_deFont = $("[name=deFont]").val();
    if (change_timeFont == "")
        localStorage.setItem('timeFont', 'Montserrat'); else localStorage.setItem('timeFont', change_timeFont);
    if (change_indexFont == "")
        localStorage.setItem('indexFont', 'Roboto Condensed'); else localStorage.setItem('indexFont', change_indexFont);
    if (change_krFont == "")
        localStorage.setItem('krFont', 'Segoe UI'); else localStorage.setItem('krFont', change_krFont);
    if (change_jpFont == "")
        localStorage.setItem('jpFont', 'Meiryo'); else localStorage.setItem('jpFont', change_jpFont);
    if (change_cnFont == "")
        localStorage.setItem('cnFont', '更纱黑体'); else localStorage.setItem('cnFont', change_cnFont);
    if (change_hkFont == "")
        localStorage.setItem('hkFont', '更纱黑体'); else localStorage.setItem('hkFont', change_hkFont);
    if (change_enFont == "")
        localStorage.setItem('enFont', 'Roboto'); else localStorage.setItem('enFont', change_enFont);
    if (change_deFont == "")
        localStorage.setItem('deFont', 'Segoe UI'); else localStorage.setItem('deFont', change_deFont);
    $(":lang(kr)").css("font-family", "'" + change_krFont + "', 'Segoe UI', sans-serif");
    $(":lang(cn)").css("font-family", "'" + change_cnFont + "', '更纱黑体', sans-serif");
    $(":lang(hk)").css("font-family", "'" + change_hkFont + "', '更纱黑体', sans-serif");
    $(":lang(jp)").css("font-family", "'" + change_jpFont + "', 'Meiryo', sans-serif");
    $(":lang(en)").css("font-family", "'" + change_enFont + "', 'Roboto', sans-serif");
    $(":lang(de)").css("font-family", "'" + change_deFont + "', 'Segoe UI', sans-serif");
    if (localStorage.getItem('lang') == "kr")
        $('body').find("[name=raid]>td.right.value").css("font-family", "'" + change_krFont + "', 'Segoe UI', sans-serif");
    else if (localStorage.getItem('lang') == "cn")
        $('body').find("[name=raid]>td.right.value").css("font-family", "'" + change_cnFont + "', '更纱黑体', sans-serif");
    else if (localStorage.getItem('lang') == "hk")
        $('body').find("[name=raid]>td.right.value").css("font-family", "'" + change_hkFont + "', '更纱黑体', sans-serif");
    else if (localStorage.getItem('lang') == "jp")
        $('body').find("[name=raid]>td.right.value").css("font-family", "'" + change_jpFont + "', 'Segoe UI', sans-serif");
    else if (localStorage.getItem('lang') == "en")
        $('body').find("[name=raid]>td.right.value").css("font-family", "'" + change_enFont + "', 'Segoe UI', sans-serif");
    else
        $('body').find("[name=raid]>td.right.value").css("font-family", "'" + change_deFont + "', 'Segoe UI', sans-serif");
    $("i").css("font-family", "");
    $('#dropdown2>li#jp>label>font').css('font-family', 'Segoe UI, sans-serif');
    $('body').find(".time").css('font-family', "'" + change_timeFont + "', 'Montserrat', sans-serif");
    $('body').find(".info").css('font-family',"'" + change_cnFont + "', '" + change_hkFont + "', '" + change_jpFont + "', '" + change_krFont + "'" + ", 'Meiryo', 'Segoe UI', 'sans-serif'");
    $('body').find(".smallText,.tableHeader td,[name=raid] td.left").css('font-family', "'" + change_indexFont + "', 'Roboto Condensed'," + "'" + change_cnFont + "', '" + change_hkFont + "', '" + change_jpFont + "', '" + change_krFont + "', 'sans-serif'");
    $("[name=timeFont]").val(localStorage.getItem('timeFont'));
    $("[name=indexFont]").val(localStorage.getItem('indexFont'));
    $("[name=krFont]").val(localStorage.getItem('krFont'));
    $("[name=cnFont]").val(localStorage.getItem('cnFont'));
    $("[name=hkFont]").val(localStorage.getItem('hkFont'));
    $("[name=enFont]").val(localStorage.getItem('enFont'));
    $("[name=jpFont]").val(localStorage.getItem('jpFont'));
    $("[name=deFont]").val(localStorage.getItem('deFont'))
}

function onSettingsUpdate(id) {
    switch (id) {
        case 'accentColor':
            accentColor = '#' + localStorage.getItem('accentColor');
            $('[type="range"],[type="checkbox"]+label').css('background-color', accentColor);
            $('.time,#clear,.rdColor').css('color', accentColor);
            $('.swColor').css('background-color', accentColor);
            $('body').find('.mainIcon').css('color', accentColor);
            $('body').find(":contains('star')").css('color', accentColor);
            $('body').find(":contains('star_border')").css('color', 'rgba(255,255,255,0.38)');
            if (localStorage.getItem('hideName') == 1)
                $('#hideName i').css('color', accentColor);
            if (localStorage.getItem('HPS') == 1)
                $('#HPS i').css('color', accentColor);
            break;
        case 'borderColor':
            borderColor = '#' + localStorage.getItem('borderColor');
            if (localStorage.getItem('border') == 1) {
                var c = oHexColor(borderColor);
                $('#mainTopBar,#previewTopbar').css('border', 'solid .1rem' + ' rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + now_to + ')')
            } else $('#mainTopBar,#previewTopbar').css('border', '0');
            break;
        case 'to':
        case 'topbarBackgroundColor':
            topbarBackgroundColor = '#' + localStorage.getItem('topbarBackgroundColor');
            var b = oHexColor(topbarBackgroundColor);
            $('#mainTopBar,#previewTopbar').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + now_to + ')');
            break;
        case 'headerColor':
            headerColor = '#' + localStorage.getItem('header');
            var a = oHexColor(headerColor);
            $('.previewImage').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + now_ho + ')');
            break;
        case 'edge':
            if (localStorage.getItem('edge') == 1)
                $('#mainTopBar,#previewTopbar').css('border-radius', '.6rem .6rem 0 0'); else $('#mainTopBar,#previewTopbar').css('border-radius', '0');
            break;
        case 'border':
            if (localStorage.getItem('border') == 1) {
                var c = oHexColor(borderColor);
                $('#mainTopBar,#previewTopbar').css('border', 'solid .1rem rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + now_to + ')')
            } else $('#mainTopBar,#previewTopbar').css('border', '0');
            break;
        case 'bigTextColor':
            $('.bigText').css('color', '#' + localStorage.getItem('bigTextColor'));
            break;
        case 'smallTextColor':
            $('.smallText').css('color', '#' + localStorage.getItem('smallTextColor'));
            break;
        case 'headerText':
            $('body').find(".tableHeader td").css('color', '#' + localStorage.getItem('headerText'));
            break;
        case 'ho':
            var a = oHexColor(localStorage.getItem('header'));
            $('body').find('.headerbg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + now_ho + ')');
            break;
        case 'bo':
            var b = oHexColor(localStorage.getItem('background'));
            $('body').find('.barBg').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + now_bo + ')');
            $('.raid .collapsible-header').css('background', 'rgba(' + b.r + ',' + b.g + ',' + b.b + ',' + now_bo + ')');
            $('.raid .collapsible-body').css('background', 'rgba(0,0,0,' + (now_bo + 0.1) + ')');
            break;
        case 'go':
            $('body').find('.bar').css('opacity', now_go);
            $('body').find('.bar.pet').css('opacity', 0.5);
            var c = oHexColor(accentColor);
            $('body').find('[name=RaidYOU]').css('background', 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + now_go + ')');
            break;
        case 'lo':
            var d = oHexColor(localStorage.getItem('lineColor'));
            $('body').find('[name=previewLine],#graphTableBody .divider').css('backgroundColor', "rgba(" + d.r + ',' + d.g + ',' + d.b + ',' + now_lo + ")");
            break
        case 'textColor':
            $('#graphTableBody, [name=raid]').find('td').css('color', "#" + localStorage.getItem("other"));
            $('#graphTableBody, [name=raid]').find("[name=RaidYOU], #dpsYOU, #hpsYOU").find('td').css('color', "#" + localStorage.getItem("me"));
            $('body').find('.dataYOU').find('td').css('color', "#" + localStorage.getItem("me"));
            $('.raid .collapsible-body').find('td.left').css('color', '#bdbdbd');
            $('.raid .collapsible-body').find('td.right.value').css('color', accentColor);
            break;
        case 'bold':
            if (localStorage.getItem('otherBold') == 1) {
                $('#graphTableBody, [name=raid], #Merge, #NoMerge').find('td').css('font-weight', 'bold')
            } else {
                $('#graphTableBody, [name=raid], #Merge, #NoMerge').find('td').css('font-weight', 'normal')
            }
            if (localStorage.getItem('meBold') == 1) {
                $('#graphTableBody, [name=raid]').find("[name=RaidYOU], #dpsYOU, #hpsYOU").find('td').css('font-weight', 'bold');
                $('body').find('.dataYOU').find('td').css('font-weight', 'bold')
            } else {
                $('#graphTableBody, [name=raid]').find("[name=RaidYOU], #dpsYOU, #hpsYOU").find('td').css('font-weight', 'normal');
                $('body').find('.dataYOU').find('td').css('font-weight', 'normal')
            }
            break;
        case 'previewColor':
            var d = oHexColor(localStorage.getItem('lineColor'));
            $('body').find('[name=previewLine]').css('backgroundColor', "rgba(" + d.r + ',' + d.g + ',' + d.b + ',' + now_lo + ")");
            document.getElementById("previewBar3").style.background = '#' + localStorage.getItem('ava');
            $('#previewBar3').css('opacity', 0.5);
            if (localStorage.getItem('youColor') == 1)
                previewGraph(localStorage.getItem("YOU")); else previewGraph(localStorage.getItem("dps5"));
            $('body').find('#previewBar2,#previewBar5').css('background', '#' + localStorage.getItem('chocobo'));
            var a = oHexColor('#' + localStorage.getItem('background'));
            $('[name=graph] .previewImage .barBg').css('background', 'rgba(' + a.r + ',' + a.g + ',' + a.b + ',' + now_bo + ')');
            break;
        case 'align':
            if (localStorage.getItem('align') == 0) {
                $('html').find('.wideCell2').css('text-align', 'center');
                $('html').find('.wideCell2').css('padding-left', '0')
            } else {
                $('html').find('.wideCell2').css('text-align', 'left');
                $('html').find('.wideCell2').css('padding-left', '.5rem')
            }
            break
    }
}

function previewGraph(color) {
    if (localStorage.getItem("gradation") == 1) {
        document.getElementById("previewBar1").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + color + "), to(rgba(24,24,24,0.0)))"
        document.getElementById("previewBar2").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + localStorage.getItem("chocobo") + "), to(rgba(24,24,24,0.0)))"
        document.getElementById("previewBar3").style.background = '#' + localStorage.getItem('ava');
        document.getElementById("previewBar4").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + color + "), to(rgba(24,24,24,0.0)))"
        document.getElementById("previewBar5").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + localStorage.getItem("chocobo") + "), to(rgba(24,24,24,0.0)))"
        document.getElementById("previewBar6").style.background = "-webkit-gradient(linear, left top,right top, color-stop(0.6, #" + color + "), to(rgba(24,24,24,0.0)))"
    } else {
        document.getElementById("previewBar1").style.background = '#' + color;
        document.getElementById("previewBar2").style.background = '#' + localStorage.getItem('chocobo');
        document.getElementById("previewBar3").style.background = '#' + localStorage.getItem('ava');
        document.getElementById("previewBar4").style.background = '#' + color;
        document.getElementById("previewBar5").style.background = '#' + localStorage.getItem('chocobo');
        document.getElementById("previewBar6").style.background = '#' + color
    }
}

function previewValue() {
    for (var i = 1; i <= 24; i++) {
        var value = parseFloat(delComma($('#c' + i).attr('value')));
        if (i == 3 || i == 7 || i == 11 || i == 15 || i == 19 || i == 23) {
            var fixed = addComma(value);
            $('#c' + i).text(fixed)
        } else if (i == 2 || i == 6 || i == 10 || i == 14 || i == 18 || i == 22) {
            var fixed = addComma(value.toFixed(inputNumber / 2));
            $('#c' + i).text(fixed + '%')
        } else if (i == 4 || i == 8 || i == 12 || i == 16 || i == 20 || i == 24) {
            var fixed = addComma(value);
            $('#c' + i).text("Action - " + fixed)
        } else {
            var fixed = addComma(value.toFixed(inputNumber));
            $('#c' + i).text(fixed)
        }
    }
}

function initCheck(name) {
    var value = localStorage.getItem(name);
    if (value == 1) {
        switch (name) {
            case 'tooltip':
                $('#' + name + ' input').attr('checked', !0);
                $('.tooltipped').tooltip({delay: 25});
                break;
            case 'HPS':
                $('#' + name + ' input').attr('checked', !0);
                $('li#' + name + ' i').css('color', accentColor);
                $('#hpsTable,#hpsRaidTable').fadeIn(150);
                break;
            case 'hideName':
                $('#' + name + ' input').attr('checked', !0);
                $('li#' + name + ' i').css('color', accentColor);
                break;
            case 'ranking':
                $('input#' + name).attr('checked', !0);
                $('body').find('[name=rankingName],.tableHeader .nameCell').text('R.Name');
                $('body').find('[name=rankingName2]').text('1. YOU');
                $('body').find('[name=rankingName3]').text('2. Chocobo');
                $('body').find('[name=rankingName4]').text('3. Egi');
                $('body').find('[name=m215]').text(mpLang.m37);
                break;
            case 'autoHide':
                $('input#' + name).attr('checked', !0);
                $('[name=autoHide]').fadeIn(150);
                $("body").scrollTop($(document).height());
                break;
            case 'youColor':
                $('input#' + name).attr('checked', !0);
                $('[name=youColor]').fadeIn(150);
                previewGraph(localStorage.getItem("YOU"));
                break;
            case 'maxAbb':
                $('input#' + name).attr('checked', !0);
                $('[name=maxAbb]').fadeIn(150);
                previewGraph(localStorage.getItem("maxAbb"));
                break;
            case 'line':
                $('input#' + name).attr('checked', !0);
                $('body').find('[name=previewLine]').removeClass('hidden');
                break;
            case 'gradation':
                $('input#' + name).attr('checked', !0);
                $('body').find('.barHeal, .barDeal').css('float', 'left');
                if (localStorage.getItem('youColor') == 1)
                    previewGraph(localStorage.getItem("YOU")); else previewGraph(localStorage.getItem("dps5"));
                break;
            case 'petAction':
                $('input#' + name).attr('checked', !0);
                $('#previewBar3').removeClass('hidden');
                break;
            case 'pets':
                $('input#' + name).attr('checked', !0);
                $('#Merge').removeClass('hidden');
                $('#NoMerge').addClass('hidden');
                break;
            default:
                $('input#' + name).attr('checked', !0);
                break
        }
    } else {
        switch (name) {
            case 'tooltip':
                $('#' + name + ' input').attr('checked', !1);
                $('.tooltipped').tooltip('remove');
                break;
            case 'HPS':
                $('#' + name + ' input').attr('checked', !1);
                $('li#' + name + ' i').css('color', 'rgba(255,255,255,0.38)');
                $('#hpsTable,#hpsRaidTable').fadeOut(150);
                break;
            case 'hideName':
                $('#' + name + ' input').attr('checked', !1);
                $('li#' + name + ' i').css('color', 'rgba(255,255,255,0.38)');
                break;
            case 'ranking':
                $('input#' + name).attr('checked', !1);
                $('body').find('[name=rankingName],.tableHeader .nameCell').text('Name');
                $('body').find('[name=rankingName2]').text('YOU');
                $('body').find('[name=rankingName3]').text('Chocobo');
                $('body').find('[name=rankingName4]').text('Egi');
                $('body').find('[name=m215]').text(mpLang.m214);
                break;
            case 'autoHide':
                $('input#' + name).attr('checked', !1);
                $('[name=autoHide]').fadeOut(150);
                break;
            case 'youColor':
                $('input#' + name).attr('checked', !1);
                $('[name=youColor]').fadeOut(150);
                previewGraph(localStorage.getItem("dps5"));
                break;
            case 'maxAbb':
                $('input#' + name).attr('checked', !1);
                $('[name=maxAbb]').fadeOut(150);
                previewGraph(localStorage.getItem("maxAbb"));
                break;
            case 'line':
                $('input#' + name).attr('checked', !1);
                $('body').find('[name=previewLine]').addClass('hidden');
                break;
            case 'gradation':
                $('input#' + name).attr('checked', !1);
                $('body').find('.barHeal, .barDeal').css('float', 'right');
                if (localStorage.getItem('youColor') == 1)
                    previewGraph(localStorage.getItem("YOU")); else previewGraph(localStorage.getItem("dps5"));
                break;
            case 'petAction':
                $('input#' + name).attr('checked', !1);
                $('#previewBar3').addClass('hidden');
                break;
            case 'pets':
                $('input#' + name).attr('checked', !1);
                $('#Merge').addClass('hidden');
                $('#NoMerge').removeClass('hidden');
                break;
            default:
                $('input#' + name).attr('checked', !1);
                break
        }
    }
}

function onUpdateCSS() {
    var index = ['accentColor', 'borderColor', 'topbarBackgroundColor', 'edge', 'border', 'bigTextColor', 'smallTextColor', 'previewColor', 'headerText', 'headerColor', 'textColor', 'ho', 'bo', 'go', 'bold', 'align']
    for (var i in index)
        onSettingsUpdate(index[i]);
    settingsFont();
    adjustTopbarHeight();
    adjustCellWidth();
    previewValue()
}

function onOverlayDataUpdate(e) {
    if (localStorage.getItem('history') == 1)
        closeHistory();
    lastCombat = new Combatant(e, 'encdps');
    lastCombatHPS = new Combatant(e, 'enchps');
    setTimeout(function () {
        saveLog();
        update()
    }, 1)
}

function update() {
    if (lastCombat === null) {
        return
    } else onUpdateUserData()
}

var startFlag = 0;
var onceFlag = 0;

function onUpdateUserData() {
    if (onceFlag == 0) {
        $('body').find('[name="notice"]').fadeOut(0);
        arrowHidden(localStorage.getItem("arrow"));
        onceFlag = 1
    }
    if (startFlag == 1) {
        $('body').find('.dropdown-button').dropdown('close');
        startFlag = 0
    }
    $("nav [name=main]").find(".time").text(lastCombat.duration);
    $("nav [name=main]").find(".info .bigText").text(lastCombat.title);
    if (localStorage.getItem("lang") == "cn") {
        $("nav [name=main]").find(".info .smallText").text("团队伤害：" + addComma(parseInt(lastCombat.Encounter.ENCDPS)) + "　团队治疗：" + addComma(parseInt(lastCombat.Encounter.ENCHPS)));
    }
    else if (localStorage.getItem("lang") == "hk") {
        $("nav [name=main]").find(".info .smallText").text("團隊總傷：" + addComma(parseInt(lastCombat.Encounter.ENCDPS)) + "　團隊治療：" + addComma(parseInt(lastCombat.Encounter.ENCHPS)));
    }
    else {
        $("nav [name=main]").find(".info .smallText").text("RD " + addComma(parseInt(lastCombat.Encounter.ENCDPS)) + "　RH " + addComma(parseInt(lastCombat.Encounter.ENCHPS)));
    }
    if (localStorage.getItem("pets") == 0) {
        lastCombat.summonerMerge = !1;
        lastCombat.DetachPets();
        lastCombat.resort("damage", 1);
        lastCombatHPS.summonerMerge = !1;
        lastCombatHPS.DetachPets();
        lastCombatHPS.resort("healed", 1)
    } else {
        lastCombat.summonerMerge = !0;
        lastCombat.AttachPets();
        lastCombat.resort("mergedDamage", 1);
        lastCombatHPS.summonerMerge = !0;
        lastCombatHPS.AttachPets();
        lastCombatHPS.resort("mergedHealed", 1)
    }
    var dpsPet = 0, hpsPet = 0, hpsUser = 0, dpsUser = 0;
    for (var d in lastCombat.persons) {
        var a = lastCombat.persons[d];
        if (myName == "" && a.get("petOwner") == "YOU") {
            myName = a.get("name").split("(")[1].replace(")", "")
        }
        if (lastCombat.summonerMerge == !0 && a.get("Job") == 'AVA') {
        } else {
            if (a.get("petOwner") != "" && a.get("petOwner") != undefined) {
                if (a.get("role") != 'Healer')
                    dpsPet++; else hpsPet++
            } else {
                if (a.get("role") != 'Healer')
                    dpsUser++; else hpsUser++
            }
        }
    }
    dpsUsers = dpsUser + hpsUser + dpsPet + hpsPet;
    hpsUsers = hpsUser + hpsPet;
    OnlyUsers = dpsUser + hpsUser;
    if (lastCombat.title == 'Encounter' && saveLogFlag == !0) {
        $('#dpsTableBody, #dpsTableHeader tr, #hpsTableBody, #hpsTableHeader tr, #dpsTempTable, #hpsTempTable, #dpsRaidTable, #hpsRaidTable').html('');
        saveLogFlag = !1
        autoHidden("ON")
    }
    if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1) {
        tableFlag = 1;
        adjustTopbarHeight();
        onCreateTable(lastCombat, 'dps', 'dpsTempTable');
        if (localStorage.getItem('HPS') == 1)
            onCreateTable(lastCombatHPS, 'hps', 'hpsTempTable');
        $('#dpsRaidTable,#hpsRaidTable').attr("data-collapsible", "accordion");
        $('.collapsible').collapsible();
        if (viewSettingsFlag == !1) {
            $('#graphTableHeader, #graphTableBody').addClass('hidden');
            $('[name=raid]').removeClass('hidden')
        } else {
            $('[name=main],[name=raid]').addClass('hidden')
        }
    } else {
        tableFlag = 2;
        adjustTopbarHeight();
        onCreateTable(lastCombat, 'dps', 'dpsTableBody');
        if (localStorage.getItem('HPS') == 1)
            onCreateTable(lastCombatHPS, 'hps', 'hpsTableBody');
        $('#graphTableHeader, #graphTableBody').removeClass('hidden');
        $('[name=raid]').addClass('hidden')
    }
    customFlag = !1
}

function onCreateTable(lastData, flag, container) {
    $('#' + container).contents().hide();
    for (var d in lastData.persons) {
        var a = lastData.persons[d];
        if (lastData.summonerMerge == !0 && a.get("Job") == 'AVA') {
        } else {
            if ((lastData == lastCombat || (lastData == lastCombatHPS && a.get("role") == "Healer"))) {
                var userName = a.get("name").replace(/ /g, "").replace("(", "").replace(")", "").replace(/'/g, "_");
                var exist = $('#' + container).find('#' + flag + userName).length;
                if (exist == 0) {
                    var tableBody = document.getElementById(container);
                    if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1)
                        var newBody = onCreateRaidBody(a, flag, userName); else var newBody = onCreateBody(a, flag, userName);
                    tableBody.appendChild(newBody);
                    if (flag == 'dps') inputColData(userName, custom, flag, a, tableFlag, container); else inputColData(userName, healerCustom, flag, a, tableFlag, container)
                } else {
                    if (customFlag == !0) {
                        if (flag == 'dps') inputColData(userName, custom, flag, a, tableFlag, container); else inputColData(userName, healerCustom, flag, a, tableFlag, container)
                    }
                }
                $('#' + container).find('#' + flag + userName).show();
                if (flag == 'dps') onChangeData(a, flag, userName, tableFlag, custom, container); else onChangeData(a, flag, userName, tableFlag, healerCustom, container);
                if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1) {
                    $('#' + container).find('#' + flag + userName).find('.index').css('background', inputColor(a))
                } else {
                    if (localStorage.getItem('line') == 0)
                        $('#wrap').find('li').addClass("hidden"); else $('#wrap').find('li').removeClass("hidden");
                    if (localStorage.getItem('align') == 0) {
                        $('html').find('.wideCell2').css('text-align', 'center');
                        $('html').find('.wideCell2').css('padding', '0')
                    } else {
                        $('html').find('.wideCell2').css('text-align', 'left');
                        $('html').find('.wideCell2').css('padding-left', '.5rem')
                    }
                    inputBarWidth(a, flag, container, userName);
                    inputBarStyle(a, flag, container, userName)
                }
            }
        }
    }
    var sorted = onSortData($('#' + container + '>div'), 'data-value');
    $('#' + container).html(sorted);
    for (var i = 0; i < sorted.length; i++)
        $('#' + container).find('#' + sorted[i].id).attr('data-order', parseInt(i))
    if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1)
        inputList(lastData, container, flag);
    adjustCellWidth();
    onSettingsUpdate('ho');
    onSettingsUpdate('lo');
    onSettingsUpdate('go');
    onSettingsUpdate('bo');
    onSettingsUpdate('textColor');
    onSettingsUpdate('headerText');
    onSettingsUpdate('bold')
}

function onChangeData(a, flag, userName, tableFlag, arr, container) {
    if (flag == 'dps')
        var val = parseInt(a.get("mergedDamage")); else var val = parseInt(a.get("mergedHealed"));
    var data = JSON.parse(localStorage.getItem(flag + "Order"));
    for (var i in data) {
        $('#' + container).find('#' + flag + userName).find('.' + i).html(inputData(i, a, localStorage.getItem('pets')))
    }
    if (tableFlag == 2) {
        $('#' + container).find('#' + flag + userName).attr('data-value', val)
    } else {
        var preRank = $('#' + container).find('#' + flag + userName).attr('data-order');
        $('#' + container).find('#' + flag + userName).attr('data-value', val);
        $('#' + container).find('#' + flag + userName).find('.raidName').html(inputName(a.get("name"), a.get("Class"), a.get("rank") + 1, a.get("petOwner")));
        $('#' + container).find('#' + flag + userName).find('.raidName.value').html(addComma(a.get("enc" + flag).toFixed(inputNumber)));
        $('#' + container).find('#' + flag + userName).find('.center').html('<img src="images/glow/' + inputRanking(a, flag, preRank) + '.png" style="width:1.5rem;">')
    }
    if (a.get("Job") == "AVA")
        var petOwner = a.get("name").split('(')[1].replace(')', '');
    if (petOwner == myName) {
        $('#' + container).find('#' + flag + userName).addClass('ava dataYOU')
    }
}

function onSortData(selector, attrName) {
    return $($(selector).toArray().sort(function (a, b) {
        var aVal = parseInt(a.getAttribute(attrName)), bVal = parseInt(b.getAttribute(attrName));
        return bVal - aVal
    }))
}

function onCreateHeader(table, arr) {
    var tableHeader = document.getElementById(table);
    var newHeader = document.createElement("tbody");
    var tr = newHeader.insertRow();
    tableHeader.appendChild(newHeader)
}

function inputColData(userName, arr, flag, a, tableFlag, container) {
    var data = JSON.parse(localStorage.getItem(flag + "Order"));
    if (tableFlag == 2) {
        var header = "";
        var body = "";
        for (var i in data) {
            var name = i;
            if (localStorage.getItem(name) == 1) {
                header += "<td class='" + addClassName(name) + "'>" + $('[name="' + name + '"]').find('.PrimaryText').text() + "</td>";
                body += "<td class='" + addClassName(name) + "'>" + inputData(name, a, localStorage.getItem("pets")) + "</td>"
            }
        }
        $('#' + flag + 'TableHeader tr').html(header);
        $('#' + container).find('#' + flag + userName).find('table tr').html(body)
    } else {
        var body = "";
        for (var i in data) {
            var name = i;
            if (localStorage.getItem(name) == 1) {
                var temp = '<tr><td class="left">' + $('[name="' + name + '"]').find('.PrimaryText').text() + '</td></tr><tr><td class="right value ' + name + '" style="color:' + accentColor + '";>' + inputData(name, a, localStorage.getItem("pets")) + '</td></tr>';
                body += temp
            }
        }
        if (OnlyUsers > 9 && localStorage.getItem('raidMode') == 1)
            $('#' + container).find('#' + flag + userName).find('.body tbody').html(body)
        else $('#' + container).find('#' + flag + userName).find('table.body').html(body)
    }
}

function onCreateBody(a, flag, userName) {
    var newCombatant = document.createElement("div");
    newCombatant.id = flag + userName;
    if (flag == 'dps') var val = parseInt(a.get("mergedDamage")); else var val = parseInt(a.get("mergedHealed"));
    newCombatant.setAttribute('data-value', val);
    if (a.get("Job") == "AVA") {
        var petOwner = a.get("name").split('(')[1].replace(')', '');
        if (petOwner == myName)
            newCombatant.className = 'ava dataYOU'; else if (a.get("petOwner") != "" && a.get("petOwner") != undefined)
            newCombatant.className = 'ava'
    }
    var c = oHexColor('#' + localStorage.getItem('lineColor'));
    if (flag == 'dps') {
        var table = "<table class='tableBody'><tr></tr></table>" + "<div class='bar' id='dps" + userName + "' style='width:0%;'>" + "<span class='bar barDeal pet' id='dpsPet" + userName + "' style='width:0%;'></span>" + "</div>" + "<div class='barBg'></div>" + "<li class='divider' style='rgba(" + c.r + ',' + c.g + ',' + c.b + ',' + now_lo + ")'></li>"
    } else {
        var table = "<table class='tableBody'><tr></tr></table>" + "<div class='bar' id='hps" + userName + "' style='width:0%;'>" + "<span class='bar barHeal' id='overheal" + userName + "' style='width:0%;'></span>" + "<span class='bar barHeal' id='shield" + userName + "' style='width:0%;'></span>" + "<span class='bar barHeal pet' id='hpsPet" + userName + "' style='width:0%;'></span>" + "</div>" + "<div class='barBg'></div>" + "<li class='divider' style='rgba(" + c.r + ',' + c.g + ',' + c.b + ',' + now_lo + ")'></li>"
    }
    newCombatant.innerHTML = table;
    return newCombatant
}

function onCreateRaidBody(a, flag, userName) {
    var data = JSON.parse(localStorage.getItem(flag + "Order"));
    var newCombatant = document.createElement("div");
    newCombatant.id = flag + userName;
    if (flag == 'dps') var val = parseInt(a.get("mergedDamage")); else var val = parseInt(a.get("mergedHealed"));
    newCombatant.setAttribute('data-value', val);
    if (a.get("Job") == "AVA") {
        var petOwner = a.get("name").split('(')[1].replace(')', '');
        if (petOwner == myName)
            newCombatant.className = 'ava dataYOU'; else if (a.get("petOwner") != "" && a.get("petOwner") != undefined)
            newCombatant.className = 'ava'
    }
    var you = '<div class="header"><table class="divBody" name="RaidYOU" style="background:' + accentColor + ';"><tr>';
    var other = '<div class="header"><table class="divBody header"><tr>';
    var header = '<td class="index" style="width: .3rem; background:' + inputColor(a) + ';" ></td>' + '<td style="width: 2rem"><img src="images/glow/' + a.get("Job").toLowerCase() + '.png" class="pngIcon"></td>' + '<td class="raidName">' + inputName(a.get("name"), a.get("Class"), a.get("rank") + 1, a.get("petOwner")) + '</td></tr><tr>' + '<td class="index" style="width: .3rem; background:' + inputColor(a) + ';" ></td>' + '<td style="width: 1.9rem" class="center"><img src="images/glow/' + inputRanking(a, flag) + '.png" style="width:1.5rem;"></td>' + '<td class="raidName value">' + addComma(a.get("enc" + flag).toFixed(inputNumber)) + '</td></tr></table></div>';
    var body = '<div class="body"><table class="divBody">';
    for (var i in data) {
        var name = i;
        if (localStorage.getItem(name) == 1) {
            var temp = '<tr><td class="left">' + $('[name="' + name + '"]').find('.PrimaryText').text() + '</td></tr><tr><td class="right value ' + name + '" style="color:' + accentColor + '";>' + inputData(name, a, localStorage.getItem("pets")) + '</td></tr>';
            body += temp
        }
    }
    body += '</table></div>'
    if (a.get("name") == "YOU" || a.get("petOwner") == "YOU")
        newCombatant.innerHTML = you + header + body; else newCombatant.innerHTML = other + header + body;
    return newCombatant
}

function inputList(lastData, container, flag) {
    var header = [];
    var body = [];
    var html = '';
    if (flag == 'dps') {
        var length = dpsUsers;
        var box = 5;
        var s = 13
    } else {
        var length = hpsUsers;
        var box = 6;
        var s = 2
    }
    for (var i = 1, cnt = 1; i <= length; i++) {
        if (header[cnt] == undefined) {
            header[cnt] = '';
            body[cnt] = ''
        }
        var hC = $('#' + container + '>div[data-order=' + (i - 1) + '] .header').html();
        var bC = $('#' + container + '>div[data-order=' + (i - 1) + '] .body').html();
        if (hC != undefined) {
            header[cnt] += '<div class="col s' + s + ' userbox">' + hC + '</div>';
            body[cnt] += '<div class="col s' + s + ' userbox">' + bC + '</div>'
        }
        if (i % box == 0)
            cnt++
    }
    for (var i = 1; i < header.length; i++) {
        var group = "<li><div class='collapsible-header row'>" + header[i] + "</div><div class='collapsible-body row'>" + body[i] + "</div></li>"
        html += group
    }
    $('#' + flag + 'RaidTable').html(html)
}

function addClassName(name) {
    if (name == 'c-dps2' || name == 'c-hps2')
        return 'nameCell' + ' ' + name; else if (name == 'c-dps4' || name == 'c-dps6' || name == 'c-dps7' || name == 'c-dps8' || name == 'c-dps9' || name == 'c-dps10' || name == 'c-dps29' || name == 'c-hps3')
        return 'narrowCell2' + ' ' + name; else if (name == 'c-dps12' || name == 'c-dps25' || name == 'c-dps26' || name == 'c-dps31' || name == 'c-dps32' || name == 'c-dps33' || name == 'c-dps34' || name == 'c-dps41' || name == 'c-dps42' || name == 'c-hps5' || name == 'c-hps6' || name == 'c-hps7' || name == 'c-hps8' || name == 'c-hps15' || name == 'c-hps16')
        return 'wideCell1' + ' ' + name; else if (name == 'c-dps24' || name == 'c-dps39' || name == 'c-hps13')
        return 'wideCell2' + ' ' + name; else if (name == 'c-dps1' || name == 'c-hps1')
        return 'iconCell' + ' ' + name; else return 'narrowCell1' + ' ' + name
}

function addComma(num) {
    if (isNaN(num))
        return 0; else {
        if (localStorage.getItem('dot') == 1) {
            num = num.toString().replace(/[.]/g, ',')
        }
        if (localStorage.getItem('comma') == 1) {
            if (localStorage.getItem('dot') == 1)
                return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."); else return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
        else return num
    }
}

function delComma(num) {
    var number = num + "";
    return number.replace(/[,]/g, "")
}

function inputName(name, job, rank, pet) {
    if (localStorage.getItem('hideName') == 0) {
        if (name == "YOU") {
            if (localStorage.getItem('myID') == 1) {
                if (myName == "") {
                    myName = 'YOU'
                }
                var i = cutName(myName);
                return cutRank(i, rank)
            }
            else return cutRank('YOU', rank)
        }
        else {
            if (localStorage.getItem('myID') == 0) {
                if (pet == "YOU") {
                    var temp = name.split('(');
                    var i = temp[0] + ' (YOU)';
                    return cutRank(i, rank)
                }
                else if (pet == myName && job == "CBO") {
                    if (localStorage.getItem("lang") == "kr")
                        var i = "초코보"
                    else if (localStorage.getItem("lang") == "cn")
                        var i = "陆行鸟"
                    else if (localStorage.getItem("lang") == "hk")
                        var i = "陆行鸟"
                    else if (localStorage.getItem("lang") == "en")
                        var i = "CHOCOBO"
                    else var i = "チョコボ"
                    return cutRank(i + " (YOU)", rank)
                }
            }
            if (pet != "")
                var i = name; else var i = cutName(name);
            return cutRank(i, rank)
        }
    } else {
        if (job == "LMB")
            return cutRank(name, rank); else if (name == "YOU")
            return cutRank('YOU', rank); else if (pet == "YOU") {
            var temp = name.split('(');
            var i = temp[0] + ' (YOU)';
            return cutRank(i, rank)
        } else if (pet == myName && job == "CBO") {
            if (localStorage.getItem("lang") == "kr")
                var i = "초코보"
            else if (localStorage.getItem("lang") == "cn")
                var i = "陆行鸟"
            else if (localStorage.getItem("lang") == "hk")
                var i = "陆行鸟"
            else if (localStorage.getItem("lang") == "en")
                var i = "CHOCOBO"
            else var i = "チョコボ"
            return cutRank(i + " (YOU)", rank)
        } else return cutRank('　', rank)
    }
}

function cutName(name) {
    var temp = name.split(' ');
    if (temp.length == 1) {
        return name
    } else {
        if (localStorage.getItem('nameType') == 'AType') {
            return name
        } else if (localStorage.getItem('nameType') == 'BType') {
            return temp[0] + ' ' + temp[1].substr(0, 1) + '.'
        } else if (localStorage.getItem('nameType') == 'CType') {
            return temp[0].substr(0, 1) + '. ' + temp[1]
        } else {
            return temp[0].substr(0, 1) + '. ' + temp[1].substr(0, 1) + '.'
        }
    }
}

function cutRank(name, rank) {
    if (localStorage.getItem('ranking') == 1) {
        return rank + '. ' + name
    } else {
        return name
    }
}

function inputRanking(a, flag, preRank) {
    if (a.get("rank") == 0) {
        return img = "rank_1"
    } else if (a.get("rank") == 1) {
        return img = "rank_2"
    } else if (a.get("rank") == 2) {
        return img = "rank_3"
    } else if (preRank == "NaN" || preRank == undefined) {
        return img = "arrow_flat"
    } else if (a.get("rank") < parseInt(preRank)) {
        return img = "arrow_up"
    } else if (a.get("rank") > parseInt(preRank)) {
        return img = "arrow_down"
    } else if (a.get("rank") == parseInt(preRank)) {
        return img = "arrow_flat"
    }
}

function inputData(name, a, petFlag) {
    var rank = a.get("rank") + 1;
    var name = name.split('c-');
    switch (name[1]) {
        case 'dps1':
        case 'hps1':
            return '<img src="./images/glow/' + a.get("Job").toLowerCase() + '.png" class="pngIcon"/>';
        case 'dps2':
        case 'hps2':
            return inputName(a.get("name"), a.get("Class"), parseInt(a.get("rank")) + 1, a.get("petOwner"));
        case 'dps3':
            return a.get("duration");
        case 'dps4':
            return addComma(parseFloat(a.get("dps")).toFixed(inputNumber));
        case 'dps5':
            return lastCombat.duration;
        case 'dps6':
            return addComma(parseFloat(a.get("encdps")).toFixed(inputNumber));
        case 'dps7':
            return addComma(parseFloat(a.get("Last10DPS")).toFixed(inputNumber));
        case 'dps8':
            return addComma(parseFloat(a.get("Last30DPS")).toFixed(inputNumber));
        case 'dps9':
            return addComma(parseFloat(a.get("Last60DPS")).toFixed(inputNumber));
        case 'dps10':
            return addComma(parseFloat(a.get("Last180DPS")).toFixed(inputNumber));
        case 'dps11':
            return addComma(parseFloat(a.get("damage%")).toFixed(inputNumber / 2)) + '%';
        case 'dps12':
            return addComma(parseInt(a.get("mergedDamage")));
        case 'dps13':
            return addComma(parseFloat(a.get("TOHIT")).toFixed(inputNumber / 2)) + '%';
        case 'dps14':
            return addComma(parseInt(a.get("mergedSwings")));
        case 'dps15':
            return addComma(parseInt(a.get("mergedHits")));
        case 'dps16':
            return addComma(parseInt(a.get("mergedDirectHitCount")));
        case 'dps17':
            return addComma(parseFloat((parseInt(a.get("mergedDirectHitCount")) / parseInt(a.get("mergedHits")) * 100)).toFixed(inputNumber / 2)) + '%';
        case 'dps18':
            return addComma(parseInt(a.get("mergedCrithits")));
        case 'dps19':
            return addComma(parseFloat((parseInt(a.get("mergedCrithits")) / parseInt(a.get("mergedHits")) * 100)).toFixed(inputNumber / 2)) + '%';
        case 'dps20':
            return addComma(parseInt(a.get("mergedCritDirectHitCount")));
        case 'dps21':
            return addComma(parseFloat((parseInt(a.get("mergedCritDirectHitCount")) / parseInt(a.get("mergedHits")) * 100)).toFixed(inputNumber / 2)) + '%';
        case 'dps22':
            return addComma(parseInt(a.get("mergedMisses")));
        case 'dps23':
            return addComma(parseInt(a.get("hitfailed")));
        case 'dps24':
            var s = a.get("maxhitstr");
            if (localStorage.getItem('maxAbb') == 1) {
                for (var i in dataAbbList) {
                    if (s == i)
                        s = dataAbbList[i]
                }
            }
            var t = a.get("maxhitval");
            if (localStorage.getItem("pets") == 1) {
                for (var i in a.get("pets")) {
                    b = a.get("pets")[i]
                    if (t < b.get("maxhitval")) {
                        t = b.get("maxhitval")
                        s = b.get("maxhitstr")
                    }
                }
            }
            if (tableFlag == 2)
                return addComma(t) + '<font style="color:#bdbdbd; font-size:1.1rem"> / ' + s + '</font>'; else return s + '<br>' + addComma(t);
        case 'dps25':
            return addComma(parseInt(a.get("damagetaken")));
        case 'dps26':
            return addComma(parseInt(a.get("healstaken")));
        case 'dps27':
            return addComma(parseFloat(a.get("ParryPct")).toFixed(inputNumber / 2)) + '%';
        case 'dps28':
            return addComma(parseFloat(a.get("BlockPct")).toFixed(inputNumber / 2)) + '%';
        case 'dps29':
        case 'hps3':
            return addComma(parseFloat(a.get("enchps")).toFixed(inputNumber));
        case 'dps30':
        case 'hps4':
            return addComma(parseFloat(a.get("healed%")).toFixed(inputNumber / 2)) + '%';
        case 'dps31':
        case 'hps5':
            return addComma(parseInt(a.get("mergedHealed")));
        case 'dps32':
        case 'hps6':
            return addComma(parseInt(a.get("mergedHealed")) - parseInt(a.get("mergedOverHeal")) - parseInt(a.get("mergedDamageShield")));
        case 'dps33':
        case 'hps7':
            return addComma(parseInt(a.get("mergedDamageShield")));
        case 'dps34':
        case 'hps8':
            return addComma(parseInt(a.get("mergedOverHeal")));
        case 'dps35':
        case 'hps9':
            if (a.get("healed") == 0) {
                overhealPct = 0;
                return '0.0%'
            } else return addComma(parseFloat(parseInt(a.get("mergedOverHeal")) / parseInt(a.get("mergedHealed")) * 100).toFixed(inputNumber / 2)) + '%';
        case 'dps36':
        case 'hps10':
            return addComma(parseInt(a.get("mergedHeals")));
        case 'dps37':
        case 'hps11':
            return addComma(parseInt(a.get("mergedCritheals")));
        case 'dps38':
        case 'hps12':
            return addComma(parseFloat((parseInt(a.get("mergedCritheals")) / parseInt(a.get("mergedHits")) * 100)).toFixed(inputNumber / 2)) + '%';
        case 'dps39':
        case 'hps13':
            var s = a.get("maxhealstr");
            if (localStorage.getItem('maxAbb') == 1) {
                for (var i in dataAbbList) {
                    if (s == i)
                        s = dataAbbList[i]
                }
            }
            var t = a.get("maxhealval");
            if (localStorage.getItem("pets") == 1) {
                for (var i in a.get("pets")) {
                    b = a.get("pets")[i]
                    if (t < b.get("maxhealval")) {
                        t = b.get("maxhealval")
                        s = b.get("maxhealstr")
                    }
                }
            }
            if (tableFlag == 2)
                return addComma(t) + '<font style="color:#bdbdbd; font-size:1.1rem"> / ' + s + '</font>'; else return s + '<br>' + addComma(t);
        case 'dps40':
        case 'hps14':
            return addComma(parseInt(a.get("cures")));
        case 'dps41':
        case 'hps15':
            return addComma(parseInt(a.get("mergedAbsorbHeal")));
        case 'dps42':
        case 'hps16':
            return addComma(parseInt(a.get("powerheal")));
        case 'dps43':
        case 'hps17':
            return addComma(parseInt(a.get("deaths")))
    }
}

function inputColor(a) {
    if (localStorage.getItem("youColor") == 1 && a.get("name") == "YOU") {
        return '#' + localStorage.getItem("YOU")
    } else {
        switch (a.get("Class")) {
            case 'PLD':
            case 'GLD':
            case 'GLA':
                return '#' + localStorage.getItem("tank1");
            case 'WAR':
            case 'MRD':
                return '#' + localStorage.getItem("tank2");
            case 'DRK':
                return '#' + localStorage.getItem("tank3");
            case 'WHM':
            case 'CNJ':
                return '#' + localStorage.getItem("heal1");
            case 'SCH':
                return '#' + localStorage.getItem("heal2");
            case 'AST':
                return '#' + localStorage.getItem("heal3");
            case 'MNK':
            case 'PGL':
                return '#' + localStorage.getItem("dps1");
            case 'DRG':
            case 'LNC':
                return '#' + localStorage.getItem("dps2");
            case 'NIN':
            case 'ROG':
                return '#' + localStorage.getItem("dps3");
            case 'SAM':
                return '#' + localStorage.getItem("dps8");
            case 'BLM':
            case 'THM':
                return '#' + localStorage.getItem("dps4");
            case 'SMN':
            case 'ACN':
                return '#' + localStorage.getItem("dps5");
            case 'RDM':
                return '#' + localStorage.getItem("dps9");
            case 'BRD':
            case 'ARC':
                return '#' + localStorage.getItem("dps6");
            case 'MCH':
                return '#' + localStorage.getItem("dps7");
            case 'LMB':
                return '#' + localStorage.getItem("LB");
            case 'CBO':
                return '#' + localStorage.getItem("chocobo");
            case 'BTN':
            case 'FSH':
            case 'MIN':
                return '#' + localStorage.getItem("life1");
            default:
                return '#' + localStorage.getItem("life2")
        }
    }
}

function inputBarStyle(a, flag, container, name) {
    if (localStorage.getItem('gradation') == 1) {
        $('#' + container).find('#' + flag + name).find('.bar').css('background', "-webkit-gradient(linear, left top,right top, color-stop(0.6," + inputColor(a) + "), to(rgba(24,24,24,0.0)))");
        $('body').find('.barHeal, .barDeal').css('float', 'left')
    } else {
        $('#' + container).find('#' + flag + name).find('.bar').css('background', inputColor(a));
        $('body').find('.barHeal, .barDeal').css('float', 'right')
    }
    $('#' + container).find('#' + flag + name).find('.bar.pet').css('background', '#' + localStorage.getItem("ava"));
    $('#hpsTableBody').find('#overheal' + name).css('background', '#' + localStorage.getItem("overheal"));
    $('#hpsTableBody').find('#shield' + name).css('background', '#' + localStorage.getItem("shield"));
    if (a.get("petOwner") == "YOU" && localStorage.getItem('youColor') == 1) {
        $('#' + container).find('#' + flag + name).find('.bar').css('background', '#' + localStorage.getItem('YOU'))
    }
}

function inputBarWidth(a, flag, container, name) {
    if (flag == 'hps' && a.get('role') == 'Healer') {
        var width = Math.min(100, parseInt((a.get(lastCombatHPS.sortkey) / a.get("maxdamage")) * 100)) + '%';
        if (localStorage.getItem("pets") == 1) {
            var overheal = Math.min(100, parseInt((a.get("mergedOverHeal") / a.get("mergedHealed")) * 100));
            var shield = Math.min(100, parseInt((a.get("mergedDamageShield") / a.get("mergedHealed")) * 100));
            if (a.get("Class") == "SCH") {
                var allEffHeal = parseInt(a.get("mergedHealed") - a.get("mergedDamageShield") - a.get("mergedOverHeal"));
                var ownerEffHeal = parseInt(a.get("original").Healed - a.get("original").OverHeal - a.get("original").DamageShield);
                var fairyEffHeal = parseInt(allEffHeal - ownerEffHeal);
                var petHealed = Math.min(100, parseInt((100 - (overheal + shield)) * (fairyEffHeal / allEffHeal))) + '%';
                var overheal = overheal + '%';
                var shield = shield + '%'
            } else {
                var overheal = overheal + '%';
                var shield = shield + '%';
                var petHealed = 0 + '%'
            }
        } else {
            var overheal = Math.min(100, parseInt((a.get("overHeal") / a.get(lastCombatHPS.sortkey)) * 100)) + '%';
            var shield = Math.min(100, parseInt((a.get("damageShield") / a.get(lastCombatHPS.sortkey)) * 100)) + '%';
            var petHealed = 0 + '%'
        }
        if (localStorage.getItem('animation') == 1) {
            $('#' + container).find('#hps' + name + '.bar').animate({width: width});
            $('#' + container).find('#overheal' + name).animate({width: overheal});
            $('#' + container).find('#shield' + name).animate({width: shield});
            if (localStorage.getItem('petAction') == 1)
                $('#' + container).find('#hpsPet' + name).animate({width: petHealed}); else $('#' + container).find('#hpsPet' + name).animate({width: 0 + '%'})
        } else {
            $('#' + container).find('#hps' + name + '.bar').css('width', width);
            $('#' + container).find('#overheal' + name).css('width', overheal);
            $('#' + container).find('#shield' + name).css('width', shield);
            if (localStorage.getItem('petAction') == 1)
                $('#' + container).find('#hpsPet' + name).css('width', petHealed); else $('#' + container).find('#hpsPet' + name).css('width', 0 + '%')
        }
    } else {
        var width = Math.min(100, parseInt((a.get(lastCombat.sortkey) / a.get("maxdamage")) * 100)) + '%';
        if (localStorage.getItem("pets") == 1 && (a.get("Class") == "MCH" || a.get("Class") == "SMN"))
            var petDamage = Math.min(100, parseInt((a.get("mergedDamage") - a.get("original").Damage) / a.get("maxdamage") * 100)) + '%'; else var petDamage = 0 + '%';
        if (localStorage.getItem('animation') == 1) {
            $('#' + container).find('#dps' + name + '.bar').animate({width: width});
            if (localStorage.getItem('petAction') == 1)
                $('#' + container).find('#dpsPet' + name).animate({width: petDamage}); else $('#' + container).find('#dpsPet' + name).animate({width: 0 + '%'})
        } else {
            $('#' + container).find('#dps' + name + '.bar').css('width', width);
            if (localStorage.getItem('petAction') == 1)
                $('#' + container).find('#dpsPet' + name).css('width', petDamage); else $('#' + container).find('#dpsPet' + name).css('width', 0 + '%')
        }
    }
}

function saveLog() {
    if (lastCombat == null)
        return; else {
        if (lastCombat.title != 'Encounter') {
            encounterArray.unshift({lastCombat: lastCombat, lastCombatHPS: lastCombatHPS});
            if (encounterArray.length >= 2) {
                if (encounterArray[1].combatKey == lastCombat.combatKey) {
                    encounterArray.shift()
                } else {
                    historyAddRow()
                }
            } else {
                historyAddRow()
            }
            autoHidden("OFF");
            saveLogFlag = !0
            startFlag = 1
        }
    }
}

function historyAddRow() {
    console.log(lastCombat)
    var wrap = document.getElementById('historyListBody');
    var newHistory = document.createElement("div");
    var oldHistory = document.getElementById('oldHistoryBody');
    $('#historyBody').find('#viewIcon.viewCell').html('');
    var table = document.createElement("TABLE");
    table.id = lastCombat.combatKey;
    table.className = "tableBody";
    var tr = table.insertRow();
    var td = tr.insertCell();
    td.innerHTML = '<img class="pngIcon" src="./images/menu/eye.svg"/>';
    td.className = "viewCell";
    td.id = "viewIcon";
    var td = tr.insertCell();
    td.innerHTML = lastCombat.title + '<span style="color:rgba(255,255,255,0.7);"> / ' + lastCombat.zone + '</span>';
    td.className = "nameCell";
    var td = tr.insertCell();
    td.innerHTML = lastCombat.duration;
    td.className = "narrowCell1";
    var td = tr.insertCell();
    td.innerText = addComma(parseFloat(lastCombat.Encounter.encdps).toFixed(0));
    td.className = "narrowCell2";
    td.id = "RDPS";
    var td = tr.insertCell();
    td.innerText = addComma(parseFloat(lastCombat.Encounter.enchps).toFixed(0));
    td.className = "narrowCell2";
    td.id = "RHPS";
    var td = tr.insertCell();
    td.className = "narrowCell1";
    td.id = "CNT";
    var line = document.createElement("li");
    line.className = "divider";
    var lineColor = '#' + localStorage.getItem('lineColor');
    var c = oHexColor(lineColor);
    line.style.backgroundColor = "rgba(" + c.r + ',' + c.g + ',' + c.b + ',' + now_lo + ")";
    if (encounterArray.length == 1)
        td.innerText = 1; else {
        if (encounterArray[0].lastCombat.zone == encounterArray[1].lastCombat.zone) {
            encounterCount++;
            td.innerText = addComma(parseInt(encounterCount))
        } else {
            encounterCount = 1;
            td.innerText = encounterCount
        }
    }
    var barBg = document.createElement("div");
    barBg.className = "barBg";
    newHistory.appendChild(table);
    newHistory.appendChild(barBg);
    if (localStorage.getItem('line') == 1)
        newHistory.appendChild(line);
    if (oldHistory == null)
        wrap.appendChild(newHistory); else wrap.insertBefore(newHistory, oldHistory);
    newHistory.id = 'oldHistoryBody';
    $('#oldHistoryBody').on({
        mouseover: function () {
            $(this).find('.barBg').css('background', accentColor)
        }, mouseleave: function () {
            var bgColor = localStorage.getItem("background");
            var c = oHexColor(bgColor);
            $(this).find('.barBg').css('background', 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + now_bo + ')')
        }, click: function () {
            var listName = $(this).find('table').attr("id");
            for (var i in encounterArray) {
                if (listName == encounterArray[i].lastCombat.combatKey) {
                    lastCombat = encounterArray[i].lastCombat;
                    lastCombatHPS = encounterArray[i].lastCombatHPS;
                    $('#historyBody').find('#viewIcon.viewCell').html('');
                    $(this).find('#viewIcon').html('<img class="pngIcon" src="./images/menu/eye.svg"/>');
                    $('#dpsTableBody').html('');
                    $('#hpsTableBody').html('');
                    closeHistory();
                    update()
                }
            }
        }
    })
}
