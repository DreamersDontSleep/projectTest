<template>
	<div>
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
		<div class="main-content carousel">
			<div class="content">
				<div class="chart">
					<div class="title">舆情统计</div>
					<ve-pie
						height="calc(100% - 24px)"
						:colors="colors"
						:judge-width="true"
						:resizeable="true"
						:settings="chartSettings"
						:extend="extend"
						:data="chartData"
					></ve-pie>
				</div>
				<el-divider direction="vertical"></el-divider>
				<div class="info">
					<div class="info-title">舆情信息</div>
					<!-- <div class="info-legend">
						<div v-for="(color, name) in colorMatch" :key="color">
							<span :style="{ 'background-color': color }" class="legend"></span>
							<span>{{ name }}</span>
						</div>
					</div> -->
					<el-scrollbar :native="false" :noresize="false">
						<ul>
							<li
								v-for="(item, index) in opinionEssay"
								:key="item.content"
								@click="showEssay(item, '涉军舆情')"
							>
								<el-tooltip
									v-if="colorList[item.childType].length > 11"
									class="title"
									effect="dark"
									:content="colorList[item.childType]"
									placement="left"
								>
									<span
										class="title"
										:style="{ 'background-color': colorMatch[colorList[item.childType]] }"
										>{{ colorList[item.childType] }}</span
									>
								</el-tooltip>
								<span
									v-else
									class="title"
									:style="{ 'background-color': colorMatch[colorList[item.childType]] }"
									>{{ colorList[item.childType] }}</span
								>
								<span>{{
									(item.time ? $moment(item.time).format("YYYY-MM-DD HH:mm:hh") : "") + item.content
								}}</span>
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
		<!--        文章-->
		<el-dialog class="read-dialog" :title="readTitle" :visible.sync="textDialogVisible" width="800px">
			<div class="read-content">
				<span class="read-text">{{ dialogText }}</span>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { colors } from "config/base.js";
	import mixin from "components/mixins";
	import { getCountryList } from "api/common.js";
	import { getCategoryInfos } from "api/military.js";

	export default {
		name: "Opinion",
		mixins: [mixin],
		data() {
			this.colorMatch = {
				内部矛盾: colors[0],
				军政矛盾: colors[1],
				军队矛盾: colors[2],
			};
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
					itemStyle: {
						color: (seriesIndex) => {
							if (seriesIndex.name === "暂无数据") {
								return "#D53A35";
							}
							return this.colorMatch[seriesIndex.name];
						},
					},
				},
			};
			return {
				countryList: [],
				searchForm: {
					country: "",
					pageNum: 1,
					pageSize: 20,
					parentType: "涉军舆情",
				},
				total: 0,
				chartSettings: {
					roseType: "radius",
					offsetY: "50%",
				},
				chartData: {
					columns: ["名称", "数量"],
					rows: [],
				},
				textDialogVisible: false,
				readTitle: "",
				dialogText: "",
				opinionEssay: [],
			};
		},
		created() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = "美国";
				this.getInfo(this.searchForm);
			});
		},
		computed: {
			colorList() {
				return {
					0: "无",
					16: "军政矛盾",
					17: "军队矛盾",
					15: "内部矛盾",
				};

				this.colorMatch;
			},
		},
		methods: {
			//展示文章
			showEssay(content, name) {
				this.textDialogVisible = true;
				this.readTitle = name + " - " + content.country;
				this.dialogText = content.content;
			},
			search() {
				this.loading = true;
				this.getInfo(this.searchForm);
			},
			getInfo(data) {
				getCategoryInfos(data)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.opinionEssay = [
								{
									content: "暂无数据",
									childType: 0,
								},
							];
							this.chartData.rows = [
								{
									名称: "暂无数据",
									数量: 0,
								},
							];
							return;
						}
						this.total = res.data.count;
						delete res.data.count;
						//取出所有的类别
						this.opinionEssay = [];
						this.chartData.rows = [];
						let type = Object.keys(res.data);
						//统计各类别数量
						type.forEach((cur) => {
							this.chartData.rows.push({
								名称: cur,
								数量: res.data[cur].length,
							});
						});
						//取出所有的信息
						let info = Object.values(res.data);
						for (let key of info) {
							key.forEach((cur) => {
								this.opinionEssay.push(cur);
							});
						}
					})
					.catch(() => {
						this.opinionEssay = [
							{
								content: "暂无数据",
								childType: 0,
							},
						];
						this.chartData.rows = [
							{
								名称: "暂无数据",
								数量: 0,
							},
						];
					});
			},
			handleSizeChange(val) {
				this.searchForm.pageSize = val;
				this.searchForm.pageNum = 1;
				this.getInfo(this.searchForm);
			},
			handleCurrentChange(val) {
				this.searchForm.pageNum = val;
				this.getInfo(this.searchForm);
			},
		},
	};
</script>

<style scoped lang="scss">
	ul {
		margin: 0;
		padding: 0;
	}
</style>
