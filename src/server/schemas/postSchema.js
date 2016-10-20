var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema(
{
    autore: Object,
    tipo: String, //cerco e/o offro lavoro
    titolo: String,
    skills: String,
    tipoLavoro: String, //occasionale, ripetuto, standard
    candidatoSingolo: Boolean,
    city: String,
    address: String,
    mapCoordinates: Object,
    data: String, // TODO
    orario: String, // TODO
    orarioFlessibile: Boolean,
    dataFine: String, // TODO
    orarioFine: String, // TODO
    descrizione: String,
    attrezziInLoco: Boolean,
    daPortare: String, // serve questa cosa e la devi portare tu
    maltempo: Boolean, // true: lavori anche se piove, false: no
    slug: String,
    candidati: Array,
    candidatoScelto: Object
    
});

var Post = mongoose.model('posts', PostSchema);
module.exports = Post;

