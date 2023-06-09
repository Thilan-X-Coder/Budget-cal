
import { useState } from 'react';
import './App.css';
import Alert from './component/Alert';
import ExpenseForm from './component/ExpenseForm';
import ExpenseList from './component/ExpenseList';
//import uuid from 'react-uuid';
import { v4 as uuidv4 } from 'uuid';


const initialExpenses = [
  { id: uuidv4(), charge: 'rent', amount: 1600 },
  { id: uuidv4(), charge: 'car payment', amount: 400 },
  { id: uuidv4(), charge: 'credit card bill', amount: 1200 },

];



function App() {
  //***********state values */
  //all expenses, add expense
  const [expenses, setExpenses] = useState(initialExpenses)
  // single expenses
  const [charge, setCharge] = useState('');

  // single expenses
  const [amount, setAmount] = useState('');

  //Alert
  const [alert, setAlert] = useState({ show: false })

  //****************fuctionality ***********/
  //handle charge
  const handleCharge = e => {
    console.log(`charge : ${e.target.value}`);
    setCharge(e.target.value)
  }
  //handle amount
  const handleAmount = e => {
    console.log(`amount : ${e.target.value}`);
    setAmount(e.target.value)
  }

  //handle alert

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => { setAlert({ show: false }) }, 3000)
  }


  //handle submit

  const handleSubmit = e => {
    e.preventDefault();
    console.log(charge, amount);
    if (charge !== "" && amount > 0) {

      const singleExpense = { id: uuidv4(), charge, amount };
      //add expense to the list
      setExpenses([...expenses, singleExpense]);
      handleAlert({ type: "success", text: 'Item added' })
      setCharge('');
      setAmount('');

    } else {
      //handle alert
      handleAlert({
        type: "danger",
        text: `charge can't empty value and amount value has to be bigger than zero`
      })
    }

  }




  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className='app'>

        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit} />
        <ExpenseList expenses={expenses} />

      </main>

      <h1>Total spending: <span className='total'>
        $
        {expenses.reduce((acc, curr) => {
          return (acc += parseInt(curr.amount));
        }, 0)}</span></h1>

    </>
  );
}

export default App;
