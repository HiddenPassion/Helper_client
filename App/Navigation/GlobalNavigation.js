// @flow
export const GlobalNavigation = (() => {
  let loginNavigator;
  let homeNavigator;
  return {
    setLoginNavigation: (navigator) => {
      loginNavigator = navigator;
    },
    getLoginNavigator: () => loginNavigator,
    setHomeNavigator: (navigator) => {
      homeNavigator = navigator;
    },
    getHomeNavigator: () => homeNavigator,
  };
})();
