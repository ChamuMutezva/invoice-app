export const API_ENDPOINT_PATH =
    process.env.NODE_ENV === "production"
        ? "https://invoice-backend-jpep.onrender.com/api/invoices"
        : "http://localhost:4000/api/invoices";

export const API_AUTH_PATH =
    process.env.NODE_ENV === "production"
        ? "https://invoice-backend-jpep.onrender.com/api/user"
        : "http://localhost:4000/api/user";

// "https://tasty-peplum-eel.cyclic.app/api/invoices"
// "https://tasty-peplum-eel.cyclic.app/api/user"
