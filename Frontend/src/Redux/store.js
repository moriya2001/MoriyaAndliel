import { createStore } from 'redux';
import { helpMeReducer } from './reducers';

 const store = createStore(helpMeReducer)
 export default store