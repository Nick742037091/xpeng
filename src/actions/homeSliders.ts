'use server'
import { revalidatePath } from 'next/cache'

// 只能在from表单提交中使用
export const refreshHomeSliderPage = async () => {
  revalidatePath('/', 'layout')
  revalidatePath('/admin/home-sliders', 'page')
}
