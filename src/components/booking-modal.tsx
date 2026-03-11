import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"
import func2url from "../../backend/func2url.json"

interface BookingModalProps {
  open: boolean
  onClose: () => void
  planName: string
}

export function BookingModal({ open, onClose, planName }: BookingModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", comment: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch(func2url["create-booking"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, plan: planName }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess(true)
      } else {
        setError(data.error || "Произошла ошибка, попробуйте ещё раз")
      }
    } catch {
      setError("Не удалось отправить заявку. Проверьте соединение.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setForm({ name: "", phone: "", email: "", comment: "" })
    setSuccess(false)
    setError("")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {success ? "Заявка отправлена" : `Забронировать — ${planName}`}
          </DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name="Check" size={24} className="text-primary" />
            </div>
            <p className="text-muted-foreground">
              Спасибо! Я свяжусь с вами в ближайшее время для подтверждения даты съёмки.
            </p>
            <Button onClick={handleClose} className="mt-2">Закрыть</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ваше имя"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+7 900 000-00-00"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@mail.ru"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="comment">Пожелания</Label>
              <Textarea
                id="comment"
                name="comment"
                placeholder="Расскажите об идее съёмки, желаемом месте или дате"
                value={form.comment}
                onChange={handleChange}
                rows={3}
              />
            </div>

            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <Icon name="Loader2" size={16} className="animate-spin" />
                  Отправляю...
                </span>
              ) : "Отправить заявку"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
