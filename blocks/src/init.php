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
      array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data')
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
       array(
         'name' => 'mbt-book',
         'render_callback' => 'blueprint_dynamic_render_mbt_book_block',
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

function blueprint_maybe_render_button_styles() {

    $load_blueprint_styles  = false;

    $settings = get_option( 'mbt_settings', array() );
    $style = $settings['style_pack'];
  
    $default_style_packs = array(
      'blue_flat_compli',
      'blue_flat',
      'gold_flat_compli',
      'gold_flat',
      'golden_compli',
      'golden',
      'green_flat_compli',
      'green_flat',
      'grey_flat',
      'grey_flat_compli',
      'orange_flat',
      'orange_flat_compli',
      'silver_compli',
      'silver',
    );

    if( !in_array( $style, $default_style_packs ) ) {
      $load_blueprint_styles = true;
    }
   
  if( !defined( 'MBT_VERSION' ) || $load_blueprint_styles ) {
        wp_register_style(
          'blueprint-blocks-mbt-buttons-style',
          plugins_url('/dist/blocks.buttons.build.css', dirname(__FILE__)),
          array( 'wp-edit-blocks' )
        ); 

      //wp_enqueue_style( 'blueprint-blocks-mbt-buttons-style' );
  }
}
//add_action( 'wp_enqueue_scripts', 'blueprint_maybe_render_button_styles' );
//add_action( 'enqueue_block_editor_assets', 'blueprint_maybe_render_button_styles' );