// @flow
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import Login from './Login';
import { selectToken, login } from './Module/duck';
import { screen } from '../../Common/utils/navhelper';
import { GlobalNavigation } from '../../Navigation/GlobalNavigation';

const mapStateToProps = state => ({
  token: selectToken(state),
});

const mapDispatchToProps = {
  dispatchLogin: login,
};

const moveToApp = ({ token, navigator }, hadToken) => {
  if (token && !hadToken) {
    navigator.resetTo(screen('helper.University', { navigatorStyle: { disableBackGesture: true } }));
  }
};

const enhancer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentWillMount() {
      GlobalNavigation.setLoginNavigation(this.props.navigator);
      moveToApp(this.props, false);
    },
    componentWillReceiveProps(nextProps) {
      moveToApp(nextProps, !!this.props.token);
    },
  }),
);

export default enhancer(Login);
