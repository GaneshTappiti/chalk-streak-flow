import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { LoginScreen } from "@/components/LoginScreen";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { BottomNavigation } from "@/components/BottomNavigation";

type Screen = 'welcome' | 'login' | 'dashboard' | 'calendar' | 'mark-attendance' | 'trends' | 'streaks' | 'alerts' | 'profile' | 'analytics';
type Role = 'student' | 'teacher' | null;

interface UserData {
  name: string;
  rollNumber: string;
  classCode: string;
  role: Role;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState<Role>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleRoleSelect = (role: Role) => {
    setUserRole(role);
    setCurrentScreen('login');
  };

  const handleLogin = (data: { name: string; rollNumber: string; classCode: string }) => {
    setUserData({
      ...data,
      role: userRole
    });
    setCurrentScreen('dashboard');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setUserRole(null);
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    // Map tabs to screens
    const tabScreenMap: Record<string, Screen> = {
      'home': 'dashboard',
      'calendar': 'calendar',
      'alerts': 'alerts',
      'profile': 'profile'
    };
    
    const targetScreen = tabScreenMap[tab];
    if (targetScreen) {
      setCurrentScreen(targetScreen);
    }
  };

  const showBottomNav = currentScreen !== 'welcome' && currentScreen !== 'login';

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onRoleSelect={handleRoleSelect} />
      )}
      
      {currentScreen === 'login' && userRole && (
        <LoginScreen 
          role={userRole} 
          onBack={handleBackToWelcome}
          onLogin={handleLogin}
        />
      )}
      
      {currentScreen === 'dashboard' && userData && (
        <div className="flex flex-col min-h-screen">
          <div className="flex-1">
            {userData.role === 'student' ? (
              <StudentDashboard 
                userName={userData.name} 
                onNavigate={handleNavigate}
              />
            ) : (
              <TeacherDashboard 
                userName={userData.name} 
                onNavigate={handleNavigate}
              />
            )}
          </div>
        </div>
      )}
      
      {/* Placeholder screens for other routes */}
      {(currentScreen === 'calendar' || currentScreen === 'alerts' || currentScreen === 'profile') && (
        <div className="min-h-screen flex items-center justify-center pb-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)}
            </h1>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      )}
      
      {showBottomNav && (
        <BottomNavigation 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default Index;
