<?php
/**
 * Block: Recent Posts
 * Functions to render dynamic block
 *
 * @package Blueprint_Blocks
 */

/**
 * Dynamic output for recent posts block
 *
 * @method blueprint_blocks_dynamic_recent_posts_block
 * @param array $atts block attributes.
 * @return mixed html recent posts
 */
function blueprint_blocks_dynamic_recent_posts_block( $atts ) {
	/**
	 * TODO: see about implementing templates
	 */

	/**
	 * Query $atts:
	 */
	$selected_category = isset( $atts['selectedCategory'] ) ? $atts['selectedCategory'] : '';
	$ignore_sticky     = isset( $atts['ignoreSticky'] ) ? $atts['ignoreSticky'] : false;
	$number_posts      = isset( $atts['numberPosts'] ) ? $atts['numberPosts'] : 3;

	/**
	 * Style and Class $atts
	 */
	$align                = isset( $atts['align'] ) ? $atts['align'] : '';
	$align_button         = isset( $atts['alignButton'] ) ? $atts['alignButton'] : 'center';
	$align_text           = isset( $atts['alignText'] ) ? $atts['alignText'] : 'center';
	$align_title          = isset( $atts['alignTitle'] ) ? $atts['alignTitle'] : 'center';
	$background_color     = isset( $atts['backgroundColor'] ) ? $atts['backgroundColor'] : '';
	$button_bg            = isset( $atts['buttonBG'] ) ? $atts['buttonBG'] : '';
	$button_border        = isset( $atts['buttonBorder'] ) ? $atts['buttonBorder'] : 2;
	$button_border_color  = isset( $atts['buttonBorderColor'] ) ? $atts['buttonBorderColor'] : '';
	$button_border_radius = isset( $atts['buttonBorderRadius'] ) ? $atts['buttonBorderRadius'] : 0;
	$button_color         = isset( $atts['buttonColor '] ) ? $atts['buttonColor '] : '';
	$button_font_size     = isset( $atts['buttonFontSize'] ) ? $atts['buttonFontSize'] : 14;
	$button_type          = isset( $atts['buttonType'] ) ? $atts['buttonType'] : 'outlined';
	$class_name           = isset( $atts['className'] ) ? $atts['className'] : '';
	$color                = isset( $atts['color'] ) ? $atts['color'] : '';
	$img_border           = isset( $atts['imgBorder'] ) ? $atts['imgBorder'] : 2;
	$img_border_color     = isset( $atts['imgBorderColor'] ) ? $atts['imgBorderColor'] : '';
	$post_background      = isset( $atts['postBackgroundColor'] ) ? $atts['postBackgroundColor'] : $background_color;
	$posts_per_row        = isset( $atts['postsPerRow'] ) ? $atts['postsPerRow'] : 3;
	$round_image          = isset( $atts['roundImg'] ) ? $atts['roundImg'] : 50;
	$section_title        = isset( $atts['sectionTitle'] ) ? $atts['sectionTitle'] : 'Latest from the Blog';
	$section_title_size   = isset( $atts['sectionTitleFontSize'] ) ? $atts['sectionTitleFontSize'] : 20;
	$text_font_size       = isset( $atts['textFontSize'] ) ? $atts['textFontSize'] : 18;
	$title_font_size      = isset( $atts['titleFontSize'] ) ? $atts['titleFontSize'] : 20;
	$post_color           = isset( $atts['postColor'] ) ? $atts['postColor'] : $color;

	/**
	 * Display $atts
	 */
	$read_more_text = isset( $atts['readMoreText'] ) ? $atts['readMoreText'] : 'Read More';
	$show_excerpts  = isset( $atts['showExcerpts'] ) ? $atts['showExcerpts'] : true;
	$show_img       = isset( $atts['showImg'] ) ? $atts['showImg'] : true;
	$show_meta      = isset( $atts['showMeta'] ) ? $atts['showMeta'] : false;

	/**
	 * Class Names
	 *
	 * @var array $class_names array of classnames to output
	 */
	$class_names   = array();
	$class_names[] = 'wp-block-blueprint-blocks-recent-posts';

	$block_styles = array();
	if ( $background_color ) {
		$block_styles[] = 'background-color:' . sanitize_hex_color( $background_color ) . ';';
		$class_names[]  = 'has-background-color';
	}

	if ( $color ) {
		$block_styles[] = 'color:' . sanitize_hex_color( $color ) . ';';
	}

	$block_style = 'style="' . implode( ' ', $block_styles ) . '"';

	if ( ! empty( $align ) ) {
		$class_names[] = 'align' . $align;
	}

	if ( ! empty( $class_name ) ) {
		$class_names[] = $class_name;
	}

	switch ( $posts_per_row ) {
		case 1:
			$class_names[] = 'one-across';
			break;
		case 2:
			$class_names[] = 'two-across';
			break;
		case 4:
			$class_names[] = 'four-across';
			break;
		case 5:
			$class_names[] = 'five-across';
			break;
		default:
			$class_names[] = 'three-across';
			break;
	}

	$block_class = implode( ' ', $class_names );

	/**
	 * Post + Title Classes and Styles
	 */
	$post_class   = 'blueprint-recent-posts';
	$post_styles  = array();
	$title_styles = array();

	$post_styles[] = 'font-size:' . intval( $text_font_size ) . 'px;';
	$post_styles[] = 'text-align:' . esc_attr( $align_text ) . ';';

	$title_styles[] = 'font-size:' . intval( $title_font_size ) . 'px;';
	$title_styles[] = 'text-align:' . esc_attr( $align_title ) . ';';

	if ( ! empty( $post_background ) ) {
		$post_class   .= ' has-background';
		$post_styles[] = 'background-color:' . sanitize_hex_color( $post_background ) . ';';
	}

	if ( ! empty( $color ) ) {
		$post_styles[]  = 'color:' . sanitize_hex_color( $post_color ) . ';';
		$title_styles[] = 'color:' . sanitize_hex_color( $post_color ) . ';';
	}

	/**
	 * Image Styles
	 *
	 * @var [type]
	 */
	$img_styles   = array();
	$img_styles[] = 'border-radius:' . intval( $round_image ) . '%;';
	$img_class    = 'bpbrp-image';

	if ( $img_border > 0 ) {
		$img_class    = 'bpbrp-image circle';
		$img_styles[] = 'border:' . intval( $img_border ) . 'px solid ' . sanitize_hex_color( $img_border_color ) . ';';
	}

	/**
	 * QUERY
	 *
	 * @var array
	 */
	$args = array(
		'category'       => $selected_category,
		'post_status'    => 'publish',
		'ignore_sticky'  => $ignore_sticky,
		'posts_per_page' => $number_posts,
	);

	$rposts = new WP_Query( $args );

	$html = '';

	if ( $rposts->have_posts() ) {

		/* Opening HTML for post block */
		$html .= '<div class="' . esc_attr( $block_class ) . '" ' . $block_style . '>';
		$html .= '<h2 class="section-title"><span ' . $block_style . '>' . wp_kses_post( $section_title ) . '</span></h2>';
		$html .= '<div class="inner is-flex">';
		$phtml = '';

		while ( $rposts->have_posts() ) {

			$rposts->the_post();

			/* Format image if show_img is true and the post has an image */
			$img = '';
			if ( $show_img && has_post_thumbnail() ) {
				$img = sprintf(
					'<div class="%4$s"><img src="%1$s" alt="%2$s" style="%3$s"/></div>',
					get_the_post_thumbnail_url( '', 'medium' ),
					get_the_title(),
					implode( ' ', $img_styles ),
					esc_attr( $img_class )
				);
			}

			/* Format meta if show_meta is true */
			$meta = '';
			if ( $show_meta ) {
				$meta = sprintf(
					'<div class="bpbrp-meta"><span class="meta-label">posted on</span>%1$s <span class="meta-label">by</span>%2$s</div>',
					get_the_date(),
					get_the_author()
				);
			}

			/**
			 * Format the button, which seems to be an inordinate
			 * amount of code for such a small element.
			 */
			$btn_wrap_class  = 'btn-wrap';
			$btn_wrap_class .= ' align-' . $align_button;
			$link_class      = 'bpbrp-read-more-link button button-primary';

			$solid_btn_style = array();

			if ( $button_bg ) {
				$link_class        = 'bpbrp-read-more-link button';
				$solid_btn_style[] = 'background-color:' . sanitize_hex_color( $button_bg ) . ';';
			}

			$outline_btn_style = array();

			$outline_btn_style[] = 'background-color: transparent';

			if ( $button_border > 0 ) {
				$outline_btn_style[] = 'border:' . intval( $button_border ) . 'px solid ' . sanitize_hex_color( $button_border_color ) . ';';
			}

			$btn_styles = array();
			if ( 'solid' === $button_type ) {
				$btn_styles = $solid_btn_style;
			} else {
				$btn_styles = $outline_btn_style;
			}

			if ( 'solid' === $button_type && ! empty( $button_bg ) ) {
				$link_class = 'read-more-link button';
			}

			if ( $button_color ) {
				$btn_styles[] = 'color:' . sanitize_hex_color( $button_color ) . ';';
			}

			if ( $button_border_radius > 0 ) {
				$btn_styles[] = 'border-radius:' . intval( $button_border_radius ) . 'px';
			}

			$btn_style[] = 'font-size:' . intval( $button_font_size ) . 'px';

			$button = '';

			if ( 'inline' === $align_button ) {

				$button = sprintf(
					'<a href="%1$s" class="bpbrp-read-more-button">%2$s</a>',
					get_the_permalink(),
					stripslashes( esc_html( $read_more_text ) )
				);

			} else {

				$button = sprintf(
					'<div class="%1$s"><a href="%2$s" style="%3$s" class="%4$s">%5$s</a></div>',
					esc_attr( $btn_wrap_class ),
					get_the_permalink(),
					implode( ' ', $btn_styles ),
					esc_attr( $link_class ),
					stripslashes( esc_html( $read_more_text ) )
				);

			}

			/**
			 * Format the excerpt (the long way, so we can add a button if set above)
			 */
			$get_excerpt = get_the_content( '', true );
			$get_excerpt = strip_shortcodes( $get_excerpt );
			$get_excerpt = excerpt_remove_blocks( $get_excerpt );
			$excerpt_len = '55';
			$fmt_excerpt = wp_trim_words( $get_excerpt, $excerpt_len, $button );

			if ( $show_excerpts ) {
				$excerpt = sprintf(
					'<div class="bpbrp-excerpt">%1$s</div>',
					$fmt_excerpt
				);
			}

			/*
			 * Put it all together...
			 */
			$phtml .= sprintf(
				'<div class="%1$s" style="%5$s">
        <div class="recent-post-header">%2$s %7$s
        <h4 class="bpbrp-postTitle" style="%4$s">%3$s</h4></div>
        %6$s
        </div>',
				esc_attr( $post_class ),
				$img,
				get_the_title(),
				implode( ' ', $title_styles ),
				implode( ' ', $post_styles ),
				$excerpt,
				$meta
			);
		}

		/* Add all the posts to the output */
		$html .= $phtml;

		$html .= '</div></div>';
	}
	/* Restore original Post Data */
	wp_reset_postdata();

	/* Escape and return the whole shebang. */
	return wp_kses_post( $html );
}
