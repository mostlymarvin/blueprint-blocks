/**
 * BLOCK: Blueprint Author
 *
 * Author Profile + Photo and Social Links
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { SelectControl, TextControl,
Panel, PanelBody, PanelRow  } = wp.components;
const { Component } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, PanelColorSettings  } = wp.editor;

class editSocialLink extends Component {
  static getInitialState( selectedPost ) {
		return {
		  networks: [],
		  selectedNetwork: null,
      network: {},
		  };
    }

  constructor() {
    super( ...arguments );

    this.state = this.constructor.getInitialState( this.props.attributes.selectedNetwork );

    this.getOptions = this.getOptions.bind(this);
    this.getOptions();

    this.getInspectorControls = this.getInspectorControls.bind(this);

    this.onChangeSelectNetwork = this.onChangeSelectNetwork.bind(this);

    this.onChangeSocialLink = this.onChangeSocialLink.bind(this);
    this.linkInputFocus = this.linkInputFocus.bind(this);
    this.linkInputBlur = this.linkInputBlur.bind(this);

    this.onChangeButtonColor = this.onChangeButtonColor.bind(this);
    this.onChangeButtonBG = this.onChangeButtonBG.bind(this);
    this.onChangeButtonHovColor = this.onChangeButtonHovColor.bind(this);
    this.onChangeButtonBGHov = this.onChangeButtonBGHov.bind(this);
  }

  getOptions() {
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

       const style = blueprint.blueprint_social.display;
       const bgColor = style.background ? style.background : '#4b4b4b';
       const color  = style.color ? style.color : '#f4f4f4';
       const colorHov  = style.hover_color ? style.hover_color : '#f4f4f4';
       const bgColorHov  = style.hover_background ? style.hover_background : '#4b4b4b';
       const borderRadius = style.border_radius ? style.border_radius : '0';

       this.props.setAttributes( {
          bpSocialStatus: blueprint.blueprint_social.status,
          networks: blueprint.blueprint_social.networks,
          bgColor: bgColor,
          color: color,
          bgColorHov: bgColorHov,
          colorHov: colorHov,
          borderRadius: borderRadius,
          imgDir: blueprint.img_dir,
       } );

       this.setState( { networks: blueprint.blueprint_social.networks });

    });
  }

  onChangeSelectNetwork( value ) {

      const network = this.state.networks.find( function (element) {
        return element.tag == value;
      });

      this.props.setAttributes( {
          selectedNetwork: value,
          networkName: network.name,
      } );
  }

  onChangeSocialLink( newValue ) {
    this.props.setAttributes( { socialLink: newValue });
  }

  onChangeButtonColor( newColor ) {
    this.props.setAttributes({ color : newColor });
    }
  onChangeButtonBG( newbgColor ) {
    this.props.setAttributes({ bgColor : newbgColor });
    }
  onChangeButtonHovColor( newColorHov ) {
    this.props.setAttributes({ colorHov : newColorHov });
    }
  onChangeButtonBGHov( newbgColorHov ) {
    this.props.setAttributes({ bgColorHov : newbgColorHov });
    }

  linkInputFocus() {
    this.setState({ unFocused: false });
    console.log( 'Its Focused!');
  }
  linkInputBlur() {
    this.setState({ unFocused: true });
    console.log( 'Its Not Focused!');
  }

  getInspectorControls( options ) {
     return(
        <div>
           <InspectorControls>

           <PanelColorSettings
           title={ __('Colors', 'blueprint-blocks') }
           initialOpen={false}
           colorSettings= { [
           {
           value: this.props.attributes.color,
           onChange:  this.onChangeButtonColor,
           label: __('Button: Icon Color', 'blueprint-blocks'),
           },
           {
           value: this.props.attributes.bgColor,
           onChange: this.onChangeButtonBG,
           label: __('Button: Background Color', 'blueprint-blocks'),
           },
           {
           value: this.props.attributes.colorHov,
           onChange: this.onChangeButtonHovColor,
           label: __('Button Hover: Icon Color', 'blueprint-blocks'),
           },
           {
           value: this.props.attributes.bgColorHov,
           onChange: this.onChangeButtonBGHov,
           label: __('Button Hover: Background Color', 'blueprint-blocks'),
           },
           ] }
           />

           <PanelBody
           title="Book Settings"
           initialOpen={ true }
           className="blueprint-panel-body">

           <PanelRow className="book-select">
           <SelectControl
              onChange={ this.onChangeSelectNetwork }
              value={ this.props.attributes.selectedNetwork }
              label={ __( 'Select a Social Network' ) }
              options={ options }
              className="network-select"
           />
           </PanelRow>

           <PanelRow className="display-block">
           <TextControl
              label={ this.props.attributes.selectedNetwork + " link" }
              help={ "Full URL to " + this.props.attributes.selectedNetwork + " profile" }
              placeholder={ "https://" + this.props.attributes.selectedNetwork + ".com" }
              value={ this.props.attributes.socialLink }
              onChange={ this.onChangeSocialLink }
              keepPlaceholderOnFocus={true}
           />
           </PanelRow>

           </PanelBody>
           </InspectorControls>
        </div>
     );
  }

  render() {
     let options = [ { value: null, label: __( 'Select a Network' ) } ];
     let message = '';
     let previewClass = 'block-preview';

     this.props.className += ' loading';

     if( this.state.networks.length > 0 ) {

        this.state.networks.forEach( ( network ) => {
              options.push({
                value:network.tag,
                label:network.name,
              })
          });
      //  });
      message = 'hello';


     }  else {
        message =  'No Networks found. Please install or activate Blueprint Social';
     }

     // Checking if we have anything in the object
     if( this.state.network !== undefined && this.state.network.hasOwnProperty('name')) {

        this.props.className += ' has-network';

     } else {
        this.props.className += ' no-network';
     }

     if( this.props.attributes.network !== undefined ) {
        previewClass = 'block-preview active-preview';
     }

     let backgroundImage = this.props.attributes.imgDir + 'icons/' + this.props.attributes.selectedNetwork + '.svg';

     let linkbg = {
       backgroundColor: this.props.attributes.bgColor,
       borderRadius: this.props.attributes.borderRadius,
     }
     let iconStyle = {
       backgroundColor: this.props.attributes.color,
       maskImage: ' url( ' + backgroundImage + ')',
       webkitMaskImage: ' url( ' + backgroundImage + ')',
     }

     return (

          <div
          className={ this.props.className }>

          { this.getInspectorControls( options ) }

          {
            this.state.unFocused &&
            this.props.attributes.selectedNetwork &&
            this.props.attributes.socialLink ? (

              <a href={ this.props.attributes.socialLink }
              className={ this.props.attributes.selectedNetwork + " social-link icon-" + this.props.attributes.selectedNetwork }
              style={ linkbg } >
              <span className="editor-icon" style={iconStyle}></span>
              </a>

            ) : (

              <div className="social-setup">
                <SelectControl
                  onChange={ this.onChangeSelectNetwork }
                  value={ this.props.attributes.selectedNetwork }
                  label={ __( 'Select a Social Network' ) }
                  options={ options }
                  className="network-select"
                />
                <TextControl
                  label={ this.props.attributes.selectedNetwork + " link" }
                  help={ "Full URL to " + this.props.attributes.selectedNetwork + " profile" }
                  placeholder={ "https://" + this.props.attributes.selectedNetwork + ".com" }
                  value={ this.props.attributes.socialLink }
                  onChange={ this.onChangeSocialLink }
                  keepPlaceholderOnFocus={true}
                  onFocus={ this.linkInputFocus }
                  onBlur={ this.linkInputBlur }
                />
              </div>

            )
          }
          </div>
        )
    }
}


registerBlockType( 'blueprint-blocks/social-link', {
	title: __( 'Social Link' ),
	icon: 'share',
	category: 'blueprint-blocks',
	keywords: [
		    __( 'Social' ),
        __( 'Link' ),
        __( 'Facebook' ),
	],
  parent: ['blueprint-blocks/blueprint-author'],
	attributes: {
        selectedNetwork: {
            type: 'string',
            default: null,
        },
        networkName: {
          type: 'string',
        },
        networks: {
          type: 'array',
          default: [],
        },
        imgDir: {
          type: 'string',
        },
        socialLink: {
            type: 'string',
        },
        socialClass: {
            type: 'string',
        },
        bgColor: {
          type: 'string',
          default: '#4b4b4b',
        },
        color: {
          type: 'string',
          default: '#fff',
        },
        bgColorHov : {
          type: 'string',
        },
        colorHov: {
          type: 'string',
        },
        borderRadius: {
          type: 'string'
        },
        allSet: {
          type: 'boolean',
          default: false,
        },
	  },

	edit: editSocialLink,

	save: function( props ) {

		return (
      <div className={ props.className }>
		    {

          props.attributes.selectedNetwork &&
          props.attributes.socialLink && (
            <a href={ props.attributes.socialLink }
            className={ props.attributes.selectedNetwork + " icon-" + props.attributes.selectedNetwork }>
            <span>{ props.attributes.networkName }</span>
            </a>

          )
        }
        </div>
		  );
	},
} );
