const container = document.querySelector('.container');

let dimension = 16;

function setPalette(dimension) {
    removePalette();
    container.setAttribute('style', `grid-template: repeat(${dimension}, 1fr) / repeat(${dimension}, 1fr);`);
    for (let index = 1; index <= dimension * dimension; index++) {
        const child = document.createElement('div');
        child.classList.add('initial-color');
        // child.textContent = index;
        // child.setAttribute('style', 'font-size: 20px')
        child.addEventListener('mouseover', () => {
            child.classList.add('change-color');
        });
        container.appendChild(child);
    }
}

function removePalette() {
    const children = document.querySelectorAll('.initial-color');
    children.forEach((child) => {
        child.remove();
    });
}


const setBtn = document.querySelector('.set');

setBtn.addEventListener('click', () => {
    do {
        if(dimension > 100) {
            dimension = prompt('Max square limit exceeded, enter a number below 100')
        } else {
            dimension = prompt('Please enter number of squares on each side of palette');
        }
    } while (dimension > 100);
    setPalette(dimension);
});


const resetBtn = document.querySelector('.reset');

resetBtn.addEventListener('click', () => {
    const children = document.querySelectorAll('.change-color');
    children.forEach((child) => {
        child.classList.remove('change-color');
    })
});


setPalette(dimension);