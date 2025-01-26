"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export function Chat() {
  const [messages] = useState([
    { id: "1", user: "richsuo", time: "2:13 AM", text: "これはダミーテキストです" },
    { id: "2", user: "7setsuo", time: "3:52 AM", text: "文章のレイアウトやデザインを確認するために使用されます" },
    { id: "3", user: "Kokosuo", time: "4:02 AM", text: "内容には意味がありません" },
    { id: "4", user: "PetarIS.[TETSUO]", time: "5:15 AM", text: "テキストがどのように表示されるかを示す例として使われます" },
    { id: "5", user: "bobsuo", time: "6:47 AM", text: "デザインやレイアウトの確認において便利です" },
  ])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 space-y-2 text-sm">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`${msg.user === "lain" ? "text-green-400" : msg.user === "user" ? "text-orange-400" : "text-cyan-400"}`}
          >
            [{msg.user}] {msg.time} - {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center space-x-2">
        <Input placeholder="メッセージを入力してください" className="bg-transparent border-cyan-300 text-cyan-100" />
        <Button variant="outline" className="border-cyan-300 text-cyan-100 hover:bg-cyan-900">
          こ
        </Button>
      </div>
    </div>
  )
}
