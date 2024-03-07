async function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    var chatScreen = document.getElementById("chat-screen");

    if (userInput.trim() !== "") {
        var sentMessage = "<div class='message sent'><div class='me'>" + userInput + "</div></div>";
        chatScreen.innerHTML += sentMessage;

        // Clear input box
        document.getElementById("user-input").value = "";

        // Scroll to bottom
        chatScreen.scrollTop = chatScreen.scrollHeight;

        // Query the chatbot
        try {
            const response = await query({ "inputs": userInput });
            var receivedMessage = "<div class='message received'><div class='chatbot'>" + response[0].generated_text + "</div></div>";
            chatScreen.innerHTML += receivedMessage;
            // Scroll to bottom
            chatScreen.scrollTop = chatScreen.scrollHeight;
        } catch (error) {
            console.error("Error querying the chatbot:", error);
        }
    }
}

async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}


function toggleChatbot() {
    var chatContainer = document.getElementById("chat-container");
    var toggleButton = document.getElementById("toggle-chatbot");

    if (chatContainer.style.display === "none" || chatContainer.style.display === "") {
        chatContainer.style.display = "block";
        
    } else {
        chatContainer.style.display = "none";
        
    }
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    // Vérifie si la touche appuyée est "Enter" (code 13)
    if (event.key === "Enter") {
        sendMessage(); // Appel de la fonction sendMessage() lorsque "Enter" est pressé
    }
});

window.onload = function() {
    document.getElementById("user-input").focus();
};

