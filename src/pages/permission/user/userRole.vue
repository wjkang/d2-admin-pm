<template>
  <el-dialog
    :visible.sync="dialogVisible"
    @open="dialogOpen"
  >
    <div slot="title">维护
      <el-tag>{{user.name}}</el-tag>角色</div>
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
        prop="email"
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

    <el-table
      :data="tableData"
      v-loading="loading"
      size="small"
      stripe
      highlight-current-row
      style="width: 100%;"
      @sort-change="handleSortChange"
    >
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
        label="状态"
        prop="isAdd"
      >
        <template slot-scope="scope">
          <el-tag
            v-if="scope.row.isAdd==2"
            size="mini"
            type="info"
          >未添加</el-tag>
          <el-tag
            v-if="scope.row.isAdd==1"
            size="mini"
            type="success"
          >已添加</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isAdd==2"
            type="primary"
            title="添加"
            size="mini"
            icon="el-icon-plus"
            circle
            @click="modifyRoleUser(scope.row.id,1)"
          ></el-button>
          <el-button
            v-if="scope.row.isAdd==1"
            type="danger"
            title="移除"
            size="mini"
            icon="el-icon-minus"
            circle
            @click="modifyRoleUser(scope.row.id,0)"
          ></el-button>
        </template>
      </el-table-column>

    </el-table>
    <div slot="footer">
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
    </div>
  </el-dialog>
</template>
<script>
import * as roleService from "@/api/sys/role";
import * as userService from "@/api/sys/user";
export default {
  name: "userRole",
  props: {
    user: Object,
    value: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      searchForm: {
        name: "",
        code: ""
      },
      loading: false,
      tableData: [],
      page: {
        current: 1,
        size: 100,
        total: 0
      },
      sort: {
        prop: "",
        order: ""
      }
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    }
  },
  methods: {
    async dialogOpen() {
      this.getTableData();
    },
    getTableData() {
      let query = {
        pageIndex: this.page.current,
        pageSize: this.page.size,
        sortBy: this.sort.prop,
        descending: this.sort.order === "descending",
        filter: { ...this.searchForm, userId: this.user.id }
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
    modifyRoleUser(roleId, action) {
      userService
        .editRoleUser({
          roleId: roleId,
          userId: this.user.id,
          action: action
        })
        .then(() => {
          let msg = action == 1 ? "已添加" : "已移除";
          this.$notify({
            title: "操作成功",
            message: msg,
            type: "success"
          });
          this.getTableData();
        });
    }
  }
};
</script>

