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

export async function getUserInfo(token) {
    return fetch(`${url}/api/getUserInfo`, {
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

export async function getPublisherBooks(token) {
    return fetch(`${url}/api/publisher/getPublisherBooks`, {
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

export async function deleteChapter(token, chapterId) {
    return fetch(`${url}/api/publisher/deleteChapter?chapter_id=${chapterId}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {   
        if (!response.ok) {
            throw new Error(response.message);
        }

        return response.json();
    })
}

export async function delelteBook(token, book_id) {
    const res = await fetch(`${url}/api/publisher/delelteBook?book_id=${book_id}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {   
        if (!response.ok) {
            throw new Error(response.message);
        }

        return response.json();
    })

    if(res.code != 200)
        throw new Error(res.message)
    
    return res
}

export async function addChapter(token, formData) {
    const res = await fetch(`${url}/api/publisher/addChapter`, {
        method: 'POST', 
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {   
        return response.json();
    })

    if(res.code != 200)
        throw new Error(res.message)
    
    return res
}

export async function publishNewBook(token, formData) {
    const res = await fetch(`${url}/api/publisher/publishNewBook`, {
        method: 'POST', 
        body: JSON.stringify({
            name: formData.name,
            category: formData.category,
            image_url: formData.image_url,
        }),
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(response => {   
        return response.json();
    })

    if(res.code != 200)
        throw new Error(res.message)
    
    return res
}