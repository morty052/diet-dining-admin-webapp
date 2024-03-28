import { ChevronDown, PlusCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu'

const templates = [
  {
    subject: 'New Meal added 🥘 🤤',
    body: 'Check out [new meal name] on diet dining',
  },
  {
    subject: 'New Vendor around you 🏪👋',
    body: 'New vendor around you! Check out [new vendor name] on diet dining',
  },
  {
    subject: 'New Promo live',
    body: 'Ding Ding new promo alert use code [code here] for [promo name] on diet dining',
  },
  {
    subject: 'Join Diet Plus',
    body: 'check out these exclusive benefits when you join diet plus',
  },
  {
    subject: 'Testing broadcast',
    body: 'please ignore, testing broadcast',
  },
]

export function NotificationsTemplateDropDown({
  setTitle,
  setBody,
}: {
  setTitle: (title: string) => void
  setBody: (body: string) => void
}) {
  function handleTemplatePress({ title, body }: { title: string; body: string }) {
    setTitle(title)
    setBody(body)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex cursor-pointer items-center gap-x-2 focus:outline-none">
          <p className="text-sm text-white transition-all duration-300 ease-in group-hover:text-green-400">Templates</p>
          <button className="text-white transition-all duration-300 ease-in active:text-red-400  group-hover:text-green-400">
            <ChevronDown className="h-4 w-4 " />
          </button>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Templates</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {templates.map((item) => (
            <DropdownMenuItem
              className="text-sm"
              onClick={() => handleTemplatePress({ title: item.subject, body: item.body })}
              key={item.subject}
            >
              {item.subject}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center justify-between">
          Add Template
          <PlusCircle className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
