import type { GatsbyConfig } from 'gatsby'
import postcssPresetEnv from 'postcss-preset-env'
import { mockCognitoForgotPasswordUrl } from 'src/testHelpers'

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Email Builder`,
    appMode: process.env.GATSBY_APP_MODE,
    backendUrl: process.env.GATSBY_BACKEND_URL,
    env: process.env.NODE_ENV,
    cognitoSigninUrl: process.env.GATSBY_COGNITO_SIGNIN_URL,
    cognitoForgotPasswordUrl: process.env.GATSBY_COGNITO_FORGOT_PASSWORD_URL,
    htmlTranslationsCdnUrl: process.env.GATSBY_HTML_TRANSLATIONS_CDN_URL,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-root-import`,
    `gatsby-transformer-yaml`,
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en-US',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Email Builder (Beta)`,
        short_name: `Email Builder (Beta)`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#285f77`,
        display: `standalone`,
        icon: `src/images/favicon.png`,
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/email-templates/`,
      },
    },
    {
      resolve: `gatsby-plugin-decap-cms`,
      options: {
        modulePath: `${__dirname}/src/cms/cms.tsx`,
        manualInit: true,
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          postcssPresetEnv(), // includes autoprefixer
        ],
      },
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [`https://fonts.googleapis.com`, `https://fonts.gstatic.com`],
        web: [
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css?family=Public%20Sans:700&display=swap&subset=cyrillic',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css?family=Public%20Sans:600&display=swap&subset=cyrillic',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css?family=Public%20Sans:400&display=swap&subset=cyrillic',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css?family=Public%20Sans:400i&display=swap&subset=cyrillic',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@1,700&display=swap',
          },
          {
            name: 'Public Sans',
            file: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,600;1,700&display=swap',
          },
          { name: 'EB Garamond', file: 'https://fonts.googleapis.com/css?family=EB+Garamond:400' },
          {
            name: 'Roboto Mono',
            file: 'https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap',
          },
        ],
      },
    },
  ],
}

export default config
