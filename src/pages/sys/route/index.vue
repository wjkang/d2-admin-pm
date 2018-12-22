<template>
  <d2-container>
    <el-button-group>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        size="mini"
        @click="add"
      >添加</el-button>
      <el-button
        type="primary"
        icon="el-icon-edit"
        size="mini"
        :disabled="!currentId"
        @click="edit"
      >编辑</el-button>
      <el-button
        type="primary"
        icon="el-icon-delete"
        size="mini"
        :disabled="!currentId"
        @click="del"
      >删除</el-button>
      <el-button
        type="primary"
        icon="el-icon-circle-close-outline"
        :disabled="!currentId"
        size="mini"
        @click="cancel"
      >取消</el-button>
    </el-button-group>
    <el-popover
      placement="top-start"
      title="温馨提示"
      width="400"
      trigger="hover"
    >
      <li>要使`keep-alive`生效，`name`必须与前端组件`name`一致</li>
      <li>`路径`请输入完整路径</li>
      <li>`组件`为前端`routerMapComponents`中的key</li>
      <li>`组件路径`为前端组件在项目中的完整路径</li>
      <li>`组件`与`组件路径`二选一必填，取决于前端采取的方案</li>
      <el-button
        slot="reference"
        size="mini"
        icon="el-icon-info"
        style="float:right"
      >
        操作提示
      </el-button>
    </el-popover>
    <el-row>
      <el-col
        :span="8"
        style='margin-top:15px;'
      >
        <el-tree
          ref="tree"
          class="filter-tree"
          node-key="id"
          highlight-current
          default-expand-all
          :expand-on-click-node="false"
          :data="list"
          :props="defaultProps"
          @node-click="getRouteData"
        >
        </el-tree>
      </el-col>
      <el-col
        :span="16"
        style='margin-top:15px;'
      >
        <el-card shadow="always">
          <el-form
            label-position="right"
            label-width="80px"
            :model="form"
            ref="form"
          >
            <el-form-item
              label="父级节点"
              prop="parentId"
            >
              <el-input
                v-model="form.parentId"
                :disabled="true"
                placeholder="父级节点"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="name"
              prop="name"
            >
              <el-input
                v-model="form.name"
                :disabled="!formEdit"
                placeholder="请输入name"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="标题"
              prop="title"
            >
              <el-input
                v-model="form.title"
                :disabled="!formEdit"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="路径"
              prop="path"
            >
              <el-input
                v-model="form.path"
                :disabled="!formEdit"
                placeholder="请输入路径"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="权限标识"
              prop="permission"
            >
              <el-input
                v-model="form.permission"
                :disabled="!formEdit"
                placeholder="请输入权限标识"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="组件"
              prop="component"
            >
              <el-input
                v-model="form.component"
                :disabled="!formEdit"
                placeholder="请输入组件"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="组件路径"
              prop="componentPath"
            >
              <el-input
                v-model="form.componentPath"
                :disabled="!formEdit"
                placeholder="请输入组件路径"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="排序"
              prop="sort"
            >
              <el-input
                v-model="form.sort"
                :disabled="!formEdit"
                placeholder="请输入排序"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="锁定"
              prop="isLock"
            >
              <el-switch
                v-model="form.isLock"
                :disabled="!formEdit"
              ></el-switch>
            </el-form-item>
            <el-form-item
              label="keep-alive"
              prop="cache"
            >
              <el-switch
                v-model="form.cache"
                :disabled="!formEdit"
              ></el-switch>
            </el-form-item>
            <el-form-item v-if="formEdit">
              <el-button
                type="primary"
                @click="submit"
              >提交</el-button>
              <el-button @click="reset">清空</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
import * as routeService from "@/api/sys/route";
export default {
  name: "RoutePage",
  data() {
    return {
      formEdit: false,
      currentId: 0,
      list: [],
      defaultProps: {
        label: "name"
      },
      form: {
        id: "",
        parentId: 0,
        name: "",
        title: "",
        path: "",
        permission: "",
        component: "",
        componentPath: "",
        sort: 0,
        isLock: false,
        cache: true
      }
    };
  },
  methods: {
    getRouteList() {
      routeService.getRouteList().then(data => {
        this.list = data;
      });
    },
    getRouteData(data) {
      let id = data.id;
      routeService.getRoute(id).then(data => {
        this.form = { ...data };
        this.currentId = id;
      });
    },
    add() {
      this.form = {
        id: 0,
        parentId: this.currentId
      };
      this.formEdit = true;
    },
    edit() {
      this.formEdit = true;
    },
    del() {
      this.$confirm("确认删除？", "确认信息", {
        distinguishCancelAndClose: true,
        confirmButtonText: "删除",
        cancelButtonText: "取消"
      }).then(() => {
        routeService.delRoute(this.currentId).then(() => {
          this.currentId = 0;
          this.getRouteList();
        });
      });
    },
    cancel() {
      this.formEdit = false;
      this.currentId = 0;
      this.form = {};
    },
    submit() {
      routeService.saveRoute(this.form).then(() => {
        routeService.getRouteList().then(data => {
          this.list = data;
        });
      });
    },
    reset() {
      this.form = {
        id: this.currentId,
        parentId: this.form.parentId,
        name: "",
        title: "",
        path: "",
        permission: "",
        component: "",
        componentPath: "",
        sort: 0,
        isLock: false,
        cache: true
      };
    }
  },
  created() {
    this.getRouteList();
  }
};
</script>
