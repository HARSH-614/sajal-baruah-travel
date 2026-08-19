/**
 * Oxim - Master Package Database
 * Structured data model for curated travel packages.
 * In a production environment, this would be served via an API.
 */

const packagesData = [
    {
        id: "assam-classic",
        slug: "the-assam-classic-trail",
        name: "The Assam Classic Trail",
        destinations: ["Guwahati", "Kaziranga", "Majuli"],
        region: "North-East",
        duration: { days: 6, nights: 5 },
        startingPrice: 28500,
        priceLabel: "Indicative Price",
        difficulty: "Easy",
        travelStyle: "heritage",
        bestSeason: "October to April",
        groupSize: "2 - 12",
        accommodationType: "Premium Eco-Resorts & Heritage Hotels",
        transport: "Private AC SUV",
        heroImage: "https://images.unsplash.com/photo-1526715161427-d7790eb9321c?q=80&w=1200&auto=format&fit=crop",
        shortDescription: "Experience the magic of Kaziranga's wildlife, centuries-old tea estates, and the spiritual tranquility of Majuli.",
        itinerary: [
            {
                day: 1,
                title: "Arrival in Guwahati",
                description: "Arrive at Lokpriya Gopinath Bordoloi International Airport. Transfer to hotel. Evening sunset cruise on the Brahmaputra River.",
                accommodation: "Brahmaputra Heritage Hotel",
                meals: ["Dinner"]
            },
            {
                day: 2,
                title: "Guwahati to Kaziranga",
                description: "Morning visit to Kamakhya Temple. Drive to Kaziranga National Park (approx 4.5 hours). Evening leisure at the eco-resort.",
                accommodation: "Kaziranga Eco-Resort",
                meals: ["Breakfast", "Dinner"]
            },
            {
                day: 3,
                title: "Kaziranga Safari Experience",
                description: "Early morning Elephant Safari in the Central Range. Afternoon Jeep Safari in the Western Range. Evening cultural show featuring Bihu dance.",
                accommodation: "Kaziranga Eco-Resort",
                meals: ["Breakfast", "Lunch", "Dinner"]
            },
            {
                day: 4,
                title: "Kaziranga to Majuli",
                description: "Drive to Nimati Ghat and take a scenic ferry crossing over the Brahmaputra to Majuli Island. Check into traditional bamboo cottages.",
                accommodation: "Majuli Bamboo Retreat",
                meals: ["Breakfast", "Dinner"]
            },
            {
                day: 5,
                title: "Exploring Neo-Vaishnavite Culture",
                description: "Visit prominent Satras (monasteries). Interact with monks and witness traditional mask-making in Samaguri Satra. Bicycle tour of local Mishing villages.",
                accommodation: "Majuli Bamboo Retreat",
                meals: ["Breakfast", "Lunch", "Dinner"]
            },
            {
                day: 6,
                title: "Departure",
                description: "Ferry back to Jorhat. Transfer to Jorhat Airport for your onward journey.",
                accommodation: "None",
                meals: ["Breakfast"]
            }
        ],
        inclusions: ["Accommodation for 5 nights", "Daily breakfast and dinner", "1 Elephant Safari, 1 Jeep Safari", "Ferry transfers to Majuli", "Private AC vehicle"],
        exclusions: ["Flights/Train tickets", "Camera fees", "Personal expenses", "Travel Insurance"],
        featured: true
    },
    {
        id: "spiti-expedition",
        slug: "himalayan-expedition-spiti",
        name: "Himalayan Expedition: Spiti",
        destinations: ["Shimla", "Kalpa", "Kaza", "Chandratal", "Manali"],
        region: "North India",
        duration: { days: 9, nights: 8 },
        startingPrice: 35000,
        priceLabel: "Indicative Price",
        difficulty: "Challenging",
        travelStyle: "adventure",
        bestSeason: "June to September",
        groupSize: "4 - 10",
        accommodationType: "Homestays & Premium Camps",
        transport: "4x4 SUV",
        heroImage: "https://images.unsplash.com/photo-1517427677505-61105a46a485?q=80&w=1200&auto=format&fit=crop",
        shortDescription: "A thrilling road trip through the rugged, spiritual, and high-altitude landscapes of Himachal Pradesh.",
        itinerary: [
            {
                day: 1,
                title: "Shimla to Sarahan",
                description: "Drive through the lush green valleys of Shimla. Visit the Bhimakali Temple in Sarahan.",
                accommodation: "Sarahan Guest House",
                meals: ["Dinner"]
            },
            {
                day: 2,
                title: "Sarahan to Kalpa",
                description: "Enter the Kinnaur Valley. Enjoy the majestic views of the Kinner Kailash peaks.",
                accommodation: "Kalpa View Retreat",
                meals: ["Breakfast", "Dinner"]
            }
            // Additional days omitted for brevity in development, full architecture supported
        ],
        inclusions: ["Accommodation for 8 nights", "Breakfast & Dinner", "Inner line permits", "Oxygen cylinder in vehicle", "Experienced Himalayan driver"],
        exclusions: ["Flights to Chandigarh/Delhi", "Lunch", "Monastery donations"],
        featured: true
    },
    {
        id: "kerala-tranquility",
        slug: "kerala-tranquility-tour",
        name: "Kerala Tranquility Tour",
        destinations: ["Munnar", "Thekkady", "Alleppey"],
        region: "South India",
        duration: { days: 5, nights: 4 },
        startingPrice: 22000,
        priceLabel: "Indicative Price",
        difficulty: "Easy",
        travelStyle: "nature",
        bestSeason: "September to March",
        groupSize: "2 - 6",
        accommodationType: "Luxury Resorts & Houseboat",
        transport: "Private Sedan",
        heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop",
        shortDescription: "From mist-covered tea plantations to the serene backwaters, experience the diverse beauty of God's Own Country.",
        itinerary: [
            {
                day: 1,
                title: "Cochin to Munnar",
                description: "Arrive at Cochin and drive to Munnar. Enroute visit Cheeyappara Waterfalls.",
                accommodation: "Munnar Tea Resort",
                meals: ["Dinner"]
            }
            // Additional days omitted for brevity
        ],
        inclusions: ["4 Nights Accommodation", "1 Night Premium Houseboat", "All meals on Houseboat", "Sightseeing transfers"],
        exclusions: ["Entry fees at parks", "Ayurvedic Spa treatments"],
        featured: false
    }
];

const PackageDataService = {
    getAllPackages: () => packagesData,
    getPackageById: (id) => packagesData.find(p => p.id === id),
    searchPackages: (filters) => {
        return packagesData.filter(p => {
            const matchRegion = filters.region ? p.region.toLowerCase() === filters.region.toLowerCase() : true;
            const matchStyle = filters.style ? p.travelStyle === filters.style : true;
            return matchRegion && matchStyle;
        });
    }
};

window.PackageDataService = PackageDataService;
