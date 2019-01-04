// @flow
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './Login';
import { selectToken, login } from './Module/duck';
import { defaultNavigatorStyle } from '../../Common/utils/navhelper';
import { GlobalNavigation } from '../../Navigation/GlobalNavigation';

const mapStateToProps = state => ({
  token: selectToken(state),
});

const mapDispatchToProps = {
  dispatchLogin: login,
};

const moveToApp = ({ token, navigator }, hadToken) => {
  if (token && !hadToken) {
    // navigator.resetTo(screen('helper.Subjects', { navigatorStyle: { disableBackGesture: true } }));
    Promise.all([Icon.getImageSource('md-map', 30), Icon.getImageSource('md-share-alt', 30)]).then(
      (sources) => {
        Navigation.startTabBasedApp({
          tabs: [
            {
              screen: 'helper.Subjects',
              title: 'Subjects',
              icon: sources[0],
              navigatorStyle: {
                ...defaultNavigatorStyle,
              },
            },
            {
              screen: 'helper.Feedbacks',
              title: 'Feedback',
              icon: sources[1],
              navigatorStyle: {
                ...defaultNavigatorStyle,
              },
            },
          ],
        });
      },
    );
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
