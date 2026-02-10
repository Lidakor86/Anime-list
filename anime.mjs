import { generateId, formatAnimeData, validateAnime } from './utils.mjs'

// Anime data structure
const createAnime = (id, title, genres, episodes) => ({
    id,
    title,
    genres: Array.isArray(genres) ? genres : [genres],
    episodes
})

// Anime Manager class
export class AnimeManager {
    constructor() {
        this.animeList = []
        this.selectedGenres = []
        this.activeFilters = []
        
        // Sample initial data
        this.initializeSampleData()
    }
    
    // Initialize with sample data
    initializeSampleData = () => {
        if (this.animeList.length === 0) {
            this.animeList = [
                createAnime(1, "Attack on Titan", ["Action", "Drama", "Fantasy"], 75),
                createAnime(2, "Your Lie in April", ["Drama", "Romance", "Music"], 22),
                createAnime(3, "My Hero Academia", ["Action", "Superhero", "Comedy"], 113),
                createAnime(4, "Death Note", ["Mystery", "Thriller", "Supernatural"], 37),
                createAnime(5, "One Punch Man", ["Action", "Comedy", "Superhero"], 24),
                createAnime(6, "Violet Evergarden", ["Drama", "Fantasy", "Slice of Life"], 13)
            ]
        }
    }
    
    // Getter methods
    getAnimeList = () => [...this.animeList]
    
    getSelectedGenres = () => [...this.selectedGenres]
    
    getActiveFilters = () => [...this.activeFilters]
    
    // Set anime list
    setAnimeList = (animeData) => {
        this.animeList = animeData.map(formatAnimeData)
    }
    
    // Check if genre is selected
    isGenreSelected = (genre) => this.selectedGenres.includes(genre)
    
    // Toggle selected genre
    toggleSelectedGenre = (genre) => {
        const index = this.selectedGenres.indexOf(genre)
        
        if (index === -1) {
            this.selectedGenres.push(genre)
        } else {
            this.selectedGenres.splice(index, 1)
        }
    }
    
    // Clear selected genres
    clearSelectedGenres = () => {
        this.selectedGenres = []
    }
    
    // Toggle active filter
    toggleActiveFilter = (genre) => {
        const index = this.activeFilters.indexOf(genre)
        
        if (index === -1) {
            this.activeFilters.push(genre)
        } else {
            this.activeFilters.splice(index, 1)
        }
    }
    
    // Clear active filters
    clearActiveFilters = () => {
        this.activeFilters = []
    }
    
    // Get filtered anime
    getFilteredAnime = () => {
        if (this.activeFilters.length === 0) {
            return [...this.animeList]
        }
        
        return this.animeList.filter(anime =>
            anime.genres.some(genre => this.activeFilters.includes(genre))
        )
    }
    
    // Get all unique genres
    getAllUniqueGenres = () => {
        const uniqueGenres = new Set()
        
        this.animeList.forEach(anime => {
            anime.genres.forEach(genre => {
                uniqueGenres.add(genre)
            })
        })
        
        return Array.from(uniqueGenres).sort()
    }
    
    // Count anime by genre
    countAnimeByGenre = () => {
        const genreCount = {}
        
        this.animeList.forEach(anime => {
            anime.genres.forEach(genre => {
                genreCount[genre] = (genreCount[genre] || 0) + 1
            })
        })
        
        return genreCount
    }
    
    // Get total anime count
    getTotalAnimeCount = () => this.animeList.length
    
    // Get total episodes count
    getTotalEpisodesCount = () => 
        this.animeList.reduce((sum, anime) => sum + anime.episodes, 0)
    
    // Add anime
    addAnime = (title, genres, episodes) => {
        const validation = validateAnime({ title, genres, episodes })
        
        if (validation.length > 0) {
            throw new Error(validation.join(", "))
        }
        
        const newId = generateId(this.animeList)
        const newAnime = createAnime(newId, title, genres, episodes)
        
        this.animeList.push(newAnime)
        return newAnime
    }
    
    // Remove anime
    removeAnime = (id) => {
        const initialLength = this.animeList.length
        this.animeList = this.animeList.filter(anime => anime.id !== id)
        
        return initialLength !== this.animeList.length
    }
    
    // Update anime
    updateAnime = (id, updates) => {
        const index = this.animeList.findIndex(anime => anime.id === id)
        
        if (index === -1) {
            return null
        }
        
        const updatedAnime = {
            ...this.animeList[index],
            ...updates
        }
        
        const validation = validateAnime(updatedAnime)
        if (validation.length > 0) {
            throw new Error(validation.join(", "))
        }
        
        this.animeList[index] = formatAnimeData(updatedAnime)
        return this.animeList[index]
    }
    
    // Find anime by ID
    findAnimeById = (id) => 
        this.animeList.find(anime => anime.id === id)
    
    // Find anime by title
    findAnimeByTitle = (title) => 
        this.animeList.filter(anime => 
            anime.title.toLowerCase().includes(title.toLowerCase())
        )
    
    // Get anime by genre
    getAnimeByGenre = (genre) => 
        this.animeList.filter(anime => 
            anime.genres.includes(genre)
        )
}