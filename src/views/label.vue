<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-if="isCreateLabel" v-model="newLabel" placeholder="分支名" style="width: 200px;" class="filter-item" @keyup.enter.native="createLabel" />
      <el-button v-if="!isCreateLabel" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-plus" @click="handleCreate">
        新增分支
      </el-button>
      <el-button v-if="isCreateLabel" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-check" @click="createLabel">
        确定
      </el-button>
      <el-button v-if="isCreateLabel" class="filter-item" style="margin-left: 10px;margin-bottom: 10px" type="primary" icon="el-icon-close" @click="handleCreate">
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
      <el-table-column min-width="300px" label="分支名">
        <template slot-scope="{row}">
          <span :title="row">{{ row }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="{row}">
          <el-button v-if="row!=='master'" size="mini" type="danger" @click="deleteItem(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { label, deleteLabel, saveLabel } from '@/api/storage'
import { setStorage, getStorage, STORAGE_LABELS } from '@/utils/storage-utils'

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
      newLabel: '',
      isCreateLabel: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList(update) {
      this.listLoading = true
      const storage = getStorage(STORAGE_LABELS)
      if (storage && !update) {
        this.list = storage
      } else {
        const { data } = await label()
        this.list = data
        setStorage(STORAGE_LABELS, data)
      }
      this.listLoading = false
    },
    async createLabel() {
      if (!this.newLabel) {
        return
      }
      await saveLabel(this.newLabel)
      this.newLabel = ''
      this.isCreateLabel = false
      this.$message({
        message: '新增成功',
        type: 'success'
      })
      this.getList(true)
    },
    handleCreate() {
      this.isCreateLabel = !this.isCreateLabel
    },
    async deleteItem(row) {
      await deleteLabel(row)
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
