class ResourceTileManager {
    constructor(dashboardUrl = '/internal/resources/dashboard.json') {
        this.dashboardUrl = dashboardUrl;
        this.lastUpdate = null;
        this.checkInterval = 30000; // Check every 30 seconds
        this.cache = new Map(); // Cache for project data
    }

    async init() {
        // Initial load
        await this.updateTiles();
        
        // Set up periodic checks
        setInterval(() => this.checkForUpdates(), this.checkInterval);

        // Listen for Quartz page changes
        document.addEventListener('quartz-content-updated', () => {
            this.updateTiles();
        });
    }

    async fetchDashboard() {
        // Add cache-busting query parameter
        const url = `${this.dashboardUrl}?_t=${Date.now()}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch dashboard: ${response.status}`);
        }
        return response.json();
    }

    async checkForUpdates() {
        try {
            const data = await this.fetchDashboard();
            if (data.last_updated !== this.lastUpdate) {
                await this.updateTiles();
            }
        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    }

    async updateTiles() {
        try {
            const data = await this.fetchDashboard();
            this.lastUpdate = data.last_updated;

            // Update cache with new project data
            data.projects.forEach(project => {
                this.cache.set(project.entryID, project);
            });

            // Update all tiles on the page
            const tiles = document.querySelectorAll('.project-tile[data-entry-id]');
            tiles.forEach(tile => this.updateTile(tile));

        } catch (error) {
            console.error('Error updating tiles:', error);
        }
    }

    updateTile(tile) {
        const entryId = tile.getAttribute('data-entry-id');
        const project = this.cache.get(entryId);

        if (!project) {
            console.warn(`No data found for entry ID: ${entryId}`);
            return;
        }

        // Update tile contents
        const link = tile.querySelector('a') || document.createElement('a');
        link.href = project.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';

        const bgDiv = tile.querySelector('.project-tile-bg') || document.createElement('div');
        bgDiv.className = 'project-tile-bg';
        if (project.banner) {
            bgDiv.style.backgroundImage = `url('${project.banner}')`;
        } else {
            bgDiv.style.backgroundImage = '';
        }

        const titleDiv = tile.querySelector('.project-tile-title') || document.createElement('div');
        titleDiv.className = 'project-tile-title';
        titleDiv.textContent = project.title || 'Untitled';

        const descDiv = tile.querySelector('.project-tile-description') || document.createElement('div');
        descDiv.className = 'project-tile-description';
        descDiv.textContent = project.description || '';

        // Ensure proper DOM structure
        if (!tile.contains(link)) {
            tile.appendChild(link);
        }
        if (!link.contains(bgDiv)) {
            link.appendChild(bgDiv);
        }
        if (!link.contains(titleDiv)) {
            link.appendChild(titleDiv);
        }
        if (!link.contains(descDiv)) {
            link.appendChild(descDiv);
        }
    }
} 