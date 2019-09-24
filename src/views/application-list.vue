<template>
  <div class="tab-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-plus" @click="createItem">
        新增配置文件
      </el-button>
    </div>
    <el-tabs v-model="file.env" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in envs" :key="item" :label="item" :name="item">
        <tab-pane v-if="file.env===item" :service="file.service" :env="item" :label="file.label" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getStorage, STORAGE_ENVS, STORAGE_LABELS } from '@/utils/storage-utils'
import tabPane from './components/TabPane'

export default {
  components: { tabPane },
  data() {
    return {
      file: {
        service: '',
        env: 'default',
        label: 'default'
      },
      envs: [],
      labels: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.file.service = this.$route.params.service
      this.envs = ['default'].concat(getStorage(STORAGE_ENVS))
      this.labels = ['default'].concat(getStorage(STORAGE_LABELS))
    },
    createItem() {
      this.$router.push({ name: 'CreateApplication', params: this.file, query: this.file })
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
