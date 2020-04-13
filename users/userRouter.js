const express = require("express");
const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res, next) => {
  const { name } = req.body;
  Users.insert({ name })
    .then((user) => res.status(201).json(user))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem creating the user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res, next) => {
  const { text } = req.body;
  Posts.insert({ text, user_id: req.params.id })
    .then((post) => res.status(201).json(post))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem creating the post" });
    });
});

router.get("/", (req, res, next) => {
  Users.get()
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem retrieving the users" });
    });
});

router.get("/:id", validateUserId, (req, res, next) => {
  Users.getById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => {
      console.error(err);
      next({ code: 500, message: "There was a problem retrieving the user" });
    });
});

router.get("/:id/posts", validateUserId, (req, res, next) => {
  Users.getUserPosts(req.params.id)
    .then((posts) => res.json(posts))
    .catch((err) => {
      console.error(err);
      next({
        code: 500,
        message: "There was a problem retrieving the user's posts",
      });
    });
});

router.delete("/:id", validateUserId, (req, res, next) => {
  Users.remove(req.params.id)
    .then(() => res.status(204).send())
    .catch((err) => {
      console.error(err);
      next({
        code: 500,
        message: "There was a problem deleting the user",
      });
    });
});

router.put("/:id", validateUserId, validateUser, (req, res, next) => {
  const { user } = req;
  const { name } = req.body;
  Users.update(user.id, { ...user, name })
    .then(() => res.send())
    .catch((err) => {
      console.error(err);
      next({
        code: 500,
        message: "There was a problem updating the user",
      });
    });
});

//custom middleware

async function validateUserId(req, res, next) {
  const { id } = req.params;
  const user = await Users.getById(id);
  if (!user) return next({ code: 400, message: "invalid user id" });
  req.user = user;
  next();
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length)
    return next({ code: 400, message: "missing user data" });
  const { name } = req.body;
  if (!name) return next({ code: 400, message: "missing required name field" });
  next();
}

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length)
    return next({ code: 400, message: "missing post data" });
  const { text } = req.body;
  if (!text) return next({ code: 400, message: "missing required text field" });
  next();
}

module.exports = router;
