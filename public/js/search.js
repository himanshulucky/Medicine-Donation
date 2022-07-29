$(document).ready(function () {
  //   alert("hi");
  // 
  var activeUser = localStorage.getItem("activeUser");
  $("#pdemail").val(activeUser).prop("readonly", true);
  $("#pdpassword").click(function () {
    // alert("hi");

    var email = $("#pdemail").val();

    var url = "/getProfileSearchObject?pdemail=" + email;
    $.getJSON(url, function (responseKuchJSONAryObject) {
      if (responseKuchJSONAryObject.length == 0) alert("Invalid Id");
      else {
        alert(JSON.stringify(responseKuchJSONAryObject));
        //now assign ids to all form controls
        $("#pdname").val(responseKuchJSONAryObject[0].name);
        $("#pdnumber").val(responseKuchJSONAryObject[0].mobile);
        $("#pdaddress").val(responseKuchJSONAryObject[0].address);
        $("#pdcity").val(responseKuchJSONAryObject[0].city);
        $("#pdidproof").val(responseKuchJSONAryObject[0].prooftype);
        $("#pdtime").val(responseKuchJSONAryObject[0].timings);

        //   ==============================
        //alert(responseKuchJSONAryObject[0].profilepic);
        $("#prev").prop(
          "src",
          "/uploads/" + responseKuchJSONAryObject[0].proofpic
        );

        $("#hdn").val(responseKuchJSONAryObject[0].proofpic);
        $("#prev2").prop(
          "src",
          "/uploads/" + responseKuchJSONAryObject[0].profilepic
        );

        $("#hdn").val(responseKuchJSONAryObject[0].profilepic);
      }
    });
  });
});
