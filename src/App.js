import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Login from './pages/login'
import Faculty from './pages/faculty';
import Layout from './layouts.jsx/layout';
import Register from './pages/register';
import Profile from './pages/profile';
import Activity from './pages/activity'
import { UserDataProvider } from './components/MyContext';
import NotFound from './pages/notfound';
import ActivityPeriod from './pages/ActivityPeriod';
import Explainpage from './pages/explainpage';
import User from './pages/user';
import Campus from './pages/campus';
import Scope from './pages/scope';
import HeadScope from './pages/headScope';
import CateScope from './pages/cateScope';
import './index.css'
import CFO from './pages/cfo';
import Info from './pages/info';
import KeyAPI from './pages/keyApi';
import CateFile from './pages/CateFile';
import ImportFile from './pages/ImportFile';
import Dashboard from './pages/dashboard';
export default function App() {
  return (
    <UserDataProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/campusManagement" element={<Campus />} />
      <Route path="/faculty/:id" element={<Faculty />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='/activityperiod/:id' element={<ActivityPeriod/>}/>
      <Route path='/activityperiod/Info/:id/:years' element={<Info/>}/>
      <Route path='/CFO/:years' element={<CFO />}/>
      <Route path='/about' element={<Explainpage/>}/>
      <Route path='/Activity' element={<Activity/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/scope' element={<Scope/>}/>
      <Route path='/scope/:id' element={<HeadScope />}/>
      <Route path='/scope/:id/:head_id' element={<CateScope/>}/>
      <Route path='/setting-googleMap-keyapi' element={<KeyAPI/>}/>
      <Route path="*" element={<NotFound />} />
      <Route path="/category-uploadfile" element={<CateFile />} />
      <Route path="/import-file" element={<ImportFile />} />
    </Routes>
  </UserDataProvider>
   
  )
}