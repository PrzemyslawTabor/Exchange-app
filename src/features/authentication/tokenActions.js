export const createToken = () => {
    const token = Math.random().toString(36);
    localStorage.setItem('token', token)

    return token;
}

export const isTokenCorrect = (token) => {
    const storageToken = localStorage.getItem('token')
    removeToken();

    return storageToken === token;
}

const removeToken = () => {
    localStorage.removeItem('token');
}