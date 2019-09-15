<?php
   /*
   * Register Blocks
   */


function blueprint_blocks_register_blocks() {

  wp_enqueue_script( 'wp-api' );

  // Register our block script with WordPress
  wp_register_script(
    'blueprint-blocks',
    plugins_url('/blueprint-blocks/blocks/dist/blocks.build.js' ),
    array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' )
  );

  // Register our block's base CSS
  wp_register_style(
    'blueprint-blocks-style',
    plugins_url( '/blueprint-blocks/blocks/dist/blocks.style.build.css' ),
    array()
  );

  // Register our block's editor-specific CSS
  wp_register_style(
    'blueprint-blocks-editor-style',
    plugins_url('/blueprint-blocks/blocks/dist/blocks.editor.build.css'),
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
    array(
      'name' => 'recent-posts',
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
