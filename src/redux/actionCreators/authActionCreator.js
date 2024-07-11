import { auth, db } from '../../config/firebase';
import * as types from '../actionTypes/authActionTypes';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';

// Action Creators
export const logInUser = (user) => ({
  type: types.LOGIN_USER,
  payload: user,
});

export const logOutUser = () => ({
  type: types.SIGN_OUT_USER,
});

// Async Action Creators
export const signUpUser = (name, email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName: name });
    await setDoc(doc(collection(db, 'users'), user.uid), { name, email });
    dispatch(logInUser(user));
    return user;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

export const signInUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch(logInUser(user));
    return user;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

export const signOutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logOutUser());
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
};

export const checkIsLoggedIn = () => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(logInUser(user));
    } else {
      dispatch(logOutUser());
    }
  });
};
