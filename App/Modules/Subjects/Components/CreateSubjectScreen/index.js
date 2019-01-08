// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createSubject } from '../../Module/duck';
import CreateSubjectScreen from './CreateSubjectScreen';

const mapDispatchToProps = {
  dispatchCreateSubject: createSubject,
};

const enhancer = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
);

export default enhancer(CreateSubjectScreen);
