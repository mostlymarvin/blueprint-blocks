<?php
/**
 * Plugin Name:       Blueprint Blocks
 * Description:       A collection of blocks and add-ons for Authors using MyBookTable
 * Version:           1.0.1
 * Author:            Memphis McKay
 * Author URI:        https://memphismckay.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       blueprint-blocks
 * Domain Path:       /languages
 *
 * @package Blueprint_Blocks
 */

defined( 'ABSPATH' ) || exit;

define( 'BLUEPRINT_BLOCKS_VERSION', '1.0.1' );
define( 'BLUEPRINT_BLOCKS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'BLUEPRINT_BLOCKS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/* Load Assets and Functions */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/init.php';

/* Load Block Assets and Functions */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'blocks/src/init.php';
