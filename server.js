// Day 1
// npm init -s
// npm install  nodemon
// npm install express -s
// npm install yarn
// JSG Jai Shri Ganesh

// const { json } = require("body-parser");
var Express = require("express");
var app = Express();
var fileuploader = require("express-fileupload");

app.use(Express.static("public"));

var mysql = require("mysql");

// ============================basic setting==============================

app.listen(2002, function () {
  console.log("server started");
});
app.get("/", function (req, resp) {
  //   resp.send("Its Home Page");

  var puraPath = process.cwd() + "/public/index.html";

  //global object : process
  resp.sendFile(puraPath);
});
var dbconfigureobject = {
  host: "localhost",
  user: "root",
  password: "",
  database: "table",
};
var refdb = mysql.createConnection(dbconfigureobject);
refdb.connect(function (errKuch) {
  if (errKuch) console.log(errKuch);
  else console.log("Connected to Server....");
});
//============================= server connected==========================================

app.get("/savesignup", function (req, resp) {
  console.log("hello");
  var dataarray = [req.query.txtemails, req.query.txtpwds, req.query.utype, 1];
  refdb.query(
    "insert into users values(?,?,?,?)",
    dataarray,
    function (err, result) {
      if (err) {
        resp.send(err);
      } else resp.send("instered successfully");
    }
  );
});
app.get("/chklogin", function (req, resp) {
  console.log("hello login");
  var dataarray = [req.query.txtemaill, req.query.txtpwdl];
  console.log(dataarray);
  refdb.query(
    "select * from users where email=? and pwd=? ",
    dataarray,
    function (err, result) {
      if (err) {
        console.log(err);
        resp.send(err);
      } else {
        console.log(result + "result");
        resp.send(result);
      }
    }
  );
});
app.get("/ChangePassword", function (req, resp) {
  var ary = [req.query.txtemailsettings, req.query.txtpwdsettings];
  var dataarray = [req.query.txtnewpwdsettings, req.query.txtemailsettings];
  refdb.query(
    "select * from users where email=? and pwd=? ",
    ary,
    function (err, result) {
      if (err) {
        console.log(err);
        resp.send(err);
      } else if (result.length == 1) {
        refdb.query(
          "UPDATE users SET pwd=? WHERE email=?",
          dataarray,
          function (err, result) {
            if (err) {
              console.log(err);
              resp.send(err);
            } else {
              console.log(result);
              resp.send("Password Successfully updated");
            }
          }
        );
      } else resp.send("Invalid Old Password");
    }
  );
});

// ====================donor-Profile===================================
app.use(fileuploader());
app.post("/donorprofile-process", function (req, resp) {
  var fname;
  if (req.files != null) {
    fname = req.files.pdprofile.name;
    var des = process.cwd() + "/public/uploads/" + fname;
    req.files.pdprofile.mv(des, function (err) {
      if (err) console.log(err);
      else console.log("Badhaiiiiiiii");
    });
  } else fname = req.body.hdn;
  var fname2;
  if (req.files != null) {
    fname2 = req.files.pdprofiles.name;
    var des = process.cwd() + "/public/uploads/" + fname2;
    req.files.pdprofiles.mv(des, function (err) {
      if (err) console.log(err);
      else console.log("Badhaiiiiiiii");
    });
  } else fname2 = req.body.hdn2;

  var dataAry = [
    req.body.pdemail,
    req.body.pdname,
    req.body.pdnumber,
    req.body.pdaddress,
    req.body.pdcity,
    req.body.pdidproof,
    req.body.pdtime,
    fname,
    fname2,
  ];
  refdb.query(
    "insert into dprofile values(?,?,?,?,?,?,?,?,?)",
    dataAry,
    function (err) {
      if (err) resp.send(err);
      else resp.send("Inserted Successfully");
    }
  );
});

app.post("/donorprofile-process-update", function (req, resp) {
  var fname;
  if (req.files != null) {
    fname = req.files.pdprofile.name;
    var des = process.cwd() + "/public/uploads/" + fname;
    req.files.pdprofile.mv(des, function (err) {
      if (err) console.log(err);
      else console.log("Badhaiiiiiiii");
    });
  } else fname = req.body.hdn;
  var fname2;
  if (req.files != null) {
    fname2 = req.files.pdprofiles.name;
    var des = process.cwd() + "/public/uploads/" + fname2;
    req.files.pdprofiles.mv(des, function (err) {
      if (err) console.log(err);
      else console.log("Badhaiiiiiiii");
    });
  } else fname2 = req.body.hdn2;

  var dataAry = [
    req.body.pdname,
    req.body.pdnumber,
    req.body.pdaddress,
    req.body.pdcity,
    req.body.pdidproof,
    req.body.pdtime,
    fname,
    fname2,
    req.body.pdemail,
  ];
  refdb.query(
    "update dprofile set name=?,mobile=?,address=?,city=?,prooftype=?,timings=?,proofpic=?,profilepic=?  where emailid=?",
    dataAry,
    function (err) {
      if (err) resp.send(err);
      else resp.send("Inserted Successfully");
    }
  );
});

app.get("/getProfileSearchObject", function (req, resp) {
  // alert("hi");
  console.log(req.query.pdemail);
  //0/1 records
  refdb.query(
    "select * from dprofile where emailid=?",
    [req.query.pdemail],
    function (err, resultAryOfObjects) {
      if (err) {
        console.log(err);
        resp.send(err);
      } else resp.send(resultAryOfObjects);
    }
  );
});

// ==================avail-med===========================

app.post("/availMedicine-process", function (req, resp) {
  var fname;
  if (req.files != null) {
    fname = req.files.pic.name;
    var des = process.cwd() + "/public/uploads/" + fname;
    req.files.pic.mv(des, function (err) {
      if (err) console.log(err);
      else console.log("Badhaiiiiiiii");
    });
  } else fname = req.body.hdn;

  var dataAry = [
    req.body.emailid,
    req.body.medecine,
    req.body.packing,
    req.body.qty,
    req.body.expdate,
    req.body.company,
    fname,
    req.body.floatingTextarea2,
  ];
  refdb.query(
    "insert into medecines values(?,?,?,?,?,?,?,?,current_date())",
    dataAry,
    function (err) {
      if (err) resp.send(err);
      else resp.send("Inserted Successfully");
    }
  );
});

app.all("/fetchAllBlockResumeRecords", function (req, resp) {
  refdb.query("select * from users ", function (err, resultAryOfObjects) {
    if (err) resp.send(err);
    else resp.send(resultAryOfObjects);
  });
});
app.get("/profile-Block-angualr", function (req, resp) {
  refdb.query(
    "update users set status=0 where email=?",
    [req.query.emailBlock],
    function (err, result) {
      if (err) {
        // console.log(err);
        resp.send(err);
      } else {
        resp.send(result);
      }
    }
  );
});
app.get("/profile-Resume-angualr", function (req, resp) {
  refdb.query(
    "update users set status=1 where email=?",
    [req.query.emailResume],
    function (err, result) {
      if (err) {
        // console.log(err);
        resp.send(err);
      } else {
        resp.send(result);
      }
    }
  );
});
app.get("/profile-delete-angualr", function (req, res) {
  //table col name
  refdb.query(
    "delete from users where email=?",
    [req.query.emailDelete],
    function (err, result) {
      if (err) res.send(err);
      else if (result.affectedRows == 0) res.send("Invalid Id");
      else res.send("Record Deleted Successfulllllyyyyy.... Badhaiiiii");
    }
  );
});

app.all("/fetchAllDonorRecords", function (req, resp) {
  refdb.query(
    "select * from users where utype='Donor' ",
    function (err, resultAryOfObjects) {
      if (err) {
        console.log(err);
        resp.send(err);
      } else resp.send(resultAryOfObjects);
    }
  );
});
app.all("/fetchAllNeedyRecords", function (req, resp) {
  refdb.query(
    "select * from users where utype='Needy' ",
    function (err, resultAryOfObjects) {
      if (err) {
        console.log(err);
        resp.send(err);
      } else resp.send(resultAryOfObjects);
    }
  );
});

app.get("/fetchAllCity", function (req, resp) {
  refdb.query(
    "select distinct city from dprofile ",
    function (err, resultAryOfObjects2) {
      if (err) resp.send(err);
      else {
        console.log(resultAryOfObjects2);
        resp.send(resultAryOfObjects2);
      }
    }
  );
});
app.get("/fetchAllMedecine", function (req, resp) {
  console.log(req.query.cityx);
  refdb.query(
    "select distinct medecine from medecines inner join dprofile on medecines.emailid=dprofile.emailid where dprofile.city=?",
    [req.query.cityx],
    function (err, resultAryOfObjects) {
      if (err) {
        console.log(err);
        resp.send(err);
      } else {
        console.log(resultAryOfObjects);
        resp.send(resultAryOfObjects);
      }
    }
  );
});
app.get("/fetchdonor", function (req, resp) {
  console.log(req.query.city, req.query.medecine);
  refdb.query(
    "select * from medecines inner join dprofile on medecines.emailid=dprofile.emailid where dprofile.city=? and medecines.medecine=?",
    [req.query.city, req.query.medecine],
    function (err, resultAryOfObjects) {
      if (err) {
        console.log(err);
        resp.send(err);
      } else {
        console.log(resultAryOfObjects);
        resp.send(resultAryOfObjects);
      }
    }
  );
});

app.get("/DonorMedManager", function (req, resp) {
  console.log(req.query.emailid);
  refdb.query(
    "select * from medecines where emailid=? ",
    [req.query.emailid],
    function (err, resultAryOfObjects) {
      if (err) {
        console.log(err);
        resp.send(err);
      } else resp.send(resultAryOfObjects);
    }
  );
});
