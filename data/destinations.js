/**
 * Oxim - Master Destination Database
 * Structured data model for all destinations.
 * In a production environment, this would be served via an API/Database.
 */

const destinationsData = [
    {
        id: "kaziranga",
        slug: "kaziranga-national-park",
        name: "Kaziranga National Park",
        state: "Assam",
        region: "North-East",
        country: "India",
        shortDescription: "UNESCO World Heritage site, home to the Great Indian One-Horned Rhinoceros.",
        longDescription: "Kaziranga National park's 430 square kilometer area sprinkled with elephant-grass meadows, swampy lagoons, and dense forests is home to more than 2200 Indian one-horned rhinoceros, approximately 2/3rd of their total world population. Formed in 1908 on the recommendation of Mary Curzon, the park is located in the edge of the Eastern Himalayan biodiversity hotspots.",
        heroImage: "https://images.unsplash.com/photo-1624806992066-5ffcf7ca186b?q=80&w=1200&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1589136777351-fdc9c9cb164f?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1616422285623-1466986dd0f1?q=80&w=800&auto=format&fit=crop"
        ],
        coordinates: { latitude: 26.5775, longitude: 93.1711 },
        bestTimeToVisit: "November to April",
        recommendedDuration: "2-3 Days",
        travelStyles: ["nature", "wildlife", "family", "photography"],
        budgetRange: "₹5,000 - ₹15,000",
        popularActivities: ["Elephant Safari", "Jeep Safari", "Bird Watching", "Tea Garden Visit"],
        tags: ["UNESCO", "Rhino", "National Park"],
        featured: true
    },
    {
        id: "majuli",
        slug: "majuli-river-island",
        name: "Majuli",
        state: "Assam",
        region: "North-East",
        country: "India",
        shortDescription: "The world's largest river island and the cultural capital of Assam.",
        longDescription: "Nestled in the mighty Brahmaputra River, Majuli is a lush green, environment-friendly, pristine, and pollution-free fresh water island. It is the nerve center of neo-Vaishnavite culture initiated by Saint Sankardeva. The island is known for its Satras (monasteries), vibrant festivals like Raas Leela, and traditional mask-making arts.",
        heroImage: "https://images.unsplash.com/photo-1596783049104-e5926ec0379f?q=80&w=1200&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1596783084920-5627dd2e4073?q=80&w=800&auto=format&fit=crop"
        ],
        coordinates: { latitude: 26.9535, longitude: 94.2498 },
        bestTimeToVisit: "October to March",
        recommendedDuration: "2-3 Days",
        travelStyles: ["culture", "heritage", "spiritual", "photography"],
        budgetRange: "₹3,000 - ₹10,000",
        popularActivities: ["Satra Visit", "Pottery Village Tour", "Mask Making Workshop", "Cycling"],
        tags: ["River Island", "Culture", "Satras"],
        featured: true
    },
    {
        id: "tawang",
        slug: "tawang-monastery",
        name: "Tawang",
        state: "Arunachal Pradesh",
        region: "North-East",
        country: "India",
        shortDescription: "High-altitude town famous for its 400-year-old monastery and stunning Himalayan views.",
        longDescription: "Perched at an elevation of 10,000 feet, Tawang is a mesmerizing destination in Arunachal Pradesh. It is home to the Tawang Monastery, the largest in India and second largest in the world. The journey to Tawang via the Sela Pass is as spectacular as the destination itself, featuring frozen lakes, snow-capped peaks, and deep valleys.",
        heroImage: "https://images.unsplash.com/photo-1626014903706-538965f7c327?q=80&w=1200&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1579294520779-166f2ed29057?q=80&w=800&auto=format&fit=crop"
        ],
        coordinates: { latitude: 27.5866, longitude: 91.8659 },
        bestTimeToVisit: "March to May, September to October",
        recommendedDuration: "3-4 Days",
        travelStyles: ["adventure", "spiritual", "nature", "photography"],
        budgetRange: "₹10,000 - ₹25,000",
        popularActivities: ["Monastery Tour", "Sela Pass Drive", "Bumla Pass Visit", "Trekking"],
        tags: ["Mountains", "Monastery", "Snow"],
        featured: true
    },
    {
        id: "kerala-backwaters",
        slug: "kerala-backwaters-alleppey",
        name: "Alleppey Backwaters",
        state: "Kerala",
        region: "South India",
        country: "India",
        shortDescription: "A network of tranquil canals and lagoons known as the Venice of the East.",
        longDescription: "The Kerala backwaters are a chain of brackish lagoons and lakes lying parallel to the Arabian Sea coast of Kerala state. Alleppey (Alappuzha) is the most prominent hub, famous for its houseboat cruises that offer a glimpse into the serene village life, lush paddy fields, and unique ecosystem of the region.",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1593693397690-362cb9666cb3?q=80&w=800&auto=format&fit=crop"
        ],
        coordinates: { latitude: 9.4981, longitude: 76.3388 },
        bestTimeToVisit: "September to March",
        recommendedDuration: "2 Days",
        travelStyles: ["nature", "honeymoon", "family", "wellness"],
        budgetRange: "₹8,000 - ₹20,000",
        popularActivities: ["Houseboat Stay", "Canoeing", "Ayurvedic Massage", "Village Tour"],
        tags: ["Backwaters", "Houseboat", "Tropical"],
        featured: true
    },
    {
        id: "jaipur",
        slug: "jaipur-pink-city",
        name: "Jaipur",
        state: "Rajasthan",
        region: "North India",
        country: "India",
        shortDescription: "The vibrant capital of Rajasthan, famous for its palaces, forts, and rich heritage.",
        longDescription: "Known as the Pink City due to the color of its historic buildings, Jaipur forms a part of the famous Golden Triangle tourist circuit. It is a royal city characterized by magnificent forts like Amer Fort, elegant palaces like Hawa Mahal and City Palace, and bustling markets selling traditional textiles and jewelry.",
        heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1200&auto=format&fit=crop",
        gallery: [
            "https://images.unsplash.com/photo-1599661559715-db876fce0c52?q=80&w=800&auto=format&fit=crop"
        ],
        coordinates: { latitude: 26.9124, longitude: 75.7873 },
        bestTimeToVisit: "October to March",
        recommendedDuration: "3 Days",
        travelStyles: ["heritage", "culture", "family", "photography"],
        budgetRange: "₹6,000 - ₹18,000",
        popularActivities: ["Fort Exploration", "Shopping", "Local Cuisine", "Hot Air Balloon"],
        tags: ["Palaces", "Forts", "Desert"],
        featured: true
    }
];

// Helper functions for data retrieval
const TravelDataService = {
    getAllDestinations: () => destinationsData,
    getDestinationById: (id) => destinationsData.find(d => d.id === id),
    getDestinationsByRegion: (region) => destinationsData.filter(d => d.region.toLowerCase() === region.toLowerCase()),
    searchDestinations: (query, style, region) => {
        return destinationsData.filter(d => {
            const matchQuery = query ? (d.name.toLowerCase().includes(query.toLowerCase()) || d.state.toLowerCase().includes(query.toLowerCase())) : true;
            const matchStyle = style ? d.travelStyles.includes(style) : true;
            const matchRegion = region ? d.region.toLowerCase() === region.toLowerCase() : true;
            return matchQuery && matchStyle && matchRegion;
        });
    }
};

// Export to window for global access during frontend development
window.TravelDataService = TravelDataService;
