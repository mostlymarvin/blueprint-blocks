(function($) {

    //Add some classes to the MyBookTable buttons so we can style them to match theme
    $('img[alt="Buy from Notify Me Button"]').closest('div').addClass('mbt-notifyme outmbt-full');
    $('a.mbt-universal-buybutton').closest('div').addClass('mbt-universal outmbt-full');
    $('.mbt-shadowbox-buybutton').parent('div').addClass('outmbt-shadowbox outmbt-full');
    //$('.outmbt-js .outmbt .mbt-book .mbt-book-buybuttons .mbt-book-buybutton').fadeTo('1000', 1, 'swing');

})(jQuery);
