import { combineReducers } from 'redux';
import NodeReducer from './nodes';
import Selected from './selected';
import Persistence from './persistence';

export default combineReducers({
    nodes: NodeReducer,
    selected: Selected,
    persistence: Persistence
})
