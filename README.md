# 🖥️ PC Builder Pro

A modern, full-stack web application for building custom PCs with real-time compatibility checking and price calculation. Build your dream gaming rig or workstation with confidence!

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://pc-builder-pro-omega.vercel.app)
[![Backend API](https://img.shields.io/badge/API-active-blue)](https://pc-builder-pro-backend.onrender.com)

## ✨ Features

- 🔧 **Component Selection** - Browse and select from a wide range of PC components:
  - CPUs (Intel & AMD)
  - GPUs (NVIDIA & AMD)
  - Motherboards
  - RAM
  - Storage (SSD/HDD)
  - Power Supplies
  - Cases

- ⚡ **Real-time Compatibility Checking** - Automatically detects compatibility issues:
  - CPU socket compatibility with motherboards
  - Intel/AMD chipset validation
  - Power supply wattage requirements
  - Form factor compatibility

- 💰 **Dynamic Price Calculator** - Live total price updates as you select components

- 💾 **Save & Load Builds** - Save your PC configurations to browser localStorage and load them later

- 📤 **Share Build Summary** - Copy your build details to clipboard for easy sharing

- 🌓 **Dark/Light Mode** - Beautiful UI with theme toggle for comfortable viewing

- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

- 🎨 **Modern UI/UX** - Built with Framer Motion animations and smooth transitions

## 🚀 Live Demo

**Frontend:** [https://pc-builder-pro-omega.vercel.app](https://pc-builder-pro-omega.vercel.app)

**Backend API:** [https://pc-builder-pro-backend.onrender.com](https://pc-builder-pro-backend.onrender.com)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool & dev server
- **Zustand** - State management
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **CORS** - Cross-origin resource sharing

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **MongoDB Atlas** - Database hosting

## 📸 Screenshots

  ## Light Mode
>  <img width="2240" height="1182" alt="Light_SS" src="https://github.com/user-attachments/assets/3825fb50-2b10-4e8c-9828-cde07794fc96" />
  ## Dark Mode
>  <img width="2240" height="1179" alt="Dark_SS" src="https://github.com/user-attachments/assets/902be0c1-13cb-4084-8d61-f0bc3b0ebefc" />

## 🏗️ Project Structure
<img width="368" height="444" alt="Project_Structure" src="https://github.com/user-attachments/assets/8fb2cc75-d782-4e1d-b392-c1dbfccec126" />

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
git clone https://github.com/Chiranthan497/PC_Builder_Pro.git
cd PC_Builder_Pro

text

2. **Install Backend Dependencies**
cd server
npm install

text

3. **Create Backend .env file**
server/.env
PORT=5500
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development

text

4. **Start Backend Server**
npm start

Server runs on http://localhost:5500
text

5. **Install Frontend Dependencies**
cd ../client
npm install

text

6. **Create Frontend .env file**
client/.env
VITE_API_URL=http://localhost:5500/api/v1

text

7. **Start Frontend Dev Server**
npm run dev

App runs on http://localhost:5173
text

## 📝 API Endpoints

### Components

- `GET /api/v1/components` - Get all components
- `GET /api/v1/components/:type` - Get components by type (cpu, gpu, ram, etc.)
- `GET /api/v1/components/detail/:id` - Get component by ID
- `POST /api/v1/components` - Create new component

## 🎯 Usage

1. **Select Components** - Click on each component category to browse and select parts
2. **Check Compatibility** - The compatibility checker automatically validates your selections
3. **Review Price** - See the total price update in real-time
4. **Save Build** - Click "Save Build" to store your configuration locally
5. **Load Build** - Use "Load Build" to retrieve your saved configurations
6. **Share** - Copy your build summary to share with others

## 🔮 Future Enhancements

- [ ] User authentication & accounts
- [ ] Save builds to database
- [ ] Public build gallery
- [ ] Component comparison tool
- [ ] Price tracking & alerts
- [ ] Build performance benchmarks
- [ ] Amazon/Newegg price integration
- [ ] 3D PC case preview

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Chiranthan**

- GitHub: [@Chiranthan497](https://github.com/Chiranthan497)
- Project Link: [https://github.com/Chiranthan497/PC_Builder_Pro](https://github.com/Chiranthan497/PC_Builder_Pro)

## 🙏 Acknowledgments

- Component data inspired by real PC parts
- Icons from [Lucide Icons](https://lucide.dev/)
- UI inspiration from modern PC building websites

---

⭐ **Star this repo if you found it helpful!**
Save this as README.md in your root folder, then:

bash
git add README.md
git commit -m "Add comprehensive README"
git push origin main

