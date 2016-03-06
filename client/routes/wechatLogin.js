// WECHAT LOGIN
Meteor.loginWithWechat = function(userinfo, callback) {
  //create a login request with admin: true, so our loginHandler can handle this request
  _.extend(userinfo, {name: userinfo.nickname});

  var loginRequest = {
    username: userinfo.openid,
    profile: userinfo
  }

  //send the login request
  Accounts.callLoginMethod({
    methodArguments: [loginRequest],
    userCallback: callback
  });
};

// 主要目的就是为了来处理与微信服务器通讯，换取的 code
Router.route('/wechatLogin', {
  // code state
  onBeforeAction: function () {
    Meteor.call('getUserInfo',
      this.params.query.code,
      this.params.query.state,
      function(error, result) {
        if (!error) {
          Meteor.loginWithWechat(result, function() {
            Router.go('/profile');
          });
        }
      });
    this.render('loading');
  }
});
