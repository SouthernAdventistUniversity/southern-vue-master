<template>
  
    <div class="hours-lists">
        
        <a 
            v-for="(location, key) in libraryLocations" 
            :key="key" 
            :class="{'active' : isActiveLocation(location.lid)}" 
            @click="activateLocation(location.lid)"
        >{{location.name}}</a>
    
        <div class="hours-lists">                                     
            <ul 
                v-bind:id="'hours-'+location.name" 
                v-for="(location, key) in libraryLocations" 
                :key="key" 
                v-if="activeLocation == location.lid"
            >
                <li 
                    v-for="(time, key) in location.currentWeek" 
                    :key="key"
                >                      
                    <div :class="{'today': isToday(time.date) }">
                        <span>{{formatDay(time.date)}}</span> <span>{{formatTime(time.rendered)}}</span>
                    </div>
                </li>                                        
            </ul>
        </div>
    </div>
</template>

<script>
import jsonp from "jsonp";

export default {
  name: "LibraryHours",
  data: function() {
    return {
      libraryLocations: [],
      activeLocation: ""
    };
  },
  created: function() {
    // const jsonp = require("jsonp");

    let APIurl = "https://api3.libcal.com/api_hours_grid.php?iid=271&lid=3490&format=json&systemTime=0";

    jsonp(APIurl, null, (err, data) => {
      for (let key in data) {
      // for (let i = 0, iKeys = Object.keys(data); i < iKeys.length; i++) {
        let currentWeek = [];

        for (let day in data[key].weeks[0]) {
        // for (let x = 0, xKeys = Object.keys(data[key].weeks[0]); x < keys.length; x++) {
          currentWeek.push(data[key].weeks[0][day]);
        }

        data[key].currentWeek = currentWeek;
        this.libraryLocations.push(data[key]);
      }

      this.activeLocation = this.libraryLocations[0].lid;
    });
  },
  methods: {
    isActiveLocation: function(locationID) {
      return this.activeLocation === locationID;
    },

    activateLocation: function(locationName) {
      this.activeLocation = locationName;
    },

    formatTime: function(time) {
      if (!time) {
        return "Closed";
      } else {
        return time;
      }
    },

    formatDay: function(date) {
      let dateObj = new Date(date + "T10:00:00Z");
      let options = {
        weekday: "short"
      };
      let lang = "en-US";

      try {
        lang = window.SouthernMenuBuilder.utils.getLocale();
      } catch (e) {
        // Do Nothing
      }

      let dateFormatted = dateObj.toLocaleDateString(lang, options);

      return dateFormatted;
    },

    isToday: function(od) {
      let d = new Date();
      let otherDate = new Date(od + "T10:00:00Z");
      let bool = d.toDateString() === otherDate.toDateString();
      return bool;
    }
  }
};
</script>

<style>
</style>
