import { useState } from "react";
import { RoleCard } from "./RoleCard";
import { Button } from "./ui/button";
import { GraduationCap, Users } from "lucide-react";

interface WelcomeScreenProps {
  onRoleSelect: (role: 'student' | 'teacher') => void;
}

export const WelcomeScreen = ({ onRoleSelect }: WelcomeScreenProps) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | null>(null);

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 pt-16 pb-8 px-6 text-center">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">AttendanceTracker</h1>
        <p className="text-muted-foreground">Smart attendance management for everyone</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold text-foreground mb-6">Who are you?</h2>
          
          <div className="space-y-4 mb-8">
            <RoleCard
              icon="🎓"
              title="Student"
              description="Track your attendance and view insights"
              selected={selectedRole === 'student'}
              onClick={() => setSelectedRole('student')}
            />
            
            <RoleCard
              icon="👨‍🏫"
              title="Teacher"
              description="Manage class attendance and analytics"
              selected={selectedRole === 'teacher'}
              onClick={() => setSelectedRole('teacher')}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-6">
        <div className="max-w-md mx-auto">
          <Button
            variant="rounded"
            size="lg"
            className="w-full"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            Continue
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            You can change your role later in settings
          </p>
        </div>
      </div>
    </div>
  );
};