import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mic, Volume2, CheckCircle2, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LessonContent {
  words: Array<{
    word: string;
    translation: string;
    image: string;
  }>;
}

interface LessonData {
  id: string;
  title: string;
  type: string;
  description: string;
  content: LessonContent | any;
}

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lesson, setLesson] = useState<LessonData | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);

  useEffect(() => {
    fetchLesson();
    initializeSpeechRecognition();
  }, [id]);

  const fetchLesson = async () => {
    if (!id) return;

    const { data, error } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", id)
      .single();

    if (data && !error) {
      setLesson(data as LessonData);
    }
  };

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        checkPronunciation(transcript);
      };

      recognitionInstance.onerror = () => {
        toast({
          title: "Oops!",
          description: "Couldn't hear you. Please try again!",
          variant: "destructive",
        });
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognitionInstance);
    } else {
      toast({
        title: "Browser not supported",
        description: "Your browser doesn't support speech recognition.",
        variant: "destructive",
      });
    }
  };

  const checkPronunciation = (spokenWord: string) => {
    if (!lesson) return;

    const currentWord = lesson.content.words[currentWordIndex];
    const isCorrect = spokenWord.includes(currentWord.word.toLowerCase());

    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Excellent! 🌟",
        description: "Perfect pronunciation!",
      });

      setTimeout(() => {
        if (currentWordIndex < lesson.content.words.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
          setFeedback(null);
        } else {
          completeLesson();
        }
      }, 1500);
    } else {
      toast({
        title: "Try again! 💪",
        description: `Try saying "${currentWord.word}" one more time`,
      });
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  const completeLesson = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !lesson) return;

    const finalScore = Math.round((score / lesson.content.words.length) * 100);

    const { error } = await supabase
      .from("student_progress")
      .upsert({
        student_id: user.id,
        lesson_id: lesson.id,
        score: finalScore,
        pronunciation_score: finalScore,
        completed: true,
        completed_at: new Date().toISOString(),
      });

    if (!error) {
      toast({
        title: "Lesson Complete! 🎉",
        description: `You scored ${finalScore}%. Great job!`,
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    }
  };

  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      recognition.start();
    }
  };

  const playAudio = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  if (!lesson) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currentWord = lesson.content.words[currentWordIndex];
  const progressPercentage = ((currentWordIndex + 1) / lesson.content.words.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">{lesson.title}</CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Word {currentWordIndex + 1} of {lesson.content.words.length}</span>
                <span>Score: {score}/{lesson.content.words.length}</span>
              </div>
              <Progress value={progressPercentage} />
            </div>
          </CardHeader>
        </Card>

        <Card className="relative overflow-hidden">
          {feedback && (
            <div className={`absolute inset-0 z-10 flex items-center justify-center ${
              feedback === "correct" ? "bg-success/20" : "bg-destructive/20"
            } backdrop-blur-sm`}>
              {feedback === "correct" ? (
                <CheckCircle2 className="w-24 h-24 text-success animate-bounce" />
              ) : (
                <XCircle className="w-24 h-24 text-destructive animate-bounce" />
              )}
            </div>
          )}

          <CardContent className="p-8 text-center space-y-6">
            <div className="text-8xl mb-4">{currentWord.image}</div>
            
            <div className="space-y-2">
              <h2 className="text-4xl font-bold">{currentWord.word}</h2>
              <Badge variant="outline" className="text-lg">{currentWord.translation}</Badge>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={() => playAudio(currentWord.word)}
              >
                <Volume2 className="w-5 h-5 mr-2" />
                Listen
              </Button>

              <Button
                size="lg"
                variant={isRecording ? "destructive" : "hero"}
                onClick={startRecording}
                disabled={isRecording}
                className="min-w-[150px]"
              >
                <Mic className={`w-5 h-5 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
                {isRecording ? "Listening..." : "Speak Now"}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Tap "Speak Now" and say the word clearly
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Lesson;
