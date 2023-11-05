<p align="center">
  <a href="https://lgtmarvelous.vercel.app">
    <img src="/public/logo.png" width="60" />
  </a>
</p>
<h1 align="center">
  lgtm.
</h1>

**lgtmarvelous.vercel.app** is a LGTM (Looks Good To Me) image collection application. Users can browse images and copy the URL of the image they like to the clipboard with a single click.

We need some **fun** in the world of software development. Let's make the world a more pleasant and friendly place with LGTM images!

## 📚 Technologies
```
NextJS 14
React 18
TypeScript 5
Tailwind CSS 3
shadcn/ui
Bun
Cloudfront CDN with S3 (Origin Access Identity)
API Gateway + Lambda (Serverless)
```

- 🚀 **matomeishi (front-end)** is implemented with **NextJS 14** and deployed with <a href="https://vercel.com/tonystrawberry/lgtm" target="_blank">**Vercel**</a>

## 🛠 Local development

1. Set the necessary environment variables in the `.env.local` file.

```
NEXT_PUBLIC_SERVER_API_URL=https://9y0yvdvqnc.execute-api.ap-northeast-1.amazonaws.com/production/api/v1/images
```

2. Run the following commands.
```
$ bun install
$ bun dev
```

4. Access the web application via the following URL.
```
http://localhost:3001
```

## ⚙️ Deployment

The application is deployed to production with <a href="https://vercel.com/tonystrawberry/lgtm" target="_blank">Vercel</a> every time a pull request is merged into the `main` branch.
Vercel also has preview deployments enabled for pull requests.
