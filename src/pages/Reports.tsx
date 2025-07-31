import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FileText, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Filter,
  Search,
  Eye,
  Target,
  BarChart3
} from "lucide-react";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterScore, setFilterScore] = useState("all");

  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    prepsRemaining: 3,
  };

  const interviews = [
    {
      id: 1,
      date: "2024-01-15",
      time: "14:30",
      type: "Technical",
      duration: "45 min",
      score: 85,
      status: "completed",
      prepsUsed: 1,
      topics: ["Algorithms", "Data Structures", "System Design"]
    },
    {
      id: 2,
      date: "2024-01-12", 
      time: "10:15",
      type: "Behavioral",
      duration: "30 min",
      score: 92,
      status: "completed",
      prepsUsed: 1,
      topics: ["Leadership", "Team Collaboration", "Problem Solving"]
    },
    {
      id: 3,
      date: "2024-01-10",
      time: "16:45",
      type: "Technical",
      duration: "50 min", 
      score: 78,
      status: "completed",
      prepsUsed: 1,
      topics: ["JavaScript", "React", "Node.js"]
    },
    {
      id: 4,
      date: "2024-01-08",
      time: "11:20",
      type: "Mixed",
      duration: "40 min",
      score: 81,
      status: "completed",
      prepsUsed: 1,
      topics: ["Coding", "Communication", "Cultural Fit"]
    },
    {
      id: 5,
      date: "2024-01-05",
      time: "09:30",
      type: "Technical",
      duration: "35 min",
      score: 88,
      status: "completed",
      prepsUsed: 1,
      topics: ["Python", "Machine Learning", "APIs"]
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

  const filteredInterviews = interviews.filter(interview => {
    const matchesSearch = interview.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || interview.type.toLowerCase() === filterType.toLowerCase();
    const matchesScore = filterScore === "all" || 
                        (filterScore === "excellent" && interview.score >= 85) ||
                        (filterScore === "good" && interview.score >= 70 && interview.score < 85) ||
                        (filterScore === "needs-work" && interview.score < 70);
    
    return matchesSearch && matchesType && matchesScore;
  });

  const stats = {
    totalInterviews: interviews.length,
    averageScore: Math.round(interviews.reduce((acc, interview) => acc + interview.score, 0) / interviews.length),
    totalPrepsUsed: interviews.reduce((acc, interview) => acc + interview.prepsUsed, 0),
    totalTime: interviews.reduce((acc, interview) => {
      const minutes = parseInt(interview.duration.split(' ')[0]);
      return acc + minutes;
    }, 0)
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="h-8 w-8" />
              Your Past Interviews
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your progress and review detailed analyses from previous sessions
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Interviews</p>
                  <p className="text-2xl font-bold">{stats.totalInterviews}</p>
                </div>
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                  <p className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
                    {stats.averageScore}%
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Preps Used</p>
                  <p className="text-2xl font-bold">{stats.totalPrepsUsed}</p>
                </div>
                <Target className="h-6 w-6 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Practice Time</p>
                  <p className="text-2xl font-bold">{Math.round(stats.totalTime / 60)}h</p>
                </div>
                <Clock className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by type or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Interview Type</label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="mixed">Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Score Range</label>
                <Select value={filterScore} onValueChange={setFilterScore}>
                  <SelectTrigger>
                    <SelectValue placeholder="All scores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="excellent">Excellent (85%+)</SelectItem>
                    <SelectItem value="good">Good (70-84%)</SelectItem>
                    <SelectItem value="needs-work">Needs Work (&lt;70%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview List */}
        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <Card key={interview.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  {/* Date & Time */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(interview.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{interview.time}</span>
                    </div>
                  </div>

                  {/* Type & Duration */}
                  <div className="lg:col-span-2">
                    <Badge variant="outline" className="mb-2">{interview.type}</Badge>
                    <p className="text-sm text-muted-foreground">{interview.duration}</p>
                  </div>

                  {/* Topics */}
                  <div className="lg:col-span-4">
                    <div className="flex flex-wrap gap-1">
                      {interview.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Score */}
                  <div className="lg:col-span-2 text-center">
                    <div className={`text-2xl font-bold ${getScoreColor(interview.score)}`}>
                      {interview.score}%
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {getScoreBadge(interview.score).text}
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="lg:col-span-2 flex justify-end">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/analysis?id=${interview.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Analysis
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInterviews.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No interviews found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button asChild>
                <Link to="/interview">Take Your First Interview</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Reports;