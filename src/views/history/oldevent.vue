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
            <div class="title">事件统计</div>
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
                    <p
                      class="ellipsis war-content"
                      @click="showEssay(item, '事件详情')"
                    >{{ item.content }}</p>
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
            ></el-pagination>
          </div>
          <el-divider direction="vertical"></el-divider>
          <div class="info">
            <div class="info-mid">
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
                      <span class="title" :style="{ 'background-color': colorMatch[item.type] }">
                        {{
                        item.country
                        }}
                      </span>
                    </el-tooltip>
                    <span
                      v-else
                      class="title"
                      :style="{ 'background-color': colorMatch[item.type] }"
                    >
                      {{
                      item.country
                      }}
                    </span>
                    <span>{{ item.time + "&nbsp" + item.content }}</span>
                  </li>
                </ul>
              </el-scrollbar>-->
              <el-form :model="form" style="display:inline-block">
                <el-form-item label="影响力">
                  <!-- <el-input v-model="form.effect"></el-input> -->
                  <div class="introduce-color">{{form.influence}}</div>
                </el-form-item>
                <el-form-item label="事件">
                  <!-- <el-input v-model="form.event"></el-input> -->
                  <div class="introduce-color">{{form.reateOrg}}</div>
                </el-form-item>
              </el-form>
            </div>
            <div class="info-mid">
              <div class="info-title">统计信息</div>
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
import { getEvent } from "api/history.js";

export default {
  name: "Oldevent",
  mixins: [mixin],
  data() {
    return {
      countryList: [],
      searchForm: {
        country: ""
	  },
	  form:{
	  },
      //文章弹窗
      dialogVisible: false,
      dialogText: "",
      readTitle: "",
      currentPage: 1,
      total: 0,
      warItems: [],
      allWar: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //展示文章
    showEssay(content, name) {
      console.log(content);
      this.form = content
      this.dialogVisible = true;
      this.readTitle = name + " - " + content.time;
      this.dialogText = content.content;
    },
    search() {
      this.getData(this.searchForm);
    },
    getData() {
      getEvent(this.searchForm)
        .then(res => {
          if (this.$check.isNullData(res)) {
            this.warItems = [
              {
                time: "无",
                warName: "无",
                content: "无"
              }
            ];
            return;
          }
          let data = res.data.map(cur => {
            return {
              time: cur.time,
              content: cur.content,
              warName: cur.country + "：" + cur.time,
              influence: cur.influence,
              reateOrg: cur.reateOrg
            };
          });
          this.allWar = this._.chunk(data, 4);
          this.total = this.allWar.length;
          this.warItems = this.allWar[0];
          console.log(this.allWar)
          this.form = this.allWar[0][0]
        })
        .catch(() => {
          this.warItems = [
            {
              time: "无",
              warName: "无",
              content: "无"
            }
          ];
        });
    },
    handleCurrentChange(val) {
      this.warItems = this.allWar[val - 1];
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
  height: calc(100% - 66px);
}
.war-content {
  cursor: pointer;
}
</style>
