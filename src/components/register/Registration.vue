<template>
    <div class="component-registration">
    <div class="card" 
      :class="{active : visible === key}" 
      v-for="(term, key) in activeTerms" 
      :key="key">
        <div class="card-divider grid-x" @click="visible = key">
        <span class="cell small-7">
            <b>{{term.TermDescription}}</b>
        </span>
        <span class="cell small-5 text-right">Classes begin:
            <b>{{formatDate(term.StartDate)}}</b>
        </span>
        </div>

        <div class="card-section" v-show="visible === key">
        <h3>Registration dates: </h3>

        <ul>
            <li class="grid-x" v-if="term.GradRegBeginDate">
            <span class="cell small-8">Current graduate students</span>
            <span class="cell small-4">
                <strong>{{openDate(term.GradRegBeginDate)}}</strong>
            </span>
            </li>
            <li class="grid-x" v-if="term.SeniorRegBeginDate">
            <span class="cell small-8">Current Southern seniors</span>
            <span class="cell small-4">
                <strong>{{openDate(term.SeniorRegBeginDate)}}</strong>
            </span>
            </li>
            <li class="grid-x" v-if="term.JuniorRegBeginDate">
            <span class="cell small-8">Current Southern juniors</span>
            <span class="cell small-4">
                <strong>{{openDate(term.JuniorRegBeginDate)}}</strong>
            </span>
            </li>
            <li class="grid-x" v-if="term.SophomoreRegBeginDate">
            <span class="cell small-8">Current Southern sophomores</span>
            <span class="cell small-4">
                <strong>{{openDate(term.SophomoreRegBeginDate)}}</strong>
            </span>
            </li>
            <li class="grid-x" v-if="term.OtherRegBeginDate">
            <span class="cell small-8">Other current students</span>
            <span class="cell small-4">
                <strong>{{openDate(term.OtherRegBeginDate)}}</strong>
            </span>
            </li>
            <li class="grid-x" v-if="term.PreRegStartDate">
            <span class="cell small-8">New, transfer, and current students</span>
            <span class="cell small-4">
                <strong>{{openDate(term.PreRegStartDate)}}</strong>
            </span>
            </li>
        </ul>

        <div class="grid-x align-center">
            <a :href="'https://myaccess.southern.edu/apps/CourseSchedule2/Default.aspx?Term='+ term.TermCode" class="button">Register for {{term.TermDescription}}
            <i class="fas fa-angle-right"></i>
            </a>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Registration",
  data() {
    return {
      nowDate: Date,
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
      activeTerms: [],
      visible: null
    };
  },
  created() {
    let self = this;
    this.nowDate = new Date();

    axios.get('https://www.southern.edu/administration/register/proxy.php').then(response => {

      let terms = [];
      let endDate = null;

      response.data.forEach(function (item) {
        endDate = new Date(item.EndDate);

        if (item.TermDescription.indexOf('Session 3') > 0) {
          item.TermDescription = 'SmartStart / ' + item.TermDescription;
        }

        if (endDate > self.nowDate) {
          terms.unshift(item);
        }
      });

      this.activeTerms = terms;
    });

  },
  methods: {

    openDate(inputDate) {
      if (inputDate) {
        return this.checkDate(new Date(inputDate.split('T')[0]));
      } else {
        return false;
      }
    },

    formatDate(_inputDate) {
      let inputDate;

      if (_inputDate.indexOf('T') > 0) {
        inputDate = new Date(_inputDate.split('T')[0]);
      } else {
        inputDate = _inputDate;
      }

      return this.months[inputDate.getMonth()] + " " + inputDate.getDate() + ", " + inputDate.getFullYear();
    },

    checkDate(future) {

      if (this.nowDate < future) {
        return this.months[future.getMonth()] + " " + future.getDate();
      } else {
        return "Currently Open";
      }
    }
  }
};
</script>

<style lang="scss">
header h1 {
  color: #333;
  border-bottom: 10px solid #E9EC8D;
  padding: 0 0 .5rem;
  margin: 4rem 0;
}

.body-content {
  color: #fff;
  background-image: linear-gradient(-180deg, #7D0063 0%, #4F2D7F 100%);
}

aside {
  font-size: 0.825rem;
  p,
  li {
    line-height: 1.4;
  }
  li {
    margin: 0.5rem 0;
  }
  a {
    color: #FADA63;
  }
  a:hover {
    color: #fff;
  }
}

article {
  padding-top: 5rem;
  margin-bottom: 5rem;
  h2 {
    margin-bottom: 1em;
  }
  .card {
    border: 1px solid #fff;
    color: #fff;
    border-radius: 20px;
    background-color: transparent;
    /*transition: all 200ms ease-in-out;*/
    .button {
      font-weight: 700;
      border-radius: 10px;
      border: 0 none;
      background-image: linear-gradient(60deg, #0D4A23 0%, #15582D 100%);
    }
  }
  .card.active {
    color: #000;
    background-color: #fff;
  }
  .card-divider {
    background: transparent;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    &:hover {
      color: #000;
      background-color: #fff;
    }
  }
}
</style>
