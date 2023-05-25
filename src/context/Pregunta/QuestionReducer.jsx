export default function preguntaReducer(state, action) {
  // console.log(state, action);

  switch (action.type) {
    case "addQuestion":
      // console.log("action.payload", action.payload);
      return [...state, action.payload];
    default:
      break;
  }
}
