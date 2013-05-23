(function()
{
	console.dir(window);
	var listHeight = (window.innerHeight / 2) - $('.titlebar').outerHeight();
	$('.list').height(listHeight);
	console.dir($('.list'));
	console.log('ListHeight ' + listHeight);
})();
