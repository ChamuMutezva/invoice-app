# Frontend Mentor - Invoice app solution

This is a solution to the [Invoice app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)
## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://invoice-app-ckm.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [React Query](https://react-query-v3.tanstack.com/) - Fetching data from the server
- [React Router](https://reactrouter.com/en/main/start/tutorial) - navigation
- [React hook form](https://react-hook-form.com/api/useform/register/) - forms and form validation

### What I learned

#### Using React Query now known as TanStack Query
- used for data management - data fetching , caching , sychronizing and updating the server state 
- installation: install using npm by typing `npm i react-query` on the terminal or yarn `yarn add react-query`

##### Using React Query
- in the root of the application , I have used the **App.tsx** as the center for data management. The following steps were taken
1. import { QueryClient, QueryClientProvider } from "react-query";
2. const queryClient = new QueryClient();
3. 

```
<QueryClientProvider client={queryClient}>
      <div className={`app ${theme ? "" : "dark-mode"}`}>
        <header className="flex header">
          <div className="flex controls">
            <div className="logo-container">
              <a className="btn btn-logo" href="">
                <img src={Logo} alt="" aria-hidden={true} />
                <span className="sr-only">preprince investments</span>
              </a>
            </div>

            <Toggle theme={theme} onChange={onChange} />
          </div>
          <div className="profile">
            <a href="#" className="btn btn-profile">
              <img className="btn-profile-img" src={Profile} alt="" aria-hidden={true} />
              <span className="sr-only">customer profile</span>
            </a>
          </div>
        </header>
        <RouterProvider router={router} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
```
- 4. Then in the app, `useMutation, useQuery` mainly are used for data fetching, where `useQuery` is used to get data when
there is no need to update the data and `useMutation` is used for updating data

#### Creating a Clickable Card
- make the div `card` that should be clickable to be of `position: relative` 
- then one child element of the `card` div should be an anchor element. In our example React router uses the `Link` as the 
anchor element . See code below

```html
<div key={invoice.id} className="card">
    <p>{invoice.id}</p>
    <p>{invoice.clientName}</p>
    <p>{invoice.paymentDue}</p>
    <p>R: {invoice.total}</p>
    <Link className="btn-link" to={"/viewInvoice"}>{invoice.status}</Link>
 </div>
```

```css
.card {
  position: relative;
  background: red;
}

.btn-link {
  display: block;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
```
#### Error - Unexpected application error
##### Rendered more hooks than during the previous render

![Rendered more hooks than during the previous render](src/assets/hook-err2.png)

The application has multiple pages and the error is encountered during navigation. Here is a brief steps that I 
performed to notice the bug.
1. From  the homepage , I navigated to the `ViewInvoice` page
2. In the `ViewPage` , reload the page.

##### Causes and solution

The error is caused by (in this particular case) , having a hook which was called after a condition
![Ilustration of error](src/assets/hook-err-illustration2.png)

Moving the useMutation hook above the if condition will solve the error
![Fixing the error](src/assets/hook-err-fix.png)
### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Website - [Add your name here](https://www.your-site.com)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@yourusername](https://www.twitter.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
