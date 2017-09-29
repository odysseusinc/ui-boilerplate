import keyMirror = require('keymirror');

const forms = keyMirror({
  sampleForm: null,
});

const modals = keyMirror({
  sampleMpdal: null,
});

const paths = {
	example: () => '/start/example',
};

const apiPaths = {
	download: (query: string) => `/api/v1/concepts/download/${query}`,
};

export {
  apiPaths,
  forms,
  paths,
  modals,
};
