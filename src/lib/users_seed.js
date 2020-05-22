// We're going to insert some data
const mongoose = require('mongoose');
const User = require('../models/User');

function convertToTimestamp (date) {
    date = date.split('/');
    let newDate = `${date[1]}/${date[0]}/${date[2]}`; // it needs to be MM-DD-YYYY
    const dateTimestamp = new Date(newDate).getTime();

    return dateTimestamp;
}

// Connecting to the database
mongoose.connect(
    'mongodb://localhost/users-crud-api', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

const db = mongoose.connection;
db.on('error', (error) => console.log(`[seed] Error in connecting to the database: ${error}`));
db.once('open', () => console.log("[seed] Still connected to the database..."));

const data = [
    {
        name: "Ana Laura da Silva",
        cpf: "19018017060",
        email: "laura.silva@gmail.com",
        phone: "19920202020",
        address: {
            street: "Rua da Laura Silva",
            number: 120,
            neighborhood: "Vila da Silva",
            city: "Mogi Guaçu",
            state: "SP",
            country: "Brasil",
            zipcode: "14702210"
        },
        birthdate: convertToTimestamp('15/08/2001'),
        gender: 'F'
    },
    {
        name: "Bruno Souza",
        cpf: "20589810170",
        email: "bruno.souza@hotmail.com",
        phone: "3530303030",
        address: {
            street: "Rua do Bruno Souza",
            number: 150,
            neighborhood: "Vila Souza",
            city: "Uberlândia",
            state: "MG",
            country: "Brasil",
            zipcode: "40305320"
        },
        birthdate: convertToTimestamp('10/08/1991'),
        gender: 'M'
    },
    {
        name: "João Bosco Aparecido",
        cpf: "90923200730",
        email: "joao_bosco@gmail.com",
        phone: "11955558888",
        address: {
            street: "Rua do João Bosco",
            number: 120,
            neighborhood: "Vila Bosco",
            city: "São Bernardo do Campo",
            state: "SP",
            country: "Brasil",
            zipcode: "30400660"
        },
        birthdate: convertToTimestamp('24/05/1999'),
        gender: 'M'
    }
];

data.forEach(object => {
    User.create(object);
});

console.log('[seed] Done! Database has been seeded successfully');
console.log('[seed] You can stop this script pressing CTRL+C');