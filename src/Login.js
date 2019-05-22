import React from 'react';

import Fire from './Fire';
import Dashboard from './Dashboard'

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
import './App.css';

export default class Login extends React.Component {
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
            Fire.shared.signIn(values.email, values.password);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <Router>
                <Link to="/dashboard">
                  <button type="submit" disabled={isSubmitting}>
                    Sign-In
                </button>
                </Link>
                <Route exact path="/dashboard" component={Dashboard} />
              </Router>
            </Form>
          )}
        </Formik>
      </div >
    );
  }
}