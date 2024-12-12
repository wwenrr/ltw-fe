import { use } from "react";

const local = 'http://127.0.0.1:8080'
const prod = 'https://ltwbe.hcmutssps.id.vn'

const url = prod

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

export async function getBook(token, bookId, offset) {
    let res
    offset = offset ?? 0

    if(bookId) {
        res = await fetch(`${url}/api/getBook?book_id=${bookId}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`, 
            },
        })
        .then(response => {   
            if(!response.ok)
                throw new Error("Không tìm thấy dữ liệu")

            return response.json();
        })
    } else {
        res = await fetch(`${url}/api/getBook?offset=${offset}`, {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${token}`, 
            },
        })
        .then(response => {   
            if(!response.ok)
                throw new Error("Không tìm thấy dữ liệu")

            return response.json();
        })
    }
    
    return res
}

export async function getChaperFromBook(token, bookId) {
    const res = await fetch(`${url}/api/getChaperFromBook?book_id=${bookId}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json', 
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

export async function getChaperFromBookWithChapterNum(token, bookId, chapter_num) {
    const res = await fetch(`${url}/api/getChaperFromBook?book_id=${bookId}&chapter=${chapter_num}`, {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json',
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

export async function changeDisplayName(token, name) {
    const res = await fetch(`${url}/api/changeDisplayName?display_name=${name}`, {
        method: 'POST', 
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

export async function changeEmail(token, name) {
    const res = await fetch(`${url}/api/changeEmail?email=${name}`, {
        method: 'PUT', 
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

export async function deposit(token, name) {
    const res = await fetch(`${url}/api/deposit?amount=${name}`, {
        method: 'PUT', 
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

export async function getHistoryPayment(token, offset) {
    const res = await fetch(`${url}/api/getHistoryPayment?offset=${offset}`, {
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(res => {
        if(!res.ok)
            throw new Error("Không tìm thấy dữ liệu")

        return res.json()
    })
    
    return res
}

export async function addComment(token, bookId, content) {
    const res = await fetch(`${url}/api/comment?book_id=${bookId}&content=${content}`, {
        method: 'POST', 
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

export async function loadComment(token, bookId, offset) {
    const res = await fetch(`${url}/api/comment?book_id=${bookId}&offset=${offset}`, {
        method: 'GET', 
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

export async function getFollowedBook(token) {
    const res = await fetch(`${url}/api/follow`, {
        method: 'GET', 
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

export async function checkFollowedBook(token, book_id) {
    const res = await fetch(`${url}/api/follow?book_id=${book_id}`, {
        method: 'GET', 
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

export async function fetchCancelFollow(token, book_id) {
    const res = await fetch(`${url}/api/follow?id=${book_id}`, {
        method: 'DELETE', 
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

export async function fetchFollow(token, book_id) {
    const res = await fetch(`${url}/api/follow?book_id=${book_id}`, {
        method: 'POST', 
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

export async function getAllUser(token, offset) {
    const res = await fetch(`${url}/api/manager/getAllUser?offset=${offset}`, {
        method: 'GET', 
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    })
    .then(res => {
        if(!res.ok)
            throw new Error("Không tìm thấy dữ liệu")

        return res.json()
    })

    return res
}

export async function Promote(token, username,role) {
    const res = await fetch(`${url}/api/manager/assignRole?username=${username}&role=${role}`, {
        method: 'PUT', 
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

export async function fetch_deleteAccount(token, username) {
    const res = await fetch(`${url}/api/manager/deleteUser?username=${username}`, {
        method: 'DELETE', 
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

export async function fetch_changePassword(token, password) {
    const res = await fetch(`${url}/api/changePassword`, {
        method: 'PUT', 
        headers: {
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
            password: password, 
        })
    })
    .then(response => {   
        return response.json();
    })

    if(res.code != 200)
        throw new Error(res.message)
    
    return res
}

export async function getCategory(token) {
    const res = await fetch(`${url}/api/getAllCategory`, {
        method: 'GET', 
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

export async function getBookWithCategory(token, cate) {
    const res = await fetch(`${url}/api/getBookWithCategory?category=${cate}`, {
        method: 'GET', 
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

export async function searchBook(token, key) {
    const res = await fetch(`${url}/api/search?key=${key}`, {
        method: 'GET', 
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

export async function changeAvatar(token, aurl) {
    const res = await fetch(`${url}/api/changeAvatar`, {
        method: 'PUT', 
        headers: {
            Authorization: `Bearer ${token}`, 
        },
        body: JSON.stringify({
            url: aurl, 
        })
    })
    .then(response => {   
        return response.json();
    })

    if(res.code != 200)
        throw new Error(res.message)
    
    return res
}