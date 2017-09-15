import * as types from '../constants/RandomizerTypes';
import { GUID } from '../utils/helpers';

const testState = {
    strings: [
        {
            text: 'Random String One',
            stringKey: 'f6b58900-5bac-521d-9103-478055eb1234'
        },
        {
            text: 'Random String Two',
            stringKey: 'f6b58900-5bac-521d-9103-478055eb1123'
        }
    ]
};

function insertItem(array, item) {
    let newArray = array.slice();
    newArray.splice(0, 0, item);
    return newArray;
}

function removeItem(array, stringKey) {
    return array.filter( (item) => item.stringKey !== stringKey);
}

export default function randomizerStore(state = testState, action) {
    switch (action.type) {
        ///////////////////
        // Actions on RandomStrings
        case types.STORE_STRING:
            const theStrings = insertItem(state.strings, {
                stringKey: GUID(),
                text: action.randomString
            })
            
            return Object.assign({}, state, {
                ...state,
                strings: theStrings
            });

        case types.CLEAR_HISTORY:
            return Object.assign({}, state, {
                ...state,
                strings: []
            });

        default:
            return state;
    }
}