document.addEventListener("DOMContentLoaded", function() {
    // Get references to DOM elements
    const itemInput = document.getElementById("itemInput");
    const addItemButton = document.getElementById("addItemButton");
    const clearListButton = document.getElementById("clearListButton");
    const shoppingList = document.getElementById("shoppingList");

    // Retrieve the list from local storage or initialize an empty array
    let itemsArray = JSON.parse(localStorage.getItem('shoppingList')) || [];

    // Function to save the current items array to local storage
    function storeinlocal() {
        localStorage.setItem('shoppingList', JSON.stringify(itemsArray));
    }

    // Function to render the list in the DOM
    function LoadList() {
        // Clear the current list in the DOM
        shoppingList.innerHTML = '';

        // Iterate through itemsArray and create list items
        itemsArray.forEach((item, index) => {
            // Create a list item element
            const li = document.createElement('li');
            li.className = item.purchased ? 'purchased' : '';

            // Create a span element for the item name
            const span = document.createElement('span');
            span.contentEditable = true; // Make the span editable
            span.textContent = item.name; // Set the text content of the span
            span.addEventListener('blur', () => editItem(index, span.textContent)); // Save changes on blur

            // Create a button to toggle purchased status
            const markButton = document.createElement('button');
            markButton.textContent = item.purchased ? 'Unmark' : 'Mark Purchased'; // Set button text
            markButton.className = 'edit'; // Set button class
            markButton.addEventListener('click', () => togglePurchased(index)); // Add click event listener

            // Create a button to delete the item
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete'; // Set button text
            deleteButton.className = 'delete'; // Set button class
            deleteButton.addEventListener('click', () => deleteItem(index)); // Add click event listener

            // Append the span and buttons to the list item
            li.appendChild(span);
            li.appendChild(markButton);
            li.appendChild(deleteButton);

            // Append the list item to the shopping list
            shoppingList.appendChild(li);
        });
    }

    // Function to edit an item
    function editItem(index, newName) {
        itemsArray[index].name = newName; // Update the item name
        storeinlocal(); // Save changes to local storage
    }

    // Function to toggle the purchased status of an item
    function togglePurchased(index) {
        itemsArray[index].purchased = !itemsArray[index].purchased; // Toggle purchased status
        storeinlocal(); // Save changes to local storage
        LoadList(); 
    }

    // Function to delete an item
    function deleteItem(index) {
        itemsArray.splice(index, 1); // Remove the item from the array
        storeinlocal(); // Save changes to local storage
        LoadList(); 
    }

    // Event listener for the add item button
    addItemButton.addEventListener('click', () => {
        const itemName = itemInput.value.trim(); // Get the input value and trim whitespace
        if (itemName) {
            itemsArray.push({ name: itemName, purchased: false }); // Add new item to the array
            itemInput.value = ''; // Clear the input field
            storeinlocal(); // Save changes to local storage
            LoadList(); 
        }
    });

    // Event listener for the clear list button
    clearListButton.addEventListener('click', () => {
        itemsArray = []; // Clear the items array
        storeinlocal(); // Save changes to local storage
        LoadList(); 
    });

    // Initial render of the list
    LoadList();
});
