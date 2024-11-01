const editElements = document.getElementsByClassName("edit");
const deleteElements = document.getElementsByClassName("delete");

// to do: update DOM with new quotes
// i want to edit the quotes
// create a text field
// create a done button
// when you press the done button, send the results as a fetch put request

function editQuote() {
    fetch("/quotes", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "darth vader",
            quote: "i find your lack of faith disturbing",
        }),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => window.location.reload(true));
}

for (const el of editElements) {
    el.addEventListener("click", editQuote);
}

function deleteQuote() {
    fetch("/quotes", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "darth vader",
        }),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => window.location.reload());
}

for (const el of deleteElements) {
    el.addEventListener("click", deleteQuote);
}
