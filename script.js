document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const apiKey = 'AIzaSyAEPhP2WIbEoFZNPQJ-0_WN8PPu5MnnWm8';
    const input = document.getElementById('user-input');
    const submitButton = document.querySelector('button[type="submit"]'); // Assuming you have a submit button
    const message = input.value.trim();
    if (!message) return;

    addMessage('User', message);
    input.value = ''; // Clear input field after sending message
    submitButton.disabled = true; // Disable the button to prevent another submit

    const data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": message
                    }
                ]
            }
        ]
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorDetails)}`);
        }

        const result = await response.json();
        const botReply = result.candidates[0]?.content?.parts[0]?.text || "Sorry, I don't have a response.";
        addMessage('Bot', botReply);

    } catch (error) {
        console.error('Error making API request:', error.message);
        addMessage('Bot', `Error processing your request: ${error.message}`);
    } finally {
        submitButton.disabled = false; // Re-enable the submit button once the request is complete
    }
});

function addMessage(sender, message) {
    const messages = document.getElementById('messages');
    const div = document.createElement('div');

    var converter = new showdown.Converter();
    var htmlMessage = converter.makeHtml(message); // Markdown to HTML conversion

    div.classList.add( 'p-2', 'mb-2', 'rounded', sender === 'User' ? 'bg-light' : 'chatmsg');

    div.innerHTML = `<strong>${sender}:</strong> ${htmlMessage}`;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight; // Scroll to the latest message
}
