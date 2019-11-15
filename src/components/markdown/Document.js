import React, { useEffect } from 'react';
import Preview from './Preview';
import Editor from './Editor';
import styles from './Document.css';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { TabBar } from './TabBar';
import { getMarkdown, getFiles, getEditTitle } from '../../selectors/markdownSelectors';
import { updateMarkdown, changeFile, newTab, deleteTab, changeTitle, toggleEdit } from '../../actions/markdownActions';



const Document = ({ match }) => {
  const markdown = useSelector(getMarkdown);
  const files = useSelector(getFiles);
  const editTitle = useSelector(getEditTitle);
  const dispatch = useDispatch();
  const changeMarkdown = ({ target }) => {
    dispatch(updateMarkdown(target.value));
  };
  const handleClick = ({ currentTarget }) => {
    dispatch(changeFile(currentTarget.id));
  };
  const handleLoad = (id) => {
    dispatch(changeFile(id));
  };
  const handleAdd = () => {
    dispatch(newTab());
  };
  const handleDelete = (id) => {
    dispatch(deleteTab(id));
  };
  const handleTitle = ({ target }) => {
    dispatch(changeTitle(target.value, target.id));
  };
  const handleTitleEdit = (id) => {
    dispatch(toggleEdit(id));
  };

  useEffect(() => {
    if(match.params.id) handleLoad(match.params.id);
  }, []);

  return (
    <>
      <div className={styles.Document}>
        <TabBar files={files}
          editTitle={editTitle}
          handleClick={handleClick}
          handleTitle={handleTitle}
          handleAdd={() => handleAdd()}
          handleDelete={handleDelete}
          handleTitleEdit={handleTitleEdit}
        />
        <div style={{ 'display': 'flex' }}>
          <Editor markdown={markdown} updateMarkdown={changeMarkdown} />
          <Preview markdown={markdown} />
        </div>
      </div>
    </>
  );

};




// const mapStateToProps = state => ({
//   markdown: getMarkdown(state),
//   files: getFiles(state),
//   focus: getFocus(state),
//   editTitle: getEditTitle(state)
// });

// const mapDispatchToProps = dispatch => ({
//   changeMarkdown({ target }) {
//     dispatch(updateMarkdown(target.value));
//   },
//   handleClick({ currentTarget }) {
//     dispatch(changeFile(currentTarget.id));
//   },
//   handleLoad(id) {
//     dispatch(changeFile(id));
//   },

//   handleAdd() {
//     dispatch(newTab());
//   },
//   handleDelete(id) {
//     dispatch(deleteTab(id));
//   },
//   handleTitle({ target }) {
//     dispatch(changeTitle(target.value, target.id));
//   },
//   handleTitleEdit(id) {
//     dispatch(toggleEdit(id));
//   }
// });

Document.propTypes = {
  // markdown: PropTypes.string.isRequired,
  // changeMarkdown: PropTypes.func.isRequired,
  // files: PropTypes.array.isRequired,
  // handleAdd: PropTypes.func,
  // handleClick: PropTypes.func.isRequired,
  // handleDelete: PropTypes.func.isRequired,
  // focus: PropTypes.string.isRequired,
  // handleTitle: PropTypes.func.isRequired,
  // editTitle: PropTypes.shape({
  //   editInput: PropTypes.bool.isRequired,
  //   id: PropTypes.string.isRequired
  // }),
  // handleTitleEdit: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }),
  // handleLoad: PropTypes.func.isRequired
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Document);

export default Document;
