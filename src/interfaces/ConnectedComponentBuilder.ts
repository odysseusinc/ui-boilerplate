interface ConnectedComponentBuilder {
  getComponent: Function;
  mapStateToProps?: Function;
  getMapDispatchToProps?: Function;
  mapDispatchToProps?: Function;
  mergeProps?: Function;
  getModalParams?: Function;
  getFetchers?: Function;
  build?: Function;
}

export default ConnectedComponentBuilder;