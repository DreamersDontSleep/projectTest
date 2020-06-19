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
			<el-scrollbar :native="false" :noresize="true">
				<div class="carousel">
					<div class="content">
						<div class="chart">
							<div class="title">组织架构</div>
							<div class="org-content">
								<vue2-org-tree
									name="test"
									:data="treeData"
									:horizontal="horizontal"
									:collapsable="collapsable"
									:label-class-name="labelClassName"
									:render-content="renderContent"
									@on-expand="onExpand"
									@on-node-click="onNodeClick"
								/>
							</div>
						</div>
						<el-divider direction="vertical"></el-divider>
						<div class="info">
							<div class="info-title">重要岗位分析</div>
						</div>
					</div>
					<el-divider></el-divider>
					<div class=" content sec-content">
						<div class="info" style="width: 100%">
							<div class="sec-title">分析信息</div>
							<el-scrollbar :native="false" :noresize="false">
								<ul>
									<li
										v-for="(item, index) in partyEssay"
										:key="item.content"
										@click="showEssay(item, '军情信息')"
									>
										<el-tooltip
											v-if="item.time.length > 11"
											class="title"
											effect="dark"
											:content="item.time"
											placement="left"
										>
											<span class="title" :style="{ 'background-color': bgColor }">{{
												item.time ? $moment(item.time).format("YYYY-MM-DD") : ""
											}}</span>
										</el-tooltip>
										<span v-else class="title" :style="{ 'background-color': bgColor }"
											>{{ item.time ? $moment(item.time).format("YYYY-MM-DD") : "" }}
										</span>
										<span>{{ item.content }}</span>
									</li>
								</ul>
							</el-scrollbar>
							<!-- :hide-on-single-page="true" -->
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
			</el-scrollbar>
		</div>
	</div>
</template>

<script>
	import { colors, bgColor } from "config/base.js";
	import { sliceShow, concatBy } from "utils/common.js";
	import mixin from "components/mixins";
	import { getCountryList } from "api/common.js";
	import { getPartyDetail, getPartyProfile, getMember, getPosTree, getInfos } from "api/politics.js";

	export default {
		name: "Party",
		mixins: [mixin],

		data() {
			this.extend = {
				series: {
					type: "pie",
					center: ["50%", "50%"],
					avoidLabelOverlap: false,
					//标签
					label: {
						show: true,
						position: "outside",
						formatter: "{b}:{d}%", //模板变量有 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。{d}数据会根据value值计算百分比
					},
				},
			};
			this.partyPie = {
				click: this.partyEvent,
			};
			return {
				countryList: [],
				dialogVisible: false,
				total: 0,
				searchForm: {
					country: "",
					pageNum: 1,
					pageSize: 20,
					parentType: "政情实时信息跟踪",
				},
				total: 0,
				chartData: {
					columns: [],
					rows: [],
				},
				trendTitle: "",
				partyDetailItems: [],
				//组织架构
				treeData: {
					label: "暂无数据",
					children: [],
				},
				horizontal: false,
				collapsable: true,
				expandAll: true,
				labelClassName: "bg-white",
				partyEssay: [],
			};
		},
		created() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = "美国";
				this.getPosTreeData();
				this.getInfo(this.searchForm);
			});
		},
		methods: {
			search() {
				this.getPosTreeData();
				this.getInfo(this.searchForm);
			},
			renderContent(h, data) {
				return data.label;
			},
			onExpand(e, data) {
				if ("expand" in data) {
					data.expand = !data.expand;
					if (!data.expand && data.children) {
						this.collapse(data.children);
					}
				} else {
					this.$set(data, "expand", true);
				}
				e.stopPropagation();
			},
			onNodeClick(e, data) {
				this.dialogVisible = true;
			},
			collapse(list) {
				var _this = this;
				list.forEach(function(child) {
					if (child.expand) {
						child.expand = false;
					}
					child.children && _this.collapse(child.children);
				});
			},
			expandChange() {
				this.toggleExpand(this.treeData, this.expandAll);
			},
			toggleExpand(data, val) {
				var _this = this;
				if (Array.isArray(data)) {
					data.forEach(function(item) {
						_this.$set(item, "expand", val);
						if (item.children) {
							_this.toggleExpand(item.children, val);
						}
					});
				} else {
					this.$set(data, "expand", val);
					if (data.children) {
						_this.toggleExpand(data.children, val);
					}
				}
			},
			getPosTreeData() {
				getPosTree({
					country: this.searchForm.country,
				})
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.treeData = {
								label: "暂无数据",
								children: [],
							};
							return;
						}
						this.treeData = this.change(res.data)[0];
					})
					.catch(() => {
						this.treeData = {
							label: "暂无数据",
							children: [],
						};
					})
					.finally(() => {
						this.$nextTick(function() {
							this.expandChange();
						});
					});
			},
			change(data) {
				return data.map((cur) => {
					return {
						label: cur.name,
						children: cur.childOrgs ? this.change(cur.childOrgs) : [],
					};
				});
			},
			getInfo(data) {
				getInfos(data)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.partyEssay = [
								{
									time: "无",
									content: "暂无数据",
								},
							];
							return;
						}
						this.total = res.data.count;
						delete res.data.count;
						//取出所有的类别
						this.partyEssay = [];
						this.chartData.rows = [];
						//取出所有的信息
						let info = Object.values(res.data);
						for (let key of info) {
							key.forEach((cur) => {
								this.partyEssay.push({
									time: cur.time ? this.$moment(cur.time).format("YYYY-MM-DD") : "无",
									content: cur.content,
								});
							});
						}
					})
					.catch(() => {
						this.partyEssay = [
							{
								time: "无",
								content: "暂无数据",
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
			// getPartyProfileData() {
			// 	getPartyProfile(this.searchForm)
			// 		.then((res) => {
			// 			if (this.$check.isNullData(res)) {
			// 				this.chartData.columns = ["暂无数据", "数值"];
			// 				this.chartData.rows = [
			// 					{
			// 						暂无数据: "暂无数据",
			// 						数值: 0,
			// 					},
			// 				];
			// 				return;
			// 			}
			// 			this.chartData.columns = ["政党", "政党人数"];
			// 			this.chartData.rows = [];
			// 			res.data[0].party.forEach((cur) => {
			// 				this.chartData.columns.push(cur.name);
			// 				this.chartData.rows.push({
			// 					政党: cur.name,
			// 					政党人数: cur.memberCount,
			// 				});
			// 			});
			// 		})
			// 		.catch(() => {
			// 			this.chartData.columns = ["暂无数据", "数值"];
			// 			this.chartData.rows = [
			// 				{
			// 					暂无数据: "暂无数据",
			// 					数值: 0,
			// 				},
			// 			];
			// 		});
			// },
			// partyEvent(e) {
			// 	console.log(e);
			// },
			// partyDetail(item) {
			// 	this.dialogVisible = true;
			// 	this.trendTitle = item.name;
			// 	getPartyDetail({ partyUuid: item.uuid })
			// 		.then((res) => {
			// 			if (this.$check.isNullData(res)) {
			// 				this.partyDetailItems = [];
			// 				return;
			// 			}
			// 			this.partyDetailItems.push(res.data);
			// 		})
			// 		.catch(() => {
			// 			this.partyDetailItems = [];
			// 		});
			// },
		},
	};
</script>

<style scoped lang="scss">
	ul {
		margin: 0;
		padding: 0;
	}
	.sec-content {
		.info {
			width: 100%;
		}
	}
	.main-content .carousel {
		height: calc(100% - 0px);
	}

	.party-tag {
		margin: 4px;
		cursor: pointer;
	}

	.carousel .chart {
		width: 65.333333%;
	}
	.carousel .info {
		width: 32.666666%;
	}

	.org-content {
		height: calc(100% - 16px);
		display: flex;
		justify-content: center;
	}

	.org-tree-container {
		overflow: auto;
		color: #303133;
	}

	/deep/ .org-tree-node-label {
		cursor: pointer;
	}
	/deep/ .el-scrollbar__view {
		height: calc(100% - 27px);
	}
</style>
