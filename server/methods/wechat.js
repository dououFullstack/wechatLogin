Meteor.methods({
  getUserInfo: function(code, state) {
    var appId = 'wx63afd8910ac82737';
    var appSecret = '06abca4d83a582c46a37957c4c499ba2';

    try {
      var result = HTTP.get("https://api.weixin.qq.com/sns/oauth2/access_token?" +
        "appid=" + appId +
        "&secret=" + appSecret +
        "&code=" + code +
        "&grant_type=authorization_code");
    } catch(err) {
      throw new Meteor.error(err);
    }

    var resultContent = JSON.parse(result.content);
    var accessToken = resultContent.access_token;
    var openid = resultContent.openid;

    console.log("result :", resultContent);

    result = HTTP.get("https://api.weixin.qq.com/sns/userinfo?" +
      "access_token=" + accessToken +
      "&openid=" + openid +
      "&lang=zh_CN");

    resultContent = JSON.parse(result.content);
    console.log("userinfo resultContent :", resultContent);

    return resultContent;
  }
});