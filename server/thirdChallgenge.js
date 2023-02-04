
let s = "ab2{g}3{a2{fg}}"

function get_result(input) {
    let expression = /\d+/;
    let stack = [];
    let result = "";
    let repeat = 0;

    for(let i = 0; i < input.length; i++) {
        if(input[i].match(expression)) {

            repeat = Number(input[i])
        
        } else if(input[i] === '{' && input[i-1].match(expression)) {
            stack.push([result, repeat])
            result = "";

        } else if (input[i] === '}') {
           const [lastResult, lastRepeat] = stack.pop()
            result = lastResult + result.repeat(lastRepeat)
        } else {
            result += input[i]
        }
    }
    return result
    //Как я это вообще сделал?
}

console.log(`The result of ${s} is ${get_result(s)}`)