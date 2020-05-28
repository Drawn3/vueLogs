<template>
  <div class='searching'>
      <div class="select">
        <select class="selecter__search_table" v-model="selected">
            <option value="ServiceName">Сервис</option>
            <option value="Section">Раздел</option>
            <option value="Subsection">Подраздел</option>
        </select>
        <input type="text" v-model="searchingString" placeholder="Поле ввода" class="search__string">
      </div>
      <div class="search">
          <div class="search__btn" @click="searchingInfoLogs">поиск</div>
          <div class="reset__btn" @click="resetSearchLogs">сброс</div>
      </div>
  </div>
</template>

<script>

export default {
    name: 'Searching',
    data(){
        return{
            searchingString: '',
            selected:'ServiceName'
        }
    },
    methods:{
        resetSearchLogs(){
            this.searchingString = '',
            this.selected = 'ServiceName'
            this.$store.dispatch('resetSearchLogs')
        },
        searchingInfoLogs(){
           const searchingValue ={
               searchVal: this.searchingString,
               section: this.selected
           }
           this.$store.dispatch('searchingInfoLogs', searchingValue)
        },
    },
}
</script>

<style>
.searching{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;
}
.selecter__search_table{
    background: #FFFFFF;
    border: 1px solid #000000;
    box-sizing: border-box;
    padding: 3px 20px;
    margin-right: 10px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #000000;
}
.search__string{
    padding: 3px 14px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
}
.search__btn{
    display: inline-block;
    background: linear-gradient(0deg, #969696, #969696), linear-gradient(0deg, #969696, #969696), #969696;
    color: #FFFFFF;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    width: 117px;
    padding: 4px 11px;
    margin-right: 20px;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
}
.reset__btn{
    display: inline-block;
    background: linear-gradient(0deg, #969696, #969696), linear-gradient(0deg, #969696, #969696), #969696;
    color: #FFFFFF;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    width: 117px;
    padding: 4px 11px;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
}
</style>