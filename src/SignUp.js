import React from 'react';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from 'formik';

export default class SignUp extends React.Component {
  render() {
    return (
      <div className="App">
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={values => {
            let errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            try {
              firebase.initializeApp({
                apiKey: "AIzaSyAgFBIvwiDkOTf3ndJr-q3-mvrbEBlLJ6Q",
                authDomain: "ecs153project-52c11.firebaseapp.com",
                databaseURL: "https://ecs153project-52c11.firebaseio.com",
                projectId: "ecs153project-52c11",
                storageBucket: "ecs153project-52c11.appspot.com",
                messagingSenderId: "153276828224",
              });
              firebase.auth().createUserWithEmailAndPassword(values.email, values.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              });
            } catch ({ message }) {
              alert(message);
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button type="submit" disabled={isSubmitting}>
                Submit
          </button>
            </Form>
          )}
        </Formik>
      </div >
    );
  }
}