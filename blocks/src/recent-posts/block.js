/**
 * BLOCK: Blueprint Author
 *
 * Author Profile + Photo and Social Links
 */


const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { SelectControl, TextControl,
Panel, PanelBody, PanelRow, RangeControl, ToggleControl, FontSizePicker } = wp.components;
const { Component } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, PanelColorSettings  } = wp.editor;
const { apiFetch } = wp.apiFetch;

class editRecentPosts extends Component {

  static getInitialState( selectedCategory ) {
		return {
		  categories: [],
		  selectedCategory: selectedCategory,
      category: {},
		  };
    }

  constructor() {
    super( ...arguments );

    this.state = this.constructor.getInitialState( this.props.attributes.selectedCategory );

    this.getOptions = this.getOptions.bind(this);
    this.getOptions();

    this.getInspectorControls = this.getInspectorControls.bind(this);

    this.onChangeSelectCategory = this.onChangeSelectCategory.bind(this);
    this.onChangeIncludeSticky = this.onChangeIncludeSticky.bind(this);
    this.onChangeShowExcerpts = this.onChangeShowExcerpts.bind(this);
    this.onChangeShowMeta = this.onChangeShowMeta.bind(this);
    this.onChangeShowImg = this.onChangeShowImg.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeBackgroundColor = this.onChangeBackgroundColor.bind(this);
    this.onChangeImgBorderColor = this.onChangeImgBorderColor.bind(this);
    this.onChangeRoundImg = this.onChangeRoundImg.bind(this);
    this.onChangeNumberPosts = this.onChangeNumberPosts.bind(this);
    this.onChangePostsPerRow = this.onChangePostsPerRow.bind(this);
    this.onChangeImgBorder = this.onChangeImgBorder.bind(this);

    this.onChangeTextFontSize = this.onChangeTextFontSize.bind(this);
    this.onChangeTitleFontSize = this.onChangeTitleFontSize.bind(this);
    this.onChangeAlignTitle = this.onChangeAlignTitle.bind(this);
    this.onChangeAlignText = this.onChangeAlignText.bind(this);
    this.onChangeReadMoreText = this.onChangeReadMoreText.bind(this);

    this.previewPost = this.previewPost.bind(this);
  }


  getOptions() {
    return ( new wp.api.collections.Categories() ).fetch().then( ( categories ) => {
      if( categories && 0 !== this.state.selectedCategory ) {
        // If we have a selected Post, find that post and add it.
        const category = categories.find( ( item ) => { return item.id == this.state.selectedCategory } );
        // This is the same as { post: post, posts: posts }
        this.setState( { category, categories } );

      } else {
        this.setState({ categories });
      }
    });
  }



  getInspectorControls( options ) {

     return(
        <div>
           <InspectorControls>
           <PanelBody
           title="Main settings">

           <PanelRow className="category-select">
           <SelectControl
              onChange={this.onChangeSelectCategory}
              value={ this.props.attributes.selectedCategory }
              label={ __( 'Select a Category' ) }
              options={ options }
              className="category-select"
           />
           </PanelRow>
           </PanelBody>

           <PanelBody title="Options">
           <ToggleControl
             label="include Sticky Posts?"
             checked={ !! this.props.attributes.includeSticky }
             onChange={ this.onChangeIncludeSticky }
             className="link-type"
           />
           <RangeControl
            label="Number of Posts to Show"
            help="default is 3"
            value={ this.props.attributes.numberPosts }
            onChange={ this.onChangeNumberPosts }
            min={ 0 }
            max={ 20 }
           />
           <RangeControl
            label="Number of Posts per Row"
            help="default is 3"
            value={ this.props.attributes.postsPerRow }
            onChange={ this.onChangePostsPerRow }
            min={ 0 }
            max={ 5 }
           />
           <ToggleControl
             label="Show Excerpts?"
             checked={ !! this.props.attributes.showExcerpts }
             onChange={ this.onChangeShowExcerpts }
             className="link-type"
           />
           <ToggleControl
             label="Show Meta?"
             help="author name, date, etc."
             checked={ !! this.props.attributes.showMeta }
             onChange={ this.onChangeShowMeta }
             className="link-type"
           />
           <ToggleControl
             label="Show Featured Image?"
             checked={ !! this.props.attributes.showImg }
             onChange={ this.onChangeShowImg }
             className="link-type"
           />
           <TextControl
              placeholder= 'Read More Link Text'
              label="label for 'read more' button"
              value={ this.props.attributes.readMoreText }
              onChange={ this.onChangeReadMoreText }
              keepPlaceholderOnFocus={true}
           />
           </PanelBody>
           <PanelBody title="Title Styles">
           <FontSizePicker
             fontSizes= {[
                 {
                   name: __( 'Small Title' ),
                   slug: 'title-extra-small',
                   size: '16',
                 },
                 {
                   name: __( 'Normal Title' ),
                   slug: 'title-small',
                   size: '20',
                 },
                 {
                   name: __( 'Medium Title' ),
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
             fallbackFontSize='20'
             onChange={ this.onChangeTitleFontSize }
           />
           <SelectControl
             label="Title Alignment"
             value={ this.props.attributes.alignTitle }
             options={ [
               { label: 'Left', value: 'left' },
               { label: 'Center', value: 'center' },
               { label: 'Right', value: 'right' },
             ] }
             onChange={ this.onChangeAlignTitle }
           />

           </PanelBody>
           <PanelBody title="Text Styles">
           <FontSizePicker
             fontSizes= {[
                 {
                   name: __( 'X-Small Body' ),
                   slug: 'title-extra-small',
                   size: '12',
                 },
                 {
                   name: __( 'Small Body' ),
                   slug: 'title-small',
                   size: '14',
                 },
                 {
                   name: __( 'Normal Body' ),
                   slug: 'title-normal',
                   size: '16',
                 },
                 {
                   name: __( 'Medium Body' ),
                   slug: 'title-normal',
                   size: '18',
                 },
                 {
                   name: __( 'Large Body' ),
                   slug: 'title-large',
                   size: '20',
                 },
                 {
                   name: __( 'X-Large Body' ),
                   slug: 'title-extra-large',
                   size: '24',
                 },
             ] }
             value={ this.props.attributes.textFontSize }
             fallbackFontSize='18'
             onChange={ this.onChangeTextFontSize }
           />
           <SelectControl
             label="Text Alignment"
             value={ this.props.attributes.alignText }
             options={ [
               { label: 'Left', value: 'left' },
               { label: 'Center', value: 'center' },
               { label: 'Right', value: 'right' },
             ] }
             onChange={ this.onChangeAlignText }
           />

           </PanelBody>

           <PanelBody title="Styles">
           {
           this.props.attributes.showImg && (

           <div>
           <RangeControl
            label="Image Border Radius"
            help="increase to round edges of image"
            value={ this.props.attributes.roundImg }
            onChange={ this.onChangeRoundImg }
            className="display-block"
            min={ 0 }
            max={ 50 }
           />

           <RangeControl
            label="Image Border"
            help="set to 0 for no border"
            value={ this.props.attributes.imgBorder }
            onChange={ this.onChangeImgBorder }
            className="display-block"
            min={ 0 }
            max={ 20 }
           />
           </div>
            )
            }
            </PanelBody>

           <PanelColorSettings
            title={ __('Colors', 'blueprint-blocks') }
            initialOpen={false}
            colorSettings= { [
           {
           value: this.props.attributes.color,
           onChange:  this.onChangeColor,
           label: __('Text Color', 'blueprint-blocks'),
           },
           {
           value: this.props.attributes.backgroundColor,
           onChange: this.onChangeBackgroundColor,
           label: __('Background Color', 'blueprint-blocks'),
           },
           {
           value: this.props.attributes.imgBorderColor,
           onChange: this.onChangeImgBorderColor,
           label: __('Image Border Color', 'blueprint-blocks'),
           },
           ] }
           />
           </InspectorControls>
        </div>
     );
  }

  onChangeSelectCategory( value ) {
      // Find the category
      const category = this.state.categories.find( ( item ) => { return item.id == parseInt( value ) } );
      // Set the state
      this.setState( {
        selectedCategory: parseInt( value ), category,
      } );
      // Set the attributes
      this.props.setAttributes( {
            selectedCategory: parseInt( value ),
            displaySettings : {
            showMeta: 'hide',
            includeSticky: 'show',
            showImg:'show'``,
            showExcerpts:'show',
          },
      } );
  }

  onChangeTitleFontSize( newValue) {
    if( newValue !== undefined ) {
      this.props.setAttributes( { titleFontSize: newValue });
    } else {
      this.props.setAttributes( { titleFontSize: '20' });
    }
  }

  onChangeTextFontSize( newValue) {
    if( newValue !== undefined ) {
      this.props.setAttributes( { textFontSize: newValue });
    } else {
      this.props.setAttributes( { textFontSize: '18' });
    }
  }

  onChangeIncludeSticky() {
    if ( this.props.attributes.includeSticky ) {
       this.props.setAttributes( { includeSticky: false } );
    } else {
       this.props.setAttributes( { includeSticky: true } );

    }
  }
  onChangeShowExcerpts() {
    if ( this.props.attributes.showExcerpts ) {
       this.props.setAttributes( { showExcerpts: false } );
    } else {
       this.props.setAttributes( { showExcerpts: true } );
    }
  }
  onChangeShowMeta() {
    if ( this.props.attributes.showMeta ) {
       this.props.setAttributes( { showMeta: false } );
    } else {
       this.props.setAttributes( { showMeta: true } );
    }
  }
  onChangeShowImg() {
    if ( this.props.attributes.showImg ) {
       this.props.setAttributes( { showImg: false } );
    } else {
       this.props.setAttributes( { showImg: true } );
    }
  }

  onChangeAlignTitle( newValue ) {
    this.props.setAttributes({ alignTitle : newValue });
  }
  onChangeAlignText( newValue ) {
    this.props.setAttributes({ alignText: newValue });
  }
  onChangeColor( newValue ) {
    this.props.setAttributes({ color: newValue });
  }
  onChangeBackgroundColor( newValue ) {
    this.props.setAttributes({ backgroundColor: newValue });
  }
  onChangeImgBorderColor( newValue ) {
    this.props.setAttributes({ imgBorderColor: newValue });
  }
  onChangeRoundImg( newValue ) {
    this.props.setAttributes({ roundImg: newValue });
  }
  onChangeNumberPosts( newValue ) {
    this.props.setAttributes({ numberPosts: newValue });
  }
  onChangePostsPerRow( newValue ) {
    this.props.setAttributes({ postsPerRow: newValue });
  }
  onChangeImgBorder( newValue ) {
    this.props.setAttributes({ imgBorder: newValue });
  }
  onChangeReadMoreText( newValue ) {
    this.props.setAttributes({ readMoreText : newValue });
  }

  previewPost() {
    const showExcerpts = this.props.attributes.showExcerpts;
    const showMeta = this.props.attributes.showMeta;

    const showImg = this.props.attributes.showImg;
    const roundImg = this.props.attributes.roundImg;
    const imgBorder = this.props.attributes.imgBorder;
    const imgBorderColor = this.props.attributes.imgBorderColor;

    const backgroundColor = this.props.attributes.backgroundColor;
    const color = this.props.attributes.color;

    const textSize = this.props.attributes.textFontSize;
    const titleSize = this.props.attributes.titleFontSize;
    const alignTitle  = this.props.attributes.alignTitle;
    const alignText = this.props.attributes.alignText;

    let postClass = 'blueprint-recent-posts';

    if( backgroundColor ) {
      postClass += ' has-background';
    }

    let postStyle = {
      color: color,
      backgroundColor: backgroundColor,
      fontSize: textSize + 'px',
      textAlign: alignText,
    }
    let imgStyle = {};
    if( imgBorder > 0 ) {
      imgStyle.borderSize = imgBorder + 'px';
      imgStyle.borderStyle = 'solid';
      imgStyle.borderColor = imgBorderColor;
    }
    if( roundImg > 0 ) {
      imgStyle.borderRadius = roundImg + '%';
    }

    let titleStyle = {
      color: color,
      backgroundColor: backgroundColor,
      fontSize: titleSize + 'px',
      textAlign: alignTitle,
    }

    let metas = ['published 2/4/30 by Virginia Woolf', 'published 6/16/82 by Toni Morrison', 'published 4/13/20 by Willa Cather', 'published 9/2/42 by Zora Neale Hurston', 'published 8/17/69 by Harper Lee', 'published 4/18/75 by Simone de Beauvoir'];
    let meta = metas[Math.floor(Math.random()*metas.length)];

    let titles = ['Inceptos Justo Ornare Cras', 'Egestas Ultricies Malesuada', 'Elit Ipsum Euismod Etiam', 'Pellentesque Sollicitudin', 'Justo Tortor Pellentesque'];
    let title= titles[Math.floor(Math.random()*titles.length)];

    let excerpt = 'Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit sit amet non magna.';

    let images = ['http://lorempixel.com/400/400/cats/1', 'http://lorempixel.com/400/400/cats/6', 'http://lorempixel.com/400/400/cats/3', 'http://lorempixel.com/400/400/cats/4', 'http://lorempixel.com/400/400/cats/5', 'http://lorempixel.com/400/400/cats/7', 'http://lorempixel.com/400/400/cats/8', 'http://lorempixel.com/400/400/cats/9', 'http://lorempixel.com/400/400/cats/10'];

    let imgURL = images[Math.floor(Math.random()*images.length)];

    return(
      <div className={ postClass }
      style={ postStyle }>
      {
        this.props.attributes.showImg && (
          <div class="image-feature">
          <img src={ imgURL } style={ imgStyle }/>
          </div>
        )
      }
      <h3 className="post-title" style={ titleStyle }>{ title }</h3>
      {
        this.props.attributes.showMeta && (
          <div className="post-meta">{ meta }</div>
        )
      }
      {
        this.props.attributes.showExcerpts && (
          <div className="excerpt">
          { excerpt }
          <a className="read-more-link" style={ postStyle }> Read More &raquo;</a>
          </div>
        )
      }
      </div>
    );
  }

  render() {

    let options = [ { value: null, label: __( 'Select A Category (optional) ' ) } ];
    let message = '';
    let previewClass = 'block-preview';


    this.props.className += ' loading';

    if( this.state.categories.length > 0 ) {

      this.state.categories.forEach( ( category ) => {
            options.push({
              value:category.id,
              label:category.name,
            })
        });

    }  else {
      message =  'No Post Categories found.';
    }

    // Checking if we have anything in the object
    if( this.state.category !== undefined && this.state.category.hasOwnProperty('name')) {

      this.props.className += ' has-category';

    } else {
      this.props.className += ' no-category';
    }

    if( this.props.attributes.category !== undefined ) {
      previewClass = 'block-preview active-preview';
    }

    const postsPerRow = this.props.attributes.postsPerRow;


    switch( postsPerRow ) {
      case 1:
      this.props.className +=' one-across';
      break;
      case 2:
      this.props.className += ' two-across';
      break;
      case 4:
      this.props.className += ' four-across';
      break;
      case 5:
      this.props.className += ' five-across';
      break;
      default:
      this.props.className += ' three-across';
    }



    const previewPosts = [];
    const numPosts = this.props.attributes.numberPosts;


    for (var i = 0; i < numPosts; i++) {
      previewPosts.push( this.previewPost() );
    }

     return (

          <div
          className={ this.props.className }>

          { this.getInspectorControls( options ) }

              <div className="inner">
              { previewPosts }
              </div>
          </div>
        )
    }
}

registerBlockType( 'blueprint-blocks/recent-posts', {
	title: __( 'Recent Posts' ),
	icon: 'admin-post',
	category: 'blueprint-blocks',
	keywords: [
		    __( 'Posts' ),
        __( 'Post Grid' ),
	],
  supports: {
    align: [ 'center', 'wide', 'full' ],
  },
	attributes: {
        selectedCategory:{
          type: 'integer',
        },
        includeSticky: {
          type: 'boolean',
          default: true,
        },
        numberPosts: {
          type: 'integer',
          default: 3,
        },
        postsPerRow: {
          type: 'integer',
          default: 3,
        },
        showExcerpts: {
          type: 'boolean',
          default: true,
        },
        showMeta: {
          type: 'boolean',
          default: false,
        },
        showImg: {
          type: 'boolean',
          default: true,
        },
        roundImg:{
          type: 'integer',
          default: 50,
        },
        imgBorder: {
          type: 'integer',
          default: 2,
        },
        backgroundColor: {
          type:'string',
        },
        color: {
          type:'string',
        },
        imgBorderColor: {
          type:'string',
        },
        titleFontSize: {
           type: 'integer',
           default: '20',
         },
        textFontSize: {
          type: 'integer',
          default: '18',
        },
        alignText: {
          type: 'string',
          default: 'center',
        },
        alignTitle: {
          type: 'string',
          default: 'center',
        },
        readMoreText: {
          type: 'string',
          default: 'Read More',
        },
	  },

	edit: editRecentPosts,

	save: function( props ) {

		return (
      null
		  )
	},
} );
