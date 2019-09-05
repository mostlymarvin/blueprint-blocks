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

         this.props.setAttributes( {
            bpSocialStatus: blueprint.blueprint_social.status,
            networks: blueprint.blueprint_social.networks,
            display: blueprint.blueprint_social.display,
         } );

         this.setState( { networks: blueprint.blueprint_social.networks });



         //if( blueprint && null !== this.state.selectedNetwork ) {
            //If we have a selected Network, find that Network and add it.
          //  const networks = this.props.attributes.networks;
          //  const network = networks.find( ( item )
          //  => { return item.tag == this.state.selectedNetwork } );

          //  this.setState( { network, networks } );
          //} else {
          //  this.setState( { networks } );
          //}
      });
    }

    onChangeSelectNetwork( value ) {

        const network = this.state.networks.find(function (element) {
          return element.tag == value;
        });

        this.props.setAttributes( {
            selectedNetwork: value,
            networkName: network.name,
        } );

        console.log( network.name );
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
           value: this.props.attributes.colorText,
           onChange:  this.onChangeTextColor,
           label: __('Text Color', 'blueprint-blocks'),
           },
           {
           value: this.props.attributes.colorBG,
           onChange: this.onChangeBGColor,
           label: __('Background Color', 'blueprint-blocks'),
           },
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

     return (

          <div
          className={ this.props.className }>
          Hello!
          { this.getInspectorControls( options ) }
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
        socialLink: {
            type: 'string',
        },
        socialClass: {
            type: 'string',
        },
        backgroundColor: {
            type: 'string',
        },
        color: {
          type: 'string',
        }
	  },

	edit: editSocialLink,

	save: function( props ) {

		return (
		    null
		  );
	},
} );
