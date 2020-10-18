<template>
  <el-dialog
    destroy-on-close
    :title="`${id ? '编辑' : '添加'}资源`"
    :visible="visible"
    @open="fetchResource"
    @close="handleClose"
  >
    <el-form v-loading="isLoading" ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="20">
          <el-form-item
            label="资源名称"
            prop="name"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="请输入"
              :disabled="isSubmiting"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="资源路径"
            prop="url"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.url"
              autocomplete="off"
              placeholder="请输入"
              :disabled="isSubmiting"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="资源分类"
            prop="categoryId"
            :label-width="formLabelWidth"
          >
            <el-select
              v-model="form.categoryId"
              clearable
              placeholder="请选择"
              :disabled="isSubmiting"
            >
              <el-option
                v-for="category in categories"
                :key="category.id"
                :label="category.name"
                :value="category.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="description"
            :label-width="formLabelWidth"
          >
            <el-input
              v-model="form.description"
              type="textarea"
              autocomplete="off"
              placeholder="请输入"
              :rows="3"
              :disabled="isSubmiting"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button :disabled="isSubmiting" @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="isSubmiting" @click="handleSubmit">
        确 定
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { getResource, createOrSaveResource } from '@/services/resource'
export default Vue.extend({
  name: 'CreateOrEditResourceDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: Number,
    categories: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isLoading: false,
      isSubmiting: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        url: '',
        categoryId: undefined,
        description: ''
      },
      rules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入资源路径', trigger: 'blur' }],
        categoryId: [
          { required: true, message: '请输入资源分类', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async fetchResource () {
      if (!this.id) return
      this.isLoading = true
      try {
        const { data } = await getResource(this.id)
        if (data.code === '000000') {
          this.form = data.data
        }
      } finally {
        this.isLoading = false
      }
    },
    async handleSubmit () {
      try {
        await (this.$refs.form as Form).validate()
        this.isSubmiting = true
        const { data } = await createOrSaveResource(this.form)
        if (data.code === '000000') {
          this.$message.success(`${this.id ? '编辑' : '添加'}成功`)
          this.$emit('ok')
          this.handleClose()
        }
      } catch (error) {
        console.error('表单提交失败', error)
      } finally {
        this.isSubmiting = false
      }
    },
    handleClose () {
      ;(this.$refs.form as Form).resetFields()
      this.$emit('update:visible', false)
    }
  }
})
</script>

<style lang="scss" scoped></style>
