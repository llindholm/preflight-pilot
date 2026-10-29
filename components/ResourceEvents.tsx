"use client";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
// Reuse the existing event-only adapter. No provider, storage, identity or URL payload.
export default function ResourceEvents() {
 const visited=useRef(false);
 useEffect(()=>{
  if(!visited.current){track("resource_visit");visited.current=true;}
  const click=(event:MouseEvent)=>{const a=(event.target as Element)?.closest?.("a[data-resource-event]");if(a?.getAttribute("data-resource-event")==="pdf")track("resource_pdf_click");if(a?.getAttribute("data-resource-event")==="pilot")track("resource_pilot_click");};
  const toggle=(event:Event)=>{const el=event.target;if(el instanceof HTMLDetailsElement&&el.id==="worked-review"&&el.open)track("resource_worked_review_reveal");};
  document.addEventListener("click",click);document.addEventListener("toggle",toggle,true);
  return()=>{document.removeEventListener("click",click);document.removeEventListener("toggle",toggle,true);};
 },[]);
 return null;
}
