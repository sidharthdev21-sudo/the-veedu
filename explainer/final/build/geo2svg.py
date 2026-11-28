"""Convert Kerala district GeoJSON to simplified SVG paths (JSON). Usage: geo2svg.py in.geojson out.json"""
import json, sys, math
g = json.load(open(sys.argv[1]))
W, H = 620, 900
pts = []
def rings(geom):
    cs = geom["coordinates"]
    return [r for poly in (cs if geom["type"] == "MultiPolygon" else [cs]) for r in poly]
for f in g["features"]:
    for r in rings(f["geometry"]): pts += r
lons = [p[0] for p in pts]; lats = [p[1] for p in pts]
k = math.cos(math.radians(sum(lats) / len(lats)))
x0, x1, y0, y1 = min(lons) * k, max(lons) * k, min(lats), max(lats)
s = min((W - 20) / (x1 - x0), (H - 20) / (y1 - y0))
def P(p): return ((p[0] * k - x0) * s + 10, (y1 - p[1]) * s + 10)
def simplify(r, tol=1.2):
    out = [r[0]]
    for p in r[1:]:
        if math.dist(p, out[-1]) >= tol: out.append(p)
    return out
res = {}
for f in g["features"]:
    d = ""
    for r in rings(f["geometry"]):
        r = simplify([P(p) for p in r])
        if len(r) < 3: continue
        d += "M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in r) + "Z"
    name = f["properties"]["DISTRICT"]
    res[name] = res.get(name, "") + d
kochi = P((76.31, 10.02))  # Edappally, Kochi (approx.)
# Approximate hospital locations (for a schematic marker only)
amrita = P((76.2932, 10.0329)); aster = P((76.2773, 10.0475))
json.dump({"w": W, "h": H, "districts": res, "kochi": [round(kochi[0],1), round(kochi[1],1)], "amrita": [round(amrita[0],1), round(amrita[1],1)], "aster": [round(aster[0],1), round(aster[1],1)]}, open(sys.argv[2], "w"))
print(list(res), sum(len(v) for v in res.values()))
