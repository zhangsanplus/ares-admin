import type { UseFileDialogOptions } from '@vueuse/core'
import type { PropType } from 'vue'
import { useFileDialog } from '@vueuse/core'
import './index.scss'

export interface FileError {
  type: 'size'
  file: File
  message: string
}

export default defineComponent({
  name: 'XUpload',
  props: {
    modelValue: {
      type: [File, Array] as PropType<null | File | File[]>,
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: '*',
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024, // 10MB
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'error', 'change'],
  setup(props, { emit, slots }) {
    const { open, onChange } = useFileDialog()

    const options = computed<UseFileDialogOptions>(() => {
      return {
        multiple: props.multiple,
        accept: props.accept,
      }
    })

    const validateFile = (file: File): FileError | null => {
      if (file.size > props.maxSize) {
        return {
          type: 'size',
          file,
          message: `${file.name} 超过${props.maxSize / 1024 / 1024}MB限制`,
        }
      }

      return null
    }

    onChange((files) => {
      if (!files) return

      const errors: FileError[] = []
      const validFiles: File[] = []

      Array.from(files).forEach((file) => {
        const error = validateFile(file)
        error ? errors.push(error) : validFiles.push(file)
      })

      if (errors.length > 0) {
        emit('error', errors)
      }

      if (validFiles.length > 0) {
        const value = props.multiple ? validFiles : validFiles[0]
        emit('update:modelValue', value)
        emit('change', value)
      }
    })

    return () => (
      <div
        class={['x-upload', { 'is-disabled': props.disabled }]}
        onClick={() => !props.disabled && open(options.value)}
      >
        {slots.default?.({ disabled: props.disabled }) || '点击上传'}
      </div>
    )
  },
})
