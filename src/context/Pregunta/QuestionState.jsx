import React, { useReducer } from "react";

import QuestionContext from "./QuestionContext";
import QuestionReducer from "./QuestionReducer";
import questions from "../../data/questions-mock";

const QuestionState = (props) => {
  const [state, dispatch] = useReducer(QuestionReducer, questions);

  const addQuestion = (question) => {
    const newQuestion = {
      id: state.length,
      pregunta: question,
      video: null,
    };
    dispatch({ type: "addQuestion", payload: newQuestion });
  };

  return (
    <QuestionContext.Provider
      value={{
        questions: state,
        addQuestion,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
