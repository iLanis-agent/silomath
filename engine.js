// Silo Math engine: bunker silo volume, silage tonnage from density, the days a herd eats through the pile, and the face removal in inches a day. Exact integers (hundredths where shown), half-up on display only. Every number is the owner's own entry off the bunker and the feed sheet.
function _i(t, err, digits, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  if (!new RegExp("^[0-9]{1," + digits + "}$").test(t)) throw new Error(err);
  var v = parseInt(t, 10);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _LEN = "the bunker length must be from 1 to 1000 ft with no decimal places";
var _WID = "the bunker width must be from 1 to 200 ft with no decimal places";
var _HT = "the pile height must be from 1 to 50 ft with no decimal places";
var _CUFT = "the volume must be from 1 to 10000000 cu ft with no decimal places";
var _DENS = "the density must be from 1 to 100 pounds a cubic foot with no decimal places";
var _LBS = "the pounds must be from 1 to 1000000000 with no decimal places";
var _HEAD = "the herd size must be from 1 to 100000 head with no decimal places";
var _RATE = "the rate must be from 1 to 200 pounds a head a day with no decimal places";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _hu(n, d) { return Math.floor((2 * n + d) / (2 * d)); }

function volumeTruth(lenft, widft, htft) {
  var l = _i(lenft, _LEN, 4, 1, 1000), w = _i(widft, _WID, 3, 1, 200), h = _i(htft, _HT, 2, 1, 50);
  var cuft = l * w * h;
  var cuyd100 = _hu(cuft * 100, 27);
  return "The bunker of " + l + " ft by " + w + " ft wide by " + h + " ft tall holds " + cuft + " cu ft, or " + _dec(cuyd100, 2) + " cu yd.";
}
function tonnageTruth(cuft, density) {
  var v = _i(cuft, _CUFT, 8, 1, 10000000), d = _i(density, _DENS, 3, 1, 100);
  var lbs = v * d;
  var tons100 = _hu(lbs * 100, 2000);
  return "The " + v + " cu ft at " + d + " pounds a cubic foot makes " + lbs + " pounds, or " + _dec(tons100, 2) + " tons of silage.";
}
function daysTruth(pounds, head, rate) {
  var p = _i(pounds, _LBS, 10, 1, 1000000000), n = _i(head, _HEAD, 6, 1, 100000), r = _i(rate, _RATE, 3, 1, 200);
  var per = n * r;
  var days = Math.floor(p / per);
  return "The " + p + " pounds feeding " + n + (n === 1 ? " head" : " head") + " at " + r + " pounds each a day last " + days + (days === 1 ? " day" : " days") + ".";
}
function faceTruth(head, rate, density, widft, htft) {
  var n = _i(head, _HEAD, 6, 1, 100000), r = _i(rate, _RATE, 3, 1, 200), d = _i(density, _DENS, 3, 1, 100);
  var w = _i(widft, _WID, 3, 1, 200), h = _i(htft, _HT, 2, 1, 50);
  var cuft100 = _hu(n * r * 100, d);
  var area = w * h;
  var in100 = _hu(cuft100 * 12, area);
  return "The herd of " + n + (n === 1 ? " head" : " head") + " at " + r + " pounds each eats " + _dec(cuft100, 2) + " cu ft a day off the " + area + " sq ft face, or " + _dec(in100, 2) + " inches a day.";
}
