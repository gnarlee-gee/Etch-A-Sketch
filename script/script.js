const font = document.createElement('link');
font.rel = 'stylesheet';
font.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap';
document.head.appendChild(font);

document.body.style = 'font-family: "Roboto", sans-serif;';
document.body.style.backgroundColor = '#ff2b2b';

const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

document.body.appendChild(wrapper);

const wrapperClass = document.querySelector('.wrapper');
wrapperClass.setAttribute('style',
    `width: 500px;
                        height: 550px;
                        margin: 0 auto;
                        margin-top: 50px;
                        display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;`);


const menuBar = document.createElement('div');
menuBar.classList.add('menu-bar');
wrapper.appendChild(menuBar);
const menuClass = document.querySelector('.menu-bar');
menuClass.setAttribute('style',
    `display: flex; 
                        width: 500px; 
                        height: 50px; 
                        align-self: start; 
                        justify-content: space-between; 
                        background-color: LightBlue; 
                        border-top-left-radius: 20px;
                        border-top-right-radius: 20px;`)

const eraseBtn = document.createElement('button');
eraseBtn.classList.add('erase-btn');
eraseBtn.textContent = 'Erase';
menuBar.appendChild(eraseBtn);
const eraseClass = document.querySelector('.erase-btn');
eraseClass.setAttribute('style',
    `height: 30px; 
                        width: 65px;
                        display: flex; 
                        text-align: center; 
                        align-self: center;
                        border-radius: 10px;
                        margin: 15px;
                        justify-content: center;
                        align-items: center;
                        font-size: 14px;
                        font-weight: bold;
                        background-color: LightSlateGrey;
                        color: BlueViolet;
                        cursor:pointer;`
);

const randomColorBtn = document.createElement('button');
randomColorBtn.textContent = 'Random Color';
randomColorBtn.classList.add('random-btn');
menuBar.appendChild(randomColorBtn);

const randomClass = document.querySelector('.random-btn');

randomClass.setAttribute('style',
    `width: 15%; 
                        height: 80%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-left: 120px;
                        margin-bottom: 5px;
                        margin-top: 5px;
                        background-color: Gold;
                        color: BlueViolet;
                        font-size: 10px;
                        font-weight: bold;
                        border-radius: 20px;
                        text-align: center;`
);

randomColorBtn.addEventListener('mouseenter', function() {
    randomColorBtn.style.backgroundColor = 'DarkGoldenRod';
})

randomColorBtn.addEventListener('mouseleave', function() {
    randomColorBtn.style.backgroundColor = 'Gold';
})


let penColor = ['rgb(0, 133, 104)'];
randomColorBtn.addEventListener('click', function() {
    let r = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    let g = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    let b = Math.floor(Math.random() * (255 - 0 + 1) + 0);
    penColor.push(`rgb(${r + ", " + g + ", " + b})`);
})



const colorArray = [
    ['black', 'DarkGrey', 'Green', 'MediumPurple', 'DodgerBlue', 'Chocolate'],
    ['Azure', 'Red', 'Yellow', 'DarkTurquoise', 'DarkOrange', 'DeepPink']
]
const rgbColorArray = [['rgb(0, 0, 0)',],[]]

const colorMenu = document.createElement('div');
colorMenu.setAttribute('style',
    `width: 30%; 
                        height: 80%;
                        margin-left: 20px;
                        display: grid;
                        align-self: flex-end;
                        margin-right: 40px;
                        margin-bottom: 5px; 
                        grid-template-columns: repeat(6, 1fr);
                        grid-template-rows: repeat(2, 1fr);`);
menuBar.appendChild(colorMenu);
for (let i = 1; i < 3; i++) {
    for (let j = 1; j < 7; j++) {
        const color = document.createElement('div');
        color.classList.add(`color-row${i}-column${j}-${colorArray[i-1][j-1]}`);
        colorMenu.appendChild(color);
        color.setAttribute('style',
            `grid-column: ${j}/${j+1};
                            grid-row: ${i}/${i+1};
                            background-color: ${colorArray[i-1][j-1]};
                            border: 2px solid LightBlue;
                            border-radius: 40%;`);
        const colorButton = document.querySelector(`.color-row${i}-column${j}-${colorArray[i-1][j-1]}`);
        colorButton.addEventListener('click', function(){
            penColor.push(`${rgbColorArray[i-1][j-1]}`)
        })
    }
}
// get the rgb values of the named colors and push them as a rgb() string above
// https://www.w3schools.com/cssref/css_colors.asp





const container = document.createElement('div');
container.classList.add('container');
wrapper.appendChild(container);

let gridSize;
let grid = 20;
if (sessionStorage.getItem(gridSize)) {
    grid = parseInt(sessionStorage.getItem(gridSize));
}

container.setAttribute('style',
    `background-color: #e6e6e6;
                       height: 500px;
                       width: 500px;
                        display: grid;
                        user-drag: none;
                        user-select: none;
                        grid-template-columns: repeat(${grid}, 1fr);
                        grid-template-rows: repeat(${grid}, 1fr)`
);


// creates 1200 divs
let counter = 1;
for (let i = 1; i < grid + 1; i++) { //columns
    for (let j = 1; j < grid + 1; j++) { //rows
        const div = document.createElement('div');
        div.classList.add(`item-${counter++}`);
        div.setAttribute('style',
            `grid-column: ${i}/${i+1};
                        grid-row: ${j}/${j+1};`);
        container.appendChild(div);
    }
}

let isDrawing = false;

wrapper.addEventListener('mouseup', function () {
    isDrawing = false;
})

container.addEventListener('mouseenter', function () {
    if (!isDrawing) {
        const nodes = document.querySelectorAll('.container > *');
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener('mouseenter', function () {
                if (penColor.includes(nodes[i].style.backgroundColor)){} else {
                    nodes[i].style.backgroundColor = '#363636';
                }
            })
            nodes[i].addEventListener('mouseleave', function () {
                if (penColor.includes(nodes[i].style.backgroundColor)) {} else {
                    setTimeout(function () {
                        nodes[i].style.backgroundColor = '#e6e6e6';
                    }, 50);
                }
            })
        }
    }
})

container.addEventListener('mousedown', function () {
    isDrawing = true; 
    const nodes = document.querySelectorAll('.container > *');
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].addEventListener('click', function () {
            nodes[i].style.backgroundColor = penColor[penColor.length - 1];
        })
        nodes[i].addEventListener('dblclick', function () {
            nodes[i].style.backgroundColor = penColor[penColor.length - 1];
        })
        nodes[i].addEventListener('mouseenter', function () {        
            if (isDrawing === true) {
                nodes[i].style.backgroundColor = penColor[penColor.length - 1];
            }
        })
        container.addEventListener('mouseleave', function () {
                isDrawing = false;
        })

    }
})

eraseBtn.addEventListener('click', function () {
    const nodes = document.querySelectorAll('.container > *');
    for (let i = 0; i < nodes.length - 3; i++) {
        nodes[i].style.backgroundColor = '#e6e6e6';
    }
    let newSize = 101;
    while (newSize > 100) {
        newSize = parseInt(prompt('What size would you like the board? \n(Max value: 100)'));
        if (newSize < 1) {
            alert('Must be greater than 0!');
            newSize = 101;
        }
        sessionStorage.setItem(gridSize, newSize);
    }
    window.location.reload();
});

eraseBtn.addEventListener('mouseenter', function () {
    eraseBtn.style.backgroundColor = 'LightGray';

})

eraseBtn.addEventListener('mouseleave', function () {
    eraseBtn.style.backgroundColor = 'LightSlateGray';

})
