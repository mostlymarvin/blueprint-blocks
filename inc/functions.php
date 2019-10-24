<?php
/**
 * Helper Functions
 *
 * @package   Blueprint_Blocks
 * @author    Memphis McKay
 */

add_filter( 'body_class', 'blueprint_extras_body_class' );

/**
 * Add body classes to help with styling
 *
 * @method blueprint_extras_body_class
 * @param  array $classes body classes.
 * @return array $classes
 */
function blueprint_extras_body_class( $classes ) {

	$settings = get_option( 'mbt_settings', array() );

	$active_style = ! empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';
	$book_size    = ! empty( $settings['book_button_size'] ) ? $settings['book_button_size'] : 'medium';
	$list_size    = ! empty( $settings['listing_button_size'] ) ? $settings['listing_button_size'] : 'medium';

	$button_size = $list_size;

	if ( in_array( 'single-mbt_book', $classes, true ) ) {
		$button_size = $book_size;
	}

	if ( 'blueprint-simple-buttons' === $active_style || 'blueprint-buttons' === $active_style ) {
		$classes[] = 'mbt-btn-size-' . $button_size;
	}

	if ( defined( 'MBT_VERSION' ) ) {
		$classes[] = $active_style;
	} else {
		$classes[] = 'blueprint-simple-buttons';
	}

	$classes[] = 'blueprint-extras';

	return $classes;
}
