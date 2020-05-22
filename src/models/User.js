const mongoose = require('mongoose');
const validations = require('../lib/validations');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    cpf: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function (value) {
                return validations.validateCPF(value);
            },
            message = 'This CPF is not valid'
        ]
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [
            function (value) {
                return validations.validateEmail(value);
            },
            message = 'This E-mail is not valid'
        ]
    },

    phone: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function (value) {
                return validations.validatePhone(value);
            },
            message = 'This phone is not valid'
        ]
    },

    address: {
        street: {
            type: String,
            required: true
        },

        number: {
            type: Number,
            required: true
        },

        complement: {
            type: String,
            default: ''
        },

        neighborhood: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        state: {
            type: String,
            required: true,
            validate: [
                function (value) {
                    return validations.validateState(value);
                },
                message = 'This state is not valid'
            ]
        },

        country: {
            type: String,
            required: true
        },

        zipcode: {
            type: String,
            required: true,
            validate: [
                function (value) {
                    return validations.validateZipcode(value);
                },
                message = 'This zipcode is not valid'
            ]
        }
    },

    birthdate: {
        type: Date,
        required: true,
        validate: [
            function (value) {
                return validations.validateBirthdate(value);
            },
            message = 'This birthdate is not valid, you must be older than 18 years old and your birthdate needs to be in the format DD/MM/YYYY, for example 21/06/2001'
        ]
    },

    gender: {
        type: String,
        required: true,
        enum: ['M', 'F', 'N/A'],
        default: 'N/A'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);