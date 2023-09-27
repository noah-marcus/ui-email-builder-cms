import React from 'react'
import { Label } from '../Label'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { EmailTemplate } from 'src/appTypes'
import { faker } from '@faker-js/faker'
import { buildEmailTemplateSubComponent, emailPartWrapper } from 'src/testHelpers'
import { buildSubComponentKey } from 'src/utils/emailPartKeys'

describe('Label', () => {
  let componentId: string
  let id: string
  let emailSubComponent: EmailTemplate.SubComponent<'Header'>

  beforeEach(() => {
    componentId = faker.lorem.words(2)
    id = faker.lorem.words(3)
    emailSubComponent = buildEmailTemplateSubComponent('Header', { kind: 'Label' })
  })

  it('is editable', async () => {
    const user = userEvent.setup()
    const { queryByText, getByText, getByLabelText } = render(
      <Label componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )

    const value = faker.lorem.words(4)
    const input = getByText('Label')
    await user.clear(input)
    await user.type(input, value)

    expect(queryByText(value)).not.toBeNull()
  })

  it('activates when clicked', async () => {
    const user = userEvent.setup()
    const { queryByText, getByText } = render(
      <Label componentId={componentId} id={id} emailSubComponent={emailSubComponent} />,
      { wrapper: emailPartWrapper },
    )
    const key = buildSubComponentKey(componentId, id)
    expect(queryByText(key)).toBeNull()
    await user.click(getByText('Label'))
    expect(queryByText(key)).not.toBeNull()
  })
})
