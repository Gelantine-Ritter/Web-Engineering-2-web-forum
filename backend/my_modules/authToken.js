const jwt = require('jsonwebtoken');
const {
    log
} = require('debug');

function auth(req, res, next) { //200
    const token = req.headers.authtoken; //201
    if (!token) return res.send('Kein Zugriff!(hat kein toke)'); //202
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); //203
        req.userExist = verified;
        next(); //205
    } catch (err) {
        res.send('Token konnte nicht validiert werden')

    }
};

function authAdmin(req, res, next) {
    let token = req.headers.authtoken;
    if (token) {
        let token2 = token.split('.')
        const credentials = Buffer.from(token2[1], 'base64').toString('ascii');
        credentials2 = credentials.split(',')[1].split(':')[1].replace('"', '')

        if (credentials2 == "true") {
            next()
        } else {
            res.send("Authentifizierung fehlgeschlagen: Adminrechte werden benötigt")
        }
    } else {
        res.send("kein token");
    }
}

module.exports = {
    auth,
    authAdmin
};






//MEINE KOMMENTARE
//200       middleware fct --> kann zu jeder route hinzugefügt werden dh zu jeder privaten route
//201       checkt ob ich das token habe wenn ich request sende
//202       wenn es kein token hat --> kein Zugriff
//203       token erfolgreich verifiziert --> return ist hier die user id (siehe payload jwt.io)
//204       exportiere mein modul um es zu benutzen 
//ACHTUNG gehe zu posts um auth zu nutzen und forum privat für einzelne nutzer zu machen
//205       next damit weitere middleware ausgeführt werden kann