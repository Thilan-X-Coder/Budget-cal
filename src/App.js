
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
  const [expenses, setexpenses] = useState(initialExpenses)
  console.log(expenses);
  return (
    <>
      <Alert />
      <h1>Buget Calculator</h1>
      <main className='app'>

        <ExpenseForm />
        <ExpenseList expenses={expenses} />

      </main>

      <h1>Total spending: <span className='total'>$ {expenses.reduce((acc, curr) => {
        return (acc += curr.amount)
      }, 0)}</span></h1>

    </>
  );
}

export default App;
