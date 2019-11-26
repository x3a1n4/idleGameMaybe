var number = parseFloat(document.getElementById("number").innerHTML);

var unlockNextThing = 100;
var thingsUnlocked = 1;

String.prototype.title = function(){
    var string = this; 
    return(string[0].toUpperCase() +  string.slice(1)); 
      
}

Array.prototype.sum = function(){
    runningTotal = 0;
    this.forEach(function(e){
        runningTotal += e;
    });
    return(runningTotal);
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

        this.id = this.type + "Upgrade" + (this.level - 1);

        buttons.push(this);
    }

    //this gets the button element
    button(){
        return(document.getElementById(this.id));
    }

    getInnerHTML(){
        var id = this.level - 1;
        var thisValues = values[this.type];
        return(
                this.type.title() + " lvl " + this.level + 
                "<hr>" + 
                expo(thisValues["costs"][id]) + 
                "<hr>" + 
                expo(thisValues["amounts"][id]) + 
                "<hr>" + 
                expo(thisValues["values"][id])
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
        var id = this.level - 1;

        //if I can afford it
        if(this.isAffordable()){
            //subtract the cost
            number -= values[this.type]["costs"][id];
            //add to amounts this times how good it is
            values[this.type]["amounts"][id] += values[this.type]["values"][id];
            //increase costs
            values[this.type]["costs"][id] *= values[this.type]["increases"][id];

            this.updateButton();
        }
    }

    //find out if you can afford this upgrade
    isAffordable(){
        var id = this.level - 1;
        if(number > values[this.type]["costs"][id]){
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

//starting buttons - should move to a new file or something
//also make all the buttons
for (var key in values) {
    values[key]["values"].forEach(function(x, item){
        var upgradeButton = new UpgradeButton(key, item + 1);
        upgradeButton.makeButton();
        upgradeButton.grayOut();
    });
}

console.log(findButton("click", 1));
findButton("click", 1).updateButton();
findButton("drip", 1).updateButton();

//if the "click" button is clicked
function mainButtonClick(){
    number += values["click"]["amounts"].sum();
}

//zoom in and out
//find place for this
//also from https://stackoverflow.com/questions/14926366/mousewheel-event-in-modern-browsers
var tableZoom = 1;
window.addEventListener("wheel", event => {
    const delta = Math.sign(event.deltaY);
    tableZoom += -delta / 20;
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
    document.getElementById("number").innerHTML = Math.floor(number);
    number += values["drip"]["amounts"].sum() / 20;

    //unlock next buttons
    //needs change
    if(number > unlockNextThing){
        unlockNextThing *= 10;
        thingsUnlocked++;

        UpgradeButton.findButton("click", thingsUnlocked).updateButton();
        UpgradeButton.findButton("drip", thingsUnlocked).updateButton();

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
        e.innerHTML = values[type]["amounts"].sum();
    });
}

window.setInterval(play, 33);
