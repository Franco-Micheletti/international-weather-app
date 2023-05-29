import { createRoot } from 'react-dom/client'
import '../weather-app/index.css'
// import { Search } from './src/components/search'
import { Home } from './src/components/home'
const root = createRoot(document.getElementById('app'))

root.render(
  <div>
    <div>
      <Home />
    </div>
  </div>
)
