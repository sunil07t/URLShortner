var mongoose = require ('mongoose');
var bcrypt = require('bcryptjs');// to hash the password
//users schema

var usersSchema = mongoose.Schema({
	username: {
		type: String
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	create_date:{
		type: Date, 
		default: Date.now
	}
});

var Users = module.exports = mongoose.model('Users', usersSchema);

//bcrypt copied from 
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save();
    });
});
}
// get users

module.exports.getUsers = function(callback, limit){
	Users.find(callback).limit(limit);
}

module.exports.getUsersByUsername = function (username, callback){
	console.log("getuserbyusername");
	var query = {username: username};
	console.log(query);
	Users.findOne(query, callback);
}

module.exports.comparePassword = function(password, hash, callback){
	bcrypt.compare(password, hash, function(err, isMatch){
		if (err) throw err;
		callback(null, isMatch);
	})
}

module.exports.getUserById = function(id, callback){
	Users.findById(id, callback);
}
>>>>>>> upstream/master
