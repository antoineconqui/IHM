// INITIALISATION

const planeInterval = 5000;
const calculInterval = 2000;
var avions = 0;
var avionsTotal = 0;
var calculs = 0;
var calculsTotal = 0;
var observationLaunched = false;
var alarmeOn = false;
var sizes = [20,18,16,14,12,10,8,6];
var alarmeT0;
var alarmeTimes = [];
var mental;
var launchPlaneInterval;
var checkNewPlaneInterval;
var timeInterval;

function InitInterface(){
    // $("#timer").hide();
    $("#nbAvions").hide();
    $("#nbCalculs").hide();
    LaunchGames();
}

function LaunchGames(){
    NewMental();
    NewPlane();

    setTimeout(function(){
        LaunchPlane();
    }, 100);

    setTimeout(function(){
        launchPlaneInterval = setInterval(function(){
            CheckPlane();
            NewPlane();
        },planeInterval);
    }, 200);
    
    setTimeout(function(){
        checkNewPlaneInterval = setInterval(function(){
            LaunchPlane();
        },planeInterval);
    }, 300);
}

function LaunchObservation(){
    clearInterval(launchPlaneInterval);
    clearInterval(checkNewPlaneInterval);
    calculs = 0;
    calculsTotal = 0;
    avions = 0;
    avionsTotal = 0;
    $("#nbAvions").html('Avions : ~%');
    $("#nbAvions").show();
    $("#nbCalculs").html(' - Calculs : ~%');
    $("#nbCalculs").show();
    timeInterval = setInterval(function(){
        if(observationLaunched && alarmeTimes.length==8){
            EndObservation();
        }
    },1000);
    SetAlarmes();
    LaunchGames();
    observationLaunched = true;
}

function EndObservation(){
    observationLaunched = false;
    $.ajax({
        url : 'save_results.php',
        type : 'POST',
        data : 'prenom=' + prenom + '&nom=' + nom + '&avions=' + avions + '&avionsTotal=' + avionsTotal + '&calculs=' + calculs + '&calculsTotal=' + calculsTotal + '&time1=' + alarmeTimes[0] + '&time2=' + alarmeTimes[1] + '&time3=' + alarmeTimes[2] + '&time4=' + alarmeTimes[3] + '&time5=' + alarmeTimes[4] + '&time6=' + alarmeTimes[5] + '&time7=' + alarmeTimes[6] + '&time8=' + alarmeTimes[7],
        success : function(){
            window.location = './results.php';
        }
    });
}

$('body').keydown(function(e){
    if(e.keyCode == 70){ // F
        ValidateMental(false);
    }

    if(e.keyCode == 86){ // V
        ValidateMental(true);
    }

    if(e.keyCode == 38){ // UP
        MovePiste(-10);
    }

    if(e.keyCode == 40){ // DOWN
        MovePiste(10);
    }

    if(e.keyCode == 32){ // SPACE
        if(!observationLaunched){
            LaunchObservation();
        }
        else{
            if(alarmeOn){
                StopAlarme();
            }
        }
    }
});

// ALARME

function SetAlarmes(){
    var t = 0;
    for (let i = 0; i < 8; i++) {
        t += Math.floor(Math.random()*20+5)*1000;
        setTimeout(function(){
            NewAlarme(i);
        }, t);
    }
}

function NewAlarme(i){
    alarmeOn = true;
    alarmeT0 = Date.now();
    $(".alarme").html("ALARME");
    $(".alarme").css("font-size" , sizes[i]);
}

function StopAlarme(){
    alarmeOn = false;
    alarmeTimes.push((Date.now() - alarmeT0));
    $(".alarme").html("");
}

// AVION

function NewPlane(){
    t = Math.floor((Math.random()*90)+5);
    $("#avion").css("top", t+"%");
    $("#avion").removeClass("avionEnd").addClass("avion");
}

function CheckPlane(){
    avion = parseInt($("#avion").css("top"));
    piste = parseInt($("#piste").css("top"));
    if(avion>piste-20 && avion<piste+20){
        avions++;
        ValidatePlane(true);
    }
    else{
        ValidatePlane(false);
    }
    avionsTotal++;
    $("#nbAvions").html('Avions : '+Math.floor(avions/avionsTotal*100)+' %');
}

function LaunchPlane(){
    $("#avion").removeClass("avion").addClass("avionEnd");
}

function MovePiste(n){
    var top = parseInt($("#piste").css("top"));
    if((top+n)>$("#piste").parent().height()*0.05 && (top+n)<$("#piste").parent().height()*0.95)
        $("#piste").css("top", (top+n)+"px");
}

function ValidatePlane(answer){
    $("#caseAvion").css("background-color",(answer) ? "green" : "red");
    setTimeout(function(){
        $("#caseAvion").css("background-color","");
    }, 500);
}

// MENTAL

var operators = [
    {
        sign: " + ",
        method: function(a,b){ return a + b; }
    },{
        sign: " - ",
        method: function(a,b){ return a - b; }
    },{
        sign: " x ",
        method: function(a,b){ return a * b; }
    }
];

function NewMental(){
        a = Math.floor((Math.random()*10));
        b = Math.floor((Math.random()*10));
        selectedOperator = Math.floor(Math.random()*operators.length);
        $("#calcul").html(a+operators[selectedOperator].sign+b+' = ');
        if(Math.random() >= 0.5){
            $("#suggestion").html(operators[selectedOperator].method(a, b));
        }
        else{
            $("#suggestion").html(operators[selectedOperator].method(Math.floor((Math.random()*10)), Math.floor((Math.random()*10))));
        }
        mental = $("#suggestion").html() == operators[selectedOperator].method(a, b);
}

$("#mentalFalse").click(function(){
    ValidateMental(false);
});

$("#mentalTrue").click(function(){
    ValidateMental(true);
});

function ValidateMental(mentalAnswer){
    $("#caseMental").css("background-color",(mental==mentalAnswer) ? "green" : "red");
    setTimeout(function(){
        $("#caseMental").css("background-color","");
    }, 500);
    if(mental==mentalAnswer){
        calculs ++;
    }
    calculsTotal++;
    $("#nbCalculs").html(' - Calculs : '+Math.floor(calculs/calculsTotal*100)+' %');

    NewMental();
}

// MAIN

InitInterface();