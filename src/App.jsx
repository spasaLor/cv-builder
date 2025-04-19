import Personal from './components/personal'
import Educational from './components/educational'
import Professional from './components/professional'
import './App.css'

function App() {

  return (
    <>
    <div className="title">
      <h2>CV Builder</h2>
    </div>
    <div className="container">
      <div className="cv">
        <Personal/>
        <Educational/>
        <Professional/>
      </div>
      <button type="button">Download your CV</button>
    </div>
    </>
  )
}

export default App
