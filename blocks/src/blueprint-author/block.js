/**
 * BLOCK: Blueprint Author
 *
 * Author Profile + Photo and Social Links
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { SelectControl, ToggleControl, RangeControl, TextControl, Panel, PanelBody, PanelRow } = wp.components;
const { Component } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, PanelColorSettings  } = wp.editor;
const { dispatch, select } = wp.data;


const TEMPLATE = [
	['blueprint-blocks/social-link', {}, []],
];


class myAuthorEdit extends Component {
    static getInitialState( selectedAuthor ) {
		return {
          authors: [],
          selectedAuthor: selectedAuthor,
          author: {}
		      };
    }


    constructor() {
        super( ...arguments );

        this.state = this.constructor.getInitialState( this.props.attributes.selectedAuthor );

        this.getAuthors = this.getAuthors.bind(this);
        this.getAuthors();

        this.getBlueprintApi = this.getBlueprintApi.bind(this);
        this.getBlueprintApi();

        this.getInspectorControls = this.getInspectorControls.bind(this);
        this.getBlockSettings = this.getBlockSettings.bind(this);

        this.onChangeSelectAuthor = this.onChangeSelectAuthor.bind(this);

        this.onSelectImage = this.onSelectImage.bind(this);
        this.onChangeProfileTitle = this.onChangeProfileTitle.bind(this);
        this.onChangeAuthorDescription = this.onChangeAuthorDescription.bind(this);
        this.onChangeTextColor = this.onChangeTextColor.bind(this);
        this.onChangeBGColor = this.onChangeBGColor.bind(this);
        this.onChangeCircleImage = this.onChangeCircleImage.bind(this);
        this.onChangeImgBorder = this.onChangeImgBorder.bind(this);
        this.onChangeBorderWidth = this.onChangeBorderWidth.bind(this);
        this.onChangeImageBorderColor = this.onChangeImageBorderColor.bind(this);
        this.onChangeShowReadMore = this.onChangeShowReadMore.bind(this);
        this.onChangeReadMoreText = this.onChangeReadMoreText.bind(this);
        this.onChangeReadMoreLink = this.onChangeReadMoreLink.bind(this);
        this.onChangeButtonColor = this.onChangeButtonColor.bind(this);
        this.onChangeButtonBGColor = this.onChangeButtonBGColor.bind(this);
        this.onChangeButtonAlign = this.onChangeButtonAlign.bind(this);
        this.onChangeMaxWidthInner = this.onChangeMaxWidthInner.bind(this);
    }


    getAuthors() {

        const Author = wp.api.models.Taxonomy.extend( {
            urlRoot: wpApiSettings.root + 'wp/v2/mbt_author',
            } );
        const Authors = wp.api.collections.Taxonomies.extend( {
            url: wpApiSettings.root + 'wp/v2/mbt_author',
            } );

        const theAuthors = new Authors();


        theAuthors.fetch().then( ( authors ) => {

            if( authors && 0 !== this.state.selectedAuthor ) {
                // If we have a selected Post, find that post and add it.
                const author = authors.find( ( item ) => { return item.id == this.state.selectedAuthor } );

                this.setState( { author, authors, } );

                } else {
                   this.setState({ authors });
                }
        });

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
                mbtActive: blueprint.mbt_active
            } );

        });
    }

    getInspectorControls( options ) {
       return(
          <InspectorControls>
            <PanelBody
            title="Profile Settings"
            initialOpen={ true }
            className="blueprint-panel-body">


          {
            this.props.attributes.mbtActive && (
            <PanelRow className="author-select">
              <SelectControl
              onChange={this.onChangeSelectAuthor}
              value={ this.props.attributes.selectedAuthor }
              label={ __( 'Select an Author' ) }
              options={ options }
              className="author-select"
              />
            </PanelRow>
            )
          }

          {
            this.props.attributes.align === 'full' && (
              <PanelRow
                className="width-control">
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


          <PanelRow className="display-block parent">
            <ToggleControl
            label="Show 'Read More' Link?"
            checked={ !!this.props.attributes.showReadMore }
            onChange={ this.onChangeShowReadMore }
            />

          {
          this.props.attributes.showReadMore && (
            <PanelRow
            className="display-block parent">
            <TextControl
            placeholder= 'Read More'
            value={ this.props.attributes.readMoreText }
            onChange={ this.onChangeReadMoreText }
            keepPlaceholderOnFocus={true}
            />

            <TextControl
            placeholder='http://my-author-profile-link.com'
            value={ this.props.attributes.readMoreLink }
            onChange={ this.onChangeReadMoreLink }
            keepPlaceholderOnFocus={true}
            />
            <SelectControl
              label="Align Button:"
              value={ this.props.attributes.alignReadMore }
              options={ [
                { label: 'Left', value: 'btn-left' },
                { label: 'Center', value: 'btn-center' },
                { label: 'Right', value: 'btn-right' },
              ] }
              onChange={ this.onChangeButtonAlign }
            />
            </PanelRow>
            )
          }
          </PanelRow>

          <PanelRow className="display-block parent">
            <ToggleControl
            label="Circular Profile Image"
            checked={ !!this.props.attributes.circleImage }
            onChange={ this.onChangeCircleImage }
            className="circle-image"
            />
          </PanelRow>

          <PanelRow className="display-block parent width-control">
            <ToggleControl
            label="Image Border"
            checked={ !!this.props.attributes.imgBorder }
            onChange={ this.onChangeImgBorder }
            className="image-border"
            />
          {
          this.props.attributes.imgBorder && (
            <RangeControl
             label="Border Width"
             value={ this.props.attributes.imgBorderWidth }
             onChange={ this.onChangeBorderWidth }
             min={ 0 }
             max={ 20 }
            />
          )
          }
          </PanelRow>
          </PanelBody>


          <PanelColorSettings
            title={ __('Block Colors', 'blueprint-blocks') }
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

          {
          this.props.attributes.showReadMore && (
            <PanelColorSettings
              title={ __('Button Colors', 'blueprint-blocks') }
              initialOpen={false}
              className="parent"
              colorSettings={ [
              {
                value: this.props.attributes.buttonColor,
                onChange: this.onChangeButtonColor,
                label: __('Read More Button Color', 'blueprint-blocks'),
              },
              {
                value: this.props.attributes.buttonBG,
                onChange: this.onChangeButtonBGColor,
                label: __('Button Background Color', 'blueprint-blocks'),
              },
            ] }
            />

          )
          }

          {
          this.props.attributes.imgBorder && (

            <PanelColorSettings
              title={ __('Image Border Color', 'blueprint-blocks') }
              initialOpen={true}
              colorSettings= { [
              {
                value: this.props.attributes.imgBorderColor,
                onChange: this.onChangeImageBorderColor,
                label: __('Image Border Color', 'blueprint-blocks'),
              },
            ] }
            />
          )
          }

          </InspectorControls>
       );
    }

    onChangeSelectAuthor( value ) {
        // Find the author
        const author = this.state.authors.find( ( item ) => { return item.id == parseInt( value ) } );


        // Set the state
        this.setState( {
          selectedAuthor: parseInt( value ), author,
          authorLink: author.link,
        } );

        // Set the attributes
        this.props.setAttributes( {
            selectedAuthor: parseInt( value ),
            //authorName: author.name,
            authorDescription: author.description,
            profileTitle: author.name,
            readMoreLink: author.link,
        } );
    }

    onSelectImage( value ) {
        this.props.setAttributes({
            imgUrl: value.sizes.full.url,
        })
    }

    onChangeProfileTitle( newValue ) {
        this.props.setAttributes( { profileTitle: newValue } );
    }

    onChangeAuthorDescription( newValue ) {
      this.props.setAttributes( { authorDescription: newValue } );
    }

    onChangeTextColor( newValue) {
        this.props.setAttributes( { colorText: newValue });
    }

    onChangeBGColor( newValue) {
      this.props.setAttributes( { colorBG: newValue });
    }

    onChangeCircleImage( newValue) {
      if ( this.props.attributes.circleImage ) {
         this.props.setAttributes( { circleImage: false } );
      } else {
         this.props.setAttributes( { circleImage: true } );
      }
    }

    onChangeImgBorder( newValue) {
      if ( this.props.attributes.imgBorder ) {
         this.props.setAttributes( { imgBorder: false } );
      } else {
         this.props.setAttributes( { imgBorder: true } );
      }
    }

    onChangeBorderWidth( newValue) {
      this.props.setAttributes( { imgBorderWidth: newValue });
    }

    onChangeImageBorderColor( newValue) {
      this.props.setAttributes( { imgBorderColor: newValue });
    }

    onChangeShowReadMore( newValue) {

      const currentAuthor = this.state.author;
      let authorLink = currentAuthor.link;

      if( this.props.attributes.readMoreLink ) {
        authorLink = this.props.attributes.readMoreLink;
      }

      if ( this.props.attributes.showReadMore ) {
        this.props.setAttributes( { showReadMore: false } );
      } else {
        this.props.setAttributes( { showReadMore: true,} );
      }

      this.onChangeReadMoreLink( authorLink );
    }

    onChangeReadMoreText( newValue) {
      this.props.setAttributes( { readMoreText: newValue });
    }

    onChangeReadMoreLink( newValue) {
      this.props.setAttributes( { readMoreLink: newValue });
    }

    onChangeButtonAlign( newValue ) {
      this.props.setAttributes({ alignReadMore: newValue });
    }

    onChangeButtonColor( newValue) {
      this.props.setAttributes( { buttonColor: newValue });
    }

    onChangeButtonBGColor( newValue) {
      this.props.setAttributes( { buttonBG: newValue });
    }

    onChangeMaxWidthInner( newValue) {
      this.props.setAttributes( { maxWidthInner: newValue });
    }

    getBlockSettings( options, message ) {
       return(

       this.props.attributes.mbtActive ? (

            <div className="blueprint-block-settings">
            <div className="blueprint-block-message">{ message }</div>
            <SelectControl
               onChange={this.onChangeSelectAuthor}
               value={ this.props.attributes.selectedAuthor }
               label={ __( 'Select an Author' ) }
               options={ options }
               className="author-select"
            />
            </div>

          ) : (

            <div className="blueprint-block-settings">
            <div className="blueprint-block-message">
            <span>MyBookTable is not active.</span>
            <span> Please activate <a href="https://wordpress.org/plugins/mybooktable/" target="_blank">MyBookTable</a> and create Authors first.</span>
            </div>
            </div>

          )
       );
    }

    render() {
        let blockStyle = {};
        let borderStyle = {};
        let buttonClass = 'button button-primary';
        let buttonStyle = {};
        let h3Style = {};
        let mediaClass = 'media';
        let message = '';
        let options = [ { value: 0, label: __( 'Select an Author' ) } ];
        let placeholder = 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.';
        let spanStyle = {};


        if( this.state.authors.length > 0 ) {
            this.state.authors.forEach( ( author ) => {
            options.push({ value:author.id, label:author.name });
            });

        } else {
            message = 'No authors found - please install MyBookTable or create author first.'
        }

        // Checking if we have anything in the object
        if( this.state.author !== undefined && this.state.author.hasOwnProperty('name')) {
            output = <div className="author">
            <a href={ this.state.author.link }>
                { this.state.author.name }
            </a>
            </div>;

        }


        if( this.props.attributes.buttonBG || this.props.attributes.buttonColor ) {
          buttonClass = 'custom button';
          buttonStyle = {
                backgroundColor: props.attributes.buttonBG,
                color: props.attributes.buttonColor,
              };
        }

        if( this.props.attributes.circleImage ) {
          mediaClass += ' circle';
        }

        if( this.props.attributes.imgBorder ) {
          borderStyle = {
            borderWidth: `${this.props.attributes.imgBorderWidth}px`,
            borderColor: this.props.attributes.imgBorderColor,
            borderStyle: 'solid',
          };
        }

        if( this.props.attributes.colorText ) {
          blockStyle = {
            color: this.props.attributes.colorText
          }
          h3Style = {
            color: this.props.attributes.colorText,
            borderColor: this.props.attributes.colorText,
          }
        }
        if( this.props.attributes.colorBG ) {
          blockStyle = {
            backgroundColor: this.props.attributes.colorBG
          }
          spanStyle = {
            backgroundColor: this.props.attributes.colorBG
          }
          this.props.className += ' has-background-color';
        }
        if( this.props.attributes.colorText && this.props.attributes.colorBG ) {
          blockStyle = {
            color: this.props.attributes.colorText,
            backgroundColor: this.props.attributes.colorBG
          }
        }

		return (
            <div className={ this.props.className +  ' author-' + this.props.attributes.selectedAuthor  }
              style={ blockStyle }>

            { this.getInspectorControls(options) }


            {
              this.props.attributes.selectedAuthor ? (

                null
              ) : (

                this.getBlockSettings( options, message )
              )
            }

            <div className="profile-preview">

            {
              this.props.attributes.profileTitle && (

                <h3 className="profile-title" style={ h3Style }>
                <RichText
                    tagName='span'
                    placeholder= { 'Author Name' }
                    className="author-name"
                    value={ this.props.attributes.profileTitle }
                    onChange={ this.onChangeProfileTitle }
                    keepPlaceholderOnFocus={true}
                    style={ spanStyle }
                    />
                </h3>

              )
            }
            {
              this.props.attributes.selectedAuthor && (
                <div className="inner is-flex">

                <div className="profile-main">

                <MediaUpload
                    onSelect={this.onSelectImage}
                    render={ ({ open }) => {
                        return <div className={ mediaClass }>
                                <span
                                  className="dashicons dashicons-edit edit-media"
                                  onClick={ open }></span>
                                <img
                                  src={ this.props.attributes.imgUrl }
                                  onClick={ open }
                                  className="profile-image"
                                  style={ borderStyle }
                                /></div>;
                    }}
                  />

                  <div class="profile">
                    <RichText
                        tagName='div'
                        placeholder='Short Description or Bio'
                        className="author-blurb"
                        value={ this.props.attributes.authorDescription }
                        onChange={ this.onChangeAuthorDescription }
                        keepPlaceholderOnFocus={ false }
                        />

                        {
                          this.props.attributes.showReadMore &&
                          this.props.attributes.readMoreLink && (
                            <div className={ "bpb-more-link " + this.props.attributes.alignReadMore }>
                              <a
                                className={ buttonClass + ' readMoreLink' }
                                href={ this.props.attributes.readMoreLink }
                                style={ buttonStyle }>
                                { this.props.attributes.readMoreText }
                              </a>
                            </div>
                           )
                        }
                  </div>
                </div>

                <div className="social-icons">
                    <InnerBlocks
                      allowedBlocks={ ['blueprint-blocks/social-link'] }
                      template={ TEMPLATE }
                    />
                </div>

                </div>
              )
            }
            </div>
            </div>
		)
	}
}



registerBlockType( 'blueprint-blocks/blueprint-author', {
	title: __( 'Author Profile' ),
	icon: 'admin-users',
	category: 'blueprint-blocks',
	keywords: [
		__( 'Author' ),
    __( 'Blueprint' ),
    __( 'Profile' ),
	],
  supports: {
    align: [ 'center', 'wide', 'full'  ],
    anchor: true,
  },
	attributes: {
        selectedAuthor: {
          type: 'number',
          default: null,
        },
        alignReadMore: {
          type: 'string',
          selector: '.bpb-more-link',
          attribute: 'class',
          source: 'attribute',
          default: 'btn-left',
        },
        authorDescription: {
          type: 'string',
          selector: '.author-blurb',
          source: 'html',
        },
        profileTitle: {
          type: 'string',
          selector: '.author-name',
          source: 'html',
        },
        imgUrl: {
          type: 'string',
          default: 'https://via.placeholder.com/300/CBF0FF/006187',
          selector: 'img'
        },
        buttonBG: {
            type: 'string',
        },
        buttonColor: {
            type: 'string',
        },
        circleImage: {
            type: 'boolean',
            default: false,
        },
        colorBG: {
            type: 'string',
        },
        colorText: {
            type: 'string',
        },
        imgBorderColor: {
            type: 'string',
            default: '#000',
        },
        imgBorder: {
            type: 'boolean',
            default: false,
        },
        imgBorderWidth: {
            type: 'integer',
            default: 2,
        },
        maxWidthInner: {
          type: 'integer',
          default: 1020,
        },
        mbtActive: {
          type: 'boolean',
          default: true,
        },
        readMoreLink: {
            type: 'string',
            default: null,
            source: 'attribute',
            attribute: 'href',
            selector: '.readMoreLink',
        },
        readMoreText: {
            type: 'string',
            default: 'Read More',
        },
        showReadMore: {
            type: 'boolean',
            default: false,
        },
	  },

	edit: myAuthorEdit,

	save: function( props ) {
		let imgUrl = props.attributes.imgUrl;
    let imgDefault = 'https://via.placeholder.com/300/CBF0FF/006187';
    let mediaClass = "media";
    let buttonClass = 'button button-primary';
    let buttonStyle = {};
    let blockStyle = {};
    let h3Style = {};
    let spanStyle = {};
    let customClass = null;
    let innerStyle = {};
    let profileClass = 'profile-main';



    if( props.attributes.align === 'full' ) {
      innerStyle = {
        width: props.attributes.maxWidthInner,
      }
    }

    if( props.attributes.circleImage ) {
      mediaClass += ' circle';
      profileClass = 'profile-main circle-left';
    }

    if( imgUrl === imgDefault ) {
      imgUrl = null;
    }

    if( props.attributes.buttonBG || props.attributes.buttonColor ) {
      buttonClass = 'custom button';
      buttonStyle = {
        backgroundColor: props.attributes.buttonBG,
        color: props.attributes.buttonColor,
      };
    }

    if( props.attributes.colorText ) {
      blockStyle = {
        color: props.attributes.colorText
      }
      h3Style = {
        color: props.attributes.colorText,
        borderColor: props.attributes.colorText,
      }
    }
    if( props.attributes.colorBG ) {
      blockStyle = {
        backgroundColor: props.attributes.colorBG
      }
      spanStyle = {
        backgroundColor: props.attributes.colorBG
      }
      customClass = ' has-background-color';

    }
    if( props.attributes.colorText && props.attributes.colorBG ) {
      blockStyle = {
        color: props.attributes.colorText,
        backgroundColor: props.attributes.colorBG
      }
    }

    let borderStyle = {};
    if( props.attributes.imgBorder ) {
          borderStyle = {
            borderWidth: `${props.attributes.imgBorderWidth}px`,
            borderColor: props.attributes.imgBorderColor,
            borderStyle: 'solid',
          };
        }


		return (

      props.attributes.selectedAuthor && (

			<div className={ props.className + customClass + ' author-' + props.attributes.selectedAuthor }
        style={ blockStyle }>

        <div
          className="inner-wrap"
          style={ innerStyle }>

        <h3 className="profile-title"
          style={ h3Style }>
        <RichText.Content
            tagName='span'
            className="author-name"
            value={ props.attributes.profileTitle }
            style={ spanStyle }
            />
        </h3>

        <div
          className="inner is-flex">

            <div className={ profileClass }>
            {
              imgUrl && (
                <div className={ mediaClass }>
                <img
                  src={ props.attributes.imgUrl }
                  className="profile-image"
                  style={ borderStyle }/>
                </div>
              )
            }

            <div className="profile">

              <RichText.Content
                className="author-blurb"
                tagName='div'
                multiline='p'
                value={ props.attributes.authorDescription }
               />

               {
                 props.attributes.showReadMore &&
                 props.attributes.readMoreLink && (
                   <div className={ "bpb-more-link " + props.attributes.alignReadMore }>
                     <a
                      className={ buttonClass  + ' readMoreLink' }
                       href={ props.attributes.readMoreLink }
                       style={ buttonStyle }>
                        { props.attributes.readMoreText }
                     </a>
                   </div>
                  )
               }
            </div>
            </div>

            <div className="blueprint-profile-links">
                <InnerBlocks.Content />
            </div>

        </div>
      </div>
      </div>
      )

		  );
	},
} );
