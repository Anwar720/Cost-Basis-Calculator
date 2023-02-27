const totalInvested = document.querySelector('#original-capital');
const totalShares   = document.querySelector('#original-shares');
const sharePrice  = document.querySelector('#share-price');
const toInvest  = document.querySelector('#new-cash');
const output = document.querySelector('.output h3')
const submit = document.querySelector('.calculate');
const reset = document.querySelector('.reset')


// list of input values to validate
let inputs = [totalInvested,sharePrice]
const validateInput =()=>{
    let isValid = true;
    inputs.forEach(input=>{
        if(input.value) input.style.border = ''
        else {// if empty then set red border 
            input.style.border = '1px solid red'
            isValid = false
        }
    })
    return isValid;
}
const toFloat = (element)=>{
    if(!element.value) return 0;
    return parseFloat(element.value)
}

const calculateTotalInvested = ()=>{
    if(!toFloat(totalShares) || !toFloat(sharePrice)) 
        return 0
    return toFloat(totalShares) * toFloat(sharePrice);
}

const calculateCostBasis = ()=>{
    let totalCash = toFloat(totalInvested) + toFloat(toInvest);
    let shares = toFloat(totalShares) + (toFloat(toInvest)/toFloat(sharePrice));
    let cost = (totalCash / shares).toFixed(2);

    return Number(cost)?cost:0;
}


submit.addEventListener("click",()=>{
    // check total invested and share priece to be valid
    // if(!validateInput()) return 
    if(!totalInvested.value && totalShares.value && sharePrice.value){
        console.log(totalInvested.value , totalShares.value,  sharePrice.value)
        totalInvested.value = calculateTotalInvested()
    }

    // if number of shares and amount to invest is empty then set to defalut
    if(!totalShares.value) totalShares.value = (totalInvested.value / sharePrice.value).toFixed(3)
    if(!toInvest.value) toInvest.value = 0;

    //calculate costbasis
    let cost = calculateCostBasis() ;
    //set output for costbasis
    output.innerText = `$${cost}`
})


//reset inputs 
reset.addEventListener("click",()=>{
    let inputs = [totalInvested,sharePrice,toInvest,totalShares]
    inputs.forEach(input=>{
        input.value = '';
    })
    output.innerText = ''
})


