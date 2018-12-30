<template>
  <d2-container>
    <template slot="header">
      <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini" style="margin-bottom: -18px;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="searchForm.name" placeholder="名称" style="width: 100px;" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="searchForm.path" placeholder="路径" style="width: 120px;" />
        </el-form-item>
        <el-form-item label="方法" prop="method">
          <el-input v-model="searchForm.method" placeholder="方法" style="width: 120px;" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearchFormSubmit">
            <d2-icon name="search" /> 查询
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleSearchFormReset">
            <d2-icon name="refresh" /> 重置
          </el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="add">
      新增
    </el-button>
    <el-button v-if="multipleSelection.length>0" type="danger" size="mini" icon="el-icon-delete" @click="batchDel">
      删除
    </el-button>
    <el-popover placement="top-start" title="温馨提示" width="400" trigger="hover">
      <li>`路径`与`方法`组合必须唯一</li>
      <el-button slot="reference" size="mini" icon="el-icon-info" style="float:right">
        操作提示
      </el-button>
    </el-popover>
    <el-table :data="tableData" v-loading="loading" size="small" stripe highlight-current-row style="width: 100%;" @selection-change="handleSelectionChange" @sort-change="handleSortChange">

      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="名称" prop="name" sortable="custom">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="路径" prop="path" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.path}}
        </template>
      </el-table-column>
      <el-table-column label="方法" prop="method" sortable="custom" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.method}}
        </template>
      </el-table-column>
      <el-table-column label="状态" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.isLocked}}
        </template>
      </el-table-column>
      <el-table-column label="描述" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" title="编辑" size="mini" icon="el-icon-edit" circle @click="openEditForm(scope.row)"></el-button>
          <el-button type="danger" title="删除" size="mini" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
        </template>
      </el-table-column>

    </el-table>
    <template slot="footer">
      <el-pagination :current-page="page.current" :page-size="page.size" :total="page.total" :page-sizes="[1,100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" style="margin: -10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange">
      </el-pagination>
    </template>
    <edit-form :entity="entity" v-model="editFormVisible" @submit="getTableData" />
  </d2-container>
</template>
<script>
import * as interfaceService from "@/api/sys/interface";
import editForm from "./editForm";
export default {
  name: "InterfacePage",
  components: { editForm },
  data() {
    return {
      searchForm: {
        name: "",
        path: "",
        method: ""
      },
      loading: false,
      tableData: [],
      multipleSelection: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      },
      sort: {
        prop: "",
        order: ""
      },
      entity: {},
      editFormVisible: false
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      let query = {
        pageIndex: this.page.current,
        pageSize: this.page.size,
        sortBy: this.sort.prop,
        descending: this.sort.order === "descending",
        ...this.searchForm
      };
      interfaceService.getInterfacePagedList(query).then(data => {
        this.tableData = data.rows;
        this.page.total = data.totalCount;
      });
    },
    handleSearchFormSubmit() {
      this.getTableData();
    },
    handleSearchFormReset() {
      this.$refs.searchForm.resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSortChange(val) {
      this.sort.prop = val.prop;
      this.sort.order = val.order;
      this.getTableData();
    },
    handleSizeChange(val) {
      this.page.size = val;
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.page.current = val;
      this.getTableData();
    },
    openEditForm(entity) {
      this.entity = entity;
      this.editFormVisible = true;
    },
    add() {
      this.entity = {};
      this.editFormVisible = true;
    },
    batchDel() {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        interfaceService
          .delInterfaces({
            ids: JSON.stringify(this.multipleSelection.map(s => s.id))
          })
          .then(() => {
            this.getTableData();
          });
      });
    },
    del(id) {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        interfaceService.delInterface(id).then(() => {
          this.getTableData();
        });
      });
    }
  }
};
</script>
