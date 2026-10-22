# Silo Math

Bunker silo silage arithmetic. The bunker of 80 ft by 30 ft wide by 10 ft tall holds 24000 cu ft of silage.

## What it computes

- **The volume truth** - volume: the length (1 to 1000 ft) times the width (1 to 200 ft) times the pile height (1 to 50 ft), in cubic feet and cubic yards.
- **The tonnage truth** - tonnage: the volume (1 to 10000000 cu ft) times the density (1 to 100 pounds a cubic foot), in pounds and tons.
- **The days truth** - days: the pounds (1 to 1000000000) divided by the herd (1 to 100000 head) times the rate (1 to 200 pounds a head a day).
- **The face truth** - face removal: what the herd eats each day, as cubic feet and as inches off the face.

## Boundary

Arithmetic only. Silage counting, applied as written. It has not seen any bunker and does not know the packing, the moisture, the shrink, the spoilage or the ration, and it gives no verdict that a density is safe or a rate is enough. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/silomath/
Repo: https://github.com/iLanis-agent/silomath
