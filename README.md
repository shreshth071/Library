# 📚 Library Management System

A full-stack web-based Library Management System built using **Node.js, Express, EJS, MongoDB (Mongoose)**, and **Cloudinary**. Deployed seamlessly on **Netlify** using Netlify Functions.

---

## 🛠️ Tech Stack & Tools
- **Backend**: Node.js, Express.js, `serverless-http`
- **Frontend / Templating**: EJS, Bootstrap 5, FontAwesome
- **Database**: MongoDB Atlas (Mongoose ORM)
- **Image Storage**: Cloudinary
- **Deployment**: Netlify Functions

---

## 🚀 Deploying to Netlify

### Option 1: Deploy via GitHub (Recommended)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log in to [Netlify](https://app.netlify.com/) and click **Add new site > Import an existing project**.
3. Select your repository.
4. Netlify will automatically read `netlify.toml` with the following build settings:
   - **Publish directory**: `public`
   - **Functions directory**: `netlify/functions`
5. Under **Site Configuration > Environment Variables**, add:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (`mongodb+srv://<user>:<password>@cluster0.../library`)
   - `CLOUDINARY_CLOUD_NAME`: (Optional) Your Cloudinary Cloud Name
   - `CLOUDINARY_API_KEY`: (Optional) Your Cloudinary API Key
   - `CLOUDINARY_API_SECRET`: (Optional) Your Cloudinary API Secret
6. Click **Deploy Site**.

---

### Option 2: Deploy via Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Login to your Netlify account:
   ```bash
   netlify login
   ```
3. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy --prod
   ```

---

## 💻 Local Development Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shreshth071/Library.git
   cd Library
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 License
This project is licensed under the ISC License. See the [LICENSE.md](./LICENSE.md) file for details.

