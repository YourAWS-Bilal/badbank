function Spa() {
  // the value that will be given to the context
  const [loggedUser, setLoggedUser] = React.useState(
    JSON.parse(localStorage.getItem("TOKEN"))
  );

  // fetch a user
  React.useEffect(() => {
    const fetchUser = () => {
      // this would usually be the backend, or localStorage
      if (localStorage.getItem("TOKEN")) {
        fetch(
          `/account/findOne/${JSON.parse(localStorage.getItem("TOKEN")).email
          }`
        )
          .then((response) => response.text())
          .then((text) => {
            const data = JSON.parse(text);
            return data.balance;
          })
          .then((balance) => {
            setLoggedUser({
              ...loggedUser,
              balance: balance,
            });
            localStorage.setItem(
              "TOKEN",
              JSON.stringify({
                ...loggedUser,
                balance: balance,
              })
            );
          });
      }
    };

    fetchUser();
  }, []);


  return (
    <HashRouter>
      <div>     
        <UserContext.Provider value={{ loggedUser, setLoggedUser }} >
          <NavBar /> 
          <div className="container" style={{ padding: "20px" }}>
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/logout/" component={Logout} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/alldata/" component={AllData} />
          </div>
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa />,
  document.getElementById('root'));
