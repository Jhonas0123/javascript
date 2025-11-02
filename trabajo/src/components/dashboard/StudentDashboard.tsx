import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LogOut, Trophy, Star, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface StudentDashboardProps {
  user: User;
}

interface Profile {
  full_name: string;
  avatar_url: string | null;
}

interface Lesson {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  description: string;
}

interface Progress {
  lesson_id: string;
  score: number | null;
  completed: boolean;
}

const avatars = ["🦁", "🐯", "🐼", "🦊", "🐸", "🦄", "🐻", "🐰"];

const StudentDashboard = ({ user }: StudentDashboardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  useEffect(() => {
    fetchData();
  }, [user.id]);

  const fetchData = async () => {
    // Fetch profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("full_name, avatar_url")
      .eq("user_id", user.id)
      .single();

    if (profileData) {
      setProfile(profileData);
      if (!profileData.avatar_url) {
        setShowAvatarPicker(true);
      }
    }

    // Fetch lessons
    const { data: lessonsData } = await supabase
      .from("lessons")
      .select("*")
      .eq("is_active", true)
      .order("order_index");

    if (lessonsData) {
      setLessons(lessonsData);
    }

    // Fetch progress
    const { data: progressData } = await supabase
      .from("student_progress")
      .select("lesson_id, score, completed")
      .eq("student_id", user.id);

    if (progressData) {
      setProgress(progressData);
    }
  };

  const handleAvatarSelect = async (avatar: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: avatar })
      .eq("user_id", user.id);

    if (!error) {
      setProfile({ ...profile!, avatar_url: avatar });
      setShowAvatarPicker(false);
      toast({
        title: "Avatar selected! 🎉",
        description: "Your new avatar looks amazing!",
      });
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const completedLessons = progress.filter(p => p.completed).length;
  const totalLessons = lessons.length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-5xl">{profile?.avatar_url || "🎓"}</span>
            <div>
              <h1 className="text-2xl font-bold">Hello, {profile?.full_name}!</h1>
              <p className="text-muted-foreground">Ready to learn today?</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Avatar Picker */}
        {showAvatarPicker && (
          <Card className="mb-6 border-2 border-primary shadow-md animate-pulse">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-warning" />
                Choose Your Avatar!
              </CardTitle>
              <CardDescription>Pick a fun character to represent you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => handleAvatarSelect(avatar)}
                    className="text-5xl hover:scale-125 transition-transform cursor-pointer"
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Overview */}
        <Card className="mb-6 bg-gradient-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Lessons Completed</span>
                <span className="font-bold">{completedLessons}/{totalLessons}</span>
              </div>
              <Progress value={progressPercentage} className="bg-white/30" />
            </div>
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            Available Lessons
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lessons.map((lesson) => {
              const lessonProgress = progress.find(p => p.lesson_id === lesson.id);
              const isCompleted = lessonProgress?.completed || false;

              return (
                <Card
                  key={lesson.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/lesson/${lesson.id}`)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      {isCompleted && <Badge variant="default" className="bg-success">✓ Done</Badge>}
                    </div>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Badge variant="outline">{lesson.difficulty}</Badge>
                      <Badge variant="secondary">{lesson.type.replace("_", " ")}</Badge>
                    </div>
                    {lessonProgress?.score && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Score: {lessonProgress.score}%
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
