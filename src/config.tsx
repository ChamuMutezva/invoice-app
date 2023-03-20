export const API_ENDPOINT_PATH = process.env.NODE_ENV === 'production'
    ? "https://tasty-peplum-eel.cyclic.app/"
    : "http://localhost:4000/api/invoices"
    console.log(process.env.NODE_ENV);