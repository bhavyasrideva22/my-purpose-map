import { Card } from "@/components/ui/card";

interface AssessmentProgressProps {
  currentSection: number;
  totalSections: number;
  sections: Array<{ name: string; icon: string; completed?: boolean }>;
}

const AssessmentProgress = ({ currentSection, totalSections, sections }: AssessmentProgressProps) => {
  const progressPercentage = ((currentSection - 1) / totalSections) * 100;

  return (
    <Card className="p-6 bg-gradient-card border-border/50">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Assessment Progress</span>
          <span className="text-sm font-semibold text-primary">{currentSection} of {totalSections}</span>
        </div>
        
        <div className="w-full bg-progress-bg rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-progress rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sections.map((section, index) => (
          <div 
            key={section.name}
            className={`flex items-center space-x-2 p-2 rounded-lg transition-all duration-200 ${
              index + 1 === currentSection 
                ? 'bg-primary/10 text-primary' 
                : index + 1 < currentSection
                ? 'bg-secondary/50 text-secondary-foreground'
                : 'text-muted-foreground'
            }`}
          >
            <span className="text-lg">{section.icon}</span>
            <span className="text-xs font-medium">{section.name}</span>
            {section.completed && (
              <span className="ml-auto text-xs">✓</span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AssessmentProgress;