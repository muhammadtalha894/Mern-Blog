import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import { Header } from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/privateRoute';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
