// We're going to create all the functions that we need to 
// validate some fields when creating or updating an user
const validator = require('validator');

module.exports = {

    validateCPF (cpf) {
        if(!validator.isNumeric(cpf)) return false;
        if(cpf.length !== 11) return false;

        return true;
    },

    validateEmail (email) {
        return validator.isEmail(email);
    },  

    validatePhone (phone) {
        if(!validator.isNumeric(phone)) return false;
        if(phone.length < 10 || phone.length > 11) return false;

        return true;
    },

    validateState (state) {
        const states = ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
        
        let valid = false;

        states.forEach(validState => {
            if (state === validState) {
                valid = true;
            }
        });

        return valid;
    },

    validateZipcode (zipcode) {
        if (!validator.isNumeric(zipcode)) return false;
        if (zipcode.length !== 8) return false;

        return true;
    },

    validateBirthdate (date) {
        const currentDate = new Date();
        const birthdate = new Date(date);

        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const currentDay = currentDate.getDate();

        const birthYear = birthdate.getFullYear();
        const birthMonth = birthdate.getMonth() + 1;
        const birthDay = birthdate.getDate();

        let userAge = currentYear - birthYear;

        if (currentMonth < birthMonth || (currentMonth == birthMonth && currentDay < birthDay)) {
            userAge--;
        }

        return userAge >= 18;
    }
}

function convertToDate (timestamp) {
    const date = new Date(timestamp);

    let dateFormatted = date.toLocaleDateString('pt-BR');
    dateFormatted = dateFormatted.split('-');
    console.log(dateFormatted);

    const day = dateFormatted[2];
    const month = dateFormatted[1];
    const year = dateFormatted[0];

    return `${day}/${month}/${year}`;
}

function convertToTimestamp (date) {
    date = date.split('/');
    console.log(date);

    let newDate = `${date[1]}/${date[0]}/${date[2]}`; // it needs to be MM-DD-YYYY
    const correctDate = new Date(newDate);
    console.log(correctDate);

    console.log(correctDate.getTime());
    return correctDate.getTime();
}