# AI Coding Guidelines for Food Delivery App

## Architecture Overview
This is a full-stack food delivery application with:
- **Frontend**: React 19 + Vite, using React Router for navigation (Home, Cart, Place Order)
- **Backend**: Node.js + Express 5, MongoDB with Mongoose for data persistence
- **State Management**: React Context (`StoreContext`) for cart functionality
- **Data Flow**: Static food list in `frontend/src/assets/assets.js` for display; backend API (`/api/food/add`) for admin food management

## Key Components & Patterns
- **Component Structure**: Each component has paired `.jsx` and `.css` files in `frontend/src/components/`
- **Routing**: Use `react-router-dom` Routes in `App.jsx` for page navigation
- **Context Usage**: Import `StoreContext` for cart operations like `addToCart`, `removeFromCart`, `getTotalCartAmount`
- **Backend API**: RESTful endpoints in `backend/routes/`, controllers in `backend/controllers/`, models in `backend/models/`
- **File Uploads**: Multer middleware for image uploads, stored in `backend/uploads/`

## Development Workflows
- **Frontend Dev**: `cd frontend && npm run dev` (Vite dev server on port 5173)
- **Backend Dev**: `cd backend && npm run server` (Nodemon on port 4000)
- **Build**: `cd frontend && npm run build` (Vite production build)
- **Linting**: `cd frontend && npm run lint` (ESLint with React rules)

## Conventions & Dependencies
- **Modules**: ES modules (`"type": "module"`) throughout
- **Styling**: Inline Tailwind-like classes in JSX, custom CSS in `.css` files
- **Authentication**: JWT (jsonwebtoken) and bcrypt for user auth (backend dependencies present but not yet implemented)
- **Payments**: Stripe integration ready (stripe package installed)
- **Database**: MongoDB Atlas connection in `backend/config/db.js`

## Integration Points
- **API Calls**: Frontend should eventually fetch from backend APIs instead of static `food_list`
- **Image Serving**: Static images in `frontend/public/`, uploaded images in `backend/uploads/`
- **Environment**: Use `.env` for sensitive data (MongoDB URI, JWT secret)

## Examples
- Add new food item: POST to `/api/food/add` with form-data (name, description, price, category, image file)
- Update cart: Use `StoreContext` methods like `addToCart(itemId)` in components
- New component: Create folder in `components/` with `Component.jsx` and `Component.css`, import in `App.jsx` or pages</content>
<parameter name="filePath">d:\react projects\food-app\.github\copilot-instructions.md