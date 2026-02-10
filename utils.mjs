// Utility functions and constants

// Genre colors mapping
export const genreColors = {
    "Action": "#ff6b6b",
    "Adventure": "#1dd1a1",
    "Comedy": "#feca57",
    "Drama": "#54a0ff",
    "Fantasy": "#5f27cd",
    "Horror": "#222f3e",
    "Mystery": "#8395a7",
    "Romance": "#ff9ff3",
    "Sci-Fi": "#0abde3",
    "Slice of Life": "#10ac84",
    "Sports": "#ee5253",
    "Supernatural": "#341f97",
    "Thriller": "#ff9f43",
    "Superhero": "#48dbfb",
    "Music": "#00d2d3",
    "Psychological": "#c8d6e5"
}

// All available genres
export const allGenres = Object.keys(genreColors)

// Show status message
export const showStatus = (message, type = "success") => {
    const statusMessageEl = document.getElementById('statusMessage')
    
    if (!statusMessageEl) {
        console.log(`${type.toUpperCase()}: ${message}`)
        return
    }
    
    statusMessageEl.textContent = message
    statusMessageEl.className = `status-message show ${type}`
    
    setTimeout(() => {
        statusMessageEl.classList.remove('show')
    }, 3000)
}

// Generate unique ID
export const generateId = (items) => {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1
}

// Format anime data
export const formatAnimeData = (anime) => ({
    id: anime.id,
    title: anime.title?.trim() || "",
    genres: Array.isArray(anime.genres) ? anime.genres : [],
    episodes: parseInt(anime.episodes) || 0
})

// Validate anime data
export const validateAnime = (anime) => {
    const errors = []
    
    if (!anime.title?.trim()) {
        errors.push("Title is required")
    }
    
    if (!Array.isArray(anime.genres) || anime.genres.length === 0) {
        errors.push("At least one genre is required")
    }
    
    if (!anime.episodes || anime.episodes < 1) {
        errors.push("Episodes must be at least 1")
    }
    
    return errors
}