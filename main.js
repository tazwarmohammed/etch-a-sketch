const container = document.querySelector('.grid-container');

const resetBtn = document.querySelector('.reset');

const setBtn = document.querySelector('.set');

const normalBtn = document.querySelector('.normal');

const rgbBtn = document.querySelector('.rgb');

// const shadeBtn = document.querySelector('.shade');

const eraseBtn = document.querySelector('.erase');

let mouseDown = false;
container.onmousedown = () => (mouseDown = true);
container.onmouseup = () => (mouseDown = false);

let dimension = 16;

function setPalette(dimension) {
    removePalette();
    container.setAttribute('style', `grid-template: repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr);`);
    for (let index = 0; index < dimension * dimension; index++) {
        const child = document.createElement('div');
        child.classList.add('grid-element');
        container.appendChild(child);
    }
}

function removePalette() {
    const children = document.querySelectorAll('.grid-element');
    children.forEach((child) => {
        child.remove();
    });
}

function resetPalette() {
    // removeButtonOverlay();
    const children = document.querySelectorAll('.grid-element');
    children.forEach((child) => {
        // child.style.cssText = `background: white`;

    })
}

function initPalette() {
    removeButtonOverlay();
    do {
        if(dimension > 100) {
            dimension = prompt('Max square limit exceeded, enter a number below 100')
        } else if(dimension < 1){
            dimension = prompt('Please enter a dimension greater than 0');
        } else dimension = prompt('Please enter number of squares on each side of palette');
    } while (dimension > 100 || dimension < 1);
    setPalette(dimension);
}

function normalMode(e) {
    // if (e.type === 'mouseover' && !mouseDown) return;
    removeButtonOverlay();
    // console.log(e.target);
    e.target.classList.add('mode-on');
    // e.target.style.cssText = `background: black;`;
    const children = document.querySelectorAll('.grid-element');
    children.forEach((child) => {
        child.addEventListener('mouseover', () => {
            child.style.cssText = `background: black;`; 
        });
    });
}

function rgbMode(e) {
    
    removeButtonOverlay();
    e.target.classList.add('mode-on');
    const children = document.querySelectorAll('.grid-element');
    children.forEach((child) => {
        child.addEventListener('mouseover', () => {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            child.style.cssText = `background: #${randomColor};`; 
        });
    });
}

// function shadeMode(e) {
//     removeButtonOverlay();
//     e.target.classList.add('mode-on');
//     const children = document.querySelectorAll('.grid-element');
//     children.forEach((child) => {
//         child.addEventListener('mouseover', () => {
//             child.style.cssText = `background: rgba(0, 0, 0, 0.1);`; 
//         })
//     });
// }

function eraseMode(e) {
    removeButtonOverlay();
    e.target.classList.add('mode-on');
    const children = document.querySelectorAll('.grid-element');
    children.forEach((child) => {
        child.addEventListener('mouseover', () => {
            child.style.cssText = `background: white;`; 
        });
    });
}

function removeButtonOverlay() {
    document.querySelectorAll('button').forEach((button) => {
        button.classList.remove('mode-on');
    });
}

setBtn.addEventListener('click', initPalette);

resetBtn.addEventListener('click', resetPalette);

normalBtn.addEventListener('click', normalMode);

rgbBtn.addEventListener('click', rgbMode);

// shadeBtn.addEventListener('click', shadeMode);

eraseBtn.addEventListener('click', eraseMode);

setPalette(dimension);