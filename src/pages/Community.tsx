import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Plus, MapPin, Calendar, Heart, Share2, Camera, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: number;
  name: string;
  location: string;
  experience: string;
  date: string;
  category: string;
  likes: number;
}

const Community = () => {
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      name: "Priya Sharma",
      location: "Kerala",
      experience: "Stayed at an incredible eco-lodge in Munnar where 100% of energy came from solar panels. The owners taught us about local tea plantation conservation and we even helped plant trees in their reforestation project. The lodge employed local guides and sourced all food from nearby organic farms.",
      date: "2024-01-10",
      category: "Eco Lodge",
      likes: 24
    },
    {
      id: 2,
      name: "Arjun Patel",
      location: "Delhi",
      experience: "Took the Delhi Metro - India's largest and greenest urban transport! The experience was efficient and eco-friendly. We learned about the solar-powered stations and how they're transforming urban transportation while reducing carbon emissions.",
      date: "2024-01-08",
      category: "Green Transport",
      likes: 31
    },
    {
      id: 3,
      name: "Anjali Verma",
      location: "Kolkata",
      experience: "Participated in a Sundarbans mangrove conservation project protecting Royal Bengal tiger habitat. It felt amazing to contribute to protecting native species while learning about ecosystem restoration. The local guides were passionate conservationists.",
      date: "2024-01-05",
      category: "Conservation",
      likes: 18
    },
    {
      id: 4,
      name: "Vikram Singh",
      location: "Jammu & Kashmir",
      experience: "The Dal Lake conservation efforts made this trip special. Our guide explained how local communities work to protect the ecosystem and maintain traditional houseboat tourism sustainably. Every aspect was designed to minimize environmental impact while preserving cultural heritage.",
      date: "2024-01-03",
      category: "Sustainable Policy",
      likes: 42
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newExperience, setNewExperience] = useState({
    name: "",
    location: "",
    experience: "",
    category: ""
  });

  const categories = [
    "Eco Lodge",
    "Green Transport",
    "Conservation",
    "Local Community",
    "Sustainable Policy",
    "Renewable Energy",
    "Wildlife Protection",
    "Cultural Exchange"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExperience.name && newExperience.location && newExperience.experience) {
      const experience: Experience = {
        id: experiences.length + 1,
        ...newExperience,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      };
      setExperiences([experience, ...experiences]);
      setNewExperience({ name: "", location: "", experience: "", category: "" });
      setShowForm(false);
    }
  };

  const handleLike = (id: number) => {
    setExperiences(prev =>
      prev.map(exp =>
        exp.id === id ? { ...exp, likes: exp.likes + 1 } : exp
      )
    );
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Eco Lodge": "bg-green-100 text-green-800",
      "Green Transport": "bg-blue-100 text-blue-800",
      "Conservation": "bg-purple-100 text-purple-800",
      "Local Community": "bg-orange-100 text-orange-800",
      "Sustainable Policy": "bg-indigo-100 text-indigo-800",
      "Renewable Energy": "bg-yellow-100 text-yellow-800",
      "Wildlife Protection": "bg-pink-100 text-pink-800",
      "Cultural Exchange": "bg-teal-100 text-teal-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
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
            Travel Community
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Share your sustainable travel experiences and inspire others to travel responsibly.
          </motion.p>
        </div>
      </section>

      {/* Add Experience Button */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={() => setShowForm(!showForm)}
              size="lg"
              className="bg-nature-accent hover:bg-nature-accent/90 text-white shadow-glow"
            >
              <Plus className="mr-2 h-5 w-5" />
              Share Your Experience
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Add Experience Form */}
      {showForm && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-12"
        >
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-card-eco border-none bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Camera className="mr-3 h-6 w-6 text-nature-accent" />
                  Share Your Sustainable Travel Experience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={newExperience.name}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Destination</Label>
                      <Input
                        id="location"
                        value={newExperience.location}
                        onChange={(e) => setNewExperience(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Where did you travel?"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Experience Category</Label>
                    <select
                      id="category"
                      value={newExperience.category}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Your Experience</Label>
                    <Textarea
                      id="experience"
                      value={newExperience.experience}
                      onChange={(e) => setNewExperience(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="Tell us about your sustainable travel experience..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="submit" className="bg-nature-success hover:bg-nature-success/90 text-white">
                      Share Experience
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </motion.section>
      )}

      {/* Experiences Feed */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Community Experiences</h2>
            <p className="text-xl text-muted-foreground">
              Real stories from sustainable travelers around the world
            </p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                <Card className="shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-nature-accent text-white">
                          {experience.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-card-foreground">{experience.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4 mr-1" />
                            {experience.location}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(experience.date).toLocaleDateString()}
                          </div>
                        </div>
                        
                        {experience.category && (
                          <Badge className={`mb-3 ${getCategoryColor(experience.category)}`}>
                            <Leaf className="h-3 w-3 mr-1" />
                            {experience.category}
                          </Badge>
                        )}
                        
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {experience.experience}
                        </p>
                        
                        <div className="flex items-center gap-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(experience.id)}
                            className="text-muted-foreground hover:text-nature-accent"
                          >
                            <Heart className="h-4 w-4 mr-1" />
                            {experience.likes}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground hover:text-nature-secondary"
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
            <Users className="h-16 w-16 mx-auto mb-6 text-nature-accent" />
            <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed mb-8">
              Connect with like-minded travelers, share your sustainable travel experiences, and inspire others to make responsible choices. Together, we can create a more sustainable future for tourism.
            </p>
            <Button
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-nature-accent hover:bg-nature-accent/90 text-white"
            >
              <Plus className="mr-2 h-5 w-5" />
              Share Your Story
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Community;