let dt = 0;
let last = 0;
let days = 0;
let totalMoney = 0;
let shutterOpen = false;
let laneChoice = 'r';
const width = 1300;
const height = 700;
const renderer = new CanvasRenderer(1300, 700);
const rules = [{"high":{"lane":"l","read":"All customers with a red, green, or blue car MUST go in the left lane. NO EXCEPTIONS.","logic":"customer.vehicleColor=='Red'||customer.vehicleColor=='Green'||customer.vehicleColor=='Blue'||customer.vehicleColor=='#FF0000'||customer.vehicleColor=='#00FF00'||customer.vehicleColor=='#0000FF'"},"medium":{"lane":"r","read":"Any customer vehicles over 50,000 KG in weight will go in the right lane.","logic":"customer.vehicleWeight>50000"},"low":{"lane":"m"}}]
const container = new Container();
const mouse = new MouseControls(container);
var logic = new LogicParser(rules);
var customer = new Customer();
//var alien = new Alien();
gameScreen();
//title();
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
                if(child.action && !child.disabled)
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

    var timerBox = new UIBox(
        "timerBox",
        285,
        100,
        10,
        10
    )

    container.add(timerBox);

    var timerLabel = new Text(
        "Time Of Day", 150, 40,{
            font: "15pt Quantico",
            fill: "rgb(240, 167, 50)",
            align: "center"
        }
    )

    timerBox.add(timerLabel);

    var overallBox = new UIBox(
        "overallBox",
        285,
        220,
        10,
        75
    )
    container.add(overallBox);

    var rightLaneButton = new Button(
        "rightLaneButton",
        75,
        75,
        115,
        (height / 2) - 95,
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
        (height / 2) - 95,
        '\u25C2',
        true
    )

    var middleLaneButton = new Button(
        "middleLaneButton",
        75,
        75,
        63,
        (height / 2) - (145),
        '\u25B2',
        true
    )

    var confirmButton = new Button(
        "confirmButton",
        285,
        75,
        10,
        (height / 2) - 45,
        "Confirm",
        true
    )

    rightLaneButton.action = function() {
        rightLaneButton.removeAll();
        rightSelectionSquare = new Square(
            rightLaneButton.width + 12,
            rightLaneButton.height + 12,
           54.5,124.5,
            240,167,50,
            true
            )
        laneChoice = 'r'
        confirmButton.disabled = false;
        rightLaneButton.add(rightSelectionSquare)
        var dialogue = new DialogueBox(
            logic.checkCustomer(customer, 0, "r")?"Correct!!!":"Incorrect...",
            500,
            200,
            width / 4,
            height / 4
        );
        next(LPR, VIN, color, vehicleWeight, type)
    }

    middleLaneButton.action = function() {
        var dialogue = new DialogueBox(
            logic.checkCustomer(customer, 0, "m")?"Correct!!!":"Incorrect...",
            500,
            200,
            width / 4,
            height / 4
        );
        next(LPR, VIN, color, vehicleWeight, type)
    }

    leftLaneButton.action = function() {
        var dialogue = new DialogueBox(
            logic.checkCustomer(customer, 0, "l")?"Correct!!!":"Incorrect...",
            500,
            200,
            width / 4,
            height / 4
        );
        next(LPR, VIN, color, vehicleWeight, type)
    }

    container.add(rightLaneButton);
    container.add(leftLaneButton);
    container.add(middleLaneButton);
    container.add(confirmButton);

    var scannerMonitor = new UIBox(
        "scannerMonitor",
    280,
    (height / 2) - 10,
       175,
       10
    );

    var scannerMonitorTitle = new Text("Vehicle Information", 320, 40,{
        font: "15pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "center"
    });

    var LPR = new Text("LPR: <NULL>", 185, 80,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    var VIN = new Text("VIN: <NULL>", 185, 140,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    var color = new Text("Color: <NULL>", 185, 200,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    var vehicleWeight = new Text("Vehicle Weight: <NULL>", 185, 260,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    var type = new Text("Vehicle Type: <NULL>", 185, 320,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    scannerMonitor.add(scannerMonitorTitle)
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
        true,

    );

    var openCustomerDisplayButton = new Button(
        "openCustomerDisplayButton",
        295,
        50,
        (width / 4) + 10,
        (scannerMonitor.height / 2) + 20,
        "Open",
        false,
    );

    var closeCustomerDisplayButton = new Button(
        "closeCustomerDisplayButton",
        295,
        50,
        490,
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
        scan(scannerButton, LPR, VIN, color, vehicleWeight, type);
    }

    openCustomerDisplayButton.action = function() {
        shutterOpen = true;
        openCustomerDisplayButton.disabled = true;
        closeCustomerDisplayButton.disabled = false;
        rightLaneButton.disabled = false;
        leftLaneButton.disabled = false;
        middleLaneButton.disabled = false;
        scannerButton.disabled = false;
    }

    closeCustomerDisplayButton.action = function() {
        shutterOpen = false;
        openCustomerDisplayButton.disabled = false;
        closeCustomerDisplayButton.disabled = true;
        rightLaneButton.disabled = true;
        leftLaneButton.disabled = true;
        middleLaneButton.disabled = true;
        scannerButton.disabled = true;
    }
}

function scan(scannerButton, LPR, VIN, color, vehicleWeight, type) {
    LPR.text = "LPR: Scanning...";
    VIN.text = "VIN: Scanning..";
    color.text = "Color: Scanning...";
    vehicleWeight.text = "Vehicle Weight: Scanning...";
    type.text = "Vehicle Type: Scanning...";
    scannerButton.disabled = true;
    scannerButton.setLabel("Scanning...");
    let aniTime = 0;
    let loadingSquare = new Square(
        1,
        scannerButton.height,
        scannerButton.pos.x,
        scannerButton.pos.y,
        240,
        167,
        50
    )

    container.add(loadingSquare)
    console.log()
    scannerButton.update = () => {

        if(loadingSquare.width < scannerButton.width) {
            loadingSquare.width += 58 * dt;
            aniTime += dt;
        }
        else {
            container.remove(loadingSquare)
            scannerButton.update = null;
            scannerButton.disabled = false;
            scannerButton.setLabel("Scan Vehicle")
            LPR.text = "LPR: " + customer.vehicleLicensePlate;
            VIN.text = "VIN: " + customer.vin;
            color.text = "Color: " + customer.vehicleColor;
            vehicleWeight.text = "Vehicle Weight: " + customer.vehicleWeight;
            type.text = "Vehicle Type: " + customer.vehicleType;
        }

        console.log(aniTime)
        if(aniTime >= 1)
            LPR.text = "LPR: " + customer.vehicleLicensePlate;
        if(aniTime >= 1.5)
            VIN.text = "VIN: " + customer.vin;
        if(aniTime >= 2.3)
            color.text = "Color: " + customer.vehicleColor;
        if(aniTime >= 3.5)
            vehicleWeight.text = "Vehicle Weight: " + customer.vehicleWeight;
        if(aniTime >= 4.9)
            type.text = "Vehicle Type: " + customer.vehicleType;


    }
}

function openShutter()
{

}

function next(LPR, VIN, color, vehicleWeight, type) {
    // Reset Everything
    LPR.text = "LPR: <NULL>";
    VIN.text = "VIN: <NULL>";
    color.text = "Color: <NULL>";
    vehicleWeight.text = "Vehicle Weight: <NULL>";
    type.text = "Vehicle Type: <NULL>";
    container.remove(customer);
    customer = new Customer();
    container.add(customer)
    //customer.removeHead()
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

