import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import type { NextPage } from 'next'
import { useAccount, useContractRead, useQuery } from 'wagmi'
import { contractConfig } from '../utils/ContractConfig'
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard'
import { Mint } from '../components/Mint'

// const getMetadata = async () => {
//   if (uri) {
//     const res = await fetch(uri.toString())
//     const data = await res.json()
//     console.log(data)
//   }
// }

const Home: NextPage = () => {
  // const {data, status} = useQuery(['metadata'], ()=>getMetadata)
  const { isConnected, address } = useAccount()

  const { data: accountBalanceOne, isSuccess: accountOneSuccess } =
    useContractRead({
      ...contractConfig,
      functionName: 'balanceOf',
      watch: true,
      args: [address, 1],
    })

  const { data: accountBalanceTwo, isSuccess: accountTwoSuccess } =
    useContractRead({
      ...contractConfig,
      functionName: 'balanceOf',
      watch: true,
      args: [address, 2],
    })

  // const { data: uri } = useContractRead({
  //   ...contractConfig,
  //   functionName: 'uri',
  //   args: [1],
  // })

  const totalMinted =
    accountOneSuccess || accountTwoSuccess
      ? accountBalanceOne?.toNumber() + accountBalanceTwo?.toNumber()
      : 0

  const mintOne = [address, 1, 1]
  const mintTwo = [address, 2, 1]

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <section className="bg-white my-auto mx-0 flex items-center content-center">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto gap-4 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-6">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
              NFT Demo Mint
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
              {totalMinted === 0
                ? "You don't have any jellycakes :("
                : totalMinted === 1
                ? 'You have minted 1 jellycake! :)'
                : `You have minted ${totalMinted} jellycakes! :D`}
            </p>
            <ConnectButton />
            <div className="flex flex-row">
              <Mint customMintArgs={mintOne} title={'Berry'} />
              <Mint customMintArgs={mintTwo} title={'Choco'} />
            </div>
          </div>
          {isConnected ? (
            <div className="lg:mt-0 lg:col-span-6 lg:flex bg-gradient-to-r p-2 rounded-2xl from-[#3898FF] via-[#7A70FF] to-[#9333EA]">
              <div className="grid grid-cols-2 grid-rows-5 bg-white p-8 rounded-2xl">
                <h3 className="col-span-2 row-span-1mb-4 text-2xl font-semibold">
                  My Inventory
                </h3>
                <div className="flex flex-col items-center content-center row-span-4">
                  <img
                    className="object-none transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 mb-2"
                    src="https://res.cloudinary.com/dbegssigw/image/upload/v1660736376/berry_hiwfrc.png"
                    alt="berry"
                  />
                  <span className="text-gray-500">berry jellycakes</span>
                  <span className="text-2xl font-bold">
                    {accountBalanceOne ? accountBalanceOne.toNumber() : 0}
                  </span>
                </div>
                <div className="flex flex-col items-center content-center row-span-4">
                  <img
                    className="object-none transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 mb-2"
                    src="https://res.cloudinary.com/dbegssigw/image/upload/v1660736377/choco_sa8i8o.png"
                    alt="choco"
                  />
                  <span className="text-gray-500">choco jellycakes</span>
                  <span className="text-2xl font-bold">
                    {accountBalanceTwo ? accountBalanceTwo.toNumber() : 0}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:mt-0 lg:col-span-6 lg:flex ">
              <div className="min-w-[600px] grid place-content-center">
                <img
                  src="https://media.tenor.com/images/5fc7f8ebacea507cd93a527138352c6f/tenor.gif"
                  className="-translate-y-4"
                />
              </div>
            </div>
          )}
        </div>
      </section>
      <footer className="p-4 rounded-lg  md:flex md:items-center md:justify-end md:p-6">
        <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 sm:mt-0">
          <li>
            <a
              href="https://www.rainbowkit.com/"
              className="mr-4 hover:underline md:mr-6 "
            >
              rainbowkit
            </a>
          </li>
          <li>
            <a
              href="https://jellie.twala.io/"
              className="mr-4 hover:underline md:mr-6"
            >
              jellie
            </a>
          </li>
          <li>
            <a
              href="https://media.tenor.com/images/5fc7f8ebacea507cd93a527138352c6f/tenor.gif"
              className="mr-4 hover:underline md:mr-6"
            >
              gif
            </a>
          </li>
          <li>
            <a href="https://github.com/berrycakes" className="hover:underline">
              berrycake
            </a>
          </li>
        </ul>
      </footer>
    </main>
  )
}

export default Home
