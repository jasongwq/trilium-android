import{a9 as p,aa as n,ab as b,ac as u,ad as m,ae as w,af as f,ag as x,ah as v,ai as S,aj as y,ak as E,al as k,am as T,an as C,ao as N,ap as _,aq as A,ar as B,as as L,at as z,au as R,av as W,aw as M}from"./close_zen_button.js";import{B as g,N as P}from"./search.js";import{a as l,c as I,g as D,e as X}from"./app_context.js";import{t as c}from"./syntax_highlight.js";import{i as G}from"./utils.js";import"./preload-helper.js";import"./jquery.js";import"./dayjs.min.js";import"./_commonjsHelpers.js";import"./note_autocomplete.js";import"./katex.js";import"./auto-render.js";import"./ckeditor5.js";import"./marked.esm.js";const H=`
<button type="button" class="action-button bx bx-sidebar"></button>`;class O extends g{doRender(){this.$widget=$(H),this.$widget.on("click",()=>this.triggerCommand("setActiveScreen",{screen:"tree"}))}}const F='<button type="button" class="action-button bx"></button>';class q extends g{isHorizontalLayout;constructor(t){super(),this.isHorizontalLayout=t}doRender(){this.$widget=$(F),this.$widget.addClass(this.isHorizontalLayout?"bx-dots-vertical-rounded":"bx-menu"),this.$widget.on("click",async t=>{const e=l.tabManager.getActiveContextNote();I.show({x:t.pageX,y:t.pageY,items:[{title:c("mobile_detail_menu.insert_child_note"),command:"insertChildNote",uiIcon:"bx bx-plus",enabled:e?.type!=="search"},{title:c("mobile_detail_menu.delete_this_note"),command:"delete",uiIcon:"bx bx-trash",enabled:e?.noteId!=="root"},{title:"----"},{title:"Note revisions",command:"showRevisions",uiIcon:"bx bx-history"}],selectMenuItemHandler:async({command:i})=>{if(i==="insertChildNote")D.createNote(l.tabManager.getActiveContextNotePath()??void 0);else if(i==="delete"){const a=l.tabManager.getActiveContextNotePath();if(!a)throw new Error("Cannot get note path to delete.");const r=await X.getBranchIdFromUrl(a);if(!r)throw new Error(c("mobile_detail_menu.error_cannot_get_branch_id",{notePath:a}));await p.deleteNotes([r])&&this.triggerCommand("setActiveScreen",{screen:"tree"})}else i&&this.triggerCommand(i)},forcePositionOnMobile:!0})})}}class j extends n{screenName;constructor(t,e){super(e),this.screenName=t}activeScreenChangedEvent({activeScreen:t}){}}const s=0,d=1,h=2,U=10;class V extends n{screenName;activeScreenName;currentTranslate;dragState;startX;translatePercentage;sidebarEl;backdropEl;originalSidebarTransition;originalBackdropTransition;constructor(t,e){super(e),this.screenName=t,this.currentTranslate=-100,this.translatePercentage=0,this.dragState=s,this.originalSidebarTransition="",this.originalBackdropTransition=""}doRender(){super.doRender(),document.addEventListener("touchstart",t=>this.#t(t)),document.addEventListener("touchmove",t=>this.#e(t),{passive:!1}),document.addEventListener("touchend",t=>this.#i(t))}#t(t){const e="touches"in t?t.touches[0].clientX:t.clientX;this.startX=e,!(e>30&&this.currentTranslate===-100)&&(this.#n(),this.dragState=d,this.translatePercentage=0)}#e(t){if(this.dragState===s||!this.startX)return;const i=("touches"in t?t.touches[0].clientX:t.clientX)-this.startX;if(this.dragState===d){if((this.currentTranslate===-100?i>U:i<-80)&&(this.sidebarEl.style.transition="none",this.backdropEl.style.transition="none",this.backdropEl.style.opacity=String(this.currentTranslate===-100?0:1),this.backdropEl.classList.add("show"),this.dragState=h),this.currentTranslate!==-100)return}else if(this.dragState===h){const a=this.sidebarEl.offsetWidth,r=Math.min(0,Math.max(this.currentTranslate+i/a*100,-100));this.translatePercentage=r,this.sidebarEl.style.transform=`translateX(${r}%)`,this.backdropEl.style.opacity=String(Math.max(0,1+r/100))}t.preventDefault()}#i(t){if(this.dragState===s)return;if(this.dragState===d){this.dragState=s;return}const e=this.currentTranslate===-100&&this.translatePercentage>-90,i=e?"tree":"detail";this.activeScreenName!==i?this.triggerCommand("setActiveScreen",{screen:i}):this.#a(e)}#n(){if(this.sidebarEl)return;const t=document.getElementById("mobile-sidebar-wrapper"),e=document.getElementById("mobile-sidebar-container");if(e?.addEventListener("click",()=>{this.triggerCommand("setActiveScreen",{screen:"detail"})}),!t||!e)throw new Error("Unable to find the sidebar or backdrop.");this.sidebarEl=t,this.backdropEl=e,this.originalSidebarTransition=this.sidebarEl.style.transition,this.originalBackdropTransition=this.backdropEl.style.transition}#a(t){this.sidebarEl&&(this.sidebarEl.classList.toggle("show",t),this.sidebarEl.style.transform=t?"translateX(0)":"translateX(-100%)",this.sidebarEl.style.transition=this.originalSidebarTransition,this.backdropEl.classList.toggle("show",t),this.backdropEl.style.transition=this.originalBackdropTransition,this.backdropEl.style.opacity=String(t?1:0),this.currentTranslate=t?0:-100,this.dragState=s)}activeScreenChangedEvent({activeScreen:t}){this.activeScreenName=t,this.#n(),this.#a(t===this.screenName)}}const Y=`<div class="classic-toolbar-outer-container">
    <div class="classic-toolbar-widget"></div>
</div>

<style>
    .classic-toolbar-outer-container.visible {
        height: 38px;
        background-color: var(--main-background-color);
        position: relative;
        overflow: visible;
        flex-shrink: 0;
    }

    #root-widget.virtual-keyboard-opened .classic-toolbar-outer-container.ios {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .classic-toolbar-widget {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 38px;
        overflow: scroll;
        display: flex;
        align-items: flex-end;
        user-select: none;
    }

    .classic-toolbar-widget::-webkit-scrollbar {
        height: 0 !important;
        width: 0 !important;
    }

    .classic-toolbar-widget.dropdown-active {
        height: 50vh;
    }

    .classic-toolbar-widget .ck.ck-toolbar {
        --ck-color-toolbar-background: transparent;
        --ck-color-button-default-background: transparent;
        --ck-color-button-default-disabled-background: transparent;
        position: absolute;
        background-color: transparent;
        border: none;
    }

    .classic-toolbar-widget .ck.ck-button.ck-disabled {
        opacity: 0.3;
    }
</style>
`;class Q extends P{observer;$innerWrapper;constructor(){super(),this.observer=new MutationObserver(t=>this.#e(t))}get name(){return"classicEditor"}doRender(){this.$widget=$(Y),this.$innerWrapper=this.$widget.find(".classic-toolbar-widget"),this.contentSized(),this.observer.disconnect(),this.observer.observe(this.$widget[0],{attributeFilter:["aria-expanded"],subtree:!0}),G()&&this.#t()}#t(){const t=()=>{let e=window.innerHeight-(window.visualViewport?.height||0);this.$widget.css("bottom",`${e}px`)};this.$widget.addClass("ios"),window.visualViewport?.addEventListener("resize",t),window.addEventListener("scroll",t)}#e(t){const e=t.map(i=>i.target.ariaExpanded==="true").reduce((i,a)=>i&&a);this.$innerWrapper.toggleClass("dropdown-active",e)}async#i(){return!(!this.note||this.note.type!=="text"||await this.noteContext?.isReadOnly())}async refreshWithNote(){this.toggleExt(await this.#i())}}const Z=`
<style>
kbd {
    display: none;
}

.dropdown-menu {
    font-size: larger;
}

.action-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    color: var(--main-text-color);
}
.quick-search {
    margin: 0;
}
.quick-search .dropdown-menu {
    max-width: 350px;
}
</style>`,J=`
<style>
.tree-wrapper {
    max-height: 100%;
    margin-top: 0px;
    overflow-y: auto;
    contain: content;
    padding-left: 10px;
}

.fancytree-custom-icon {
    font-size: 2em;
}

.fancytree-title {
    font-size: 1.5em;
    margin-left: 0.6em !important;
}

.fancytree-node {
    padding: 5px;
}

.fancytree-node .fancytree-expander:before {
    font-size: 2em !important;
}

span.fancytree-expander {
    width: 24px !important;
    margin-right: 5px;
}

.fancytree-loading span.fancytree-expander {
    width: 24px;
    height: 32px;
}

.fancytree-loading  span.fancytree-expander:after {
    width: 20px;
    height: 20px;
    margin-top: 4px;
    border-width: 2px;
    border-style: solid;
}

.tree-wrapper .collapse-tree-button,
.tree-wrapper .scroll-to-active-note-button,
.tree-wrapper .tree-settings-button {
    position: fixed;
    margin-right: 16px;
    display: none;
}

.tree-wrapper .unhoist-button {
    font-size: 200%;
}
</style>`;class pt{getRootWidget(t){const e=new b(!0).setParent(t).class("horizontal-layout").cssBlock(Z).child(new n("column").id("mobile-sidebar-container")).child(new n("row").filling().id("mobile-rest-container").child(new V("tree","column").class("d-md-flex d-lg-flex d-xl-flex col-12 col-sm-5 col-md-4 col-lg-3 col-xl-3").id("mobile-sidebar-wrapper").css("max-height","100%").css("padding-left","0").css("padding-right","0").css("contain","content").child(new n("column").filling().id("mobile-sidebar-wrapper").child(new u).child(new m().cssBlock(J)))).child(new j("detail","column").id("detail-container").class("d-sm-flex d-md-flex d-lg-flex d-xl-flex col-12 col-sm-7 col-md-8 col-lg-9").child(new n("row").contentSized().css("font-size","larger").css("align-items","center").child(new O().contentSized()).child(new w().contentSized().css("position","relative").css("padding-left","0.5em")).child(new q(!0).contentSized())).child(new f).child(new x().child(new v).child(new S).child(new y).child(new E).child(new k).child(new T)).child(new C).child(new N().filling().contentSized().child(new _).child(new A(!1)).child(new B().css("font-size","smaller"))).child(new Q))).child(new n("column").contentSized().id("mobile-bottom-bar").child(new L().css("height","40px")).child(new n("row").class("horizontal").css("height","53px").child(new z(!0)).child(new R(!0)).id("launcher-pane"))).child(new W);return M(e),e}}export{pt as default};
