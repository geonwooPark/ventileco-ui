import Accordion from './components/Accordion/Accordion'

function App() {
  return (
    <div className="w-[240px]">
      <Accordion className="border">
        <Accordion.Item value={0}>
          {({ isOpen }) => (
            <>
              <Accordion.Trigger>
                <div
                  className={`${isOpen && 'text-active'} cursor-pointer border-b px-4 py-3`}
                >
                  Title1
                </div>
              </Accordion.Trigger>
              <Accordion.Content>
                <div className="border-b px-4 py-3">Content1</div>
              </Accordion.Content>
            </>
          )}
        </Accordion.Item>
        <Accordion.Item value={1}>
          {({ isOpen }) => (
            <>
              <Accordion.Trigger>
                <div
                  className={`${isOpen && 'text-active'} cursor-pointer border-b px-4 py-3 `}
                >
                  Title2
                </div>
              </Accordion.Trigger>
              <Accordion.Content>
                <div className="border-b px-4 py-3">Content2</div>
              </Accordion.Content>
            </>
          )}
        </Accordion.Item>
        <Accordion.Item value={2}>
          {({ isOpen }) => (
            <>
              <Accordion.Trigger>
                <div
                  className={`${isOpen && 'text-active'} cursor-pointer border-b px-4 py-3 `}
                >
                  Title3
                </div>
              </Accordion.Trigger>
              <Accordion.Content>
                <div className="border-b px-4 py-3">Content3</div>
              </Accordion.Content>
            </>
          )}
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default App
