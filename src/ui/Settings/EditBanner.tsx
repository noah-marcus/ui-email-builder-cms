import React, { FC, useMemo } from 'react'
import { Heading, Paragraph } from 'src/ui/Layout'
import { EmailBlock, Input } from 'src/ui'
import { BannerMarkup, useBannerValue } from 'src/templates/EmailTemplateComponents/Banner'
import { Spacing } from 'src/templates/styles'
import { ColorPicker } from '../ColorPicker'
import { EditableElement } from '../EditableElement'

export const EditBanner: FC = () => {
  const [banner, setBanner] = useBannerValue()

  return (
    <form className="edit-banner-form">
      <Heading element="h2" subheading>
        Banner
      </Heading>
      <Paragraph>At the very top of every email, it will show this:</Paragraph>
      <EmailBlock.Table maxWidth={Spacing.layout.maxWidth}>
        <BannerMarkup
          disableLinks
          backgroundColor={banner.backgroundColor}
          primaryLink={banner.primaryLink}
          secondaryLink={banner.secondaryLink}
          primaryText={
            <EditableElement
              element="span"
              label="Primary Text"
              value={banner.primaryText}
              onValueChange={(primaryText) => setBanner({ ...banner, primaryText })}
            />
          }
        />
      </EmailBlock.Table>
      <div className="banner-fields" style={{ maxWidth: Spacing.layout.maxWidth }}>
        <div className="banner-field">
          <label htmlFor="primary-link">Primary Link</label>
          <Input
            id="primary-link"
            value={banner.primaryLink}
            onTextChange={(primaryLink) => setBanner({ ...banner, primaryLink })}
            type="url"
          />
        </div>
        <div className="banner-field">
          <label htmlFor="secondary-link">Secondary Link</label>
          <Input
            id="secondary-link"
            value={banner.secondaryLink}
            onTextChange={(secondaryLink) => setBanner({ ...banner, secondaryLink })}
            type="url"
          />
        </div>
      </div>
      <div className="banner-fields" style={{ maxWidth: Spacing.layout.maxWidth }}>
        <div className="banner-field banner-field-color">
          <label htmlFor="background-color">
            <span className="custom-label">Background Color</span>
            <ColorPicker
              id="background-color"
              className="banner-color-picker"
              value={banner.backgroundColor}
              onChange={(backgroundColor) => setBanner({ ...banner, backgroundColor })}
            />
          </label>
        </div>
        <div className="banner-field" />
      </div>
    </form>
  )
}
