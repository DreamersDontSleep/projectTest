<template>
	<div>
		<div class="search-header">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline" style="display:inline-block">
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
			<div class="carousel">
				<div class="content">
					<div class="chart">
						<div class="title">战争统计</div>
						<ve-ring
							height="calc(100% - 24px)"
							:judge-width="true"
							:resizeable="true"
							:colors="colors"
							:legend="legend"
							:settings="trendChartSettings"
							:extend="extend"
							:data="warData"
							:events="warPie"
						></ve-ring>
					</div>
					<el-divider direction="vertical"></el-divider>
					<div class="info">
						<div class="info-title">统计信息</div>
						<div class="info-legend">
							<div v-for="(color, name) in colorMatch" :key="color">
								<span :style="{ 'background-color': color }" class="legend"></span>
								<span>{{ name }}</span>
							</div>
						</div>
						<el-scrollbar :native="false" :noresize="false">
							<ul>
								<li
									v-for="(item, index) in ideaEssay"
									:key="item.uuid"
									@click="showEssay(item, '意识形态')"
								>
									<el-tooltip
										v-if="item.country.length > 4"
										class="title"
										effect="dark"
										:content="item.country"
										placement="left"
									>
										<span class="title" :style="{ 'background-color': colorMatch[item.type] }">{{
											item.country
										}}</span>
									</el-tooltip>
									<span v-else class="title" :style="{ 'background-color': colorMatch[item.type] }">{{
										item.country
									}}</span>
									<span>{{ item.time + "&nbsp" + item.content }}</span>
								</li>
							</ul>
						</el-scrollbar>
					</div>
				</div>
			</div>
		</div>
		<el-dialog class="read-dialog" :title="readTitle" :visible.sync="dialogVisible" width="60%">
			<el-timeline>
				<el-scrollbar :native="false" :noresize="false" ref="scroll">
					<el-timeline-item
						v-for="item in warItems"
						:color="item.color"
						:key="item.warName"
						:timestamp="item.time"
						placement="top"
					>
						<el-card>
							<h4>{{ item.warName }}</h4>
							<p
								class="ellipsis war-content"
								@click="showEssay({ country: item.time, content: item.content }, item.warName)"
							>
								{{ item.content }}
							</p>
						</el-card>
					</el-timeline-item>
				</el-scrollbar>
			</el-timeline>
			<el-pagination
				:hide-on-single-page="true"
				:pager-count="5"
				style="text-align: right"
				background
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				layout="prev, pager, next"
				:page-count="total"
			>
			</el-pagination>
		</el-dialog>
		<!--        文章显示-->
		<el-dialog class="read-dialog" :title="readTitle" :visible.sync="dialogTextVisible" width="60%">
			<span class="read-text">{{ dialogText }}</span>
		</el-dialog>
	</div>
</template>

<script>
	import { colors } from "config/base.js";
	import { sliceShow, concatBy } from "utils/common.js";
	import mixin from "components/mixins";
	import { getCountryList } from "api/common.js";
	import { getWar } from "api/history.js";

	export default {
		name: "Oldwar",
		mixins: [mixin],
		data() {
			this.extend = {
				series: {
					type: "pie",
					roseType: "radius",
					radius: [0, "60%"],
					avoidLabelOverlap: false,
					//标签
					label: {
						show: true,
						position: "outside",
						formatter: "{b}:{d}%", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
					},
				},
			};
			this.warPie = {
				click: this.warEvent,
			};
			return {
				countryList: [],
				searchForm: {
					country: "",
				},
				//文章弹窗
				dialogVisible: false,
				dialogTextVisible: false,
				dialogText: "",
				readTitle: "",
				warData: {
					columns: ["时期", "数量"],
					rows: [],
				},
				allData: [],
				ideaEssay: [],
				currentPage: 1,
				total: 0,
				warItems: [],
				allWar: [],
			};
		},
		mounted() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = "中国";
				this.getWarData();
			});
		},
		methods: {
			//展示文章
			showEssay(content, name) {
				this.dialogTextVisible = true;
				this.readTitle = name + " - " + content.country;
				this.dialogText = content.content;
			},
			search() {
				this.getWarData();
			},
			getWarData() {
				getWar(this.searchForm)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.warData.rows = [
								{
									时期: "暂无数据",
									数量: 0,
								},
							];
							return;
						}
						this.allData = res.data;
						this.warData.rows = [];
						let nationArr = [];
						for (let key in this.allData) {
							let data = this.allData[key];
							nationArr.push({
								时期: key,
								数量: data.length,
							});
						}
						this.warData.rows = nationArr;
					})
					.catch(() => {
						this.warData.rows = [
							{
								时期: "暂无数据",
								数量: 0,
							},
						];
					});
			},
			warEvent(e) {
				this.readTitle = e.name;
				this.dialogVisible = true;
				let data = this.allData[e.name].map((cur) => {
					return {
						time: cur.octime,
						content: cur.content,
						warName: cur.country + "：" + cur.name,
					};
				});
				this.allWar = this._.chunk(data, 4);
				this.total = this.allWar.length;
				this.warItems = this.allWar[0];
			},
			handleCurrentChange(val) {
				this.warItems = this.allWar[val - 1];
			},
		},
	};
</script>

<style scoped lang="scss">
	ul {
		margin: 0;
		padding: 0;
	}
	.carousel {
		height: calc(100% - 0px);
		.content {
			height: calc(100% - 0px);
		}
	}

	.info-title ~ .el-scrollbar[data-v-e8c14a5c] {
		height: calc(100% - 0px);
	}

	/*最外层的滚动*/
	.el-scrollbar {
		height: calc(100% - 0px);

		/deep/ .el-scrollbar__view {
			height: calc(100% - 8px);
		}
	}

	.trend-chart {
		height: 80% !important;
	}
	.info .el-scrollbar {
		height: calc(100% - 46px);
	}
	.war-content {
		cursor: pointer;
	}
	.el-timeline {
		margin-top: 10px;
		height: calc(100% - 46px);
	}
</style>
