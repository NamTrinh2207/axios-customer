import _ from 'lodash';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/customers')
            .then(response => {
                setCustomers(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const filteredCustomers = customers.filter(customer => {
        const name = customer.name || '';
        const phone = customer.phone || '';
        const address = customer.address || '';
        const searchText = searchTerm.toLowerCase();
        return _.deburr(name.toLowerCase()).includes(_.deburr(searchText)) ||
            _.deburr(phone.toLowerCase()).includes(_.deburr(searchText)) ||
            _.deburr(address.toLowerCase()).includes(_.deburr(searchText));
    });

    function deleteCustomer(id) {
        axios.delete(`http://localhost:8080/customers/delete/${id}`)
            .then(response => {
                alert('Xóa thành công');
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
                placeholder="Search"
            />
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
                {filteredCustomers.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.name}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.email}</td>
                        <td>{customer.address}</td>
                        <td>
                            <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
                            <Link to={`/update/${customer.id}`}>Update</Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
export default ListCustomers;
