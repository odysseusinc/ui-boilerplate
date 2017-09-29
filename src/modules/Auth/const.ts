import keyMirror = require('keymirror');

const paths = {
	login: () => '/auth/login',
};

const forms = keyMirror({
	register: null,
});

const apiPaths = {
  myUserpic: hash => `/api/v1/user-management/users/avatar/${hash ? `?${hash}` : ''}`,
};

const roles = keyMirror({
  ROLE_USER: null,
  ROLE_ADMIN: null,
});

export {
  apiPaths,
  forms,
  paths,
  roles,
};
