const { assign } = lodash;
const { addFilter } = wp.hooks;
const { __ } = wp.i18n;

const disableBlockInsertion = [
    'blueprint-blocks/mbt-book',
];

const changeBlockInsertionAbility = ( settings, name ) => {
    // Do nothing if it's another block than our defined ones.
    if ( ! disableBlockInsertion.includes( name ) ) {
        return settings;
    }

    // Use Lodash's assign to gracefully handle if attributes are undefined
    settings = assign( settings, {
        supports: {
            inserter: false,
        },
    } );

    return settings;
};

addFilter( 'blocks.registerBlockType', 'extend-block-example/settings/supports', changeBlockInsertionAbility );
