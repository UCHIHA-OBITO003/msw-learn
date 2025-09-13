// Mock Worker Service - Educational and Transparent
class MockWorkerService {
    constructor() {
        this.stories = [];
        this.colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'];
        this.treasures = [
            '🌟 A golden star!',
            '💎 A shiny diamond!',
            '🏆 A magical trophy!',
            '🎁 A surprise gift!',
            '🎨 A rainbow paintbrush!',
            '🦄 A unicorn horn!',
            '🌈 A piece of rainbow!',
            '⭐ A shooting star!'
        ];
        this.requestId = 0;
    }

    // Simulate network delay for educational purposes
    async simulateDelay(min = 500, max = 1500) {
        const delay = Math.random() * (max - min) + min;
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    // Generate a unique request ID
    generateRequestId() {
        return ++this.requestId;
    }

    // Mock GET /api/colors endpoint
    async getColors() {
        const requestId = this.generateRequestId();
        console.log(`[Request ${requestId}] GET /api/colors - Starting...`);
        
        // Simulate processing time
        await this.simulateDelay();
        
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        const response = {
            color: randomColor,
            colorName: this.getColorName(randomColor),
            timestamp: new Date().toISOString(),
            requestId: requestId
        };
        
        console.log(`[Request ${requestId}] GET /api/colors - Response:`, response);
        return response;
    }

    // Mock POST /api/stories endpoint
    async saveStory(storyText) {
        const requestId = this.generateRequestId();
        console.log(`[Request ${requestId}] POST /api/stories - Starting...`);
        console.log(`[Request ${requestId}] POST /api/stories - Body:`, { story: storyText });
        
        // Simulate processing time
        await this.simulateDelay();
        
        const story = {
            id: this.stories.length + 1,
            text: storyText,
            timestamp: new Date().toISOString(),
            wordCount: storyText.split(' ').length,
            requestId: requestId
        };
        
        this.stories.push(story);
        
        const response = {
            success: true,
            story: story,
            totalStories: this.stories.length,
            requestId: requestId
        };
        
        console.log(`[Request ${requestId}] POST /api/stories - Response:`, response);
        return response;
    }

    // Mock GET /api/treasure endpoint
    async findTreasure() {
        const requestId = this.generateRequestId();
        console.log(`[Request ${requestId}] GET /api/treasure - Starting...`);
        
        // Simulate searching time
        await this.simulateDelay(800, 2000);
        
        const treasure = this.treasures[Math.floor(Math.random() * this.treasures.length)];
        const response = {
            treasure: treasure,
            found: true,
            searchTime: Math.random() * 2 + 0.5,
            timestamp: new Date().toISOString(),
            requestId: requestId
        };
        
        console.log(`[Request ${requestId}] GET /api/treasure - Response:`, response);
        return response;
    }

    // Helper function to get color names
    getColorName(colorCode) {
        const colorNames = {
            '#ff6b6b': 'Coral Red',
            '#4ecdc4': 'Turquoise',
            '#45b7d1': 'Sky Blue',
            '#96ceb4': 'Mint Green',
            '#feca57': 'Golden Yellow',
            '#ff9ff3': 'Pink',
            '#54a0ff': 'Bright Blue',
            '#5f27cd': 'Purple'
        };
        return colorNames[colorCode] || 'Unknown Color';
    }

    // Get all stored stories
    getAllStories() {
        return {
            stories: this.stories,
            count: this.stories.length,
            timestamp: new Date().toISOString()
        };
    }

    // Clear all stories (for demo purposes)
    clearStories() {
        this.stories = [];
        console.log('All stories cleared!');
    }
}

// Create global instance
const mockWorkerService = new MockWorkerService();

// Educational logging function
function logActivity(message, type = 'info') {
    const logContainer = document.getElementById('activityLog');
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('p');
    logEntry.className = 'log-entry';
    
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    logEntry.innerHTML = `${icon} <strong>[${timestamp}]</strong> ${message}`;
    
    logContainer.insertBefore(logEntry, logContainer.firstChild);
    
    // Keep only last 10 entries
    while (logContainer.children.length > 10) {
        logContainer.removeChild(logContainer.lastChild);
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MockWorkerService;
}
