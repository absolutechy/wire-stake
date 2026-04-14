import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { AppLayout } from '@/components/AppLayout'
import { useAccount, useWriteContract, useReadContract } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { ConnectButton } from '@rainbow-me/rainbowkit'

// Import ABI and Contracts
import ABI from '@/constants/abis/WireStake.json'
import { STAKING_CONTRACT_ADDRESS, ST_WIRE_TOKEN_ADDRESS } from '@/constants/contracts'

export const Route = createFileRoute('/unstaking')({
  component: UnstakingPage,
})

function UnstakingPage() {
  const [amount, setAmount] = useState('')
  const [percentage, setPercentage] = useState(0)
  const { address, isConnected } = useAccount()
  
  const { data: balanceData } = useReadContract({
    address: ST_WIRE_TOKEN_ADDRESS,
    abi: [{ inputs: [{ name: "account", type: "address" }], name: "balanceOf", outputs: [{ name: "", type: "uint256" }], stateMutability: "view", type: "function" }],
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  })
  
  const formattedBalance = balanceData ? formatUnits(balanceData as bigint, 18) : '0'
  
  const { writeContract, isPending } = useWriteContract()

  // 1 sWIRE = 1.05427 WIRE mock rate
  const EXCHANGE_RATE = 1.05427

  const receivedAmount = Number(amount) > 0 ? (Number(amount) * EXCHANGE_RATE).toFixed(4) : '0.00'

  const handleMax = () => {
    setAmount(formattedBalance)
    setPercentage(100)
  }

  const handleSlider = (pct: number) => {
    setPercentage(pct)
    if (formattedBalance !== '0') {
      const newAmount = (Number(formattedBalance) * (pct / 100)).toString()
      setAmount(newAmount)
    }
  }

  const handleUnstake = () => {
    if (!amount || Number(amount) <= 0) return
    writeContract({
      address: STAKING_CONTRACT_ADDRESS,
      abi: ABI.abi,
      functionName: 'unstake',
      args: [parseUnits(amount, 18)],
    })
  }

  return (
    <AppLayout activeTab="unstaking">
      <div className="w-[800px] bg-gradient-to-br from-[#1B273F] to-[#0A101C] rounded-2xl border border-white/5 p-[2px] shadow-2xl relative overflow-hidden group">
        
        {/* Blur lighting behind the card layout to match design */}
        <div className="absolute top-0 left-0 w-full h-[150px] bg-gradient-to-r from-[#D4A16A]/20 via-[#6E42E5]/20 to-[#D4A16A]/20 opacity-70 blur-3xl" />
        <div className="absolute bottom-0 left-0">
          <div className="w-[150px] h-[150px] mix-blend-screen bg-gradient-to-tr from-[#4BD4E2]/20 to-transparent blur-xl" />
        </div>
        
        <div className="bg-[#121B2A]/90 backdrop-blur-md rounded-2xl p-6 relative z-10">
          
          <h2 className="text-xl font-bold text-center text-white mb-8">Unstake sWIRE</h2>
          
          {/* Unstake Input */}
          <div className="bg-[#0A101C] rounded-xl border border-white/10 p-5 mb-4 group-hover:border-[#D4A16A]/30 transition-colors">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/60 text-sm font-medium">Unstake sWIRE</span>
              <div className="flex items-center gap-2">
                <button onClick={handleMax} className="text-[10px] font-bold bg-[#D4A16A]/20 text-[#D4A16A] px-2 py-1 rounded">MAX</button>
                <span className="text-white/60 text-sm flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                  {Number(formattedBalance).toFixed(4)} sWIRE
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-6">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-transparent text-4xl font-bold text-white outline-none w-full placeholder:text-white/20"
              />
              <div className="flex items-center gap-2 bg-[#1B273F] px-4 py-2 rounded-full border border-white/5">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#4BD4E2] to-[#6E42E5]" />
                <span className="font-bold text-white">sWIRE</span>
              </div>
            </div>
            
            {/* Slider */}
            <div className="relative pt-2">
              <div className="h-1 bg-white/10 rounded-full w-full">
                <div className="h-full bg-[#D4A16A] rounded-full" style={{ width: `${percentage}%` }} />
              </div>
              <input 
                type="range" 
                min="0" max="100" 
                value={percentage}
                onChange={(e) => handleSlider(Number(e.target.value))}
                className="absolute top-2 w-full h-1 opacity-0 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#D4A16A] font-semibold mt-2 px-1">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          
          {/* Receive Output */}
          <div className="bg-[#0A101C]/60 rounded-xl border border-white/5 p-5 mb-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-white/60 text-sm font-medium">Receive WIRE</span>
              <span className="text-white/60 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>
                0.0000 WIRE
              </span>
            </div>
            <div className="flex justify-between items-center bg-[#060B19]/50 p-2 rounded-lg">
              <span className="text-3xl font-bold text-white/90 pl-2">{receivedAmount}</span>
              <div className="flex items-center gap-2 bg-[#1B273F]/80 px-4 py-2 rounded-full border border-[#D4A16A]/20">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6E42E5] to-[#4BD4E2]" />
                <span className="font-bold text-white">WIRE</span>
              </div>
            </div>
          </div>
          
          <div className='flex flex-col lg:flex-row justify-between '>
          {/* Detail row */}
          <div className="text-center text-sm text-white/60 mb-8 font-medium flex justify-around">
            <span>1 sWIRE = {EXCHANGE_RATE} WIRE</span>
            <span>~4 days unbonding</span>
          </div>
          
          {/* Action Button */}
          <div className="flex justify-center">
            {!isConnected ? (
              <ConnectButton.Custom>
                {({ openConnectModal }) => (
                  <button 
                    onClick={openConnectModal}
                    className="w-[200px] py-3 rounded-xl bg-gradient-to-r from-[#D4A16A] to-[#E2614B] text-white font-bold shadow-[0_4px_20px_rgba(212,161,106,0.3)] hover:opacity-90 transition-opacity"
                  >
                    Connect
                  </button>
                )}
              </ConnectButton.Custom>
            ) : (
              <button 
                onClick={handleUnstake}
                disabled={isPending || !amount || Number(amount) <= 0}
                className="w-full max-w-[200px] py-3 rounded-xl bg-gradient-to-r from-[#D4A16A] to-[#E2614B] text-white font-bold shadow-[0_4px_20px_rgba(212,161,106,0.3)] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Unstaking...' : 'Unstake'}
              </button>
            )}
          </div>
          </div>
          
        </div>
      </div>
    </AppLayout>
  )
}
