(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{"9G6C":function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">ng-class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{ active: $state.includes(<span class="token punctuation">\'</span>patterns<span class="token punctuation">\'</span>),selected: $state.includes(<span class="token punctuation">\'</span>patterns<span class="token punctuation">\'</span>)}<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">ng-class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{ in: $state.includes(<span class="token punctuation">\'</span>patterns<span class="token punctuation">\'</span>)} <span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>li</span> <span class="token attr-name">ng-class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>{ active: $state.includes(<span class="token punctuation">\'</span>patterns.uirouter<span class="token punctuation">\'</span>) }<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>\n           <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">ui-sref</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>patterns.uirouter<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>UI Router<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>li</span><span class="token punctuation">></span></span>'}},YoOe:function(n,a){n.exports={snippet:'$urlRouterProvider<span class="token punctuation">.</span><span class="token function">otherwise</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n$stateProvider<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    url<span class="token punctuation">:</span> <span class="token string">"/"</span><span class="token punctuation">,</span>\n    templateUrl<span class="token punctuation">:</span> <span class="token string">"app/views/blank.html"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token string">"patterns"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    abstract<span class="token punctuation">:</span> <span class="token string">"true"</span><span class="token punctuation">,</span>\n    url<span class="token punctuation">:</span> <span class="token string">"/patterns"</span><span class="token punctuation">,</span>\n    template<span class="token punctuation">:</span> <span class="token string">"&lt;ui-view autoscroll=\\"true\\"/>"</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token string">"patterns.sidenavigation"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    url<span class="token punctuation">:</span> <span class="token string">"/sidenavigation"</span><span class="token punctuation">,</span>\n    templateUrl<span class="token punctuation">:</span> <span class="token string">"app/sideNavigation/sideNavigation.html"</span><span class="token punctuation">,</span>\n    controller<span class="token punctuation">:</span> <span class="token string">"SideNavigationCtrl as sn"</span><span class="token punctuation">,</span>\n    data<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        pageTitle<span class="token punctuation">:</span><span class="token string">"Navigation"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">.</span><span class="token function">state</span><span class="token punctuation">(</span><span class="token string">"patterns.uirouter"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>\n    url<span class="token punctuation">:</span> <span class="token string">"/uirouter"</span><span class="token punctuation">,</span>\n    templateUrl<span class="token punctuation">:</span> <span class="token string">"app/uiRouter/uiRouter.html"</span><span class="token punctuation">,</span>\n    data<span class="token punctuation">:</span> <span class="token punctuation">{</span>\n        pageTitle<span class="token punctuation">:</span> <span class="token string">"UI Router"</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>'}},pUTF:function(n,a,t){"use strict";t.r(a);var s=t("CcnG"),l=t("T/2f"),p=t("YZ8U"),e=t("mrSG"),u=t("yHOM"),o=function(n){function a(){return n.call(this,t("yPbm"))||this}return Object(e.__extends)(a,n),Object(e.__decorate)([Object(u.a)("ComponentsUiRouterNg1Component")],a)}(t("AVdU").a),c={category:p.b.resolveCategoryData(p.a.Components,"UI Router")},i=function(){return function(n,a){a.registerResolver(n)}}(),d=t("WmtN"),r=t("CfOV"),k=t("pMnS"),m=t("GBPT"),g=t("rYg0"),f=t("r1ng"),v=t("COk8"),b=t("9hoY"),h=t("+gXg"),y=t("rpQh"),C=t("2RDK"),N=s["\u0275crt"]({encapsulation:2,styles:[],data:{}});function U(n){return s["\u0275vid"](2,[(n()(),s["\u0275eld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["UI Router is a routing framework for Angular, which allows organizing parts of the user interface into a state machine."])),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](3,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["The power of UI router lies in its ability to nest views and states."])),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](6,0,null,null,7,"p",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["Add "])),(n()(),s["\u0275eld"](8,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["ui-view"])),(n()(),s["\u0275ted"](-1,null,[" directive inside the "])),(n()(),s["\u0275eld"](11,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["body"])),(n()(),s["\u0275ted"](-1,null,[" tag."])),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](15,0,null,null,1,"uxd-snippet",[],null,null,null,f.b,f.a)),s["\u0275did"](16,114688,null,0,v.a,[],{content:[0,"content"]},null),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](18,0,null,null,10,"p",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["Add "])),(n()(),s["\u0275eld"](20,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["a"])),(n()(),s["\u0275ted"](-1,null,[" tags for navigation. \xa0Adding "])),(n()(),s["\u0275eld"](23,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["ui-sref"])),(n()(),s["\u0275ted"](-1,null,[" directive helps with state transitions and auto-generates\n    the "])),(n()(),s["\u0275eld"](26,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["href"])),(n()(),s["\u0275ted"](-1,null,[" attribute of the element it\u2019s attached to, if the corresponding state has a URL."])),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](30,0,null,null,7,"p",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["A navigation entry is highighted when the state is selected and is contained in the "])),(n()(),s["\u0275eld"](32,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["active"])),(n()(),s["\u0275ted"](-1,null,[", "])),(n()(),s["\u0275eld"](35,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["selected"])),(n()(),s["\u0275ted"](-1,null,["    classes."])),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](39,0,null,null,1,"uxd-snippet",[],null,null,null,f.b,f.a)),s["\u0275did"](40,114688,null,0,v.a,[],{content:[0,"content"]},null),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](42,0,null,null,4,"p",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["Set up the states with"])),(n()(),s["\u0275eld"](44,0,null,null,1,"code",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["$stateProvider"])),(n()(),s["\u0275ted"](-1,null,["."])),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](48,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),s["\u0275ted"](-1,null,["State parameters are discussed below:"])),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](51,0,null,null,27,"uxd-api-properties",[],null,null,null,b.b,b.a)),s["\u0275did"](52,49152,null,0,h.a,[],null,null),(n()(),s["\u0275ted"](-1,0,["\n    "])),(n()(),s["\u0275eld"](54,0,null,0,24,"tbody",[],null,null,null,null,null)),(n()(),s["\u0275eld"](55,0,null,null,2,"tr",[["name","url"],["uxd-api-property",""]],null,null,null,y.b,y.a)),s["\u0275did"](56,49152,null,0,C.a,[],{name:[0,"name"]},null),(n()(),s["\u0275ted"](-1,0,["\n        Defines the path provided in ui-sref.\n    "])),(n()(),s["\u0275ted"](-1,null,["\n    "])),(n()(),s["\u0275eld"](59,0,null,null,2,"tr",[["name","templateUrl"],["uxd-api-property",""]],null,null,null,y.b,y.a)),s["\u0275did"](60,49152,null,0,C.a,[],{name:[0,"name"]},null),(n()(),s["\u0275ted"](-1,0,["\n        Configures a state's template, e.g. physical path of the page.\n    "])),(n()(),s["\u0275ted"](-1,null,["\n    "])),(n()(),s["\u0275eld"](63,0,null,null,2,"tr",[["name","abstract"],["uxd-api-property",""]],null,null,null,y.b,y.a)),s["\u0275did"](64,49152,null,0,C.a,[],{name:[0,"name"]},null),(n()(),s["\u0275ted"](-1,0,["\n        Indicates that a state can have child states but can't be self activated.\n    "])),(n()(),s["\u0275ted"](-1,null,["\n    "])),(n()(),s["\u0275eld"](67,0,null,null,2,"tr",[["name","template"],["uxd-api-property",""]],null,null,null,y.b,y.a)),s["\u0275did"](68,49152,null,0,C.a,[],{name:[0,"name"]},null),(n()(),s["\u0275ted"](-1,0,["\n        Simplest way to set your template.\n    "])),(n()(),s["\u0275ted"](-1,null,["\n    "])),(n()(),s["\u0275eld"](71,0,null,null,2,"tr",[["name","data"],["uxd-api-property",""]],null,null,null,y.b,y.a)),s["\u0275did"](72,49152,null,0,C.a,[],{name:[0,"name"]},null),(n()(),s["\u0275ted"](-1,0,["\n        Sets custom data, e.g. pageTitle.\n    "])),(n()(),s["\u0275ted"](-1,null,["\n    "])),(n()(),s["\u0275eld"](75,0,null,null,2,"tr",[["name","controller"],["uxd-api-property",""]],null,null,null,y.b,y.a)),s["\u0275did"](76,49152,null,0,C.a,[],{name:[0,"name"]},null),(n()(),s["\u0275ted"](-1,0,["\n        Assign a controller to the state, e.g. SideNavigationCtrl as sn, pageTitle.\n    "])),(n()(),s["\u0275ted"](-1,null,["\n"])),(n()(),s["\u0275ted"](-1,null,["\n\n"])),(n()(),s["\u0275eld"](80,0,null,null,1,"uxd-snippet",[["language","javascript"]],null,null,null,f.b,f.a)),s["\u0275did"](81,114688,null,0,v.a,[],{language:[0,"language"],content:[1,"content"]},null)],function(n,a){var t=a.component;n(a,16,0,t.snippets.compiled.sample1SnippetHtml),n(a,40,0,t.snippets.compiled.sample2SnippetHtml),n(a,56,0,"url"),n(a,60,0,"templateUrl"),n(a,64,0,"abstract"),n(a,68,0,"template"),n(a,72,0,"data"),n(a,76,0,"controller"),n(a,81,0,"javascript",t.snippets.compiled.sample3SnippetJs)},null)}function w(n){return s["\u0275vid"](0,[(n()(),s["\u0275eld"](0,0,null,null,1,"uxd-components-ui-router-ng1",[],null,null,null,U,N)),s["\u0275did"](1,49152,null,0,o,[],null,null)],null,null)}var R=s["\u0275ccf"]("uxd-components-ui-router-ng1",o,w,{},{},[]),O=t("x4zH"),T=t("Ip0R"),x=t("dWZg"),D=t("lLAP"),M=t("unTc"),S=t("gIcY"),F=t("Fzqc"),E=t("qAlS"),j=t("eDkP"),I=t("M2Lx"),A=t("qina"),P=t("zCE2"),_=t("4c35"),L=t("ZYCi"),Z=t("FLOw"),$=t("XtaT");t.d(a,"ComponentsRouterModuleNgFactory",function(){return Y});var Y=s["\u0275cmf"](i,[],function(n){return s["\u0275mod"]([s["\u0275mpd"](512,s.ComponentFactoryResolver,s["\u0275CodegenComponentFactoryResolver"],[[8,[d.a,r.mb,r.a,k.a,m.a,g.a,R]],[3,s.ComponentFactoryResolver],s.NgModuleRef]),s["\u0275mpd"](5120,"flotDataService",O.b,["$injector"]),s["\u0275mpd"](5120,"lineDataService",O.c,["$injector"]),s["\u0275mpd"](4608,T.NgLocalization,T.NgLocaleLocalization,[s.LOCALE_ID,[2,T["\u0275angular_packages_common_common_a"]]]),s["\u0275mpd"](4608,x.a,x.a,[]),s["\u0275mpd"](4608,D.i,D.i,[x.a]),s["\u0275mpd"](4608,D.h,D.h,[D.i,s.NgZone,T.DOCUMENT]),s["\u0275mpd"](136192,D.c,D.b,[[3,D.c],T.DOCUMENT]),s["\u0275mpd"](5120,D.l,D.k,[[3,D.l],[2,D.j],T.DOCUMENT]),s["\u0275mpd"](5120,D.g,D.e,[[3,D.g],s.NgZone,x.a]),s["\u0275mpd"](5120,M.H,M.r,[[3,M.H],[2,M.s]]),s["\u0275mpd"](4608,M.c,M.c,[[2,M.a]]),s["\u0275mpd"](4608,M.S,M.S,[]),s["\u0275mpd"](5120,M.fc,M.rb,[[3,M.fc]]),s["\u0275mpd"](4608,M.gc,M.gc,[D.g,M.c,M.fc,[2,M.a],s.RendererFactory2]),s["\u0275mpd"](4608,M.Fc,M.Fc,[s.RendererFactory2]),s["\u0275mpd"](4608,S.B,S.B,[]),s["\u0275mpd"](6144,F.b,null,[T.DOCUMENT]),s["\u0275mpd"](4608,F.c,F.c,[[2,F.b]]),s["\u0275mpd"](5120,E.c,E.a,[[3,E.c],s.NgZone,x.a]),s["\u0275mpd"](5120,E.f,E.e,[[3,E.f],x.a,s.NgZone]),s["\u0275mpd"](4608,j.f,j.f,[E.c,E.f,s.NgZone,T.DOCUMENT]),s["\u0275mpd"](5120,j.b,j.g,[[3,j.b],T.DOCUMENT]),s["\u0275mpd"](4608,j.e,j.e,[E.f,T.DOCUMENT]),s["\u0275mpd"](5120,j.c,j.j,[[3,j.c],T.DOCUMENT]),s["\u0275mpd"](4608,j.a,j.a,[j.f,j.b,s.ComponentFactoryResolver,j.e,j.c,s.ApplicationRef,s.Injector,s.NgZone,T.DOCUMENT]),s["\u0275mpd"](5120,j.h,j.i,[j.a]),s["\u0275mpd"](4608,I.b,I.b,[]),s["\u0275mpd"](4608,M.hf,M.hf,[]),s["\u0275mpd"](4608,M.vd,M.vd,[]),s["\u0275mpd"](1073742336,O.a,O.a,[]),s["\u0275mpd"](1073742336,T.CommonModule,T.CommonModule,[]),s["\u0275mpd"](1073742336,x.b,x.b,[]),s["\u0275mpd"](1073742336,D.a,D.a,[]),s["\u0275mpd"](1073742336,M.I,M.I,[]),s["\u0275mpd"](1073742336,M.b,M.b,[]),s["\u0275mpd"](1073742336,M.Ne,M.Ne,[]),s["\u0275mpd"](1073742336,A.a,A.a,[]),s["\u0275mpd"](1073742336,P.a,P.a,[]),s["\u0275mpd"](1073742336,M.qb,M.qb,[]),s["\u0275mpd"](1073742336,S.y,S.y,[]),s["\u0275mpd"](1073742336,S.l,S.l,[]),s["\u0275mpd"](1073742336,F.a,F.a,[]),s["\u0275mpd"](1073742336,_.c,_.c,[]),s["\u0275mpd"](1073742336,E.b,E.b,[]),s["\u0275mpd"](1073742336,j.d,j.d,[]),s["\u0275mpd"](1073742336,I.c,I.c,[]),s["\u0275mpd"](1073742336,M.B,M.B,[]),s["\u0275mpd"](1073742336,M.gf,M.gf,[]),s["\u0275mpd"](1073742336,M.yd,M.yd,[]),s["\u0275mpd"](1073742336,L.p,L.p,[[2,L.v],[2,L.m]]),s["\u0275mpd"](1073742336,M.Rd,M.Rd,[]),s["\u0275mpd"](1073742336,Z.a,Z.a,[]),s["\u0275mpd"](1073742336,M.ud,M.ud,[]),s["\u0275mpd"](1073742336,$.a,$.a,[]),s["\u0275mpd"](1073742336,i,i,[s.ComponentFactoryResolver,p.b]),s["\u0275mpd"](1024,L.k,function(){return[[{path:"**",component:l.a,data:c}]]},[])])})},y2P8:function(n,a){n.exports={snippet:'<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>\n   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">ui-view</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>'}},yPbm:function(n,a,t){var s={"./sample1.snippet.html":"y2P8","./sample2.snippet.html":"9G6C","./sample3.snippet.js":"YoOe"};function l(n){var a=p(n);return t(a)}function p(n){var a=s[n];if(!(a+1)){var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}return a}l.keys=function(){return Object.keys(s)},l.resolve=p,n.exports=l,l.id="yPbm"}}]);