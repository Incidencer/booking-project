import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import HotelsAdd from "./pages/HotelsAdd";
import { useAppContext } from "./context/AppContext";


const App = () => {
  const {isLoggedIn} = useAppContext()
  return (
    <Router>
      <Routes>
        <Route path='/' 
        element={
        <Layout>
          <h2>Home Page</h2>
        </Layout>}/>
        <Route path='/search' 
        element={
        <Layout>
          Search Page
          </Layout>}/>

          <Route path='/register' element={
            <Layout>
          <Register/>
          </Layout>
          }/>
          <Route path='/sign-in' element={
            <Layout>
          <SignIn/>
          </Layout>
          }/>

        {isLoggedIn && (<>
        <Route path="/add-hotel"
        element = {
          <Layout>
            <HotelsAdd/>
          </Layout>
        }
        />
        </>)}
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </Router>
  )
}

export default App