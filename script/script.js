const font = document.createElement('link');
font.rel = 'stylesheet';
font.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap';
document.head.appendChild(font);

document.body.style = 'font-family: "Roboto", sans-serif;';

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
menuClass.setAttribute('style', 'display: flex; width: 500px; height: 50px; align-self: start;')

const eraseBtn = document.createElement('button');
eraseBtn.classList.add('erase-btn');
eraseBtn.textContent = 'Erase';
menuBar.appendChild(eraseBtn);
const eraseClass = document.querySelector('.erase-btn');
eraseClass.setAttribute('style',
    `height: 30px; 
                        width: 75px;
                        display: flex; 
                        text-align: center; 
                        align-self: center;
                        border: 2px solid #b5b5b5; 
                        border-radius: 20px;
                        margin: 15px;
                        justify-content: center;
                        align-items: center;
                        font-size: 14px;
                        font-weight: bold;
                        background-color: #00eeff;
                        color: white;`);


const container = document.createElement('div');
container.classList.add('container');
wrapper.appendChild(container);

let gridSize;
let grid = 20;
if (sessionStorage.getItem(gridSize)) {
    grid = parseInt(sessionStorage.getItem(gridSize));
    console.log('grid is ', grid)
}
console.log(grid)

container.setAttribute('style',
    `background-color: #e6e6e6;
                       height: 500px;
                       width: 500px;
                        display: grid;
                        user-drag: none;
                        user-select: none;
                        grid-template-columns: repeat(${grid}, 1fr);
                        grid-template-rows: repeat(${grid}, 1fr)`);


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

let r = Math.floor(Math.random() * (255 - 0 + 1) + 0);
let g = Math.floor(Math.random() * (255 - 0 + 1) + 0);
let b = Math.floor(Math.random() * (255 - 0 + 1) + 0);

let randomColor = `rgb(${r + ", " + g + ", " + b})`;
console.log(randomColor)

container.addEventListener('mouseenter', function () {
    if (!isDrawing) {
        const nodes = document.querySelectorAll('.container > *');
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener('mouseenter', function () {
                if (nodes[i].style.backgroundColor == randomColor) {} else {
                    nodes[i].style.backgroundColor = '#363636';
                }
            })
            nodes[i].addEventListener('mouseleave', function () {
                if (nodes[i].style.backgroundColor == randomColor) {} else {
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
            nodes[i].style.backgroundColor = randomColor;
        })
        nodes[i].addEventListener('dblclick', function () {
            nodes[i].style.backgroundColor = randomColor;
        })
        nodes[i].addEventListener('mouseenter', function () {
            if (isDrawing === true) {
                nodes[i].style.backgroundColor = randomColor;
            }
        })
        nodes[i].addEventListener('mouseup', function () {
            if (isDrawing === true) {
                isDrawing = false;
            }
        })
    }
})

// container.addEventListener('mouseup', function () {});

// const firstRow = document.createElement('div');
// firstRow.classList.add('first-row');
// container.appendChild(firstRow);
// firstRow.setAttribute('style', 'grid-column: 1/101; grid-row: 1/3; background-color: white;')

// const clearBtn = document.createElement('div');
// clearBtn.classList.add('clear-btn');

// clearBtn.setAttribute('style',
//     `grid-column: span 10;
//                         grid-row: 1/3;
//                         display: grid;
//                         align-items: center; 
//                         border: 2px solid #555;
//                         border-radius: 50px;
//                         text-align: center;
//                         margin: 10px;
//                         font-weight: 500;
//                         color: #555`);
// clearBtn.textContent = 'Erase';

eraseBtn.addEventListener('click', function () {
    const nodes = document.querySelectorAll('.container > *');
    for (let i = 0; i < nodes.length - 3; i++) {
        nodes[i].style.backgroundColor = '#e6e6e6';
    }
    let newSize = 101;
    while (newSize > 100) {
        newSize = parseInt(prompt('What size would you like the board? \n(Max value: 100)'));
        sessionStorage.setItem(gridSize, newSize);
    }
    window.location.reload();
});

// container.appendChild(clearBtn);


// const colors = document.createElement('div');
// colors.classList.add('colors');

// colors.setAttribute('style',
//                     `grid-column: span 10;
//                     grid-row: 1/3;
//                     display: grid;
//                     align-items: center; 
//                     text-align: center;
//                     font-weight: 500;
//                     color: #555`);
// colors.textContent = 'Colors';
// container.appendChild(colors);

// TODO: Write loop to create divs for colors, then make the divs be colored, create random button