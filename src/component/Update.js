import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import * as yup from "yup";
import {ErrorMessage, Field, Formik} from "formik";

const UpdateCustomer = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({});
    const [loading, setLoading] = useState(true); // thêm biến loading

    useEffect(() => {
        axios
            .get(`http://localhost:8080/customers/${id}`)
            .then((response) => {
                setCustomer(response.data);
                setLoading(false); // đánh dấu dữ liệu đã được tải lên
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const initialValues = {
        name: customer.name || '',
        email: customer.email || '',
        address: customer.address || '',
        phone: customer.phone || '',
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

    if (loading) {
        return <div>Loading...</div>; // Nếu dữ liệu chưa tải lên thì hiển thị thông báo loading
    }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    axios
                        .put(`http://localhost:8080/customers/update/${id}`, values)
                        .then(() => {
                            navigate('/');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }}>
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <Field name={'name'}></Field>
                        <ErrorMessage name="name"/>

                        <Field name={'email'}></Field>
                        <ErrorMessage name="email"/>

                        <Field name={'address'}></Field>
                        <ErrorMessage name="address"/>

                        <Field name={'phone'}></Field>
                        <ErrorMessage name="phone"/>

                        <button>Update Customer</button>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default UpdateCustomer;