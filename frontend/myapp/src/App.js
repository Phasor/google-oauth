import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import Test from './Test';

function App() {
    // const connect = async () => {
    //     try{
    //         window.location.href = "http://localhost:3001/auth/google"
    //     }catch(err){
    //         console.log(err);
    //     }
    // }

  return (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/test" element={<Test />} />
        </Routes>
    </Router>
  )
}

export default App;
