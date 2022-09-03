let users = [
    { id: 1, name: "user1" },
    { id: 2, name: "user2" },
    { id: 3, name: "user3" },
    { id: 4, name: "user4" },
];

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
    res.json(users.slice(0, limit));
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
};