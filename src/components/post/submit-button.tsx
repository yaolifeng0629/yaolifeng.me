'use client'

import { Button } from '@radix-ui/themes'
import { useFormStatus } from 'react-dom'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      Submit
    </Button>
  )
}
