const STORAGE_KEY = 'resilienceAssessment';

function saveData(data) {
    try {
        console.log("Saving data to localStorage:", data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Error saving data to localStorage", e);
    }
}

function loadData() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        console.log("Loaded data from localStorage:", data ? JSON.parse(data) : null);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error("Error loading data from localStorage", e);
        return null;
    }
}

function clearData() {
    try {
        console.log("Clearing data from localStorage.");
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error("Error clearing data from localStorage", e);
    }
}
