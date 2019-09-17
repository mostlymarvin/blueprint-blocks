<?php

/**
 * Setup
 * @package Blueprint Blocks
 *
 */


add_action ( 'wp_enqueue_scripts', 'blueprint_extras_scripts' );
add_action( 'customize_preview_init', 'blueprint_extras_live_preview' );

function  blueprint_extras_scripts() {

    $version = BLUEPRINT_BLOCKS_VERSION;

    $settings = get_option( 'mbt_settings', array() );

    $activeStyle = !empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';

    $blueprint_button_packs = array(
      'blueprint-buttons',
      'blueprint-simple-buttons'
    );

    if( in_array( $activeStyle, $blueprint_button_packs ) || !defined( 'MBT_VERSION' )  ) {

      wp_register_style(
        'blueprint-extras',
        BLUEPRINT_BLOCKS_PLUGIN_URL . 'css/blueprint-extras.css',
        '',
        $version
      );

      wp_enqueue_style( 'blueprint-extras' );

      wp_register_script(
        'blueprint-extras-js',
        BLUEPRINT_BLOCKS_PLUGIN_URL . 'js/blueprint-extras-min.js',
        '',
        $version,
         true);

      wp_enqueue_script( 'blueprint-extras-js' );
    }
}

function blueprint_extras_live_preview() {
  wp_enqueue_script(
      'blueprint-extras-customizer',
      BLUEPRINT_BLOCKS_PLUGIN_URL . 'js/blueprint-customizer-preview-min.js',
      array( 'jquery','customize-preview' ),
      '',
      false
  );

}
