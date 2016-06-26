var mongoose = require ('mongoose');
var bcrypt = require('bcryptjs');// to hash the password
var mongodb = require('mongodb');

//users schema


/**usersSchema
This is the format that is used in database to store 
or pull data.
Username: String, username of a given user
password: String, password of a given user
create_data: Date, date when the given username, password were created
*/
usersSchema = mongoose.Schema({
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

//makes the usersSchema accessible from other files too
Users = module.exports = mongoose.model('Users', usersSchema);

/**
createUser
newUser - user object that is being created, contains username, password
uses bcrypt to salt and hash a given password string
*/
/**
 * [createUser create new user based on newUser]
 * @param  {[object]}   newUser  [newUser object contains username, passwords..]
 */
module.exports.createUser = function(newUser, callback){
	getUsersByUsername(newUser.username, function(err, user){
		if (user){
			console.log("Username already exists");
		}
	});
	bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
        newUser.password = hash;
        newUser.save();
    });
});
};

module.exports.testcreateUser = function(newUser, callback){
	console.log("testcreateUser");
	this.getUsersByUsername(newUser.username, function(err, user){
		console.log("getursname + " + user + err);
		if (user){
			console.log("Username already exists");
		} else {
			console.log("Username is unique");
/*			bcrypt.genSalt(10, function(err, salt) {
	    		bcrypt.hash(newUser.password, salt, function(err, hash) {
			        newUser.password = hash;
			        newUser.save();
	    		});
			});*/
		} 
	})

};
/**
 * [getUsers returns the number of users based on limit]
 * @param  {[int]}   limit    [default 1; number of items being returned]
 */
module.exports.getUsers = function(callback, limit){
	Users.find(callback).limit(limit);
};

/**
 * [getUsersByUsername return 1 entity that is contains a given username]
 * @param  {[string]}   username [username being queried]
 */
module.exports.getUsersByUsername = function (username, callback){
	console.log("getusersbyusername");
	var query = {username: username};	
	Users.findOne(query, callback);
}

/**
 * [comparePassword compare password to hash and see if theyre same or not]
 * @param  {[string]}   password [password from user object]
 * @param  {[type]}   hash     [encrypted version of password]
 */
module.exports.comparePassword = function(password, hash, callback){
	bcrypt.compare(password, hash, function(err, isMatch){
		if (err) throw err;
		callback(null, isMatch);
	})
}

/**
 * [getUserById returns the users that have the given id number
 * @param  {[int]}   id       [id number being queried]
 */
module.exports.getUserById = function(id, callback){
	Users.findById(id, callback);
};

