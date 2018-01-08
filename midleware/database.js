const mongoose = require('mongoose'); // mongoose keretrendszer, MongoDB-nek a használatát teszi könnyebbé, teljesebbé

module.exports = function () {
    const db = mongoose.connection;

    // feliratkozunk a MongoDB driver-ének az 'error' eseményére, hogy ki tudjuk írni,
    // ha valami problémára futott az adatbázis oldalon
    db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

   // feliratkozunk egyszer az 'open' eseményre, hogy kiírhassuk: 'minden oké'
    db.once('open', () => {
        console.log(`MongoDB connected`);
    });

    // kapcsolódunk a MongoDB-hez és konfigjának megadjuk hogy a natív Mongo drivert használja
    mongoose.connect("mongodb://localhost/auth_demo" );
};