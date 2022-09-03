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
};

module.exports.updateSingleUser = (req, res) => {
    const { id } = req.params;
    const newData = users.find(tool => tool.id === Number(id));
    newData.id = id;
    newData.name = req.body.name;
    res.send(users);
};

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    users = users.filter(tool => tool.id !== Number(id));
    res.send(users);
    fs.writeFile('users.json', JSON.stringify(users), (err) => {
        if (err) {
            res.write('Data failed to write');
            res.end();
        } else {
            res.write('data written successfully');
            res.end();
        }
    });

};