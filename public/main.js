const editElements = document.getElementsByClassName("edit");
const deleteElements = document.getElementsByClassName("delete");

// when the edit button is clicked, the editform function is called
// a form is created where the user can edit the quote,
//      this takes the place of the span that was previously there
//      a user can either submit or cancel their edits
// when the user clicks the submit button, a put request is sent to the server to update the quote

function editQuoteRequest({ id, newName, newQuote }) {
    fetch("/quotes", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: id,
            name: newName,
            quote: newQuote,
        }),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => window.location.reload(true));
}

function createEditForm(el) {
    const quoteLi = el.closest("li");
    const quoteName = quoteLi.querySelector(".name-text");
    const quoteText = quoteLi.querySelector(".quote-text");
    const editButton = quoteLi.querySelector(".edit");
    const deleteButton = quoteLi.querySelector(".delete");

    // create an input where the spans were with the contents of the name and the quote
    quoteName.innerHTML = `<input type="text" class="name-edit" value="${quoteName.textContent}" ></input>`;
    quoteText.innerHTML = `<input type="text" class="quote-edit" value="${quoteText.textContent}"></input>`;

    // replace edit and delete buttons with save and cancel edit buttons
    editButton.outerHTML = `<button class="save-edit">Save</button>`;
    deleteButton.outerHTML = `<button class="cancel-edit">Cancel</button>`;

    // when the user clicks save, submit a put request with the contents of the name and the quote
    // when the user clicks cancel, revert the changes
    const saveEditButton = quoteLi.querySelector(".save-edit");
    const cancelEditButton = quoteLi.querySelector(".cancel-edit");
    saveEditButton.addEventListener("click", () => {
        const newName = quoteLi.querySelector(".name-edit").value;
        const newQuote = quoteLi.querySelector(".quote-edit").value;
        editQuoteRequest({
            id: quoteLi.id,
            newName,
            newQuote,
        });
    });

    cancelEditButton.addEventListener("click", () => {
        quoteName.innerHTML = `<span class="name-text">${quoteName.textContent}</span>`;
        quoteText.innerHTML = `<span class="quote-text">${quoteText.textContent}</span>`;
        editButton.outerHTML = `<button class="edit">Edit</button>`;
        deleteButton.outerHTML = `<button class="delete">Delete</button>`;
    });
}

for (const el of editElements) {
    el.addEventListener("click", () => createEditForm(el));
}

function deleteQuoteRequest(elementName) {
    fetch("/quotes", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: elementName,
        }),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        // to do: update the DOM instead of reload
        .then((data) => window.location.reload());
}

for (const el of deleteElements) {
    const deleteItemName =
        el.parentElement.parentElement.firstElementChild.textContent;

    el.addEventListener("click", () => deleteQuoteRequest(deleteItemName));
}
