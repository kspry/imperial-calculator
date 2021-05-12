<template>
  <div class="calc">
    <div class="calc__container">
      <div class="calc__actions">
        <i v-if="output.length" class="fa fa-trash-o" title="Reset" @click="reset"></i>
      </div>
      <div v-if="expr.length && result" class="calc__current">
        Current result:
        <strong>{{ result.str() }} ({{ decimalResult }})</strong>
      </div>
      <input
        class="calc__input"
        :class="{'calc__input--invalid': !result}"
        v-model="expr"
        @keyup.enter="evaluateInput"
        ref="calcInput"
      >
      <div class="calc__output" ref="calcOutput">
        <div v-for="(item, index) in reversedOutput" :key="index" class="calc__output__item">
          <div @dblclick="appendToInput(item.expr)">{{ item.expr }}</div>
          <div @dblclick="appendToInput(item.result)">&#x003D; {{ item.result }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/composition-api";
import CalculatorService from "@/services/CalculatorService";
import "font-awesome/css/font-awesome.min.css";

export default {
  name: "Calculator",
  setup(props, context) {
    const calc = new CalculatorService();

    const expr = ref("");

    const result = computed(() => {
      try {
        return calc.calculate(expr.value);
      } catch {
        return null;
      }
    });

    const decimalResult = computed(() => {
      try {
        return result.value.dec(/*str=*/ 0, /*accuracy=*/ 4);
      } catch {
        return "invalid";
      }
    });

    const output = ref([]);

    const reversedOutput = computed(() => {
      return output.value.slice().reverse();
    });

    const appendToInput = value => {
      expr.value += value;
      context.refs.calcInput.focus();
    };

    const evaluateInput = () => {
      if (!result) return;
      output.value.push({
        expr: expr.value.toString(),
        result: result.value.str().toString()
      });
      expr.value = "";
    };

    const reset = () => {
      expr.value = "";
      output.value = [];
      context.refs.calcInput.focus();
    };

    onMounted(() => {
      context.refs.calcInput.focus();
    });

    return {
      appendToInput,
      decimalResult,
      evaluateInput,
      expr,
      output,
      reset,
      result,
      reversedOutput
    };
  }
};
</script>

<style lang="scss" scoped>
// https://ethanschoonover.com/solarized/
$color-base03: #002b36;
$color-base02: #073642;
$color-base00: #657b83;
$color-base0: #839496;
$color-base3: #fdf6e3;
$color-magenta: #d33682;
$color-red: #dc322f;

.calc__container {
  background-color: $color-base02;
  color: $color-base0;
  font-family: "Cascadia Code", monospace;
  font-size: 2em;
  height: 400px;
  position: relative;
  width: 100%;
}

.calc__actions {
  display: none;
  position: absolute;
  top: 43px;
  right: 14px;

  i {
    cursor: pointer;
    opacity: 0.8;

    &:hover {
      opacity: 1;
    }
  }
}

.calc:hover .calc__actions {
  display: block;
}

.calc__current {
  background-color: $color-base3;
  border: 1px solid $color-base00;
  color: $color-base00;
  display: inline-block;
  font-family: Calibri, sans-serif;
  font-size: 40%;
  padding: 0 3px;
  position: absolute;
  top: 40px;
  left: 0;
}

.calc__input {
  background-color: $color-base03;
  border: none;
  color: $color-base0;
  font-family: inherit;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 5px;
  width: 100%;
}

.calc__input--invalid {
  color: $color-red;
}

.calc__output {
  height: 360px;
  padding: 0 5px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $color-magenta;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
}

.calc__output__item {
  margin-bottom: 1em;
}
</style>
