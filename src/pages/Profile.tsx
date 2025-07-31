import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Settings, Upload, FileText, Download, Trash2, User, Mail, Phone, GraduationCap } from "lucide-react";

const Profile = () => {
  const { user: authUser } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    college: "",
    major: "",
    graduation_year: "",
    bio: ""
  });

  useEffect(() => {
    if (authUser) {
      fetchProfile();
    }
  }, [authUser]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', authUser?.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      setFormData({
        full_name: data.full_name || "",
        phone: data.phone || "",
        college: data.college || "",
        major: data.major || "",
        graduation_year: data.graduation_year?.toString() || "",
        bio: data.bio || ""
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      setResumeFile(file);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        ...formData,
        graduation_year: formData.graduation_year ? parseInt(formData.graduation_year) : null
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('user_id', authUser?.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });

      fetchProfile(); // Refresh the profile data
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResumeUpload = async () => {
    if (!resumeFile || !authUser) return;

    setUploading(true);
    try {
      // Delete old resume if exists
      if (profile?.resume_url) {
        const oldPath = profile.resume_url.split('/').pop();
        await supabase.storage
          .from('resumes')
          .remove([`${authUser.id}/${oldPath}`]);
      }

      // Upload new resume
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `resume-${Date.now()}.${fileExt}`;
      const filePath = `${authUser.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, resumeFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      // Update profile with resume URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ resume_url: publicUrl })
        .eq('user_id', authUser.id);

      if (updateError) throw updateError;

      toast({
        title: "Resume Uploaded",
        description: "Your resume has been successfully uploaded.",
      });

      setResumeFile(null);
      fetchProfile(); // Refresh to show new resume
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleResumeDelete = async () => {
    if (!profile?.resume_url || !authUser) return;

    try {
      // Delete from storage
      const filePath = profile.resume_url.split('/').slice(-2).join('/');
      await supabase.storage
        .from('resumes')
        .remove([filePath]);

      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({ resume_url: null })
        .eq('user_id', authUser.id);

      if (error) throw error;

      toast({
        title: "Resume Deleted",
        description: "Your resume has been removed.",
      });

      fetchProfile();
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Settings className="h-8 w-8" />
                Profile Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your personal information and interview preferences
              </p>
            </div>
            <Badge variant="secondary" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {profile?.prep_count || 0} Preps
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your basic information for a personalized experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="full_name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        value={authUser?.email || ""}
                        disabled
                        className="pl-10 bg-muted"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="college">College/University</Label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="college"
                        type="text"
                        placeholder="e.g., MIT, Harvard University"
                        value={formData.college}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="major">Major</Label>
                      <Input
                        id="major"
                        type="text"
                        placeholder="Computer Science"
                        value={formData.major}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="graduation_year">Graduation Year</Label>
                      <Input
                        id="graduation_year"
                        type="number"
                        placeholder="2024"
                        value={formData.graduation_year}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself and your career goals..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Resume Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Resume Management
                </CardTitle>
                <CardDescription>
                  Upload your resume for better interview personalization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Resume */}
                {profile?.resume_url ? (
                  <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-green-800">Resume Uploaded</p>
                          <p className="text-sm text-green-600">Your resume is ready for interviews</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-1" />
                            View
                          </a>
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={handleResumeDelete}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                        <Upload className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800">No Resume Uploaded</p>
                        <p className="text-sm text-yellow-600">Upload your resume for better interview preparation</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Upload Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="resume">Upload New Resume</Label>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Supported formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>

                  {resumeFile && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm font-medium">Selected: {resumeFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Size: {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}

                  <Button 
                    onClick={handleResumeUpload}
                    disabled={!resumeFile || uploading}
                    className="w-full"
                    variant="outline"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploading ? "Uploading..." : "Upload Resume"}
                  </Button>
                </div>

                {/* Benefits */}
                <div className="space-y-2">
                  <h4 className="font-medium">Why upload your resume?</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• AI personalizes questions based on your experience</li>
                    <li>• Get relevant feedback and suggestions</li>
                    <li>• Practice explaining your background effectively</li>
                  </ul>
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

export default Profile;