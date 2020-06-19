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
		<div class="main-content">
			<el-scrollbar :native="false" :noresize="true">
				<div class="carousel">
					<div class="content">
						<div class="chart">
							<div class="title">选举统计</div>
							<div id="myChart"></div>
						</div>
					</div>
					<el-divider></el-divider>
					<div class="sec-content">
						<div class="half-content">
							<div class="half">
								<div class="half-title">选举详情</div>
								<div class="read-table">
									<div class="text item">
										<span class="read-title">选举职位</span>
										<span class="content">
											{{ electionDetail.name }}
										</span>
									</div>
									<div class="text item">
										<span class="read-title">选举任期</span>
										<span class="content">
											{{ electionDetail.type }}
										</span>
									</div>
									<div class="text item">
										<span class="read-title">选举时限</span>
										<span class="content">
											{{ electionDetail.date }}
										</span>
									</div>
									<div class="text item big">
										<span
											class="read-title"
											style="vertical-align: top;height: 40px;line-height: 40px;"
											>选举详情</span
										>
										<span class="content read-text">
											<el-scrollbar :native="false" :noresize="false">
												{{ electionDetail.details }}
											</el-scrollbar>
										</span>
									</div>
								</div>
							</div>
							<el-divider direction="vertical"></el-divider>
							<div class="half">
								<div class="half-title">选举人详情</div>
								<div class="read-table">
									<div class="text item">
										<span class="read-title">候选人名</span>
										<span class="content">
											{{ electionPersonDetail.candidateName }}
										</span>
									</div>
									<div class="text item">
										<span class="read-title">支持比率</span>
										<span class="content">
											{{ electionPersonDetail.rate }}
										</span>
									</div>
									<div class="text item">
										<span class="read-title">选举票数</span>
										<span class="content">
											{{ electionPersonDetail.votes }}
										</span>
									</div>
									<div class="text item big">
										<span
											class="read-title"
											style="vertical-align: top;height: 40px;line-height: 40px;"
											>选举口号</span
										>
										<span class="content read-text">
											<el-scrollbar :native="false" :noresize="false">
												{{ electionPersonDetail.slogan }}
											</el-scrollbar>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>

<script>
	import { getCountryList } from "api/common.js";
	import { getElectionProfile } from "api/politics.js";

	export default {
		name: "Election",
		data() {
			return {
				colors: ["#19d4ae", "#5ab1ef", "#fa6e86", "#ffb980", "#0067a6", "#c4b4e4"],
				countryList: [],
				dialogVisible: false,
				loading: false,
				total: 0,
				searchForm: {
					country: "",
				},
				electionData: [],
				electionNodes: [],
				electionLinks: [],
				electionDetail: {},
				electionPersonDetail: {},
			};
		},
		created() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = this.countryList[0];
				this.getElectionProfileData();
			});
		},
		methods: {
			search() {
				this.getElectionProfileData();
			},
			initChart() {
				const myChart = this.$echarts.init(document.getElementById("myChart"));
				const option = {
					tooltip: {
						trigger: "item",
						triggerOn: "mousemove",
					},
					series: [
						{
							type: "sankey",
							data: this.electionNodes,
							links: this.electionLinks,
							focusNodeAdjacency: true,
							nodeGap: 20,
							itemStyle: {
								borderWidth: 2,
							},
							levels: [
								{
									depth: 0,
									itemStyle: {
										color: "#fbb4ae",
									},
									lineStyle: {
										color: "source",
										opacity: 0.6,
									},
								},
								{
									depth: 1,
									itemStyle: {
										color: "#b3cde3",
									},
									lineStyle: {
										color: "source",
										opacity: 0.6,
									},
								},
								{
									depth: 2,
									itemStyle: {
										color: "#ccebc5",
									},
									lineStyle: {
										color: "source",
										opacity: 0.6,
									},
								},
								{
									depth: 3,
									itemStyle: {
										color: "#decbe4",
									},
									lineStyle: {
										color: "source",
										opacity: 0.6,
									},
								},
							],
							lineStyle: {
								curveness: 0.5,
							},
						},
					],
				};
				myChart.setOption(option);
				window.onresize = function() {
					myChart.resize();
				};
				myChart.on("click", (e) => {
					console.log(e);
					let elections = this.electionData[0].elections;
					if (e.data.name) {
						let name = e.data.name;
						elections.forEach((cur) => {
							cur.positions.forEach((o, index) => {
								if (o.position === name) {
									// console.log(o, "1");
									// console.log(cur, "2");
									this.electionDetail = {
										name: o.position,
										type: cur.type,
										date:
											this.$moment(cur.startDate).format("YYYY-MM-DD") +
											"至" +
											this.$moment(cur.endDate).format("YYYY-MM-DD"),
										details: cur.details,
									};
									this.electionPersonDetail = {
										candidateName: o.candidates[0].candidateName,
										votes: o.candidates[0].votes,
										rate: o.candidates[0].rate,
										slogan: o.candidates[0].slogan,
									};
								} else {
									o.candidates.forEach((p) => {
										if (p.candidateName === name) {
											// console.log(o, "1");
											// console.log(cur, "2");
											this.electionDetail = {
												name: o.position,
												type: cur.type,
												date:
													this.$moment(cur.startDate).format("YYYY-MM-DD") +
													"至" +
													this.$moment(cur.endDate).format("YYYY-MM-DD"),
												details: cur.details,
											};
											this.electionPersonDetail = {
												candidateName: p.candidateName,
												votes: p.votes,
												rate: p.rate,
												slogan: p.slogan,
											};
										}
									});
								}
							});
						});
					} else {
						console.log("all");
					}
				});
			},
			getElectionProfileData() {
				getElectionProfile(this.searchForm)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.electionNodes = [
								{
									name: "暂无数据",
								},
								{
									name: "暂无选举",
								},
							];
							this.electionLinks = [
								{
									source: "暂无数据",
									target: "暂无选举",
									value: 1,
								},
							];
							return;
						}
						this.electionData = res.data;
						this.electionNodes = [];
						this.electionLinks = [];
						res.data.forEach((cur) => {
							this.electionNodes.push({
								name: cur.country,
							});
							cur.elections.forEach((elec, elecIndex) => {
								this.electionNodes.push({
									name: elec.name,
								});
								this.electionLinks.push({
									source: cur.country,
									target: elec.name,
									value: 1,
								});
								elec.positions.forEach((po, poIndex) => {
									this.electionNodes.push({
										name: po.position,
									});
									this.electionLinks.push({
										source: elec.name,
										target: po.position,
										value: 1,
									});
									if (elecIndex == 0 && poIndex == 0) {
										this.electionDetail = {
											name: po.position,
											type: elec.type,
											date:
												this.$moment(elec.startDate).format("YYYY-MM-DD") +
												"至" +
												this.$moment(elec.endDate).format("YYYY-MM-DD"),
											details: elec.details,
										};
										let person = elec.positions[0].candidates[0];
										this.electionPersonDetail = {
											candidateName: person.candidateName,
											votes: person.votes,
											rate: person.rate,
											slogan: person.slogan,
										};
									}
									po.candidates.forEach((ca) => {
										this.electionNodes.push({
											name: ca.candidateName,
										});
										this.electionLinks.push({
											source: po.position,
											target: ca.candidateName,
											value: ca.votes,
										});
									});
								});
							});
						});
					})
					.catch(() => {
						this.electionNodes = [
							{
								name: "暂无数据",
							},
							{
								name: "暂无选举",
							},
						];
						this.electionLinks = [
							{
								source: "暂无数据",
								target: "暂无选举",
								value: 1,
							},
						];
					})
					.finally(() => {
						this.$nextTick(() => {
							this.initChart();
						});
					});
			},
		},
	};
</script>

<style scoped lang="scss">
	/deep/ i {
		color: #666;
	}

	.el-form-item {
		margin-top: 8px;
		margin-bottom: 8px;
	}

	/deep/ .el-scrollbar__view {
		height: calc(100% - 27px);
	}

	.carousel .chart {
		width: 100%;
	}

	.main-content {
		#myChart {
			width: 100%;
			height: 500px;
		}
	}

	.big {
		height: calc(100% - 194px);
		.read-text {
			height: 100%;
		}
	}
</style>
