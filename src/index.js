let dt = 0;
let last = 0;
let currentDay = 0;
let timePassed = 0;
let timePassedTimer = 0;
let dayTime = true
let totalMoney = 0;
let totalCorrect = 0;
let totalWrong = 0;
let dailyCorrect = 0;
let dailyWrong = 0;
let dayGain = 0;
let dayLoss = 0;
let dailyExpenses = 0;
let timeEnabled = false;
let shutterOpen = false;
let laneChoice = 'r';
const width = 1300;
const height = 700;
const renderer = new CanvasRenderer(1300, 700);
const rules = [{"high":{"lane":"l","read":"All customers with a red, green, or blue car MUST go in the left lane. NO EXCEPTIONS.","logic":"customer.vehicleColor=='Red'||customer.vehicleColor=='Green'||customer.vehicleColor=='Blue'||customer.vehicleColor=='#FF0000'||customer.vehicleColor=='#00FF00'||customer.vehicleColor=='#0000FF'"},"medium":{"lane":"r","read":"Any customer vehicles over 50,000 KG in weight will go in the right lane.","logic":"customer.vehicleWeight>50000"},"low":{"lane":"m"}}]
const container = new Container();
const mouse = new MouseControls(container);
let logic = new LogicParser(rules);
let customer = new Customer(); // This should not be here
gameScreen();
//title();

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

function gameScreen()
{
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

    var time = new Text(
        "00:00", 160, 100, {
            font: "40pt Quantico",
            fill: "rgb(240, 167, 50)",
            align: "center"
        }
    )

    time.update = function()
    {
        let hours = 9;
        let minutes = "00";

       if(timeEnabled)
       {
            timePassedTimer += dt
            if(timePassedTimer < 180)
            {
                hours = (parseInt(timePassedTimer / 22.5) + 8) % 12 + 1
                timePassedTimer % 22.5 > 11.25 ? minutes = "30" : minutes = "00";

                if(hours < 9) {
                    hours = "0" + hours
                }

                time.text = hours + ":" + minutes;

            }
            else
            {
                dayTime = false;
                if(timePassedTimer % 1 > 0.5)
                {
                    time.text = ""
                }
                else
                {
                    time.text = "05:00";
                }
            }
        }
        else
        {
            if(timePassed % 1 > 0.5)
            {
                time.text = ""
            }
            else
            {
                time.text = hours + ":" + minutes;
            }
        }
    }

    container.add(time);
    timerBox.add(timerLabel);

    var overallBox = new UIBox(
        "overallBox",
        285,
        220,
        10,
        75
    )
    container.add(overallBox);

    let dayNumber = new Text("Day: " + currentDay, 30, 90,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let numberRight = new Text("Correct: " + dailyCorrect, 30, 120,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let numberWrong = new Text("Incorrect: " + dailyWrong, 30, 140,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    overallBox.add(dayNumber);
    overallBox.add(numberRight);
    overallBox.add(numberWrong);

    var rightLaneButton = new LaneButton(
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
        },
        'r'
    )

    var leftLaneButton = new LaneButton(
        75,
        75,
        10,
        (height / 2) - 95,
        '\u25C2',
        true,
        {},
        'l'
    )

    var middleLaneButton = new LaneButton(
        75,
        75,
        63,
        (height / 2) - (145),
        '\u25B2',
        true,
        {},
        'm'
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
        if(!rightLaneButton.chosen)
        {
            rightLaneButton.chosen = true;
            leftLaneButton.chosen = false;
            middleLaneButton.chosen = false;
            laneChoice = rightLaneButton.lane
            confirmButton.disabled = false;
        }
        else
        {
            rightLaneButton.chosen = false;
            confirmButton.disabled = true;
        }
    }

    middleLaneButton.action = function() {
        if(!middleLaneButton.chosen)
        {
            rightLaneButton.chosen = false;
            leftLaneButton.chosen = false;
            middleLaneButton.chosen = true;
            laneChoice = middleLaneButton.lane
            confirmButton.disabled = false;
        }
        else
        {
            middleLaneButton.chosen = false;
            confirmButton.disabled = true;
        }

    }

    leftLaneButton.action = function() {
        if(!leftLaneButton.chosen)
        {
            rightLaneButton.chosen = false;
            leftLaneButton.chosen = true;
            middleLaneButton.chosen = false;
            laneChoice = leftLaneButton.lane
            confirmButton.disabled = false;
        }
        else
        {
            leftLaneButton.chosen = false;
            confirmButton.disabled = true;
        }
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

    var licenseBox = new UIBox(
        "licenseBox",
        490,
        220,
        (width / 2) - 262,
        (height / 2) - 128
    );

    container.add(scannerMonitor);
    container.add(scannerButton);
    container.add(customerDisplay);
    container.add(licenseBox);
    container.add(customer);

    scannerButton.action = function() {
        scan(scannerButton, LPR, VIN, color, vehicleWeight, type);
    }

    let getLicenseButton = new Button(
        "getLicenseButton",
        295,
        50,
        230,
        225,
        "Get License",
        true,
    );



    let giveLicenseButton = new Button(
        "giveLicenseButton",
        295,
        50,
        230,
        300,
        "Give License Back",
        true,
    );


    getLicenseButton.action = function() {
        closeCustomerDisplayButton.disabled = true;
        getLicenseButton.disabled = true;
        giveLicenseButton.disabled = false;
        leftLaneButton.disabled = true;
        middleLaneButton.disabled = true;
        rightLaneButton.disabled = true;
        customer.getLicense()
    }
    giveLicenseButton.action = function() {
        closeCustomerDisplayButton.disabled = false;
        getLicenseButton.disabled = false;
        giveLicenseButton.disabled = true;
        leftLaneButton.disabled = false;
        middleLaneButton.disabled = false;
        rightLaneButton.disabled = false;
        customer.giveLicense()
    }

    container.add(getLicenseButton)
    container.add(giveLicenseButton)

    openCustomerDisplayButton.action = function() {
        let openDist = - ((shutter.height - shutter.pos.y) / 2) + 20
        shutter.update = function() {
            if(shutter.pos.y  > openDist)
            {
                shutter.pos.y -= 250 * dt;
            }
            else {
                new DialogueBox(
                   "\"Hello\"",
                    100,
                    60,
                    490,
                    100,
                    1
                );
                shutter.update = null
            }

        }

        timeEnabled = true;
        shutterOpen = true;
        openCustomerDisplayButton.disabled = true;
        closeCustomerDisplayButton.disabled = false;
        rightLaneButton.disabled = false;
        getLicenseButton.disabled = false;
        leftLaneButton.disabled = false;
        middleLaneButton.disabled = false;
        scannerButton.disabled = false;
    }

    closeCustomerDisplayButton.action = function() {
        shutter.update = function() {
            if(this.pos.y  <  this.closedPos.y)
            {
                this.pos.y += 250 * dt;
            }
            else
            {
                this.update = null
            }
        }
        shutterOpen = false;
        openCustomerDisplayButton.disabled = false;
        closeCustomerDisplayButton.disabled = true;
        getLicenseButton.disabled = true;
        rightLaneButton.disabled = true;
        leftLaneButton.disabled = true;
        middleLaneButton.disabled = true;
        scannerButton.disabled = true;
    }

    let shutter = new Shutter(335, 8, 599, 345);
    container.add(shutter);

    confirmButton.action = function() {
        var dialogue = new DialogueBox(
            logic.checkCustomer(customer, 0, laneChoice)?"Correct!!!":"Incorrect...",
            500,
            200,
            width / 4,
            height / 4
        );
        openCustomerDisplayButton.disabled = false;
        closeCustomerDisplayButton.disabled = true;
        getLicenseButton.disabled = true;
        giveLicenseButton.disabled = true;
        next(LPR, VIN, color, vehicleWeight, type, shutter)
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
            vehicleWeight.text = "Vehicle Weight: " + customer.vehicleWeight + " KG";
            type.text = "Vehicle Type: " + customer.vehicleType;
        }

        if(aniTime >= 1)
            LPR.text = "LPR: " + customer.vehicleLicensePlate;
        if(aniTime >= 1.5)
            VIN.text = "VIN: " + customer.vin;
        if(aniTime >= 2.3)
            color.text = "Color: " + customer.vehicleColor;
        if(aniTime >= 3.5)
            vehicleWeight.text = "Vehicle Weight: " + customer.vehicleWeight + " KG";
        if(aniTime >= 4.9)
            type.text = "Vehicle Type: " + customer.vehicleType;


    }
}

function makeNewCustomer(shutter) {
    container.remove(customer);
    container.remove(shutter)
    customer = new Customer();
    container.add(customer)
    container.add(shutter);
}

function next(LPR, VIN, color, vehicleWeight, type, shutter) {
    // Reset Everything
        shutter.update = function() {
            if(this.pos.y  <  this.closedPos.y)
            {
                this.pos.y += 250 * dt;
            }
            else
            {
                if(dayTime) {
                    makeNewCustomer(shutter)
                }
                else
                {
                    // Turn everything off so we cant play anymore
                    container.disableAll()
                }
                this.update = null;
            }
            LPR.text = "LPR: <NULL>";
            VIN.text = "VIN: <NULL>";
            color.text = "Color: <NULL>";
            vehicleWeight.text = "Vehicle Weight: <NULL>";
            type.text = "Vehicle Type: <NULL>";
        }

}
function update(ms)
{
    requestAnimationFrame(update);

    const t = ms / 1000;
    dt = t - last;
    last = t;
    timePassed += dt;
    // Add game logic here
    container.update();
    renderer.render(container);

}
requestAnimationFrame(update);

