<template>
  <div
    v-if='open'
    class='modal-wrapper fixed bottom-0 inset-x-0 px-4 pb-6 inset-0 p-0 flex items-center justify-center z-999'
  >
    <div
      class='fixed inset-0 transition-opacity'
      @click='$emit("close")'
    >
      <div class='modal-overlay absolute inset-0' />
    </div>

    <slot name='modal'>
      <div
        class='modal-card rounded-lg px-4 pt-5 pb-4 overflow-hidden border transform transition-all sm:p-6 z-999'
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

<style lang="scss">
.modal-wrapper {
  .modal-card {
    @apply bg-light-6;
  }
  .modal-overlay {
    @apply bg-dark-5 opacity-25;
  }
}
.theme-dark-mode {
  .modal-wrapper {
    .modal-overlay {
      @apply bg-dark-0 opacity-25;
    }
    .modal-card {
      @apply bg-dark-2;
    }
  }
}
</style>

<docs>
  ```jsx
  const open1 = false
  const open2 = false
  const open3 = false
  <Button @click='open1 = true'>
    Open Basic Modal
  </Button>
  <Button @click='open2 = true'>
    Open Custom Modal
  </Button>

  <Modal
    :open='open1'
    @close='open1 = false'
  >
    This modal has a background and border.
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

  <div class='theme-dark-mode inline-block p-2'>
    <Button @click='open3 = true'>
      Modal in Dark Mode
    </Button>

    <Modal
      :open='open3'
      @close='open3 = false'
    >
      If you twisted my arm,
      <br/>
      I'd have to admit I like Dark Mode best.
    </Modal>
  </div>
  ```
</docs>