import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar, Users, CheckCircle, BarChart3, Plus } from "lucide-react";

interface TeacherDashboardProps {
  userName: string;
  onNavigate: (screen: string) => void;
}

export const TeacherDashboard = ({ userName, onNavigate }: TeacherDashboardProps) => {
  // Mock data
  const todayPresent = 26;
  const totalStudents = 30;
  const attendancePercentage = Math.round((todayPresent / totalStudents) * 100);
  const className = "Computer Science 3A";

  return (
    <div className="flex-1 px-6 pb-20 pt-6 space-y-6">
      {/* Greeting */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Hi, {userName} 👨‍🏫
        </h1>
        <p className="text-muted-foreground">{className}</p>
      </div>

      {/* Mark Attendance CTA */}
      <Card className="p-6 shadow-[var(--shadow-medium)] bg-gradient-to-r from-primary/10 to-primary-light/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Today's Attendance</h3>
            <p className="text-muted-foreground text-sm">
              Quick and easy attendance marking
            </p>
          </div>
          <Button 
            variant="rounded"
            onClick={() => onNavigate('mark-attendance')}
            className="flex-col h-16 px-6"
          >
            <Plus className="w-5 h-5 mb-1" />
            <span className="text-sm">Mark</span>
          </Button>
        </div>
      </Card>

      {/* Today's Summary */}
      <Card className="p-6 shadow-[var(--shadow-medium)]">
        <h3 className="font-semibold text-foreground mb-4">Today's Summary</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl font-bold text-success mb-1">
              {todayPresent}
            </div>
            <div className="text-xs text-muted-foreground">Present</div>
          </div>
          <div>
            <div className="text-xl font-bold text-destructive mb-1">
              {totalStudents - todayPresent}
            </div>
            <div className="text-xs text-muted-foreground">Absent</div>
          </div>
          <div>
            <div className="text-xl font-bold text-primary mb-1">
              {attendancePercentage}%
            </div>
            <div className="text-xs text-muted-foreground">Rate</div>
          </div>
        </div>
        
        {/* Visual indicator */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Class attendance</span>
            <span>{todayPresent}/{totalStudents}</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Class Insights */}
      <Card className="p-6 shadow-[var(--shadow-medium)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Class Insights</h3>
          <CheckCircle className="w-5 h-5 text-success" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average attendance this week</span>
            <span className="font-medium text-foreground">89%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Students at risk (&lt; 75%)</span>
            <span className="font-medium text-warning">3 students</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Perfect attendance streak</span>
            <span className="font-medium text-success">12 students</span>
          </div>
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
          onClick={() => onNavigate('analytics')}
          className="rounded-xl h-16 flex-col"
        >
          <BarChart3 className="w-5 h-5 mb-1" />
          <span className="text-sm">Analytics</span>
        </Button>
      </div>
    </div>
  );
};