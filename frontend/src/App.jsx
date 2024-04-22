import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
