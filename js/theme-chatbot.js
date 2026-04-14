// Theme Toggle Function
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', (event) => {
    const savedTheme = localStorage.getItem('theme');
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }
});

// Chatbot Functions
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbotWindow');
    if (chatbotWindow) {
        chatbotWindow.classList.toggle('active');
    }
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const messagesContainer = document.getElementById('chatbotMessages');
    
    if (!input || !messagesContainer) return;
    
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message user';
        userMessage.textContent = message;
        messagesContainer.appendChild(userMessage);
        
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot';
            botMessage.textContent = getBotResponse(message);
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 1000);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
        return 'We offer a wide range of courses in technology, business, and more. Check out our Courses page!';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('free')) {
        return 'We have both free and paid courses. Many of our courses are completely free with certificates!';
    } else if (lowerMessage.includes('certificate')) {
        return 'Yes! You can earn certificates for every course you complete at no additional cost.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('help')) {
        return 'You can contact us through our Contact page or email us at LearnDepth@gmail.com';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'Hello! How can I assist you with your learning journey today?';
    } else {
        return 'Thank you for your message! For more specific information, please visit our website or contact our support team.';
    }
}

// Allow Enter key to send message
document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.getElementById('chatbotInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});
