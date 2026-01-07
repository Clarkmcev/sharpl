import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'
import onboardingReducer from './slices/onboardingSlice'
import themeReducer from './slices/themeSlice'
import rootSaga from './sagas'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    onboarding: onboardingReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk since we're using sagas
      serializableCheck: {
        // Ignore these action types for serialization check
        ignoredActions: ['auth/loginSuccess', 'auth/registerSuccess'],
      },
    }).concat(sagaMiddleware),
})

// Run the root saga
sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
