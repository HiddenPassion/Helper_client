// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createUniversity } from '../../Module/duck';
import CreateUniversityScreen from './CreateUniversityScreen';

const mapDispatchToProps = {
  dispatchEditUniversity: createUniversity,
};

const enhancer = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
);

export default enhancer(CreateUniversityScreen);
