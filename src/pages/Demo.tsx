import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, ArrowRight, CheckCircle, Users, Clock, Target } from "lucide-react";

const Demo = () => {
  const demoStats = [
    { label: "Students Helped", value: "10,000+", icon: Users },
    { label: "Average Score Improvement", value: "35%", icon: Target },
    { label: "Practice Hours Saved", value: "50,000+", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <Badge variant="secondary" className="mb-6">
              🎥 Live Demo
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              See Hirescout in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Action</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Watch how our AI interviewer adapts to your responses and provides real-time feedback to help you improve.
            </p>
          </div>

          {/* Demo Video */}
          <div className="relative max-w-4xl mx-auto mb-12">
            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden shadow-2xl">
              {/* Video placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4 cursor-pointer hover:bg-white/30 transition-colors group">
                    <Play className="h-8 w-8 text-white ml-1 group-hover:scale-110 transition-transform" />
                  </div>
                  <p className="text-white font-medium">Watch Demo Video</p>
                  <p className="text-white/80 text-sm">3:42 minutes</p>
                </div>
              </div>
              
              {/* Video controls overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white">
                  <div className="flex items-center justify-between text-sm">
                    <span>Live AI Interview Demo</span>
                    <span>HD Quality</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button asChild variant="hero" size="lg" className="text-lg px-8">
              <Link to="/signup">
                Take Your First Interview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-3">
              ✨ Start with 3 free interview preps
            </p>
          </div>
        </div>
      </section>

      {/* Demo Stats */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {demoStats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                  <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll See */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              What You'll Experience
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              This demo showcases all the key features of our AI interview platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Personalized AI Interviewer",
                description: "Meet Sarah, one of our AI interviewers who adapts her questioning style based on your background and responses.",
                features: ["Natural conversation flow", "Industry-specific questions", "Real-time response analysis"]
              },
              {
                title: "Live Coding Environment",
                description: "Watch as the candidate solves coding problems with instant feedback and syntax highlighting.",
                features: ["Multiple language support", "Real-time error detection", "Performance optimization tips"]
              },
              {
                title: "Voice Recognition & Analysis",
                description: "See how our advanced voice AI transcribes speech and analyzes communication patterns.",
                features: ["Accurate speech-to-text", "Confidence level tracking", "Speaking pace analysis"]
              },
              {
                title: "Instant Performance Metrics",
                description: "Get immediate insights into technical skills, communication, and overall interview performance.",
                features: ["Detailed scoring breakdown", "Improvement recommendations", "Progress tracking"]
              }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <ul className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Walkthrough Steps */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Demo Walkthrough
            </h2>
            <p className="text-lg text-muted-foreground">
              Here's what happens in our 3-minute demo video
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                time: "0:00 - 0:30",
                title: "Setup & Introduction",
                description: "Watch as Alex uploads his resume and the AI analyzes his computer science background to create personalized questions."
              },
              {
                time: "0:30 - 1:45",
                title: "Behavioral Interview",
                description: "See a natural conversation between Alex and the AI interviewer about his project experience and problem-solving approach."
              },
              {
                time: "1:45 - 2:30",
                title: "Technical Coding Challenge",
                description: "Alex solves a linked list problem with real-time feedback and syntax highlighting in our coding environment."
              },
              {
                time: "2:30 - 3:42",
                title: "Performance Analysis",
                description: "Review the detailed scoring breakdown and personalized recommendations Alex receives after his interview."
              }
            ].map((step, index) => (
              <div key={index} className="flex items-start space-x-4 mb-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold">{step.title}</h3>
                    <Badge variant="outline" className="text-xs">{step.time}</Badge>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the same AI-powered interview preparation that helped Alex and thousands of other students succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="text-lg px-8">
                <Link to="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;