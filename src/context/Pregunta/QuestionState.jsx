import React, { useReducer } from "react";

import QuestionContext from "./QuestionContext";
import QuestionReducer from "./QuestionReducer";

import questionsMock from "../../data/questions-mock";

/* cambiar a {children} */
const QuestionState = (props) => {
  const [state, dispatch] = useReducer(QuestionReducer, questionsMock);

  const addQuestion = (question) => {
    const newQuestion = {
      id: state.length,
      pregunta: question,
      video: null,
    };
    dispatch({ type: "addQuestion", payload: newQuestion });
  };

  const addAnswer = (answer) => {
    dispatch({ type: "addAnswer", payload: answer });
  };

  return (
    <QuestionContext.Provider
      value={{
        questions: state,
        addQuestion,
        addAnswer,
      }}
    >
      {props.children}
    </QuestionContext.Provider>
  );
};

export default QuestionState;
