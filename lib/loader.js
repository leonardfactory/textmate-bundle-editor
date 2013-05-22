var async	= require('async');

module.exports = Loader = function(bundle_list)
{
	var self = {};
	
	self.bundle_list = null;
	
	self.build = function () 
	{
		self.bundle_list = bundle_list;
	}
	
	self.loadBundle = function(path)
	{
		async.waterfall ([
			function (callback)
			{
				fs.stat(path, callback);
			},
			function (stat, callback) 
			{
				if(!stat.isDirectory()) {
					callback('Cannot read directory');
				}
			}
		],);	
	}
	
	self.build();
	return self;
}