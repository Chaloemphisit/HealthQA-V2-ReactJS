import { API_BASE_URL, ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);
    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function getTopic(topicId) {
    return request({
        url: API_BASE_URL + "/topic/" + topicId,
        method: 'GET'
    });
}

export function getManageTopic() {
    return request({
        url: API_BASE_URL + "/admin/topic/",
        method: 'GET'
    });
}

export function reportComment(id) {
    return request({
        url: API_BASE_URL + "/comment/report/" + id,
        method: 'PUT'
    });
}

export function reportTopic(id) {
    return request({
        url: API_BASE_URL + "/topic/report/" + id,
        method: 'PUT'
    });
}

export function deleteComment(id) {
    return request({
        url: API_BASE_URL + "/admin/report/comment/" + id,
        method: 'PUT'
    });
}

export function deleteTopic(id) {
    return request({
        url: API_BASE_URL + "/admin/report/topic/" + id,
        method: 'PUT'
    });
}

export function getReportTopic() {
    return request({
        url: API_BASE_URL + "/admin/report/topic",
        method: 'GET'
    });
}

export function getReportComment() {
    return request({
        url: API_BASE_URL + "/admin/report/comment",
        method: 'GET'
    });
}

export function getUsers() {
    return request({
        url: API_BASE_URL + "/admin/users",
        method: 'GET'
    });
}

export function getReports() {
    return request({
        url: API_BASE_URL + "/admin/report/all",
        method: 'GET'
    });
}

export function createTopic(topicData) {
    return request({
        url: API_BASE_URL + "/topic",
        method: 'POST',
        body: JSON.stringify(topicData)
    });
}

export function search(q) {
    return request({
        url: API_BASE_URL + "/topic/search?q=" + q,
        method: 'GET'
    });
}

export function createComment(commentData, topicId) {
    topicId = topicId || -10
    return request({
        url: API_BASE_URL + "/comment?id=" + topicId,
        method: 'POST',
        body: JSON.stringify(commentData)
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function signupAdmin(signupRequest) {
    return request({
        url: API_BASE_URL + "/admin/auth/signup/admin",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function signupDoctor(signupRequest) {
    return request({
        url: API_BASE_URL + "/admin/auth/signup/doctor",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        console.log("No access token set.")
        // return null;
    }
    // console.log(localStorage.getItem(ACCESS_TOKEN))
    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/profile/" + username,
        method: 'GET'
    });
}

export function getUserTopics() {
    return request({
        url: API_BASE_URL + "/profile/topic",
        method: 'GET'
    });
}

export function getUserAnsTopics() {
    return request({
        url: API_BASE_URL + "/profile/comment",
        method: 'GET'
    });
}

export function sendContactUs(contactUsData) {
    return request({
        url: API_BASE_URL + "/contactus",
        method: 'POST',
        body: JSON.stringify(contactUsData)
    });
}