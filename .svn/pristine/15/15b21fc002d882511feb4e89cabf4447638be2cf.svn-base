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
			<el-scrollbar :native="false" :noresize="false">
				<loading v-show="loading"></loading>
				<div
					v-show="!loading"
					:style="{ 'text-align': isNull ? 'center' : '' }"
					class="structure"
					v-for="items in structureData"
					:key="items.country"
				>
					<span class="title">{{ items.country }}</span>
					<!--                <span class="title">{{'历史政党总数：' + items.totalStructure}}</span>-->
					<el-steps :active="items.totalStructure" align-center>
						<el-step
							v-for="item in items.structures"
							:key="item.uuid"
							:title="item.name"
							@click.native="showEssay(item)"
							:description="item.details"
						>
						</el-step>
					</el-steps>
				</div>
			</el-scrollbar>
		</div>
		<!--        文章显示-->
		<el-dialog title="点击空白处关闭" :visible.sync="dialogVisible" width="60%">
			<div class="time">{{ "开始时间：" + dialogText.startDate }}</div>
			<div class="time">{{ "结束时间：" + (dialogText.endDate ? dialogText.endDate : "无") }}</div>
			<span>{{ dialogText.details }}</span>
		</el-dialog>
	</div>
</template>

<script>
	import { getCountryList } from "api/common.js";
	import { getStructureProfile } from "api/politics.js";
	import loading from "components/loading";

	export default {
		name: "Party",
		components: {
			loading
		},
		data() {
			return {
				loading: false,
				isNull: true,
				countryList: [],
				dialogVisible: false,
				dialogText: "",
				searchForm: {
					country: ""
				},
				structureData: []
			};
		},
		created() {
			getCountryList().then(res => {
				this.countryList = res.data;
			});
			this.loading = true;
			this.getStructureProfileData();
		},
		methods: {
			//展示文章
			showEssay(val) {
				this.dialogVisible = true;
				this.dialogText = val;
			},
			search() {
				this.loading = true;
				this.getStructureProfileData();
			},
			getStructureProfileData() {
				this.isNull = true;
				getStructureProfile(this.searchForm)
					.then(res => {
						if (this.$check.isNullData(res)) {
							this.structureData = [
								{
									country: "暂无数据"
								}
							];
							this.isNull = true;
							return;
						}
						this.isNull = false;
						this.structureData = res.data;
					})
					.catch(() => {
						this.structureData = [
							{
								country: "暂无数据"
							}
						];
						this.isNull = true;
					})
					.finally(() => {
						this.loading = false;
					});
			}
		}
	};
</script>

<style scoped lang="scss">
	/deep/ .el-dialog {
		height: 75%;
		/*overflow: auto;*/
		.el-dialog__body {
			height: 75%;
			overflow: auto;

			.time {
				color: #f8690d;
			}
		}
	}

	/deep/ .el-scrollbar__view {
		padding: 0 12px;
	}

	.party-tag {
		margin: 4px;
		cursor: pointer;
	}

	.structure {
		margin-top: 12px;
		border: 1px solid #f8690d;
		padding: 8px;
		height: 172px;
		border-radius: 4px;
		/deep/ &:nth-child(1) {
			margin-top: 0;
		}

		.title {
			color: #f8690d;
		}

		span {
			margin-right: 48px;
		}

		.el-steps {
			cursor: pointer;
			margin-top: 12px;
		}

		/deep/ .el-step__description {
			/*width: 72px;*/
			/*overflow: hidden;*/
			/*text-overflow: ellipsis;*/
			/*white-space: nowrap;*/
			/*word-wrap:break-word*/
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 4;
			word-wrap: break-word;
			word-break: break-all;
		}
	}
</style>
