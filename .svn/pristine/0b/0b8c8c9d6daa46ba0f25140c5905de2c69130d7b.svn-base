<template>
	<div style="height: 100%">
		<div class="search-header">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline">
				<el-form-item label="国家：">
					<el-select v-model="searchForm.country" placeholder="请选择国家">
						<el-option v-for="item in countryList" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="main-content">
			<baidu-map class="map" :scroll-wheel-zoom="true" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
			<div class="infos leftBottom">左下角</div>
			<div class="infos rightBottom">右下角</div>
		</div>
		<!--主要职责-->
		<!-- <el-dialog class="small-read-dialog" :title="readTitle" :visible.sync="textDialogVisible" width="32%">
			<el-scrollbar :native="false" :noresize="false">
				<div class="text item">
					<span class="title">领馆名称</span>
					<span class="content">
						{{ readContent.name ? readContent.name : "无" }}
					</span>
				</div>
				<div class="text item">
					<span class="title">总领事</span>
					<span class="content">
						{{ readContent.consul ? readContent.consul : "无" }}
					</span>
				</div>
				<div class="text item">
					<span class="title">位置</span>
					<span class="content">{{ readContent.area ? readContent.area : "无" }}</span>
				</div>
				<div class="text item">
					<span class="title">国家地区号</span>
					<span class="content">{{ readContent.cacode ? readContent.cacode : "无" }}</span>
				</div>
				<div class="text item">
					<span class="title">电话</span>
					<span class="content">{{ readContent.phone ? readContent.phone : "无" }}</span>
				</div>
				<div class="text item">
					<span class="title">传真</span>
					<span class="content">{{ readContent.fax ? readContent.fax : "无" }}</span>
				</div>
				<div class="text item">
					<span class="title">网址</span>
					<span class="content">{{ readContent.web ? readContent.web : "无" }}</span>
				</div>
				<div class="text item">
					<span class="title">电子邮箱</span>
					<span class="content">{{ readContent.email ? readContent.email : "无" }}</span>
				</div>
			</el-scrollbar>
		</el-dialog> -->
	</div>
</template>

<script>
	import { getCountryList } from "api/common.js";
	import { getPosTree, getDiplomatic } from "api/diplomatic.js";

	export default {
		name: "General",
		data() {
			return {
				match: {
					// 台湾: [120.9797, 23.9738],
					台湾: [104.114129, 37.550339],
					中国: [104.114129, 37.550339],
					美国: [104.114129, 37.550339],
					// 美国: [-77.0369, 38.9072],
				},
				center: { lng: 0, lat: 0 },
				zoom: 3,
				countryList: [],
				searchForm: {
					country: "",
				},
			};
		},
		mounted() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = "中国";
			});
		},
		methods: {
			search() {},
			handler({ BMap, map }) {
				console.log(BMap, map);
				console.log(this.searchForm.country);
				this.center.lng = "104.114129";
				this.center.lat = "37.550339";
				this.zoom = 6;
				// var point = new BMap.Point(116.417854, 39.921988);
				// var marker = new BMap.Marker(point); // 创建标注
				// map.addOverlay(marker); // 将标注添加到地图中
				// map.centerAndZoom(point, 15);
				// var opts = {
				// 	width: 200, // 信息窗口宽度
				// 	height: 100, // 信息窗口高度
				// 	title: "海底捞王府井店", // 信息窗口标题
				// 	enableMessage: true, //设置允许信息窗发送短息
				// 	message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~",
				// };
				// var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts); // 创建信息窗口对象
				// marker.addEventListener("click", function() {
				// 	map.openInfoWindow(infoWindow, point); //开启信息窗口
				// });

				// let mapDiv = document.getElementsByClassName("map")[0];
				// let domSize = mapDiv.getBoundingClientRect();
				// let leftBottom = [20, domSize.height - 20];

				// var p = new BMap.Pixel(leftBottom[0], leftBottom[1]);
				// var point1 = map.pixelToPoint(p);
				// console.log(point1);
			},
		},
	};
</script>

<style scoped lang="scss">
	ul {
		margin: 0;
		padding: 0;
	}

	.map {
		width: 100%;
		height: 100%;
	}
	/deep/ .BMap_cpyCtrl,
	/deep/ .anchorBL {
		display: none;
	}
	.main-content {
		position: relative;
	}
	.infos {
		color: #606266;
		font-size: 16px;
		position: absolute;
        bottom: 0px;
        width: 30%;
        height: 40%;
        background-color: palegoldenrod;
	}
	.leftBottom {
		left: 0px;
	}
	.rightBottom {
		right: 0px;
	}
</style>
