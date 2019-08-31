<?php
   /*
   * Register  Blocks and Assets
   */

  function my_plugin_block_categories( $categories, $post ) {
    
  return array_merge(
        $categories,
        array(
            array(
                'slug' => 'blueprint-blocks',
                'title' => __( 'Blueprint', 'blueprint-blocks' ),
                'icon'  => '',
            ),
        )
    );
  
}
add_filter( 'block_categories', 'my_plugin_block_categories', 10, 2 );


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
      plugins_url( 'dist/css/blocks.style.build.css', dirname(__FILE__ )),
      array()
    );
    
    // Register our block's editor-specific CSS
    wp_register_style(
      'blueprint-blocks-editor-style',
      plugins_url('/dist/css/blocks.editor.build.css', dirname(__FILE__)),
      array( 'wp-edit-blocks' )
    );  

    
    $blocks = array(
      array(
        'name' => 'mbt-book',
        'render_callback' => 'blueprint_dynamic_render_mbt_book_block',
      ),
    );

    if( defined( 'MBT_VERSION' ) ) {
      unset( $blocks['mbt-book'] );
    }

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


require_once plugin_dir_path( __FILE__ ) . 'mbt-book/index.php';
require_once plugin_dir_path( __FILE__ ) . 'blueprint-author/index.php';



