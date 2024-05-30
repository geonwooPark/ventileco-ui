import { useState } from 'react'
import { list } from './constants/list'
import SelectBox from './components/SelectBox/SelectBox'

function App() {
  const [value, setValue] = useState<string>()
  return (
    <div className="w-[240px] text-sm">
      <SelectBox value={value} setValue={setValue} list={list}>
        <SelectBox.Label>레이블</SelectBox.Label>

        <SelectBox.Trigger>
          <button className="flex w-full items-center justify-between rounded-md border px-3 py-2">
            <SelectBox.TriggerText>메뉴를 선택하세요.</SelectBox.TriggerText>
          </button>
        </SelectBox.Trigger>

        <SelectBox.List>
          {({ optionList }) =>
            optionList.map((item, idx) => (
              <SelectBox.Item key={item.value} idx={idx} item={item}>
                <button className={`w-full px-3 py-2`}>{item.label}</button>
              </SelectBox.Item>
            ))
          }
        </SelectBox.List>
      </SelectBox>
    </div>
  )
}

export default App
