const container = document.querySelector('.container');

for (let index = 0; index < 256; index++) {
    const child = document.createElement('div');
    child.classList.add('initial-color');
    child.textContent = index;
    child.addEventListener('mouseover', () => {
        child.classList.add('change-color');
    });
    container.appendChild(child);
}

const button = document.querySelector('button');

button.addEventListener('click', ()=> {
    const children = document.querySelectorAll('.change-color');
    children.forEach((child) => {
        child.classList.remove('change-color');
    })
});