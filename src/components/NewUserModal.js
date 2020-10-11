import React, {useState} from "react";
import {
    Modal,
    Button,
} from 'react-bootstrap';
import { Formik, Form, Field } from "formik";

import './NewUserModal.css';

const NewUserModal = ({showModal, toggleModal, saveUser, user, isEdit}) => {

  const validateEmail = (value) => {
    let error;

    if (!value) {
      error = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      error = "Invalid email address";
    }

    return error;
  }

  const validatePassword = (value) => {
    let error;

    if (!value) {
      error = "Required";
    } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i.test(value)) {
      error = "Invalid password, must contain one number and at least 8 chars";
    }

    return error;
  }

  return (
    <>
      <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
              <Modal.Title>Add new user</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={user}
              onSubmit={saveUser}
            >
              {({ errors, touched }) => (
                <Form
                  className="new-user-form"
                >
                  <Field
                    name="username"
                    placeholder="Username"
                    disabled={isEdit}
                  />
                  <div className="new-user-error">
                    {errors.username && touched.username && errors.username}
                  </div>

                  <Field
                    name="password"
                    placeholder="Password"
                    validate={validatePassword}
                  />
                  <div className="new-user-error">
                    {errors.password && touched.password && errors.password}
                  </div>

                  <Field
                    name="name"
                    placeholder="Name"
                  />

                  <Field
                    name="email"
                    placeholder="Email"
                    validate={validateEmail}
                  />
                  <div className="new-user-error">
                    {errors.email && touched.email && errors.email}
                  </div>

                  <Button variant="primary" type="submit">
                      Save User
                  </Button>
                </Form>
              )}
            </Formik>
          </Modal.Body>
      </Modal>
    </>
  )
}

export default NewUserModal;
