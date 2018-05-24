import $hxPost, {$uploadImageCover, $uploadVideo, $uploadImage} from '../utils/request';

const API = 'http://localhost:1234'

function getFetchHost(hostName) {
 
  return hostName;
}

// export const $upImageCover = (image, id) => $uploadImageCover(`${getFetchHost(API)}/api/daren/img/updatecover`, image, id);
// export const $upVideo = file => $uploadVideo(`${getFetchHost(API)}/api/daren/video/upload`, file);
// export const $upImg = (file, filename) => $uploadImage(`${getFetchHost(API)}/api/daren/img/upload`, file, filename);

export const $login = params => $hxPost(`${getFetchHost(API)}/api/hx/user/login`, params);
export const $register = params => $hxPost(`${getFetchHost(API)}/api/hx/user/signup`, params);

// user
export const $getUsers = params =>  $hxPost(`${getFetchHost(API)}/api/hx/user/get`, params);

export const $updateUsers = params => $hxPost(`${getFetchHost(API)}/api/hx/user/update`, params)

export const $deleteUsers = params => $hxPost(`${getFetchHost(API)}/api/hx/user/delete`, params)

//chapter
export const $fetchChapter = params =>  $hxPost(`${getFetchHost(API)}/api/hx/chapter/find`, params);

export const $addChapter = params =>  $hxPost(`${getFetchHost(API)}/api/hx/chapter/add`, params);

//comment
export const $submitComment = params =>  $hxPost(`${getFetchHost(API)}/api/hx/chapter/comments/add`, params);

export const $fetchChapterComment = params =>  $hxPost(`${getFetchHost(API)}/api/hx/chapter/comments/get`, params);


// forum
export const $fetchForum = params => $hxPost(`${getFetchHost(API)}/api/hx/forum/get`, params);

export const $addForum = params => $hxPost(`${getFetchHost(API)}/api/hx/forum/add`, params);

export const $getForum = params => $hxPost(`${getFetchHost(API)}/api/hx/forum/get`, params);

export const $fetchForumDetail = params => $hxPost(`${getFetchHost(API)}/api/hx/forum/search`, params);

export const $submitForumComment = params =>  $hxPost(`${getFetchHost(API)}/api/hx/forum/comments/add`, params);

export const $fetchForumComment = params =>  $hxPost(`${getFetchHost(API)}/api/hx/forum/comments/get`, params);