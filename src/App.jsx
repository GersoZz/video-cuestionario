import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AddQuestionPage from "./pages/AddQuestionPage";
import AddVideoPage from "./pages/AddVideoPage";

import QuestionState from "./context/Pregunta/QuestionState";

function App() {
  return (
    <BrowserRouter>
      <QuestionState>
        <Routes>
          <Route path="/" Component={HomePage} exact />
          <Route path="/add-question" Component={AddQuestionPage} />
          <Route path="/add-video/:id" Component={AddVideoPage} />
        </Routes>
      </QuestionState>
    </BrowserRouter>
  );
}

export default App;
