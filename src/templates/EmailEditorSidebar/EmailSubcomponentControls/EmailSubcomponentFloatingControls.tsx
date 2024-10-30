import React, { FC } from 'react'
import { EmailTemplate } from 'src/appTypes'
import { useShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { StatusFloatingControls } from './StatusFloatingControls'

interface Props {
  emailSubComponent: EmailTemplate.Unique.SubComponent
  nextEmailSubComponent: EmailTemplate.Unique.SubComponent | undefined
}

export const EmailSubComponentFloatingControls: FC<Props> = ({
  emailSubComponent,
  nextEmailSubComponent,
}) => {
  const shouldShowSubComponent = useShouldShowEmailPart(emailSubComponent)
  const shouldShowNextSubComponent = useShouldShowEmailPart(nextEmailSubComponent)

  if (shouldShowSubComponent.off) return null

  switch (emailSubComponent.kind) {
    case 'Status':
      return (
        nextEmailSubComponent?.kind === 'Directive' &&
        shouldShowNextSubComponent.on && (
          <StatusFloatingControls emailSubComponent={emailSubComponent as EmailTemplate.Status} />
        )
      )
    default:
      return null
  }
}
