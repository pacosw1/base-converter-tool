import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { tenToBinary } from "./helper";

class App extends Component {
  constructor(props) {
    super(props);
    this.convert = this.convert.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.state = {
      data: {
        result: "",
        right: {
          steps: []
        },
        left: {
          steps: []
        }
      },
      from: "10",
      to: "2",
      input: 0,
      result: ""
    };
  }

  //functions go here
  updateInput(value) {
    let asInt = Number(value);
    console.log(asInt);
    this.setState({
      input: asInt
    });
  }
  convert() {
    let { from, to, input } = this.state;
    let data = tenToBinary(input);

    let result = data.result;
    console.log(data);
    //for now there is only base 10 to 2 avaliable
    this.setState({
      result: result,
      data: data
    });
  }

  render() {
    return (
      <Display
        result={this.state.result}
        convert={this.convert}
        updateInput={this.updateInput}
        data={this.state.data}
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
        <table className="table">
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
  let { result, convert, updateInput, data } = props;
  return (
    <div className="container">
      <div id="header">
        <h3>Base Converter Tool</h3>
      </div>
      <main>
        <div className="input">
          <div className="input-item select">
            <span>From</span>
            <select>
              <option>10</option>
            </select>
            <span>To</span>
            <select>
              <option>2</option>
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
            <button onClick={() => convert()}>Convert</button>
          </div>
        </div>

        <div className="explan">
          <Explan data={data} />
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
