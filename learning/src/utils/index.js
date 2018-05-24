import padStart from 'lodash/padStart';
import {TOKEN, MID, MEMBER_INFO} from './constants';
import { message } from 'antd';

export function setToken(token) {
  window.localStorage.setItem(TOKEN, token);
}

export function setMID(mid) {
  window.localStorage.setItem(MID, mid);
}

export function setMEMBER_INFO(member_info) {
  window.localStorage.setItem(MEMBER_INFO, member_info);
}

export function logOut(routerChange = true) {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.removeItem(MID);
  window.localStorage.removeItem(MEMBER_INFO);
  window.localStorage.clear();
  if (routerChange) {
    window.location.href = '/';
  }
}

export function getTokenParams() {
  const mid = window.localStorage.getItem(MID);
  const member_info = JSON.parse(window.localStorage.getItem(MEMBER_INFO))
  return {
    token: window.localStorage.getItem(TOKEN),
    mid: mid ? parseInt(mid, 10) : 0,
    member_info: member_info,
  };
}

export function checkoutHasToken() {
  const msg = getTokenParams();
  if (msg.token < 0) {
    message.error('请登录后操作');
  }
}

export function checkoutCouldToken() {
  const msg = getTokenParams();
  if (msg.token < 10) {
    message.error('权限不足');
  }
}

export function enCodeUrl(json) {
  return Object.keys(json).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
  }).join("&");
}

// 135秒 => 02:15
export function videoTime(num) {
  const fixNum = str => padStart(str, 2, '0');
  return `${fixNum(~~(num / 60))}:${fixNum(num % 60)}`;
}

export function backTop() {
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;// 兼容safari
}
