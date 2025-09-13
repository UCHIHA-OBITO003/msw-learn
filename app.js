// Main Application Logic
document.addEventListener('DOMContentLoaded', function() {
    logActivity('Magic Worker Service is ready! 🚀');
});

// Test Color Endpoint
async function testColorEndpoint() {
    const button = event.target;
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<span class="loading"></span> Getting Color...';
    button.disabled = true;
    
    logActivity('🎨 Requesting a new color from the worker service...');
    
    try {
        const response = await mockWorkerService.getColors();
        
        // Update the color preview
        const colorPreview = document.getElementById('colorPreview');
        colorPreview.style.backgroundColor = response.color;
        colorPreview.style.color = '#fff';
        colorPreview.textContent = `🎨 ${response.colorName} (${response.color})`;
        colorPreview.classList.add('success');
        
        logActivity(`✅ Got color: ${response.colorName}! Request ID: ${response.requestId}`, 'success');
        
        // Reset button after a delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            colorPreview.classList.remove('success');
        }, 2000);
        
    } catch (error) {
        logActivity(`❌ Error getting color: ${error.message}`, 'error');
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Save Story Endpoint
async function saveStory() {
    const storyInput = document.getElementById('storyInput');
    const storyText = storyInput.value.trim();
    
    if (!storyText) {
        logActivity('❌ Please write a story first!', 'error');
        return;
    }
    
    const button = event.target;
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<span class="loading"></span> Saving...';
    button.disabled = true;
    
    logActivity(`📝 Saving story: "${storyText.substring(0, 30)}${storyText.length > 30 ? '...' : ''}"`);
    
    try {
        const response = await mockWorkerService.saveStory(storyText);
        
        // Update the story display
        const storyDisplay = document.getElementById('storyDisplay');
        storyDisplay.innerHTML = `
            <div style="text-align: center;">
                <h4>📚 Your Saved Story:</h4>
                <p><strong>Story:</strong> "${response.story.text}"</p>
                <p><strong>Words:</strong> ${response.story.wordCount}</p>
                <p><strong>Story #:</strong> ${response.story.id}</p>
                <p><strong>Total Stories:</strong> ${response.totalStories}</p>
            </div>
        `;
        storyDisplay.classList.add('success');
        
        logActivity(`✅ Story saved successfully! Request ID: ${response.requestId}`, 'success');
        
        // Clear input
        storyInput.value = '';
        
        // Reset button after a delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            storyDisplay.classList.remove('success');
        }, 3000);
        
    } catch (error) {
        logActivity(`❌ Error saving story: ${error.message}`, 'error');
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Find Treasure Endpoint
async function findTreasure() {
    const button = event.target;
    const originalText = button.textContent;
    
    // Show loading state
    button.innerHTML = '<span class="loading"></span> Searching...';
    button.disabled = true;
    
    logActivity('🔍 Searching for treasure in the magical world...');
    
    try {
        const response = await mockWorkerService.findTreasure();
        
        // Update the treasure display
        const treasureDisplay = document.getElementById('treasureDisplay');
        treasureDisplay.innerHTML = `
            <div style="text-align: center;">
                <h4>🎉 Treasure Found!</h4>
                <p style="font-size: 1.5rem; margin: 1rem 0;">${response.treasure}</p>
                <p><strong>Search Time:</strong> ${response.searchTime.toFixed(1)} seconds</p>
                <p><strong>Found:</strong> ${response.found ? 'Yes!' : 'No'}</p>
            </div>
        `;
        treasureDisplay.classList.add('success');
        
        logActivity(`✅ Found treasure: ${response.treasure}! Request ID: ${response.requestId}`, 'success');
        
        // Reset button after a delay
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            treasureDisplay.classList.remove('success');
        }, 3000);
        
    } catch (error) {
        logActivity(`❌ Error finding treasure: ${error.message}`, 'error');
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Open Transparency Page
function openTransparencyPage() {
    // Create a new window/tab for the transparency page
    const transparencyWindow = window.open('transparency.html', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    if (!transparencyWindow) {
        // Fallback if popup is blocked
        logActivity('⚠️ Popup blocked! Opening in same tab...', 'error');
        window.location.href = 'transparency.html';
    } else {
        logActivity('👁️ Opening transparency page to show how the magic works!');
    }
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
    const buttons = document.querySelectorAll('.magic-btn, .transparency-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add typing effect to input
    const storyInput = document.getElementById('storyInput');
    if (storyInput) {
        storyInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                this.style.borderColor = '#4ecdc4';
                this.style.boxShadow = '0 0 10px rgba(78, 205, 196, 0.3)';
            } else {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    }
});

// Add keyboard shortcuts for accessibility
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + Enter to save story
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        const storyInput = document.getElementById('storyInput');
        if (storyInput && storyInput.value.trim()) {
            saveStory();
        }
    }
    
    // Escape to clear inputs
    if (event.key === 'Escape') {
        const storyInput = document.getElementById('storyInput');
        if (storyInput) {
            storyInput.value = '';
            storyInput.style.borderColor = '';
            storyInput.style.boxShadow = '';
        }
    }
});
