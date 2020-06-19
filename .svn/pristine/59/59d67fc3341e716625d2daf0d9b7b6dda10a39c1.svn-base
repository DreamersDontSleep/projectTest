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
			<div class="carousel-switch-items clearfix">
				<span :class="activItem === 'construction' ? 'actived' : ''" @click="switchItem('construction')"
					>规划方案</span
				>
				<span :class="activItem === 'organization' ? 'actived' : ''" @click="switchItem('organization')"
					>组织机构</span
				>
			</div>
			<!--滚动图-->
			<el-carousel :autoplay="false" :interval="3000" class="carousel" indicator-position="none" ref="carousel">
				<el-carousel-item v-for="item in items" :key="item" :name="item">
					<div v-if="'organization' === item" class="org-content">
						<loading v-show="loading"></loading>
						<vue2-org-tree
							name="test"
							v-show="!loading"
							:data="treeData"
							:horizontal="horizontal"
							:collapsable="collapsable"
							:label-class-name="labelClassName"
							:render-content="renderContent"
							@on-expand="onExpand"
							@on-node-click="onNodeClick"
						/>
					</div>
					<div v-if="'construction' === item" class="content">
						<div class="chart">
							<div class="title">军情统计</div>
							<ve-ring
								height="100%"
								:colors="colors"
								:judge-width="true"
								:resizeable="true"
								:settings="chartSettings"
								:extend="pieExtend"
								:data="chartData"
							></ve-ring>
						</div>
						<el-divider direction="vertical"></el-divider>
						<div class="info">
							<div class="info-title">军情信息</div>
							<!-- <div class="info-legend">
								<div v-for="(color, name) in colorList" :key="color">
									<span :style="{ 'background-color': color }" class="legend"></span>
									<span>{{ name }}</span>
								</div>
							</div> -->
							<el-scrollbar :native="false" :noresize="false">
								<ul>
									<li
										v-for="(item, index) in constructionEssay"
										:key="item.content"
										@click="showEssay(item, '军情信息')"
									>
										<el-tooltip
											v-if="item.type.length > 4"
											class="title"
											effect="dark"
											:content="item.type"
											placement="left"
										>
											<span class="title" :style="{ 'background-color': colorList[item.type] }">{{
												item.type
											}}</span>
										</el-tooltip>
										<span v-else class="title" :style="{ 'background-color': colorList[item.type] }"
											>{{ item.type }}
										</span>
										<span>{{
											(item.time ? $moment(item.time).format("YYYY-MM-DD HH:mm:hh") : "") +
												item.content
										}}</span>
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
				</el-carousel-item>
			</el-carousel>
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
	import { colors, bgColor } from "config/base.js";
	import mixin from "components/mixins";
	import { getCountryList } from "api/common.js";
	import { getPosTree, getCategoryInfos } from "api/military.js";
	import loading from "components/loading";

	export default {
		name: "Tracking",
		mixins: [mixin],
		components: {
			loading,
		},
		data() {
			this.colorMatch = {
				建设规划: colors[0],
				改革方案: colors[1],
				条令法规: colors[2],
				无: bgColor,
			};
			this.match = {
				"0": "建设规划",
				"1": "改革方案",
				"2": "条令法规",
			};
			this.pieExtend = {
				series: {
					type: "pie",
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
				loading: false,
				countryList: [],
				searchForm: {
					country: "",
					pageNum: 1,
					pageSize: 20,
					parentType: "军情信息跟踪",
				},
				total: 0,
				//滚动图默认激活经济趋势
				activItem: "organization",
				//滚动项
				items: ["organization", "construction"],
				//组织架构
				treeData: {
					label: "暂无数据",
				},
				horizontal: false,
				collapsable: true,
				expandAll: true,
				labelClassName: "bg-white",
				chartSettings: {
					roseType: "radius",
					offsetY: "50%",
					radius: ["20%", "60%"],
				},
				textDialogVisible: false,
				readTitle: "",
				dialogText: "",
				constructionEssay: [],
				chartData: {
					columns: ["名称", "数量"],
					rows: [],
				},
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
		computed: {
			colorList() {
				return this.colorMatch;
			},
		},
		methods: {
			//展示文章
			showEssay(content, name) {
				this.textDialogVisible = true;
				this.readTitle = name + " - " + content.type;
				this.dialogText = content.content;
			},
			//切换
			switchItem(val) {
				this.activItem = val;
				this.$refs["carousel"].setActiveItem(val);
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
			search() {
				this.getPosTreeData();
				this.getInfo(this.searchForm);
			},
			getPosTreeData() {
				this.loading = true;
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
						this.loading = false;
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
				getCategoryInfos(data)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.constructionEssay = [
								{
									type: "无",
									content: "暂无数据",
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
						this.constructionEssay = [];
						this.chartData.rows = [];
						//取出所有的信息
						let info = Object.values(res.data);
						for (let key of info) {
							key.forEach((cur) => {
								let type = this.match[String(cur.childType)];
								this.constructionEssay.push(Object.assign(cur, { type }));
							});
						}
						let type = Object.keys(res.data);
						//统计各类别数量
						type.forEach((cur) => {
							this.chartData.rows.push({
								名称: cur,
								数量: res.data[cur].length,
							});
						});
					})
					.catch(() => {
						this.constructionEssay = [
							{
								type: "无",
								content: "暂无数据",
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

	.org-content {
		height: 100%;
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

	.el-scrollbar {
		height: calc(100% - 42px);
	}
</style>
