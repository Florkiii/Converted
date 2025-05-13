import { useState, useEffect } from 'react';
import './App.css'


function App() {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState(0);
  const [target, setTarget] = useState("RUB");
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    async function getFetchApi() {
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/USD${base}`);
        const data = await res.json();
        setRates(data.rates);
        console.log(data.rates[base])
      } catch (error) {
        console.error("Error", error)
      }
    }
    getFetchApi();
  }, [base]);


  const converted = Math.round(rates[target] / rates[base] * amount)

  return(
    <>
    <h1>Конвертер валют</h1>
    {/* выбираем валюту из которой хотим конвертировать */}
      <select value={base} onChange={(e) => 
      setBase(e.target.value)}> 
        {Object.keys(rates).map((code) => (
          <option key={code}>{code}</option>
        ))}
      </select>

      {/* выбираем количество валюты для перевода */}
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />

      {/* выбираем валюту в которую хотим конвертировать */}
      <select value={target} onChange={(e) => 
      setTarget(e.target.value)}> 
        {Object.keys(rates).map((code) => (
          <option key={code}>{code}</option>
        ))}
      </select>
      <p>{amount} {base} = {converted} {target}</p>
    </>
    )
  
}

export default App



