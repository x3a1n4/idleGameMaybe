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
//figure out how to make
var increases = [1.2, 2, 3, 5, 7, 10, 15, 20, 30, 50, 100]
var power = [1, 2, 5, 10, 25, 100, 300, 1000]
var values = {

};

//maybe make buttons here?
for(var i = 0; i < 8; i++){
    values["drip" + (i+1)] = {
        amount: 0,
        cost: Math.pow(10, i + 1),
        increase: increases[i],
        power: power[i],
        type: "drip",
        level: i+1
    };

    values["upgrade" + (i+1)] = {
        amount: 0,
        cost: Math.pow(100, i + 1),
        increase: increases[i],
        power: power[i],
        type: "upgrade",
        level: i+1
    };
}