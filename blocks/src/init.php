<?php
   /*
   * Register  Blocks and Assets
   */

  function blueprint_blocks_register_blocks() {

    wp_enqueue_script( 'wp-api' );
    // Register our block script with WordPress
    wp_register_script(
      'blueprint-blocks',
      plugins_url('/dist/blocks.build.js', dirname(__FILE__)),
      array('wp-blocks', 'wp-element', 'wp-editor')
    );
  
    // Register our block's base CSS  
    wp_register_style(
      'blueprint-blocks-style',
      plugins_url( 'dist/blocks.style.build.css', dirname(__FILE__ )),
      array()
    );
    
    // Register our block's editor-specific CSS
    wp_register_style(
      'blueprint-blocks-editor-style',
      plugins_url('/dist/blocks.editor.build.css', dirname(__FILE__)),
      array( 'wp-edit-blocks' )
    );  


    $blocks = array(
        'mbt-book',
    );
    

    foreach( $blocks as $block ) {
        // Enqueue the script in the editor
        register_block_type('blueprint-blocks/' . $block, array(
            'style' => 'blueprint-blocks-style',
            'editor_script' => 'blueprint-blocks',
            'editor_style' => 'blueprint-blocks-editor-style',
        
        ));
    }

  }
  
add_action('init', 'blueprint_blocks_register_blocks');