<?php
   /*
   Block: MBT Book 
   * Functions to add mbt fields to Rest API
   */


add_filter( 'register_post_type_args', 'blueprint_blocks_add_api_to_mbt_book', 10, 2 );
 
function blueprint_blocks_add_api_to_mbt_book( $args, $post_type ) {
 
    if ( 'mbt_book' === $post_type ) {
        $args['show_in_rest'] = true;
 
        // Optionally customize the rest_base or rest_controller_class
        $args['rest_base']             = 'mbt_book';
        $args['rest_controller_class'] = 'WP_REST_Posts_Controller';
        $args['supports'][] = 'excerpt';
    }
 
    return $args;
}

add_action( 'rest_api_init', 'blueprint_blocks_create_api_meta_fields' );

function blueprint_blocks_create_api_meta_fields() {

    register_rest_field( 
        'mbt_book', 
        'mbt_buybuttons', 
        array(
        'get_callback' => 'blueprint_blocks_mbt_get_book_buylinks',
        )
        );

    register_rest_field( 
        'mbt_book', 
        'mbt_sample_audio', 
        array(
        'get_callback' =>  'blueprint_blocks_mbt_get_sample_audio',
        )
        );

    register_rest_field( 
        'mbt_book', 
        'mbt_sample_url', 
            array(
            'get_callback' => 'blueprint_blocks_mbt_get_sample_url',
            )
        );

    register_rest_field( 
        'mbt_book', 
        'mbt_book_image_id', 
            array(
            'get_callback' => 'blueprint_blocks_mbt_get_cover',
            )
        );

    register_rest_field( 
      'mbt_book', 
      'mbt_unique_id_asin', 
          array(
          'get_callback' => 'blueprint_blocks_mbt_get_asin',
          )
      );

    register_rest_field(
      'mbt_book',
      'mbt_book_teaser',
        array(
          'get_callback' => 'blueprint_blocks_mbt_get_tagline',
        )
    );
    register_rest_field(
        'mbt_book',
        'mbt_style_url',
          array(
            'get_callback' => 'blueprint_blocks_mbt_get_style',
          )
      );
 }

function blueprint_blocks_mbt_get_book_buylinks( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_buybuttons' );
	return $meta;

}

function blueprint_blocks_mbt_get_sample_url( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_sample_url' );
	return $meta;

}
function blueprint_blocks_mbt_get_sample_audio( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_sample_audio' );
	return $meta;

}
function blueprint_blocks_mbt_get_cover( $object ) {
  $cover_id = get_post_meta( $object['id'], 'mbt_book_image_id' );
  return $cover_id;
}

function blueprint_blocks_mbt_get_asin( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_unique_id_asin' );
	return $meta;
}

function blueprint_blocks_mbt_get_tagline( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_book_teaser' );
	return $meta;
}
function blueprint_blocks_mbt_get_style( $object ) {
    $style_url = false;
    if( function_exists( 'mbt_current_style_url') ) {
        $style_url =  mbt_current_style_url( $file );
    }
    
	return $style_url;
}



