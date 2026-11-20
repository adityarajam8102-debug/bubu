import { useState } from 'react'
import Atmosphere from './components/Atmosphere'
import BackToTop from './components/BackToTop'
import Celebration from './components/Celebration'
import Coupons from './components/Coupons'
import FinalApology from './components/FinalApology'
import GuiltSlider from './components/GuiltSlider'
import Intro from './components/Intro'
import Letter from './components/Letter'
import Loader from './components/Loader'
import Memories from './components/Memories'
import MusicToggle from './components/MusicToggle'
import ProgressBar from './components/ProgressBar'
import Promises from './components/Promises'
import Reasons from './components/Reasons'
import SadEnvelope from './components/SadEnvelope'
import SendLove from './components/SendLove'
import VoiceNote from './components/VoiceNote'
import { ASSETS, HER_NAME } from './config'

function Background() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      <img
        src={ASSETS.background}
        alt=""
        className="h-full w-full object-cover object-center"
        style={{ objectPosition: '50% 30%' }}
      />
      <div className="absolute inset-0 bg-plum-900/72" />
      <div className="absolute inset-0 bg-gradient-to-b from-plum-900/85 via-plum-900/55 to-plum-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,143,177,.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_75%,rgba(217,184,255,.12),transparent_50%)]" />
    </div>
  )
}

export default function App() {
  const [celebrating, setCelebrating] = useState(false)

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Loader />
      <Background />
      <Atmosphere />
      <ProgressBar />

      <main className="relative z-10">
        <Intro />
        <GuiltSlider />
        <Letter />
        <VoiceNote />
        <Memories />
        <Reasons />
        <Coupons />
        <SadEnvelope />
        <Promises />
        <SendLove />
        <FinalApology onYes={() => setCelebrating(true)} />
      </main>

      <footer className="relative z-10 border-t border-white/5 px-6 pb-10 pt-8 text-center">
        <p className="font-script text-2xl text-rose-soft/80">Made with love, for {HER_NAME}.</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-white/25">
          every pixel, every word, every promise
        </p>
      </footer>

      <MusicToggle />
      <BackToTop />
      <Celebration open={celebrating} onClose={() => setCelebrating(false)} />
    </div>
  )
}
