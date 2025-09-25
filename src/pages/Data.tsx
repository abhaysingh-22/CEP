import { motion } from "framer-motion";
import { TrendingDown, BarChart3, Globe, DollarSign, Thermometer, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Data = () => {
  // Tourism Revenue Loss Data
  const revenueData = {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Global Tourism Revenue (Trillions USD)',
        data: [1.2, 1.3, 1.4, 1.5, 1.6, 0.7, 0.9, 1.2, 1.4],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
      {
        label: 'Climate-Related Losses (Billions USD)',
        data: [15, 18, 22, 28, 35, 45, 38, 42, 48],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
      }
    ]
  };

  // Destinations Affected Data
  const destinationsData = {
    labels: ['Coral Reefs', 'Ski Resorts', 'Coastal Areas', 'Mountain Regions', 'Island Nations', 'Arctic Regions'],
    datasets: [
      {
        label: 'Percentage Affected',
        data: [75, 68, 82, 45, 95, 88],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(20, 184, 166, 0.8)',
        ],
        borderWidth: 0,
      }
    ]
  };

  // Tourist Footfall Changes Data
  const footfallData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '2015 (Pre-Climate Impact)',
        data: [45, 52, 68, 75, 82, 95, 100, 98, 88, 72, 58, 48],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
      {
        label: '2023 (Current)',
        data: [38, 45, 62, 70, 78, 85, 88, 85, 78, 65, 52, 42],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.4,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Tourist Visits (Index: Peak = 100)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const keyStatistics = [
    {
      title: "Tourism Revenue at Risk",
      value: "$2.4T",
      description: "Global tourism revenue threatened by climate change by 2030",
      icon: DollarSign,
      color: "text-red-500"
    },
    {
      title: "Temperature Increase",
      value: "+1.1°C",
      description: "Global average temperature rise since pre-industrial times",
      icon: Thermometer,
      color: "text-orange-500"
    },
    {
      title: "Destinations at Risk",
      value: "75%",
      description: "Of world heritage sites threatened by climate change",
      icon: Globe,
      color: "text-blue-500"
    },
    {
      title: "Jobs Affected",
      value: "120M",
      description: "Tourism jobs at risk due to climate impacts globally",
      icon: Users,
      color: "text-purple-500"
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
            Data & Statistics
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore the numbers behind climate change's impact on global tourism through interactive charts and key statistics.
          </motion.p>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Key Statistics</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Understanding the scale of climate change impact on global tourism through data-driven insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStatistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center shadow-card-eco hover:shadow-eco transition-all duration-300 border-none bg-gradient-card">
                    <CardContent className="p-6">
                      <Icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                      <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                      <h3 className="font-semibold text-card-foreground mb-2">{stat.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{stat.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Revenue Loss Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-card-eco border-none bg-card">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <TrendingDown className="h-8 w-8 mr-3 text-red-500" />
                  Tourism Revenue vs Climate-Related Losses
                </CardTitle>
                <p className="text-muted-foreground">
                  Global tourism revenue and climate-related losses over time (2015-2023)
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <Bar data={revenueData} options={chartOptions} />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Destinations Affected Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full shadow-card-eco border-none bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <Globe className="h-6 w-6 mr-2 text-blue-500" />
                    Destinations Affected by Climate Change
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Percentage of destination types significantly impacted
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Doughnut data={destinationsData} options={doughnutOptions} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tourist Footfall Changes Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="h-full shadow-card-eco border-none bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <BarChart3 className="h-6 w-6 mr-2 text-green-500" />
                    Seasonal Tourism Changes
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Monthly tourist visits comparison: 2015 vs 2023
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <Line data={footfallData} options={lineChartOptions} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-4">Key Insights</h2>
            <p className="text-xl text-muted-foreground">
              What the data tells us about climate change and tourism
            </p>
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="shadow-card-eco border-none bg-gradient-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-card-foreground mb-4">Seasonal Shift Patterns</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    The data shows a clear shift in seasonal tourism patterns, with peak summer months seeing reduced visitation due to extreme heat, while shoulder seasons are becoming more popular. This represents a fundamental change in global travel behavior driven by climate concerns.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-card-eco border-none bg-gradient-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-card-foreground mb-4">Economic Impact Acceleration</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Climate-related losses in tourism are accelerating, growing from $15 billion in 2015 to $48 billion in 2023. This trend indicates that without immediate action, the economic impact will continue to compound, affecting millions of jobs worldwide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="shadow-card-eco border-none bg-gradient-card">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-card-foreground mb-4">Destination Vulnerability</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Island nations face the highest risk (95% affected), followed by coastal areas (82%) and coral reefs (75%). These destinations require immediate adaptation strategies and international support to remain viable for future tourism.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Data;