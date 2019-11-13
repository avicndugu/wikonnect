const Router = require('koa-router');
const Module = require('../models/module');
const validatePostData = require('../middleware/validation/validatePostData');
const queryStringSearch = require('../middleware/queryStringSearch');


const router = new Router({
  prefix: '/modules'
});


router.get('/:id', queryStringSearch, async ctx => {
  const module = await Module.query().where(ctx.query.key, ctx.query.value).eager('lessons');

  ctx.assert(module, 404, 'no lesson by that ID');

  ctx.assert(module, 404, 'no module by that ID');

  if (module.lessons) {
    module.lessons.forEach(lesson => {
      lesson.type = 'lesson';
    });
  }

  ctx.status = 200;
  ctx.body = { module };
});

router.get('/', async ctx => {
  const modules = await Module.query();
  ctx.status = 200;
  ctx.body = { modules };
});
router.post('/', validatePostData, async ctx => {
  let newModule = ctx.request.body;

  const modules = await Module.query().insertAndFetch(newModule);

  ctx.assert(module, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { modules };

});
router.put('/:id', async ctx => {
  const modules = await Module.query().patchAndFetchById(ctx.params.id, ctx.request.body);

  if (!modules) {
    ctx.throw(400, 'That learning path does not exist');
  }

  ctx.status = 201;
  ctx.body = { modules };
});
router.delete('/:id', async ctx => {
  const modules = await Module.query().findById(ctx.params.id);
  await Module.query().delete().where({ id: ctx.params.id });

  ctx.throw(modules, 401, 'No ID was provided');
  ctx.status = 200;
  ctx.body = { modules };
});

module.exports = router.routes();
