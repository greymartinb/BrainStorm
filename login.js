// Initialize Firebase


var name = window.name || {};
            var config = {
                apiKey: "AIzaSyC623OOx9z-PSUKTVYgGCvO_BOJuHQlHjw",
                authDomain: "testing123-b28a4.firebaseapp.com",
                databaseURL: "https://testing123-b28a4.firebaseio.com",
                projectId: "testing123-b28a4",
                storageBucket: "testing123-b28a4.appspot.com",
                messagingSenderId: "521291201548"
            };

            firebase.initializeApp(config);

            // Create a variable to reference the database
            var database = firebase.database();
            var userName = "";
            var password = "";
            var exists = false;
            var users = database.ref("/users");
            var whales = false;
            // var name = "";

            $(".user").on("click", function(event) {
                $(".firstChoice").attr("hidden", "hidden");


                if ($(this).val() === "existing") {
                    $(".secondChoice").removeAttr("hidden", "hidden");
                }

                else {
                    $(".thirdChoice").removeAttr("hidden", "hidden");
                }
            });

            /// SUPER IMPORTANT
            database.ref("/users").on("value", function(snapshot) {
            })

            $("#login").on("click", function(event) {
                exists = false;
console.log("second event");
                event.preventDefault();
                userName = $("#userName").val().trim();
                password = $("#password").val().trim();
                database.ref("/users").on("child_added", function(snapshot) {
                    var submission = snapshot.val();

                    if ((submission.userName === userName) && (submission.password === password)) {

                    exists = true;
                    name = submission.name;
                    }

                }, function(errorObject) {
sconsole.log("Errors handled: " + errorObject.code);
                });
                exist();
            });

            $("#create").on("click", function(event) {
                exists = false;
                event.preventDefault();
console.log("third event")
                userName = $("#userNameInput").val();
                password = $("#passwordInput").val();
                name = $("#nameInput").val();
                console.log(users.key);
                if (users.key) {
                    database.ref("/users").on("child_added", function(snapshot) {
                        var submission = snapshot.val();
                        if (submission.userName === userName) {
                            exists = true;

                        }

                    }, function(errorObject) {
                        console.log("Errors handled: " + errorObject.code);
                    });
                        addNew();
                }
                else {
console.log("here");
                    database.ref("/users").push({
                      userName: userName,
                      password: password,
                      name: name
                    });
                }
            });


            function exist() {
                if(exists) {
                    $("#stuff").text("Access Granted Hello " + name).css("color", "green");
                    window.location.replace("timeAppendingFunction.html");
                    }
                    else {
                        $("#stuff").text("Access Denied").css("color", "red");
                    }
            }

            function addNew() {
                if(exists) {
                    $("#stuff").append("This user already exists").css("color", "red");
                }
                else {
                    database.ref("/users").push({
                      userName: userName,
                      password: password,
                      name: name,
                    });
                    $("#stuff").append("New user created").css("color", "green");
                }
            }
