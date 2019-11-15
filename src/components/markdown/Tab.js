import React from 'react';
import PropTypes from 'prop-types';
import styles from './Tab.css';
import { Link } from 'react-router-dom';

export const Tab = ({ title, id, handleClick, handleDelete, handleTitle, editTitle, handleTitleEdit }) => {
  return (
    <span className={styles.Tab}>
      <button className={styles.titleButton} id={id} name={title} onClick={() => handleTitleEdit(id)}>✎</button>

      {!editTitle.editInput && <Link to={`/${id}`} >
        <button className={styles.fileTab} name={title} id={id} onClick={handleClick} >
          {title}
        </button></Link>}
      {editTitle.editInput && editTitle.id === id && <form onSubmit={() => handleTitleEdit(id)} ><input type='text' value={title} id={id} onChange={handleTitle} onBlur={() => handleTitleEdit(id)} /></form>}
      <button className={styles.deleteButton} name={title} onClick={() => handleDelete(id)}>⌫</button>
    </span>
  );
};

Tab.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  focus: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  editTitle: PropTypes.shape({
    editInput: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
  }),
  handleTitleEdit: PropTypes.func.isRequired
};
