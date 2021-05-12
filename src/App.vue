<template>
  <div>
    <Calculator/>
  </div>
</template>

<script>
import Calculator from "@/components/Calculator";

export default {
  name: "App",
  components: {
    Calculator
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  color: #333;
}
</style>
