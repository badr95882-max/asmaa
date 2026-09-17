import { useState } from 'react'
import LockScreen from './components/LockScreen'
import MainPage from './components/MainPage'
import LanternsRope from './components/LanternsRope'
import WelcomeVideo from './components/WelcomeVideo'
import './App.css'

function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [showWelcomeVideo, setShowWelcomeVideo] = useState(false)

  const handleUnlock = () => {
    setTransitioning(true)
    setTimeout(() => {
      setUnlocked(true)
      setTransitioning(false)
      setShowWelcomeVideo(true) // Automatically launch welcome video after login
    }, 1800)
  }

  const handleCloseVideo = () => {
    setShowWelcomeVideo(false)
  }

  const handleOpenVideo = () => {
    setShowWelcomeVideo(true)
  }

  return (
    <div className="app-root">
      {/* Lanterns Rope across top of website */}
      <LanternsRope />

      {!unlocked ? (
        <LockScreen onUnlock={handleUnlock} transitioning={transitioning} />
      ) : (
        <MainPage onOpenWelcomeVideo={handleOpenVideo} />
      )}

      {/* Cinematic Welcome Video Modal */}
      {showWelcomeVideo && (
        <WelcomeVideo
          onClose={handleCloseVideo}
          onContinue={handleCloseVideo}
        />
      )}
    </div>
  )
}

export default App
