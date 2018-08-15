<template>
  <button
    :class="$style.button"
    v-on="$listeners"
  >
    <slot/>
    Is working
  </button>
</template>

<style lang="scss" >
//@import '@design';

.button {
  //@extend %typography-small;

  padding: 10px;
  color: #0f0;
  cursor: pointer;
  background: #000;
  border: none;

  &:disabled {
    cursor: not-allowed;
    background: #333;
  }
}
</style>