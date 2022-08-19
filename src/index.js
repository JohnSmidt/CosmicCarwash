let dt = 0;
let last = 0;
const width = 1300;
const height = 700;
const renderer = new CanvasRenderer(1300, 700);
const titleScreen = new Container();
const message = new Text("Cosmic Carwash", width / 2, height / 2,{
    font: "70pt Quantico",
    stroke: 'white',
    lineWidth: 3,
    fill: "rgb(240, 167, 50)",
    align: "center"
});

const box = new Button(
    50,
    20,
    100,
    200,
    "Start Game");

titleScreen.add(message);
titleScreen.add(box);



function loadTitle()
{

}

function loadMainInstructions()
{

}

function loadRules()
{

}

function loadGame()
{

}

function loadEOD()
{

}

function loadGameOver()
{

}

function loadWin()
{

}

function awake()
{
    // First time setup

}

function update(ms)
{
    requestAnimationFrame(update);

    const t = ms / 1000;
    dt = t - last;
    last = t;

    // Add game logic here
    titleScreen.update();
    renderer.render(titleScreen);

}
requestAnimationFrame(update);

function makeCustomer()
{

}

function randomRange(max, min)
{

}