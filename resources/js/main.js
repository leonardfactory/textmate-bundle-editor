global.$ = $;

window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };

function preventEvent(e)
{ 
	e.preventDefault(); 
	e.stopPropagation(); 
}

$('#drag-here').on('dragover', preventEvent);
$('#drag-here').on('dragenter', preventEvent);

$('#drag-here').on('drop',
	function(e)
	{
		e.preventDefault();
		if(e.originalEvent.dataTransfer) {
			if(e.originalEvent.dataTransfer.files.length) {
				e.stopPropagation();
				
				//alert("Dropped: " + e.originalEvent.dataTransfer.files[0].path);
				$('#drag-here').hide('fast', function(){
					$('#list').show('fast');
				});
				
				// Read files
				
			}   
		}
	}
);