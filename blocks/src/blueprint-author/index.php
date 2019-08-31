<?php
 /**
  * Block: Blueprint Author
  */
   

/**
 * Adds social links to user profile
 *
 * @param $user_contact
 * @return mixed
 */
function blueprint_author_social_links( $user_contact ) {
   /* Add user contact methods */
   $user_contact['profile_name'] = __('Display Name on Profile', 'blueprint-blocks');
   $user_contact['amazon'] = __('Amazon Link', 'blueprint-blocks');
   $user_contact['bookbub'] = __('BookBub Link', 'blueprint-blocks');
   $user_contact['facebook'] = __('Facebook Link', 'blueprint-blocks');
   $user_contact['instagram'] = __('Instagram Link', 'blueprint-blocks');
   $user_contact['linkedin'] = __('LinkedIn Link', 'blueprint-blocks');
   $user_contact['pinterest'] = __('Pinterest Link', 'blueprint-blocks');
   $user_contact['twitter'] = __('Twitter Link', 'blueprint-blocks');
   
   return $user_contact;
}
add_filter('user_contactmethods', 'blueprint_author_social_links');


add_action( 'rest_api_init', 'blueprint_blocks_create_api_user_fields' );

function blueprint_blocks_create_api_user_fields() {

   register_rest_field( 
      'user', 
      'profile_display_name', 
      array(
      'get_callback' => 'blueprint_blocks_mbt_get_profile_display_name',
      )
   );

   $social_links = array(
      array(
         'name' => 'amazon',
         'callback' => 'blueprint_blocks_get_amazon_link',
      ),
      array(
         'name' => 'bookbub',
         'callback' => 'blueprint_blocks_get_bookbub_link',
      ),
      array(
         'name' => 'facebook',
         'callback' => 'blueprint_blocks_get_facebook_link',
      ),
      array(
         'name' => 'instagram',
         'callback' => 'blueprint_blocks_get_instagram_link',
      ),
      array(
         'name' => 'linkedin',
         'callback' => 'blueprint_blocks_get_linkedin_link',
      ),
      array(
         'name' => 'pinterest',
         'callback' => 'blueprint_blocks_get_pinterest_link',
      ),
      array(
         'name' => 'twitter',
         'callback' => 'blueprint_blocks_get_twitter_link',
      ),
   );

   foreach( $social_links as $social_link ) {
      register_rest_field( 
         'user', 
         $social_link['name'] . '_link', 
         array(
         'get_callback' => $social_link['callback'],
         )
      );
   }
 }

 function blueprint_blocks_get_amazon_link( $object ) {
    $meta = get_user_meta( $object['id'] );
    $link = $meta['amazon'];
    return $link;
 }
 function blueprint_blocks_get_bookbub_link( $object ) {
    $meta = get_user_meta( $object['id'] );
    $link = $meta['bookbub'];
    return $link;
 }
 function blueprint_blocks_get_facebook_link( $object ) {
    $meta = get_user_meta( $object['id'] );
    $link = $meta['facebook'];
    return $link;
 }
 function blueprint_blocks_get_instagram_link( $object ) {
    $meta = get_user_meta( $object['id'] );
    $link = $meta['instagram'];
    return $link;
 }
 function blueprint_blocks_get_linkedin_link( $object ) {
    $meta = get_user_meta( $object['id'] );
    $link = $meta['linkedin'];
    return $link;
 }
 function blueprint_blocks_get_pinterest_link( $object ) {
    $meta = get_user_meta( $object['id'] );
    $link = $meta['pinterest'];
    return $link;
 }
 function blueprint_blocks_get_twitter_link( $object ) {
    $meta = get_user_meta( $object['id'] );
    $link = $meta['twitter'];
    return $link;
 }

function blueprint_blocks_mbt_get_profile_display_name( $object ) {
   $meta = get_user_meta( $object['id'] );
   $display_name = $meta['profile_name'];
   return $display_name;
}