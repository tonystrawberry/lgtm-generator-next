import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge';

export async function GET() {
  const imageData = await fetch(new URL('./opengraph-image.png', import.meta.url)).then(
    (res) => res.arrayBuffer(),
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          background: '#f6f6f6',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img width="500" height="317" src={imageData} />
      </div>
    ),
    {
      width: 500,
      height: 317,
    },
  );
}
