import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SelectBox from './SelectBox'
import { list } from '../../constants/list'

describe('SelectBox', () => {
  it('SelectBox 컴포넌트가 렌더링되는지 확인', () => {
    render(
      <SelectBox value={undefined} setValue={() => {}} list={list}>
        <SelectBox.Label>SelectBox</SelectBox.Label>

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
      </SelectBox>,
    )
    expect(screen.getByText('SelectBox')).toBeInTheDocument()
  })

  it('트리거를 클릭하여 리스트박스가 보이는지 확인', async () => {
    render(
      <SelectBox value={undefined} setValue={() => {}} list={list}>
        <SelectBox.Label>SelectBox</SelectBox.Label>

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
      </SelectBox>,
    )
    await userEvent.click(screen.getByText('메뉴를 선택하세요.'))
    expect(screen.getByRole('list')).toBeInTheDocument()
  })

  it('마우스를 사용하여 옵션을 선택하는 케이스', async () => {
    render(
      <SelectBox value={undefined} setValue={() => {}} list={list}>
        <SelectBox.Label>SelectBox</SelectBox.Label>

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
      </SelectBox>,
    )

    const trigger = screen.getByText('메뉴를 선택하세요.')
    await userEvent.click(trigger)
    await userEvent.click(screen.getByText('Kiwi'))

    await waitFor(() => {
      expect(screen.getByText('Kiwi')).toBeInTheDocument()
    })
  })

  it('키보드를 사용하여 옵션을 선택하는 케이스', async () => {
    render(
      <SelectBox value={undefined} setValue={() => {}} list={list}>
        <SelectBox.Label>SelectBox</SelectBox.Label>

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
      </SelectBox>,
    )

    const trigger = screen.getByText('메뉴를 선택하세요.')
    await userEvent.click(trigger)
    await userEvent.keyboard('[ArrowDown]')
    await userEvent.keyboard('[Enter]')

    await waitFor(() => {
      expect(screen.getByText('Kiwi')).toBeInTheDocument()
    })
  })
})
