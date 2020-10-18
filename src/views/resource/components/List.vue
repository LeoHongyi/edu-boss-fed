<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="资源名称" prop="name">
          <el-input v-model="form.name" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input v-model="form.url" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select v-model="form.categoryId" placeholder="请选择资源分类" clearable>
            <el-option :label="item.name" :key="item.id" :value="item.id" v-for="item in resourcesCategories">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="isloading" @click="onSubmit">Query</el-button>
          <el-button @click="onReset" :disabled="isloading">clear</el-button>
        </el-form-item>
      </el-form>
      </div>
      <el-table
        :data="resources"
        style="width: 100%; margin-bottom: 20px"
        v-loading="isloading">
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="url"
          label="资源路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          label="添加时间"
          :formatter="dateFmt">
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="isloading"
              @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              :disabled="isloading"
              @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :disabled="isloading"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="form.current"
        :page-sizes="[5, 10, 20]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </el-card>
    <create-or-edit-resource-dialog
      :visible.sync="visible"
      :id="id"
      :categories="resourcesCategories"
      @ok="loadResources"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { formatDate } from '../../../utils/timefmt'
import { getResourcePages, deleteResource } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import CreateOrEditResourceDialog from './CreateOrEditResourceDialog.vue'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'ResouceList',
  created () {
    this.loadResources()
    this.loadResourceCategories()
  },
  components: {
    CreateOrEditResourceDialog
  },
  data () {
    return {
      resources: [],
      form: {
        user: '',
        url: '',
        current: 1,
        size: 5,
        categoryId: null
      },
      visible: false,
      id: 0,
      totalCount: 0,
      resourcesCategories: [],
      isloading: true
    }
  },
  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategories()
      this.resourcesCategories = data.data
    },
    async loadResources () {
      this.isloading = true
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isloading = false
    },
    onSubmit () {
      this.form.current = 1
      this.loadResources()
    },
    dateFmt (row: any) {
      return formatDate(new Date(row.createdTime), 'yyyy-MM-dd')
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      this.form.current = val
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1
      this.loadResources()
    },
    handleDelete (record: any) {
      this.$confirm('确定删除吗？', '删除提示').then(async () => {
        const { data } = await deleteResource(record.id)
        if (data.code === '000000') {
          this.loadResources()
        }
      })
    },
    handleEdit (record: any) {
      this.id = record.id
      this.visible = true
    }
  }
})
</script>
