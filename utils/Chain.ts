import { Chain } from 'wagmi'

export const jellieTestnet: Chain = {
  id: 202624,
  name: 'Jellie Test Network',
  network: 'Jellie Test Network',
  nativeCurrency: {
    decimals: 18,
    name: 'TWL',
    symbol: 'TWL',
  },
  rpcUrls: {
    default: 'https://jellie-rpc.twala.io/',
  },
  blockExplorers: {
    default: { name: 'Jellie', url: 'https://jellie.twala.io/' },
  },
  testnet: true,
}
