# Currency Quote API

A simple and lightweight API to provide simulated currency exchange rates. This project was created to demonstrate a complete CI/CD workflow, including automated testing and containerization with Docker.

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **Jest**: Framework for testing

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

### Installation & Usage

1.  Clone the repository:
    ```sh
    git clone [https://github.com/carolyneluz/currency-quote-api.git](https://github.com/carolyneluz/currency-quote-api.git)
    ```
2.  Navigate to the project directory:
    ```sh
    cd currency-quote-api
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```
4.  Start the server:
    ```sh
    npm start
    ```
    The API will be running at `http://localhost:3000`.

## API Endpoints

### Get Currency Pair Quote

Returns the simulated exchange rate for a given currency pair.

- **URL**: `/quote/:pair`
- **Method**: `GET`
- **URL Params**: `pair=[string]` (e.g., `USD-BRL`)

**Example Request:**
```sh
GET http://localhost:3000/quote/USD-BRL
```

## License

This project is licensed under the MIT License.