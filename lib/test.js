var fs 		= require('fs');
var path 	= require('path');
var async	= require('async');

global.$ = $;

var Test = (function()
{
	var self = {};
	
	self.test = function () 
	{		
		async.waterfall([
			function (callback)
			{
				fs.stat(path.resolve('lib/main.js'), callback);
			},
			function (stat, callback)
			{
				console.dir(stat);
				callback();
			}
		], function (err) 
		{
			if(err) console.log(err);
		});
	}
	
	return self;
})();