import {
  ElDatePicker,
  ElInput,
  ElInputNumber,
  ElSwitch,
  ElTimePicker,
} from 'element-plus'
import CheckboxButton from './checkbox-button.vue'
import Checkbox from './checkbox.vue'
import Radio from './radio.vue'
import Select from './select.vue'

export default {
  'input': ElInput,
  'input-number': ElInputNumber,
  'date-picker': ElDatePicker,
  'time-picker': ElTimePicker,
  'switch': ElSwitch,
  'select': Select,
  'radio': Radio,
  'checkbox': Checkbox,
  'checkbox-button': CheckboxButton,
}

type TypeMapping = {
  [K in XFormColumn as K['type']]?: K['props']
}

export const defaultProps: TypeMapping = {
  'input': {
    clearable: true,
    placeholder: '请输入',
  },
  'select': {
    clearable: true,
    placeholder: '请选择',
  },
  'date-picker': {
    type: 'date',
    valueFormat: 'YYYY-MM-DD',
    format: 'YYYY-MM-DD',
    placeholder: '请选择日期',
  },
  'time-picker': {
    type: 'time',
    valueFormat: 'HH:mm:ss',
    format: 'HH:mm:ss',
    placeholder: '请选择时间',
  },
  'divider': {
    contentPosition: 'left',
    style: {
      marginTop: '10px',
      marginBottom: '28px',
    },
  },
}
