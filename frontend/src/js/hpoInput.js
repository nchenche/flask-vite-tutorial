
import '../scss/styles.scss';
import '../css/styles.css'


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('multiValueForm');
    const ul = document.getElementById('HPOvalueList');

    const inputField = document.getElementById('HPOValues');
    const addButton = document.getElementById('addHPOValue');
    const submitButton = document.getElementById('submitHPOs');

    const values = [];

    addButton.addEventListener('click', () => {
        const input = inputField.value.trim();

        // Split input by "," and filter out empty strings
        const newValues = input.split(',').map(val => val.trim()).filter(val => val);

        // Add new values to the array, avoiding duplicates
        newValues.forEach(val => {
            if (!values.includes(val)) {
                values.push(val);

                // Add the value to the UI list
                const li = document.createElement('li');
                li.innerHTML = `<span class="badge bg-secondary">${val}</span>`
                li.className = 'list-group-item'
                ul.appendChild(li);
            }
        });

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


    submitButton.addEventListener('click', async (event) => {
        // Log the collected form data (values debugging)
        console.log("values", values);

        // Send the form data to the server
        try {
            const response = await fetch("http://0.0.0.0:5000/api/process-form-data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values), // Convert to JSON string
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log("Server response:", result);

        } catch (error) {
            console.error("Submission error:", error);
            alert("An error occurred while submitting the form.");
        }
    });


    // const inputField = document.getElementById('HPOValues');
    const suggestionList = document.getElementById('suggestionList');

    let timeout; // For debouncing API calls

    // Fetch suggestions from the API
    async function fetchSuggestions(query) {
        const url = `https://ontology.jax.org/api/hp/search?q=${encodeURIComponent(query)}&page=0&limit=20`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch suggestions');
            }
            const data = await response.json();
            console.log(data);
            return data?.terms || [];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

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
                inputField.value = item.id; // Set the input field to the selected value
                suggestionList.innerHTML = ''; // Clear suggestions
            });
        });
    }

    // Handle input event
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
        }, 150); // Wait 300ms after the user stops typing
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', (event) => {
        if (!suggestionList.contains(event.target) && event.target !== inputField) {
            suggestionList.innerHTML = ''; // Clear suggestions
        }
    });


});

