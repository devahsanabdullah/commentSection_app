import  {configureStore} from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
 import DataFilter from '../reducer/Reducer';
 import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
 import { getPersistConfig } from 'redux-deep-persist';


const persistConfig = {
    key: 'root',
    storage:storage,
    stateReconciler: hardSet

  }
  const persistedReducer = persistReducer(persistConfig, DataFilter)
 
   const store = configureStore( {reducer: persistedReducer})


export default store;
  
