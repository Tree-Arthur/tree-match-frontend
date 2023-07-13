<template>
  <template v-if="user">
    <van-cell title="头像" is-link center>
      <van-image round style="height: 48px" :src="user.avatarUrl"/>
    </van-cell>
    <van-cell title="昵称" is-link  :value="user.userName" @click="toEdit('userName',user.userName,'昵称')"/>
    <van-cell title="账号" is-link  :value="user.userAccount" />
    <van-cell title="性别" is-link  :value="user.gender" @click="toEdit('gender',user.gender,'性别')"/>
    <van-cell title="电话" is-link  :value="user.phone"  @click="toEdit('phone',user.phone,'电话')"/>
    <van-cell title="邮箱" is-link  :value="user.email"  @click="toEdit('email',user.email,'邮箱')"/>
    <van-cell title="编号" is-link  :value="user.planetCode" />
    <van-cell title="注册时间" is-link :value="user.createTime" />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user";
//假数据
const mockUser = {
  id: 1,
  userName: 'tree',
  userAccount: 'tree',
  avatarUrl: 'https://avatars.githubusercontent.com/u/93178362?v=4',
  gender: '男',
  phone: '13662996077',
  email: '1181849267@qq.com',
  planetCode: '1',
  createTime: new Date().toDateString(),
}

const user = ref();
//钩子函数 首次加载初始化执行
onMounted(async ()=>{
  user.value = await getCurrentUser();
})

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