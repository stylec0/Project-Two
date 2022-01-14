const Keyboard = require('../models/keyboard'); 

module.exports = {
	create,
    delete: deleteComment,
    edit,
    // update,
};

function create(req, res){
    console.log("Controllers/comments, Create function")
	console.log(req.params.id, " req.params.id")
	console.log(req.body, " req.body aka the contents of the form")

	Keyboard.findById(req.params.id, function(err, keyboardDocument){
        req.body.userId = keyboardDocument.user;
		keyboardDocument.comments.push(req.body);
		console.log(keyboardDocument, " <- this is KeyboardDocument, in create comments CTRL")
		keyboardDocument.save(function(err){
            console.log(keyboardDocument.comments._id, "<--this is the comments id")
            res.redirect(`/keyboards/${keyboardDocument._id}/details`)
		})
    })
}

function deleteComment(req, res) {
  
    Keyboard.findOne(
      {'comments._id': req.params.id,'comments.userId': req.user._id},
      function(err, keyboard) {
          console.log(keyboard.comments.userId, req.user._id, "keyboard delete comment")
        if (!keyboard || err) return res.redirect(`/keyboards/${keyboard._id}`);  
        keyboard.comments.pull(req.params.id);
        keyboard.save(function(err) {
          res.redirect(`/keyboards/${keyboard._id}/details`);
        });
      }
    );
  }

function edit(req, res) {
    console.log("Controller/comments, edit function")
    res.render ('keyboards/comments',);
}

// function update(req, res) {
//     Keyboard.findOne({'comments._id': req.params.id}, function(err, keyboard) {
//         // Find the comment subdoc using the id method on Mongoose arrays
//         // https://mongoosejs.com/docs/subdocs.html
//         const commentSubdoc = keyboard.comments.id(req.params.id);
//         // Ensure that the comment was created by the logged in user
//         if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/keyboards/${keyboard._id}`);
//         // Update the text of the comment
//         commentSubdoc.text = req.body.text;
//         // Save the updated book
//         keyboard.save(function(err) {
//           // Redirect back to the book's show view
//           res.redirect(`/keyboards/${keyboard._id}`);
//         });
//       });
//     }