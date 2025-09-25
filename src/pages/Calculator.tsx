import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Train, Car, Calculator as CalcIcon, Leaf, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Calculator = () => {
  const [travelMode, setTravelMode] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<null | {
    emissions: number;
    mode: string;
    suggestions: string[];
  }>(null);

  const transportModes = [
    { value: "flight", label: "Flight", icon: Plane, factor: 0.15, color: "text-red-500" },
    { value: "train", label: "Train", icon: Train, factor: 0.04, color: "text-green-500" },
    { value: "car", label: "Car", icon: Car, factor: 0.12, color: "text-orange-500" },
  ];

  const calculateEmissions = () => {
    if (!travelMode || !distance) return;

    const selectedMode = transportModes.find(mode => mode.value === travelMode);
    if (!selectedMode) return;

    const emissions = parseFloat(distance) * selectedMode.factor;
    
    const suggestions = getSuggestions(travelMode, emissions);
    
    setResult({
      emissions: Math.round(emissions * 100) / 100,
      mode: selectedMode.label,
      suggestions
    });
  };

  const getSuggestions = (mode: string, emissions: number): string[] => {
    const baseSuggestions = [
      "Offset your carbon footprint through verified carbon offset programs",
      "Choose eco-friendly accommodations with green certifications",
      "Support local businesses and communities at your destination"
    ];

    switch (mode) {
      case "flight":
        return [
          "Consider train travel for shorter distances (under 1000km)",
          "Choose direct flights when flying is necessary",
          "Pack light to reduce fuel consumption",
          ...baseSuggestions
        ];
      case "car":
        return [
          "Consider carpooling or ride-sharing to reduce per-person emissions",
          "Choose electric or hybrid vehicles when available",
          "Combine multiple destinations in one trip",
          ...baseSuggestions
        ];
      case "train":
        return [
          "Great choice! Trains are one of the most eco-friendly travel options",
          "Look for trains powered by renewable energy",
          ...baseSuggestions.slice(1)
        ];
      default:
        return baseSuggestions;
    }
  };

  const getEmissionLevel = (emissions: number) => {
    if (emissions < 50) return { level: "Low", color: "text-green-500", bg: "bg-green-50" };
    if (emissions < 150) return { level: "Medium", color: "text-orange-500", bg: "bg-orange-50" };
    return { level: "High", color: "text-red-500", bg: "bg-red-50" };
  };

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
            Carbon Footprint Calculator
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Calculate the environmental impact of your travels and discover ways to reduce your carbon footprint.
          </motion.p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-card-eco border-none bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <CalcIcon className="mr-3 h-8 w-8 text-nature-accent" />
                    Calculate Your Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="transport-mode" className="text-base font-medium">
                      Travel Mode
                    </Label>
                    <Select value={travelMode} onValueChange={setTravelMode}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your mode of transport" />
                      </SelectTrigger>
                      <SelectContent>
                        {transportModes.map((mode) => {
                          const Icon = mode.icon;
                          return (
                            <SelectItem key={mode.value} value={mode.value}>
                              <div className="flex items-center">
                                <Icon className={`mr-2 h-4 w-4 ${mode.color}`} />
                                {mode.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="distance" className="text-base font-medium">
                      Distance (km)
                    </Label>
                    <Input
                      id="distance"
                      type="number"
                      placeholder="Enter distance in kilometers"
                      value={distance}
                      onChange={(e) => setDistance(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <Button 
                    onClick={calculateEmissions}
                    disabled={!travelMode || !distance}
                    className="w-full bg-nature-accent hover:bg-nature-accent/90 text-white"
                    size="lg"
                  >
                    Calculate Emissions
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {result ? (
                <Card className="shadow-card-eco border-none bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Leaf className="mr-3 h-8 w-8 text-nature-success" />
                      Your Carbon Footprint
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-foreground mb-2">
                        {result.emissions} kg CO₂
                      </div>
                      <div className="text-lg text-muted-foreground">
                        for {distance}km by {result.mode}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-3 ${getEmissionLevel(result.emissions).bg} ${getEmissionLevel(result.emissions).color}`}>
                        {getEmissionLevel(result.emissions).level} Impact
                      </div>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Context:</strong> The average person's annual carbon footprint is about 4,000 kg CO₂. Your trip represents {((result.emissions / 4000) * 100).toFixed(1)}% of that.
                      </AlertDescription>
                    </Alert>

                    <div>
                      <h4 className="font-semibold text-lg mb-3 text-foreground">Sustainable Alternatives:</h4>
                      <ul className="space-y-2">
                        {result.suggestions.map((suggestion, index) => (
                          <li key={index} className="flex items-start">
                            <Leaf className="h-4 w-4 text-nature-success mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground text-sm">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground">
                    <CalcIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Select your travel mode and distance to calculate your carbon footprint.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Transport Comparison */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Transport Comparison</h2>
            <p className="text-xl text-muted-foreground">CO₂ emissions per kilometer by transport mode</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {transportModes.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <motion.div
                  key={mode.value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="text-center shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                    <CardContent className="p-8">
                      <Icon className={`h-16 w-16 mx-auto mb-4 ${mode.color}`} />
                      <h3 className="text-2xl font-bold text-card-foreground mb-2">{mode.label}</h3>
                      <div className="text-3xl font-bold text-foreground mb-2">
                        {mode.factor} kg
                      </div>
                      <div className="text-sm text-muted-foreground">CO₂ per km</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculator;