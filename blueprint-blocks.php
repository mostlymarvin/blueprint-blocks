<?php
/**
 * Plugin Name: Blueprint Blocks
 * Description: A collection of blocks and add-ons for Authors using MyBookTable
 * Version: 1.0.0
 * Author: Memphis McKay
 *
 * @package blueprint-blocks
 */

defined( 'ABSPATH' ) || exit;

define ( 'BLUEPRINT_BLOCKS_VERSION', '1.0.0' );
define( 'BLUEPRINT_BLOCKS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

require_once plugin_dir_path( __FILE__ ) . 'inc/init.php';

require_once plugin_dir_path( __FILE__ ) . 'blocks/src/init.php';
