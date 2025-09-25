import { motion } from "framer-motion";
import { MapPin, Leaf, Calendar, Award, Star, TreePine, Waves, Mountain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Destinations = () => {
  const ecoDestinations = [
    {
      name: "Costa Rica",
      location: "Central America",
      icon: TreePine,
      color: "text-green-500",
      rating: 4.9,
      bestSeason: "Dec - Apr",
      whyEcoFriendly: "Leader in renewable energy and biodiversity conservation",
      practices: [
        "100% renewable electricity by 2025",
        "25% of land protected as national parks",
        "Carbon neutral tourism certification program",
        "Local community-based tourism initiatives"
      ],
      highlights: ["Cloud forests", "Wildlife reserves", "Eco-lodges", "Carbon neutral goal"]
    },
    {
      name: "Norway",
      location: "Northern Europe",
      icon: Mountain,
      color: "text-blue-500",
      rating: 4.8,
      bestSeason: "May - Sep",
      whyEcoFriendly: "Sustainable transportation and renewable energy leadership",
      practices: [
        "Electric vehicle infrastructure nationwide",
        "Hydroelectric power for most energy needs",
        "Sustainable seafood and agriculture practices",
        "Green building standards for hotels"
      ],
      highlights: ["Fjords", "Northern lights", "Electric ferries", "Clean energy"]
    },
    {
      name: "New Zealand",
      location: "Oceania",
      icon: Waves,
      color: "text-teal-500",
      rating: 4.7,
      bestSeason: "Oct - Apr",
      whyEcoFriendly: "Conservation-focused tourism and pristine nature protection",
      practices: [
        "Predator-free islands conservation program",
        "Sustainable tourism certification (Qualmark)",
        "Marine protected areas expansion",
        "Indigenous Māori sustainable practices"
      ],
      highlights: ["Marine sanctuaries", "Conservation projects", "Eco-tours", "Native species protection"]
    },
    {
      name: "Bhutan",
      location: "South Asia",
      icon: Mountain,
      color: "text-purple-500",
      rating: 4.9,
      bestSeason: "Sep - Nov, Mar - May",
      whyEcoFriendly: "Carbon negative country with constitutional environmental protection",
      practices: [
        "Carbon negative status (absorbs more CO2 than it produces)",
        "60% forest coverage mandated by constitution",
        "High-value, low-impact tourism policy",
        "Gross National Happiness over GDP focus"
      ],
      highlights: ["Carbon negative", "Forest preservation", "Sustainable tourism fees", "Cultural preservation"]
    },
    {
      name: "Iceland",
      location: "Northern Europe",
      icon: Mountain,
      color: "text-cyan-500",
      rating: 4.6,
      bestSeason: "Jun - Aug",
      whyEcoFriendly: "Geothermal energy and responsible tourism practices",
      practices: [
        "Nearly 100% renewable energy from geothermal and hydro",
        "Strict environmental regulations for tourism",
        "Sustainable fishing and agriculture",
        "Reforestation and land restoration projects"
      ],
      highlights: ["Geothermal energy", "Glacier protection", "Responsible whale watching", "Land restoration"]
    },
    {
      name: "Kenya",
      location: "East Africa",
      icon: TreePine,
      color: "text-orange-500",
      rating: 4.5,
      bestSeason: "Jun - Oct",
      whyEcoFriendly: "Community-based conservation and wildlife protection",
      practices: [
        "Community-owned conservancies",
        "Anti-poaching initiatives",
        "Renewable energy projects in rural areas",
        "Sustainable wildlife tourism practices"
      ],
      highlights: ["Wildlife conservancies", "Community tourism", "Solar power projects", "Anti-poaching efforts"]
    },
    {
      name: "Slovenia",
      location: "Central Europe",
      icon: TreePine,
      color: "text-green-600",
      rating: 4.4,
      bestSeason: "Apr - Oct",
      whyEcoFriendly: "First country to be declared a Green Destination of the world",
      practices: [
        "Green Scheme of Slovenian Tourism certification",
        "Extensive protected natural areas",
        "Sustainable mobility initiatives",
        "Local food and wine tourism focus"
      ],
      highlights: ["Green certification", "Protected areas", "Sustainable mobility", "Local cuisine focus"]
    },
    {
      name: "Palau",
      location: "Micronesia",
      icon: Waves,
      color: "text-blue-400",
      rating: 4.8,
      bestSeason: "Nov - Apr",
      whyEcoFriendly: "Marine sanctuary and sustainable tourism pioneers",
      practices: [
        "80% of waters designated as marine sanctuary",
        "Palau Pledge for responsible tourism",
        "Shark sanctuary protection",
        "Visitor environmental education programs"
      ],
      highlights: ["Marine sanctuary", "Shark protection", "Visitor pledge", "Coral conservation"]
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