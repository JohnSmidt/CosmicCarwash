let dt = 0;
let last = 0;
let days = 0;
const width = 1300;
const height = 700;
const renderer = new CanvasRenderer(1300, 700);
const rules = [{"high":{"lane":"l","read":"All customers with a red, green, or blue car MUST go in the left lane. NO EXCEPTIONS.","logic":"customer.vehicleColor=='Red'||customer.vehicleColor=='Green'||customer.vehicleColor=='Blue'||customer.vehicleColor=='#FF0000'||customer.vehicleColor=='#00FF00'||customer.vehicleColor=='#0000FF'"},"medium":{"lane":"r","read":"Any customer vehicles over 50,000 KG in weight will go in the right lane.","logic":"customer.vehicleWeight>50000"},"low":{"lane":"m"}}]
const container = new Container();
const mouse = new MouseControls(container);
var logic = new LogicParser(rules);
var customer = new Customer();
//var alien = new Alien();
//gameScreen();
title();
//transition();

// TODO Gotta figure out a better way to do this
window.onload= function() {
    document.getElementById("game").addEventListener("mousedown", function(event) {
        let rect = event.currentTarget.getBoundingClientRect();
        let x = (event.clientX - rect.left) / 2;
        let y = (event.clientY - rect.top) / 2;
        console.log("Coordinate x: " + x,
            "Coordinate y: " + y);
        container.children.forEach(child => {
            if((x >= child.pos.x && y >= child.pos.y) &&
                (x <= child.pos.x + child.width / 2 && y <= child.pos.y + child.height / 2))
            {
                if(child.action)
                {
                    child.action();
                }
            }
        });
    })
}

function rulesDisplay(day) {
    // Three rules will be set for each
}

function title()
{
    // Load the title
    const title = new Text("Cosmic Carwash", width / 2, 0,{
        font: "70pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "center"
    });

    title.update = function() {
        if(this.pos.y < height/2)
        {
            this.pos.y += 100 * dt;
        }
        else {
            var startGameButton = new Button(
                "startGame",
                200,
                75,
                width/4 - 50,
                height/4 + 25,
                "Start Game"
            )
            startGameButton.action = function() {
                // TODO learn how to remove everything before loading new screen
                container.removeAll();
                gameScreen();
            }
            container.add(startGameButton);
            this.update = null;
        }
    };

    // Load the start button

    const startGameButton = new Button(
        250,
        75,
        (width / 4) - (250 / 4),
        height / 4 + (20 / 2),
        "Start Game"

    );
    startGameButton.update = function()
    {


    }

    // Add to the scene
    container.add(title);
    container.add(startGameButton);
    //container.add(uiBox);

}
function transition()
{
    var boxes = [];
    for(var i = 1; i <= 20; i++)
    {
        var box = new UIBox(
            i * (width / 20),
            i * (height / 20),
            width/4 - i * 16.5 ,
            height/4 - i * 8.75);
        box.update = function()
        {
            if(this.width > width)
            {
                this.width = 0;
                this.pos.y = height / 4;
                this.pos.x = width / 4;
                this.height = 0;
            }
            else
            {
                this.height += 100 * dt;
                this.pos.y -= 25 * dt;
                this.width += 186 * dt;
                this.pos.x -= 46 * dt;
            }
        }
        container.add(box);

    }
}

function gameScreen()
{

    //svar rules = new Rules(days);
    // var sidebar = new UIBox(
    //     "sidebar",
    // 325,
    //    height,
    //    0,
    //    0
    // );

    var rightLaneButton = new Button(
        "rightLaneButton",
        75,
        75,
        115,
        (height / 2) - 45,
        '\uf061',
        true,
        {
            font: "60pt fontawesome",
            fill: "rgb(240, 167, 50)",
            align: "center",
            textBaseline: "middle"
        }
    )

    var leftLaneButton = new Button(
        "leftLaneButton",
        75,
        75,
        10,
        (height / 2) - 45,
        '\u25C2',
        true
    )

    var middleLaneButton = new Button(
        "middleLaneButton",
        75,
        75,
        60,
        (height / 2) - (95),
        '\u25B2',
        true
    )

    rightLaneButton.action = function() {
        var dialogue = new DialogueBox(
            logic.checkCustomer(customer, 0, "r")?"Correct!!!":"Incorrect...",
            500,
            200,
            width / 4,
            height / 4
        );
        next()
    }

    middleLaneButton.action = function() {
        var dialogue = new DialogueBox(
            logic.checkCustomer(customer, 0, "m")?"Correct!!!":"Incorrect...",
            500,
            200,
            width / 4,
            height / 4
        );
        next()
    }

    leftLaneButton.action = function() {
        var dialogue = new DialogueBox(
            logic.checkCustomer(customer, 0, "l")?"Correct!!!":"Incorrect...",
            500,
            200,
            width / 4,
            height / 4
        );
        next()
    }

    container.add(rightLaneButton);
    container.add(leftLaneButton);
    container.add(middleLaneButton)

    var scannerMonitor = new UIBox(
        "scannerMonitor",
    280,
    (height / 2) - 10,
       175,
       10
    );

    var LPR = new Text("LPR: <null>", 185, 50,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    var VIN = new Text("VIN: <null>", 185, 110,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    var color = new Text("Color: <null>", 185, 170,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    var vehicleWeight = new Text("Vehicle Weight: <null>", 185, 230,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    var type = new Text("Vehicle Type: <null>", 185, 290,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    scannerMonitor.add(LPR);
    scannerMonitor.add(VIN);
    scannerMonitor.add(color);
    scannerMonitor.add(vehicleWeight);
    scannerMonitor.add(type);

    var scannerButton = new Button(
        "scannerButton",
        290,
        50,
        175,
        (scannerMonitor.height / 2) + 20,
        "Scan Vehicle",
        false,

    );

    var openCustomerDisplayButton = new Button(
        "openCustomerDisplayButton",
        200,
        50,
        335,
        (scannerMonitor.height / 2) + 20,
        "Open",
        false,
    );

    var closeCustomerDisplayButton = new Button(
        "closeCustomerDisplayButton",
        200,
        50,
        485,
        (scannerMonitor.height / 2) + 20,
        "Close",
        true,
    );

    container.add(openCustomerDisplayButton);
    container.add(closeCustomerDisplayButton);

    var customerDisplay = new UIBox(
        "customerDisplay",
        600,
        (height / 2) - 10,
        (width / 4) + 10,
        10
    );

    var license = new UIBox(
        "license",
        420,
        220,
        (width / 2) - 225,
        (height / 2) - 123
    );

    var carInfo = new UIBox(
        "carInfo",
        470,
        220,
        175,
        (height / 2) - 123
    );

    //container.add(sidebar);
    container.add(scannerMonitor);
    container.add(scannerButton);
    container.add(customerDisplay);
    container.add(customer);
    //customerDisplay.add(alien)
    container.add(license);
    container.add(carInfo);

    scannerButton.action = function() {
        scan(LPR, VIN, color, vehicleWeight, type);
    }
}

function scan(LPR, VIN, color, vehicleWeight, type) {

    // var dialogue = new DialogueBox(
    //     "ALERT: You are a big hairy monkey",
    //     500,
    //     200,
    //     width / 4,
    //     height / 4
    // );

    // var customer = new Customer();
    // console.log("Are you correct?", logic.checkCustomer(customer, 0, "r"));
    LPR.text = "LPR: " + customer.vehicleLicensePlate;
    VIN.text = "VIN: " + customer.vin;
    color.text = "Color: " + customer.vehicleColor;
    vehicleWeight.text = "Vehicle Weight: " + customer.vehicleWeight;
    type.text = "Vehicle Type: " + customer.vehicleType;

}
function next() {
    // Reset Everything
    //LPR.text = "<NULL>";
    container.remove(customer);
    customer = new Customer();
    container.add(customer)
    //alien.set(customer)
}
function update(ms)
{
    requestAnimationFrame(update);

    const t = ms / 1000;
    dt = t - last;
    last = t;

    // Add game logic here
    container.update();
    renderer.render(container);

}
requestAnimationFrame(update);

