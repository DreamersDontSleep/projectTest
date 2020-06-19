import { checkType } from "./base.js";
//截取数据
//参数一：数组类型的数据
//参数二：截取长度，默认为5
export function sliceShow(data, sliceLength = 5) {
	if (checkType(data) === "Object") {
		let spliceArr = Object.entries(data).splice(0, sliceLength);
		let obj = {};
		spliceArr.forEach(cur => {
			Object.assign(obj, { [cur[0]]: cur[1] });
		});
		return obj;
	}
	if (checkType(data) === "Array") {
		return data.splice(0, 5);
	}
}

// 数组对象根据某相同参数合并
export function concatBy(arr, name) {
	var temp = [];
	arr.forEach(item => {
		var skey = item[name];
		if (typeof temp[skey] == "undefined") {
			temp[skey] = item;
		} else {
			for (var k in item) {
				temp[skey][k] = item[k];
			}
		}
	});
	var result = [];
	for (var i in temp) {
		result.push(temp[i]);
	}
	return result;
}
