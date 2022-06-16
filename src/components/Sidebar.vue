<template>
  <el-container>
    <el-header>
      <div class='sys-title'>
        <font size="5" style="text-align:center;"><b>Prophet</b></font>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :router='true' active-text-color='#ffd04b'>
          <el-menu-item index="/">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>数据集</span>
          </el-menu-item>
          <el-menu-item index="/model">
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>模型预测</span>
          </el-menu-item>
          <el-menu-item>
            <el-icon>
              <icon-menu />
            </el-icon>
            <span>模型展示</span>
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
