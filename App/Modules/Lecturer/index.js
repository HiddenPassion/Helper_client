// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  fetchLecturerList,
  selectFilteredLecturerList,
  deleteLecturer,
  filterLecturerList,
} from './Module/duck';
import { selectSelectedUniversity } from '../University/Module/duck';
import Lecturer from './Lecturer';

const mapStateToProps = state => ({
  lecturers: selectFilteredLecturerList(state),
  selectedUniversity: selectSelectedUniversity(state),
});

const mapDispatchToProps = {
  dispatchFetchLecturerList: fetchLecturerList,
  dispatchFilterLecturerList: filterLecturerList,
  dispatchDeleteLecturer: deleteLecturer,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhancer(Lecturer);
