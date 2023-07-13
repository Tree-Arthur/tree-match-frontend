<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍"  @search="onSearch"/>
    <van-tabs v-model:active="active" @change="onTabChance">
      <van-tab title="公开" name="public"/>
      <van-tab title="加密" name="private"/>
    </van-tabs>
    <van-button
        class="add-button"
        style="position: fixed;border-radius: 50%;height: 50px;"
        type="primary"
        @click="toCreateTeam"
        icon="plus"/>
    <team-card-list :team-list="teamList" />
    <van-empty v-if="teamList?.length < 1" description="搜索结果为空"/>

  </div>
</template>
<script setup lang="ts">

import {useRouter} from "vue-router";//请求后端接口
import {onMounted, ref} from "vue";
import {showFailToast, showToast} from "vant";
import TeamCardList from "../components/TeamCardList.vue";
import myAxios from "../plugins/myAxios";

const router = useRouter();
const active = ref('public');
/**
 * 切换查询状态
 * @param name
 */
const onTabChance = (name) =>{
  if (name == 'public'){
    listTeam(searchText.value,0);//查公开
  }else {
    listTeam(searchText.value,2);//查加密
  }
}

/**
 * 搜索队伍
 * @param val
 * @param status 公开
 * @returns {Promise<void>}
 */
const listTeam = async (val= '',status=0) =>{
  const res = await myAxios.get("/team/list",{
    params: {
      searchText: val,
      pageNum: 1,
      status,
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