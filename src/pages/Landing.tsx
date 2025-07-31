import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Target, 
  MessageSquare, 
  Code, 
  BarChart3, 
  Users, 
  Star,
  ArrowRight,
  CheckCircle,
  Play
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Target,
      title: "Personalized Questions",
      description: "Tailored to your resume & experience level"
    },
    {
      icon: Code,
      title: "Real-time Coding",
      description: "Instant feedback as you code live"
    },
    {
      icon: MessageSquare,
      title: "Voice Interaction",
      description: "Talk naturally with the AI interviewer"
    },
    {
      icon: BarChart3,
      title: "Detailed Analysis",
      description: "Performance breakdown and improvement tips"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CS Student at MIT",
      content: "Hirescout helped me land my dream internship at Google. The AI feedback was incredibly detailed and actionable.",
      rating: 5
    },
    {
      name: "Alex Kumar",
      role: "Bootcamp Graduate",
      content: "The coding practice feature is amazing. I went from failing technical interviews to getting multiple offers.",
      rating: 5
    },
    {
      name: "Maya Rodriguez",
      role: "New Grad Engineer",
      content: "The voice interaction feels so real. It's like having a personal interview coach available 24/7.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6">
              ✨ AI-Powered Interview Preparation
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ace Every Interview with AI-Powered Mock Sessions
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Built for students. Personalized. Insightful. Effective.
              Practice interviews with our advanced AI and get the confidence you need to succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="hero" size="lg" className="text-lg px-8">
                <Link to="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/demo">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose Hirescout?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with personalized learning to give you the competitive edge.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              See Hirescout in Action
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Watch how our AI interviewer adapts to your responses and provides real-time feedback.
            </p>
            
            {/* Demo Video Placeholder */}
            <div className="relative aspect-video bg-muted rounded-xl mb-8 flex items-center justify-center group cursor-pointer hover:bg-muted/80 transition-colors">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary group-hover:bg-primary/90 transition-colors">
                <Play className="h-8 w-8 text-white ml-1" />
              </div>
              <div className="absolute inset-0 rounded-xl border-2 border-dashed border-border opacity-50"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">1</div>
                <div>
                  <h4 className="font-semibold mb-1">Upload Your Resume</h4>
                  <p className="text-sm text-muted-foreground">AI analyzes your background and experience</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">2</div>
                <div>
                  <h4 className="font-semibold mb-1">Practice Interviews</h4>
                  <p className="text-sm text-muted-foreground">Voice interaction with personalized questions</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">3</div>
                <div>
                  <h4 className="font-semibold mb-1">Get Insights</h4>
                  <p className="text-sm text-muted-foreground">Detailed analysis and improvement tips</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trusted by Students Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of students who've improved their interview skills with Hirescout.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="p-0">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of students who've already improved their interview skills with Hirescout.
            </p>
            <Button asChild variant="hero" size="lg" className="text-lg px-8">
              <Link to="/signup">
                Start Your First Interview
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;