import { motion } from "framer-motion";
import { Thermometer, Waves, CloudRain, Mountain, Heart, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const climateFactors = [
    {
      icon: Thermometer,
      title: "Rising Temperatures",
      description: "Global temperatures have increased by 1.1°C since pre-industrial times, affecting seasonal patterns and destination weather.",
      color: "text-red-500"
    },
    {
      icon: Waves,
      title: "Sea Level Rise",
      description: "Ocean levels are rising at 3.3mm per year, threatening coastal destinations and island nations worldwide.",
      color: "text-blue-500"
    },
    {
      icon: CloudRain,
      title: "Extreme Weather",
      description: "Increased frequency of hurricanes, droughts, and floods disrupts travel plans and damages tourism infrastructure.",
      color: "text-purple-500"
    }
  ];

  const impactExamples = [
    {
      location: "The Himalayas",
      issue: "Melting Glaciers",
      description: "Rising temperatures are causing rapid glacier retreat, affecting trekking routes and water sources for mountain communities.",
      icon: Mountain
    },
    {
      location: "Maldives",
      issue: "Coral Bleaching",
      description: "Ocean warming and acidification are causing widespread coral bleaching, threatening marine tourism and local ecosystems.",
      icon: Waves
    },
    {
      location: "Europe",
      issue: "Heat Waves",
      description: "Record-breaking temperatures make summer travel uncomfortable and increase energy costs for tourism facilities.",
      icon: Thermometer
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
            Climate Change & Tourism
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Understanding the complex relationship between our changing climate and the tourism industry that connects us to the world's most beautiful destinations.
          </motion.p>
        </div>
      </section>

      {/* Climate Factors Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Understanding Climate Change</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Climate change encompasses several interconnected phenomena that directly impact tourism destinations and travel experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {climateFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <motion.div
                  key={factor.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="h-full shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-gradient-card">
                    <CardHeader className="text-center">
                      <Icon className={`h-16 w-16 mx-auto mb-4 ${factor.color}`} />
                      <CardTitle className="text-2xl">{factor.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{factor.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Examples */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Real-World Examples</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Climate change is already affecting some of the world's most beloved travel destinations.
            </p>
          </motion.div>

          <div className="space-y-8">
            {impactExamples.map((example, index) => {
              const Icon = example.icon;
              return (
                <motion.div
                  key={example.location}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                    <CardContent className="flex items-center p-8">
                      <div className="flex-shrink-0 mr-8">
                        <Icon className="h-16 w-16 text-nature-secondary" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-card-foreground mb-2">{example.location}</h3>
                        <h4 className="text-lg font-semibold text-nature-accent mb-3">{example.issue}</h4>
                        <p className="text-muted-foreground leading-relaxed">{example.description}</p>
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
            <Globe className="h-16 w-16 mx-auto mb-6 text-nature-accent" />
            <h2 className="text-4xl font-bold mb-6">Together We Can Make a Difference</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              By understanding climate change and its impacts on tourism, we can make informed decisions that help preserve the destinations we love for future generations. Every sustainable choice counts.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;