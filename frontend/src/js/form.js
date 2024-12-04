// Import Bootstrap SCSS (compiled into CSS by Vite)
import '../scss/styles.scss';

// Import all of Bootstrap's JavaScript
// import * as bootstrap from 'bootstrap';


document.querySelector("form").addEventListener("submit", async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form element
    const form = event.target;

    // Create a FormData object from the form
    const formData = new FormData(form);

    // Convert FormData to a plain object (optional, for readability)
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    // Log the collected form data (for debugging)
    // console.log("Form Data:", formObject);


    // Send the form data to the server
    try {
        // const response = await fetch("http://0.0.0.0:5000/api/process-data", {
        //     method: "POST",
        //     body: formData
        // });

        const response = await fetch("http://0.0.0.0:5000/api/process-form-data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formObject), // Convert to JSON string
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
