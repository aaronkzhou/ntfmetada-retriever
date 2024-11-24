# NFT Metadata Viewer 🖼️

A full-stack application for viewing NFT metadata using Web3.js, React, TypeScript, and MongoDB. This project allows users to fetch and view NFT metadata by providing a contract address and token ID.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- MongoDB (included in Docker setup)

### Running with Docker

1. Clone the repository
```bash
git clone <repository-url>
cd <repository-url>
```

2. Create environment files

Frontend (.env):
```env
VITE_BACKEND_URL=http://localhost:3001
VITE_WEB3_PROVIDER=https://ethereum-rpc.publicnode.com
```

Backend (.env):
```env
MONGODB_URI=mongodb://@mongodb:27017/web3challenges
PORT=3001
WEB3_PROVIDER_URL=https://ethereum-rpc.publicnode.com
```

3. Start the application
```bash
docker compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- MongoDB: mongodb://localhost:27017

### MongoDB Connection

Default credentials:
- Database: web3challenges
- Connection string: `mongodb://localhost:27017/web3challenges`

## 🏗️ Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── NFTViewer.tsx
│   │   ├── hooks/
│   │   │   └── useNFTMetadata.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── nftController.ts
│   │   ├── models/
│   │   │   └── NFTMetadata.ts
│   │   ├── routes/
│   │   │   └── nftRoutes.ts
│   │   └── index.ts
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## 🔧 Tech Stack

Frontend:
- React with TypeScript
- Vite
- Web3.js
- Tailwind CSS
- Environment variables support

Backend:
- Node.js with TypeScript
- Express
- MongoDB with Mongoose
- Web3.js for blockchain interaction
- CORS enabled

Infrastructure:
- Docker with hot reload
- MongoDB
- Docker Compose for orchestration

## 📝 API Endpoints

```typescript
// Fetch NFT metadata
GET /api/nft/metadata/:contractAddress/:tokenId

// Response
{
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
```

## 🔥 Development with Hot Reload

The Docker setup includes hot reload for both frontend and backend:

```bash
# Start with hot reload
docker compose watch
```

Frontend changes will automatically refresh in the browser.
Backend changes will automatically restart the server.

## 🔒 Security Notes

1. Never commit .env files to version control
2. Change default MongoDB credentials in production
3. Use proper CORS configuration
4. Secure your Web3 provider URL

## 🐛 Troubleshooting

1. If ports are already in use:
```bash
# Check ports
lsof -i :3000
lsof -i :3001
# Kill process
kill -9 PID
```

2. Reset Docker setup:
```bash
docker compose down
docker system prune -f
docker compose up --build
```

3. MongoDB connection issues:
```bash
# Check MongoDB logs
docker compose logs mongodb
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.