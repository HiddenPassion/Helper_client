// @flow
import { Navigation } from 'react-native-navigation';

import Login from '../Modules/Login';
import Registration from '../Modules/Registration';
import Feedbacks from '../Modules/Feedbacks';
import Subjects from '../Modules/Subjects';
import University from '../Modules/University';
import EditUniversity from '../Modules/University/Components/EditUniversityScreen';
import CreateUniversity from '../Modules/University/Components/CreateUniversityScreen';

export default function registerScreen(store: Object, Provider: Object) {
  Navigation.registerComponent('helper.Login', () => Login, store, Provider);
  Navigation.registerComponent('helper.Registration', () => Registration, store, Provider);
  Navigation.registerComponent('helper.Feedbacks', () => Feedbacks, store, Provider);
  Navigation.registerComponent('helper.Subjects', () => Subjects, store, Provider);
  Navigation.registerComponent('helper.University', () => University, store, Provider);
  Navigation.registerComponent('helper.EditUniversity', () => EditUniversity, store, Provider);
  Navigation.registerComponent('helper.CreateUniversity', () => CreateUniversity, store, Provider);
}
