const mongoose = require('mongoose');


module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    mongoose.set('strictQuery', true);

    mongoose
        .connect(process.env.LOCAL_DB)
        .then(() => {
            console.log('You have successfully connected to the database');
        })
        .catch((error) => {
            console.log(`An error occurred: ${error}\nCould not connect to database`);
        });
};
