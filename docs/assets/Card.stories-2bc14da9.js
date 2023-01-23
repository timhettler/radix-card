import{r as s}from"./index-f1f749bf.js";import{_ as P}from"./extends-98964cd2.js";import"./index-96c5f47c.js";import"./_commonjsHelpers-042e6b4d.js";var y={},ce={get exports(){return y},set exports(e){y=e}},k={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var se=s,ie=Symbol.for("react.element"),oe=Symbol.for("react.fragment"),le=Object.prototype.hasOwnProperty,de=se.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,pe={key:!0,ref:!0,__self:!0,__source:!0};function K(e,t,r){var n,a={},c=null,i=null;r!==void 0&&(c=""+r),t.key!==void 0&&(c=""+t.key),t.ref!==void 0&&(i=t.ref);for(n in t)le.call(t,n)&&!pe.hasOwnProperty(n)&&(a[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps,t)a[n]===void 0&&(a[n]=t[n]);return{$$typeof:ie,type:e,key:c,ref:i,props:a,_owner:de.current}}k.Fragment=oe;k.jsx=K;k.jsxs=K;(function(e){e.exports=k})(ce);const L=y.Fragment,l=y.jsx,m=y.jsxs;var O={},ue={get exports(){return O},set exports(e){O=e}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(e){(function(){var t={}.hasOwnProperty;function r(){for(var n=[],a=0;a<arguments.length;a++){var c=arguments[a];if(c){var i=typeof c;if(i==="string"||i==="number")n.push(this&&this[c]||c);else if(Array.isArray(c))n.push(r.apply(this,c));else if(i==="object"){if(c.toString!==Object.prototype.toString&&!c.toString.toString().includes("[native code]")){n.push(c.toString());continue}for(var o in c)t.call(c,o)&&c[o]&&n.push(this&&this[o]||o)}}}return n.join(" ")}e.exports?(r.default=r,e.exports=r):window.classNames=r})()})(ue);const me=O;function D(e,t,{checkForDefaultPrevented:r=!0}={}){return function(a){if(e==null||e(a),r===!1||!a.defaultPrevented)return t==null?void 0:t(a)}}function fe(e,t){typeof e=="function"?e(t):e!=null&&(e.current=t)}function Q(...e){return t=>e.forEach(r=>fe(r,t))}function _e(...e){return s.useCallback(Q(...e),e)}function he(e,t=[]){let r=[];function n(c,i){const o=s.createContext(i),p=r.length;r=[...r,i];function N(u){const{scope:_,children:x,...g}=u,C=(_==null?void 0:_[e][p])||o,ae=s.useMemo(()=>g,Object.values(g));return s.createElement(C.Provider,{value:ae},x)}function f(u,_){const x=(_==null?void 0:_[e][p])||o,g=s.useContext(x);if(g)return g;if(i!==void 0)return i;throw new Error(`\`${u}\` must be used within \`${c}\``)}return N.displayName=c+"Provider",[N,f]}const a=()=>{const c=r.map(i=>s.createContext(i));return function(o){const p=(o==null?void 0:o[e])||c;return s.useMemo(()=>({[`__scope${e}`]:{...o,[e]:p}}),[o,p])}};return a.scopeName=e,[n,ge(a,...t)]}function ge(...e){const t=e[0];if(e.length===1)return t;const r=()=>{const n=e.map(a=>({useScope:a(),scopeName:a.scopeName}));return function(c){const i=n.reduce((o,{useScope:p,scopeName:N})=>{const u=p(c)[`__scope${N}`];return{...o,...u}},{});return s.useMemo(()=>({[`__scope${t.scopeName}`]:i}),[i])}};return r.scopeName=t.scopeName,r}const ee=s.forwardRef((e,t)=>{const{children:r,...n}=e,a=s.Children.toArray(r),c=a.find(Ne);if(c){const i=c.props.children,o=a.map(p=>p===c?s.Children.count(i)>1?s.Children.only(null):s.isValidElement(i)?i.props.children:null:p);return s.createElement(G,P({},n,{ref:t}),s.isValidElement(i)?s.cloneElement(i,void 0,o):null)}return s.createElement(G,P({},n,{ref:t}),r)});ee.displayName="Slot";const G=s.forwardRef((e,t)=>{const{children:r,...n}=e;return s.isValidElement(r)?s.cloneElement(r,{...xe(n,r.props),ref:Q(t,r.ref)}):s.Children.count(r)>1?s.Children.only(null):null});G.displayName="SlotClone";const Ce=({children:e})=>s.createElement(s.Fragment,null,e);function Ne(e){return s.isValidElement(e)&&e.type===Ce}function xe(e,t){const r={...t};for(const n in t){const a=e[n],c=t[n];/^on[A-Z]/.test(n)?a&&c?r[n]=(...o)=>{c(...o),a(...o)}:a&&(r[n]=a):n==="style"?r[n]={...a,...c}:n==="className"&&(r[n]=[a,c].filter(Boolean).join(" "))}return{...e,...r}}const ye=["a","button","div","h2","h3","img","label","li","nav","ol","p","span","svg","ul"],A=ye.reduce((e,t)=>{const r=s.forwardRef((n,a)=>{const{asChild:c,...i}=n,o=c?ee:t;return s.useEffect(()=>{window[Symbol.for("radix-ui")]=!0},[]),s.createElement(o,P({},i,{ref:a}))});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{}),V="Card",[ve,Le]=he(V),[Te,te]=ve(V),b=s.forwardRef((e,t)=>{const{__scopeCard:r,...n}=e,a=s.useRef(null),[c,i]=s.useState(null),o=D(e.onClick,f=>{var x,g;if(!(a!=null&&a.current))return;if(((x=window.getSelection())==null?void 0:x.type)==="Range"){let C=(g=window.getSelection())==null?void 0:g.focusNode;for(;C!==document.body;){if(C===f.currentTarget||!C)return;C=C.parentNode}return}let u=f.target;for(;u!==f.currentTarget;){if(u.dataset.exclude!==void 0||u===a.current)return;u=u.parentNode}const _=new MouseEvent("click",{...f,view:null});a.current.dispatchEvent(_)}),p=D(e.onFocus,f=>{console.log(document.activeElement),i(f.target===a.current?"":null)}),N=D(e.onBlur,()=>{i(null)});return l(Te,{scope:r,targetRef:a,descriptionId:void 0,children:l(A.div,{...n,ref:t,onClick:o,onFocus:p,onBlur:N,"data-target-focused":c})})});b.displayName=V;const re="CardTarget",v=s.forwardRef((e,t)=>{const{__scopeCard:r,...n}=e,a=te(re,r),c=_e(a.targetRef,t);return l(A.a,{...n,"aria-describedby":a.descriptionId,ref:c})});v.displayName=re;const ne="CardTargetDescription",E=s.forwardRef((e,t)=>{const r=s.useId(),{__scopeCard:n,...a}=e,c=te(ne,n);return c.descriptionId=e.id||r,l(A.span,{...a,id:c.descriptionId,"aria-hidden":"true",ref:t})});E.displayName=ne;const we="CardExclude",$=s.forwardRef((e,t)=>{const{__scopeCard:r,...n}=e;return l(A.div,{"data-exclude":"",...n,ref:t})});$.displayName=we;const B=b,R=v,I=E,j=$;try{b.displayName="Card",b.__docgenInfo={description:"",displayName:"Card",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{v.displayName="CardTarget",v.__docgenInfo={description:"",displayName:"CardTarget",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{E.displayName="CardTargetDescription",E.__docgenInfo={description:"",displayName:"CardTargetDescription",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{$.displayName="CardExclude",$.__docgenInfo={description:"",displayName:"CardExclude",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{B.displayName="Root",B.__docgenInfo={description:"",displayName:"Root",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{R.displayName="Target",R.__docgenInfo={description:"",displayName:"Target",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{I.displayName="TargetDescription",I.__docgenInfo={description:"",displayName:"TargetDescription",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}try{j.displayName="Exclude",j.__docgenInfo={description:"",displayName:"Exclude",props:{asChild:{defaultValue:null,description:"",name:"asChild",required:!1,type:{name:"boolean"}}}}}catch{}const F=""+new URL("Creative-a1563ff3.png",import.meta.url).href,q=""+new URL("chevron-065feed3.svg",import.meta.url).href,h={TITLE:"Graphic Design",BODY:"Graphic design is a profession, academic discipline and applied art whose activity consists in projecting visual communications intended to transmit specific messages to social groups, with specific objectives.",CTA:"Learn More"},Se="_container_6l5ui_1",be="_image_6l5ui_20",Ee="_title_6l5ui_31",$e="_description_6l5ui_41",Re="_related_6l5ui_48",Ie="_related__list_6l5ui_51",ke="_cta_6l5ui_68",Ae="_cta__icon_6l5ui_81",De="_ba_6l5ui_85",Pe={container:Se,image:be,"text-container":"_text-container_6l5ui_27",title:Ee,description:$e,related:Re,related__list:Ie,cta:ke,cta__icon:Ae,ba:De},d=me.bind(Pe),Ve={title:"Card",component:B},T={args:{className:d("container"),children:m(L,{children:[l("img",{className:d("image"),src:F,alt:""}),m("div",{className:d("text-container"),children:[l("h2",{className:d("title"),children:h.TITLE}),l("p",{className:d("description"),children:h.BODY}),m(v,{className:d("cta"),href:"https://en.wikipedia.org/wiki/Graphic_design",children:[h.CTA," ",l("img",{className:d("cta__icon"),src:q,alt:""})]})]})]})}},w={args:{className:d("container","ba"),children:m(L,{children:[l("img",{className:d("image"),src:F,alt:""}),m("div",{className:d("text-container"),children:[l("h2",{className:d("title"),children:l(R,{href:"https://en.wikipedia.org/wiki/Graphic_design",children:h.TITLE})}),l("p",{className:d("description"),children:h.BODY}),m(I,{className:d("cta"),children:[h.CTA," ",l("img",{className:d("cta__icon"),src:q,alt:""})]})]})]})}},S={args:{className:d("container","ba"),children:m(L,{children:[l("img",{className:d("image"),src:F,alt:""}),m("div",{className:d("text-container"),children:[l("h2",{className:d("title"),children:l(R,{href:"https://en.wikipedia.org/wiki/Graphic_design",children:h.TITLE})}),l("p",{className:d("description"),children:h.BODY}),m(I,{className:d("cta"),children:[h.CTA," ",l("img",{className:d("cta__icon"),src:q,alt:""})]})]}),m(j,{className:"related",children:[l("h3",{className:"related__title",children:"Related topics:"}),m("ul",{className:d("related__list"),children:[l("li",{children:l("a",{href:"https://en.wikipedia.org/wiki/Aesthetics",children:"Aesthetics"})}),l("li",{children:l("a",{href:"https://en.wikipedia.org/wiki/Color_theory",children:"Color theory"})})]})]})]})}};var M,Y,U;T.parameters={...T.parameters,docs:{...(M=T.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    className: cx("container"),
    children: <>
        <img className={cx("image")} src={Creative} alt="" />
        <div className={cx("text-container")}>
          <h2 className={cx("title")}>{STRINGS.TITLE}</h2>
          <p className={cx("description")}>{STRINGS.BODY}</p>
          <Card.CardTarget className={cx("cta")} href="https://en.wikipedia.org/wiki/Graphic_design">
            {STRINGS.CTA}{" "}
            <img className={cx("cta__icon")} src={Chevron} alt="" />
          </Card.CardTarget>
        </div>
      </>
  }
}`,...(U=(Y=T.parameters)==null?void 0:Y.docs)==null?void 0:U.source}}};var H,J,W;w.parameters={...w.parameters,docs:{...(H=w.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    className: cx("container", "ba"),
    children: <>
        <img className={cx("image")} src={Creative} alt="" />
        <div className={cx("text-container")}>
          <h2 className={cx("title")}>
            <Card.Target href="https://en.wikipedia.org/wiki/Graphic_design">
              {STRINGS.TITLE}
            </Card.Target>
          </h2>
          <p className={cx("description")}>{STRINGS.BODY}</p>
          <Card.TargetDescription className={cx("cta")}>
            {STRINGS.CTA}{" "}
            <img className={cx("cta__icon")} src={Chevron} alt="" />
          </Card.TargetDescription>
        </div>
      </>
  }
}`,...(W=(J=w.parameters)==null?void 0:J.docs)==null?void 0:W.source}}};var X,Z,z;S.parameters={...S.parameters,docs:{...(X=S.parameters)==null?void 0:X.docs,source:{originalSource:`{
  args: {
    className: cx("container", "ba"),
    children: <>
        <img className={cx("image")} src={Creative} alt="" />
        <div className={cx("text-container")}>
          <h2 className={cx("title")}>
            <Card.Target href="https://en.wikipedia.org/wiki/Graphic_design">
              {STRINGS.TITLE}
            </Card.Target>
          </h2>
          <p className={cx("description")}>{STRINGS.BODY}</p>
          <Card.TargetDescription className={cx("cta")}>
            {STRINGS.CTA}{" "}
            <img className={cx("cta__icon")} src={Chevron} alt="" />
          </Card.TargetDescription>
        </div>
        <Card.Exclude className="related">
          <h3 className="related__title">Related topics:</h3>
          <ul className={cx("related__list")}>
            <li>
              <a href="https://en.wikipedia.org/wiki/Aesthetics">Aesthetics</a>
            </li>
            <li>
              <a href="https://en.wikipedia.org/wiki/Color_theory">
                Color theory
              </a>
            </li>
          </ul>
        </Card.Exclude>
      </>
  }
}`,...(z=(Z=S.parameters)==null?void 0:Z.docs)==null?void 0:z.source}}};const Fe=["Basic","BetterAccessibility","NestedInteractions"];export{T as Basic,w as BetterAccessibility,S as NestedInteractions,Fe as __namedExportsOrder,Ve as default};
//# sourceMappingURL=Card.stories-2bc14da9.js.map
