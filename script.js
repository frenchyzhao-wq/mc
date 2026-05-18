let numbersEntered = [];
let currentInput = "";

function pressKey(key) {
    const screen = document.getElementById("display");

    if (key === 'AC') {
        numbersEntered = [];
        currentInput = "";
        screen.innerText = "0";
        return;
    }

    if (!isNaN(key) || key === '.') {
        currentInput += key;
        screen.innerText = currentInput;
    }

    if (key === '×') {
        if (currentInput !== "") {
            numbersEntered.push(currentInput);
            currentInput = ""; 
        }
    }

    if (key === '=') {
        if (currentInput !== "") {
            numbersEntered.push(currentInput);
        }

        // Check if condition matches: exactly three numbers, each 4 digits long
        if (numbersEntered.length === 3 && numbersEntered.every(num => num.length === 4)) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');

            const liveTimestamp = `${year}${month}${day}${hours}${minutes}`;
            screen.innerText = Number(liveTimestamp).toLocaleString();
        } else {
            // Dummy logic: if conditions are missed, output a random fallback calculation
            screen.innerText = "Error"; 
        }
        numbersEntered = [];
        currentInput = "";
    }
}
