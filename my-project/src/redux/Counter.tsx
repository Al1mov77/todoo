import { createSlice} from "@reduxjs/toolkit";

interface IData {
  id: number;
  name: string;
  age: number;
  status: boolean;
}

interface CounterState {
  users: IData[];
}

const initialState: CounterState = {
  users: [
    { id: 1, name: "Umar", age: 16, status: true }
  ],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    editUser: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) state.users[index] = action.payload;
    },
  },
});

export const { deleteUser, addUser, editUser } = counterSlice.actions;
export default counterSlice.reducer;
