<template>
  <d2-container>
    <template slot="header">
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        size="mini"
        style="margin-bottom: -18px;"
      >
        <el-form-item
          label="名称"
          prop="name"
        >
          <el-input
            v-model="searchForm.name"
            placeholder="名称"
            style="width: 100px;"
          />
        </el-form-item>

        <el-form-item
          label="标识"
          prop="code"
        >
          <el-input
            v-model="searchForm.code"
            placeholder="标识"
            style="width: 120px;"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="handleSearchFormSubmit"
          >
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
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-circle-plus"
      @click="add"
    >
      新增
    </el-button>
    <el-button
      v-if="multipleSelection.length>0"
      type="danger"
      size="mini"
      icon="el-icon-delete"
      @click="batchDel"
    >
      删除
    </el-button>
    <el-popover
      placement="top-start"
      title="温馨提示"
      width="200"
      trigger="hover"
    >
      <li>121212</li>
      <el-button
        slot="reference"
        size="mini"
        icon="el-icon-info"
        style="float:right"
      >
        操作提示
      </el-button>
    </el-popover>
    <el-table
      :data="tableData"
      v-loading="loading"
      size="small"
      stripe
      highlight-current-row
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="名称"
        prop="name"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>

      <el-table-column
        label="标识"
        prop="code"
        sortable="custom"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          {{scope.row.code}}
        </template>
      </el-table-column>

      <el-table-column
        label="描述"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          {{scope.row.description}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            title="编辑"
            size="mini"
            icon="el-icon-edit"
            circle
            @click="openEditForm(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            title="删除"
            size="mini"
            icon="el-icon-delete"
            circle
            @click="delRole(scope.row.id)"
          ></el-button>
          <el-button
            type="warning"
            title="用户列表"
            size="mini"
            icon="el-icon-share"
            circle
            @click="openRoleUserDialog(scope.row)"
          ></el-button>
          <el-button
            title="权限"
            size="mini"
            icon="el-icon-setting"
            circle
            @click="openPermissionDialog(scope.row)"
          ></el-button>
        </template>
      </el-table-column>

    </el-table>
    <template slot="footer">
      <el-pagination
        :current-page="page.current"
        :page-size="page.size"
        :total="page.total"
        :page-sizes="[1,100, 200, 300, 400]"
        layout="total, sizes, prev, pager, next, jumper"
        style="margin: -10px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
    <edit-form
      :role="role"
      v-model="editFormVisible"
      @submit="getTableData"
    />
    <role-permission
      :role="role"
      v-model="permissionDialogVisible"
    />
    <role-user
      :role="role"
      v-model="roleUserDialogVisible"
    />
  </d2-container>
</template>
<script>
import * as roleService from "@/api/sys/role";
import editForm from "./editForm";
import rolePermission from "./rolePermission";
import roleUser from "./roleUser";
export default {
  name: "RolePage",
  components: { editForm, rolePermission, roleUser },
  data() {
    return {
      searchForm: {},
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
      role: { id: "", name: "" },
      editFormVisible: false,
      permissionDialogVisible: false,
      roleUserDialogVisible: false
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
        filter: this.searchForm
      };
      roleService.getRolePagedList(query).then(data => {
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
    delRole(id) {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        roleService.delRole(id).then(() => {
          this.getTableData();
        });
      });
    },
    batchDel() {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        roleService
          .delRoles({
            ids: JSON.stringify(this.multipleSelection.map(s => s.id))
          })
          .then(() => {
            this.getTableData();
          });
      });
    },
    openEditForm(role) {
      this.role = role;
      this.editFormVisible = true;
    },
    add() {
      this.role = {};
      this.editFormVisible = true;
    },
    openPermissionDialog(role) {
      this.role = role;
      this.permissionDialogVisible = true;
    },
    openRoleUserDialog(role) {
      this.role = role;
      this.roleUserDialogVisible = true;
    }
  }
};
</script>
