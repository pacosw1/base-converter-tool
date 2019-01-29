//this file will contains all the formulas to convert bases

//convert any base to any other vase
//converts the decimal from base 10 to any other base

/*to ensure I only do things once. I will always
 convert the number to decimal. From decimal  we will 
 be able to convert to any base with the least code possible

so hex --> binary  || hex --> decimal --> binary
octave --> hexa    || octave --> decmial --> 

Note: 
 
 possible optimization using binary as the middle man instead of decimal
*/

//turns any fractional value (0.23) and convers it to base 10

const fractionToDecimal = (decimal, base) => {
  console.log("converting ." + decimal + " to base " + 10)
   let hex = {"A": 10, "B": 11, "C": 12, "D": 13, "E": 
   14, "F": 15}
  let result = 0;
  let curr = 0
  for (let i = 0; i < decimal.length;i++) {
    if (decimal[i] in hex) 
      curr = hex[decimal[i]]    
    else
     curr = parseInt(decimal[i])
    result += curr * Math.pow(base, (-1*(i+1)))
  }
  return result;
}

function right(decimal, base) {

  let hex = {10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'}
  decimal = parseFloat(decimal)
  if (decimal <= 0)
    return ""
  let conversion = ""
  let count = 0;

  //loop until right = 0 or 10 loops
  while (decimal > 0) {
  //max 10 loops
  if (count === 5) {
    console.log("infinite decimal pattern")
    break
  }
  //multiply decimal by 2
  decimal *= base;

  let right = (decimal % 1).toFixed(3) //right side to be multiplied by 2
  let left = Math.ceil(decimal - (right))   //left side of . to be added to result

  if (left > 9) {
    left = hex[left];
  }
  conversion += left   //right side to be multiplied by 2
  count+= 1;
  decimal = right     //decimal becomes right side of result
  }
  if (conversion === "")
    return ""
  return "." + conversion
}

//turn any base into base 10 (decimal)
const baseToDecimal = (num, base) => {
  num += "";
  let split = num.split(".")
  let decimal = split[1]
  num = split[0]
  let hex = {"A": 10, "B": 11, "C": 12, "D":13, "E":14, "F": 15}
  let numString = num+"";
  let numArr = [...numString]

  let result = 0;
  let curr = 0;

  for (let i = 0; i < numArr.length;i++) {
    if (hex[numArr[i]])
        curr = hex[numArr[i]]
    else 
      curr = parseInt(numArr[i])
    //console.log(curr + " + " + base  + " ^" + (numArr.length-1-i));
    result+= ( curr * Math.pow( base , (numArr.length-1) - i) )
  }
  if (decimal)
    return result + fractionToDecimal(decimal, base)
  else
    return result;
}

//convers base 10 to any other base
const decimalTo = (num, base) => {
  let hex = {}
  num += "";
  let split = num.split(".")
  let decimal = split[1]
  num = split[0]
  let isHex = false;
  if (base <= 16 && base >= 11) {
    isHex = true;
    hex = {10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'}
  }
  let result = ""
  let final = ""
  let curr = num
  while (num !== 0) {
    let x = (num % base)
    if (isHex) 
      if (x > 9)   
        x = hex[x]  
    console.log("num: " + num + "   rem: " + x)
    result += ( x)
    num /=base
    num = Math.floor(num)
}
  for (let i = result.length-1; i >= 0;i--) 
    final += result[i]
  if (decimal)
    return (final)  + right("."+decimal,base )
  else
    return (final)
}



//converts between any base 2 - 16
export const convert = (num, iBase, fBase) => {
  let result = {}
  //console.log("num: " + num)
  if (iBase === 10) { //if base 10
    if (fBase === 10)
      return num
    else { //if fBase not 10 convert to 10
        console.log("converting num to base "+fBase +" from base " +iBase )
        result.result = decimalTo(num, fBase)
        return result
    }  
  } 
  else if (iBase !== 10) //if inital base other
    num = baseToDecimal(num,iBase)
  //now num will be decimal
  if (fBase === 10) {
    result.result = num;
    return result
  }
  else {
    result.result = decimalTo(num, fBase)
    return result
  }  
}


