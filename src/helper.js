//this file will contains all the formulas to convert bases

//base 10 --> base 2
export const tenToBinary = number => {
  let right = number % 1;
  let left = number - right;
  let r = decimals(right);
  //console.log("right: "+this.right(right))

  let result = {
    result: whole(left).result + decimals(right).result,
    right: decimals(right),
    left: whole(left)
  };

  return result;
};
const whole = num => {
  let steps = [];
  let result = "";
  let final = "";
  let curr = num;
  while (num !== 0) {
    result += num % 2;
    let step = {
      remainder: num % 2,
      number: num
    };
    steps.push(step);
    num /= 2;
    num = Math.floor(num);
  }
  for (let i = result.length - 1; i >= 0; i--) {
    final += result[i];
  }
  let resObj = {
    result: final,
    steps: steps
  };
  return resObj;
};
// console.log(getDecimals(0.5))

const decimals = decimal => {
  if (decimal <= 0)
    return {
      result: "",
      steps: []
    };
  //make a variable to save the binary conversion
  let steps = [];
  let final = "";
  let count = 0;

  //loop until right = 0 or 10 loops
  while (decimal > 0) {
    //max 10 loops
    if (count === 10) {
      console.log("infinite decimal pattern (stopped at 10 places)");
      break;
    }

    //multiply decimal by 2
    decimal *= 2;

    //right side to be multiplied by 2
    let right = (decimal % 1).toFixed(3);
    //left side of . to be added to result
    let left = Math.ceil(decimal - right);
    let step = {
      left: left,
      right: right
    };
    steps.push(step);
    //right side to be multiplied by 2
    final += left;
    count += 1;
    //decimal becomes right side of result
    //console.log("right: "+ right + " left: " + left)
    decimal = right;
  }

  let resObj = {
    result: "." + final,
    steps: steps
  };
  console.log("object: " + resObj.result);
  return resObj;
};

const x = m => {
  alert("hello");
};
