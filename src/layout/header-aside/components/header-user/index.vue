<template>
  <el-dropdown size="small" class="d2-mr">
    <span class="btn-text">你好 {{info.name}}</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item @click.native="logOff">
        <d2-icon name="power-off" class="d2-mr-5" /> 注销
      </el-dropdown-item>
      <el-dropdown-item @click.native="resetDb">
        <i class="el-icon-refresh"></i> 初始化
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as sysService from "@/api/sys/sys";
export default {
  computed: {
    ...mapState("d2admin/user", ["info"])
  },
  methods: {
    ...mapActions("d2admin/account", ["logout"]),
    /**
     * @description 登出
     */
    logOff() {
      this.logout({
        vm: this,
        confirm: true
      });
    },
    resetDb() {
      sysService.resetDb().then(() => {
        setTimeout(() => {
          location.reload();
        }, 1500);
      });
    }
  }
};
</script>
