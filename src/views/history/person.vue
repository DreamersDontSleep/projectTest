<template>
  <div>
    <div class="search-header">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline"
        style="display:inline-block"
      >
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
      <div class="carousel">
        <div class="content">
          <div class="chart">
            <div class="title">意识统计</div>
            <div id="chartHasMap"></div>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="info">
            <!-- <div class="info-title">统计信息</div>
						<div class="info-legend">
							<div v-for="(color, name) in colorMatch" :key="color">
								<span :style="{ 'background-color': color }" class="legend"></span>
								<span>{{ name }}</span>
							</div>
						</div>
						<el-scrollbar :native="false" :noresize="false">
							<ul>
								<li
									v-for="(item, index) in ideaEssay"
									:key="item.uuid"
									@click="showEssay(item, '意识形态')"
								>
									<el-tooltip
										v-if="item.country.length > 4"
										class="title"
										effect="dark"
										:content="item.country"
										placement="left"
									>
										<span class="title" :style="{ 'background-color': colorMatch[item.type] }">{{
											item.country
										}}</span>
									</el-tooltip>
									<span v-else class="title" :style="{ 'background-color': colorMatch[item.type] }">{{
										item.country
									}}</span>
									<span>{{ item.time + "&nbsp" + item.content }}</span>
								</li>
							</ul>
            </el-scrollbar>-->
            <div class="info-third">
              <div class="info-title">人物信息</div>
              <div class="info-img" style="display:inline-block;float:left;width: 20%;">
                <el-image
                  v-bind:src="imgSrc"
                  style="width: 85%"
                  alt="人物图片"
                ></el-image>
              </div>
              <div class="info-img-right" style="display:inline-block;float:left;width: 80%;">
					<div class="introduce-color">中文姓名：<span>{{introduceForm.name}}</span> </div>
					<div class="introduce-color">英文姓名：<span>{{introduceForm.enName}}</span></div>
					<div class="introduce-color">出生时间：<span>{{introduceForm.birthday}}</span></div>
					<div class="introduce-color">生平：<span>{{introduceForm.aliveTime}}</span></div>
              </div>
            </div>
            <div class="info-third">
              <div class="info-title">人物简介</div>
			  <div class="introduce-color">
				  {{introduceForm.content}}
			  </div>
            </div>
            <div class="info-third">
              <div class="info-title">影响力</div>
			  <div class="introduce-color">{{introduceForm.influence}}</div>
			  <div class="info-title">出现文章</div>
			  <div class="introduce-color">{{introduceForm.amount}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--        文章显示-->
    <el-dialog class="read-dialog" :title="readTitle" :visible.sync="dialogVisible" width="60%">
      <span class="read-text">{{ dialogText }}</span>
    </el-dialog>
  </div>
</template>

<script>
import { colors } from "config/base.js";
import { sliceShow, concatBy } from "utils/common.js";
import mixin from "components/mixins";
import { getCountryList } from "api/common.js";
import { getPerson, getPersonImg } from "api/history.js";

export default {
  name: "Person",
  mixins: [mixin],
  data() {
    return {
      countryList: [],
      searchForm: {
        country: ""
      },
      //文章弹窗
      dialogVisible: false,
      dialogText: "",
      readTitle: "",
      chartHasMap: "",
	  ideaEssay: [],
	  introduceForm:{
		  name: '',
		  enName: '',
		  birthday: '',
		  aliveTime: ''
	  },
	  targetData: [],
	  name: '',
	  imgSrc: 'http://11.0.0.124:8888/file/image?path=%E4%B9%94%E6%B2%BB%E2%80%A2%E5%8D%8E%E7%9B%9B%E9%A1%BF.jpg'
    };
  },
  mounted() {
    this.$nextTick(function() {
      getCountryList().then(res => {
        this.countryList = res.data;
        this.searchForm.country = "美国";
        this.getPersonData();
	  });
	//   this.searchForm.country = "美国";
    // 	this.getPersonData();
      window.addEventListener("resize", this.chartResize, false);
    });
  },
  destroyed() {
    window.removeEventListener("resize", this.chartResize, false);
  },
  methods: {
    chartResize() {
      this.chartHasMap.resize();
    },
    //展示文章
    showEssay(content, name) {
      this.dialogVisible = true;
      this.readTitle = name + " - " + content.country;
      this.dialogText = content.content;
    },
    search() {
      this.getPersonData();
    },
    getPersonData() {
      let data = [];
      let xdata = [];
      let ydata = [];
      getPerson(this.searchForm)
        .then(async res => {
          if (this.$check.isNullData(res)) {
            data.push({
              name: "暂无数据",
              value: 0
            });
            xdata.push("暂无数据");
            return;
          }
		  let resData = res.data;
		  console.log(resData)
		  this.introduceForm = resData[0]
		  this.name = resData[0].name
		  this.targetData = resData
          const promises = resData.map(async cur => {
            let img = {};
            let blob;
            let base64Img = "";
            let href = "";
            try {
              img = await getPersonImg({ path: cur.avatar });
              blob = new Blob([img], ["image/png", "image/jpeg", "image/gif"]);
              base64Img = await this.blobToBase64(blob);
			  href = base64Img.replace("application/octet-stream", "image/png");
			  console.log(href)
            } catch (e) {
              href = require("@/assets/404.png");
            }
            return {
              symbol: "image://" + href,
              name: cur.name,
              value: Number(cur.influence) * 100,
              symbolSize: [60, 60]
            };
          });
          for (let i of promises) {
            data.push(await i);
          }
          data.forEach(cur => {
            xdata.push(cur.name);
            ydata.push(cur.value);
          });
          // this.setOption(data, xdata, ydata);
        })
        .catch(() => {
          data.push({
            name: "暂无数据",
            value: 0
          });
          xdata.push("暂无数据");
        })
        .finally(() => {
		  this.setOption(data, xdata, ydata);
		//   console.log(data)
        });
    },
    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        // readAsDataURL
        fileReader.readAsDataURL(blob);
        fileReader.onload = e => {
          resolve(e.target.result);
        };
        fileReader.onerror = () => {
          reject(new Error("blobToBase64 error"));
        };
      });
    },
    setOption(data, xdata, ydata) {
    //   console.log(data);
      let self = this;
      this.chartHasMap = this.$echarts.init(
        document.getElementById("chartHasMap")
      );

      let option = {
        tooltip: {
          trigger: "axis",
          extraCssText: "width:240px; white-space:pre-wrap",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
			//   console.log(params)
            return params[0].name + ": " + params[0].value;
          }
        },
        xAxis: {
          data: xdata,
          axisTick: { show: false },
          axisLine: { show: true },
          axisLabel: {
            formatter: this.huanhang
          }
        },
        yAxis: {
          splitLine: { show: false }
        },
        color: ["#e54035"],
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "-1%",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              opacity: 0.5,
              color: param => {
                return this.colors[param.dataIndex];
                // return colorList[param.seriesIndex];
              }
            },
            emphasis: {
              itemStyle: {
                opacity: 1
              }
            },
            data: ydata,
            z: 10
          },
          {
            name: "glyph",
            type: "pictorialBar",
            barGap: "-100%",
            symbolPosition: "end",
            symbolSize: 50,
            symbolOffset: [0, "-120%"],
            data: data
          }
        ]
      };
	  this.chartHasMap.setOption(option);
	  this.chartHasMap.getZr().on("click",function(params){
		  console.log(params)
		  let dataIndex = params.target.dataIndex
		  self.introduceForm = self.targetData[dataIndex]
		  self.$set(self.introduceForm,'name',self.targetData[dataIndex].name)
	  })
    },
    huanhang(params) {
      var newParamsName = ""; // 最终拼接成的字符串
      var paramsNameNumber = params.length; // 实际标签的个数
      var provideNumber = 10; // 每行能显示的字的个数
      var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
      /**
       * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
       */
      // 条件等同于rowNumber>1
      if (paramsNameNumber > provideNumber) {
        /** 循环每一行,p表示行 */
        for (var p = 0; p < rowNumber; p++) {
          var tempStr = ""; // 表示每一次截取的字符串
          var start = p * provideNumber; // 开始截取的位置
          var end = start + provideNumber; // 结束截取的位置
          // 此处特殊处理最后一行的索引值
          if (p == rowNumber - 1) {
            // 最后一次不换行
            tempStr = params.substring(start, paramsNameNumber);
          } else {
            // 每一次拼接字符串并换行
            tempStr = params.substring(start, end) + "\n";
          }
          newParamsName += tempStr; // 最终拼成的字符串
        }
      } else {
        // 将旧标签的值赋给新标签
        newParamsName = params;
      }
      //将最终的字符串返回
      return newParamsName;
    },
    getData() {
      getIdeology()
        .then(res => {
          if (this.$check.isNullData(res)) {
            this.ideaEssay = [{ country: "无", content: "暂无数据", time: "" }];
            return;
          }
          this.ideaEssay = [];
          res.data.forEach(cur => {
            this.ideaEssay.push({
              country: cur.name,
              content: cur.content,
              time: cur.createTime,
              type: cur.type
            });
          });
        })
        .catch(err => {
          this.ideaEssay = [{ country: "无", content: "暂无数据", time: "" }];
        });
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  margin: 0;
  padding: 0;
}
.carousel {
  height: calc(100% - 0px);
  .content {
    height: calc(100% - 0px);
  }
}

.info-title ~ .el-scrollbar[data-v-e8c14a5c] {
  height: calc(100% - 0px);
}

/*最外层的滚动*/
.el-scrollbar {
  height: calc(100% - 0px);

  /deep/ .el-scrollbar__view {
    height: calc(100% - 8px);
  }
}

.trend-chart {
  height: 80% !important;
}
.info .el-scrollbar {
  height: calc(100% - 46px);
}
.el-timeline {
  margin-top: 10px;
  height: calc(100% - 102px);
}
.war-content {
  cursor: pointer;
}
#chartHasMap {
  width: 100%;
  height: calc(100% - 24px);
}
.info-img-right{
	ul{
		li{
			color: #666
		}
	}
}
.introduce-color{
	font-size: 14px;
	color: #303133;
	// margin-top: 10px;
	padding: 5px;
}
</style>
