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
						<p class="ellipsis war-content" @click="showEssay(item)">{{ item.content }}</p>
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
		<!--        文章显示-->
		<el-dialog class="read-dialog" :title="readTitle" :visible.sync="dialogVisible" width="60%">
			<span class="read-text">{{ dialogText }}</span>
		</el-dialog>
	</div>
</template>

<script>
	import { getCountryList } from "api/common.js";
	import { getWarIdea } from "api/polls.js";

	export default {
		name: "War",
		data() {
			return {
				countryList: [],
				searchForm: {
					country: "",
				},
				//文章弹窗
				dialogVisible: false,
				dialogText: "",
				currentPage: 1,
				total: 0,
				warItems: [],
				allWar: [],
			};
		},
		created() {
			getCountryList().then((res) => {
				this.countryList = res.data;
			});
			this.getData(this.searchForm);
		},
		methods: {
			//展示文章
			showEssay(item) {
				this.dialogVisible = true;
				this.readTitle = item.warName + " - " + item.time;
				this.dialogText = item.content;
			},
			search() {
				this.getData(this.searchForm);
			},
			getData() {
				getWarIdea(this.searchForm)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.warItems = [
								{
									time: "无",
									warName: "无",
									content: "无",
								},
							];
							return;
						}
						let data = res.data.map((cur) => {
							return {
								time: cur.time,
								content: cur.content,
								warName: cur.country + "：" + cur.title,
							};
						});
						this.allWar = this._.chunk(data, 4);
						this.total = this.allWar.length;
						this.warItems = this.allWar[0];
					})
					.catch(() => {
						this.warItems = [
							{
								time: "无",
								warName: "无",
								content: "无",
							},
						];
					});
			},
			handleCurrentChange(val) {
				this.warItems = this.allWar[val - 1];
			},
		},
	};
</script>

<style scoped lang="scss">
	/*ul {*/
	/*    margin: 0;*/
	/*    padding: 0;*/
	/*}*/

	.el-timeline {
		margin-top: 10px;
		height: calc(100% - 102px);
	}
	.war-content {
		cursor: pointer;
	}
</style>
