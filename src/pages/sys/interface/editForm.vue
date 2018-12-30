<template>
  <el-dialog title="接口信息" :visible.sync="dialogVisible" @opened="dialogOpen">
    <el-form ref="form" :model="form" label-width="80px" size="small">
      <el-form-item prop="name" label="名称" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="path" label="路径" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.path"></el-input>
      </el-form-item>
      <el-form-item prop="method" label="方法" :rules="[{ required: true, message: '不能为空'}]">
        <el-input v-model="form.method"></el-input>
      </el-form-item>
      <el-form-item prop="description" label="描述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="saveInterface">保存</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>

  </el-dialog>

</template>
<script>
import * as interfaceService from "@/api/sys/interface";
export default {
  name: "interfaceEditForm",
  props: {
    entity: Object,
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false,
      form: {
        name: "",
        path: "",
        method: "",
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
      this.$refs.form.resetFields();
      if (this.entity.id) {
        interfaceService.getInterface(this.entity.id).then(data => {
          let form = {};
          form.name = data.name;
          form.path = data.path;
          form.method = data.method;
          form.description = data.description;
          this.form = form;
        });
      } else {
        this.form = {};
      }
    },
    saveInterface() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          interfaceService
            .saveInterface({ ...this.form, id: this.entity.id })
            .then(data => {
              this.loading = false;
              this.dialogVisible = false;
              this.$emit("submit");
            })
            .catch(() => {
              this.loading = false;
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

