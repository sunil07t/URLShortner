var mongoose = require ('mongoose');

//users schema

var usersSchema = mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	create_date:{
		type: Date, 
		default: Date.now
	}
});

var users = module.exports = mongoose.model('users', usersSchema);

// get users

module.exports.getUsers = function(callback, limit){
	users.find(callback).limit(limit);
}