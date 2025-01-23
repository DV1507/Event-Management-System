# README

## Steps to Run the Client and Server Locally

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- PostgreSQL
- Docker (optional, for containerized deployment)

### Running the Server

1. Clone the repository:

   ```bash
   git clone https://github.com/DV1507/Event-Management-System
   cd Event-Management-System/FE

   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and update the necessary values.
4. Start the server:
   ```bash
   npm run build
   ```

### Running the Client

1. Navigate to the client directory:
   ```bash
   cd ../FE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.example` to `.env` and update necessary values.
4. Start the client:
   ```bash
   npm start
   ```

---

## Project Focus and Problem Solving

This code implements a backend API using Express.js and Prisma, designed for comprehensive management of events and their associated categories. Key features include:

Event Management: Creation (with category linking), retrieval (with filtering and pagination), updating (including category associations), and soft deletion.
Category Management: Seeding initial categories and retrieving all available categories.
Data Seeding: Generating dummy events for development and testing, optimized for performance using batch processing.
API Design: Consistent API responses through a utility function and robust error handling.
This API provides a well-structured and efficient solution for managing event data, addressing database interaction, data relationships (between events and categories), API design principles, and performance optimization, particularly during data seeding.

---

## Trade-offs Made

- **Error Handling Granularity:**: The catch blocks generally log the error and return a generic error message. More specific error handling could be beneficial. For example:
  Distinguish between database errors (e.g., connection errors, unique constraint violations) and other errors.
  Return more informative error messages to the client based on the error type.
  Consider using HTTP status codes that better reflect the error (e.g., 409 Conflict for unique constraint violations, 500 Internal Server Error for unexpected errors).

---

## Weakest Part of the Solution and Improvements

The weakest part of the current solution is the lack of caching, which leads to repeated API calls, slower performance, and higher server load. To improve this, Redis can be used for server-side caching to store frequently accessed data and reduce database queries. On the client side, TanStack Query can help cache API responses, making the application faster and more efficient. Implementing these caching solutions will improve performance, reduce load times, and enhance the user experience.

---

## Time Spent

Approximately 8 hours were spent on the project, including planning, development, and debugging.

---

## Libraries and Tools Used

- **Express.js:** For a modular and efficient backend.
- **ReactJS:** For a performant frontend.
- **Prisma:** For database interactions.
- **Docker:** For containerization of database.
- **ShadcnUI:** For Efficient UI solution.
- **Tanstack Table:** For Tabular list of events.

I chose these tools for their community support, scalability, and ease of integration.

---

## Code Attribution

No code was copied directly, but dependencies and open-source libraries have been utilized. Proper attribution has been maintained through package.json.

---

## Scalability Considerations

- Used database indexing and query optimization.
- Leveraged creatable select package to inline create categories in future if required.

---

## UI/UX Design Approach

- Ensured responsive layouts for mobile-friendliness.
- Used color psychology to enhance user engagement.
- Focused on accessibility with ARIA roles and semantic HTML.

---
