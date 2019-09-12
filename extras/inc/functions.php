<?php

/**
 * Functions Misc
 * @package    Blueprint Blocks
 *
 */



function blueprint_extras_body_class( $classes ) {

  $settings = get_option( 'mbt_settings', array() );

  $activeStyle = !empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';
  $bookSize = !empty( $settings['book_button_size'] ) ? $settings['book_button_size'] : 'medium';
  $listSize = !empty( $settings['listing_button_size'] ) ? $settings['listing_button_size'] : 'medium';

  $btnSize = $listSize;

  if( in_array( 'single-mbt_book', $classes ) ) {
    $btnSize = $bookSize;
  }

  if( $activeStyle === 'blueprint-simple-buttons' || $activeStyle === 'blueprint-buttons' ) {
    $classes[] = 'mbt-btn-size-' . $btnSize;
  }

  if( defined( 'MBT_VERSION' ) ) {
    $classes[] = $activeStyle;
  } else {
    $classes[] = 'blueprint-simple-buttons';
  }

  $classes[] = 'blueprint-extras';

  return $classes;
}

add_filter( 'body_class', 'blueprint_extras_body_class' );
