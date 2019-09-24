<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-if="isCreateService" v-model="newService" placeholder="服务名" style="width: 200px;" class="filter-item" @keyup.enter.native="createService" />
      <el-button v-if="!isCreateService" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增服务
      </el-button>
      <el-button v-if="isCreateService" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-check" @click="createService">
        确定
      </el-button>
      <el-button v-if="isCreateService" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-close" @click="handleCreate">
        取消
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <template slot="empty">无数据</template>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="服务名">
        <template slot-scope="{row}">
          <span :title="row.service">{{ row.service }}</span>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="状态">
        <template slot-scope="{row}">
          <el-tag :type="row.state | statusFilter">
            {{ row.state ?'已上线':'未上线' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column width="180px" align="center" label="存储">
        <template slot-scope="{row}">
          <el-tag :type="row.storage | statusFilter">
            {{ row.storage ? '已存储':'未存储' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作" width="300">
        <template slot-scope="{row}">
          <el-button v-if="!row.storage" size="mini" type="primary" @click="confirmSave(row)">
            保存
          </el-button>
          <el-button v-if="row.storage" size="mini" type="danger" @click="deleteItem(row)">
            删除
          </el-button>
          <el-button size="mini" type="success" @click="toApplication(row)">
            配置文件
          </el-button>
          <el-button v-if="row.state" size="mini" type="success" @click="refreshApplication(row)">
            刷新配置文件
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { service, env, label, saveService, deleteService } from '@/api/storage'
import { setStorage, STORAGE_ENVS, STORAGE_LABELS } from '@/utils/storage-utils'
import { refresh } from '@/api/refresh'

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
      newService: '',
      isCreateService: false
    }
  },
  created() {
    this.getList()
    this.storageEnvs()
    this.storageLabels()
  },
  methods: {
    async getList() {
      this.listLoading = true
      const { data } = await service()
      const items = data
      this.list = items.map(v => {
        this.$set(v, 'edit', false)
        return v
      })
      this.listLoading = false
    },
    async storageEnvs() {
      this.listLoading = true
      const { data } = await env()
      setStorage(STORAGE_ENVS, data)
    },
    async storageLabels() {
      this.listLoading = true
      const { data } = await label()
      setStorage(STORAGE_LABELS, data)
    },
    async confirmSave(row) {
      await saveService(row.service)
      row.edit = false
      row.originalTitle = row.service
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.getList()
    },
    async createService() {
      if (!this.newService) {
        return
      }
      await saveService(this.newService)
      this.newService = ''
      this.isCreateService = false
      this.$message({
        message: '新增成功',
        type: 'success'
      })
      this.getList()
    },
    handleCreate() {
      this.isCreateService = !this.isCreateService
    },
    async deleteItem(row) {
      await deleteService(row.service)
      this.$message({
        message: '删除成功',
        type: 'success'
      })
      this.getList()
    },
    async refreshApplication(row) {
      const { data } = await refresh(row.service)
      this.$message({
        message: `刷新成功，${data.successInstance}成功，${data.failureInstance}失败`,
        type: 'success'
      })
    },
    toApplication(item) {
      this.$router.push({ name: 'ApplicationView', params: { service: item.service }})
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
