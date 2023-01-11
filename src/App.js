import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

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
			// /movies.json will create a "movies" node in firebase, due to this it's required to attach this part to the url
			const response = await fetch('https://react-http-9c568-default-rtdb.europe-west1.firebasedatabase.app/movies.json');
		
			if(!response.ok) {
				throw new Error('Bad API url');
			}

			const responseData = await response.json();
			console.log(responseData);

			const loadedMovies = [];

			for(const item in responseData) {
				loadedMovies.push({
					id: item,
					title: responseData[item].title,
					openingText: responseData[item].text,
					releaseDate: responseData[item].date	
				});
			}
	
			/* const transformedMovies = responseData.results.map(movieData => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date
				}
			}); */

			setIsLoading(false);
			//setMovies(transformedMovies);
			setMovies(loadedMovies);
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

	// send post request to firebase
	const addMovieHandler = async (movie) => {
		const response = await fetch('https://react-http-9c568-default-rtdb.europe-west1.firebasedatabase.app/movies.json', {
			method: 'POST',
			body: JSON.stringify(movie),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const data = await response.json();
		console.log(data);
	};

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
		  	<AddMovie onAddMovie={addMovieHandler} />
		</section>
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
