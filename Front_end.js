var nameRed = prompt("Player One: Enter Your Name , you will be Red");
var nameBlue = prompt("Player One: Enter Your Name , you will be Blue");
var announRed = nameRed+': it is your turn, please pick a column to drop your red chip.';
var announBlue = nameBlue+': it is your turn, please pick a column to drop your blue chip.';
$('h3').text(announRed);

var upperButtons = $('td').slice(0,6);
var ano = upperButtons.eq(3);
var entered = [5,5,5,5,5,5];
var choosen;
var turnColor='red';
var match;
var nameWinner;

function lookfor4(chips){
    var color = chips[0];
    var cont = 0;
    var win = false;
    for(var i = 1; i < chips.length; i++){
        if ((color == chips[i])&&(color != 2)){
            cont ++;
            if (cont == 3){
                win = true;
                break;
            }
        }
        else{
            color = chips[i];
            cont = 0;
        }
    }
    if (win == true){
        if (color == 0){
            nameWinner = nameBlue;
        }
        else if(color == 1)
            nameWinner = nameRed;
        
        $('h2').remove();
        $('h3').remove();
        $('h1').text(nameWinner+' has won! Refresh your browser to play again!');
        $('h1').css('padding-top','20px');
    }
}
function vertWin(){
    var color;
    var row = [];
    for(var i = 0; i < 6; i++){
        for(var j = 0; j < 6; j++){
            color = $('table tr:eq('+String(j)+') td:eq('+String(i)+')').children().css('background-color');
            if (color == 'rgb(255, 0, 0)'){
                row.push(1);
            }
            else if(color == 'rgb(0, 0, 255)'){ 
                row.push(0);
            }
            else{
                row.push(2);
            }
        }
        match=lookfor4(row);
        row=[];
    }
}

function horizWin(){
    var color;
    var row = [];
    for(var i = 0; i < 6; i++){
        for(var j = 0; j < 6; j++){
            color = $('table tr:eq('+String(i)+') td:eq('+String(j)+')').children().css('background-color');
            if (color == 'rgb(255, 0, 0)'){
                row.push(1);
            }
            else if(color == 'rgb(0, 0, 255)'){ 
                row.push(0);
            }
            else{
                row.push(2);
            }
        }
        match=lookfor4(row);
        row=[];
    }
}

function diagUp(){
    var color;
    var row = [];
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 6; j++){
            if ((3+i-j >= 0)&&(3+i-j < 6)){
                color = $('table tr:eq('+String(3+i-j)+') td:eq('+String(j)+')').children().css('background-color');
                if (color == 'rgb(255, 0, 0)'){
                    row.push(1);
                }
                else if(color == 'rgb(0, 0, 255)'){ 
                    row.push(0);
                }
                else{
                    row.push(2);
                }
            }
        }
        match=lookfor4(row);
        row=[];
    }
}

function diagDown(){
    var color;
    var row = [];
    for(var i = 0; i < 5; i++){
        for(var j = 0; j < 6; j++){
            if ((2-i+j >= 0)&&(2-i+j < 6)&&(j< 6)){
                color = $('table tr:eq('+String(2-i+j)+') td:eq('+String(j)+')').children().css('background-color');
                if (color == 'rgb(255, 0, 0)'){
                    row.push(1);
                }
                else if(color == 'rgb(0, 0, 255)'){ 
                    row.push(0);
                }
                else{
                    row.push(2);
                }
            }

        }
        match=lookfor4(row);
        row=[];
    }
}

function buttonPressed(){

    var col = $(this).index();
    var row = $(this).parent().index();

    choosen = $('table tr:eq('+String(entered[col])+') td:eq('+String(col)+')').children();
    choosen.css('background',turnColor);

    if (turnColor == 'blue'){
        $('h3').text(announRed)
        turnColor = 'red';
    }
    else if(turnColor == 'red'){
        $('h3').text(announBlue)
        turnColor = 'blue';
    }

    entered[col] -= 1;

    horizWin();
    //vertWin();
    diagDown();
    //diagUp();
}

for (var i = 0; i < upperButtons.length; i++){
    upperButtons.eq(i).click(buttonPressed);
}
