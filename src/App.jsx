import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage, { loader as homeLoader } from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './pages/DashboardLayout';
import LoginLayout from './pages/LoginLayout';
import PasswordPage from './pages/PasswordPage';
import GradesPage, { loader as gradeLoader }  from './pages/GradesPage';
import FeesPage, { loader as feesLoader }  from './pages/FeesPage';
import PasswordLayout from './pages/PasswordLayout';
import Missing from './pages/Missing';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<LoginLayout />} >
        <Route exact index path='/npsParents/login' element={<LoginPage />} />
        <Route exact path='/npsParents/register' element={<RegisterPage />} />
      </Route>
      <Route element={<DashboardLayout />}>
        <Route exact index path='/npsParents' element={<HomePage />} loader={ homeLoader } errorElement={<Missing />} />
        <Route exact path='/npsParents/grades' element={<GradesPage />} loader={ gradeLoader } errorElement={<Missing />}  />
        <Route exact path='/npsParents/fees' element={<FeesPage />} loader={ feesLoader } errorElement={<Missing />}  />
      </Route>
      <Route element={<PasswordLayout />}>
        <Route exact path='/npsParents/password' element={<PasswordPage />}/>
      </Route>
      <Route path='*' element={<Navigate to="/npsParents" replace />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App