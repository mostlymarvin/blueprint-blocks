<?php

/**
 * Extras for MBT
 * @package    Blueprint Blocks
 *
 */


function blueprint_extras_custom_css(){

  //Only do all this if the active buttons are our custom buttons
  $settings = get_option( 'mbt_settings', array() );

  $activeStyle = !empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';

  $blueprint_button_packs = array(
    'blueprint-buttons',
    'blueprint-simple-buttons'
  );

  $style = '';

    $blueprint = get_option( 'blueprint_extras' );

    $button_bg = isset( $blueprint['button_background'] ) ?  $blueprint['button_background']  : '#484848';
    $button_color = isset( $blueprint['button_text_color'] ) ?  $blueprint['button_text_color']  : '#ffffff';
    $hover_bg = isset( $blueprint['button_hover_background'] ) ?  $blueprint['button_hover_background']  : '#727272';
    $hover_color = isset( $blueprint['button_hover_text_color'] ) ?  $blueprint['button_hover_text_color']  : '#ffffff';
    $custom_css = isset( $blueprint['custom_css'] ) ?  $blueprint['custom_css']  : '';
    $has_grayscale = isset( $blueprint['grayscale_button'] ) ?  $blueprint['grayscale_button'] : false;
    $border_radius = isset( $blueprint['border_radius'] ) ?  $blueprint['border_radius']  : 0;
    $img_radius = isset( $blueprint['border_radius'] ) ?  intval( $blueprint['border_radius'] - 2 ) : 0;
    $show_text = isset( $blueprint['show_text'] ) ? $blueprint['show_text'] : false;


    $grayscale_on = '';
    $grayscale_off = '';

    if( $has_grayscale ) {
      $grayscale_on = '-webkit-filter: grayscale(100%); filter: grayscale(100%);';
      $grayscale_off = '-webkit-filter: grayscale(0%); filter: grayscale(0%);';
    }


    $style = sprintf(
        '<style type="text/css">
        .blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton,
        .blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,
        .blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,
        .blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton {
        background-color: %1$s;
        border-color: %1$s;
        color:  %2$s;
        border-radius: %3$s;
        %4$s
        }
        .blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton:hover,
        .blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton:hover,
        .blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton:hover,
        .blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton:hover {
        background-color: %5$s;
        border-color: %5$s;
        color:  %6$s;
        %7$s
        }
        .blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton a img,
        .blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton a img,
        .blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton a img,
        .blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton a img {
        border-bottom-left-radius: %8$spx !important;
        border-top-left-radius: %8$spx !important;
        }

        .blueprint-extras .mbt-book .mbt-primary-button {
          background-color: %1$s;
          color: %2$s;
          border-radius: %3$spx;
        }
        .blueprint-extras .mbt-book .mbt-primary-button:hover {
          background-color: %5$s;
          color: %6$s;
          border-radius: %3$spx;
        }

        %9$s</style>
        ',
        sanitize_hex_color( $button_bg ),
        sanitize_hex_color( $button_color ),
        intval( $border_radius ),
        wp_kses_post( $grayscale_on ),
        sanitize_hex_color( $hover_bg ),
        sanitize_hex_color( $hover_color ),
        wp_kses_post( $grayscale_off ),
        intval( $img_radius ),
        wp_kses_post( $custom_css )
    );


  if( in_array( $activeStyle, $blueprint_button_packs )  ) {
    echo $style;
  }
}

add_action( 'wp_head', 'blueprint_extras_custom_css');
