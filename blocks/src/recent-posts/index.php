<?php
   /**
   * Block: Recent Posts
   * Functions to render dynamic block
   */


function blueprint_blocks_dynamic_recent_posts_block( $atts ) {
  //print_r( $atts );
  /**
   * TODO: see about implementing templates
   */

  /**
   * Query $atts:
   */

  $selectedCategory = isset($atts['selectedCategory']) ? $atts['selectedCategory'] : '';
  $ignoreSticky = isset($atts['ignoreSticky']) ? $atts['ignoreSticky'] : false;
  $numberPosts = isset($atts['numberPosts']) ? $atts['numberPosts'] : 3;

  /**
   * Style and Class $atts
   */

  $className = isset($atts['className']) ? $atts['className'] : '';
  $align = isset($atts['align']) ? $atts['align'] : '';
  $postsPerRow = isset($atts['postsPerRow']) ? $atts['postsPerRow'] : 3;

  $alignText = isset($atts['alignText']) ? $atts['alignText'] : 'center';
  $alignTitle = isset($atts['alignTitle']) ? $atts['alignTitle'] : 'center';
  $backgroundColor = isset($atts['backgroundColor']) ? $atts['backgroundColor'] : '';
  $color = isset($atts['color']) ? $atts['color'] : '';
  $postBackground = isset($atts['postBackgroundColor']) ? $atts['postBackgroundColor'] : $backgroundColor;
  $postColor = isset($atts['postColor']) ? $atts['postColor'] : $color;
  $imgBorder = isset($atts['imgBorder']) ? $atts['imgBorder'] : 2;
  $imgBorderColor = isset($atts['imgBorderColor']) ? $atts['imgBorderColor'] : '';
  $roundImg = isset($atts['roundImg']) ? $atts['roundImg'] : 50;
  $textFontSize = isset($atts['textFontSize']) ? $atts['textFontSize'] : 18;
  $titleFontSize = isset($atts['titleFontSize']) ? $atts['titleFontSize'] : 20;

  $buttonType = isset( $atts['buttonType']) ? $atts['buttonType'] : 'outlined';
  $buttonColor  = isset( $atts['buttonColor ']) ? $atts['buttonColor '] : '';
  $buttonBG = isset( $atts['buttonBG']) ? $atts['buttonBG'] : '';
  $buttonBorderColor = isset( $atts['buttonBorderColor']) ? $atts['buttonBorderColor'] : '';
  $buttonBorder = isset( $atts['buttonBorder']) ? $atts['buttonBorder'] : 2;
  $buttonFontSize = isset( $atts['buttonFontSize']) ? $atts['buttonFontSize'] : 14;
  $buttonBorderRadius = isset( $atts['buttonBorderRadius']) ? $atts['buttonBorderRadius'] : 0;
  $alignButton = isset( $atts['alignButton']) ? $atts['alignButton'] : 'center';
  $sectionTitle = isset( $atts['sectionTitle']) ? $atts['sectionTitle'] : 'Latest from the Blog';
  $sectionTitleFontSize = isset( $atts['sectionTitleFontSize']) ? $atts['sectionTitleFontSize'] : 20;

  /**
   * Display $atts
   */
  $showExcerpts = isset($atts['showExcerpts']) ? $atts['showExcerpts'] : true;
  $showMeta = isset($atts['showMeta']) ? $atts['showMeta'] : false;
  $showImg = isset($atts['showImg']) ? $atts['showImg'] : true;
  $readMoreText = isset($atts['readMoreText']) ? $atts['readMoreText'] : 'Read More';


  /**
   * Class Names
   * @var array
   */

  $classNames = [];
  $classNames[] = 'wp-block-blueprint-blocks-recent-posts';

  $blockStyles = [];
  if( $backgroundColor ) {
    $blockStyles[] = 'background-color:' . sanitize_hex_color( $backgroundColor ) . ';';
    $classNames[] = 'has-background-color';
  }
  if( $color ) {
    $blockStyles[] = 'color:' . sanitize_hex_color( $color ) . ';';
  }
  $blockStyle = 'style="' . implode( ' ', $blockStyles ) . '"';


  if( !empty( $align ) ) {
    $classNames[] = 'align' . $align;
  }

  if( !empty( $className) ) {
    $classNames[] = $className;
  }

  switch( $postsPerRow ) {
    case 1:
    $classNames[] ='one-across';
    break;
    case 2:
    $classNames[] = 'two-across';
    break;
    case 4:
    $classNames[] = 'four-across';
    break;
    case 5:
    $classNames[] = 'five-across';
    break;
    default:
    $classNames[] = 'three-across';
    break;
  }

  $blockClass = implode( ' ', $classNames );



  /**
   * Post + Title Classes and Styles
   */

  $postClass = 'blueprint-recent-posts';
  $postStyles = [];
  $titleStyles = [];

  $postStyles[] = 'font-size:' . intval( $textFontSize ) . 'px;';
  $postStyles[] = 'text-align:' . esc_attr( $alignText ) . ';';

  $titleStyles[] = 'font-size:' . intval( $titleFontSize ) . 'px;';
  $titleStyles[] = 'text-align:' . esc_attr( $alignTitle ) . ';';

  if( !empty( $postBackground ) ) {
    $postClass .= ' has-background';
    $postStyles[] = 'background-color:' . sanitize_hex_color( $postBackground ) . ';';
  }

  if( !empty( $color ) ) {
    $postStyles[] = 'color:' . sanitize_hex_color( $postColor ) . ';';
    $titleStyles[] = 'color:' .sanitize_hex_color( $postColor ) . ';';
  }

  /**
   * Image Styles
   * @var [type]
   */
  $imgStyles = [];
  $imgStyles[] = 'border-radius:' . intval( $roundImg ) . '%;';
  $imgClass = 'bpbrp-image';

  if( $imgBorder > 0 ) {
    $imgClass = 'bpbrp-image circle';
    $imgStyles[] = 'border:' . intval( $imgBorder ) . 'px solid ' . sanitize_hex_color( $imgBorderColor ) . ';';
  }

  /**
   * QUERY
   * @var array
   */

  $args = array(
    'category' => $selectedCategory,
    'post_status' => 'publish',
    'ignore_sticky' => $ignoreSticky,
    'posts_per_page' => $numberPosts,
  );


  $rposts = new WP_Query( $args );

  $html = '';

  if ( $rposts->have_posts() ) {

    $html .= '<div class="' . esc_attr( $blockClass ) . '" ' . $blockStyle . '>';
    $html .= '<h2 class="section-title"><span ' . $blockStyle . '>' . wp_kses_post( $sectionTitle ) . '</span></h2>';
    $html .= '<div class="inner is-flex">';
    $pHtml = '';

    while ( $rposts->have_posts() ) {

        $rposts->the_post();

        $img = '';
        if( $showImg && has_post_thumbnail() ) {
          $img = sprintf(
            '<div class="%4$s"><img src="%1$s" alt="%2$s" style="%3$s"/></div>',
            get_the_post_thumbnail_url( '', 'medium'),
            get_the_title(),
            implode( ' ', $imgStyles ),
            esc_attr( $imgClass )
          );
        }

        $meta = '';
        if( $showMeta ) {
          $meta = sprintf(
            '<div class="bpbrp-meta"><span class="meta-label">posted on</span>%1$s <span class="meta-label">by</span>%2$s</div>',
            get_the_date(),
            get_the_author()
          );
        }

        $btnWrapClass = 'btn-wrap';
        $btnWrapClass .= ' align-' .  $alignButton;
        $linkClass = 'bpbrp-read-more-link button button-primary';

        $solidBtnStyle = [];

        if( $buttonBG ) {
          $linkClass = 'bpbrp-read-more-link button';
          $solidBtnStyle[] = 'background-color:' . sanitize_hex_color( $buttonBG ) . ';';
        }

        $outlineBtnStyle = [];

        $outlineBtnStyle[] = 'background-color: transparent';

        if( $buttonBorder > 0 ) {
          $outlineBtnStyle[] = 'border:' . intval( $buttonBorder ) . 'px solid ' . sanitize_hex_color( $buttonBorderColor ) . ';';
        }

        $btnStyles = [];
        if( $buttonType === 'solid' ) {
          $btnStyles = $solidBtnStyle;
        } else {
          $btnStyles = $outlineBtnStyle;
        }

        if( $buttonType === 'solid' && !empty( $buttonBG ) ) {
          $linkClass = 'read-more-link button';
        }

        if( $buttonColor ) {
          $btnStyles[] = 'color:' . sanitize_hex_color( $buttonColor ) . ';';
        }

        if( $buttonBorderRadius > 0 ) {
          $btnStyles[] = 'border-radius:' . intval( $buttonBorderRadius ) . 'px';
        }

        $btnStyle[] = 'font-size:' . intval( $buttonFontSize ) . 'px';

        $button = '';


        if( $alignButton === 'inline' ) {

          $button = sprintf(
            '<a href="%1$s" class="bpbrp-read-more-button">%2$s</a>',
            get_the_permalink(),
            stripslashes(esc_html( $readMoreText ) )
          );

        } else {

          $button = sprintf(
            '<div class="%1$s"><a href="%2$s" style="%3$s" class="%4$s">%5$s</a></div>',
            esc_attr( $btnWrapClass ),
            get_the_permalink(),
            implode( ' ', $btnStyles ),
            esc_attr( $linkClass ),
            stripslashes(esc_html( $readMoreText ) )
          );

        }

        $getExcerpt = get_the_content( '', true );
        $getExcerpt = strip_shortcodes( $getExcerpt );
        $getExcerpt = excerpt_remove_blocks( $getExcerpt );
        $excerptLength = '55';
        $formatExcerpt = wp_trim_words( $getExcerpt, $excerptLength, $button );


        if( $showExcerpts ) {
          $excerpt = sprintf(
            '<div class="bpbrp-excerpt"> %1$s </div>',
            $formatExcerpt
          );
        }


      $pHtml .= sprintf(
        '<div class="%1$s" style="%5$s">
        <div class="recent-post-header">%2$s %7$s
        <h4 class="bpbrp-postTitle" style="%4$s">%3$s</h4></div>
        %6$s
        </div>',
        esc_attr( $postClass ),
        $img,
        get_the_title(),
        implode( ' ', $titleStyles ),
        implode( ' ', $postStyles ),
        $excerpt,
        $meta
      );
    }

    $html .= $pHtml;

    $html .= '</div></div>';
  }
  /* Restore original Post Data */
  wp_reset_postdata();

  return $html;

}
