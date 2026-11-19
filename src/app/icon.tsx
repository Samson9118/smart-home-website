import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: '#090D16',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#22D3EE',
          borderRadius: 8,
          border: '1.5px solid #F59E0B',
          fontWeight: 900,
        }}
      >
        ⚡
      </div>
    ),
    {
      ...size,
    }
  );
}
