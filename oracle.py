import json, random

def dec2(n):
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s
def hu(n, d): return (2*n + d) // (2*d)

def volume(l, w, h):
    cuft = l*w*h
    cuyd100 = hu(cuft*100, 27)
    return f"The bunker of {l} ft by {w} ft wide by {h} ft tall holds {cuft} cu ft, or {dec2(cuyd100)} cu yd."
def tonnage(v, d):
    lbs = v*d
    tons100 = hu(lbs*100, 2000)
    return f"The {v} cu ft at {d} pounds a cubic foot makes {lbs} pounds, or {dec2(tons100)} tons of silage."
def days(p, n, r):
    per = n*r
    dd = p // per
    return f"The {p} pounds feeding {n} head at {r} pounds each a day last {dd} " + ("day" if dd == 1 else "days") + "."
def face(n, r, d, w, h):
    cuft100 = hu(n*r*100, d)
    area = w*h
    in100 = hu(cuft100*12, area)
    return (f"The herd of {n} head at {r} pounds each eats {dec2(cuft100)} cu ft a day "
            f"off the {area} sq ft face, or {dec2(in100)} inches a day.")

random.seed(750)
cases = [
  dict(fn="volume", args=["80","30","10"], expect=volume(80,30,10)),
  dict(fn="tonnage", args=["24000","40"], expect=tonnage(24000,40)),
  dict(fn="days", args=["960000","100","50"], expect=days(960000,100,50)),
  dict(fn="face", args=["100","50","40","30","10"], expect=face(100,50,40,30,10)),
]
for _ in range(25):
    l = random.randint(1,1000); w = random.randint(1,200); h = random.randint(1,50)
    cases.append(dict(fn="volume", args=[str(l),str(w),str(h)], expect=volume(l,w,h)))
for _ in range(25):
    v = random.randint(1,10000000); d = random.randint(1,100)
    cases.append(dict(fn="tonnage", args=[str(v),str(d)], expect=tonnage(v,d)))
for _ in range(20):
    p = random.randint(1,1000000000); n = random.randint(1,100000); r = random.randint(1,200)
    cases.append(dict(fn="days", args=[str(p),str(n),str(r)], expect=days(p,n,r)))
for _ in range(20):
    n = random.randint(1,100000); r = random.randint(1,200); d = random.randint(1,100)
    w = random.randint(1,200); h = random.randint(1,50)
    cases.append(dict(fn="face", args=[str(n),str(r),str(d),str(w),str(h)], expect=face(n,r,d,w,h)))
errcases = [
  ["volume", ["0","30","10"]], ["volume", ["80","0","10"]], ["volume", ["80","30","0"]],
  ["tonnage", ["0","40"]], ["tonnage", ["24000","0"]],
  ["days", ["0","100","50"]], ["days", ["960000","0","50"]], ["days", ["960000","100","0"]],
  ["face", ["0","50","40","30","10"]], ["face", ["100","50","0","30","10"]], ["face", ["100","50","40","0","10"]], ["face", ["100","50","40","30","0"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
