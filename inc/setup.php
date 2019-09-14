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
        'blueprint-extras-css',
        plugins_url( 'css/blueprint-extras.css', dirname(__FILE__) ) ,
        '',
        $version
      );

      wp_enqueue_style( 'blueprint-extras-css' );

      wp_register_script(
        'blueprint-extras',
        plugins_url( 'js/blueprint-extras-min.js', dirname(__FILE__) ),
        '',
        $version,
         true);

      wp_enqueue_script( 'blueprint-extras-js' );
    }
}

function blueprint_extras_live_preview() {
  wp_enqueue_script(
      'blueprint-extras-customizer',
      plugins_url( 'js/blueprint-customizer-preview-min.js', dirname(__FILE__) ) ,
      array( 'jquery','customize-preview' ),
      '',
      false
  );

}
