import { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from "react-redux";
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/AuthPages/Login/Login';
import Register from './pages/AuthPages/Register/Register';
import DashboardPage from './pages/DashboardPage/DashboardPage';

import RoomPage from "./pages/RoomPage/RoomPage";
import { checkIsLoggedIn } from "./redux/actionCreators/authActionCreator";

const App = () => {
    const dispatch = useDispatch();
    console.log("process.env.REACT_APP_SERVER_SECRET", process.env.REACT_APP_SERVER_SECRET);

    useEffect(() => {
        dispatch(checkIsLoggedIn());
    }, [dispatch]);

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<DashboardPage />} />
                
                <Route path='/room/:roomId' element={<RoomPage />} />
            </Routes>
        </div>
    );
};

export default App;
