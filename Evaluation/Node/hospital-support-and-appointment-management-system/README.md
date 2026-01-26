# Hospital Support & Appointment Management System

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Caching:** Redis
- **Auth:** JWT

## Setup
1. Clone the repo
2. Run `npm install`
3. Ensure MongoDB and Redis are running locally.
4. Rename `.env.example` to `.env` and fill details.
5. Run `npm run dev`

## API Endpoints

### Auth
- `POST /api/auth/register` - { name, email, password, role }
- `POST /api/auth/login` - { email, password }

### Patient
- `POST /api/patient/book` - Book appointment
- `GET /api/patient/doctors` - List doctors (Cached)
- `POST /api/patient/ticket` - Raise support ticket

### Doctor
- `GET /api/doctor/appointments` - View schedule
- `PUT /api/doctor/appointment/:id` - Add prescription/status
- `PUT /api/doctor/ticket/:id/resolve` - Resolve ticket

### Admin
- `GET /api/admin/stats` - View complex aggregations