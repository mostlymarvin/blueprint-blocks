<?php
/**
 * Init
 *
 * @package Blueprint_Blocks
 * @author    Memphis McKay
 */

/* Setup - scripts and styles, etc. */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/setup.php';

/* Custom CSS for MBT buttons */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/custom-css.php';

/* Add Blueprint Button packs to MBT */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/button-packs.php';

/* Helper functions */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/functions.php';

/* Customizer */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/customizer.php';

/* Block settings */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/block-settings.php';

/* Block registrations */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/block-registration.php';

/* Rest settings */
require_once BLUEPRINT_BLOCKS_PLUGIN_PATH . 'inc/rest-settings.php';
