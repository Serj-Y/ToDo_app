import React, {useCallback} from 'react';
import {deleteToDo} from '../model/services/deleteToDo';
import {StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {PressableOpacity} from '@shared/ui';
import {useAppDispatch} from '@shared/lib/hooks';

type DeleteToDoProps = {
  toDoIdForDelete: string;
};

export const DeleteToDo = ({toDoIdForDelete}: DeleteToDoProps) => {
  const dispatch = useAppDispatch();

  const onDeleteToDoListItem = useCallback(() => {
    dispatch(deleteToDo({toDoId: toDoIdForDelete}));
  }, [dispatch, toDoIdForDelete]);

  return (
    <PressableOpacity style={[styles.button]} onPress={onDeleteToDoListItem}>
      <Icon name="trash-o" style={[{color: 'red'}]} size={24} />
    </PressableOpacity>
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
  },
  button: {
    padding: 8,
    borderRadius: 4,
  },
});
