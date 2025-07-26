import { cn } from "@/lib/utils";

interface AttendanceLegendProps {
  className?: string;
}

export const AttendanceLegend = ({ className }: AttendanceLegendProps) => {
  const legendItems = [
    { status: 'present', color: 'bg-success', label: 'Present' },
    { status: 'absent', color: 'bg-destructive', label: 'Absent' },
    { status: 'upcoming', color: 'bg-muted-foreground', label: 'No Class' },
    { status: 'today', color: 'bg-primary', label: 'Today' },
  ];

  return (
    <div className={cn("flex flex-wrap gap-4 justify-center", className)}>
      {legendItems.map((item) => (
        <div key={item.status} className="flex items-center space-x-2">
          <div className={cn("w-3 h-3 rounded-full", item.color)} />
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
};