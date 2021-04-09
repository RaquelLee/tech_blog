const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/udpost/:id', async (req, res) => {
  try {
    const udPost = await Post.findOne({
      where: {
        id: req.params.id,
      }
    })

    if (!udPost) {
      res.status(404).json({
        message: 'No post found with this id!'
      });
      return;
    }

    const postDatas = udPost.get({
      plain: true
    });

    res.render('udpost',
      {
        postDatas,
        logged_in: req.session.logged_in
      });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(
      req.session.user_id,
      {
        attributes: {
          exclude: ['password']
        },
        include: [
          {
            model: Post
          }
        ]
      });

    const user = userData.get({
      plain: true
    });

    res.render('dashboard',
      {
        ...user,
        logged_in: true
      });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  const postData = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['name'],
      }
    ]
  }).catch((err) => {
    res.json(err);
  });

  const posts = postData.map(
    (post) => post.get({
      plain: true
    }
    ));

  res.render('homepage', {
    posts,
    logged_in: req.session.logged_in
  });
});

router.get('/dashboard', async (req, res) => {
  res.render('login')
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login', {
    title: "Login"
  });
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

router.get('/post', async (req, res) => {
  res.render('post', {
    logged_in: req.session.logged_in
  });
});

router.get('/signup', async (req, res) => {
  res.render('signup', {
    title: "Sign Up"
  })
});

router.get('/post/:id', async (req, res) => {
  try {
    const onePost = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment', 'date_created', 'user_id'],
        }
      ]
    });

    const allComments = await Comment.findAll({
      where: {
        post_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        }
      ]
    });

    if (!onePost) {
      res.status(404).json({
        message: 'No post found with this id!'
      });
      return;
    }

    const rendPost = onePost.get({
      plain: true
    });

    const rendComms = allComments.map(
      (comment) => comment.get({
        plain: true
      }));

    res.render('activePost', {
      rendPost,
      rendComms,
      logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post', async (req, res) => {
  let postData = await Post.findAll({});

  const posts = postData.map(
    (post) => post.get({
      plain: true
    }));

  res.render('post', {
    posts,
    logged_in: req.session.logged_in
  });
});

module.exports = router;