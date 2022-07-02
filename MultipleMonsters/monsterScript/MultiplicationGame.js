var arrGridNo = [];
var multiGameLeft = 50;
var multiplicationScore = 0;
var arrPreviouslySelected = [];
var randomise = null;
var TimesMode;
var wrongCounter;
var correctCounter;
var timerCounter = null;
var penalise = null;
var isDirtyTime = null;
var wooYayIntervalId = 0;
var endGameMode = null;

var endGame = {
    foundAll: 1,
    outOfTime: 2,
    giveUp: 3
};



$(document).ready(function () {
    
    // defaulted - initialise ...
        if (randomise == null) {
            randomise = true;
            document.getElementById("chkRandomise").checked = true;
        }
        
       if (timerCounter == null) {
            timerCounter = false;
            document.getElementById("chkTimer").checked = false;
           $("#multipicationTimer").hide();
           $("#minuteBox").hide();
          
           // Hid give up button until countdown ...
           document.querySelector("#btnGiveUp").style.display = "none";
        }
    
        if (penalise == null) {
            penalise = true;
            document.getElementById("chkPenalise").checked = true;
        }
    
        endGameMode = null;
    
        // Times table mode - defaulted to 2 times table game ...
        TimesMode = 2;
    
        randomArray();
        //tableCreate();
        createMultiplicationTable();
    
        //default game mode 2 multiplication ...
        // Change colour of circle depending on times table...
        $("#gameMode").append('<div class="row text-center">'+
                                '<span class="ml-5">Find numbers in the</span>' +
                                '<span class="ml-3 mr-3"><p class="no-circle rounded-circle">' + TimesMode + '</p></span> ' +
                                '<span class="">multiplication table</span>');
    
        //Initialise scores
        $("#left").text("50");
        $("#score").text("0%");
        wrongCounter = 0,  correctCounter = 0;
    
        //End Game initialisation ...
        //$('#txtFoundAll').hide();
        //$('#txtOutOfTime').hide();
        //$('#txtGiveUp').hide();
        $('#txtEndFeedback').text('');
        $('#txtWellDone').text('');
    
        $('#tblTimetable_Demo').hide()
    //TEST ............. DEFAULT!!!
        //cellBorderColour = 'crimson';
        //cellColour = 'rgba(254, 143, 166, 1)';
        createTimetableDemo(2, 50, 'rgba(254, 143, 166, 1)', 'crimson');
    
    
        $('#gameModesModal').on('show.bs.modal', function (event) {
    
            var button = $(event.relatedTarget) // Button that triggered the modal
            var recipient = button.data('whatever') // Extract info from data-* attributes
            var modal = $(this)
    
            if (recipient == 'help') {
                helpPeak();
            } else
                if (recipient == 'give up') {
    
                        if (confirm('Are you sure you want to give up?')) {
                            giveUp();
                        } else {
                            event.preventDefault();
                        }
    
                } else { 
    
    
            }
    
               
           
    
        })
    
    });

    
const createTimetableDemo = (multiplicationNo, rowAmount, cellColour, cellBorderColour) => {

    var tbl_demo = document.createElement('table');
    tbl_demo.style.width = '100%';
    
  

       // default 2 times table ...
    for (var i = 0; i < rowAmount; i++) {

        // Has a staring point of 0 ...
        var sumTotal = 0;
        var demo_pos = document.getElementById("tblTimetable_Demo");
  
        $(demo_pos).addClass("table table-bordered text-center display-6");//("allTimesTable");
 
        var rowNo = i + 1;
       var tr = tbl_demo.insertRow();
        
            for (var j = 0; j < 5; j++) {
                var td = tr.insertCell();
               
         
                if (j == 0){
                td.appendChild(document.createTextNode(rowNo));

                }else 
                    if (j == 1){
                    td.appendChild(document.createTextNode("X"));

                }else
                    if (j == 2){
                    td.appendChild(document.createTextNode(multiplicationNo));

                 }else
                    if (j == 3){
                    td.appendChild(document.createTextNode("="));

                 }else
                        if (j == 4) {
                    sumTotal = rowNo * multiplicationNo;
                        td.appendChild(document.createTextNode(sumTotal));

                            //Custom Style forsum total ...
                            td.style.backgroundColor = cellColour; 
                            td.style.border = '3px solid';
                            td.style.borderColor = cellBorderColour;

                }else{
                td.appendChild(document.createTextNode(' '));
              
                }  
               // td.style.border = '1px solid black';   
                //$(td).addClass('allTimesTable_td');
            }
       }
    demo_pos.appendChild(tbl_demo);
}

const createMultiplicationTable = () => {

    var pos = document.querySelector("#divGame");
        tbl = document.createElement('table');

    $(tbl).addClass('table table-bordered text-center display-4');

    var counter = 0;

    for (var i = 0; i < 10; i++) {
        var tr = tbl.insertRow();

        /*
         * Colour palette Test ...
        if (i === 0) {
            $(tr).addClass("td_Kids_RedDk");
        } else if (i === 1) {
            $(tr).addClass("td_Kids_Red");
        } else if (i === 2) {
            $(tr).addClass("td_Kids_Orange");
        } else if (i === 3) {
            $(tr).addClass("td_Kids_Yellow");
        } else if (i === 4) {
            $(tr).addClass("td_Kids_Img");
        } else if (i === 5) {
            $(tr).addClass("td_Kids_Grad");
        } else {
            $(tr).addClass("td_Kids_Default");
        }
        */

        for (var j = 0; j < 10; j++) {

            var td = tr.insertCell();

            td.appendChild(document.createTextNode(arrGridNo[counter]));
            counter++;  
 
            //$(td).addClass('td_gridlines');

            //if (j === 0) {
            //    $(td).addClass("td_Kids_RedDk");
            //} else if (j === 1) {
            //    $(td).addClass("td_Kids_Red");
            //} else if (j === 2) {
            //    $(td).addClass("td_Kids_Orange");
            //} else if (j === 3) {
            //    $(td).addClass("td_Kids_Yellow");
            //} else if (j === 4) {
            //    $(td).addClass("td_Kids_Img");
            //} else if (j === 5) {
            //    $(td).addClass("td_Kids_Grad");
            //} else {
            //    $(td).addClass("td_Kids_Default");
            //}
        }
    }
    pos.appendChild(tbl);

    // Clicking table ....
    $("table td").click(function () {
        //$(this).addClass('selected').siblings().removeClass('selected');
        //var value = $(this).find('table tr.selected td:first').html();

        if (tbl != null) {
            for (var i = 0; i < tbl.rows.length; i++) {
                for (var j = 0; j < tbl.rows[i].cells.length; j++)
                    //tbl.rows[i].cells[j].onclick = function () { getval(this); };

                    getval(this);
                //alert(this.innerHTML);
            }
        }  
    });
}

const getval = (cel) => {
    // alert(cel.innerHTML);
     var selectedNumber = cel.innerHTML;
     $(cel).removeClass("td_Kids_Img");
     $(cel).removeClass("td_Kids_Grad");
     
     // Has number been previously selected...?
     if (PreviouslySelected(selectedNumber) == false) {
 
         switch (TimesMode) {
 
             case  2:
                 if (twoMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case  3:
                 if (threeMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case  4:
                 if (fourMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case  5:
                 if (fiveMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case 6:
                 if (sixMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case 7:
                 if (sevenMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case 8:
                 if (eightMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case 9:
                 if (nineMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case 10:
                 if (tenMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case 11:
                 if (elevenMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             case 12:
                 if (tweleveMultiplication(selectedNumber) == true) {
                     CorrectSelection(cel, selectedNumber);
                 } else {
                     WrongSelection(cel, selectedNumber);
                 }
                 break;
 
             default:
                 alert("Error getting selection!!");
 
         }
 
 
         //// 2 Multiplication Table ...
         //if (twoMultiplication(selectedNumber) == true) {
             
         //    //alert("Correct");
         //    $(cel).addClass("td-right");
         //    multiplicationScore += 2;
         //    multiGameLeft -= 1;
 
         //    $("#txtFeedback").text("Correct " + selectedNumber + " is in the " + TimesMode + " times table"); 
         //    //$(cel).removeClass('table td:hover');
 
         //} else {
 
         //    //alert("Wrong");
         //    $(cel).addClass("td-wrong");
         //    multiplicationScore -= 1;
 
         //    $("#txtFeedback").text("Wrong " + selectedNumber + " is not the " + TimesMode + " times table"); 
         //}
     }
 
     // Output score ...
     $("#left").text(multiGameLeft);
     $("#score").text(multiplicationScore + "%");
 
 //Check if game is over ...?
     if (multiGameLeft == 0) {
         //Stop the clock ...
         clearInterval(wooYayIntervalId);
         isDirtyTime = false;
 
         gameCompleted(endGame.foundAll);
         }
}

const WrongSelection = (cel, selectedNumber) => {  

    if (endGameMode == endGame.giveUp) {
        return false;
    }

            $(cel).addClass("td-wrongValueSelected");
            multiplicationScore -= 1;
            //multiplicationScore -=TimesMode;
            wrongCounter += 1;
            $("#txtFeedback").text("Oops! Number " + selectedNumber + " is not the " + TimesMode + " times table"); 
}

const CorrectSelection = (cel, selectedNumber) => {

            if (endGameMode == endGame.giveUp) {
                return false;
    }

            $(cel).addClass("td-rightValueSelected");
            //multiplicationScore += 2;
            multiplicationScore += TimesMode;
            multiGameLeft -= 1;
            correctCounter += 1;

            $("#txtFeedback").text("Correct " + selectedNumber + " is in the " + TimesMode + " times table"); 
}


function PreviouslySelected(celVal) {

    // First value ..
    if (arrPreviouslySelected.length == 0) {
        arrPreviouslySelected.push(celVal)
        return false
    }

    //return arrPreviouslySelected.find(celVal)
    for (var x = 0; x < arrPreviouslySelected.length; x++) {
        if (arrPreviouslySelected[x] == celVal) {
            return true
        }
    }
        arrPreviouslySelected.push(celVal);
    return false;
}


function twoMultiplication(val){
    if (val % 2 == 0) {
        return true;
    } else {
        return false;
    }
}


function threeMultiplication(val) {
    if (val % 3 == 0) {
        return true;
    } else {
        return false;
    }
}


function fourMultiplication(val) {
    if (val % 4 == 0) {
        return true;
    } else {
        return false;
    }
}


function fiveMultiplication(val) {
    if (val % 5 == 0) {
        return true;
    } else {
        return false;
    }
}


function sixMultiplication(val) {
    if (val % 6 == 0) {
        return true;
    } else {
        return false;
    }
}


function sevenMultiplication(val) {
    if (val % 7 == 0) {
        return true;
    } else {
        return false;
    }
}


function eightMultiplication(val) {
    if (val % 8 == 0) {
        return true;
    } else {
        return false;
    }
}


function nineMultiplication(val) {
    if (val % 9 == 0) {
        return true;
    } else {
        return false;
    }
}


function tenMultiplication(val) {
    if (val % 10 == 0) {
        return true;
    } else {
        return false;
    }
}


function elevenMultiplication(val) {
    if (val % 11 == 0) {
        return true;
    } else {
        return false;
    }
}


function tweleveMultiplication(val) {
    if (val % 12 == 0) {
        return true;
    } else {
        return false;
    }
}


function gameCompleted(EndType) {
    clearInterval(wooYayIntervalId);
    isDirtyTime = false;

   
    if (EndType == endGame.foundAll) {
        EndGame(endGame.foundAll);
        $('#gameModesModal').modal('show');
        $('#btnCloseSneakPeak').hide();
        //document.getElementById('btnCloseSneakPeak').disabled = true;

    } else {

        EndGame(endGame.outOfTime);


        $('#gameModesModal').modal('show');
        $('#btnCloseSneakPeak').hide();
        //document.getElementById('btnCloseSneakPeak').disabled = true;
    }

    document.querySelector("#btnGiveUp").style.disabled = "none"; 
    // setCountdownTimer();
    
         // alert("you got right " +  correctCounter); you found them all!! - If given up show how many user got right ...
        // alert("you got wrong " + wrongCounter);
       // restartGame();
}


function ShowMe() {

    if (timerCounter == true) {
        ClearTimer();
    }

    var showNumber;
    var table = document.getElementById("divGame");

    for (var x = 0; x < 10; x++) {

        for (var y = 0; y < 10; y++) {
            showNumber = table.firstChild.firstChild.children[x].cells[y].innerText;

            var multiplicationFit = false;

            switch (TimesMode) {

                case 2:
                    if (twoMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 3:
                    if (threeMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 4:
                    if (fourMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 5:
                    if (fiveMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 6:
                    if (sixMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 7:
                    if (sevenMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 8:
                    if (eightMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 9:
                    if (nineMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 10:
                    if (tenMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 11:
                    if (elevenMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                case 12:
                    if (tweleveMultiplication(showNumber) == true) {
                        multiplicationFit = true;
                    }
                    break;

                default:

            }

            if (multiplicationFit == true && selectedCell(showNumber) == true) {
                table.firstChild.firstChild.children[x].cells[y].style.backgroundColor = 'yellow';
            } else
                if (selectedCell(showNumber) == true) {
                   table.firstChild.firstChild.children[x].cells[y].style.backgroundColor = 'white';
                } else {
                    //Do nothing ...
           }
    }
}
    endGameMode = endGame.giveUp;
}


function selectedCell(newNumber) {
    var looper;
    for (var z = 0; z < arrPreviouslySelected.length; z++) {

        if (arrPreviouslySelected[z] == newNumber) {
            return false;
            break;
        }
    }
    return true;
} 


function setCountdownTimer(){

        var selMinuteCounter = $("#txtTimerCounter").val();

        //Reset possible previous timer ...
        ClearTimer();

        if (timerCounter == true){
                $("#multipicationTimer").show();
            if (!(selMinuteCounter == null)){
             
                var minutes = 60 * selMinuteCounter, display = $('#txtTimer');
                createCountdown(minutes, display);
                $('#txtTimer').text(selMinuteCounter);
            

            }else{
             $("#multipicationTimer").hide();
            }
 // document.getElementById("chkTimer").checked = true;
} else {

$("#multipicationTimer").hide();
}
}


function ClearTimer(){

if (isDirtyTime == true){

clearInterval ( wooYayIntervalId );
isDirtyTime = false;

  }
}


function createCountdown(duration, display) {
    var timer = duration, minutes, seconds;
    
    wooYayIntervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;

            //End of timed game ...
            gameCompleted(endGame.outOfTime);
        }
    }, 1000);

    isDirtyTime = true;
  }


function randomArray() {
    var arrNumbers = [];

    //Generate numbers in array ...
       for (var x = 1; x < 101; x++) {
           arrNumbers.push(x);
    }

    if (arrGridNo.length = 100) {

        // Randomised ...?
        if (randomise == true) {
            arrGridNo = shuffle(arrNumbers)

        } else {

            // Non - Randomisation ...
            arrGridNo = arrNumbers;
        }

    } else {
        //error something has gine wrong error ....
        alert("Error getting numbers :( ")
    }
}


function shuffle(array) {
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
       t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}


function restartGame()
{
    // Restart game after setting change ...
    document.getElementById("divGame").innerHTML = "";
    document.getElementById("tblTimetable_Demo").innerHTML = "";

    randomArray();

    if (timerCounter == true) {
        //document.getElementById('btnGiveUp').disabled = false;
        document.querySelector("#btnGiveUp").style.display = "block";
    }

    setCountdownTimer();
    createMultiplicationTable();

    endGameMode = null;

   //Multiplication Times Table Mode ... 
    TimesMode = parseInt($('#ddlMultiplicationNo').val());

    $("#gameMode").empty();

    $("#gameMode").append('<div class="row text-center">'+
    '<span class="ml-5">Find numbers in the</span>' +
    '<span class="ml-3 mr-3"><p class="no-circle rounded-circle">' + TimesMode + '</p></span> ' +
    '<span class="">multiplication table</span>');

    var cellColour = 'black';
    var cellBorderColour = 'black';

     //restart scores ...
    switch (TimesMode) {
        case 2:
            $("#left").text("50");
            multiGameLeft = 50;
            cellColour = 'rgba(254, 143, 166, 1)';
            cellBorderColour = 'crimson';
            break;
        case 3:
            $("#left").text("33");
            multiGameLeft = 33;
            cellColour = 'rgba(255, 206, 138, 1)';
            cellBorderColour = 'rgba(255, 172, 56, 1)';
            break;
        case 4:
            $("#left").text("25");
            multiGameLeft = 25;
            cellColour = 'rgb(255, 255, 153)';
            cellBorderColour = 'rgb(255, 255, 26)';
            break;
        case 5:
            $("#left").text("20");
            multiGameLeft = 20;
            cellColour = '#98e698';
            cellBorderColour = '#2eb82e';
            break;
        case 6:
            $("#left").text("16");
            multiGameLeft = 16;
            cellColour = '#ccff66';
            cellBorderColour = '#669900';
            break;
        case 7:
            $("#left").text("14");
            multiGameLeft = 14;
            cellColour = '#007a99';
            cellBorderColour = '#003d4d';
            break;
        case 8:
            $("#left").text("12");
            multiGameLeft = 12;
            cellColour = '#b3f0ff';
            cellBorderColour = '#4ddbff';
            break;
        case 9:
            $("#left").text("11");
            multiGameLeft = 11;
            cellColour = '#bf00ff';
            cellBorderColour = '#600080';
            break;
        case 10:
            $("#left").text("10");
            multiGameLeft = 10;
            cellColour = '#ff80b3';
            cellBorderColour = '#ff1a75';
            break;
        case 11:
            $("#left").text("9");
            multiGameLeft = 9;
            cellColour = '#6666ff';
            cellBorderColour = '#0000b3';
            break;
        case 12:
            $("#left").text("8");
            multiGameLeft = 8;
            cellColour = '#d9d9d9';
            cellBorderColour = '#808080';
            break;
        default:
            alert("Error setting scoring");
            $("#left").text("0");
            multiGameLeft = 0;
    }

    createTimetableDemo(TimesMode, multiGameLeft, cellColour, cellBorderColour)

    wrongCounter = 0 ,  correctCounter = 0;
    multiplicationScore = 0;
    $("#score").text("0%");

    $("#txtFeedback").text(" ");

   // Empty previously selected ...
    arrPreviouslySelected = [];

   // window.scrollTo(0,500);
}


function changeSettingsValid() {
    //var errValidation = "";
    var txtMin = $("#txtTimerCounter").val();

    $("#txtTimerCounter").removeClass("red_Glow");
    $("#txtTimerCounter").addClass('form-control');
    $("#txtErrMessage").text('');
    $("#txtErrMessage_Minutes").text('');


    if ($('#chkTimer').prop('checked') == true) {

        if (txtMin == '') {
            $("#txtErrMessage_Minutes").text("Please add a countdown time in minutes.");
            //errValidation = "Please add a countdown time in minutes."
            return false;
        }

        if (isNaN(txtMin)) {
            $("#txtErrMessage_Minutes").text("Minutes can only be add using numbers, please try again.");
            return false;
        }
    }
}


function cancelModal() {

    timerCounter = $('#chkTimer').prop('checked') == true ? true : false;
    randomise = $('#chkRandomise').prop('checked') == true ? true : false;
    penalise = $('#chkPenalise').prop('checked') == true ? true : false;

    if (timerCounter == false) {
        $("#minuteBox").text('');
        $("#minuteBox").toggle();
    }
}


function changeSettings(){

    var multiplicationNumber;

    if (changeSettingsValid() == false) {
        $("#txtTimerCounter").removeClass("form-control");
        $("#txtTimerCounter").addClass('red_Glow');
        return false;
    }

    //randomise = randomiseGame();
    timerCounter = $('#chkTimer').prop('checked') == true ? true : false;
    randomise = $('#chkRandomise').prop('checked') == true ? true : false;
    penalise = $('#chkPenalise').prop('checked') == true ? true : false;

    addGiveUpButtons();

    //Penalised score setting ...?
    if (penalise == false) {
       $('#multipicationScore').text('No Score');
       $("#score").hide();
    } else {

       $('#multipicationScore').text('Score');
     $("#score").show();
    }

    restartGame();

    alert("change settings");
    blackOutAnimation();

    $('#settingsModal').modal('hide');
}


function chkTimer_Tog() {
    $("#minuteBox").toggle();
}


function multiplicationSneakPeek() {
    $('#tblTimetable_Demo').toggle();
}


/**
function randomiseGame() {
if ($('#chkRandomise').prop('checked') == true) {
return true;
} else {
return false;
  }
}
*/

function addGiveUpButtons() {

    // Give up button only available in countdown mode....
    if ($('#chkTimer').prop('checked') == true) {
        document.querySelector("#btnGiveUp").style.display = "block";
        document.querySelector("#btnShowMe").style.display = "none";
        document.querySelector("#btnHelp").style.display = "none";
    } else {
        document.querySelector("#btnGiveUp").style.display = "none";
        document.querySelector("#btnShowMe").style.display = "block";
        document.querySelector("#btnHelp").style.display = "block";
    }
}


function giveUp() {

    // Stop the clock, user has given up ...
    if (timerCounter == true) {
        ClearTimer();
    }

    EndGame(endGame.giveUp);

    //$('#btnPeek').show();

    $('#btnCloseSneakPeak').hide(); 
    $('#btnCloseGiveUp').show();
    $('#btnMultiClose').hide();

    document.querySelector("#btnGiveUp").style.display = "none";
    document.querySelector("#btnPeek").style.display = "block";
}


function closeGiveUp() {
    ShowMe();
}


function helpPeak() {

    //if (timerCounter == true) {
    //    if (confirm(''))
    //        penaliseTimer();
    //}
    
        $('#gameModesModalLabel').text('Sneak Peak!!');
        $('#txtGameModeHeader').text('Try to memerise the timetable pattern and give it another go. ;)');
        
        $('#txtWellDone').text('');

        $('#tblTimetable_Demo').show();
        $('#finalScore').hide();

        $('#btnCloseSneakPeak').show();
        $('#btnCloseGiveUp').hide();
        $('#btnMultiClose').show();

         document.querySelector("#btnPeek").style.display = "none";
        


    //document.getElementById('btnPeek').disabled = true;
    //document.getElementById('btnCloseSneakPeak').disabled = false;
    //document.getElementById('btnCloseGiveUp').disabled = true;
}


function penaliseTimer() {
    $('#txtTimer').text(selMinuteCounter + 20);
}


function blackOutAnimation() {

    $("#divGame").removeClass("divGameStyle_blackOut");
    $("#divGame").addClass("secondColor");

    //$("#divGame").removeClass("td_gridlines_blackOut");
    //$("#divGame").addClass("td_gridlines");

   //setInterval(function () {
    //    $('#divGame').animate({ backgroundColor: 'red' }, 300)
    //        .animate({ backgroundColor: 'green' }, 300);
    //}, 1000);
}


function EndGame(endType) {

    $('#finalScore').show();

   

    switch (endType) {
        case endGame.foundAll:
            // Found all multiplication Numbers ...
            $('#gameModesModalLabel').text('Game Completed!!');
            $('#txtGameModeHeader').text('Well Done :)');
            $('#txtEndFeedback').text('Yay!! You have found all the missing numbers.');
            $('#intFinalScore').text(multiplicationScore);
            //$('#txtFoundAll').show();
            $('#btnMultiClose').hide();
            break;

        case endGame.outOfTime:
            //Ran out of time ...
            $('#gameModesModalLabel').text('Time Out!');
            $('#txtGameModeHeader').text('The timer ran out beforfe you could find them all');
            $('#txtEndFeedback').text('Awww, you are out of time but dont worry you can give it another go!');
            $('#intFinalScore').text(multiplicationScore);
           // $('#txtOutOfTime').show();
            $('#btnMultiClose').hide(); 
            break;

        case endGame.giveUp:
            //Given up ...
            $('#gameModesModalLabel').text('Incomplete Game!');
            $('#txtGameModeHeader').text('Give it another Try?');
            $('#txtEndFeedback').text("Awww, You gave up!! \nIf your stuck you can study the times table then try again.");
            $('#intFinalScore').text(multiplicationScore);
            // $('#txtGiveUp').show();
            $('#btnMultiClose').hide();
            break;

        default:
            alert("Ending Game has an error!")
            break;
    }

    ShowMe();
    
    if (penalise == false) {
        $('#intFinalScore').text('--');
    }
    
}
