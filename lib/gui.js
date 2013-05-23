var GuiTools = {};
(function()
{
	GuiTools.resizeHeight = function () 
	{
		var listHeight = (window.innerHeight/ 2.0) - $('.titlebar').outerHeight();
		$('.list').height(listHeight);
		console.dir($('.list'));
		console.log('ListHeight ' + listHeight);
	}
})();
