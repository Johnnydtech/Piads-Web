// Rasterize the outlined SVG sources. No runtime image-generation dependency.
import { ImageResponse } from 'next/og.js';
import { createElement as h } from 'react';
import { readFile, writeFile } from 'node:fs/promises';
for (const kind of ['welcome', 'generator']) {
  const name = `public/brand/piads-${kind}-v2`;
  const data = await readFile(`${name}.svg`);
  const art = `data:image/jpeg;base64,${(await readFile('public/guest-demo/art/illustrated-stay.jpg')).toString('base64')}`;
  const image = new ImageResponse(h('div', {style:{display:'flex',width:1200,height:630,position:'relative'}},
    h('img', {src:`data:image/svg+xml;base64,${data.toString('base64')}`,width:1200,height:630}),
    h('img', {src:art,width:230,height:214,style:{position:'absolute',left:715,top:217,objectFit:'cover'}}),
    h('img', {src:art,width:176,height:126,style:{position:'absolute',left:960,top:281,objectFit:'cover'}})
  ),{width:1200,height:630});
  await writeFile(`${name}.png`, Buffer.from(await image.arrayBuffer()));
}
for (const size of [16,32,48,180,192,512]) {
  const data = await readFile('public/brand/piads-icon-v2.svg');
  const image = new ImageResponse(h('img', {src:`data:image/svg+xml;base64,${data.toString('base64')}`,width:size,height:size}),{width:size,height:size});
  await writeFile(`public/brand/piads-icon-${size}-v2.png`,Buffer.from(await image.arrayBuffer()));
}
// ICO directory wrapping the exact rendered PNGs at each native size.
const sizes = [16,32,48];
const pngs = await Promise.all(sizes.map(size=>readFile(`public/brand/piads-icon-${size}-v2.png`)));
const directory = Buffer.alloc(6 + 16 * sizes.length);
directory.writeUInt16LE(1,2); directory.writeUInt16LE(sizes.length,4);
let offset = directory.length;
for (let i=0;i<sizes.length;i++) {
  const start=6+i*16;
  directory[start]=sizes[i]; directory[start+1]=sizes[i];
  directory.writeUInt16LE(1,start+4); directory.writeUInt16LE(32,start+6);
  directory.writeUInt32LE(pngs[i].length,start+8); directory.writeUInt32LE(offset,start+12);
  offset+=pngs[i].length;
}
await writeFile('public/brand/piads-icon-v2.ico',Buffer.concat([directory,...pngs]));
// Keep legacy URLs current for external links and default favicon requests.
for (const [from,to] of [
 ['brand/piads-icon-v2.ico','favicon.ico'],['brand/piads-icon-v2.ico','logo/favicon.ico'],
 ['brand/piads-icon-16-v2.png','logo/favicon-16x16.png'],['brand/piads-icon-32-v2.png','logo/favicon-32x32.png'],
 ['brand/piads-icon-48-v2.png','logo/favicon.png'],['brand/piads-icon-180-v2.png','logo/apple-touch-icon.png'],
 ['brand/piads-icon-192-v2.png','logo/android-chrome-192x192.png'],['brand/piads-icon-512-v2.png','logo/android-chrome-512x512.png'],
 ['brand/piads-welcome-v2.png','og.png'],['brand/site-v2.webmanifest','logo/site.webmanifest']
]) await writeFile(`public/${to}`,await readFile(`public/${from}`));
