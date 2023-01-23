import{s as v}from"./index-d475d2ea.js";import{d as M}from"./index-356e4a49.js";var p="backgrounds";const O=__STORYBOOK_MODULE_CLIENT_LOGGER__.logger;var{document:s,window:k}=v,h=()=>k.matchMedia("(prefers-reduced-motion: reduce)").matches,B=(r,e=[],n)=>{if(r==="transparent")return"transparent";if(e.find(a=>a.value===r))return r;let t=e.find(a=>a.name===n);if(t)return t.value;if(n){let a=e.map(i=>i.name).join(", ");O.warn(M`
        Backgrounds Addon: could not find the default color "${n}".
        These are the available colors for your story based on your configuration:
        ${a}.
      `)}return"transparent"},y=r=>{(Array.isArray(r)?r:[r]).forEach(S)},S=r=>{let e=s.getElementById(r);e&&e.parentElement.removeChild(e)},x=(r,e)=>{let n=s.getElementById(r);if(n)n.innerHTML!==e&&(n.innerHTML=e);else{let t=s.createElement("style");t.setAttribute("id",r),t.innerHTML=e,s.head.appendChild(t)}},A=(r,e,n)=>{let t=s.getElementById(r);if(t)t.innerHTML!==e&&(t.innerHTML=e);else{let a=s.createElement("style");a.setAttribute("id",r),a.innerHTML=e;let i=`addon-backgrounds-grid${n?`-docs-${n}`:""}`,o=s.getElementById(i);o?o.parentElement.insertBefore(a,o):s.head.appendChild(a)}};const _=__STORYBOOK_MODULE_PREVIEW_API__.useMemo,I=__STORYBOOK_MODULE_PREVIEW_API__.useEffect;var w=(r,e)=>{var c;let{globals:n,parameters:t}=e,a=(c=n[p])==null?void 0:c.value,i=t[p],o=_(()=>i.disable?"transparent":B(a,i.values,i.default),[i,a]),d=_(()=>o&&o!=="transparent",[o]),g=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",u=_(()=>{let l="transition: background-color 0.3s;";return`
      ${g} {
        background: ${o} !important;
        ${h()?"":l}
      }
    `},[o,g]);return I(()=>{let l=e.viewMode==="docs"?`addon-backgrounds-docs-${e.id}`:"addon-backgrounds-color";if(!d){y(l);return}A(l,u,e.viewMode==="docs"?e.id:null)},[d,u,e]),r()};const L=__STORYBOOK_MODULE_PREVIEW_API__.useMemo,T=__STORYBOOK_MODULE_PREVIEW_API__.useEffect;var R=(r,e)=>{var $;let{globals:n,parameters:t}=e,a=t[p].grid,i=(($=n[p])==null?void 0:$.grid)===!0&&a.disable!==!0,{cellAmount:o,cellSize:d,opacity:g}=a,u=e.viewMode==="docs",c=t.layout===void 0||t.layout==="padded"?16:0,l=a.offsetX??(u?20:c),m=a.offsetY??(u?20:c),b=L(()=>{let f=e.viewMode==="docs"?`#anchor--${e.id} .docs-story`:".sb-show-main",E=[`${d*o}px ${d*o}px`,`${d*o}px ${d*o}px`,`${d}px ${d}px`,`${d}px ${d}px`].join(", ");return`
      ${f} {
        background-size: ${E} !important;
        background-position: ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px, ${l}px ${m}px !important;
        background-blend-mode: difference !important;
        background-image: linear-gradient(rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g}) 1px, transparent 1px),
         linear-gradient(rgba(130, 130, 130, ${g/2}) 1px, transparent 1px),
         linear-gradient(90deg, rgba(130, 130, 130, ${g/2}) 1px, transparent 1px) !important;
      }
    `},[d]);return T(()=>{let f=e.viewMode==="docs"?`addon-backgrounds-grid-docs-${e.id}`:"addon-backgrounds-grid";if(!i){y(f);return}x(f,b)},[i,b,e]),r()},Y=[R,w],D={[p]:{grid:{cellSize:20,opacity:.5,cellAmount:5},values:[{name:"light",value:"#F8F8F8"},{name:"dark",value:"#333333"}]}},H={[p]:null};export{Y as decorators,H as globals,D as parameters};
//# sourceMappingURL=preview-3c25c213.js.map
