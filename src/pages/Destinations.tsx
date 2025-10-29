import { motion } from "framer-motion";
import { MapPin, Leaf, Calendar, Award, Star, TreePine, Waves, Mountain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Destinations = () => {
  const ecoDestinations = [
    {
      name: "Kerala",
      location: "South India",
      icon: Waves,
      color: "text-green-500",
      rating: 4.8,
      bestSeason: "Oct - Mar",
      whyEcoFriendly: "India's first state to implement Responsible Tourism with award-winning backwater conservation",
      practices: [
        "Responsible Tourism Initiative since 2008",
        "Traditional Ayurvedic eco-resorts and wellness",
        "Backwater ecosystem conservation programs",
        "Community-based tourism with local participation"
      ],
      highlights: ["Backwater tourism", "Ayurveda wellness", "Spice plantations", "Beach conservation"]
    },
    {
      name: "Jammu & Kashmir",
      location: "North India",
      icon: Mountain,
      color: "text-blue-500",
      rating: 4.7,
      bestSeason: "Apr - Oct",
      whyEcoFriendly: "Himalayan biodiversity hotspot with sustainable houseboat tourism and protected valleys",
      practices: [
        "Dal Lake conservation and restoration programs",
        "Eco-friendly houseboat regulations",
        "Protected wildlife corridors and national parks",
        "Traditional handicraft tourism supporting locals"
      ],
      highlights: ["Himalayan peaks", "Houseboat stays", "Valley conservation", "Alpine meadows"]
    },
    {
      name: "Jaipur",
      location: "Rajasthan",
      icon: TreePine,
      color: "text-orange-500",
      rating: 4.6,
      bestSeason: "Nov - Feb",
      whyEcoFriendly: "UNESCO World Heritage City pioneering sustainable heritage conservation and solar energy adoption",
      practices: [
        "Heritage building conservation programs",
        "Solar energy integration in historical monuments",
        "Traditional rainwater harvesting system revival",
        "Eco-friendly elephant rescue sanctuaries"
      ],
      highlights: ["Heritage conservation", "Solar initiatives", "Elephant welfare", "Pink city charm"]
    },
    {
      name: "Kolkata",
      location: "West Bengal",
      icon: Waves,
      color: "text-teal-500",
      rating: 4.5,
      bestSeason: "Oct - Mar",
      whyEcoFriendly: "Gateway to Sundarbans mangrove conservation with rich cultural heritage preservation",
      practices: [
        "Sundarbans UNESCO World Heritage protection",
        "Royal Bengal tiger conservation initiatives",
        "Historic tram system revival for green transport",
        "Wetland ecosystem preservation programs"
      ],
      highlights: ["Sundarbans mangroves", "Tiger reserves", "Cultural heritage", "Wetland protection"]
    },
    {
      name: "Delhi",
      location: "National Capital Territory",
      icon: TreePine,
      color: "text-green-600",
      rating: 4.4,
      bestSeason: "Oct - Mar",
      whyEcoFriendly: "Leading India in metro expansion and green spaces with extensive tree plantation drives",
      practices: [
        "Extensive metro rail network spanning 350+ km",
        "Urban forest development and green belt programs",
        "Solar rooftop initiatives across government buildings",
        "Heritage monument conservation and green tourism"
      ],
      highlights: ["Green metro system", "Urban forests", "Solar energy", "Heritage sites"]
    },
    {
      name: "Amritsar",
      location: "Punjab",
      icon: TreePine,
      color: "text-amber-500",
      rating: 4.7,
      bestSeason: "Nov - Mar",
      whyEcoFriendly: "Community-driven heritage conservation with sustainable temple management practices",
      practices: [
        "Golden Temple eco-friendly langar feeding 100,000+ daily",
        "Community-based tourism with local guides",
        "Traditional water body conservation efforts",
        "Renewable energy adoption in religious sites"
      ],
      highlights: ["Golden Temple", "Community tourism", "Langar sustainability", "Heritage walks"]
    },
    {
      name: "Pune",
      location: "Maharashtra",
      icon: Mountain,
      color: "text-cyan-500",
      rating: 4.5,
      bestSeason: "Oct - Feb",
      whyEcoFriendly: "Smart city pioneer with extensive green building initiatives and sustainable urban planning",
      practices: [
        "Smart City green infrastructure and IoT projects",
        "Eco-certified hotels, resorts and homestays",
        "Western Ghats biodiversity hotspot conservation",
        "Waste-to-energy and recycling programs"
      ],
      highlights: ["Smart city", "Green buildings", "Sahyadri trails", "Eco-homestays"]
    },
    {
      name: "Ayodhya",
      location: "Uttar Pradesh",
      icon: Waves,
      color: "text-blue-600",
      rating: 4.6,
      bestSeason: "Oct - Mar",
      whyEcoFriendly: "Heritage city with Saryu River conservation and sustainable pilgrimage tourism development",
      practices: [
        "Saryu River rejuvenation and cleanup project",
        "Eco-friendly ghats and sustainable infrastructure",
        "Heritage site green management practices",
        "Traditional handicrafts and cultural tourism"
      ],
      highlights: ["Saryu riverfront", "Heritage temples", "Pilgrimage tourism", "Cultural preservation"]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-hero text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Eco-Friendly Destinations
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover beautiful destinations committed to sustainable tourism practices and environmental conservation.
          </motion.p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Sustainable Travel Destinations</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              These destinations lead the way in environmental protection, sustainable practices, and responsible tourism.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {ecoDestinations.map((destination, index) => {
              const Icon = destination.icon;
              return (
                <motion.div
                  key={destination.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-gradient-card group-hover:bg-card">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <Icon className={`h-8 w-8 mr-3 ${destination.color}`} />
                          <div>
                            <CardTitle className="text-2xl text-card-foreground">{destination.name}</CardTitle>
                            <p className="text-muted-foreground flex items-center mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {destination.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm font-semibold">{destination.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          Best: {destination.bestSeason}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-2 flex items-center">
                          <Leaf className="h-4 w-4 mr-2 text-nature-success" />
                          Why It's Eco-Friendly
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {destination.whyEcoFriendly}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3">Sustainable Practices</h4>
                        <ul className="space-y-2">
                          {destination.practices.map((practice, idx) => (
                            <li key={idx} className="flex items-start text-sm text-muted-foreground">
                              <Award className="h-3 w-3 mr-2 mt-1 text-nature-accent flex-shrink-0" />
                              {practice}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-card-foreground mb-3">Key Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.map((highlight, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Leaf className="h-16 w-16 mx-auto mb-6 text-nature-accent" />
            <h2 className="text-4xl font-bold mb-6">Choose Sustainable Destinations</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed mb-8">
              By choosing eco-friendly destinations, you support conservation efforts, local communities, and sustainable tourism practices that help preserve our planet's most beautiful places.
            </p>
            <motion.a
              href="/tips"
              className="inline-flex items-center px-8 py-3 bg-nature-accent hover:bg-nature-accent/90 text-white rounded-md font-medium transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn Sustainable Travel Tips
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;