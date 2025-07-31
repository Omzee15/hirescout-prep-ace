import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Download, 
  ArrowRight, 
  Target, 
  MessageSquare, 
  Code, 
  Brain,
  Trophy,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Analysis = () => {
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    prepsRemaining: 3,
  };

  const overallScore = 85;
  const interviewData = {
    date: "January 15, 2024",
    duration: "45 minutes",
    type: "Technical Interview",
    prepsUsed: 1
  };

  const skillBreakdown = [
    {
      skill: "Communication",
      score: 92,
      icon: MessageSquare,
      feedback: "Excellent articulation and clear explanation of concepts. Maintained good eye contact throughout.",
      improvements: ["Practice explaining complex technical concepts in simpler terms", "Work on reducing filler words"]
    },
    {
      skill: "Coding Skills",
      score: 78,
      icon: Code,
      feedback: "Good problem-solving approach with clean, readable code. Handled edge cases well.",
      improvements: ["Practice more advanced algorithms", "Improve time complexity optimization", "Add more detailed comments"]
    },
    {
      skill: "Problem Solving",
      score: 88,
      icon: Brain,
      feedback: "Strong analytical thinking and systematic approach to breaking down problems.",
      improvements: ["Consider multiple solution approaches before coding", "Explain trade-offs between different approaches"]
    },
    {
      skill: "Resume Relevance",
      score: 82,
      icon: Target,
      feedback: "Well-connected experience to the role requirements. Good examples from past projects.",
      improvements: ["Prepare more specific metrics from past achievements", "Practice STAR method for behavioral questions"]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 85) return { variant: "default" as const, text: "Excellent" };
    if (score >= 70) return { variant: "secondary" as const, text: "Good" };
    return { variant: "destructive" as const, text: "Needs Work" };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent mb-4">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">Interview Analysis</h1>
          <p className="text-muted-foreground">
            Detailed breakdown of your performance with actionable insights
          </p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{overallScore}%</div>
                <div className="text-white/80 text-sm">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{interviewData.type}</div>
                <div className="text-white/80 text-sm">Interview Type</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{interviewData.duration}</div>
                <div className="text-white/80 text-sm">Duration</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Target className="h-4 w-4" />
                  <span className="text-2xl font-bold">{interviewData.prepsUsed}</span>
                </div>
                <div className="text-white/80 text-sm">Prep Used</div>
              </div>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">Great job, {user.name}!</h3>
                <p className="text-muted-foreground">
                  You scored in the top 25% of candidates. Here's how to improve even further.
                </p>
              </div>
              <Badge {...getScoreBadge(overallScore)} className="text-lg px-4 py-1">
                {getScoreBadge(overallScore).text}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {skillBreakdown.map((skill, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <skill.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{skill.skill}</CardTitle>
                      <CardDescription>Performance breakdown</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getScoreColor(skill.score)}`}>
                      {skill.score}%
                    </div>
                    <Badge {...getScoreBadge(skill.score)} variant="outline">
                      {getScoreBadge(skill.score).text}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={skill.score} className="mb-4" />
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="font-medium text-sm">What you did well:</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6">{skill.feedback}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      <span className="font-medium text-sm">Areas for improvement:</span>
                    </div>
                    <ul className="text-sm text-muted-foreground pl-6 space-y-1">
                      {skill.improvements.map((improvement, improvementIndex) => (
                        <li key={improvementIndex} className="flex items-start space-x-2">
                          <span className="text-accent">•</span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Insights */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI Insights & Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-success">Strengths to Leverage</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <span className="text-sm">Excellent communication skills - continue highlighting this in future interviews</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <span className="text-sm">Strong problem-solving methodology - your systematic approach is impressive</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <span className="text-sm">Good project examples - your experience stories are well-structured</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-accent">Priority Focus Areas</h4>
                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                    <span className="text-sm">Practice more algorithm optimization - focus on time/space complexity</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                    <span className="text-sm">Prepare specific metrics from past projects for more impact</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-accent mt-0.5" />
                    <span className="text-sm">Consider multiple solution approaches before implementing</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" size="lg" className="text-lg px-8">
            <Download className="mr-2 h-5 w-5" />
            Download Report
          </Button>
          <Button asChild variant="hero" size="lg" className="text-lg px-8">
            <Link to="/interview">
              Take Another Interview
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg" className="text-lg px-8">
            <Link to="/dashboard">Return to Dashboard</Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analysis;