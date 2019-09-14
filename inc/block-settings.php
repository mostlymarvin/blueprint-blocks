<?php
   /*
   * Register  Block Categories
   */

function blueprint_block_categories( $categories, $post ) {

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
add_filter( 'block_categories', 'blueprint_block_categories', 10, 2 );
