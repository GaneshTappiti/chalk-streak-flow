import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar, TrendingUp, Target, CheckCircle, XCircle } from "lucide-react";

interface StudentDashboardProps {
  userName: string;
  onNavigate: (screen: string) => void;
}

export const StudentDashboard = ({ userName, onNavigate }: StudentDashboardProps) => {
  // Mock data
  const todayStatus = "present"; // present, absent, upcoming
  const attendancePercentage = 87;
  const currentStreak = 7;
  const totalClasses = 45;
  const attendedClasses = 39;

  return (
    <div className="flex-1 px-6 pb-20 pt-6 space-y-6">
      {/* Greeting */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Hi, {userName} 👋
        </h1>
        <p className="text-muted-foreground">Let's check your attendance progress</p>
      </div>

      {/* Today's Status Card */}
      <Card className="p-6 shadow-[var(--shadow-medium)]">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Today's Status</h3>
            <div className="flex items-center space-x-2">
              {todayStatus === "present" ? (
                <>
                  <CheckCircle className="w-5 h-5 text-success" />
                  <span className="text-success font-medium">Present 🎉</span>
                </>
              ) : todayStatus === "absent" ? (
                <>
                  <XCircle className="w-5 h-5 text-destructive" />
                  <span className="text-destructive font-medium">Absent</span>
                </>
              ) : (
                <span className="text-muted-foreground">No class today</span>
              )}
            </div>
          </div>
          <div className="text-4xl">
            {todayStatus === "present" ? "✅" : todayStatus === "absent" ? "❌" : "📅"}
          </div>
        </div>
      </Card>

      {/* Attendance Overview */}
      <Card className="p-6 shadow-[var(--shadow-medium)]">
        <h3 className="font-semibold text-foreground mb-4">Attendance Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {attendancePercentage}%
            </div>
            <div className="text-sm text-muted-foreground">Overall</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {attendedClasses}/{totalClasses}
            </div>
            <div className="text-sm text-muted-foreground">Classes</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Current Streak */}
      <Card className="p-6 shadow-[var(--shadow-medium)] bg-gradient-to-r from-primary/5 to-primary-light/5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-1">Current Streak</h3>
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🔥</span>
              <span className="text-xl font-bold text-primary">{currentStreak} days</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate('streaks')}
            className="rounded-xl"
          >
            <Target className="w-4 h-4 mr-2" />
            Goals
          </Button>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => onNavigate('calendar')}
          className="rounded-xl h-16 flex-col"
        >
          <Calendar className="w-5 h-5 mb-1" />
          <span className="text-sm">Calendar</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => onNavigate('trends')}
          className="rounded-xl h-16 flex-col"
        >
          <TrendingUp className="w-5 h-5 mb-1" />
          <span className="text-sm">Trends</span>
        </Button>
      </div>
    </div>
  );
};