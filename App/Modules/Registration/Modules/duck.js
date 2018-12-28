// @flow
import { createDuck, type ActionCreator } from 'redux-duck';

const duck = createDuck('registration');

export const REGISTER = duck.defineType('REGISTER');
export const REGISTER_RESPONSE = duck.defineType('LOGIN_RESPONSE');

type RegistrationPayload = { email: string, username: string, password: string };

export const register: ActionCreator<RegistrationPayload> = duck.createAction(REGISTER);
export const registerResponse = duck.createAction(REGISTER_RESPONSE);
