import { combineReducers } from 'redux';
import listStore from './lists';
import randomizerStore from './randomizer';

const rootReducer = combineReducers({
    listStore,
    randomizerStore
});

export default rootReducer;