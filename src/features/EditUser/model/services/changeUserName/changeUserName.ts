import {createAsyncThunk} from '@reduxjs/toolkit';
import {ThunkConfig} from '@app/providers/StoreProvider';

interface EditUserNameProps {
  name: string;
}
type EditUserNameResponse = {
  _id: string;
  name: string;
  email: string;
  emailActivate: boolean;
};
export const changeUserName = createAsyncThunk<
  EditUserNameResponse,
  EditUserNameProps,
  ThunkConfig<string>
>('user/changeUserName', async (newUserName, thunkAPI) => {
  const {extra, rejectWithValue} = thunkAPI;
  try {
    const response = await extra.api.patch<EditUserNameResponse>(
      'user/',
      newUserName,
    );
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue('error');
  }
});
