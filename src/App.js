import './App.css';
import React,{useState,useEffect} from 'react';
import AuthApi from './AuthApi';
import Cookies from 'js-cookie';
import{
  BrowserRouter as Router , 
  Switch, Link,Route, Redirect
} from 'react-router-dom';

function App() {
  const [auth,setAuth] = useState(false);
  const user = Cookies.get("user");
  useEffect(() => {
    if(user){
         setAuth(true);
    }else{
      setAuth(false)
    }
    
  }, [])
  return (
    <div className="App">
        <AuthApi.Provider value={{auth,setAuth}}>
        <Router>
           <Routes />
        </Router>
        </AuthApi.Provider>
      
    </div>
  );
}
const Login =() =>{
  const Auth = React.useContext(AuthApi);
  const LoginHandler = () =>{
    Auth.setAuth(true);
    Cookies.set("user","LoginTrue")
  }
  return(<div>
    <p>This is Login Page </p>
    <button onClick={LoginHandler}> Login</button>
    </div>
  )
}
const Dashboard =() =>{
  const Auth = React.useContext(AuthApi);
  const LogoutHandler = () =>{
    Auth.setAuth(false);
    Cookies.remove("user")
  }
  return(<div>
    <h1>This is a Dashboard.</h1>
    <button onClick={LogoutHandler} >Logout</button>
    </div>
  )
}
const MainFile = () =>{
  return (
    <div>This is Main File</div>
    )
}

// Routing 
const Routes = () =>{
  const Auth = React.useContext(AuthApi);

  return (
    <Switch>
      <ProtectedLogin path ="/login" auth={Auth.auth} component ={Login } />
      <ProtectedRoute path ="/dashboard"  auth={Auth.auth} component ={Dashboard} />
      <Route path ="/" component ={MainFile} />
    </Switch>
  )
}
const ProtectedRoute =({auth,component:Component,...rest}) =>{
  return(
    <Route 
    {...rest}
  render ={()=>auth ? <Component />:<Redirect to="/login"  />} />
  )
}
const ProtectedLogin =({auth,component:Component,...rest}) =>{
  return(
    <Route 
    {...rest}
  render ={()=>!auth ? <Component />:<Redirect to="/dashboard"  />} />
  )
}

export default App;

