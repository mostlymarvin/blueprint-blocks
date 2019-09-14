<?php
/**
 * Button Customizer
 *
 * @author     Memphis McKay
 * @package Outline MBT Buttons
 * @since      1.0.0
 */

function blueprint_extras_register_customizer( $wp_customize ) {

  $settings = get_option( 'mbt_settings', array() );

  $style = !empty( $settings['style_pack'] ) ? $settings['style_pack'] : 'blueprint-buttons';

  //social media
  $wp_customize->add_section(
    'blueprint_extras_settings_section',
    array(
      'title' => 'MyBookTable Button Options',
      'description' => 'Customize the colors of the My Book Table book buttons, and (optionally) add custom CSS - requires the use of a Blueprint Button Pack, available in MyBookTable settings.',
      'priority' => 10,
    )
  );


    //Custom CSS
    $wp_customize->add_setting('blueprint_extras[custom_css]', array(
      'default'           => '',
      'type'              => 'option',
      'capability'        => 'manage_options',
      'transport'         => 'postMessage',
      'sanitize_callback' => 'blueprint_extras_sanitize_textarea'
    ) );
        //Custom CSS Input
    $wp_customize->add_control( 'blueprint_extras_custom_css_input', array(
      'label'      => __( 'Custom CSS', 'blueprint-blocks' ),
      'section'  => 'blueprint_extras_settings_section',
      'settings' => 'blueprint_extras[custom_css]',
      'type'     => 'textarea',
      'priority'   => 100
    ) );

    //Background Color
    $wp_customize->add_setting('blueprint_extras[button_background]', array(
      'default'           => '#3c3d42',
      'type'              => 'option',
      'capability'        => 'manage_options',
      'transport'         => 'postMessage',
    ) );
        //Background Color Input
        $wp_customize->add_control(
          new WP_Customize_Color_Control(
            $wp_customize,
            'blueprint_extras_button_background_input',
            array(
              'label'      => __( 'Button background color', 'blueprint-blocks' ),
              'section'    => 'blueprint_extras_settings_section',
              'settings'   => 'blueprint_extras[button_background]',
              'priority'   => 10
              ) )
          );


    //Hover State Background
    $wp_customize->add_setting('blueprint_extras[button_hover_background]', array(
      'default'           => '#4c4d54',
      'type'              => 'option',
      'capability'        => 'manage_options',
      'transport'         => 'postMessage',
    ) );
        //Hover State Background Color Input
        $wp_customize->add_control(
          new WP_Customize_Color_Control(
            $wp_customize,
            'blueprint_extras_button_hover_background_input',
            array(
              'label'      => __( 'Button background hover color', 'blueprint-blocks' ),
              'section'    => 'blueprint_extras_settings_section',
              'settings'   => 'blueprint_extras[button_hover_background]',
              'priority'   => 30
              ) )
          );


    if( $style !== 'blueprint-simple-buttons') {

    //Text Color
    $wp_customize->add_setting('blueprint_extras[button_text_color]', array(
      'default'           => '#ffffff',
      'type'              => 'option',
      'capability'        => 'manage_options',
      'transport'         => 'postMessage',
    ) );
        //Background Color Input
        $wp_customize->add_control(
          new WP_Customize_Color_Control(
            $wp_customize,
            'blueprint_extras_button_text_color_input',
            array(
              'label'      => __( 'Button text color', 'blueprint-blocks' ),
              'section'    => 'blueprint_extras_settings_section',
              'settings'   => 'blueprint_extras[button_text_color]',
              'priority'   => 20
              ) )
          );

          //Hover Text Color
          $wp_customize->add_setting('blueprint_extras[button_hover_text_color]', array(
            'default'           => '#ffffff',
            'type'              => 'option',
            'capability'        => 'manage_options',
            'transport'         => 'postMessage',
          ) );
              //Background Color Input
              $wp_customize->add_control(
                new WP_Customize_Color_Control(
                  $wp_customize,
                  'blueprint_extras_button_hover_text_color_input',
                  array(
                    'label'      => __( 'Button hover text color', 'blueprint-blocks' ),
                    'section'    => 'blueprint_extras_settings_section',
                    'settings'   => 'blueprint_extras[button_hover_text_color]',
                    'priority'   => 40
                    ) )
                );

    }



    //Grayscale Option
    $wp_customize->add_setting( 'blueprint_extras[grayscale_button]', array(
      'default'        => false,
      'type'           => 'option',
      'capability'     => 'manage_options',
      'sanitize_callback' => 'blueprint_extras_sanitize_checkbox',
      'transport'      => 'postMessage'
    ) );
    $wp_customize->add_control( 'blueprint_extras_grayscale_button_input', array(
      'label'    => __( 'Add grayscale filter?', 'blueprint-blocks' ),
      'description' => __( 'buttons appear grayscale, until hovered over, when custom colors appear.'),
      'section'  => 'blueprint_extras_settings_section',
      'settings' => 'blueprint_extras[grayscale_button]',
      'type' => 'checkbox',
      'priority' => 60
    ) );

    //Border Radius
    $wp_customize->add_setting( 'blueprint_extras[border_radius]', array(
      'default' => 0,
      'type' => 'option',
      'capability' => 'manage_options',
      'transport' => 'postMessage',
      'sanitize_callback' => 'blueprint_extras_sanitize_integer',
    ) );

    $wp_customize->add_control( 'blueprint_extras_border_radius_input', array(
      'type' => 'range',
      'priority' => 50,
      'section' => 'blueprint_extras_settings_section',
      'settings' => 'blueprint_extras[border_radius]',
      'label' => __( 'Button border-radius', 'blueprint-blocks' ),
      'description' => '',
      'input_attrs' => array(
          'min' => 0,
          'max' => 20,
          'step' => 1,
      ),
    ) );




}//end register

function blueprint_extras_sanitize_checkbox( $input ) {
   if ( $input == 1 ) {
        return 1;
    } else {
        return '';
    }
}

function blueprint_extras_sanitize_integer( $input ) {
  return absint( $input );
}

function blueprint_extras_sanitize_textarea( $text ) {
    $text = strip_tags($text);
    return esc_textarea( $text );
}

add_action( 'customize_register' ,'blueprint_extras_register_customizer'  );
