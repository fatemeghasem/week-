import React, { useState } from "react";
import { useAuth } from "../context/ProductsContexts";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Registeration.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../apiservices";

const RegisterationForm = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  } = useAuth();

  const navigate = useNavigate()

  
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string()
      .required("رمز عبور الزامی است")
      .min(6, "رمز عبور باید حداقل 6 کاراکتر باشد"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "تکرار رمز عبور باید با رمز عبور مطابقت داشته باشد"
      )
      .required("تکرار رمز عبور الزامی است"),
  });

  const handleSubmit = async (values) => {
    try {
      const userData = { username:values.username, password:values.password };
      const result = await registerUser(userData);
      console.log( result);
      navigate("/login")
    } catch (error) {
      throw error.response.data
    }
  };


  return (
    <div className={styles.container}>
      <header>
        <h2>ثبت نام</h2>
      </header>
      <main>
        <Formik
          initialValues={{ username, password, confirmPassword }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange }) => (
            <Form>
              <div>
                <Field
                  name="username"
                  placeholder="نام کاربری"
                  type="text"
                  onChange={(e) => {
                    handleChange(e);
                    setUsername(e.target.value);
                  }}
                />
              </div>
              <div>
                <Field
                  name="password"
                  placeholder="رمز عبور"
                  type="password"
                  onChange={(e) => {
                    handleChange(e);
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div>
                <Field
                  name="confirmPassword"
                  placeholder="تکرار رمز عبور"
                  type="password"
                  onChange={(e) => {
                    handleChange(e);
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
              <button type="submit">ثبت نام</button>
              <div className={styles.err}>
                <ErrorMessage name="confirmPassword" component="div" />
                <ErrorMessage name="username" component="div" />
                <ErrorMessage name="password" component="div" />
              </div>
            </Form>
          )}
        </Formik>
        <a href="/login"> حساب کاربری دارید </a>
      </main>
    </div>
  );
};

export default RegisterationForm;
