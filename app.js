const form = document.querySelector('.fill_out_form')
const thankYouBlock = document.querySelector('.thank-you-block')
const cardholdersName = document.getElementById('cardholder_name')
const cardholdersNamePreview = document.querySelector('.card-front__card_label--cardholders_name')
const cardholdersNumber = document.getElementById('cardholder_number')
const cardholdersNumberPreview = document.querySelector('.card-front__card_label--cardholders_card-number')
const expDateMonth = document.getElementById('exp_date--mm')
const expDateYear = document.getElementById('exp_date--yy')
const expDatePreview = document.querySelector('.card-front__card_label--cardholders_exp-date')
const cvc = document.getElementById('exp_date--cvc')
const cvcPreview = document.querySelector('.cardLayers__cardLayers__svv')
const inputs = Array.from(form.getElementsByTagName('input'))
const formButton = document.querySelector('.fill_out_form__button')
const formWrapper = document.querySelector('.form-wrapper')    

form.addEventListener('submit', e => {
    
    e.preventDefault()    
    if (formButton.textContent === "CONTINUE"){
        hideThankYou()
    } else if (isAllInputsCorrect()){
        showThankYou()
    } 
})
function hideThankYou(){
    formWrapper.style.display = "block"
    thankYouBlock.style.display = "none"
    formButton.textContent = "Confirm"
}
function showThankYou(){    
    formWrapper.style.display = "none"
    thankYouBlock.style.display = "block"
    thankYouBlock.style.height = "225px"
    formButton.textContent = "CONTINUE"
}
function isAllInputsCorrect(){    
    inputs.forEach(input => {
        let errorMessage = input.parentElement.lastElementChild 
        // debugger              
        if (input.value === ""){            
            checkMessage("can't be blank", input, errorMessage)            
        } else if (input.id === "cardholder_number"){
            const message = checkIfNumberCorrect(input.value)
            checkMessage(message, input, errorMessage)
                       
        } else if (input.id === "exp_date--cvc"){        
            const message = cvcErrorMessage(input.value)
            checkMessage(message, input, errorMessage)
        } else if (input.id === "exp_date--mm") {        
            const message = checkIfExpDateMonthCorrect(input.value)
            checkMessage(message, input, errorMessage)           
        } else if (input.id === "exp_date--yy") {     
            if (errorMessage.style.display === "none"){
                const message = checkIfExpDateYearCorrect(input.value)
                checkMessage(message, input, errorMessage)         
            }
        }
        else {
            errorMessage.style.display = 'none'            
            input.style.borderColor = '#dfdfdf'
        }
    })
    return inputs.some(input => input.style.borderColor === 'red') !== true
}
function checkMessage(message, input, errorMessage){    
    if (message !== "correct") {                
        errorMessage.style.display = "block";
        errorMessage.textContent = message
        input.style.borderColor = 'red'
    } else {
        errorMessage.style.display = 'none'
        input.style.borderColor = '#dfdfdf'
    }   
}

function checkIfNumberCorrect(){    
    const len = cardholdersNumber.value.split(" ")   
    if (len.length !== 4) return "wrong format"    
    for (let i = 0; i < len.length; i++){         
        if (isNaN(parseInt(len[i])) || parseInt(len[i]) != len[i]) return "wrong format, numbers only!"
        if (len[i].length !== 4) return "must consist 16 number"
    }
    
    return "correct"
}

function cvcErrorMessage(value){     
    if (isNaN(value)) return "Wrong format, numbers only!"
    if (value.length !== 3)  return "must consist 3 numbers"
    return "correct"
}
function checkIfExpDateMonthCorrect(value){
    const expMonth = parseInt(value)   
    if (isNaN(expMonth)) return "Wrong format, numbers only!"
    if (expMonth > 12 || expMonth < 1) return "please enter month between 1 and 12"    
    return "correct"
}
function checkIfExpDateYearCorrect(value) {
    const expYear = parseInt(value)   
    const currentYear = new Date().getFullYear() % 100   
    if (isNaN(expYear)) return "Wrong format, numbers only!"
    if (expYear < currentYear) return `please enter year more than ${currentYear}`  
    return "correct"
}
cardholdersName.addEventListener('input', function(){        
    cardholdersNamePreview.textContent = cardholdersName.value.toUpperCase()
})
cardholdersNumber.addEventListener('input', function(){    
    cardholdersNumberPreview.textContent = cardholdersNumber.value
})
expDateMonth.addEventListener('input', function(){   
    expDatePreview.dataset.month =  expDateMonth.value
    const month = expDatePreview.dataset.month   
    expDatePreview.textContent = `${month}/${expDatePreview.dataset.year}`
})
expDateYear.addEventListener('input', function(){   
    expDatePreview.dataset.year =  expDateYear.value
    const year = expDatePreview.dataset.year   
    expDatePreview.textContent = `${expDatePreview.dataset.month}/${year}`
})
cvc.addEventListener('input', function(){   
    cvcPreview.textContent = cvc.value
})