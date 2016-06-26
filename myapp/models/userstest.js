var User = require ('./users.js');
//users schema
//
// 

var newUser = new User({
	username: "user",
	password: "test",
	email: "test@test.com"
});

console.log("1");

//User.testcreateUser(newUser, callback);
//User.simpleFindone("user");

User.simple2(newUser.username, function(err, user){
	console.log("usertest simple2" + user);
});



passport.use(new LocalStrategy(
	function(username, password, done){
		User.getUsersByUsername(username, function(err, user){
			console.log("passport" + user);
			if(err) throw err;
			if (!user){
				return done(null, false, {message: 'Invalid Username!'});
			}

			User.comparePassword(password, user.password, function(err, isMatch){
				if (err) throw err;
				if (isMatch){
					return done(null, user);
				} else {
					return done(null, false, {message: "Invalid Password!"});
				}
			});
		});
	}));
