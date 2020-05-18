<script>
export default {
  name:'BaseField',
  props: {
    questionId: String,
    name: String,
    required: Boolean,
    disabled: Boolean,
    helpText: String,
    prompt: {
      type: String,
      required: true,
    },
  },
}
</script>