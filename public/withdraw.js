function Withdraw() {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <WithdrawMsg setShow={setShow} />
        )
      }
    />
  );
}

function WithdrawMsg(props){
  return(
    <>
      <h5>Success</h5>
      <button 
        type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}
      >
          Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');
  const { loggedUser, setLoggedUser } = React.useContext(UserContext);  

  function handle(){
    fetch(`/account/findOne/${email}`)
    .then((response) => response.text())
    .then(text => {
      const data = JSON.parse(text);
      return data.balance;
    })
    .then((balance) => {
      if (balance > amount) {
        setLoggedUser({ ...loggedUser, balance: balance - parseInt(amount) });
        localStorage.setItem(
          "TOKEN",
          JSON.stringify({
            ...loggedUser,
            balance: balance - parseInt(amount),
          })
        );
        return fetch(
          `/account/updateBalance/${email}/${
            balance - parseInt(amount)}`
        );
      } else {
        console.log("insufficient balance");
      }
    })
    .then((response) => response.text())
    .then((text) => {
      const data = JSON.parse(text);
      console.log("amount withdrawn successfully");
    })
    .catch(() => {
      console.log("Oops! Error");
    })

    props.setStatus('amount withdrawn');
    props.setShow(false);
  }


  return ( 
    <>
      Email
      <br />
      <input 
        type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}
      />
      <br />

    Amount
    <br />
    <input 
      type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} 
      onChange={e => setAmount(e.currentTarget.value)}
    />
    <br />

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Withdraw
      </button>
    </>
  );
}
