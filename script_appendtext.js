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

        // Retrieve the existing file content
        fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.content) {
                // Decode the base64 encoded content
                const existingContent = atob(data.content);

                // Modify the existing content
                const updatedContent = existingContent + "\n" + content;

                // Prepare the request payload
                const payload = {
                    message: "Update file",
                    content: btoa(updatedContent), // Encode the updated content as base64
                    sha: data.sha // Include the file's current SHA
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
            } else {
                console.log("File not found!");
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
