import { combineReducers } from 'redux';
import NodeReducer from '.';

export default combineReducers({
    nodes: NodeReducer
})
