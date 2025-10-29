# Technical test for Fonts Ninja

This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The application is deployed on Vercel, on [tech-test-roan.vercel.app](https://tech-test-roan.vercel.app/).
The whole application passes a deployment pipeline to assert only commits passing the requirements are releasable.
This deployment pipeline is a minimum and intends to respect the [Continuous Delivery](https://minimumcd.org/)
discipline.

## Getting Started

If you want to run the application locally, make sure node.js v22.20.0 is installed on your machine, and execute the
following commands

```bash
cp ./.env.sample ./.env
npm install 
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically
optimize and load [Inter](https://vercel.com/font).
