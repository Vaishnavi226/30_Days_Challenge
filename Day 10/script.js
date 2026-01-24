// Open chat popup
function openChat() {
    document.getElementById("chatPopup").style.display = "flex";
}

// Close chat popup
function closeChat() {
    document.getElementById("chatPopup").style.display = "none";
}

// Main function to send user message and generate bot response
function sendMsg() {
    const msgInput = document.getElementById("msg");
    const msg = msgInput.value.trim();

    if (msg !== "") {
        const chatBody = document.querySelector(".chat-body");

        // Add user message
        const userMsg = document.createElement("div");
        userMsg.classList.add("message", "user");
        userMsg.innerText = msg;
        chatBody.appendChild(userMsg);
        chatBody.scrollTop = chatBody.scrollHeight;

        msgInput.value = "";

        // Bot reply after short delay
        setTimeout(() => {
            const botMsg = document.createElement("div");
            botMsg.classList.add("message");

            // Convert message to lowercase for matching
            const text = msg.toLowerCase();

            // Detailed responses based on keywords
            if (text.includes("logo")) {
                botMsg.innerText = "Absolutely!  I can help you design a professional logo for your blog 'Bakery Hunter'. We can choose colors, font styles, and iconography that match the theme of baking. Do you want a modern, minimalist, or playful style?";
            } 
            else if (text.includes("hosting")) {
                botMsg.innerText = "Sure!  I can guide you to pick the best hosting plan. For small blogs, shared hosting is affordable and easy to manage. For bigger projects, VPS or cloud hosting is faster and more scalable. Do you want me to recommend a specific provider?";
            } 
            else if (text.includes("migrate")) {
                botMsg.innerText = "No worries!  Migrating your website to Hostinger can be smooth. We can backup your files, move the database, and configure DNS without downtime. I can give you step-by-step instructions if you want.";
            } 
            else if (text.includes("website") || text.includes("create")) {
                botMsg.innerText = "Yes!  Let's create your website. First, we need to decide the type: blog, portfolio, or e-commerce. Then we can choose the platform (WordPress, custom HTML/CSS/JS, or React) and plan the layout. Do you have a preference?";
            } 
            else if (text.includes("help")) {
                botMsg.innerText = "Of course!  I am here to assist you. You can ask me anything related to web development, design, hosting, or your projects, and I'll provide detailed guidance.";
            } 
            else {
                botMsg.innerText = "Yes, I would like to help!  Can you provide a bit more detail so I can give you a proper response?";
            }

            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 800);
    }
}

// Send message on Enter key press
document.getElementById("msg").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMsg();
    }
});

// Handle suggestion clicks
document.querySelectorAll(".suggestion").forEach(item => {
    item.addEventListener("click", function() {
        const input = document.getElementById("msg");
        input.value = this.innerText.replace("↗ ", "");
        sendMsg();
    });
});

// Handle mini input box generate button
document.querySelector(".input-box button").addEventListener("click", function() {
    const input = document.querySelector(".input-box input");
    const value = input.value.trim();
    if (value !== "") {
        openChat();
        document.getElementById("msg").value = value;
        sendMsg();
        input.value = "";
    }
});
