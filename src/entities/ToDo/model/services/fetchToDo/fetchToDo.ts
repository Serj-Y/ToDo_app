import {createAsyncThunk} from '@reduxjs/toolkit';
import {ToDo} from '../../types/toDo';
import {ThunkConfig} from '@app/providers/StoreProvider';

interface FetchToDoProps {
  replace?: boolean;
}

export const fetchToDo = createAsyncThunk<
  ToDo[],
  FetchToDoProps,
  ThunkConfig<string>
>('toDoPage/fetchToDo', async (args, thunkAPI) => {
  const {extra, rejectWithValue} = thunkAPI;
  try {
    const response = await extra.api.get<ToDo[]>('todo/');
    if (!response.data) {
      throw new Error();
    }
    return response.data;
  } catch (e: any) {
    console.log(e);
    return rejectWithValue(e);
  }
});
