import {Routes,Route} from 'react-router-dom'
import React from 'react'
import Login from './pages/login'
import Faculty from './pages/faculty';
import Structure from './pages/structure';
import Uncertainty from './pages/uncertainty';
import Summary from './pages/summary';
import Layout from './layouts.jsx/layout';
import Register from './pages/register';
import Profile from './pages/profile';
import Location from './pages/location'
import Activity from './pages/activity'
import { UserDataProvider } from './components/MyContext';
import NotFound from './pages/notfound';
import ActivityPeriod from './pages/ActivityPeriod';
import Explainpage from './pages/explainpage';
import Report from './pages/report';
import User from './pages/user';
import Campus from './pages/campus';
import Scope from './pages/scope';
import HeadScope from './pages/headScope';
import CateScope from './pages/cateScope';
import './index.css'
import CFO from './pages/cfo';
import Info from './pages/info';
export default function App() {
  return (
    <UserDataProvider>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />} />
      <Route path="/campusManagement" element={<Campus />} />
      <Route path="/faculty/:id" element={<Faculty />} />
      <Route path="/structure/:fac_id/:years/:employee_amount/:building_area" element={<Structure />} />
      <Route path="/uncertainty/:fac_id/:years/:employee_amount/:building_area" element={<Uncertainty />} />
      <Route path="/summary/:fac_id/:years/:employee_amount/:building_area" element={<Summary />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/location/:fac_id/:years/:employee_amount/:building_area" element={<Location />} />
      <Route path='/activityperiod/:id' element={<ActivityPeriod/>}/>
      <Route path='/activityperiod/Info/:id' element={<Info/>}/>
      <Route path='/report/:fac_id/:years/:employee_amount/:building_area' element={<Report/>}/>
      <Route path='/CFO/:years' element={<CFO />}/>
      <Route path='/about' element={<Explainpage/>}/>
      <Route path='/Activity' element={<Activity/>}/>
      <Route path='/user' element={<User/>}/>
      <Route path='/scope' element={<Scope/>}/>
      <Route path='/scope/:id' element={<HeadScope />}/>
      <Route path='/scope/:id/:head_id' element={<CateScope/>}/>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </UserDataProvider>
   
  )
}