import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { useNewAffiliate } from '../../models/newAffiliate'

const tags = ['Salads', 'Chinese', 'Soups', 'Desserts', 'Indian', 'Thai', 'Keto']

export function StoreTagsDropdown() {
  const { addTag } = useNewAffiliate()

  function handleTagPress(tag: string) {
    addTag(tag)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex w-40 cursor-pointer items-center justify-center gap-x-2 rounded-lg bg-white p-2 transition-all duration-300 ease-in hover:bg-green-400 focus:outline-none">
          <p className="text-xs text-dark transition-all duration-300 ease-in group-hover:text-white">Tags</p>
          <button className="text-dark transition-all duration-300 ease-in   group-hover:text-white">
            <ChevronDown className="h-4 w-4 " />
          </button>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Default Tags</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {tags.map((tag) => (
            <DropdownMenuItem className="cursor-pointer text-sm" onClick={() => handleTagPress(tag)} key={tag}>
              {tag}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className="flex items-center justify-between">
          Save Tag
          <PlusCircle className="h-4 w-4" />
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
