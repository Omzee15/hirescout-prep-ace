import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Target, 
  Code, 
  MessageSquare, 
  BarChart3,
  Users,
  Clock,
  Shield,
  Zap,
  Brain,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const mainFeatures = [
    {
      icon: Target,
      title: "Personalized Questions",
      description: "Tailored to your resume & experience",
      details: [
        "AI analyzes your resume and background",
        "Questions match your skill level and experience",
        "Industry-specific scenarios and challenges",
        "Adaptive difficulty based on performance"
      ],
      color: "from-primary to-primary-glow"
    },
    {
      icon: Code,
      title: "Real-time Coding",
      description: "Instant feedback as you code",
      details: [
        "Live syntax checking and error detection",
        "Multiple programming languages supported",
        "Automatic code quality assessment",
        "Performance optimization suggestions"
      ],
      color: "from-success to-green-400"
    },
    {
      icon: MessageSquare,
      title: "Voice Interaction",
      description: "Talk naturally with the AI interviewer",
      details: [
        "Natural language processing for realistic conversations",
        "Real-time speech-to-text transcription",
        "Voice tone and confidence analysis",
        "Multiple interviewer personalities available"
      ],
      color: "from-accent to-orange-400"
    },
    {
      icon: BarChart3,
      title: "Detailed Analysis",
      description: "Performance breakdown and improvement tips",
      details: [
        "Comprehensive scoring across multiple dimensions",
        "Personalized improvement recommendations",
        "Progress tracking over time",
        "Comparison with industry benchmarks"
      ],
      color: "from-purple-500 to-purple-400"
    }
  ];

  const additionalFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze your responses and provide intelligent feedback."
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Practice anytime, anywhere. No need to coordinate with human interviewers."
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your data is secure and never shared. Practice confidently in a safe environment."
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate feedback and analysis right after your interview session ends."
    },
    {
      icon: Users,
      title: "Industry Experts",
      description: "Questions and scenarios designed by experienced technical recruiters and hiring managers."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            🚀 Powered by Advanced AI
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Ace Interviews</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Hirescout combines cutting-edge AI technology with proven interview techniques to give you the competitive edge you need.
          </p>
          <Button asChild variant="hero" size="lg" className="text-lg px-8">
            <Link to="/signup">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Core Features That Set Us Apart
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each feature is designed to simulate real interview conditions while providing the insights you need to improve.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mainFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <CardHeader>
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Additional Benefits
            </h2>
            <p className="text-lg text-muted-foreground">
              More reasons why Hirescout is the perfect interview preparation platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How Hirescout Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to interview success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Upload & Setup",
                description: "Upload your resume and set your preferences. Our AI analyzes your background to create personalized interview scenarios."
              },
              {
                step: "2",
                title: "Practice Interviews",
                description: "Engage in realistic mock interviews with voice interaction, coding challenges, and behavioral questions."
              },
              {
                step: "3",
                title: "Get Insights",
                description: "Receive detailed analysis of your performance with specific recommendations for improvement."
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Interview Skills?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of students who have successfully landed their dream jobs with Hirescout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" size="lg" className="text-lg px-8">
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/demo">Watch Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;