const express = require("express");
const Posts = require("./postDb");

const router = express.Router();

router.get("/", (req, res, next) => {
  Posts.get()
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem retrieving the posts" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.json(req.post);
});

router.delete("/:id", validatePostId, (req, res, next) => {
  Posts.remove(req.post.id)
    .then((data) => res.status(204).send())
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem deleting the post" });
    });
});

router.put("/:id", validatePostId, (req, res, next) => {
  const { post } = req;
  const { text } = req.body;
  Posts.update(post.id, { ...post, text })
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem updating the post" });
    });
});

// custom middleware

async function validatePostId(req, res, next) {
  const { id } = req.params;
  const post = await Posts.getById(id);
  if (!post) return next({ code: 400, message: "invalid post id" });
  req.post = post;
  next();
}

module.exports = router;
