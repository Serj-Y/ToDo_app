import {useTranslation} from 'react-i18next';
import {useAppDispatch} from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {useYupValidationResolver} from '../../../shared/lib/hooks/useYupValidationResolver/useYupValidationResolver.ts';
import React, {useCallback} from 'react';
import {createTask} from '../model/services/createTask.ts';
import {StyleSheet, TextInput, View} from 'react-native';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';
import {useTheme} from '../../../app/providers/ThemeProvider';
import Icon from 'react-native-vector-icons/FontAwesome';

type CreateTaskProps = {
  toDoId: string;
};
interface FormData {
  taskName: string;
}

export const CreateTask = ({toDoId}: CreateTaskProps) => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const {theme} = useTheme();

  const validationSchema = yup.object({
    taskName: yup.string().required(t('This field is required')),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FormData>({
    resolver: useYupValidationResolver(validationSchema),
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      if (false) {
        // isOfline
        // const offlineId = new ObjectId();
        // dispatch(
        //   createTask({
        //     taskName: data.taskName,
        //     toDoId,
        //     taskId: offlineId.toString(),
        //   }),
        // );
        // reset();
      } else {
        dispatch(createTask({taskName: data.taskName, toDoId}));
        reset();
      }
    },
    [dispatch, reset, toDoId],
  );

  return (
    <View style={styles.container}>
      <Controller
        name="taskName"
        control={control}
        defaultValue=""
        render={({field}) => (
          <View
            style={[
              styles.inputWrapper,
              {borderColor: theme.invertedPrimaryColor},
            ]}>
            <TextInput
              {...field}
              style={[
                styles.input,
                {
                  color: theme.invertedPrimaryColor,
                  borderColor: theme.invertedPrimaryColor,
                },
              ]}
              placeholderTextColor={
                errors.taskName ? 'red' : theme.invertedPrimaryColor
              }
              placeholder={
                errors.taskName ? errors.taskName.message : t('Enter task name')
              }
              onChangeText={value => field.onChange(value)}
            />
          </View>
        )}
      />
      <PressableOpacity
        style={[styles.button, {backgroundColor: theme.backgroundColor}]}
        onPress={handleSubmit(onSubmit)}>
        <Icon
          style={styles.buttonText}
          name={'plus'}
          color={theme.primaryColor}
        />
      </PressableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inputWrapper: {
    borderWidth: 1,
    borderRadius: 4,
    width: '85%',
  },
  errorText: {
    color: 'red',
    paddingBottom: 10,
  },
  input: {
    alignItems: 'center',
    height: 40,
    padding: 8,
  },
  button: {
    padding: 12,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
