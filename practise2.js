let arguments = process.argv;
let noOfEmployees = Number(arguments[2]);
var noOfCabs = Number(arguments[3]);
var operations = arguments.slice(4);
// console.log(noOfEmployees, noOfCabs,operations);

let count = 0;

// Creating Cabs and Employess array:

const employeeArray = new Array(noOfEmployees);
const cabsArray = new Array(noOfCabs);
const dayShiftArray = [0,0,0,0];
for(let cabIndex = 0 ; cabIndex<cabsArray.length;cabIndex++){
    cabsArray[cabIndex] = true;
}
for(let employeeIndex = 0 ; employeeIndex<employeeArray.length; employeeIndex++){
    employeeArray[employeeIndex] = 0;
}


var cabsTrack = 1; //uncanny
var cabsAvailablity = noOfCabs;
var stack = []; // uncany

// Let's loop through each request:
while(operations.length>count){
  let currentOperation=operations[count];
  let informationOfSlot={
        employee:Number(currentOperation.charAt(0)),
        shift:Number(currentOperation.charAt(2)),
        action:Number(currentOperation.charAt(4))
  };

  if(informationOfSlot.action===1){
      if(cabsAvailablity>0){
        if(employeeArray[informationOfSlot.employee-1]<2){ // checking if the user is blocked or not. (Will be blocked for more than 2 cancellations)
          if(dayShiftArray[informationOfSlot.shift]<noOfCabs/2){
            cabDuration(cabsTrack);
            cabsArray[cabsTrack-1] = false;
            cabsAvailablity--;
            console.log("Cab-"+(cabsTrack)+" allocated to Emp-"+informationOfSlot.employee+" for slot-" +informationOfSlot.shift+" (remaining cabs = "+cabsAvailablity+")");
            cabsTrack++;
            dayShiftArray[informationOfSlot.shift]++;
            if(cabsTrack>cabsArray.length){
              cabsTrack = 1;
          }
          }
          else{
            console.log("** Sorry cannot allocate for slot 1 at the moment. Please check different slot or try later **");
          }
        }
        else{ // In case the user is blocked then :
          console.log("** Sorry request denied. User Blocked. Please wait for 80 seconds and try again **");
          setTimeout(function(){
            employeeArray[informationOfSlot.employee-1]= 0;
          },8000);
        }
      }
      else{
            console.log("** No cabs in the pool. Please wait... **")
            stack.push(currentOperation);
      }
  }
  else{
    if(employeeArray[informationOfSlot.employee-1]<2){
      cabsAvailablity++;
      cabsTrack--;
      cabsArray[cabsTrack-1] = true;
      dayShiftArray[informationOfSlot.shift]--;
      employeeArray[informationOfSlot.employee-1]++;
      console.log("Booking for slot- "+ informationOfSlot.shift+" cancelled by Emp-"+informationOfSlot.employee+" (remaining cabs = "+cabsAvailablity+")");
    }
    else{ // See if this else condition is necessary. Coz if the user is blocked then it can't book a ride let alone cancel it.
      console.log("** Sorry request denied. Please wait for 80 seconds and try again **");
      
      setTimeout(function(){
                    employeeArray[informationOfSlot.employee-1] = 0;
                },8000);
    }
  }
  count++; // Going to next booking request.
}

function cabDuration(cabGiven){
  setTimeout(()=>{
    cabsAvailablity++;
    cabsArray[cabGiven-1] = true;
    console.log("** Cab-"+cabGiven+" added back to the pool **");
    if(stack.length!=0){
      let currentOperation=stack.shift();
      let informationOfSlot={
        employee:Number(currentOperation.charAt(0)),
        shift:Number(currentOperation.charAt(2)),
        action:Number(currentOperation.charAt(4))
       };
       cabDuration(cabsTrack);
       cabsArray[cabsTrack-1] = false;
       cabsAvailablity--;
       console.log("Cab-"+(cabsTrack)+" allocated to Emp-"+informationOfSlot.employee+" for slot-" +informationOfSlot.shift+" (remaining cabs = "+cabsAvailablity+")");
       cabsTrack++;
       dayShiftArray[informationOfSlot.shift]++;
       if(cabsTrack>cabsArray.length){
        cabsTrack = 1;
    }
    }
  },6000);
}