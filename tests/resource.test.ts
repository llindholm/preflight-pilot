import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {createHash} from "node:crypto";
import {track} from "../lib/analytics";
import sitemap from "../app/sitemap";
test("resource downloads retain their frozen bytes",()=>{const root=new URL("../public/resources/wc27/",import.meta.url);const manifest=JSON.parse(readFileSync(new URL("sha256.json",root),"utf8"));assert.equal(Object.keys(manifest).length,7);for(const [n,h]of Object.entries(manifest))assert.equal(createHash("sha256").update(readFileSync(new URL(n,root))).digest("hex"),h);});
test("resource events contain event names only and no application answers",()=>{const prior=Object.getOwnPropertyDescriptor(globalThis,"window");const events:CustomEvent[]=[];Object.defineProperty(globalThis,"window",{configurable:true,value:{dispatchEvent:(e:CustomEvent)=>events.push(e)}});try{for(const name of ["resource_visit","resource_worked_review_reveal","resource_pdf_click","resource_pilot_click"] as const)track(name);assert.equal(events.length,4);for(const e of events){assert.equal(e.type,"preflight:analytics");assert.deepEqual(Object.keys(e.detail),["name"]);}}finally{if(prior)Object.defineProperty(globalThis,"window",prior);else Reflect.deleteProperty(globalThis,"window");}});
test("sitemap preserves the pilot and includes the canonical resource",()=>assert.deepEqual(sitemap().map(x=>x.url),["https://preflight.lhlapps.com/","https://preflight.lhlapps.com/resources/millwork-shop-drawing-review"]));
