// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
  fetchUniversityList,
  selectSelectedUniversity,
  selectHasSelectedUniversity,
  selectFilteredUniversityList,
  deleteUniversity,
  selectUniversity,
  filterUniversityList,
} from './Module/duck';
import University from './University';

const mapStateToProps = state => ({
  universities: selectFilteredUniversityList(state),
  hasSelectedUniversity: selectHasSelectedUniversity(state),
  selectedUniversity: selectSelectedUniversity(state),
});

const mapDispatchToProps = {
  dispatchFetchUniversityList: fetchUniversityList,
  dispatchFilterUniversityList: filterUniversityList,
  dispatchSelectUniversity: selectUniversity,
  dispatchDeleteUniversity: deleteUniversity,
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
);

export default enhancer(University);
