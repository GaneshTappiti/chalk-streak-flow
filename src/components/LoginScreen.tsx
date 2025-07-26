import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card } from "./ui/card";
import { ArrowLeft, User, Hash, Key } from "lucide-react";

interface LoginScreenProps {
  role: 'student' | 'teacher';
  onBack: () => void;
  onLogin: (data: { name: string; rollNumber: string; classCode: string }) => void;
}

export const LoginScreen = ({ role, onBack, onLogin }: LoginScreenProps) => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    classCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.rollNumber && formData.classCode) {
      onLogin(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.name && formData.rollNumber && formData.classCode;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 pt-16 pb-8 px-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center">
            <div className="text-2xl mr-3">{role === 'student' ? '🎓' : '👨‍🏫'}</div>
            <h1 className="text-xl font-semibold text-foreground">
              {role === 'student' ? 'Student Login' : 'Teacher Login'}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6">
        <div className="max-w-md mx-auto">
          <Card className="p-6 shadow-[var(--shadow-medium)]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rollNumber" className="text-sm font-medium text-foreground">
                  {role === 'student' ? 'Roll Number' : 'Teacher ID'}
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="rollNumber"
                    type="text"
                    placeholder={role === 'student' ? "Enter roll number" : "Enter teacher ID"}
                    value={formData.rollNumber}
                    onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="classCode" className="text-sm font-medium text-foreground">
                  Class Code
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="classCode"
                    type="text"
                    placeholder="Enter class code"
                    value={formData.classCode}
                    onChange={(e) => handleInputChange('classCode', e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 p-6">
        <div className="max-w-md mx-auto space-y-4">
          <Button
            variant="rounded"
            size="lg"
            className="w-full"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            {role === 'student' ? 'Join Class' : 'Access Class'}
          </Button>
          
          {role === 'teacher' && (
            <Button variant="outline" size="lg" className="w-full rounded-xl">
              Create New Class
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};