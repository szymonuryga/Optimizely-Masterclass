import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContactBlock as ContactBlockProps } from '@/lib/optimizely/types/generated'

export default function ContactBlock({
  title,
  description,
}: ContactBlockProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <CardTitle data-epi-edit="title">{title}</CardTitle>
          <p data-epi-edit="description" className="text-muted-foreground">
            {description}
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <Input placeholder="Name" />
            <Input placeholder="Email" type="email" />
            <Textarea placeholder="Message" />
            <Button className="w-full">Send</Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
