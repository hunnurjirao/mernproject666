const mongoose = require('mongoose');

const db = process.env.DATABASE

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(() => {
    console.log("Database Connection Successful...!!!");
}).catch((err) => {
    console.log("Database Connection Failed");
    console.log(err);
})
