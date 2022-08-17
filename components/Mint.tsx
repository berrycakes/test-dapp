import React from 'react'
import {
  useAccount,
  //   useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { contractConfig } from '../utils/ContractConfig'

interface MintProps {
  customMintArgs: any
  title: string
}

export const Mint: React.FC<MintProps> = ({ customMintArgs, title }) => {
  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'mint',
    args: customMintArgs,
  })
  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig)

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  })
  const { isConnected, address } = useAccount()
  const isMinted = txSuccess

  return (
    <div>
      {isConnected && !isMinted && (
        <button
          disabled={!mint || isMintLoading || isMintStarted}
          className="button mt-12 mx-4"
          data-mint-loading={isMintLoading}
          data-mint-started={isMintStarted}
          onClick={() => mint?.()}
        >
          {isMintLoading && 'Waiting for approval'}
          {isMintStarted && 'Minting...'}
          {!isMintLoading && !isMintStarted && title}
        </button>
      )}
      {mintError && (
        <p style={{ marginTop: 24, color: '#FF6257' }}>
          Error: {mintError.message}
        </p>
      )}
      {txError && (
        <p style={{ marginTop: 24, color: '#FF6257' }}>
          Error: {txError.message}
        </p>
      )}
    </div>
  )
}
