let dt = 0;
let last = 0;
const width = 1300;
const height = 700;
const renderer = new CanvasRenderer(1300, 700);
const container = new Container();
//loadTitle();
transition();

function loadTitle()
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
        // else
        //     container.remove(message);
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

    // const uiBox = new UIBox(
    //     100,
    //     100,
    //     100,
    //     100
    // )


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
        console.log(i * width / 20)
        //console.log(i * (20 / width))
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
    container.update();
    renderer.render(container);

}
requestAnimationFrame(update);

function makeCustomer()
{

}

function randomRange(max, min)
{

}