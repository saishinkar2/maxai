document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const apiKey = AIzaSyDOpOFfsBVxsHqGDQZGdO0efDlHcPgfmNA; // Replace with your actual API key

    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (!message) return;

    addMessage('User', message);
    input.value = ''; // Clear input field after sending message

    const data = {
        "prompt": {
            "text": message
        }
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash-latest:generateText?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        const botReply = result.candidates?.[0]?.output || "Sorry, I don't have a response.";
        addMessage('Bot', botReply);

    } catch (error) {
        console.error('Error making API request:', error);
        addMessage('Bot', 'Error processing your request.');
    }
});

function addMessage(sender, message) {
    const messages = document.getElementById('messages');
    const div = document.createElement('div');

    var converter = new showdown.Converter();
    var htmlMessage = converter.makeHtml(message); // Markdown to HTML conversion

    div.classList.add('chat-message', 'p-2', 'mb-2', 'rounded', sender === 'User' ? 'bg-light' : 'bg-warning');
    div.innerHTML = `<strong>${sender}:</strong> ${htmlMessage}`;

    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight; // Scroll to the latest message
}
