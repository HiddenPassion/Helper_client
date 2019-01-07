// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  fetchSubjectList,
  selectFilteredSubjectList,
  filterSubjectList,
} from './Module/duck';
import {
  selectSelectedUniversity,
  selectHasSelectedUniversity,
} from '../University/Module/duck';
import Subject from './Subject';

const mapStateToProps = state => ({
  subjects: selectFilteredSubjectList(state),
  hasSelectedUniversity: selectHasSelectedUniversity(state),
  selectedUniversity: selectSelectedUniversity(state),
});

const mapDispatchToProps = {
  dispatchFetchSubjectList: fetchSubjectList,
  dispatchFilterSubjectList: filterSubjectList,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhancer(Subject);
