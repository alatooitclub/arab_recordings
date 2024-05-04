import './App.css'
import { AuthProvider } from './contexts/AuthContext.jsx';
import SuperAdmin from './pages/SuperAdmin/SuperAdmin.jsx';
import Router from './root/Router.jsx';

function App() {

  return (
    <>
    {/* <SuperAdmin/> */}
    <AuthProvider>
      <Router/>
    </AuthProvider>
    </>
  )
}

export default App