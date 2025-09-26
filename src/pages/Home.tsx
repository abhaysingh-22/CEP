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
        className="relative min-h-screen h-screen flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40"></div>
        <motion.div 
          className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 safe-area-top"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Sustainable Tourism
            <span className="block text-nature-accent mt-2">& Climate Change</span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover how climate change is impacting tourism worldwide and learn to travel responsibly.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-nature-accent hover:bg-nature-accent/90 text-white px-6 sm:px-8 py-3 text-base sm:text-lg shadow-glow w-full sm:w-auto touch-target">
              <Link to="/calculator" className="flex items-center justify-center">
                <Calculator className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Calculate Your Impact
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto touch-target">
              <Link to="/destinations" className="flex items-center justify-center">
                <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Explore Destinations
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 text-foreground px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Start Your Sustainable Journey
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3">
                    <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-nature-accent flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-card-foreground">Carbon Footprint Calculator</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                    Calculate the environmental impact of your travels and discover greener alternatives.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90 w-full sm:w-auto touch-target">
                    <Link to="/calculator" className="flex items-center justify-center">
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
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-3">
                    <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-nature-success flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-card-foreground">Eco-Friendly Destinations</h3>
                  </div>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                    Explore beautiful destinations committed to sustainable tourism practices.
                  </p>
                  <Button asChild className="bg-nature-success hover:bg-nature-success/90 text-white w-full sm:w-auto touch-target">
                    <Link to="/destinations" className="flex items-center justify-center">
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