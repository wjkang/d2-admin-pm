<template>
  <el-dialog
    title="权限分配"
    :visible.sync="dialogVisible"
  >
    <el-form
      ref="form"
      label-width="5px"
      size="small"
    >
      <el-row style="padding: 0 0 5px 5px;font-weight: bold;">
        当前角色：
      </el-row>

      <el-form-item>
        <el-input
          size="mini"
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          style="padding-bottom: 5px;"
        ></el-input>
        <div style="height: 300px;">
          <el-scrollbar class="aooms-scrollbar">
            <el-tree
              ref="tree"
              show-checkbox
              :expand-on-click-node="false"
              :props="{label: 'title'}"
              highlight-current
              node-key="id"
              :data="permissionList"
              :filter-node-method="filterNode"
            >

              <span
                class="aooms-tree-node"
                slot-scope="{ node, data }"
              >
                <d2-icon
                  :name="node.icon"
                  style="width: 15px;text-align: center;"
                />&nbsp;{{ node.label }}
              </span>

            </el-tree>
          </el-scrollbar>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="submit"
        >保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

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
    }
  },
  methods: {
    dialogOpen() {
      roleService.getRole(this.roleId).then(data => {});
    },
    saveRole() {},
    close() {
      this.dialogVisible = false;
    }
  }
};
</script>

