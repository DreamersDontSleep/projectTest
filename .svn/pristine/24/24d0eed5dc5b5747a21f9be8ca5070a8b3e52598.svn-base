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
					<div class="title">意识统计</div>
					<ve-ring
						height="calc(100% - 24px)"
						:judge-width="true"
						:resizeable="true"
						:colors="colors"
						:extend="extend"
						:settings="trendChartSettings"
						:data="culturalData"
					></ve-ring>
				</div>
				<el-divider direction="vertical"></el-divider>
				<div class="info">
					<div class="info-title">统计信息</div>
					<el-scrollbar :native="false" :noresize="false">
						<ul>
							<li
								v-for="(item, index) in culturalEssay"
								:key="item.uuid"
								@click="showEssay(item, '意识形态')"
							>
								<el-tooltip
									v-if="colorList[item.type].length > 4"
									class="title"
									effect="dark"
									:content="colorList[item.type]"
									placement="left"
								>
									<span
										class="title"
										:style="{ 'background-color': colorMatch[colorList[item.type]] }"
										>{{ colorList[item.type] }}</span
									>
								</el-tooltip>
								<span
									v-else
									class="title"
									:style="{ 'background-color': colorMatch[colorList[item.type]] }"
									>{{ colorList[item.type] }}</span
								>
								<span>{{ item.time + "&nbsp" + item.content }}</span>
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

		<!--        文章显示-->
		<el-dialog title="点击空白处关闭" :visible.sync="dialogVisible" width="800px">
			<span>{{ dialogText }}</span>
		</el-dialog>
	</div>
</template>

<script>
	import { colors } from "config/base.js";
	import { sliceShow, concatBy } from "utils/common.js";
	import mixin from "components/mixins";
	import { getCountryList } from "api/common.js";
	import { getIdeology, getStatics } from "api/polls.js";

	export default {
		name: "Cultural",
		mixins: [mixin],
		data() {
			this.colorMatch = {
				传统文化: colors[0],
				民俗文化: colors[1],
				礼仪文化: colors[2],
				饮食文化: colors[3],
			};
			this.extend = {
				series: {
					type: "pie",
					roseType: "radius",
					radius: [0, "60%"],
					
					//标签
					label: {
						show: true,
						position: "outside",
						formatter: "{b}", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
					},
					itemStyle: {
						color: (seriesIndex) => {
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
					parentType: "文化认同",
				},
				total: 0,
				loading: true,
				//文章弹窗
				dialogVisible: false,
				dialogText: "",
				culturalData: {
					columns: ["文化", "数量"],
					rows: [],
				},
				culturalEssay: [],
			};
		},
		created() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = "美国";
				this.getData(this.searchForm);
				this.getTypeData();
			});
		},
		computed: {
			colorList() {
				return {
					0: "传统文化",
					1: "民俗文化",
					2: "礼仪文化",
					3: "饮食文化",
				};
			},
		},
		methods: {
			//切换
			switchItem(val) {
				this.activItem = val;
				this.$refs["carousel"].setActiveItem(val);
			},
			//切换
			carouselChange(index) {
				this.activItem = this.items[index];
			},
			//展示文章
			showEssay(text) {
				this.dialogVisible = true;
				this.dialogText = text;
			},
			search() {
				this.getData(this.searchForm);
				this.getTypeData();
			},
			getTypeData() {
				getStatics({ id: 2 })
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.culturalData.rows = [
								{
									文化: "暂无数据",
									数量: 0,
								},
							];
							return;
						}
						let allData = res.data;
						this.culturalData.rows = [];
						let nationArr = [];
						for (let key in allData) {
							let data = allData[key];
							this.culturalData.columns.push(key);
							nationArr.push({
								文化: key,
								数量: data,
							});
						}
						this.culturalData.rows = nationArr;
					})
					.catch(() => {
						this.culturalData.rows = [
							{
								文化: "暂无数据",
								数量: 0,
							},
						];
					});
			},
			getData(data) {
				console.log(data);
				getIdeology(data)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.culturalEssay = [{ country: "无", content: "暂无数据", time: "" }];
							return;
						}
						this.culturalEssay = [];
						let allData = res.data;
						this.total = allData.count;
						delete allData.count;
						for (let key in allData) {
							allData[key].forEach((cur) => {
								this.culturalEssay.push({
									country: cur.country,
									content: cur.content,
									time: cur.time,
									type: cur.childType,
								});
							});
						}
					})
					.catch((err) => {
						this.culturalEssay = [{ country: "无", content: "暂无数据", time: "" }];
					});
			},
			handleSizeChange(val) {
				this.searchForm.pageSize = val;
				this.searchForm.pageNum = 1;
				this.getData(this.searchForm);
			},
			handleCurrentChange(val) {
				this.searchForm.pageNum = val;
				this.getData(this.searchForm);
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
