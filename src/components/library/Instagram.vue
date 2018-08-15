<template>
    <div class="grid-x">
        <div 
            class="cell small-6 medium-3 photoHolder" 
            v-for="(photo, key) in photos.slice(0,8)"
            :key="key"
        >
            
            <a target="_blank" v-bind:href="photo.link" v-bind:title="photo.caption">
                <div class="photo">
                    <img class="pic" draggable="false" v-bind:src="photo.image" />
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LibraryInstagram",
  data: function() {
    return {
      photos: []
    };
  },
  created: function() {
    axios
      .get(
        "https://www.southern.edu/_resources-v2/components/library/php/load_ig.php"
      )
      .then(res => {
        this.photos = res.data;
      });
  }
};
</script>

<style scoped>
</style>