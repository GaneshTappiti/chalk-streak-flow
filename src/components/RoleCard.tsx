import { cn } from "@/lib/utils";

interface RoleCardProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export const RoleCard = ({ icon, title, description, selected, onClick }: RoleCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200",
        "hover:shadow-[var(--shadow-medium)] active:scale-[0.98]",
        selected
          ? "border-primary bg-secondary shadow-[var(--shadow-medium)]"
          : "border-border bg-card hover:border-primary/30"
      )}
    >
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
        <div className={cn(
          "w-5 h-5 rounded-full border-2 transition-colors",
          selected
            ? "bg-primary border-primary"
            : "border-muted-foreground"
        )}>
          {selected && (
            <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
          )}
        </div>
      </div>
    </div>
  );
};