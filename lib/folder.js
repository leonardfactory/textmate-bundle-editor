var fs		= require('fs');
var path	= require('path');
var _		= require('underscore');

var Folder = function(base_path, indent)
{
	var self = {};
	
	self.indent = indent || 0;
	
	self.base_path = '';
	self.root = {
		files 	: [],
		dir	  	: true,
		indent 	: self.indent,
		name 	: path.basename(base_path)
	};
	
	self.ALLOWED_ICONS = {
		'tmProperties'  : 'property',
		'tmSnippet'		: 'snippet',
		'tmLanguages'	: 'language',
		'tmCommand'		: 'command'
	}
	
	self.fileType = function(ext)
	{
		return (_.has(self.ALLOWED_ICONS, ext) ? [self.ALLOWED_ICONS[ext], ext] : ['file', ext]);
	}
	
	self.FileItem = function (file_path) 
	{
		var fileitem = {};
		
		fileitem = {
			ext		: self.fileType(path.extname(file_path)),
			name	: path.basename(file_path),
			dir		: false
		}
		
		return fileitem;
	}
	
	self.build = function()
	{
		self.base_path = base_path;
		
		var dirs = fs.readdirSync(self.base_path);
		
		dirs.forEach(function(file)
		{
			var file_path = self.base_path + '/' + file;
			var stat = fs.statSync(file_path);
			
			if(stat.isFile()) {
				self.root.files.push(self.FileItem(file_path));
			}
			else if(stat.isDirectory()) {
				self.root.files.push(Folder(file_path, self.indent + 1));
			}
		});
	}
	
	self.build();
	return self.root;
};