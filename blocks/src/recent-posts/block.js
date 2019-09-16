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
    this.onChangePostBackgroundColor = this.onChangePostBackgroundColor.bind(this);
    this.onChangePostColor = this.onChangePostColor.bind(this);
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

    this.onChangeButtonType = this.onChangeButtonType.bind(this);
    this.onChangeButtonColor = this.onChangeButtonColor.bind(this);
    this.onChangeButtonBorderColor = this.onChangeButtonBorderColor.bind(this);
    this.onChangeButtonBG = this.onChangeButtonBG.bind(this);
    this.onChangeButtonBorder = this.onChangeButtonBorder.bind(this);
    this.onChangeButtonFontSize = this.onChangeButtonFontSize.bind(this);
    this.onChangeButtonBorderRadius = this.onChangeButtonBorderRadius.bind(this);
    this.onChangeAlignButton = this.onChangeAlignButton.bind(this);

    this.onChangeSectionTitle = this.onChangeSectionTitle.bind(this);

    this.previewPost = this.previewPost.bind(this);
    this.previewButton = this.previewButton.bind(this);
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

           <PanelBody
           title="Post Options"
           initialOpen={ false }>
           <ToggleControl
             label="include Sticky Posts?"
             checked={ !! this.props.attributes.ignoreSticky }
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
           </PanelBody>
           <PanelBody
           title="Section Title Settings"
           initialOpen={false}>
             <TextControl
                placeholder= 'Section Title'
                value={ this.props.attributes.sectionTitle }
                onChange={ this.onChangeSectionTitle }
                keepPlaceholderOnFocus={true}
             />
           </PanelBody>
           <PanelBody title="Post Title Styles"
           initialOpen={ false }>
           <FontSizePicker
             fontSizes= {[
                 {
                   name: __( 'X-Small' ),
                   slug: 'title-extra-small',
                   size: '13',
                 },
                 {
                   name: __( 'Small' ),
                   slug: 'title-small',
                   size: '16',
                 },
                 {
                   name: __( 'Normal' ),
                   slug: 'title-normal',
                   size: '18',
                 },
                 {
                   name: __( 'Medium' ),
                   slug: 'title-medium',
                   size: '24',
                 },
                 {
                   name: __( 'Large' ),
                   slug: 'title-large',
                   size: '28',
                 },
                 {
                   name: __( 'X-Large' ),
                   slug: 'title-extra-large',
                   size: '32',
                 },
             ] }
             value={ this.props.attributes.titleFontSize }
             fallbackFontSize='18'
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
           <PanelBody
           title="Text Styles"
           initialOpen={ false }>
           <FontSizePicker
             fontSizes= {[
                 {
                   name: __( 'X-Small' ),
                   slug: 'title-extra-small',
                   size: '12',
                 },
                 {
                   name: __( 'Small' ),
                   slug: 'title-small',
                   size: '14',
                 },
                 {
                   name: __( 'Normal' ),
                   slug: 'title-normal',
                   size: '16',
                 },
                 {
                   name: __( 'Medium' ),
                   slug: 'title-normal',
                   size: '18',
                 },
                 {
                   name: __( 'Large' ),
                   slug: 'title-large',
                   size: '20',
                 },
                 {
                   name: __( 'X-Large' ),
                   slug: 'title-extra-large',
                   size: '24',
                 },
             ] }
             value={ this.props.attributes.textFontSize }
             fallbackFontSize='16'
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

           <PanelBody
           title="Button Settings"
           initialOpen={ false }>
             <TextControl
                placeholder= 'Read More Link Text'
                label="label for 'read more' button"
                value={ this.props.attributes.readMoreText }
                onChange={ this.onChangeReadMoreText }
                keepPlaceholderOnFocus={true}
             />
           <FontSizePicker
             fontSizes= {[
                 {
                   name: __( 'X-Small' ),
                   slug: 'button-extra-small',
                   size: '10',
                 },
                 {
                   name: __( 'Small' ),
                   slug: 'button-mall',
                   size: '12',
                 },
                 {
                   name: __( 'Normal' ),
                   slug: 'button-normal',
                   size: '14',
                 },
                 {
                   name: __( 'Medium' ),
                   slug: 'button-medium',
                   size: '15',
                 },
                 {
                   name: __( 'Large' ),
                   slug: 'button-large',
                   size: '16',
                 },
                 {
                   name: __( 'X-Large' ),
                   slug: 'button-extra-large',
                   size: '18',
                 },
             ] }
             value={ this.props.attributes.buttonFontSize }
             fallbackFontSize='14'
             onChange={ this.onChangeButtonFontSize }
           />
           <SelectControl
             label="Button Type"
             value={ this.props.attributes.buttonType }
             options={ [
               { label: 'Outlined', value: 'outlined' },
               { label: 'Solid', value: 'solid' },
               { label: 'Inline Text', value: 'inline' },
             ] }
             onChange={ this.onChangeButtonType }
           />
           {
             this.props.attributes.buttonType !== 'inline' && (
               <SelectControl
                 label="Button Alignment"
                 value={ this.props.attributes.alignButton }
                 options={ [
                   { label: 'Left', value: 'left' },
                   { label: 'Center', value: 'center' },
                   { label: 'Right', value: 'right' },
                 ] }
                 onChange={ this.onChangeAlignButton }
               />
             )
           }
           <RangeControl
            label="Button Border Radius"
            value={ this.props.attributes.buttonBorderRadius }
            onChange={ this.onChangeButtonBorderRadius }
            min={ 0 }
            max={ 20 }
           />
           {
             this.props.attributes.buttonType === 'outlined' && (
             <RangeControl
              label="Button Border Size"
              value={ this.props.attributes.buttonBorder }
              onChange={ this.onChangeButtonBorder }
              min={ 0 }
              max={ 10 }
             />
             )
           }
           {
             this.props.attributes.buttonType === 'outlined' ? (
               <PanelColorSettings
                title={ __('Button Colors', 'blueprint-blocks') }
                initialOpen={false}
                colorSettings= { [
               {
               value: this.props.attributes.buttonColor,
               onChange:  this.onChangeButtonColor,
               label: __('Button Text Color', 'blueprint-blocks'),
               },
               {
               value: this.props.attributes.buttonBorderColor,
               onChange: this.onChangeButtonBorderColor,
               label: __('Button Border Color', 'blueprint-blocks'),
               },
               ] }
               />
             ) : (
               <PanelColorSettings
                title={ __('Button Colors', 'blueprint-blocks') }
                initialOpen={false}
                colorSettings= { [
                  {
                  value: this.props.attributes.buttonColor,
                  onChange:  this.onChangeButtonColor,
                  label: __('Button Text Color', 'blueprint-blocks'),
                  },
                  {
                  value: this.props.attributes.buttonBG,
                  onChange: this.onChangeButtonBG,
                  label: __('Button Background Color', 'blueprint-blocks'),
                  },
               ] }
               />
             )
           }
           </PanelBody>

           <PanelBody
           title="Image Settings"
           initialOpen={ false }>
           <ToggleControl
             label="Show Featured Image?"
             checked={ !! this.props.attributes.showImg }
             onChange={ this.onChangeShowImg }
             className="link-type"
           />
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
          {
            this.props.attributes.imgBorder && (
              <PanelColorSettings
                title={ __('Image Border', 'blueprint-blocks') }
                initialOpen={false}
                colorSettings= { [
               {
               value: this.props.attributes.imgBorderColor,
               onChange: this.onChangeImgBorderColor,
               label: __('Image Border Color', 'blueprint-blocks'),
               },
               ] }
               />
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
           value: this.props.attributes.postBackgroundColor,
           onChange: this.onChangePostBackgroundColor,
           label: __('Post Background Color', 'blueprint-blocks'),
           },
           {
           value: this.props.attributes.postColor,
           onChange: this.onChangePostColor,
           label: __('Post Color', 'blueprint-blocks'),
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
            ignoreSticky: 'show',
            showImg:'show'``,
            showExcerpts:'show',
          },
      } );
  }

  onChangeTitleFontSize( newValue) {
    if( newValue !== undefined ) {
      this.props.setAttributes( { titleFontSize: newValue });
    } else {
      this.props.setAttributes( { titleFontSize: '18' });
    }
  }

  onChangeTextFontSize( newValue) {
    if( newValue !== undefined ) {
      this.props.setAttributes( { textFontSize: newValue });
    } else {
      this.props.setAttributes( { textFontSize: '16' });
    }
  }

  onChangeIncludeSticky() {
    if ( this.props.attributes.ignoreSticky ) {
       this.props.setAttributes( { ignoreSticky: false } );
    } else {
       this.props.setAttributes( { ignoreSticky: true } );

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
  onChangePostBackgroundColor( newValue ) {
    this.props.setAttributes({ postBackgroundColor: newValue });
  }
  onChangePostColor( newValue ) {
    this.props.setAttributes({ postColor: newValue });
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
  onChangeButtonType( newValue ) {
    this.props.setAttributes({ buttonType: newValue });
    }
  onChangeButtonColor( newValue ) {
    this.props.setAttributes({ buttonColor: newValue });
    }
  onChangeButtonBorderColor( newValue ) {
    this.props.setAttributes({ buttonBorderColor: newValue });
    }
  onChangeButtonBG( newValue ) {
    this.props.setAttributes({ buttonBG: newValue });
    }
  onChangeButtonBorder( newValue ) {
    this.props.setAttributes({ buttonBorder: newValue });
    }
  onChangeButtonFontSize( newValue ) {
    if( newValue !== undefined ) {
      this.props.setAttributes( { buttonFontSize: newValue });
    } else {
    this.props.setAttributes({ buttonFontSize: '14' });
    }
  }
  onChangeButtonBorderRadius( newValue ) {
    this.props.setAttributes({ buttonBorderRadius: newValue });
    }
  onChangeAlignButton( newValue ) {
    this.props.setAttributes({ alignButton: newValue });
  }
  onChangeSectionTitle( newValue ) {
    this.props.setAttributes( { sectionTitle: newValue });
  }

  previewButton() {
    let btnWrapClass = 'btn-wrap';
    btnWrapClass += ' align-' + this.props.attributes.alignButton;

    let linkClass = 'read-more-link button button-primary';

    let solidBtnStyle = {};
    if( this.props.attributes.buttonBG ) {
      linkClass = 'read-more-link button';
      solidBtnStyle.backgroundColor = this.props.attributes.buttonBG;
    }
    if( this.props.attributes.buttonColor ) {
      solidBtnStyle.color = this.props.attributes.buttonColor;
    }
    if( this.props.attributes.buttonBorderRadius > 0 ) {
      solidBtnStyle.borderRadius = this.props.attributes.buttonBorderRadius + 'px';
    }
    solidBtnStyle.fontSize = this.props.attributes.buttonFontSize + 'px';


    let outlineBtnStyle = {
      backgroundColor: 'transparent',
    };
    if( this.props.attributes.buttonColor ) {
      outlineBtnStyle.color = this.props.attributes.buttonColor;
    }
    if( this.props.attributes.buttonBorderRadius > 0 ) {
      outlineBtnStyle.borderRadius = this.props.attributes.buttonBorderRadius + 'px';
    }
    if( this.props.attributes.buttonBorder > 0 ) {
      outlineBtnStyle.borderWidth = this.props.attributes.buttonBorder + 'px';
      outlineBtnStyle.borderStyle = 'solid';
      outlineBtnStyle.borderColor = this.props.attributes.buttonBorderColor;
    }
    outlineBtnStyle.fontSize = this.props.attributes.buttonFontSize + 'px';


    let btnStyle = '';

    if( this.props.attributes.buttonType === 'solid' ) {
      btnStyle = solidBtnStyle;
    } else {
      btnStyle = outlineBtnStyle;
      linkClass = 'read-more-link button button-outlined';
    }
    btnStyle.height = 'auto';
    btnStyle.lineHeight = '2em';
    btnStyle.paddingTop = '0';
    btnStyle.paddingBottom = '0';
    btnStyle.textShadow = 'none';

    return (
      <div class={ btnWrapClass }>
      <a className={ linkClass } style={ btnStyle }>{ this.props.attributes.readMoreText }</a>
      </div>
    );
  }

  previewPost() {
    const showExcerpts = this.props.attributes.showExcerpts;
    const showMeta = this.props.attributes.showMeta;

    const showImg = this.props.attributes.showImg;
    const roundImg = this.props.attributes.roundImg;
    const imgBorder = this.props.attributes.imgBorder;
    const imgBorderColor = this.props.attributes.imgBorderColor;

    const postBackgroundColor = this.props.attributes.postBackgroundColor;
    const postColor = this.props.attributes.postColor;

    const textSize = this.props.attributes.textFontSize;
    const titleSize = this.props.attributes.titleFontSize;
    const alignTitle  = this.props.attributes.alignTitle;
    const alignText = this.props.attributes.alignText;

    let postClass = 'blueprint-recent-posts';

    if( postBackgroundColor ) {
      postClass += ' has-background';
    }

    let postStyle = {
      color: postColor,
      backgroundColor: postBackgroundColor,
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
      color: postColor,
      backgroundColor: postBackgroundColor,
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

    let inlineButton = false;
    let blockButton = true;
    if( this.props.attributes.buttonType === 'inline' ) {
      inlineButton = true;
      blockButton = false;
    }

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

      <h3 className="post-title" style={ titleStyle }>
      { title }
      </h3>

      {
        this.props.attributes.showMeta && (
          <div className="post-meta">{ meta }</div>
        )
      }

      {
        this.props.attributes.showExcerpts &&
        inlineButton && (

          <div className="excerpt">
            { excerpt }


          <a
          className="read-more-link"
          style={ postStyle }>
          Read More &raquo;
          </a>


          </div>
        )
      }

      {
        this.props.attributes.showExcerpts &&
        blockButton && (

          <div className="excerpt">
            { excerpt }
            <this.previewButton/>
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

    let sectionTitleStyle = {
      color: this.props.attributes.color,
      backgroundColor: this.props.attributes.backgroundColor,
    }


    const previewPosts = [];
    const numPosts = this.props.attributes.numberPosts;


    for (var i = 0; i < numPosts; i++) {
      previewPosts.push( this.previewPost() );
    }

    const backgroundColor = this.props.attributes.backgroundColor;
    const color = this.props.attributes.color;

    let blockStyle = {};

    if( this.props.attributes.backgroundColor ) {
      this.props.className += ' has-background-color';
      blockStyle.backgroundColor = backgroundColor;
    }
    if( this.props.attributes.color ) {
      blockStyle.color = color;
    }


     return (

          <div
          className={ this.props.className }
          style={ blockStyle }>

          { this.getInspectorControls( options ) }

              <h2
              className="section-title">
              <span
              className="title"
              style={ sectionTitleStyle }>
                 { this.props.attributes.sectionTitle }
              </span>
              </h2>

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
        ignoreSticky: {
          type: 'boolean',
          default: false,
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
        postBackgroundColor: {
          type:'string',
        },
        color: {
          type:'string',
        },
        postColor: {
          type: 'string',
        },
        imgBorderColor: {
          type:'string',
        },
        titleFontSize: {
           type: 'integer',
           default: '18',
         },
        textFontSize: {
          type: 'integer',
          default: '16',
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
        buttonType: {
          type: 'string',
          default: 'outlined',
        },
        buttonColor: {
          type: 'string',
        },
        buttonBG: {
          type: 'string',
        },
        buttonBorderColor: {
          type: 'string',
        },
        buttonBorder: {
          type: 'integer',
          default: '2',
        },
        buttonFontSize: {
          type: 'integer',
          default: '14',
        },
        buttonBorderRadius: {
          type: 'integer',
          default:'0'
        },
        alignButton: {
          type: 'string',
          default: 'center',
        },
        sectionTitle: {
          type: 'string',
          default: 'Latest from the Blog',
        },
	  },

	edit: editRecentPosts,

	save: function( props ) {

		return (
      null
		  )
	},
} );
