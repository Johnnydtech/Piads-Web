import assert from 'node:assert/strict'
import { parseWelcomeHandoff, HANDOFF_TTL, HANDOFF_KEY, readWelcomeHandoff } from '../lib/welcome-handoff.ts'
const now = Date.now()
const valid = { version: 1, createdAt: now, address: '123 Main St', propertyName: 'Cabin', guestName: '', message: 'Welcome', checkout: '10 AM', picks: [{ place_id: 'ChIJ_a-1', name: 'Cafe', blurb: '' }] }
assert.deepEqual(parseWelcomeHandoff({...valid, wifiPassword:'secret', background_url:'http://internal'}, now), valid)
for (const patch of [{createdAt: NaN}, {createdAt: Infinity}, {createdAt: now-HANDOFF_TTL-1}, {createdAt:now+61000}, {address:''}, {message:'x'.repeat(141)}, {picks:[{...valid.picks[0],place_id:'../secret'}]}, {picks:Array(9).fill(valid.picks[0])}]) assert.equal(parseWelcomeHandoff({...valid,...patch}, now), null)
assert.equal(parseWelcomeHandoff({...valid,picks:[...valid.picks,...valid.picks]},now).picks.length, 1)
const items = new Map()
globalThis.sessionStorage = {getItem:k=>items.get(k)??null, setItem:(k,v)=>items.set(k,v),removeItem:k=>items.delete(k)}
items.set(HANDOFF_KEY, JSON.stringify(valid)); assert.deepEqual(readWelcomeHandoff(),valid)
items.set(HANDOFF_KEY,JSON.stringify({...valid,createdAt:0})); assert.equal(readWelcomeHandoff(),null);assert.equal(items.size,0)
console.log('Welcome handoff validation checks passed')

assert.equal(parseWelcomeHandoff({...valid,guideStyle:'postcard'},now).guideStyle,'postcard')
assert.equal(parseWelcomeHandoff({...valid,guideStyle:'javascript:bad'},now),null)
