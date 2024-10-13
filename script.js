let array = [];
let sortingSpeed = 50;

let stopSorting = false;  
let arrayCopy = []; 
let isSortingInProgress = false; 

function initializeArray() {
    
    array = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 300) + 1);
    arrayCopy = [...array]; // Make a copy for resetting
    drawArray(); 
}
document.getElementById("resetButton").addEventListener("click", function() {
    location.reload(); // Reload the website
});

// resetButton.addEventListener("click", () => {
//     stopSorting = true;  // Stop any ongoing sorting
//     if (isSortingInProgress) {
//         setTimeout(() => {
//             resetArray();   // Wait for ongoing sorting to stop, then reset
//             isSortingInProgress = false;  // Reset the sorting progress flag
//         }, sortingSpeed);
//     } else {
//         resetArray();  // Directly reset if no sorting is in progress
//     }
// });

// function resetArray() {
//     array = [...arrayCopy]; // Restore the original array
//     const arrayBars = document.getElementsByClassName("array-bar");
//     for (let i = 0; i < arrayBars.length; i++) {
//         arrayBars[i].style.height = `${array[i]}px`;
//         arrayBars[i].style.backgroundColor = "#6495ED"; // Reset bar color
//     }
// }


// Function to generate a new array
function generateArray() {
    const arrayContainer = document.getElementById("array-container");
    arrayContainer.innerHTML = ''; // Clear the previous array
    array = []; // Reset the array
    const arraySize = document.getElementById("arraySize").value;

    
    for (let i = 0; i < arraySize; i++) {
        const value = Math.floor(Math.random() * 400) + 5;
        array.push(value);

        
        const arrayBar = document.createElement("div");
        arrayBar.classList.add("array-bar");
        arrayBar.style.height = `${value}px`;
        arrayContainer.appendChild(arrayBar);
    }
}


function setSortingSpeed() {
    sortingSpeed = document.getElementById("sortSpeed").value;
}


async function bubbleSort() {
    if (isSortingInProgress) return; 
    isSortingInProgress = true;
    stopSorting = false;
    setSortingSpeed(); 
    const arrayBars = document.getElementsByClassName("array-bar");
    
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (stopSorting) {
                isSortingInProgress = false; 
                return; 
            }
            arrayBars[j].style.backgroundColor = "red";
            arrayBars[j + 1].style.backgroundColor = "red";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, sortingSpeed)
            );

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                arrayBars[j].style.height = `${array[j]}px`;
                arrayBars[j + 1].style.height = `${array[j + 1]}px`;
            }

            arrayBars[j].style.backgroundColor = "#6495ED";
            arrayBars[j + 1].style.backgroundColor = "#6495ED";
        }
        arrayBars[array.length - 1 - i].style.backgroundColor = "green";
    }
    arrayBars[0].style.backgroundColor = "green";
    isSortingInProgress = false; 
}

async function selectionSort() {
    stopSorting = false; arting
    const arrayBars = document.getElementsByClassName("array-bar");
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        arrayBars[minIndex].style.backgroundColor = "yellow"; 

        for (let j = i + 1; j < n; j++) {
            if (stopSorting) return; 

            arrayBars[j].style.backgroundColor = "yellow"; 
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, sortingSpeed)
            );

            if (array[j] < array[minIndex]) {
                if (minIndex !== i) {
                    arrayBars[minIndex].style.backgroundColor = "#6495ED"; 
                }
                minIndex = j;
            }
            arrayBars[j].style.backgroundColor = "#6495ED"; 
        }

        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            arrayBars[i].style.height = `${array[i]}px`;
            arrayBars[minIndex].style.height = `${array[minIndex]}px`;
            arrayBars[minIndex].style.backgroundColor = "#6495ED"; 
        }

        arrayBars[i].style.backgroundColor = "green"; 
    }
    arrayBars[n - 1].style.backgroundColor = "green"
}

async function insertionSort() {
    stopSorting = false; 
    const arrayBars = document.getElementsByClassName("array-bar");
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        arrayBars[i].style.backgroundColor = "yellow"; 

        while (j >= 0 && array[j] > key) {
            if (stopSorting) return; 

            arrayBars[j].style.backgroundColor = "yellow"; 
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, sortingSpeed)
            );

            array[j + 1] = array[j];
            arrayBars[j + 1].style.height = `${array[j + 1]}px`;
            j--;
        }
        array[j + 1] = key;
        arrayBars[j + 1].style.height = `${key}px`;
        arrayBars[j + 1].style.backgroundColor = "green"; 
    }
}



async function quickSort(low = 0, high = array.length - 1) {
    if (low < high) {
        const pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const arrayBars = document.getElementsByClassName("array-bar");
    let pivot = array[high]; 
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (stopSorting) return; 

        arrayBars[j].style.backgroundColor = "yellow"; 
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, sortingSpeed)
        );

        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            arrayBars[i].style.height = `${array[i]}px`;
            arrayBars[j].style.height = `${array[j]}px`;
        }
        arrayBars[j].style.backgroundColor = "#6495ED"; 
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    arrayBars[i + 1].style.height = `${array[i + 1]}px`;
    arrayBars[high].style.height = `${array[high]}px`;
    arrayBars[i + 1].style.backgroundColor = "green"; 
    return i + 1; 
}



async function mergeSort(left = 0, right = array.length - 1) {
    if (stopSorting) return; 
    if (left < right) {
        const middle = Math.floor((left + right) / 2);
        await mergeSort(left, middle);
        await mergeSort(middle + 1, right);
        await merge(left, middle, right);
    }
}

async function merge(left, middle, right) {
    if (stopSorting) return; 
    const arrayBars = document.getElementsByClassName("array-bar");
    let leftArray = array.slice(left, middle + 1);
    let rightArray = array.slice(middle + 1, right + 1);

    let i = 0, j = 0, k = left;
    while (i < leftArray.length && j < rightArray.length) {
        if (stopSorting) return; 
        arrayBars[k].style.backgroundColor = "yellow";
        
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, sortingSpeed)
        );

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        arrayBars[k].style.height = `${array[k]}px`;
        arrayBars[k].style.backgroundColor = "#6495ED"; 
        k++;
    }

    while (i < leftArray.length) {
        if (stopSorting) return; 
        array[k] = leftArray[i];
        arrayBars[k].style.height = `${array[k]}px`;
        i++;
        k++;
    }

    while (j < rightArray.length) {
        if (stopSorting) return; 
        array[k] = rightArray[j];
        arrayBars[k].style.height = `${array[k]}px`;
        j++;
        k++;
    }

    for (let idx = left; idx <= right; idx++) {
        if (stopSorting) return; 
        arrayBars[idx].style.backgroundColor = "green"; 
    }
}



async function heapSort() {
    stopSorting = false; 
    const arrayBars = document.getElementsByClassName("array-bar");
    const n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (stopSorting) return; 
        await heapify(n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        if (stopSorting) return; 
        [array[0], array[i]] = [array[i], array[0]];
        arrayBars[0].style.height = `${array[0]}px`;
        arrayBars[i].style.height = `${array[i]}px`;
        arrayBars[i].style.backgroundColor = "green";

        await heapify(i, 0);
    }
    
    arrayBars[0].style.backgroundColor = "green"; 
}

async function heapify(n, i) {
    if (stopSorting) return;
    const arrayBars = document.getElementsByClassName("array-bar");
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }
    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        arrayBars[i].style.height = `${array[i]}px`;
        arrayBars[largest].style.height = `${array[largest]}px`;

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, sortingSpeed)
        );

        await heapify(n, largest);
    }
}

async function insertionSort() {
    stopSorting = false; 
    const arrayBars = document.getElementsByClassName("array-bar");
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        arrayBars[i].style.backgroundColor = "yellow";

        
        while (j >= 0 && array[j] > key) {
            if (stopSorting) return; 

            arrayBars[j].style.backgroundColor = "yellow";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, sortingSpeed)
            );

            array[j + 1] = array[j];
            arrayBars[j + 1].style.height = `${array[j + 1]}px`;
            arrayBars[j].style.backgroundColor = "#6495ED"; 
            j--;
        }
        array[j + 1] = key;
        arrayBars[j + 1].style.height = `${key}px`;

        for (let k = 0; k <= i; k++) {
            arrayBars[k].style.backgroundColor = "green";
        }
    }
}

