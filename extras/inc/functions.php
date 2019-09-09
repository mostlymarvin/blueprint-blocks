<?php

/**
 * Functions Misc
 * @package    Blueprint Blocks
 *
 */



function blueprint_extras_body_class( $classes ) {


  $settings = get_option( 'mbt_settings', array() );

  $activeStyle = !empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';

  if( defined( 'MBT_VERSION' ) ) {
    $classes[] = $activeStyle;
  } else {
    $classes[] = 'blueprint-simple-buttons';
  }



  $classes[] = 'blueprint-extras';

  return $classes;
}

add_filter( 'body_class', 'blueprint_extras_body_class' );
