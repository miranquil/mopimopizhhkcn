var webs = null;
var QueryString = function () {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = decodeURIComponent(pair[1])
        } else if (typeof query_string[pair[0]] === "string") {
            var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
            query_string[pair[0]] = arr
        } else {
            query_string[pair[0]].push(decodeURIComponent(pair[1]))
        }
    }
    return query_string
}();

var host_port = QueryString.HOST_PORT;
while (host_port.endsWith('/')) {
    host_port = host_port.substring(0, host_port.length - 1)
}
if (wsUri.indexOf("//") == 0) {
    wsUri = wsUri.substring(2)
}
if (wsUri.indexOf("ws://") == 0 || wsUri.indexOf("wss://") == 0) {
    if (host_port.indexOf("ws://") == 0 || host_port.indexOf("wss://") == 0) {
        wsUri = wsUri.replace(/ws:\/\/@HOST_PORT@/im, host_port);
        wsUri = wsUri.replace(/wss:\/\/@HOST_PORT@/im, host_port)
    } else {
        wsUri = wsUri.replace(/@HOST_PORT@/im, host_port)
    }
} else {
    if (host_port.indexOf("ws://") == 0 || host_port.indexOf("wss://") == 0) {
        wsUri = wsUri.replace(/@HOST_PORT@/im, host_port)
    } else {
        wsUri = "ws://" + wsUri.replace(/@HOST_PORT@/im, host_port)
    }
}

class ActWebsocketInterface {
    constructor(uri, path = "MiniParse") {
        var querySet = this.getQuerySet();
        this.uri = uri;
        this.id = null;
        this.activate = !1;
        var This = this;
        document.addEventListener('onBroadcastMessage', function (evt) {
            This.onBroadcastMessage(evt)
        });
        document.addEventListener('onRecvMessage', function (evt) {
            This.onRecvMessage(evt)
        });
        window.addEventListener('message', function (e) {
            if (e.data.type === 'onBroadcastMessage') {
                This.onBroadcastMessage(e.data)
            }
            if (e.data.type === 'onRecvMessage') {
                This.onRecvMessage(e.data)
            }
        })
    }

    connect() {
        if (typeof this.websocket != "undefined" && this.websocket != null)
            this.close();
        this.activate = !0;
        var This = this;
        this.websocket = new WebSocket(this.uri);
        this.websocket.onopen = function (evt) {
            This.onopen(evt)
        };
        this.websocket.onmessage = function (evt) {
            This.onmessage(evt)
        };
        this.websocket.onclose = function (evt) {
            This.onclose(evt)
        };
        this.websocket.onerror = function (evt) {
            This.onerror(evt)
        }
    }

    close() {
        this.activate = !1;
        if (this.websocket != null && typeof this.websocket != "undefined") {
            this.websocket.close()
        }
    }

    onopen(evt) {
        if (this.id != null && typeof this.id != "undefined") {
            this.set_id(this.id)
        } else {
            if (typeof overlayWindowId != "undefined") {
                this.set_id(overlayWindowId)
            } else {
                var r = new RegExp('[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}');
                var id = r.exec(navigator.userAgent);
                if (id != null && id.length == 1) {
                    this.set_id(id[0])
                }
            }
        }
    }

    onclose(evt) {
        this.websocket = null;
        if (this.activate) {
            var This = this;
            setTimeout(function () {
                This.connect()
            }, 5000)
        }
    }

    onmessage(evt) {
        if (evt.data == ".") {
            this.websocket.send(".")
        } else {
            try {
                var obj = JSON.parse(evt.data);
                var type = obj.type;
                if (type == "broadcast") {
                    var from = obj.from;
                    var type = obj.msgtype;
                    var msg = obj.msg;
                    document.dispatchEvent(new CustomEvent('onBroadcastMessage', {
                        detail: obj
                    }))
                }
                if (type == "send") {
                    var from = obj.from;
                    var type = obj.msgtype;
                    var msg = obj.msg;
                    document.dispatchEvent(new CustomEvent('onRecvMessage', {
                        detail: obj
                    }))
                }
                if (type == "set_id") {
                }
            } catch (e) {
            }
        }
    }

    onerror(evt) {
        this.websocket.close();
        console.log(evt)
    }

    getQuerySet() {
        var querySet = {};
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            try {
                var pair = vars[i].split('=');
                querieSet[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
            } catch (e) {
            }
        }
        return querySet
    }

    broadcast(type, msg) {
        if (typeof overlayWindowId != 'undefined' && this.id != overlayWindowId) {
            this.set_id(overlayWindowId)
        }
        var obj = {};
        obj.type = "broadcast";
        obj.msgtype = type;
        obj.msg = msg;
        this.websocket.send(JSON.stringify(obj))
    }

    send(to, type, msg) {
        if (typeof overlayWindowId != 'undefined' && this.id != overlayWindowId) {
            this.set_id(overlayWindowId)
        }
        var obj = {};
        obj.type = "send";
        obj.to = to;
        obj.msgtype = type;
        obj.msg = msg;
        this.websocket.send(JSON.stringify(obj))
    }

    overlayAPI(type, msg) {
        var obj = {};
        if (typeof overlayWindowId != 'undefined' && this.id != overlayWindowId) {
            this.set_id(overlayWindowId)
        }
        obj.type = "overlayAPI";
        obj.to = overlayWindowId;
        obj.msgtype = type;
        obj.msg = msg;
        this.websocket.send(JSON.stringify(obj))
    }

    set_id(id) {
        var obj = {};
        obj.type = "set_id";
        obj.id = id;
        this.id = overlayWindowId;
        this.websocket.send(JSON.stringify(obj))
    }

    onRecvMessage(e) {
    }

    onBroadcastMessage(e) {
    }
};

class WebSocketImpl extends ActWebsocketInterface {
    constructor(uri, path = "MiniParse") {
        super(uri, path)
    }

    onRecvMessage(e) {
        onRecvMessage(e)
    }

    onBroadcastMessage(e) {
        onBroadcastMessage(e)
    }
};
String.prototype.format = function (a) {
    var reg = /(\{([^}]+)\})/im;
    var matches = this.match(reg);
    var result = this;
    for (var i in a)
        result = result.replace("{" + i + "}", a[i]);
    return result
};
String.prototype.contains = function (a) {
    if (this.indexOf(a) > -1) return !0;
    else return !1
};
String.prototype.replaceArray = function (a) {
    var r = this;
    for (var i in a)
        while (r.contains(a[i].target))
            r = r.replace(a[i].target, a[i].replacement);
    return r
};
Number.prototype.nanFix = function () {
    return parseFloat(isNaN(this) ? 0 : this)
};
Number.prototype.numFormat = new function () {
    var str = "";
    var data = 0;
    try {
        if (data != Infinity && data != 0 && data != NaN) {
            var reg = /(^[+-]?\d+)(\d{3})/;
            var n = (this + "");
            while (reg.test(n)) n = n.replace(reg, "$1,$2");
            return n
        } else return "0"
    } catch (ex) {
        return "0"
    }
};
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, !1);
        domReady()
    }, !1);
    window.onbeforeunload = function () {
        webs.close()
    };
    window.addEventListener("unload", function () {
        webs.close()
    }, !1)
} else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", arguments.callee);
            domReady()
        }
    })
}
window.addEventListener('message', function (e) {
    if (e.data.type === 'onBroadcastMessage') {
        onBroadcastMessage(e.data)
    }
    if (e.data.type === 'onRecvMessage') {
        onRecvMessage(e.data)
    }
});

function domReady() {
    try {
        webs = new WebSocketImpl(wsUri);
        webs.connect();
        console.log("Connecting...")
    } catch (ex) {
        console.log("[ERROR] : WebSocket has Error [] " + ex)
    }
    try {
        document.addEventListener('beforeLogLineRead', beforeLogLineRead)
    } catch (ex) {
    }
    try {
        document.addEventListener('onLogLineRead', onLogLineRead)
    } catch (ex) {
    }
    try {
        document.addEventListener('onOverlayDataUpdate', onOverlayDataUpdate)
    } catch (ex) {
        console.log("Core Error : onOverlayDataUpdate is not defined.")
    }
    try {
        document.addEventListener('onOverlayStateUpdate', onOverlayStateUpdate)
    } catch (ex) {
    }
    try {
        onDocumentLoad()
    } catch (ex) {
    }
}

function onRecvMessage(e) {
    if (e.detail.msgtype == "Chat") {
        document.dispatchEvent(new CustomEvent("onChatting", {
            detail: e.detail.msg
        }))
    } else {
        console.log(e.detail.msgtype + ":" + e.detail.msg)
    }
}

function onBroadcastMessage(e) {
    if (e.detail.msgtype == "CombatData") {
        lastCombatRaw = e.detail.msg;
        lastCombat = new Combatant({
            detail: lastCombatRaw
        }, sortKey);
        if (lastCombat.Combatant.YOU != undefined && myName != "" && myName != undefined && myName != null) {
            lastCombat.Combatant.YOU.displayName = myName
        }
        document.dispatchEvent(new CustomEvent('onOverlayDataUpdate', {
            detail: lastCombatRaw
        }))
    } else {
        switch (e.detail.msgtype) {
            case "SendCharName":
                document.dispatchEvent(new CustomEvent("onCharacterNameRecive", {
                    detail: e.detail.msg
                }));
                myName = e.detail.msg.charName;
                break;
            case "AddCombatant":
                break;
            case "RemoveCombatant":
                break;
            case "AbilityUse":
                break;
            case "Chat":
                document.dispatchEvent(new CustomEvent("onChatting", {
                    detail: e.detail.msg
                }));
                break;
            default:
                console.log(e.detail.msgtype + ":" + e.detail.msg);
                break
        }
    }
}

function Person(e, p) {
    this.parent = p;
    this.Class = "";
    for (var i in e) {
        if (i.indexOf("NAME") > -1) continue;
        if (i == "t" || i == "n") continue;
        var onlyDec = e[i].replace(/[0-9.,%]+/ig, "");
        if (onlyDec != "") {
            if (onlyDec == "---" || onlyDec == "--")
                this[i] = 0;
            else this[i] = e[i]
        } else {
            var tmp = parseFloat(e[i].replace(/[,%]+/ig, "")).nanFix().toFixed(underDot);
            if (e[i].indexOf("%") > 0)
                this[i] = parseFloat(tmp);
            else if (Math.floor(tmp) != tmp || e[i].indexOf(".") > 0)
                this[i] = parseFloat(tmp);
            else
                this[i] = parseInt(tmp).nanFix()
        }
    }
    if (this.DURATION <= 0) {
        this.dps = parseFloat((this.damage / this.parent.DURATION).nanFix().toFixed(underDot));
        this.hps = parseFloat((this.healed / this.parent.DURATION).nanFix().toFixed(underDot));
        this.DPS = Math.floor(this.dps);
        this.HPS = Math.floor(this.hps);
        this["DPS-k"] = Math.floor(this.dps / 1000);
        this["HPS-k"] = Math.floor(this.hps / 1000);
        for (var i in this) {
            if (this[i] == "∞")
                this[i] = 0
        }
    }
    if (this.Job != "")
        this.Class = this.Job.toUpperCase();
    this.petOwner = "";
    this.petType = "Chocobo";
    this.isPet = !1;
    this.role = "DPS";
    this.rank = 0;
    this.maxdamage = 0;
    this.displayName = this.name;
    this.isLower = !1;
    var vjob = this.Job;
    if (vjob != "") vjob = this.Job.toUpperCase();
    switch (vjob) {
        case "GLD":
        case "GLA":
            this.Class = "PLD";
            this.isLower = !0;
            break;
        case "MRD":
            this.Class = "WAR";
            this.isLower = !0;
            break;
        case "PUG":
            this.Class = "MNK";
            this.isLower = !0;
            break;
        case "LNC":
            this.Class = "DRG";
            this.isLower = !0;
            break;
        case "ROG":
            this.Class = "NIN";
            this.isLower = !0;
            break;
        case "ARC":
            this.Class = "BRD";
            this.isLower = !0;
            break;
        case "THM":
            this.Class = "BLM";
            this.isLower = !0;
            break;
        case "ACN":
            this.Class = "SMN";
            this.isLower = !0;
            break;
        case "CNJ":
            this.Class = "WHM";
            this.isLower = !0;
            break
    }
    if (this.Class != "") {
        switch (this.Class) {
            case "SCH":
            case "WHM":
            case "AST":
                this.role = "Healer";
                break;
            case "PLD":
            case "WAR":
            case "DRK":
                this.role = "Tanker";
                break
        }
    }
    if (this.Class == "") {
        if (this.name.indexOf("에기") > -1 || this.name.indexOf("카벙클") > -1 || this.name.indexOf("데미바하무트") > -1 || this.name.toUpperCase().indexOf("EGI") > -1 || this.name.toUpperCase().indexOf("DEMI-BAHAMUT") > -1 || this.name.toUpperCase().indexOf("CARBUNCLE") > -1 || this.name.indexOf("Karfunkel") > -1 || this.name.indexOf("エギ") > -1 || this.name.indexOf("カーバンクル") > -1 || this.name.indexOf("石兽") > -1 || this.name.indexOf("亚灵神巴哈姆特") > -1) {
            this.Job = "AVA";
            this.Class = "SMN";
            this.isPet = true;
            this.petType = "Egi"
        }
        if (this.name.indexOf("요정") > -1 || this.name.toUpperCase().indexOf("EOS") > -1 || this.name.toUpperCase().indexOf("SELENE") > -1 || this.name.indexOf("フェアリー") > -1 || this.name.indexOf("小仙女") > -1) {
            this.Job = "AVA";
            this.Class = "SCH";
            this.isPet = true;
            this.role = "Healer";
            this.petType = "Fairy"
        }
        if (this.name.indexOf("자동포탑") > -1 || this.name.toUpperCase().indexOf("AUTOTURRET") > -1 || this.name.indexOf("オートタレット") > -1 || this.name.indexOf("Selbstschuss-Gyrocopter") > -1 || this.name.toLowerCase().indexOf("auto-tourelle") > -1 || this.name.indexOf("式浮空炮塔") > -1) {
            this.Job = "AVA";
            this.Class = "MCH";
            this.isPet = true;
            this.petType = "AutoTurret"
        }
        if (this.name.toUpperCase().indexOf("LIMIT BREAK") > -1 || this.name.indexOf("リミット") > -1) {
            this.Job = "LMB";
            this.Class = "LMB"
        }
    }
    try {
        this.maxhitstr = this.maxhit.split('-')[0];
        this.maxhitval = parseInt(this.maxhit.split('-')[1].replace(/\D/g, ""))
        if (this.maxhitstr == "Unknown" && this.Class == "MCH" && localStorage.getItem("lang") == "kr")
            this.maxhitstr = "급속 출력"
    } catch (ex) {
        this.maxhit = "?-0";
        this.maxhitstr = "";
        this.maxhitval = 0
    }
    try {
        this.maxhealstr = this.maxheal.split('-')[0];
        this.maxhealval = parseInt(this.maxheal.split('-')[1].replace(/\D/g, ""))
    } catch (ex) {
        this.maxheal = "?-0";
        this.maxhealstr = "";
        this.maxhealval = 0
    }
    this.visible = !0;
    this.original = {
        Damage: this.damage,
        Hits: this.hits,
        Misses: this.misses,
        Swings: this.swings,
        Crithits: this.crithits,
        DirectHitCount: this.DirectHitCount,
        CritDirectHitCount: this.CritDirectHitCount,
        Damagetaken: this.damagetaken,
        Heals: this.heals,
        Healed: this.healed,
        Critheals: this.critheals,
        Healstaken: this.healstaken,
        DamageShield: this.damageShield,
        OverHeal: this.overHeal,
        AbsorbHeal: this.absorbHeal,
        Last10DPS: this.Last10DPS,
        Last30DPS: this.Last30DPS,
        Last60DPS: this.Last60DPS,
        Last180DPS: this.Last180DPS,
    };
    try {
        var regex = /(?:.*?)\((.*?)\)/im;
        var matches = this.name.match(regex);
        if (regex.test(this.name)) // do not use Array.length 
        {
            if (this.Job == "0" || this.Job == "AVA")
                this.petOwner = matches[1];
        }
    }
    catch (ex) {

    }
    if (this.petOwner != "" && this.Job == "0") {
        this.Job = "CBO";
        this.Class = "CBO";
        this.petType = "Chocobo_Persons";
    }
    if (this.overHeal != undefined) {
    }
    this.color = {
        R: this.getColor().R,
        G: this.getColor().G,
        B: this.getColor().B
    }
    if (this.petType != "Chocobo") {
        this.color.R += parseInt(this.color.R / 3);
        this.color.G += parseInt(this.color.G / 3);
        this.color.B += parseInt(this.color.B / 3)
    }
    for (var i in this.original) {
        if (i.indexOf("Last") > -1)
            this["merged" + i] = this[i];
        else if (i == "CritDirectHitCount" || i == "DirectHitCount")	//신규추가 4.0 
            this["merged" + i] = this[i];
        else this["merged" + i] = this[i.substr(0, 1).toLowerCase() + i.substr(1)]
    }
    this.pets = {}
}

Person.prototype.returnOrigin = function () {
    for (var i in this.original) {
        if (i.indexOf("Last") > -1)
            this["merged" + i] = this[i];
        else if (i == "CritDirectHitCount" || i == "DirectHitCount")	//신규추가 4.0 
            this["merged" + i] = this[i];
        else this["merged" + i] = this[i.substr(0, 1).toLowerCase() + i.substr(1)]
    }
};
Person.prototype.merge = function (person) {
    this.returnOrigin();
    this.pets[person.name] = person;
    for (var k in this.pets) {
        for (var i in this.original) {
            if (i.indexOf("Last") > -1)
                this["merged" + i] += this.pets[k].original[i];
            else this["merged" + i] += this.pets[k].original[i]
        }
    }
    this.recalculate()
};
Person.prototype.recalc = function () {
    this.recalculate()
};
Person.prototype.recalculate = function () {
    var dur = this.DURATION;
    if (dur == 0) dur = 1;
    this.dps = pFloat(this.mergedDamage / dur);
    this.encdps = pFloat(this.mergedDamage / this.parent.DURATION);
    this.hps = pFloat(this.mergedHealed / dur);
    this.enchps = pFloat(this.mergedHealed / this.parent.DURATION);
    this["DAMAGE-k"] = Math.floor(this.mergedDamage / 1000);
    this["DAMAGE-m"] = Math.floor(this.mergedDamage / 1000000);
    this.DPS = Math.floor(this.dps);
    this["DPS-k"] = Math.floor(this.dps / 1000);
    this.ENCDPS = Math.floor(this.encdps);
    this.ENCHPS = Math.floor(this.enchps);
    this["ENCDPS-k"] = Math.floor(this.encdps / 1000);
    this["ENCHPS-k"] = Math.floor(this.enchps / 1000);
    this["damage%"] = pFloat(this.mergedDamage / this.parent.Encounter.damage * 100);
    this["healed%"] = pFloat(this.mergedHealed / this.parent.Encounter.healed * 100);
    this["crithit%"] = pFloat(this.mergedCritHits / this.mergedHits * 100);
    this["DirectHit%"] = pFloat(this.mergedDirectHitCount / this.mergedHits * 100);
    this["CritDirectHit%"] = pFloat(this.mergedCritDirectHitCount / this.mergedHits * 100);
    this["critheal%"] = pFloat(this.mergedCritHeals / this.mergedheals * 100);
    this.tohit = pFloat(this.mergedHits / this.mergedSwings * 100)
};
Person.prototype.getColor = function (r, g, b) {
    if (jobColors[this.Class] != undefined) {
        if (r == undefined) var r = 0;
        if (g == undefined) var g = 0;
        if (b == undefined) var b = 0;
        return {
            "R": (jobColors[this.Class][0] + r),
            "G": (jobColors[this.Class][1] + g),
            "B": (jobColors[this.Class][2] + b)
        }
    } else {
        return {
            "R": 240,
            "G": 220,
            "B": 110
        }
    }
};
Person.prototype.get = function (key) {
    if (this.parent.summonerMerge) {
        switch (key) {
            case "damage":
                key = "mergedDamage";
                break;
            case "hits":
                key = "mergedHits";
                break;
            case "misses":
                key = "mergedMisses";
                break;
            case "swings":
                key = "mergedSwings";
                break;
            case "crithits":
                key = "mergedCritHits";
                break;
            case "DirectHitCount":
                key = "mergedDirectHitCount";
                break;
            case "CritDirectHitCount":
                key = "mergedCritDirectHitCount";
                break;
            case "damagetaken":
                key = "mergedDamagetaken";
                break;
            case "heals":
                key = "mergedHeals";
                break;
            case "healed":
                key = "mergedHealed";
                break;
            case "critheals":
                key = "mergedCritHeals";
                break;
            case "healstaken":
                key = "mergedHealstaken";
                break;
            case "damageShield":
                key = "mergedDamageShield";
                break;
            case "overHeal":
                key = "mergedOverHeal";
                break;
            case "absorbHeal":
                key = "mergedAbsorbHeal";
                break;
            case "Last10DPS":
                key = "mergedLast10DPS";
                break;
            case "Last30DPS":
                key = "mergedLast30DPS";
                break;
            case "Last60DPS":
                key = "mergedLast60DPS";
                break;
            case "Last180DPS":
                key = "mergedLast180DPS";
                break
        }
    }
    return this[key]
}

function Combatant(e, sortkey) {

    if (sortkey == undefined) var sortkey = "encdps";
    if (lang == undefined) var lang = "ko";
    this.Encounter = {};
    this.Combatant = {};
    this.users = {};
    for (var i in e.detail.Combatant) {
        this.users[i] = !0
    }
    for (var i in e.detail.Encounter) {
        if (i == "t" || i == "n") continue;
        var onlyDec = e.detail.Encounter[i].replace(/[0-9.,%]+/ig, "");
        if (onlyDec != "") {
            if (onlyDec == "---" || onlyDec == "--")
                this.Encounter[i] = 0;
            else this.Encounter[i] = e.detail.Encounter[i]
        } else {
            var tmp = parseFloat(e.detail.Encounter[i].replace(/[,%]+/ig, "")).nanFix().toFixed(underDot);
            if (e.detail.Encounter[i].indexOf("%") > 0)
                this.Encounter[i] = parseFloat(tmp);
            else if (Math.floor(tmp) != tmp || e.detail.Encounter[i].indexOf(".") > 0)
                this.Encounter[i] = parseFloat(tmp);
            else this.Encounter[i] = parseInt(tmp).nanFix()
        }
    }
    for (var i in e.detail.Combatant) {
        this.Combatant[i] = new Person(e.detail.Combatant[i], this)
    }
    for (var i in e.detail.Combatant) {
        this.Combatant[i].parent = this
    }
    var tmp = {};
    for (var i in this.Combatant) {
        if (this.Combatant[i].Class != "") {
            tmp[i] = this.Combatant[i]
        }
    }
    this.Combatant = tmp;
    this.maxdamage = 0;
    this.maxValue = 0;
    this.zone = this.Encounter.CurrentZoneName;
    this.title = this.Encounter.title;
    this.sortvector = !0;
    this.duration = this.Encounter.duration;
    this.DURATION = this.Encounter.DURATION;
    this.summonerMerge = !0;
    this.sortkey = sortkey;
    this.langpack = new Language(lang);
    this.isActive = e.detail.isActive;
    this.combatKey = this.Encounter.title.concat(this.Encounter.damage).concat(this.Encounter.healed);
    this.persons = this.Combatant;
    this.resort()
}

Combatant.prototype.rerank = function (vector) {
    this.sort(vector)
};
Combatant.prototype.indexOf = function (person) {
    var v = -1;
    for (var i in this.Combatant) {
        v++;
        if (i == person)
            return v
    }
    return v
};
Combatant.prototype.sort = function (vector) {
    if (vector != undefined)
        this.sortvector = vector;
    if (this.summonerMerge) {
        switch (this.sortkey) {
            case "damage":
                this.sortkey = "mergedDamage";
                break;
            case "hits":
                this.sortkey = "mergedHits";
                break;
            case "misses":
                this.sortkey = "mergedMisses";
                break;
            case "swings":
                this.sortkey = "mergedSwings";
                break;
            case "crithits":
                this.sortkey = "mergedCritHits";
                break;
            case "DirectHitCount":
                this.sortkey = "mergedDirectHitCount";
                break;
            case "CritDirectHitCount":
                this.sortkey = "mergedCritDirectHitCount";
                break;
            case "damagetaken":
                this.sortkey = "mergedDamagetaken";
                break;
            case "heals":
                this.sortkey = "mergedHeals";
                break;
            case "healed":
                this.sortkey = "mergedHealed";
                break;
            case "critheals":
                this.sortkey = "mergedCritHeals";
                break;
            case "healstaken":
                this.sortkey = "mergedHealstaken";
                break;
            case "damageShield":
                this.sortkey = "mergedDamageShield";
                break;
            case "overHeal":
                this.sortkey = "mergedOverHeal";
                break;
            case "absorbHeal":
                this.sortkey = "mergedAbsorbHeal";
                break;
            case "Last10DPS":
                this.sortkey = "mergedLast10DPS";
                break;
            case "Last30DPS":
                this.sortkey = "mergedLast30DPS";
                break;
            case "Last60DPS":
                this.sortkey = "mergedLast60DPS";
                break;
            case "Last180DPS":
                this.sortkey = "mergedLast180DPS";
                break
        }
    }

    var tmpOwner = [];
    var tmpUser = [];

    for (var i in this.Combatant) {
        if (this.Combatant[i].petOwner == "") {
            tmpUser.push(this.Combatant[i].name);
        } else {
            tmpOwner.push(this.Combatant[i].petOwner);
        }
    }
    for (var i in tmpUser) {
        for (var j in tmpOwner) {
            if (tmpUser[i] == tmpOwner[j]) {
                delete tmpOwner[j];
            }
        }
    }
    tmpMyName = "";
    for (var i = 0; i < tmpOwner.length; i++) {
        if (tmpOwner[i] != undefined) {
            tmpMyName = tmpOwner[i];
        }
    }
    for (var i in this.Combatant) {
        if (this.Combatant[i].isPet && this.summonerMerge) {
            if (this.Combatant["YOU"] != undefined) {
                if (tmpMyName == this.Combatant[i].petOwner)
                    this.Combatant["YOU"].merge(this.Combatant[i]);
            }
            if (this.Combatant[this.Combatant[i].petOwner] != undefined) {
                this.Combatant[this.Combatant[i].petOwner].merge(this.Combatant[i]);
            }
            this.Combatant[i].visible = !1
        } else {
            this.Combatant[i].visible = !0
        }
    }
    var tmp = [];
    var r = 0;
    for (var i in this.Combatant) {
        tmp.push({
            key: this.Combatant[i][this.sortkey],
            val: this.Combatant[i]
        });
    }
    this.Combatant = {};
    if (this.sortvector)
        tmp.sort(function (a, b) {
            return b.key - a.key
        });
    else tmp.sort(function (a, b) {
        return a.key - b.key
    });
    var tmpMax = 0;
    for (var i in tmp) {
        if (this.summonerMerge == true) {
            if (tmp[i].val.Job != "AVA") {
                if (tmpMax < tmp[i].val[this.sortkey])
                    tmpMax = tmp[i].val[this.sortkey];
            }
        } else {
            if (tmpMax < tmp[i].val[this.sortkey])
                tmpMax = tmp[i].val[this.sortkey];
        }
    }
    this.maxdamage = tmpMax;
    this.maxValue = tmpMax;

    for (var i in tmp) {
        this.Combatant[tmp[i].val.name] = tmp[i].val
    }
    for (var i in this.Combatant) {
        if (!this.Combatant[i].visible) continue;
        this.Combatant[i].rank = r++;
        this.Combatant[i].maxdamage = this.maxdamage
    }
    this.persons = this.Combatant
};
Combatant.prototype.changeLang = function (lang) {
    this.langpack = new Language(lang);
    document.dispatchEvent(new CustomEvent('onLanguageChange', {
        detail: {
            language: lang,
            combatant: this
        }
    }))
};
Combatant.prototype.AttachPets = function () {
    this.summonerMerge = !0;
    for (var i in this.Combatant) {
        this.Combatant[i].returnOrigin();
        this.Combatant[i].recalculate();
        this.Combatant[i].parent = this
    }
}
Combatant.prototype.DetachPets = function () {
    this.summonerMerge = !1;
    for (var i in this.Combatant) {
        this.Combatant[i].returnOrigin();
        this.Combatant[i].recalculate();
        this.Combatant[i].parent = this
    }
}
Combatant.prototype.sortkeyChange = function (key) {
    this.resort(key, !0)
};
Combatant.prototype.sortkeyChangeDesc = function (key) {
    this.resort(key, !1)
};
Combatant.prototype.resort = function (key, vector) {
    if (key == undefined)
        this.sortkey = activeSort(this.sortkey);
    else this.sortkey = activeSort(key);
    if (vector == undefined)
        vector = this.sortvector;
    this.sort(vector)
};

function Language(l) {
    if (l == undefined) var l = "ko";
    this.lang = l;
    this.cn = {
        "PLD": "骑士",
        "GLD": "剑术师",
        "WAR": "战士",
        "MRD": "斧术师",
        "DRK": "暗黑骑士",
        "MNK": "武僧",
        "PGL": "格斗家",
        "DRG": "龙骑士",
        "LNC": "枪术师",
        "NIN": "忍者",
        "ROG": "双剑师",
        "BRD": "吟游诗人",
        "ARC": "弓箭手",
        "MCH": "机工士",
        "DNC": "舞者",
        "SMN": "召唤师",
        "THM": "咒术师",
        "BLM": "黑魔法师",
        "WHM": "白魔法师",
        "CNJ": "幻术师",
        "SCH": "学者",
        "ACN": "秘术师",
        "AST": "占星术士",
        "LMB": "极限技",
        "FAIRY": "小仙女",
        "AUTOTURRET": "自动炮塔",
        "EGI": "召唤兽",
        "CHOCOBO": "陆行鸟",
    };
    this.hk = {
        "PLD": "骑士",
        "GLD": "剑术师",
        "WAR": "战士",
        "MRD": "斧术师",
        "DRK": "暗黑骑士",
        "MNK": "武僧",
        "PGL": "格斗家",
        "DRG": "龙骑士",
        "LNC": "枪术师",
        "NIN": "忍者",
        "ROG": "双剑师",
        "BRD": "吟游诗人",
        "ARC": "弓箭手",
        "MCH": "机工士",
        "SMN": "召唤师",
        "THM": "咒术师",
        "BLM": "黑魔法师",
        "WHM": "白魔法师",
        "CNJ": "幻术师",
        "SCH": "学者",
        "ACN": "秘术师",
        "AST": "占星术士",
        "LMB": "极限技",
        "FAIRY": "小仙女",
        "AUTOTURRET": "自动炮塔",
        "EGI": "召唤兽",
        "CHOCOBO": "陆行鸟",
    };
    this.jp = {
        "PLD": "ナイト",
        "GLD": "剣術士",
        "WAR": "戦",
        "MRD": "斧術士",
        "DRK": "暗",
        "MNK": "モンク",
        "PGL": "格闘士",
        "DRG": "竜",
        "LNC": "槍術士",
        "NIN": "忍",
        "ROG": "双剣士",
        "BRD": "吟",
        "ARC": "弓術士",
        "MCH": "機",
        "SMN": "召",
        "THM": "呪術士",
        "BLM": "黒",
        "WHM": "白",
        "CNJ": "幻術士",
        "SCH": "学",
        "ACN": "巴術士",
        "AST": "占",
        "LMB": "リミット",
        "FAIRY": "FAIRY",
        "AUTOTURRET": "AUTOTURRET",
        "EGI": "EGI",
        "CHOCOBO": "CHOCOBO",
    };
    this.en = {
        "PLD": "PLD",
        "GLD": "GLD",
        "WAR": "WAR",
        "MRD": "MRD",
        "DRK": "DRK",
        "MNK": "MNK",
        "PGL": "PGL",
        "DRG": "DRG",
        "LNC": "LNC",
        "NIN": "NIN",
        "ROG": "ROG",
        "BRD": "BRD",
        "ARC": "ARC",
        "MCH": "MCH",
        "SMN": "SMN",
        "THM": "THM",
        "BLM": "BLM",
        "WHM": "WHM",
        "CNJ": "CNJ",
        "SCH": "SCH",
        "ACN": "ACN",
        "AST": "AST",
        "LMB": "LMB",
        "FAIRY": "FAIRY",
        "AUTOTURRET": "AUTOTURRET",
        "EGI": "EGI",
        "CHOCOBO": "CHOCOBO",
    };
    this.ko = {
        "PLD": "나이트",
        "GLD": "검술사",
        "WAR": "전사",
        "MRD": "도끼술사",
        "DRK": "암흑기사",
        "MNK": "몽크",
        "PGL": "격투사",
        "DRG": "용기사",
        "LNC": "창술사",
        "NIN": "닌자",
        "ROG": "쌍검사",
        "BRD": "음유시인",
        "ARC": "궁술사",
        "MCH": "기공사",
        "SMN": "소환사",
        "THM": "주술사",
        "BLM": "흑마도사",
        "WHM": "백마도사",
        "CNJ": "환술사",
        "SCH": "학자",
        "ACN": "비술사",
        "AST": "점성술사",
        "LMB": "리미트",
        "FAIRY": "요정",
        "AUTOTURRET": "자동포탑",
        "EGI": "에기",
        "CHOCOBO": "초코보",
    }
}

Language.prototype.get = function (v) {
    try {
        return this[this.lang][v]
    } catch (ex) {
        return v
    }
};
var oStaticPersons = [];

function activeSort(key, merge) {
    if (key.indexOf("merged") > -1) {
        if (key.indexOf("Last") > -1) {
            key = key.replace(/merged/ig, "")
        } else {
            key = key.replace(/merged/ig, "");
            key = key.substr(0, 1).toLowerCase() + key.substr(1)
        }
    }
    if (key == "dmgPct")
        key = "damage%";
    if (key.indexOf("Pct") > -1 && key.indexOf("overHealPct") == -1)
        key = key.replace(/Pct/ig, "%");
    if (key == "encdps" || key == "dps")
        key = "damage";
    if (key == "enchps" || key == "hps")
        key = "healed";
    if (key == "maxhit")
        key = "maxhitval";
    if (key == "maxheal")
        key = "maxhealval";
    return key
}

function staticPerson(e) {
    var d = new Date();
    this.createTime = d.getTime();
    this.person = e;
    this.last180ARR = [];
    this.last180Copy = [];
    this.polygonPoints = []
}

function getLog(e) {
    for (var i in CombatLog) {
        if (CombatLog[i].combatKey == e && lastCombat.encounter.title != "Encounter") {
            lastCombat = CombatLog[i];
            document.dispatchEvent(new CustomEvent('onSuccessGetLog', {
                detail: {
                    combatant: CombatLog[i]
                }
            }));
            return !0
        }
    }
    return !1
}

function safeAdd(x, y) {
    var a = (x & 0xFFFF) + (y & 0xFFFF);
    var b = (x >> 16) + (y >> 16) + (a >> 16);
    return (b << 16) | (a & 0xFFFF)
}

function hexColor(str) {
    var str = str.replace("#", "");
    if (str.length == 6 || str.length == 3) {
        if (str.length == 6)
            return [parseInt(str.substr(0, 2), 16), parseInt(str.substr(2, 2), 16), parseInt(str.substr(4, 2), 16)];
        else return [parseInt(str.substr(0, 1), 16), parseInt(str.substr(1, 1), 16), parseInt(str.substr(2, 1), 16)]
    } else {
        return [0, 0, 0]
    }
}

function oHexColor(str) {
    var data = hexColor(str);
    return {
        r: data[0],
        g: data[1],
        b: data[2]
    }
}

function oHexArgb(str) {
    if (str.length < 8) return {
        a: 0,
        r: 0,
        g: 0,
        b: 0
    };
    var data = oHexColor(str.replace("#", "").substr(2, 6));
    var rgb = str.replace("#", "");
    return {
        a: parseFloat((parseInt(rgb.substr(0, 2), 16) / 255).toFixed(2)),
        r: data.r,
        g: data.g,
        b: data.b
    }
}

function saveLog(e) {
    var exists = !1;
    for (var i in CombatLog) {
        if (CombatLog[i].combatKey == e.combatKey)
            exists = !0
    }
    if (!exists) {
        CombatLog.push(e);
        document.dispatchEvent(new CustomEvent('onSuccessSaveLog', {
            detail: {
                combatant: e
            }
        }))
    }
}

function pFloat(num) {
    return parseFloat(num.nanFix().toFixed(underDot))
}

function loadSetting(key) {
    var json = "";
    try {
        json = localStorage.getItem(key);
        json = JSON.parse(json)
    } catch (ex) {
        return json
    }
    return json
}

function saveSetting(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

var combatLog = [];
var combatants = [];
var curhp = 100;
var delayOK = !0;
var jobColors = {
    "PLD": [200, 255, 255],
    "WAR": [200, 40, 30],
    "DRK": [130, 40, 50],
    "MNK": [180, 140, 20],
    "DRG": [50, 90, 240],
    "NIN": [80, 70, 90],
    "BRD": [180, 200, 80],
    "MCH": [130, 255, 240],
    "SMN": [40, 150, 0],
    "BLM": [100, 70, 150],
    "WHM": [200, 195, 170],
    "SCH": [60, 60, 160],
    "AST": [200, 130, 90],
    "LMB": [255, 204, 0]
};
var lastCombatRaw = null;
var lastCombat = null;
var maxhp = 100;
var myID = 0;
var myName = "";
var underDot = 2;
var sortKey = "encdps"
