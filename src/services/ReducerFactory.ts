class ReducerFactory {
  private handlers: { [key: string]: Function };

  constructor() {
    this.handlers = {};
  }

  static requestHandler(state, action) {
    return { ...state, isLoading: true, requestParams: action.payload || null };
  }

  static receiveHandler(state, action) {
    return { ...state, data: action.payload, isLoading: false };
  }

  static updatedHandler(state) {
    return { ...state, isLoading: false };
  }

  setActionHandler(actionType, handler) {
    this.handlers[actionType] = handler;
    return this;
  }

  setRequestAction(actionType) {
    this.setActionHandler(actionType, ReducerFactory.requestHandler);
    return this;
  }

  setReceiveAction(actionType) {
    this.setActionHandler(actionType, ReducerFactory.receiveHandler);
    return this;
  }

  setUpdatedAction(actionType) {
    this.setActionHandler(actionType, ReducerFactory.updatedHandler);
    return this;
  }

  build() {
    return (state = {}, action) => {
      if (Object.prototype.hasOwnProperty.call(this.handlers, action.type)) {
        return this.handlers[action.type].call(null, state, action);
      }
      return state;
    };
  }

}

export default ReducerFactory;
