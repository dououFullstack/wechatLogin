Meteor.methods({
  getUserInfo: function(code, state) {
    var appId = 'wx5585e55977e34370';
    var appSecret = '3ce737520a8025319029b06b92946e5b';

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
