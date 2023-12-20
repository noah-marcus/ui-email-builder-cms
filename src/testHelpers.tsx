import React, { FC, ReactElement, ReactNode } from 'react'
import { faker } from '@faker-js/faker'
import sample from 'lodash.sample'
import { EmailTemplate, EmailTemplateComponentsMapping } from './appTypes'
import {
  CurrentlyActiveEmailPart,
  useCurrentlyActiveEmailPartData,
} from './templates/CurrentlyActiveEmailPart'
import { ShouldShowEmailPart } from './templates/ShouldShowEmailPart'
import { EmailPartsContent, useEmailPartsContentData } from './templates/EmailPartsContent'
import { render } from '@testing-library/react'
import Config from '../gatsby-config'
import uniqueId from 'lodash.uniqueid'

export const buildEmailTemplateSubComponent = <T extends EmailTemplate.ComponentKind>(
  component: EmailTemplate.ComponentKind,
  options?: Partial<EmailTemplate.SubComponent<T>>,
): EmailTemplate.SubComponent<T> => {
  const possibleSubComponents = EmailTemplateComponentsMapping[component]

  if (possibleSubComponents.length === 0) {
    throw new Error(`Component ${component} does not have SubComponents`)
  }

  return {
    kind: sample(possibleSubComponents)!,
    required: false,
    ...options,
  }
}

export const buildUniqueEmailSubComponent = (
  component: EmailTemplate.ComponentKind,
  options?: Partial<EmailTemplate.UniqueSubComponent>,
): EmailTemplate.UniqueSubComponent => {
  return {
    ...buildEmailTemplateSubComponent(component, options),
    id: uniqueId(),
    ...options,
  }
}

export const buildEmailTemplateComponent = <T extends EmailTemplate.ComponentKind>(
  kind: T,
  options?: Partial<EmailTemplate.Component<T>>,
): EmailTemplate.Component<T> => {
  return {
    kind,
    required: false,
    description: faker.lorem.words(3),
    ...options,
  }
}

export const buildUniqueEmailComponent = (
  kind: EmailTemplate.ComponentKind,
  options?: Partial<EmailTemplate.UniqueComponent>,
): EmailTemplate.UniqueComponent => {
  const { subComponents, ...emailComponent } = buildEmailTemplateComponent(kind, options)
  return {
    ...emailComponent,
    id: uniqueId(),
    ...options,
  }
}

export const buildEmailTemplateConfig = (
  options?: Partial<EmailTemplate.Config>,
): EmailTemplate.Config => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    components: [buildEmailTemplateComponent('Header'), buildEmailTemplateComponent('Footer')],
    ...options,
  }
}

export const buildUniqueEmailConfig = (
  options?: Partial<EmailTemplate.UniqueConfig>,
): EmailTemplate.UniqueConfig => {
  return {
    name: faker.lorem.word(),
    description: faker.lorem.paragraph(),
    components: [buildUniqueEmailComponent('Header'), buildUniqueEmailComponent('Footer')],
    ...options,
  }
}

export const urlFor = (path: string): string => `http://localhost${path}`
export const absoluteUrlFor = (path: string): string =>
  [Config.siteMetadata?.siteUrl, path].join('')

export type WrapperComponent = FC<{ children: ReactNode; additional?: ReactNode }>

export const emailPartWrapper: WrapperComponent = ({ additional, children }) => {
  return (
    <ShouldShowEmailPart>
      <CurrentlyActiveEmailPart>
        <EmailPartsContent>
          {additional}
          <table>
            <tbody>{children}</tbody>
          </table>
          <ShowActiveEmailPart />
          <ShowEmailPartsContentKeys />
        </EmailPartsContent>
      </CurrentlyActiveEmailPart>
    </ShouldShowEmailPart>
  )
}

export const renderEmailPart = (ui: ReactElement, additional?: ReactElement) => {
  const Component = emailPartWrapper
  return render(<Component additional={additional}>{ui}</Component>)
}

export const ShowActiveEmailPart: FC = () => {
  const [currentlyActive] = useCurrentlyActiveEmailPartData()
  return <span id="active-email-part-key">{currentlyActive}</span>
}

export const ShowEmailPartsContentKeys: FC = () => {
  const [data] = useEmailPartsContentData()
  const keys = Object.keys(data)
  return (
    <ul id="email-parts-content-keys">
      {keys.map((key) => (
        <li key={key} data-testid={key}>
          {key}
        </li>
      ))}
    </ul>
  )
}

export const expectActiveEmailPartToNotBe = (key: string, element: HTMLElement) => {
  expect(element.querySelector('#active-email-part-key')).not.toHaveTextContent(key)
}

export const expectActiveEmailPartToBe = (key: string, element: HTMLElement) => {
  expect(element.querySelector('#active-email-part-key')).toHaveTextContent(key)
}

export const expectEmailPartContentFor = (key: string, element: HTMLElement) => {
  const ul = element.querySelector('#email-parts-content-keys')
  expect(ul).not.toBeNull()
  const li = ul!.querySelector(`[data-testid="${key}"]`)
  expect(li).not.toBeNull()
}

export const asMock = <T extends (...args: any) => any>(func: T): jest.Mock<ReturnType<T>> => {
  return func as any
}

export const mockDataTransfer = ({
  plain,
  html,
}: {
  plain?: string
  html?: string
}): DataTransfer => {
  const data: { 'text/plain'?: string; 'text/html'?: string } = {
    'text/html': html,
    'text/plain': plain,
  }

  return {
    dropEffect: 'none',
    setData: (kind: 'text/html' | 'text/plain', value: string) => (data[kind] = value),
    getData: (kind: 'text/html' | 'text/plain') => data[kind] ?? '',
    effectAllowed: 'all',
    files: [] as any,
    types: [...(plain ? ['text/plain'] : []), ...(html ? ['text/html'] : [])],
    items: [] as any,
    clearData: () => null,
    setDragImage: () => null,
  }
}
