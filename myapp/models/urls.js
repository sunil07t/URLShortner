var mongoose = require ('mongoose');

//urls schema

var urlSchema = mongoose.Schema({
	surl: {
		type: String,
		required: true
	},
	lurl: {
		type: String,
		required: true
	},
	create_date:{
		type: Date, 
		default: Date.now
	}
});

var urls = module.exports = mongoose.model('urls', urlSchema);

//get urls

module.exports.getUrls = function(callback, limit){
	url.find(callback).limit(limit);
}