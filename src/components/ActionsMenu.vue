<template>
  <DropDown
    :open='openActions'
    align='right'
    @close='openActions = false'
  >
    <Button
      custom
      class='ellipsis-button p-0 my-2 rounded-full'
      :class='openActions && "active"'
      @click='openActions = !openActions'
    >
      <Icon name='ellipsis' />
    </Button>
    <template #dropdown>
      <div class='flex flex-col items-stretch bg-card border border-default rounded overflow-hidden'>
        <Button
          v-for='(action, i) in actions'
          :key='action.text'
          custom
          class='border-default bg-action-card'
          :class='i !== 0 ? "border-t" : ""'
          @click='$emit(action.action, action.data)'
        >
          <span class='whitespace-no-wrap text-secondary'>
            {{ action.text }}
          </span>
        </Button>
      </div>
    </template>
  </DropDown>
</template>

<script>
export default {
  name: 'ActionsMenu',
  props: {
    /**
     *  Array of available actions.
     * `text` is the displayed option. `action` will be emitted on click, with `data` (optional) as the argument.
     * e.g. [{ text: "Delete Item", action: 'delete', data: itemId }]
     */
    actions: { type: Array, required: true },
  },
  data() {
    return { openActions: false }
  },
}
</script>

<style lang="scss">
.ellipsis-button {
  &:hover, &:focus { @apply bg-blue-1 text-white }
  &.active, &:active { @apply bg-blue-2 text-white }
  &.active:hover, &.active:focus { @apply bg-blue-3 text-white }
}
.theme-dark-mode {
  .ellipsis-button {
    &:hover, &:focus { @apply bg-blue-3 text-white }
    &.active, &:active { @apply bg-blue-4 text-white }
    &.active:hover, &.active:focus { @apply bg-blue-5 text-white }
  }
}
</style>

<docs>
  ```jsx
  let current = 'Light Mode'
  const actions = [
    { text: 'Hello', action: 'greet', data: 'Hello yourself' },
    { text: 'Friend', action: 'describe', data: "That's nice" },
    { text: 'Bye now', action: 'clear', data: 'See ya round' },
  ]
  <div class='flex items-center p-2'>
    <span class='mr-2'>{{ current }}</span>
    <ActionsMenu
      :actions='actions'
      @greet='val => current = val'
      @describe='val => current = val'
      @clear='val => current = val'
    />
  </div>
  <div class='theme-dark-mode flex items-center p-2'>
    <span class='mr-2'>Dark Mode</span>
    <ActionsMenu
      :actions='actions'
      @greet='val => current = val'
      @describe='val => current = val'
      @clear='val => current = val'
    />
  </div>
  ```
</docs>