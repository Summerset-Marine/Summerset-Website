import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'summerset-marine',
  title: 'Summerset Marine Construction',
  projectId: 'mx8e8b7p',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Blog Posts').schemaType('blogPost').child(S.documentTypeList('blogPost')),
            S.divider(),
            S.listItem().title('Market Pages').schemaType('marketPage').child(S.documentTypeList('marketPage')),
            S.listItem().title('Body of Water Pages').schemaType('lakePageContent').child(S.documentTypeList('lakePageContent')),
            S.listItem().title('Projects').schemaType('project').child(S.documentTypeList('project')),
            S.listItem().title('Testimonials').schemaType('testimonial').child(S.documentTypeList('testimonial')),
            S.divider(),
            S.listItem().title('FAQ').schemaType('faqEntry').child(S.documentTypeList('faqEntry')),
            S.listItem().title('Team Members').schemaType('teamMember').child(S.documentTypeList('teamMember')),
            S.listItem().title('Lift Media').schemaType('liftMedia').child(S.documentTypeList('liftMedia')),
          ])
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
