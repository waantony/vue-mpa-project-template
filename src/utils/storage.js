export const setSession = (key, value) => sessionStorage.setItem(key, JSON.stringify(value))
export const setLocal = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const getSession = key => JSON.parse(sessionStorage.getItem(key))
export const getLocal = key => JSON.parse(localStorage.getItem(key))

export const removeSession = key => sessionStorage.removeItem(key)
export const removeLocal = key => localStorage.removeItem(key)

export const removeAllSession = () => sessionStorage.clear()
export const removeAllLocal = () => localStorage.clear()
