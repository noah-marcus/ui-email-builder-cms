import { HeadFC, PageProps } from 'gatsby'
import React, { FC } from 'react'
import { useEmailTemplate } from 'src/network/useEmailTemplate'
import {
  ClearCurrentlyActiveEmailPart,
  CurrentlyActiveEmailPart,
} from 'src/templates/CurrentlyActiveEmailPart'
import { EmailEditorContent } from 'src/templates/EmailEditorContent'
import { EmailEditorSidebar } from 'src/templates/EmailEditorSidebar'
import { EmailPartsContent } from 'src/templates/EmailPartsContent'
import { EmailTemplateConfig } from 'src/templates/EmailTemplateConfig'
import { ShouldShowEmailPart } from 'src/templates/ShouldShowEmailPart'
import { SyncSidebarAndPreviewScroll } from 'src/templates/SyncSidebarAndPreviewScroll'
import { Layout, PageContent } from 'src/ui'
import { Alert } from 'src/ui/Alert'
import { LoadingOverlay } from 'src/ui/LoadingOverlay'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { shouldShowEmailPartsFromEmailTemplate } from 'src/utils/shouldShowEmailPartsFromEmailTemplate'

export type Props = PageProps<null, null, null>

const EmailTemplateShowPage: FC<Props> = ({ params }) => {
  const query = useEmailTemplate(params.id)
  const { data: emailTemplate, isLoading, error } = query

  return (
    <Layout element="main">
      <EmailTemplateConfig emailTemplateConfig={emailTemplate ?? { name: '' }}>
        <ShouldShowEmailPart
          key={emailTemplate?.id}
          initialData={emailTemplate && shouldShowEmailPartsFromEmailTemplate(emailTemplate)}
        >
          <CurrentlyActiveEmailPart>
            <SyncSidebarAndPreviewScroll>
              <ClearCurrentlyActiveEmailPart />
              <EmailPartsContent>
                <EmailEditorSidebar
                  emailTemplate={emailTemplate}
                  heading={
                    <h1>
                      {byQueryState(query, {
                        data: ({ name }) => name,
                        loading: () => 'Loading...',
                        error: () => 'Something went wrong',
                      })}
                    </h1>
                  }
                />
                <PageContent element="div" className="email-editor-page-content">
                  {error && <Alert>{error.message}</Alert>}
                  {emailTemplate && <EmailEditorContent emailTemplate={emailTemplate} />}
                </PageContent>
                {isLoading && <LoadingOverlay description="Loading your email template" />}
              </EmailPartsContent>
            </SyncSidebarAndPreviewScroll>
          </CurrentlyActiveEmailPart>
        </ShouldShowEmailPart>
      </EmailTemplateConfig>
    </Layout>
  )
}

const byQueryState = <T extends any, L, E, D>(
  queryState: { data: T; isLoading: boolean; error: Error | null },
  options: { loading: () => L; error: (error: Error) => E; data: (data: NonNullable<T>) => D },
): L | E | D => {
  if (queryState.isLoading) {
    return options.loading()
  } else if (queryState.error) {
    return options.error(queryState.error)
  } else if (queryState.data) {
    return options.data(queryState.data)
  } else {
    throw new Error('No data or error and not loading')
  }
}

export default EmailTemplateShowPage

export const Head: HeadFC = () => <title>{formatPageTitle('Email Template')}</title>
