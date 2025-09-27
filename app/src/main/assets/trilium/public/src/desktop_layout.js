const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./mark.js","./_commonjsHelpers.js"])))=>i.map(i=>d[i]);
import{aa as _,ax as b,ay as It,a9 as Tt,az as G,aA as Ft,aB as Ht,aC as Nt,aD as kt,aE as E,aF as D,aG as it,aH as nt,aI as Vt,aJ as Y,aK as qt,aL as Et,aM as I,aN as A,aO as St,aP as Rt,aQ as At,aR as Ut,aS as ot,aT as jt,aU as Kt,aV as Gt,ad as Yt,ab as Xt,as as st,ac as Qt,aW as Jt,ae as Zt,aX as te,aY as ee,ar as ie,af as ne,ag as oe,ah as se,ai as ae,aj as re,ak as de,al as le,am as ce,ao as he,an as pe,ap as ue,aq as ge,av as be,aw as fe,at,au as rt}from"./close_zen_button.js";import{B as me,N as p}from"./search.js";import{o as v,t as n,s as m,m as dt,g as Bt,a as we,b as C}from"./syntax_highlight.js";import{u as w,e as lt}from"./utils.js";import{a as u,c as xe,l as H,f as W,i as Lt,g as $e,d as Q,t as k,w as L,k as J,C as ve,s as ye,S as _e,j as Ce,D as V,e as q,o as ct,p as ht,m as Ie}from"./app_context.js";import{n as Z}from"./note_autocomplete.js";import{AttributeEditor as Te}from"./ckeditor5.js";import{d as Ne}from"./dayjs.min.js";import{_ as ke}from"./preload-helper.js";import{R as Wt}from"./right_panel_widget.js";import M from"./katex.js";import"./auto-render.js";import"./jquery.js";import"./_commonjsHelpers.js";import"./marked.esm.js";const Ee=`
<div class="title-bar-buttons">
    <style>
    .title-bar-buttons {
        flex-shrink: 0;
    }

    .title-bar-buttons div button {
        border: none !important;
        border-radius: 0;
        background: none !important;
        font-size: 150%;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title-bar-buttons div:hover button {
        background-color: var(--accented-background-color) !important;
    }

    .title-bar-buttons div {
        display: inline-block;
        height: 40px;
        width: 40px;
    }

    .title-bar-buttons .btn.focus, .title-bar-buttons .btn:focus {
        box-shadow: none;
    }
    </style>

    <!-- divs act as a hitbox for the buttons, making them clickable on corners -->
    <div class="minimize-btn"><button class="btn bx bx-minus"></button></div>
    <div class="maximize-btn"><button class="btn bx bx-checkbox"></button></div>
    <div class="close-btn"><button class="btn bx bx-x"></button></div>
</div>`;class pt extends me{doRender(){if(!w.isElectron()||v.is("nativeTitleBarVisible"))return this.$widget=$("<div>");this.$widget=$(Ee),this.contentSized();const t=this.$widget.find(".minimize-btn"),e=this.$widget.find(".maximize-btn"),i=this.$widget.find(".close-btn");t.on("click",()=>{t.trigger("blur"),w.dynamicRequire("@electron/remote").BrowserWindow.getFocusedWindow().minimize()}),e.on("click",()=>{e.trigger("blur");const s=w.dynamicRequire("@electron/remote").BrowserWindow.getFocusedWindow();s.isMaximized()?s.unmaximize():s.maximize()}),i.on("click",()=>{i.trigger("blur"),w.dynamicRequire("@electron/remote").BrowserWindow.getFocusedWindow().close()})}}class Se extends _{currentLeftPaneVisible;constructor(){super("column"),this.currentLeftPaneVisible=v.is("leftPaneVisible"),this.id("left-pane"),this.css("height","100%"),this.collapsible()}isEnabled(){return super.isEnabled()&&this.currentLeftPaneVisible}setLeftPaneVisibilityEvent({leftPaneVisible:t}){this.currentLeftPaneVisible=t??!this.currentLeftPaneVisible;const e=this.isEnabled();this.toggleInt(e),this.parent?.$widget.toggleClass("left-pane-hidden",!e),e?this.triggerEvent("focusTree",{}):this.triggerEvent("focusOnDetail",{ntxId:u.tabManager.getActiveContext()?.ntxId}),v.save("leftPaneVisible",this.currentLeftPaneVisible.toString())}}function Pt(a){a=a.trim();const t=[];let e=!1,i="";function o(d){return["=","*",">","<","!"].includes(d)}function s(){return i.length===0?!1:o(i[i.length-1])}function r(d){i!==""&&(t.push({text:i,startIndex:d-i.length+1,endIndex:d}),i="")}for(let d=0;d<a.length;d++){const l=a[d];if(l==="\\"){d+1<a.length?(d++,i+=a[d]):i+=l;continue}else if(['"',"'","`"].includes(l)){e?e===l?(e=!1,r(d-1)):i+=l:(s()&&r(d-1),e=l);continue}else if(!e){if(i.length===0&&(l==="#"||l==="~")){i=l;continue}else if(l===" "){r(d-1);continue}else if(["(",")"].includes(l)){r(d-1),i=l,r(d);continue}else if(s()!==o(l)){r(d-1),i+=l;continue}}i+=l}return r(a.length-1),t}function ut(a){if(a.length===0)throw new Error("Attribute name is empty, please fill the name.");if(!w.isValidAttributeName(a))throw new Error(`Attribute name "${a}" contains disallowed characters, only alphanumeric characters, colon and underscore are allowed.`)}function Ot(a,t,e=!1){const i=[];function o(s){let{startIndex:r,endIndex:d}=a[s];return r=Math.max(0,r-20),d=Math.min(t.length,d+20),`"${r!==0?"...":""}${t.substr(r,d-r)}${d!==t.length?"...":""}"`}for(let s=0;s<a.length;s++){let r=function(){return a.length>s+3&&a[s+1].text==="("&&a[s+2].text==="inheritable"&&a[s+3].text===")"?(s+=3,!0):!1};const{text:d,startIndex:l}=a[s];if(d.startsWith("#")){const c=d.substr(1);ut(c);const h={type:"label",name:c,isInheritable:r(),startIndex:l,endIndex:a[s].endIndex};if(s+1<a.length&&a[s+1].text==="="){if(s+2>=a.length)throw new Error(`Missing value for label "${d}" in ${o(s)}`);s+=2,h.value=a[s].text,h.endIndex=a[s].endIndex}i.push(h)}else if(d.startsWith("~")){const c=d.substr(1);ut(c);const h={type:"relation",name:c,isInheritable:r(),startIndex:l,endIndex:a[s].endIndex};if(i.push(h),s+2>=a.length||a[s+1].text!=="="){if(e)break;throw new Error(`Relation "${d}" in ${o(s)} should point to a note.`)}s+=2;let g=a[s].text;g.startsWith("#")&&(g=g.substr(1));const f=g.split("/").pop();h.value=f,h.endIndex=a[s].endIndex}else throw new Error(`Invalid attribute "${d}" in ${o(s)}`)}return i}function Re(a,t=!1){const e=Pt(a);return Ot(e,a,t)}const gt={lex:Pt,parse:Ot,lexAndParse:Re},Ae=`
<p>${n("attribute_editor.help_text_body1")}</p>

<p>${n("attribute_editor.help_text_body2")}</p>

<p>${n("attribute_editor.help_text_body3")}</p>`,Be=`
<div style="position: relative; padding-top: 10px; padding-bottom: 10px">
    <style>
    .attribute-list-editor {
        border: 0 !important;
        outline: 0 !important;
        box-shadow: none !important;
        padding: 0 0 0 5px !important;
        margin: 0 !important;
        max-height: 100px;
        overflow: auto;
        transition: opacity .1s linear;
    }

    .attribute-list-editor.ck-content .mention {
        color: var(--muted-text-color) !important;
        background: transparent !important;
    }

    .save-attributes-button {
        color: var(--muted-text-color);
        position: absolute;
        bottom: 14px;
        right: 25px;
        cursor: pointer;
        border: 1px solid transparent;
        font-size: 130%;
    }

    .add-new-attribute-button {
        color: var(--muted-text-color);
        position: absolute;
        bottom: 13px;
        right: 0;
        cursor: pointer;
        border: 1px solid transparent;
        font-size: 130%;
    }

    .add-new-attribute-button:hover, .save-attributes-button:hover {
        border: 1px solid var(--button-border-color);
        border-radius: var(--button-border-radius);
        background: var(--button-background-color);
        color: var(--button-text-color);
    }

    .attribute-errors {
        color: red;
        padding: 5px 50px 0px 5px; /* large right padding to avoid buttons */
    }
    </style>

    <div class="attribute-list-editor" tabindex="200"></div>

    <div class="bx bx-save save-attributes-button tn-tool-button" title="${lt(n("attribute_editor.save_attributes"))}"></div>
    <div class="bx bx-plus add-new-attribute-button tn-tool-button" title="${lt(n("attribute_editor.add_a_new_attribute"))}"></div>

    <div class="attribute-errors" style="display: none;"></div>
</div>
`,Le=[{marker:"@",feed:a=>Z.autocompleteSourceForCKEditor(a),itemRenderer:a=>{const t=a,e=document.createElement("button");return e.innerHTML=`${t.highlightedNotePathTitle} `,e},minimumCharacters:0},{marker:"#",feed:async a=>(await m.get(`attribute-names/?type=label&query=${encodeURIComponent(a)}`)).map(e=>({id:`#${e}`,name:e})),minimumCharacters:0},{marker:"~",feed:async a=>(await m.get(`attribute-names/?type=relation&query=${encodeURIComponent(a)}`)).map(e=>({id:`~${e}`,name:e})),minimumCharacters:0}],We={toolbar:{items:[]},placeholder:n("attribute_editor.placeholder"),mention:{feeds:Le},licenseKey:"GPL"};class Pe extends p{attributeDetailWidget;$editor;$addNewAttributeButton;$saveAttributesButton;$errors;textEditor;lastUpdatedNoteId;lastSavedContent;constructor(t){super(),this.attributeDetailWidget=t}doRender(){this.$widget=$(Be),this.$editor=this.$widget.find(".attribute-list-editor"),this.initialized=this.initEditor(),this.$editor.on("keydown",async t=>{t.which===13&&setTimeout(()=>this.save(),100),this.attributeDetailWidget.hide()}),this.$editor.on("blur",()=>setTimeout(()=>this.save(),100)),this.$addNewAttributeButton=this.$widget.find(".add-new-attribute-button"),this.$addNewAttributeButton.on("click",t=>this.addNewAttribute(t)),this.$saveAttributesButton=this.$widget.find(".save-attributes-button"),this.$saveAttributesButton.on("click",()=>this.save()),this.$errors=this.$widget.find(".attribute-errors")}addNewAttribute(t){xe.show({x:t.pageX,y:t.pageY,orientation:"left",items:[{title:n("attribute_editor.add_new_label"),command:"addNewLabel",uiIcon:"bx bx-hash"},{title:n("attribute_editor.add_new_relation"),command:"addNewRelation",uiIcon:"bx bx-transfer"},{title:"----"},{title:n("attribute_editor.add_new_label_definition"),command:"addNewLabelDefinition",uiIcon:"bx bx-empty"},{title:n("attribute_editor.add_new_relation_definition"),command:"addNewRelationDefinition",uiIcon:"bx bx-empty"}],selectMenuItemHandler:({command:e})=>this.handleAddNewAttributeCommand(e)}),t.stopPropagation()}async addNewLabelEvent({ntxId:t}){this.isNoteContext(t)&&(await this.refresh(),this.handleAddNewAttributeCommand("addNewLabel"))}async addNewRelationEvent({ntxId:t}){this.isNoteContext(t)&&(await this.refresh(),this.handleAddNewAttributeCommand("addNewRelation"))}async handleAddNewAttributeCommand(t){const e=this.parseAttributes();if(!e)return;let i,o,s;if(t==="addNewLabel")i="label",o="myLabel",s="";else if(t==="addNewRelation")i="relation",o="myRelation",s="";else if(t==="addNewLabelDefinition")i="label",o="label:myLabel",s="promoted,single,text";else if(t==="addNewRelationDefinition")i="label",o="relation:myRelation",s="promoted,single";else return;e.push({type:i,name:o,value:s,isInheritable:!1}),await this.renderOwnedAttributes(e,!1),this.$editor.scrollTop(this.$editor[0].scrollHeight);const r=this.$editor[0].getBoundingClientRect();setTimeout(()=>{this.attributeDetailWidget.showAttributeDetail({allAttributes:e,attribute:e[e.length-1],isOwned:!0,x:(r.left+r.right)/2,y:r.bottom,focus:"name"})},100)}async save(){if(this.lastUpdatedNoteId!==this.noteId){console.warn("Ignoring blur event because a different note is loaded.");return}const t=this.parseAttributes();t&&(await m.put(`notes/${this.noteId}/attributes`,t,this.componentId),this.$saveAttributesButton.fadeOut(),this.$editor.css("opacity",0),setTimeout(()=>this.$editor.css("opacity",1),100))}parseAttributes(){try{return gt.lexAndParse(this.getPreprocessedData())}catch(t){this.$errors.text(t.message).slideDown()}}getPreprocessedData(){const t=this.textEditor.getData().replace(/<a[^>]+href="(#[A-Za-z0-9_/]*)"[^>]*>[^<]*<\/a>/g,"$1").replace(/&nbsp;/g," ");return $("<div>").html(t).text()}async initEditor(){this.$widget.show(),this.$editor.on("click",e=>this.handleEditorClick(e)),this.textEditor=await Te.create(this.$editor[0],We),this.textEditor.model.document.on("change:data",()=>this.dataChanged()),this.textEditor.editing.view.document.on("enter",(e,i)=>{i.preventDefault(),e.stop()},{priority:"high"});const t=this.textEditor.editing.view.document.getRoot();t&&this.textEditor.editing.view.change(e=>e.setAttribute("spellcheck","false",t))}dataChanged(){this.lastUpdatedNoteId=this.noteId,this.lastSavedContent===this.textEditor.getData()?this.$saveAttributesButton.fadeOut():this.$saveAttributesButton.fadeIn(),this.$errors.is(":visible")&&this.$errors.hide()}async handleEditorClick(t){const e=this.textEditor.model.document.selection.getFirstPosition();if(e&&e.textNode&&e.textNode.data){const i=this.getClickIndex(e);let o;try{o=gt.lexAndParse(this.getPreprocessedData(),!0)}catch{return null}let s=null;for(const r of o)if(r.startIndex&&i>r.startIndex&&r.endIndex&&i<=r.endIndex){s=r;break}setTimeout(()=>{s?(this.$editor.tooltip("hide"),this.attributeDetailWidget.showAttributeDetail({allAttributes:o,attribute:s,isOwned:!0,x:t.pageX,y:t.pageY})):this.showHelpTooltip()},100)}else this.showHelpTooltip()}showHelpTooltip(){this.attributeDetailWidget.hide(),this.$editor.tooltip({trigger:"focus",html:!0,title:Ae,placement:"bottom",offset:"0,30"}),this.$editor.tooltip("show")}getClickIndex(t){let e=t.offset-(t.textNode?.startOffset??0),i=t.textNode;for(;i?.previousSibling;)i=i.previousSibling,i.name==="reference"?e+=i.getAttribute("href").length+1:"data"in i&&(e+=i.data.length);return e}async loadReferenceLinkTitle(t,e){const{noteId:i}=H.parseNavigationStateFromUrl(e),o=i?await W.getNote(i,!0):null,s=o?o.title:"[missing]";t.text(s)}async refreshWithNote(t){await this.renderOwnedAttributes(t.getOwnedAttributes(),!0)}async renderOwnedAttributes(t,e){t.sort((o,s)=>o.position-s.position);let i=(await Lt.renderAttributes(t,!0)).html();i.length>0&&(i+="&nbsp;"),this.textEditor.setData(i),e&&(this.lastSavedContent=this.textEditor.getData(),this.$saveAttributesButton.fadeOut(0))}async createNoteForReferenceLink(t){let e;return this.notePath&&(e=await $e.createNoteWithTypePrompt(this.notePath,{activate:!1,title:t})),e?.note?.getBestNotePathString()}async updateAttributeList(t){await this.renderOwnedAttributes(t,!1)}focus(){this.$editor.trigger("focus"),this.textEditor.model.change(t=>{const e=this.textEditor.editing.model.document.getRoot();if(!e)return;const i=t.createPositionAt(e,"end");t.setSelection(i)})}entitiesReloadedEvent({loadResults:t}){t.getAttributeRows(this.componentId).find(e=>b.isAffecting(e,this.note))&&this.refresh()}}const Oe=`
<div class="attribute-list">
    <style>
        .attribute-list {
            margin-left: 7px;
            margin-right: 7px;
            margin-top: 5px;
            margin-bottom: 2px;
            position: relative;
        }

        .attribute-list-editor p {
            margin: 0 !important;
        }
    </style>

    <div class="attr-editor-placeholder"></div>
</div>
`;class De extends p{attributeDetailWidget;attributeEditorWidget;$title;get name(){return"ownedAttributes"}get toggleCommand(){return"toggleRibbonTabOwnedAttributes"}constructor(){super(),this.attributeDetailWidget=new It().contentSized().setParent(this),this.attributeEditorWidget=new Pe(this.attributeDetailWidget).contentSized().setParent(this),this.child(this.attributeEditorWidget,this.attributeDetailWidget)}getTitle(){return{show:!this.note?.isLaunchBarConfig(),title:n("owned_attribute_list.owned_attributes"),icon:"bx bx-list-check"}}doRender(){this.$widget=$(Oe),this.contentSized(),this.$widget.find(".attr-editor-placeholder").replaceWith(this.attributeEditorWidget.render()),this.$widget.append(this.attributeDetailWidget.render()),this.$title=$("<div>")}async saveAttributesCommand(){await this.attributeEditorWidget.save()}async reloadAttributesCommand(){await this.attributeEditorWidget.refresh()}async updateAttributeListCommand({attributes:t}){await this.attributeEditorWidget.updateAttributeList(t)}focus(){this.attributeEditorWidget.focus()}}const Me=`
<div class="dropdown note-actions">
    <style>
        .note-actions {
            width: 35px;
            height: 35px;
        }

        .note-actions .dropdown-menu {
            min-width: 15em;
        }

        .note-actions .dropdown-item .bx {
            position: relative;
            top: 3px;
            font-size: 120%;
            margin-right: 5px;
        }

        .note-actions .dropdown-item[disabled], .note-actions .dropdown-item[disabled]:hover {
            color: var(--muted-text-color) !important;
            background-color: transparent !important;
            pointer-events: none; /* makes it unclickable */
        }

    </style>

    <button type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
      class="icon-action bx bx-dots-vertical-rounded"></button>

    <div class="dropdown-menu dropdown-menu-right">
        <li data-trigger-command="convertNoteIntoAttachment" class="dropdown-item">
            <span class="bx bx-paperclip"></span> ${n("note_actions.convert_into_attachment")}
        </li>

        <li data-trigger-command="renderActiveNote" class="dropdown-item render-note-button">
            <span class="bx bx-extension"></span> ${n("note_actions.re_render_note")}<kbd data-command="renderActiveNote"></kbd>
        </li>

        <li data-trigger-command="findInText" class="dropdown-item find-in-text-button">
            <span class='bx bx-search'></span> ${n("note_actions.search_in_note")}<kbd data-command="findInText"></kbd>
        </li>

        <li data-trigger-command="printActiveNote" class="dropdown-item print-active-note-button">
            <span class="bx bx-printer"></span> ${n("note_actions.print_note")}<kbd data-command="printActiveNote"></kbd>
        </li>

        <li data-trigger-command="exportAsPdf" class="dropdown-item export-as-pdf-button">
            <span class="bx bxs-file-pdf"></span> ${n("note_actions.print_pdf")}<kbd data-command="exportAsPdf"></kbd>
        </li>

        <div class="dropdown-divider"></div>


        <li class="dropdown-item import-files-button"><span class="bx bx-import"></span> ${n("note_actions.import_files")}</li>

        <li class="dropdown-item export-note-button"><span class="bx bx-export"></span> ${n("note_actions.export_note")}</li>


        <div class="dropdown-divider"></div>



        <li data-trigger-command="openNoteExternally" class="dropdown-item open-note-externally-button" title="${n("note_actions.open_note_externally_title")}">
            <span class="bx bx-file-find"></span> ${n("note_actions.open_note_externally")}<kbd data-command="openNoteExternally"></kbd>
        </li>

        <li data-trigger-command="openNoteCustom" class="dropdown-item open-note-custom-button">
            <span class="bx bx-customize"></span> ${n("note_actions.open_note_custom")}<kbd data-command="openNoteCustom"></kbd>
        </li>

        <li data-trigger-command="showNoteSource" class="dropdown-item show-source-button">
            <span class="bx bx-code"></span> ${n("note_actions.note_source")}<kbd data-command="showNoteSource"></kbd>
        </li>


        <div class="dropdown-divider"></div>


        <li data-trigger-command="forceSaveRevision" class="dropdown-item save-revision-button">
            <span class="bx bx-save"></span> ${n("note_actions.save_revision")}<kbd data-command="forceSaveRevision"></kbd>
        </li>

        <li class="dropdown-item delete-note-button"><span class="bx bx-trash destructive-action-icon"></span> ${n("note_actions.delete_note")}</li>


        <div class="dropdown-divider"></div>


        <li data-trigger-command="showAttachments" class="dropdown-item show-attachments-button">
            <span class="bx bx-paperclip"></span> ${n("note_actions.note_attachments")}<kbd data-command="showAttachments"></kbd>
        </li>
    </div>
</div>`;class ze extends p{$convertNoteIntoAttachmentButton;$findInTextButton;$printActiveNoteButton;$exportAsPdfButton;$showSourceButton;$showAttachmentsButton;$renderNoteButton;$saveRevisionButton;$exportNoteButton;$importNoteButton;$openNoteExternallyButton;$openNoteCustomButton;$deleteNoteButton;isEnabled(){return this.note?.type!=="launcher"}doRender(){this.$widget=$(Me),this.$widget.on("show.bs.dropdown",()=>{this.note&&this.refreshVisibility(this.note)}),this.$convertNoteIntoAttachmentButton=this.$widget.find("[data-trigger-command='convertNoteIntoAttachment']"),this.$findInTextButton=this.$widget.find(".find-in-text-button"),this.$printActiveNoteButton=this.$widget.find(".print-active-note-button"),this.$exportAsPdfButton=this.$widget.find(".export-as-pdf-button"),this.$showSourceButton=this.$widget.find(".show-source-button"),this.$showAttachmentsButton=this.$widget.find(".show-attachments-button"),this.$renderNoteButton=this.$widget.find(".render-note-button"),this.$saveRevisionButton=this.$widget.find(".save-revision-button"),this.$exportNoteButton=this.$widget.find(".export-note-button"),this.$exportNoteButton.on("click",()=>{this.$exportNoteButton.hasClass("disabled")||!this.noteContext?.notePath||this.triggerCommand("showExportDialog",{notePath:this.noteContext.notePath,defaultType:"single"})}),this.$importNoteButton=this.$widget.find(".import-files-button"),this.$importNoteButton.on("click",()=>{this.noteId&&this.triggerCommand("showImportDialog",{noteId:this.noteId})}),this.$widget.on("click",".dropdown-item",()=>this.$widget.find("[data-bs-toggle='dropdown']").dropdown("toggle")),this.$openNoteExternallyButton=this.$widget.find(".open-note-externally-button"),this.$openNoteCustomButton=this.$widget.find(".open-note-custom-button"),this.$deleteNoteButton=this.$widget.find(".delete-note-button"),this.$deleteNoteButton.on("click",()=>{!this.note||this.note.noteId==="root"||Tt.deleteNotes([this.note.getParentBranches()[0].branchId],!0)})}async refreshVisibility(t){const e=t.noteId.startsWith("_options");this.$convertNoteIntoAttachmentButton.toggle(t.isEligibleForConversionToAttachment()),this.toggleDisabled(this.$findInTextButton,["text","code","book","mindMap","doc"].includes(t.type)),this.toggleDisabled(this.$showAttachmentsButton,!e),this.toggleDisabled(this.$showSourceButton,["text","code","relationMap","mermaid","canvas","mindMap"].includes(t.type));const i=["text","code"].includes(t.type);this.toggleDisabled(this.$printActiveNoteButton,i),this.toggleDisabled(this.$exportAsPdfButton,i),this.$exportAsPdfButton.toggleClass("hidden-ext",!w.isElectron()),this.$renderNoteButton.toggle(t.type==="render"),this.toggleDisabled(this.$openNoteExternallyButton,w.isElectron()&&!["search","book"].includes(t.type)),this.toggleDisabled(this.$openNoteCustomButton,w.isElectron()&&!w.isMac()&&!["search","book"].includes(t.type)),this.toggleDisabled(this.$exportNoteButton,!["_backendLog"].includes(t.noteId)&&!e),this.toggleDisabled(this.$importNoteButton,!["search"].includes(t.type)&&!e),this.toggleDisabled(this.$deleteNoteButton,!e),this.toggleDisabled(this.$saveRevisionButton,!e)}async convertNoteIntoAttachmentCommand(){if(!this.note||!await Q.confirm(n("note_actions.convert_into_attachment_prompt",{title:this.note.title})))return;const{attachment:t}=await m.post(`notes/${this.noteId}/convert-to-attachment`);if(!t){k.showMessage(n("note_actions.convert_into_attachment_failed",{title:this.note.title}));return}k.showMessage(n("note_actions.convert_into_attachment_successful",{title:t.title})),await L.waitForMaxKnownEntityChangeId(),await u.tabManager.getActiveContext()?.setNote(t.ownerId,{viewScope:{viewMode:"attachments",attachmentId:t.attachmentId}})}toggleDisabled(t,e){e?t.removeAttr("disabled"):t.attr("disabled","disabled")}entitiesReloadedEvent({loadResults:t}){t.isNoteReloaded(this.noteId)&&this.refresh()}}const Fe=`
<div class="ribbon-container">
    <style>
    .ribbon-container {
        margin-bottom: 5px;
    }

    .ribbon-top-row {
        display: flex;
    }

    .ribbon-tab-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-left: 10px;
        flex-grow: 1;
        flex-flow: row wrap;
    }

    .ribbon-tab-title {
        color: var(--muted-text-color);
        border-bottom: 1px solid var(--main-border-color);
        min-width: 24px;
        flex-basis: 24px;
        max-width: max-content;
        flex-grow: 10;
    }

    .ribbon-tab-title .bx {
        font-size: 150%;
        position: relative;
        top: 3px;
    }

    .ribbon-tab-title.active {
        color: var(--main-text-color);
        border-bottom: 3px solid var(--main-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .ribbon-tab-title:hover {
        cursor: pointer;
    }

    .ribbon-tab-title:hover {
        color: var(--main-text-color);
    }

    .ribbon-tab-title:first-of-type {
        padding-left: 10px;
    }

    .ribbon-tab-spacer {
        flex-basis: 0;
        min-width: 0;
        max-width: 35px;
        flex-grow: 1;
        border-bottom: 1px solid var(--main-border-color);
    }

    .ribbon-tab-spacer:last-of-type {
        flex-grow: 1;
        flex-basis: 0;
        min-width: 0;
        max-width: 10000px;
    }

    .ribbon-button-container {
        display: flex;
        border-bottom: 1px solid var(--main-border-color);
        margin-right: 5px;
    }

    .ribbon-button-container > * {
        position: relative;
        top: -3px;
        margin-left: 10px;
    }

    .ribbon-body {
        display: none;
        border-bottom: 1px solid var(--main-border-color);
        margin-left: 10px;
        margin-right: 5px; /* needs to have this value so that the bottom border is the same width as the top one */
    }

    .ribbon-body.active {
        display: block;
    }

    .ribbon-tab-title-label {
        display: none;
    }

    .ribbon-tab-title.active .ribbon-tab-title-label {
        display: inline;
    }
    </style>

    <div class="ribbon-top-row">
        <div class="ribbon-tab-container"></div>
        <div class="ribbon-button-container"></div>
    </div>

    <div class="ribbon-body-container"></div>
</div>`;class He extends p{lastActiveComponentId;lastNoteType;ribbonWidgets;buttonWidgets;$tabContainer;$buttonContainer;$bodyContainer;constructor(){super(),this.contentSized(),this.ribbonWidgets=[],this.buttonWidgets=[]}isEnabled(){return super.isEnabled()&&this.noteContext?.viewScope?.viewMode==="default"}ribbon(t){return super.child(t),this.ribbonWidgets.push(t),this}button(t){return super.child(t),this.buttonWidgets.push(t),this}doRender(){this.$widget=$(Fe),this.$tabContainer=this.$widget.find(".ribbon-tab-container"),this.$buttonContainer=this.$widget.find(".ribbon-button-container"),this.$bodyContainer=this.$widget.find(".ribbon-body-container");for(const t of this.ribbonWidgets)this.$bodyContainer.append($('<div class="ribbon-body">').attr("data-ribbon-component-id",t.componentId).append(t.render()));for(const t of this.buttonWidgets)this.$buttonContainer.append(t.render());this.$tabContainer.on("click",".ribbon-tab-title",t=>{const e=$(t.target).closest(".ribbon-tab-title");this.toggleRibbonTab(e)})}toggleRibbonTab(t,e=!0){const i=!t.hasClass("active");if(this.$tabContainer.find(".ribbon-tab-title").removeClass("active"),this.$bodyContainer.find(".ribbon-body").removeClass("active"),i){const o=t.attr("data-ribbon-component-id"),s=this.lastActiveComponentId===o;this.lastActiveComponentId=o,this.$tabContainer.find(`.ribbon-tab-title[data-ribbon-component-id="${o}"]`).addClass("active"),this.$bodyContainer.find(`.ribbon-body[data-ribbon-component-id="${o}"]`).addClass("active");const r=this.getActiveRibbonWidget();if(r&&(e||!s)&&this.noteContext&&this.notePath){const d=r.handleEvent("noteSwitched",{noteContext:this.noteContext,notePath:this.notePath});e&&(d?d.then(()=>r.focus?.()):r.focus?.())}}else this.lastActiveComponentId=null}async noteSwitched(){this.lastActiveComponentId=null,await super.noteSwitched()}async refreshWithNote(t,e=!1){this.lastNoteType=t.type;let i,o;this.$tabContainer.empty();for(const s of this.ribbonWidgets){const r=await s.getTitle(t);if(!r.show)continue;const d=$('<div class="ribbon-tab-title">').attr("data-ribbon-component-id",s.componentId).attr("data-ribbon-component-name",s.name).append($('<span class="ribbon-tab-title-icon">').addClass(r.icon).attr("title",r.title).attr("data-toggle-command",s.toggleCommand)).append(" ").append($('<span class="ribbon-tab-title-label">').text(r.title));this.$tabContainer.append(d),this.$tabContainer.append('<div class="ribbon-tab-spacer">'),r.activate&&!this.lastActiveComponentId&&!i&&!e&&(i=d),this.lastActiveComponentId===s.componentId&&(o=d)}J.getActions().then(s=>{this.$tabContainer.find(".ribbon-tab-title-icon").tooltip({title:()=>{const r=$(this).attr("data-toggle-command"),d=s.find(c=>c.actionName===r),l=$(this).attr("data-title");return d?.effectiveShortcuts&&d.effectiveShortcuts.length>0?`${l} (${d.effectiveShortcuts.join(", ")})`:l??""}})}),i||(i=o),i?this.toggleRibbonTab(i,!1):this.$bodyContainer.find(".ribbon-body").removeClass("active")}isRibbonTabActive(t){return this.$widget.find(`.ribbon-tab-title[data-ribbon-component-name='${t}']`).hasClass("active")}ensureOwnedAttributesAreOpen(t){t&&this.isNoteContext(t)&&!this.isRibbonTabActive("ownedAttributes")&&this.toggleRibbonTabWithName("ownedAttributes",t)}addNewLabelEvent({ntxId:t}){this.ensureOwnedAttributesAreOpen(t)}addNewRelationEvent({ntxId:t}){this.ensureOwnedAttributesAreOpen(t)}toggleRibbonTabWithName(t,e){if(!this.isNoteContext(e))return!1;const i=this.$widget.find(`.ribbon-tab-title[data-ribbon-component-name='${t}']`);i&&this.toggleRibbonTab(i)}handleEvent(t,e){const i="toggleRibbonTab";if(t.startsWith(i)){let o=t.substr(i.length);o=o[0].toLowerCase()+o.substr(1),this.toggleRibbonTabWithName(o,e.ntxId)}else return super.handleEvent(t,e)}async handleEventInChildren(t,e){if(["activeContextChanged","setNoteContext"].includes(t))await super.handleEventInChildren("setNoteContext",e);else if(this.isEnabled()||t==="initialRenderComplete"){const i=this.getActiveRibbonWidget();i&&await i.handleEvent(t,e);for(const o of this.buttonWidgets)await o.handleEvent(t,e)}}entitiesReloadedEvent({loadResults:t}){this.note&&(this.noteId&&t.isNoteReloaded(this.noteId)&&this.lastNoteType!==this.note.type?(this.lastNoteType=this.note.type,this.refresh()):t.getAttributeRows(this.componentId).find(e=>b.isAffecting(e,this.note))&&this.refreshWithNote(this.note,!0))}async noteTypeMimeChangedEvent(){}readOnlyTemporarilyDisabledEvent(){this.refresh()}getActiveRibbonWidget(){return this.ribbonWidgets.find(t=>t.componentId===this.lastActiveComponentId)}}const Ve=`
<div class="inherited-attributes-widget">
    <style>
    .inherited-attributes-widget {
        position: relative;
    }

    .inherited-attributes-container {
        color: var(--muted-text-color);
        max-height: 200px;
        overflow: auto;
        padding: 14px 12px 13px 12px;
    }
    </style>

    <div class="inherited-attributes-container"></div>
</div>`;class qe extends p{attributeDetailWidget;$container;get name(){return"inheritedAttributes"}get toggleCommand(){return"toggleRibbonTabInheritedAttributes"}constructor(){super(),this.attributeDetailWidget=new It().contentSized().setParent(this),this.child(this.attributeDetailWidget)}getTitle(){return{show:!this.note?.isLaunchBarConfig(),title:n("inherited_attribute_list.title"),icon:"bx bx-list-plus"}}doRender(){this.$widget=$(Ve),this.contentSized(),this.$container=this.$widget.find(".inherited-attributes-container"),this.$widget.append(this.attributeDetailWidget.render())}async refreshWithNote(t){this.$container.empty();const e=this.getInheritedAttributes(t);if(e.length===0){this.$container.append(n("inherited_attribute_list.no_inherited_attributes"));return}for(const i of e){const o=(await Lt.renderAttribute(i,!1)).on("click",s=>{setTimeout(()=>this.attributeDetailWidget.showAttributeDetail({attribute:{noteId:i.noteId,type:i.type,name:i.name,value:i.value,isInheritable:i.isInheritable},isOwned:!1,x:s.pageX,y:s.pageY}),100)});this.$container.append(o).append(" ")}}getInheritedAttributes(t){const e=t.getAttributes().filter(i=>i.noteId!==this.noteId);return e.sort((i,o)=>i.noteId===o.noteId?i.position-o.position:i.noteId<o.noteId?-1:1),e}entitiesReloadedEvent({loadResults:t}){t.getAttributeRows(this.componentId).find(e=>b.isAffecting(e,this.note))&&this.refresh()}}class x extends ve{attribute;note;constructor(t,e){super(),this.attribute=t,this.note=e}static async setAttribute(t,e,i,o=""){await m.put(`notes/${t}/set-attribute`,{type:e,name:i,value:o}),await L.waitForMaxKnownEntityChangeId()}async setAttribute(t,e,i=""){await this.constructor.setAttribute(this.note.noteId,t,e,i)}render(){try{const t=this.doRender();return t.find(".search-option-del").on("click",()=>this.deleteOption()).attr("title",n("abstract_search_option.remove_this_search_option")),w.initHelpDropdown(t),t}catch(t){return logError(n("abstract_search_option.failed_rendering",{dto:JSON.stringify(this.attribute.dto),error:t.message,stack:t.stack})),null}}async deleteOption(){await this.deleteAttribute(this.constructor.attributeType,this.constructor.optionName),await L.waitForMaxKnownEntityChangeId(),await this.triggerCommand("refreshSearchDefinition")}async deleteAttribute(t,e){for(const i of this.note.getOwnedAttributes())i.type===t&&i.name===e&&await m.remove(`notes/${this.note.noteId}/attributes/${i.attributeId}`)}}const Ue=`
<tr>
    <td class="title-column">${n("search_string.title_column")}</td>
    <td>
        <textarea class="form-control search-string" placeholder="${n("search_string.placeholder")}" autofocus></textarea>
    </td>
    <td class="button-column">
        <div class="dropdown help-dropdown">
          <span class="bx bx-help-circle icon-action" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
          <div class="dropdown-menu dropdown-menu-right p-4">
            <strong>${n("search_string.search_syntax")}</strong> - ${n("search_string.also_see")} <a href="#" data-help-page="search.html">${n("search_string.complete_help")}</a>

            <ul style="marigin-bottom: 0;">
                <li>${n("search_string.full_text_search")}</li>
                <li><code>#abc</code> - ${n("search_string.label_abc")}</li>
                <li><code>#year = 2019</code> - ${n("search_string.label_year")}</li>
                <li><code>#rock #pop</code> - ${n("search_string.label_rock_pop")}</li>
                <li><code>#rock or #pop</code> - ${n("search_string.label_rock_or_pop")}</li>
                <li><code>#year &lt;= 2000</code> - ${n("search_string.label_year_comparison")}</li>
                <li><code>note.dateCreated >= MONTH-1</code> - ${n("search_string.label_date_created")}</li>
            </ul>
          </div>
        </div>

        <span class="bx bx-x icon-action search-option-del"></span>
    </td>
</tr>`;class je extends x{$searchString;spacedUpdate;static get optionName(){return"searchString"}static get attributeType(){return"label"}static async create(t){await x.setAttribute(t,"label","searchString")}doRender(){const t=$(Ue);return this.$searchString=t.find(".search-string"),this.$searchString.on("input",()=>this.spacedUpdate.scheduleUpdate()),ye.bindElShortcut(this.$searchString,"return",async()=>{await this.spacedUpdate.updateNowIfNecessary(),this.triggerCommand("refreshResults")}),this.spacedUpdate=new _e(async()=>{const e=String(this.$searchString.val());u.lastSearchString=e,await this.setAttribute("label","searchString",e),this.note.title.startsWith(n("search_string.search_prefix"))&&await m.put(`notes/${this.note.noteId}/title`,{title:`${n("search_string.search_prefix")} ${e.length<30?e:`${e.substr(0,30)}…`}`})},1e3),this.$searchString.val(this.note.getLabelValue("searchString")??""),t}showSearchErrorEvent({error:t}){let e=new Ce(this.$searchString[0],{trigger:"manual",title:`${n("search_string.error",{error:t})}`,placement:"bottom"});e.show(),setTimeout(()=>e.dispose(),4e3)}focusOnSearchDefinitionEvent(){this.$searchString.val(String(this.$searchString.val()).trim()??u.lastSearchString).focus().select(),this.spacedUpdate.scheduleUpdate()}}const Ke=`
<tr data-search-option-conf="fastSearch">
    <td colSpan="2">
        <span class="bx bx-run"></span>
        ${n("fast_search.fast_search")}
    </td>
    <td class="button-column">
        <div class="dropdown help-dropdown">
            <span class="bx bx-help-circle icon-action" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
            <div class="dropdown-menu dropdown-menu-right p-4">
                ${n("fast_search.description")}
            </div>
        </div>
        <span class="bx bx-x icon-action search-option-del"></span>
    </td>
</tr>`;class Ge extends x{static get optionName(){return"fastSearch"}static get attributeType(){return"label"}static async create(t){await x.setAttribute(t,"label","fastSearch")}doRender(){return $(Ke)}}const Ye=`
<tr>
    <td colspan="2">
        <div style="display: flex; align-items: center;">
            <div style="margin-right: 10px">${n("ancestor.label")}:</div>
            <div class="input-group" style="flex-shrink: 2">
                <input class="ancestor form-control" placeholder="${n("ancestor.placeholder")}">
            </div>

            <div style="margin-left: 10px; margin-right: 10px">${n("ancestor.depth_label")}:</div>

            <select name="depth" class="form-select d-inline ancestor-depth" style="flex-shrink: 3">
                <option value="">${n("ancestor.depth_doesnt_matter")}</option>
                <option value="eq1">${n("ancestor.depth_eq",{count:1})} (${n("ancestor.direct_children")})</option>
                <option value="eq2">${n("ancestor.depth_eq",{count:2})}</option>
                <option value="eq3">${n("ancestor.depth_eq",{count:3})}</option>
                <option value="eq4">${n("ancestor.depth_eq",{count:4})}</option>
                <option value="eq5">${n("ancestor.depth_eq",{count:5})}</option>
                <option value="eq6">${n("ancestor.depth_eq",{count:6})}</option>
                <option value="eq7">${n("ancestor.depth_eq",{count:7})}</option>
                <option value="eq8">${n("ancestor.depth_eq",{count:8})}</option>
                <option value="eq9">${n("ancestor.depth_eq",{count:9})}</option>
                <option value="gt0">${n("ancestor.depth_gt",{count:0})}</option>
                <option value="gt1">${n("ancestor.depth_gt",{count:1})}</option>
                <option value="gt2">${n("ancestor.depth_gt",{count:2})}</option>
                <option value="gt3">${n("ancestor.depth_gt",{count:3})}</option>
                <option value="gt4">${n("ancestor.depth_gt",{count:4})}</option>
                <option value="gt5">${n("ancestor.depth_gt",{count:5})}</option>
                <option value="gt6">${n("ancestor.depth_gt",{count:6})}</option>
                <option value="gt7">${n("ancestor.depth_gt",{count:7})}</option>
                <option value="gt8">${n("ancestor.depth_gt",{count:8})}</option>
                <option value="gt9">${n("ancestor.depth_gt",{count:9})}</option>
                <option value="lt2">${n("ancestor.depth_lt",{count:2})}</option>
                <option value="lt3">${n("ancestor.depth_lt",{count:3})}</option>
                <option value="lt4">${n("ancestor.depth_lt",{count:4})}</option>
                <option value="lt5">${n("ancestor.depth_lt",{count:5})}</option>
                <option value="lt6">${n("ancestor.depth_lt",{count:6})}</option>
                <option value="lt7">${n("ancestor.depth_lt",{count:7})}</option>
                <option value="lt8">${n("ancestor.depth_lt",{count:8})}</option>
                <option value="lt9">${n("ancestor.depth_lt",{count:9})}</option>
            </select>
        </div>
    </td>
    <td class="button-column">
        <span class="bx bx-x icon-action search-option-del"></span>
    </td>
</tr>`;class Xe extends x{static get optionName(){return"ancestor"}static get attributeType(){return"relation"}static async create(t){await x.setAttribute(t,"relation","ancestor","root")}doRender(){const t=$(Ye),e=t.find(".ancestor"),i=t.find(".ancestor-depth");Z.initNoteAutocomplete(e),e.on("autocomplete:closed",async()=>{const r=e.getSelectedNoteId();r&&await this.setAttribute("relation","ancestor",r)}),i.on("change",async()=>{const r=String(i.val());r?await this.setAttribute("label","ancestorDepth",r):await this.deleteAttribute("label","ancestorDepth")});const o=this.note.getRelationValue("ancestor");o&&o!=="root"&&e.setNote(o);const s=this.note.getLabelValue("ancestorDepth");return s&&i.val(s),t}async deleteOption(){await this.deleteAttribute("label","ancestorDepth"),await super.deleteOption()}}const Qe=`
<tr data-search-option-conf="includeArchivedNotes">
    <td colspan="2">
        <span class="bx bx-archive"></span>
        ${n("include_archived_notes.include_archived_notes")}
    </td>
    <td class="button-column">
        <span class="bx bx-x icon-action search-option-del"></span>
    </td>
</tr>`;class Je extends x{static get optionName(){return"includeArchivedNotes"}static get attributeType(){return"label"}static async create(t){await x.setAttribute(t,"label","includeArchivedNotes")}doRender(){return $(Qe)}}const Ze=`
<tr data-search-option-conf="orderBy">
    <td class="title-column">
        <span class="bx bx-arrow-from-top"></span>
        ${n("order_by.order_by")}
    </td>
    <td>
        <select name="orderBy" class="form-control w-auto d-inline">
            <option value="relevancy">${n("order_by.relevancy")}</option>
            <option value="title">${n("order_by.title")}</option>
            <option value="dateCreated">${n("order_by.date_created")}</option>
            <option value="dateModified">${n("order_by.date_modified")}</option>
            <option value="contentSize">${n("order_by.content_size")}</option>
            <option value="contentAndAttachmentsSize">${n("order_by.content_and_attachments_size")}</option>
            <option value="contentAndAttachmentsAndRevisionsSize">${n("order_by.content_and_attachments_and_revisions_size")}</option>
            <option value="revisionCount">${n("order_by.revision_count")}</option>
            <option value="childrenCount">${n("order_by.children_count")}</option>
            <option value="parentCount">${n("order_by.parent_count")}</option>
            <option value="ownedLabelCount">${n("order_by.owned_label_count")}</option>
            <option value="ownedRelationCount">${n("order_by.owned_relation_count")}</option>
            <option value="targetRelationCount">${n("order_by.target_relation_count")}</option>
            <option value="random">${n("order_by.random")}</option>
        </select>

        <select name="orderDirection" class="form-control w-auto d-inline">
            <option value="asc">${n("order_by.asc")}</option>
            <option value="desc">${n("order_by.desc")}</option>
        </select>
    </td>
    <td class="button-column">
        <span class="bx bx-x icon-action search-option-del"></span>
    </td>
</tr>`;class ti extends x{static get optionName(){return"orderBy"}static get attributeType(){return"label"}static async create(t){await x.setAttribute(t,"label","orderBy","relevancy"),await x.setAttribute(t,"label","orderDirection","asc")}doRender(){const t=$(Ze),e=t.find("select[name=orderBy]");e.on("change",async()=>{const o=String(e.val());await this.setAttribute("label","orderBy",o)}),e.val(this.note.getLabelValue("orderBy")??"");const i=t.find("select[name=orderDirection]");return i.on("change",async()=>{const o=String(i.val());await this.setAttribute("label","orderDirection",o)}),i.val(this.note.getLabelValue("orderDirection")||"asc"),t}async deleteOption(){await this.deleteAttribute("label","orderDirection"),await super.deleteOption()}}const ei=`
<tr>
    <td class="title-column">
        ${n("search_script.title")}
    </td>
    <td>
        <div class="input-group">
            <input class="search-script form-control" placeholder="${n("search_script.placeholder")}">
        </div>
    </td>
    <td class="button-column">
        <div class="dropdown help-dropdown">
          <span class="bx bx-help-circle icon-action" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
          <div class="dropdown-menu dropdown-menu-right p-4">
            <p>${n("search_script.description1")}</p>

            <p>${n("search_script.description2")}</p>

            <p>${n("search_script.example_title")}</p>

            <pre>${n("search_script.example_code")}</pre>

            ${n("search_script.note")}
          </div>
        </div>

        <span class="bx bx-x icon-action search-option-del"></span>
    </td>
</tr>`;class ii extends x{static get optionName(){return"searchScript"}static get attributeType(){return"relation"}static async create(t){await x.setAttribute(t,"relation","searchScript","root")}doRender(){const t=$(ei),e=t.find(".search-script");Z.initNoteAutocomplete(e,{allowCreatingNotes:!0}),e.on("autocomplete:closed",async()=>{const o=e.getSelectedNoteId();o&&await this.setAttribute("relation","searchScript",o)});const i=this.note.getRelationValue("searchScript");return i&&i!=="root"&&e.setNote(i),t}}const ni=`
<tr data-search-option-conf="limit">
    <td class="title-column">
        <span class="bx bx-stop"></span>
        ${n("limit.limit")}
    </td>
    <td>
        <input name="limit" class="form-control" type="number" min="1" step="1" />
    </td>
    <td class="button-column">
        <div class="dropdown help-dropdown">
            <span class="bx bx-help-circle icon-action" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
            <div class="dropdown-menu dropdown-menu-right p-4">
                ${n("limit.take_first_x_results")}
            </div>
        </div>

        <span class="bx bx-x icon-action search-option-del"></span>
    </td>
</tr>`;class oi extends x{$limit;static get optionName(){return"limit"}static get attributeType(){return"label"}static async create(t){await x.setAttribute(t,"label","limit","10")}doRender(){const t=$(ni);return this.$limit=t.find("input[name=limit]"),this.$limit.on("change",()=>this.update()),this.$limit.on("input",()=>this.update()),this.$limit.val(this.note.getLabelValue("limit")??""),t}async update(){const t=String(this.$limit.val());await this.setAttribute("label","limit",t)}}const si=`
<tr data-search-option-conf="debug">
    <td colSpan="2">
        <span class="bx bx-bug"></span>
        ${n("debug.debug")}
    </td>
    <td class="button-column">
        <div class="dropdown help-dropdown">
            <span class="bx bx-help-circle icon-action" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></span>
            <div class="dropdown-menu dropdown-menu-right p-4">
                <p>${n("debug.debug_info")}</p>
                ${n("debug.access_info")}
            </div>
        </div>
        <span class="bx bx-x icon-action search-option-del"></span>
    </td>
</tr>`;class ai extends x{static get optionName(){return"debug"}static get attributeType(){return"label"}static async create(t){await x.setAttribute(t,"label","debug")}doRender(){return $(si)}}const ri=`
<div class="search-definition-widget">
    <style>
    .search-setting-table {
        margin-top: 0;
        margin-bottom: 7px;
        width: 100%;
        border-collapse: separate;
        border-spacing: 10px;
    }

    .search-setting-table div {
        white-space: nowrap;
    }

    .search-setting-table .button-column {
        /* minimal width so that table remains static sized and most space remains for middle column with settings */
        width: 50px;
        white-space: nowrap;
        text-align: right;
    }

    .search-setting-table .title-column {
        /* minimal width so that table remains static sized and most space remains for middle column with settings */
        width: 50px;
        white-space: nowrap;
    }

    .search-setting-table .button-column .dropdown-menu {
        white-space: normal;
    }

    .attribute-list hr {
        height: 1px;
        border-color: var(--main-border-color);
        position: relative;
        top: 4px;
        margin-top: 5px;
        margin-bottom: 0;
    }

    .search-definition-widget input:invalid {
        border: 3px solid red;
    }

    .add-search-option button {
        margin-top: 5px; /* to give some spacing when buttons overflow on the next line */
    }

    .dropdown-header {
        background-color: var(--accented-background-color);
    }
    </style>

    <div class="search-settings">
        <table class="search-setting-table">
            <tr>
                <td class="title-column">${n("search_definition.add_search_option")}</td>
                <td colspan="2" class="add-search-option">
                    <button type="button" class="btn btn-sm" data-search-option-add="searchString">
                        <span class="bx bx-text"></span>
                        ${n("search_definition.search_string")}
                    </button>

                    <button type="button" class="btn btn-sm" data-search-option-add="searchScript">
                        <span class="bx bx-code"></span>
                        ${n("search_definition.search_script")}
                    </button>

                    <button type="button" class="btn btn-sm" data-search-option-add="ancestor">
                        <span class="bx bx-filter-alt"></span>
                        ${n("search_definition.ancestor")}
                    </button>

                    <button type="button" class="btn btn-sm" data-search-option-add="fastSearch"
                        title="${n("search_definition.fast_search_description")}">
                        <span class="bx bx-run"></span>
                        ${n("search_definition.fast_search")}
                    </button>

                    <button type="button" class="btn btn-sm" data-search-option-add="includeArchivedNotes"
                        title="${n("search_definition.include_archived_notes_description")}">
                        <span class="bx bx-archive"></span>
                        ${n("search_definition.include_archived")}
                    </button>

                    <button type="button" class="btn btn-sm" data-search-option-add="orderBy">
                        <span class="bx bx-arrow-from-top"></span>
                        ${n("search_definition.order_by")}
                    </button>

                    <button type="button" class="btn btn-sm" data-search-option-add="limit" title="${n("search_definition.limit_description")}">
                        <span class="bx bx-stop"></span>
                        ${n("search_definition.limit")}
                    </button>

                    <button type="button" class="btn btn-sm" data-search-option-add="debug" title="${n("search_definition.debug_description")}">
                        <span class="bx bx-bug"></span>
                        ${n("search_definition.debug")}
                    </button>

                    <div class="dropdown" style="display: inline-block;">
                      <button class="btn btn-sm dropdown-toggle action-add-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="bx bxs-zap"></span>
                        ${n("search_definition.action")}
                      </button>
                      <div class="dropdown-menu action-list"></div>
                    </div>
                </td>
            </tr>
            <tbody class="search-options"></tbody>
            <tbody class="action-options"></tbody>
            <tbody>
                <tr>
                    <td colspan="3">
                        <div style="display: flex; justify-content: space-evenly">
                            <button type="button" class="btn btn-sm search-button">
                                <span class="bx bx-search"></span>
                                ${n("search_definition.search_button")}
                            </button>

                            <button type="button" class="btn btn-sm search-and-execute-button">
                                <span class="bx bxs-zap"></span>
                                ${n("search_definition.search_execute")}
                            </button>

                            <button type="button" class="btn btn-sm save-to-note-button">
                                <span class="bx bx-save"></span>
                                ${n("search_definition.save_to_note")}
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>`,bt=[je,ii,Xe,Ge,Je,ti,oi,ai];class di extends p{$component;$actionList;$searchOptions;$searchButton;$searchAndExecuteButton;$saveToNoteButton;$actionOptions;get name(){return"searchDefinition"}isEnabled(){return this.note&&this.note.type==="search"}getTitle(){return{show:this.isEnabled(),activate:!0,title:n("search_definition.search_parameters"),icon:"bx bx-search"}}doRender(){this.$widget=$(ri),this.contentSized(),this.$component=this.$widget.find(".search-definition-widget"),this.$actionList=this.$widget.find(".action-list");for(const t of G.ACTION_GROUPS){this.$actionList.append($('<h6 class="dropdown-header">').append(t.title));for(const e of t.actions)this.$actionList.append($('<a class="dropdown-item" href="#">').attr("data-action-add",e.actionName).text(e.actionTitle))}this.$widget.on("click","[data-search-option-add]",async t=>{const e=$(t.target).attr("data-search-option-add"),i=bt.find(o=>o.optionName===e);i&&this.noteId?await i.create(this.noteId):logError(n("search_definition.unknown_search_option",{searchOptionName:e})),this.refresh()}),this.$widget.on("click","[data-action-add]",async t=>{V.getOrCreateInstance(this.$widget.find(".action-add-toggle")[0]);const e=$(t.target).attr("data-action-add");this.noteId&&e&&await G.addAction(this.noteId,e),this.refresh()}),this.$searchOptions=this.$widget.find(".search-options"),this.$actionOptions=this.$widget.find(".action-options"),this.$searchButton=this.$widget.find(".search-button"),this.$searchButton.on("click",()=>this.triggerCommand("refreshResults")),this.$searchAndExecuteButton=this.$widget.find(".search-and-execute-button"),this.$searchAndExecuteButton.on("click",()=>this.searchAndExecute()),this.$saveToNoteButton=this.$widget.find(".save-to-note-button"),this.$saveToNoteButton.on("click",async()=>{const{notePath:t}=await m.post("special-notes/save-search-note",{searchNoteId:this.noteId});await L.waitForMaxKnownEntityChangeId(),await u.tabManager.getActiveContext()?.setNote(t),k.showMessage(n("search_definition.search_note_saved",{notePathTitle:await q.getNotePathTitle(t)}))})}async refreshResultsCommand(){if(this.noteId){try{const t=await W.loadSearchNote(this.noteId);t&&t.error&&this.handleEvent("showSearchError",{error:t.error})}catch(t){k.showError(t.message)}this.triggerEvent("searchRefreshed",{ntxId:this.noteContext?.ntxId})}}async refreshSearchDefinitionCommand(){await this.refresh()}async refreshWithNote(t){if(!this.note)return;this.$component.show(),this.$saveToNoteButton.toggle(t.isHiddenCompletely()),this.$searchOptions.empty();for(const o of bt){const{attributeType:s,optionName:r}=o,d=this.note.getAttribute(s,r);if(this.$widget.find(`[data-search-option-add='${r}'`).toggle(!d),d){const l=new o(d,this.note).setParent(this);this.child(l);const c=l.render();c&&this.$searchOptions.append(c)}}const e=G.parseActions(this.note),i=e.map(o=>Ft(this,o.doRender())).filter(o=>o);this.$actionOptions.empty().append(...i),this.$searchAndExecuteButton.css("visibility",e.length>0?"visible":"_hidden")}getContent(){return""}async searchAndExecute(){await m.post(`search-and-execute-note/${this.noteId}`),this.triggerCommand("refreshResults"),k.showMessage(n("search_definition.actions_executed"),3e3)}entitiesReloadedEvent({loadResults:t}){t.getAttributeRows().find(e=>e.type==="label"&&e.name==="action"&&e.isDeleted)&&this.refresh()}}const li=`
<div class="sql-result-widget">
    <style>
    .sql-result-widget {
        padding: 15px;
    }

    .sql-console-result-container td {
        white-space: preserve;
    }
    </style>

    <div class="sql-query-no-rows alert alert-info" style="display: none;">
        ${n("sql_result.no_rows")}
    </div>

    <div class="sql-console-result-container"></div>
</div>`;class ci extends p{$resultContainer;$noRowsAlert;isEnabled(){return this.note&&this.note.mime==="text/x-sqlite;schema=trilium"&&super.isEnabled()}doRender(){this.$widget=$(li),this.$resultContainer=this.$widget.find(".sql-console-result-container"),this.$noRowsAlert=this.$widget.find(".sql-query-no-rows")}async sqlQueryResultsEvent({ntxId:t,results:e}){if(this.isNoteContext(t)){this.$noRowsAlert.toggle(e.length===1&&e[0].length===0),this.$resultContainer.toggle(e.length>1||e[0].length>0),this.$resultContainer.empty();for(const i of e){if(typeof i=="object"&&!Array.isArray(i)){this.$resultContainer.empty().show().append($("<pre>").text(JSON.stringify(i,null,"	")));continue}if(!i.length)continue;const o=$('<table class="table table-striped">');this.$resultContainer.append(o);const s=i[0],r=$("<tr>");for(const d in s)r.append($("<th>").text(d));o.append(r);for(const d of i){const l=$("<tr>");for(const c in d)l.append($("<td>").text(d[c]));o.append(l)}}}}}const hi=`
<div class="sql-table-schemas-widget">
    <style>
    .sql-table-schemas-widget {
        padding: 12px;
        padding-right: 10%;
    }

    .sql-table-schemas button {
        padding: 0.25rem 0.4rem;
        font-size: 0.875rem;
        line-height: 0.5;
        border: 1px solid var(--button-border-color);
        border-radius: var(--button-border-radius);
        background: var(--button-background-color);
        color: var(--button-text-color);
    }

    .sql-console-result-container {
        width: 100%;
        font-size: smaller;
        margin-top: 10px;
        flex-grow: 1;
        overflow: auto;
        min-height: 0;
    }

    .table-schema td {
        padding: 5px;
    }
    </style>

    ${n("sql_table_schemas.tables")}:
    <span class="sql-table-schemas"></span>
</div>`;class pi extends p{tableSchemasShown;$sqlConsoleTableSchemas;isEnabled(){return this.note&&this.note.mime==="text/x-sqlite;schema=trilium"&&super.isEnabled()}doRender(){this.$widget=$(hi),this.contentSized(),this.$sqlConsoleTableSchemas=this.$widget.find(".sql-table-schemas")}async refreshWithNote(t){if(this.tableSchemasShown)return;this.tableSchemasShown=!0;const e=await m.get("sql/schema");for(const i of e){const o=$('<button class="btn">').text(i.name),s=$('<table class="table-schema">');for(const r of i.columns)s.append($("<tr>").append($("<td>").text(r.name)).append($("<td>").text(r.type)));this.$sqlConsoleTableSchemas.append(o).append(" "),o.tooltip({html:!0,placement:"bottom",title:s[0].outerHTML,sanitize:!1})}}}const ui=`
<div class="image-properties">
    <div style="display: flex; justify-content: space-evenly; margin: 10px;">
        <span>
            <strong>${n("image_properties.original_file_name")}:</strong>
            <span class="image-filename"></span>
        </span>

        <span>
            <strong>${n("image_properties.file_type")}:</strong>
            <span class="image-filetype"></span>
        </span>

        <span>
            <strong>${n("image_properties.file_size")}:</strong>
            <span class="image-filesize"></span>
        </span>
    </div>

    <div class="no-print" style="display: flex; justify-content: space-evenly; margin: 10px;">
        <button class="image-download btn btn-sm btn-primary" type="button">
            <span class="bx bx-download"></span>
            ${n("image_properties.download")}
        </button>

        <button class="image-open btn btn-sm btn-primary" type="button">
            <span class="bx bx-link-external"></span>
            ${n("image_properties.open")}
        </button>

        <button class="image-copy-reference-to-clipboard btn btn-sm btn-primary" type="button">
            <span class="bx bx-copy"></span>
            ${n("image_properties.copy_reference_to_clipboard")}
        </button>

        <button class="image-upload-new-revision btn btn-sm btn-primary" type="button">
            <span class="bx bx-folder-open"></span>
            ${n("image_properties.upload_new_revision")}
        </button>
    </div>

    <input type="file" class="image-upload-new-revision-input" style="display: none">
</div>`;class gi extends p{$copyReferenceToClipboardButton;$uploadNewRevisionButton;$uploadNewRevisionInput;$fileName;$fileType;$fileSize;$openButton;$imageDownloadButton;get name(){return"imageProperties"}get toggleCommand(){return"toggleRibbonTabImageProperties"}isEnabled(){return this.note&&this.note.type==="image"}getTitle(){return{show:this.isEnabled(),activate:!0,title:n("image_properties.title"),icon:"bx bx-image"}}doRender(){this.$widget=$(ui),this.contentSized(),this.$copyReferenceToClipboardButton=this.$widget.find(".image-copy-reference-to-clipboard"),this.$copyReferenceToClipboardButton.on("click",()=>this.triggerEvent("copyImageReferenceToClipboard",{ntxId:this.noteContext?.ntxId})),this.$uploadNewRevisionButton=this.$widget.find(".image-upload-new-revision"),this.$uploadNewRevisionInput=this.$widget.find(".image-upload-new-revision-input"),this.$fileName=this.$widget.find(".image-filename"),this.$fileType=this.$widget.find(".image-filetype"),this.$fileSize=this.$widget.find(".image-filesize"),this.$openButton=this.$widget.find(".image-open"),this.$openButton.on("click",()=>this.noteId&&this.note&&ct.openNoteExternally(this.noteId,this.note.mime)),this.$imageDownloadButton=this.$widget.find(".image-download"),this.$imageDownloadButton.on("click",()=>this.noteId&&ct.downloadFileNote(this.noteId)),this.$uploadNewRevisionButton.on("click",()=>{this.$uploadNewRevisionInput.trigger("click")}),this.$uploadNewRevisionInput.on("change",async()=>{const t=this.$uploadNewRevisionInput[0].files[0];this.$uploadNewRevisionInput.val("");const e=await m.upload(`images/${this.noteId}`,t);e.uploaded?(k.showMessage(n("image_properties.upload_success")),await w.clearBrowserCache(),this.refresh()):k.showError(n("image_properties.upload_failed",{message:e.message}))})}async refreshWithNote(t){this.$widget.show();const e=await this.note?.getBlob();this.$fileName.text(t.getLabelValue("originalFileName")||"?"),this.$fileSize.text(w.formatSize(e?.contentLength??0)),this.$fileType.text(t.mime)}}const bi=`
<div class="note-properties-widget">
    <style>
        .note-properties-widget {
            padding: 12px;
            color: var(--muted-text-color);
        }
    </style>

    <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
        ${n("note_properties.this_note_was_originally_taken_from")} <a class="page-url external"></a>
    </div>
</div>`;class fi extends p{$pageUrl;isEnabled(){return this.note&&!!this.note.getLabelValue("pageUrl")}getTitle(){return{show:this.isEnabled(),activate:!0,title:n("note_properties.info"),icon:"bx bx-info-square"}}doRender(){this.$widget=$(bi),this.contentSized(),this.$pageUrl=this.$widget.find(".page-url")}async refreshWithNote(t){const e=t.getLabelValue("pageUrl");this.$pageUrl.attr("href",e).attr("title",e).text(e??"")}}const mi=`
<div class="search-result-widget">
    <style>
    .search-result-widget {
        flex-grow: 100000;
        flex-shrink: 100000;
        min-height: 0;
        overflow: auto;
    }

    .search-result-widget .note-list {
        padding: 10px;
    }

    .search-no-results, .search-not-executed-yet {
        margin: 20px;
        padding: 20px;
    }
    </style>

    <div class="search-no-results alert alert-info">
        ${n("search_result.no_notes_found")}
    </div>

    <div class="search-not-executed-yet alert alert-info">
        ${n("search_result.search_not_executed")}
    </div>

    <div class="search-result-widget-content">
    </div>
</div>`;class wi extends p{$content;$noResults;$notExecutedYet;isEnabled(){return super.isEnabled()&&this.note?.type==="search"}doRender(){this.$widget=$(mi),this.contentSized(),this.$content=this.$widget.find(".search-result-widget-content"),this.$noResults=this.$widget.find(".search-no-results"),this.$notExecutedYet=this.$widget.find(".search-not-executed-yet")}async refreshWithNote(t){const e=t.getChildNoteIds().length===0&&!!t.searchResultsLoaded;if(this.$content.empty(),this.$noResults.toggle(e),this.$notExecutedYet.toggle(!t.searchResultsLoaded),e||!t.searchResultsLoaded)return;await new Ht({$parent:this.$content,parentNote:t,showNotePath:!0}).renderList()}searchRefreshedEvent({ntxId:t}){this.isNoteContext(t)&&this.refresh()}notesReloadedEvent({noteIds:t}){this.noteId&&t.includes(this.noteId)&&this.refresh()}}const U={notes:{},attachments:{}};function j(a){if(a!=="notes"&&a!=="attachments")throw new Error(`Unrecognized type '${a}', should be 'notes' or 'attachments'`)}function xi(a,t){return j(a),U[a][t]}function $i(a,t){j(a),delete U[a][t]}function vi(a,t){j(a),delete U[a][t]}L.subscribeToMessages(async a=>{a.type==="openedFileUpdated"&&(j(a.entityType),U[a.entityType][a.entityId]=a,u.triggerEvent("openedFileUpdated",{entityType:a.entityType,entityId:a.entityId,lastModifiedMs:a.lastModifiedMs,filePath:a.filePath}))});const O={getFileModificationStatus:xi,fileModificationUploaded:$i,ignoreModification:vi},yi=`
<div class="dropdown watched-file-update-status-widget alert alert-warning">
    <style>
        .watched-file-update-status-widget {
            margin: 10px;
            contain: none;
        }
    </style>

    <p>${n("watched_file_update_status.file_last_modified")}</p>

    <div style="display: flex; flex-direction: row; justify-content: space-evenly;">
        <button class="btn btn-sm file-upload-button">${n("watched_file_update_status.upload_modified_file")}</button>

        <button class="btn btn-sm ignore-this-change-button">${n("watched_file_update_status.ignore_this_change")}</button>
    </div>
</div>`;class _i extends p{$filePath;$fileLastModified;$fileUploadButton;$ignoreThisChangeButton;isEnabled(){const{entityType:t,entityId:e}=this.getEntity();return super.isEnabled()&&!!t&&!!e&&!!O.getFileModificationStatus(t,e)}doRender(){this.$widget=$(yi),this.$filePath=this.$widget.find(".file-path"),this.$fileLastModified=this.$widget.find(".file-last-modified"),this.$fileUploadButton=this.$widget.find(".file-upload-button"),this.$fileUploadButton.on("click",async()=>{const{entityType:t,entityId:e}=this.getEntity();await m.post(`${t}/${e}/upload-modified-file`,{filePath:this.$filePath.text()}),t&&e&&O.fileModificationUploaded(t,e),this.refresh()}),this.$ignoreThisChangeButton=this.$widget.find(".ignore-this-change-button"),this.$ignoreThisChangeButton.on("click",()=>{const{entityType:t,entityId:e}=this.getEntity();t&&e&&O.ignoreModification(t,e),this.refresh()})}async refreshWithNote(t){const{entityType:e,entityId:i}=this.getEntity();if(!e||!i)return;const o=O.getFileModificationStatus(e,i);this.$filePath.text(o.filePath),this.$fileLastModified.text(Ne.unix(o.lastModifiedMs/1e3).format("HH:mm:ss"))}getEntity(){if(!this.noteContext)return{};const{viewScope:t}=this.noteContext;return t?.viewMode==="attachments"&&t.attachmentId?{entityType:"attachments",entityId:t.attachmentId}:{entityType:"notes",entityId:this.noteId}}openedFileUpdatedEvent(t){console.log(t);const{entityType:e,entityId:i}=this.getEntity();t.entityType===e&&t.entityId===i&&this.refresh()}}class Ci extends _{widgetFactory;widgets;constructor(t){super("row"),this.widgetFactory=t,this.widgets={},this.class("split-note-container-widget"),this.css("flex-grow","1"),this.collapsible()}async newNoteContextCreatedEvent({noteContext:t}){const e=this.widgetFactory(),i=e.render();i.attr("data-ntx-id",t.ntxId),i.on("click",()=>u.tabManager.activateNoteContext(t.ntxId)),this.$widget.append(i),e.handleEvent("initialRenderComplete",{}),e.toggleExt(!1),t.ntxId&&(this.widgets[t.ntxId]=e),await e.handleEvent("setNoteContext",{noteContext:t}),this.child(e)}async openNewNoteSplitEvent({ntxId:t,notePath:e,hoistedNoteId:i,viewScope:o}){const s=u.tabManager.getActiveMainContext()?.ntxId;if(!s){console.warn("Missing main note context ID");return}t||(logError("empty ntxId!"),t=s),i=i||u.tabManager.getActiveContext()?.hoistedNoteId;const r=await u.tabManager.openEmptyTab(null,i,s);if(!r.ntxId){logError("Failed to create new note context!");return}const d=u.tabManager.children.map(l=>l.ntxId).filter(l=>l!==r.ntxId);d.splice(d.indexOf(t)+1,0,r.ntxId),this.triggerCommand("noteContextReorder",{ntxIdsInOrder:d}),this.$widget.find(`[data-ntx-id="${r.ntxId}"]`).insertAfter(this.$widget.find(`[data-ntx-id="${t}"]`)),await u.tabManager.activateNoteContext(r.ntxId),e?await r.setNote(e,{viewScope:o}):await r.setEmpty()}closeThisNoteSplitCommand({ntxId:t}){t&&u.tabManager.removeNoteContext(t)}async moveThisNoteSplitCommand({ntxId:t,isMovingLeft:e}){if(!t){logError("empty ntxId!");return}const i=u.tabManager.noteContexts,o=i.findIndex(c=>c.ntxId===t),s=e?o-1:o;if(o===-1||s<0||s+1>=i.length){logError(`invalid context! currentIndex: ${o}, leftIndex: ${s}, contexts.length: ${i.length}`);return}if(i[s].isEmpty()&&i[s+1].isEmpty())return;const r=i.map(c=>c.ntxId).filter(c=>!!c),d=[...r.slice(0,s),r[s+1],r[s],...r.slice(s+2)],l=!i[s].mainNtxId;this.triggerCommand("noteContextReorder",{ntxIdsInOrder:d,oldMainNtxId:l?r[s]:null,newMainNtxId:l?r[s+1]:null}),this.$widget.find(`[data-ntx-id="${r[s]}"]`).insertAfter(this.$widget.find(`[data-ntx-id="${r[s+1]}"]`)),await u.tabManager.activateNoteContext(e?r[s+1]:r[s])}activeContextChangedEvent(){this.refresh()}noteSwitchedAndActivatedEvent(){this.refresh()}noteContextRemovedEvent({ntxIds:t}){this.children=this.children.filter(e=>!t.includes(e.ntxId??""));for(const e of t){this.$widget.find(`[data-ntx-id="${e}"]`).remove();const i=this.widgets[e];Dt(i),delete this.widgets[e]}}contextsReopenedEvent({ntxId:t,afterNtxId:e}){t===void 0||e===void 0||this.$widget.find(`[data-ntx-id="${t}"]`).insertAfter(this.$widget.find(`[data-ntx-id="${e}"]`))}async refresh(){this.toggleExt(!0)}toggleInt(t){}toggleExt(t){const e=u.tabManager.getActiveMainContext(),i=e?e.ntxId:null;for(const o in this.widgets){const s=u.tabManager.getNoteContextById(o);this.widgets[o].toggleExt(t&&i&&[s.ntxId,s.mainNtxId].includes(i))}}async handleEventInChildren(t,e){if(["noteSwitched","noteSwitchedAndActivated"].includes(t)){const i=e;if(!i?.noteContext.ntxId)return Promise.resolve();const o=this.widgets[i.noteContext.ntxId];return o&&(o.hasBeenAlreadyShown||t==="noteSwitchedAndActivated"||u.tabManager.getActiveMainContext()===i.noteContext.getMainContext())?(o.hasBeenAlreadyShown=!0,[o.handleEvent("noteSwitched",i),this.refreshNotShown(i)]):Promise.resolve()}return t==="activeContextChanged"?this.refreshNotShown(e):super.handleEventInChildren(t,e)}refreshNotShown(t){const e=[];for(const i of t.noteContext.getMainContext().getSubContexts()){if(!i.ntxId)continue;const o=this.widgets[i.ntxId];o.hasBeenAlreadyShown||(o.hasBeenAlreadyShown=!0,e.push(o.handleEvent("activeContextChanged",{noteContext:i})))}return this.refresh(),Promise.all(e)}}function Dt(a){for(const t of a.children)Dt(t);"cleanup"in a&&typeof a.cleanup=="function"&&a.cleanup()}class ft extends Nt{currentLeftPaneVisible;constructor(t){super(),this.currentLeftPaneVisible=v.is("leftPaneVisible"),this.class(t?"toggle-button":"launcher-button"),this.settings.icon=()=>v.get("layoutOrientation")==="horizontal"?"bx-sidebar":this.currentLeftPaneVisible?"bx-chevrons-left":"bx-chevrons-right",this.settings.title=()=>this.currentLeftPaneVisible?n("left_pane_toggle.hide_panel"):n("left_pane_toggle.show_panel"),this.settings.command=()=>this.currentLeftPaneVisible?"hideLeftPane":"showLeftPane",t&&(this.settings.titlePlacement="bottom")}refreshIcon(){super.refreshIcon(),kt.setupLeftPaneResizer(this.currentLeftPaneVisible)}setLeftPaneVisibilityEvent({leftPaneVisible:t}){this.currentLeftPaneVisible=t??!this.currentLeftPaneVisible,this.refreshIcon()}}class Ii extends E{constructor(){super(),this.icon("bx-dock-right").title(n("create_pane_button.create_new_split")).titlePlacement("bottom").onClick((t,e)=>{t.triggerCommand("openNewNoteSplit",{ntxId:t.getClosestNtxId()}),e.stopPropagation()}).class("icon-action")}}class Ti extends E{isEnabled(){return super.isEnabled()&&this.noteContext&&!!this.noteContext.mainNtxId}async noteContextReorderEvent({ntxIdsInOrder:t}){this.refresh()}constructor(){super(),this.icon("bx-x").title(n("close_pane_button.close_this_pane")).titlePlacement("bottom").onClick((t,e)=>{e.stopPropagation(),t.triggerCommand("closeThisNoteSplit",{ntxId:t.getClosestNtxId()})}).class("icon-action")}}const Ni=D.filter(a=>a.reserved||a.static).map(a=>a.type),ki=`
<div class="dropdown note-type-widget">
    <style>
        .note-type-dropdown {
            max-height: 500px;
            overflow-y: auto;
            overflow-x: hidden;
        }
    </style>
    <button type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-sm dropdown-toggle select-button note-type-button">
        <span class="note-type-desc"></span>
        <span class="caret"></span>
    </button>
    <div class="note-type-dropdown dropdown-menu dropdown-menu-left tn-dropdown-list"></div>
</div>
`;class Ei extends p{dropdown;$noteTypeDropdown;$noteTypeButton;$noteTypeDesc;doRender(){this.$widget=$(ki),this.dropdown=V.getOrCreateInstance(this.$widget.find("[data-bs-toggle='dropdown']")[0]),this.$widget.on("show.bs.dropdown",()=>this.renderDropdown()),this.$noteTypeDropdown=this.$widget.find(".note-type-dropdown"),this.$noteTypeButton=this.$widget.find(".note-type-button"),this.$noteTypeDesc=this.$widget.find(".note-type-desc"),this.$widget.on("click",".dropdown-item",()=>this.dropdown.toggle())}async refreshWithNote(t){this.$noteTypeButton.prop("disabled",()=>Ni.includes(t.type)),this.$noteTypeDesc.text(await this.findTypeTitle(t.type,t.mime)),this.dropdown.hide()}async renderDropdown(){if(this.$noteTypeDropdown.empty(),!!this.note){for(const t of D.filter(e=>!e.reserved&&!e.static)){let e;const i=$("<span>").text(t.title);t.isNew&&i.append($('<span class="badge new-note-type-badge">').text(n("note_types.new-feature"))),t.isBeta&&i.append($('<span class="badge">').text(n("note_types.beta-feature"))),t.type!=="code"?e=$('<a class="dropdown-item">').attr("data-note-type",t.type).append('<span class="check">&check;</span> ').append(i).on("click",o=>{const s=e.attr("data-note-type"),r=D.find(d=>d.type===s);r&&this.save(r.type,r.mime)}):(this.$noteTypeDropdown.append('<div class="dropdown-divider"></div>'),e=$('<a class="dropdown-item disabled">').attr("data-note-type",t.type).append('<span class="check">&check;</span> ').append($("<strong>").text(t.title))),this.note.type===t.type&&e.addClass("selected"),this.$noteTypeDropdown.append(e)}for(const t of dt.getMimeTypes()){if(!t.enabled)continue;const e=$('<a class="dropdown-item">').attr("data-mime-type",t.mime).append('<span class="check">&check;</span> ').append($("<span>").text(t.title)).on("click",i=>{const o=$(i.target).closest(".dropdown-item");this.save("code",o.attr("data-mime-type")??"")});this.note.type==="code"&&this.note.mime===t.mime&&(e.addClass("selected"),this.$noteTypeDesc.text(t.title)),this.$noteTypeDropdown.append(e)}}}async findTypeTitle(t,e){if(t==="code"){const o=dt.getMimeTypes().find(s=>s.mime===e);return o?o.title:e}else{const i=D.find(o=>o.type===t);return i?i.title:t}}async save(t,e){t===this.note?.type&&e===this.note?.mime||t!==this.note?.type&&!await this.confirmChangeIfContent()||await m.put(`notes/${this.noteId}/type`,{type:t,mime:e})}async confirmChangeIfContent(){if(!this.note)return;const t=await this.note.getBlob();return!t?.content||!t.content.trim().length?!0:await Q.confirm(n("note_types.confirm-change"))}async entitiesReloadedEvent({loadResults:t}){t.isNoteReloaded(this.noteId)&&this.refresh()}}const Si=`
<div class="switch-widget">
    <style>
    .switch-widget {
        --switch-track-width: 50px;
        --switch-track-height: 24px;
        --switch-off-track-background: var(--more-accented-background-color);
        --switch-on-track-background: var(--main-text-color);

        --switch-thumb-width: 16px;
        --switch-thumb-height: 16px;
        --switch-off-thumb-background: var(--main-background-color);
        --switch-on-thumb-background: var(--main-background-color);

        display: flex;
        align-items: center;
    }

    /* The track of the toggle switch */

    .switch-widget .switch-button {
        display: block;
        position: relative;
        margin-left: 8px;
        width: var(--switch-track-width);
        height: var(--switch-track-height);
        border-radius: 24px;
        background-color: var(--switch-off-track-background);
        transition: background 200ms ease-in;
    }

    .switch-widget .switch-button.on {
        background: var(--switch-on-track-background);
        transition: background 100ms ease-out;
    }

    /* The thumb of the toggle switch */

    .switch-widget .switch-button:after {
        --y: calc((var(--switch-track-height) - var(--switch-thumb-height)) / 2);
        --x: var(--y);

        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: var(--switch-thumb-width);
        height: var(--switch-thumb-height);
        background-color: var(--switch-off-thumb-background);
        border-radius: 50%;
        transform: translate(var(--x), var(--y));
        transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1),
                    background 200ms ease-out;
    }

    .switch-widget .switch-button.on:after {
        --x: calc(var(--switch-track-width) - var(--switch-thumb-width) - var(--y));

        background: var(--switch-on-thumb-background);
        transition: transform 200ms cubic-bezier(0.64, 0, 0.78, 0),
                    background 100ms ease-in;
    }


    .switch-widget .switch-button input[type="checkbox"] {
        /* A hidden check box for accesibility purposes */
        position: absolute:
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    /* Disabled state */
    .switch-widget .switch-button:not(.disabled) input[type="checkbox"],
    .switch-widget .switch-button:not(.disabled) {
        cursor: pointer;
    }

    .switch-widget .switch-button:has(input[type="checkbox"]:focus-visible) {
        outline: 2px solid var(--button-border-color);
        outline-offset: 2px;
    }

    .switch-widget .switch-button.disabled {
        opacity: 70%;
    }

    .switch-widget .switch-help-button {
        border: 0;
        margin-left: 4px;
        background: none;
        cursor: pointer;
        font-size: 1.1em;
        color: var(--muted-text-color);
    }

    .switch-widget .switch-help-button:hover {
        color: var(--main-text-color);
    }
    </style>

    <div class="switch-widget">
        <span class="switch-name"></span>

        <label>
            <div class="switch-button">
                <input class="switch-toggle" type="checkbox" />
            </div>
        </label>

        <button class="switch-help-button icon-action bx bx-help-circle" type="button" data-help-page="" title="${n("open-help-page")}" style="display: none;"></button>
    </div>

</div>`;class K extends p{$switchButton;$switchToggle;$switchName;$helpButton;switchOnName="";switchOnTooltip="";switchOffName="";switchOffTooltip="";disabledTooltip="";currentState=!1;doRender(){this.$widget=$(Si),this.$switchButton=this.$widget.find(".switch-button"),this.$switchToggle=this.$widget.find(".switch-toggle"),this.$switchToggle.on("click",t=>{this.toggle(!this.currentState),t.preventDefault()}),this.$switchName=this.$widget.find(".switch-name"),this.$helpButton=this.$widget.find(".switch-help-button")}toggle(t){t?this.switchOn():this.switchOff()}switchOff(){}switchOn(){}get isToggled(){return this.currentState}set isToggled(t){this.currentState=!!t,this.$switchButton.toggleClass("on",this.currentState),this.$switchToggle.prop("checked",this.currentState),this.currentState?(this.$switchName.text(this.switchOffName),this.$switchButton.attr("title",this.switchOffTooltip)):(this.$switchName.text(this.switchOnName),this.$switchButton.attr("title",this.switchOnTooltip))}get canToggle(){return!this.$switchButton.hasClass("disabled")}set canToggle(t){this.$switchButton.toggleClass("disabled",!t),this.$switchToggle.attr("disabled",t?null:"disabled"),t?this.isToggled=this.currentState:this.$switchButton.attr("title",this.disabledTooltip)}}class Ri extends K{doRender(){super.doRender(),this.switchOnName=n("protect_note.toggle-on"),this.switchOnTooltip=n("protect_note.toggle-on-hint"),this.switchOffName=n("protect_note.toggle-off"),this.switchOffTooltip=n("protect_note.toggle-off-hint")}switchOn(){this.noteId&&ht.protectNote(this.noteId,!0,!1)}switchOff(){this.noteId&&ht.protectNote(this.noteId,!1,!1)}async refreshWithNote(t){this.isToggled=t.isProtected}entitiesReloadedEvent({loadResults:t}){t.isNoteReloaded(this.noteId)&&this.refresh()}}const Ai=`
<div class="dropdown editability-select-widget">
    <style>
    .editability-dropdown {
        width: 300px;
    }

    .editability-dropdown .dropdown-item {
        display: flex !importamt;
    }

    .editability-dropdown .dropdown-item > div {
        margin-left: 10px;
    }

    .editability-dropdown .description {
        font-size: small;
        color: var(--muted-text-color);
        white-space: normal;
    }
    </style>
    <button type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-sm select-button dropdown-toggle editability-button">
        <span class="editability-active-desc">${n("editability_select.auto")}</span>
        <span class="caret"></span>
    </button>
    <div class="editability-dropdown dropdown-menu dropdown-menu-right tn-dropdown-list">
        <a class="dropdown-item" href="#" data-editability="auto">
            <span class="check">&check;</span>
            <div>
                ${n("editability_select.auto")}
                <div class="description">${n("editability_select.note_is_editable")}</div>
            </div>
        </a>
        <a class="dropdown-item" href="#" data-editability="readOnly">
            <span class="check">&check;</span>
            <div>
                ${n("editability_select.read_only")}
                <div class="description">${n("editability_select.note_is_read_only")}</div>
            </div>
        </a>
        <a class="dropdown-item" href="#" data-editability="autoReadOnlyDisabled">
            <span class="check">&check;</span>
            <div>
                ${n("editability_select.always_editable")}
                <div class="description">${n("editability_select.note_is_always_editable")}</div>
            </div>
        </a>
    </div>
</div>
`;class Bi extends p{dropdown;$editabilityActiveDesc;doRender(){this.$widget=$(Ai),this.dropdown=V.getOrCreateInstance(this.$widget.find("[data-bs-toggle='dropdown']")[0]),this.$editabilityActiveDesc=this.$widget.find(".editability-active-desc"),this.$widget.on("click",".dropdown-item",async t=>{this.dropdown.toggle();const e=$(t.target).closest("[data-editability]").attr("data-editability");if(!(!this.note||!this.noteId)){for(const i of this.note.getOwnedLabels())["readOnly","autoReadOnlyDisabled"].includes(i.name)&&await b.removeAttributeById(this.noteId,i.attributeId);e&&e!=="auto"&&await b.addLabel(this.noteId,e)}})}async refreshWithNote(t){let e="auto";this.note?.isLabelTruthy("readOnly")?e="readOnly":this.note?.isLabelTruthy("autoReadOnlyDisabled")&&(e="autoReadOnlyDisabled");const i={auto:n("editability_select.auto"),readOnly:n("editability_select.read_only"),autoReadOnlyDisabled:n("editability_select.always_editable")};this.$widget.find(".dropdown-item").removeClass("selected"),this.$widget.find(`.dropdown-item[data-editability='${e}']`).addClass("selected"),this.$editabilityActiveDesc.text(i[e])}entitiesReloadedEvent({loadResults:t}){t.getAttributeRows().find(e=>e.noteId===this.noteId)&&this.refresh()}}class Li extends K{isEnabled(){return super.isEnabled()&&!["root","_hidden"].includes(this.noteId??"")}doRender(){super.doRender(),this.switchOnName=n("bookmark_switch.bookmark"),this.switchOnTooltip=n("bookmark_switch.bookmark_this_note"),this.switchOffName=n("bookmark_switch.bookmark"),this.switchOffTooltip=n("bookmark_switch.remove_bookmark")}async toggle(t){const e=await m.put(`notes/${this.noteId}/toggle-in-parent/_lbBookmarks/${!!t}`);!e.success&&"message"in e&&k.showError(e.message)}async refreshWithNote(t){const e=!!t.getParentBranches().find(i=>i.parentNoteId==="_lbBookmarks");this.isToggled=e}entitiesReloadedEvent({loadResults:t}){t.getBranchRows().find(e=>e.noteId===this.noteId)&&this.refresh()}}class Wi extends K{isEnabled(){return super.isEnabled()&&!["root","_share","_hidden"].includes(this.noteId??"")&&!this.noteId?.startsWith("_options")}doRender(){super.doRender(),this.switchOnName=n("shared_switch.shared"),this.switchOnTooltip=n("shared_switch.toggle-on-title"),this.switchOffName=n("shared_switch.shared"),this.switchOffTooltip=n("shared_switch.toggle-off-title"),this.$helpButton.attr("data-help-page","sharing.html").show(),this.$helpButton.on("click",t=>w.openHelp($(t.target)))}async switchOn(){this.noteId&&(await Tt.cloneNoteToParentNote(this.noteId,"_share"),it.syncNow(!0))}async switchOff(){const t=this.note?.getParentBranches().find(e=>e.parentNoteId==="_share");t&&(this.note?.getParentBranches().length===1&&!await Q.confirm(n("shared_switch.shared-branch"))||(await m.remove(`branches/${t.branchId}?taskId=no-progress-reporting`),it.syncNow(!0)))}async refreshWithNote(t){const e=t.hasAncestor("_share"),i=e&&t.getParentBranches().find(s=>s.parentNoteId==="_share"),o=e&&!i;this.isToggled=e,o?(this.disabledTooltip=n("shared_switch.inherited"),this.canToggle=!1):(this.disabledTooltip="",this.canToggle=!0)}entitiesReloadedEvent({loadResults:t}){t.getBranchRows().find(e=>e.noteId===this.noteId)&&this.refresh()}}class Pi extends K{isEnabled(){return super.isEnabled()&&!this.noteId?.startsWith("_options")}doRender(){super.doRender(),this.switchOnName=n("template_switch.template"),this.switchOnTooltip=n("template_switch.toggle-on-hint"),this.switchOffName=n("template_switch.template"),this.switchOffTooltip=n("template_switch.toggle-off-hint"),this.$helpButton.attr("data-help-page","template.html").show()}async switchOn(){this.noteId&&await b.setLabel(this.noteId,"template")}async switchOff(){if(this.note&&this.noteId)for(const t of this.note.getOwnedLabels("template"))await b.removeAttributeById(this.noteId,t.attributeId)}async refreshWithNote(t){const e=t.hasLabel("template");this.isToggled=e}entitiesReloadedEvent({loadResults:t}){t.getAttributeRows().find(e=>e.type==="label"&&e.name==="template"&&e.noteId===this.noteId)&&this.refresh()}}const Oi=`<div class="dropdown note-language-widget">
    <button type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn btn-sm dropdown-toggle select-button note-language-button">
        <span class="note-language-desc"></span>
        <span class="caret"></span>
    </button>
    <div class="note-language-dropdown dropdown-menu dropdown-menu-left tn-dropdown-list"></div>
    <button class="language-help-button icon-action bx bx-help-circle" type="button" data-in-app-help="B0lcI9xz1r8K" title="${n("open-help-page")}"></button>

    <style>
        .note-language-widget {
            display: flex;
            align-items: center;
        }

        .language-help-button {
            margin-left: 4px;
        }

        .note-language-dropdown [dir=rtl] {
            text-align: right;
        }

        .dropdown-item.rtl > .check {
            order: 1;
        }
    </style>
</div>
`,mt={id:"",name:n("note_language.not_set")};class z extends p{dropdown;$noteLanguageDropdown;$noteLanguageDesc;locales;currentLanguageId;constructor(){super(),this.locales=z.#t()}doRender(){this.$widget=$(Oi),this.dropdown=V.getOrCreateInstance(this.$widget.find("[data-bs-toggle='dropdown']")[0]),this.$widget.on("show.bs.dropdown",()=>this.renderDropdown()),this.$noteLanguageDropdown=this.$widget.find(".note-language-dropdown"),this.$noteLanguageDesc=this.$widget.find(".note-language-desc")}renderDropdown(){if(this.$noteLanguageDropdown.empty(),!this.note)return;for(const e of this.locales)if(typeof e=="object"){const i=$("<span>").text(e.name),o=$('<a class="dropdown-item">').attr("data-language",e.id).append('<span class="check">&check;</span> ').append(i).on("click",()=>{const s=o.attr("data-language")??"";this.save(s)});e.rtl&&o.attr("dir","rtl"),e.id===this.currentLanguageId&&o.addClass("selected"),this.$noteLanguageDropdown.append(o)}else this.$noteLanguageDropdown.append('<div class="dropdown-divider"></div>');const t=$('<a class="dropdown-item">').append(`<span>${n("note_language.configure-languages")}</span>`).on("click",()=>u.tabManager.openContextWithNote("_optionsLocalization",{activate:!0}));this.$noteLanguageDropdown.append(t)}async save(t){this.note&&b.setAttribute(this.note,"label","language",t)}async refreshWithNote(t){const e=t.getLabelValue("language")??"",i=Bt(e)??mt;this.currentLanguageId=e,this.$noteLanguageDesc.text(i.name),this.dropdown.hide()}async entitiesReloadedEvent({loadResults:t}){t.isOptionReloaded("languages")&&(this.locales=z.#t()),t.getAttributeRows().find(e=>e.noteId===this.noteId&&e.name==="language")&&this.refresh()}static#t(){const t=JSON.parse(v.get("languages")??"[]"),e=we().filter(r=>typeof r!="object"||t.includes(r.id)),i=e.filter(r=>!r.rtl),o=e.filter(r=>r.rtl);let s=[mt];return i.length>0&&(s=[...s,"---",...i]),o.length>0&&(s=[...s,"---",...o]),s.push("---"),s}}const Di=`
<div class="basic-properties-widget">
    <style>
        .basic-properties-widget {
            padding: 0px 12px 6px 12px;
            display: flex;
            align-items: baseline;
            flex-wrap: wrap;
        }

        .basic-properties-widget > * {
            margin-top: 9px;
            margin-bottom: 2px;
        }

        .basic-properties-widget > * > :last-child {
            margin-right: 30px;
        }

        .note-type-container,
        .editability-select-container,
        .note-language-container {
            display: flex;
            align-items: center;
        }
    </style>

    <div class="note-type-container">
        <span>${n("basic_properties.note_type")}:</span> &nbsp;
    </div>

    <div class="protected-note-switch-container"></div>

    <div class="editability-select-container">
        <span>${n("basic_properties.editable")}:</span> &nbsp;
    </div>

    <div class="bookmark-switch-container"></div>

    <div class="shared-switch-container"></div>

    <div class="template-switch-container"></div>

    <div class="note-language-container">
        <span>${n("basic_properties.language")}:</span> &nbsp;
    </div>
</div>`;class Mi extends p{noteTypeWidget;protectedNoteSwitchWidget;editabilitySelectWidget;bookmarkSwitchWidget;sharedSwitchWidget;templateSwitchWidget;noteLanguageWidget;constructor(){super(),this.noteTypeWidget=new Ei().contentSized(),this.protectedNoteSwitchWidget=new Ri().contentSized(),this.editabilitySelectWidget=new Bi().contentSized(),this.bookmarkSwitchWidget=new Li().contentSized(),this.sharedSwitchWidget=new Wi().contentSized(),this.templateSwitchWidget=new Pi().contentSized(),this.noteLanguageWidget=new z().contentSized(),this.child(this.noteTypeWidget,this.protectedNoteSwitchWidget,this.editabilitySelectWidget,this.bookmarkSwitchWidget,this.sharedSwitchWidget,this.templateSwitchWidget,this.noteLanguageWidget)}get name(){return"basicProperties"}get toggleCommand(){return"toggleRibbonBasicProperties"}getTitle(){return{show:!this.note?.isLaunchBarConfig(),title:n("basic_properties.basic_properties"),icon:"bx bx-slider"}}doRender(){this.$widget=$(Di),this.contentSized(),this.$widget.find(".note-type-container").append(this.noteTypeWidget.render()),this.$widget.find(".protected-note-switch-container").append(this.protectedNoteSwitchWidget.render()),this.$widget.find(".editability-select-container").append(this.editabilitySelectWidget.render()),this.$widget.find(".bookmark-switch-container").append(this.bookmarkSwitchWidget.render()),this.$widget.find(".shared-switch-container").append(this.sharedSwitchWidget.render()),this.$widget.find(".template-switch-container").append(this.templateSwitchWidget.render()),this.$widget.find(".note-language-container").append(this.noteLanguageWidget.render())}async refreshWithNote(t){await super.refreshWithNote(t),this.note&&(this.$widget.find(".editability-select-container").toggle(this.note&&["text","code","mermaid"].includes(this.note.type)),this.$widget.find(".note-language-container").toggle(this.note&&["text"].includes(this.note.type)))}}const zi=`
<div class="note-info-widget">
    <style>
        .note-info-widget {
            padding: 12px;
        }

        .note-info-widget-table {
            max-width: 100%;
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }

        .note-info-widget-table td, .note-info-widget-table th {
            padding: 5px;
        }

        .note-info-mime {
            max-width: 13em;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    </style>

    <table class="note-info-widget-table">
        <tr>
            <th>${n("note_info_widget.note_id")}:</th>
            <td class="note-info-note-id"></td>
            <th>${n("note_info_widget.created")}:</th>
            <td class="note-info-date-created"></td>
            <th>${n("note_info_widget.modified")}:</th>
            <td class="note-info-date-modified"></td>
        </tr>
        <tr>
            <th>${n("note_info_widget.type")}:</th>
            <td>
                <span class="note-info-type"></span>
                <span class="note-info-mime"></span>
            </td>

            <th title="${n("note_info_widget.note_size_info")}">${n("note_info_widget.note_size")}:</th>
            <td colspan="3">
                <button class="btn btn-sm calculate-button" style="padding: 0px 10px 0px 10px;">
                    <span class="bx bx-calculator"></span> ${n("note_info_widget.calculate")}
                </button>
                <span class="note-sizes-wrapper">
                    <span class="note-size"></span>
                    <span class="subtree-size"></span>
                </span>
            </td>
        </tr>
    </table>
</div>
`;class Fi extends p{$noteId;$dateCreated;$dateModified;$type;$mime;$noteSizesWrapper;$noteSize;$subTreeSize;$calculateButton;get name(){return"noteInfo"}get toggleCommand(){return"toggleRibbonTabNoteInfo"}isEnabled(){return!!this.note}getTitle(){return{show:this.isEnabled(),title:n("note_info_widget.title"),icon:"bx bx-info-circle"}}doRender(){this.$widget=$(zi),this.contentSized(),this.$noteId=this.$widget.find(".note-info-note-id"),this.$dateCreated=this.$widget.find(".note-info-date-created"),this.$dateModified=this.$widget.find(".note-info-date-modified"),this.$type=this.$widget.find(".note-info-type"),this.$mime=this.$widget.find(".note-info-mime"),this.$noteSizesWrapper=this.$widget.find(".note-sizes-wrapper"),this.$noteSize=this.$widget.find(".note-size"),this.$subTreeSize=this.$widget.find(".subtree-size"),this.$calculateButton=this.$widget.find(".calculate-button"),this.$calculateButton.on("click",async()=>{this.$noteSizesWrapper.show(),this.$calculateButton.hide(),this.$noteSize.empty().append($('<span class="bx bx-loader bx-spin"></span>')),this.$subTreeSize.empty().append($('<span class="bx bx-loader bx-spin"></span>'));const t=await m.get(`stats/note-size/${this.noteId}`);this.$noteSize.text(w.formatSize(t.noteSize));const e=await m.get(`stats/subtree-size/${this.noteId}`);e.subTreeNoteCount>1?this.$subTreeSize.text(n("note_info_widget.subtree_size",{size:w.formatSize(e.subTreeSize),count:e.subTreeNoteCount})):this.$subTreeSize.text("")})}async refreshWithNote(t){const e=await m.get(`notes/${this.noteId}/metadata`);this.$noteId.text(t.noteId),this.$dateCreated.text(nt(e.dateCreated)).attr("title",e.dateCreated),this.$dateModified.text(nt(e.dateModified)).attr("title",e.dateModified),this.$type.text(t.type),t.mime?this.$mime.text(`(${t.mime})`):this.$mime.empty(),this.$calculateButton.show(),this.$noteSizesWrapper.hide()}entitiesReloadedEvent({loadResults:t}){this.noteId&&(t.isNoteReloaded(this.noteId)||t.isNoteContentReloaded(this.noteId))&&this.refresh()}}const Hi={grid:{properties:[]},list:{properties:[{label:C("book_properties.collapse"),title:C("book_properties.collapse_all_notes"),type:"button",icon:"bx bx-layer-minus",async onClick({note:a,triggerCommand:t}){const{noteId:e}=a;for(const i of a.getOwnedLabels("expanded"))await b.removeAttributeById(e,i.attributeId);t("refreshNoteList",{noteId:e})}},{label:C("book_properties.expand"),title:C("book_properties.expand_all_children"),type:"button",icon:"bx bx-move-vertical",async onClick({note:a,triggerCommand:t}){const{noteId:e}=a;a.isLabelTruthy("expanded")||await b.addLabel(e,"expanded"),t("refreshNoteList",{noteId:e})}}]},calendar:{properties:[{label:C("book_properties_config.hide-weekends"),type:"checkbox",bindToLabel:"calendar:hideWeekends"},{label:C("book_properties_config.display-week-numbers"),type:"checkbox",bindToLabel:"calendar:weekNumbers"}]},geoMap:{properties:[{label:C("book_properties_config.map-style"),type:"combobox",bindToLabel:"map:style",defaultValue:Vt,options:[{name:C("book_properties_config.raster"),items:Object.entries(Y).filter(([a,t])=>t.type==="raster").map(X)},{name:C("book_properties_config.vector_light"),items:Object.entries(Y).filter(([a,t])=>t.type==="vector"&&!t.isDarkTheme).map(X)},{name:C("book_properties_config.vector_dark"),items:Object.entries(Y).filter(([a,t])=>t.type==="vector"&&t.isDarkTheme).map(X)}]},{label:C("book_properties_config.show-scale"),type:"checkbox",bindToLabel:"map:scale"}]},table:{properties:[{label:C("book_properties_config.max-nesting-depth"),type:"number",bindToLabel:"maxNestingDepth",width:65}]},board:{properties:[]}};function X([a,t]){return{value:a,label:t.name}}const Mt={grid:n("book_properties.grid"),list:n("book_properties.list"),calendar:n("book_properties.calendar"),table:n("book_properties.table"),geoMap:n("book_properties.geo-map"),board:n("book_properties.board")},Vi=`
<div class="book-properties-widget">
    <style>
        .book-properties-widget {
            padding: 12px 12px 6px 12px;
            display: flex;
        }

        .book-properties-widget > * {
            margin-right: 15px;
        }

        .book-properties-container {
            display: flex;
            align-items: center;
        }

        .book-properties-container > div {
            margin-right: 15px;
        }

        .book-properties-container > .type-number > label {
            display: flex;
            align-items: baseline;
        }

        .book-properties-container input[type="checkbox"] {
            margin-right: 5px;
        }

        .book-properties-container label {
            display: flex;
            justify-content: center;
            align-items: center;
            text-overflow: clip;
            white-space: nowrap;
        }
    </style>

    <div style="display: flex; align-items: baseline">
        <span style="white-space: nowrap">${n("book_properties.view_type")}:&nbsp; &nbsp;</span>

        <select class="view-type-select form-select form-select-sm">
            ${Object.entries(Mt).filter(([a])=>a!=="raster").map(([a,t])=>`
                <option value="${a}">${t}</option>
            `).join("")}
        </select>
    </div>

    <div class="book-properties-container">
    </div>
</div>
`;class qi extends p{$viewTypeSelect;$propertiesContainer;labelsToWatch=[];get name(){return"bookProperties"}get toggleCommand(){return"toggleRibbonTabBookProperties"}isEnabled(){return this.note&&this.note.type==="book"}getTitle(){return{show:this.isEnabled(),title:n("book_properties.book_properties"),icon:"bx bx-book"}}doRender(){this.$widget=$(Vi),this.contentSized(),this.$viewTypeSelect=this.$widget.find(".view-type-select"),this.$viewTypeSelect.on("change",()=>this.toggleViewType(String(this.$viewTypeSelect.val()))),this.$propertiesContainer=this.$widget.find(".book-properties-container")}async refreshWithNote(t){if(!this.note)return;const e=this.note.getLabelValue("viewType")||"grid";this.$viewTypeSelect.val(e),this.$propertiesContainer.empty();const i=Hi[e];if(i)for(const o of i.properties)this.$propertiesContainer.append(this.renderBookProperty(o)),this.labelsToWatch.push(o.bindToLabel)}async toggleViewType(t){if(this.noteId){if(!Mt.hasOwnProperty(t))throw new Error(n("book_properties.invalid_view_type",{type:t}));await b.setLabel(this.noteId,"viewType",t)}}entitiesReloadedEvent({loadResults:t}){t.getAttributeRows().find(e=>e.noteId===this.noteId&&(e.name==="viewType"||this.labelsToWatch.includes(e.name??"")))&&this.refresh()}renderBookProperty(t){const e=$("<div>");e.addClass(`type-${t.type}`);const i=this.note;if(!i)return e;switch(t.type){case"checkbox":const o=$("<label>").text(t.label),s=$("<input>",{type:"checkbox",class:"form-check-input"});s.on("change",()=>{s.prop("checked")?b.setLabel(i.noteId,t.bindToLabel):b.removeOwnedLabelByName(i,t.bindToLabel)}),s.prop("checked",i.hasOwnedLabel(t.bindToLabel)),o.prepend(s),e.append(o);break;case"button":const r=$("<button>",{type:"button",class:"btn btn-sm"}).text(t.label);t.title&&r.attr("title",t.title),t.icon&&r.prepend($("<span>",{class:t.icon})),r.on("click",()=>{t.onClick({note:i,triggerCommand:this.triggerCommand.bind(this)})}),e.append(r);break;case"number":const d=$("<input>",{type:"number",class:"form-control form-control-sm",value:i.getLabelValue(t.bindToLabel)||"",width:t.width??100,min:t.min??0});d.on("change",()=>{const h=d.val();h===""?b.removeOwnedLabelByName(i,t.bindToLabel):b.setLabel(i.noteId,t.bindToLabel,String(h))}),e.append($("<label>").text(t.label).append("&nbsp;".repeat(2)).append(d));break;case"combobox":const l=$("<select>",{class:"form-select form-select-sm"}),c=i.getLabelValue(t.bindToLabel)??t.defaultValue??"";for(const h of t.options)if("items"in h){const g=$("<optgroup>",{label:h.name});for(const f of h.items)wt(f,c).appendTo(g);g.appendTo(l)}else wt(h,c).appendTo(l);l.on("change",()=>{const h=l.val();h===null||h===""?b.removeOwnedLabelByName(i,t.bindToLabel):b.setLabel(i.noteId,t.bindToLabel,String(h))}),e.append($("<label>").text(t.label).append("&nbsp;".repeat(2)).append(l));break}return e}}function wt({value:a,label:t},e){const i=$("<option>",{value:a,text:t});return e===a&&i.prop("selected",!0),i}const Ui=`
<div class="note-map-ribbon-widget">
    <style>
        .note-map-ribbon-widget {
            position: relative;
        }

        .note-map-ribbon-widget .note-map-container {
            height: 300px;
        }

        .note-map-ribbon-widget .open-full-button, .note-map-ribbon-widget .collapse-button {
            position: absolute;
            right: 5px;
            bottom: 5px;
            z-index: 1000;
        }

        .style-resolver {
            color: var(--muted-text-color);
            display: none;
        }
    </style>

    <button class="bx bx-arrow-to-bottom icon-action open-full-button" title="${n("note_map.open_full")}"></button>
    <button class="bx bx-arrow-to-top icon-action collapse-button" style="display: none;" title="${n("note_map.collapse")}"></button>

    <div class="note-map-container"></div>
</div>`;class ji extends p{openState;noteMapWidget;$container;$openFullButton;$collapseButton;constructor(){super(),this.noteMapWidget=new qt("ribbon"),this.child(this.noteMapWidget)}get name(){return"noteMap"}get toggleCommand(){return"toggleRibbonTabNoteMap"}getTitle(){return{show:this.isEnabled(),title:n("note_map.title"),icon:"bx bxs-network-chart"}}doRender(){this.$widget=$(Ui),this.contentSized(),this.$container=this.$widget.find(".note-map-container"),this.$container.append(this.noteMapWidget.render()),this.openState="small",this.$openFullButton=this.$widget.find(".open-full-button"),this.$openFullButton.on("click",()=>{this.setFullHeight(),this.$openFullButton.hide(),this.$collapseButton.show(),this.openState="full",this.noteMapWidget.setDimensions()}),this.$collapseButton=this.$widget.find(".collapse-button"),this.$collapseButton.on("click",()=>{this.setSmallSize(),this.$openFullButton.show(),this.$collapseButton.hide(),this.openState="small",this.noteMapWidget.setDimensions()});const t=()=>{this.noteMapWidget.graph&&(this.openState==="full"?this.setFullHeight():this.openState==="small"&&this.setSmallSize())};new ResizeObserver(t).observe(this.$widget[0])}setSmallSize(){const e=this.$widget.width()??0;this.$widget.find(".note-map-container").height(300).width(e)}setFullHeight(){const{top:t}=this.$widget[0].getBoundingClientRect(),e=($(window).height()??0)-t,i=this.$widget.width()??0;this.$widget.find(".note-map-container").height(e).width(i)}}const Ki=`
<div class="note-paths-widget">
    <style>
    .note-paths-widget {
        padding: 12px;
        max-height: 300px;
        overflow-y: auto;
    }

    .note-path-list {
        margin-top: 10px;
    }

    .note-path-list .path-current a {
        font-weight: bold;
    }

    .note-path-list .path-archived a {
        color: var(--muted-text-color) !important;
    }

    .note-path-list .path-search a {
        font-style: italic;
    }
    </style>

    <div class="note-path-intro"></div>

    <ul class="note-path-list"></ul>

    <button class="btn btn-sm" data-trigger-command="cloneNoteIdsTo">${n("note_paths.clone_button")}</button>
</div>`;class Gi extends p{$notePathIntro;$notePathList;get name(){return"notePaths"}get toggleCommand(){return"toggleRibbonTabNotePaths"}getTitle(){return{show:!0,title:n("note_paths.title"),icon:"bx bx-collection"}}doRender(){this.$widget=$(Ki),this.contentSized(),this.$notePathIntro=this.$widget.find(".note-path-intro"),this.$notePathList=this.$widget.find(".note-path-list")}async refreshWithNote(t){if(this.$notePathList.empty(),!this.note||this.noteId==="root"){this.$notePathList.empty().append(await this.getRenderedPath(["root"]));return}const e=this.note.getSortedNotePathRecords(this.hoistedNoteId).filter(o=>!o.isHidden);e.length>0?this.$notePathIntro.text(n("note_paths.intro_placed")):this.$notePathIntro.text(n("note_paths.intro_not_placed"));const i=[];for(const o of e){const s=o.notePath;i.push(await this.getRenderedPath(s,o))}this.$notePathList.empty().append(...i)}async getRenderedPath(t,e=null){const i=$("<li>"),o=[],s=t.length-1;for(let d=0;d<t.length;d++){const l=t[d];o.push(l);const c=await q.getNoteTitle(l),h=await H.createLink(o.join("/"),{title:c});h.find("a").addClass("no-tooltip-preview tn-link"),i.append(h),d!=s&&i.append(" / ")}const r=[];return this.notePath===t.join("/")&&i.addClass("path-current"),!e||e.isInHoistedSubTree?i.addClass("path-in-hoisted-subtree"):r.push(`<span class="bx bx-trending-up" title="${n("note_paths.outside_hoisted")}"></span>`),e?.isArchived&&(i.addClass("path-archived"),r.push(`<span class="bx bx-archive" title="${n("note_paths.archived")}"></span>`)),e?.isSearch&&(i.addClass("path-search"),r.push(`<span class="bx bx-search" title="${n("note_paths.search")}"></span>`)),r.length>0&&i.append(` ${r.join(" ")}`),i}entitiesReloadedEvent({loadResults:t}){(t.getBranchRows().find(e=>e.noteId===this.noteId)||this.noteId!=null&&t.isNoteReloaded(this.noteId))&&this.refresh()}}const Yi=`
<div class="similar-notes-widget">
    <style>
    .similar-notes-wrapper {
        max-height: 200px;
        overflow: auto;
        padding: 12px;
    }

    .similar-notes-wrapper a {
        display: inline-block;
        border: 1px dotted var(--main-border-color);
        border-radius: 20px;
        background-color: var(--accented-background-color);
        padding: 0 10px 0 10px;
        margin: 0 3px 0 3px;
        max-width: 10em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
    </style>

    <div class="similar-notes-wrapper"></div>
</div>
`;class Xi extends p{$similarNotesWrapper;title;rendered;get name(){return"similarNotes"}get toggleCommand(){return"toggleRibbonTabSimilarNotes"}isEnabled(){return super.isEnabled()&&this.note?.type!=="search"&&!this.note?.isLabelTruthy("similarNotesWidgetDisabled")}getTitle(){return{show:this.isEnabled(),title:n("similar_notes.title"),icon:"bx bx-bar-chart"}}doRender(){this.$widget=$(Yi),this.contentSized(),this.$similarNotesWrapper=this.$widget.find(".similar-notes-wrapper")}async refreshWithNote(t){if(!this.note)return;this.title=this.note.title;const e=await m.get(`similar-notes/${this.noteId}`);if(e.length===0){this.$similarNotesWrapper.empty().append(n("similar_notes.no_similar_notes_found"));return}const i=e.flatMap(s=>s.notePath);await W.getNotes(i,!0);const o=$("<div>");for(const s of e){if(!await W.getNote(s.noteId,!0))continue;const d=(await H.createLink(s.notePath.join("/"))).css("font-size",24*(1-1/(1+s.score)));o.append(d)}this.$similarNotesWrapper.empty().append(o)}entitiesReloadedEvent({loadResults:t}){this.note&&this.title!==this.note.title&&(this.rendered=!1,this.refresh())}}class Qi extends _{rightPaneHidden;constructor(){super("column"),this.id("right-pane"),this.css("height","100%"),this.collapsible(),this.rightPaneHidden=!1}isEnabled(){return super.isEnabled()&&!this.rightPaneHidden&&this.children.length>0&&!!this.children.find(t=>t.isEnabled()&&t.canBeShown())}async handleEventInChildren(t,e){const i=super.handleEventInChildren(t,e);return["activeContextChanged","noteSwitchedAndActivated","noteSwitched"].includes(t)&&(i?i.then(()=>this.reEvaluateRightPaneVisibilityCommand()):this.reEvaluateRightPaneVisibilityCommand()),i}reEvaluateRightPaneVisibilityCommand(){const t=!this.isHiddenInt(),e=this.isEnabled();t!==e&&(this.toggleInt(e),kt.setupRightPaneResizer())}toggleRightPaneEvent(){this.rightPaneHidden=!this.rightPaneHidden,this.reEvaluateRightPaneVisibilityCommand()}}const Ji=`
<div class="edited-notes-widget">
    <style>
        .edited-notes-widget {
            padding: 12px;
            max-height: 200px;
            width: 100%;
            overflow: auto;
        }
    </style>

    <div class="no-edited-notes-found">${n("edited_notes.no_edited_notes_found")}</div>

    <div class="edited-notes-list use-tn-links"></div>
</div>
`;class Zi extends p{$list;$noneFound;get name(){return"editedNotes"}isEnabled(){return super.isEnabled()&&this.note?.hasOwnedLabel("dateNote")}getTitle(){return{show:this.isEnabled(),activate:(this.note?.getPromotedDefinitionAttributes().length===0||!v.is("promotedAttributesOpenInRibbon"))&&v.is("editedNotesOpenInRibbon"),title:n("edited_notes.title"),icon:"bx bx-calendar-edit"}}async doRender(){this.$widget=$(Ji),this.contentSized(),this.$list=this.$widget.find(".edited-notes-list"),this.$noneFound=this.$widget.find(".no-edited-notes-found")}async refreshWithNote(t){let e=await m.get(`edited-notes/${t.getLabelValue("dateNote")}`);if(e=e.filter(o=>o.noteId!==t.noteId),this.$list.empty(),this.$noneFound.hide(),e.length===0){this.$noneFound.show();return}const i=e.flatMap(o=>o.noteId);await W.getNotes(i,!0);for(let o=0;o<e.length;o++){const s=e[o],r=$('<span class="edited-note-line">');if(s.isDeleted){const d=`${s.title} ${n("edited_notes.deleted")}`;r.append($("<i>").text(d).attr("title",d))}else r.append(s.notePath?await H.createLink(s.notePath.join("/"),{showNotePath:!0}):$("<span>").text(s.title));o<e.length-1&&r.append(", "),this.$list.append(r)}}}class tn extends E{isEnabled(){return!!(super.isEnabled()&&this.note&&this.note.type==="text"&&this.noteContext?.viewScope?.viewMode==="default")}constructor(){super(),this.icon("bx-tn-toc").title(n("show_toc_widget_button.show_toc")).titlePlacement("bottom").onClick(()=>{this.noteContext?.viewScope&&this.noteId&&(this.noteContext.viewScope.tocTemporarilyHidden=!1,u.triggerEvent("showTocWidget",{noteId:this.noteId})),this.toggleInt(!1)})}async refreshWithNote(){this.noteContext?.viewScope&&this.toggleInt(this.noteContext.viewScope.tocTemporarilyHidden)}async reEvaluateTocWidgetVisibilityEvent({noteId:t}){t===this.noteId&&await this.refresh()}async entitiesReloadedEvent({loadResults:t}){this.noteId&&t.isNoteContentReloaded(this.noteId)?await this.refresh():t.getAttributeRows().find(e=>e.type==="label"&&(e.name?.toLowerCase().includes("readonly")||e.name==="toc")&&this.note&&b.isAffecting(e,this.note))&&await this.refresh()}async noteTypeMimeChangedEvent({noteId:t}){this.isNote(t)&&await this.refresh()}}class en extends E{isEnabled(){return!!(super.isEnabled()&&this.note&&this.note.type==="text"&&this.noteContext?.viewScope?.viewMode==="default")}constructor(){super(),this.icon("bx-bookmarks").title(n("show_highlights_list_widget_button.show_highlights_list")).titlePlacement("bottom").onClick(()=>{this.noteContext?.viewScope&&this.noteId&&(this.noteContext.viewScope.highlightsListTemporarilyHidden=!1,u.triggerEvent("showHighlightsListWidget",{noteId:this.noteId})),this.toggleInt(!1)})}async refreshWithNote(){this.noteContext?.viewScope&&this.toggleInt(this.noteContext.viewScope.highlightsListTemporarilyHidden)}async reEvaluateHighlightsListWidgetVisibilityEvent({noteId:t}){t===this.noteId&&await this.refresh()}async entitiesReloadedEvent({loadResults:t}){this.noteId&&t.isNoteContentReloaded(this.noteId)?await this.refresh():t.getAttributeRows().find(e=>e.type==="label"&&(e.name?.toLowerCase().includes("readonly")||e.name==="hideHighlightWidget")&&this.note&&b.isAffecting(e,this.note))&&await this.refresh()}async noteTypeMimeChangedEvent({noteId:t}){this.isNote(t)&&await this.refresh()}}class nn extends _{noteContext;constructor(){super("column"),this.css("flex-grow","1").collapsible()}setNoteContextEvent({noteContext:t}){this.noteContext=t,this.refresh()}noteSwitchedAndActivatedEvent(){this.refresh()}noteSwitchedEvent(){this.refresh()}activeContextChangedEvent(){this.refresh()}refresh(){const t=this.isHiddenExt();this.$widget.removeClass(),this.toggleExt(!t),this.$widget.addClass("component note-split");const e=this.noteContext?.note;if(!e)return;this.$widget.toggleClass("full-content-width",this.#t(e)),this.$widget.addClass(e.getCssClass()),this.$widget.addClass(w.getNoteTypeClass(e.type)),this.$widget.addClass(w.getMimeTypeClass(e.mime)),this.$widget.toggleClass("protected",e.isProtected);const i=e?.getLabelValue("language"),o=Bt(i);this.$widget.toggleClass("rtl",!!o?.rtl)}#t(t){return["image","mermaid","book","render","canvas","webView","mindMap"].includes(t.type)||t.type==="file"&&(t.mime==="application/pdf"||t.mime.startsWith("video/"))?!0:!!t?.isLabelTruthy("fullContentWidth")}async entitiesReloadedEvent({loadResults:t}){const e=this.noteContext?.noteId;(t.isNoteReloaded(e)||t.getAttributeRows().find(i=>i.type==="label"&&["cssClass","language"].includes(i.name??"")&&b.isAffecting(i,this.noteContext?.note)))&&this.refresh()}}class on{parent;findResult;editingState;constructor(t){this.parent=t}async getTextEditor(){return this.parent?.noteContext?.getTextEditor()}async performFind(t,e,i){const o=await this.getTextEditor();if(!o)return{currentFound:0,totalFound:0};const s=o.model;let r=null,d=0,l=-1;const c=o.plugins.get("FindAndReplaceEditing");if(c.state?.clear(s),c.stop(),this.editingState=c.state,t!==""){const h={matchCase:e,wholeWords:i};r=o.execute("find",t,h),d=r.results.length;const g=s.document.selection;if(g.isCollapsed){const f=o?.sourceElement,y=f?.querySelectorAll(".ck-find-result"),R=f?.closest(".scrolling-container")?.getBoundingClientRect().top??0,S=Array.from(y??[]).findIndex(N=>N.getBoundingClientRect().top>=R);l=S>=0?S:0}else{const f=g.getFirstPosition();for(let y=0;y<r.results.length;++y){const R=r.results.get(y)?.marker?.getStart();if(f&&R?.compareWith(f)!=="before"){l=y;break}}}}if(this.findResult=r,d>0){l=Math.max(0,l);for(let h=0;h<l;++h)o?.execute("findNext")}return{totalFound:d,currentFound:Math.min(l+1,d)}}async findNext(t,e,i){const o=await this.getTextEditor();t>0?o?.execute("findNext"):o?.execute("findPrevious")}async findBoxClosed(t,e){const i=await this.getTextEditor();if(i){if(t>0){const o=i.model,s=this.findResult?.results?.get(e)?.marker?.getRange();let r=i.plugins.get("FindAndReplaceEditing");r.state?.clear(o),r.stop(),s&&o.change(d=>{d.setSelection(s)}),i.editing.view.scrollToTheSelection()}this.findResult=null,i.focus()}}async replace(t){this.editingState!==void 0&&this.editingState.highlightedResult!==null&&(await this.getTextEditor())?.execute("replace",t,this.editingState.highlightedResult)}async replaceAll(t){this.editingState!==void 0&&this.editingState.results.length>0&&(await this.getTextEditor())?.execute("replaceAll",t,this.editingState.results)}}class sn{parent;searchParameters=null;constructor(t){this.parent=t}async getCodeEditor(){return this.parent.noteContext?.getCodeEditor()}async performFind(t,e,i){const o=await this.getCodeEditor();if(!o)return{totalFound:0,currentFound:0};this.searchParameters={searchTerm:t,matchCase:e,wholeWord:i};const{totalFound:s,currentFound:r}=await o.performFind(t,e,i);return{totalFound:s,currentFound:r}}async findNext(t,e,i){const o=await this.getCodeEditor();o&&o.findNext(t,e,i)}async findBoxClosed(t,e){const i=await this.getCodeEditor();i?.cleanSearch(),i?.focus()}async replace(t){await(await this.getCodeEditor())?.replace(t),this.rerunSearch()}async replaceAll(t){await(await this.getCodeEditor())?.replaceAll(t),this.rerunSearch()}rerunSearch(){this.searchParameters&&this.performFind(this.searchParameters.searchTerm,this.searchParameters.matchCase,this.searchParameters.wholeWord)}}const xt="ck-find-result_selected",$t="ck-find-result";class an{parent;currentIndex;$results;mark;constructor(t){this.parent=t,this.currentIndex=0,this.$results=null}async performFind(t,e,i){const o=await this.parent?.noteContext?.getContentElement();if(!o||!o.length)return Promise.resolve({totalFound:0,currentFound:0});this.mark||(this.mark=new(await ke(async()=>{const{default:d}=await import("./mark.js").then(l=>l.m);return{default:d}},__vite__mapDeps([0,1]),import.meta.url)).default(o[0]));const s=i?"\\b":"",r=new RegExp(s+w.escapeRegExp(t)+s,e?"g":"gi");return new Promise(d=>{this.mark.unmark({done:()=>{this.mark.markRegExp(r,{element:"span",className:$t,done:async()=>{this.$results=o.find(`.${$t}`);const c=o[0].closest(".scrolling-container")?.getBoundingClientRect().top??0,h=this.$results.toArray().findIndex(g=>g.getBoundingClientRect().top>=c);this.currentIndex=h>=0?h:0,await this.jumpTo(),d({totalFound:this.$results.length,currentFound:this.$results.length>0?this.currentIndex+1:0})}})}})})}async findNext(t,e,i){this.$results?.length&&(this.currentIndex+=t,this.currentIndex<0&&(this.currentIndex=this.$results.length-1),this.currentIndex>this.$results.length-1&&(this.currentIndex=0),await this.jumpTo())}async findBoxClosed(t,e){this.mark?.unmark()}async jumpTo(){if(this.$results?.length){const t=this.$results.eq(this.currentIndex);this.$results.removeClass(xt),t[0].scrollIntoView({block:"center",inline:"center"}),t.addClass(xt)}}}const rn=200,dn=`
<div class='find-replace-widget' style="contain: none; border-top: 1px solid var(--main-border-color);">
    <style>
        .find-widget-box, .replace-widget-box {
            padding: 2px 10px 2px 10px;
            align-items: center;
        }

        .find-widget-box > *, .replace-widget-box > *{
            margin-right: 15px;
        }

        .find-widget-box, .replace-widget-box {
            display: flex;
        }

        .find-widget-found-wrapper {
            justify-content: center;
            min-width: 60px;
            padding: 0 4px;
            font-size: .85em;
            text-align: center;
        }

        .find-widget-search-term-input-group, .replace-widget-replacetext-input {
            max-width: 350px;
        }

        .find-widget-spacer {
            flex-grow: 1;
        }
    </style>

    <div class="find-widget-box">
        <div class="input-group find-widget-search-term-input-group">
            <input type="text" class="form-control find-widget-search-term-input" placeholder="${n("find.find_placeholder")}">
            <button class="btn btn-outline-secondary bx bxs-chevron-up find-widget-previous-button" type="button"></button>
            <div class="find-widget-found-wrapper input-group-text">
                <span>
                    <span class="find-widget-current-found">0</span>
                    /
                    <span class="find-widget-total-found">0</span>
                <span>
            </div>
            <button class="btn btn-outline-secondary bx bxs-chevron-down find-widget-next-button" type="button"></button>
        </div>

        <div class="form-check">
            <label tabIndex="-1" class="form-check-label tn-checkbox">
                <input type="checkbox" class="form-check-input find-widget-case-sensitive-checkbox">
                ${n("find.case_sensitive")}
            </label>
        </div>

        <div class="form-check">
            <label tabIndex="-1" class="form-check-label tn-checkbox">
                <input type="checkbox" class="form-check-input find-widget-match-words-checkbox">
                ${n("find.match_words")}
            </label>
        </div>



        <div class="find-widget-spacer"></div>

        <div class="find-widget-close-button"><button class="btn icon-action bx bx-x"></button></div>
    </div>

    <div class="replace-widget-box" style='display: none'>
        <input type="text" class="form-control replace-widget-replacetext-input" placeholder="${n("find.replace_placeholder")}">
        <button class="btn btn-sm replace-widget-replaceall-button" type="button">${n("find.replace_all")}</button>
        <button class="btn btn-sm  replace-widget-replace-button" type="button">${n("find.replace")}</button>
    </div>
</div>`,vt=["text","code","render","mindMap","doc"];class ln extends p{searchTerm;textHandler;codeHandler;htmlHandler;handler;timeoutId;$input;$currentFound;$totalFound;$caseSensitiveCheckbox;$matchWordsCheckbox;$previousButton;$nextButton;$closeButton;$replaceWidgetBox;$replaceTextInput;$replaceAllButton;$replaceButton;constructor(){super(),this.searchTerm=null,this.textHandler=new on(this),this.codeHandler=new sn(this),this.htmlHandler=new an(this)}async noteSwitched(){await super.noteSwitched(),await this.closeSearch()}doRender(){return this.$widget=$(dn),this.$widget.hide(),this.$input=this.$widget.find(".find-widget-search-term-input"),this.$currentFound=this.$widget.find(".find-widget-current-found"),this.$totalFound=this.$widget.find(".find-widget-total-found"),this.$caseSensitiveCheckbox=this.$widget.find(".find-widget-case-sensitive-checkbox"),this.$caseSensitiveCheckbox.on("change",()=>this.performFind()),this.$matchWordsCheckbox=this.$widget.find(".find-widget-match-words-checkbox"),this.$matchWordsCheckbox.on("change",()=>this.performFind()),this.$previousButton=this.$widget.find(".find-widget-previous-button"),this.$previousButton.on("click",()=>this.findNext(-1)),this.$nextButton=this.$widget.find(".find-widget-next-button"),this.$nextButton.on("click",()=>this.findNext(1)),this.$closeButton=this.$widget.find(".find-widget-close-button"),this.$closeButton.on("click",()=>this.closeSearch()),this.$replaceWidgetBox=this.$widget.find(".replace-widget-box"),this.$replaceTextInput=this.$widget.find(".replace-widget-replacetext-input"),this.$replaceAllButton=this.$widget.find(".replace-widget-replaceall-button"),this.$replaceAllButton.on("click",()=>this.replaceAll()),this.$replaceButton=this.$widget.find(".replace-widget-replace-button"),this.$replaceButton.on("click",()=>this.replace()),this.$input.on("keydown",async t=>{if((t.metaKey||t.ctrlKey)&&(t.key==="F"||t.key==="f"))this.$input.select();else if(t.key==="Enter"||t.key==="F3")return await this.findNext(t?.shiftKey?-1:1),t.preventDefault(),!1}),this.$widget.on("keydown",async t=>{t.key==="Escape"&&await this.closeSearch()}),this.$input.on("input",()=>this.startSearch()),this.$widget}async findInTextEvent(){if(!this.isActiveNoteContext()||!vt.includes(this.note?.type??""))return;this.handler=await this.getHandler();const t=await this.noteContext?.isReadOnly();let e="";this.note?.type==="code"&&this.noteContext?e=(await this.noteContext.getCodeEditor()).getSelectedText():e=window.getSelection()?.toString()||"",this.$widget.show(),this.$input.focus(),["text","code"].includes(this.note?.type??"")&&!t?this.$replaceWidgetBox.show():this.$replaceWidgetBox.hide(),this.$widget.is(":visible")?(e&&this.$input.val(e),this.$input.val()&&await this.performFind(),this.$input.select()):(this.$totalFound.text(0),this.$currentFound.text(0),this.$input.val(e),e&&(this.$input.select(),await this.performFind()))}async readOnlyTemporarilyDisabledEvent({noteContext:t}){this.isNoteContext(t.ntxId)&&await this.closeSearch()}async getHandler(){switch(this.note?.type){case"render":return this.htmlHandler;case"code":return this.codeHandler;case"text":return await this.noteContext?.isReadOnly()?this.htmlHandler:this.textHandler;case"mindMap":case"doc":return this.htmlHandler;default:console.warn("FindWidget: Unsupported note type for find widget",this.note?.type)}}startSearch(){clearTimeout(this.timeoutId),this.timeoutId=setTimeout(async()=>{this.timeoutId=null,await this.performFind()},rn)}async findNext(t){if(this.$totalFound.text()=="?"){await this.performFind();return}this.$input.val();const e=parseInt(this.$totalFound.text()),i=parseInt(this.$currentFound.text())-1;if(e>0){let o=i+t;o>e-1?o=0:o<0&&(o=e-1),this.$currentFound.text(o+1),await this.handler?.findNext(t,i,o)}}async performFind(){const t=String(this.$input.val()),e=this.$caseSensitiveCheckbox.prop("checked"),i=this.$matchWordsCheckbox.prop("checked");if(!this.handler)return;const{totalFound:o,currentFound:s}=await this.handler.performFind(t,e,i);this.$totalFound.text(o),this.$currentFound.text(s),this.searchTerm=t}async closeSearch(){if(this.$widget.is(":visible")){this.$widget.hide();const t=parseInt(this.$totalFound.text()),e=parseInt(this.$currentFound.text())-1;this.searchTerm=null,await this.handler?.findBoxClosed(t,e)}}async replace(){const t=String(this.$replaceTextInput.val());this.handler&&"replace"in this.handler&&await this.handler.replace(t)}async replaceAll(){const t=String(this.$replaceTextInput.val());this.handler&&"replace"in this.handler&&await this.handler.replaceAll(t)}isEnabled(){return super.isEnabled()&&vt.includes(this.note?.type??"")}async entitiesReloadedEvent({loadResults:t}){this.noteId&&t.isNoteContentReloaded(this.noteId)?this.$totalFound.text("?"):t.getAttributeRows().find(e=>e.type==="label"&&(e.name?.toLowerCase()??"").includes("readonly")&&b.isAffecting(e,this.note))&&this.closeSearch()}}const cn=`<div class="toc-widget">
    <style>
        .toc-widget {
            padding: 10px;
            contain: none;
            overflow: auto;
            position: relative;
            padding-left:0px !important;
        }

        .toc ol {
            position: relative;
            overflow: hidden;
            padding-left: 0px;
            transition: max-height 0.3s ease;
        }

        .toc li.collapsed + ol {
            display:none;
        }

        .toc li + ol:before {
            content: "";
            position: absolute;
            height: 100%;
            border-left: 1px solid var(--main-border-color);
            z-index: 10;
        }

        .toc li {
            display: flex;
            position: relative;
            list-style: none;
            align-items: center;
            padding-left: 7px;
            cursor: pointer;
            text-align: justify;
            word-wrap: break-word;
            hyphens: auto;
        }

        .toc > ol {
            --toc-depth-level: 1;
        }
        .toc > ol > ol {
            --toc-depth-level: 2;
        }
        .toc > ol > ol > ol {
            --toc-depth-level: 3;
        }
        .toc > ol > ol > ol > ol {
            --toc-depth-level: 4;
        }
        .toc > ol > ol > ol > ol > ol {
            --toc-depth-level: 5;
        }

        .toc > ol ol::before {
            left: calc((var(--toc-depth-level) - 2) * 20px + 14px);
        }

        .toc li {
            padding-left: calc((var(--toc-depth-level) - 1) * 20px + 4px);
        }

        .toc li .collapse-button {
            display: flex;
            position: relative;
            width: 21px;
            height: 21px;
            flex-shrink: 0;
            align-items: center;
            justify-content: center;
            transition: transform 0.3s ease;
        }

        .toc li.collapsed .collapse-button {
            transform: rotate(-90deg);
        }

        .toc li .item-content {
            margin-left: 25px;
            flex: 1;
        }

        .toc li .collapse-button + .item-content {
            margin-left: 4px;
        }

        .toc li:hover {
            font-weight: bold;
        }
    </style>

    <span class="toc"></span>
</div>`;class hn extends Wt{$toc;tocLabelValue;get widgetTitle(){return n("toc.table_of_contents")}get widgetButtons(){return[new E().icon("bx-cog").title(n("toc.options")).titlePlacement("left").onClick(()=>u.tabManager.openContextWithNote("_optionsTextNotes",{activate:!0})).class("icon-action"),new E().icon("bx-x").titlePlacement("left").onClick(t=>t.triggerCommand("closeToc")).class("icon-action")]}isEnabled(){if(!super.isEnabled()||!this.note)return!1;const t=this.note.type==="doc"&&this.note.noteId.startsWith("_help");return(this.note.type==="text"||t)&&!this.noteContext?.viewScope?.tocTemporarilyHidden&&this.noteContext?.viewScope?.viewMode==="default"}async doRenderBody(){this.$body.empty().append($(cn)),this.$toc=this.$body.find(".toc")}async refreshWithNote(t){if(this.toggleInt(!!this.noteContext?.viewScope?.tocPreviousVisible),this.tocLabelValue=t.getLabelValue("toc"),this.tocLabelValue==="hide"){this.toggleInt(!1),this.triggerCommand("reEvaluateRightPaneVisibility");return}if(!(!this.note||!this.noteContext?.viewScope)){if(this.note.type==="text"){const e=await t.getBlob();if(e){const i=await this.getToc(e.content);this.#t(i)}return}this.note.type==="doc"&&setTimeout(async()=>{const e=await this.noteContext?.getContentElement();if(e){const i=e.html(),o=await this.getToc(i);this.#t(o)}else console.warn("Unable to get content element for doctype")},10)}}#t({$toc:t,headingCount:e}){this.$toc.empty(),t&&this.$toc.append(t);const i=this.tocLabelValue,o=i===""||i==="show"||e>=(v.getInt("minTocHeadings")??0);this.toggleInt(o),this.noteContext?.viewScope&&(this.noteContext.viewScope.tocPreviousVisible=o),this.triggerCommand("reEvaluateRightPaneVisibility")}async replaceMathTextWithKatax(t){const e=/<span class="math-tex">\\\(([\s\S]*?)\\\)<\/span>/g;var i=[...t.matchAll(e)];let o=t;if(i.length>0)for(const s of i){let r=s[1],d;try{d=M.renderToString(r,{throwOnError:!1})}catch(l){if(l instanceof ReferenceError&&l.message.includes("katex is not defined"))try{d=M.renderToString(r,{throwOnError:!1})}catch(c){console.error("KaTeX rendering error after loading library:",c),d=s[0]}else console.error("KaTeX rendering error:",l),d=s[0]}o=o.replace(s[0],d)}return o}async getToc(t){const e=/<h(\d+)[^>]*>(.*?)<\/h\1>/gi;let i=$("<ol>"),o=2;const s=[i];let r;this.noteContext?.viewScope?.tocCollapsedHeadings instanceof Set||(this.noteContext.viewScope.tocCollapsedHeadings=new Set);const d=this.noteContext.viewScope.tocCollapsedHeadings,l=new Set;let c=0;for(let h=null,g=0;(h=e.exec(t))!==null;g++){const f=parseInt(h[1]),y=f-o;if(y>0)for(let N=0;N<y;N++){const T=$("<ol>");if(s[s.length-1].append(T),s.push(T),r){const P=`h${f}_${g}_${r?.text().trim()}`;this.setupCollapsibleHeading(T,r,P,d,l)}}else if(y<0)for(let N=0;N<-y&&s.length>1;++N)s.pop();o=f;const B=await this.replaceMathTextWithKatax(h[2]),R=$('<div class="item-content">').html(B),S=$("<li>").append(R).on("click",()=>this.jumpToHeading(g));s[s.length-1].append(S),c=g,r=S}for(const h of d)l.has(h)||d.delete(h);return i=this.pullLeft(i),{$toc:i,headingCount:c}}pullLeft(t){for(;t.children().length===1;){const i=t.children(":first");if(i[0].tagName.toLowerCase()!=="ol")break;t=i}return t}async jumpToHeading(t){if(!this.note||!this.noteContext)return;const e=this.note.type==="doc",i=await this.noteContext.isReadOnly();let o=null;if(i||e)o=await this.noteContext.getContentElement();else{const r=await this.noteContext.getTextEditor();r?.sourceElement&&(o=$(r.sourceElement))}o?.find(":header:not(section.include-note :header)")?.[t]?.scrollIntoView({behavior:"smooth"})}async setupCollapsibleHeading(t,e,i,o,s){if(e&&e.find(".collapse-button").length===0){const r=$('<div class="collapse-button bx bx-chevron-down"></div>');e.prepend(r),o?.has(i)?(e.addClass("collapsed"),s.add(i)):e.removeClass("collapsed"),r.on("click",d=>{if(d.stopPropagation(),e.hasClass("animating"))return;const l=!e.hasClass("collapsed");e.addClass("animating"),l?(t.css("maxHeight",`${t.prop("scrollHeight")}px`),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.css("maxHeight","0px"),r.css("transform","rotate(-90deg)")})}),setTimeout(()=>{t.css("maxHeight",""),e.addClass("collapsed"),e.removeClass("animating")},300)):(e.removeClass("collapsed"),t.css("maxHeight","0px"),requestAnimationFrame(()=>{t.css("maxHeight",`${t.prop("scrollHeight")}px`),r.css("transform","")}),setTimeout(()=>{t.css("maxHeight",""),e.removeClass("animating")},300)),l?o.add(i):o.delete(i)})}}async closeTocCommand(){this.noteContext?.viewScope&&(this.noteContext.viewScope.tocTemporarilyHidden=!0),await this.refresh(),this.triggerCommand("reEvaluateRightPaneVisibility"),u.triggerEvent("reEvaluateTocWidgetVisibility",{noteId:this.noteId})}async showTocWidgetEvent({noteId:t}){this.noteId===t&&(await this.refresh(),this.triggerCommand("reEvaluateRightPaneVisibility"))}async entitiesReloadedEvent({loadResults:t}){this.noteId&&t.isNoteContentReloaded(this.noteId)?await this.refresh():t.getAttributeRows().find(e=>e.type==="label"&&((e.name??"").toLowerCase().includes("readonly")||e.name==="toc")&&b.isAffecting(e,this.note))&&await this.refresh()}}const pn=`<div class="highlights-list-widget">
    <style>
        .highlights-list-widget {
            padding: 10px;
            contain: none;
            overflow: auto;
            position: relative;
        }

        .highlights-list > ol {
            padding-left: 20px;
        }

        .highlights-list li {
            cursor: pointer;
            margin-bottom: 3px;
            text-align: justify;
            word-wrap: break-word;
            hyphens: auto;
        }

        .highlights-list li:hover {
            font-weight: bold;
        }
    </style>

    <span class="highlights-list"></span>
</div>`;class un extends Wt{$highlightsList;get widgetTitle(){return n("highlights_list_2.title")}get widgetButtons(){return[new E().icon("bx-cog").title(n("highlights_list_2.options")).titlePlacement("left").onClick(()=>u.tabManager.openContextWithNote("_optionsTextNotes",{activate:!0})).class("icon-action"),new E().icon("bx-x").titlePlacement("left").onClick(t=>t.triggerCommand("closeHlt")).class("icon-action")]}isEnabled(){return super.isEnabled()&&this.note!=null&&this.note.type==="text"&&!this.noteContext?.viewScope?.highlightsListTemporarilyHidden&&this.noteContext?.viewScope?.viewMode==="default"}async doRenderBody(){this.$body.empty().append($(pn)),this.$highlightsList=this.$body.find(".highlights-list")}async refreshWithNote(t){this.noteContext?.viewScope?.highlightsListPreviousVisible?this.toggleInt(!0):this.toggleInt(!1);const e=JSON.parse(v.get("highlightsList"));if(t?.isLabelTruthy("hideHighlightWidget")||!e.length){this.toggleInt(!1),this.triggerCommand("reEvaluateRightPaneVisibility");return}let i=null,o=-1;if(t&&this.note?.type==="text"){const s=await t.getNoteComplement();s&&"content"in s&&({$highlightsList:i,hlLiCount:o}=await this.getHighlightList(s.content,e))}this.$highlightsList.empty(),i&&this.$highlightsList.append(i),o>0?(this.toggleInt(!0),this.noteContext?.viewScope&&(this.noteContext.viewScope.highlightsListPreviousVisible=!0)):(this.toggleInt(!1),this.noteContext?.viewScope&&(this.noteContext.viewScope.highlightsListPreviousVisible=!1)),this.triggerCommand("reEvaluateRightPaneVisibility")}extractOuterTag(t){if(t===null)return null;const e=/^<([a-zA-Z]+)([^>]*)>/,i=t.match(e);if(i){const o=i[1].toLowerCase(),s=i[2].trim();return{tagName:o,attributes:s}}return null}areOuterTagsConsistent(t,e){const i=this.extractOuterTag(t),o=this.extractOuterTag(e);return!i||!o?!1:i.tagName===o.tagName&&i.attributes===o.attributes}async replaceMathTextWithKatax(t){const e=/<span class="math-tex">\\\(([\s\S]*?)\\\)<\/span>/g;var i=[...t.matchAll(e)];let o=t;if(i.length>0)for(const s of i){let r=s[1],d;try{d=M.renderToString(r,{throwOnError:!1})}catch(l){if(l instanceof ReferenceError&&l.message.includes("katex is not defined"))try{d=M.renderToString(r,{throwOnError:!1})}catch(c){console.error("KaTeX rendering error after loading library:",c),d=s[0]}else console.error("KaTeX rendering error:",l),d=s[0]}o=o.replace(s[0],d)}return o}async getHighlightList(t,e){const i=/<span[^>]*style\s*=\s*[^>]*background-color:[^>]*?>[\s\S]*?<\/span>/gi,o=/<span[^>]*style\s*=\s*[^>]*[^-]color:[^>]*?>[\s\S]*?<\/span>/gi,s=/(<i>[\s\S]*?<\/i>|<em>[\s\S]*?<\/em>)/gi,r=/<strong>[\s\S]*?<\/strong>/gi,d=/<u>[\s\S]*?<\/u>/g;let l="",c="";e.includes("bgColor")&&(l+=',span[style*="background-color"]:not(section.include-note span[style*="background-color"])',c+=`|${i.source}`),e.includes("color")&&(l+=',span[style*="color"]:not(section.include-note span[style*="color"])',c+=`|${o.source}`),e.includes("italic")&&(l+=",i:not(section.include-note i)",l+=",em:not(section.include-note em)",c+=`|${s.source}`),e.includes("bold")&&(l+=",strong:not(section.include-note strong)",c+=`|${r.source}`),e.includes("underline")&&(l+=",u:not(section.include-note u)",c+=`|${d.source}`),l=l.substring(1),c="("+c.substring(1)+")";const h=new RegExp(c,"gi"),g=$("<ol>");let f=-1,y=0,B=null;const R=/^<span class="math-tex">\\\([^\)]*?\)<\/span>(?:<span class="math-tex">\\\([^\)]*?\)<\/span>)*$/;for(let S=null,N=0;(S=h.exec(t))!==null;N++){const T=S[0],P=S.index,zt=h.lastIndex;if(!T.startsWith('<strong><a href="#fnref')){if(f!==-1&&P===f)g.children().last().append(T);else if($(T).text().trim()){const tt=t.substring(f,P);if(this.areOuterTagsConsistent(B,T)&&R.test(tt)){const et=g.children("li").last();et.append(await this.replaceMathTextWithKatax(tt)),et.append(T)}else g.append($("<li>").html(T).on("click",()=>this.jumpToHighlightsList(l,N)));y++}else continue;f=zt,B=T}}return{$highlightsList:g,hlLiCount:y,findSubStr:l}}async jumpToHighlightsList(t,e){if(!this.noteContext)return;const i=await this.noteContext.isReadOnly();let o;if(i)o=(await this.noteContext.getContentElement()).find(t).filter(function(){if(t.indexOf("color")>=0&&t.indexOf("background-color")<0){let r=this.style.color;return!($(this).prop("tagName")==="SPAN"&&r==="")}else return!0}).filter(function(){const r=$(this);return r.parent(t).length===0&&r.parent().parent(t).length===0&&r.parent().parent().parent(t).length===0&&r.parent().parent().parent().parent(t).length===0});else{const r=(await this.noteContext.getTextEditor())?.editing.view.domRoots.values().next().value;r&&(o=$(r).find(t).filter(function(){const d=$(this);if(t.indexOf("color")>=0&&t.indexOf("background-color")<0){let l=this.style.color;return!(d.prop("tagName")==="SPAN"&&l==="")}else return!0}).filter(function(){const d=$(this);return d.parent(t).length===0&&d.parent().parent(t).length===0&&d.parent().parent().parent(t).length===0&&d.parent().parent().parent().parent(t).length===0}))}o&&o[e]?o[e].scrollIntoView({behavior:"smooth",block:"center"}):console.warn("Unable to find the target element in the highlights list.")}async closeHltCommand(){this.noteContext?.viewScope&&(this.noteContext.viewScope.highlightsListTemporarilyHidden=!0),await this.refresh(),this.triggerCommand("reEvaluateRightPaneVisibility"),u.triggerEvent("reEvaluateHighlightsListWidgetVisibility",{noteId:this.noteId})}async showHighlightsListWidgetEvent({noteId:t}){this.noteId===t&&(await this.refresh(),this.triggerCommand("reEvaluateRightPaneVisibility"))}async entitiesReloadedEvent({loadResults:t}){this.noteId&&t.isNoteContentReloaded(this.noteId)?await this.refresh():t.getAttributeRows().find(e=>e.type==="label"&&(e.name?.toLowerCase().includes("readonly")||e.name==="hideHighlightWidget")&&b.isAffecting(e,this.note))&&await this.refresh()}}function gn(){const[a,t]=A(!1);return St("showPasswordNotSet",()=>t(!0)),I(At,{size:"md",className:"password-not-set-dialog",title:n("password_not_set.title"),footer:I(Rt,{icon:"bx bx-lock",text:n("password_not_set.go_to_password_options"),onClick:()=>{t(!1),u.triggerCommand("showOptions",{section:"_optionsPassword"})}}),onHidden:()=>t(!1),show:a,children:[I("p",{children:n("password_not_set.body1")}),I("p",{children:n("password_not_set.body2")})]})}class bn extends Et{get component(){return I(gn,{})}}class fn extends Nt{constructor(){super(),this.icon("bx-history").title(n("revisions_button.note_revisions")).command("showRevisions").titlePlacement("bottom").class("icon-action")}isEnabled(){return super.isEnabled()&&!["launcher","doc"].includes(this.note?.type??"")}}const mn=`
<div class="code-buttons-widget">
    <style>
        .code-buttons-widget {
            display: flex;
            gap: 10px;
        }
    </style>

    <button data-trigger-command="runActiveNote" class="execute-button floating-button btn" title="${n("code_buttons.execute_button_title")}">
        <span class="bx bx-play"></span>
    </button>

    <button class="trilium-api-docs-button floating-button btn" title="${n("code_buttons.trilium_api_docs_button_title")}">
        <span class="bx bx-help-circle"></span>
    </button>

    <button class="save-to-note-button floating-button btn" title="${n("code_buttons.save_to_note_button_title")}">
        <span class="bx bx-save"></span>
    </button>
</div>`;class wn extends p{$openTriliumApiDocsButton;$executeButton;$saveToNoteButton;isEnabled(){return super.isEnabled()&&this.note&&(this.note.mime.startsWith("application/javascript")||this.note.mime==="text/x-sqlite;schema=trilium")}doRender(){this.$widget=$(mn),this.$openTriliumApiDocsButton=this.$widget.find(".trilium-api-docs-button"),this.$openTriliumApiDocsButton.on("click",()=>{k.showMessage(n("code_buttons.opening_api_docs_message")),this.note?.mime.endsWith("frontend")?window.open("https://triliumnext.github.io/Notes/Script%20API/interfaces/Frontend_Script_API.Api.html","_blank"):window.open("https://triliumnext.github.io/Notes/Script%20API/interfaces/Backend_Script_API.Api.html","_blank")}),this.$executeButton=this.$widget.find(".execute-button"),this.$saveToNoteButton=this.$widget.find(".save-to-note-button"),this.$saveToNoteButton.on("click",async()=>{const{notePath:t}=await m.post("special-notes/save-sql-console",{sqlConsoleNoteId:this.noteId});await L.waitForMaxKnownEntityChangeId(),await u.tabManager.getActiveContext()?.setNote(t),k.showMessage(n("code_buttons.sql_console_saved_message",{notePath:await q.getNotePathTitle(t)}))}),J.updateDisplayedShortcuts(this.$widget),this.contentSized(),super.doRender()}async refreshWithNote(t){this.$executeButton.toggle(t.mime.startsWith("application/javascript")||t.mime==="text/x-sqlite;schema=trilium"),this.$saveToNoteButton.toggle(t.mime==="text/x-sqlite;schema=trilium"&&t.isHiddenCompletely()),this.$openTriliumApiDocsButton.toggle(t.mime.startsWith("application/javascript;env="))}async noteTypeMimeChangedEvent({noteId:t}){this.isNote(t)&&await this.refresh()}}const xn=`
<div class="api-log-widget">
    <style>
    .api-log-widget {
        padding: 15px;
        flex-grow: 1;
        max-height: 40%;
        position: relative;
    }

    .hidden-api-log {
        display: none;
    }

    .api-log-container {
        overflow: auto;
        height: 100%;
    }

    .close-api-log-button {
        padding: 5px;
        border: 1px solid var(--button-border-color);
        background-color: var(--button-background-color);
        border-radius: var(--button-border-radius);
        color: var(--button-text-color);
        position: absolute;
        top: 10px;
        right: 40px;
        cursor: pointer;
    }
    </style>

    <div class="bx bx-x close-api-log-button" title="${n("api_log.close")}"></div>

    <div class="api-log-container"></div>
</div>`;class $n extends p{$logContainer;$closeButton;isEnabled(){return!!this.note&&this.note.mime.startsWith("application/javascript;env=")&&super.isEnabled()}doRender(){this.$widget=$(xn),this.toggle(!1),this.$logContainer=this.$widget.find(".api-log-container"),this.$closeButton=this.$widget.find(".close-api-log-button"),this.$closeButton.on("click",()=>this.toggle(!1))}async refreshWithNote(t){this.$logContainer.empty()}apiLogMessagesEvent({messages:t,noteId:e}){if(this.isNote(e)){this.toggle(!0);for(const i of t)this.$logContainer.append(i).append($("<br>"))}}toggle(t){this.$widget.toggleClass("hidden-api-log",!t)}}const vn=`
<div class="script-runner-widget">
    <style>
        .script-runner-widget {
            padding: 12px;
            color: var(--muted-text-color);
        }

        .execute-description {
            margin-bottom: 10px;
        }
    </style>

    <div class="execute-description"></div>

    <div style="display: flex; justify-content: space-around">
        <button data-trigger-command="runActiveNote" class="execute-button btn btn-sm"></button>
    </div>
</div>`;class yn extends p{$executeButton;$executeDescription;isEnabled(){return super.isEnabled()&&this.note&&(this.note.mime.startsWith("application/javascript")||this.isTriliumSqlite())&&(this.note.hasLabel("executeDescription")||this.note.hasLabel("executeButton"))}isTriliumSqlite(){return this.note?.mime==="text/x-sqlite;schema=trilium"}getTitle(){return{show:this.isEnabled(),activate:!0,title:this.isTriliumSqlite()?n("script_executor.query"):n("script_executor.script"),icon:"bx bx-play"}}doRender(){this.$widget=$(vn),this.contentSized(),this.$executeButton=this.$widget.find(".execute-button"),this.$executeDescription=this.$widget.find(".execute-description")}async refreshWithNote(t){const e=t.getLabelValue("executeButton")||(this.isTriliumSqlite()?n("script_executor.execute_query"):n("script_executor.execute_script"));this.$executeButton.text(e),this.$executeButton.attr("title",e),J.updateDisplayedShortcuts(this.$widget);const i=t.getLabelValue("executeDescription");i?this.$executeDescription.show().html(i):this.$executeDescription.empty().hide()}}class yt extends E{isMovingLeft;constructor(t){super(),this.isMovingLeft=t,this.icon(t?"bx-chevron-left":"bx-chevron-right").title(t?n("move_pane_button.move_left"):n("move_pane_button.move_right")).titlePlacement("bottom").onClick(async(e,i)=>{i.stopPropagation(),e.triggerCommand("moveThisNoteSplit",{ntxId:e.getClosestNtxId(),isMovingLeft:this.isMovingLeft})}).class("icon-action")}isEnabled(){if(!super.isEnabled())return!1;if(this.isMovingLeft)return!!this.noteContext?.mainNtxId;{const t=u.tabManager.noteContexts.findIndex(i=>i.ntxId===this.ntxId);return!!u.tabManager.noteContexts[t+1]?.mainNtxId}}async noteContextRemovedEvent(){this.refresh()}async newNoteContextCreatedEvent(){this.refresh()}async noteContextReorderEvent(){this.refresh()}async contextsReopenedEvent(){this.refresh()}}function _n(){const[a,t]=A(),[e,i]=A(null),[o,s]=A(v.is("compressImages")),[r,d]=A(!1),[l,c]=A(void 0),[h,g]=A(!1);return St("showUploadAttachmentsDialog",({noteId:f})=>{t(f),g(!0)}),a&&Ut(()=>{q.getNoteTitle(a).then(f=>c(n("upload_attachments.files_will_be_uploaded",{noteTitle:f})))},[a]),I(At,{className:"upload-attachments-dialog",size:"lg",title:n("upload_attachments.upload_attachments_to_note"),footer:I(Rt,{text:n("upload_attachments.upload"),primary:!0,disabled:!e||r}),onSubmit:async()=>{if(!e||!a)return;d(!0);const f=Array.from(e);await Gt.uploadFiles("attachments",a,f,{shrinkImages:o}),d(!1),g(!1)},onHidden:()=>g(!1),show:h,children:[I(ot,{name:"files",label:n("upload_attachments.choose_files"),description:l,children:I(jt,{onChange:i,multiple:!0})}),I(ot,{name:"shrink-images",label:n("upload_attachments.options"),children:I(Kt,{hint:n("upload_attachments.tooltip"),label:n("upload_attachments.shrink_images"),currentValue:o,onChange:s})})]})}class Cn extends Et{get component(){return I(_n,{})}}const In=`
<button type="button"
        class="copy-image-reference-button"
        title="${n("copy_image_reference_button.button_title")}">
        <span class="bx bx-copy"></span>

        <div class="hidden-image-copy"></div>
</button>`;class Tn extends p{$hiddenImageCopy;isEnabled(){return super.isEnabled()&&["mermaid","canvas","mindMap"].includes(this.note?.type??"")&&this.note?.isContentAvailable()&&this.noteContext?.viewScope?.viewMode==="default"}doRender(){super.doRender(),this.$widget=$(In),this.$hiddenImageCopy=this.$widget.find(".hidden-image-copy"),this.$widget.on("click",()=>{this.note&&(this.$hiddenImageCopy.empty().append($("<img>").attr("src",w.createImageSrcUrl(this.note))),Ie.copyImageReferenceToClipboard(this.$hiddenImageCopy),this.$hiddenImageCopy.empty())}),this.contentSized()}}const Nn='<div class="scroll-padding-widget"></div>';class kn extends p{$scrollingContainer;isEnabled(){return super.isEnabled()&&["text","code"].includes(this.note?.type??"")}doRender(){this.$widget=$(Nn),this.contentSized(),this.$widget.on("click",()=>this.triggerCommand("scrollToEnd",{ntxId:this.ntxId}))}initialRenderCompleteEvent(){this.$scrollingContainer=this.$widget.closest(".scrolling-container"),new ResizeObserver(()=>this.refreshHeight()).observe(this.$scrollingContainer[0]),this.refreshHeight()}refreshHeight(){const t=this.$scrollingContainer.height();this.$widget.css("height",Math.round((t??0)/2))}}const En=`<div class="geo-map-buttons">
    <style>
        .geo-map-buttons {
            contain: none;
            display: flex;
            gap: 10px;
        }

        .leaflet-pane {
            z-index: 50;
        }
    </style>

    <button type="button"
        class="geo-map-create-child-note floating-button btn bx bx-plus-circle"
        title="${n("geo-map.create-child-note-title")}" />
</div>`;class Sn extends p{isEnabled(){return super.isEnabled()&&this.note?.getLabelValue("viewType")==="geoMap"&&!this.note.hasLabel("readOnly")}doRender(){super.doRender(),this.$widget=$(En),this.$widget.find(".geo-map-create-child-note").on("click",()=>this.triggerEvent("geoMapCreateChildNote",{ntxId:this.ntxId}))}}const Rn=`
<button class="open-contextual-help-button" title="${n("help-button.title")}">
    <span class="bx bx-help-circle"></span>
</button>
`,_t={canvas:null,code:null,contentWidget:null,doc:null,file:null,image:null,launcher:null,mermaid:null,mindMap:null,noteMap:null,relationMap:null,render:null,search:null,text:null,webView:null,aiChat:null},An={list:"mULW0Q3VojwY",grid:"8QqnMzx393bx",calendar:"xWbu3jpNWapp",table:"2FvYrpmOXm29",geoMap:"81SGnPGMk7Xc",board:"CtBQqbwXDx1w"};class F extends p{isEnabled(){return super.isEnabled()?!!F.#t(this.note):!1}doRender(){this.$widget=$(Rn)}static#t(t){if(t&&t.type!=="book"&&_t[t.type])return _t[t.type];if(t?.hasLabel("calendarRoot"))return"l0tKav7yLHGF";if(t?.hasLabel("textSnippet"))return"pwc194wlRzcH";if(t&&t.type==="book")return An[t.getAttributeValue("label","viewType")??""]}async refreshWithNote(t){this.$widget.attr("data-in-app-help",F.#t(this.note)??"")}entitiesReloadedEvent({loadResults:t}){this.note?.type==="book"&&t.getAttributeRows().find(e=>e.noteId===this.noteId&&e.name==="viewType")&&this.refresh()}}const Bn=`
<button type="button"
    class="switch-layout-button">
    <span class="bx"></span>
</button>
`;class Ln extends p{isEnabled(){return super.isEnabled()&&["mermaid"].includes(this.note?.type??"")&&this.note?.isContentAvailable()&&!this.note?.hasLabel("readOnly")&&this.noteContext?.viewScope?.viewMode==="default"}doRender(){super.doRender(),this.$widget=$(Bn),this.$widget.on("click",()=>{const t=v.get("splitEditorOrientation");v.save("splitEditorOrientation",Ct(t))}),this.#t(),this.contentSized()}#t(){const t=v.get("splitEditorOrientation"),e=Ct(t);this.$widget.find("span.bx").toggleClass("bxs-dock-bottom",e==="vertical").toggleClass("bxs-dock-left",e==="horizontal"),e==="vertical"?this.$widget.attr("title",n("switch_layout_button.title_vertical")):this.$widget.attr("title",n("switch_layout_button.title_horizontal"))}entitiesReloadedEvent({loadResults:t}){t.isOptionReloaded("splitEditorOrientation")&&this.#t()}}function Ct(a){return a==="horizontal"?"vertical":"horizontal"}class Wn extends E{isReadOnly;constructor(){super(),this.title(()=>this.isReadOnly?n("toggle_read_only_button.unlock-editing"):n("toggle_read_only_button.lock-editing")).titlePlacement("bottom").icon(()=>this.isReadOnly?"bx-lock-open-alt":"bx-lock-alt").onClick(()=>this.#t())}#t(){!this.noteId||!this.note||(this.isReadOnly?b.removeOwnedLabelByName(this.note,"readOnly"):b.setLabel(this.noteId,"readOnly"))}async refreshWithNote(t){const e=!!t?.hasLabel("readOnly");e!==this.isReadOnly&&(this.isReadOnly=e,this.refreshIcon())}isEnabled(){return!super.isEnabled()||!this?.note?.isContentAvailable()||this.noteContext?.viewScope?.viewMode!=="default"?!1:this.note.type==="mermaid"||this.note.getLabelValue("viewType")==="geoMap"}}const Pn=`
<button type="button"
        class="export-svg-button"
        title="${n("png_export_button.button_title")}">
        <span class="bx bxs-file-png"></span>
</button>
`;class On extends p{isEnabled(){return super.isEnabled()&&["mermaid","mindMap"].includes(this.note?.type??"")&&this.note?.isContentAvailable()&&this.noteContext?.viewScope?.viewMode==="default"}doRender(){super.doRender(),this.$widget=$(Pn),this.$widget.on("click",()=>this.triggerEvent("exportPng",{ntxId:this.ntxId})),this.contentSized()}}class to{customWidgets;constructor(t){this.customWidgets=t}getRootWidget(t){t.noteTreeWidget=new Yt;const e=v.get("layoutOrientation")==="horizontal",i=this.#t(e),o=w.isElectron(),s=window.glob.platform==="darwin",r=window.glob.platform==="win32",d=window.glob.hasNativeTitleBar,l=e||o&&!d&&s,c=!d&&!s&&!r,h=new Xt(!0).setParent(t).class((e?"horizontal":"vertical")+"-layout").optChild(l,new _("row").class("tab-row-container").child(new _("row").id("tab-row-left-spacer")).optChild(e,new ft(!0)).child(new st().class("full-width")).optChild(c,new pt).css("height","40px").css("background-color","var(--launcher-pane-background-color)").setParent(t)).optChild(e,i).child(new _("row").css("flex-grow","1").id("horizontal-main-container").optChild(!e,i).child(new Se().optChild(!e,new Qt).child(t.noteTreeWidget).child(...this.customWidgets.get("left-pane"))).child(new _("column").id("rest-pane").css("flex-grow","1").optChild(!l,new _("row").child(new st).optChild(c,new pt).css("height","40px")).child(new _("row").filling().collapsible().id("vertical-main-container").child(new _("column").filling().collapsible().id("center-pane").child(new Ci(()=>new nn().child(new _("row").class("title-row").css("height","50px").css("min-height","50px").css("align-items","center").cssBlock(".title-row > * { margin: 5px; }").child(new Jt).child(new Zt).child(new te(0,1)).child(new yt(!0)).child(new yt(!1)).child(new Ti).child(new Ii)).child(new He().ribbon(new ee).ribbon(new yn).ribbon(new di).ribbon(new Zi).ribbon(new qi).ribbon(new fi).ribbon(new ie).ribbon(new gi).ribbon(new Mi).ribbon(new De).ribbon(new qe).ribbon(new Gi).ribbon(new ji).ribbon(new Xi).ribbon(new Fi).button(new fn).button(new ze)).child(new ne).child(new _i).child(new oe().child(new se).child(new Ln).child(new Wn).child(new ae).child(new tn).child(new en).child(new wn).child(new re).child(new Sn).child(new Tn).child(new de).child(new On).child(new le).child(new F).child(new ce)).child(new he().filling().child(new pe).child(new pi).child(new ue).child(new ge(!1)).child(new wi).child(new ci).child(new kn)).child(new $n).child(new ln).child(...this.customWidgets.get("node-detail-pane"),...this.customWidgets.get("note-detail-pane")))).child(...this.customWidgets.get("center-pane"))).child(new Qi().child(new hn).child(new un).child(...this.customWidgets.get("right-pane")))))).child(new be).child(new bn).child(new Cn);return fe(h),h}#t(t){let e;return t?e=new _("row").css("height","53px").class("horizontal").child(new at(!0)).child(new rt(!0)):e=new _("column").css("width","53px").class("vertical").child(new rt(!1)).child(new at(!1)).child(new ft(!1)),e.id("launcher-pane"),e}}export{to as default};
