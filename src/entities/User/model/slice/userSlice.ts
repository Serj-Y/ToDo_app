import {createSlice} from '@reduxjs/toolkit';
import {UserSchema} from '../types/user';
import {fetchUserData} from '../services/fetchUserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '@shared/consts/localStorage.ts';
import {signIn} from '@features/Auth/SignIn/model/services/signIn/signIn.ts';
import {signUp} from '@features/Auth/SignUp/model/services/signUp/signUp.ts';
import {changePassword} from '@features/EditUser/model/services/changePassword/changePassword.ts';
import {changeUserName} from '@features/EditUser/model/services/changeUserName/changeUserName.ts';

const initialState: UserSchema = {
  error: '',
  isLoading: false,
  authData: undefined,
  _inited: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initState: state => {
      state._inited = true;
    },
    logout: state => {
      state.authData = undefined;
      state._inited = false;
      AsyncStorage.removeItem(ACCESS_TOKEN);
      AsyncStorage.removeItem(REFRESH_TOKEN);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        state.authData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        state.authData = action.payload.user;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signUp.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        state.authData = action.payload.user;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(changePassword.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        state.authData = action.payload.user;
        AsyncStorage.setItem(ACCESS_TOKEN, action.payload.accessToken);
        AsyncStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(changeUserName.pending, state => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(changeUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state._inited = true;
        if (state.authData) {
          state.authData.name = action.payload.name;
        }
      })
      .addCase(changeUserName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {reducer: userReducer, actions: userActions} = userSlice;
