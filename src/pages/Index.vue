<template>
  <van-cell center title="心动模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="数据为空"/>
</template>

<!--setup 语法糖 减少return书写-->
<script setup lang="ts">
import { ref, watchEffect} from 'vue';
import myAxios from "../plugins/myAxios";

import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

const isMatchMode = ref<boolean>(false);
const userList = ref([]);
const loading = ref(true);

const loadDate = async () => {
  let userListData;//公共变量
  loading.value = true;
  if (isMatchMode.value){//匹配模式根据标签匹配用户
    const num = 5;//匹配num个用户
    userListData = await myAxios.get('/user/match', {//发送get请求地址
      params: {//参数
        num,
      },
    })
        .then(function (response) {
          console.log('/user/match succeed',response);
          showSuccessToast('请求成功');
          return response?.data;//返回响应数据
        })
        .catch(function (error) {
          console.log('/user/match error',error);
          showFailToast('请求失败');
        })

  }else {//普通模式直接分页查询
    userListData = await myAxios.get('/user/recommend', {
      params: {//分页参数
        pageSize: 10,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed',response);
          showSuccessToast('请求成功');
          return response?.data?.records;
        })
        .catch(function (error) {
          console.log('/user/recommend error',error);
          showFailToast('请求失败');
        })
  }
  if (userListData){//有数据
    //json转数组
    userListData.forEach((user: UserType) =>{
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;//赋值回去
  }
  loading.value = false;
}
//监听变量
watchEffect(() => {
  loadDate();
})

</script>

<style scoped>

</style>