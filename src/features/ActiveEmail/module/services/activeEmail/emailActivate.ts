import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from '@app/app/providers/StoreProvider';

export const emailActivate = createAsyncThunk<
  undefined,
  undefined,
  ThunkConfig<string>
>('email/activate', async (_, thunkAPI) => {
  const {extra, rejectWithValue} = thunkAPI;
  try {
    const response = await extra.api.get('email/access-token');
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
