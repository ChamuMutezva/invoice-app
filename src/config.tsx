export const API_ENDPOINT_PATH = process.env.NODE_ENV === 'production'
    ? "https://tasty-peplum-eel.cyclic.app/api/invoices"
    : "http://localhost:4000/api/invoices" 

export const API_AUTH_PATH = process.env.NODE_ENV === 'production'
? "https://tasty-peplum-eel.cyclic.app/api/user"
: "http://localhost:4000/api/user"