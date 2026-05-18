let numbersEntered = [];
let currentInput = "";

function pressKey(key) {
    const screen = document.getElementById("display");

    // 1. Reset everything if AC is pressed
    if (key === 'AC') {
        numbersEntered = [];
        currentInput = "";
        screen.innerText = "0";
        return;
    }

    // 2. Handle digit entries (Keep them on screen normally)
    if (!isNaN(key) || key === '.') {
        // Prevent adding multiple decimals
        if (key === '.' && currentInput.includes('.')) return;
        
        currentInput += key;
        screen.innerText = currentInput;
        return; 
    }

    // 3. Handle multiplication (Store the number and prepare for next)
    if (key === '×') {
        if (currentInput !== "") {
            numbersEntered.push(currentInput);
            currentInput = ""; // Clear screen buffer for the next entry
        }
        return;
    }

    // 4. Handle other math operators so they don't break the app layout
    if (key === '+' || key === '-') {
        numbersEntered = []; // Reset secret tracking if they choose wrong math
        currentInput = "";
        screen.innerText = "0";
        return;
    }

    // 5. Handle the Equals sign (The Core Magic Trigger)
    if (key === '=') {
        if (currentInput !== "") {
            numbersEntered.push(currentInput);
        }

        // EXACT MATCH: Must be exactly 3 numbers, and each must be exactly 4 digits long
        if (numbersEntered.length === 3 && numbersEntered.every(num => num.length === 4)) {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');

            // Combines to format: YYYYMMDDHHMM (e.g., 202605181519)
            const liveTimestamp = `${year}${month}${day}${hours}${minutes}`;
            screen.innerText = Number(liveTimestamp).toLocaleString();
        } else {
            // FALLBACK: Displays an error if they don't do the 4-digit trick
            screen.innerText = "Error"; 
        }

        // Clean slate for the next performance
        numbersEntered = [];
        currentInput = "";
    }
}
