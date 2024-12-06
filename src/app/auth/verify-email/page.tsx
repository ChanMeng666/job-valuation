import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">验证邮箱</CardTitle>
          <CardDescription className="text-center">
            我们已经向你的邮箱发送了验证链接
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription>
              请检查你的邮箱并点击验证链接以完成注册。如果没有收到邮件，请检查垃圾邮件文件夹。
            </AlertDescription>
          </Alert>
          
          <div className="text-center space-y-2">
            <div>
              <Link href="/auth/login">
                <Button variant="link">返回登录</Button>
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              没有收到邮件？请稍后再试
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
