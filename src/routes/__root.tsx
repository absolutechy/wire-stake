import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[#060B19] text-white font-sans antialiased overflow-x-hidden selection:bg-[#4BD4E2] selection:text-black">
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 5px 5px, rgba(255, 255, 255, 0.2) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <nav className="flex items-center justify-between px-8 py-3 relative z-10 border-b border-white/5 bg-[#060B19]/80 backdrop-blur-md">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold tracking-wider inline-flex items-center gap-2 text-white">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#4BD4E2] to-[#6E42E5] flex items-center justify-center">
              <span className="text-black font-extrabold text-sm">W</span>
            </div>
            WIRE-STAKE
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center gap-8 text-sm font-semibold text-white/70">
          <Link to="/" className="hover:text-white transition-colors" activeProps={{ className: 'text-white' }} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/staking" className="hover:text-white transition-colors" activeProps={{ className: 'text-white' }}>Staking</Link>
          <Link to="/unstaking" className="hover:text-white transition-colors" activeProps={{ className: 'text-white' }}>Unstaking</Link>
        </div>

        <div className="flex-1 flex justify-end">
          <ConnectButton />
        </div>
      </nav>
      <main className="relative z-0">
        <Outlet />
      </main>
    </div>
  ),
})
