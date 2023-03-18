function Logout() {
    const {loggedUser, setLoggedUser}     = React.useContext(UserContext);

    React.useEffect(() => {
        localStorage.removeItem("TOKEN");
        setLoggedUser(null);
    }, []);

    return (
        <div>
            {!loggedUser && <p>You are logged out successfully</p>}
            <div>
                <a className="" href="#/login/">
                    Login again
                </a>
            </div>
        </div>
    );
}
