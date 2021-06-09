$(function () {
	$.each(Array(100), function(i) {
		var detail_button = $('#detail_button_' + (++i));
		$(detail_button).click(function () {
			$('#detail_'+i).toggle();
		});
	});
});