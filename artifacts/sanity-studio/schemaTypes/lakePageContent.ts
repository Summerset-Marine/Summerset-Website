import { defineField, defineType } from 'sanity'

export const lakePageContent = defineType({
  name: 'lakePageContent',
  title: 'Body of Water Page',
  type: 'document',
  fields: [
    defineField({ name: 'lakeName', title: 'Lake Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'lakeSlug',
      title: 'Lake Slug',
      type: 'string',
      description: 'Must match the URL slug exactly: geneva-lake, okauchee-lake, lac-la-belle, nagawicka-lake, beaver-lake, green-bay, sturgeon-bay, lake-michigan',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      options: { list: ['lake-geneva', 'oconomowoc', 'door-county'] },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })]
    }),
    defineField({ name: 'historyText', title: 'SMC History on This Lake', type: 'text', rows: 5, description: 'Installed base, years of experience, notable projects on this lake' }),
    defineField({ name: 'lakeCharacteristics', title: 'Lake Characteristics', type: 'text', rows: 5, description: 'Average depth, wave exposure, ice behavior, shoreline type — written for a property owner scoping a project' }),
    defineField({
      name: 'projects',
      title: 'Projects on This Lake',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Project Title', type: 'string' }),
          defineField({ name: 'productType', title: 'Product Type', type: 'string', options: { list: ['permanent-piers', 'lifts', 'seasonal-systems', 'marine-contracting'] } }),
          defineField({ name: 'installYear', title: 'Install Year', type: 'number' }),
          defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          defineField({ name: 'beforeImage', title: 'Before Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
          defineField({ name: 'afterImage', title: 'After Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })] }),
        ]
      }]
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
          defineField({ name: 'customerName', title: 'Customer Name', type: 'string' }),
          defineField({ name: 'lakeLabel', title: 'Lake Label', type: 'string', description: 'e.g. Geneva Lake homeowner' }),
        ]
      }]
    }),
    defineField({ name: 'metaTitle', title: 'SEO Title', type: 'string', validation: Rule => Rule.max(60) }),
    defineField({ name: 'metaDescription', title: 'SEO Description', type: 'text', rows: 2, validation: Rule => Rule.max(155) }),
  ],
  preview: {
    select: { title: 'lakeName', subtitle: 'market', media: 'heroImage' },
  }
})
