<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({
          name: 'menu-create'
        })">添加菜单</el-button>
        <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
      </div>
      <el-table
        :data="menus"
        style="width: 100%">
        <el-table-column
          label="编号"
          type="index" min-width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="菜单名称" min-width="150">
        </el-table-column>
        <el-table-column
          prop="level"
          label="菜单级数" min-width="150">
        </el-table-column>
        <el-table-column
          prop="icon"
          label="前端图标" min-width="150">
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序" min-width="150">
        </el-table-column>
        <el-table-column
          label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete($index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { getAllMenu, deleteMenu } from '@/services/menu'
import Vue from 'vue'

export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadAllMenus()
  },
  methods: {
    async loadAllMenus () {
      const { data } = await getAllMenu()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },

    handleEdit (item: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },
    handleDelete (index: number, item: any) {
      this.$confirm('确认删除么?', '删除提示', {
      }).then(async () => {
        const { data } = await deleteMenu(item.id)
        if (data.code === '000000') {
          this.$message.success('删除成功')
          this.loadAllMenus()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
