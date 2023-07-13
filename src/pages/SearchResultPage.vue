<template>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="搜索结果为空"/>
</template>

<!--setup 语法糖 减少return书写-->
<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";

import qs from 'qs'
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/UserCardList.vue";

const route = useRoute()//
const {tags} = route.query;

const userList = ref([]);
const loading = ref(true);

//钩子函数
onMounted(async ()=>{
  loading.value = true;
  // Optionally the request above could also be done as
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList: tags
    },paramsSerializer: params => {
      return qs.stringify(params,{indices: false})
    }
  })
      .then(function (response) {
        console.log('/user/search/tags succeed',response);
        showSuccessToast('请求成功')
        return response?.data;
      })
      .catch(function (error) {
        console.log('/user/search/tags error',error);
        showFailToast('请求失败')
      })
  if (userListData){
    //json转数组
    userListData.forEach(user =>{
      if (user.tags){
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
})
//mock假数据
const mockUser = {
  id: 1,
  userName: 'tree',
  userAccount: 'tree',
  profile: '请叫我雪泥大王',
  avatarUrl: 'https://avatars.githubusercontent.com/u/93178362?v=4',
  gender: '男',
  phone: '13662996077',
  email: '1181849267@qq.com',
  userRole: 0,
  tags: ['java','emo','学习中','emo','学习中'],
  planetCode: '1',
  createTime: new Date().toDateString(),
}

</script>

<style scoped>

</style>