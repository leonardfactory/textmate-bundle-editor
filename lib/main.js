// Tools needed 
var fs 		= require('fs');

global.$ = $;

(function()
{
	console.log('here');
	
	// Create Loader
	//var Loader = loader($('#navigator'));
	
	
	// Some cleanup
	//window.ondragover = function(e) { e.preventDefault(); return false };
	//window.ondrop = function(e) { e.preventDefault(); return false };

	function preventEvent(e)
	{ 
		e.preventDefault(); 
		e.stopPropagation(); 
	}

	$('#drag-here').on('dragover', preventEvent);
	$('#drag-here').on('dragenter', preventEvent);

	// On file drop!
	$('#drag-here').on('drop',
		function(e)
		{
			e.preventDefault();
			if(e.originalEvent.dataTransfer) {
				if(e.originalEvent.dataTransfer.files.length) {
					e.stopPropagation();
				
					var bundle_path = e.originalEvent.dataTransfer.files[0].path;
					
					$('#drag-here-container').hide('fast', function()
					{
						$('#navigator').show('fast', function()
						{	
							GuiTools.resizeHeight();
						});
					});
					
					Navigator.load(bundle_path);
					/**Loader.onBundleLoaded(function(contentHtml)
					{
						$('section#bundle > div.list').html(contentHtml);
					});
					Loader.loadBundle(bundle_path);*/
				}   
			}
		}
	);
	
	$(window).resize(function() {
		GuiTools.resizeHeight();
	})
})();
