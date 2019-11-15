import { UPDATE_MARKDOWN, NEW_TAB, CHANGE_FILE, DELETE_TAB, CHANGE_TITLE, TOGGLE_EDIT } from '../actions/markdownActions';
import { newId } from '../utils/idGenerator';
import { loadState } from '../utils/localStorage';

const id1 = newId();
const id2 = newId();

let initialState = {
  files: [
    {
      id: id1,
      title: 'New Tab',
      markdown: 'type here'
    },
    {
      id: id2,
      title: 'New Tab',
      markdown: 'type here'
    }
  ],
  focus: id1,
  editTitle: {
    editInput: false,
    id: id1
  }
};

const persistedState = loadState();
if(persistedState) {
  initialState = persistedState;
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_MARKDOWN:
      return {
        ...state, files: state.files.map(file => {
          if(file.id === state.focus) {
            return { ...file, markdown: action.payload };
          }
          return file;
        })
      };
    case CHANGE_FILE: {

      // const pathName = `/${action.payload}`;

      return { ...state, focus: action.payload };
    }
    case NEW_TAB: {
      let newID = newId();
      return {
        ...state, files: [...state.files, {
          id: newID,
          title: 'New Tab',
          markdown: 'type here'
        }], focus: newID
      };
    }
    case DELETE_TAB: {
      let newState = { ...state };
      let newFocus;
      // this logic repeats, extract / refactor    -John
      const file = newState.files.find(file => {
        return file.id === action.payload;
      });

      const index = newState.files.indexOf(file);
      newState.files.splice(index, 1);

      if(newState.files.length === 0) {
        let newID = newId();
        newFocus = newID;
        newState.files[0] = {
          id: newID,
          title: 'New Tab',
          markdown: 'type here'
        };
      } else if(newState.files[index]) {
        newFocus = newState.files[index].id;
      } else {
        newFocus = newState.files[index - 1].id;
      }

      if(action.payload !== newState.focus) {
        newFocus = newState.focus;
      }

      return {
        ...newState, focus: newFocus
      };
    }
    case CHANGE_TITLE: {
      let newState = { ...state };
      const file = newState.files.find(file => {
        return file.id === action.payload.id;
      });

      const index = newState.files.indexOf(file);
      newState.files[index].title = action.payload.title;
      return newState;
    }
    case TOGGLE_EDIT: {
      return { ...state, editTitle: { editInput: !state.editTitle.editInput, id: action.payload } };
    }
    default:
      return state;
  }

};

export default reducer;
