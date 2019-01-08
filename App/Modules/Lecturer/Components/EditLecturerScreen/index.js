// @flow
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { editLecturer } from '../../Module/duck';
import EditLecturerScreen from './EditLecturerScreen';

const mapDispatchToProps = {
  dispatchEditLecturer: editLecturer,
};

const enhancer = compose(
  connect(
    null,
    mapDispatchToProps,
  ),
);

export default enhancer(EditLecturerScreen);
