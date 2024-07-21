
var express = require('express');

const router = express.Router();
const conrtollerComments = require("../Controller/CommentsController");


router.get('/Website',conrtollerComments.getWebsitePage);

router.post('/comment',conrtollerComments.postNewComment);

router.get('/comment',conrtollerComments.getComments);
router.delete('/comment',conrtollerComments.deleteComment);
module.exports = router;
