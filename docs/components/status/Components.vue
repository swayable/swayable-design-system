<template>
  <div>
    <div class='flex'>
      <span class='w-1/5 flex'>
        <Icon 
          :fill='fill.ready'
          name='ready' 
          size='small'
        />
        <p>Ready</p>
      </span>
      <span class='w-1/5 flex'>
        <Icon 
          :fill='fill.review' 
          name='review' 
          size='small'
        />
        <p>Under review</p>
      </span>
      <span class='w-1/5 flex'>
        <Icon 
          :fill='fill.deprecated' 
          name='deprecated' 
          size='small'
        />
        <p>Deprecated</p>
      </span>
      <span class='w-1/5 flex'>
        <Icon 
          :fill='fill.prototype' 
          name='prototype' 
          size='small'
        />
        <p>Prototype</p>
      </span>
      <span class='w-1/5 flex'>
        <span class='w-6 h-6'>—</span>
        <p>Not applicable</p>
      </span>
    </div>
    <div class='mt-5'>
      <div class='flex text-gray-600'>
        <span
          v-if='show === "all"'
          class='w-1/3'
        >
          Component Name
        </span>
        <span
          v-if='show === "elements"'
          class='w-1/3'
        >
          Element Name
        </span>
        <span
          v-if='show === "patterns"'
          class='w-1/3'
        >
          Pattern Name
        </span>
        <span
          v-if='show === "templates"'
          class='w-1/3'
        >
          Template Name
        </span>
        <span class='w-1/3'>Released in</span>
        <span class='w-1/3'>Status</span>
      </div>
      <div class='mt-1'>
        <div 
          v-for='(component, index) in components' 
          :key='index' 
          class='flex'
        >
          <span
            v-if='component.name'
            class='w-1/3'
          >
            <code class='name'>{{ component.name }}</code>
          </span>
          <span
            v-else
            class='w-1/3'
          >
            N/A
          </span>
          <span
            v-if='component.release'
            class='w-1/3'
          >
            {{ component.release }}
          </span>
          <span
            v-else
            class='w-1/3'
          >
            N/A
          </span>
          <span
            v-if='component.status'
            class='w-1/3'
          >
            <Icon 
              v-if='component.status === "ready"' 
              :fill='fill.ready'
              name='ready' 
              size='small'
            />
            <Icon
              v-if='component.status === "under-review" || component.status === "review"'
              :fill='fill.review'
              name='review'
              size='small'
            />
            <Icon
              v-if='component.status === "prototype"'
              :fill='fill.prototype'
              name='prototype'
              size='small'
            />
            <Icon
              v-if='component.status === "deprecated"'
              :fill='fill.deprecated'
              name='deprecated'
              size='small'
            />
          </span>
          <span
            v-else
            class='w-1/3'
          >
            <span>&nbsp;—</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// If you want to use your own tokens here, change the following line to:
// import designTokens from "@/assets/tokens/tokens.raw.json"
// import designTokens from '../../docs.tokens.json'
import orderBy from 'lodash/orderBy'

export default {
  name: 'Components',
  props: {
    show: {
      type: String,
      default: 'all',
      validator: value => {
        return value.match(/(all|patterns|templates|elements)/)
      },
    },
  },
  data() {
    return {
      components: this.orderData(this.getComponents()),
      fill: {
        ready: 'text-green',
        review: 'text-orange',
        deprecated: 'text-red-dark',
        prototype: 'text-blue',
      },
    }
  },
  methods: {
    getComponents: function() {
      let contexts

      if (this.show === 'all') {
        contexts = [
          require.context('@/elements/', true, /\.vue$/),
          require.context('@/patterns/', true, /\.vue$/),
          require.context('@/templates/', true, /\.vue$/),
        ]
      } else if (this.show === 'elements') {
        contexts = [require.context('@/elements/', true, /\.vue$/)]
      } else if (this.show === 'patterns') {
        contexts = [require.context('@/patterns/', true, /\.vue$/)]
      } else if (this.show === 'templates') {
        contexts = [require.context('@/templates/', true, /\.vue$/)]
      }

      const components = []
      contexts.forEach(context => {
        context.keys().forEach(key => components.push(context(key).default))
      })

      return components
    },
    orderData: function(data) {
      return orderBy(data, 'name', 'asc')
    },
  },
}
</script>

<docs>
  ```jsx
  <components />
  ```
</docs>
