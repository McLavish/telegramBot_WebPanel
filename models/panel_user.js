const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const PanelUserSchema = new mongoose.Schema({
    email: {type: String,
    required: true,
    unique: true
    },
    password: String,
    first_name: String,
    last_name: String,
    display_name: String,
    profile_id: String,
    provider: String,
    creation_date: Number
})

PanelUserSchema.pre('save', async function (next) {
    //Il documento di Mongoose che sta per essere salvato
    const user = this;
    if (user.password){
        //SALT = difficoltà crittografia
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
})

PanelUserSchema.methods.checkPassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
}

module.exports = mongoose.model('PanelUser', PanelUserSchema)