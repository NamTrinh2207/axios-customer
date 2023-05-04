import './App.css';
import CreateCustomer from "./component/CreateCustomer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navigation from "./component/Directional";
import UpdateCustomer from "./component/Update";
import ListCustomers from "./component/ListCustomers";


function App() {
    return (
        <Router>
            <Navigation/>
            <Routes>
                <Route path={"/"} element={<ListCustomers/>}></Route>
                <Route path={"/update/:id"} element={<UpdateCustomer/>}></Route>
                <Route path={"/create"} element={<CreateCustomer/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
