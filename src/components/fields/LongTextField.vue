<template>
  <div class='flex flex-col'>
    <p class='text-primary typography-5 px-0.5'>
      {{ prompt }}
    </p>
    <p
      v-if='helpText'
      class='text-tertiary typography-8 px-0.5'
    >
      {{ helpText }}
    </p>
    <TextArea
      :id='questionId'
      :placeholder='placeholder'
      :name='name'
      :required='isRequired'
      class='flex-grow mt-1'
      v-on='$listeners'
    />
  </div>
</template>
<script>
import BaseField from './BaseField'
export default {
  name:'LongTextField',
  extends: BaseField,
  props: {
    placeholder: {
      type: String,
      default: 'Answer',
    },
  },
}
</script>

<docs>
```jsx
  let inputText
  <div class='p-2'>
    <LongTextField
      id='1'
      name='example'
      :required='true'
      prompt="How much do you love this input?"
      v-model='inputText'
    />
    <span> {{ inputText }} </span>
  </div>
```
<docs>