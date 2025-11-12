# AI Engineer Labs LLC

Professional website for AI Engineer Labs LLC - bridging AI research and real-world engineering through daily interview questions, knowledge sharing, and consulting services.

![Preview](/app/opengraph-image.png)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is the official website for AI Engineer Labs LLC, built using Next.js 15, ShadCN UI, and Tailwind CSS 4. The site showcases daily AI interview questions, knowledge sharing, consulting services, and digital products focused on practical AI system design.

## Features

- Next.js 15
- ShadCN UI for beautiful and responsive UI components
- Tailwind CSS 4 for easy styling and customization
- **Automatic Email Sending** via EmailJS (no backend required)
- **Contact Form** with client-side analytics tracking
- **Admin Dashboard** to view contact attempts (`/admin`)

## Getting Started

To get started with this template, follow these steps:

1. Clone the repository: `git clone https://github.com/gonzalochale/saas-landing-template.git`
2. Install the dependencies: `npm install`
3. Start the development server: `npm run dev`

## Usage

Once the development server is running, you can access the application at `http://localhost:3000`. From there, you can start building your SaaS application by customizing the provided components, adding new pages, and implementing your business logic.

## Email Setup (EmailJS)

To enable automatic email sending from the contact form:

1. **Set up EmailJS**: Follow the detailed guide in [`EMAILJS_SETUP.md`](./EMAILJS_SETUP.md)
2. **Create `.env.local`** file in the root directory with:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. **Restart the dev server** after adding environment variables

The contact form will automatically send emails to `hao.hoang.ai@gmail.com` when users submit inquiries.

## Admin Dashboard

View all contact attempts by visiting `/admin`:
- Password: `aiengineerlabs2024` (change this in production!)
- Export contacts as CSV
- View contact history stored in browser localStorage

## Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
