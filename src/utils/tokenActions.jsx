export const createToken = () => {
    const token = Math.random().toString(36);
    localStorage.setItem('token', token)

    return token;
}

export const removeToken = (item) => {
    localStorage.removeItem(item);
}