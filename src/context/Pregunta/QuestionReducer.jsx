export default function preguntaReducer(state, action) {
  // console.log(state, action);

  console.log("state!", state);

  switch (action.type) {
    case "addQuestion":
      // console.log("action.payload", action.payload);
      return [...state, action.payload];
    case "addAnswer":
      const answer = action.payload;
      const newAnswersArray = state.map((item) => {
        if (item.id === answer.id) {
          item.pregunta = answer.pregunta;
          item.video = answer.video;
        }
        return item;
      });
      return newAnswersArray;
    default:
      break;
  }
}
