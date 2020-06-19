<template>
	<div>
		<div class="search-header">
			<el-form :inline="true" :model="searchForm" class="demo-form-inline">
				<el-form-item label="国家：">
					<el-select v-model="searchForm.country" placeholder="请选择国家">
						<el-option label="全部" value=""></el-option>
						<el-option v-for="item in countryList" :key="item" :label="item" :value="item"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="search">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="main-content">
			<div class="carousel nothas-items">
				<div class="content">
					<div class="chart">
						<div class="title">对外战略</div>
						<ve-pie
							height="100%"
							:judge-width="true"
							:resizeable="true"
							:colors="colors"
							:legend="legend"
							:extend="pieExtend"
							:data="chartData"
							:events="event"
						>
						</ve-pie>
					</div>
					<el-divider direction="vertical"></el-divider>
					<div class="info">
						<div class="info-title">战略信息</div>
						<el-scrollbar :native="false" :noresize="false">
							<ul>
								<li v-for="(item, index) in strategyEssay" :key="item.content" @click="showEssay(item)">
									<el-tooltip
										v-if="item.time.length >= 4"
										class="title"
										effect="dark"
										:content="item.time"
										placement="left"
									>
										<span class="title" :style="{ 'background-color': bgColor }">{{
											item.time
										}}</span>
									</el-tooltip>
									<span v-else class="title" :style="{ 'background-color': bgColor }">{{
										item.time
									}}</span>
									<span>{{ item.content }}</span>
								</li>
							</ul>
						</el-scrollbar>
						<el-pagination
							:pager-count="5"
							style="text-align: right;margin-top: 12px;"
							background
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="searchForm.pageNum"
							:page-sizes="[20, 30, 50, 80]"
							layout="sizes, prev, pager, next"
							:total="total"
						>
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
		<!--文章显示-->
		<el-dialog class="read-dialog" :title="readTitle" :visible.sync="dialogTimeVisible" width="60%">
			<el-timeline>
				<el-scrollbar :native="false" :noresize="false" ref="scroll">
					<el-timeline-item
						v-for="item in singleStrategyData"
						:color="item.color"
						:key="item.name"
						:timestamp="item.startDate ? $moment(item.startDate).format('YYYY-MM-DD HH:mm:ss') : '无'"
						placement="top"
					>
						<el-card>
							<h4>{{ item.name }}</h4>
							<p class="ellipsis war-content" @click="showEssay(item, item.name)">{{ item.details }}</p>
						</el-card>
					</el-timeline-item>
				</el-scrollbar>
			</el-timeline>
		</el-dialog>
		<el-dialog class="read-dialog" :title="readTextTitle" :visible.sync="dialogVisible" width="60%">
			<div class="read-content">
				<span class="read-text">{{ dialogText }}</span>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { colors, bgColor } from "config/base.js";
	import { sliceShow, concatBy } from "utils/common.js";
	import mixin from "components/mixins";
	import { getCountryList } from "api/common.js";
	import {
		getStrategySources,
		getStrategyProfile,
		getStrategyDetails,
		getProfileStatistic,
		getInfos,
	} from "api/politics.js";

	export default {
		name: "Strategy",
		mixins: [mixin],
		data() {
			this.event = {
				click: this.strategyEvent,
			};
			return {
				countryList: [],
				loading: false,
				total: 0,
				searchForm: {
					country: "",
					pageNum: 1,
					pageSize: 20,
					parentType: "政情实时信息跟踪",
					childType: "国家战略",
				},
				total: 0,
				//文章弹窗
				dialogVisible: false,
				dialogTimeVisible: false,
				dialogText: "",
				readTextTitle: "",
				chartData: {
					columns: [],
					rows: [],
				},
				readTitle: "",
				strategyEssay: [],
				strategyData: [],
				singleStrategyData: [],
			};
		},
		created() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = "美国";
				this.getStrategySourcesData(this.searchForm);
				this.getStrategyProfileData();
				this.getStrategyDetailsData();
			});
		},
		methods: {
			//排行颜色格式化
			ColorF(val) {
				let color = "#1989fa";
				switch (val) {
					case 0:
						color = "#f56c6c";
						break;
					case 1:
						color = "#ffb980";
						break;
				}
				return color;
			},
			//展示文章
			showEssay(item, name) {
				this.readTextTitle = name;
				this.dialogVisible = true;
				this.dialogText = item.details;
			},
			strategyEvent(e) {
				this.readTitle = "战略针对-" + e.name;
				this.dialogTimeVisible = true;
				this.singleStrategyData = this.strategyData.filter((cur) => cur.aimTarget === e.name);
			},
			search() {
				this.getStrategySourcesData(this.searchForm);
				this.getStrategyProfileData();
				this.getStrategyDetailsData();
			},
			// 预测信息
			getStrategySourcesData(data) {
				getInfos(data)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.strategyEssay = [
								{
									title: "无",
									content: "暂无数据",
								},
							];
							return;
						}
						let allData = res.data;
						this.total = allData.count;
						delete allData.count;
						let singleDatas = [];
						for (let key in allData) {
							allData[key].forEach((cur) => {
								singleDatas.push(cur);
							});
						}
						this.strategyEssay = singleDatas.map((cur) => {
							return {
								childType: cur.childType,
								content: cur.content,
								title: cur.country,
								parentType: cur.parentType,
								remark: cur.remark,
								time: this.$moment(cur.time).format("YYYY-MM-DD"),
								uuid: cur.uuid,
							};
						});
					})
					.catch(() => {
						this.strategyEssay = [
							{
								title: "无",
								content: "暂无数据",
							},
						];
					});
			},
			handleSizeChange(val) {
				this.searchForm.pageSize = val;
				this.searchForm.pageNum = 1;
				this.getStrategySourcesData(this.searchForm);
			},
			handleCurrentChange(val) {
				this.searchForm.pageNum = val;
				this.getStrategySourcesData(this.searchForm);
			},
			// 对外战略
			getStrategyProfileData() {
				getProfileStatistic({ country: this.searchForm.country })
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.chartData.columns = ["暂无数据", "数值"];
							this.chartData.rows = [
								{
									暂无数据: "暂无数据",
									数值: 0,
								},
							];
							return;
						}
						let allData = res.data;
						this.chartData.columns = ["国家", "战略数量"];
						this.chartData.rows = [];
						for (let key in allData) {
							this.chartData.rows.push({
								国家: key,
								战略数量: Number(allData[key]),
							});
						}
					})
					.catch(() => {
						this.chartData.columns = ["暂无数据", "数值"];
						this.chartData.rows = [
							{
								暂无数据: "暂无数据",
								数值: 0,
							},
						];
					});
			},
			// 战略详情
			getStrategyDetailsData() {
				getStrategyDetails({ country: this.searchForm.country })
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.strategyData = [
								{
									country: "暂无数据",
								},
							];
							return;
						}
						this.strategyData = res.data;
					})
					.catch(() => {
						this.strategyData = [
							{
								country: "暂无数据",
							},
						];
					});
			},
			unique(arr) {
				let unique = {};
				arr.forEach(function(item) {
					unique[JSON.stringify(item)] = item; //键名不会重复
				});
				arr = Object.keys(unique).map(function(u) {
					return JSON.parse(u);
				});
				return arr;
			},
		},
	};
</script>

<style scoped lang="scss">
	ul {
		margin: 0;
		padding: 0;
	}
	.el-timeline {
		margin-top: 10px;
		height: calc(100% - 0px);
	}
	.war-content {
		cursor: pointer;
	}
</style>
