import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Props {
  timezones: Array<string>,
  currentTz: string,
  setCurrentTz: Function
}

export default function TimezoneSelector({ timezones, currentTz, setCurrentTz }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(currentTz)

  React.useEffect(() => {
    setValue(currentTz)
  }, [currentTz])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? timezones.find((timezone) => timezone === value)
            : currentTz}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No timezone found.</CommandEmpty>
            <CommandGroup>
              {timezones.map((timezone, index) => (
                <CommandItem
                  key={index}
                  value={timezone}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setCurrentTz(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === timezone ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {timezone}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
