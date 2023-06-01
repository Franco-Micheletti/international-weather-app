import { createRoot } from 'react-dom/client'
import '../weather-app/index.css'
import { Search } from './src/components/search'
import { Home } from './src/components/home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = createRoot(document.getElementById('app'))

root.render(
  <div>
    <BrowserRouter>
      <Routes>
        <Route index exact element={<Home />} />
        <Route path='/search/' element={<Search />} />
      </Routes>
    </BrowserRouter>
  </div>
)
