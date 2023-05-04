import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate();
    const [check, setCheck] = useState(true);
    useEffect(() => {
        axios.get("http://localhost:8080/customers")
            .then(function (response) {
                setCustomers(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [check])

    return (
        <table border={1}>
            <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {customers.map(customer => (
                <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td><button onClick={() => {deleteCustomer(customer.id)}}>Delete</button></td>
                    <td><Link to={`/update/` + customer.id}>Update</Link></td>
                </tr>))
            }
            </tbody>
        </table>
    )

    function deleteCustomer(id) {
        axios.delete(`http://localhost:8080/customers/delete/${id}`)
            .then(response => {
                navigate("/")
                setCheck(!check)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
};
export default ListCustomers;
