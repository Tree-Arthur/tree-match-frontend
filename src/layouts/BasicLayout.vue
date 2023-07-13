<template>
<!--  顶部bar组件-->
  <van-nav-bar fixed="true"
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
<!--  内容显示页面  style="padding: 46px 0px 50px 0" -->
  <div id="content" style="padding: 46px 0px 50px 0" >
   <router-view/>
  </div>
<!--  底部导航-->
  <van-tabbar route  @change="onChange" >
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<!--setup 语法糖 减少return书写-->
<script setup lang="ts">
  import {showToast} from "vant";
  import {useRoute, useRouter} from "vue-router";
  import {ref} from "vue";
  import routes from "../config/route";
  const router = useRouter();//控制页面跳转
  const route = useRoute();//获取页面信息
  const DEFAULT_TITLE = '雪泥匹配';//常量默认标题
  const title =ref(DEFAULT_TITLE);//标题赋值
  /**
   * 根据路由切换标题
   */
  router.beforeEach((to,from)=>{
    const toPath = to.path;
    const route = routes.find((route) => {
      return toPath == route.path;//遍历路由找到相等就返回
    })
    title.value = route?.title ?? DEFAULT_TITLE;//如果
  })

  const onClickLeft = () => {
    // 字符串路径 回到上一个页面
    router.back();
  };
  //点击右边搜索图标
  const onClickRight = () => {
    // 字符串路径
    router.push('/search')
  };

</script>

<style scoped>
#content {
  padding-bottom: 50px;
}

</style>