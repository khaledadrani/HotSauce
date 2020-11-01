const validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateLoginInput(data){
    let errors={};

    
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    

    if(!validator.isEmail(data.email)){
        errors.email='Email is not valid'
    }
    
    if(validator.isEmpty(data.email)){
        errors.email='Email field is required'
    }


    if(validator.isEmpty(data.password)){
        errors.password='Password is required'
    }

    
    

    //console.log("is working?")

    result = {
        errors: errors,
        isValid: isEmpty(errors)
    }

    //console.log("is valid ",result.isValid)

    return result;
        
    
}