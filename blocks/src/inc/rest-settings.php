<?php
   /*
   * Setup Rest Route
   */



add_action( 'rest_api_init', 'blueprint_register_api' );

function blueprint_register_api() {
  register_rest_route(
    'blueprint-mmk/v1',
    '/blueprint',
    array(
      'methods' => 'GET',
      'callback' => 'blueprint_register_rest_route',
    )
  );

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
     'mbt_editor_style_url',
        array(
        'get_callback' => 'blueprint_blocks_mbt_editor_style',
        )
  );
  register_rest_field(
     'mbt_book',
     'mbt_book_excerpt',
        array(
        'get_callback' => 'blueprint_blocks_mbt_book_excerpt',
        )
  );
}

function blueprint_register_rest_route( WP_REST_Request $request ) {
  /**
   * Just creating the endpoint with filterable return so that
   * other segments can add to return.
   */

  $rest_fields = array();
  $rest_fields = apply_filters( 'blueprint_rest_fields', $rest_fields );
  return $rest_fields;
}

add_filter( 'blueprint_rest_fields', 'blueprint_add_image_base_url' );
add_filter( 'blueprint_rest_fields', 'blueprint_blocks_mbt_get_mbt_status' );

function blueprint_add_image_base_url( $rest_fields ) {
  $imagePath = plugins_url() . '/blueprint-blocks/extras/assets/';
  $rest_fields['img_dir'] = $imagePath;
  return $rest_fields;
}

function blueprint_blocks_mbt_get_mbt_status( $rest_fields ) {
   $status = false;

   if( defined( 'MBT_VERSION' ) ) {
      $status = true;
   }

   $rest_fields['mbt_active'] = $status;
	 return $rest_fields;
}


add_filter( 'register_post_type_args', 'blueprint_blocks_add_api_to_mbt_book', 10, 2 );

function blueprint_blocks_add_api_to_mbt_book( $args, $post_type ) {

  if ( 'mbt_book' === $post_type ) {
     $args['show_in_rest'] = true;

     // Optionally customize the rest_base or rest_controller_class
     $args['rest_base']  = 'mbt_book';
     $args['rest_controller_class'] = 'WP_REST_Posts_Controller';
     //$args['supports'][] = 'excerpt';
  }

  return $args;
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

function blueprint_blocks_mbt_editor_style( $object ) {
   $style_url = plugins_url( 'blueprint-blocks/extras/assets/button-packs/blueprint-buttons/' );
	return $style_url;
}

function blueprint_blocks_mbt_book_excerpt( $object ) {
	$excerpt = get_the_excerpt( $object['id'] );
  $excerpt = wpautop( $excerpt );
  $excerpt = trim(preg_replace('/\s/', ' ', $excerpt));

	return $excerpt;
}
