import { motion } from "framer-motion";
import { Calendar, ExternalLink, Newspaper, TrendingUp, AlertCircle, Leaf } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const News = () => {
  const newsArticles = [
    {
      title: "Maldives Launches Revolutionary Coral Restoration Program",
      excerpt: "The Maldives government announces a $50 million initiative to restore coral reefs using innovative 3D printing technology and marine biology.",
      category: "Conservation",
      date: "2024-01-15",
      readTime: "4 min read",
      image: "🏝️",
      trending: true,
      source: "Environmental Tourism News"
    },
    {
      title: "Alpine Ski Resorts Adapt to Shorter Snow Seasons",
      excerpt: "European ski destinations invest in artificial snow technology and diversify into summer activities as climate change shortens winter seasons.",
      category: "Adaptation",
      date: "2024-01-12",
      readTime: "6 min read",
      image: "⛷️",
      trending: false,
      source: "Alpine Tourism Report"
    },
    {
      title: "Costa Rica Achieves Carbon Neutral Tourism Milestone",
      excerpt: "Costa Rica becomes the first country to achieve carbon-neutral tourism certification, setting a global standard for sustainable travel.",
      category: "Achievement",
      date: "2024-01-10",
      readTime: "5 min read",
      image: "🌿",
      trending: true,
      source: "Sustainable Travel Today"
    },
    {
      title: "Venice Implements New Climate Adaptation Measures",
      excerpt: "Venice introduces advanced flood barriers and visitor management systems to protect the historic city from rising sea levels and overtourism.",
      category: "Adaptation",
      date: "2024-01-08",
      readTime: "7 min read",
      image: "🏛️",
      trending: false,
      source: "Heritage Tourism Quarterly"
    },
    {
      title: "Airlines Commit to 50% Emission Reduction by 2030",
      excerpt: "Major airline alliance announces ambitious plan to cut emissions through sustainable aviation fuels and electric aircraft development.",
      category: "Industry",
      date: "2024-01-05",
      readTime: "5 min read",
      image: "✈️",
      trending: true,
      source: "Aviation & Climate"
    },
    {
      title: "Great Barrier Reef Shows Signs of Recovery",
      excerpt: "Marine biologists report encouraging coral recovery in protected areas of the Great Barrier Reef following intensive conservation efforts.",
      category: "Conservation",
      date: "2024-01-03",
      readTime: "6 min read",
      image: "🐠",
      trending: false,
      source: "Marine Conservation News"
    },
    {
      title: "Bhutan's Gross National Happiness Tourism Model Goes Global",
      excerpt: "Multiple countries adopt Bhutan's sustainable tourism philosophy prioritizing visitor well-being and environmental protection over volume.",
      category: "Policy",
      date: "2023-12-28",
      readTime: "8 min read",
      image: "🏔️",
      trending: false,
      source: "Global Tourism Policy"
    },
    {
      title: "Solar-Powered Safari Lodges Transform African Tourism",
      excerpt: "Kenya and Tanzania lead the way with solar-powered eco-lodges that provide sustainable luxury while supporting wildlife conservation.",
      category: "Innovation",
      date: "2023-12-25",
      readTime: "5 min read",
      image: "🦁",
      trending: false,
      source: "Eco Tourism Africa"
    }
  ];

  const caseStudies = [
    {
      title: "Iceland's Geothermal Tourism Success Story",
      description: "How Iceland transformed its renewable energy advantage into a thriving sustainable tourism industry.",
      impact: "Reduced tourism carbon footprint by 60%",
      icon: "🔥"
    },
    {
      title: "Norway's Electric Ferry Revolution",
      description: "Norway's transition to electric ferries for fjord tourism demonstrates large-scale sustainable transport solutions.",
      impact: "Eliminated 85% of ferry emissions",
      icon: "⚡"
    },
    {
      title: "New Zealand's Predator-Free Islands Initiative",
      description: "Innovative conservation tourism that funds ecosystem restoration while providing unique wildlife experiences.",
      impact: "Protected 15 endemic species",
      icon: "🦅"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      Conservation: "bg-green-100 text-green-800",
      Adaptation: "bg-blue-100 text-blue-800",
      Achievement: "bg-purple-100 text-purple-800",
      Industry: "bg-orange-100 text-orange-800",
      Policy: "bg-indigo-100 text-indigo-800",
      Innovation: "bg-pink-100 text-pink-800"
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
            News & Articles
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Stay updated with the latest developments in sustainable tourism and climate change adaptation.
          </motion.p>
        </div>
      </section>

      {/* Featured & Trending News */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp className="h-8 w-8 text-nature-accent" />
              <h2 className="text-4xl font-bold text-foreground">Latest Updates</h2>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {newsArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card group-hover:bg-gradient-card">
                  <CardHeader className="relative">
                    {article.trending && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-nature-accent text-white">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                    )}
                    <div className="text-4xl mb-4">{article.image}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article.date).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-xl leading-tight group-hover:text-nature-secondary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-grow">
                    <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{article.source}</span>
                      <span className="text-muted-foreground">{article.readTime}</span>
                    </div>
                    <Button variant="ghost" className="mt-4 p-0 h-auto justify-start text-nature-secondary hover:text-nature-secondary/80">
                      Read more <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-world examples of how destinations are successfully adapting to climate change while maintaining thriving tourism industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-card">
                  <CardContent className="p-8">
                    <div className="text-5xl mb-6 text-center">{study.icon}</div>
                    <h3 className="text-xl font-bold text-card-foreground mb-4">{study.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{study.description}</p>
                    <div className="p-4 bg-nature-success/10 rounded-lg border border-nature-success/20">
                      <div className="flex items-center text-nature-success font-semibold text-sm">
                        <Leaf className="h-4 w-4 mr-2" />
                        Impact
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{study.impact}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Newspaper className="h-16 w-16 mx-auto mb-6 text-nature-accent" />
            <h2 className="text-4xl font-bold mb-6">Stay Informed</h2>
            <p className="text-xl text-primary-foreground/90 leading-relaxed mb-8">
              Get the latest updates on sustainable tourism, climate adaptation, and conservation success stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-md text-foreground bg-primary-foreground/10 border border-primary-foreground/20 placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-nature-accent"
              />
              <Button className="bg-nature-accent hover:bg-nature-accent/90 text-white px-6">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default News;