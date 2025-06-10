const divCont = document.querySelector('.divCont');
const heightDivCont = divCont.offsetHeight;
const widthDivCont = divCont.offsetWidth;

let row = 16;
let column = 16;

// Button asking for numbers of button
const numBtn = document.querySelector(".numBtn");
numBtn.addEventListener('click', () => {
    let ans = prompt("How many boxes do you want? (0 - 100)");
    while (ans > 100 || ans < 0) {
        ans = prompt("Out of Range, try again.");
    }
    row = ans;
    column = ans;
    deleteChild();
    createBox();
});

function createBox() {
    for (let i = 0; i < row; i ++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('newDiv');
        
        // Fixed height for each "Div that contains divs"
        newDiv.style.height = `${heightDivCont/row}px`;

        divCont.appendChild(newDiv);
        for (let j = 0; j < column; j ++) {
            const divInsideDiv = document.createElement('div');
            divInsideDiv.classList.add('divInsideDiv');

            // Fixed width for each div
            divInsideDiv.style.width = `${widthDivCont/column}px`;
            divInsideDiv.style.height = `${newDiv.offsetHeight}px`;
            newDiv.appendChild(divInsideDiv);

            divInsideDiv.dataset.opacity = "0";

            // Change to random color
            divInsideDiv.addEventListener('mouseover', () => {
                divInsideDiv.style.backgroundColor = `rgba(${Math.floor(Math.random() * 255)},
                ${Math.floor(Math.random() * 255)},
                ${Math.floor(Math.random() * 255)}, 1)`;
            });

            // Change back to black
            divInsideDiv.addEventListener('mouseleave', () => {
                let currentOpacity = parseFloat(divInsideDiv.dataset.opacity);
                if (currentOpacity < 1) {
                    currentOpacity = Math.min(currentOpacity + 0.1, 1);
                    divInsideDiv.dataset.opacity = currentOpacity.toString();
                }
                divInsideDiv.style.backgroundColor = `rgba(0,0,0,${currentOpacity})`;
            });
        }
    }
}

function deleteChild() { 
        let child = divCont.lastElementChild;
        while (child) {
            divCont.removeChild(child);
            child = divCont.lastElementChild;
        }
}

createBox();