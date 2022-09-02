<template>
  <main align="center"><font size="6"><b>中石化合作项目</b></font></main>
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
            <span><font size="4">数据集</font></span>
          </el-menu-item>
          <el-menu-item index="/model">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span><font size="4">模型预测</font></span>
          </el-menu-item>
          <el-sub-menu index="modelShow">
            <template #title>
              <el-icon>
                <icon-menu></icon-menu>
              </el-icon>
              <span><font size="4">模型调优</font></span>
            </template>
              <el-menu-item index="/prophet">prophet 调优</el-menu-item>
              <el-menu-item index="/wensi">温室模型</el-menu-item>
              <el-menu-item index="/GM">灰度预测模型</el-menu-item>
              <el-menu-item index="/">更多模型待开发</el-menu-item>
          </el-sub-menu>
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
