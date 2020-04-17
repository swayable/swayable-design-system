<template>
  <div
    v-if='open'
    class='fixed bottom-0 inset-x-0 px-4 pb-6 inset-0 p-0 flex items-center justify-center z-999'
  >
    <div
      class='fixed inset-0 transition-opacity'
      @click='$emit("close")'
    >
      <div class='absolute inset-0 bg-gray-500 opacity-75' />
    </div>

    <slot name='modal'>
      <div
        class='bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden border border-grey-darker transform transition-all sm:p-6 z-999'
      >
        <slot />
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    open: { type: Boolean, required: false, default: true  },
  },
}
</script>

<docs>
  ```jsx
  const open1 = false
  const open2 = false
  <Button
    primary
    @click='open1 = true'
  >
    Open Basic Modal
  </Button>
   <Button
    primary
    @click='open2 = true'
  >
    Open Custom Modal
  </Button>

  <Modal
    :open='open1'
    @close='open1 = false'
  >
    This modal have a background and border.
    <br/>
    A custom modal does not.
  </Modal>

  <Modal
    :open='open2'
    @close='open2 = false'
  >
    <template #modal>
      <div class='z-999'>
        <iframe src="https://player.vimeo.com/video/288423792" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
      </div>
    </template>
  </Modal>
  ```
</docs>