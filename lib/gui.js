(function()
{
	console.log('Height': + $('.titlebar').outerHeight());
	var listHeight = (600/ 2.0) - $('.titlebar').outerHeight();
	$('.list').height(listHeight);
	console.dir($('.list'));
	console.log('ListHeight ' + listHeight);
})();
