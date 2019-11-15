import React from 'react';
import { Tab } from './Tab';
import PropTypes from 'prop-types';
import styles from './TabBar.css';


export const TabBar = ({ files, handleClick, handleAdd, handleDelete, handleTitle, editTitle, handleTitleEdit }) => {

  const tabElements = files.map(file => (
    <Tab key={file.id}
      id={file.id}
      title={file.title}
      handleClick={handleClick}
      handleDelete={handleDelete}
      handleTitle={handleTitle}
      editTitle={editTitle}
      handleTitleEdit={handleTitleEdit} />
  ));

  return (
    <div className={styles.TabBar}>
      {tabElements}
      <button onClick={handleAdd}>+</button>
    </div >
  );
};

TabBar.propTypes = {
  files: PropTypes.array.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleTitle: PropTypes.func.isRequired,
  editTitle: PropTypes.shape({
    editInput: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
  }),
  handleTitleEdit: PropTypes.func.isRequired
};
