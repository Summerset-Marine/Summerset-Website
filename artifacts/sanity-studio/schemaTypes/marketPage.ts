import { defineField, defineType } from 'sanity'

export const marketPage = defineType({
  name: 'marketPage',
  title: 'Market Landing Page',
  type: 'document',
  fields: [
    defineField({ name: 'marketName', title: 'Market Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'marketSlug',
      title: 'Market Slug',
      type: 'string',
      description: 'Must match exactly: lake-geneva, oconomowoc, door-county',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })]
    }),
    defineField({ name: 'introText', title: 'Market Introduction', type: 'text', rows: 4, description: 'Brief paragraph about SMC\'s presence in this market — years operating, install volume, what makes it distinct' }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Project Title', type: 'string' }),
          defineField({ name: 'lake', title: 'Lake', type: 'string' }),
          defineField({ name: 'productType', title: 'Product Type', type: 'string' }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })] }),
        ]
      }]
    }),
    defineField({ name: 'metaTitle', title: 'SEO Title', type: 'string', validation: Rule => Rule.max(60) }),
    defineField({ name: 'metaDescription', title: 'SEO Description', type: 'text', rows: 2, validation: Rule => Rule.max(155) }),
  ],
  preview: {
    select: { title: 'marketName', media: 'heroImage' },
  }
})
