// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { register } from './Modules/duck';

import Registration from './Registration';

const mapDispatchToProps = {
  dispatchRegister: register,
};

const enhancer = compose(
  connect(null, mapDispatchToProps),
);

export default enhancer(Registration);
