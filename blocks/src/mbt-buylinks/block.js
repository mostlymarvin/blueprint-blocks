/**
 * BLOCK: mbt-buylinks
 *
 * MBT Buylinks for MBT Book Block
 * customized to work with Blueprint Theme / Blueprint Child themes.
 */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { SelectControl, ToggleControl, TextControl, Panel, PanelBody, PanelRow, RangeControl, FontSizePicker } = wp.components;
const { Component, Fragment } = wp.element;
const { RichText, InspectorControls, PanelColorSettings, getColorClassName } = wp.editor;

class mbtGetBuylinks extends Component {

   constructor() {
     super( ...arguments );

    }


  render() {

    return (

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
    )
  }
}


registerBlockType( 'blueprint-blocks/mbt-buylinks', {
	title: __( 'Book Buylinks' ),
  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#fff',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#49A5C3',
    // Specifying a dashicon for the block
    src: 'admin-links',
  },
	category: 'blueprint-blocks',
	keywords: [
		__( 'blueprint-blocks — mbt-buylinks' ),
		__( 'Book' ),
    __( 'Blueprint' )
	],
  parent: [ 'blueprint-blocks/mbt-book' ],
	attributes: {
      buylinks: {
         type: 'array',
      },
      styleURL: {
         type: 'string',
      },
    },

	edit: mbtGetBuylinks,

	save: function( props ) {


		return (
      null

    );
	},
} );
