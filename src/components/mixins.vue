<template>
	<div></div>
</template>

<script>
	import $ from "jquery";
	import { colors, bgColor } from "config/base.js";

	export default {
		name: "mixins",
		data() {
			this.colors = colors;
			this.Gdpextend = {
				series: {
					
					type: "line",
					symbolSize: 4,
					symbolRotate: true,
					lineStyle: {
						type: "dashed",
					},
				},
			};
			this.stockExtend = {
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "shadow",
					},
				},
				xAxis: {
					name: "日期",
					nameLocation: "end",
					type: "category",
					nameGap: 4,
					minInterval: 2,
					axisTick: {
						alignWithLabel: true,
					},
					axisLabel: {
						formatter: (value) => {
							if (value === "暂无数据") {
								return "暂无数据";
							}
							return this.$moment(value).format("YYYY-MM-DD");
						},
					},
					splitLine: {
						lineStyle: {
							type: "dashed",
						},
					},
				},
			};
			this.inflationExtend = {
				series: {
					connectNulls: true,
					areaStyle: {},
					type: "line",
				},
				xAxis: {
					boundaryGap: false,
					type: "category",
					axisTick: {
						alignWithLabel: true,
					},
					axisLabel: {
						showMinLabel: true,
						showMaxLabel: true,
						formatter: (value) => {
							return this.$moment(value).format("YYYY-MM");
						},
					},
				},
			};
			this.chartEvents = {
				click: this.chartClickEvents,
			};
			this.trendChartSettings = {
				offsetY: "50%",
				radius: ["50%", "60%"],
			};
			this.pieExtend = {
				series: {
					type: "pie",
					roseType: "radius",
					center: ["50%", "50%"],
				},
			};
			return {
				chartSettings: {
					roseType: "radius",
					offsetY: "50%",
					radius: ["20%", "60%"],
				},
				//图表配置项
				grid: [
					{
						show: true,
						bottom: "4%",
						right: "30px",
					},
				],
				//横轴以年为统计单位
				xAxisYear: {
					name: "日期",
					nameLocation: "end",
					type: "time",
					nameGap: 4,
					minInterval: 2,
					axisTick: {
						alignWithLabel: true,
					},
					axisLabel: {
						formatter: (value) => {
							return this.$moment(value).format("YYYY");
						},
					},
					splitLine: {
						lineStyle: {
							type: "dashed",
						},
					},
				},
				//横轴以月为统计单位
				xAxisMonth: {
					name: "日期",
					nameLocation: "end",
					type: "time",
					nameGap: 4,
					minInterval: 2,
					axisTick: {
						alignWithLabel: true,
					},
					axisLabel: {
						formatter: (value) => {
							return this.$moment(value).format("YYYY-MM");
						},
					},
					splitLine: {
						lineStyle: {
							type: "dashed",
						},
					},
				},
				//纵轴以十亿为单位
				yAxisBillion: [
					{
						name: "数值(单位：十亿美元)",
						nameLocation: "end",
						nameTextStyle: {
							padding: [0, 0, 0, 24],
						},
						splitLine: {
							lineStyle: {
								type: "dashed",
							},
						},
					},
				],
				//纵轴以比率为单位
				yAxisRatio: [
					{
						name: "率(%)",
						nameLocation: "end",
						nameTextStyle: {
							padding: [0, 0, 0, 24],
						},
						splitLine: {
							lineStyle: {
								type: "dashed",
							},
						},
					},
				],
				yAxis: [
					{
						nameLocation: "end",
						nameTextStyle: {
							padding: [0, 0, 0, 24],
						},
						splitLine: {
							lineStyle: {
								type: "dashed",
							},
						},
					},
				],
				legend: {
					type: "scroll",
				},
				//折线图十字交叉型指示器
				lineTooltip: {
					confine: true,
					trigger: "axis",
					axisPointer: {
						type: "cross",
						lineStyle: {
							color: "rgba(254,129,51,0.6)",
						},
					},
					enterable: true,
					hideDelay: 200,
					position: function(point, params, dom, rect, size) {
						// point: 鼠标位置
						//因为enterable:true,属性，造成的其他图得tip不消失问题
						let cell = $(dom)
							.parent()
							.parent()
							.parent()
							.siblings()
							.find(".cell-chart");
						cell.each((index, item) => {
							let children = $(item).children();
							if (children[1]) {
								$(children[1]).hide();
							}
						});

						//解决tip被遮挡或者溢出屏幕外问题
						let css = {};
						let obj = {};
						if ($(dom).height() > 220) {
							css["height"] = "220px";
							css["overflow"] = "auto";
							if ($(dom).width() > 703) {
								css["width"] = "703px";
								css["overflow"] = "auto";
							}
						} else if ($(dom).width() > 703) {
							css["width"] = "703px";
							css["overflow"] = "auto";
							if ($(dom).height() > 220) {
								css["height"] = "220px";
								css["overflow"] = "auto";
							}
						}
						if (point[0] < size.viewSize[0] / 2) {
							obj["left"] = point[0] + 20;
						} else {
							obj["right"] = size.viewSize[0] - point[0] + 30;
						}
						if (point[1] < size.viewSize[1] / 2) {
							obj["top"] = point[1] + 20;
						} else {
							obj["bottom"] = size.viewSize[1] - point[1] + 30;
						}

						$(dom).css(css);
						return obj;
					},
				},
				//柱状图等阴影指示器
				barTooltip: {
					confine: true,
					trigger: "axis",
					axisPointer: {
						type: "shadow",
					},
					enterable: true,
					hideDelay: 200,
					position: function(point, params, dom, rect, size) {
						// point: 鼠标位置
						//因为enterable:true,属性，造成的其他图得tip不消失问题
						let cell = $(dom)
							.parent()
							.parent()
							.parent()
							.siblings()
							.find(".cell-chart");
						cell.each((index, item) => {
							let children = $(item).children();
							if (children[1]) {
								$(children[1]).hide();
							}
						});

						//解决tip被遮挡或者溢出屏幕外问题
						let css = {};
						let obj = {};
						if ($(dom).height() > 220) {
							css["height"] = "220px";
							css["overflow"] = "auto";
							if ($(dom).width() > 703) {
								css["width"] = "703px";
								css["overflow"] = "auto";
							}
						} else if ($(dom).width() > 703) {
							css["width"] = "703px";
							css["overflow"] = "auto";
							if ($(dom).height() > 220) {
								css["height"] = "220px";
								css["overflow"] = "auto";
							}
						}
						if (point[0] < size.viewSize[0] / 2) {
							obj["left"] = point[0] + 20;
						} else {
							obj["right"] = size.viewSize[0] - point[0] + 30;
						}
						if (point[1] < size.viewSize[1] / 2) {
							obj["top"] = point[1] + 20;
						} else {
							obj["bottom"] = size.viewSize[1] - point[1] + 30;
						}

						$(dom).css(css);
						return obj;
					},
				},
			};
		},
		computed: {
			bgColor() {
				return bgColor;
			},
		},
		methods: {
			//排行颜色格式化
			ColorF(val) {
				//平稳
				let color = "#2F4554";
				switch (val) {
					//上升
					case 0:
						color = "#61A0A8";
						break;
					//平稳
					case 1:
						color = "#2F4554";
						break;
					//下降
					case 2:
						color = "#D53A35";
						break;
				}
				return color;
			},
		},
	};
</script>

<style scoped></style>
