
// minifier: path aliases

enyo.path.addPaths({g11n: "/home/me/src/network/activity/src/contributor-hub/enyo/tools/../../lib/g11n/", layout: "/home/me/src/network/activity/src/contributor-hub/enyo/tools/../../lib/layout/", onyx: "/home/me/src/network/activity/src/contributor-hub/enyo/tools/../../lib/onyx/", onyx: "/home/me/src/network/activity/src/contributor-hub/enyo/tools/../../lib/onyx/source/", sugar_network: "/home/me/src/network/activity/src/contributor-hub/enyo/tools/../../lib/sugar_network/"});

// javascript/g11n.js

if (!this.enyo) {
this.enyo = {};
var empty = {};
enyo.mixin = function(e, t) {
e = e || {};
if (t) {
var n, r;
for (n in t) r = t[n], empty[n] !== r && (e[n] = r);
}
return e;
};
}

"trim" in String.prototype || (String.prototype.trim = function() {
return this.replace(/^\s+|\s+$/g, "");
}), enyo.g11n = function() {}, enyo.g11n._init = function() {
if (!enyo.g11n._initialized) {
typeof window != "undefined" ? (enyo.g11n._platform = "browser", enyo.g11n._enyoAvailable = !0) : (enyo.g11n._platform = "node", enyo.g11n._enyoAvailable = !1);
if (navigator) {
var t = (navigator.language || navigator.userLanguage).replace(/-/g, "_").toLowerCase();
enyo.g11n._locale = new enyo.g11n.Locale(t), enyo.g11n._formatLocale = enyo.g11n._locale, enyo.g11n._phoneLocale = enyo.g11n._locale;
}
enyo.g11n._locale === undefined && (enyo.warn("enyo.g11n._init: could not find current locale, so using default of en_us."), enyo.g11n._locale = new enyo.g11n.Locale("en_us")), enyo.g11n._formatLocale === undefined && (enyo.warn("enyo.g11n._init: could not find current formats locale, so using default of us."), enyo.g11n._formatLocale = new enyo.g11n.Locale("en_us")), enyo.g11n._phoneLocale === undefined && (enyo.warn("enyo.g11n._init: could not find current phone locale, so defaulting to the same thing as the formats locale."), enyo.g11n._phoneLocale = enyo.g11n._formatLocale), enyo.g11n._sourceLocale === undefined && (enyo.g11n._sourceLocale = new enyo.g11n.Locale("en_us")), enyo.g11n._initialized = !0;
}
}, enyo.g11n.getPlatform = function() {
return enyo.g11n._platform || enyo.g11n._init(), enyo.g11n._platform;
}, enyo.g11n.isEnyoAvailable = function() {
return enyo.g11n._enyoAvailable || enyo.g11n._init(), enyo.g11n._enyoAvailable;
}, enyo.g11n.currentLocale = function() {
return enyo.g11n._locale || enyo.g11n._init(), enyo.g11n._locale;
}, enyo.g11n.formatLocale = function() {
return enyo.g11n._formatLocale || enyo.g11n._init(), enyo.g11n._formatLocale;
}, enyo.g11n.phoneLocale = function() {
return enyo.g11n._phoneLocale || enyo.g11n._init(), enyo.g11n._phoneLocale;
}, enyo.g11n.sourceLocale = function() {
return enyo.g11n._sourceLocale || enyo.g11n._init(), enyo.g11n._sourceLocale;
}, enyo.g11n.setLocale = function(t) {
t && (enyo.g11n._init(), t.uiLocale && (enyo.g11n._locale = new enyo.g11n.Locale(t.uiLocale)), t.formatLocale && (enyo.g11n._formatLocale = new enyo.g11n.Locale(t.formatLocale)), t.phoneLocale && (enyo.g11n._phoneLocale = new enyo.g11n.Locale(t.phoneLocale)), t.sourceLocale && (enyo.g11n._sourceLocale = new enyo.g11n.Locale(t.sourceLocale)), enyo.g11n._enyoAvailable && enyo.reloadG11nResources());
};

// javascript/fmts.js

enyo.g11n.Fmts = function(t) {
var n;
typeof t == "undefined" || !t.locale ? this.locale = enyo.g11n.formatLocale() : typeof t.locale == "string" ? this.locale = new enyo.g11n.Locale(t.locale) : this.locale = t.locale, this.dateTimeFormatHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: this.locale,
type: "region"
}), this.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: this.locale
}), this.dateTimeHash || (this.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: enyo.g11n.currentLocale()
})), this.dateTimeHash || (this.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: new enyo.g11n.Locale("en_us")
}));
}, enyo.g11n.Fmts.prototype.isAmPm = function() {
return typeof this.twelveHourFormat == "undefined" && (this.twelveHourFormat = this.dateTimeFormatHash.is12HourDefault), this.twelveHourFormat;
}, enyo.g11n.Fmts.prototype.isAmPmDefault = function() {
return this.dateTimeFormatHash.is12HourDefault;
}, enyo.g11n.Fmts.prototype.getFirstDayOfWeek = function() {
return this.dateTimeFormatHash.firstDayOfWeek;
}, enyo.g11n.Fmts.prototype.getDateFieldOrder = function() {
return this.dateTimeFormatHash ? this.dateTimeFormatHash.dateFieldOrder : (enyo.warn("Failed to load date time format hash"), "mdy");
}, enyo.g11n.Fmts.prototype.getTimeFieldOrder = function() {
return this.dateTimeFormatHash ? this.dateTimeFormatHash.timeFieldOrder : (enyo.warn("Failed to load date time format hash"), "hma");
}, enyo.g11n.Fmts.prototype.getMonthFields = function() {
return this.dateTimeHash ? this.dateTimeHash.medium.month : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
}, enyo.g11n.Fmts.prototype.getAmCaption = function() {
return this.dateTimeHash ? this.dateTimeHash.am : (enyo.error("Failed to load dateTimeHash."), "AM");
}, enyo.g11n.Fmts.prototype.getPmCaption = function() {
return this.dateTimeHash ? this.dateTimeHash.pm : (enyo.error("Failed to load dateTimeHash."), "PM");
}, enyo.g11n.Fmts.prototype.getMeasurementSystem = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.measurementSystem || "metric";
}, enyo.g11n.Fmts.prototype.getDefaultPaperSize = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.defaultPaperSize || "A4";
}, enyo.g11n.Fmts.prototype.getDefaultPhotoSize = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.defaultPhotoSize || "10X15CM";
}, enyo.g11n.Fmts.prototype.getDefaultTimeZone = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.defaultTimeZone || "Europe/London";
}, enyo.g11n.Fmts.prototype.isAsianScript = function() {
return this.dateTimeFormatHash && typeof this.dateTimeFormatHash.asianScript != "undefined" ? this.dateTimeFormatHash.asianScript : !1;
}, enyo.g11n.Fmts.prototype.isHanTraditional = function() {
return this.dateTimeFormatHash && typeof this.dateTimeFormatHash.scriptStyle != "undefined" ? this.dateTimeFormatHash.scriptStyle === "traditional" : !1;
}, enyo.g11n.Fmts.prototype.textDirection = function() {
return this.dateTimeFormatHash && this.dateTimeFormatHash.scriptDirection || "ltr";
};

// javascript/locale.js

enyo.g11n.Locale = function(t) {
var n = t ? t.split(/_/) : [];
return this.locale = t, this.language = n[0] || undefined, this.region = n[1] ? n[1].toLowerCase() : undefined, this.variant = n[2] ? n[2].toLowerCase() : undefined, this;
}, enyo.g11n.Locale.prototype.getLocale = function() {
return this.locale;
}, enyo.g11n.Locale.prototype.getLanguage = function() {
return this.language;
}, enyo.g11n.Locale.prototype.getRegion = function() {
return this.region;
}, enyo.g11n.Locale.prototype.getVariant = function() {
return this.variant;
}, enyo.g11n.Locale.prototype.toString = function() {
return this.locale || (this.locale = this.language + "_" + this.region, this.variant && (this.locale = this.locale + "_" + this.variant)), this.locale;
}, enyo.g11n.Locale.prototype.toISOString = function() {
var e = this.language || "";
return this.region && (e += "_" + this.region.toUpperCase()), this.variant && (e += "_" + this.variant.toUpperCase()), e;
}, enyo.g11n.Locale.prototype.isMatch = function(e) {
return e.language && e.region ? (!this.language || this.language === e.language) && (!this.region || this.region === e.region) : e.language ? !this.language || this.language === e.language : !this.region || this.region === e.region;
}, enyo.g11n.Locale.prototype.equals = function(e) {
return this.language === e.language && this.region === e.region && this.variant === e.variant;
}, enyo.g11n.Locale.prototype.useDefaultLang = function() {
var e, t, n;
this.language || (e = enyo.g11n.Utils.getNonLocaleFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats/defLangs.json"
}), t = e && e[this.region], t || (n = enyo.g11n.currentLocale(), t = n.language), this.language = t || "en", this.locale = this.language + "_" + this.region);
};

// javascript/loadfile.js

enyo.g11n.Utils = enyo.g11n.Utils || function() {}, enyo.g11n.Utils._fileCache = {}, enyo.g11n.Utils._getBaseURL = function(e) {
if ("baseURI" in e) return e.baseURI;
var t = e.getElementsByTagName("base");
return t.length > 0 ? t[0].href : window.location.href;
}, enyo.g11n.Utils._fetchAppRootPath = function() {
var e = window.document, t = enyo.g11n.Utils._getBaseURL(e).match(new RegExp(".*://[^#]*/"));
if (t) return t[0];
}, enyo.g11n.Utils._setRoot = function(t) {
var n = t;
return !t && enyo.g11n.isEnyoAvailable() ? n = enyo.g11n.Utils._fetchAppRootPath() + "assets" : n = ".", enyo.g11n.root = n;
}, enyo.g11n.Utils._getRoot = function() {
return enyo.g11n.root || enyo.g11n.Utils._setRoot();
}, enyo.g11n.Utils._getEnyoRoot = function(t) {
var n = [];
return !enyo.g11n.isEnyoAvailable() && t && n.push(t), enyo.path.paths.enyo && n.push(enyo.path.paths.enyo), n.length && n.push(".."), n.push("lib/g11n/source"), n.join("/");
}, enyo.g11n.Utils._loadFile = function(t) {
var n, r, i = enyo.g11n.getPlatform();
if (i === "node") try {
this.fs || (this.fs = IMPORTS.require("fs")), r = this.fs.readFileSync(t, "utf8"), r && (n = JSON.parse(r));
} catch (s) {
n = undefined;
} else try {
n = JSON.parse(enyo.xhr.request({
url: t,
sync: !0
}).responseText);
} catch (o) {}
return n;
}, enyo.g11n.Utils.getNonLocaleFile = function(t) {
var n, r, i;
if (!t || !t.path) return undefined;
t.path.charAt(0) !== "/" ? (r = t.root || this._getRoot(), i = r + "/" + t.path) : i = t.path;
if (enyo.g11n.Utils._fileCache[i] !== undefined) n = enyo.g11n.Utils._fileCache[i].json; else {
n = enyo.g11n.Utils._loadFile(i);
if (t.cache === undefined || t.cache !== !1) enyo.g11n.Utils._fileCache[i] = {
path: i,
json: n,
locale: undefined,
timestamp: new Date
}, this.oldestStamp === undefined && (this.oldestStamp = enyo.g11n.Utils._fileCache[i].timestamp);
}
return n;
}, enyo.g11n.Utils.getJsonFile = function(t) {
var n, r, i, s, o, u, a, f, l;
if (!t || !t.path || !t.locale) return undefined;
i = t.path.charAt(0) !== "/" ? t.root || this._getRoot() : "", i.slice(-1) !== "/" && (i += "/"), t.path ? (s = t.path, s.slice(-1) !== "/" && (s += "/")) : s = "", s += t.prefix || "", i += s, l = i + t.locale.toString() + ".json";
if (enyo.g11n.Utils._fileCache[l] !== undefined) n = enyo.g11n.Utils._fileCache[l].json; else {
t.merge ? (t.locale.language && (r = i + t.locale.language + ".json", o = this._loadFile(r)), t.locale.region && (r = i + t.locale.language + "_" + t.locale.region + ".json", u = this._loadFile(r), t.locale.language !== t.locale.region && (r = i + t.locale.region + ".json", a = this._loadFile(r))), t.locale.variant && (r = i + t.locale.language + "_" + t.locale.region + "_" + t.locale.variant + ".json", f = this._loadFile(r)), n = this._merge([ o, a, u, f ])) : (r = i + t.locale.toString() + ".json", n = this._loadFile(r), !n && t.type !== "region" && t.locale.language && (r = i + t.locale.language + ".json", n = this._loadFile(r)), !n && t.type !== "language" && t.locale.region && (r = i + t.locale.region + ".json", n = this._loadFile(r)), !n && t.type !== "language" && t.locale.region && (r = i + "_" + t.locale.region + ".json", n = this._loadFile(r)));
if (t.cache === undefined || t.cache !== !1) enyo.g11n.Utils._fileCache[l] = {
path: l,
json: n,
locale: t.locale,
timestamp: new Date
}, this.oldestStamp === undefined && (this.oldestStamp = enyo.g11n.Utils._fileCache[l].timestamp);
}
return n;
}, enyo.g11n.Utils._merge = function(t) {
var n, r, i = {};
for (n = 0, r = t.length; n < r; n++) i = enyo.mixin(i, t[n]);
return i;
}, enyo.g11n.Utils.releaseAllJsonFiles = function(t, n) {
var r = new Date, i = [], s, o, u, a;
t = t || 6e4;
if (this.oldestStamp !== undefined && this.oldestStamp.getTime() + t < r.getTime()) {
s = r;
for (o in enyo.g11n.Utils._fileCache) o && enyo.g11n.Utils._fileCache[o] && (a = enyo.g11n.Utils._fileCache[o], !a.locale || n || !enyo.g11n.currentLocale().isMatch(a.locale) && !enyo.g11n.formatLocale().isMatch(a.locale) && !enyo.g11n.phoneLocale().isMatch(a.locale) ? a.timestamp.getTime() + t < r.getTime() ? i.push(a.path) : a.timestamp.getTime() < s.getTime() && (s = a.timestamp) : a.timestamp.getTime() < s.getTime() && (s = a.timestamp));
this.oldestStamp = s.getTime() < r.getTime() ? s : undefined;
for (u = 0; u < i.length; u++) enyo.g11n.Utils._fileCache[i[u]] = undefined;
}
return i.length;
}, enyo.g11n.Utils._cacheSize = function() {
var t = 0, n;
for (n in enyo.g11n.Utils._fileCache) enyo.g11n.Utils._fileCache[n] && t++;
return t;
};

// javascript/template.js

enyo.g11n.Template = function(e, t) {
this.template = e, this.pattern = t || /(.?)(#\{(.*?)\})/;
}, enyo.g11n.Template.prototype._evalHelper = function(e, t) {
function s(e) {
return e === undefined || e === null ? "" : e;
}
function o(e, n, r) {
var i = t, o, u;
e = s(e);
if (e === "\\") return n;
o = r.split("."), u = o.shift();
while (i && u) {
i = i[u], u = o.shift();
if (!u) return e + s(i) || e || "";
}
return e || "";
}
var n = [], r = this.pattern, i;
if (!t || !e) return "";
while (e.length) i = e.match(r), i ? (n.push(e.slice(0, i.index)), n.push(o(i[1], i[2], i[3])), e = e.slice(i.index + i[0].length)) : (n.push(e), e = "");
return n.join("");
}, enyo.g11n.Template.prototype.evaluate = function(e) {
return this._evalHelper(this.template, e);
}, enyo.g11n.Template.prototype.formatChoice = function(e, t) {
try {
var n = this.template ? this.template.split("|") : [], r = [], i = [], s = "", o;
t = t || {};
for (o = 0; o < n.length; o++) {
var u = enyo.indexOf("#", n[o]);
if (u !== -1) {
r[o] = n[o].substring(0, u), i[o] = n[o].substring(u + 1);
if (e == r[o]) return this._evalHelper(i[o], t);
r[o] === "" && (s = i[o]);
}
}
for (o = 0; o < r.length; o++) {
var a = r[o];
if (a) {
var f = a.charAt(a.length - 1), l = parseFloat(a);
if (f === "<" && e < l || f === ">" && e > l) return this._evalHelper(i[o], t);
}
}
return this._evalHelper(s, t);
} catch (c) {
return enyo.error("formatChoice error : ", c), "";
}
};

// javascript/resources.js

$L = function(e) {
return $L._resources || ($L._resources = new enyo.g11n.Resources), $L._resources.$L(e);
}, $L._resources = null, enyo.g11n.Resources = function(e) {
e && e.root && (this.root = typeof window != "undefined" ? enyo.path.rewrite(e.root) : e.root), this.root = this.root || enyo.g11n.Utils._getRoot(), this.resourcePath = this.root + "/resources/", e && e.locale ? this.locale = typeof e.locale == "string" ? new enyo.g11n.Locale(e.locale) : e.locale : this.locale = enyo.g11n.currentLocale(), this.$L = this.locale.toString() === "en_pl" ? this._pseudo : this._$L, this.localizedResourcePath = this.resourcePath + this.locale.locale + "/", this.languageResourcePath = this.resourcePath + (this.locale.language ? this.locale.language + "/" : ""), this.regionResourcePath = this.languageResourcePath + (this.locale.region ? this.locale.region + "/" : ""), this.carrierResourcePath = this.regionResourcePath + (this.locale.variant ? this.locale.variant + "/" : "");
}, enyo.g11n.Resources.prototype.getResource = function(e) {
var t;
if (this.carrierResourcePath) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.carrierResourcePath + e
});
} catch (n) {
t = undefined;
}
if (!t) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.regionResourcePath + e
});
} catch (r) {
t = undefined;
}
if (!t) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.languageResourcePath + e
});
} catch (i) {
t = undefined;
}
if (!t) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.resourcePath + "en/" + e
});
} catch (s) {
t = undefined;
}
if (!t) try {
t = enyo.g11n.Utils.getNonLocaleFile({
path: this.root + "/" + e
});
} catch (o) {
t = undefined;
}
return t;
}, enyo.g11n.Resources.prototype.$L = function(e) {}, enyo.g11n.Resources.prototype._$L = function(e) {
var t, n;
return e ? this.locale.equals(enyo.g11n.sourceLocale()) ? typeof e == "string" ? e : e.value : (this.strings || this._loadStrings(), typeof e == "string" ? (t = e, n = e) : (t = e.key, n = e.value), this.strings && typeof this.strings[t] != "undefined" ? this.strings[t] : n) : "";
}, enyo.g11n.Resources.prototype._pseudo = function(e) {
var t, n;
if (!e) return "";
n = "";
for (t = 0; t < e.length; t++) if (e.charAt(t) === "#" && t + 1 < e.length && e.charAt(t + 1) === "{") {
while (e.charAt(t) !== "}" && t < e.length) n += e.charAt(t++);
t < e.length && (n += e.charAt(t));
} else if (e.charAt(t) === "<") {
while (e.charAt(t) !== ">" && t < e.length) n += e.charAt(t++);
t < e.length && (n += e.charAt(t));
} else if (e.charAt(t) === "&" && t + 1 < e.length && !enyo.g11n.Char.isSpace(e.charAt(t + 1))) {
while (e.charAt(t) !== ";" && !enyo.g11n.Char.isSpace(e.charAt(t)) && t < e.length) n += e.charAt(t++);
t < e.length && (n += e.charAt(t));
} else n += enyo.g11n.Resources._pseudoMap[e.charAt(t)] || e.charAt(t);
return n;
}, enyo.g11n.Resources.prototype._loadStrings = function() {
this.strings = enyo.g11n.Utils.getJsonFile({
root: this.root,
path: "resources",
locale: this.locale,
merge: !0
}), enyo.g11n.Utils.releaseAllJsonFiles();
}, enyo.g11n.Resources._pseudoMap = {
a: "\u00e1",
e: "\u00e8",
i: "\u00ef",
o: "\u00f5",
u: "\u00fb",
c: "\u00e7",
A: "\u00c5",
E: "\u00cb",
I: "\u00ce",
O: "\u00d5",
U: "\u00db",
C: "\u00c7",
B: "\u00df",
y: "\u00ff",
Y: "\u00dd",
D: "\u010e",
d: "\u0111",
g: "\u011d",
G: "\u011c",
H: "\u0124",
h: "\u0125",
J: "\u0134",
j: "\u0135",
K: "\u0136",
k: "\u0137",
N: "\u00d1",
n: "\u00f1",
S: "\u015e",
s: "\u015f",
T: "\u0164",
t: "\u0165",
W: "\u0174",
w: "\u0175",
Z: "\u0179",
z: "\u017a"
};

// javascript/character.js

enyo.g11n.Char = enyo.g11n.Char || {}, enyo.g11n.Char._strTrans = function(t, n) {
var r = "", i, s;
for (s = 0; s < t.length; s++) i = n[t.charAt(s)], r += i || t.charAt(s);
return r;
}, enyo.g11n.Char._objectIsEmpty = function(e) {
var t;
for (t in e) return !1;
return !0;
}, enyo.g11n.Char._isIdeoLetter = function(e) {
return e >= 19968 && e <= 40907 || e >= 63744 && e <= 64217 || e >= 13312 && e <= 19893 || e >= 12353 && e <= 12447 || e >= 12449 && e <= 12543 || e >= 65382 && e <= 65437 || e >= 12784 && e <= 12799 || e >= 12549 && e <= 12589 || e >= 12704 && e <= 12727 || e >= 12593 && e <= 12686 || e >= 65440 && e <= 65500 || e >= 44032 && e <= 55203 || e >= 40960 && e <= 42124 || e >= 4352 && e <= 4607 || e >= 43360 && e <= 43388 || e >= 55216 && e <= 55291 ? !0 : !1;
}, enyo.g11n.Char._isIdeoOther = function(e) {
return e >= 42125 && e <= 42191 || e >= 12544 && e <= 12548 || e >= 12590 && e <= 12591 || e >= 64218 && e <= 64255 || e >= 55292 && e <= 55295 || e >= 40908 && e <= 40959 || e >= 43389 && e <= 43391 || e >= 12800 && e <= 13055 || e >= 13056 && e <= 13183 || e >= 13184 && e <= 13311 || e === 12592 || e === 12687 || e === 12448 || e === 12352 || e === 12294 || e === 12348 ? !0 : !1;
}, enyo.g11n.Char.isIdeo = function(t) {
var n;
return !t || t.length < 1 ? !1 : (n = t.charCodeAt(0), enyo.g11n.Char._isIdeoLetter(n) || enyo.g11n.Char._isIdeoOther(n));
}, enyo.g11n.Char.isPunct = function(t) {
var n, r;
return !t || t.length < 1 ? !1 : (n = enyo.g11n.Utils.getNonLocaleFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data/chartype.punct.json"
}), r = n && t.charAt(0) in n, enyo.g11n.Utils.releaseAllJsonFiles(), r);
}, enyo.g11n.Char._space = {
9: 1,
10: 1,
11: 1,
12: 1,
13: 1,
32: 1,
133: 1,
160: 1,
5760: 1,
6158: 1,
8192: 1,
8193: 1,
8194: 1,
8195: 1,
8196: 1,
8197: 1,
8198: 1,
8199: 1,
8200: 1,
8201: 1,
8202: 1,
8232: 1,
8233: 1,
8239: 1,
8287: 1,
12288: 1
}, enyo.g11n.Char.isSpace = function(t) {
var n;
return !t || t.length < 1 ? !1 : (n = t.charCodeAt(0), n in enyo.g11n.Char._space);
}, enyo.g11n.Char.toUpper = function(t, n) {
var r;
if (!t) return undefined;
n || (n = enyo.g11n.currentLocale()), r = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data",
locale: n
});
if (!r || !r.upperMap) r = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data",
locale: new enyo.g11n.Locale("en")
});
return r && r.upperMap !== undefined ? enyo.g11n.Char._strTrans(t, r.upperMap) : (enyo.g11n.Utils.releaseAllJsonFiles(), t);
}, enyo.g11n.Char.isLetter = function(t) {
var n, r, i, s;
return !t || t.length < 1 ? !1 : (n = t.charAt(0), r = t.charCodeAt(0), i = enyo.g11n.Utils.getNonLocaleFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data/chartype.letter.json"
}), s = i && n in i || enyo.g11n.Char._isIdeoLetter(r), enyo.g11n.Utils.releaseAllJsonFiles(), s);
}, enyo.g11n.Char.getIndexChars = function(t) {
var n, r, i, s, o = [];
t ? typeof t == "string" ? r = new enyo.g11n.Locale(t) : r = t : r = enyo.g11n.currentLocale(), enyo.g11n.Char._resources || (enyo.g11n.Char._resources = {}), enyo.g11n.Char._resources[r.locale] || (enyo.g11n.Char._resources[r.locale] = new enyo.g11n.Resources({
root: enyo.g11n.Utils._getEnyoRoot() + "/base",
locale: r
})), i = enyo.g11n.Char._resources[r.locale], n = enyo.g11n.Char._resources[r.locale].$L({
key: "indexChars",
value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ#"
});
for (s = 0; s < n.length; s++) o.push(n[s]);
return o;
}, enyo.g11n.Char.getBaseString = function(t, n) {
var r, i;
if (!t) return undefined;
n ? typeof n == "string" ? i = new enyo.g11n.Locale(n) : i = n : i = enyo.g11n.currentLocale(), r = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data",
locale: i
});
if (!r || enyo.g11n.Char._objectIsEmpty(r)) r = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/character_data",
locale: new enyo.g11n.Locale("en")
});
return r && r.baseChars !== undefined && (t = enyo.g11n.Char._strTrans(t, r.baseChars)), enyo.g11n.Utils.releaseAllJsonFiles(), t;
};

// javascript/timezone.js

enyo.g11n._TZ = enyo.g11n._TZ || {}, enyo.g11n.TzFmt = function(e) {
return this.setTZ(), e !== undefined && e.TZ !== undefined && this.setCurrentTimeZone(e.TZ), enyo.g11n.Utils.releaseAllJsonFiles(), this;
}, enyo.g11n.TzFmt.prototype = {
toString: function() {
return this.TZ !== undefined ? this.TZ : this._TZ;
},
setTZ: function() {
var e = (new Date).toString(), t = enyo.indexOf("(", e), n = enyo.indexOf(")", e), r = e.slice(t + 1, n);
r !== undefined ? this.setCurrentTimeZone(r) : this.setDefaultTimeZone();
},
getCurrentTimeZone: function() {
return this.TZ !== undefined ? this.TZ : this._TZ !== undefined ? this._TZ : "unknown";
},
setCurrentTimeZone: function(e) {
this._TZ = e, this.TZ = e;
},
setDefaultTimeZone: function() {
var e = (new Date).toString().match(/\(([A-Z]+)\)/);
this._TZ = e && e[1] || "PST";
}
};

// javascript/datetime.js

enyo.g11n.DateFmt = function(e) {
var t, n, r, i, s;
s = this, s._normalizedComponents = {
date: {
dm: "DM",
md: "DM",
my: "MY",
ym: "MY",
d: "D",
dmy: "",
dym: "",
mdy: "",
myd: "",
ydm: "",
ymd: ""
},
time: {
az: "AZ",
za: "AZ",
a: "A",
z: "Z",
"": ""
},
timeLength: {
"short": "small",
medium: "small",
"long": "big",
full: "big"
}
}, s._normalizeDateTimeFormatComponents = function(e) {
var t = e.dateComponents, n = e.timeComponents, r, i, o, u = e.time;
return e.date && t && (r = s._normalizedComponents.date[t], r === undefined && (enyo.log("date component error: '" + t + "'"), r = "")), u && n !== undefined && (o = s._normalizedComponents.timeLength[u], o === undefined && (enyo.log("time format error: " + u), o = "small"), i = s._normalizedComponents.time[n], i === undefined && enyo.log("time component error: '" + n + "'")), e.dateComponents = r, e.timeComponents = i, e;
}, s._finalDateTimeFormat = function(e, t, n) {
var r = s.dateTimeFormatHash.dateTimeFormat || s.defaultFormats.dateTimeFormat;
return e && t ? s._buildDateTimeFormat(r, "dateTime", {
TIME: t,
DATE: e
}) : t || e || "M/d/yy h:mm a";
}, s._buildDateTimeFormat = function(e, t, n) {
var r, i, o = [], u = s._getTokenizedFormat(e, t), a;
for (r = 0, i = u.length; r < i && u[r] !== undefined; ++r) a = n[u[r]], a ? o.push(a) : o.push(u[r]);
return o.join("");
}, s._getDateFormat = function(e, t) {
var n = s._formatFetch(e, t.dateComponents, "Date");
if (e !== "full" && t.weekday) {
var r = s._formatFetch(t.weekday === !0 ? e : t.weekday, "", "Weekday");
n = s._buildDateTimeFormat(s.dateTimeFormatHash.weekDateFormat || s.defaultFormats.weekDateFormat, "weekDate", {
WEEK: r,
DATE: n
});
}
return n;
}, s._getTimeFormat = function(e, t) {
var n = s._formatFetch(e, "", s.twelveHourFormat ? "Time12" : "Time24");
if (t.timeComponents) {
var r = "time" + t.timeComponents, i = r + "Format";
return s._buildDateTimeFormat(s.dateTimeFormatHash[i] || s.defaultFormats[i], r, {
TIME: n,
AM: "a",
ZONE: "zzz"
});
}
return n;
}, s.ParserChunks = {
full: "('[^']+'|y{2,4}|M{1,4}|d{1,2}|z{1,3}|a|h{1,2}|H{1,2}|k{1,2}|K{1,2}|E{1,4}|m{1,2}|s{1,2}|[^A-Za-z']+)?",
dateTime: "(DATE|TIME|[^A-Za-z]+|'[^']+')?",
weekDate: "(DATE|WEEK|[^A-Za-z]+|'[^']+')?",
timeA: "(TIME|AM|[^A-Za-z]+|'[^']+')?",
timeZ: "(TIME|ZONE|[^A-Za-z]+|'[^']+')?",
timeAZ: "(TIME|AM|ZONE|[^A-Za-z]+|'[^']+')?"
}, s._getTokenizedFormat = function(e, t) {
var n = t && s.ParserChunks[t] || s.ParserChunks.full, r = e.length, i = [], o, u, a = new RegExp(n, "g");
while (r > 0) {
o = a.exec(e)[0], u = o.length;
if (u === 0) return [];
i.push(o), r -= u;
}
return i;
}, s._formatFetch = function(e, t, n, r) {
switch (e) {
case "short":
case "medium":
case "long":
case "full":
case "small":
case "big":
case "default":
return s.dateTimeFormatHash[e + (t || "") + n];
default:
return e;
}
}, s._dayOffset = function(e, t) {
var n;
return t = s._roundToMidnight(t), e = s._roundToMidnight(e), n = (e.getTime() - t.getTime()) / 864e5, n;
}, s._roundToMidnight = function(e) {
var t = e.getTime(), n = new Date;
return n.setTime(t), n.setHours(0), n.setMinutes(0), n.setSeconds(0), n.setMilliseconds(0), n;
}, s.inputParams = e, typeof e == "undefined" || !e.locale ? t = enyo.g11n.formatLocale() : typeof e.locale == "string" ? t = new enyo.g11n.Locale(e.locale) : t = e.locale, t.language || t.useDefaultLang(), this.locale = t, typeof e == "string" ? s.formatType = e : typeof e == "undefined" ? (e = {
format: "short"
}, s.formatType = e.format) : s.formatType = e.format, !s.formatType && !e.time && !e.date && (e ? e.format = "short" : e = {
format: "short"
}, s.formatType = "short"), s.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: t,
type: "language"
}), s.dateTimeHash || (s.dateTimeHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/datetime_data",
locale: new enyo.g11n.Locale("en_us")
})), s.dateTimeFormatHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: t,
type: "region"
}), s.dateTimeFormatHash || (s.dateTimeFormatHash = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: new enyo.g11n.Locale("en_us"),
type: "region"
})), s.rb = new enyo.g11n.Resources({
root: enyo.g11n.Utils._getEnyoRoot() + "/base",
locale: t
}), typeof e == "undefined" || typeof e.twelveHourFormat == "undefined" ? s.twelveHourFormat = s.dateTimeFormatHash.is12HourDefault : s.twelveHourFormat = e.twelveHourFormat;
if (s.formatType) switch (s.formatType) {
case "short":
case "medium":
case "long":
case "full":
case "default":
s.partsLength = s.formatType, i = s._finalDateTimeFormat(s._getDateFormat(s.formatType, e), s._getTimeFormat(s.formatType, e), e);
break;
default:
i = s.formatType;
} else e = s._normalizeDateTimeFormatComponents(e), e.time && (r = s._getTimeFormat(e.time, e), s.partsLength = e.time), e.date && (n = s._getDateFormat(e.date, e), s.partsLength = e.date), i = s._finalDateTimeFormat(n, r, e);
s.tokenized = s._getTokenizedFormat(i), s.partsLength || (s.partsLength = "full");
}, enyo.g11n.DateFmt.prototype.toString = function() {
return this.tokenized.join("");
}, enyo.g11n.DateFmt.prototype.isAmPm = function() {
return this.twelveHourFormat;
}, enyo.g11n.DateFmt.prototype.isAmPmDefault = function() {
return this.dateTimeFormatHash.is12HourDefault;
}, enyo.g11n.DateFmt.prototype.getFirstDayOfWeek = function() {
return this.dateTimeHash.firstDayOfWeek;
}, enyo.g11n.DateFmt.prototype._format = function(e, t) {
var n = this, r, i = [], s, o, u, a, f, l, c, h;
c = n.dateTimeHash;
for (f = 0, l = t.length; f < l && t[f] !== undefined; f++) {
switch (t[f]) {
case "yy":
s = "", i.push((e.getFullYear() + "").substring(2));
break;
case "yyyy":
s = "", i.push(e.getFullYear());
break;
case "MMMM":
s = "long", o = "month", u = e.getMonth();
break;
case "MMM":
s = "medium", o = "month", u = e.getMonth();
break;
case "MM":
s = "short", o = "month", u = e.getMonth();
break;
case "M":
s = "single", o = "month", u = e.getMonth();
break;
case "dd":
s = "short", o = "date", u = e.getDate() - 1;
break;
case "d":
s = "single", o = "date", u = e.getDate() - 1;
break;
case "zzz":
s = "", typeof n.timezoneFmt == "undefined" && (typeof n.inputParams == "undefined" || typeof n.inputParams.TZ == "undefined" ? n.timezoneFmt = new enyo.g11n.TzFmt : n.timezoneFmt = new enyo.g11n.TzFmt(n.inputParams)), a = n.timezoneFmt.getCurrentTimeZone(), i.push(a);
break;
case "a":
s = "", e.getHours() > 11 ? i.push(c.pm) : i.push(c.am);
break;
case "K":
s = "", i.push(e.getHours() % 12);
break;
case "KK":
s = "", r = e.getHours() % 12, i.push(r < 10 ? "0" + ("" + r) : r);
break;
case "h":
s = "", r = e.getHours() % 12, i.push(r === 0 ? 12 : r);
break;
case "hh":
s = "", r = e.getHours() % 12, i.push(r === 0 ? 12 : r < 10 ? "0" + ("" + r) : r);
break;
case "H":
s = "", i.push(e.getHours());
break;
case "HH":
s = "", r = e.getHours(), i.push(r < 10 ? "0" + ("" + r) : r);
break;
case "k":
s = "", r = e.getHours() % 12, i.push(r === 0 ? 12 : r);
break;
case "kk":
s = "", r = e.getHours() % 12, i.push(r === 0 ? 12 : r < 10 ? "0" + ("" + r) : r);
break;
case "EEEE":
s = "long", o = "day", u = e.getDay();
break;
case "EEE":
s = "medium", o = "day", u = e.getDay();
break;
case "EE":
s = "short", o = "day", u = e.getDay();
break;
case "E":
s = "single", o = "day", u = e.getDay();
break;
case "mm":
case "m":
s = "";
var p = e.getMinutes();
i.push(p < 10 ? "0" + ("" + p) : p);
break;
case "ss":
case "s":
s = "";
var d = e.getSeconds();
i.push(d < 10 ? "0" + ("" + d) : d);
break;
default:
h = /'([A-Za-z]+)'/.exec(t[f]), s = "", h ? i.push(h[1]) : i.push(t[f]);
}
s && i.push(c[s][o][u]);
}
return i.join("");
}, enyo.g11n.DateFmt.prototype.format = function(e) {
var t = this;
return typeof e != "object" || t.tokenized === null ? (enyo.warn("DateFmt.format: no date to format or no format loaded"), undefined) : this._format(e, t.tokenized);
}, enyo.g11n.DateFmt.prototype.formatRelativeDate = function(e, t) {
var n, r, i, s, o = this;
if (typeof e != "object") return undefined;
typeof t == "undefined" ? (r = !1, n = new Date) : (typeof t.referenceDate != "undefined" ? n = t.referenceDate : n = new Date, typeof t.verbosity != "undefined" ? r = t.verbosity : r = !1), s = o._dayOffset(n, e);
switch (s) {
case 0:
return o.dateTimeHash.relative.today;
case 1:
return o.dateTimeHash.relative.yesterday;
case -1:
return o.dateTimeHash.relative.tomorrow;
default:
if (s < 7) return o.dateTimeHash.long.day[e.getDay()];
if (s < 30) {
if (r) {
i = new enyo.g11n.Template(o.dateTimeHash.relative.thisMonth);
var u = Math.floor(s / 7);
return i.formatChoice(u, {
num: u
});
}
return o.format(e);
}
if (s < 365) {
if (r) {
i = new enyo.g11n.Template(o.dateTimeHash.relative.thisYear);
var a = Math.floor(s / 30);
return i.formatChoice(a, {
num: a
});
}
return o.format(e);
}
return o.format(e);
}
}, enyo.g11n.DateFmt.prototype.formatRange = function(e, t) {
var n, r, i, s, o, u, a, f, l = this.partsLength || "medium", c = this.dateTimeHash, h = this.dateTimeFormatHash;
return !e && !t ? "" : !e || !t ? this.format(e || t) : (t.getTime() < e.getTime() && (n = t, t = e, e = n), a = new Date(e.getTime()), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0), f = new Date(t.getTime()), f.setHours(0), f.setMinutes(0), f.setSeconds(0), f.setMilliseconds(0), f.getTime() - a.getTime() === 864e5 ? (s = "shortTime" + (this.twelveHourFormat ? "12" : "24"), r = this._getTokenizedFormat(h[s]), s = l + "Date", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeConsecutiveDays",
value: "#{startDate} #{startTime} - #{endDate} #{endTime}"
})), u.evaluate({
startTime: this._format(e, r),
endTime: this._format(t, r),
startDate: this._format(e, i),
endDate: this._format(t, i)
})) : e.getYear() === t.getYear() ? (o = l === "short" || l === "single" ? (e.getFullYear() + "").substring(2) : e.getFullYear(), e.getMonth() === t.getMonth() ? e.getDate() === t.getDate() ? (s = "shortTime" + (this.twelveHourFormat ? "12" : "24"), r = this._getTokenizedFormat(h[s]), s = l + "Date", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeWithinDay",
value: "#{startTime}-#{endTime}, #{date}"
})), u.evaluate({
startTime: this._format(e, r),
endTime: this._format(t, r),
date: this._format(e, i)
})) : (s = l + "DDate", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeWithinMonth",
value: "#{month} #{startDate}-#{endDate}, #{year}"
})), u.evaluate({
month: c[l].month[e.getMonth()],
startDate: this._format(e, i),
endDate: this._format(t, i),
year: o
})) : (l === "full" ? l = "long" : l === "single" && (l = "short"), s = l + "DMDate", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeWithinYear",
value: "#{start} - #{end}, #{year}"
})), u.evaluate({
start: this._format(e, i),
end: this._format(t, i),
year: o
}))) : t.getYear() - e.getYear() < 2 ? (s = l + "Date", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeWithinConsecutiveYears",
value: "#{start} - #{end}"
})), u.evaluate({
start: this._format(e, i),
end: this._format(t, i)
})) : (l === "full" ? l = "long" : l === "single" && (l = "short"), s = l + "MYDate", i = this._getTokenizedFormat(h[s]), u = new enyo.g11n.Template(this.rb.$L({
key: "dateRangeMultipleYears",
value: "#{startMonthYear} - #{endMonthYear}"
})), u.evaluate({
startMonthYear: this._format(e, i),
endMonthYear: this._format(t, i)
})));
};

// javascript/numberfmt.js

enyo.g11n.NumberFmt = function(e) {
var t, n, r, i, s, o, u;
typeof e == "number" ? this.fractionDigits = e : e && typeof e.fractionDigits == "number" && (this.fractionDigits = e.fractionDigits), !e || !e.locale ? this.locale = enyo.g11n.formatLocale() : typeof e.locale == "string" ? this.locale = new enyo.g11n.Locale(e.locale) : this.locale = e.locale, this.style = e && e.style || "number", t = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: this.locale,
type: "region"
}), this.style === "currency" && (r = e && e.currency || t && t.currency && t.currency.name, r ? (r = r.toUpperCase(), this.currencyStyle = e && e.currencyStyle === "iso" ? "iso" : "common", n = enyo.g11n.Utils.getNonLocaleFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/number_data/iso4217.json"
}), n ? (i = n[r], i || (s = new enyo.g11n.Locale(r), u = enyo.g11n.Utils.getJsonFile({
root: enyo.g11n.Utils._getEnyoRoot(),
path: "base/formats",
locale: s,
type: "region"
}), u && (r = u.currency && u.currency.name, i = n[r])), i || (r = t && t.currency && t.currency.name, i = n[r]), i ? (this.sign = this.currencyStyle !== "iso" ? i.sign : r, this.fractionDigits = e && typeof e.fractionDigits == "number" ? e.fractionDigits : i.digits) : this.style = "number") : (r = t && t.currency && t.currency.name, this.sign = r)) : (r = t && t.currency && t.currency.name, this.sign = r), r ? (o = t && t.currency && t.currency[this.currencyStyle] || "#{sign} #{amt}", this.currencyTemplate = new enyo.g11n.Template(o)) : this.style = "number"), t ? (this.decimal = t.numberDecimal || ".", this.divider = t.numberDivider || ",", t.dividerIndex ? t.dividerIndex === 4 ? this.numberGroupRegex = /(\d+)(\d{4})/ : this.numberGroupRegex = /(\d+)(\d{3})/ : this.numberGroupRegex = /(\d+)(\d{3})/, this.percentageSpace = t.percentageSpace) : (this.decimal = ".", this.divider = ",", this.numberGroupRegex = /(\d+)(\d{3})/, this.percentageSpace = !1), this.numberGroupRegex.compile(this.numberGroupRegex), enyo.g11n.Utils.releaseAllJsonFiles();
}, enyo.g11n.NumberFmt.prototype.format = function(e) {
try {
var t, n, r, i;
typeof e == "string" && (e = parseFloat(e));
if (isNaN(e)) return undefined;
typeof this.fractionDigits != "undefined" ? t = e.toFixed(this.fractionDigits) : t = e.toString(), n = t.split("."), r = n[0];
while (this.divider && this.numberGroupRegex.test(r)) r = r.replace(this.numberGroupRegex, "$1" + this.divider + "$2");
return n[0] = r, i = n.join(this.decimal), this.style === "currency" && this.currencyTemplate ? i = this.currencyTemplate.evaluate({
amt: i,
sign: this.sign
}) : this.style === "percent" && (i += this.percentageSpace ? " %" : "%"), i;
} catch (s) {
return enyo.log("formatNumber error : " + s), (e || "0") + "." + (this.fractionDigits || "");
}
};

// javascript/duration.js

enyo.g11n.DurationFmt = function(e) {
typeof e == "undefined" ? (this.locale = enyo.g11n.formatLocale(), this.style = "short") : (e.locale ? typeof e.locale == "string" ? this.locale = new enyo.g11n.Locale(e.locale) : this.locale = e.locale : this.locale = enyo.g11n.formatLocale(), e.style ? (this.style = e.style, this.style !== "short" && this.style !== "medium" && this.style !== "long" && this.style !== "full" && (this.style = "short")) : this.style = "short"), this.rb = new enyo.g11n.Resources({
root: enyo.g11n.Utils._getEnyoRoot() + "/base",
locale: this.locale
}), this.style === "short" ? this.parts = {
years: new enyo.g11n.Template(this.rb.$L({
key: "yearsFormatShort",
value: "##{num}y"
})),
months: new enyo.g11n.Template(this.rb.$L({
key: "monthsFormatShort",
value: "##{num}m"
})),
weeks: new enyo.g11n.Template(this.rb.$L({
key: "weeksFormatShort",
value: "##{num}w"
})),
days: new enyo.g11n.Template(this.rb.$L({
key: "daysFormatShort",
value: "##{num}d"
})),
hours: new enyo.g11n.Template(this.rb.$L({
key: "hoursFormatShort",
value: "##{num}"
})),
minutes: new enyo.g11n.Template(this.rb.$L({
key: "minutesFormatShort",
value: "##{num}"
})),
seconds: new enyo.g11n.Template(this.rb.$L({
key: "secondsFormatShort",
value: "##{num}"
})),
separator: this.rb.$L({
key: "separatorShort",
value: " "
}),
dateTimeSeparator: this.rb.$L({
key: "dateTimeSeparatorShort",
value: " "
}),
longTimeFormat: new enyo.g11n.Template(this.rb.$L({
key: "longTimeFormatShort",
value: "#{hours}:#{minutes}:#{seconds}"
})),
shortTimeFormat: new enyo.g11n.Template(this.rb.$L({
key: "shortTimeFormatShort",
value: "#{minutes}:#{seconds}"
})),
finalSeparator: ""
} : this.style === "medium" ? this.parts = {
years: new enyo.g11n.Template(this.rb.$L({
key: "yearsFormatMedium",
value: "##{num} yr"
})),
months: new enyo.g11n.Template(this.rb.$L({
key: "monthsFormatMedium",
value: "##{num} mo"
})),
weeks: new enyo.g11n.Template(this.rb.$L({
key: "weeksFormatMedium",
value: "##{num} wk"
})),
days: new enyo.g11n.Template(this.rb.$L({
key: "daysFormatMedium",
value: "##{num} dy"
})),
hours: new enyo.g11n.Template(this.rb.$L({
key: "hoursFormatMedium",
value: "##{num}"
})),
minutes: new enyo.g11n.Template(this.rb.$L({
key: "minutesFormatMedium",
value: "##{num}"
})),
seconds: new enyo.g11n.Template(this.rb.$L({
key: "secondsFormatMedium",
value: "##{num}"
})),
separator: this.rb.$L({
key: "separatorMedium",
value: " "
}),
dateTimeSeparator: this.rb.$L({
key: "dateTimeSeparatorMedium",
value: " "
}),
longTimeFormat: new enyo.g11n.Template(this.rb.$L({
key: "longTimeFormatMedium",
value: "#{hours}:#{minutes}:#{seconds}"
})),
shortTimeFormat: new enyo.g11n.Template(this.rb.$L({
key: "shortTimeFormatMedium",
value: "#{minutes}:#{seconds}"
})),
finalSeparator: ""
} : this.style === "long" ? this.parts = {
years: new enyo.g11n.Template(this.rb.$L({
key: "yearsFormatLong",
value: "1#1 yr|1>##{num} yrs"
})),
months: new enyo.g11n.Template(this.rb.$L({
key: "monthsFormatLong",
value: "1#1 mon|1>##{num} mos"
})),
weeks: new enyo.g11n.Template(this.rb.$L({
key: "weeksFormatLong",
value: "1#1 wk|1>##{num} wks"
})),
days: new enyo.g11n.Template(this.rb.$L({
key: "daysFormatLong",
value: "1#1 day|1>##{num} dys"
})),
hours: new enyo.g11n.Template(this.rb.$L({
key: "hoursFormatLong",
value: "0#|1#1 hr|1>##{num} hrs"
})),
minutes: new enyo.g11n.Template(this.rb.$L({
key: "minutesFormatLong",
value: "0#|1#1 min|1>##{num} min"
})),
seconds: new enyo.g11n.Template(this.rb.$L({
key: "secondsFormatLong",
value: "0#|1#1 sec|1>##{num} sec"
})),
separator: this.rb.$L({
key: "separatorLong",
value: " "
}),
dateTimeSeparator: this.rb.$L({
key: "dateTimeSeparatorLong",
value: " "
}),
longTimeFormat: "",
shortTimeFormat: "",
finalSeparator: ""
} : this.style === "full" && (this.parts = {
years: new enyo.g11n.Template(this.rb.$L({
key: "yearsFormatFull",
value: "1#1 year|1>##{num} years"
})),
months: new enyo.g11n.Template(this.rb.$L({
key: "monthsFormatFull",
value: "1#1 month|1>##{num} months"
})),
weeks: new enyo.g11n.Template(this.rb.$L({
key: "weeksFormatFull",
value: "1#1 week|1>##{num} weeks"
})),
days: new enyo.g11n.Template(this.rb.$L({
key: "daysFormatFull",
value: "1#1 day|1>##{num} days"
})),
hours: new enyo.g11n.Template(this.rb.$L({
key: "hoursFormatFull",
value: "0#|1#1 hour|1>##{num} hours"
})),
minutes: new enyo.g11n.Template(this.rb.$L({
key: "minutesFormatFull",
value: "0#|1#1 minute|1>##{num} minutes"
})),
seconds: new enyo.g11n.Template(this.rb.$L({
key: "secondsFormatFull",
value: "0#|1#1 second|1>##{num} seconds"
})),
separator: this.rb.$L({
key: "separatorFull",
value: ", "
}),
dateTimeSeparator: this.rb.$L({
key: "dateTimeSeparatorFull",
value: ", "
}),
longTimeFormat: "",
shortTimeFormat: "",
finalSeparator: this.rb.$L({
key: "finalSeparatorFull",
value: " and "
})
}), this.dateParts = [ "years", "months", "weeks", "days" ], this.timeParts = [ "hours", "minutes", "seconds" ];
}, enyo.g11n.DurationFmt.prototype.format = function(e) {
var t = [], n = [], r, i, s, o;
if (!e || enyo.g11n.Char._objectIsEmpty(e)) return "";
for (i = 0; i < this.dateParts.length; i++) s = e[this.dateParts[i]] || 0, s > 0 && (o = this.parts[this.dateParts[i]].formatChoice(s, {
num: s
}), o && o.length > 0 && (t.length > 0 && t.push(this.parts.separator), t.push(o)));
if (this.style === "long" || this.style === "full") for (i = 0; i < this.timeParts.length; i++) s = e[this.timeParts[i]] || 0, s > 0 && (o = this.parts[this.timeParts[i]].formatChoice(s, {
num: s
}), o && o.length > 0 && (n.length > 0 && n.push(this.parts.separator), n.push(o))); else {
var u = {}, a = e.hours ? this.parts.longTimeFormat : this.parts.shortTimeFormat;
for (i = 0; i < this.timeParts.length; i++) {
s = e[this.timeParts[i]] || 0;
if (s < 10) switch (this.timeParts[i]) {
case "minutes":
e.hours && (s = "0" + s);
break;
case "seconds":
s = "0" + s;
break;
case "hours":
}
o = this.parts[this.timeParts[i]].formatChoice(s, {
num: s
}), o && o.length > 0 && (u[this.timeParts[i]] = o);
}
n.push(a.evaluate(u));
}
r = t, r.length > 0 && n.length > 0 && r.push(this.parts.dateTimeSeparator);
for (i = 0; i < n.length; i++) r.push(n[i]);
return r.length > 2 && this.style === "full" && (r[r.length - 2] = this.parts.finalSeparator), r.join("") || "";
};

// FittableLayout.js

enyo.kind({
name: "enyo.FittableLayout",
kind: "Layout",
calcFitIndex: function() {
for (var e = 0, t = this.container.children, n; n = t[e]; e++) if (n.fit && n.showing) return e;
},
getFitControl: function() {
var e = this.container.children, t = e[this.fitIndex];
return t && t.fit && t.showing || (this.fitIndex = this.calcFitIndex(), t = e[this.fitIndex]), t;
},
getLastControl: function() {
var e = this.container.children, t = e.length - 1, n = e[t];
while ((n = e[t]) && !n.showing) t--;
return n;
},
_reflow: function(e, t, n, r) {
this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
var i = this.getFitControl();
if (!i) return;
var s = 0, o = 0, u = 0, a, f = this.container.hasNode();
f && (a = enyo.dom.calcPaddingExtents(f), s = f[t] - (a[n] + a[r]));
var l = i.getBounds();
o = l[n] - (a && a[n] || 0);
var c = this.getLastControl();
if (c) {
var h = enyo.dom.getComputedBoxValue(c.hasNode(), "margin", r) || 0;
if (c != i) {
var p = c.getBounds(), d = l[n] + l[e], v = p[n] + p[e] + h;
u = v - d;
} else u = h;
}
var m = s - (o + u);
i.applyStyle(e, m + "px");
},
reflow: function() {
this.orient == "h" ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
}
}), enyo.kind({
name: "enyo.FittableColumnsLayout",
kind: "FittableLayout",
orient: "h",
layoutClass: "enyo-fittable-columns-layout"
}), enyo.kind({
name: "enyo.FittableRowsLayout",
kind: "FittableLayout",
layoutClass: "enyo-fittable-rows-layout",
orient: "v"
});

// FittableRows.js

enyo.kind({
name: "enyo.FittableRows",
layoutKind: "FittableRowsLayout",
noStretch: !1
});

// FittableColumns.js

enyo.kind({
name: "enyo.FittableColumns",
layoutKind: "FittableColumnsLayout",
noStretch: !1
});

// FlyweightRepeater.js

enyo.kind({
name: "enyo.FlyweightRepeater",
published: {
count: 0,
noSelect: !1,
multiSelect: !1,
toggleSelected: !1,
clientClasses: "",
clientStyle: ""
},
events: {
onSetupItem: ""
},
bottomUp: !1,
components: [ {
kind: "Selection",
onSelect: "selectDeselect",
onDeselect: "selectDeselect"
}, {
name: "client"
} ],
rowOffset: 0,
create: function() {
this.inherited(arguments), this.noSelectChanged(), this.multiSelectChanged(), this.clientClassesChanged(), this.clientStyleChanged();
},
noSelectChanged: function() {
this.noSelect && this.$.selection.clear();
},
multiSelectChanged: function() {
this.$.selection.setMulti(this.multiSelect);
},
clientClassesChanged: function() {
this.$.client.setClasses(this.clientClasses);
},
clientStyleChanged: function() {
this.$.client.setStyle(this.clientStyle);
},
setupItem: function(e) {
this.doSetupItem({
index: e,
selected: this.isSelected(e)
});
},
generateChildHtml: function() {
var e = "";
this.index = null;
for (var t = 0, n = 0; t < this.count; t++) n = this.rowOffset + (this.bottomUp ? this.count - t - 1 : t), this.setupItem(n), this.$.client.setAttribute("data-enyo-index", n), e += this.inherited(arguments), this.$.client.teardownRender();
return e;
},
previewDomEvent: function(e) {
var t = this.index = this.rowForEvent(e);
e.rowIndex = e.index = t, e.flyweight = this;
},
decorateEvent: function(e, t, n) {
var r = t && t.index != null ? t.index : this.index;
t && r != null && (t.index = r, t.flyweight = this), this.inherited(arguments);
},
tap: function(e, t) {
if (this.noSelect) return;
this.toggleSelected ? this.$.selection.toggle(t.index) : this.$.selection.select(t.index);
},
selectDeselect: function(e, t) {
this.renderRow(t.key);
},
getSelection: function() {
return this.$.selection;
},
isSelected: function(e) {
return this.getSelection().isSelected(e);
},
renderRow: function(e) {
var t = this.fetchRowNode(e);
t && (this.setupItem(e), t.innerHTML = this.$.client.generateChildHtml(), this.$.client.teardownChildren());
},
fetchRowNode: function(e) {
if (this.hasNode()) {
var t = this.node.querySelectorAll('[data-enyo-index="' + e + '"]');
return t && t[0];
}
},
rowForEvent: function(e) {
var t = e.target, n = this.hasNode().id;
while (t && t.parentNode && t.id != n) {
var r = t.getAttribute && t.getAttribute("data-enyo-index");
if (r !== null) return Number(r);
t = t.parentNode;
}
return -1;
},
prepareRow: function(e) {
var t = this.fetchRowNode(e);
enyo.FlyweightRepeater.claimNode(this.$.client, t);
},
lockRow: function() {
this.$.client.teardownChildren();
},
performOnRow: function(e, t, n) {
t && (this.prepareRow(e), enyo.call(n || null, t), this.lockRow());
},
statics: {
claimNode: function(e, t) {
var n = t && t.querySelectorAll("#" + e.id);
n = n && n[0], e.generated = Boolean(n || !e.tag), e.node = n, e.node && e.rendered();
for (var r = 0, i = e.children, s; s = i[r]; r++) this.claimNode(s, t);
}
}
});

// List.js

enyo.kind({
name: "enyo.List",
kind: "Scroller",
classes: "enyo-list",
published: {
count: 0,
rowsPerPage: 50,
bottomUp: !1,
noSelect: !1,
multiSelect: !1,
toggleSelected: !1,
fixedHeight: !1
},
events: {
onSetupItem: ""
},
handlers: {
onAnimateFinish: "animateFinish"
},
rowHeight: 0,
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "generator",
kind: "FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
} ]
} ],
create: function() {
this.pageHeights = [], this.inherited(arguments), this.getStrategy().translateOptimized = !0, this.bottomUpChanged(), this.noSelectChanged(), this.multiSelectChanged(), this.toggleSelectedChanged();
},
createStrategy: function() {
this.controlParentName = "strategy", this.inherited(arguments), this.createChrome(this.listTools), this.controlParentName = "client", this.discoverControlParent();
},
rendered: function() {
this.inherited(arguments), this.$.generator.node = this.$.port.hasNode(), this.$.generator.generated = !0, this.reset();
},
resizeHandler: function() {
this.inherited(arguments), this.refresh();
},
bottomUpChanged: function() {
this.$.generator.bottomUp = this.bottomUp, this.$.page0.applyStyle(this.pageBound, null), this.$.page1.applyStyle(this.pageBound, null), this.pageBound = this.bottomUp ? "bottom" : "top", this.hasNode() && this.reset();
},
noSelectChanged: function() {
this.$.generator.setNoSelect(this.noSelect);
},
multiSelectChanged: function() {
this.$.generator.setMultiSelect(this.multiSelect);
},
toggleSelectedChanged: function() {
this.$.generator.setToggleSelected(this.toggleSelected);
},
countChanged: function() {
this.hasNode() && this.updateMetrics();
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.portSize = 0;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
generatePage: function(e, t) {
this.page = e;
var n = this.$.generator.rowOffset = this.rowsPerPage * this.page, r = this.$.generator.count = Math.min(this.count - n, this.rowsPerPage), i = this.$.generator.generateChildHtml();
t.setContent(i);
var s = t.getBounds().height;
!this.rowHeight && s > 0 && (this.rowHeight = Math.floor(s / r), this.updateMetrics());
if (!this.fixedHeight) {
var o = this.getPageHeight(e);
o != s && s > 0 && (this.pageHeights[e] = s, this.portSize += s - o);
}
},
update: function(e) {
var t = !1, n = this.positionToPageInfo(e), r = n.pos + this.scrollerHeight / 2, i = Math.floor(r / Math.max(n.height, this.scrollerHeight) + .5) + n.no, s = i % 2 === 0 ? i : i - 1;
this.p0 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page0), this.positionPage(s, this.$.page0), this.p0 = s, t = !0), s = i % 2 === 0 ? Math.max(1, i - 1) : i, this.p1 != s && this.isPageInRange(s) && (this.generatePage(s, this.$.page1), this.positionPage(s, this.$.page1), this.p1 = s, t = !0), t && !this.fixedHeight && (this.adjustBottomPage(), this.adjustPortSize());
},
updateForPosition: function(e) {
this.update(this.calcPos(e));
},
calcPos: function(e) {
return this.bottomUp ? this.portSize - this.scrollerHeight - e : e;
},
adjustBottomPage: function() {
var e = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
this.positionPage(e.pageNo, e);
},
adjustPortSize: function() {
this.scrollerHeight = this.getBounds().height;
var e = Math.max(this.scrollerHeight, this.portSize);
this.$.port.applyStyle("height", e + "px");
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e);
t.applyStyle(this.pageBound, n + "px");
},
pageToPosition: function(e) {
var t = 0, n = e;
while (n > 0) n--, t += this.getPageHeight(n);
return t;
},
positionToPageInfo: function(e) {
var t = -1, n = this.calcPos(e), r = this.defaultPageHeight;
while (n >= 0) t++, r = this.getPageHeight(t), n -= r;
return {
no: t,
height: r,
pos: n + r
};
},
isPageInRange: function(e) {
return e == Math.max(0, Math.min(this.pageCount - 1, e));
},
getPageHeight: function(e) {
return this.pageHeights[e] || this.defaultPageHeight;
},
invalidatePages: function() {
this.p0 = this.p1 = null, this.$.page0.setContent(""), this.$.page1.setContent("");
},
invalidateMetrics: function() {
this.pageHeights = [], this.rowHeight = 0, this.updateMetrics();
},
scroll: function(e, t) {
var n = this.inherited(arguments);
return this.update(this.getScrollTop()), n;
},
scrollToBottom: function() {
this.update(this.getScrollBounds().maxTop), this.inherited(arguments);
},
setScrollTop: function(e) {
this.update(e), this.inherited(arguments), this.twiddle();
},
getScrollPosition: function() {
return this.calcPos(this.getScrollTop());
},
setScrollPosition: function(e) {
this.setScrollTop(this.calcPos(e));
},
scrollToRow: function(e) {
var t = Math.floor(e / this.rowsPerPage), n = e % this.rowsPerPage, r = this.pageToPosition(t);
this.updateForPosition(r), r = this.pageToPosition(t), this.setScrollPosition(r);
if (t == this.p0 || t == this.p1) {
var i = this.$.generator.fetchRowNode(e);
if (i) {
var s = i.offsetTop;
this.bottomUp && (s = this.getPageHeight(t) - i.offsetHeight - s);
var o = this.getScrollPosition() + s;
this.setScrollPosition(o);
}
}
},
scrollToStart: function() {
this[this.bottomUp ? "scrollToBottom" : "scrollToTop"]();
},
scrollToEnd: function() {
this[this.bottomUp ? "scrollToTop" : "scrollToBottom"]();
},
refresh: function() {
this.invalidatePages(), this.update(this.getScrollTop()), this.stabilize(), enyo.platform.android === 4 && this.twiddle();
},
reset: function() {
this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), this.scrollToStart();
},
getSelection: function() {
return this.$.generator.getSelection();
},
select: function(e, t) {
return this.getSelection().select(e, t);
},
deselect: function(e) {
return this.getSelection().deselect(e);
},
isSelected: function(e) {
return this.$.generator.isSelected(e);
},
renderRow: function(e) {
this.$.generator.renderRow(e);
},
prepareRow: function(e) {
this.$.generator.prepareRow(e);
},
lockRow: function() {
this.$.generator.lockRow();
},
performOnRow: function(e, t, n) {
this.$.generator.performOnRow(e, t, n);
},
animateFinish: function(e) {
return this.twiddle(), !0;
},
twiddle: function() {
var e = this.getStrategy();
enyo.call(e, "twiddle");
}
});

// PulldownList.js

enyo.kind({
name: "enyo.PulldownList",
kind: "List",
touch: !0,
pully: null,
pulldownTools: [ {
name: "pulldown",
classes: "enyo-list-pulldown",
components: [ {
name: "puller",
kind: "Puller"
} ]
} ],
events: {
onPullStart: "",
onPullCancel: "",
onPull: "",
onPullRelease: "",
onPullComplete: ""
},
handlers: {
onScrollStart: "scrollStartHandler",
onScrollStop: "scrollStopHandler",
ondragfinish: "dragfinish"
},
pullingMessage: "Pull down to refresh...",
pulledMessage: "Release to refresh...",
loadingMessage: "Loading...",
pullingIconClass: "enyo-puller-arrow enyo-puller-arrow-down",
pulledIconClass: "enyo-puller-arrow enyo-puller-arrow-up",
loadingIconClass: "",
create: function() {
var e = {
kind: "Puller",
showing: !1,
text: this.loadingMessage,
iconClass: this.loadingIconClass,
onCreate: "setPully"
};
this.listTools.splice(0, 0, e), this.inherited(arguments), this.setPulling();
},
initComponents: function() {
this.createChrome(this.pulldownTools), this.accel = enyo.dom.canAccelerate(), this.translation = this.accel ? "translate3d" : "translate", this.inherited(arguments);
},
setPully: function(e, t) {
this.pully = t.originator;
},
scrollStartHandler: function() {
this.firedPullStart = !1, this.firedPull = !1, this.firedPullCancel = !1;
},
scroll: function(e, t) {
var n = this.inherited(arguments);
this.completingPull && this.pully.setShowing(!1);
var r = this.getStrategy().$.scrollMath, i = r.y;
return r.isInOverScroll() && i > 0 && (enyo.dom.transformValue(this.$.pulldown, this.translation, "0," + i + "px" + (this.accel ? ",0" : "")), this.firedPullStart || (this.firedPullStart = !0, this.pullStart(), this.pullHeight = this.$.pulldown.getBounds().height), i > this.pullHeight && !this.firedPull && (this.firedPull = !0, this.firedPullCancel = !1, this.pull()), this.firedPull && !this.firedPullCancel && i < this.pullHeight && (this.firedPullCancel = !0, this.firedPull = !1, this.pullCancel())), n;
},
scrollStopHandler: function() {
this.completingPull && (this.completingPull = !1, this.doPullComplete());
},
dragfinish: function() {
if (this.firedPull) {
var e = this.getStrategy().$.scrollMath;
e.setScrollY(e.y - this.pullHeight), this.pullRelease();
}
},
completePull: function() {
this.completingPull = !0, this.$.strategy.$.scrollMath.setScrollY(this.pullHeight), this.$.strategy.$.scrollMath.start();
},
pullStart: function() {
this.setPulling(), this.pully.setShowing(!1), this.$.puller.setShowing(!0), this.doPullStart();
},
pull: function() {
this.setPulled(), this.doPull();
},
pullCancel: function() {
this.setPulling(), this.doPullCancel();
},
pullRelease: function() {
this.$.puller.setShowing(!1), this.pully.setShowing(!0), this.doPullRelease();
},
setPulling: function() {
this.$.puller.setText(this.pullingMessage), this.$.puller.setIconClass(this.pullingIconClass);
},
setPulled: function() {
this.$.puller.setText(this.pulledMessage), this.$.puller.setIconClass(this.pulledIconClass);
}
}), enyo.kind({
name: "enyo.Puller",
classes: "enyo-puller",
published: {
text: "",
iconClass: ""
},
events: {
onCreate: ""
},
components: [ {
name: "icon"
}, {
name: "text",
tag: "span",
classes: "enyo-puller-text"
} ],
create: function() {
this.inherited(arguments), this.doCreate(), this.textChanged(), this.iconClassChanged();
},
textChanged: function() {
this.$.text.setContent(this.text);
},
iconClassChanged: function() {
this.$.icon.setClasses(this.iconClass);
}
});

// AroundList.js

enyo.kind({
name: "enyo.AroundList",
kind: "enyo.List",
listTools: [ {
name: "port",
classes: "enyo-list-port enyo-border-box",
components: [ {
name: "aboveClient"
}, {
name: "generator",
kind: "enyo.FlyweightRepeater",
canGenerate: !1,
components: [ {
tag: null,
name: "client"
} ]
}, {
name: "page0",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "page1",
allowHtml: !0,
classes: "enyo-list-page"
}, {
name: "belowClient"
} ]
} ],
aboveComponents: null,
initComponents: function() {
this.inherited(arguments), this.aboveComponents && this.$.aboveClient.createComponents(this.aboveComponents, {
owner: this.owner
}), this.belowComponents && this.$.belowClient.createComponents(this.belowComponents, {
owner: this.owner
});
},
updateMetrics: function() {
this.defaultPageHeight = this.rowsPerPage * (this.rowHeight || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), this.aboveHeight = this.$.aboveClient.getBounds().height, this.belowHeight = this.$.belowClient.getBounds().height, this.portSize = this.aboveHeight + this.belowHeight;
for (var e = 0; e < this.pageCount; e++) this.portSize += this.getPageHeight(e);
this.adjustPortSize();
},
positionPage: function(e, t) {
t.pageNo = e;
var n = this.pageToPosition(e), r = this.bottomUp ? this.belowHeight : this.aboveHeight;
n += r, t.applyStyle(this.pageBound, n + "px");
},
scrollToContentStart: function() {
var e = this.bottomUp ? this.belowHeight : this.aboveHeight;
this.setScrollPosition(e);
}
});

// Slideable.js

enyo.kind({
name: "enyo.Slideable",
kind: "Control",
published: {
axis: "h",
value: 0,
unit: "px",
min: 0,
max: 0,
accelerated: "auto",
overMoving: !0,
draggable: !0
},
events: {
onAnimateFinish: "",
onChange: ""
},
preventDragPropagation: !1,
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
} ],
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
kDragScalar: 1,
dragEventProp: "dx",
unitModifier: !1,
canTransform: !1,
create: function() {
this.inherited(arguments), this.acceleratedChanged(), this.transformChanged(), this.axisChanged(), this.valueChanged(), this.addClass("enyo-slideable");
},
initComponents: function() {
this.createComponents(this.tools), this.inherited(arguments);
},
rendered: function() {
this.inherited(arguments), this.canModifyUnit(), this.updateDragScalar();
},
resizeHandler: function() {
this.inherited(arguments), this.updateDragScalar();
},
canModifyUnit: function() {
if (!this.canTransform) {
var e = this.getInitialStyleValue(this.hasNode(), this.boundary);
e.match(/px/i) && this.unit === "%" && (this.unitModifier = this.getBounds()[this.dimension]);
}
},
getInitialStyleValue: function(e, t) {
var n = enyo.dom.getComputedStyle(e);
return n ? n.getPropertyValue(t) : e && e.currentStyle ? e.currentStyle[t] : "0";
},
updateBounds: function(e, t) {
var n = {};
n[this.boundary] = e, this.setBounds(n, this.unit), this.setInlineStyles(e, t);
},
updateDragScalar: function() {
if (this.unit == "%") {
var e = this.getBounds()[this.dimension];
this.kDragScalar = e ? 100 / e : 1, this.canTransform || this.updateBounds(this.value, 100);
}
},
transformChanged: function() {
this.canTransform = enyo.dom.canTransform();
},
acceleratedChanged: function() {
enyo.platform.android > 2 || enyo.dom.accelerate(this, this.accelerated);
},
axisChanged: function() {
var e = this.axis == "h";
this.dragMoveProp = e ? "dx" : "dy", this.shouldDragProp = e ? "horizontal" : "vertical", this.transform = e ? "translateX" : "translateY", this.dimension = e ? "width" : "height", this.boundary = e ? "left" : "top";
},
setInlineStyles: function(e, t) {
var n = {};
this.unitModifier ? (n[this.boundary] = this.percentToPixels(e, this.unitModifier), n[this.dimension] = this.unitModifier, this.setBounds(n)) : (t ? n[this.dimension] = t : n[this.boundary] = e, this.setBounds(n, this.unit));
},
valueChanged: function(e) {
var t = this.value;
this.isOob(t) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(t) : this.clampValue(t)), enyo.platform.android > 2 && (this.value ? (e === 0 || e === undefined) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), this.canTransform ? enyo.dom.transformValue(this, this.transform, this.value + this.unit) : this.setInlineStyles(this.value, !1), this.doChange();
},
getAnimator: function() {
return this.$.animator;
},
isAtMin: function() {
return this.value <= this.calcMin();
},
isAtMax: function() {
return this.value >= this.calcMax();
},
calcMin: function() {
return this.min;
},
calcMax: function() {
return this.max;
},
clampValue: function(e) {
var t = this.calcMin(), n = this.calcMax();
return Math.max(t, Math.min(e, n));
},
dampValue: function(e) {
return this.dampBound(this.dampBound(e, this.min, 1), this.max, -1);
},
dampBound: function(e, t, n) {
var r = e;
return r * n < t * n && (r = t + (r - t) / 4), r;
},
percentToPixels: function(e, t) {
return Math.floor(t / 100 * e);
},
pixelsToPercent: function(e) {
var t = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
return e / t * 100;
},
shouldDrag: function(e) {
return this.draggable && e[this.shouldDragProp];
},
isOob: function(e) {
return e > this.calcMax() || e < this.calcMin();
},
dragstart: function(e, t) {
if (this.shouldDrag(t)) return t.preventDefault(), this.$.animator.stop(), t.dragInfo = {}, this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation;
},
drag: function(e, t) {
if (this.dragging) {
t.preventDefault();
var n = this.canTransform ? t[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(t[this.dragMoveProp]), r = this.drag0 + n, i = n - this.dragd0;
return this.dragd0 = n, i && (t.dragInfo.minimizing = i < 0), this.setValue(r), this.preventDragPropagation;
}
},
dragfinish: function(e, t) {
if (this.dragging) return this.dragging = !1, this.completeDrag(t), t.preventTap(), this.preventDragPropagation;
},
completeDrag: function(e) {
this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(e.dragInfo.minimizing);
},
isAnimating: function() {
return this.$.animator.isAnimating();
},
play: function(e, t) {
this.$.animator.play({
startValue: e,
endValue: t,
node: this.hasNode()
});
},
animateTo: function(e) {
this.play(this.value, e);
},
animateToMin: function() {
this.animateTo(this.calcMin());
},
animateToMax: function() {
this.animateTo(this.calcMax());
},
animateToMinMax: function(e) {
e ? this.animateToMin() : this.animateToMax();
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.doAnimateFinish(e), !0;
},
toggleMinMax: function() {
this.animateToMinMax(!this.isAtMin());
}
});

// Arranger.js

enyo.kind({
name: "enyo.Arranger",
kind: "Layout",
layoutClass: "enyo-arranger",
accelerated: "auto",
dragProp: "ddx",
dragDirectionProp: "xDirection",
canDragProp: "horizontal",
incrementalPoints: !1,
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n._arranger = null;
this.inherited(arguments);
},
arrange: function(e, t) {},
size: function() {},
start: function() {
var e = this.container.fromIndex, t = this.container.toIndex, n = this.container.transitionPoints = [ e ];
if (this.incrementalPoints) {
var r = Math.abs(t - e) - 2, i = e;
while (r >= 0) i += t < e ? -1 : 1, n.push(i), r--;
}
n.push(this.container.toIndex);
},
finish: function() {},
calcArrangementDifference: function(e, t, n, r) {},
canDragEvent: function(e) {
return e[this.canDragProp];
},
calcDragDirection: function(e) {
return e[this.dragDirectionProp];
},
calcDrag: function(e) {
return e[this.dragProp];
},
drag: function(e, t, n, r, i) {
var s = this.measureArrangementDelta(-e, t, n, r, i);
return s;
},
measureArrangementDelta: function(e, t, n, r, i) {
var s = this.calcArrangementDifference(t, n, r, i), o = s ? e / Math.abs(s) : 0;
return o *= this.container.fromIndex > this.container.toIndex ? -1 : 1, o;
},
_arrange: function(e) {
this.containerBounds || this.reflow();
var t = this.getOrderedControls(e);
this.arrange(t, e);
},
arrangeControl: function(e, t) {
e._arranger = enyo.mixin(e._arranger || {}, t);
},
flow: function() {
this.c$ = [].concat(this.container.getPanels()), this.controlsIndex = 0;
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) {
enyo.dom.accelerate(n, this.accelerated);
if (enyo.platform.safari) {
var r = n.children;
for (var i = 0, s; s = r[i]; i++) enyo.dom.accelerate(s, this.accelerated);
}
}
},
reflow: function() {
var e = this.container.hasNode();
this.containerBounds = e ? {
width: e.clientWidth,
height: e.clientHeight
} : {}, this.size();
},
flowArrangement: function() {
var e = this.container.arrangement;
if (e) for (var t = 0, n = this.container.getPanels(), r; r = n[t]; t++) this.flowControl(r, e[t]);
},
flowControl: function(e, t) {
enyo.Arranger.positionControl(e, t);
var n = t.opacity;
n != null && enyo.Arranger.opacifyControl(e, n);
},
getOrderedControls: function(e) {
var t = Math.floor(e), n = t - this.controlsIndex, r = n > 0, i = this.c$ || [];
for (var s = 0; s < Math.abs(n); s++) r ? i.push(i.shift()) : i.unshift(i.pop());
return this.controlsIndex = t, i;
},
statics: {
positionControl: function(e, t, n) {
var r = n || "px";
if (!this.updating) if (enyo.dom.canTransform() && !enyo.platform.android) {
var i = t.left, s = t.top;
i = enyo.isString(i) ? i : i && i + r, s = enyo.isString(s) ? s : s && s + r, enyo.dom.transform(e, {
translateX: i || null,
translateY: s || null
});
} else e.setBounds(t, n);
},
opacifyControl: function(e, t) {
var n = t;
n = n > .99 ? 1 : n < .01 ? 0 : n, enyo.platform.ie < 9 ? e.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + n * 100 + ")") : e.applyStyle("opacity", n);
}
}
});

// CardArranger.js

enyo.kind({
name: "enyo.CardArranger",
kind: "Arranger",
layoutClass: "enyo-arranger enyo-arranger-fit",
calcArrangementDifference: function(e, t, n, r) {
return this.containerBounds.width;
},
arrange: function(e, t) {
for (var n = 0, r, i, s; r = e[n]; n++) s = n === 0 ? 1 : 0, this.arrangeControl(r, {
opacity: s
});
},
start: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.opacifyControl(n, 1), n.showing || n.setShowing(!0);
this.inherited(arguments);
}
});

// CardSlideInArranger.js

enyo.kind({
name: "enyo.CardSlideInArranger",
kind: "CardArranger",
start: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) {
var r = n.showing;
n.setShowing(t == this.container.fromIndex || t == this.container.toIndex), n.showing && !r && n.resized();
}
var i = this.container.fromIndex;
t = this.container.toIndex, this.container.transitionPoints = [ t + "." + i + ".s", t + "." + i + ".f" ];
},
finish: function() {
this.inherited(arguments);
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.setShowing(t == this.container.toIndex);
},
arrange: function(e, t) {
var n = t.split("."), r = n[0], i = n[1], s = n[2] == "s", o = this.containerBounds.width;
for (var u = 0, a = this.container.getPanels(), f, l; f = a[u]; u++) l = o, i == u && (l = s ? 0 : -o), r == u && (l = s ? o : 0), i == u && i == r && (l = 0), this.arrangeControl(f, {
left: l
});
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null
});
this.inherited(arguments);
}
});

// CarouselArranger.js

enyo.kind({
name: "enyo.CarouselArranger",
kind: "Arranger",
size: function() {
var e = this.container.getPanels(), t = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, n = this.containerBounds, r, i, s, o, u;
n.height -= t.top + t.bottom, n.width -= t.left + t.right;
var a;
for (r = 0, s = 0; u = e[r]; r++) o = enyo.dom.calcMarginExtents(u.hasNode()), u.width = u.getBounds().width, u.marginWidth = o.right + o.left, s += (u.fit ? 0 : u.width) + u.marginWidth, u.fit && (a = u);
if (a) {
var f = n.width - s;
a.width = f >= 0 ? f : a.width;
}
for (r = 0, i = t.left; u = e[r]; r++) u.setBounds({
top: t.top,
bottom: t.bottom,
width: u.fit ? u.width : null
});
},
arrange: function(e, t) {
this.container.wrap ? this.arrangeWrap(e, t) : this.arrangeNoWrap(e, t);
},
arrangeNoWrap: function(e, t) {
var n, r, i, s, o = this.container.getPanels(), u = this.container.clamp(t), a = this.containerBounds.width;
for (n = u, i = 0; s = o[n]; n++) {
i += s.width + s.marginWidth;
if (i > a) break;
}
var f = a - i, l = 0;
if (f > 0) {
var c = u;
for (n = u - 1, r = 0; s = o[n]; n--) {
r += s.width + s.marginWidth;
if (f - r <= 0) {
l = f - r, u = n;
break;
}
}
}
var h, p;
for (n = 0, p = this.containerPadding.left + l; s = o[n]; n++) h = s.width + s.marginWidth, n < u ? this.arrangeControl(s, {
left: -h
}) : (this.arrangeControl(s, {
left: Math.floor(p)
}), p += h);
},
arrangeWrap: function(e, t) {
for (var n = 0, r = this.containerPadding.left, i, s; s = e[n]; n++) this.arrangeControl(s, {
left: r
}), r += s.width + s.marginWidth;
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % this.c$.length);
return t[i].left - r[i].left;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("top", null), n.applyStyle("bottom", null), n.applyStyle("left", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// CollapsingArranger.js

enyo.kind({
name: "enyo.CollapsingArranger",
kind: "CarouselArranger",
size: function() {
this.clearLastSize(), this.inherited(arguments);
},
clearLastSize: function() {
for (var e = 0, t = this.container.getPanels(), n; n = t[e]; e++) n._fit && e != t.length - 1 && (n.applyStyle("width", null), n._fit = null);
},
arrange: function(e, t) {
var n = this.container.getPanels();
for (var r = 0, i = this.containerPadding.left, s, o; o = n[r]; r++) this.arrangeControl(o, {
left: i
}), r >= t && (i += o.width + o.marginWidth), r == n.length - 1 && t < 0 && this.arrangeControl(o, {
left: i - t
});
},
calcArrangementDifference: function(e, t, n, r) {
var i = this.container.getPanels().length - 1;
return Math.abs(r[i].left - t[i].left);
},
flowControl: function(e, t) {
this.inherited(arguments);
if (this.container.realtimeFit) {
var n = this.container.getPanels(), r = n.length - 1, i = n[r];
e == i && this.fitControl(e, t.left);
}
},
finish: function() {
this.inherited(arguments);
if (!this.container.realtimeFit && this.containerBounds) {
var e = this.container.getPanels(), t = this.container.arrangement, n = e.length - 1, r = e[n];
this.fitControl(r, t[n].left);
}
},
fitControl: function(e, t) {
e._fit = !0, e.applyStyle("width", this.containerBounds.width - t + "px"), e.resized();
}
});

// OtherArrangers.js

enyo.kind({
name: "enyo.LeftRightArranger",
kind: "Arranger",
margin: 40,
axisSize: "width",
offAxisSize: "height",
axisPosition: "left",
constructor: function() {
this.inherited(arguments), this.margin = this.container.margin != null ? this.container.margin : this.margin;
},
size: function() {
var e = this.container.getPanels(), t = this.containerBounds[this.axisSize], n = t - this.margin - this.margin;
for (var r = 0, i, s; s = e[r]; r++) i = {}, i[this.axisSize] = n, i[this.offAxisSize] = "100%", s.setBounds(i);
},
start: function() {
this.inherited(arguments);
var e = this.container.fromIndex, t = this.container.toIndex, n = this.getOrderedControls(t), r = Math.floor(n.length / 2);
for (var i = 0, s; s = n[i]; i++) e > t ? i == n.length - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1) : i == n.length - 1 - r ? s.applyStyle("z-index", 0) : s.applyStyle("z-index", 1);
},
arrange: function(e, t) {
var n, r, i, s;
if (this.container.getPanels().length == 1) {
s = {}, s[this.axisPosition] = this.margin, this.arrangeControl(this.container.getPanels()[0], s);
return;
}
var o = Math.floor(this.container.getPanels().length / 2), u = this.getOrderedControls(Math.floor(t) - o), a = this.containerBounds[this.axisSize] - this.margin - this.margin, f = this.margin - a * o;
for (n = 0; r = u[n]; n++) s = {}, s[this.axisPosition] = f, this.arrangeControl(r, s), f += a;
},
calcArrangementDifference: function(e, t, n, r) {
if (this.container.getPanels().length == 1) return 0;
var i = Math.abs(e % this.c$.length);
return t[i][this.axisPosition] - r[i][this.axisPosition];
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), enyo.Arranger.opacifyControl(n, 1), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.TopBottomArranger",
kind: "LeftRightArranger",
dragProp: "ddy",
dragDirectionProp: "yDirection",
canDragProp: "vertical",
axisSize: "height",
offAxisSize: "width",
axisPosition: "top"
}), enyo.kind({
name: "enyo.SpiralArranger",
kind: "Arranger",
incrementalPoints: !0,
inc: 20,
size: function() {
var e = this.container.getPanels(), t = this.containerBounds, n = this.controlWidth = t.width / 3, r = this.controlHeight = t.height / 3;
for (var i = 0, s; s = e[i]; i++) s.setBounds({
width: n,
height: r
});
},
arrange: function(e, t) {
var n = this.inc;
for (var r = 0, i = e.length, s; s = e[r]; r++) {
var o = Math.cos(r / i * 2 * Math.PI) * r * n + this.controlWidth, u = Math.sin(r / i * 2 * Math.PI) * r * n + this.controlHeight;
this.arrangeControl(s, {
left: o,
top: u
});
}
},
start: function() {
this.inherited(arguments);
var e = this.getOrderedControls(this.container.toIndex);
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", e.length - t);
},
calcArrangementDifference: function(e, t, n, r) {
return this.controlWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) n.applyStyle("z-index", null), enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
}), enyo.kind({
name: "enyo.GridArranger",
kind: "Arranger",
incrementalPoints: !0,
colWidth: 100,
colHeight: 100,
size: function() {
var e = this.container.getPanels(), t = this.colWidth, n = this.colHeight;
for (var r = 0, i; i = e[r]; r++) i.setBounds({
width: t,
height: n
});
},
arrange: function(e, t) {
var n = this.colWidth, r = this.colHeight, i = Math.max(1, Math.floor(this.containerBounds.width / n)), s;
for (var o = 0, u = 0; u < e.length; o++) for (var a = 0; a < i && (s = e[u]); a++, u++) this.arrangeControl(s, {
left: n * a,
top: r * o
});
},
flowControl: function(e, t) {
this.inherited(arguments), enyo.Arranger.opacifyControl(e, t.top % this.colHeight !== 0 ? .25 : 1);
},
calcArrangementDifference: function(e, t, n, r) {
return this.colWidth;
},
destroy: function() {
var e = this.container.getPanels();
for (var t = 0, n; n = e[t]; t++) enyo.Arranger.positionControl(n, {
left: null,
top: null
}), n.applyStyle("left", null), n.applyStyle("top", null), n.applyStyle("height", null), n.applyStyle("width", null);
this.inherited(arguments);
}
});

// Panels.js

enyo.kind({
name: "enyo.Panels",
classes: "enyo-panels",
published: {
index: 0,
draggable: !0,
animate: !0,
wrap: !1,
arrangerKind: "CardArranger",
narrowFit: !0
},
events: {
onTransitionStart: "",
onTransitionFinish: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
onscroll: "domScroll"
},
tools: [ {
kind: "Animator",
onStep: "step",
onEnd: "completed"
} ],
fraction: 0,
create: function() {
this.transitionPoints = [], this.inherited(arguments), this.arrangerKindChanged(), this.narrowFitChanged(), this.indexChanged(), this.setAttribute("onscroll", enyo.bubbler);
},
domScroll: function(e, t) {
this.hasNode() && this.node.scrollLeft > 0 && (this.node.scrollLeft = 0);
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
arrangerKindChanged: function() {
this.setLayoutKind(this.arrangerKind);
},
narrowFitChanged: function() {
this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit);
},
removeControl: function(e) {
this.inherited(arguments), this.controls.length > 0 && this.isPanel(e) && (this.setIndex(Math.max(this.index - 1, 0)), this.flow(), this.reflow());
},
isPanel: function() {
return !0;
},
flow: function() {
this.arrangements = [], this.inherited(arguments);
},
reflow: function() {
this.arrangements = [], this.inherited(arguments), this.refresh();
},
getPanels: function() {
var e = this.controlParent || this;
return e.children;
},
getActive: function() {
var e = this.getPanels(), t = this.index % e.length;
return t < 0 ? t += e.length : enyo.nop, e[t];
},
getAnimator: function() {
return this.$.animator;
},
setIndex: function(e) {
this.setPropertyValue("index", e, "indexChanged");
},
setIndexDirect: function(e) {
this.setIndex(e), this.completed();
},
previous: function() {
this.setIndex(this.index - 1);
},
next: function() {
this.setIndex(this.index + 1);
},
clamp: function(e) {
var t = this.getPanels().length - 1;
return this.wrap ? e : Math.max(0, Math.min(e, t));
},
indexChanged: function(e) {
this.lastIndex = e, this.index = this.clamp(this.index), !this.dragging && this.$.animator && (this.$.animator.isAnimating() && this.completed(), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(), this.$.animator.play({
startValue: this.fraction
})) : this.refresh()));
},
step: function(e) {
this.fraction = e.value, this.stepTransition();
},
completed: function() {
this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
dragstart: function(e, t) {
if (this.draggable && this.layout && this.layout.canDragEvent(t)) return t.preventDefault(), this.dragstartTransition(t), this.dragging = !0, this.$.animator.stop(), !0;
},
drag: function(e, t) {
this.dragging && (t.preventDefault(), this.dragTransition(t));
},
dragfinish: function(e, t) {
this.dragging && (this.dragging = !1, t.preventTap(), this.dragfinishTransition(t));
},
dragstartTransition: function(e) {
if (!this.$.animator.isAnimating()) {
var t = this.fromIndex = this.index;
this.toIndex = t - (this.layout ? this.layout.calcDragDirection(e) : 0);
} else this.verifyDragTransition(e);
this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), this.fireTransitionStart(), this.layout && this.layout.start();
},
dragTransition: function(e) {
var t = this.layout ? this.layout.calcDrag(e) : 0, n = this.transitionPoints, r = n[0], i = n[n.length - 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i), u = this.layout ? this.layout.drag(t, r, s, i, o) : 0, a = t && !u;
a, this.fraction += u;
var f = this.fraction;
if (f > 1 || f < 0 || a) (f > 0 || a) && this.dragfinishTransition(e), this.dragstartTransition(e), this.fraction = 0;
this.stepTransition();
},
dragfinishTransition: function(e) {
this.verifyDragTransition(e), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
},
verifyDragTransition: function(e) {
var t = this.layout ? this.layout.calcDragDirection(e) : 0, n = Math.min(this.fromIndex, this.toIndex), r = Math.max(this.fromIndex, this.toIndex);
if (t > 0) {
var i = n;
n = r, r = i;
}
n != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = n, this.toIndex = r;
},
refresh: function() {
this.$.animator && this.$.animator.isAnimating() && this.$.animator.stop(), this.startTransition(), this.fraction = 1, this.stepTransition(), this.finishTransition();
},
startTransition: function() {
this.fromIndex = this.fromIndex != null ? this.fromIndex : this.lastIndex || 0, this.toIndex = this.toIndex != null ? this.toIndex : this.index, this.layout && this.layout.start(), this.fireTransitionStart();
},
finishTransition: function() {
this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, this.fromIndex = this.toIndex = null, this.fireTransitionFinish();
},
fireTransitionStart: function() {
var e = this.startTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.fromIndex || e.toIndex != this.toIndex) && (this.startTransitionInfo = {
fromIndex: this.fromIndex,
toIndex: this.toIndex
}, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
},
fireTransitionFinish: function() {
var e = this.finishTransitionInfo;
this.hasNode() && (!e || e.fromIndex != this.lastIndex || e.toIndex != this.index) && (this.finishTransitionInfo = {
fromIndex: this.lastIndex,
toIndex: this.index
}, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo))), this.lastIndex = this.index;
},
stepTransition: function() {
if (this.hasNode()) {
var e = this.transitionPoints, t = (this.fraction || 0) * (e.length - 1), n = Math.floor(t);
t -= n;
var r = e[n], i = e[n + 1], s = this.fetchArrangement(r), o = this.fetchArrangement(i);
this.arrangement = s && o ? enyo.Panels.lerp(s, o, t) : s || o, this.arrangement && this.layout && this.layout.flowArrangement();
}
},
fetchArrangement: function(e) {
return e != null && !this.arrangements[e] && this.layout && (this.layout._arrange(e), this.arrangements[e] = this.readArrangement(this.getPanels())), this.arrangements[e];
},
readArrangement: function(e) {
var t = [];
for (var n = 0, r = e, i; i = r[n]; n++) t.push(enyo.clone(i._arranger));
return t;
},
statics: {
isScreenNarrow: function() {
return enyo.dom.getWindowWidth() <= 800;
},
lerp: function(e, t, n) {
var r = [];
for (var i = 0, s = enyo.keys(e), o; o = s[i]; i++) r.push(this.lerpObject(e[o], t[o], n));
return r;
},
lerpObject: function(e, t, n) {
var r = enyo.clone(e), i, s;
if (t) for (var o in e) i = e[o], s = t[o], i != s && (r[o] = i - (i - s) * n);
return r;
}
}
});

// Node.js

enyo.kind({
name: "enyo.Node",
published: {
expandable: !1,
expanded: !1,
icon: "",
onlyIconExpands: !1,
selected: !1
},
style: "padding: 0 0 0 16px;",
content: "Node",
defaultKind: "Node",
classes: "enyo-node",
components: [ {
name: "icon",
kind: "Image",
showing: !1
}, {
kind: "Control",
name: "caption",
Xtag: "span",
style: "display: inline-block; padding: 4px;",
allowHtml: !0
}, {
kind: "Control",
name: "extra",
tag: "span",
allowHtml: !0
} ],
childClient: [ {
kind: "Control",
name: "box",
classes: "enyo-node-box",
Xstyle: "border: 1px solid orange;",
components: [ {
kind: "Control",
name: "client",
classes: "enyo-node-client",
Xstyle: "border: 1px solid lightblue;"
} ]
} ],
handlers: {
ondblclick: "dblclick"
},
events: {
onNodeTap: "nodeTap",
onNodeDblClick: "nodeDblClick",
onExpand: "nodeExpand",
onDestroyed: "nodeDestroyed"
},
create: function() {
this.inherited(arguments), this.selectedChanged(), this.iconChanged();
},
destroy: function() {
this.doDestroyed(), this.inherited(arguments);
},
initComponents: function() {
this.expandable && (this.kindComponents = this.kindComponents.concat(this.childClient)), this.inherited(arguments);
},
contentChanged: function() {
this.$.caption.setContent(this.content);
},
iconChanged: function() {
this.$.icon.setSrc(this.icon), this.$.icon.setShowing(Boolean(this.icon));
},
selectedChanged: function() {
this.addRemoveClass("enyo-selected", this.selected);
},
rendered: function() {
this.inherited(arguments), this.expandable && !this.expanded && this.quickCollapse();
},
addNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent(n);
this.$.client.render();
},
addTextNodes: function(e) {
this.destroyClientControls();
for (var t = 0, n; n = e[t]; t++) this.createComponent({
content: n
});
this.$.client.render();
},
tap: function(e, t) {
return this.onlyIconExpands ? t.target == this.$.icon.hasNode() ? this.toggleExpanded() : this.doNodeTap() : (this.toggleExpanded(), this.doNodeTap()), !0;
},
dblclick: function(e, t) {
return this.doNodeDblClick(), !0;
},
toggleExpanded: function() {
this.setExpanded(!this.expanded);
},
quickCollapse: function() {
this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "0");
var e = this.$.client.getBounds().height;
this.$.client.setBounds({
top: -e
});
},
_expand: function() {
this.addClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), this.$.client.setBounds({
top: 0
}), setTimeout(enyo.bind(this, function() {
this.expanded && (this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "auto"));
}), 225);
},
_collapse: function() {
this.removeClass("enyo-animate");
var e = this.$.client.getBounds().height;
this.$.box.setBounds({
height: e
}), setTimeout(enyo.bind(this, function() {
this.addClass("enyo-animate"), this.$.box.applyStyle("height", "0"), this.$.client.setBounds({
top: -e
});
}), 25);
},
expandedChanged: function(e) {
if (!this.expandable) this.expanded = !1; else {
var t = {
expanded: this.expanded
};
this.doExpand(t), t.wait || this.effectExpanded();
}
},
effectExpanded: function() {
this.$.client && (this.expanded ? this._expand() : this._collapse());
}
});

// ImageView.js

enyo.kind({
name: "enyo.ImageView",
kind: enyo.Scroller,
touchOverscroll: !1,
thumb: !1,
animate: !0,
verticalDragPropagation: !0,
horizontalDragPropagation: !0,
published: {
scale: "auto",
disableZoom: !1,
src: undefined
},
events: {
onZoom: ""
},
touch: !0,
preventDragPropagation: !1,
handlers: {
ondragstart: "dragPropagation"
},
components: [ {
name: "animator",
kind: "Animator",
onStep: "zoomAnimationStep",
onEnd: "zoomAnimationEnd"
}, {
name: "viewport",
style: "overflow:hidden;min-height:100%;min-width:100%;",
classes: "enyo-fit",
ongesturechange: "gestureTransform",
ongestureend: "saveState",
ontap: "singleTap",
ondblclick: "doubleClick",
onmousewheel: "mousewheel",
components: [ {
kind: "Image",
ondown: "down"
} ]
} ],
create: function() {
this.inherited(arguments), this.canTransform = enyo.dom.canTransform(), this.canTransform || this.$.image.applyStyle("position", "relative"), this.canAccelerate = enyo.dom.canAccelerate(), this.bufferImage = new Image, this.bufferImage.onload = enyo.bind(this, "imageLoaded"), this.bufferImage.onerror = enyo.bind(this, "imageError"), this.srcChanged(), this.getStrategy().setDragDuringGesture(!1);
},
down: function(e, t) {
t.preventDefault();
},
dragPropagation: function(e, t) {
var n = this.getStrategy().getScrollBounds(), r = n.top === 0 && t.dy > 0 || n.top >= n.maxTop - 2 && t.dy < 0, i = n.left === 0 && t.dx > 0 || n.left >= n.maxLeft - 2 && t.dx < 0;
return !(r && this.verticalDragPropagation || i && this.horizontalDragPropagation);
},
mousewheel: function(e, t) {
t.pageX |= t.clientX + t.target.scrollLeft, t.pageY |= t.clientY + t.target.scrollTop;
var n = (this.maxScale - this.minScale) / 10, r = this.scale;
if (t.wheelDelta > 0 || t.detail < 0) this.scale = this.limitScale(this.scale + n); else if (t.wheelDelta < 0 || t.detail > 0) this.scale = this.limitScale(this.scale - n);
return this.eventPt = this.calcEventLocation(t), this.transformImage(this.scale), r != this.scale && this.doZoom({
scale: this.scale
}), this.ratioX = this.ratioY = null, t.preventDefault(), !0;
},
srcChanged: function() {
this.src && this.src.length > 0 && this.bufferImage && this.src != this.bufferImage.src && (this.bufferImage.src = this.src);
},
imageLoaded: function(e) {
this.originalWidth = this.bufferImage.width, this.originalHeight = this.bufferImage.height, this.scaleChanged(), this.$.image.setSrc(this.bufferImage.src), enyo.dom.transformValue(this.getStrategy().$.client, "translate3d", "0px, 0px, 0");
},
resizeHandler: function() {
this.inherited(arguments), this.$.image.src && this.scaleChanged();
},
scaleChanged: function() {
var e = this.hasNode();
if (e) {
this.containerWidth = e.clientWidth, this.containerHeight = e.clientHeight;
var t = this.containerWidth / this.originalWidth, n = this.containerHeight / this.originalHeight;
this.minScale = Math.min(t, n), this.maxScale = this.minScale * 3 < 1 ? 1 : this.minScale * 3, this.scale == "auto" ? this.scale = this.minScale : this.scale == "width" ? this.scale = t : this.scale == "height" ? this.scale = n : (this.maxScale = Math.max(this.maxScale, this.scale), this.scale = this.limitScale(this.scale));
}
this.eventPt = this.calcEventLocation(), this.transformImage(this.scale);
},
imageError: function(e) {
enyo.error("Error loading image: " + this.src), this.bubble("onerror", e);
},
gestureTransform: function(e, t) {
this.eventPt = this.calcEventLocation(t), this.transformImage(this.limitScale(this.scale * t.scale));
},
calcEventLocation: function(e) {
var t = {
x: 0,
y: 0
};
if (e && this.hasNode()) {
var n = this.node.getBoundingClientRect();
t.x = Math.round(e.pageX - n.left - this.imageBounds.x), t.x = Math.max(0, Math.min(this.imageBounds.width, t.x)), t.y = Math.round(e.pageY - n.top - this.imageBounds.y), t.y = Math.max(0, Math.min(this.imageBounds.height, t.y));
}
return t;
},
transformImage: function(e) {
this.tapped = !1;
var t = this.imageBounds || this.innerImageBounds(e);
this.imageBounds = this.innerImageBounds(e), this.scale > this.minScale ? this.$.viewport.applyStyle("cursor", "move") : this.$.viewport.applyStyle("cursor", null), this.$.viewport.setBounds({
width: this.imageBounds.width + "px",
height: this.imageBounds.height + "px"
}), this.ratioX = this.ratioX || (this.eventPt.x + this.getScrollLeft()) / t.width, this.ratioY = this.ratioY || (this.eventPt.y + this.getScrollTop()) / t.height;
var n, r;
this.$.animator.ratioLock ? (n = this.$.animator.ratioLock.x * this.imageBounds.width - this.containerWidth / 2, r = this.$.animator.ratioLock.y * this.imageBounds.height - this.containerHeight / 2) : (n = this.ratioX * this.imageBounds.width - this.eventPt.x, r = this.ratioY * this.imageBounds.height - this.eventPt.y), n = Math.max(0, Math.min(this.imageBounds.width - this.containerWidth, n)), r = Math.max(0, Math.min(this.imageBounds.height - this.containerHeight, r));
if (this.canTransform) {
var i = {
scale: e
};
this.canAccelerate ? i = enyo.mixin({
translate3d: Math.round(this.imageBounds.left) + "px, " + Math.round(this.imageBounds.top) + "px, 0px"
}, i) : i = enyo.mixin({
translate: this.imageBounds.left + "px, " + this.imageBounds.top + "px"
}, i), enyo.dom.transform(this.$.image, i);
} else this.$.image.setBounds({
width: this.imageBounds.width + "px",
height: this.imageBounds.height + "px",
left: this.imageBounds.left + "px",
top: this.imageBounds.top + "px"
});
this.setScrollLeft(n), this.setScrollTop(r);
},
limitScale: function(e) {
return this.disableZoom ? e = this.scale : e > this.maxScale ? e = this.maxScale : e < this.minScale && (e = this.minScale), e;
},
innerImageBounds: function(e) {
var t = this.originalWidth * e, n = this.originalHeight * e, r = {
x: 0,
y: 0,
transX: 0,
transY: 0
};
return t < this.containerWidth && (r.x += (this.containerWidth - t) / 2), n < this.containerHeight && (r.y += (this.containerHeight - n) / 2), this.canTransform && (r.transX -= (this.originalWidth - t) / 2, r.transY -= (this.originalHeight - n) / 2), {
left: r.x + r.transX,
top: r.y + r.transY,
width: t,
height: n,
x: r.x,
y: r.y
};
},
saveState: function(e, t) {
var n = this.scale;
this.scale *= t.scale, this.scale = this.limitScale(this.scale), n != this.scale && this.doZoom({
scale: this.scale
}), this.ratioX = this.ratioY = null;
},
doubleClick: function(e, t) {
enyo.platform.ie == 8 && (this.tapped = !0, t.pageX = t.clientX + t.target.scrollLeft, t.pageY = t.clientY + t.target.scrollTop, this.singleTap(e, t), t.preventDefault());
},
singleTap: function(e, t) {
setTimeout(enyo.bind(this, function() {
this.tapped = !1;
}), 300), this.tapped ? (this.tapped = !1, this.smartZoom(e, t)) : this.tapped = !0;
},
smartZoom: function(e, t) {
var n = this.hasNode(), r = this.$.image.hasNode();
if (n && r && this.hasNode() && !this.disableZoom) {
var i = this.scale;
this.scale != this.minScale ? this.scale = this.minScale : this.scale = this.maxScale, this.eventPt = this.calcEventLocation(t);
if (this.animate) {
var s = {
x: (this.eventPt.x + this.getScrollLeft()) / this.imageBounds.width,
y: (this.eventPt.y + this.getScrollTop()) / this.imageBounds.height
};
this.$.animator.play({
duration: 350,
ratioLock: s,
baseScale: i,
deltaScale: this.scale - i
});
} else this.transformImage(this.scale), this.doZoom({
scale: this.scale
});
}
},
zoomAnimationStep: function(e, t) {
var n = this.$.animator.baseScale + this.$.animator.deltaScale * this.$.animator.value;
this.transformImage(n);
},
zoomAnimationEnd: function(e, t) {
this.doZoom({
scale: this.scale
}), this.$.animator.ratioLock = undefined;
}
});

// ImageCarousel.js

enyo.kind({
name: "enyo.ImageCarousel",
kind: enyo.Panels,
arrangerKind: "enyo.CarouselArranger",
defaultScale: "auto",
disableZoom: !1,
lowMemory: !1,
published: {
images: []
},
handlers: {
onTransitionStart: "transitionStart",
onTransitionFinish: "transitionFinish"
},
create: function() {
this.inherited(arguments), this.imageCount = this.images.length, this.images.length > 0 && (this.initContainers(), this.loadNearby());
},
initContainers: function() {
for (var e = 0; e < this.images.length; e++) this.$["container" + e] || (this.createComponent({
name: "container" + e,
style: "height:100%; width:100%;"
}), this.$["container" + e].render());
for (e = this.images.length; e < this.imageCount; e++) this.$["image" + e] && this.$["image" + e].destroy(), this.$["container" + e].destroy();
this.imageCount = this.images.length;
},
loadNearby: function() {
this.images.length > 0 && (this.loadImageView(this.index - 1), this.loadImageView(this.index), this.loadImageView(this.index + 1));
},
loadImageView: function(e) {
return this.wrap && (e = (e % this.images.length + this.images.length) % this.images.length), e >= 0 && e <= this.images.length - 1 && (this.$["image" + e] ? (this.$["image" + e].src != this.images[e] && this.$["image" + e].setSrc(this.images[e]), this.$["image" + e].setScale(this.defaultScale), this.$["image" + e].setDisableZoom(this.disableZoom)) : (this.$["container" + e].createComponent({
name: "image" + e,
kind: "ImageView",
scale: this.defaultScale,
disableZoom: this.disableZoom,
src: this.images[e],
verticalDragPropagation: !1,
style: "height:100%; width:100%;"
}, {
owner: this
}), this.$["image" + e].render())), this.$["image" + e];
},
setImages: function(e) {
this.setPropertyValue("images", e, "imagesChanged");
},
imagesChanged: function() {
this.initContainers(), this.loadNearby();
},
indexChanged: function() {
this.loadNearby(), this.lowMemory && this.cleanupMemory(), this.inherited(arguments);
},
transitionStart: function(e, t) {
if (t.fromIndex == t.toIndex) return !0;
},
transitionFinish: function(e, t) {
this.loadImageView(this.index - 1), this.loadImageView(this.index + 1), this.lowMemory && this.cleanupMemory();
},
getActiveImage: function() {
return this.getImageByIndex(this.index);
},
getImageByIndex: function(e) {
return this.$["image" + e] || this.loadImageView(e);
},
cleanupMemory: function() {
for (var e = 0; e < this.images.length; e++) (e < this.index - 1 || e > this.index + 1) && this.$["image" + e] && this.$["image" + e].destroy();
}
});

// Icon.js

enyo.kind({
name: "onyx.Icon",
published: {
src: "",
disabled: !1
},
classes: "onyx-icon",
create: function() {
this.inherited(arguments), this.src && this.srcChanged(), this.disabledChanged();
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
srcChanged: function() {
this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
}
});

// Button.js

enyo.kind({
name: "onyx.Button",
kind: "enyo.Button",
classes: "onyx-button enyo-unselectable"
});

// IconButton.js

enyo.kind({
name: "onyx.IconButton",
kind: "onyx.Icon",
published: {
active: !1
},
classes: "onyx-icon-button",
rendered: function() {
this.inherited(arguments), this.activeChanged();
},
tap: function() {
if (this.disabled) return !0;
this.setActive(!0);
},
activeChanged: function() {
this.bubble("onActivate");
}
});

// Checkbox.js

enyo.kind({
name: "onyx.Checkbox",
classes: "onyx-checkbox",
kind: enyo.Checkbox,
tag: "div",
handlers: {
ondown: "downHandler",
onclick: ""
},
downHandler: function(e, t) {
return this.disabled || (this.setChecked(!this.getChecked()), this.bubble("onchange")), !0;
},
tap: function(e, t) {
return !this.disabled;
}
});

// Drawer.js

enyo.kind({
name: "onyx.Drawer",
published: {
open: !0,
orient: "v",
animated: !0
},
style: "overflow: hidden; position: relative;",
tools: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorEnd"
}, {
name: "client",
style: "position: relative;",
classes: "enyo-border-box"
} ],
create: function() {
this.inherited(arguments), this.animatedChanged(), this.openChanged();
},
initComponents: function() {
this.createChrome(this.tools), this.inherited(arguments);
},
animatedChanged: function() {
!this.animated && this.hasNode() && this.$.animator.isAnimating() && (this.$.animator.stop(), this.animatorEnd());
},
openChanged: function() {
this.$.client.show();
if (this.hasNode()) if (this.$.animator.isAnimating()) this.$.animator.reverse(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left";
this.applyStyle(t, null);
var r = this.hasNode()[e ? "scrollHeight" : "scrollWidth"];
this.animated ? this.$.animator.play({
startValue: this.open ? 0 : r,
endValue: this.open ? r : 0,
dimension: t,
position: n
}) : this.animatorEnd();
} else this.$.client.setShowing(this.open);
},
animatorStep: function(e) {
if (this.hasNode()) {
var t = e.dimension;
this.node.style[t] = this.domStyles[t] = e.value + "px";
}
var n = this.$.client.hasNode();
if (n) {
var r = e.position, i = this.open ? e.endValue : e.startValue;
n.style[r] = this.$.client.domStyles[r] = e.value - i + "px";
}
this.container && this.container.resized();
},
animatorEnd: function() {
if (!this.open) this.$.client.hide(); else {
var e = this.orient == "v", t = e ? "height" : "width", n = e ? "top" : "left", r = this.$.client.hasNode();
r && (r.style[n] = this.$.client.domStyles[n] = null), this.node && (this.node.style[t] = this.domStyles[t] = null);
}
this.container && this.container.resized();
}
});

// Grabber.js

enyo.kind({
name: "onyx.Grabber",
classes: "onyx-grabber"
});

// Groupbox.js

enyo.kind({
name: "onyx.Groupbox",
classes: "onyx-groupbox"
}), enyo.kind({
name: "onyx.GroupboxHeader",
classes: "onyx-groupbox-header"
});

// Input.js

enyo.kind({
name: "onyx.Input",
kind: "enyo.Input",
classes: "onyx-input"
});

// Popup.js

enyo.kind({
name: "onyx.Popup",
kind: "Popup",
classes: "onyx-popup",
published: {
scrimWhenModal: !0,
scrim: !1,
scrimClassName: ""
},
statics: {
count: 0
},
defaultZ: 120,
showingChanged: function() {
this.showing ? (onyx.Popup.count++, this.applyZIndex()) : onyx.Popup.count > 0 && onyx.Popup.count--, this.showHideScrim(this.showing), this.inherited(arguments);
},
showHideScrim: function(e) {
if (this.floating && (this.scrim || this.modal && this.scrimWhenModal)) {
var t = this.getScrim();
if (e) {
var n = this.getScrimZIndex();
this._scrimZ = n, t.showAtZIndex(n);
} else t.hideAtZIndex(this._scrimZ);
enyo.call(t, "addRemoveClass", [ this.scrimClassName, t.showing ]);
}
},
getScrimZIndex: function() {
return this.findZIndex() - 1;
},
getScrim: function() {
return this.modal && this.scrimWhenModal && !this.scrim ? onyx.scrimTransparent.make() : onyx.scrim.make();
},
applyZIndex: function() {
this._zIndex = onyx.Popup.count * 2 + this.findZIndex() + 1, this.applyStyle("z-index", this._zIndex);
},
findZIndex: function() {
var e = this.defaultZ;
return this._zIndex ? e = this._zIndex : this.hasNode() && (e = Number(enyo.dom.getComputedStyleValue(this.node, "z-index")) || e), this._zIndex = e;
}
});

// TextArea.js

enyo.kind({
name: "onyx.TextArea",
kind: "enyo.TextArea",
classes: "onyx-textarea"
});

// RichText.js

enyo.kind({
name: "onyx.RichText",
kind: "enyo.RichText",
classes: "onyx-richtext"
});

// InputDecorator.js

enyo.kind({
name: "onyx.InputDecorator",
kind: "enyo.ToolDecorator",
tag: "label",
classes: "onyx-input-decorator",
published: {
alwaysLooksFocused: !1
},
handlers: {
onDisabledChange: "disabledChange",
onfocus: "receiveFocus",
onblur: "receiveBlur"
},
create: function() {
this.inherited(arguments), this.updateFocus(!1);
},
alwaysLooksFocusedChanged: function(e) {
this.updateFocus(this.focus);
},
updateFocus: function(e) {
this.focused = e, this.addRemoveClass("onyx-focused", this.alwaysLooksFocused || this.focused);
},
receiveFocus: function() {
this.updateFocus(!0);
},
receiveBlur: function() {
this.updateFocus(!1);
},
disabledChange: function(e, t) {
this.addRemoveClass("onyx-disabled", t.originator.disabled);
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// MenuDecorator.js

enyo.kind({
name: "onyx.MenuDecorator",
kind: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator enyo-unselectable",
handlers: {
onActivate: "activated",
onHide: "menuHidden"
},
activated: function(e, t) {
this.requestHideTooltip(), t.originator.active && (this.menuActive = !0, this.activator = t.originator, this.activator.addClass("active"), this.requestShowMenu());
},
requestShowMenu: function() {
this.waterfallDown("onRequestShowMenu", {
activator: this.activator
});
},
requestHideMenu: function() {
this.waterfallDown("onRequestHideMenu");
},
menuHidden: function() {
this.menuActive = !1, this.activator && (this.activator.setActive(!1), this.activator.removeClass("active"));
},
enter: function(e) {
this.menuActive || this.inherited(arguments);
},
leave: function(e, t) {
this.menuActive || this.inherited(arguments);
}
});

// Menu.js

enyo.kind({
name: "onyx.Menu",
kind: "onyx.Popup",
modal: !0,
defaultKind: "onyx.MenuItem",
classes: "onyx-menu",
published: {
maxHeight: 200,
scrolling: !0
},
handlers: {
onActivate: "itemActivated",
onRequestShowMenu: "requestMenuShow",
onRequestHideMenu: "requestHide"
},
childComponents: [ {
name: "client",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy"
} ],
showOnTop: !1,
scrollerName: "client",
create: function() {
this.inherited(arguments), this.maxHeightChanged();
},
initComponents: function() {
this.scrolling ? this.createComponents(this.childComponents, {
isChrome: !0
}) : enyo.nop, this.inherited(arguments);
},
getScroller: function() {
return this.$[this.scrollerName];
},
maxHeightChanged: function() {
this.scrolling ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop;
},
itemActivated: function(e, t) {
return t.originator.setActive(!1), !0;
},
showingChanged: function() {
this.inherited(arguments), this.scrolling ? this.getScroller().setShowing(this.showing) : enyo.nop, this.adjustPosition(!0);
},
requestMenuShow: function(e, t) {
if (this.floating) {
var n = t.activator.hasNode();
if (n) {
var r = this.activatorOffset = this.getPageOffset(n);
this.applyPosition({
top: r.top + (this.showOnTop ? 0 : r.height),
left: r.left,
width: r.width
});
}
}
return this.show(), !0;
},
applyPosition: function(e) {
var t = "";
for (n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
getPageOffset: function(e) {
var t = e.getBoundingClientRect(), n = window.pageYOffset === undefined ? document.documentElement.scrollTop : window.pageYOffset, r = window.pageXOffset === undefined ? document.documentElement.scrollLeft : window.pageXOffset, i = t.height === undefined ? t.bottom - t.top : t.height, s = t.width === undefined ? t.right - t.left : t.width;
return {
top: t.top + n,
left: t.left + r,
height: i,
width: s
};
},
adjustPosition: function() {
if (this.showing && this.hasNode()) {
this.scrolling && !this.showOnTop ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop, this.removeClass("onyx-menu-up"), this.floating ? enyo.noop : this.applyPosition({
left: "auto"
});
var e = this.node.getBoundingClientRect(), t = e.height === undefined ? e.bottom - e.top : e.height, n = window.innerHeight === undefined ? document.documentElement.clientHeight : window.innerHeight, r = window.innerWidth === undefined ? document.documentElement.clientWidth : window.innerWidth;
this.menuUp = e.top + t > n && n - e.bottom < e.top - t, this.addRemoveClass("onyx-menu-up", this.menuUp);
if (this.floating) {
var i = this.activatorOffset;
this.menuUp ? this.applyPosition({
top: i.top - t + (this.showOnTop ? i.height : 0),
bottom: "auto"
}) : e.top < i.top && i.top + (this.showOnTop ? 0 : i.height) + t < n && this.applyPosition({
top: i.top + (this.showOnTop ? 0 : i.height),
bottom: "auto"
});
}
e.right > r && (this.floating ? this.applyPosition({
left: r - e.width
}) : this.applyPosition({
left: -(e.right - r)
})), e.left < 0 && (this.floating ? this.applyPosition({
left: 0,
right: "auto"
}) : this.getComputedStyleValue("right") == "auto" ? this.applyPosition({
left: -e.left
}) : this.applyPosition({
right: e.left
}));
if (this.scrolling && !this.showOnTop) {
e = this.node.getBoundingClientRect();
var s;
this.menuUp ? s = this.maxHeight < e.bottom ? this.maxHeight : e.bottom : s = e.top + this.maxHeight < n ? this.maxHeight : n - e.top, this.getScroller().setMaxHeight(s + "px");
}
}
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
},
requestHide: function() {
this.setShowing(!1);
}
});

// MenuItem.js

enyo.kind({
name: "onyx.MenuItem",
kind: "enyo.Button",
events: {
onSelect: ""
},
classes: "onyx-menu-item",
tag: "div",
tap: function(e) {
this.inherited(arguments), this.bubble("onRequestHideMenu"), this.doSelect({
selected: this,
content: this.content
});
}
});

// PickerDecorator.js

enyo.kind({
name: "onyx.PickerDecorator",
kind: "onyx.MenuDecorator",
classes: "onyx-picker-decorator",
defaultKind: "onyx.PickerButton",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.waterfallDown("onChange", t);
}
});

// PickerButton.js

enyo.kind({
name: "onyx.PickerButton",
kind: "onyx.Button",
handlers: {
onChange: "change"
},
change: function(e, t) {
this.setContent(t.content);
}
});

// Picker.js

enyo.kind({
name: "onyx.Picker",
kind: "onyx.Menu",
classes: "onyx-picker enyo-unselectable",
published: {
selected: null
},
events: {
onChange: ""
},
floating: !0,
showOnTop: !0,
initComponents: function() {
this.setScrolling(!0), this.inherited(arguments);
},
showingChanged: function() {
this.getScroller().setShowing(this.showing), this.inherited(arguments), this.showing && this.selected && this.scrollToSelected();
},
scrollToSelected: function() {
this.getScroller().scrollToControl(this.selected, !this.menuUp);
},
itemActivated: function(e, t) {
return this.processActivatedItem(t.originator), this.inherited(arguments);
},
processActivatedItem: function(e) {
e.active && this.setSelected(e);
},
selectedChanged: function(e) {
e && e.removeClass("selected"), this.selected && (this.selected.addClass("selected"), this.doChange({
selected: this.selected,
content: this.selected.content
}));
},
resizeHandler: function() {
this.inherited(arguments), this.adjustPosition();
}
});

// FlyweightPicker.js

enyo.kind({
name: "onyx.FlyweightPicker",
kind: "onyx.Picker",
classes: "onyx-flyweight-picker",
published: {
count: 0
},
events: {
onSetupItem: "",
onSelect: ""
},
handlers: {
onSelect: "itemSelect"
},
components: [ {
name: "scroller",
kind: "enyo.Scroller",
strategyKind: "TouchScrollStrategy",
components: [ {
name: "flyweight",
kind: "FlyweightRepeater",
ontap: "itemTap"
} ]
} ],
scrollerName: "scroller",
initComponents: function() {
this.controlParentName = "flyweight", this.inherited(arguments);
},
create: function() {
this.inherited(arguments), this.countChanged();
},
rendered: function() {
this.inherited(arguments), this.selectedChanged();
},
scrollToSelected: function() {
var e = this.$.flyweight.fetchRowNode(this.selected);
this.getScroller().scrollToNode(e, !this.menuUp);
},
countChanged: function() {
this.$.flyweight.count = this.count;
},
processActivatedItem: function(e) {
this.item = e;
},
selectedChanged: function(e) {
if (!this.item) return;
e !== undefined && (this.item.removeClass("selected"), this.$.flyweight.renderRow(e)), this.item.addClass("selected"), this.$.flyweight.renderRow(this.selected), this.item.removeClass("selected");
var t = this.$.flyweight.fetchRowNode(this.selected);
this.doChange({
selected: this.selected,
content: t && t.textContent || this.item.content
});
},
itemTap: function(e, t) {
this.setSelected(t.rowIndex), this.doSelect({
selected: this.item,
content: this.item.content
});
},
itemSelect: function(e, t) {
if (t.originator != this) return !0;
}
});

// DatePicker.js

enyo.kind({
name: "onyx.DatePicker",
classes: "onyx-toolbar-inline",
published: {
disabled: !1,
locale: null,
dayHidden: !1,
monthHidden: !1,
yearHidden: !1,
minYear: 1900,
maxYear: 2099,
value: null
},
events: {
onSelect: ""
},
create: function() {
this.inherited(arguments);
if (!this.locale) try {
this.locale = enyo.g11n.currentLocale().getLocale();
} catch (e) {
this.locale = "en_us";
}
this.initDefaults();
},
initDefaults: function() {
var e;
try {
this._tf = new enyo.g11n.Fmts({
locale: this.locale
}), e = this._tf.getMonthFields();
} catch (t) {
e = [ "Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC" ];
}
this.setupPickers(this._tf ? this._tf.getDateFieldOrder() : "mdy"), this.dayHiddenChanged(), this.monthHiddenChanged(), this.yearHiddenChanged();
var n = this.value = this.value || new Date;
for (var r = 0, i; i = e[r]; r++) this.$.monthPicker.createComponent({
content: i,
value: r,
active: r == n.getMonth()
});
var s = n.getFullYear();
this.$.yearPicker.setSelected(s - this.minYear), this.$.year.setContent(s);
for (r = 1; r <= this.monthLength(n.getYear(), n.getMonth()); r++) this.$.dayPicker.createComponent({
content: r,
value: r,
active: r == n.getDate()
});
},
monthLength: function(e, t) {
return 32 - (new Date(e, t, 32)).getDate();
},
setupYear: function(e, t) {
this.$.year.setContent(this.minYear + t.index);
},
setupPickers: function(e) {
var t = e.split(""), n, r, i;
for (r = 0, i = t.length; r < i; r++) {
n = t[r];
switch (n) {
case "d":
this.createDay();
break;
case "m":
this.createMonth();
break;
case "y":
this.createYear();
break;
default:
}
}
},
createYear: function() {
var e = this.maxYear - this.minYear;
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateYear",
components: [ {
classes: "onyx-datepicker-year",
name: "yearPickerButton",
disabled: this.disabled
}, {
name: "yearPicker",
kind: "onyx.FlyweightPicker",
count: ++e,
onSetupItem: "setupYear",
components: [ {
name: "year"
} ]
} ]
});
},
createMonth: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateMonth",
components: [ {
classes: "onyx-datepicker-month",
name: "monthPickerButton",
disabled: this.disabled
}, {
name: "monthPicker",
kind: "onyx.Picker"
} ]
});
},
createDay: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateDay",
components: [ {
classes: "onyx-datepicker-day",
name: "dayPickerButton",
disabled: this.disabled
}, {
name: "dayPicker",
kind: "onyx.Picker"
} ]
});
},
localeChanged: function() {
this.refresh();
},
dayHiddenChanged: function() {
this.$.dayPicker.getParent().setShowing(this.dayHidden ? !1 : !0);
},
monthHiddenChanged: function() {
this.$.monthPicker.getParent().setShowing(this.monthHidden ? !1 : !0);
},
yearHiddenChanged: function() {
this.$.yearPicker.getParent().setShowing(this.yearHidden ? !1 : !0);
},
minYearChanged: function() {
this.refresh();
},
maxYearChanged: function() {
this.refresh();
},
valueChanged: function() {
this.refresh();
},
disabledChanged: function() {
this.yearPickerButton.setDisabled(this.disabled), this.monthPickerButton.setDisabled(this.disabled), this.dayPickerButton.setDisabled(this.disabled);
},
updateDay: function(e, t) {
var n = this.calcDate(this.value.getFullYear(), this.value.getMonth(), t.selected.value);
return this.doSelect({
name: this.name,
value: n
}), this.setValue(n), !0;
},
updateMonth: function(e, t) {
var n = this.calcDate(this.value.getFullYear(), t.selected.value, this.value.getDate());
return this.doSelect({
name: this.name,
value: n
}), this.setValue(n), !0;
},
updateYear: function(e, t) {
if (t.originator.selected != -1) {
var n = this.calcDate(this.minYear + t.originator.selected, this.value.getMonth(), this.value.getDate());
this.doSelect({
name: this.name,
value: n
}), this.setValue(n);
}
return !0;
},
calcDate: function(e, t, n) {
return new Date(e, t, n, this.value.getHours(), this.value.getMinutes(), this.value.getSeconds(), this.value.getMilliseconds());
},
refresh: function() {
this.destroyClientControls(), this.initDefaults(), this.render();
}
});

// TimePicker.js

enyo.kind({
name: "onyx.TimePicker",
classes: "onyx-toolbar-inline",
published: {
disabled: !1,
locale: null,
is24HrMode: null,
value: null
},
events: {
onSelect: ""
},
create: function() {
this.inherited(arguments);
if (!this.locale) try {
this.locale = enyo.g11n.currentLocale().getLocale();
} catch (e) {
this.locale = "en_us";
}
this.initDefaults();
},
initDefaults: function() {
var e, t;
try {
this._tf = new enyo.g11n.Fmts({
locale: this.locale
}), e = this._tf.getAmCaption(), t = this._tf.getPmCaption(), this.is24HrMode == null && (this.is24HrMode = !this._tf.isAmPm());
} catch (n) {
e = "AM", t = "PM", this.is24HrMode = !1;
}
this.setupPickers(this._tf ? this._tf.getTimeFieldOrder() : "hma");
var r = this.value = this.value || new Date, i;
if (!this.is24HrMode) {
var s = r.getHours();
s = s === 0 ? 12 : s;
for (i = 1; i <= 12; i++) this.$.hourPicker.createComponent({
content: i,
value: i,
active: i == (s > 12 ? s % 12 : s)
});
} else for (i = 0; i < 24; i++) this.$.hourPicker.createComponent({
content: i,
value: i,
active: i == r.getHours()
});
for (i = 0; i <= 59; i++) this.$.minutePicker.createComponent({
content: i < 10 ? "0" + i : i,
value: i,
active: i == r.getMinutes()
});
r.getHours() >= 12 ? this.$.ampmPicker.createComponents([ {
content: e
}, {
content: t,
active: !0
} ]) : this.$.ampmPicker.createComponents([ {
content: e,
active: !0
}, {
content: t
} ]), this.$.ampmPicker.getParent().setShowing(!this.is24HrMode);
},
setupPickers: function(e) {
var t = e.split(""), n, r, i;
for (r = 0, i = t.length; r < i; r++) {
n = t[r];
switch (n) {
case "h":
this.createHour();
break;
case "m":
this.createMinute();
break;
case "a":
this.createAmPm();
break;
default:
}
}
},
createHour: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateHour",
components: [ {
classes: "onyx-timepicker-hour",
name: "hourPickerButton",
disabled: this.disabled
}, {
name: "hourPicker",
kind: "onyx.Picker"
} ]
});
},
createMinute: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateMinute",
components: [ {
classes: "onyx-timepicker-minute",
name: "minutePickerButton",
disabled: this.disabled
}, {
name: "minutePicker",
kind: "onyx.Picker"
} ]
});
},
createAmPm: function() {
this.createComponent({
kind: "onyx.PickerDecorator",
onSelect: "updateAmPm",
components: [ {
classes: "onyx-timepicker-ampm",
name: "ampmPickerButton",
disabled: this.disabled
}, {
name: "ampmPicker",
kind: "onyx.Picker"
} ]
});
},
disabledChanged: function() {
this.$.hourPickerButton.setDisabled(this.disabled), this.$.minutePickerButton.setDisabled(this.disabled), this.$.ampmPickerButton.setDisabled(this.disabled);
},
localeChanged: function() {
this.is24HrMode = null, this.refresh();
},
is24HrModeChanged: function() {
this.refresh();
},
valueChanged: function() {
this.refresh();
},
updateHour: function(e, t) {
var n = t.selected.value;
if (!this.is24HrMode) {
var r = this.$.ampmPicker.getParent().controlAtIndex(0).content;
n = n + (n == 12 ? -12 : 0) + (this.isAm(r) ? 0 : 12);
}
return this.value = this.calcTime(n, this.value.getMinutes()), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
updateMinute: function(e, t) {
return this.value = this.calcTime(this.value.getHours(), t.selected.value), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
updateAmPm: function(e, t) {
var n = this.value.getHours();
return this.is24HrMode || (n += n > 11 ? this.isAm(t.content) ? -12 : 0 : this.isAm(t.content) ? 0 : 12), this.value = this.calcTime(n, this.value.getMinutes()), this.doSelect({
name: this.name,
value: this.value
}), !0;
},
calcTime: function(e, t) {
return new Date(this.value.getFullYear(), this.value.getMonth(), this.value.getDate(), e, t, this.value.getSeconds(), this.value.getMilliseconds());
},
isAm: function(e) {
var t, n, r;
try {
t = this._tf.getAmCaption(), n = this._tf.getPmCaption();
} catch (i) {
t = "AM", n = "PM";
}
return e == t ? !0 : !1;
},
refresh: function() {
this.destroyClientControls(), this.initDefaults(), this.render();
}
});

// RadioButton.js

enyo.kind({
name: "onyx.RadioButton",
kind: "Button",
classes: "onyx-radiobutton"
});

// RadioGroup.js

enyo.kind({
name: "onyx.RadioGroup",
kind: "Group",
defaultKind: "onyx.RadioButton",
highlander: !0
});

// ToggleButton.js

enyo.kind({
name: "onyx.ToggleButton",
classes: "onyx-toggle-button",
published: {
active: !1,
value: !1,
onContent: "On",
offContent: "Off",
disabled: !1
},
events: {
onChange: ""
},
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
components: [ {
name: "contentOn",
classes: "onyx-toggle-content on"
}, {
name: "contentOff",
classes: "onyx-toggle-content off"
}, {
classes: "onyx-toggle-button-knob"
} ],
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active), this.onContentChanged(), this.offContentChanged(), this.disabledChanged();
},
rendered: function() {
this.inherited(arguments), this.updateVisualState();
},
updateVisualState: function() {
this.addRemoveClass("off", !this.value), this.$.contentOn.setShowing(this.value), this.$.contentOff.setShowing(!this.value), this.setActive(this.value);
},
valueChanged: function() {
this.updateVisualState(), this.doChange({
value: this.value
});
},
activeChanged: function() {
this.setValue(this.active), this.bubble("onActivate");
},
onContentChanged: function() {
this.$.contentOn.setContent(this.onContent || ""), this.$.contentOn.addRemoveClass("empty", !this.onContent);
},
offContentChanged: function() {
this.$.contentOff.setContent(this.offContent || ""), this.$.contentOff.addRemoveClass("empty", !this.onContent);
},
disabledChanged: function() {
this.addRemoveClass("disabled", this.disabled);
},
updateValue: function(e) {
this.disabled || this.setValue(e);
},
tap: function() {
this.updateValue(!this.value);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, this.dragged = !1, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = t.dx;
return Math.abs(n) > 10 && (this.updateValue(n > 0), this.dragged = !0), !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, this.dragged && t.preventTap();
}
});

// ToggleIconButton.js

enyo.kind({
name: "onyx.ToggleIconButton",
kind: "onyx.Icon",
published: {
active: !1,
value: !1
},
events: {
onChange: ""
},
classes: "onyx-icon-button onyx-icon-toggle",
activeChanged: function() {
this.addRemoveClass("active", this.value), this.bubble("onActivate");
},
updateValue: function(e) {
this.disabled || (this.setValue(e), this.doChange({
value: this.value
}));
},
tap: function() {
this.updateValue(!this.value);
},
valueChanged: function() {
this.setActive(this.value);
},
create: function() {
this.inherited(arguments), this.value = Boolean(this.value || this.active);
},
rendered: function() {
this.inherited(arguments), this.valueChanged(), this.removeClass("onyx-icon");
}
});

// Toolbar.js

enyo.kind({
name: "onyx.Toolbar",
classes: "onyx onyx-toolbar onyx-toolbar-inline",
create: function() {
this.inherited(arguments), this.hasClass("onyx-menu-toolbar") && enyo.platform.android >= 4 && this.applyStyle("position", "static");
}
});

// Tooltip.js

enyo.kind({
name: "onyx.Tooltip",
kind: "onyx.Popup",
classes: "onyx-tooltip below left-arrow",
autoDismiss: !1,
showDelay: 500,
defaultLeft: -6,
handlers: {
onRequestShowTooltip: "requestShow",
onRequestHideTooltip: "requestHide"
},
requestShow: function() {
return this.showJob = setTimeout(enyo.bind(this, "show"), this.showDelay), !0;
},
cancelShow: function() {
clearTimeout(this.showJob);
},
requestHide: function() {
return this.cancelShow(), this.inherited(arguments);
},
showingChanged: function() {
this.cancelShow(), this.adjustPosition(!0), this.inherited(arguments);
},
applyPosition: function(e) {
var t = "";
for (var n in e) t += n + ":" + e[n] + (isNaN(e[n]) ? "; " : "px; ");
this.addStyles(t);
},
adjustPosition: function(e) {
if (this.showing && this.hasNode()) {
var t = this.node.getBoundingClientRect();
t.top + t.height > window.innerHeight ? (this.addRemoveClass("below", !1), this.addRemoveClass("above", !0)) : (this.addRemoveClass("above", !1), this.addRemoveClass("below", !0)), t.left + t.width > window.innerWidth && (this.applyPosition({
"margin-left": -t.width,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !1), this.addRemoveClass("right-arrow", !0));
}
},
resizeHandler: function() {
this.applyPosition({
"margin-left": this.defaultLeft,
bottom: "auto"
}), this.addRemoveClass("left-arrow", !0), this.addRemoveClass("right-arrow", !1), this.adjustPosition(!0), this.inherited(arguments);
}
});

// TooltipDecorator.js

enyo.kind({
name: "onyx.TooltipDecorator",
defaultKind: "onyx.Button",
classes: "onyx-popup-decorator",
handlers: {
onenter: "enter",
onleave: "leave"
},
enter: function() {
this.requestShowTooltip();
},
leave: function() {
this.requestHideTooltip();
},
tap: function() {
this.requestHideTooltip();
},
requestShowTooltip: function() {
this.waterfallDown("onRequestShowTooltip");
},
requestHideTooltip: function() {
this.waterfallDown("onRequestHideTooltip");
}
});

// ProgressBar.js

enyo.kind({
name: "onyx.ProgressBar",
classes: "onyx-progress-bar",
published: {
progress: 0,
min: 0,
max: 100,
barClasses: "",
showStripes: !0,
animateStripes: !0
},
events: {
onAnimateProgressFinish: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar"
} ],
create: function() {
this.inherited(arguments), this.progressChanged(), this.barClassesChanged(), this.showStripesChanged(), this.animateStripesChanged();
},
barClassesChanged: function(e) {
this.$.bar.removeClass(e), this.$.bar.addClass(this.barClasses);
},
showStripesChanged: function() {
this.$.bar.addRemoveClass("striped", this.showStripes);
},
animateStripesChanged: function() {
this.$.bar.addRemoveClass("animated", this.animateStripes);
},
progressChanged: function() {
this.progress = this.clampValue(this.min, this.max, this.progress);
var e = this.calcPercent(this.progress);
this.updateBarPosition(e);
},
clampValue: function(e, t, n) {
return Math.max(e, Math.min(n, t));
},
calcRatio: function(e) {
return (e - this.min) / (this.max - this.min);
},
calcPercent: function(e) {
return this.calcRatio(e) * 100;
},
updateBarPosition: function(e) {
this.$.bar.applyStyle("width", e + "%");
},
animateProgressTo: function(e) {
this.$.progressAnimator.play({
startValue: this.progress,
endValue: e,
node: this.hasNode()
});
},
progressAnimatorStep: function(e) {
return this.setProgress(e.value), !0;
},
progressAnimatorComplete: function(e) {
return this.doAnimateProgressFinish(e), !0;
}
});

// ProgressButton.js

enyo.kind({
name: "onyx.ProgressButton",
kind: "onyx.ProgressBar",
classes: "onyx-progress-button",
events: {
onCancel: ""
},
components: [ {
name: "progressAnimator",
kind: "Animator",
onStep: "progressAnimatorStep",
onEnd: "progressAnimatorComplete"
}, {
name: "bar",
classes: "onyx-progress-bar-bar onyx-progress-button-bar"
}, {
name: "client",
classes: "onyx-progress-button-client"
}, {
kind: "onyx.Icon",
src: "$lib/onyx/images/progress-button-cancel.png",
classes: "onyx-progress-button-icon",
ontap: "cancelTap"
} ],
cancelTap: function() {
this.doCancel();
}
});

// Scrim.js

enyo.kind({
name: "onyx.Scrim",
showing: !1,
classes: "onyx-scrim enyo-fit",
floating: !1,
create: function() {
this.inherited(arguments), this.zStack = [], this.floating && this.setParent(enyo.floatingLayer);
},
showingChanged: function() {
this.floating && this.showing && !this.hasNode() && this.render(), this.inherited(arguments);
},
addZIndex: function(e) {
enyo.indexOf(e, this.zStack) < 0 && this.zStack.push(e);
},
removeZIndex: function(e) {
enyo.remove(e, this.zStack);
},
showAtZIndex: function(e) {
this.addZIndex(e), e !== undefined && this.setZIndex(e), this.show();
},
hideAtZIndex: function(e) {
this.removeZIndex(e);
if (!this.zStack.length) this.hide(); else {
var t = this.zStack[this.zStack.length - 1];
this.setZIndex(t);
}
},
setZIndex: function(e) {
this.zIndex = e, this.applyStyle("z-index", e);
},
make: function() {
return this;
}
}), enyo.kind({
name: "onyx.scrimSingleton",
kind: null,
constructor: function(e, t) {
this.instanceName = e, enyo.setObject(this.instanceName, this), this.props = t || {};
},
make: function() {
var e = new onyx.Scrim(this.props);
return enyo.setObject(this.instanceName, e), e;
},
showAtZIndex: function(e) {
var t = this.make();
t.showAtZIndex(e);
},
hideAtZIndex: enyo.nop,
show: function() {
var e = this.make();
e.show();
}
}), new onyx.scrimSingleton("onyx.scrim", {
floating: !0,
classes: "onyx-scrim-translucent"
}), new onyx.scrimSingleton("onyx.scrimTransparent", {
floating: !0,
classes: "onyx-scrim-transparent"
});

// Slider.js

enyo.kind({
name: "onyx.Slider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
value: 0,
lockBar: !0,
tappable: !0
},
events: {
onChange: "",
onChanging: "",
onAnimateFinish: ""
},
showStripes: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish"
},
moreComponents: [ {
kind: "Animator",
onStep: "animatorStep",
onEnd: "animatorComplete"
}, {
classes: "onyx-slider-taparea"
}, {
name: "knob",
classes: "onyx-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.valueChanged();
},
valueChanged: function() {
this.value = this.clampValue(this.min, this.max, this.value);
var e = this.calcPercent(this.value);
this.updateKnobPosition(e), this.lockBar && this.setProgress(this.value);
},
updateKnobPosition: function(e) {
this.$.knob.applyStyle("left", e + "%");
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
return this.setValue(n), this.doChanging({
value: this.value
}), !0;
}
},
dragfinish: function(e, t) {
return this.dragging = !1, t.preventTap(), this.doChange({
value: this.value
}), !0;
},
tap: function(e, t) {
if (this.tappable) {
var n = this.calcKnobPosition(t);
return this.tapped = !0, this.animateTo(n), !0;
}
},
animateTo: function(e) {
this.$.animator.play({
startValue: this.value,
endValue: e,
node: this.hasNode()
});
},
animatorStep: function(e) {
return this.setValue(e.value), !0;
},
animatorComplete: function(e) {
return this.tapped && (this.tapped = !1, this.doChange({
value: this.value
})), this.doAnimateFinish(e), !0;
}
});

// RangeSlider.js

enyo.kind({
name: "onyx.RangeSlider",
kind: "onyx.ProgressBar",
classes: "onyx-slider",
published: {
rangeMin: 0,
rangeMax: 100,
rangeStart: 0,
rangeEnd: 100,
increment: 0,
beginValue: 0,
endValue: 0
},
events: {
onChange: "",
onChanging: ""
},
showStripes: !1,
showLabels: !1,
handlers: {
ondragstart: "dragstart",
ondrag: "drag",
ondragfinish: "dragfinish",
ondown: "down"
},
moreComponents: [ {
name: "startKnob",
classes: "onyx-slider-knob"
}, {
name: "endKnob",
classes: "onyx-slider-knob onyx-range-slider-knob"
} ],
create: function() {
this.inherited(arguments), this.createComponents(this.moreComponents), this.initControls();
},
rendered: function() {
this.inherited(arguments);
var e = this.calcPercent(this.beginValue);
this.updateBarPosition(e);
},
initControls: function() {
this.$.bar.applyStyle("position", "relative"), this.refreshRangeSlider(), this.showLabels && (this.$.startKnob.createComponent({
name: "startLabel",
kind: "onyx.RangeSliderKnobLabel"
}), this.$.endKnob.createComponent({
name: "endLabel",
kind: "onyx.RangeSliderKnobLabel"
}));
},
refreshRangeSlider: function() {
this.beginValue = this.calcKnobPercent(this.rangeStart), this.endValue = this.calcKnobPercent(this.rangeEnd), this.beginValueChanged(), this.endValueChanged();
},
calcKnobRatio: function(e) {
return (e - this.rangeMin) / (this.rangeMax - this.rangeMin);
},
calcKnobPercent: function(e) {
return this.calcKnobRatio(e) * 100;
},
beginValueChanged: function(e) {
if (e === undefined) {
var t = this.calcPercent(this.beginValue);
this.updateKnobPosition(t, this.$.startKnob);
}
},
endValueChanged: function(e) {
if (e === undefined) {
var t = this.calcPercent(this.endValue);
this.updateKnobPosition(t, this.$.endKnob);
}
},
calcKnobPosition: function(e) {
var t = e.clientX - this.hasNode().getBoundingClientRect().left;
return t / this.getBounds().width * (this.max - this.min) + this.min;
},
updateKnobPosition: function(e, t) {
t.applyStyle("left", e + "%"), this.updateBarPosition();
},
updateBarPosition: function() {
if (this.$.startKnob !== undefined && this.$.endKnob !== undefined) {
var e = this.calcKnobPercent(this.rangeStart), t = this.calcKnobPercent(this.rangeEnd) - e;
this.$.bar.applyStyle("left", e + "%"), this.$.bar.applyStyle("width", t + "%");
}
},
calcIncrement: function(e) {
return Math.ceil(e / this.increment) * this.increment;
},
calcRangeRatio: function(e) {
return e / 100 * (this.rangeMax - this.rangeMin) + this.rangeMin - this.increment / 2;
},
swapZIndex: function(e) {
e === "startKnob" ? (this.$.startKnob.applyStyle("z-index", 1), this.$.endKnob.applyStyle("z-index", 0)) : e === "endKnob" && (this.$.startKnob.applyStyle("z-index", 0), this.$.endKnob.applyStyle("z-index", 1));
},
down: function(e, t) {
this.swapZIndex(e.name);
},
dragstart: function(e, t) {
if (t.horizontal) return t.preventDefault(), this.dragging = !0, !0;
},
drag: function(e, t) {
if (this.dragging) {
var n = this.calcKnobPosition(t);
if (e.name === "startKnob" && n >= 0) {
if (n <= this.endValue && t.xDirection === -1 || n <= this.endValue) {
this.setBeginValue(n);
var r = this.calcRangeRatio(this.beginValue), i = this.increment ? this.calcIncrement(r) : r, s = this.calcKnobPercent(i);
this.updateKnobPosition(s, this.$.startKnob), this.setRangeStart(i), this.doChanging({
value: i
});
}
} else if (e.name === "endKnob" && n <= 100) if (n >= this.beginValue && t.xDirection === 1 || n >= this.beginValue) {
this.setEndValue(n);
var r = this.calcRangeRatio(this.endValue), i = this.increment ? this.calcIncrement(r) : r, s = this.calcKnobPercent(i);
this.updateKnobPosition(s, this.$.endKnob), this.setRangeEnd(i), this.doChanging({
value: i
});
}
return !0;
}
},
dragfinish: function(e, t) {
this.dragging = !1, t.preventTap();
if (e.name === "startKnob") {
var n = this.calcRangeRatio(this.beginValue);
this.doChange({
value: n,
startChanged: !0
});
} else if (e.name === "endKnob") {
var n = this.calcRangeRatio(this.endValue);
this.doChange({
value: n,
startChanged: !1
});
}
return !0;
},
rangeMinChanged: function() {
this.refreshRangeSlider();
},
rangeMaxChanged: function() {
this.refreshRangeSlider();
},
rangeStartChanged: function() {
this.refreshRangeSlider();
},
rangeEndChanged: function() {
this.refreshRangeSlider();
},
setStartLabel: function(e) {
this.$.startKnob.waterfallDown("onSetLabel", e);
},
setEndLabel: function(e) {
this.$.endKnob.waterfallDown("onSetLabel", e);
}
}), enyo.kind({
name: "onyx.RangeSliderKnobLabel",
classes: "onyx-range-slider-label",
handlers: {
onSetLabel: "setLabel"
},
setLabel: function(e, t) {
this.setContent(t);
}
});

// Item.js

enyo.kind({
name: "onyx.Item",
classes: "onyx-item",
tapHighlight: !0,
handlers: {
onhold: "hold",
onrelease: "release"
},
hold: function(e, t) {
this.tapHighlight && onyx.Item.addFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
release: function(e, t) {
this.tapHighlight && onyx.Item.removeFlyweightClass(this.controlParent || this, "onyx-highlight", t);
},
statics: {
addFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r !== undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.setClassAttribute(e.getClassAttribute()) : e.addClass(t);
}), e.removeClass(t);
}
},
removeFlyweightClass: function(e, t, n, r) {
var i = n.flyweight;
if (i) {
var s = r !== undefined ? r : n.index;
i.performOnRow(s, function() {
e.hasClass(t) ? e.removeClass(t) : e.setClassAttribute(e.getClassAttribute());
});
}
}
}
});

// Spinner.js

enyo.kind({
name: "onyx.Spinner",
classes: "onyx-spinner",
stop: function() {
this.setShowing(!1);
},
start: function() {
this.setShowing(!0);
},
toggle: function() {
this.setShowing(!this.getShowing());
}
});

// MoreToolbar.js

enyo.kind({
name: "onyx.MoreToolbar",
classes: "onyx-toolbar onyx-more-toolbar",
menuClass: "",
movedClass: "",
layoutKind: "FittableColumnsLayout",
noStretch: !0,
handlers: {
onHide: "reflow"
},
published: {
clientLayoutKind: "FittableColumnsLayout"
},
tools: [ {
name: "client",
noStretch: !0,
fit: !0,
classes: "onyx-toolbar-inline"
}, {
name: "nard",
kind: "onyx.MenuDecorator",
showing: !1,
onActivate: "activated",
components: [ {
kind: "onyx.IconButton",
classes: "onyx-more-button"
}, {
name: "menu",
kind: "onyx.Menu",
scrolling: !1,
classes: "onyx-more-menu"
} ]
} ],
initComponents: function() {
this.menuClass && this.menuClass.length > 0 && !this.$.menu.hasClass(this.menuClass) && this.$.menu.addClass(this.menuClass), this.createChrome(this.tools), this.inherited(arguments), this.$.client.setLayoutKind(this.clientLayoutKind);
},
clientLayoutKindChanged: function() {
this.$.client.setLayoutKind(this.clientLayoutKind);
},
reflow: function() {
this.inherited(arguments), this.isContentOverflowing() ? (this.$.nard.show(), this.popItem() && this.reflow()) : this.tryPushItem() ? this.reflow() : this.$.menu.children.length || (this.$.nard.hide(), this.$.menu.hide());
},
activated: function(e, t) {
this.addRemoveClass("active", t.originator.active);
},
popItem: function() {
var e = this.findCollapsibleItem();
if (e) {
this.movedClass && this.movedClass.length > 0 && !e.hasClass(this.movedClass) && e.addClass(this.movedClass), this.$.menu.addChild(e, null);
var t = this.$.menu.hasNode();
return t && e.hasNode() && e.insertNodeInParent(t), !0;
}
},
pushItem: function() {
var e = this.$.menu.children, t = e[0];
if (t) {
this.movedClass && this.movedClass.length > 0 && t.hasClass(this.movedClass) && t.removeClass(this.movedClass), this.$.client.addChild(t);
var n = this.$.client.hasNode();
if (n && t.hasNode()) {
var r, i;
for (var s = 0; s < this.$.client.children.length; s++) {
var o = this.$.client.children[s];
if (o.toolbarIndex !== undefined && o.toolbarIndex != s) {
r = o, i = s;
break;
}
}
if (r && r.hasNode()) {
t.insertNodeInParent(n, r.node);
var u = this.$.client.children.pop();
this.$.client.children.splice(i, 0, u);
} else t.appendNodeToParent(n);
}
return !0;
}
},
tryPushItem: function() {
if (this.pushItem()) {
if (!this.isContentOverflowing()) return !0;
this.popItem();
}
},
isContentOverflowing: function() {
if (this.$.client.hasNode()) {
var e = this.$.client.children, t = e[e.length - 1].hasNode();
if (t) return this.$.client.reflow(), t.offsetLeft + t.offsetWidth > this.$.client.node.clientWidth;
}
},
findCollapsibleItem: function() {
var e = this.$.client.children;
for (var t = e.length - 1; c = e[t]; t--) {
if (!c.unmoveable) return c;
c.toolbarIndex === undefined && (c.toolbarIndex = t);
}
}
});

// src/tabs.js

enyo.kind({
name: "sugar_network.Tabs",
classes: "sugar-network-tabs",
published: {
index: 0
},
handlers: {
ontap: "_ontap"
},
getPanels: function() {
return this._panels.getPanels();
},
initComponents: function() {
var e = [];
for (var t in this.components) e.push({
content: this.components[t].label,
classes: "sugar-network-tabs-button",
_sugar_network_tabs_index: t
});
this.components = [ {
classes: "sugar-network-tabs-bar",
components: e
}, {
kind: "Panels",
classes: "sugar-network-tabs-panels",
draggable: !1,
components: this.components
} ], this.inherited(arguments), this._tabs = this.getControls()[0], this._panels = this.getControls()[1];
},
create: function() {
this.inherited(arguments), this.indexChanged();
},
reflow: function() {
var e = this.getBounds(), t = this._tabs.getBounds(), n = enyo.dom.calcBoxExtents(this._panels.hasNode(), "margin");
e.height -= 2, this._tabs.setBounds({
height: e.height
}), this._panels.setBounds({
top: e.top,
left: e.left + t.width,
width: e.width - t.width - n.left - n.right,
height: e.height - n.top - n.bottom
});
},
indexChanged: function(e) {
var t = this._tabs.getControls()[e];
t && t.addRemoveClass("selected", !1), this._tabs.getControls()[this.index].addRemoveClass("selected", !0), this._panels.setIndex(this.index);
},
_ontap: function(e, t) {
var n = t.originator._sugar_network_tabs_index;
if (n !== undefined) return this.setIndex(n), !0;
}
});

// src/arrangers.js

enyo.kind({
name: "sugar_network.StackArranger",
kind: "Arranger",
size: function() {
var e = this.container.getBounds(), t = this.container.getPanels();
for (var n in t) t[n].setBounds({
width: e.width,
height: "100%"
});
},
arrange: function(e, t) {
var n = this.container.getBounds(), r = 0;
this.arrangeControl(e[r++], {
left: 0,
opacity: 1
});
for (var i = t + 1; i < e.length; i++) this.arrangeControl(e[r++], {
left: n.width,
opacity: 0
});
for (var i = 0; i < t; i++) this.arrangeControl(e[r++], {
left: -n.width,
opacity: 0
});
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % this.container.getPanels().length);
return t[i].left - r[i].left;
}
}), enyo.kind({
name: "sugar_network.SidebarArranger",
kind: "Arranger",
constructor: function() {
this.inherited(arguments);
var e = this.container.getPanels();
this._bar = e[0], this._workspace = e[1], this._bar_width = null;
},
size: function() {
this._bar_width || (this._bar_width = this._bar.getBounds().width), this._bar.setBounds({
height: "100%"
}), this._workspace.setBounds({
width: this.containerBounds.width - this._bar_width,
height: "100%"
});
},
arrange: function(e, t) {
if (t == 0) this.arrangeControl(e[0], {
left: 0
}), this.arrangeControl(e[1], {
left: this._bar_width
}); else {
var n = this.container.grabberBounds.width || 0;
this.arrangeControl(e[0], {
left: n
}), this.arrangeControl(e[1], {
left: n - this._bar_width
});
}
},
calcArrangementDifference: function(e, t, n, r) {
var i = Math.abs(e % 2);
return t[i].left - r[i].left;
},
flowControl: function(e, t) {
this.inherited(arguments), this.container.realtimeFit && e === this._workspace && this._fit_workspace(t.left);
},
finish: function() {
this.inherited(arguments), !this.container.realtimeFit && this.containerBounds && this._fit_workspace(this.container.arrangement[1].left);
},
_fit_workspace: function(e) {
this._workspace.setBounds({
width: this.containerBounds.width - e
}), this._workspace.resized();
}
}), enyo.kind({
name: "sugar_network.LeftSidebarArranger",
kind: "sugar_network.SidebarArranger"
});

// src/table.js

enyo.kind({
name: "sugar_network.Table",
kind: "Scroller",
horizontal: "hidden",
cell: {},
cellBounds: {},
fit: !1,
client_classes: null,
published: {
count: 0,
screensPerPage: 1
},
events: {
onSelect: "",
onSetupCell: "",
onSelectCell: ""
},
handlers: {
ontap: "_ontap"
},
constructor: function() {
this.inherited(arguments), this._columns = 0, this._rows = 0, this._rows_per_page = 0, this._rendered_top = 0, this._rendered_bottom = 0, this._frozen_pos = null, this._initialized = !1, this._cached_pos = null, this._client_margin_top = 0;
},
initComponents: function() {
this.components = [ {
classes: this.client_classes,
components: [ {
style: "position: absolute",
pending_events: []
}, {
style: "position: absolute",
pending_events: []
} ]
} ].concat(this.components || []), typeof this.cellBounds == "string" && this.components.push({
classes: this.cellBounds
}), this.inherited(arguments);
var e = this.getClientControls();
typeof this.cellBounds == "string" && (this._cell_bounds = e[e.length - 1]), this._client = e[0];
},
countChanged: function() {
this.reset(this.count);
},
reset: function(e) {
this.count = e, this.reflow(!0);
},
renderSelection: function() {
var e = this._client.getClientControls();
for (var t, n = 0; t = e[n++]; ) {
if (!t.showing) continue;
var r = t.getClientControls();
for (var i, s = 0; i = r[s++]; ) i.showing && this.selectCell({
offset: i.offset,
cell: i
});
}
},
renderPending: function() {
var e = this._client.getClientControls();
for (var t, n = 0; t = e[n++]; ) {
if (!t.showing) continue;
for (var r in t.pending_events) {
var i = t.pending_events[r];
i && this.setupCell(i) && (i.cell.render(), delete t.pending_events[r]);
}
}
},
getOffsetAtPos: function(e) {
return Math.floor(e / this.cellBounds.height) * this._columns;
},
getPosAtOffset: function(e) {
return Math.floor(e / this._columns) * this.cellBounds.height;
},
scrollToOffset: function(e, t) {
var n = this.getScrollBounds(), r = this.getPosAtOffset(e), i;
t !== undefined ? (n.clientHeight = Math.max(0, n.clientHeight - this._client_margin_top), i = (r - n.clientHeight) * t, i = Math.max(r + this.cellBounds.height - n.clientHeight, Math.min(r, i))) : r > n.top ? i = Math.max(r + this._client_margin_top + this.cellBounds.height - n.clientHeight, n.top) : i = r, i = Math.min(n.maxTop, i), this.setScrollTop(i);
},
freeze: function(e) {
if (this._frozen_pos) return;
var t = this._get_pos();
e !== undefined ? this._frozen_pos = {
offset: e,
aspect: (this.getPosAtOffset(e) - t.top) / t.clientHeight
} : this._frozen_pos = {
offset: this.getOffsetAtPos(t.top + t.clientHeight / 2) + this._columns / 2,
aspect: .5
};
},
unfreeze: function() {
if (!this._frozen_pos) return;
var e = this._frozen_pos;
this._frozen_pos = null, this.reflow() && this.render(), this.scrollToOffset(e.offset, e.aspect);
},
reflow: function(e) {
if (this._frozen_pos) return;
if (!this._initialized) {
if (!this.hasNode()) return;
this._cell_bounds && (this.cellBounds = {
width: parseInt(this._cell_bounds.getComputedStyleValue("width")),
height: parseInt(this._cell_bounds.getComputedStyleValue("height"))
}, this._cell_bounds.destroy(), this._cell_bounds = null), this.cellBounds.height || (this.warn("Cannot detect cell's height, assume default"), this.cellBounds.height = 200), this._client_margin_top = parseInt(this._client.getComputedStyleValue("margin-top")), this._initialized = !0;
}
var t = this.getBounds(), n = this.fit ? 1 : Math.max(1, Math.floor(t.width / this.cellBounds.width)), r = Math.ceil(this.count / n) * this.cellBounds.height;
r > t.height && this._client.setBounds({
height: r
}), this.inherited(arguments);
if (this._update_layout() || e) return this._update_content(), !0;
},
scroll: function() {
var e = this.inherited(arguments), t = this._get_pos(), n = this._rows_per_page * this.cellBounds.height, r, i;
return t.top < this._rendered_top ? (r = Math.max(0, t.top - t.top % n), r + n < this._rendered_top ? i = Math.ceil((t.top + t.clientHeight) / n) * n : i = this._rendered_top + n) : t.top + t.clientHeight > this._rendered_bottom && (i = Math.ceil((t.top + t.clientHeight) / n) * n, i - n == this._rendered_bottom ? r = this._rendered_bottom - n : r = Math.max(0, t.top - t.top % n)), r !== undefined && (this._rendered_top = r, this._update_content_at_pos(r, r, i, n), this._rendered_bottom = i), e;
},
setupCell: function(e) {
return this.doSetupCell(e), this.selectCell(e), e.cell.show(), !0;
},
selectCell: function(e) {
this.doSelectCell(e);
},
_update_layout: function() {
if (this.fit) {
var e = this._get_pos().clientWidth;
e != this.cellBounds.width && (this.cellBounds.width = e, this._columns = 0);
}
var t = this._get_pos(), n = Math.max(1, Math.floor(t.clientWidth / this.cellBounds.width)), r = Math.max(1, Math.ceil(t.clientHeight * Math.max(1, this.screensPerPage) / this.cellBounds.height));
if (n == this._columns && r == this._rows_per_page) return !1;
this._columns = n, this._rows_per_page = r, this.fit || this._client.setBounds({
width: n * this.cellBounds.width
});
for (var i = this._client.getClientControls(), s, o = 0; s = i[o++]; ) this._generate_page(s);
return !0;
},
_update_content: function() {
var e = Math.ceil(this.count / this._columns) * this.cellBounds.height;
this._client.setBounds({
height: e
});
var t = this._get_pos().top, n = this._rows_per_page * this.cellBounds.height, r = e ? t + n : 0;
t -= t % n, this._rendered_top = t, t = this._update_content_at_pos(t, undefined, r, n), this._rendered_bottom = t;
},
_update_content_at_pos: function(e, t, n, r) {
var i = t == undefined, s = this.getOffsetAtPos(e), o = this._client.getClientControls(), u;
for (; e < n; e += r) {
for (var a = o.length; a--; ) if (o[a] && o[a].getBounds().top == e) break;
if (a < 0) if (i) {
for (a = o.length; a--; ) if (o[a]) break;
} else for (a = o.length; a--; ) {
u = o[a];
if (!u) continue;
if (!u.showing) break;
var f = u.getBounds();
if (f.top >= n || f.top + f.height <= t) {
u.showing = !1;
break;
}
}
if (a < 0) {
this.warn("No free pages");
continue;
}
var u = o[a];
o[a] = null;
if (i || !u.showing) u.pending_events = [], u.setBounds({
top: e
}), this._render_page(u, s);
s += this._rows_per_page * this._columns;
}
for (var l = o.length; u = o[--l]; ) u && (u.pending_events = [], u.hide());
return e;
},
_generate_page: function(e) {
e.destroyClientControls(), e.pending_events = [];
var t = 0, n = 0;
for (var r = 0; r < this._rows_per_page; ++r) {
for (var i = 0; i < this._columns; ++i) {
var s = e.createComponent({
kind: "sugar_network._CellProxy",
owner: this
});
s.createComponent(this.cell), s.setBounds({
left: t,
top: n,
width: this.cellBounds.width,
height: this.cellBounds.height
}), s.hide(), t += this.cellBounds.width;
}
t = 0, n += this.cellBounds.height;
}
e.setBounds({
top: 0,
width: this._columns * this.cellBounds.width,
height: 0
}), e.hide();
},
_render_page: function(e, t) {
var n = 0;
e.offset_start = t;
var r = e.getClientControls();
for (var i = 0, s; s = r[i++]; ) {
if (t >= this.count) s.offset = undefined, s.hide(); else {
s.offset = t;
var o = {
offset: t,
cell: s
};
this.setupCell(o) || e.pending_events.push(o), n = i;
}
t++;
}
e.offset_end = t - 1, e.setBounds({
height: Math.ceil(n / this._columns) * this.cellBounds.height
}), e.show(), e.render();
},
cacheScrollPosition: function() {
this._cached_pos || (this._cached_pos = this._get_pos()), this.inherited(arguments);
},
restoreScrollPosition: function() {
this.inherited(arguments), this._cached_pos = null;
},
_get_pos: function() {
if (this._cached_pos) return this._cached_pos;
var e = this.getScrollBounds();
return this._client_margin_top && (e.top = Math.max(0, e.top - this._client_margin_top), e.maxTop = Math.max(0, e.maxTop - this._client_margin_top), e.clientHeight = Math.max(0, e.clientHeight - this._client_margin_top)), e;
},
_ontap: function(e, t) {
var n = t.originator.owner;
if (n.offset != null) return this.doSelect({
offset: n.offset,
cell: n
}), !0;
}
}), enyo.kind({
name: "sugar_network._CellProxy",
kind: "Control",
style: "position: absolute",
delegateEvent: function(e, t, n, r, i) {
return e == this && (e = this.owner), this.inherited(arguments, [ e, t, n, r, i ]);
}
});

// src/connection.js

enyo.kind({
name: "sugar_network.Connection",
kind: "Signals",
statics: {
apiUrl: "http://api-devel.network.sugarlabs.org",
url: function(e, t) {
var n = sugar_network.Connection.apiUrl + "/" + e.join("/");
return t && (n += "?" + enyo.Ajax.objectToQuery(t)), n;
},
get: function(e, t, n, r) {
return sugar_network.Connection._request({
method: "GET"
}, e, t, undefined, n, r);
},
syncGet: function(e, t) {
return sugar_network.Connection._request({
method: "GET",
sync: !0
}, e, t);
},
getBlob: function(e, t, n, r) {
var i = sugar_network.Connection._request({
method: "GET"
}, e, t, undefined, n, r);
return i.handleAs = "text", i;
},
post: function(e, t, n, r, i) {
return n = enyo.json.stringify(n), sugar_network.Connection._request({
method: "POST",
contentType: "application/json"
}, e, t, n, r, i);
},
put: function(e, t, n, r, i) {
return n = enyo.json.stringify(n), sugar_network.Connection._request({
method: "PUT",
contentType: "application/json"
}, e, t, n, r, i);
},
putBlob: function(e, t, n, r, i) {
var s = {
method: "PUT",
headers: {
"Content-Type": n.type || "application/octet-stream"
}
};
return sugar_network.Connection._request(s, e, t, n, r, i);
},
del: function(e, t, n, r) {
return sugar_network.Connection._request({
method: "DELETE"
}, e, t, undefined, n, r);
},
_event_source: null,
_request: function(e, t, n, r, i, s) {
e.url = sugar_network.Connection.url(t, n), e.cacheBust = !1;
var o = new sugar_network.Ajax(e);
return i ? o.response(function(e, t) {
i(t);
}) : o.response(function(e, t) {
e.reply = t;
}), s ? o.error(function(e, t) {
s(t, e.response_error);
}) : o.error(function(e, t) {
alert(e.response_error);
}), o.postBody = r, o.go(), e.sync ? o.reply : o;
}
},
create: function() {
this.inherited(arguments), sugar_network.Connection._event_source || (sugar_network.Connection._event_source = new EventSource(sugar_network.Connection.apiUrl + "?cmd=subscribe"), sugar_network.Connection._event_source.onmessage = function(e) {
enyo.Signals.send("onServerEvent", enyo.json.parse(e.data));
});
}
}), enyo.kind({
name: "sugar_network.Ajax",
kind: "enyo.Ajax",
receive: function(e, t) {
if (this.isFailure(t)) if (!e) this.response_error = this.statusText; else try {
this.response_error = enyo.json.parse(e).error;
} catch (n) {
this.response_error = e;
}
this.inherited(arguments);
}
});

// src/cursor.js

enyo.kind({
name: "sugar_network.Cursor",
kind: "Component",
queue_pages_number: 32,
published: {
document: null,
query: null,
filter: null,
orderBy: null
},
events: {
onUpdate: "",
onReady: ""
},
components: [ {
kind: "sugar_network.Connection",
onServerEvent: "_onServerEvent"
} ],
constructor: function() {
this.reply = [ "guid" ], this.page_size = 32, this.inherited(arguments), this._fetching = !1, this._recent_page = null, this.filter = {}, this._reset();
},
get: function(e) {
if (e == null || e < 0 || this.total != null && e >= this.total) return null;
var t = Math.floor(e / this.page_size), n = e - t * this.page_size, r = this._pages[t];
return r ? n < r.length ? r[n] : (this.total = t + r.length, this.doUpdate(), null) : (this._fetch_page(t), null);
},
updateFilter: function(e) {
var t = !1;
for (var n in e) {
var r = e[n];
this.filter[n] == undefined && r != undefined ? t = !0 : enyo.isArray(r) ? (r.sort(), t = this.filter[n].toString() != r.toString()) : t = this.filter[n] != r;
if (t) break;
}
t && (enyo.mixin(this.filter, e), this.filterChanged());
},
reset: function(e) {
this._abort_fetch_page(), this.document || (e = !0);
if (e === undefined || e) this._reset(), this.doUpdate();
this.document && this._fetch_page(this._recent_page || 0, !0);
},
documentChanged: function(e) {
this.reset();
},
queryChanged: function(e) {
this.reset();
},
filterChanged: function(e) {
this.reset();
},
orderByChanged: function(e) {
this.reset();
},
_reset: function() {
this._pages = {
length: 0
}, this.total = null;
},
_abort_fetch_page: function() {
this._fetching = !1;
},
_fetch_page: function(e, t) {
if (this._fetching) return;
var n = {};
for (var r in this.filter) {
var i = this.filter[r];
i != null && (n[r] = i);
}
n.offset = e * this.page_size, n.limit = this.page_size, this.query != null && (n.query = this.query), this.orderBy != null && (n.order_by = this.orderBy), n.reply = this.reply, sugar_network.Connection.get([ this.document ], n, enyo.bind(this, "_fetch_page_response", e, t), enyo.bind(this, "_fetch_page_error")), this._fetching = !0;
},
_fetch_page_response: function(e, t, n) {
if (!this._fetching) return;
this._fetching = !1;
if (t) this._reset(); else if (e != this._recent_page) for (var r = this._pages.length; --r > 0 && this._pages.length >= this.queue_pages_number; ) {
for (var i = j = this._recent_page, s; s = this._pages[j]; j = s.prev) i = j;
delete this._pages[i], this._pages.length--;
}
this.total = n.total;
var s = this._pages[e] = n.result;
s.prev = this._recent_page, this._recent_page = e, this._pages.length++, t ? this.doUpdate() : this.doReady();
},
_fetch_page_error: function(e) {
this._fetching && (this._abort_fetch_page(), this._reset(), this.doUpdate());
},
_onServerEvent: function(e, t) {
t.event == "handshake" ? this.reset() : t.document == this.document && (!t.mountpoint || t.mountpoint == "/") && this.reset(!1);
}
});

// src/common.js

_ = $L, listRegExp = new RegExp("[ 	\n,;]+"), stubContent = "\u00a0", stabilityNames = {
insecure: _("Insecure"),
buggy: _("Buggy"),
developer: _("Developer"),
testing: _("Testing"),
stable: _("Stable")
}, stabilitiesList = [ [ "stable", stabilityNames.stable ], [ "testing", stabilityNames.testing ], [ "developer", stabilityNames.developer ] ], sugarReleases = [ [ "sugar-0.98", "Sugar 0.98" ], [ "sugar-0.96", "Sugar 0.96" ], [ "sugar-0.94", "Sugar 0.94" ], [ "sugar-0.92", "Sugar 0.92" ], [ "sugar-0.90", "Sugar 0.90" ], [ "sugar-0.88", "Sugar 0.88" ], [ "sugar-0.86", "Sugar 0.86" ], [ "sugar-0.84", "Sugar 0.84" ], [ "sugar-0.82", "Sugar 0.82" ] ], splitString = function(e) {
var t = e.split(listRegExp);
return t.length == 1 && t[0] == "" && (t = []), t;
}, findOrCreatePanel = function(e, t, n, r) {
var i = e.getPanels();
for (var s, o = 0; s = i[o]; ++o) if (s[t] == n) break;
if (!s) {
if (!r) return null;
typeof r == "function" && (r = r()), r[t] = n, s = e.createComponent(r), s.render();
}
return {
index: o,
control: s
};
}, escapeText = function(e) {
return e = enyo.dom.escape(e), e.split("\n").join("<br>");
}, formatDate = function(e) {
return App.dateShortFormat.format(new Date(e * 1e3));
}, formatAuthors = function(e) {
return e = e.map(function(e) {
return e.name;
}), enyo.format(_("by %s"), e.join(", "));
}, enyo.kind({
name: "ToolButton",
kind: "onyx.Checkbox",
classes: "toolbar-button"
}), enyo.kind({
name: "Note",
classes: "note",
initComponents: function() {
for (var e in this.components) this.components[e].classes = (this.components[e] || "") + " note-message";
this.components = [ {
kind: "Image",
src: "images/inline-note.png",
classes: "note-icon"
} ].concat(this.components), this.inherited(arguments);
}
}), enyo.kind({
name: "InputDecorator",
kind: "onyx.InputDecorator",
classes: "input-decorator",
initComponents: function() {
this.components = [ {
classes: "input-decorator-label",
content: this.label + ":"
} ].concat(this.components), this.inherited(arguments);
}
}), enyo.kind({
name: "CheckButton",
kind: "onyx.Checkbox",
classes: "checkbutton"
}), enyo.kind({
name: "InlineCheckbox",
kind: "onyx.Checkbox",
classes: "checkbutton inline-button"
}), enyo.kind({
name: "InlineCheckboxButton",
kind: "onyx.Checkbox",
classes: "checkbutton-singular inline-button"
}), enyo.kind({
name: "RadioButton",
kind: "onyx.Checkbox",
classes: "radiobutton"
}), enyo.kind({
name: "InlineRadioButton",
kind: "onyx.Checkbox",
classes: "radiobutton inline-button"
}), enyo.kind({
name: "Rating",
classes: "rating",
stars: null,
setStars: function(e) {
this.stars && this.removeClass(this.stars), this.stars = "stars" + e, this.addClass(this.stars);
}
}), enyo.kind({
name: "Entry",
kind: "onyx.MenuDecorator",
timeout: 3e3,
left_icon: null,
right_icon: null,
placeholder: null,
flat: !1,
events: {
onChange: ""
},
handlers: {
onkeypress: "_onkeypress"
},
initComponents: function() {
var e = [];
this.left_icon && e.push({
name: "left_icon",
kind: "Image",
src: this.left_icon
}), e.push({
name: "input",
kind: "onyx.Input",
classes: "entry-input",
placeholder: this.placeholder,
oninput: "_oninput"
}), e.push({
name: "right_icon",
kind: "_EntryButton",
classes: this.flat ? "entry-flat-button" : "entry-button",
src: this.right_icon
}), this.kindComponents = [ {
kind: "onyx.InputDecorator",
classes: this.flat ? "entry-flat" : null,
components: e
}, {
name: "menu",
kind: "onyx.Menu",
modal: !1
} ].concat(this.kindComponents), this.inherited(arguments), this._value = "", this.$.right_icon.applyStyle("visibility", "hidden");
},
getValue: function() {
return this.sync(), this._value;
},
setValue: function(e) {
this.$.input.setValue(e), this.sync();
},
setDisabled: function(e) {
this.$.input.setDisabled(e);
},
sync: function(e) {
if (this.$.input.disabled) return;
this._timeout && (clearTimeout(this._timeout), this._timeout = null);
var t = this.$.input.getValue();
this._value != t && (this._value = t, this.$.right_icon.applyStyle("visibility", t ? "visibile" : "hidden"), (e === undefined || e) && this.doChange({
value: t
}));
},
_oninput: function(e, t) {
e.getValue() ? (this._timeout ? clearTimeout(this._timeout) : this.$.right_icon.applyStyle("visibility", "visibile"), this._timeout = setTimeout(enyo.bind(this, "_on_timeout"), this.timeout)) : this.sync();
},
_onkeypress: function(e, t) {
t.keyCode == 13 && this.sync();
},
_on_timeout: function() {
this.sync();
}
}), enyo.kind({
name: "_EntryButton",
kind: "onyx.IconButton",
events: {
onClick: ""
},
handlers: {
ontap: "_ontap"
},
_ontap: function() {
return this.doClick({
value: this.owner.$.input.getValue()
}), !0;
}
}), enyo.kind({
name: "UsersEntry",
kind: "Entry",
timeout: 500,
handlers: {
onChange: "_onChange",
onClick: "_onClick"
},
_onChange: function(e, t) {
this._guid = null;
var n = this.$.menu;
if (!t.value) n.hide(); else {
var r = this;
sugar_network.Connection.get([ "user" ], {
query: t.value,
limit: 32,
reply: [ "guid", "name" ]
}, function(e) {
e.total ? (n.destroyClientControls(), e.result.forEach(function(e) {
n.createComponent({
content: e.name,
guid: e.guid,
owner: r,
onActivate: "_onActivate"
}).render();
}), n.show()) : n.hide();
});
}
},
_onActivate: function(e, t) {
if (!e.active) return;
this._guid = e.guid, this.$.input.setValue(e.content), this.sync(!1);
},
_onClick: function(e, t) {
if (e == this) return;
this.sync(!1);
if (!this._guid) return sugar_network.Connection.get([ "user" ], {
name: t.value,
limit: 1,
reply: [ "guid" ]
}, enyo.bind(this, function(e) {
e.total ? this.bubble("onClick", {
guid: e.result[0].guid
}) : this.bubble("onClick", t);
})), !0;
t.guid = this._guid;
}
});

// src/search_entry.js

enyo.kind({
name: "SearchEntry",
kind: "Entry",
left_icon: "images/search-input-search.png",
right_icon: "images/search-input-cancel.png",
placeholder: "Search...",
classes: "search-input",
flat: !0,
handlers: {
onChange: "_onChange",
onClick: "_onClick"
},
components: [ {
kind: "Signals",
onSwitchSubspace: "_onSwitchSubspace"
} ],
create: function() {
this.inherited(arguments), this._queries = {};
},
_onChange: function(e, t) {
enyo.Signals.send("onQuery", {
query: t.value
});
},
_onClick: function() {
return this.setValue(""), !0;
},
_onSwitchSubspace: function(e, t) {
t.prev && (this._queries[t.prev.subspace] = this.getValue()), this.setDisabled(!self[t.subspace].searchable);
var n = {};
enyo.Signals.send("onQueryGet", n), this.setValue(n.query || "");
}
});

// src/workspaces.js

enyo.kind({
name: "Workspace",
classes: "workspace",
statics: {
subspace: undefined,
resource: undefined,
fields: undefined,
title: undefined,
label: undefined,
searchable: undefined,
sidebar: undefined
}
}), enyo.kind({
name: "Dialog",
kind: "Workspace",
classes: "dialog",
initComponents: function() {
this.kindComponents = [ {
kind: "Scroller",
classes: "dialog",
components: this.kindComponents || this.components
}, {
classes: "dialog-buttons-bar",
components: this.buttons || []
} ], this.components = null, this.inherited(arguments);
}
}), enyo.kind({
name: "DataDialog",
kind: "Dialog",
fields: [],
buttons: [ {
name: "_undo",
kind: "DialogButton",
content: _("Undo"),
ontap: "_undo_ontap"
}, {
name: "_submit",
kind: "DialogButton",
content: _("Submit"),
ontap: "_submit_ontap"
} ],
disable: function(e) {
this.error("Not implemented");
},
setup: function(e) {
this.error("Not implemented");
},
submit: function(e) {
this.error("Not implemented");
},
oninput: function() {
this.$._submit.setDisabled(!1), this.$._undo.setDisabled(!Boolean(this.data.guid));
},
onenter: function(e) {
self[this.kind].data !== undefined && (e.data = {}), this.$._submit.setDisabled(!0), this.$._undo.setDisabled(!0), this.disable(!0);
if (e) {
this.data = e.data || {};
if (this.data.guid) {
sugar_network.Connection.get([ this.ctor.resource, this.data.guid ], {
reply: this.fields
}, enyo.bind(this, "_setup"), enyo.bind(this, function() {
this._setup(null);
}));
return;
}
}
this._setup({});
},
_setup: function(e) {
this.data = enyo.mixin(this.data, e), this.setup(this.data), this.$._submit.setDisabled(Boolean(this.data.guid)), this.disable(!1);
},
_undo_ontap: function() {
this.onenter();
},
_submit_ontap: function() {
var e = {};
if (!this.submit(e, this.data)) return;
this.data.guid ? sugar_network.Connection.put([ this.ctor.resource, this.data.guid ], undefined, e, enyo.bind(this, function() {
enyo.mixin(this.data, e), enyo.Signals.send("onZapSubspace");
})) : (enyo.mixin(e, self[this.kind].data), sugar_network.Connection.post([ this.ctor.resource || this.ctor.resource ], undefined, e, enyo.bind(this, function(t) {
enyo.mixin(this.data, e), this.data.guid = t, enyo.Signals.send("onZapSubspace");
})));
}
}), enyo.kind({
name: "DialogButton",
kind: "onyx.Button",
classes: "dialog-button"
}), enyo.kind({
name: "_Menu",
kind: "onyx.Menu",
floating: !0,
handlers: {
onActivate: "_onActivate"
},
_onActivate: function(sender, event) {
if (event.originator.active) {
event.originator.active = !1;
with (this.owner.$._more) subspace = event.originator.subspace, active = !1, setContent(event.originator.content), setActive(!0);
}
return !0;
}
});

// src/sidebar.js

enyo.kind({
name: "Sidebar",
classes: "sidebar-panel",
initKindComponents: function() {
if (!this.kindComponents) return;
var e = this.panelClasses, t = [], n = [];
this.kindComponents.forEach(function(r, i) {
var s = self[r.kind] || {};
if ((r.permissions_editor || s.permissions_editor) && !App.roles.editor) return;
t.push({
kind: "onyx.IconButton",
classes: "sidebar-switch-button",
src: r.icon || s.icon,
label: r.label || s.label,
index: i,
panel: r.kind
}), r.index = i, e && (r.classes = (r.classes || "") + " " + e), n.push(r);
}), this.kindComponents = [ {
classes: "sidebar-switch-bar",
components: [ {
name: "label",
classes: "sidebar-switch-label"
}, {
name: "switches",
kind: "Group",
classes: "sidebar-switch-box",
highlander: !0,
components: t,
onActivate: "_switches_onActivate"
} ]
}, {
name: "tabs",
kind: "Panels",
style: "height: 100%;",
draggable: !1,
components: n,
onActivate: "_tabs_onActivate"
} ];
},
initComponents: function() {
this.initKindComponents(), this.inherited(arguments), this.$.switches && this.$.switches.getControls()[0].setActive(!0);
},
onenter: function(e) {
if (!this.$.switches) return !1;
var t = this.$.switches.getControls();
if (!t.length) return !1;
this.subspace = e.subspace;
if (self[e.subspace].sidebar) this.level = e.level; else if (this.event) {
this._activate_button(this.$[e.subspace]);
return;
}
this.event = e, this._activate_button(this.$[e.subspace]);
var n = !1;
e.data && (n = Boolean((e.data.author || {})[App.principal])), this.$.tabs.getPanels().forEach(function(e) {
var r;
e.permissions_authenticated && (r = Boolean(App.principal)), e.permissions_author && (r = App.roles.root || n), r !== undefined && t[e.index].setShowing(r);
});
if (!this.$.switches.active.showing) t[0].setActive(!0); else if (e.data) {
var r = this.$.tabs.getActive();
r && r.onenter && r.onenter(e);
}
return !0;
},
_switches_onActivate: function(e, t) {
var n = t.originator;
if (n.active && n != this._last_switch) {
this.$.label.setContent(n.label);
var r = this.$.tabs.getActive();
r && r.onleave && r.onleave(), this.$.tabs.setIndex(n.index);
if (this.event) {
var r = this.$.tabs.getActive();
r.onenter && r.onenter(this.event);
}
this._last_switch = n;
}
return !0;
},
_tabs_onActivate: function(e, t) {
var n = t.originator;
if (n.kind != "SidebarButton") return;
return n.active && n != this._last_button && (this._activate_button(n), enyo.Signals.send("onOpenSubspace", {
level: self[this.subspace].sidebar ? undefined : this.level + 1,
subspace: n.name,
data: n.data === undefined ? this.event.data : n.data
})), !0;
},
_activate_button: function(e) {
var t = findGroup(this._last_button);
t && findGroup(e) != t && t.setActive(!1), e && !e.active && e.setActive(!0), this._last_button = e;
}
}), enyo.kind({
name: "SidebarButton",
kind: "onyx.IconButton",
classes: "sidebar-button"
}), enyo.kind({
name: "SidebarButtonDivider",
classes: "sidebar-button-divider"
}), enyo.kind({
name: "SidebarDivider",
classes: "sidebar-divider",
initComponents: function() {
this.components = [ {
content: this.label,
classes: "sidebar-divider-label"
} ], this.inherited(arguments);
}
}), findGroup = function(e) {
while (e) {
if (e.kind == "Group") return e;
e = e.parent;
}
};

// src/navibar.js

workspaces = [ "Activities", "ActivityDependencies", "ActivityReports", "ActivityUsers", "Gallery", "GalleryShare", "Content", "ContentEdit", "ContentNew", "ContentUpdate", "ContentUsers", "Questions", "Ideas", "Problems", "Implementations", "Packages", "PackageEdit", "PackageNew", "PackageUsers", "Projects", "ProjectEdit", "ProjectNew", "ProjectUsers" ], enyo.kind({
name: "Navibar",
statics: {
last: null
},
components: [ {
kind: "Signals",
onOpenSubspace: "_onOpenSubspace",
onZapSubspace: "_onZapSubspace"
} ],
create: function() {
this.inherited(arguments), this._workspace_events = [];
},
restore: function(e) {
var t = {};
workspaces.forEach(function(e) {
t[self[e].navid] = e;
}), this._workspace_events = [ this._populate_event({
subspace: "Main",
level: 0
}) ];
var n, r, i;
for (var s = 0; s < e.length; s++) {
var o, u = {
level: s + 1,
data: r
};
o = t[e[s]];
if (o) o = self[o], o.data !== undefined ? u.data = r = o.data : o.navid == "packages" && (u.data = r = sugar_network.Connection.syncGet([ n.resource, e[s] ], {
reply: n.fields
})); else {
if (!n) break;
o = self[n.subspace], u.data = r = sugar_network.Connection.syncGet([ n.resource, e[s] ], {
reply: n.fields
}), u.label = r[o.title];
}
if (!App.roles.root) if (o.permissions_editor && !App.roles.editor || o.permissions_authenticated && !App.principal || o.permissions_author && (!r || !(r.author || {})[App.principal])) break;
o.label && (u.label = o.label), o.sidebar ? u.sidebar = i = o.sidebar : u.sidebar = i, u.subspace = o.prototype.kindName, this._workspace_events.push(u), n = o.subspace ? o : null;
}
this._switch_subspace(this._workspace_events.length - 1);
},
_switch_subspace: function(e) {
var t = [];
this.destroyClientControls(), this.createComponent({
kind: "onyx.IconButton",
src: "images/inline-home.png",
ontap: this._workspace_events.length > 1 ? "_ontap" : null,
index: 0
}).render(), this.createComponent({
classes: "navibar-divider"
}).render();
for (var n = 1; n < this._workspace_events.length; n++) {
var r = this._workspace_events[n];
n > 1 && this.createComponent({
classes: "navibar-divider"
}).render(), this.createComponent({
classes: "navibar-item" + (n != e ? " selected" : ""),
content: r.label,
ontap: n != e ? "_ontap" : null,
index: n
}).render(), n <= e && t.push(self[r.subspace].navid || r.data.guid);
}
t.length ? t = window.location.pathname + "?" + t.join("&") : t = window.location.pathname, history.replaceState(undefined, undefined, t), this._workspace_events[e].prev = Navibar.last, Navibar.last = this._workspace_events[e], enyo.Signals.send("onSwitchSubspace", Navibar.last);
},
_populate_event: function(e) {
var t = self[e.subspace];
return e.label || (e.label = t.label), e.sidebar || (t.sidebar ? e.sidebar = t.sidebar : Navibar.last && (e.sidebar = Navibar.last.sidebar)), e;
},
_onOpenSubspace: function(e, t) {
this._populate_event(t), t.level === undefined && Navibar.last && (t.level = Navibar.last.level + 1), this._workspace_events.splice(t.level), this._workspace_events.push(t), this._switch_subspace(this._workspace_events.length - 1);
},
_onZapSubspace: function() {
this._workspace_events.splice(Navibar.last.level), this._switch_subspace(this._workspace_events.length - 1);
},
_ontap: function(e) {
return this._switch_subspace(e.index), !0;
}
});

// src/tables.js

enyo.kind({
name: "Table",
kind: "sugar_network.Table",
style: "width: 100%; height: 100%",
client_classes: "table-client",
handlers: {
onSelect: "_onSelect"
},
published: {
selected: {}
},
components: [ {
kind: "Signals",
onDiscoverTable: "_onDiscoverTable",
onQuery: "_onQuery",
onQueryGet: "_onQueryGet"
} ],
create: function() {
this.inherited(arguments), this.badges = {
launch: null,
download: null
}, this.layer = null, this.cell.onenter = "_cell_onenter", this.cell.onleave = "_cell_onleave", this.subspace = {};
for (var e = this; e; e = e.parent) if (e.parent && e.parent.kind == "Panels") {
this.subspace = e;
break;
}
this.cursor = this.createComponent({
kind: "sugar_network.Cursor",
onUpdate: "_onUpdate",
onReady: "_onReady"
}), self[this.subspace].cursor = this.cursor, this._onUpdate();
},
stubCell: function(e) {},
setupCell: function(e) {
e.data = this.cursor.get(e.offset);
if (e.data === null) return this.stubCell(e.cell), !1;
e.cell.data = e.data, this.inherited(arguments);
for (var t in this.badges) this.badges[t] != e.offset && e.cell.$[t] && e.cell.$[t].applyStyle("visibility", "hidden");
return !0;
},
selectCell: function(e) {
this.layer ? e.cell.$.cell.addRemoveClass("selected", e.cell.data.layer.indexOf(this.layer) >= 0) : e.cell.$.cell && e.cell.$.cell.addRemoveClass("selected", e.offset == this.selected.offset);
},
setLayer: function(e) {
if (e == this.layer) return;
this.layer = e, this.renderSelection();
},
reset: function() {
this.selected.cell && this.setSelected({}), this.inherited(arguments);
},
selectedChanged: function(e) {
e.cell && e.cell.$.cell.removeClass("selected"), this.selected || (this.selected = {}), this.selected.cell && this.selectCell(this.selected);
},
_onSelect: function(e, t) {
if (this.layer) {
var n = t.cell.data, r = n.layer.indexOf(this.layer), i = n.layer.slice();
return r < 0 ? n.layer.push(this.layer) : n.layer.splice(r, 1), this.selectCell(t), sugar_network.Connection.put([ this.cursor.document, n.guid ], {
cmd: r < 0 ? "attach" : "detach"
}, [ this.layer ], undefined, enyo.bind(this, function(e, r) {
n.layer = i, this.selectCell(t), alert(r);
})), !0;
}
if (this.ctor.subspace) {
var n = this.cursor.get(t.offset);
return n && enyo.Signals.send("onOpenSubspace", {
subspace: t.cell.subspace || this.ctor.subspace,
label: n.title,
data: n,
cursor: this.cursor
}), !0;
}
},
_onDiscoverTable: function(e, t) {
if (Navibar.last.subspace == this.subspace.kind) return t.table = this, !0;
},
_onUpdate: function() {
this.reset(this.cursor.total || 0);
},
_onReady: function() {
this.setCount(this.cursor.total || 0), this.renderPending();
},
_onQuery: function(e, t) {
if (Navibar.last.subspace != this.subspace.kind) return;
this.cursor.setQuery(t.query);
},
_onQueryGet: function(e, t) {
if (Navibar.last.subspace != this.subspace.kind) return;
t.query = this.cursor.query;
},
_get_badge: function(e) {
if (this.launch) return e.originator.owner.$.launch;
if (this.download) return e.originator.owner.$.download;
},
_cell_onenter: function(e, t) {
var n = this._get_badge(t);
n && (n.applyStyle("visibility", "visible"), this.badges[n.name] = t.originator.owner.offset);
},
_cell_onleave: function(e, t) {
var n = this._get_badge(t);
n && (n.applyStyle("visibility", "hidden"), this.badges[n.name] = null);
}
});

// src/main.js

enyo.kind({
name: "Main",
kind: "Workspace",
statics: {
label: null,
sidebar: "MainSidebar",
searchable: !1
},
components: [ {
classes: "main-box",
components: [ {
name: "Activities",
classes: "main-cell",
ontap: "_ontap",
components: [ {
kind: "Image",
classes: "main-icon",
src: "images/activities.png"
}, {
classes: "main-title",
content: _("Activities")
}, {
classes: "main-summary",
content: _("Sugar Activities.")
} ]
}, {
name: "Content",
classes: "main-cell",
ontap: "_ontap",
components: [ {
kind: "Image",
classes: "main-icon",
src: "images/content.png"
}, {
classes: "main-title",
content: _("Content")
}, {
classes: "main-summary",
content: _("Non-software content.")
} ]
}, {
name: "Projects",
classes: "main-cell",
ontap: "_ontap",
components: [ {
kind: "Image",
classes: "main-icon",
src: "images/projects.png"
}, {
classes: "main-title",
content: _("Projects")
}, {
classes: "main-summary",
content: _("General purpose projects.")
} ]
} ]
}, {
name: "note",
kind: "Note",
classes: "main-note",
components: [ {
content: "Authentication is not yet implemented for Web version,"
}, {
tag: "br"
}, {
allowHtml: !0,
content: enyo.format("follow the %s for options to make personalized Sugar Network changes.", '<a href="http://wiki.sugarlabs.org/go/Sugar_Network#Try_it">Wiki instructions</a>')
} ]
} ],
onenter: function(e) {
this.$.note.setShowing(!App.proxied);
},
_ontap: function(e, t) {
return enyo.Signals.send("onOpenSubspace", {
subspace: e.name
}), !0;
}
}), enyo.kind({
name: "MainSidebar",
kind: "Sidebar"
});

// src/contexts.js

enyo.kind({
name: "ContextsGrid",
kind: "Table",
cellBounds: "grid-cell-bounds",
cell: {
classes: "grid-cell-holder",
components: [ {
name: "cell",
classes: "grid-cell",
components: [ {
classes: "grid-cell-topbar",
components: [ {
name: "title",
classes: "grid-cell-title"
} ]
}, {
name: "icon",
kind: "Image",
classes: "grid-cell-icon"
}, {
name: "rating",
kind: "Rating",
classes: "grid-cell-rating"
}, {
name: "launch",
classes: "grid-cell-badge badge launch",
ontap: "launch"
}, {
name: "download",
classes: "grid-cell-badge badge download",
ontap: "download"
} ]
} ]
},
stubCell: function(cell) {
with (cell.$) title.setContent(stubContent), icon.setSrc(""), rating.setStars(0);
},
setupCell: function(event) {
var result = this.inherited(arguments);
if (result) with (event.cell.$) title.setContent(event.data.title), icon.setSrc(event.data.preview || event.data.icon), rating.setAttribute("title", enyo.format(_("%s review(s)"), event.data.reviews)), rating.setStars(event.data.rating);
return result;
}
}), enyo.kind({
name: "Reviews",
statics: {
searchable: !0
},
components: [ {
name: "list",
kind: "Table",
client_classes: "list-client",
fit: !0,
cellBounds: "feedback-row-bounds",
onSetupCell: "_onSetupCell",
cell: {
name: "row",
classes: "feedback-row",
components: [ {
components: [ {
name: "title",
classes: "feedback-title"
}, {
name: "author",
classes: "feedback-author"
}, {
name: "rating",
kind: "Rating",
classes: "feedback-rating"
} ]
}, {
name: "content",
classes: "feedback-content"
} ]
}
} ],
onenter: function(e) {
var t = this.$.list.cursor;
t.updateFilter({
context: e.data.guid
}), t.document || (t.reply = [ "guid", "title", "content", "rating", "author" ], t.setDocument("review"));
},
_onSetupCell: function(sender, event) {
with (event.cell.$) title.setContent(event.data.title || stubContent), content.setContent(event.data.content), author.setContent(formatAuthors(event.data.author)), rating.setStars(event.data.rating);
}
}), enyo.kind({
name: "ContextSidebar",
kind: "Sidebar",
panelClasses: "context-panel",
initKindComponents: function() {
this.inherited(arguments), this.kindComponents.push({
classes: "context-box",
components: [ {
classes: "context-icon-holder",
components: [ {
name: "icon",
kind: "Image",
classes: "context-icon"
} ]
}, {
name: "summary",
classes: "context-summary"
} ]
});
},
onenter: function(e) {
if (!this.inherited(arguments)) return;
this.$.summary.setContent(e.data.summary || ""), this.$.icon.setSrc(e.data.preview || e.data.icon || "");
}
}), enyo.kind({
name: "Feedback",
feedback_type: null,
components: [ {
name: "list",
kind: "Table",
client_classes: "list-client",
fit: !0,
cellBounds: "feedback-row-bounds",
onSetupCell: "_onSetupCell",
cell: {
name: "row",
classes: "feedback-row",
components: [ {
name: "title",
classes: "feedback-title"
}, {
name: "author",
classes: "feedback-author"
}, {
classes: "feedback-content",
name: "content"
} ]
}
} ],
onenter: function(e) {
var t = this.$.list.cursor;
t.updateFilter({
context: e.data.guid
}), t.document || (t.reply = [ "guid", "author", "title", "content" ], t.filter.type = this.feedback_type, t.setDocument("feedback"));
},
_onSetupCell: function(sender, event) {
with (event.cell.$) title.setContent(event.data.title || stubContent), author.setContent(formatAuthors(event.data.author)), content.setContent(event.data.content);
}
}), enyo.kind({
name: "Questions",
kind: "Feedback",
feedback_type: "question",
statics: {
navid: "questions",
label: _("Questions"),
searchable: !0
}
}), enyo.kind({
name: "Ideas",
kind: "Feedback",
feedback_type: "idea",
statics: {
navid: "ideas",
label: _("Ideas"),
searchable: !0
}
}), enyo.kind({
name: "Problems",
kind: "Feedback",
feedback_type: "problem",
statics: {
navid: "problems",
label: _("Problems"),
searchable: !0
}
}), enyo.kind({
name: "Implementations",
kind: "Table",
client_classes: "list-client",
fit: !0,
cellBounds: "implementations-row-bounds",
statics: {
navid: "versions",
label: _("Versions"),
searchable: !0,
sidebar: "ImplementationsSidebar"
},
cell: {
name: "cell",
classes: "implementations-row",
components: [ {
name: "release",
classes: "implementations-release"
}, {
name: "date",
classes: "implementations-date"
}, {
name: "author",
classes: "implementations-author"
}, {
name: "download",
classes: "implementations-badge badge download",
ontap: "download"
} ]
},
onenter: function(e) {
this.cursor.updateFilter({
context: e.data.guid
}), this.cursor.document ? this.setSelected({}) : (this.cursor.reply = [ "guid", "layer", "author", "version", "ctime", "stability", "notes" ], this.cursor.orderBy = "-version", this.cursor.setDocument("implementation"));
},
stubCell: function(e) {
e.applyStyle("visibility", "hidden");
},
setupCell: function(event) {
var result = this.inherited(arguments);
if (result) {
event.cell.applyStyle("visibility", "visible");
with (event.cell.$) release.setContent(stabilityNames[event.data.stability] + " " + event.data.version), date.setContent(formatDate(event.data.ctime)), author.setContent(formatAuthors(event.data.author));
}
return result;
},
selectedChanged: function() {
this.inherited(arguments), this.selected.cell ? this.sidebar.$.notes.setContent(escapeText(this.selected.cell.data.notes)) : this.sidebar.$.notes.setContent("");
},
download: function(e, t) {
var n = t.originator.owner, r = sugar_network.Connection.url([ "implementation", n.data.guid, "data" ]);
return window.location.assign(r), !0;
},
_onSelect: function(e, t) {
return this.inherited(arguments) ? !0 : (this.setSelected(t), !0);
}
}), enyo.kind({
name: "ImplementationsSidebar",
kind: "Sidebar",
components: [ {
label: _("Versions"),
icon: "images/versions.png",
components: [ {
kind: "SidebarDivider",
label: _("Stability")
}, {
name: "stability",
components: stabilitiesList.map(function(e) {
return {
kind: "InlineCheckbox",
name: e[0],
content: e[1],
active: !0,
onActivate: "_update_filter"
};
})
}, {
kind: "SidebarDivider",
label: _("Notes")
}, {
name: "notes",
classes: "enyo-selectable",
allowHtml: !0
} ]
}, {
kind: "LayersTab"
} ],
onenter: function(e) {
Implementations.cursor && this._setup_filter_box("stability"), this.$.notes.setContent(""), this.inherited(arguments);
},
_setup_filter_box: function(e) {
var t = Implementations.cursor.filter[e];
this.$[e].getClientControls().forEach(function(e) {
e.setActive(!t || t.indexOf(e.name) >= 0);
});
},
_update_filter: function(e, t) {
if (!Implementations.cursor) return;
var n = [], r = e.parent.getClientControls();
r.forEach(function(e) {
e.active && n.push(e.name);
}), n.length ? n.length == r.length && (n = null) : n = [ "empty" ];
var i = {};
i[e.parent.name] = n, Implementations.cursor.updateFilter(i);
}
}), enyo.kind({
name: "Users",
kind: "Dialog",
components: [ {
components: [ {
classes: "users-icon users-header",
content: _("Author")
}, {
classes: "users-cell users-header",
content: _("User")
} ]
}, {
name: "users",
kind: "Repeater",
onSetupItem: "_onSetupItem",
components: [ {
onenter: "_users_onenter",
onleave: "_users_onleave",
components: [ {
classes: "users-icon",
components: [ {
name: "is_author",
kind: "InlineCheckboxButton",
onActivate: "_is_author_onActivate"
} ]
}, {
name: "name",
classes: "users-cell",
content: "User"
}, {
name: "remove",
kind: "onyx.IconButton",
src: "images/remove.png",
style: "visibility: hidden;",
ontap: "_remove_ontap"
} ]
} ]
}, {
components: [ {
classes: "users-icon"
}, {
kind: "UsersEntry",
classes: "users-cell",
placeholder: _("New user"),
right_icon: "images/add.png",
onClick: "_add_onClick"
} ]
}, {
kind: "Signals",
onServerEvent: "_onServerEvent"
} ],
onenter: function(e) {
if (this.data == e.data) return;
this.resource = self[e.subspace].resource, this.data = e.data, this._build();
},
_build: function() {
this.$.users.count != this.data.author.length ? this.$.users.setCount(this.data.author.length) : this.$.users.build();
},
_users_onenter: function(e, t) {
e.owner.$.remove.applyStyle("visibility", "visible");
},
_users_onleave: function(e, t) {
e.owner.$.remove.applyStyle("visibility", "hidden");
},
_onSetupItem: function(e, t) {
var n = this.data.author[t.index];
t.item.user = n.guid || n.name, t.item.is_author = Boolean(n.role & 2), t.item.$.name.setContent(n.name), t.item.$.is_author.active = t.item.is_author;
},
_add_onClick: function(e, t) {
return sugar_network.Connection.put([ this.resource, this.data.guid ], {
cmd: "useradd",
user: t.guid || t.value
}), e.setValue(""), !0;
},
_remove_ontap: function(e, t) {
return sugar_network.Connection.put([ this.resource, this.data.guid ], {
cmd: "userdel",
user: e.owner.user
}), !0;
},
_is_author_onActivate: function(e) {
return e.active != e.owner.is_author && sugar_network.Connection.put([ this.resource, this.data.guid ], {
cmd: "useradd",
user: e.owner.user,
role: e.active ? 2 : 0
}), !0;
},
_onServerEvent: function(e, t) {
if (t.mountpoint && t.mountpoint != "/" || t.event != "update" || t.document != this.resource || t.guid != this.data.guid || !this.showing) return;
sugar_network.Connection.get([ this.resource, this.data.guid, "author" ], undefined, enyo.bind(this, function(e) {
this.data.author = e, this._build();
}));
}
});

// src/activities.js

enyo.kind({
name: "Activities",
kind: "ContextsGrid",
statics: {
navid: "activities",
resource: "context",
fields: [ "guid", "author", "layer", "title", "summary", "rating", "reviews", "preview" ],
label: _("Activities"),
searchable: !0,
sidebar: "ActivitiesSidebar",
subspace: "ActivityHome"
},
onenter: function() {
this.cursor.document || (this.cursor.reply = this.ctor.fields, this.cursor.filter = {
type: "activity"
}, this.cursor.setDocument("context"));
},
constructor: function() {
App.proxied ? this.download = undefined : this.launch = undefined, this.inherited(arguments);
},
launch: function(e, t) {
App.addLauncher();
var n = t.originator.owner;
return sugar_network.Connection.get([ "context", n.data.guid ], {
cmd: "launch"
}, undefined, App.removeLauncher), !0;
},
download: function(e, t) {
var n = t.originator.owner, r = sugar_network.Connection.url([ "context", n.data.guid ], {
cmd: "clone"
});
return window.location.assign(r), !0;
}
}), enyo.kind({
name: "ActivitiesSidebar",
kind: "Sidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png"
}, {
kind: "LayersTab"
} ]
}), enyo.kind({
name: "ActivityHome",
kind: "Reviews",
statics: {
title: "title",
sidebar: "ActivityHomeSidebar"
}
}), enyo.kind({
name: "ActivityHomeSidebar",
kind: "ContextSidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png",
components: [ {
kind: "Group",
highlander: !0,
components: [ {
name: "Gallery",
kind: "SidebarButton",
src: "images/gallery.png",
content: _("Gallery")
}, {
kind: "SidebarButtonDivider"
}, {
name: "Questions",
kind: "SidebarButton",
src: "images/question.png",
content: _("Questions")
}, {
name: "Ideas",
kind: "SidebarButton",
src: "images/idea.png",
content: _("Ideas")
}, {
name: "Problems",
kind: "SidebarButton",
src: "images/problem.png",
content: _("Problems")
}, {
kind: "SidebarButtonDivider"
}, {
name: "Implementations",
kind: "SidebarButton",
src: "images/versions.png",
content: _("Versions")
} ]
} ]
}, {
label: _("Authoring"),
icon: "images/edit.png",
permissions_author: !0,
components: [ {
kind: "Group",
components: [ {
name: "ActivityUsers",
kind: "SidebarButton",
src: "images/xo.png",
content: _("Manage users")
}, {
kind: "SidebarButtonDivider"
}, {
name: "ActivityReports",
kind: "SidebarButton",
src: "images/warning.png",
content: _("Fail reports")
} ]
} ]
}, {
label: _("Editorship"),
icon: "images/editorship.png",
permissions_editor: !0,
components: [ {
kind: "Group",
components: [ {
name: "ActivityDependencies",
kind: "SidebarButton",
src: "images/dependencies.png",
content: _("Dependencies")
} ]
} ]
} ]
}), enyo.kind({
name: "ActivityDependencies",
kind: "DataDialog",
statics: {
navid: "dependencies",
label: _("Dependencies"),
resource: "context",
permissions_editor: !0
},
fields: [ "dependencies" ],
components: [ {
kind: "InputDecorator",
label: _("Dependencies list"),
components: [ {
name: "deps",
kind: "onyx.TextArea",
classes: "activities-dependencies",
oninput: "oninput"
} ]
}, {
kind: "Note",
components: [ {
content: "This is a transition method how to improve dependencies handling."
}, {
tag: "br"
}, {
content: "The regular way should be setting up them in activity.info file instead."
} ]
} ],
disable: function(e) {
this.$.deps.setDisabled(e);
},
setup: function(e) {
this.$.deps.setValue((e.dependencies || []).join(" "));
},
submit: function(e, t) {
return e.dependencies = splitString(this.$.deps.getValue()), !0;
}
}), enyo.kind({
name: "ActivityReports",
kind: "Table",
client_classes: "list-client",
fit: !0,
cellBounds: "reports-row-bounds",
statics: {
navid: "reports",
label: _("Fail reports"),
searchable: !0,
subspace: "ActivityReport",
resource: "report",
fields: [ "guid", "author", "error", "version", "ctime" ]
},
cell: {
name: "cell",
classes: "feedback-row",
components: [ {
name: "version",
classes: "feedback-release"
}, {
name: "author",
classes: "feedback-author"
}, {
name: "date",
classes: "feedback-date"
}, {
name: "error",
classes: "feedback-conent"
} ]
},
onenter: function(e) {
this.cursor.updateFilter({
context: e.data.guid
}), this.cursor.document || (this.cursor.reply = this.ctor.fields, this.cursor.orderBy = "-ctime", this.cursor.setDocument(this.ctor.resource));
},
stubCell: function(e) {
e.applyStyle("visibility", "hidden");
},
setupCell: function(event) {
var result = this.inherited(arguments);
if (result) {
event.cell.applyStyle("visibility", "visible"), event.data.title = formatDate(event.data.ctime);
with (event.cell.$) version.setContent(enyo.format(_("Version %s"), event.data.version || _("Unknown"))), date.setContent(event.data.title), author.setContent(formatAuthors(event.data.author)), error.setContent(event.data.error);
}
return result;
}
}), enyo.kind({
name: "ActivityReport",
kind: "Workspace",
layoutKind: "FittableRowsLayout",
statics: {
title: "ctime"
},
components: [ {
kind: "InputDecorator",
label: _("Description"),
classes: "dialog-decorator",
components: [ {
name: "description",
kind: "TextArea",
attributes: {
readonly: !0
},
classes: "dialog-notes"
} ]
}, {
kind: "InputDecorator",
fit: !0,
label: _("Environment"),
classes: "dialog-decorator",
components: [ {
name: "environ",
kind: "TextArea",
attributes: {
readonly: !0
},
classes: "dialog-textarea"
} ]
}, {
kind: "InputDecorator",
label: _("Log"),
style: "height: 50%;",
classes: "dialog-decorator",
components: [ {
name: "log",
kind: "TextArea",
attributes: {
readonly: !0
},
classes: "dialog-textarea"
} ]
} ],
onenter: function(e) {
this.$.log.setValue(""), sugar_network.Connection.get([ "report", e.data.guid ], {
reply: [ "description", "environ" ]
}, enyo.bind(this, function(e) {
this.$.description.setValue(e.description), this.$.environ.setValue(enyo.json.stringify(e.environ));
})), sugar_network.Connection.getBlob([ "report", e.data.guid ], {
cmd: "log"
}, enyo.bind(this, function(e) {
this.$.log.setValue(e);
}));
}
}), enyo.kind({
name: "Gallery",
kind: "ContextsGrid",
statics: {
navid: "gallery",
label: _("Gallery"),
searchable: !0,
sidebar: "GallerySidebar",
subspace: "GalleryHome",
resource: "artifact",
fields: [ "guid", "author", "title", "description", "rating", "reviews", "preview" ]
},
constructor: function() {
App.proxied ? this.download = undefined : this.launch = undefined, this.inherited(arguments);
},
onenter: function(e) {
this.context = e.data.guid, this.cursor.updateFilter({
context: this.context
}), this.cursor.document || (this.cursor.reply = this.ctor.fields, this.cursor.filter.type = "instance", this.cursor.filter.filesize = "1..", this.cursor.setDocument(this.ctor.resource));
},
launch: function(e, t) {
App.addLauncher();
var n = t.originator.owner, r = this.context;
return sugar_network.Connection.put([ "artifact", n.data.guid ], {
cmd: "clone"
}, 1, function() {
sugar_network.Connection.get([ "context", r ], {
cmd: "launch",
object_id: n.data.guid
}, undefined, App.removeLauncher);
}, App.removeLauncher), !0;
},
download: function(e, t) {
var n = t.originator.owner, r = sugar_network.Connection.url([ "artifact", n.data.guid, "data" ]);
return window.location.assign(r), !0;
}
}), enyo.kind({
name: "GallerySidebar",
kind: "Sidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png"
}, {
label: _("Authoring"),
icon: "images/edit.png",
permissions_authenticated: !0,
components: [ {
kind: "Group",
components: [ {
name: "GalleryShare",
kind: "SidebarButton",
src: "images/add.png",
content: _("Share Journal object")
} ]
} ]
} ]
}), enyo.kind({
name: "GalleryHome",
kind: "Workspace",
statics: {
title: "title"
}
}), enyo.kind({
name: "GalleryShare",
kind: "Panels",
arrangerKind: "sugar_network.StackArranger",
draggable: !1,
statics: {
navid: "share",
label: _("Share"),
searchable: !0,
permissions_authenticated: !0
},
components: [ {
name: "journal",
kind: "Journal",
onSelect: "_journal_onSelect"
}, {
name: "form",
kind: "GalleryNew"
} ],
onenter: function(e) {
this.$.form.context = e.data.guid;
var t = this.$.journal.cursor;
t.updateFilter({
activity: e.data.guid
}), t.document ? t.reset() : (t.reply = [ "timestamp", "title", "description", "tags", "preview" ], t.setDocument("journal")), this.$.journal.setSelected(), this.setIndex(0);
},
_journal_onSelect: function(e, t) {
return this.$.form.onenter(t.cell.data), this.$.journal.setSelected(t), this.setIndex(1), !0;
}
}), enyo.kind({
name: "Journal",
kind: "Table",
client_classes: "list-client",
cellBounds: "list-row-bounds",
cell: {
name: "cell",
classes: "list-row",
ontap: "select",
components: [ {
name: "preview",
kind: "Image",
classes: "list-icon"
}, {
name: "title",
classes: "list-title"
}, {
name: "date",
classes: "list-summary"
}, {
name: "tags",
classes: "list-summary"
} ]
},
stubCell: function(cell) {
with (cell.$) preview.setSrc(""), title.setContent(stubContent), date.setContent(stubContent), tags.setContent(stubContent);
},
setupCell: function(event) {
var result = this.inherited(arguments);
if (result) with (event.cell.$) preview.setSrc(event.data.preview), title.setContent(event.data.title), date.setContent(formatDate(event.data.timestamp)), tags.setContent(event.data.tags);
return result;
}
}), enyo.kind({
name: "GalleryNew",
kind: "Dialog",
guid: null,
context: null,
components: [ {
kind: "InputDecorator",
label: _("Title"),
components: [ {
name: "title",
kind: "onyx.Input",
oninput: "_oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Description"),
components: [ {
name: "description",
kind: "onyx.TextArea",
oninput: "_oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Tags"),
components: [ {
name: "tags",
kind: "onyx.Input",
oninput: "_oninput"
} ]
} ],
buttons: [ {
name: "back",
kind: "DialogButton",
content: _("Back"),
ontap: "_back_ontap"
}, {
name: "submit",
kind: "DialogButton",
content: _("Submit"),
ontap: "_submit_ontap"
} ],
onenter: function(e) {
this.guid != e.guid && (this.guid = e.guid, this.$.title.setValue(e.title), this.$.description.setValue(e.description), this.$.tags.setValue(e.tags)), this._disable(!1);
},
_oninput: function() {
with (this.$) var fully_set = title.getValue() && description.getValue();
this.$.submit.setDisabled(!fully_set);
},
_back_ontap: function() {
this.parent.setIndex(0);
},
_submit_ontap: function() {
this._disable(!0);
var e = {
context: this.context,
type: "instance",
title: this.$.title.getValue(),
description: this.$.description.getValue(),
tags: splitString(this.$.tags.getValue())
};
sugar_network.Connection.put([ "journal", this.guid ], {
cmd: "share"
}, e, enyo.bind(this, function(e) {
this.guid = null, enyo.Signals.send("onZapSubspace");
}), enyo.bind(this, function(e, t) {
this._disable(!1), alert(t);
}));
},
_disable: function(e) {
for (var t in this.$) t = this.$[t], t.setDisabled && t.setDisabled(e);
this._oninput();
}
}), enyo.kind({
name: "ActivityUsers",
kind: "Users",
statics: {
navid: "activity-users",
label: _("Users"),
resource: "context",
permissions_author: !0
}
});

// src/projects.js

enyo.kind({
name: "Projects",
kind: "ContextsGrid",
statics: {
navid: "projects",
label: _("Projects"),
searchable: !0,
sidebar: "ProjectsSidebar",
subspace: "ProjectHome",
resource: "context",
fields: [ "guid", "author", "layer", "title", "summary", "rating", "reviews", "icon" ]
},
onenter: function(e) {
this.cursor.document || (this.cursor.reply = this.ctor.fields, this.cursor.filter = {
type: "project"
}, this.cursor.setDocument(this.ctor.resource));
},
setupCell: function(e) {
var t = this.inherited(arguments);
return t && e.data.guid == "packages" && (e.cell.subspace = "Packages"), t;
}
}), enyo.kind({
name: "ProjectsSidebar",
kind: "Sidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png"
}, {
label: _("Authoring"),
icon: "images/edit.png",
permissions_authenticated: !0,
components: [ {
kind: "Group",
components: [ {
name: "ProjectNew",
kind: "SidebarButton",
src: "images/add.png",
content: _("Submit new project"),
data: {}
} ]
} ]
}, {
kind: "LayersTab"
} ]
}), enyo.kind({
name: "ProjectHome",
kind: "Reviews",
statics: {
title: "title",
sidebar: "ProjectHomeSidebar"
}
}), enyo.kind({
name: "ProjectHomeSidebar",
kind: "ContextSidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png",
components: [ {
kind: "Group",
highlander: !0,
components: [ {
name: _("Questions"),
kind: "SidebarButton",
src: "images/question.png",
content: "Questions"
}, {
name: _("Ideas"),
kind: "SidebarButton",
src: "images/idea.png",
content: "Ideas"
}, {
name: _("Problems"),
kind: "SidebarButton",
src: "images/problem.png",
content: "Problems"
} ]
} ]
}, {
label: _("Authoring"),
icon: "images/edit.png",
permissions_author: !0,
components: [ {
kind: "Group",
components: [ {
name: "ProjectEdit",
kind: "SidebarButton",
src: "images/edit.png",
content: _("Edit properties")
}, {
name: "ProjectUsers",
kind: "SidebarButton",
src: "images/xo.png",
content: _("Manage users")
} ]
} ]
} ]
}), enyo.kind({
name: "ProjectEdit",
kind: "DataDialog",
statics: {
navid: "project-edit",
label: _("Properties"),
resource: "context",
permissions_author: !0
},
components: [ {
kind: "InputDecorator",
label: _("Title"),
components: [ {
name: "title",
kind: "onyx.Input",
oninput: "oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Summary"),
components: [ {
name: "summary",
kind: "onyx.Input",
oninput: "oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Description"),
components: [ {
name: "description",
kind: "onyx.TextArea",
oninput: "oninput"
} ]
} ],
disable: function(e) {},
setup: function(e) {
this.$.title.setValue(e.title || ""), this.$.summary.setValue(e.summary || ""), this.$.description.setValue(e.description || "");
},
submit: function(e, t) {
return e.title = this.$.title.getValue(), e.summary = this.$.summary.getValue(), e.description = this.$.description.getValue(), e.title ? !0 : (alert(_("Title should not be empty")), !1);
}
}), enyo.kind({
name: "ProjectNew",
kind: "ProjectEdit",
statics: {
navid: "project-new",
label: _("New project"),
resource: "context",
data: {
type: [ "project" ]
},
permissions_authenticated: !0
}
}), enyo.kind({
name: "ProjectUsers",
kind: "Users",
statics: {
navid: "project-users",
label: _("Users"),
resource: "context",
permissions_author: !0
}
});

// src/content.js

enyo.kind({
name: "Content",
kind: "ContextsGrid",
statics: {
navid: "content",
label: _("Content"),
sidebar: "ContentSidebar",
searchable: !0,
subspace: "ContentHome",
resource: "context",
fields: [ "guid", "author", "layer", "title", "summary", "rating", "reviews", "preview" ]
},
onenter: function() {
this.cursor.document || (this.cursor.reply = this.ctor.fields, this.cursor.filter = {
type: "content"
}, this.cursor.setDocument(this.ctor.resource));
},
download: function(e, t) {
var n = t.originator.owner;
if (App.proxied) App.addLauncher(), sugar_network.Connection.put([ "context", n.data.guid ], {
cmd: "clone",
force: 1
}, 1, App.removeLauncher, App.removeLauncher); else {
var r = sugar_network.Connection.url([ "context", n.data.guid ], {
cmd: "clone"
});
window.location.assign(r);
}
return !0;
}
}), enyo.kind({
name: "ContentSidebar",
kind: "Sidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png"
}, {
label: _("Authoring"),
icon: "images/edit.png",
permissions_authenticated: !0,
components: [ {
kind: "Group",
components: [ {
name: "ContentNew",
kind: "SidebarButton",
src: "images/add.png",
content: _("Submit new content"),
data: {}
} ]
} ]
}, {
kind: "LayersTab"
} ]
}), enyo.kind({
name: "ContentHome",
kind: "Reviews",
statics: {
title: "title",
sidebar: "ContentHomeSidebar"
}
}), enyo.kind({
name: "ContentHomeSidebar",
kind: "ContextSidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png",
components: [ {
kind: "Group",
highlander: !0,
components: [ {
name: "Questions",
kind: "SidebarButton",
src: "images/question.png",
content: _("Questions")
}, {
name: "Ideas",
kind: "SidebarButton",
src: "images/idea.png",
content: _("Ideas")
}, {
name: "Problems",
kind: "SidebarButton",
src: "images/problem.png",
content: _("Problems")
}, {
kind: "SidebarButtonDivider"
}, {
name: "Implementations",
kind: "SidebarButton",
src: "images/versions.png",
content: _("Versions")
} ]
} ]
}, {
label: _("Authoring"),
icon: "images/edit.png",
permissions_author: !0,
components: [ {
kind: "Group",
components: [ {
name: "ContentEdit",
kind: "SidebarButton",
src: "images/edit.png",
content: _("Edit properties")
}, {
name: "ContentUsers",
kind: "SidebarButton",
src: "images/xo.png",
content: _("Manage users")
}, {
kind: "SidebarButtonDivider"
}, {
name: "ContentUpdate",
kind: "SidebarButton",
src: "images/versions.png",
content: _("Submit new version")
} ]
} ]
} ]
}), enyo.kind({
name: "ContentEdit",
kind: "DataDialog",
statics: {
navid: "content-edit",
label: _("Properties"),
resource: "context",
permissions_author: !0
},
components: [ {
kind: "InputDecorator",
label: _("Title"),
components: [ {
name: "title",
kind: "onyx.Input",
oninput: "oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Summary"),
components: [ {
name: "summary",
kind: "onyx.Input",
oninput: "oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Description"),
components: [ {
name: "description",
kind: "onyx.TextArea",
oninput: "oninput"
} ]
} ],
disable: function(e) {},
setup: function(e) {
this.$.title.setValue(e.title || ""), this.$.summary.setValue(e.summary || ""), this.$.description.setValue(e.description || "");
},
submit: function(e, t) {
return e.title = this.$.title.getValue(), e.summary = this.$.summary.getValue(), e.description = this.$.description.getValue(), e.title ? !0 : (alert(_("Title should not be empty")), !1);
}
}), enyo.kind({
name: "ContentNew",
kind: "ContentEdit",
statics: {
navid: "content-new",
label: _("New content"),
resource: "context",
data: {
type: [ "content" ]
},
permissions_authenticated: !0
}
}), enyo.kind({
name: "ContentUpdate",
kind: "Dialog",
statics: {
navid: "content-update",
label: _("New version"),
permissions_author: !0
},
components: [ {
kind: "InputDecorator",
label: _("Version"),
components: [ {
name: "version",
kind: "onyx.Input",
oninput: "_oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("License"),
components: [ {
name: "license",
kind: "onyx.Input",
oninput: "_oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Stability"),
components: [ {
name: "stability",
kind: "Group",
highlander: !0,
onActivate: "_oninput",
components: stabilitiesList.map(function(e) {
return {
kind: "InlineRadioButton",
value: e[0],
content: e[1]
};
})
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Release notes"),
components: [ {
name: "notes",
kind: "onyx.TextArea",
oninput: "_oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Upload file"),
components: [ {
name: "file",
kind: "Input",
type: "file",
onchange: "_file_onchange"
}, {
tag: "br"
}, {
name: "notice",
classes: "content-notice"
} ]
} ],
buttons: [ {
name: "submit",
kind: "DialogButton",
content: _("Submit"),
ontap: "_submit_ontap"
} ],
onenter: function(e) {
this.context = e.data.guid, this._disable(!1), this._oninput();
},
_oninput: function() {
with (this.$) var fully_set = version.getValue() && license.getValue() && stability.active && notes.getValue() && file.node.files.length;
this.$.submit.setDisabled(!fully_set);
},
_file_onchange: function(e, t) {
var n = t.target.files[0];
this.$.notice.setContent(enyo.format("%s, %s", n.type || "Unknown type", enyo.format(_("%s byte(s)"), n.size))), this._oninput();
},
_submit_ontap: function() {
this._disable(!0);
var e = {
context: this.context,
version: this.$.version.getValue(),
license: splitString(this.$.license.getValue()),
stability: this.$.stability.active.value,
notes: this.$.notes.getValue()
};
sugar_network.Connection.post([ "implementation" ], undefined, e, enyo.bind(this, function(e) {
sugar_network.Connection.putBlob([ "implementation", e, "data" ], undefined, this.$.file.node.files[0], enyo.bind(this, function() {
this._reset(), enyo.Signals.send("onZapSubspace");
}), enyo.bind(this, function(e, t) {
this._disable(!1), alert(t);
}));
}), enyo.bind(this, function(e, t) {
this._disable(!1), alert(t);
}));
},
_disable: function(e) {
for (var t in this.$) t = this.$[t], t.setDisabled && t.setDisabled(e);
},
_reset: function() {
for (var e in this.$) e = this.$[e], e.setValue && e.setValue("");
this.$.stability.setActive(null), this.$.notice.setContent("");
}
}), enyo.kind({
name: "ContentUsers",
kind: "Users",
statics: {
navid: "content-users",
label: _("Users"),
resource: "context",
permissions_author: !0
}
});

// src/packages.js

enyo.kind({
name: "Packages",
kind: "Table",
client_classes: "list-client",
cellBounds: "list-row-bounds",
statics: {
navid: "packages",
sidebar: "PackagesSidebar",
searchable: !0,
subspace: "PackageHome",
resource: "context",
fields: [ "guid", "author", "layer", "title", "summary", "icon" ],
label: _("Packages")
},
cell: {
classes: "list-row",
ontap: "select",
components: [ {
name: "icon",
kind: "Image",
classes: "list-icon"
}, {
name: "title",
classes: "list-title"
}, {
name: "summary",
classes: "list-summary"
} ]
},
onenter: function(e) {
this.cursor.document || (this.cursor.reply = this.ctor.fields, this.cursor.filter.type = "package", this.cursor.setDocument(this.ctor.resource));
},
stubCell: function(cell) {
with (cell.$) icon.setSrc(""), title.setContent(stubContent), summary.setContent(stubContent);
},
setupCell: function(event) {
var result = this.inherited(arguments);
if (result) with (event.cell.$) icon.setSrc(event.data.icon), title.setContent(event.data.title), summary.setContent(event.data.summary);
return result;
}
}), enyo.kind({
name: "PackagesSidebar",
kind: "ContextSidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png",
components: [ {
kind: "Group",
highlander: !0,
components: [ {
name: "Questions",
kind: "SidebarButton",
src: "images/question.png",
content: _("Questions")
}, {
name: "Ideas",
kind: "SidebarButton",
src: "images/idea.png",
content: _("Ideas")
}, {
name: "Problems",
kind: "SidebarButton",
src: "images/problem.png",
content: _("Problems")
} ]
} ]
}, {
label: _("Authoring"),
icon: "images/edit.png",
permissions_authenticated: !0,
components: [ {
kind: "Group",
components: [ {
name: "PackageNew",
kind: "SidebarButton",
src: "images/add.png",
content: _("Submit new package"),
data: {}
} ]
} ]
} ]
}), enyo.kind({
name: "PackageHome",
kind: "Workspace",
statics: {
title: "title",
sidebar: "PackageHomeSidebar"
},
components: [ {
kind: "InputDecorator",
label: "Resolving status",
classes: "packages-status",
components: [ {
name: "packages"
} ]
}, {
kind: "Signals",
onServerEvent: "_onServerEvent"
} ],
onenter: function(e) {
e.data.guid != this.context && (this.context = e.data.guid, this._setup_status({
packages: null
}), sugar_network.Connection.get([ "context", this.context ], {
reply: [ "packages" ]
}, enyo.bind(this, "_setup_status")));
},
_setup_status: function(e) {
for (var t in e) {
if (!this.$[t]) continue;
e[t] ? this.$[t].setContent(enyo.json.stringify(e[t], null, 2)) : this.$[t].setContent("");
}
},
_onServerEvent: function(e, t) {
(!t.mountpoint || t.mountpoint == "/") && t.document == "context" && t.guid == this.context && this._setup_status(t.props);
}
}), enyo.kind({
name: "PackageHomeSidebar",
kind: "ContextSidebar",
components: [ {
label: _("Menu"),
icon: "images/menu.png",
components: [ {
kind: "Group",
highlander: !0,
components: [ {
name: "Questions",
kind: "SidebarButton",
src: "images/question.png",
content: _("Questions")
}, {
name: "Ideas",
kind: "SidebarButton",
src: "images/idea.png",
content: _("Ideas")
}, {
name: "Problems",
kind: "SidebarButton",
src: "images/problem.png",
content: _("Problems")
} ]
} ]
}, {
label: _("Authoring"),
icon: "images/edit.png",
permissions_author: !0,
components: [ {
kind: "Group",
components: [ {
name: "PackageEdit",
kind: "SidebarButton",
src: "images/edit.png",
content: _("Edit properties")
}, {
name: "PackageUsers",
kind: "SidebarButton",
src: "images/xo.png",
content: _("Manage users")
} ]
} ]
} ]
}), enyo.kind({
name: "PackageEdit",
kind: "DataDialog",
distros: [ "Debian", "Fedora", "Ubuntu" ],
statics: {
navid: "package-edit",
label: _("Properties"),
resource: "context",
permissions_author: !0
},
fields: [ "aliases" ],
initComponents: function() {
var e = [];
for (var t in this.distros) e.push({
label: this.distros[t],
components: [ {
kind: "InputDecorator",
label: _("Binary package(s)"),
components: [ {
name: this.distros[t] + "_binary",
kind: "onyx.Input",
oninput: "oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Development package(s)"),
components: [ {
name: this.distros[t] + "_devel",
kind: "onyx.Input",
oninput: "oninput"
} ]
} ]
});
this.components = [ {
kind: "InputDecorator",
label: _("Name"),
components: [ {
name: "name",
kind: "onyx.Input",
oninput: "oninput"
} ]
}, {
tag: "br"
}, {
kind: "InputDecorator",
label: _("Summary"),
components: [ {
name: "summary",
kind: "onyx.Input",
oninput: "oninput"
} ]
}, {
tag: "br"
}, {
content: _("Mapping to GNU/Linux distribution packages:")
}, {
name: "distros",
kind: "sugar_network.Tabs",
classes: "packages-map",
components: e
} ], this.inherited(arguments), this._distros = [], enyo.forEach(this.distros, function(e) {
this._distros.push({
name: e,
binary: this.$[e + "_binary"],
devel: this.$[e + "_devel"]
});
}, this);
},
disable: function(e) {
this.$.name.setDisabled(this.kind == "PackageEdit");
var t = this.$.distros.getPanels();
for (var n in t) t[n].setShowing(!e);
this.$.distros.render();
},
setup: function(e) {
this.$.name.setValue(e.title || ""), this.$.summary.setValue(e.summary || ""), e.aliases || (e.aliases = {}), enyo.forEach(this._distros, function(t) {
var n = (e.aliases[t.name] || {})["*"] || {};
t.binary.setValue((n.binary || []).join(" ")), t.devel.setValue((n.devel || []).join(" "));
});
},
submit: function(e, t) {
if (!t.guid) {
e.type = [ "package" ], e.implement = this.$.name.getValue(), e.title = this.$.name.getValue();
if (!e.title) return alert(_("Name should not be empty")), !1;
}
return e.summary = e.description = this.$.summary.getValue(), e.aliases || (e.aliases = {}), enyo.forEach(this._distros, function(t) {
e.aliases[t.name] = {
"*": {
binary: splitString(t.binary.getValue()),
devel: splitString(t.devel.getValue())
}
};
}), !0;
}
}), enyo.kind({
name: "PackageNew",
kind: "PackageEdit",
statics: {
navid: "package-new",
label: _("New package"),
resource: "context",
data: {},
permissions_authenticated: !0
}
}), enyo.kind({
name: "PackageUsers",
kind: "Users",
statics: {
navid: "package-users",
label: _("Users"),
resource: "context",
permissions_author: !0
}
});

// src/users.js

enyo.kind({
name: "Users",
kind: "Workspace"
});

// src/layers.js

enyo.kind({
name: "LayersTab",
statics: {
label: _("Layers"),
icon: "images/layers.png",
permissions_editor: !0
},
components: [ {
name: "selected_layer",
kind: "Group",
highlander: !0,
components: [ {
name: "layers",
kind: "Repeater",
onSetupItem: "_setup_layer",
components: [ {
name: "layer",
onleave: "_layer_onleave",
onenter: "_layer_onenter",
components: [ {
name: "view",
kind: "onyx.Checkbox",
classes: "layers-view",
onActivate: "_layer_view_onActivate"
}, {
name: "edit",
kind: "onyx.IconButton",
src: "images/edit.png",
classes: "layers-edit",
onActivate: "_layer_edit_onActivate"
} ]
} ]
}, {
name: "view_rest",
kind: "onyx.Checkbox",
classes: "layers-view",
content: _("Not included to any layers"),
onActivate: "_layer_view_onActivate"
} ]
} ],
constructor: function() {
this.inherited(arguments), this._layers = [ "peruvian-pilot" ], this._reversed_layers = [];
for (var e in this._layers) this._reversed_layers.push("!" + this._layers[e]);
this._table = null, this._filter = [];
},
create: function() {
this.inherited(arguments), this.$.layers.setCount(this._layers.length);
},
onenter: function() {
var e = {};
enyo.Signals.send("onDiscoverTable", e);
if (!e.table) return;
var t = e.table.cursor.filter.layer || [];
enyo.forEach(this.$.layers.getClientControls(), function(e) {
e.$.view.setChecked(t.length == 0 || t.indexOf(e.$.view.content) >= 0);
}), this.$.view_rest.setChecked(t.length == 0 || t.indexOf(this._reversed_layers[0]) >= 0), this._table = e.table;
var n = this.$.selected_layer.active;
n && this._table.setLayer(n.layer);
},
onleave: function() {
this._table && this._table.setLayer(null), this._table = null;
},
_layer_view_onActivate: function(e, t) {
if (this._table) {
var n = [];
enyo.forEach(this._filter, function(e) {
e.checked && n.push(e.content);
}), this.$.view_rest.checked ? n.length == this._filter.length ? n = [] : n = n.concat(this._reversed_layers) : n.length == 0 && n.push("empty"), this._table.cursor.updateFilter({
layer: n
});
}
return !0;
},
_setup_layer: function(sender, event) {
var layer_info = this._layers[event.index];
with (event.item.$) App.roles.deployer ? (edit.layer = layer_info, edit.focused = !1, event.index == 0 && edit.setActive(!0)) : edit.hide(), view.setContent(layer_info), this._filter.push(view);
},
_layer_onenter: function(sender) {
with (sender.parent.$) edit.active || edit.applyStyle("visibility", "visible"), edit.focused = !0;
},
_layer_onleave: function(sender, event) {
with (sender.parent.$) edit.active || edit.applyStyle("visibility", "hidden"), edit.focused = !1;
},
_layer_edit_onActivate: function(e) {
e.active ? (this._table && this._table.setLayer(e.layer), e.applyStyle("visibility", "visible")) : e.focused || e.applyStyle("visibility", "hidden");
}
});

// src/app.js

enyo.kind({
name: "App",
classes: "app enyo-unselectable",
showing: !1,
statics: {
initiated: !1,
proxied: !1,
principal: null,
roles: {},
dateShortFormat: null,
_launches: 0,
addLauncher: function() {
App._launches == 0 && (document.body.style.cursor = "progress"), App._launches += 1;
},
removeLauncher: function() {
App._launches -= 1, App._launches == 0 ? document.body.style.cursor = "" : App._launches < 0 && (console.error("App.removeLauncher: App._launches < 0"), App._launches = 0);
}
},
components: [ {
classes: "navibar",
components: [ {
name: "navibar",
kind: "Navibar"
}, {
kind: "SearchEntry"
} ]
}, {
name: "sidebar",
kind: "Panels",
classes: "sidebar",
draggable: !1
}, {
classes: "workspaces-footer"
}, {
name: "subspaces",
kind: "Panels",
classes: "workspaces",
draggable: !1
}, {
kind: "Signals",
onSwitchSubspace: "_onSwitchSubspace",
onServerEvent: "_onServerEvent"
} ],
constructor: function() {
this.inherited(arguments), enyo.dom.applyBodyFit();
var e = self.document.URL.match("[^:]+://[^/]+");
self.document.domain in {
localhost: null,
"127.0.0.1": null
} || (e += "/api"), sugar_network.Connection.apiUrl = e, sugar_network.Connection.get([], {
cmd: "whoami"
}, enyo.bind(this, "_startup"));
},
_startup: function(e) {
App.proxied = e.route == "proxy", App.principal = e.guid;
for (var t in e.roles) t = e.roles[t], App.roles[t] = !0, t == "root" && (App.principal || (App.principal = "anonymous"), App.roles.deployer = !0, App.roles.editor = !0);
App.initiated = !0, this.show(), this.render(), enyo.g11n._locale = new enyo.g11n.Locale("en"), App.dateShortFormat = new enyo.g11n.DateFmt({
date: "short",
time: "short",
locale: enyo.g11n.currentLocale()
});
var n = window.location.search.slice(1).split("&");
n.length ? this.$.navibar.restore(n) : enyo.Signals.send("onOpenSubspace", {
subspace: "Main",
level: 0
});
},
_onSwitchSubspace: function(e, t) {
var n = findOrCreatePanel(this.$.sidebar, "kind", t.sidebar, {});
n.control.onenter && n.control.onenter(t), this.$.sidebar.setIndex(n.index);
var r = findOrCreatePanel(this.$.subspaces, "kind", t.subspace, {
sidebar: n.control
});
r.control.sidebar = n.control, r.control.onenter && r.control.onenter(t), this.$.subspaces.setIndex(r.index);
},
_onServerEvent: function(e, t) {
t.event == "launch" && (t.state == "failure" || t.state == "exec") && App.removeLauncher();
}
});
