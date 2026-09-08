import test from "node:test";
import assert from "node:assert/strict";
import worker from "./review-worker.mjs";
const origin="https://piads-review.example";
const submit=(body,headers={})=>new Request(origin+"/api/newsletter",{method:"POST",headers:{"Content-Type":"application/json",Origin:origin,...headers},body:JSON.stringify(body)});

test("serves site pages through the static asset binding",async()=>{
 let seen;
 const response=await worker.fetch(new Request(origin+"/alternative-to/juuno-alternative"),{ASSETS:{fetch:async request=>{seen=new URL(request.url).pathname;return new Response("comparison page")}}});
 assert.equal(seen,"/alternative-to/juuno-alternative");assert.equal(await response.text(),"comparison page");
});
test("forwards only supported newsletter fields and never viewer credentials",async()=>{
 const original=globalThis.fetch;let seen;
 globalThis.fetch=async(url,init)=>{seen={url,init};return Response.json({success:true})};
 try {const response=await worker.fetch(submit({email:"host@example.com",page:origin+"/blog",secret:"discard"},{Authorization:"Bearer viewer-token",Cookie:"session=private"}),{});
 assert.equal(response.status,200);assert.equal(seen.url,"https://www.piads.co/api/newsletter");
 assert.deepEqual(JSON.parse(seen.init.body),{email:"host@example.com",page:origin+"/blog"});
 assert.deepEqual(seen.init.headers,{"Content-Type":"application/json"});
 }finally{globalThis.fetch=original}
});
test("rejects invalid origins and oversized payloads without forwarding",async()=>{
 assert.equal((await worker.fetch(submit({email:"host@example.com"},{Origin:"https://other.example"}),{})).status,403);
 assert.equal((await worker.fetch(submit({email:"host@example.com",page:"x".repeat(17000)}),{})).status,413);
 assert.equal((await worker.fetch(submit({email:"invalid"}),{})).status,400);
 assert.equal((await worker.fetch(new Request(origin+"/api/newsletter"),{})).status,405);
});
test("reports upstream failure without claiming a successful subscription",async()=>{
 const original=globalThis.fetch;
 try {globalThis.fetch=async()=>new Response("Unavailable",{status:503});assert.equal((await worker.fetch(submit({email:"host@example.com"}),{})).status,502);
 globalThis.fetch=async()=>Response.json({success:false});assert.equal((await worker.fetch(submit({email:"host@example.com"}),{})).status,502);
 }finally{globalThis.fetch=original}
});
test("retains legacy guide redirects on the current site",async()=>{
 const response=await worker.fetch(new Request(origin+"/blog/dayparts-explained"),{});
 assert.equal(response.status,301);assert.equal(response.headers.get("Location"),origin+"/blog/digital-menu-boards-increase-restaurant-sales");
});
