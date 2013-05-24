var fs		= require('fs');

var TMFileListTemplates = {
	list : twig({
	    id: "lists",
	    // for this example we'll block until the template is loaded
	    data: '<ul class="file-list" data-indent="{{ indent }}">{% for item in items %}<li><a class="icon {{ item.ext[0] }}" data-type="{{ item.ext[0] }}" data-index="{{ item.index }}" data-name="{{ item.name }}" data-indent="{{ indent }}">{{ item.title }}</a></li>{% endfor %}</ul>'
	})
}

var TMFileList = function(folder)
{
	var self = {};
	self.templates = {};
	
	self.handler = null;
	
	self.build = function () 
	{
		self.folder = folder;
		
		self.templates.list = TMFileListTemplates.list;
	}
	
	self.getHTML = function()
	{
		var rendered_folder = [];
		var i = 0;
		self.folder.files.forEach(function(folder_item)
		{
			if(folder_item.dir) {
				rendered_folder.push({
					ext		: ['directory', ''],
					title	: folder_item.name,
					name 	: folder_item.name,
					index	: i
				});
			}
			else {
				var fi = folder_item;
				fi.index = i;
				rendered_folder.push({
					ext		: folder_item.ext,
					title	: self.coloredName(folder_item.name),
					name	: folder_item.name,
					index	: i
				});
			}
			i++;
		});
		
		var render = self.templates.list.render({ items: rendered_folder, indent: self.folder.indent });
		return render;
	}
	
	self.coloredName = function (name) 
	{
		return name.replace(/(\.tmSnippet|\.tmPreferences|\.tmCommand|\.tmLanguage)/g, "<span class='file-extension'>$1</span>");
	}
	
	self.putHTML = function ($location) 
	{
		$location.append(self.getHTML());
		$location.scrollLeft($location.children('ul.file-list').last().offset().left);
		$('a[data-indent="' + self.folder.indent + '"]').click(self.clickHandler);
	}
	
	self.onClickHandler = function(fn)
	{
		self.handler = fn;
	}
	
	self.clickHandler = function () 
	{
		var index = parseInt($(this).data('index'));
		console.log('Index ' + index);
		console.dir(self.folder.files[index]);
		self.handler.call(this, self.folder.files[index]);
	}
	
	self.build();
	return self;
}