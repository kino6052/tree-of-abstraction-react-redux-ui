import { combineReducers } from 'redux';
import NodeReducer from './nodes';
import Selected from './selected';
import Persistence from './persistence';
import NoteReducer from './notes';
import NodeChildren from './node-children';

export default combineReducers({
    nodes: NodeReducer,
    notes: NoteReducer,
    selected: Selected,
    persistence: Persistence,
    nodeChildren: NodeChildren
})
