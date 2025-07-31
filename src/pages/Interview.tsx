import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import { 
  Target, 
  Clock, 
  Mic, 
  MicOff, 
  SkipForward, 
  Square,
  Code,
  MessageSquare,
  User
} from "lucide-react";

const Interview = () => {
  const [timeRemaining, setTimeRemaining] = useState(28 * 60 + 45); // 28:45 in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [codeInput, setCodeInput] = useState("// Write your solution here\n\n");

  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    prepsRemaining: 3,
  };

  const questions = [
    "Tell me about yourself and your background in software development.",
    "How would you implement a function to reverse a linked list?",
    "Describe a challenging project you've worked on and how you overcame obstacles.",
    "Write a function to find the two numbers in an array that add up to a target sum."
  ];

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          // Handle interview end
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTranscription("");
    }
  };

  const handleEndInterview = () => {
    // Handle interview end logic
    window.location.href = "/analysis";
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Simulate transcription
      setTimeout(() => {
        setTranscription("Hi, I'm Alex Johnson, a computer science student with 2 years of experience in full-stack development...");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      
      {/* Prep Info Bar */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                Preps Remaining: {user.prepsRemaining}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Time: {formatTime(timeRemaining)}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Question {currentQuestion} of {questions.length}</span>
              <Progress value={(currentQuestion / questions.length) * 100} className="w-32" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* AI Interviewer */}
          <Card className="flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                  <User className="h-16 w-16 text-white" />
                </div>
                <h3 className="font-semibold">AI Interviewer</h3>
                <p className="text-sm text-muted-foreground">Sarah - Technical Recruiter</p>
              </div>
              
              <div className="flex-1 bg-muted/30 rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-2">Current Question:</h4>
                <p className="text-sm leading-relaxed">
                  {questions[currentQuestion - 1]}
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "destructive" : "default"}
                  className="w-full"
                  size="lg"
                >
                  {isRecording ? (
                    <>
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop Recording
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Start Answering
                    </>
                  )}
                </Button>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleNextQuestion}
                    variant="outline" 
                    className="flex-1"
                    disabled={currentQuestion >= questions.length}
                  >
                    <SkipForward className="mr-2 h-4 w-4" />
                    Next Question
                  </Button>
                  <Button 
                    onClick={handleEndInterview}
                    variant="destructive" 
                    className="flex-1"
                  >
                    <Square className="mr-2 h-4 w-4" />
                    End Interview
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transcription & Code Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Transcription */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="h-5 w-5" />
                  <h3 className="font-semibold">Live Transcription</h3>
                  {isRecording && (
                    <Badge variant="destructive" className="ml-auto animate-pulse">
                      Recording
                    </Badge>
                  )}
                </div>
                <div className="h-32 bg-muted/30 rounded-lg p-4 overflow-y-auto">
                  <p className="text-sm text-muted-foreground">
                    {transcription || "Click 'Start Answering' to begin speaking..."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Code Editor */}
            <Card className="flex-1">
              <CardContent className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="h-5 w-5" />
                  <h3 className="font-semibold">Code Editor</h3>
                  <Badge variant="outline" className="ml-auto">JavaScript</Badge>
                </div>
                <div className="flex-1">
                  <textarea
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    className="w-full h-full min-h-[300px] p-4 bg-muted/30 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Write your code here..."
                  />
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-xs text-muted-foreground">
                    Real-time syntax checking enabled
                  </div>
                  <Button variant="success" size="sm">
                    Run Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;