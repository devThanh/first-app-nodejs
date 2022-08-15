const mongoose = require('mongoose'); 

async function connect(){

    try {
        await mongoose.connect('mongodb://localhost:27017/demo-education');
        console.log('CONNECT SUCCESSFULLY!!!');
    } catch (error) {
        console.log('CONNECT FAILURE!!!');

    }
}

module.exports = {connect};