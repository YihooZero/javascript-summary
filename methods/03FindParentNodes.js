// 树形结构中查找某个节点所有的父节点
// NOTE:子节点与父节点没有parentId映射
const tree = [{
  "code": 1,
  "name": "湖北省",
  "children": [
    {
      "code": 2,
      "name": "武汉市",
      "children": [
        {
          "code": 3,
          "name": "汉阳区",
          "children": [{
            "code": 4,
            "name": "水上分局1"
          }]
        },
        {
          "code": 5,
          "name": "武昌区",
          "children": [{
            "code": 6,
            "name": "水上分局2"
          }]
        },
        {
          "code": 7,
          "name": "汉口区",
          "children": [{
            "code": 1,
            "name": "水上分局3"
          }]
        }
      ]
    },
    {
      "code": 8,
      "name": "十堰市",
      "children": [
        {
          "code": 9,
          "name": "郧阳区",
          "children": [{
            "code": 10,
            "name": "安阳镇"
          }]
        },
        {
          "code": 11,
          "name": "茅箭区",
          "children": [{
            "code": 12,
            "name": "小川乡"
          }]
        }
      ]
    }
  ]
}]

// 方法一
function treeFindPath(tree, func, path = []) {
  if (!tree) return []
  for (const item of tree) {
    // 这里按照你的需求来存放最后返回的内容吧
    path.push(item.name)
    if (func(item)) return path
    if (item.children) {
      const findChildren = treeFindPath(item.children, func, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}

console.log(treeFindPath(tree, data => data.name === '武昌区'))
// ['湖北省', '武汉市', '武昌区']

// 方法二
function getParentId(list, id) {
  for (let item of list) {
    if (item.name === id) {
      return [item.name]
    }
    if (item.children) {
      const node = getParentId(item.children, id);
      if (node) {
        return node.concat(item.name)
      }
    }
  }
}

console.log(getParentId(tree, '水上分局2'))
// ['水上分局2', '武昌区', '武汉市', '湖北省']

// 另外一种数据结构查找某个节点的所有父节点
var datas = {
  tree: [{
    name: 'name1',
    tree: [{
      name: 'name2'
    }, {
      name: 'name3'
    }, {
      name: 'name4',
      tree: [{
        name: 'name5'
      }, {
        name: 'name6'
      }]
    }, {
      name: 'name7'
    }]
  }, {
    name: 'name8',
    tree: [{
      name: 'name9'
    }]
  }]
};

function find({
                tree = [],
                ...object
              }, name) {
  var result;
  if (object.name === name) return object;
  return tree.some(o => result = find(o, name)) && Object.assign({}, object, {
    tree: [result]
  });
}
console.log(find(datas, 'name5'));
