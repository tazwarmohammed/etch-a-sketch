const container = document.querySelector('.container');

for (let index = 0; index < 256; index++) {
    const child = document.createElement('div');   
    child.style.cssText = 'color: blue; background: pink; border: 2px solid #000;';
    child.textContent = index;
    container.appendChild(child);
}