import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Users, Activity, TrendingUp, DollarSign, Calendar, Mail } from "lucide-react";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  prep_count: number;
  total_preps_purchased: number;
  created_at: string;
}

interface SessionData {
  id: string;
  user_id: string;
  session_type: string;
  created_at: string;
}

const Admin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUsers();
      fetchSessions();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('prep_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const totalSessions = sessions.length;
  const totalPrepsUsed = sessions.length;
  const totalPrepsPurchased = users.reduce((sum, user) => sum + (user.total_preps_purchased || 0), 0);

  const stats = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-primary"
    },
    {
      label: "Total Sessions",
      value: totalSessions,
      icon: Activity,
      color: "text-success"
    },
    {
      label: "Preps Used",
      value: totalPrepsUsed,
      icon: TrendingUp,
      color: "text-accent"
    },
    {
      label: "Preps Sold",
      value: totalPrepsPurchased,
      icon: DollarSign,
      color: "text-warning"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          {/* Admin Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl text-white">
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                Admin Dashboard 🛠️
              </h1>
              <p className="text-white/90">
                Monitor user activity and app usage statistics
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Users List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Registered Users
                </CardTitle>
                <CardDescription>
                  All users who have signed up for the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.full_name || 'Unknown'}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                          <p className="text-xs text-muted-foreground">
                            Joined: {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="mb-1">
                          {user.prep_count} preps
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {user.total_preps_purchased || 0} purchased
                        </p>
                      </div>
                    </div>
                  ))}
                  {users.length === 0 && (
                    <p className="text-muted-foreground text-sm text-center py-8">
                      No users registered yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Latest interview sessions across all users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {sessions.map((session) => {
                    const sessionUser = users.find(u => u.user_id === session.user_id);
                    return (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                            <Calendar className="h-4 w-4 text-success" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{session.session_type}</p>
                            <p className="text-xs text-muted-foreground">
                              by {sessionUser?.full_name || sessionUser?.email || 'Unknown User'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(session.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge variant="default">
                          Completed
                        </Badge>
                      </div>
                    );
                  })}
                  {sessions.length === 0 && (
                    <p className="text-muted-foreground text-sm text-center py-8">
                      No interview sessions yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;