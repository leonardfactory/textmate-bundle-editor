var errory 		= require('errory');
var fs			= require('fs');

global.$ = $;

var Navigator = (function()
{
	var self = {};
	var priv = {};
	
	self.bundle_path = '';
	self.bundle_folder = null;
	
	self.handlers = {};
	
	self.depth = 0;
	
	self.links = {
		bundle			: $('section#bundle > div.list'),
		menu 			: $('section#menu > div.list')
	}
	
	self.init = function()
	{
		self.on('bundle-loaded', self.show);
		self.on('bundle-loaded', self.loadPlist);
	}
	
	self.load = function (bundle_path)
	{		
		async.waterfall ([
			function (callback)
			{
				fs.stat(bundle_path, callback);
			},
			function (stat, callback) 
			{
				callback(stat.isDirectory() ? null : 'Cannot read directory');
			},
			function (callback)
			{
				callback(path.extname(bundle_path) === '.tmbundle' ? null : 'Selected file is not a bundle!');
			},
			function (callback)
			{
				self.bundle_path 	= bundle_path;
				self.bundle_folder 	= Folder(self.bundle_path);
				//self.folder = Folder(bundle_path);
				//self.lister	= Lister(self.folder);
				priv.fire('bundle-loaded');
			}
		], 
		errory.handler);
	}
	
	self.show = function (event) 
	{
		//self.links.bundle.html(List(self.bundle_folder).getHTML());
		
		self.mainList = TMFileList(self.bundle_folder);
		self.mainList.putHTML(self.links.bundle);
		self.mainList.onClickHandler(self.navigate);
		
		self.depth = self.depth + 1;
	}
	
	self.loadPlist = function (event) 
	{
		var tm_plist = new PlistParser(fs.readFileSync(self.bundle_path + '/info.plist', { encoding: 'utf8'}));
		console.dir(tm_plist.parse());
	}
	
	self.navigate = function(file_item)
	{
		console.log('Clicked on ' + $(this).data('name') + ', level: ' + $(this).data('indent'));
		var $this = $(this);
		
		var indent = $this.data('indent'),
			type = $this.data('type'),
			name = $this.data('name');
			
		if(indent === self.depth - 1 && type === "directory") {
			// We are pushing one new list
			self.depth++;
			console.dir(file_item);
			var list = TMFileList(file_item);
			list.putHTML(self.links.bundle);
			list.onClickHandler(self.navigate);
		}
		else if(type === "directory") {
			for (var i = indent + 1; i < self.depth; i++) {
				$('ul.file-list[data-indent="'+i+'"]').remove();
			}
			var list = TMFileList(file_item);
			list.putHTML(self.links.bundle);
			list.onClickHandler(self.navigate);
		}
	}
	
	// Event handling
	self.on = function(event, fn)
	{
		if(typeof(self.handlers[event]) === "undefined") {
			self.handlers[event] = [];
		}	
		
		self.handlers[event].push(fn);
	}
	
	priv.fire = function (event, data) 
	{
		if(self.handlers[event] instanceof Array) {
			self.handlers[event].forEach(function(handler)
			{
				handler.call(self, data);
			});
		}
	}
	
	self.init();
	return self;
})();