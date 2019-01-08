// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createLecturer } from '../../Module/duck';
import CreateLecturerScreen from './CreateLecturerScreen';

const mapDispatchToProps = {
  dispatchCreateLecturer: createLecturer,
};

const enhancer = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
);

export default enhancer(CreateLecturerScreen);
