//ok, I should figure out what I want this to look like
//I think I need to do it by button
//so it'll be button = type, amount, cost, increase, value
/*
values = {
    drip1:{
        amount:0,
        cost:100,
        increase:1.2,
        power:1
    }
}
*/
const buttonTableWidth = 8;
//figure out how to make
var increases = [1.2, 2, 3, 5, 7, 10, 15, 20, 30, 50, 100]
var power = [1, 2, 5, 10, 25, 100, 300, 1000]
var values = {

};

//maybe make buttons here?
for(var i = 0; i < buttonTableWidth; i++){
    values["drip" + (i+1)] = {
        amount: 0,
        cost: Math.pow(10, i + 1),
        increase: increases[i],
        power: power[i],
        type: "drip",
        level: i+1
    };

    for(var j = 0; j < 8; j++){
        values["upgrade" + j + (i+1)] = {
            amount: 0,
            cost: Math.pow(Math.pow(10, j + 2), i + 1),
            increase: increases[i],
            power: power[i],
            type: "upgrade" + j,
            level: i+1
        };
    }

    
}