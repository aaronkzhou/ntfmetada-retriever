import { useState } from 'react';

interface NFTMetadata {
  contractAddress: string;
  tokenId: string;
  name: string;
  description?: string;
  imageUrl?: string;
  contractName?: string;
  symbol?: string;
  attributes?: Array<{ trait_type: string; value: string }>;
  fetchedAt: string;
}

export const useNFTMetadata = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMetadata = async (contractAddress: string, tokenId: string): Promise<NFTMetadata | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/nft/metadata/${contractAddress}/${tokenId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch metadata');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getContractMetadata = async (contractAddress: string): Promise<NFTMetadata[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/nft/metadata/${contractAddress}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch contract metadata');
      }

      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchMetadata,
    getContractMetadata,
    loading,
    error
  };
};
