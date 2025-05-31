import logo from '@/public/logo.png'; // ブラウザキャッシュ対応(キャッシュバスティング)。画像を静的インポートする
import Image from 'next/image';

export default function Page() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center">
        <div className="space-y-10 p-10">
          <div>
            <div>キャッシュバスティングなし</div>
            <div>
              <Image src="/logo.png" width="287" height="168" alt="" />
            </div>
          </div>
          <div>
            <div>キャッシュバスティングあり</div>
            <div>
              <Image src={logo.src} width="287" height="168" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
