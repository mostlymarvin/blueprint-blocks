<?php
   /*
   Block: MBT Book
   * Functions to add mbt fields to Rest API
   */


add_filter( 'register_post_type_args', 'blueprint_blocks_add_api_to_mbt_book', 10, 2 );

function blueprint_blocks_add_api_to_mbt_book( $args, $post_type ) {

   if ( 'mbt_book' === $post_type ) {
      $args['show_in_rest'] = true;

      // Optionally customize the rest_base or rest_controller_class
      $args['rest_base']             = 'mbt_book';
      $args['rest_controller_class'] = 'WP_REST_Posts_Controller';
      $args['supports'][] = 'excerpt';
   }

   return $args;
}

add_action( 'rest_api_init', 'blueprint_blocks_create_api_meta_fields' );

function blueprint_blocks_create_api_meta_fields() {

   register_rest_field(
      'mbt_book',
      'mbt_buybuttons',
      array(
      'get_callback' => 'blueprint_blocks_mbt_get_book_buylinks',
      )
      );

   register_rest_field(
      'mbt_book',
      'mbt_sample_audio',
      array(
      'get_callback' =>  'blueprint_blocks_mbt_get_sample_audio',
      )
      );

   register_rest_field(
      'mbt_book',
      'mbt_sample_url',
         array(
         'get_callback' => 'blueprint_blocks_mbt_get_sample_url',
         )
      );

   register_rest_field(
      'mbt_book',
      'mbt_book_image_id',
         array(
         'get_callback' => 'blueprint_blocks_mbt_get_cover',
         )
      );

   register_rest_field(
   'mbt_book',
   'mbt_unique_id_asin',
         array(
         'get_callback' => 'blueprint_blocks_mbt_get_asin',
         )
   );

   register_rest_field(
   'mbt_book',
   'mbt_book_teaser',
      array(
         'get_callback' => 'blueprint_blocks_mbt_get_tagline',
      )
   );
   register_rest_field(
      'mbt_book',
      'mbt_editor_style_url',
         array(
         'get_callback' => 'blueprint_blocks_mbt_editor_style',
         )
   );

 }

add_filter( 'blueprint_rest_fields', 'blueprint_blocks_mbt_get_mbt_status' );

function blueprint_blocks_mbt_get_mbt_status( $object ) {
   $status = false;

   if( defined( 'MBT_VERSION' ) ) {
      $status = true;
   }
	return array(
      'mbt_active' => $status
   );
}

function blueprint_blocks_mbt_get_book_buylinks( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_buybuttons' );
	return $meta;
}

function blueprint_blocks_mbt_get_sample_url( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_sample_url' );
	return $meta;

}
function blueprint_blocks_mbt_get_sample_audio( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_sample_audio' );
	return $meta;

}
function blueprint_blocks_mbt_get_cover( $object ) {
  $cover_id = get_post_meta( $object['id'], 'mbt_book_image_id' );
  return $cover_id;
}

function blueprint_blocks_mbt_get_asin( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_unique_id_asin' );
	return $meta;
}

function blueprint_blocks_mbt_get_tagline( $object ) {
	$meta = get_post_meta( $object['id'], 'mbt_book_teaser' );
	return $meta;
}

function blueprint_blocks_mbt_editor_style( $object ) {
   $style_url = plugins_url( 'blueprint-blocks/blocks/src/mbt-book/buttons/' );
	return $style_url;
}

function blueprint_blocks_get_allowed_tags() {
   $allowed_atts = array(
      'class' => array(),
      'id' => array(),
   );

   $allowedTags  = array(
      'a' => array(
         'href' => array(),
         'title' => array(),
         'target' => array(),
         'class' => array(),
         'id' => array(),
      ),
      'br' => array( $allowed_atts ),
      'em' => array( $allowed_atts ),
      'strong' => array( $allowed_atts ),
      'span' => array( $allowed_atts ),
      'i' => array( $allowed_atts ),
      'b' => array( $allowed_atts ),
      'br' => array(),
   );

   return $allowedTags;
}

function blueprint_dynamic_get_mbt_style_url() {
   $style_url = plugins_url( 'blueprint-blocks/blocks/src/mbt-book/buttons/' );

   if( function_exists( 'mbt_current_style_url') ) {
        $style_url =  mbt_current_style_url( null );
   }

   return $style_url;

}

function blueprint_dynamic_render_mbt_buttons( $buylinks, $styleURL ) {
   $compliantStyle = false;
   $buttons = '';

   $settings = get_option( 'mbt_settings', array() );
   $style = !empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint_custom';

   /**
    * Not actually using this part yet but might need it later
    */
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

   $compliant_style_packs = array(
   'blue_flat_compli',
   'gold_flat_compli',
   'golden_compli',
   'green_flat_compli',
   'grey_flat_compli',
   'orange_flat_compli',
   'silver_compli',
   );

   $compliant_stores = array(
   'amazon',
   'itunes',
   'ibooks',
   );

   if( in_array( $style, $compliant_style_packs ) ) {
      $compliantStyle = true;
   }

   if( !empty( $buylinks ) && is_array( $buylinks ) ) :

      foreach( $buylinks as $buylink ) {

         $url = !empty( $buylink['url'] ) ? $buylink['url'] : false;
         $store = !empty( $buylink['store'] ) ? $buylink['store'] : false;
         $imageURL = $styleURL;
         $class = 'mbt-book-buybutton';

         $compliantButton = false;

         if( in_array( $store, $compliant_stores ) ) {
            $compliantButton = true;
            $class .= ' compliant-buttons';
         }
         if( $compliantStyle && !$compliantButton ) {
            $imageURL = str_replace( '_compli', '', $styleURL );
         }

         $button = sprintf(
            '<div class="%4$s">
            <a class="image-link" href="%1$s">
            <img class="image-link" src="%3$s%2$s_button.png" alt="buy from %2$s"/></a></div>',
            esc_url( $url ),
            strip_tags( $store ),
            $imageURL,
            esc_attr( $class )
         );

         if( $url && $store ) {
            $buttons .= $button;
         }
      }
   endif;

   return $buttons;
}


function blueprint_dynamic_render_mbt_book_block( $atts ) {

   $selectedPost = !empty( $atts['selectedPost'] ) ? $atts["selectedPost"] : false;

   /**
    * No sense in going through all this if there is no book selected.
    */
   if( !$selectedPost ) {
      return false;
   }

   /**
    * Simple true/false vars
    */
   $audioSample = !empty( $atts['audioSample'] ) ? $atts['audioSample'] : false;
   $bookSample = !empty( $atts['bookSample'] ) ? $atts['bookSample'] : false;
   $buylinks = !empty( $atts['buylinks'] ) ? $atts["buylinks"] : array();
   $buttonsLabel = !empty( $atts['buttonsLabel']) ? $atts['buttonsLabel'] : 'Now Available From';
   $colorBG = !empty( $atts['colorBG'] ) ? $atts['colorBG'] : '';
   $colorReadMoreLink = !empty( $atts['colorReadMoreLink'] ) ? $atts['colorReadMoreLink'] : false;
   $colorReadMoreLinkBG = !empty( $atts['colorReadMoreLinkBG'] ) ? $atts['colorReadMoreLinkBG'] : false;
   $colorText = !empty( $atts['colorText'] ) ? $atts['colorText'] : '';
   $cover = !empty( $atts['cover'] ) ? $atts["cover"] : false;
   $customBlurb = !empty( $atts['customBlurb'] ) ? $atts['customBlurb'] : get_the_excerpt( $selectedPost );
   $flexReverse = !empty( $atts['flexReverse'] ) ? true : false;
   $mbtActive = !empty( $atts['mbtActive'] )  ? true : false;
   $readMoreLink = !empty( $atts['readMoreLink'] ) ? $atts['readMoreLink'] : get_the_permalink( $selectedPost );
   $readMoreText = !empty( $atts['readMoreText'] ) ? $atts['readMoreText'] : 'Read More';
   $tagline = !empty( $atts['customTagline'] ) ? $atts["customTagline"] : false;
   $title = !empty( $atts['title'] ) ? $atts["title"] : get_the_title( $selectedPost );
   $titlePrefix = !empty( $atts['titlePrefix'] ) ? $atts['titlePrefix'] : false;

   $display = !empty( $atts['displaySettings'] ) ? $atts['displaySettings'] : array();
   $showBuylinks = ( !empty( $display['buylinks'] ) && $display['buylinks'] === 'show' )  ? true : false;
   $showMoreLink = ( !empty( $display['moreLink'] ) && $display['moreLink'] === 'show' ) ? true : false;
   $showSampleLinks = ( !empty( $display['sampleLinks'] ) && $display['sampleLinks'] === 'show' ) ? true : false;

   //print_r( $display );
   $blockStyles = '';

   if( $colorBG || $colorText ) {
      $blockStyles = sprintf(
         'style="background-color:%1$s;color:%2$s;"',
         sanitize_hex_color( $colorBG ),
         sanitize_hex_color( $colorText)
      );
   }
   /**
    * vars with defaults
    */

   $flexClass = $flexReverse ? 'flex-row-reverse' : 'flex-row';
   $allowedTags = blueprint_blocks_get_allowed_tags();


   /**
    * Buylinks
    */
   $styleURL = blueprint_dynamic_get_mbt_style_url();
   $buttons = '';
   $buylinkSection = '';

   if( $showBuylinks && $buylinks ) {
      $buttons = blueprint_dynamic_render_mbt_buttons( $buylinks, $styleURL );

      $buylinkSection = sprintf(
         '<div class="buylinks"><h5 class="buttons-label" %1$s>%2$s</h5> <div class="mbt-book blueprint-mbt-book">
         <div class="mbt-book-buybuttons">%3$s</div></div> </div>',
         $blockStyles,
         $buttonsLabel,
         $buttons
      );
   }


   $class = 'wp-block-blueprint-blocks-mbt-book';
   $audioSampleLink = '';
   $bookSampleLink = '';
   $cover_links = '';
   $cover_markup = '';
   $divider = '';
   $read_more_link = '';
   $readMoreStyle = '';
   $title_prefix = '';


   if( $audioSample ) {
      $audioSampleLink = sprintf(
         '<a className="preview-link audio-sample" %2$s
         href="%1$s">Hear Audiobook Sample</a>',
         esc_url( $audioSample ),
         $blockStyles
      );
   }

   if( $bookSample ) {
      $bookSampleLink = sprintf(
         '<a className="preview-link book-sample" %2$s
         href="https://read.amazon.com/kp/embed?asin=%1$s&preview=newtab">
         View Book Sample</a>',
         strip_tags( $bookSample ),
         $blockStyles
      );
   }
   if( $audioSample && $bookSample ) {
      $divider = '<span class="divider" ' . $blockStyles . '>&nbsp;|&nbsp;</span>';
   }


   if( ( $audioSample || $bookSample ) && $showSampleLinks ) {
      $cover_links = sprintf(
         '<div class="cover-links special">%1$s %2$s %3$s</div>',
         $bookSampleLink,
         $divider,
         $audioSampleLink
      );
   }

   if( $cover ) {
      $cover_markup = sprintf(
         '<a href="%1$s" class="image-link">
         <img src="%2$s" class="preview-cover" alt="%3$s"/></a>',
         esc_url( $readMoreLink ),
         $cover,
         $title
      );
   }


   if( $titlePrefix ) {
      $title_prefix = '<span class="title-prefix">' . wp_kses_post( $titlePrefix ) . '</span>' ;
   }

   $readMoreClass = 'button button-primary button-small bpb-more';

   if( $colorReadMoreLinkBG || $colorReadMoreLink ) :
      $readMoreClass = 'button button-small bpb-more';
      $readMoreStyle = 'style="';

      if( $colorReadMoreLink ) {
         $readMoreStyle .= 'color: ' . sanitize_hex_color( $colorReadMoreLink ) . '; ';
      }
      if( $colorReadMoreLinkBG ) {
         $readMoreStyle .= 'background-color: ' . sanitize_hex_color( $colorReadMoreLinkBG ) . '; ';
      }

      $readMoreStyle .= '"';
   endif;

   if( $showMoreLink ) {
      $read_more_link =  sprintf(
         '<a class="%1$s" href="%2$s" %4$s>%3$s</a>',
         $readMoreClass,
         esc_url( $readMoreLink ),
         strip_tags( $readMoreText ),
         $readMoreStyle
      );
   }

   /**
    * Strip 'p' tags from last paragraph of blurb so we can insert
    * an inline read-more link, reformat with 'p' tags.
    */

   $paragraphs = explode( '<p>', $customBlurb );

   $count = '';
   if( $paragraphs ) {
      $count = count( $paragraphs );
   }
   $count = $count -1;

   $lastP = wp_kses( $paragraphs[$count], $allowedTags );
   $paragraphs[$count] =  $lastP . ' ' . $read_more_link;

   $bestBlurb = implode( '<p>', $paragraphs );


   $html = sprintf(
   '<div class="%1$s" %10$s>
   <div class="inner is-flex %2$s">
   <div class="preview-left">
   %3$s
   %4$s
   </div>
   <div class="preview-right">
   <div class="preview-right-top">
   <h2 class="preview-title" %10$s>%5$s %6$s</h2>
   <div class="preview-tagline">%7$s</div>
   <div class="preview-blurb">%8$s</div></div>
   %9$s
   </div></div></div>',
   esc_attr( $class ),
   esc_attr( $flexClass ),
   $cover_markup,
   $cover_links,
   $title_prefix,
   wp_kses_post( $title ),
   wp_kses_post( $tagline ),
   wp_kses_post( $bestBlurb ),
   $buylinkSection,
   $blockStyles
   );

   return $html;
}

function blueprint_maybe_render_button_styles() {

   $load_blueprint_styles  = true;

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

   if( in_array( $style, $default_style_packs ) ) {
     $load_blueprint_styles = false;
   }

   wp_register_style(
     'blueprint-blocks-mbt-buttons-style',
     plugins_url('blueprint-blocks/blocks/dist/css/blocks.buttons.build.css'),
     array()
   );

   if( !defined( 'MBT_VERSION' ) || $load_blueprint_styles ) {
     wp_enqueue_style( 'blueprint-blocks-mbt-buttons-style' );
   }
}
add_action('wp_enqueue_scripts', 'blueprint_maybe_render_button_styles');
add_action('enqueue_block_editor_assets','blueprint_maybe_render_button_styles');
add_action('enqueue_block_assets','blueprint_maybe_render_button_styles');
