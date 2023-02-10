import {
  validatanull
} from './util';

/**
* 存储Storage
* @param type 不填默认存储localStorage
*/
export const setStorage = (params = {}) => {
  let {
    name,
    content,
    type,
  } = params;
  let obj = {
    dataType: typeof (content),
    content: content,
    type: type,
    datetime: new Date().getTime()
  }
  if (type) window.sessionStorage.setItem(name, JSON.stringify(obj));
  else window.localStorage.setItem(name, JSON.stringify(obj));
}
/**
* 获取Storage
*/

export const getStorage = (name) => {
  let obj = {},
    content;
  obj = window.sessionStorage.getItem(name);
  if (validatanull(obj)) obj = window.localStorage.getItem(name);
  if (validatanull(obj)) return;
  try {
    obj = JSON.parse(obj);
  } catch (err) {
    return obj;
  }
  if (obj.dataType == 'string') {
    content = obj.content;
  } else if (obj.dataType == 'number') {
    content = Number(obj.content);
  } else if (obj.dataType == 'boolean') {
    content = eval(obj.content);
  } else if (obj.dataType == 'object') {
    content = obj.content;
  }
  return content;
}
/**
* 删除Storage
* @param type 不填默认删除localStorage
*/
export const removeStorage = (params = {}) => {
  let {
    name,
    type
  } = params;
  if (type) {
    window.sessionStorage.removeItem(name);
  } else {
    window.localStorage.removeItem(name);
  }

}

/**
* 获取全部Storage
* @param type 不填默认删除全部localStorage
*/
export const getAllStorag = (params = {}) => {
  let list = [];
  let {
    type
  } = params;
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStorage({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStorage({
          name: window.localStorage.key(i),
        })
      })

    }
  }
  return list;

}

/**
* 清空全部localStorage
*/
export const clearStorag = (params = {}) => {
  let { type } = params;
  if (type) {
    window.sessionStorage.clear();
  } else {
    window.localStorage.clear()
  }

}