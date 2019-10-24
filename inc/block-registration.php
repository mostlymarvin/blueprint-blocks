<?php
/**
 * Block Registration
 *
 * @package   Blueprint_Blocks
 * @author    Memphis McKay
 */

add_action( 'init', 'blueprint_blocks_register_blocks', 2, 200 );

/**
 * Register block scripts and assets
 *
 * @method blueprint_blocks_register_blocks
 */
function blueprint_blocks_register_blocks() {

	wp_enqueue_script( 'wp-api' );

	/* Register our block script with WordPress */
	wp_register_script(
		'blueprint-blocks',
		BLUEPRINT_BLOCKS_PLUGIN_URL . 'blocks/dist/blocks.build.js',
		array( 'wp-i18n', 'wp-element', 'wp-blocks', 'wp-components', 'wp-editor' ),
		BLUEPRINT_BLOCKS_VERSION,
		true
	);

	/* Register our block's base CSS */
	wp_register_style(
		'blueprint-blocks-style',
		BLUEPRINT_BLOCKS_PLUGIN_URL . 'blocks/dist/blocks.style.build.css',
		array(),
		BLUEPRINT_BLOCKS_VERSION
	);

	/* Register our block's editor-specific CSS */
	wp_register_style(
		'blueprint-blocks-editor-style',
		BLUEPRINT_BLOCKS_PLUGIN_URL . 'blocks/dist/blocks.editor.build.css',
		array( 'wp-edit-blocks' ),
		BLUEPRINT_BLOCKS_VERSION
	);

	/* Array of blocks to register, with optional render_callbacks */
	$blocks = array(
		array(
			'name' => 'mbt-book',
		),
		array(
			'name' => 'author-profile',
		),
		array(
			'name' => 'social-links',
		),
		array(
			'name' => 'container',
		),
		array(
			'name'            => 'recent-posts',
			'render_callback' => 'blueprint_blocks_dynamic_recent_posts_block',
		),
	);

	/* Loop through block array and register */
	foreach ( $blocks as $block ) :
		$render_cb = '';

		if ( ! empty( $block['render_callback'] ) ) {
			$render_cb = $block['render_callback'];
		}

		register_block_type(
			'blueprint-blocks/' . $block['name'],
			array(
				'style'           => 'blueprint-blocks-style',
				'editor_script'   => 'blueprint-blocks',
				'editor_style'    => 'blueprint-blocks-editor-style',
				'render_callback' => $render_cb,
			)
		);

	endforeach;
}
