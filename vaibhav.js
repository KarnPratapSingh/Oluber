// console.log(process.argv);
let arg = process.argv
var no_of_employees = Number(arg[2]);
var no_of_cabs = Number(arg[3]);
var operations = arg.slice(4)
let count = 0;
const employee_array = new Array(no_of_employees)
const cabs_array = new Array(no_of_cabs)
const shift_array = [0,0,0,0]
for(let x = 0 ; x<cabs_array.length;x++){
    cabs_array[x] = true
}
for(let x = 0 ; x<employee_array.length;x++){
    employee_array[x] = 0
}
var cabs_track = 1;
var cabs_availablity = no_of_cabs
var stack = []

while(operations.length>count){
    let my_opeartion = operations[count];
    let things_to_do = {
        employee:Number(my_opeartion.charAt(0)),
        shift:Number(my_opeartion.charAt(2)),
        action:Number(my_opeartion.charAt(4))
    }
    if(things_to_do.action == 1){
        if(cabs_availablity>0){
            if(employee_array[things_to_do.employee-1]<2){
                if(shift_array[things_to_do.shift]<no_of_cabs/2){
                    cabDuration(cabs_track);
                    cabs_array[cabs_track-1] = false
                    cabs_availablity--;
                    console.log("Cab-"+(cabs_track)+" allocated to Emp-"+things_to_do.employee+" for slot-" +things_to_do.shift+" (remaining cabs = "+cabs_availablity+")")
                    cabs_track++;
                    shift_array[things_to_do.shift]++
                    if(cabs_track>cabs_array.length){
                        cabs_track = 1
                    }
                    
                }else{
                    console.log("** Sorry cannot allocate for slot 1 at the moment. Please check different slot or try later **");
                }
            }else{
                console.log("** Sorry request denied. Please wait for 80 seconds and try again **")
                setTimeout(function(){
                    employee_array[things_to_do.employee-1] = 0
                },8000)
            }
        }
        else{
            console.log("** No cabs in the pool. Please wait... **")
            stack.push(my_opeartion)
        }
    }
    else{
        if(employee_array[things_to_do.employee-1]<2){
            cabs_availablity++;
            cabs_track--
            cabs_array[cabs_track-1] = true
            shift_array[things_to_do.shift]--
            employee_array[things_to_do.employee-1]++
            console.log("Booking for slot- "+ things_to_do.shift+" cancelled by Emp-"+things_to_do.employee+" (remaining cabs = "+cabs_availablity+")");
        }else{
            console.log("** Sorry request denied. Please wait for 80 seconds and try again **")
                setTimeout(function(){
                    employee_array[things_to_do.employee-1] = 0
                },8000)
        }
    }
    count++
    // let obj = {}
}

function cabDuration(ct){
    setTimeout(function(){
        cabs_availablity++;
        cabs_array[ct-1] = true
        console.log("** Cab-"+ct+" added back to the pool **")
        if(stack.length!=0){
            let my_opeartion = stack.shift()
            let things_to_do = {
                employee:Number(my_opeartion.charAt(0)),
                shift:Number(my_opeartion.charAt(2)),
                action:Number(my_opeartion.charAt(4))
            }
            cabDuration(cabs_track);
            cabs_array[cabs_track-1] = false
            cabs_availablity--;
            console.log("Cab-"+(cabs_track)+" allocated to Emp-"+things_to_do.employee+" for slot-" +things_to_do.shift+" (remaining cabs = "+cabs_availablity+")")
            cabs_track++;
            shift_array[things_to_do.shift]++
            if(cabs_track>cabs_array.length){
                cabs_track = 1
            }
        }
    },6000)

}