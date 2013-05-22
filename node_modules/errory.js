module.exports = errory = (function()
{
	var self = {};
	
	self.handler = function (err, results) 
	{
		if(err) {
			console.log('Error: ' + err);
		}
	}
	
	return self;
})();