<?php
/**
 * Add Button Packs to MBT
 *
 * @package   Blueprint_Blocks
 * @author    Memphis McKay
 */

add_filter( 'mbt_style_folders', 'blueprint_extras_add_button_packs' );

/**
 * [blueprint_extras_add_button_packs description]
 *
 * @method blueprint_extras_add_button_packs
 * @param array $folders MyBookTable style folders.
 */
function blueprint_extras_add_button_packs( $folders ) {

	$styledir = BLUEPRINT_BLOCKS_PLUGIN_PATH . 'assets/button-packs/';
	$styleuri = BLUEPRINT_BLOCKS_PLUGIN_URL . 'assets/button-packs';

	$folders[] = array(
		'dir' => $styledir,
		'url' => $styleuri,
	);

	return $folders;
}
