import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogOut, Users, TrendingUp } from "lucide-react";

interface TeacherDashboardProps {
  user: User;
}

interface StudentData {
  user_id: string;
  full_name: string;
  completed_lessons: number;
  avg_score: number;
  total_achievements: number;
}

const TeacherDashboard = ({ user }: TeacherDashboardProps) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    // Get all student IDs
    const { data: studentRoles } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "student");

    if (!studentRoles) {
      setLoading(false);
      return;
    }

    const studentIds = studentRoles.map(r => r.user_id);

    // Fetch student details and progress
    const studentsData: StudentData[] = [];

    for (const studentId of studentIds) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", studentId)
        .single();

      const { data: progressData } = await supabase
        .from("student_progress")
        .select("score, completed")
        .eq("student_id", studentId);

      const { data: achievementsData } = await supabase
        .from("student_achievements")
        .select("id")
        .eq("student_id", studentId);

      const completedLessons = progressData?.filter(p => p.completed).length || 0;
      const scores = progressData?.map(p => p.score).filter((s): s is number => s !== null) || [];
      const avgScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;

      studentsData.push({
        user_id: studentId,
        full_name: profile?.full_name || "Unknown",
        completed_lessons: completedLessons,
        avg_score: avgScore,
        total_achievements: achievementsData?.length || 0,
      });
    }

    setStudents(studentsData);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const totalStudents = students.length;
  const avgClassScore = students.length > 0
    ? Math.round(students.reduce((sum, s) => sum + s.avg_score, 0) / students.length)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Monitor student progress</p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Total Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{totalStudents}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-success-foreground">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Average Class Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">{avgClassScore}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Student Progress Table */}
        <Card>
          <CardHeader>
            <CardTitle>Student Progress</CardTitle>
            <CardDescription>Overview of all students' performance</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-muted-foreground py-8">Loading student data...</p>
            ) : students.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No students enrolled yet</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Completed Lessons</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead>Achievements</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.user_id}>
                      <TableCell className="font-medium">{student.full_name}</TableCell>
                      <TableCell>{student.completed_lessons}</TableCell>
                      <TableCell>
                        <Badge variant={student.avg_score >= 70 ? "default" : "secondary"}>
                          {student.avg_score}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{student.total_achievements} 🏆</Badge>
                      </TableCell>
                      <TableCell>
                        {student.completed_lessons > 0 ? (
                          <Badge className="bg-success">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Getting Started</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TeacherDashboard;
