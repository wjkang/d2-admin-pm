<template>
  <d2-container>
    <el-button-group>
      <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="add">添加</el-button>
      <el-button type="primary" icon="el-icon-edit" :disabled="!currentId" size="mini" @click="edit">编辑</el-button>
      <el-button type="primary" icon="el-icon-delete" :disabled="!currentId" size="mini" @click="del">删除</el-button>
      <el-button type="primary" icon="el-icon-circle-close-outline" :disabled="!currentId" size="mini" @click="cancel">取消</el-button>
      <el-button v-permission="['xxxx']" type="primary" icon="el-icon-edit" size="mini" @click="batchEdit">批量编辑</el-button>
    </el-button-group>
    <el-popover placement="top-start" title="温馨提示" width="400" trigger="hover">
      <li>请不要在`功能`类型节点下建子节点</li>
      <li>`菜单`类型节点的权限标识请设置为其某个`功能`类型子节点的权限标识</li>
      <el-button slot="reference" size="mini" icon="el-icon-info" style="float:right">
        操作提示
      </el-button>
    </el-popover>
    <el-row>
      <el-col :span="8" style='margin-top:15px;'>
        <el-tree ref="tree" class="filter-tree" node-key="id" default-expand-all highlight-current :expand-on-click-node="false" :data="menuList" :props="defaultProps" @node-click="getMenuData">
        </el-tree>
      </el-col>
      <el-col :span="16" style='margin-top:15px;'>
        <el-card shadow="always">
          <el-form label-position="right" label-width="80px" :model="menuform" ref="menuform">
            <el-form-item label="父级节点" prop="parentId">
              <el-input v-model="menuform.parentId" :disabled="true" placeholder="父级节点"></el-input>
            </el-form-item>

            <el-form-item label="标题" prop="title">
              <el-input v-model="menuform.title" :disabled="!formEdit" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="路径" prop="path">
              <el-input v-model="menuform.path" :disabled="!formEdit" placeholder="请输入路径"></el-input>
            </el-form-item>
            <el-form-item label="图标" prop="icon">
              <d2-icon-select v-model="menuform.icon" :user-input="true" />
            </el-form-item>
            <el-form-item label="权限标识" prop="permission">
              <el-input v-model="menuform.permission" :disabled="!formEdit" placeholder="请输入权限标识"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="menuform.sort" :disabled="!formEdit" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="type">
              <el-select class="filter-item" v-model="menuform.type" :disabled="!formEdit" placeholder="请选择类型">
                <el-option v-for="item in typeOptions" :key="item.velue" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="锁定" prop="isLock">
              <el-switch v-model="menuform.isLock" :disabled="!formEdit"></el-switch>
            </el-form-item>
            <el-form-item v-if="formEdit">
              <el-button type="primary" @click="submit">提交</el-button>
              <el-button @click="reset">清空</el-button>
              <el-button v-if="menuform.id&&menuform.type==2" @click="openInterfaceDialog">关联接口</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <edit-form v-model="editFormDialogVisible" @submit="getMenuList" />
    <relate-interface-form :menu="menuform" v-model="relateInterfaceDialogVisible" />
  </d2-container>
</template>

<script>
import * as menuService from "@/api/sys/menu";
import editForm from "./batchEditForm";
import relateInterfaceForm from "./relateInterfaceForm";
export default {
  name: "MenuPage",
  components: { editForm, relateInterfaceForm },
  data() {
    return {
      formEdit: false,
      currentId: 0,
      menuList: [],
      defaultProps: {
        label: "title"
      },
      menuform: {
        id: "",
        parentId: 0,
        title: "",
        path: "",
        icon: "",
        permission: "",
        sort: 0,
        type: 1,
        isLock: false
      },
      typeOptions: [
        {
          value: 1,
          label: "菜单"
        },
        {
          value: 2,
          label: "功能"
        }
      ],
      editFormDialogVisible: false,
      relateInterfaceDialogVisible: false
    };
  },
  methods: {
    getMenuList() {
      menuService.getMenuList().then(data => {
        this.menuList = data;
      });
    },
    getMenuData(data) {
      let id = data.id;
      menuService.getMenu(id).then(data => {
        this.menuform = {
          id: data.id,
          parentId: data.parentId,
          title: data.title,
          path: data.path,
          icon: data.icon,
          permission: data.permission,
          sort: data.sort,
          type: data.type,
          isLock: data.isLock
        };
        this.currentId = id;
      });
    },
    add() {
      this.menuform = {
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
        menuService.delMenu(this.currentId).then(() => {
          this.currentId = 0;
          this.getMenuList();
        });
      });
    },
    cancel() {
      this.formEdit = false;
      this.currentId = 0;
      this.menuform = {};
    },
    submit() {
      menuService.saveMenu(this.menuform).then(() => {
        menuService.getMenuList().then(data => {
          this.menuList = data;
        });
      });
    },
    reset() {
      this.menuform = {
        id: this.currentId,
        parentId: this.menuform.parentId,
        title: "",
        path: "",
        icon: "",
        permission: "",
        sort: 0,
        type: 1,
        isLock: false
      };
    },
    batchEdit() {
      this.editFormDialogVisible = !this.editFormDialogVisible;
    },
    openInterfaceDialog() {
      this.relateInterfaceDialogVisible = !this.relateInterfaceDialogVisible;
    }
  },
  created() {
    this.getMenuList();
  }
};
</script>
