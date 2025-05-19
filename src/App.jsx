import { useRef } from 'react'
import './styles/App.css'

function App() {
  const display = useRef(null);
  let actualNumber = "";
  let actualOperator = "";
  const opRegexNoDecimal = /[+\-*/]/;


  const clearAll = () => {
    display.current.innerHTML = 0;
    actualNumber = ""
    actualOperator = ""
  }

  const handlingFirstZero = (num) => {
    const operatorsRegex = /[+\-*/.]/;
    if(display.current.innerHTML === "0" && operatorsRegex.test(num)){
      display.current.innerHTML = "0" + num;
    }
    else if(display.current.innerHTML === "0"){
      display.current.innerHTML = num;
    } 
    opRegexNoDecimal.test(num) ? actualOperator += num : actualNumber += num
  }

  const handlingDecimal = (num) => {
    const decimalRegex = /^(.*?\..*?\..*?)$/;
    
    actualNumber += num;
    if(num === "." && decimalRegex.test(actualNumber)){
      return actualNumber.slice(0, -1);
    }
    display.current.innerHTML += num;
  }

  const handlingOperators = (num) => {
    const acceptedOperators = /^[+/*]-$|^[+\-/*]$/;
     let lastOperator = actualOperator.slice(0, -1);
    if(actualOperator.length == 1 && num === lastOperator){
      actualOperator = actualOperator.slice(0, -1)
      display.current.innerHTML = display.current.innerHTML.slice(0, -1)
    }
    if(actualOperator.length > 1){
      actualOperator = actualOperator.slice(0, -2)
      display.current.innerHTML = display.current.innerHTML.slice(0, -2)
    }

      actualOperator += num

    if(!acceptedOperators.test(actualOperator)){
        actualOperator = actualOperator.slice(0, -1)
        display.current.innerHTML = display.current.innerHTML.slice(0, -1) + num
    }
    else {
      display.current.innerHTML += num
    }
  }
  
  const inputNumbers = (num) => {

    if(display.current.innerHTML === "0"){
      handlingFirstZero(num)
    }
    else if(opRegexNoDecimal.test(num)){
      handlingOperators(num)
      actualNumber = ""
    } 
    else{
      handlingDecimal(num)
      actualOperator = ""
    }

  }

  const erase = () => {
    if(display.current.innerHTML.length === 1){
      display.current.innerHTML = 0
    } else {
      display.current.innerHTML = display.current.innerHTML.slice(0, -1);
      if(actualNumber){
      actualNumber = actualNumber.slice(0, -1);
      }
      if(actualOperator){
        actualOperator = actualOperator.slice(0, -1);
        }
      
    }
  }

  const calculate = () => {
    try{
      let evalDisplay = eval(display.current.innerHTML);
      display.current.innerHTML = evalDisplay;
      actualNumber = "";
      actualOperator = "";
    }
    catch (error){
      display.current.innerHTML = "error";
    }
    
  }

  return (
    <main className="container" id="main">
      <div id="calculator">

        <div id="display-box">
          <p id="display"  ref={display}>0</p>
        </div>

          <div className="column col-12" id="erasers">
            <button className="col-6 btn btn-danger" id="clear" onClick={clearAll}>AC</button>
            <button className="col-6 btn btn-secondary" id="erase" onClick={erase}><i className="bi bi-backspace"></i></button>
          </div>

        <div className="d-flex" id="numbers-and-operators">

          <div className="column col-9" id="numbers">
            <button className="col-4 btn btn-light"  id="one" onClick={()=>inputNumbers("1")}>1</button>
            <button className="col-4 btn btn-light"  id="two" onClick={()=>inputNumbers("2")}>2</button>
            <button className="col-4 btn btn-light"  id="three" onClick={()=>inputNumbers("3")}>3</button>
            <button className="col-4 btn btn-light"  id="four" onClick={()=>inputNumbers("4")}>4</button>
            <button className="col-4 btn btn-light"  id="five" onClick={()=>inputNumbers("5")}>5</button>
            <button className="col-4 btn btn-light"  id="six" onClick={()=>inputNumbers("6")}>6</button>
            <button className="col-4 btn btn-light"  id="seven" onClick={()=>inputNumbers("7")}>7</button>
            <button className="col-4 btn btn-light"  id="eight" onClick={()=>inputNumbers("8")}>8</button>
            <button className="col-4 btn btn-light"  id="nine" onClick={()=>inputNumbers("9")}>9</button>
            <button className="col-8 btn btn-light"  id="zero" onClick={()=>inputNumbers("0")}>0</button>
            <button className="col-4 btn btn-light"  id="decimal" onClick={()=>inputNumbers(".")}>.</button>
          </div>

          <div  className="column col-3" id="operators">
            <button className="col-12 btn btn-dark" id="add" onClick={()=>inputNumbers("+")}>+</button>
            <button className="col-12 btn btn-dark" id="subtract" onClick={()=>inputNumbers("-")}>-</button>
            <button className="col-12 btn btn-dark" id="multiply" onClick={()=>inputNumbers("*")}>*</button>
            <button className="col-12 btn btn-dark"id="divide" onClick={()=>inputNumbers("/")}>/</button>
          </div>

        </div>

        <div className="col-12" id="equal-btn">
          <button className="btn btn-info w-100" id="equals" onClick={calculate}>=</button>
        </div>

      </div>
    </main>
  )
}

export default App
