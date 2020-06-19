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
		<div class="main-content carousel">
			<div class="no-title-content">
				<loading v-show="loading"></loading>
				<vue2-org-tree
					name="test"
					v-show="!loading"
					:data="treeData"
					:horizontal="horizontal"
					:collapsable="collapsable"
					:render-content="renderContent"
					@on-expand="onExpand"
					@on-node-click="onNodeClick"
				/>
			</div>
		</div>
		<!--主要职责-->
		<el-dialog class="small-read-dialog" :title="readTitle" :visible.sync="textDialogVisible" width="30%">
			<div class="text item">
				<span class="title">部门名称</span>
				<span class="content">
					{{ readContent.department }}
				</span>
			</div>
			<div class="text item">
				<span class="title">主要负责人</span>
				<span class="content">
					{{ readContent.person }}
				</span>
			</div>
			<div class="text item">
				<span class="title">负责人职务</span>
				<span class="content">
					{{ readContent.job }}
				</span>
			</div>
			<div class="text item big">
				<span class="title" style="vertical-align: top;height: 205px;line-height: 205px;">部门职责</span>
				<span class="content read-text">
					<el-scrollbar :native="false" :noresize="false">
					{{ readContent.duty }}
					</el-scrollbar>
				</span>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { getCountryList } from "api/common.js";
	import { getPosTree } from "api/diplomatic.js";
	import loading from "components/loading";

	export default {
		name: "Agency",
		data() {
			return {
				loading: false,
				countryList: [],
				searchForm: {
					country: "",
				},
				//组织架构
				treeData: {
					label: "暂无数据",
				},
				horizontal: false,
				collapsable: true,
				expandAll: true,
				textDialogVisible: false,
				readTitle: "部门详情",
				readContent: "",
			};
		},
		mounted() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = "中国";
				this.getPosTreeData();
			});
		},
		methods: {
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
				this.textDialogVisible = true;
				this.readContent = data;
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
				console.log(data)
				
				if (Array.isArray(data)) {
					data.forEach(function(item) {
						// console.log(data,item);
						
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
							// console.log(this.treeData);
							this.expandChange();
						});
					});
			},
			change(data) {
				return data.map((cur) => {
					return {
						label: cur.department ? cur.department : "无",
						country: cur.country ? cur.country : "无",
						department: cur.department ? cur.department : "无",
						duty: cur.duty ? cur.duty : "无",
						job: cur.job ? cur.job : "无",
						person: cur.person ? cur.person : "无",
						children: cur.children ? this.change(cur.children) : [],
					};
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

	.text {
		font-size: 14px;
	}

	.carousel {
		height: calc(100% - 72px);
	}

	.org-content {
		height: 100%;
		display: flex;
		justify-content: center;
	}

	.org-tree-container {
		// overflow: auto;
		color: #303133;
	}

	/deep/ .org-tree-node-label {
		cursor: pointer;
	}
</style>
