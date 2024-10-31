const editElements = document.getElementsByClassName("edit");

function editQuote() {
    fetch("/quotes", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "darth vader",
            quote: "i find your lack of faith disturbing",
        }),
    });
}

for (const el of editElements) {
    el.addEventListener("click", editQuote);
}

// i want to edit the quotes
// create a text field
// create a done button
// when you press the done button, send the results as a fetch put request
//
