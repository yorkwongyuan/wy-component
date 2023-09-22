<template>
  <div class='box'>
    <wy-autocomplete clearable :fetchSuggestions="querySearch" v-model="keyword"></wy-autocomplete>
    <!-- <wy-scrollbar height="100px">
      <p v-for="(item, index) in 8">{{ item }}</p>
    </wy-scrollbar> -->
  </div>
</template>
<script lang="ts" setup>
  import { WyScrollbar, WyAutocomplete } from '@wy-component/components';
  import '@wy-component/components/scrollbar/style'
  import '@wy-component/components/input/style'
  import { ref } from 'vue'
  const keyword = ref('')
  const lists = [
    { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
    {
      value: 'Hot honey 首尔炸鸡（仙霞路）',
      address: '上海市长宁区淞虹路661号',
    },
    {
      value: '新旺角茶餐厅',
      address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
    },
    {
      value: '新旺角茶餐厅',
      address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
    },
    {
      value: '新旺角茶餐厅',
      address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
    }
  ]
  const querySearch = (queryString:string, cb: (...args:any[]) => any) => {
    const createFilter = (keyword:string) => {
      return (obj: {value: string}) => {
        return obj.value.includes(keyword)
      }
    }
    var results = queryString
      ? lists.filter(createFilter(queryString))
      : lists
    // 调用 callback 返回建议列表的数据
    cb(results)
  }
</script>
<style lang="scss">
html, body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
