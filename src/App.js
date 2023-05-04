import './App.css';
import CreateCustomer from "./component/CreateCustomer";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ListCustomers from "./component/ListCustomers";
import Update from "./component/Update";
import Navigation from "./component/Directional";


function App() {
    return (
        <Router>
            <Navigation/>
            <Routes>
                <Route path={"/"} element={<ListCustomers/>}></Route>
                <Route path={"/update"} element={<Update/>}></Route>
                <Route path={"/create"} element={<CreateCustomer/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
