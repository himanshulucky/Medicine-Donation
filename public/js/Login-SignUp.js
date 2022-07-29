$(document).ready(function () {
  $("#btnsignup").click(function () {
    var email = $("#txtemails").val();
    var pwd = $("#txtpwds").val();
    var utype = $("#utype").val();

    var url =
      "/savesignup?txtemails=" + email + "&txtpwds=" + pwd + "&utype=" + utype;
    $.get(url, function (respkuch) {
      alert(respkuch);
    });
  });
  $("#btnlogin").click(function () {
    var email = $("#txtemaill").val();
    var pwd = $("#txtpwdl").val();

    var url = "/chklogin?txtemaill=" + email + "&txtpwdl=" + pwd;
    $.getJSON(url, function (jsonary) {
      // alert(respkuch);
      if (jsonary.length == 0) {
        alert("Invalid email/password/expired");
      } else {
        alert(JSON.stringify(jsonary));
        //
        localStorage.setItem("activeUser", $("#txtemaill").val());
        if (jsonary[0].utype == "Donor")
          window.location.replace("/donor-dash.html");
        else if (jsonary[0].utype == "Needy")
          window.location.replace("/needy-dash.html");
      }
    });
  });
});
