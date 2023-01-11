import React from 'react';

import styles from './AddMovie.module.css';

const AddMovie = (props) => {

    const formSubmitHandler = () => {

    };
    
    return (
        <form onSubmit={formSubmitHandler}>

            <div className={styles.control}>
                <label htmlFor='title'> Title </label>                
                <input type='text' id='title' />
            </div>

            <div className={styles.control}>
                <label htmlFor='opening-text'> Opening Text </label>                
                <textarea rows='5' id='opening-text'/>
            </div>

            <div className={styles.control}>
                <label htmlFor='release-date'> Title </label>                
                <input type='text' id='release-date' />
            </div>

            <button> Add Movie </button>
        </form>
    )
}

export default AddMovie;