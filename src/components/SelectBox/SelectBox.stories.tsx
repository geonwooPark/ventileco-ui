import type { Meta } from '@storybook/react'
import { useState } from 'react'
import SelectBox from './SelectBoxMain'

const meta: Meta<typeof SelectBox> = {
  title: 'COMPONENTS/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered',
  },
}

export default meta

const selectBoxList = [
  { value: 'apple', label: 'Apple', disabled: true },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'peach', label: 'Peach', disabled: true },
  { value: 'grape', label: 'Grape' },
  { value: 'aloe', label: 'Aloe' },
  { value: 'apple2', label: 'Apple2' },
  { value: 'banana2', label: 'Banana2', disabled: true },
  { value: 'kiwi2', label: 'Kiwi2' },
  { value: 'peach2', label: 'Peach2', disabled: true },
  { value: 'grape2', label: 'Grape2' },
  { value: 'aloe2', label: 'Aloe2' },
]

export function Normal() {
  const [value, setValue] = useState<string>()

  return (
    <div className="w-[240px] text-sm">
      <SelectBox value={value} setValue={setValue} list={selectBoxList}>
        <SelectBox.Title>레이블</SelectBox.Title>
        <SelectBox.Trigger>
          <div className="flex w-full items-center justify-between rounded-md border px-3 py-2">
            <SelectBox.TriggerText>메뉴를 선택하세요</SelectBox.TriggerText>
          </div>
        </SelectBox.Trigger>

        <SelectBox.List className="absolute z-[200] mt-1 max-h-[240px] w-full overflow-hidden overflow-y-scroll rounded-md border bg-white">
          {({ optionList }) =>
            optionList.map((item) => (
              <SelectBox.Item key={item.value} item={item}>
                {({ isSelected, isDisabled, isFocused }) => (
                  <div
                    className={`${isSelected && 'text-blue-600'} ${isDisabled && 'text-gray-300'} ${isFocused && 'bg-blue-100'} w-full px-3 py-2 hover:bg-gray-100`}
                  >
                    {item.label}
                  </div>
                )}
              </SelectBox.Item>
            ))
          }
        </SelectBox.List>
      </SelectBox>
    </div>
  )
}
