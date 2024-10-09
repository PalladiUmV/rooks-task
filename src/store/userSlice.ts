import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../types/user';

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user: User) => {

  return user;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    sortUsersByCity: (state) => {
      state.users.sort((a, b) => a.address.city.localeCompare(b.address.city));
    },
    sortUsersByCompany: (state) => {
      state.users.sort((a, b) => a.company.name.localeCompare(b.company.name));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export const { sortUsersByCity, sortUsersByCompany } = userSlice.actions;
export default userSlice.reducer;