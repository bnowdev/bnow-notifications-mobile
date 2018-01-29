import React, { Component } from "react";
import { NavigationActions } from "react-navigation";


/**
* @description Navigate and reset the initial screen to {routeName}
*/

export function _navigateTo(routeName) {
  const actionToDispatch = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName })]
  });
  this.props.navigation.dispatch(actionToDispatch);
}
