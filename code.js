//Declare global variables

var stopButton = false;
var pauseButton = false;
var brk = document.getElementById('breakTime');
var pom = document.getElementById('sessionTime');
var pom_time = 25;
var brk_time = 5;
var clock = document.getElementById('testClock');
var x = 2;
var y = 2;
var aux_pom_time = pom_time * 60 * 1000;
var aux_brk_time = brk_time * 60 * 1000;


//Get input from user
// up and down timers
const downPom = document.getElementById('decreasePom');
const upPom = document.getElementById('increasePom');
const downBrk = document.getElementById('decreaseBreak');
const upBrk = document.getElementById('increaseBreak');
//pase refresech stop pause
const start = document.getElementById('start')
const refresh = document.getElementById('refresh')
const pause = document.getElementById('pause')
const stop = document.getElementById('stop')


//Add button functionality
downBrk.addEventListener('click', decrBreak);
downPom.addEventListener('click', decrePom);
upBrk.addEventListener('click', incrBreak);
upPom.addEventListener('click', incrPom);
start.addEventListener('click', startfnct);
refresh.addEventListener('click', refreshfnct);
pause.addEventListener('click', pausefnct);
stop.addEventListener('click', stopfnct);


//function declaration
function decrBreak (){
    if (brk_time > 0){
        brk_time = brk_time - 1;
        brk.textContent = brk_time;
    }
}

function decrePom (){
    if (pom_time > 0){
        pom_time = pom_time - 1;
        pom.textContent = pom_time;
        pom_time < 10? clock.textContent = '0' + pom_time + ':00' : clock.textContent = pom_time + ':00';
    }
}

function incrBreak (){
    brk_time = brk_time + 1;
    brk.textContent = brk_time;
}

function incrPom (){
    pom_time = pom_time + 1;
    pom.textContent = pom_time;
    pom_time < 10? clock.textContent = '0' + pom_time + ':00' : clock.textContent = pom_time + ':00';
}

function startfnct (){
    stopButton = false;
    pauseButton = false;
    clearInterval(x);
    clearInterval(y);
    var end_time = new Date().getTime() + (aux_pom_time);

    x = setInterval(function () {
        // validate if a stop or pause button had not been pushed
        if (pauseButton == false){
            if (stopButton == true) {return;}
            //get current time
            
            var time_now = new Date().getTime()

            //set the distance in the correct format
            var distance = end_time - time_now;
            

            //do the calculations
            var minutes = Math.floor((distance%(1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            aux_pom_time = distance;

            //display the result
            if (minutes > 10){
                if (seconds > 10){
                    clock.textContent = minutes + ':' + seconds;
                } else {
                    clock.textContent = minutes + ':0' + seconds 
                }
            } else {
                if (seconds > 10){
                    clock.textContent = '0' + minutes + ':' + seconds;
                } else {
                    clock.textContent = '0' + minutes + ':0' + seconds 
                }
            }
            
            console.log(x)

            //if count reaches 0

            if (distance < 0){
                clearInterval(x);
                end_time = new Date().getTime() + (aux_brk_time);;
                y = setInterval(function () {
                    if (stopButton == true) {return;}
                    if (pauseButton == false){
                        if (stopButton == true) {return;}
                        time_now = new Date().getTime();

                        //set the distance in the correct format
                        distance = end_time - time_now;
                
                        //do the calculations
                        minutes = Math.floor((distance%(1000 * 60 * 60)) / (1000 * 60));
                        seconds = Math.floor((distance % (1000 * 60)) / 1000);
                        aux_brk_time = distance;
                
                        //display the result
                        if (minutes > 10){
                            if (seconds > 10){
                                clock.textContent = minutes + ':' + seconds;
                            } else {
                                clock.textContent = minutes + ':0' + seconds 
                            }
                        } else {
                            if (seconds > 10){
                                clock.textContent = '0' + minutes + ':' + seconds;
                            } else {
                                clock.textContent = '0' + minutes + ':0' + seconds 
                            }
                        }
                        if (distance < 0){
                            clearInterval(y)
                        }
                    } else {return};
                },1000)
            }
        } else {return};
    },1000)

}

function refreshfnct (){
    stopButton = true;
    var pauseButtonPressed = false;
    pom_time = 25;
    brk_time = 5;
    pom_time < 10? clock.textContent = '0' + pom_time + ':00' : clock.textContent = pom_time + ':00';
    clearInterval(x)
    clearInterval(y)
}

function pausefnct (){
    pauseButton = true;
}

function stopfnct (){
    stopButton = true;
    pom_time < 10? clock.textContent = '0' + pom_time + ':00' : clock.textContent = pom_time + ':00';
    clearInterval(x)
    clearInterval(y)
}