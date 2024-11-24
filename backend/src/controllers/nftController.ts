import { Request, Response } from 'express';
import Web3 from 'web3';
import NFTMetadata from '../models/NFTMetadata';

// Types
interface NFTMetadataResponse {
  name: string;
  description: string;
  image: string;
}

const ERC721_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  }
];

class NFTController {
  private web3: Web3;

  constructor() {
    this.web3 = new Web3(process.env.WEB3_PROVIDER_URL || '');
  }

  public getMetadata = async (req: Request, res: Response): Promise<void> => {
    try {
      const { contractAddress, tokenId } = req.params;

      if (!this.web3.utils.isAddress(contractAddress)) {
        res.status(400).json({ error: 'Invalid contract address' });
        return;
      }

      // Check cache
      const existingMetadata = await NFTMetadata.findOne({
        contractAddress: contractAddress.toLowerCase(),
        tokenId
      });

      if (existingMetadata && 
          (new Date().getTime() - existingMetadata.fetchedAt.getTime()) < 24 * 60 * 60 * 1000) {
        res.json(existingMetadata);
        return;
      }

      // Fetch from blockchain
      const contract = new this.web3.eth.Contract(ERC721_ABI, contractAddress);
      const tokenURI = await contract.methods.tokenURI(tokenId).call();

      // Handle IPFS or HTTP URLs
      const metadataUrl = (tokenURI as unknown as string).startsWith('ipfs://')
        ? `https://ipfs.io/ipfs/${(tokenURI as unknown as string).slice(7)}`
        : tokenURI;

      const response = await fetch(metadataUrl as string);
      if (!response.ok) throw new Error('Failed to fetch metadata');
      // @ts-ignore
      const nftMetadata: NFTMetadataResponse = await response.json();

      // Process IPFS image URL
      const imageUrl = nftMetadata.image.startsWith('ipfs://')
        ? `https://ipfs.io/ipfs/${nftMetadata.image.slice(7)}`
        : nftMetadata.image;

      // Update or create in database
      const updatedMetadata = await NFTMetadata.findOneAndUpdate(
        { contractAddress: contractAddress.toLowerCase(), tokenId },
        {
          name: nftMetadata.name,
          description: nftMetadata.description,
          imageUrl,
          fetchedAt: new Date()
        },
        { upsert: true, new: true }
      );

      res.json(updatedMetadata);
    } catch (error) {
      console.error('Error fetching NFT metadata:', error);
      res.status(500).json({ 
        error: 'Failed to fetch NFT metadata',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };
}

export default new NFTController();