import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [input, setInput] = useState("0");
  const [formula, setFormula] = useState("");
  const [isEvaluated, setIsEvaluated] = useState(false);

  const handleNumber = (num) => {
    if (isEvaluated) {
      setInput(num);
      setFormula(num);
      setIsEvaluated(false);
    } else {
      if (input === "0") {
        setInput(num);
        setFormula(num);
      } else {
        setInput(input + num);
        setFormula(formula + num);
      }
    }
  };

  // Handle operator input
  const handleOperator = (op) => {
    if (isEvaluated) {
      setFormula(input + op);
      setInput(op);
      setIsEvaluated(false);
    } else {
      const operators = /[+\-*]$/;
      const lastChar = formula.slice(-1);

      if (operators.test(lastChar)) {
        if (op === "-" && lastChar !== "-") {
          setFormula(formula + op);
        } else if (lastChar === "-") {
          setFormula(formula.slice(0, -2) + op);
        } else {
          setFormula(formula.slice(0, -1) + op);
        }
      } else {
        setFormula(formula + op);
      }
      setInput(op);
    }
  };

  const handleDecimal = () => {
    if (isEvaluated) {
      setInput("0.");
      setFormula("0.");
      setIsEvaluated(false);
    } else if (!input.includes(".")) {
      setInput(input + ".");
      setFormula(formula + ".");
    }
  };

  const handleEqual = () => {
    try {
      const result = eval(formula);
      setInput(result.toString());
      setFormula(result.toString());
      setIsEvaluated(true);
    } catch (e) {
      setInput("Error");
      setFormula("");
    }
  };

  const handleClear = () => {
    setInput("0");
    setFormula("");
    setIsEvaluated(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-2"> {/* Adjusted column width */}
        <div className="card">
          <div className="card-body text-center">
            <div id="display" className="mb-3 display-4">
              {input}
            </div>
            <div className="row">
              <button className="btn btn-danger col rounded-0 border border-dark" id="clear" onClick={handleClear}>
                AC
              </button>
              <button className="btn btn-warning col rounded-0 border border-dark" id="divide" onClick={() => handleOperator("/")}>
                ÷
              </button>
              <button className="btn btn-warning col rounded-0 border border-dark" id="multiply" onClick={() => handleOperator("*")}>
                ×
              </button>
            </div>
            <div className="row">
              <button className="btn btn-secondary col rounded-0 border border-dark" id="seven" onClick={() => handleNumber("7")}>
                7
              </button>
              <button className="btn btn-secondary col rounded-0 border border-dark" id="eight" onClick={() => handleNumber("8")}>
                8
              </button>
              <button className="btn btn-secondary col rounded-0 border border-dark" id="nine" onClick={() => handleNumber("9")}>
                9
              </button>
              <button className="btn btn-warning col rounded-0 border border-dark" id="subtract" onClick={() => handleOperator("-")}>
                −
              </button>
            </div>
            <div className="row">
              <button className="btn btn-secondary col rounded-0 border border-dark" id="four" onClick={() => handleNumber("4")}>
                4
              </button>
              <button className="btn btn-secondary col rounded-0 border border-dark" id="five" onClick={() => handleNumber("5")}>
                5
              </button>
              <button className="btn btn-secondary col rounded-0 border border-dark" id="six" onClick={() => handleNumber("6")}>
                6
              </button>
              <button className="btn btn-warning col rounded-0 border border-dark" id="add" onClick={() => handleOperator("+")}>
                +
              </button>
            </div>
            <div className="row">
              <button className="btn btn-secondary col rounded-0 border border-dark" id="one" onClick={() => handleNumber("1")}>
                1
              </button>
              <button className="btn btn-secondary col rounded-0 border border-dark" id="two" onClick={() => handleNumber("2")}>
                2
              </button>
              <button className="btn btn-secondary col rounded-0 border border-dark" id="three" onClick={() => handleNumber("3")}>
                3
              </button>
              <button className="btn btn-success col rounded-0 border border-dark" id="equals" onClick={handleEqual}>
                =
              </button>
            </div>
            <div className="row">
              <button className="btn btn-secondary col-6 rounded-0 border border-dark" id="zero" onClick={() => handleNumber("0")}>
                0
              </button>
              <button className="btn btn-secondary col rounded-0 border border-dark" id="decimal" onClick={handleDecimal}>
                .
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
