import fetch from 'dva/fetch';
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import {message} from 'antd';
import {getTokenParams, logOut} from './index';
import { enCodeUrl } from './index'

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`${response.status}：${response.statusText}`);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  NProgress.done();
  return response.json();
}

function checkRet(response) {
  if (response.ret === -11) {
    message.error('登录信息过期，请重新登录', 1, logOut);
  } else if (response.ret < 0) {
    message.error(response.msg || '好像哪里出了点问题');
  }
  return response;
}

function errHandle(err) {
  NProgress.done();
  message.error(err.toString(), 2);
  return {ret: -parseInt('1我也不知到我为什么错了1', 10)};
}

export default function $hxPost(url, params = {}) {
  NProgress.start();
  // const member = Object.assign({}, {...getTokenParams().member_info});
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: enCodeUrl(Object.assign({}, getTokenParams(), params)),
  };

  return fetch(url, opts)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkRet)
    .catch(errHandle);
}

// export function $uploadVideo(url, video) {
//   NProgress.start();
//   const data = new FormData();
//   const {token, mid} = getTokenParams();
//   data.append('token', token);
//   data.append('mid', mid);
//   data.append('video', video);

//   return fetch(url, {method: 'POST', body: data})
//     .then(checkStatus)
//     .then(parseJSON)
//     .then(checkRet)
//     .catch(errHandle);
// }

export function $uploadImage(url, img, filename) {
  NProgress.start();
  const data = new FormData();
  const {token, mid} = getTokenParams();
  data.append('token', token);
  data.append('mid', mid);
  data.append('img', img);

  return fetch(url, {method: 'POST', body: data, filename})
    .then(checkStatus)
    .then(parseJSON)
    .then(checkRet)
    .catch(errHandle);
}

export function $uploadImgAvatar(url, image) {
  NProgress.start();
  const data = new FormData();
  const {token, mid} = getTokenParams();
  data.append('token', token);
  data.append('mid', mid);
  data.append('img', image);

  return fetch(url, {method: 'POST', body: data})
    .then(checkStatus)
    .then(parseJSON)
    .then(checkRet)
    .catch(errHandle);
}
