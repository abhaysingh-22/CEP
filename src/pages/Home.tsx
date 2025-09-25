import { motion } from "framer-motion";
import { ArrowRight, Leaf, Calculator, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        <motion.div 
          className="relative z-10 max-w-4xl mx-auto px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sustainable Tourism
            <span className="block text-nature-accent">& Climate Change</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover how climate change is impacting tourism worldwide and learn to travel responsibly.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-nature-accent hover:bg-nature-accent/90 text-white px-8 py-3 text-lg shadow-glow">
              <Link to="/calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate Your Impact
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg">
              <Link to="/destinations">
                <MapPin className="mr-2 h-5 w-5" />
                Explore Green Destinations
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-20 px-6 bg-gradient-card">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Start Your Sustainable Journey
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Calculator className="h-8 w-8 text-nature-accent mr-3" />
                    <h3 className="text-2xl font-semibold text-card-foreground">Carbon Footprint Calculator</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Calculate the environmental impact of your travels and discover greener alternatives.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to="/calculator">
                      Calculate Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Leaf className="h-8 w-8 text-nature-success mr-3" />
                    <h3 className="text-2xl font-semibold text-card-foreground">Eco-Friendly Destinations</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg">
                    Explore beautiful destinations committed to sustainable tourism practices.
                  </p>
                  <Button asChild className="bg-nature-success hover:bg-nature-success/90 text-white">
                    <Link to="/destinations">
                      Explore Destinations <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;