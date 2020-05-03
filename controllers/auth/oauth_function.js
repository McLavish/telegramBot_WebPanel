const PanelUser = require("../../models/panel_user");

module.exports = async (request, accessToken, refreshToken, profile, done) => {
    let user = await PanelUser.findOne({profile_id: profile.id}).exec();

    if (!user){
        let newPanelUser = PanelUser({
            provider: profile.provider,
            //FACEBOOK A VOLTE NON HA LA MAIL :((
            email: profile.emails ? profile.emails[0].value : "default@email" ,
            profile_id: profile.id,
            first_name: profile.name.givenName ? profile.name.givenName: "",
            last_name: profile.name.familyName ? profile.name.familyName: "",
            display_name: profile.displayName ? profile.name.displayName: "",
            creation_date: Math.floor(Date.now() / 1000)
        });
        await newPanelUser.save();

        return done(null,newPanelUser);
    }
    else
        return done(null,user._doc)
}