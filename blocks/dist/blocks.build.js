!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1),n(3);function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function r(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function a(e,t){return(a=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var u=wp.i18n.__,p=wp.blocks.registerBlockType,c=wp.components,b=c.SelectControl,m=c.ToggleControl,h=(c.TextControl,wp.element.Component),f=wp.editor,g=f.RichText,d=(f.BlockControls,function(e){function t(){var e,n,i;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),n=this,(e=!(i=l(t).apply(this,arguments))||"object"!==o(i)&&"function"!=typeof i?s(n):i).state=e.constructor.getInitialState(e.props.attributes.selectedPost),e.getOptions=e.getOptions.bind(s(e)),e.getOptions(),e.onChangeTitlePrefix=e.onChangeTitlePrefix.bind(s(e)),e.onChangeTagline=e.onChangeTagline.bind(s(e)),e.onChangeSelectPost=e.onChangeSelectPost.bind(s(e)),e.onChangeFlexDirection=e.onChangeFlexDirection.bind(s(e)),e.onChangeCustomLabel=e.onChangeCustomLabel.bind(s(e)),e.onChangeCustomBlurb=e.onChangeCustomBlurb.bind(s(e)),e.onChangeButtonsLabel=e.onChangeButtonsLabel.bind(s(e)),e.onChangeAddPrefix=e.onChangeAddPrefix.bind(s(e)),e.getTitlePrefixToggle=e.getTitlePrefixToggle.bind(s(e)),e.getTagline=e.getTagline.bind(s(e)),e.getPreviewBlurb=e.getPreviewBlurb.bind(s(e)),e.getCoverToggle=e.getCoverToggle.bind(s(e)),e.getButtonsLabel=e.getButtonsLabel.bind(s(e)),e.getButtons=e.getButtons.bind(s(e)),e.getButtonSegment=e.getButtonSegment.bind(s(e)),e.getBookMedia=e.getBookMedia.bind(s(e)),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&a(e,t)}(t,h),r(t,null,[{key:"getInitialState",value:function(e){return{posts:[],selectedPost:e,post:{}}}}]),r(t,[{key:"onChangeSelectPost",value:function(e){var t=this.state.posts.find(function(t){return t.id==parseInt(e)});this.setState({selectedPost:parseInt(e),post:t});var n=t.mbt_book_teaser[0],o=t.excerpt.rendered,l=t.mbt_sample_audio[0],s=t.mbt_unique_id_asin[0],i=t.mbt_buybuttons[0],r=t.mbt_style_url,a=t.mbt_book_image_id[0];this.getBookMedia(a),this.props.setAttributes({selectedPost:parseInt(e),title:t.title.rendered,link:t.link,buylinks:i,tagline:n,blurb:o,audioSample:l,bookSample:s,customLabel:!1,buttonsLabel:"Now Available From",titlePrefix:"",styleURL:r,customBlurb:o,customTagline:n})}},{key:"getBookMedia",value:function(e){var t=this;new wp.media.model.Attachment.get(e).fetch().then(function(e){t.props.setAttributes({cover:e.url})})}},{key:"onChangeTitlePrefix",value:function(e){this.props.setAttributes({titlePrefix:e})}},{key:"onChangeCustomBlurb",value:function(e){this.props.setAttributes({customBlurb:e})}},{key:"onChangeTagline",value:function(e){this.props.setAttributes({customTagline:e})}},{key:"onChangeButtonsLabel",value:function(e){this.props.setAttributes({buttonsLabel:e})}},{key:"onChangeFlexDirection",value:function(){this.props.attributes.flexReverse?this.props.setAttributes({flexReverse:!1,flexClass:"flex-row"}):this.props.setAttributes({flexReverse:!0,flexClass:"flex-row-reverse"})}},{key:"onChangeCustomLabel",value:function(){this.props.attributes.customLabel?this.props.setAttributes({customLabel:!1,buttonsLabel:"Now Available From"}):this.props.setAttributes({customLabel:!0,buttonsLabel:this.props.attributes.buttonsLabel})}},{key:"onChangeAddPrefix",value:function(){this.props.attributes.addTitlePrefix?this.props.setAttributes({addTitlePrefix:!1}):this.props.setAttributes({addTitlePrefix:!0})}},{key:"getButtonsLabel",value:function(){return this.props.attributes.buylinks&&this.props.attributes.customLabel?wp.element.createElement(g,{tagName:"h4",placeholder:"Now Available From",className:"buttons-label",value:this.props.attributes.buttonsLabel,onChange:this.onChangeButtonsLabel,keepPlaceholderOnFocus:!0}):wp.element.createElement("h4",{className:"buttons-label noneditable"},this.props.attributes.buttonsLabel)}},{key:"getTagline",value:function(){return wp.element.createElement(g,{tagName:"div",placeholder:"Lorem Ipsum Dolor Sunt...",className:"preview-tagline",value:this.props.attributes.customTagline,onChange:this.onChangeTagline,keepPlaceholderOnFocus:!0})}},{key:"getPreviewBlurb",value:function(){return this.props.attributes.title?wp.element.createElement("div",{class:"preview-blurb"},wp.element.createElement(g,{tagName:"div",multiline:"p",placeholder:"Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue.",className:"custom-blurb",value:this.props.attributes.customBlurb,onChange:this.onChangeCustomBlurb,keepPlaceholderOnFocus:!0})):null}},{key:"getButtons",value:function(){var e=this;return this.props.attributes.buylinks?wp.element.createElement("div",{className:"mbt-book-buybuttons blueprint"},this.props.attributes.buylinks.map(function(t,n){return wp.element.createElement("div",{className:"mbt-book-buybutton"},wp.element.createElement("a",{className:"image-link",href:t.url},wp.element.createElement("img",{className:"image-link",src:e.props.attributes.styleURL+t.store+"_button.png",alt:"buy from "+t.store})))})):null}},{key:"getCoverToggle",value:function(){return this.props.attributes.title&&this.props.attributes.cover?wp.element.createElement(m,{label:"Reverse Cover Position",checked:!!this.props.attributes.flexReverse,onChange:this.onChangeFlexDirection,className:"flex-direction"}):null}},{key:"getButtonSegment",value:function(){return this.props.attributes.title?wp.element.createElement("div",null,wp.element.createElement(m,{label:"Custom Label for Buttons Section",help:"Defaults to 'Now Available From'",checked:!!this.props.attributes.customLabel,onChange:this.onChangeCustomLabel,className:"custom-label"}),wp.element.createElement("div",{className:"buylinks"},wp.element.createElement(this.getButtonsLabel,null),wp.element.createElement(this.getButtons,null))):null}},{key:"getTitlePrefixToggle",value:function(){return this.props.attributes.title?wp.element.createElement("div",{className:"title-prefix-toggle is-flex"},wp.element.createElement(m,{label:"Add Prefix to Title",help:"ie, 'Coming Soon' or 'Just Released', etc.",checked:!!this.props.attributes.addTitlePrefix,onChange:this.onChangeAddPrefix,className:"add-title-prefix"}),this.props.attributes.addTitlePrefix&&wp.element.createElement(g,{tagName:"h4",placeholder:"Coming Soon, etc.",className:"title-prefix",value:this.props.attributes.titlePrefix,onChange:this.onChangeTitlePrefix,keepPlaceholderOnFocus:!0,withoutInteractiveFormatting:!0})):null}},{key:"getOptions",value:function(){var e=this;wp.api.models.Post.extend({urlRoot:wpApiSettings.root+"wp/v2/mbt_book",defaults:{type:"mbt_book"}});(new(wp.api.collections.Posts.extend({url:wpApiSettings.root+"wp/v2/mbt_book"}))).fetch().then(function(t){if(t&&0!==e.state.selectedPost){var n=t.find(function(t){return t.id==e.state.selectedPost});e.setState({post:n,posts:t})}else e.setState({posts:t})})}},{key:"render",value:function(){var e=[{value:0,label:u("Select a Post")}];u("Choose Book");return this.props.className+=" loading",this.state.posts.length>0?this.state.posts.forEach(function(t){e.push({value:t.id,label:t.title.rendered})}):u("No posts found. Please create some first."),void 0!==this.state.post&&this.state.post.hasOwnProperty("title")?(wp.element.createElement("div",{className:"post"},wp.element.createElement("a",{href:this.state.post.link},this.state.post.title.rendered)),this.props.className+=" has-post"):this.props.className+=" no-post",wp.element.createElement("div",{className:this.props.className},wp.element.createElement(b,{onChange:this.onChangeSelectPost,value:this.props.attributes.selectedPost,label:u("Select a Book"),options:e,className:"book-select"}),wp.element.createElement(this.getCoverToggle,null),wp.element.createElement(this.getTitlePrefixToggle,null),wp.element.createElement("div",{className:"block-preview "},wp.element.createElement("h2",{className:"preview-title is-flex"},this.props.attributes.titlePrefix&&this.props.attributes.addTitlePrefix&&wp.element.createElement("span",{className:"title-prefix"},this.props.attributes.titlePrefix," "),wp.element.createElement("span",{className:"title"},this.props.attributes.title)),wp.element.createElement("div",{className:"inner-preview is-flex "+this.props.attributes.flexClass},wp.element.createElement("div",{className:"preview-left"},this.props.attributes.cover&&wp.element.createElement("img",{src:this.props.attributes.cover,className:"preview-cover"}),wp.element.createElement("div",{className:"cover-links"},this.props.attributes.bookSample&&wp.element.createElement("span",null,"View Book Sample"),this.props.attributes.bookSample&&this.props.attributes.audioSample&&wp.element.createElement("span",{className:"divider"}," | "),this.props.attributes.audioSample&&wp.element.createElement("span",null,"Hear Audiobook Sample"))),wp.element.createElement("div",{className:"preview-right"},wp.element.createElement("div",{className:"preview-right-top"},wp.element.createElement(this.getTagline,null),wp.element.createElement(this.getPreviewBlurb,null)),wp.element.createElement(this.getButtonSegment,null)))))}}]),t}());p("blueprint-blocks/mbt-book",{title:u("Book Preview"),icon:"book",category:"common",keywords:[u("blueprint-blocks — mbt-book"),u("Book")],attributes:{addTitlePrefix:{type:"boolean",default:!1},audioSample:{type:"string",default:""},blurb:{type:"string"},bookSample:{type:"string",default:""},buttonsLabel:{type:"string",default:"Now Available From"},buylinks:{type:"array"},cover:{type:"string"},customBlurb:{type:"string"},customButton:{type:"boolean",default:!1},customLabel:{type:"boolean",default:!1},customTagline:{type:"string"},flexClass:{type:"string",default:"flex-row"},flexReverse:{type:"boolean",default:!1},link:{type:"string",selector:"a"},selectedPost:{type:"number",default:null},styleURL:{type:"string"},tagline:{type:"string"},title:{type:"string"},titlePrefix:{type:"string"}},edit:d,save:function(e){return null}})},function(e,t){},,function(e,t){}]);