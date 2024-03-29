let dt = 0;
let last = 0;
let currentDay = 0;
let timePassed = 0;
let timePassedTimer = 0;
let dayTime = true
let rulesOpen = false;
let totalMoney = 0;
let totalCorrect = 0;
let totalWrong = 0;
let dailyCorrect = 0;
let dailyWrong = 0;
const dailyExpenses = 25;
let timeEnabled = false;
let shutterOpen = false;
let laneChoice = 'h';
const width = 1300;
const height = 700;
const renderer = new CanvasRenderer(1300, 700);
const container = new Container();
let logic = new LogicParser();
let customer = new Customer();
//gameScreen();
title();
//endOfDayScreen();

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
                if(child.action && !child.disabled && !rulesOpen)
                {
                    child.action();
                }
                if(child.closeAction) {
                    child.closeAction();
                }
            }
        });
    })
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

    // Add to the scene
    container.add(title);
    container.add(startGameButton);

}

function gameScreen()
{
    console.log("Here")
    // Setup the day
    //logic
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

                if(hours < 10) {
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
        110,
        10,
        75
    )
    container.add(overallBox);

    let ruleButton = new Button(
        "ruleButton",
        285,
        75,
        10,
        150,
        "Policy"
    )

    ruleButton.action = function() {
        ruleButton.disabled = true;
        openRuleBox(ruleButton);

    }
    container.add(ruleButton);

    let dayNumber = new Text("Day: " + (currentDay + 1), 30, 90,{
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
        285,
        50,
        10,
        (height / 2) - 145,
        'Cosmic Wash',
        true,
        {
            font: "60pt fontawesome",
            fill: "rgb(240, 167, 50)",
            align: "center",
            textBaseline: "middle"
        },
        'h'
    )

    var leftLaneButton = new LaneButton(
        285,
        50,
        10,
        (height / 2) - 75,
        'Basic Wash',
        true,
        {},
        'l'
    )

    var middleLaneButton = new LaneButton(
        285,
        50,
        10,
        (height / 2) - 110,
        'Plus Wash',
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
        scan(ruleButton, scannerButton, LPR, VIN, color, vehicleWeight, type);
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
        let response = logic.checkCustomer(customer, currentDay, laneChoice)
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

                this.update = null;
            }
            LPR.text = "LPR: <NULL>";
            VIN.text = "VIN: <NULL>";
            color.text = "Color: <NULL>";
            vehicleWeight.text = "Vehicle Weight: <NULL>";
            type.text = "Vehicle Type: <NULL>";
            confirmButton.disabled = true;
            leftLaneButton.disabled = true;
            middleLaneButton.disabled = true;
            rightLaneButton.disabled = true;
            leftLaneButton.chosen = false;
            middleLaneButton.chosen = false;
            rightLaneButton.chosen = false;
        }
        let aniTime = 0;
        scannerButton.disabled = true;
        ruleButton.disabled = true;
        openCustomerDisplayButton.disabled = true;
        closeCustomerDisplayButton.disabled = true;
        getLicenseButton.disabled = true;
        giveLicenseButton.disabled = true;

        var resultsBox = new UIBox(
            "overallBox",
            285,
            110,
            10,
            75
        )
        let checkText = new Text("CHECKING..", 155, 140,{
            font: "20pt Quantico",
            fill: "rgb(240, 167, 50)",
            align: "center"
        });
        resultsBox.add(checkText);
        container.add(resultsBox);

        resultsBox.update = () => {
            if(aniTime > 2) {
                resultsBox.removeAll();
                let responseTitleText = new Text("Testing", 155, 120,{
                    font: "20pt Quantico",
                    fill: "rgb(240, 167, 50)",
                    align: "center"
                });
                let responseBodyText = new Text("This is some test text to format.", 155, 145,{
                    font: "12pt Courier New",
                    fill: "rgb(240, 167, 50)",
                    align: "center"
                });

                resultsBox.add(responseTitleText);
                resultsBox.add(responseBodyText);

                if(response.passed) {
                    responseTitleText.text = "Success!";
                    responseBodyText.text = response.message;
                }
                else {
                    responseTitleText.text = "ERROR!!";
                    responseBodyText.text = response.message;
                }
                if(dayTime)
                {

                    ruleButton.disabled = false;
                    openCustomerDisplayButton.disabled = false;
                }






                //next(LPR, VIN, color, vehicleWeight, type, shutter, confirmButton, leftLaneButton, middleLaneButton, rightLaneButton)
            }
            if(aniTime > 7) {
                container.remove(resultsBox);
                if(!dayTime)
                {
                    container.disableAll()
                    endDayTransition();
                }
                resultsBox.update = null;
            }
            aniTime += dt;
            console.log(aniTime);
        }
        if(response.passed) {
            dailyCorrect++;
            numberRight.text = "Correct: " + dailyCorrect;
        }
        else {
            dailyWrong++;
            numberWrong.text = "Incorrect: " + dailyWrong;
        }
    }
    openRuleBox(ruleButton);
}

function scan(ruleButton, scannerButton, LPR, VIN, color, vehicleWeight, type) {
    LPR.text = "LPR: Scanning...";
    VIN.text = "VIN: Scanning..";
    color.text = "Color: Scanning...";
    vehicleWeight.text = "Vehicle Weight: Scanning...";
    type.text = "Vehicle Type: Scanning...";
    scannerButton.disabled = true;
    ruleButton.disabled = true;
    scannerButton.setLabel("Scanning...");
    let aniTime = 0;
    let loadingSquare = new Square(
        1,
        10,
        scannerButton.pos.x,
        scannerButton.pos.y + 20,
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
            ruleButton.disabled = false;
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

function openRuleBox(ruleButton) {
    rulesOpen = true;
    ruleBox = new UIBox(
        "ruleBox",
        1080,
        675,
        50,
        5
    )
    let dayDescriptionTitle = new Text("Briefing:", 70, 60,{
        font: "25pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let dayDescription = new Text(logic.getRules(currentDay).description, 140, 90,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let ruleBoxTitle = new Text("Current Operational Policy: ", 295, 225,{
        font: "25pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "center"
    });

    let priority1 = new Text("Priority 1: ", 140, 275,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "center"
    });

    let ruleHigh = new Text(logic.getRules(currentDay).high, 140, 305,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let priority2 = new Text("Priority 2: ", 140, 415,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "center"
    });

    let ruleMed = new Text(logic.getRules(currentDay).med, 140, 445,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let priority3 = new Text("Priority 3: ", 140, 555,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "center"
    });

    let ruleLow = new Text(logic.getRules(currentDay).low, 140, 585,{
        font: "12pt Courier New",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let ruleCloseButton = new Button(
        "closeRuleButton",
        150,
        50,
        480,
        310,
        "Close",
    )
    ruleBox.closeAction = function() {
        container.remove(ruleBox);
        rulesOpen = false;
        ruleButton.disabled = false;
    }
    ruleBox.add(dayDescriptionTitle)
    ruleBox.add(dayDescription)
    ruleBox.add(ruleBoxTitle)
    ruleBox.add(priority1)
    ruleBox.add(priority2)
    ruleBox.add(priority3)
    ruleBox.add(ruleHigh)
    ruleBox.add(ruleMed)
    ruleBox.add(ruleLow)
    ruleBox.add(ruleCloseButton);
    container.add(ruleBox);
}

function next(LPR, VIN, color, vehicleWeight, type, shutter, confirmButton, leftLaneButton, middleLaneButton, rightLaneButton) {
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
                    container.disableAll()
                    endDayTransition();
                }
                this.update = null;
            }
            LPR.text = "LPR: <NULL>";
            VIN.text = "VIN: <NULL>";
            color.text = "Color: <NULL>";
            vehicleWeight.text = "Vehicle Weight: <NULL>";
            type.text = "Vehicle Type: <NULL>";
            confirmButton.disabled = true;
            leftLaneButton.disabled = true;
            middleLaneButton.disabled = true;
            rightLaneButton.disabled = true;
            leftLaneButton.chosen = false;
            middleLaneButton.chosen = false;
            rightLaneButton.chosen = false;
        }
}

function endDayTransition()
{
    container.removeAll();
    endOfDayScreen();
}

function nextDayTransition()
{
    container.removeAll();
    currentDay++;
    timePassed = 0;
    timePassedTimer = 0;
    dayTime = true;
    timeEnabled = false;
    totalMoney = totalMoney + ((dailyCorrect * 3) - (Math.trunc(dailyWrong - 0.1) * 6) - dailyExpenses)
    totalCorrect += dailyCorrect;
    dailyCorrect = 0;
    totalWrong += dailyWrong;
    dailyWrong = 0;
    gameScreen();
}

function gameOverTransition()
{
    container.removeAll();
    totalMoney = totalMoney + ((dailyCorrect * 3) - (Math.trunc(dailyWrong - 0.1) * 6) - dailyExpenses)
    totalCorrect += dailyCorrect;
    dailyCorrect = 0;
    totalWrong += dailyWrong;
    dailyWrong = 0;
    gameOverScreen();
}

function newGameTransition() {
    container.removeAll();
    currentDay = 0;
    timePassed = 0;
    timePassedTimer = 0;
    dayTime = true
    rulesOpen = false;
    totalMoney = 0;
    totalCorrect = 0;
    totalWrong = 0;
    dailyCorrect = 0;
    dailyWrong = 0;
    title();
}

function gameOverScreen() {
    let gameOverBox = new UIBox("gameOverBox", 1075, 500, 50, 50)
    container.add(gameOverBox);

    let gameOverTitle = new Text("GAME OVER", 570, 100,{
        font: "30pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "center"
    });

    let currentMoneyText = new Text("Current Money: ", 100, 170,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let numberCorrectText = new Text("Total Correct: ", 100, 240,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let numberIncorrectText = new Text("Total Incorrect: ", 100, 310,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let expensesText = new Text("Furthest day:  ", 100, 380,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let titleButton = new Button(
        "nextDayButton",
        150,
        50,
        480,
        265,
        "Go to Title",
    )
    titleButton.action = function() {
        newGameTransition();
    }

    gameOverBox.add(gameOverTitle);
    gameOverBox.add(currentMoneyText);
    gameOverBox.add(numberCorrectText);
    gameOverBox.add(expensesText);
    gameOverBox.add(numberIncorrectText);
}

function endOfDayScreen()
{
    let scoreBox = new UIBox("scoreBox", 1075, 500, 50, 50)
    container.add(scoreBox)

    let scoreTitle = new Text("Score Results", 570, 100,{
        font: "30pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "center"
    });

    let currentMoneyText = new Text("Current Money: ", 100, 170,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let numberCorrectText = new Text("Number Correct: ", 100, 240,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let numberIncorrectText = new Text("Number Incorrect: ", 100, 310,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let expensesText = new Text("Daily Expenses: ", 100, 380,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let netMoneyText = new Text("Net Money: ", 100, 450,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let scoreTotalMoneyText = new Text("Total Money Remaining: ", 100, 520,{
        font: "20pt Quantico",
        fill: "rgb(240, 167, 50)",
        align: "left"
    });

    let nextDayButton = new Button(
        "nextDayButton",
        150,
        50,
        480,
        265,
        "Continue",
    )
    nextDayButton.action = function() {
        nextDayTransition();
    }

    let gameOverButton = new Button(
        "nextDayButton",
        150,
        50,
        480,
        265,
        "Continue",
    )
    gameOverButton.action = function() {
        gameOverTransition();
    }

    scoreBox.add(scoreTitle);
    scoreBox.add(currentMoneyText);
    scoreBox.add(numberCorrectText);
    scoreBox.add(expensesText);
    scoreBox.add(numberIncorrectText);
    scoreBox.add(netMoneyText);
    scoreBox.add(scoreTotalMoneyText);

    let scoreTime = 0;
    scoreBox.update = function()
    {
        scoreTime += dt

        if(scoreTime > 1.5)
        {
            currentMoneyText.text = "Current Money: $" + totalMoney;
        }
        if(scoreTime > 2.5)
        {
            numberCorrectText.text = "Number Correct: " + dailyCorrect + " (+$" + (dailyCorrect * 3) + ")";
        }
        if(scoreTime > 3.5)
        {
            numberIncorrectText.text = "Number Incorrect: " + dailyWrong + " (-$" + (Math.abs(Math.trunc(dailyWrong - 0.1)) * 6) + ")";
        }
        if(scoreTime > 4.5)
        {
            expensesText.text = "Daily Expenses: -$" + dailyExpenses;
        }
        if(scoreTime > 5.5)
        {
            if(((dailyCorrect * 3) - (Math.trunc(dailyWrong - 0.1) * 6) - dailyExpenses) < 0)
            {
                netMoneyText.text = "Net Money: -$" + ((dailyCorrect * 3) - (Math.trunc(dailyWrong - 0.1) * 6) - dailyExpenses);
            }
            else
            {
                netMoneyText.text = "Net Money: $" + ((dailyCorrect * 3) - (Math.trunc(dailyWrong - 0.1) * 6) - dailyExpenses);
            }
        }
        if(scoreTime > 7.5)
        {
            scoreTotalMoneyText.text = "Total Money Remaining: $" + (totalMoney + (dailyCorrect * 3) - (Math.trunc(dailyWrong - 0.1) * 6) - dailyExpenses);
        }
        if(scoreTime > 9.5)
        {
            if((totalMoney + (dailyCorrect * 3) - (Math.trunc(dailyWrong - 0.1) * 6) - dailyExpenses) >= 0)
            {
                container.add(nextDayButton);
            }
            else
            {
                container.add(gameOverButton);
            }
            scoreBox.update = "";
        }
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

