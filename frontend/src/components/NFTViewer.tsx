// frontend/src/components/NFTViewer.tsx
import React, { useState } from 'react';
import { NFTMetadata } from '../typs/nft';
import { useNFTMetadata } from '../hooks/useNftData';

const NFTViewer: React.FC = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const { fetchMetadata, loading, error } = useNFTMetadata();
  console.log(111, metadata);

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-2'>NFT Metadata Viewer</h1>
          <p className='text-gray-600'>Enter contract address and token ID to view NFT details</p>
        </div>

        <div className='mb-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Contract Address</label>
              <input
                type='text'
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black'
                placeholder='0x...'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>Token ID</label>
              <input
                type='text'
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black'
                placeholder='1'
                required
              />
            </div>

            <button
              type='submit'
              disabled={loading}
              onClick={async () => {
                const data = await fetchMetadata(contractAddress, tokenId);
                setMetadata(data);
              }}
              className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                     transition-all duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed
                     shadow-sm hover:shadow-md'
            >
              {loading ? (
                <span className='flex items-center justify-center'>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Fetch Metadata'
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className='rounded-lg bg-red-50 p-4 text-sm text-red-700 mb-6 border border-red-200'>
            <div className='flex'>
              <svg
                className='h-5 w-5 text-red-400 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                  clipRule='evenodd'
                />
              </svg>
              {error}
            </div>
          </div>
        )}

        {metadata && (
          <div className='border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow'>
            <div className='relative'>
              <img src={metadata.imageUrl} alt={metadata.name} className='w-full h-80 object-cover' />
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
              <h2 className='absolute bottom-4 left-4 text-3xl font-bold text-white'>{metadata.name}</h2>
            </div>

            <div className='p-6'>
              <p className='text-gray-600 mb-6 text-lg'>{metadata.description}</p>

              <div className='grid grid-cols-2 gap-4 text-sm'>
                <div className='p-4 bg-gray-50 rounded-lg'>
                  <p className='font-semibold text-gray-700'>Contract</p>
                  <p className='text-gray-600 break-all'>{metadata.contractAddress}</p>
                </div>
                <div className='p-4 bg-gray-50 rounded-lg'>
                  <p className='font-semibold text-gray-700'>Token ID</p>
                  <p className='text-gray-600'>{metadata.tokenId}</p>
                </div>
              </div>

              <div className='mt-4 pt-4 border-t border-gray-200'>
                <p className='text-sm text-gray-500'>Last Updated: {new Date(metadata.fetchedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { NFTViewer };
