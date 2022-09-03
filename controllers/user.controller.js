const fs = require('fs');

let users = JSON.parse(fs.readFileSync('users.json').toString());

let randomNumber = 0;

module.exports.getRandomUser = (req, res) => {
    function getRandomInt(max) {
        const number = Math.floor(Math.random() * Math.floor(max));
        if (randomNumber === number) {
            getRandomInt(users.length);
        } else {
            randomNumber = number;
            res.send(users[number]);
        }
    }
    getRandomInt(users.length);

};

module.exports.getAllUser = (req, res) => {
    const { limit } = req.query;
    res.send(users.slice(0, limit));
};

module.exports.saveAUser = (req, res) => {
    users.push(req.body);
    if (!req.body?.id || !req.body?.name || !req.body?.contact || !req.body?.address || !req.body?.photoUrl) {
        res.send('failed to save data');
    } else {
        res.send(users);
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) {
                res.send('failed to save data');
            }
        });
    }
};

module.exports.updateSingleUser = (req, res) => {
    const { id } = req.params;
    let newData = users.find(user => user.id === Number(id));

    if (newData === undefined) {
        res.send('User not found');
    } else {
        newData.id = req.body.id;
        newData.gender = req.body.gender;
        newData.name = req.body.name;
        newData.contact = req.body.contact;
        newData.address = req.body.address;
        newData.photoUrl = req.body.photoUrl;
        console.log(newData);
        res.send(users);
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) {
                res.send('Failed to update data');
            }
        });
    }
};
module.exports.bulkUpdate = (req, res) => {
    const data = req.body;
    let isDone = false;
    let userFound = [];
    let validatedData = [];
    data.map(singleData => {
        let newData = users.find(user => user.id === Number(singleData.id));
        if (newData === undefined) {
            isDone = false;
            userFound.push(false);
        } else {
            newData.id = singleData.id;
            newData.gender = singleData.gender;
            newData.name = singleData.name;
            newData.contact = singleData.contact;
            newData.address = singleData.address;
            newData.photoUrl = singleData.photoUrl;
            if (Object.keys(singleData).length > 6) {
                validatedData.push(false);
            } else {
                validatedData.push(true);
            }
            isDone = true;
            userFound.push(true);
        }
    });

    if (userFound?.includes(false) || !isDone) {
        res.send('User not found');
    }
    else if (validatedData.includes(false)) {
        res.send(`can't add new data`);
    }
    else {
        res.send(users);
    }
};

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    let isAvailable = users.find(user => user.id === Number(id));

    if (isAvailable === undefined) {
        res.send('User not found');
    } else {
        users = users.filter(user => user.id !== Number(id));
        res.send(users);
        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) {
                res.send('Failed to delete data');
            }
        });
    }
};