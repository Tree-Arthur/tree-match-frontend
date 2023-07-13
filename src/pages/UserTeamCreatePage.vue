<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
    <van-button
        class="add-button"
        style="position: fixed;border-radius: 50%;height: 50px;"
        type="primary"
        @click="toCreateTeam"
        icon="plus"/>
    <team-card-list :team-list="teamList"/>
    <van-empty v-if="teamList?.length < 1" description="搜索结果为空"/>
  </div>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";//路由 页面跳转
import {onMounted, ref} from "vue";
import {showFailToast, showToast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../plugins/myAxios";

const router = useRouter();

/**
 * 搜索队伍
 * @param val
 * @returns {Promise<void>}
 */
const listTeam = async (val= '') =>{
  const res = await myAxios.get("/team/list/my/create",{
    params: {
      searchText: val,
      pageNum: 1,
    }
  });
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    showFailToast('加载队伍失败,请刷新重试');
  }
}
//搜索队伍框
const searchText = ref('');
const onSearch =  (val) => {
  listTeam(val);
};
//跳转到创建队伍页
const toCreateTeam = () => {
  router.push({
    path: "/team/add"
  })
}
const teamList = ref([]);

//页面加载时只触发一次
onMounted( () => {
  listTeam('');
})




</script>

<style scoped>

</style>