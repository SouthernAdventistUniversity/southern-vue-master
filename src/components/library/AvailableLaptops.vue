<template>
    <span>{{amount_of_available_laptops}}</span>
</template>

<script>
import axios from "axios";

export default {
  name: "LibraryAvailableLaptops",
  data: function() {
    return {
      amount_of_available_laptops: 0
    };
  },
  created: function() {
    axios
      .get(
        "https://www.southern.edu/_resources-v2/components/library/php/get_laptops.php"
      )
      .then(res => {
        this.amount_of_available_laptops = res.data.item.filter(
          item => item.item_data.base_status !== "0" 
            && item.item_data.barcode.includes("LAPTOP") 
            && !item.item_data.barcode.includes("CORD")
        ).length;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>