const User = require('../models/User');

function convertToTimestamp (date) {
    date = date.split('/');

    let newDate = `${date[1]}/${date[0]}/${date[2]}`; // it needs to be MM-DD-YYYY
    
    const dateTimestamp = new Date(newDate).getTime();

    return dateTimestamp;
}

async function checkIfExistsByEmail (userEmail) {
    const user = await User.findOne({ email: userEmail });
    let exists;

    if (user) {
        return true;
    } else {
        return false;
    }
}

async function checkIfExistsById (userID) {
    const user = await User.findById(userID);

    if (user === null) {
        return false;
    } else {
        return true;
    }
}

async function checkIfExistsByCpf (userCPF) {
    const user = await User.findOne({ cpf: userCPF});

    if (user === null) {
        return false;
    } else {
        return true;
    }
}

module.exports = {
    async index (request, response) {
        try {
            const users = await User.find();
            return response.status(200).json(users);
        } catch (error) {
            return response.status(500).json({ error: `${error.message} - Could you please report this error to our support?` });
        }
    },

    async getUserById (request, response) {
        try {
            const { userID } = request.params;
            const exists = await checkIfExistsById(userID);

            if (!exists) {
                return response.status(404).json({ error: 'User not found' });
            }

            const foundUser = await User.findById(userID);
            return response.status(200).json(foundUser);
        } catch (error) {
            return response.status(400).json({ error: `This ID is not valid` });
        }
    },

    async getUserByCpf (request, response) {
        try {
            const { userCPF } = request.params;
            const exists = await checkIfExistsByCpf(userCPF);

            if (!exists) {
                return response.status(404).json({ error: 'User not found' });
            }

            const foundUser = await User.findOne({ cpf: userCPF });
            return response.status(200).json(foundUser);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },

    async create (request, response) {
        const { name, cpf, email, phone, address, birthdate, gender } = request.body;

        if (await checkIfExistsByEmail(email)) {
            return response.status(400).json({ error: 'User already exists' });
        }

        try {
            const newUser = await User.create({
                name,
                cpf,
                email,
                phone,
                address,
                birthdate: convertToTimestamp(birthdate),
                gender
            });

            return response.status(201).json(newUser);    
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },

    async patch (request, response) {
        try {
            const { userID } = request.params;
            const exists = await checkIfExistsById(userID);

            if (!exists) {
                return response.status(404).json({ error: 'User not found' });
            }

            const user = await User.findById(userID);

            // We're taking the saved date and converting it into a timestamp again
            const userDateFormatted = new Date(user.birthdate).getTime();

            let { name, cpf, email, phone, address = {}, birthdate, gender } = request.body;
            const userToUpdate = {
                name: name || user.name,
                cpf: cpf || user.cpf,
                email: email || user.email,
                phone: phone || user.phone,
                address: {
                    street: address.street || user.address.street,
                    number: address.number || user.address.number,
                    neighborhood: address.neighborhood || user.address.neighborhood,
                    city: address.city || user.address.city,
                    state: address.state || user.address.state,
                    country: address.country || user.address.country,
                    zipcode: address.zipcode || user.address.zipcode
                },
                birthdate: birthdate ? convertToTimestamp(birthdate) : userDateFormatted,
                gender: gender || user.gender
            }

            await User.updateOne(
                { _id: userID },
                userToUpdate,
                { runValidators: true }
            );

            const updatedUser = await User.findById(userID);

            return response.status(200).json(updatedUser);
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    },

    async delete (request, response) {
        try {
            const { userID } = request.params;
            const exists = await checkIfExistsById(userID);

            if (!exists) {
                return response.status(404).json({ error: 'User not found' });
            }

            await User.deleteOne({ _id: userID });

            return response.status(204).send();
        } catch (error) {
            return response.status(400).json({ error: error.message });
        }
    }
}