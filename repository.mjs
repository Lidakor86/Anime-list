// Data repository for CRUD operations

const STORAGE_KEY = 'animeWatchlist'

// Sample initial data
const sampleAnimeList = [
    {
        id: 1,
        title: "Attack on Titan",
        genres: ["Action", "Drama", "Fantasy"],
        episodes: 75
    },
    {
        id: 2,
        title: "Your Lie in April",
        genres: ["Drama", "Romance", "Music"],
        episodes: 22
    },
    {
        id: 3,
        title: "My Hero Academia",
        genres: ["Action", "Superhero", "Comedy"],
        episodes: 113
    },
    {
        id: 4,
        title: "Death Note",
        genres: ["Mystery", "Thriller", "Supernatural"],
        episodes: 37
    },
    {
        id: 5,
        title: "One Punch Man",
        genres: ["Action", "Comedy", "Superhero"],
        episodes: 24
    },
    {
        id: 6,
        title: "Violet Evergarden",
        genres: ["Drama", "Fantasy", "Slice of Life"],
        episodes: 13
    }
]

// Load anime list from localStorage
export const loadAnimeList = () => {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY)
        
        if (savedData) {
            const parsedData = JSON.parse(savedData)
            return Array.isArray(parsedData) ? parsedData : sampleAnimeList
        }
        
        return sampleAnimeList
    } catch (error) {
        console.error("Error loading anime list:", error)
        return sampleAnimeList
    }
}

// Save anime list to localStorage
export const saveAnimeList = (animeList) => {
    try {
        const dataToSave = Array.isArray(animeList) ? animeList : []
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
        return true
    } catch (error) {
        console.error("Error saving anime list:", error)
        return false
    }
}

// Create new anime
export const createAnime = (animeList, animeData) => {
    const newId = animeList.length > 0 
        ? Math.max(...animeList.map(a => a.id)) + 1 
        : 1
    
    const newAnime = {
        id: newId,
        title: animeData.title?.trim() || "",
        genres: Array.isArray(animeData.genres) ? animeData.genres : [],
        episodes: parseInt(animeData.episodes) || 0
    }
    
    const updatedList = [...animeList, newAnime]
    saveAnimeList(updatedList)
    
    return newAnime
}

// Read anime by ID
export const readAnimeById = (animeList, id) => 
    animeList.find(anime => anime.id === id)

// Read all anime
export const readAllAnime = (animeList) => [...animeList]

// Update anime
export const updateAnime = (animeList, id, updates) => {
    const index = animeList.findIndex(anime => anime.id === id)
    
    if (index === -1) {
        return null
    }
    
    const updatedAnime = {
        ...animeList[index],
        ...updates
    }
    
    const updatedList = [
        ...animeList.slice(0, index),
        updatedAnime,
        ...animeList.slice(index + 1)
    ]
    
    saveAnimeList(updatedList)
    return updatedAnime
}

// Delete anime
export const deleteAnime = (animeList, id) => {
    const filteredList = animeList.filter(anime => anime.id !== id)
    saveAnimeList(filteredList)
    return filteredList
}

// Search anime by title
export const searchAnime = (animeList, query) => {
    const searchTerm = query.toLowerCase().trim()
    
    if (!searchTerm) {
        return animeList
    }
    
    return animeList.filter(anime => 
        anime.title.toLowerCase().includes(searchTerm)
    )
}

// Filter anime by genres
export const filterAnimeByGenres = (animeList, genres) => {
    if (!Array.isArray(genres) || genres.length === 0) {
        return animeList
    }
    
    return animeList.filter(anime =>
        anime.genres.some(genre => genres.includes(genre))
    )
}

// Get anime statistics
export const getAnimeStats = (animeList) => {
    const totalAnime = animeList.length
    const totalEpisodes = animeList.reduce((sum, anime) => sum + anime.episodes, 0)
    
    const uniqueGenres = new Set()
    animeList.forEach(anime => {
        anime.genres.forEach(genre => uniqueGenres.add(genre))
    })
    
    const totalGenres = uniqueGenres.size
    
    return {
        totalAnime,
        totalEpisodes,
        totalGenres,
        uniqueGenres: Array.from(uniqueGenres)
    }
}

// Get genre statistics
export const getGenreStats = (animeList) => {
    const genreStats = {}
    
    animeList.forEach(anime => {
        anime.genres.forEach(genre => {
            genreStats[genre] = (genreStats[genre] || 0) + 1
        })
    })
    
    return Object.entries(genreStats)
        .sort((a, b) => b[1] - a[1])
        .map(([genre, count]) => ({ genre, count }))
}

// Clear all data
export const clearAllData = () => {
    localStorage.removeItem(STORAGE_KEY)
    return sampleAnimeList
}

// Export repository functions
export const animeRepository = {
    loadAnimeList,
    saveAnimeList,
    createAnime,
    readAnimeById,
    readAllAnime,
    updateAnime,
    deleteAnime,
    searchAnime,
    filterAnimeByGenres,
    getAnimeStats,
    getGenreStats,
    clearAllData
}