import { Link } from "react-router-dom"

import { Button, buttonVariants } from "~/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex max-w-xl min-w-0 flex-col gap-4 rounded-2xl border bg-card p-8 text-sm leading-loose shadow-sm">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
            Desk Information Board
          </p>
          <h1 className="text-2xl font-semibold">静态前端已就绪</h1>
          <p className="text-muted-foreground">
            当前 `web/web-frontend` 已调整为纯 Vite + React 单页应用，不包含服务端渲染，仅负责前端展示。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button>shadcn/ui Button</Button>
          <Link
            to="/three"
            className={`${buttonVariants({ variant: "outline", size: "default" })} inline-flex`}
          >
            打开 3D 演示
          </Link>
        </div>
      </div>
    </div>
  )
}
