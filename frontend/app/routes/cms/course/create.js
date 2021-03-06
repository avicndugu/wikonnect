import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class CmsCourseCreateRoute extends Route {
  @inject
  me;

  model() {
    return this.store.createRecord('course', {
      creator: this.me.get('user')
    });
  }
}
