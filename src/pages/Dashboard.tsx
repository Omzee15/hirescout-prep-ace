import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  PlayCircle, 
  FileText, 
  User, 
  BarChart3, 
  Plus,
  Clock,
  Trophy
} from "lucide-react";

const Dashboard = () => {
  const { user: authUser } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authUser) {
      fetchUserProfile();
      fetchRecentSessions();
    }
  }, [authUser]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchRecentSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('prep_sessions')
        .select('*')
        .eq('user_id', authUser?.id)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = async () => {
    if (!profile || profile.prep_count <= 0) {
      toast({
        title: "No Preps Remaining",
        description: "You need to purchase more preps to start an interview.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('prep_sessions')
        .insert({
          user_id: authUser?.id,
          session_type: 'Mock Interview'
        });

      if (error) throw error;

      toast({
        title: "Interview Started!",
        description: "Your prep count has been decremented.",
      });

      // Refresh profile to update prep count
      fetchUserProfile();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start interview session.",
        variant: "destructive",
      });
    }
  };

  const stats = [
    {
      label: "Total Interviews",
      value: sessions.length.toString(),
      icon: PlayCircle,
      color: "text-primary"
    },
    {
      label: "Preps Remaining",
      value: profile?.prep_count || 0,
      icon: Target,
      color: "text-success"
    },
    {
      label: "Total Purchased",
      value: profile?.total_preps_purchased || 0,
      icon: Trophy,
      color: "text-accent"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Welcome Banner */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-xl text-white">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                Welcome back, {profile?.full_name || authUser?.email}! 👋
              </h1>
              <p className="text-white/90">
                Ready to practice your next interview? You have {profile?.prep_count || 0} preps remaining.
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
                      <Button 
                        onClick={handleStartSession} 
                        className="w-full" 
                        variant="hero"
                        disabled={!profile || profile.prep_count <= 0}
                      >
                        {profile && profile.prep_count > 0 ? "Start Now" : "No Preps Left"}
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
                      <p className="text-3xl font-bold text-primary">{profile?.prep_count || 0}</p>
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
                    {sessions.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-4">
                        No interviews completed yet
                      </p>
                    ) : (
                      sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{session.session_type}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(session.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="default">
                            Completed
                          </Badge>
                        </div>
                      ))
                    )}
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
    </ProtectedRoute>
  );
};

export default Dashboard;