const addTrip = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        return await res.json();
    } else {
        let error = new Error(res.statusText);
        error.res = res;
        throw error;
    }
}

const getLocation = async (url = '') => {
    const res = await fetch(url);

    if (res.ok) {
        return await res.json();
    } else {
        let error = new Error(res.statusText);
        error.res = res;
        throw error;
    }
}
    
export {
    addTrip,
    getLocation
} 