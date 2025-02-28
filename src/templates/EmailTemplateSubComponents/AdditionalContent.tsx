import React, { CSSProperties, FC } from 'react'
import { EmailSubComponentProps } from './shared'
import { useIsCurrentlyActiveEmailPart } from '../CurrentlyActiveEmailPart'
import { useEmailPartsContentFor } from '../EmailPartsContent'
import { Colors, StyleDefaults, Text } from '../styles'
import { EmailBlock, RichTextEditableElement } from 'src/ui'
import { useSyncSidebarAndPreviewScroll } from '../SyncSidebarAndPreviewScroll'
import { EmailParts } from 'src/appTypes'

const { Row } = EmailBlock

export const useAdditionalContentValue = (emailSubComponent: EmailParts.AdditionalContent) => {
  return useEmailPartsContentFor(emailSubComponent)
}

export const AdditionalContent: FC<EmailSubComponentProps<'AdditionalContent'>> = ({
  emailSubComponent,
  readOnly,
}) => {
  const { activate } = useIsCurrentlyActiveEmailPart(emailSubComponent.id)
  const [value, setValue] = useAdditionalContentValue(emailSubComponent)
  const { previewRef, scrollSidebar } = useSyncSidebarAndPreviewScroll(emailSubComponent.id)

  return (
    <Row
      className="additional-content"
      onClick={(event) => {
        activate(event)
        scrollSidebar()
      }}
      onFocus={(event) => {
        activate(event)
        scrollSidebar()
      }}
    >
      <RichTextEditableElement
        ref={previewRef}
        element="td"
        className={StyleDefaults.layout.narrow}
        label="Additional content"
        onValueChange={(content) => setValue({ ...value, content })}
        style={styles}
        value={value.content}
        readOnly={readOnly}
      />
    </Row>
  )
}

const styles: CSSProperties = {
  ...StyleDefaults.inline.colors,
  ...Text.caption.large.regular,
  color: Colors.black,
}
