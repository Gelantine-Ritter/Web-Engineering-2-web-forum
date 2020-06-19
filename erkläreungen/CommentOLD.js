const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({ //50
    text: String,
    date: {
        type: Date,
        default: Date.now
    },
    //  time: String
});

module.exports = mongoose.model('Comment', CommentSchema); //52


//50  monggose dbverbindung mongoose hat modul "model" zum model ertsellen: erlaubt in mongodb neues obj zu erstellen
//      mongoose schnittstelle code <> db
//  51 obj erstellt, ttile wird obj übergeben vom typ string --> wenn model erstell wird also user einen post erstellen will muss title drinn sein sonst verweigert
//52 export: paras: name wenn ich außerhalb des Models Post dieses Model aufrufen will