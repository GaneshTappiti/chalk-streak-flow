import { useState } from "react";
import { format, isSameMonth, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isFuture } from "date-fns";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Calendar } from "./ui/calendar";
import { AttendanceLegend } from "./AttendanceLegend";
import { AttendanceDetailsModal } from "./AttendanceDetailsModal";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarViewProps {
  userRole: 'student' | 'teacher';
  onBack: () => void;
}

// Mock attendance data
const mockAttendanceData = {
  student: {
    '2024-01-15': { status: 'present' as const },
    '2024-01-16': { status: 'absent' as const },
    '2024-01-17': { status: 'present' as const },
    '2024-01-18': { status: 'present' as const },
    '2024-01-19': { status: 'absent' as const },
    '2024-01-22': { status: 'present' as const },
    '2024-01-23': { status: 'present' as const },
    '2024-01-24': { status: 'present' as const },
    '2024-01-25': { status: 'absent' as const },
    '2024-01-26': { status: 'present' as const },
  },
  teacher: {
    '2024-01-15': {
      classInfo: {
        subject: 'Computer Science 3A',
        time: '10:00 AM',
        totalStudents: 30,
        presentCount: 26
      },
      students: [
        { id: '1', name: 'Alex Johnson', rollNumber: 'CS001', status: 'present' as const },
        { id: '2', name: 'Sarah Wilson', rollNumber: 'CS002', status: 'present' as const },
        { id: '3', name: 'Mike Brown', rollNumber: 'CS003', status: 'absent' as const },
        { id: '4', name: 'Emma Davis', rollNumber: 'CS004', status: 'present' as const },
        { id: '5', name: 'John Smith', rollNumber: 'CS005', status: 'absent' as const },
      ]
    }
  }
};

export const CalendarView = ({ userRole, onBack }: CalendarViewProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showModal, setShowModal] = useState(false);

  const getAttendanceStatus = (date: Date): 'present' | 'absent' | 'no-class' => {
    const dateKey = format(date, 'yyyy-MM-dd');
    
    if (userRole === 'student') {
      const data = mockAttendanceData.student[dateKey as keyof typeof mockAttendanceData.student];
      return data?.status || 'no-class';
    } else {
      const data = mockAttendanceData.teacher[dateKey as keyof typeof mockAttendanceData.teacher];
      return data ? 'present' : 'no-class'; // For teacher, if there's class data, show as present
    }
  };

  const getAttendanceDot = (date: Date) => {
    if (isToday(date)) {
      return 'bg-primary';
    }
    
    if (isFuture(date)) {
      return 'bg-muted-foreground';
    }

    const status = getAttendanceStatus(date);
    switch (status) {
      case 'present':
        return 'bg-success';
      case 'absent':
        return 'bg-destructive';
      default:
        return 'bg-muted-foreground';
    }
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const getAttendanceData = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    if (userRole === 'student') {
      const data = mockAttendanceData.student[dateKey as keyof typeof mockAttendanceData.student];
      return data ? { status: data.status } : undefined;
    } else {
      const data = mockAttendanceData.teacher[dateKey as keyof typeof mockAttendanceData.teacher];
      return data;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 pt-16 pb-4 px-6">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Attendance Calendar</h1>
          <div /> {/* Spacer */}
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-medium text-foreground">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Legend */}
        <AttendanceLegend className="mb-4" />
      </div>

      {/* Calendar */}
      <div className="flex-1 px-6 pb-20">
        <Card className="p-4 shadow-[var(--shadow-medium)]">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && handleDateClick(date)}
            month={currentDate}
            onMonthChange={setCurrentDate}
            className="w-full pointer-events-auto"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: cn(
                "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                "h-8 w-8"
              ),
              day: cn(
                "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-md relative",
                "flex items-center justify-center"
              ),
              day_range_end: "day-range-end",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
            components={{
              DayContent: ({ date }) => (
                <div className="relative w-full h-full flex items-center justify-center">
                  <span className="text-sm">{format(date, 'd')}</span>
                  <div 
                    className={cn(
                      "absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full",
                      getAttendanceDot(date)
                    )}
                  />
                </div>
              )
            }}
          />
        </Card>
      </div>

      {/* Attendance Details Modal */}
      <AttendanceDetailsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        date={selectedDate || null}
        userRole={userRole}
        attendanceData={selectedDate ? getAttendanceData(selectedDate) : undefined}
      />
    </div>
  );
};