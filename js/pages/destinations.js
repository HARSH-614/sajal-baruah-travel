/**
 * Oxim - Destinations Logic
 * Handles dynamic rendering of the destination listing and detail pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Determine which page we are on based on unique DOM elements
    const gridContainer = document.getElementById('destinations-grid');
    const detailContainer = document.getElementById('destination-content');

    if (gridContainer) {
        initListingPage();
    }

    if (detailContainer) {
        initDetailPage();
    }
});

/* ==========================================================================
   LISTING PAGE LOGIC
   ========================================================================== */
function initListingPage() {
    const dataService = window.TravelDataService;
    let currentDestinations = dataService.getAllDestinations();
    
    // DOM Elements
    const grid = document.getElementById('destinations-grid');
    const countDisplay = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    
    // Filter Elements
    const filterForm = document.getElementById('filter-form');
    const searchInput = document.getElementById('search-text');
    const regionSelect = document.getElementById('region-select');
    const styleCheckboxes = document.querySelectorAll('input[name="style"]');
    const sortSelect = document.getElementById('sort-select');
    const resetBtn = document.getElementById('reset-filters');

    // 1. Check URL for initial filters (e.g., from homepage)
    const urlParams = new URLSearchParams(window.location.search);
    const urlRegion = urlParams.get('region');
    const urlQuery = urlParams.get('query');
    
    if (urlRegion) {
        regionSelect.value = urlRegion.charAt(0).toUpperCase() + urlRegion.slice(1);
    }
    if (urlQuery) {
        searchInput.value = urlQuery;
    }

    // 2. Main Render Function
    function renderGrid(destinations) {
        grid.innerHTML = '';
        
        if (destinations.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'flex';
            countDisplay.textContent = '0 destinations found';
            return;
        }

        grid.style.display = 'grid';
        noResults.style.display = 'none';
        countDisplay.textContent = `Showing ${destinations.length} destination${destinations.length > 1 ? 's' : ''}`;

        destinations.forEach(dest => {
            const card = document.createElement('a');
            card.href = `destination.html?id=${dest.id}`;
            card.className = 'dest-card';
            
            // Format styles for display
            const styleString = dest.travelStyles.slice(0, 2).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' • ');

            card.innerHTML = `
                <div class="dest-card-img">
                    <img src="${dest.heroImage}" alt="${dest.name}" loading="lazy">
                    ${dest.featured ? `<span class="card-badge">Featured</span>` : ''}
                </div>
                <div class="dest-card-content">
                    <div class="dest-card-meta">${dest.state}, ${dest.region}</div>
                    <h3>${dest.name}</h3>
                    <p>${dest.shortDescription}</p>
                    <div class="dest-card-meta" style="color: var(--accent-primary);">
                        <i class="fa-solid fa-compass"></i> ${styleString}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // 3. Apply Filters and Sorting
    function applyFilters() {
        const query = searchInput.value.toLowerCase();
        const region = regionSelect.value.toLowerCase();
        
        // Get checked styles
        const checkedStyles = Array.from(styleCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // Filter Data
        let filtered = dataService.getAllDestinations().filter(dest => {
            const matchQuery = query ? (dest.name.toLowerCase().includes(query) || dest.state.toLowerCase().includes(query)) : true;
            const matchRegion = region ? dest.region.toLowerCase() === region : true;
            
            // If styles are selected, destination must have AT LEAST ONE of the selected styles
            const matchStyle = checkedStyles.length > 0 
                ? checkedStyles.some(style => dest.travelStyles.includes(style)) 
                : true;

            return matchQuery && matchRegion && matchStyle;
        });

        // Apply Sorting
        const sortValue = sortSelect.value;
        if (sortValue === 'name-asc') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'name-desc') {
            filtered.sort((a, b) => b.name.localeCompare(a.name));
        }
        // If 'popular', we rely on the default array order or featured flag

        currentDestinations = filtered;
        renderGrid(currentDestinations);
    }

    // 4. Event Listeners
    searchInput.addEventListener('input', applyFilters);
    regionSelect.addEventListener('change', applyFilters);
    styleCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));
    sortSelect.addEventListener('change', applyFilters);
    
    resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        filterForm.reset();
        applyFilters();
        // Clear URL params visually without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
    });

    // Initial render
    applyFilters();
}

/* ==========================================================================
   DETAIL PAGE LOGIC
   ========================================================================== */
function initDetailPage() {
    const dataService = window.TravelDataService;
    
    // DOM Elements
    const loadingState = document.getElementById('loading-state');
    const contentState = document.getElementById('destination-content');
    const errorState = document.getElementById('error-state');

    // 1. Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const destId = urlParams.get('id');

    if (!destId) {
        showError();
        return;
    }

    // 2. Fetch Data
    // Simulating slight network delay for visual loading state
    setTimeout(() => {
        const dest = dataService.getDestinationById(destId);
        
        if (dest) {
            hydrateDOM(dest);
        } else {
            showError();
        }
    }, 500);

    function showError() {
        loadingState.style.display = 'none';
        contentState.style.display = 'none';
        errorState.style.display = 'flex';
    }

    function hydrateDOM(dest) {
        // Hydrate Header
        document.title = `${dest.name} | Oxim Travel`;
        document.getElementById('breadcrumb-current').textContent = dest.name;
        document.getElementById('dest-title').textContent = dest.name;
        document.getElementById('dest-subtitle').textContent = dest.shortDescription;
        document.getElementById('dest-hero-img').src = dest.heroImage;
        document.getElementById('dest-hero-img').alt = dest.name;

        // Tags
        const tagsContainer = document.getElementById('dest-tags');
        dest.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });

        // Main Content
        document.getElementById('dest-long-desc').textContent = dest.longDescription;

        // Gallery
        const galleryGrid = document.getElementById('dest-gallery-grid');
        dest.gallery.forEach(imgSrc => {
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = `Gallery image of ${dest.name}`;
            img.loading = 'lazy';
            galleryGrid.appendChild(img);
        });

        // Activities
        const activitiesList = document.getElementById('dest-activities');
        dest.popularActivities.forEach(act => {
            const li = document.createElement('li');
            li.textContent = act;
            activitiesList.appendChild(li);
        });

        // Sidebar Glance
        document.getElementById('glance-time').textContent = dest.bestTimeToVisit;
        document.getElementById('glance-duration').textContent = dest.recommendedDuration;
        document.getElementById('glance-budget').textContent = dest.budgetRange;
        document.getElementById('glance-region').textContent = `${dest.state}, ${dest.region}`;

        // Dynamic links in sidebar
        document.getElementById('add-itinerary-btn').href = `trip-builder.html?add=${dest.id}`;

        // Initialize Map
        initMap(dest);

        // Handle Wishlist button UI toggle (Persistance will be in Phase 7)
        const wishlistBtn = document.getElementById('btn-wishlist');
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.replace('fa-regular', 'fa-solid');
                this.classList.replace('btn-outline', 'btn-primary');
                this.innerHTML = `<i class="fa-solid fa-heart"></i> Saved`;
            } else {
                icon.classList.replace('fa-solid', 'fa-regular');
                this.classList.replace('btn-primary', 'btn-outline');
                this.innerHTML = `<i class="fa-regular fa-heart"></i> Save`;
            }
        });

        // Smooth scroll for internal sticky nav
        document.querySelectorAll('.dest-nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                // Remove active class from all
                document.querySelectorAll('.dest-nav a').forEach(a => a.classList.remove('active'));
                // Add to clicked
                this.classList.add('active');
                
                const targetId = this.getAttribute('href').substring(1);
                const targetEl = document.getElementById(targetId);
                
                window.scrollTo({
                    top: targetEl.offsetTop - 140, // Offset for sticky navs
                    behavior: 'smooth'
                });
            });
        });

        // Switch UI States
        loadingState.style.display = 'none';
        contentState.style.display = 'block';
        
        // Force map resize after container becomes visible
        setTimeout(() => {
            if (window.destMap) {
                window.destMap.invalidateSize();
            }
        }, 100);
    }

    function initMap(dest) {
        if (!dest.coordinates || !dest.coordinates.latitude) {
            document.getElementById('map-container').innerHTML = '<p style="padding: 2rem; text-align:center;">Map data unavailable.</p>';
            return;
        }

        const lat = dest.coordinates.latitude;
        const lng = dest.coordinates.longitude;

        // Create Leaflet Map
        const map = L.map('map-container').setView([lat, lng], 10);
        window.destMap = map; // Store globally to trigger invalidateSize later

        // Use OpenStreetMap free tiles (Phase requirement: Free/Open tech)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add Marker
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<b>${dest.name}</b><br>${dest.state}`).openPopup();
        
        // Apply dark theme tile filter if html is dark mode
        const checkThemeMap = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const tileLayer = document.querySelector('.leaflet-layer');
            if (tileLayer) {
                tileLayer.style.filter = isDark ? 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none';
            }
        };

        // Run once on load and listen for theme toggles
        setTimeout(checkThemeMap, 200);
        document.getElementById('theme-toggle').addEventListener('click', () => {
            setTimeout(checkThemeMap, 50);
        });
    }
}
