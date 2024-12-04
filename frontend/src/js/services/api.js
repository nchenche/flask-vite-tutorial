// POST data to backend server
export async function postFormData(data) {
    const url = "http://0.0.0.0:5000/api/process-form-data";

    // Send the form data to the server
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data), // Convert to JSON string
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Submission error:", error);
        alert("An error occurred while submitting the form.");
    }
}


// Fetch suggestions from the API
export async function fetchSuggestions(query) {
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