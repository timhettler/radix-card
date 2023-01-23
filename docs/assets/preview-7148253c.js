import{s}from"./index-d475d2ea.js";var n="storybook/highlight",i="storybookHighlight",_=`${n}/add`,g=`${n}/reset`;const m=__STORYBOOK_MODULE_PREVIEW_API__.addons,E=__STORYBOOK_MODULE_CORE_EVENTS__.STORY_CHANGED;var{document:l}=s,H=(e="#FF4785",t="dashed")=>`
  outline: 2px ${t} ${e};
  outline-offset: 2px;
  box-shadow: 0 0 0 6px rgba(255,255,255,0.6);
`,T=e=>({outline:`2px dashed ${e}`,outlineOffset:2,boxShadow:"0 0 0 6px rgba(255,255,255,0.6)"});module&&module.hot&&module.hot.decline&&module.hot.decline();var h=m.getChannel(),O=e=>{let t=i;d();let a=Array.from(new Set(e.elements)),o=l.createElement("style");o.setAttribute("id",t),o.innerHTML=a.map(r=>`${r}{
          ${H(e.color,e.style)}
         }`).join(" "),l.head.appendChild(o)},d=()=>{let e=i,t=l.getElementById(e);t&&t.parentNode.removeChild(t)};h.on(E,d);h.on(g,d);h.on(_,O);export{T as highlightObject,H as highlightStyle};
//# sourceMappingURL=preview-7148253c.js.map
