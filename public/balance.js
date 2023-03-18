function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm setShow={setShow} setStatus={setStatus} />
        ) : (
        <BalanceMsg setShow={setShow} />
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return(
    <>
      <h5>Success</h5>
      <button 
        type="submit" 
        className="btn btn-light" 
        onClick={() => props.setShow(true)}
        >
          Check balance again
      </button>
    </>
  );
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  
  const ctx = React.useContext(UserContext);  

  function handle() {
    fetch(`/account/finOne/${email}`)
    .then((response) => response.text())
    .then((text) => {
      const data = JSON.parse(text);
      return data.balance;
    })
    .then(balance => {
      props.setStatus('Your balance is: ' + balance);
    });

    props.setShow(false);
  }

  return (
    <>

    Email
    <br/>
    <input 
      type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={(e) => setEmail(e.currentTarget.value)}
    />
    <br />

    <button 
      type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>
  </>
  );
}