import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Send, Star, CheckCircle, User, Mail, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface FeedbackItem {
  id: number;
  name: string;
  email: string;
  feedback: string;
  rating: number;
  date: string;
  type: string;
}

const Feedback = () => {
  const { toast } = useToast();
  const [feedbackList, setFeedbackList] = useState<FeedbackItem[]>([
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      feedback: "This website has been incredibly helpful in planning my sustainable travels. The carbon calculator opened my eyes to the impact of different transportation methods. I've already started choosing trains over flights for shorter distances!",
      rating: 5,
      date: "2024-01-15",
      type: "praise"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@example.com",
      feedback: "Love the eco-friendly destinations section! It would be great to have more information about budget-friendly sustainable accommodations. Also, maybe add a section about eco-friendly packing tips?",
      rating: 4,
      date: "2024-01-12",
      type: "suggestion"
    },
    {
      id: 3,
      name: "David Chen",
      email: "david@example.com",
      feedback: "The data visualization section is fantastic. As someone working in tourism policy, I find the statistics very useful for presentations. Could you add more recent data on renewable energy adoption in tourism?",
      rating: 5,
      date: "2024-01-10",
      type: "suggestion"
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@example.com",
      feedback: "Thank you for creating this resource! The sustainable travel tips have completely changed how I plan my trips. I'm now more conscious about my choices and feel good about traveling responsibly.",
      rating: 5,
      date: "2024-01-08",
      type: "praise"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
    rating: 0,
    type: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.feedback) {
      const newFeedback: FeedbackItem = {
        id: feedbackList.length + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setFeedbackList([newFeedback, ...feedbackList]);
      setFormData({ name: "", email: "", feedback: "", rating: 0, type: "" });
      
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve the platform for everyone.",
      });
    }
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating 
                ? 'text-yellow-500 fill-yellow-500' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'praise':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'suggestion':
        return <MessageCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'praise':
        return 'bg-green-100 text-green-800';
      case 'suggestion':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
            Feedback & Suggestions
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Help us improve by sharing your thoughts, suggestions, and experiences with our platform.
          </motion.p>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-card-eco border-none bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <MessageSquare className="mr-3 h-8 w-8 text-nature-accent" />
                  Share Your Feedback
                </CardTitle>
                <p className="text-muted-foreground">
                  Your input is valuable to us. Please share your thoughts, suggestions, or experiences.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="type">Feedback Type</Label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select feedback type</option>
                      <option value="praise">Praise</option>
                      <option value="suggestion">Suggestion</option>
                      <option value="issue">Issue/Problem</option>
                      <option value="feature">Feature Request</option>
                      <option value="general">General Feedback</option>
                    </select>
                  </div>

                  <div>
                    <Label>Rate Your Experience</Label>
                    <div className="mt-2">
                      {renderStars(formData.rating, true, (rating) => 
                        setFormData(prev => ({ ...prev, rating }))
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="feedback">Your Feedback</Label>
                    <Textarea
                      id="feedback"
                      value={formData.feedback}
                      onChange={(e) => setFormData(prev => ({ ...prev, feedback: e.target.value }))}
                      placeholder="Please share your thoughts, suggestions, or experiences with our platform..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-nature-accent hover:bg-nature-accent/90 text-white"
                    size="lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Submit Feedback
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Feedback Display */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Community Feedback</h2>
            <p className="text-xl text-muted-foreground">
              See what others are saying about their experience with our platform
            </p>
          </motion.div>

          <div className="space-y-6">
            {feedbackList.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-nature-secondary text-white">
                          {feedback.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-card-foreground">{feedback.name}</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(feedback.date).toLocaleDateString()}
                          </span>
                          {feedback.type && (
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(feedback.type)}`}>
                              {getTypeIcon(feedback.type)}
                              <span className="ml-1 capitalize">{feedback.type}</span>
                            </span>
                          )}
                        </div>
                        
                        {feedback.rating > 0 && (
                          <div className="mb-3">
                            {renderStars(feedback.rating)}
                          </div>
                        )}
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {feedback.feedback}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MessageSquare className="h-16 w-16 mx-auto mb-6 text-nature-accent" />
            <h2 className="text-4xl font-bold mb-6">Thank You for Your Input</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Your feedback drives our continuous improvement. Every suggestion, comment, and rating helps us create a better platform for sustainable tourism awareness and education.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Feedback;