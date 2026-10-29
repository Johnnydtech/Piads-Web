// Export integrity tests: real pdf-lib, deterministic image capture, no browser or network.
const assert = require('node:assert/strict')
const fs = require('node:fs')
const ts = require('typescript')
const Module = require('node:module')
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, file) => {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } }).outputText
  module._compile(output, file)
}
const originalLoad = Module._load
Module._load = function (id, ...args) {
  if (id === 'html-to-image') return { toPng: async () => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIHWP4z8DwHwAFgAI/ScLbtAAAAABJRU5ErkJggg==' }
  return originalLoad.call(this, id, ...args)
}
const { availableKitPages, buildKitPdf, DEFAULT_KIT, guideReview, customLines } = require('../app/(marketing)/airbnb-welcome-book-generator/kit.tsx')
const { PDFDocument, PDFName, PDFArray } = require('pdf-lib')
global.document = { fonts: { ready: Promise.resolve() } }
const data = { propertyName: 'A guest house', city: 'Austin', message: '', checkout: '', details: { ...DEFAULT_KIT }, picks: [] }
assert.deepEqual(availableKitPages(data).map(p => p.key), ['cover','arrival','welcome','checkout'])
assert.ok(!availableKitPages(data).some(p => p.key === 'messages'), 'host messages must never go in the guest book')
assert.equal(guideReview(data).filter(x => x.ready).length, 1)
assert.deepEqual(customLines(' one\n\n two \nthree\nfour\nfive'), ['one','two','three','four'])
const complete = { ...data, details: { ...DEFAULT_KIT, homeTips:'TV instructions', rules:['No smoking'], hostContact:'Message your host', arrival:'Side door', parking:'Driveway', wifiName:' Guest WiFi ' }, picks: Array.from({length:8},(_,i) => ({place_id:`id${i}`,name:`Place ${i}`})) }
assert.equal(availableKitPages(complete).length, 8)
const safe = 'https://www.google.com/maps/search/?api=1&query=Cafe'
const node = {
  querySelector: () => ({ scrollHeight: 800, clientHeight: 875 }),
  querySelectorAll: type => type === 'img' ? [] : [{ href:safe, getBoundingClientRect:()=>({ left:100, top:200, right:600, bottom:300 }) }, { href:'javascript:alert(1)',getBoundingClientRect:()=>({}) }],
  getBoundingClientRect: () => ({left:0,top:0})
}
;(async () => {
  for (const paper of ['letter','a4']) {
    const blob = await buildKitPdf([node,node], { paper, title:'Our guest book' })
    const pdf = await PDFDocument.load(await blob.arrayBuffer())
    assert.equal(pdf.getPageCount(),2)
    assert.equal(pdf.getTitle(),'Our guest book')
    const page = pdf.getPage(0)
    assert.ok(Math.abs(page.getWidth() - (paper === 'a4' ? 595.28 : 612)) < .01)
    const annotations = page.node.lookup(PDFName.of('Annots'), PDFArray)
    assert.equal(annotations.size(),1,'only approved map links get PDF actions')
    const link = pdf.context.lookup(annotations.get(0))
    const action = link.lookup(PDFName.of('A'))
    assert.equal(action.lookup(PDFName.of('URI')).decodeText(),safe)
    const rect = link.lookup(PDFName.of('Rect'),PDFArray).asArray().map(n=>n.asNumber())
    assert.ok(rect[0]>=0 && rect[2]<=page.getWidth() && rect[1]>=0 && rect[3]<=page.getHeight())
    assert.ok(rect[0]<rect[2] && rect[1]<rect[3])
  }
  await assert.rejects(()=>buildKitPdf([]), /Choose at least one/)
  await assert.rejects(()=>buildKitPdf([{...node,querySelector:()=>({scrollHeight:1100,clientHeight:875})}]), /too much text/)
  await assert.rejects(()=>buildKitPdf([{...node,querySelectorAll:type=>type==='img'?[{decode:()=>Promise.reject(new Error('Missing image'))}]:[]}]), /Missing image/)
  console.log('Guest-book page selection, Letter/A4 PDF, clickable links, overflow and image failure checks passed.')
})().catch(e=>{ console.error(e); process.exitCode=1 })
