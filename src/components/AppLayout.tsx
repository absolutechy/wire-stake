import { type ReactNode } from 'react'

export function AppLayout({ children }: { children: ReactNode; activeTab: 'staking' | 'unstaking' }) {

  return (
    <div className="flex w-full text-white bg-[#060B19] h-full min-h-[calc(100vh-80px)]">
      {/* Main Area */}
      <main className="flex-1 flex flex-col p-0 relative overflow-hidden">
        {/* Background glow for App layout */}
        <div className="absolute top-1/4 left-1/4 w-150 h-75 bg-[#6E42E5]/5 blur-[100px] rounded-[100%] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-125 h-75 bg-[#4BD4E2]/5 blur-[80px] rounded-[100%] pointer-events-none" />

        {/* Content Box */}
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  )
}
