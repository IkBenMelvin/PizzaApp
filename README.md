# pizzaApp

## Description

pizzaApp is a app to easily manage orders. Create & update orders, pizzas & users! This project was made as a school project.

## Features

Sign up, login and logout users
Create orders and pizzas
Update orders and pizzas
Delete orders and pizzas
See all orders, products and users in the admin dashboard
Cart page


## Requirements

To use this project, you will need the following:

- [Supabase](https://supabase.com/) account
- Space for a new project
- Either a phone emulator, a phone, or a web browser

## Installation

<span style="color: red">Note: having supabase run locally doesn't work right now.</span>

Follow these steps to get the project up and running:

1. Create a new Supabase project:
   - Sign up for a Supabase account if you don't have one.
   - Log in to your Supabase account.
   - Create a new project on [Supabase](https://supabase.com/).

2. Insert the SQL code from `schema.sql`:
   - In your Supabase project, navigate to the SQL section.
   - Create a new SQL file and paste the contents of `schema.sql` into it.
   - Execute the SQL code to create the necessary database tables.

3. Create a **public** bucket called `images`:
   - In your Supabase project, navigate to the Storage section.
   - Create a new bucket and name it `images`.
   - Make sure the bucket is set to public so that your images can be accessed.

4. Create a new `.env` file:
   - In the root directory of your project, create a new `.env` file.
   - Enter your Supabase project details:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

5. Install project dependencies:
   - Open your terminal and navigate to the project's root directory.
   - Run the following command to install the required npm packages & update the environment variables:
     ```bash
     npm run clean
     ```

6. Start the project:
   - Run the following command to start the project:
     ```bash
     npm run start
     ```

7. Choose an emulator, device, or web browser for testing:
   - Depending on your needs, select one of the following options to interact with your project:
     - Use a phone emulator.
     - Use a physical phone.
     - Use a web browser.

Now, your project is set up and ready to use.

## License

This project is licensed under the MIT license - see the [LICENSE.md](LICENSE.md) file for details.