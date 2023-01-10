import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	/* const fetchMoviesHandler = () => {
		fetch('https://swapi.dev/api/films')
			.then(response => response.json())
			.then(data => {
				const transformedMovies = data.results.map(movieData => {
					return {
						id: movieData.episode_id,
						title: movieData.title,
						openingText: movieData.opening_crawl,
						releaseDate: movieData.release_date
					}
				});
				setMovies(transformedMovies);
			//	console.log(data.results);
			//	setMovies(data.results);
			});
	} */

	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch('https://swapi.dev/api/films/');
		
			if(!response.ok) {
				throw new Error('Bad API url');
			}

			const responseData = await response.json();
	
			const transformedMovies = responseData.results.map(movieData => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date
				}
			});

			setIsLoading(false);
			setMovies(transformedMovies);
		}
		catch(error) {
			setError(error.message);
			console.log(error.message);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

	let content = <p> No movies found.</p>;

	if(movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}

	if(error) {
		content = <p>{error}</p>;
	}

	if(isLoading) {
		content = <p> Movies are loading... </p>;
	}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
		{/* {isLoading && <p> Movies are loading... </p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
		{!isLoading && movies.length === 0 && !error && <p> No movies found.</p>}
		{!isLoading && error && <p>{error}</p>} */}
		{content}
	  </section>
    </React.Fragment>
  );
}

export default App;
