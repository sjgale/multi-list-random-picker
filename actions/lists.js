import * as types from '../constants/ListTypes';

export function addList(listName) {
  return {type: types.ADD_LIST, listName}
}

export function deleteList(listName) {
  return {type: types.DELETE_LIST, listName}
}

export function addItem(listName, text) {
  return {type: types.ADD_ITEM, listName, text}
}

export function deleteItem(listName, itemKey) {
  return {type: types.DELETE_ITEM, listName, itemKey}
}

export function activateList(listName) {
  return {type: types.ACTIVATE_LIST, listName}
}

export function deactivateList(listName) {
  return {type: types.DEACTIVATE_LIST, listName}
}