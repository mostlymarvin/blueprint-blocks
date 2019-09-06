!function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);o(1),o(2),o(3),o(4),o(5),o(6)},function(e,t,o){e.exports=o.p+"blocks.style.build.css"},function(e,t,o){e.exports=o.p+"blocks.editor.build.css"},function(e,t,o){e.exports=o.p+"blocks.buttons.build.css"},function(e,t){var o=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}();var n=wp.i18n.__,s=wp.blocks.registerBlockType,r=wp.components,l=r.SelectControl,i=r.ToggleControl,a=r.TextControl,p=(r.Panel,r.PanelBody),u=r.PanelRow,c=wp.element,h=c.Component,b=(c.Fragment,wp.editor),m=b.RichText,d=b.InspectorControls,k=b.PanelColorSettings,g=(b.getColorClassName,function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state=e.constructor.getInitialState(e.props.attributes.selectedPost),e.getBlueprintApi=e.getBlueprintApi.bind(e),e.getBlueprintApi(),e.getOptions=e.getOptions.bind(e),e.getOptions(),e.getInspectorControls=e.getInspectorControls.bind(e),e.getBlockSettings=e.getBlockSettings.bind(e),e.getBookMedia=e.getBookMedia.bind(e),e.updateDisplaySettings=e.updateDisplaySettings.bind(e),e.onChangeBGColor=e.onChangeBGColor.bind(e),e.onChangeBlurb=e.onChangeBlurb.bind(e),e.onChangeButtonsLabel=e.onChangeButtonsLabel.bind(e),e.onChangeFlexDirection=e.onChangeFlexDirection.bind(e),e.onChangeReadMoreLink=e.onChangeReadMoreLink.bind(e),e.onChangeReadMoreLinkBGColor=e.onChangeReadMoreLinkBGColor.bind(e),e.onChangeReadMoreLinkColor=e.onChangeReadMoreLinkColor.bind(e),e.onChangeReadMoreText=e.onChangeReadMoreText.bind(e),e.onChangeSelectBook=e.onChangeSelectBook.bind(e),e.onChangeShowBuyLinks=e.onChangeShowBuyLinks.bind(e),e.onChangeShowReadMore=e.onChangeShowReadMore.bind(e),e.onChangeShowSampleLinks=e.onChangeShowSampleLinks.bind(e),e.onChangeTagline=e.onChangeTagline.bind(e),e.onChangeTextColor=e.onChangeTextColor.bind(e),e.onChangeTitlePrefix=e.onChangeTitlePrefix.bind(e),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,h),o(t,null,[{key:"getInitialState",value:function(e){return{posts:[],selectedPost:e,post:{}}}}]),o(t,[{key:"getBlueprintApi",value:function(){var e=this;wp.api.models.Status.extend({urlRoot:wpApiSettings.root+"blueprint-mmk/v1/blueprint",defaults:{type:"blueprint"}});(new(wp.api.collections.Statuses.extend({url:wpApiSettings.root+"blueprint-mmk/v1/blueprint"}))).fetch().then(function(t){e.props.setAttributes({mbtActive:t.mbt_active})})}},{key:"getOptions",value:function(){var e=this;wp.api.models.Post.extend({urlRoot:wpApiSettings.root+"wp/v2/mbt_book",defaults:{type:"mbt_book"}});(new(wp.api.collections.Posts.extend({url:wpApiSettings.root+"wp/v2/mbt_book"}))).fetch().then(function(t){if(t&&0!==e.state.selectedPost){var o=t.find(function(t){return t.id==e.state.selectedPost});e.setState({post:o,posts:t})}else e.setState({posts:t})})}},{key:"getBookMedia",value:function(e){var t=this;new wp.media.model.Attachment.get(e).fetch().then(function(e){t.props.setAttributes({cover:e.url})})}},{key:"getInspectorControls",value:function(e){return wp.element.createElement("div",null,wp.element.createElement(d,null,wp.element.createElement(k,{title:n("Colors","blueprint-blocks"),initialOpen:!1,colorSettings:[{value:this.props.attributes.colorText,onChange:this.onChangeTextColor,label:n("Text Color","blueprint-blocks")},{value:this.props.attributes.colorBG,onChange:this.onChangeBGColor,label:n("Background Color","blueprint-blocks")},{value:this.props.attributes.colorReadMoreLinkBG,onChange:this.onChangeReadMoreLinkBGColor,label:n("Read More Button Background Color","blueprint-blocks")},{value:this.props.attributes.colorReadMoreLink,onChange:this.onChangeReadMoreLinkColor,label:n("Read More Button Text Color","blueprint-blocks")}]}),wp.element.createElement(p,{title:"Book Settings",initialOpen:!0,className:"blueprint-panel-body"},wp.element.createElement(u,{className:"book-select"},wp.element.createElement(l,{onChange:this.onChangeSelectBook,value:this.props.attributes.selectedPost,label:n("Select a Book"),options:e,className:"book-select"})),this.props.attributes.cover&&wp.element.createElement(u,null,wp.element.createElement(i,{label:"Reverse Cover Position",help:"Default displays cover to left",checked:!!this.props.attributes.flexReverse,onChange:this.onChangeFlexDirection,className:"flex-direction"})),wp.element.createElement(u,{className:"display-block"},wp.element.createElement(i,{label:"Show Book Sample Links?",help:"By default, shows audiobook and book sample links under the cover, if the links are available.",checked:!!this.props.attributes.showSampleLinks,onChange:this.onChangeShowSampleLinks})),wp.element.createElement(u,{className:"display-block"},wp.element.createElement(a,{label:"Add Prefix to Title",help:"ie, 'Coming Soon' or 'Just Released', etc.",placeholder:"Coming Soon, etc.",value:this.props.attributes.titlePrefix,onChange:this.onChangeTitlePrefix,keepPlaceholderOnFocus:!0})),wp.element.createElement(u,{className:"display-block"},wp.element.createElement(i,{label:"Show Buy Links?",checked:!!this.props.attributes.showBuyLinks,onChange:this.onChangeShowBuyLinks}),this.props.attributes.showBuyLinks&&wp.element.createElement(a,{placeholder:"Now Available From",label:"Buy Link Section Label",value:this.props.attributes.buttonsLabel,onChange:this.onChangeButtonsLabel,keepPlaceholderOnFocus:!0})),wp.element.createElement(u,{className:"display-block"},wp.element.createElement(i,{label:"Show 'Read More' Link?",checked:!!this.props.attributes.showReadMore,onChange:this.onChangeShowReadMore}),this.props.attributes.showReadMore&&wp.element.createElement(u,{className:"display-block"},wp.element.createElement(a,{placeholder:"Read More",value:this.props.attributes.readMoreText,onChange:this.onChangeReadMoreText,keepPlaceholderOnFocus:!0}),wp.element.createElement(a,{placeholder:this.props.attributes.link,value:this.props.attributes.readMoreLink,onChange:this.onChangeReadMoreLink,keepPlaceholderOnFocus:!0}))))))}},{key:"getBlockSettings",value:function(e,t){return this.props.attributes.title?null:wp.element.createElement("div",{className:"block-settings"},wp.element.createElement("div",{className:"block-message"},t),wp.element.createElement(l,{onChange:this.onChangeSelectBook,value:this.props.attributes.selectedPost,label:n("Select a Book"),options:e,className:"book-select"}))}},{key:"updateDisplaySettings",value:function(e,t){var o=this.props.attributes.displaySettings.buylinks,n=this.props.attributes.displaySettings.moreLink,s=this.props.attributes.displaySettings.sampleLinks;"buylinks"===e&&(o=t),"moreLink"===e&&(n=t),"sampleLinks"===e&&(s=t),this.props.setAttributes({displaySettings:{buylinks:o,moreLink:n,sampleLinks:s}})}},{key:"onChangeBGColor",value:function(e){this.props.setAttributes({colorBG:e})}},{key:"onChangeBlurb",value:function(e){this.props.setAttributes({customBlurb:e})}},{key:"onChangeButtonsLabel",value:function(e){this.props.setAttributes({buttonsLabel:e})}},{key:"onChangeFlexDirection",value:function(){this.props.attributes.flexReverse?this.props.setAttributes({flexReverse:!1}):this.props.setAttributes({flexReverse:!0})}},{key:"onChangeReadMoreLink",value:function(e){this.props.setAttributes({readMoreLink:e})}},{key:"onChangeReadMoreLinkBGColor",value:function(e){this.props.setAttributes({colorReadMoreLinkBG:e})}},{key:"onChangeReadMoreLinkColor",value:function(e){this.props.setAttributes({colorReadMoreLink:e})}},{key:"onChangeReadMoreText",value:function(e){this.props.setAttributes({readMoreText:e})}},{key:"onChangeSelectBook",value:function(e){var t=this.state.posts.find(function(t){return t.id==parseInt(e)});this.setState({selectedPost:parseInt(e),post:t});var o=t.mbt_book_teaser[0],n=t.excerpt.rendered,s=t.mbt_sample_audio[0],r=t.mbt_unique_id_asin[0],l=t.mbt_buybuttons[0],i=t.mbt_editor_style_url,a=t.mbt_book_image_id[0];this.getBookMedia(a),this.props.setAttributes({selectedPost:parseInt(e),title:t.title.rendered,buylinks:l,audioSample:s,bookSample:r,buttonsLabel:"Now Available From",titlePrefix:"",styleURL:i,customBlurb:n,customTagline:o,readMoreLink:t.link,showReadMore:!0,displaySettings:{buylinks:"show",moreLink:"show",sampleLinks:"show"}})}},{key:"onChangeShowBuyLinks",value:function(){this.props.attributes.showBuyLinks?(this.props.setAttributes({showBuyLinks:!1}),this.updateDisplaySettings("buylinks","hide")):(this.props.setAttributes({showBuyLinks:!0}),this.updateDisplaySettings("buylinks","show"))}},{key:"onChangeShowReadMore",value:function(){this.props.attributes.showReadMore?(this.props.setAttributes({showReadMore:!1}),this.updateDisplaySettings("moreLink","hide")):(this.props.setAttributes({showReadMore:!0}),this.updateDisplaySettings("moreLink","show"))}},{key:"onChangeShowSampleLinks",value:function(){this.props.attributes.showSampleLinks?(this.props.setAttributes({showSampleLinks:!1}),this.updateDisplaySettings("sampleLinks","hide")):(this.props.setAttributes({showSampleLinks:!0}),this.updateDisplaySettings("sampleLinks","show"))}},{key:"onChangeTagline",value:function(e){this.props.setAttributes({customTagline:e})}},{key:"onChangeTextColor",value:function(e){this.props.setAttributes({colorText:e})}},{key:"onChangeTitlePrefix",value:function(e){this.props.setAttributes({titlePrefix:e})}},{key:"render",value:function(){var e=this,t=[{value:0,label:n("Select a Post")}],o="",s="block-preview",r={backgroundColor:this.props.attributes.colorBG,color:this.props.attributes.colorText},l={color:this.props.attributes.colorText},i="button button-primary button-small bpb-more",a=this.props.attributes.colorReadMoreLinkBG,p=this.props.attributes.colorReadMoreLink,u=null,c="flex-row";return this.props.attributes.flexReverse&&(c="flex-row-reverse"),a&&(u={backgroundColor:a}),p&&(u={color:p}),p&&a&&(u={backgroundColor:a,color:p}),(a||p)&&(i="button button-custom button-small bpb-more"),this.props.className+=" loading",this.state.posts.length>0?this.state.posts.forEach(function(e){t.push({value:e.id,label:e.title.rendered})}):o="No books found. Please create books first.",void 0!==this.state.post&&this.state.post.hasOwnProperty("title")?this.props.className+=" has-post":this.props.className+=" no-post",void 0!==this.props.attributes.title&&(s="block-preview active-preview"),wp.element.createElement("div",{className:this.props.className,style:r},this.getInspectorControls(t),this.props.attributes.mbtActive?this.getBlockSettings(t,o):wp.element.createElement("div",{className:"block-settings"},wp.element.createElement("div",{className:"block-message"},wp.element.createElement("span",null,"MyBookTable is not active."),wp.element.createElement("span",null," Please activate ",wp.element.createElement("a",{href:"https://wordpress.org/plugins/mybooktable/",target:"_blank"},"MyBookTable")," and create books first."))),this.props.attributes.title&&wp.element.createElement("div",{className:s},wp.element.createElement("div",{className:"inner-preview is-flex "+c},wp.element.createElement("div",{className:"preview-left"},this.props.attributes.cover&&wp.element.createElement("img",{src:this.props.attributes.cover,className:"preview-cover"}),this.props.attributes.showSampleLinks&&wp.element.createElement("div",{className:"cover-links"},this.props.attributes.bookSample&&wp.element.createElement("span",null,"View Book Sample"),this.props.attributes.bookSample&&this.props.attributes.audioSample&&wp.element.createElement("span",{className:"divider"}," | "),this.props.attributes.audioSample&&wp.element.createElement("span",null,"Hear Audiobook Sample"))),wp.element.createElement("div",{className:"preview-right"},wp.element.createElement("div",{className:"preview-right-top"},wp.element.createElement("h2",{className:"preview-title",style:l},this.props.attributes.titlePrefix&&wp.element.createElement("span",{className:"title-prefix"},this.props.attributes.titlePrefix," "),wp.element.createElement("span",{className:"title"},this.props.attributes.title)),wp.element.createElement(m,{tagName:"div",placeholder:"Lorem Ipsum Dolor Sunt...",className:"preview-tagline",value:this.props.attributes.customTagline,onChange:this.onChangeTagline,keepPlaceholderOnFocus:!0}),wp.element.createElement("div",{class:"preview-blurb"},wp.element.createElement(m,{tagName:"div",multiline:"p",placeholder:"Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue.",className:"custom-blurb",value:this.props.attributes.customBlurb,onChange:this.onChangeBlurb,keepPlaceholderOnFocus:!0}),this.props.attributes.showReadMore&&wp.element.createElement("a",{className:i,style:u,href:this.props.attributes.readMoreLink},this.props.attributes.readMoreText))),this.props.attributes.showBuyLinks&&this.props.attributes.buylinks&&wp.element.createElement("div",{className:"buylinks"},wp.element.createElement("h4",{className:"buttons-label noneditable",style:r},this.props.attributes.buttonsLabel),wp.element.createElement("div",{className:"mbt-book-buybuttons blueprint"},this.props.attributes.buylinks.map(function(t,o){return wp.element.createElement("div",{className:"mbt-book-buybutton"},wp.element.createElement("a",{className:"image-link",href:t.url},wp.element.createElement("img",{className:"image-link",src:e.props.attributes.styleURL+t.store+"_button.png",alt:"buy from "+t.store})))})))))))}}]),t}());s("blueprint-blocks/mbt-book",{title:n("Book Preview"),icon:"book",category:"blueprint-blocks",keywords:[n("blueprint-blocks — mbt-book"),n("Book")],attributes:{audioSample:{type:"string"},bookSample:{type:"string"},buttonsLabel:{type:"string",default:"Now Available From"},buylinks:{type:"array"},colorBG:{type:"string",default:"#ffffff"},colorReadMoreLink:{type:"string"},colorReadMoreLinkBG:{type:"string"},colorText:{type:"string",default:"#333333"},cover:{type:"string"},customBlurb:{type:"string"},customTagline:{type:"string"},flexReverse:{type:"boolean",default:!1},mbtActive:{type:"boolean",default:"true"},readMoreLink:{type:"string"},readMoreText:{type:"string",default:"Read More"},selectedPost:{type:"number",default:null},showBuyLinks:{type:"boolean",default:!0},showReadMore:{type:"boolean",default:!0},showSampleLinks:{type:"boolean",default:!0},styleURL:{type:"string"},title:{type:"string"},titlePrefix:{type:"string"},displaySettings:{buylinks:{type:"string",default:"show"},moreLink:{type:"string",default:"show"},sampleLinks:{type:"string",default:"show"}}},edit:g,save:function(e){return null}})},function(e,t){var o=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}();var n=wp.i18n.__,s=wp.blocks.registerBlockType,r=wp.components,l=r.SelectControl,i=(r.ToggleControl,wp.element.Component),a=wp.editor,p=a.RichText,u=a.MediaUpload,c=a.InnerBlocks,h=[["blueprint-blocks/social-link",{},[]]],b=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state=e.constructor.getInitialState(e.props.attributes.selectedAuthor),e.getAuthors=e.getAuthors.bind(e),e.getAuthors(),e.getBlueprintApi=e.getBlueprintApi.bind(e),e.getBlueprintApi(),e.onChangeSelectAuthor=e.onChangeSelectAuthor.bind(e),e.onSelectImage=e.onSelectImage.bind(e),e.onChangeProfileTitle=e.onChangeProfileTitle.bind(e),e.onChangeAuthorDescription=e.onChangeAuthorDescription.bind(e),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i),o(t,null,[{key:"getInitialState",value:function(e){return{authors:[],selectedAuthor:e,author:{}}}}]),o(t,[{key:"getAuthors",value:function(){var e=this;wp.api.models.Taxonomy.extend({urlRoot:wpApiSettings.root+"wp/v2/mbt_author"});(new(wp.api.collections.Taxonomies.extend({url:wpApiSettings.root+"wp/v2/mbt_author"}))).fetch().then(function(t){if(t&&0!==e.state.selectedAuthor){var o=t.find(function(t){return t.id==e.state.selectedAuthor});e.setState({author:o,authors:t})}else e.setState({authors:t})})}},{key:"getBlueprintApi",value:function(){var e=this;wp.api.models.Status.extend({urlRoot:wpApiSettings.root+"blueprint-mmk/v1/blueprint",defaults:{type:"blueprint"}});(new(wp.api.collections.Statuses.extend({url:wpApiSettings.root+"blueprint-mmk/v1/blueprint"}))).fetch().then(function(t){e.props.setAttributes({siteLinks:t.blueprint_social.links,siteLinkDisplay:t.blueprint_social.display})})}},{key:"onChangeSelectAuthor",value:function(e){var t=this.state.authors.find(function(t){return t.id==parseInt(e)});this.setState({selectedAuthor:parseInt(e),author:t}),this.props.setAttributes({selectedAuthor:parseInt(e),authorName:t.name,authorDescription:t.description,authorLink:t.link,profileTitle:t.name})}},{key:"onSelectImage",value:function(e){this.props.setAttributes({imgUrl:e.sizes.full.url})}},{key:"onChangeProfileTitle",value:function(e){this.props.setAttributes({profileTitle:e})}},{key:"onChangeAuthorDescription",value:function(e){this.props.setAttributes({authorDescription:e})}},{key:"getSiteLinks",value:function(){return this.props.attributes.siteLinks?wp.element.createElement("div",{className:"blueprint-profile-links site-links"},wp.element.createElement("ul",null,this.props.attributes.siteLinks.map(function(e,t){return wp.element.createElement("li",{className:"profile-link"},wp.element.createElement("a",{className:e.network+" icon-"+e.network,href:e.url},wp.element.createElement("span",null,e.network)))}))):null}},{key:"render",value:function(){var e=this,t=[{value:0,label:n("Select an Author")}];return this.props.className+=" loading",this.state.authors.length>0?this.state.authors.forEach(function(e){t.push({value:e.id,label:e.name})}):"No authors found - please install MyBookTable or create author first.",void 0!==this.state.author&&this.state.author.hasOwnProperty("name")?(wp.element.createElement("div",{className:"author"},wp.element.createElement("a",{href:this.state.author.link},this.state.author.name)),this.props.className+=" has-author"):this.props.className+=" no-author",wp.element.createElement("div",{className:this.props.className},wp.element.createElement(l,{onChange:this.onChangeSelectAuthor,value:this.props.attributes.selectedAuthor,label:n("Select an Author"),options:t,className:"author-select"}),wp.element.createElement("div",{className:"profile-preview"},this.props.attributes.profileTitle&&wp.element.createElement("h3",{className:"profile-title"},wp.element.createElement(p,{tagName:"span",placeholder:"Author Name",className:"buttons-label",value:this.props.attributes.profileTitle,onChange:this.onChangeProfileTitle,keepPlaceholderOnFocus:!0})),this.props.attributes.selectedAuthor&&wp.element.createElement("div",{className:"inner is-flex"},wp.element.createElement("div",{className:"profile-main"},wp.element.createElement(u,{onSelect:this.onSelectImage,render:function(t){var o=t.open;return wp.element.createElement("div",{className:"media"},wp.element.createElement("span",{className:"dashicons dashicons-edit edit-media",onClick:o}),wp.element.createElement("img",{src:e.props.attributes.imgUrl,onClick:o}))}}),wp.element.createElement("div",{class:"profile-blurb"},wp.element.createElement(p,{tagName:"div",placeholder:"Short Description or Bio",className:"author-blurb",value:this.props.attributes.authorDescription,onChange:this.onChangeAuthorDescription,keepPlaceholderOnFocus:!1}))),wp.element.createElement("div",{className:"social-icons"},wp.element.createElement(c,{allowedBlocks:["blueprint-blocks/social-link"],template:h})))))}}]),t}();s("blueprint-blocks/blueprint-author",{title:n("Author Profile"),icon:"admin-users",category:"blueprint-blocks",keywords:[n("Author"),n("Blueprint"),n("Profile")],attributes:{authorList:{type:"array"},selectedAuthor:{type:"number",default:null},authorName:{type:"string"},authorDescription:{type:"string",selector:"author-blurb"},authorLink:{type:"string"},profileTitle:{type:"string"},imgUrl:{type:"string",default:"http://placehold.it/500"}},edit:b,save:function(e){var t=e.attributes.imgUrl;return"http://placehold.it/500"===t&&(t=null),wp.element.createElement("div",{className:e.className},wp.element.createElement("h3",{className:"profile-title"},wp.element.createElement("span",null,e.attributes.profileTitle)),wp.element.createElement("div",{className:"inner is-flex"},wp.element.createElement("div",{className:"profile-main"},t&&wp.element.createElement("div",{className:"media"},wp.element.createElement("img",{src:e.attributes.imgUrl,className:"profile-image"})),wp.element.createElement("div",{className:"profile-blurb"},wp.element.createElement(p.Content,{className:"author-blurb",tagName:"div",multiline:"p",value:e.attributes.authorDescription}))),wp.element.createElement("div",{className:"blueprint-profile-links"},wp.element.createElement("nav",{className:"blueprint-social-wrap bpauthor-block-social"},wp.element.createElement("ul",{className:"blueprint-social"},wp.element.createElement(c.Content,null))))))}})},function(e,t){var o=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}();var n=wp.i18n.__,s=wp.blocks.registerBlockType,r=wp.components,l=r.SelectControl,i=r.TextControl,a=(r.Panel,r.PanelBody),p=r.PanelRow,u=wp.element.Component,c=wp.editor,h=(c.RichText,c.MediaUpload,c.InnerBlocks,c.InspectorControls),b=c.PanelColorSettings,m=function(e){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var e=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments));return e.state=e.constructor.getInitialState(e.props.attributes.selectedNetwork),e.getOptions=e.getOptions.bind(e),e.getOptions(),e.getInspectorControls=e.getInspectorControls.bind(e),e.onChangeSelectNetwork=e.onChangeSelectNetwork.bind(e),e.onChangeSocialLink=e.onChangeSocialLink.bind(e),e.linkInputFocus=e.linkInputFocus.bind(e),e.linkInputBlur=e.linkInputBlur.bind(e),e.onChangeButtonColor=e.onChangeButtonColor.bind(e),e.onChangeButtonBG=e.onChangeButtonBG.bind(e),e.onChangeButtonHovColor=e.onChangeButtonHovColor.bind(e),e.onChangeButtonBGHov=e.onChangeButtonBGHov.bind(e),e}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,u),o(t,null,[{key:"getInitialState",value:function(e){return{networks:[],selectedNetwork:null,network:{}}}}]),o(t,[{key:"getOptions",value:function(){var e=this;wp.api.models.Status.extend({urlRoot:wpApiSettings.root+"blueprint-mmk/v1/blueprint",defaults:{type:"blueprint"}});(new(wp.api.collections.Statuses.extend({url:wpApiSettings.root+"blueprint-mmk/v1/blueprint"}))).fetch().then(function(t){var o=t.blueprint_social.display,n=o.background?o.background:"#4b4b4b",s=o.color?o.color:"#f4f4f4",r=o.hover_color?o.hover_color:"#f4f4f4",l=o.hover_background?o.hover_background:"#4b4b4b",i=o.border_radius?o.border_radius:"0";e.props.setAttributes({bpSocialStatus:t.blueprint_social.status,networks:t.blueprint_social.networks,bgColor:n,color:s,bgColorHov:l,colorHov:r,borderRadius:i,imgDir:t.img_dir}),e.setState({networks:t.blueprint_social.networks})})}},{key:"onChangeSelectNetwork",value:function(e){var t=this.state.networks.find(function(t){return t.tag==e});this.props.setAttributes({selectedNetwork:e,networkName:t.name})}},{key:"onChangeSocialLink",value:function(e){this.props.setAttributes({socialLink:e})}},{key:"onChangeButtonColor",value:function(e){this.props.setAttributes({color:e})}},{key:"onChangeButtonBG",value:function(e){this.props.setAttributes({bgColor:e})}},{key:"onChangeButtonHovColor",value:function(e){this.props.setAttributes({colorHov:e})}},{key:"onChangeButtonBGHov",value:function(e){this.props.setAttributes({bgColorHov:e})}},{key:"linkInputFocus",value:function(){this.setState({unFocused:!1})}},{key:"linkInputBlur",value:function(){this.setState({unFocused:!0})}},{key:"getInspectorControls",value:function(e){return wp.element.createElement("div",null,wp.element.createElement(h,null,wp.element.createElement(b,{title:n("Colors","blueprint-blocks"),initialOpen:!1,colorSettings:[{value:this.props.attributes.color,onChange:this.onChangeButtonColor,label:n("Button: Icon Color","blueprint-blocks")},{value:this.props.attributes.bgColor,onChange:this.onChangeButtonBG,label:n("Button: Background Color","blueprint-blocks")},{value:this.props.attributes.colorHov,onChange:this.onChangeButtonHovColor,label:n("Button Hover: Icon Color","blueprint-blocks")},{value:this.props.attributes.bgColorHov,onChange:this.onChangeButtonBGHov,label:n("Button Hover: Background Color","blueprint-blocks")}]}),wp.element.createElement(a,{title:"Book Settings",initialOpen:!0,className:"blueprint-panel-body"},wp.element.createElement(p,{className:"book-select"},wp.element.createElement(l,{onChange:this.onChangeSelectNetwork,value:this.props.attributes.selectedNetwork,label:n("Select a Social Network"),options:e,className:"network-select"})),wp.element.createElement(p,{className:"display-block"},wp.element.createElement(i,{label:this.props.attributes.selectedNetwork+" link",help:"Full URL to "+this.props.attributes.selectedNetwork+" profile",placeholder:"https://"+this.props.attributes.selectedNetwork+".com",value:this.props.attributes.socialLink,onChange:this.onChangeSocialLink,keepPlaceholderOnFocus:!0})))))}},{key:"render",value:function(){var e=[{value:null,label:n("Select a Network")}];this.props.className+=" loading",this.state.networks.length>0&&this.state.networks.forEach(function(t){e.push({value:t.tag,label:t.name})}),void 0!==this.state.network&&this.state.network.hasOwnProperty("name")?this.props.className+=" has-network":this.props.className+=" no-network",this.props.attributes.network;var t=this.props.attributes.imgDir+"icons/"+this.props.attributes.selectedNetwork+".svg",o={backgroundColor:this.props.attributes.bgColor,borderRadius:this.props.attributes.borderRadius},s={backgroundColor:this.props.attributes.color,maskImage:" url( "+t+")",webkitMaskImage:" url( "+t+")"};return wp.element.createElement("div",{className:this.props.className},this.getInspectorControls(e),this.state.unFocused&&this.props.attributes.selectedNetwork&&this.props.attributes.socialLink?wp.element.createElement("a",{href:this.props.attributes.socialLink,className:this.props.attributes.selectedNetwork+" social-link icon-"+this.props.attributes.selectedNetwork,style:o},wp.element.createElement("span",{className:"editor-icon",style:s})):wp.element.createElement("div",{className:"social-setup"},wp.element.createElement(l,{onChange:this.onChangeSelectNetwork,value:this.props.attributes.selectedNetwork,label:n("Select a Social Network"),options:e,className:"network-select"}),wp.element.createElement(i,{label:this.props.attributes.selectedNetwork+" link",help:"Full URL to "+this.props.attributes.selectedNetwork+" profile",placeholder:"https://"+this.props.attributes.selectedNetwork+".com",value:this.props.attributes.socialLink,onChange:this.onChangeSocialLink,keepPlaceholderOnFocus:!0,onFocus:this.linkInputFocus,onBlur:this.linkInputBlur})))}}]),t}();s("blueprint-blocks/social-link",{title:n("Social Link"),icon:"share",category:"blueprint-blocks",keywords:[n("Social"),n("Link"),n("Facebook")],parent:["blueprint-blocks/blueprint-author"],attributes:{selectedNetwork:{type:"string",default:null},networkName:{type:"string"},networks:{type:"array",default:[]},imgDir:{type:"string"},socialLink:{type:"string"},socialClass:{type:"string"},bgColor:{type:"string",default:"#4b4b4b"},color:{type:"string",default:"#fff"},bgColorHov:{type:"string"},colorHov:{type:"string"},borderRadius:{type:"string"},allSet:{type:"boolean",default:!1}},edit:m,save:function(e){return wp.element.createElement("div",{className:e.className},e.attributes.selectedNetwork&&e.attributes.socialLink&&wp.element.createElement("a",{href:e.attributes.socialLink,className:e.attributes.selectedNetwork+" icon-"+e.attributes.selectedNetwork},wp.element.createElement("span",null,e.attributes.networkName)))}})}]);