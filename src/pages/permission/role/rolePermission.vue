<template>
  <el-dialog title="权限分配" :visible.sync="dialogVisible" @open="dialogOpen">
    <el-row style="padding: 0 0 5px 5px;font-weight: bold;">
      当前角色：
    </el-row>
    <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText" style="padding-bottom: 5px;"></el-input>
    <el-tree ref="tree" show-checkbox default-expand-all :props="{label: 'title'}" highlight-current node-key="id" :data="permissionList" :filter-node-method="filterNode">
      <span class="aooms-tree-node" slot-scope="{ node, data }">
        <d2-icon :name="node.icon" style="width: 15px;text-align: center;" />&nbsp;{{ node.label }}
      </span>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="saveRolePermission">保存</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>

</template>
<script>
import * as roleService from "@/api/sys/role";
import * as menuService from "@/api/sys/menu";
export default {
  name: "rolePermission",
  props: {
    roleId: String,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      filterText: "",
      permissionList: []
    };
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit("input", val);
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    async dialogOpen() {
      console.log(this.roleId);
      this.permissionList = await menuService.getMenuList();
      let rolePermissions = await roleService.getRolePermissions(this.roleId);
      let rolePermissionList = rolePermissions.map(s => s.functionId);
      this.$refs.tree.setCheckedKeys(rolePermissionList);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    saveRolePermission() {
      let checkedNodes = this.$refs.tree.getCheckedNodes(true, false);
      let checkedPermissins = [];
      for (let checked of checkedNodes) {
        checked.type == 2 && checkedPermissins.push(checked.id);
      }
      let data = {
        roleId: this.roleId,
        permissions: checkedPermissins
      };
      this.loading = true;
      roleService.savePermission(data).then(data => {
        this.loading = false;
        this.dialogVisible = false;
      });
    },
    close() {
      this.dialogVisible = false;
    }
  }
};
</script>

