const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017'

const connectToDB = () => {
    mongoose.connect(url).then(() => {
        console.log("mongo is connected sucessfully");
    }).catch(err => console.log("some error occured to connect with mongo"));
}

module.exports = connectToDB;