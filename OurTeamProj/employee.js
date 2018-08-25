// Initialize Firebase
var config = {
    apiKey: "AIzaSyBX_2qY1vMKoLhHmS_UiAFcpACIGj2J0qM",
    authDomain: "luke-s-project1.firebaseapp.com",
    databaseURL: "https://luke-s-project1.firebaseio.com",
    projectId: "luke-s-project1",
    storageBucket: "luke-s-project1.appspot.com",
    messagingSenderId: "246039999091"
};
firebase.initializeApp(config);


var database = firebase.database();



$("#submit").on("click", function () {
    event.preventDefault();

    // Grabbed values from text boxes
    var name = $("#employee-name").val().trim();
    var role = $("#role").val().trim();
    var start_date = $("#start-date").val().trim();
    var monthly_rate = $("#monthly-rate").val().trim();
    var months_worked = moment().diff(moment(start_date), "months");
    var total_billed = (months_worked * monthly_rate);

    // Code for handling the push
    database.ref().push({
        name: name,
        role: role,
        start_date: start_date,
        monthly_rate: monthly_rate,
        months_worked: months_worked,
        total_billed: total_billed,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.role);
    console.log(sv.start_date);
    console.log(sv.months_worked);
    console.log(sv.monthly_rate);
    console.log(sv.dateAdded)
    console.log(sv.total_billled);

    // Change the HTML to reflect
    $("#tbody").prepend("<tr><td>" + sv.name + "</td><td>" + sv.role + "</td><td>" + sv.start_date + "</td><td>" + sv.months_worked + "</td><td>" + sv.monthly_rate + "</td><td>" + sv.total_billed + "</td></tr>");

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});