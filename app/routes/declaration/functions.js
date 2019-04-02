function declarationGet(req, res) {
  res.render('pages/declaration');
}

function declarationPost(req, res) {
  res.redirect('process-claim');
}

module.exports.declarationGet = declarationGet;
module.exports.declarationPost = declarationPost;
