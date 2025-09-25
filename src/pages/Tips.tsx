import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Circle, Award, Leaf, Droplets, Recycle, Heart, Plane, Home, Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Tips = () => {
  const [checkedTips, setCheckedTips] = useState<number[]>([]);
  const [greenPoints, setGreenPoints] = useState(0);

  const tipCategories = [
    {
      title: "Before You Travel",
      icon: Plane,
      color: "text-blue-500",
      tips: [
        "Choose direct flights when possible to reduce fuel consumption",
        "Pack light to minimize aircraft weight and fuel usage",
        "Research eco-friendly accommodations with green certifications",
        "Plan longer stays to reduce frequency of flights",
        "Consider train or bus travel for shorter distances"
      ]
    },
    {
      title: "Accommodation",
      icon: Home,
      color: "text-green-500",
      tips: [
        "Stay in eco-certified hotels or sustainable accommodations",
        "Reuse towels and bed linens during your stay",
        "Turn off lights, AC, and electronics when leaving your room",
        "Choose accommodations that use renewable energy",
        "Support locally-owned boutique hotels over large chains"
      ]
    },
    {
      title: "Water & Waste",
      icon: Droplets,
      color: "text-cyan-500",
      tips: [
        "Bring a reusable water bottle and refill it",
        "Avoid single-use plastics and disposable items",
        "Properly dispose of waste and recycle when possible",
        "Take shorter showers to conserve water",
        "Use reef-safe sunscreen to protect marine ecosystems"
      ]
    },
    {
      title: "Local Engagement",
      icon: Heart,
      color: "text-red-500",
      tips: [
        "Eat at local restaurants and try regional cuisine",
        "Buy souvenirs from local artisans and markets",
        "Learn basic phrases in the local language",
        "Respect local customs, traditions, and dress codes",
        "Support community-based tourism initiatives"
      ]
    },
    {
      title: "Transportation",
      icon: Recycle,
      color: "text-purple-500",
      tips: [
        "Use public transportation, walk, or bike when exploring",
        "Choose electric or hybrid rental vehicles",
        "Participate in group tours to reduce per-person impact",
        "Offset your carbon footprint through verified programs",
        "Avoid unnecessary domestic flights within your destination"
      ]
    }
  ];

  const allTips = tipCategories.flatMap((category, categoryIndex) =>
    category.tips.map((tip, tipIndex) => ({
      id: categoryIndex * 100 + tipIndex,
      text: tip,
      category: category.title,
      points: 10
    }))
  );

  const toggleTip = (tipId: number) => {
    setCheckedTips(prev => {
      const newChecked = prev.includes(tipId)
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId];
      
      const newPoints = newChecked.length * 10;
      setGreenPoints(newPoints);
      
      return newChecked;
    });
  };

  const completionPercentage = (checkedTips.length / allTips.length) * 100;

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
            Sustainable Travel Tips
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Practical tips to reduce your environmental impact and travel more sustainably.
          </motion.p>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-card-eco border-none bg-gradient-card">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-card-foreground mb-2">Your Green Journey</h3>
                    <p className="text-muted-foreground">Check off tips as you implement them in your travels</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-nature-accent mb-1">{greenPoints}</div>
                    <div className="text-sm text-muted-foreground">Green Points</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress: {checkedTips.length} of {allTips.length} tips completed</span>
                    <span className="font-semibold text-foreground">{Math.round(completionPercentage)}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-3" />
                </div>

                {completionPercentage >= 100 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 p-4 bg-nature-success/10 border border-nature-success/20 rounded-lg text-center"
                  >
                    <Award className="h-8 w-8 text-nature-success mx-auto mb-2" />
                    <h4 className="font-bold text-nature-success mb-1">Eco-Warrior Achievement Unlocked!</h4>
                    <p className="text-sm text-muted-foreground">You've completed all sustainable travel tips!</p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Tips Categories */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          {tipCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <Card className="shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Icon className={`h-8 w-8 mr-3 ${category.color}`} />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {category.tips.map((tip, tipIndex) => {
                        const tipId = categoryIndex * 100 + tipIndex;
                        const isChecked = checkedTips.includes(tipId);
                        
                        return (
                          <motion.div
                            key={tipIndex}
                            className={`flex items-start p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                              isChecked 
                                ? 'bg-nature-success/10 border border-nature-success/20' 
                                : 'bg-muted/50 hover:bg-muted/70'
                            }`}
                            onClick={() => toggleTip(tipId)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex-shrink-0 mr-3 mt-0.5">
                              {isChecked ? (
                                <CheckCircle className="h-5 w-5 text-nature-success" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-grow">
                              <p className={`text-sm leading-relaxed ${
                                isChecked ? 'text-nature-success font-medium' : 'text-muted-foreground'
                              }`}>
                                {tip}
                              </p>
                              {isChecked && (
                                <motion.div
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-2 text-xs text-nature-success font-medium"
                                >
                                  +10 Green Points ✓
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
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
            <h2 className="text-4xl font-bold mb-6">Every Action Counts</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed mb-8">
              Small changes in how we travel can have a big impact on our planet. Start implementing these tips on your next journey and inspire others to travel sustainably.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-nature-accent hover:bg-nature-accent/90 text-white">
                <a href="/calculator">Calculate Your Impact</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <a href="/community">Share Your Experience</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Tips;