// ============SAVE ACCESS TOKEN ==========
export const saveAccesToken = (token: string) => {
    localStorage.setItem('access_token', JSON.stringify(token));
    console.log(token);
}

// ============GET ACCESS TOKEN ==========
export const getAccesToken = (): string | null => {
    const token = localStorage.getItem('access_token');
    if (token === null) {
        return null;
    }
    try {
        return JSON.parse(token);
    } catch (e) {
        console.error("Failed to parse access token", e);
        return null;
    }
}

// ============REMOVE ACCESS TOKEN ==========
export const removeAccesToken = () => {
    localStorage.removeItem("access_token")
}