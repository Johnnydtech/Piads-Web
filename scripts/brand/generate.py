"""Generate outlined brand SVGs using the fonts already downloaded by next build.
Requires fonttools + brotli. Then run node scripts/brand/render.mjs.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

root = Path(__file__).resolve().parents[2]
fonts = {}
for path in (root/'.next/static/media').glob('*.woff2'):
    f = TTFont(path)
    if all(c in f.getBestCmap() for c in range(32,127)) and f['name'].getDebugName(2) == 'Regular':
        fonts[f['name'].getDebugName(1)] = f

def text(value, x, y, size, family='Instrument Sans', color='#183d32'):
    f=fonts[family]; glyphs=f.getGlyphSet(); cmap=f.getBestCmap(); scale=size/f['head'].unitsPerEm
    out=[]
    for char in value:
        glyph=glyphs[cmap[ord(char)]]; pen=SVGPathPen(glyphs); glyph.draw(pen)
        out.append(f'<path d="{pen.getCommands()}" transform="translate({x:.3f} {y}) scale({scale} {-scale})" fill="{color}"/>')
        x += glyph.width*scale
    return ''.join(out)

def rect(x,y,w,h,fill,rx=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"/>'

def svg(body,w,h):
    return f'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>'

# A single script P stays readable at browser-tab sizes.
f=fonts['Pacifico']; glyphs=f.getGlyphSet(); glyph=glyphs[f.getBestCmap()[ord('P')]]
b=BoundsPen(glyphs); glyph.draw(b); x0,y0,x1,y1=b.bounds
s=348/max(x1-x0,y1-y0); x=(512-(x1-x0)*s)/2-x0*s; y=(512-(y1-y0)*s)/2+y1*s
pen=SVGPathPen(glyphs); glyph.draw(pen)
icon=rect(0,0,512,512,'#183d32',112)+f'<path d="{pen.getCommands()}" transform="translate({x} {y}) scale({s} {-s})" fill="#f8f5ea"/>'
(root/'public/brand/piads-icon-v2.svg').write_text(svg(icon,512,512))

for kind in ['welcome','generator']:
    body=rect(0,0,1200,630,'#f4f2e8')+rect(650,0,550,630,'#e6eadb')
    body+=text('PiAds',58,112,64,'Pacifico')
    body+=text('FOR HOSTS & PROPERTY MANAGERS',60,166,15)
    lines=['A better stay','starts with hello.'] if kind=='welcome' else ['Your place.','Your free guide.']
    for i,line in enumerate(lines): body+=text(line,57,259+i*77,74,'Instrument Serif')
    desc=['Beautiful guest guides. Welcoming TVs.','One place to manage every property.'] if kind=='welcome' else ['A welcome book with your own style,','Wi-Fi QR code and local favorites.']
    for i,line in enumerate(desc):body+=text(line,60,400+i*29,22)
    body+=rect(58,480,269,54,'#d9f279',27)+text('Create Free with Piads',82,515,22)
    body+=text('piads.co',60,587,19)
    # Editorial book cover and phone, using the same sample artwork as the site.
    body+=rect(705,83,315,440,'#ced3c3',6)+rect(695,73,315,440,'#fffdf4',6)
    body+=text('THE WILLOW HOUSE',720,109,12)+text('Make yourself',720,153,37,'Instrument Serif')+text('at home.',720,193,37,'Instrument Serif')
    body+=text('A little guide to a lovely stay.',720,460,16)+text('ARRIVAL  /  WI-FI  /  LOCAL FAVORITES',720,491,9)
    body+=rect(952,248,192,329,'#102c24',26)+rect(960,257,176,310,'#fffdf4',20)
    body+=rect(1007,264,82,10,'#102c24',5)+text('Welcome, Maya',974,438,26,'Instrument Serif')
    body+=rect(973,452,150,59,'#e9eddf',9)+text('YOUR WI-FI',983,472,9)+text('WillowHouse',983,494,15)
    body+=text('House guide   ·   Explore',975,539,12)
    body+=text('PRINT  ·  PHONE  ·  TV',736,592,14)
    (root/f'public/brand/piads-{kind}-v2.svg').write_text(svg(body,1200,630))
