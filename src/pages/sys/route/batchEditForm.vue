<template>
  <el-dialog :visible.sync="dialogVisible" @opened="dialogOpen" @closed="dialogClose">
    <div slot="title">
      路由信息&nbsp;
      <el-button type="primary" size="mini" :loading="loading" @click="save">保存</el-button>
    </div>
    <textarea ref="textarea" />
    <div slot="footer">
      <el-button type="primary" :loading="loading" @click="save">保存</el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </el-dialog>

</template>
<script>
import * as routeService from "@/api/sys/route";
import CodeMirror from "codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/liquibyte.css";
require("script-loader!jsonlint");
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
export default {
  name: "routeEditForm",
  props: {
    value: Boolean
  },
  data() {
    return {
      loading: false,
      dialogVisible: false
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
      if (!this.jsonEditor) {
        this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
          lineNumbers: true,
          lineWrapping: true,
          mode: "application/json",
          gutters: ["CodeMirror-lint-markers", "CodeMirror-foldgutter"],
          theme: "liquibyte",
          foldGutter: true,
          lint: true,
          viewportMargin: Infinity
        });
      }
      routeService.getRouteList().then(data => {
        this.formatRoutes(data);
        this.jsonEditor.setValue(JSON.stringify(data, null, 2));
      });
    },
    formatRoutes(routes) {
      for (let route of routes) {
        route.meta = {
          title: route.title,
          cache: route.cache
        };
        delete route.title;
        delete route.cache;
        if (route.children && route.children.length > 0) {
          this.formatRoutes(route.children);
        }
      }
    },
    save() {
      this.dialogVisible = false;
      this.$emit("submit");
    },
    close() {
      this.dialogClose();
    },
    dialogClose() {
      this.dialogVisible = false;
    }
  }
};
</script>
<style lang="scss">
.CodeMirror {
  border: 1px solid #eee;
  height: auto;
}
.CodeMirror-lint-tooltip {
  z-index: 9999;
}
</style>

