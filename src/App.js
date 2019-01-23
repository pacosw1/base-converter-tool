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
          <th>Remainder</th>
          <th>Number</th>
        </tr>
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
          <th>Left</th>
          <th>Right</th>
        </tr>
        <tr>
          <td>{step.left}</td>
          <td>{step.right}</td>
        </tr>
      </React.Fragment>
    );
  });
  return (
    <div className="explanation">
      <table className="table">{leftSteps}</table>
      <table>{rightSteps}</table>
    </div>
  );
};

const Display = props => {
  let { result, convert, updateInput, data } = props;
  return (
    <div className="container">
      <div id="header">
        <h3>Base Converter Tool</h3>
        <p>Convert between the most popular bases in computer science</p>
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

          <div className="input-item text">
            <input
              type="text"
              placeholder="enter value"
              onChange={e => updateInput(e.target.value)}
            />
            <button onClick={() => convert()}>Convert</button>
          </div>

          <div id="result">
            <h1>{result}</h1>
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
