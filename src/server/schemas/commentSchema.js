var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema(
{
	ownerId: Object,
    text: String,
    battleId: String
});

var Comment = mongoose.model('comments', CommentSchema);
module.exports = Comment;

