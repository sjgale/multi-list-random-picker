import * as types from '../constants/RandomizerTypes';

export function storeString(randomString) {
  return {type: types.STORE_STRING, randomString}
}

export function clearHistory(listName) {
  return {type: types.CLEAR_HISTORY}
}