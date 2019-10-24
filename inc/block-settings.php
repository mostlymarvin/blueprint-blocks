<?php
/**
 * Register  Block Categories
 *
 * @package   Blueprint_Blocks
 * @author    Memphis McKay
 */

add_filter( 'block_categories', 'blueprint_block_categories', 10, 2 );

/**
 * Add custom category for blocks defined by plugin
 *
 * @method blueprint_block_categories
 * @param array $categories block categories to add to.
 * @param mixed $post post object.
 */
function blueprint_block_categories( $categories, $post ) {
	/* merge our custom category with existing block categories */
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'blueprint-blocks',
				'title' => __( 'Blueprint', 'blueprint-blocks' ),
				'icon'  => '',
			),
		)
	);
}
