<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <template slot="empty">
      无数据
    </template>
    <el-table-column
      v-loading="loading"
      align="center"
      label="序号"
      width="65"
      element-loading-text="加载中"
    >
      <template slot-scope="scope">
        <span>{{ scope.$index+1 }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="300px" label="文件名">
      <template slot-scope="{row}">
        <span>{{ row.filename }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="服务">
      <template slot-scope="{row}">
        <span>{{ row.service }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="环境">
      <template slot-scope="{row}">
        <span>{{ row.env?row.env:'default' }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="标签">
      <template slot-scope="{row}">
        <span>{{ row.label?row.label:'default' }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="100px" label="文件类型">
      <template slot-scope="{row}">
        <span>{{ row.type }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="操作" width="200">
      <template slot-scope="{row}">
        <el-button size="mini" type="primary " @click="updateItem(row)">
          修改
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { list } from '@/api/env'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    service: {
      type: String,
      default: ''
    },
    env: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      list: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      if (!this.service) {
        this.$message({
          message: '请选择服务',
          type: 'error'
        })
        return
      }
      const query = {
        service: this.service,
        env: this.env,
        label: this.label
      }
      const { data } = await list(query)
      this.loading = false
      this.list = data
    },
    updateItem(row) {
      this.$router.push({ name: 'UpdateApplication', query: row })
    }
  }
}
</script>

