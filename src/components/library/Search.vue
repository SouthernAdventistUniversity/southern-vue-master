<template>
  
     <div class="search">
        <input id="search-query" type="text" v-model="searchQuery" />
        <select id="search-option" v-model="selected"  @change.prevent="onChange">
            <option 
                v-for="(option, key) in searchUrls" 
                :key="key" 
                :value="option.url"
                :selected="option.default === true ? 'selected' : false"
            >{{option.name}}{{option.default}}</option>
        </select>
        <button @click="doSearch"><i class="fa fa-search"></i></button>
    </div>

</template>

<script>
export default {
  name: "LibrarySearch",
  data() {
    return {
      searchUrls: [{
          name: 'All Resources',
          url: 'https://southern-primo.hosted.exlibrisgroup.com/primo-explore/search?fn=Search&amp;vid=01SAU&amp;institution=01SAU&amp;mode=Advanced&amp;query=any,contains,%query%&amp;vl(freeText0)=%query%&amp;sortby=rank'
        },
        {
          name: 'Books',
          url: 'https://southern-primo.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,%query%&amp;tab=default_tab&amp;sortby=rank&amp;vid=01SAU&amp;facet=rtype,include,books&amp;mode=Advanced&amp;offset=0&amp;fn=Search'
        },
        {
          name: 'Online Resources',
          url: 'https://southern-primo.hosted.exlibrisgroup.com/primo-explore/search?vid=01SAU&amp;lang=en_US&amp;institution=01SAU&amp;vid=01SAU&amp;search_scope=Online%20Resources&amp;displayMode=Basic&amp;query=any,contains,%query%'
        },
        {
          name: 'Course Reserves',
          url: 'https://southern-primo.hosted.exlibrisgroup.com/primo-explore/search?vid=01SAU&amp;lang=en_US&amp;institution=01SAU&amp;vid=01SAU&amp;search_scope=01SAU_INST_CR&amp;displayMode=Basic&amp;query=any,contains,%query%'
        },
        {
          name: 'Journal by Name',
          url: 'https://southern-primo.hosted.exlibrisgroup.com/primo-explore/jsearch?vid=01SAU&amp;lang=en_US&amp;query=any,contains,%query%'
        },
        {
          name: 'Google Scholar',
          url: 'https://scholar.google.com/scholar?&amp;q=%query%&amp;oq='
        }
      ],
      selected: '',
      searchQuery: ''
    };
  },
  computed: {
    selectedOption() {
      return this.searchUrls.find(url => url.url === this.selected).url;
    }
  },
  created() {
    this.selected = this.searchUrls[0].url;
  },
  methods: {
    doSearch() {
      let extSearchUrl = this.selected.replace(new RegExp('%query%', 'g'), this.searchQuery);

      window.open(extSearchUrl);
    },
    onChange() {}
  }
};
</script>

<style>
</style>
