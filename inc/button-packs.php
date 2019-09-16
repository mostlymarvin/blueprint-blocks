<?php

/**
 * Add Button Packs to MBT
 * @package    Blueprint Blocks
 *
 */



function blueprint_extras_add_button_packs( $folders ) {

    $styledir = BLUEPRINT_BLOCKS_PLUGIN_PATH . 'assets/button-packs/';
    $styleuri =  plugins_url() . '/blueprint-blocks/assets/button-packs';
    $folders[] = array(
        'dir' => $styledir,
        'url' => $styleuri,
    );
    return $folders;
}
add_filter( 'mbt_style_folders', 'blueprint_extras_add_button_packs' );
