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
			<div class="carousel-switch-items clearfix">
				<span :class="activItem === 'race' ? 'actived' : ''" @click="switchItem('race')">其它矛盾</span>
				<span :class="activItem === 'nation' ? 'actived' : ''" @click="switchItem('nation')">民族矛盾</span>
				<span :class="activItem === 'party' ? 'actived' : ''" @click="switchItem('party')">种族矛盾</span>
			</div>
			<!--滚动图-->
			<el-carousel :autoplay="false" indicator-position="none" :interval="3000" class="carousel" ref="carousel" change="resetPage">
				<el-carousel-item v-for="item in items" :key="item" :name="item">
					<div v-if="'party' === item" class="content">
						<div class="chart">
							<div id="partyChart"></div>
						</div>
						<el-divider direction="vertical"></el-divider>
						<div class="info">
							<el-scrollbar :native="false" :noresize="false">
								<ul>
									<li
										v-for="(item, index) in partyEssay"
										:key="item.uuid"
										@click="showEssay(item, '种族矛盾')"
									>
										<el-tooltip
										
											class="title"
											effect="dark"
											:content="item.time"
											placement="left"
										>
											<span class="title" :style="{ 'background-color': '#2F4554' }">{{
												item.time
											}}</span>
										</el-tooltip>
										<!-- <span v-else class="title" :style="{ 'background-color': '#D53A35' }">{{
											item.time
										}}</span> -->
										<span>{{ item.content }}</span>
									</li>
								</ul>
							</el-scrollbar>
								<el-pagination
								:pager-count="5"
								style="text-align: right;margin-top: 12px;"
								background
								@size-change="partyEssaySizeChange"
								@current-change="partyEssayCurrentChange"
								:current-page="pageNum"
								:page-sizes="[20, 30, 50, 80]"
								layout="sizes, prev, pager, next"
								:total="zztotal"
							>
							</el-pagination>
						</div>
					</div>
					<div v-if="'nation' === item" class="content trend">
						<div class="chart">
							<ve-ring
								height="100%"
								:judge-width="true"
								:resizeable="true"
								:colors="colors"
								:settings="trendChartSettings"
								:data="nationData"
							></ve-ring>
						</div>
						<el-divider direction="vertical"></el-divider>
						<div class="info">
							<el-scrollbar :native="false" :noresize="false">
								<ul>
									<li
										v-for="(item, index) in nationEssay"
										:key="item.uuid"
										@click="showEssay(item, '民族矛盾')"
									>
										<el-tooltip
										
											class="title"
											effect="dark"
											:content="item.time"
											placement="left"
										>
											<span class="title" :style="{ 'background-color': '#2F4554' }">{{
												item.time
											}}</span>
										</el-tooltip>
										<!-- <span v-else class="title" :style="{ 'background-color': '#D53A35' }">{{
											item.time
										}}</span> -->
										<span>{{ item.content }}</span>
									</li>
								</ul>
							</el-scrollbar>
							<el-pagination
								:pager-count="5"
								style="text-align: right;margin-top: 12px;"
								background
								@size-change="partyEssaySizeChange"
								@current-change="partyEssayCurrentChange"
								:current-page="pageNum"
								:page-sizes="[20, 30, 50, 80]"
								layout="sizes, prev, pager, next"
								:total="mztotal"
							>
							</el-pagination>
						</div>
					</div>
					<div v-if="'race' === item" class="content trend">
						<div class="chart">
							<ve-ring
								height="100%"
								:judge-width="true"
								:resizeable="true"
								:colors="colors"
								:settings="trendChartSettings"
								:data="otherData"
							></ve-ring>
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
										v-for="(item, index) in raceEssay"
										:key="item.uuid"
										@click="showEssay(item, '其他矛盾')"
									>
										<el-tooltip
											v-if="item.type.length >= 4"
											class="title"
											effect="dark"
											:content="item.type"
											placement="left"
										>
											<span :class="['title',{'Partisanship':item.type=='党派矛盾','regionalContradiction':item.type=='地域矛盾','conflictOfBeliefs':item.type=='信仰冲突','conflictOfInterestInResources':item.type=='资源利益冲突','familyConflict':item.type==' 家族冲突'}]" >{{
												item.type
											}}</span>
										</el-tooltip>
										<span v-else :class="['title',{'Partisanship':item.type=='党派矛盾','regionalContradiction':item.type=='地域矛盾','conflictOfBeliefs':item.type=='信仰冲突','conflictOfInterestInResources':item.type=='资源利益冲突','familyConflict':item.type==' 家族冲突'}]">{{
											item.type
										}}</span>
										<span>{{ item.time + "&nbsp" + item.content }}</span>
									</li>
								</ul>
							</el-scrollbar>
							<el-pagination
								:pager-count="5"
								style="text-align: right;margin-top: 12px;"
								background
								@size-change="partyEssaySizeChange"
								@current-change="partyEssayCurrentChange"
								:current-page="pageNum"
								:page-sizes="[20, 30, 50, 80]"
								layout="sizes, prev, pager, next"
								:total="qttotal"
							>
							</el-pagination>
						</div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<!--        文章显示-->
		<el-dialog class="read-dialog" :title="readTitle" :visible.sync="dialogVisible" width="800px">
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
	import { getStateNation, getSelectRace, getSocialInfo, getOtherConflicts } from "api/social.js";

	export default {
		name: "Contradiction",
		mixins: [mixin],
		data() {
			this.colorMatch = {
				地域矛盾: colors[0],
				资源利益冲突: colors[1],
				党派矛盾: colors[2],
				信仰矛盾: colors[3],
				家族矛盾: colors[4],
			};
			this.match = {
				7: "地域矛盾",
				9: "资源利益冲突",
				4: "党派矛盾",
				8: "信仰矛盾",
				10: "家族矛盾",
			};
			return {
				readTitle: "",
				countryList: [],
				searchForm: {
					country: "",
				},
				autoPlay: false,
				//滚动图默认激活经济趋势
				activItem: "party",
				//滚动项
				items: ["party", "nation", "race"],
				//文章弹窗
				dialogVisible: false,
				dialogText: "",
				nationData: {
					columns: ["民族", "数量"],
					rows: [],
				},
				raceData: [],
				otherData: {
					columns: ["冲突种类", "数量"],
					rows: [],
				},
				partyEssay: [],
				nationEssay: [],
				raceEssay: [],
				partyChart: "",
				pageNum: 1,
				pageSize: 20,
				zztotal: 0,
				mztotal:0,
				qttotal:0
			};
		},
		computed: {
			bgColor() {
				return bgColor;
			},
			colorList() {
				return this.colorMatch;
			},
		},
		created() {
			getCountryList().then((res) => {
				this.countryList = res.data;
				this.searchForm.country = "美国";
				this.getStateNationData();
				this.getRaceData();
				this.getAllInfos();
				this.getOtherData();
			});
		},
		mounted() {
			this.$nextTick(function() {
				this.setOption();
				window.addEventListener("resize", this.chartResize, false);
			});
		},
		destroyed() {
			window.removeEventListener("resize", this.chartResize, false);
		},
		methods: {
			chartResize() {
				this.partyChart.resize();
			},
			//切换
			switchItem(val) {
				this.activItem = val;
				this.$refs["carousel"].setActiveItem(val);
				this.resetPage()
			},
			//检索
			search() {
				this.getStateNationData();
				this.getRaceData();
				this.getAllInfos();
				this.getOtherData();
			},
			//展示文章
			showEssay(content, name) {
				this.dialogVisible = true;
				this.readTitle = name + " - " + content.country;
				this.dialogText = content.content;
			},
			setOption(source, showData) {
				this.partyChart = this.$echarts.init(document.getElementById("partyChart"));
				setTimeout(() => {
					let option = {
						legend: {
							type: "scroll",
						},
						tooltip: {
							trigger: "axis",
							showContent: false,
						},
						//  tooltip: {
        				// trigger: 'axis',
        				// formatter: '{a} <br/>{b}: {c} ({d}%)'
    					// },
						dataset: {
							source,
						},
						xAxis: {
							name: "日期",
							nameLocation: "end",
							nameGap: 4,
							minInterval: 2,
							axisTick: {
								alignWithLabel: true,
							},
							axisLabel: {
								formatter: (value) => {
									return this.$moment(value).format("YYYY");
								},
							},
							type: "category",
							boundaryGap: false,
							splitLine: {
								show: true,
								lineStyle: {
									type: "dashed",
								},
							},
						},
						yAxis: {
							gridIndex: 0,
							name: "数值(单位：万人)",
							nameLocation: "end",
							nameTextStyle: {
								padding: [0, 0, 0, 24],
							},
							splitLine: {
								lineStyle: {
									type: "dashed",
								},
							},
						},
						grid: { top: "55%", show: true },
						legend: this.legend,
						series: [
							{ type: "line", smooth: true, seriesLayoutBy: "row" },
							{ type: "line", smooth: true, seriesLayoutBy: "row" },
							{ type: "line", smooth: true, seriesLayoutBy: "row" },
							{ type: "line", smooth: true, seriesLayoutBy: "row" },
							{ type: "line", smooth: true, seriesLayoutBy: "row" },
							{ type: "line", smooth: true, seriesLayoutBy: "row" },
							// { type: "line", smooth: true, seriesLayoutBy: "row" },
							{
								type: "pie",
								id: "pie",
								radius: "30%",
								center: ["50%", "25%"],
								encode: {
									itemName: "种族",
									value: showData,
									tooltip: showData,
								},
							},
						],
					};
					this.partyChart.on("updateAxisPointer", (event) => {
						var xAxisInfo = event.axesInfo[0];
						if (xAxisInfo) {
						
							
							var dimension = xAxisInfo.value + 1;
					
							this.partyChart.setOption({
								series: {
									id: "pie",
									label: {
										formatter: "{b}: {@[" + dimension + "]}",
									},
									encode: {
										value: dimension,
										tooltip: dimension,
									},
								},
							});
						}
					});
					this.partyChart.setOption(option);
				});
			},
			getRaceData() {
				getSelectRace(this.searchForm)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.setOption([["暂无数据"], ["暂无数据"]], null);
							return;
						}
						let allData = res.data;
						let source = [];
						let date = [];
						let items = [];
						for (let i of allData) {
							for (let item in i) {
								date.push(item);
								items = items.concat(i[item]);
							}
						}
						// 获取种族
						let oneItem = concatBy(items, "name");
						let race = [];
						for (let o of oneItem) {
							race.push([o.name]);
						}
						source.push(["种族", ...date]);

						// 拼接数据
						race.forEach((cur) => {
							source.push([cur[0]]);
							for (let o of items) {
								if (cur[0] === o.name) {
									for (let i = 1; i < source.length; i++) {
										if (source[i][0] === o.name) {
											source[i].push(o.number/10000);
										}
									}
								}
							}
						});
						console.log(source,date[0]);
						
						this.setOption(source, date[0]);
					})
					.catch(() => {
						this.setOption([["暂无数据"], ["暂无数据"]], null);
					});
			},
			getStateNationData() {
				getStateNation({ country: this.searchForm.country })
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.nationData.rows = [
								{
									民族: "暂无数据",
									数量: 0,
								},
							];
							return;
						}
						let allData = sliceShow(res.data);
						this.nationData.rows = [];
						let nationArr = [];
						for (let key in allData) {
							let data = allData[key];
							this.nationData.columns.push(data.name);
							nationArr.push({
								民族: data.name,
								数量: data.number,
							});
						}
						this.nationData.rows = nationArr;
					})
					.catch(() => {
						this.nationData.rows = [
							{
								民族: "暂无数据",
								数量: 0,
							},
						];
					});
			},
			getOtherData() {
				getOtherConflicts(this.searchForm)
					.then((res) => {
						if (this.$check.isNullData(res)) {
							this.otherData.rows = [
								{
									冲突种类: "暂无数据",
									数量: 0,
								},
							];
							return;
						}
						let allData = sliceShow(res.data);
						this.otherData.rows = [];
						let nationArr = [];
						for (let key in allData) {
							let data = allData[key];
							this.otherData.columns.push(data.name);
							nationArr.push({
								冲突种类: data.name,
								数量: data.number,
							});
						}
						this.otherData.rows = nationArr;
					})
					.catch(() => {
						this.nationData.rows = [
							{
								冲突种类: "暂无数据",
								数量: 0,
							},
						];
					});
			},
			getAllInfos() {
				let params={
					country: this.searchForm.country,
					parentType: "社会矛盾",
					pageNum: this.pageNum,
					pageSize: this.pageSize

				}
				getSocialInfo(params)
					.then((res) => {
					
						
						if (this.$check.isNullData(res)) {
							this.partyEssay = [
								{
									title: "无数据",
									country: "暂无数据",
								},
							];
							this.nationEssay = [
								{
									title: "无数据",
									country: "暂无数据",
								},
							];
							this.raceEssay = [
								{
									title: "无数据",
									country: "暂无数据",
								},
							];
							return;
						}
						//取出所有的类别
						this.partyEssay = [];
						this.nationEssay = [];
						this.raceEssay = [];
						//取出所有的信息
						for(var k in res.data){
							if(k=='种族矛盾'){
								this.zztotal=res.data[k].total
							}else if(k=='民族矛盾'){
								this.mztotal=res.data[k].total
							}else{
								this.qttotal=res.data[k].total
							}
						}
					// console.log(this.zztotal,this.mztotal);
					
						
						let info = Object.values(res.data);
						
							
							
						for (let key of info) {
							
							// console.log(key);
							
							key.list.forEach((cur) => {
								if (cur.childType === 6) {
									let type = this.match[String(cur.childType)];
									this.partyEssay.push(Object.assign(cur, { type }));
								} else if (cur.childType === 5) {
									let type = this.match[String(cur.childType)];
									this.nationEssay.push(Object.assign(cur, { type }));
								} else {
									let type = this.match[String(cur.childType)];
									this.raceEssay.push(Object.assign(cur, { type }));
								}
							});
						
							
						}
					// console.log(this.partyEssay);
					
					
					})
					.catch(() => {
						this.partyEssay = [
							{
								title: "无数据",
								country: "暂无数据",
							},
						];
						this.nationEssay = [
							{
								title: "无数据",
								country: "暂无数据",
							},
						];
						this.raceEssay = [
							{
								title: "无数据",
								country: "暂无数据",
							},
						];
					});
			},
			partyEssaySizeChange(val) {
				this.pageSize = val;
				this.pageNum = 1;
				this.getAllInfos();
			},
			partyEssayCurrentChange(val) {
				this.pageNum = val;
				this.getAllInfos();
			},
			resetPage(){
				
				this.pageNum = 1;
				this.pageSize = 20;
				this.getAllInfos()
			}
		},
	};
</script>

<style scoped lang="scss">
	ul {
		margin: 0;
		padding: 0;
	}
	.carousel {
		height: calc(100% - 60px);
	}
	#partyChart {
		width: 100%;
		height: 100%;
		/deep/ & > div {
			width: 100% !important;
			height: 100% !important;
		}
	}
	.Partisanship{
		background-color: #D53A35!important;
	}
	.regionalContradiction{
		background-color: #2F4554!important;
	}
	.conflictOfInterestInResources{
		background-color: #61A0A8!important;
	}
	.conflictOfBeliefs{
		background-color: #D48265!important;
	}
	.familyConflict{
		background-color: #91C7AE!important;
	}
</style>
