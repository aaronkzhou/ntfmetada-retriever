import express from 'express';
import nftController from '../controllers/nftController';

const router = express.Router();

// Fetch and store metadata
router.get('/metadata/:contractAddress/:tokenId', nftController.getMetadata);

export default router;