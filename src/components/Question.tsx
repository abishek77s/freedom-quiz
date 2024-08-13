import { useState } from "react";

const Question = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const questions = [
    {
      id: 1,
      ques: "How do you handle drama in your squad?",
      o1: "I try to talk it out and keep things cool.",
      o2: "I’m all about calling it out and setting things straight.",
      type1: "1",
      type2: "2",
    },
    {
      id: 2,
      ques: "When planning a big event, what’s your vibe?",
      o1: "I’m all about making sure everything is organized and on point.",
      o2: " I’m more focused on hyping everyone up and creating an epic experience. ",
      type1: "3",
      type2: "4",
    },
    {
      id: 3,
      ques: "How important are collabs to you?",
      o1: "Super important! Teamwork makes the dream work.",
      o2: "I prefer doing my own thing and staying true to myself.",
      type1: "1",
      type2: "2",
    },
    {
      id: 4,
      ques: "What’s your move when someone throws shade at you?",
      o1: "I pause, think it through, and come back with a solid response.",
      o2: "I keep my eyes on the prize and don’t let it distract me.",
      type1: "3",
      type2: "4",
    },
    {
      id: 5,
      ques: "How do you feel about compromises?",
      o1: "Sometimes you gotta meet halfway to keep the peace.",
      o2: "Nah, I’m not about watering down what I believe in.",
      type1: "1",
      type2: "2",
    },
    {
      id: 6,
      ques: "How do you decide what to post on social media?",
      o1: "I carefully plan it out to make sure it aligns with my goals.",
      o2: "I post what I know will inspire and resonate with my followers.",
      type1: "3",
      type2: "4",
    },
    {
      id: 7,
      ques: "What gets you fired up?",
      o1: "The idea of creating a world where everyone can thrive.",
      o2: "The urge to stand up against anything unfair, no matter what.",
      type1: "1",
      type2: "2",
    },
    {
      id: 8,
      ques: "What’s your take on taking risks?",
      o1: "I weigh the pros and cons before jumping in.",
      o2: "Sometimes you gotta take a leap to make real change.",
      type1: "3",
      type2: "4",
    },
    {
      id: 9,
      ques: "How do you feel about talking things out with people you don’t agree with?",
      o1: "I’m all for it if it means we can find some common ground.",
      o2: "I’d rather not waste time if they’re not going to change.",
      type1: "1",
      type2: "2",
    },
    {
      id: 10,
      ques: "What’s your role in your friend group?",
      o1: "The one who always has a plan and keeps everyone on track.",
      o2: "The one who inspires everyone to dream big and aim high.",
      type1: "3",
      type2: "4",
    },
  ];
  const freedomType = [
    "The Diplomat - Prefers negotiation, peaceful solutions, and building alliances.",
    "The Rebel - Bold, confrontational, and believes in direct action and defiance.",
    "The Strategist - Analytical, tactical, and prefers planning over impulsive action.",
    "The Visionary - Inspirational, idealistic, and driven by a long-term vision for change.",
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selection for the next question
    } else {
      setIsCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(null); // Reset selection for the previous question
    }
  };

  const handleOptionClick = (type: string) => {
    setSelectedOption(type);
    setUserResponses([...userResponses, type]);
  };

  const getMostFrequentType = () => {
    const counts: { [key: string]: number } = {};
    userResponses.forEach((type) => {
      counts[type] = (counts[type] || 0) + 1;
    });

    const mostFrequentType = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    switch (mostFrequentType) {
      case "1":
        return freedomType[0]; // Diplomat
      case "2":
        return freedomType[1]; // Rebel
      case "3":
        return freedomType[2]; // Strategist
      case "4":
        return freedomType[3]; // Visionary
      default:
        return "You skipped all the questions, you lazy!";
    }
  };

  return (
    <>
      {isCompleted ? (
        <div className="text-center">
          <h2>Thanks for completing the quiz!</h2>
          <img
            src="src/assets/ind.jpg"
            alt="Completion"
            className="img-fluid mt-4"
          />
          <div className="mt-4">
            <h3>Your Freedom Type:</h3>
            <p>{getMostFrequentType()}</p>
          </div>
        </div>
      ) : (
        <div className="container d-flex flex-column align-items-center">
          <div className="question-container p-3 mb-3">
            <div className="question p-3 mb-3">
              <b>{currentQuestion.ques}</b>
            </div>
            <div className="options mt-3">
              <div
                className={`option p-2 mb-2 cursor-pointer ${
                  selectedOption === currentQuestion.type1 ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(currentQuestion.type1)}
              >
                {currentQuestion.o1}
              </div>
              <div
                className={`option p-2 cursor-pointer ${
                  selectedOption === currentQuestion.type2 ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(currentQuestion.type2)}
              >
                {currentQuestion.o2}
              </div>
            </div>
          </div>
          <div className="mt-3 d-flex justify-content-between w-100">
            <button
              className="btn btn-secondary"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Back
            </button>
            <button className="btn btn-primary" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
