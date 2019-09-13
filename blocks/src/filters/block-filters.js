const { assign } = lodash;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;
const { apiFetch } = wp.apiFetch;
const { Component } = wp.element;

class BlockFilter {
  constructor( blockName, status ) {

    this.blockName = blockName;
    this.checkBlocks = this.checkBlocks.bind(this);
    this.status = status;
    this.checkedStatus = '';

    this.checkBlocks();

    let newStatus = '';

    if( this.status !== this.checkedStatus ) {
      newStatus = true;
    }

    return { newStatus }
  }

  checkBlocks() {

    wp.apiFetch( { path: 'blueprint-mmk/v1/blueprint' } ).then( blueprint =>  {

      switch( this.blockName ) {
        case 'mbt_book' :
          this.checkedStatus = blueprint.mbt_book;
          break;
        case 'author_profile':
          this.checkedStatus = blueprint.author_profile;
          break;
        default:
          this.checkedStatus = 'fred';
        }
        return this.checkedStatus;
    });
  }
}

const getBookFilter = new BlockFilter( 'mbt_book', 'enabled' );
const getAuthorFilter = new BlockFilter( 'author_profile', 'enabled' );

let book = '';
let author = '';

 if( getAuthorFilter['newStatus'] ) {
   author = 'blueprint-blocks/author-profile';
 }
 if( getBookFilter['newStatus'] ) {
   book = 'blueprint-blocks/mbt-book';
 }

const blocksToDisable = [
  book,
  author,
];


const disableBlocks = ( settings, name ) => {
  // Do nothing if it's another block than our defined es.
    if ( ! blocksToDisable.includes( name ) ) {
        return settings;
    }
    //Use Lodash's assign to gracefully handle if tributes are undefined
    settings = assign( settings, {
        supports: {
            inserter: false,
        },
    } );

    return settings;
};
addFilter( 'blocks.registerBlockType', 'extend-block-example/settings/supports', disableBlocks );
