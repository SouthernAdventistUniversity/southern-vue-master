<template>
    <span>{{amount_of_available_rooms}}</span>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LibraryAvailableRooms',
    data: function() {
        return {
            amount_of_available_rooms: 0
        }
    },    
    created: function() {
        axios.get('https://www.southern.edu/_resources-v2/components/library/php/get_access_token.php').then(resa => {
            
            let access_token = resa.data.access_token;
            let now = new Date();
            
            axios.get('https://api2.libcal.com/1.1/room_groups?access_token=' + access_token).then(resb => {
                
                let room_ids = resb.data.groups[0].room_ids;
                this.amount_of_available_rooms = 0;

                room_ids.forEach(room_id => {
                 
                    axios.get('https://api2.libcal.com/1.1/room_availability?room_id=' + room_id + '&access_token=' + access_token).then(resc => {

                        if (resc.data.availability.timeslots.length > 0) {                            
                            for (let i = 0; i < resc.data.availability.timeslots.length; i++) {
                                let start = new Date(resc.data.availability.timeslots[i].start);
                                let end = new Date(resc.data.availability.timeslots[i].end);

                                if (now > start && now < end) {
                                    this.amount_of_available_rooms++;
                                }
                            }
                        }
                    })
                });
            })
        })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
