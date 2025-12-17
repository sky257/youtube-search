// src/App.tsx

import { useState, useEffect } from "react";
import "./App.css";

function App() {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (query.trim()) {
				fetch(`/api/suggestions?q=${encodeURIComponent(query)}`)
					.then((res) => res.json())
					.then((data) => {
						setSuggestions(data);
						setSelectedIndex(-1); // Reset selection on new results
					})
					.catch((err) => console.error(err));
			} else {
				setSuggestions([]);
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [query]);

	const handleSearch = (e: React.FormEvent, searchQuery = query) => {
		e.preventDefault();
		if (searchQuery.trim()) {
			window.location.href = `https://www.youtube.com/results?search_query=${encodeURIComponent(
				searchQuery
			)}`;
		}
	};

	const handleSuggestionClick = (suggestion: string) => {
		setQuery(suggestion);
		handleSearch({ preventDefault: () => {} } as React.FormEvent, suggestion);
		setShowSuggestions(false);
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (!showSuggestions || suggestions.length === 0) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedIndex((prev) =>
				prev < suggestions.length - 1 ? prev + 1 : prev
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedIndex((prev) => (prev > -1 ? prev - 1 : -1));
		} else if (e.key === "Enter") {
			if (selectedIndex >= 0) {
				e.preventDefault();
				handleSuggestionClick(suggestions[selectedIndex]);
			}
		} else if (e.key === "Escape") {
			setShowSuggestions(false);
			setSelectedIndex(-1);
		}
	};

	return (
		<div className="container" onClick={() => setShowSuggestions(false)}>
			<div className="content-wrapper" onClick={(e) => e.stopPropagation()}>
				<h1 className="title">
					<a href="https://www.youtube.com" className="logo-wrapper">
						<svg
							viewBox="0 0 68 48"
							className="youtube-logo"
						>
							<path
								className="youtube-icon-bg"
								d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"
								fill="#FF0000"
							/>
							<path 
								d="M 45,24 27,14 27,34" 
								fill="#FFFFFF" 
							/>
						</svg>
						<span className="youtube-text">YouTube</span>
						<span className="search-text">Search</span>
					</a>
				</h1>
				<form onSubmit={(e) => handleSearch(e)} className="search-form">
					<div className="search-box-container">
						<div className={`search-input-wrapper ${showSuggestions && suggestions.length > 0 ? 'has-suggestions' : ''}`}>
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
								onChange={(e) => {
									setQuery(e.target.value);
									setShowSuggestions(true);
								}}
								onFocus={() => setShowSuggestions(true)}
								onKeyDown={handleKeyDown}
								placeholder="Search"
								autoFocus
							/>
						</div>
						{showSuggestions && suggestions.length > 0 && (
							<ul className="suggestions-list">
								{suggestions.map((suggestion, index) => (
									<li
										key={index}
										className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
										onClick={() => handleSuggestionClick(suggestion)}
										onMouseEnter={() => setSelectedIndex(index)}
									>
										<svg 
											className="suggestion-icon" 
											xmlns="http://www.w3.org/2000/svg" 
											viewBox="0 0 24 24"
											fill="currentColor"
										>
											<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
										</svg>
										{suggestion}
									</li>
								))}
							</ul>
						)}
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
