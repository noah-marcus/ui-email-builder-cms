import React from 'react'
import { AdditionalContent } from '../AdditionalContent'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import {
  buildEmailTemplateSubComponent,
  emailPartWrapper,
  expectActiveEmailPartToBe,
  expectActiveEmailPartToNotBe,
  expectEmailPartContentFor,
} from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

describe('AdditionalContent', () => {
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Footer'>

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildEmailTemplateSubComponent('Footer', { kind: 'AdditionalContent' })
  })

  it('is editable', async () => {
    const user = userEvent.setup()
    const { queryByText, getByText, baseElement } = render(
      <AdditionalContent componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    const value = faker.lorem.words(4)
    const input = getByText('Additional Content')
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
    expectEmailPartContentFor(buildSubComponentKey(componentId, id), baseElement)
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { getByText, baseElement } = render(
      <AdditionalContent componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = buildSubComponentKey(componentId, id)
    expectActiveEmailPartToNotBe(key, baseElement)
    await user.click(getByText('Additional Content'))
    expectActiveEmailPartToBe(key, baseElement)
  })
})
