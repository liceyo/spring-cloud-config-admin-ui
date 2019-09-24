<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-if="isCreateEnv" v-model="newEnv" placeholder="环境名" style="width: 200px;" class="filter-item" @keyup.enter.native="createEnv" />
      <el-button v-if="!isCreateEnv" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增环境
      </el-button>
      <el-button v-if="isCreateEnv" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-check" @click="createEnv">
        确定
      </el-button>
      <el-button v-if="isCreateEnv" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-close" @click="handleCreate">
        取消
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <template slot="empty">
        无数据
      </template>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="环境名">
        <template slot-scope="{row}">
          <span :title="row">{{ row }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger" @click="deleteItem(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { env, deleteEnv, saveEnv } from '@/api/storage'
import { setStorage, getStorage, STORAGE_ENVS } from '@/utils/storage-utils'

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      newEnv: '',
      isCreateEnv: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(update) {
      this.listLoading = true
      const storage = getStorage(STORAGE_ENVS)
      if (storage && !update) {
        this.list = storage
      } else {
        const { data } = await env()
        this.list = data
        setStorage(STORAGE_ENVS, data)
      }
      this.listLoading = false
    },
    async createEnv() {
      if (!this.newEnv) {
        return
      }
      await saveEnv(this.newEnv)
      this.newEnv = ''
      this.isCreateEnv = false
      this.$message({
        message: '新增成功',
        type: 'success'
      })
      this.getList(true)
    },
    handleCreate() {
      this.isCreateEnv = !this.isCreateEnv
    },
    async deleteItem(row) {
      await deleteEnv(row)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList(true)
    }
  }
}
</script>

<style scoped>
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>
