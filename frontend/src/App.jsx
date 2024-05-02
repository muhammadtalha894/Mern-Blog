import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import { Home } from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

import { Header } from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/privateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import CheckUser from './components/CheckUser';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route element={<CheckUser />}>
            <Route path='/sign-in' element={<SignIn />}></Route>
            <Route path='/sign-up' element={<SignUp />}></Route>
          </Route>

          <Route path='/post/:postSlug' element={<PostPage />}></Route>
          <Route path='/search' element={<Search />}></Route>

          <Route element={<PrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/create-post' element={<CreatePost />} />
            <Route path='/update-post/:id' element={<UpdatePost />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
