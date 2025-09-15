import { useState } from "react";
import { Button } from "@/components/ui/button";
import AssessmentProgress from "@/components/AssessmentProgress";
import QuestionCard from "@/components/QuestionCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AssessmentData {
  currentSection: number;
  currentQuestion: number;
  answers: Record<string, any>;
}

const Assessment = () => {
  const [assessmentData, setAssessmentData] = useState<AssessmentData>({
    currentSection: 1,
    currentQuestion: 0,
    answers: {}
  });

  const sections = [
    { name: "Core Values", icon: "💠" },
    { name: "Purpose Type", icon: "🧭" },
    { name: "Fulfillment", icon: "🧩" },
    { name: "PACT Check", icon: "🧪" }
  ];

  const questions = [
    {
      section: 1,
      questions: [
        {
          id: "values_autonomy_stability",
          type: "comparison" as const,
          title: "Which feels more essential to your career path?",
          options: [
            { value: "autonomy", label: "Autonomy", icon: "💡" },
            { value: "stability", label: "Stability", icon: "🛡" }
          ]
        },
        {
          id: "impact_importance",
          type: "slider" as const,
          title: "How important is making a meaningful impact?",
          subtitle: "Rate how central this value is to your decision-making",
          min: 0,
          max: 100,
          step: 5
        }
      ]
    },
    {
      section: 2,
      questions: [
        {
          id: "purpose_identity",
          type: "radio" as const,
          title: "Which role best represents your purpose?",
          options: [
            { value: "builder", label: "The Builder", icon: "🛠" },
            { value: "healer", label: "The Healer", icon: "🧘" },
            { value: "seeker", label: "The Seeker", icon: "🔍" },
            { value: "guide", label: "The Guide", icon: "📚" },
            { value: "creator", label: "The Creator", icon: "🎨" },
            { value: "justice", label: "The Justice-Seeker", icon: "⚖️" }
          ]
        }
      ]
    }
  ];

  const currentSectionQuestions = questions.find(q => q.section === assessmentData.currentSection)?.questions || [];
  const currentQuestion = currentSectionQuestions[assessmentData.currentQuestion];
  const totalQuestions = questions.reduce((sum, section) => sum + section.questions.length, 0);

  const handleAnswer = (questionId: string, answer: any) => {
    setAssessmentData(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const handleNext = () => {
    if (assessmentData.currentQuestion < currentSectionQuestions.length - 1) {
      setAssessmentData(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1
      }));
    } else {
      // Move to next section
      setAssessmentData(prev => ({
        ...prev,
        currentSection: prev.currentSection + 1,
        currentQuestion: 0
      }));
    }
  };

  const handlePrevious = () => {
    if (assessmentData.currentQuestion > 0) {
      setAssessmentData(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1
      }));
    } else if (assessmentData.currentSection > 1) {
      // Move to previous section
      const previousSection = questions.find(q => q.section === assessmentData.currentSection - 1);
      setAssessmentData(prev => ({
        ...prev,
        currentSection: prev.currentSection - 1,
        currentQuestion: (previousSection?.questions.length || 1) - 1
      }));
    }
  };

  const canGoNext = currentQuestion && assessmentData.answers[currentQuestion.id] !== undefined;
  const isLastQuestion = assessmentData.currentSection === sections.length && 
                         assessmentData.currentQuestion === currentSectionQuestions.length - 1;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Assessment Complete!</h2>
          <p className="text-muted-foreground mb-6">Thank you for completing the assessment.</p>
          <Button onClick={() => window.location.href = "/"}>View Results</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <AssessmentProgress 
              currentSection={assessmentData.currentSection}
              totalSections={sections.length}
              sections={sections}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl font-bold text-primary mb-2">
                {sections[assessmentData.currentSection - 1]?.name} Discovery
              </h1>
              <p className="text-muted-foreground">
                Question {assessmentData.currentQuestion + 1} of {currentSectionQuestions.length} in this section
              </p>
            </div>

            <QuestionCard 
              question={currentQuestion}
              onAnswer={handleAnswer}
              currentAnswer={assessmentData.answers[currentQuestion.id]}
            />

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={assessmentData.currentSection === 1 && assessmentData.currentQuestion === 0}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              <div className="text-sm text-muted-foreground">
                Progress: {Math.round(((assessmentData.currentSection - 1) * 10 + assessmentData.currentQuestion + 1) / totalQuestions * 100)}%
              </div>

              <Button 
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex items-center space-x-2"
              >
                <span>{isLastQuestion ? "Complete" : "Next"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;