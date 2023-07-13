<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.userName" />
    <van-cell title="修改信息" is-link to="/user/update" />
    <van-cell title="我创建的队伍" is-link to="/user/team/create" />
    <van-cell title="我加入的队伍" is-link to="/user/team/join" />
    <div style="padding: 16px">
      <van-button block type="primary" @click="doLogout">退出登录</van-button>
    </div>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
import myAxios from "../plugins/myAxios";

const user = ref();


//钩子函数 首次加载初始化执行
onMounted(async ()=>{
  user.value = await getCurrentUser();
  if (!user.value){//如果用户为空
    router.push({
      path: '/user/login'
    })
  }
})
//退出登录按钮
const doLogout = async () =>{
  await myAxios.post('/user/logout');//请求后端logout接口
  router.push({
    path: '/user/login',//自动跳转登录页
  })
}

// 传递参数
const router = useRouter();

const toEdit = (editKey: string, currentValue: string, editName: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      currentValue,
      editName
    }
  })
}

</script>

<style scoped>

</style>