import { Outlet } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs';
import './index.css'
function App() {

  return (
    <>
      <StyleProvider layer>
        <Outlet />
      </StyleProvider>
    </>
  )
}

export default App