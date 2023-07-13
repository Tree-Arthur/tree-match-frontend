<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <!--  分割线-->
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0">请选择标签</div>
<!--  行列布局组件-->
  <van-row gutter="16">
    <van-col v-for="tag in activeIds">
      <!--  tag标签组件-->
      <van-tag closeable size="small" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>


  <!--  分割线-->
  <van-divider content-position="left">选择标签</van-divider>
  <!--    分类选择 style="height: 384px"-->
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
  />
  <div style="padding: 16px">
    <van-button block type="primary" @click="doSearchResult">搜索</van-button>
  </div>
</template>

<!--setup 语法糖 减少return书写-->
<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";

const searchText = ref('');
//TagList原始数据
const originTagList = [
  {
    text: '性别',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '年级',
    children: [
      {text: '大一', id: '大一'},
      {text: '大二', id: '大二'},
      {text: '大3', id: '大3'},
      {text: '大4', id: '大4'},
      {text: '大5', id: '大555555'},
      {text: '大6', id: '大666666'},
    ],
  },
  {
    text: '编程语言',
    children: [
      {text: 'java', id: 'java'},
      {text: 'c', id: 'c'},
      {text: 'c++', id: 'c++'},
    ],
  },
]
//标签列表
let tagList = ref(originTagList);
/**
 * 搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag => {
    //克隆原始数据
    const tempChildren = [...parentTag.children];
    const tempParentTag = {...parentTag};
    tempParentTag.children = tempChildren
          // 过滤 标签item包含搜索词就保留否则过滤
          .filter(item => item.text.includes(searchText.value));
        return tempParentTag;
  })
}

const onCancel = () => {
  // 清空
  searchText.value = '';
  tagList.value = originTagList;
}


//已选中的标签
const activeIds = ref([]);//默认空
const activeIndex = ref(0);

//移除标签
const doClose = (tag) =>{
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag
  })
}

const router = useRouter()//引入路由
//搜索按钮
const doSearchResult = () =>{
  router.push({
    path: 'user/list',
    query:{
      tags: activeIds.value
    }
  })
}

</script>

<style scoped>

</style>