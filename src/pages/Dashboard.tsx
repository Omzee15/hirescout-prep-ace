import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Target, 
  PlayCircle, 
  FileText, 
  User, 
  BarChart3, 
  Plus,
  Calendar,
  Clock,
  Trophy
} from "lucide-react";

const Dashboard = () => {
  // Mock user data
  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    prepsRemaining: 4,
  };

  const recentInterviews = [
    {
      id: 1,
      date: "2024-01-15",
      type: "Technical",
      score: 85,
      duration: "45 min"
    },
    {
      id: 2,
      date: "2024-01-12",
      type: "Behavioral",
      score: 92,
      duration: "30 min"
    },
    {
      id: 3,
      date: "2024-01-10",
      type: "Technical",
      score: 78,
      duration: "50 min"
    }
  ];

  const stats = [
    {
      label: "Total Interviews",
      value: "12",
      icon: PlayCircle,
      color: "text-primary"
    },
    {
      label: "Average Score",
      value: "85%",
      icon: Trophy,
      color: "text-success"
    },
    {
      label: "Total Practice Time",
      value: "8.5h",
      icon: Clock,
      color: "text-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-xl text-white">
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-white/90">
              Ready to practice your next interview? You have {user.prepsRemaining} preps remaining.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-accent mb-4 group-hover:scale-110 transition-transform">
                      <PlayCircle className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Start Interview</CardTitle>
                    <CardDescription>
                      Begin a new AI-powered mock interview session
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" variant="hero">
                      <Link to="/interview">Start Now</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-success mb-4">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>View Analyses</CardTitle>
                    <CardDescription>
                      Review your past interview performances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" variant="secondary">
                      <Link to="/reports">View Reports</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-accent mb-4">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Update Resume</CardTitle>
                    <CardDescription>
                      Upload or modify your resume for better personalization
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/profile">Manage Resume</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted-foreground mb-4">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>Edit Profile</CardTitle>
                    <CardDescription>
                      Update your personal information and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/profile">Edit Profile</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prep Wallet */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Prep Wallet
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div>
                    <p className="text-3xl font-bold text-primary">{user.prepsRemaining}</p>
                    <p className="text-sm text-muted-foreground">Preps Remaining</p>
                  </div>
                  <Button variant="accent" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Buy More Preps
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Interviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInterviews.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{interview.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(interview.date).toLocaleDateString()} · {interview.duration}
                        </p>
                      </div>
                      <Badge variant={interview.score >= 85 ? "default" : "secondary"}>
                        {interview.score}%
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" className="w-full mt-4">
                  <Link to="/reports">View All</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;