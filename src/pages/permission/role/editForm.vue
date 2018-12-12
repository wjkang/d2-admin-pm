<template>
  <el-dialog
    title="角色信息"
    :visible.sync="dialogVisible"
    @open="dialogOpen"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      size="small"
    >
      <el-form-item
        prop="name"
        label="角色名称"
        :rules="[{ required: true, message: '不能为空'}]"
      >
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="code"
        label="角色标识"
        :rules="[{ required: true, message: '不能为空'}]"
      >
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          type="textarea"
          class="aooms-form-textarea"
          v-model="form.description"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="saveRole"
        >保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as roleService from "@/api/sys/role";
export default {
  name: "roleEditForm",
  props: {
    roleId: String,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        name: "",
        code: "",
        description: ""
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
    dialogOpen() {
      roleService.getRole(this.roleId).then(data => {
        this.form.name = data.name;
        this.form.code = data.code;
        this.form.description = data.description;
      });
    },
    saveRole() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          roleService.saveRole({ ...this.form, id: this.roleId }).then(data => {
            this.loading = false;
            this.dialogVisible = false;
            this.$emit("submit");
          });
        } else {
          return false;
        }
      });
    },
    close() {
      this.$refs["form"].resetFields();
      this.dialogVisible = false;
    }
  }
};
</script>

