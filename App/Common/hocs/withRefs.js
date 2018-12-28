// @flow
import { withState } from 'recompose';

class RefsStore {
  store(name, value) {
    (this: any)[name] = value;
  }

  save(name) {
    return (value) => {
      (this: any)[name] = value;
    };
  }
}

export default () =>
  withState('refs', 'setRefs', () => new RefsStore());
