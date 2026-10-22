const fs = require("fs");
eval(fs.readFileSync("engine.js", "utf8"));
const exp = JSON.parse(fs.readFileSync("expected.json", "utf8"));
const fns = { volume: volumeTruth, tonnage: tonnageTruth, days: daysTruth, face: faceTruth };
let fail = 0;
for (const c of exp.cases) {
  const got = fns[c.fn](...c.args);
  if (got !== c.expect) { fail++; console.log("MISMATCH", c.fn, c.args, "\n got:", got, "\n exp:", c.expect); }
}
const ERRS = ["the bunker length must be from 1 to 1000 ft with no decimal places",
  "the bunker width must be from 1 to 200 ft with no decimal places",
  "the pile height must be from 1 to 50 ft with no decimal places",
  "the volume must be from 1 to 10000000 cu ft with no decimal places",
  "the density must be from 1 to 100 pounds a cubic foot with no decimal places",
  "the pounds must be from 1 to 1000000000 with no decimal places",
  "the herd size must be from 1 to 100000 head with no decimal places",
  "the rate must be from 1 to 200 pounds a head a day with no decimal places"];
for (const [fn, args] of exp.errors) {
  let threw = null;
  try { fns[fn](...args); } catch (e) { threw = e.message; }
  if (!threw || !ERRS.includes(threw)) { fail++; console.log("ERRCASE FAIL", fn, args, "->", threw); }
}
console.log(fail ? `${fail} FAILURES` : "all green");
process.exit(fail ? 1 : 0);
