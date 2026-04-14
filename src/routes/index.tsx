import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center -mt-10 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-[#6E42E5]/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#4BD4E2]/20 blur-[100px] rounded-full pointer-events-none" />
      
      {/* Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center rounded-full border border-[#D4A16A]/30 bg-black/40 px-4 py-1 text-sm font-medium text-[#D4A16A] mb-8 shadow-[0_0_15px_rgba(212,161,106,0.15)] backdrop-blur-sm">
          Next-Generation
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-white/90 drop-shadow-sm leading-tight">
          Liquid Staking & MEV
        </h1>
        
        <p className="text-3xl md:text-5xl text-white/90 font-medium tracking-wide">
          For 10k TPS
        </p>
        
        <div className="pt-12 pb-8">
          <button className="rounded-full bg-gradient-to-r from-[#4BD4E2] to-[#6E42E5] px-8 py-3 text-lg font-semibold text-white shadow-[0_0_30px_rgba(75,212,226,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(110,66,229,0.7)] flex items-center gap-2">
            Enter App
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center gap-3 pt-6">
          <span className="text-sm font-semibold text-white/60 tracking-wider uppercase">Powered by</span>
          <div className="flex items-center gap-2 font-bold text-white tracking-widest text-lg">
            <div className="w-5 h-5 bg-gradient-to-tr from-[#6E42E5] to-[#D4A16A] rounded-sm transform rotate-45"></div>
            MONAD
          </div>
        </div>
      </div>
      
      {/* Globe overlay simulating planet cut off */}
      <div className="absolute -bottom-[20%] w-full h-[50vh] bg-gradient-to-t from-[#060B19] to-transparent pointer-events-none z-20" />
      <div className="absolute -bottom-[60%] w-[120vw] h-[120vw] rounded-full border-[1px] border-[#4BD4E2]/10 bg-black/40 shadow-[0_0_100px_rgba(75,212,226,0.1)] left-1/2 -translate-x-1/2 z-10 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#4BD4E2]/20 via-[#060B19] to-black rounded-full mix-blend-screen" />
      </div>
    </div>
  )
}
