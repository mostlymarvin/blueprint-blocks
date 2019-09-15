/**
 * BLOCK: mbt-book
 *
 * MBT Book Block showing cover, blurb, buylinks, audio & book samples
 * customized to work with Blueprint Theme / Blueprint Child themes.
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { SelectControl, ToggleControl, TextControl, Panel, PanelBody, PanelRow, RangeControl, FontSizePicker } = wp.components;
const { Component, Fragment, RawHTML } = wp.element;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;

class mbtSelectBook extends Component {

	static getInitialState( selectedPost ) {
		return {
		  posts: [],
		  selectedPost: selectedPost,
      post: {},
		};
      }

   constructor() {
      super( ...arguments );

      this.state = this.constructor.getInitialState( this.props.attributes.selectedPost );

      this.getBlueprintApi = this.getBlueprintApi.bind(this);
      this.getBlueprintApi();

      this.getOptions = this.getOptions.bind(this);
      this.getOptions();

      this.getInspectorControls = this.getInspectorControls.bind(this);
      this.getBlockSettings = this.getBlockSettings.bind(this);
      this.getBookMedia = this.getBookMedia.bind(this);

      this.onChangeBGColor = this.onChangeBGColor.bind(this);
      this.onChangeBlurb = this.onChangeBlurb.bind(this);
      this.onChangeButtonsLabel = this.onChangeButtonsLabel.bind(this);
      this.onChangeFlexDirection = this.onChangeFlexDirection.bind(this);
      this.onChangeReadMoreLink = this.onChangeReadMoreLink.bind(this);
      this.onChangeReadMoreLinkBGColor = this.onChangeReadMoreLinkBGColor.bind(this);
      this.onChangeReadMoreLinkColor = this.onChangeReadMoreLinkColor.bind(this);
      this.onChangeReadMoreText = this.onChangeReadMoreText.bind(this);
      this.onChangeSelectBook = this.onChangeSelectBook.bind(this);
      this.onChangeShowBuyLinks = this.onChangeShowBuyLinks.bind(this);
      this.onChangeShowReadMore = this.onChangeShowReadMore.bind(this);
      this.onChangeShowSampleLinks = this.onChangeShowSampleLinks.bind(this);
      this.onChangeTagline = this.onChangeTagline.bind(this);
      this.onChangeTextColor = this.onChangeTextColor.bind(this);
      this.onChangeTitlePrefix = this.onChangeTitlePrefix.bind(this);
      this.onChangeMaxWidthInner = this.onChangeMaxWidthInner.bind(this);
      this.onChangeTitleFontSize = this.onChangeTitleFontSize.bind(this);
      this.onChangeTitleColor = this.onChangeTitleColor.bind(this);
      this.onChangeTitlePrefixColor = this.onChangeTitlePrefixColor.bind(this);
      this.onChangeShowTagline = this.onChangeShowTagline.bind(this);
      this.onChangeButtonAlign = this.onChangeButtonAlign.bind(this);
      this.readMoreButton = this.readMoreButton.bind( this );
   }

   getBlueprintApi() {
      const Blueprint = wp.api.models.Status.extend( {
         urlRoot: wpApiSettings.root + 'blueprint-mmk/v1/blueprint',
         defaults: {
            type: 'blueprint',
            },
         } );
      const Blueprints = wp.api.collections.Statuses.extend( {
         url: wpApiSettings.root + 'blueprint-mmk/v1/blueprint',
         } );

      const theBlueprint = new Blueprints();

      theBlueprint.fetch().then( ( blueprint ) => {
         this.props.setAttributes( {
            mbtActive: blueprint.mbt_active,
         } );
      });

   }

   getOptions() {
      const Book = wp.api.models.Post.extend( {
         urlRoot: wpApiSettings.root + 'wp/v2/mbt_book',
         defaults: {
            type: 'mbt_book',
            },
         } );

      const Books = wp.api.collections.Posts.extend( {
         url: wpApiSettings.root + 'wp/v2/mbt_book',
         } );

      const theBooks = new Books();

      theBooks.fetch().then( ( posts ) => {


      if( posts && 0 !== this.state.selectedPost ) {
         // If we have a selected Post, find that post and add it.
         const post = posts.find( ( item ) => { return item.id == this.state.selectedPost } );

         this.setState( { post, posts } );

         } else {
            this.setState({ posts });
         }
      } );
   }

   getBookMedia( coverID ) {
      const attachment = new wp.media.model.Attachment.get( coverID );
      const coverURL = attachment.fetch().then( ( media ) => {
          this.props.setAttributes( {
              cover: media.url,
              } );
      } );
   }

   getInspectorControls( options ) {

     let titleColorSettings = [{
       value: this.props.attributes.colorTitle,
       onChange:  this.onChangeTitleColor,
       label: __('Title Color', 'blueprint-blocks'),
     }];

     if( this.props.attributes.titlePrefix ) {
       titleColorSettings = [
         {
           value: this.props.attributes.colorTitle,
           onChange:  this.onChangeTitleColor,
           label: __('Title Color', 'blueprint-blocks'),
         },
         {
           value: this.props.attributes.colorTitlePrefix,
           onChange:  this.onChangeTitlePrefixColor,
           label: __('Title Prefix Color', 'blueprint-blocks'),
           help: 'Defaults to same color as Title'
         }
       ]
     }
      return(
            <InspectorControls>

            <PanelBody
            title="Main Settings"
            initialOpen={ true }
            className="blueprint-panel-body">

              <PanelRow className="book-select">
              <SelectControl
                 onChange={this.onChangeSelectBook}
                 value={ this.props.attributes.selectedPost }
                 label={ __( 'Select a Book' ) }
                 options={ options }
                 className="book-select"
              />
              </PanelRow>
              {
              this.props.attributes.cover && (
              <PanelRow className="  ">
              <ToggleControl
                 label="Reverse Cover Position"
                 help="Default displays cover to left"
                 checked={ !!this.props.attributes.flexReverse }
                 onChange={ this.onChangeFlexDirection }
                 className="flex-direction"
              />
              </PanelRow>
              )
              }
              {
              this.props.attributes.align === 'full' && (
                <PanelRow
                  className="width-control ">
                <RangeControl
                 label="Max width of Inner Content"
                 help="maximum width in px, defaults to 1020, applies only to blocks set to display Full Width"
                 value={ this.props.attributes.maxWidthInner }
                 onChange={ this.onChangeMaxWidthInner }
                 min={ 0 }
                 max={ 2000 }
                />
              </PanelRow>
              )
              }

              <PanelRow className="">
              <ToggleControl
                 label="Show Book Sample Links?"
                 help="By default, shows audiobook and book sample links under the cover, if the links are available."
                 checked={ !!this.props.attributes.showSampleLinks }
                 onChange={ this.onChangeShowSampleLinks }
              />
              </PanelRow>

              <PanelRow className="display-block parent">
              <ToggleControl
                 label="Show Buy Links?"
                 checked={ !!this.props.attributes.showBuyLinks }
                 onChange={ this.onChangeShowBuyLinks }
              />
              {
              this.props.attributes.showBuyLinks && (
              <TextControl
                 placeholder= 'Now Available From'
                 label="Buy Link Section Label"
                 value={ this.props.attributes.buttonsLabel }
                 onChange={ this.onChangeButtonsLabel }
                 keepPlaceholderOnFocus={true}
              />
              )
              }
              </PanelRow>
              <PanelColorSettings
              title={ __('Colors', 'blueprint-blocks') }
              initialOpen={false}
              colorSettings= { [
                {
                value: this.props.attributes.colorText,
                onChange:  this.onChangeTextColor,
                label: __('Text Color', 'blueprint-blocks'),
                },
                {
                value: this.props.attributes.colorBG,
                onChange: this.onChangeBGColor,
                label: __('Background Color', 'blueprint-blocks'),
                },
              ] }
              />

            </PanelBody>

            <PanelBody
              title="Title and Tagline Settings"
              initialOpen={ false}
              className="blueprint-panel-body"
              >

             <PanelRow className="display-block parent">
              <ToggleControl
                 label="Show Tagline?"
                 checked={ !!this.props.attributes.showTagLine }
                 onChange={ this.onChangeShowTagline }
              />
              <TextControl
                 label="Add Prefix to Title"
                 help="ie, 'Coming Soon' or 'Just Released', etc."
                 placeholder= 'Coming Soon, etc.'
                 value={ this.props.attributes.titlePrefix }
                 onChange={ this.onChangeTitlePrefix }
                 keepPlaceholderOnFocus={true}
              />
              <FontSizePicker
                fontSizes= {[
                    {
                      name: __( 'X-Small Title' ),
                      slug: 'title-extra-small',
                      size: '16',
                    },
                    {
                      name: __( 'Small Title' ),
                      slug: 'title-small',
                      size: '20',
                    },
                    {
                      name: __( 'Normal Title' ),
                      slug: 'title-normal',
                      size: '24',
                    },
                    {
                      name: __( 'Large Title' ),
                      slug: 'title-large',
                      size: '28',
                    },
                    {
                      name: __( 'X-Large Title' ),
                      slug: 'title-extra-large',
                      size: '32',
                    },
                ] }
                value={ this.props.attributes.titleFontSize }
                fallbackFontSize='24'
                onChange={ this.onChangeTitleFontSize }
              />
             </PanelRow>

             <PanelColorSettings
               title={ __('Title Colors', 'blueprint-blocks') }
               initialOpen={true}
               colorSettings={ titleColorSettings }
             />
            </PanelBody>


            <PanelBody
              title="Read More Link Settings"
              initialOpen={ false }
              className="blueprint-panel-body"
              initialOpen={ false }
              >
              <PanelRow className="display-block  ">
              <ToggleControl
                 label="Show 'Read More' Link?"
                 checked={ !!this.props.attributes.showReadMore }
                 onChange={ this.onChangeShowReadMore }
              />
             </PanelRow>
              {
                this.props.attributes.showReadMore && (

                <PanelRow className="display-block">
                <TextControl
                  placeholder= 'Read More'
                  value={ this.props.attributes.readMoreText }
                  onChange={ this.onChangeReadMoreText }
                  keepPlaceholderOnFocus={true}
                />
                <TextControl
                  placeholder={ this.props.attributes.link }
                  value={ this.props.attributes.readMoreLink }
                  onChange={ this.onChangeReadMoreLink }
                  keepPlaceholderOnFocus={true}
                />

                <SelectControl
                  label="Align Button:"
                  value={ this.props.attributes.alignReadMore }
                  options={ [
                    { label: 'Inline', value: 'btn-inline' },
                    { label: 'Left', value: 'btn-left' },
                    { label: 'Center', value: 'btn-center' },
                    { label: 'Right', value: 'btn-right' },
                  ] }
                  onChange={ this.onChangeButtonAlign }
                />

                <PanelColorSettings
                title={ __('Button Colors', 'blueprint-blocks') }
                initialOpen={ true }
                colorSettings= { [
                  {
                  value: this.props.attributes.colorReadMoreLinkBG,
                  onChange: this.onChangeReadMoreLinkBGColor,
                  label: __('Read More Button Background Color', 'blueprint-blocks'),
                  },
                  {
                  value: this.props.attributes.colorReadMoreLink,
                  onChange: this.onChangeReadMoreLinkColor,
                  label: __('Read More Button Text Color', 'blueprint-blocks'),
                  },
                ] }
                />
                </PanelRow>
               )
             }

           </PanelBody>
         </InspectorControls>
      );
    }

   getBlockSettings( options, message ) {
      return(

      this.props.attributes.title ? (
         null

         ) : (
            <div className="blueprint-block-settings">
            <div className="blueprint-block-message">{message}</div>
            <SelectControl
               onChange={this.onChangeSelectBook}
               value={ this.props.attributes.selectedPost }
               label={ __( 'Select a Book' ) }
               options={ options }
               className="book-select"
                  />
            </div>
         )

      );
   }


   onChangeBGColor( colorBG ) {
      this.props.setAttributes ( { colorBG: colorBG } );
   }
   onChangeBlurb( newValue ) {
      this.props.setAttributes( { customBlurb: newValue } );
   }
   onChangeButtonsLabel( newValue ) {
      this.props.setAttributes( { buttonsLabel: newValue } );
   }
   onChangeFlexDirection() {
      if ( this.props.attributes.flexReverse ) {
         this.props.setAttributes( { flexReverse: false } );
      } else {
         this.props.setAttributes( { flexReverse: true } );
      }
   }
   onChangeButtonAlign( newValue ) {
     this.props.setAttributes({ alignReadMore: newValue });
   }
   onChangeReadMoreLink( newValue ) {
      this.props.setAttributes( { readMoreLink: newValue });
   }
   onChangeReadMoreLinkBGColor( colorReadMoreLinkBG ) {
      this.props.setAttributes ( { colorReadMoreLinkBG: colorReadMoreLinkBG } );
   }
   onChangeReadMoreLinkColor( colorReadMoreLink ) {
      this.props.setAttributes ( { colorReadMoreLink: colorReadMoreLink } );
   }
   onChangeReadMoreText( newValue ) {
      this.props.setAttributes( { readMoreText: newValue });
   }
   onChangeSelectBook( value ) {
      // Find the post
      const post = this.state.posts.find( ( item ) => { return item.id == parseInt( value ) } );

      // Set the state
      this.setState( { selectedPost: parseInt( value ), post } );


      const tagLine = post.mbt_book_teaser[0];
      const audioSample = post.mbt_sample_audio[0];
      const bookASIN = post.mbt_unique_id_asin;
      const bookSample = bookASIN[0];
      const bookSampleLink = 'https://read.amazon.com/kp/embed?asin=' + bookSample + '&preview=newtab';
      const booklinks = post.mbt_buybuttons[0];
      const styleURL = post.mbt_editor_style_url;
      const coverID = post.mbt_book_image_id[0];
      this.getBookMedia( coverID );

      // Set the attributes
      this.props.setAttributes( {
         selectedPost: parseInt( value ),
         title: post.title.rendered,
         buylinks: booklinks,
         audioSample: audioSample,
         bookSample: bookSampleLink,
         buttonsLabel: 'Now Available From',
         titlePrefix: '',
         styleURL: styleURL,
         customBlurb: post.mbt_book_excerpt,
         customTagline: tagLine,
         readMoreLink: post.link,
         showReadMore: true,
         }
       );
   }
   onChangeShowBuyLinks() {
      if ( this.props.attributes.showBuyLinks ) {
         this.props.setAttributes( { showBuyLinks: false } );
      } else {
         this.props.setAttributes( { showBuyLinks: true } );
      }
   }
   onChangeShowReadMore() {
      if ( this.props.attributes.showReadMore ) {
         this.props.setAttributes( {  showReadMore: false } );
      } else {
         this.props.setAttributes( { showReadMore: true } );
      }
   }
   onChangeShowSampleLinks() {
      if ( this.props.attributes.showSampleLinks ) {
         this.props.setAttributes( { showSampleLinks: false });

      } else {
         this.props.setAttributes( { showSampleLinks: true } );
      }
   }

   onChangeShowTagline() {
      if ( this.props.attributes.showTagLine ) {
         this.props.setAttributes( { showTagLine: false });

      } else {
         this.props.setAttributes( { showTagLine: true } );

      }
   }
   onChangeTagline( newValue ) {
      this.props.setAttributes( { customTagline: newValue } );
   }
   onChangeTextColor( colorText ) {
      this.props.setAttributes ( { colorText: colorText } );
   }
   onChangeTitlePrefix( newValue ) {
      this.props.setAttributes( { titlePrefix: newValue } );
   }
   onChangeMaxWidthInner( newValue) {
     this.props.setAttributes( { maxWidthInner: newValue });
   }
   onChangeTitleFontSize( newValue) {
     if( newValue !== undefined ) {
       this.props.setAttributes( { titleFontSize: newValue });
     } else {
       this.props.setAttributes( { titleFontSize: '24' });
     }
   }
   onChangeTitleColor( newValue ) {
     this.props.setAttributes({ colorTitle: newValue });
   }
   onChangeTitlePrefixColor( newValue ) {
     this.props.setAttributes({ colorTitlePrefix: newValue });
   }


   readMoreButton() {
     let buttonClass = 'button button-primary button-small bpb-more';
     let buttonBG = this.props.attributes.colorReadMoreLinkBG;
     let buttonColor = this.props.attributes.colorReadMoreLink;
     let buttonStyle = {};
     if( buttonColor ) {
        buttonStyle = {
          color: buttonColor
        }
     }
     if( buttonBG ) {
        buttonStyle = {
          backgroundColor: buttonBG
        }
     }

     if( buttonColor && buttonBG ) {
        buttonStyle = {
          backgroundColor: buttonBG,
          color: buttonColor,
        }
     }

     if( buttonBG || buttonColor ) {
        buttonClass = 'button button-custom button-small bpb-more';
     }

     return(
          <a href="#"
            className={ buttonClass }
            style={ buttonStyle }>
            { this.props.attributes.readMoreText }
          </a>
     );
   }


   render() {

      let blurbClass = 'custom-blurb';
      let btnAlign = this.props.attributes.alignReadMore;
      let buttonBG = this.props.attributes.colorReadMoreLinkBG;
      let buttonColor = this.props.attributes.colorReadMoreLink;
      let flexClass = 'flex-row';
      let message = '';
      let options = [ { value: 0, label: __( 'Select a Book' ) } ];
      let previewClass = 'block-preview';
      let titleColor = this.props.attributes.colorText;

      let blockStyle = {
         backgroundColor: this.props.attributes.colorBG,
         color: this.props.attributes.colorText
      }
      let titleStyle = blockStyle;

      if( this.props.attributes.colorTitle ){
        titleStyle = {
          color: this.props.attributes.colorTitle,
        }
      }
      let prefixStyle = titleStyle;
      if( this.props.attributes.colorTitlePrefix ) {
        prefixStyle = {
          color: this.props.attributes.colorTitlePrefix
        }
      }

      if( this.props.attributes.colorTitle ) {
        titleColor = this.props.attributes.colorTitle;
      }

      if( this.props.attributes.flexReverse ) {
         flexClass = 'flex-row-reverse';
      }

      this.props.className += ' loading';

      if( this.state.posts.length > 0 ) {

         this.state.posts.forEach((post) => {
               options.push({value:post.id, label:post.title.rendered});
         });

      }  else {

         message =  'No books found. Please create books first.';
      }

      // Checking if we have anything in the object
      if( this.state.post !== undefined && this.state.post.hasOwnProperty('title')) {

         this.props.className += ' has-post';

      } else {
         this.props.className += ' no-post';
      }

      if( this.props.attributes.title !== undefined ) {
         previewClass = 'block-preview active-preview';
      }

      this.props.className += ' gutenberg-render';


		return (

         <div
         className={ this.props.className }
         style={ blockStyle }>

         { this.getInspectorControls( options ) }

         {
         this.props.attributes.mbtActive ? (

            this.getBlockSettings( options, message )

            ) : (

            <div className="blueprint-block-settings">
            <div className="blueprint-block-message">
            <span>MyBookTable is not active.</span>
            <span> Please activate <a href="https://wordpress.org/plugins/mybooktable/" target="_blank">MyBookTable</a> and create books first.</span>
            </div>
            </div>
            )
         }

         {
         this.props.attributes.title && (

         <div className={ previewClass }>
         <div className={ "inner-preview is-flex " + flexClass }>
         <div className="preview-left">
            {
               this.props.attributes.cover && (
               <img
               src={ this.props.attributes.cover }
               className="preview-cover"
               />
               )
            }

            {
               this.props.attributes.showSampleLinks && (

               <div className="cover-links">
               {
                  this.props.attributes.bookSample && (
                     <span>View Book Sample</span>
                  )
               }
               {
                  this.props.attributes.bookSample && this.props.attributes.audioSample && (
                     <span className="divider">&nbsp;|&nbsp;</span>
                  )
               }
               {
                  this.props.attributes.audioSample && (
                     <span>Hear Audiobook Sample</span>
                  )
               }
               </div>

               )
            }
         </div>

         <div className="preview-right">
            <div className="preview-right-top">

               <h2
               className="preview-title"
               style={ titleStyle }>

               {
               this.props.attributes.titlePrefix && (
                  <span className="title-prefix"
                  style={ prefixStyle }>
                  {this.props.attributes.titlePrefix}
                  </span>
                  )
               }
               <span className="title">
                  { this.props.attributes.title }
               </span>
               </h2>

               {
                 this.props.attributes.showTagLine && (
                 <RichText
                    tagName='div'
                    placeholder= 'Lorem Ipsum Dolor Sunt...'
                    className='preview-tagline'
                    value={ this.props.attributes.customTagline }
                    onChange={ this.onChangeTagline }
                    keepPlaceholderOnFocus={true}
                    />
                  )
                }


               <div className="preview-blurb">
               <RichText
                  tagName='div'
                  multiline='p'
                  placeholder='Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Nullam id dolor id nibh ultricies vehicula ut id elit. Nulla vitae elit libero, a pharetra augue.'
                  placeholder={this.props.attributes.customBlurb}
                  className={ blurbClass }
                  value={ this.props.attributes.customBlurb }
                  onChange={ this.onChangeBlurb }
                  keepPlaceholderOnFocus={true}
               />
               {
               this.props.attributes.showReadMore && (
                 <span id="btn-wrap" className={ btnAlign }>
                    <this.readMoreButton/>
                 </span>
                  )
               }
               </div>
            </div>

         {
         this.props.attributes.showBuyLinks &&
         this.props.attributes.buylinks && (
            <div className="buylinks">
               <h4
               className="buttons-label noneditable"
               style={ blockStyle }>
               { this.props.attributes.buttonsLabel }
               </h4>
               <div className="mbt-book-buybuttons blueprint">
               {
               this.props.attributes.buylinks.map( (item, key) =>
                  {
                  return <div className="mbt-book-buybutton"
                    key={item.store}>
                  <a className="image-link"
                        href={item.url}>
                        <img className="image-link"
                        src={this.props.attributes.styleURL + item.store + '_button.png'}
                        alt={ 'buy from ' + item.store }/>
                        </a>
                  </div>
                  }
                  )
               }
              </div>
            </div>
         )
         }
         </div>
         </div>
         </div>
         )
         }
         </div>
		)
	}
}

registerBlockType( 'blueprint-blocks/mbt-book', {
	title: __( 'Book Preview' ),
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#49A5C3',
    // Specifying a dashicon for the block
    src: 'book-alt',
  },
	category: 'blueprint-blocks',
	keywords: [
		__( 'blueprint-blocks — mbt-book' ),
		__( 'Book' ),
	],
  supports: {
    align: [ 'center', 'wide', 'full' ],
    anchor: true,
    //inserter: false,
  },
	attributes: {
      alignReadMore: {
        type: 'string',
        default: 'btn-left',
      },
      anchor: {
          type: 'string',
          source: 'attribute',
          attribute: 'id',
          selector: '*',
      },
      audioSample: {
         type: 'string',
         source: 'attribute',
         attribute: 'href',
         selector: '.audiosample a',
      },
      bookSample: {
         type: 'string',
         source: 'attribute',
         attribute: 'href',
         selector: '.booksample a'
      },
      buttonsLabel: {
         type: 'string',
         default: 'Now Available From',
         source: 'children',
         selector: '.buttons-label',
      },
      buylinks: {
         type: 'array',
      },
      colorBG: {
         type: 'string',
         default:'#fff',
      },
      colorReadMoreLink: {
         type: 'string',
         default:'',
      },
      colorReadMoreLinkBG: {
         type: 'string',
         default:'',
      },
      colorText: {
         type: 'string',
         default:'',
      },
      colorTitle: {
        type: 'string',
        default:'',
      },
      colorTitlePrefix: {
        type: 'string',
        default:'',
      },
      cover: {
         type: 'string',
         source: 'attribute',
         attribute: 'src',
         selector: '.preview-cover',
      },
      customBlurb: {
         type: 'string',
         source: 'html',
         selector: '.custom-blurb',
      },
      customTagline: {
         type: 'string',
         source: 'html',
         selector: '.preview-tagline',
      },
      flexReverse: {
         type: 'boolean',
         default: false
      },
      mbtActive: {
         type: 'boolean',
         default: true
      },
      readMoreLink: {
         type: 'string',
         source: 'attribute',
         selector: '.bpb-more',
         attribute: 'href',
      },
      readMoreText: {
         type: 'string',
         default: 'Read More',
         source: 'text',
         selector: '.bpb-more',
      },
      selectedPost: {
         type: 'number',
         default: '',
      },
      showBuyLinks: {
         type: 'boolean',
         default: true
      },
      showReadMore: {
         type: 'boolean',
         default: true
      },
      showSampleLinks: {
         type: 'boolean',
         default: true
      },
      showTagLine: {
        type: 'boolean',
        default: true
      },
      styleURL: {
         type: 'string',
      },
      title: {
         type: 'string',
         source: 'text',
         selector: '.title',
      },
      titleFontSize: {
        type: 'string',
        default: '24',
        source: 'attribute',
        attribute: 'style',
        selector: '.title',
        property: 'font-size',
      },
      titlePrefix: {
         type: 'string',
         source: 'text',
         selector: '.title-prefix'
      },
      maxWidthInner: {
        type: 'integer',
        default: 1400,
        source: 'attribute',
        attribute: 'style',
        selector: '.has-width',
        property: 'width',
      },
	},

	edit: mbtSelectBook,

	save: function( props ) {
    let btnAlign = props.attributes.alignReadMore;
    let buttonBG = props.attributes.colorReadMoreLinkBG;
    let buttonColor = props.attributes.colorReadMoreLink;
    let coverAlt = props.attributes.title + ' Cover';
    let titleStyle = null;
    let blockStyle = null;
    let previewClass = 'block-preview';
    let flexClass = 'inner is-flex flex-row';


    if( props.attributes.flexReverse ) {
       flexClass = 'inner is-flex flex-row-reverse';
    }

    if( props.attributes.colorBG ){
      blockStyle = {
        backgroundColor: props.attributes.colorBG
      }
      props.className += ' has-background-color';
    }
    if( props.attributes.colorBG === '#fff' || props.attributes.colorBG === '#ffffff' ) {
      props.className += ' has-background-color-white';
    }
    if( props.attributes.colorText ) {
      blockStyle = {
        color: props.attributes.colorText,
      }
    }

    if( props.attributes.colorText && props.attributes.colorBG ) {
      blockStyle = {
        backgroundColor: props.attributes.colorBG,
        color: props.attributes.colorText,
      }
    }

    if( props.attributes.colorTitle ) {
      titleStyle = {
        color: props.attributes.colorTitle
      }
    }

    let prefixStyle = titleStyle;
    if( props.attributes.colorTitlePrefix ) {
      prefixStyle = {
        color: props.attributes.colorTitlePrefix
      }
    }


    let buttonStyle = null;
    if( props.attributes.colorReadMoreLinkBG ){
      buttonStyle = {
        backgroundColor: props.attributes.colorReadMoreLinkBG
      }
    }
    if( props.attributes.colorReadMoreLink ){
      buttonStyle = {
        color:props.attributes.colorReadMoreLink
      }
    }
    if( props.attributes.colorReadMoreLinkBG
      && props.attributes.colorReadMoreLink ) {
        buttonStyle = {
          backgroundColor:props.attributes.colorReadMoreLinkBG,
          color:props.attributes.colorReadMoreLink,
        }
      }


    let buttonClass = 'button button-primary button-small bpb-more';

    if( buttonBG || buttonColor ) {
       buttonClass = 'button button-custom button-small bpb-more';
    }


    let innerStyle = '';
    if( props.align === 'alignfull' ) {
       flexClass += ' has-width';
    }


    props.className += ' gutenberg-render';

    const buylinksShortcode=`[blueprint_mbt_buttons id="${props.attributes.selectedPost}"]`;



		return (

      <div
      className={ props.className }
      style={ blockStyle }>

      <div className={ flexClass }>
      <div className="preview-left">
         {
            props.attributes.cover && (
            <a href={ props.attributes.readMoreLink }
              className="image-link">
              <img
                src={ props.attributes.cover }
                className="preview-cover"
                alt={ coverAlt }
            />
            </a>
            )
         }

         {
            props.attributes.showSampleLinks &&  (

            <div className="cover-links">
            {
               props.attributes.bookSample && (
                  <span className="booksample">
                    <a href={ props.attributes.bookSample }>
                    View Book Sample</a></span>
               )
            }
            {
               props.attributes.bookSample && props.attributes.audioSample && (
                  <span className="divider">&nbsp;|&nbsp;</span>
               )
            }
            {
               props.attributes.audioSample && (
                  <span className="audiosample">
                    <a href={ props.attributes.audioSample }>
                    Hear Audiobook Sample
                  </a></span>
               )
            }
            </div>

            )
         }
      </div>

      <div className="preview-right">
         <div className="preview-right-top">

            <h2
            className="preview-title">

            {
            props.attributes.titlePrefix && (
               <span className="title-prefix"
                 style={ prefixStyle }>
                  { props.attributes.titlePrefix }&nbsp;
               </span>
               )
            }
            <span className="title" style={ titleStyle }>
               { props.attributes.title }
            </span>
            </h2>

            {
              props.attributes.showTagLine && (
              <RichText.Content
                 tagName='div'
                 className='preview-tagline'
                 value={ props.attributes.customTagline }
                 />
               )
             }

            <div className="preview-blurb">
            <RichText.Content
               tagName='div'
               multiline='p'
               className='custom-blurb'
               value={ props.attributes.customBlurb }
            />

            {
            props.attributes.showReadMore && (
              <span id="btn-wrap" className={ btnAlign }>
                 <a href={ props.attributes.readMoreLink }
                   className={ buttonClass }
                   style={ buttonStyle }>
                   { props.attributes.readMoreText }
                 </a>
              </span>
               )
            }
            </div>
         </div>

      {
      props.attributes.showBuyLinks &&
      props.attributes.buylinks && (
         <div className="buylinks">
            <h5
            className="buttons-label"
            style={ blockStyle }>
            { props.attributes.buttonsLabel }
          </h5>
          <div class="mbt-book">
            <RawHTML>{ buylinksShortcode }</RawHTML>
          </div>
         </div>
      )
      }

      </div>
      </div>
      </div>

      );
	},
} );
