<?php
   /**
   * Block: MBT Book
   * Functions to render dynamic block
   */


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
   $style_url = plugins_url( 'blueprint-blocks/extras/assets/button-packs/blueprint-buttons/' );

   if( function_exists( 'mbt_current_style_url') ) {
        $style_url =  mbt_current_style_url( null );
   }

   return $style_url;

}

/**
 * [If the user changes the button style set in MBT then we want to reflect
 * that change in the front end, without making extra work for the user. ]
 * @method blueprint_dynamic_render_mbt_buttons
 * @param  [array]  $buylinks [array of buylinks for book]
 * @param  [string] $styleURL [set in block attrubutes]
 * @return [html]  returns formatted buttons using current styles.
 */

function blueprint_dynamic_render_mbt_buttons( $buylinks, $styleURL ) {
   $compliantStyle = false;
   $buttons = '';

   $settings = get_option( 'mbt_settings', array() );
   $style = !empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';

   /**
   * Default style packs which have compliant buttons
   */
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

         /**
          * Compliant buttons are a mini-set of buttons, and don't
          * contain all the shop buttons. So, if the compliant pack
          * is in use, but the button in question is not for one of the 3 compliant
          * vendors, we'll strip the _compli from the image link and grab the image
          * from the parent button set.
          */
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

  $blocks = parse_blocks( get_the_content() );
  //print_r( $blocks );
  $thisContent = [];
  foreach( $blocks as $block ) {
    if(  'blueprint-blocks/mbt-book' === $block['blockName'] ) {
      $thisContent[] = $block;
    }
  }
  print_r( $thisContent );
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
   $className = !empty( $atts['className'] ) ? $atts['className'] : false;
   $align = !empty( $atts['align'] ) ? 'align' .  $atts['align'] : false;
   $alignReadMore = !empty( $atts['alignReadMore'] ) ? $atts['alignReadMore'] : 'btn-inline';
   $audioSample = !empty( $atts['audioSample'] ) ? $atts['audioSample'] : false;
   $anchor = !empty( $atts['anchor'] ) ? $atts['anchor'] : false;
   $bookSample = !empty( $atts['bookSample'] ) ? $atts['bookSample'] : false;
   $buylinks = !empty( $atts['buylinks'] ) ? $atts["buylinks"] : array();
   $buttonsLabel = !empty( $atts['buttonsLabel']) ? $atts['buttonsLabel'] : 'Now Available From';
   $colorBG = !empty( $atts['colorBG'] ) ? $atts['colorBG'] : '';
   $colorReadMoreLink = !empty( $atts['colorReadMoreLink'] ) ? $atts['colorReadMoreLink'] : false;
   $colorReadMoreLinkBG = !empty( $atts['colorReadMoreLinkBG'] ) ? $atts['colorReadMoreLinkBG'] : false;
   $colorText = !empty( $atts['colorText'] ) ? $atts['colorText'] : '';
   $colorTitle = !empty( $atts['colorTitle'] ) ? $atts['colorTitle'] : false;
   $colorTitlePrefix = !empty( $atts['colorTitlePrefix'] ) ? $atts['colorTitlePrefix'] : false;
   $cover = !empty( $atts['cover'] ) ? $atts["cover"] : false;
   $customBlurb = !empty( $atts['customBlurb'] ) ? $atts['customBlurb'] : get_the_excerpt( $selectedPost );
   $flexReverse = !empty( $atts['flexReverse'] ) ? true : false;
   $maxWidthInner = !empty( $atts['maxWidthInner'] ) ? $atts['maxWidthInner'] : '1400';
   $mbtActive = ( defined( 'MBT_VERSION' ) )  ? true : false;
   $readMoreLink = !empty( $atts['readMoreLink'] ) ? $atts['readMoreLink'] : false ;
   $readMoreText = !empty( $atts['readMoreText'] ) ? $atts['readMoreText'] : 'Read More';
   $tagline = !empty( $atts['customTagline'] ) ? $atts["customTagline"] : false;
   $titleFontSize = !empty( $atts['titleFontSize'] ) ? $atts['titleFontSize'] : '24';
   $title = !empty( $atts['title'] ) ? $atts["title"] : get_the_title( $selectedPost );
   $titlePrefix = !empty( $atts['titlePrefix'] ) ? $atts['titlePrefix'] : false;

   $display = !empty( $atts['displaySettings'] ) ? $atts['displaySettings'] : array();
   $showBuylinks = ( !empty( $display['buylinks'] ) && $display['buylinks'] === 'show' )  ? true : false;
   $showMoreLink = ( !empty( $display['moreLink'] ) && $display['moreLink'] === 'show' ) ? true : false;
   $showSampleLinks = ( !empty( $display['sampleLinks'] ) && $display['sampleLinks'] === 'show' ) ? true : false;

   $flexClass = $flexReverse ? 'flex-row-reverse' : 'flex-row';
   $allowedTags = blueprint_blocks_get_allowed_tags();

   /**
    * Block Styles
    */
    $blockStyles = 'style="';

    if( $colorBG || $colorText ) {
       $blockStyles .= sprintf(
          'background-color:%1$s;color:%2$s;',
          sanitize_hex_color( $colorBG ),
          sanitize_hex_color( $colorText)
       );
     }

    if( $colorBG ) {
      $className .= ' has-background-color';
    }

    $blockStyles .= '"';

    $blockInnerStyle = '';
    if( $align === 'alignfull' || $align === 'alignwide') {
      $blockInnerStyle .= 'style="width:' . absint( $maxWidthInner ) . 'px;"';
    }

    /**
     * Set Title Style
     * @var [type]
     */
    $blockTitleStyle = sprintf(
       'style="font-size:%1$spx;"',
       intval( $titleFontSize )
    );

    $titleColor = $colorTitle ? $colorTitle : $colorText;

    if( $titleColor ) {
      $blockTitleStyle = sprintf(
         'style="font-size:%1$spx; color:%2$s;"',
         intval( $titleFontSize ),
         sanitize_hex_color( $titleColor )
      );
    }

    /**
     * Set Title Prefix Style if specified;
     * @var string
     */
    $prefixStyle = '';

    if( $colorTitlePrefix ) {
      $prefixStyle = 'style="color:' . sanitize_hex_color( $colorTitlePrefix ) . '";';
    }


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
   if( $titlePrefix ) {
     $title_prefix = sprintf(
       '<span class="title-prefix" %1$s>%2$s</span>',
       $prefixStyle,
       wp_kses_post( $titlePrefix )
     );
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

   /**
    * If MBT is not active, hide the "read more" button because it will likely go to a 404 page.
    */

    if( $showMoreLink && $mbtActive ) {
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

   /**
    *Figure out block class and idea
    */

   $class = 'wp-block-blueprint-blocks-mbt-book';
   if( $className ) { $class .= ' ' . $className; }
   if( $align ) { $class .= ' ' . $align; }

   $id = '';
   if( $anchor ) { $id = 'id="' . esc_attr( $anchor ) . '"'; }


  /**
   * [$html : block output]
   *
   */
   $html = sprintf(
   '<div class="%1$s" %10$s>
   <div class="inner is-flex %2$s" %11$s>
   <div class="preview-left">
   %3$s
   %4$s
   </div>
   <div class="preview-right">
   <div class="preview-right-top">
   <h2 class="preview-title" %12$s>%5$s %6$s</h2>
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
   $blockStyles,
   $blockInnerStyle,
   $blockTitleStyle
   );

   return $html;
}
