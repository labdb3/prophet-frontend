<template>
  <main align="center"><font size="6"><b>探明储量增长过程模拟数据分析</b></font></main>
  <el-container>
    <el-header>
      <div class='sys-title'>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :router='true' active-text-color='#ffd04b'>
          <el-menu-item index="/">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span><font size="4">数据集管理</font></span>
          </el-menu-item>
          <el-menu-item index="/preprocess">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span><font size="4">数据平滑</font></span>
          </el-menu-item>
          <el-menu-item index="/clustering">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span><font size="4">数据聚类</font></span>
          </el-menu-item>
          <el-sub-menu index="modelShow">
            <template #title>
              <el-icon>
                <icon-menu></icon-menu>
              </el-icon>
              <span><font size="4">预测模型</font></span>
            </template>
              <el-menu-item index="/prophet">prophet 调优</el-menu-item>
              <el-menu-item index="/wensi">翁氏模型</el-menu-item>
              <el-menu-item index="/GM">灰度预测模型</el-menu-item>
              <el-menu-item index="">更多模型待开发</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/model">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span><font size="4">模型效果对比</font></span>
          </el-menu-item>
          <el-menu-item index="/fitting">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span><font size="4">累积曲线</font></span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>


<script lang="ts" setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
</script>
