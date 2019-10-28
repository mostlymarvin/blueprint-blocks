<?php
/**
 * Setup scripts and styles
 *
 * @package   Blueprint_Blocks
 * @author    Memphis McKay
 */

add_action( 'wp_enqueue_scripts', 'blueprint_extras_scripts' );
add_action( 'customize_preview_init', 'blueprint_extras_live_preview' );

/**
 * Register scripts
 *
 * @method blueprint_extras_scripts
 */
function blueprint_extras_scripts() {

	$settings     = get_option( 'mbt_settings', array() );
	$active_style = ! empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';

	$blueprint_button_packs = array(
		'blueprint-buttons',
		'blueprint-simple-buttons',
	);

	/* Register style */
	wp_register_style(
		'blueprint-extras',
		BLUEPRINT_BLOCKS_PLUGIN_URL . 'assets/css/blueprint-extras.css',
		'',
		BLUEPRINT_BLOCKS_VERSION
	);

	/* Register WP_Scripts::reset */
	wp_register_script(
		'blueprint-extras-js',
		BLUEPRINT_BLOCKS_PLUGIN_URL . 'assets/js/blueprint-extras.js',
		'',
		BLUEPRINT_BLOCKS_VERSION,
		true
	);

	/* Only enqueue stylesheet and scripts if the active button style is Blueprint and MBT is active */
	if ( in_array( $active_style, $blueprint_button_packs, true ) || ! defined( 'MBT_VERSION' ) ) {

		wp_enqueue_style( 'blueprint-extras' );
		wp_enqueue_script( 'blueprint-extras-js' );
	}
}

/**
 * Register scripts for Customizer live preview
 *
 * @method blueprint_extras_live_preview
 */
function blueprint_extras_live_preview() {

	wp_register_script(
		'blueprint-extras-customizer',
		BLUEPRINT_BLOCKS_PLUGIN_URL . 'assets/js/blueprint-customizer-preview.js',
		array( 'jquery', 'customize-preview' ),
		BLUEPRINT_BLOCKS_VERSION,
		false
	);

	/* Only enqueue if site is being previewed in customizer */
	if ( is_customize_preview() ) {

		wp_enqueue_script( 'blueprint-extras-customizer' );
	}
}
