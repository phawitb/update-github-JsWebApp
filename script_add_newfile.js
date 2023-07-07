// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    const form = document.getElementById("updateForm");

    // Handle form submission
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get user input values
        const token = document.getElementById("token").value;
        const owner = document.getElementById("owner").value;
        const repo = document.getElementById("repo").value;
        const filePath = document.getElementById("filePath").value;
        const content = document.getElementById("content").value;

        // Prepare the request payload
        const payload = {
            message: "Update file",
            content: btoa(content) // Encode the content as base64
        };

        // Send the update request
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.content) {
                console.log("File updated successfully!");
            } else {
                console.log("File update failed!");
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
