export function logger(state) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      return next(action);
    };
  };
}

// export function logger({ getState, dispatch }) {
//     return function wrapDispatch(next) {
//       return function handleAction(action) {
//         console.log("next ", next);
//         console.log("action ", action);
//         if (action.type === "task/update") {
//           dispatch({ type: "task/remove", payload: { ...action.payload } });
//         }
//         return next(action);
//       };
//     };
//   }
