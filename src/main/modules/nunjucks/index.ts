import config from 'config';
import * as path from 'path';
import * as express from 'express';
import * as nunjucks from 'nunjucks';

export class Nunjucks {
  constructor(public developmentMode: boolean) {
    this.developmentMode = developmentMode;
  }

  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const govUkFrontendPath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'node_modules',
      'govuk-frontend',
    );
    const nunEnv = nunjucks.configure(
      [path.join(__dirname, '..', '..', 'views'), govUkFrontendPath],
      {
        autoescape: true,
        watch: this.developmentMode,
        express: app,
      },
    );

    nunEnv.addGlobal('welshEnabled', process.env.FT_WELSH === 'true' || config.get('featureFlags.welsh') === 'true');
    app.use((req, res, next) => {
      res.locals.pagePath = req.path;
      nunEnv.addGlobal('currentUrl', req.url);
      next();
    });
  }
}
