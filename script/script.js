const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

document.body.appendChild(wrapper);

const wrapperClass = document.querySelector('.wrapper');
wrapperClass.setAttribute('style', 
                        `width: 100vw;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: red;`)

const container = document.createElement('div');
container.classList.add('container');
wrapper.appendChild(container);

container.setAttribute('style',
                        `width: 50vw;
                        height: 80vh;
                        background-color: blue;
                        display: grid;
                        grid-template-columns: repeat(auto-fill, 20px);
                        grid-template-rows: 40px repeat(auto-fill, 20px); `)

// creates 1200 divs
let counter = 1;
for (let i = 1; i < 49; i++){
    for (let j = 2; j < 27; j++){
        const div = document.createElement('div');
        div.classList.add(`item-${counter++}`);
        div.setAttribute('style',
                        `grid-column: ${i}/${i+1};
                        grid-row: ${j}/${j+1};`)
        container.appendChild(div);
    }
}
