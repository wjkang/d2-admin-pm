<template>
  <d2-container class="page">
    <d2-page-cover
      title="D2 Admin PM"
      sub-title="基于D2 Admin实现的RBAC权限管理解决方案">
      <d2-icon-svg
        class="page__logo"
        name="d2-admin"/>
      <template slot="footer">
        <div class="page__btn-group">
          <span @click="$open('https://github.com/wjkang/d2-admin-pm')">Github</span>
        </div>
      </template>
    </d2-page-cover>
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('d2admin/releases', [
      'version'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  .page__logo {
    width: 120px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}
</style>
