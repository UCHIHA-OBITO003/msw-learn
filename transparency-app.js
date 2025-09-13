// Transparency Page Application Logic
let requestCounter = 0;

document.addEventListener('DOMContentLoaded', function() {
    logTransparencyActivity('🔍 Transparency mode activated! Watch the magic happen!', 'info');
});

// Demo Color Request
async function demoColorRequest() {
    const button = event.target;
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<span class="loading"></span> Getting Color...';
    button.disabled = true;
    
    const requestId = ++requestCounter;
    const timestamp = new Date().toLocaleTimeString();
    
    // Log the request
    logRequest(`[${timestamp}] Request #${requestId}: GET /api/colors
Headers: {
  "Content-Type": "application/json",
  "User-Agent": "Magic Browser v1.0"
}
Body: {}`);
    
    logTransparencyActivity(`🎨 Sending color request to worker service...`, 'info');
    
    try {
        // Simulate the actual service call
        const response = await mockWorkerService.getColors();
        
        // Log the response
        logResponse(`[${timestamp}] Response #${requestId}: 200 OK
Content-Type: application/json
Response Time: ${Math.random() * 500 + 200}ms

{
  "color": "${response.color}",
  "colorName": "${response.colorName}",
  "timestamp": "${response.timestamp}",
  "requestId": ${response.requestId}
}`);
        
        logTransparencyActivity(`✅ Color received: ${response.colorName}!`, 'success');
        
        // Reset button after a delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
        
    } catch (error) {
        logResponse(`[${timestamp}] Response #${requestId}: 500 ERROR
Content-Type: application/json

{
  "error": "Internal Server Error",
  "message": "${error.message}",
  "requestId": ${requestId}
}`);
        
        logTransparencyActivity(`❌ Error getting color: ${error.message}`, 'error');
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Demo Story Request
async function demoStoryRequest() {
    const storyInput = document.getElementById('demoStoryInput');
    const storyText = storyInput.value.trim();
    
    if (!storyText) {
        logTransparencyActivity('❌ Please write a story first!', 'error');
        return;
    }
    
    const button = event.target;
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<span class="loading"></span> Saving...';
    button.disabled = true;
    
    const requestId = ++requestCounter;
    const timestamp = new Date().toLocaleTimeString();
    
    // Log the request
    logRequest(`[${timestamp}] Request #${requestId}: POST /api/stories
Headers: {
  "Content-Type": "application/json",
  "User-Agent": "Magic Browser v1.0"
}
Body: {
  "story": "${storyText}"
}`);
    
    logTransparencyActivity(`📝 Sending story to worker service...`, 'info');
    
    try {
        // Simulate the actual service call
        const response = await mockWorkerService.saveStory(storyText);
        
        // Log the response
        logResponse(`[${timestamp}] Response #${requestId}: 201 CREATED
Content-Type: application/json
Response Time: ${Math.random() * 800 + 300}ms

{
  "success": true,
  "story": {
    "id": ${response.story.id},
    "text": "${response.story.text}",
    "timestamp": "${response.story.timestamp}",
    "wordCount": ${response.story.wordCount}
  },
  "totalStories": ${response.totalStories},
  "requestId": ${response.requestId}
}`);
        
        logTransparencyActivity(`✅ Story saved successfully! Story ID: ${response.story.id}`, 'success');
        
        // Clear input
        storyInput.value = '';
        
        // Reset button after a delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
        
    } catch (error) {
        logResponse(`[${timestamp}] Response #${requestId}: 500 ERROR
Content-Type: application/json

{
  "error": "Internal Server Error",
  "message": "${error.message}",
  "requestId": ${requestId}
}`);
        
        logTransparencyActivity(`❌ Error saving story: ${error.message}`, 'error');
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Demo Treasure Request
async function demoTreasureRequest() {
    const button = event.target;
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<span class="loading"></span> Searching...';
    button.disabled = true;
    
    const requestId = ++requestCounter;
    const timestamp = new Date().toLocaleTimeString();
    
    // Log the request
    logRequest(`[${timestamp}] Request #${requestId}: GET /api/treasure
Headers: {
  "Content-Type": "application/json",
  "User-Agent": "Magic Browser v1.0"
}
Body: {}`);
    
    logTransparencyActivity(`🔍 Searching for treasure in the magical world...`, 'info');
    
    try {
        // Simulate the actual service call
        const response = await mockWorkerService.findTreasure();
        
        // Log the response
        logResponse(`[${timestamp}] Response #${requestId}: 200 OK
Content-Type: application/json
Response Time: ${Math.round(response.searchTime * 1000)}ms

{
  "treasure": "${response.treasure}",
  "found": ${response.found},
  "searchTime": ${response.searchTime},
  "timestamp": "${response.timestamp}",
  "requestId": ${response.requestId}
}`);
        
        logTransparencyActivity(`✅ Treasure found: ${response.treasure}!`, 'success');
        
        // Reset button after a delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 2000);
        
    } catch (error) {
        logResponse(`[${timestamp}] Response #${requestId}: 500 ERROR
Content-Type: application/json

{
  "error": "Internal Server Error",
  "message": "${error.message}",
  "requestId": ${requestId}
}`);
        
        logTransparencyActivity(`❌ Error finding treasure: ${error.message}`, 'error');
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Logging functions
function logRequest(message) {
    const requestLog = document.getElementById('requestLog');
    const logEntry = document.createElement('p');
    logEntry.className = 'log-entry request';
    logEntry.textContent = message;
    
    requestLog.insertBefore(logEntry, requestLog.firstChild);
    
    // Keep only last 5 entries
    while (requestLog.children.length > 5) {
        requestLog.removeChild(requestLog.lastChild);
    }
}

function logResponse(message) {
    const responseLog = document.getElementById('responseLog');
    const logEntry = document.createElement('p');
    logEntry.className = 'log-entry response';
    logEntry.textContent = message;
    
    responseLog.insertBefore(logEntry, responseLog.firstChild);
    
    // Keep only last 5 entries
    while (responseLog.children.length > 5) {
        responseLog.removeChild(responseLog.lastChild);
    }
}

function logTransparencyActivity(message, type = 'info') {
    console.log(`[Transparency] ${message}`);
    
    // You could also add a general activity log here if needed
    // For now, we'll just use console logging
}

// Tab switching functionality
function showTab(tabName) {
    // Remove active class from all tabs and code blocks
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.code-block').forEach(block => block.classList.remove('active'));
    
    // Add active class to selected tab and code block
    event.target.classList.add('active');
    document.getElementById(tabName + '-code').classList.add('active');
}

// Add some interactive animations
document.addEventListener('DOMContentLoaded', function() {
    // Add click animations to glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.demo-btn, .back-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to input
    const demoInput = document.getElementById('demoStoryInput');
    if (demoInput) {
        demoInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#f39c12';
                this.style.boxShadow = '0 0 10px rgba(243, 156, 18, 0.3)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Ctrl/Cmd + Enter to save story
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            const demoInput = document.getElementById('demoStoryInput');
            if (demoInput && demoInput.value.trim()) {
                demoStoryRequest();
            }
        }
        
        // Escape to clear inputs
        if (event.key === 'Escape') {
            const demoInput = document.getElementById('demoStoryInput');
            if (demoInput) {
                demoInput.value = '';
                demoInput.style.borderColor = '';
                demoInput.style.boxShadow = '';
            }
        }
    });
});

// Add some educational tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Add tooltips to learning items
    const learningItems = document.querySelectorAll('.learning-item');
    learningItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});
