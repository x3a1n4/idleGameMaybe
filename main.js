//code
clickPowers = [1];
clickCosts = [10];
clickCostIncreases = [1.2];

dripPowers = [0];
dripCosts = [10];
dripCostIncreases = [1.2];

number = parseFloat(document.getElementById("number").innerHTML);

unlockNextThing = 100;

function buttonClick(){
    number += clickPowers[0];
    console.log(number);
}

function dripClick(id){
    if(number > dripCosts[id]){
        number -= dripCosts[id];
        dripPowers[id]++;
        dripCosts[id] *= dripCostIncreases[id];

        document.getElementById("dripUpgrade" + id).innerHTML = "Buy drip lvl 1<br>" + Math.ceil(dripCosts[id]);
    }
}

function clickClick(id){
    if(number > clickCosts[id]){
        number -= clickCosts[id];
        clickPowers[id]++;
        clickCosts[id] *= clickCostIncreases[id];

        document.getElementById("clickUpgrade" + id).innerHTML = "Buy click lvl 1<br>" + Math.ceil(clickCosts[id]);
    }
}

function play(){
    document.getElementById("number").innerHTML = Math.floor(number);
    number += dripPowers[0] / 20;

    if(number > unlockNextThing){
        unlockNextThing * 10;
    }
}

window.setInterval(play, 33);
