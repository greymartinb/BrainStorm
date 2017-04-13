// INITIALIZE DATABASE //

var name = window.name || [];
var config = {
    apiKey: "AIzaSyC623OOx9z-PSUKTVYgGCvO_BOJuHQlHjw",
    authDomain: "testing123-b28a4.firebaseapp.com",
    databaseURL: "https://testing123-b28a4.firebaseio.com",
    projectId: "testing123-b28a4",
    storageBucket: "testing123-b28a4.appspot.com",
    messagingSenderId: "521291201548"
};

firebase.initializeApp(config);

// DATABASE VARIABLE//

var database = firebase.database();

// GLOBAL VARIABLES //

var userName = "";
var password = "";
var confirmPassword = "";
var exists = false;
var users = database.ref("/users");


// USER DOESN'T KNOW WHAT MEET SMARTER IS

$("#clicky").on("click", function(event) {
    $(".firstChoice").hide();
    $(".whatAreWe").removeClass("hidden");
});

$("#showy").on("click", function(event){
  $(".whatAreWe").addClass("hidden");
  $(".firstChoice").show();
});

// USER PICKS EXISTING USER OR NEW USER.

$(".user").on("click", function(event) {
    $(".firstChoice").hide();

    // IF EXISTING SHOW existing DIV...

    if ($(this).val() === "existing") {
        $(".existing").removeClass("hidden");
    } else {
        // ELSE SHOW new.
        $(".new").removeClass("hidden");
    }
});

$("#create").on("click", function(event) {
    exists = false;
    event.preventDefault();

    // CAPTURE NEW USER INFO FROM FORM.
    userName = $("#userNameInput").val().trim();
    password = $("#passwordInput").val().trim();
    confirmPassword = $("#passwordConfirm").val().trim();
    name = $("#nameInput").val().trim();

    console.log(users.key);

    // IF THERE ARE USERS...
    if (users.key) {
        // CREATE NEW SNAPSHOT OF DATABASE.
        database.ref("/users").on("child_added", function(snapshot) {
            // SNAPSHOT SAVED AS SUBMISSION.
            var submission = snapshot.val();

            // IF ENTERED USERNAME IS FOUND IN SUBMISSION...
            if (submission.userName === userName) {
                // exists SET TO TRUE.
                exists = true;
            }

        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

        addNew();

    } else {
        // PUSH NEWLY CREATED USER DATA TO DATABASE.
        database.ref("/users").push({
            userName: userName,
            password: password,
            name: name
        });

        console.log("here");
    }
});

$("#backForCreate").on("click", function(event) {
  if (event.keyCode === 13){
    event.preventDefault;
  }
  $(".new").addClass("hidden");
});
$("#backForExisting").on("click", function(event) {
  event.preventDefault;
  $(".existing").addClass("hidden");
});

// SNAPSHOT OF CURRENT DATABASE CREATED.
database.ref("/users").on("value", function(snapshot) {})

// CAPTURE USERNAME AND PASSWORD FOR LOG IN.

$("#login").on("click", function(event) {
    exists = false;

    event.preventDefault();

    // CAPTURE EXISTING USER INFO FROM FORM.
    userName = $("#userName").val().trim();
    password = $("#password").val().trim();

    // CREATE SNAPSHOT OF DATABASE WHEN CHILD IS ADDED.
    database.ref("/users").on("child_added", function(snapshot) {
        // SNAPSHOT SAVED AS submission.
        var submission = snapshot.val();

        // AUTHENTICATE

        // IF USERNAME AND PASSWORD ENETERED IN FORM MATCH INFO IN DATABASE...
        if ((submission.userName === userName) && (submission.password === password)) {
            // exists IS TRUE.
            exists = true;

            // PULL NAME FROM submission.
            name = submission.name;
        }

    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


    exist();
});

// DUPLICATE CHECK



// EXISTING USER AUTHENTICATION
function exist() {
    // IF exists IS TRUE...
    if (exists) {
        // NOTIFY USER THEY HAVE LOGGED IN AND ARE BEING REDIRECTED.
        $("#notificationShow").text("Hello " + name + "! Access Granted.  Redirecting you now.").addClass("accessGranted").removeClass("accessDenied");
        // REDIRECT DELAYED 5 SECONDS.
        setTimeout(function() {
            window.location.replace("index.html");
        }, 3000);
    } else {
        // ELSE (exists being false) NOTIFY USER ACCESS IS DENIED.
        $("#notificationShow").text("Access Denied.").addClass("accessDenied").removeClass("accessGranted");
        // REMOVE ACCESS DENIED MESSAGE AFTER 2.5 SECONDS.
        setTimeout(function() {
            $("#notificationShow").text("");
        }, 2500);
    }
}

// ADD NEW USER
function addNew() {
    // IF exists IS TRUE...
    if (exists) {
        // NOTIFY USER THEY ALREADY HAVE A LOGIN.
        $("#notificationShow").append("This user already exists.").addClass("accessDenied").removeClass("accessGranted");
        // REMOVE MESSAGE AFTER 2.5 SECONDS.
        setTimeout(function() {
            $("#notificationShow").text("");
        }, 2500);
    } else {
        // ELSE (exists being false)
        // CHECK passwordInput MATCHES passwordConfirm.
        if (password !== confirmPassword) {
            console.log(password);
            console.log(confirmPassword);
            // NOTIFY USER PASSWORDS MUST MATCH.
            $("#notificationShow").append("Passwords must match.").addClass("accessDenied").removeClass("accessGranted");
            // REMOVE MESSAGE AFTER 2.5 SECONDS.
            setTimeout(function() {
                $("#notificationShow").text("");
            }, 2500);
        } else {
            // PUSH NEW USER FORM INFO TO DATABASE.
            database.ref("/users").push({
                userName: userName,
                password: password,
                name: name
            });

            // NOTIFY USER THEY CAN NOW LOGIN BY SELECTING "Existing User".
            $("#notificationShow").append("New user created.  When page reloads select \"Existing User\".").addClass("accessGranted").removeClass("accessDenied");
            // RELOAD PAGE AFTER 2.5 SECONDS.
            setTimeout(function() {
                window.location.reload();
            }, 2500);
        }
    }
}
