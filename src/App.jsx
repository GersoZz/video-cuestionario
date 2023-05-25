import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AddQuestionPage from "./pages/AddQuestionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} exact />
        <Route path="/add-question" Component={AddQuestionPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
