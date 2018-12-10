<template>
  <d2-container>
    <template slot="header">
      <el-button-group>
        <el-button
          type="primary"
          icon="plus"
          @click="add"
        >添加</el-button>
        <el-button
          type="primary"
          icon="edit"
          :disabled="!currentId"
          @click="edit"
        >编辑</el-button>
        <el-button
          type="primary"
          icon="delete"
        >删除</el-button>
      </el-button-group>
    </template>
    <el-row>
      <el-col
        :span="8"
        style='margin-top:15px;'
      >
        <el-tree
          class="filter-tree"
          node-key="id"
          highlight-current
          :data="menuList"
          :props="defaultProps"
          @node-click="getMenuData"
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
            :model="menuform"
            ref="menuform"
          >
            <el-form-item
              label="父级节点"
              prop="parentId"
            >
              <el-input
                v-model="menuform.parentId"
                :disabled="true"
                placeholder="父级节点"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="标题"
              prop="title"
            >
              <el-input
                v-model="menuform.title"
                :disabled="!formEdit"
                placeholder="请输入标题"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="路径"
              prop="path"
            >
              <el-input
                v-model="menuform.path"
                :disabled="!formEdit"
                placeholder="请输入路径"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="图标"
              prop="icon"
            >
              <el-input
                v-model="menuform.icon"
                :disabled="!formEdit"
                placeholder="请输入图标"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="权限标识"
              prop="permission"
            >
              <el-input
                v-model="menuform.permission"
                :disabled="!formEdit"
                placeholder="请输入权限标识"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="排序"
              prop="sort"
            >
              <el-input
                v-model="menuform.sort"
                :disabled="!formEdit"
                placeholder="请输入排序"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="类型"
              prop="type"
            >
              <el-select
                class="filter-item"
                v-model="menuform.type"
                :disabled="!formEdit"
                placeholder="请选择类型"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.velue"
                  :label="item.label"
                  :value="item.value"
                > </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="formEdit">
              <el-button
                type="primary"
                @click="submit"
              >提交</el-button>
              <el-button @click="cancel">取消</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </d2-container>
</template>

<script>
export default {
  name: "menuManage",
  data() {
    return {
      formEdit: false,
      action: "",
      currentId: "",
      menuList: [
        {
          id: "1",
          title: "一级 1",
          children: [
            {
              id: "2",
              title: "二级 1-1",
              children: [
                {
                  id: "3",
                  title: "三级 1-1-1"
                }
              ]
            }
          ]
        }
      ],
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
        type: 1
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
      ]
    };
  },
  methods: {
    getMenuData(data) {
      let id = data.id;
      this.currentId = id;
    },
    add() {
      this.formEdit = true;
    },
    edit() {
      this.formEdit = true;
    },
    submit() {},
    cancel() {
      this.menuform = {
        parentId: 0,
        title: "",
        path: "",
        icon: "",
        permission: "",
        sort: 0,
        type: 1
      };
    }
  }
};
</script>
