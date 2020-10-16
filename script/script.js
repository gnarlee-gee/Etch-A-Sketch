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
    `width: 100vw;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;`);

const container = document.createElement('div');
container.classList.add('container');
wrapper.appendChild(container);

container.setAttribute('style',
    `width: 50vw;
                        height: 80vh;
                        background-color: #e6e6e6;
                        display: grid;
                        grid-template-columns: repeat(auto-fill, 20px);
                        grid-template-rows: 20px 20px repeat(auto-fill, 20px)`);

// creates 1200 divs
let counter = 1;
for (let i = 1; i < 49; i++) {
    for (let j = 3; j < 28; j++) {
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

let randomColor = Math.floor(Math.random() * 16777215).toString(16);
randomColor = "#" + randomColor;

container.addEventListener('mouseenter', function () {
    if (!isDrawing) {
        const nodes = document.querySelectorAll('.container > *');
        for (let i = 0; i < nodes.length - 2; i++) {
            nodes[i].addEventListener('mouseenter', function () {
                if (nodes[i].style.backgroundColor != randomColor) {} else {
                    nodes[i].style.backgroundColor = '#363636';
                }
            })
            nodes[i].addEventListener('mouseleave', function () {
                if (nodes[i].style.backgroundColor != randomColor) {} else {
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
    for (let i = 0; i < nodes.length - 2; i++) {
        nodes[i].addEventListener('click', function () {
            nodes[i].style.backgroundColor = "#" + randomColor;
        })
        nodes[i].addEventListener('dblclick', function () {
            nodes[i].style.backgroundColor = "#" + randomColor;
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

container.addEventListener('mouseup', function () {});

const firstRow = document.createElement('div');
firstRow.classList.add('first-row');
container.appendChild(firstRow);
firstRow.setAttribute('style', 'grid-column: 1/49; grid-row: 1/3; background-color: white;')

const clearBtn = document.createElement('div');
clearBtn.classList.add('clear-btn');

clearBtn.setAttribute('style',
    `grid-column: 4/8;
                        grid-row: 1/3;
                        display: grid;
                        align-items: center; 
                        border: 2px solid #555;
                        border-radius: 50px;
                        text-align: center;
                        margin-bottom: 5px;
                        font-weight: 500;
                        color: #555`);
clearBtn.textContent = 'Erase';

clearBtn.addEventListener('click', function () {
    const nodes = document.querySelectorAll('.container > *');
    for (let i = 0; i < nodes.length - 2; i++) {
        nodes[i].style.backgroundColor = '#e6e6e6';
    }
});

container.appendChild(clearBtn);


const colors = document.createElement('div');
colors.classList.add('colors');

colors.setAttribute('style',
                    `grid-column: 21/25;
                    grid-row: 1/3;
                    display: grid;
                    align-items: center; 
                    text-align: center;
                    font-weight: 500;
                    color: #555`);
colors.textContent = 'Colors';
container.appendChild(colors);

// TODO: Write loop to create divs for colors, then make the divs be colored, create random button