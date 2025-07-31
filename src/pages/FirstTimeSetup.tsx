import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Target } from "lucide-react";

const FirstTimeSetup = () => {
  const [formData, setFormData] = useState({
    college: "",
    major: "",
    graduationYear: ""
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-white" />
          </div>
          <CardTitle>Complete Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="college">College/University</Label>
            <Input id="college" placeholder="MIT" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="major">Major</Label>
            <Input id="major" placeholder="Computer Science" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Graduation Year</Label>
            <Input id="year" placeholder="2024" />
          </div>
          <div className="space-y-2">
            <Label>Resume Upload</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Upload your resume</p>
            </div>
          </div>
          <Button asChild className="w-full" variant="hero">
            <Link to="/dashboard">Complete Setup</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FirstTimeSetup;