// src/App.tsx

import { useState } from "react";
import "./App.css";

function App() {
	const [query, setQuery] = useState("");

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		if (query.trim()) {
			window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(
				query
			)}`;
		}
	};

	return (
		<div className="container">
			<div className="content-wrapper">
				<h1 className="title">
					<span className="youtube-color">YouTube</span> Search
				</h1>
				<form onSubmit={handleSearch} className="search-form">
					<div className="search-input-wrapper">
						<svg
							className="search-icon"
							focusable="false"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
						</svg>
						<input
							type="text"
							className="search-input"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Search"
							autoFocus
						/>
					</div>
					<div className="button-group">
						<button type="submit" className="search-button">
							YouTube Search
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default App;
