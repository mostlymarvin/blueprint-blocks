<?php
   /**
   * Block: Recent Posts
   * Functions to render dynamic block
   */


function blueprint_blocks_dynamic_recent_posts_block( $atts ) {
  print_r( $atts );
  /**
   * TODO: see about implementing templates
   */

  $className = isset($atts['className']) ? $atts['className'] : '';
  $align = isset($atts['align']) ? $atts['align'] : '';
  $selectedCategory = isset($atts['selectedCategory']) ? $atts['selectedCategory'] : '';
  $includeSticky = isset($atts['includeSticky']) ? $atts['includeSticky'] : true;
  $numberPosts = isset($atts['numberPosts']) ? $atts['numberPosts'] : 3;
  $postsPerRow = isset($atts['postsPerRow']) ? $atts['postsPerRow'] : 3;
  $showExcerpts = isset($atts['showExcerpts']) ? $atts['showExcerpts'] : true;
  $showMeta = isset($atts['showMeta']) ? $atts['showMeta'] : false;
  $showImg = isset($atts['showImg']) ? $atts['showImg'] : true;
  $roundImg = isset($atts['roundImg']) ? $atts['roundImg'] : 50;
  $imgBorder = isset($atts['imgBorder']) ? $atts['imgBorder'] : 2;
  $backgroundColor = isset($atts['backgroundColor']) ? $atts['backgroundColor'] : '';
  $color = isset($atts['color']) ? $atts['color'] : '';
  $imgBorderColor = isset($atts['imgBorderColor']) ? $atts['imgBorderColor'] : '';
  $titleFontSize = isset($atts['titleFontSize']) ? $atts['titleFontSize'] : 20;
  $textFontSize = isset($atts['textFontSize']) ? $atts['textFontSize'] : 18;
  $alignText = isset($atts['alignText']) ? $atts['alignText'] : 'center';
  $alignTitle = isset($atts['alignTitle']) ? $atts['alignTitle'] : 'center';
  $readMoreText = isset($atts['readMoreText']) ? $atts['readMoreText'] : 'Read More';

  $classNames = [];
  $classNames[] = 'wp-block-blueprint-blocks-recent-posts';
  $classNames[] = $className;
  $classNames[] = $align;

  



  //switch( $postsPerRow ) {
    //case 1:
    //this.props.className +=' one-across';
    //break;
    //case 2:
    //this.props.className += ' two-across';
    //break;
    //case 4:
    //this.props.className += ' four-across';
    //break;
    //case 5:
    //this.props.className += ' five-across';
    //break;
    //default:
    //this.props.className += ' three-across';
  //}




}
