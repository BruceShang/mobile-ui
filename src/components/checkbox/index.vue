<template>
    <div class="checkbox-component">
        <input type="checkbox"
               class="checkbox-component__input"
               :id="id"
               :name="name"
               :value="value"
               :class="className"
               :disabled="disabled"
               @change="onChange"
               :checked="state">
        <label :for="id" class="checkbox-component__label">
          <span class="checkbox-component__indicator we-icon"></span>
            <slot></slot>
        </label>
    </div>
</template>

<script>
export default {
  name: 'we-checkbox',
  // 自定义组件的v-model
  // https://cn.vuejs.org/v2/guide/components-custom-events.html
  model: {
    prop: 'modelValue', // 父组v-model="paraValues"中的paraValues值会传入modelValue的字段
    event: 'change', // 同时会触发一个input事件,并带一个新值，paraValues属性将被更新
  },
  props: {
    /**
     * 复选框id
     */
    id: {
      type: String,
      default() {
        return `checkbox-id-${this._uid}`
      },
    },
    /**
     * 复选框name
     */
    name: {
      type: String,
      default: null,
    },
    /**
     * 复选框value
     */
    value: {
      required: true,
      default: null,
    },
    /**
     * 父组件绑定的值，model已经声明，props也必须再次声明
     */
    modelValue: {
      required: true,
      default: undefined,
    },
    /**
     * 复选框类名
     */
    className: {
      type: String,
      default: null,
    },
    /**
     * 是否选中
     */
    checked: {
      type: Boolean,
      default: false,
    },
    /**
     * 设置是否可以选中or禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * 处理复选框是否选中
     * @return {boolean} modelValue 不存在取false
     */
    state() {
      // 如果未定义，显示默认false
      if (this.modelValue === undefined) {
        return this.checked
      }
      // 如果当前的值已存在，就显示选中状态
      if (Array.isArray(this.modelValue)) {
        return this.modelValue.indexOf(this.value) > -1
      }
      return !!this.modelValue
    },
  },
  mounted() {
    if (this.checked && !this.state) {
      this.toggle()
    }
  },
  methods: {
    /**
     * CheckBox 操作时触发
     */
    onChange() {
      this.toggle()
    },
    /**
     * 如果modelValue是字符串，value直接取反（true or false）
     * 若果modelValue是数组，当前状态为true则从value数组中删除，false则添加value值
     */
    toggle() {
      let value
      if (Array.isArray(this.modelValue)) {
        value = this.modelValue.slice(0)
        if (this.state) {
          value.splice(value.indexOf(this.value), 1)
        } else {
          value.push(this.value)
        }
      } else {
        value = !this.state
      }
      // 返回给父组件
      this.$emit('change', value)
    },
  },
  watch: {
    /**
     * 监听复选框的状态变化，如果CheckBox的新状态和组件中的state状态不一致，则触发toggle函数重置
     * @param {string} newValue - CheckBox变化的状态 false or true
    */
    checked(newValue) {
      if (newValue !== this.state) {
        this.toggle()
      }
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .checkbox-component {
    display: inline-block;
    padding-left: 44px;
    position: relative;
    vertical-align: middle;

    &__input {
      height: 44px;
      opacity: 0;
      z-index: 1;
    }
    &__input:checked + label > span {
      border-color: #222;
      color: #222;
      font-size: 35px;
    }
    &__input,
    &__indicator {
      left: 0;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;

    }
    &__indicator {
      border: 1px solid #ececec;
      color: #ececec;
      display: block;
      font-size: 0;
      height: 44px;
      line-height: 44px;
      text-align: center;
      width: 44px;
      border-radius: 3px;
      &::before {
        content: "\e61e";
      }
      // ^[1]__input:checked ^[1..-1]~ & {
      //   border-color: #222;
      //   color: #222;
      //   font-size: 35px;
      // }
    }
    &__label {
      // margin-left: 12px;  
    }
  }
</style>