document.addEventListener('DOMContentLoaded', () => {
    const addMovieForm = document.getElementById('add-movie-form');
    const searchMovieForm = document.getElementById('search-movie-form');
    const moviesList = document.getElementById('movies');

    // Fetch and display movies
    const fetchMovies = async (query = '') => {
        const url = query ? `http://localhost:3000/api/movies/search?title=${query}` : 'http://localhost:3000/api/movies';
        const response = await fetch(url);
        const movies = await response.json();
        moviesList.innerHTML = '';
        movies.forEach(movie => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${movie.title}</strong> (${movie.year})<br>
                <em>${movie.director}</em><br>
                ${movie.genre}
            `;
            moviesList.appendChild(li);
        });
    };

    // Add a new movie
    addMovieForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(addMovieForm);
        const movie = {
            title: formData.get('title'),
            director: formData.get('director'),
            genre: formData.get('genre'),
            year: formData.get('year')
        };
        await fetch('http://localhost:3000/api/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        });
        addMovieForm.reset();
        fetchMovies();
    });

    // Search movies
    searchMovieForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(searchMovieForm);
        const query = formData.get('search-title');
        fetchMovies(query);
    });

    fetchMovies();
});
