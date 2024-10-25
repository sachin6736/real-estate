import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import UpdateListing from './pages/UpdateListing';
import Search from './pages/Search';


export default function App(){
   return <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/Sign-In' element={<SignIn/>}/>
    <Route path='/Sign-Up' element={<SignUp/>}/>
    <Route path='/listing/:listingId' element={<Listing />} />
    <Route path='/search' element={<Search />} />
    <Route element={<PrivateRoute/>}>
    <Route path='/Profile' element={<Profile/>}/>
    <Route path='/create-listing' element={<CreateListing/>}/>
    <Route  path='/update-listing/:listingId' element={<UpdateListing />}/> 
    </Route>
   </Routes>
   </BrowserRouter>
}