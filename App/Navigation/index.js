// @flow
import { Navigation } from 'react-native-navigation';

import Login from '../Modules/Login';
import Registration from '../Modules/Registration';
import Feedbacks from '../Modules/Feedbacks';
import Subjects from '../Modules/Subjects';

export default function registerScreen(store: Object, Provider: Object) {
  Navigation.registerComponent('helper.Login', () => Login, store, Provider);
  Navigation.registerComponent('helper.Registration', () => Registration, store, Provider);
  Navigation.registerComponent('helper.Feedbacks', () => Feedbacks, store, Provider);
  Navigation.registerComponent('helper.Subjects', () => Subjects, store, Provider);
}
