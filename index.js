  //checks if user has logged in
  if (name[0] === undefined) {
    window.location.replace("login.html");
  }

  updateWeather();
  //global variables//
  var eventStart;
  var eventEnd;
  var location;
  var userArrival;
  var userDeparture;
  var userStatus;
  var userCount = 1;
  var overWriteTime = false;
  var overWriteUser = false;
  var overbookedCheck = [];
  var users = [];
  var userTime = [];
  var overLapStart;
  var overLapEnd;
  var triggerMe = false;

  //Slack posting function

  function postToSlack(name, location, userArrival, userDeparture){

  Slack = require('node-slackr');
  slack = new Slack('https://hooks.slack.com/services/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');
  slack = new Slack('https://hooks.slack.com/services/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',{
    channel: "#project1",
    username: "timy-bot",
    icon_emoji: ":ghost:"
  });
  messages = {
      text: name + " has signed up at " + location + " from " + userArrival + " to " + userDeparture + ".",
      channel: "#meetsmarter",
      username: "SmarterBot",
  }

  slack.notify(messages);
  };

  // Create a variable to reference the database
  var database = firebase.database();

  //displays user's name
  $("#userName").html('<h3>' + name + '</h3>');

  //location selector//
  $("#add-userSchedule").on("click", function(event) {
    event.preventDefault();


    ///defining methods inside of click event//
    var printUserSchedule = function() {
     $(".tableData").append(" <tr><td> "
      + location + "</td><td>"
      + name + "</td><td>"
      + userArrival+"</td><td>"
      + userDeparture + "</td><td>"
      + userStatus );
    };

    var findEventStart =  function(beginTime) {

      if ( eventStart === undefined || eventStart === "Invalid date") {
        eventStart = moment(beginTime, "hh:mm a").format("hh:mm a");
      }

      else if (moment(eventStart, "hh:mm a").isAfter(moment(beginTime, "hh:mm a"))) {
        eventStart = moment(beginTime, "hh:mm a").format("hh:mm a");
        overWriteTime = true;
      }
    };

    var findEventEnd =  function(stopTime) {

      if ( eventEnd === undefined || eventEnd === "Invalid date") {
        eventEnd = moment(stopTime, "hh:mm a").format("hh:mm a");
      }

      else if (moment(eventEnd, "hh:mm a").isBefore(moment(stopTime, "hh:mm a"))) {
        eventEnd = moment(stopTime, "hh:mm a").format("hh:mm a");
        overWriteTime = true;
      }
    };

    var preventUserError = function() {
      if (moment(userArrival, "hh:mm a").isAfter(moment(userDeparture, "hh:mm a"))) {
        $("#warning").html("Your end time can't be before your start time.");
        $("#warning").removeClass("hidden");
                setTimeout(function() {
                    $("#warning").empty();
                    $("#warning").addClass("hidden");
                }, 5000);
      }
      else {
        findEventStart(userArrival);
        findEventEnd(userDeparture);
      };
    };

    function createMeetUp(name, location, userArrival, userDeparture) {

      for ( i=0; i < overbookedCheck.length; i++) {
        console.log(overbookedCheck[i]);
        console.log(overbookedCheck[i][0]);
        for (ix = 0; ix < overbookedCheck[i][1].length; ix++) {
          if (name === overbookedCheck[i][1][ix].name) {
            if (overbookedCheck[i][0] != location) {
              console.log(name +" = " +overbookedCheck[i][1][ix].name);
              overLapStart = moment(overbookedCheck[i][1][ix].userArrival, "hh:mm a").format('hh:mm a');
              overLapEnd = moment(overbookedCheck[i][1][ix].userDeparture, "hh:mm a").format('hh:mm a');
              if (moment(userArrival, "hh:mm a").isBefore(moment(overLapEnd, "hh:mm a")) && moment(overLapStart, "hh:mm a").isBefore(moment(userDeparture, "hh:mm a"))) {
                $("#warning").html("You can't double book yourself, this time overlaps another time you already selected");
                $("#warning").removeClass("hidden");
                setTimeout(function() {
                    $("#warning").empty();
                    $("#warning").addClass("hidden");
                }, 5000);
                return;
              }
            }
          }
        }
      }

      var snapy =[];
      var timy = [];

      database.ref("/meetUps/"+location).on("child_added", function(snapshot, prevChildKey) {
        overWriteTime = false;
        overWriteUser = false;

        var dbSnap = snapshot.val();
        snapy = dbSnap;
        console.log(snapy);

        timy.push(dbSnap);

        if (dbSnap.userCount === 1) {
          userCount = dbSnap.userCount + 1;
        }
        else {
          userCount = 1;
        }

        if (dbSnap.userArrival === userArrival && dbSnap.userDeparture === userDeparture) {
          overWriteUser = true;
        }
        else{
          overWriteTime = true;
        }
      });

      var peopleUsers = [];
      var allUsers = [];
      var consideredUsers = [];

        for (i = 0; i < snapy.length; i++){
          allUsers = [];
          console.log(allUsers);
          allUsers.push(snapy[i].name);
          consideredUsers.push(snapy[i].name);

          if (allUsers.indexOf(name) != -1) {

            var userInfo = {
              name: name,
              userArrival: userArrival,
              userDeparture: userDeparture
            }
            snapy.splice(i, 1, userInfo)
          }
        }

  peopleUsers = snapy;
      if (allUsers.indexOf(name) === -1){
        var userPush = {
          name: name,
          userArrival: userArrival,
          userDeparture: userDeparture,
        }
        peopleUsers.push(userPush);
      }

        findEventStart(userArrival);
        findEventEnd(userDeparture);
        var newMeetUpData = {
          location: location,
          users: peopleUsers,
          userCount: userCount,
        };

      if (moment(userDeparture, "hh:mm a").isBefore(moment())) {
        $("#warning").html("Can't add past time");
        $("#warning").removeClass("hidden");
                setTimeout(function() {
                    $("#warning").empty();
                    $("#warning").addClass("hidden");
                }, 5000);
      }
      return database.ref("/meetUps/"+location).set(newMeetUpData);
    }

    var location = $("#location-input").val();
    var userArrival = moment($("#arrival-input").val(), "hh:mm a").format('hh:mm a');
    var userDeparture = moment($("#departure-input").val(), "hh:mm a").format('hh:mm a');
    preventUserError();
    createMeetUp(name,location,userArrival,userDeparture);
    postToSlack(name, location, userArrival, userDeparture);
  });

  function displayMeetUp() {

    var count = 0;

    database.ref("/meetUps").on("value", function(snapshot) {
      $(".tableData").empty();

      newMeetUp = snapshot.val();

      $.each(newMeetUp, function(index, value) {

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

        $(".tableData").append(meetUpLine);
        users = [];
        userTime = [];
        var statusTrigger = false;

        // WRITE TO SCREEN

        console.log(count);

        for (i = 0; i < value.users.length; i++) {
          userTime.push(value.users[i]);
          getUserStatus(value.users[i].userArrival, value.users[i].userDeparture);
        if (userStatus != "Departed") {
          $("#location" + count).append("<p>" +value.users[i].name + "</p>");

          $("#start" + count).append("<p>" +value.users[i].userArrival+ "</p>");

          $("#end" + count).append("<p>" +value.users[i].userDeparture+ "</p>");

          $("#status" + count).append("<p>"+userStatus+"</p>");
          statusTrigger = true
        }
      }
      if (statusTrigger === false) {
        database.ref("/meetUps/"+value.location).remove();
      }

      $("#organizor" + count).html(value.location);

        overbookedCheck[count] = [
            locality= value.location,
            peopleHere= userTime
          ]

        // Calculate duration.

        count ++;
      })
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    function getUserStatus(arrivalTime, departureTime) {
      if (moment(moment(),"hh:mm a").isBefore(moment(arrivalTime,"hh:mm a"))) {
        userStatus = "Pre-Arrival"
      }
      else if (moment(moment(),"hh:mm a").isAfter(moment(departureTime,"hh:mm a"))) {
        userStatus = "Departed"
      }
      else {
        userStatus = "Present";
      }
    };
  }
  displayMeetUp();
