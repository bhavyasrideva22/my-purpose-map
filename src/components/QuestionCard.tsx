import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface QuestionCardProps {
  question: {
    id: string;
    type: 'slider' | 'radio' | 'comparison' | 'ranking';
    title: string;
    subtitle?: string;
    options?: Array<{ value: string; label: string; icon?: string }>;
    min?: number;
    max?: number;
    step?: number;
  };
  onAnswer: (questionId: string, answer: any) => void;
  currentAnswer?: any;
}

const QuestionCard = ({ question, onAnswer, currentAnswer }: QuestionCardProps) => {
  const [localAnswer, setLocalAnswer] = useState(currentAnswer);

  const handleSliderChange = (value: number[]) => {
    setLocalAnswer(value[0]);
    onAnswer(question.id, value[0]);
  };

  const handleRadioChange = (value: string) => {
    setLocalAnswer(value);
    onAnswer(question.id, value);
  };

  return (
    <Card className="p-8 bg-gradient-card border-border/50 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{question.title}</h3>
        {question.subtitle && (
          <p className="text-muted-foreground">{question.subtitle}</p>
        )}
      </div>

      <div className="space-y-6">
        {question.type === 'slider' && (
          <div className="px-4">
            <Slider
              value={[localAnswer || question.min || 0]}
              onValueChange={handleSliderChange}
              max={question.max || 100}
              min={question.min || 0}
              step={question.step || 1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Not Important ({question.min || 0})</span>
              <span className="font-medium text-primary">{localAnswer || question.min || 0}</span>
              <span>Essential ({question.max || 100})</span>
            </div>
          </div>
        )}

        {question.type === 'radio' && question.options && (
          <RadioGroup value={localAnswer} onValueChange={handleRadioChange}>
            {question.options.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer flex items-center space-x-3"
                >
                  {option.icon && <span className="text-lg">{option.icon}</span>}
                  <span>{option.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}

        {question.type === 'comparison' && question.options && question.options.length >= 2 && (
          <div className="grid grid-cols-2 gap-4">
            {question.options.slice(0, 2).map((option) => (
              <Button
                key={option.value}
                variant={localAnswer === option.value ? "default" : "outline"}
                className="h-20 text-left p-4 flex items-center space-x-3"
                onClick={() => handleRadioChange(option.value)}
              >
                {option.icon && <span className="text-2xl">{option.icon}</span>}
                <span className="font-medium">{option.label}</span>
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default QuestionCard;