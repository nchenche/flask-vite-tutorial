
import { postFormData, fetchSuggestions } from '../services/api.js'


/**
 * Adds a value to the values array and updates the UI list if the value is unique.
 * 
 * @param {string} val - The value to add.
 * @param {Array} values - The array of existing values.
 * @param {HTMLElement} ul - The unordered list (UL) element to update the UI.
 */
function addValueToList(val, values, ul) {
    if (!values.includes(val)) {
        values.push(val);

        // Add the value to the UI list
        const li = document.createElement('li');
        li.innerHTML = `<span class="badge bg-secondary">${val}</span>`;
        li.className = 'list-group-item';
        ul.appendChild(li);
    }
}

export function setupHPOInput() {

    const form = document.getElementById('multiValueForm');
    const ul = document.getElementById('HPOvalueList');
    const inputField = document.getElementById('HPOValues');
    const addButton = document.getElementById('addHPOValue');
    const submitButton = document.getElementById('submitHPOs');
    const suggestionList = document.getElementById('suggestionList');

    const values = [];


    // Populate suggestions in the list
    function renderSuggestions(suggestions) {
        suggestionList.innerHTML = ''; // Clear existing suggestions
        suggestions.forEach((item) => {
            const option = document.createElement('button');
            option.type = 'button';
            option.classList.add('list-group-item', 'list-group-item-action');
            option.textContent = `${item.id} - ${item.name}`;
            option.dataset.id = item.id; // Store the HPO ID
            suggestionList.appendChild(option);

            // Add click handler to select suggestion
            option.addEventListener('click', () => {
                addValueToList(item.id, values, ul);
                inputField.value = ''; // Clear the input field
                suggestionList.innerHTML = ''; // Clear suggestions
            });
        });
    }

    addButton.addEventListener('click', () => {
        const input = inputField.value.trim();

        // Split input by "," and filter out empty strings
        const newValues = input.split(',').map(val => val.trim()).filter(val => val);

        // Add new values to the array, avoiding duplicates
        newValues.forEach(val => { addValueToList(val, values, ul) });

        // Clear the input field
        inputField.value = '';
    });

    // Reset handler to clear UL content and values
    form.addEventListener('reset', () => {
        ul.innerHTML = ''; // Clear the list content
        values.length = 0; // Clear the array
    });

    // Prevent default form submission (i.e. page reload) 
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
    });

    // Post data to backend server
    submitButton.addEventListener('click', async (event) => {
        // Log the collected form data (values debugging)
        console.log("values", values);
        const result = await postFormData(values);
        console.log(result);
    });


    // Handle input event
    let timeout; // For debouncing API calls
    inputField.addEventListener('input', () => {
        const query = inputField.value.trim();
        console.log(query)
        if (query.length < 3) {
            suggestionList.innerHTML = ''; // Clear suggestions if query is too short
            return;
        }

        // Debounce API calls
        clearTimeout(timeout);
        timeout = setTimeout(async () => {
            const suggestions = await fetchSuggestions(query);
            renderSuggestions(suggestions);
        }, 150); // Wait 150ms after the user stops typing
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (event) => {
        if (!suggestionList.contains(event.target) && event.target !== inputField) {
            suggestionList.innerHTML = ''; // Clear suggestions
        }
    });
};


// Automatically initialize the functionality when imported
setupHPOInput();