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


const TEMPLATE = [
	['blueprint-blocks/social-link', {}, []],
];


class myAuthorEdit extends Component {
    static getInitialState( selectedAuthor ) {
		return {
          authors: [],
          selectedAuthor: selectedAuthor,
          author: {},
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
        this.onChangeSelectAuthor = this.onChangeSelectAuthor.bind(this);

        this.onSelectImage = this.onSelectImage.bind(this);
        this.onChangeProfileTitle = this.onChangeProfileTitle.bind(this);
        this.onChangeAuthorDescription = this.onChangeAuthorDescription.bind(this);
        this.onChangeTextColor = this.onChangeTextColor.bind(this);
        this.onChangeBGColor = this.onChangeBGColor.bind(this);
        this.onChangeCircleImage = this.onChangeCircleImage.bind(this);
        this.onChangeImgBorder = this.onChangeImgBorder.bind(this);
        this.onChangeBorderWidth = this.onChangeBorderWidth.bind(this);
        this.nChangeImageBorderColor = this.nChangeImageBorderColor.bind(this);
        this.onChangeShowReadMore = this.onChangeShowReadMore.bind(this);
        this.onChangeReadMoreText = this.onChangeReadMoreText.bind(this);
        this.onChangeReadMoreLink = this.onChangeReadMoreLink.bind(this);
        this.onChangeButtonColor = this.onChangeButtonColor.bind(this);
        this.onChangeButtonBGColor = this.onChangeButtonBGColor.bind(this);
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

                this.setState( { author, authors } );

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
            //console.log( blueprint.blueprint_social.links );
            this.props.setAttributes( {
                siteLinks: blueprint.blueprint_social.links,
                siteLinkDisplay: blueprint.blueprint_social.display,
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

          <PanelRow className="author-select">
            <SelectControl
            onChange={this.onChangeSelectAuthor}
            value={ this.props.attributes.selectedAuthor }
            label={ __( 'Select an Author' ) }
            options={ options }
            className="author-select"
            />
          </PanelRow>

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
            placeholder={ this.props.attributes.link }
            value={ this.props.attributes.readMoreLink }
            onChange={ this.onChangeReadMoreLink }
            keepPlaceholderOnFocus={true}
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

          <PanelRow className="display-block parent">
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
              initialOpen={false}
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
        this.setState( { selectedAuthor: parseInt( value ), author, } );


        // Set the attributes
        this.props.setAttributes( {
            selectedAuthor: parseInt( value ),
            authorName: author.name,
            authorDescription: author.description,
            authorLink: author.link,
            profileTitle: author.name,
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

    nChangeImageBorderColor( newValue) {
      this.props.setAttributes( { imgBorderColor: newValue });
    }

    onChangeShowReadMore( newValue) {
      if ( this.props.attributes.showReadMore ) {
         this.props.setAttributes( { showReadMore: false } );
      } else {
         this.props.setAttributes( { showReadMore: true } );
      }
    }

    onChangeReadMoreText( newValue) {
      this.props.setAttributes( { readMoreText: newValue });
    }

    onChangeReadMoreLink( newValue) {
      this.props.setAttributes( { readMoreLink: newValue });
    }

    onChangeButtonColor( newValue) {
      this.props.setAttributes( { buttonColor: newValue });
    }

    onChangeButtonBGColor( newValue) {
      this.props.setAttributes( { buttonBG: newValue });
    }


    getSiteLinks() {
        return (
            this.props.attributes.siteLinks ? (
            <div className="blueprint-profile-links site-links">
            <ul>
            {
                this.props.attributes.siteLinks.map( (item, key) =>
                {
                    return <li className="profile-link">
                    <a className={ item.network + ' icon-' + item.network }
                        href={ item.url }>
                        <span>{ item.network }</span>
                    </a>
                    </li>
                }
                )
            }
            </ul>
            </div>
            ) : (
                null
            )
        );
    }


    render() {
        let options = [ { value: 0, label: __( 'Select an Author' ) } ];
        let output = 'Choose Author';
        const placeholder = 'Cras justo odio, dapibus ac facilisis in, egestas eget quam. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.';

        this.props.className += ' loading';

        if( this.state.authors.length > 0 ) {
            this.state.authors.forEach( ( author ) => {
            options.push({ value:author.id, label:author.name });
        });

        } else {
            output = 'No authors found - please install MyBookTable or create author first.'
        }

        // Checking if we have anything in the object
        if( this.state.author !== undefined && this.state.author.hasOwnProperty('name')) {
            output = <div className="author">
            <a href={ this.state.author.link }>
                { this.state.author.name }
            </a>
            </div>;

            this.props.className += ' has-author';

        } else {
            this.props.className += ' no-author';
        }

		return (
            <div className={this.props.className }>

            { this.getInspectorControls(options) }

            <SelectControl
                onChange={this.onChangeSelectAuthor}
                value={ this.props.attributes.selectedAuthor }
                label={ __( 'Select an Author' ) }
                options={ options }
                className="author-select"
            />

            <div className="profile-preview">

            {
              this.props.attributes.profileTitle && (

                <h3 className="profile-title">
                <RichText
                    tagName='span'
                    placeholder= { 'Author Name' }
                    className="author-name"
                    value={ this.props.attributes.profileTitle }
                    onChange={ this.onChangeProfileTitle }
                    keepPlaceholderOnFocus={true}
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
                        return <div className="media">
                                <span className="dashicons dashicons-edit edit-media" onClick={ open }></span>
                                <img
                                src={ this.props.attributes.imgUrl }
                                onClick={ open }
                                className="profile-image"
                                /></div>;
                    }}
                  />

                  <div class="profile-blurb">
                    <RichText
                        tagName='div'
                        placeholder='Short Description or Bio'
                        className="author-blurb"
                        value={ this.props.attributes.authorDescription }
                        onChange={ this.onChangeAuthorDescription }
                        keepPlaceholderOnFocus={ false }
                        />
                  </div>
                </div>

                <div className="social-icons">
                  <h5 className="label">Social Media Links</h5>
                    <InnerBlocks
                      allowedBlocks={['blueprint-blocks/social-link']}
                      template={TEMPLATE}
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
        authorName: {
          type: 'string',
        },
        authorDescription: {
          type: 'string',
          selector: '.author-blurb',
          source: 'html',
        },
        authorLink: {
          type: 'string',
        },
        profileTitle: {
          type: 'string',
          selector: '.author-name',
          source: 'html',
        },
        imgUrl: {
          type: 'string',
          default: 'http://placehold.it/500',
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
            default: '',
        },
        colorText: {
            type: 'string',
            default: '',
        },
        imgBorderColor: {
            type: 'string',
            default: '',
        },
        imgBorder: {
            type: 'boolean',
            default: false,
        },
        imgBorderWidth: {
            type: 'integer',
            default: 0,
        },
        readMoreLink: {
            type: 'string',
            default: '',
        },
        readMoreText: {
            type: 'string',
            default: '',
        },
        showReadMore: {
            type: 'boolean',
            default: false,
        },
	  },

	edit: myAuthorEdit,

	save: function( props ) {
		let imgUrl = props.attributes.imgUrl;
    let imgDefault = 'http://placehold.it/500';

    if( imgUrl === imgDefault ) {
      imgUrl = null;
    }

		return (
			<div className={ props.className }>

        <h3 className="profile-title">
        <RichText.Content
            tagName='span'
            className="author-name"
            value={ props.attributes.profileTitle }
            />
        </h3>

        <div className="inner is-flex">

            <div className="profile-main">
            {
              imgUrl && (
                <div className="media">
                <img src={ props.attributes.imgUrl }
                className="profile-image"/>
                </div>
              )
            }

            <div className="profile-blurb">
              <RichText.Content
                className="author-blurb"
                tagName='div'
                multiline='p'
                value={ props.attributes.authorDescription }
               />
            </div>
            </div>

            <div className="blueprint-profile-links">
                <InnerBlocks.Content />
            </div>

        </div>
      </div>
		  );
	},
} );
