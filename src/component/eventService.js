const authToken = 'your-auth-token-here';
const apiUrl = 'https://api.fyre-stage.hypersign.id/api/v1/event?page=1&limit=10';


export async function fetchEvents() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched events:', data); 
        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}
