const Router = require('koa-router');
const authUtils = require('../lib/auth/jwt');
const { RuleTester } = require('eslint');
const router = new Router();



router.get('/:name', authUtils.isAdmin, async (ctx) => {
  try {
    const usersAll = await ctx.orm.User.findOne({ where: { username: ctx.params.name } });
    if (usersAll) {
      ctx.body = usersAll;
      ctx.status = 201;
    } else {
      ctx.status = 400;
    }
  } catch (error) {
    ctx.body = error;
    ctx.status = 400;
  }
});

router.delete('/:name', authUtils.isAdmin, async (ctx) => {
  try {
    const userDeleted = await ctx.orm.User.destroy({ where: { username: ctx.params.name } });
    if (userDeleted) {
      ctx.status = 200;
      ctx.body = { message: 'User eliminado exitosamente' };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'El User no fue encontrado' };
  }
  } catch (error) {
    ctx.status = 400;
    ctx.body = error;
  }}
)

module.exports = router;
