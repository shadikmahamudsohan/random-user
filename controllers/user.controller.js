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
    res.send(users);
    fs.appendFile('users.json', JSON.stringify(users), (err) => {
        if (err) {
            res.send('failed to save data');
        }
    });
};

module.exports.updateSingleUser = (req, res) => {
    const { id } = req.params;
    let newData = users.find(tool => tool.id === Number(id));

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

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(tool => tool.id !== Number(id));
    res.send(users);
    fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) {
            res.send('Failed to delete data');
        }
    });

};