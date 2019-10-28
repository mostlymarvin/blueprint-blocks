var $background;
var $color;

( function( $ ) {
  wp.customize( 'blueprint_extras[button_background]', function( value ) {
    value.bind( function( newval ) {
      $(
        '.blueprint-extras .mbt-book .mbt-primary-button, .blueprint-extras .mbt-book .mbt-book-sections .mbt-primary-button, .blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton'
       ).css( {
        'background-color': newval,
        'border-color': newval
      });
    });
  });

  // Preview the MBT Button Text Color
  wp.customize( 'blueprint_extras[button_text_color]', function( value ) {
    value.bind( function( newval ) {
      $(
        '.blueprint-extras .mbt-book .mbt-primary-button, .blueprint-extras .mbt-book .mbt-book-sections .mbt-primary-button, .blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton'
       ).css( {
        color: newval
      });
    });
  });

  //Hover?
  wp.customize( 'blueprint_extras[button_hover_background]', function( value ) {
    value.bind( function( newval ) {
      $(
        '.blueprint-extras .mbt-book .mbt-primary-button, .blueprint-extras .mbt-book .mbt-book-sections .mbt-primary-button, .blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton'
       ).hover(
        function() {
          $( this ).css( {
            'background-color': newval,
            'border-color': newval
          });
        },
        function() {
          $( this ).css( {
            'background-color': $background,
            'border-color': $background
          });
        }
       );
    });
  });

  wp.customize( 'blueprint_extras[button_hover_text_color]', function( value ) {
    value.bind( function( newval ) {
      $(
        '.blueprint-extras .mbt-book .mbt-primary-button, .blueprint-extras .mbt-book .mbt-book-sections .mbt-primary-button, .blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton, .blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton'
       ).hover(
        function() {
          $( this ).css( {
            color: newval
          });
        },
        function() {
          $( this ).css( {
            color: $color
          });
        }
       );
    });
  });

  // Preview the MBT Button Border Radius
  wp.customize( 'blueprint_extras[border_radius]', function( value ) {
    value.bind( function( newval ) {
      $(
        '.blueprint-extras .mbt-book .mbt-primary-button, .blueprint-extras .mbt-book .mbt-book-sections .mbt-primary-button, .blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton'
       ).css( {
        'border-radius': newval + 'px'
      });
      $(
        '.blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton a img,.blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton a img,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton a img,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton a img'
       ).css( {
        'border-bottom-left-radius': newval - 2 + 'px',
        'border-top-left-radius': newval - 2 + 'px'
      });
    });
  });

  wp.customize( 'blueprint_extras[grayscale_button]', function( value ) {
    value.bind( function( newval ) {
      if ( newval === true ) {
        $(
          '.blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton'
         ).css( {
          '-webkit-filter': 'grayscale( 100% )',
          filter: 'grayscale( 100% )'
        });
        $(
          '.blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton'
         ).hover(
          function() {
            $( this ).css( {
              '-webkit-filter': 'grayscale( 0% )',
              filter: 'grayscale( 0% )'
            });
          },
          function() {
            $( this ).css( {
              '-webkit-filter': 'grayscale( 100% )',
              filter: 'grayscale( 100% )'
            });
          }
         );
      } else {
        $(
          '.blueprint-extras .mbt-featured-book-widget .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .mbt-book-archive .mbt-book .mbt-book-buybuttons .mbt-book-buybutton,.blueprint-extras .buylinks .mbt-book-buybuttons .mbt-book-buybutton'
         ).css( {
          '-webkit-filter': 'grayscale( 0% )',
          filter: 'grayscale( 0% )'
        });
      }
    });
  });
})( jQuery );
