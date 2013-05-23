var fs		= require('fs');

var List = function(folder)
{
	var self = {};
	self.templates = {};
	
	self.build = function () 
	{
		self.folder = folder;
		
		self.templates.list = twig({
		    id: "lists",
		    // for this example we'll block until the template is loaded
		    data: '<ul class="file-list">{% for item in items %}<li><a class="icon {{ item.ext[0] }}" data-name="{{ item.name }}" data-indent="' + self.folder.indent + '">{{ item.name }}</a></li>{% endfor %}</ul>'
		});
	}
	
	self.getHTML = function()
	{
		var rendered_folder = [];
		self.folder.files.forEach(function(folder_item)
		{
			if(folder_item.dir) {
				rendered_folder.push({
					ext		: ['directory', ''],
					name 	: folder_item.name
				});
			}
			else {
				rendered_folder.push(folder_item);
			}
		});
		
		var render = self.templates.list.render({ items: rendered_folder });
		return render;
	}
	
	self.build();
	return self;
}