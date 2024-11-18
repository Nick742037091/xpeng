'use client'

import Image from 'next/image'
import P7PlusImg from './imgs/p7+.png'
import Logo from '@/assets/icons/common/logo_black.png'
import Policy from './components/Policy'
import { useState } from 'react'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [isAgree, setIsAgree] = useState(false)
  return (
    <div className="min-h-screen relative flex flex-col items-center bg-[linear-gradient(0deg,#FFF8EF_15%,#EBF4FF_100%)]">
      <div className="mt-[40Px] mb-[auto] flex flex-col items-center w-[315PX]">
        <Image src={Logo} alt="logo" width={74} height={40} />
        <div className="mt-[32Px] mb-[16Px] bg-white px-[20Px] py-[5Px] w-full">
          <input
            type="text"
            placeholder="请输入手机号"
            className="h-[46Px] w-full text-[#333]"
            // TODO: text-[16Px]无效
            style={{
              fontSize: '16Px'
            }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div
          className="flex items-center mb-[16Px] bg-white px-[20Px] py-[5Px] w-full"
          style={{
            fontSize: '16Px'
          }}
        >
          <input
            type="text"
            placeholder="请输入短信验证码"
            className="h-[46Px] flex-1 text-[#333]"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <span className="text-[#6da23a] mr-[4Px]">获取验证码</span>
        </div>
        <Policy isAgree={isAgree} onChange={setIsAgree} />
        <div className="mt-[14px] h-[48px] w-full flex justify-center items-center bg-black text-white">
          登录
        </div>
      </div>

      <Image
        className="w-screen mt-[20px] h-[200px] object-cover"
        src={P7PlusImg}
        alt="p7+"
      />
    </div>
  )
}
