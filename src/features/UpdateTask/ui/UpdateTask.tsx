import {TaskStatus} from '@entities/Task/module/types/taskStatus.ts';
import {Task} from '@entities/Task';
import {Controller, useForm} from 'react-hook-form';
import React, {useCallback} from 'react';
import {updateTask} from '../model/services/updateTask.ts';
import {StyleSheet, TextInput, View} from 'react-native';
import {useTheme} from '@app/providers/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useAppDispatch} from '@shared/lib/hooks';
import {PressableOpacity} from '@shared/ui';

type UpdateTaskProps = {
  setIsEditTask: (value: boolean) => void;
  taskId: string;
  currentTaskName: string;
  toDoId: string;
  taskStatus: TaskStatus;
  task: Task;
  className?: string;
};
interface FormData {
  taskStatus: TaskStatus;
  taskName: string;
}

export const UpdateTask = ({
  taskId,
  currentTaskName,
  setIsEditTask,
  toDoId,
  task,
}: UpdateTaskProps) => {
  const {control, handleSubmit} = useForm<FormData>();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();
  const onSubmit = useCallback(
    (data: FormData) => {
      dispatch(
        updateTask({
          taskStatus: data.taskStatus,
          taskName: data.taskName,
          taskId,
          toDoId,
          task,
        }),
      );
      setIsEditTask(false);
    },
    [dispatch, setIsEditTask, task, taskId, toDoId],
  );
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <>
          <Controller
            name="taskName"
            control={control}
            defaultValue={currentTaskName}
            rules={{minLength: 1}}
            render={({field}) => (
              <TextInput
                style={[
                  styles.input,
                  {
                    color: theme.invertedPrimaryColor,
                    borderColor: theme.invertedPrimaryColor,
                  },
                ]}
                {...field}
                onSubmitEditing={handleSubmit(onSubmit)}
                onChangeText={value => field.onChange(value)}
              />
            )}
          />
        </>
        <>
          <View style={styles.buttonWrapper}>
            <PressableOpacity
              style={[styles.button]}
              onPress={handleSubmit(onSubmit)}>
              <Icon
                name="check"
                style={[{color: theme.invertedPrimaryColor}]}
                size={20}
              />
            </PressableOpacity>
            <PressableOpacity
              style={[styles.button]}
              onPress={() => setIsEditTask(false)}>
              <Icon name="close" style={[{color: 'red'}]} size={20} />
            </PressableOpacity>
          </View>
        </>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    fontSize: 16,
    maxWidth: '75%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 12,
  },
});
