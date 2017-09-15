import * as types from '../constants/ListTypes';
import TestLists from '../constants/TEST_LISTS';
import h from '../utils/helpers';

let lists = [];

export default function listStore(state = TestLists, action) {
    switch (action.type) {

        ///////////////////
        // Actions on lists
        case types.ADD_LIST:
            if (Array.isArray(state.lists)) {
                lists = [
                    ...state.lists,
                    {
                        name: action.listName,
                        selected: false,
                        items: []
                    }
                ];
            } else {
                lists = [{
                    name: action.listName,
                    selected: false,
                    items: []
                }];
            }
            return Object.assign({}, state, {
                ...state,
                lists: lists
            });

        case types.DELETE_LIST:
            lists = state.lists.filter(list => {
                return list.name !== action.listName
            });

            return Object.assign({}, state, {
                ...state,
                lists: lists
            });
       
        /////////////////////////////
        // Actions on items in a list
        case types.ADD_ITEM:
            lists = state.lists.map(currentList => {
                    return currentList.name === action.listName ?
                    {
                        ...currentList,
                        items: [
                            ...currentList.items,
                            {
                                itemKey: h.GUID(),
                                text: action.text
                            }
                        ]
                    }
                    : currentList
                }
            )
            return Object.assign({}, state, {
                ...state,
                lists: lists
            });

        case types.DELETE_ITEM:
            // return testState
            lists = state.lists.map(currentList => {
                    return currentList.name === action.listName ?
                    {
                        ...currentList,
                        items: currentList.items.filter(item => item.itemKey !== action.itemKey)
                    }
                    : currentList
                }
            )
            return Object.assign({}, state, {
                ...state,
                lists: lists
            });

        case types.ACTIVATE_LIST:
            // return testState
            lists = state.lists.map(currentList => {
                    return currentList.name === action.listName ?
                    {
                        ...currentList,
                        selected: true
                    }
                    : currentList
                }
            );

            return Object.assign({}, state, {
                ...state,
                lists: lists
            });

        case types.DEACTIVATE_LIST:
            // return testState
            lists = state.lists.map(currentList => {
                    return currentList.name === action.listName ?
                    {
                        ...currentList,
                        selected: false
                    }
                    : currentList
                }
            );

            return Object.assign({}, state, {
                ...state,
                lists: lists
            });

        default:
            return state;
    }
}