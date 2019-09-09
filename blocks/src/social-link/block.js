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
  static getInitialState( selectedNetwork ) {
		return {
		  networks: [],
		  selectedNetwork: selectedNetwork,
      network: {},
      unFocused: true,
      imgDir: null,
		  };
    }

  constructor() {
    super( ...arguments );

    this.state = this.constructor.getInitialState( this.props.attributes.selectedNetwork );

    this.getOptions = this.getOptions.bind(this);
    this.getOptions();

    this.getInspectorControls = this.getInspectorControls.bind(this);

    this.getLinkLabel = this.getLinkLabel.bind(this);
    this.getLinkHelp = this.getLinkHelp.bind(this);
    this.getLinkPlaceholder = this.getLinkPlaceholder.bind(this);

    this.onChangeSelectNetwork = this.onChangeSelectNetwork.bind(this);

    this.onChangeSocialLink = this.onChangeSocialLink.bind(this);
    this.linkInputFocus = this.linkInputFocus.bind(this);
    this.linkInputBlur = this.linkInputBlur.bind(this);

    this.onChangeButtonColor = this.onChangeButtonColor.bind(this);
    this.onChangeButtonBG = this.onChangeButtonBG.bind(this);
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
       const bpsBgColor = style.background ? style.background : '#4b4b4b';
       const bpsColor  = style.color ? style.color : '#f4f4f4';
       const bpsColorHov  = style.hover_color ? style.hover_color : '#f4f4f4';
       const bpsBgColorHov  = style.hover_background ? style.hover_background : '#4b4b4b';
       const bpsBorderRadius = style.border_radius ? style.border_radius : '0';

       this.setState( {
         networks: blueprint.blueprint_social.networks,
         imgDir: blueprint.img_dir,
         bpSocialStatus: blueprint.blueprint_social.status,
         bpsBgColor: bpsBgColor,
         bpsColor:  bpsColor,
         bpsColorHov:  bpsColorHov,
         bpsBgColorHov: bpsBgColorHov,
         bpsBorderRadius: bpsBorderRadius,
        });

       this.props.setAttributes( {
          bgColor: this.props.attributes.bgColor ? this.props.attributes.bgColor : this.state.bpsBgColor,
          color: this.props.attributes.color ? this.props.attributes.color : this.state.bpsColor,
          borderRadius: this.props.attributes.borderRadius ? this.props.attributes.borderRadius : this.state.bpsBorderRadius,
       } );



    });
  }
  getLinkPlaceholder() {
    let linkPlaceholder = 'https://website.com';
    if( this.props.attributes.selectedNetwork && this.props.attributes.selectedNetwork === 'email') {
        linkPlaceholder = "you@your-name.com";

      } else if( this.props.attributes.selectedNetwork ) {
        linkPlaceholder = "https://" + this.props.attributes.selectedNetwork + ".com";
    }

    return(
      linkPlaceholder
    );
  }

  getLinkHelp() {
    let linkHelp = "";
    if( this.props.attributes.selectedNetwork && this.props.attributes.selectedNetwork !== 'email') {
        linkHelp = "Full URL to " + this.props.attributes.selectedNetwork + " profile";
    }

    return(
      linkHelp
    );
  }

  getLinkLabel() {
    let linkLabel = 'Enter Profile URL';
    if( this.props.attributes.selectedNetwork && this.props.attributes.selectedNetwork === 'email') {
        linkLabel = 'Email Address';

      } else if( this.props.attributes.selectedNetwork ) {
        linkLabel = this.props.attributes.selectedNetwork + " link";
      }

      return(
        linkLabel
      );
  }

  onChangeSelectNetwork( value ) {

      const network = this.state.networks.find( function (element) {
        return element.tag == value;
      });

      this.props.setAttributes( {
          selectedNetwork: value,
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
  

  linkInputFocus() {
    this.setState({ unFocused: false });
  }
  linkInputBlur() {
    this.setState({ unFocused: true });
  }

  getInspectorControls( options ) {
    const linkLabel = this.getLinkLabel();
    const linkHelp = this.getLinkHelp();
    const linkPlaceholder = this.getLinkPlaceholder();

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
           ] }
           />

           <PanelBody
           title="Link Settings"
           initialOpen={ true }
           className="blueprint-panel-body">

           <PanelRow className="select parent">
           <SelectControl
              onChange={ this.onChangeSelectNetwork }
              value={ this.props.attributes.selectedNetwork }
              label={ __( 'Select a Social Network' ) }
              options={ options }
              className="network-select"
           />
           </PanelRow>

           <PanelRow className="display-block parent no-top-space">
           <TextControl
              label={ linkLabel }
              help={ linkHelp }
              placeholder={ linkPlaceholder }
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
    const linkLabel = this.getLinkLabel();
    const linkHelp = this.getLinkHelp();
    const linkPlaceholder = this.getLinkPlaceholder();
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

    let backgroundImage = this.state.imgDir + 'icons/' + this.props.attributes.selectedNetwork + '.svg';

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
              <span className="editor-icon" style={ iconStyle }></span>
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
                  label={ linkLabel }
                  help={ linkHelp }
                  placeholder={ linkPlaceholder }
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
        socialLink: {
            type: 'string',
        },
        bgColor: {
          type: 'string',
        },
        color: {
          type: 'string',
        },
        borderRadius: {
          type: 'string'
        },
	  },

	edit: editSocialLink,

	save: function( props ) {

    let linkStyle = {
      backgroundColor: props.attributes.bgColor,
      borderRadius: props.attributes.borderRadius,
      color: props.attributes.color,
    }

		return (
      <div className={ props.className }>
		    {

          props.attributes.selectedNetwork &&
          props.attributes.socialLink && (

            <a href={ props.attributes.socialLink }
            className={ props.attributes.selectedNetwork + " bps-social-link icon-" + props.attributes.selectedNetwork }
            style={ linkStyle }>
            <span>{ props.attributes.selectedNetwork }</span>
            </a>

          )
        }
        </div>
		  );
	},
} );
