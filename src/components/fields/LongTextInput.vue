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
import BaseInput from './BaseInput'
export default {
  name:'LongTextInput',
  extends: BaseInput,
  props: {
    placeholder: String,
  },
}
</script>

<docs>
```jsx
  let inputText
  <div class='p-2'>
    <h3 class='typography-4 w-full uppercase text-light-1'>
      Light Mode
    </h3>
    <LongTextInput
      id='1'
      name='example'
      :required='true'
      placeholder="enter text here"
      prompt="How much do you love this input?"
      v-model='inputText'
      
    />
    <span> {{ inputText }} </span>
  </div>
```
<docs>