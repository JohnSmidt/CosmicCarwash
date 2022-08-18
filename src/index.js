let dt = 0;
let last = 0;
let canvas;
let ctx;

window.addEventListener('load', (event) => {
    canvas = document.getElementById("game")
    ctx = canvas.getContext("2d");
    awake();
});

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
    const scene = new Container();
    const message = new Text("The Renderer!", {
        font: "40pt monospace",
        fill: "blue",
        align: "center"
    });
    message.pos.x = w / 2;
    message.pos.y = h / 2;

    scene.add(message);
}

function update(ms)
{
    requestAnimationFrame(update);

    const t = ms / 1000;
    dt = t - last;
    last = t;

    // Add game logic here

}
requestAnimationFrame(update);

function makeCustomer()
{

}

function randomRange(max, min)
{

}