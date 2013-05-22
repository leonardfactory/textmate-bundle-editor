(function()
{
	var listHeight = $('section.panel').height() - $('.titlebar').outerHeight();
	$('.list').height(listHeight);
	console.dir($('.list'));
	console.log('ListHeight ' + listHeight);
})();
