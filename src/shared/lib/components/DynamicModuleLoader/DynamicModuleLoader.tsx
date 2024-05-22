import React, {FC, useEffect} from 'react';
import {useDispatch, useStore} from 'react-redux';
import {Reducer} from '@reduxjs/toolkit';
import {
  ReduxStoreWithManager,
  StateSchemaKey,
} from '../../../../app/providers/StoreProvider/config/StateSchema.ts';

export type ReducersList = {
  [name in StateSchemaKey]?: Reducer;
};

interface DynamicModuleLoaderProps {
  reducers: ReducersList;
  removeAfterUnmount?: boolean;
  children: React.ReactNode;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = props => {
  const {children, reducers, removeAfterUnmount = true} = props;

  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();
  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      // adds reducer if will not be added before
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({type: `@INIT ${name} reducer`});
      }
    });

    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({type: `@DESTROY ${name} reducer`});
        });
      }
    };
    // eslint-disable-next-line
    }, []);

  return <>{children}</>;
};
