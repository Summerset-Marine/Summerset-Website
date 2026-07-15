import { defineField, defineType } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({
      name: 'market',
      title: 'Market',
      type: 'string',
      options: { list: ['lake-geneva', 'oconomowoc', 'door-county'] },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'lake',
      title: 'Body of Water',
      type: 'string',
      options: { list: ['geneva-lake', 'okauchee-lake', 'lac-la-belle', 'nagawicka-lake', 'beaver-lake', 'green-bay', 'sturgeon-bay', 'lake-michigan'] },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'productType',
      title: 'Product Type',
      type: 'string',
      options: { list: ['permanent-piers', 'lifts', 'seasonal-systems', 'marine-contracting'] },
      validation: Rule => Rule.required()
    }),
    defineField({ name: 'installYear', title: 'Install Year', type: 'number' }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({ name: 'beforeImage', title: 'Before Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })] }),
    defineField({ name: 'afterImage', title: 'After Image', type: 'image', options: { hotspot: true }, fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: Rule => Rule.required() })] }),
    defineField({ name: 'testimonial', title: 'Customer Testimonial', type: 'text', rows: 3 }),
    defineField({ name: 'body', title: 'Project Story', type: 'array', of: [{ type: 'block' }] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'lake', media: 'afterImage' },
  }
})
