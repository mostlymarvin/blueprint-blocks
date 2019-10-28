<?php
/**
 * Block: MBT Book
 * Functions to render dynamic block
 *
 * @package Blueprint_Blocks
 */

/**
 * Allowed tags for wp_kses()
 *
 * @method blueprint_blocks_get_allowed_tags
 * @return array $tags allowed html tags
 */
function blueprint_blocks_get_allowed_tags() {

	$allowed_atts = array(
		'class' => array(),
		'id'    => array(),
	);

	$allowed_tags = array(
		'a'      => array(
			'href'   => array(),
			'title'  => array(),
			'target' => array(),
			'class'  => array(),
			'id'     => array(),
		),
		'br'     => array( $allowed_atts ),
		'em'     => array( $allowed_atts ),
		'strong' => array( $allowed_atts ),
		'span'   => array( $allowed_atts ),
		'i'      => array( $allowed_atts ),
		'b'      => array( $allowed_atts ),
		'br'     => array(),
	);

	return $allowed_tags;
}

/**
 * Provide backup button style directory for mbt-book block
 * in case MBT books is inactive
 *
 * @method blueprint_dynamic_get_mbt_style_url
 * @return string directory for button style
 */
function blueprint_dynamic_get_mbt_style_url() {

	$style_url = plugins_url( 'blueprint-blocks/extras/assets/button-packs/blueprint-buttons/' );

	if ( function_exists( 'mbt_current_style_url' ) ) {
		$style_url = mbt_current_style_url( null );
	}

	return $style_url;
}

/**
 * [If the user changes the button style set in MBT then we want to reflect
 * that change in the front end, without making extra work for the user. ]
 *
 * @method blueprint_dynamic_render_mbt_buttons
 * @param  array $args buylinks - left as array for future.
 * @return mixed html formatted buttons
 */
function blueprint_dynamic_render_mbt_buttons( $args ) {

	$buylinks  = ! empty( $args['buylinks'] ) ? $args['buylinks'] : array();
	$style_url = blueprint_dynamic_get_mbt_style_url();

	$compliant_style = false;
	$buttons         = '<div class="mbt-book-buybuttons">';

	$settings = get_option( 'mbt_settings', array() );
	$style    = ! empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';
	/**
	* Default style packs which have compliant buttons
	*/
	$compliant_style_packs = array(
		'blue_flat_compli',
		'gold_flat_compli',
		'golden_compli',
		'green_flat_compli',
		'grey_flat_compli',
		'orange_flat_compli',
		'silver_compli',
	);

	$compliant_stores = array(
		'amazon',
		'itunes',
		'ibooks',
	);

	if ( in_array( $style, $compliant_style_packs, true ) ) {
		$compliant_style = true;
	}

	if ( ! empty( $buylinks ) && is_array( $buylinks ) ) :

		foreach ( $buylinks as $buylink ) {

			$url              = ! empty( $buylink['url'] ) ? $buylink['url'] : false;
			$store            = ! empty( $buylink['store'] ) ? $buylink['store'] : false;
			$image_url        = $style_url;
			$class            = 'mbt-book-buybutton';
			$compliant_button = false;

			if ( in_array( $store, $compliant_stores, true ) ) {
				$compliant_button = true;
				$class           .= ' compliant-buttons';
			}

			/**
			 * Compliant buttons are a mini-set of buttons, and don't
			 * contain all the shop buttons. So, if the compliant pack
			 * is in use, but the button in question is not for one of
			 * the 3 compliant vendors, we'll strip the _compli from
			 * the image link and grab the image from the parent button set.
			 */
			if ( $compliant_style && ! $compliant_button ) {
				$image_url = str_replace( '_compli', '', $style_url );
			}

			$button = sprintf(
				'<div class="%4$s">
            <a class="image-link" href="%1$s">
            <img class="image-link" src="%3$s%2$s_button.png" alt="buy from %2$s"/></a></div>',
				esc_url( $url ),
				wp_strip_all_tags( $store ),
				$image_url,
				esc_attr( $class )
			);

			if ( $url && $store ) {
				$buttons .= $button;
			}
		}
	endif;

	$buttons .= '</div>';

	return $buttons;
}

add_shortcode( 'blueprint_mbt_buttons', 'blueprint_shortcode_render_mbt_buttons' );
/**
 * Shortcode for rendering buttons
 *
 * @method blueprint_shortcode_render_mbt_buttons
 * @param  array $atts shortcode attributes.
 * @param  mixed $content null.
 * @return mixed $buttons formatted buttons
 */
function blueprint_shortcode_render_mbt_buttons( $atts, $content = null ) {

	$atts = shortcode_atts(
		array(
			'id' => '',
		),
		$atts
	);

	if ( ! $atts['id'] ) {
		return false;
	}

	$buylinks = get_post_meta( $atts['id'], 'mbt_buybuttons' );
	$buylinks = $buylinks[0];
	$args     = array(
		'buylinks' => $buylinks,
	);

	$buttons = blueprint_dynamic_render_mbt_buttons( $args );
	return $buttons;
}
