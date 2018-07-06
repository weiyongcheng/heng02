import {NativeModules} from 'react-native';

async function request(url, _options) {

    const options = _options || {};
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    let resp, text, json;
    try {
        resp = await fetch(url, options);
        text = await resp.text();
        json = JSON.parse(text);
    } catch (err) {
        throw new Error(err.toString());
    }

    // 如果请求失败
    if (!resp || resp.status !== 200) {
        throw new Error('请求出错，请稍后再试');
    }

    return json;
}

async function requestRaw(url, _options) {

    const options = _options || {};
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    let resp, text;
    try {
        resp = await fetch(url, options);
        text = await resp.text();
    } catch (err) {
        throw new Error(err.toString());
    }

    // 如果请求失败
    if (!resp || resp.status !== 200) {
        throw new Error('请求出错，请稍后再试');
    }

    return text;
}

export function get(url, options) {
    return request(url, options);
}

export function getRaw(url, options) {
    return requestRaw(url, options);
}

export function post(url, data, options) {

    let parameters = new FormData();
    for (let key in data) {
        parameters.append(key, data[key]);
    }

    return request(url, {
        method: 'POST',
        headers: {
            // 'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',

        },
        // body: JSON.stringify(data),
        body: parameters,
        ...options,
    });
}