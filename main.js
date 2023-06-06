const container = document.querySelector('.grid-container');

const resetBtn = document.querySelector('.reset');

const setBtn = document.querySelector('.set');

const normalBtn = document.querySelector('.normal');

const rgbBtn = document.querySelector('.rgb');

const shadeBtn = document.querySelector('.shade');

const eraseBtn = document.querySelector('.erase');

let mode;

let mouseDown = false;
container.onmousedown = () => (mouseDown = true);
container.onmouseup = () => (mouseDown = false);

let dimension = 16;

function setPalette(dimension) {
    removePalette();
    container.setAttribute('style', `grid-template: repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr);`);
    for (let index = 0; index < dimension * dimension; index++) {
        const child = document.createElement('div');
        // child.style.cssText = `background: white;`;
        child.classList.add('pixel');
        child.addEventListener('mouseover', changeColor);
        container.appendChild(child);
    }
}

function changeColor(e) {
    if (!mouseDown) return;
    if(mode === 'normal') {
        e.target.style.cssText = `background: black;`;
    } else if(mode === 'rgb') {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        e.target.style.cssText = `background: #${randomColor};`;
    } else if(mode === 'shade') {
        addBlack(e.target, 0);
    } else if(mode === 'erase') {
        e.target.style.cssText = `background: white;`;
    }
}

function addBlack(child, hoverCount) {
    if (hoverCount < 10) {
        const currentColor = window.getComputedStyle(child).backgroundColor;
        const rgbValues = currentColor.match(/\d+/g);

        let r = parseInt(rgbValues[0]);
        let g = parseInt(rgbValues[1]);
        let b = parseInt(rgbValues[2]);
    
        // Calculate new color with 10% black
        r -= Math.round(0.1 * 255);
        g -= Math.round(0.1 * 255);
        b -= Math.round(0.1 * 255);

        child.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

        hoverCount++;
    }
}

function removePalette() {
    const children = document.querySelectorAll('.pixel');
    children.forEach((child) => {
        child.remove();
    });
}

function resetPalette() {
    removeButtonOverlay();
    mode = 'none';
    container.childNodes.forEach((child) => {
        child.style.cssText = `background: white`;
    });
}

function initPalette() {
    removeButtonOverlay();
    do {
        if(dimension > 100) {
            dimension = prompt('Max square limit exceeded, enter a number below 100')
        } else if(dimension < 2){
            dimension = prompt('Please enter a dimension greater than 1');
        } else dimension = prompt('Please enter number of squares on each side of palette');
    } while (dimension > 100 || dimension < 2);
    setPalette(dimension);
}

function normalMode(e) {
    removeButtonOverlay();
    e.target.style.cssText = `background: rgb(153, 153, 153);`;
    mode = 'normal';
}

function rgbMode(e) {
    removeButtonOverlay();
    e.target.style.cssText = `background: rgb(153, 153, 153);`;
    mode = 'rgb';
}

function shadeMode(e) {
    removeButtonOverlay();
    e.target.style.cssText = `background: rgb(153, 153, 153);`;
    mode = 'shade';
}

function eraseMode(e) {
    removeButtonOverlay();
    e.target.style.cssText = `background: rgb(153, 153, 153);`;
    mode = 'erase';
}

function removeButtonOverlay() {
    document.querySelectorAll('button').forEach((button) => {
        button.style.cssText = `background: white;`;
    });
}

setBtn.addEventListener('click', initPalette);

resetBtn.addEventListener('click', resetPalette);

normalBtn.addEventListener('click', normalMode);

rgbBtn.addEventListener('click', rgbMode);

shadeBtn.addEventListener('click', shadeMode);

eraseBtn.addEventListener('click', eraseMode);

setPalette(dimension);