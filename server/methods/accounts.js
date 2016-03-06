Accounts.registerLoginHandler(function(loginRequest) {

  // loginRequest 包含当前这个要使用微信登录的这个用户的信息。nickname、openid
  console.log("registerLoginHandler loginRequest :", loginRequest);

  //we create a admin user if not exists, and get the userId
  var userId = null;
  var user = Meteor.users.findOne({username: loginRequest.username});
  if(!user) {
    userId = Meteor.users.insert(loginRequest);
  } else {
    userId = user._id;
  }

  //send loggedin user's user id
  return {
    userId: userId
  }
});