<template>
  <div>
    <div class="search-header">
      <el-form :inline="true" class="demo-form-inline" style="display:inline-block">
        <el-form-item label="国家：">
          <el-select v-model="searchForm.country" placeholder="请选择国家">
            <el-option v-for="item in countryList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="朝代">
          <el-select v-model="searchForm.dynasty" placeholder="请选择朝代">
            <el-option v-for="item in dynastyList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="search">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-scrollbar :native="false" :noresize="false">
      <div class="carousel">
        <div class="content">
          <div class="chart">
            <div class="title">图片</div>
            <div>
              <el-image
                src="http://11.0.0.124:8888/file/image?path=%E8%A5%BF%E6%B1%89.jpg"
                alt="朝代"
              ></el-image>
            </div>
            <!-- <ve-ring
							height="calc(100% - 24px)"
							:judge-width="true"
							:resizeable="true"
							:colors="colors"
							:extend="extend"
							:settings="trendChartSettings"
							:data="ideaData"
            ></ve-ring>-->
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="info">
            <!-- <div class="info-title">统计信息</div> -->
            <!-- <div class="info-legend">
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
              <div class="info-title">简介</div>
              <div class="introduce-color">国家：{{dynasty.country}}</div>
              <div class="introduce-color">朝代：{{dynasty.dynasty}}</div>
              <div class="introduce-color">时间：{{dynasty.time}}</div>
              <div class="introduce-color">简介：{{dynasty.description}}</div>
            </div>
            <div class="info-third">
              <div class="info-title">制度</div>
            </div>
            <div class="info-third">
              <div class="info-title">文化</div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { colors } from "config/base.js";
import { sliceShow, concatBy } from "utils/common.js";
import mixin from "components/mixins";
import { getCountryList } from "api/common.js";
import { getDynasty, getDynastyList } from "api/history.js";

export default {
  name: "Dynasty",
  mixins: [mixin],
  data() {
    return {
      countryList: [],
      dynastyList: [],
      searchForm: {
        country: "",
        dynasty: ""
      },
      dynasty: {
        country: "",
        dynasty: "",
        time: "",
        description: ""
      }
    };
  },
  mounted() {
    this.$nextTick(function() {
      getCountryList().then(res => {
        this.countryList = res.data;
        this.searchForm.country = "中国";
        let params = {
          country: this.searchForm.country
        };
        this.getDynastyLists(params);
      });
    });
  },
  computed: {
    colorList() {
      return {
        0: "政治",
        1: "经济",
        3: "文化",
        2: "宗教"
      };
    }
  },
  created() {
    // this.getData();
    // this.getTypeData();
  },
  methods: {
    //   获取详细信息
    getDynastyDetail(params) {
      getDynasty(params).then(res => {
        console.log(res);
        this.dynasty = res.data[0];
      });
    },
    search() {
	  //   this.getPersonData();
	  let params = {
          country: this.searchForm.country,
          dynasty: this.searchForm.dynasty
        };
        this.getDynastyDetail(params);
    },
    getDynastyLists(params) {
      getDynastyList(params).then(res => {
        console.log(res);
        this.dynastyList = res.data;
        this.searchForm.dynasty = res.data[0];
        let params = {
          country: this.searchForm.country,
          dynasty: this.searchForm.dynasty
        };
        this.getDynastyDetail(params);
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
</style>
