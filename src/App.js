import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { convert } from "./helper";
var FontAwesome = require("react-fontawesome");

class App extends Component {
  constructor(props) {
    super(props);
    this.calc = this.calc.bind(this);
    this.swap = this.swap.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateInitialBase = this.updateInitialBase.bind(this);
    this.updateFinalBase = this.updateFinalBase.bind(this);
    this.state = {
      options: [
        { name: "Decimal", id: 10 },
        { name: "Binary", id: 2 },
        { name: "HexaDec", id: 16 },
        { name: "base 3", id: 3 },
        { name: "Base 4", id: 4 },
        { name: "Base 5", id: 5 },
        { name: "Base 6", id: 6 },
        { name: "Base 7", id: 7 },
        { name: "Base 9", id: 9 },
        { name: "Base 11", id: 11 },
        { name: "Base 12", id: 12 },
        { name: "Base 13", id: 13 },
        { name: "Base 14", id: 14 },
        { name: "Base 15", id: 15 }
      ],
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
      result: "0"
    };
  }

  //functions go here

  swap() {
    let { to, from, input, options } = this.state;

    let fromSelector = document.getElementById("from");
    let toSelector = document.getElementById("to");
    let fromId = options.find(option => option.name === fromSelector.value);
    let toId = options.find(option => option.name === toSelector.value);
    let temp = 0;
    toSelector.value = fromId.name;
    fromSelector.value = toId.name;
    temp = toId.id;
    toId = fromId.id;
    fromId = temp;
    let res = convert(input, fromId, toId).result;
    console.log("to: " + toId);
    this.setState({
      to: toId,
      from: fromId,
      result: res
    });
  }
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
    console.log(value);
    let x = this.state.options.find(x => x.name === value);
    let id = x.id;
    console.log(id);
    let res = convert(this.state.input, id, this.state.to).result;
    this.setState({
      from: id
      //result: res
    });
  }

  updateFinalBase(value) {
    let x = this.state.options.find(x => x.name === value);
    let id = x.id;
    let res = convert(this.state.input, this.state.from, id).result;
    this.setState({
      to: id
      //result: res
    });
  }
  updateInput(value) {
    if (Number(value)) value = Number(value);
    this.setState({
      result: convert(value, this.state.from, this.state.to).result,
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
        from={this.state.from}
        to={this.state.to}
        swap={this.swap}
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
  let {
    result,
    calc,
    updateInput,
    updateFinalBase,
    updateInitialBase,
    data,
    options,
    swap,
    from,
    to
  } = props;

  const list = options.map(option => {
    return <option id={option.id}>{option.name}</option>;
  });

  return (
    <div className="container">
      <div id="header">
        <h3>Base Converter Tool</h3>
      </div>
      <main>
        <div className="input">
          <div id="title">
            <h5>Convert between any base instantly.</h5>
            <br />
            <p>
              You can also use numbers with decimals and letters for bases 11 -
              16.
            </p>
          </div>
          <div id="inputbar">
            <div className="input-item select">
              <select
                id="from"
                onChange={e => updateInitialBase(e.target.value)}
              >
                {list}
              </select>
              <FontAwesome className="fas fa-exchange" onClick={() => swap()} />
              <select id="to" onChange={e => updateFinalBase(e.target.value)}>
                {list}
              </select>
            </div>
          </div>
          <p style={{ textAlign: "left", color: "#cacaca" }}>Result</p>
          <div id="result">
            <p placeholder="result">
              {result}
              <sub>{to}</sub>
            </p>
          </div>

          <div className="input-item text">
            <input
              type="text"
              placeholder="enter value"
              onChange={e => updateInput(e.target.value)}
            />
          </div>
        </div>

        <div className="explan" />
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
