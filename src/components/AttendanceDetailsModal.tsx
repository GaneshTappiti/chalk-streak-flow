import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { format } from "date-fns";
import { CheckCircle, XCircle, Calendar, Users } from "lucide-react";
import { Badge } from "./ui/badge";

interface AttendanceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  userRole: 'student' | 'teacher';
  attendanceData?: {
    status?: 'present' | 'absent' | 'no-class';
    students?: Array<{
      id: string;
      name: string;
      rollNumber: string;
      status: 'present' | 'absent';
    }>;
    classInfo?: {
      subject: string;
      time: string;
      totalStudents: number;
      presentCount: number;
    };
  };
}

export const AttendanceDetailsModal = ({ 
  isOpen, 
  onClose, 
  date, 
  userRole, 
  attendanceData 
}: AttendanceDetailsModalProps) => {
  if (!date) return null;

  const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
  const isFuture = date > new Date();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>{format(date, 'EEEE, MMMM d, yyyy')}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {userRole === 'student' ? (
            // Student View
            <div className="text-center">
              {isFuture ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No class scheduled</p>
                </div>
              ) : attendanceData?.status === 'present' ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                  <p className="font-medium text-success">Present ✅</p>
                  <p className="text-sm text-muted-foreground">
                    You attended class on this day
                  </p>
                </div>
              ) : attendanceData?.status === 'absent' ? (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-destructive" />
                  </div>
                  <p className="font-medium text-destructive">Absent ❌</p>
                  <p className="text-sm text-muted-foreground">
                    You missed class on this day
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No class scheduled</p>
                </div>
              )}
            </div>
          ) : (
            // Teacher View
            <div className="space-y-4">
              {attendanceData?.classInfo && (
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">
                      {attendanceData.classInfo.subject}
                    </h4>
                    <Badge variant="outline">
                      {attendanceData.classInfo.time}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {attendanceData.classInfo.presentCount}/{attendanceData.classInfo.totalStudents}
                      </span>
                    </div>
                    <div className="text-primary font-medium">
                      {Math.round((attendanceData.classInfo.presentCount / attendanceData.classInfo.totalStudents) * 100)}% Present
                    </div>
                  </div>
                </div>
              )}

              {attendanceData?.students && attendanceData.students.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-3">Student List</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {attendanceData.students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-2 rounded-lg bg-card border">
                        <div>
                          <p className="font-medium text-sm text-foreground">{student.name}</p>
                          <p className="text-xs text-muted-foreground">#{student.rollNumber}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          {student.status === 'present' ? (
                            <>
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span className="text-sm text-success">Present</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-destructive" />
                              <span className="text-sm text-destructive">Absent</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!attendanceData?.students || attendanceData.students.length === 0) && !isFuture && (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No attendance data available</p>
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};