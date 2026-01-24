// Open chat
function openChat(){
    document.getElementById("chatPopup").style.display = "flex";
}

// Close chat
function closeChat(){
    document.getElementById("chatPopup").style.display = "none";
}

// Send user message
function sendMsg(){
    let msgInput = document.getElementById("msg");
    let msg = msgInput.value.trim();

    if(msg !== ""){
        // Create user message div
        let msgDiv = document.createElement("div");
        msgDiv.classList.add("message", "user");
        msgDiv.innerText = msg;

        // Append message to chat body
        let chatBody = document.querySelector(".chat-body");
        chatBody.appendChild(msgDiv);

        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;

        // Clear input
        msgInput.value = "";

        // Optional: auto bot response
        setTimeout(()=>{
            let botMsg = document.createElement("div");
            botMsg.classList.add("message");
            botMsg.innerText = "I am here to assist you! 🤖";
            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 800);
    }
}

// Send message on Enter key
document.getElementById("msg").addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMsg();
    }
});

// Add click event to suggestions
document.querySelectorAll(".suggestion").forEach(item => {
    item.addEventListener("click", function(){
        document.getElementById("msg").value = this.innerText.replace("↗ ", "");
        sendMsg();
    });
});
