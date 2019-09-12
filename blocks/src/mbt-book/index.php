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

function blueprint_dynamic_render_mbt_buttons( $atts ) {

  $buylinks = !empty( $atts['buylinks'] ) ? $atts['buylinks'] : array();
  $styleURL = blueprint_dynamic_get_mbt_style_url();


  $compliantStyle = false;
  $buttons = '<div class="mbt-book-buybuttons">';

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

   $buttons .= '</div>';

   return $buttons;
}
