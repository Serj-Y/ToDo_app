import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from '@app/providers/StoreProvider';

type userEmail = {
  email?: string;
};

export const forgotPassword = createAsyncThunk<
  undefined,
  userEmail,
  ThunkConfig<string>
>('auth/forgotPassword', async (userEmail, thunkAPI) => {
  const {extra, rejectWithValue} = thunkAPI;
  try {
    const response = await extra.api.post('forgot/access-token', userEmail);
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
