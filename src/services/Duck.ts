import { Reducer } from 'redux';
import ActionFactory from './ActionFactory';
import ReducerFactory from './ReducerFactory';
import { action as actionName } from './CrudActionNameBuilder';

class Duck {
  public actions: {
    query: Function;
    find: Function;
    create: Function;
    update: Function;
    delete: Function;
  };
  public reducer: Reducer<any>;

  constructor({ name, urlBuilder }) {
    this.actions = this.buildActionCreators({ name, urlBuilder });
    this.reducer = this.buildReducer({ name });
  }

  buildActionCreators({ name, urlBuilder }) {
    const actionFactory = new ActionFactory();
    actionFactory.urlBuilder = urlBuilder;
    actionFactory.initCrud({ name });
    return {
      query: actionFactory.buildLoad(),
      find: actionFactory.buildFind(),
      create: actionFactory.buildCreateActionCreator(),
      update: actionFactory.buildUpdateActionCreator(),
      delete: actionFactory.buildDeleteActionCreator(),
    }
  }

  buildReducer({ name }) {
    return new ReducerFactory()
      // GET_PENDING
      .setActionHandler(
        actionName(name).query().pending().toString(),
        (state, action) => ({
          ...state,
          isLoading: true,
          requestParams: action.payload || null,
        })
      )
      // GET_FULFILLED
      .setActionHandler(
        actionName(name).query().done().toString(),
        (state, action) => ({
          ...state,
          isLoading: false,
          queryResult: action.payload,
        })
      )
      // FIND_PENDING
      .setActionHandler(
        actionName(name).find().pending().toString(),
        (state, action) => ({
          ...state,
          isLoading: true,
        })
      )
      // FIND_FULFILLED
      .setActionHandler(
        actionName(name).find().done().toString(),
        (state, action) => ({
          ...state,
          isLoading: false,
          data: action.payload,
        })
      )
      // CREATE_PENDING
      .setActionHandler(
        actionName(name).create().pending().toString(),
        (state, action) => ({
          ...state,
          isSaving: true,
          data: null,
        })
      )
      // CREATE_FULFILLED
      .setActionHandler(
        actionName(name).create().done().toString(),
        (state, action) => ({
          ...state,
          isSaving: false,
          data: null,
        })
      )
      // UPDATE_PENDING
      .setActionHandler(
        actionName(name).update().pending().toString(),
        (state, action) => ({
          ...state,
          isUpdating: true,
        })
      )
      // UPDATE_FULFILLED
      .setActionHandler(
        actionName(name).update().done().toString(),
        (state, action) => ({
          ...state,
          isUpdating: false,
        })
      )
      // DELETE_PENDING
      .setActionHandler(
        actionName(name).delete().pending().toString(),
        (state, action) => ({
          ...state,
          isDeleting: true,
          data: null,
        })
      )
      // DELETE_FULFILLED
      .setActionHandler(
        actionName(name).delete().done().toString(),
        (state, action) => ({
          ...state,
          isDeleting: false,
          data: null,
        })
      )
      .build();
  }
}

export default Duck;
