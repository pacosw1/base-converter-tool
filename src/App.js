import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { convert } from "./helper";

class App extends Component {
  constructor(props) {
    super(props);
    this.calc = this.calc.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateInitialBase = this.updateInitialBase.bind(this);
    this.updateFinalBase = this.updateFinalBase.bind(this);
    this.state = {
      options: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
      data: {
        result: "",
        right: {
          steps: []
        },
        left: {
          steps: []
        }
      },
      from: "2",
      to: "2",
      input: 0,
      result: ""
    };
  }

  //functions go here

  calc() {
    let { from, to, input } = this.state;
    let data = convert(input, from, to);

    let result = data.result;
    console.log(data);
    //for now there is only base 10 to 2 avaliable
    this.setState({
      result: result,
      data: data
    });
  }

  updateInitialBase(value) {
    let asInt = Number(value)
    let res = convert(this.state.input,asInt, this.state.to).result
    this.setState({
      from: asInt,
      result: res
    })
   
  }

  updateFinalBase(value) {
    let asInt = Number(value)
    let res = convert(this.state.input,this.state.from, asInt).result
    this.setState({
      to: asInt,
      result: res
    })
  }
  updateInput(value) {
    if (Number(value))
      value = Number(value)
    this.setState({
      result: convert( value,this.state.from, this.state.to).result,
      input: value
    });
    
  }
 

  render() {
    return (
      <Display
        result={this.state.result}
        calc={this.calc}
        updateInput={this.updateInput}
        updateInitialBase={this.updateInitialBase}
        updateFinalBase={this.updateFinalBase}
        data={this.state.data}
        options={this.state.options}
      />
    );
  }
}

const Explan = props => {
  let { data } = props;
  let left = data.left.steps;
  let right = data.right.steps;
  //result has twp objects
  //right and left
  /* 
    left: {
      result: 110011,
      steps [
        {
          number: 51
          remainder: 1
        }
      ]
    }
  */
  const leftSteps = left.map(step => {
    console.log("step: " + Object.keys(step));
    return (
      <React.Fragment>
        <tr>
          <td>{step.remainder}</td>
          <td>{step.number}</td>
        </tr>
      </React.Fragment>
    );
  });
  const rightSteps = right.map(step => {
    return (
      <React.Fragment>
        <tr>
          <td>{step.left}</td>
          <td>{step.right}</td>
        </tr>
      </React.Fragment>
    );
  });
  return (
    <div className="explanation">
      <div id="table">
        <table className="">
          <tr style={{ borderRight: ".2px solid" }}>
            <td>Remainder</td>
            <td>Number</td>
          </tr>
          <br />

          {leftSteps}
        </table>
      </div>
      <div>
        <table>
          <tr>
            <td>Left</td>
            <td>Right</td>
          </tr>
          <br />

          {rightSteps}
        </table>
      </div>
    </div>
  );
};



const Display = props => {
  let { result, calc, updateInput, updateFinalBase, updateInitialBase, data , options} = props;


  const list = options.map( option => {
    return (
      <option>{option}</option>
    )
  })
  

  return (
    <div className="container">
      <div id="header">
        <h3>Base Converter Tool</h3>
      </div>
      <main>
        <div className="input">
          <div className="input-item select">
            <span>From</span>
            <select onChange={(e) => updateInitialBase(e.target.value)}>
              {list}
            </select>
            <span>To</span>
            <select onChange={(e) => updateFinalBase(e.target.value)}>
              {list}
            </select>
          </div>
          <div id="result">
            <p placeholder="result">{result}</p>
          </div>

          <div className="input-item text">
            <input
              type="text"
              placeholder="enter value"
              onChange={e => updateInput(e.target.value)}
            />
          </div>
          <div className="input-item">
            <button onClick={() => calc()}>Convert</button>
          </div>
        </div>

        <div className="explan">

        </div>
      </main>
    </div>
  );
};

export default App;
/*<p>
            The whole number on the left side of the decimal point (.) is
            divided by 2 until it becomes 0. The remainder of each division
            becomes its binary representation. To get the binary value you have
            to reverse the remainders. If the number contains decimal points,
            the number for example 1.23. .23 will be multiplied by 2 until the
            result on the right side of the decimal point = 0 or it is done 10
            times. For example 0.5 * 2 = 1.0 The 1 is the first binary unit,
            then you multiply the .0 which is 0. The problem is complete
          </p> */
