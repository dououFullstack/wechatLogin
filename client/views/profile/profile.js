Template.userinfo.helpers({
  getSex: function (sex) {
    console.log("sex :", sex);
    if (sex === 1) {
      return '男';
    } else {
      return '女';
    }
  }
});