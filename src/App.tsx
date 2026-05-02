import { useState } from "react"
import { Globe, Plus, Settings, MoreVertical } from "lucide-react"
import "./App.css"

function App() {
  const [tabs, setTabs] = useState([
    { id: 1, url: "about:home", title: "Home" }
  ])
  const [activeTab, setActiveTab] = useState(1)
  const [currentUrl, setCurrentUrl] = useState("about:home")

  const addTab = () => {
    const newId = Math.max(...tabs.map(t => t.id), 0) + 1
    setTabs([...tabs, { id: newId, url: "about:blank", title: "New Tab" }])
    setActiveTab(newId)
    setCurrentUrl("about:blank")
  }

  const closeTab = (id: number) => {
    const newTabs = tabs.filter(t => t.id !== id)
    setTabs(newTabs)
    if (activeTab === id) {
      setActiveTab(newTabs[0]?.id || 1)
    }
  }

  return (
    <div className="app">
      <div className="toolbar">
        <div className="nav-buttons">
          <button title="Back">←</button>
          <button title="Forward">→</button>
          <button title="Reload">⟳</button>
        </div>
        
        <input 
          type="text" 
          className="address-bar" 
          placeholder="Search or enter URL"
          value={currentUrl}
          onChange={(e) => setCurrentUrl(e.target.value)}
        />
        
        <div className="toolbar-icons">
          <button title="Settings">
            <Settings size={20} />
          </button>
          <button title="Menu">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <div className="tabs">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.id)
              setCurrentUrl(tab.url)
            }}
          >
            <Globe size={16} />
            <span>{tab.title}</span>
            <button
              className="close-btn"
              onClick={(e) => {
                e.stopPropagation()
                closeTab(tab.id)
              }}
            >
              ✕
            </button>
          </div>
        ))}
        <button className="add-tab" onClick={addTab}>
          <Plus size={18} />
        </button>
      </div>

      <div className="content">
        {activeTab === 1 && (
          <div className="home-page">
            <h1>🧭 PoleBrowse Tauri</h1>
            <p>A lightweight browser built with Tauri & React</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
