<template>
  <div class="app-container">
    <el-form ref="form" :model="item" :rules="rules" label-width="120px">
      <el-form-item label="服务名" prop="service">
        <el-input v-model="item.service" :disabled="true" />
      </el-form-item>
      <el-form-item label="环境" prop="env">
        <el-radio-group v-model="item.env" :disabled="!isCreate" @change="changeType">
          <el-radio v-for="ty in envs" :key="ty" v-model="item.env" :label="ty" :value="ty" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分支" prop="label">
        <el-radio-group v-model="item.label" :disabled="!isCreate" @change="changeType">
          <el-radio v-for="ty in labels" :key="ty" v-model="item.label" :label="ty" :value="ty" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文件类型" prop="type">
        <el-radio-group v-model="item.type" :disabled="!isCreate" @change="changeType">
          <el-radio v-for="ty in types" :key="ty" v-model="item.type" :label="ty" :value="ty" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文件内容">
        <codemirror v-model="applicationText" class="ui-code" :options="cmOptions" />
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import { getStorage, STORAGE_ENVS, STORAGE_LABELS } from '@/utils/storage-utils'
import { get, create, update } from '@/api/env'
require('codemirror/mode/properties/properties.js')
require('codemirror/mode/yaml/yaml.js')
require('codemirror/addon/fold/foldcode.js')
require('codemirror/addon/fold/foldgutter.js')
require('codemirror/addon/fold/brace-fold.js')
require('codemirror/addon/fold/xml-fold.js')
require('codemirror/addon/fold/indent-fold.js')
require('codemirror/addon/fold/markdown-fold.js')
require('codemirror/addon/fold/comment-fold.js')
export default {
  components: {
    codemirror
  },
  data: function() {
    return {
      cmOptions: {
        mode: 'properties',
        lineNumbers: true,
        viewportMargin: 20,
        lineWrapping: true,
        lineWiseCopyCut: true,
        showCursorWhenSelecting: true,
        matchBrackets: true,
        line: true
      },
      rules: {
        service: [{ required: true, message: '请输入', trigger: 'blur' }],
        env: [{ required: true, message: '请选择', trigger: 'blur' }],
        label: [{ required: true, message: '请选择', trigger: 'blur' }],
        type: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      isCreate: false,
      item: {
        service: '',
        env: 'default',
        label: 'default',
        type: 'yml'
      },
      applicationText: '',
      modes: {
        'yml': 'yaml',
        'properties': 'properties'
      },
      types: ['yml', 'properties'],
      envs: [],
      labels: []
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    initData() {
      const _this = this
      _this.isCreate = _this.$route.name === 'CreateApplication'
      _this.item.service = _this.$route.query.service
      _this.item.env = _this.convertIfEmpty(_this.$route.query.env, 'default')
      _this.item.label = _this.convertIfEmpty(_this.$route.query.label, 'default')
      _this.item.type = _this.$route.query.type
      _this.envs = ['default'].concat(getStorage(STORAGE_ENVS))
      _this.labels = ['default'].concat(getStorage(STORAGE_LABELS))
      if (!_this.isCreate) {
        _this.getFileText()
      }
    },
    async getFileText() {
      const { data } = await get(this.item)
      this.applicationText = data
    },
    submit() {
      const _this = this
      _this.$refs.form.validate((valid) => {
        if (valid) {
          _this.createOrUpdate()
        }
      })
    },
    async createOrUpdate() {
      const param = this.item
      param.text = this.applicationText
      if (this.isCreate) {
        await create(param)
      } else {
        await update(param)
      }
      this.$message({
        message: '保存成功',
        type: 'success'
      })
    },
    changeType() {
      this.cmOptions.mode = this.modes[this.item.type]
    },
    convertIfEmpty(obj, emObj) {
      return (obj === undefined || obj === '') ? emObj : obj
    }
  }
}
</script>

<style>
.line{
  text-align: center;
}
.ui-code{
  border: #bfcbd9 1px solid;
}
.CodeMirror{
  height: 500px;
  font-size: 16px;
  line-height: 20px;
  font-family: Consolas,serif;
}
</style>

