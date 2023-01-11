import React, { useRef } from 'react';

import styles from './AddMovie.module.css';

const AddMovie = (props) => {
    const titleRef = useRef('');
    const textRef = useRef('');
    const dateRef = useRef('');

    const formSubmitHandler = (event) => {
        event.preventDefault();

        const movie = {
            title: titleRef.current.value,
            text: textRef.current.value,
            dateRef: dateRef.current.value
        }

        props.onAddMovie(movie);
    };
    
    return (
        <form onSubmit={formSubmitHandler}>

            <div className={styles.control}>
                <label htmlFor='title'> Title </label>                
                <input type='text' id='title' ref={titleRef} />
            </div>

            <div className={styles.control}>
                <label htmlFor='opening-text'> Opening Text </label>                
                <textarea rows='5' id='opening-text' ref={textRef} />
            </div>

            <div className={styles.control}>
                <label htmlFor='release-date'> Release Date </label>                
                <input type='text' id='release-date' ref={dateRef} />
            </div>

            <button> Add Movie </button>
        </form>
    )
}

export default AddMovie;