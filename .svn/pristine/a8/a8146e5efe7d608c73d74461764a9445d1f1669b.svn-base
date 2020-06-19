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
			<div id="chartHasMap"></div>
		</div>
		<!--主要职责-->
		<el-dialog class="small-read-dialog" :title="readTitle" :visible.sync="textDialogVisible" width="32%">
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
		</el-dialog>
	</div>
</template>

<script>
	import { getCountryList } from "api/common.js";
	import { getPosTree, getDiplomatic } from "api/diplomatic.js";

	import "echarts/extension/bmap/bmap.js";

	export default {
		name: "Consulate",
		data() {
			return {
				match: {
					// 台湾: [120.9797, 23.9738],
					台湾: [104.114129, 37.550339],
					中国: [104.114129, 37.550339],
					美国: [104.114129, 37.550339],
					// 美国: [-77.0369, 38.9072],
				},
				show: true,
				loading: false,
				countryList: [],
				searchForm: {
					country: "",
				},
				infos: {
					country: "",
					center: [],
				},
				chartHasMap: "",
				textDialogVisible: false,
				readTitle: "领馆详情",
				readContent: "",
			};
		},
		created() {
			// getCountryList().then(res => {
			// 	this.countryList = res.data;
			// 	this.searchForm.country = "中国";
			// 	this.infos.country = this.searchForm.country;
			// 	this.infos.center = this.match[this.searchForm.country];
			// });
		},
		mounted() {
			this.$nextTick(function() {
				getCountryList().then((res) => {
					this.countryList = res.data;
					this.searchForm.country = "中国";
					this.infos.country = this.searchForm.country;
					this.infos.center = this.match[this.searchForm.country];
				});
				window.addEventListener("resize", this.chartResize, false);
				this.getData();
			});
		},
		destroyed() {
			window.removeEventListener("resize", this.chartResize, false);
		},
		methods: {
			chartResize() {
				this.chartHasMap.resize();
			},
			search() {
				this.infos.country = this.searchForm.country;
				this.infos.center = this.match[this.searchForm.country];
				this.getData();
			},
			setOption(data, geoCoordMap) {
				let self = this;
				this.chartHasMap = this.$echarts.init(document.getElementById("chartHasMap"));
				// var data = [{ name: "青岛", value: 220 }];
				// var geoCoordMap = {
				// 	青岛: [120.33, 36.07]
				// };

				var convertData = function(data) {
					var res = [];
					for (var i = 0; i < data.length; i++) {
						var geoCoord = geoCoordMap[data[i].name];
						if (geoCoord) {
							res.push({
								name: data[i].name,
								value: geoCoord.concat(data[i].value),
							});
						}
					}
					return res;
				};

				let option = {
					title: {
						text: `${
							self.infos.country === "台湾"
								? self.infos.country + "驻外办事处"
								: self.infos.country + "驻外总领馆"
						}分布图`,
						left: "center",
					},
					tooltip: {
						trigger: "item",
						formatter: function(params) {
							// return params.seriesName + "：" + params.value[2];
							return params.name;
						},
					},
					bmap: {
						// center: [104.114129, 37.550339],
						center: self.infos.center,
						zoom: 5,
						roam: true,
						mapStyle: {
							styleJson: [
								{
									featureType: "water",
									elementType: "all",
									stylers: {
										color: "#d1d1d1",
									},
								},
								{
									featureType: "land",
									elementType: "all",
									stylers: {
										color: "#f3f3f3",
									},
								},
								{
									featureType: "railway",
									elementType: "all",
									stylers: {
										visibility: "off",
									},
								},
								{
									featureType: "highway",
									elementType: "all",
									stylers: {
										color: "#fdfdfd",
									},
								},
								{
									featureType: "highway",
									elementType: "labels",
									stylers: {
										visibility: "off",
									},
								},
								{
									featureType: "arterial",
									elementType: "geometry",
									stylers: {
										color: "#fefefe",
									},
								},
								{
									featureType: "arterial",
									elementType: "geometry.fill",
									stylers: {
										color: "#fefefe",
									},
								},
								{
									featureType: "poi",
									elementType: "all",
									stylers: {
										visibility: "off",
									},
								},
								{
									featureType: "green",
									elementType: "all",
									stylers: {
										visibility: "off",
									},
								},
								{
									featureType: "subway",
									elementType: "all",
									stylers: {
										visibility: "off",
									},
								},
								{
									featureType: "manmade",
									elementType: "all",
									stylers: {
										color: "#d1d1d1",
									},
								},
								{
									featureType: "local",
									elementType: "all",
									stylers: {
										color: "#d1d1d1",
									},
								},
								{
									featureType: "arterial",
									elementType: "labels",
									stylers: {
										visibility: "off",
									},
								},
								{
									featureType: "boundary",
									elementType: "all",
									stylers: {
										color: "#fefefe",
									},
								},
								{
									featureType: "building",
									elementType: "all",
									stylers: {
										color: "#d1d1d1",
									},
								},
								{
									featureType: "label",
									elementType: "labels.text.fill",
									stylers: {
										color: "#999999",
									},
								},
							],
						},
					},
					series: [
						{
							name: "负责人",
							type: "effectScatter",
							coordinateSystem: "bmap",
							data: convertData(data),
							symbolSize: this.show ? 10 : 0,
							showEffectOn: "render",
							rippleEffect: {
								brushType: "stroke",
							},
							hoverAnimation: true,
							label: {
								formatter: "{b}",
								position: "right",
								show: false,
							},
							itemStyle: {
								color: "purple",
								shadowBlur: 10,
								shadowColor: "#333",
							},
							zlevel: 1,
						},
					],
				};
				this.chartHasMap.setOption(option);
				this.chartHasMap.on("click", function(params) {
					data.map((cur) => {
						if (cur.name === params.name) {
							self.textDialogVisible = true;
							self.readContent = cur.all;
						}
					});
				});
			},
			getData() {
				getDiplomatic(this.searchForm)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.show = false;
							var dataNull = [{ name: this.infos.country, value: "暂无数据" }];
							var geoCoordMapNull = {
								[this.infos.country]: this.infos.center,
							};
							this.setOption(dataNull, geoCoordMapNull);
							return;
						}
						// var data = [{ name: "青岛", value: 220 }];
						// var geoCoordMap = {
						// 	青岛: [120.33, 36.07]
						// };
						this.show = true;
						let allData = res.data;
						let data = [];
						let geoCoordMap = {};
						allData.forEach((cur) => {
							data.push({
								name: cur.name,
								value: cur.consul,
								all: cur,
							});
							geoCoordMap = Object.assign(geoCoordMap, {
								[cur.name]: [cur.longitude, cur.latitude],
							});
						});
						this.setOption(data, geoCoordMap);
					})
					.catch(() => {
						this.show = true;
						var dataNull = [{ name: this.infos.country, value: "暂无数据" }];
						var geoCoordMapNull = {
							[this.infos.country]: this.infos.center,
						};
						this.setOption(dataNull, geoCoordMapNull);
					});
			},
		},
	};
</script>

<style scoped lang="scss">
	ul {
		margin: 0;
		padding: 0;
	}

	#chartHasMap {
		width: 100%;
		height: 100%;
	}
	/deep/ .BMap_cpyCtrl,
	/deep/ .anchorBL {
		display: none;
	}
</style>
