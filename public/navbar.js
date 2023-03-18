function NavBar() {
  const { loggedUser, setLoggedUser } = React.useContext(UserContext);

  return(

    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
            {!loggedUser && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#/CreateAccount/">
                    Create Account
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/login/">
                    Login
                  </a>
                </li>
              </>
            )}
        </ul>    
        <ul className="nav navbar-nav navbar-right">
            {loggedUser && (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#/deposit/">
                    Deposit
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/withdraw/">
                    Withdraw
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/balance/">
                    Balance
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#/alldata/">
                    Extra
                  </a>
                </li>
                <li className="nav-item nav-link text-dark">
                    Hello {loggedUser?.name} 👋,
                </li>
                <li className="nav-item nav-link text-dark">
                    Balance: ${loggedUser?.balance}
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="#/logout/">
                    Logout
                  </a>
                </li>
              </>
            )}
        </ul>
      </div>
    </nav>
  );
}




































// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// function AuthProvider(props) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {props.children}
//     </AuthContext.Provider>
//   );
// }

// function NavBar() {
//   const { isLoggedIn, logout } = useContext(AuthContext);
//   const { loggedUser, setLoggedUser } = React.useContext(UserContext);

//   return (
//       <nav className="navbar navbar-expand-lg navbar-light bg-light">
//         <a className="navbar-brand" href="#">BadBank</a>
//         <button 
//           className="navbar-toggler" 
//           type="button" 
//           data-toggle="collapse" 
//           data-target="#navbarNav" 
//           aria-controls="navbarNav" 
//           aria-expanded="false" 
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//             {isLoggedIn ? (
//               <nav>
//                 <ul>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#/withdraw/">
//                       Withdraw
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#/balance/">
//                       Balance
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#/alldata/">
//                       All Data
//                     </a>
//                   </li>
//                   <li className="nav-item nav-link text-dark">
//                       Hello {loggedUser?.name} 👋,
//                   </li>
//                   <li className="nav-item nav-link text-dark">
//                       Balance: ${loggedUser?.balance}
//                   </li>
//                   <li className="nav-item ">
//                     <a className="nav-link" href="#/logout/">
//                       Logout
//                     </a>
//                   </li>
//                 </ul>
//               </nav>
//             ) : (
//               <nav>
//                 <ul>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#/createaccount/">
//                       Create Account
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#/login/">
//                       Login
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a className="nav-link" href="#/alldata/">
//                       All Data
//                     </a>
//                   </li>
//                 </ul>
//               </nav>
//             )}
//         </div>
//       </nav>
//   );
// }