//code
var clickPowers = [1, 0];
var clickCosts = [10, 100];
var clickCostIncreases = [1.2, 2];
var clickValues = [1, 1];

var values = {
    click: {
        amounts: [1, 0],
        costs: [10, 100],
        increases: [1.2, 2],
        values: [1, 1]
    },

    drip: {
        amounts: [0, 0],
        costs: [10, 100],
        increases: [1.2, 2],
        values: [1, 1]
    }
};

console.log(values["click"]);

var dripPowers = [0, 0];
var dripCosts = [10, 100];
var dripCostIncreases = [1.2, 2];
var dripValues = [1, 1];

var number = parseFloat(document.getElementById("number").innerHTML);

var unlockNextThing = 100;
var thingsUnlocked = 1;

String.prototype.title = function(){
    var string = this; 
    return(string[0].toUpperCase() +  string.slice(1)); 
      
}

class UpgradeButton{
    constructor(type, level){
        this.type = type;
        this.level = level;

        this.id = this.type + "Upgrade" + (this.level - 1);
    }

    getInnerHTML(){
        var id = this.level - 1;
        return(
                this.type.title() + " lvl " + this.level + 
                "<hr>" + 
                Math.ceil(values[this.type]["costs"][id]) + 
                "<hr>" + 
                values[this.type]["amounts"][id] + 
                "<hr>" + 
                values[this.type]["values"][id]
            );
    }

    //this returns the full button element of this class
    getButton(){
        var button = document.createElement("BUTTON");
        

        button.innerHTML = this.getInnerHTML();

        button.setAttribute("id", this.id);

        button.addEventListener("click", this.performUpgrade);

        console.log(this);

        return(button);
    }

    //this actually adds the button to the end of the page
    makeButton(){
        var node = document.createElement("TR");
        
        node.appendChild(this.getButton());
        document.getElementById(this.type + "Upgrades").appendChild(node);
    }

    //this updates the button if values in values are changed
    updateButton(){
        document.getElementById(this.id).innerHTML = this.getInnerHTML();
    }

    performUpgrade(){
        var id = this.level - 1;

        console.log(this);

        if(number > values[this.type]["costs"][id]){
            number -= values[this.type]["costs"][id];
            values[this.type]["amounts"][id];
            values[this.type]["costs"][id] *= values[this.type]["increases"][id];
    
            this.updateButton();
        }
    }
}

var buttons = [
    new UpgradeButton("click", 1),
    new UpgradeButton("drip", 1)
];

buttons.forEach(function (item, index) {
    item.makeButton();
});

function mainButtonClick(){
    number += clickPowers[0];
}

function dripClick(id){
    if(number > dripCosts[id]){
        number -= dripCosts[id];
        dripPowers[id]++;
        dripCosts[id] *= dripCostIncreases[id];

        document.getElementById("dripUpgrade" + id).innerHTML = "Buy drip lvl 1<hr>" + Math.ceil(dripCosts[id]) + "<hr>" + dripPowers[id];
    }
}
function clickClick(id){
    if(number > clickCosts[id]){
        number -= clickCosts[id];
        clickPowers[id]++;
        clickCosts[id] *= clickCostIncreases[id];

        document.getElementById("clickUpgrade" + id).innerHTML = "Buy click lvl 1<hr>" + Math.ceil(clickCosts[id]) + "<hr>" + clickPowers[id];
    }
}

function play(){
    document.getElementById("number").innerHTML = Math.floor(number);
    number += dripPowers[0] / 20;

    if(number > unlockNextThing){
        unlockNextThing *= 10;
        thingsUnlocked++;

        //add header
        var node = document.createElement("TH");
        var textnode = document.createTextNode("Level " + thingsUnlocked);
        node.appendChild(textnode);
        document.getElementById("upgradeHeaders").appendChild(node);

        var id = thingsUnlocked - 1;

        //add button
        node = document.createElement("TR");
        
        node.appendChild(button);
        document.getElementById("clickUpgrades").appendChild(node);
    }
}

window.setInterval(play, 33);
