import { combineReducers } from 'redux';
import NodeReducer from '.';
import Selected from './selected';

export default combineReducers({
    nodes: NodeReducer,
    selected: Selected
})
