/**
 * Oxim - Interactive Map Logic
 * Handles Leaflet initialization, dynamic markers, sidebar syncing, and routing.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Ensure we are on the map page and data service is available
    const mapContainer = document.getElementById('interactive-map');
    if (!mapContainer || !window.TravelDataService) return;

    const dataService = window.TravelDataService;
    let allDestinations = dataService.getAllDestinations().filter(d => d.coordinates && d.coordinates.latitude);
    
    // Core Map Variables
    let map;
    let markersLayer = L.featureGroup();
    let routeLayer = null;
    let markerMap = {}; // Maps destination ID to Leaflet marker instance
    
    // DOM Elements
    const destListContainer = document.getElementById('map-destinations-list');
    const regionFilter = document.getElementById('map-region-filter');
    const toggleRouteBtn = document.getElementById('toggle-route-btn');

    // 1. Initialize Leaflet Map
    function initMap() {
        // Default center of India
        map = L.map('interactive-map', {
            zoomControl: false // We will move it
        }).setView([22.5937, 78.9629], 5);

        // Move zoom control to bottom right so it doesn't clash with sidebar on mobile
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        // Add OpenStreetMap Tile Layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        map.addLayer(markersLayer);
        
        // Initial Render
        renderMapData(allDestinations);
    }

    // 2. Create custom divIcon for futuristic theme
    const createCustomIcon = (isActive = false) => {
        return L.divIcon({
            className: isActive ? 'oxim-marker active-marker' : 'oxim-marker',
            iconSize: isActive ? [20, 20] : [14, 14],
            iconAnchor: isActive ? [10, 10] : [7, 7],
            popupAnchor: [0, -10]
        });
    };

    // 3. Render Markers & Sidebar List
    function renderMapData(destinations) {
        // Clear existing
        markersLayer.clearLayers();
        destListContainer.innerHTML = '';
        markerMap = {};

        if (destinations.length === 0) {
            destListContainer.innerHTML = '<li style="padding: 1rem; color: var(--text-secondary);">No destinations found for this region.</li>';
            return;
        }

        destinations.forEach(dest => {
            // --- Build Marker ---
            const marker = L.marker([dest.coordinates.latitude, dest.coordinates.longitude], {
                icon: createCustomIcon(false),
                destId: dest.id
            });

            // Custom HTML for Popup
            const popupContent = `
                <div class="custom-popup-content">
                    <img src="${dest.heroImage}" alt="${dest.name}">
                    <div class="custom-popup-info">
                        <h3>${dest.name}</h3>
                        <p>${dest.state}</p>
                        <a href="destination.html?id=${dest.id}">View Details <i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                closeButton: false,
                minWidth: 220
            });

            // Marker Events
            marker.on('click', () => {
                highlightListItem(dest.id);
                resetAllMarkers();
                marker.setIcon(createCustomIcon(true));
                map.flyTo(marker.getLatLng(), 8, { duration: 1.5 });
            });

            marker.on('popupclose', () => {
                marker.setIcon(createCustomIcon(false));
                removeHighlightFromList();
            });

            markersLayer.addLayer(marker);
            markerMap[dest.id] = marker;

            // --- Build Sidebar List Item ---
            const li = document.createElement('li');
            li.className = 'map-dest-item';
            li.id = `list-item-${dest.id}`;
            li.innerHTML = `
                <img src="${dest.heroImage}" alt="${dest.name}" class="map-dest-thumb" loading="lazy">
                <div class="map-dest-info">
                    <h4>${dest.name}</h4>
                    <p>${dest.state}</p>
                </div>
            `;

            // List Events
            li.addEventListener('click', () => {
                highlightListItem(dest.id);
                resetAllMarkers();
                marker.setIcon(createCustomIcon(true));
                map.flyTo(marker.getLatLng(), 8, { duration: 1.5 });
                marker.openPopup();
            });

            destListContainer.appendChild(li);
        });

        // Fit map to show all current markers
        if (destinations.length > 0) {
            map.fitBounds(markersLayer.getBounds(), { padding: [50, 50], maxZoom: 8 });
        }
    }

    // 4. Utility Functions for Syncing
    function resetAllMarkers() {
        Object.values(markerMap).forEach(m => {
            m.setIcon(createCustomIcon(false));
        });
    }

    function highlightListItem(id) {
        removeHighlightFromList();
        const item = document.getElementById(`list-item-${id}`);
        if (item) {
            item.classList.add('active');
            item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function removeHighlightFromList() {
        const items = destListContainer.querySelectorAll('.map-dest-item');
        items.forEach(i => i.classList.remove('active'));
    }

    // 5. Region Filtering
    regionFilter.addEventListener('change', (e) => {
        const region = e.target.value;
        let filtered = allDestinations;

        if (region !== 'all') {
            filtered = allDestinations.filter(d => d.region.toLowerCase() === region);
        }
        
        // Hide route if active when filtering
        if (routeLayer && map.hasLayer(routeLayer)) {
            map.removeLayer(routeLayer);
            toggleRouteBtn.innerHTML = `<i class="fa-solid fa-route"></i> Show Assam Route`;
            toggleRouteBtn.classList.remove('btn-primary');
            toggleRouteBtn.classList.add('btn-outline');
        }

        renderMapData(filtered);
    });

    // 6. Interactive Routing (Sample Assam Route)
    // Connecting Guwahati (Gateway) -> Kaziranga -> Majuli
    const assamRouteCoords = [
        [26.1445, 91.7362], // Guwahati (Approx)
        [26.5775, 93.1711], // Kaziranga
        [26.9535, 94.2498]  // Majuli
    ];

    toggleRouteBtn.addEventListener('click', () => {
        // Ensure map is filtered to North East or All to see it properly
        if (regionFilter.value !== 'all' && regionFilter.value !== 'north-east') {
            regionFilter.value = 'north-east';
            regionFilter.dispatchEvent(new Event('change'));
        }

        if (routeLayer && map.hasLayer(routeLayer)) {
            // Remove Route
            map.removeLayer(routeLayer);
            toggleRouteBtn.innerHTML = `<i class="fa-solid fa-route"></i> Show Assam Route`;
            toggleRouteBtn.classList.remove('btn-primary');
            toggleRouteBtn.classList.add('btn-outline');
            
            // Reset bounds
            map.fitBounds(markersLayer.getBounds(), { padding: [50, 50] });
        } else {
            // Draw Route
            if (!routeLayer) {
                routeLayer = L.polyline(assamRouteCoords, {
                    color: 'var(--accent-secondary)', // Green accent
                    weight: 4,
                    opacity: 0.8,
                    dashArray: '10, 10',
                    lineJoin: 'round'
                });
            }
            
            routeLayer.addTo(map);
            toggleRouteBtn.innerHTML = `<i class="fa-solid fa-times"></i> Hide Route`;
            toggleRouteBtn.classList.remove('btn-outline');
            toggleRouteBtn.classList.add('btn-primary');
            
            // Zoom to route
            map.fitBounds(routeLayer.getBounds(), { padding: [100, 100] });
        }
    });

    // Boot the map
    initMap();
    
    // Handle window resize cleanly
    window.addEventListener('resize', () => {
        if(map) {
            setTimeout(() => map.invalidateSize(), 200);
        }
    });
});
