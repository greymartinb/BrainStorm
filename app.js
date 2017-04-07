var secureLogin = require("./login.js");

// GLOBAL VARIABLES //

var eventStart;
var eventEnd;
var location;
var userName;
var userArrival;
var userDeparture;
var userStatus;
var thisMeetUp = {};
var allMeetUps = {};
var allUsers = [];
var userCount = 1;
var overWriteTime = false;
var overWriteUser = false;

// DATABASE //
var database = firebase.database();

// FORCE USER LOG IN
if (name[0] === "[") {
    window.location.replace("login.html");
}

// Display user name
$("#userName").html('<h3>' + name + '</h3>');

//location selector//
$("#add-userSchedule").on("click", function(event) {
    event.preventDefault();

    ///defining methods inside of click event//
    var printUserSchedule = function() {
        $(".tableData").append(" <tr><td> " + location + "</td><td>" + name + "</td><td>" + userArrival + "</td><td>" + userDeparture + "</td><td>" + userStatus);
    };

    var findEventStart = function(beginTime) {
        console.log(eventStart);
        console.log(beginTime);

        if (eventStart === undefined || eventStart === "Invalid date") {
            eventStart = moment(beginTime, "hh:mm a").format("hh:mm a");
        } else if (moment(eventStart, "hh:mm a").isAfter(moment(beginTime, "hh:mm a"))) {
            eventStart = moment(beginTime, "hh:mm a").format("hh:mm a");
        }
        console.log(eventStart);
    };

    var findEventEnd = function(stopTime) {
        console.log(eventEnd);
        console.log(stopTime);

        if (eventEnd === undefined || eventEnd === "Invalid date") {
            eventEnd = moment(stopTime, "hh:mm a").format("hh:mm a");
        } else if (moment(eventEnd, "hh:mm a").isBefore(moment(stopTime, "hh:mm a"))) {
            eventEnd = moment(stopTime, "hh:mm a").format("hh:mm a");
        }
        // $("#" + location + "End").html(eventEnd);
        console.log(eventEnd);
    };

    var preventUserStupidity = function() {
        if (moment(userArrival, "hh:mm a").isAfter(moment(userDeparture, "hh:mm a"))) {
            alert("try again stupid");
        } else {
            findEventStart(userArrival);
            findEventEnd(userDeparture);
        };
    };

    function createMeetUp(name, location, userArrival, userDeparture) {

        var snapy = [];
        var timy = [];

        database.ref("/meetUps/" + location).on("child_added", function(snapshot, prevChildKey) {
            overWriteTime = false;
            overWriteUser = false;

            var dbSnap = snapshot.val();
            snapy = dbSnap;
            timy.push(dbSnap);

            if (dbSnap.userCount === 1) {
                userCount = dbSnap.userCount + 1;
            } else {
                userCount = 1;
            }

            if (dbSnap.userArrival === userArrival && dbSnap.userDeparture === userDeparture) {
                overWriteUser = true;
            } else {
                overWriteTime = true;
            }
        });

        if (snapy) {
            allUsers = snapy;
        }

        if (allUsers.indexOf(name) === -1) {
            // var userPush = {
            //   name: name, 
            //   userArrival: userArrival,
            //   userDeparture: userDeparture,
            // }
            allUsers.push(name);
        }
        console.log("allusers " + allUsers);
        if (overWriteTime) {
            findEventStart(timy[0]);
            findEventEnd(timy[2]);
            var newMeetUpData = {
                location: location,
                userArrival: eventStart,
                userDeparture: eventEnd,
                users: allUsers,
                userCount: userCount,
            };
        } else {
            var newMeetUpData = {
                location: location,
                userArrival: userArrival,
                userDeparture: userDeparture,
                users: allUsers,
                userCount: userCount,
            };
        }
        console.log(newMeetUpData.users);
        console.log("meetupdata " + newMeetUpData);
    };

    function createMeetUp(name, location, userArrival, userDeparture) {

        var snapy = [];
        var timy = [];

        database.ref("/meetUps/" + location).on("child_added", function(snapshot, prevChildKey) {
            overWriteTime = false;
            overWriteUser = false;

            var dbSnap = snapshot.val();

            snapy = dbSnap;
            timy.push(dbSnap);



            console.log(dbSnap);
            console.log(dbSnap.key);
            console.log(dbSnap.userCount);
            console.log(prevChildKey);
            if (dbSnap.userCount === 1) {
                userCount = dbSnap.userCount + 1;
            } else {
                userCount = 1;
            }

            if (dbSnap.userArrival === userArrival && dbSnap.userDeparture === userDeparture) {
                overWriteUser = true;
            } else {
                overWriteTime = true;

            }

        });

        return database.ref("/meetUps/" + location).set(newMeetUpData);
    }

    var location = $("#location-input").val();
    var userName = name
    var userArrival = moment($("#arrival-input").val(), "hh:mm a").format('hh:mm a');
    var userDeparture = moment($("#departure-input").val(), "hh:mm a").format('hh:mm a');
    preventUserStupidity();
    createMeetUp(name, location, userArrival, userDeparture);


});
if (allUsers.indexOf(name) === -1) {
    var userPush = {
        name: name,
        userArrival: userArrival,
        userDeparture: userDeparture,
    }
    allUsers.push(name);
}
console.log("allusers " + allUsers);
if (overWriteTime) {
    findEventStart(timy[0]);
    findEventEnd(timy[2]);

    findEventStart(dbSnap.userArrival)
    findEventEnd(dbSnap.userDeparture)
}


if (dbSnap.users) {
    allUsers = dbSnap.users;
}

});
if (allUsers.indexOf(name) === -1) {
    var userPush = name + " " + userArrival + " - " + userDeparture;
    allUsers.push(userPush);
}
console.log("allusers " + allUsers);
if (overWriteTime) {
    var newMeetUpData = {
        userArrival: eventStart,
        userDeparture: eventEnd,
        users: allUsers,
        userCount: userCount,
    };
} else {
    var newMeetUpData = {
        userArrival: userArrival,
        userDeparture: userDeparture,
        users: allUsers,
        userCount: userCount,
    };
}

console.log(newMeetUpData.users);
console.log("meetupdata " + newMeetUpData);

if (overWriteUser || overWriteTime) {
    console.log("YOU HIT GOLD");
    return database.ref("/meetUps/" + location).set(newMeetUpData);

} else {
    console.log("YOU FAILED");

    return database.ref("/meetUps/" + location).set(newMeetUpData);

    return database.ref("/meetUps/" + location).push(newMeetUpData);

}

}

var location = $("#location-input").val();
var userName = name
var userArrival = moment($("#arrival-input").val(), "hh:mm a").format('hh:mm a');
var userDeparture = moment($("#departure-input").val(), "hh:mm a").format('hh:mm a');
preventUserStupidity();
createMeetUp(name, location, userArrival, userDeparture);

function displayMeetUp() {
    var count = 0;

    database.ref("/meetUps").on("value", function(snapshot) {

        newMeetUp = snapshot.val();

        $.each(newMeetUp, function(index, value) {
            getUserStatus(value.userArrival, value.userDeparture);
            console.log(value);
            console.log(newMeetUp);
            console.log(snapshot);

            // CREATE TABLE

            // ROW
            var meetUpLine = $("<tr id=\"meetUp" + count + "\">");

            // CELL - ORGANIZOR NAME
            var meetOrganizor = $("<td id=\"organizor" + count + "\">");

            // CELL - LOCATION
            var meetLocation = $("<td id=\"location" + count + "\">");

            // CELL - START TIME
            var meetStart = $("<td id=\"start" + count + "\">");

            // CELL - END TIME
            var meetEnd = $("<td id=\"end" + count + "\">");

            // CELL - DURATION
            var meetDuration = $("<td id=\"duration" + count + "\">");

            // CELL - STATUS
            var meetStatus = $("<td id=\"status" + count + "\">")

            // APPEND CELLS TO ROW

            meetUpLine.append(meetOrganizor);

            meetUpLine.append(meetLocation);

            meetUpLine.append(meetStart);

            meetUpLine.append(meetEnd);

            meetUpLine.append(meetStatus);

            // APPEND TO EXISTING TABLE - deezMeetUps
            $(".tableData").empty();
            $(".tableData").append(meetUpLine);

            // WRITE TO SCREEN

            $("#organizor" + count).html(value.users);

            $("#location" + count).html(value.location);

            $("#start" + count).html(value.userArrival);

            $("#end" + count).html(value.userDeparture);

            $("#status" + count).html(userStatus);

            startTime = parseInt(value.start);

            endTime = parseInt(value.end);

            // Calculate duration.


            if (endTime - startTime < 100) {
                duration = (endTime - startTime);
                $("#duration" + newMeetUp.count).html(duration + " minutes");
            } else {
                duration = (endTime - startTime) / 100;
                $("#duration" + newMeetUp.count).html(duration + " hours");
            }
            count++;
        })
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    function getUserStatus(arrivalTime, departureTime) {
        if (moment(moment(), "hh:mm a").isBefore(moment(arrivalTime, "hh:mm a"))) {
            userStatus = "Pre-Arrival"
        } else if (moment(moment(), "hh:mm a").isAfter(moment(departureTime, "hh:mm a"))) {
            userStatus = "Departed"
        } else {
            userStatus = "Present";
        }
    };
}
displayMeetUp();
