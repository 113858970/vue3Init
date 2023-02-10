import { Toast } from 'vant';
import { getStorage } from "@/utils/storage";
//判断是否为空
export const validatanull = (val) => {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}


//金额千分位分割
export const toPrice = (num) => {
  if (num || num == 0) {
    if (num == 0) {
      return '0'
    }

    if (typeof num == 'number') {
      num = num.toString()
    }
    num = num.split(".")
    num.length == 1 ? num.push('0') : ''
    if (num.length == 2 && parseInt(num[1]) > 0) {
      num[1] = num[1].substr(0, 2)
    }
    num[0] = num[0].replace(new RegExp('(\\d)(?=(\\d{3})+$)', 'ig'), "$1,");

    if (num[1].length) {
      if (num[1].length == 1) {
        num[1] += "0"
      }
    } else {
      num[1] = "00"
    }
    if (num[1] == '00') {
      return num[0]
    } else {
      return num.join(".");
    }
  } else {
    return '-'
  }
}
/*
页面跳转
param:{
  route:跳转的路由地址
  store:外部传入的useStore
  router:外部传入的useRouter
}
*/
export const gotoPage = (route, store, router) => {
  if (!route || !store || !router) return
  let navList = store.state.navList;
  let tabsList = store.state.tabsList;
  let cashRoute = {}
  navList.map((item, index) => {
    item.child.map((item1, index1) => {
      if (item1.child && item1.child.length && item1.child[0].category == 1) {
        item1.child.map((item2, index2) => {
          if (item2.path == route) {
            index != navList.length - 1
              ? store.commit(
                "SET_NAVVALUE",
                index + "-" + index1 + "-" + index2
              )
              : store.commit("SET_NAVVALUE", null);
            cashRoute = item2;
          }
        });
      } else {
        if (item1.path == route) {
          index != navList.length - 1
            ? store.commit("SET_NAVVALUE", index + "-" + index1)
            : store.commit("SET_NAVVALUE", null);
          cashRoute = item1;
        }
      }
    });
  });
  if (cashRoute.path) {
    let btn = false;
    tabsList.map((item2) => {
      if (item2.path == route) {
        btn = true;
      }
    });
    if (!btn) {
      setTimeout(() => {
        tabsList.push(cashRoute);
        store.commit("SET_TABSLIST", tabsList);
      }, 100);
    }
    store.commit("SET_TABSVALUE", route);
    router.push({
      path: route,
    });
  } else {
    Toast({
      message: getStorage("language") == 'zh' ? '暂无该页面权限' : 'Tạm không có quyền hạn đối với trang này',
      type: "fail",
    });
  }
};
/**
 * 对象深拷贝
 */
export const deepClone = data => {
  var type = getObjType(data);
  var obj;
  if (type === 'array') {
    obj = [];
  } else if (type === 'object') {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === 'array') {
    for (var i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]));
    }
  } else if (type === 'object') {
    for (var key in data) {
      obj[key] = deepClone(data[key]);
    }
  }
  return obj;
};
export const getObjType = obj => {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (obj instanceof Element) {
    return 'element';
  }
  return map[toString.call(obj)];
};

/**
 * @description:获取所有的el-svg-icon组件名
 */
export const icons = () => {
  const components = require("@element-plus/icons-vue");

  const names = [];
  for (const key in components) {
    names.push(components[key].name);
  }
  return names;
};
