<template>
  <el-dialog :visible.sync="dialogVisible" @open="dialogOpen">
    <div slot="title">维护<el-tag>{{role.name}}</el-tag>权限</div>
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
    role: Object,
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
      this.permissionList = await menuService.getMenuList();
      let rolePermissions = await roleService.getRolePermissions(this.role.id);
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
        roleId: this.role.id,
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

