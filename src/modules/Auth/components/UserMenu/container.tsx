import { ContainerBuilder } from 'services/Utils';
import { Component } from 'react';
import { get } from 'lodash';
import { push as goToPage } from 'react-router-redux';
import { roles } from 'modules/Auth/const';
import presenter from './presenter';
import {
  IUserMenuState,
  IUserMenuDispatch,
  IUserMenuProps
} from './presenter';

interface IUserMenuStatefulDispatch {
  loadPrincipal: Function;
}

class UserMenu extends Component<IUserMenuProps & IUserMenuStatefulDispatch, {}> {
  componentWillMount() {
  }

  componentWillReceiveProps(props: IUserMenuProps) {
  }

  render() {
    return presenter(this.props);
  }
}

export default class UserMenuBuiler extends ContainerBuilder {
  getComponent() {
    return UserMenu;
  }

  mapStateToProps(state): IUserMenuState {
    const nameParts = [
      get(state, 'auth.principal.data.firstName', ''),
      get(state, 'auth.principal.data.lastName', '')
    ];
    const fullname = nameParts.filter(part => part).join(' ') || 'Anonymous';
    const userRoles = get(state, 'auth.principal.data.roles', []) || [];
    const isAdmin = userRoles.map(role => role.name).includes(roles.ROLE_ADMIN);

    return {
      isLoggedIn: !!get(state, 'auth.core.token', ''),
      fullname,
      isAdmin,
    };
  }
}
