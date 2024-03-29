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
- create login details
- sign in to proceed
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: full-stack app

### Screenshot
- **Invoice list page**
![Homepage](src/assets/screenshots/homepage.png)
- **View Invoice details page**
![View invoice page](src/assets/screenshots/viewInvoice.png)
- **Edit Invoice page**
![Edit invoice page](src/assets/screenshots/editinvoice.png)
- **New Invoice page**
![New invoice page](src/assets/screenshots/newinvoice.png)

### Links

- Frontend Mentor Solution URL: [Frontend Mentor solution url](https://www.frontendmentor.io/solutions/invoice-app-tanstack-queryreact-query-react-hook-form-LLKN1HpWdS)
- Live Site URL: [Invoice app](https://invoice-app-ckm.netlify.app/)

## My process

I created the challenge as a Fullstack application, the backend files are in a separate project folder known as `invoice backend`
The Backend fetches and stores data that is stored in MongoDb. Project created using Vite typescript.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [vite](https://vitejs.dev/) - Frontend tooling for React
- [React Query](https://react-query-v3.tanstack.com/) - Fetching data from the server
- [React Router](https://reactrouter.com/en/main/start/tutorial) - navigation
- [React hook form](https://react-hook-form.com/api/useform/register/) - forms and form validation

### What I learned

#### input type number

- input type number is used to enter a number and has in-built validation to reject non-numerical entries.
 in this project, one of the task requires to calculate the total amount of a single project and then sum up to get the total os all the projects.
- The NewInvoice and the EditInvoice design files did not have the Grand Total input field , but to allow the
 data to be collected in the form , I created a sr-only input field as shown below and among other things, the
 input element had a type `number`.

``` tsx
<div className="sr-only grand-total-wrapper">
       <label
        htmlFor="grand-total"
        className="label"
       >
        The grand total is
        <input
         type="number"
         {...register("total")}
        />
       </label>
      </div>
```

##### Observation - input type number

- No issues where recorded when entering a number that has no decimal point, for example, I could make calculations where
 the `Quantity = 3` and `Price = 1568`. Issues started when I would enter something like `Price = 1569.95`. The form could not be submitted , but no feedback or error message was provided. In some cases where I had more than 1 project, the Grand total summation was weird as the individual project total was a string concatenation. Eg

 1. Project 1 Total: 1578.95
 2. Project 2 Total: 7699.85
 3. Project 3 Total: 645.55

 The above will be displayed as `1578.957699.85645.55` for the total

My final solution was to use the `input type text`
For issues related to input type number , read the following article [Why the GOV.UK Design System team changed the input type for numbers](https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers/)

#### Using React Query now known as TanStack Query

- used for data management - data fetching , caching , sychronizing and updating the server state
- installation: install using npm by typing `npm i react-query` on the terminal or yarn `yarn add react-query`

##### Using React Query

1. in the root of the application , I have used the **App.tsx** as the center for data management. The following steps were taken
2. import { QueryClient, QueryClientProvider } from "react-query";
3. const queryClient = new QueryClient();

``` tsx
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
![Illustration of error](src/assets/hook-err-illustration2.png)

Moving the useMutation hook above the if condition will solve the error
![Fixing the error](src/assets/hook-err-fix.png)

### Reusable overlay

Link to ![Reusable overlay component](src/pages/OverLay.tsx)
Application link ![Reusable overlay usage](src/pages/HomePage.tsx)

```tsx
<OverLay
     isOverlayOpen={isNewInvoiceOverlayOpen}
     toggleOverlay={toggleOverlay}
    >
     <NewInvoice
      toggleOverlay={toggleOverlay}
      childInputRef={childInputRef}
     />
    </OverLay>
```

### Continued development

- authentification - log in users by authentification

### Useful resources

- [A Complete Guide to Mutations in React Query - Part 5 - Using the useMutation Hook to Delete Resources on the Server.](https://hemanta.io/a-complete-guide-to-mutations-in-react-query-part-5-using-the-usemutation-hook-to-delete-resources-on-the-server/)
- [REST APIs - How To Mutate Data From Your React App Like The Pros](https://profy.dev/article/react-query-usemutation)
- [UseForm hook - watch](https://react-hook-form.com/api/useform/watch/)
- [Reusable hook forms text input](https://blog.qoddi.com/create-a-reusable-text-input-with-react-hook-form/)
- [datefns](https://date-fns.org/v2.29.3/docs/format)

## Author

- Website - [Chamu Mutezva](https://github.com/ChamuMutezva)
- Frontend Mentor - [@ChamuMutezva](https://www.frontendmentor.io/profile/ChamuMutezva)
- Twitter - [@ChamuMutezva](https://twitter.com/ChamuMutezva)

## Acknowledgments

- Focus trap implementation inspired by Tediko from his solution - see link below
[Tediko Invoice app - Focus trap implementation](https://www.frontendmentor.io/solutions/invoice-app-reactjs-styledcomponents-framer-motion-webpack-WVGeS4ShF)
