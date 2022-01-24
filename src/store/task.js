import { createSlice } from "@reduxjs/toolkit";
import { setError } from "./errors";
import todosService from "./services/todos.service";
const initialState = { entities: [], isLoading: true };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    recived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    update(state, action) {
      const elementIndex = state.entities.findIndex(
        (el) => el.id === action.payload.id
      );
      state.entities[elementIndex] = {
        ...state.entities[elementIndex],
        ...action.payload,
      };
    },
    remove(state, action) {
      state.entities = state.entities.filter(
        (el) => el.id !== action.payload.id
      );
    },
    taskCreated(state, action) {
      state.entities = [...state.entities, action.payload];
    },
    taskRequested(state, action) {
      state.isLoading = true;
    },
    taskRequestFailed(state, action) {
      state.isLoading = false;
    },
  },
});
console.log(taskSlice);
// const taskReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(update, (state, action) => {
//       const elementIndex = state.findIndex((el) => el.id === action.payload.id);
//       state[elementIndex] = { ...state[elementIndex], ...action.payload };
//     })
//     .addCase(remove, (state, action) => {
//       return state.filter((el) => el.id !== action.payload.id); //return - прямая мутация состояния
//     });
// });

// function taskReducer(state, action) {
//   switch (action.type) {
//     case update.type: {
//       const newArray = [...state];
//       const elementIndex = newArray.findIndex(
//         (el) => el.id === action.payload.id
//       );
//       newArray[elementIndex] = { ...newArray[elementIndex], ...action.payload };
//       return newArray;
//     }

//     case remove.type: {
//       const newArray = [...state];
//       const elementIndex = newArray.findIndex(
//         (el) => el.id === action.payload.id
//       );
//       newArray.splice(elementIndex, 1);
//       return newArray;
//     }
//     default:
//       return state;
//   }
// }
const { actions, reducer: taskReducer } = taskSlice;
const {
  update,
  remove,
  recived,
  taskRequested,
  taskRequestFailed,
  taskCreated,
} = actions;

export const loadTasks = () => async (dispatch) => {
  dispatch(taskRequested());
  try {
    const data = await todosService.fetch();
    console.log("data", data);
    dispatch(recived(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const createTask = () => async (dispatch) => {
  try {
    const data = await todosService.add();
    console.log("DATA", data);
    dispatch(taskCreated(data));
  } catch (error) {
    dispatch(taskRequestFailed());
    dispatch(setError(error.message));
  }
};

export const completeTask = (id) => (dispatch, getState) => {
  dispatch(update({ id, completed: true }));
};

export function titleChanged(id) {
  return update({ id, title: `new title for ${id}` });
}

export function taskDeleted(id) {
  return remove({ id });
}

export const getTasks = () => (state) => state.tasks.entities;

export const getTaskLoadingStatus = () => (state) => state.tasks.isLoading;

export default taskReducer;
