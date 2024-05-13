import './App.css'
import { AuthProvider } from './contexts/AuthContext.jsx';
import Router from './root/Router.jsx';

function App() {

  return (
    <>
    <AuthProvider>
      <Router/>
    </AuthProvider>
    </>
  )
}

export default App