const url = 'https://ltwbe.hcmutssps.id.vn'

export async function login(data) {
    return fetch(`${url}/auth/login`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            username: data.username, 
            password: data.password, 
        })
    })
    .then(response => {   
        return response.json();
    })
}

export async function register(data) {
    return fetch(`${url}/auth/register`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            email: data.email,
            username: data.username, 
            password: data.password, 
        })
    })
    .then(response => {   
        return response.json();
    })
}

export async function getBook(token, bookId) {
    if(bookId) {
        return fetch(`${url}/api/getBook?book_id=${bookId}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`, 
            },
        })
        .then(response => {   
            return response.json();
        })
    }


    return fetch(`${url}/api/getBook`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {   
        return response.json();
    })
}

export async function getChaperFromBook(token, bookId) {
    return fetch(`${url}/api/getChaperFromBook?book_id=${bookId}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {   
        return response.json();
    })
}

export async function getChaperFromBookWithChapterNum(token, bookId, chapter_num) {
    return fetch(`${url}/api/getChaperFromBook?book_id=${bookId}&chapter=${chapter_num}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {   
        return response.json();
    })
}