// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAEjQjhOIIA7tORDJaHxQw15wwDsUJudHM",
    authDomain: "trainschedule-6cfaf.firebaseapp.com",
    databaseURL: "https://trainschedule-6cfaf.firebaseio.com",
    projectId: "trainschedule-6cfaf",
    storageBucket: "trainschedule-6cfaf.appspot.com",
    messagingSenderId: "524211019077",
    appId: "1:524211019077:web:119b775e4fbcfd3f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

    var name = "Name";
    var destination = "destination";
    var time
    var frequency
    var interval = 1000
   

    
    
    $("#add_train").on("click", function(event){
        event.preventDefault();
    
        // console.log("Clicked!")
    
        name = $("#trainName").val();
        destination = $("#destination").val();
        time = $("#time").val();
        frequency = $("#frequency").val();

        
        database.ref().push({
            name,
            destination,
            time,
            frequency,
        })

        $('#trainName').val('');
     	$('#destination').val('');
     	$('#time').val('');
     	$('#frequency').val('');

     	return false;
        
    });
    

    database.ref().on("child_added",function(childSnapshot){
        
        
    //    console.log("Train Time " + childSnapshot.val().time);
       var convertedTime = moment(childSnapshot.val().time, "HH:mm A");
       var timer = moment().diff(moment(convertedTime), "minutes") % childSnapshot.val().frequency;
    //    console.log("Timer" + timer)
       var minutes = childSnapshot.val().frequency - timer;
    //    console.log("Minutes " + minutes);
       var arrival = moment().add(minutes, "m").format("hh:mm A");
    //    console.log("Arival Time" + arrival);

        $("#trainTable").append(
            "<tr> <td>" + childSnapshot.val().name + "</td>" +
            "<td>" + childSnapshot.val().destination + "</td>" +
            "<td class='trainFrequency'>" + childSnapshot.val().frequency + "</td>" +
            "<td class='arrival'>" + arrival + "</td>" +
            "<td class='minutes'>" + minutes + "</td> </tr>")
        
        },

        function(errorObject) {
            console.log("The read failed: " + errorObject.code);
          
          });

          var updater = setInterval(trainTimer,60000);
          
          function trainTimer(){ 

            for(var i = 0; i < $(".arrival").length;i++){
            // console.log($(".arrival")[i].innerText)
            // console.log($(".minutes")[i].innerText)
            $(".minutes")[i].innerText --
            
            if($(".minutes")[i].innerText == 0){
                // console.log("Made It!")
                $(".arrival")[i].innerText =  moment($(".arrival")[i].innerText, "HH:mm").add($(".trainFrequency")[i].innerText, "minutes").format("hh:mm A")
                $(".minutes")[i].innerText = $(".trainFrequency")[i].innerText
            }



            }
            
          }
              
         

        


   