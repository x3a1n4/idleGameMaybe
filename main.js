//make the values 

var number = parseFloat(document.getElementById("number").innerHTML);

var unlockNextThing = 100;
var thingsUnlocked = 1;

String.prototype.title = function(){
    var string = this; 
    return(string[0].toUpperCase() +  string.slice(1)); 
      
}

var digits = 2;
function expo(x) {
    if(x > 100000){
        return(Number.parseFloat(x).toExponential(digits));
    }else{
        return(Math.ceil(x));
    }
    
}

//list of all buttons
var buttons = [];

class UpgradeButton{
    constructor(type, level){
        this.type = type;
        this.level = level;

        //does it update the array if I do this?
        //it does!
        this.values = values[this.type + this.level]

        this.id = this.type + "Upgrade" + (this.level - 1);

        buttons.push(this);
    }

    //this gets the button element
    //should add it as variable in the class, instead of like this, so the buttons don't need id's
    button(){
        return(document.getElementById(this.id));
    }

    getInnerHTML(){
        //var thisValues = values[this.type + this.level];
        return(
                this.type.title() + " lvl " + this.level + 
                "<hr>" + 
                expo(this.values.cost) + 
                "<hr>" + 
                expo(this.values.amount) + 
                "<hr>" + 
                expo(this.values.power)
            );
    }

    //this makes the full button element of this class
    getButton(){
        var button = document.createElement("BUTTON");
        

        button.innerHTML = this.getInnerHTML();

        button.setAttribute("id", this.id);

        //https://metafizzy.co/blog/this-in-event-listeners/
        this.clickHandler = this.performUpgrade.bind(this);

        button.addEventListener("click", this.clickHandler);

        return(button);
    }

    //this actually adds the button to the end of the page
    makeButton(){
        var node = document.createElement("TD");
        
        node.appendChild(this.getButton());
        document.getElementById(this.type + "Upgrades").appendChild(node);
    }

    //this updates the button if values in values are changed
    updateButton(){
        document.getElementById(this.id).innerHTML = this.getInnerHTML();
    }

    //if the button was clicked, then perform the upgrade
    performUpgrade(){
        //var thisValues = values[this.type + this.level];

        //if I can afford it
        if(this.isAffordable()){
            //subtract the cost
            number -= this.values.cost;
            //add to amount
            this.values.amount += 1;
            //increase cost
            this.values.cost *= this.values.increase;

            this.updateButton();
        }
    }

    //find out if you can afford this upgrade
    isAffordable(){
        if(number > this.values.cost){
            return(true);
        }else{
            return(false);
        }
    }

    grayOut(){
        this.button().innerHTML = "";
    }
}

function findButton(type, level){
    var button = false;
    buttons.forEach(function(b){
        if(b.type == type && b.level == level){
            console.log(b);
            button = b;
        }else{
            return(false);
        }
    });
    return(button);
}

//get sum of values of buttons
function sumButtons(type){
    var runningSum = 0;
    buttons.forEach(function(b){
        if(b.type == type){
            runningSum += values[type + b.level].amount * values[type + b.level].power;
        }
    });
    return(runningSum);
}

//starting buttons - should move to a new file or something
//also make all the buttons
for (var button in values) {
    var upgradeButton = new UpgradeButton(values[button].type, values[button].level);
    upgradeButton.makeButton();
    upgradeButton.grayOut();
}

findButton("drip", 1).updateButton();

//zoom in and out
//find place for this
//also from https://stackoverflow.com/questions/14926366/mousewheel-event-in-modern-browsers
var tableZoom = 1;
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    tableZoom += -delta / 10;
    if(tableZoom > 1){
        tableZoom = 1;
    }
    if(tableZoom < 0.1){
        tableZoom = 0.1;
    }
    document.getElementById("upgradeTable").style.transform = "scale(" + tableZoom + ")";
    console.info(delta);
});

//game loop
function play(){
    document.getElementById("number").innerHTML = expo(number);
    number += sumButtons("drip") / 10;

    //unlock next buttons
    //needs change
    if(number > unlockNextThing){
        unlockNextThing *= 10;
        thingsUnlocked++;

        //change to everything that can be unlocked now
        findButton("drip", thingsUnlocked).updateButton();

        //add title
        var node = document.createElement("TH");
        node.innerHTML = "Level " + thingsUnlocked;
        document.getElementById("upgradeHeaders").appendChild(node);

    }

    //change colors of buttons
    buttons.forEach(function(b){
        if(b.isAffordable()){
            b.button().style.backgroundColor = "aquamarine";
        }else{
            b.button().style.backgroundColor = "grey";
        }
    });

    //update values of sums
    Array.from(document.getElementsByClassName("sum")).forEach(function(e){
        var type = e.id.substring(0, e.id.length - 3);
        e.innerHTML = sumButtons(type);
    });
}

window.setInterval(play, 33);
