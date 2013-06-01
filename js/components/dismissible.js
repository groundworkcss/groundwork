(function ( $ ) {
	$('.dismissible').click(function() {
		$(this).hide(150, function() {
			$(this).remove();
		});
	});
}( jQuery ));