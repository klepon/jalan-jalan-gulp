export const mobileFixNav = () => {
    var $ = jQuery,
        $nav = $('.navigation-top'),
        scroll = $( window ).scrollTop();

    function show_hide_nav() {
        if( scroll < $( window ).scrollTop() && scroll > 100) {
            $nav.addClass('hide');
        } else {
            $nav.removeClass('hide');
        }

        scroll = $( window ).scrollTop();
    }

    $( window ).on( 'scroll', function() {
        show_hide_nav();
    });

    // // Also want to make sure the navigation is where it should be on resize.
    // $( window ).resize( function() {
    //     show_hide_nav();
    // });
}
