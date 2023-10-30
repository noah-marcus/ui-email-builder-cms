import React, { FC } from 'react'
import { Control, EmailSubComponentControlsProps } from './shared'
import { VisuallyHidden } from '@reach/visually-hidden'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'
import { StatusVariant, useStatusValue } from 'src/templates/EmailTemplateSubComponents/Status'
import { Select } from 'src/ui/Select'
import { SubComponentControlToggle } from './SubComponentControlToggle'
import { BoxColor, SelectBoxColor } from 'src/ui/SelectBoxColor'
import { UswdsIconSelect } from 'src/ui'

export const StatusControls: FC<EmailSubComponentControlsProps> = ({ componentId, id }) => {
  const key = buildSubComponentKey(componentId, id)
  const variantHtmlId = `select-variant-${key}`
  const boxColorHtmlId = `select-box-color-${key}`
  const iconHtmlId = `select-icon-${key}`
  const [value, setValue] = useStatusValue(componentId, id)

  return (
    <Control.Group>
      <VisuallyHidden>
        <span id={variantHtmlId}>Status variant</span>
      </VisuallyHidden>
      <Select
        labelId={variantHtmlId}
        options={[
          { label: 'Overview', value: StatusVariant.Overview + '' },
          { label: 'Overview w/ Reason', value: StatusVariant.OverviewWithReason + '' },
          { label: 'Missing Document Specifics', value: StatusVariant.MissingDocument + '' },
          {
            label: 'Overview w/ Reason + Amount Due',
            value: StatusVariant.OverviewWithReasonAndAmountDue + '',
          },
          {
            label: 'Overview w/ Reason + Amount Breakdown',
            value: StatusVariant.OverviewWithReasonAndAmountBreakdown + '',
          },
        ]}
        onChange={(newValue) => setValue({ ...value, variant: parseInt(newValue) })}
        value={value.variant + ''}
      />
      {[
        StatusVariant.OverviewWithReasonAndAmountDue,
        StatusVariant.OverviewWithReasonAndAmountBreakdown,
      ].includes(value.variant) && (
        <>
          <Control.Container>
            <Control.Label id={boxColorHtmlId}>Box Color</Control.Label>
            <SelectBoxColor
              labelId={boxColorHtmlId}
              value={value.boxColor}
              onChange={(boxColor) => setValue({ ...value, boxColor })}
            />
          </Control.Container>
          <Control.Container>
            <Control.Label id={iconHtmlId}>Icon</Control.Label>
            <UswdsIconSelect
              labelId={iconHtmlId}
              onChange={(icon) => setValue({ ...value, icon })}
              value={value.icon}
            />
          </Control.Container>
        </>
      )}
      <SubComponentControlToggle
        className="status-supportive-information-toggle"
        subComponentId={id}
        label="Supportive Information"
        onChange={(showSupportiveInformation) => setValue({ ...value, showSupportiveInformation })}
        value={value.showSupportiveInformation}
      />
    </Control.Group>
  )
}
