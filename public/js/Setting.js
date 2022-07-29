$(document).ready(function () {

  // 
  if (localStorage == null) window.location.replace("/index.html");
  //   alert("hi");
  $("#btnupdate").click(function () {
    var email = $("#txtemailsettings").val();
    var pwd = $("#txtpwdsettings").val();
    var newpwd = $("#txtnewpwdsettings").val();
    var url =
      "/ChangePassword?txtemailsettings=" +
      email +
      "&txtpwdsettings=" +
      pwd +
      "&txtnewpwdsettings=" +
      newpwd;
    $.getJSON(url, function (jsonary) {
      $.get(url, function (jsonary) {
        alert(jsonary);
      });
    });
  });
  $("#btnlogout").click(function () {
    // 
    localStorage.getItem("activeUser");
    window.location.replace("/index.html");
  });
});
