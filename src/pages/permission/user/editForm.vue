<template>
  <el-dialog title="用户信息" :visible.sync="dialogVisible" @open="dialogOpen">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item prop="name" label="账号" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="trueName" label="用户名称" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.trueName"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="saveUser">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as userService from "@/api/sys/user";
export default {
  name: "userEditForm",
  props: {
    user: Object,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        name: "",
        trueName: "",
        phone:"",
        email: ""
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
      userService.getUser(this.user.id).then(data => {
        this.form.name = data.name;
        this.form.trueName = data.trueName;
        this.form.phone = data.phone;
        this.form.email = data.email;
      });
    },
    saveUser() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          userService
            .saveUser({ ...this.form, id: this.user.id })
            .then(data => {
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

