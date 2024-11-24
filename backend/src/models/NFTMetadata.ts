import mongoose, { Document, Schema } from 'mongoose';

interface INFTMetadata extends Document {
  contractAddress: string;
  tokenId: string;
  name: string;
  description: string;
  imageUrl: string;
  fetchedAt: Date;
}

const NFTMetadataSchema = new Schema({
  contractAddress: {
    type: String,
    required: true,
    lowercase: true
  },
  tokenId: {
    type: String,
    required: true
  },
  name: String,
  description: String,
  imageUrl: String,
  fetchedAt: {
    type: Date,
    default: Date.now
  }
});

NFTMetadataSchema.index({ contractAddress: 1, tokenId: 1 }, { unique: true });

export default mongoose.model<INFTMetadata>('NFTMetadata', NFTMetadataSchema);