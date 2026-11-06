# API Deployment – Dev Team 4

## Overview

This project is a REST API built using **Node.js and Express.js** as part of Mission Ready HQ's Mission 2.

The project focuses on creating API endpoints, processing JSON requests, validating user inputs, and returning appropriate responses.

## Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Backend API framework
- **JavaScript** – Programming language
- **Jest / Node.js Test Runner** – API unit testing
- **Git & GitHub** – Version control

## API Endpoints

The server runs locally at:

`http://localhost:3000`

| Endpoint | Method | Description |
|---|---|---|
| `/api1` | POST | Calculates a car's value based on its model and year |
| `/api2` | POST | Calculates an insurance quote |
| `/api3` | POST | Third API endpoint (under development) |

### API 1 – Car Value Calculator

Calculates the value of a car using its model name and manufacturing year.

**Example request:**

```json
{
  "model": "Civic",
  "year": 2014
}
```

**Example response:**

```json
{
  "car_value": 6614
}
```

### API 2 – Insurance Quote

Calculates an insurance quote using the car's value and risk rating.

**Example request:**

```json
{
  "car_value": 6614,
  "risk_rating": 3
}
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/xeraider/API_Deployment.git
```

### 2. Navigate to the project

```bash
cd API_Deployment
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

The server should be available at:

`http://localhost:3000`

## Testing the API

You can test the API using Postman or PowerShell.

**Example using PowerShell:**

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api1" -Method POST -ContentType "application/json" -Body '{"model":"Civic","year":2014}'
```

To run the unit tests, use the test commands configured in `package.json`.

## Error Handling

The APIs validate incoming data and return appropriate HTTP status codes.

- **200 OK** – Request processed successfully.
- **400 Bad Request** – Invalid or missing input.

Example error response:

```json
{
  "error": "Input must not be empty"
}
```

## Project Team

Developed by **Dev Team 4** as part of the Mission Ready HQ Full Stack Developer programme.