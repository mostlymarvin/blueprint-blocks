<?php
/**
 * Rest Settings
 *
 * @package   Blueprint_Blocks
 * @author    Memphis McKay
 */

add_action( 'rest_api_init', 'blueprint_register_api' );
add_filter( 'blueprint_rest_fields', 'blueprint_add_image_base_url' );
add_filter( 'blueprint_rest_fields', 'blueprint_blocks_mbt_get_mbt_status' );
add_filter( 'register_post_type_args', 'blueprint_blocks_add_api_to_mbt_book', 10, 2 );

/**
 * Register rest routes and fields
 *
 * @method blueprint_register_api
 */
function blueprint_register_api() {

	/* Blueprint rest route */
	register_rest_route(
		'blueprint-mmk/v1',
		'/blueprint',
		array(
			'methods'  => 'GET',
			'callback' => 'blueprint_register_rest_route',
		)
	);

	/* Buy buttons */
	register_rest_field(
		'mbt_book',
		'mbt_buybuttons',
		array(
			'get_callback' => 'blueprint_blocks_mbt_get_book_buylinks',
		)
	);

	/* Audio sample meta */
	register_rest_field(
		'mbt_book',
		'mbt_sample_audio',
		array(
			'get_callback' => 'blueprint_blocks_mbt_get_sample_audio',
		)
	);

	/* Book sample URL */
	register_rest_field(
		'mbt_book',
		'mbt_sample_url',
		array(
			'get_callback' => 'blueprint_blocks_mbt_get_sample_url',
		)
	);

	/* Book cover image ID */
	register_rest_field(
		'mbt_book',
		'mbt_book_image_id',
		array(
			'get_callback' => 'blueprint_blocks_mbt_get_cover',
		)
	);

	/* Book ASIN */
	register_rest_field(
		'mbt_book',
		'mbt_unique_id_asin',
		array(
			'get_callback' => 'blueprint_blocks_mbt_get_asin',
		)
	);

	/* Book tagline / teaser */
	register_rest_field(
		'mbt_book',
		'mbt_book_teaser',
		array(
			'get_callback' => 'blueprint_blocks_mbt_get_tagline',
		)
	);

	/* Editor style URL for preview */
	register_rest_field(
		'mbt_book',
		'mbt_editor_style_url',
		array(
			'get_callback' => 'blueprint_blocks_mbt_editor_style',
		)
	);

	/* Book excerpt */
	register_rest_field(
		'mbt_book',
		'mbt_book_excerpt',
		array(
			'get_callback' => 'blueprint_blocks_mbt_book_excerpt',
		)
	);

	/* Book author */
	register_rest_field(
		'mbt_author',
		'mbt_tax_image_url',
		array(
			'get_callback' => 'blueprint_blocks_mbt_get_author_meta',
		)
	);
}

/**
 * Creating a rest route that can be added to via filter
 *
 * @method blueprint_register_rest_route
 * @param  WP_REST_Request $request JSON.
 * @return mixed $rest_fields
 */
function blueprint_register_rest_route( WP_REST_Request $request ) {
	/* Create endpoint with filterable return */
	$rest_fields = array();
	$rest_fields = apply_filters( 'blueprint_rest_fields', $rest_fields );

	return $rest_fields;
}

/**
 * Add base url for images to rest for block preview
 *
 * @method blueprint_add_image_base_url
 * @param array $rest_fields filterable array.
 * @return array $rest_fields filtered array
 */
function blueprint_add_image_base_url( $rest_fields ) {

	$image_path             = BLUEPRINT_BLOCKS_PLUGIN_URL . 'assets/';
	$rest_fields['img_dir'] = $image_path;

	return $rest_fields;
}

/**
 * Add MBT status (active / inactive )
 *
 * @method blueprint_blocks_mbt_get_mbt_status
 * @param  array $rest_fields filterable array.
 * @return array $rest_fields filtered array
 */
function blueprint_blocks_mbt_get_mbt_status( $rest_fields ) {

	$status = false;

	if ( defined( 'MBT_VERSION' ) ) {
		$status = true;
	}

	$rest_fields['mbt_active'] = $status;
		return $rest_fields;
}

/**
 * Add MBT book to API
 *
 * @method blueprint_blocks_add_api_to_mbt_book
 * @param array  $args arguments.
 * @param string $post_type post type.
 * @return array $args edited arguments
 */
function blueprint_blocks_add_api_to_mbt_book( $args, $post_type ) {

	if ( 'mbt_book' === $post_type ) {
		$args['show_in_rest'] = true;

		/* Customize the rest_base and rest_controller_class */
		$args['rest_base']             = 'mbt_book';
		$args['rest_controller_class'] = 'WP_REST_Posts_Controller';
	}

	return $args;
}

/**
 * Get book buylinks
 *
 * @method blueprint_blocks_mbt_get_book_buylinks
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_get_book_buylinks( $object ) {

	$meta = get_post_meta( $object['id'], 'mbt_buybuttons' );

	return $meta;
}

/**
 * Get sample url
 *
 * @method blueprint_blocks_mbt_get_sample_url
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_get_sample_url( $object ) {

	$meta = get_post_meta( $object['id'], 'mbt_sample_url' );

	return $meta;
}

/**
 * Get book audio sample
 *
 * @method blueprint_blocks_mbt_get_sample_audio
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_get_sample_audio( $object ) {

	$meta = get_post_meta( $object['id'], 'mbt_sample_audio' );

	return $meta;
}

/**
 * Get book cover image
 *
 * @method blueprint_blocks_mbt_get_cover
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_get_cover( $object ) {

	$cover_id = get_post_meta( $object['id'], 'mbt_book_image_id' );

	return $cover_id;
}

/**
 * Get book ASIN
 *
 * @method blueprint_blocks_mbt_get_asin
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_get_asin( $object ) {

	$meta = get_post_meta( $object['id'], 'mbt_unique_id_asin' );

	return $meta;
}

/**
 * Get book tagline / teaser
 *
 * @method blueprint_blocks_mbt_get_tagline
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_get_tagline( $object ) {

	$meta = get_post_meta( $object['id'], 'mbt_book_teaser' );

	return $meta;
}

/**
 * Get editor style URL - path to button packs
 *
 * @method blueprint_blocks_mbt_editor_style
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_editor_style( $object ) {

	$style_url = BLUEPRINT_BLOCKS_PLUGIN_URL . 'assets/button-packs/blueprint-buttons/';

	return $style_url;
}

/**
 * Get book author meta information
 *
 * @method blueprint_blocks_mbt_get_author_meta
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_get_author_meta( $object ) {

	$tax_meta    = get_option( 'mbt_author_meta' );
	$object_meta = $tax_meta[ $object['id'] ];

	return $object_meta;
}

/**
 * Get book excerpt
 *
 * @method blueprint_blocks_mbt_book_excerpt
 * @param  mixed $object post object.
 * @return mixed $meta data
 */
function blueprint_blocks_mbt_book_excerpt( $object ) {

	global $post;
	$excerpt = wpautop( $post->post_excerpt );
	$excerpt = trim( preg_replace( '/\s/', ' ', $excerpt ) );

	return $excerpt;
}
