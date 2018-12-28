// @flow

export const extractToken = (bearerToken: string) => (bearerToken ? bearerToken.split(' ')[1] : '');
