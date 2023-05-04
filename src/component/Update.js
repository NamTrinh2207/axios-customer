import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './../style/SignupStyle.css';

const UpdateCustomer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/customers/${id}`)
            .then((response) => {
                setCustomer(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const initialValues = {
        name:  '',
        email:  '',
        address:  '',
        phone:'',
    };

    const validationSchema = yup.object({
        name: yup.string().max(20, 'Must be 20 characters or less').required('Required'),
        email: yup.string().email('Invalid email or address').required('Required'),
        address: yup.string().max(100, 'Must be 100 characters or less').required('Required'),
        phone: yup
            .number()
            .typeError("That doesn't look like a phone number")
            .positive("A phone number can't start with a minus")
            .integer("A phone number can't include a decimal point")
            .min(8)
            .required('A phone number is required'),
    });

    const handleSubmit = (values) => {
        axios
            .put(`http://localhost:8080/customers/update/${id}`, values)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <Field name="name" defaultValue={customer.name} />
                        <ErrorMessage name="name" />

                        <Field name="email" defaultValue={customer.email} />
                        <ErrorMessage name="email" />

                        <Field name="address" defaultValue={customer.address} />
                        <ErrorMessage name="address" />

                        <Field name="phone" defaultValue={customer.phone} />
                        <ErrorMessage name="phone" />

                        <button type="submit">Update Customer</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateCustomer;
