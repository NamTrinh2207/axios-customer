import React from 'react';
import {ErrorMessage, Field, Formik} from "formik";
import * as yup from "yup";
import "./../style/SignupStyle.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";
const CreateCustomer = () => {
    const navigate = useNavigate();
    const value = {
        name: "",
        email: "",
        address: "",
        phone: "",
    }
    const validate = yup.object({
        name: yup.string()
            .max(20, "Must be 20 character or less")
            .required("required"),
        email: yup.string()
            .email("invalid email or address")
            .required("required"),
        address: yup.string()
            .max(100, "Must be 100 character or less")
            .required("required"),
        phone: yup.number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(8)
            .required('A phone number is required'),
    })
    return (
        <Formik
            initialValues={value}
            validationSchema={validate}
            onSubmit={(values) => {
                axios.post("http://localhost:8080/customers/create", values)
                    .then(() => {
                        navigate("/")
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            }}>
            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <Field name = 'name'></Field>
                    <ErrorMessage name={'name'}></ErrorMessage>

                    <Field name = 'email'></Field>
                    <ErrorMessage name={'email'}></ErrorMessage>

                    <Field name = 'address'></Field>
                    <ErrorMessage name={'address'}></ErrorMessage>

                    <Field name = 'phone'></Field>
                    <ErrorMessage name={'phone'}></ErrorMessage>

                    <button>Signup Form</button>
                </form>
            )}
        </Formik>
    )
};
export default CreateCustomer;