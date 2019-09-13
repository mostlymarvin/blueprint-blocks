<?php
   /*
   * Register Blocks
   */


function blueprint_blocks_register_blocks() {

  wp_enqueue_script( 'wp-api' );

  wp_register_script(
    'blueprint-filters',
    plugins_url('../dist/filters.build.js', dirname(__FILE__)),
    array('wp-api', 'wp-api-fetch', 'wp-element', 'wp-components' )
  );

  wp_enqueue_script( 'blueprint-filters' );



  // Register our block script with WordPress
  wp_register_script(
    'blueprint-blocks',
    plugins_url('../dist/blocks.build.js', dirname(__FILE__)),
    array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'blueprint-filters')
  );

  // Register our block's base CSS
  wp_register_style(
    'blueprint-blocks-style',
    plugins_url( '../dist/blocks.style.build.css', dirname(__FILE__ )),
    array()
  );

  // Register our block's editor-specific CSS
  wp_register_style(
    'blueprint-blocks-editor-style',
    plugins_url('../dist/blocks.editor.build.css', dirname(__FILE__)),
    array( 'wp-edit-blocks' )
  );

  $blocks = array(
    array(
      'name' => 'mbt-book',
    ),
    array(
      'name' => 'mbt-buylinks',
      'render_callback' => 'blueprint_dynamic_render_mbt_buttons',
    ),
     array(
      'name' => 'author-profile',
    ),
     array(
        'name' => 'social-links',
    ),
  );


  foreach( $blocks as $block ) {
    $render_cb = '';

    if( !empty( $block['render_callback'] ) ) {
      $render_cb = $block['render_callback'];
    }
      // Enqueue the script in the editor
      register_block_type('blueprint-blocks/' . $block['name'], array(
          'style' => 'blueprint-blocks-style',
          'editor_script' => 'blueprint-blocks',
          'editor_style' => 'blueprint-blocks-editor-style',
          'render_callback' => $render_cb,

      ));
  }

}

add_action('init', 'blueprint_blocks_register_blocks', 2, 200);
